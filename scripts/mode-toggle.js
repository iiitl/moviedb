let modeToggleButton = document.querySelector('.nav-links.right');
let rootElement = document.querySelector('html');

modeToggleButton.addEventListener('click', (e) => {
  console.log(rootElement.className); 
  if(rootElement.className == 'dark') {
    rootElement.className = 'light';
  }
  else {
    rootElement.className = 'dark';
  }
});