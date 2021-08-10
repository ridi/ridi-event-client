import mapKeys from 'lodash/mapKeys';
import snakeCase from 'lodash/snakeCase';

export function convertKeyToSnakeCase(obj: Record<any, any>): Record<any, any> {
  return mapKeys(obj, (v, k) => snakeCase(k));
}
