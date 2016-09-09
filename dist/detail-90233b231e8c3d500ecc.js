/*! This file is created by realeve */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var __SRC_DIR = "./src";
	__webpack_require__(39)(__SRC_DIR+"/css/bootstrap.min.css");
	__webpack_require__(44)(__SRC_DIR+"/css/reveal.css");
	__webpack_require__(40)(__SRC_DIR+"/css/custom.css");
	__webpack_require__(48)(__SRC_DIR+"/plugin/highlight/atom-one-dark.min.css");
	__webpack_require__(41)(__SRC_DIR+"/css/font-awesome.min.css");
	__webpack_require__(45)(__SRC_DIR+"/detail.js");

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * reveal.js
	 * http://lab.hakim.se/reveal-js
	 * MIT licensed
	 *
	 * Copyright (C) 2016 Hakim El Hattab, http://hakim.se
	 */
	(function(root, factory) {
		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				root.Reveal = factory();
				return root.Reveal;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// Node. Does not work with strict CommonJS.
			module.exports = factory();
		} else {
			// Browser globals.
			root.Reveal = factory();
		}
	}(this, function() {

		'use strict';

		var Reveal;

		// The reveal.js version
		var VERSION = '3.3.0';

		var SLIDES_SELECTOR = '.slides section',
			HORIZONTAL_SLIDES_SELECTOR = '.slides>section',
			VERTICAL_SLIDES_SELECTOR = '.slides>section.present>section',
			HOME_SLIDE_SELECTOR = '.slides>section:first-of-type',
			UA = navigator.userAgent,

			// Configuration defaults, can be overridden at initialization time
			config = {

				// The "normal" size of the presentation, aspect ratio will be preserved
				// when the presentation is scaled to fit different resolutions
				width: 960,
				height: 700,

				// Factor of the display size that should remain empty around the content
				margin: 0.1,

				// Bounds for smallest/largest possible scale to apply to content
				minScale: 0.2,
				maxScale: 1.5,

				// Display controls in the bottom right corner
				controls: true,

				// Display a presentation progress bar
				progress: true,

				// Display the page number of the current slide
				slideNumber: false,

				// Push each slide change to the browser history
				history: false,

				// Enable keyboard shortcuts for navigation
				keyboard: true,

				// Optional function that blocks keyboard events when retuning false
				keyboardCondition: null,

				// Enable the slide overview mode
				overview: true,

				// Vertical centering of slides
				center: true,

				// Enables touch navigation on devices with touch input
				touch: true,

				// Loop the presentation
				loop: false,

				// Change the presentation direction to be RTL
				rtl: false,

				// Randomizes the order of slides each time the presentation loads
				shuffle: false,

				// Turns fragments on and off globally
				fragments: true,

				// Flags if the presentation is running in an embedded mode,
				// i.e. contained within a limited portion of the screen
				embedded: false,

				// Flags if we should show a help overlay when the questionmark
				// key is pressed
				help: true,

				// Flags if it should be possible to pause the presentation (blackout)
				pause: true,

				// Flags if speaker notes should be visible to all viewers
				showNotes: false,

				// Number of milliseconds between automatically proceeding to the
				// next slide, disabled when set to 0, this value can be overwritten
				// by using a data-autoslide attribute on your slides
				autoSlide: 0,

				// Stop auto-sliding after user input
				autoSlideStoppable: true,

				// Use this method for navigation when auto-sliding (defaults to navigateNext)
				autoSlideMethod: null,

				// Enable slide navigation via mouse wheel
				mouseWheel: false,

				// Apply a 3D roll to links on hover
				rollingLinks: false,

				// Hides the address bar on mobile devices
				hideAddressBar: true,

				// Opens links in an iframe preview overlay
				previewLinks: false,

				// Exposes the reveal.js API through window.postMessage
				postMessage: true,

				// Dispatches all reveal.js events to the parent window through postMessage
				postMessageEvents: false,

				// Focuses body when page changes visiblity to ensure keyboard shortcuts work
				focusBodyOnPageVisibilityChange: true,

				// Transition style
				transition: 'slide', // none/fade/slide/convex/concave/zoom

				// Transition speed
				transitionSpeed: 'default', // default/fast/slow

				// Transition style for full page slide backgrounds
				backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom

				// Parallax background image
				parallaxBackgroundImage: '', // CSS syntax, e.g. "a.jpg"

				// Parallax background size
				parallaxBackgroundSize: '', // CSS syntax, e.g. "3000px 2000px"

				// Amount of pixels to move the parallax background per slide step
				parallaxBackgroundHorizontal: null,
				parallaxBackgroundVertical: null,

				// Number of slides away from the current that are visible
				viewDistance: 3,

				// Script dependencies to load
				dependencies: []

			},

			// Flags if reveal.js is loaded (has dispatched the 'ready' event)
			loaded = false,

			// Flags if the overview mode is currently active
			overview = false,

			// Holds the dimensions of our overview slides, including margins
			overviewSlideWidth = null,
			overviewSlideHeight = null,

			overviewRatio = 2, //放大系数

			// The horizontal and vertical index of the currently active slide
			indexh,
			indexv,

			// The previous and current slide HTML elements
			previousSlide,
			currentSlide,

			previousBackground,

			// Slides may hold a data-state attribute which we pick up and apply
			// as a class to the body. This list contains the combined state of
			// all current slides.
			state = [],

			// The current scale of the presentation (see width/height config)
			scale = 1,

			// CSS transform that is currently applied to the slides container,
			// split into two groups
			slidesTransform = {
				layout: '',
				overview: ''
			},

			// Cached references to DOM elements
			dom = {},

			// Features supported by the browser, see #checkCapabilities()
			features = {},

			// Client is a mobile device, see #checkCapabilities()
			isMobileDevice,

			// Client is a desktop Chrome, see #checkCapabilities()
			isChrome,

			// Throttles mouse wheel navigation
			lastMouseWheelStep = 0,

			// Delays updates to the URL due to a Chrome thumbnailer bug
			writeURLTimeout = 0,

			// Flags if the interaction event listeners are bound
			eventsAreBound = false,

			// The current auto-slide duration
			autoSlide = 0,

			// Auto slide properties
			autoSlidePlayer,
			autoSlideTimeout = 0,
			autoSlideStartTime = -1,
			autoSlidePaused = false,

			// Holds information about the currently ongoing touch input
			touch = {
				startX: 0,
				startY: 0,
				startSpan: 0,
				startCount: 0,
				captured: false,
				threshold: 40
			},

			// Holds information about the keyboard shortcuts
			keyboardShortcuts = {
				'N  ,  SPACE': 'Next slide',
				'P': 'Previous slide',
				'&#8592;  ,  H': 'Navigate left',
				'&#8594;  ,  L': 'Navigate right',
				'&#8593;  ,  K': 'Navigate up',
				'&#8595;  ,  J': 'Navigate down',
				'Home': 'First slide',
				'End': 'Last slide',
				'B  ,  .': 'Pause',
				'F': 'Fullscreen',
				'ESC, O': 'Slide overview'
			};

		/**
		 * Starts up the presentation if the client is capable.
		 */
		function initialize(options) {

			checkCapabilities();

			if (!features.transforms2d && !features.transforms3d) {
				document.body.setAttribute('class', 'no-transforms');

				// Since JS won't be running any further, we load all lazy
				// loading elements upfront
				var images = toArray(document.getElementsByTagName('img')),
					iframes = toArray(document.getElementsByTagName('iframe'));

				var lazyLoadable = images.concat(iframes);

				for (var i = 0, len = lazyLoadable.length; i < len; i++) {
					var element = lazyLoadable[i];
					if (element.getAttribute('data-src')) {
						element.setAttribute('src', element.getAttribute('data-src'));
						element.removeAttribute('data-src');
					}
				}

				// If the browser doesn't support core features we won't be
				// using JavaScript to control the presentation
				return;
			}

			// Cache references to key DOM elements
			dom.wrapper = document.querySelector('.reveal');
			dom.slides = document.querySelector('.reveal .slides');

			// Force a layout when the whole page, incl fonts, has loaded
			window.addEventListener('load', layout, false);

			var query = Reveal.getQueryHash();

			// Do not accept new dependencies via query config to avoid
			// the potential of malicious script injection
			if (typeof query['dependencies'] !== 'undefined') delete query['dependencies'];

			// Copy options over to our config object
			extend(config, options);
			extend(config, query);

			// Hide the address bar in mobile browsers
			hideAddressBar();

			// Loads the dependencies and continues to #start() once done
			load();

		}

		/**
		 * Inspect the client to see what it's capable of, this
		 * should only happens once per runtime.
		 */
		function checkCapabilities() {

			isMobileDevice = /(iphone|ipod|ipad|android)/gi.test(UA);
			isChrome = /chrome/i.test(UA) && !/edge/i.test(UA);

			var testElement = document.createElement('div');

			features.transforms3d = 'WebkitPerspective' in testElement.style ||
				'MozPerspective' in testElement.style ||
				'msPerspective' in testElement.style ||
				'OPerspective' in testElement.style ||
				'perspective' in testElement.style;

			features.transforms2d = 'WebkitTransform' in testElement.style ||
				'MozTransform' in testElement.style ||
				'msTransform' in testElement.style ||
				'OTransform' in testElement.style ||
				'transform' in testElement.style;

			features.requestAnimationFrameMethod = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
			features.requestAnimationFrame = typeof features.requestAnimationFrameMethod === 'function';

			features.canvas = !!document.createElement('canvas').getContext;

			// Transitions in the overview are disabled in desktop and
			// Safari due to lag
			features.overviewTransitions = !/Version\/[\d\.]+.*Safari/.test(UA);

			// Flags if we should use zoom instead of transform to scale
			// up slides. Zoom produces crisper results but has a lot of
			// xbrowser quirks so we only use it in whitelsited browsers.
			features.zoom = 'zoom' in testElement.style && !isMobileDevice &&
				(isChrome || /Version\/[\d\.]+.*Safari/.test(UA));

		}

		/**
		 * Loads the dependencies of reveal.js. Dependencies are
		 * defined via the configuration option 'dependencies'
		 * and will be loaded prior to starting/binding reveal.js.
		 * Some dependencies may have an 'async' flag, if so they
		 * will load after reveal.js has been started up.
		 */
		function load() {

			var scripts = [],
				scriptsAsync = [],
				scriptsToPreload = 0;

			// Called once synchronous scripts finish loading
			function proceed() {
				if (scriptsAsync.length) {
					// Load asynchronous scripts
					head.js.apply(null, scriptsAsync);
				}

				start();
			}

			function loadScript(s) {
				head.ready(s.src.match(/([\w\d_\-]*)\.?js$|[^\\\/]*$/i)[0], function() {
					// Extension may contain callback functions
					if (typeof s.callback === 'function') {
						s.callback.apply(this);
					}

					if (--scriptsToPreload === 0) {
						proceed();
					}
				});
			}

			for (var i = 0, len = config.dependencies.length; i < len; i++) {
				var s = config.dependencies[i];

				// Load if there's no condition or the condition is truthy
				if (!s.condition || s.condition()) {
					if (s.async) {
						scriptsAsync.push(s.src);
					} else {
						scripts.push(s.src);
					}

					loadScript(s);
				}
			}

			if (scripts.length) {
				scriptsToPreload = scripts.length;

				// Load synchronous scripts
				head.js.apply(null, scripts);
			} else {
				proceed();
			}

		}

		/**
		 * Starts up reveal.js by binding input events and navigating
		 * to the current URL deeplink if there is one.
		 */
		function start() {

			// Make sure we've got all the DOM elements we need
			setupDOM();

			// Listen to messages posted to this window
			setupPostMessage();

			// Prevent the slides from being scrolled out of view
			setupScrollPrevention();

			// Resets all vertical slides so that only the first is visible
			resetVerticalSlides();

			// Updates the presentation to match the current configuration values
			configure();

			// Read the initial hash
			readURL();

			// Update all backgrounds
			updateBackground(true);

			// Notify listeners that the presentation is ready but use a 1ms
			// timeout to ensure it's not fired synchronously after #initialize()
			setTimeout(function() {
				// Enable transitions now that we're loaded
				dom.slides.classList.remove('no-transition');

				loaded = true;

				dispatchEvent('ready', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				});
			}, 1);

			// Special setup and config is required when printing to PDF
			if (isPrintingPDF()) {
				removeEventListeners();

				// The document needs to have loaded for the PDF layout
				// measurements to be accurate
				if (document.readyState === 'complete') {
					setupPDF();
				} else {
					window.addEventListener('load', setupPDF);
				}
			}

		}

		/**
		 * Finds and stores references to DOM elements which are
		 * required by the presentation. If a required element is
		 * not found, it is created.
		 */
		function setupDOM() {

			// Prevent transitions while we're loading
			dom.slides.classList.add('no-transition');

			// Background element
			dom.background = createSingletonNode(dom.wrapper, 'div', 'backgrounds', null);

			// Progress bar
			dom.progress = createSingletonNode(dom.wrapper, 'div', 'progress', '<span></span>');
			dom.progressbar = dom.progress.querySelector('span');

			// Arrow controls
			createSingletonNode(dom.wrapper, 'aside', 'controls',
				'<button class="navigate-left" aria-label="previous slide"></button>' +
				'<button class="navigate-right" aria-label="next slide"></button>' +
				'<button class="navigate-up" aria-label="above slide"></button>' +
				'<button class="navigate-down" aria-label="below slide"></button>');

			// Slide number
			dom.slideNumber = createSingletonNode(dom.wrapper, 'div', 'slide-number', '');

			// Element containing notes that are visible to the audience
			dom.speakerNotes = createSingletonNode(dom.wrapper, 'div', 'speaker-notes', null);
			dom.speakerNotes.setAttribute('data-prevent-swipe', '');

			// Overlay graphic which is displayed during the paused mode
			createSingletonNode(dom.wrapper, 'div', 'pause-overlay', null);

			// Cache references to elements
			dom.controls = document.querySelector('.reveal .controls');
			dom.theme = document.querySelector('#theme');

			dom.wrapper.setAttribute('role', 'application');

			// There can be multiple instances of controls throughout the page
			dom.controlsLeft = toArray(document.querySelectorAll('.navigate-left'));
			dom.controlsRight = toArray(document.querySelectorAll('.navigate-right'));
			dom.controlsUp = toArray(document.querySelectorAll('.navigate-up'));
			dom.controlsDown = toArray(document.querySelectorAll('.navigate-down'));
			dom.controlsPrev = toArray(document.querySelectorAll('.navigate-prev'));
			dom.controlsNext = toArray(document.querySelectorAll('.navigate-next'));

			dom.statusDiv = createStatusDiv();
		}

		/**
		 * Creates a hidden div with role aria-live to announce the
		 * current slide content. Hide the div off-screen to make it
		 * available only to Assistive Technologies.
		 */
		function createStatusDiv() {

			var statusDiv = document.getElementById('aria-status-div');
			if (!statusDiv) {
				statusDiv = document.createElement('div');
				statusDiv.style.position = 'absolute';
				statusDiv.style.height = '1px';
				statusDiv.style.width = '1px';
				statusDiv.style.overflow = 'hidden';
				statusDiv.style.clip = 'rect( 1px, 1px, 1px, 1px )';
				statusDiv.setAttribute('id', 'aria-status-div');
				statusDiv.setAttribute('aria-live', 'polite');
				statusDiv.setAttribute('aria-atomic', 'true');
				dom.wrapper.appendChild(statusDiv);
			}
			return statusDiv;

		}

		/**
		 * Configures the presentation for printing to a static
		 * PDF.
		 */
		function setupPDF() {

			var slideSize = getComputedSlideSize(window.innerWidth, window.innerHeight);

			// Dimensions of the PDF pages
			var pageWidth = Math.floor(slideSize.width * (1 + config.margin)),
				pageHeight = Math.floor(slideSize.height * (1 + config.margin));

			// Dimensions of slides within the pages
			var slideWidth = slideSize.width,
				slideHeight = slideSize.height;

			// Let the browser know what page size we want to print
			injectStyleSheet('@page{size:' + pageWidth + 'px ' + pageHeight + 'px; margin: 0;}');

			// Limit the size of certain elements to the dimensions of the slide
			injectStyleSheet('.reveal section>img, .reveal section>video, .reveal section>iframe{max-width: ' + slideWidth + 'px; max-height:' + slideHeight + 'px}');

			document.body.classList.add('print-pdf');
			document.body.style.width = pageWidth + 'px';
			document.body.style.height = pageHeight + 'px';

			// Add each slide's index as attributes on itself, we need these
			// indices to generate slide numbers below
			toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).forEach(function(hslide, h) {
				hslide.setAttribute('data-index-h', h);

				if (hslide.classList.contains('stack')) {
					toArray(hslide.querySelectorAll('section')).forEach(function(vslide, v) {
						vslide.setAttribute('data-index-h', h);
						vslide.setAttribute('data-index-v', v);
					});
				}
			});

			// Slide and slide background layout
			toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR)).forEach(function(slide) {

				// Vertical stacks are not centred since their section
				// children will be
				if (slide.classList.contains('stack') === false) {
					// Center the slide inside of the page, giving the slide some margin
					var left = (pageWidth - slideWidth) / 2,
						top = (pageHeight - slideHeight) / 2;

					var contentHeight = getAbsoluteHeight(slide);
					var numberOfPages = Math.max(Math.ceil(contentHeight / pageHeight), 1);

					// Center slides vertically
					if (numberOfPages === 1 && config.center || slide.classList.contains('center')) {
						top = Math.max((pageHeight - contentHeight) / 2, 0);
					}

					// Position the slide inside of the page
					slide.style.left = left + 'px';
					slide.style.top = top + 'px';
					slide.style.width = slideWidth + 'px';

					// TODO Backgrounds need to be multiplied when the slide
					// stretches over multiple pages
					var background = slide.querySelector('.slide-background');
					if (background) {
						background.style.width = pageWidth + 'px';
						background.style.height = (pageHeight * numberOfPages) + 'px';
						background.style.top = -top + 'px';
						background.style.left = -left + 'px';
					}

					// Inject notes if `showNotes` is enabled
					if (config.showNotes) {
						var notes = getSlideNotes(slide);
						if (notes) {
							var notesSpacing = 8;
							var notesElement = document.createElement('div');
							notesElement.classList.add('speaker-notes');
							notesElement.classList.add('speaker-notes-pdf');
							notesElement.innerHTML = notes;
							notesElement.style.left = (notesSpacing - left) + 'px';
							notesElement.style.bottom = (notesSpacing - top) + 'px';
							notesElement.style.width = (pageWidth - notesSpacing * 2) + 'px';
							slide.appendChild(notesElement);
						}
					}

					// Inject slide numbers if `slideNumbers` are enabled
					if (config.slideNumber) {
						var slideNumberH = parseInt(slide.getAttribute('data-index-h'), 10) + 1,
							slideNumberV = parseInt(slide.getAttribute('data-index-v'), 10) + 1;

						var numberElement = document.createElement('div');
						numberElement.classList.add('slide-number');
						numberElement.classList.add('slide-number-pdf');
						numberElement.innerHTML = formatSlideNumber(slideNumberH, '.', slideNumberV);
						background.appendChild(numberElement);
					}
				}

			});

			// Show all fragments
			toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ' .fragment')).forEach(function(fragment) {
				fragment.classList.add('visible');
			});

		}

		/**
		 * This is an unfortunate necessity. Some actions – such as
		 * an input field being focused in an iframe or using the
		 * keyboard to expand text selection beyond the bounds of
		 * a slide – can trigger our content to be pushed out of view.
		 * This scrolling can not be prevented by hiding overflow in
		 * CSS (we already do) so we have to resort to repeatedly
		 * checking if the slides have been offset :(
		 */
		function setupScrollPrevention() {

			setInterval(function() {
				if (dom.wrapper.scrollTop !== 0 || dom.wrapper.scrollLeft !== 0) {
					dom.wrapper.scrollTop = 0;
					dom.wrapper.scrollLeft = 0;
				}
			}, 1000);

		}

		/**
		 * Creates an HTML element and returns a reference to it.
		 * If the element already exists the existing instance will
		 * be returned.
		 */
		function createSingletonNode(container, tagname, classname, innerHTML) {

			// Find all nodes matching the description
			var nodes = container.querySelectorAll('.' + classname);

			// Check all matches to find one which is a direct child of
			// the specified container
			for (var i = 0; i < nodes.length; i++) {
				var testNode = nodes[i];
				if (testNode.parentNode === container) {
					return testNode;
				}
			}

			// If no node was found, create it now
			var node = document.createElement(tagname);
			node.classList.add(classname);
			if (typeof innerHTML === 'string') {
				node.innerHTML = innerHTML;
			}
			container.appendChild(node);

			return node;

		}

		/**
		 * Creates the slide background elements and appends them
		 * to the background container. One element is created per
		 * slide no matter if the given slide has visible background.
		 */
		function createBackgrounds() {

			var printMode = isPrintingPDF();

			// Clear prior backgrounds
			dom.background.innerHTML = '';
			dom.background.classList.add('no-transition');

			// Iterate over all horizontal slides
			toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).forEach(function(slideh) {

				var backgroundStack;

				if (printMode) {
					backgroundStack = createBackground(slideh, slideh);
				} else {
					backgroundStack = createBackground(slideh, dom.background);
				}

				// Iterate over all vertical slides
				toArray(slideh.querySelectorAll('section')).forEach(function(slidev) {

					if (printMode) {
						createBackground(slidev, slidev);
					} else {
						createBackground(slidev, backgroundStack);
					}

					backgroundStack.classList.add('stack');

				});

			});

			// Add parallax background if specified
			if (config.parallaxBackgroundImage) {

				dom.background.style.backgroundImage = 'url("' + config.parallaxBackgroundImage + '")';
				dom.background.style.backgroundSize = config.parallaxBackgroundSize;

				// Make sure the below properties are set on the element - these properties are
				// needed for proper transitions to be set on the element via CSS. To remove
				// annoying background slide-in effect when the presentation starts, apply
				// these properties after short time delay
				setTimeout(function() {
					dom.wrapper.classList.add('has-parallax-background');
				}, 1);

			} else {

				dom.background.style.backgroundImage = '';
				dom.wrapper.classList.remove('has-parallax-background');

			}

		}

		/**
		 * Creates a background for the given slide.
		 *
		 * @param {HTMLElement} slide
		 * @param {HTMLElement} container The element that the background
		 * should be appended to
		 */
		function createBackground(slide, container) {

			var data = {
				background: slide.getAttribute('data-background'),
				backgroundSize: slide.getAttribute('data-background-size'),
				backgroundImage: slide.getAttribute('data-background-image'),
				backgroundVideo: slide.getAttribute('data-background-video'),
				backgroundIframe: slide.getAttribute('data-background-iframe'),
				backgroundColor: slide.getAttribute('data-background-color'),
				backgroundRepeat: slide.getAttribute('data-background-repeat'),
				backgroundPosition: slide.getAttribute('data-background-position'),
				backgroundTransition: slide.getAttribute('data-background-transition')
			};

			var element = document.createElement('div');

			// Carry over custom classes from the slide to the background
			element.className = 'slide-background ' + slide.className.replace(/present|past|future/, '');

			if (data.background) {
				// Auto-wrap image urls in url(...)
				if (/^(http|file|\/\/)/gi.test(data.background) || /\.(svg|png|jpg|jpeg|gif|bmp)$/gi.test(data.background)) {
					slide.setAttribute('data-background-image', data.background);
				} else {
					element.style.background = data.background;
				}
			}

			// Create a hash for this combination of background settings.
			// This is used to determine when two slide backgrounds are
			// the same.
			if (data.background || data.backgroundColor || data.backgroundImage || data.backgroundVideo || data.backgroundIframe) {
				element.setAttribute('data-background-hash', data.background +
					data.backgroundSize +
					data.backgroundImage +
					data.backgroundVideo +
					data.backgroundIframe +
					data.backgroundColor +
					data.backgroundRepeat +
					data.backgroundPosition +
					data.backgroundTransition);
			}

			// Additional and optional background properties
			if (data.backgroundSize) element.style.backgroundSize = data.backgroundSize;
			if (data.backgroundColor) element.style.backgroundColor = data.backgroundColor;
			if (data.backgroundRepeat) element.style.backgroundRepeat = data.backgroundRepeat;
			if (data.backgroundPosition) element.style.backgroundPosition = data.backgroundPosition;
			if (data.backgroundTransition) element.setAttribute('data-background-transition', data.backgroundTransition);

			container.appendChild(element);

			// If backgrounds are being recreated, clear old classes
			slide.classList.remove('has-dark-background');
			slide.classList.remove('has-light-background');

			// If this slide has a background color, add a class that
			// signals if it is light or dark. If the slide has no background
			// color, no class will be set
			var computedBackgroundColor = window.getComputedStyle(element).backgroundColor;
			if (computedBackgroundColor) {
				var rgb = colorToRgb(computedBackgroundColor);

				// Ignore fully transparent backgrounds. Some browsers return
				// rgba(0,0,0,0) when reading the computed background color of
				// an element with no background
				if (rgb && rgb.a !== 0) {
					if (colorBrightness(computedBackgroundColor) < 128) {
						slide.classList.add('has-dark-background');
					} else {
						slide.classList.add('has-light-background');
					}
				}
			}

			return element;

		}

		/**
		 * Registers a listener to postMessage events, this makes it
		 * possible to call all reveal.js API methods from another
		 * window. For example:
		 *
		 * revealWindow.postMessage( JSON.stringify({
		 *   method: 'slide',
		 *   args: [ 2 ]
		 * }), '*' );
		 */
		function setupPostMessage() {

			if (config.postMessage) {
				window.addEventListener('message', function(event) {
					var data = event.data;

					// Make sure we're dealing with JSON
					if (typeof data === 'string' && data.charAt(0) === '{' && data.charAt(data.length - 1) === '}') {
						data = JSON.parse(data);

						// Check if the requested method can be found
						if (data.method && typeof Reveal[data.method] === 'function') {
							Reveal[data.method].apply(Reveal, data.args);
						}
					}
				}, false);
			}

		}

		/**
		 * Applies the configuration settings from the config
		 * object. May be called multiple times.
		 */
		function configure(options) {

			var numberOfSlides = dom.wrapper.querySelectorAll(SLIDES_SELECTOR).length;

			dom.wrapper.classList.remove(config.transition);

			// New config options may be passed when this method
			// is invoked through the API after initialization
			if (typeof options === 'object') extend(config, options);

			// Force linear transition based on browser capabilities
			if (features.transforms3d === false) config.transition = 'linear';

			dom.wrapper.classList.add(config.transition);

			dom.wrapper.setAttribute('data-transition-speed', config.transitionSpeed);
			dom.wrapper.setAttribute('data-background-transition', config.backgroundTransition);

			dom.controls.style.display = config.controls ? 'block' : 'none';
			dom.progress.style.display = config.progress ? 'block' : 'none';
			dom.slideNumber.style.display = config.slideNumber && !isPrintingPDF() ? 'block' : 'none';

			if (config.shuffle) {
				shuffle();
			}

			if (config.rtl) {
				dom.wrapper.classList.add('rtl');
			} else {
				dom.wrapper.classList.remove('rtl');
			}

			if (config.center) {
				dom.wrapper.classList.add('center');
			} else {
				dom.wrapper.classList.remove('center');
			}

			// Exit the paused mode if it was configured off
			if (config.pause === false) {
				resume();
			}

			if (config.showNotes) {
				dom.speakerNotes.classList.add('visible');
			} else {
				dom.speakerNotes.classList.remove('visible');
			}

			if (config.mouseWheel) {
				document.addEventListener('DOMMouseScroll', onDocumentMouseScroll, false); // FF
				document.addEventListener('mousewheel', onDocumentMouseScroll, false);
			} else {
				document.removeEventListener('DOMMouseScroll', onDocumentMouseScroll, false); // FF
				document.removeEventListener('mousewheel', onDocumentMouseScroll, false);
			}

			// Rolling 3D links
			if (config.rollingLinks) {
				enableRollingLinks();
			} else {
				disableRollingLinks();
			}

			// Iframe link previews
			if (config.previewLinks) {
				enablePreviewLinks();
			} else {
				disablePreviewLinks();
				enablePreviewLinks('[data-preview-link]');
			}

			// Remove existing auto-slide controls
			if (autoSlidePlayer) {
				autoSlidePlayer.destroy();
				autoSlidePlayer = null;
			}

			// Generate auto-slide controls if needed
			if (numberOfSlides > 1 && config.autoSlide && config.autoSlideStoppable && features.canvas && features.requestAnimationFrame) {
				autoSlidePlayer = new Playback(dom.wrapper, function() {
					return Math.min(Math.max((Date.now() - autoSlideStartTime) / autoSlide, 0), 1);
				});

				autoSlidePlayer.on('click', onAutoSlidePlayerClick);
				autoSlidePaused = false;
			}

			// When fragments are turned off they should be visible
			if (config.fragments === false) {
				toArray(dom.slides.querySelectorAll('.fragment')).forEach(function(element) {
					element.classList.add('visible');
					element.classList.remove('current-fragment');
				});
			}

			sync();

		}

		/**
		 * Binds all event listeners.
		 */
		function addEventListeners() {

			eventsAreBound = true;

			window.addEventListener('hashchange', onWindowHashChange, false);
			window.addEventListener('resize', onWindowResize, false);

			if (config.touch) {
				dom.wrapper.addEventListener('touchstart', onTouchStart, false);
				dom.wrapper.addEventListener('touchmove', onTouchMove, false);
				dom.wrapper.addEventListener('touchend', onTouchEnd, false);

				// Support pointer-style touch interaction as well
				if (window.navigator.pointerEnabled) {
					// IE 11 uses un-prefixed version of pointer events
					dom.wrapper.addEventListener('pointerdown', onPointerDown, false);
					dom.wrapper.addEventListener('pointermove', onPointerMove, false);
					dom.wrapper.addEventListener('pointerup', onPointerUp, false);
				} else if (window.navigator.msPointerEnabled) {
					// IE 10 uses prefixed version of pointer events
					dom.wrapper.addEventListener('MSPointerDown', onPointerDown, false);
					dom.wrapper.addEventListener('MSPointerMove', onPointerMove, false);
					dom.wrapper.addEventListener('MSPointerUp', onPointerUp, false);
				}
			}

			if (config.keyboard) {
				document.addEventListener('keydown', onDocumentKeyDown, false);
				document.addEventListener('keypress', onDocumentKeyPress, false);
			}

			if (config.progress && dom.progress) {
				dom.progress.addEventListener('click', onProgressClicked, false);
			}

			if (config.focusBodyOnPageVisibilityChange) {
				var visibilityChange;

				if ('hidden' in document) {
					visibilityChange = 'visibilitychange';
				} else if ('msHidden' in document) {
					visibilityChange = 'msvisibilitychange';
				} else if ('webkitHidden' in document) {
					visibilityChange = 'webkitvisibilitychange';
				}

				if (visibilityChange) {
					document.addEventListener(visibilityChange, onPageVisibilityChange, false);
				}
			}

			// Listen to both touch and click events, in case the device
			// supports both
			var pointerEvents = ['touchstart', 'click'];

			// Only support touch for Android, fixes double navigations in
			// stock browser
			if (UA.match(/android/gi)) {
				pointerEvents = ['touchstart'];
			}

			pointerEvents.forEach(function(eventName) {
				dom.controlsLeft.forEach(function(el) {
					el.addEventListener(eventName, onNavigateLeftClicked, false);
				});
				dom.controlsRight.forEach(function(el) {
					el.addEventListener(eventName, onNavigateRightClicked, false);
				});
				dom.controlsUp.forEach(function(el) {
					el.addEventListener(eventName, onNavigateUpClicked, false);
				});
				dom.controlsDown.forEach(function(el) {
					el.addEventListener(eventName, onNavigateDownClicked, false);
				});
				dom.controlsPrev.forEach(function(el) {
					el.addEventListener(eventName, onNavigatePrevClicked, false);
				});
				dom.controlsNext.forEach(function(el) {
					el.addEventListener(eventName, onNavigateNextClicked, false);
				});
			});

		}

		/**
		 * Unbinds all event listeners.
		 */
		function removeEventListeners() {

			eventsAreBound = false;

			document.removeEventListener('keydown', onDocumentKeyDown, false);
			document.removeEventListener('keypress', onDocumentKeyPress, false);
			window.removeEventListener('hashchange', onWindowHashChange, false);
			window.removeEventListener('resize', onWindowResize, false);

			dom.wrapper.removeEventListener('touchstart', onTouchStart, false);
			dom.wrapper.removeEventListener('touchmove', onTouchMove, false);
			dom.wrapper.removeEventListener('touchend', onTouchEnd, false);

			// IE11
			if (window.navigator.pointerEnabled) {
				dom.wrapper.removeEventListener('pointerdown', onPointerDown, false);
				dom.wrapper.removeEventListener('pointermove', onPointerMove, false);
				dom.wrapper.removeEventListener('pointerup', onPointerUp, false);
			}
			// IE10
			else if (window.navigator.msPointerEnabled) {
				dom.wrapper.removeEventListener('MSPointerDown', onPointerDown, false);
				dom.wrapper.removeEventListener('MSPointerMove', onPointerMove, false);
				dom.wrapper.removeEventListener('MSPointerUp', onPointerUp, false);
			}

			if (config.progress && dom.progress) {
				dom.progress.removeEventListener('click', onProgressClicked, false);
			}

			['touchstart', 'click'].forEach(function(eventName) {
				dom.controlsLeft.forEach(function(el) {
					el.removeEventListener(eventName, onNavigateLeftClicked, false);
				});
				dom.controlsRight.forEach(function(el) {
					el.removeEventListener(eventName, onNavigateRightClicked, false);
				});
				dom.controlsUp.forEach(function(el) {
					el.removeEventListener(eventName, onNavigateUpClicked, false);
				});
				dom.controlsDown.forEach(function(el) {
					el.removeEventListener(eventName, onNavigateDownClicked, false);
				});
				dom.controlsPrev.forEach(function(el) {
					el.removeEventListener(eventName, onNavigatePrevClicked, false);
				});
				dom.controlsNext.forEach(function(el) {
					el.removeEventListener(eventName, onNavigateNextClicked, false);
				});
			});

		}

		/**
		 * Extend object a with the properties of object b.
		 * If there's a conflict, object b takes precedence.
		 */
		function extend(a, b) {

			for (var i in b) {
				a[i] = b[i];
			}

		}

		/**
		 * Converts the target object to an array.
		 */
		function toArray(o) {

			return Array.prototype.slice.call(o);

		}

		/**
		 * Utility for deserializing a value.
		 */
		function deserialize(value) {

			if (typeof value === 'string') {
				if (value === 'null') return null;
				else if (value === 'true') return true;
				else if (value === 'false') return false;
				else if (value.match(/^\d+$/)) return parseFloat(value);
			}

			return value;

		}

		/**
		 * Measures the distance in pixels between point a
		 * and point b.
		 *
		 * @param {Object} a point with x/y properties
		 * @param {Object} b point with x/y properties
		 */
		function distanceBetween(a, b) {

			var dx = a.x - b.x,
				dy = a.y - b.y;

			return Math.sqrt(dx * dx + dy * dy);

		}

		/**
		 * Applies a CSS transform to the target element.
		 */
		function transformElement(element, transform) {

			element.style.WebkitTransform = transform;
			element.style.MozTransform = transform;
			element.style.msTransform = transform;
			element.style.transform = transform;

		}

		/**
		 * Applies CSS transforms to the slides container. The container
		 * is transformed from two separate sources: layout and the overview
		 * mode.
		 */
		function transformSlides(transforms) {

			// Pick up new transforms from arguments
			if (typeof transforms.layout === 'string') slidesTransform.layout = transforms.layout;
			if (typeof transforms.overview === 'string') slidesTransform.overview = transforms.overview;

			// Apply the transforms to the slides container
			if (slidesTransform.layout) {
				transformElement(dom.slides, slidesTransform.layout + ' ' + slidesTransform.overview);
			} else {
				transformElement(dom.slides, slidesTransform.overview);
			}

		}

		/**
		 * Injects the given CSS styles into the DOM.
		 */
		function injectStyleSheet(value) {

			var tag = document.createElement('style');
			tag.type = 'text/css';
			if (tag.styleSheet) {
				tag.styleSheet.cssText = value;
			} else {
				tag.appendChild(document.createTextNode(value));
			}
			document.getElementsByTagName('head')[0].appendChild(tag);

		}

		/**
		 * Converts various color input formats to an {r:0,g:0,b:0} object.
		 *
		 * @param {String} color The string representation of a color,
		 * the following formats are supported:
		 * - #000
		 * - #000000
		 * - rgb(0,0,0)
		 */
		function colorToRgb(color) {

			var hex3 = color.match(/^#([0-9a-f]{3})$/i);
			if (hex3 && hex3[1]) {
				hex3 = hex3[1];
				return {
					r: parseInt(hex3.charAt(0), 16) * 0x11,
					g: parseInt(hex3.charAt(1), 16) * 0x11,
					b: parseInt(hex3.charAt(2), 16) * 0x11
				};
			}

			var hex6 = color.match(/^#([0-9a-f]{6})$/i);
			if (hex6 && hex6[1]) {
				hex6 = hex6[1];
				return {
					r: parseInt(hex6.substr(0, 2), 16),
					g: parseInt(hex6.substr(2, 2), 16),
					b: parseInt(hex6.substr(4, 2), 16)
				};
			}

			var rgb = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
			if (rgb) {
				return {
					r: parseInt(rgb[1], 10),
					g: parseInt(rgb[2], 10),
					b: parseInt(rgb[3], 10)
				};
			}

			var rgba = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);
			if (rgba) {
				return {
					r: parseInt(rgba[1], 10),
					g: parseInt(rgba[2], 10),
					b: parseInt(rgba[3], 10),
					a: parseFloat(rgba[4])
				};
			}

			return null;

		}

		/**
		 * Calculates brightness on a scale of 0-255.
		 *
		 * @param color See colorStringToRgb for supported formats.
		 */
		function colorBrightness(color) {

			if (typeof color === 'string') color = colorToRgb(color);

			if (color) {
				return (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
			}

			return null;

		}

		/**
		 * Retrieves the height of the given element by looking
		 * at the position and height of its immediate children.
		 */
		function getAbsoluteHeight(element) {

			var height = 0;

			if (element) {
				var absoluteChildren = 0;

				toArray(element.childNodes).forEach(function(child) {

					if (typeof child.offsetTop === 'number' && child.style) {
						// Count # of abs children
						if (window.getComputedStyle(child).position === 'absolute') {
							absoluteChildren += 1;
						}

						height = Math.max(height, child.offsetTop + child.offsetHeight);
					}

				});

				// If there are no absolute children, use offsetHeight
				if (absoluteChildren === 0) {
					height = element.offsetHeight;
				}

			}

			return height;

		}

		/**
		 * Returns the remaining height within the parent of the
		 * target element.
		 *
		 * remaining height = [ configured parent height ] - [ current parent height ]
		 */
		function getRemainingHeight(element, height) {

			height = height || 0;

			if (element) {
				var newHeight, oldHeight = element.style.height;

				// Change the .stretch element height to 0 in order find the height of all
				// the other elements
				element.style.height = '0px';
				newHeight = height - element.parentNode.offsetHeight;

				// Restore the old height, just in case
				element.style.height = oldHeight + 'px';

				return newHeight;
			}

			return height;

		}

		/**
		 * Checks if this instance is being used to print a PDF.
		 */
		function isPrintingPDF() {

			return (/print-pdf/gi).test(window.location.search);

		}

		/**
		 * Hides the address bar if we're on a mobile device.
		 */
		function hideAddressBar() {

			if (config.hideAddressBar && isMobileDevice) {
				// Events that should trigger the address bar to hide
				window.addEventListener('load', removeAddressBar, false);
				window.addEventListener('orientationchange', removeAddressBar, false);
			}

		}

		/**
		 * Causes the address bar to hide on mobile devices,
		 * more vertical space ftw.
		 */
		function removeAddressBar() {

			setTimeout(function() {
				window.scrollTo(0, 1);
			}, 10);

		}

		/**
		 * Dispatches an event of the specified type from the
		 * reveal DOM element.
		 */
		function dispatchEvent(type, args) {

			var event = document.createEvent('HTMLEvents', 1, 2);
			event.initEvent(type, true, true);
			extend(event, args);
			dom.wrapper.dispatchEvent(event);

			// If we're in an iframe, post each reveal.js event to the
			// parent window. Used by the notes plugin
			if (config.postMessageEvents && window.parent !== window.self) {
				window.parent.postMessage(JSON.stringify({
					namespace: 'reveal',
					eventName: type,
					state: getState()
				}), '*');
			}

		}

		/**
		 * Wrap all links in 3D goodness.
		 */
		function enableRollingLinks() {

			if (features.transforms3d && !('msPerspective' in document.body.style)) {
				var anchors = dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ' a');

				for (var i = 0, len = anchors.length; i < len; i++) {
					var anchor = anchors[i];

					if (anchor.textContent && !anchor.querySelector('*') && (!anchor.className || !anchor.classList.contains(anchor, 'roll'))) {
						var span = document.createElement('span');
						span.setAttribute('data-title', anchor.text);
						span.innerHTML = anchor.innerHTML;

						anchor.classList.add('roll');
						anchor.innerHTML = '';
						anchor.appendChild(span);
					}
				}
			}

		}

		/**
		 * Unwrap all 3D links.
		 */
		function disableRollingLinks() {

			var anchors = dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ' a.roll');

			for (var i = 0, len = anchors.length; i < len; i++) {
				var anchor = anchors[i];
				var span = anchor.querySelector('span');

				if (span) {
					anchor.classList.remove('roll');
					anchor.innerHTML = span.innerHTML;
				}
			}

		}

		/**
		 * Bind preview frame links.
		 */
		function enablePreviewLinks(selector) {

			var anchors = toArray(document.querySelectorAll(selector ? selector : 'a'));

			anchors.forEach(function(element) {
				if (/^(http|www)/gi.test(element.getAttribute('href'))) {
					element.addEventListener('click', onPreviewLinkClicked, false);
				}
			});

		}

		/**
		 * Unbind preview frame links.
		 */
		function disablePreviewLinks() {

			var anchors = toArray(document.querySelectorAll('a'));

			anchors.forEach(function(element) {
				if (/^(http|www)/gi.test(element.getAttribute('href'))) {
					element.removeEventListener('click', onPreviewLinkClicked, false);
				}
			});

		}

		/**
		 * Opens a preview window for the target URL.
		 */
		function showPreview(url) {

			closeOverlay();

			dom.overlay = document.createElement('div');
			dom.overlay.classList.add('overlay');
			dom.overlay.classList.add('overlay-preview');
			dom.wrapper.appendChild(dom.overlay);

			dom.overlay.innerHTML = [
				'<header>',
				'<a class="close" href="#"><span class="icon"></span></a>',
				'<a class="external" href="' + url + '" target="_blank"><span class="icon"></span></a>',
				'</header>',
				'<div class="spinner"></div>',
				'<div class="viewport">',
				'<iframe src="' + url + '"></iframe>',
				'</div>'
			].join('');

			dom.overlay.querySelector('iframe').addEventListener('load', function(event) {
				dom.overlay.classList.add('loaded');
			}, false);

			dom.overlay.querySelector('.close').addEventListener('click', function(event) {
				closeOverlay();
				event.preventDefault();
			}, false);

			dom.overlay.querySelector('.external').addEventListener('click', function(event) {
				closeOverlay();
			}, false);

			setTimeout(function() {
				dom.overlay.classList.add('visible');
			}, 1);

		}

		/**
		 * Opens a overlay window with help material.
		 */
		function showHelp() {

			if (config.help) {

				closeOverlay();

				dom.overlay = document.createElement('div');
				dom.overlay.classList.add('overlay');
				dom.overlay.classList.add('overlay-help');
				dom.wrapper.appendChild(dom.overlay);

				var html = '<p class="title">Keyboard Shortcuts</p><br/>';

				html += '<table><th>KEY</th><th>ACTION</th>';
				for (var key in keyboardShortcuts) {
					html += '<tr><td>' + key + '</td><td>' + keyboardShortcuts[key] + '</td></tr>';
				}

				html += '</table>';

				dom.overlay.innerHTML = [
					'<header>',
					'<a class="close" href="#"><span class="icon"></span></a>',
					'</header>',
					'<div class="viewport">',
					'<div class="viewport-inner">' + html + '</div>',
					'</div>'
				].join('');

				dom.overlay.querySelector('.close').addEventListener('click', function(event) {
					closeOverlay();
					event.preventDefault();
				}, false);

				setTimeout(function() {
					dom.overlay.classList.add('visible');
				}, 1);

			}

		}

		/**
		 * Closes any currently open overlay.
		 */
		function closeOverlay() {

			if (dom.overlay) {
				dom.overlay.parentNode.removeChild(dom.overlay);
				dom.overlay = null;
			}

		}

		/**
		 * Applies JavaScript-controlled layout rules to the
		 * presentation.
		 */
		function layout() {

			if (dom.wrapper && !isPrintingPDF()) {

				var size = getComputedSlideSize();

				var slidePadding = 20; // TODO Dig this out of DOM

				// Layout the contents of the slides
				layoutSlideContents(config.width, config.height, slidePadding);

				dom.slides.style.width = size.width + 'px';
				dom.slides.style.height = size.height + 'px';

				// Determine scale of content to fit within available space
				scale = Math.min(size.presentationWidth / size.width, size.presentationHeight / size.height);

				// Respect max/min scale settings
				scale = Math.max(scale, config.minScale);
				scale = Math.min(scale, config.maxScale);

				// Don't apply any scaling styles if scale is 1
				if (scale === 1) {
					dom.slides.style.zoom = '';
					dom.slides.style.left = '';
					dom.slides.style.top = '';
					dom.slides.style.bottom = '';
					dom.slides.style.right = '';
					transformSlides({
						layout: ''
					});
				} else {
					// Prefer zoom for scaling up so that content remains crisp.
					// Don't use zoom to scale down since that can lead to shifts
					// in text layout/line breaks.
					if (scale > 1 && features.zoom) {
						dom.slides.style.zoom = scale;
						dom.slides.style.left = '';
						dom.slides.style.top = '';
						dom.slides.style.bottom = '';
						dom.slides.style.right = '';
						transformSlides({
							layout: ''
						});
					}
					// Apply scale transform as a fallback
					else {
						dom.slides.style.zoom = '';
						dom.slides.style.left = '50%';
						dom.slides.style.top = '50%';
						dom.slides.style.bottom = 'auto';
						dom.slides.style.right = 'auto';
						transformSlides({
							layout: 'translate(-50%, -50%) scale(' + scale + ')'
						});
					}
				}

				// Select all slides, vertical and horizontal
				var slides = toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR));

				for (var i = 0, len = slides.length; i < len; i++) {
					var slide = slides[i];

					// Don't bother updating invisible slides
					if (slide.style.display === 'none') {
						continue;
					}

					if (config.center || slide.classList.contains('center')) {
						// Vertical stacks are not centred since their section
						// children will be
						if (slide.classList.contains('stack')) {
							slide.style.top = 0;
						} else {
							slide.style.top = Math.max(((size.height - getAbsoluteHeight(slide)) / 2) - slidePadding, 0) + 'px';
						}
					} else {
						slide.style.top = '';
					}

				}

				updateProgress();
				updateParallax();

			}

		}

		/**
		 * Applies layout logic to the contents of all slides in
		 * the presentation.
		 */
		function layoutSlideContents(width, height, padding) {

			// Handle sizing of elements with the 'stretch' class
			toArray(dom.slides.querySelectorAll('section > .stretch')).forEach(function(element) {

				// Determine how much vertical space we can use
				var remainingHeight = getRemainingHeight(element, height);

				// Consider the aspect ratio of media elements
				if (/(img|video)/gi.test(element.nodeName)) {
					var nw = element.naturalWidth || element.videoWidth,
						nh = element.naturalHeight || element.videoHeight;

					var es = Math.min(width / nw, remainingHeight / nh);

					element.style.width = (nw * es) + 'px';
					element.style.height = (nh * es) + 'px';

				} else {
					element.style.width = width + 'px';
					element.style.height = remainingHeight + 'px';
				}

			});

		}

		/**
		 * Calculates the computed pixel size of our slides. These
		 * values are based on the width and height configuration
		 * options.
		 */
		function getComputedSlideSize(presentationWidth, presentationHeight) {

			var size = {
				// Slide size
				width: config.width,
				height: config.height,

				// Presentation size
				presentationWidth: presentationWidth || dom.wrapper.offsetWidth,
				presentationHeight: presentationHeight || dom.wrapper.offsetHeight
			};

			// Reduce available space by margin
			size.presentationWidth -= (size.presentationWidth * config.margin);
			size.presentationHeight -= (size.presentationHeight * config.margin);

			// Slide width may be a percentage of available width
			if (typeof size.width === 'string' && /%$/.test(size.width)) {
				size.width = parseInt(size.width, 10) / 100 * size.presentationWidth;
			}

			// Slide height may be a percentage of available height
			if (typeof size.height === 'string' && /%$/.test(size.height)) {
				size.height = parseInt(size.height, 10) / 100 * size.presentationHeight;
			}

			return size;

		}

		/**
		 * Stores the vertical index of a stack so that the same
		 * vertical slide can be selected when navigating to and
		 * from the stack.
		 *
		 * @param {HTMLElement} stack The vertical stack element
		 * @param {int} v Index to memorize
		 */
		function setPreviousVerticalIndex(stack, v) {

			if (typeof stack === 'object' && typeof stack.setAttribute === 'function') {
				stack.setAttribute('data-previous-indexv', v || 0);
			}

		}

		/**
		 * Retrieves the vertical index which was stored using
		 * #setPreviousVerticalIndex() or 0 if no previous index
		 * exists.
		 *
		 * @param {HTMLElement} stack The vertical stack element
		 */
		function getPreviousVerticalIndex(stack) {

			if (typeof stack === 'object' && typeof stack.setAttribute === 'function' && stack.classList.contains('stack')) {
				// Prefer manually defined start-indexv
				var attributeName = stack.hasAttribute('data-start-indexv') ? 'data-start-indexv' : 'data-previous-indexv';

				return parseInt(stack.getAttribute(attributeName) || 0, 10);
			}

			return 0;

		}

		/**
		 * Displays the overview of slides (quick nav) by scaling
		 * down and arranging all slide elements.
		 */
		function activateOverview() {

			// Only proceed if enabled in config
			if (config.overview && !isOverview()) {

				overview = true;

				dom.wrapper.classList.add('overview');
				dom.wrapper.classList.remove('overview-deactivating');

				if (features.overviewTransitions) {
					setTimeout(function() {
						dom.wrapper.classList.add('overview-animated');
					}, 1);
				}

				// Don't auto-slide while in overview mode
				cancelAutoSlide();

				// Move the backgrounds element into the slide container to
				// that the same scaling is applied
				dom.slides.appendChild(dom.background);

				// Clicking on an overview slide navigates to it
				toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR)).forEach(function(slide) {
					if (!slide.classList.contains('stack')) {
						slide.addEventListener('click', onOverviewSlideClicked, true);
					}
				});

				// Calculate slide sizes
				var slideSize = getComputedSlideSize();

				//var margin = slideSize.width;

				overviewSlideWidth = slideSize.width * overviewRatio + 200;
				overviewSlideHeight = slideSize.height * overviewRatio + 200;
				// Reverse in RTL mode
				if (config.rtl) {
					overviewSlideWidth = -overviewSlideWidth;
				}

				updateSlidesVisibility();
				layoutOverview();
				updateOverview();

				layout();

				// Notify observers of the overview showing
				dispatchEvent('overviewshown', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				});

			}

		}

		/**
		 * Uses CSS transforms to position all slides in a grid for
		 * display inside of the overview mode.
		 */
		function layoutOverview() {

			// Layout slides
			toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).forEach(function(hslide, h) {
				hslide.setAttribute('data-index-h', h);
				transformElement(hslide, 'translate3d(' + (h * overviewSlideWidth / overviewRatio) + 'px, 0, 0)');

				if (hslide.classList.contains('stack')) {

					toArray(hslide.querySelectorAll('section')).forEach(function(vslide, v) {
						vslide.setAttribute('data-index-h', h);
						vslide.setAttribute('data-index-v', v);

						transformElement(vslide, 'translate3d(0, ' + (v * overviewSlideHeight / overviewRatio) + 'px, 0)');
					});

				}
			});

			// Layout slide backgrounds
			toArray(dom.background.childNodes).forEach(function(hbackground, h) {
				transformElement(hbackground, 'translate3d(' + (h * overviewSlideWidth / overviewRatio) + 'px, 0, 0)');

				toArray(hbackground.querySelectorAll('.slide-background')).forEach(function(vbackground, v) {
					transformElement(vbackground, 'translate3d(0, ' + (v * overviewSlideHeight / overviewRatio) + 'px, 0)');
				});
			});

		}

		/**
		 * Moves the overview viewport to the current slides.
		 * Called each time the current slide changes.
		 */
		function updateOverview() {
			var x = 1400,
				y = 2200;
			transformSlides({
				overview: [
					'translateX(' + (-indexh * overviewSlideWidth / overviewRatio) + 'px)',
					'translateY(' + (-indexv * overviewSlideHeight / overviewRatio) + 'px)',
					'translateZ(' + (window.innerWidth < 400 ? -x / overviewRatio : -y / overviewRatio) + 'px)'
				].join(' ')
			});

		}

		/**
		 * Exits the slide overview and enters the currently
		 * active slide.
		 */
		function deactivateOverview() {

			// Only proceed if enabled in config
			if (config.overview) {

				overview = false;

				dom.wrapper.classList.remove('overview');
				dom.wrapper.classList.remove('overview-animated');

				// Temporarily add a class so that transitions can do different things
				// depending on whether they are exiting/entering overview, or just
				// moving from slide to slide
				dom.wrapper.classList.add('overview-deactivating');

				setTimeout(function() {
					dom.wrapper.classList.remove('overview-deactivating');
				}, 1);

				// Move the background element back out
				dom.wrapper.appendChild(dom.background);

				// Clean up changes made to slides
				toArray(dom.wrapper.querySelectorAll(SLIDES_SELECTOR)).forEach(function(slide) {
					transformElement(slide, '');

					slide.removeEventListener('click', onOverviewSlideClicked, true);
				});

				// Clean up changes made to backgrounds
				toArray(dom.background.querySelectorAll('.slide-background')).forEach(function(background) {
					transformElement(background, '');
				});

				transformSlides({
					overview: ''
				});

				slide(indexh, indexv);

				layout();

				cueAutoSlide();

				// Notify observers of the overview hiding
				dispatchEvent('overviewhidden', {
					'indexh': indexh,
					'indexv': indexv,
					'currentSlide': currentSlide
				});

			}
		}

		/**
		 * Toggles the slide overview mode on and off.
		 *
		 * @param {Boolean} override Optional flag which overrides the
		 * toggle logic and forcibly sets the desired state. True means
		 * overview is open, false means it's closed.
		 */
		function toggleOverview(override) {

			if (typeof override === 'boolean') {
				override ? activateOverview() : deactivateOverview();
			} else {
				isOverview() ? deactivateOverview() : activateOverview();
			}

		}

		/**
		 * Checks if the overview is currently active.
		 *
		 * @return {Boolean} true if the overview is active,
		 * false otherwise
		 */
		function isOverview() {

			return overview;

		}

		/**
		 * Checks if the current or specified slide is vertical
		 * (nested within another slide).
		 *
		 * @param {HTMLElement} slide [optional] The slide to check
		 * orientation of
		 */
		function isVerticalSlide(slide) {

			// Prefer slide argument, otherwise use current slide
			slide = slide ? slide : currentSlide;

			return slide && slide.parentNode && !!slide.parentNode.nodeName.match(/section/i);

		}

		/**
		 * Handling the fullscreen functionality via the fullscreen API
		 *
		 * @see http://fullscreen.spec.whatwg.org/
		 * @see https://developer.mozilla.org/en-US/docs/DOM/Using_fullscreen_mode
		 */
		function enterFullscreen() {

			var element = document.body;

			// Check which implementation is available
			var requestMethod = element.requestFullScreen ||
				element.webkitRequestFullscreen ||
				element.webkitRequestFullScreen ||
				element.mozRequestFullScreen ||
				element.msRequestFullscreen;

			if (requestMethod) {
				requestMethod.apply(element);
			}

		}

		/**
		 * Enters the paused mode which fades everything on screen to
		 * black.
		 */
		function pause() {

			if (config.pause) {
				var wasPaused = dom.wrapper.classList.contains('paused');

				cancelAutoSlide();
				dom.wrapper.classList.add('paused');

				if (wasPaused === false) {
					dispatchEvent('paused');
				}
			}

		}

		/**
		 * Exits from the paused mode.
		 */
		function resume() {

			var wasPaused = dom.wrapper.classList.contains('paused');
			dom.wrapper.classList.remove('paused');

			cueAutoSlide();

			if (wasPaused) {
				dispatchEvent('resumed');
			}

		}

		/**
		 * Toggles the paused mode on and off.
		 */
		function togglePause(override) {

			if (typeof override === 'boolean') {
				override ? pause() : resume();
			} else {
				isPaused() ? resume() : pause();
			}

		}

		/**
		 * Checks if we are currently in the paused mode.
		 */
		function isPaused() {

			return dom.wrapper.classList.contains('paused');

		}

		/**
		 * Toggles the auto slide mode on and off.
		 *
		 * @param {Boolean} override Optional flag which sets the desired state.
		 * True means autoplay starts, false means it stops.
		 */

		function toggleAutoSlide(override) {

			if (typeof override === 'boolean') {
				override ? resumeAutoSlide() : pauseAutoSlide();
			} else {
				autoSlidePaused ? resumeAutoSlide() : pauseAutoSlide();
			}

		}

		/**
		 * Checks if the auto slide mode is currently on.
		 */
		function isAutoSliding() {

			return !!(autoSlide && !autoSlidePaused);

		}

		/**
		 * Steps from the current point in the presentation to the
		 * slide which matches the specified horizontal and vertical
		 * indices.
		 *
		 * @param {int} h Horizontal index of the target slide
		 * @param {int} v Vertical index of the target slide
		 * @param {int} f Optional index of a fragment within the
		 * target slide to activate
		 * @param {int} o Optional origin for use in multimaster environments
		 */
		function slide(h, v, f, o) {

			// Remember where we were at before
			previousSlide = currentSlide;

			// Query all horizontal slides in the deck
			var horizontalSlides = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR);

			// If no vertical index is specified and the upcoming slide is a
			// stack, resume at its previous vertical index
			if (v === undefined && !isOverview()) {
				v = getPreviousVerticalIndex(horizontalSlides[h]);
			}

			// If we were on a vertical stack, remember what vertical index
			// it was on so we can resume at the same position when returning
			if (previousSlide && previousSlide.parentNode && previousSlide.parentNode.classList.contains('stack')) {
				setPreviousVerticalIndex(previousSlide.parentNode, indexv);
			}

			// Remember the state before this slide
			var stateBefore = state.concat();

			// Reset the state array
			state.length = 0;

			var indexhBefore = indexh || 0,
				indexvBefore = indexv || 0;

			// Activate and transition to the new slide
			indexh = updateSlides(HORIZONTAL_SLIDES_SELECTOR, h === undefined ? indexh : h);
			indexv = updateSlides(VERTICAL_SLIDES_SELECTOR, v === undefined ? indexv : v);

			// Update the visibility of slides now that the indices have changed
			updateSlidesVisibility();

			layout();

			// Apply the new state
			stateLoop: for (var i = 0, len = state.length; i < len; i++) {
				// Check if this state existed on the previous slide. If it
				// did, we will avoid adding it repeatedly
				for (var j = 0; j < stateBefore.length; j++) {
					if (stateBefore[j] === state[i]) {
						stateBefore.splice(j, 1);
						continue stateLoop;
					}
				}

				document.documentElement.classList.add(state[i]);

				// Dispatch custom event matching the state's name
				dispatchEvent(state[i]);
			}

			// Clean up the remains of the previous state
			while (stateBefore.length) {
				document.documentElement.classList.remove(stateBefore.pop());
			}

			// Update the overview if it's currently active
			if (isOverview()) {
				updateOverview();
			}

			// Find the current horizontal slide and any possible vertical slides
			// within it
			var currentHorizontalSlide = horizontalSlides[indexh],
				currentVerticalSlides = currentHorizontalSlide.querySelectorAll('section');

			// Store references to the previous and current slides
			currentSlide = currentVerticalSlides[indexv] || currentHorizontalSlide;

			// Show fragment, if specified
			if (typeof f !== 'undefined') {
				navigateFragment(f);
			}

			// Dispatch an event if the slide changed
			var slideChanged = (indexh !== indexhBefore || indexv !== indexvBefore);
			if (slideChanged) {
				dispatchEvent('slidechanged', {
					'indexh': indexh,
					'indexv': indexv,
					'previousSlide': previousSlide,
					'currentSlide': currentSlide,
					'origin': o
				});
			} else {
				// Ensure that the previous slide is never the same as the current
				previousSlide = null;
			}

			// Solves an edge case where the previous slide maintains the
			// 'present' class when navigating between adjacent vertical
			// stacks
			if (previousSlide) {
				previousSlide.classList.remove('present');
				previousSlide.setAttribute('aria-hidden', 'true');

				// Reset all slides upon navigate to home
				// Issue: #285
				if (dom.wrapper.querySelector(HOME_SLIDE_SELECTOR).classList.contains('present')) {
					// Launch async task
					setTimeout(function() {
						var slides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR + '.stack')),
							i;
						for (i in slides) {
							if (slides[i]) {
								// Reset stack
								setPreviousVerticalIndex(slides[i], 0);
							}
						}
					}, 0);
				}
			}

			// Handle embedded content
			if (slideChanged || !previousSlide) {
				stopEmbeddedContent(previousSlide);
				startEmbeddedContent(currentSlide);
			}

			// Announce the current slide contents, for screen readers
			dom.statusDiv.textContent = currentSlide.textContent;

			updateControls();
			updateProgress();
			updateBackground();
			updateParallax();
			updateSlideNumber();
			updateNotes();

			// Update the URL hash
			writeURL();

			cueAutoSlide();

		}

		/**
		 * Syncs the presentation with the current DOM. Useful
		 * when new slides or control elements are added or when
		 * the configuration has changed.
		 */
		function sync() {

			// Subscribe to input
			removeEventListeners();
			addEventListeners();

			// Force a layout to make sure the current config is accounted for
			layout();

			// Reflect the current autoSlide value
			autoSlide = config.autoSlide;

			// Start auto-sliding if it's enabled
			cueAutoSlide();

			// Re-create the slide backgrounds
			createBackgrounds();

			// Write the current hash to the URL
			writeURL();

			sortAllFragments();

			updateControls();
			updateProgress();
			updateBackground(true);
			updateSlideNumber();
			updateSlidesVisibility();
			updateNotes();

			formatEmbeddedContent();
			startEmbeddedContent(currentSlide);

			if (isOverview()) {
				layoutOverview();
			}

		}

		/**
		 * Resets all vertical slides so that only the first
		 * is visible.
		 */
		function resetVerticalSlides() {

			var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));
			horizontalSlides.forEach(function(horizontalSlide) {

				var verticalSlides = toArray(horizontalSlide.querySelectorAll('section'));
				verticalSlides.forEach(function(verticalSlide, y) {

					if (y > 0) {
						verticalSlide.classList.remove('present');
						verticalSlide.classList.remove('past');
						verticalSlide.classList.add('future');
						verticalSlide.setAttribute('aria-hidden', 'true');
					}

				});

			});

		}

		/**
		 * Sorts and formats all of fragments in the
		 * presentation.
		 */
		function sortAllFragments() {

			var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));
			horizontalSlides.forEach(function(horizontalSlide) {

				var verticalSlides = toArray(horizontalSlide.querySelectorAll('section'));
				verticalSlides.forEach(function(verticalSlide, y) {

					sortFragments(verticalSlide.querySelectorAll('.fragment'));

				});

				if (verticalSlides.length === 0) sortFragments(horizontalSlide.querySelectorAll('.fragment'));

			});

		}

		/**
		 * Randomly shuffles all slides in the deck.
		 */
		function shuffle() {

			var slides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));

			slides.forEach(function(slide) {

				// Insert this slide next to another random slide. This may
				// cause the slide to insert before itself but that's fine.
				dom.slides.insertBefore(slide, slides[Math.floor(Math.random() * slides.length)]);

			});

		}

		/**
		 * Updates one dimension of slides by showing the slide
		 * with the specified index.
		 *
		 * @param {String} selector A CSS selector that will fetch
		 * the group of slides we are working with
		 * @param {Number} index The index of the slide that should be
		 * shown
		 *
		 * @return {Number} The index of the slide that is now shown,
		 * might differ from the passed in index if it was out of
		 * bounds.
		 */
		function updateSlides(selector, index) {

			// Select all slides and convert the NodeList result to
			// an array
			var slides = toArray(dom.wrapper.querySelectorAll(selector)),
				slidesLength = slides.length;

			var printMode = isPrintingPDF();

			if (slidesLength) {

				// Should the index loop?
				if (config.loop) {
					index %= slidesLength;

					if (index < 0) {
						index = slidesLength + index;
					}
				}

				// Enforce max and minimum index bounds
				index = Math.max(Math.min(index, slidesLength - 1), 0);

				for (var i = 0; i < slidesLength; i++) {
					var element = slides[i];

					var reverse = config.rtl && !isVerticalSlide(element);

					element.classList.remove('past');
					element.classList.remove('present');
					element.classList.remove('future');

					// http://www.w3.org/html/wg/drafts/html/master/editing.html#the-hidden-attribute
					element.setAttribute('hidden', '');
					element.setAttribute('aria-hidden', 'true');

					// If this element contains vertical slides
					if (element.querySelector('section')) {
						element.classList.add('stack');
					}

					// If we're printing static slides, all slides are "present"
					if (printMode) {
						element.classList.add('present');
						continue;
					}

					if (i < index) {
						// Any element previous to index is given the 'past' class
						element.classList.add(reverse ? 'future' : 'past');

						if (config.fragments) {
							var pastFragments = toArray(element.querySelectorAll('.fragment'));

							// Show all fragments on prior slides
							while (pastFragments.length) {
								var pastFragment = pastFragments.pop();
								pastFragment.classList.add('visible');
								pastFragment.classList.remove('current-fragment');
							}
						}
					} else if (i > index) {
						// Any element subsequent to index is given the 'future' class
						element.classList.add(reverse ? 'past' : 'future');

						if (config.fragments) {
							var futureFragments = toArray(element.querySelectorAll('.fragment.visible'));

							// No fragments in future slides should be visible ahead of time
							while (futureFragments.length) {
								var futureFragment = futureFragments.pop();
								futureFragment.classList.remove('visible');
								futureFragment.classList.remove('current-fragment');
							}
						}
					}
				}

				// Mark the current slide as present
				slides[index].classList.add('present');
				slides[index].removeAttribute('hidden');
				slides[index].removeAttribute('aria-hidden');

				// If this slide has a state associated with it, add it
				// onto the current state of the deck
				var slideState = slides[index].getAttribute('data-state');
				if (slideState) {
					state = state.concat(slideState.split(' '));
				}

			} else {
				// Since there are no slides we can't be anywhere beyond the
				// zeroth index
				index = 0;
			}

			return index;

		}

		/**
		 * Optimization method; hide all slides that are far away
		 * from the present slide.
		 */
		function updateSlidesVisibility() {

			// Select all slides and convert the NodeList result to
			// an array
			var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)),
				horizontalSlidesLength = horizontalSlides.length,
				distanceX,
				distanceY;

			if (horizontalSlidesLength && typeof indexh !== 'undefined') {

				// The number of steps away from the present slide that will
				// be visible
				var viewDistance = !isOverview() ? 10 : config.viewDistance;

				// Limit view distance on weaker devices
				if (isMobileDevice) {
					viewDistance = !isOverview() ? 6 : 2;
				}

				// All slides need to be visible when exporting to PDF
				if (isPrintingPDF()) {
					viewDistance = Number.MAX_VALUE;
				}

				for (var x = 0; x < horizontalSlidesLength; x++) {
					var horizontalSlide = horizontalSlides[x];

					var verticalSlides = toArray(horizontalSlide.querySelectorAll('section')),
						verticalSlidesLength = verticalSlides.length;

					// Determine how far away this slide is from the present
					distanceX = Math.abs((indexh || 0) - x) || 0;

					// If the presentation is looped, distance should measure
					// 1 between the first and last slides
					if (config.loop) {
						distanceX = Math.abs(((indexh || 0) - x) % (horizontalSlidesLength - viewDistance)) || 0;
					}

					// Show the horizontal slide if it's within the view distance
					if (distanceX < viewDistance) {
						showSlide(horizontalSlide);
					} else {
						hideSlide(horizontalSlide);
					}

					if (verticalSlidesLength) {

						var oy = getPreviousVerticalIndex(horizontalSlide);

						for (var y = 0; y < verticalSlidesLength; y++) {
							var verticalSlide = verticalSlides[y];

							distanceY = x === (indexh || 0) ? Math.abs((indexv || 0) - y) : Math.abs(y - oy);

							if (distanceX + distanceY < viewDistance) {
								showSlide(verticalSlide);
							} else {
								hideSlide(verticalSlide);
							}
						}

					}
				}

			}

		}

		/**
		 * Pick up notes from the current slide and display tham
		 * to the viewer.
		 *
		 * @see `showNotes` config value
		 */
		function updateNotes() {

			if (config.showNotes && dom.speakerNotes && currentSlide && !isPrintingPDF()) {

				dom.speakerNotes.innerHTML = getSlideNotes() || '';

			}

		}

		/**
		 * Updates the progress bar to reflect the current slide.
		 */
		function updateProgress() {

			// Update progress if enabled
			if (config.progress && dom.progressbar) {

				dom.progressbar.style.width = getProgress() * dom.wrapper.offsetWidth + 'px';

			}

		}

		/**
		 * Updates the slide number div to reflect the current slide.
		 *
		 * The following slide number formats are available:
		 *  "h.v": 	horizontal . vertical slide number (default)
		 *  "h/v": 	horizontal / vertical slide number
		 *    "c": 	flattened slide number
		 *  "c/t": 	flattened slide number / total slides
		 */
		function updateSlideNumber() {

			// Update slide number if enabled
			if (config.slideNumber && dom.slideNumber) {

				var value = [];
				var format = 'h.v';

				// Check if a custom number format is available
				if (typeof config.slideNumber === 'string') {
					format = config.slideNumber;
				}

				switch (format) {
					case 'c':
						value.push(getSlidePastCount() + 1);
						break;
					case 'c/t':
						value.push(getSlidePastCount() + 1, '/', getTotalSlides());
						break;
					case 'h/v':
						value.push(indexh + 1);
						if (isVerticalSlide()) value.push('/', indexv + 1);
						break;
					default:
						value.push(indexh + 1);
						if (isVerticalSlide()) value.push('.', indexv + 1);
				}

				dom.slideNumber.innerHTML = formatSlideNumber(value[0], value[1], value[2]);
			}

		}

		/**
		 * Applies HTML formatting to a slide number before it's
		 * written to the DOM.
		 */
		function formatSlideNumber(a, delimiter, b) {

			if (typeof b === 'number' && !isNaN(b)) {
				return '<span class="slide-number-a">' + a + '</span>' +
					'<span class="slide-number-delimiter">' + delimiter + '</span>' +
					'<span class="slide-number-b">' + b + '</span>';
			} else {
				return '<span class="slide-number-a">' + a + '</span>';
			}

		}

		/**
		 * Updates the state of all control/navigation arrows.
		 */
		function updateControls() {

			var routes = availableRoutes();
			var fragments = availableFragments();

			// Remove the 'enabled' class from all directions
			dom.controlsLeft.concat(dom.controlsRight)
				.concat(dom.controlsUp)
				.concat(dom.controlsDown)
				.concat(dom.controlsPrev)
				.concat(dom.controlsNext).forEach(function(node) {
					node.classList.remove('enabled');
					node.classList.remove('fragmented');
				});

			// Add the 'enabled' class to the available routes
			if (routes.left) dom.controlsLeft.forEach(function(el) {
				el.classList.add('enabled');
			});
			if (routes.right) dom.controlsRight.forEach(function(el) {
				el.classList.add('enabled');
			});
			if (routes.up) dom.controlsUp.forEach(function(el) {
				el.classList.add('enabled');
			});
			if (routes.down) dom.controlsDown.forEach(function(el) {
				el.classList.add('enabled');
			});

			// Prev/next buttons
			if (routes.left || routes.up) dom.controlsPrev.forEach(function(el) {
				el.classList.add('enabled');
			});
			if (routes.right || routes.down) dom.controlsNext.forEach(function(el) {
				el.classList.add('enabled');
			});

			// Highlight fragment directions
			if (currentSlide) {

				// Always apply fragment decorator to prev/next buttons
				if (fragments.prev) dom.controlsPrev.forEach(function(el) {
					el.classList.add('fragmented', 'enabled');
				});
				if (fragments.next) dom.controlsNext.forEach(function(el) {
					el.classList.add('fragmented', 'enabled');
				});

				// Apply fragment decorators to directional buttons based on
				// what slide axis they are in
				if (isVerticalSlide(currentSlide)) {
					if (fragments.prev) dom.controlsUp.forEach(function(el) {
						el.classList.add('fragmented', 'enabled');
					});
					if (fragments.next) dom.controlsDown.forEach(function(el) {
						el.classList.add('fragmented', 'enabled');
					});
				} else {
					if (fragments.prev) dom.controlsLeft.forEach(function(el) {
						el.classList.add('fragmented', 'enabled');
					});
					if (fragments.next) dom.controlsRight.forEach(function(el) {
						el.classList.add('fragmented', 'enabled');
					});
				}

			}

		}

		/**
		 * Updates the background elements to reflect the current
		 * slide.
		 *
		 * @param {Boolean} includeAll If true, the backgrounds of
		 * all vertical slides (not just the present) will be updated.
		 */
		function updateBackground(includeAll) {

			var currentBackground = null;

			// Reverse past/future classes when in RTL mode
			var horizontalPast = config.rtl ? 'future' : 'past',
				horizontalFuture = config.rtl ? 'past' : 'future';

			// Update the classes of all backgrounds to match the
			// states of their slides (past/present/future)
			toArray(dom.background.childNodes).forEach(function(backgroundh, h) {

				backgroundh.classList.remove('past');
				backgroundh.classList.remove('present');
				backgroundh.classList.remove('future');

				if (h < indexh) {
					backgroundh.classList.add(horizontalPast);
				} else if (h > indexh) {
					backgroundh.classList.add(horizontalFuture);
				} else {
					backgroundh.classList.add('present');

					// Store a reference to the current background element
					currentBackground = backgroundh;
				}

				if (includeAll || h === indexh) {
					toArray(backgroundh.querySelectorAll('.slide-background')).forEach(function(backgroundv, v) {

						backgroundv.classList.remove('past');
						backgroundv.classList.remove('present');
						backgroundv.classList.remove('future');

						if (v < indexv) {
							backgroundv.classList.add('past');
						} else if (v > indexv) {
							backgroundv.classList.add('future');
						} else {
							backgroundv.classList.add('present');

							// Only if this is the present horizontal and vertical slide
							if (h === indexh) currentBackground = backgroundv;
						}

					});
				}

			});

			// Stop any currently playing video background
			if (previousBackground) {

				var previousVideo = previousBackground.querySelector('video');
				if (previousVideo) previousVideo.pause();

			}

			if (currentBackground) {

				// Start video playback
				var currentVideo = currentBackground.querySelector('video');
				if (currentVideo) {

					var startVideo = function() {
						currentVideo.currentTime = 0;
						currentVideo.play();
						currentVideo.removeEventListener('loadeddata', startVideo);
					};

					if (currentVideo.readyState > 1) {
						startVideo();
					} else {
						currentVideo.addEventListener('loadeddata', startVideo);
					}

				}

				var backgroundImageURL = currentBackground.style.backgroundImage || '';

				// Restart GIFs (doesn't work in Firefox)
				if (/\.gif/i.test(backgroundImageURL)) {
					currentBackground.style.backgroundImage = '';
					window.getComputedStyle(currentBackground).opacity;
					currentBackground.style.backgroundImage = backgroundImageURL;
				}

				// Don't transition between identical backgrounds. This
				// prevents unwanted flicker.
				var previousBackgroundHash = previousBackground ? previousBackground.getAttribute('data-background-hash') : null;
				var currentBackgroundHash = currentBackground.getAttribute('data-background-hash');
				if (currentBackgroundHash && currentBackgroundHash === previousBackgroundHash && currentBackground !== previousBackground) {
					dom.background.classList.add('no-transition');
				}

				previousBackground = currentBackground;

			}

			// If there's a background brightness flag for this slide,
			// bubble it to the .reveal container
			if (currentSlide) {
				['has-light-background', 'has-dark-background'].forEach(function(classToBubble) {
					if (currentSlide.classList.contains(classToBubble)) {
						dom.wrapper.classList.add(classToBubble);
					} else {
						dom.wrapper.classList.remove(classToBubble);
					}
				});
			}

			// Allow the first background to apply without transition
			setTimeout(function() {
				dom.background.classList.remove('no-transition');
			}, 1);

		}

		/**
		 * Updates the position of the parallax background based
		 * on the current slide index.
		 */
		function updateParallax() {

			if (config.parallaxBackgroundImage) {

				var horizontalSlides = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR),
					verticalSlides = dom.wrapper.querySelectorAll(VERTICAL_SLIDES_SELECTOR);

				var backgroundSize = dom.background.style.backgroundSize.split(' '),
					backgroundWidth, backgroundHeight;

				if (backgroundSize.length === 1) {
					backgroundWidth = backgroundHeight = parseInt(backgroundSize[0], 10);
				} else {
					backgroundWidth = parseInt(backgroundSize[0], 10);
					backgroundHeight = parseInt(backgroundSize[1], 10);
				}

				var slideWidth = dom.background.offsetWidth,
					horizontalSlideCount = horizontalSlides.length,
					horizontalOffsetMultiplier,
					horizontalOffset;

				if (typeof config.parallaxBackgroundHorizontal === 'number') {
					horizontalOffsetMultiplier = config.parallaxBackgroundHorizontal;
				} else {
					horizontalOffsetMultiplier = horizontalSlideCount > 1 ? (backgroundWidth - slideWidth) / (horizontalSlideCount - 1) : 0;
				}

				horizontalOffset = horizontalOffsetMultiplier * indexh * -1;

				var slideHeight = dom.background.offsetHeight,
					verticalSlideCount = verticalSlides.length,
					verticalOffsetMultiplier,
					verticalOffset;

				if (typeof config.parallaxBackgroundVertical === 'number') {
					verticalOffsetMultiplier = config.parallaxBackgroundVertical;
				} else {
					verticalOffsetMultiplier = (backgroundHeight - slideHeight) / (verticalSlideCount - 1);
				}

				verticalOffset = verticalSlideCount > 0 ? verticalOffsetMultiplier * indexv * 1 : 0;

				dom.background.style.backgroundPosition = horizontalOffset + 'px ' + -verticalOffset + 'px';

			}

		}

		/**
		 * Called when the given slide is within the configured view
		 * distance. Shows the slide element and loads any content
		 * that is set to load lazily (data-src).
		 */
		function showSlide(slide) {

			// Show the slide element
			slide.style.display = 'block';

			// Media elements with data-src attributes
			toArray(slide.querySelectorAll('img[data-src], video[data-src], audio[data-src]')).forEach(function(element) {
				element.setAttribute('src', element.getAttribute('data-src'));
				element.removeAttribute('data-src');
			});

			// Media elements with <source> children
			toArray(slide.querySelectorAll('video, audio')).forEach(function(media) {
				var sources = 0;

				toArray(media.querySelectorAll('source[data-src]')).forEach(function(source) {
					source.setAttribute('src', source.getAttribute('data-src'));
					source.removeAttribute('data-src');
					sources += 1;
				});

				// If we rewrote sources for this video/audio element, we need
				// to manually tell it to load from its new origin
				if (sources > 0) {
					media.load();
				}
			});


			// Show the corresponding background element
			var indices = getIndices(slide);
			var background = getSlideBackground(indices.h, indices.v);
			if (background) {
				background.style.display = 'block';

				// If the background contains media, load it
				if (background.hasAttribute('data-loaded') === false) {
					background.setAttribute('data-loaded', 'true');

					var backgroundImage = slide.getAttribute('data-background-image'),
						backgroundVideo = slide.getAttribute('data-background-video'),
						backgroundVideoLoop = slide.hasAttribute('data-background-video-loop'),
						backgroundVideoMuted = slide.hasAttribute('data-background-video-muted'),
						backgroundIframe = slide.getAttribute('data-background-iframe');

					// Images
					if (backgroundImage) {
						background.style.backgroundImage = 'url(' + backgroundImage + ')';
					}
					// Videos
					else if (backgroundVideo && !isSpeakerNotes()) {
						var video = document.createElement('video');

						if (backgroundVideoLoop) {
							video.setAttribute('loop', '');
						}

						if (backgroundVideoMuted) {
							video.muted = true;
						}

						// Support comma separated lists of video sources
						backgroundVideo.split(',').forEach(function(source) {
							video.innerHTML += '<source src="' + source + '">';
						});

						background.appendChild(video);
					}
					// Iframes
					else if (backgroundIframe) {
						var iframe = document.createElement('iframe');
						iframe.setAttribute('src', backgroundIframe);
						iframe.style.width = '100%';
						iframe.style.height = '100%';
						iframe.style.maxHeight = '100%';
						iframe.style.maxWidth = '100%';

						background.appendChild(iframe);
					}
				}
			}

		}

		/**
		 * Called when the given slide is moved outside of the
		 * configured view distance.
		 */
		function hideSlide(slide) {

			// Hide the slide element
			slide.style.display = 'none';

			// Hide the corresponding background element
			var indices = getIndices(slide);
			var background = getSlideBackground(indices.h, indices.v);
			if (background) {
				background.style.display = 'none';
			}

		}

		/**
		 * Determine what available routes there are for navigation.
		 *
		 * @return {Object} containing four booleans: left/right/up/down
		 */
		function availableRoutes() {

			var horizontalSlides = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR),
				verticalSlides = dom.wrapper.querySelectorAll(VERTICAL_SLIDES_SELECTOR);

			var routes = {
				left: indexh > 0 || config.loop,
				right: indexh < horizontalSlides.length - 1 || config.loop,
				up: indexv > 0,
				down: indexv < verticalSlides.length - 1
			};

			// reverse horizontal controls for rtl
			if (config.rtl) {
				var left = routes.left;
				routes.left = routes.right;
				routes.right = left;
			}

			return routes;

		}

		/**
		 * Returns an object describing the available fragment
		 * directions.
		 *
		 * @return {Object} two boolean properties: prev/next
		 */
		function availableFragments() {

			if (currentSlide && config.fragments) {
				var fragments = currentSlide.querySelectorAll('.fragment');
				var hiddenFragments = currentSlide.querySelectorAll('.fragment:not(.visible)');

				return {
					prev: fragments.length - hiddenFragments.length > 0,
					next: !!hiddenFragments.length
				};
			} else {
				return {
					prev: false,
					next: false
				};
			}

		}

		/**
		 * Enforces origin-specific format rules for embedded media.
		 */
		function formatEmbeddedContent() {

			var _appendParamToIframeSource = function(sourceAttribute, sourceURL, param) {
				toArray(dom.slides.querySelectorAll('iframe[' + sourceAttribute + '*="' + sourceURL + '"]')).forEach(function(el) {
					var src = el.getAttribute(sourceAttribute);
					if (src && src.indexOf(param) === -1) {
						el.setAttribute(sourceAttribute, src + (!/\?/.test(src) ? '?' : '&') + param);
					}
				});
			};

			// YouTube frames must include "?enablejsapi=1"
			_appendParamToIframeSource('src', 'youtube.com/embed/', 'enablejsapi=1');
			_appendParamToIframeSource('data-src', 'youtube.com/embed/', 'enablejsapi=1');

			// Vimeo frames must include "?api=1"
			_appendParamToIframeSource('src', 'player.vimeo.com/', 'api=1');
			_appendParamToIframeSource('data-src', 'player.vimeo.com/', 'api=1');

		}

		/**
		 * Start playback of any embedded content inside of
		 * the targeted slide.
		 */
		function startEmbeddedContent(slide) {

			if (slide && !isSpeakerNotes()) {
				// Restart GIFs
				toArray(slide.querySelectorAll('img[src$=".gif"]')).forEach(function(el) {
					// Setting the same unchanged source like this was confirmed
					// to work in Chrome, FF & Safari
					el.setAttribute('src', el.getAttribute('src'));
				});

				// HTML5 media elements
				toArray(slide.querySelectorAll('video, audio')).forEach(function(el) {
					if (el.hasAttribute('data-autoplay') && typeof el.play === 'function') {
						el.play();
					}
				});

				// Normal iframes
				toArray(slide.querySelectorAll('iframe[src]')).forEach(function(el) {
					startEmbeddedIframe({
						target: el
					});
				});

				// Lazy loading iframes
				toArray(slide.querySelectorAll('iframe[data-src]')).forEach(function(el) {
					if (el.getAttribute('src') !== el.getAttribute('data-src')) {
						el.removeEventListener('load', startEmbeddedIframe); // remove first to avoid dupes
						el.addEventListener('load', startEmbeddedIframe);
						el.setAttribute('src', el.getAttribute('data-src'));
					}
				});
			}

		}

		/**
		 * "Starts" the content of an embedded iframe using the
		 * postmessage API.
		 */
		function startEmbeddedIframe(event) {

			var iframe = event.target;

			// YouTube postMessage API
			if (/youtube\.com\/embed\//.test(iframe.getAttribute('src')) && iframe.hasAttribute('data-autoplay')) {
				iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
			}
			// Vimeo postMessage API
			else if (/player\.vimeo\.com\//.test(iframe.getAttribute('src')) && iframe.hasAttribute('data-autoplay')) {
				iframe.contentWindow.postMessage('{"method":"play"}', '*');
			}
			// Generic postMessage API
			else {
				iframe.contentWindow.postMessage('slide:start', '*');
			}

		}

		/**
		 * Stop playback of any embedded content inside of
		 * the targeted slide.
		 */
		function stopEmbeddedContent(slide) {

			if (slide && slide.parentNode) {
				// HTML5 media elements
				toArray(slide.querySelectorAll('video, audio')).forEach(function(el) {
					if (!el.hasAttribute('data-ignore') && typeof el.pause === 'function') {
						el.pause();
					}
				});

				// Generic postMessage API for non-lazy loaded iframes
				toArray(slide.querySelectorAll('iframe')).forEach(function(el) {
					el.contentWindow.postMessage('slide:stop', '*');
					el.removeEventListener('load', startEmbeddedIframe);
				});

				// YouTube postMessage API
				toArray(slide.querySelectorAll('iframe[src*="youtube.com/embed/"]')).forEach(function(el) {
					if (!el.hasAttribute('data-ignore') && typeof el.contentWindow.postMessage === 'function') {
						el.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
					}
				});

				// Vimeo postMessage API
				toArray(slide.querySelectorAll('iframe[src*="player.vimeo.com/"]')).forEach(function(el) {
					if (!el.hasAttribute('data-ignore') && typeof el.contentWindow.postMessage === 'function') {
						el.contentWindow.postMessage('{"method":"pause"}', '*');
					}
				});

				// Lazy loading iframes
				toArray(slide.querySelectorAll('iframe[data-src]')).forEach(function(el) {
					// Only removing the src doesn't actually unload the frame
					// in all browsers (Firefox) so we set it to blank first
					el.setAttribute('src', 'about:blank');
					el.removeAttribute('src');
				});
			}

		}

		/**
		 * Returns the number of past slides. This can be used as a global
		 * flattened index for slides.
		 */
		function getSlidePastCount() {

			var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));

			// The number of past slides
			var pastCount = 0;

			// Step through all slides and count the past ones
			mainLoop: for (var i = 0; i < horizontalSlides.length; i++) {

				var horizontalSlide = horizontalSlides[i];
				var verticalSlides = toArray(horizontalSlide.querySelectorAll('section'));

				for (var j = 0; j < verticalSlides.length; j++) {

					// Stop as soon as we arrive at the present
					if (verticalSlides[j].classList.contains('present')) {
						break mainLoop;
					}

					pastCount++;

				}

				// Stop as soon as we arrive at the present
				if (horizontalSlide.classList.contains('present')) {
					break;
				}

				// Don't count the wrapping section for vertical slides
				if (horizontalSlide.classList.contains('stack') === false) {
					pastCount++;
				}

			}

			return pastCount;

		}

		/**
		 * Returns a value ranging from 0-1 that represents
		 * how far into the presentation we have navigated.
		 */
		function getProgress() {

			// The number of past and total slides
			var totalCount = getTotalSlides();
			var pastCount = getSlidePastCount();

			if (currentSlide) {

				var allFragments = currentSlide.querySelectorAll('.fragment');

				// If there are fragments in the current slide those should be
				// accounted for in the progress.
				if (allFragments.length > 0) {
					var visibleFragments = currentSlide.querySelectorAll('.fragment.visible');

					// This value represents how big a portion of the slide progress
					// that is made up by its fragments (0-1)
					var fragmentWeight = 0.9;

					// Add fragment progress to the past slide count
					pastCount += (visibleFragments.length / allFragments.length) * fragmentWeight;
				}

			}

			return pastCount / (totalCount - 1);

		}

		/**
		 * Checks if this presentation is running inside of the
		 * speaker notes window.
		 */
		function isSpeakerNotes() {

			return !!window.location.search.match(/receiver/gi);

		}

		/**
		 * Reads the current URL (hash) and navigates accordingly.
		 */
		function readURL() {

			var hash = window.location.hash;

			// Attempt to parse the hash as either an index or name
			var bits = hash.slice(2).split('/'),
				name = hash.replace(/#|\//gi, '');

			// If the first bit is invalid and there is a name we can
			// assume that this is a named link
			if (isNaN(parseInt(bits[0], 10)) && name.length) {
				var element;

				// Ensure the named link is a valid HTML ID attribute
				if (/^[a-zA-Z][\w:.-]*$/.test(name)) {
					// Find the slide with the specified ID
					element = document.getElementById(name);
				}

				if (element) {
					// Find the position of the named slide and navigate to it
					var indices = Reveal.getIndices(element);
					slide(indices.h, indices.v);
				}
				// If the slide doesn't exist, navigate to the current slide
				else {
					slide(indexh || 0, indexv || 0);
				}
			} else {
				// Read the index components of the hash
				var h = parseInt(bits[0], 10) || 0,
					v = parseInt(bits[1], 10) || 0;

				if (h !== indexh || v !== indexv) {
					slide(h, v);
				}
			}

		}

		/**
		 * Updates the page URL (hash) to reflect the current
		 * state.
		 *
		 * @param {Number} delay The time in ms to wait before
		 * writing the hash
		 */
		function writeURL(delay) {

			if (config.history) {

				// Make sure there's never more than one timeout running
				clearTimeout(writeURLTimeout);

				// If a delay is specified, timeout this call
				if (typeof delay === 'number') {
					writeURLTimeout = setTimeout(writeURL, delay);
				} else if (currentSlide) {
					var url = '/';

					// Attempt to create a named link based on the slide's ID
					var id = currentSlide.getAttribute('id');
					if (id) {
						id = id.replace(/[^a-zA-Z0-9\-\_\:\.]/g, '');
					}

					// If the current slide has an ID, use that as a named link
					if (typeof id === 'string' && id.length) {
						url = '/' + id;
					}
					// Otherwise use the /h/v index
					else {
						if (indexh > 0 || indexv > 0) url += indexh;
						if (indexv > 0) url += '/' + indexv;
					}

					window.location.hash = url;
				}
			}

		}

		/**
		 * Retrieves the h/v location of the current, or specified,
		 * slide.
		 *
		 * @param {HTMLElement} slide If specified, the returned
		 * index will be for this slide rather than the currently
		 * active one
		 *
		 * @return {Object} { h: <int>, v: <int>, f: <int> }
		 */
		function getIndices(slide) {

			// By default, return the current indices
			var h = indexh,
				v = indexv,
				f;

			// If a slide is specified, return the indices of that slide
			if (slide) {
				var isVertical = isVerticalSlide(slide);
				var slideh = isVertical ? slide.parentNode : slide;

				// Select all horizontal slides
				var horizontalSlides = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR));

				// Now that we know which the horizontal slide is, get its index
				h = Math.max(horizontalSlides.indexOf(slideh), 0);

				// Assume we're not vertical
				v = undefined;

				// If this is a vertical slide, grab the vertical index
				if (isVertical) {
					v = Math.max(toArray(slide.parentNode.querySelectorAll('section')).indexOf(slide), 0);
				}
			}

			if (!slide && currentSlide) {
				var hasFragments = currentSlide.querySelectorAll('.fragment').length > 0;
				if (hasFragments) {
					var currentFragment = currentSlide.querySelector('.current-fragment');
					if (currentFragment && currentFragment.hasAttribute('data-fragment-index')) {
						f = parseInt(currentFragment.getAttribute('data-fragment-index'), 10);
					} else {
						f = currentSlide.querySelectorAll('.fragment.visible').length - 1;
					}
				}
			}

			return {
				h: h,
				v: v,
				f: f
			};

		}

		/**
		 * Retrieves the total number of slides in this presentation.
		 */
		function getTotalSlides() {

			return dom.wrapper.querySelectorAll(SLIDES_SELECTOR + ':not(.stack)').length;

		}

		/**
		 * Returns the slide element matching the specified index.
		 */
		function getSlide(x, y) {

			var horizontalSlide = dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)[x];
			var verticalSlides = horizontalSlide && horizontalSlide.querySelectorAll('section');

			if (verticalSlides && verticalSlides.length && typeof y === 'number') {
				return verticalSlides ? verticalSlides[y] : undefined;
			}

			return horizontalSlide;

		}

		/**
		 * Returns the background element for the given slide.
		 * All slides, even the ones with no background properties
		 * defined, have a background element so as long as the
		 * index is valid an element will be returned.
		 */
		function getSlideBackground(x, y) {

			// When printing to PDF the slide backgrounds are nested
			// inside of the slides
			if (isPrintingPDF()) {
				var slide = getSlide(x, y);
				if (slide) {
					var background = slide.querySelector('.slide-background');
					if (background && background.parentNode === slide) {
						return background;
					}
				}

				return undefined;
			}

			var horizontalBackground = dom.wrapper.querySelectorAll('.backgrounds>.slide-background')[x];
			var verticalBackgrounds = horizontalBackground && horizontalBackground.querySelectorAll('.slide-background');

			if (verticalBackgrounds && verticalBackgrounds.length && typeof y === 'number') {
				return verticalBackgrounds ? verticalBackgrounds[y] : undefined;
			}

			return horizontalBackground;

		}

		/**
		 * Retrieves the speaker notes from a slide. Notes can be
		 * defined in two ways:
		 * 1. As a data-notes attribute on the slide <section>
		 * 2. As an <aside class="notes"> inside of the slide
		 */
		function getSlideNotes(slide) {

			// Default to the current slide
			slide = slide || currentSlide;

			// Notes can be specified via the data-notes attribute...
			if (slide.hasAttribute('data-notes')) {
				return slide.getAttribute('data-notes');
			}

			// ... or using an <aside class="notes"> element
			var notesElement = slide.querySelector('aside.notes');
			if (notesElement) {
				return notesElement.innerHTML;
			}

			return null;

		}

		/**
		 * Retrieves the current state of the presentation as
		 * an object. This state can then be restored at any
		 * time.
		 */
		function getState() {

			var indices = getIndices();

			return {
				indexh: indices.h,
				indexv: indices.v,
				indexf: indices.f,
				paused: isPaused(),
				overview: isOverview()
			};

		}

		/**
		 * Restores the presentation to the given state.
		 *
		 * @param {Object} state As generated by getState()
		 */
		function setState(state) {

			if (typeof state === 'object') {
				slide(deserialize(state.indexh), deserialize(state.indexv), deserialize(state.indexf));

				var pausedFlag = deserialize(state.paused),
					overviewFlag = deserialize(state.overview);

				if (typeof pausedFlag === 'boolean' && pausedFlag !== isPaused()) {
					togglePause(pausedFlag);
				}

				if (typeof overviewFlag === 'boolean' && overviewFlag !== isOverview()) {
					toggleOverview(overviewFlag);
				}
			}

		}

		/**
		 * Return a sorted fragments list, ordered by an increasing
		 * "data-fragment-index" attribute.
		 *
		 * Fragments will be revealed in the order that they are returned by
		 * this function, so you can use the index attributes to control the
		 * order of fragment appearance.
		 *
		 * To maintain a sensible default fragment order, fragments are presumed
		 * to be passed in document order. This function adds a "fragment-index"
		 * attribute to each node if such an attribute is not already present,
		 * and sets that attribute to an integer value which is the position of
		 * the fragment within the fragments list.
		 */
		function sortFragments(fragments) {

			fragments = toArray(fragments);

			var ordered = [],
				unordered = [],
				sorted = [];

			// Group ordered and unordered elements
			fragments.forEach(function(fragment, i) {
				if (fragment.hasAttribute('data-fragment-index')) {
					var index = parseInt(fragment.getAttribute('data-fragment-index'), 10);

					if (!ordered[index]) {
						ordered[index] = [];
					}

					ordered[index].push(fragment);
				} else {
					unordered.push([fragment]);
				}
			});

			// Append fragments without explicit indices in their
			// DOM order
			ordered = ordered.concat(unordered);

			// Manually count the index up per group to ensure there
			// are no gaps
			var index = 0;

			// Push all fragments in their sorted order to an array,
			// this flattens the groups
			ordered.forEach(function(group) {
				group.forEach(function(fragment) {
					sorted.push(fragment);
					fragment.setAttribute('data-fragment-index', index);
				});

				index++;
			});

			return sorted;

		}

		/**
		 * Navigate to the specified slide fragment.
		 *
		 * @param {Number} index The index of the fragment that
		 * should be shown, -1 means all are invisible
		 * @param {Number} offset Integer offset to apply to the
		 * fragment index
		 *
		 * @return {Boolean} true if a change was made in any
		 * fragments visibility as part of this call
		 */
		function navigateFragment(index, offset) {

			if (currentSlide && config.fragments) {

				var fragments = sortFragments(currentSlide.querySelectorAll('.fragment'));
				if (fragments.length) {

					// If no index is specified, find the current
					if (typeof index !== 'number') {
						var lastVisibleFragment = sortFragments(currentSlide.querySelectorAll('.fragment.visible')).pop();

						if (lastVisibleFragment) {
							index = parseInt(lastVisibleFragment.getAttribute('data-fragment-index') || 0, 10);
						} else {
							index = -1;
						}
					}

					// If an offset is specified, apply it to the index
					if (typeof offset === 'number') {
						index += offset;
					}

					var fragmentsShown = [],
						fragmentsHidden = [];

					toArray(fragments).forEach(function(element, i) {

						if (element.hasAttribute('data-fragment-index')) {
							i = parseInt(element.getAttribute('data-fragment-index'), 10);
						}

						// Visible fragments
						if (i <= index) {
							if (!element.classList.contains('visible')) fragmentsShown.push(element);
							element.classList.add('visible');
							element.classList.remove('current-fragment');

							// Announce the fragments one by one to the Screen Reader
							dom.statusDiv.textContent = element.textContent;

							if (i === index) {
								element.classList.add('current-fragment');
							}
						}
						// Hidden fragments
						else {
							if (element.classList.contains('visible')) fragmentsHidden.push(element);
							element.classList.remove('visible');
							element.classList.remove('current-fragment');
						}


					});

					if (fragmentsHidden.length) {
						dispatchEvent('fragmenthidden', {
							fragment: fragmentsHidden[0],
							fragments: fragmentsHidden
						});
					}

					if (fragmentsShown.length) {
						dispatchEvent('fragmentshown', {
							fragment: fragmentsShown[0],
							fragments: fragmentsShown
						});
					}

					updateControls();
					updateProgress();

					return !!(fragmentsShown.length || fragmentsHidden.length);

				}

			}

			return false;

		}

		/**
		 * Navigate to the next slide fragment.
		 *
		 * @return {Boolean} true if there was a next fragment,
		 * false otherwise
		 */
		function nextFragment() {

			return navigateFragment(null, 1);

		}

		/**
		 * Navigate to the previous slide fragment.
		 *
		 * @return {Boolean} true if there was a previous fragment,
		 * false otherwise
		 */
		function previousFragment() {

			return navigateFragment(null, -1);

		}

		/**
		 * Cues a new automated slide if enabled in the config.
		 */
		function cueAutoSlide() {

			cancelAutoSlide();

			if (currentSlide) {

				var currentFragment = currentSlide.querySelector('.current-fragment');

				var fragmentAutoSlide = currentFragment ? currentFragment.getAttribute('data-autoslide') : null;
				var parentAutoSlide = currentSlide.parentNode ? currentSlide.parentNode.getAttribute('data-autoslide') : null;
				var slideAutoSlide = currentSlide.getAttribute('data-autoslide');

				// Pick value in the following priority order:
				// 1. Current fragment's data-autoslide
				// 2. Current slide's data-autoslide
				// 3. Parent slide's data-autoslide
				// 4. Global autoSlide setting
				if (fragmentAutoSlide) {
					autoSlide = parseInt(fragmentAutoSlide, 10);
				} else if (slideAutoSlide) {
					autoSlide = parseInt(slideAutoSlide, 10);
				} else if (parentAutoSlide) {
					autoSlide = parseInt(parentAutoSlide, 10);
				} else {
					autoSlide = config.autoSlide;
				}

				// If there are media elements with data-autoplay,
				// automatically set the autoSlide duration to the
				// length of that media. Not applicable if the slide
				// is divided up into fragments.
				if (currentSlide.querySelectorAll('.fragment').length === 0) {
					toArray(currentSlide.querySelectorAll('video, audio')).forEach(function(el) {
						if (el.hasAttribute('data-autoplay')) {
							if (autoSlide && el.duration * 1000 > autoSlide) {
								autoSlide = (el.duration * 1000) + 1000;
							}
						}
					});
				}

				// Cue the next auto-slide if:
				// - There is an autoSlide value
				// - Auto-sliding isn't paused by the user
				// - The presentation isn't paused
				// - The overview isn't active
				// - The presentation isn't over
				if (autoSlide && !autoSlidePaused && !isPaused() && !isOverview() && (!Reveal.isLastSlide() || availableFragments().next || config.loop === true)) {
					autoSlideTimeout = setTimeout(function() {
						typeof config.autoSlideMethod === 'function' ? config.autoSlideMethod() : navigateNext();
						cueAutoSlide();
					}, autoSlide);
					autoSlideStartTime = Date.now();
				}

				if (autoSlidePlayer) {
					autoSlidePlayer.setPlaying(autoSlideTimeout !== -1);
				}

			}

		}

		/**
		 * Cancels any ongoing request to auto-slide.
		 */
		function cancelAutoSlide() {

			clearTimeout(autoSlideTimeout);
			autoSlideTimeout = -1;

		}

		function pauseAutoSlide() {

			if (autoSlide && !autoSlidePaused) {
				autoSlidePaused = true;
				dispatchEvent('autoslidepaused');
				clearTimeout(autoSlideTimeout);

				if (autoSlidePlayer) {
					autoSlidePlayer.setPlaying(false);
				}
			}

		}

		function resumeAutoSlide() {

			if (autoSlide && autoSlidePaused) {
				autoSlidePaused = false;
				dispatchEvent('autoslideresumed');
				cueAutoSlide();
			}

		}

		function navigateLeft() {

			// Reverse for RTL
			if (config.rtl) {
				if ((isOverview() || nextFragment() === false) && availableRoutes().left) {
					slide(indexh + 1);
				}
			}
			// Normal navigation
			else if ((isOverview() || previousFragment() === false) && availableRoutes().left) {
				slide(indexh - 1);
			}

		}

		function navigateRight() {

			// Reverse for RTL
			if (config.rtl) {
				if ((isOverview() || previousFragment() === false) && availableRoutes().right) {
					slide(indexh - 1);
				}
			}
			// Normal navigation
			else if ((isOverview() || nextFragment() === false) && availableRoutes().right) {
				slide(indexh + 1);
			}

		}

		function navigateUp() {

			// Prioritize hiding fragments
			if ((isOverview() || previousFragment() === false) && availableRoutes().up) {
				slide(indexh, indexv - 1);
			}

		}

		function navigateDown() {

			// Prioritize revealing fragments
			if ((isOverview() || nextFragment() === false) && availableRoutes().down) {
				slide(indexh, indexv + 1);
			}

		}

		/**
		 * Navigates backwards, prioritized in the following order:
		 * 1) Previous fragment
		 * 2) Previous vertical slide
		 * 3) Previous horizontal slide
		 */
		function navigatePrev() {

			// Prioritize revealing fragments
			if (previousFragment() === false) {
				if (availableRoutes().up) {
					navigateUp();
				} else {
					// Fetch the previous horizontal slide, if there is one
					var previousSlide;

					if (config.rtl) {
						previousSlide = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR + '.future')).pop();
					} else {
						previousSlide = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR + '.past')).pop();
					}

					if (previousSlide) {
						var v = (previousSlide.querySelectorAll('section').length - 1) || undefined;
						var h = indexh - 1;
						slide(h, v);
					}
				}
			}

		}

		/**
		 * The reverse of #navigatePrev().
		 */
		function navigateNext() {

			// Prioritize revealing fragments
			if (nextFragment() === false) {
				if (availableRoutes().down) {
					navigateDown();
				} else if (config.rtl) {
					navigateLeft();
				} else {
					navigateRight();
				}
			}

		}

		/**
		 * Checks if the target element prevents the triggering of
		 * swipe navigation.
		 */
		function isSwipePrevented(target) {

			while (target && typeof target.hasAttribute === 'function') {
				if (target.hasAttribute('data-prevent-swipe')) return true;
				target = target.parentNode;
			}

			return false;

		}


		// --------------------------------------------------------------------//
		// ----------------------------- EVENTS -------------------------------//
		// --------------------------------------------------------------------//

		/**
		 * Called by all event handlers that are based on user
		 * input.
		 */
		function onUserInput(event) {

			if (config.autoSlideStoppable) {
				pauseAutoSlide();
			}

		}

		/**
		 * Handler for the document level 'keypress' event.
		 */
		function onDocumentKeyPress(event) {

			// Check if the pressed key is question mark
			if (event.shiftKey && event.charCode === 63) {
				if (dom.overlay) {
					closeOverlay();
				} else {
					showHelp(true);
				}
			}

		}

		/**
		 * Handler for the document level 'keydown' event.
		 */
		function onDocumentKeyDown(event) {

			// If there's a condition specified and it returns false,
			// ignore this event
			if (typeof config.keyboardCondition === 'function' && config.keyboardCondition() === false) {
				return true;
			}

			// Remember if auto-sliding was paused so we can toggle it
			var autoSlideWasPaused = autoSlidePaused;

			onUserInput(event);

			// Check if there's a focused element that could be using
			// the keyboard
			var activeElementIsCE = document.activeElement && document.activeElement.contentEditable !== 'inherit';
			var activeElementIsInput = document.activeElement && document.activeElement.tagName && /input|textarea/i.test(document.activeElement.tagName);

			// Disregard the event if there's a focused element or a
			// keyboard modifier key is present
			if (activeElementIsCE || activeElementIsInput || (event.shiftKey && event.keyCode !== 32) || event.altKey || event.ctrlKey || event.metaKey) return;

			// While paused only allow resume keyboard events; 'b', '.''
			var resumeKeyCodes = [66, 190, 191];
			var key;

			// Custom key bindings for togglePause should be able to resume
			if (typeof config.keyboard === 'object') {
				for (key in config.keyboard) {
					if (config.keyboard[key] === 'togglePause') {
						resumeKeyCodes.push(parseInt(key, 10));
					}
				}
			}

			if (isPaused() && resumeKeyCodes.indexOf(event.keyCode) === -1) {
				return false;
			}

			var triggered = false;

			// 1. User defined key bindings
			if (typeof config.keyboard === 'object') {

				for (key in config.keyboard) {

					// Check if this binding matches the pressed key
					if (parseInt(key, 10) === event.keyCode) {

						var value = config.keyboard[key];

						// Callback function
						if (typeof value === 'function') {
							value.apply(null, [event]);
						}
						// String shortcuts to reveal.js API
						else if (typeof value === 'string' && typeof Reveal[value] === 'function') {
							Reveal[value].call();
						}

						triggered = true;

					}

				}

			}

			// 2. System defined key bindings
			if (triggered === false) {

				// Assume true and try to prove false
				triggered = true;

				switch (event.keyCode) {
					// p, page up
					case 80:
					case 33:
						navigatePrev();
						break;
						// n, page down
					case 78:
					case 34:
						navigateNext();
						break;
						// h, left
					case 72:
					case 37:
						navigateLeft();
						break;
						// l, right
					case 76:
					case 39:
						navigateRight();
						break;
						// k, up
					case 75:
					case 38:
						navigateUp();
						break;
						// j, down
					case 74:
					case 40:
						navigateDown();
						break;
						// home
					case 36:
						slide(0);
						break;
						// end
					case 35:
						slide(Number.MAX_VALUE);
						break;
						// space
					case 32:
						isOverview() ? deactivateOverview() : event.shiftKey ? navigatePrev() : navigateNext();
						break;
						// return
					case 13:
						isOverview() ? deactivateOverview() : triggered = false;
						break;
						// two-spot, semicolon, b, period, Logitech presenter tools "black screen" button
					case 58:
					case 59:
					case 66:
					case 190:
					case 191:
						togglePause();
						break;
						// f
					case 70:
						enterFullscreen();
						break;
						// a
					case 65:
						if (config.autoSlideStoppable) toggleAutoSlide(autoSlideWasPaused);
						break;
					default:
						triggered = false;
				}

			}

			// If the input resulted in a triggered action we should prevent
			// the browsers default behavior
			if (triggered) {
				event.preventDefault && event.preventDefault();
			}
			// ESC or O key
			else if ((event.keyCode === 27 || event.keyCode === 79) && features.transforms3d) {
				if (dom.overlay) {
					closeOverlay();
				} else {
					toggleOverview();
				}

				event.preventDefault && event.preventDefault();
			}

			// If auto-sliding is enabled we need to cue up
			// another timeout
			cueAutoSlide();

		}

		/**
		 * Handler for the 'touchstart' event, enables support for
		 * swipe and pinch gestures.
		 */
		function onTouchStart(event) {

			if (isSwipePrevented(event.target)) return true;

			touch.startX = event.touches[0].clientX;
			touch.startY = event.touches[0].clientY;
			touch.startCount = event.touches.length;

			// If there's two touches we need to memorize the distance
			// between those two points to detect pinching
			if (event.touches.length === 2 && config.overview) {
				touch.startSpan = distanceBetween({
					x: event.touches[1].clientX,
					y: event.touches[1].clientY
				}, {
					x: touch.startX,
					y: touch.startY
				});
			}

		}

		/**
		 * Handler for the 'touchmove' event.
		 */
		function onTouchMove(event) {

			if (isSwipePrevented(event.target)) return true;

			// Each touch should only trigger one action
			if (!touch.captured) {
				onUserInput(event);

				var currentX = event.touches[0].clientX;
				var currentY = event.touches[0].clientY;

				// If the touch started with two points and still has
				// two active touches; test for the pinch gesture
				if (event.touches.length === 2 && touch.startCount === 2 && config.overview) {

					// The current distance in pixels between the two touch points
					var currentSpan = distanceBetween({
						x: event.touches[1].clientX,
						y: event.touches[1].clientY
					}, {
						x: touch.startX,
						y: touch.startY
					});

					// If the span is larger than the desire amount we've got
					// ourselves a pinch
					if (Math.abs(touch.startSpan - currentSpan) > touch.threshold) {
						touch.captured = true;

						if (currentSpan < touch.startSpan) {
							activateOverview();
						} else {
							deactivateOverview();
						}
					}

					event.preventDefault();

				}
				// There was only one touch point, look for a swipe
				else if (event.touches.length === 1 && touch.startCount !== 2) {

					var deltaX = currentX - touch.startX,
						deltaY = currentY - touch.startY;

					if (deltaX > touch.threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
						touch.captured = true;
						navigateLeft();
					} else if (deltaX < -touch.threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
						touch.captured = true;
						navigateRight();
					} else if (deltaY > touch.threshold) {
						touch.captured = true;
						navigateUp();
					} else if (deltaY < -touch.threshold) {
						touch.captured = true;
						navigateDown();
					}

					// If we're embedded, only block touch events if they have
					// triggered an action
					if (config.embedded) {
						if (touch.captured || isVerticalSlide(currentSlide)) {
							event.preventDefault();
						}
					}
					// Not embedded? Block them all to avoid needless tossing
					// around of the viewport in iOS
					else {
						event.preventDefault();
					}

				}
			}
			// There's a bug with swiping on some Android devices unless
			// the default action is always prevented
			else if (UA.match(/android/gi)) {
				event.preventDefault();
			}

		}

		/**
		 * Handler for the 'touchend' event.
		 */
		function onTouchEnd(event) {

			touch.captured = false;

		}

		/**
		 * Convert pointer down to touch start.
		 */
		function onPointerDown(event) {

			if (event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch") {
				event.touches = [{
					clientX: event.clientX,
					clientY: event.clientY
				}];
				onTouchStart(event);
			}

		}

		/**
		 * Convert pointer move to touch move.
		 */
		function onPointerMove(event) {

			if (event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch") {
				event.touches = [{
					clientX: event.clientX,
					clientY: event.clientY
				}];
				onTouchMove(event);
			}

		}

		/**
		 * Convert pointer up to touch end.
		 */
		function onPointerUp(event) {

			if (event.pointerType === event.MSPOINTER_TYPE_TOUCH || event.pointerType === "touch") {
				event.touches = [{
					clientX: event.clientX,
					clientY: event.clientY
				}];
				onTouchEnd(event);
			}

		}

		/**
		 * Handles mouse wheel scrolling, throttled to avoid skipping
		 * multiple slides.
		 */
		function onDocumentMouseScroll(event) {

			if (Date.now() - lastMouseWheelStep > 600) {

				lastMouseWheelStep = Date.now();

				var delta = event.detail || -event.wheelDelta;
				if (delta > 0) {
					navigateNext();
				} else {
					navigatePrev();
				}

			}

		}

		/**
		 * Clicking on the progress bar results in a navigation to the
		 * closest approximate horizontal slide using this equation:
		 *
		 * ( clickX / presentationWidth ) * numberOfSlides
		 */
		function onProgressClicked(event) {

			onUserInput(event);

			event.preventDefault();

			var slidesTotal = toArray(dom.wrapper.querySelectorAll(HORIZONTAL_SLIDES_SELECTOR)).length;
			var slideIndex = Math.floor((event.clientX / dom.wrapper.offsetWidth) * slidesTotal);

			if (config.rtl) {
				slideIndex = slidesTotal - slideIndex;
			}

			slide(slideIndex);

		}

		/**
		 * Event handler for navigation control buttons.
		 */
		function onNavigateLeftClicked(event) {
			event.preventDefault();
			onUserInput();
			navigateLeft();
		}

		function onNavigateRightClicked(event) {
			event.preventDefault();
			onUserInput();
			navigateRight();
		}

		function onNavigateUpClicked(event) {
			event.preventDefault();
			onUserInput();
			navigateUp();
		}

		function onNavigateDownClicked(event) {
			event.preventDefault();
			onUserInput();
			navigateDown();
		}

		function onNavigatePrevClicked(event) {
			event.preventDefault();
			onUserInput();
			navigatePrev();
		}

		function onNavigateNextClicked(event) {
			event.preventDefault();
			onUserInput();
			navigateNext();
		}

		/**
		 * Handler for the window level 'hashchange' event.
		 */
		function onWindowHashChange(event) {

			readURL();

		}

		/**
		 * Handler for the window level 'resize' event.
		 */
		function onWindowResize(event) {

			layout();

		}

		/**
		 * Handle for the window level 'visibilitychange' event.
		 */
		function onPageVisibilityChange(event) {

			var isHidden = document.webkitHidden ||
				document.msHidden ||
				document.hidden;

			// If, after clicking a link or similar and we're coming back,
			// focus the document.body to ensure we can use keyboard shortcuts
			if (isHidden === false && document.activeElement !== document.body) {
				// Not all elements support .blur() - SVGs among them.
				if (typeof document.activeElement.blur === 'function') {
					document.activeElement.blur();
				}
				document.body.focus();
			}

		}

		/**
		 * Invoked when a slide is and we're in the overview.
		 */
		function onOverviewSlideClicked(event) {

			// TODO There's a bug here where the event listeners are not
			// removed after deactivating the overview.
			if (eventsAreBound && isOverview()) {
				event.preventDefault();

				var element = event.target;

				while (element && !element.nodeName.match(/section/gi)) {
					element = element.parentNode;
				}

				if (element && !element.classList.contains('disabled')) {

					deactivateOverview();

					if (element.nodeName.match(/section/gi)) {
						var h = parseInt(element.getAttribute('data-index-h'), 10),
							v = parseInt(element.getAttribute('data-index-v'), 10);

						slide(h, v);
					}

				}
			}

		}

		/**
		 * Handles clicks on links that are set to preview in the
		 * iframe overlay.
		 */
		function onPreviewLinkClicked(event) {

			if (event.currentTarget && event.currentTarget.hasAttribute('href')) {
				var url = event.currentTarget.getAttribute('href');
				if (url) {
					showPreview(url);
					event.preventDefault();
				}
			}

		}

		/**
		 * Handles click on the auto-sliding controls element.
		 */
		function onAutoSlidePlayerClick(event) {

			// Replay
			if (Reveal.isLastSlide() && config.loop === false) {
				slide(0, 0);
				resumeAutoSlide();
			}
			// Resume
			else if (autoSlidePaused) {
				resumeAutoSlide();
			}
			// Pause
			else {
				pauseAutoSlide();
			}

		}


		// --------------------------------------------------------------------//
		// ------------------------ PLAYBACK COMPONENT ------------------------//
		// --------------------------------------------------------------------//


		/**
		 * Constructor for the playback component, which displays
		 * play/pause/progress controls.
		 *
		 * @param {HTMLElement} container The component will append
		 * itself to this
		 * @param {Function} progressCheck A method which will be
		 * called frequently to get the current progress on a range
		 * of 0-1
		 */
		function Playback(container, progressCheck) {

			// Cosmetics
			this.diameter = 100;
			this.diameter2 = this.diameter / 2;
			this.thickness = 6;

			// Flags if we are currently playing
			this.playing = false;

			// Current progress on a 0-1 range
			this.progress = 0;

			// Used to loop the animation smoothly
			this.progressOffset = 1;

			this.container = container;
			this.progressCheck = progressCheck;

			this.canvas = document.createElement('canvas');
			this.canvas.className = 'playback';
			this.canvas.width = this.diameter;
			this.canvas.height = this.diameter;
			this.canvas.style.width = this.diameter2 + 'px';
			this.canvas.style.height = this.diameter2 + 'px';
			this.context = this.canvas.getContext('2d');

			this.container.appendChild(this.canvas);

			this.render();

		}

		Playback.prototype.setPlaying = function(value) {

			var wasPlaying = this.playing;

			this.playing = value;

			// Start repainting if we weren't already
			if (!wasPlaying && this.playing) {
				this.animate();
			} else {
				this.render();
			}

		};

		Playback.prototype.animate = function() {

			var progressBefore = this.progress;

			this.progress = this.progressCheck();

			// When we loop, offset the progress so that it eases
			// smoothly rather than immediately resetting
			if (progressBefore > 0.8 && this.progress < 0.2) {
				this.progressOffset = this.progress;
			}

			this.render();

			if (this.playing) {
				features.requestAnimationFrameMethod.call(window, this.animate.bind(this));
			}

		};

		/**
		 * Renders the current progress and playback state.
		 */
		Playback.prototype.render = function() {

			var progress = this.playing ? this.progress : 0,
				radius = (this.diameter2) - this.thickness,
				x = this.diameter2,
				y = this.diameter2,
				iconSize = 28;

			// Ease towards 1
			this.progressOffset += (1 - this.progressOffset) * 0.1;

			var endAngle = (-Math.PI / 2) + (progress * (Math.PI * 2));
			var startAngle = (-Math.PI / 2) + (this.progressOffset * (Math.PI * 2));

			this.context.save();
			this.context.clearRect(0, 0, this.diameter, this.diameter);

			// Solid background color
			this.context.beginPath();
			this.context.arc(x, y, radius + 4, 0, Math.PI * 2, false);
			this.context.fillStyle = 'rgba( 0, 0, 0, 0.4 )';
			this.context.fill();

			// Draw progress track
			this.context.beginPath();
			this.context.arc(x, y, radius, 0, Math.PI * 2, false);
			this.context.lineWidth = this.thickness;
			this.context.strokeStyle = '#666';
			this.context.stroke();

			if (this.playing) {
				// Draw progress on top of track
				this.context.beginPath();
				this.context.arc(x, y, radius, startAngle, endAngle, false);
				this.context.lineWidth = this.thickness;
				this.context.strokeStyle = '#fff';
				this.context.stroke();
			}

			this.context.translate(x - (iconSize / 2), y - (iconSize / 2));

			// Draw play/pause icons
			if (this.playing) {
				this.context.fillStyle = '#fff';
				this.context.fillRect(0, 0, iconSize / 2 - 4, iconSize);
				this.context.fillRect(iconSize / 2 + 4, 0, iconSize / 2 - 4, iconSize);
			} else {
				this.context.beginPath();
				this.context.translate(4, 0);
				this.context.moveTo(0, 0);
				this.context.lineTo(iconSize - 4, iconSize / 2);
				this.context.lineTo(0, iconSize);
				this.context.fillStyle = '#fff';
				this.context.fill();
			}

			this.context.restore();

		};

		Playback.prototype.on = function(type, listener) {
			this.canvas.addEventListener(type, listener, false);
		};

		Playback.prototype.off = function(type, listener) {
			this.canvas.removeEventListener(type, listener, false);
		};

		Playback.prototype.destroy = function() {

			this.playing = false;

			if (this.canvas.parentNode) {
				this.container.removeChild(this.canvas);
			}

		};


		// --------------------------------------------------------------------//
		// ------------------------------- API --------------------------------//
		// --------------------------------------------------------------------//


		Reveal = {
			VERSION: VERSION,

			initialize: initialize,
			configure: configure,
			sync: sync,

			// Navigation methods
			slide: slide,
			left: navigateLeft,
			right: navigateRight,
			up: navigateUp,
			down: navigateDown,
			prev: navigatePrev,
			next: navigateNext,

			// Fragment methods
			navigateFragment: navigateFragment,
			prevFragment: previousFragment,
			nextFragment: nextFragment,

			// Deprecated aliases
			navigateTo: slide,
			navigateLeft: navigateLeft,
			navigateRight: navigateRight,
			navigateUp: navigateUp,
			navigateDown: navigateDown,
			navigatePrev: navigatePrev,
			navigateNext: navigateNext,

			// Forces an update in slide layout
			layout: layout,

			// Randomizes the order of slides
			shuffle: shuffle,

			// Returns an object with the available routes as booleans (left/right/top/bottom)
			availableRoutes: availableRoutes,

			// Returns an object with the available fragments as booleans (prev/next)
			availableFragments: availableFragments,

			// Toggles the overview mode on/off
			toggleOverview: toggleOverview,

			// Toggles the "black screen" mode on/off
			togglePause: togglePause,

			// Toggles the auto slide mode on/off
			toggleAutoSlide: toggleAutoSlide,

			// State checks
			isOverview: isOverview,
			isPaused: isPaused,
			isAutoSliding: isAutoSliding,

			// Adds or removes all internal event listeners (such as keyboard)
			addEventListeners: addEventListeners,
			removeEventListeners: removeEventListeners,

			// Facility for persisting and restoring the presentation state
			getState: getState,
			setState: setState,

			// Presentation progress on range of 0-1
			getProgress: getProgress,

			// Returns the indices of the current, or specified, slide
			getIndices: getIndices,

			getTotalSlides: getTotalSlides,

			// Returns the slide element at the specified index
			getSlide: getSlide,

			// Returns the slide background element at the specified index
			getSlideBackground: getSlideBackground,

			// Returns the speaker notes string for a slide, or null
			getSlideNotes: getSlideNotes,

			// Returns the previous slide element, may be null
			getPreviousSlide: function() {
				return previousSlide;
			},

			// Returns the current slide element
			getCurrentSlide: function() {
				return currentSlide;
			},

			// Returns the current scale of the presentation content
			getScale: function() {
				return scale;
			},

			// Returns the current configuration object
			getConfig: function() {
				return config;
			},

			// Helper method, retrieves query string as a key/value hash
			getQueryHash: function() {
				var query = {};

				location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi, function(a) {
					query[a.split('=').shift()] = a.split('=').pop();
				});

				// Basic deserialization
				for (var i in query) {
					var value = query[i];

					query[i] = deserialize(unescape(value));
				}

				return query;
			},

			// Returns true if we're currently on the first slide
			isFirstSlide: function() {
				return (indexh === 0 && indexv === 0);
			},

			// Returns true if we're currently on the last slide
			isLastSlide: function() {
				if (currentSlide) {
					// Does this slide has next a sibling?
					if (currentSlide.nextElementSibling) return false;

					// If it's vertical, does its parent have a next sibling?
					if (isVerticalSlide(currentSlide) && currentSlide.parentNode.nextElementSibling) return false;

					return true;
				}

				return false;
			},

			// Checks if reveal.js has been loaded and is ready for use
			isReady: function() {
				return loaded;
			},

			// Forward event binding to the reveal DOM element
			addEventListener: function(type, listener, useCapture) {
				if ('addEventListener' in window) {
					(dom.wrapper || document.querySelector('.reveal')).addEventListener(type, listener, useCapture);
				}
			},
			removeEventListener: function(type, listener, useCapture) {
				if ('addEventListener' in window) {
					(dom.wrapper || document.querySelector('.reveal')).removeEventListener(type, listener, useCapture);
				}
			},

			// Programatically triggers a keyboard event
			triggerKey: function(keyCode) {
				onDocumentKeyDown({
					keyCode: keyCode
				});
			},

			// Registers a new shortcut to include in the help overlay
			registerKeyboardShortcut: function(key, value) {
				keyboardShortcuts[key] = value;
			}
		};

		return Reveal;

	}));

