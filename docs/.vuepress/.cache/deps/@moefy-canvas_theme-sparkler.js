import {
  init_define_DOCSEARCH_OPTIONS,
  init_define_EXTERNAL_LINK_ICON_LOCALES,
  init_define_MZ_ZOOM_OPTIONS
} from "./chunk-LBD5ZNMO.js";

// dep:@moefy-canvas_theme-sparkler
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();

// node_modules/@moefy-canvas/theme-sparkler/dist/index.es.js
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();

// node_modules/@moefy-canvas/core/dist/index.es.js
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _rawSize;
var _hd;
var _canvas;
var _offscreenCanvas;
var Theme = class {
  constructor(themeConfig, canvasOptions) {
  }
};
var MAX_Z_INDEX = 2147483647;
var _Canvas = class {
  constructor(el, width, height, hd = true) {
    __privateAdd(this, _rawSize, void 0);
    __privateAdd(this, _hd, void 0);
    __privateSet(this, _rawSize, { width: 0, height: 0 });
    const { el: el_, ctx } = _Canvas.initCanvas(el);
    this.el = el_;
    this.ctx = ctx;
    __privateSet(this, _hd, hd);
    this.size = { width: width || window.innerWidth, height: height || window.innerHeight };
  }
  get size() {
    return __spreadValues({}, __privateGet(this, _rawSize));
  }
  set size({ width: newWidth, height: newHeight }) {
    var _a;
    if (__privateGet(this, _rawSize).width === newWidth && __privateGet(this, _rawSize).height === newHeight) {
      return;
    }
    __privateGet(this, _rawSize).width = newWidth;
    __privateGet(this, _rawSize).height = newHeight;
    const dpr = (_a = __privateGet(this, _hd) ? window.devicePixelRatio : 1) != null ? _a : 1;
    this.el.width = Math.round(__privateGet(this, _rawSize).width * dpr);
    this.el.height = Math.round(__privateGet(this, _rawSize).height * dpr);
    this.el.style.width = __privateGet(this, _rawSize).width + "px";
    this.el.style.height = __privateGet(this, _rawSize).height + "px";
    __privateGet(this, _hd) && this.ctx.scale(dpr, dpr);
  }
  clear() {
    _Canvas.clearCanvas(this.ctx, __spreadValues({}, __privateGet(this, _rawSize)));
  }
  to(canvas) {
    canvas.ctx.drawImage(this.el, 0, 0, __privateGet(this, _rawSize).width, __privateGet(this, _rawSize).height);
  }
  handleResize(_) {
    this.size = { width: window.innerWidth, height: window.innerHeight };
  }
  static setCanvasStyle(canvas, canvasOptions, canvasSize) {
    const style = canvas.style;
    const { zIndex = 0, opacity = 1 } = canvasOptions;
    style.position = "fixed";
    style.top = "0";
    style.left = "0";
    style.zIndex = zIndex.toString();
    style.width = (canvasSize ? canvasSize.width : canvas.width).toString() + "px";
    style.height = (canvasSize ? canvasSize.height : canvas.height).toString() + "px";
    opacity !== 1 && (style.opacity = opacity.toString());
    style.pointerEvents = "none";
  }
  static initCanvas(el) {
    if (!el) {
      el = document.createElement("canvas");
    }
    const ctx = el.getContext("2d");
    return {
      el,
      ctx
    };
  }
  static createOffscreenCanvas() {
    return new _Canvas();
  }
  static clearCanvas(ctx, canvasSize) {
    const { width, height } = canvasSize;
    ctx.clearRect(0, 0, width, height);
  }
};
var Canvas = _Canvas;
_rawSize = /* @__PURE__ */ new WeakMap();
_hd = /* @__PURE__ */ new WeakMap();
var DrawBoard = class {
  constructor(el, width, height, hd = true, useOffscreenCanvas = true, canvasOptions = {
    zIndex: 0,
    opacity: 1
  }) {
    __privateAdd(this, _canvas, void 0);
    __privateAdd(this, _offscreenCanvas, void 0);
    __privateSet(this, _canvas, new Canvas(el, width, height, hd));
    Canvas.setCanvasStyle(__privateGet(this, _canvas).el, canvasOptions, { width, height });
    __privateSet(this, _offscreenCanvas, useOffscreenCanvas ? new Canvas(void 0, width, height, hd) : null);
  }
  get size() {
    return __privateGet(this, _canvas).size;
  }
  draw(callback) {
    var _a;
    const drawingCanvas = (_a = __privateGet(this, _offscreenCanvas)) != null ? _a : __privateGet(this, _canvas);
    drawingCanvas.clear();
    callback(drawingCanvas.ctx, __spreadValues({}, drawingCanvas.size));
  }
  render() {
    if (!__privateGet(this, _offscreenCanvas)) {
      return;
    }
    __privateGet(this, _canvas).clear();
    __privateGet(this, _offscreenCanvas).to(__privateGet(this, _canvas));
  }
  handleResize(event) {
    __privateGet(this, _canvas).handleResize(event);
    __privateGet(this, _offscreenCanvas) && __privateGet(this, _offscreenCanvas).handleResize(event);
  }
  clear() {
    __privateGet(this, _canvas).clear();
    __privateGet(this, _offscreenCanvas) && __privateGet(this, _offscreenCanvas).clear();
  }
};
_canvas = /* @__PURE__ */ new WeakMap();
_offscreenCanvas = /* @__PURE__ */ new WeakMap();

