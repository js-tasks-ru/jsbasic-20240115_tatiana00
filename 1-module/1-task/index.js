function factorial(n) {
  if (typeof n !== 'number') {
    return null;
  }
  if (n < 0) {
    return null;
  }
  let result = 1;
  for (let i = 0; i < n; i++) {
    result = result * (n - i);
  }
  return result;
}
