import React from "react";

export default function InputArea(props) {
    return (
        <div>
            <div>{props.instructions}</div>
            <div>
                <textarea rows={props.rows ?? 8} cols="80" value={props.inputText} onChange={props.onInput}></textarea>
            </div>
        </div>
    );
}