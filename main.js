const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');

const data = fs.readFileSync('results.json');
const jsonData = JSON.parse(data);

//const questions = fs.readFileSync('questions.json');
//const qdata = JSON.parse(questions);


const questions = {
  qArr: [
    "Är du aktiv i din vardag?",
    "Gillar du att vara ute?",

  ],
  yes: {
    cat: [1, 1],
    dog: [1, 2],
    fish: [0, 0],
    rabbit: [0, 1]
  },
  no: {
    cat: [1, 1],
    dog: [0, 0],
    fish: [1, 1],
    rabbit: [1, 1]
  }
}

function result() {
  this.cat = 0;
  this.dog = 1;
  this.fish = 0;
  this.rabbit = 0;

}


function getNames(cat, dog, fish, rabbit) {
  let res2 = new result(cat, dog, fish, rabbit);
  let ans;

  ans = Object.keys(res2);

  return ans;
}

function resSaveAndPrint(nameAr, resAr) {
  let highestIndex = 0; // Assume the highest value is at index 0 initially.
  let highestValue = resAr[0]; // Assume the highest value is the first element.

  for (let i = 1; i < resAr.length; i++) {
    if (resAr[i] > highestValue) {
      highestValue = resAr[i];
      highestIndex = i;
    }
  }
  console.log(nameAr[highestIndex] + " is the animal that suits you best with a percentage of " + Math.trunc(highestValue));
  console.log("The percentage of all the animals available is down below:");
  for (let i = 0; i < nameAr.length; i++) {
    console.log(nameAr[i] + " : " + resAr[i]);
  }
  str = "Hej jag är ett namn";

  jsonData.results.push({
    [str]: {
      cat: resAr[0],
      dog: resAr[1],
      fish: resAr[2],
      rabbit: resAr[3],
      date: Date()
    }
  })

  fs.writeFileSync('results.json', JSON.stringify(jsonData));
}


function compare(cat, dog, fish, rabbit) {

  console.clear();
  resNames = [];
  res = [cat, dog, fish, rabbit];
  let sum = 0;
  resNames = getNames(cat, dog, fish, rabbit);
  for (let i = 0; i < res.length; i++) {
    sum += parseInt(res[i]);
  }

  for (let i = 0; i < res.length; i++) {
    res[i] = (res[i] / sum) * 100;
  }
  /*
    for (let i = 0; i < res.length; i++) {
      console.log(resNames[i] + ":" + res[i]);
    }*/
  resSaveAndPrint(resNames, res)

}

function form(cat, dog, fish, rabbit) {
  for (let i = 0; i < questions.qArr.length; i++) {
    console.log(questions.qArr[i]);
    answer = prompt().toLowerCase();
    if (answer != "yes" && answer != "no") {
      console.log("Du har matat in ett felaktigt svar");
      //console.clear();
      form(cat, dog, fish, rabbit);
    }
    switch (answer) {
      case "yes":
        cat += parseInt(questions.yes.cat[i]);
        dog += parseInt(questions.yes.dog[i]);
        fish += parseInt(questions.yes.fish[i]);
        rabbit += parseInt(questions.yes.rabbit[i]);
        console.clear();
      case "no":
        cat += questions.no.cat[i];
        dog += questions.no.dog[i];
        fish += questions.no.fish[i];
        rabbit += questions.no.rabbit[i];
        console.clear();
      default:
        break;
    }
  }
  compare(cat, dog, fish, rabbit);
}


console.log("Hi and welcome to this quiz!");
console.log("Every question is answered with yes or no. Wrong answer or spelling restarts the quiz");
let yourResult = new result();

answer = form(yourResult.cat, yourResult.dog, yourResult.fish, yourResult.rabbit);
//compare(yourResult);
//console.log(jsonData.results);


//fs.writeFileSync('results.json', JSON.stringify(jsonData));



