import {
  __commonJS,
  init_define_DOCSEARCH_OPTIONS,
  init_define_EXTERNAL_LINK_ICON_LOCALES,
  init_define_MZ_ZOOM_OPTIONS
} from "./chunk-LBD5ZNMO.js";

// node_modules/sakura-js/dist/sakura.min.js
var require_sakura_min = __commonJS({
  "node_modules/sakura-js/dist/sakura.min.js"() {
    "use strict";
    init_define_DOCSEARCH_OPTIONS();
    init_define_EXTERNAL_LINK_ICON_LOCALES();
    init_define_MZ_ZOOM_OPTIONS();
    var Sakura = function(t, e) {
      var c = this;
      if (void 0 === t)
        throw new Error("No selector present. Define an element.");
      this.el = document.querySelector(t);
      var a, n;
      function d(t2) {
        return t2[Math.floor(Math.random() * t2.length)];
      }
      function m(t2, e2) {
        return Math.floor(Math.random() * (e2 - t2 + 1)) + t2;
      }
      this.settings = (a = { className: "sakura", fallSpeed: 1, maxSize: 14, minSize: 10, delay: 300, colors: [{ gradientColorStart: "rgba(255, 183, 197, 0.9)", gradientColorEnd: "rgba(255, 197, 208, 0.9)", gradientColorDegree: 120 }] }, n = e, Object.keys(a).forEach(function(t2) {
        n && Object.prototype.hasOwnProperty.call(n, t2) && (a[t2] = n[t2]);
      }), a), this.el.style.overflowX = "hidden";
      var o = ["webkit", "moz", "MS", "o", ""];
      function u(t2, e2, a2) {
        for (var n2 = 0; n2 < o.length; n2 += 1) {
          var i = e2;
          o[n2] || (i = e2.toLowerCase()), t2.addEventListener(o[n2] + i, a2, false);
        }
      }
      function h(t2) {
        var e2 = t2.getBoundingClientRect();
        return 0 <= e2.top && 0 <= e2.left && e2.bottom <= (window.innerHeight || document.documentElement.clientHeight) && e2.right <= (window.innerWidth || document.documentElement.clientWidth);
      }
      this.createPetal = function() {
        c.el.dataset.sakuraAnimId && setTimeout(function() {
          window.requestAnimationFrame(c.createPetal);
        }, c.settings.delay);
        var t2 = ["sway-0", "sway-1", "sway-2", "sway-3", "sway-4", "sway-5", "sway-6", "sway-7", "sway-8"], e2 = d(["blow-soft-left", "blow-medium-left", "blow-soft-right", "blow-medium-right"]), a2 = d(t2), n2 = (7e-3 * document.documentElement.clientHeight + Math.round(5 * Math.random())) * c.settings.fallSpeed, i = ["fall ".concat(n2, "s linear 0s 1"), "".concat(e2, " ").concat((30 < n2 ? n2 : 30) - 20 + m(0, 20), "s linear 0s infinite"), "".concat(a2, " ").concat(m(2, 4), "s linear 0s infinite")].join(", "), o2 = document.createElement("div");
        o2.classList.add(c.settings.className);
        var r = m(c.settings.minSize, c.settings.maxSize), s = r - Math.floor(m(0, c.settings.minSize) / 3), l = d(c.settings.colors);
        o2.style.background = "linear-gradient(".concat(l.gradientColorDegree, "deg, ").concat(l.gradientColorStart, ", ").concat(l.gradientColorEnd, ")"), o2.style.webkitAnimation = i, o2.style.animation = i, o2.style.borderRadius = "".concat(m(c.settings.maxSize, c.settings.maxSize + Math.floor(10 * Math.random())), "px ").concat(m(1, Math.floor(s / 4)), "px"), o2.style.height = "".concat(r, "px"), o2.style.left = "".concat(Math.random() * document.documentElement.clientWidth - 100, "px"), o2.style.marginTop = "".concat(-(Math.floor(20 * Math.random()) + 15), "px"), o2.style.width = "".concat(s, "px"), u(o2, "AnimationEnd", function() {
          h(o2) || o2.remove();
        }), u(o2, "AnimationIteration", function() {
          h(o2) || o2.remove();
        }), c.el.appendChild(o2);
      }, this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
    };
    Sakura.prototype.start = function() {
      if (this.el.dataset.sakuraAnimId)
        throw new Error("Sakura is already running.");
      this.el.setAttribute("data-sakura-anim-id", window.requestAnimationFrame(this.createPetal));
    }, Sakura.prototype.stop = function() {
      var e = this, t = 0 < arguments.length && void 0 !== arguments[0] && arguments[0], a = this.el.dataset.sakuraAnimId;
      a && (window.cancelAnimationFrame(a), this.el.setAttribute("data-sakura-anim-id", "")), t || setTimeout(function() {
        for (var t2 = document.getElementsByClassName(e.settings.className); 0 < t2.length; )
          t2[0].parentNode.removeChild(t2[0]);
      }, this.settings.delay + 50);
    };
  }
});

// dep:sakura-js_dist_sakura_min
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();
var sakura_js_dist_sakura_min_default = require_sakura_min();
export {
  sakura_js_dist_sakura_min_default as default
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
//# sourceMappingURL=sakura-js_dist_sakura_min.js.map
