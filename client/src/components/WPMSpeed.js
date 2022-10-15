const WPMSpeed = ({seconds, correctSymbols}) => {

    if(seconds !== 0){
    const wpm = (correctSymbols/5) / (seconds/60)
        return (
        <div className="WPM-container">
            <div>WPM: {Math.round(wpm)}</div>
            <div>Seconds: {seconds}</div>
            <div>Correct Keys: {correctSymbols}</div>
        </div>
        )
    }

    return null;
}

export default WPMSpeed;