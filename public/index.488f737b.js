// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"img/agp.png":[function(require,module,exports) {
module.exports = "agp.b8a79a92.png";
},{}],"js/config.js":[function(require,module,exports) {
var MODE = 'STAGE'; // STAGE
var DEVPORT = 7007;
var ENVIRONMENTS = {
  PROD: {
    ENDPOINT: '',
    UPLOAD_ENDPOINT: ''
  },
  STAGE: {
    ENDPOINT: window.location.protocol + '//' + window.location.host,
    UPLOAD_ENDPOINT: window.location.protocol + '//' + window.location.host + '/fileUpload'
  },
  DEV: {
    ENDPOINT: window.location.protocol + '//' + window.location.hostname + ':' + DEVPORT,
    UPLOAD_ENDPOINT: window.location.protocol + '//' + window.location.hostname + ':' + DEVPORT + '/fileUpload'
  }
};
module.exports = {
  ENDPOINT: ENVIRONMENTS[MODE].ENDPOINT,
  UPLOAD_ENDPOINT: ENVIRONMENTS[MODE].UPLOAD_ENDPOINT
};
},{}],"index/index.js":[function(require,module,exports) {
"use strict";

var _agp = _interopRequireDefault(require("../img/agp.png"));
var _config = require("../js/config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var listElelemts = '';
var errorIs = null;
var compositions = [];
var queryString = window.location.search;
var isAuthenticated = queryString.split('auth=')[1];
var domainIs = window.location.host;
var uriCompositionPage = '/composition.html?compositionId=';
var uriProfilePage = window.location.origin;
if (domainIs !== 'localhost:80' && window.location.origin !== 'http://localhost') {
  uriCompositionPage = '/public' + uriCompositionPage;
  uriProfilePage += '/public';
}
if (isAuthenticated) {
  document.getElementById('useroptions').innerHTML = "<li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"".concat(uriProfilePage + '/profile.html', "\">Profile</a>\n  </li>\n  <li class=\"nav-item\">\n        <a class=\"nav-link\" href=\"#\" data-toggle=\"modal\" data-target=\"#newMusicModal\">New Music</a>\n      </li>");
} else {
  document.getElementById('useroptions').innerHTML = "<a class=\"dropdown-item\" href=\"".concat(window.location.origin, "/login\">Google Login</a>");
}
fetch(_config.ENDPOINT + '/compositions', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
}).then(function (r) {
  if (!r.ok) {
    errorIs = r.statusText;
  }
  return r.json();
}).then(function (data) {
  if (data.compositions) {
    compositions = data.compositions;
  }
}).catch(function (error) {
  errorIs = error;
}).then(function () {
  renderHomePage(compositions, errorIs);
});
var renderHomePage = function renderHomePage(compositionsList, error) {
  var loaderElement = document.getElementById('loader');
  loaderElement.classList.remove('loader');
  if (error) {
    alert(error);
  } else {
    paintListOfCompositions(compositionsList);
  }
};
var paintListOfCompositions = function paintListOfCompositions(compositionsList) {
  compositionsList.forEach(function (element) {
    if (element) {
      var collection = '';
      if (element.collection) {
        collection = "<a href=\"./index.html?collection=".concat(element.collection, "\" class=\"card-link green\">").concat(element.collection, "</a>");
      }
      var template = "\n        <div class=\"grid-div\">\n          <div class=\"card\">\n            <a href=\"".concat(uriCompositionPage + element.id, "\">\n              <img src=\"").concat(element.photo_url || _agp.default, "\" alt=\"Card image cap\" class=\"card-img\">\n            </a>\n            <div class=\"card-container\">\n              <a href=\"").concat(uriCompositionPage + element.id, "\" class=\"card-link blue\">").concat(element.title, "</a>\n              <p>").concat(collection, "</p>\n            </div>\n          </div>\n        </div>\n      ");
      listElelemts += template;
    }
  });
  document.getElementById('grid').insertAdjacentHTML('afterbegin', listElelemts);
  document.getElementById('searchInput').removeAttribute('disabled');
};
var newProjectButton = document.getElementById('newcomposition');
newProjectButton && newProjectButton.addEventListener("click", function (e) {
  var newtitle = document.getElementById('newtitle').value;
  var privacyLevel = document.querySelector('input[name="newMusicPrivacyRadios"]:checked').value;
  if (!newtitle) {
    alert('Introduce a valid title, please');
    return;
  }
  var body = JSON.stringify({
    title: newtitle,
    privacy_level: privacyLevel
  });
  fetch(_config.ENDPOINT + '/newcomposition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body
  }).then(function (r) {
    if (!r.ok) {
      errorIs = r.statusText;
    }
    return r.json();
  }).then(function (data) {
    if (data.composition) {
      window.location.href = uriCompositionPage + data.composition.id;
    } else {
      throw new Error(data);
    }
  }).catch(function (error) {
    errorIs = error;
  });
});
},{"../img/agp.png":"img/agp.png","../js/config":"js/config.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58360" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index/index.js"], null)
//# sourceMappingURL=index.488f737b.js.map