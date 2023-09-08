const Scorecard = require('./scorecard.js');

describe ('Scorecard', () => {
    it('Add two frames and check score', () => {
        const scorecard = new Scorecard();
        scorecard.addFrame(1, 2, 5);
        scorecard.addFrame(2, 3, 4);
        expect(scorecard.calculateScore()).toBe(14);
    });
    it('Add strikes and check score with bonus', () => {
        const scorecard = new Scorecard();
        scorecard.addFrame(1, 10, 0);
        scorecard.addFrame(2, 2, 5);
        expect(scorecard.calculateScore()).toBe(24);
    });
    it('Add a strike and a spare and check score with bonus', () => {
        const scorecard = new Scorecard();
        scorecard.addFrame(1, 0, 10);
        scorecard.addFrame(2, 2, 8);
        scorecard.addFrame(3, 3, 2);
        expect(scorecard.calculateScore()).toBe(38);
    });
    it('Add a spare and check score with bonus', () => {
        const scorecard = new Scorecard();
        scorecard.addFrame(1, 2, 5);
        scorecard.addFrame(2, 3, 7);
        scorecard.addFrame(3, 2, 6);
        expect(scorecard.calculateScore()).toBe(27);
    })
    it('Add an existing frame and get appropriate message', () => {
        const scorecard = new Scorecard();
        scorecard.addFrame(1, 2, 5);
        expect(scorecard.addFrame(1, 3, 7)).toBe('Invalid input, no rolls left for that frame');
    });
    it('Reset game', () => {
        const scorecard = new Scorecard();
        scorecard.addFrame(1, 2, 3);
        scorecard.addFrame(2, 3, 4);
        expect(scorecard.calculateScore()).toBe(12);
        scorecard.resetGame()
        expect(scorecard.calculateScore()).toBe(0);
    });
    it('Add 10 frames and check if calculate score message is shown when adding another frame', () => {
        const scorecard = new Scorecard();
        for (let i = 0; i < 10; i++) {
            scorecard.addFrame(i+1, 2, 3);
        };
        expect(scorecard.addFrame(11, 2, 3)).toBe('Game over! Please calculate your score.')
        expect(scorecard.calculateScore()).toBe(50);
    });
    it('Add 10 frames, last frame has a strike so check if score reflects that', () => {
        const scorecard = new Scorecard();
        for (let i = 0; i < 9; i++) {
            scorecard.addFrame(i+1, 2, 3);
        };
        scorecard.addFrame(10, 0, 10, 5);
        expect(scorecard.calculateScore()).toBe(60);
    });
    it('Add 10 frames, last frame has spare and then strike in third roll, check score', () => {
        const scorecard = new Scorecard();
        for (let i = 0; i < 9; i++) {
            scorecard.addFrame(i+1, 2, 3);
        };
        scorecard.addFrame(10, 2, 8, 10);
        expect(scorecard.calculateScore()).toBe(65);
    });
})