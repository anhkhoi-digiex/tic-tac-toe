var user = ""
var running = false;
var botIsPlaying = false


const boxes = document.querySelectorAll(".box");
const title = document.querySelector(".title");
const bigbox = document.querySelector(".bigbox");
const restartBtn = document.querySelector(".restartBtn");
restartBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        // console.log(box.getAttribute("itemid"));
        box.innerHTML = ""
        title.innerHTML = "Please choose users"
        bigbox.style.display = "none"
        restartBtn.style.display = "none"
        user = ""
        running = false
    })
})

const conditionWin = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]


function choosePlayer() {

    var userX = document.querySelector(".userX")
    userX.addEventListener("click", () => {
        if (user == "") {
            user = "X"
            title.innerHTML = "X turn"
            displayTikTacToe()
        }
    })

    var userO = document.querySelector(".userO")
    userO.addEventListener("click", () => {
        if (user == "") {
            user = "O"
            title.innerHTML = "O turn"
            displayTikTacToe()

        }
    })


}


function initializeGame() {
    if (boxes != undefined && running == true) {
        boxes.forEach((box) => {
            // console.log(box.getAttribute("itemid"));
            box.addEventListener("click", (e) => {
                if (box.innerHTML != "") {
                    return;
                } else if (botIsPlaying) {
                    alert("Vui lòng đợi bot đánh")
                } else if (running == true) {
                    userPlaying(box)
                    botPLaying()
                }
            })
        })
    }
}


function changePlayer() {
    if (!running) {
        return;
    }
    if (user == "X") {
        title.innerHTML = "O turn"
        user = "O"
    } else {
        title.innerHTML = "X turn"
        user = "X"
    }
}


function checkWinner() {
    var emptybox = checkEmptyBox()
    running = true
    for (let index = 0; index < conditionWin.length; index++) {
        if (
            document.getElementById(conditionWin[index][0]).innerText == user &&
            document.getElementById(conditionWin[index][1]).innerText == user &&
            document.getElementById(conditionWin[index][2]).innerText == user
        ) {
            console.log(typeof document.getElementById(conditionWin[index][0]).innerHTML);
            running = false
            title.innerHTML = `Chúc mừng người chơi ${user} thắng`
            restartBtn.style.display = "block"
            bigbox.style.userSelect = "none"
            botIsPlaying = false
            return;


        } else if (emptybox.length == 0) {
            running = false
            title.innerHTML = `Hoà`
            restartBtn.style.display = "block"
            bigbox.style.userSelect = "none"
            botIsPlaying = false

        }
    }
}

function checkDraw() {

}



function checkEmptyBox() {
    var isEmptyBox = []

    boxes.forEach((box, index) => {
        if (box.innerHTML == "") {
            isEmptyBox.push(index + 1)
        }
    })
    return isEmptyBox
}

function userPlaying(box) {
    box.innerHTML = `${user}`
    checkWinner();
    changePlayer();
}

function botPLaying() {
    var emptybox = checkEmptyBox()
    const randomPosition = Math.floor(Math.random() * emptybox.length)

    if (running == true) {
        botIsPlaying = true

        setTimeout(() => {
            if (emptybox.length != 0) {
                document.getElementById(`${String(emptybox[randomPosition])}`).innerHTML = user
                checkWinner();
                changePlayer();
                botIsPlaying = false
            }
        }, 200)
    }
}

function displayTikTacToe() {
    if (user != "") {
        bigbox.style.display = "block"
        running = true;
        initializeGame()

    }
}






// bien doi mang thanh chuoi de so sanh: JSON.stringify(["1", "2", "3"])

// displayTikTacToe()
choosePlayer()


// không cho đổi những chỗ đã tick rồi


