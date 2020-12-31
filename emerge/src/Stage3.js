import React, { useState } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw } from './API';

export default function Stage3(props) {
    const [raw, setRaw] = useState('');
    
    return (
        <div>  
            <InputArea 
                instructions={`Enter ${props.firstCorrection ? 'the first correction' : 'another correction'}:`} 
                inputText={raw} 
                onInput={handleInput}/>
            { props.firstCorrection || <button className="btn" onClick={props.onNoMoreEntries}>Finished?</button> }
            <button className="btn" onClick={handleSubmit}>Continue</button>
        </div>
    );

    function handleInput(event) {
        setRaw(event.target.value);
    }

    function handleSubmit() {
        if (raw !== '') {
            props.onSubmit(SplitLinesFromRaw(raw.trim(), true));
            setRaw('');
        }
        // TODO else do error message
    }
}
