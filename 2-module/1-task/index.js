function sumSalary(salaries) {
  let result = 0;
  for (key in salaries) {
    if (
      typeof salaries[key] === "number" &&
      !isNaN(salaries[key]) &&
      salaries[key] !== Infinity &&
      salaries[key] !== -Infinity
    ) {
      result = result + salaries[key];
    }
  }
  return result;
}
