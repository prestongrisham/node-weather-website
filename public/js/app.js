const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            messageOne.textContent = ''
            if (data.error) {
                messageTwo.textContent = data.error
                return console.log(data.error)
            }
            console.log(data.location)
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.data
        })
    })

    console.log(location)
})