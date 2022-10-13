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
const dealerArea = document.getElementById('dealerArea');
const playerArea = document.getElementById('playerArea');
const message = document.getElementById('message');
const dealScore = document.getElementById('dealScore');
const playScore = document.getElementById('playScore');
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
    playerHand = [];
    dealerHand = [];
    wager = 0;
    winner = null;
    buildOriginalDeck();
    renderNewShuffledDeck();
    render();
    dealScore.innerText = '';
    playScore.innerText = '';
    wagerEl.innerHTML = '';
    dealBtn.style.visibility = 'visible';
    hitBtn.disabled = false;
    for (i of betBtns) {
        i.style.visibility = 'visible';
    }
}

function bet(evt) {
    const btn = evt.target;
    const betAmt = parseInt(btn.id);
    wager += betAmt;
    chipCount -= betAmt;
    wagerEl.innerHTML = `${wager}`;
    render();
}

function deal() {
    dealBtn.style.visibility = 'hidden';
    for (i of betBtns) {
        i.style.visibility = 'hidden';
    }
    playerHand.push(shuffledDeck.pop(), shuffledDeck.pop());
    dealerHand.push(shuffledDeck.pop(), shuffledDeck.pop());
    playerCount = getCount(playerHand, playerCount);
    dealerCount = getCount(dealerHand, dealerCount);
    if (playerCount === 21 || dealerCount === 21) stand();
    render();
    console.log(playerCount);
    console.log(dealerCount);
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
}

function hit() {
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
    console.log(playerCount)
    console.log(dealerCount)
    render();
    if (playerCount >= 21) {
        hitBtn.disabled = true;
        winner = -1;
        getWinner();
        return
    } 
}

function stand() {
    if (dealerCount === 0 || playerCount === 0) return;
    if (dealerCount > playerCount) {
        winner = -1;
    } else if (dealerCount === playerCount) {
        winner = 0;
    } else {
        winner = 1;
    }
    console.log(winner)
    render();
    dealerTurn();
}

function dealerTurn() {
    if (dealerHand === [] || playerHand === []) return;
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
    };
    render();
    
}

function reduceAce(count, aceCount) {
    while (count > 21 && aceCount > 0) {
        count -= 10;
        aceCount -= 1;
    }
    return count;
}

function renderCards(deck, container) {
    container.innerHTML = '';
    let cardsHtml = '';
    deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
    });
    container.innerHTML = cardsHtml;
  }

function double() {
    wager = wager * 2;
    render();
}

function render() {
    renderMessage();
    renderCards(playerHand, playerArea);
    renderCards(dealerHand, dealerArea);
}

function renderMessage() {
// render win/lose/bust message
// render turn message
    bankrollEl.innerHTML = `${chipCount}`;
    playScore.innerText = `${playerCount}`;
    if (winner === null) {
        message.innerText = '';
        return;
    } else if (winner === 0) {
        message.innerText = `It's a push, your bet's returned`;
    } else if (winner === -1) {
        message.innerText = 'Dealer wins! Try again';
    } else {
        message.innerText = 'Player wins! Good job';
    }
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