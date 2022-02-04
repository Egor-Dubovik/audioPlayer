const audioPlayer = document.querySelector('.audio-player');
const player = document.querySelector('.player');
const btnPlay = document.querySelector('.play-pause');
const btnRight = document.querySelector('.ff');
const btnLeft = document.querySelector('.rw');
const btnShuffle = document.querySelector('.shuffle');
const btnRepeat = document.querySelector('.repeat');
const progressBar = document.querySelector('.progress');
const progress = document.querySelector('.progress span');
const time = document.querySelector('.current-time');
const title = document.querySelector('.title');
const executor = document.querySelector('.executor');
const img = document.querySelector('.cover img');
const background = document.querySelector('.background');


audioPlayer.addEventListener('timeupdate', progressUpdate);
btnPlay.addEventListener('click', togglePlay);
progressBar.addEventListener('click', audioRewind);
btnRight.addEventListener('click', switchNext);
btnLeft.addEventListener('click', switchPrev);
btnRepeat.addEventListener('click', repeatAudio);



// --------вкл/откл трека----------- 
let plaingSong = false;

function playSong() {
	audioPlayer.play();
	player.classList.add('playing');
	plaingSong = true;
}

function pauseSong() {
	audioPlayer.pause();
	player.classList.remove('playing');
	plaingSong = false;
}

function togglePlay() {
	(plaingSong === false) ? playSong() : pauseSong();
}


// отображение времени и прогресса воспроизведения трека 
function secToMin(time) {
	let minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);

	return minutes + ':' + ('0' + seconds).slice(-2);
}

function progressUpdate() {
	const fullTime = (isNaN(audioPlayer.duration)) ? 0 : audioPlayer.duration;
	let currentTime = audioPlayer.currentTime;

	time.textContent = secToMin(fullTime - currentTime);
	progress.style.width = (currentTime / fullTime * 100) + '%';
}


// перемотка трека
function audioRewind(e) {
	const width = this.offsetWidth;
	let curWidth = e.offsetX;

	progress.style.width = (curWidth / width * 100) + '%'
	audioPlayer.currentTime = audioPlayer.duration * (curWidth / width);
}


//-----переключение треков--------------------- 
const allSongs = [
	{
		name: 'Call me maybe',
		singer: 'CARLY RAE JEPSEN',
		path: 'Call_Me_Maybe.mp3',
		img: 'callme.jpg'
	},
	{
		name: 'Comatose ',
		singer: 'Skillet',
		path: 'Comatose.mp3',
		img: 'comatose.jpg'
	},
	{
		name: "Don't Start Now",
		singer: 'Dua Lipa',
		path: 'dontstartnow.mp3',
		img: 'dontstartnow.png'
	},
	{
		name: "Don't Hurt Yourself",
		singer: 'Beyonce',
		path: 'lemonade.mp3',
		img: 'lemonade.png'
	},
	{
		name: 'Rebirthing',
		singer: 'Skillet',
		path: 'Rebirthing.mp3',
		img: 'skillet.jpg'
	},
];


let indSong = 0;

function loadTrack(indSong) {
	audioPlayer.src = `./assets/audio/${allSongs[indSong].path}`
	img.src = `./assets/img/${allSongs[indSong].img}`
	background.src = `./assets/img/${allSongs[indSong].img}`;
	title.textContent = allSongs[indSong].name;
	executor.textContent = allSongs[indSong].singer;
	audioPlayer.load();
}
loadTrack(indSong);

const amount = document.querySelector('.amount__full');
const numb = document.querySelector('.amount__live')

amount.textContent = allSongs.length;


function switchNext() {
	if (indSong < allSongs.length - 1) {
		indSong += 1;
		loadTrack(indSong);
		playSong();
		numb.textContent = indSong + 1;
	} else {
		indSong = 0;
		loadTrack(indSong);
		playSong(indSong);
		numb.textContent = indSong + 1;
	}
}

function switchPrev() {
	if (indSong > 0) {
		indSong -= 1;
		loadTrack(indSong);
		playSong();
		numb.textContent = indSong + 1;
	}
	else {
		indSong = allSongs.length - 1;
		console.log(indSong);
		loadTrack(indSong);
		playSong(indSong);
		numb.textContent = allSongs.length;
	}
}


// перемешиваем трэки
btnShuffle.addEventListener('click', () => {
	for (let i = allSongs.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[allSongs[i], allSongs[j]] = [allSongs[j], allSongs[i]];
	}
	loadTrack(indSong);

	btnShuffle.classList.add('active');
	setTimeout(() => {
		btnShuffle.classList.remove('active');
	}, 1000)
	console.log(allSongs)
});


// повторять трек
function repeatAudio() {
	if (audioPlayer.loop === false) {
		audioPlayer.loop = true;
		btnRepeat.classList.add('active');
	} else {
		audioPlayer.loop = false;
		btnRepeat.classList.remove('active');
	}

}

// при завершении трека, включ-е следующего автоматически
audioPlayer.addEventListener('ended', () => {
	audioPlayer.currentTime = 0;
	switchNext();
});