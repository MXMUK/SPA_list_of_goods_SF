import { FC, useState } from 'react';

import { Loader } from '../Loader';
import { GoodsTable } from '../GoodsTable';
import { useAppSelector } from '../../app/hooks';
import { Good } from '../../types/Good';
import { Status } from '../../types/Status';

type Props = {
  isLoading: boolean;
};

export const GoodsList: FC<Props> = ({ isLoading }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const goods = useAppSelector((state) => state.goods);
  const queryState = useAppSelector((state) => state.filter.query);
  const statusState = useAppSelector((state) => state.filter.status);

  const filterGoods = (goods: Good[], query: string, status: Status) => {
    const filteredByQuery = goods.filter((good) =>
      good.name.toLowerCase().includes(query.toLowerCase().trim())
      ||  good.category.toLowerCase().includes(query.toLowerCase().trim()),
    );

    switch (status) {
      case 'ID':
        return filteredByQuery.sort((good1, good2) => good1.id - good2.id);

      case 'Name':
        return filteredByQuery.sort((good1, good2) => good1.name.localeCompare(good2.name));

      case 'Price':
        return filteredByQuery.sort((good1, good2) => good1.price - good2.price);

      case 'Rating':
        return filteredByQuery.sort((good1, good2) => good1.rating - good2.rating);

      case 'Stock':
        return filteredByQuery.sort((good1, good2) => good1.stock - good2.stock);

      case 'Category':
        return filteredByQuery.sort((good1, good2) => good1.category.localeCompare(good2.category)); 

      default:
        return filteredByQuery;
    }
  };

  const visibleTodos = filterGoods(goods, queryState, statusState);

  return (
    <div className="box table-container">
      <div className="mb-3">
        <label className="checkbox">
          <input type="checkbox" onChange={handleCheckboxChange} checked={isChecked} />
          {`   Reversed`}
        </label>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !goods.length && <p>There are no goods on the server</p>}

      {!isLoading && goods.length > 0 && <GoodsTable goods={isChecked ? visibleTodos.reverse() : visibleTodos} />}
    </div>
  );
};
