import { action, observable, decorate }    from "mobx";
import _                                   from 'lodash'
import glyphs                              from './glyphs'

class MainStore {

	// first half of glyphs, duped for matching purposes
	easyGlyphs = [...glyphs.slice(0, (glyphs.length / 2)), ...glyphs.slice(0, (glyphs.length / 2))];

	// all glyphs, duped for matching purposes
	hardGlyphs = [...glyphs, ...glyphs];

	// OBSERVABLES
	currentGlyphs                = _.shuffle(this.easyGlyphs); // start at easy difficulty on initial load
	currentlyComparing           = false;
	tilesSelected                = [];
	moves                        = 0;
	time                         = 0;
	timeInterval                 = null;
	timerStarted                 = false;
	matches                      = 0;
	allMatched                   = false;
	enableDifficultySelection    = true;
	timeStamp                    = Date.now();

	// ACTIONS

	// fires when selecting difficulty from the dropdown
	initNewGame = (difficulty = 'easy') => {
		// reset glyphs
		this.currentGlyphs = _.shuffle(difficulty === 'easy' ? this.easyGlyphs : this.hardGlyphs);

		// get new time stamp to assure unique keys
		this.timeStamp = Date.now();

		// clear timer
		clearInterval(this.timeInterval);
		this.timerStarted = false;
		this.time = 0;

		// reset moves and current matches
		this.allMatched = false;
		this.matches = 0;
		this.moves = 0;

	}

	// fires when all matches are made
	gameWon = () => {
		// all tiles matched, hook to trigger canvas animation
		this.allMatched = true;

		// freeze timer, but leave time as is so user can see how long it took
		this.timerStarted = false;
		clearInterval(this.timeInterval);

		// re-enable difficulty selector
		this.enableDifficultySelection = true;
	}

	// start the game timer
	startTimer = () => {
		this.timerStarted = true;
		this.enableDifficultySelection = false;
		this.timeInterval = setInterval(() => {
			this.time++
		}, 1000);
	}

	// fire on tile selection
	selectTile = (selectedGlyph) => {
		if (!this.timerStarted){
			this.startTimer();
		}
		
		// increase by 0.5, since 2 tiles flips is actually 1 move
		this.moves += 0.5;

		// push selected glyph only if there are less than 2 already being compared
		if (this.tilesSelected.length < 2){
			this.tilesSelected.push(selectedGlyph);
		}

		// ready to compare if 2 have been selected
		if (this.tilesSelected.length === 2) {

			// freeze further clicks while comparing
			this.currentlyComparing = true;

			// if match found
			if (this.tilesSelected[0] === this.tilesSelected[1]){

				// mutate shuffled array for re-render
				_.delay(() => {
					this.currentGlyphs.forEach((item,idx) => {
						if (item.glyph === selectedGlyph){
							this.currentGlyphs[idx].match = true;
						}
					});
					
					// clear compare array for next comparison
					this.tilesSelected = [];

					// save match count
					this.matches++;

					if (this.matches === this.currentGlyphs.length / 2){
						this.gameWon();
					}

					// unfreeze interaction
					this.currentlyComparing = false;

				}, 400);

			}

			// no match found, reset everything
			else {
				_.delay(() => {
					this.currentlyComparing = false;
					this.tilesSelected = [];
				}, 1400);
			}
		}

	}

}

decorate(MainStore, {
	currentGlyphs:              observable,
	moves:                      observable,
	time:                       observable,
	currentlyComparing:         observable,
	allMatched:                 observable,
	enableDifficultySelection:  observable,
	toggleText:                 action,
	initNewGame:                action
});

export default new MainStore();
