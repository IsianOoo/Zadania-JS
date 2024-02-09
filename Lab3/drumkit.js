document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
	a: document.querySelector('#s1'),
	q: document.querySelector('#s2'),
	w: document.querySelector('#s3'),
	s: document.querySelector('#s4'),
	e: document.querySelector('#s5'),
	d: document.querySelector('#s6'),
	r: document.querySelector('#s7'),
	f: document.querySelector('#s8'),
	t: document.querySelector('#s9'),
}

const channels = {
	1: {
		recButton: document.getElementById('startRec'),
		stopButton: document.getElementById('stopRec'),
		playButton: document.getElementById('playRec'),
		recSounds: [],
		channel: document.querySelector('#recAudio1'),
		isRec: false,
	},
	2: {
		recButton: document.getElementById('startRec2'),
		stopButton: document.getElementById('stopRec2'),
		playButton: document.getElementById('playRec2'),
		recSounds: [],
		channel: document.querySelector('#recAudio2'),
		isRec: false,
	},
	3: {
		recButton: document.getElementById('startRec3'),
		stopButton: document.getElementById('stopRec3'),
		playButton: document.getElementById('playRec3'),
		recSounds: [],
		channel: document.querySelector('#recAudio3'),
		isRec: false,
	},
	4: {
		recButton: document.getElementById('startRec4'),
		stopButton: document.getElementById('stopRec4'),
		playButton: document.getElementById('playRec4'),
		recSounds: [],
		channel: document.querySelector('#recAudio4'),
		isRec: false,
	},
}

let isPlaying = false
let intervalId

document.getElementById('startStopButton').addEventListener('click', toggleMetronome)

const onKeyPress = (event) => {
	const sound = KeyToSound[event.key]
	playSound(sound)

	for (const [_, channel] of Object.entries(channels)) {
		if (channel.isRec) {
			channel.recSounds.push({ key: event.key, time: Date.now() })
		}
	}
}

const playSound = (sound) => {
	if (sound) {
		sound.currentTime = 0
		sound.play()
	}
}

const toggleMetronome = () => {
	if (isPlaying) {
		stopMetronome()
	} else {
		startMetronome()
	}
}

const startMetronome = () => {
	const bpmInput = document.getElementById('bpmInput')
	const bpm = parseInt(bpmInput.value, 10)

	if (isNaN(bpm) || bpm <= 0) {
		alert('Please enter a valid BPM value.')
		return
	}

	const interval = 60000 / bpm

	intervalId = setInterval(() => {
		playSound(KeyToSound['e'])
		console.log('Tick')
	}, interval)

	isPlaying = true
	document.getElementById('startStopButton').textContent = 'Stop'
	bpmInput.disabled = true
}

const stopMetronome = () => {
	clearInterval(intervalId)
	isPlaying = false
	document.getElementById('startStopButton').textContent = 'Start'
	document.getElementById('bpmInput').disabled = false
}

const startRec = (channelNumber) => {
	const channel = channels[channelNumber]
	channel.isRec = true
	channel.recSounds = []
}

const stopRec = (channelNumber) => {
	const channel = channels[channelNumber]
	channel.isRec = false
}

const playRec = (channelNumber) => {
	const channel = channels[channelNumber]
	channel.channel.src = ''
	playRecHelper(channel)
}

const playRecHelper = (channel) => {
	channel.recSounds.forEach((rec, index) => {
		setTimeout(
			() => {
				playSound(KeyToSound[rec.key])
			},
			index === 0 ? 0 : rec.time - channel.recSounds[0].time
		)
	})

	setTimeout(() => {
		const blobData = channel.recSounds.map(() => KeyToSound[channel.recSounds[0].key].blob)
		const blob = new Blob(blobData, { type: 'audio/wav' })
		channel.channel.src = URL.createObjectURL(blob)
	}, channel.recSounds[channel.recSounds.length - 1].time - channel.recSounds[0].time)
}

for (let i = 1; i <= Object.keys(channels).length; i++) {
	const channelNumber = i
	const channel = channels[channelNumber]

	channel.recButton.addEventListener('click', () => startRec(channelNumber))
	channel.stopButton.addEventListener('click', () => stopRec(channelNumber))
	channel.playButton.addEventListener('click', () => playRec(channelNumber))
}

const playAll = () => {
	for (const [channelNumber, channel] of Object.entries(channels)) {
		playRecHelper(channel)
	}
}
document.getElementById('playAll').addEventListener('click', playAll)
