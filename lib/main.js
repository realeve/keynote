'use strict';

var ajax = function ajax(path, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', path, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
        callback(xhr.responseText);
      }
    }
  };
};

var init = function init(menu) {
  var result = '';
  var data = JSON.parse(menu);
  data.list.forEach(function (value, i) {
    var html = '\n      <li>\n        <a class="author" title="' + value.author + '" href="' + value.homepage + '"><span>' + value.author.replace(/(.).+$/, '$1') + '</span></a>\n        <a class="content" href="./detail.html?file=' + value.path + '&title=' + value.title + '"><div class="arrow"></div>' + (i + 1) + '.' + value.title + ' ( ' + value.author + ' ) </a>\n        <div class="info-wrapper">\n          <a class="icon icon-github" href="' + value.homepage + '" target="_blank"></a>\n          <a class="icon icon-weibo" href="' + value.weibo + '" target="_blank"></a>\n        </div>\n      </li>';
    result += html;
  });
  document.getElementById('list').innerHTML = result;
};

document.addEventListener('DOMContentLoaded', function () {
  ajax('./menu.json', init);
}, false);