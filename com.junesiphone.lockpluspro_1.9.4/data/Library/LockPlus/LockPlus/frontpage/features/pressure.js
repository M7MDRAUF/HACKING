// Pressure v2.1.2 | Created By Stuart Yamartino | MIT License | 2015 - 2017
;(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
      define([], factory);
    } else if (typeof exports === 'object') {
      module.exports = factory();
    } else {
      root.Pressure = factory();
    }
  }(this, function() {
  'use strict';
  
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
  
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  //--------------------- Public API Section ---------------------//
  // this is the Pressure Object, this is the only object that is accessible to the end user
  // only the methods in this object can be called, making it the "public api"
  
  var Pressure = {
  
    // targets any device with Force or 3D Touch
    set: function set(selector, closure, options) {
      loopPressureElements(selector, closure, options);
    },
  
  
    // set configuration options for global config
    config: function config(options) {
      Config.set(options);
    },
  
  
    // the map method allows for interpolating a value from one range of values to another
    // example from the Arduino documentation: https://www.arduino.cc/en/Reference/Map
    map: function map(x, in_min, in_max, out_min, out_max) {
      return _map.apply(null, arguments);
    }
  };
  
  var Element = function () {
    function Element(el, block, options) {
      _classCallCheck(this, Element);
  
      this.routeEvents(el, block, options);
      this.preventSelect(el, options);
    }
  
    _createClass(Element, [{
      key: 'routeEvents',
      value: function routeEvents(el, block, options) {
        var type = Config.get('only', options);
        // for devices that support pointer events
        if (supportsPointer && (type === 'pointer' || type === null)) {
          this.adapter = new AdapterPointer(el, block, options).bindEvents();
        }
        // for devices that support 3D Touch
        else if (supportsTouch && (type === 'touch' || type === null)) {
            this.adapter = new Adapter3DTouch(el, block, options).bindEvents();
          }
          // for devices that support Force Touch
          else if (supportsMouse && (type === 'mouse' || type === null)) {
              this.adapter = new AdapterForceTouch(el, block, options).bindEvents();
            }
            // unsupported if it is requesting a type and your browser is of other type
            else {
                this.adapter = new Adapter(el, block).bindUnsupportedEvent();
              }
      }
  
      // prevent the default action of text selection, "peak & pop", and force touch special feature
  
    }, {
      key: 'preventSelect',
      value: function preventSelect(el, options) {
        if (Config.get('preventSelect', options)) {
          el.style.webkitTouchCallout = "none";
          el.style.webkitUserSelect = "none";
          el.style.khtmlUserSelect = "none";
          el.style.MozUserSelect = "none";
          el.style.msUserSelect = "none";
          el.style.userSelect = "none";
        }
      }
    }]);
  
    return Element;
  }();
  
  /*
  This is the base adapter from which all the other adapters extend.
  */
  
  var Adapter = function () {
    function Adapter(el, block, options) {
      _classCallCheck(this, Adapter);
  
      this.el = el;
      this.block = block;
      this.options = options;
      this.pressed = false;
      this.deepPressed = false;
      this.nativeSupport = false;
      this.runningPolyfill = false;
      this.runKey = Math.random();
    }
  
    _createClass(Adapter, [{
      key: 'setPressed',
      value: function setPressed(boolean) {
        this.pressed = boolean;
      }
    }, {
      key: 'setDeepPressed',
      value: function setDeepPressed(boolean) {
        this.deepPressed = boolean;
      }
    }, {
      key: 'isPressed',
      value: function isPressed() {
        return this.pressed;
      }
    }, {
      key: 'isDeepPressed',
      value: function isDeepPressed() {
        return this.deepPressed;
      }
    }, {
      key: 'add',
      value: function add(event, set) {
        this.el.addEventListener(event, set, false);
      }
    }, {
      key: 'runClosure',
      value: function runClosure(method) {
        if (method in this.block) {
          // call the closure method and apply nth arguments if they exist
          this.block[method].apply(this.el, Array.prototype.slice.call(arguments, 1));
        }
      }
    }, {
      key: 'fail',
      value: function fail(event, runKey) {
        if (Config.get('polyfill', this.options)) {
          if (this.runKey === runKey) {
            this.runPolyfill(event);
          }
        } else {
          this.runClosure('unsupported', event);
        }
      }
    }, {
      key: 'bindUnsupportedEvent',
      value: function bindUnsupportedEvent() {
        var _this = this;
  
        this.add(supportsTouch ? 'touchstart' : 'mousedown', function (event) {
          return _this.runClosure('unsupported', event);
        });
      }
    }, {
      key: '_startPress',
      value: function _startPress(event) {
        if (this.isPressed() === false) {
          this.runningPolyfill = false;
          this.setPressed(true);
          this.runClosure('start', event);
        }
      }
    }, {
      key: '_startDeepPress',
      value: function _startDeepPress(event) {
        if (this.isPressed() && this.isDeepPressed() === false) {
          this.setDeepPressed(true);
          this.runClosure('startDeepPress', event);
        }
      }
    }, {
      key: '_changePress',
      value: function _changePress(force, event) {
        this.nativeSupport = true;
        this.runClosure('change', force, event);
      }
    }, {
      key: '_endDeepPress',
      value: function _endDeepPress() {
        if (this.isPressed() && this.isDeepPressed()) {
          this.setDeepPressed(false);
          this.runClosure('endDeepPress');
        }
      }
    }, {
      key: '_endPress',
      value: function _endPress() {
        if (this.runningPolyfill === false) {
          if (this.isPressed()) {
            this._endDeepPress();
            this.setPressed(false);
            this.runClosure('end');
          }
          this.runKey = Math.random();
          this.nativeSupport = false;
        } else {
          this.setPressed(false);
        }
      }
    }, {
      key: 'deepPress',
      value: function deepPress(force, event) {
        force >= 0.5 ? this._startDeepPress(event) : this._endDeepPress();
      }
    }, {
      key: 'runPolyfill',
      value: function runPolyfill(event) {
        this.increment = Config.get('polyfillSpeedUp', this.options) === 0 ? 1 : 10 / Config.get('polyfillSpeedUp', this.options);
        this.decrement = Config.get('polyfillSpeedDown', this.options) === 0 ? 1 : 10 / Config.get('polyfillSpeedDown', this.options);
        this.setPressed(true);
        this.runClosure('start', event);
        if (this.runningPolyfill === false) {
          this.loopPolyfillForce(0, event);
        }
      }
    }, {
      key: 'loopPolyfillForce',
      value: function loopPolyfillForce(force, event) {
        if (this.nativeSupport === false) {
          if (this.isPressed()) {
            this.runningPolyfill = true;
            force = force + this.increment > 1 ? 1 : force + this.increment;
            this.runClosure('change', force, event);
            this.deepPress(force, event);
            setTimeout(this.loopPolyfillForce.bind(this, force, event), 10);
          } else {
            force = force - this.decrement < 0 ? 0 : force - this.decrement;
            if (force < 0.5 && this.isDeepPressed()) {
              this.setDeepPressed(false);
              this.runClosure('endDeepPress');
            }
            if (force === 0) {
              this.runningPolyfill = false;
              this.setPressed(true);
              this._endPress();
            } else {
              this.runClosure('change', force, event);
              this.deepPress(force, event);
              setTimeout(this.loopPolyfillForce.bind(this, force, event), 10);
            }
          }
        }
      }
    }]);
  
    return Adapter;
  }();
  
  /*
  This adapter is for Macs with Force Touch trackpads.
  */
  
  var AdapterForceTouch = function (_Adapter) {
    _inherits(AdapterForceTouch, _Adapter);
  
    function AdapterForceTouch(el, block, options) {
      _classCallCheck(this, AdapterForceTouch);
  
      return _possibleConstructorReturn(this, (AdapterForceTouch.__proto__ || Object.getPrototypeOf(AdapterForceTouch)).call(this, el, block, options));
    }
  
    _createClass(AdapterForceTouch, [{
      key: 'bindEvents',
      value: function bindEvents() {
        this.add('webkitmouseforcewillbegin', this._startPress.bind(this));
        this.add('mousedown', this.support.bind(this));
        this.add('webkitmouseforcechanged', this.change.bind(this));
        this.add('webkitmouseforcedown', this._startDeepPress.bind(this));
        this.add('webkitmouseforceup', this._endDeepPress.bind(this));
        this.add('mouseleave', this._endPress.bind(this));
        this.add('mouseup', this._endPress.bind(this));
      }
    }, {
      key: 'support',
      value: function support(event) {
        if (this.isPressed() === false) {
          this.fail(event, this.runKey);
        }
      }
    }, {
      key: 'change',
      value: function change(event) {
        if (this.isPressed() && event.webkitForce > 0) {
          this._changePress(this.normalizeForce(event.webkitForce), event);
        }
      }
  
      // make the force the standard 0 to 1 scale and not the 1 to 3 scale
  
    }, {
      key: 'normalizeForce',
      value: function normalizeForce(force) {
        return this.reachOne(_map(force, 1, 3, 0, 1));
      }
  
      // if the force value is above 0.995 set the force to 1
  
    }, {
      key: 'reachOne',
      value: function reachOne(force) {
        return force > 0.995 ? 1 : force;
      }
    }]);
  
    return AdapterForceTouch;
  }(Adapter);
  
  /*
  This adapter is more mobile devices that support 3D Touch.
  */
  
  var Adapter3DTouch = function (_Adapter2) {
    _inherits(Adapter3DTouch, _Adapter2);
  
    function Adapter3DTouch(el, block, options) {
      _classCallCheck(this, Adapter3DTouch);
  
      return _possibleConstructorReturn(this, (Adapter3DTouch.__proto__ || Object.getPrototypeOf(Adapter3DTouch)).call(this, el, block, options));
    }
  
    _createClass(Adapter3DTouch, [{
      key: 'bindEvents',
      value: function bindEvents() {
        if (supportsTouchForceChange) {
          this.add('touchforcechange', this.start.bind(this));
          this.add('touchstart', this.support.bind(this, 0));
          this.add('touchend', this._endPress.bind(this));
        } else {
          this.add('touchstart', this.startLegacy.bind(this));
          this.add('touchend', this._endPress.bind(this));
        }
      }
    }, {
      key: 'start',
      value: function start(event) {
        if (event.touches.length > 0) {
          this._startPress(event);
          this.touch = this.selectTouch(event);
          if (this.touch) {
            this._changePress(this.touch.force, event);
          }
        }
      }
    }, {
      key: 'support',
      value: function support(iter, event) {
        var runKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.runKey;
  
        if (this.isPressed() === false) {
          if (iter <= 6) {
            iter++;
            setTimeout(this.support.bind(this, iter, event, runKey), 10);
          } else {
            this.fail(event, runKey);
          }
        }
      }
    }, {
      key: 'startLegacy',
      value: function startLegacy(event) {
        this.initialForce = event.touches[0].force;
        this.supportLegacy(0, event, this.runKey, this.initialForce);
      }
  
      // this checks up to 6 times on a touch to see if the touch can read a force value
      // if the force value has changed it means the device supports pressure
      // more info from this issue https://github.com/yamartino/pressure/issues/15
  
    }, {
      key: 'supportLegacy',
      value: function supportLegacy(iter, event, runKey, force) {
        if (force !== this.initialForce) {
          this._startPress(event);
          this.loopForce(event);
        } else if (iter <= 6) {
          iter++;
          setTimeout(this.supportLegacy.bind(this, iter, event, runKey, force), 10);
        } else {
          this.fail(event, runKey);
        }
      }
    }, {
      key: 'loopForce',
      value: function loopForce(event) {
        if (this.isPressed()) {
          this.touch = this.selectTouch(event);
          setTimeout(this.loopForce.bind(this, event), 10);
          this._changePress(this.touch.force, event);
        }
      }
  
      // link up the touch point to the correct element, this is to support multitouch
  
    }, {
      key: 'selectTouch',
      value: function selectTouch(event) {
        if (event.touches.length === 1) {
          return this.returnTouch(event.touches[0], event);
        } else {
          for (var i = 0; i < event.touches.length; i++) {
            // if the target press is on this element
            if (event.touches[i].target === this.el || this.el.contains(event.touches[i].target)) {
              return this.returnTouch(event.touches[i], event);
            }
          }
        }
      }
  
      // return the touch and run a start or end for deep press
  
    }, {
      key: 'returnTouch',
      value: function returnTouch(touch, event) {
        this.deepPress(touch.force, event);
        return touch;
      }
    }]);
  
    return Adapter3DTouch;
  }(Adapter);
  
  /*
  This adapter is for devices that support pointer events.
  */
  
  var AdapterPointer = function (_Adapter3) {
    _inherits(AdapterPointer, _Adapter3);
  
    function AdapterPointer(el, block, options) {
      _classCallCheck(this, AdapterPointer);
  
      return _possibleConstructorReturn(this, (AdapterPointer.__proto__ || Object.getPrototypeOf(AdapterPointer)).call(this, el, block, options));
    }
  
    _createClass(AdapterPointer, [{
      key: 'bindEvents',
      value: function bindEvents() {
        this.add('pointerdown', this.support.bind(this));
        this.add('pointermove', this.change.bind(this));
        this.add('pointerup', this._endPress.bind(this));
        this.add('pointerleave', this._endPress.bind(this));
      }
    }, {
      key: 'support',
      value: function support(event) {
        if (this.isPressed() === false) {
          if (event.pressure === 0 || event.pressure === 0.5 || event.pressure > 1) {
            this.fail(event, this.runKey);
          } else {
            this._startPress(event);
            this._changePress(event.pressure, event);
          }
        }
      }
    }, {
      key: 'change',
      value: function change(event) {
        if (this.isPressed() && event.pressure > 0 && event.pressure !== 0.5) {
          this._changePress(event.pressure, event);
          this.deepPress(event.pressure, event);
        }
      }
    }]);
  
    return AdapterPointer;
  }(Adapter);
  
  // This class holds the states of the the Pressure config
  
  
  var Config = {
  
    // 'false' will make polyfill not run when pressure is not supported and the 'unsupported' method will be called
    polyfill: true,
  
    // milliseconds it takes to go from 0 to 1 for the polyfill
    polyfillSpeedUp: 1000,
  
    // milliseconds it takes to go from 1 to 0 for the polyfill
    polyfillSpeedDown: 0,
  
    // 'true' prevents the selecting of text and images via css properties
    preventSelect: true,
  
    // 'touch', 'mouse', or 'pointer' will make it run only on that type of device
    only: null,
  
    // this will get the correct config / option settings for the current pressure check
    get: function get(option, options) {
      return options.hasOwnProperty(option) ? options[option] : this[option];
    },
  
  
    // this will set the global configs
    set: function set(options) {
      for (var k in options) {
        if (options.hasOwnProperty(k) && this.hasOwnProperty(k) && k != 'get' && k != 'set') {
          this[k] = options[k];
        }
      }
    }
  };
  
  //------------------- Helpers -------------------//
  
  // accepts jQuery object, node list, string selector, then called a setup for each element
  var loopPressureElements = function loopPressureElements(selector, closure) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  
    // if a string is passed in as an element
    if (typeof selector === 'string' || selector instanceof String) {
      var elements = document.querySelectorAll(selector);
      for (var i = 0; i < elements.length; i++) {
        new Element(elements[i], closure, options);
      }
      // if a single element object is passed in
    } else if (isElement(selector)) {
      new Element(selector, closure, options);
      // if a node list is passed in ex. jQuery $() object
    } else {
      for (var i = 0; i < selector.length; i++) {
        new Element(selector[i], closure, options);
      }
    }
  };
  
  //Returns true if it is a DOM element
  var isElement = function isElement(o) {
    return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
    o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
  };
  
  // the map method allows for interpolating a value from one range of values to another
  // example from the Arduino documentation: https://www.arduino.cc/en/Reference/Map
  var _map = function _map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  };
  
  var supportsMouse = false;
  var supportsTouch = false;
  var supportsPointer = false;
  var supportsTouchForce = false;
  var supportsTouchForceChange = false;
  
  if (typeof window !== 'undefined') {
    // only attempt to assign these in a browser environment.
    // on the server, this is a no-op, like the rest of the library
    if (typeof Touch !== 'undefined') {
      // In Android, new Touch requires arguments.
      try {
        if (Touch.prototype.hasOwnProperty('force') || 'force' in new Touch()) {
          supportsTouchForce = true;
        }
      } catch (e) {}
    }
    supportsTouch = 'ontouchstart' in window.document && supportsTouchForce;
    supportsMouse = 'onmousemove' in window.document && !supportsTouch;
    supportsPointer = 'onpointermove' in window.document;
    supportsTouchForceChange = 'ontouchforcechange' in window.document;
  }
  return Pressure;
  }));


  /* powerrange */
  ;(function(){

    /**
     * Require the given path.
     *
     * @param {String} path
     * @return {Object} exports
     * @api public
     */
    
    function require(path, parent, orig) {
      var resolved = require.resolve(path);
    
      // lookup failed
      if (null == resolved) {
        orig = orig || path;
        parent = parent || 'root';
        var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
        err.path = orig;
        err.parent = parent;
        err.require = true;
        throw err;
      }
    
      var module = require.modules[resolved];
    
      // perform real require()
      // by invoking the module's
      // registered function
      if (!module._resolving && !module.exports) {
        var mod = {};
        mod.exports = {};
        mod.client = mod.component = true;
        module._resolving = true;
        module.call(this, mod.exports, require.relative(resolved), mod);
        delete module._resolving;
        module.exports = mod.exports;
      }
    
      return module.exports;
    }
    
    /**
     * Registered modules.
     */
    
    require.modules = {};
    
    /**
     * Registered aliases.
     */
    
    require.aliases = {};
    
    /**
     * Resolve `path`.
     *
     * Lookup:
     *
     *   - PATH/index.js
     *   - PATH.js
     *   - PATH
     *
     * @param {String} path
     * @return {String} path or null
     * @api private
     */
    
    require.resolve = function(path) {
      if (path.charAt(0) === '/') path = path.slice(1);
    
      var paths = [
        path,
        path + '.js',
        path + '.json',
        path + '/index.js',
        path + '/index.json'
      ];
    
      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        if (require.modules.hasOwnProperty(path)) return path;
        if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
      }
    };
    
    /**
     * Normalize `path` relative to the current path.
     *
     * @param {String} curr
     * @param {String} path
     * @return {String}
     * @api private
     */
    
    require.normalize = function(curr, path) {
      var segs = [];
    
      if ('.' != path.charAt(0)) return path;
    
      curr = curr.split('/');
      path = path.split('/');
    
      for (var i = 0; i < path.length; ++i) {
        if ('..' == path[i]) {
          curr.pop();
        } else if ('.' != path[i] && '' != path[i]) {
          segs.push(path[i]);
        }
      }
    
      return curr.concat(segs).join('/');
    };
    
    /**
     * Register module at `path` with callback `definition`.
     *
     * @param {String} path
     * @param {Function} definition
     * @api private
     */
    
    require.register = function(path, definition) {
      require.modules[path] = definition;
    };
    
    /**
     * Alias a module definition.
     *
     * @param {String} from
     * @param {String} to
     * @api private
     */
    
    require.alias = function(from, to) {
      if (!require.modules.hasOwnProperty(from)) {
        throw new Error('Failed to alias "' + from + '", it does not exist');
      }
      require.aliases[to] = from;
    };
    
    /**
     * Return a require function relative to the `parent` path.
     *
     * @param {String} parent
     * @return {Function}
     * @api private
     */
    
    require.relative = function(parent) {
      var p = require.normalize(parent, '..');
    
      /**
       * lastIndexOf helper.
       */
    
      function lastIndexOf(arr, obj) {
        var i = arr.length;
        while (i--) {
          if (arr[i] === obj) return i;
        }
        return -1;
      }
    
      /**
       * The relative require() itself.
       */
    
      function localRequire(path) {
        var resolved = localRequire.resolve(path);
        return require(resolved, parent, path);
      }
    
      /**
       * Resolve relative to the parent.
       */
    
      localRequire.resolve = function(path) {
        var c = path.charAt(0);
        if ('/' == c) return path.slice(1);
        if ('.' == c) return require.normalize(p, path);
    
        // resolve deps by returning
        // the dep in the nearest "deps"
        // directory
        var segs = parent.split('/');
        var i = lastIndexOf(segs, 'deps') + 1;
        if (!i) i = 0;
        path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
        return path;
      };
    
      /**
       * Check if module is defined at `path`.
       */
    
      localRequire.exists = function(path) {
        return require.modules.hasOwnProperty(localRequire.resolve(path));
      };
    
      return localRequire;
    };
    require.register("component-event/index.js", function(exports, require, module){
    var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
        unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
        prefix = bind !== 'addEventListener' ? 'on' : '';
    
    /**
     * Bind `el` event `type` to `fn`.
     *
     * @param {Element} el
     * @param {String} type
     * @param {Function} fn
     * @param {Boolean} capture
     * @return {Function}
     * @api public
     */
    
    exports.bind = function(el, type, fn, capture){
      el[bind](prefix + type, fn, capture || false);
      return fn;
    };
    
    /**
     * Unbind `el` event `type`'s callback `fn`.
     *
     * @param {Element} el
     * @param {String} type
     * @param {Function} fn
     * @param {Boolean} capture
     * @return {Function}
     * @api public
     */
    
    exports.unbind = function(el, type, fn, capture){
      el[unbind](prefix + type, fn, capture || false);
      return fn;
    };
    });
    require.register("component-query/index.js", function(exports, require, module){
    function one(selector, el) {
      return el.querySelector(selector);
    }
    
    exports = module.exports = function(selector, el){
      el = el || document;
      return one(selector, el);
    };
    
    exports.all = function(selector, el){
      el = el || document;
      return el.querySelectorAll(selector);
    };
    
    exports.engine = function(obj){
      if (!obj.one) throw new Error('.one callback required');
      if (!obj.all) throw new Error('.all callback required');
      one = obj.one;
      exports.all = obj.all;
      return exports;
    };
    
    });
    require.register("component-matches-selector/index.js", function(exports, require, module){
    /**
     * Module dependencies.
     */
    
    var query = require('query');
    
    /**
     * Element prototype.
     */
    
    var proto = Element.prototype;
    
    /**
     * Vendor function.
     */
    
    var vendor = proto.matches
      || proto.webkitMatchesSelector
      || proto.mozMatchesSelector
      || proto.msMatchesSelector
      || proto.oMatchesSelector;
    
    /**
     * Expose `match()`.
     */
    
    module.exports = match;
    
    /**
     * Match `el` to `selector`.
     *
     * @param {Element} el
     * @param {String} selector
     * @return {Boolean}
     * @api public
     */
    
    function match(el, selector) {
      if (vendor) return vendor.call(el, selector);
      var nodes = query.all(selector, el.parentNode);
      for (var i = 0; i < nodes.length; ++i) {
        if (nodes[i] == el) return true;
      }
      return false;
    }
    
    });
    require.register("discore-closest/index.js", function(exports, require, module){
    var matches = require('matches-selector')
    
    module.exports = function (element, selector, checkYoSelf, root) {
      element = checkYoSelf ? {parentNode: element} : element
    
      root = root || document
    
      // Make sure `element !== document` and `element != null`
      // otherwise we get an illegal invocation
      while ((element = element.parentNode) && element !== document) {
        if (matches(element, selector))
          return element
        // After `matches` on the edge case that
        // the selector matches the root
        // (when the root is not the document)
        if (element === root)
          return  
      }
    }
    });
    require.register("component-delegate/index.js", function(exports, require, module){
    /**
     * Module dependencies.
     */
    
    var closest = require('closest')
      , event = require('event');
    
    /**
     * Delegate event `type` to `selector`
     * and invoke `fn(e)`. A callback function
     * is returned which may be passed to `.unbind()`.
     *
     * @param {Element} el
     * @param {String} selector
     * @param {String} type
     * @param {Function} fn
     * @param {Boolean} capture
     * @return {Function}
     * @api public
     */
    
    exports.bind = function(el, selector, type, fn, capture){
      return event.bind(el, type, function(e){
        var target = e.target || e.srcElement;
        e.delegateTarget = closest(target, selector, true, el);
        if (e.delegateTarget) fn.call(el, e);
      }, capture);
    };
    
    /**
     * Unbind event `type`'s callback `fn`.
     *
     * @param {Element} el
     * @param {String} type
     * @param {Function} fn
     * @param {Boolean} capture
     * @api public
     */
    
    exports.unbind = function(el, type, fn, capture){
      event.unbind(el, type, fn, capture);
    };
    
    });
    require.register("component-events/index.js", function(exports, require, module){
    
    /**
     * Module dependencies.
     */
    
    var events = require('event');
    var delegate = require('delegate');
    
    /**
     * Expose `Events`.
     */
    
    module.exports = Events;
    
    /**
     * Initialize an `Events` with the given
     * `el` object which events will be bound to,
     * and the `obj` which will receive method calls.
     *
     * @param {Object} el
     * @param {Object} obj
     * @api public
     */
    
    function Events(el, obj) {
      if (!(this instanceof Events)) return new Events(el, obj);
      if (!el) throw new Error('element required');
      if (!obj) throw new Error('object required');
      this.el = el;
      this.obj = obj;
      this._events = {};
    }
    
    /**
     * Subscription helper.
     */
    
    Events.prototype.sub = function(event, method, cb){
      this._events[event] = this._events[event] || {};
      this._events[event][method] = cb;
    };
    
    /**
     * Bind to `event` with optional `method` name.
     * When `method` is undefined it becomes `event`
     * with the "on" prefix.
     *
     * Examples:
     *
     *  Direct event handling:
     *
     *    events.bind('click') // implies "onclick"
     *    events.bind('click', 'remove')
     *    events.bind('click', 'sort', 'asc')
     *
     *  Delegated event handling:
     *
     *    events.bind('click li > a')
     *    events.bind('click li > a', 'remove')
     *    events.bind('click a.sort-ascending', 'sort', 'asc')
     *    events.bind('click a.sort-descending', 'sort', 'desc')
     *
     * @param {String} event
     * @param {String|function} [method]
     * @return {Function} callback
     * @api public
     */
    
    Events.prototype.bind = function(event, method){
      var e = parse(event);
      var el = this.el;
      var obj = this.obj;
      var name = e.name;
      var method = method || 'on' + name;
      var args = [].slice.call(arguments, 2);
    
      // callback
      function cb(){
        var a = [].slice.call(arguments).concat(args);
        obj[method].apply(obj, a);
      }
    
      // bind
      if (e.selector) {
        cb = delegate.bind(el, e.selector, name, cb);
      } else {
        events.bind(el, name, cb);
      }
    
      // subscription for unbinding
      this.sub(name, method, cb);
    
      return cb;
    };
    
    /**
     * Unbind a single binding, all bindings for `event`,
     * or all bindings within the manager.
     *
     * Examples:
     *
     *  Unbind direct handlers:
     *
     *     events.unbind('click', 'remove')
     *     events.unbind('click')
     *     events.unbind()
     *
     * Unbind delegate handlers:
     *
     *     events.unbind('click', 'remove')
     *     events.unbind('click')
     *     events.unbind()
     *
     * @param {String|Function} [event]
     * @param {String|Function} [method]
     * @api public
     */
    
    Events.prototype.unbind = function(event, method){
      if (0 == arguments.length) return this.unbindAll();
      if (1 == arguments.length) return this.unbindAllOf(event);
    
      // no bindings for this event
      var bindings = this._events[event];
      if (!bindings) return;
    
      // no bindings for this method
      var cb = bindings[method];
      if (!cb) return;
    
      events.unbind(this.el, event, cb);
    };
    
    /**
     * Unbind all events.
     *
     * @api private
     */
    
    Events.prototype.unbindAll = function(){
      for (var event in this._events) {
        this.unbindAllOf(event);
      }
    };
    
    /**
     * Unbind all events for `event`.
     *
     * @param {String} event
     * @api private
     */
    
    Events.prototype.unbindAllOf = function(event){
      var bindings = this._events[event];
      if (!bindings) return;
    
      for (var method in bindings) {
        this.unbind(event, method);
      }
    };
    
    /**
     * Parse `event`.
     *
     * @param {String} event
     * @return {Object}
     * @api private
     */
    
    function parse(event) {
      var parts = event.split(/ +/);
      return {
        name: parts.shift(),
        selector: parts.join(' ')
      }
    }
    
    });
    require.register("component-indexof/index.js", function(exports, require, module){
    module.exports = function(arr, obj){
      if (arr.indexOf) return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i;
      }
      return -1;
    };
    
    });
    require.register("component-classes/index.js", function(exports, require, module){
    /**
     * Module dependencies.
     */
    
    var index = require('indexof');
    
    /**
     * Whitespace regexp.
     */
    
    var re = /\s+/;
    
    /**
     * toString reference.
     */
    
    var toString = Object.prototype.toString;
    
    /**
     * Wrap `el` in a `ClassList`.
     *
     * @param {Element} el
     * @return {ClassList}
     * @api public
     */
    
    module.exports = function(el){
      return new ClassList(el);
    };
    
    /**
     * Initialize a new ClassList for `el`.
     *
     * @param {Element} el
     * @api private
     */
    
    function ClassList(el) {
      if (!el) throw new Error('A DOM element reference is required');
      this.el = el;
      this.list = el.classList;
    }
    
    /**
     * Add class `name` if not already present.
     *
     * @param {String} name
     * @return {ClassList}
     * @api public
     */
    
    ClassList.prototype.add = function(name){
      // classList
      if (this.list) {
        this.list.add(name);
        return this;
      }
    
      // fallback
      var arr = this.array();
      var i = index(arr, name);
      if (!~i) arr.push(name);
      this.el.className = arr.join(' ');
      return this;
    };
    
    /**
     * Remove class `name` when present, or
     * pass a regular expression to remove
     * any which match.
     *
     * @param {String|RegExp} name
     * @return {ClassList}
     * @api public
     */
    
    ClassList.prototype.remove = function(name){
      if ('[object RegExp]' == toString.call(name)) {
        return this.removeMatching(name);
      }
    
      // classList
      if (this.list) {
        this.list.remove(name);
        return this;
      }
    
      // fallback
      var arr = this.array();
      var i = index(arr, name);
      if (~i) arr.splice(i, 1);
      this.el.className = arr.join(' ');
      return this;
    };
    
    /**
     * Remove all classes matching `re`.
     *
     * @param {RegExp} re
     * @return {ClassList}
     * @api private
     */
    
    ClassList.prototype.removeMatching = function(re){
      var arr = this.array();
      for (var i = 0; i < arr.length; i++) {
        if (re.test(arr[i])) {
          this.remove(arr[i]);
        }
      }
      return this;
    };
    
    /**
     * Toggle class `name`, can force state via `force`.
     *
     * For browsers that support classList, but do not support `force` yet,
     * the mistake will be detected and corrected.
     *
     * @param {String} name
     * @param {Boolean} force
     * @return {ClassList}
     * @api public
     */
    
    ClassList.prototype.toggle = function(name, force){
      // classList
      if (this.list) {
        if ("undefined" !== typeof force) {
          if (force !== this.list.toggle(name, force)) {
            this.list.toggle(name); // toggle again to correct
          }
        } else {
          this.list.toggle(name);
        }
        return this;
      }
    
      // fallback
      if ("undefined" !== typeof force) {
        if (!force) {
          this.remove(name);
        } else {
          this.add(name);
        }
      } else {
        if (this.has(name)) {
          this.remove(name);
        } else {
          this.add(name);
        }
      }
    
      return this;
    };
    
    /**
     * Return an array of classes.
     *
     * @return {Array}
     * @api public
     */
    
    ClassList.prototype.array = function(){
      var str = this.el.className.replace(/^\s+|\s+$/g, '');
      var arr = str.split(re);
      if ('' === arr[0]) arr.shift();
      return arr;
    };
    
    /**
     * Check if class `name` is present.
     *
     * @param {String} name
     * @return {ClassList}
     * @api public
     */
    
    ClassList.prototype.has =
    ClassList.prototype.contains = function(name){
      return this.list
        ? this.list.contains(name)
        : !! ~index(this.array(), name);
    };
    
    });
    require.register("component-emitter/index.js", function(exports, require, module){
    
    /**
     * Expose `Emitter`.
     */
    
    module.exports = Emitter;
    
    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */
    
    function Emitter(obj) {
      if (obj) return mixin(obj);
    };
    
    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */
    
    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }
      return obj;
    }
    
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    
    Emitter.prototype.on =
    Emitter.prototype.addEventListener = function(event, fn){
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || [])
        .push(fn);
      return this;
    };
    
    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    
    Emitter.prototype.once = function(event, fn){
      var self = this;
      this._callbacks = this._callbacks || {};
    
      function on() {
        self.off(event, on);
        fn.apply(this, arguments);
      }
    
      on.fn = fn;
      this.on(event, on);
      return this;
    };
    
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */
    
    Emitter.prototype.off =
    Emitter.prototype.removeListener =
    Emitter.prototype.removeAllListeners =
    Emitter.prototype.removeEventListener = function(event, fn){
      this._callbacks = this._callbacks || {};
    
      // all
      if (0 == arguments.length) {
        this._callbacks = {};
        return this;
      }
    
      // specific event
      var callbacks = this._callbacks[event];
      if (!callbacks) return this;
    
      // remove all handlers
      if (1 == arguments.length) {
        delete this._callbacks[event];
        return this;
      }
    
      // remove specific handler
      var cb;
      for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };
    
    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */
    
    Emitter.prototype.emit = function(event){
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1)
        , callbacks = this._callbacks[event];
    
      if (callbacks) {
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }
    
      return this;
    };
    
    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */
    
    Emitter.prototype.listeners = function(event){
      this._callbacks = this._callbacks || {};
      return this._callbacks[event] || [];
    };
    
    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */
    
    Emitter.prototype.hasListeners = function(event){
      return !! this.listeners(event).length;
    };
    
    });
    require.register("ui-component-mouse/index.js", function(exports, require, module){
    
    /**
     * dependencies.
     */
    
    var emitter = require('emitter')
      , event = require('event');
    
    /**
     * export `Mouse`
     */
    
    module.exports = function(el, obj){
      return new Mouse(el, obj);
    };
    
    /**
     * initialize new `Mouse`.
     * 
     * @param {Element} el
     * @param {Object} obj
     */
    
    function Mouse(el, obj){
      this.obj = obj || {};
      this.el = el;
    }
    
    /**
     * mixin emitter.
     */
    
    emitter(Mouse.prototype);
    
    /**
     * bind mouse.
     * 
     * @return {Mouse}
     */
    
    Mouse.prototype.bind = function(){
      var obj = this.obj
        , self = this;
    
      // up
      function up(e){
        obj.onmouseup && obj.onmouseup(e);
        event.unbind(document, 'mousemove', move);
        event.unbind(document, 'mouseup', up);
        self.emit('up', e);
      }
    
      // move
      function move(e){
        obj.onmousemove && obj.onmousemove(e);
        self.emit('move', e);
      }
    
      // down
      self.down = function(e){
        obj.onmousedown && obj.onmousedown(e);
        event.bind(document, 'mouseup', up);
        event.bind(document, 'mousemove', move);
        self.emit('down', e);
      };
    
      // bind all.
      event.bind(this.el, 'mousedown', self.down);
    
      return this;
    };
    
    /**
     * unbind mouse.
     * 
     * @return {Mouse}
     */
    
    Mouse.prototype.unbind = function(){
      event.unbind(this.el, 'mousedown', this.down);
      this.down = null;
    };
    
    });
    require.register("abpetkov-percentage-calc/percentage-calc.js", function(exports, require, module){
    
    /**
     * Percentage-Calc 0.0.1
     * https://github.com/abpetkov/percentage-calc
     *
     * Authored by Alexander Petkov
     * https://github.com/abpetkov
     *
     * Copyright 2014, Alexander Petkov
     * License: The MIT License (MIT)
     * http://opensource.org/licenses/MIT
     *
     */
    
    /**
     * Check if number.
     *
     * @param {Number} num
     * @returns {Boolean}
     * @api public
     */
    
    exports.isNumber = function(num) {
      return (typeof num === 'number') ? true : false;
    };
    
    /**
     * Calculate percentage of a number.
     *
     * @param {Number} perc
     * @param {Number} num
     * @returns {Number} result
     * @api public
     */
    
    exports.of = function(perc, num) {
      if (exports.isNumber(perc) && exports.isNumber(num)) return (perc / 100) * num;
    };
    
    /**
     * Calculate percentage of a number out ot another number.
     *
     * @param {Number} part
     * @param {Number} target
     * @returns {Number} result
     * @api public
     */
    
    exports.from = function(part, target) {
      if (exports.isNumber(part) && exports.isNumber(target)) return (part / target) * 100;
    };
    });
    require.register("abpetkov-closest-num/closest-num.js", function(exports, require, module){
    /**
     * Closest-num 0.0.1
     * https://github.com/abpetkov/closest-num
     *
     * Author: Alexander Petkov
     * https://github.com/abpetkov
     *
     * Copyright 2014, Alexander Petkov
     * License: The MIT License (MIT)
     * http://opensource.org/licenses/MIT
     *
     */
    
    /**
     * Get closest number in array.
     *
     * @param {Number} target
     * @param {Array} points
     * @returns {Number} closest
     * @api private
     */
    
    exports.find = function(target, points) {
      var diff = null
        , current = null
        , closest = points[0];
    
      for (i = 0; i < points.length; i++) {
        diff = Math.abs(target - closest);
        current = Math.abs(target - points[i]);
        if (current < diff) closest = points[i];
      }
    
      return closest;
    };
    });
    require.register("vesln-super/lib/super.js", function(exports, require, module){
    /**
     * slice
     */
    
    var slice = Array.prototype.slice;
    
    /**
     * Primary export
     */
    
    var exports = module.exports = super_;
    
    /**
     * ### _super (dest, orig)
     *
     * Inherits the prototype methods or merges objects.
     * This is the primary export and it is recommended
     * that it be imported as `inherits` in node to match
     * the auto imported browser interface.
     *
     *     var inherits = require('super');
     *
     * @param {Object|Function} destination object
     * @param {Object|Function} source object
     * @name _super
     * @api public
     */
    
    function super_() {
      var args = slice.call(arguments);
      if (!args.length) return;
      if (typeof args[0] !== 'function') return exports.merge(args);
      exports.inherits.apply(null, args);
    };
    
    /**
     * ### extend (proto[, klass])
     *
     * Provide `.extend` mechanism to allow extenion without
     * needing to use dependancy.
     *
     *     function Bar () {
     *       this._konstructed = true;
     *     }
     *
     *     Bar.extend = inherits.extend;
     *
     *     var Fu = Bar.extend({
     *       initialize: function () {
     *         this._initialized = true;
     *       }
     *     });
     *
     *     var fu = new Fu();
     *     fu.should.be.instanceof(Fu); // true
     *     fu.should.be.instanceof(Bar); // true
     *
     * @param {Object} properties/methods to add to new prototype
     * @param {Object} properties/methods to add to new class
     * @returns {Object} new constructor
     * @name extend
     * @api public
     */
    
    exports.extend = function(proto, klass) {
      var self = this
        , child = function () { return self.apply(this, arguments); };
      exports.merge([ child, this ]);
      exports.inherits(child, this);
      if (proto) exports.merge([ child.prototype, proto ]);
      if (klass) exports.merge([ child, klass ]);
      child.extend = this.extend; // prevent overwrite
      return child;
    };
    
    /**
     * ### inherits (ctor, superCtor)
     *
     * Inherit the prototype methods from on contructor
     * to another.
     *
     * @param {Function} destination
     * @param {Function} source
     * @api private
     */
    
    exports.inherits = function(ctor, superCtor) {
      ctor.super_ = superCtor;
      if (Object.create) {
        ctor.prototype = Object.create(superCtor.prototype,
          { constructor: {
                value: ctor
              , enumerable: false
              , writable: true
              , configurable: true
            }
        });
      } else {
        ctor.prototype = new superCtor();
        ctor.prototype.constructor = ctor;
      }
    }
    
    /**
     * Extends multiple objects.
     *
     * @param {Array} array of objects
     * @api private
     */
    
    exports.merge = function (arr) {
      var main = arr.length === 2 ? arr.shift() : {};
      var obj = null;
    
      for (var i = 0, len = arr.length; i < len; i++) {
        obj = arr[i];
        for (var p in obj) {
          if (!obj.hasOwnProperty(p)) continue;
          main[p] = obj[p];
        }
      }
    
      return main;
    };
    
    });
    require.register("powerange/lib/powerange.js", function(exports, require, module){
    /**
     * Require classes.
     */
    
    var Main = require('./main')
      , Horizontal = require('./horizontal')
      , Vertical = require('./vertical');
    
    /**
     * Set default values.
     *
     * @api public
     */
    
    var defaults = {
        callback: function() {}
      , decimal: false
      , disable: false
      , disableOpacity: 0.5
      , hideRange: false
      , klass: ''
      , min: 0
      , max: 100
      , start: null
      , step: null
      , vertical: false
    };
    
    /**
     * Expose proper type of `Powerange`.
     */
    
    module.exports = function(element, options) {
      options = options || {};
    
      for (var i in defaults) {
        if (options[i] == null) {
          options[i] = defaults[i];
        }
      }
    
      if (options.vertical) {
        return new Vertical(element, options);
      } else {
        return new Horizontal(element, options);
      }
    };
    });
    require.register("powerange/lib/main.js", function(exports, require, module){
    /**
     * External dependencies.
     *
     */
    
    var mouse = require('mouse')
      , events = require('events')
      , classes = require('classes')
      , percentage = require('percentage-calc');
    
    /**
     * Expose `Powerange`.
     */
    
    module.exports = Powerange;
    
    /**
     * Create Powerange object.
     *
     * @constructor
     * @param {Object} element
     * @param {Object} options
     * @api public
     */
    
    function Powerange(element, options) {
      if (!(this instanceof Powerange)) return new Powerange(element, options);
    
      this.element = element;
      this.options = options || {};
      this.slider = this.create('span', 'range-bar');
    
      if (this.element !== null && this.element.type === 'text') this.init();
    }
    
    /**
     * Bind events on handle element.
     *
     * @api private
     */
    
    Powerange.prototype.bindEvents = function () {
      this.handle = this.slider.querySelector('.range-handle');
      this.touch = events(this.handle, this);
      this.touch.bind('touchstart', 'onmousedown');
      this.touch.bind('touchmove', 'onmousemove');
      this.touch.bind('touchend', 'onmouseup');
      this.mouse = mouse(this.handle, this);
      this.mouse.bind();
    };
    
    /**
     * Hide the target element.
     *
     * @api private
     */
    
    Powerange.prototype.hide = function() {
      this.element.style.display = 'none';
    };
    
    /**
     * Append the target after the element.
     *
     * @api private
     */
    
    Powerange.prototype.append = function() {
      var slider = this.generate();
      this.insertAfter(this.element, slider);
    };
    
    /**
     * Generate the appropriate type of slider.
     *
     * @returns {Object} this.slider
     * @api private
     */
    
    Powerange.prototype.generate = function() {
      var elems = {
          'handle': {
              'type': 'span'
            , 'selector': 'range-handle'
          }
        , 'min': {
              'type': 'span'
            , 'selector': 'range-min'
          }
        , 'max': {
              'type': 'span'
            , 'selector': 'range-max'
          }
        , 'quantity': {
              'type': 'span'
            , 'selector': 'range-quantity'
          }
      };
    
      for (var key in elems) {
        if (elems.hasOwnProperty(key)) {
          var temp = this.create(elems[key].type, elems[key].selector);
          this.slider.appendChild(temp);
        }
      }
    
      return this.slider;
    };
    
    /**
     * Create HTML element.
     *
     * @param {String} type
     * @param {String} name
     * @returns {Object} elem
     * @api private
     */
    
    Powerange.prototype.create = function(type, name) {
      var elem = document.createElement(type);
      elem.className = name;
    
      return elem;
    };
    
    /**
     * Insert element after another element.
     *
     * @param {Object} reference
     * @param {Object} target
     * @api private
     */
    
    Powerange.prototype.insertAfter = function(reference, target) {
      reference.parentNode.insertBefore(target, reference.nextSibling);
    };
    
    /**
     * Add an additional class for extra customization.
     *
     * @param {String} klass
     * @api private
     */
    
    Powerange.prototype.extraClass = function(klass) {
      if (this.options.klass) classes(this.slider).add(klass);
    };
    
    /**
     * Set min and max values.
     *
     * @param {Number} min
     * @param {Number} max
     * @api private
     */
    
    Powerange.prototype.setRange = function(min, max) {
      if (typeof min === 'number' && typeof max === 'number' && !this.options.hideRange) {
        this.slider.querySelector('.range-min').innerHTML = min;
        this.slider.querySelector('.range-max').innerHTML = max;
      }
    };
    
    /**
     * Set slider current value.
     *
     * @param {Number} offset
     * @param {Number} size
     * @api private
     */
    
    Powerange.prototype.setValue = function (offset, size) {
      var part = percentage.from(parseFloat(offset), size)
        , value = percentage.of(part, this.options.max - this.options.min) + this.options.min
        , changed = false;
    
      value = (this.options.decimal) ? (Math.round(value * 100) / 100) : Math.round(value);
      changed = (this.element.value != value) ? true : false;
    
      this.element.value = value;
      this.options.callback();
      if (changed) this.changeEvent();
    };
    
    /**
     * Set step.
     *
     * @param {Number} sliderSize
     * @param {Number} handleSize
     * @returns {Array} this.steps
     * @api private
     */
    
    Powerange.prototype.step = function(sliderSize, handleSize) {
      var dimension = sliderSize - handleSize
        , part = percentage.from(this.checkStep(this.options.step), this.options.max - this.options.min)
        , interval = percentage.of(part, dimension)
        , steps = [];
    
      for (i = 0; i <= dimension; i += interval) {
        steps.push(i);
      }
    
      this.steps = steps;
    
      return this.steps;
    };
    
    /**
     * Check values.
     *
     * @param {Number} start
     * @api private
     */
    
    Powerange.prototype.checkValues = function(start) {
      if (start < this.options.min) this.options.start = this.options.min;
      if (start > this.options.max) this.options.start = this.options.max;
      if (this.options.min >= this.options.max) this.options.min = this.options.max;
    };
    
    /**
     * Make sure `step` is positive.
     *
     * @param {Number} value
     * @returns {Number} this.options.step
     * @api private
     */
    
    Powerange.prototype.checkStep = function(value) {
      if (value < 0) value = Math.abs(value);
      this.options.step = value;
      return this.options.step;
    };
    
    /**
     * Disable range slider.
     *
     * @api private
     */
    
    Powerange.prototype.disable = function() {
      if (this.options.min == this.options.max || this.options.min > this.options.max || this.options.disable) {
        this.mouse.unbind();
        this.touch.unbind();
        this.slider.style.opacity = this.options.disableOpacity;
        classes(this.handle).add('range-disabled');
      }
    };
    
    /**
     * Make element unselectable.
     *
     * @param {Object} element
     * @param {Boolean} set
     * @api private
     */
    
    Powerange.prototype.unselectable = function(element, set) {
      if (!classes(this.slider).has('unselectable') && set === true) {
        classes(this.slider).add('unselectable');
      } else {
        classes(this.slider).remove('unselectable');
      }
    };
    
    /**
     * Handle the onchange event.
     *
     * @param {Boolean} state
     * @api private
     */
    
    Powerange.prototype.changeEvent = function(state) {
      if (typeof Event === 'function' || !document.fireEvent) {
        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', false, true);
        this.element.dispatchEvent(event);
      } else {
        this.element.fireEvent('onchange');
      }
    };
    
    /**
     * Initialize main class.
     *
     * @api private
     */
    
    Powerange.prototype.init = function() {
      this.hide();
      this.append();
      this.bindEvents();
      this.extraClass(this.options.klass);
      this.checkValues(this.options.start);
      this.setRange(this.options.min, this.options.max);
      this.disable();
    };
    });
    require.register("powerange/lib/horizontal.js", function(exports, require, module){
    /**
     * External dependencies.
     *
     */
    
    var inherits = require('super')
      , closest = require('closest-num')
      , percentage = require('percentage-calc');
    
    /**
     * Require main class.
     */
    
    var Powerange = require('./main');
    
    /**
     * Expose `Horizontal`.
     */
    
    module.exports = Horizontal;
    
    /**
     * Create horizontal slider object.
     *
     * @api public
     */
    
    function Horizontal() {
      Powerange.apply(this, arguments);
      if (this.options.step) this.step(this.slider.offsetWidth, this.handle.offsetWidth);
      this.setStart(this.options.start);
    }
    
    /**
     * Inherit the main class.
     */
    
    inherits(Horizontal, Powerange);
    
    /**
     * Set horizontal slider position.
     *
     * @param {Number} start
     * @api private
     */
    
    Horizontal.prototype.setStart = function(start) {
      var begin = (start === null) ? this.options.min : start
        , part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
        , offset = percentage.of(part, this.slider.offsetWidth - this.handle.offsetWidth)
        , position = (this.options.step) ? closest.find(offset, this.steps) : offset;
    
      this.setPosition(position);
      //JUNE REMVOED THIS FOR LOCKPLUS
      //this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
    };
    
    /**
     * Set horizontal slider current position.
     *
     * @param {Number} val
     * @api private
     */
    
    Horizontal.prototype.setPosition = function(val) {
      this.handle.style.left = val + 'px';
      this.slider.querySelector('.range-quantity').style.width = val + 'px';
    };
    
    /**
     * On slider mouse down.
     *
     * @param {Object} e
     * @api private
     */
    
    Horizontal.prototype.onmousedown = function(e) {
      if (e.touches) e = e.touches[0];
      this.startX = e.clientX;
      this.handleOffsetX = this.handle.offsetLeft;
      this.restrictHandleX = this.slider.offsetWidth - this.handle.offsetWidth;
      this.unselectable(this.slider, true);
    };
    
    /**
     * On slider mouse move.
     *
     * @param {Object} e
     * @api private
     */
    
    Horizontal.prototype.onmousemove = function(e) {
      e.preventDefault();
      if (e.touches) e = e.touches[0];
    
      var leftOffset = this.handleOffsetX + e.clientX - this.startX
        , position = (this.steps) ? closest.find(leftOffset, this.steps) : leftOffset;
    
      if (leftOffset <= 0) {
        this.setPosition(0);
      } else if (leftOffset >= this.restrictHandleX) {
        this.setPosition(this.restrictHandleX);
      } else {
        this.setPosition(position);
      }
    
      this.setValue(this.handle.style.left, this.slider.offsetWidth - this.handle.offsetWidth);
    };
    
    /**
     * On mouse up.
     *
     * @param {Object} e
     * @api private
     */
    
    Horizontal.prototype.onmouseup = function(e) {
      this.unselectable(this.slider, false);
    };
    });
    require.register("powerange/lib/vertical.js", function(exports, require, module){
    /**
     * External dependencies.
     *
     */
    
    var inherits = require('super')
      , classes = require('classes')
      , closest = require('closest-num')
      , percentage = require('percentage-calc');
    
    /**
     * Require main class.
     */
    
    var Powerange = require('./main');
    
    /**
     * Expose `Vertical`.
     */
    
    module.exports = Vertical;
    
    /**
     * Create vertical slider object.
     *
     * @api public
     */
    
    function Vertical() {
      Powerange.apply(this, arguments);
      classes(this.slider).add('vertical');
      if (this.options.step) this.step(this.slider.offsetHeight, this.handle.offsetHeight);
      this.setStart(this.options.start);
    }
    
    /**
     * Inherit the main class.
     */
    
    inherits(Vertical, Powerange);
    
    /**
     * Set vertical slider position.
     *
     * @param {Number} start
     * @api private
     */
    
    Vertical.prototype.setStart = function(start) {
      var begin = (start === null) ? this.options.min : start
        , part = percentage.from(begin - this.options.min, this.options.max - this.options.min) || 0
        , offset = percentage.of(part, this.slider.offsetHeight - this.handle.offsetHeight)
        , position = (this.options.step) ? closest.find(offset, this.steps) : offset;
    
      this.setPosition(position);
      this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight);
    };
    
    /**
     * Set vertical slider current position.
     *
     * @param {Number} val
     * @api private
     */
    
    Vertical.prototype.setPosition = function(val) {
      this.handle.style.bottom = val + 'px';
      this.slider.querySelector('.range-quantity').style.height = val + 'px';
    };
    
    /**
     * On mouse down.
     *
     * @param {Object} e
     * @api private
     */
    
    Vertical.prototype.onmousedown = function(e) {
      if (e.touches) e = e.touches[0];
      this.startY = e.clientY;
      this.handleOffsetY = this.slider.offsetHeight - this.handle.offsetHeight - this.handle.offsetTop;
      this.restrictHandleY = this.slider.offsetHeight - this.handle.offsetHeight;
      this.unselectable(this.slider, true);
    };
    
    /**
     * On vertical slider mouse move.
     *
     * @param {Object} e
     * @api private
     */
    
    Vertical.prototype.onmousemove = function(e) {
      e.preventDefault();
      if (e.touches) e = e.touches[0];
    
      var bottomOffset = this.handleOffsetY + this.startY - e.clientY
        , position = (this.steps) ? closest.find(bottomOffset, this.steps) : bottomOffset;
    
      if (bottomOffset <= 0) {
        this.setPosition(0);
      } else if (bottomOffset >= this.restrictHandleY) {
        this.setPosition(this.restrictHandleY);
      } else {
        this.setPosition(position);
      }
    
      this.setValue(this.handle.style.bottom, this.slider.offsetHeight - this.handle.offsetHeight);
    };
    
    /**
     * On mouse up.
     *
     * @param {Object} e
     * @api private
     */
    
    Vertical.prototype.onmouseup = function(e) {
      this.unselectable(this.slider, false);
    };
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    require.alias("component-events/index.js", "powerange/deps/events/index.js");
    require.alias("component-events/index.js", "events/index.js");
    require.alias("component-event/index.js", "component-events/deps/event/index.js");
    
    require.alias("component-delegate/index.js", "component-events/deps/delegate/index.js");
    require.alias("discore-closest/index.js", "component-delegate/deps/closest/index.js");
    require.alias("discore-closest/index.js", "component-delegate/deps/closest/index.js");
    require.alias("component-matches-selector/index.js", "discore-closest/deps/matches-selector/index.js");
    require.alias("component-query/index.js", "component-matches-selector/deps/query/index.js");
    
    require.alias("discore-closest/index.js", "discore-closest/index.js");
    require.alias("component-event/index.js", "component-delegate/deps/event/index.js");
    
    require.alias("component-classes/index.js", "powerange/deps/classes/index.js");
    require.alias("component-classes/index.js", "classes/index.js");
    require.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js");
    
    require.alias("ui-component-mouse/index.js", "powerange/deps/mouse/index.js");
    require.alias("ui-component-mouse/index.js", "mouse/index.js");
    require.alias("component-emitter/index.js", "ui-component-mouse/deps/emitter/index.js");
    
    require.alias("component-event/index.js", "ui-component-mouse/deps/event/index.js");
    
    require.alias("abpetkov-percentage-calc/percentage-calc.js", "powerange/deps/percentage-calc/percentage-calc.js");
    require.alias("abpetkov-percentage-calc/percentage-calc.js", "powerange/deps/percentage-calc/index.js");
    require.alias("abpetkov-percentage-calc/percentage-calc.js", "percentage-calc/index.js");
    require.alias("abpetkov-percentage-calc/percentage-calc.js", "abpetkov-percentage-calc/index.js");
    require.alias("abpetkov-closest-num/closest-num.js", "powerange/deps/closest-num/closest-num.js");
    require.alias("abpetkov-closest-num/closest-num.js", "powerange/deps/closest-num/index.js");
    require.alias("abpetkov-closest-num/closest-num.js", "closest-num/index.js");
    require.alias("abpetkov-closest-num/closest-num.js", "abpetkov-closest-num/index.js");
    require.alias("vesln-super/lib/super.js", "powerange/deps/super/lib/super.js");
    require.alias("vesln-super/lib/super.js", "powerange/deps/super/index.js");
    require.alias("vesln-super/lib/super.js", "super/index.js");
    require.alias("vesln-super/lib/super.js", "vesln-super/index.js");
    require.alias("powerange/lib/powerange.js", "powerange/index.js");if (typeof exports == "object") {
      module.exports = require("powerange");
    } else if (typeof define == "function" && define.amd) {
      define([], function(){ return require("powerange"); });
    } else {
      this["Powerange"] = require("powerange");
    }})();
    


    /* Swipe JS*/
    /*jslint
  node: true,
  sloppy: true,
  browser: true,
  todo: true
*/

