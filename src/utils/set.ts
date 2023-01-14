import { merge, Indexed } from "./merge";

/**
 * Установка значения свойству объекта
 * @param object - исходный объект
 * @param path - путь до необходимого свойства
 * @param value - значение которое нужно установить
 */
export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
}
