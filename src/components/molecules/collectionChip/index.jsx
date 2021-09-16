import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import { CardIcon } from 'components/atoms/card';
import literals from 'lang/en/client/common';

const propTypes = {
  chip: PropTypes.chip,
};

/**
 * General-purpose collection chip.
 * Used in home page and collections page.
 * @param {object} chip - Collection chip object for the chip.
 */
const CollectionChip = ({ chip }) => {
  const hasDescription = chip.description && chip.description.length;

  return hasDescription ? (
    <li className='card srfc-02dp txt-100 list-card grid'>
      <CardIcon displayExpertise={false} icon={chip.icon} />
      <div className='card-data'>
        <h3 className='card-title txt-200 fs-xl f-alt f-ellipsis'>
          <Link href={chip.url}>
            <a className='inherit'>{chip.title}</a>
          </Link>
        </h3>
        <p className='card-subtitle txt-050 fs-xs m-0'>
          {literals.snippetCollection}
        </p>
      </div>
      <div className='card-description'>
        <p>{chip.description}</p>
      </div>
    </li>
  ) : (
    <li className='collection-chip srfc-01dp txt-200 br-xl'>
      <Link href={chip.url}>
        <a
          className={`inherit relative py-2 px-1 f-center flex j-center a-center f-alt box-border icon icon-${chip.icon} before:fs-lg`}
        >
          {chip.title}
        </a>
      </Link>
    </li>
  );
};

CollectionChip.propTypes = propTypes;

export default CollectionChip;