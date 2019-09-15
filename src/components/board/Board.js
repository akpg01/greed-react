import React, { Component, Fragment } from 'react';
import { DiceWrapper } from '../dice/DiceWrapper';
import * as utils from '../../utils/functions';

export class Board extends Component {
    constructor(props) {
        super(props);

        // initial die to appear on the page
        utils.createDice();

        this.state = {
            dice: utils.diceList,
            points: 0,
            newPoints: 0,
            pointslabel: 0,
            round: 1,
            score: 0,
            disabled: false,
            highscores: []
        }
    }

    /**
     * handles roll actions
     */
    Roll = () => {
        this.updatePoints();
        this.rollRemainingDice();
        this.setState({
            disabled: true
        });
    }

    /**
     * updatePoints
     * updates the points label
     */
    updatePoints = () => {
        this.setState({
            points: this.state.points + this.state.newPoints,
            newPoints: 0,
            pointslabel: this.state.points,
        }, () => this.updatePointsPanel());
    }

    updatePointsPanel = () => {
        this.setState({
            pointslabel: this.state.newPoints + this.state.points
        });
    }

    /**
     * handles end round clicks
     */
    EndRound = () => {
        if (this.isValidSelection() && this.state.newPoints > 0) {
            let score = this.state.score + this.state.points + this.state.newPoints;
            this.setState({
                score
            });
        }

        this.setState({
            newPoints: 0,
            points: 0,
            pointslabel: 0
        });

        if (this.state.round < 10) {
            this.setState({
                round: this.state.round + 1
            });
            this.rollAllDice();
        } else {
            let highScores = this.updateHighScores();
            console.log(highScores);
            console.log(this.state.highscores);
            this.setState(prevState => ({
                score: 0,
                round: 1,
                highscores: [...prevState.highscores]
            }));
            this.rollAllDice();
        }
    }

    updateHighScores = () => {
        let highscores = this.state.highscores;
        highscores.sort();
        if (highscores.length < 10 && !highscores.includes(this.state.score)) {
            highscores.push(this.state.score);
        } else {
            highscores.reverse();
            // if score is greater than other scores, insert score and remove lowest score
            let temp = highscores[highscores.length - 1];
            if (!(highscores.includes(this.state.score)) && (this.state.score > temp)) {
                highscores.pop();
                highscores.push(this.state.score);
            }
        }
        highscores.sort();
        return highscores;
    }

    /**
     * handles actions associated with clicking on a die
     */
    handleDieClick = (e) => {
        let pos = (e.target.parentElement.dataset['pos']) ? e.target.parentElement.dataset['pos'] : e.target.dataset['pos'];
        this.changeStatus(pos);
        this.clickedDie();
    };

    rollAllDice = () => {

        utils.diceList.forEach(elem => {
            // set all element states to available
            elem.state = 'available';
            // generate a random number
            let num = utils.roll();
            // set new value of die
            elem.value = num;
            this.repaint(elem.position);
            this.setState({
                dice: utils.diceList,
                disabled: true
            });

            this.clickedDie();
        });


    }

    rollRemainingDice = () => {

        let count = 0;
        utils.diceList.forEach(elem => {
            if (elem.state === 'selected') {
                elem.state = 'held';
                this.setState({
                    dice: utils.diceList
                });
            } else if (!(elem.state === 'held')) {
                // generate a random number
                let num = utils.roll();
                // set new value of die
                elem.value = num;
                count++;
                this.setState({
                    dice: utils.diceList
                });

                this.clickedDie();
            }
        });

        if (count === 0) {
            this.rollAllDice();
        }
    };

    clickedDie = () => {
        let disabled = true;
        if (this.isValidSelection()) {
            disabled = false;
        }
        // call back method to automatically updated the points panel after disabled has been set
        this.setState({
            disabled
        }, () => { this.updatePointsPanel() });
    };


    /**
    * change state of clicked element to available vs selected
    * @param {pos} int
    */
    changeStatus = (pos) => {
        if (utils.diceList[pos].state === 'available') {
            utils.diceList[pos].state = 'selected';
            this.repaint(pos);
            this.setState({
                dice: utils.diceList
            });
        } else if (utils.diceList[pos].state === 'selected') {
            utils.diceList[pos].state = 'available';
            this.repaint(pos);
            this.setState({
                dice: utils.diceList
            });
        } else if (utils.diceList[pos].state === 'held') {
            utils.diceList[pos].state = 'held';
            this.repaint(pos);
            this.setState({
                dice: utils.diceList
            });
        }

    }

