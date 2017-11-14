import { lib } from './functions';

export default class Carousel {
	constructor(elements, classes) {
		this.classes = classes;
		// carousel wrapper DOM element
		this.carousel = elements.carousel;
		// carousel list DOM element
		this.carouselList = elements.carouselList;
		// slides DOM elements
		this.items = this.carouselList.children;
		// left arrow DOM node
		this.leftArrow = elements.controlLeft;
		// right arrow DOM node
		this.rightArrow = elements.controlRight;
		// pagination links wrapper DOM node
		this.pagination = elements.pagination;
		this.current = 0;

		this.init();
	}

	/**
		Inits carousel
		Adds event listeners on carousel arrows
	*/
	init() {
		this.rightArrow.addEventListener('click', (event) => {
			event.preventDefault();
			if (this.current >= this.items.length - 1) {
            	this.current = 0;
            	this.showSlide(this.current);
        	} else {
        		this.changeSlide(1);
        	}			
		});

		this.leftArrow.addEventListener('click', (event) => {
			event.preventDefault();
			if (this.current <= 0) {
            	this.current = this.items.length - 1;
            	this.showSlide(this.current);
        	} else {
        		this.changeSlide(-1);
        	}
		});

		this.makePagination();
	}

	changeSlide(n) {
		this.current += n;
		this.showSlide(this.current);
	}

	/**
		Handles showing slides by adding and removing active class
	*/
	showSlide(index) {
        let active = this.carouselList.querySelector(`.${this.classes.slideActive}`);
        lib.removeClass(active, this.classes.slideActive);
        lib.addClass(this.items[index], this.classes.slideActive);
        this.setActivePagination(this.pagination.children[index]);      
	}

	/**
		Sets pagination active item
	*/
	setActivePagination(element) {
		let active = this.pagination.querySelector(`.${this.classes.pagLink}.${this.classes.pagLinkActive}`);
		lib.removeClass(active, this.classes.pagLinkActive);
		lib.addClass(element, this.classes.pagLinkActive);
	}

	/**
		Makes carousel pagination items depending on amount of slides
		and adds event listener to pagination items to handle showing needed slide
		on pagination item click
	*/
	makePagination() {
		let mounthNames = [
			'Январь', 
			'Февраль', 
			'Март', 
			'Апрель', 
			'Май', 
			'Июнь', 
			'Июль', 
			'Август', 
			'Сентябрь', 
			'Октябрь', 
			'Ноябрь', 
			'Декабрь'
		];

		let links = '';

		for(let i = 0; i < this.items.length; i++) {
			if(i === 0) {
				links += `<a href="#${i}" class="${this.classes.pagLink} ${this.classes.pagLinkActive}">${mounthNames[i]}</a>`;
				continue;
			}

			links += `<a href="#${i}" class="${this.classes.pagLink}">${mounthNames[i]}</a>`;
		}

		this.pagination.innerHTML = links;
		let children = this.pagination.children;

		lib.addEvents(children, 'click', (event) => {
			event.preventDefault();
			let pagItem = event.target;
			let index = +pagItem.getAttribute('href')[1];
			this.current = index;
			this.showSlide(index);			
		});
	}
}