/*global
Event,
FPI,
isSettingIcon
 */

(function () {
  var swipe = {
      bgSwipe: function (direction) {
          if (direction === 'd') {
            setTimeout(function(){
              if(lStorage.enablespotlight){
                window.location = 'frontpage:opensearch';
              }
            },0);
          }
          if (direction === 'u') {
            if(lStorage.swipeupdrawer){
              FPDrawer.showDrawer();
            }
          }
          if (direction === 'l') {
              
          }
          if (direction === 'r') {
            setTimeout(function(){
              if(lStorage.enabletodayview){
                if(lStorage.hideFrontPageOnToday){
                  document.body.style.opacity = 0;
                }
                window.location = 'frontpage:showToday';
              }
            },0);
          }
      }
  };

  function detectswipe(el, func) {
      var data = {
              sX: 0,
              sY: 0,
              eX: 0,
              eY: 0,
              mXY: ''
          },
          min_x = 30, //min x swipe for horizontal swipe
          max_x = 50, //max x difference for vertical swipe
          min_y = 100, //min y swipe for vertical swipe
          max_y = 70, //max y difference for horizontal swipe
          direction = "",
          ele = document.querySelector(el);
      ele.addEventListener('touchstart', function (e) {
          var t = e.touches[0];
          data.sX = t.screenX;
          data.sY = t.screenY;
          if(e.targetTouches.length > 1){ //we only want single swipe
            data.sX = 0;
            data.sY = 0;
          }
      }, {passive: true});
      ele.addEventListener('touchmove', function (e) {
          if (e.touches.length < 2 && e.target.id === "container") {
              e.preventDefault();
          }
          var t = e.touches[0];
          data.eX = t.screenX;
          data.eY = t.screenY;
          data.movedXY = "yes";
          if(e.targetTouches.length > 1){ //we only want single swipe
            data.eX = 0;
            data.eY = 0;
            data.movedXY = "";
          }
      });
      ele.addEventListener('cancel', function(){
          data = {
            sX: 0,
            sY: 0,
            eX: 0,
            eY: 0,
            mXY: '',
            movedXY: ''
          };
          e.preventDefault();
      });
      ele.addEventListener('touchend', function (exs) {
          if (data.movedXY === 'yes') {
              if ((((data.eX - min_x > data.sX) || (data.eX + min_x < data.sX)) && ((data.eY < data.sY + max_y) && (data.sY > data.eY - max_y)))) {
                  if (data.eX > data.sX) {
                      direction = "r";
                  } else if (data.eX < data.sX) {
                      direction = "l";
                  }
              }
              if ((((data.eY - min_y > data.sY) || (data.eY + min_y < data.sY)) && ((data.eX < data.sX + max_x) && (data.sX > data.eX - max_x)))) {
                  if (data.eY > data.sY) {
                      direction = "d";
                  } else if (data.eY < data.sY) {
                      direction = "u";
                  }
              }
          }
          if (direction !== "") {
              if (typeof func === 'function') {
                  if (exs.target.id === el.split('#')[1]) {
                      func(direction);
                  }
              }
          }
          direction = "";
          data.movedXY = "";
      }, {passive: true});
  }
  detectswipe('#mainContainer', swipe.bgSwipe);
}());
