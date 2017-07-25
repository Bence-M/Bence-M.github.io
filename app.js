let onOff = 0;
let switchCounter = 0;
const imgChange = document.getElementsByClassName('lightClass')[0];
const switchOn = "img/Light-on.png";
const switchOff = "img/Light-off.png";
const counterText = document.getElementsByClassName('counter')[0];
const newGame = document.getElementById("newGame");
const recoderName = document.getElementsByClassName('recorder')[0];
let highScore = {
    name: "",
    score: ""
}
let seconds = 10;
let display = document.getElementsByClassName("stopper")[0];
let t;
const inputField = document.getElementsByClassName('recorderSave')[0];
const saveButton = document.getElementById("sendButton");
const switchButton = document.getElementById("switchButton");
const h2 = document.getElementsByTagName('h2')[0];

function hideInput () {
  inputField.style.display = 'none';
  saveButton.style.display = 'none';
}

function showInput () {
  inputField.style.display = 'block';
  saveButton.style.display = 'block';
}

function hideSwitcher () {
  switchButton.style.display = 'none';
}

function showSwitcher () {
  switchButton.style.display = 'block';
}

hideInput ();

/*Újra indul */

function reset() {
    document.getElementById('inputName').value = "";
    h2.innerHTML = "Stopper: ";
    showSwitcher()
    hideInput();
    if (highScore.score > 0) {
        recoderName.innerHTML = " Az eddig rekorder " + highScore.name + " " + highScore.score + " kapcsolással."
    }
    onOff = 0;
    switchCounter = 0;
    seconds = 10;
    display.innerHTML = "10 másodperc";
    newGame.innerHTML = "";
}


/*Visszaszámol másodpercenként, rögzítit a pontszámokat neveket és kiírja az eredményt*/

function timer() {
    seconds--;
    display.innerHTML = seconds + " másodperc";
    if (seconds == 0) {
        clearTimeout(t);
        h2.innerHTML = "";
        if (switchCounter > highScore.score) {
            highScore.score = switchCounter;
            hideSwitcher();
            display.innerHTML = "Írd be a neved!";
            hideInput();
            showInput();
            sendButton.onclick = () => {
                highScore.name = document.getElementById('inputName').value;
                display.innerHTML = "Gratulálok, " + highScore.name + " Te vagy a leggyorsabb: " + highScore.score + " kapcsolással";
                hideInput();
                newGame.innerHTML = '<button onclick =" reset (); ">Új játék</button>';
            }
        } else {
            hideSwitcher()
            display.innerHTML = "Ügyes vagy, mostani eredményed " + switchCounter + ", ha legközelebb " + (highScore.score - switchCounter) + " alkalommal töbször kapcsolsz, Te leszel a leggyorsabb!";
            newGame.innerHTML = '<button onclick =" reset (); ">Új játék</button>';
        }
    } else {
        stopper();
    }
}

function stopper() {
    t = setTimeout(timer, 1000);
  }

/*Kapcsolgató*/

switchButton.onclick = () => {
    if (switchCounter < 1) {
        stopper();
    }

    if (seconds > 0) {
        if (onOff == 0) {
            imgChange.src = switchOn;
            onOff = 1;
            switchCounter += 1;
            counterText.innerHTML = 'Eddig már ' + switchCounter + ' alkalommal kapcsolgattad a lámpát.';
        } else {
            imgChange.src = switchOff;
            onOff = 0;
            switchCounter += 1;
            counterText.innerHTML = 'Eddig már ' + switchCounter + ' alkalommal kapcsolgattad a lámpát.';
        }
    }

}
