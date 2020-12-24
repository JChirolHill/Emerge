let raws = [];
let lines = [];

// ------------------------------------------------------------
// Step 0: Enter raw original text and correction text
// ------------------------------------------------------------

// Onclick for Enter Another button
document.querySelector('#step-0 .enter-raw').onclick = () => {
    // Add input to raw array
    let textarea = document.querySelector('#step-0 textarea');
    if (textarea.value.trim() !== '') {
        raws.push(textarea.value);
        textarea.value = "";

        // Change radio selection to correction
        document.querySelector('#step-0 input[value=correction]').checked = true;
    }
};

// Onclick for Step 0 Continue button
document.querySelector('#step-0 .continue').onclick = () => {
    // Add input to raw array
    let textarea = document.querySelector('#step-0 textarea');
    if (textarea.value.trim() !== '') {
        raws.push(textarea.value);
        textarea.value = "";

        // Show spinny

        // Separate out lines for all raw inputs
        raws.forEach((raw) => {
            let rawLines = [];
            let tempLines = raw.split(/\n/);
            tempLines.forEach((line) => {
                rawLines = rawLines.concat(line.split(/\.|。|!|\?/));
            });
            rawLines.forEach((line, index) => {
                if (line === '') {
                    rawLines.splice(index, 1);
                }
            });

            lines.push(rawLines);
        });

        // Populate step 1 and show
        populateCheckLines(1, 0);
        // TODO: show step 1
    }
};

// ------------------------------------------------------------
// Step 1: Validate lines in original
// ------------------------------------------------------------

document.querySelector('#step-1 .continue').onclick = () => {
    updateLines(1, 0);

    // Populate step 2 original side
    lines[0].forEach((line) => {
        let tempDiv = document.createElement('div');
        tempDiv.innerText = line;
        document.querySelector('#step-2 .list-orig-lines').appendChild(tempDiv);
    });

    // Populate step 2 correction side
    populateCheckLines(2, 1);

    // TODO Show step 2
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

    console.log(`After updating at index ${correctionIndex}:`, lines);
}

// Populates container for checks and text inputs to validate lines
function populateCheckLines(domStep, correctionIndex) {
    let linesContainer = document.querySelector(`#step-${domStep} .list-check-lines`);

    // Add each line to the linesContainer
    lines[correctionIndex].forEach((line, index) => {
        let tempDiv = document.createElement('div');
        let tempInputCheck = document.createElement('input');
        let tempInputText = document.createElement('input');
        let forAttr = document.createAttribute('for');

        tempInputCheck.type = 'checkbox';
        tempInputCheck.checked = true;
        tempInputCheck.value = line;
        tempInputText.type = 'text';
        tempInputText.value = line;

        tempDiv.appendChild(tempInputCheck);
        tempDiv.appendChild(tempInputText);
        linesContainer.appendChild(tempDiv);
    });

    // Show number of lines only if not validating original
    if (domStep >= 2) {
        let matchStatus = document.querySelector(`#step-${domStep} .correction-container .match-status`);
        matchStatus.innerText = `${lines[correctionIndex].length} Lines`;
    }
}
