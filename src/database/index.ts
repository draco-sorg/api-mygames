import { knex } from 'knex';
import { development, production, test } from './config/knexconfig';

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production;
    case 'test':
      return test;
    default:
      return development;
  }
};

export const db = knex(getEnvironment());
