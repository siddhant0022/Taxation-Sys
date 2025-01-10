/**
* Template Name: Capital Gain
* Updated: Aug 07 2024 
*/

(function() {
	"use strict";

	window.onload = function() {
		var url = window.location.href;
		if (url.endsWith('.html')) {
			history.pushState(null, null, url.slice(0, -5));
		}
	};

	/**
	 * Apply .scrolled class to the body as the page is scrolled down
	 */
	function toggleScrolled() {
		const selectBody = document.querySelector('body');
		const selectHeader = document.querySelector('#header');
		if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
		window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
	}

	document.addEventListener('scroll', toggleScrolled);
	window.addEventListener('load', toggleScrolled);

	/**
	 * Mobile nav toggle
	 */
	const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

	function mobileNavToogle() {
		document.querySelector('body').classList.toggle('mobile-nav-active');
		mobileNavToggleBtn.classList.toggle('bi-list');
		mobileNavToggleBtn.classList.toggle('bi-x');
	}
	mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

	/**
	 * Hide mobile nav on same-page/hash links
	 */
	document.querySelectorAll('#navmenu a').forEach(navmenu => {
		navmenu.addEventListener('click', () => {
			if (document.querySelector('.mobile-nav-active')) {
				mobileNavToogle();
			}
		});

	});

	/**
	 * Toggle mobile nav dropdowns
	 */
	document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
		navmenu.addEventListener('click', function(e) {
			e.preventDefault();
			this.parentNode.classList.toggle('active');
			this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
			e.stopImmediatePropagation();
		});
	});

	/**
	 * Preloader
	 */
	const preloader = document.querySelector('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}

	/**
	 * Scroll top button
	 */
	let scrollTop = document.querySelector('.scroll-top');

	function toggleScrollTop() {
		if (scrollTop) {
			window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
		}
	}
	scrollTop.addEventListener('click', (e) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	window.addEventListener('load', toggleScrollTop);
	document.addEventListener('scroll', toggleScrollTop);

	/**
	 * Animation on scroll function and init
	 */
	function aosInit() {
		AOS.init({
			duration: 600,
			easing: 'ease-in-out',
			once: true,
			mirror: false
		});
	}
	window.addEventListener('load', aosInit);

	/**
	 * Initiate glightbox
	 */
	const glightbox = GLightbox({
		selector: '.glightbox'
	});

	/**
	 * Init isotope layout and filters
	 */
	document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
		let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
		let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
		let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

		let initIsotope;
		imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
			initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
				itemSelector: '.isotope-item',
				layoutMode: layout,
				filter: filter,
				sortBy: sort
			});
		});

		isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
			filters.addEventListener('click', function() {
				isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
				this.classList.add('filter-active');
				initIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
				if (typeof aosInit === 'function') {
					aosInit();
				}
			}, false);
		});

	});

	/**
	 * Frequently Asked Questions Toggle
	 */
	document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
		faqItem.addEventListener('click', () => {
			faqItem.parentNode.classList.toggle('faq-active');
		});
	});

	/**
	 * Init swiper sliders
	 */
	function initSwiper() {
		document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
			let config = JSON.parse(
				swiperElement.querySelector(".swiper-config").innerHTML.trim()
			);

			if (swiperElement.classList.contains("swiper-tab")) {
				initSwiperWithCustomPagination(swiperElement, config);
			} else {
				new Swiper(swiperElement, config);
			}
		});
	}

	window.addEventListener("load", initSwiper);

	/**
	 * Correct scrolling position upon page load for URLs containing hash links.
	 */
	window.addEventListener('load', function(e) {
		if (window.location.hash) {
			if (document.querySelector(window.location.hash)) {
				setTimeout(() => {
					let section = document.querySelector(window.location.hash);
					let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
					window.scrollTo({
						top: section.offsetTop - parseInt(scrollMarginTop),
						behavior: 'smooth'
					});
				}, 100);
			}
		}
	});

	/**
	 * Navmenu Scrollspy
	 */
	let navmenulinks = document.querySelectorAll('.navmenu a');

	function navmenuScrollspy() {
		navmenulinks.forEach(navmenulink => {
			if (!navmenulink.hash) return;
			let section = document.querySelector(navmenulink.hash);
			if (!section) return;
			let position = window.scrollY + 200;
			if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
				document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
				navmenulink.classList.add('active');
			} else {
				navmenulink.classList.remove('active');
			}
		})
	}
	window.addEventListener('load', navmenuScrollspy);
	document.addEventListener('scroll', navmenuScrollspy);


	/**Modify js code------------------------------------------------------------------------------------- */

	const scriptURL = 'https://script.google.com/macros/s/AKfycbzP2ggi0lAS07IAPmAjFmEaN8SSU2iRee3KW1B-weIAUO1d0GYMTNULTUZOe8N9p-5U8A/exec';
	const form = document.forms['google-sheet'];

	const successAlert = document.getElementById('success-alert');
	const errorAlert = document.getElementById('error-alert');
	const loader = document.getElementById('loading-spinner');

	form.addEventListener('submit', e => {
		e.preventDefault()

		successAlert.style.display = 'none';
		errorAlert.style.display = 'none';

		// Show loading spinner
		loader.style.display = 'block';

		fetch(scriptURL, { method: 'POST', body: new FormData(form) })
			.then(response => {
				// Hide the loading spinner after submission
				loader.style.display = 'none';

				if (response.ok) {

					// Show success alert
					successAlert.style.display = 'block';
					errorAlert.style.display = 'none';

					// Reset the form after submission
					form.reset();

					// Hide the success alert after 3 seconds
					setTimeout(() => {
						successAlert.style.display = 'none';
					}, 3000);


				} else {
					// If the response is not OK, show error alert
					errorAlert.style.display = 'block';
					successAlert.style.display = 'none';

					// Hide the error alert after 3 seconds
					setTimeout(() => {
						errorAlert.style.display = 'none';
					}, 3000);
				}
			})
			.catch(error => {

				// Hide the loading spinner in case of error
				loader.style.display = 'none';


				// Show error alert
				errorAlert.style.display = 'block';
				successAlert.style.display = 'none';

				// Reset the form after submission
				form.reset();

				// Hide the error alert after 3 seconds
				setTimeout(() => {
					errorAlert.style.display = 'none';
				}, 3000);
			});
	})



})();