/***/ },

/***/ 23:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 */
	(function() {
		function e(e) {
			this.tokens = [], this.tokens.links = {}, this.options = e || a.defaults, this.rules = p.normal, this.options.gfm && (this.rules = this.options.tables ? p.tables : p.gfm)
		}

		function t(e, t) {
			if (this.options = t || a.defaults, this.links = e, this.rules = u.normal, this.renderer = this.options.renderer || new n, this.renderer.options = this.options, !this.links) throw new Error("Tokens array requires a `links` property.");
			this.options.gfm ? this.rules = this.options.breaks ? u.breaks : u.gfm : this.options.pedantic && (this.rules = u.pedantic)
		}

		function n(e) {
			this.options = e || {}
		}

		function r(e) {
			this.tokens = [], this.token = null, this.options = e || a.defaults, this.options.renderer = this.options.renderer || new n, this.renderer = this.options.renderer, this.renderer.options = this.options
		}

		function s(e, t) {
			return e.replace(t ? /&/g : /&(?!#?\w+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
		}

		function i(e) {
			return e.replace(/&([#\w]+);/g, function(e, t) {
				return t = t.toLowerCase(), "colon" === t ? ":" : "#" === t.charAt(0) ? String.fromCharCode("x" === t.charAt(1) ? parseInt(t.substring(2), 16) : +t.substring(1)) : ""
			})
		}

		function l(e, t) {
			return e = e.source, t = t || "",
				function n(r, s) {
					return r ? (s = s.source || s, s = s.replace(/(^|[^\[])\^/g, "$1"), e = e.replace(r, s), n) : new RegExp(e, t)
				}
		}

		function o() {}

		function h(e) {
			for (var t, n, r = 1; r < arguments.length; r++) {
				t = arguments[r];
				for (n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
			}
			return e
		}

		function a(t, n, i) {
			if (i || "function" == typeof n) {
				i || (i = n, n = null), n = h({}, a.defaults, n || {});
				var l, o, p = n.highlight,
					u = 0;
				try {
					l = e.lex(t, n)
				} catch (c) {
					return i(c)
				}
				o = l.length;
				var g = function(e) {
					if (e) return n.highlight = p, i(e);
					var t;
					try {
						t = r.parse(l, n)
					} catch (s) {
						e = s
					}
					return n.highlight = p, e ? i(e) : i(null, t)
				};
				if (!p || p.length < 3) return g();
				if (delete n.highlight, !o) return g();
				for (; u < l.length; u++) ! function(e) {
					return "code" !== e.type ? --o || g() : p(e.text, e.lang, function(t, n) {
						return t ? g(t) : null == n || n === e.text ? --o || g() : (e.text = n, e.escaped = !0, void(--o || g()))
					})
				}(l[u])
			} else try {
				return n && (n = h({}, a.defaults, n)), r.parse(e.lex(t, n), n)
			} catch (c) {
				if (c.message += "\nPlease report this to https://github.com/chjj/marked.", (n || a.defaults).silent) return "<p>An error occured:</p><pre>" + s(c.message + "", !0) + "</pre>";
				throw c
			}
		}
		var p = {
			newline: /^\n+/,
			code: /^( {4}[^\n]+\n*)+/,
			fences: o,
			hr: /^( *[-*_]){3,} *(?:\n+|$)/,
			heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
			nptable: o,
			lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
			blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
			list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
			html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
			def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
			table: o,
			paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
			text: /^[^\n]+/
		};
		p.bullet = /(?:[*+-]|\d+\.)/, p.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/, p.item = l(p.item, "gm")(/bull/g, p.bullet)(), p.list = l(p.list)(/bull/g, p.bullet)("hr", "\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def", "\\n+(?=" + p.def.source + ")")(), p.blockquote = l(p.blockquote)("def", p.def)(), p._tag = "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b", p.html = l(p.html)("comment", /<!--[\s\S]*?-->/)("closed", /<(tag)[\s\S]+?<\/\1>/)("closing", /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, p._tag)(), p.paragraph = l(p.paragraph)("hr", p.hr)("heading", p.heading)("lheading", p.lheading)("blockquote", p.blockquote)("tag", "<" + p._tag)("def", p.def)(), p.normal = h({}, p), p.gfm = h({}, p.normal, {
			fences: /^ *(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
			paragraph: /^/
		}), p.gfm.paragraph = l(p.paragraph)("(?!", "(?!" + p.gfm.fences.source.replace("\\1", "\\2") + "|" + p.list.source.replace("\\1", "\\3") + "|")(), p.tables = h({}, p.gfm, {
			nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
			table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
		}), e.rules = p, e.lex = function(t, n) {
			var r = new e(n);
			return r.lex(t)
		}, e.prototype.lex = function(e) {
			return e = e.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n"), this.token(e, !0)
		}, e.prototype.token = function(e, t, n) {
			for (var r, s, i, l, o, h, a, u, c, e = e.replace(/^ +$/gm, ""); e;)
				if ((i = this.rules.newline.exec(e)) && (e = e.substring(i[0].length), i[0].length > 1 && this.tokens.push({
						type: "space"
					})), i = this.rules.code.exec(e)) e = e.substring(i[0].length), i = i[0].replace(/^ {4}/gm, ""), this.tokens.push({
					type: "code",
					text: this.options.pedantic ? i : i.replace(/\n+$/, "")
				});
				else if (i = this.rules.fences.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: "code",
				lang: i[2],
				text: i[3]
			});
			else if (i = this.rules.heading.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: "heading",
				depth: i[1].length,
				text: i[2]
			});
			else if (t && (i = this.rules.nptable.exec(e))) {
				for (e = e.substring(i[0].length), h = {
						type: "table",
						header: i[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
						align: i[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
						cells: i[3].replace(/\n$/, "").split("\n")
					}, u = 0; u < h.align.length; u++) h.align[u] = /^ *-+: *$/.test(h.align[u]) ? "right" : /^ *:-+: *$/.test(h.align[u]) ? "center" : /^ *:-+ *$/.test(h.align[u]) ? "left" : null;
				for (u = 0; u < h.cells.length; u++) h.cells[u] = h.cells[u].split(/ *\| */);
				this.tokens.push(h)
			} else if (i = this.rules.lheading.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: "heading",
				depth: "=" === i[2] ? 1 : 2,
				text: i[1]
			});
			else if (i = this.rules.hr.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: "hr"
			});
			else if (i = this.rules.blockquote.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: "blockquote_start"
			}), i = i[0].replace(/^ *> ?/gm, ""), this.token(i, t, !0), this.tokens.push({
				type: "blockquote_end"
			});
			else if (i = this.rules.list.exec(e)) {
				for (e = e.substring(i[0].length), l = i[2], this.tokens.push({
						type: "list_start",
						ordered: l.length > 1
					}), i = i[0].match(this.rules.item), r = !1, c = i.length, u = 0; c > u; u++) h = i[u], a = h.length, h = h.replace(/^ *([*+-]|\d+\.) +/, ""), ~h.indexOf("\n ") && (a -= h.length, h = this.options.pedantic ? h.replace(/^ {1,4}/gm, "") : h.replace(new RegExp("^ {1," + a + "}", "gm"), "")), this.options.smartLists && u !== c - 1 && (o = p.bullet.exec(i[u + 1])[0], l === o || l.length > 1 && o.length > 1 || (e = i.slice(u + 1).join("\n") + e, u = c - 1)), s = r || /\n\n(?!\s*$)/.test(h), u !== c - 1 && (r = "\n" === h.charAt(h.length - 1), s || (s = r)), this.tokens.push({
					type: s ? "loose_item_start" : "list_item_start"
				}), this.token(h, !1, n), this.tokens.push({
					type: "list_item_end"
				});
				this.tokens.push({
					type: "list_end"
				})
			} else if (i = this.rules.html.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: this.options.sanitize ? "paragraph" : "html",
				pre: "pre" === i[1] || "script" === i[1] || "style" === i[1],
				text: i[0]
			});
			else if (!n && t && (i = this.rules.def.exec(e))) e = e.substring(i[0].length), this.tokens.links[i[1].toLowerCase()] = {
				href: i[2],
				title: i[3]
			};
			else if (t && (i = this.rules.table.exec(e))) {
				for (e = e.substring(i[0].length), h = {
						type: "table",
						header: i[1].replace(/^ *| *\| *$/g, "").split(/ *\| */),
						align: i[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
						cells: i[3].replace(/(?: *\| *)?\n$/, "").split("\n")
					}, u = 0; u < h.align.length; u++) h.align[u] = /^ *-+: *$/.test(h.align[u]) ? "right" : /^ *:-+: *$/.test(h.align[u]) ? "center" : /^ *:-+ *$/.test(h.align[u]) ? "left" : null;
				for (u = 0; u < h.cells.length; u++) h.cells[u] = h.cells[u].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */);
				this.tokens.push(h)
			} else if (t && (i = this.rules.paragraph.exec(e))) e = e.substring(i[0].length), this.tokens.push({
				type: "paragraph",
				text: "\n" === i[1].charAt(i[1].length - 1) ? i[1].slice(0, -1) : i[1]
			});
			else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), this.tokens.push({
				type: "text",
				text: i[0]
			});
			else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0));
			return this.tokens
		};
		var u = {
			escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
			autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
			url: o,
			tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
			link: /^!?\[(inside)\]\(href\)/,
			reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
			nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
			strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
			em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
			code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
			br: /^ {2,}\n(?!\s*$)/,
			del: o,
			text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
		};
		u._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/, u._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/, u.link = l(u.link)("inside", u._inside)("href", u._href)(), u.reflink = l(u.reflink)("inside", u._inside)(), u.normal = h({}, u), u.pedantic = h({}, u.normal, {
			strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
			em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
		}), u.gfm = h({}, u.normal, {
			escape: l(u.escape)("])", "~|])")(),
			url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
			del: /^~~(?=\S)([\s\S]*?\S)~~/,
			text: l(u.text)("]|", "~]|")("|", "|https?://|")()
		}), u.breaks = h({}, u.gfm, {
			br: l(u.br)("{2,}", "*")(),
			text: l(u.gfm.text)("{2,}", "*")()
		}), t.rules = u, t.output = function(e, n, r) {
			var s = new t(n, r);
			return s.output(e)
		}, t.prototype.output = function(e) {
			for (var t, n, r, i, l = ""; e;)
				if (i = this.rules.escape.exec(e)) e = e.substring(i[0].length), l += i[1];
				else if (i = this.rules.autolink.exec(e)) e = e.substring(i[0].length), "@" === i[2] ? (n = this.mangle(":" === i[1].charAt(6) ? i[1].substring(7) : i[1]), r = this.mangle("mailto:") + n) : (n = s(i[1]), r = n), l += this.renderer.link(r, null, n);
			else if (this.inLink || !(i = this.rules.url.exec(e))) {
				if (i = this.rules.tag.exec(e)) !this.inLink && /^<a /i.test(i[0]) ? this.inLink = !0 : this.inLink && /^<\/a>/i.test(i[0]) && (this.inLink = !1), e = e.substring(i[0].length), l += this.options.sanitize ? s(i[0]) : i[0];
				else if (i = this.rules.link.exec(e)) e = e.substring(i[0].length), this.inLink = !0, l += this.outputLink(i, {
					href: i[2],
					title: i[3]
				}), this.inLink = !1;
				else if ((i = this.rules.reflink.exec(e)) || (i = this.rules.nolink.exec(e))) {
					if (e = e.substring(i[0].length), t = (i[2] || i[1]).replace(/\s+/g, " "), t = this.links[t.toLowerCase()], !t || !t.href) {
						l += i[0].charAt(0), e = i[0].substring(1) + e;
						continue
					}
					this.inLink = !0, l += this.outputLink(i, t), this.inLink = !1
				} else if (i = this.rules.strong.exec(e)) e = e.substring(i[0].length), l += this.renderer.strong(this.output(i[2] || i[1]));
				else if (i = this.rules.em.exec(e)) e = e.substring(i[0].length), l += this.renderer.em(this.output(i[2] || i[1]));
				else if (i = this.rules.code.exec(e)) e = e.substring(i[0].length), l += this.renderer.codespan(s(i[2], !0));
				else if (i = this.rules.br.exec(e)) e = e.substring(i[0].length), l += this.renderer.br();
				else if (i = this.rules.del.exec(e)) e = e.substring(i[0].length), l += this.renderer.del(this.output(i[1]));
				else if (i = this.rules.text.exec(e)) e = e.substring(i[0].length), l += s(this.smartypants(i[0]));
				else if (e) throw new Error("Infinite loop on byte: " + e.charCodeAt(0))
			} else e = e.substring(i[0].length), n = s(i[1]), r = n, l += this.renderer.link(r, null, n);
			return l
		}, t.prototype.outputLink = function(e, t) {
			var n = s(t.href),
				r = t.title ? s(t.title) : null;
			return "!" !== e[0].charAt(0) ? this.renderer.link(n, r, this.output(e[1])) : this.renderer.image(n, r, s(e[1]))
		}, t.prototype.smartypants = function(e) {
			return this.options.smartypants ? e.replace(/--/g, "—").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…") : e
		}, t.prototype.mangle = function(e) {
			for (var t, n = "", r = e.length, s = 0; r > s; s++) t = e.charCodeAt(s), Math.random() > .5 && (t = "x" + t.toString(16)), n += "&#" + t + ";";
			return n
		}, n.prototype.code = function(e, t, n) {
			if (this.options.highlight) {
				var r = this.options.highlight(e, t);
				null != r && r !== e && (n = !0, e = r)
			}
			return t ? '<pre><code class="' + this.options.langPrefix + s(t, !0) + '">' + (n ? e : s(e, !0)) + "\n</code></pre>\n" : "<pre><code>" + (n ? e : s(e, !0)) + "\n</code></pre>"
		}, n.prototype.blockquote = function(e) {
			return "<blockquote>\n" + e + "</blockquote>\n"
		}, n.prototype.html = function(e) {
			return e
		}, n.prototype.heading = function(e, t, n) {
			return "<h" + t + ' id="' + this.options.headerPrefix + n.toLowerCase().replace(/[^\w]+/g, "-") + '">' + e + "</h" + t + ">\n"
		}, n.prototype.hr = function() {
			return this.options.xhtml ? "<hr/>\n" : "<hr>\n"
		}, n.prototype.list = function(e, t) {
			var n = t ? "ol" : "ul";
			return "<" + n + ">\n" + e + "</" + n + ">\n"
		}, n.prototype.listitem = function(e) {
			return "<li>" + e + "</li>\n"
		}, n.prototype.paragraph = function(e) {
			return "<p>" + e + "</p>\n"
		}, n.prototype.table = function(e, t) {
			return "<table>\n<thead>\n" + e + "</thead>\n<tbody>\n" + t + "</tbody>\n</table>\n"
		}, n.prototype.tablerow = function(e) {
			return "<tr>\n" + e + "</tr>\n"
		}, n.prototype.tablecell = function(e, t) {
			var n = t.header ? "th" : "td",
				r = t.align ? "<" + n + ' style="text-align:' + t.align + '">' : "<" + n + ">";
			return r + e + "</" + n + ">\n"
		}, n.prototype.strong = function(e) {
			return "<strong>" + e + "</strong>"
		}, n.prototype.em = function(e) {
			return "<em>" + e + "</em>"
		}, n.prototype.codespan = function(e) {
			return "<code>" + e + "</code>"
		}, n.prototype.br = function() {
			return this.options.xhtml ? "<br/>" : "<br>"
		}, n.prototype.del = function(e) {
			return "<del>" + e + "</del>"
		}, n.prototype.link = function(e, t, n) {
			if (this.options.sanitize) {
				try {
					var r = decodeURIComponent(i(e)).replace(/[^\w:]/g, "").toLowerCase()
				} catch (s) {
					return ""
				}
				if (0 === r.indexOf("javascript:") || 0 === r.indexOf("vbscript:")) return ""
			}
			var l = '<a href="' + e + '"';
			return t && (l += ' title="' + t + '"'), l += ">" + n + "</a>"
		}, n.prototype.image = function(e, t, n) {
			var r = '<img src="' + e + '" alt="' + n + '"';
			return t && (r += ' title="' + t + '"'), r += this.options.xhtml ? "/>" : ">"
		}, r.parse = function(e, t, n) {
			var s = new r(t, n);
			return s.parse(e)
		}, r.prototype.parse = function(e) {
			this.inline = new t(e.links, this.options, this.renderer), this.tokens = e.reverse();
			for (var n = ""; this.next();) n += this.tok();
			return n
		}, r.prototype.next = function() {
			return this.token = this.tokens.pop()
		}, r.prototype.peek = function() {
			return this.tokens[this.tokens.length - 1] || 0
		}, r.prototype.parseText = function() {
			for (var e = this.token.text;
				"text" === this.peek().type;) e += "\n" + this.next().text;
			return this.inline.output(e)
		}, r.prototype.tok = function() {
			switch (this.token.type) {
				case "space":
					return "";
				case "hr":
					return this.renderer.hr();
				case "heading":
					return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
				case "code":
					return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
				case "table":
					var e, t, n, r, s, i = "",
						l = "";
					for (n = "", e = 0; e < this.token.header.length; e++) r = {
						header: !0,
						align: this.token.align[e]
					}, n += this.renderer.tablecell(this.inline.output(this.token.header[e]), {
						header: !0,
						align: this.token.align[e]
					});
					for (i += this.renderer.tablerow(n), e = 0; e < this.token.cells.length; e++) {
						for (t = this.token.cells[e], n = "", s = 0; s < t.length; s++) n += this.renderer.tablecell(this.inline.output(t[s]), {
							header: !1,
							align: this.token.align[s]
						});
						l += this.renderer.tablerow(n)
					}
					return this.renderer.table(i, l);
				case "blockquote_start":
					for (var l = "";
						"blockquote_end" !== this.next().type;) l += this.tok();
					return this.renderer.blockquote(l);
				case "list_start":
					for (var l = "", o = this.token.ordered;
						"list_end" !== this.next().type;) l += this.tok();
					return this.renderer.list(l, o);
				case "list_item_start":
					for (var l = "";
						"list_item_end" !== this.next().type;) l += "text" === this.token.type ? this.parseText() : this.tok();
					return this.renderer.listitem(l);
				case "loose_item_start":
					for (var l = "";
						"list_item_end" !== this.next().type;) l += this.tok();
					return this.renderer.listitem(l);
				case "html":
					var h = this.token.pre || this.options.pedantic ? this.token.text : this.inline.output(this.token.text);
					return this.renderer.html(h);
				case "paragraph":
					return this.renderer.paragraph(this.inline.output(this.token.text));
				case "text":
					return this.renderer.paragraph(this.parseText())
			}
		}, o.exec = o, a.options = a.setOptions = function(e) {
			return h(a.defaults, e), a
		}, a.defaults = {
			gfm: !0,
			tables: !0,
			breaks: !1,
			pedantic: !1,
			sanitize: !1,
			smartLists: !1,
			silent: !1,
			highlight: null,
			langPrefix: "lang-",
			smartypants: !1,
			headerPrefix: "",
			renderer: new n,
			xhtml: !1
		}, a.Parser = r, a.parser = r.parse, a.Renderer = n, a.Lexer = e, a.lexer = e.lex, a.InlineLexer = t, a.inlineLexer = t.output, a.parse = a,  true ? module.exports = a : "function" == typeof define && define.amd ? define(function() {
			return a
		}) : this.marked = a
	}).call(function() {
		return this || ("undefined" != typeof window ? window : global)
	}());
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Handles opening of and synchronization with the reveal.js
	 * notes window.
	 *
	 * Handshake process:
	 * 1. This window posts 'connect' to notes window
	 *    - Includes URL of presentation to show
	 * 2. Notes window responds with 'connected' when it is available
	 * 3. This window proceeds to send the current presentation state
	 *    to the notes window
	 */
	var RevealNotes = (function() {
		var Reveal = __webpack_require__(10);
		function openNotes( notesFilePath ) {

			if( !notesFilePath ) {
				// var jsFileLocation = document.querySelector('script[src$="notes.js"]').src;  // this js file path
				// jsFileLocation = jsFileLocation.replace(/notes\.js(\?.*)?$/, '');   // the js folder path
				// notesFilePath = jsFileLocation + 'notes.html';
				notesFilePath = './notes.html';
			}

			var notesPopup = window.open( notesFilePath, 'reveal.js - Notes', 'width=1100,height=700' );

			/**
			 * Connect to the notes window through a postmessage handshake.
			 * Using postmessage enables us to work in situations where the
			 * origins differ, such as a presentation being opened from the
			 * file system.
			 */
			function connect() {
				// Keep trying to connect until we get a 'connected' message back
				var connectInterval = setInterval( function() {
					notesPopup.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'connect',
						url: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search,
						state: Reveal.getState()
					} ), '*' );
				}, 500 );

				window.addEventListener( 'message', function( event ) {
					var data = JSON.parse( event.data );
					if( data && data.namespace === 'reveal-notes' && data.type === 'connected' ) {
						clearInterval( connectInterval );
						onConnected();
					}
				} );
			}

			/**
			 * Posts the current slide data to the notes window
			 */
			function post() {

				var slideElement = Reveal.getCurrentSlide(),
					notesElement = slideElement.querySelector( 'aside.notes' );

				var messageData = {
					namespace: 'reveal-notes',
					type: 'state',
					notes: '',
					markdown: false,
					whitespace: 'normal',
					state: Reveal.getState()
				};

				// Look for notes defined in a slide attribute
				if( slideElement.hasAttribute( 'data-notes' ) ) {
					messageData.notes = slideElement.getAttribute( 'data-notes' );
					messageData.whitespace = 'pre-wrap';
				}

				// Look for notes defined in an aside element
				if( notesElement ) {
					messageData.notes = notesElement.innerHTML;
					messageData.markdown = typeof notesElement.getAttribute( 'data-markdown' ) === 'string';
				}

				notesPopup.postMessage( JSON.stringify( messageData ), '*' );

			}

			/**
			 * Called once we have established a connection to the notes
			 * window.
			 */
			function onConnected() {

				// Monitor events that trigger a change in state
				Reveal.addEventListener( 'slidechanged', post );
				Reveal.addEventListener( 'fragmentshown', post );
				Reveal.addEventListener( 'fragmenthidden', post );
				Reveal.addEventListener( 'overviewhidden', post );
				Reveal.addEventListener( 'overviewshown', post );
				Reveal.addEventListener( 'paused', post );
				Reveal.addEventListener( 'resumed', post );

				// Post the initial state
				post();

			}

			connect();

		}

		if( !/receiver/i.test( window.location.search ) ) {

			// If the there's a 'notes' query set, open directly
			if( window.location.search.match( /(\?|\&)notes/gi ) !== null ) {
				openNotes();
			}

			// Open the notes when the 's' key is hit
			document.addEventListener( 'keydown', function( event ) {
				// Disregard the event if the target is editable or a
				// modifier is present
				if ( document.querySelector( ':focus' ) !== null || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey ) return;

				// Disregard the event if keyboard is disabled
				if ( Reveal.getConfig().keyboard === false ) return;

				if( event.keyCode === 83 ) {
					event.preventDefault();
					openNotes();
				}
			}, false );

			// Show our keyboard shortcut in the reveal.js help overlay
			if( window.Reveal ) Reveal.registerKeyboardShortcut( 'S', 'Speaker notes view' );

		}

		return { open: openNotes };

	})();


