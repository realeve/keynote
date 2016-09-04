const getQueryObj = () => {
  var obj = {};
  var str = decodeURI(location.search.slice(1));
  var arr = str.split('&');
  arr.forEach(value => {
    //当参数中有等于符号时，无法获取正确值
    // let k = value.match(/(.+)=.+|$/)[1];
    // let v = decodeURI(value.match(/.+=(.+)|$/)[1]);
    let k = value.split('=')[0];
    let v = value.replace(k + '=', '');
    if (k && v) obj[k] = v;
  });
  return obj;
};

document.addEventListener('DOMContentLoaded', () => {
  let node = document.getElementById('stage');
  let queryObj = getQueryObj();
  let path = queryObj.path;
  document.title = queryObj.title;
  node.dataset.markdown = path;
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