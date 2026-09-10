import "./scss/main.scss";


const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



const player = {
    
    _songs: [
        {
          id: 0,
          nameSong: "LAVIE",
          author: "Tinh Ha say hi",
          src: "/songs/LAVIEM.mp3",
        },
        {
          id: 1,
          nameSong: "Lưu Niên",
          author: "J97",
          src: "/songs/Lưu-Niên.mp3",
        },
        {
          id: 2,
          nameSong: "Người dưng",
          author: "J97",
          src: "/songs/Người-Dưng.mp3",
        },
        {
          id: 3,
          nameSong: "Secret",
          author: "Tinh Ha say hi",
          src: "/songs/SECRET.mp3",
        },
        {
          id: 4,
          nameSong: "Thử lòng quân tử",
          author: "Phương Mỹ Chi",
          src: "/songs/Thử-Lòng-Quân-Tử.mp3",
        },
    ],
    _playlistEle: $(".playlist"),
    _playBtnEle: $(".play-btn"),
    _preElement: $(".control-btn.pre"),
    _nextElement: $(".control-btn.next"),
    _songTitle: $(".song-title"),
    _loopElement: $(".control-btn.loop"),
    _shuffleEle: $(".control-btn.shuffle"),
    _progressEle: $(".progress"),
    _progressBarEle: $(".progress-bar"),
    _audioSongElement: $(".song-mp3"),
    _isPlaying: false,

    _isLoop: JSON.parse(localStorage.getItem("loop")) || false,
    _isShuffle: JSON.parse(localStorage.getItem("shuffle")) || false,
    _indexSongActive: 0,
    
    start() {
        this.render()    
        console.log(this)
        this._playBtnEle.onclick = () => {
            this._audioSongElement.paused ?  this._audioSongElement.play() : this._audioSongElement.pause()
              
        }

        this._audioSongElement.onplay = () => {
            this._isPlaying = true
            this._playBtnEle.innerHTML = `<i class="fa-solid fa-pause"></i>`
            // this._audioSongElement.currentTime = this._audioSongElement.duration - 3
        }
        this._audioSongElement.onpause = () => {
            this._isPlaying = false
            this._playBtnEle.innerHTML = `<i class="fa-solid fa-play"></i>`
        }

        this._audioSongElement.ontimeupdate = () => {
            const progressPercent = Math.floor(this._audioSongElement.currentTime/this._audioSongElement.duration * 100)
            this._progressEle.style.width = `${progressPercent}%`
            
        }
        this._audioSongElement.onended = () => {
            this._audioSongElement.onplay()
            this._nextElement.onclick()
        }

        this._progressBarEle.onclick = (e) => {
            const percent = e.offsetX / this._progressBarEle.clientWidth
            this._progressEle.style.width = `${percent * 100}%`
            this._audioSongElement.currentTime = percent * this._audioSongElement.duration
        }



        this._preElement.onclick = () => {
            if(this._audioSongElement.currentTime < 2) {
                this._isPlaying = true
                this._changeIndexSongActive(-1)            
                this.render()
            } else {
                this._audioSongElement.currentTime = 0
            }
            
            
        }

        this._nextElement.onclick = () => {
            this._isPlaying = true
            this._changeIndexSongActive(1)
            this.render()
            
        }

        this._loopElement.onclick = () => {
            this._isLoop = !this._isLoop
            localStorage.setItem("loop", this._isLoop)
            this._setLoop()
            
        }

        this._shuffleEle.onclick = () => {
            this._isShuffle = !this._isShuffle
            localStorage.setItem("shuffle", this._isShuffle)
            this._setShuffle()
        }

        
    },
    _changeIndexSongActive(step) {
        if(this._isShuffle) {
            if(this._songs.length <= 1) return
            const oldIndex = this._indexSongActive
            do {
                const randIndex = Math.floor(Math.random() * this._songs.length)
                this._indexSongActive = randIndex
            } while (this._indexSongActive === oldIndex)
        
        } else {
            this._indexSongActive += step
            this._indexSongActive = (this._indexSongActive + this._songs.length) % this._songs.length
        }
    },
    _setLoop() {
        this._audioSongElement.loop = this._isLoop
        this._loopElement.classList.toggle("active", this._isLoop)
    },
    _setShuffle() {
        this._shuffleEle.classList.toggle("active", this._isShuffle)
    },
    render() {
        const html = this._songs.map((song, index) => {
            
                return `
                    <div class="song ${index === this._indexSongActive ? "active" : ""}">
                        <img
                            class="song-image"
                            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=200"
                            alt=""
                        />
        
                        <div class="song-info">
                            <h2>${song.nameSong}</h2>
                            <p>${song.author}</p>
                        </div>

                        <button class="more-btn">
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                `
                }).join("")

        this._playlistEle.innerHTML = html

        this._songTitle.textContent = this._songs[this._indexSongActive].nameSong

        this._audioSongElement.src = this._songs[this._indexSongActive].src

        this._setLoop()
        this._setShuffle()
        this._audioSongElement.oncanplay = () => {
            if(this._isPlaying) this._audioSongElement.play()
        }

    },
    

}

player.start()

// const audioSong = $(`[data-set-id="0"]`)

// console.log(audioSong)

// const playBtn = $(".play-btn")

// playBtn.onclick = () => {
//     audioSong.src = player._songs[4].src
//     audioSong.play()
// }


// console.log(typeof JSON.parse(JSON.stringify(false)))

