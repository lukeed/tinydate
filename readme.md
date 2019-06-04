# tinydate [![Build Status](https://badgen.now.sh/travis/lukeed/tinydate)](https://travis-ci.org/lukeed/tinydate)

> A tiny (340B) reusable date formatter. Extremely fast!

[Demo](https://jsfiddle.net/lukeed/aoy0xeze/)

Inspired by [`tinytime`][tinytime], this module returns a "render" function that efficiently re-render your deconstructed template. This allows for [incredibly performant](#benchmarks) results!

However, please notice that this only provides a [limited subset of Date methods](#patterns).<br>
If you need more, [`tinytime`][tinytime] or [`date-fns`](https://github.com/date-fns/date-fns) are great alternatives!

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
- `{fff}`: milliseconds; eg: **555**


## Benchmarks

```
# Node v10.13.0

tinydate    x 160,834,214 ops/sec ±0.21% (96 runs sampled)
tinytime    x  44,602,162 ops/sec ±0.34% (97 runs sampled)
time-stamp  x     888,153 ops/sec ±1.27% (86 runs sampled)
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[tinytime]: https://github.com/aweary/tinytime
