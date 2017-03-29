
// variables
	const list = document.getElementsByTagName('ul')[0];
	const contentDiv = document.getElementsByClassName('page')[0];
	const contentHeaderDiv = document.getElementsByClassName('page-header')[0];
	let students = document.getElementsByClassName('student-item');
	// pagination
		const totalStudents = document.querySelectorAll('.student-item').length;
		const pages = totalStudents / 10;
		let paginationDiv = document.createElement('div');
		let paginationUl = document.createElement('ul');
	// search 
		let searched;
		let studentSearchDiv = document.createElement('div');
		let notFound = document.createElement('p');
	
// search elements' structure
	notFound.innerHTML = ':( There are no students by that name in this awesome ninja class';
	notFound.style.display = 'none';
	contentDiv.appendChild(notFound);
	studentSearchDiv.className = 'student-search';
	studentSearchDiv.innerHTML = '<input placeholder="Search for students..."><button>Search</button>';
	contentHeaderDiv.appendChild( studentSearchDiv );

// paginationDiv's structure
	paginationDiv.className = 'pagination';
	paginationDiv.appendChild(paginationUl);
	contentDiv.appendChild(paginationDiv);

// show first page only
	for (let i = 10; i < students.length; i++) {
		students[i].style.display = 'none';
	};

// set pagination
	const setPagination = (numberOfPages) => {
		paginationUl.innerHTML = '';
		for (let i = 1; i < (numberOfPages+1); i++) {
			// createElement
				let li = document.createElement('li');
				li.innerHTML = '<a href="#">'+i+'</a>';
			// activate first pagination link
				if( i === 1 ){
					li.firstElementChild.className = 'active';
				}
			// append li to ul
				paginationUl.appendChild(li);
		};

	}
	setPagination(pages);
// pagination click event
	// function
		const paginate = (e) => {
			// only if <a> children are clicked
			if( e.target.tagName == 'A' ){
				// variables
					let target = e.target;
					let clickedPage = +(target.textContent);
					
					let lowerLimit = ( clickedPage ===1 ) ? ((clickedPage - 1)) : ((clickedPage * 10)-10);
					let upperLimit = (clickedPage*10)-1;

					let query;

				// log limits
					console.log('Students ',lowerLimit,' to ',upperLimit);
				// toggle li a class
					document.querySelector('.pagination ul li a.active').className = '';
					target.className = 'active';
				
				// set query to paginate (between found students or all students)
					if( searched === true ){
						let foundStudents = document.querySelectorAll('.student-item.found');
						query = foundStudents;
					} else { // loop through all students
						query = students;
					}
				// show / hide
					for (let i = 0; i < query.length; i++) {
							if( i >= lowerLimit && i <= upperLimit ){
								query[i].style.display = 'block';
							} else {
								query[i].style.display = 'none';
							}
					}
			}
		}
	// eventListener
		paginationUl.addEventListener('click',paginate);

// search
	// function
		const search = (e) => {
			let target = e.target;
			let searchTerms = target.previousElementSibling.value;
			let found = 0;
			let query;
			// check if input is empty
				if( searchTerms ){ // search
					searched = true;
					for (let i = 0; i < students.length; i++) {
						// show / hide
							if( students[i].querySelector('h3').textContent.indexOf(searchTerms) >= 0 ){
								students[i].style.display = 'block';
								students[i].classList.add('found');
								found ++;
							} else {
								students[i].style.display = 'none';
								students[i].classList.remove('found');
							}
					}
					if( found <= 0 ){ // no results (show notice, hide pagination)
						notFound.style.display = 'block';
						paginationDiv.style.display = 'none';
					} else if( found > 10 ) { // more than 10 results (hide notice, paginate)
						notFound.style.display = 'none';
						paginationDiv.style.display = 'block';
						setPagination( found/10 );
						// show first page only
							for (var i = 0; i < document.querySelectorAll('.found').length; i++) {
								if( i >= 10 ){
									document.querySelectorAll('.found')[i].style.display = 'none';
								}
							};
					} else { // less than 10 (hide notice and pagination)
						notFound.style.display = 'none';
						paginationDiv.style.display = 'none';
					}
					// logged found students
						console.clear();
						console.log('found',found);
				} else { // clear search
					searched = false;
					// show first page only
						for (let i = 0; i < students.length; i++) {
							if( i > 9 ) { 
								students[i].style.display = 'none';
							} else {
								students[i].style.display = 'block';
							}
						// remove class
							students[i].classList.remove('found');	
						};
					// hide notice, show pagination with first <a> active
						notFound.style.display = 'none';
						paginationUl.querySelector('a.active').className = '';
						paginationUl.querySelector('li:nth-child(1) a').className = 'active';
						paginationDiv.style.display = 'block';
					// clear console
						console.clear();
				}
			
		}
	// eventListener
		document.getElementsByTagName('button')[0].addEventListener('click',search);