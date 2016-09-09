    var Reveal = require('./reveal.js');
    var $=require('./jquery.min.js');
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
