function highlight(table) {
  const trs = table.getElementsByTagName("tr");
  for (let i = 1; i < trs.length; i++) {
    const tr = trs[i];
    const [tdName, tdAge, tdGender, tdStatus] = tr.getElementsByTagName("td");
    if (tdStatus.hasAttribute("data-available")) {
      const dataAvailable = tdStatus.getAttribute("data-available");
      tr.classList.add(dataAvailable === "true" ? "available" : "unavailable");
    } else {
      tr.hidden = true;
    }

    tr.classList.add(tdGender.textContent === "m" ? "male" : "female");
    if (parseInt(tdAge.textContent, 10) < 18) {
      tr.style = "text-decoration: line-through";
    }
  }
}
