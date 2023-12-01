var curLevel = 0;
var colorList = ["green", "red", "yellow", "blue"]; //0,1,2,3 correspond to green, red, yellow, blue
var levelColors = [];
var clickCount = 0;

function resetAll()
{
    curLevel = 0;
    levelColors = [];
    clickCount = 0;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function playLevel(level)
{
    var randomColor = Math.floor(Math.random() * 4);
    levelColors[curLevel] = colorList[randomColor];
    curLevel = level;
    console.log(levelColors);
    
    $("h1").text("Level " + level);

    for (var i = 0; i < levelColors.length; i++)
    {
        await sleep(600);

        buttonPress(levelColors[i]);
        setTimeout(function(){
            buttonRelease();
        }, 100);

        // await sleep(600);

    }
}

$(document).keypress(function(){

    if (curLevel === 0)
    {
        //game start
        playLevel(1);
    }
});

function buttonPress(color)
{
    var audio = new Audio("sounds/"+color+".mp3");
    $("#" + color).addClass("pressed");
    audio.play();
    console.log("pressed " + color);
}

function buttonRelease()
{
    $(".btn").removeClass("pressed");
    $(".btn").removeClass("user-pressed");

    // console.log(color);
    // console.log("removed " + $("#" + color).attr("id"));
}

$(".btn").on("click", function(){
    var pressedColor = $(this).attr("id");

    if (curLevel === 0)
    {
        return;
    }
    var audio = new Audio("sounds/"+pressedColor+".mp3");
    $("#" + pressedColor).addClass("user-pressed");
    audio.play();

    setTimeout(function(){
        buttonRelease();
    }, 100);

    clickCount++;
    if (pressedColor === levelColors[clickCount-1])
    {
        console.log("correct");
        if (clickCount == curLevel)
        {
            clickCount = 0;
            playLevel(curLevel + 1);
        }
    }
    else 
    {
        console.log("WRONG! you pressed " + pressedColor);
        $("body").addClass("red");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        setTimeout(function(){
            $("body").removeClass("red");
            resetAll();
            $("h1").text("Press A Key to Start");
        }, 1000);
    }
});