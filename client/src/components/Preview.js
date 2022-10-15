const Preview = ({quotes, userInput}) => {
const quote = quotes.split('');
const Input = userInput.split('');

    return (
    <div>
       {//map through quote at index
       quote.map((char,index) => {
        let charColor;
        let charUnderline;
        //condition to compare values
        if(index < Input.length){
            //check is Quote Char is equal o input at index
            //if true green if false red
            charColor = char === Input[index] ? 'green' : 'red';
            charUnderline = char === Input[index] ? 'none' : 'underline';
        }
        //return char wrapped in span to give style for char at index
        return <span key={index} style={{color: charColor, textDecorationLine: charUnderline}}>{char}</span>
       })
       }
    </div>
    )
}

export default Preview;