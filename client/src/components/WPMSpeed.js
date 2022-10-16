const WPMSpeed = ({seconds, correctSymbols, userInput}) => {

    const CountWords = () => {
        let removeSpace = userInput.replace(" ", "");
        let wordNum = removeSpace.split(" ").length;
        return wordNum;
    }

    if(seconds !== 0){
    const wpm = (correctSymbols/5) / (seconds/60)
        return (
        <div className="WPM-container">
            <div>WPM: {Math.round(wpm)}</div>
            <div>Seconds: {seconds}</div>
            <div>Correct Keys: {correctSymbols}</div>
            <div>Total Words: {CountWords()} </div>
        </div>
        )
    }

    return null;
}

export default WPMSpeed;