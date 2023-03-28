import { Good } from '../types/Good';

import { client } from '../fetchGoods';

export const getAll = () => {
  return client.get<Good[]>('');
};

export const getById = (slug: string) => {
  return client.get<Good>(slug);
};

export const deleteItem = (id: string) => {
  return client.delete(`/${id}`);
};

export const createItem = (body: any) => {
  return client.post('', body)
}
