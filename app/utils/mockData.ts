export function genDates(period: 'month' | 'week'): string[] {
  const dates: string[] = [];
  const today = new Date();
  const dayOfMonth = today.getDate();

  let day = 0;
  if (period === 'week') {
    day = dayOfMonth - 7;
  }

  while (day < dayOfMonth) {
    dates.push(`${today.toLocaleDateString('en-US', { month: 'short'})} ${day + 1}`);
    day++;
  }
  return dates;
}

export function genViews(numberOfDays: number, multiplier = 10): number[] {
  const views: number[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    views.push(Math.floor(gaussianRand() * multiplier));
  }

  return views;
}

function gaussianRand(): number {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
}