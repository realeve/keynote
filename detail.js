var getUrlParam = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = encodeURI(window.location.search).substr(1).match(reg);
  if (r !== null) return decodeURI(r[2]);
  return null;
};

const getQueryObj = () => {
  var obj = {
    file: getUrlParam('path'),
    title: getUrlParam('title'),
    theme: getUrlParam('theme')
  };
  if (obj.theme === null) {
    obj.theme = 'league';
  }
  obj.theme = 'tools/css/theme/' + obj.theme + '.css';
  obj.file = './markdown/' + obj.file + '.md';
  // var str = decodeURI(location.search.slice(1));
  // var arr = str.split('&');
  // arr.forEach(value => {
  //   let k = value.split('=')[0];
  //   let v = value.replace(k + '=', '');
  //   if (k && v) obj[k] = v;
  // });

  return obj;
};

document.addEventListener('DOMContentLoaded', () => {
  let node = document.getElementById('stage');
  let queryObj = getQueryObj();
  document.title = queryObj.title;
  document.getElementById('theme').setAttribute('href', queryObj.theme);
  node.dataset.markdown = queryObj.file;
  Reveal.initialize({
    width: 960,
    height: 700,

    // Factor of the display size that should remain empty around the content
    margin: 0.1,

    // Bounds for smallest/largest possible scale to apply to content
    minScale: 0.2,
    maxScale: 1.5,

    history: true,

    dependencies: [{
      src: 'tools/plugin/markdown/marked.js'
    }, {
      src: 'tools/plugin/markdown/markdown.js'
    }]
  });
}, false);