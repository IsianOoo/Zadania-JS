const form = document.querySelector("#search-form")
const input = document.querySelector("#search-term")
const msg = document.querySelector(".form-msg")
const list = document.querySelector(".cities")

const apiKey = "4d8fb5b93d4af21d66a2948710284366"


document.addEventListener('DOMContentLoaded', () => {
    const cities = JSON.parse(localStorage.getItem('cities')) || []
    cities.forEach(city => addCityToDom(city))
})

form.addEventListener('submit', e => {
    e.preventDefault()

    msg.textContent = ''
    msg.classList.remove('visible')

    let inputVal = input.value.trim()

    if (!inputVal) return;

    let cities = JSON.parse(localStorage.getItem('cities')) || []

    if (cities.includes(inputVal.toLowerCase())) {
        msg.textContent = `You already know the weather for ${inputVal}... Otherwise, be more specific by providing the country code as well 😉`;
        msg.classList.add('visible');

        form.reset()
        input.focus()

        return
    }

    if (cities.length >= 10) {
        msg.textContent = 'You can only save up to 10 cities.'
        msg.classList.add('visible')

        form.reset()
        input.focus()

        return
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod == '404') {
                throw new Error(`${data.cod}, ${data.message}`)
            }

            const { main, name, sys, weather } = data

            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

            const li = document.createElement('li')

            const markup = `
                <figure>
                    <img src="${icon}" alt="${weather[0].description}">
                </figure>

                <div>
                    <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
                    <p class="city__conditions">${weather[0].description.toUpperCase()}</p>
                    <p class="city__conditions">Humidity: ${main.humidity}%</p>
                    <h3><span class="city__name">${name}</span></h3>
                </div>
                <button class="btn-remove">Remove</button> <!-- Button to remove city -->
            `

            li.innerHTML = markup

            list.appendChild(li)

            cities.push(name.toLowerCase())
            localStorage.setItem('cities', JSON.stringify(cities))

            form.reset()
            input.focus()
        })
        .catch(() => {
            msg.textContent = 'Please search for a valid city!'
            msg.classList.add('visible')
        })
})


list.addEventListener('click', e => {
    if (e.target.classList.contains('btn-remove')) {
        const cityName = e.target.previousElementSibling.querySelector('.city__name').textContent
        removeCity(cityName)
    }
})

function addCityToDom(cityName) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data

            const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

            const li = document.createElement('li')

            const markup = `
                <figure>
                    <img src="${icon}" alt="${weather[0].description}">
                </figure>

                <div>
                    <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
                    <p class="city__conditions">${weather[0].description.toUpperCase()}</p>
                    <p class="city__conditions">Humidity: ${main.humidity}%</p>
                    <h3><span class="city__name">${name}</span></h3>
                </div>
                <button class="btn-remove">Remove</button> <!-- Button to remove city -->
            `

            li.innerHTML = markup

            list.appendChild(li)
        })
        .catch(() => {
            msg.textContent = 'Error fetching weather data for saved cities.'
            msg.classList.add('visible')
        })
}

function removeCity(cityName) {
    let cities = JSON.parse(localStorage.getItem('cities')) || []
    cities = cities.filter(city => city.toLowerCase() !== cityName.toLowerCase())
    localStorage.setItem('cities', JSON.stringify(cities))

    const liToRemove = [...list.querySelectorAll('.cities li')].find(li => li.querySelector('.city__name').textContent.toLowerCase() === cityName.toLowerCase())
    if (liToRemove) {
        liToRemove.remove()
    }
}




// const form = document.querySelector("#search-form")
// const input = document.querySelector("#search-term")
// const msg = document.querySelector(".form-msg")
// const list = document.querySelector(".cities")

// const apiKey = "2b308668768aa4a9877f871678af437e"


// document.addEventListener('DOMContentLoaded', () => {
//     const cities = JSON.parse(localStorage.getItem('cities')) || []
//     cities.forEach(city => addCityToDom(city))
// })

// form.addEventListener('submit', e => {
//     e.preventDefault()

//     msg.textContent = ''
//     msg.classList.remove('visible')

//     let inputVal = input.value.trim()

//     if (!inputVal) return;

//     let cities = JSON.parse(localStorage.getItem('cities')) || []

//     if (cities.includes(inputVal.toLowerCase())) {
//         msg.textContent = `You already know the weather for ${inputVal}... Otherwise, be more specific by providing the country code as well 😉`;
//         msg.classList.add('visible');

//         form.reset()
//         input.focus()

//         return
//     }

//     if (cities.length >= 10) {
//         msg.textContent = 'You can only save up to 10 cities.'
//         msg.classList.add('visible')

//         form.reset()
//         input.focus()

//         return
//     }

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (data.cod == '404') {
//                 throw new Error(`${data.cod}, ${data.message}`)
//             }

//             const { main, name, sys, weather } = data

//             const icon = `img/weather/${weather[0]['icon']}.svg`

//             const li = document.createElement('li')

//             const markup = `
//                 <figure>
//                     <img src="${icon}" alt="${weather[0]['description']}">
//                 </figure>

//                 <div>
//                     <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
//                     <p class="city__conditions">${weather[0]['description'].toUpperCase()}</p>
//                     <h3><span class="city__name">${name}</span></h3>
//                 </div>
//                 <button class="btn-remove">Remove</button> <!-- Button to remove city -->
//             `

//             li.innerHTML = markup

//             list.appendChild(li)

//             cities.push(name.toLowerCase())
//             localStorage.setItem('cities', JSON.stringify(cities))

//             form.reset()
//             input.focus()
//         })
//         .catch(() => {
//             msg.textContent = 'Please search for a valid city!'
//             msg.classList.add('visible')
//         })
// })


// list.addEventListener('click', e => {
//     if (e.target.classList.contains('btn-remove')) {
//         const cityName = e.target.previousElementSibling.querySelector('.city__name').textContent
//         removeCity(cityName)
//     }
// })

// function addCityToDom(cityName) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`

//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const { main, name, sys, weather } = data

//             const icon = `img/weather/${weather[0]['icon']}.svg`

//             const li = document.createElement('li')

//             const markup = `
//                 <figure>
//                     <img src="${icon}" alt="${weather[0]['description']}">
//                 </figure>

//                 <div>
//                     <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
//                     <p class="city__conditions">${weather[0]['description'].toUpperCase()}</p>
//                     <h3><span class="city__name">${name}</span><span class="city__country">${sys.country}</span></h3>
//                 </div>
//                 <button class="btn-remove">Remove</button> <!-- Button to remove city -->
//             `

//             li.innerHTML = markup

//             list.appendChild(li)
//         })
//         .catch(() => {
//             msg.textContent = 'Error fetching weather data for saved cities.'
//             msg.classList.add('visible')
//         })
// }

// function removeCity(cityName) {
//     let cities = JSON.parse(localStorage.getItem('cities')) || []
//     cities = cities.filter(city => city.toLowerCase() !== cityName.toLowerCase())
//     localStorage.setItem('cities', JSON.stringify(cities))

//     const liToRemove = [...list.querySelectorAll('.cities li')].find(li => li.querySelector('.city__name').textContent.toLowerCase() === cityName.toLowerCase())
//     if (liToRemove) {
//         liToRemove.remove()
//     }
// }


