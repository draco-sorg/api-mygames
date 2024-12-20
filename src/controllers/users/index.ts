import * as create from './create';
import * as getUserById from './getUserById';

export const UsersController = {
  ...create,
  ...getUserById,
};
