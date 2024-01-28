function truncate(str, maxlength) {
  if (str.length <= maxlength) {
    return str;
  }
  let text = str.slice(0, maxlength - 1) + "…";

  return text;
}
