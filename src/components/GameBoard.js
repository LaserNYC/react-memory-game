import React, { Component }   from 'react'
import { inject, observer }   from 'mobx-react'
import TopBar                 from './TopBar'
import Tile                   from './Tile'
import _                      from 'lodash'

class GameBoard extends Component {

	constructor(props) {
		super(props);
		this.el = null;
	}

	state = {
		xDir: null,
		yDir: null
	}

	centerX = null
	centerY = null
	
	getMouseData = (e) => {
		this.setState({
			xDir: (e.clientX - this.centerX)/22,
			yDir: (e.clientY - this.centerY)/22
		});
	}

	computePosition = () => {
		let transform = `perspective(1000px) translate3d(0,5%,10px) rotateY(${-this.state.xDir}deg) rotateX(${this.state.yDir}deg)`;
		return { transform }
	}

	componentDidMount(){
		this.centerX = this.el.offsetLeft + this.el.clientWidth / 2;
		this.centerY = this.el.offsetTop + this.el.clientHeight / 2;
		this.el.addEventListener('mousemove', _.throttle(this.getMouseData, 100));
	}

	render(){
		const { MainStore } = this.props;
		return (
			<div className="game-board" ref={div => this.el = div} style={this.computePosition()}>
				{MainStore.allMatched && <p>Congrats!</p>}
				<TopBar />
				<div className={`tile-set${MainStore.currentlyComparing ? ' no-click' : ''}`}>
					{MainStore.currentGlyphs.map((glyphObj, idx) => (
						<Tile key={`${glyphObj.glyph}${idx}${MainStore.timeStamp}`} glyph={glyphObj.glyph} match={glyphObj.match} hiderevealed={MainStore.currentlyComparing} />
					))}
				</div>
			</div>
		)
	}
}

GameBoard = inject('MainStore')(observer(GameBoard));

export default GameBoard