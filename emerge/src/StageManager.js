import React from 'react';
import { Redirect } from 'react-router-dom';
// import Launch from './Launch';
import Stage1 from './Stage1';
import Stage2 from './Stage2';
import Stage3 from './Stage3';
import Stage4 from './Stage4';
import Stage5 from './Stage5';
import './App.css';

export default class StageManager extends React.Component {
    constructor() {
        super();
        this.state = {
            stage: 1,
            entries: [],
            currEntryIndex: 0,
            loading: false
        };
    }

    render() {
        console.log(this.state.entries);
        switch (this.state.stage) {
            // case 0:  {
            //     return (
            //         <Launch onSubmit={this.handleSubmit}/>
            //     );
            // }
            case 1:
                return (
                    <Stage1 onSubmit={this.handleSubmit}/>
                );
            case 2:
                return (
                    <Stage2 
                        onSubmit={this.handleSubmit}
                        textToValidate={this.state.entries[this.state.currEntryIndex]}/>
                );
            case 3:
                return (
                    <Stage3 
                        onSubmit={this.handleSubmit}
                        onNoMoreEntries={this.handleNoMoreEntries}
                        firstCorrection={this.state.entries.length < 2}/>
                );
            case 4:
                return (
                    <Stage4 
                        onSubmit={this.handleSubmit}
                        originalLines={this.state.entries[0]}
                        inputText={this.state.entries[this.state.currEntryIndex]}/>
                );
            case 5:
                return (
                    <Stage5 
                        onSubmit={this.handleSubmit}
                        onAddCorrection={this.handleAddEntry}
                        originalLines={this.state.entries[0]}
                        entries={this.state.entries}/>
                );
            default:
                break;
        }
    }

    handleSubmit = (lines) => {
        switch (this.state.stage) {
            // case 0:
            //     this.setState({
            //         stage: 1
            //     });
            //     break;
            case 1:
                this.setState({ 
                    stage: 2,
                    entries: this.updateEntries(lines)
                });
                this.redirectToStage(2);
                break;
            case 2:
                this.setState({ 
                    stage: 3,
                    entries: this.updateEntries(lines),
                    currEntryIndex: this.state.currEntryIndex + 1
                });
                this.redirectToStage(3);
                break;
            case 3: 
                if (lines.length !== this.state.entries[0].length) {
                    this.setState({ 
                        stage: 4,
                        entries: this.updateEntries(lines)
                    });
                    this.redirectToStage(4);
                }
                else {
                    this.setState({ 
                        entries: this.updateEntries(lines),
                        currEntryIndex: this.state.currEntryIndex + 1
                    });
                    this.redirectToStage(this.state.stage);
                }
                break;
            case 4:
                this.setState({ 
                    stage: 3,
                    entries: this.updateEntries(lines),
                    currEntryIndex: this.state.currEntryIndex + 1
                });
                this.redirectToStage(3);
                break;
            case 5:
                this.setState({ 
                    stage: 1,
                    entries: [],
                    currEntryIndex: 0
                });
                this.redirectToStage(1);
                break;
            default:
                console.err('Invalid stage number');
                break;
        }
    }

    handleNoMoreEntries = () => {
        this.setState({
            stage: 5
        });
        this.redirectToStage(5);
    }

    handleAddEntry = () => {
        this.setState({
            stage: 3
        });
        this.redirectToStage(3);
    }

    redirectToStage = (stage) => {
        switch (stage) {
            case 1:
                return <Redirect to="/original/input"/>;
            case 2:
                return <Redirect to="/original/validate"/>;
            case 3:
                return <Redirect to="/correction/input"/>;
            case 4:
                return <Redirect to="/correction/validate"/>;
            case 5:
                return <Redirect to="/result"/>;
            default:
                return <Redirect to="/"/>;
        }
    }

    updateEntries = (entry) => {
        const updatedEntries = [...this.state.entries];
        updatedEntries[this.state.currEntryIndex] = entry;
        return updatedEntries;
    }
}