// node_modules/@moefy-canvas/utils/dist/index.es.js
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();
var __accessCheck2 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet2 = (obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd2 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet2 = (obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _eventMap;
var EventsHandler = class {
  constructor() {
    __privateAdd2(this, _eventMap, void 0);
    __privateSet2(this, _eventMap, /* @__PURE__ */ new Map());
  }
  add(type, listener) {
    var _a;
    if (!__privateGet2(this, _eventMap).has(type)) {
      __privateGet2(this, _eventMap).set(type, /* @__PURE__ */ new Set());
    }
    (_a = __privateGet2(this, _eventMap).get(type)) == null ? void 0 : _a.add(listener);
  }
  start(type) {
    if (__privateGet2(this, _eventMap).has(type)) {
      for (const event of __privateGet2(this, _eventMap).get(type)) {
        window.addEventListener(type, event);
      }
    }
  }
  stop(type) {
    if (__privateGet2(this, _eventMap).has(type)) {
      for (const event of __privateGet2(this, _eventMap).get(type)) {
        window.removeEventListener(type, event);
      }
    }
  }
  startAll() {
    for (const type of __privateGet2(this, _eventMap).keys()) {
      this.start(type);
    }
  }
  stopAll() {
    for (const type of __privateGet2(this, _eventMap).keys()) {
      this.stop(type);
    }
  }
  clear() {
    __privateGet2(this, _eventMap).clear();
  }
};
_eventMap = /* @__PURE__ */ new WeakMap();
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function isTouchEvent(event) {
  if (event.touches) {
    return true;
  }
  return false;
}
var Random = class {
  static randomFloat(start, end) {
    return Math.random() * (end - start) + start;
  }
  static randomInt(start, end) {
    return Math.floor(Random.randomFloat(start, end));
  }
  static choice(range) {
    const length = range.length;
    const randomIndex = Math.floor(length * Math.random());
    return range[randomIndex];
  }
  static color(colorHexStringOrArray = "0123456789ABCDEF") {
    return "#" + Random.choice(colorHexStringOrArray) + Random.choice(colorHexStringOrArray) + Random.choice(colorHexStringOrArray) + Random.choice(colorHexStringOrArray) + Random.choice(colorHexStringOrArray) + Random.choice(colorHexStringOrArray);
  }
};
function showBadge(appName, {
  leftColor = "#fff",
  rightColor = "#444",
  leftBgColor = "#35495e",
  rightBgColor = "#00ffc0"
} = {}) {
  console.log(`%c ${appName} %c v${"0.3.3"} ${"a117dec"} %c`, `background: ${leftBgColor}; padding: 2px; color: ${leftColor}; font-weight: bold; text-transform: uppercase;`, `background: ${rightBgColor}; padding: 2px; color: ${rightColor}; font-weight: bold; text-transform: uppercase;`, "background: transparent");
}

// node_modules/color2k/dist/index.module.es.js
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();
function guard(low, high, value) {
  return Math.min(Math.max(low, value), high);
}
var ColorError = class extends Error {
  constructor(color) {
    super(`Failed to parse color: "${color}"`);
  }
};
var ColorError$1 = ColorError;
function parseToRgba(color) {
  if (typeof color !== "string")
    throw new ColorError$1(color);
  if (color.trim().toLowerCase() === "transparent")
    return [0, 0, 0, 0];
  let normalizedColor = color.trim();
  normalizedColor = namedColorRegex.test(color) ? nameToHex(color) : color;
  const reducedHexMatch = reducedHexRegex.exec(normalizedColor);
  if (reducedHexMatch) {
    const arr = Array.from(reducedHexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(r(x, 2), 16)), parseInt(r(arr[3] || "f", 2), 16) / 255];
  }
  const hexMatch = hexRegex.exec(normalizedColor);
  if (hexMatch) {
    const arr = Array.from(hexMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 16)), parseInt(arr[3] || "ff", 16) / 255];
  }
  const rgbaMatch = rgbaRegex.exec(normalizedColor);
  if (rgbaMatch) {
    const arr = Array.from(rgbaMatch).slice(1);
    return [...arr.slice(0, 3).map((x) => parseInt(x, 10)), parseFloat(arr[3] || "1")];
  }
  const hslaMatch = hslaRegex.exec(normalizedColor);
  if (hslaMatch) {
    const [h, s, l, a] = Array.from(hslaMatch).slice(1).map(parseFloat);
    if (guard(0, 100, s) !== s)
      throw new ColorError$1(color);
    if (guard(0, 100, l) !== l)
      throw new ColorError$1(color);
    return [...hslToRgb(h, s, l), a || 1];
  }
  throw new ColorError$1(color);
}
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i) {
    hash2 = hash2 * 33 ^ str.charCodeAt(--i);
  }
  return (hash2 >>> 0) % 2341;
}
var colorToInt = (x) => parseInt(x.replace(/_/g, ""), 36);
var compressedColorMap = "1q29ehhb 1n09sgk7 1kl1ekf_ _yl4zsno 16z9eiv3 1p29lhp8 _bd9zg04 17u0____ _iw9zhe5 _to73___ _r45e31e _7l6g016 _jh8ouiv _zn3qba8 1jy4zshs 11u87k0u 1ro9yvyo 1aj3xael 1gz9zjz0 _3w8l4xo 1bf1ekf_ _ke3v___ _4rrkb__ 13j776yz _646mbhl _nrjr4__ _le6mbhl 1n37ehkb _m75f91n _qj3bzfz 1939yygw 11i5z6x8 _1k5f8xs 1509441m 15t5lwgf _ae2th1n _tg1ugcv 1lp1ugcv 16e14up_ _h55rw7n _ny9yavn _7a11xb_ 1ih442g9 _pv442g9 1mv16xof 14e6y7tu 1oo9zkds 17d1cisi _4v9y70f _y98m8kc 1019pq0v 12o9zda8 _348j4f4 1et50i2o _8epa8__ _ts6senj 1o350i2o 1mi9eiuo 1259yrp0 1ln80gnw _632xcoy 1cn9zldc _f29edu4 1n490c8q _9f9ziet 1b94vk74 _m49zkct 1kz6s73a 1eu9dtog _q58s1rz 1dy9sjiq __u89jo3 _aj5nkwg _ld89jo3 13h9z6wx _qa9z2ii _l119xgq _bs5arju 1hj4nwk9 1qt4nwk9 1ge6wau6 14j9zlcw 11p1edc_ _ms1zcxe _439shk6 _jt9y70f _754zsow 1la40eju _oq5p___ _x279qkz 1fa5r3rv _yd2d9ip _424tcku _8y1di2_ _zi2uabw _yy7rn9h 12yz980_ __39ljp6 1b59zg0x _n39zfzp 1fy9zest _b33k___ _hp9wq92 1il50hz4 _io472ub _lj9z3eo 19z9ykg0 _8t8iu3a 12b9bl4a 1ak5yw0o _896v4ku _tb8k8lv _s59zi6t _c09ze0p 1lg80oqn 1id9z8wb _238nba5 1kq6wgdi _154zssg _tn3zk49 _da9y6tc 1sg7cv4f _r12jvtt 1gq5fmkz 1cs9rvci _lp9jn1c _xw1tdnb 13f9zje6 16f6973h _vo7ir40 _bt5arjf _rc45e4t _hr4e100 10v4e100 _hc9zke2 _w91egv_ _sj2r1kk 13c87yx8 _vqpds__ _ni8ggk8 _tj9yqfb 1ia2j4r4 _7x9b10u 1fc9ld4j 1eq9zldr _5j9lhpx _ez9zl6o _md61fzm".split(" ").reduce((acc, next) => {
  const key = colorToInt(next.substring(0, 3));
  const hex = colorToInt(next.substring(3)).toString(16);
  let prefix = "";
  for (let i = 0; i < 6 - hex.length; i++) {
    prefix += "0";
  }
  acc[key] = `${prefix}${hex}`;
  return acc;
}, {});
function nameToHex(color) {
  const normalizedColorName = color.toLowerCase().trim();
  const result = compressedColorMap[hash(normalizedColorName)];
  if (!result)
    throw new ColorError$1(color);
  return `#${result}`;
}
var r = (str, amount) => Array.from(Array(amount)).map(() => str).join("");
var reducedHexRegex = new RegExp(`^#${r("([a-f0-9])", 3)}([a-f0-9])?$`, "i");
var hexRegex = new RegExp(`^#${r("([a-f0-9]{2})", 3)}([a-f0-9]{2})?$`, "i");
var rgbaRegex = new RegExp(`^rgba?\\(\\s*(\\d+)\\s*${r(",\\s*(\\d+)\\s*", 2)}(?:,\\s*([\\d.]+))?\\s*\\)$`, "i");
var hslaRegex = /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%(?:\s*,\s*([\d.]+))?\s*\)$/i;
var namedColorRegex = /^[a-z]+$/i;
var roundColor = (color) => {
  return Math.round(color * 255);
};
var hslToRgb = (hue, saturation, lightness) => {
  let l = lightness / 100;
  if (saturation === 0) {
    return [l, l, l].map(roundColor);
  }
  const huePrime = (hue % 360 + 360) % 360 / 60;
  const chroma = (1 - Math.abs(2 * l - 1)) * (saturation / 100);
  const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  let red = 0;
  let green = 0;
  let blue = 0;
  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }
  const lightnessModification = l - chroma / 2;
  const finalRed = red + lightnessModification;
  const finalGreen = green + lightnessModification;
  const finalBlue = blue + lightnessModification;
  return [finalRed, finalGreen, finalBlue].map(roundColor);
};
function rgba(red, green, blue, alpha) {
  return `rgba(${guard(0, 255, red).toFixed()}, ${guard(0, 255, green).toFixed()}, ${guard(0, 255, blue).toFixed()}, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`;
}
function transparentize(color, amount) {
  const [r3, g, b, a] = parseToRgba(color);
  return rgba(r3, g, b, a - amount);
}
function opacify(color, amount) {
  return transparentize(color, -amount);
}