/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! jQuery v3.1.0 | (c) jQuery Foundation | jquery.org/license */
	!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.0",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null!=a?a<0?this[a+this.length]:this[a]:f.call(this)},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"label"in b&&b.disabled===a||"form"in b&&b.disabled===a||"form"in b&&b.disabled===!1&&(b.isDisabled===a||b.isDisabled!==!a&&("label"in b||!ea(b))!==a)}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e)}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(_,aa),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=V.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(_,aa),$.test(j[0].type)&&qa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&sa(j),!a)return G.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||$.test(a)&&qa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){if(r.isFunction(b))return r.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return r.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(C.test(b))return r.filter(b,a,c);b=r.filter(b,a)}return r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType})}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/\S+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,
	r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c||"false"!==c&&("null"===c?null:+c+""===c?+c:X.test(c)?JSON.parse(c):c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),Z(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=Z(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var $=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,_=new RegExp("^(?:([+-])=|)("+$+")([a-z%]*)$","i"),aa=["Top","Right","Bottom","Left"],ba=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},ca=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function da(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&_.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var ea={};function fa(a){var b,c=a.ownerDocument,d=a.nodeName,e=ea[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),ea[d]=e,e)}function ga(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ba(d)&&(e[f]=fa(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ga(this,!0)},hide:function(){return ga(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ba(this)?r(this).show():r(this).hide()})}});var ha=/^(?:checkbox|radio)$/i,ia=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ja=/^$|\/(?:java|ecma)script/i,ka={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ka.optgroup=ka.option,ka.tbody=ka.tfoot=ka.colgroup=ka.caption=ka.thead,ka.th=ka.td;function la(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function ma(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var na=/<|&#?\w+;/;function oa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(na.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ia.exec(f)||["",""])[1].toLowerCase(),i=ka[h]||ka._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=la(l.appendChild(f),"script"),j&&ma(g),c){k=0;while(f=g[k++])ja.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var pa=d.documentElement,qa=/^key/,ra=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,sa=/^([^.]*)(?:\.(.+)|)/;function ta(){return!0}function ua(){return!1}function va(){try{return d.activeElement}catch(a){}}function wa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)wa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ua;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(pa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=sa.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;c<h;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?r(e,this).index(i)>-1:r.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==va()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===va()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ta:ua,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:ua,isPropagationStopped:ua,isImmediatePropagationStopped:ua,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ta,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ta,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ta,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&qa.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&ra.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return wa(this,a,b,c,d)},one:function(a,b,c,d){return wa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ua),this.each(function(){r.event.remove(this,a,c,b)})}});var xa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,ya=/<script|<style|<link/i,za=/checked\s*(?:[^=]|=\s*.checked.)/i,Aa=/^true\/(.*)/,Ba=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ca(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Da(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Ea(a){var b=Aa.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Fa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ga(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ha.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ha(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&za.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ha(f,b,c,d)});if(m&&(e=oa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(la(e,"script"),Da),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,la(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Ea),l=0;l<i;l++)j=h[l],ja.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ba,""),k))}return a}function Ia(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(la(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&ma(la(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(xa,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=la(h),f=la(a),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);if(b)if(c)for(f=f||la(a),g=g||la(h),d=0,e=f.length;d<e;d++)Fa(f[d],g[d]);else Fa(a,h);return g=la(h,"script"),g.length>0&&ma(g,!i&&la(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ia(this,a,!0)},remove:function(a){return Ia(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.appendChild(a)}})},prepend:function(){return Ha(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Ca(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ha(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(la(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!ya.test(a)&&!ka[(ia.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(la(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ha(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(la(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ja=/^margin/,Ka=new RegExp("^("+$+")(?!px)[a-z%]+$","i"),La=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",pa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,pa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Ma(a,b,c){var d,e,f,g,h=a.style;return c=c||La(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&Ka.test(g)&&Ja.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Na(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Oa=/^(none|table(?!-c[ea]).+)/,Pa={position:"absolute",visibility:"hidden",display:"block"},Qa={letterSpacing:"0",fontWeight:"400"},Ra=["Webkit","Moz","ms"],Sa=d.createElement("div").style;function Ta(a){if(a in Sa)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ra.length;while(c--)if(a=Ra[c]+b,a in Sa)return a}function Ua(a,b,c){var d=_.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Va(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+aa[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+aa[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+aa[f]+"Width",!0,e))):(g+=r.css(a,"padding"+aa[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+aa[f]+"Width",!0,e)));return g}function Wa(a,b,c){var d,e=!0,f=La(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Ma(a,b,f),(d<0||null==d)&&(d=a.style[b]),Ka.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Va(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Ma(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=_.exec(c))&&e[1]&&(c=da(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ta(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Ma(a,b,d)),"normal"===e&&b in Qa&&(e=Qa[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Oa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Wa(a,b,d):ca(a,Pa,function(){return Wa(a,b,d)})},set:function(a,c,d){var e,f=d&&La(a),g=d&&Va(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=_.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Ua(a,c,g)}}}),r.cssHooks.marginLeft=Na(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Ma(a,"marginLeft"))||a.getBoundingClientRect().left-ca(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+aa[d]+b]=f[d]||f[d-2]||f[0];return e}},Ja.test(a)||(r.cssHooks[a+b].set=Ua)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=La(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Xa(a,b,c,d,e){return new Xa.prototype.init(a,b,c,d,e)}r.Tween=Xa,Xa.prototype={constructor:Xa,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Xa.propHooks[this.prop];return a&&a.get?a.get(this):Xa.propHooks._default.get(this)},run:function(a){var b,c=Xa.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Xa.propHooks._default.set(this),this}},Xa.prototype.init.prototype=Xa.prototype,Xa.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Xa.propHooks.scrollTop=Xa.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Xa.prototype.init,r.fx.step={};var Ya,Za,$a=/^(?:toggle|show|hide)$/,_a=/queueHooks$/;function ab(){Za&&(a.requestAnimationFrame(ab),r.fx.tick())}function bb(){return a.setTimeout(function(){Ya=void 0}),Ya=r.now()}function cb(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=aa[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function db(a,b,c){for(var d,e=(gb.tweeners[b]||[]).concat(gb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function eb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ba(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],$a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ga([a],!0),j=a.style.display||j,k=r.css(a,"display"),ga([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ga([a],!0),m.done(function(){p||ga([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=db(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function fb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function gb(a,b,c){var d,e,f=0,g=gb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Ya||bb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Ya||bb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(fb(k,j.opts.specialEasing);f<g;f++)if(d=gb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,db,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(gb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return da(c.elem,a,_.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],gb.tweeners[c]=gb.tweeners[c]||[],gb.tweeners[c].unshift(b)},prefilters:[eb],prefilter:function(a,b){b?gb.prefilters.unshift(a):gb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:e.duration="number"==typeof e.duration?e.duration:e.duration in r.fx.speeds?r.fx.speeds[e.duration]:r.fx.speeds._default,null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ba).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=gb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&_a.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(cb(b,!0),a,d,e)}}),r.each({slideDown:cb("show"),slideUp:cb("hide"),slideToggle:cb("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Ya=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Ya=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){Za||(Za=a.requestAnimationFrame?a.requestAnimationFrame(ab):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame(Za):a.clearInterval(Za),Za=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var hb,ib=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?hb:void 0)),void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);
	if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),hb={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=ib[b]||r.find.attr;ib[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=ib[g],ib[g]=e,e=null!=c(a,b,d)?g:null,ib[g]=f),e}});var jb=/^(?:input|select|textarea|button)$/i,kb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):jb.test(a.nodeName)||kb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});var lb=/[\t\r\n\f]/g;function mb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,mb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,mb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=mb(c),d=1===c.nodeType&&(" "+e+" ").replace(lb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=r.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,mb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=mb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(c)+" ").replace(lb," ").indexOf(b)>-1)return!0;return!1}});var nb=/\r/g,ob=/[\x20\t\r\n\f]+/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(nb,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:r.trim(r.text(a)).replace(ob," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type,g=f?null:[],h=f?e+1:d.length,i=e<0?h:f?e:0;i<h;i++)if(c=d[i],(c.selected||i===e)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ha.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,""),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=oa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=r.trim(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||pa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Na(o.pixelPosition,function(a,c){if(c)return c=Ma(a,b),Ka.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"=="function"&&__webpack_require__(23)&&!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return r}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});


