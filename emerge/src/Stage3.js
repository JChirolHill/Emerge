import React, { useState } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw } from './API';

export default function Stage3(props) {
    const [raw, setRaw] = useState('');
    
    return (
        <>  
            <InputArea 
                instructions={`Enter ${props.firstCorrection ? 'the first correction' : 'another correction'}:`} 
                inputText={raw} 
                onInput={handleInput}/>
            <button onClick={props.onNoMoreEntries}>Finished</button>
            <button onClick={handleSubmit}>Continue</button>
        </>
    );

    function handleInput(event) {
        setRaw(event.target.value);
    }

    function handleSubmit() {
        if (raw !== '') {
            props.onSubmit(SplitLinesFromRaw(raw));
        }
        // TODO else do error message
    }
}
