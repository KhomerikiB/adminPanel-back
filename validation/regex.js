const replaceCharacters = str => {
  const regExpr = /[^a-zA-Z0-9-. ]/g;
  return str.trim().replace(regExpr, "");
};
const replaceSpace = str => {
  return str.replace(/\s/g, "-");
};
module.exports = { replaceCharacters, replaceSpace };