/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./src/css/bootstrap.min.css": 52
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 39;


/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./src/css/custom.css": 53
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 40;


/***/ },

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./src/css/font-awesome.min.css": 54
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 41;


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./src/css/reveal.css": 57
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 44;


/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./src/detail.js": 106
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 45;


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./src/plugin/highlight/atom-one-dark.min.css": 58
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 48;


/***/ },

/***/ 52:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 53:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 54:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 57:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 58:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 106:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(109);

	var $ = __webpack_require__(38);
	var Reveal = __webpack_require__(10);

	var screenfull = __webpack_require__(107);
	var hljs = __webpack_require__(112);

	__webpack_require__(25);

	__webpack_require__(114);

	Reveal.extend = __webpack_require__(108);
	var app = (function() {
	  var defaultTheme = 'vue';
	  var initDom = function() {
	    var getUrlParam = function(name) {
	      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	      var r = encodeURI(window.location.search).substr(1).match(reg);
	      if (r !== null) return decodeURI(r[2]);
	      return null;
	    };

	    const getQueryObj = function() {
	      var obj = {
	        file: getUrlParam('file'),
	        title: decodeURI(getUrlParam('title')),
	        theme: getUrlParam('theme')
	      };
	      if (obj.theme === null) {
	        obj.theme = defaultTheme;
	      }
	      obj.theme = 'tools/css/theme/' + obj.theme + '.css';
	      obj.file = './markdown/' + obj.file + '.md';
	      obj.print = window.location.search.match(/print-pdf/gi) ? 'tools/css/print/pdf.css' : 'tools/css/print/paper.css';
	      return obj;
	    };

	    // let node = document.getElementById('stage');
	    let node = document.getElementsByTagName('section')[0];
	    let queryObj = getQueryObj();
	    document.title = queryObj.title;
	    document.getElementById('theme').setAttribute('href', queryObj.theme);
	    //打印PDF
	    document.getElementById('print').setAttribute('href', queryObj.print);
	    node.dataset.markdown = queryObj.file;

	    __webpack_require__(113);
	    hljs.initHighlightingOnLoad();

	  };

	  var appendThemeList = function() {

	    var getDate = function() {
	      var jsRight = function(sr, rightn) {
	        return sr.substring(sr.length - rightn, sr.length);
	      };
	      var date = new Date();
	      var a = date.getFullYear();
	      var b = jsRight(('0' + (date.getMonth() + 1)), 2);
	      var c = jsRight(('0' + date.getDate()), 2);
	      return a + '-' + b + '-' + c;
	    };

	    var date = '<h4>' + getDate() + '</h4>';
	    var styleList = ['white', 'league', 'sky', 'beige', 'simple', 'serif', 'blood', 'night', 'moon', 'solarized', 'lowpoly', 'lowpolydark', 'black', 'color', 'blue', 'green', 'vue'];
	    styleList = styleList.map(function(item) {
	      return '<a href="#" name="theme" onclick="document.getElementById(\'theme\').setAttribute(\'href\',\'tools/css/theme/' + item + '.css\'); return false;">' + item + '</a>';
	    });
	    var str = `
	    <div style="margin-top:40px; font-Size:14pt;">请选择主题: <br>
	      ${styleList.join(' - ')}
	    </div>`;
	    $('section').first().append(date + str);
	  };

	  var slideStarted = 0;
	  var isFullScreen = false;
	  var clock = function() {
	    var iMinute, iSecond;
	    slideStarted++;
	    slideStarted = slideStarted % 3600;
	    iMinute = parseInt(slideStarted / 60);
	    iSecond = slideStarted % 60;
	    var strTime = ("0" + iMinute).substring(("0" + iMinute).length - 2) + ":" + ("0" + iSecond).substring(("0" + iSecond).length - 2);
	    $("#clock").text(strTime);
	  };

	  var nextPage = function() {
	    startTimer();
	    Reveal.next();
	  };

	  var enterFullscreen = function() {

	    var element = document.body;
	    // Check which implementation is available
	    var requestMethod = element.requestFullScreen ||
	      element.webkitRequestFullscreen ||
	      element.webkitRequestFullScreen ||
	      element.mozRequestFullScreen ||
	      element.msRequestFullscreen;
	    if (requestMethod) {
	      requestMethod.apply(element);
	    }
	  };

	  var startTimer = function() {
	    if (slideStarted === 0) {
	      setInterval(clock, 1000);
	    }
	    if (!isFullScreen) {
	      enterFullscreen();
	      isFullScreen = true;
	    }
	  };

	  $('body').on('keydown', function(event) {
	    var keyName = event.key;
	    var key = event.keyCode;
	    console.log(key + ':' + keyName);
	    if (key == 27) {
	      isFullScreen = false;
	    } else if (keyName != 'Control' &&
	      keyName != 'F12' &&
	      keyName != 'F5' &&
	      keyName != 'Alt') {

	      enterFullscreen();
	    }
	  });

	  var option = {
	    width: 960,
	    height: 700,

	    // Factor of the display size that should remain empty around the content
	    margin: 0.1,

	    center: true,

	    // Bounds for smallest/largest possible scale to apply to content
	    minScale: 0.2,
	    maxScale: 1.5,

	    history: true,
	    mouseWheel: true, //鼠标滚动

	    // Opens links in an iframe preview overlay
	    previewLinks: true,

	    transition: 'slide', // none/fade/slide/convex/concave/zoom/default
	    // Number of slides away from the current that are visible
	    viewDistance: 3,

	    slideNumber: 'c/t',
	    backgroundTransition: 'slide', // none/fade/slide/convex/concave/zoom
	    //parallaxBackgroundImage: './tools/img/LowPolly.png',
	    keyboard: {
	      //空格：翻页并开始计时
	      32: nextPage,
	      //W:宽屏
	      87: function() {
	        $('.slides').toggleClass('layout-widescreen');
	      },
	      //P：进入画笔
	      80: function() {
	        Reveal.extend.showPaint();
	      },
	      //C: 清空画笔
	      67: function() {
	        Reveal.extend.removePaint();
	      },
	      27: function() {
	        Reveal.extend.removePaint();
	      }
	    }
	  };

	  var fixImgFolder = function() {
	    //MD文件默认图片目录
	    var DEFAULT_SLIDE_IMG_CONTENT = $('section').first().attr('data-img-content') || 'markdown';
	    var obj = $('section [data-markdown-parsed="true"] img');
	    var imgSrc = obj.attr('src').replace('./', './' + DEFAULT_SLIDE_IMG_CONTENT + '/');
	    obj.attr('src', imgSrc);
	  };

	  function fullImg() {
	    //图片处理
	    var img = $('section [data-markdown-parsed="true"] img');
	    var imgList = [];
	    for (var i = 0; i < img.length; i++) {
	      imgList.push(img[i]);
	    }
	    screenfull(imgList);
	  }

	  document.addEventListener('DOMContentLoaded', function(){
	    initDom();
	    Reveal.initialize(option);
	  }, false);

	  Reveal.addEventListener('ready', function(event) {
	    appendThemeList();
	    fullImg(); //图片全屏
	    //fixImgFolder();
	  });

	})();

