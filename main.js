const prompt = require('prompt-sync')({ sigint: true });
const fs = require('fs');

const data = fs.readFileSync('results.json');
const jsonData = JSON.parse(data);

const questions = require('./questions.json');

function result() {
  this.katt = 0;
  this.hund = 1;
  this.fisk = 0;
  this.kanin = 0;

}


function getNames(katt, hund, fisk, kanin) {
  let res2 = new result(katt, hund, fisk, kanin);
  let ans;

  ans = Object.keys(res2);
  return ans;
}

function resSaveAndPrint(nameAr, resAr) {
  let highestIndex = 0;
  let highestValue = resAr[0];

  for (let i = 1; i < resAr.length; i++) {
    if (resAr[i] > highestValue) {
      highestValue = resAr[i];
      highestIndex = i;
    }
  }
  console.log(nameAr[highestIndex] + " är djuret som är rätt för dig med en procent sats på " + Math.trunc(highestValue));
  console.log("Procent satsen på alla djur ser du här nedan:");
  for (let i = 0; i < nameAr.length; i++) {
    console.log(nameAr[i] + " : " + resAr[i]);
  }

  console.log("Skriv in ditt namn för att spara ditt resultat");
  str = prompt();

  jsonData.results.push({
    resultat: {
      namn: str,
      katt: resAr[0],
      hund: resAr[1],
      fisk: resAr[2],
      kanin: resAr[3],
      date: Date()
    }
  })

  fs.writeFileSync('results.json', JSON.stringify(jsonData));
}


function compare(katt, hund, fisk, kanin) {

  console.clear();
  resNames = [];
  res = [katt, hund, fisk, kanin];
  let sum = 0;
  resNames = getNames(katt, hund, fisk, kanin);
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
function main() {
  console.log("Hej och välkommen till detta fråge formulär!");
  console.log("Varje fråga besvaras med antingen jag eller nej");
  let yourResult = new result();
  for (let i = 0; i < questions.length; i++) {
    console.log(questions[i].q);
    answer = prompt().toLowerCase();

    if (answer == "ja") {
      yourResult.katt += questions[i].ja.katt;
      yourResult.hund += questions[i].ja.hund;
      yourResult.fisk += questions[i].ja.fisk;
      yourResult.kanin += questions[i].ja.kanin;
      console.clear();
    }
    else if (answer == "nej") {
      yourResult.katt += questions[i].nej.katt;
      yourResult.hund += questions[i].nej.hund;
      yourResult.fisk += questions[i].nej.fisk;
      yourResult.kanin += questions[i].nej.kanin;
      console.clear();
    }
    else {
      console.log("Du har matat in ett felaktigt svar");
      console.clear();
      i--;

    }

  }
  compare(yourResult.katt, yourResult.hund, yourResult.fisk, yourResult.kanin);
}

main()
