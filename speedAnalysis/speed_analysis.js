let testText = "The quick brown fox jumps over the lazy dog.";
let startTime, endTime, currentIndex;

function startTest() {
    // Set the test text
    document.getElementById("inputText").value = testText;

    // Reset user input and output
    let userInput = document.getElementById("userInput");
    userInput.value = "";
    userInput.readOnly = false;
    userInput.focus();

    document.getElementById("output").innerHTML = "";

    // Start timer
    startTime = new Date().getTime();
}

function endTest() {
    endTime = new Date().getTime();

    // Disable user input
    document.getElementById("userInput").readOnly = true;

    // Calculate time elapsed and words per minute (WPM)
    var timeElapsed = (endTime - startTime) / 1000; // in seconds
    var userTypedText = document.getElementById("userInput").value;
    var totalLength = userTypedText.length;

    // Split the text using regex to count words correctly
    var typedWords = userTypedText.split(/\s+/).filter(function (word) {
        return word !== "";
    }).length;

    var wpm = 0; // Default value

    if (timeElapsed !== 0 && !isNaN(typedWords)) {
        wpm = Math.round((typedWords / timeElapsed) * 60);
    }
    const wrongWords = errorWord(userTypedText)

    // Display the results
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Typing Test Results:</h2>" +
        "<p>Total Length: " + totalLength + "</p>" +
        "<p>Words Typed: " + typedWords + "</p>" +
        "<p>Time Elapsed: " + timeElapsed.toFixed(2) + " seconds</p>" +
        "<p>Words Per Minute (WPM): " + wpm + "</p>" +
        "<h2>Error Words</h2>" + wrongWords.join("");
}

function errorWord(userTypedText) {
    const userInput = userTypedText.split(" ");
    const systemInput = testText.split(" ");
    const wrongWords = []

    for (let i = 0; i < systemInput.length; i++) {
        if (systemInput[i] !== userInput[i]) {
            wrongWords.push(`<p>${systemInput[i]} --> <mark>${userInput[i] || ""}</mark></p>`)
        }
    }
    return wrongWords;
}