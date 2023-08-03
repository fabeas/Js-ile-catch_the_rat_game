const startScreen = document.querySelector(".startScreen")
const gameScreen = document.querySelector(".gameScreen")
const playBtn = document.querySelector("#playBtn")
const bestScoreEl = document.querySelector("#bestScore")
const scoreEl = document.querySelector("#score")
const timeEl = document.querySelector("#time")
const game_container = document.querySelector('#game-container')


let score = 0;
let timeLeft = 10;
let isGameStarted = false;
let ratInterval = null;
let timerInterval = null;



// ========== Buton'a tıklandığında oyunu başlat ==========

playBtn.addEventListener("click", function () {
    startGame();
})




// ========== Oyun boyunca müzik çal ==========

const music = "funny.mp3";

const audio = new Audio(music)





// ========== Oyunu başlatma fonksiyonu ==========


function startGame() {
    isGameStarted = true;
    score = 0;
    timeLeft = 10;
    startScreen.style.display = "none";
    scoreEl.style.display = "block";
    timeEl.style.display = "block";

    addRats();
    audio.play();
    ratInterval = setInterval(addRats, 1500);
    timerInterval = setInterval(updateTimer, 1000);
}


// ========== Oyunu bitince tekrar başlatma fonksiyonu ==========

function playAgain() {
    
    isGameStarted = false;
    score = 0;
    timeLeft = 10;
    clearInterval(ratInterval);
    clearInterval(timerInterval);

    audio.pause();
    timerInterval = null;
    ratInterval = null;
    audio.currentTime = 0;

}



// Oyun başladığında süreyi 60'dan geriye saydır ve bitince alert getir

function updateTimer() {

    if (isGameStarted === true) {
        timeEl.textContent = "Time left : " + timeLeft;


        if (timeLeft === 0) {
            endGame()

        }

        timeLeft--
    }
}




// ====== Rat oluştur, rastgele konumlara ata ve tıklama ekle  ======

function createRat() {

    const rat = document.createElement("div");
    rat.classList.add("rats");

    const ratImg = document.createElement("img");
    ratImg.src = "rat.png";
    ratImg.alt = "rat";
    ratImg.id = "ratImg";
    rat.appendChild(ratImg);


    const { x, y } = getRandomLocation();
    rat.style.top = `${y}px`
    rat.style.left = `${x}px`

    gameScreen.appendChild(rat);




    rat.addEventListener("click", () => {

        playSound()

        rat.remove();

        score++

        scoreEl.textContent = "Score : " + score


    })
}



// ========== Rastgele Konum Fonksiyonu =========


function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}



// ========== Rat'leri 1sn arayla ekleme fonksiyonu =========

function addRats() {
    createRat();
}



// ========== Rat'lere tıklayınca ses çıkarma fonksiyonu =========

function playSound() {
    const soundEffect = "soundeffect.mp3"
    const audio = new Audio(soundEffect);
    audio.play();
}



function saveScoreToLocalStorage(score) {

    const currentBestScore = localStorage.getItem("bestScore");

    if (!currentBestScore || score > parseInt(currentBestScore)) {

        localStorage.setItem("bestScore", score);
    }
}


function displayBestScore() {
    const bestScore = localStorage.getItem("bestScore");
    if (bestScore) {
        bestScoreEl.textContent = `Best Score: ${bestScore}`;
    } else {
        bestScoreEl.textContent = "Best Score: 0";
    }
}

displayBestScore();


// Oyunu bitirdikten sonra skoru kaydet ve en yüksek skoru güncelle


function endGame() {
    clearInterval(timerInterval);
    clearInterval(ratInterval);
    alert("Time's up!");
    saveScoreToLocalStorage(score); // Best skoru güncelle
    playAgain();
    window.location.reload(); // Sayfayı yenile
}
