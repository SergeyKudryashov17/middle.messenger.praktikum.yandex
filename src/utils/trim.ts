/**
 * Очистка из начала и конца строки заданных символов
 * @param inputString - входная строка
 * @param pattern - символы, требующие удаления
 */
export function trim(inputString: string, pattern: string = ' '): string {
  if (pattern === '') {
    return inputString.trim();
  }

  const regex: RegExp = new RegExp(pattern, 'gi');
  let result: string = inputString.replace(regex, '');

  return result;
}
