$(".txt").html(function(a,b){return'<span>'+$.trim(b).split("").join('</span><span>')+'</span>';});
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var b=a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,g){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(a);return this};b.prototype.asyncExecuteBatch_=function(){var a=this;this.asyncExecuteFunction(function(){a.executeBatch_()})};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,
0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var d=a[b];delete a[b];try{d()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(h){b.reject(h)}};e.prototype.createResolveAndReject_=
function(){function a(a){return function(g){d||(d=!0,a.call(b,g))}}var b=this,d=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var b=null!=a;break a;case "function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=
void 0;try{b=a.then}catch(h){this.reject_(h);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b|"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=
this.onSettledCallbacks_,b=0;b<a.length;++b)a[b].call(),a[b]=null;this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var d=this.createResolveAndReject_();try{a.call(b,d.resolve,d.reject)}catch(k){d.reject(k)}};e.prototype.then=function(a,b){function d(a,b){return"function"==typeof a?function(b){try{c(a(b))}catch(l){f(l)}}:b}var c,f,g=new e(function(a,
b){c=a;f=b});this.callWhenSettled_(d(a,c),d(b,f));return g};e.prototype["catch"]=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function d(){switch(c.state_){case 1:a(c.result_);break;case 2:b(c.result_);break;default:throw Error("Unexpected state: "+c.state_);}}var c=this;null==this.onSettledCallbacks_?f.asyncExecute(d):this.onSettledCallbacks_.push(function(){f.asyncExecute(d)})};e.resolve=c;e.reject=function(a){return new e(function(b,d){d(a)})};e.race=function(a){return new e(function(b,
d){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())c(f.value).callWhenSettled_(b,d)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function f(b){return function(d){g[b]=d;h--;0==h&&a(g)}}var g=[],h=0;do g.push(void 0),h++,c(d.value).callWhenSettled_(f(g.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");
$jscomp.executeAsyncGenerator=function(a){function b(b){return a.next(b)}function c(b){return a["throw"](b)}return new Promise(function(d,e){function f(a){a.done?d(a.value):Promise.resolve(a.value).then(b,c).then(f,e)}f(a.next())})};
for(var theGame=document.getElementsByClassName("game")[0],array=document.getElementsByClassName("tile"),moves,colors=[],gameTiles=[],resetButton=document.getElementById("reset-button"),audioToggle=document.getElementById("audio-toggle"),timer,sec,min,manicMode=!1,audioOn=!1,timeOut=document.getElementsByTagName("audio")[1],winner=document.getElementsByTagName("audio")[2],gameOverText=document.getElementsByClassName("hidden")[0],gameReadyText=document.getElementsByClassName("hidden")[1],gameWinText1=
document.getElementsByClassName("hidden")[2],gameWinText2=document.getElementsByClassName("hidden")[3],gameWinText2_1=document.getElementsByClassName("hidden")[4],firstTile=null,matchedPairs=0,i=0;19>i;i++)colors.push("tile-"+i);function Tile(a,b){this.element=a;this.isLocked=this.isOpen=!1;this.element.addEventListener("click",this,!1);this.setColor(b)}function moveCounter(){document.getElementById("move-counter").innerHTML="Moves: "+moves}
Tile.prototype.handleEvent=function(a){switch(a.type){case "click":audioOn&&audioClick(),0===moves&&clockTick(),moves++,this.isOpen||this.isLocked||(this.isOpen=!0,this.element.classList.add("flip"),moveCounter(),checkGame(this))}};Tile.prototype.reset=function(){this.isLocked=this.isOpen=!1;this.element.classList.remove("flip")};Tile.prototype.lock=function(){this.isOpen=this.isLocked=!0};
Tile.prototype.setColor=function(a){this.element.children[0].children[1].classList.remove(this.color);this.color=a;this.element.children[0].children[1].classList.add(a)};function random(a){return Math.floor(Math.random()*a)}function setupGame(){for(var a=getSomeColors(),b=0;b<array.length;b++){var c=random(a.length);c=a.splice(c,1)[0];gameTiles.push(new Tile(array[b],c))}moves=0;randomizeColors();resetTimer()}
function setupManicMode(){manicMode=!0;moves=matchedPairs=0;moveCounter();switchPic();for(i=0;i<gameTiles.length;i++)gameTiles[i].reset();randomizeColors();resetTimer();spin()}function audioClick(){document.getElementsByTagName("audio")[0].play()}function ambientOff(){document.getElementsByTagName("audio")[3].pause();audioOn=!1}function ambientOn(){document.getElementsByTagName("audio")[3].load();document.getElementsByTagName("audio")[3].play();audioOn=!0}
function toggleAudio(){audioOn?ambientOff():ambientOn()}function getSomeColors(){for(var a=colors.slice(),b=[],c=0;c<gameTiles.length/2;c++){var d=random(a.length);b.push(a.splice(d,1)[0])}return b.concat(b.slice())}function padZero(a){return(10>a?"0":"")+a}function clockTick(){null==timer&&(sec=0,timer=setInterval(function(){sec--;0>sec&&(min--,0<=min?sec=59:(min=sec=0,stopTimer(),timeOver()));document.getElementById("timer").innerHTML="Timer: "+padZero(min)+":"+padZero(sec)},1E3))}
function stopTimer(){clearInterval(timer);timer=null}function resetTimer(){sec=0;min=1;document.getElementById("timer").innerHTML="Timer: "+padZero(min)+":"+padZero(sec)}function checkGame(a){if(null===firstTile)firstTile=a;else{if(firstTile.color===a.color)firstTile.lock(),a.lock(),matchedPairs++,matchedPairs===gameTiles.length/2&&(stopTimer(),manicMode?playerWin2():playerWin1());else{var b=firstTile;setTimeout(function(){b.reset();a.reset();firstTile=null},400)}firstTile=null}}
function randomizeColors(){var a=getSomeColors();gameTiles.forEach(function(b){var c=a.splice(random(a.length),1)[0];b.setColor(c)})}function tilesOff(){for(i=0;i<array.length;i++)array[i].classList.add("tile-off")}function tilesOn(){for(i=0;i<array.length;i++)array[i].classList.remove("tile-off")}function rainbowFade(){tilesOff();theGame.classList.add("ending")}function sleep(a){return new Promise(function(b){return setTimeout(b,a)})}
function switchPic(){for(i=0;i<array.length;i++)array[i].classList.add("face")}function spin(){theGame.classList.add("spin")}function stopSpin(){theGame.classList.remove("spin");manicMode=!1}
function timeOver(){return $jscomp.executeAsyncGenerator(function(){function a(a,c,f){for(;;)switch(b){case 0:return manicMode&&stopSpin(),rainbowFade(),audioOn&&timeOut.play(),b=1,{value:sleep(2500),done:!1};case 1:if(1!=a){b=2;break}b=-1;throw f;case 2:return gameOverText.classList.remove("hidden"),b=3,{value:sleep(6E3),done:!1};case 3:if(1!=a){b=4;break}b=-1;throw f;case 4:gameOverText.classList.add("hidden"),b=-1;default:return{value:void 0,done:!0}}}var b=0,c={next:function(b){return a(0,b,void 0)},
"throw":function(b){return a(1,void 0,b)},"return":function(a){throw Error("Not yet implemented");}};$jscomp.initSymbolIterator();c[Symbol.iterator]=function(){return this};return c}())}
function playerWin1(){return $jscomp.executeAsyncGenerator(function(){function a(a,c,f){for(;;)switch(b){case 0:return rainbowFade(),audioOn&&winner.play(),b=1,{value:sleep(2500),done:!1};case 1:if(1!=a){b=2;break}b=-1;throw f;case 2:return gameWinText1.classList.remove("hidden"),b=3,{value:sleep(6E3),done:!1};case 3:if(1!=a){b=4;break}b=-1;throw f;case 4:gameWinText1.classList.add("hidden"),setupManicMode(),tilesOn(),b=-1;default:return{value:void 0,done:!0}}}var b=0,c={next:function(b){return a(0,
b,void 0)},"throw":function(b){return a(1,void 0,b)},"return":function(a){throw Error("Not yet implemented");}};$jscomp.initSymbolIterator();c[Symbol.iterator]=function(){return this};return c}())}
function getReady(){return $jscomp.executeAsyncGenerator(function(){function a(a,c,f){for(;;)switch(b){case 0:return tilesOff(),theGame.classList.remove("hidden"),gameReadyText.classList.remove("hidden"),b=1,{value:sleep(6E3),done:!1};case 1:if(1!=a){b=2;break}b=-1;throw f;case 2:gameReadyText.classList.add("hidden"),clearState(),clearDisplay(),tilesOn(),b=-1;default:return{value:void 0,done:!0}}}var b=0,c={next:function(b){return a(0,b,void 0)},"throw":function(b){return a(1,void 0,b)},"return":function(a){throw Error("Not yet implemented");
}};$jscomp.initSymbolIterator();c[Symbol.iterator]=function(){return this};return c}())}
function playerWin2(){return $jscomp.executeAsyncGenerator(function(){function a(a,c,f){for(;;)switch(b){case 0:return stopSpin(),rainbowFade(),audioOn&&winner.play(),b=1,{value:sleep(2500),done:!1};case 1:if(1!=a){b=2;break}b=-1;throw f;case 2:return gameWinText2.classList.remove("hidden"),b=3,{value:sleep(5E3),done:!1};case 3:if(1!=a){b=4;break}b=-1;throw f;case 4:return gameWinText2.classList.add("hidden"),gameWinText2_1.classList.remove("hidden"),b=5,{value:sleep(6E3),done:!1};case 5:if(1!=a){b=
6;break}b=-1;throw f;case 6:gameWinText2_1.classList.add("hidden"),b=-1;default:return{value:void 0,done:!0}}}var b=0,c={next:function(b){return a(0,b,void 0)},"throw":function(b){return a(1,void 0,b)},"return":function(a){throw Error("Not yet implemented");}};$jscomp.initSymbolIterator();c[Symbol.iterator]=function(){return this};return c}())}
function clearState(){manicMode=!1;stopSpin();gameTiles.forEach(function(a){a.reset()});setTimeout(function(){stopTimer();resetTimer();moves=0;moveCounter();matchedPairs=0;randomizeColors()},500)}function clearDisplay(){theGame.classList.remove("ending");gameOverText.classList.add("hidden");manicMode?(gameWinText2.classList.add("hidden"),gameWinText2_1.classList.add("hidden")):gameWinText1.classList.add("hidden");for(i=0;i<array.length;i++)array[i].classList.remove("tile-off","face")}
resetButton.addEventListener("click",clearDisplay,!1);resetButton.addEventListener("click",clearState,!1);resetButton.addEventListener("click",getReady,!1);resetButton.addEventListener("click",audioClick,!1);audioToggle.addEventListener("click",toggleAudio,!1);audioToggle.addEventListener("click",audioClick,!1);tilesOff();setupGame();
