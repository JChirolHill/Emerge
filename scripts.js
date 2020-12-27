let lines = [];
let state = 0;

// ------------------------------------------------------------
// Step 0: Enter raw original text and correction text
// ------------------------------------------------------------

// Onclick for Step 0 Continue button
document.querySelector('#step-0 .continue').onclick = () => {
    let textarea = document.querySelector('#step-0 textarea');
    if (textarea.value.trim() === '') {
        // TODO show error message
        // Please input something before pressing continue
    }
    else {
        loadNextState();
    }
};

// ------------------------------------------------------------
// Step 1: Validate lines in original
// ------------------------------------------------------------

document.querySelector('#step-1 .reset').onclick = () => {
    populateTextarea(1, 0);
};

document.querySelector('#step-1 .continue').onclick = () => {
    let textarea = document.querySelector('#step-1 textarea');
    if (textarea.value.trim() === '') {
        // TODO show error message
        // Please input something before pressing continue
    }
    else {
        loadNextState();
    }
};

// ------------------------------------------------------------
// Step 2: Validate lines in corrections and check match original
// ------------------------------------------------------------

// ------------------------------------------------------------
// Step 3: Result of diff
// ------------------------------------------------------------

// Updates lines based on user-selections
function updateLines(domStep, correctionIndex) {
    // Clear original lines in array
    lines[correctionIndex] = [];

    // Refill lines in array from user-selected lines
    let domInputs = document.querySelectorAll(`#step-${domStep} .list-check-lines input[type=checkbox]`);
    domInputs.forEach((input) => {
        if (input.checked) {
            // Splice any added new lines
            lines[correctionIndex] = lines[correctionIndex].concat(input.nextSibling.value.split(/\n/));
        }
        else { // Append text to previous
            lines[correctionIndex][lines[correctionIndex].length - 1] += input.value;
        }
    });

    // console.log(`After updating at index ${correctionIndex}:`, lines);
}

// Populates container for checks and text inputs to validate lines
// function populateCheckLines(domStep, correctionIndex) {
//     let linesContainer = document.querySelector(`#step-${domStep} .list-check-lines`);
//
//     // Add each line to the linesContainer
//     lines[correctionIndex].forEach((line, index) => {
//         let tempDiv = document.createElement('div');
//         let tempInputCheck = document.createElement('input');
//         let tempInputText = document.createElement('input');
//         let forAttr = document.createAttribute('for');
//
//         tempInputCheck.type = 'checkbox';
//         tempInputCheck.checked = true;
//         tempInputCheck.value = line;
//         tempInputText.type = 'text';
//         tempInputText.value = line;
//
//         tempDiv.appendChild(tempInputCheck);
//         tempDiv.appendChild(tempInputText);
//         linesContainer.appendChild(tempDiv);
//     });
//
//     // Show number of lines only if not validating original
//     if (domStep >= 2) {
//         let matchStatus = document.querySelector(`#step-${domStep} .correction-container .match-status`);
//         matchStatus.innerText = `${lines[correctionIndex].length} Lines`;
//     }
// }

function splitLinesFromRaw(raw) {
    // Split raw by new-line character
    let rawSplitNewLine = raw.split(/\n/);

    // Split by end-of-sentence punctuation
    let rawSplit = [];
    rawSplitNewLine.forEach((line) => {
        rawSplit = rawSplit.concat(line.split(/\.|。|!|\?/));
    });

    // Remove any blank lines after splitting
    rawSplit.forEach((line, index) => {
        if (line === '') {
            rawSplit.splice(index, 1);
        }
    });

    return rawSplit;
}

function populateTextarea(domStep, indexCorrection) {
    let textarea = document.querySelector(`#step-${domStep} textarea`);
    textarea.value = '';
    lines[indexCorrection].forEach((line) => {
        textarea.value += `${line}\n`;
    });
}

function loadNextState() {
    switch (state) {
        case 0:
            if (lines.length > 0) { // Inputted a correction
                // if num lines matches original
                // Go to step 0
                // state = 0;
                // else
                // Go to step 2
                // state = 2;
            }
            else if (lines.length === 0) { // Inputted original
                // Split lines
                let textarea = document.querySelector(`#step-0 textarea`);
                let rawSplit = splitLinesFromRaw(textarea.value);
                textarea.value = "";
                lines.push(rawSplit);

                // Populate step 1
                populateTextarea(1, 0);

                state = 1;
                // TODO: Hide step 0, show step 1
            }
            break;
        case 1:
            // Split lines
            let textarea = document.querySelector(`#step-1 textarea`);
            let rawSplit = splitLinesFromRaw(textarea.value);
            textarea.value = "";
            lines[lines.length - 1] = rawSplit;

            // Setup step 0 for accepting corrections
            document.querySelector('#step-0 .instructions').innerText = 'Copy and paste each correction';

            // Populate step 2 original side
            // lines[0].forEach((line) => {
            //     let tempDiv = document.createElement('div');
            //     tempDiv.innerText = line;
            //     document.querySelector('#step-2 .list-orig-lines').appendChild(tempDiv);
            // });
            //
            // Populate step 2 correction side
            // populateCheckLines(2, 1);
            //
            // // TODO Show step 2

            state = 0;
            // TODO: hide step 1, show step 0
            break;
        case 2:
            break;
        case 3:
            break;
        default:
            console.err('Error, nonexistent state');
    }
}