    repaint = (pos) => {
        let status = utils.diceList[pos].state;
        switch (status) {
            case 'available':
                utils.diceList[pos].color = 'white';
                this.setState({
                    dice: utils.diceList
                });
                break;
            case 'selected':
                utils.diceList[pos].color = 'red';
                this.setState({
                    dice: utils.diceList
                });
                break;
            case 'held':
                utils.diceList[pos].color = ' gray';
                this.setState({
                    dice: utils.diceList
                });
                break;
            default:
                break;
        }
    }

    isValidSelection = () => {
        const count = [0, 0, 0, 0, 0, 0];
        let totalCount = 0;
        let valid = true;
        let earnedPoints = 0;
        this.setState({
            newPoints: 0
        });

        utils.diceList.forEach((elem) => {
            if (elem.state === 'selected') {
                let value = elem.value;
                count[value - 1]++;
                totalCount++;
            }
        });

        if (totalCount === 0) {
            valid = false;
        } else if (count[0] === 1 && count[1] === 1 && count[2] === 1 &&
            count[3] === 1 && count[4] === 1 && count[5] === 1 && count[6] === 1) {
            earnedPoints += 250;
            this.setState({
                newPoints: earnedPoints
            });
        } else {

            for (let i = 0; i < count.length; i++) {
                switch (count[i]) {
                    case 1:
                        if (i === 0) {
                            earnedPoints += 10;
                            this.setState({
                                newPoints: earnedPoints
                            });

                        } else if (i === 4) {
                            earnedPoints += 5;
                            this.setState({
                                newPoints: earnedPoints
                            });

                        } else {
                            valid = false;
                        }
                        break;
                    case 2:
                        if (i === 0) {
                            earnedPoints += 20;
                            this.setState({
                                newPoints: earnedPoints
                            });

                        } else if (i === 4) {
                            earnedPoints += 10;
                            this.setState({
                                newPoints: earnedPoints
                            });
                        } else {
                            valid = false;
                        }
                        break;
                    case 3:
                        if (i === 0) {
                            earnedPoints += 100;
                            this.setState({
                                newPoints: earnedPoints
                            });
                        } else {
                            earnedPoints += (10 * (i + 1));
                            this.setState({
                                newPoints: earnedPoints
                            });
                        }
                        break;
                    case 4:
                        earnedPoints += 200;
                        this.setState({
                            newPoints: earnedPoints
                        });
                        break;
                    case 5:
                        earnedPoints += 300;
                        this.setState({
                            newPoints: earnedPoints
                        });
                        break;
                    case 6:
                        earnedPoints += 500;
                        this.setState({
                            newPoints: earnedPoints
                        });
                        break;
                    default:
                        break;
                }
            }
        }
        return valid;
    }

    render() {
        return (
            <Fragment>
                <div className="gameBoard">
                    <div className="gameInfo">
                        <div className="winnersCircle"><a href="!#"><i className="fa fa-list-ul"></i></a></div>
                        <div className="gameRules"><a href="!#"><i className="fa fa-info-circle"></i></a></div>
                    </div>
                    <div id="title">Greedy</div>
                    <div className="wrapper">
                        <div className="results">
                            <div className="label__r">Rounds:</div>
                            <div className="label__info lbl_rounds">{this.state.round}</div>
                            <div className="label__s">Score:</div>
                            <div className="label__info lbl_score">{this.state.score}</div>
                        </div>
                        <div className="diceWrapper">
                            <div className="points">
                                <div className="label">Points:</div>
                                <div className="label_info lbl_points">{this.state.pointslabel}</div>
                            </div>
                            <div className="dicePanel">
                                <DiceWrapper dice={this.state.dice} onClick={e => this.handleDieClick} />
                            </div>
                        </div>
                        <div className="prevScore">The previous high score was <span className="highScore">{isFinite(Math.max(...this.state.highscores)) ? Math.max(...this.state.highscores) : 0}</span></div>
                    </div>
                    <div className="buttons">
                        <button type="button" id="roll" onClick={this.Roll} disabled={this.state.disabled}>Roll</button>
                        <button type="button" id="end-round" onClick={this.EndRound}>End Round</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

