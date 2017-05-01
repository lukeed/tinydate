const Table = require('cli-table2');
const { Suite } = require('benchmark');
const func = require('../dist/tinydate');

const date = new Date();
const template = '[HH:mm:ss]';
const bench = new Suite();

// const tinydate = func(template);
const timestamp = require('time-stamp');
const tinytime = require('tinytime')(template);

const tinydate = d => '[' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ']';

bench
  // .add('tinydate', () => tinydate.render(date))
  .add('tinydate', () => tinydate(date))
  .add('time-stamp', () => timestamp(template, date))
  .add('tinytime', () => tinytime.render(date))
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
      tbl.push([el.name, el.stats.mean, el.hz, diff])
    });
    console.log(tbl.toString());
  })
  .run();
