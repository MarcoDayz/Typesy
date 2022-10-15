import React, {useState, useEffect} from "react";
import axios from "axios";
import Preview from "./components/Preview";
import InputBox from "./components/InputBox";
import RestartButton from "./components/RestartButton";
import NextButton from "./components/NextButton";
import WPMSpeed from "./components/WPMSpeed";

const App = () => {
    const getQuotesURL = 'http://localhost:4000/quotes';

    const [loading, setLoading] = useState(true);
    const [quotes, setQuotes] = useState('test');
    const [userInput, setUserInput] = useState('');
    let [seconds, setSeconds] = useState(0);
    const [correctSymbols, setCorrectSymbols] = useState(0);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
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
        // setLoading(true)
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
        if(quotes === inputValue){
            setFinished(true)
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

    if(!loading){
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
                <WPMSpeed seconds={seconds} correctSymbols={correctSymbols}/>
            </div>
        </div>
    )
    }else{
        return <div>
            <h1>Loading...</h1>
        </div>
    }
}

export default App;
