/**
 * Author: Luis Arcia
 * Web: weblarc.com
 * 2019
 */

'use strict';

(function( doc ) {
	const items = [
		{ img: '👊', win: 2 },
		{ img: '🤚', win: 0 },
		{ img: '✌️', win: 1 }
	];

	var timer;
	var players = {
		player1: { name: '-', scoring: 0 },
		player2: { name: 'PC', scoring: 0 }
	}
	var lastOption;
	var scorePlayer1Elem 	= doc.getElementById('score-player1');
	var scorePlayer2Elem 	= doc.getElementById('score-player2');
	var optionPlayer1 		= doc.getElementById('option-selected-player1');
	var optionPlayer2 		= doc.getElementById('option-selected-player2');
	var result_pp			= doc.getElementById('result-popup');
	var winPlayerElem 		= doc.getElementById('win-player');
	var namePlayer1			= doc.getElementById('name-player1');
	var playBtn 			= doc.getElementById('play');
	var startPopup			= doc.getElementById('start-popup');

	const btns = doc.getElementsByClassName('btn-option');

	const random = () => {
		return Math.floor( Math.random() * items.length );
	}

	const updateScoreboard = () => {
		scorePlayer1Elem.innerText = `Score: ${players.player1.scoring}`;
		scorePlayer2Elem.innerText = `Score: ${players.player2.scoring}`;
	}

	const howWins = ( player1, player2 ) => {
		if( player1 == player2 ) {
			players.player1.scoring += 1;
			players.player2.scoring += 1;
			return 'Empate';
		}

		if( items[ player1 ].win == player2 ) {
			players.player1.scoring += 1;
			return `Gana ${players.player1.name}`;
		}
		
		players.player2.scoring += 1;
		return `Gana ${players.player2.name}`;
	}

	const randomEffect = () => {
		var i = 0;

		clearInterval(timer);

		timer = setInterval(function() { 
			if( i == items.length ) i = 0;
			optionPlayer2.innerText = items[i].img
			i++
		}, 60);
	}

	const play = ( optionSelectedPlayer1 ) => {
		var itemPlayer 			= optionSelectedPlayer1;
		var itemAI 				= random();
		result_pp.style.display = 'none';

		optionPlayer2.innerText = '';
		optionPlayer1.innerText = items[itemPlayer].img;

		randomEffect();

		setTimeout(function() {
			clearInterval(timer);
			optionPlayer2.innerText = items[itemAI].img;

			var win = howWins( itemPlayer, itemAI );
			result_pp.style.display = 'block';
			winPlayerElem.innerText = win;
			updateScoreboard();

			setTimeout(function() {
				result_pp.style.display = 'none';
			}, 2000);

		}, 1500);	
	}

	const setPlayer = () => {
		var namePlayer = doc.getElementById('name-player').value;
		players.player1.name 		= namePlayer;
		namePlayer1.innerText 		= namePlayer;
		startPopup.style.display 	= 'none';
	}

	playBtn.addEventListener('click', (e) => {
		setPlayer();
	});

	for(var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', ( e ) => {
			play( e.target.value );
		});
	}
})(document);