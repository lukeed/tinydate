# tinydate [![Build Status](https://travis-ci.org/lukeed/tinydate.svg?branch=master)](https://travis-ci.org/lukeed/tinydate)

> A tiny (337B) reusable date formatter. Extremely fast!

Inspired by [`tinytime`](tinytime), this module returns a "render" function that efficiently re-render your deconstructed template. This allows for [incredibly performant](#benchmarks) results!

However, please notice that this only provides a [limited subset of Date methods](#patterns). If you need more, [`tinytime`](tinytime) or [`date-fns`](https://github.com/date-fns/date-fns) are great alternatives!

## Install

```
$ npm install --save tinydate
```


## Usage

```js
const tinydate = require('tinydate');
const fooDate = new Date('5/1/2017, 4:30:09 PM');

const stamp = tinydate('Current time: [{HH}:{mm}:{ss}]');

stamp(fooDate);
//=> Current time: [16:30:09]

stamp();
//=> Current time: [17:09:34]
```


## API

### tinydate(pattern)(date)

#### pattern

Type: `string`

The template pattern to be parsed.

#### date

Type: `Date`<br>
Default: `new Date()`

The date from which to retrieve values. Defaults to current datetime.

## Patterns

- `{YYYY}`: full year; eg: **2017**
- `{YY}`: short year; eg: **17**
- `{MM}`: month; eg: **04**
- `{DD}`: day; eg: **01**
- `{HH}`: hours; eg: **06** (24h)
- `{mm}`: minutes; eg: **59**
- `{ss}`: seconds; eg: **09**


## Benchmarks

```
tinydate
  --> 72,236,210 ops/sec ±0.89% (91 runs sampled)
tinytime
  --> 27,530,608 ops/sec ±0.92% (93 runs sampled)
time-stamp
  --> 569,692 ops/sec ±0.80% (90 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[tinytime]: https://github.com/aweary/tinytime
