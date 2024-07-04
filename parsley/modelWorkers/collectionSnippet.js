export const extractCollectionSnippetData = (collections, snippets) => {
  const rankedSnippets = [...snippets].sort((a, b) => b.ranking - a.ranking);

  const collectionSnippets = collections
    .map(collection => {
      const {
        id: collectionId,
        snippetIds,
        matchers,
        allowUnlisted,
      } = collection;
      if (collectionId === 'collections') return [];

      if (collectionId === 'snippets') {
        return [...rankedSnippets].map((snippet, index) => ({
          collectionId,
          snippetId: snippet.id,
          position: snippet.listed ? index : -1,
          dateModified: snippet.dateModified,
        }));
      }

      if (snippetIds && snippetIds.length) {
        return rankedSnippets
          .filter(snippet => snippetIds.includes(snippet.id))
          .map((snippet, index) => ({
            collectionId,
            snippetId: snippet.id,
            position: snippet.listed ? index : -1,
            dateModified: snippet.dateModified,
          }));
      }

      let collectionSnippets = [...rankedSnippets];
      if (matchers.language) {
        collectionSnippets = collectionSnippets.filter(
          snippet => snippet.languageKey === matchers.language
        );
      }

      if (matchers.tag) {
        collectionSnippets = collectionSnippets.filter(snippet =>
          snippet.tags.includes(matchers.tag)
        );
      }

      if (allowUnlisted) {
        return collectionSnippets.map((snippet, index) => ({
          collectionId,
          snippetId: snippet.id,
          position: index,
          dateModified: snippet.dateModified,
        }));
      }

      return collectionSnippets.map((snippet, index) => ({
        collectionId,
        snippetId: snippet.id,
        position: snippet.listed ? index : -1,
        dateModified: snippet.dateModified,
      }));
    })
    .flat();

  return collectionSnippets;
};

export const exportCollectionSnippetData = collectionSnippetData => {
  /* eslint-disable camelcase */
  return collectionSnippetData.map(collectionSnippet => {
    return {
      collection_cid: collectionSnippet.collectionId,
      snippet_cid: collectionSnippet.snippetId,
      position: collectionSnippet.position,
      // This is a denormalized field, but helps us avoid N+1 queries.
      date_modified: collectionSnippet.dateModified,
    };
  });
  /* eslint-enable camelcase */
};
