import {
  __commonJS,
  init_define_DOCSEARCH_OPTIONS,
  init_define_EXTERNAL_LINK_ICON_LOCALES,
  init_define_MZ_ZOOM_OPTIONS
} from "./chunk-LBD5ZNMO.js";

// node_modules/sakura-js/dist/sakura.js
var require_sakura = __commonJS({
  "node_modules/sakura-js/dist/sakura.js"() {
    "use strict";
    init_define_DOCSEARCH_OPTIONS();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    var Sakura = function Sakura2(selector, options) {
      var _this = this;
      if (typeof selector === "undefined") {
        throw new Error("No selector present. Define an element.");
      }
      this.el = document.querySelector(selector);
      var defaults = {
        className: "sakura",
        fallSpeed: 1,
        maxSize: 14,
        minSize: 10,
        delay: 300,
        colors: [{
          gradientColorStart: "rgba(255, 183, 197, 0.9)",
          gradientColorEnd: "rgba(255, 197, 208, 0.9)",
          gradientColorDegree: 120
        }]
      };
      var extend = function extend2(originalObj, newObj) {
        Object.keys(originalObj).forEach(function(key) {
          if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
            var origin = originalObj;
            origin[key] = newObj[key];
          }
        });
        return originalObj;
      };
      this.settings = extend(defaults, options);
      this.el.style.overflowX = "hidden";
      function randomArrayElem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
      function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var prefixes = ["webkit", "moz", "MS", "o", ""];
      function PrefixedEvent(element, type, callback) {
        for (var p = 0; p < prefixes.length; p += 1) {
          var animType = type;
          if (!prefixes[p]) {
            animType = type.toLowerCase();
          }
          element.addEventListener(prefixes[p] + animType, callback, false);
        }
      }
      function elementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
      }
      this.createPetal = function() {
        if (_this.el.dataset.sakuraAnimId) {
          setTimeout(function() {
            window.requestAnimationFrame(_this.createPetal);
          }, _this.settings.delay);
        }
        var animationNames = {
          blowAnimations: ["blow-soft-left", "blow-medium-left", "blow-soft-right", "blow-medium-right"],
          swayAnimations: ["sway-0", "sway-1", "sway-2", "sway-3", "sway-4", "sway-5", "sway-6", "sway-7", "sway-8"]
        };
        var blowAnimation = randomArrayElem(animationNames.blowAnimations);
        var swayAnimation = randomArrayElem(animationNames.swayAnimations);
        var fallTime = (document.documentElement.clientHeight * 7e-3 + Math.round(Math.random() * 5)) * _this.settings.fallSpeed;
        var animationsArr = ["fall ".concat(fallTime, "s linear 0s 1"), "".concat(blowAnimation, " ").concat((fallTime > 30 ? fallTime : 30) - 20 + randomInt(0, 20), "s linear 0s infinite"), "".concat(swayAnimation, " ").concat(randomInt(2, 4), "s linear 0s infinite")];
        var animations = animationsArr.join(", ");
        var petal = document.createElement("div");
        petal.classList.add(_this.settings.className);
        var height = randomInt(_this.settings.minSize, _this.settings.maxSize);
        var width = height - Math.floor(randomInt(0, _this.settings.minSize) / 3);
        var color = randomArrayElem(_this.settings.colors);
        petal.style.background = "linear-gradient(".concat(color.gradientColorDegree, "deg, ").concat(color.gradientColorStart, ", ").concat(color.gradientColorEnd, ")");
        petal.style.webkitAnimation = animations;
        petal.style.animation = animations;
        petal.style.borderRadius = "".concat(randomInt(_this.settings.maxSize, _this.settings.maxSize + Math.floor(Math.random() * 10)), "px ").concat(randomInt(1, Math.floor(width / 4)), "px");
        petal.style.height = "".concat(height, "px");
        petal.style.left = "".concat(Math.random() * document.documentElement.clientWidth - 100, "px");
        petal.style.marginTop = "".concat(-(Math.floor(Math.random() * 20) + 15), "px");
        petal.style.width = "".concat(width, "px");
        PrefixedEvent(petal, "AnimationEnd", function() {
          if (!elementInViewport(petal)) {
            petal.remove();
          }
        });
        PrefixedEvent(petal, "AnimationIteration", function() {
          if (!elementInViewport(petal)) {
            petal.remove();
          }
        });
        _this.el.appendChild(petal);
      };
      this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
    };
    Sakura.prototype.start = function() {
      var animId = this.el.dataset.sakuraAnimId;
      if (!animId) {
        this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
      } else {
        throw new Error("Sakura is already running.");
      }
    };
    Sakura.prototype.stop = function() {
      var _this2 = this;
      var graceful = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      var animId = this.el.dataset.sakuraAnimId;
      if (animId) {
        window.cancelAnimationFrame(animId);
        this.el.setAttribute("data-sakura-anim-id", "");
      }
      if (!graceful) {
        setTimeout(function() {
          var petals = document.getElementsByClassName(_this2.settings.className);
          while (petals.length > 0) {
            petals[0].parentNode.removeChild(petals[0]);
          }
        }, this.settings.delay + 50);
      }
    };
  }
});

export {
  require_sakura
};
/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2019 Jeroen Hammann
 *
 * Released under the MIT License
 *
 * Released on: September 4, 2019
 */
//# sourceMappingURL=chunk-YLCJSQRI.js.map
