const WPMSpeed = ({seconds, correctSymbols, WordsCount, WPMnum}) => {

    if(seconds !== 0){
    // const wpm = (correctSymbols/5) / (seconds/60)
        return (
        <div className="WPM-container">
            <div>WPM: {WPMnum} </div>
            <div>Seconds: {seconds} </div>
            <div>Correct Keys: {correctSymbols} </div>
            <div>Correct Words: {WordsCount} </div>
        </div>
        )
    }

    return null;
}

export default WPMSpeed;