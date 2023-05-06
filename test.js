const autocannon = require('autocannon');

const instance = autocannon(
  {
    url: `http://localhost:${process.env.PORT || 3000}`,
  },
  console.log
);

process.once('SIGINT', () => {
  instance.stop();
});

autocannon.track(instance, { renderProgressBar: true });
