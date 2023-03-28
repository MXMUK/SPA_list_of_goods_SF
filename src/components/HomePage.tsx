import { FC, useState, useEffect, useCallback, memo } from 'react';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoFilter } from '../components/TodoFilter';
import { TodoModal } from './FormModal';
import { Loader } from '../components/Loader';
import { GoodsList } from './GoodsList';
import { useDispatch } from 'react-redux';
import { setGoods } from '../features/goods';
import { getAll } from '../api/Goods';

export const HomePage: FC = memo(() => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const dispatch = useDispatch();

  const loadGoods = useCallback(async () => {
    try {
      setIsLoading(true);

      const allGoods = await getAll();

      dispatch(setGoods(allGoods));
    } catch (err) {
      throw new Error(`${err}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGoods();
  }, [loadGoods]);

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Goods:</h1>

          <div className="block">
            <TodoFilter />
          </div>

          <div className="is-flex is-justify-content-flex-end is-flex-direction-row mb-5">
            <span className="icon is-clickable" onClick={() => setModalIsOpen(true)}>
              <i className="fa-solid fa-plus fas fa-2x"></i>
            </span>
          </div>

          <div className="block">
            {true ? (
              <GoodsList
                isLoading={isLoading}
              />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {modalIsOpen && <TodoModal onClose={setModalIsOpen} />}
    </div>
  );
});
