const Frame = require('./frame.js');

class Scorecard {
    constructor() {
        this._score = 0;
        this._frames = [];
    };

    addFrame(frame, roll1, roll2, roll3=null) {
        const newFrame = new Frame(frame, roll1, roll2, roll3);
        if (this.checkValidFrame(newFrame)) {
            if (this.noFramesLeft() === false) {
                this._frames.push(newFrame);
            } else {
                return 'Game over! Please calculate your score.';
            };
        } else {
            return 'Invalid input, no rolls left for that frame';
        };
    };

    calculateScore() {
        for (let i=0; i < this._frames.length; i++) {
            if(this._frames[i].isFinalFrame()) {
                if(this._frames[i].checkExtraRoll()) {
                    this._score += this._frames[i].calculateFinalFrameBonus();
                } else {
                    this._score += this._frames[i]._roll1 + this._frames[i]._roll2 + this._frames[i]._roll3;
                };
            } else if(this._frames[i].isStrike()) {
                this._score += this._frames[i].calculateStrikeBonus(this._frames[i+1]);
            } else if(this._frames[i].isSpare()) {
                this._score += this._frames[i].calculateSpareBonus(this._frames[i+1]);
            } else {
                this._score += this._frames[i]._roll1 + this._frames[i]._roll2;
            };
        };
        return this._score;
    };

    resetGame() {
        this._score = 0;
        this._frames = [];
    };

    checkValidFrame(frame) {
        const frames_count = this._frames.filter((currentFrame) => currentFrame._frame === frame._frame);
        if(frames_count.length === 1) {
            return false;
        } else {
            return true;
        };
    };

    noFramesLeft() {
        if(this._frames.length === 10) {
            return true;
        } else {
            return false;
        };
    };
};

module.exports = Scorecard;