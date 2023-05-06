const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

module.exports = function clusterMiddleware(app) {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      cluster.fork();
    });
  } else {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 {${process.pid}}:3000`);
    });
  }
};
