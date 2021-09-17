const fetchForecast = (address, callback) => {
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            callback(data)
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.getElementsByName('address')[0]
const messageForecast = document.querySelector('#forecastData')
const messageCity = document.querySelector('#cityData')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    fetchForecast(address, (data) => {
        console.log(data)
        if (data.forecast) {
            messageForecast.textContent = `Forecast: ${data.forecast}`
            messageCity.textContent = `City: ${data.location}`
        }
        else{
            messageForecast.textContent = data.error
            messageCity.textContent = ''
        }
    })


})
