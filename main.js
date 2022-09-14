let dataFile = require('./sampleinput.json');

var totalTeamIntelEnd = 0; //team intellengence + endurance total
totalTeamStr = 0; //team strength total
totalTeamTol = 0; //team tolerance total
const fs = require('fs');

var scoredApplicants = {};
scoredApplicants.Applicant = [];
//calculating team total, merging attributes where team members scores high so the weight can be lessened
for (let i = 0; i < dataFile.team.length; i++) {
    totalTeamStr += dataFile.team[i].attributes.strength; //totals add to 11
    totalTeamTol += dataFile.team[i].attributes.spicyFoodTolerance; //totals add to 12
    totalTeamIntelEnd += (dataFile.team[i].attributes.intelligence + dataFile.team[i].attributes.endurance); //totals add to 13 each
}
//calculating team average
var avgTeamIntelEnd = 0; //team intellegence + endurance average 
avgTeamStr = 0; //team strength average
avgTeamTol = 0; //team tolerance average
avgTeamIntelEnd = totalTeamIntelEnd / 60;
avgTeamStr = totalTeamStr / 30;
avgTeamTol = totalTeamTol / 30;
let compatibililty = 0;

for (let i = 0; i < dataFile.applicants.length; i++) {
    //strength will be weighed out of .35 on a 1-point scale
    if (Math.abs(avgTeamStr - dataFile.applicants[i].attributes.strength) >= 7) {
        compatibililty += .35;
    } else if (Math.abs(avgTeamStr - dataFile.applicants[i].attributes.strength) >= 5) {
        compatibililty += .23333;
    } else if (Math.abs(avgTeamStr - dataFile.applicants[i].attributes.strength) >= 3) {
        compatibililty += .116666;
    } else {
        compatibililty += 0;
    }
    //spicyfoodTolerence will be weighed out of .34 on a 1-point scale
    if (Math.abs(avgTeamTol - dataFile.applicants[i].attributes.spicyFoodTolerance) >= 7) {
        compatibililty += .34;
    } else if (Math.abs(avgTeamTol - dataFile.applicants[i].attributes.spicyFoodTolerance) >= 5) {
        compatibililty += .226666;
    } else if (Math.abs(avgTeamTol - dataFile.applicants[i].attributes.spicyFoodTolerance) >= 3) {
        compatibililty += .113333;
    } else {
        compatibililty += 0;
    }
    //intellegence and endurance will be weighted out of .31 on a 1-point scale
    if (Math.abs(avgTeamIntelEnd - (dataFile.applicants[i].attributes.intelligence + dataFile.applicants[i].attributes.endurance)) >= 6) {
        compatibililty += .31;
    } else if (Math.abs(avgTeamIntelEnd - (dataFile.applicants[i].attributes.intelligence + dataFile.applicants[i].attributes.endurance)) >= 4) {
        compatibililty += .206666;
    } else if (Math.abs(avgTeamIntelEnd - (dataFile.applicants[i].attributes.intelligence + dataFile.applicants[i].attributes.endurance)) >= 2) {
        compatibililty += .103333;
    } else {
        compatibililty += 0;
    }
    scoredApplicants.Applicant.push({ name: dataFile.applicants[i].name, score: compatibililty.toFixed(2) });

    let jsonString = JSON.stringify(scoredApplicants, null, 2);
    //reading output on individual file
    fs.writeFileSync('./output.json', jsonString, error => {
        if (error) {
            console.log('Please recheck work.', error)
        } else {
            console.log('Applicant compatibillity scores')
        }
    });

    compatibililty = 0;

}
//reading output in terminal
fs.readFile('output.json', 'utf-8', (error, data) => {
    if (error) {
        console.log('Please recheck work.', error)
    } else {
        console.log('Applicant compatibillity scores')
        const compatibilityScores = JSON.parse(data.toString());
        console.log(compatibilityScores);
    }
});