import React, { useState } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw, CountLinesRaw } from './API';

export default function Stage4(props) {
    const [raw, setRaw] = useState(props.inputText.join('\n'));
    const [numLinesRaw, setNumLinesRaw] = useState(CountLinesRaw(raw));
    
    return (
        <>
            <h2>Original</h2>
            <div>
                { props.originalLines.map((line, index) => {
                    return <div key={`orig-line-${index}`}>{line}</div>
                })}
                <div>{`${props.originalLines.length} lines`}</div>
            </div>
            
            <InputArea 
                instructions={'Add/remove lines until the number of lines matches that of the original:'} 
                inputText={raw} 
                onInput={handleInput}/>
            
            <div>{`${numLinesRaw} lines`}</div>
            <button onClick={handleSubmit}>Continue</button>
        </>
    );

    function handleInput(event) {
        setRaw(event.target.value);
        setNumLinesRaw(CountLinesRaw(event.target.value));
    }

    function handleSubmit() {
        if (props.originalLines.length === numLinesRaw) {
            props.onSubmit(SplitLinesFromRaw(raw));
        }
        // TODO else do error message
    }
}
