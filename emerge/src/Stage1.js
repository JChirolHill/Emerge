import React, { useState } from 'react';
import { SplitLinesFromRaw, ExtractCorrection } from './API';
import ContentEditable from 'react-contenteditable';

export default function Stage1(props) {
    const [raw, setRaw] = useState('');

    return (
        <div>
            <h4>{ props.isCorrection ? 'Enter a correction' : 'Enter your original entry' }</h4>
            <ContentEditable html={raw} onChange={handleInput}/>
            { props.firstCorrection || <button id="btnFinish" className="btn" onClick={handleNoMoreEntries}>Finished?</button> }
            <button id="btnContinue" className="btn" onClick={handleSubmit}>Continue</button>
        </div>
    );

    function handleInput(event) {
        setRaw(event.target.value);
    }

    function handleNoMoreEntries() {
        props.onNoMoreEntries(SplitLinesFromRaw(ExtractCorrection(raw), true));
    }

    function handleSubmit() {
        if (raw !== '') {
            props.onSubmit(SplitLinesFromRaw(ExtractCorrection(raw), true));
            setRaw('');
        }
        // TODO else do error message
    }
}
