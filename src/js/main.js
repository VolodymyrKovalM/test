import Carousel from './lib/carousel';
import './lib/datepicker.js';

document.addEventListener('DOMContentLoaded', () => {

	const carouselWr = document.getElementById('carousel');

	const carousel = new Carousel({
		carousel: carouselWr,
		carouselList: carouselWr.querySelector('.carousel-list'),
		controlLeft: carouselWr.querySelector('.carousel-control-prev'),
		controlRight: carouselWr.querySelector('.carousel-control-next'),
		pagination: carouselWr.querySelector('.carouser-pagination')
	}, {
		slideActive: 'active',
		pagLink: 'c-pag-link',
		pagLinkActive: 'active'			
	});

	let dateInputs = document.querySelectorAll('[data-datepicker]');

	for(let i = 0; i < dateInputs.length; i++) {
		dateInputs[i].DatePickerX.init({
    		mondayFirst: true
		});
	}
});