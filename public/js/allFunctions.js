const clearMessage = (element, second) => {
   setTimeout(() => {
      element.innerHTML = ''
   }, 1000 * second)
}

const timingReload = (second) => {
   setTimeout(() => {
      window.location.reload()
   }, 1000 * second)
}

function validateAFM(afm) {
   if (!afm.match(/^\d{9}$/) || afm == '000000000')
      return false;

   var m = 1, sum = 0;
   for (var i = 7; i >= 0; i--) {
      m *= 2;
      sum += afm.charAt(i) * m;
   }

   return sum % 11 % 10 == afm.charAt(8);
}


const inputColor = (parent, input, span) => {
   let value = input.value
   if (value.length === 0) {
      parent.style.borderColor = '#FA7070';
      span.style.backgroundColor = '#FA7070';
      span.style.borderColor = '#FA7070';
      span.style.color = 'white';
   }
   else {
      parent.style.borderColor = 'white';
      span.style.backgroundColor = 'rgb(193, 193, 193)';
      span.style.borderColor = 'white';
      span.style.color = 'black';
   }

   if (input.name === 'taxNO') {
      if (!validateAFM(value)) {
         parent.style.borderColor = '#FA7070';
         span.style.backgroundColor = '#FA7070';
         span.style.borderColor = '#FA7070';
         span.style.color = 'white';
      }
      else {
         parent.style.borderColor = 'white';
         span.style.backgroundColor = 'rgb(193, 193, 193)';
         span.style.borderColor = 'white';
         span.style.color = 'black';
      }
   }
}





export {
   clearMessage,
   timingReload,
   validateAFM,
   inputColor
}