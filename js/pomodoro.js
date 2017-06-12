var digits = new Array(13);

var session = 1500000;

function initialize() {

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

$(document).ready( function () {
		
	initialize();
		
	$('#start').on('click', start);

});

function start() {
	
	update(10,12,25);
	
	/*var clock = session + new Date().getTime();
	
	var x = setInterval( function() {
		
		var now = new Date().getTime();
		
		var distance = clock - now;
		
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		
				
		
	}, 1000);*/
	
}

function update(hours, minutes, seconds) {
	
	var hours_10 = Math.floor(hours / 10);
	var hours_1 = hours % 10;
	
	var minutes_10 = Math.floor(minutes / 10);
	var minutes_1 = minutes % 10;
	
	var seconds_10 = Math.floor(seconds / 10);
	var seconds_1 = seconds % 10;
	
	$('#hours_10 img').attr('src', digits[hours_10][0]);
	$('#hours_1 img').attr('src', digits[hours_1][0]);
	$('#minutes_10 img').attr('src', digits[minutes_10][0]);
	$('#minutes_1 img').attr('src', digits[minutes_1][0]);
	$('#seconds_10 img').attr('src', digits[seconds_10][0]);
	$('#seconds_1 img').attr('src', digits[seconds_1][0]);
}