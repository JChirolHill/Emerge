// Takes in raw string and splits into array of lines, \n delimeter
// Optional boolean parameter to include other delimeters: . ? !
export function SplitLinesFromRaw(raw, allDelim = false) {
    // Add new lines after end-of-sentence punctuation
    if (allDelim) {
        for (let i=0; i<raw.length; ++i) {
            if (raw[i] === '.' || raw[i] === '。' || raw[i] === '!' || raw[i] === '?' || raw[i] === '！' || raw[i] === '？') {
                if (raw[i + 1] === '"' || raw[i + 1] ===  '”') {
                    ++i;
                }
                raw = raw.substr(0, i+1) + '\n' + raw.substr(i+1);
            }
        }
    }

    // Split raw by new-line character
    let rawSplit = raw.split(/\n/);

    // Remove any blank lines after splitting
    for (let i=0; i<rawSplit.length; ++i) {
        if (rawSplit[i].trim() === '') {
            rawSplit.splice(i, 1);
            --i;
        }
    }

    return rawSplit;
}

// Takes in raw string and returns number of 'lines' based on \n delimeter
// Optional boolean parameter to include other delimeters: . ? ! 
export function CountLinesRaw(raw, allDelim) {
    return SplitLinesFromRaw(raw, allDelim).length;
}

// Calculates the diffs between all the entries (array)
// Assumes entries[0] is the original, and all others are corrections
export function CalculateDiffs(entries) {
    const Diff = require('diff');
    const diffLines = []; // Organized by line, not by entry
    for (let i=0; i<entries[0].length; ++i) {
        diffLines.push([]);
    }

    for (let i=1; i<entries.length; ++i) { // Iterate over all entries
        for (let j=0; j<entries[i].length; ++j) { // Iterate over all lines for each entry
            diffLines[j].push(Diff.diffChars(entries[0][j].trim(), entries[i][j].trim()));
        }
    }

    return diffLines;
}

// Returns whether a given line has any corrections
export function AnyCorrections(line) {
    for (let i=0; i<line.length; ++i) {
        if (line[i].added || line[i].removed) {
            return true;
        }
    }
    return false;
}

// If line exceeds limit of characters, trimmed from the middle and replaced with '...'
// Returns trimmed sentence
export function TrimSentence(line) {
    const LENGTH_LIMIT = 25;
    if (line.length > LENGTH_LIMIT) {
        line = `${line.substr(0,15)}.....${line.substr(line.length - 10)}`;
    }
    return line;
}