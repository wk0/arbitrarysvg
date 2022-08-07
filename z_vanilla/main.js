// import { setupCounter } from './counter.js'

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350">
    <script>
      //<![CDATA[
        alert('test js in svg');
        console.log(window);
      //]]>
    </script>
</svg>`

const otherSVG = `
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <script>
  // <![CDATA[
  window.addEventListener('DOMContentLoaded', () => {
    function getColor () {
      const R = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
      const G = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
      const B = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
      return "#314487"
    }

    document.querySelector('circle').addEventListener('click', (e) => {
      e.target.style.fill = getColor()
    })
  })
  // ]]>
  </script>

  <circle cx="5" cy="5" r="4" />
</svg>`

document.querySelector('#app').innerHTML = `
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <script>
  // <![CDATA[
  window.addEventListener('DOMContentLoaded', () => {
    function getColor () {
      const R = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
      const G = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
      const B = Math.round(Math.random() * 255).toString(16).padStart(2,'0')
      return "#314487"
    }

    document.querySelector('circle').addEventListener('click', (e) => {
      e.target.style.fill = getColor()
    })
  })
  // ]]>
  </script>

  <circle cx="5" cy="5" r="4" />
</svg>`
// setupCounter(document.querySelector('#counter'))
