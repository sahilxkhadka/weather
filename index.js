let loc = document.getElementById("location")
let tempIcon = document.getElementById("temp-icon")
let tempValue = document.getElementById("temp-value")
let climate = document.getElementById("climate")
let iconFile
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", (e)=> {
    e.preventDefault()
    getWeather(searchInput.value)
    searchInput.value = ""
})

const getWeather = async (city) => {
    try {
        // const proxy = "https://cors-anywhere.herokuapp.com/"
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f33f1bf93cff32a52de6c75000a70923`)
        const weatherData = await response.json()
        console.log(weatherData)
        const {name} = weatherData
        const {feels_like} = weatherData.main
        const{id, main} = weatherData.weather[0]
        loc.textContent = name
        climate.textContent = main
        tempValue.textContent = Math.round(feels_like - 273)
        if (id >= 200 && id < 300) {
            tempIcon.src = "./icons/thunderstorm.png"
        }
        else if (id >= 300 && id < 400) {
            tempIcon.src = "./icons/drizzle.png"
        }
        else if (id >= 500 && id < 600) {
            tempIcon.src = "./icons/raining.png"
        }
        else if (id >= 600 && id < 700) {
            tempIcon.src = "./icons/snow.png"
        }
        else if (id > 700 && id < 800) {
            tempIcon.src = "./icons/atmosphere.png"
        }
        else if (id == 800) {
            tempIcon.src = "./icons/sun.png"
        }
        else if (id > 800) {
            tempIcon.src = "./icons/cloud.png"
        }
    }
    catch (error) {
        alert("City not found")
    }
}

window.addEventListener("load", ()=> {
    let long
    let lat
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition ((position) => 
        {
            long = position.coords.longitude
            lat = position.coords.latitude
            // const proxy = "https://cors-anywhere.herokuapp.com/"
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f33f1bf93cff32a52de6c75000a70923`
            fetch(api).then((response) => {
                return response.json()
            })
            .then (data => 
                {
                    const {name} = data
                    const {feels_like} = data.main
                    const {id, main} = data.weather[0]

                    loc.textContent = name
                    climate.textContent = main
                    tempValue.textContent = Math.round(feels_like - 273)
                    if (id >= 200 && id < 300) {
                        tempIcon.src = "./icons/thunderstorm.png"
                    }
                    else if (id >= 300 && id < 400) {
                        tempIcon.src = "./icons/drizzle.png"
                    }
                    else if (id >= 500 && id < 600) {
                        tempIcon.src = "./icons/raining.png"
                    }
                    else if (id >= 600 && id < 700) {
                        tempIcon.src = "./icons/snow.png"
                    }
                    else if (id > 700 && id < 800) {
                        tempIcon.src = "./icons/atmosphere.png"
                    }
                    else if (id == 800) {
                        tempIcon.src = "./icons/sun.png"
                    }
                    else if (id > 800) {
                        tempIcon.src = "./icons/cloud.png"
                    }
                })
        }
        )}
})