// notatnik z zajęć
const slider = document.querySelector('.slider .list')
const items = document.querySelectorAll('.slider .list .item')
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const dots = document.querySelectorAll('.slider .dots li')

let lengthItems = items.length - 1
let active = 0
next.onclick = () => {
	active = active + 1 <= lengthItems ? active + 1 : 0
	reloadSlider()
}
prev.onclick = () => {
	active = active - 1 >= 0 ? active - 1 : lengthItems
	reloadSlider()
}
let refreshInterval = setInterval(() => {
	next.click()
}, 3000)
const reloadSlider = () => {
	slider.style.left = -items[active].offsetLeft + 'px'
	//
	let last_active_dot = document.querySelector('.slider .dots li.active')
	last_active_dot.classList.remove('active')
	dots[active].classList.add('active')

	clearInterval(refreshInterval)
	refreshInterval = setInterval(() => {
		next.click()
	}, 3000)
}

dots.forEach((li, key) => {
	li.addEventListener('click', () => {
		active = key
		reloadSlider()
	})
})
window.onresize = (event)=> reloadSlider()
// const main = document.querySelector('main')
// const slides = document.querySelectorAll('.slide')

// slides.forEach(
//     (slice,index)=>{
//         slice.style.left = `${index * 100}%`
//     }
// )

// const slideImage = () =>{
//     slices.forEach(
//         (slide) =>{
//             slide.style.transform = `transalteX(-${counter*100}%)`
//         }
//     )
// }
// zmiana styli css elementu
// main.style.transform = "translateX(-10px)"

// zmiana klasy css elementu
// main.classList.add() // .remove(), .toggle()

// jednorazowe wykonanie kodu po określonym czasie
// const timeoutRef = setTimeout(
//     () => {
//         main.innerHTML = 'Msg from setTimeout'
//     },
//     2000
// )

// wykonywanie kodu co określony czas
// let licznik = 0
// const intervalRef = setInterval(
//     () => {
//         main.innerHTML = `Msg from setInterval: ${licznik++}`
//     },
//     4000
// )

// kasujemy setInterval
// clearInterval(intervalRef)

// kasujemy setTimeout
// clearTimeout(intervalRef)

// window.requestAnimationFrame
