let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let message = document.querySelector(".messageBox");
let main = document.querySelector(".container");

let turnO = true;

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("O");
            box.classList.remove("X");
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.classList.add("X");
            box.classList.remove("O");
            turnO = true;
        }
        box.disabled = true;
        count++;

        let winner = checkWinner();

        if (!winner && count === 9) {
            message.innerText = "Game Drawn";
            message.classList.remove("hide");
            main.classList.add("hide");
        }
    })
})

function showWinner(winner) {
    message.innerText = `Congratulations! \n\nWinner is ${winner}`;
    celebrateWinner();
    message.classList.remove("hide");
    main.classList.add("hide");
}

function checkWinner() {
    for (let pattern of winningPattern) {
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 != "" && position2 != "" && position3 != "") {
            if (position1 === position2 && position2 === position3) {

                for (let box of boxes) {
                    box.disabled = true;
                }

                setTimeout(() => {
                    showWinner(position1);
                }, 500);
                // showWinner(position1);
                return true;
            }
        }
    }
    return false;
}

function celebrateWinner() {

    confetti({//left top
        particleCount: 180,
        angle: 330,
        spread: 150,
        origin: {
            x: 0,
            y: 0
        }
    });

    confetti({//left bottom
        particleCount: 180,
        angle: 60,
        spread: 150,
        origin: {
            x: 0,
            y: 1
        }
    });

    confetti({//right top
        particleCount: 180,
        angle: 230,
        spread: 150,
        origin: {
            x: 1,
            y: 0
        }
    });

    confetti({//right bottom
        particleCount: 180,
        angle: 150,
        spread: 150,
        origin: {
            x: 1,
            y: 1
        }
    });
}

function Reset() {
    turnO = true
    count = 0;
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("X", "O");
    }
    message.classList.add("hide");
    main.classList.remove("hide");
}

resetButton.addEventListener("click", Reset);

