const readline = require('readline');
const { createReadStream } = require('fs');

console.time('day4.puzzle1');

const readInterface = readline.createInterface({
  input: createReadStream('./passports.txt', { encoding: 'utf8' }),
  console: false
});

/*
byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID) (ignore this)
*/
const REQUIRED_FIELDS = Object.freeze(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);

const matcherFactory = (field) => new RegExp(`${field}\:\\S+`);
const isPassportValid = (passport) => REQUIRED_FIELDS.every(field => !!passport.match(matcherFactory(field)));

let validPasswords = 0;
let passport = '';
readInterface.on('line', function (line) {
  if (line) return passport += ` ${line}`;
  if (isPassportValid(passport)) validPasswords += 1;
  passport = '';
});

readInterface.on('close', () => {
  // check last result
  if (isPassportValid(passport)) validPasswords += 1;
  console.log({ validPasswords });
  console.timeEnd('day4.puzzle1');
})
