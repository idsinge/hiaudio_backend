let t,a;t=null,a=100,self.onmessage=function(e){"start"==e.data?t=setInterval(function(){postMessage("tick")},a):e.data.interval?(a=e.data.interval,t&&(clearInterval(t),t=setInterval(function(){postMessage("tick")},a))):"stop"==e.data&&(clearInterval(t),t=null)};
//# sourceMappingURL=metronomeworker.fe4b894a.js.map
