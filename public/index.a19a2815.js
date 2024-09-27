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
})({"ajXzA":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = true;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "bb9c8722a19a2815";
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

},{}],"jbnFx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _config = require("../../../common/js/config");
var _modaldialog = require("../../../common/js/modaldialog");
var _modaldialogDefault = parcelHelpers.interopDefault(_modaldialog);
var _home = require("./home");
var _collectionshandlerJs = require("../../../common/js/collectionshandler.js");
var _editcollections = require("./editcollections");
const createNewButton = document.getElementById("createNewButton");
const createNewButtonAtHome = document.getElementById("createNewButtonAtHome");
const clickNewButtonHandler = ()=>{
    if (!(0, _home.IS_AUTH)) window.location.href = "/login.html";
    else {
        document.getElementById("newtitle").value = "";
        document.getElementById("newdescription").value = "";
        const saveCompositionButton = document.getElementById("newcreation");
        saveEventListener(saveCompositionButton);
        (0, _collectionshandlerJs.getCollections)().then((result)=>{
            if (result) getCompCollSuccess(result);
            else (0, _collectionshandlerJs.getCollectionsError)();
        });
    }
};
createNewButton?.addEventListener("click", clickNewButtonHandler, false);
createNewButtonAtHome?.addEventListener("click", clickNewButtonHandler, false);
const getCompCollSuccess = (list)=>{
    document.getElementById("listCollContainer").replaceChildren();
    (0, _collectionshandlerJs.createListCollections)(list, "listCollContainer");
};
const saveEventListener = (saveCompositionButton)=>{
    saveCompositionButton?.addEventListener("click", saveEventListenerHandler);
};
const saveEventListenerHandler = (e)=>{
    const newCreation = document.getElementById("typeOfNewCreation").value;
    let apiMethod = "/newcomposition";
    if (newCreation === "coll") apiMethod = "/newcollection";
    let newtitle = document.getElementById("newtitle").value;
    const privacyLevel = document.querySelector('input[name="newMusicPrivacyRadios"]:checked').value;
    if (!newtitle) {
        alert("Introduce a valid title, please");
        return;
    }
    const newdescription = document.getElementById("newdescription").value;
    const collectInput = document.getElementById("inputGroupSelectCollect");
    let parentCollection = collectInput?.value || null;
    if (parentCollection === "0") parentCollection = null;
    let body = JSON.stringify({
        title: newtitle,
        privacy_level: privacyLevel,
        parent_uuid: parentCollection,
        description: newdescription
    });
    let errorIs = null;
    fetch((0, _config.ENDPOINT) + apiMethod, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: body
    }).then((r)=>{
        if (!r.ok) errorIs = r.statusText;
        return r.json();
    }).then((data)=>{
        if (data) verifyResponse(data);
        else throw new Error(data);
    }).catch((error)=>{
        errorIs = error;
    });
};
const verifyResponse = (response)=>{
    $("#newMusicModal").modal("hide");
    if (response.composition) window.location.href = (0, _home.uriCompositionPage) + response.composition.uuid;
    else if (response.ok) (0, _modaldialogDefault.default).dynamicModalDialog(`Collection created successfully!`, null, "", "Close", "New Collection", "bg-success");
    else (0, _modaldialogDefault.default).dynamicModalDialog(`An error happened, item not created`, null, "", "Close", "Error at Creation", "bg-danger");
};

},{"../../../common/js/config":"ecGaw","../../../common/js/modaldialog":"geXkr","./home":"3GRBG","../../../common/js/collectionshandler.js":"4pBT6","./editcollections":"loosY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ecGaw":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3GRBG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "uriCompositionPage", ()=>uriCompositionPage);
parcelHelpers.export(exports, "IS_AUTH", ()=>IS_AUTH);
parcelHelpers.export(exports, "getMyCompositions", ()=>getMyCompositions);
parcelHelpers.export(exports, "getRecentCompositions", ()=>getRecentCompositions);
parcelHelpers.export(exports, "getAllCompositions", ()=>getAllCompositions);
var _utils = require("../../../common/js/utils");
var _breadcrumbhandler = require("./breadcrumbhandler");
var _acceptterms = require("../../../common/js/acceptterms");
var _homeUi = require("./home_ui");
var _homeHelper = require("./home_helper");
const uriCompositionPage = "/composition.html?compositionId=";
let IS_AUTH = false;
const homePageTermsAccepted = (termsAccepted)=>{
    if (!termsAccepted) (0, _acceptterms.generateAcceptTermsModal)("header");
};
const getMyProfile = async ()=>{
    const isAuthenticated = await (0, _utils.callJsonApi)("/profile", "GET");
    if (isAuthenticated.ok) {
        (0, _homeHelper.setCurrentUserName)(isAuthenticated.name);
        document.getElementById("userlogin").style.display = "none";
        document.getElementById("useroptions").style.display = "";
        document.getElementById("display_profile_name").innerText = `[${isAuthenticated.name}]`;
        (0, _acceptterms.checkIfTermsAccepted)(isAuthenticated, homePageTermsAccepted);
    }
    return isAuthenticated;
};
const getMyCompositions = async ()=>{
    const endpoint = "/mycompositions";
    const data = await (0, _utils.callJsonApi)(endpoint, "GET");
    if (data.compositions) return renderHomePage(data.compositions, endpoint);
    else alert("invalid return value for compisitions list");
};
const getCompositionsByUserUid = async (useruid, auth)=>{
    const endpoint = "/compositionsbyuserid/" + useruid;
    const data = await (0, _utils.callJsonApi)(endpoint, "GET");
    if (data.compositions) {
        (0, _homeHelper.setCurrentUserName)(data.username);
        (0, _homeUi.updateUIWithUserInfo)(data.username, useruid);
        return renderHomePage(data.compositions, endpoint);
    } else {
        alert("invalid return value for user id");
        if (auth.ok) (0, _breadcrumbhandler.navigate)("my-comp");
        else (0, _breadcrumbhandler.navigate)("recent-comp");
    }
};
const getCompositionsByColelctionUid = async (collectionuid, auth)=>{
    const endpoint = "/collectionastreebyid/" + collectionuid;
    const data = await (0, _utils.callJsonApi)(endpoint, "GET");
    if (data.compositions) {
        (0, _homeHelper.setCurrentUserName)(data.username);
        (0, _homeUi.updateUIWithCollectionInfo)(data.collection_name, data.username, data.owneruid);
        return renderHomePage(data.compositions, endpoint);
    } else {
        alert("invalid return value for collection id");
        if (auth.ok) (0, _breadcrumbhandler.navigate)("my-comp");
        else (0, _breadcrumbhandler.navigate)("recent-comp");
    }
};
const getRecentCompositions = async (withScroll)=>{
    const endpoint = "/recentcompositions";
    const data = await (0, _utils.callJsonApi)("/recentcompositions", "GET");
    if (data.compositions) return renderHomePage(data.compositions, endpoint, withScroll);
    else alert("invalid return value for compisitions list");
};
const getAllCompositions = async (withScroll)=>{
    const endpoint = "/compositions";
    const data = await (0, _utils.callJsonApi)("/compositions", "GET");
    if (data.compositions) return renderHomePage(data.compositions, endpoint, withScroll);
    else alert("invalid return value for compisitions list");
};
const renderHomePage = (compositionsList, endpoint, withScroll)=>{
    document.getElementById("loadertext").textContent = "";
    document.getElementById("grid").innerHTML = "";
    document.getElementById("legendbuttons").innerHTML = "";
    const notUserPublicPage = !endpoint.includes("/compositionsbyuserid/") && !endpoint.includes("/collectionastreebyid/");
    if (notUserPublicPage) (0, _homeUi.cleanWelcomeContainer)(false, withScroll);
    if (!compositionsList.length && notUserPublicPage) {
        document.getElementById("initialmessage").hidden = false;
        document.getElementById("initialmessage").classList.add("d-flex");
    } else renderHomePageWithLists(compositionsList, endpoint);
};
const renderHomePageWithLists = (compositionsList, endpoint)=>{
    if (endpoint.includes("/collectionastreebyid/")) {
        const parent_coll_id = endpoint.replace("/collectionastreebyid/", "");
        const groupedCompsAndSubColl = (0, _homeHelper.getGroupedCompositionsWithSubCollect)(compositionsList, parent_coll_id);
        paintListOfCompositions(groupedCompsAndSubColl, null, endpoint, compositionsList.length);
    } else if (!(0, _homeHelper.isuserpage)(endpoint)) {
        const groupedComps = (0, _homeHelper.getGroupedCompositionsWithUsers)(compositionsList);
        paintListOfCompositions(groupedComps, "groupedbyuser_final", endpoint, compositionsList.length);
    } else {
        const groupedCompsWithCollab = (0, _homeHelper.getGroupedCompositionsWithCollab)(compositionsList);
        paintListOfCompositions(groupedCompsWithCollab, "groupedbycollab", endpoint, compositionsList.length);
    }
};
const paintGroupCollection = (listcomps, typebadge, endpoint)=>{
    let allCompUIelem = "";
    for(const comp in listcomps){
        const element = listcomps[comp];
        let listgroup = "";
        let groupTitle = "";
        let groupId = null;
        if (typebadge === "collab") groupTitle = "Collaborations";
        else if (typebadge === "coll") {
            groupTitle = Object.values(element)[0].parent_collection;
            groupId = Object.values(element)[0].collection_uid;
        } else {
            groupTitle = Object.values(element)[0].username;
            groupId = Object.values(element)[0].owner_uuid;
        }
        for (const item of element)listgroup += (0, _homeUi.getUIListElemInsideCollection)(item, typebadge, endpoint);
        allCompUIelem += (0, _homeUi.getUICardElemForCollection)(typebadge, element.length, groupTitle, groupId, listgroup);
    }
    return allCompUIelem;
};
const getSingleComps = (groupedComps, endpoint)=>{
    let listElelemts = "";
    const listCompsSingle = groupedComps.singlecomps;
    listCompsSingle?.forEach((element)=>{
        const template = (0, _homeUi.paintSingleComposition)(element, endpoint);
        listElelemts += template;
    });
    return listElelemts;
};
const paintListOfCompositions = (groupedComps, customgroup, endpoint, totalcomps)=>{
    let listElelemts = "";
    const numberGroupsByCollections = Object.keys(groupedComps.groupedbycoll).length;
    const numberCustomGroups = customgroup ? Object.keys(groupedComps[customgroup]).length : 0;
    let numberSinglComp = groupedComps.singlecomps.length;
    if (numberGroupsByCollections > 0) {
        const listComps = groupedComps.groupedbycoll;
        const template = paintGroupCollection(listComps, "coll", endpoint);
        listElelemts += template;
    }
    if (numberCustomGroups > 0) {
        const listComps = groupedComps[customgroup];
        const typeofbadge = customgroup === "groupedbycollab" ? "collab" : "user";
        const template = paintGroupCollection(listComps, typeofbadge, endpoint);
        listElelemts += template;
    }
    if (numberSinglComp > 0) listElelemts += getSingleComps(groupedComps, endpoint);
    const legendButtons = (0, _homeUi.getLegendButtons)(numberGroupsByCollections, numberCustomGroups, numberSinglComp, endpoint, totalcomps);
    (0, _homeUi.paintMainElemsHomePage)(listElelemts, legendButtons);
};
const initHomPage = async ()=>{
    const queryString = window.location.search;
    const user_id = queryString.split("userid=")[1];
    const collection_uid = queryString.split("collectionid=")[1];
    let isAuth = await getMyProfile();
    IS_AUTH = isAuth.ok;
    if (user_id) await getCompositionsByUserUid(user_id, isAuth);
    else if (collection_uid) await getCompositionsByColelctionUid(collection_uid, isAuth);
    else if (isAuth.ok) await getMyCompositions();
    else await getRecentCompositions();
    (0, _breadcrumbhandler.breadcrumbHandler)(isAuth, user_id || collection_uid);
};
(0, _homeUi.initNavigationMenu)();
(0, _utils.activateGoHomeLink)();
initHomPage();

},{"../../../common/js/utils":"g7t25","./breadcrumbhandler":"g6gRQ","../../../common/js/acceptterms":"8SvwY","./home_ui":"kVbfN","./home_helper":"4bGMC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g7t25":[function(require,module,exports) {
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

},{"./config":"ecGaw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g6gRQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "breadcrumbHandler", ()=>breadcrumbHandler);
parcelHelpers.export(exports, "navigate", ()=>navigate);
var _home = require("./home");
const breadcrumbHandler = (isauth, isuserorcollection)=>{
    createBreadCrumbNavBar(isauth, isuserorcollection);
    document.querySelectorAll(".breadcrumb-item a").forEach(function(element) {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(".active-breadcrumb")?.classList.remove("active-breadcrumb");
            event.currentTarget.classList.add("active-breadcrumb");
            let section = event.currentTarget.getAttribute("data-section");
            navigate(section, isauth);
        });
    });
};
const createBreadCrumbNavBar = (isauth, isuserorcollection)=>{
    const navBar = document.getElementById("breadcrumbnavbar");
    let userOptions = "";
    if (isauth.ok) userOptions = `<li class='breadcrumb-item ${isuserorcollection ? "" : "active-breadcrumb"}' aria-current='page'><a href='#' data-section='my-comp'>My Music</a></li>
        <li class='breadcrumb-item'><a href='#' data-section='all-comp'>All</a></li>`;
    else userOptions = `<li class='breadcrumb-item ${isuserorcollection ? "" : "active-breadcrumb"}' aria-current='page'><a href='#' data-section='recent-comp'>Recent</a></li>
        <li class='breadcrumb-item'><a href='#' data-section='all-comp'>All</a></li>`;
    navBar.innerHTML = userOptions;
};
function navigate(section, isauth) {
    const url = new URL(window.location.href);
    url.searchParams.delete("userid");
    url.searchParams.delete("collectionid");
    history.replaceState(null, null, url);
    let withScroll = false;
    switch(section){
        case "recent-comp":
            withScroll = true;
            (0, _home.getRecentCompositions)(withScroll);
            break;
        case "my-comp":
            (0, _home.getMyCompositions)();
            break;
        case "all-comp":
            document.getElementById("initialmessage").classList.remove("d-flex");
            document.getElementById("initialmessage").hidden = true;
            if (!isauth.ok) withScroll = true;
            (0, _home.getAllCompositions)(withScroll);
            break;
        default:
            console.log("section default");
    }
}

},{"./home":"3GRBG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8SvwY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "checkIfTermsAccepted", ()=>checkIfTermsAccepted);
parcelHelpers.export(exports, "handleTermsNotAccepted", ()=>handleTermsNotAccepted);
parcelHelpers.export(exports, "generateAcceptTermsModal", ()=>generateAcceptTermsModal);
var _utils = require("./utils");
const checkIfTermsAccepted = (userprofile, callback)=>{
    (0, _utils.cancelLoader)((0, _utils.LOADER_ELEM_ID));
    callback(userprofile?.terms_accepted);
};
const handleTermsNotAccepted = ()=>{
    $("#acceptTermsModal").modal({
        backdrop: "static",
        keyboard: false // to prevent closing with Esc button (if you want this too)
    });
    $("#acceptTermsModal").modal("show");
    document.getElementById("buttonAcceptTerms").onclick = rqstAcceptTerms;
    document.getElementById("buttonRejectTerms").onclick = rqstRejectTerms;
};
const rqstAcceptTerms = async ()=>{
    const data = await (0, _utils.callJsonApi)("/acceptterms", "PUT");
    if (data.ok) $("#acceptTermsModal").modal("hide");
};
const rqstRejectTerms = async ()=>{
    const data = await (0, _utils.callJsonApi)("/rejectterms", "PUT");
    if (data.ok) {
        $("#acceptTermsModal").modal("hide");
        window.location.href = window.location.origin;
    }
};
const generateAcceptTermsModal = (attachToElem)=>{
    const isModal = document.getElementById("acceptTermsModal");
    if (!isModal) {
        const modalDialog = `<div class="modal fade" id="acceptTermsModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Accept Terms</h5>                
                </div>
                <div class="modal-body">
                <p>By clicking on OK you accept the Terms of Use.</p>
                <p>More information at: <span> <a href="${window.location.origin}/static/terms.html" target="_blank">${window.location.origin}/static/terms.html</a></span></p>
                </div>
                <div class="modal-footer">
                <button id="buttonRejectTerms" type="button" class="btn btn-secondary" data-dismiss="modal">Reject</button>
                <button id="buttonAcceptTerms" type="button" class="btn btn-primary">OK</button>
                </div>
            </div>
            </div>
        </div>`;
        document.getElementsByTagName(attachToElem)[0].insertAdjacentHTML("afterend", modalDialog);
    }
    handleTermsNotAccepted();
};

},{"./utils":"g7t25","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kVbfN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initNavigationMenu", ()=>initNavigationMenu);
parcelHelpers.export(exports, "getLegendButtons", ()=>getLegendButtons);
parcelHelpers.export(exports, "paintMainElemsHomePage", ()=>paintMainElemsHomePage);
parcelHelpers.export(exports, "paintSingleComposition", ()=>paintSingleComposition);
parcelHelpers.export(exports, "getUIListElemInsideCollection", ()=>getUIListElemInsideCollection);
parcelHelpers.export(exports, "getUICardElemForCollection", ()=>getUICardElemForCollection);
parcelHelpers.export(exports, "cleanWelcomeContainer", ()=>cleanWelcomeContainer);
parcelHelpers.export(exports, "updateUIWithCollectionInfo", ()=>updateUIWithCollectionInfo);
parcelHelpers.export(exports, "updateUIWithUserInfo", ()=>updateUIWithUserInfo);
var _home = require("./home");
var _homeHelper = require("./home_helper");
var _utils = require("../../../common/js/utils");
const homeVideoUrl = new URL(require("a869e6e904cf04f9"));
const CARD_BADGE_STYLE = {
    "coll": "badge-collection",
    "user": "badge-warning",
    "collab": "badge-collab"
};
const CARD_BORDER_STYLE = {
    "coll": "border-collection",
    "user": "border-warning",
    "collab": "border-collab"
};
const URI_PAGE = {
    "coll": (0, _utils.uriCollectionPage),
    "user": (0, _utils.uriUserPage)
};
//const WELCOME_TEXT = 'We present Hi-Audio Online Platform a web application for musicians, researchers and an open community of enthusiasts of audio and music with a view to build a public database of music recordings from a wide variety of styles and different cultures.'
const WELCOME_VIDEO = `<div id="landing-video-container" class="fullscreen-video-container">
    <video playsinline autoplay loop muted>
      <source src="${homeVideoUrl}">
    </video>  
  <div class='fullscreen-video-content'>
    <div class="typewriter">
      <h1>Welcome!</h1>      
    </div>
    <div class="h-100 d-flex">
      <div class="m-auto">
        <a id="start-link" class="btn btn-link" href="/login.html" role="button"><b>LET'S JAM?</b></a>
      </div>
    </div>    
  </div>
</div>`;
const initNavigationMenu = ()=>{
    document.getElementById("userlogin").innerHTML = `<li class='nav-item'>
        <a class='dropdown-item' href='${window.location.origin}/login.html'>Register / Login</a>
    </li>
    <li class='nav-item'>
        <a class='dropdown-item' href='${0, _home.uriCompositionPage}demopage'>Test DAW</a>
    </li>
    <li class='nav-item'>
        <a class='dropdown-item' href='${window.location.origin}/static/howto.html'>How-To</a>
    </li>
    `;
    document.getElementById("useroptions").innerHTML = `<li class='nav-item'>
      <a class='nav-link' href='${window.location.origin + "/profile.html"}'>Profile <i id='display_profile_name'></i></a>
    </li>
    <li class='nav-item'>
          <a class='nav-link' href='#' id='createNewButton' data-toggle='modal' data-target='#newMusicModal'>/ Create new</a>
    </li>
    <li class='nav-item'>
        <a class='nav-link' href='#' id='openMyCollectionsButton' data-toggle='modal' data-target='#editCollectionsModal'>/ My Collections</a>
    </li>
    <li class='nav-item'>
        <a class='nav-link' href='${window.location.origin + "/static/howto.html"}'>/ How-to</a>
    </li>
    `;
};
const getLegendButtons = (numberGroupsByCollections, numberGroupsCustom, numberSinglComp, endpoint, totalcomps)=>{
    const displayGroupsByLabel = numberGroupsByCollections || !(0, _homeHelper.isuserpage)(endpoint) && numberGroupsCustom || numberSinglComp;
    return `<ul class="nav justify-content-end">
              ${displayGroupsByLabel ? '<li class="legenditem nav-item"><h4><span class="badge badge-light">Groups by:&nbsp;</span></h4></li>' : ""}
              ${numberGroupsByCollections ? '<li class="legenditem nav-item"><h4><span class="badge badge-collection">Collections&nbsp;<span class="badge badge-light">' + numberGroupsByCollections + "</span></span></h4></li>" : ""}            
              ${!(0, _homeHelper.isuserpage)(endpoint) && numberGroupsCustom ? '<li class="legenditem nav-item"><h4><span class="badge badge-warning">Users&nbsp;<span class="badge badge-light">' + numberGroupsCustom + "</span></span></h4></li>" : ""}
              ${numberSinglComp ? '<li class="legenditem nav-item"><h4><span class="badge badge-success">Singles&nbsp;<span class="badge badge-light">' + numberSinglComp + "</span></span></h4></li>" : ""}
              <li class="legenditem nav-item"><h4><span class="badge badge-light">Total compositions:&nbsp;</span><span class="badge badge-light">${totalcomps}</span></h4></li>
            </ul>`;
};
const paintMainElemsHomePage = (listElelemts, legendButtons)=>{
    document.getElementById("grid").innerHTML = "";
    document.getElementById("grid").insertAdjacentHTML("afterbegin", listElelemts);
    document.getElementById("legendbuttons").innerHTML = "";
    document.getElementById("legendbuttons").insertAdjacentHTML("afterbegin", legendButtons);
    document.getElementById("searchInput").removeAttribute("disabled");
};
const paintSingleComposition = (element, endpoint)=>{
    const displayName = (0, _homeHelper.displayUserNameInCard)(endpoint, element.username);
    const displayNumCollabs = element.contributors.length;
    return `<div class='card border-success'>                       
              <div class="card-body">
              ${(0, _home.IS_AUTH) ? `<span class="badge ${(0, _utils.PRIVACY_BADGE_STYLE)[element.privacy]}">${(0, _utils.PRIVACY_BADGE_TEXT)[element.privacy]}</span>` : ""}
              ${element.opentocontrib ? '<p class="badge badge-info">OPEN TO CONTRIB</p>' : ""}               
                  <div>
                    <p class="list-group-item-heading">  
                      <a href='${(0, _home.uriCompositionPage) + element.uuid}' class='card-url'>
                        <h5 class='card-title'>${element.title}</h5>
                      </a>
                    </p>
                    <p class='card-text text-truncate'>${element.description || ""}</p>
                    <p class='text-black-50'>${displayNumCollabs ? "Collaborators: " + displayNumCollabs : ""}</p>
                    ${displayName ? `<span class="d-inline-block text-truncate" style="max-width: 250px;">
                    <i class='fa fa-user'></i>&nbsp;
                    <a href='${(0, _utils.uriUserPage) + element.owner_uuid}' class='card-url'>
                      ${element.username}&nbsp;
                    </a>
                  </span>` : ""}
                    <span class="d-inline-block text-truncate" style="max-width: 250px;">
                      <i class='fa fa-music'></i>&nbsp;${"Tracks: " + element.tracks?.length}
                    </span>                  
                  </div>                
              </div>            
          </div>`;
};
const getUIListElemInsideCollection = (item, typebadge, endpoint)=>{
    const displayName = (0, _homeHelper.displayUserNameInCard)(endpoint, item.username);
    const displayNumCollabs = item.contributors.length;
    return `<div class="list-group-item ">
              ${(0, _home.IS_AUTH) ? `<span class="badge ${(0, _utils.PRIVACY_BADGE_STYLE)[item.privacy]}">${(0, _utils.PRIVACY_BADGE_TEXT)[item.privacy]}</span>` : ""}
              ${item.opentocontrib ? '<span class="badge badge-info">OPEN TO CONTRIB</span>' : ""}  
              <p class="list-group-item-heading">
                <a href='${(0, _home.uriCompositionPage) + item.uuid}' class='card-url'>
                    <h5 class='card-title'>${item.title}</h5>
                </a>
              </p>
              <p class='text-black-50'>${displayNumCollabs ? "Collaborators: " + displayNumCollabs : ""}</p>
              <p class="list-group-item-text text-truncate">
                ${item.description || ""}
              </p>
              ${typebadge !== "user" && displayName ? '<span class="d-inline-block text-truncate" style="max-width: 220px;"><i class="fa fa-user"></i>&nbsp;<a href=' + (0, _utils.uriUserPage) + item.owner_uuid + ' class="card-url">' + item.username + "&nbsp;" + "</a>" + "</span>" : ""}            
              <span class="d-inline-block text-truncate" style="max-width: 200px;">
                <i class='fa fa-music'></i>&nbsp;${"Tracks: " + item.tracks?.length}
              </span>
            </div>`;
};
const getUICardElemForCollection = (typebadge, numitems, groupTitle, groupId, listgroup)=>{
    const badegstyle = CARD_BADGE_STYLE[typebadge];
    const borderstyle = CARD_BORDER_STYLE[typebadge];
    const url = URI_PAGE[typebadge];
    const badgeDisplayed = `<span class="badge ${badegstyle} d-inline-block text-truncate" style="max-width:85%;">
                              <span class="badge badge-light">${numitems}</span>&nbsp;
                              ${url ? `<a href=${url + groupId} class="card-header-url">${groupTitle}</a>` : `${groupTitle}`}                              
                          </span>`;
    return `<div class='card ${borderstyle}'>                        
              <h4>${badgeDisplayed}</h4>        
              <div class="card-body">
                <div class="list-group border">              
                  ${listgroup}
                </div>
              </div>
            </div>`;
};
const cleanWelcomeContainer = (hidetext, withScroll)=>{
    const welcomecontainer = document.getElementById("welcomecontainer");
    const videoContainer = document.getElementById("landing-video-container");
    if (welcomecontainer.lastChild?.id && welcomecontainer.lastChild?.id !== "welcometext") welcomecontainer.removeChild(welcomecontainer.lastChild);
    if (!hidetext && !welcomecontainer.lastChild && !videoContainer) {
        const welcometextelem = document.createElement("div");
        welcometextelem.id = "welcometext";
        welcometextelem.innerHTML = (0, _home.IS_AUTH) ? "" : `${WELCOME_VIDEO}`;
        document.getElementById("welcomecontainer").appendChild(welcometextelem);
    }
    if (withScroll) document.getElementById("grid").scrollIntoView({
        behavior: "smooth"
    });
};
const updateUIWithCollectionInfo = (collectiontitle, username, owner_uuid)=>{
    cleanWelcomeContainer(true);
    const collectionInfoContainer = document.createElement("div");
    collectionInfoContainer.id = "infocontainer";
    collectionInfoContainer.innerHTML = `<div class="card border-collection mb-3">
                                          <div class="card-header bg-transparent border-collection"><b>Collection</b></div>
                                          <div class="card-body text-dark">
                                            <h5 class="card-title">${collectiontitle}</h5>
                                            <p class="card-text" style="width:300px;">Owner: <a href=${(0, _utils.uriUserPage) + owner_uuid} class="card-url">${username}</a></p>
                                          </div>
                                        </div>`;
    document.getElementById("welcomecontainer").appendChild(collectionInfoContainer);
};
const updateUIWithUserInfo = (username, useruid)=>{
    cleanWelcomeContainer(true);
    const userInfoContainer = document.createElement("div");
    userInfoContainer.id = "infocontainer";
    userInfoContainer.innerHTML = `<div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                      <div class="col-md-4">
                                        <img class="img-fluid" src="https://picsum.photos/seed/${useruid}/200" alt="User Picture">
                                      </div>
                                      <div class="col-md-8">
                                        <div class="card-body">
                                          <h5 class="card-title">User</h5>
                                          <p class="card-text" style="width:300px;">${username ? `${username}` : ""}</p>                                        
                                          <p class="card-text"><small class="text-muted"></small></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`;
    document.getElementById("welcomecontainer").appendChild(userInfoContainer);
};

},{"./home":"3GRBG","./home_helper":"4bGMC","../../../common/js/utils":"g7t25","a869e6e904cf04f9":"29eQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4bGMC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isuserpage", ()=>isuserpage);
parcelHelpers.export(exports, "setCurrentUserName", ()=>setCurrentUserName);
parcelHelpers.export(exports, "displayUserNameInCard", ()=>displayUserNameInCard);
parcelHelpers.export(exports, "getGroupedCompositionsWithUsers", ()=>getGroupedCompositionsWithUsers);
parcelHelpers.export(exports, "getGroupedCompositionsWithCollab", ()=>getGroupedCompositionsWithCollab);
parcelHelpers.export(exports, "getGroupedCompositionsWithSubCollect", ()=>getGroupedCompositionsWithSubCollect);
let _USERNAME = null;
const isuserpage = (endpoint)=>{
    let result = false;
    if (endpoint === "/mycompositions" || endpoint.includes("/compositionsbyuserid/") || endpoint.includes("/collectionastreebyid/")) result = true;
    return result;
};
const getCurrentUserName = ()=>{
    return _USERNAME;
};
const setCurrentUserName = (username)=>{
    _USERNAME = username;
};
const displayUserNameInCard = (endpoint, username)=>{
    let displayName = false;
    if (!isuserpage(endpoint)) displayName = true;
    else displayName = username !== getCurrentUserName();
    return displayName;
};
const getGroupsByCollAndUser = (compositionsList)=>{
    const groupedbycoll = {};
    const groupedbyuser_aux = {};
    compositionsList.forEach((composition)=>{
        const collectionId = composition.collection_uid;
        const userId = composition.user_id;
        if (collectionId !== null) {
            if (!groupedbycoll[collectionId]) groupedbycoll[collectionId] = [];
            groupedbycoll[collectionId].push(composition);
        } else {
            if (!groupedbyuser_aux[userId]) groupedbyuser_aux[userId] = [];
            groupedbyuser_aux[userId].push(composition);
        }
    });
    return {
        groupedbycoll,
        groupedbyuser_aux
    };
};
const getGroupsByCollectionAndSubColl = (compositionsList, parent_coll_id)=>{
    const groupedbycoll = {};
    const singlecomps = [];
    compositionsList.forEach((composition)=>{
        const collectionId = composition.collection_uid;
        if (collectionId !== null && collectionId !== parent_coll_id) {
            if (!groupedbycoll[collectionId]) groupedbycoll[collectionId] = [];
            groupedbycoll[collectionId].push(composition);
        } else singlecomps.push(composition);
    });
    return {
        groupedbycoll,
        singlecomps
    };
};
const getGroupsByCollAndCollab = (compositionsList)=>{
    const groupedbycoll = {};
    const groupedbycollab = {};
    const singlecomps = [];
    compositionsList.forEach((composition)=>{
        const collectionId = composition.collection_uid;
        if (collectionId !== null) {
            if (!groupedbycoll[collectionId]) groupedbycoll[collectionId] = [];
            groupedbycoll[collectionId].push(composition);
        } else if (composition.contributors.length) {
            if (!groupedbycollab["collabs"]) groupedbycollab["collabs"] = [];
            groupedbycollab["collabs"].push(composition);
        } else singlecomps.push(composition);
    });
    return {
        groupedbycoll,
        groupedbycollab,
        singlecomps
    };
};
// INFO: a group for a User is made if he has 2 or more compositions without Collection
const getFinalGroupByUserAndSingleComp = (groupedbyuser_aux)=>{
    const groupedbyuser_final = {};
    const singlecomps = [];
    for(const elem in groupedbyuser_aux)if (groupedbyuser_aux[elem].length === 1) singlecomps.push(groupedbyuser_aux[elem][0]);
    else {
        if (!groupedbyuser_final[elem]) groupedbyuser_final[elem] = [];
        groupedbyuser_final[elem] = groupedbyuser_aux[elem];
    }
    return {
        singlecomps,
        groupedbyuser_final
    };
};
const getGroupedCompositionsWithUsers = (compositionsList)=>{
    const { groupedbycoll, groupedbyuser_aux } = getGroupsByCollAndUser(compositionsList);
    const { singlecomps, groupedbyuser_final } = getFinalGroupByUserAndSingleComp(groupedbyuser_aux);
    return {
        groupedbycoll,
        groupedbyuser_final,
        singlecomps
    };
};
const getGroupedCompositionsWithCollab = (compositionsList)=>{
    const { groupedbycoll, groupedbycollab, singlecomps } = getGroupsByCollAndCollab(compositionsList);
    return {
        groupedbycoll,
        groupedbycollab,
        singlecomps
    };
};
const getGroupedCompositionsWithSubCollect = (compositionsList, parent_coll_id)=>{
    const { groupedbycoll, singlecomps } = getGroupsByCollectionAndSubColl(compositionsList, parent_coll_id);
    return {
        groupedbycoll,
        singlecomps
    };
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"29eQt":[function(require,module,exports) {
module.exports = require("97990de1d8caa2e2").getBundleURL("g6Env") + "homepage_video_compress.23c43845.mp4" + "?" + Date.now();

},{"97990de1d8caa2e2":"lgJ39"}],"lgJ39":[function(require,module,exports) {
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

},{}],"4pBT6":[function(require,module,exports) {
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

},{"./config":"ecGaw","./modaldialog":"geXkr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"loosY":[function(require,module,exports) {
var _config = require("../../../common/js/config");
var _home = require("./home");
let EDIT_STATUS = false;
const showAllCollButton = document.getElementById("openMyCollectionsButton");
const editButton = document.getElementById("editmycollectionsbutton");
const fetchCollectionsTree = async ()=>{
    const response = await fetch("/mycollectionsastree");
    const data = await response.json();
    return data;
};
const createTreeHTML = (item)=>{
    let html = `
        <span id='removeCollIcon${item.uuid}' data-uuid='${item.uuid}' data-title='${item.title}' role='button' class='badge badge-pill badge-danger' hidden>-</span>
        <li id='${item.uuid}' class='list-group-item border-bottom-0 border-right-0 border-top-0 border-warning'>
            <input type='text' class='form-control border-secondary' id='treecolltitleinput${item.uuid}' data-uuid='${item.uuid}' placeholder='Type a new title'
            title='collectiontitle' value='${item.title}' disabled>
        </li>`;
    if (item.compositions.length > 0 || item.collections.length > 0) {
        html += "<ul>";
        for (const composition of item.compositions)html += `<li class='list-group-item border-0'><a href='${(0, _home.uriCompositionPage) + composition.uuid}'><u>${composition.title}</u></a></li>`;
        for (const collection of item.collections)html += createTreeHTML(collection);
        html += "</ul>";
    }
    return html;
};
const renderTree = async ()=>{
    const treeContainer = document.getElementById("listCollContainerAllColl");
    const data = await fetchCollectionsTree();
    let html = "<ul>";
    for (const collection of data)html += createTreeHTML(collection);
    html += "</ul>";
    treeContainer.innerHTML = html;
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
    const elementsWithHiddenAttribute = document.querySelectorAll(`[id*='removeCollIcon']`);
    elementsWithHiddenAttribute.forEach((element)=>{
        element.removeAttribute("hidden");
        removeCollectionClickhHandler(element.getAttribute("data-uuid"), element.getAttribute("data-title"));
    });
    const elementsWithDisabledAttribute = document.querySelectorAll(`[id*='treecolltitleinput']`);
    elementsWithDisabledAttribute.forEach((element)=>{
        element.removeAttribute("disabled");
        updateInputTextEventHandler(element.getAttribute("data-uuid"), element.value);
    });
};
const disableEdition = ()=>{
    const elementsWithHiddenAttribute = document.querySelectorAll(`[id*='removeCollIcon']`);
    elementsWithHiddenAttribute.forEach((element)=>{
        element.setAttribute("hidden", "true");
    });
    const elementsWithDisabledAttribute = document.querySelectorAll(`[id*='treecolltitleinput']`);
    elementsWithDisabledAttribute.forEach((element)=>{
        element.setAttribute("disabled", "true");
    });
};
const clickAllCollButtonHandler = async ()=>{
    EDIT_STATUS = false;
    editButton.innerText = "Edit";
    await renderTree();
    editButton.addEventListener("click", clickEditButtonHandler, false);
};
showAllCollButton?.addEventListener("click", clickAllCollButtonHandler, false);
const confirmDeleteCollectionModal = async (event, collectionId, collectionTitle)=>{
    const chk = event.target;
    if (chk.tagName === "SPAN") {
        if (confirm(`Are you sure you want remove the collection ${collectionTitle} and all of its content?`) == true) {
            const response = await fetch((0, _config.ENDPOINT) + "/deletecollection/" + collectionId, {
                method: "DELETE"
            });
            if (response?.ok) {
                document.getElementById("removeCollIcon" + collectionId).remove();
                const listElemToDelete = document.getElementById(collectionId);
                if (listElemToDelete?.nextSibling?.tagName === "UL") listElemToDelete.nextSibling.remove();
                listElemToDelete.remove();
            }
        } else event.target.checked = false;
    }
};
const removeCollectionClickhHandler = (collectionId, collectionTitle)=>{
    document.getElementById("removeCollIcon" + collectionId).onclick = async (event)=>{
        await confirmDeleteCollectionModal(event, collectionId, collectionTitle);
    };
};
const updateInputTextEventHandler = (collectionId, currentTitle)=>{
    document.getElementById("treecolltitleinput" + collectionId).onblur = (event)=>{
        handleInputBlur(event, collectionId, currentTitle);
    };
};
const updateCollectionTitleRqst = (value, uuid)=>{
    const updateTitleApi = (0, _config.ENDPOINT) + "/updatecolltitle";
    const data = {
        title: value,
        uuid: uuid
    };
    fetch(updateTitleApi, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then().catch((error)=>{
        console.error("Error updating value:", error);
    });
};
const handleInputBlur = (event, collId, currTitle)=>{
    const newValue = event.target.value;
    if (currTitle !== newValue) {
        if (!newValue || newValue === "") {
            event.target.value = currTitle;
            alert("Introduce a valid title, please");
            return;
        } else updateCollectionTitleRqst(newValue, collId);
    }
};

},{"../../../common/js/config":"ecGaw","./home":"3GRBG"}]},["ajXzA","jbnFx"], "jbnFx", "parcelRequire1e7e")

//# sourceMappingURL=index.a19a2815.js.map
