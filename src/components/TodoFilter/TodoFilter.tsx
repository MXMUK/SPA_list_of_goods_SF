import { FC, memo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';


export const TodoFilter: FC = memo(() => {
  const dispatch = useDispatch();
  const query = useAppSelector((state) => state.filter.query);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterActions.setStatus(event.target.value as Status));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };
  return (
    <form className="field has-addons" onSubmit={(event) => event.preventDefault()}>
      <p className="control">
        <span className="select">
          <select onChange={(event) => handleStatusChange(event)}>
            <option value="ID">ID</option>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
            <option value="Rating">Rating</option>
            <option value="Stock">Stock</option>
            <option value="Category">Category</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => handleQueryChange(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right">
            <button
              type="button"
              className="delete"
              onClick={() => dispatch(filterActions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
});
