function showSalary(users, age) {
  return users
    .reduce((acc, user) => {
      if (user.age <= age) {
        acc.push(`${user.name}, ${user.balance}`);
      }
      return acc;
    }, [])
    .join("\n");
}
