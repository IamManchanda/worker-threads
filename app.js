const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const wasteTime = (delay) => {
  const end = Date.now() + delay;
  while (Date.now() < end) {}
};

if (isMainThread) {
  console.log("Starting code, ran in main thread.");
  const worker = new Worker(__filename, {
    workerData: {
      outputPrefix: "Parent",
      timeToWaste: 1000,
    },
  });
  worker.on("message", (msg) => {
    console.log(`Worker: ${msg} and getting posted back to main thread.`);
  });
  worker.postMessage("Done with my work");
  console.log("Ending code, ran in main thread.");
} else {
  parentPort.on("message", (msg) => {
    console.log(`${workerData.outputPrefix}: ${msg}`);
  });
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("Getting Started in the worker thread");
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("In the Middle of the worker thread");
  wasteTime(workerData.timeToWaste);
  parentPort.postMessage("All done within the worker thread");
}