/***/ },

/***/ 107:
/***/ function(module, exports) {

	    var sf = function($imgs) {
	        $imgs.forEach(function($img) {
	            $img.addEventListener('click', function() {
	                show(this);
	            }, false);
	        });
	    };

	    function show(t) {
	        var img = document.createElement('img');
	        img.src = t.src;
	        img.className = 'transparent';
	        $layer.innerHTML = '';
	        img.onload = function() {
	            img.style.height = this.height + 'px';
	            var top = this.height > $body.clientHeight ? 0 : ($body.clientHeight - this.height) / 2;
	            img.style.top = top + 'px';
	            img.style.marginLeft = -this.width / 2 + 'px';
	            img.classList.remove('transparent');
	            img.onload = null;
	        };
	        img.style.cssText = 'max-height:' + $body.clientHeight + 'px;max-width:' + $body.clientWidth + 'px;';
	        $layer.appendChild(img);
	        $layer.style.display = 'block';
	        setTimeout(function() {
	            $layer.classList.remove('transparent');
	        }, 0);
	    }

	    var $layer = document.createElement('div');
	    $layer.className = 'img-full transparent';
	    // $layer.innerHTML = '<img src="http://paulmason.name/media/demos/full-screen-background-image/background.jpg" />';
	    $layer.addEventListener('click', function() {
	        $layer.style.display = 'none';
	        $layer.classList.add('transparent');
	    }, false);
	    var $body = document.body || document.getElementsByTagName('body')[0];
	    $body.appendChild($layer);

	    module.exports = sf;

/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	    var Reveal = __webpack_require__(10);
	    var $=__webpack_require__(38);
	    var $container = document.getElementsByTagName('section')[0];

	    var $body = document.body;
	    var $doc = document;

	    var $drawBoard; //画板
	    var drawBoardID = 'drawBoard';
	    $drawBoard = document.getElementById(drawBoardID);

	    if ($drawBoard) {
	        $drawBoard.style.display = 'none';
	    }

	    var config = Reveal.getConfig();
	    var slideWidth = config.width;
	    var slideHeight = config.height;


	    /***********画图部分事件处理函数************/
	    //画图前准备

	    function drawCanvasReady() {

	        $drawBoard.context = $drawBoard.getContext('2d');
	        var context = $drawBoard.context;

	        context.lineWidth = 5;
	        //context.lineCap = 'square'; //'round';
	        context.lineJoin = 'round'; //'bevel';
	        context.strokeStyle = 'rgba(255,0,0,0.5)'; //"red";
	    }

	    //显示画板
	    var isControl = false;

	    function showPaint() {
	        //自动播放则不启动画笔
	        if (Reveal.isAutoSliding()) {
	            return;
	        }

	        isControl = true;

	        $drawBoard.width = $body.clientWidth;
	        $drawBoard.height = $body.clientHeight;
	        drawCanvasReady();

	        $drawBoard.style.display = '';
	        $container.style.overflow = 'hidden';

	        $drawBoard.addEventListener('mousedown', pMouseDown, true);
	        $drawBoard.addEventListener('mouseup', pMouseUp, true);
	        $drawBoard.addEventListener('mousemove', pMouseMove, true);
	        //滑动
	        $drawBoard.addEventListener('touchmove', pMouseMove, true);
	        $drawBoard.addEventListener('touchend', pMouseUp, true);
	        $drawBoard.addEventListener('touchcancel', pMouseUp, true);
	        $drawBoard.addEventListener('touchstart', pMouseDown, true);
	        $doc.addEventListener('selectstart', stopSelect, true);
	    }


	    //禁止选中
	    function stopSelect() {
	        return false;
	    }

	    //清除画板内容
	    function clearPaint() {
	        $container.style.overflow = '';
	        $drawBoard.context && $drawBoard.context.clearRect(0, 0, slideWidth, slideHeight);
	        $drawBoard.style.display = 'none';
	        isControl = false;
	    }

	    //删除画板
	    var removePaint = function() {
	        clearPaint();

	        $drawBoard.removeEventListener('mousedown', pMouseDown);
	        $drawBoard.removeEventListener('mouseup', pMouseUp);
	        $drawBoard.removeEventListener('mousemove', pMouseMove);
	        //滑动
	        $drawBoard.removeEventListener('touchstart', pMouseDown);
	        $drawBoard.removeEventListener('touchmove', pMouseMove);
	        $drawBoard.removeEventListener('touchend', pMouseUp);
	        $drawBoard.removeEventListener('touchcancel', pMouseUp);

	        $doc.removeEventListener('selectstart', stopSelect, true);
	    };
	    var pMouseDown = function(e) {
	        $drawBoard.isMouseDown = true;
	        try { //j 触屏画笔
	            var touch = e.targetTouches[0];
	            e = touch;
	        } catch (err) {}
	        //        $drawBoard.iLastX = e.clientX - $drawBoard.offsetLeft + ($win.pageXOffset || $doc.body.scrollLeft || $doc.documentElement.scrollLeft);
	        //        $drawBoard.iLastY = e.clientY - $drawBoard.offsetTop + ($win.pageYOffset || $doc.body.scrollTop || $doc.documentElement.scrollTop);
	        var x = $drawBoard.iLastX = e.layerX || e.offsetX || (e.clientX - $drawBoard.offsetLeft + ($win.pageXOffset || $doc.body.scrollLeft || $doc.documentElement.scrollLeft));
	        var y = $drawBoard.iLastY = e.layerY || e.offsetY || (e.clientY - $drawBoard.offsetTop + ($win.pageYOffset || $doc.body.scrollTop || $doc.documentElement.scrollTop));
	        pPoints.push({
	            x: x,
	            y: y
	        });
	        return false; //j 触屏画笔
	    };

	    var pPoints = [];
	    var pMouseUp = function(e) {
	        $drawBoard.isMouseDown = false;
	        $drawBoard.iLastX = -1;
	        $drawBoard.iLastY = -1;
	        pPoints.length = 0;
	    };
	    $('body').on('controlEvent:paint points', function(data) {
	        var points = data.points;
	        //远程来的屏幕
	        var wh = data.screen;
	        var tOX = wh.width / 2,
	            tOY = wh.height / 2;

	        var width = $body.offsetWidth;
	        var height = $body.offsetHeight;
	        var cOX = width / 2,
	            cOY = height / 2;

	        var iw = width / wh.width;
	        var ih = height / wh.height;

	        var context = $drawBoard.context;
	        if (!context) {
	            return;
	        }
	        context.beginPath();
	        var startX = cOX - (tOX - points[0].x) * iw;
	        var startY = cOY - (tOY - points[0].y) * ih;
	        // console.log(startX, points[0].x, startY, iw, wh);
	        context.moveTo(startX, startY);
	        for (var i = 0, len = points.length; i < len; i++) {
	            context.lineTo(cOX - (tOX - points[i].x) * iw, cOY - (tOY - points[i].y) * ih);
	        }
	        context.stroke();
	    });

	    var pMouseMove = function(e) {
	        var ee = e;
	        if ($drawBoard.isMouseDown) {
	            try { //j 触屏画笔
	                if (typeof e.targetTouches != 'undefined') {
	                    var touch = e.targetTouches[0];
	                    e = touch;
	                }
	            } catch (err) {
	                console.log(err);
	            }
	            //            var iX = e.clientX - $drawBoard.offsetLeft + ($win.pageXOffset || $doc.body.scrollLeft || $doc.documentElement.scrollLeft);
	            //            var iY = e.clientY - $drawBoard.offsetTop + ($win.pageYOffset || $doc.body.scrollTop || $doc.documentElement.scrollTop);
	            var iX = e.layerX || e.offsetX || (e.clientX - $drawBoard.offsetLeft + ($win.pageXOffset || $doc.body.scrollLeft || $doc.documentElement.scrollLeft));
	            var iY = e.layerY || e.offsetY || (e.clientY - $drawBoard.offsetTop + ($win.pageYOffset || $doc.body.scrollTop || $doc.documentElement.scrollTop));
	            var context = $drawBoard.context;
	            context.beginPath();
	            context.moveTo($drawBoard.iLastX, $drawBoard.iLastY);
	            context.lineTo(iX, iY);
	            context.stroke();
	            $drawBoard.iLastX = iX;
	            $drawBoard.iLastY = iY;
	            pPoints.push({
	                x: iX,
	                y: iY
	            });
	            try {
	                ee.preventDefault();
	            } catch (err) {
	                console.log(err);
	            }
	            return false; //j 触屏画笔
	        }
	    };

	    Reveal.addEventListener('slidechanged', function(event) {
	        removePaint();
	    });

	    Reveal.addEventListener('overviewshown', function(event) {
	        removePaint();
	    });

	    $doc.addEventListener('keydown', function(event) {
	        switch (event.keyCode) {
	            case 89:
	                //y
	                if ($drawBoard.context) {
	                    $drawBoard.context.strokeStyle = 'rgba(255,255,0,0.5)'; //pen_yellow
	                }
	                break;
	            case 82:
	                //r
	                if ($drawBoard.context) {
	                    $drawBoard.context.strokeStyle = 'rgba(255,0,0,0.5)'; //pen_red
	                }
	                break;
	            case 71:
	                //g
	                if ($drawBoard.context) {
	                    $drawBoard.context.strokeStyle = 'rgba(0,255,0,0.5)'; //pen_green
	                }
	                break;
	            case 77:
	                //m
	                if ($drawBoard.context) {
	                    $drawBoard.context.strokeStyle = 'rgba(255,0,255,0.5)'; //pen_magenta
	                }
	                break;
	            case 49:
	                //1
	                if ($drawBoard.context) {
	                    $drawBoard.context.lineWidth = 3;
	                }
	                break;
	            case 50:
	                //2
	                if ($drawBoard.context) {
	                    $drawBoard.context.lineWidth = 7;
	                }
	                break;
	            case 51:
	                //3
	                if ($drawBoard.context) {
	                    $drawBoard.context.lineWidth = 11;
	                }
	                break;
	            case 52:
	                //4
	                if ($drawBoard.context) {
	                    $drawBoard.context.lineWidth = 15; //j 笔粗细
	                }
	                break;
	        }
	    });

	    module.exports = {
	        showPaint: showPaint,
	        removePaint: removePaint,
	        isControl: isControl
	    };


/***/ },

