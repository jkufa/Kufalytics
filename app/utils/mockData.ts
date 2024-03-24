import { VisitorView } from "./enums";

export function genDates(period: VisitorView): string[] {
  const dates: string[] = [];
  const today = new Date();
  const dayOfMonth = today.getDate();
  const month = today.getMonth();
  /**
   * Either a day or a month
   */
  let unit = 0; 

  if (period === VisitorView['Year to date']) {
    const d = new Date();
    while (unit < month + 1) {
      d.setMonth(unit);
      dates.push(`${Intl.DateTimeFormat('en-US', { month: 'short'}).format(d)}`);
      unit++;
    }
    return dates;
  }

  if (period === VisitorView['Last week']) {
    unit = dayOfMonth - 7;
  }

  while (unit < dayOfMonth) {
    dates.push(`${today.toLocaleDateString('en-US', { month: 'short'})} ${unit + 1}`);
    unit++;
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