Blackjack pseudocode

Must implement wagering feature
Do not have to implement splitting hands

ICEBOX FEATURES

1. Add casino chips that move to the center after deal is pressed
2. Implement splitting hands
3. Add animations to card shuffle and deals
4. Implement insurance and surrender
5. Add dealer audio with card value count, "hit, "stand", "double down", "split", "insurance", "surrender",  "bust", and "blackjack" (maybe "dealer wins" and "player wins")
6. Implement card counting/maybe teach card counting with values and count added in subwindow
7. Build into init() ability to continue playing using cardArray that has been reduced, and increase deck count to 8

Basic Rules
- If the player has blackjack, they win, unless the dealer also has blackjack, in which case the game is a tie.
- If the dealer busts and the player doesn't, the player wins.
- If the player busts, the dealer wins.
- If the player and the dealer both don't bust, whoever is closest to 21 wins.

1. Create deck
	1. Make array of objects containing cards with suit: rank: and value:
		1. Attach images to card objects with css
2. init()
	1. render()
		1. renderBoard
		2. renderMessage
		3. renderControls
3. Shuffle deck
	1. Use Math.random to randomize the order of the deck and output new Array
4. Place wager
	1. Use eventListener to respond to clicks on 3 button (10, 50, 100chips)
	2. Add wager while subtracting from Chip Count
5. Deal cards
	1. onClick deal, change wager buttons to controls
	2. Remove cards from cardArray using .pop()
	3. Append cards to html using a setInterval()
	4. Hide one of the dealers cards
	5. Evaluate count
6. Listen to player controls
	1. 'Hit' to add card and add to total card value
	2. 'Stand' to change turn to dealer and reveal hidden card
	3. 'Double' to double wager
	4. Change turn to dealer
	5. Reveal hidden card
	6. Get winState
7. winState logic
	1. Compare total card values between players 1 & -1
	2. Output winner
	3. Delete wager or Add wager to Chip Count
8. Run init()
	1. Reset cardArray, shuffle cards
	2. Automatically play again, wait for wager