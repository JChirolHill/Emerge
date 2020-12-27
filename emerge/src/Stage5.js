import React from 'react';
import { CalculateDiffs } from './API';

export default function Stage5(props) {
    const diffs = CalculateDiffs(props.entries);
    console.log(diffs);

    return (
        <>  
            { diffs.map((line, indexLine) => {
                return (
                    <div key={`sentence-${indexLine}`}>
                        { line.map((correction, indexCorrection) => {
                            return (
                                <div key={`correction-${indexLine}-${indexCorrection}`}>
                                    { correction.map((part, indexPart) => {
                                        return (
                                            <span key={`part-${indexLine}-${indexCorrection}-${indexPart}`} style={`color: ${part.added ? 'turquoise' : part.removed ? 'grey' : 'black'};`}>{part}</span>
                                        );
                                    }) }
                                </div>
                            );
                        })}
                    </div>
                );
            }) }
            <button onClick={handleSubmit}>Start Over</button>
        </>
    );

    function handleSubmit() {
        // TODO else do error message
    }
}