import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Good } from '../../types/Good';
import { GoodItem } from '../GoodItem';

type Props = {
  goods: Good[];
};

export const GoodsTable: FC<Props> = ({ goods }) => {
  const { slug } = useParams();

  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Photo</th>
          <th>Rating</th>
          <th>Stock</th>
          <th>Category</th>
        </tr>
      </thead>

      <tbody>
        {goods.map((good) => (
          <GoodItem good={good} key={good.id} />
        ))}
      </tbody>
    </table>
  );
};
