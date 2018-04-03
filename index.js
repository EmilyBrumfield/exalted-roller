const FULL_INSTRUCTIONS = "Dice roller for the Exalted 3e.<br /><b>Instructions:</b>\
 Click the button with the number of dice to roll. <br /><b>Decisive:</b> Click to toggle. When this\
 is highlighted, the next roll won't double 10s. Returns to normal after one roll. Useful for\
 decisive damage.<br /><b>Note:</b> This roller doesn't yet support double 9s, double 8s, and some\
 of the other weird dice mechanics from certain charms."

var decisive = false; //stores whether the next roll is decisive (doesn't count 10s twice)

function handleInstructionClick() {  //toggles instructions
  
  if (document.getElementById("instructions").innerHTML == "") {
    outputReplace("instructions", FULL_INSTRUCTIONS);
  }
  else {
    outputReplace("instructions", "");
  }
  
}


function handleDecisiveClick() {
  if (decisive) {
    decisive = false;
    document.getElementById("decisive").classList.remove("Decisive-button--active");
  }
  else {
    decisive = true;
    document.getElementById("decisive").classList.add("Decisive-button--active");
  }
}

function handleRollClick(numDice) {

  var diceTally = rollDice(numDice);
    outputReplace("rollTotal", "Total Successes: " + diceTally);

  if(decisive){
    decisive = false;
    document.getElementById("decisive").classList.remove("Decisive-button--active");
  }
}

function rollDice(numDice) {
        var currentRoll = 0;
        var successes = 0;

        if (numDice < 1 || numDice > 50) { //prevents bad inputs; number of dice must be between 1 and 50, otherwise becomes 1
          numDice = 1;
        } 

        for(var i = 1; i <= numDice; i++){
          currentRoll = Math.floor(Math.random() * 10) + 1;
          
          switch (currentRoll){
            case 8:
            case 9:
              successes += 1;
            break;
            case 10:
              successes += 1;
              if(decisive === false){successes += 1} //adds a second success if not a decisive check
            break;

            default:
              //nothing
          }
        }

        return successes;

     };


//OUTPUT FUNCTIONS
//Outputs data stored in "content" to HTML element with id matching "target."

function outputReplace (target, content) {  //Replaces existing target content with new content
  document.getElementById(target).innerHTML = content;
}

function outputAdd (target, content) {  //Adds new content to existing target content
  document.getElementById(target).innerHTML += content;
}

function outputAddLine (target, content) {  //Adds new content to existing target content, in a new line
  document.getElementById(target).innerHTML += "<br \>" + content;
}