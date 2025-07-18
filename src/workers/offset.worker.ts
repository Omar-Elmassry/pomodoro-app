self.onmessage = function (e) {
  const intervalId = setInterval(() => {
    postMessage("tick");
    if (e.data.pause || e.data.offset >= 968) {
      clearInterval(intervalId);
    } else {
      e.data.offset += e.data.offsetPerSecond / 10;
    }
  }, 100);
};
