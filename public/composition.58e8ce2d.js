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
})({"gmUot":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = true;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "171ea91158e8ce2d";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"9ZuIT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "COMPOSITION_ID", ()=>COMPOSITION_ID);
parcelHelpers.export(exports, "USER_PERMISSION", ()=>USER_PERMISSION);
parcelHelpers.export(exports, "setUserPermission", ()=>setUserPermission);
parcelHelpers.export(exports, "playlist", ()=>playlist);
parcelHelpers.export(exports, "trackHandler", ()=>trackHandler);
parcelHelpers.export(exports, "fileUploader", ()=>fileUploader);
parcelHelpers.export(exports, "createWaveformPlaylist", ()=>createWaveformPlaylist);
parcelHelpers.export(exports, "recorder", ()=>recorder);
var _trackHandler = require("./track_handler");
var _fileuploader = require("./fileuploader");
var _waveformPlaylistUmd = require("./waveform-playlist.umd");
var _waveformPlaylistUmdDefault = parcelHelpers.interopDefault(_waveformPlaylistUmd);
var _record = require("./record");
var _latencytesthandler = require("./latencytesthandler");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _utils = require("../../../common/js/utils");
var _detectBrowserJs = require("../../../common/js/detect-browser.js");
var _detectBrowserJsDefault = parcelHelpers.interopDefault(_detectBrowserJs);
const queryString = window.location.search;
const COMPOSITION_ID = queryString.split("compositionId=")[1];
let USER_PERMISSION = false;
const setUserPermission = (permission)=>{
    USER_PERMISSION = permission;
};
let playlist = null;
let trackHandler = null;
let fileUploader = null;
const createWaveformPlaylist = (audCtxt, stream)=>{
    playlist = (0, _waveformPlaylistUmdDefault.default)({
        samplesPerPixel: 3000,
        waveHeight: 100,
        container: document.getElementById("playlist"),
        state: "cursor",
        colors: {
            waveOutlineColor: "#E0EFF1",
            timeColor: "grey",
            fadeColor: "black"
        },
        controls: {
            show: true,
            width: 200,
            widgets: {
                stereoPan: true,
                collapse: false,
                remove: true
            }
        },
        zoomLevels: [
            500,
            1000,
            3000,
            5000
        ],
        isAutomaticScroll: true,
        timescale: true,
        ac: audCtxt
    });
    trackHandler = new (0, _trackHandler.TrackHandler)();
    fileUploader = new (0, _fileuploader.FileUploader)(COMPOSITION_ID, trackHandler);
    (0, _latencytesthandler.triggerLatencyTestHandler)(stream);
};
const browserId = (0, _detectBrowserJsDefault.default)();
const recorder = new (0, _record.Recorder)(browserId);
const compositionId = COMPOSITION_ID;
const testMicButtonForSafari = ()=>{
    const browserVersion = parseInt(recorder.browserId.version);
    if (recorder.browserId.browser === "safari" && browserVersion >= 16) return `<li class='nav-item'>
              <a class='nav-link' href='#' id='testmicrophone' data-toggle='modal' data-target='#testMicrophoneModal'>
                <i class='fa-solid fa-microphone'></i> TEST MIC
              </a>
            </li>`;
    else return "";
};
const createTestButtons = ()=>{
    document.getElementById("useroptions").innerHTML = `${(0, _latencytesthandler.triggerTestLatencyButton)()}${testMicButtonForSafari()}`;
};
(0, _utils.activateGoHomeLink)();
createTestButtons();
if (compositionId === "demopage") (0, _modaldialogDefault.default).dynamicModalDialog(`Be careful, the music you record or upload won't be saved, as you are not a registered user and this is only a test feature!`, null, "", "Close", "Warning!", "bg-warning");
recorder.init(compositionId);

},{"./track_handler":"lB9N3","./fileuploader":"ggBmz","./waveform-playlist.umd":"cX3Qw","./record":"3tXgN","./latencytesthandler":"64S6j","../../../common/js/modaldialog":"geXkr","../../../common/js/utils":"g7t25","../../../common/js/detect-browser.js":"bUrti","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lB9N3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TrackHandler", ()=>TrackHandler);
var _config = require("../../../common/js/config");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _utils = require("../../../common/js/utils");
var _compositionHelper = require("./composition_helper");
var _composition = require("./composition");
var _trackinfo = require("./trackinfo/trackinfo");
class TrackHandler {
    displayOptMenuForNewTrack(newTrack) {
        const element = newTrack.result;
        const audio = element?.message?.audio || element?.message?.voice;
        const title = audio.title || element.message.date;
        const track_id = audio.file_unique_id;
        const controlsList = document.getElementsByClassName("controls");
        let pos = 0;
        let posFound = false;
        while(!posFound && pos < (0, _composition.playlist).tracks.length)if ((0, _composition.playlist).tracks[pos].trackuid === newTrack.trackuid) posFound = true;
        else pos++;
        if (posFound) {
            const customClass = {
                name: title,
                track_id: track_id,
                user_id: audio.user_id,
                user_uid: audio.user_uid,
                composition_id: audio.composition_id
            };
            (0, _composition.playlist).tracks[pos].customClass = customClass;
            this.createMenuOptButton(controlsList, pos, title, track_id);
        }
    }
    displayOptMenuForTracks(role) {
        const menuBtns = document.querySelectorAll(".menuoptbtn");
        if (menuBtns.length) document.querySelectorAll(".menuoptbtn").forEach((e)=>e.remove());
        const controlsList = document.getElementsByClassName("controls");
        const arrayTracks = (0, _composition.playlist).getInfo().tracks;
        for(let i = 0; i < arrayTracks.length; i++){
            if (arrayTracks[i]?.customClass) {
                if (role === 1 || role === 2 || role === 3 && arrayTracks[i].customClass.user_uid === (0, _compositionHelper.CURRENT_USER_ID)) {
                    const name = arrayTracks[i].customClass.name;
                    const track_id = arrayTracks[i].customClass.track_id;
                    this.createMenuOptButton(controlsList, i, name, track_id);
                }
            }
        }
    }
    createMenuOptButton(controlsList, pos, name, track_id) {
        const menuBtnId = "menuoptbtn-" + pos;
        const menuDrpDownId = "menuDropdown" + pos;
        const buttonMenu = document.createElement("button");
        const txt = document.createTextNode("...");
        buttonMenu.className = "menuoptbtn";
        buttonMenu.onclick = ()=>{
            document.getElementById(menuDrpDownId).classList.toggle("show");
        };
        buttonMenu.id = menuBtnId;
        buttonMenu.appendChild(txt);
        controlsList[pos].appendChild(buttonMenu);
        const listOptions = this.createListMenuOpt(menuDrpDownId, pos, name, track_id);
        document.getElementById(menuBtnId).appendChild(listOptions);
        const spanTitle = controlsList[pos].getElementsByClassName("track-header")[0].getElementsByTagName("span")[0];
        spanTitle.style["margin-left"] = "3em";
    }
    createListMenuOpt(menuDrpDownId, pos, name, track_id) {
        const listOptions = document.createElement("ul");
        listOptions.id = menuDrpDownId;
        listOptions.className = "dropdown-menu";
        const deleteMenuOpt = this.createDeleteMenuOpt(pos, name, track_id);
        const trackInfoMenuOpt = this.createTrackInfoMenuOpt(pos, name, track_id);
        listOptions.appendChild(deleteMenuOpt);
        listOptions.appendChild(trackInfoMenuOpt);
        return listOptions;
    }
    createDeleteMenuOpt(pos, name, track_id) {
        const deleteMenuOpt = document.createElement("li");
        deleteMenuOpt.className = "dropdown-item btn-light";
        deleteMenuOpt.dataset.pos = pos;
        deleteMenuOpt.dataset.name = name;
        deleteMenuOpt.dataset.trackId = track_id;
        deleteMenuOpt.onclick = (event)=>{
            this.deleteTrackConfirmDialog(event, this.sendDeleteRequest, this.doAfterDeleted);
        };
        deleteMenuOpt.appendChild(document.createTextNode("Delete"));
        return deleteMenuOpt;
    }
    createTrackInfoMenuOpt(pos, name, track_id) {
        const trackInfoMenuOpt = document.createElement("li");
        trackInfoMenuOpt.className = "dropdown-item btn-light";
        trackInfoMenuOpt.dataset.target = "#trackInfoModal";
        trackInfoMenuOpt.dataset.toggle = "modal";
        trackInfoMenuOpt.onclick = (event)=>{
            (0, _trackinfo.createTrackInfoTable)(pos, name, track_id);
        };
        trackInfoMenuOpt.appendChild(document.createTextNode("Track Info"));
        return trackInfoMenuOpt;
    }
    detectClickOutsideMenuOpt() {
        window.onclick = function(event) {
            const dropdownDisplayed = document.getElementsByClassName("dropdown-menu show");
            if (dropdownDisplayed.length > 0 && event.target.className !== "menuoptbtn") Array.from(dropdownDisplayed).forEach(function(item) {
                item.className = "dropdown-menu";
            });
            else if (dropdownDisplayed.length > 1) Array.from(dropdownDisplayed).forEach(function(item) {
                if (!event.target.contains(item)) item.className = "dropdown-menu";
            });
        };
    }
    deleteTrackConfirmDialog(event, callback, afterCallback) {
        (0, _modaldialogDefault.default).dynamicModalDialog("Delete " + event.target.dataset.name + "?", "btn-delete-track", "OK", "Cancel", "Delete Track", "bg-danger");
        document.getElementById("btn-delete-track").onclick = ()=>{
            callback(event.target.dataset.pos, event.target.dataset.trackId, afterCallback);
            (0, _modaldialogDefault.default).closeDynamicModal();
        };
    }
    sendDeleteRequest(pos, track_id, doAfterDeleted) {
        (0, _utils.startLoader)((0, _utils.LOADER_ELEM_ID), "Deleting track...");
        fetch((0, _config.ENDPOINT) + "/deletetrack/" + track_id, {
            method: "DELETE"
        }).then((res)=>res.json()).then((res)=>{
            doAfterDeleted(res, pos);
        }).catch((err)=>{
            console.log(err);
            (0, _utils.cancelLoader)((0, _utils.LOADER_ELEM_ID));
        });
    }
    doAfterDeleted(deleteTrackResult, pos) {
        (0, _utils.cancelLoader)((0, _utils.LOADER_ELEM_ID));
        if (deleteTrackResult.ok) {
            const role = deleteTrackResult.role;
            const arrayTracks = (0, _composition.playlist).tracks;
            const ee = (0, _composition.playlist).getEventEmitter();
            ee.emit("removeTrack", arrayTracks[pos]);
            const trackHandler = new TrackHandler();
            trackHandler.displayOptMenuForTracks(role);
        }
    }
}

},{"../../../common/js/config":"ecGaw","../../../common/js/modaldialog":"geXkr","../../../common/js/utils":"g7t25","./composition_helper":"fxAYF","./composition":"9ZuIT","./trackinfo/trackinfo":"jRykX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ecGaw":[function(require,module,exports) {
const MODE = "STAGE" // STAGE
;
const ENVIRONMENTS = {
    PROD: {
        ENDPOINT: "",
        UPLOAD_ENDPOINT: ""
    },
    STAGE: {
        ENDPOINT: window.location.protocol + "//" + window.location.host,
        UPLOAD_ENDPOINT: window.location.protocol + "//" + window.location.host + "/fileUpload"
    },
    DEV: {
        ENDPOINT: window.location.protocol + "//" + window.location.host,
        UPLOAD_ENDPOINT: window.location.protocol + "//" + window.location.host + "/fileUpload"
    }
};
module.exports = {
    ENDPOINT: ENVIRONMENTS[MODE].ENDPOINT,
    UPLOAD_ENDPOINT: ENVIRONMENTS[MODE].UPLOAD_ENDPOINT
};

},{}],"geXkr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class DynamicModal {
    constructor(){
        this.modal = this.getDynamicModal();
        this.callbackDismiss = null;
        if (!this.modal) {
            this.modal = this.initDynamicModal();
            const self = this;
            $(this.modal).on("hide.bs.modal", function(event) {
                if (self.callbackDismiss) {
                    self.callbackDismiss();
                    self.callbackDismiss = null;
                }
            });
        }
    }
    dynamicModalDialog(message, idbtn, textBtnOK, textBtnCancel, popupTitle, backgroundHeader, callbackDismiss) {
        const html = '<div class="modal-header ' + backgroundHeader + ' text-white">' + '<h5 class="modal-title" id="dynamicModalLabel">' + popupTitle + "</h5>" + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '<span aria-hidden="true">&times;</span>' + "</button>" + "</div>" + '<div class="modal-body">' + message + "</div>" + '<div class="modal-footer">' + '<button type="button" class="btn btn-secondary" data-dismiss="modal">' + textBtnCancel + "</button>" + (idbtn !== null ? "<button id=" + idbtn + ' type="button" class="btn btn-primary">' + textBtnOK + "</button>" : "") + "</div>";
        this.setDynamicModalContent(html);
        this.callbackDismiss = callbackDismiss;
        $(this.modal).modal("show");
    }
    getDynamicModal() {
        return document.getElementById("dynamicModal");
    }
    setDynamicModalContent(html) {
        this.modal.querySelector(".modal-content").innerHTML = html;
    }
    closeDynamicModal(callBackClose) {
        $(this.modal).modal("hide");
        if (callBackClose) callBackClose();
    }
    initDynamicModal() {
        const modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.setAttribute("id", "dynamicModal");
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-labelledby", "dynamicModalLabel");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = '<div class="modal-dialog modal-sm modal-dialog-centered" role="document"><div class="modal-content"></div></div>';
        document.body.appendChild(modal);
        return modal;
    }
}
const dynamicModalInstance = new DynamicModal();
exports.default = dynamicModalInstance;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g7t25":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LOADER_ELEM_ID", ()=>LOADER_ELEM_ID);
parcelHelpers.export(exports, "uriUserPage", ()=>uriUserPage);
parcelHelpers.export(exports, "uriCollectionPage", ()=>uriCollectionPage);
parcelHelpers.export(exports, "UserRole", ()=>UserRole);
parcelHelpers.export(exports, "LevelPrivacy", ()=>LevelPrivacy);
parcelHelpers.export(exports, "PRIVACY_BADGE_STYLE", ()=>PRIVACY_BADGE_STYLE);
parcelHelpers.export(exports, "PRIVACY_BADGE_TEXT", ()=>PRIVACY_BADGE_TEXT);
parcelHelpers.export(exports, "startLoader", ()=>startLoader);
parcelHelpers.export(exports, "cancelLoader", ()=>cancelLoader);
parcelHelpers.export(exports, "callJsonApi", ()=>callJsonApi);
parcelHelpers.export(exports, "looksLikeMail", ()=>looksLikeMail);
parcelHelpers.export(exports, "activateGoHomeLink", ()=>activateGoHomeLink);
parcelHelpers.export(exports, "isSafari", ()=>isSafari);
parcelHelpers.export(exports, "MEDIA_CONSTRAINTS", ()=>MEDIA_CONSTRAINTS);
var _config = require("./config");
const LOADER_ELEM_ID = "loader";
const uriUserPage = "/index.html?userid=";
const uriCollectionPage = "/index.html?collectionid=";
const UserRole = Object.freeze({
    none: 0,
    owner: 1,
    admin: 2,
    member: 3,
    guest: 4
});
const LevelPrivacy = Object.freeze({
    public: 1,
    onlyreg: 2,
    private: 3
});
const PRIVACY_BADGE_STYLE = {
    [LevelPrivacy.public]: "badge-public",
    [LevelPrivacy.onlyreg]: "badge-onlyreg",
    [LevelPrivacy.private]: "badge-private"
};
const PRIVACY_BADGE_TEXT = {
    [LevelPrivacy.public]: "PUBLIC",
    [LevelPrivacy.onlyreg]: "REG USERS",
    [LevelPrivacy.private]: "PRIVATE"
};
const startLoader = (loaderId, loadingMessage)=>{
    const loaderElement = document.getElementById(loaderId);
    loaderElement.nextElementSibling.textContent = loadingMessage;
    loaderElement.classList.add(loaderId);
};
const cancelLoader = (loaderId)=>{
    const loaderElement = document.getElementById(loaderId);
    loaderElement.classList.remove(loaderId);
    loaderElement.nextElementSibling.textContent = "";
};
const callJsonApi = async (apimethod, rqstmethod, body)=>{
    const request = {
        method: rqstmethod || "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };
    if (body) request.body = JSON.stringify(body);
    try {
        startLoader(LOADER_ELEM_ID, "Loading...");
        const sendRqst = await fetch((0, _config.ENDPOINT) + apimethod, request);
        cancelLoader(LOADER_ELEM_ID);
        const respToJson = await sendRqst.json();
        if (respToJson && !respToJson.error) return respToJson;
        else return respToJson?.error || "An error occurred";
    } catch (error) {
        cancelLoader(LOADER_ELEM_ID);
        return error;
    }
};
const looksLikeMail = (str)=>{
    const lastAtPos = str.lastIndexOf("@");
    const lastDotPos = str.lastIndexOf(".");
    return lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf("@@") == -1 && lastDotPos > 2 && str.length - lastDotPos > 2;
};
const activateGoHomeLink = ()=>{
    const goHomeLink = document.getElementById("goHome");
    if (window.location.host === "localhost:80" || window.location.origin === "http://localhost") goHomeLink.href = window.location.origin + "/index.html";
    else goHomeLink.href = window.location.origin;
};
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const MEDIA_CONSTRAINTS = {
    audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
        latency: 0,
        channelCount: 1
    }
};

},{"./config":"ecGaw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fxAYF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CURRENT_USER_ID", ()=>CURRENT_USER_ID);
parcelHelpers.export(exports, "NUM_TRACKS", ()=>NUM_TRACKS);
parcelHelpers.export(exports, "getComposition", ()=>getComposition);
parcelHelpers.export(exports, "doAfterCompositionFetched", ()=>doAfterCompositionFetched);
var _config = require("../../../common/js/config");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _indexedDB = require("../../../common/js/indexedDB");
var _utils = require("../../../common/js/utils");
var _composition = require("./composition");
var _settings = require("./settings");
var _setcontributors = require("./settings/setcontributors");
var _trackinfo = require("./trackinfo/trackinfo");
let CURRENT_USER_ID = null;
let NUM_TRACKS = 0;
function Track(id, title, muted, soloed, gain, stereoPan, customClass) {
    this.id = id;
    this.name = title;
    this.src = (0, _config.ENDPOINT) + "/trackfile/" + id;
    this.muted = muted;
    this.soloed = soloed;
    this.gain = gain;
    this.stereoPan = stereoPan;
    this.customClass = customClass;
}
const getComposition = (compositionId, callback, extraParams)=>{
    let errorIs = null;
    let tracksInfo = {};
    (0, _utils.cancelLoader)((0, _utils.LOADER_ELEM_ID));
    fetch((0, _config.ENDPOINT) + "/composition/" + compositionId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((r)=>{
        if (!r.ok) errorIs = r.statusText;
        return r.json();
    }).then((data)=>{
        if (data) tracksInfo = data;
    }).catch((error)=>{
        errorIs = error;
    }).then(()=>{
        if (errorIs) (0, _modaldialogDefault.default).dynamicModalDialog(errorIs, null, "", "Close", "Error", "bg-danger");
        callback(tracksInfo, extraParams);
    });
};
const doAfterCompositionFetched = (tracksInfo)=>{
    if (!(0, _indexedDB.DB)) (0, _indexedDB.openDB)(tracksInfo.viewer_id || "null").then((db)=>{
        continueAfterGetIndexDb(db, tracksInfo);
    });
    else continueAfterGetIndexDb((0, _indexedDB.DB), tracksInfo);
};
const continueAfterGetIndexDb = (db, tracksInfo)=>{
    let storedtracks = null;
    (0, _indexedDB.getTracksByCompId)(db, tracksInfo?.uuid).then((stored_tracks)=>{
        storedtracks = stored_tracks;
    }).catch((error)=>{
        console.log(error);
    }).finally(()=>{
        createArrayOfTracks(tracksInfo, storedtracks);
        drawCompositionDetailInfo(tracksInfo);
    });
};
const convertArrayStoredCompToObj = (stored_tracks)=>{
    const object = {};
    stored_tracks.forEach((item)=>{
        object[item.track_id] = item;
    });
    return object;
};
const createNewTrack = (element, tracksInfo, tracksAsObj)=>{
    const muted = tracksAsObj && tracksAsObj[element?.uuid] ? tracksAsObj[element.uuid].muted : false;
    const soloed = tracksAsObj && tracksAsObj[element?.uuid] ? tracksAsObj[element.uuid].soloed : false;
    const gain = tracksAsObj && tracksAsObj[element?.uuid] ? tracksAsObj[element.uuid].gain : 1;
    const stereoPan = tracksAsObj && tracksAsObj[element?.uuid] ? tracksAsObj[element.uuid].stereoPan : 0;
    const title = element.title;
    const customClass = {
        name: title,
        track_id: element.uuid,
        user_id: element.user_id,
        user_uid: element.user_uid,
        composition_id: tracksInfo.uuid,
        viewer_id: tracksInfo.viewer_id || "null"
    };
    return new Track(element.uuid, title, muted, soloed, gain, stereoPan, customClass);
};
const createArrayOfTracks = (tracksInfo, stored_tracks)=>{
    const inputElement = document.getElementById("fileInput");
    // TODO:issue-169 if Safari then ogg is not allowed in accept. Server should deliver m4a instead
    inputElement.accept = [
        ".mp3",
        ".wav",
        ".m4a",
        ".flac",
        ".aac"
    ];
    // if(!isSafari){
    //     inputElement.accept inputElement.accept = ['.mp3','.wav','.m4a','.flac','.aac','.ogg']
    // }
    const canUpload = tracksInfo.owner || 1 <= tracksInfo.role && tracksInfo.role <= 3 || false;
    const userRole = tracksInfo.role;
    CURRENT_USER_ID = tracksInfo.viewer_id;
    let tracksAsObj = null;
    if (stored_tracks?.length) tracksAsObj = convertArrayStoredCompToObj(stored_tracks);
    if (canUpload) {
        (0, _composition.playlist).controls.widgets.remove = false;
        (0, _composition.setUserPermission)(true);
        if (userRole === 1) (0, _settings.enableCompositionSettings)(tracksInfo);
    }
    if (tracksInfo.tracks) {
        const arrayLoad = [];
        if (tracksInfo.tracks.length) {
            NUM_TRACKS = tracksInfo.tracks.length;
            const downloadProgressElem = document.getElementById("download-progress-elems");
            downloadProgressElem.hidden = false;
            tracksInfo.tracks.forEach((element)=>{
                if (element) {
                    const newTrack = createNewTrack(element, tracksInfo, tracksAsObj);
                    arrayLoad.push(newTrack);
                }
            });
        }
        createTrackList(arrayLoad, canUpload, userRole);
    } else (0, _composition.playlist).initExporter();
};
const createTrackList = (arrayLoad, canUpload, userRole)=>{
    let errorIs = null;
    (0, _composition.playlist).load(arrayLoad).then(()=>{
        (0, _composition.playlist).initExporter();
    }).catch((error)=>{
        errorIs = error;
    }).then(()=>{
        if (errorIs) alert(errorIs);
        else if (canUpload) {
            (0, _trackinfo.trackInfoHandler)();
            (0, _composition.trackHandler).detectClickOutsideMenuOpt();
            (0, _composition.trackHandler).displayOptMenuForTracks(userRole);
        }
    });
};
const getUserNameLabel = (compInfo)=>{
    return `<span class="badge badge-light">OWNER:&nbsp;</span>
            <i class="fa fa-user"></i>&nbsp;
            <a href="${(0, _utils.uriUserPage) + compInfo.user_id}" class="card-url">${compInfo.username}&nbsp;</a>`;
};
const getRoleLabel = (compInfo)=>{
    return `${compInfo.role ? `<span class="badge badge-light">YOUR ROLE:&nbsp;</span>
        <span id="rolebadgetext" class="badge badge-success">
         ${(0, _setcontributors.ROLES)[compInfo.role]}
        </span>&nbsp;` : ""}`;
};
const getContributorsLabel = (compInfo)=>{
    return `${compInfo.contributors.length ? `<span class="badge badge-light">COLLABORATORS:&nbsp;</span>
        <span id="contributorsbadgetext" class="badge badge-dark">
        ${compInfo.contributors.length}</span>&nbsp;` : ""}`;
};
const getOpenStatusLabel = (compInfo)=>{
    return `${compInfo.opentocontrib ? `<span class="badge badge-light">STATUS:&nbsp;</span><span class="badge badge-info">OPEN TO CONTRIB</span>` : ""}`;
};
const getDescriptionUIelem = (compInfo)=>{
    const compositionDesc = compInfo.description || "";
    return `<p>
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseDescription" aria-expanded="false">
                Description
                </button>
            </p>
            <div class="collapse" id="collapseDescription">
                <div class="card card-body" id="comp-description">
                ${compositionDesc}
                </div>
            </div>`;
};
const getPrivacyLabel = (compInfo)=>{
    return `<span class="badge badge-light">PRIVACY:&nbsp;</span>
            <span id="privacybadgetext" class="badge 
            ${(0, _utils.PRIVACY_BADGE_STYLE)[compInfo.privacy]}">${(0, _utils.PRIVACY_BADGE_TEXT)[compInfo.privacy]}
            </span>&nbsp;`;
};
const getCollectionLabel = (compInfo)=>{
    return `${compInfo.collection_id ? `<span class="badge badge-light">COLLECTION:&nbsp;</span>
    <i class="fa fa-th-list"></i>&nbsp;
    <a href="${(0, _utils.uriCollectionPage) + compInfo.collection_id}" class="card-url">${compInfo.parent_collection}&nbsp;</a>` : ""}`;
};
const drawCompositionDetailInfo = (tracksInfo)=>{
    let contentHtml = '<h1 class="post-title">Test DAW</h1>';
    if (tracksInfo.title) {
        contentHtml = "<br>";
        contentHtml += getUserNameLabel(tracksInfo);
        contentHtml += getCollectionLabel(tracksInfo);
        contentHtml += "<br>";
        contentHtml += getRoleLabel(tracksInfo);
        contentHtml += getContributorsLabel(tracksInfo);
        contentHtml += getPrivacyLabel(tracksInfo);
        contentHtml += getOpenStatusLabel(tracksInfo);
        contentHtml += `<p><h2 id="comp-title" class="post-title">${tracksInfo.title}</h2></p>`;
        contentHtml += getDescriptionUIelem(tracksInfo);
    }
    document.getElementById("post-header").insertAdjacentHTML("afterbegin", contentHtml);
};

},{"../../../common/js/config":"ecGaw","../../../common/js/modaldialog":"geXkr","../../../common/js/indexedDB":"lKsJx","../../../common/js/utils":"g7t25","./composition":"9ZuIT","./settings":"cXveu","./settings/setcontributors":"17xKv","./trackinfo/trackinfo":"jRykX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lKsJx":[function(require,module,exports) {
/* SOURCE: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#structuring_the_database */ // Create an objectStore to hold information about track settings. We're
// going to use 'track_id' as our key path because it's guaranteed to be
// unique
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "DB", ()=>DB);
parcelHelpers.export(exports, "openDB", ()=>openDB);
parcelHelpers.export(exports, "updateTable", ()=>updateTable);
parcelHelpers.export(exports, "getTracksByCompId", ()=>getTracksByCompId);
let DB = null;
const openDB = (user_id)=>{
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open(user_id, 2);
        request.onerror = (event)=>{
            console.log(event);
            reject(new Error("Error opening database"));
        };
        request.onsuccess = (event)=>{
            const db = event.target.result;
            DB = db;
            resolve(db);
        };
        request.onupgradeneeded = (event)=>{
            const db = event.target.result;
            DB = db;
            const objectStore = db.createObjectStore("tracks", {
                keyPath: "track_id"
            });
            // Create an index to search tracks by composition        
            objectStore.createIndex("composition_id", "composition_id", {
                unique: false
            });
            objectStore.transaction.oncomplete = (event)=>{
                resolve(db);
            };
        };
    });
};
const updateTable = (db, info)=>{
    if (!db) return;
    return new Promise((resolve, reject)=>{
        const transaction = db.transaction([
            "tracks"
        ], "readwrite");
        transaction.oncomplete = (event)=>{
            resolve();
        };
        transaction.onerror = (event)=>{
            console.log("error", event);
            reject(new Error("Error updating database"));
        };
        const objectStore = transaction.objectStore("tracks");
        objectStore.put(info);
    });
};
const getTracksByCompId = (db, compId)=>{
    return new Promise((resolve, reject)=>{
        if (!db || !compId) reject(new Error("No DB or Comp ID"));
        let listTracks = [];
        const index = db.transaction("tracks").objectStore("tracks").index("composition_id");
        const singleKeyRange = IDBKeyRange.only(compId);
        index.openCursor(singleKeyRange).onsuccess = (event)=>{
            const cursor = event.target.result;
            if (cursor) {
                listTracks.push(cursor.value);
                cursor.continue();
            } else resolve(listTracks);
        };
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cXveu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "enableCompositionSettings", ()=>enableCompositionSettings);
parcelHelpers.export(exports, "updateSettings", ()=>updateSettings);
var _config = require("../../../common/js/config");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _utils = require("../../../common/js/utils");
var _setcollection = require("./settings/setcollection");
var _settitle = require("./settings/settitle");
var _setdescription = require("./settings/setdescription");
var _setopentocontrib = require("./settings/setopentocontrib");
var _setprivacy = require("./settings/setprivacy");
var _setcontributors = require("./settings/setcontributors");
const enableCompositionSettings = (tracksInfo)=>{
    (0, _setcontributors.setUIContributors)(tracksInfo.contributors);
    (0, _setcontributors.addContributorButtonHandler)(tracksInfo.uuid);
    (0, _settitle.setUITitle)(tracksInfo.title);
    (0, _setdescription.setUIDescription)(tracksInfo.description);
    (0, _setprivacy.setUIPrivacy)(tracksInfo.privacy);
    (0, _setopentocontrib.setOpenToContrib)(tracksInfo.opentocontrib);
    saveButtonHandler(tracksInfo.uuid);
    cancelButtonHandler(tracksInfo);
    createSettingsButton();
    (0, _setprivacy.privateRadioButtonHandler)();
    (0, _setcollection.openSettingsButtonHandler)(tracksInfo?.collection_id);
};
const createSettingsButton = ()=>{
    (0, _utils.cancelLoader)("settingsloader");
    const ulElem = document.getElementById("useroptions");
    const liElem = document.createElement("li");
    liElem.innerHTML = `<li class="nav-item">
    <a class="nav-link" href="#" id="openSettingsButton" data-toggle="modal" data-target="#settingsModal">Composition Info</a>
  </li>
   `;
    ulElem.appendChild(liElem);
};
const updateSettings = async (method, api, data)=>{
    let body = JSON.stringify(data);
    let response = null;
    const request = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: body
    };
    try {
        const sendRqst = await fetch((0, _config.ENDPOINT) + api, request);
        const respToJson = await sendRqst.json();
        if (respToJson) response = respToJson;
    } catch (error) {
        (0, _modaldialogDefault.default).dynamicModalDialog(error, null, "", "Close", "Error", "bg-danger");
    }
    return response;
};
const clickCancelButtonHandler = (compInfo)=>{
    (0, _settitle.setUITitle)((0, _settitle.getCurrentTitle)() || compInfo.title);
    (0, _setdescription.setUIDescription)((0, _setdescription.getCurrentDescription)() || compInfo.description);
    (0, _setprivacy.setUIPrivacy)((0, _setprivacy.getPrivacyLevel)() || compInfo.privacy);
    (0, _setopentocontrib.setOpenToContrib)((0, _setopentocontrib.getOpenToContrib)() || compInfo.opentocontrib);
    (0, _setcontributors.clearUIContributors)();
    (0, _setcontributors.setUIContributors)((0, _setcontributors.getCurrentContributors)().length ? (0, _setcontributors.getCurrentContributors)() : compInfo.contributors);
    (0, _setcontributors.clearAuxContribArrays)();
    document.getElementById("deleteComposition").checked = false;
};
const cancelButtonHandler = (compInfo)=>{
    const cancelSettingsButton = document.getElementById("cancelsettingsbutton");
    cancelSettingsButton?.addEventListener("click", ()=>{
        clickCancelButtonHandler(compInfo);
    });
};
const saveButtonHandler = async (compId)=>{
    const confirmSettingsButton = document.getElementById("updatecompositionbutton");
    confirmSettingsButton?.addEventListener("click", async (e)=>{
        (0, _utils.startLoader)("settingsloader", "Updating Settings...");
        const deleteComp = document.getElementById("deleteComposition").checked;
        if (deleteComp === true) {
            await deleteComposition(compId);
            (0, _utils.cancelLoader)("settingsloader");
        } else {
            await (0, _settitle.saveTitle)(compId);
            await (0, _setdescription.saveDescription)(compId);
            await (0, _setprivacy.savePrivacyLevel)(compId);
            await (0, _setopentocontrib.saveOpenToContrib)(compId);
            await (0, _setcontributors.saveNewContributors)();
            await (0, _setcontributors.saveRemoveContributors)(compId);
            await (0, _setcollection.saveParentCollection)(compId);
            (0, _setcontributors.updateContributorsAtCompPage)();
            $("#settingsModal").modal("hide");
            (0, _utils.cancelLoader)("settingsloader");
        }
    });
};
const deleteComposition = async (compId)=>{
    (0, _modaldialogDefault.default).dynamicModalDialog("Delete " + (0, _settitle.getCurrentTitle)() + "?", "btn-delete-composition", "OK", "Cancel", "Delete Composition", "bg-danger");
    document.getElementById("btn-delete-composition").onclick = async ()=>{
        const resultDeleteComp = await updateSettings("DELETE", "/deletecomposition/" + compId, null);
        if (resultDeleteComp.ok) window.location.href = window.location.origin;
        (0, _modaldialogDefault.default).closeDynamicModal();
    };
};

},{"../../../common/js/config":"ecGaw","../../../common/js/modaldialog":"geXkr","../../../common/js/utils":"g7t25","./settings/setcollection":"aQSan","./settings/settitle":"86owQ","./settings/setdescription":"6ohp5","./settings/setopentocontrib":"b5FnP","./settings/setprivacy":"a6MFY","./settings/setcontributors":"17xKv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aQSan":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "openSettingsButtonHandler", ()=>openSettingsButtonHandler);
parcelHelpers.export(exports, "saveParentCollection", ()=>saveParentCollection);
var _settings = require("../settings");
var _collectionshandlerJs = require("../../../../common/js/collectionshandler.js");
let CURRENT_PARENT_COLLECTION = null;
const clickSettingsButtonHandler = (collection_id)=>{
    (0, _collectionshandlerJs.getCollections)().then((result)=>{
        if (result) getCompCollSuccess(result, collection_id);
        else (0, _collectionshandlerJs.getCollectionsError)();
    });
};
const openSettingsButtonHandler = (collection_id)=>{
    const openSettingsButton = document.getElementById("openSettingsButton");
    openSettingsButton?.addEventListener("click", ()=>{
        clickSettingsButtonHandler(collection_id);
    }, false);
};
const getCompCollSuccess = (list, selected_coll)=>{
    document.getElementById("listCollContainerNewColl").replaceChildren();
    (0, _collectionshandlerJs.createListCollections)(list, "listCollContainerNewColl", CURRENT_PARENT_COLLECTION || selected_coll);
    if (list?.all_collections.length) {
        if (selected_coll) CURRENT_PARENT_COLLECTION = selected_coll;
    }
};
const saveParentCollection = async (compId)=>{
    const newParentColl = document.getElementById("inputGroupSelectCollect").value;
    if (CURRENT_PARENT_COLLECTION || newParentColl !== "0") {
        if (newParentColl !== CURRENT_PARENT_COLLECTION) await updateParentCollection(compId, newParentColl);
    }
};
const updateParentCollection = async (compId, newParentColl)=>{
    const data = {
        uuid: compId,
        collection_id: newParentColl === "0" ? null : newParentColl
    };
    const resultNewParent = await (0, _settings.updateSettings)("PATCH", "/updatecompcollection", data);
    if (resultNewParent?.ok) CURRENT_PARENT_COLLECTION = newParentColl;
};

},{"../settings":"cXveu","../../../../common/js/collectionshandler.js":"4pBT6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4pBT6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getCollections", ()=>getCollections);
parcelHelpers.export(exports, "getCollectionsError", ()=>getCollectionsError);
parcelHelpers.export(exports, "createListCollections", ()=>createListCollections);
var _config = require("./config");
var _modaldialog = require("./modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
const getCollections = async ()=>{
    const response = await fetch((0, _config.ENDPOINT) + "/mycollections");
    let result = null;
    if (response?.ok) {
        const respJson = await response.json();
        result = respJson;
    }
    return result;
};
const getCollectionsError = ()=>{
    (0, _modaldialogDefault.default).dynamicModalDialog("Problem getting collections", null, "", "Close", "Error", "bg-danger");
};
const createListCollections = (collections, listId, coll_id)=>{
    const theList = collections.all_collections;
    const listCollContainer = document.getElementById(listId);
    let listOptions = `<option value='0'>...</option>`;
    let selected = null;
    theList.forEach((element)=>{
        if (element) {
            if (element.uuid === coll_id) selected = "selected>";
            else selected = null;
            const template = `<option value='${element.uuid}' ${selected ? selected : ">"}${element.title}</option>`;
            listOptions += template;
        }
    });
    const listElelemts = `<select class='custom-select' id='inputGroupSelectCollect'>${listOptions}</select>`;
    listCollContainer.insertAdjacentHTML("afterbegin", listElelemts);
};

},{"./config":"ecGaw","./modaldialog":"geXkr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"86owQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getCurrentTitle", ()=>getCurrentTitle);
parcelHelpers.export(exports, "setUITitle", ()=>setUITitle);
parcelHelpers.export(exports, "saveTitle", ()=>saveTitle);
var _settings = require("../settings");
let CURRENT_TITLE = null;
const getCurrentTitle = ()=>{
    return CURRENT_TITLE;
};
const setUITitle = (title)=>{
    CURRENT_TITLE = title;
    const textfield = document.getElementById("newtitle");
    textfield.value = title;
};
const saveTitle = async (compId)=>{
    const newtitle = document.getElementById("newtitle").value;
    if (newtitle !== CURRENT_TITLE) await updateTitle(compId, newtitle);
};
const updateTitle = async (compId, newtitle)=>{
    const data = {
        uuid: compId,
        title: newtitle
    };
    const resultNewTitle = await (0, _settings.updateSettings)("PATCH", "/updatecomptitle", data);
    if (resultNewTitle.ok) {
        CURRENT_TITLE = newtitle;
        document.getElementById("comp-title").innerHTML = newtitle;
    }
};

},{"../settings":"cXveu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6ohp5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getCurrentDescription", ()=>getCurrentDescription);
parcelHelpers.export(exports, "setUIDescription", ()=>setUIDescription);
parcelHelpers.export(exports, "saveDescription", ()=>saveDescription);
var _settings = require("../settings");
let CURRENT_DESCRIPTION = null;
const getCurrentDescription = ()=>{
    return CURRENT_DESCRIPTION;
};
const setUIDescription = (description)=>{
    CURRENT_DESCRIPTION = description;
    const textfield = document.getElementById("newdescription");
    textfield.value = description;
};
const saveDescription = async (compId)=>{
    const newdescription = document.getElementById("newdescription").value;
    if (newdescription !== CURRENT_DESCRIPTION) await updateDescription(compId, newdescription);
};
const updateDescription = async (compId, newdescription)=>{
    const data = {
        uuid: compId,
        description: newdescription
    };
    const resultNewDescription = await (0, _settings.updateSettings)("PATCH", "/updatecompdescription", data);
    if (resultNewDescription.ok) {
        CURRENT_DESCRIPTION = newdescription;
        document.getElementById("comp-description").innerHTML = newdescription;
    }
};

},{"../settings":"cXveu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b5FnP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getOpenToContrib", ()=>getOpenToContrib);
parcelHelpers.export(exports, "setOpenToContrib", ()=>setOpenToContrib);
parcelHelpers.export(exports, "saveOpenToContrib", ()=>saveOpenToContrib);
parcelHelpers.export(exports, "changeOpenToContrib", ()=>changeOpenToContrib);
var _settings = require("../settings");
let CURRENT_OPENTOCONTRIB = null;
const getOpenToContrib = ()=>{
    return CURRENT_OPENTOCONTRIB;
};
const setOpenToContrib = (status)=>{
    CURRENT_OPENTOCONTRIB = status;
    const checkbox = document.getElementById("opentocontribution");
    checkbox.checked = status;
};
const saveOpenToContrib = async (compId)=>{
    const newOpenToContrib = document.getElementById("opentocontribution").checked;
    if (newOpenToContrib !== CURRENT_OPENTOCONTRIB) await updateOpenToContrib(compId, newOpenToContrib);
};
const changeOpenToContrib = (newstate)=>{
    const opentocontribcheckbox = document.getElementById("opentocontribution");
    if (newstate === 0) {
        opentocontribcheckbox.checked = false;
        opentocontribcheckbox.disabled = true;
    } else opentocontribcheckbox.disabled = false;
};
const updateOpenToContrib = async (compId, newstatus)=>{
    const data = {
        uuid: compId,
        opentocontrib: newstatus
    };
    const resultNewOpenToContrib = await (0, _settings.updateSettings)("PATCH", "/updatecomptocontrib", data);
    if (resultNewOpenToContrib.ok) {
        CURRENT_OPENTOCONTRIB = newstatus;
        if (newstatus) {
            const privacybadgetext = document.getElementById("privacybadgetext");
            const badgeHtml = '&nbsp;<span class="badge badge-light">STATUS:&nbsp;</span><span class="badge badge-info">OPEN TO CONTRIB</span>';
            privacybadgetext.insertAdjacentHTML("afterend", badgeHtml);
        } else if (document.querySelector(".badge-info")) {
            const openToContribBadgeText = document.getElementById("privacybadgetext").nextSibling.nextSibling;
            const openToContribBadgeStatus = openToContribBadgeText.nextSibling;
            openToContribBadgeText.remove();
            openToContribBadgeStatus.remove();
        }
    }
};

},{"../settings":"cXveu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a6MFY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getPrivacyLevel", ()=>getPrivacyLevel);
parcelHelpers.export(exports, "privateRadioButtonHandler", ()=>privateRadioButtonHandler);
parcelHelpers.export(exports, "setUIPrivacy", ()=>setUIPrivacy);
parcelHelpers.export(exports, "savePrivacyLevel", ()=>savePrivacyLevel);
var _settings = require("../settings");
var _setopentocontrib = require("./setopentocontrib");
var _utils = require("../../../../common/js/utils");
let CURRENT_PRIVACY = null;
const getPrivacyLevel = ()=>{
    return CURRENT_PRIVACY;
};
const privateRadioButtonHandler = ()=>{
    const radioButtons = document.getElementsByName("settingsPrivacyRadios");
    for (let radiobutton of radioButtons)radiobutton.addEventListener("change", function() {
        if (this.checked) {
            if (parseInt(this.value) === 3) (0, _setopentocontrib.changeOpenToContrib)(0);
            else (0, _setopentocontrib.changeOpenToContrib)(1);
        }
    });
};
const setUIPrivacy = (privacyLevel)=>{
    CURRENT_PRIVACY = privacyLevel;
    const radiobtn = document.getElementById("settingsPrivacyRadios" + privacyLevel);
    radiobtn.checked = true;
    if (privacyLevel === (0, _utils.LevelPrivacy).private) (0, _setopentocontrib.changeOpenToContrib)(0);
};
const savePrivacyLevel = async (compId)=>{
    const newPrivacyLevel = document.querySelector('input[name="settingsPrivacyRadios"]:checked').value;
    const privacy = parseInt(newPrivacyLevel);
    if (privacy !== CURRENT_PRIVACY) await updateCompPrivacy(compId, privacy);
};
const updateCompPrivacy = async (compId, privacy)=>{
    const data = {
        uuid: compId,
        privacy: privacy
    };
    const resultNewPrivacy = await (0, _settings.updateSettings)("PATCH", "/updatecompprivacy", data);
    if (resultNewPrivacy.ok) {
        CURRENT_PRIVACY = privacy;
        const rolebadgetext = document.getElementById("privacybadgetext");
        rolebadgetext.className = "badge " + (0, _utils.PRIVACY_BADGE_STYLE)[privacy];
        rolebadgetext.innerText = (0, _utils.PRIVACY_BADGE_TEXT)[privacy];
    }
};

},{"../settings":"cXveu","./setopentocontrib":"b5FnP","../../../../common/js/utils":"g7t25","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"17xKv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ROLES", ()=>ROLES);
parcelHelpers.export(exports, "getCurrentContributors", ()=>getCurrentContributors);
parcelHelpers.export(exports, "clearUIContributors", ()=>clearUIContributors);
parcelHelpers.export(exports, "clearAuxContribArrays", ()=>clearAuxContribArrays);
parcelHelpers.export(exports, "setUIContributors", ()=>setUIContributors);
parcelHelpers.export(exports, "addContributorButtonHandler", ()=>addContributorButtonHandler);
parcelHelpers.export(exports, "saveNewContributors", ()=>saveNewContributors);
parcelHelpers.export(exports, "saveRemoveContributors", ()=>saveRemoveContributors);
parcelHelpers.export(exports, "updateContributorsAtCompPage", ()=>updateContributorsAtCompPage);
var _config = require("../../../../common/js/config");
var _modaldialog = require("../../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _utils = require("../../../../common/js/utils");
var _settings = require("../settings");
let CURRENT_CONTRIBUTORS = [];
let NEW_CONTRIBUTORS = [];
let TOREMOVE_CONTRIBUTORS = [];
const ROLES = {
    1: "Owner",
    2: "Admin",
    3: "Member",
    4: "Guest"
};
const getCurrentContributors = ()=>{
    return CURRENT_CONTRIBUTORS;
};
const clearUIContributors = ()=>{
    document.getElementById("contributorinput").value = "";
    const ul = document.getElementById("listOfContributors");
    ul.innerHTML = "";
};
const clearAuxContribArrays = ()=>{
    NEW_CONTRIBUTORS = [];
    TOREMOVE_CONTRIBUTORS = [];
};
const setUIContributors = (contributors)=>{
    const ul = document.getElementById("listOfContributors");
    if (contributors.length) {
        CURRENT_CONTRIBUTORS = contributors;
        contributors.flatMap((elem)=>addContributorToUI(ul, elem));
    } else {
        document.getElementById("contributorinput").value = "";
        ul.innerHTML = "";
    }
};
const addContributorButtonHandler = (compositionId)=>{
    const button = document.getElementById("addContribButton");
    const input = document.getElementById("contributorinput");
    const ul = document.getElementById("listOfContributors");
    button.addEventListener("click", function() {
        const roleInput = document.getElementById("inputGroupSelectRole");
        const role = roleInput.value;
        document.getElementById("contributorinput").classList.remove("is-invalid");
        document.getElementById("validationemailresult").innerText = "";
        if (input.value && (0, _utils.looksLikeMail)(input.value)) addContributorToList(ul, input.value.trim(), compositionId, role);
        else {
            document.getElementById("contributorinput").classList.add("is-invalid");
            document.getElementById("validationemailresult").innerText = "Sorry, invalid email address format.";
        }
    });
};
const addContributorToUI = (ul, contrib)=>{
    const role = ROLES[contrib.role];
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = contrib.user_uid;
    li.textContent = contrib.email + " (" + role + ")";
    const deleteSwitch = `&nbsp;<div class='custom-control custom-switch custom-control-inline float-right'>
    <input type='checkbox' class='custom-control-input is-invalid' id='removeContSwitch${contrib.user_uid}'>
    <label class='custom-control-label is-invalid' for='removeContSwitch${contrib.user_uid}'>Remove</label>
  </div>`;
    li.innerHTML += deleteSwitch;
    ul.appendChild(li);
    removeContributorSwitchHandler(contrib);
};
const addContributorToList = async (ul, contrib, compositionId, role)=>{
    const roleInput = document.getElementById("inputGroupSelectRole").value;
    if (parseInt(roleInput) !== 0) {
        const newcontrib = {
            email: contrib,
            user_uid: contrib,
            composition_id: compositionId,
            role: parseInt(role)
        };
        const indexContribDuplicateInCurrent = CURRENT_CONTRIBUTORS.findIndex((x)=>x.email === contrib);
        const indexContribDuplicateInNew = NEW_CONTRIBUTORS.findIndex((x)=>x.email === contrib);
        const indexToRemove = TOREMOVE_CONTRIBUTORS.indexOf(contrib);
        if (indexToRemove > -1) TOREMOVE_CONTRIBUTORS.splice(indexToRemove, 1);
        let canAdd = false;
        if (indexContribDuplicateInNew < 0 && indexContribDuplicateInCurrent < 0) canAdd = true;
        else canAdd = checkDuplicateBeforeAdding(newcontrib, indexContribDuplicateInNew, indexContribDuplicateInCurrent, ul);
        if (canAdd) {
            // #TODO: replace with API call to new endpoint to validate contributor
            const response = await fetch((0, _config.ENDPOINT) + "/checkuser/" + contrib);
            if (response?.ok || response?.status === 404) {
                if (response?.status === 200) {
                    const respJson = await response.json();
                    newcontrib.user_uid = respJson.user_uid;
                }
                NEW_CONTRIBUTORS.push(newcontrib);
                addContributorToUI(ul, newcontrib);
                if (response?.status === 404) displayModalDialog("An invitation via email will be sent to: " + contrib + ", after clicking on the button Confirm");
            } else displayModalDialog(`User can't be added`);
        } else displayModalDialog(`Duplicate user`);
    }
};
const displayModalDialog = (message)=>{
    (0, _modaldialogDefault.default).dynamicModalDialog(message, null, "", "Close", "Warning!", "bg-warning");
};
const checkDuplicateBeforeAdding = (newcontrib, atIndexNew, atIndexCurrent, ul)=>{
    let canAdd = false;
    const uid = CURRENT_CONTRIBUTORS[atIndexCurrent]?.user_uid || NEW_CONTRIBUTORS[atIndexNew]?.user_uid;
    const contribListElem = document.getElementById(uid);
    if (contribListElem) {
        if (atIndexCurrent >= 0 && atIndexNew < 0) {
            if (CURRENT_CONTRIBUTORS[atIndexCurrent].role !== newcontrib.role) {
                canAdd = true;
                contribListElem.remove();
            }
        }
        if (atIndexNew >= 0 && atIndexCurrent < 0) {
            if (NEW_CONTRIBUTORS[atIndexNew].role !== newcontrib.role) {
                canAdd = true;
                NEW_CONTRIBUTORS.splice(atIndexNew, 1);
                contribListElem.remove();
            }
        }
        if (atIndexNew >= 0 && atIndexCurrent >= 0) {
            if (CURRENT_CONTRIBUTORS[atIndexCurrent].role === newcontrib.role) {
                NEW_CONTRIBUTORS.splice(atIndexNew, 1);
                contribListElem.remove();
                addContributorToUI(ul, newcontrib);
            }
            if (NEW_CONTRIBUTORS.length && NEW_CONTRIBUTORS[atIndexNew].role !== newcontrib.role) {
                canAdd = true;
                NEW_CONTRIBUTORS.splice(atIndexNew, 1);
                contribListElem.remove();
            }
        }
    }
    return canAdd;
};
const saveNewContributors = async ()=>{
    if (NEW_CONTRIBUTORS.length > 0) {
        let copy_new_contribs = [
            ...NEW_CONTRIBUTORS
        ];
        for(let i = 0; i < NEW_CONTRIBUTORS.length; i++){
            const newcontrib = NEW_CONTRIBUTORS[i];
            const resultAddContrib = await (0, _settings.updateSettings)("POST", "/addcontributorbyemail", newcontrib);
            if (resultAddContrib?.ok) {
                NEW_CONTRIBUTORS[i].id = resultAddContrib.contribid;
                if (newcontrib.email === newcontrib.user_uid) {
                    NEW_CONTRIBUTORS[i].user_uid = resultAddContrib.uuid;
                    document.getElementById(newcontrib.email).id = resultAddContrib.uuid;
                }
                copy_new_contribs[i] = null;
            }
        }
        const noEmptyNewValues = copy_new_contribs.filter((value)=>value != null);
        CURRENT_CONTRIBUTORS = CURRENT_CONTRIBUTORS.concat(NEW_CONTRIBUTORS);
        document.getElementById("contributorinput").value = "";
        NEW_CONTRIBUTORS = noEmptyNewValues;
    }
};
const saveRemoveContributors = async (compId)=>{
    if (TOREMOVE_CONTRIBUTORS.length > 0) {
        let copy_toremove_contribs = [
            ...TOREMOVE_CONTRIBUTORS
        ];
        for(let j = 0; j < TOREMOVE_CONTRIBUTORS.length; j++){
            const indexContribInCurrent = CURRENT_CONTRIBUTORS.findIndex((x)=>x.email === TOREMOVE_CONTRIBUTORS[j]);
            const contribToRemId = CURRENT_CONTRIBUTORS[indexContribInCurrent].user_uid;
            const contribToRem = {
                contrib_uuid: contribToRemId,
                comp_uuid: compId
            };
            const resultRemoveContrib = await (0, _settings.updateSettings)("DELETE", "/deletecontributor", contribToRem);
            if (resultRemoveContrib?.ok) {
                copy_toremove_contribs[j] = null;
                CURRENT_CONTRIBUTORS.splice(indexContribInCurrent, 1);
                document.getElementById(contribToRemId).remove();
            } else document.getElementById("removeContSwitch" + contribToRemId).checked = false;
        }
        const noEmptyValuesRm = copy_toremove_contribs.filter((value)=>value != null);
        TOREMOVE_CONTRIBUTORS = noEmptyValuesRm;
    }
};
const removeContributorSwitchHandler = (contrib)=>{
    document.getElementById("removeContSwitch" + contrib.user_uid).addEventListener("change", function(event) {
        const chk = event.target;
        if (chk.tagName === "INPUT" && chk.type === "checkbox") {
            if (chk.checked) {
                (0, _modaldialogDefault.default).dynamicModalDialog(`Do you want remove the contributor: ${contrib.email}?`, "btn-delete-contributor", "OK", "Cancel", "Delete Contributor", "bg-warning", ()=>{
                    chk.checked = false;
                });
                document.getElementById("btn-delete-contributor").onclick = async ()=>{
                    const indexContribInNew = NEW_CONTRIBUTORS.findIndex((x)=>x.email === contrib.email);
                    if (indexContribInNew > -1) {
                        NEW_CONTRIBUTORS.splice(indexContribInNew, 1);
                        const indexContribInCurrent = CURRENT_CONTRIBUTORS.findIndex((x)=>x.email === contrib.email);
                        if (indexContribInCurrent === -1) document.getElementById(contrib.user_uid).remove();
                        else TOREMOVE_CONTRIBUTORS.push(contrib.email);
                    } else TOREMOVE_CONTRIBUTORS.push(contrib.email);
                    (0, _modaldialogDefault.default).closeDynamicModal(()=>{
                        chk.checked = true;
                    });
                };
            }
        }
    });
};
const updateContributorsAtCompPage = ()=>{
    const contributorsbadgetext = document.getElementById("contributorsbadgetext");
    if (contributorsbadgetext || CURRENT_CONTRIBUTORS.length) {
        const rolebadgetext = document.getElementById("rolebadgetext");
        if (!contributorsbadgetext) {
            if (rolebadgetext) {
                const badgeHtml = `&nbsp;<span class="badge badge-light">COLLABORATORS:&nbsp;</span><span id="contributorsbadgetext" class="badge badge-dark">${CURRENT_CONTRIBUTORS.length}</span>`;
                rolebadgetext.insertAdjacentHTML("afterend", badgeHtml);
            }
        } else if (CURRENT_CONTRIBUTORS.length !== parseInt(contributorsbadgetext.innerText)) {
            if (CURRENT_CONTRIBUTORS.length) contributorsbadgetext.innerText = CURRENT_CONTRIBUTORS.length;
            else {
                const prevBadge = contributorsbadgetext.previousSibling;
                contributorsbadgetext.remove();
                prevBadge.remove();
                rolebadgetext.nextSibling.remove();
            }
        }
    }
};

},{"../../../../common/js/config":"ecGaw","../../../../common/js/modaldialog":"geXkr","../../../../common/js/utils":"g7t25","../settings":"cXveu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jRykX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "trackInfoHandler", ()=>trackInfoHandler);
parcelHelpers.export(exports, "createTrackInfoTable", ()=>createTrackInfoTable);
var _utils = require("../../../../common/js/utils");
var _modaldialog = require("../../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _composition = require("../composition");
let EDIT_STATUS = false;
let CURRENT_TRACKINFO = null;
let CURRENT_TRACKPOS = null;
let CURRENT_TRACKID = null;
let RESERVED_KEYS = null;
const editButton = document.getElementById("edittrackinfobutton");
const trackInfoHandler = ()=>{
    saveButtonHandler();
    cancelButtonHandler();
    createNewAnnotationBtnHandler();
    editButton.addEventListener("click", clickEditButtonHandler, false);
};
const createTrackInfoTable = async (trackpos, trackname, trackid)=>{
    EDIT_STATUS = false;
    CURRENT_TRACKPOS = trackpos;
    CURRENT_TRACKID = trackid;
    editButton.innerText = "Edit";
    (0, _utils.startLoader)("trackinfoloader", "Loading track info...");
    const data = await (0, _utils.callJsonApi)("/getinfotrack/" + trackid, "GET");
    if (typeof data === "object") {
        CURRENT_TRACKINFO = data;
        renderTable(data, null);
    } else {
        (0, _modaldialogDefault.default).dynamicModalDialog("Error getting track info", null, "", "Close", "Error", "bg-danger");
        renderTable(null, trackname);
    }
};
const createNewAnnotationBtnHandler = ()=>{
    const buttonCreateNew = document.getElementById("btn-add-new-annot");
    buttonCreateNew.onclick = ()=>{
        const uniqueId = Date.now();
        const tableContainer = document.getElementById("trackinfotablebody");
        const html = `<tr class="linebreak"><th id='key-edit-${uniqueId}' contenteditable='true' scope='row'></th>
        <td contenteditable='true' data-key=''></td>
        <td id='btn-rem-${uniqueId}' class='delete-row' data-key=''>&nbsp;<i class="fa fa-trash text-danger"></i></td>
        </tr>`;
        tableContainer.innerHTML += html;
        if (!EDIT_STATUS) editButton.click();
        const editKeyField = document.getElementById("key-edit-" + uniqueId);
        editKeyField.addEventListener("input", function() {
            const nextTD1 = editKeyField.parentNode.children[1];
            nextTD1.dataset.key = editKeyField.innerText;
            const nextTD2 = editKeyField.parentNode.children[2];
            nextTD2.dataset.key = editKeyField.innerText;
        });
        const btnRmRow = document.getElementById("btn-rem-" + uniqueId);
        btnRmRow.onclick = ()=>{
            deleteRow(btnRmRow);
        };
    };
};
const getTitleFromResp = (resp)=>{
    let html = "";
    if (resp["title"]) html += `<tr><th scope='row'>title</th><td contenteditable='false' data-key='title'>${resp["title"]}</td></tr>`;
    return html;
};
const checkKeys = (objArray, wordsArray)=>{
    const missingKeys = [];
    wordsArray.forEach((word)=>{
        if (!objArray.some((obj)=>obj.key === word)) missingKeys.push(word);
    });
    return missingKeys;
};
const createReservedKeysSection = (reservedkeys)=>{
    let html = "";
    for(const pos in reservedkeys)if (reservedkeys[pos] !== "title") html += `<tr><th scope='row'>${reservedkeys[pos]}</th><td contenteditable='false' data-key='${reservedkeys[pos]}'></td></tr>`;
    return html;
};
const getAnnotationsFromResp = (resp)=>{
    let html = "";
    if (resp["annotations"]) {
        const missingKeys = checkKeys(resp["annotations"], RESERVED_KEYS);
        html += createReservedKeysSection(missingKeys);
        html += createAnnotationsSection(resp["annotations"]);
    }
    return html;
};
const getReservedKeysFromResp = (resp)=>{
    if (resp["reserved_keys"]) return resp["reserved_keys"];
    else return null;
};
const renderTable = async (trackinfo, currenttrackname)=>{
    (0, _utils.cancelLoader)("trackinfoloader");
    const tableContainer = document.getElementById("trackinfotablebody");
    let html = "";
    if (trackinfo) {
        RESERVED_KEYS = getReservedKeysFromResp(trackinfo);
        html += getTitleFromResp(trackinfo);
        html += getAnnotationsFromResp(trackinfo);
    } else html += `<tr><th scope='row'>title</th><td data-key='title' class='linebreak'>${currenttrackname}</td></tr>`;
    tableContainer.innerHTML = html;
};
const createAnnotationsSection = (annnotations)=>{
    let html = "";
    for(const pos in annnotations){
        const annotation = annnotations[pos];
        html += `<tr class="linebreak"><th ${annotation.custom_added ? "contenteditable='false'" : ""} scope='row'>${annotation.key}</th>
        <td contenteditable='false' data-key='${annotation.key}' data-uuid='${annotation.uuid}'>${annotation.value}</td>
        <td class='delete-row' data-key='${annotation.key}' data-uuid='${annotation.uuid}' hidden>${annotation.custom_added ? `&nbsp;<i class="fa fa-trash text-danger"></i>` : ""}</td>
        </tr>`;
    }
    return html;
};
const deleteRow = (row)=>{
    (0, _modaldialogDefault.default).dynamicModalDialog("Delete: <b>" + row.dataset.key + "</b>" + " ?", "btn-delete-row", "Delete", "Cancel", "Warning", "bg-warning");
    document.getElementById("btn-delete-row").onclick = ()=>{
        doRowDeletion(row);
    };
};
const doRowDeletion = async (row)=>{
    const uuid = row.dataset.uuid;
    if (uuid) {
        const data = await (0, _utils.callJsonApi)("/deleteannotation/" + uuid, "DELETE");
        if (typeof data === "object") row.parentNode.remove();
    } else row.parentNode.remove();
    (0, _modaldialogDefault.default).closeDynamicModal();
};
const clickCancelButtonHandler = ()=>{
    const tableContainer = document.getElementById("trackinfotablebody");
    tableContainer.innerHTML = "";
};
const cancelButtonHandler = ()=>{
    const cancelTrackInfoButton = document.getElementById("canceltrackinfobutton");
    cancelTrackInfoButton?.addEventListener("click", ()=>{
        clickCancelButtonHandler();
    });
};
const checkIfCellWasEdited = (cell)=>{
    const uuid = cell.getAttribute("data-uuid");
    const newkey = cell.getAttribute("data-key");
    const newvalue = cell.innerText;
    const current_annot = CURRENT_TRACKINFO.annotations.find((annotation)=>annotation.uuid === uuid);
    const editedObj = {};
    if (uuid && !RESERVED_KEYS.includes(current_annot.key) && !RESERVED_KEYS.includes(newkey)) {
        if (current_annot.key !== newkey) editedObj.key = newkey;
    }
    if (current_annot.value !== newvalue) editedObj.value = newvalue;
    if (Object.keys(editedObj).length > 0) editedObj.uuid = uuid;
    return editedObj;
};
const getEditedFields = ()=>{
    const editedObject = {};
    editedObject.annotations = [];
    document.querySelectorAll("td[contenteditable]").forEach((cell)=>{
        if (cell.getAttribute("data-uuid")) {
            const editedObj = checkIfCellWasEdited(cell);
            if (Object.keys(editedObj).length > 0) editedObject.annotations.push(editedObj);
        } else {
            const keyId = cell.getAttribute("data-key");
            if (keyId === "title") {
                if (CURRENT_TRACKINFO[keyId] !== cell.innerText) editedObject[keyId] = cell.innerText;
            } else if (cell.innerText !== "" || keyId !== "" && !RESERVED_KEYS.includes(keyId)) {
                if (!editedObject.annotations) editedObject.annotations = [];
                editedObject.annotations.push({
                    key: keyId,
                    value: cell.innerText
                });
            }
        }
    });
    return editedObject;
};
const saveButtonHandler = async ()=>{
    const confirmTrackInfoButton = document.getElementById("updatetrackinfobutton");
    confirmTrackInfoButton?.addEventListener("click", async (e)=>{
        const editedObject = getEditedFields();
        if (editedObject.title || editedObject.annotations.length > 0) {
            (0, _utils.startLoader)("trackinfoloader", "Updating track info...");
            const bodyrqst = {
                trackid: CURRENT_TRACKID
            };
            const data = await (0, _utils.callJsonApi)("/updatetrackinfo", "PATCH", {
                ...editedObject,
                ...bodyrqst
            });
            handleUpdatetrackInfo(data, editedObject);
            (0, _utils.cancelLoader)("trackinfoloader");
        }
        $("#trackInfoModal").modal("hide");
    });
};
const handleUpdatetrackInfo = (data, objEdited)=>{
    if (typeof data === "object" && data.ok) {
        if (objEdited?.title) {
            (0, _composition.playlist).tracks[CURRENT_TRACKPOS].name = objEdited.title;
            const menuBtnItem = document.querySelectorAll(`[data-track-id='${CURRENT_TRACKID}']`);
            if (menuBtnItem.length === 1) menuBtnItem[0].dataset.name = objEdited.title;
            const ee = (0, _composition.playlist).getEventEmitter();
            ee.emit("updateview");
        }
    } else if (data?.errors || typeof data === "string") {
        let messages = "";
        if (data.errors) data.errors.forEach((str)=>{
            messages += str + ". ";
        });
        else messages = data;
        (0, _modaldialogDefault.default).dynamicModalDialog("Error updating track info: " + messages, null, "", "Close", "Error", "bg-danger");
    } else (0, _modaldialogDefault.default).dynamicModalDialog("Unexpected error happened when updating track info", null, "", "Close", "Error", "bg-danger");
};
const clickEditButtonHandler = ()=>{
    if (EDIT_STATUS) {
        EDIT_STATUS = false;
        editButton.innerText = "Edit";
        disableEdition();
    } else {
        EDIT_STATUS = true;
        editButton.innerText = "Done";
        enableEdition();
    }
};
const enableEdition = ()=>{
    document.querySelectorAll(`*[contenteditable='false']`).forEach((cell)=>{
        cell.contentEditable = true;
        cell.classList.add("italic");
        if (cell.tagName === "TH") {
            cell.addEventListener("input", function() {
                const nextTD = cell.parentNode.children[1];
                nextTD.dataset.key = cell.innerText;
            });
            const nextTD = cell.parentNode.lastElementChild;
            if (nextTD.classList.contains("delete-row")) {
                nextTD.hidden = false;
                nextTD.onclick = ()=>{
                    deleteRow(nextTD);
                };
            }
        }
    });
};
const disableEdition = ()=>{
    document.querySelectorAll(`*[contenteditable='true']`).forEach((cell)=>{
        cell.contentEditable = false;
        cell.classList.remove("italic");
        if (cell.tagName === "TH") {
            const nextTD = cell.parentNode.lastElementChild;
            if (nextTD.classList.contains("delete-row")) nextTD.hidden = true;
        }
    });
};

},{"../../../../common/js/utils":"g7t25","../../../../common/js/modaldialog":"geXkr","../composition":"9ZuIT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ggBmz":[function(require,module,exports) {
/* https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript : Dealing with binary data */ /* https://stackoverflow.com/a/38968948 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FileUploader", ()=>FileUploader);
var _config = require("../../../common/js/config");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _composition = require("./composition");
class FileUploader {
    constructor(compositionId, trackhandler){
        this.compositionId = compositionId;
        this.trackhandler = trackhandler;
    }
    sendData(file, type, trackuid) {
        const me = this;
        // if (!type && !file.binary && file.dom.files.length > 0) {
        //     console.log('sendData ... hello ??')
        //     setTimeout(this.sendData, 10)
        //     return
        // }
        const XHR = new XMLHttpRequest();
        const formData = new FormData();
        const dataFormFileName = type ? file.fileName : file.name;
        formData.append("composition_id", this.compositionId);
        formData.append("audio", file, dataFormFileName);
        const uploadBarHtml = `<div id='${"progress-elem-" + trackuid}'>${dataFormFileName}<br><progress id='upload-progress-bar-${trackuid}'></progress>&nbsp;<span id='upload-percentage-${trackuid}'></span><br/></div>`;
        const progressBarContainer = document.getElementById("upload-progress-bar-container");
        progressBarContainer.innerHTML += uploadBarHtml;
        XHR.addEventListener("load", (event)=>{
            if (event.target && event.target.response) {
                const respJson = JSON.parse(event.target.response);
                if (respJson.ok) {
                    // fileInput is not declared here but refers to the input file for audio
                    fileInput.value = "";
                    respJson.trackuid = trackuid;
                    (0, _composition.trackHandler).displayOptMenuForNewTrack(respJson);
                } else me.displayModalDialog(respJson.error);
            } else me.displayModalDialog("Oops! Something went wrong.");
        });
        XHR.addEventListener("error", (event)=>{
            me.displayModalDialog("Problem sending file");
        });
        XHR.upload.addEventListener("progress", (event)=>{
            const progressElem = document.getElementById("progress-elem-" + trackuid);
            const uploadProgressBar = document.getElementById("upload-progress-bar-" + trackuid);
            const uploadPercentage = document.getElementById("upload-percentage-" + trackuid);
            if (event.lengthComputable) {
                uploadProgressBar.value = event.loaded / event.total;
                uploadPercentage.innerText = (event.loaded / event.total * 100).toFixed(2) + "%";
                if (uploadProgressBar.value === 1) progressElem.remove();
            }
        });
        XHR.open("POST", (0, _config.UPLOAD_ENDPOINT));
        XHR.send(formData);
    }
    displayModalDialog(message) {
        (0, _modaldialogDefault.default).dynamicModalDialog(message, null, "", "Close", "Error", "bg-danger");
    }
}

},{"../../../common/js/config":"ecGaw","../../../common/js/modaldialog":"geXkr","./composition":"9ZuIT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cX3Qw":[function(require,module,exports) {
(function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
})(this, function() {
    return /******/ (()=>{
        /******/ var __webpack_modules__ = {
            /***/ 6824: /***/ (module1)=>{
                /*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */ /**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */ module1.exports = function split(undef) {
                    var nativeSplit = String.prototype.split, compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
                    self1;
                    self1 = function(str, separator, limit) {
                        // If `separator` is not a regex, use `nativeSplit`
                        if (Object.prototype.toString.call(separator) !== "[object RegExp]") return nativeSplit.call(str, separator, limit);
                        var output = [], flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
                        (separator.sticky ? "y" : ""), // Firefox 3+
                        lastLastIndex = 0, // Make `global` and avoid `lastIndex` issues by working with a copy
                        separator = new RegExp(separator.source, flags + "g"), separator2, match, lastIndex, lastLength;
                        str += ""; // Type-convert
                        if (!compliantExecNpcg) // Doesn't need flags gy, but they don't hurt
                        separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
                        /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */ limit = limit === undef ? 4294967295 : limit >>> 0; // ToUint32(limit)
                        while(match = separator.exec(str)){
                            // `separator.lastIndex` is not reliable cross-browser
                            lastIndex = match.index + match[0].length;
                            if (lastIndex > lastLastIndex) {
                                output.push(str.slice(lastLastIndex, match.index));
                                // Fix browsers whose `exec` methods don't consistently return `undefined` for
                                // nonparticipating capturing groups
                                if (!compliantExecNpcg && match.length > 1) match[0].replace(separator2, function() {
                                    for(var i = 1; i < arguments.length - 2; i++)if (arguments[i] === undef) match[i] = undef;
                                });
                                if (match.length > 1 && match.index < str.length) Array.prototype.push.apply(output, match.slice(1));
                                lastLength = match[0].length;
                                lastLastIndex = lastIndex;
                                if (output.length >= limit) break;
                            }
                            if (separator.lastIndex === match.index) separator.lastIndex++; // Avoid an infinite loop
                        }
                        if (lastLastIndex === str.length) {
                            if (lastLength || !separator.test("")) output.push("");
                        } else output.push(str.slice(lastLastIndex));
                        return output.length > limit ? output.slice(0, limit) : output;
                    };
                    return self1;
                }();
            /***/ },
            /***/ 1804: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isValue = __webpack_require__(5618), isPlainFunction = __webpack_require__(7205), assign = __webpack_require__(7191), normalizeOpts = __webpack_require__(5516), contains = __webpack_require__(9981);
                var d = module1.exports = function(dscr, value /*, options*/ ) {
                    var c, e, w, options, desc;
                    if (arguments.length < 2 || typeof dscr !== "string") {
                        options = value;
                        value = dscr;
                        dscr = null;
                    } else options = arguments[2];
                    if (isValue(dscr)) {
                        c = contains.call(dscr, "c");
                        e = contains.call(dscr, "e");
                        w = contains.call(dscr, "w");
                    } else {
                        c = w = true;
                        e = false;
                    }
                    desc = {
                        value: value,
                        configurable: c,
                        enumerable: e,
                        writable: w
                    };
                    return !options ? desc : assign(normalizeOpts(options), desc);
                };
                d.gs = function(dscr, get, set /*, options*/ ) {
                    var c, e, options, desc;
                    if (typeof dscr !== "string") {
                        options = set;
                        set = get;
                        get = dscr;
                        dscr = null;
                    } else options = arguments[3];
                    if (!isValue(get)) get = undefined;
                    else if (!isPlainFunction(get)) {
                        options = get;
                        get = set = undefined;
                    } else if (!isValue(set)) set = undefined;
                    else if (!isPlainFunction(set)) {
                        options = set;
                        set = undefined;
                    }
                    if (isValue(dscr)) {
                        c = contains.call(dscr, "c");
                        e = contains.call(dscr, "e");
                    } else {
                        c = true;
                        e = false;
                    }
                    desc = {
                        get: get,
                        set: set,
                        configurable: c,
                        enumerable: e
                    };
                    return !options ? desc : assign(normalizeOpts(options), desc);
                };
            /***/ },
            /***/ 430: /***/ (module1)=>{
                "use strict";
                // eslint-disable-next-line no-empty-function
                module1.exports = function() {};
            /***/ },
            /***/ 7191: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                module1.exports = __webpack_require__(6560)() ? Object.assign : __webpack_require__(7346);
            /***/ },
            /***/ 6560: /***/ (module1)=>{
                "use strict";
                module1.exports = function() {
                    var assign = Object.assign, obj;
                    if (typeof assign !== "function") return false;
                    obj = {
                        foo: "raz"
                    };
                    assign(obj, {
                        bar: "dwa"
                    }, {
                        trzy: "trzy"
                    });
                    return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
                };
            /***/ },
            /***/ 7346: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var keys = __webpack_require__(5103), value = __webpack_require__(2745), max = Math.max;
                module1.exports = function(dest, src /*, …srcn*/ ) {
                    var error, i, length = max(arguments.length, 2), assign;
                    dest = Object(value(dest));
                    assign = function(key) {
                        try {
                            dest[key] = src[key];
                        } catch (e) {
                            if (!error) error = e;
                        }
                    };
                    for(i = 1; i < length; ++i){
                        src = arguments[i];
                        keys(src).forEach(assign);
                    }
                    if (error !== undefined) throw error;
                    return dest;
                };
            /***/ },
            /***/ 6914: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var _undefined = __webpack_require__(430)(); // Support ES3 engines
                module1.exports = function(val) {
                    return val !== _undefined && val !== null;
                };
            /***/ },
            /***/ 5103: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                module1.exports = __webpack_require__(7446)() ? Object.keys : __webpack_require__(6137);
            /***/ },
            /***/ 7446: /***/ (module1)=>{
                "use strict";
                module1.exports = function() {
                    try {
                        Object.keys("primitive");
                        return true;
                    } catch (e) {
                        return false;
                    }
                };
            /***/ },
            /***/ 6137: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isValue = __webpack_require__(6914);
                var keys = Object.keys;
                module1.exports = function(object) {
                    return keys(isValue(object) ? Object(object) : object);
                };
            /***/ },
            /***/ 5516: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isValue = __webpack_require__(6914);
                var forEach = Array.prototype.forEach, create = Object.create;
                var process = function(src, obj) {
                    var key;
                    for(key in src)obj[key] = src[key];
                };
                // eslint-disable-next-line no-unused-vars
                module1.exports = function(opts1 /*, …options*/ ) {
                    var result = create(null);
                    forEach.call(arguments, function(options) {
                        if (!isValue(options)) return;
                        process(Object(options), result);
                    });
                    return result;
                };
            /***/ },
            /***/ 1290: /***/ (module1)=>{
                "use strict";
                module1.exports = function(fn) {
                    if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
                    return fn;
                };
            /***/ },
            /***/ 2745: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isValue = __webpack_require__(6914);
                module1.exports = function(value) {
                    if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
                    return value;
                };
            /***/ },
            /***/ 9981: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                module1.exports = __webpack_require__(3591)() ? String.prototype.contains : __webpack_require__(6042);
            /***/ },
            /***/ 3591: /***/ (module1)=>{
                "use strict";
                var str = "razdwatrzy";
                module1.exports = function() {
                    if (typeof str.contains !== "function") return false;
                    return str.contains("dwa") === true && str.contains("foo") === false;
                };
            /***/ },
            /***/ 6042: /***/ (module1)=>{
                "use strict";
                var indexOf = String.prototype.indexOf;
                module1.exports = function(searchString /*, position*/ ) {
                    return indexOf.call(this, searchString, arguments[1]) > -1;
                };
            /***/ },
            /***/ 8832: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var OneVersionConstraint = __webpack_require__(4167);
                var MY_VERSION = "7";
                OneVersionConstraint("ev-store", MY_VERSION);
                var hashKey = "__EV_STORE_KEY@" + MY_VERSION;
                module1.exports = EvStore;
                function EvStore(elem) {
                    var hash = elem[hashKey];
                    if (!hash) hash = elem[hashKey] = {};
                    return hash;
                }
            /***/ },
            /***/ 8370: /***/ (module1, exports, __webpack_require__)=>{
                "use strict";
                var d = __webpack_require__(1804), callable = __webpack_require__(1290), apply = Function.prototype.apply, call = Function.prototype.call, create = Object.create, defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, hasOwnProperty1 = Object.prototype.hasOwnProperty, descriptor = {
                    configurable: true,
                    enumerable: false,
                    writable: true
                }, on, once, off, emit, methods, descriptors, base;
                on = function(type, listener) {
                    var data;
                    callable(listener);
                    if (!hasOwnProperty1.call(this, "__ee__")) {
                        data = descriptor.value = create(null);
                        defineProperty(this, "__ee__", descriptor);
                        descriptor.value = null;
                    } else data = this.__ee__;
                    if (!data[type]) data[type] = listener;
                    else if (typeof data[type] === "object") data[type].push(listener);
                    else data[type] = [
                        data[type],
                        listener
                    ];
                    return this;
                };
                once = function(type, listener) {
                    var once, self1;
                    callable(listener);
                    self1 = this;
                    on.call(this, type, once = function() {
                        off.call(self1, type, once);
                        apply.call(listener, this, arguments);
                    });
                    once.__eeOnceListener__ = listener;
                    return this;
                };
                off = function(type, listener) {
                    var data, listeners, candidate, i;
                    callable(listener);
                    if (!hasOwnProperty1.call(this, "__ee__")) return this;
                    data = this.__ee__;
                    if (!data[type]) return this;
                    listeners = data[type];
                    if (typeof listeners === "object") {
                        for(i = 0; candidate = listeners[i]; ++i)if (candidate === listener || candidate.__eeOnceListener__ === listener) {
                            if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
                            else listeners.splice(i, 1);
                        }
                    } else if (listeners === listener || listeners.__eeOnceListener__ === listener) delete data[type];
                    return this;
                };
                emit = function(type) {
                    var i, l, listener, listeners, args;
                    if (!hasOwnProperty1.call(this, "__ee__")) return;
                    listeners = this.__ee__[type];
                    if (!listeners) return;
                    if (typeof listeners === "object") {
                        l = arguments.length;
                        args = new Array(l - 1);
                        for(i = 1; i < l; ++i)args[i - 1] = arguments[i];
                        listeners = listeners.slice();
                        for(i = 0; listener = listeners[i]; ++i)apply.call(listener, this, args);
                    } else switch(arguments.length){
                        case 1:
                            call.call(listeners, this);
                            break;
                        case 2:
                            call.call(listeners, this, arguments[1]);
                            break;
                        case 3:
                            call.call(listeners, this, arguments[1], arguments[2]);
                            break;
                        default:
                            l = arguments.length;
                            args = new Array(l - 1);
                            for(i = 1; i < l; ++i)args[i - 1] = arguments[i];
                            apply.call(listeners, this, args);
                    }
                };
                methods = {
                    on: on,
                    once: once,
                    off: off,
                    emit: emit
                };
                descriptors = {
                    on: d(on),
                    once: d(once),
                    off: d(off),
                    emit: d(emit)
                };
                base = defineProperties({}, descriptors);
                module1.exports = exports = function(o) {
                    return o == null ? create(base) : defineProperties(Object(o), descriptors);
                };
                exports.methods = methods;
            /***/ },
            /***/ 6226: /***/ (__unused_webpack_module, exports)=>{
                "use strict";
                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.linear = linear;
                exports.exponential = exponential;
                exports.sCurve = sCurve;
                exports.logarithmic = logarithmic;
                function linear(length, rotation) {
                    var curve = new Float32Array(length), i, x, scale = length - 1;
                    for(i = 0; i < length; i++){
                        x = i / scale;
                        if (rotation > 0) curve[i] = x;
                        else curve[i] = 1 - x;
                    }
                    return curve;
                }
                function exponential(length, rotation) {
                    var curve = new Float32Array(length), i, x, scale = length - 1, index;
                    for(i = 0; i < length; i++){
                        x = i / scale;
                        index = rotation > 0 ? i : length - 1 - i;
                        curve[index] = Math.exp(2 * x - 1) / Math.exp(1);
                    }
                    return curve;
                }
                //creating a curve to simulate an S-curve with setValueCurveAtTime.
                function sCurve(length, rotation) {
                    var curve = new Float32Array(length), i, phase = rotation > 0 ? Math.PI / 2 : -(Math.PI / 2);
                    for(i = 0; i < length; ++i)curve[i] = Math.sin(Math.PI * i / length - phase) / 2 + 0.5;
                    return curve;
                }
                //creating a curve to simulate a logarithmic curve with setValueCurveAtTime.
                function logarithmic(length, base, rotation) {
                    var curve = new Float32Array(length), index, x = 0, i;
                    for(i = 0; i < length; i++){
                        //index for the curve array.
                        index = rotation > 0 ? i : length - 1 - i;
                        x = i / length;
                        curve[index] = Math.log(1 + base * x) / Math.log(1 + base);
                    }
                    return curve;
                }
            /***/ },
            /***/ 1114: /***/ (__unused_webpack_module, exports, __webpack_require__)=>{
                "use strict";
                var __webpack_unused_export__;
                __webpack_unused_export__ = {
                    value: true
                };
                exports.h7 = exports.Y1 = exports.Hp = exports.Jl = exports.t$ = exports._h = undefined;
                exports.L7 = createFadeIn;
                exports.Mt = createFadeOut;
                var _fadeCurves = __webpack_require__(6226);
                var SCURVE = exports._h = "sCurve";
                var LINEAR = exports.t$ = "linear";
                var EXPONENTIAL = exports.Jl = "exponential";
                var LOGARITHMIC = exports.Hp = "logarithmic";
                var FADEIN = exports.Y1 = "FadeIn";
                var FADEOUT = exports.h7 = "FadeOut";
                function sCurveFadeIn(start, duration) {
                    var curve = (0, _fadeCurves.sCurve)(10000, 1);
                    this.setValueCurveAtTime(curve, start, duration);
                }
                function sCurveFadeOut(start, duration) {
                    var curve = (0, _fadeCurves.sCurve)(10000, -1);
                    this.setValueCurveAtTime(curve, start, duration);
                }
                function linearFadeIn(start, duration) {
                    this.linearRampToValueAtTime(0, start);
                    this.linearRampToValueAtTime(1, start + duration);
                }
                function linearFadeOut(start, duration) {
                    this.linearRampToValueAtTime(1, start);
                    this.linearRampToValueAtTime(0, start + duration);
                }
                function exponentialFadeIn(start, duration) {
                    this.exponentialRampToValueAtTime(0.01, start);
                    this.exponentialRampToValueAtTime(1, start + duration);
                }
                function exponentialFadeOut(start, duration) {
                    this.exponentialRampToValueAtTime(1, start);
                    this.exponentialRampToValueAtTime(0.01, start + duration);
                }
                function logarithmicFadeIn(start, duration) {
                    var curve = (0, _fadeCurves.logarithmic)(10000, 10, 1);
                    this.setValueCurveAtTime(curve, start, duration);
                }
                function logarithmicFadeOut(start, duration) {
                    var curve = (0, _fadeCurves.logarithmic)(10000, 10, -1);
                    this.setValueCurveAtTime(curve, start, duration);
                }
                function createFadeIn(gain, shape, start, duration) {
                    switch(shape){
                        case SCURVE:
                            sCurveFadeIn.call(gain, start, duration);
                            break;
                        case LINEAR:
                            linearFadeIn.call(gain, start, duration);
                            break;
                        case EXPONENTIAL:
                            exponentialFadeIn.call(gain, start, duration);
                            break;
                        case LOGARITHMIC:
                            logarithmicFadeIn.call(gain, start, duration);
                            break;
                        default:
                            throw new Error("Unsupported Fade type");
                    }
                }
                function createFadeOut(gain, shape, start, duration) {
                    switch(shape){
                        case SCURVE:
                            sCurveFadeOut.call(gain, start, duration);
                            break;
                        case LINEAR:
                            linearFadeOut.call(gain, start, duration);
                            break;
                        case EXPONENTIAL:
                            exponentialFadeOut.call(gain, start, duration);
                            break;
                        case LOGARITHMIC:
                            logarithmicFadeOut.call(gain, start, duration);
                            break;
                        default:
                            throw new Error("Unsupported Fade type");
                    }
                }
            /***/ },
            /***/ 9144: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var topLevel = typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : typeof window !== "undefined" ? window : {};
                var minDoc = __webpack_require__(5893);
                var doccy;
                if (typeof document !== "undefined") doccy = document;
                else {
                    doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
                    if (!doccy) doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
                }
                module1.exports = doccy;
            /***/ },
            /***/ 8070: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                /*global window, global*/ var root = typeof window !== "undefined" ? window : typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : {};
                module1.exports = Individual;
                function Individual(key, value) {
                    if (key in root) return root[key];
                    root[key] = value;
                    return value;
                }
            /***/ },
            /***/ 4167: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var Individual = __webpack_require__(8070);
                module1.exports = OneVersion;
                function OneVersion(moduleName, version, defaultValue) {
                    var key = "__INDIVIDUAL_ONE_VERSION_" + moduleName;
                    var enforceKey = key + "_ENFORCE_SINGLETON";
                    var versionValue = Individual(enforceKey, version);
                    if (versionValue !== version) throw new Error("Can only have one copy of " + moduleName + ".\n" + "You already have version " + versionValue + " installed.\n" + "This means you cannot install version " + version);
                    return Individual(key, defaultValue);
                }
            /***/ },
            /***/ 849: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var WORKER_ENABLED = !!(__webpack_require__.g === __webpack_require__.g.window && __webpack_require__.g.URL && __webpack_require__.g.Blob && __webpack_require__.g.Worker);
                function InlineWorker(func, self1) {
                    var _this = this;
                    var functionBody;
                    self1 = self1 || {};
                    if (WORKER_ENABLED) {
                        functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
                        return new __webpack_require__.g.Worker(__webpack_require__.g.URL.createObjectURL(new __webpack_require__.g.Blob([
                            functionBody
                        ], {
                            type: "text/javascript"
                        })));
                    }
                    function postMessage1(data) {
                        setTimeout(function() {
                            _this.onmessage({
                                data: data
                            });
                        }, 0);
                    }
                    this.self = self1;
                    this.self.postMessage = postMessage1;
                    setTimeout(func.bind(self1, self1), 0);
                }
                InlineWorker.prototype.postMessage = function postMessage1(data) {
                    var _this = this;
                    setTimeout(function() {
                        _this.self.onmessage({
                            data: data
                        });
                    }, 0);
                };
                module1.exports = InlineWorker;
            /***/ },
            /***/ 6240: /***/ (module1)=>{
                "use strict";
                module1.exports = function isObject(x) {
                    return typeof x === "object" && x !== null;
                };
            /***/ },
            /***/ 1730: /***/ (module1)=>{
                /**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
                /** `Object#toString` result references. */ var argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]";
                /** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
                /**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */ function apply(func, thisArg, args) {
                    switch(args.length){
                        case 0:
                            return func.call(thisArg);
                        case 1:
                            return func.call(thisArg, args[0]);
                        case 2:
                            return func.call(thisArg, args[0], args[1]);
                        case 3:
                            return func.call(thisArg, args[0], args[1], args[2]);
                    }
                    return func.apply(thisArg, args);
                }
                /**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
                    var index = -1, result = Array(n);
                    while(++index < n)result[index] = iteratee(index);
                    return result;
                }
                /**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
                    return function(arg) {
                        return func(transform(arg));
                    };
                }
                /** Used for built-in method references. */ var objectProto = Object.prototype;
                /** Used to check objects for own properties. */ var hasOwnProperty1 = objectProto.hasOwnProperty;
                /**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
                /** Built-in value references. */ var propertyIsEnumerable = objectProto.propertyIsEnumerable;
                /* Built-in method references for those with the same name as other `lodash` methods. */ var nativeKeys = overArg(Object.keys, Object), nativeMax = Math.max;
                /** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */ var nonEnumShadows = !propertyIsEnumerable.call({
                    "valueOf": 1
                }, "valueOf");
                /**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
                    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
                    // Safari 9 makes `arguments.length` enumerable in strict mode.
                    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
                    var length = result.length, skipIndexes = !!length;
                    for(var key in value)if ((inherited || hasOwnProperty1.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) result.push(key);
                    return result;
                }
                /**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function assignValue(object, key, value) {
                    var objValue = object[key];
                    if (!(hasOwnProperty1.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) object[key] = value;
                }
                /**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
                    if (!isPrototype(object)) return nativeKeys(object);
                    var result = [];
                    for(var key in Object(object))if (hasOwnProperty1.call(object, key) && key != "constructor") result.push(key);
                    return result;
                }
                /**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */ function baseRest(func, start) {
                    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
                    return function() {
                        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
                        while(++index < length)array[index] = args[start + index];
                        index = -1;
                        var otherArgs = Array(start + 1);
                        while(++index < start)otherArgs[index] = args[index];
                        otherArgs[start] = array;
                        return apply(func, this, otherArgs);
                    };
                }
                /**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */ function copyObject(source, props, object, customizer) {
                    object || (object = {});
                    var index = -1, length = props.length;
                    while(++index < length){
                        var key = props[index];
                        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
                        assignValue(object, key, newValue === undefined ? source[key] : newValue);
                    }
                    return object;
                }
                /**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */ function createAssigner(assigner) {
                    return baseRest(function(object, sources) {
                        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
                        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined;
                        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                            customizer = length < 3 ? undefined : customizer;
                            length = 1;
                        }
                        object = Object(object);
                        while(++index < length){
                            var source = sources[index];
                            if (source) assigner(object, source, index, customizer);
                        }
                        return object;
                    });
                }
                /**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
                    length = length == null ? MAX_SAFE_INTEGER : length;
                    return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
                }
                /**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */ function isIterateeCall(value, index, object) {
                    if (!isObject(object)) return false;
                    var type = typeof index;
                    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
                    return false;
                }
                /**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
                    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
                    return value === proto;
                }
                /**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
                    return value === other || value !== value && other !== other;
                }
                /**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
                    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
                    return isArrayLikeObject(value) && hasOwnProperty1.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
                }
                /**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
                /**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
                    return value != null && isLength(value.length) && !isFunction(value);
                }
                /**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
                    return isObjectLike(value) && isArrayLike(value);
                }
                /**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
                    // The use of `Object#toString` avoids issues with the `typeof` operator
                    // in Safari 8-9 which returns 'object' for typed array and other constructors.
                    var tag = isObject(value) ? objectToString.call(value) : "";
                    return tag == funcTag || tag == genTag;
                }
                /**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
                    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
                }
                /**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
                    var type = typeof value;
                    return !!value && (type == "object" || type == "function");
                }
                /**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
                    return !!value && typeof value == "object";
                }
                /**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */ var assign = createAssigner(function(object, source) {
                    if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
                        copyObject(source, keys(source), object);
                        return;
                    }
                    for(var key in source)if (hasOwnProperty1.call(source, key)) assignValue(object, key, source[key]);
                });
                /**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */ function keys(object) {
                    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
                }
                module1.exports = assign;
            /***/ },
            /***/ 2098: /***/ (module1, exports, __webpack_require__)=>{
                /* module decorator */ module1 = __webpack_require__.nmd(module1);
                /**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the size to enable large array optimizations. */ var LARGE_ARRAY_SIZE = 200;
                /** Used to stand-in for `undefined` hash values. */ var HASH_UNDEFINED = "__lodash_hash_undefined__";
                /** Used to detect hot functions by number of calls within a span of milliseconds. */ var HOT_COUNT = 800, HOT_SPAN = 16;
                /** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
                /** `Object#toString` result references. */ var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
                var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
                /**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
                /** Used to detect host constructors (Safari). */ var reIsHostCtor = /^\[object .+?Constructor\]$/;
                /** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
                /** Used to identify `toStringTag` values of typed arrays. */ var typedArrayTags = {};
                typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
                typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
                /** Detect free variable `global` from Node.js. */ var freeGlobal = typeof __webpack_require__.g == "object" && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
                /** Detect free variable `self`. */ var freeSelf = typeof self == "object" && self && self.Object === Object && self;
                /** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function("return this")();
                /** Detect free variable `exports`. */ var freeExports = exports && !exports.nodeType && exports;
                /** Detect free variable `module`. */ var freeModule = freeExports && true && module1 && !module1.nodeType && module1;
                /** Detect the popular CommonJS extension `module.exports`. */ var moduleExports = freeModule && freeModule.exports === freeExports;
                /** Detect free variable `process` from Node.js. */ var freeProcess = moduleExports && freeGlobal.process;
                /** Used to access faster Node.js helpers. */ var nodeUtil = function() {
                    try {
                        // Use `util.types` for Node.js 10+.
                        var types = freeModule && freeModule.require && freeModule.require("util").types;
                        if (types) return types;
                        // Legacy `process.binding('util')` for Node.js < 10.
                        return freeProcess && freeProcess.binding && freeProcess.binding("util");
                    } catch (e) {}
                }();
                /* Node.js helper references. */ var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
                /**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */ function apply(func, thisArg, args) {
                    switch(args.length){
                        case 0:
                            return func.call(thisArg);
                        case 1:
                            return func.call(thisArg, args[0]);
                        case 2:
                            return func.call(thisArg, args[0], args[1]);
                        case 3:
                            return func.call(thisArg, args[0], args[1], args[2]);
                    }
                    return func.apply(thisArg, args);
                }
                /**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
                    var index = -1, result = Array(n);
                    while(++index < n)result[index] = iteratee(index);
                    return result;
                }
                /**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */ function baseUnary(func) {
                    return function(value) {
                        return func(value);
                    };
                }
                /**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function getValue(object, key) {
                    return object == null ? undefined : object[key];
                }
                /**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
                    return function(arg) {
                        return func(transform(arg));
                    };
                }
                /** Used for built-in method references. */ var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
                /** Used to detect overreaching core-js shims. */ var coreJsData = root["__core-js_shared__"];
                /** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
                /** Used to check objects for own properties. */ var hasOwnProperty1 = objectProto.hasOwnProperty;
                /** Used to detect methods masquerading as native. */ var maskSrcKey = function() {
                    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
                    return uid ? "Symbol(src)_1." + uid : "";
                }();
                /**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var nativeObjectToString = objectProto.toString;
                /** Used to infer the `Object` constructor. */ var objectCtorString = funcToString.call(Object);
                /** Used to detect if a method is native. */ var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty1).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
                /** Built-in value references. */ var Buffer = moduleExports ? root.Buffer : undefined, Symbol1 = root.Symbol, Uint8Array1 = root.Uint8Array, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol1 ? Symbol1.toStringTag : undefined;
                var defineProperty = function() {
                    try {
                        var func = getNative(Object, "defineProperty");
                        func({}, "", {});
                        return func;
                    } catch (e) {}
                }();
                /* Built-in method references for those with the same name as other `lodash` methods. */ var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined, nativeMax = Math.max, nativeNow = Date.now;
                /* Built-in method references that are verified to be native. */ var Map = getNative(root, "Map"), nativeCreate = getNative(Object, "create");
                /**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */ var baseCreate = function() {
                    function object() {}
                    return function(proto) {
                        if (!isObject(proto)) return {};
                        if (objectCreate) return objectCreate(proto);
                        object.prototype = proto;
                        var result = new object;
                        object.prototype = undefined;
                        return result;
                    };
                }();
                /**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Hash(entries) {
                    var index = -1, length = entries == null ? 0 : entries.length;
                    this.clear();
                    while(++index < length){
                        var entry = entries[index];
                        this.set(entry[0], entry[1]);
                    }
                }
                /**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function hashClear() {
                    this.__data__ = nativeCreate ? nativeCreate(null) : {};
                    this.size = 0;
                }
                /**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function hashDelete(key) {
                    var result = this.has(key) && delete this.__data__[key];
                    this.size -= result ? 1 : 0;
                    return result;
                }
                /**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function hashGet(key) {
                    var data = this.__data__;
                    if (nativeCreate) {
                        var result = data[key];
                        return result === HASH_UNDEFINED ? undefined : result;
                    }
                    return hasOwnProperty1.call(data, key) ? data[key] : undefined;
                }
                /**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function hashHas(key) {
                    var data = this.__data__;
                    return nativeCreate ? data[key] !== undefined : hasOwnProperty1.call(data, key);
                }
                /**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function hashSet(key, value) {
                    var data = this.__data__;
                    this.size += this.has(key) ? 0 : 1;
                    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
                    return this;
                }
                // Add methods to `Hash`.
                Hash.prototype.clear = hashClear;
                Hash.prototype["delete"] = hashDelete;
                Hash.prototype.get = hashGet;
                Hash.prototype.has = hashHas;
                Hash.prototype.set = hashSet;
                /**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function ListCache(entries) {
                    var index = -1, length = entries == null ? 0 : entries.length;
                    this.clear();
                    while(++index < length){
                        var entry = entries[index];
                        this.set(entry[0], entry[1]);
                    }
                }
                /**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function listCacheClear() {
                    this.__data__ = [];
                    this.size = 0;
                }
                /**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function listCacheDelete(key) {
                    var data = this.__data__, index = assocIndexOf(data, key);
                    if (index < 0) return false;
                    var lastIndex = data.length - 1;
                    if (index == lastIndex) data.pop();
                    else splice.call(data, index, 1);
                    --this.size;
                    return true;
                }
                /**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function listCacheGet(key) {
                    var data = this.__data__, index = assocIndexOf(data, key);
                    return index < 0 ? undefined : data[index][1];
                }
                /**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function listCacheHas(key) {
                    return assocIndexOf(this.__data__, key) > -1;
                }
                /**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function listCacheSet(key, value) {
                    var data = this.__data__, index = assocIndexOf(data, key);
                    if (index < 0) {
                        ++this.size;
                        data.push([
                            key,
                            value
                        ]);
                    } else data[index][1] = value;
                    return this;
                }
                // Add methods to `ListCache`.
                ListCache.prototype.clear = listCacheClear;
                ListCache.prototype["delete"] = listCacheDelete;
                ListCache.prototype.get = listCacheGet;
                ListCache.prototype.has = listCacheHas;
                ListCache.prototype.set = listCacheSet;
                /**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function MapCache(entries) {
                    var index = -1, length = entries == null ? 0 : entries.length;
                    this.clear();
                    while(++index < length){
                        var entry = entries[index];
                        this.set(entry[0], entry[1]);
                    }
                }
                /**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function mapCacheClear() {
                    this.size = 0;
                    this.__data__ = {
                        "hash": new Hash,
                        "map": new (Map || ListCache),
                        "string": new Hash
                    };
                }
                /**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function mapCacheDelete(key) {
                    var result = getMapData(this, key)["delete"](key);
                    this.size -= result ? 1 : 0;
                    return result;
                }
                /**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function mapCacheGet(key) {
                    return getMapData(this, key).get(key);
                }
                /**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function mapCacheHas(key) {
                    return getMapData(this, key).has(key);
                }
                /**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function mapCacheSet(key, value) {
                    var data = getMapData(this, key), size = data.size;
                    data.set(key, value);
                    this.size += data.size == size ? 0 : 1;
                    return this;
                }
                // Add methods to `MapCache`.
                MapCache.prototype.clear = mapCacheClear;
                MapCache.prototype["delete"] = mapCacheDelete;
                MapCache.prototype.get = mapCacheGet;
                MapCache.prototype.has = mapCacheHas;
                MapCache.prototype.set = mapCacheSet;
                /**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Stack(entries) {
                    var data = this.__data__ = new ListCache(entries);
                    this.size = data.size;
                }
                /**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */ function stackClear() {
                    this.__data__ = new ListCache;
                    this.size = 0;
                }
                /**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function stackDelete(key) {
                    var data = this.__data__, result = data["delete"](key);
                    this.size = data.size;
                    return result;
                }
                /**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function stackGet(key) {
                    return this.__data__.get(key);
                }
                /**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function stackHas(key) {
                    return this.__data__.has(key);
                }
                /**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */ function stackSet(key, value) {
                    var data = this.__data__;
                    if (data instanceof ListCache) {
                        var pairs = data.__data__;
                        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
                            pairs.push([
                                key,
                                value
                            ]);
                            this.size = ++data.size;
                            return this;
                        }
                        data = this.__data__ = new MapCache(pairs);
                    }
                    data.set(key, value);
                    this.size = data.size;
                    return this;
                }
                // Add methods to `Stack`.
                Stack.prototype.clear = stackClear;
                Stack.prototype["delete"] = stackDelete;
                Stack.prototype.get = stackGet;
                Stack.prototype.has = stackHas;
                Stack.prototype.set = stackSet;
                /**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
                    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
                    for(var key in value)if ((inherited || hasOwnProperty1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
                    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
                    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
                    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
                    isIndex(key, length)))) result.push(key);
                    return result;
                }
                /**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function assignMergeValue(object, key, value) {
                    if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) baseAssignValue(object, key, value);
                }
                /**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function assignValue(object, key, value) {
                    var objValue = object[key];
                    if (!(hasOwnProperty1.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) baseAssignValue(object, key, value);
                }
                /**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function assocIndexOf(array, key) {
                    var length = array.length;
                    while(length--){
                        if (eq(array[length][0], key)) return length;
                    }
                    return -1;
                }
                /**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */ function baseAssignValue(object, key, value) {
                    if (key == "__proto__" && defineProperty) defineProperty(object, key, {
                        "configurable": true,
                        "enumerable": true,
                        "value": value,
                        "writable": true
                    });
                    else object[key] = value;
                }
                /**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */ var baseFor = createBaseFor();
                /**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
                    if (value == null) return value === undefined ? undefinedTag : nullTag;
                    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
                }
                /**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */ function baseIsArguments(value) {
                    return isObjectLike(value) && baseGetTag(value) == argsTag;
                }
                /**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function baseIsNative(value) {
                    if (!isObject(value) || isMasked(value)) return false;
                    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
                    return pattern.test(toSource(value));
                }
                /**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */ function baseIsTypedArray(value) {
                    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
                }
                /**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeysIn(object) {
                    if (!isObject(object)) return nativeKeysIn(object);
                    var isProto = isPrototype(object), result = [];
                    for(var key in object)if (!(key == "constructor" && (isProto || !hasOwnProperty1.call(object, key)))) result.push(key);
                    return result;
                }
                /**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */ function baseMerge(object, source, srcIndex, customizer, stack) {
                    if (object === source) return;
                    baseFor(source, function(srcValue, key) {
                        stack || (stack = new Stack);
                        if (isObject(srcValue)) baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
                        else {
                            var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined;
                            if (newValue === undefined) newValue = srcValue;
                            assignMergeValue(object, key, newValue);
                        }
                    }, keysIn);
                }
                /**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */ function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
                    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
                    if (stacked) {
                        assignMergeValue(object, key, stacked);
                        return;
                    }
                    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined;
                    var isCommon = newValue === undefined;
                    if (isCommon) {
                        var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
                        newValue = srcValue;
                        if (isArr || isBuff || isTyped) {
                            if (isArray(objValue)) newValue = objValue;
                            else if (isArrayLikeObject(objValue)) newValue = copyArray(objValue);
                            else if (isBuff) {
                                isCommon = false;
                                newValue = cloneBuffer(srcValue, true);
                            } else if (isTyped) {
                                isCommon = false;
                                newValue = cloneTypedArray(srcValue, true);
                            } else newValue = [];
                        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                            newValue = objValue;
                            if (isArguments(objValue)) newValue = toPlainObject(objValue);
                            else if (!isObject(objValue) || isFunction(objValue)) newValue = initCloneObject(srcValue);
                        } else isCommon = false;
                    }
                    if (isCommon) {
                        // Recursively merge objects and arrays (susceptible to call stack limits).
                        stack.set(srcValue, newValue);
                        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
                        stack["delete"](srcValue);
                    }
                    assignMergeValue(object, key, newValue);
                }
                /**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */ function baseRest(func, start) {
                    return setToString(overRest(func, start, identity), func + "");
                }
                /**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */ var baseSetToString = !defineProperty ? identity : function(func, string) {
                    return defineProperty(func, "toString", {
                        "configurable": true,
                        "enumerable": false,
                        "value": constant(string),
                        "writable": true
                    });
                };
                /**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */ function cloneBuffer(buffer, isDeep) {
                    if (isDeep) return buffer.slice();
                    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
                    buffer.copy(result);
                    return result;
                }
                /**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */ function cloneArrayBuffer(arrayBuffer) {
                    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
                    new Uint8Array1(result).set(new Uint8Array1(arrayBuffer));
                    return result;
                }
                /**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */ function cloneTypedArray(typedArray, isDeep) {
                    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
                    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
                }
                /**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */ function copyArray(source, array) {
                    var index = -1, length = source.length;
                    array || (array = Array(length));
                    while(++index < length)array[index] = source[index];
                    return array;
                }
                /**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */ function copyObject(source, props, object, customizer) {
                    var isNew = !object;
                    object || (object = {});
                    var index = -1, length = props.length;
                    while(++index < length){
                        var key = props[index];
                        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
                        if (newValue === undefined) newValue = source[key];
                        if (isNew) baseAssignValue(object, key, newValue);
                        else assignValue(object, key, newValue);
                    }
                    return object;
                }
                /**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */ function createAssigner(assigner) {
                    return baseRest(function(object, sources) {
                        var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined, guard = length > 2 ? sources[2] : undefined;
                        customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined;
                        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                            customizer = length < 3 ? undefined : customizer;
                            length = 1;
                        }
                        object = Object(object);
                        while(++index < length){
                            var source = sources[index];
                            if (source) assigner(object, source, index, customizer);
                        }
                        return object;
                    });
                }
                /**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */ function createBaseFor(fromRight) {
                    return function(object, iteratee, keysFunc) {
                        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
                        while(length--){
                            var key = props[fromRight ? length : ++index];
                            if (iteratee(iterable[key], key, iterable) === false) break;
                        }
                        return object;
                    };
                }
                /**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */ function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
                    if (isObject(objValue) && isObject(srcValue)) {
                        // Recursively merge objects and arrays (susceptible to call stack limits).
                        stack.set(srcValue, objValue);
                        baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
                        stack["delete"](srcValue);
                    }
                    return objValue;
                }
                /**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function getMapData(map, key) {
                    var data = map.__data__;
                    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
                }
                /**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function getNative(object, key) {
                    var value = getValue(object, key);
                    return baseIsNative(value) ? value : undefined;
                }
                /**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function getRawTag(value) {
                    var isOwn = hasOwnProperty1.call(value, symToStringTag), tag = value[symToStringTag];
                    try {
                        value[symToStringTag] = undefined;
                        var unmasked = true;
                    } catch (e) {}
                    var result = nativeObjectToString.call(value);
                    if (unmasked) {
                        if (isOwn) value[symToStringTag] = tag;
                        else delete value[symToStringTag];
                    }
                    return result;
                }
                /**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */ function initCloneObject(object) {
                    return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
                }
                /**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
                    var type = typeof value;
                    length = length == null ? MAX_SAFE_INTEGER : length;
                    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
                }
                /**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */ function isIterateeCall(value, index, object) {
                    if (!isObject(object)) return false;
                    var type = typeof index;
                    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
                    return false;
                }
                /**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function isKeyable(value) {
                    var type = typeof value;
                    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
                }
                /**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function isMasked(func) {
                    return !!maskSrcKey && maskSrcKey in func;
                }
                /**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
                    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
                    return value === proto;
                }
                /**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function nativeKeysIn(object) {
                    var result = [];
                    if (object != null) for(var key in Object(object))result.push(key);
                    return result;
                }
                /**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function objectToString(value) {
                    return nativeObjectToString.call(value);
                }
                /**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */ function overRest(func, start, transform) {
                    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
                    return function() {
                        var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
                        while(++index < length)array[index] = args[start + index];
                        index = -1;
                        var otherArgs = Array(start + 1);
                        while(++index < start)otherArgs[index] = args[index];
                        otherArgs[start] = transform(array);
                        return apply(func, this, otherArgs);
                    };
                }
                /**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function safeGet(object, key) {
                    if (key === "constructor" && typeof object[key] === "function") return;
                    if (key == "__proto__") return;
                    return object[key];
                }
                /**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */ var setToString = shortOut(baseSetToString);
                /**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */ function shortOut(func) {
                    var count = 0, lastCalled = 0;
                    return function() {
                        var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
                        lastCalled = stamp;
                        if (remaining > 0) {
                            if (++count >= HOT_COUNT) return arguments[0];
                        } else count = 0;
                        return func.apply(undefined, arguments);
                    };
                }
                /**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */ function toSource(func) {
                    if (func != null) {
                        try {
                            return funcToString.call(func);
                        } catch (e) {}
                        try {
                            return func + "";
                        } catch (e) {}
                    }
                    return "";
                }
                /**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
                    return value === other || value !== value && other !== other;
                }
                /**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ var isArguments = baseIsArguments(function() {
                    return arguments;
                }()) ? baseIsArguments : function(value) {
                    return isObjectLike(value) && hasOwnProperty1.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
                };
                /**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
                /**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
                    return value != null && isLength(value.length) && !isFunction(value);
                }
                /**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
                    return isObjectLike(value) && isArrayLike(value);
                }
                /**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */ var isBuffer = nativeIsBuffer || stubFalse;
                /**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
                    if (!isObject(value)) return false;
                    // The use of `Object#toString` avoids issues with the `typeof` operator
                    // in Safari 9 which returns 'object' for typed arrays and other constructors.
                    var tag = baseGetTag(value);
                    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
                }
                /**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
                    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
                }
                /**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
                    var type = typeof value;
                    return value != null && (type == "object" || type == "function");
                }
                /**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
                    return value != null && typeof value == "object";
                }
                /**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */ function isPlainObject(value) {
                    if (!isObjectLike(value) || baseGetTag(value) != objectTag) return false;
                    var proto = getPrototype(value);
                    if (proto === null) return true;
                    var Ctor = hasOwnProperty1.call(proto, "constructor") && proto.constructor;
                    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
                }
                /**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */ var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
                /**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */ function toPlainObject(value) {
                    return copyObject(value, keysIn(value));
                }
                /**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */ var defaultsDeep = baseRest(function(args) {
                    args.push(undefined, customDefaultsMerge);
                    return apply(mergeWith, undefined, args);
                });
                /**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */ function keysIn(object) {
                    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
                }
                /**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */ var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
                    baseMerge(object, source, srcIndex, customizer);
                });
                /**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */ function constant(value) {
                    return function() {
                        return value;
                    };
                }
                /**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */ function identity(value) {
                    return value;
                }
                /**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */ function stubFalse() {
                    return false;
                }
                module1.exports = defaultsDeep;
            /***/ },
            /***/ 3520: /***/ (module1)=>{
                /**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var MAX_SAFE_INTEGER = 9007199254740991;
                /** `Object#toString` result references. */ var argsTag = "[object Arguments]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]";
                /** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
                /**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
                    var index = -1, result = Array(n);
                    while(++index < n)result[index] = iteratee(index);
                    return result;
                }
                /**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
                    return function(arg) {
                        return func(transform(arg));
                    };
                }
                /** Used for built-in method references. */ var objectProto = Object.prototype;
                /** Used to check objects for own properties. */ var hasOwnProperty1 = objectProto.hasOwnProperty;
                /**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
                /** Built-in value references. */ var propertyIsEnumerable = objectProto.propertyIsEnumerable;
                /* Built-in method references for those with the same name as other `lodash` methods. */ var nativeKeys = overArg(Object.keys, Object);
                /**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
                    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
                    // Safari 9 makes `arguments.length` enumerable in strict mode.
                    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
                    var length = result.length, skipIndexes = !!length;
                    for(var key in value)if ((inherited || hasOwnProperty1.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) result.push(key);
                    return result;
                }
                /**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */ var baseFor = createBaseFor();
                /**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */ function baseForOwn(object, iteratee) {
                    return object && baseFor(object, iteratee, keys);
                }
                /**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
                    if (!isPrototype(object)) return nativeKeys(object);
                    var result = [];
                    for(var key in Object(object))if (hasOwnProperty1.call(object, key) && key != "constructor") result.push(key);
                    return result;
                }
                /**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */ function createBaseFor(fromRight) {
                    return function(object, iteratee, keysFunc) {
                        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
                        while(length--){
                            var key = props[fromRight ? length : ++index];
                            if (iteratee(iterable[key], key, iterable) === false) break;
                        }
                        return object;
                    };
                }
                /**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
                    length = length == null ? MAX_SAFE_INTEGER : length;
                    return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
                }
                /**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
                    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
                    return value === proto;
                }
                /**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
                    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
                    return isArrayLikeObject(value) && hasOwnProperty1.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
                }
                /**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
                /**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
                    return value != null && isLength(value.length) && !isFunction(value);
                }
                /**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
                    return isObjectLike(value) && isArrayLike(value);
                }
                /**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
                    // The use of `Object#toString` avoids issues with the `typeof` operator
                    // in Safari 8-9 which returns 'object' for typed array and other constructors.
                    var tag = isObject(value) ? objectToString.call(value) : "";
                    return tag == funcTag || tag == genTag;
                }
                /**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
                    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
                }
                /**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
                    var type = typeof value;
                    return !!value && (type == "object" || type == "function");
                }
                /**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
                    return !!value && typeof value == "object";
                }
                /**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */ function forOwn(object, iteratee) {
                    return object && baseForOwn(object, typeof iteratee == "function" ? iteratee : identity);
                }
                /**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */ function keys(object) {
                    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
                }
                /**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */ function identity(value) {
                    return value;
                }
                module1.exports = forOwn;
            /***/ },
            /***/ 372: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isPrototype = __webpack_require__(6060);
                module1.exports = function(value) {
                    if (typeof value !== "function") return false;
                    if (!hasOwnProperty.call(value, "length")) return false;
                    try {
                        if (typeof value.length !== "number") return false;
                        if (typeof value.call !== "function") return false;
                        if (typeof value.apply !== "function") return false;
                    } catch (error) {
                        return false;
                    }
                    return !isPrototype(value);
                };
            /***/ },
            /***/ 3940: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isValue = __webpack_require__(5618);
                // prettier-ignore
                var possibleTypes = {
                    "object": true,
                    "function": true,
                    "undefined": true
                };
                module1.exports = function(value) {
                    if (!isValue(value)) return false;
                    return hasOwnProperty.call(possibleTypes, typeof value);
                };
            /***/ },
            /***/ 7205: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isFunction = __webpack_require__(372);
                var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
                module1.exports = function(value) {
                    if (!isFunction(value)) return false;
                    if (classRe.test(functionToString.call(value))) return false;
                    return true;
                };
            /***/ },
            /***/ 6060: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isObject = __webpack_require__(3940);
                module1.exports = function(value) {
                    if (!isObject(value)) return false;
                    try {
                        if (!value.constructor) return false;
                        return value.constructor.prototype === value;
                    } catch (error) {
                        return false;
                    }
                };
            /***/ },
            /***/ 5618: /***/ (module1)=>{
                "use strict";
                // ES3 safe
                var _undefined = void 0;
                module1.exports = function(value) {
                    return value !== _undefined && value !== null;
                };
            /***/ },
            /***/ 4935: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var createElement = __webpack_require__(3513);
                module1.exports = createElement;
            /***/ },
            /***/ 7921: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var diff = __webpack_require__(3072);
                module1.exports = diff;
            /***/ },
            /***/ 347: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var h = __webpack_require__(8744);
                module1.exports = h;
            /***/ },
            /***/ 9720: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var patch = __webpack_require__(6943);
                module1.exports = patch;
            /***/ },
            /***/ 6672: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var isObject = __webpack_require__(6240);
                var isHook = __webpack_require__(7265);
                module1.exports = applyProperties;
                function applyProperties(node, props, previous) {
                    for(var propName in props){
                        var propValue = props[propName];
                        if (propValue === undefined) removeProperty(node, propName, propValue, previous);
                        else if (isHook(propValue)) {
                            removeProperty(node, propName, propValue, previous);
                            if (propValue.hook) propValue.hook(node, propName, previous ? previous[propName] : undefined);
                        } else if (isObject(propValue)) patchObject(node, props, previous, propName, propValue);
                        else node[propName] = propValue;
                    }
                }
                function removeProperty(node, propName, propValue, previous) {
                    if (previous) {
                        var previousValue = previous[propName];
                        if (!isHook(previousValue)) {
                            if (propName === "attributes") for(var attrName in previousValue)node.removeAttribute(attrName);
                            else if (propName === "style") for(var i in previousValue)node.style[i] = "";
                            else if (typeof previousValue === "string") node[propName] = "";
                            else node[propName] = null;
                        } else if (previousValue.unhook) previousValue.unhook(node, propName, propValue);
                    }
                }
                function patchObject(node, props, previous, propName, propValue) {
                    var previousValue = previous ? previous[propName] : undefined;
                    // Set attributes
                    if (propName === "attributes") {
                        for(var attrName in propValue){
                            var attrValue = propValue[attrName];
                            if (attrValue === undefined) node.removeAttribute(attrName);
                            else node.setAttribute(attrName, attrValue);
                        }
                        return;
                    }
                    if (previousValue && isObject(previousValue) && getPrototype(previousValue) !== getPrototype(propValue)) {
                        node[propName] = propValue;
                        return;
                    }
                    if (!isObject(node[propName])) node[propName] = {};
                    var replacer = propName === "style" ? "" : undefined;
                    for(var k in propValue){
                        var value = propValue[k];
                        node[propName][k] = value === undefined ? replacer : value;
                    }
                }
                function getPrototype(value) {
                    if (Object.getPrototypeOf) return Object.getPrototypeOf(value);
                    else if (value.__proto__) return value.__proto__;
                    else if (value.constructor) return value.constructor.prototype;
                }
            /***/ },
            /***/ 3513: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var document1 = __webpack_require__(9144);
                var applyProperties = __webpack_require__(6672);
                var isVNode = __webpack_require__(5170);
                var isVText = __webpack_require__(6221);
                var isWidget = __webpack_require__(4097);
                var handleThunk = __webpack_require__(6078);
                module1.exports = createElement;
                function createElement(vnode, opts) {
                    var doc = opts ? opts.document || document1 : document1;
                    var warn = opts ? opts.warn : null;
                    vnode = handleThunk(vnode).a;
                    if (isWidget(vnode)) return vnode.init();
                    else if (isVText(vnode)) return doc.createTextNode(vnode.text);
                    else if (!isVNode(vnode)) {
                        if (warn) warn("Item is not a valid virtual dom node", vnode);
                        return null;
                    }
                    var node = vnode.namespace === null ? doc.createElement(vnode.tagName) : doc.createElementNS(vnode.namespace, vnode.tagName);
                    var props = vnode.properties;
                    applyProperties(node, props);
                    var children = vnode.children;
                    for(var i = 0; i < children.length; i++){
                        var childNode = createElement(children[i], opts);
                        if (childNode) node.appendChild(childNode);
                    }
                    return node;
                }
            /***/ },
            /***/ 8992: /***/ (module1)=>{
                // Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
                // We don't want to read all of the DOM nodes in the tree so we use
                // the in-order tree indexing to eliminate recursion down certain branches.
                // We only recurse into a DOM node if we know that it contains a child of
                // interest.
                var noChild = {};
                module1.exports = domIndex;
                function domIndex(rootNode, tree, indices, nodes) {
                    if (!indices || indices.length === 0) return {};
                    else {
                        indices.sort(ascending);
                        return recurse(rootNode, tree, indices, nodes, 0);
                    }
                }
                function recurse(rootNode, tree, indices, nodes, rootIndex) {
                    nodes = nodes || {};
                    if (rootNode) {
                        if (indexInRange(indices, rootIndex, rootIndex)) nodes[rootIndex] = rootNode;
                        var vChildren = tree.children;
                        if (vChildren) {
                            var childNodes = rootNode.childNodes;
                            for(var i = 0; i < tree.children.length; i++){
                                rootIndex += 1;
                                var vChild = vChildren[i] || noChild;
                                var nextIndex = rootIndex + (vChild.count || 0);
                                // skip recursion down the tree if there are no nodes down here
                                if (indexInRange(indices, rootIndex, nextIndex)) recurse(childNodes[i], vChild, indices, nodes, rootIndex);
                                rootIndex = nextIndex;
                            }
                        }
                    }
                    return nodes;
                }
                // Binary search for an index in the interval [left, right]
                function indexInRange(indices, left, right) {
                    if (indices.length === 0) return false;
                    var minIndex = 0;
                    var maxIndex = indices.length - 1;
                    var currentIndex;
                    var currentItem;
                    while(minIndex <= maxIndex){
                        currentIndex = (maxIndex + minIndex) / 2 >> 0;
                        currentItem = indices[currentIndex];
                        if (minIndex === maxIndex) return currentItem >= left && currentItem <= right;
                        else if (currentItem < left) minIndex = currentIndex + 1;
                        else if (currentItem > right) maxIndex = currentIndex - 1;
                        else return true;
                    }
                    return false;
                }
                function ascending(a, b) {
                    return a > b ? 1 : -1;
                }
            /***/ },
            /***/ 9120: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var applyProperties = __webpack_require__(6672);
                var isWidget = __webpack_require__(4097);
                var VPatch = __webpack_require__(8057);
                var updateWidget = __webpack_require__(6670);
                module1.exports = applyPatch;
                function applyPatch(vpatch, domNode, renderOptions) {
                    var type = vpatch.type;
                    var vNode = vpatch.vNode;
                    var patch = vpatch.patch;
                    switch(type){
                        case VPatch.REMOVE:
                            return removeNode(domNode, vNode);
                        case VPatch.INSERT:
                            return insertNode(domNode, patch, renderOptions);
                        case VPatch.VTEXT:
                            return stringPatch(domNode, vNode, patch, renderOptions);
                        case VPatch.WIDGET:
                            return widgetPatch(domNode, vNode, patch, renderOptions);
                        case VPatch.VNODE:
                            return vNodePatch(domNode, vNode, patch, renderOptions);
                        case VPatch.ORDER:
                            reorderChildren(domNode, patch);
                            return domNode;
                        case VPatch.PROPS:
                            applyProperties(domNode, patch, vNode.properties);
                            return domNode;
                        case VPatch.THUNK:
                            return replaceRoot(domNode, renderOptions.patch(domNode, patch, renderOptions));
                        default:
                            return domNode;
                    }
                }
                function removeNode(domNode, vNode) {
                    var parentNode = domNode.parentNode;
                    if (parentNode) parentNode.removeChild(domNode);
                    destroyWidget(domNode, vNode);
                    return null;
                }
                function insertNode(parentNode, vNode, renderOptions) {
                    var newNode = renderOptions.render(vNode, renderOptions);
                    if (parentNode) parentNode.appendChild(newNode);
                    return parentNode;
                }
                function stringPatch(domNode, leftVNode, vText, renderOptions) {
                    var newNode;
                    if (domNode.nodeType === 3) {
                        domNode.replaceData(0, domNode.length, vText.text);
                        newNode = domNode;
                    } else {
                        var parentNode = domNode.parentNode;
                        newNode = renderOptions.render(vText, renderOptions);
                        if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
                    }
                    return newNode;
                }
                function widgetPatch(domNode, leftVNode, widget, renderOptions) {
                    var updating = updateWidget(leftVNode, widget);
                    var newNode;
                    if (updating) newNode = widget.update(leftVNode, domNode) || domNode;
                    else newNode = renderOptions.render(widget, renderOptions);
                    var parentNode = domNode.parentNode;
                    if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
                    if (!updating) destroyWidget(domNode, leftVNode);
                    return newNode;
                }
                function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
                    var parentNode = domNode.parentNode;
                    var newNode = renderOptions.render(vNode, renderOptions);
                    if (parentNode && newNode !== domNode) parentNode.replaceChild(newNode, domNode);
                    return newNode;
                }
                function destroyWidget(domNode, w) {
                    if (typeof w.destroy === "function" && isWidget(w)) w.destroy(domNode);
                }
                function reorderChildren(domNode, moves) {
                    var childNodes = domNode.childNodes;
                    var keyMap = {};
                    var node;
                    var remove;
                    var insert;
                    for(var i = 0; i < moves.removes.length; i++){
                        remove = moves.removes[i];
                        node = childNodes[remove.from];
                        if (remove.key) keyMap[remove.key] = node;
                        domNode.removeChild(node);
                    }
                    var length = childNodes.length;
                    for(var j = 0; j < moves.inserts.length; j++){
                        insert = moves.inserts[j];
                        node = keyMap[insert.key];
                        // this is the weirdest bug i've ever seen in webkit
                        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to]);
                    }
                }
                function replaceRoot(oldRoot, newRoot) {
                    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) oldRoot.parentNode.replaceChild(newRoot, oldRoot);
                    return newRoot;
                }
            /***/ },
            /***/ 6943: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var document1 = __webpack_require__(9144);
                var isArray = __webpack_require__(7362);
                var render = __webpack_require__(3513);
                var domIndex = __webpack_require__(8992);
                var patchOp = __webpack_require__(9120);
                module1.exports = patch;
                function patch(rootNode, patches, renderOptions) {
                    renderOptions = renderOptions || {};
                    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch ? renderOptions.patch : patchRecursive;
                    renderOptions.render = renderOptions.render || render;
                    return renderOptions.patch(rootNode, patches, renderOptions);
                }
                function patchRecursive(rootNode, patches, renderOptions) {
                    var indices = patchIndices(patches);
                    if (indices.length === 0) return rootNode;
                    var index = domIndex(rootNode, patches.a, indices);
                    var ownerDocument = rootNode.ownerDocument;
                    if (!renderOptions.document && ownerDocument !== document1) renderOptions.document = ownerDocument;
                    for(var i = 0; i < indices.length; i++){
                        var nodeIndex = indices[i];
                        rootNode = applyPatch(rootNode, index[nodeIndex], patches[nodeIndex], renderOptions);
                    }
                    return rootNode;
                }
                function applyPatch(rootNode, domNode, patchList, renderOptions) {
                    if (!domNode) return rootNode;
                    var newNode;
                    if (isArray(patchList)) for(var i = 0; i < patchList.length; i++){
                        newNode = patchOp(patchList[i], domNode, renderOptions);
                        if (domNode === rootNode) rootNode = newNode;
                    }
                    else {
                        newNode = patchOp(patchList, domNode, renderOptions);
                        if (domNode === rootNode) rootNode = newNode;
                    }
                    return rootNode;
                }
                function patchIndices(patches) {
                    var indices = [];
                    for(var key in patches)if (key !== "a") indices.push(Number(key));
                    return indices;
                }
            /***/ },
            /***/ 6670: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var isWidget = __webpack_require__(4097);
                module1.exports = updateWidget;
                function updateWidget(a, b) {
                    if (isWidget(a) && isWidget(b)) {
                        if ("name" in a && "name" in b) return a.id === b.id;
                        else return a.init === b.init;
                    }
                    return false;
                }
            /***/ },
            /***/ 6505: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var EvStore = __webpack_require__(8832);
                module1.exports = EvHook;
                function EvHook(value) {
                    if (!(this instanceof EvHook)) return new EvHook(value);
                    this.value = value;
                }
                EvHook.prototype.hook = function(node, propertyName) {
                    var es = EvStore(node);
                    var propName = propertyName.substr(3);
                    es[propName] = this.value;
                };
                EvHook.prototype.unhook = function(node, propertyName) {
                    var es = EvStore(node);
                    var propName = propertyName.substr(3);
                    es[propName] = undefined;
                };
            /***/ },
            /***/ 7199: /***/ (module1)=>{
                "use strict";
                module1.exports = SoftSetHook;
                function SoftSetHook(value) {
                    if (!(this instanceof SoftSetHook)) return new SoftSetHook(value);
                    this.value = value;
                }
                SoftSetHook.prototype.hook = function(node, propertyName) {
                    if (node[propertyName] !== this.value) node[propertyName] = this.value;
                };
            /***/ },
            /***/ 8744: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var isArray = __webpack_require__(7362);
                var VNode = __webpack_require__(4282);
                var VText = __webpack_require__(4268);
                var isVNode = __webpack_require__(5170);
                var isVText = __webpack_require__(6221);
                var isWidget = __webpack_require__(4097);
                var isHook = __webpack_require__(7265);
                var isVThunk = __webpack_require__(6741);
                var parseTag = __webpack_require__(1948);
                var softSetHook = __webpack_require__(7199);
                var evHook = __webpack_require__(6505);
                module1.exports = h;
                function h(tagName, properties, children) {
                    var childNodes = [];
                    var tag, props, key, namespace;
                    if (!children && isChildren(properties)) {
                        children = properties;
                        props = {};
                    }
                    props = props || properties || {};
                    tag = parseTag(tagName, props);
                    // support keys
                    if (props.hasOwnProperty("key")) {
                        key = props.key;
                        props.key = undefined;
                    }
                    // support namespace
                    if (props.hasOwnProperty("namespace")) {
                        namespace = props.namespace;
                        props.namespace = undefined;
                    }
                    // fix cursor bug
                    if (tag === "INPUT" && !namespace && props.hasOwnProperty("value") && props.value !== undefined && !isHook(props.value)) props.value = softSetHook(props.value);
                    transformProperties(props);
                    if (children !== undefined && children !== null) addChild(children, childNodes, tag, props);
                    return new VNode(tag, props, childNodes, key, namespace);
                }
                function addChild(c, childNodes, tag, props) {
                    if (typeof c === "string") childNodes.push(new VText(c));
                    else if (typeof c === "number") childNodes.push(new VText(String(c)));
                    else if (isChild(c)) childNodes.push(c);
                    else if (isArray(c)) for(var i = 0; i < c.length; i++)addChild(c[i], childNodes, tag, props);
                    else if (c === null || c === undefined) return;
                    else throw UnexpectedVirtualElement({
                        foreignObject: c,
                        parentVnode: {
                            tagName: tag,
                            properties: props
                        }
                    });
                }
                function transformProperties(props) {
                    for(var propName in props)if (props.hasOwnProperty(propName)) {
                        var value = props[propName];
                        if (isHook(value)) continue;
                        if (propName.substr(0, 3) === "ev-") // add ev-foo support
                        props[propName] = evHook(value);
                    }
                }
                function isChild(x) {
                    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
                }
                function isChildren(x) {
                    return typeof x === "string" || isArray(x) || isChild(x);
                }
                function UnexpectedVirtualElement(data) {
                    var err = new Error();
                    err.type = "virtual-hyperscript.unexpected.virtual-element";
                    err.message = "Unexpected virtual child passed to h().\nExpected a VNode / Vthunk / VWidget / string but:\ngot:\n" + errorString(data.foreignObject) + ".\n" + "The parent vnode is:\n" + errorString(data.parentVnode);
                    "\nSuggested fix: change your `h(..., [ ... ])` callsite.";
                    err.foreignObject = data.foreignObject;
                    err.parentVnode = data.parentVnode;
                    return err;
                }
                function errorString(obj) {
                    try {
                        return JSON.stringify(obj, null, "    ");
                    } catch (e) {
                        return String(obj);
                    }
                }
            /***/ },
            /***/ 1948: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                "use strict";
                var split = __webpack_require__(6824);
                var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
                var notClassId = /^\.|#/;
                module1.exports = parseTag;
                function parseTag(tag, props) {
                    if (!tag) return "DIV";
                    var noId = !props.hasOwnProperty("id");
                    var tagParts = split(tag, classIdSplit);
                    var tagName = null;
                    if (notClassId.test(tagParts[1])) tagName = "DIV";
                    var classes, part, type, i;
                    for(i = 0; i < tagParts.length; i++){
                        part = tagParts[i];
                        if (!part) continue;
                        type = part.charAt(0);
                        if (!tagName) tagName = part;
                        else if (type === ".") {
                            classes = classes || [];
                            classes.push(part.substring(1, part.length));
                        } else if (type === "#" && noId) props.id = part.substring(1, part.length);
                    }
                    if (classes) {
                        if (props.className) classes.push(props.className);
                        props.className = classes.join(" ");
                    }
                    return props.namespace ? tagName : tagName.toUpperCase();
                }
            /***/ },
            /***/ 6078: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var isVNode = __webpack_require__(5170);
                var isVText = __webpack_require__(6221);
                var isWidget = __webpack_require__(4097);
                var isThunk = __webpack_require__(6741);
                module1.exports = handleThunk;
                function handleThunk(a, b) {
                    var renderedA = a;
                    var renderedB = b;
                    if (isThunk(b)) renderedB = renderThunk(b, a);
                    if (isThunk(a)) renderedA = renderThunk(a, null);
                    return {
                        a: renderedA,
                        b: renderedB
                    };
                }
                function renderThunk(thunk, previous) {
                    var renderedThunk = thunk.vnode;
                    if (!renderedThunk) renderedThunk = thunk.vnode = thunk.render(previous);
                    if (!(isVNode(renderedThunk) || isVText(renderedThunk) || isWidget(renderedThunk))) throw new Error("thunk did not return a valid node");
                    return renderedThunk;
                }
            /***/ },
            /***/ 6741: /***/ (module1)=>{
                module1.exports = isThunk;
                function isThunk(t) {
                    return t && t.type === "Thunk";
                }
            /***/ },
            /***/ 7265: /***/ (module1)=>{
                module1.exports = isHook;
                function isHook(hook) {
                    return hook && (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") || typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"));
                }
            /***/ },
            /***/ 5170: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var version = __webpack_require__(9962);
                module1.exports = isVirtualNode;
                function isVirtualNode(x) {
                    return x && x.type === "VirtualNode" && x.version === version;
                }
            /***/ },
            /***/ 6221: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var version = __webpack_require__(9962);
                module1.exports = isVirtualText;
                function isVirtualText(x) {
                    return x && x.type === "VirtualText" && x.version === version;
                }
            /***/ },
            /***/ 4097: /***/ (module1)=>{
                module1.exports = isWidget;
                function isWidget(w) {
                    return w && w.type === "Widget";
                }
            /***/ },
            /***/ 9962: /***/ (module1)=>{
                module1.exports = "2";
            /***/ },
            /***/ 4282: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var version = __webpack_require__(9962);
                var isVNode = __webpack_require__(5170);
                var isWidget = __webpack_require__(4097);
                var isThunk = __webpack_require__(6741);
                var isVHook = __webpack_require__(7265);
                module1.exports = VirtualNode;
                var noProperties = {};
                var noChildren = [];
                function VirtualNode(tagName, properties, children, key, namespace) {
                    this.tagName = tagName;
                    this.properties = properties || noProperties;
                    this.children = children || noChildren;
                    this.key = key != null ? String(key) : undefined;
                    this.namespace = typeof namespace === "string" ? namespace : null;
                    var count = children && children.length || 0;
                    var descendants = 0;
                    var hasWidgets = false;
                    var hasThunks = false;
                    var descendantHooks = false;
                    var hooks;
                    for(var propName in properties)if (properties.hasOwnProperty(propName)) {
                        var property = properties[propName];
                        if (isVHook(property) && property.unhook) {
                            if (!hooks) hooks = {};
                            hooks[propName] = property;
                        }
                    }
                    for(var i = 0; i < count; i++){
                        var child = children[i];
                        if (isVNode(child)) {
                            descendants += child.count || 0;
                            if (!hasWidgets && child.hasWidgets) hasWidgets = true;
                            if (!hasThunks && child.hasThunks) hasThunks = true;
                            if (!descendantHooks && (child.hooks || child.descendantHooks)) descendantHooks = true;
                        } else if (!hasWidgets && isWidget(child)) {
                            if (typeof child.destroy === "function") hasWidgets = true;
                        } else if (!hasThunks && isThunk(child)) hasThunks = true;
                    }
                    this.count = count + descendants;
                    this.hasWidgets = hasWidgets;
                    this.hasThunks = hasThunks;
                    this.hooks = hooks;
                    this.descendantHooks = descendantHooks;
                }
                VirtualNode.prototype.version = version;
                VirtualNode.prototype.type = "VirtualNode";
            /***/ },
            /***/ 8057: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var version = __webpack_require__(9962);
                VirtualPatch.NONE = 0;
                VirtualPatch.VTEXT = 1;
                VirtualPatch.VNODE = 2;
                VirtualPatch.WIDGET = 3;
                VirtualPatch.PROPS = 4;
                VirtualPatch.ORDER = 5;
                VirtualPatch.INSERT = 6;
                VirtualPatch.REMOVE = 7;
                VirtualPatch.THUNK = 8;
                module1.exports = VirtualPatch;
                function VirtualPatch(type, vNode, patch) {
                    this.type = Number(type);
                    this.vNode = vNode;
                    this.patch = patch;
                }
                VirtualPatch.prototype.version = version;
                VirtualPatch.prototype.type = "VirtualPatch";
            /***/ },
            /***/ 4268: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var version = __webpack_require__(9962);
                module1.exports = VirtualText;
                function VirtualText(text) {
                    this.text = String(text);
                }
                VirtualText.prototype.version = version;
                VirtualText.prototype.type = "VirtualText";
            /***/ },
            /***/ 9973: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var isObject = __webpack_require__(6240);
                var isHook = __webpack_require__(7265);
                module1.exports = diffProps;
                function diffProps(a, b) {
                    var diff;
                    for(var aKey in a){
                        if (!(aKey in b)) {
                            diff = diff || {};
                            diff[aKey] = undefined;
                        }
                        var aValue = a[aKey];
                        var bValue = b[aKey];
                        if (aValue === bValue) continue;
                        else if (isObject(aValue) && isObject(bValue)) {
                            if (getPrototype(bValue) !== getPrototype(aValue)) {
                                diff = diff || {};
                                diff[aKey] = bValue;
                            } else if (isHook(bValue)) {
                                diff = diff || {};
                                diff[aKey] = bValue;
                            } else {
                                var objectDiff = diffProps(aValue, bValue);
                                if (objectDiff) {
                                    diff = diff || {};
                                    diff[aKey] = objectDiff;
                                }
                            }
                        } else {
                            diff = diff || {};
                            diff[aKey] = bValue;
                        }
                    }
                    for(var bKey in b)if (!(bKey in a)) {
                        diff = diff || {};
                        diff[bKey] = b[bKey];
                    }
                    return diff;
                }
                function getPrototype(value) {
                    if (Object.getPrototypeOf) return Object.getPrototypeOf(value);
                    else if (value.__proto__) return value.__proto__;
                    else if (value.constructor) return value.constructor.prototype;
                }
            /***/ },
            /***/ 3072: /***/ (module1, __unused_webpack_exports, __webpack_require__)=>{
                var isArray = __webpack_require__(7362);
                var VPatch = __webpack_require__(8057);
                var isVNode = __webpack_require__(5170);
                var isVText = __webpack_require__(6221);
                var isWidget = __webpack_require__(4097);
                var isThunk = __webpack_require__(6741);
                var handleThunk = __webpack_require__(6078);
                var diffProps = __webpack_require__(9973);
                module1.exports = diff;
                function diff(a, b) {
                    var patch = {
                        a: a
                    };
                    walk(a, b, patch, 0);
                    return patch;
                }
                function walk(a, b, patch, index) {
                    if (a === b) return;
                    var apply = patch[index];
                    var applyClear = false;
                    if (isThunk(a) || isThunk(b)) thunks(a, b, patch, index);
                    else if (b == null) {
                        // If a is a widget we will add a remove patch for it
                        // Otherwise any child widgets/hooks must be destroyed.
                        // This prevents adding two remove patches for a widget.
                        if (!isWidget(a)) {
                            clearState(a, patch, index);
                            apply = patch[index];
                        }
                        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b));
                    } else if (isVNode(b)) {
                        if (isVNode(a)) {
                            if (a.tagName === b.tagName && a.namespace === b.namespace && a.key === b.key) {
                                var propsPatch = diffProps(a.properties, b.properties);
                                if (propsPatch) apply = appendPatch(apply, new VPatch(VPatch.PROPS, a, propsPatch));
                                apply = diffChildren(a, b, patch, apply, index);
                            } else {
                                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
                                applyClear = true;
                            }
                        } else {
                            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b));
                            applyClear = true;
                        }
                    } else if (isVText(b)) {
                        if (!isVText(a)) {
                            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
                            applyClear = true;
                        } else if (a.text !== b.text) apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b));
                    } else if (isWidget(b)) {
                        if (!isWidget(a)) applyClear = true;
                        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b));
                    }
                    if (apply) patch[index] = apply;
                    if (applyClear) clearState(a, patch, index);
                }
                function diffChildren(a, b, patch, apply, index) {
                    var aChildren = a.children;
                    var orderedSet = reorder(aChildren, b.children);
                    var bChildren = orderedSet.children;
                    var aLen = aChildren.length;
                    var bLen = bChildren.length;
                    var len = aLen > bLen ? aLen : bLen;
                    for(var i = 0; i < len; i++){
                        var leftNode = aChildren[i];
                        var rightNode = bChildren[i];
                        index += 1;
                        if (!leftNode) {
                            if (rightNode) // Excess nodes in b need to be added
                            apply = appendPatch(apply, new VPatch(VPatch.INSERT, null, rightNode));
                        } else walk(leftNode, rightNode, patch, index);
                        if (isVNode(leftNode) && leftNode.count) index += leftNode.count;
                    }
                    if (orderedSet.moves) // Reorder nodes last
                    apply = appendPatch(apply, new VPatch(VPatch.ORDER, a, orderedSet.moves));
                    return apply;
                }
                function clearState(vNode, patch, index) {
                    // TODO: Make this a single walk, not two
                    unhook(vNode, patch, index);
                    destroyWidgets(vNode, patch, index);
                }
                // Patch records for all destroyed widgets must be added because we need
                // a DOM node reference for the destroy function
                function destroyWidgets(vNode, patch, index) {
                    if (isWidget(vNode)) {
                        if (typeof vNode.destroy === "function") patch[index] = appendPatch(patch[index], new VPatch(VPatch.REMOVE, vNode, null));
                    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
                        var children = vNode.children;
                        var len = children.length;
                        for(var i = 0; i < len; i++){
                            var child = children[i];
                            index += 1;
                            destroyWidgets(child, patch, index);
                            if (isVNode(child) && child.count) index += child.count;
                        }
                    } else if (isThunk(vNode)) thunks(vNode, null, patch, index);
                }
                // Create a sub-patch for thunks
                function thunks(a, b, patch, index) {
                    var nodes = handleThunk(a, b);
                    var thunkPatch = diff(nodes.a, nodes.b);
                    if (hasPatches(thunkPatch)) patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch);
                }
                function hasPatches(patch) {
                    for(var index in patch){
                        if (index !== "a") return true;
                    }
                    return false;
                }
                // Execute hooks when two nodes are identical
                function unhook(vNode, patch, index) {
                    if (isVNode(vNode)) {
                        if (vNode.hooks) patch[index] = appendPatch(patch[index], new VPatch(VPatch.PROPS, vNode, undefinedKeys(vNode.hooks)));
                        if (vNode.descendantHooks || vNode.hasThunks) {
                            var children = vNode.children;
                            var len = children.length;
                            for(var i = 0; i < len; i++){
                                var child = children[i];
                                index += 1;
                                unhook(child, patch, index);
                                if (isVNode(child) && child.count) index += child.count;
                            }
                        }
                    } else if (isThunk(vNode)) thunks(vNode, null, patch, index);
                }
                function undefinedKeys(obj) {
                    var result = {};
                    for(var key in obj)result[key] = undefined;
                    return result;
                }
                // List diff, naive left to right reordering
                function reorder(aChildren, bChildren) {
                    // O(M) time, O(M) memory
                    var bChildIndex = keyIndex(bChildren);
                    var bKeys = bChildIndex.keys;
                    var bFree = bChildIndex.free;
                    if (bFree.length === bChildren.length) return {
                        children: bChildren,
                        moves: null
                    };
                    // O(N) time, O(N) memory
                    var aChildIndex = keyIndex(aChildren);
                    var aKeys = aChildIndex.keys;
                    var aFree = aChildIndex.free;
                    if (aFree.length === aChildren.length) return {
                        children: bChildren,
                        moves: null
                    };
                    // O(MAX(N, M)) memory
                    var newChildren = [];
                    var freeIndex = 0;
                    var freeCount = bFree.length;
                    var deletedItems = 0;
                    // Iterate through a and match a node in b
                    // O(N) time,
                    for(var i = 0; i < aChildren.length; i++){
                        var aItem = aChildren[i];
                        var itemIndex;
                        if (aItem.key) {
                            if (bKeys.hasOwnProperty(aItem.key)) {
                                // Match up the old keys
                                itemIndex = bKeys[aItem.key];
                                newChildren.push(bChildren[itemIndex]);
                            } else {
                                // Remove old keyed items
                                itemIndex = i - deletedItems++;
                                newChildren.push(null);
                            }
                        } else // Match the item in a with the next free item in b
                        if (freeIndex < freeCount) {
                            itemIndex = bFree[freeIndex++];
                            newChildren.push(bChildren[itemIndex]);
                        } else {
                            // There are no free items in b to match with
                            // the free items in a, so the extra free nodes
                            // are deleted.
                            itemIndex = i - deletedItems++;
                            newChildren.push(null);
                        }
                    }
                    var lastFreeIndex = freeIndex >= bFree.length ? bChildren.length : bFree[freeIndex];
                    // Iterate through b and append any new keys
                    // O(M) time
                    for(var j = 0; j < bChildren.length; j++){
                        var newItem = bChildren[j];
                        if (newItem.key) {
                            if (!aKeys.hasOwnProperty(newItem.key)) // Add any new keyed items
                            // We are adding new items to the end and then sorting them
                            // in place. In future we should insert new items in place.
                            newChildren.push(newItem);
                        } else if (j >= lastFreeIndex) // Add any leftover non-keyed items
                        newChildren.push(newItem);
                    }
                    var simulate = newChildren.slice();
                    var simulateIndex = 0;
                    var removes = [];
                    var inserts = [];
                    var simulateItem;
                    for(var k = 0; k < bChildren.length;){
                        var wantedItem = bChildren[k];
                        simulateItem = simulate[simulateIndex];
                        // remove items
                        while(simulateItem === null && simulate.length){
                            removes.push(remove(simulate, simulateIndex, null));
                            simulateItem = simulate[simulateIndex];
                        }
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            // if we need a key in this position...
                            if (wantedItem.key) {
                                if (simulateItem && simulateItem.key) {
                                    // if an insert doesn't put this key in place, it needs to move
                                    if (bKeys[simulateItem.key] !== k + 1) {
                                        removes.push(remove(simulate, simulateIndex, simulateItem.key));
                                        simulateItem = simulate[simulateIndex];
                                        // if the remove didn't put the wanted item in place, we need to insert it
                                        if (!simulateItem || simulateItem.key !== wantedItem.key) inserts.push({
                                            key: wantedItem.key,
                                            to: k
                                        });
                                        else simulateIndex++;
                                    } else inserts.push({
                                        key: wantedItem.key,
                                        to: k
                                    });
                                } else inserts.push({
                                    key: wantedItem.key,
                                    to: k
                                });
                                k++;
                            } else if (simulateItem && simulateItem.key) removes.push(remove(simulate, simulateIndex, simulateItem.key));
                        } else {
                            simulateIndex++;
                            k++;
                        }
                    }
                    // remove all the remaining nodes from simulate
                    while(simulateIndex < simulate.length){
                        simulateItem = simulate[simulateIndex];
                        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key));
                    }
                    // If the only moves we have are deletes then we can just
                    // let the delete patch remove these items.
                    if (removes.length === deletedItems && !inserts.length) return {
                        children: newChildren,
                        moves: null
                    };
                    return {
                        children: newChildren,
                        moves: {
                            removes: removes,
                            inserts: inserts
                        }
                    };
                }
                function remove(arr, index, key) {
                    arr.splice(index, 1);
                    return {
                        from: index,
                        key: key
                    };
                }
                function keyIndex(children) {
                    var keys = {};
                    var free = [];
                    var length = children.length;
                    for(var i = 0; i < length; i++){
                        var child = children[i];
                        if (child.key) keys[child.key] = i;
                        else free.push(i);
                    }
                    return {
                        keys: keys,
                        free: free // An array of unkeyed item indices
                    };
                }
                function appendPatch(apply, patch) {
                    if (apply) {
                        if (isArray(apply)) apply.push(patch);
                        else apply = [
                            apply,
                            patch
                        ];
                        return apply;
                    } else return patch;
                }
            /***/ },
            /***/ 4991: /***/ (module1)=>{
                "use strict";
                /**
 * @param {TypedArray} array - Subarray of audio to calculate peaks from.
 */ function findMinMax(array) {
                    var min = Infinity;
                    var max = -Infinity;
                    var i = 0;
                    var len = array.length;
                    var curr;
                    for(; i < len; i++){
                        curr = array[i];
                        if (min > curr) min = curr;
                        if (max < curr) max = curr;
                    }
                    return {
                        min: min,
                        max: max
                    };
                }
                /**
 * @param {Number} n - peak to convert from float to Int8, Int16 etc.
 * @param {Number} bits - convert to #bits two's complement signed integer
 */ function convert(n, bits) {
                    var max = Math.pow(2, bits - 1);
                    var v = n < 0 ? n * max : n * (max - 1);
                    return Math.max(-max, Math.min(max - 1, v));
                }
                /**
 * @param {TypedArray} channel - Audio track frames to calculate peaks from.
 * @param {Number} samplesPerPixel - Audio frames per peak
 */ function extractPeaks(channel, samplesPerPixel, bits) {
                    var i;
                    var chanLength = channel.length;
                    var numPeaks = Math.ceil(chanLength / samplesPerPixel);
                    var start;
                    var end;
                    var segment;
                    var max;
                    var min;
                    var extrema;
                    //create interleaved array of min,max
                    var peaks = makeTypedArray(bits, numPeaks * 2);
                    for(i = 0; i < numPeaks; i++){
                        start = i * samplesPerPixel;
                        end = (i + 1) * samplesPerPixel > chanLength ? chanLength : (i + 1) * samplesPerPixel;
                        segment = channel.subarray(start, end);
                        extrema = findMinMax(segment);
                        min = convert(extrema.min, bits);
                        max = convert(extrema.max, bits);
                        peaks[i * 2] = min;
                        peaks[i * 2 + 1] = max;
                    }
                    return peaks;
                }
                function makeTypedArray(bits, length) {
                    return new (new Function(`return Int${bits}Array`)())(length);
                }
                function makeMono(channelPeaks, bits) {
                    var numChan = channelPeaks.length;
                    var weight = 1 / numChan;
                    var numPeaks = channelPeaks[0].length / 2;
                    var c = 0;
                    var i = 0;
                    var min;
                    var max;
                    var peaks = makeTypedArray(bits, numPeaks * 2);
                    for(i = 0; i < numPeaks; i++){
                        min = 0;
                        max = 0;
                        for(c = 0; c < numChan; c++){
                            min += weight * channelPeaks[c][i * 2];
                            max += weight * channelPeaks[c][i * 2 + 1];
                        }
                        peaks[i * 2] = min;
                        peaks[i * 2 + 1] = max;
                    }
                    //return in array so channel number counts still work.
                    return [
                        peaks
                    ];
                }
                function defaultNumber(value, defaultNumber) {
                    if (typeof value === "number") return value;
                    else return defaultNumber;
                }
                /**
 * @param {AudioBuffer,TypedArray} source - Source of audio samples for peak calculations.
 * @param {Number} samplesPerPixel - Number of audio samples per peak.
 * @param {Boolean} isMono - Whether to render the channels to a single array.
 * @param {Number} cueIn - index in channel to start peak calculations from.
 * @param {Number} cueOut - index in channel to end peak calculations from (non-inclusive).
 * @param {Number} bits - number of bits for a peak.
 */ module1.exports = function(source, samplesPerPixel, isMono, cueIn, cueOut, bits) {
                    samplesPerPixel = defaultNumber(samplesPerPixel, 1000);
                    bits = defaultNumber(bits, 16);
                    if (isMono === null || isMono === undefined) isMono = true;
                    if ([
                        8,
                        16,
                        32
                    ].indexOf(bits) < 0) throw new Error("Invalid number of bits specified for peaks.");
                    var numChan = source.numberOfChannels;
                    var peaks = [];
                    var c;
                    var numPeaks;
                    var channel;
                    var slice;
                    cueIn = defaultNumber(cueIn, 0);
                    cueOut = defaultNumber(cueOut, source.length);
                    if (typeof source.subarray === "undefined") for(c = 0; c < numChan; c++){
                        channel = source.getChannelData(c);
                        slice = channel.subarray(cueIn, cueOut);
                        peaks.push(extractPeaks(slice, samplesPerPixel, bits));
                    }
                    else peaks.push(extractPeaks(source.subarray(cueIn, cueOut), samplesPerPixel, bits));
                    if (isMono && peaks.length > 1) peaks = makeMono(peaks, bits);
                    numPeaks = peaks[0].length / 2;
                    return {
                        length: numPeaks,
                        data: peaks,
                        bits: bits
                    };
                };
            /***/ },
            /***/ 7362: /***/ (module1)=>{
                var nativeIsArray = Array.isArray;
                var toString = Object.prototype.toString;
                module1.exports = nativeIsArray || isArray;
                function isArray(obj) {
                    return toString.call(obj) === "[object Array]";
                }
            /***/ },
            /***/ 5893: /***/ ()=>{
            /* (ignored) */ /***/ }
        };
        /************************************************************************/ /******/ // The module cache
        /******/ var __webpack_module_cache__ = {};
        /******/ /******/ // The require function
        /******/ function __webpack_require__(moduleId) {
            /******/ // Check if module is in cache
            /******/ var cachedModule = __webpack_module_cache__[moduleId];
            /******/ if (cachedModule !== undefined) /******/ return cachedModule.exports;
            /******/ // Create a new module (and put it into the cache)
            /******/ var module1 = __webpack_module_cache__[moduleId] = {
                /******/ id: moduleId,
                /******/ loaded: false,
                /******/ exports: {}
            };
            /******/ /******/ // Execute the module function
            /******/ __webpack_modules__[moduleId](module1, module1.exports, __webpack_require__);
            /******/ /******/ // Flag the module as loaded
            /******/ module1.loaded = true;
            /******/ /******/ // Return the exports of the module
            /******/ return module1.exports;
        /******/ }
        /******/ /************************************************************************/ /******/ /* webpack/runtime/compat get default export */ /******/ (()=>{
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/ __webpack_require__.n = (module1)=>{
                /******/ var getter = module1 && module1.__esModule ? /******/ ()=>module1["default"] : /******/ ()=>module1;
                /******/ __webpack_require__.d(getter, {
                    a: getter
                });
                /******/ return getter;
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/define property getters */ /******/ (()=>{
            /******/ // define getter functions for harmony exports
            /******/ __webpack_require__.d = (exports, definition)=>{
                /******/ for(var key in definition)/******/ if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) /******/ Object.defineProperty(exports, key, {
                    enumerable: true,
                    get: definition[key]
                });
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/global */ /******/ (()=>{
            /******/ __webpack_require__.g = function() {
                /******/ if (typeof globalThis === "object") return globalThis;
                /******/ try {
                    /******/ return this || new Function("return this")();
                /******/ } catch (e) {
                    /******/ if (typeof window === "object") return window;
                /******/ }
            /******/ }();
        /******/ })();
        /******/ /******/ /* webpack/runtime/hasOwnProperty shorthand */ /******/ (()=>{
            /******/ __webpack_require__.o = (obj, prop)=>Object.prototype.hasOwnProperty.call(obj, prop);
        /******/ })();
        /******/ /******/ /* webpack/runtime/make namespace object */ /******/ (()=>{
            /******/ // define __esModule on exports
            /******/ __webpack_require__.r = (exports)=>{
                /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module"
                });
                /******/ Object.defineProperty(exports, "__esModule", {
                    value: true
                });
            /******/ };
        /******/ })();
        /******/ /******/ /* webpack/runtime/node module decorator */ /******/ (()=>{
            /******/ __webpack_require__.nmd = (module1)=>{
                /******/ module1.paths = [];
                /******/ if (!module1.children) module1.children = [];
                /******/ return module1;
            /******/ };
        /******/ })();
        /******/ /************************************************************************/ var __webpack_exports__ = {};
        // This entry need to be wrapped in an IIFE because it need to be in strict mode.
        (()=>{
            "use strict";
            // ESM COMPAT FLAG
            __webpack_require__.r(__webpack_exports__);
            // EXPORTS
            __webpack_require__.d(__webpack_exports__, {
                "default": ()=>/* binding */ app,
                "init": ()=>/* binding */ init
            });
            // EXTERNAL MODULE: ./node_modules/lodash.defaultsdeep/index.js
            var lodash_defaultsdeep = __webpack_require__(2098);
            var lodash_defaultsdeep_default = /*#__PURE__*/ __webpack_require__.n(lodash_defaultsdeep);
            // EXTERNAL MODULE: ./node_modules/virtual-dom/create-element.js
            var create_element = __webpack_require__(4935);
            var create_element_default = /*#__PURE__*/ __webpack_require__.n(create_element);
            // EXTERNAL MODULE: ./node_modules/event-emitter/index.js
            var event_emitter = __webpack_require__(8370);
            var event_emitter_default = /*#__PURE__*/ __webpack_require__.n(event_emitter);
            // EXTERNAL MODULE: ./node_modules/virtual-dom/h.js
            var h = __webpack_require__(347);
            var h_default = /*#__PURE__*/ __webpack_require__.n(h);
            // EXTERNAL MODULE: ./node_modules/virtual-dom/diff.js
            var diff = __webpack_require__(7921);
            var diff_default = /*#__PURE__*/ __webpack_require__.n(diff);
            // EXTERNAL MODULE: ./node_modules/virtual-dom/patch.js
            var patch = __webpack_require__(9720);
            var patch_default = /*#__PURE__*/ __webpack_require__.n(patch);
            // EXTERNAL MODULE: ./node_modules/inline-worker/index.js
            var inline_worker = __webpack_require__(849);
            var inline_worker_default = /*#__PURE__*/ __webpack_require__.n(inline_worker);
            function samplesToSeconds(samples, sampleRate) {
                return samples / sampleRate;
            }
            function secondsToSamples(seconds, sampleRate) {
                return Math.ceil(seconds * sampleRate);
            }
            function samplesToPixels(samples, resolution) {
                return Math.floor(samples / resolution);
            }
            function pixelsToSamples(pixels, resolution) {
                return Math.floor(pixels * resolution);
            }
            function pixelsToSeconds(pixels, resolution, sampleRate) {
                return pixels * resolution / sampleRate;
            }
            function secondsToPixels(seconds, resolution, sampleRate) {
                return Math.ceil(seconds * sampleRate / resolution);
            }
            function resampleAudioBuffer(audioBuffer, targetSampleRate) {
                // `ceil` is needed because `length` must be in integer greater than 0 and
                // resampling a single sample to a lower sample rate will yield a value value < 1.
                const length = Math.ceil(audioBuffer.duration * targetSampleRate);
                const ac = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(audioBuffer.numberOfChannels, length, targetSampleRate);
                const src = ac.createBufferSource();
                src.buffer = audioBuffer;
                src.connect(ac.destination);
                src.start();
                return ac.startRendering();
            }
            const STATE_UNINITIALIZED = 0;
            const STATE_LOADING = 1;
            const STATE_DECODING = 2;
            const STATE_FINISHED = 3;
            /* harmony default export */ const loader_Loader = class {
                constructor(src, audioContext, ee = event_emitter_default()()){
                    this.src = src;
                    this.ac = audioContext;
                    this.audioRequestState = STATE_UNINITIALIZED;
                    this.ee = ee;
                }
                setStateChange(state) {
                    this.audioRequestState = state;
                    this.ee.emit("audiorequeststatechange", this.audioRequestState, this.src);
                }
                fileProgress(e) {
                    let percentComplete = 0;
                    if (this.audioRequestState === STATE_UNINITIALIZED) this.setStateChange(STATE_LOADING);
                    if (e.lengthComputable) percentComplete = e.loaded / e.total * 100;
                    this.ee.emit("loadprogress", percentComplete, this.src);
                }
                fileLoad(e) {
                    const audioData = e.target.response || e.target.result;
                    this.setStateChange(STATE_DECODING);
                    return new Promise((resolve, reject)=>{
                        this.ac.decodeAudioData(audioData, (audioBuffer)=>{
                            this.audioBuffer = audioBuffer;
                            this.setStateChange(STATE_FINISHED);
                            resolve(audioBuffer);
                        }, (err)=>{
                            if (err === null) // Safari issues with null error
                            reject(Error("MediaDecodeAudioDataUnknownContentType"));
                            else reject(err);
                        });
                    });
                }
                fetchLoad(arrayBuffer) {
                    this.setStateChange(STATE_DECODING);
                    return new Promise((resolve, reject)=>{
                        this.ac.decodeAudioData(arrayBuffer, (audioBuffer)=>{
                            this.audioBuffer = audioBuffer;
                            this.setStateChange(STATE_FINISHED);
                            resolve(audioBuffer);
                        }, (err)=>{
                            if (err === null) // Safari issues with null error
                            reject(Error("MediaDecodeAudioDataUnknownContentType"));
                            else reject(err);
                        });
                    });
                }
            };
            /* harmony default export */ const BlobLoader = class extends loader_Loader {
                /*
   * Loads an audio file via a FileReader
   */ load() {
                    return new Promise((resolve, reject)=>{
                        if (this.src.type.match(/audio.*/) || // added for problems with Firefox mime types + ogg.
                        this.src.type.match(/video\/ogg/)) {
                            const fr = new FileReader();
                            fr.readAsArrayBuffer(this.src);
                            fr.addEventListener("progress", (e)=>{
                                super.fileProgress(e);
                            });
                            fr.addEventListener("load", (e)=>{
                                const decoderPromise = super.fileLoad(e);
                                decoderPromise.then((audioBuffer)=>{
                                    resolve(audioBuffer);
                                }).catch(reject);
                            });
                            fr.addEventListener("error", reject);
                        } else reject(Error(`Unsupported file type ${this.src.type}`));
                    });
                }
            };
            class IdentityLoader extends loader_Loader {
                load() {
                    return Promise.resolve(this.src);
                }
            }
            /* harmony default export */ const XHRLoader = class extends loader_Loader {
                /**
   * Loads an audio file via XHR.
   */ load() {
                    return new Promise((resolve, reject)=>{
                        const xhr = new XMLHttpRequest();
                        xhr.open("GET", this.src, true);
                        xhr.responseType = "arraybuffer";
                        xhr.send();
                        xhr.addEventListener("progress", (e)=>{
                            super.fileProgress(e);
                        });
                        xhr.addEventListener("load", (e)=>{
                            const decoderPromise = super.fileLoad(e);
                            decoderPromise.then((audioBuffer)=>{
                                resolve(audioBuffer);
                            }).catch(reject);
                        });
                        xhr.addEventListener("error", ()=>{
                            reject(Error(`Track ${this.src} failed to load`));
                        });
                    });
                }
            };
            /* harmony default export */ const FetchLoader = class extends /* unused pure expression or super */ null {
                /**
   * Loads an audio file via fetch API.
   */ load() {
                    return new Promise((resolve, reject)=>{
                        fetch(this.src).then((data)=>data.arrayBuffer()).then((arrayBuffer)=>super.fetchLoad(arrayBuffer)).then((decodedAudio)=>resolve(decodedAudio)).catch((err)=>{
                            reject(Error(`Track ${this.src} failed to load with error: ${err}`));
                        });
                    });
                }
            };
            /* harmony default export */ const LoaderFactory = class {
                static createLoader(src, audioContext, ee) {
                    if (src instanceof Blob) return new BlobLoader(src, audioContext, ee);
                    else if (src instanceof AudioBuffer) return new IdentityLoader(src, audioContext, ee);
                    else if (typeof src === "string") return new XHRLoader(src, audioContext, ee);
                    throw new Error("Unsupported src type");
                }
            };
            /*
 * virtual-dom hook for scrolling the track container.
 */ /* harmony default export */ const ScrollHook = class {
                constructor(playlist){
                    this.playlist = playlist;
                }
                hook(node) {
                    const playlist = this.playlist;
                    if (!playlist.isScrolling) {
                        const el = node;
                        if (playlist.isAutomaticScroll) {
                            const rect = node.getBoundingClientRect();
                            const controlWidth = playlist.controls.show ? playlist.controls.width : 0;
                            const width = pixelsToSeconds(rect.width - controlWidth, playlist.samplesPerPixel, playlist.sampleRate);
                            const timePoint = playlist.isPlaying() ? playlist.playbackSeconds : playlist.getTimeSelection().start;
                            if (timePoint < playlist.scrollLeft || timePoint >= playlist.scrollLeft + width) playlist.scrollLeft = Math.min(timePoint, playlist.duration - width);
                        }
                        const left = secondsToPixels(playlist.scrollLeft, playlist.samplesPerPixel, playlist.sampleRate);
                        el.scrollLeft = left;
                    }
                }
            };
            /*
 * virtual-dom hook for rendering the time scale canvas.
 */ /* harmony default export */ const TimeScaleHook = class {
                constructor(tickInfo, offset, samplesPerPixel, duration, colors){
                    this.tickInfo = tickInfo;
                    this.offset = offset;
                    this.samplesPerPixel = samplesPerPixel;
                    this.duration = duration;
                    this.colors = colors;
                }
                hook(canvas, prop, prev) {
                    // canvas is up to date
                    if (prev !== undefined && prev.offset === this.offset && prev.duration === this.duration && prev.samplesPerPixel === this.samplesPerPixel) return;
                    const width = canvas.width;
                    const height = canvas.height;
                    const ctx = canvas.getContext("2d");
                    ctx.clearRect(0, 0, width, height);
                    ctx.fillStyle = this.colors.timeColor;
                    Object.keys(this.tickInfo).forEach((x)=>{
                        const scaleHeight = this.tickInfo[x];
                        const scaleY = height - scaleHeight;
                        ctx.fillRect(x, scaleY, 1, scaleHeight);
                    });
                }
            };
            class TimeScale {
                constructor(duration, offset, samplesPerPixel, sampleRate, marginLeft = 0, colors){
                    this.duration = duration;
                    this.offset = offset;
                    this.samplesPerPixel = samplesPerPixel;
                    this.sampleRate = sampleRate;
                    this.marginLeft = marginLeft;
                    this.colors = colors;
                    this.timeinfo = {
                        20000: {
                            marker: 30000,
                            bigStep: 10000,
                            smallStep: 5000,
                            secondStep: 5
                        },
                        12000: {
                            marker: 15000,
                            bigStep: 5000,
                            smallStep: 1000,
                            secondStep: 1
                        },
                        10000: {
                            marker: 10000,
                            bigStep: 5000,
                            smallStep: 1000,
                            secondStep: 1
                        },
                        5000: {
                            marker: 5000,
                            bigStep: 1000,
                            smallStep: 500,
                            secondStep: 0.5
                        },
                        2500: {
                            marker: 2000,
                            bigStep: 1000,
                            smallStep: 500,
                            secondStep: 0.5
                        },
                        1500: {
                            marker: 2000,
                            bigStep: 1000,
                            smallStep: 200,
                            secondStep: 0.2
                        },
                        700: {
                            marker: 1000,
                            bigStep: 500,
                            smallStep: 100,
                            secondStep: 0.1
                        }
                    };
                }
                getScaleInfo(resolution) {
                    let keys = Object.keys(this.timeinfo).map((item)=>parseInt(item, 10));
                    // make sure keys are numerically sorted.
                    keys = keys.sort((a, b)=>a - b);
                    for(let i = 0; i < keys.length; i += 1){
                        if (resolution <= keys[i]) return this.timeinfo[keys[i]];
                    }
                    return this.timeinfo[keys[0]];
                }
                /*
    Return time in format mm:ss
  */ static formatTime(milliseconds) {
                    const seconds = milliseconds / 1000;
                    let s = seconds % 60;
                    const m = (seconds - s) / 60;
                    if (s < 10) s = `0${s}`;
                    return `${m}:${s}`;
                }
                render() {
                    const widthX = secondsToPixels(this.duration, this.samplesPerPixel, this.sampleRate);
                    const pixPerSec = this.sampleRate / this.samplesPerPixel;
                    const pixOffset = secondsToPixels(this.offset, this.samplesPerPixel, this.sampleRate);
                    const scaleInfo = this.getScaleInfo(this.samplesPerPixel);
                    const canvasInfo = {};
                    const timeMarkers = [];
                    const end = widthX + pixOffset;
                    let counter = 0;
                    for(let i = 0; i < end; i += pixPerSec * scaleInfo.secondStep){
                        const pixIndex = Math.floor(i);
                        const pix = pixIndex - pixOffset;
                        if (pixIndex >= pixOffset) {
                            // put a timestamp every 30 seconds.
                            if (scaleInfo.marker && counter % scaleInfo.marker === 0) {
                                timeMarkers.push(h_default()("div.time", {
                                    attributes: {
                                        style: `position: absolute; left: ${pix}px;`
                                    }
                                }, [
                                    TimeScale.formatTime(counter)
                                ]));
                                canvasInfo[pix] = 10;
                            } else if (scaleInfo.bigStep && counter % scaleInfo.bigStep === 0) canvasInfo[pix] = 5;
                            else if (scaleInfo.smallStep && counter % scaleInfo.smallStep === 0) canvasInfo[pix] = 2;
                        }
                        counter += 1000 * scaleInfo.secondStep;
                    }
                    return h_default()("div.playlist-time-scale", {
                        attributes: {
                            style: `position: relative; left: 0; right: 0; margin-left: ${this.marginLeft}px;`
                        }
                    }, [
                        timeMarkers,
                        h_default()("canvas", {
                            attributes: {
                                width: widthX,
                                height: 30,
                                style: "position: absolute; left: 0; right: 0; top: 0; bottom: 0;"
                            },
                            hook: new TimeScaleHook(canvasInfo, this.offset, this.samplesPerPixel, this.duration, this.colors)
                        })
                    ]);
                }
            }
            /* harmony default export */ const src_TimeScale = TimeScale;
            // EXTERNAL MODULE: ./node_modules/lodash.assign/index.js
            var lodash_assign = __webpack_require__(1730);
            var lodash_assign_default = /*#__PURE__*/ __webpack_require__.n(lodash_assign);
            // EXTERNAL MODULE: ./node_modules/lodash.forown/index.js
            var lodash_forown = __webpack_require__(3520);
            var lodash_forown_default = /*#__PURE__*/ __webpack_require__.n(lodash_forown);
            // Unique ID creation requires a high quality random # generator. In the browser we therefore
            // require the crypto API and do not support built-in fallback to lower quality random number
            // generators (like Math.random()).
            var getRandomValues;
            var rnds8 = new Uint8Array(16);
            function rng() {
                // lazy load so that environments that need to polyfill have a chance to do so
                if (!getRandomValues) {
                    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
                    // find the complete implementation of crypto (msCrypto) on IE11.
                    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
                    if (!getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
                }
                return getRandomValues(rnds8);
            }
            /* harmony default export */ const regex = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
            function validate(uuid) {
                return typeof uuid === "string" && regex.test(uuid);
            }
            /* harmony default export */ const esm_browser_validate = validate;
            /**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
            for(var i = 0; i < 256; ++i)byteToHex.push((i + 0x100).toString(16).substr(1));
            function stringify(arr) {
                var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
                // Note: Be careful editing this code!  It's been tuned for performance
                // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
                var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
                // of the following:
                // - One or more input array values don't map to a hex octet (leading to
                // "undefined" in the uuid)
                // - Invalid input values for the RFC `version` or `variant` fields
                if (!esm_browser_validate(uuid)) throw TypeError("Stringified UUID is invalid");
                return uuid;
            }
            /* harmony default export */ const esm_browser_stringify = stringify;
            function v4(options, buf, offset) {
                options = options || {};
                var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
                rnds[6] = rnds[6] & 0x0f | 0x40;
                rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
                if (buf) {
                    offset = offset || 0;
                    for(var i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
                    return buf;
                }
                return esm_browser_stringify(rnds);
            }
            /* harmony default export */ const esm_browser_v4 = v4;
            // EXTERNAL MODULE: ./node_modules/webaudio-peaks/index.js
            var webaudio_peaks = __webpack_require__(4991);
            var webaudio_peaks_default = /*#__PURE__*/ __webpack_require__.n(webaudio_peaks);
            // EXTERNAL MODULE: ./node_modules/fade-maker/index.js
            var fade_maker = __webpack_require__(1114);
            /* harmony default export */ const CursorState = class {
                constructor(track){
                    this.track = track;
                }
                setup(samplesPerPixel, sampleRate) {
                    this.samplesPerPixel = samplesPerPixel;
                    this.sampleRate = sampleRate;
                }
                click(e) {
                    e.preventDefault();
                    const startX = e.offsetX;
                    const startTime = pixelsToSeconds(startX, this.samplesPerPixel, this.sampleRate);
                    this.track.ee.emit("select", startTime, startTime, this.track);
                }
                static getClass() {
                    return ".state-cursor";
                }
                static getEvents() {
                    return [
                        "click"
                    ];
                }
            };
            /* harmony default export */ const SelectState = class {
                constructor(track){
                    this.track = track;
                    this.active = false;
                }
                setup(samplesPerPixel, sampleRate) {
                    this.samplesPerPixel = samplesPerPixel;
                    this.sampleRate = sampleRate;
                }
                emitSelection(x) {
                    const minX = Math.min(x, this.startX);
                    const maxX = Math.max(x, this.startX);
                    const startTime = pixelsToSeconds(minX, this.samplesPerPixel, this.sampleRate);
                    const endTime = pixelsToSeconds(maxX, this.samplesPerPixel, this.sampleRate);
                    this.track.ee.emit("select", startTime, endTime, this.track);
                }
                complete(x) {
                    this.emitSelection(x);
                    this.active = false;
                }
                mousedown(e) {
                    e.preventDefault();
                    this.active = true;
                    this.startX = e.offsetX;
                    const startTime = pixelsToSeconds(this.startX, this.samplesPerPixel, this.sampleRate);
                    this.track.ee.emit("select", startTime, startTime, this.track);
                }
                mousemove(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.emitSelection(e.offsetX);
                    }
                }
                mouseup(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.complete(e.offsetX);
                    }
                }
                mouseleave(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.complete(e.offsetX);
                    }
                }
                static getClass() {
                    return ".state-select";
                }
                static getEvents() {
                    return [
                        "mousedown",
                        "mousemove",
                        "mouseup",
                        "mouseleave"
                    ];
                }
            };
            /* harmony default export */ const ShiftState = class {
                constructor(track){
                    this.track = track;
                    this.active = false;
                }
                setup(samplesPerPixel, sampleRate) {
                    this.samplesPerPixel = samplesPerPixel;
                    this.sampleRate = sampleRate;
                }
                emitShift(x) {
                    const deltaX = x - this.prevX;
                    const deltaTime = pixelsToSeconds(deltaX, this.samplesPerPixel, this.sampleRate);
                    this.prevX = x;
                    this.track.ee.emit("shift", deltaTime, this.track);
                }
                complete(x) {
                    this.emitShift(x);
                    this.active = false;
                }
                mousedown(e) {
                    e.preventDefault();
                    this.active = true;
                    this.el = e.target;
                    this.prevX = e.offsetX;
                }
                mousemove(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.emitShift(e.offsetX);
                    }
                }
                mouseup(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.complete(e.offsetX);
                    }
                }
                mouseleave(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.complete(e.offsetX);
                    }
                }
                static getClass() {
                    return ".state-shift";
                }
                static getEvents() {
                    return [
                        "mousedown",
                        "mousemove",
                        "mouseup",
                        "mouseleave"
                    ];
                }
            };
            /* harmony default export */ const FadeInState = class {
                constructor(track){
                    this.track = track;
                }
                setup(samplesPerPixel, sampleRate) {
                    this.samplesPerPixel = samplesPerPixel;
                    this.sampleRate = sampleRate;
                }
                click(e) {
                    const startX = e.offsetX;
                    const time = pixelsToSeconds(startX, this.samplesPerPixel, this.sampleRate);
                    if (time > this.track.getStartTime() && time < this.track.getEndTime()) this.track.ee.emit("fadein", time - this.track.getStartTime(), this.track);
                }
                static getClass() {
                    return ".state-fadein";
                }
                static getEvents() {
                    return [
                        "click"
                    ];
                }
            };
            /* harmony default export */ const FadeOutState = class {
                constructor(track){
                    this.track = track;
                }
                setup(samplesPerPixel, sampleRate) {
                    this.samplesPerPixel = samplesPerPixel;
                    this.sampleRate = sampleRate;
                }
                click(e) {
                    const startX = e.offsetX;
                    const time = pixelsToSeconds(startX, this.samplesPerPixel, this.sampleRate);
                    if (time > this.track.getStartTime() && time < this.track.getEndTime()) this.track.ee.emit("fadeout", this.track.getEndTime() - time, this.track);
                }
                static getClass() {
                    return ".state-fadeout";
                }
                static getEvents() {
                    return [
                        "click"
                    ];
                }
            };
            /* harmony default export */ const states = {
                cursor: CursorState,
                select: SelectState,
                shift: ShiftState,
                fadein: FadeInState,
                fadeout: FadeOutState
            };
            /*
 * virtual-dom hook for drawing to the canvas element.
 */ class CanvasHook {
                constructor(peaks, offset, bits, color, scale, height, barWidth, barGap){
                    this.peaks = peaks;
                    // http://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element
                    this.offset = offset;
                    this.color = color;
                    this.bits = bits;
                    this.scale = scale;
                    this.height = height;
                    this.barWidth = barWidth;
                    this.barGap = barGap;
                }
                static drawFrame(cc, h2, x, minPeak, maxPeak, width, gap) {
                    const min = Math.abs(minPeak * h2);
                    const max = Math.abs(maxPeak * h2);
                    // draw max
                    cc.fillRect(x, 0, width, h2 - max);
                    // draw min
                    cc.fillRect(x, h2 + min, width, h2 - min);
                    // draw gap
                    if (gap !== 0) cc.fillRect(x + width, 0, gap, h2 * 2);
                }
                hook(canvas, prop, prev) {
                    // canvas is up to date
                    if (prev !== undefined && prev.peaks === this.peaks && prev.scale === this.scale && prev.height === this.height) return;
                    const scale = this.scale;
                    const len = canvas.width / scale;
                    const cc = canvas.getContext("2d");
                    const h2 = canvas.height / scale / 2;
                    const maxValue = 2 ** (this.bits - 1);
                    const width = this.barWidth;
                    const gap = this.barGap;
                    const barStart = width + gap;
                    cc.clearRect(0, 0, canvas.width, canvas.height);
                    cc.save();
                    cc.fillStyle = this.color;
                    cc.scale(scale, scale);
                    for(let pixel = 0; pixel < len; pixel += barStart){
                        const minPeak = this.peaks[(pixel + this.offset) * 2] / maxValue;
                        const maxPeak = this.peaks[(pixel + this.offset) * 2 + 1] / maxValue;
                        CanvasHook.drawFrame(cc, h2, pixel, minPeak, maxPeak, width, gap);
                    }
                    cc.restore();
                }
            }
            /* harmony default export */ const render_CanvasHook = CanvasHook;
            // EXTERNAL MODULE: ./node_modules/fade-curves/index.js
            var fade_curves = __webpack_require__(6226);
            /*
 * virtual-dom hook for drawing the fade curve to the canvas element.
 */ class FadeCanvasHook {
                constructor(type, shape, duration, samplesPerPixel){
                    this.type = type;
                    this.shape = shape;
                    this.duration = duration;
                    this.samplesPerPixel = samplesPerPixel;
                }
                static createCurve(shape, type, width) {
                    let reflection;
                    let curve;
                    switch(type){
                        case fade_maker /* FADEIN */ .Y1:
                            reflection = 1;
                            break;
                        case fade_maker /* FADEOUT */ .h7:
                            reflection = -1;
                            break;
                        default:
                            throw new Error("Unsupported fade type.");
                    }
                    switch(shape){
                        case fade_maker /* SCURVE */ ._h:
                            curve = (0, fade_curves.sCurve)(width, reflection);
                            break;
                        case fade_maker /* LINEAR */ .t$:
                            curve = (0, fade_curves.linear)(width, reflection);
                            break;
                        case fade_maker /* EXPONENTIAL */ .Jl:
                            curve = (0, fade_curves.exponential)(width, reflection);
                            break;
                        case fade_maker /* LOGARITHMIC */ .Hp:
                            curve = (0, fade_curves.logarithmic)(width, 10, reflection);
                            break;
                        default:
                            throw new Error("Unsupported fade shape");
                    }
                    return curve;
                }
                hook(canvas, prop, prev) {
                    // node is up to date.
                    if (prev !== undefined && prev.shape === this.shape && prev.type === this.type && prev.duration === this.duration && prev.samplesPerPixel === this.samplesPerPixel) return;
                    const ctx = canvas.getContext("2d");
                    const width = canvas.width;
                    const height = canvas.height;
                    const curve = FadeCanvasHook.createCurve(this.shape, this.type, width);
                    const len = curve.length;
                    let y = height - curve[0] * height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.save();
                    ctx.strokeStyle = "black";
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    for(let i = 1; i < len; i += 1){
                        y = height - curve[i] * height;
                        ctx.lineTo(i, y);
                    }
                    ctx.stroke();
                    ctx.restore();
                }
            }
            /* harmony default export */ const render_FadeCanvasHook = FadeCanvasHook;
            /* eslint-disable no-param-reassign */ /*
 * virtual-dom hook for setting the volume input programmatically.
 */ /* harmony default export */ const VolumeSliderHook = class {
                constructor(gain){
                    this.gain = gain;
                }
                hook(volumeInput) {
                    volumeInput.value = this.gain * 100;
                    volumeInput.title = `${Math.round(this.gain * 100)}% volume`;
                }
            };
            /* eslint-disable no-param-reassign */ /*
 * virtual-dom hook for setting the stereoPan input programmatically.
 */ /* harmony default export */ const StereoPanSliderHook = class {
                constructor(stereoPan){
                    this.stereoPan = stereoPan;
                }
                hook(stereoPanInput) {
                    stereoPanInput.value = this.stereoPan * 100;
                    let panOrientation;
                    if (this.stereoPan === 0) panOrientation = "Center";
                    else if (this.stereoPan < 0) panOrientation = "Left";
                    else panOrientation = "Right";
                    const percentage = `${Math.abs(Math.round(this.stereoPan * 100))}% `;
                    stereoPanInput.title = `Pan: ${this.stereoPan !== 0 ? percentage : ""}${panOrientation}`;
                }
            };
            const MAX_CANVAS_WIDTH = 1000;
            /* harmony default export */ const Track = class {
                constructor(){
                    this.name = "Untitled";
                    this.customClass = undefined;
                    this.waveOutlineColor = undefined;
                    this.gain = 1;
                    this.muted = false;
                    this.soloed = false;
                    this.fades = {};
                    this.peakData = {
                        type: "WebAudio",
                        mono: false
                    };
                    this.cueIn = 0;
                    this.cueOut = 0;
                    this.duration = 0;
                    this.startTime = 0;
                    this.endTime = 0;
                    this.stereoPan = 0;
                }
                setEventEmitter(ee) {
                    this.ee = ee;
                }
                setName(name) {
                    this.name = name;
                }
                setCustomClass(className) {
                    this.customClass = className;
                }
                setWaveOutlineColor(color) {
                    this.waveOutlineColor = color;
                }
                setCues(cueIn, cueOut) {
                    if (cueOut < cueIn) throw new Error("cue out cannot be less than cue in");
                    this.cueIn = cueIn;
                    this.cueOut = cueOut;
                    this.duration = this.cueOut - this.cueIn;
                    this.endTime = this.startTime + this.duration;
                }
                /*
   *   start, end in seconds relative to the entire playlist.
   */ trim(start, end) {
                    const trackStart = this.getStartTime();
                    const trackEnd = this.getEndTime();
                    const offset = this.cueIn - trackStart;
                    if (trackStart <= start && trackEnd >= start || trackStart <= end && trackEnd >= end) {
                        const cueIn = start < trackStart ? trackStart : start;
                        const cueOut = end > trackEnd ? trackEnd : end;
                        this.setCues(cueIn + offset, cueOut + offset);
                        if (start > trackStart) this.setStartTime(start);
                    }
                }
                setStartTime(start) {
                    this.startTime = start;
                    this.endTime = start + this.duration;
                }
                setPlayout(playout) {
                    this.playout = playout;
                }
                setOfflinePlayout(playout) {
                    this.offlinePlayout = playout;
                }
                setEnabledStates(enabledStates = {}) {
                    const defaultStatesEnabled = {
                        cursor: true,
                        fadein: true,
                        fadeout: true,
                        select: true,
                        shift: true
                    };
                    this.enabledStates = lodash_assign_default()({}, defaultStatesEnabled, enabledStates);
                }
                setFadeIn(duration, shape = "logarithmic") {
                    if (duration > this.duration) throw new Error("Invalid Fade In");
                    const fade = {
                        shape,
                        start: 0,
                        end: duration
                    };
                    if (this.fadeIn) {
                        this.removeFade(this.fadeIn);
                        this.fadeIn = undefined;
                    }
                    this.fadeIn = this.saveFade(fade_maker /* FADEIN */ .Y1, fade.shape, fade.start, fade.end);
                }
                setFadeOut(duration, shape = "logarithmic") {
                    if (duration > this.duration) throw new Error("Invalid Fade Out");
                    const fade = {
                        shape,
                        start: this.duration - duration,
                        end: this.duration
                    };
                    if (this.fadeOut) {
                        this.removeFade(this.fadeOut);
                        this.fadeOut = undefined;
                    }
                    this.fadeOut = this.saveFade(fade_maker /* FADEOUT */ .h7, fade.shape, fade.start, fade.end);
                }
                saveFade(type, shape, start, end) {
                    const id = esm_browser_v4();
                    this.fades[id] = {
                        type,
                        shape,
                        start,
                        end
                    };
                    return id;
                }
                removeFade(id) {
                    delete this.fades[id];
                }
                setBuffer(buffer) {
                    this.buffer = buffer;
                }
                setPeakData(data) {
                    this.peakData = data;
                }
                calculatePeaks(samplesPerPixel, sampleRate) {
                    const cueIn = secondsToSamples(this.cueIn, sampleRate);
                    const cueOut = secondsToSamples(this.cueOut, sampleRate);
                    this.setPeaks(webaudio_peaks_default()(this.buffer, samplesPerPixel, this.peakData.mono, cueIn, cueOut));
                }
                setPeaks(peaks) {
                    this.peaks = peaks;
                }
                setState(state) {
                    this.state = state;
                    if (this.state && this.enabledStates[this.state]) {
                        const StateClass = states[this.state];
                        this.stateObj = new StateClass(this);
                    } else this.stateObj = undefined;
                }
                getStartTime() {
                    return this.startTime;
                }
                getEndTime() {
                    return this.endTime;
                }
                getDuration() {
                    return this.duration;
                }
                isPlaying() {
                    return this.playout.isPlaying();
                }
                setShouldPlay(bool) {
                    this.playout.setShouldPlay(bool);
                }
                setGainLevel(level) {
                    this.gain = level;
                    this.playout.setVolumeGainLevel(level);
                }
                setMasterGainLevel(level) {
                    this.playout.setMasterGainLevel(level);
                }
                setStereoPanValue(value) {
                    this.stereoPan = value;
                    this.playout.setStereoPanValue(value);
                }
                setEffects(effectsGraph) {
                    this.effectsGraph = effectsGraph;
                    this.playout.setEffects(effectsGraph);
                }
                /*
    startTime, endTime in seconds (float).
    segment is for a highlighted section in the UI.

    returns a Promise that will resolve when the AudioBufferSource
    is either stopped or plays out naturally.
  */ schedulePlay(now, startTime, endTime, config) {
                    let start;
                    let duration;
                    let when = now;
                    let segment = endTime ? endTime - startTime : undefined;
                    const defaultOptions = {
                        shouldPlay: true,
                        masterGain: 1,
                        isOffline: false
                    };
                    const options = lodash_assign_default()({}, defaultOptions, config);
                    const playoutSystem = options.isOffline ? this.offlinePlayout : this.playout;
                    // 1) track has no content to play.
                    // 2) track does not play in this selection.
                    if (this.endTime <= startTime || segment && startTime + segment < this.startTime) // return a resolved promise since this track is technically "stopped".
                    return Promise.resolve();
                    // track should have something to play if it gets here.
                    // the track starts in the future or on the cursor position
                    if (this.startTime >= startTime) {
                        start = 0;
                        // schedule additional delay for this audio node.
                        when += this.startTime - startTime;
                        if (endTime) {
                            segment -= this.startTime - startTime;
                            duration = Math.min(segment, this.duration);
                        } else duration = this.duration;
                    } else {
                        start = startTime - this.startTime;
                        if (endTime) duration = Math.min(segment, this.duration - start);
                        else duration = this.duration - start;
                    }
                    start += this.cueIn;
                    const relPos = startTime - this.startTime;
                    const sourcePromise = playoutSystem.setUpSource();
                    // param relPos: cursor position in seconds relative to this track.
                    // can be negative if the cursor is placed before the start of this track etc.
                    lodash_forown_default()(this.fades, (fade)=>{
                        let fadeStart;
                        let fadeDuration;
                        // only apply fade if it's ahead of the cursor.
                        if (relPos < fade.end) {
                            if (relPos <= fade.start) {
                                fadeStart = now + (fade.start - relPos);
                                fadeDuration = fade.end - fade.start;
                            } else if (relPos > fade.start && relPos < fade.end) {
                                fadeStart = now - (relPos - fade.start);
                                fadeDuration = fade.end - fade.start;
                            }
                            switch(fade.type){
                                case fade_maker /* FADEIN */ .Y1:
                                    playoutSystem.applyFadeIn(fadeStart, fadeDuration, fade.shape);
                                    break;
                                case fade_maker /* FADEOUT */ .h7:
                                    playoutSystem.applyFadeOut(fadeStart, fadeDuration, fade.shape);
                                    break;
                                default:
                                    throw new Error("Invalid fade type saved on track.");
                            }
                        }
                    });
                    playoutSystem.setVolumeGainLevel(this.gain);
                    playoutSystem.setShouldPlay(options.shouldPlay);
                    playoutSystem.setMasterGainLevel(options.masterGain);
                    playoutSystem.setStereoPanValue(this.stereoPan);
                    playoutSystem.play(when, start, duration);
                    return sourcePromise;
                }
                scheduleStop(when = 0) {
                    this.playout.stop(when);
                }
                renderOverlay(data) {
                    const channelPixels = secondsToPixels(data.playlistLength, data.resolution, data.sampleRate);
                    const config = {
                        attributes: {
                            style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: ${channelPixels}px; z-index: 9;`
                        }
                    };
                    let overlayClass = "";
                    if (this.stateObj) {
                        this.stateObj.setup(data.resolution, data.sampleRate);
                        const StateClass = states[this.state];
                        const events = StateClass.getEvents();
                        events.forEach((event)=>{
                            config[`on${event}`] = this.stateObj[event].bind(this.stateObj);
                        });
                        overlayClass = StateClass.getClass();
                    }
                    // use this overlay for track event cursor position calculations.
                    return h_default()(`div.playlist-overlay${overlayClass}`, config);
                }
                renderControls(data) {
                    const muteClass = data.muted ? ".active" : "";
                    const soloClass = data.soloed ? ".active" : "";
                    const isCollapsed = data.collapsed;
                    const numChan = this.peaks.data.length;
                    const widgets = data.controls.widgets;
                    const removeTrack = h_default()("button.btn.btn-danger.btn-xs.track-remove", {
                        attributes: {
                            type: "button",
                            title: "Remove track"
                        },
                        onclick: ()=>{
                            this.ee.emit("removeTrack", this);
                        }
                    }, [
                        h_default()("i.fas.fa-times")
                    ]);
                    const trackName = h_default()("span", [
                        this.name
                    ]);
                    const collapseTrack = h_default()("button.btn.btn-info.btn-xs.track-collapse", {
                        attributes: {
                            type: "button",
                            title: isCollapsed ? "Expand track" : "Collapse track"
                        },
                        onclick: ()=>{
                            this.ee.emit("changeTrackView", this, {
                                collapsed: !isCollapsed
                            });
                        }
                    }, [
                        h_default()(`i.fas.${isCollapsed ? "fa-caret-down" : "fa-caret-up"}`)
                    ]);
                    const headerChildren = [];
                    if (widgets.remove) headerChildren.push(removeTrack);
                    headerChildren.push(trackName);
                    if (widgets.collapse) headerChildren.push(collapseTrack);
                    const controls = [
                        h_default()("div.track-header", headerChildren)
                    ];
                    if (!isCollapsed) {
                        if (widgets.muteOrSolo) controls.push(h_default()("div.btn-group", [
                            h_default()(`button.btn.btn-outline-dark.btn-xs.btn-mute${muteClass}`, {
                                attributes: {
                                    type: "button"
                                },
                                onclick: ()=>{
                                    this.ee.emit("mute", this);
                                }
                            }, [
                                "Mute"
                            ]),
                            h_default()(`button.btn.btn-outline-dark.btn-xs.btn-solo${soloClass}`, {
                                onclick: ()=>{
                                    this.ee.emit("solo", this);
                                }
                            }, [
                                "Solo"
                            ])
                        ]));
                        if (widgets.volume) controls.push(h_default()("label.volume", [
                            h_default()("input.volume-slider", {
                                attributes: {
                                    "aria-label": "Track volume control",
                                    type: "range",
                                    min: 0,
                                    max: 100,
                                    value: 100
                                },
                                hook: new VolumeSliderHook(this.gain),
                                oninput: (e)=>{
                                    this.ee.emit("volumechange", e.target.value, this);
                                }
                            })
                        ]));
                        if (widgets.stereoPan) controls.push(h_default()("label.stereopan", [
                            h_default()("input.stereopan-slider", {
                                attributes: {
                                    "aria-label": "Track stereo pan control",
                                    type: "range",
                                    min: -100,
                                    max: 100,
                                    value: 100
                                },
                                hook: new StereoPanSliderHook(this.stereoPan),
                                oninput: (e)=>{
                                    this.ee.emit("stereopan", e.target.value / 100, this);
                                }
                            })
                        ]));
                    }
                    return h_default()("div.controls", {
                        attributes: {
                            style: `height: ${numChan * data.height}px; width: ${data.controls.width}px; position: absolute; left: 0; z-index: 10;`
                        }
                    }, controls);
                }
                render(data) {
                    if (!this.peaks) return;
                    const width = this.peaks.length;
                    const playbackX = secondsToPixels(data.playbackSeconds, data.resolution, data.sampleRate);
                    const startX = secondsToPixels(this.startTime, data.resolution, data.sampleRate);
                    const endX = secondsToPixels(this.endTime, data.resolution, data.sampleRate);
                    let progressWidth = 0;
                    const numChan = this.peaks.data.length;
                    const scale = Math.ceil(window.devicePixelRatio);
                    if (playbackX > 0 && playbackX > startX) {
                        if (playbackX < endX) progressWidth = playbackX - startX;
                        else progressWidth = width;
                    }
                    const waveformChildren = [
                        h_default()("div.cursor", {
                            attributes: {
                                style: `position: absolute; width: 1px; margin: 0; padding: 0; top: 0; left: ${playbackX}px; bottom: 0; z-index: 5;`
                            }
                        })
                    ];
                    const channels = Object.keys(this.peaks.data).map((channelNum)=>{
                        const channelChildren = [
                            h_default()("div.channel-progress", {
                                attributes: {
                                    style: `position: absolute; width: ${progressWidth}px; height: ${data.height}px; z-index: 2;`
                                }
                            })
                        ];
                        let offset = 0;
                        let totalWidth = width;
                        const peaks = this.peaks.data[channelNum];
                        while(totalWidth > 0){
                            const currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
                            const canvasColor = this.waveOutlineColor ? this.waveOutlineColor : data.colors.waveOutlineColor;
                            channelChildren.push(h_default()("canvas", {
                                attributes: {
                                    width: currentWidth * scale,
                                    height: data.height * scale,
                                    style: `float: left; position: relative; margin: 0; padding: 0; z-index: 3; width: ${currentWidth}px; height: ${data.height}px;`
                                },
                                hook: new render_CanvasHook(peaks, offset, this.peaks.bits, canvasColor, scale, data.height, data.barWidth, data.barGap)
                            }));
                            totalWidth -= currentWidth;
                            offset += MAX_CANVAS_WIDTH;
                        }
                        // if there are fades, display them.
                        if (this.fadeIn) {
                            const fadeIn = this.fades[this.fadeIn];
                            const fadeWidth = secondsToPixels(fadeIn.end - fadeIn.start, data.resolution, data.sampleRate);
                            channelChildren.push(h_default()("div.wp-fade.wp-fadein", {
                                attributes: {
                                    style: `position: absolute; height: ${data.height}px; width: ${fadeWidth}px; top: 0; left: 0; z-index: 4;`
                                }
                            }, [
                                h_default()("canvas", {
                                    attributes: {
                                        width: fadeWidth,
                                        height: data.height
                                    },
                                    hook: new render_FadeCanvasHook(fadeIn.type, fadeIn.shape, fadeIn.end - fadeIn.start, data.resolution)
                                })
                            ]));
                        }
                        if (this.fadeOut) {
                            const fadeOut = this.fades[this.fadeOut];
                            const fadeWidth = secondsToPixels(fadeOut.end - fadeOut.start, data.resolution, data.sampleRate);
                            channelChildren.push(h_default()("div.wp-fade.wp-fadeout", {
                                attributes: {
                                    style: `position: absolute; height: ${data.height}px; width: ${fadeWidth}px; top: 0; right: 0; z-index: 4;`
                                }
                            }, [
                                h_default()("canvas", {
                                    attributes: {
                                        width: fadeWidth,
                                        height: data.height
                                    },
                                    hook: new render_FadeCanvasHook(fadeOut.type, fadeOut.shape, fadeOut.end - fadeOut.start, data.resolution)
                                })
                            ]));
                        }
                        return h_default()(`div.channel.channel-${channelNum}`, {
                            attributes: {
                                style: `height: ${data.height}px; width: ${width}px; top: ${channelNum * data.height}px; left: ${startX}px; position: absolute; margin: 0; padding: 0; z-index: 1;`
                            }
                        }, channelChildren);
                    });
                    waveformChildren.push(channels);
                    waveformChildren.push(this.renderOverlay(data));
                    // draw cursor selection on active track.
                    if (data.isActive === true) {
                        const cStartX = secondsToPixels(data.timeSelection.start, data.resolution, data.sampleRate);
                        const cEndX = secondsToPixels(data.timeSelection.end, data.resolution, data.sampleRate);
                        const cWidth = cEndX - cStartX + 1;
                        const cClassName = cWidth > 1 ? ".segment" : ".point";
                        waveformChildren.push(h_default()(`div.selection${cClassName}`, {
                            attributes: {
                                style: `position: absolute; width: ${cWidth}px; bottom: 0; top: 0; left: ${cStartX}px; z-index: 4;`
                            }
                        }));
                    }
                    const waveform = h_default()("div.waveform", {
                        attributes: {
                            style: `height: ${numChan * data.height}px; position: relative;`
                        }
                    }, waveformChildren);
                    const channelChildren = [];
                    let channelMargin = 0;
                    if (data.controls.show) {
                        channelChildren.push(this.renderControls(data));
                        channelMargin = data.controls.width;
                    }
                    channelChildren.push(waveform);
                    const audibleClass = data.shouldPlay ? "" : ".silent";
                    const customClass = this.customClass === undefined ? "" : `.${this.customClass}`;
                    return h_default()(`div.channel-wrapper${audibleClass}${customClass}`, {
                        attributes: {
                            style: `margin-left: ${channelMargin}px; height: ${data.height * numChan}px;`
                        }
                    }, channelChildren);
                }
                getTrackDetails() {
                    const info = {
                        src: this.src,
                        start: this.startTime,
                        end: this.endTime,
                        name: this.name,
                        muted: this.muted,
                        soloed: this.soloed,
                        customClass: this.customClass,
                        cuein: this.cueIn,
                        cueout: this.cueOut,
                        stereoPan: this.stereoPan,
                        gain: this.gain,
                        effects: this.effectsGraph
                    };
                    if (this.fadeIn) {
                        const fadeIn = this.fades[this.fadeIn];
                        info.fadeIn = {
                            shape: fadeIn.shape,
                            duration: fadeIn.end - fadeIn.start
                        };
                    }
                    if (this.fadeOut) {
                        const fadeOut = this.fades[this.fadeOut];
                        info.fadeOut = {
                            shape: fadeOut.shape,
                            duration: fadeOut.end - fadeOut.start
                        };
                    }
                    return info;
                }
            };
            function noEffects(node1, node2) {
                node1.connect(node2);
            }
            /* harmony default export */ const Playout = class {
                constructor(ac, buffer, masterGain = ac.createGain()){
                    this.ac = ac;
                    this.gain = 1;
                    this.effectsGraph = noEffects;
                    this.masterEffectsGraph = noEffects;
                    this.buffer = buffer;
                    this.masterGain = masterGain;
                    this.destination = this.ac.destination;
                }
                applyFade(type, start, duration, shape = "logarithmic") {
                    if (type === fade_maker /* FADEIN */ .Y1) (0, fade_maker /* createFadeIn */ .L7)(this.fadeGain.gain, shape, start, duration);
                    else if (type === fade_maker /* FADEOUT */ .h7) (0, fade_maker /* createFadeOut */ .Mt)(this.fadeGain.gain, shape, start, duration);
                    else throw new Error("Unsupported fade type");
                }
                applyFadeIn(start, duration, shape = "logarithmic") {
                    this.applyFade(fade_maker /* FADEIN */ .Y1, start, duration, shape);
                }
                applyFadeOut(start, duration, shape = "logarithmic") {
                    this.applyFade(fade_maker /* FADEOUT */ .h7, start, duration, shape);
                }
                isPlaying() {
                    return this.source !== undefined;
                }
                getDuration() {
                    return this.buffer.duration;
                }
                setAudioContext(ac) {
                    this.ac = ac;
                    this.destination = this.ac.destination;
                }
                createStereoPanner() {
                    if (this.ac.createStereoPanner) return this.ac.createStereoPanner();
                    return this.ac.createPanner();
                }
                setUpSource() {
                    this.source = this.ac.createBufferSource();
                    this.source.buffer = this.buffer;
                    let cleanupEffects;
                    let cleanupMasterEffects;
                    const sourcePromise = new Promise((resolve)=>{
                        // keep track of the buffer state.
                        this.source.onended = ()=>{
                            this.source.disconnect();
                            this.fadeGain.disconnect();
                            this.volumeGain.disconnect();
                            this.shouldPlayGain.disconnect();
                            this.panner.disconnect();
                            // this.masterGain.disconnect();
                            if (cleanupEffects) cleanupEffects();
                            if (cleanupMasterEffects) cleanupMasterEffects();
                            this.source = undefined;
                            this.fadeGain = undefined;
                            this.volumeGain = undefined;
                            this.shouldPlayGain = undefined;
                            this.panner = undefined;
                            resolve();
                        };
                    });
                    this.fadeGain = this.ac.createGain();
                    // used for track volume slider
                    this.volumeGain = this.ac.createGain();
                    // used for solo/mute
                    this.shouldPlayGain = this.ac.createGain();
                    this.panner = this.createStereoPanner();
                    this.source.connect(this.fadeGain);
                    this.fadeGain.connect(this.volumeGain);
                    this.volumeGain.connect(this.shouldPlayGain);
                    this.shouldPlayGain.connect(this.panner);
                    cleanupEffects = this.effectsGraph(this.panner, this.masterGain, this.ac instanceof (window.OfflineAudioContext || window.webkitOfflineAudioContext));
                    cleanupMasterEffects = this.masterEffectsGraph(this.masterGain, this.destination, this.ac instanceof (window.OfflineAudioContext || window.webkitOfflineAudioContext));
                    return sourcePromise;
                }
                setVolumeGainLevel(level) {
                    if (this.volumeGain) this.volumeGain.gain.value = level;
                }
                setShouldPlay(bool) {
                    if (this.shouldPlayGain) this.shouldPlayGain.gain.value = bool ? 1 : 0;
                }
                setMasterGainLevel(level) {
                    if (this.masterGain) this.masterGain.gain.value = level;
                }
                setStereoPanValue(pan = 0) {
                    if (this.panner) {
                        if (this.panner.pan !== undefined) this.panner.pan.value = pan;
                        else {
                            this.panner.panningModel = "equalpower";
                            this.panner.setPosition(pan, 0, 1 - Math.abs(pan));
                        }
                    }
                }
                setEffects(effectsGraph = noEffects) {
                    this.effectsGraph = effectsGraph;
                }
                setMasterEffects(effectsGraph = noEffects) {
                    this.masterEffectsGraph = effectsGraph;
                }
                /*
    source.start is picky when passing the end time.
    If rounding error causes a number to make the source think
    it is playing slightly more samples than it has it won't play at all.
    Unfortunately it doesn't seem to work if you just give it a start time.
  */ play(when, start, duration) {
                    this.source.start(when, start, duration);
                }
                stop(when = 0) {
                    if (this.source) this.source.stop(when);
                }
            };
            /*
{
  "begin": "5.759",
  "end": "9.155",
  "id": "002",
  "language": "en",
  "lines": [
    "I just wanted to hold"
  ]
},
 */ /* harmony default export */ function aeneas(aeneas) {
                const annotation = {
                    id: aeneas.id || esm_browser_v4(),
                    start: Number(aeneas.begin) || 0,
                    end: Number(aeneas.end) || 0,
                    lines: aeneas.lines || [
                        ""
                    ],
                    lang: aeneas.language || "en"
                };
                return annotation;
            }
            /*
{
  "begin": "5.759",
  "end": "9.155",
  "id": "002",
  "language": "en",
  "lines": [
    "I just wanted to hold"
  ]
},
 */ /* harmony default export */ function output_aeneas(annotation) {
                return {
                    begin: String(annotation.start.toFixed(3)),
                    end: String(annotation.end.toFixed(3)),
                    id: String(annotation.id),
                    language: annotation.lang,
                    lines: annotation.lines
                };
            }
            /* harmony default export */ const DragInteraction = class {
                constructor(playlist, data = {}){
                    this.playlist = playlist;
                    this.data = data;
                    this.active = false;
                    this.ondragover = (e)=>{
                        if (this.active) {
                            e.preventDefault();
                            this.emitDrag(e.clientX);
                        }
                    };
                }
                emitDrag(x) {
                    const deltaX = x - this.prevX;
                    // emit shift event if not 0
                    if (deltaX) {
                        const deltaTime = pixelsToSeconds(deltaX, this.playlist.samplesPerPixel, this.playlist.sampleRate);
                        this.prevX = x;
                        this.playlist.ee.emit("dragged", deltaTime, this.data);
                    }
                }
                complete() {
                    this.active = false;
                    document.removeEventListener("dragover", this.ondragover);
                }
                dragstart(e) {
                    const ev = e;
                    this.active = true;
                    this.prevX = e.clientX;
                    ev.dataTransfer.dropEffect = "move";
                    ev.dataTransfer.effectAllowed = "move";
                    ev.dataTransfer.setData("text/plain", "");
                    document.addEventListener("dragover", this.ondragover);
                }
                dragend(e) {
                    if (this.active) {
                        e.preventDefault();
                        this.complete();
                    }
                }
                static getClass() {
                    return ".shift";
                }
                static getEvents() {
                    return [
                        "dragstart",
                        "dragend"
                    ];
                }
            };
            /*
 * virtual-dom hook for scrolling to the text annotation.
 */ const Hook = function ScrollTopHook() {};
            Hook.prototype.hook = function hook(node) {
                const el = node.querySelector(".current");
                if (el) {
                    const box = node.getBoundingClientRect();
                    const row = el.getBoundingClientRect();
                    const diff = row.top - box.top;
                    const list = node;
                    list.scrollTop += diff;
                }
            };
            /* harmony default export */ const ScrollTopHook = Hook;
            /* harmony default export */ function timeformat(format) {
                function clockFormat(seconds, decimals) {
                    const hours = parseInt(seconds / 3600, 10) % 24;
                    const minutes = parseInt(seconds / 60, 10) % 60;
                    const secs = (seconds % 60).toFixed(decimals);
                    const sHours = hours < 10 ? `0${hours}` : hours;
                    const sMinutes = minutes < 10 ? `0${minutes}` : minutes;
                    const sSeconds = secs < 10 ? `0${secs}` : secs;
                    return `${sHours}:${sMinutes}:${sSeconds}`;
                }
                const formats = {
                    seconds (seconds) {
                        return seconds.toFixed(0);
                    },
                    thousandths (seconds) {
                        return seconds.toFixed(3);
                    },
                    "hh:mm:ss": function hhmmss(seconds) {
                        return clockFormat(seconds, 0);
                    },
                    "hh:mm:ss.u": function hhmmssu(seconds) {
                        return clockFormat(seconds, 1);
                    },
                    "hh:mm:ss.uu": function hhmmssuu(seconds) {
                        return clockFormat(seconds, 2);
                    },
                    "hh:mm:ss.uuu": function hhmmssuuu(seconds) {
                        return clockFormat(seconds, 3);
                    }
                };
                return formats[format];
            }
            class AnnotationList {
                constructor(playlist, annotations, controls = [], editable = false, linkEndpoints = false, isContinuousPlay = false, marginLeft = 0){
                    this.playlist = playlist;
                    this.marginLeft = marginLeft;
                    this.resizeHandlers = [];
                    this.editable = editable;
                    this.annotations = annotations.map((a)=>// TODO support different formats later on.
                        aeneas(a));
                    this.setupInteractions();
                    this.controls = controls;
                    this.setupEE(playlist.ee);
                    // TODO actually make a real plugin system that's not terrible.
                    this.playlist.isContinuousPlay = isContinuousPlay;
                    this.playlist.linkEndpoints = linkEndpoints;
                    this.length = this.annotations.length;
                }
                setupInteractions() {
                    this.annotations.forEach((a, i)=>{
                        const leftShift = new DragInteraction(this.playlist, {
                            direction: "left",
                            index: i
                        });
                        const rightShift = new DragInteraction(this.playlist, {
                            direction: "right",
                            index: i
                        });
                        this.resizeHandlers.push(leftShift);
                        this.resizeHandlers.push(rightShift);
                    });
                }
                setupEE(ee) {
                    ee.on("dragged", (deltaTime, data)=>{
                        const annotationIndex = data.index;
                        const annotations = this.annotations;
                        const note = annotations[annotationIndex];
                        // resizing to the left
                        if (data.direction === "left") {
                            const originalVal = note.start;
                            note.start += deltaTime;
                            if (note.start < 0) note.start = 0;
                            if (annotationIndex && annotations[annotationIndex - 1].end > note.start) annotations[annotationIndex - 1].end = note.start;
                            if (this.playlist.linkEndpoints && annotationIndex && annotations[annotationIndex - 1].end === originalVal) annotations[annotationIndex - 1].end = note.start;
                        } else {
                            // resizing to the right
                            const originalVal = note.end;
                            note.end += deltaTime;
                            if (note.end > this.playlist.duration) note.end = this.playlist.duration;
                            if (annotationIndex < annotations.length - 1 && annotations[annotationIndex + 1].start < note.end) annotations[annotationIndex + 1].start = note.end;
                            if (this.playlist.linkEndpoints && annotationIndex < annotations.length - 1 && annotations[annotationIndex + 1].start === originalVal) annotations[annotationIndex + 1].start = note.end;
                        }
                        this.playlist.drawRequest();
                    });
                    ee.on("continuousplay", (val)=>{
                        this.playlist.isContinuousPlay = val;
                    });
                    ee.on("linkendpoints", (val)=>{
                        this.playlist.linkEndpoints = val;
                    });
                    ee.on("annotationsrequest", ()=>{
                        this.export();
                    });
                    return ee;
                }
                export() {
                    const output = this.annotations.map((a)=>output_aeneas(a));
                    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(output))}`;
                    const a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = dataStr;
                    a.download = "annotations.json";
                    a.click();
                    document.body.removeChild(a);
                }
                renderResizeLeft(i) {
                    const events = DragInteraction.getEvents();
                    const config = {
                        attributes: {
                            style: "position: absolute; height: 30px; width: 10px; top: 0; left: -2px",
                            draggable: true
                        }
                    };
                    const handler = this.resizeHandlers[i * 2];
                    events.forEach((event)=>{
                        config[`on${event}`] = handler[event].bind(handler);
                    });
                    return h_default()("div.resize-handle.resize-w", config);
                }
                renderResizeRight(i) {
                    const events = DragInteraction.getEvents();
                    const config = {
                        attributes: {
                            style: "position: absolute; height: 30px; width: 10px; top: 0; right: -2px",
                            draggable: true
                        }
                    };
                    const handler = this.resizeHandlers[i * 2 + 1];
                    events.forEach((event)=>{
                        config[`on${event}`] = handler[event].bind(handler);
                    });
                    return h_default()("div.resize-handle.resize-e", config);
                }
                renderControls(note, i) {
                    // seems to be a bug with references, or I'm missing something.
                    const that = this;
                    return this.controls.map((ctrl)=>h_default()(`i.${ctrl.class}`, {
                            attributes: {
                                title: ctrl.title
                            },
                            onclick: ()=>{
                                ctrl.action(note, i, that.annotations, {
                                    linkEndpoints: that.playlist.linkEndpoints
                                });
                                this.setupInteractions();
                                that.playlist.drawRequest();
                            }
                        }));
                }
                render() {
                    const boxes = h_default()("div.annotations-boxes", {
                        attributes: {
                            style: `height: 30px; position: relative; margin-left: ${this.marginLeft}px;`
                        }
                    }, this.annotations.map((note, i)=>{
                        const samplesPerPixel = this.playlist.samplesPerPixel;
                        const sampleRate = this.playlist.sampleRate;
                        const pixPerSec = sampleRate / samplesPerPixel;
                        const pixOffset = secondsToPixels(this.playlist.scrollLeft, samplesPerPixel, sampleRate);
                        const left = Math.floor(note.start * pixPerSec - pixOffset);
                        const width = Math.ceil(note.end * pixPerSec - note.start * pixPerSec);
                        return h_default()("div.annotation-box", {
                            attributes: {
                                style: `position: absolute; height: 30px; width: ${width}px; left: ${left}px`,
                                "data-id": note.id
                            }
                        }, [
                            this.renderResizeLeft(i),
                            h_default()("span.id", {
                                onclick: ()=>{
                                    const start = this.annotations[i].start;
                                    const end = this.annotations[i].end;
                                    if (this.playlist.isContinuousPlay) {
                                        this.playlist.seek(start, start);
                                        this.playlist.ee.emit("play", start);
                                    } else {
                                        this.playlist.seek(start, end);
                                        this.playlist.ee.emit("play", start, end);
                                    }
                                }
                            }, [
                                note.id
                            ]),
                            this.renderResizeRight(i)
                        ]);
                    }));
                    const boxesWrapper = h_default()("div.annotations-boxes-wrapper", {
                        attributes: {
                            style: "overflow: hidden;"
                        }
                    }, [
                        boxes
                    ]);
                    const text = h_default()("div.annotations-text", {
                        hook: new ScrollTopHook()
                    }, this.annotations.map((note, i)=>{
                        const format = timeformat(this.playlist.durationFormat);
                        const start = format(note.start);
                        const end = format(note.end);
                        let segmentClass = "";
                        if (this.playlist.isPlaying() && this.playlist.playbackSeconds >= note.start && this.playlist.playbackSeconds <= note.end) segmentClass = ".current";
                        const editableConfig = {
                            attributes: {
                                contenteditable: true
                            },
                            oninput: (e)=>{
                                // needed currently for references
                                // eslint-disable-next-line no-param-reassign
                                note.lines = [
                                    e.target.innerText
                                ];
                            },
                            onkeypress: (e)=>{
                                if (e.which === 13 || e.keyCode === 13) {
                                    e.target.blur();
                                    e.preventDefault();
                                }
                            }
                        };
                        const linesConfig = this.editable ? editableConfig : {};
                        return h_default()(`div.annotation${segmentClass}`, [
                            h_default()("span.annotation-id", [
                                note.id
                            ]),
                            h_default()("span.annotation-start", [
                                start
                            ]),
                            h_default()("span.annotation-end", [
                                end
                            ]),
                            h_default()("span.annotation-lines", linesConfig, [
                                note.lines
                            ]),
                            h_default()("span.annotation-actions", this.renderControls(note, i))
                        ]);
                    }));
                    return h_default()("div.annotations", [
                        boxesWrapper,
                        text
                    ]);
                }
            }
            /* harmony default export */ const annotation_AnnotationList = AnnotationList;
            /* harmony default export */ function recorderWorker() {
                // http://jsperf.com/typed-array-min-max/2
                // plain for loop for finding min/max is way faster than anything else.
                /**
   * @param {TypedArray} array - Subarray of audio to calculate peaks from.
   */ function findMinMax(array) {
                    let min = Infinity;
                    let max = -Infinity;
                    let curr;
                    for(let i = 0; i < array.length; i += 1){
                        curr = array[i];
                        if (min > curr) min = curr;
                        if (max < curr) max = curr;
                    }
                    return {
                        min,
                        max
                    };
                }
                /**
   * @param {Number} n - peak to convert from float to Int8, Int16 etc.
   * @param {Number} bits - convert to #bits two's complement signed integer
   */ function convert(n, bits) {
                    const max = 2 ** (bits - 1);
                    const v = n < 0 ? n * max : n * max - 1;
                    return Math.max(-max, Math.min(max - 1, v));
                }
                /**
   * @param {TypedArray} channel - Audio track frames to calculate peaks from.
   * @param {Number} samplesPerPixel - Audio frames per peak
   */ function extractPeaks(channel, samplesPerPixel, bits) {
                    const chanLength = channel.length;
                    const numPeaks = Math.ceil(chanLength / samplesPerPixel);
                    let start;
                    let end;
                    let segment;
                    let max;
                    let min;
                    let extrema;
                    // create interleaved array of min,max
                    const peaks = new self[`Int${bits}Array`](numPeaks * 2);
                    for(let i = 0; i < numPeaks; i += 1){
                        start = i * samplesPerPixel;
                        end = (i + 1) * samplesPerPixel > chanLength ? chanLength : (i + 1) * samplesPerPixel;
                        segment = channel.subarray(start, end);
                        extrema = findMinMax(segment);
                        min = convert(extrema.min, bits);
                        max = convert(extrema.max, bits);
                        peaks[i * 2] = min;
                        peaks[i * 2 + 1] = max;
                    }
                    return peaks;
                }
                /**
   * @param {TypedArray} source - Source of audio samples for peak calculations.
   * @param {Number} samplesPerPixel - Number of audio samples per peak.
   * @param {Number} cueIn - index in channel to start peak calculations from.
   * @param {Number} cueOut - index in channel to end peak calculations from (non-inclusive).
   */ function audioPeaks(source, samplesPerPixel = 10000, bits = 8) {
                    if ([
                        8,
                        16,
                        32
                    ].indexOf(bits) < 0) throw new Error("Invalid number of bits specified for peaks.");
                    const peaks = [];
                    const start = 0;
                    const end = source.length;
                    peaks.push(extractPeaks(source.subarray(start, end), samplesPerPixel, bits));
                    const length = peaks[0].length / 2;
                    return {
                        bits,
                        length,
                        data: peaks
                    };
                }
                onmessage = function onmessage1(e) {
                    const peaks = audioPeaks(e.data.samples, e.data.samplesPerPixel);
                    postMessage(peaks);
                };
            }
            /* harmony default export */ function exportWavWorker() {
                let recLength = 0;
                let recBuffersL = [];
                let recBuffersR = [];
                let sampleRate;
                function init(config) {
                    sampleRate = config.sampleRate;
                }
                function record(inputBuffer) {
                    recBuffersL.push(inputBuffer[0]);
                    recBuffersR.push(inputBuffer[1]);
                    recLength += inputBuffer[0].length;
                }
                function writeString(view, offset, string) {
                    for(let i = 0; i < string.length; i += 1)view.setUint8(offset + i, string.charCodeAt(i));
                }
                function floatTo16BitPCM(output, offset, input) {
                    let writeOffset = offset;
                    for(let i = 0; i < input.length; i += 1, writeOffset += 2){
                        const s = Math.max(-1, Math.min(1, input[i]));
                        output.setInt16(writeOffset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
                    }
                }
                function encodeWAV(samples, mono = false) {
                    const buffer = new ArrayBuffer(44 + samples.length * 2);
                    const view = new DataView(buffer);
                    /* RIFF identifier */ writeString(view, 0, "RIFF");
                    /* file length */ view.setUint32(4, 32 + samples.length * 2, true);
                    /* RIFF type */ writeString(view, 8, "WAVE");
                    /* format chunk identifier */ writeString(view, 12, "fmt ");
                    /* format chunk length */ view.setUint32(16, 16, true);
                    /* sample format (raw) */ view.setUint16(20, 1, true);
                    /* channel count */ view.setUint16(22, mono ? 1 : 2, true);
                    /* sample rate */ view.setUint32(24, sampleRate, true);
                    /* byte rate (sample rate * block align) */ view.setUint32(28, sampleRate * 4, true);
                    /* block align (channel count * bytes per sample) */ view.setUint16(32, 4, true);
                    /* bits per sample */ view.setUint16(34, 16, true);
                    /* data chunk identifier */ writeString(view, 36, "data");
                    /* data chunk length */ view.setUint32(40, samples.length * 2, true);
                    floatTo16BitPCM(view, 44, samples);
                    return view;
                }
                function mergeBuffers(recBuffers, length) {
                    const result = new Float32Array(length);
                    let offset = 0;
                    for(let i = 0; i < recBuffers.length; i += 1){
                        result.set(recBuffers[i], offset);
                        offset += recBuffers[i].length;
                    }
                    return result;
                }
                function interleave(inputL, inputR) {
                    const length = inputL.length + inputR.length;
                    const result = new Float32Array(length);
                    let index = 0;
                    let inputIndex = 0;
                    while(index < length){
                        result[index += 1] = inputL[inputIndex];
                        result[index += 1] = inputR[inputIndex];
                        inputIndex += 1;
                    }
                    return result;
                }
                function exportWAV(type) {
                    const bufferL = mergeBuffers(recBuffersL, recLength);
                    const bufferR = mergeBuffers(recBuffersR, recLength);
                    const interleaved = interleave(bufferL, bufferR);
                    const dataview = encodeWAV(interleaved);
                    const audioBlob = new Blob([
                        dataview
                    ], {
                        type
                    });
                    postMessage(audioBlob);
                }
                function clear() {
                    recLength = 0;
                    recBuffersL = [];
                    recBuffersR = [];
                }
                onmessage = function onmessage1(e) {
                    switch(e.data.command){
                        case "init":
                            init(e.data.config);
                            break;
                        case "record":
                            record(e.data.buffer);
                            break;
                        case "exportWAV":
                            exportWAV(e.data.type);
                            break;
                        case "clear":
                            clear();
                            break;
                        default:
                            throw new Error("Unknown export worker command");
                    }
                };
            }
            /* harmony default export */ const Playlist = class {
                constructor(){
                    this.tracks = [];
                    this.soloedTracks = [];
                    this.mutedTracks = [];
                    this.collapsedTracks = [];
                    this.playoutPromises = [];
                    this.cursor = 0;
                    this.playbackSeconds = 0;
                    this.duration = 0;
                    this.scrollLeft = 0;
                    this.scrollTimer = undefined;
                    this.showTimescale = false;
                    // whether a user is scrolling the waveform
                    this.isScrolling = false;
                    this.fadeType = "logarithmic";
                    this.masterGain = 1;
                    this.annotations = [];
                    this.durationFormat = "hh:mm:ss.uuu";
                    this.isAutomaticScroll = false;
                    this.resetDrawTimer = undefined;
                    this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                }
                // TODO extract into a plugin
                initExporter() {
                    this.exportWorker = new (inline_worker_default())(exportWavWorker);
                }
                trimAudioBuffer(audioBuffer, trimDurationInSeconds) {
                    const sampleRate = audioBuffer.sampleRate;
                    const startSample = Math.floor(trimDurationInSeconds * sampleRate);
                    if (startSample >= audioBuffer.length) // If the trim duration is longer than the audio, return an empty buffer.
                    return this.ac.createBuffer(1, 1, sampleRate);
                    const trimmedBuffer = this.ac.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length - startSample, sampleRate);
                    // Copy data from the original buffer to the trimmed buffer, excluding the trimmed part.
                    for(let channel = 0; channel < audioBuffer.numberOfChannels; channel++){
                        const sourceData = audioBuffer.getChannelData(channel);
                        const destinationData = trimmedBuffer.getChannelData(channel);
                        for(let i = 0; i < trimmedBuffer.length; i++)destinationData[i] = sourceData[i + startSample];
                    }
                    return trimmedBuffer;
                }
                // TODO extract into a plugin
                initRecorder(stream, track, name = "Recording") {
                    this.fixedRecordingTrack = track !== undefined;
                    this.recordingTrack = track;
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.onstart = ()=>{
                        if (!this.fixedRecordingTrack) {
                            const track = new Track();
                            track.setName(name);
                            track.setEnabledStates();
                            track.setEventEmitter(this.ee);
                            this.recordingTrack = track;
                            this.tracks.push(track);
                        }
                        const start = this.cursor;
                        this.recordingTrack.setStartTime(start);
                        this.chunks = [];
                        this.working = false;
                    };
                    this.mediaRecorder.ondataavailable = (e)=>{
                        this.chunks.push(e.data);
                        // throttle peaks calculation
                        if (!this.working) {
                            const recording = new Blob(this.chunks, {
                                type: "audio/ogg; codecs=opus"
                            });
                            const loader = LoaderFactory.createLoader(recording, this.ac);
                            loader.load().then((audioBuffer)=>{
                                // THIS AFFECTS TO ALL (RECORDED AND PLAYOUT) BUT IT'S CALCULATED EVERY 300 ms
                                if (this.latency > 0) audioBuffer = this.trimAudioBuffer(audioBuffer, this.latency);
                                // ask web worker for peaks.
                                this.recorderWorker.postMessage({
                                    samples: audioBuffer.getChannelData(0),
                                    samplesPerPixel: this.samplesPerPixel
                                });
                                this.recordingTrack.setCues(0, audioBuffer.duration);
                                this.recordingTrack.setBuffer(audioBuffer);
                                // THIS AFFECTS ONLY TO PLAYOUT IT'S CALCULATED EVERY 300 ms
                                //audioBuffer = this.trimAudioBuffer(audioBuffer, this.latency) // Chrome Mac 
                                this.recordingTrack.setPlayout(new Playout(this.ac, audioBuffer, this.masterGainNode));
                                this.adjustDuration();
                            }).catch(()=>{
                                this.working = false;
                            });
                            this.working = true;
                        }
                    };
                    this.mediaRecorder.onstop = ()=>{
                        this.chunks = [];
                        this.working = false;
                    };
                    this.recorderWorker = new (inline_worker_default())(recorderWorker);
                    // use a worker for calculating recording peaks.
                    this.recorderWorker.onmessage = (e)=>{
                        this.recordingTrack.setPeaks(e.data);
                        this.working = false;
                        this.drawRequest();
                    };
                }
                setShowTimeScale(show) {
                    this.showTimescale = show;
                }
                setMono(mono) {
                    this.mono = mono;
                }
                setExclSolo(exclSolo) {
                    this.exclSolo = exclSolo;
                }
                setSeekStyle(style) {
                    this.seekStyle = style;
                }
                getSeekStyle() {
                    return this.seekStyle;
                }
                setSampleRate(sampleRate) {
                    this.sampleRate = sampleRate;
                }
                setSamplesPerPixel(samplesPerPixel) {
                    this.samplesPerPixel = samplesPerPixel;
                }
                setAudioContext(ac) {
                    this.ac = ac;
                    this.masterGainNode = ac.createGain();
                }
                getAudioContext() {
                    return this.ac;
                }
                setControlOptions(controlOptions) {
                    this.controls = controlOptions;
                }
                setWaveHeight(height) {
                    this.waveHeight = height;
                }
                setCollapsedWaveHeight(height) {
                    this.collapsedWaveHeight = height;
                }
                setColors(colors) {
                    this.colors = colors;
                }
                setBarWidth(width) {
                    this.barWidth = width;
                }
                setBarGap(width) {
                    this.barGap = width;
                }
                setAnnotations(config) {
                    const controlWidth = this.controls.show ? this.controls.width : 0;
                    this.annotationList = new annotation_AnnotationList(this, config.annotations, config.controls, config.editable, config.linkEndpoints, config.isContinuousPlay, controlWidth);
                }
                setEffects(effectsGraph) {
                    this.effectsGraph = effectsGraph;
                }
                setEventEmitter(ee) {
                    this.ee = ee;
                }
                getEventEmitter() {
                    return this.ee;
                }
                setUpEventEmitter() {
                    const ee = this.ee;
                    ee.on("automaticscroll", (val)=>{
                        this.isAutomaticScroll = val;
                    });
                    ee.on("durationformat", (format)=>{
                        this.durationFormat = format;
                        this.drawRequest();
                    });
                    ee.on("select", (start, end, track)=>{
                        if (this.isPlaying()) {
                            this.lastSeeked = start;
                            this.pausedAt = undefined;
                            this.restartPlayFrom(start);
                        } else {
                            // reset if it was paused.
                            this.seek(start, end, track);
                            this.ee.emit("timeupdate", start);
                            this.drawRequest();
                        }
                    });
                    ee.on("startaudiorendering", (type, trackPos)=>{
                        this.startOfflineRender(type, trackPos);
                    });
                    ee.on("statechange", (state)=>{
                        this.setState(state);
                        this.drawRequest();
                    });
                    ee.on("shift", (deltaTime, track)=>{
                        track.setStartTime(track.getStartTime() + deltaTime);
                        this.adjustDuration();
                        this.drawRequest();
                    });
                    ee.on("record", (latency)=>{
                        this.latency = latency;
                        this.record();
                    });
                    ee.on("updateview", ()=>{
                        this.drawRequest();
                    });
                    ee.on("resume", async ()=>{
                        console.log(`Audio context state change: ${this.getAudioContext().state}`);
                        if (this.getAudioContext().state === "running") await this.getAudioContext().resume();
                    });
                    ee.on("play", (start, end)=>{
                        this.play(start, end);
                    });
                    ee.on("pause", ()=>{
                        this.pause();
                    });
                    ee.on("stop", ()=>{
                        this.stop();
                    });
                    ee.on("rewind", ()=>{
                        this.rewind();
                    });
                    ee.on("fastforward", ()=>{
                        this.fastForward();
                    });
                    ee.on("clear", ()=>{
                        this.clear().then(()=>{
                            this.drawRequest();
                        });
                    });
                    ee.on("solo", (track)=>{
                        this.soloTrack(track);
                        this.adjustTrackPlayout();
                        this.drawRequest();
                    });
                    ee.on("mute", (track)=>{
                        this.muteTrack(track);
                        this.adjustTrackPlayout();
                        this.drawRequest();
                    });
                    ee.on("removeTrack", (track)=>{
                        this.removeTrack(track);
                        this.adjustTrackPlayout();
                        this.drawRequest();
                    });
                    ee.on("changeTrackView", (track, opts)=>{
                        this.collapseTrack(track, opts);
                        this.drawRequest();
                    });
                    ee.on("volumechange", (volume, track)=>{
                        track.setGainLevel(volume / 100);
                        this.drawRequest();
                    });
                    ee.on("mastervolumechange", (volume)=>{
                        this.masterGain = volume / 100;
                        this.tracks.forEach((track)=>{
                            track.setMasterGainLevel(this.masterGain);
                        });
                    });
                    ee.on("fadein", (duration, track)=>{
                        track.setFadeIn(duration, this.fadeType);
                        this.drawRequest();
                    });
                    ee.on("fadeout", (duration, track)=>{
                        track.setFadeOut(duration, this.fadeType);
                        this.drawRequest();
                    });
                    ee.on("stereopan", (panvalue, track)=>{
                        track.setStereoPanValue(panvalue);
                        this.drawRequest();
                    });
                    ee.on("fadetype", (type)=>{
                        this.fadeType = type;
                    });
                    ee.on("newtrack", (file)=>{
                        this.load([
                            {
                                src: file,
                                name: file.name
                            }
                        ]);
                    });
                    ee.on("trim", ()=>{
                        const track = this.getActiveTrack();
                        const timeSelection = this.getTimeSelection();
                        track.trim(timeSelection.start, timeSelection.end);
                        track.calculatePeaks(this.samplesPerPixel, this.sampleRate);
                        this.setTimeSelection(0, 0);
                        this.adjustDuration();
                        this.drawRequest();
                    });
                    ee.on("zoomin", ()=>{
                        const zoomIndex = Math.max(0, this.zoomIndex - 1);
                        const zoom = this.zoomLevels[zoomIndex];
                        if (zoom !== this.samplesPerPixel) {
                            this.setZoom(zoom);
                            this.drawRequest();
                        }
                    });
                    ee.on("zoomout", ()=>{
                        const zoomIndex = Math.min(this.zoomLevels.length - 1, this.zoomIndex + 1);
                        const zoom = this.zoomLevels[zoomIndex];
                        if (zoom !== this.samplesPerPixel) {
                            this.setZoom(zoom);
                            this.drawRequest();
                        }
                    });
                    ee.on("scroll", ()=>{
                        this.isScrolling = true;
                        this.drawRequest();
                        clearTimeout(this.scrollTimer);
                        this.scrollTimer = setTimeout(()=>{
                            this.isScrolling = false;
                        }, 200);
                    });
                }
                load(trackList) {
                    const loadPromises = trackList.map((trackInfo)=>{
                        const loader = LoaderFactory.createLoader(trackInfo.src, this.ac, this.ee);
                        return loader.load().then((audioBuffer)=>{
                            if (audioBuffer.sampleRate === this.sampleRate) return audioBuffer;
                            else return resampleAudioBuffer(audioBuffer, this.sampleRate);
                        });
                    });
                    return Promise.all(loadPromises).then((audioBuffers)=>{
                        this.ee.emit("audiosourcesloaded");
                        const tracks = audioBuffers.map((audioBuffer, index)=>{
                            const info = trackList[index];
                            const name = info.name || "Untitled";
                            const start = info.start || 0;
                            const states = info.states || {};
                            const fadeIn = info.fadeIn;
                            const fadeOut = info.fadeOut;
                            const cueIn = info.cuein || 0;
                            const cueOut = info.cueout || audioBuffer.duration;
                            const gain = info.gain || 1;
                            const muted = info.muted || false;
                            const soloed = info.soloed || false;
                            const selection = info.selected;
                            const peaks = info.peaks || {
                                type: "WebAudio",
                                mono: this.mono
                            };
                            const customClass = info.customClass || undefined;
                            const waveOutlineColor = info.waveOutlineColor || undefined;
                            const stereoPan = info.stereoPan || 0;
                            const effects = info.effects || null;
                            // webaudio specific playout for now.
                            const playout = new Playout(this.ac, audioBuffer, this.masterGainNode);
                            const track = new Track();
                            track.src = info.src;
                            track.setBuffer(audioBuffer);
                            track.setName(name);
                            track.setEventEmitter(this.ee);
                            track.setEnabledStates(states);
                            track.setCues(cueIn, cueOut);
                            track.setCustomClass(customClass);
                            track.setWaveOutlineColor(waveOutlineColor);
                            if (fadeIn !== undefined) track.setFadeIn(fadeIn.duration, fadeIn.shape);
                            if (fadeOut !== undefined) track.setFadeOut(fadeOut.duration, fadeOut.shape);
                            if (selection !== undefined) {
                                this.setActiveTrack(track);
                                this.setTimeSelection(selection.start, selection.end);
                            }
                            if (peaks !== undefined) track.setPeakData(peaks);
                            track.setState(this.getState());
                            track.setStartTime(start);
                            track.setPlayout(playout);
                            track.setGainLevel(gain);
                            track.setStereoPanValue(stereoPan);
                            if (effects) track.setEffects(effects);
                            if (muted) this.muteTrack(track);
                            if (soloed) this.soloTrack(track);
                            // extract peaks with AudioContext for now.
                            track.calculatePeaks(this.samplesPerPixel, this.sampleRate);
                            return track;
                        });
                        this.tracks = this.tracks.concat(tracks);
                        this.adjustDuration();
                        this.draw(this.render());
                        this.ee.emit("audiosourcesrendered");
                    }).catch((e)=>{
                        this.ee.emit("audiosourceserror", e);
                    });
                }
                /*
    track instance of Track.
  */ setActiveTrack(track) {
                    this.activeTrack = track;
                }
                getActiveTrack() {
                    return this.activeTrack;
                }
                isSegmentSelection() {
                    return this.timeSelection.start !== this.timeSelection.end;
                }
                /*
    start, end in seconds.
  */ setTimeSelection(start = 0, end) {
                    this.timeSelection = {
                        start,
                        end: end === undefined ? start : end
                    };
                    this.cursor = start;
                }
                async startOfflineRender(type, trackPos) {
                    if (this.isRendering) return;
                    this.isRendering = true;
                    this.offlineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(2, 44100 * this.duration, 44100);
                    const setUpChain = [];
                    this.ee.emit("audiorenderingstarting", this.offlineAudioContext, setUpChain);
                    const currentTime = this.offlineAudioContext.currentTime;
                    const mg = this.offlineAudioContext.createGain();
                    this.tracks.forEach((track, pos)=>{
                        let shouldPlay = this.shouldTrackPlay(track);
                        if (trackPos >= 0) shouldPlay = pos === trackPos;
                        const playout = new Playout(this.offlineAudioContext, track.buffer, mg);
                        playout.setEffects(track.effectsGraph);
                        playout.setMasterEffects(this.effectsGraph);
                        track.setOfflinePlayout(playout);
                        track.schedulePlay(currentTime, 0, 0, {
                            shouldPlay: shouldPlay,
                            masterGain: 1,
                            isOffline: true
                        });
                    });
                    /*
      TODO cleanup of different audio playouts handling.
    */ await Promise.all(setUpChain);
                    let audioBuffer = await this.offlineAudioContext.startRendering();
                    // TODO: check this approach
                    /*if(trackPos && this.latency) {
     // TO LISTEN THE FIX MUST REFRESH BROWSER        
     audioBuffer = this.trimAudioBuffer(audioBuffer, this.latency)
    } */ if (type === "buffer") {
                        this.ee.emit("audiorenderingfinished", type, audioBuffer);
                        this.isRendering = false;
                    } else if (type === "wav") {
                        this.exportWorker.postMessage({
                            command: "init",
                            config: {
                                sampleRate: 44100
                            }
                        });
                        // callback for `exportWAV`
                        this.exportWorker.onmessage = (e)=>{
                            this.ee.emit("audiorenderingfinished", type, e.data, trackPos);
                            this.isRendering = false;
                            // clear out the buffer for next renderings.
                            this.exportWorker.postMessage({
                                command: "clear"
                            });
                        };
                        // send the channel data from our buffer to the worker
                        this.exportWorker.postMessage({
                            command: "record",
                            buffer: [
                                audioBuffer.getChannelData(0),
                                audioBuffer.getChannelData(1)
                            ]
                        });
                        // ask the worker for a WAV
                        this.exportWorker.postMessage({
                            command: "exportWAV",
                            type: "audio/wav"
                        });
                    }
                }
                getTimeSelection() {
                    return this.timeSelection;
                }
                setState(state) {
                    this.state = state;
                    this.tracks.forEach((track)=>{
                        track.setState(state);
                    });
                }
                getState() {
                    return this.state;
                }
                setZoomIndex(index) {
                    this.zoomIndex = index;
                }
                setZoomLevels(levels) {
                    this.zoomLevels = levels;
                }
                setZoom(zoom) {
                    this.samplesPerPixel = zoom;
                    this.zoomIndex = this.zoomLevels.indexOf(zoom);
                    this.tracks.forEach((track)=>{
                        track.calculatePeaks(zoom, this.sampleRate);
                    });
                }
                muteTrack(track) {
                    const index = this.mutedTracks.indexOf(track);
                    if (index > -1) {
                        track.muted = false;
                        this.mutedTracks.splice(index, 1);
                    } else {
                        track.muted = true;
                        this.mutedTracks.push(track);
                    }
                }
                soloTrack(track) {
                    const index = this.soloedTracks.indexOf(track);
                    if (index > -1) {
                        track.soloed = false;
                        this.soloedTracks.splice(index, 1);
                    } else if (this.exclSolo) {
                        track.soloed = true;
                        this.soloedTracks = [
                            track
                        ];
                    } else {
                        track.soloed = true;
                        this.soloedTracks.push(track);
                    }
                }
                collapseTrack(track, opts) {
                    if (opts.collapsed) this.collapsedTracks.push(track);
                    else {
                        const index = this.collapsedTracks.indexOf(track);
                        if (index > -1) this.collapsedTracks.splice(index, 1);
                    }
                }
                removeTrack(track) {
                    if (track.isPlaying()) track.scheduleStop();
                    const trackLists = [
                        this.mutedTracks,
                        this.soloedTracks,
                        this.collapsedTracks,
                        this.tracks
                    ];
                    trackLists.forEach((list)=>{
                        const index = list.indexOf(track);
                        if (index > -1) list.splice(index, 1);
                    });
                    this.adjustDuration();
                }
                adjustTrackPlayout() {
                    this.tracks.forEach((track)=>{
                        track.setShouldPlay(this.shouldTrackPlay(track));
                    });
                }
                adjustDuration() {
                    this.duration = this.tracks.reduce((duration, track)=>Math.max(duration, track.getEndTime()), 0);
                }
                shouldTrackPlay(track) {
                    let shouldPlay;
                    // if there are solo tracks, only they should play.
                    if (this.soloedTracks.length > 0) {
                        shouldPlay = false;
                        if (this.soloedTracks.indexOf(track) > -1) shouldPlay = true;
                    } else {
                        // play all tracks except any muted tracks.
                        shouldPlay = true;
                        if (this.mutedTracks.indexOf(track) > -1) shouldPlay = false;
                    }
                    return shouldPlay;
                }
                isPlaying() {
                    return this.tracks.reduce((isPlaying, track)=>isPlaying || track.isPlaying() || this.mediaRecorder && this.mediaRecorder.state === "recording", false);
                }
                /*
   *   returns the current point of time in the playlist in seconds.
   */ getCurrentTime() {
                    const cursorPos = this.lastSeeked || this.pausedAt || this.cursor;
                    return cursorPos + this.getElapsedTime();
                }
                getElapsedTime() {
                    return this.ac.currentTime - this.lastPlay;
                }
                setMasterGain(gain) {
                    this.ee.emit("mastervolumechange", gain);
                }
                restartPlayFrom(start, end) {
                    this.stopAnimation();
                    this.tracks.forEach((editor)=>{
                        editor.scheduleStop();
                    });
                    return Promise.all(this.playoutPromises).then(this.play.bind(this, start, end));
                }
                play(startTime, endTime) {
                    clearTimeout(this.resetDrawTimer);
                    const currentTime = this.ac.currentTime;
                    const selected = this.getTimeSelection();
                    const playoutPromises = [];
                    const start = startTime === 0 ? 0 : startTime || this.pausedAt || this.cursor;
                    let end = endTime;
                    if (!end && selected.end !== selected.start && selected.end > start) end = selected.end;
                    if (this.isPlaying()) return this.restartPlayFrom(start, end);
                    // TODO refector this in upcoming modernisation.
                    if (this.effectsGraph) this.tracks && this.tracks[0].playout.setMasterEffects(this.effectsGraph);
                    this.tracks.forEach((track)=>{
                        track.setState("cursor");
                        playoutPromises.push(track.schedulePlay(currentTime, start, end, {
                            shouldPlay: this.shouldTrackPlay(track),
                            masterGain: this.masterGain
                        }));
                    });
                    this.lastPlay = currentTime;
                    // use these to track when the playlist has fully stopped.
                    this.playoutPromises = playoutPromises;
                    this.startAnimation(start);
                    return Promise.all(this.playoutPromises);
                }
                pause() {
                    if (!this.isPlaying()) return Promise.all(this.playoutPromises);
                    this.pausedAt = this.getCurrentTime();
                    return this.playbackReset();
                }
                stop() {
                    if (this.mediaRecorder && this.mediaRecorder.state === "recording") this.mediaRecorder.stop();
                    this.pausedAt = undefined;
                    this.playbackSeconds = 0;
                    return this.playbackReset();
                }
                playbackReset() {
                    this.lastSeeked = undefined;
                    this.stopAnimation();
                    this.tracks.forEach((track)=>{
                        track.scheduleStop();
                        track.setState(this.getState());
                    });
                    // TODO improve this.
                    if (!this.isSafari) this.masterGainNode.disconnect();
                    this.drawRequest();
                    return Promise.all(this.playoutPromises);
                }
                rewind() {
                    return this.stop().then(()=>{
                        this.scrollLeft = 0;
                        this.ee.emit("select", 0, 0);
                    });
                }
                fastForward() {
                    return this.stop().then(()=>{
                        if (this.viewDuration < this.duration) this.scrollLeft = this.duration - this.viewDuration;
                        else this.scrollLeft = 0;
                        this.ee.emit("select", this.duration, this.duration);
                    });
                }
                clear(trackPos) {
                    return this.stop().then(()=>{
                        var newArray = [];
                        if (trackPos || trackPos === 0) {
                            this.tracks.splice(trackPos, 1);
                            newArray = this.tracks;
                        }
                        this.tracks = newArray;
                        this.soloedTracks = [];
                        this.mutedTracks = [];
                        this.playoutPromises = [];
                        this.cursor = 0;
                        this.playbackSeconds = 0;
                        this.duration = 0;
                        this.scrollLeft = 0;
                        this.seek(0, 0, undefined);
                    });
                }
                record() {
                    const playoutPromises = [];
                    const start = this.cursor;
                    this.mediaRecorder.start(300);
                    this.tracks.forEach((track)=>{
                        track.setState("none");
                        playoutPromises.push(track.schedulePlay(this.ac.currentTime, start, undefined, {
                            shouldPlay: track !== this.recordingTrack && this.shouldTrackPlay(track)
                        }));
                    });
                    this.playoutPromises = playoutPromises;
                    this.startAnimation(start);
                }
                startAnimation(startTime) {
                    this.lastDraw = this.ac.currentTime;
                    this.animationRequest = window.requestAnimationFrame(()=>{
                        this.updateEditor(startTime);
                    });
                }
                stopAnimation() {
                    window.cancelAnimationFrame(this.animationRequest);
                    this.lastDraw = undefined;
                }
                seek(start, end, track) {
                    if (this.isPlaying()) {
                        this.lastSeeked = start;
                        this.pausedAt = undefined;
                        this.restartPlayFrom(start);
                    } else {
                        // reset if it was paused.
                        this.setActiveTrack(track || this.tracks[0]);
                        this.pausedAt = start;
                        this.setTimeSelection(start, end);
                        if (this.getSeekStyle() === "fill") this.playbackSeconds = start;
                    }
                }
                /*
   * Animation function for the playlist.
   * Keep under 16.7 milliseconds based on a typical screen refresh rate of 60fps.
   */ updateEditor(cursor) {
                    const currentTime = this.ac.currentTime;
                    const selection = this.getTimeSelection();
                    const cursorPos = cursor || this.cursor;
                    const elapsed = currentTime - this.lastDraw;
                    if (this.isPlaying()) {
                        const playbackSeconds = cursorPos + elapsed;
                        this.ee.emit("timeupdate", playbackSeconds);
                        this.animationRequest = window.requestAnimationFrame(()=>{
                            this.updateEditor(playbackSeconds);
                        });
                        this.playbackSeconds = playbackSeconds;
                        this.draw(this.render());
                        this.lastDraw = currentTime;
                    } else {
                        if (cursorPos + elapsed >= (this.isSegmentSelection() ? selection.end : this.duration)) this.ee.emit("finished");
                        this.stopAnimation();
                        this.resetDrawTimer = setTimeout(()=>{
                            this.pausedAt = undefined;
                            this.lastSeeked = undefined;
                            this.setState(this.getState());
                            this.playbackSeconds = 0;
                            this.draw(this.render());
                        }, 0);
                    }
                }
                drawRequest() {
                    window.requestAnimationFrame(()=>{
                        this.draw(this.render());
                    });
                }
                draw(newTree) {
                    const patches = diff_default()(this.tree, newTree);
                    this.rootNode = patch_default()(this.rootNode, patches);
                    this.tree = newTree;
                    // use for fast forwarding.
                    this.viewDuration = pixelsToSeconds(this.rootNode.clientWidth - this.controls.width, this.samplesPerPixel, this.sampleRate);
                }
                getTrackRenderData(data = {}) {
                    const defaults = {
                        height: this.waveHeight,
                        resolution: this.samplesPerPixel,
                        sampleRate: this.sampleRate,
                        controls: this.controls,
                        isActive: false,
                        timeSelection: this.getTimeSelection(),
                        playlistLength: this.duration,
                        playbackSeconds: this.playbackSeconds,
                        colors: this.colors,
                        barWidth: this.barWidth,
                        barGap: this.barGap
                    };
                    return lodash_defaultsdeep_default()({}, data, defaults);
                }
                isActiveTrack(track) {
                    const activeTrack = this.getActiveTrack();
                    if (this.isSegmentSelection()) return activeTrack === track;
                    return true;
                }
                renderAnnotations() {
                    return this.annotationList.render();
                }
                renderTimeScale() {
                    const controlWidth = this.controls.show ? this.controls.width : 0;
                    const timeScale = new src_TimeScale(this.duration, this.scrollLeft, this.samplesPerPixel, this.sampleRate, controlWidth, this.colors);
                    return timeScale.render();
                }
                renderTrackSection() {
                    const trackElements = this.tracks.map((track)=>{
                        const collapsed = this.collapsedTracks.indexOf(track) > -1;
                        return track.render(this.getTrackRenderData({
                            isActive: this.isActiveTrack(track),
                            shouldPlay: this.shouldTrackPlay(track),
                            soloed: this.soloedTracks.indexOf(track) > -1,
                            muted: this.mutedTracks.indexOf(track) > -1,
                            collapsed,
                            height: collapsed ? this.collapsedWaveHeight : this.waveHeight,
                            barGap: this.barGap,
                            barWidth: this.barWidth
                        }));
                    });
                    return h_default()("div.playlist-tracks", {
                        attributes: {
                            style: "overflow: auto;"
                        },
                        onscroll: (e)=>{
                            this.scrollLeft = pixelsToSeconds(e.target.scrollLeft, this.samplesPerPixel, this.sampleRate);
                            this.ee.emit("scroll");
                        },
                        hook: new ScrollHook(this)
                    }, trackElements);
                }
                render() {
                    const containerChildren = [];
                    if (this.showTimescale) containerChildren.push(this.renderTimeScale());
                    containerChildren.push(this.renderTrackSection());
                    if (this.annotationList.length) containerChildren.push(this.renderAnnotations());
                    return h_default()("div.playlist", {
                        attributes: {
                            style: "overflow: hidden; position: relative;"
                        }
                    }, containerChildren);
                }
                getInfo() {
                    const tracks = [];
                    this.tracks.forEach((track)=>{
                        tracks.push(track.getTrackDetails());
                    });
                    return {
                        tracks,
                        effects: this.effectsGraph
                    };
                }
            };
            function init(options = {}, ee = event_emitter_default()()) {
                if (options.container === undefined) throw new Error("DOM element container must be given.");
                const defaults = {
                    samplesPerPixel: 4096,
                    mono: true,
                    fadeType: "logarithmic",
                    exclSolo: false,
                    timescale: false,
                    controls: {
                        show: false,
                        width: 150,
                        widgets: {
                            muteOrSolo: true,
                            volume: true,
                            stereoPan: true,
                            collapse: true,
                            remove: true
                        }
                    },
                    colors: {
                        waveOutlineColor: "white",
                        timeColor: "grey",
                        fadeColor: "black"
                    },
                    seekStyle: "line",
                    waveHeight: 128,
                    collapsedWaveHeight: 30,
                    barWidth: 1,
                    barGap: 0,
                    state: "cursor",
                    zoomLevels: [
                        512,
                        1024,
                        2048,
                        4096
                    ],
                    annotationList: {
                        annotations: [],
                        controls: [],
                        editable: false,
                        linkEndpoints: false,
                        isContinuousPlay: false
                    },
                    isAutomaticScroll: false
                };
                const config = lodash_defaultsdeep_default()({}, options, defaults);
                const zoomIndex = config.zoomLevels.indexOf(config.samplesPerPixel);
                if (zoomIndex === -1) throw new Error("initial samplesPerPixel must be included in array zoomLevels");
                const playlist = new Playlist();
                const AudioContext = window.AudioContext || window.webkitAudioContext || false;
                const ctx = config.ac || new AudioContext({
                    latencyHint: 0
                });
                playlist.setAudioContext(ctx);
                playlist.setSampleRate(config.sampleRate || ctx.sampleRate);
                playlist.setSamplesPerPixel(config.samplesPerPixel);
                playlist.setEventEmitter(ee);
                playlist.setUpEventEmitter();
                playlist.setTimeSelection(0, 0);
                playlist.setState(config.state);
                playlist.setControlOptions(config.controls);
                playlist.setWaveHeight(config.waveHeight);
                playlist.setCollapsedWaveHeight(config.collapsedWaveHeight);
                playlist.setColors(config.colors);
                playlist.setZoomLevels(config.zoomLevels);
                playlist.setZoomIndex(zoomIndex);
                playlist.setMono(config.mono);
                playlist.setExclSolo(config.exclSolo);
                playlist.setShowTimeScale(config.timescale);
                playlist.setSeekStyle(config.seekStyle);
                playlist.setAnnotations(config.annotationList);
                playlist.setBarGap(config.barGap);
                playlist.setBarWidth(config.barWidth);
                playlist.isAutomaticScroll = config.isAutomaticScroll;
                playlist.isContinuousPlay = config.isContinuousPlay;
                playlist.linkedEndpoints = config.linkedEndpoints;
                if (config.effects) playlist.setEffects(config.effects);
                // take care of initial virtual dom rendering.
                const tree = playlist.render();
                const rootNode = create_element_default()(tree);
                config.container.appendChild(rootNode);
                playlist.tree = tree;
                playlist.rootNode = rootNode;
                return playlist;
            }
            /* harmony default export */ function app(options = {}, ee = event_emitter_default()()) {
                return init(options, ee);
            }
        })();
        /******/ return __webpack_exports__;
    /******/ })();
});

},{}],"3tXgN":[function(require,module,exports) {
/* https://github.com/naomiaro/waveform-playlist/blob/master/dist/waveform-playlist/js/record.js */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Recorder", ()=>Recorder);
var _composition = require("./composition");
var _compositionHelper = require("./composition_helper");
var _utils = require("../../../common/js/utils");
var _webdictaphone = require("./webdictaphone/webdictaphone");
var _eventemitter = require("./eventemitter");
class Recorder {
    constructor(browserId){
        this.recordGainNode = null;
        this.browserId = browserId;
    }
    init(compositionId) {
        let userMediaStream;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        const gotStream = (stream)=>{
            const audCtxt = new AudioContext({
                latencyHint: 0
            });
            (0, _composition.createWaveformPlaylist)(audCtxt, stream);
            userMediaStream = this.getCorrectStreamForSafari(stream);
            // userMediaStream.getTracks().forEach(async function(track) {
            //     console.log('Record Track ', track)
            //     console.log('Record Track Settings', track.getSettings())
            //     console.log('Record Track Capabilities', track.getCapabilities())
            // })
            (0, _composition.playlist).initRecorder(userMediaStream, undefined, "Voice Track");
            $(".btn-record").removeClass("disabled");
            this.setRecordGainNodeForTest(this.recordGainNode);
            (0, _eventemitter.initEventEmitter)();
            (0, _eventemitter.enableUpdatesOnEmitter)();
            (0, _compositionHelper.getComposition)(compositionId, (0, _compositionHelper.doAfterCompositionFetched));
        };
        const logError = (err)=>{
            console.error(err);
            const audCtxt = new AudioContext({
                latencyHint: 0
            });
            (0, _composition.createWaveformPlaylist)(audCtxt);
            (0, _eventemitter.initEventEmitter)();
            (0, _eventemitter.enableUpdatesOnEmitter)();
            (0, _compositionHelper.getComposition)(compositionId, (0, _compositionHelper.doAfterCompositionFetched));
        };
        if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia((0, _utils.MEDIA_CONSTRAINTS)).then(gotStream).catch(logError);
        else if (navigator.getUserMedia && "MediaRecorder" in window) navigator.getUserMedia((0, _utils.MEDIA_CONSTRAINTS), gotStream, logError);
    }
    getCorrectStreamForSafari(stream) {
        const browserVersion = parseInt(this.browserId.version);
        if (this.browserId.browser === "safari" && browserVersion >= 16) {
            const micsource = (0, _composition.playlist).ac.createMediaStreamSource(stream);
            this.recordGainNode = (0, _composition.playlist).ac.createGain();
            micsource.connect(this.recordGainNode);
            const micGain = localStorage.getItem("micgain");
            const defaultGain = micGain ? parseInt(micGain) : 1;
            this.recordGainNode.gain.value = defaultGain;
            const dest = (0, _composition.playlist).ac.createMediaStreamDestination();
            dest.channelCount = 1;
            this.recordGainNode.connect(dest);
            return dest.stream;
        } else return stream;
    }
    setRecordGainNodeForTest(recordGainNode) {
        const browserVersion = parseInt(this.browserId.version);
        if (this.browserId.browser === "safari" && browserVersion >= 16) {
            const testMic = new (0, _webdictaphone.TestMic)();
            testMic.init(recordGainNode, (0, _composition.playlist).ac);
        }
    }
}

},{"./composition":"9ZuIT","./composition_helper":"fxAYF","../../../common/js/utils":"g7t25","./webdictaphone/webdictaphone":"eVO8r","./eventemitter":"iELOq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iELOq":[function(require,module,exports) {
/*
 * This script is provided to give an example how the playlist can be controlled using the event emitter.
 * This enables projects to create/control the useability of the project.
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initEventEmitter", ()=>initEventEmitter);
parcelHelpers.export(exports, "enableUpdatesOnEmitter", ()=>enableUpdatesOnEmitter);
var _indexedDB = require("../../../common/js/indexedDB");
var _composition = require("./composition");
var _compositionHelper = require("./composition_helper");
/* https://github.com/naomiaro/waveform-playlist/blob/master/dist/waveform-playlist/js/emitter.js */ //var ee = playlist.getEventEmitter();
var ee = null;
var $container = $("body");
var $timeFormat = $container.find(".time-format");
var $audioStart = $container.find(".audio-start");
var $audioEnd = $container.find(".audio-end");
var $time = $container.find(".audio-pos");
var format = "hh:mm:ss.uuu";
var startTime = 0;
var endTime = 0;
var audioPos = 0;
var downloadUrl = undefined;
var isLooping = false;
var playoutPromises;
var isRecording = false;
function toggleActive(node) {
    var active = node.parentNode.querySelectorAll(".active");
    var i = 0, len = active.length;
    for(; i < len; i++)active[i].classList.remove("active");
    node.classList.toggle("active");
}
function cueFormatters(format) {
    function clockFormat(seconds, decimals) {
        var hours, minutes, secs, result;
        hours = parseInt(seconds / 3600, 10) % 24;
        minutes = parseInt(seconds / 60, 10) % 60;
        secs = seconds % 60;
        secs = secs.toFixed(decimals);
        result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (secs < 10 ? "0" + secs : secs);
        return result;
    }
    var formats = {
        "seconds": function(seconds) {
            return seconds.toFixed(0);
        },
        "thousandths": function(seconds) {
            return seconds.toFixed(3);
        },
        "hh:mm:ss": function(seconds) {
            return clockFormat(seconds, 0);
        },
        "hh:mm:ss.u": function(seconds) {
            return clockFormat(seconds, 1);
        },
        "hh:mm:ss.uu": function(seconds) {
            return clockFormat(seconds, 2);
        },
        "hh:mm:ss.uuu": function(seconds) {
            return clockFormat(seconds, 3);
        }
    };
    return formats[format];
}
function updateSelect(start, end) {
    if (start < end) {
        $(".btn-trim-audio").removeClass("disabled");
        $(".btn-loop").removeClass("disabled");
    } else {
        $(".btn-trim-audio").addClass("disabled");
        $(".btn-loop").addClass("disabled");
    }
    $audioStart.val(cueFormatters(format)(start));
    $audioEnd.val(cueFormatters(format)(end));
    startTime = start;
    endTime = end;
}
function updateTime(time) {
    $time.html(cueFormatters(format)(time));
    audioPos = time;
}
updateSelect(startTime, endTime);
updateTime(audioPos);
let downloadProgressItems = {};
function updateDownloadProgress(name, percent) {
    const downloadProgressElem = document.getElementById("download-progress-elems");
    if (downloadProgressElem && !downloadProgressElem.hidden) {
        let downloadProgress = 0;
        downloadProgressItems[name] = percent;
        const downloadProgressBar = document.getElementById("download-progress-bar");
        const downloadPercentage = document.getElementById("download-percentage");
        for (const [key, value] of Object.entries(downloadProgressItems))downloadProgress += value;
        const progressNumber = (downloadProgress / (0, _compositionHelper.NUM_TRACKS)).toFixed(2);
        downloadProgressBar.value = progressNumber / 100;
        downloadPercentage.innerHTML = progressNumber + " %";
        if (progressNumber == 100) downloadProgressElem.innerHTML = `Rendering...<br><progress></progress>`;
    }
}
/*
* Code below sets up events to send messages to the playlist.
*/ // $container.on("click", ".btn-playlist-state-group", function() {
//   //reset these for now.
//   $('.btn-fade-state-group').addClass('hidden');
//   $('.btn-select-state-group').addClass('hidden');
//   if ($('.btn-select').hasClass('active')) {
//     $('.btn-select-state-group').removeClass('hidden');
//   }
//   if ($('.btn-fadein').hasClass('active') || $('.btn-fadeout').hasClass('active')) {
//     $('.btn-fade-state-group').removeClass('hidden');
//   }
// });
$container.on("click", ".btn-annotations-download", function() {
    ee.emit("annotationsrequest");
});
$container.on("click", ".btn-loop", function() {
    isLooping = true;
    playoutPromises = (0, _composition.playlist).play(startTime, endTime);
});
$container.on("click", ".btn-play", function() {
    ee.emit("play");
    $(".btn-group .btn-record").prop("disabled", true);
});
$container.on("click", ".btn-pause", function() {
    isLooping = false;
    ee.emit("pause");
    $(".btn-group .btn-record").prop("disabled", false);
});
$container.on("click", ".btn-stop", function() {
    isLooping = false;
    if (isRecording) {
        isRecording = false;
        if (0, _composition.USER_PERMISSION) {
            const newTrackPos = (0, _composition.playlist).getInfo().tracks.length - 1;
            ee.emit("startaudiorendering", "wav", newTrackPos);
        }
    }
    ee.emit("stop");
    $(".btn-group button").prop("disabled", false);
});
$container.on("click", ".btn-rewind", function() {
    isLooping = false;
    ee.emit("rewind");
    $(".btn-group .btn-record").prop("disabled", false);
});
$container.on("click", ".btn-fast-forward", function() {
    isLooping = false;
    ee.emit("fastforward");
    $(".btn-group .btn-record").prop("disabled", false);
});
$container.on("click", ".btn-clear", function() {
    isLooping = false;
    ee.emit("clear");
});
const startRecording = (currentLatency)=>{
    if (!isRecording) {
        isRecording = true;
        const latencyInSeconds = currentLatency / 1000;
        $(".btn-group button").prop("disabled", true);
        $(".btn-group .btn-stop").prop("disabled", false);
        ee.emit("record", latencyInSeconds);
    }
};
$container.on("click", ".btn-record", function() {
    if (!isRecording) {
        let currentLatency = localStorage.getItem("latency");
        currentLatency = currentLatency ? parseInt(currentLatency) : 0;
        startRecording(currentLatency);
    }
});
//track interaction states
$container.on("click", ".btn-cursor", function() {
    ee.emit("statechange", "cursor");
    toggleActive(this);
});
$container.on("click", ".btn-select", function() {
    ee.emit("statechange", "select");
    toggleActive(this);
});
$container.on("click", ".btn-shift", function() {
    ee.emit("statechange", "shift");
    toggleActive(this);
});
$container.on("click", ".btn-fadein", function() {
    ee.emit("statechange", "fadein");
    toggleActive(this);
});
$container.on("click", ".btn-fadeout", function() {
    ee.emit("statechange", "fadeout");
    toggleActive(this);
});
//fade types
$container.on("click", ".btn-logarithmic", function() {
    ee.emit("fadetype", "logarithmic");
    toggleActive(this);
});
$container.on("click", ".btn-linear", function() {
    ee.emit("fadetype", "linear");
    toggleActive(this);
});
$container.on("click", ".btn-scurve", function() {
    ee.emit("fadetype", "sCurve");
    toggleActive(this);
});
$container.on("click", ".btn-exponential", function() {
    ee.emit("fadetype", "exponential");
    toggleActive(this);
});
//zoom buttons
$container.on("click", ".btn-zoom-in", function() {
    ee.emit("zoomin");
});
$container.on("click", ".btn-zoom-out", function() {
    ee.emit("zoomout");
});
$container.on("click", ".btn-trim-audio", function() {
    ee.emit("trim");
});
$container.on("click", ".btn.print", function() {
    console.log((0, _composition.playlist).getInfo());
});
$container.on("click", ".btn-download", function() {
    ee.emit("startaudiorendering", "wav");
});
$container.on("click", ".btn-seektotime", function() {
    var time = parseInt(document.getElementById("seektime").value, 10);
    ee.emit("select", time, time);
});
$container.on("change", ".select-seek-style", function(node) {
    (0, _composition.playlist).setSeekStyle(node.target.value);
});
//track drop
$container.on("change", "#fileInput", function(e) {
    var changeEvent = this.files;
    for(var i = 0; i < changeEvent.length; i++)ee.emit("newtrack", changeEvent[i]);
});
$container.on("dragenter", ".track-drop", function(e) {
    e.preventDefault();
    e.target.classList.add("drag-enter");
});
$container.on("dragover", ".track-drop", function(e) {
    e.preventDefault();
});
$container.on("dragleave", ".track-drop", function(e) {
    e.preventDefault();
    e.target.classList.remove("drag-enter");
});
$container.on("drop", ".track-drop", function(e) {
    e.preventDefault();
    e.target.classList.remove("drag-enter");
    var dropEvent = e.originalEvent;
    for(var i = 0; i < dropEvent.dataTransfer.files.length; i++)ee.emit("newtrack", dropEvent.dataTransfer.files[i]);
});
$container.on("change", ".time-format", function(e) {
    format = $timeFormat.val();
    ee.emit("durationformat", format);
    updateSelect(startTime, endTime);
    updateTime(audioPos);
});
$container.on("input change", ".master-gain", function(e) {
    ee.emit("mastervolumechange", e.target.value);
});
$container.on("change", ".continuous-play", function(e) {
    ee.emit("continuousplay", $(e.target).is(":checked"));
});
$container.on("change", ".link-endpoints", function(e) {
    ee.emit("linkendpoints", $(e.target).is(":checked"));
});
$container.on("change", ".automatic-scroll", function(e) {
    ee.emit("automaticscroll", $(e.target).is(":checked"));
});
function storeTrackSettings(trackObject) {
    if (trackObject?.customClass) {
        let trackSettings = (({ muted, gain, soloed, stereoPan })=>({
                muted,
                gain,
                soloed,
                stereoPan
            }))(trackObject);
        trackSettings["track_id"] = trackObject.customClass.track_id;
        trackSettings["composition_id"] = trackObject.customClass.composition_id;
        const viewer_id = trackObject.customClass.viewer_id || (0, _compositionHelper.CURRENT_USER_ID);
        if (!(0, _indexedDB.DB)) (0, _indexedDB.openDB)(viewer_id).then((db)=>{
            (0, _indexedDB.updateTable)(db, trackSettings);
        });
        else (0, _indexedDB.updateTable)((0, _indexedDB.DB), trackSettings);
    }
}
function displaySoundStatus(status, trackObject) {
    storeTrackSettings(trackObject);
    $(".sound-status").html(status);
}
function displayLoadingData(data) {
    var info = $("<div/>").append(data);
    $(".loading-data").append(info);
}
function displayDownloadLink(link) {
    var dateString = new Date().toISOString();
    var $link = $("<a/>", {
        "href": link,
        "download": "waveformplaylist" + dateString + ".wav",
        "text": "Download mix " + dateString,
        "class": "btn btn-small btn-download-link"
    });
    $(".btn-download-link").remove();
    $(".btn-download").after($link);
}
const initEventEmitter = ()=>{
    ee = (0, _composition.playlist).getEventEmitter();
};
const enableUpdatesOnEmitter = ()=>{
    /*
  * Code below receives updates from the playlist.
  */ ee.on("select", updateSelect);
    ee.on("timeupdate", updateTime);
    ee.on("mute", function(track) {
        displaySoundStatus("Mute button pressed for " + track.name, track);
    });
    ee.on("solo", function(track) {
        displaySoundStatus("Solo button pressed for " + track.name, track);
    });
    let volumetimeout = null;
    ee.on("volumechange", function(volume, track) {
        displaySoundStatus(track.name + " now has volume " + volume + ".");
        clearTimeout(volumetimeout);
        volumetimeout = setTimeout(()=>{
            storeTrackSettings(track);
        }, 500);
    });
    let stereopantimeout = null;
    ee.on("stereopan", function(value, track) {
        displaySoundStatus(track.name + " now has stereo pan " + value + ".");
        clearTimeout(stereopantimeout);
        stereopantimeout = setTimeout(()=>{
            storeTrackSettings(track);
        }, 500);
    });
    ee.on("mastervolumechange", function(volume) {
        displaySoundStatus("Master volume now has volume " + volume + ".");
    });
    var audioStates = [
        "uninitialized",
        "loading",
        "decoding",
        "finished"
    ];
    ee.on("audiorequeststatechange", function(state, src) {
        var name = src;
        if (src instanceof File) name = src.name;
        displayLoadingData("Track " + name + " is in state " + audioStates[state]);
    });
    ee.on("loadprogress", function(percent, src) {
        var name = src;
        if (src instanceof File) name = src.name;
        updateDownloadProgress(name, percent);
        displayLoadingData("Track " + name + " has loaded " + percent + "%");
    });
    ee.on("audiosourcesloaded", function() {
        displayLoadingData("Tracks have all finished decoding.");
    });
    let fileCounter = 0;
    let processTracks = [];
    ee.on("audiosourcesrendered", function() {
        const downloadProgressElem = document.getElementById("download-progress-elems");
        if (downloadProgressElem && !downloadProgressElem.hidden) downloadProgressElem.remove();
        if (0, _composition.USER_PERMISSION) {
            const theFile = document.getElementById("fileInput");
            const numberNewFiles = theFile.files.length;
            if (numberNewFiles) {
                const trackPos = (0, _composition.playlist).tracks.length - 1;
                const trackUID = Date.now();
                (0, _composition.playlist).tracks[trackPos].trackuid = trackUID;
                if (fileCounter < numberNewFiles) {
                    processTracks.push((0, _composition.playlist).tracks[trackPos]);
                    fileCounter++;
                }
                if (fileCounter === numberNewFiles) {
                    const arrayFiles = Array.from(theFile.files);
                    for(let pos = 0; pos < theFile.files.length; pos++){
                        const index = arrayFiles.findIndex((obj)=>obj.name === processTracks[pos].name);
                        (0, _composition.fileUploader).sendData(arrayFiles[index], null, processTracks[pos].trackuid);
                    }
                    processTracks = [];
                    fileCounter = 0;
                }
            } else displayLoadingData("Tracks have been rendered");
        }
    });
    ee.on("audiosourceserror", function(e) {
        displayLoadingData(e.message);
    });
    ee.on("audiorenderingfinished", function(type, data, trackPos) {
        if (trackPos >= 0 && (0, _composition.USER_PERMISSION)) {
            const trackUID = Date.now();
            data.name = "audio";
            data.fileName = trackUID + ".wav";
            (0, _composition.playlist).tracks[trackPos].trackuid = trackUID;
            (0, _composition.fileUploader).sendData(data, "blob", trackUID);
        } else if (type == "wav") {
            if (downloadUrl) window.URL.revokeObjectURL(downloadUrl);
            downloadUrl = window.URL.createObjectURL(data);
            displayDownloadLink(downloadUrl);
        }
    });
    ee.on("finished", function() {
        console.log("The cursor has reached the end of the selection !");
        $(".btn-group .btn-record").prop("disabled", false);
        if (isLooping) playoutPromises.then(function() {
            playoutPromises = (0, _composition.playlist).play(startTime, endTime);
        });
    });
};

},{"../../../common/js/indexedDB":"lKsJx","./composition":"9ZuIT","./composition_helper":"fxAYF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"64S6j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TEST_LAT_BTN_ID", ()=>TEST_LAT_BTN_ID);
parcelHelpers.export(exports, "TEST_LAT_MLS_BTN_ID", ()=>TEST_LAT_MLS_BTN_ID);
parcelHelpers.export(exports, "displayLatencyUI", ()=>displayLatencyUI);
parcelHelpers.export(exports, "triggerTestLatencyButton", ()=>triggerTestLatencyButton);
parcelHelpers.export(exports, "triggerLatencyTestHandler", ()=>triggerLatencyTestHandler);
var _test = require("./latencymls/test");
var _testlatency = require("./latencymeasure/testlatency");
var _testlatency1 = require("./latencyadenot/testlatency");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _detectBrowserJs = require("../../../common/js/detect-browser.js");
var _detectBrowserJsDefault = parcelHelpers.interopDefault(_detectBrowserJs);
var _composition = require("./composition");
const TEST_LAT_BTN_ID = "testlatencybtn";
const TEST_LAT_MLS_BTN_ID = "testlatencymlsbtn";
let latencyTestInitialized = false;
const browserId = (0, _detectBrowserJsDefault.default)();
const imageUrl = new URL(require("f22f6cd0ccfd70e4"));
const displayLatencyUI = (value)=>{
    const uielem = document.getElementById("current-lat-val");
    if (uielem) uielem.innerText = value;
};
const triggerTestLatencyButton = ()=>{
    return `<li class='nav-item'>
    <a class='nav-link' href='#' id='trigger-lat-test-btn' data-toggle='modal' 
      data-toggle='popover' data-placement='bottom'  title='Testing ...' data-content='No input detected'>
      LATENCY TEST</a>
  </li>`;
};
let active_lat_test = {
    mls: true,
    ringbuf: false,
    scrptprc: false
};
const testLatFinishCallback = ()=>{
    if (active_lat_test.ringbuf && (0, _testlatency1.TestLatRingBuf).running) (0, _testlatency1.TestLatRingBuf).stopTest();
    if (active_lat_test.scrptprc && (0, _testlatency.TestLatScriptProc).startbutton.innerText === "STOP") (0, _testlatency.TestLatScriptProc).finishTest();
};
const latencyWarningModal = `<div class="modal fade" id="latencyTestWarning" tabindex="-1" aria-labelledby="latencyTestWarningLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-warning">
              <h5 class="modal-title" id="latencyTestWarning">Latency Test Issue</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <p>It seems there's a problem trying to estimate the latency. Please check the audio settings of your device carefully.</p> 
                <!-- If you have any issue you can also visit our support page. <p>More information at: <span> <a href="${window.location.origin}/static/support.html" target="_blank">${window.location.origin}/static/support.html</a></span></p> -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
    </div>`;
const manualSetLatencyHandler = ()=>{
    document.getElementById("latencyslider").onchange = (event)=>{
        localStorage.setItem("latency", event.target.value);
        document.getElementById("latinputval").value = event.target.value;
        displayLatencyUI(event.target.value);
    };
    document.getElementById("latinputval").onchange = (event)=>{
        localStorage.setItem("latency", event.target.value);
        document.getElementById("latencyslider").value = event.target.value;
        displayLatencyUI(event.target.value);
    };
};
const openLatencyTestDialog = (stream)=>{
    const debugCanvas = document.location.search.indexOf("debug") !== -1;
    const currentLat = localStorage.getItem("latency");
    (0, _modaldialogDefault.default).dynamicModalDialog(`<img src='${imageUrl}' class='img-fluid' alt='...'>
        <p>Place your mic as close as possible to the speakers/headphones.</p>
        <p class='alert alert-danger'><b>WARNING!</b> Be careful with the volume as a noise will be played through the speakers.</p>
        <p>${currentLat ? '<i>Current latency: <span id="current-lat-val">' + currentLat + "</span>" + " ms.</i>" : ""}</p>
        ${active_lat_test.mls ? `<a class='nav-link' href='#' id='${TEST_LAT_MLS_BTN_ID}' data-toggle='modal' 
        data-toggle='popover' data-placement='bottom'  title='Testing ...' data-content='No input detected'></a><br>` : ""}       
        <details ${debugCanvas ? "" : "hidden"}>
            <summary>Advanced</summary>
            <br/>
             ${active_lat_test.ringbuf ? `<label for=''><i>Test using AudioWorklet: </i></label>
             <a id='btn-start' class='nav-link' href='#'>START</a><br>` : ""}
             ${active_lat_test.scrptprc ? `<label for=''>Via ScriptProcessor: </label>
             <a class='nav-link' href='#' id='${TEST_LAT_BTN_ID}' data-toggle='modal' 
                data-toggle='popover' data-placement='bottom'  title='Testing ...' data-content='No input detected'>
                Test Latency</a><br>` : ""}
            <p><label for='formControlLatRange'>Set the value manually (ms): </label>
                <div class='form-group col-md-5'>
                <input id='latinputval' type='number' min='0' max='500' class='form-control' placeholder='${currentLat || 0}'>
                </div>
                <input type='range' min='0' max='500' class='form-control-range' id='latencyslider' value='${currentLat || 0}'>
            </p>
        </details>
        ${latencyWarningModal}
       `, null, "", "Close", "Latency Test", "bg-success", testLatFinishCallback);
    manualSetLatencyHandler();
    if (!latencyTestInitialized) {
        latencyTestInitialized = true;
        active_lat_test.mls && (0, _test.TestLatencyMLS).initialize((0, _composition.playlist).ac, stream, TEST_LAT_MLS_BTN_ID, debugCanvas, browserId);
        active_lat_test.ringbuf && (0, _testlatency1.TestLatRingBuf).initialize((0, _composition.playlist).ac, stream);
        active_lat_test.scrptprc && (0, _testlatency.TestLatScriptProc).initialize((0, _composition.playlist).ac);
    } else {
        active_lat_test.mls && (0, _test.TestLatencyMLS).displayStart();
        active_lat_test.ringbuf && (0, _testlatency1.TestLatRingBuf).buttonHandlers();
        active_lat_test.scrptprc && (0, _testlatency.TestLatScriptProc).displayStart();
    }
};
let wakeLock = null;
const enableWakeLock = async ()=>{
    if ("wakeLock" in navigator) try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake Lock Activated");
    } catch (err) {
        wakeLock = false;
        // The Wake Lock request has failed - usually system related, such as battery.
        console.log("Error", err);
    }
};
const triggerLatencyTestHandler = (stream)=>{
    console.log(browserId);
    if (browserId.os === "ipad" || browserId.os === "iphone" || browserId.browser === "safari") active_lat_test.ringbuf = false;
    document.getElementById("trigger-lat-test-btn").onclick = async ()=>{
        if (wakeLock === null) await enableWakeLock();
        openLatencyTestDialog(stream);
    };
};

},{"./latencymls/test":"jShDz","./latencymeasure/testlatency":"fraCr","./latencyadenot/testlatency":"2E6by","../../../common/js/modaldialog":"geXkr","../../../common/js/detect-browser.js":"bUrti","./composition":"9ZuIT","f22f6cd0ccfd70e4":"616En","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jShDz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TestLatencyMLS", ()=>TestLatencyMLS);
var _helper = require("./helper");
var _mls = require("./mls");
var _latencytesthandler = require("../latencytesthandler");
const CANVAS = `<div class='container' id='audio-area'>
                    <canvas id='leftChannelCanvas' width='800' height='100' style='border:1px solid #000000;'></canvas>
                    <canvas id='rightChannelCanvas' width='800' height='100' style='border:1px solid #000000;' hidden></canvas>
                    <canvas id='autocorrelationCanvas1' style='border:1px solid #000000;'></canvas>
                    <canvas id='autocorrelationCanvas2' style='border:1px solid #000000;' hidden></canvas>
                </div>`;
class TestLatencyMLS {
    currentlatency = null;
    noiseBuffer = null;
    silenceBuffer = null;
    debugCanvas = false;
    audioContext = null;
    worker = null;
    signalrecorded = null;
    btnId = null;
    inputStream = null;
    browserId = null;
    static setCurrentLatency(latvalue) {
        localStorage.setItem("latency", latvalue);
        (0, _latencytesthandler.displayLatencyUI)(latvalue);
        TestLatencyMLS.currentlatency = latvalue;
    }
    static getCurrentLatency() {
        return TestLatencyMLS.currentlatency;
    }
    static getCorrectStreamForSafari(stream) {
        const browserVersion = parseInt(TestLatencyMLS.browserId.version);
        if (TestLatencyMLS.browserId.browser === "safari" && browserVersion >= 16) {
            const micsource = TestLatencyMLS.audioContext.createMediaStreamSource(stream);
            TestLatencyMLS.recordGainNode = TestLatencyMLS.audioContext.createGain();
            micsource.connect(TestLatencyMLS.recordGainNode);
            const defaultGain = 50 // force the gain to be 50 so it does not depend on manual control
            ;
            TestLatencyMLS.recordGainNode.gain.value = defaultGain;
            const dest = TestLatencyMLS.audioContext.createMediaStreamDestination();
            dest.channelCount = 1;
            TestLatencyMLS.recordGainNode.connect(dest);
            return dest.stream;
        } else return stream;
    }
    static async initialize(ac, stream, btnId, debugCanvas, browserId) {
        TestLatencyMLS.browserId = browserId;
        TestLatencyMLS.btnId = btnId;
        TestLatencyMLS.worker = new Worker(require("160869e8e6b4eaeb"));
        TestLatencyMLS.worker.addEventListener("message", (message)=>{
            TestLatencyMLS.workerMessageHanlder(message);
        });
        if (debugCanvas) {
            console.log("AudioContext", ac);
            TestLatencyMLS.debugCanvas = debugCanvas;
            document.getElementById("page-header").insertAdjacentHTML("afterend", CANVAS);
        }
        const currentlatency = localStorage.getItem("latency");
        TestLatencyMLS.currentlatency = currentlatency ? parseInt(currentlatency) : null;
        TestLatencyMLS.audioContext = ac;
        TestLatencyMLS.onAudioPermissionGranted(stream);
    }
    static onAudioPermissionGranted(inputStream) {
        const noisemls = (0, _mls.generateMLS)(15);
        TestLatencyMLS.noiseBuffer = TestLatencyMLS.generateAudio(noisemls, TestLatencyMLS.audioContext.sampleRate);
        TestLatencyMLS.silenceBuffer = TestLatencyMLS.generateSilence(noisemls, TestLatencyMLS.audioContext.sampleRate);
        const userMediaStream = TestLatencyMLS.getCorrectStreamForSafari(inputStream);
        TestLatencyMLS.inputStream = userMediaStream;
        if (TestLatencyMLS.debugCanvas) userMediaStream.getTracks().forEach(async function(track) {
            console.log("Test Latency Track Settings", track.getSettings());
        });
        TestLatencyMLS.displayStart();
    }
    static displayStart() {
        TestLatencyMLS.content = document.getElementById(TestLatencyMLS.btnId);
        TestLatencyMLS.content.innerHTML = "";
        TestLatencyMLS.startbutton = document.createElement("a");
        TestLatencyMLS.startbutton.innerText = "TEST LATENCY";
        TestLatencyMLS.startbutton.classList.add("btn-outline-success");
        TestLatencyMLS.startbutton.onclick = TestLatencyMLS.onAudioSetupFinished;
        TestLatencyMLS.content.appendChild(TestLatencyMLS.startbutton);
        if (TestLatencyMLS.debugCanvas) (0, _helper.clearCanvas)();
    }
    static async onAudioSetupFinished() {
        TestLatencyMLS.startbutton.innerText = "STOP";
        TestLatencyMLS.startbutton.classList.remove("btn-outline-success");
        TestLatencyMLS.startbutton.classList.add("btn-outline-danger");
        TestLatencyMLS.startbutton.onclick = TestLatencyMLS.displayStart;
        TestLatencyMLS.prepareAudioToPlayAndrecord();
    }
    static prepareAudioToPlayAndrecord() {
        TestLatencyMLS.signalrecorded = null;
        const silenceSource = TestLatencyMLS.audioContext.createBufferSource();
        silenceSource.buffer = TestLatencyMLS.silenceBuffer;
        silenceSource.connect(TestLatencyMLS.audioContext.destination);
        const doTheTest = ()=>{
            const noiseSource = TestLatencyMLS.audioContext.createBufferSource();
            noiseSource.buffer = TestLatencyMLS.noiseBuffer;
            noiseSource.connect(TestLatencyMLS.audioContext.destination);
            let chunks = [];
            const mediaRecorder = new MediaRecorder(TestLatencyMLS.inputStream);
            mediaRecorder.ondataavailable = async (event)=>{
                chunks.push(event.data);
            };
            mediaRecorder.onstop = async ()=>{
                noiseSource.disconnect(TestLatencyMLS.audioContext.destination);
                TestLatencyMLS.displayAudioTagElem(chunks, mediaRecorder.mimeType);
            };
            mediaRecorder.start();
            noiseSource.start();
            noiseSource.onended = function() {
                mediaRecorder.stop();
                TestLatencyMLS.finishTest();
            };
        };
        silenceSource.start();
        silenceSource.onended = function() {
            silenceSource.disconnect(TestLatencyMLS.audioContext.destination);
            doTheTest();
        };
    }
    static finishTest() {
        TestLatencyMLS.startbutton.innerText = "PROCESSING... ";
        TestLatencyMLS.startbutton.classList.remove("btn-outline-danger");
        TestLatencyMLS.startbutton.classList.add("btn-outline-primary");
        TestLatencyMLS.startbutton.onclick = TestLatencyMLS.displayStart;
    }
    static async blobToAudioBuffer(audioContext, blob) {
        const arrayBuffer = await blob.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer);
    }
    static workerMessageHanlder(message) {
        if (message.data.correlation) {
            TestLatencyMLS.correlation = message.data.correlation;
            TestLatencyMLS.worker.postMessage({
                command: "findpeak",
                array: TestLatencyMLS.correlation,
                channel: message.data.channel
            });
        }
        if (message.data.peakValuePow) TestLatencyMLS.displayresults(message.data, TestLatencyMLS.signalrecorded, TestLatencyMLS.noiseBuffer, TestLatencyMLS.correlation);
    }
    static async displayAudioTagElem(chunks, mimeType) {
        const recordedAudio = new Blob(chunks, {
            type: mimeType
        });
        TestLatencyMLS.signalrecorded = await TestLatencyMLS.blobToAudioBuffer(TestLatencyMLS.audioContext, recordedAudio);
        if (TestLatencyMLS.debugCanvas) {
            console.log("signalrecorded", TestLatencyMLS.signalrecorded);
            console.log("mlssignal", TestLatencyMLS.noiseBuffer);
        }
        TestLatencyMLS.correlation = null;
        TestLatencyMLS.worker.postMessage({
            command: "correlation",
            data1: TestLatencyMLS.signalrecorded.getChannelData(0),
            data2: TestLatencyMLS.noiseBuffer.getChannelData(0),
            maxLag: 0.600 * TestLatencyMLS.audioContext.sampleRate,
            channel: 0
        });
        URL.revokeObjectURL(recordedAudio);
    }
    static generateAudio(mlsSequence, frequency) {
        const audioBuffer = TestLatencyMLS.audioContext.createBuffer(1, mlsSequence.length, frequency);
        let bufferData = audioBuffer.getChannelData(0);
        for(let i = 0; i < mlsSequence.length; i++)// Convert binary sequence to audio signal
        bufferData[i] = mlsSequence[i] === 1 ? 1.0 : -1 // Map 1 to 1.0 and 0 to -1.0
        ;
        return audioBuffer;
    }
    static generateSilence(mlsSequence, frequency) {
        const audioBuffer = TestLatencyMLS.audioContext.createBuffer(1, mlsSequence.length, frequency);
        let bufferData = audioBuffer.getChannelData(0);
        const silenght = Math.trunc(mlsSequence.length / 8);
        for(let i = 0; i < silenght; i++)bufferData[i] = 0;
        return audioBuffer;
    }
    static displayresults(peak, signalrecorded, mlssignal, correlation) {
        if (peak.channel === 0) {
            const roundtriplatency = Number(peak.peakIndex / mlssignal.sampleRate * 1000).toFixed(2);
            const ratioIs = Math.log10(peak.peakValuePow / peak.mean);
            console.log("Corr Ratio", ratioIs);
            if (ratioIs <= 1.8) $("#latencyTestWarning").modal("show");
            else TestLatencyMLS.setCurrentLatency(roundtriplatency);
            TestLatencyMLS.startbutton.innerText = "TEST AGAIN ";
            TestLatencyMLS.startbutton.innerHTML += `<span class='badge badge-info'>lat: ${roundtriplatency} ms.</span>`;
            TestLatencyMLS.startbutton.innerHTML += `<span class='badge badge-light'>ratio: ${ratioIs.toFixed(2)}</span>`;
            TestLatencyMLS.startbutton.classList.remove("btn-outline-danger");
            if (TestLatencyMLS.debugCanvas) {
                console.log("peak energy info", peak);
                console.log("Latency = ", roundtriplatency + " ms");
                (0, _helper.drawResults)(signalrecorded.getChannelData(0), "leftChannelCanvas", "autocorrelationCanvas1", correlation);
                console.log("signalrecorded.numberOfChannels", signalrecorded.numberOfChannels);
                if (signalrecorded.numberOfChannels > 1) {
                    document.getElementById("rightChannelCanvas").hidden = false;
                    document.getElementById("autocorrelationCanvas2").hidden = false;
                    TestLatencyMLS.correlation = null;
                    TestLatencyMLS.worker.postMessage({
                        command: "correlation",
                        data1: TestLatencyMLS.signalrecorded.getChannelData(1),
                        data2: TestLatencyMLS.noiseBuffer.getChannelData(0),
                        maxLag: 0.600 * TestLatencyMLS.audioContext.sampleRate,
                        channel: 1
                    });
                }
            }
        } else {
            console.log("Channel", peak.channel);
            const roundtriplatency = peak.peakIndex / mlssignal.sampleRate * 1000;
            console.log("Latency = ", roundtriplatency + " ms");
            const ratioIs = Math.log10(peak.peakValuePow / peak.mean);
            console.log("Corr Ratio", ratioIs);
            (0, _helper.drawResults)(signalrecorded.getChannelData(1), "rightChannelCanvas", "autocorrelationCanvas2", TestLatencyMLS.correlation);
        }
    }
}

},{"./helper":"j5WaH","./mls":"gOfUC","../latencytesthandler":"64S6j","160869e8e6b4eaeb":"15cjC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j5WaH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawAutocorrelation", ()=>drawAutocorrelation);
parcelHelpers.export(exports, "clearCanvas", ()=>clearCanvas);
parcelHelpers.export(exports, "fetchAudioContext", ()=>fetchAudioContext);
parcelHelpers.export(exports, "calculateCrossCorrelation", ()=>calculateCrossCorrelation);
parcelHelpers.export(exports, "drawResults", ()=>drawResults);
function drawBuffer(width, height, context, data) {
    const step = Math.ceil(data.length / width);
    const amp = height / 2;
    for(let i = 0; i < width; i++){
        let min = 1.0;
        let max = -1;
        for(let j = 0; j < step; j++){
            const datum = data[i * step + j];
            if (datum < min) min = datum;
            if (datum > max) max = datum;
        }
        context.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
}
function drawAutocorrelation(autocorrelation, idcanvas) {
    const canvas = document.getElementById(idcanvas);
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
    const ctx = canvas.getContext("2d");
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Constants for drawing
    const width = canvas.width;
    const height = canvas.height;
    const maxAutocorrValue = Math.max(...autocorrelation);
    const padding = 40 // Padding for labels
    ;
    // Draw each point in the autocorrelation array
    autocorrelation.forEach((value, index)=>{
        const x = index / autocorrelation.length * (width - padding) + padding / 2;
        const y = (1 - value / maxAutocorrValue) * (height - padding) + padding / 2;
        // Draw a line from the middle to the value point
        ctx.beginPath();
        ctx.moveTo(x, height - padding / 2) // Start at the bottom of the plot area
        ;
        ctx.lineTo(x, y) // Draw to the computed y
        ;
        ctx.strokeStyle = "#FF0000" // Red color for the line
        ;
        ctx.stroke();
    });
    // Draw labels on the X axis
    ctx.fillStyle = "#000000" // Black color for text
    ;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const xLabelIncrement = Math.ceil(autocorrelation.length / 10) // Label every 10th index or so
    ;
    for(let i = 0; i <= autocorrelation.length; i += xLabelIncrement){
        const x = i / autocorrelation.length * (width - padding) + padding / 2;
        ctx.fillText(i, x, height - padding / 4);
    }
    // Draw labels on the Y axis
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    const yLabelIncrement = maxAutocorrValue / 5 // Five labels on the y-axis
    ;
    for(let i = 0; i <= 5; i++){
        const value = (yLabelIncrement * i).toFixed(2);
        const y = (1 - i / 5) * (height - padding) + padding / 2;
        ctx.fillText(value, padding / 2 - 10, y);
    }
}
const clearCanvas = ()=>{
    const canvas1 = document.getElementById("autocorrelationCanvas1");
    canvas1.width = window.innerWidth / 2;
    canvas1.height = window.innerHeight / 2;
    const ctx1 = canvas1.getContext("2d");
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    const canvas2 = document.getElementById("autocorrelationCanvas2");
    canvas2.width = window.innerWidth / 2;
    canvas2.height = window.innerHeight / 2;
    const ctx2 = canvas2.getContext("2d");
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    const canvasLeft = document.getElementById("leftChannelCanvas");
    const ctxLeft = canvasLeft.getContext("2d");
    ctxLeft.clearRect(0, 0, canvasLeft.width, canvasLeft.height);
    const canvasRight = document.getElementById("rightChannelCanvas");
    const ctxRight = canvasRight.getContext("2d");
    ctxRight.clearRect(0, 0, canvasRight.width, canvasRight.height);
};
async function fetchAudioContext(url, audioContext) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const decodeAudioData = await audioContext.decodeAudioData(arrayBuffer);
    return decodeAudioData;
}
function calculateCrossCorrelation(data1, data2, maxLag) {
    const n1 = data1.length, n2 = data2.length;
    let crossCorrelations = new Array(maxLag + 1).fill(0);
    for(let lag = 0; lag <= maxLag; lag++){
        let sum = 0;
        for(let i = lag; i < n1 && i - lag < n2; i++)sum += data1[i] * data2[i - lag];
        crossCorrelations[lag] = sum / (n1 - lag);
    }
    return crossCorrelations;
}
const drawResults = (signalrecorded, audioCanvasId, corrCanvasId, correlation)=>{
    const canvasSide = document.getElementById(audioCanvasId);
    drawBuffer(canvasSide.width, canvasSide.height, canvasSide.getContext("2d"), signalrecorded);
    drawAutocorrelation(correlation, corrCanvasId);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gOfUC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "generateMLS", ()=>generateMLS);
class BitError extends Error {
    constructor(message){
        super(message);
        this.name = "BitError";
    }
}
const bittaps = {
    2: [
        1
    ],
    3: [
        2
    ],
    4: [
        3
    ],
    5: [
        2
    ],
    6: [
        5
    ],
    7: [
        6
    ],
    8: [
        4,
        5,
        6
    ],
    9: [
        5
    ],
    10: [
        7
    ],
    11: [
        9
    ],
    12: [
        6,
        8,
        11
    ],
    13: [
        4,
        12
    ],
    14: [
        5,
        13
    ],
    15: [
        14
    ],
    16: [
        4,
        13,
        15
    ]
};
function lfsr(taps, buf) {
    let nbits = buf.length;
    let sr = buf.slice(); // clone array
    let out = [];
    for(let i = 0; i < (1 << nbits) - 1; i++){
        let feedback = sr[0];
        out.push(feedback ? 1 : 0);
        taps.forEach((t)=>{
            feedback ^= sr[t];
        });
        sr.push(feedback);
        sr.shift();
    }
    return out;
}
function mls(n, seed = null) {
    if (!(n in bittaps)) throw new BitError(`taps for ${n} bits unknown`);
    let taps = bittaps[n];
    if (seed === null) seed = Array(n).fill(1);
    else if (seed.length !== n) throw new BitError(`length of seed must equal ${n}`);
    return lfsr(taps, seed);
}
function generateMLS(nbits) {
    nbits = parseInt(nbits);
    let m = mls(nbits);
    // nbits = 65535
    return m;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"15cjC":[function(require,module,exports) {
let workerURL = require("1285ab1ba6fd7c98");
let bundleURL = require("98cd98f1b6476370");
let url = bundleURL.getBundleURL("1Z45C") + "worker.4669639a.js" + "?" + Date.now();
module.exports = workerURL(url, bundleURL.getOrigin(url), false);

},{"1285ab1ba6fd7c98":"cn2gM","98cd98f1b6476370":"lgJ39"}],"cn2gM":[function(require,module,exports) {
"use strict";
module.exports = function(workerUrl, origin, isESM) {
    if (origin === self.location.origin) // If the worker bundle's url is on the same origin as the document,
    // use the worker bundle's own url.
    return workerUrl;
    else {
        // Otherwise, create a blob URL which loads the worker bundle with `importScripts`.
        var source = isESM ? "import " + JSON.stringify(workerUrl) + ";" : "importScripts(" + JSON.stringify(workerUrl) + ");";
        return URL.createObjectURL(new Blob([
            source
        ], {
            type: "application/javascript"
        }));
    }
};

},{}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"fraCr":[function(require,module,exports) {
/* Source: https://github.com/superpoweredSDK/WebBrowserAudioLatencyMeasurement */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NUMBER_TRIALS", ()=>NUMBER_TRIALS);
parcelHelpers.export(exports, "TestLatScriptProc", ()=>TestLatScriptProc);
var _latencyMeasurerJs = require("./latencyMeasurer.js");
var _utils = require("../../../../common/js/utils");
var _latencytesthandler = require("../latencytesthandler");
const NUMBER_TRIALS = 6;
const TOTAL_TRIALS = NUMBER_TRIALS - 1;
class TestLatScriptProc {
    constructor(){
        this.currentlatency = null;
        this.audioInput = null;
    }
    static setCurrentLatency(latvalue) {
        localStorage.setItem("latency", latvalue);
        TestLatScriptProc.currentlatency = latvalue;
    }
    static getCurrentLatency() {
        return TestLatScriptProc.currentlatency;
    }
    static initialize(ac) {
        const currentlatency = localStorage.getItem("latency");
        TestLatScriptProc.currentlatency = currentlatency ? parseInt(currentlatency) : null;
        TestLatScriptProc.audioContext = TestLatScriptProc.audioNode = null;
        TestLatScriptProc.audioContext = ac;
        TestLatScriptProc.displayStart();
    }
    static displayStart() {
        TestLatScriptProc.audioNode = null;
        TestLatScriptProc.content = document.getElementById((0, _latencytesthandler.TEST_LAT_BTN_ID));
        TestLatScriptProc.content.innerHTML = "";
        TestLatScriptProc.startbutton = document.createElement("a");
        TestLatScriptProc.startbutton.innerText = "TEST LATENCY";
        TestLatScriptProc.startbutton.classList.add("btn-outline-warning");
        TestLatScriptProc.startbutton.onclick = TestLatScriptProc.start;
        TestLatScriptProc.content.appendChild(TestLatScriptProc.startbutton);
        $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).popover("hide");
        $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).popover({
            trigger: "focus"
        });
    }
    static onAudioInputPermissionDenied(error) {
        console.log(error);
    }
    static onMessageFromAudioScope(message) {
        if (message.latency > 0) {
            (0, _latencytesthandler.displayLatencyUI)(message.latency);
            TestLatScriptProc.setCurrentLatency(message.latency);
            const trialNum = message.state - 1;
            $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).attr("data-content", trialNum + "/" + TOTAL_TRIALS + " trials. Current latency: " + message.latency + " ms.");
            $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).popover("show");
        } else {
            $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).attr("data-content", "No input detected");
            $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).popover("show");
        }
        if (message.state >= NUMBER_TRIALS) TestLatScriptProc.finishTest(message.latency);
    }
    static onAudioSetupFinished() {
        TestLatScriptProc.audioInput = TestLatScriptProc.audioContext.createMediaStreamSource(TestLatScriptProc.inputStream);
        TestLatScriptProc.audioInput.connect(TestLatScriptProc.audioNode);
        TestLatScriptProc.audioNode.connect(TestLatScriptProc.audioContext.destination);
        TestLatScriptProc.startbutton.innerText = "STOP";
        TestLatScriptProc.startbutton.classList.remove("btn-outline-warning");
        TestLatScriptProc.startbutton.classList.add("btn-outline-danger");
        TestLatScriptProc.startbutton.onclick = TestLatScriptProc.finishTest;
    }
    static displayResultLatency(latency) {
        if (latency && latency > 0) {
            TestLatScriptProc.startbutton.innerText = "TEST AGAIN ";
            if (typeof latency !== "object") TestLatScriptProc.startbutton.innerHTML += `<span class="badge badge-info">latency: ${latency} ms.</span>`;
            TestLatScriptProc.startbutton.classList.remove("btn-outline-danger");
            TestLatScriptProc.startbutton.classList.add("btn-outline-primary");
        }
    }
    static finishTest(latency) {
        TestLatScriptProc.audioInput.disconnect(TestLatScriptProc.audioNode);
        TestLatScriptProc.audioNode.disconnect(TestLatScriptProc.audioContext.destination);
        TestLatScriptProc.audioNode = null;
        TestLatScriptProc.displayResultLatency(latency);
        TestLatScriptProc.startbutton.onclick = TestLatScriptProc.displayStart;
        $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).popover("hide");
    }
    static onAudioPermissionGranted(inputStream) {
        TestLatScriptProc.inputStream = inputStream;
        TestLatScriptProc.latencyMeasurer = new (0, _latencyMeasurerJs.latencyMeasurer)();
        TestLatScriptProc.latencyMeasurer.toggle();
        TestLatScriptProc.lastState = 0;
        // TODO: bufferSize 256 for ScriptProcessor works better to estimate the latency rather than 512
        TestLatScriptProc.audioNode = TestLatScriptProc.audioContext.createScriptProcessor(256, 2, 2);
        TestLatScriptProc.audioNode.onaudioprocess = function(e) {
            TestLatScriptProc.latencyMeasurer.processInput(e.inputBuffer.getChannelData(0), e.inputBuffer.getChannelData(1), TestLatScriptProc.audioContext.sampleRate, e.inputBuffer.length);
            TestLatScriptProc.latencyMeasurer.processOutput(e.outputBuffer.getChannelData(0), e.outputBuffer.getChannelData(1));
            if (TestLatScriptProc.lastState != TestLatScriptProc.latencyMeasurer.state) {
                TestLatScriptProc.lastState = TestLatScriptProc.latencyMeasurer.state;
                TestLatScriptProc.onMessageFromAudioScope({
                    state: TestLatScriptProc.lastState,
                    latency: TestLatScriptProc.latencyMeasurer.latencyMs
                });
            }
        };
        TestLatScriptProc.onAudioSetupFinished();
    }
    static async start() {
        $("#" + (0, _latencytesthandler.TEST_LAT_BTN_ID)).popover("hide");
        if (navigator.mediaDevices.getUserMedia) navigator.mediaDevices.getUserMedia((0, _utils.MEDIA_CONSTRAINTS)).then(TestLatScriptProc.onAudioPermissionGranted).catch(TestLatScriptProc.onAudioInputPermissionDenied);
        else TestLatScriptProc.onAudioInputPermissionDenied(`Can't access getUserMedia.`);
    }
}

},{"./latencyMeasurer.js":"anuTk","../../../../common/js/utils":"g7t25","../latencytesthandler":"64S6j","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"anuTk":[function(require,module,exports) {
/* Source: https://github.com/superpoweredSDK/WebBrowserAudioLatencyMeasurement */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "latencyMeasurer", ()=>latencyMeasurer);
var _testlatency = require("./testlatency");
const measurementStates = {
    measure_average_loudness_for_1_sec: 0,
    playing_and_listening: 1,
    waiting: 2,
    passthrough: 3,
    idle: 4
};
function sumAudio(left, right, numberOfSamples) {
    let sum = 0;
    for(let n = 0; n < numberOfSamples; n++)sum += Math.abs(left[n]) + Math.abs(right[n]);
    return sum;
}
class latencyMeasurer {
    constructor(){
        this.measurementState = this.nextMeasurementState = measurementStates.idle;
        this.samplesElapsed = this.sineWave = this.sum = this.threshold = this.state = this.samplerate = this.latencyMs = this.buffersize = 0;
        this.roundTripLatencyMs = new Array((0, _testlatency.NUMBER_TRIALS)).fill(0.0);
    }
    toggle() {
        if (this.state == -1 || this.state > 0 && this.state < (0, _testlatency.NUMBER_TRIALS) + 1) {
            this.state = 0;
            this.nextMeasurementState = measurementStates.idle;
        } else {
            this.state = 1;
            this.samplerate = this.latencyMs = this.buffersize = 0;
            this.nextMeasurementState = measurementStates.measure_average_loudness_for_1_sec;
        }
    }
    processInput(left, right, _samplerate, numberOfSamples) {
        this.rampdec = -1;
        this.samplerate = _samplerate;
        this.buffersize = numberOfSamples;
        if (this.nextMeasurementState != this.measurementState) {
            if (this.nextMeasurementState == measurementStates.measure_average_loudness_for_1_sec) this.samplesElapsed = 0;
            this.measurementState = this.nextMeasurementState;
        }
        switch(this.measurementState){
            // Measuring average loudness for 1 second.
            case measurementStates.measure_average_loudness_for_1_sec:
                this.sum += sumAudio(left, right, numberOfSamples);
                this.samplesElapsed += numberOfSamples;
                if (this.samplesElapsed >= this.samplerate) {
                    // Look for the audio energy rise of 24 decibel.
                    let averageAudioValue = this.sum / (this.samplesElapsed >> 1);
                    let referenceDecibel = 20.0 * Math.log10(averageAudioValue) + 24.0;
                    this.threshold = Math.pow(10.0, referenceDecibel / 20.0);
                    this.measurementState = this.nextMeasurementState = measurementStates.playing_and_listening;
                    this.sineWave = 0;
                    this.samplesElapsed = 0;
                    this.sum = 0;
                }
                break;
            // Playing sine wave and listening if it comes back.
            case measurementStates.playing_and_listening:
                let averageInputValue = sumAudio(left, right, numberOfSamples) / numberOfSamples;
                this.rampdec = 0.0;
                if (averageInputValue > this.threshold) {
                    let n = 0, i = 0;
                    while(n < numberOfSamples){
                        if (left[i] > this.threshold) break;
                        if (right[i++] > this.threshold) break;
                        n++;
                    }
                    this.samplesElapsed += n; // Now we know the total round trip latency.
                    if (this.samplesElapsed > numberOfSamples) {
                        this.roundTripLatencyMs[this.state - 1] = this.samplesElapsed * 1000 / this.samplerate;
                        let sum = 0, max = 0, min = 100000.0;
                        for(n = 0; n < this.state; n++){
                            if (this.roundTripLatencyMs[n] > max) max = this.roundTripLatencyMs[n];
                            if (this.roundTripLatencyMs[n] < min) min = this.roundTripLatencyMs[n];
                            this.sum += this.roundTripLatencyMs[n];
                        }
                        if (max / min > 2.0) {
                            this.latencyMs = 0;
                            this.state = (0, _testlatency.NUMBER_TRIALS);
                            this.measurementState = this.nextMeasurementState = measurementStates.idle;
                        } else if (this.state == (0, _testlatency.NUMBER_TRIALS)) {
                            this.latencyMs = parseInt(this.sum * 0.1);
                            this.measurementState = this.nextMeasurementState = measurementStates.idle;
                        } else {
                            this.latencyMs = parseInt(this.roundTripLatencyMs[this.state - 1]);
                            this.measurementState = this.nextMeasurementState = measurementStates.waiting;
                        }
                        this.state++;
                    } else this.measurementState = this.nextMeasurementState = measurementStates.waiting; // Happens when an early noise comes in.
                    this.rampdec = 1.0 / numberOfSamples;
                } else {
                    this.samplesElapsed += numberOfSamples;
                    // Do not listen to more than a second, let's start over. Maybe the environment's noise is too high.
                    if (this.samplesElapsed > this.samplerate) {
                        this.rampdec = 1.0 / numberOfSamples;
                        this.measurementState = this.nextMeasurementState = measurementStates.waiting;
                        this.latencyMs = -1;
                        this.samplesElapsed = 0;
                    }
                }
                break;
            case measurementStates.passthrough:
            case measurementStates.idle:
                break;
            default:
                this.samplesElapsed += numberOfSamples;
                this.sum = 0;
                if (this.samplesElapsed > this.samplerate) {
                    this.samplesElapsed = 0;
                    this.measurementState = this.nextMeasurementState = measurementStates.measure_average_loudness_for_1_sec;
                }
        }
    }
    processOutput(left, right) {
        if (this.measurementState == measurementStates.passthrough) return;
        if (this.rampdec < 0.0) {
            let n = this.buffersize * 2, i = 0;
            while(n--)left[i] = right[i++] = 0;
        } else {
            let ramp = 1.0, mul = 2.0 * Math.PI * 1000.0 / this.samplerate; // 1000 Hz
            let n = this.buffersize, i = 0;
            while(n--){
                left[i] = right[i++] = Math.sin(mul * this.sineWave) * ramp;
                ramp -= this.rampdec;
                this.sineWave += 1.0;
            }
        }
    }
}

},{"./testlatency":"fraCr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2E6by":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TestLatRingBuf", ()=>TestLatRingBuf);
var _processorJs = require("worklet:./processor.js");
var _processorJsDefault = parcelHelpers.interopDefault(_processorJs);
var _latencytesthandler = require("../latencytesthandler");
const safariVersionIndex = navigator.userAgent.indexOf("Version/");
const versionString = navigator.userAgent.substring(safariVersionIndex + 8);
const safariVersion = parseFloat(versionString);
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
class TestLatRingBuf {
    ac = null;
    worklet_node = null;
    btnstart = null;
    running = false;
    latvalue = 0;
    static async initialize(audioContext, stream) {
        TestLatRingBuf.buttonHandlers();
        try {
            TestLatRingBuf.ac = audioContext;
            await TestLatRingBuf.ac.audioWorklet.addModule((0, _processorJsDefault.default));
            const mic_source = TestLatRingBuf.ac.createMediaStreamSource(stream);
            TestLatRingBuf.worklet_node = new AudioWorkletNode(TestLatRingBuf.ac, "measure-processor", {
                outputChannelCount: [
                    1
                ]
            });
            TestLatRingBuf.worklet_node.channelCount = 1;
            // For Safari 16 and above when using echocancellation to false
            // the input is dramatically reduced
            let defaultGain = 1;
            if (isSafari && safariVersion > 16) defaultGain = 50;
            const gainNode = TestLatRingBuf.ac.createGain();
            gainNode.gain.value = defaultGain;
            mic_source.connect(gainNode);
            gainNode.connect(TestLatRingBuf.worklet_node);
            TestLatRingBuf.worklet_node.port.onmessage = function(e) {
                TestLatRingBuf.displayResults(e);
            };
        } catch (e) {
            console.log(e);
        }
    }
    static buttonHandlers() {
        TestLatRingBuf.btnstart = document.getElementById("btn-start");
        TestLatRingBuf.btnstart.onclick = TestLatRingBuf.startTest;
    }
    static displayResults(e) {
        // TODO: find a way to avoid having the worklet running in the background
        // ideally the track from stream should be stopped afer the test and created each time by requesting permission
        if (TestLatRingBuf.running && e.data.latency) {
            TestLatRingBuf.latvalue = Number(e.data.latency * 1000).toFixed(2);
            TestLatRingBuf.btnstart.innerHTML = `STOP <span class='badge badge-info'>lat: ${TestLatRingBuf.latvalue} ms.</span>`;
            (0, _latencytesthandler.displayLatencyUI)(TestLatRingBuf.latvalue);
        }
    }
    static startTest() {
        TestLatRingBuf.latvalue = 0;
        TestLatRingBuf.worklet_node.connect(TestLatRingBuf.ac.destination);
        TestLatRingBuf.btnstart.innerText = "STOP";
        TestLatRingBuf.btnstart.onclick = TestLatRingBuf.stopTest;
        TestLatRingBuf.running = true;
    }
    static async stopTest() {
        if (TestLatRingBuf.latvalue && TestLatRingBuf.latvalue !== 0) {
            localStorage.setItem("latency", TestLatRingBuf.latvalue);
            TestLatRingBuf.btnstart.innerHTML = `START <span class='badge badge-info'>lat: ${TestLatRingBuf.latvalue} ms.</span>`;
        } else TestLatRingBuf.btnstart.innerHTML = "START";
        TestLatRingBuf.worklet_node.disconnect(TestLatRingBuf.ac.destination);
        TestLatRingBuf.btnstart.onclick = TestLatRingBuf.startTest;
        TestLatRingBuf.running = false;
    }
}

},{"worklet:./processor.js":"5ZcJd","../latencytesthandler":"64S6j","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5ZcJd":[function(require,module,exports) {
module.exports = require("c04d20950ff3f642").getBundleURL("1Z45C") + "processor.fa2a93bc.js" + "?" + Date.now();

},{"c04d20950ff3f642":"lgJ39"}],"bUrti":[function(require,module,exports) {
/* https://github.com/julienetie/detect-browser/blob/main/detect-browser.js */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const navigatorErrorMessage = "Could not find `userAgent` or `userAgentData` window.navigator properties to set `os`, `browser` and `version`";
const removeExcessMozillaAndVersion = /^mozilla\/\d\.\d\W/;
const browserPattern = /(\w+)\/(\d+\.\d+(?:\.\d+)?(?:\.\d+)?)/g;
const engineAndVersionPattern = /^(ver|cri|gec)/;
const brandList = [
    "chrome",
    "opera",
    "safari",
    "edge",
    "firefox"
];
const unknown = "Unknown";
const empty = "";
const { isArray } = Array;
let userAgentData = window.navigator.userAgentData;
let userAgent = window.navigator.userAgent;
const mobiles = {
    iphone: /iphone/,
    ipad: /ipad|macintosh/,
    android: /android/
};
const desktops = {
    windows: /win/,
    mac: /macintosh/,
    linux: /linux/
};
const detectPlatform = (customUserAgent, customUserAgentData)=>{
    // Use a provided UA string instead of the browser's UA  
    userAgent = typeof customUserAgent === "string" ? customUserAgent : userAgent;
    // Use a provided UA data string instead of the browser's UA data 
    userAgentData = typeof customUserAgentData === "string" ? customUserAgentData : userAgentData;
    if (userAgent) {
        const ua = userAgent.toLowerCase().replace(removeExcessMozillaAndVersion, empty);
        // Determine the operating system.
        const mobileOS = Object.keys(mobiles).find((os)=>mobiles[os].test(ua) && window.navigator.maxTouchPoints >= 1);
        const desktopOS = Object.keys(desktops).find((os)=>desktops[os].test(ua));
        const os = mobileOS || desktopOS;
        // Extract browser and version information.
        const browserTest = ua.match(browserPattern);
        const versionRegex = /version\/(\d+(\.\d+)*)/;
        const safariVersion = ua.match(versionRegex);
        const saVesion = isArray(safariVersion) ? safariVersion[1] : null;
        const browserOffset = browserTest && (browserTest.length > 2 && !engineAndVersionPattern.test(browserTest[1]) ? 1 : 0);
        const browserResult = browserTest && browserTest[browserTest.length - 1 - (browserOffset || 0)].split("/");
        let browser = browserResult && browserResult[0];
        let version = saVesion ? saVesion : browserResult && browserResult[1];
        // Check specifically for Edge
        if (ua.includes("edg/")) {
            const edgeMatch = ua.match(/edg\/(\d+\.\d+)/);
            browser = "edge";
            version = edgeMatch && edgeMatch[1];
        }
        return {
            os,
            browser,
            version
        };
    } else if (userAgentData) {
        const os = userAgentData.platform.toLowerCase();
        let platformData;
        // Extract platform brand and version information.
        for (const agentBrand of userAgentData.brands){
            const agentBrandEntry = agentBrand.brand.toLowerCase();
            const foundBrand = brandList.find((brand)=>{
                if (agentBrandEntry.includes(brand)) return brand;
            });
            if (foundBrand) {
                platformData = {
                    browser: foundBrand,
                    version: agentBrand.version
                };
                break;
            }
        }
        const brandVersionData = platformData || {
            browser: unknown,
            version: unknown
        };
        return {
            os,
            ...brandVersionData
        };
    } else {
        // Log error message if there's a problem.
        console.error(navigatorErrorMessage);
        return {
            // Ignore the VSCode strikethough. Disable linting line if necessary. This is just a fallback
            os: navigator.platform || unknown,
            browser: unknown,
            version: unknown
        };
    }
};
exports.default = detectPlatform;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"616En":[function(require,module,exports) {
module.exports = require("8389ef34b597c0d6").getBundleURL("1Z45C") + "imgtestlatdemo.820cfaef.webp" + "?" + Date.now();

},{"8389ef34b597c0d6":"lgJ39"}]},["gmUot","9ZuIT"], "9ZuIT", "parcelRequire1e7e")

//# sourceMappingURL=composition.58e8ce2d.js.map
