search.addEventListener('submit',(e) =>{
    e.preventDefault()
    input.value && console.log('Searching for.... ',input.value)
})