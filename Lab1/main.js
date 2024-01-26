
document.addEventListener("DOMContentLoaded", (event) => {   
// notatnik z zajęć
const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')
const btnPrzelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')


const inputs = document.querySelector('#inputs').querySelectorAll('input')

function calc(){
    let suma =0

    for(let i=0; i< inputs.length; i++)
    {
        let val = parseFloat(inputs[i].value)
        
        suma+=val
    }
    let srednia = suma/inputs.length
    let min = Math.min(...Array.from(inputs).map(number => parseFloat(number.value)))
    let max = Math.max(...Array.from(inputs).map(number => parseFloat(number.value)))
    
    // console.log(min);

    // console.log(suma)
    // console.log(max);
    // console.log(srednia);
    
    wynikiPojemnik.innerHTML = `<p>Suma: ${suma}</p>
    <p>Średnia: ${srednia}</p>
    <p>Minimum: ${min}</p>
    <p>Maximum: ${max}</p>`

}

inputs.forEach((number)=>{
    number.addEventListener('input', calc);
})

btnPrzelicz.addEventListener('click', () => {
    
    
})
 });