import React, {useState, useEffect} from "react";
import axios from "axios";
import Preview from "./components/Preview";
import InputBox from "./components/InputBox";
import RestartButton from "./components/RestartButton";
import NextButton from "./components/NextButton";
import WPMSpeed from "./components/WPMSpeed";
import FailedScreen from "./components/FailedScreen";
import PassedScreen from "./components/PassesScreen";
import Loading from "./components/Loading";

const App = () => {
    const getQuotesURL = 'https://wordsperminute.onrender.com/quotes';

    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState('');
    const [userInput, setUserInput] = useState('');
    let [seconds, setSeconds] = useState(0);
    const [correctSymbols, setCorrectSymbols] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [incomplete, setIncomplete] = useState(false);
    const [passed, setPassed] = useState(false)

    useEffect(() => {
        document.title = "WPM App"
        const getQuotes = async () => {
            try {
                const {data} = await axios.get(getQuotesURL);
                const datalength = data.length
                const randomNum = Math.floor(Math.random() * datalength)
                setQuotes(data[randomNum].quote.toLowerCase())
                setLoading(false)
                setUserInput("")
                setSeconds(0)
                setCorrectSymbols(0)
                setStarted(false)
                setFinished(false)
                setIncomplete(false)
            } catch (error) {
                console.log(error.message)
            } 
        }
       getQuotes()
    }, [loading]);

    const handleRestart = () => {
        setFinished(true)
        setUserInput("")
        setSeconds(0)
        setCorrectSymbols(0)
        setStarted(false)
        setFinished(false)
        setIncomplete(false)
        setPassed(false)
    }

    const handleNext = () => {
        setLoading(true)
    }

    const handleInputOnChange = (e) => {
        setStarted(true)
        const inputValue = e.target.value
        setUserInput(inputValue)
        correctSymbolsFunc(inputValue)
        handleFinished(inputValue)
    }

    const handleFinished = (inputValue) => {
        if(quotes.length > inputValue.length && seconds === 60){
            setIncomplete(true)
            setFinished(true)
        }
        if(quotes === inputValue && seconds <= 60 ){
            setFinished(true)
            setPassed(true)
            setStarted(false)
            
        }
    }


    useEffect(()=> {
        if(started){   
        const timer = setInterval(() => {
            if(!finished && seconds <= 59){    
                    setSeconds(seconds+=1);        
                }
            }, 1000);                   
            return ()=>clearInterval(timer)
        }
    }, [started]);


    const correctSymbolsFunc = (inputValue) => {
        const text = quotes.replace(' ','');
        const correctSymbol = inputValue.replace(' ', '').split('').filter((char,index) => char === text[index]).length;
        setCorrectSymbols(correctSymbol)
    };
    if(started && incomplete){
        return (
            <div className="mainContainer">
                <div className="FailedContainer">
                    <FailedScreen />                    
                </div>
                    <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} userInput={userInput}/>
                    <RestartButton handleRestart={handleRestart}/>
            </div>  
        )
    }else if(finished && passed){
        return(
            <div className="mainContainer">
                <div className="PassedContainer">
                    <PassedScreen />                  
                </div>
                    <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} userInput={userInput}/>
                <div>
                    <RestartButton handleRestart={handleRestart}/>
                    <NextButton handleNext={handleNext}/>  
                </div>
            </div> 
        )
    }else if(!loading){
        return (
            <div className="mainContainer">
                <div className="previewContainer">
                    <Preview quotes={quotes} userInput={userInput}/>
                </div>
                <div>
                    <InputBox userInput={userInput} handleInputOnChange={handleInputOnChange} finished={finished}/>                
                </div>
                <div>
                    <RestartButton handleRestart={handleRestart}/>
                    <NextButton handleNext={handleNext}/>
                </div>
                <div>
                    <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} userInput={userInput}/>
                </div>
            </div>
        )
    }else{
        return (
            <div className="Loading">
                <Loading />
            </div>
        )
    }
}

export default App;
