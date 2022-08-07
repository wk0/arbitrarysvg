window.addEventListener('DOMContentLoaded', () => {
  function getColor () {
    const R = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
    const G = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
    const B = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
    return "#".concat(R.toString(), G.toString(), B.toString());
  }

  document.querySelector('circle').addEventListener('click', (e) => {
    e.target.style.fill = getColor()
  })
})