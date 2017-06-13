var digits = new Array(13);

var clockStates = {"session":25*60, "break":5*60};
var time = 0;
var currentInterval = null;
var active = false;

var hours_10 = 0;
var hours_1 = 0;
var minutes_10 = 0;
var minutes_1 = 0;
var seconds_10 = 0;
var seconds_1 = 0;


function initializeImageArray() {

	for (var i = 0; i <= 12; i++) {
		digits[i] = new Array();
	}
		
	digits[0].push('images/0-0_domino.png');
	digits[1].push('images/1-0_domino.png');
	digits[2].push('images/2-0_domino.png', 'images/1-1_domino.png');
	digits[3].push('images/3-0_domino.png', 'images/2-1_domino.png');
	digits[4].push('images/4-0_domino.png', 'images/3-1_domino.png', 'images/2-2_domino.png');
	digits[5].push('images/5-0_domino.png', 'images/4-1_domino.png', 'images/3-2_domino.png');
	digits[6].push('images/6-0_domino.png', 'images/5-1_domino.png', 'images/4-2_domino.png', 'images/3-3_domino.png');
	digits[7].push('images/6-1_domino.png', 'images/5-2_domino.png', 'images/4-3_domino.png');
	digits[8].push('images/6-2_domino.png', 'images/5-3_domino.png', 'images/4-4_domino.png');
	digits[9].push('images/6-3_domino.png', 'images/5-4_domino.png');
	digits[10].push('images/6-4_domino.png', 'images/5-5_domino.png');
	digits[11].push('images/6-5_domino.png');
	digits[12].push('images/6-6_domino.png');
	
}

function startClock(setting) {
	
	clearInterval(currentInterval);
		
	time = clockStates[setting];
	
	active = true;
	
	currentInterval = setInterval( function() {
		
		if (time === 0){
			
			if (setting === "session"){
				startClock("break");			
			}	else {
				startClock("session");			
			}		
			
		} else {
			time = time - 1;		
		}
		
		updateDigits();
		
	}, 1000);
}

function stopClock(){
	clearInterval(currentInterval);
	active = false;
	time = clockStates["session"];
	updateDigits();
	$('#start').html("Start");	
}

function pauseClock(){
	clearInterval(currentInterval);
	active = false;
}

function updateDigits() {
	
	var curr_hours = Math.floor((time % (60 * 60 * 24))/(60 * 60));
	var curr_minutes = Math.floor((time % (60 * 60)) / 60);
	var curr_seconds = Math.floor((time % 60));
	
	var curr_hours_10 = Math.floor(curr_hours / 10);
	var curr_hours_1 = curr_hours % 10;	
	
	var curr_minutes_10 = Math.floor(curr_minutes / 10);
	var curr_minutes_1 = curr_minutes % 10;
	
	var curr_seconds_10 = Math.floor(curr_seconds / 10);
	var curr_seconds_1 = curr_seconds % 10;
	
	displayClock(curr_hours_10, curr_hours_1, curr_minutes_10, curr_minutes_1, curr_seconds_10, curr_seconds_1);	
}

function displayClock(h_10, h_1, m_10, m_1, s_10, s_1) {
	
	if (hours_10 !== h_10){
		hours_10 = h_10;
		$('#hours_10 img').attr('src', digits[hours_10][Math.floor(Math.random() * digits[hours_10].length)]);
	}	
	
	if (hours_1 !== h_1){
		hours_1 = h_1;
		$('#hours_1 img').attr('src', digits[hours_1][Math.floor(Math.random() * digits[hours_1].length)]);	
	}
	
	if (minutes_10 !== m_10){
		minutes_10 = m_10;
		$('#minutes_10 img').attr('src', digits[minutes_10][Math.floor(Math.random() * digits[minutes_10].length)]);	
	}
	
	if (minutes_1 !== m_1){
		minutes_1 = m_1;
		$('#minutes_1 img').attr('src', digits[minutes_1][Math.floor(Math.random() * digits[minutes_1].length)]);	
	}
	
	if (seconds_10 !== s_10){
		seconds_10 = s_10;
		$('#seconds_10 img').attr('src', digits[seconds_10][Math.floor(Math.random() * digits[seconds_10].length)]);	
	}
	
	
	if (seconds_1 !== s_1){
		seconds_1 = s_1;
		$('#seconds_1 img').attr('src', digits[seconds_1][Math.floor(Math.random() * digits[seconds_1].length)]);	
	}	
}

function incrementTimer(){
	
	if (time < (60 * 60 * 24)){
		time = time + 60;
		clockStates["session"] = clockStates["session"] + 60;
		updateDigits();
		$('#session-time').html(parseInt($('#session-time').html(), 10) + 1);
	}
}

function decrementTimer(){

	if (time >= (60 * 2)) {
		time = time - 60;
		clockStates["session"] = clockStates["session"] - 60;
		updateDigits();
		$('#session-time').html(parseInt($('#session-time').html(), 10) - 1);
	}
}

function incrementBreak(){
	
	if (clockStates["break"] < clockStates["session"]){
		clockStates["break"] = clockStates["break"] + 60;
		$('#break-time').html(parseInt($('#break-time').html(), 10) + 1);	
	}
}

function decrementBreak(){
	
	if (clockStates["break"] > 60){
		clockStates["break"] = clockStates["break"] - 60;
		$('#break-time').html(parseInt($('#break-time').html(), 10) - 1);
	}		
}

function reset(){
	
	clockStates["session"] = (25 * 60);
	clockStates["break"] = (5 * 60);
	$('#session-time').html(25);
	$('#break-time').html(5);
	stopClock();	
	
}

$(document).ready( function () {
		
	initializeImageArray();
	time = clockStates["session"];
		
	$('#start').on('click', function () {
		
		if (!active){
			startClock("session");	
			$('#start').html("Pause");
		}	else {
			pauseClock();
			$('#start').html("Start");		
		}	
			
	});
	
	$('#stop').on('click', stopClock);
	
	$('#session-increment').on('click', incrementTimer);
	
	$('#session-decrement').on('click', decrementTimer);
	
	$('#break-increment').on('click', incrementBreak);
	
	$('#break-decrement').on('click', decrementBreak);
	
	$('#reset').on('click', reset);

});