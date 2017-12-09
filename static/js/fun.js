var question = [["Maximum carbohydrates are obtained from:", "A"],
                ["Vitamins, minerals and proteins in suitable amounts are given to body by:", "D"],
                ["According to food guide pyramid fats oils and sweets should be used:", "C"],
                ["Sources of proteins includes:", "D"],
                ["A diet containing right amount of energy, carbohydrates, proteins, fats, fiber, vitamins, minerals and water to fulfill requirement of body is called:", "B"],
                ];
var question_choice = [["Whole grain food", "Fatty fish", "Plant oil", "Nuts"],
                        ["Whole grain food", "Fatty fish", "Plant oil", "Nuts"],
                        ["2-3 servings", "Frequently", "Sparingly", "2-4 servings"],
                        ["Fish", "Poultry", "Eggs", "All of them"],
                        ["Nutrition", "Balanced diet", "Perfect diet", "Food pyramid"]
                        ];
var count = 0;
var score = 0;
$("#challengeButton").click(function(){
    score = 0;
    count = 0;
    $("#questionNumber").text(count + 1);
    $("#modalBodyQuestion").text(question[count][0]);
    $("#C1").text(question_choice[count][0]);
    $("#C2").text(question_choice[count][1]);
    $("#C3").text(question_choice[count][2]);
    $("#C4").text(question_choice[count][3]);
    $("#modalProgress").css("width", "0%");
    $("#modalProgressNo").text(0);
    $("#modalProgress").attr("aria-valuenow", "0");
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
});

$("#modalBodyNext").click(function(){
    if($("#"+question[count][1]).prop("checked")){
        score = score + 1;
    }
    $("#A").prop("checked", false);
    $("#B").prop("checked", false);
    $("#C").prop("checked", false);
    $("#D").prop("checked", false);
    var progress_no = Number($("#modalProgressNo").text()) +20;
    $("#modalProgress").css("width", progress_no+"%");
    $("#modalProgressNo").text( progress_no );
    $("#modalProgress").attr("aria-valuenow", progress_no );

    if(count == 4){
        alert("Congratulation! You have done the challenge, you got "+score+" question correct!!");
        $('#challengeModal').modal("toggle");
    }

    count = count + 1;
    $("#questionNumber").text(count + 1);
    $("#modalBodyQuestion").text(question[count][0]);
    $("#C1").text(question_choice[count][0]);
    $("#C2").text(question_choice[count][1]);
    $("#C3").text(question_choice[count][2]);
    $("#C4").text(question_choice[count][3]);
});