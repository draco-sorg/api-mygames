import * as create from './create';
import * as getUserById from './getUserById';
import * as update from './updateUser';

export const UsersController = {
  ...create,
  ...getUserById,
  ...update,
};
