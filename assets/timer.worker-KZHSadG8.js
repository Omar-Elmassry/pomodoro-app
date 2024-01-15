(function(){"use strict";self.onmessage=function(t){const e=setInterval(()=>{t.data.pause||t.data.time<=0?(clearInterval(e),postMessage(0)):(t.data.time-=1,postMessage(t.data.time))},1e3)}})();
