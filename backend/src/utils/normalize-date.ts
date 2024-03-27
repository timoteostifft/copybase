export function normalizeDate(value: string) {
  if (!value) {
    return null;
  }

  const [date] = value.split(' ');
  let [month, day, year] = date.split('/').map(Number);

  if (year.toString().length < 4) {
    const aux = 20 + year.toString();
    year = Number(aux);
  }

  if (month > 12) {
    return new Date(year, day - 1, month);
  }

  return new Date(year, month - 1, day);
}
