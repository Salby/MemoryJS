/*
Copyright 2018 Sander, Steffen, Christian, Mathias

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


//Image path
const PATH = 'assets/img/';
//Find tag for the gameboard (by ID "game")
const BOARD = document.getElementById('game');

var Game = {
    init: function () {
        var numCards = 12;  //Number of cards in game
        var images = [];    //Array for full image path
        var pairs = 0;      //Pairs found in game
        var flipped = [];   //Element with current flipped cards (not pairs)
        var counter = 0;    //Cards flipped at once (not pairs)
        var moves = 0;      //Total amount of moves used
        var timer = false;  //Shows if timer is running

        //Find moves section in HTML
        var movesDisplay = document.getElementById('moves');
        //Insert 0 into the HTML
        movesDisplay.innerHTML = "0";
        //Insert 0 in timer fields
        appendSeconds.innerHTML = "00";
        appendTens.innerHTML = "00";

        //Loop to push each image file path into array twice
        for (var i = 1; i < numCards + 1; i++) {
            images.push(PATH + i + '.jpg');
            images.push(PATH + i + '.jpg');
        }
        //Call scramble array function
        shuffleArray(images);
        //Push the scrambled cards into the gameboard
        for (var i = 0; i < images.length; i++) {
            //Create <div> for the card
            var card = document.createElement('div');
            //Insert dynamic <img> into created <div>
            card.innerHTML = '<img src="' + images[i] + '">';
            //Push card element into the gameboard
            BOARD.appendChild(card);
        }

        //Fetch all cards on gameboard (array)
        var cards = BOARD.querySelectorAll('div');
        //Loop through cards & check for onclick events
        for (var i = 0; i < cards.length; i++) {
            cards[i].onclick = function() {
                //If cards isn't already flipped and you haven't flipped more than one
                if (!this.classList.contains("flipped") && counter < 2) {
                    //Start timer if it isn't already running
                    if (!timer) {
                        timer = true;
                        clearInterval(Interval);
                        Interval = setInterval(startTimer, 10);
                    }
                    counter++;  //Update amount of cards flipped
                    //Add "flipped" class to the pressed card
                    this.classList.add('flipped');
                    //Push the flipped card into array (to know which to flip back if not pair)
                    flipped.push(this);
                    //If 2 cards are flipped
                    if (flipped.length === 2) {
                        //Compare HTML of both cards to match a pair
                        if (flipped[0].innerHTML === flipped[1].innerHTML) {
                            //Add 1 to the amount of pairs found
                            pairs++;
                            //Empty flipped so they don't get flipped back when the next mismatch is drawn
                            flipped = [];
                            //Reset amount of draws made since pair
                            counter = 0;
                    // ----- Win Statement -----
                            if (pairs === numCards) {
                                //Call Win function
                                Game.win()
                            }
                        }

                        //No pair found
                        else {
                             //Delayed function to be able to see cards
                            setTimeout(function() {
                                //Loop through the current flipped cards
                                for (var j = 0; j < flipped.length; j++) {
                                    //Replace flipped class with closing
                                    flipped[j].classList.replace("flipped", "closing");
                                }
                                //Reset counter
                                counter = 0;
                                //Reset flipped elements array
                                flipped = [];
                            }, 1000, //Delayed by 1000ms
                            //Further delayed function to remove closing class when animation is done
                            setTimeout(function() {
                                //Select all tags with closing class
                                var toRemoveClass = BOARD.querySelectorAll(".closing");
                                //Loop through elements with closing class
                                for (var l = 0; l < toRemoveClass.length; l++) {
                                    //Remove class from elements
                                    toRemoveClass[l].classList.remove("closing");
                                }
                            }, 1400)); //Delayed by 1400ms
                        }
                        //Add one to the amount of moves made
                        moves++;
                        //Update the HTML with the amount of moves used
                        movesDisplay.innerHTML = moves.toString();
                    }
                }
            }
        }
    },
    // ------ Winner function ------
    win: function () {
        // Create div for winner popup
        window.winner = document.createElement('div');
        // Give div class
        winner.classList.add('winner');
        // Push HTML into the div
        winner.innerHTML = "<h1>You Won</h1> <button onclick='Game.reset()'><i class='material-icons'>refresh</i></button>";
        //Find the body tag
        var body = document.getElementsByTagName('body');
        //Insert the "winner" element into <body>
        body[0].appendChild(winner);
        //Stop the timer
        clearInterval(Interval);
    },
    // ------ Reset function ------
    reset: function () {
        //Remove Old Cards
        BOARD.innerHTML = "";
        //Remove Winner Popup
        winner.remove();
        //Reset Time
        tens = "";
        seconds = "";
        //Restart Game
        Game.init();
    }
};

var seconds = 0;    //Amounts of seconds used
var tens = 0;       //Milliseconds used

//Find HTML elements for seconds and milliseconds to be
var appendSeconds = document.getElementById('seconds');
var appendTens = document.getElementById('tens');
var Interval ;

function startTimer() {
    tens++;
    if(tens < 9){
        appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
        appendTens.innerHTML = tens;
    }
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){
        appendSeconds.innerHTML = seconds;
    }
}

//Function to Scramble array, for random cards placement
function shuffleArray(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}