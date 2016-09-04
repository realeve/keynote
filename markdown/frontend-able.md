# FE ABLE

> 前端，一切皆有可能

> 基础与金融组 - 郭银锋

<p>
	请选择主题: <br>
	<!-- Hacks to swap themes after the page has loaded. Not flexible and only intended for the reveal.js demo deck. -->
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/black.css'); return false;">Black (default)</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/white.css'); return false;">White</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/league.css'); return false;">League</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/sky.css'); return false;">Sky</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/beige.css'); return false;">Beige</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/simple.css'); return false;">Simple</a> <br>
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/serif.css'); return false;">Serif</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/blood.css'); return false;">Blood</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/night.css'); return false;">Night</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/moon.css'); return false;">Moon</a> -
	<a href="#" onclick="document.getElementById('theme').setAttribute('href','css/theme/solarized.css'); return false;">Solarized</a>
</p>

----

# 一起看几个问题

> 用隐喻来理解开发问题

----

## 1.1 飞机的调度问题？

飞机的调度是通过控制塔

而不是通过两个飞机之间直接沟通

***一个飞机对另一个飞机说***

> 老司机，你先飞吧，你飞完我再飞~~~boom~~~

----

## 1.2 mediator模式

> 中介者模式

模块之间尽量别直接相互沟通

如果其中某一个模块出现了问题

可以切换到另一个模块，保证对系统产生最小的影响

----

## 2.1 电视机应该有哪些功能？

很早之前会集成一个CD播放器，现在应该找不到了

> 因为假如说电视机屏幕坏了

> CD播放器也就在一段时间废了

----

## 2.2 松耦合

模块尽量独立，不要直接依赖于另一个模块

----

## 3.1 手机

手机集成了蛮多功能

打电话、听音乐、看视频、拍照片...

> 很正常

> 毕竟是叫 ‘手机’

> 不是叫‘电话机’

## ***用松耦合就解释不清了哦？***

----

## 3.2 高内聚

* 松耦合是相对模块之间而言的
* 高内聚是从模块内部来讲的

***仅仅完成自己该完成的功能***

> 不要挂羊头卖狗肉

### 模块只做好自己该做的事情

----

## 4.1 拼图里的小卡片

每个小卡片并不知道最后会被拼成什么样

***而是让拼图的人观察:***
* 小卡片的图案
* 小卡片的卡槽

----

## 4.2 facade模式

> 外观模式

每个模块只需要完成好自己的功能

然后，只需要告诉别人

### ***你可以做什么事情***

每个代码模块不需要知道自己被放在哪个项目里面

这样代码也可以复用

----

## 5.1 开车或走在路上应该注意什么

> 是他撞的我

> 是他全责

> 看... 我的腿都断了啦！！！

你永远也不能确定一位司机将要做什么

这样才能确保在其他人做出危险动作时你也不会受到伤害

你要承担起保护自己的责任

哪怕是其他司机犯的错误

----

## 5.2 防御式编程

Defensive Programming

----

## 6.1 宝宝的问题

> 宝宝心里苦

没有try catch

后果是...人财两空...

***经纪人的老婆如果写代码，代码可能会不错***

----

## 6.2 Robustness

> 健壮性

----

# 不好玩

> 才疏学浅

> 能举出的前端开发的隐喻、类比比较少

> 普通话还不好

## 我有点不甘心

----

## 我决定秀一波
## English

----

## scalable

> 大小可改变的：|ˈskeɪləbl|

> 需求、功能可增也可减

> 已存在的代码改动不会很大

* 没有large的项目，因为large的项目，可以拆分成了small的项目
* Loose Coupling

----

## reusable

> 能重复使用的：|ˌriːˈjuːzəbl|

> 一段代码可以被多个地方使用到

* 一个项目里的多个模块可以共用同样的代码
* 多个项目间可以共用同样的代码

----

## sustainable

> 可持续发展的：|səˈsteɪnəbl|

> 增加一个新需求

> 需要改动很多之前的代码

换了一个新的developer

## 他对***蛤蛤***说：

# 代码不行，我们重写吧

----

## readable

> 可读性强的：|ˈriːdəbl|

> 首先为人写程序，其次才是为机器

* 你的程序：好似迷宫一样令人摸不清方向，夹杂着各种花招和无关注释
* 我的程序：算法精准，结构紧凑，性能好，注释清晰得体

----

## testable

> 可测试的

> 测试是最常见的改善质量的活动

> --这种实践得到许多业界和学界认可

辣鸡的代码，测试也写不好

----

## bearable 

> 可忍受的：|ˈbeərəbl|

## RAIL 

* Response：对于用户的一个操作，要能在100毫秒内响应
* Animation：每个动画的帧需需要在16毫秒
* IDLE：空闲时切换任务 需要在50毫秒里完成
* Load：给用户看到第一个有意义的界面需要的时候要控制在1秒内

----

## controllable

> 可驾驭的：|kənˈtrəʊləbl|

> 代码监控，有问题早知道

快使用`God`，性能、错误早知道

# ***=>God, 这是今天我最想传达的主题！！！***

----

*@鱼老板：无缝广告哦，有没有红包发我？*

----

## debuggable

> 可排除错误的

* ~~线上出bug，本地改了，发布后检查~~

* ~~微信出bug，本地改了，发布后检查~~

* ...

----

# 呵呵哒

> 上面描述的，我都做不到，与君共勉~~~~

----

## 听不懂你在说什么！
## 好无聊！
# show me 一点 code

> 能力有限

> 代码和上面的描述没有太多关系

> 不过在努力靠拢


----
## 代码介绍

> 牵强附会（秀成语

* 功能
* scalable
* defensive programming

----
# 可以看看

[Introducing RAIL: A User-Centric Model For Performance](https://www.smashingmagazine.com/2015/10/rail-user-centric-model-performance/)

[Scalable JavaScript Application Architecture](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture)

[Patterns For Large-Scale JavaScript Application Architecture](https://addyosmani.com/largescalejavascript/)

《Code Complete》

----

# 没了

> 谢谢大家听我BB~~~

「 一切皆有可能 」 也许只是一句广告语