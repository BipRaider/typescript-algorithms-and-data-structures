import { performance as _performance, PerformanceObserver } from 'node:perf_hooks';
test = _performance.timerify(test);

const performanceObserver = new PerformanceObserver((items, observer) => {
  console.log('All entries ->>', items.getEntries());
  const slow = items.getEntriesByName('slow').pop();
  const test = items.getEntriesByName('test').pop();
  console.log({ slow, test });
  observer.disconnect();
});
performanceObserver.observe({ entryTypes: ['measure', 'function'] });

function test(params) {
  const arr = [0];
  for (let i = 0; i < 10_000; i++) {
    arr.push(i * i);
  }
}

function slow(params) {
  performance.mark('start');
  const arr = [0];
  for (let i = 0; i < 10_000; i++) {
    arr.push(i * i);
  }
  performance.mark('end');
  performance.measure('slow', 'start', 'end');
}

test();
slow();
