const InputBox = ({userInput, handleInputOnChange, finished}) => {

    return <textarea className="inputBox" placeholder="Start typing..." value={userInput} onChange={handleInputOnChange} readOnly={finished}></textarea>
}

export default InputBox;