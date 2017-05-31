/*! Hammer.JS - v1.0.6dev - 2013-11-05
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */

!function(a,b){"use strict";function c(){if(!d.READY){d.event.determineEventTypes();for(var a in d.gestures)d.gestures.hasOwnProperty(a)&&d.detection.register(d.gestures[a]);d.event.onTouch(d.DOCUMENT,d.EVENT_MOVE,d.detection.detect),d.event.onTouch(d.DOCUMENT,d.EVENT_END,d.detection.detect),d.READY=!0}}var d=function(a,b){return new d.Instance(a,b||{})};d.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"",tapHighlightColor:"rgba(0,0,0,0)"}},d.HAS_POINTEREVENTS=a.navigator.pointerEnabled||a.navigator.msPointerEnabled,d.HAS_TOUCHEVENTS="ontouchstart"in a,d.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android|silk/i,d.NO_MOUSEEVENTS=d.HAS_TOUCHEVENTS&&a.navigator.userAgent.match(d.MOBILE_REGEX),d.EVENT_TYPES={},d.DIRECTION_DOWN="down",d.DIRECTION_LEFT="left",d.DIRECTION_UP="up",d.DIRECTION_RIGHT="right",d.POINTER_MOUSE="mouse",d.POINTER_TOUCH="touch",d.POINTER_PEN="pen",d.EVENT_START="start",d.EVENT_MOVE="move",d.EVENT_END="end",d.DOCUMENT=a.document,d.plugins=d.plugins||{},d.gestures=d.gestures||{},d.READY=!1,d.Instance=function(a,b){var e=this;return c(),this.element=a,this.enabled=!0,this.options=d.utils.extend(d.utils.extend({},d.defaults),b||{}),this.options.stop_browser_behavior&&d.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),d.event.onTouch(a,d.EVENT_START,function(a){e.enabled&&d.detection.startDetect(e,a)}),this},d.Instance.prototype={on:function(a,b){for(var c=a.split(" "),d=0;d<c.length;d++)this.element.addEventListener(c[d],b,!1);return this},off:function(a,b){for(var c=a.split(" "),d=0;d<c.length;d++)this.element.removeEventListener(c[d],b,!1);return this},trigger:function(a,b){b||(b={});var c=d.DOCUMENT.createEvent("Event");c.initEvent(a,!0,!0),c.gesture=b;var e=this.element;return d.utils.hasParent(b.target,e)&&(e=b.target),e.dispatchEvent(c),this},enable:function(a){return this.enabled=a,this}};var e=null,f=!1,g=!1;d.event={bindDom:function(a,b,c){for(var d=b.split(" "),e=0;e<d.length;e++)a.addEventListener(d[e],c,!1)},onTouch:function(a,b,c){var h=this;this.bindDom(a,d.EVENT_TYPES[b],function(i){var j=i.type.toLowerCase();if(!j.match(/mouse/)||!g){j.match(/touch/)||j.match(/pointerdown/)||j.match(/mouse/)&&1===i.which?f=!0:j.match(/mouse/)&&1!==i.which&&(f=!1),j.match(/touch|pointer/)&&(g=!0);var k=0;f&&(d.HAS_POINTEREVENTS&&b!=d.EVENT_END?k=d.PointerEvent.updatePointer(b,i):j.match(/touch/)?k=i.touches.length:g||(k=j.match(/up/)?0:1),k>0&&b==d.EVENT_END?b=d.EVENT_MOVE:k||(b=d.EVENT_END),(k||null===e)&&(e=i),c.call(d.detection,h.collectEventData(a,b,h.getTouchList(e,b),i)),d.HAS_POINTEREVENTS&&b==d.EVENT_END&&(k=d.PointerEvent.updatePointer(b,i))),k||(e=null,f=!1,g=!1,d.PointerEvent.reset())}})},determineEventTypes:function(){var a;a=d.HAS_POINTEREVENTS?d.PointerEvent.getEvents():d.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],d.EVENT_TYPES[d.EVENT_START]=a[0],d.EVENT_TYPES[d.EVENT_MOVE]=a[1],d.EVENT_TYPES[d.EVENT_END]=a[2]},getTouchList:function(a){return d.HAS_POINTEREVENTS?d.PointerEvent.getTouchList():a.touches?a.touches:(a.indentifier=1,[a])},collectEventData:function(a,b,c,e){var f=d.POINTER_TOUCH;return(e.type.match(/mouse/)||d.PointerEvent.matchType(d.POINTER_MOUSE,e))&&(f=d.POINTER_MOUSE),{center:d.utils.getCenter(c),timeStamp:(new Date).getTime(),target:e.target,touches:c,eventType:b,pointerType:f,srcEvent:e,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return d.detection.stopDetect()}}}},d.PointerEvent={pointers:{},getTouchList:function(){var a=this,b=[];return Object.keys(a.pointers).sort().forEach(function(c){b.push(a.pointers[c])}),b},updatePointer:function(a,b){return a==d.EVENT_END?this.pointers={}:(b.identifier=b.pointerId,this.pointers[b.pointerId]=b),Object.keys(this.pointers).length},matchType:function(a,b){if(!b.pointerType)return!1;var c={};return c[d.POINTER_MOUSE]=b.pointerType==b.MSPOINTER_TYPE_MOUSE||b.pointerType==d.POINTER_MOUSE,c[d.POINTER_TOUCH]=b.pointerType==b.MSPOINTER_TYPE_TOUCH||b.pointerType==d.POINTER_TOUCH,c[d.POINTER_PEN]=b.pointerType==b.MSPOINTER_TYPE_PEN||b.pointerType==d.POINTER_PEN,c[a]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},d.utils={extend:function(a,c,d){for(var e in c)a[e]!==b&&d||(a[e]=c[e]);return a},hasParent:function(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1},getCenter:function(a){for(var b,c=[],d=[],e=0,f=a.length;f>e;e++)b=a[e],c.push("undefined"!=typeof b.clientX?b.clientX:b.pageX),d.push("undefined"!=typeof b.clientY?b.clientY:b.pageY);return{pageX:(Math.min.apply(Math,c)+Math.max.apply(Math,c))/2,pageY:(Math.min.apply(Math,d)+Math.max.apply(Math,d))/2}},getVelocity:function(a,b,c){return{x:Math.abs(b/a)||0,y:Math.abs(c/a)||0}},getAngle:function(a,b){var c=b.pageY-a.pageY,d=b.pageX-a.pageX;return 180*Math.atan2(c,d)/Math.PI},getDirection:function(a,b){var c=Math.abs(a.pageX-b.pageX),e=Math.abs(a.pageY-b.pageY);return c>=e?a.pageX-b.pageX>0?d.DIRECTION_LEFT:d.DIRECTION_RIGHT:a.pageY-b.pageY>0?d.DIRECTION_UP:d.DIRECTION_DOWN},getDistance:function(a,b){var c=b.pageX-a.pageX,d=b.pageY-a.pageY;return Math.sqrt(c*c+d*d)},getScale:function(a,b){return a.length>=2&&b.length>=2?this.getDistance(b[0],b[1])/this.getDistance(a[0],a[1]):1},getRotation:function(a,b){return a.length>=2&&b.length>=2?this.getAngle(b[1],b[0])-this.getAngle(a[1],a[0]):0},isVertical:function(a){return a==d.DIRECTION_UP||a==d.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(a,b){var c,d=["webkit","khtml","moz","Moz","ms","o",""];if(b&&a.style){for(var e=0;e<d.length;e++)for(var f in b)b.hasOwnProperty(f)&&(c=f,d[e]&&(c=d[e]+c.substring(0,1).toUpperCase()+c.substring(1)),a.style[c]=b[f]);"none"==b.userSelect&&(a.onselectstart=function(){return!1}),"none"==b.userDrag&&(a.ondragstart=function(){return!1})}}},d.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(a,b){this.current||(this.stopped=!1,this.current={inst:a,startEvent:d.utils.extend({},b),lastEvent:!1,name:""},this.detect(b))},detect:function(a){if(this.current&&!this.stopped){a=this.extendEventData(a);for(var b=this.current.inst.options,c=0,e=this.gestures.length;e>c;c++){var f=this.gestures[c];if(!this.stopped&&b[f.name]!==!1&&f.handler.call(f,a,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=a),a.eventType==d.EVENT_END&&!a.touches.length-1&&this.stopDetect(),a}},stopDetect:function(){this.previous=d.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(a){var b=this.current.startEvent;if(b&&(a.touches.length!=b.touches.length||a.touches===b.touches)){b.touches=[];for(var c=0,e=a.touches.length;e>c;c++)b.touches.push(d.utils.extend({},a.touches[c]))}var f,g,h=a.timeStamp-b.timeStamp,i=a.center.pageX-b.center.pageX,j=a.center.pageY-b.center.pageY,k=d.utils.getVelocity(h,i,j);return"end"===a.eventType?(f=this.current.lastEvent&&this.current.lastEvent.interimAngle,g=this.current.lastEvent&&this.current.lastEvent.interimDirection):(f=this.current.lastEvent&&d.utils.getAngle(this.current.lastEvent.center,a.center),g=this.current.lastEvent&&d.utils.getDirection(this.current.lastEvent.center,a.center)),d.utils.extend(a,{deltaTime:h,deltaX:i,deltaY:j,velocityX:k.x,velocityY:k.y,distance:d.utils.getDistance(b.center,a.center),angle:d.utils.getAngle(b.center,a.center),interimAngle:f,direction:d.utils.getDirection(b.center,a.center),interimDirection:g,scale:d.utils.getScale(b.touches,a.touches),rotation:d.utils.getRotation(b.touches,a.touches),startEvent:b}),a},register:function(a){var c=a.defaults||{};return c[a.name]===b&&(c[a.name]=!0),d.utils.extend(d.defaults,c,!0),a.index=a.index||1e3,this.gestures.push(a),this.gestures.sort(function(a,b){return a.index<b.index?-1:a.index>b.index?1:0}),this.gestures}},d.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,correct_for_drag_min_distance:!0,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(a,b){if(d.detection.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),this.triggered=!1,void 0;if(!(b.options.drag_max_touches>0&&a.touches.length>b.options.drag_max_touches))switch(a.eventType){case d.EVENT_START:this.triggered=!1;break;case d.EVENT_MOVE:if(a.distance<b.options.drag_min_distance&&d.detection.current.name!=this.name)return;if(d.detection.current.name!=this.name&&(d.detection.current.name=this.name,b.options.correct_for_drag_min_distance&&a.distance>0)){var c=Math.abs(b.options.drag_min_distance/a.distance);d.detection.current.startEvent.center.pageX+=a.deltaX*c,d.detection.current.startEvent.center.pageY+=a.deltaY*c,a=d.detection.extendEventData(a)}(d.detection.current.lastEvent.drag_locked_to_axis||b.options.drag_lock_to_axis&&b.options.drag_lock_min_distance<=a.distance)&&(a.drag_locked_to_axis=!0);var e=d.detection.current.lastEvent.direction;a.drag_locked_to_axis&&e!==a.direction&&(a.direction=d.utils.isVertical(e)?a.deltaY<0?d.DIRECTION_UP:d.DIRECTION_DOWN:a.deltaX<0?d.DIRECTION_LEFT:d.DIRECTION_RIGHT),this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),b.trigger(this.name+a.direction,a),(b.options.drag_block_vertical&&d.utils.isVertical(a.direction)||b.options.drag_block_horizontal&&!d.utils.isVertical(a.direction))&&a.preventDefault();break;case d.EVENT_END:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},d.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(a,b){switch(a.eventType){case d.EVENT_START:clearTimeout(this.timer),d.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==d.detection.current.name&&b.trigger("hold",a)},b.options.hold_timeout);break;case d.EVENT_MOVE:a.distance>b.options.hold_threshold&&clearTimeout(this.timer);break;case d.EVENT_END:clearTimeout(this.timer)}}},d.gestures.Release={name:"release",index:1/0,handler:function(a,b){a.eventType==d.EVENT_END&&b.trigger(this.name,a)}},d.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_min_touches:1,swipe_max_touches:1,swipe_velocity:.7},handler:function(a,b){if(a.eventType==d.EVENT_END){if(b.options.swipe_max_touches>0&&a.touches.length<b.options.swipe_min_touches&&a.touches.length>b.options.swipe_max_touches)return;(a.velocityX>b.options.swipe_velocity||a.velocityY>b.options.swipe_velocity)&&(b.trigger(this.name,a),b.trigger(this.name+a.direction,a))}}},d.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(a,b){if(a.eventType==d.EVENT_END&&"touchcancel"!=a.srcEvent.type){var c=d.detection.previous,e=!1;if(a.deltaTime>b.options.tap_max_touchtime||a.distance>b.options.tap_max_distance)return;c&&"tap"==c.name&&a.timeStamp-c.lastEvent.timeStamp<b.options.doubletap_interval&&a.distance<b.options.doubletap_distance&&(b.trigger("doubletap",a),e=!0),(!e||b.options.tap_always)&&(d.detection.current.name="tap",b.trigger(d.detection.current.name,a))}}},d.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(a,b){return b.options.prevent_mouseevents&&a.pointerType==d.POINTER_MOUSE?(a.stopDetect(),void 0):(b.options.prevent_default&&a.preventDefault(),a.eventType==d.EVENT_START&&b.trigger(this.name,a),void 0)}},d.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(a,b){if(d.detection.current.name!=this.name&&this.triggered)return b.trigger(this.name+"end",a),this.triggered=!1,void 0;if(!(a.touches.length<2))switch(b.options.transform_always_block&&a.preventDefault(),a.eventType){case d.EVENT_START:this.triggered=!1;break;case d.EVENT_MOVE:var c=Math.abs(1-a.scale),e=Math.abs(a.rotation);if(c<b.options.transform_min_scale&&e<b.options.transform_min_rotation)return;d.detection.current.name=this.name,this.triggered||(b.trigger(this.name+"start",a),this.triggered=!0),b.trigger(this.name,a),e>b.options.transform_min_rotation&&b.trigger("rotate",a),c>b.options.transform_min_scale&&(b.trigger("pinch",a),b.trigger("pinch"+(a.scale<1?"in":"out"),a));break;case d.EVENT_END:this.triggered&&b.trigger(this.name+"end",a),this.triggered=!1}}},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return d}):"object"==typeof module&&"object"==typeof module.exports?module.exports=d:a.Hammer=d}(this);
/*
 * Project: Twitter Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Contributors: Mattia Larentis
 *
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 *
 * A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 *
 * License: MIT
 *
 * http://cameronspear.com/blog/twitter-bootstrap-dropdown-on-hover-plugin/
 */(function(e,t,n){if("ontouchstart"in document)return;var r=e();e.fn.dropdownHover=function(n){r=r.add(this.parent());return this.each(function(){var i=e(this),s=i.parent(),o={delay:100,instantlyCloseOthers:!0},u={delay:e(this).data("delay"),instantlyCloseOthers:e(this).data("close-others")},a=e.extend(!0,{},o,n,u),f;s.hover(function(n){if(!s.hasClass("open")&&!i.is(n.target))return!0;a.instantlyCloseOthers===!0&&r.removeClass("open");t.clearTimeout(f);s.addClass("open");s.trigger(e.Event("show.bs.dropdown"))},function(){f=t.setTimeout(function(){s.removeClass("open");s.trigger("hide.bs.dropdown")},a.delay)});i.hover(function(){a.instantlyCloseOthers===!0&&r.removeClass("open");t.clearTimeout(f);s.addClass("open");s.trigger(e.Event("show.bs.dropdown"))});s.find(".dropdown-submenu").each(function(){var n=e(this),r;n.hover(function(){t.clearTimeout(r);n.children(".dropdown-menu").show();n.siblings().children(".dropdown-menu").hide()},function(){var e=n.children(".dropdown-menu");r=t.setTimeout(function(){e.hide()},a.delay)})})})};e(document).ready(function(){e('[data-hover="dropdown"]').dropdownHover()})})(jQuery,this);
