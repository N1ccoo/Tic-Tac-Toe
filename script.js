const gameSettings = (() => {

    let settingsBtn = document.getElementById('settings-button')
    let formArea = document.getElementById('popup-form')
    let submitBtn = document.getElementById('form-submit-button')

    settingsBtn.addEventListener('click',openForm)


    function closeForm(e) {
        e.preventDefault()
        let path = e.composedPath();
        const withinBoundaries = path.includes(settingsBtn) || path.includes(formArea)

        if(!(withinBoundaries) ) {
            formArea.classList.add('close')
            formArea.classList.remove('open')
        }
    }

    function removeCloseForm() {
        document.removeEventListener('click', closeForm)
        submitBtn.removeEventListener('click',closeForm)
    }

    function openForm() {
        formArea.classList.remove('close')
        formArea.classList.add('open')
        document.addEventListener('click', closeForm)
        submitBtn.addEventListener('click',closeForm)
    }

})()


const Game = (() => {

    const User = (name,mark) => {
        state = {
            name,
            mark,
            turn: false
        }
    
        return Object.assign({},userMethods(state))
    } 
    
    const userMethods = (state) => ({
        setName: (newName) => {return state.name = newName},
        setMark: (newMark) => {return state.mark = newMark},
        setTurn: (newTurn) => {return state.turn = newTurn},
        getName: () => {return state.name},
        getMark: () => {return state.mark},
        getTurn: () => {return state.turn},
        toggleTurn: () => {return state.turn = (!state.turn)}
    })

    let userOne = User('Nicco','X')
    let userTwo = User('Enemy','O')
    let userArray = [userOne,userTwo]
    userArray[0].toggleTurn()

    let winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]  
    let twoPlayerBtn = document.getElementById('two-player-mode')
    let computerBtn = document.getElementById('computer-mode')
    let settingsBtn = document.getElementById('settings-button')
    let gameText = document.getElementById('footer')
    let gameSquare = Array.from(document.getElementsByClassName('game-square'))
    let gameTurns = []
    let didWinHappen = false
    twoPlayerBtn.addEventListener('click',startTwoPlayerGame)
    

    function squareClick(e) {
        if (e.target.textContent !== userOne.getMark() && e.target.textContent !== userTwo.getMark()) {
            playerTurn = userArray.filter(getPlayerTurn)
            e.target.textContent = playerTurn[0].getMark()
            updateUserArrayTurn()
            checkWin()
        }
    }

    const getPlayerTurn = (item) => {
        if (item.getTurn() === true) {return item}
    }

    const updateUserArrayTurn = () => {
        userArray.forEach(item => {item.toggleTurn()})
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

        } else if (userTwoWin) {
            gameText.textContent = `${userTwo.getName()} has won in ${gameTurns.length} turns!`
            didWinHappen = true
            removeEventSquares()
        }  
    }

    function checkWin() {
        gameTurns.push(null)
        winConditions.forEach(winCon => {checkWinLogic(winCon)})
        if (didWinHappen === false && gameTurns.length === 9) {
            gameText.textContent = "DRAW"
            
        }

        console.log(gameTurns.length)
    } 

    function removeEventSquares() {
        gameSquare.forEach((item) => {item.removeEventListener('click',squareClick)})
    }

    function addEventSquares() {
        gameSquare.forEach((item) => {item.addEventListener('click',squareClick)})
    }
    
    function startTwoPlayerGame() {
        resetGame()
        gameSquare.forEach((item) => {
            item.addEventListener('click',squareClick);
            item.textContent = '';
            item.classList.remove('board-highlight');
        })
        gameText.textContent = ''
    }

    function resetGame() {
        removeEventSquares()
        gameTurns = []
        didWinHappen = false
        addEventSquares()
    }

    return Object.assign({})

})()


const Style = (() => {

    let navButtons = Array.from(document.getElementsByClassName('nav-button'))
    let gameSquare = Array.from(document.getElementsByClassName('game-square'))

    navButtons.forEach((item) => {
        item.addEventListener('mouseenter',hoverSquareBtn);
        item.addEventListener('mouseleave',removeHoverSquareBtn);
    })

    gameSquare.forEach((item) => {
        item.addEventListener('mouseenter',hoverSquare);
        item.addEventListener('mouseleave',removeHoverSquare);
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