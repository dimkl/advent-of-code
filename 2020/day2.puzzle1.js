const passwords = require('./passwords.db.json');

const validPasswords = passwords.filter(([policyRange, letter, passwd]) => {
  letter = letter.replace(':', '');
  let [minNum, maxNum] = policyRange.split('-');

  const policy = new RegExp(`[${letter}]`, 'g');
  const occurrences = passwd.match(policy);

  return occurrences && (occurrences.length >= minNum && occurrences.length <= maxNum);
});

console.log({ count: validPasswords.length });