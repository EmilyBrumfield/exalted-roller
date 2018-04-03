const FULL_INSTRUCTIONS = "Dice roller for the d6 System.<br /><b>Instructions:</b> Click the button with the number of dice to roll. <br /><b>House Rule:</b> The wild die is separate from the normal die pool and doesn't add to the total."

/*D6 DICE ROLLER
Progressiva web app that rolls D6 system dice without hassle or unnecessary clicks.

d6 system is a set of tabletop role-playing game rules. It often involves rolling large handfuls of dice and
tallying results, so I made this little app to speed things up when gaming at the computer.

When a user clicks a button, the app rolls the specified number of dice, applies min and max roll, and tallies the results for each die side.
Then it sums the results.

The wild die doesn't contribute to successes; it's a six-sided die that causes a Bad Luck result on a 1, and Good Luck on 6.
*/

var decisive = false; //stores whether the next roll is decisive (doesn't count 10s twice)

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