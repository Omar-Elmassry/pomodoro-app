(function(){"use strict";self.onmessage=function(t){const e=setInterval(()=>{postMessage("tick"),t.data.pause||t.data.offset>=968?clearInterval(e):t.data.offset+=t.data.offsetPerSecond/10},100)}})();
