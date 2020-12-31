import React, { useState } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw } from './API';

export default function Stage2(props) {
    const [raw, setRaw] = useState(props.textToValidate.join('\n'));
    
    return (
        <div>
            <InputArea 
                rows={props.textToValidate.length}
                instructions="Check that the number lines were correctly split up:" 
                inputText={raw} 
                onInput={handleInput}/>
            <button className="btn" onClick={handleReset}>Reset</button>
            <button className="btn" onClick={handleSubmit}>Continue</button>
        </div>
    );

    function handleInput(event) {
        setRaw(event.target.value);
    }

    function handleSubmit() {
        if (raw !== '') {
            props.onSubmit(SplitLinesFromRaw(raw));
            setRaw('');
        }
        // TODO else do error message
    }

    function handleReset() {
        setRaw(props.textToValidate.join('\n'));
    }
}
