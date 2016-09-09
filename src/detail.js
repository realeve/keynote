require('./lib/js/head.min.js');

var $ = require('./js/jquery.min.js');
var Reveal = require('./js/reveal.js');

var screenfull = require('./js/img.screenfull.js');
var hljs = require('./plugin/highlight/highlight.min.js');

require('./plugin/notes/notes.js');

require('./plugin/zoom-js/zoom.js');

Reveal.extend = require('./js/painter.js');
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

    require('./plugin/markdown/markdown.js');
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