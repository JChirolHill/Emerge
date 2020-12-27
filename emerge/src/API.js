import { Diff } from 'diff';

// Takes in raw string and splits into array of lines, \n delimeter
// Optional boolean parameter to include other delimeters: . ? !
export function SplitLinesFromRaw(raw, allDelim) {
    // Split raw by new-line character
    let rawSplit = raw.split(/\n/);

    // Split by end-of-sentence punctuation
    if (allDelim) {
        let rawSplitAllDelim = [];
        rawSplit.forEach((line) => {
            rawSplitAllDelim = rawSplitAllDelim.concat(line.split(/\.|。|!|\?/));
        });
        rawSplit = rawSplitAllDelim;
    }

    // Remove any blank lines after splitting
    rawSplit.forEach((line, index) => {
        if (line === '') {
            rawSplit.splice(index, 1);
        }
    });

    return rawSplit;
}

// Takes in raw string and returns number of 'lines' based on \n delimeter
// Optional boolean parameter to include other delimeters: . ? ! 
export function CountLinesRaw(raw, allDelim) {
    return SplitLinesFromRaw(raw, allDelim).length;
}

export function CalculateDiffs(entries) {
    const diffLines = []; // Organized by line, not by entry
    for (let i=0; i<entries[0].length; ++i) {
        diffLines.push([]);
    }

    for (let i=1; i<entries.length; ++i) { // Iterate over all entries
        for (let j=0; j<entries[i].length; ++j) { // Iterate over all lines for each entry
            diffLines[j].push(Diff.diffChars(entries[0], entries[i]));
        }
    }

    return diffLines;
}

export function Dummy() {
    var one = `他本来从窗子的风景超级漂亮，可是现在大树挡他的视线。`,
        other = `本来他可以从窗子这里看到超级漂亮的风景，可是现在大树挡住了他的视线。 `;
    return Diff.diffChars(one, other);
}