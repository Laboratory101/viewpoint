import generator from 'generate-password';

export function generatePin () {
  return generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    strict: true
  });
}

export function addDays (date: any, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.getTime();
}
