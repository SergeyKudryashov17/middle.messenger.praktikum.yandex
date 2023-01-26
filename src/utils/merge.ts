/**
 * Объединение двух объектов в один с сохранением ключей
 * @param lhs - первый объект для объединения
 * @param rhs - второй объект для объединения
 */
export type Indexed<T = unknown> = {
  [key in string]: T;
};
export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p]?.constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
