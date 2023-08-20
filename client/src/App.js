import React, {useState, useEffect} from "react";
import axios from "axios";
import Preview from "./components/Preview";
import InputBox from "./components/InputBox";
import RestartButton from "./components/RestartButton";
import NextButton from "./components/NextButton";
import WPMSpeed from "./components/WPMSpeed";
import IncompleteScreen from "./components/IncompleteScreen";
import PassedScreen from "./components/PassesScreen";
import FailedScreen from "./components/FailedScreen";
import Loading from "./components/Loading";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [isAwake, setIsAwake] = useState(false);
    const [quotes, setQuotes] = useState('');
    const [userInput, setUserInput] = useState('');
    let [seconds, setSeconds] = useState(0);
    const [correctSymbols, setCorrectSymbols] = useState(0);
    const [WPMnum, setWPMnum] = useState(0);
    const [WordsCount, setWordsCount] = useState(0)
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [incomplete, setIncomplete] = useState(false);
    const [passed, setPassed] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        
        const getQuotesURL = 'https://typesy-api.onrender.com/quotes';
        // const getQuotesURL = 'http://localhost:4000/quotes';
        
        const getQuotes = async () => {
 
            const wakeUp = async () => {
                const {data} = await axios.get('https://typesy-api.onrender.com/');
                // console.log(data)
                setIsAwake(data);
            }
            wakeUp();

            try {
                const {data} = await axios.get(getQuotesURL);
                const datalength = data.length
                const randomNum = Math.floor(Math.random() * datalength)
                const cleanedQuote = cleanQuote (data[randomNum].quote);
                setQuotes(cleanedQuote.toLowerCase())
                //illusion of fetching time
                setTimeout(() => {
                    setLoading(false)
                }, Math.floor(Math.random() * 1000));
                setUserInput("")
                setSeconds(0)
                setCorrectSymbols(0)
                setStarted(false)
                setFinished(false)
                setIncomplete(false)
                setFailed(false)
            } catch (error) {
                console.log(error.message)
            } 
        }
        getQuotes()
    }, [loading]);

    useEffect(()=> {
        if(started){   
        const timer = setInterval(() => {
            if(!finished && seconds <= 59){ 
                    setSeconds(seconds += 1);
                }
            }, 1000);                   
            return ()=>clearInterval(timer)
        }
    }, [started]);

    useEffect(()=> {
        const calculateWPM = () => {
            const wpm = (correctSymbols/5) / (seconds/60)
            setWPMnum(Number.isNaN(Math.floor(wpm))? 0 : Math.floor(wpm)) 
            
            if(seconds === 60){
                setIncomplete(true)
                setFinished(true)
            } 
           
        };
        calculateWPM()
    },[seconds])

    const cleanQuote = (s) => {
        var regex = /[0-9?!@#$%^&*)(+=,'"._-]/g
        const cleanStr = s.replaceAll(regex, '');
        return cleanStr;
    }

    const handleRestart = () => {
        setFinished(true)
        setUserInput("")
        setSeconds(0)
        setCorrectSymbols(0)
        setStarted(false)
        setFinished(false)
        setIncomplete(false)
        setPassed(false)
        setFailed(false)
    };

    const handleNext = () => {
        setLoading(true)
    };

    const handleInputOnChange = (e) => {
        const inputValue = e.target.value
        setStarted(true)
        setUserInput(inputValue)
        correctSymbolsFunc(inputValue)
        handleFinished(inputValue)
        countCorrectWords(inputValue)
    };

    const handleFinished = (inputValue) => {
        //if run out of time
        if(seconds === 60){
            setIncomplete(true)
            setFinished(true)
        }
        //if finished everything correct under time
        if(quotes === inputValue && seconds <= 60 ){
            setFinished(true)
            setPassed(true)
            setStarted(false)
        }
        //if finished everything incorrectly and under time 
        if(quotes.length === inputValue.length && quotes !== inputValue && seconds <= 60){
            setFinished(true);
            setPassed(false);
            setStarted(false);
            setFailed(true);
        }
    };

    const correctSymbolsFunc = (inputValue) => {
        const text = quotes.replaceAll(' ','');
        const correctSymbol = inputValue.replaceAll(' ', '').split('').filter((char,index) => char === text[index]).length;
        setCorrectSymbols(correctSymbol);
    };

    const countCorrectWords = (inputValue) => {
        const text = quotes.split(' ');
        const wordNum = inputValue.split(' ').filter((word,index) => word === text[index]).length;
        setWordsCount(wordNum);
    }


    if(started && incomplete){
        return (
            <div className="mainContainer">
                <h1 className="head">Typesy</h1>
                <div className="previewContainer">
                    <Preview quotes={quotes} userInput={userInput}/>
                </div>
                <div className="Passed-Failed-Container">
                    <IncompleteScreen />                    
                </div>
                <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} WordsCount={WordsCount} WPMnum={WPMnum}/>
                    <RestartButton handleRestart={handleRestart}/>
            </div>  
        )
    }else if(finished && passed){
        return(
            <div className="mainContainer">
                <h1 className="head">Typesy</h1>
                <div className="previewContainer">
                    <Preview quotes={quotes} userInput={userInput}/>
                </div>
                <div className="Passed-Failed-Container">
                    <PassedScreen />                  
                </div>
                <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} WordsCount={WordsCount} WPMnum={WPMnum}/>
                <div>
                    <RestartButton handleRestart={handleRestart}/>
                    <NextButton handleNext={handleNext}/>  
                </div>
            </div> 
        )
    }else if(finished && failed){
        return(
            <div className="mainContainer">
                <h1 className="head">Typesy</h1>
                <div className="previewContainer">
                    <Preview quotes={quotes} userInput={userInput}/>
                </div>
                <div className="Passed-Failed-Container">
                    <FailedScreen />                  
                </div>
                <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} WordsCount={WordsCount} WPMnum={WPMnum}/>
                <div>
                    <RestartButton handleRestart={handleRestart}/>
                </div>
            </div> 
        )

    }else if(!loading){
        return (
            <div className="mainContainer">
                <h1 className="head">Typesy</h1>
                <div className="previewContainer">
                    <Preview quotes={quotes} userInput={userInput}/>
                </div>
                <InputBox userInput={userInput} handleInputOnChange={handleInputOnChange} finished={finished}/>                
                    <WPMSpeed seconds={seconds} correctSymbols={correctSymbols} WordsCount={WordsCount} WPMnum={WPMnum}/>
                <div>
                    <RestartButton handleRestart={handleRestart}/>
                    <NextButton handleNext={handleNext}/>
                </div>

            </div>
        )
    }else{
        return (
            <div>
                <Loading isAwake={isAwake}/>
            </div>
        )
    }
}

export default App;
