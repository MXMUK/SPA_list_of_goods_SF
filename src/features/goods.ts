import { Good } from '../types/Good';

type SetGoodsAction = { type: 'GOODS/SET_GOODS', payload: Good[] };

export const setGoods = (value: Good[]): SetGoodsAction => ({
  type: 'GOODS/SET_GOODS',
  payload: value,
});

type Action = SetGoodsAction;

const goodsReducer = (goods: Good[] = [], action: Action): Good[] => {
  switch (action.type) {
    case 'GOODS/SET_GOODS':
      return action.payload;

    default:
      return goods;
  }
};

export const actions = { setGoods };

export default goodsReducer;
