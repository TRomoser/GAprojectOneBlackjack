/*----- constants -----*/
const cards = [];


/*----- app's state (variables) -----*/
let playerCount;
let dealerCount;
let playerAce;
let dealerAce;
let wager;
let chipCount;
let winner;

/*----- cached element references -----*/
// dealerCards div for dealer cards
// playerCards div for player cards
// p for results message
// button 1 for hit/bet10
// button 2 for stand/bet50
// button 3 for double/bet100
// button for playAgain


/*----- event listeners -----*/
// for control buttons
// for playAgain button

/*----- functions -----*/
init();

function init() {
    playerCount = 0;
    dealerCount = 0;
    playerAce = 0;
    dealerAce = 0;
    wager = 0;
    winner = 0;
    render();
}

function render() {
    renderTable();
    renderMessage();
}

function renderTable() {
// render card divs
// render wagerField
}

function renderMessage() {
// render win/lose/bust message
// render turn message
}

function playerTurn() {
// add to wager in wagerField with button.addEventListener
// deal cards into card divs
// add cardValue to playerCount, playerAce, dealerCount, dealerAce
// winner = -1 if dealerCount += dealerAce = 21
// accept input from buttons Hit/Stand/Double
// winner = 1 if playerCount += playerAce = 21
// if playerCount += playerAce(true) > 21, playerCount - 10
// winner = -1 if playerCount > 21
// stand 
}
// make one function
function dealerTurn() {
// if dealerCount += dealerAce = 17, getWinner
// else hit until dealerCount += dealerAce <= 17
// if dealerCount += dealerAce(true) > 21, dealerCount - 10
// hit until dealerCount <= 17
// getWinner
}

function getWinner() {
// playerCount < dealerCount winner = -1
// playerCount = dealerCount return 'push'
// playerCount > dealerCount winner = 1
}