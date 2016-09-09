'use strict';

var marked = require('./plugin/markdown/marked.js');
var notes,
    notesValue,
    currentState,
    currentSlide,
    upcomingSlide,
    connected = false;

window.addEventListener('message', function (event) {

  var data = JSON.parse(event.data);

  // The overview mode is only useful to the reveal.js instance
  // where navigation occurs so we don't sync it
  if (data.state) delete data.state.overview;

  // Messages sent by the notes plugin inside of the main window
  if (data && data.namespace === 'reveal-notes') {
    if (data.type === 'connect') {
      handleConnectMessage(data);
    } else if (data.type === 'state') {
      handleStateMessage(data);
    }
  }
  // Messages sent by the reveal.js inside of the current slide preview
  else if (data && data.namespace === 'reveal') {
      if (/ready/.test(data.eventName)) {
        // Send a message back to notify that the handshake is complete
        window.opener.postMessage(JSON.stringify({
          namespace: 'reveal-notes',
          type: 'connected'
        }), '*');
      } else if (/slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test(data.eventName) && currentState !== JSON.stringify(data.state)) {

        window.opener.postMessage(JSON.stringify({
          method: 'setState',
          args: [data.state]
        }), '*');
      }
    }
});

/**
 * Called when the main window is trying to establish a
 * connection.
 */
function handleConnectMessage(data) {

  if (connected === false) {
    connected = true;

    setupIframes(data);
    setupKeyboard();
    setupNotes();
    setupTimer();
  }
}

/**
 * Called when the main window sends an updated state.
 */
function handleStateMessage(data) {

  // Store the most recently set state to avoid circular loops
  // applying the same state
  currentState = JSON.stringify(data.state);

  // No need for updating the notes in case of fragment changes
  if (data.notes) {
    notes.classList.remove('hidden');
    notesValue.style.whiteSpace = data.whitespace;
    if (data.markdown) {
      notesValue.innerHTML = marked(data.notes);
    } else {
      notesValue.innerHTML = data.notes;
    }
  } else {
    notes.classList.add('hidden');
  }

  // Update the note slides
  currentSlide.contentWindow.postMessage(JSON.stringify({
    method: 'setState',
    args: [data.state]
  }), '*');
  upcomingSlide.contentWindow.postMessage(JSON.stringify({
    method: 'setState',
    args: [data.state]
  }), '*');
  upcomingSlide.contentWindow.postMessage(JSON.stringify({
    method: 'next'
  }), '*');
}

// Limit to max one state update per X ms
handleStateMessage = debounce(handleStateMessage, 200);

/**
 * Forward keyboard events to the current slide window.
 * This enables keyboard events to work even if focus
 * isn't set on the current slide iframe.
 */
function setupKeyboard() {

  document.addEventListener('keydown', function (event) {
    currentSlide.contentWindow.postMessage(JSON.stringify({
      method: 'triggerKey',
      args: [event.keyCode]
    }), '*');
  });
}

/**
 * Creates the preview iframes.
 */
function setupIframes(data) {

  var params = ['receiver', 'progress=false', 'history=false', 'transition=none', 'autoSlide=0', 'backgroundTransition=none'].join('&');

  var urlSeparator = /\?/.test(data.url) ? '&' : '?';
  var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
  var currentURL = data.url + urlSeparator + params + '&postMessageEvents=true' + hash;
  var upcomingURL = data.url + urlSeparator + params + '&controls=false' + hash;

  currentSlide = document.createElement('iframe');
  currentSlide.setAttribute('width', 1280);
  currentSlide.setAttribute('height', 1024);
  currentSlide.setAttribute('src', currentURL);
  document.querySelector('#current-slide').appendChild(currentSlide);

  upcomingSlide = document.createElement('iframe');
  upcomingSlide.setAttribute('width', 640);
  upcomingSlide.setAttribute('height', 512);
  upcomingSlide.setAttribute('src', upcomingURL);
  document.querySelector('#upcoming-slide').appendChild(upcomingSlide);
}

/**
 * Setup the notes UI.
 */
function setupNotes() {

  notes = document.querySelector('.speaker-controls-notes');
  notesValue = document.querySelector('.speaker-controls-notes .value');
}

/**
 * Create the timer and clock and start updating them
 * at an interval.
 */
function setupTimer() {

  var start = new Date(),
      timeEl = document.querySelector('.speaker-controls-time'),
      clockEl = timeEl.querySelector('.clock-value'),
      hoursEl = timeEl.querySelector('.hours-value'),
      minutesEl = timeEl.querySelector('.minutes-value'),
      secondsEl = timeEl.querySelector('.seconds-value');

  function _updateTimer() {

    var diff,
        hours,
        minutes,
        seconds,
        now = new Date();

    diff = now.getTime() - start.getTime();
    hours = Math.floor(diff / (1000 * 60 * 60));
    minutes = Math.floor(diff / (1000 * 60) % 60);
    seconds = Math.floor(diff / 1000 % 60);

    clockEl.innerHTML = now.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
    hoursEl.innerHTML = zeroPadInteger(hours);
    hoursEl.className = hours > 0 ? '' : 'mute';
    minutesEl.innerHTML = ':' + zeroPadInteger(minutes);
    minutesEl.className = minutes > 0 ? '' : 'mute';
    secondsEl.innerHTML = ':' + zeroPadInteger(seconds);
  }

  // Update once directly
  _updateTimer();

  // Then update every second
  setInterval(_updateTimer, 1000);

  timeEl.addEventListener('click', function () {
    start = new Date();
    _updateTimer();
    return false;
  });
}

function zeroPadInteger(num) {

  var str = '00' + parseInt(num);
  return str.substring(str.length - 2);
}

/**
 * Limits the frequency at which a function can be called.
 */
function debounce(fn, ms) {

  var lastTime = 0,
      timeout;

  return function () {

    var args = arguments;
    var context = this;

    clearTimeout(timeout);

    var timeSinceLastCall = Date.now() - lastTime;
    if (timeSinceLastCall > ms) {
      fn.apply(context, args);
      lastTime = Date.now();
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args);
        lastTime = Date.now();
      }, ms - timeSinceLastCall);
    }
  };
}