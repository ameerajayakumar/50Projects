const button = document.querySelector('.btn')
const input = document.querySelector('.input')
const search = document.querySelector('.search')

// change HTML tag form back to div for below to work as expected
// button.addEventListener('click',() => {
// search.classList.toggle('active')
// input.focus();
// })

button.addEventListener('click',(e) => {
    search.classList.add('active')
    input.focus();
    })

document.addEventListener('click',(e) => {
    if(e.target.nodeName === 'BODY')
    search.classList.remove('active')
})    

search.addEventListener('submit',(e) =>{
    e.preventDefault()
    input.value && console.log('Searching for.... ',input.value)
})