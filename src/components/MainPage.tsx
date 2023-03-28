import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const MainPage: FC = () => (
  <div className="section">
    <div className="container">
      <div className="box">
        <NavLink to="/goods">
          <button className="button is-large is-fullwidth is-vcentered">Open table</button>
        </NavLink>
      </div>
    </div>
  </div>
);
