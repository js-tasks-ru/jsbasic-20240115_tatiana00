function ucFirst(str) {
  if (str === "") {
    return str;
  }
  let text = str[0].toUpperCase() + str.slice(1);

  return text;
}
