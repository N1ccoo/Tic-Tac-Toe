const gameSettings = (() => {

    let settingsBtn = document.getElementById('settings-button')
    let formArea = document.getElementById('popup-form')
    let submitBtn = document.getElementById('form-submit-button')

    settingsBtn.addEventListener('click', openForm)

    function closeForm(e) {
        let path = e.composedPath();

        const withinBoundaries = path.includes(settingsBtn) || path.includes(formArea)

        if (!(withinBoundaries)) {
            formArea.classList.add('close')
            formArea.classList.remove('open')
        }
    }

    function openForm() {
        formArea.classList.remove('close')
        formArea.classList.add('open')
        document.addEventListener('click', closeForm)
    }

})()


const Game = (() => {

    const User = (name, mark) => {
        state = {
            name,
            mark,
            turn: false
        }

        return Object.assign({}, userMethods(state))
    }

    const userMethods = (state) => ({
        setName: (newName) => {
            return state.name = newName
        },
        setMark: (newMark) => {
            return state.mark = newMark
        },
        setTurn: (newTurn) => {
            return state.turn = newTurn
        },
        getName: () => {
            return state.name
        },
        getMark: () => {
            return state.mark
        },
        getTurn: () => {
            return state.turn
        },
        toggleTurn: () => {
            return state.turn = (!state.turn)
        }
    })

    let userOne = User('Player 1', 'X')
    let userTwo = User('Player 2', 'O')
    let userArray = [userOne, userTwo]


    let settingsFormInput = document.getElementById('settings-form')
    let userOneNameInput = document.getElementById('user-one-name')
    let userTwoNameInput = document.getElementById('user-two-name')
    let userOneMarkInput = document.getElementById('user-one-mark')
    let userTwoMarkInput = document.getElementById('user-two-mark')
    let userTurnInput = document.getElementById('user-turn-button')
    let userInputSubmit = document.getElementById('form-submit-button')


    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let twoPlayerBtn = document.getElementById('two-player-mode')
    let computerBtn = document.getElementById('computer-mode')
    let gameText = document.getElementById('footer')
    let gameSquare = Array.from(document.getElementsByClassName('game-square'))
    let gameTurns = []
    let didWinHappen = false

    twoPlayerBtn.addEventListener('click', startTwoPlayerGame)
    settingsFormInput.addEventListener('submit', setUserInfo)
    userTurnInput.addEventListener('click', swapFirstTurn)


    const getPlayerTurn = (item) => {
        if (item.getTurn() === true) {
            return item
        }
    }

    const updateUserArrayTurn = () => {
        userOne.toggleTurn()
        userTwo.toggleTurn()
    }

    const checkWinLogic = (winCon) => {

        let squareTextOne = gameSquare[winCon[0]].textContent;
        let squareTextTwo = gameSquare[winCon[1]].textContent;
        let squareTextThree = gameSquare[winCon[2]].textContent;
        let markOne = userOne.getMark();
        let markTwo = userTwo.getMark();
        let userOneWin = squareTextOne === markOne && squareTextTwo === markOne && squareTextThree === markOne;
        let userTwoWin = squareTextOne === markTwo && squareTextTwo === markTwo && squareTextThree === markTwo;


        if (userOneWin) {
            gameText.textContent = `${userOne.getName()} has won in ${gameTurns.length} turns!`
            didWinHappen = true
            removeEventSquares()
            removeComputerEventSquares()

        } else if (userTwoWin) {
            gameText.textContent = `${userTwo.getName()} has won in ${gameTurns.length} turns!`
            didWinHappen = true
            removeEventSquares()
            removeComputerEventSquares()
        }
    }

    function checkWin() {
        gameTurns.push(null)
        winConditions.forEach(winCon => {
            checkWinLogic(winCon)
        })
        if (didWinHappen === false && gameTurns.length === 9) {
            gameText.textContent = "DRAW"
        }
    }

    function removeEventSquares() {
        gameSquare.forEach((item) => {
            item.removeEventListener('click', squareClick)
        })
    }

    function addEventSquares() {
        gameSquare.forEach((item) => {
            item.addEventListener('click', squareClick)
        })
    }

    function removeComputerEventSquares() {
        gameSquare.forEach((item) => {
            item.removeEventListener('click', computerSquareClick)
            item.removeEventListener('click', skipTurn)
        })
    }

    function startTwoPlayerGame() {
        resetGame()
        addEventSquares()
        gameSquare.forEach((item) => {
            item.textContent = '';
            item.classList.remove('board-highlight');
        })
        gameText.textContent = ''
        setUserTurns(userTurnInput.value)
    }

    function resetGame() {
        removeComputerEventSquares()
        removeEventSquares()
        gameTurns = []
        didWinHappen = false
        userOne.setTurn(false)
        userTwo.setTurn(false)
    }

    function setUserInfo(e) {
        e.preventDefault()
        userOne.setName(userOneNameInput.value)
        userTwo.setName(userTwoNameInput.value)
        userOne.setMark(userOneMarkInput.value)
        userTwo.setMark(userTwoMarkInput.value)
        setUserTurns(userTurnInput.value)
        userOneNameInput.value = ''
        userTwoNameInput.value = ''
        userOneMarkInput.value = ''
        userTwoMarkInput.value = ''
    }

    function setUserTurns(choice) {
        if (choice === 'userOneFirst') {
            userOne.setTurn(true)
            userTwo.setTurn(false)
            return 'user one first'
        } else if (choice === 'userTwoFirst') {
            userOne.setTurn(false)
            userTwo.setTurn(true)
            return 'user two first'
        }
    }

    function swapFirstTurn() {
        if (userTurnInput.value === 'userOneFirst') {
            userTurnInput.setAttribute('value', 'userTwoFirst')
            userTurnInput.textContent = 'Player 2 First'
        } else if (userTurnInput.value === 'userTwoFirst') {
            userTurnInput.setAttribute('value', 'userOneFirst')
            userTurnInput.textContent = 'Player 1 First'
        }

    }

    

    function squareClick(e) {
        if (e.target.textContent !== userOne.getMark() && e.target.textContent !== userTwo.getMark()) {
            playerTurn = userArray.filter(getPlayerTurn)
            e.target.textContent = playerTurn[0].getMark()
            updateUserArrayTurn()
            checkWin()
        }
    }

        computerBtn.addEventListener('click', startComputerGame)

        function startComputerGame() {
            resetGame()
            gameSquare.forEach((item) => {
                item.addEventListener('click', computerSquareClick);
                item.addEventListener('click', skipTurn);
                item.textContent = '';
                item.classList.remove('board-highlight');
            })
            gameText.textContent = ''
            setUserTurns('userOneFirst')

            if(userTurnInput.value == 'userTwoFirst') {
                gameSquare[4].textContent = userTwo.getMark()
                gameSquare[4].classList.add('board-highlight')
            }

        }

        function computerSquareClick(e) {
            let bestScore = -Infinity;
            let bestMove = ''

            if (e.target.textContent !== userOne.getMark() && e.target.textContent !== userTwo.getMark()) {
                playerTurn = userArray.filter(getPlayerTurn)
                e.target.textContent = playerTurn[0].getMark()
                updateUserArrayTurn()
                checkWin()
                for (i = 0; i < gameSquare.length; i++) {
                    if (gameSquare[i].textContent == '') {
                        gameSquare[i].textContent = userTwo.getMark();
                        let score = minimax(gameSquare);
                        gameSquare[i].textContent = '';
                        console.log(gameSquare[i])
                        if (score > bestScore) {
                            bestScore = score;
                            bestMove = {i};
                        }
                    }
                }
                console.log('nicco')
            }
            console.log(i)
            gameSquare[bestMove.i].textContent = userTwo.getMark()
            gameSquare[bestMove.i].classList.add('board-highlight')
            checkWin()
        }
    
        function skipTurn() {
            setUserTurns('userOneFirst')
        }
        
        function minimax(board) {
            return 1;
        }

    

    return Object.assign({})

})()

const Style = (() => {

    let navButtons = Array.from(document.getElementsByClassName('nav-button'))
    let gameSquare = Array.from(document.getElementsByClassName('game-square'))

    navButtons.forEach((item) => {
        item.addEventListener('mouseenter', hoverSquareBtn);
        item.addEventListener('mouseleave', removeHoverSquareBtn);
    })

    gameSquare.forEach((item) => {
        item.addEventListener('mouseenter', hoverSquare);
        item.addEventListener('mouseleave', removeHoverSquare);
        item.addEventListener('click', highlightSquare)
    })

    function hoverSquare(e) {
        e.target.classList.add('board-hover')
    }

    function removeHoverSquare(e) {
        e.target.classList.remove('board-hover')
    }

    function highlightSquare(e) {
        e.target.classList.add('board-highlight')
    }

    function hoverSquareBtn(e) {
        e.target.classList.add('button-hover')
    }

    function removeHoverSquareBtn(e) {
        e.target.classList.remove('button-hover')
    }
})()