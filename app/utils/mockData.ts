import { VisitorView } from "./enums";
/**
 * Yoinked from https://dirask.com/posts/JavaScript-list-of-ISO-3166-country-codes-prwyAj
 */
import COUNTRIES from './COUNTRIES.json';

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

/**
 * Returns a random country from an array of countries
 * 
 * @returns {string} A random country
 */
export function getRandomCountry(): Country {
  // Get a random index from the array
  const randomIndex = Math.floor(Math.random() * COUNTRIES.length);
  
  // Return the country at that index
  return COUNTRIES[randomIndex];
}

export function genCountries(count: number) {
  const MAX_LEN = COUNTRIES.length;
  if (MAX_LEN < count) {
    console.warn(`Cannot to generate more countries than available.\nReducing count down to ${MAX_LEN}.`);
    count = MAX_LEN;
  }
  const seen = new Set<string>();
  return Array.from({ length: count }, () => {
    let country = getRandomCountry();
    while (seen.has(country.code)) {
      country = getRandomCountry();
    }
    seen.add(country.code);
    return `${getFlagEmoji(country.code)} ${country.names[0]}`;
  });
}

/**
 * Yoinked from https://dev.to/jorik/country-code-to-flag-emoji-a21
 */
export function getFlagEmoji(countryCode: string) {
  const UTF_OFFSET = 127397;
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  UTF_OFFSET + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

type Country = { names: string[], code: string }