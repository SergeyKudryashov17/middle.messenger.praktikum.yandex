type PlainObject<T = any> = {
  [k in string]: T;
};

/**
 * Определение является ли переменна объектом
 * @param value - переменная
 */
function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Определение является ли переменна массивом
 * @param value - переменная
 */
function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

/**
 * Определение является ли переменна массивом или объектом
 * @param value - переменная
 */
function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

/**
 * Определение равны ли объекты между собой (сравнение по значениям, а не ссылке)
 * @param lhs - первый объект
 * @param rhs - второй объект
 * @return boolean - результат сравнения
 */
export default function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (!isPlainObject(lhs) || !isPlainObject(rhs)) {
    return false;
  }
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
