const passwords = require('./passwords.db.json');

const validPasswords = passwords.filter(([policyFormat, letter, passwd]) => {
  letter = letter.replace(':', '');
  let positions = policyFormat.split('-');
  
  const bothMatch = positions.every((position) => passwd[position - 1] == letter);
  const atLeastOneMatches = positions.some((position) => passwd[position - 1] == letter);

  return atLeastOneMatches && !bothMatch;
});

console.log({ count: validPasswords.length });