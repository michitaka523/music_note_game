let first_sound = "";
let second_sound = "";
let third_sound = "";

let first_context = "";
let first_mp3name = "";
let second_context = "";
let second_mp3name = "";
let third_context = "";
let third_mp3name = "";

function start_game() {
  const selectedDifficulty = document.getElementById('difficultySelect').value;

  if (selectedDifficulty) {
    localStorage.setItem('selectedDifficulty', selectedDifficulty);
    window.location.href = './game.html'
  } else {
    alert('難易度を選択してください。');
  }
}

function viewer_absjs(first_sound, second_sound, third_sound){
    ABCJS.renderAbc(
        "quiz", 
        "M:4/4\nL:1/4\nK:C\n"+first_sound+" "+second_sound+" "+third_sound+" ||",
        {},
        {scale:"2", staffwidth:"1000"}
        );
}


function sound2context(sound) {
  if (sound == "C" || sound == "c"){
    var context = "ド";
  } else if (sound == "D" || sound == "d"){
    var context = "レ";
  } else if (sound == "E" || sound == "e"){
    var context = "ミ";
  } else if (sound == "F" || sound == "f"){
    var context = "ファ";
  } else if (sound == "G" || sound == "g"){
    var context = "ソ";
  } else if (sound == "A" || sound == "a"){
    var context = "ラ";
  } else if (sound == "B" || sound == "b"){
    var context = "シ";
  }
  return context
}

function generateRandomNotes() {

  var selectedDifficulty = "E"
  var scales = "CDEFGABcdefgab";
  var randomNotes = [];

  if (selectedDifficulty) {
    var selectedDifficulty = localStorage.getItem('selectedDifficulty')
    if (selectedDifficulty == "A"){
      scales = "CDEFG";
      document.getElementById("level").innerText = "Level A";
    } else if (selectedDifficulty == "B"){
      scales = "CDEFGAB";
      document.getElementById("level").innerText = "Level B";
    } else if (selectedDifficulty == "C"){
      scales = "cdefg";
      document.getElementById("level").innerText = "Level C";
    } else if (selectedDifficulty == "D"){
      scales = "cdefgab";
      document.getElementById("level").innerText = "Level D";
    } else if (selectedDifficulty == "E"){
      scales = "CDEFGABcdefgab";
      document.getElementById("level").innerText = "Level E";
    }
  }

  for (var i = 0; i < 3; i++) {
    var randomIndex = Math.floor(Math.random() * scales.length);
    randomNotes.push(scales.charAt(randomIndex));
  }
  
  first_sound = randomNotes[0];
  second_sound = randomNotes[1];
  third_sound = randomNotes[2];

  viewer_absjs(first_sound, second_sound, third_sound)

  document.getElementById("result").innerText = "答え： ？？？";

}


// function playNote(note) {
//   const audioContext = new (window.AudioContext || window.webkitAudioContext)();

//   const oscillator = audioContext.createOscillator();
//   oscillator.type = 'sine'; // 正弦波
//   oscillator.frequency.setValueAtTime(getFrequency(note), audioContext.currentTime);

//   const gainNode = audioContext.createGain();
//   oscillator.connect(gainNode);
//   gainNode.connect(audioContext.destination);

//   gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
//   gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

//   oscillator.start();
//   oscillator.stop(audioContext.currentTime + 1);
// }

// function getFrequency(note) {
//   const baseFrequency = 261.63; // Cの周波数

//   const noteOffsets = {
//     'C': 0,
//     'D': 2,
//     'E': 4,
//     'F': 5,
//     'G': 7,
//     'A': 9,
//     'B': 11,
//     'C_high': 12,
//     'D_high': 14,
//     'E_high': 16,
//     'F_high': 17,
//     'G_high': 19,
//     'A_high': 21,
//     'B_high': 23,
//   };

//   return baseFrequency * Math.pow(2, noteOffsets[note] / 12);
// }

function ViewAnswer(){

  first_context = sound2context(first_sound)
  second_context = sound2context(second_sound)
  third_context = sound2context(third_sound)

  document.getElementById("result").innerText = "答え： " + first_context + "," + second_context + "," + third_context;

  // playNote(first_sound)
  // playNote(second_sound)
  // playNote(third_sound)
  
}
