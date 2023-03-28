import classNames from 'classnames';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteItem, getAll } from '../../api/Goods';
import { setGoods } from '../../features/goods';
import { Good } from '../../types/Good';

type Props = {
  good: Good;
};

export const GoodItem: FC<Props> = ({ good }) => {
  const { id, name, description, price, photo, rating, stock, category } = good;

  const dispatch = useDispatch();

  const handleDelete = useCallback(async (itemId: number) => {
    try {
      await deleteItem(itemId + '');
    } catch (err) {
      console.log(err);
    } finally {
      const allGoods = await getAll();

      dispatch(setGoods(allGoods));
    }
  }, []);

  return (
    <tr
      className={classNames({
        'has-background-warning': false,
      })}>
      <td className="is-size-4">
        <NavLink to={`/people/${1}`}>{id}</NavLink>
      </td>

      <td className="is-size-5">{name}</td>

      <td>{description}</td>

      <td className="is-size-5">{`${price}$`}</td>

      <td>
        <img src={photo} alt="img" />
      </td>

      <td className="is-size-5">
        <div className="is-flex">
          {rating}
          
          <div className="ml-1">
            <span className="icon">
              <i className="fa-solid fa-star fa-sm" style={{ color: '#fff700' }}></i>
            </span>
          </div>
        </div>
      </td>

      <td className="is-size-5">{stock}</td>

      <td>{category}</td>

      <td className="has-text-centered">
        <i
          className="fa-solid fa-trash is-clickable"
          style={{ color: '#000000' }}
          onClick={() => handleDelete(id)}></i>
      </td>
    </tr>
  );
};
