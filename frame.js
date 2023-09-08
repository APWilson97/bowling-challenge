class Frame {
    constructor(frame, roll1, roll2, roll3=null) {
        this._frame = frame;
        this._roll1 = roll1;
        this._roll2 = roll2;
        this._roll3 = roll3;
    };

    isStrike() {
        if(this._roll1 === 10 || this._roll2 === 10) {
            return true;
        } else {
            return false;
        };
    };

    isSpare() {
        if(this._roll1 + this._roll2 === 10 && (this._roll1 !== 10 && this._roll2 !== 10)) {
            return true;
        } else {
            return false;
        };
    };

    calculateStrikeBonus(otherFrame) {
        if(otherFrame._frame === 10) {
            const bonus = otherFrame._roll1 + otherFrame._roll2 + otherFrame._roll3;
            return this._roll1 + this._roll2 + bonus;
        } else {
            const bonus = otherFrame._roll1 + otherFrame._roll2;
            return this._roll1 + this._roll2 + bonus;
        };
    };

    calculateSpareBonus(otherFrame) {
        const bonus = otherFrame._roll1;
        return this._roll1 + this._roll2 + bonus;
    };

    checkExtraRoll() {
        if(this._frame === 10 && this.isStrike()) {
            return true;
        } else if(this._frame === 10 && this.isSpare()){
            return true;
        } else {
            return false;
        };
    };

    isFinalFrame() {
        if(this._frame === 10) {
            return true;
        } else {
            return false;
        };
    };

    calculateFinalFrameBonus() {
        if(this.checkExtraRoll()) {
            const bonus = this._roll1 + this._roll2 + this._roll3;
            return bonus
        };
    };
};

module.exports = Frame;