/***/ 109:
/***/ function(module, exports) {

	/*! head.core - v1.0.2 */
	(function(n,t){"use strict";function r(n){a[a.length]=n}function k(n){var t=new RegExp(" ?\\b"+n+"\\b");c.className=c.className.replace(t,"")}function p(n,t){for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}function tt(){var t,e,f,o;c.className=c.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");t=n.innerWidth||c.clientWidth;e=n.outerWidth||n.screen.width;u.screen.innerWidth=t;u.screen.outerWidth=e;r("w-"+t);p(i.screens,function(n){t>n?(i.screensCss.gt&&r("gt-"+n),i.screensCss.gte&&r("gte-"+n)):t<n?(i.screensCss.lt&&r("lt-"+n),i.screensCss.lte&&r("lte-"+n)):t===n&&(i.screensCss.lte&&r("lte-"+n),i.screensCss.eq&&r("e-q"+n),i.screensCss.gte&&r("gte-"+n))});f=n.innerHeight||c.clientHeight;o=n.outerHeight||n.screen.height;u.screen.innerHeight=f;u.screen.outerHeight=o;u.feature("portrait",f>t);u.feature("landscape",f<t)}function it(){n.clearTimeout(b);b=n.setTimeout(tt,50)}var y=n.document,rt=n.navigator,ut=n.location,c=y.documentElement,a=[],i={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"},v,u,s,w,o,h,l,d,f,g,nt,e,b;if(n.head_conf)for(v in n.head_conf)n.head_conf[v]!==t&&(i[v]=n.head_conf[v]);u=n[i.head]=function(){u.ready.apply(null,arguments)};u.feature=function(n,t,i){return n?(Object.prototype.toString.call(t)==="[object Function]"&&(t=t.call()),r((t?"":"no-")+n),u[n]=!!t,i||(k("no-"+n),k(n),u.feature()),u):(c.className+=" "+a.join(" "),a=[],u)};u.feature("js",!0);s=rt.userAgent.toLowerCase();w=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(s);u.feature("mobile",w,!0);u.feature("desktop",!w,!0);s=/(chrome|firefox)[ \/]([\w.]+)/.exec(s)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(msie) ([\w.]+)/.exec(s)||/(trident).+rv:(\w.)+/.exec(s)||[];o=s[1];h=parseFloat(s[2]);switch(o){case"msie":case"trident":o="ie";h=y.documentMode||h;break;case"firefox":o="ff";break;case"ipod":case"ipad":case"iphone":o="ios";break;case"webkit":o="safari"}for(u.browser={name:o,version:h},u.browser[o]=!0,l=0,d=i.browsers.length;l<d;l++)for(f in i.browsers[l])if(o===f)for(r(f),g=i.browsers[l][f].min,nt=i.browsers[l][f].max,e=g;e<=nt;e++)h>e?(i.browserCss.gt&&r("gt-"+f+e),i.browserCss.gte&&r("gte-"+f+e)):h<e?(i.browserCss.lt&&r("lt-"+f+e),i.browserCss.lte&&r("lte-"+f+e)):h===e&&(i.browserCss.lte&&r("lte-"+f+e),i.browserCss.eq&&r("eq-"+f+e),i.browserCss.gte&&r("gte-"+f+e));else r("no-"+f);r(o);r(o+parseInt(h,10));i.html5&&o==="ie"&&h<9&&p("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(n){y.createElement(n)});p(ut.pathname.split("/"),function(n,u){if(this.length>2&&this[u+1]!==t)u&&r(this.slice(u,u+1).join("-").toLowerCase()+i.section);else{var f=n||"index",e=f.indexOf(".");e>0&&(f=f.substring(0,e));c.id=f.toLowerCase()+i.page;u||r("root"+i.section)}});u.screen={height:n.screen.height,width:n.screen.width};tt();b=0;n.addEventListener?n.addEventListener("resize",it,!1):n.attachEvent("onresize",it)})(window);
	/*! head.css3 - v1.0.0 */
	(function(n,t){"use strict";function a(n){for(var r in n)if(i[n[r]]!==t)return!0;return!1}function r(n){var t=n.charAt(0).toUpperCase()+n.substr(1),i=(n+" "+c.join(t+" ")+t).split(" ");return!!a(i)}var h=n.document,o=h.createElement("i"),i=o.style,s=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),c="Webkit Moz O ms Khtml".split(" "),l=n.head_conf&&n.head_conf.head||"head",u=n[l],f={gradient:function(){var n="background-image:";return i.cssText=(n+s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));"+n)+s.join("linear-gradient(left top,#eee,#fff);"+n)).slice(0,-n.length),!!i.backgroundImage},rgba:function(){return i.cssText="background-color:rgba(0,0,0,0.5)",!!i.backgroundColor},opacity:function(){return o.style.opacity===""},textshadow:function(){return i.textShadow===""},multiplebgs:function(){i.cssText="background:url(https://),url(https://),red url(https://)";var n=(i.background||"").match(/url/g);return Object.prototype.toString.call(n)==="[object Array]"&&n.length===3},boxshadow:function(){return r("boxShadow")},borderimage:function(){return r("borderImage")},borderradius:function(){return r("borderRadius")},cssreflections:function(){return r("boxReflect")},csstransforms:function(){return r("transform")},csstransitions:function(){return r("transition")},touch:function(){return"ontouchstart"in n},retina:function(){return n.devicePixelRatio>1},fontface:function(){var t=u.browser.name,n=u.browser.version;switch(t){case"ie":return n>=9;case"chrome":return n>=13;case"ff":return n>=6;case"ios":return n>=5;case"android":return!1;case"webkit":return n>=5.1;case"opera":return n>=10;default:return!1}}};for(var e in f)f[e]&&u.feature(e,f[e].call(),!0);u.feature()})(window);
	/*! head.load - v1.0.3 */
	(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);
	/*
	//# sourceMappingURL=head.min.js.map
	*/

/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	/*! highlight.js v9.6.0 | BSD3 License | git.io/hljslicense */
	!function(e){var t="object"==typeof window&&window||"object"==typeof self&&self; true?e(exports):t&&(t.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return t.hljs}))}(function(e){function t(e){return e.replace(/[&<>]/gm,function(e){return L[e]})}function r(e){return e.nodeName.toLowerCase()}function a(e,t){var r=e&&e.exec(t);return r&&0===r.index}function n(e){return C.test(e)}function i(e){var t,r,a,i,s=e.className+" ";if(s+=e.parentNode?e.parentNode.className:"",r=E.exec(s))return y(r[1])?r[1]:"no-highlight";for(s=s.split(/\s+/),t=0,a=s.length;a>t;t++)if(i=s[t],n(i)||y(i))return i}function s(e,t){var r,a={};for(r in e)a[r]=e[r];if(t)for(r in t)a[r]=t[r];return a}function c(e){var t=[];return function a(e,n){for(var i=e.firstChild;i;i=i.nextSibling)3===i.nodeType?n+=i.nodeValue.length:1===i.nodeType&&(t.push({event:"start",offset:n,node:i}),n=a(i,n),r(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:n,node:i}));return n}(e,0),t}function o(e,a,n){function i(){return e.length&&a.length?e[0].offset!==a[0].offset?e[0].offset<a[0].offset?e:a:"start"===a[0].event?e:a:e.length?e:a}function s(e){function a(e){return" "+e.nodeName+'="'+t(e.value)+'"'}u+="<"+r(e)+w.map.call(e.attributes,a).join("")+">"}function c(e){u+="</"+r(e)+">"}function o(e){("start"===e.event?s:c)(e.node)}for(var l=0,u="",d=[];e.length||a.length;){var b=i();if(u+=t(n.substr(l,b[0].offset-l)),l=b[0].offset,b===e){d.reverse().forEach(c);do o(b.splice(0,1)[0]),b=i();while(b===e&&b.length&&b[0].offset===l);d.reverse().forEach(s)}else"start"===b[0].event?d.push(b[0].node):d.pop(),o(b.splice(0,1)[0])}return u+t(n.substr(l))}function l(e){function t(e){return e&&e.source||e}function r(r,a){return new RegExp(t(r),"m"+(e.cI?"i":"")+(a?"g":""))}function a(n,i){if(!n.compiled){if(n.compiled=!0,n.k=n.k||n.bK,n.k){var c={},o=function(t,r){e.cI&&(r=r.toLowerCase()),r.split(" ").forEach(function(e){var r=e.split("|");c[r[0]]=[t,r[1]?Number(r[1]):1]})};"string"==typeof n.k?o("keyword",n.k):N(n.k).forEach(function(e){o(e,n.k[e])}),n.k=c}n.lR=r(n.l||/\w+/,!0),i&&(n.bK&&(n.b="\\b("+n.bK.split(" ").join("|")+")\\b"),n.b||(n.b=/\B|\b/),n.bR=r(n.b),n.e||n.eW||(n.e=/\B|\b/),n.e&&(n.eR=r(n.e)),n.tE=t(n.e)||"",n.eW&&i.tE&&(n.tE+=(n.e?"|":"")+i.tE)),n.i&&(n.iR=r(n.i)),null==n.r&&(n.r=1),n.c||(n.c=[]);var l=[];n.c.forEach(function(e){e.v?e.v.forEach(function(t){l.push(s(e,t))}):l.push("self"===e?n:e)}),n.c=l,n.c.forEach(function(e){a(e,n)}),n.starts&&a(n.starts,i);var u=n.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([n.tE,n.i]).map(t).filter(Boolean);n.t=u.length?r(u.join("|"),!0):{exec:function(){return null}}}}a(e)}function u(e,r,n,i){function s(e,t){var r,n;for(r=0,n=t.c.length;n>r;r++)if(a(t.c[r].bR,e))return t.c[r]}function c(e,t){if(a(e.eR,t)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?c(e.parent,t):void 0}function o(e,t){return!n&&a(t.iR,e)}function b(e,t){var r=v.cI?t[0].toLowerCase():t[0];return e.k.hasOwnProperty(r)&&e.k[r]}function p(e,t,r,a){var n=a?"":R.classPrefix,i='<span class="'+n,s=r?"":B;return i+=e+'">',i+t+s}function m(){var e,r,a,n;if(!N.k)return t(E);for(n="",r=0,N.lR.lastIndex=0,a=N.lR.exec(E);a;)n+=t(E.substr(r,a.index-r)),e=b(N,a),e?(M+=e[1],n+=p(e[0],t(a[0]))):n+=t(a[0]),r=N.lR.lastIndex,a=N.lR.exec(E);return n+t(E.substr(r))}function f(){var e="string"==typeof N.sL;if(e&&!k[N.sL])return t(E);var r=e?u(N.sL,E,!0,x[N.sL]):d(E,N.sL.length?N.sL:void 0);return N.r>0&&(M+=r.r),e&&(x[N.sL]=r.top),p(r.language,r.value,!1,!0)}function g(){C+=null!=N.sL?f():m(),E=""}function _(e){C+=e.cN?p(e.cN,"",!0):"",N=Object.create(e,{parent:{value:N}})}function h(e,t){if(E+=e,null==t)return g(),0;var r=s(t,N);if(r)return r.skip?E+=t:(r.eB&&(E+=t),g(),r.rB||r.eB||(E=t)),_(r,t),r.rB?0:t.length;var a=c(N,t);if(a){var n=N;n.skip?E+=t:(n.rE||n.eE||(E+=t),g(),n.eE&&(E=t));do N.cN&&(C+=B),N.skip||(M+=N.r),N=N.parent;while(N!==a.parent);return a.starts&&_(a.starts,""),n.rE?0:t.length}if(o(t,N))throw new Error('Illegal lexeme "'+t+'" for mode "'+(N.cN||"<unnamed>")+'"');return E+=t,t.length||1}var v=y(e);if(!v)throw new Error('Unknown language: "'+e+'"');l(v);var w,N=i||v,x={},C="";for(w=N;w!==v;w=w.parent)w.cN&&(C=p(w.cN,"",!0)+C);var E="",M=0;try{for(var L,S,A=0;;){if(N.t.lastIndex=A,L=N.t.exec(r),!L)break;S=h(r.substr(A,L.index-A),L[0]),A=L.index+S}for(h(r.substr(A)),w=N;w.parent;w=w.parent)w.cN&&(C+=B);return{r:M,value:C,language:e,top:N}}catch($){if($.message&&-1!==$.message.indexOf("Illegal"))return{r:0,value:t(r)};throw $}}function d(e,r){r=r||R.languages||N(k);var a={r:0,value:t(e)},n=a;return r.filter(y).forEach(function(t){var r=u(t,e,!1);r.language=t,r.r>n.r&&(n=r),r.r>a.r&&(n=a,a=r)}),n.language&&(a.second_best=n),a}function b(e){return R.tabReplace||R.useBR?e.replace(M,function(e,t){return R.useBR&&"\n"===e?"<br>":R.tabReplace?t.replace(/\t/g,R.tabReplace):void 0}):e}function p(e,t,r){var a=t?x[t]:r,n=[e.trim()];return e.match(/\bhljs\b/)||n.push("hljs"),-1===e.indexOf(a)&&n.push(a),n.join(" ").trim()}function m(e){var t,r,a,s,l,m=i(e);n(m)||(R.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e,l=t.textContent,a=m?u(m,l,!0):d(l),r=c(t),r.length&&(s=document.createElementNS("http://www.w3.org/1999/xhtml","div"),s.innerHTML=a.value,a.value=o(r,c(s),l)),a.value=b(a.value),e.innerHTML=a.value,e.className=p(e.className,m,a.language),e.result={language:a.language,re:a.r},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.r}))}function f(e){R=s(R,e)}function g(){if(!g.called){g.called=!0;var e=document.querySelectorAll("pre code");w.forEach.call(e,m)}}function _(){addEventListener("DOMContentLoaded",g,!1),addEventListener("load",g,!1)}function h(t,r){var a=k[t]=r(e);a.aliases&&a.aliases.forEach(function(e){x[e]=t})}function v(){return N(k)}function y(e){return e=(e||"").toLowerCase(),k[e]||k[x[e]]}var w=[],N=Object.keys,k={},x={},C=/^(no-?highlight|plain|text)$/i,E=/\blang(?:uage)?-([\w-]+)\b/i,M=/((^(<[^>]+>|\t|)+|(?:\n)))/gm,B="</span>",R={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},L={"&":"&amp;","<":"&lt;",">":"&gt;"};return e.highlight=u,e.highlightAuto=d,e.fixMarkup=b,e.highlightBlock=m,e.configure=f,e.initHighlighting=g,e.initHighlightingOnLoad=_,e.registerLanguage=h,e.listLanguages=v,e.getLanguage=y,e.inherit=s,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.C=function(t,r,a){var n=e.inherit({cN:"comment",b:t,e:r,c:[]},a||{});return n.c.push(e.PWM),n.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),n},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e.registerLanguage("apache",function(e){var t={cN:"number",b:"[\\$%]\\d+"};return{aliases:["apacheconf"],cI:!0,c:[e.HCM,{cN:"section",b:"</?",e:">"},{cN:"attribute",b:/\w+/,r:0,k:{nomarkup:"order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"},starts:{e:/$/,r:0,k:{literal:"on off all"},c:[{cN:"meta",b:"\\s\\[",e:"\\]$"},{cN:"variable",b:"[\\$%]\\{",e:"\\}",c:["self",t]},t,e.QSM]}}],i:/\S/}}),e.registerLanguage("bash",function(e){var t={cN:"variable",v:[{b:/\$[\w\d#@][\w\d_]*/},{b:/\$\{(.*?)}/}]},r={cN:"string",b:/"/,e:/"/,c:[e.BE,t,{cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]}]},a={cN:"string",b:/'/,e:/'/};return{aliases:["sh","zsh"],l:/-?[a-z\._]+/,k:{keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp",_:"-ne -eq -lt -gt -f -d -e -s -l -a"},c:[{cN:"meta",b:/^#![^\n]+sh\s*$/,r:10},{cN:"function",b:/\w[\w\d_]*\s*\(\s*\)\s*\{/,rB:!0,c:[e.inherit(e.TM,{b:/\w[\w\d_]*/})],r:0},e.HCM,r,a,t]}}),e.registerLanguage("coffeescript",function(e){var t={keyword:"in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",literal:"true false null undefined yes no on off",built_in:"npm require console print module global window document"},r="[A-Za-z$_][0-9A-Za-z$_]*",a={cN:"subst",b:/#\{/,e:/}/,k:t},n=[e.BNM,e.inherit(e.CNM,{starts:{e:"(\\s*/)?",r:0}}),{cN:"string",v:[{b:/'''/,e:/'''/,c:[e.BE]},{b:/'/,e:/'/,c:[e.BE]},{b:/"""/,e:/"""/,c:[e.BE,a]},{b:/"/,e:/"/,c:[e.BE,a]}]},{cN:"regexp",v:[{b:"///",e:"///",c:[a,e.HCM]},{b:"//[gim]*",r:0},{b:/\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]},{b:"@"+r},{b:"`",e:"`",eB:!0,eE:!0,sL:"javascript"}];a.c=n;var i=e.inherit(e.TM,{b:r}),s="(\\(.*\\))?\\s*\\B[-=]>",c={cN:"params",b:"\\([^\\(]",rB:!0,c:[{b:/\(/,e:/\)/,k:t,c:["self"].concat(n)}]};return{aliases:["coffee","cson","iced"],k:t,i:/\/\*/,c:n.concat([e.C("###","###"),e.HCM,{cN:"function",b:"^\\s*"+r+"\\s*=\\s*"+s,e:"[-=]>",rB:!0,c:[i,c]},{b:/[:\(,=]\s*/,r:0,c:[{cN:"function",b:s,e:"[-=]>",rB:!0,c:[c]}]},{cN:"class",bK:"class",e:"$",i:/[:="\[\]]/,c:[{bK:"extends",eW:!0,i:/[:="\[\]]/,c:[i]},i]},{b:r+":",e:":",rB:!0,rE:!0,r:0}])}}),e.registerLanguage("cpp",function(e){var t={cN:"keyword",b:"\\b[a-z\\d_]*_t\\b"},r={cN:"string",v:[{b:'(u8?|U)?L?"',e:'"',i:"\\n",c:[e.BE]},{b:'(u8?|U)?R"',e:'"',c:[e.BE]},{b:"'\\\\?.",e:"'",i:"."}]},a={cN:"number",v:[{b:"\\b(0b[01'_]+)"},{b:"\\b([\\d'_]+(\\.[\\d'_]*)?|\\.[\\d'_]+)(u|U|l|L|ul|UL|f|F|b|B)"},{b:"(-?)(\\b0[xX][a-fA-F0-9'_]+|(\\b[\\d'_]+(\\.[\\d'_]*)?|\\.[\\d'_]+)([eE][-+]?[\\d'_]+)?)"}],r:0},n={cN:"meta",b:/#\s*[a-z]+\b/,e:/$/,k:{"meta-keyword":"if else elif endif define undef warning error line pragma ifdef ifndef include"},c:[{b:/\\\n/,r:0},e.inherit(r,{cN:"meta-string"}),{cN:"meta-string",b:"<",e:">",i:"\\n"},e.CLCM,e.CBCM]},i=e.IR+"\\s*\\(",s={keyword:"int float while private char catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return",built_in:"std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr",literal:"true false nullptr NULL"},c=[t,e.CLCM,e.CBCM,a,r];return{aliases:["c","cc","h","c++","h++","hpp"],k:s,i:"</",c:c.concat([n,{b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:s,c:["self",t]},{b:e.IR+"::",k:s},{v:[{b:/=/,e:/;/},{b:/\(/,e:/\)/},{bK:"new throw return else",e:/;/}],k:s,c:c.concat([{b:/\(/,e:/\)/,k:s,c:c.concat(["self"]),r:0}]),r:0},{cN:"function",b:"("+e.IR+"[\\*&\\s]+)+"+i,rB:!0,e:/[{;=]/,eE:!0,k:s,i:/[^\w\s\*&]/,c:[{b:i,rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,k:s,r:0,c:[e.CLCM,e.CBCM,r,a,t]},e.CLCM,e.CBCM,n]}]),exports:{preprocessor:n,strings:r,k:s}}}),e.registerLanguage("cs",function(e){var t={keyword:"abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern finally fixed float for foreach goto if implicit in int interface internal is lock long when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async nameof ascending descending from get group into join let orderby partial select set value var where yield",literal:"null false true"},r={cN:"string",b:'@"',e:'"',c:[{b:'""'}]},a=e.inherit(r,{i:/\n/}),n={cN:"subst",b:"{",e:"}",k:t},i=e.inherit(n,{i:/\n/}),s={cN:"string",b:/\$"/,e:'"',i:/\n/,c:[{b:"{{"},{b:"}}"},e.BE,i]},c={cN:"string",b:/\$@"/,e:'"',c:[{b:"{{"},{b:"}}"},{b:'""'},n]},o=e.inherit(c,{i:/\n/,c:[{b:"{{"},{b:"}}"},{b:'""'},i]});n.c=[c,s,r,e.ASM,e.QSM,e.CNM,e.CBCM],i.c=[o,s,a,e.ASM,e.QSM,e.CNM,e.inherit(e.CBCM,{i:/\n/})];var l={v:[c,s,r,e.ASM,e.QSM]},u=e.IR+"(<"+e.IR+">)?(\\[\\])?";return{aliases:["csharp"],k:t,i:/::/,c:[e.C("///","$",{rB:!0,c:[{cN:"doctag",v:[{b:"///",r:0},{b:"<!--|-->"},{b:"</?",e:">"}]}]}),e.CLCM,e.CBCM,{cN:"meta",b:"#",e:"$",k:{"meta-keyword":"if else elif endif define undef warning error line region endregion pragma checksum"}},l,e.CNM,{bK:"class interface",e:/[{;=]/,i:/[^\s:]/,c:[e.TM,e.CLCM,e.CBCM]},{bK:"namespace",e:/[{;=]/,i:/[^\s:]/,c:[e.inherit(e.TM,{b:"[a-zA-Z](\\.?\\w)*"}),e.CLCM,e.CBCM]},{bK:"new return throw await",r:0},{cN:"function",b:"("+u+"\\s+)+"+e.IR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:t,c:[{b:e.IR+"\\s*\\(",rB:!0,c:[e.TM],r:0},{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,k:t,r:0,c:[l,e.CNM,e.CBCM]},e.CLCM,e.CBCM]}]}}),e.registerLanguage("css",function(e){var t="[a-zA-Z-][a-zA-Z0-9_-]*",r={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",i:/:/,c:[{cN:"keyword",b:/\w+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:t,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,r]}]}}),e.registerLanguage("diff",function(e){return{aliases:["patch"],c:[{cN:"meta",r:10,v:[{b:/^@@ +\-\d+,\d+ +\+\d+,\d+ +@@$/},{b:/^\*\*\* +\d+,\d+ +\*\*\*\*$/},{b:/^\-\-\- +\d+,\d+ +\-\-\-\-$/}]},{cN:"comment",v:[{b:/Index: /,e:/$/},{b:/={3,}/,e:/$/},{b:/^\-{3}/,e:/$/},{b:/^\*{3} /,e:/$/},{b:/^\+{3}/,e:/$/},{b:/\*{5}/,e:/\*{5}$/}]},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"addition",b:"^\\!",e:"$"}]}}),e.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}}),e.registerLanguage("ini",function(e){var t={cN:"string",c:[e.BE],v:[{b:"'''",e:"'''",r:10},{b:'"""',e:'"""',r:10},{b:'"',e:'"'},{b:"'",e:"'"}]};return{aliases:["toml"],cI:!0,i:/\S/,c:[e.C(";","$"),e.HCM,{cN:"section",b:/^\s*\[+/,e:/\]+/},{b:/^[a-z0-9\[\]_-]+\s*=\s*/,e:"$",rB:!0,c:[{cN:"attr",b:/[a-z0-9\[\]_-]+/},{b:/=/,eW:!0,r:0,c:[{cN:"literal",b:/\bon|off|true|false|yes|no\b/},{cN:"variable",v:[{b:/\$[\w\d"][\w\d_]*/},{b:/\$\{(.*?)}/}]},t,{cN:"number",b:/([\+\-]+)?[\d]+_[\d_]+/},e.NM]}]}]}}),e.registerLanguage("java",function(e){var t=e.UIR+"(<"+e.UIR+"(\\s*,\\s*"+e.UIR+")*>)?",r="false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports",a="\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?",n={cN:"number",b:a,r:0};return{aliases:["jsp"],k:r,i:/<\/|#/,c:[e.C("/\\*\\*","\\*/",{r:0,c:[{b:/\w+@/,r:0},{cN:"doctag",b:"@[A-Za-z]+"}]}),e.CLCM,e.CBCM,e.ASM,e.QSM,{cN:"class",bK:"class interface",e:/[{;=]/,eE:!0,k:"class interface",i:/[:"\[\]]/,c:[{bK:"extends implements"},e.UTM]},{bK:"new throw return else",r:0},{cN:"function",b:"("+t+"\\s+)+"+e.UIR+"\\s*\\(",rB:!0,e:/[{;=]/,eE:!0,k:r,c:[{b:e.UIR+"\\s*\\(",rB:!0,r:0,c:[e.UTM]},{cN:"params",b:/\(/,e:/\)/,k:r,r:0,c:[e.ASM,e.QSM,e.CNM,e.CBCM]},e.CLCM,e.CBCM]},n,{cN:"meta",b:"@[A-Za-z]+"}]}}),e.registerLanguage("javascript",function(e){return{aliases:["js","jsx"],k:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\s*\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:["self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:[e.CLCM,e.CBCM]}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}}),e.registerLanguage("json",function(e){var t={literal:"true false null"},r=[e.QSM,e.CNM],a={e:",",eW:!0,eE:!0,c:r,k:t},n={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(a,{b:/:/})],i:"\\S"},i={b:"\\[",e:"\\]",c:[e.inherit(a)],i:"\\S"};return r.splice(r.length,0,n,i),{c:r,k:t,i:"\\S"}}),e.registerLanguage("makefile",function(e){var t={cN:"variable",b:/\$\(/,e:/\)/,c:[e.BE]};return{aliases:["mk","mak"],c:[e.HCM,{b:/^\w+\s*\W*=/,rB:!0,r:0,starts:{e:/\s*\W*=/,eE:!0,starts:{e:/$/,r:0,c:[t]}}},{cN:"section",b:/^[\w]+:\s*$/},{cN:"meta",b:/^\.PHONY:/,e:/$/,k:{"meta-keyword":".PHONY"},l:/[\.\w]+/},{b:/^\t+/,e:/$/,r:0,c:[e.QSM,t]}]}}),e.registerLanguage("xml",function(e){var t="[A-Za-z0-9\\._:-]+",r={eW:!0,i:/</,r:0,c:[{cN:"attr",b:t,r:0},{b:/=\s*/,r:0,c:[{cN:"string",endsParent:!0,v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s"'=<>`]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},e.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0}]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[r],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[r],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"meta",v:[{b:/<\?xml/,e:/\?>/,r:10},{b:/<\?\w+/,e:/\?>/}]},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},r]}]}}),e.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"^```w*s*$",e:"^```s*$"},{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:/^\[[^\n]+\]:/,rB:!0,c:[{cN:"symbol",b:/\[/,e:/\]/,eB:!0,eE:!0},{cN:"link",b:/:\s*/,e:/$/,eB:!0}]}]}}),e.registerLanguage("nginx",function(e){var t={cN:"variable",v:[{b:/\$\d+/},{b:/\$\{/,e:/}/},{b:"[\\$\\@]"+e.UIR}]},r={eW:!0,l:"[a-z/_]+",k:{literal:"on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"},r:0,i:"=>",c:[e.HCM,{cN:"string",c:[e.BE,t],v:[{b:/"/,e:/"/},{b:/'/,e:/'/}]},{b:"([a-z]+):/",e:"\\s",eW:!0,eE:!0,c:[t]},{cN:"regexp",c:[e.BE,t],v:[{b:"\\s\\^",e:"\\s|{|;",rE:!0},{b:"~\\*?\\s+",e:"\\s|{|;",rE:!0},{b:"\\*(\\.[a-z\\-]+)+"},{b:"([a-z\\-]+\\.)+\\*"}]},{cN:"number",b:"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"},{cN:"number",b:"\\b\\d+[kKmMgGdshdwy]*\\b",r:0},t]};return{aliases:["nginxconf"],c:[e.HCM,{b:e.UIR+"\\s+{",rB:!0,e:"{",c:[{cN:"section",b:e.UIR}],r:0},{b:e.UIR+"\\s",e:";|{",rB:!0,c:[{cN:"attribute",b:e.UIR,starts:r}],r:0}],i:"[^\\s\\}]"}}),e.registerLanguage("objectivec",function(e){var t={cN:"built_in",b:"\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"},r={keyword:"int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",literal:"false true FALSE TRUE nil YES NO NULL",built_in:"BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"},a=/[a-zA-Z@][a-zA-Z0-9_]*/,n="@interface @class @protocol @implementation";return{aliases:["mm","objc","obj-c"],k:r,l:a,i:"</",c:[t,e.CLCM,e.CBCM,e.CNM,e.QSM,{cN:"string",v:[{b:'@"',e:'"',i:"\\n",c:[e.BE]},{b:"'",e:"[^\\\\]'",i:"[^\\\\][^']"}]},{cN:"meta",b:"#",e:"$",c:[{cN:"meta-string",v:[{b:'"',e:'"'},{b:"<",e:">"}]}]},{cN:"class",b:"("+n.split(" ").join("|")+")\\b",e:"({|$)",eE:!0,k:n,l:a,c:[e.UTM]},{b:"\\."+e.UIR,r:0}]}}),e.registerLanguage("perl",function(e){var t="getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when",r={cN:"subst",b:"[$@]\\{",e:"\\}",k:t},a={b:"->{",e:"}"},n={v:[{b:/\$\d/},{b:/[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/},{b:/[\$%@][^\s\w{]/,r:0}]},i=[e.BE,r,n],s=[n,e.HCM,e.C("^\\=\\w","\\=cut",{eW:!0}),a,{cN:"string",c:i,v:[{b:"q[qwxr]?\\s*\\(",e:"\\)",r:5},{b:"q[qwxr]?\\s*\\[",e:"\\]",r:5},{b:"q[qwxr]?\\s*\\{",e:"\\}",r:5},{b:"q[qwxr]?\\s*\\|",e:"\\|",r:5},{b:"q[qwxr]?\\s*\\<",e:"\\>",r:5},{b:"qw\\s+q",e:"q",r:5},{b:"'",e:"'",c:[e.BE]},{b:'"',e:'"'},{b:"`",e:"`",c:[e.BE]},{b:"{\\w+}",c:[],r:0},{b:"-?\\w+\\s*\\=\\>",c:[],r:0}]},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\/\\/|"+e.RSR+"|\\b(split|return|print|reverse|grep)\\b)\\s*",k:"split return print reverse grep",r:0,c:[e.HCM,{cN:"regexp",b:"(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",r:10},{cN:"regexp",b:"(m|qr)?/",e:"/[a-z]*",c:[e.BE],r:0}]},{cN:"function",bK:"sub",e:"(\\s*\\(.*?\\))?[;{]",eE:!0,r:5,c:[e.TM]},{b:"-\\w\\b",r:0},{b:"^__DATA__$",e:"^__END__$",sL:"mojolicious",c:[{b:"^@@.*",e:"$",cN:"comment"}]}];return r.c=s,a.c=s,{aliases:["pl","pm"],l:/[\w\.]+/,k:t,c:s}}),e.registerLanguage("php",function(e){var t={b:"\\$+[a-zA-Z_-ÿ][a-zA-Z0-9_-ÿ]*"},r={cN:"meta",b:/<\?(php)?|\?>/},a={cN:"string",c:[e.BE,r],v:[{b:'b"',e:'"'},{b:"b'",e:"'"},e.inherit(e.ASM,{i:null}),e.inherit(e.QSM,{i:null})]},n={v:[e.BNM,e.CNM]};return{aliases:["php3","php4","php5","php6"],cI:!0,k:"and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",c:[e.HCM,e.C("//","$",{c:[r]}),e.C("/\\*","\\*/",{c:[{cN:"doctag",b:"@[A-Za-z]+"}]}),e.C("__halt_compiler.+?;",!1,{eW:!0,k:"__halt_compiler",l:e.UIR}),{cN:"string",b:/<<<['"]?\w+['"]?$/,e:/^\w+;?$/,c:[e.BE,{cN:"subst",v:[{b:/\$\w+/},{b:/\{\$/,e:/\}/}]}]},r,{cN:"keyword",b:/\$this\b/},t,{b:/(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/},{cN:"function",bK:"function",e:/[;{]/,eE:!0,i:"\\$|\\[|%",c:[e.UTM,{cN:"params",b:"\\(",e:"\\)",c:["self",t,e.CBCM,a,n]}]},{cN:"class",bK:"class interface",e:"{",eE:!0,i:/[:\(\$"]/,c:[{bK:"extends implements"},e.UTM]},{bK:"namespace",e:";",i:/[\.']/,c:[e.UTM]},{bK:"use",e:";",c:[e.UTM]},{b:"=>"},a,n]}}),e.registerLanguage("python",function(e){var t={cN:"meta",b:/^(>>>|\.\.\.) /},r={cN:"string",c:[e.BE],v:[{b:/(u|b)?r?'''/,e:/'''/,c:[t],r:10},{b:/(u|b)?r?"""/,e:/"""/,c:[t],r:10},{b:/(u|r|ur)'/,e:/'/,r:10},{b:/(u|r|ur)"/,e:/"/,r:10},{b:/(b|br)'/,e:/'/},{b:/(b|br)"/,e:/"/},e.ASM,e.QSM]},a={cN:"number",r:0,v:[{b:e.BNR+"[lLjJ]?"},{b:"\\b(0o[0-7]+)[lLjJ]?"},{b:e.CNR+"[lLjJ]?"}]},n={cN:"params",b:/\(/,e:/\)/,c:["self",t,a,r]};return{aliases:["py","gyp"],k:{keyword:"and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",built_in:"Ellipsis NotImplemented"},i:/(<\/|->|\?)/,c:[t,a,r,e.HCM,{v:[{cN:"function",bK:"def",r:10},{cN:"class",bK:"class"}],e:/:/,i:/[${=;\n,]/,c:[e.UTM,n,{b:/->/,eW:!0,k:"None"}]},{cN:"meta",b:/^[\t ]*@/,e:/$/},{b:/\b(print|exec)\(/}]}}),e.registerLanguage("ruby",function(e){var t="[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?",r={keyword:"and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor",literal:"true false nil"},a={cN:"doctag",b:"@[A-Za-z]+"},n={b:"#<",e:">"},i=[e.C("#","$",{c:[a]}),e.C("^\\=begin","^\\=end",{c:[a],r:10}),e.C("^__END__","\\n$")],s={cN:"subst",b:"#\\{",e:"}",k:r},c={cN:"string",c:[e.BE,s],v:[{b:/'/,e:/'/},{b:/"/,e:/"/},{b:/`/,e:/`/},{b:"%[qQwWx]?\\(",e:"\\)"},{b:"%[qQwWx]?\\[",e:"\\]"},{b:"%[qQwWx]?{",e:"}"},{b:"%[qQwWx]?<",e:">"},{b:"%[qQwWx]?/",e:"/"},{b:"%[qQwWx]?%",e:"%"},{b:"%[qQwWx]?-",e:"-"},{b:"%[qQwWx]?\\|",e:"\\|"},{b:/\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]},o={cN:"params",b:"\\(",e:"\\)",endsParent:!0,k:r},l=[c,n,{cN:"class",bK:"class module",e:"$|;",i:/=/,c:[e.inherit(e.TM,{b:"[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"}),{b:"<\\s*",c:[{b:"("+e.IR+"::)?"+e.IR}]}].concat(i)},{cN:"function",bK:"def",e:"$|;",c:[e.inherit(e.TM,{b:t}),o].concat(i)},{b:e.IR+"::"},{cN:"symbol",b:e.UIR+"(\\!|\\?)?:",r:0},{cN:"symbol",b:":(?!\\s)",c:[c,{b:t}],r:0},{cN:"number",b:"(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",r:0},{b:"(\\$\\W)|((\\$|\\@\\@?)(\\w+))"},{cN:"params",b:/\|/,e:/\|/,k:r},{b:"("+e.RSR+")\\s*",c:[n,{cN:"regexp",c:[e.BE,s],i:/\n/,v:[{b:"/",e:"/[a-z]*"},{b:"%r{",
	e:"}[a-z]*"},{b:"%r\\(",e:"\\)[a-z]*"},{b:"%r!",e:"![a-z]*"},{b:"%r\\[",e:"\\][a-z]*"}]}].concat(i),r:0}].concat(i);s.c=l,o.c=l;var u="[>?]>",d="[\\w#]+\\(\\w+\\):\\d+:\\d+>",b="(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>",p=[{b:/^\s*=>/,starts:{e:"$",c:l}},{cN:"meta",b:"^("+u+"|"+d+"|"+b+")",starts:{e:"$",c:l}}];return{aliases:["rb","gemspec","podspec","thor","irb"],k:r,i:/\/\*/,c:i.concat(p).concat(l)}}),e.registerLanguage("sql",function(e){var t=e.C("--","$");return{cI:!0,i:/[<>{}*#]/,c:[{bK:"begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment",e:/;/,eW:!0,l:/[\w\.]+/,k:{keyword:"abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias allocate allow alter always analyze ancillary and any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second section securefile security seed segment select self sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",literal:"true false null",built_in:"array bigint binary bit blob boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text varchar varying void"},c:[{cN:"string",b:"'",e:"'",c:[e.BE,{b:"''"}]},{cN:"string",b:'"',e:'"',c:[e.BE,{b:'""'}]},{cN:"string",b:"`",e:"`",c:[e.BE]},e.CNM,e.CBCM,t]},e.CBCM,t]}}),e});

/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The reveal.js markdown plugin. Handles parsing of
	 * markdown inside of presentations as well as loading
	 * of external markdown documents.
	 */
	(function(root, factory) {
		if (true) {
			root.marked = __webpack_require__(24);
			root.RevealMarkdown = factory(root.marked);
			root.RevealMarkdown.initialize();
		} else if (typeof exports === 'object') {
			module.exports = factory(require('./marked'));
		} else {
			// Browser globals (root is window)
			root.RevealMarkdown = factory(root.marked);
			root.RevealMarkdown.initialize();
		}
	}(this, function(marked) {

		if (typeof marked === 'undefined') {
			throw 'The reveal.js Markdown plugin requires marked to be loaded';
		}

		if (typeof hljs !== 'undefined') {
			marked.setOptions({
				highlight: function(lang, code) {
					return hljs.highlightAuto(lang, code).value;
				}
			});
		}

		var DEFAULT_SLIDE_SEPARATOR = '^\r?\n---\r?\n$',
			DEFAULT_NOTES_SEPARATOR = 'note:',
			DEFAULT_ELEMENT_ATTRIBUTES_SEPARATOR = '\\\.element\\\s*?(.+?)$',
			DEFAULT_SLIDE_ATTRIBUTES_SEPARATOR = '\\\.slide:\\\s*?(\\\S.+?)$';

		var SCRIPT_END_PLACEHOLDER = '__SCRIPT_END__';


		/**
		 * Retrieves the markdown contents of a slide section
		 * element. Normalizes leading tabs/whitespace.
		 */
		function getMarkdownFromSlide(section) {

			var template = section.querySelector('script');

			// strip leading whitespace so it isn't evaluated as code
			var text = (template || section).textContent;

			// restore script end tags
			text = text.replace(new RegExp(SCRIPT_END_PLACEHOLDER, 'g'), '</script>');

			var leadingWs = text.match(/^\n?(\s*)/)[1].length,
				leadingTabs = text.match(/^\n?(\t*)/)[1].length;

			if (leadingTabs > 0) {
				text = text.replace(new RegExp('\\n?\\t{' + leadingTabs + '}', 'g'), '\n');
			} else if (leadingWs > 1) {
				text = text.replace(new RegExp('\\n? {' + leadingWs + '}', 'g'), '\n');
			}

			return text;

		}

		/**
		 * Given a markdown slide section element, this will
		 * return all arguments that aren't related to markdown
		 * parsing. Used to forward any other user-defined arguments
		 * to the output markdown slide.
		 */
		function getForwardedAttributes(section) {

			var attributes = section.attributes;
			var result = [];

			for (var i = 0, len = attributes.length; i < len; i++) {
				var name = attributes[i].name,
					value = attributes[i].value;

				// disregard attributes that are used for markdown loading/parsing
				if (/data\-(markdown|separator|vertical|notes)/gi.test(name)) continue;

				if (value) {
					result.push(name + '="' + value + '"');
				} else {
					result.push(name);
				}
			}

			return result.join(' ');

		}

		/**
		 * Inspects the given options and fills out default
		 * values for what's not defined.
		 */
		function getSlidifyOptions(options) {

			options = options || {};
			options.separator = options.separator || DEFAULT_SLIDE_SEPARATOR;
			options.notesSeparator = options.notesSeparator || DEFAULT_NOTES_SEPARATOR;
			options.attributes = options.attributes || '';
			return options;

		}

		/**
		 * Helper function for constructing a markdown slide.
		 */
		function createMarkdownSlide(content, options) {

			options = getSlidifyOptions(options);

			var notesMatch = content.split(new RegExp(options.notesSeparator, 'mgi'));

			if (notesMatch.length === 2) {
				content = notesMatch[0] + '<aside class="notes">' + marked(notesMatch[1].trim()) + '</aside>';
			}

			// prevent script end tags in the content from interfering
			// with parsing
			content = content.replace(/<\/script>/g, SCRIPT_END_PLACEHOLDER);

			return '<script type="text/template">' + content + '</script>';

		}

		/**
		 * Parses a data string into multiple slides based
		 * on the passed in separator arguments.
		 */
		function slidify(markdown, options) {

			options = getSlidifyOptions(options);

			var separatorRegex = new RegExp(options.separator + (options.verticalSeparator ? '|' + options.verticalSeparator : ''), 'mg'),
				horizontalSeparatorRegex = new RegExp(options.separator);

			var matches,
				lastIndex = 0,
				isHorizontal,
				wasHorizontal = true,
				content,
				sectionStack = [];

			// iterate until all blocks between separators are stacked up
			while (matches = separatorRegex.exec(markdown)) {
				notes = null;

				// determine direction (horizontal by default)
				isHorizontal = horizontalSeparatorRegex.test(matches[0]);

				if (!isHorizontal && wasHorizontal) {
					// create vertical stack
					sectionStack.push([]);
				}

				// pluck slide content from markdown input
				content = markdown.substring(lastIndex, matches.index);

				if (isHorizontal && wasHorizontal) {
					// add to horizontal stack
					sectionStack.push(content);
				} else {
					// add to vertical stack
					sectionStack[sectionStack.length - 1].push(content);
				}

				lastIndex = separatorRegex.lastIndex;
				wasHorizontal = isHorizontal;
			}

			// add the remaining slide
			(wasHorizontal ? sectionStack : sectionStack[sectionStack.length - 1]).push(markdown.substring(lastIndex));

			var markdownSections = '';

			// flatten the hierarchical stack, and insert <section data-markdown> tags
			for (var i = 0, len = sectionStack.length; i < len; i++) {
				// vertical
				if (sectionStack[i] instanceof Array) {
					markdownSections += '<section ' + options.attributes + '>';

					sectionStack[i].forEach(function(child) {
						markdownSections += '<section data-markdown>' + createMarkdownSlide(child, options) + '</section>';
					});

					markdownSections += '</section>';
				} else {
					markdownSections += '<section ' + options.attributes + ' data-markdown>' + createMarkdownSlide(sectionStack[i], options) + '</section>';
				}
			}

			return markdownSections;

		}

		/**
		 * Parses any current data-markdown slides, splits
		 * multi-slide markdown into separate sections and
		 * handles loading of external markdown.
		 */
		function processSlides() {

			var sections = document.querySelectorAll('[data-markdown]'),
				section;

			for (var i = 0, len = sections.length; i < len; i++) {

				section = sections[i];

				if (section.getAttribute('data-markdown').length) {

					var xhr = new XMLHttpRequest(),
						url = section.getAttribute('data-markdown');

					datacharset = section.getAttribute('data-charset');

					// see https://developer.mozilla.org/en-US/docs/Web/API/element.getAttribute#Notes
					if (datacharset != null && datacharset != '') {
						xhr.overrideMimeType('text/html; charset=' + datacharset);
					}

					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							// file protocol yields status code 0 (useful for local debug, mobile applications etc.)
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {

								section.outerHTML = slidify(xhr.responseText, {
									separator: section.getAttribute('data-separator'),
									verticalSeparator: section.getAttribute('data-separator-vertical'),
									notesSeparator: section.getAttribute('data-separator-notes'),
									attributes: getForwardedAttributes(section)
								});

							} else {

								section.outerHTML = '<section data-state="alert">' +
									'ERROR: The attempt to fetch ' + url + ' failed with HTTP status ' + xhr.status + '.' +
									'Check your browser\'s JavaScript console for more details.' +
									'<p>Remember that you need to serve the presentation HTML from a HTTP server.</p>' +
									'</section>';

							}
						}
					};

					xhr.open('GET', url, false);

					try {
						xhr.send();
					} catch (e) {
						alert('Failed to get the Markdown file ' + url + '. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ' + e);
					}

				} else if (section.getAttribute('data-separator') || section.getAttribute('data-separator-vertical') || section.getAttribute('data-separator-notes')) {

					section.outerHTML = slidify(getMarkdownFromSlide(section), {
						separator: section.getAttribute('data-separator'),
						verticalSeparator: section.getAttribute('data-separator-vertical'),
						notesSeparator: section.getAttribute('data-separator-notes'),
						attributes: getForwardedAttributes(section)
					});

				} else {
					section.innerHTML = createMarkdownSlide(getMarkdownFromSlide(section));
				}
			}

		}

		/**
		 * Check if a node value has the attributes pattern.
		 * If yes, extract it and add that value as one or several attributes
		 * the the terget element.
		 *
		 * You need Cache Killer on Chrome to see the effect on any FOM transformation
		 * directly on refresh (F5)
		 * http://stackoverflow.com/questions/5690269/disabling-chrome-cache-for-website-development/7000899#answer-11786277
		 */
		function addAttributeInElement(node, elementTarget, separator) {

			var mardownClassesInElementsRegex = new RegExp(separator, 'mg');
			var mardownClassRegex = new RegExp("([^\"= ]+?)=\"([^\"=]+?)\"", 'mg');
			var nodeValue = node.nodeValue;
			if (matches = mardownClassesInElementsRegex.exec(nodeValue)) {

				var classes = matches[1];
				nodeValue = nodeValue.substring(0, matches.index) + nodeValue.substring(mardownClassesInElementsRegex.lastIndex);
				node.nodeValue = nodeValue;
				while (matchesClass = mardownClassRegex.exec(classes)) {
					elementTarget.setAttribute(matchesClass[1], matchesClass[2]);
				}
				return true;
			}
			return false;
		}

		/**
		 * Add attributes to the parent element of a text node,
		 * or the element of an attribute node.
		 */
		function addAttributes(section, element, previousElement, separatorElementAttributes, separatorSectionAttributes) {

			if (element != null && element.childNodes != undefined && element.childNodes.length > 0) {
				previousParentElement = element;
				for (var i = 0; i < element.childNodes.length; i++) {
					childElement = element.childNodes[i];
					if (i > 0) {
						j = i - 1;
						while (j >= 0) {
							aPreviousChildElement = element.childNodes[j];
							if (typeof aPreviousChildElement.setAttribute == 'function' && aPreviousChildElement.tagName != "BR") {
								previousParentElement = aPreviousChildElement;
								break;
							}
							j = j - 1;
						}
					}
					parentSection = section;
					if (childElement.nodeName == "section") {
						parentSection = childElement;
						previousParentElement = childElement;
					}
					if (typeof childElement.setAttribute == 'function' || childElement.nodeType == Node.COMMENT_NODE) {
						addAttributes(parentSection, childElement, previousParentElement, separatorElementAttributes, separatorSectionAttributes);
					}
				}
			}

			if (element.nodeType == Node.COMMENT_NODE) {
				if (addAttributeInElement(element, previousElement, separatorElementAttributes) == false) {
					addAttributeInElement(element, section, separatorSectionAttributes);
				}
			}
		}

		/**
		 * Converts any current data-markdown slides in the
		 * DOM to HTML.
		 */
		function convertSlides() {

			var sections = document.querySelectorAll('[data-markdown]');

			//MD文件默认图片目录
			var DEFAULT_SLIDE_IMG_CONTENT = sections[0].getAttribute('data-img-content', true) || 'markdown';

			for (var i = 0, len = sections.length; i < len; i++) {

				var section = sections[i];

				// Only parse the same slide once
				if (!section.getAttribute('data-markdown-parsed')) {

					section.setAttribute('data-markdown-parsed', true)

					var notes = section.querySelector('aside.notes');
					var markdown = getMarkdownFromSlide(section);

					var html = marked(markdown);
					//MD中引用的图片转为指定的目录
					section.innerHTML = html.replace(RegExp(/<img src=".\//gi), '<img src="./' + DEFAULT_SLIDE_IMG_CONTENT+'/');

					addAttributes(section, section, null, section.getAttribute('data-element-attributes') ||
						section.parentNode.getAttribute('data-element-attributes') ||
						DEFAULT_ELEMENT_ATTRIBUTES_SEPARATOR,
						section.getAttribute('data-attributes') ||
						section.parentNode.getAttribute('data-attributes') ||
						DEFAULT_SLIDE_ATTRIBUTES_SEPARATOR);

					// If there were notes, we need to re-add them after
					// having overwritten the section's HTML
					if (notes) {
						section.appendChild(notes);
					}

				}

			}

		}

		// API
		return {

			initialize: function() {
				processSlides();
				convertSlides();
			},

			// TODO: Do these belong in the API?
			processSlides: processSlides,
			convertSlides: convertSlides,
			slidify: slidify

		};

	}));

/***/ },

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

	// Custom reveal.js integration
	(function(){
		var isEnabled = true;
		var Reveal = __webpack_require__(10);
		document.querySelector( '.reveal .slides' ).addEventListener( 'mousedown', function( event ) {
			var modifier = ( Reveal.getConfig().zoomKey ? Reveal.getConfig().zoomKey : 'alt' ) + 'Key';

			var zoomPadding = 20;
			var revealScale = Reveal.getScale();

			if( event[ modifier ] && isEnabled ) {
				event.preventDefault();

				var bounds = event.target.getBoundingClientRect();

				zoom.to({
					x: ( bounds.left * revealScale ) - zoomPadding,
					y: ( bounds.top * revealScale ) - zoomPadding,
					width: ( bounds.width * revealScale ) + ( zoomPadding * 2 ),
					height: ( bounds.height * revealScale ) + ( zoomPadding * 2 ),
					pan: false
				});
			}
		} );

		Reveal.addEventListener( 'overviewshown', function() { isEnabled = false; } );
		Reveal.addEventListener( 'overviewhidden', function() { isEnabled = true; } );
	})();

	/*!
	 * zoom.js 0.3 (modified for use with reveal.js)
	 * http://lab.hakim.se/zoom-js
	 * MIT licensed
	 *
	 * Copyright (C) 2011-2014 Hakim El Hattab, http://hakim.se
	 */
	var zoom = (function(){

		// The current zoom level (scale)
		var level = 1;

		// The current mouse position, used for panning
		var mouseX = 0,
			mouseY = 0;

		// Timeout before pan is activated
		var panEngageTimeout = -1,
			panUpdateInterval = -1;

		// Check for transform support so that we can fallback otherwise
		var supportsTransforms = 	'WebkitTransform' in document.body.style ||
									'MozTransform' in document.body.style ||
									'msTransform' in document.body.style ||
									'OTransform' in document.body.style ||
									'transform' in document.body.style;

		if( supportsTransforms ) {
			// The easing that will be applied when we zoom in/out
			document.body.style.transition = 'transform 0.8s ease';
			document.body.style.OTransition = '-o-transform 0.8s ease';
			document.body.style.msTransition = '-ms-transform 0.8s ease';
			document.body.style.MozTransition = '-moz-transform 0.8s ease';
			document.body.style.WebkitTransition = '-webkit-transform 0.8s ease';
		}

		// Zoom out if the user hits escape
		document.addEventListener( 'keyup', function( event ) {
			if( level !== 1 && event.keyCode === 27 ) {
				zoom.out();
			}
		} );

		// Monitor mouse movement for panning
		document.addEventListener( 'mousemove', function( event ) {
			if( level !== 1 ) {
				mouseX = event.clientX;
				mouseY = event.clientY;
			}
		} );

		/**
		 * Applies the CSS required to zoom in, prefers the use of CSS3
		 * transforms but falls back on zoom for IE.
		 *
		 * @param {Object} rect
		 * @param {Number} scale
		 */
		function magnify( rect, scale ) {

			var scrollOffset = getScrollOffset();

			// Ensure a width/height is set
			rect.width = rect.width || 1;
			rect.height = rect.height || 1;

			// Center the rect within the zoomed viewport
			rect.x -= ( window.innerWidth - ( rect.width * scale ) ) / 2;
			rect.y -= ( window.innerHeight - ( rect.height * scale ) ) / 2;

			if( supportsTransforms ) {
				// Reset
				if( scale === 1 ) {
					document.body.style.transform = '';
					document.body.style.OTransform = '';
					document.body.style.msTransform = '';
					document.body.style.MozTransform = '';
					document.body.style.WebkitTransform = '';
				}
				// Scale
				else {
					var origin = scrollOffset.x +'px '+ scrollOffset.y +'px',
						transform = 'translate('+ -rect.x +'px,'+ -rect.y +'px) scale('+ scale +')';

					document.body.style.transformOrigin = origin;
					document.body.style.OTransformOrigin = origin;
					document.body.style.msTransformOrigin = origin;
					document.body.style.MozTransformOrigin = origin;
					document.body.style.WebkitTransformOrigin = origin;

					document.body.style.transform = transform;
					document.body.style.OTransform = transform;
					document.body.style.msTransform = transform;
					document.body.style.MozTransform = transform;
					document.body.style.WebkitTransform = transform;
				}
			}
			else {
				// Reset
				if( scale === 1 ) {
					document.body.style.position = '';
					document.body.style.left = '';
					document.body.style.top = '';
					document.body.style.width = '';
					document.body.style.height = '';
					document.body.style.zoom = '';
				}
				// Scale
				else {
					document.body.style.position = 'relative';
					document.body.style.left = ( - ( scrollOffset.x + rect.x ) / scale ) + 'px';
					document.body.style.top = ( - ( scrollOffset.y + rect.y ) / scale ) + 'px';
					document.body.style.width = ( scale * 100 ) + '%';
					document.body.style.height = ( scale * 100 ) + '%';
					document.body.style.zoom = scale;
				}
			}

			level = scale;

			if( document.documentElement.classList ) {
				if( level !== 1 ) {
					document.documentElement.classList.add( 'zoomed' );
				}
				else {
					document.documentElement.classList.remove( 'zoomed' );
				}
			}
		}

		/**
		 * Pan the document when the mosue cursor approaches the edges
		 * of the window.
		 */
		function pan() {
			var range = 0.12,
				rangeX = window.innerWidth * range,
				rangeY = window.innerHeight * range,
				scrollOffset = getScrollOffset();

			// Up
			if( mouseY < rangeY ) {
				window.scroll( scrollOffset.x, scrollOffset.y - ( 1 - ( mouseY / rangeY ) ) * ( 14 / level ) );
			}
			// Down
			else if( mouseY > window.innerHeight - rangeY ) {
				window.scroll( scrollOffset.x, scrollOffset.y + ( 1 - ( window.innerHeight - mouseY ) / rangeY ) * ( 14 / level ) );
			}

			// Left
			if( mouseX < rangeX ) {
				window.scroll( scrollOffset.x - ( 1 - ( mouseX / rangeX ) ) * ( 14 / level ), scrollOffset.y );
			}
			// Right
			else if( mouseX > window.innerWidth - rangeX ) {
				window.scroll( scrollOffset.x + ( 1 - ( window.innerWidth - mouseX ) / rangeX ) * ( 14 / level ), scrollOffset.y );
			}
		}

		function getScrollOffset() {
			return {
				x: window.scrollX !== undefined ? window.scrollX : window.pageXOffset,
				y: window.scrollY !== undefined ? window.scrollY : window.pageYOffset
			}
		}

		return {
			/**
			 * Zooms in on either a rectangle or HTML element.
			 *
			 * @param {Object} options
			 *   - element: HTML element to zoom in on
			 *   OR
			 *   - x/y: coordinates in non-transformed space to zoom in on
			 *   - width/height: the portion of the screen to zoom in on
			 *   - scale: can be used instead of width/height to explicitly set scale
			 */
			to: function( options ) {

				// Due to an implementation limitation we can't zoom in
				// to another element without zooming out first
				if( level !== 1 ) {
					zoom.out();
				}
				else {
					options.x = options.x || 0;
					options.y = options.y || 0;

					// If an element is set, that takes precedence
					if( !!options.element ) {
						// Space around the zoomed in element to leave on screen
						var padding = 20;
						var bounds = options.element.getBoundingClientRect();

						options.x = bounds.left - padding;
						options.y = bounds.top - padding;
						options.width = bounds.width + ( padding * 2 );
						options.height = bounds.height + ( padding * 2 );
					}

					// If width/height values are set, calculate scale from those values
					if( options.width !== undefined && options.height !== undefined ) {
						options.scale = Math.max( Math.min( window.innerWidth / options.width, window.innerHeight / options.height ), 1 );
					}

					if( options.scale > 1 ) {
						options.x *= options.scale;
						options.y *= options.scale;

						magnify( options, options.scale );

						if( options.pan !== false ) {

							// Wait with engaging panning as it may conflict with the
							// zoom transition
							panEngageTimeout = setTimeout( function() {
								panUpdateInterval = setInterval( pan, 1000 / 60 );
							}, 800 );

						}
					}
				}
			},

			/**
			 * Resets the document zoom state to its default.
			 */
			out: function() {
				clearTimeout( panEngageTimeout );
				clearInterval( panUpdateInterval );

				magnify( { x: 0, y: 0 }, 1 );

				level = 1;
			},

			// Alias
			magnify: function( options ) { this.to( options ) },
			reset: function() { this.out() },

			zoomLevel: function() {
				return level;
			}
		}

	})();





/***/ }

/******/ });