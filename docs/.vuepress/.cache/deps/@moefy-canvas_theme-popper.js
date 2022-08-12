import "./chunk-JRATMO35.js";

// node_modules/@moefy-canvas/core/dist/index.es.js
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

// node_modules/ts-debounce/dist/src/index.esm.js
function r(r2, e, n) {
  var i, t, o;
  void 0 === e && (e = 50), void 0 === n && (n = {});
  var a = null != (i = n.isImmediate) && i, u = null != (t = n.callback) && t, c = n.maxWait, v = Date.now(), l = [];
  function f() {
    if (void 0 !== c) {
      var r3 = Date.now() - v;
      if (r3 + e >= c)
        return c - r3;
    }
    return e;
  }
  var d = function() {
    var e2 = [].slice.call(arguments), n2 = this;
    return new Promise(function(i2, t2) {
      var c2 = a && void 0 === o;
      if (void 0 !== o && clearTimeout(o), o = setTimeout(function() {
        if (o = void 0, v = Date.now(), !a) {
          var i3 = r2.apply(n2, e2);
          u && u(i3), l.forEach(function(r3) {
            return (0, r3.resolve)(i3);
          }), l = [];
        }
      }, f()), c2) {
        var d2 = r2.apply(n2, e2);
        return u && u(d2), i2(d2);
      }
      l.push({ resolve: i2, reject: t2 });
    });
  };
  return d.cancel = function(r3) {
    void 0 !== o && clearTimeout(o), l.forEach(function(e2) {
      return (0, e2.reject)(r3);
    }), l = [];
  }, d;
}

