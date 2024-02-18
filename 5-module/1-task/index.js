function hideSelf() {
  const buttons = document.body.getElementsByClassName("hide-self-button");

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.onclick = () => (button.hidden = true);
  }
}
