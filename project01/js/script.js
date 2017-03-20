// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// global scope variables
	var quotes = [
		{
			quote:'Part of making good decisions in business is recognizing the poor decisions you’ve made and why they were poor.',
			source:'Warren Buffett',
			tags: ['business','inspiration','success'],
			citation:'Lorem ipsum',
			year:2003,
		},
		{
			quote:'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
			source:'Robert Frost',
			tags: ['life','inspiration','travel'],
		},
		{
			quote:'The most difficult thing is the decision to act, the rest is merely tenacity.',
			source:'Amelia Earhart',
			tags: ['life','inspiration','action','work'],
			year: 1925,
		},
		{
			quote:'Life isn\'t about getting and having, it\'s about giving and being.',
			source:'Kevin Kruse',
			tags: ['life','inspiration','travel'],
			citation: 'Dolor sit amet',
		},
		{
			quote:'Explore, Dream, Discover.',
			source:'Mark Twain',
			tags: ['life','inspiration','travel'],
		},
		{
			quote:'Believe you can and you’re halfway there.',
			source:'Theodore Roosevelt',
			tags: ['life','inspiration','action'],
			year:1902
		},
		{
			quote:'Teach thy tongue to say, "I do not know," and thous shalt progress.',
			source:'Maimonides',
			tags: ['life','work'],
			citation: 'Complete works',
			year: 1198,
		},
		{
			quote:'Happiness is not something readymade.  It comes from your own actions.',
			source:'Dalai Lama',
			tags: ['life','inspiration','happniess','action'],
		},
	];
	var quotesLength = quotes.length;
	var start = quotes.slice(0); //clone complete array
	var interval;
// getRandomQuote()
	function getRandomQuote(){
		if( quotesLength <= 0 ){
			quotes = start.slice(0); //clone complete array
			quotesLength = quotes.length;
		}
		var randomNumber = Math.floor( Math.random()*quotes.length );
		var resultingQuote = quotes[ randomNumber ];
		quotes.splice(randomNumber,1);
		quotesLength = quotes.length;
		// quote and quotes left to console
			console.log( resultingQuote.quote );
			console.log( 'quotes left:',quotesLength );
		return resultingQuote;
	}

// randomColor()
	function randomColor(){
		var red = Math.floor( (Math.random()*256) + 1 );
		var green = Math.floor( (Math.random()*256) + 1 );
		var blue = Math.floor( (Math.random()*256) + 1 );
		var RGB = [red,green,blue].join(',');
		return RGB;
	}

// printQuote()
	function printQuote(){
		//variables
			var randomQuote = getRandomQuote();
			var html = '';
		// concat string
			html += '<p class="quote">';
			html += randomQuote.quote;
			html += '</p><p class="source">';
			html += randomQuote.source;
			// check if citation and year exist
				if( randomQuote.citation !== undefined ){
					html += '<span class="citation">';
					html += randomQuote.citation;
					html += '</span>';
				}
				if( randomQuote.year !== undefined ){
					html += '<span class="year">';
					html += randomQuote.year;
					html += '</span>';
				}
			html += '</p>';
		// write resulting html to quote-box
			document.getElementById('quote-box').innerHTML = html;
		// change background-color
			var background_color = randomColor();
			document.body.style.backgroundColor = 'rgb('+background_color+')';
	}
// print first quote from array
printQuote();

// setInterval
window.setInterval(printQuote,3000);
