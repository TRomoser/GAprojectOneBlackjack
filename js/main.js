/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const originalDeck = buildOriginalDeck();
const winState = {
    '-1': 'Dealer',
    '0': 'Push',
    '1': 'Player'
}


/*----- app's state (variables) -----*/
let playerHand;
let dealerHand;
let playerCount;
let dealerCount;
let playerAce;
let dealerAce;
let wager;
let chipCount = 1000;
let shuffledDeck = [];
let winner;

/*----- cached element references -----*/
// dealerCards div for dealer cards
// playerCards div for player cards
// p for results message
// button 1 for hit/bet10
// button 2 for stand/bet50
// button 3 for double/bet100
// button for playAgain
const dealerArea = document.getElementById('dealerArea');
const playerArea = document.getElementById('playerArea');
const message = document.getElementById('results');
// const controlBtns = document.getElementsByClassName('controls');
const betBtns = document.getElementsByClassName('wager');
const dealBtn = document.getElementById('deal');
const hitBtn = document.getElementById('hit');
const standBtn = document.getElementById('stand');
const doubleBtn = document.getElementById('double');
const playAgainBtn = document.getElementById('playAgain');
const bankrollEl = document.getElementById('bankroll');
const wagerEl = document.getElementById('wagerField');

/*----- event listeners -----*/
// for control buttons
// for playAgain button

// for (i of controlBtns) {
//   i.addEventListener('click', function() { //change to playGame
//     console.log(this.id.replace(/\D/g,''));
//     console.log(this.id.replace(/\d+/g, ''));
//   });
// }
for (i of betBtns) {    
    i.addEventListener('click', bet);
}
  
playAgainBtn.addEventListener('click', init);
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
doubleBtn.addEventListener('click', double);
dealBtn.addEventListener('click', deal);


/*----- functions -----*/
init();

function init() {
    playerCount = 0;
    dealerCount = 0;
    playerAce = 0;
    dealerAce = 0;
    wager = 0;
    winner = null;
    buildOriginalDeck();
    renderNewShuffledDeck();
    render();
}

// put this in a function
// playerCount = playerHand[0].value + playerHand[1].value; 
// dealerCount = dealerHand[0].value + dealerHand[1].value;

function bet(evt) {
    const btn = evt.target;
    const betAmt = btn.id;
    wager += betAmt;
    chipCount -= betAmt;
    render();
}

function deal() {
    playerHand = [];
    dealerHand = [];
    playerHand.push(shuffledDeck.pop(), shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop(), shuffledDeck.pop());
    playerCount = getCount(playerHand, playerCount);
    dealerCount = getCount(dealerHand, dealerCount);
    if (playerCount === 21) stand();
    if (dealerCount === 21) stand();
    render();
    console.log(playerCount)
    console.log(dealerCount)
}

function getCount(hand, count) {
    let handArray = [];
    let newCount = 0;
    for (i = 0; i < hand.length; i++) {
        handArray.push(hand[i].value);
    }
    newCount = handArray.reduce(function(total, num) {
        return total + num;
    });
    return count += newCount;
    console.log(playerCount);
    console.log(dealerCount);
}

function hit() {
    if (playerCount >= 21) {
        hitBtn.disabled = true;
        return
    } 
    let cardImg = document.createElement('img');
    playerHand.push(shuffledDeck.pop());
    let card = playerHand[playerHand.length - 1];
    if (card.value === 11) {
        playerCount += card.value;
        playerAce += 1;
    } else {
        playerCount += card.value;
    }
    getCount(playerHand, playerCount);
    reduceAce(playerCount, playerAce);
//  append card image to div
    render();
}

function stand() {
    if (dealerCount > playerCount) {
        winner = -1;
    } else if (dealerCount === playerCount) {
        winner = 0;
    } else {
        winner = 1;
    }
    render();
    dealerTurn();
}

function dealerTurn() {
    while (dealerCount < 17) {
        dealerHand.push(shuffledDeck.pop());
        let card = dealerHand[dealerHand.length - 1]
        if (card.value === 11) {
            dealerCount += card.value;
            dealerAce += 1;
        } else {
            dealerCount += card.value;
        }
        getCount(dealerHand, dealerCount)
        reduceAce(dealerCount, dealerAce);
        console.log(playerCount)
        console.log(dealerCount);
    }
    render();
}

function reduceAce(count, aceCount) {
    while (count > 21 && aceCount > 0) {
        sum -= 10;
        aceCount -= 1;
    }
    return count;
}

// function renderCards() {
//     playerArea.innerHTML = playerHand.map(card => `<div class="card ${card.face}"></div>`).join('');
//     dealerArea.innerHTML = dealerHand.map((card, idx) => `<div class="card ${idx === 1 && !outcome ? 'back' : card.face}"></div>`).join('');
// }

// function double() {

// }

function render() {
    renderMessage();
    // renderCards();
}

function renderMessage() {
// render win/lose/bust message
// render turn message
    bankrollEl.innerHTML = `${chipCount}`;
    wagerEl.innerHTML = `${wager}`;
}


function getNewShuffledDeck() {
    const tempDeck = [...originalDeck];
    const newShuffledDeck = [];
    while (tempDeck.length) {
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return newShuffledDeck;
  }

function renderNewShuffledDeck() {
    shuffledDeck = getNewShuffledDeck();
    }

function buildOriginalDeck() {
const deck = [];
suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
    deck.push({
        face: `${suit}${rank}`,
        value: Number(rank) || (rank === 'A' ? 11 : 10)
    });
    });
});
return deck;
}




// function playerTurn() {
//     bet();

//     // add to wager in wagerField with button.addEventListener
//     // deal cards into card divs
//     // add cardValue to playerCount, playerAce, dealerCount, dealerAce
//     // winner = -1 if dealerCount += dealerAce = 21
//     // accept input from buttons Hit/Stand/Double
//     // winner = 1 if playerCount += playerAce = 21
//     // if playerCount += playerAce(true) > 21, playerCount - 10
//     // winner = -1 if playerCount > 21
//     // stand 
//     }
//     // make one function
//     function dealerTurn() {
//     // if dealerCount += dealerAce = 17, getWinner
//     // else hit until dealerCount += dealerAce <= 17
//     // if dealerCount += dealerAce(true) > 21, dealerCount - 10
//     // hit until dealerCount <= 17
//     // getWinner
//     }


// function renderTable() {
// // render card divs
// // render wagerField
    
// }


// // To remove words from control buttons id, use .replace(/\D/g,'')
// // To remove numbers from control buttons id, use .replace(/\d+/g, '')
// function playGame() {

// }


// function getWinner() {
// // playerCount < dealerCount winner = -1
// // playerCount = dealerCount return 'push'
// // playerCount > dealerCount winner = 1
// }

// // //  cards look like {face: 'c04', value: 4}
// //         this.hand.forEach((card) => {
// //             this.handValue += card.value;
// //             // add to the ace count if we need to
// //             if (card.value === 11) this.aceCount++;
// //         });
// //         // blackjacks can only occur in the first two cards dealt
// //         if (this.handValue === 21 && this.hand.length === 2) {
// //             this.blackJack = true;
// //         }
// //         // since ace can be worth 11 or 1 we must reduce handvalue by 10 if it goes over 21
// //         // and an ace is in the hand
// //         while (this.aceCount && this.handValue > 21) {
// //             this.handValue -= 10;
// //             this.aceCount -= 1;
// //         }
// //         if (this.handValue > 21 ) this.bust = true;
// //         render();