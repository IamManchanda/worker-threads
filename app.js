const { Worker, isMainThread, parentPort } = require("worker_threads");

const wasteTime = (delay) => {
  const end = Date.now() + delay;
  while (Date.now() < end) {}
};

if (isMainThread) {
  console.log("Starting code, ran in main thread.");
  const worker = new Worker(__filename);
  worker.on("message", (msg) => {
    console.log(`Worker: ${msg} and getting posted back to main thread.`);
  });
  console.log("Ending code, ran in main thread.");
} else {
  wasteTime(2000);
  parentPort.postMessage("Getting Started in the worker thread");
  wasteTime(2000);
  parentPort.postMessage("In the Middle of the worker thread");
  wasteTime(2000);
  parentPort.postMessage("All done within the worker thread");
}
