const readline = require('readline');
const { createReadStream } = require('fs');
console.time('day4.puzzle2');
const readInterface = readline.createInterface({
  input: createReadStream('./passports.txt', { encoding: 'utf8' }),
  console: false
});

const inRange = (value, atLeast, atMost) => {
  if (!atLeast || !atMost) return true;
  return value >= atLeast && value <= atMost;
};
const UNIT_POLICIES = Object.freeze({
  "in": (value) => inRange(value, 59, 76),
  "cm": (value) => inRange(value, 150, 193)
});
const POLICIES = Object.freeze({
  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  'byr': (raw) => {
    const [_, _2, value] = raw.match(/(byr)\:(\d{4})/) || [];
    return !!value && inRange(value, 1920, 2002);
  },
  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  'iyr': (raw) => {
    const [_, _2, value] = raw.match(/(iyr)\:(\d{4})/) || [];
    return !!value && inRange(value, 2010, 2020);
  },
  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  'eyr': (raw) => {
    const [_, _2, value] = raw.match(/(eyr)\:(\d{4})/) || [];
    return !!value && inRange(value, 2020, 2030);
  },
  /* 
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
  */
  'hgt': (raw) => {
    const [_, _2, value, unit] = (raw.match(/(hgt)\:(\d{2,3})(in|cm)/) || []);
    return !!value && UNIT_POLICIES[unit](value);
  },
  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  'hcl': (raw) => {
    return !!raw.match(/(hcl)\:\#([0-9a-f]){6}/)
  },
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  'ecl': (raw) => {
    return !!raw.match(/(ecl)\:(amb|blu|brn|gry|grn|hzl|oth)/)
  },
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  'pid': (raw) => {
    return !!raw.match(/(pid)\:(\d{9})/);
  }
});

const REQUIRED_FIELDS = Object.freeze(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
const isPassportValid = (passport) => REQUIRED_FIELDS.every(field => POLICIES[field](passport));

let validPassports = 0;
let passport = '';
readInterface.on('line', function (line) {
  if (line) return passport += ` ${line}`;
  if (isPassportValid(passport)) validPassports += 1;
  passport = '';
});
readInterface.on('close', () => {
  console.log({ validPassports })
  console.timeEnd('day4.puzzle2');
})
