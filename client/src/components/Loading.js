const Loading = ({isAwake}) => {

    return (
        <div className="loading-wrapper">
            <h1 className="head">Typesy</h1>
            <div className="Loading">
                {isAwake? null : <h1>Loading App</h1>}
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                {isAwake? null : <p className="load-msg">Waking server please wait approximately 15 min.</p>}
            </div>
        </div>
    )
}

export default Loading;