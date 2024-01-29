function checkSpam(str) {
  let text = str.toLowerCase();
  if (text.includes("1xbet") || text.includes("xxx")) {
    return true;
  } else {
    return false;
  }
}
