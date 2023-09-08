const Frame = require('./frame.js');

describe ('Frame Class', () => {
    it('Check if it is a strike or spare', () => {
        const frame = new Frame(1, 10, 0);
        expect(frame.isStrike()).toBe(true);
        expect(frame.isSpare()).toBe(false);

        const otherFrame = new Frame(2, 5, 5);
        expect(otherFrame.isSpare()).toBe(true);
        expect(otherFrame.isStrike()).toBe(false);
    });
    it('Check if strike bonus is calculated', () => {
        const frame = new Frame(1, 10, 0);
        const frame2 = new Frame(2, 5, 4);
        expect(frame.calculateStrikeBonus(frame2)).toBe(19);
    });
    it('Check if spare bonus is calculated', () => {
        const frame = new Frame(1, 1, 9);
        const frame2 = new Frame(2, 5, 4);
        expect(frame.calculateSpareBonus(frame2)).toBe(15);
    });
    it('Check for strike extra roll', () => {
        const frame = new Frame(10, 0, 10);
        expect(frame.checkExtraRoll()).toBe(true);
    });
    it('Check for spare extra roll', () => {
        const frame = new Frame(10, 3, 7);
        expect(frame.checkExtraRoll()).toBe(true);
    });
    it('Check if final frame', () => {
        const frame = new Frame(10, 3, 7, 5);
        expect(frame.isFinalFrame()).toBe(true);
    })
})