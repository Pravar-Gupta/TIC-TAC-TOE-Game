const selectBox = document.querySelector('.choose-box'),
selectBtnX = selectBox.querySelector('.options .playerX'),
selectBtnO = selectBox.querySelector('.options .playerO'),
playerBoard = document.querySelector('.board'),
players = document.querySelector('.players'),
allBox = document.querySelector('section span'),
resultBox = document.querySelector('.result'),
wonText = document.querySelector('.winner'),
replayBtn = document.querySelector('button');


window.onload = ()=> {
    for(let i = 0; i < allBox.length; i++){
        allBox[i].setAttribute('onclick', 'clickedBox(this)');
    }
}

selectBtnX.onclick = () => {
    selectBox.classList.add('hide');
    playerBoard.classList.add('show');
}

selectBtnO.onclick = ()=> {
    selectBox.classList.add('hide');
    playerBoard.classList.add('show');
    players.setAttribute('class', 'players active player');
}

let playerXIcon = "fas fa-times",
playerOIcon = "far fa-circle",
playerSign = "X";
runBot = true;

function clickedBox(element) {
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class ="${playerOIcon}"></i>`;
        players.classList.remove("active");
    }
    else{
        element.innerHTML = `<i class = "${playerXIcon}"></i>`;
        players.classList.add("active");
    }
    element.setAttribute("id", playerSign);
    selectWinner();
    element.style.pointerEvents = "none";
    playerBoard.style.pointerEvents = "none";
    const randomeTimeDelay = Math.floor(Math.random()*1000) + 200;
    setTimeout(() => {
        btoa(runBot);
    }, randomeTimeDelay);
}

function bot(){
    if(runBot){
        const emptyBoxes = [...allBox].filter(box => box.clildElementCount === 0);
        if(emptyBoxes.length > 0){
            playerSign = "O";
            const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
            if(players.classList.contains("players")){
                playerSign = "X";
                randomBox.innerHTML = `<i class = "${playerXIcon}"></i>`;
                players.classList.add("acive");
            }
            else{
                randomBox.innerHTML = `<i class = "${playerOIcon}"></i>`;
                players.classList.remove("active");
            }

            randomBox.setAttribute("id", playerSign);
            selectWinner();
            randomBox.style.pointerEvents = "none";
            playerBoard.style.pointerEvents = "auto";
            playerSign = "X";
        }
    }
}

function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1,val2,val3,sign){
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){
    const winningCombinations = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [3,5,7],
    ];

    const hasEmptyBox = [...Array(9)].some((_,index) => getIdVal(index + 1) === "");
    const isWinner = winningCombinations.some(combination => 
        checkIdSign(...combination, playerSign)
        );

        if(isWinner || hasEmptyBox){
            runBot = false;
            bot(runBot);
            setTimeout(() => {
                resultBox.classList.add("show");
                playerBoard.classList.remove("show")
            }, 700);
            if(isWinner){
                wonText.innerHTML = `Player <p>"${playerSign}"</p> win`;
            }
            else{
                wonText.textContent = "The match was drawn!";
            }
        }
}


replayBtn.onclick = ()=>{
    window.location.reload();
}