// node_modules/ts-debounce/dist/src/index.esm.js
init_define_DOCSEARCH_OPTIONS();
init_define_EXTERNAL_LINK_ICON_LOCALES();
init_define_MZ_ZOOM_OPTIONS();
function r2(r3, e, n) {
  var i, t, o;
  void 0 === e && (e = 50), void 0 === n && (n = {});
  var a = null != (i = n.isImmediate) && i, u = null != (t = n.callback) && t, c = n.maxWait, v = Date.now(), l = [];
  function f() {
    if (void 0 !== c) {
      var r4 = Date.now() - v;
      if (r4 + e >= c)
        return c - r4;
    }
    return e;
  }
  var d = function() {
    var e2 = [].slice.call(arguments), n2 = this;
    return new Promise(function(i2, t2) {
      var c2 = a && void 0 === o;
      if (void 0 !== o && clearTimeout(o), o = setTimeout(function() {
        if (o = void 0, v = Date.now(), !a) {
          var i3 = r3.apply(n2, e2);
          u && u(i3), l.forEach(function(r4) {
            return (0, r4.resolve)(i3);
          }), l = [];
        }
      }, f()), c2) {
        var d2 = r3.apply(n2, e2);
        return u && u(d2), i2(d2);
      }
      l.push({ resolve: i2, reject: t2 });
    });
  };
  return d.cancel = function(r4) {
    void 0 !== o && clearTimeout(o), l.forEach(function(e2) {
      return (0, e2.reject)(r4);
    }), l = [];
  }, d;
}

