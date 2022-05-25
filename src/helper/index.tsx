export const reverseArr = input => {
  let ret = new Array();
  for (let i = input.length - 1; i >= 0; --i) {
    ret.push(input[i]);
  }
  return ret;
};
