self.onmessage = function (e) {
  console.log("🚀 ~ e.data:", e.data);
  const intervalId = setInterval(() => {
    if (e.data.pause || e.data.time <= 0) {
      clearInterval(intervalId);
      postMessage(0);
      console.log("🚀 ~ intervalId ~ clearInterval:");
    } else {
      e.data.time -= 1;
      postMessage(e.data.time);
      // postMessage("tick");
    }
  }, 1000);
};
