let input = document.getElementById("input");

let button = document.getElementById("btn");

let word = document.querySelector(".word");

let phonetic = document.querySelector(".phonetic");

let partOfSpeech = document.querySelector(".meaningOne");

let definition = document.querySelector(".meaningTwo");

let synonyms = document.querySelector(".meaningThree");

let audio = document.querySelector(".audio");

//to get input value when enter is pressed instead of submit button
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".btn").click();
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
      .then((response) => response.json())
      .then((data) => wordMeaning(data));
  }
});

// to get input value when submit button is clicked
button.addEventListener("click", function () {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`)
    .then((response) => response.json())
    .then((data) => wordMeaning(data));
});

//displays definition of the word
function wordMeaning(input) {
  // console.log(input);
  word.innerText = input[0].word;
  phonetic.innerText = input[0].phonetics[1].text;
  partOfSpeech.innerText = input[0].meanings[0].partOfSpeech;
  definition.innerText = input[0].meanings[0].definitions[0].definition;
  synonyms.innerText = input[0].meanings[0].synonyms;
  audio.addEventListener("click", function () {
    play(input);
  });

  document.getElementById("conTwo").style.display = "block";
}

//when audio icon is clicked this function is called to play the audio
function play(input) {
  let play = new Audio(`${input[0].phonetics[1].audio}`);
  play.play();
}

//clear and reloads the page
let clear = document.getElementById("clear");

clear.addEventListener("click", function () {
  window.location.reload();
});
//   audio.addEventListener('click', function(){
//     audio = new Audio(`${input[0].phonetics[1].audio}`);
//     audio.play();