// node_modules/@moefy-canvas/theme-sparkler/dist/index.es.js
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var __accessCheck3 = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet3 = (obj, member, getter) => {
  __accessCheck3(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd3 = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet3 = (obj, member, value, setter) => {
  __accessCheck3(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck3(obj, member, "access private method");
  return method;
};
var _startTime;
var _startPosition;
var _duration;
var _distance;
var _angle;
var _size;
var _color;
var _direction;
var _opacity;
var _position;
var _mode;
var _numParticles;
var _sparkleFactor;
var _particleDurationRange;
var _particleDistanceRange;
var _particleSizeRange;
var _canvasOptions;
var _board;
var _particles;
var _mousePosition;
var _originalSparkleFactor;
var _paused;
var _stopped;
var _eventsHandler;
var _listen;
var listen_fn;
var _unlisten;
var unlisten_fn;
var _startAnimation;
var startAnimation_fn;
var _handleMouseMove;
var handleMouseMove_fn;
var _handleMouseDown;
var handleMouseDown_fn;
var _handleMouseUp;
var handleMouseUp_fn;
var _handleResize;
var handleResize_fn;
var _handleVisibilityChange;
var handleVisibilityChange_fn;
function normalize(x, MIN, MAX) {
  return (x - MIN) / (MAX - MIN);
}
var Particle = class {
  constructor(startTime = 0, startPosition = { x: 0, y: 0 }, duration = Random.randomInt(50, 500), distance = Random.randomInt(40, 100), angle = Random.randomFloat(0, Math.PI * 2), size = Random.randomInt(1, 3), color = Random.choice(["yellow", "pink", "red", "orange", "purple", "cyan"])) {
    __privateAdd3(this, _startTime, void 0);
    __privateAdd3(this, _startPosition, void 0);
    __privateAdd3(this, _duration, void 0);
    __privateAdd3(this, _distance, void 0);
    __privateAdd3(this, _angle, void 0);
    __privateAdd3(this, _size, void 0);
    __privateAdd3(this, _color, void 0);
    __privateAdd3(this, _direction, void 0);
    __privateAdd3(this, _opacity, 1);
    __privateAdd3(this, _position, void 0);
    __privateSet3(this, _startTime, startTime);
    __privateSet3(this, _startPosition, startPosition);
    __privateSet3(this, _duration, duration);
    __privateSet3(this, _distance, distance);
    __privateSet3(this, _angle, angle);
    __privateSet3(this, _size, size);
    __privateSet3(this, _color, color);
    __privateSet3(this, _direction, {
      x: Math.cos(__privateGet3(this, _angle)) * __privateGet3(this, _distance),
      y: Math.sin(__privateGet3(this, _angle)) * __privateGet3(this, _distance)
    });
    __privateSet3(this, _position, __spreadValues2({}, __privateGet3(this, _startPosition)));
  }
  move(currentTime) {
    const step = normalize(currentTime, __privateGet3(this, _startTime), __privateGet3(this, _startTime) + __privateGet3(this, _duration));
    __privateGet3(this, _position).x = __privateGet3(this, _startPosition).x + __privateGet3(this, _direction).x * step;
    __privateGet3(this, _position).y = __privateGet3(this, _startPosition).y + __privateGet3(this, _direction).y * step;
    __privateSet3(this, _opacity, 1 - step);
  }
  draw(canvasContext, currentTime) {
    canvasContext.fillStyle = opacify(__privateGet3(this, _color), __privateGet3(this, _opacity));
    canvasContext.beginPath();
    canvasContext.arc(__privateGet3(this, _position).x, __privateGet3(this, _position).y, __privateGet3(this, _size), 0, Math.PI * 2);
    canvasContext.fill();
  }
  shouldRemove(currentTime) {
    return currentTime > __privateGet3(this, _startTime) + __privateGet3(this, _duration);
  }
};
_startTime = /* @__PURE__ */ new WeakMap();
_startPosition = /* @__PURE__ */ new WeakMap();
_duration = /* @__PURE__ */ new WeakMap();
_distance = /* @__PURE__ */ new WeakMap();
_angle = /* @__PURE__ */ new WeakMap();
_size = /* @__PURE__ */ new WeakMap();
_color = /* @__PURE__ */ new WeakMap();
_direction = /* @__PURE__ */ new WeakMap();
_opacity = /* @__PURE__ */ new WeakMap();
_position = /* @__PURE__ */ new WeakMap();
var SparklerMode = ((SparklerMode2) => {
  SparklerMode2["FOLLOW"] = "follow";
  SparklerMode2["TRAIL"] = "trail";
  return SparklerMode2;
})(SparklerMode || {});
var Sparkler = class {
  constructor({
    mode = "trail",
    numParticles = 20,
    sparkleFactor = 1,
    particleDurationRange = [50, 500],
    particleDistanceRange = [40, 100],
    particleSizeRange = [1, 3]
  } = {}, canvasOptions = {}) {
    __privateAdd3(this, _listen);
    __privateAdd3(this, _unlisten);
    __privateAdd3(this, _startAnimation);
    __privateAdd3(this, _handleMouseMove);
    __privateAdd3(this, _handleMouseDown);
    __privateAdd3(this, _handleMouseUp);
    __privateAdd3(this, _handleResize);
    __privateAdd3(this, _handleVisibilityChange);
    __privateAdd3(this, _mode, void 0);
    __privateAdd3(this, _numParticles, void 0);
    __privateAdd3(this, _sparkleFactor, void 0);
    __privateAdd3(this, _particleDurationRange, void 0);
    __privateAdd3(this, _particleDistanceRange, void 0);
    __privateAdd3(this, _particleSizeRange, void 0);
    __privateAdd3(this, _canvasOptions, void 0);
    __privateAdd3(this, _board, null);
    __privateAdd3(this, _particles, /* @__PURE__ */ new Set());
    __privateAdd3(this, _mousePosition, null);
    __privateAdd3(this, _originalSparkleFactor, void 0);
    __privateAdd3(this, _paused, false);
    __privateAdd3(this, _stopped, false);
    __privateAdd3(this, _eventsHandler, new EventsHandler());
    __privateSet3(this, _mode, mode);
    __privateSet3(this, _numParticles, numParticles);
    __privateSet3(this, _sparkleFactor, sparkleFactor);
    __privateSet3(this, _particleDurationRange, particleDurationRange);
    __privateSet3(this, _particleDistanceRange, particleDistanceRange);
    __privateSet3(this, _particleSizeRange, particleSizeRange);
    __privateSet3(this, _originalSparkleFactor, __privateGet3(this, _sparkleFactor));
    __privateSet3(this, _canvasOptions, canvasOptions);
    this.animate = this.animate.bind(this);
  }
  mount(el) {
    __privateSet3(this, _stopped, false);
    __privateSet3(this, _board, new DrawBoard(el, window.innerWidth, window.innerHeight, true, true, __privateGet3(this, _canvasOptions)));
    __privateMethod(this, _listen, listen_fn).call(this);
    showBadge("Theme Sparkler \u{1F387}", { leftBgColor: "#989900" });
  }
  unmount() {
    __privateMethod(this, _unlisten, unlisten_fn).call(this);
    __privateSet3(this, _stopped, true);
    __privateSet3(this, _mousePosition, null);
  }
  animate(currentTime) {
    if (__privateGet3(this, _stopped)) {
      __privateGet3(this, _board).clear();
      return;
    }
    requestAnimationFrame(this.animate);
    if (__privateGet3(this, _paused)) {
      return;
    }
    for (const particle of __privateGet3(this, _particles)) {
      particle.move(currentTime);
    }
    __privateGet3(this, _board).draw((ctx, canvasSize) => {
      for (const particle of __privateGet3(this, _particles)) {
        particle.draw(ctx, currentTime);
        if (particle.shouldRemove(currentTime)) {
          __privateGet3(this, _particles).delete(particle);
        }
      }
    });
    __privateGet3(this, _board).render();
    while (__privateGet3(this, _particles).size < __privateGet3(this, _numParticles)) {
      __privateGet3(this, _particles).add(new Particle(currentTime + Random.randomInt(0, 300 / __privateGet3(this, _sparkleFactor)), __privateGet3(this, _mode) === "trail" ? __spreadValues2({}, __privateGet3(this, _mousePosition)) : __privateGet3(this, _mousePosition), Random.randomFloat(__privateGet3(this, _particleDurationRange)[0], __privateGet3(this, _particleDurationRange)[1] / __privateGet3(this, _sparkleFactor)), Random.randomFloat(__privateGet3(this, _particleDistanceRange)[0], __privateGet3(this, _particleDistanceRange)[1] * (__privateGet3(this, _sparkleFactor) === 1 ? 1 : __privateGet3(this, _sparkleFactor) / 3)), Random.randomFloat(0, Math.PI * 2), Random.randomInt(__privateGet3(this, _particleSizeRange)[0], __privateGet3(this, _particleSizeRange)[1] * (__privateGet3(this, _sparkleFactor) === 1 ? 1 : __privateGet3(this, _sparkleFactor) / 3)), Random.choice(["yellow", "pink", "red", "orange", "purple", "cyan"])));
    }
  }
};
_mode = /* @__PURE__ */ new WeakMap();
_numParticles = /* @__PURE__ */ new WeakMap();
_sparkleFactor = /* @__PURE__ */ new WeakMap();
_particleDurationRange = /* @__PURE__ */ new WeakMap();
_particleDistanceRange = /* @__PURE__ */ new WeakMap();
_particleSizeRange = /* @__PURE__ */ new WeakMap();
_canvasOptions = /* @__PURE__ */ new WeakMap();
_board = /* @__PURE__ */ new WeakMap();
_particles = /* @__PURE__ */ new WeakMap();
_mousePosition = /* @__PURE__ */ new WeakMap();
_originalSparkleFactor = /* @__PURE__ */ new WeakMap();
_paused = /* @__PURE__ */ new WeakMap();
_stopped = /* @__PURE__ */ new WeakMap();
_eventsHandler = /* @__PURE__ */ new WeakMap();
_listen = /* @__PURE__ */ new WeakSet();
listen_fn = function() {
  if (isMobile()) {
    __privateGet3(this, _eventsHandler).add("touchstart", __privateMethod(this, _handleMouseDown, handleMouseDown_fn).bind(this));
    __privateGet3(this, _eventsHandler).add("touchmove", __privateMethod(this, _handleMouseMove, handleMouseMove_fn).bind(this));
    __privateGet3(this, _eventsHandler).add("touchend", __privateMethod(this, _handleMouseUp, handleMouseUp_fn).bind(this));
  } else {
    __privateGet3(this, _eventsHandler).add("mousedown", __privateMethod(this, _handleMouseDown, handleMouseDown_fn).bind(this));
    __privateGet3(this, _eventsHandler).add("mousemove", __privateMethod(this, _handleMouseMove, handleMouseMove_fn).bind(this));
    __privateGet3(this, _eventsHandler).add("mouseup", __privateMethod(this, _handleMouseUp, handleMouseUp_fn).bind(this));
  }
  __privateGet3(this, _eventsHandler).add("visibilitychange", __privateMethod(this, _handleVisibilityChange, handleVisibilityChange_fn).bind(this));
  __privateGet3(this, _eventsHandler).add("resize", r2(__privateMethod(this, _handleResize, handleResize_fn).bind(this), 500));
  __privateGet3(this, _eventsHandler).startAll();
};
_unlisten = /* @__PURE__ */ new WeakSet();
unlisten_fn = function() {
  __privateGet3(this, _eventsHandler).stopAll();
  __privateGet3(this, _eventsHandler).clear();
};
_startAnimation = /* @__PURE__ */ new WeakSet();
startAnimation_fn = function() {
  requestAnimationFrame(this.animate);
};
_handleMouseMove = /* @__PURE__ */ new WeakSet();
handleMouseMove_fn = function(event) {
  const currentPosition = {
    x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
    y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY
  };
  if (!__privateGet3(this, _mousePosition)) {
    __privateSet3(this, _mousePosition, { x: currentPosition.x, y: currentPosition.y });
    __privateMethod(this, _startAnimation, startAnimation_fn).call(this);
    return;
  }
  __privateGet3(this, _mousePosition).x = currentPosition.x;
  __privateGet3(this, _mousePosition).y = currentPosition.y;
};
_handleMouseDown = /* @__PURE__ */ new WeakSet();
handleMouseDown_fn = function(event) {
  const currentPosition = {
    x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
    y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY
  };
  if (!__privateGet3(this, _mousePosition)) {
    __privateSet3(this, _mousePosition, { x: currentPosition.x, y: currentPosition.y });
    __privateMethod(this, _startAnimation, startAnimation_fn).call(this);
  }
  __privateGet3(this, _mousePosition).x = currentPosition.x;
  __privateGet3(this, _mousePosition).y = currentPosition.y;
  if (__privateGet3(this, _sparkleFactor) === __privateGet3(this, _originalSparkleFactor)) {
    __privateSet3(this, _sparkleFactor, __privateGet3(this, _sparkleFactor) * 4);
  }
};
_handleMouseUp = /* @__PURE__ */ new WeakSet();
handleMouseUp_fn = function(event) {
  __privateSet3(this, _sparkleFactor, __privateGet3(this, _originalSparkleFactor));
};
_handleResize = /* @__PURE__ */ new WeakSet();
handleResize_fn = function(event) {
  __privateGet3(this, _board).handleResize(event);
};
_handleVisibilityChange = /* @__PURE__ */ new WeakSet();
handleVisibilityChange_fn = function(event) {
  __privateSet3(this, _paused, document.hidden);
};
export {
  DrawBoard,
  MAX_Z_INDEX,
  Sparkler,
  SparklerMode,
  Theme
};
//# sourceMappingURL=@moefy-canvas_theme-sparkler.js.map
