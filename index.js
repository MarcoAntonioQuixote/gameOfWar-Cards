class Player {
    constructor(name) {
        this.hand = []
        this.name = name;
    }
}

class Card {
    constructor(face,value,suit) {
        this.face = face;
        this.value = value;
        this.suit = suit;
        this.faceDown = true;
        this.assignPic();
    }

    assignPic() {
        switch(this.suit) {
            case '❤️': this.image = 'https://images.theconversation.com/files/118133/original/image-20160411-21959-ps6nll.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip'
                break;
            case '🗡️': this.image = 'https://www.creativefabrica.com/wp-content/uploads/2023/04/27/Innocent-Black-Cat-With-Knife-68254754-1.png'
                break;
            case '💎': this.image = 'https://t3.ftcdn.net/jpg/06/39/17/32/360_F_639173278_LDeM7BOuZGH0EVFB6KcMZvcuUvvOFTjl.jpg'
                break;
            case '🍀': this.image = 'https://www.thespruce.com/thmb/W0ZgVN7zCzyweXRgcJ21vNVxmGA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-BB9905-006-d4cc008f1ba74651bd6f9b3deb39ab86.jpg'
                break;
        }
    }
}

class Game {
    constructor() {
        this.deck = [];
        this.players = [];
        this.round = 0;
        this.makeDeck();
        this.makePlayers();
        this.drawCards();
        this.startGame();
    }


    makeDeck() {
        let faces = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
        let suits = ['❤️','💎','🗡️','🍀']
        
        // This loop goes through my two arrays and makes a new card for each face-suit combo
        for (let x = 0; x < faces.length; x++) {
            for (let suit of suits) {
                let card = new Card(faces[x],x + 1,suit)
                this.deck.push(card);
            }
        }
        
        //this loop shuffles my deck
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = temp;
        }
    }


    drawCards() {

        for (let x = 1; x <=2; x++) {

            let playerDiv = document.getElementById(`p${x}`);
            playerDiv.innerHTML = "";

            for (let card of this.players[x-1].hand) {
                let cardDiv = document.createElement('div');
                let suit = document.createElement('img');
                let face = document.createElement('h3');
                
                face.innerText = `${card.face}`;
                if (card.faceDown) {
                    cardDiv.setAttribute('class', 'card faceDown')
                } else {
                    suit.src = card.image;
                    cardDiv.setAttribute('class','card');
                }

                cardDiv.append(face,suit);
                playerDiv.append(cardDiv)
            }
        }
        


        // for (let card of this.deck) {
        //     let cardDiv = document.createElement('div');
        //     let suit = document.createElement('img');
        //     let face = document.createElement('h2');
            
        //     face.innerText = `${card.face}`;
        //     if (card.faceDown) {
        //         cardDiv.setAttribute('class', 'card faceDown')
        //     } else {
        //         suit.src = card.image;
        //         cardDiv.setAttribute('class','card');
        //     }
        //     cardDiv.addEventListener('click', () => {
        //         this.flipCard(card);
        //     })

        //     cardDiv.append(face,suit);
        //     table.append(cardDiv);
        // }

        //create or grab the element
        //modify / alter that element
        //actually append (if it's not already on the DOM)
    }

    makePlayers() {
        //have 2 variables to make 2 players;

        let players = ['Marshall', 'Mark Anthony']

        for (let x = 0; x < players.length; x++) {
            let player = new Player(players[x]);
            player.hand = this.deck.splice(0,26)
            this.players.push(player);
        }
    }

    startGame() {

        let next = document.getElementById('next');
        next.addEventListener('click', () => {
            this.nextRound();
        })

    }

    nextRound() {
                    
        console.log(`Round ${this.round} started`);

        // first card for each player needs to flip over

        // run a function to compare those two cards
        // compare those cards for each player

        for (let player of this.players) {

            //I need to see each players card at the current round level

            player.hand[this.round].faceDown = false;
        }

        this.round++;
        this.drawCards();
    }

    flipCard(card) {
        console.log(`You flipped a ${card.face} of ${card.suit}`)
        card.faceDown = !card.faceDown;
        this.drawCards();
    }
}

let war = new Game();