// node_modules/@moefy-canvas/theme-popper/dist/index.es.js
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
var __privateWrapper = (obj, member, setter, getter) => {
  return {
    set _(value) {
      __privateSet3(obj, member, value, setter);
    },
    get _() {
      return __privateGet3(obj, member, getter);
    }
  };
};
var __privateMethod = (obj, member, method) => {
  __accessCheck3(obj, member, "access private method");
  return method;
};
var _angle;
var _speed;
var _renderCount;
var _rotate;
var _particles;
var _shape;
var _size;
var _numParticles;
var _board;
var _booms;
var _running;
var _canvasOptions;
var _eventsHandler;
var _listen;
var listen_fn;
var _unlisten;
var unlisten_fn;
var _handleMouseDown;
var handleMouseDown_fn;
var _handleResize;
var handleResize_fn;
var _handleVisibilityChange;
var handleVisibilityChange_fn;
var _startAnimation;
var startAnimation_fn;
var Particle = class {
  constructor(origin, speed, size, color, angle) {
    __privateAdd3(this, _angle, void 0);
    __privateAdd3(this, _speed, void 0);
    __privateAdd3(this, _renderCount, void 0);
    this.size = size;
    this.color = color;
    __privateSet3(this, _renderCount, 0);
    __privateSet3(this, _angle, angle);
    __privateSet3(this, _speed, speed);
    this.position = __spreadValues2({}, origin);
  }
  move() {
    this.position.x = Math.sin(__privateGet3(this, _angle)) * __privateGet3(this, _speed) + this.position.x;
    this.position.y = Math.cos(__privateGet3(this, _angle)) * __privateGet3(this, _speed) + this.position.y + __privateGet3(this, _renderCount) * 0.3;
    __privateWrapper(this, _renderCount)._++;
  }
  shouleRemove(canvasSize) {
    return this.position.x < 0 || this.position.x > canvasSize.width || this.position.y > canvasSize.height;
  }
};
_angle = /* @__PURE__ */ new WeakMap();
_speed = /* @__PURE__ */ new WeakMap();
_renderCount = /* @__PURE__ */ new WeakMap();
var Circle = class extends Particle {
  draw(ctx, canvasSize) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
};
var Star = class extends Particle {
  constructor(origin, size, speed, color, angle) {
    super(origin, size, speed, color, angle);
    __privateAdd3(this, _rotate, 0);
  }
  draw(ctx, canvasSize) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const R = this.size * 2;
    const r2 = this.size;
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos((18 + 72 * i - __privateGet3(this, _rotate)) / 180 * Math.PI) * R + this.position.x, -Math.sin((18 + 72 * i - __privateGet3(this, _rotate)) / 180 * Math.PI) * R + this.position.y);
      ctx.lineTo(Math.cos((54 + 72 * i - __privateGet3(this, _rotate)) / 180 * Math.PI) * r2 + this.position.x, -Math.sin((54 + 72 * i - __privateGet3(this, _rotate)) / 180 * Math.PI) * r2 + this.position.y);
    }
    ctx.fill();
    __privateSet3(this, _rotate, __privateGet3(this, _rotate) + 5);
  }
};
_rotate = /* @__PURE__ */ new WeakMap();
var ParticleFactory = class {
  static create(shape, origin, speed, size, color, angle) {
    const Shape = this.shapeMap.get(shape);
    const shapeToCreate = new Shape(origin, speed, size, color, angle);
    return shapeToCreate;
  }
};
ParticleFactory.shapeMap = /* @__PURE__ */ new Map([
  ["star", Star],
  ["circle", Circle]
]);
var Boom = class {
  constructor(shape, origin, size, numParticles) {
    __privateAdd3(this, _particles, void 0);
    this.stopped = false;
    __privateSet3(this, _particles, /* @__PURE__ */ new Set());
    for (let i = 0; i < numParticles; i++) {
      const particle = ParticleFactory.create(shape, origin, Random.randomFloat(1, 6), size, Random.color("89ABCDEF"), Random.randomFloat(Math.PI - 1, Math.PI + 1));
      __privateGet3(this, _particles).add(particle);
    }
  }
  move(canvasSize) {
    for (const particle of __privateGet3(this, _particles)) {
      if (particle.shouleRemove(canvasSize)) {
        __privateGet3(this, _particles).delete(particle);
        continue;
      }
      particle.move();
    }
    if (__privateGet3(this, _particles).size === 0) {
      this.stopped = true;
    }
  }
  draw(ctx, canvasSize) {
    for (const particle of __privateGet3(this, _particles)) {
      particle.draw(ctx, canvasSize);
    }
  }
};
_particles = /* @__PURE__ */ new WeakMap();
var PopperShape = ((PopperShape2) => {
  PopperShape2["Star"] = "star";
  PopperShape2["Circle"] = "circle";
  return PopperShape2;
})(PopperShape || {});
var Popper = class {
  constructor({ shape = "star", size = 2, numParticles = 10 } = {}, canvasOptions = {}) {
    __privateAdd3(this, _listen);
    __privateAdd3(this, _unlisten);
    __privateAdd3(this, _handleMouseDown);
    __privateAdd3(this, _handleResize);
    __privateAdd3(this, _handleVisibilityChange);
    __privateAdd3(this, _startAnimation);
    __privateAdd3(this, _shape, void 0);
    __privateAdd3(this, _size, void 0);
    __privateAdd3(this, _numParticles, void 0);
    __privateAdd3(this, _board, null);
    __privateAdd3(this, _booms, /* @__PURE__ */ new Set());
    __privateAdd3(this, _running, false);
    __privateAdd3(this, _canvasOptions, void 0);
    __privateAdd3(this, _eventsHandler, new EventsHandler());
    __privateSet3(this, _shape, shape);
    __privateSet3(this, _size, size);
    __privateSet3(this, _numParticles, numParticles);
    __privateSet3(this, _canvasOptions, canvasOptions);
    this.animate = this.animate.bind(this);
  }
  mount(el) {
    __privateSet3(this, _board, new DrawBoard(el, window.innerWidth, window.innerHeight, true, true, __privateGet3(this, _canvasOptions)));
    __privateMethod(this, _listen, listen_fn).call(this);
    showBadge("Theme Popper \u{1F389}", { leftBgColor: "#ffb366" });
  }
  unmount() {
    __privateMethod(this, _unlisten, unlisten_fn).call(this);
    __privateSet3(this, _running, false);
  }
  animate() {
    __privateSet3(this, _running, true);
    if (__privateGet3(this, _booms).size === 0) {
      __privateSet3(this, _running, false);
      __privateGet3(this, _board).clear();
      return;
    }
    requestAnimationFrame(this.animate);
    for (const boom of __privateGet3(this, _booms)) {
      if (boom.stopped) {
        __privateGet3(this, _booms).delete(boom);
        return;
      }
      boom.move(__privateGet3(this, _board).size);
    }
    __privateGet3(this, _board).draw((ctx, canvasSize) => {
      for (const boom of __privateGet3(this, _booms)) {
        boom.draw(ctx, canvasSize);
      }
    });
    __privateGet3(this, _board).render();
  }
};
_shape = /* @__PURE__ */ new WeakMap();
_size = /* @__PURE__ */ new WeakMap();
_numParticles = /* @__PURE__ */ new WeakMap();
_board = /* @__PURE__ */ new WeakMap();
_booms = /* @__PURE__ */ new WeakMap();
_running = /* @__PURE__ */ new WeakMap();
_canvasOptions = /* @__PURE__ */ new WeakMap();
_eventsHandler = /* @__PURE__ */ new WeakMap();
_listen = /* @__PURE__ */ new WeakSet();
listen_fn = function() {
  if (isMobile()) {
    __privateGet3(this, _eventsHandler).add("touchstart", __privateMethod(this, _handleMouseDown, handleMouseDown_fn).bind(this));
  } else {
    __privateGet3(this, _eventsHandler).add("mousedown", __privateMethod(this, _handleMouseDown, handleMouseDown_fn).bind(this));
  }
  __privateGet3(this, _eventsHandler).add("visibilitychange", __privateMethod(this, _handleVisibilityChange, handleVisibilityChange_fn).bind(this));
  __privateGet3(this, _eventsHandler).add("resize", r(__privateMethod(this, _handleResize, handleResize_fn).bind(this), 500));
  __privateGet3(this, _eventsHandler).startAll();
};
_unlisten = /* @__PURE__ */ new WeakSet();
unlisten_fn = function() {
  __privateGet3(this, _eventsHandler).stopAll();
  __privateGet3(this, _eventsHandler).clear();
};
_handleMouseDown = /* @__PURE__ */ new WeakSet();
handleMouseDown_fn = function(event) {
  const currentPosition = {
    x: isTouchEvent(event) ? event.touches[0].clientX : event.clientX,
    y: isTouchEvent(event) ? event.touches[0].clientY : event.clientY
  };
  const boom = new Boom(__privateGet3(this, _shape), __spreadValues2({}, currentPosition), __privateGet3(this, _size), __privateGet3(this, _numParticles));
  __privateGet3(this, _booms).add(boom);
  __privateGet3(this, _running) || __privateMethod(this, _startAnimation, startAnimation_fn).call(this);
};
_handleResize = /* @__PURE__ */ new WeakSet();
handleResize_fn = function(event) {
  __privateGet3(this, _board).handleResize(event);
};
_handleVisibilityChange = /* @__PURE__ */ new WeakSet();
handleVisibilityChange_fn = function(event) {
  __privateGet3(this, _booms).clear();
  __privateSet3(this, _running, false);
};
_startAnimation = /* @__PURE__ */ new WeakSet();
startAnimation_fn = function() {
  requestAnimationFrame(this.animate);
};
export {
  DrawBoard,
  MAX_Z_INDEX,
  Popper,
  PopperShape,
  Theme
};
//# sourceMappingURL=@moefy-canvas_theme-popper.js.map
