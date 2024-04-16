
//Initialized the varriable
let songIndex = 0
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItem = Array.from(document.getElementsByClassName('songItem'))


let songs = [
    { songName: "Yaad Piya Ki Aane Lagi", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Param Sundari", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Dil Mang Raha Hai", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Sawan Aaya Hai", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Mareez-E-Ishq", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Phir Mohabbat", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },

]
songItem.forEach((element, i) => {

    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

//audioElement.play() 

//Handle play/pause click


masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;


    }
    else {
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
        masterSongName.innerText = ''

    }
})


//Listen to events
audioElement.addEventListener('timeupdate', () => {
    //Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        if (audioElement.paused || audioElement.currentTime <= 0) {
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.play()
            gif.style.opacity = 1;
            document.querySelectorAll('.songItem')[e.target.id].style.background = 'cyan'
            masterSongName.innerText = songs[songIndex].songName;

        }
        else {
            audioElement.pause()
            e.target.classList.remove('fa-circle-pause')
            e.target.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play')
            gif.style.opacity = 0;
            document.querySelectorAll('.songItem')[e.target.id].style.background = ''
            masterSongName.innerText = ''

        }

        audioElement.currentTime = 0;
    })
})


document.getElementById('next').addEventListener('click', () => {

    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1
       
    }
    
    audioElement.src = `songs/${songIndex + 1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity = 1;
   // document.getElementsByClassName('songItem')[songIndex].style.background='cyan'
  
})


document.getElementById('previous').addEventListener('click', () => {

    if (songIndex <= 0) {
        songIndex = 0;
        
    }
    else {
        songIndex -= 1
       
    }
    
    audioElement.src = `songs/${songIndex + 1}.mp3`
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity = 1;
    //document.getElementsByClassName('songItem')[songIndex].style.background='cyan'
    
})
