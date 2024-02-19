function makeFriendsList(friends) {
  const result = friends
    .reduce((acc, item) => {
      acc.push(`<li>${item.firstName} ${item.lastName}</li>`);
      return acc;
    }, [])
    .join("\n");
  document.body.innerHTML = `<ul>${result}</ul>`;
  return document.body.firstChild;
}
