var question = [["Maximum carbohydrates are obtained from:", "A"],
                ["Vitamins, minerals and proteins in suitable amounts are given to body by:", "D"],
                ["According to food guide pyramid fats oils and sweets should be used:", "C"],
                ["Sources of proteins includes:", "D"],
                ["A diet containing right amount of energy, carbohydrates, proteins, fats, fiber, vitamins, minerals and water to fulfill requirement of body is called:", "B"]
                ];
var question_choice = [["Whole grain food", "Fatty fish", "Plant oil", "Nuts"],
                        ["Whole grain food", "Fatty fish", "Plant oil", "Nuts"],
                        ["2-3 servings", "Frequently", "Sparingly", "2-4 servings"],
                        ["Fish", "Poultry", "Eggs", "All of them"],
                        ["Nutrition", "Balanced diet", "Perfect diet", "Food pyramid"]
                        ];
var question2 = [["The following are good sources of protein:", "D"],
                ["Why do you need vitamin D:", "C"],
                ["Which is the best carbohydrate choice:", "B"],
                ["Fat is essential to a healthy diet, but not all fats are created equal. Which of the following is a monounsaturated fat, considered to be the healthiest kind of fat for cooking:", "A"],
                ["A protein is called a complete protein when it:", "D"]
                ];
var question_choice2 = [["Milk", "Beans", "Lean beef", "All of the above"],
                        ["To help with digestion", "To help your hair grow", "To help calcium build bones", "So vitamin C won't get lonely"],
                        ["White bread", "Whole-wheat bread", "White rice", "Fruit juice"],
                        ["Olive oil", "Butter", "Coconut oil", "Lard"],
                        ["Is low in fat and high in fiber", "Can be used in place of an egg in a recipe", "Includes white and dark meat", "Contains all essential amino acids, which the body cannot produce on its own"]
                        ];
var question3 = [["What are the Essential Nutrients:", "D"],
                ["Which is NOT one of Galen's 'Laws of Health':", "B"],
                ["What is metabolism determined by:", "D"],
                ["What are Dietary Standards based on:", "D"],
                ["What are the first three things to look for on a food label:", "C"]
                ];
var question_choice3 = [["Carbohydrates, Lipids (fats), and Proteins", "Vitamins and Minerals", "A & B and Water", "A & B, Water and Phytochemicals"],
                        ["Eat the right foods", "Drink 8 glasses of water daily", "Breathe fresh air", "Get enough sleep"],
                        ["Sleep", "Genetics", "Thyroid Gland", "All of the Above"],
                        ["Large groups of people", "Individual diets", "B & C only", "All of the above"],
                        ["1: Fat content, 2: Calorie content, 3: Serving size", "1: Serving size, 2: Servings per container, 3: Carbohydrate content", "1: Fat content, 2: Servings size, 3: Servings per container", "1: Serving size, 2: Fat content, 3: Servings per container"]
                        ];

var challengeScore1 = -1;
var challengeScore2 = -1;
var challengeScore3 = -1;

function setCha1_2_3(cha1, cha2, cha3){
    challengeScore1 = cha1;
    challengeScore2 = cha2;
    challengeScore3 = cha3;
}

var questions = question;
var question_choices = question_choice;

$("#challengeButton").click(function(){
    questions = question;
    question_choices = question_choice;
    $("#challengeNumber").text("1");
    if(challengeScore1 == -1){
        $("#showScore").text("No previous records")
    }else{
        $("#showScore").text("Your highest score: "+challengeScore1+"/5")
    }
    restartFunc();
});
$("#challengeButton2").click(function(){
    questions = question2;
    question_choices = question_choice2;
    $("#challengeNumber").text("2");
    if(challengeScore2 == -1){
        $("#showScore").text("No previous records")
    }else{
        $("#showScore").text("Your highest score: "+challengeScore2+"/5")
    }
    restartFunc();
});
$("#challengeButton3").click(function(){
    questions = question3;
    question_choices = question_choice3;
    $("#challengeNumber").text("3");
    if(challengeScore3 == -1){
        $("#showScore").text("No previous records")
    }else{
        $("#showScore").text("Your highest score: "+challengeScore3+"/5")
    }
    restartFunc();
});


var count = 0;
var score = 0;
function restartFunc(){
    score = 0;
    count = 0;
    $("#questionNumber").text(count + 1);
    $("#modalBodyQuestion").text(questions[count][0]);
    $("#C1").text(question_choices[count][0]);
    $("#C2").text(question_choices[count][1]);
    $("#C3").text(question_choices[count][2]);
    $("#C4").text(question_choices[count][3]);
    $("#modalProgress").css("width", "0%");
    $("#modalProgressNo").text(0);
    $("#modalProgress").attr("aria-valuenow", "0");
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
    $("#errorMessage").css("display", "none");
    $("#modalBodyNext").text("Next Question");
};

function hi(){
    if($("#A").prop("checked") == false && $("#B").prop("checked") == false && $("#C").prop("checked") == false && $("#D").prop("checked") == false){
        $("#errorMessage").css("display", "block");
    }else{
        if ($("#" + questions[count][1]).prop("checked")) {
        score = score + 1;
    }
    $("#errorMessage").css("display", "none");
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
    var progress_no = Number($("#modalProgressNo").text()) + 25;
    $("#modalProgress").css("width", progress_no + "%");
    $("#modalProgressNo").text(progress_no);
    $("#modalProgress").attr("aria-valuenow", progress_no);

    if (count == 3) {
        $("#modalBodyNext").text("Finish");
    }
    if (count == 4) {
        alert("Congratulation! You have done the challenge, you got " + score + " question correct!!");
        $.getJSON("/userScoreProcess",
            {userScore: score, Qnum: $("#challengeNumber").text()},
            function(data){
            if($("#challengeNumber").text() == 1){
                challengeScore1 = data;
            }else if($("#challengeNumber").text() == 2){
                challengeScore2 = data;
            }else{
                challengeScore3 = data;
            }});
        $('#challengeModal').modal("toggle");
    }

    count = count + 1;
    $("#questionNumber").text(count + 1);
    $("#modalBodyQuestion").text(questions[count][0]);
    $("#C1").text(question_choices[count][0]);
    $("#C2").text(question_choices[count][1]);
    $("#C3").text(question_choices[count][2]);
    $("#C4").text(question_choices[count][3]);
    }
}