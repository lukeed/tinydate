const Table = require('cli-table2');
const { Suite } = require('benchmark');

const date = new Date();
const template = '[HH:mm:ss]';
const bench = new Suite();

const timestamp = require('time-stamp');
const tinytime = require('tinytime')(template);
const inline = require('./test-inline')(template);
const tinydate = require('../dist/tinydate')(template);
const cheat1 = require('./cheat-string');
const cheat2 = require('./cheat-array');

bench
  .add('tinydate', () => tinydate(date))
  .add('tinytime', () => tinytime.render(date))
  .add('time-stamp', () => timestamp(template, date))
  .add('cheat-string', () => cheat1(date))
  .add('cheat-array', () => cheat2(date))
  .add('test-inline', () => inline.stamp(date))
  .on('cycle', e => console.log(String(e.target)))
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'));

    const tbl = new Table({
      head: ['Name', 'Mean time', 'Ops/sec', 'Diff']
    });

    let prev, diff;

    bench.forEach(el => {
      if (prev) {
        diff = ((el.hz - prev) * 100 / prev).toFixed(2) + '% faster';
      } else {
        diff = 'N/A'
      }
      prev = el.hz;
      tbl.push([el.name, el.stats.mean, el.hz.toLocaleString(), diff])
    });
    console.log(tbl.toString());
  })
  .run();
