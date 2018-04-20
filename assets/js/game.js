const PATH = 'assets/img/';
const BOARD = document.getElementById('game');

var Game = {
    init: function () {
        var numCards = 12;
        var images = [];
        var pairs = 0;
        var flipped = [];
        var counter = 0;
        var moves = 0;
        var movesDisplay = document.getElementById('moves');

        var timer = false;
        for (var i = 1; i < numCards + 1; i++) {
            images.push(PATH + i + '.jpg');
            images.push(PATH + i + '.jpg');
        }
        shuffleArray(images);
        for (var i = 0; i < images.length; i++) {
            var card = document.createElement('div');
            card.innerHTML = '<img src="' + images[i] + '">';
            BOARD.appendChild(card);
        }
        var cards = BOARD.querySelectorAll('div');
        for (var i = 0; i < cards.length; i++) {
            cards[i].onclick = function() {
                if (!this.classList.contains("flipped") && counter < 2) {
                    if (!timer) {
                        timer = true;
                        clearInterval(Interval);
                        Interval = setInterval(startTimer, 10);
                    }
                    counter++;
                    this.classList.add('flipped');
                    flipped.push(this);
                    if (flipped.length === 2) {
                        moves++;
                        if (flipped[0].innerHTML === flipped[1].innerHTML) {
                            pairs++;
                            flipped.length = 0;
                            counter = 0;
                            if (pairs === numCards) {
                                clearInterval(Interval);
                                console.log("WIN");
                            }
                        }
                        else {
                            setTimeout(function() {
                                for (var j = 0; j < flipped.length; j++) {
                                    flipped[j].classList.replace("flipped", "closing");
                                }
                                counter = 0;
                                flipped.length = 0;
                            }, 1000, setTimeout(function() {
                                var toRemoveClass = BOARD.querySelectorAll(".closing");
                                for (var l = 0; l < toRemoveClass.length; l++) {
                                    toRemoveClass[l].classList.remove("closing");
                                }
                            }, 1400));
                        }
                        movesDisplay.innerHTML = moves.toString();
                    }
                }
            }
        }
    },
};

var seconds = 0;
var tens = 0;
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