export default function getShortDate(date: string): string {
  const today = new Date();
  const dateObj = new Date(date);

  let response: string;
  if (isToday(today, dateObj)) {
    let hours: number | string = dateObj.getHours();
    if (hours < 10) {
      hours = addZero(hours);
    }

    let minutes: number | string = dateObj.getMinutes();
    if (minutes < 10) {
      minutes = addZero(minutes);
    }

    response = `${hours}:${minutes}`;
  } else {
    let day: number | string = dateObj.getDate();
    if (day < 10) {
      day = addZero(day);
    }
    let month: number | string = dateObj.getMonth();
    if (month < 10) {
      month = addZero(month);
    }
    let year = dateObj.getFullYear();
    response = `${day}.${month}.${year}`;
  }

  return response;
}

function isToday(firstDate: Date, secondDate: Date): boolean {
  const firstDateString = `${firstDate.getDate()}.${firstDate.getMonth()}.${firstDate.getFullYear()}`;
  const secondDateString = `${secondDate.getDate()}.${secondDate.getMonth()}.${secondDate.getFullYear()}`;

  return firstDateString === secondDateString;
}

function addZero(value: string | number) {
  return `0${value}`;
}
