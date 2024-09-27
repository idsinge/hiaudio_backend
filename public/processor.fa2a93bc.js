// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"16U1d":[function(require,module,exports) {
function mod(n, m) {
    return (n % m + m) % m;
}
class MeasureProcessor extends AudioWorkletProcessor {
    constructor(...args){
        super(args);
        this.interval = 1 * globalThis.sampleRate;
        this.remaining = this.interval;
        this.start = 0;
        this.tapped = false;
        this.threshold = 0.2;
        // Noise burst synthesis parameter
        this.sq_frames = 64;
        this.sq_remaining = 64;
        this.sq_period = 16;
        this.sq_amp = 0.8;
        // A ring buffer that always keep the last 1000ms of audio to be able to find
        // the beginning of the noise burst a peak has been found.
        this.ringbuf = new Float32Array(globalThis.sampleRate);
        this.write_idx = 0;
    //var self = this;
    // this.port.onmessage = function (e) {
    //     self.threshold = e.data.threshold;
    // }
    }
    // record a single sample in the ring buffer
    record(sample) {
        this.ringbuf[this.write_idx] = sample;
        this.write_idx = mod(this.write_idx + 1, this.ringbuf.length);
    }
    // get a sample from the ring buffer. idx is an offset in the past, 0 is the
    // sample most recently written to the ring buffer
    get_past_sample(idx) {
        var not_wrapped = this.write_idx - 1 - idx;
        var i = mod(this.write_idx - 1 - idx, this.ringbuf.length);
        return this.ringbuf[i];
    }
    process(inputs, outputs) {
        //console.log(inputs[0][0].length); // this shows the bufferSize
        var input = inputs[0];
        if (!input.length) return true;
        var mono_input = input[0];
        var mono_output = outputs[0][0];
        for(var i = 0; i < mono_input.length; i++){
            // This matches on a positive peak
            if (mono_input[i] > this.threshold && this.tapped) {
                // try to find the beginning of the pattern, because what's been found
                // is probably a peak, which is in the middle of the burst. Scan
                // back the last 10ms or so.
                var idx_first_zero_crossing = -1;
                var scan_back_idx = 0;
                while(scan_back_idx++ != this.ringbuf.length)if (this.get_past_sample(scan_back_idx) < 0) {
                    idx_first_zero_crossing = scan_back_idx;
                    break;
                }
                // we expect zero crossing around each 8 frames. Stop when that's not
                // the case anymore. This is not very good, this should be scanning
                // window + correlation maximisation.
                var sign = true;
                var current_period = 0;
                while(scan_back_idx++ != this.ringbuf.length){
                    var computed_period = (scan_back_idx - idx_first_zero_crossing) / this.sq_period;
                    if (sign != Math.sign(this.get_past_sample(scan_back_idx))) {
                        // zero crossing, fuzz match
                        if (Math.abs(current_period - computed_period) > 2) break;
                    }
                }
                // send back frames from the past to the main thread to display in debug
                // mode
                var frames_delay = globalThis.currentFrame + i - scan_back_idx - this.start;
                if (frames_delay > 0) {
                    var debugarray = new Float32Array(frames_delay * 2);
                    var rdIdx = 0;
                    for(var j = 0; j < debugarray.length; j++)debugarray[debugarray.length - j] = this.get_past_sample(j);
                    var latency_s = frames_delay / globalThis.sampleRate;
                    this.port.postMessage({
                        latency: latency_s,
                        array: debugarray,
                        offset: scan_back_idx,
                        delay_frames: frames_delay
                    });
                }
                this.tapped = false;
            }
            if (this.remaining == 0) {
                if (this.sq_remaining == this.sq_frames) {
                    this.tapped = true;
                    this.start = globalThis.currentFrame + i;
                    mono_input[i] = -1;
                }
                mono_output[i] = this.sq_remaining % this.sq_period > this.sq_period / 2 ? this.sq_amp : -this.sq_amp;
                this.sq_remaining--;
                if (this.sq_remaining == 0) {
                    this.sq_remaining = this.sq_frames;
                    this.remaining = this.interval;
                }
            } else this.remaining--;
            this.record(mono_input[i] + mono_output[i]);
        // Following line commented to avoid Larssen effect / feedback
        //mono_output[i] += mono_input[i];
        }
        return true;
    }
}
registerProcessor("measure-processor", MeasureProcessor);

},{}]},["16U1d"], "16U1d", "parcelRequire1e7e")

//# sourceMappingURL=processor.fa2a93bc.js.map