/*!
 * bootstrap-progressbar v0.6.0 by @minddust
 * Copyright (c) 2012-2013 Stephan Gross
 *
 * https://www.minddust.com/bootstrap-progressbar
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
!function(t){"use strict";var e=function(n,s){this.$element=t(n),this.options=t.extend({},e.defaults,s)};e.defaults={transition_delay:300,refresh_speed:50,display_text:"none",use_percentage:!0,percent_format:function(t){return t+"%"},amount_format:function(t,e){return t+" / "+e},update:t.noop,done:t.noop,fail:t.noop},e.prototype.transition=function(){var n=this.$element,s=n.parent(),a=t('<div class="progress-tooltip"/>'),i=this.$back_text,r=this.$front_text,o=this.options,h=n.attr("aria-valuetransitiongoal"),p=n.attr("aria-valuemin")||0,f=n.attr("aria-valuemax")||100,c=s.hasClass("vertical"),d=o.update&&"function"==typeof o.update?o.update:e.defaults.update,u=o.done&&"function"==typeof o.done?o.done:e.defaults.done,l=o.fail&&"function"==typeof o.fail?o.fail:e.defaults.fail;if(!h)return l("aria-valuetransitiongoal not set"),void 0;var g=Math.round(100*(h-p)/(f-p));if("center"===o.display_text&&!i&&!r){this.$back_text=i=t("<span>",{"class":"progressbar-back-text"}).prependTo(s),this.$front_text=r=t("<span>",{"class":"progressbar-front-text"}).prependTo(n);var _;c?(_=s.css("height"),i.css({height:_,"line-height":_}),r.css({height:_,"line-height":_}),t(window).resize(function(){_=s.css("height"),i.css({height:_,"line-height":_}),r.css({height:_,"line-height":_})})):(_=s.css("width"),r.css({width:_}),t(window).resize(function(){_=s.css("width"),r.css({width:_})}))}setTimeout(function(){var t,e,l,_,v;c?n.css("height",g+"%"):n.css("width",g+"%");var x=setInterval(function(){c?(l=n.height(),_=s.height()):(l=n.width(),_=s.width()),t=Math.round(100*l/_),e=Math.round(l/_*(f-p)),t>=g&&(t=g,e=h,u(),clearInterval(x)),"none"!==o.display_text&&(v=o.use_percentage?o.percent_format(t):o.amount_format(e,f),"fill"===o.display_text?n.text(v):"tooltip"===o.display_text?(a.prependTo(n),a.text(v)):"center"===o.display_text&&(i.text(v),r.text(v))),n.attr("aria-valuenow",e),d(t)},o.refresh_speed)},o.transition_delay)};var n=t.fn.progressbar;t.fn.progressbar=function(n){return this.each(function(){var s=t(this),a=s.data("bs.progressbar"),i="object"==typeof n&&n;a||s.data("bs.progressbar",a=new e(this,i)),a.transition()})},t.fn.progressbar.Constructor=e,t.fn.progressbar.noConflict=function(){return t.fn.progressbar=n,this}}(window.jQuery);
/* ===========================================================
 * bootstrap-modalmanager.js v2.2.0
 * ===========================================================
 * Copyright 2012 Jordan Schroter.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function(e){"use strict";function t(e){return function(t){return this===t.target?e.apply(this,arguments):void 0}}var n=function(e,t){this.init(e,t)};n.prototype={constructor:n,init:function(t,n){if(this.$element=e(t),this.options=e.extend({},e.fn.modalmanager.defaults,this.$element.data(),"object"==typeof n&&n),this.stack=[],this.backdropCount=0,this.options.resize){var o,a=this;e(window).on("resize.modal",function(){o&&clearTimeout(o),o=setTimeout(function(){for(var e=0;e<a.stack.length;e++)a.stack[e].isShown&&a.stack[e].layout()},10)})}},createModal:function(t,n){e(t).modal(e.extend({manager:this},n))},appendModal:function(n){this.stack.push(n);var o=this;n.$element.on("show.modalmanager",t(function(){var t=function(){n.isShown=!0;var t=e.support.transition&&n.$element.hasClass("fade");o.$element.toggleClass("modal-open",o.hasOpenModal()).toggleClass("page-overflow",e(window).height()<o.$element.height()),n.$parent=n.$element.parent(),n.$container=o.createContainer(n),n.$element.appendTo(n.$container),o.backdrop(n,function(){n.$element.show(),t&&n.$element[0].offsetWidth,n.layout(),n.$element.addClass("in").attr("aria-hidden",!1);var a=function(){o.setFocus(),n.$element.trigger("shown")};t?n.$element.one(e.support.transition.end,a):a()})};n.options.replace?o.replace(t):t()})),n.$element.on("hidden.modalmanager",t(function(){if(o.backdrop(n),n.$backdrop){var t=e.support.transition&&n.$element.hasClass("fade");t&&n.$element[0].offsetWidth,e.support.transition&&n.$element.hasClass("fade")?n.$backdrop.one(e.support.transition.end,function(){o.destroyModal(n)}):o.destroyModal(n)}else o.destroyModal(n)})),n.$element.on("destroy.modalmanager",t(function(){o.removeModal(n)}))},destroyModal:function(e){e.destroy();var t=this.hasOpenModal();this.$element.toggleClass("modal-open",t),t||this.$element.removeClass("page-overflow"),this.removeContainer(e),this.setFocus()},getOpenModals:function(){for(var e=[],t=0;t<this.stack.length;t++)this.stack[t].isShown&&e.push(this.stack[t]);return e},hasOpenModal:function(){return this.getOpenModals().length>0},setFocus:function(){for(var e,t=0;t<this.stack.length;t++)this.stack[t].isShown&&(e=this.stack[t]);e&&e.focus()},removeModal:function(e){e.$element.off(".modalmanager"),e.$backdrop&&this.removeBackdrop(e),this.stack.splice(this.getIndexOfModal(e),1)},getModalAt:function(e){return this.stack[e]},getIndexOfModal:function(e){for(var t=0;t<this.stack.length;t++)if(e===this.stack[t])return t},replace:function(n){for(var o,a=0;a<this.stack.length;a++)this.stack[a].isShown&&(o=this.stack[a]);o?(this.$backdropHandle=o.$backdrop,o.$backdrop=null,n&&o.$element.one("hidden",t(e.proxy(n,this))),o.hide()):n&&n()},removeBackdrop:function(e){e.$backdrop.remove(),e.$backdrop=null},createBackdrop:function(t,n){var o;return this.$backdropHandle?(o=this.$backdropHandle,o.off(".modalmanager"),this.$backdropHandle=null,this.isLoading&&this.removeSpinner()):o=e(n).addClass(t).appendTo(this.$element),o},removeContainer:function(e){e.$container.remove(),e.$container=null},createContainer:function(n){var a;return a=e('<div class="modal-scrollable">').css("z-index",o("modal",this.getOpenModals().length)).appendTo(this.$element),n&&"static"!=n.options.backdrop?a.on("click.modal",t(function(){n.hide()})):n&&a.on("click.modal",t(function(){n.attention()})),a},backdrop:function(t,n){var a=t.$element.hasClass("fade")?"fade":"",s=t.options.backdrop&&this.backdropCount<this.options.backdropLimit;if(t.isShown&&s){var i=e.support.transition&&a&&!this.$backdropHandle;t.$backdrop=this.createBackdrop(a,t.options.backdropTemplate),t.$backdrop.css("z-index",o("backdrop",this.getOpenModals().length)),i&&t.$backdrop[0].offsetWidth,t.$backdrop.addClass("in"),this.backdropCount+=1,i?t.$backdrop.one(e.support.transition.end,n):n()}else if(!t.isShown&&t.$backdrop){t.$backdrop.removeClass("in"),this.backdropCount-=1;var r=this;e.support.transition&&t.$element.hasClass("fade")?t.$backdrop.one(e.support.transition.end,function(){r.removeBackdrop(t)}):r.removeBackdrop(t)}else n&&n()},removeSpinner:function(){this.$spinner&&this.$spinner.remove(),this.$spinner=null,this.isLoading=!1},removeLoading:function(){this.$backdropHandle&&this.$backdropHandle.remove(),this.$backdropHandle=null,this.removeSpinner()},loading:function(t){if(t=t||function(){},this.$element.toggleClass("modal-open",!this.isLoading||this.hasOpenModal()).toggleClass("page-overflow",e(window).height()<this.$element.height()),this.isLoading)if(this.isLoading&&this.$backdropHandle){this.$backdropHandle.removeClass("in");var n=this;e.support.transition?this.$backdropHandle.one(e.support.transition.end,function(){n.removeLoading()}):n.removeLoading()}else t&&t(this.isLoading);else{this.$backdropHandle=this.createBackdrop("fade",this.options.backdropTemplate),this.$backdropHandle[0].offsetWidth;var a=this.getOpenModals();this.$backdropHandle.css("z-index",o("backdrop",a.length+1)).addClass("in");var s=e(this.options.spinner).css("z-index",o("modal",a.length+1)).appendTo(this.$element).addClass("in");this.$spinner=e(this.createContainer()).append(s).on("click.modalmanager",e.proxy(this.loading,this)),this.isLoading=!0,e.support.transition?this.$backdropHandle.one(e.support.transition.end,t):t()}}};var o=function(){var t,n={};return function(o,a){if("undefined"==typeof t){var s=e('<div class="modal hide" />').appendTo("body"),i=e('<div class="modal-backdrop hide" />').appendTo("body");n.modal=+s.css("z-index"),n.backdrop=+i.css("z-index"),t=n.modal-n.backdrop,s.remove(),i.remove(),i=s=null}return n[o]+t*a}}();e.fn.modalmanager=function(t,o){return this.each(function(){var a=e(this),s=a.data("modalmanager");s||a.data("modalmanager",s=new n(this,t)),"string"==typeof t&&s[t].apply(s,[].concat(o))})},e.fn.modalmanager.defaults={backdropLimit:999,resize:!0,spinner:'<div class="loading-spinner fade" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="progress-bar progress-bar-theme" role="progressbar" aria-valuenow="100" style="width: 100%"></div></div><div class="txtLoad">Loading...</div></div>',backdropTemplate:'<div class="modal-backdrop " />'},e.fn.modalmanager.Constructor=n}(jQuery);


/* ===========================================================
 * bootstrap-modal.js v2.2.0
 * ===========================================================
 * Copyright 2012 Jordan Schroter
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function(t){"use strict";var i=function(t,i){this.init(t,i)};i.prototype={constructor:i,init:function(i,e){var n=this;this.options=e,this.$element=t(i).delegate('[data-dismiss="modal"]',"click.dismiss.modal",t.proxy(this.hide,this)),this.options.remote&&this.$element.find(".modal-body").load(this.options.remote,function(){var i=t.Event("loaded");n.$element.trigger(i)});var s="function"==typeof this.options.manager?this.options.manager.call(this):this.options.manager;s=s.appendModal?s:t(s).modalmanager().data("modalmanager"),s.appendModal(this)},toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var i=t.Event("show");this.isShown||(this.$element.trigger(i),i.isDefaultPrevented()||(this.escape(),this.tab(),this.options.loading&&this.loading()))},hide:function(i){return i&&i.preventDefault(),i=t.Event("hide"),this.$element.trigger(i),!this.isShown||i.isDefaultPrevented()?this.isShown=!1:(this.isShown=!1,this.escape(),this.tab(),this.isLoading&&this.loading(),t(document).off("focusin.modal"),this.$element.removeClass("in").removeClass("animated").removeClass(this.options.attentionAnimation).removeClass("modal-overflow").attr("aria-hidden",!0),t.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal(),void 0)},layout:function(){var i=this.options.height?"height":"max-height",e=this.options.height||this.options.maxHeight;if(this.options.width){this.$element.css("width",this.options.width);var n=this;this.$element.css("margin-left",function(){return/%/gi.test(n.options.width)?-(parseInt(n.options.width)/2)+"%":-(t(this).width()/2)+"px"})}else this.$element.css("width",""),this.$element.css("margin-left","");this.$element.find(".modal-body").css("overflow","").css(i,""),e&&this.$element.find(".modal-body").css("overflow","hidden").css(i,e);var s=t(window).height()-10<this.$element.height();s||this.options.modalOverflow?this.$element.css("margin-top",0).addClass("modal-overflow"):this.$element.css("margin-top",0-this.$element.height()/2).removeClass("modal-overflow")},tab:function(){var i=this;this.isShown&&this.options.consumeTab?this.$element.on("keydown.tabindex.modal","[data-tabindex]",function(e){if(e.keyCode&&9==e.keyCode){var n=t(this),s=t(this);i.$element.find("[data-tabindex]:enabled:not([readonly])").each(function(i){n=i.shiftKey?n.data("tabindex")>t(this).data("tabindex")?n=t(this):s=t(this):n.data("tabindex")<t(this).data("tabindex")?n=t(this):s=t(this)}),n[0]!==t(this)[0]?n.focus():s.focus(),e.preventDefault()}}):this.isShown||this.$element.off("keydown.tabindex.modal")},escape:function(){var t=this;this.isShown&&this.options.keyboard?(this.$element.attr("tabindex")||this.$element.attr("tabindex",-1),this.$element.on("keyup.dismiss.modal",function(i){27==i.which&&t.hide()})):this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var i=this,e=setTimeout(function(){i.$element.off(t.support.transition.end),i.hideModal()},500);this.$element.one(t.support.transition.end,function(){clearTimeout(e),i.hideModal()})},hideModal:function(){var t=this.options.height?"height":"max-height",i=this.options.height||this.options.maxHeight;i&&this.$element.find(".modal-body").css("overflow","").css(t,""),this.$element.hide().trigger("hidden")},removeLoading:function(){this.$loading.remove(),this.$loading=null,this.isLoading=!1},loading:function(i){i=i||function(){};var e=this.$element.hasClass("fade")?"fade":"";if(this.isLoading)if(this.isLoading&&this.$loading){this.$loading.removeClass("in");var n=this;t.support.transition&&this.$element.hasClass("fade")?this.$loading.one(t.support.transition.end,function(){n.removeLoading()}):n.removeLoading()}else i&&i(this.isLoading);else{var s=t.support.transition&&e;this.$loading=t('<div class="loading-mask '+e+'">').append(this.options.spinner).appendTo(this.$element),s&&this.$loading[0].offsetWidth,this.$loading.addClass("in"),this.isLoading=!0,s?this.$loading.one(t.support.transition.end,i):i()}},focus:function(){var t=this.$element.find(this.options.focusOn);t=t.length?t:this.$element,t.focus()},attention:function(){if(this.options.attentionAnimation){this.$element.removeClass("animated").removeClass(this.options.attentionAnimation);var t=this;setTimeout(function(){t.$element.addClass("animated").addClass(t.options.attentionAnimation)},0)}this.focus()},destroy:function(){var i=t.Event("destroy");this.$element.trigger(i),i.isDefaultPrevented()||this.teardown()},teardown:function(){return this.$parent.length?(this.$parent!==this.$element.parent()&&this.$element.appendTo(this.$parent),this.$element.off(".modal"),this.$element.removeData("modal"),this.$element.removeClass("in").attr("aria-hidden",!0),void 0):(this.$element.remove(),this.$element=null,void 0)}},t.fn.modal=function(e,n){return this.each(function(){var s=t(this),o=s.data("modal"),a=t.extend({},t.fn.modal.defaults,s.data(),"object"==typeof e&&e);o||s.data("modal",o=new i(this,a)),"string"==typeof e?o[e].apply(o,[].concat(n)):a.show&&o.show()})},t.fn.modal.defaults={keyboard:!0,backdrop:!0,loading:!1,show:!0,width:null,height:null,maxHeight:null,modalOverflow:!1,consumeTab:!0,focusOn:null,replace:!1,resize:!1,attentionAnimation:"shake",manager:"body",spinner:'<div class="loading-spinner" style="width: 200px; margin-left: -100px;"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div>',backdropTemplate:'<div class="modal-backdrop" />'},t.fn.modal.Constructor=i,t(function(){t(document).off("click.modal").on("click.modal.data-api",'[data-toggle="modal"]',function(i){var e=t(this),n=e.attr("href"),s=t(e.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),o=s.data("modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},s.data(),e.data());i.preventDefault(),s.modal(o).one("hide",function(){e.focus()})})})}(window.jQuery);



/* =========================================================
 * bootstrap-tabdrop.js 
 * http://www.eyecon.ro/bootstrap-tabdrop
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function(t){var n=function(){var n,e=[],o=!1,d=function(){clearTimeout(n),n=setTimeout(i,100)},i=function(){for(var t=0,n=e.length;n>t;t++)e[t].apply()};return{register:function(n){e.push(n),o===!1&&(t(window).bind("resize",d),o=!0)},unregister:function(t){for(var n=0,o=e.length;o>n;n++)if(e[n]==t){delete e[n];break}}}}(),e=function(e,o){this.element=t(e),this.padding=parseInt(this.element.css("padding-top")),this.dropdown=t('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">'+o.text+' <span class="badge"></span></a><ul class="dropdown-menu"></ul></li>').prependTo(this.element),this.element.parent().is(".tabs-below")&&this.dropdown.addClass("dropup"),n.register(t.proxy(this.layout,this)),this.layout()};e.prototype={constructor:e,layout:function(){var n=[],e=this.padding;this.dropdown.removeClass("hide"),this.element.append(this.dropdown.find("li")).find(">li").not(".tabdrop").each(function(){this.offsetTop>e&&n.push(this)}),n.length>0?(n=t(n),this.dropdown.find("ul").empty().append(n),console.log(n.length),this.dropdown.find(".badge").text(n.length),1==this.dropdown.find(".active").length?this.dropdown.addClass("active"):this.dropdown.removeClass("active")):this.dropdown.addClass("hide")}},t.fn.tabdrop=function(n){return this.each(function(){var o=t(this),d=o.data("tabdrop"),i="object"==typeof n&&n;d||o.data("tabdrop",d=new e(this,t.extend({},t.fn.tabdrop.defaults,i))),"string"==typeof n&&d[n]()})},t.fn.tabdrop.defaults={text:'<i class="fa fa-align-right"></i>'},t.fn.tabdrop.Constructor=e}(window.jQuery);

