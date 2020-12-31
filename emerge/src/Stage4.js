import React, { useState } from 'react';
import InputArea from './InputArea';
import { SplitLinesFromRaw, CountLinesRaw } from './API';

export default function Stage4(props) {
    const [raw, setRaw] = useState(props.inputText.join('\n'));
    const [numLinesRaw, setNumLinesRaw] = useState(CountLinesRaw(raw));
    const [linesEqual, setLinesEqual] = useState(false);
    
    return (
        <div>
            <h4 className="mb-3">Add/remove new lines (return key) until the number of lines matches that of the original:</h4>

            <div className="row">
                <div className="col-12 col-md-6 text-end divider">
                    <h3>Original</h3>
                    <div style={{marginTop: '10px'}}>
                        { props.originalLines.map((line, index) => {
                            return <div key={`orig-line-${index}`} className="spaced-vertically">{line}</div>
                        })}
                    </div>
                </div>
                <div className="col-12 col-md-6 text-start">
                    <h3>Correction</h3>
                    <InputArea  
                        spaced={true} 
                        inputText={raw} 
                        rows={props.originalLines.length}
                        onInput={handleInput}/>
                </div>
            </div>
            
            <div className="row">
                <div className={`col-6 text-end divider ${linesEqual ? 'text-success' : 'text-danger'}`}>
                    {`${props.originalLines.length} lines`}
                </div>
                <div className={`col-6 text-start ${linesEqual ? 'text-success' : 'text-danger'}`}>
                    {`${numLinesRaw} lines`}
                </div>
            </div>

            <button className="btn" onClick={handleReset}>Reset</button>
            {props.originalLines.length === numLinesRaw && <button className="btn" onClick={handleSubmit}>Continue</button>} 
        </div>
    );

    function handleInput(event) {
        setRaw(event.target.value);

        let updatedLines = CountLinesRaw(event.target.value);
        setNumLinesRaw(updatedLines);
        setLinesEqual(props.originalLines.length === updatedLines);
    }

    function handleSubmit() {
        if (props.originalLines.length === numLinesRaw) {
            props.onSubmit(SplitLinesFromRaw(raw));
            setRaw('');
        }
        // TODO else do error message
    }

    function handleReset() {
        setRaw(props.inputText.join('\n'));
    }
}
