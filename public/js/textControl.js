// including file
import { inputColor } from '/js/allFunctions.js';

const editParents = document.querySelectorAll('.editParents');

editParents.forEach((parent) => {
   let input = parent.firstElementChild;
   let span = parent.lastElementChild;

   input.addEventListener('keyup', () => {
      inputColor(parent, input, span);
   })
})