function toggleText() {
  const buttons = document.body.getElementsByClassName("toggle-text-button");
  const text = document.getElementById("text");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    
    button.onclick = () => (text.hidden = !text.hasAttribute('hidden'));
  }
}
