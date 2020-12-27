import React, { useState } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw } from './API';

export default function Stage1(props) {
    const [raw, setRaw] = useState('');
    
    return (
        <>
            <InputArea instructions="Enter your original post:" inputText={raw} onInput={handleInput}/>
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
