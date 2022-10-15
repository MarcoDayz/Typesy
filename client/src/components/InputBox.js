const InputBox = ({userInput, handleInputOnChange, finished}) => {

    return <textarea className="inputBox" placeholder="Type Here..." value={userInput} onChange={handleInputOnChange} readOnly={finished}></textarea>
}

export default InputBox;