/*! For license information please see main.js.LICENSE.txt */
!(function (e, t) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    var n = t();
    for (var s in n) ('object' == typeof exports ? exports : e)[s] = n[s];
  }
})(Object('undefined' != typeof self ? self : this), () =>
  (() => {
    var e = {
        1873(e, t, n) {
          e.exports = { parallel: n(8798), serial: n(2081), serialOrdered: n(28) };
        },
        4555(e) {
          function t(e) {
            'function' == typeof this.jobs[e] && this.jobs[e]();
          }
          e.exports = function (e) {
            (Object.keys(e.jobs).forEach(t.bind(e)), (e.jobs = {}));
          };
        },
        2313(e, t, n) {
          var s = n(405);
          e.exports = function (e) {
            var t = !1;
            return (
              s(function () {
                t = !0;
              }),
              function (n, i) {
                t
                  ? e(n, i)
                  : s(function () {
                      e(n, i);
                    });
              }
            );
          };
        },
        405(e) {
          e.exports = function (e) {
            var t =
              'function' == typeof setImmediate
                ? setImmediate
                : 'object' == typeof process && 'function' == typeof process.nextTick
                  ? process.nextTick
                  : null;
            t ? t(e) : setTimeout(e, 0);
          };
        },
        8051(e, t, n) {
          var s = n(2313),
            i = n(4555);
          e.exports = function (e, t, n, a) {
            var o = n.keyedList ? n.keyedList[n.index] : n.index;
            n.jobs[o] = (function (e, t, n, i) {
              return 2 == e.length ? e(n, s(i)) : e(n, t, s(i));
            })(t, o, e[o], function (e, t) {
              o in n.jobs && (delete n.jobs[o], e ? i(n) : (n.results[o] = t), a(e, n.results));
            });
          };
        },
        9500(e) {
          e.exports = function (e, t) {
            var n = !Array.isArray(e),
              s = {
                index: 0,
                keyedList: n || t ? Object.keys(e) : null,
                jobs: {},
                results: n ? {} : [],
                size: n ? Object.keys(e).length : e.length,
              };
            return (
              t &&
                s.keyedList.sort(
                  n
                    ? t
                    : function (n, s) {
                        return t(e[n], e[s]);
                      }
                ),
              s
            );
          };
        },
        6276(e, t, n) {
          var s = n(4555),
            i = n(2313);
          e.exports = function (e) {
            Object.keys(this.jobs).length &&
              ((this.index = this.size), s(this), i(e)(null, this.results));
          };
        },
        8798(e, t, n) {
          var s = n(8051),
            i = n(9500),
            a = n(6276);
          e.exports = function (e, t, n) {
            for (var o = i(e); o.index < (o.keyedList || e).length; )
              (s(e, t, o, function (e, t) {
                e ? n(e, t) : 0 !== Object.keys(o.jobs).length || n(null, o.results);
              }),
                o.index++);
            return a.bind(o, n);
          };
        },
        2081(e, t, n) {
          var s = n(28);
          e.exports = function (e, t, n) {
            return s(e, t, null, n);
          };
        },
        28(e, t, n) {
          var s = n(8051),
            i = n(9500),
            a = n(6276);
          function o(e, t) {
            return e < t ? -1 : e > t ? 1 : 0;
          }
          ((e.exports = function (e, t, n, o) {
            var r = i(e, n);
            return (
              s(e, t, r, function n(i, a) {
                i
                  ? o(i, a)
                  : (r.index++,
                    r.index < (r.keyedList || e).length ? s(e, t, r, n) : o(null, r.results));
              }),
              a.bind(r, o)
            );
          }),
            (e.exports.ascending = o),
            (e.exports.descending = function (e, t) {
              return -1 * o(e, t);
            }));
        },
        3144(e, t, n) {
          'use strict';
          var s = n(6743),
            i = n(1002),
            a = n(76),
            o = n(7119);
          e.exports = o || s.call(a, i);
        },
        1002(e) {
          'use strict';
          e.exports = Function.prototype.apply;
        },
        76(e) {
          'use strict';
          e.exports = Function.prototype.call;
        },
        3126(e, t, n) {
          'use strict';
          var s = n(6743),
            i = n(9675),
            a = n(76),
            o = n(3144);
          e.exports = function (e) {
            if (e.length < 1 || 'function' != typeof e[0]) throw new i('a function is required');
            return o(s, a, e);
          };
        },
        7119(e) {
          'use strict';
          e.exports = 'undefined' != typeof Reflect && Reflect && Reflect.apply;
        },
        801(e, t, n) {
          var s = n(9023),
            i = n(2203).Stream,
            a = n(8069);
          function o() {
            ((this.writable = !1),
              (this.readable = !0),
              (this.dataSize = 0),
              (this.maxDataSize = 2097152),
              (this.pauseStreams = !0),
              (this._released = !1),
              (this._streams = []),
              (this._currentStream = null),
              (this._insideLoop = !1),
              (this._pendingNext = !1));
          }
          ((e.exports = o),
            s.inherits(o, i),
            (o.create = function (e) {
              var t = new this();
              for (var n in (e = e || {})) t[n] = e[n];
              return t;
            }),
            (o.isStreamLike = function (e) {
              return (
                'function' != typeof e &&
                'string' != typeof e &&
                'boolean' != typeof e &&
                'number' != typeof e &&
                !Buffer.isBuffer(e)
              );
            }),
            (o.prototype.append = function (e) {
              if (o.isStreamLike(e)) {
                if (!(e instanceof a)) {
                  var t = a.create(e, { maxDataSize: 1 / 0, pauseStream: this.pauseStreams });
                  (e.on('data', this._checkDataSize.bind(this)), (e = t));
                }
                (this._handleErrors(e), this.pauseStreams && e.pause());
              }
              return (this._streams.push(e), this);
            }),
            (o.prototype.pipe = function (e, t) {
              return (i.prototype.pipe.call(this, e, t), this.resume(), e);
            }),
            (o.prototype._getNext = function () {
              if (((this._currentStream = null), this._insideLoop)) this._pendingNext = !0;
              else {
                this._insideLoop = !0;
                try {
                  do {
                    ((this._pendingNext = !1), this._realGetNext());
                  } while (this._pendingNext);
                } finally {
                  this._insideLoop = !1;
                }
              }
            }),
            (o.prototype._realGetNext = function () {
              var e = this._streams.shift();
              void 0 !== e
                ? 'function' == typeof e
                  ? e(
                      function (e) {
                        (o.isStreamLike(e) &&
                          (e.on('data', this._checkDataSize.bind(this)), this._handleErrors(e)),
                          this._pipeNext(e));
                      }.bind(this)
                    )
                  : this._pipeNext(e)
                : this.end();
            }),
            (o.prototype._pipeNext = function (e) {
              if (((this._currentStream = e), o.isStreamLike(e)))
                return (e.on('end', this._getNext.bind(this)), void e.pipe(this, { end: !1 }));
              var t = e;
              (this.write(t), this._getNext());
            }),
            (o.prototype._handleErrors = function (e) {
              var t = this;
              e.on('error', function (e) {
                t._emitError(e);
              });
            }),
            (o.prototype.write = function (e) {
              this.emit('data', e);
            }),
            (o.prototype.pause = function () {
              this.pauseStreams &&
                (this.pauseStreams &&
                  this._currentStream &&
                  'function' == typeof this._currentStream.pause &&
                  this._currentStream.pause(),
                this.emit('pause'));
            }),
            (o.prototype.resume = function () {
              (this._released || ((this._released = !0), (this.writable = !0), this._getNext()),
                this.pauseStreams &&
                  this._currentStream &&
                  'function' == typeof this._currentStream.resume &&
                  this._currentStream.resume(),
                this.emit('resume'));
            }),
            (o.prototype.end = function () {
              (this._reset(), this.emit('end'));
            }),
            (o.prototype.destroy = function () {
              (this._reset(), this.emit('close'));
            }),
            (o.prototype._reset = function () {
              ((this.writable = !1), (this._streams = []), (this._currentStream = null));
            }),
            (o.prototype._checkDataSize = function () {
              if ((this._updateDataSize(), !(this.dataSize <= this.maxDataSize))) {
                var e = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
                this._emitError(new Error(e));
              }
            }),
            (o.prototype._updateDataSize = function () {
              this.dataSize = 0;
              var e = this;
              (this._streams.forEach(function (t) {
                t.dataSize && (e.dataSize += t.dataSize);
              }),
                this._currentStream &&
                  this._currentStream.dataSize &&
                  (this.dataSize += this._currentStream.dataSize));
            }),
            (o.prototype._emitError = function (e) {
              (this._reset(), this.emit('error', e));
            }));
        },
        7833(e, t, n) {
          ((t.formatArgs = function (t) {
            if (
              ((t[0] =
                (this.useColors ? '%c' : '') +
                this.namespace +
                (this.useColors ? ' %c' : ' ') +
                t[0] +
                (this.useColors ? '%c ' : ' ') +
                '+' +
                e.exports.humanize(this.diff)),
              !this.useColors)
            )
              return;
            const n = 'color: ' + this.color;
            t.splice(1, 0, n, 'color: inherit');
            let s = 0,
              i = 0;
            (t[0].replace(/%[a-zA-Z%]/g, (e) => {
              '%%' !== e && (s++, '%c' === e && (i = s));
            }),
              t.splice(i, 0, n));
          }),
            (t.save = function (e) {
              try {
                e ? t.storage.setItem('debug', e) : t.storage.removeItem('debug');
              } catch (e) {}
            }),
            (t.load = function () {
              let e;
              try {
                e = t.storage.getItem('debug') || t.storage.getItem('DEBUG');
              } catch (e) {}
              return (
                !e && 'undefined' != typeof process && 'env' in process && (e = process.env.DEBUG),
                e
              );
            }),
            (t.useColors = function () {
              if (
                'undefined' != typeof window &&
                window.process &&
                ('renderer' === window.process.type || window.process.__nwjs)
              )
                return !0;
              if (
                'undefined' != typeof navigator &&
                navigator.userAgent &&
                navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
              )
                return !1;
              let e;
              return (
                ('undefined' != typeof document &&
                  document.documentElement &&
                  document.documentElement.style &&
                  document.documentElement.style.WebkitAppearance) ||
                ('undefined' != typeof window &&
                  window.console &&
                  (window.console.firebug || (window.console.exception && window.console.table))) ||
                ('undefined' != typeof navigator &&
                  navigator.userAgent &&
                  (e = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) &&
                  parseInt(e[1], 10) >= 31) ||
                ('undefined' != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
              );
            }),
            (t.storage = (function () {
              try {
                return localStorage;
              } catch (e) {}
            })()),
            (t.destroy = (() => {
              let e = !1;
              return () => {
                e ||
                  ((e = !0),
                  console.warn(
                    'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
                  ));
              };
            })()),
            (t.colors = [
              '#0000CC',
              '#0000FF',
              '#0033CC',
              '#0033FF',
              '#0066CC',
              '#0066FF',
              '#0099CC',
              '#0099FF',
              '#00CC00',
              '#00CC33',
              '#00CC66',
              '#00CC99',
              '#00CCCC',
              '#00CCFF',
              '#3300CC',
              '#3300FF',
              '#3333CC',
              '#3333FF',
              '#3366CC',
              '#3366FF',
              '#3399CC',
              '#3399FF',
              '#33CC00',
              '#33CC33',
              '#33CC66',
              '#33CC99',
              '#33CCCC',
              '#33CCFF',
              '#6600CC',
              '#6600FF',
              '#6633CC',
              '#6633FF',
              '#66CC00',
              '#66CC33',
              '#9900CC',
              '#9900FF',
              '#9933CC',
              '#9933FF',
              '#99CC00',
              '#99CC33',
              '#CC0000',
              '#CC0033',
              '#CC0066',
              '#CC0099',
              '#CC00CC',
              '#CC00FF',
              '#CC3300',
              '#CC3333',
              '#CC3366',
              '#CC3399',
              '#CC33CC',
              '#CC33FF',
              '#CC6600',
              '#CC6633',
              '#CC9900',
              '#CC9933',
              '#CCCC00',
              '#CCCC33',
              '#FF0000',
              '#FF0033',
              '#FF0066',
              '#FF0099',
              '#FF00CC',
              '#FF00FF',
              '#FF3300',
              '#FF3333',
              '#FF3366',
              '#FF3399',
              '#FF33CC',
              '#FF33FF',
              '#FF6600',
              '#FF6633',
              '#FF9900',
              '#FF9933',
              '#FFCC00',
              '#FFCC33',
            ]),
            (t.log = console.debug || console.log || (() => {})),
            (e.exports = n(736)(t)));
          const { formatters: s } = e.exports;
          s.j = function (e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return '[UnexpectedJSONParseError]: ' + e.message;
            }
          };
        },
        736(e, t, n) {
          e.exports = function (e) {
            function t(e) {
              let n,
                i,
                a,
                o = null;
              function r(...e) {
                if (!r.enabled) return;
                const s = r,
                  i = Number(new Date()),
                  a = i - (n || i);
                ((s.diff = a),
                  (s.prev = n),
                  (s.curr = i),
                  (n = i),
                  (e[0] = t.coerce(e[0])),
                  'string' != typeof e[0] && e.unshift('%O'));
                let o = 0;
                ((e[0] = e[0].replace(/%([a-zA-Z%])/g, (n, i) => {
                  if ('%%' === n) return '%';
                  o++;
                  const a = t.formatters[i];
                  if ('function' == typeof a) {
                    const t = e[o];
                    ((n = a.call(s, t)), e.splice(o, 1), o--);
                  }
                  return n;
                })),
                  t.formatArgs.call(s, e),
                  (s.log || t.log).apply(s, e));
              }
              return (
                (r.namespace = e),
                (r.useColors = t.useColors()),
                (r.color = t.selectColor(e)),
                (r.extend = s),
                (r.destroy = t.destroy),
                Object.defineProperty(r, 'enabled', {
                  enumerable: !0,
                  configurable: !1,
                  get: () =>
                    null !== o
                      ? o
                      : (i !== t.namespaces && ((i = t.namespaces), (a = t.enabled(e))), a),
                  set: (e) => {
                    o = e;
                  },
                }),
                'function' == typeof t.init && t.init(r),
                r
              );
            }
            function s(e, n) {
              const s = t(this.namespace + (void 0 === n ? ':' : n) + e);
              return ((s.log = this.log), s);
            }
            function i(e, t) {
              let n = 0,
                s = 0,
                i = -1,
                a = 0;
              for (; n < e.length; )
                if (s < t.length && (t[s] === e[n] || '*' === t[s]))
                  '*' === t[s] ? ((i = s), (a = n), s++) : (n++, s++);
                else {
                  if (-1 === i) return !1;
                  ((s = i + 1), a++, (n = a));
                }
              for (; s < t.length && '*' === t[s]; ) s++;
              return s === t.length;
            }
            return (
              (t.debug = t),
              (t.default = t),
              (t.coerce = function (e) {
                return e instanceof Error ? e.stack || e.message : e;
              }),
              (t.disable = function () {
                const e = [...t.names, ...t.skips.map((e) => '-' + e)].join(',');
                return (t.enable(''), e);
              }),
              (t.enable = function (e) {
                (t.save(e), (t.namespaces = e), (t.names = []), (t.skips = []));
                const n = ('string' == typeof e ? e : '')
                  .trim()
                  .replace(/\s+/g, ',')
                  .split(',')
                  .filter(Boolean);
                for (const e of n) '-' === e[0] ? t.skips.push(e.slice(1)) : t.names.push(e);
              }),
              (t.enabled = function (e) {
                for (const n of t.skips) if (i(e, n)) return !1;
                for (const n of t.names) if (i(e, n)) return !0;
                return !1;
              }),
              (t.humanize = n(6585)),
              (t.destroy = function () {
                console.warn(
                  'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
                );
              }),
              Object.keys(e).forEach((n) => {
                t[n] = e[n];
              }),
              (t.names = []),
              (t.skips = []),
              (t.formatters = {}),
              (t.selectColor = function (e) {
                let n = 0;
                for (let t = 0; t < e.length; t++) ((n = (n << 5) - n + e.charCodeAt(t)), (n |= 0));
                return t.colors[Math.abs(n) % t.colors.length];
              }),
              t.enable(t.load()),
              t
            );
          };
        },
        5753(e, t, n) {
          'undefined' == typeof process ||
          'renderer' === process.type ||
          !0 === process.browser ||
          process.__nwjs
            ? (e.exports = n(7833))
            : (e.exports = n(6033));
        },
        6033(e, t, n) {
          const s = n(2018),
            i = n(9023);
          ((t.init = function (e) {
            e.inspectOpts = {};
            const n = Object.keys(t.inspectOpts);
            for (let s = 0; s < n.length; s++) e.inspectOpts[n[s]] = t.inspectOpts[n[s]];
          }),
            (t.log = function (...e) {
              return process.stderr.write(i.formatWithOptions(t.inspectOpts, ...e) + '\n');
            }),
            (t.formatArgs = function (n) {
              const { namespace: s, useColors: i } = this;
              if (i) {
                const t = this.color,
                  i = '[3' + (t < 8 ? t : '8;5;' + t),
                  a = `  ${i};1m${s} [0m`;
                ((n[0] = a + n[0].split('\n').join('\n' + a)),
                  n.push(i + 'm+' + e.exports.humanize(this.diff) + '[0m'));
              } else
                n[0] =
                  (t.inspectOpts.hideDate ? '' : new Date().toISOString() + ' ') + s + ' ' + n[0];
            }),
            (t.save = function (e) {
              e ? (process.env.DEBUG = e) : delete process.env.DEBUG;
            }),
            (t.load = function () {
              return process.env.DEBUG;
            }),
            (t.useColors = function () {
              return 'colors' in t.inspectOpts
                ? Boolean(t.inspectOpts.colors)
                : s.isatty(process.stderr.fd);
            }),
            (t.destroy = i.deprecate(
              () => {},
              'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
            )),
            (t.colors = [6, 2, 3, 4, 5, 1]));
          try {
            const e = n(7687);
            e &&
              (e.stderr || e).level >= 2 &&
              (t.colors = [
                20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74,
                75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149,
                160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184,
                185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215,
                220, 221,
              ]);
          } catch (e) {}
          ((t.inspectOpts = Object.keys(process.env)
            .filter((e) => /^debug_/i.test(e))
            .reduce((e, t) => {
              const n = t
                .substring(6)
                .toLowerCase()
                .replace(/_([a-z])/g, (e, t) => t.toUpperCase());
              let s = process.env[t];
              return (
                (s =
                  !!/^(yes|on|true|enabled)$/i.test(s) ||
                  (!/^(no|off|false|disabled)$/i.test(s) && ('null' === s ? null : Number(s)))),
                (e[n] = s),
                e
              );
            }, {})),
            (e.exports = n(736)(t)));
          const { formatters: a } = e.exports;
          ((a.o = function (e) {
            return (
              (this.inspectOpts.colors = this.useColors),
              i
                .inspect(e, this.inspectOpts)
                .split('\n')
                .map((e) => e.trim())
                .join(' ')
            );
          }),
            (a.O = function (e) {
              return ((this.inspectOpts.colors = this.useColors), i.inspect(e, this.inspectOpts));
            }));
        },
        8069(e, t, n) {
          var s = n(2203).Stream,
            i = n(9023);
          function a() {
            ((this.source = null),
              (this.dataSize = 0),
              (this.maxDataSize = 1048576),
              (this.pauseStream = !0),
              (this._maxDataSizeExceeded = !1),
              (this._released = !1),
              (this._bufferedEvents = []));
          }
          ((e.exports = a),
            i.inherits(a, s),
            (a.create = function (e, t) {
              var n = new this();
              for (var s in (t = t || {})) n[s] = t[s];
              n.source = e;
              var i = e.emit;
              return (
                (e.emit = function () {
                  return (n._handleEmit(arguments), i.apply(e, arguments));
                }),
                e.on('error', function () {}),
                n.pauseStream && e.pause(),
                n
              );
            }),
            Object.defineProperty(a.prototype, 'readable', {
              configurable: !0,
              enumerable: !0,
              get: function () {
                return this.source.readable;
              },
            }),
            (a.prototype.setEncoding = function () {
              return this.source.setEncoding.apply(this.source, arguments);
            }),
            (a.prototype.resume = function () {
              (this._released || this.release(), this.source.resume());
            }),
            (a.prototype.pause = function () {
              this.source.pause();
            }),
            (a.prototype.release = function () {
              ((this._released = !0),
                this._bufferedEvents.forEach(
                  function (e) {
                    this.emit.apply(this, e);
                  }.bind(this)
                ),
                (this._bufferedEvents = []));
            }),
            (a.prototype.pipe = function () {
              var e = s.prototype.pipe.apply(this, arguments);
              return (this.resume(), e);
            }),
            (a.prototype._handleEmit = function (e) {
              this._released
                ? this.emit.apply(this, e)
                : ('data' === e[0] &&
                    ((this.dataSize += e[1].length), this._checkIfMaxDataSizeExceeded()),
                  this._bufferedEvents.push(e));
            }),
            (a.prototype._checkIfMaxDataSizeExceeded = function () {
              if (!(this._maxDataSizeExceeded || this.dataSize <= this.maxDataSize)) {
                this._maxDataSizeExceeded = !0;
                var e = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
                this.emit('error', new Error(e));
              }
            }));
        },
        7176(e, t, n) {
          'use strict';
          var s,
            i = n(3126),
            a = n(5795);
          try {
            s = [].__proto__ === Array.prototype;
          } catch (e) {
            if (!e || 'object' != typeof e || !('code' in e) || 'ERR_PROTO_ACCESS' !== e.code)
              throw e;
          }
          var o = !!s && a && a(Object.prototype, '__proto__'),
            r = Object,
            c = r.getPrototypeOf;
          e.exports =
            o && 'function' == typeof o.get
              ? i([o.get])
              : 'function' == typeof c &&
                function (e) {
                  return c(null == e ? e : r(e));
                };
        },
        655(e) {
          'use strict';
          var t = Object.defineProperty || !1;
          if (t)
            try {
              t({}, 'a', { value: 1 });
            } catch (e) {
              t = !1;
            }
          e.exports = t;
        },
        1237(e) {
          'use strict';
          e.exports = EvalError;
        },
        9383(e) {
          'use strict';
          e.exports = Error;
        },
        9290(e) {
          'use strict';
          e.exports = RangeError;
        },
        9538(e) {
          'use strict';
          e.exports = ReferenceError;
        },
        8068(e) {
          'use strict';
          e.exports = SyntaxError;
        },
        9675(e) {
          'use strict';
          e.exports = TypeError;
        },
        5345(e) {
          'use strict';
          e.exports = URIError;
        },
        9612(e) {
          'use strict';
          e.exports = Object;
        },
        9605(e, t, n) {
          'use strict';
          var s = n(453)('%Object.defineProperty%', !0),
            i = n(9092)(),
            a = n(9957),
            o = n(9675),
            r = i ? Symbol.toStringTag : null;
          e.exports = function (e, t) {
            var n = arguments.length > 2 && !!arguments[2] && arguments[2].force,
              i = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
            if ((void 0 !== n && 'boolean' != typeof n) || (void 0 !== i && 'boolean' != typeof i))
              throw new o(
                'if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans'
              );
            !r ||
              (!n && a(e, r)) ||
              (s
                ? s(e, r, { configurable: !i, enumerable: !1, value: t, writable: !1 })
                : (e[r] = t));
          };
        },
        7507(e, t, n) {
          var s;
          e.exports = function () {
            if (!s) {
              try {
                s = n(5753)('follow-redirects');
              } catch (e) {}
              'function' != typeof s && (s = function () {});
            }
            s.apply(null, arguments);
          };
        },
        3164(e, t, n) {
          var s,
            i,
            a,
            o = n(7016),
            r = o.URL,
            c = n(8611),
            p = n(5692),
            l = n(2203).Writable,
            u = n(2613),
            d = n(7507);
          ((s = 'undefined' != typeof process),
            (i = 'undefined' != typeof window && 'undefined' != typeof document),
            (a = T(Error.captureStackTrace)),
            s ||
              (!i && a) ||
              console.warn('The follow-redirects package should be excluded from browser builds.'));
          var m = !1;
          try {
            u(new r(''));
          } catch (e) {
            m = 'ERR_INVALID_URL' === e.code;
          }
          var f = ['Authorization', 'Proxy-Authorization', 'Cookie'],
            h = [
              'auth',
              'host',
              'hostname',
              'href',
              'path',
              'pathname',
              'port',
              'protocol',
              'query',
              'search',
              'hash',
            ],
            x = ['abort', 'aborted', 'connect', 'error', 'socket', 'timeout'],
            g = Object.create(null);
          x.forEach(function (e) {
            g[e] = function (t, n, s) {
              this._redirectable.emit(e, t, n, s);
            };
          });
          var v = U('ERR_INVALID_URL', 'Invalid URL', TypeError),
            b = U('ERR_FR_REDIRECTION_FAILURE', 'Redirected request failed'),
            y = U('ERR_FR_TOO_MANY_REDIRECTS', 'Maximum number of redirects exceeded', b),
            w = U(
              'ERR_FR_MAX_BODY_LENGTH_EXCEEDED',
              'Request body larger than maxBodyLength limit'
            ),
            _ = U('ERR_STREAM_WRITE_AFTER_END', 'write after end'),
            R = l.prototype.destroy || P;
          function k(e, t) {
            (l.call(this),
              this._sanitizeOptions(e),
              (this._options = e),
              (this._ended = !1),
              (this._ending = !1),
              (this._redirectCount = 0),
              (this._redirects = []),
              (this._requestBodyLength = 0),
              (this._requestBodyBuffers = []),
              t && this.on('response', t));
            var n = this;
            ((this._onNativeResponse = function (e) {
              try {
                n._processResponse(e);
              } catch (e) {
                n.emit('error', e instanceof b ? e : new b({ cause: e }));
              }
            }),
              (this._headerFilter = new RegExp(
                '^(?:' + f.concat(e.sensitiveHeaders).map(L).join('|') + ')$',
                'i'
              )),
              this._performRequest());
          }
          function j(e) {
            var t = { maxRedirects: 21, maxBodyLength: 10485760 },
              n = {};
            return (
              Object.keys(e).forEach(function (s) {
                var i = s + ':',
                  a = (n[i] = e[s]),
                  o = (t[s] = Object.create(a));
                Object.defineProperties(o, {
                  request: {
                    value: function (e, s, a) {
                      return (
                        r && e instanceof r
                          ? (e = S(e))
                          : F(e)
                            ? (e = S(E(e)))
                            : ((a = s), (s = C(e)), (e = { protocol: i })),
                        T(s) && ((a = s), (s = null)),
                        ((s = Object.assign(
                          { maxRedirects: t.maxRedirects, maxBodyLength: t.maxBodyLength },
                          e,
                          s
                        )).nativeProtocols = n),
                        F(s.host) || F(s.hostname) || (s.hostname = '::1'),
                        u.equal(s.protocol, i, 'protocol mismatch'),
                        d('options', s),
                        new k(s, a)
                      );
                    },
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                  },
                  get: {
                    value: function (e, t, n) {
                      var s = o.request(e, t, n);
                      return (s.end(), s);
                    },
                    configurable: !0,
                    enumerable: !0,
                    writable: !0,
                  },
                });
              }),
              t
            );
          }
          function P() {}
          function E(e) {
            var t;
            if (m) t = new r(e);
            else if (!F((t = C(o.parse(e))).protocol)) throw new v({ input: e });
            return t;
          }
          function C(e) {
            if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
              throw new v({ input: e.href || e });
            if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
              throw new v({ input: e.href || e });
            return e;
          }
          function S(e, t) {
            var n = t || {};
            for (var s of h) n[s] = e[s];
            return (
              n.hostname.startsWith('[') && (n.hostname = n.hostname.slice(1, -1)),
              '' !== n.port && (n.port = Number(n.port)),
              (n.path = n.search ? n.pathname + n.search : n.pathname),
              n
            );
          }
          function O(e, t) {
            var n;
            for (var s in t) e.test(s) && ((n = t[s]), delete t[s]);
            return null == n ? void 0 : String(n).trim();
          }
          function U(e, t, n) {
            function s(n) {
              (T(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor),
                Object.assign(this, n || {}),
                (this.code = e),
                (this.message = this.cause ? t + ': ' + this.cause.message : t));
            }
            return (
              (s.prototype = new (n || Error)()),
              Object.defineProperties(s.prototype, {
                constructor: { value: s, enumerable: !1 },
                name: { value: 'Error [' + e + ']', enumerable: !1 },
              }),
              s
            );
          }
          function A(e, t) {
            for (var n of x) e.removeListener(n, g[n]);
            (e.on('error', P), e.destroy(t));
          }
          function F(e) {
            return 'string' == typeof e || e instanceof String;
          }
          function T(e) {
            return 'function' == typeof e;
          }
          function L(e) {
            return e.replace(/[\]\\/()*+?.$]/g, '\\$&');
          }
          ((k.prototype = Object.create(l.prototype)),
            (k.prototype.abort = function () {
              (A(this._currentRequest), this._currentRequest.abort(), this.emit('abort'));
            }),
            (k.prototype.destroy = function (e) {
              return (A(this._currentRequest, e), R.call(this, e), this);
            }),
            (k.prototype.write = function (e, t, n) {
              if (this._ending) throw new _();
              if (!(F(e) || ('object' == typeof (s = e) && 'length' in s)))
                throw new TypeError('data should be a string, Buffer or Uint8Array');
              var s;
              (T(t) && ((n = t), (t = null)),
                0 !== e.length
                  ? this._requestBodyLength + e.length <= this._options.maxBodyLength
                    ? ((this._requestBodyLength += e.length),
                      this._requestBodyBuffers.push({ data: e, encoding: t }),
                      this._currentRequest.write(e, t, n))
                    : (this.emit('error', new w()), this.abort())
                  : n && n());
            }),
            (k.prototype.end = function (e, t, n) {
              if ((T(e) ? ((n = e), (e = t = null)) : T(t) && ((n = t), (t = null)), e)) {
                var s = this,
                  i = this._currentRequest;
                (this.write(e, t, function () {
                  ((s._ended = !0), i.end(null, null, n));
                }),
                  (this._ending = !0));
              } else ((this._ended = this._ending = !0), this._currentRequest.end(null, null, n));
            }),
            (k.prototype.setHeader = function (e, t) {
              ((this._options.headers[e] = t), this._currentRequest.setHeader(e, t));
            }),
            (k.prototype.removeHeader = function (e) {
              (delete this._options.headers[e], this._currentRequest.removeHeader(e));
            }),
            (k.prototype.setTimeout = function (e, t) {
              var n = this;
              function s(t) {
                (t.setTimeout(e),
                  t.removeListener('timeout', t.destroy),
                  t.addListener('timeout', t.destroy));
              }
              function i(t) {
                (n._timeout && clearTimeout(n._timeout),
                  (n._timeout = setTimeout(function () {
                    (n.emit('timeout'), a());
                  }, e)),
                  s(t));
              }
              function a() {
                (n._timeout && (clearTimeout(n._timeout), (n._timeout = null)),
                  n.removeListener('abort', a),
                  n.removeListener('error', a),
                  n.removeListener('response', a),
                  n.removeListener('close', a),
                  t && n.removeListener('timeout', t),
                  n.socket || n._currentRequest.removeListener('socket', i));
              }
              return (
                t && this.on('timeout', t),
                this.socket ? i(this.socket) : this._currentRequest.once('socket', i),
                this.on('socket', s),
                this.on('abort', a),
                this.on('error', a),
                this.on('response', a),
                this.on('close', a),
                this
              );
            }),
            ['flushHeaders', 'getHeader', 'setNoDelay', 'setSocketKeepAlive'].forEach(function (e) {
              k.prototype[e] = function (t, n) {
                return this._currentRequest[e](t, n);
              };
            }),
            ['aborted', 'connection', 'socket'].forEach(function (e) {
              Object.defineProperty(k.prototype, e, {
                get: function () {
                  return this._currentRequest[e];
                },
              });
            }),
            (k.prototype._sanitizeOptions = function (e) {
              if (
                (e.headers || (e.headers = {}),
                e.sensitiveHeaders instanceof Array || (e.sensitiveHeaders = []),
                e.host && (e.hostname || (e.hostname = e.host), delete e.host),
                !e.pathname && e.path)
              ) {
                var t = e.path.indexOf('?');
                t < 0
                  ? (e.pathname = e.path)
                  : ((e.pathname = e.path.substring(0, t)), (e.search = e.path.substring(t)));
              }
            }),
            (k.prototype._performRequest = function () {
              var e = this._options.protocol,
                t = this._options.nativeProtocols[e];
              if (!t) throw new TypeError('Unsupported protocol ' + e);
              if (this._options.agents) {
                var n = e.slice(0, -1);
                this._options.agent = this._options.agents[n];
              }
              var s = (this._currentRequest = t.request(this._options, this._onNativeResponse));
              for (var i of ((s._redirectable = this), x)) s.on(i, g[i]);
              if (
                ((this._currentUrl = /^\//.test(this._options.path)
                  ? o.format(this._options)
                  : this._options.path),
                this._isRedirect)
              ) {
                var a = 0,
                  r = this,
                  c = this._requestBodyBuffers;
                !(function e(t) {
                  if (s === r._currentRequest)
                    if (t) r.emit('error', t);
                    else if (a < c.length) {
                      var n = c[a++];
                      s.finished || s.write(n.data, n.encoding, e);
                    } else r._ended && s.end();
                })();
              }
            }),
            (k.prototype._processResponse = function (e) {
              var t = e.statusCode;
              this._options.trackRedirects &&
                this._redirects.push({ url: this._currentUrl, headers: e.headers, statusCode: t });
              var n,
                s = e.headers.location;
              if (!s || !1 === this._options.followRedirects || t < 300 || t >= 400)
                return (
                  (e.responseUrl = this._currentUrl),
                  (e.redirects = this._redirects),
                  this.emit('response', e),
                  void (this._requestBodyBuffers = [])
                );
              if (
                (A(this._currentRequest),
                e.destroy(),
                ++this._redirectCount > this._options.maxRedirects)
              )
                throw new y();
              var i = this._options.beforeRedirect;
              i && (n = Object.assign({ Host: e.req.getHeader('host') }, this._options.headers));
              var a = this._options.method;
              (((301 === t || 302 === t) && 'POST' === this._options.method) ||
                (303 === t && !/^(?:GET|HEAD)$/.test(this._options.method))) &&
                ((this._options.method = 'GET'),
                (this._requestBodyBuffers = []),
                O(/^content-/i, this._options.headers));
              var c,
                p,
                l = O(/^host$/i, this._options.headers),
                f = E(this._currentUrl),
                h = l || f.host,
                x = /^\w+:/.test(s) ? this._currentUrl : o.format(Object.assign(f, { host: h })),
                g = ((c = s), (p = x), m ? new r(c, p) : E(o.resolve(p, c)));
              if (
                (d('redirecting to', g.href),
                (this._isRedirect = !0),
                S(g, this._options),
                ((g.protocol !== f.protocol && 'https:' !== g.protocol) ||
                  (g.host !== h &&
                    !(function (e, t) {
                      u(F(e) && F(t));
                      var n = e.length - t.length - 1;
                      return n > 0 && '.' === e[n] && e.endsWith(t);
                    })(g.host, h))) &&
                  O(this._headerFilter, this._options.headers),
                T(i))
              ) {
                var v = { headers: e.headers, statusCode: t },
                  b = { url: x, method: a, headers: n };
                (i(this._options, v, b), this._sanitizeOptions(this._options));
              }
              this._performRequest();
            }),
            (e.exports = j({ http: c, https: p })),
            (e.exports.wrap = j));
        },
        737(e, t, n) {
          'use strict';
          var s = n(801),
            i = n(9023),
            a = n(6928),
            o = n(8611),
            r = n(5692),
            c = n(7016).parse,
            p = n(9896),
            l = n(2203).Stream,
            u = n(6982),
            d = n(6049),
            m = n(1873),
            f = n(9605),
            h = n(9957),
            x = n(1362);
          function g(e) {
            if (!(this instanceof g)) return new g(e);
            for (var t in ((this._overheadLength = 0),
            (this._valueLength = 0),
            (this._valuesToMeasure = []),
            s.call(this),
            (e = e || {})))
              this[t] = e[t];
          }
          (i.inherits(g, s),
            (g.LINE_BREAK = '\r\n'),
            (g.DEFAULT_CONTENT_TYPE = 'application/octet-stream'),
            (g.prototype.append = function (e, t, n) {
              'string' == typeof (n = n || {}) && (n = { filename: n });
              var i = s.prototype.append.bind(this);
              if ((('number' != typeof t && null != t) || (t = String(t)), Array.isArray(t)))
                this._error(new Error('Arrays are not supported.'));
              else {
                var a = this._multiPartHeader(e, t, n),
                  o = this._multiPartFooter();
                (i(a), i(t), i(o), this._trackLength(a, t, n));
              }
            }),
            (g.prototype._trackLength = function (e, t, n) {
              var s = 0;
              (null != n.knownLength
                ? (s += Number(n.knownLength))
                : Buffer.isBuffer(t)
                  ? (s = t.length)
                  : 'string' == typeof t && (s = Buffer.byteLength(t)),
                (this._valueLength += s),
                (this._overheadLength += Buffer.byteLength(e) + g.LINE_BREAK.length),
                t &&
                  (t.path || (t.readable && h(t, 'httpVersion')) || t instanceof l) &&
                  (n.knownLength || this._valuesToMeasure.push(t)));
            }),
            (g.prototype._lengthRetriever = function (e, t) {
              h(e, 'fd')
                ? null != e.end && e.end != 1 / 0 && null != e.start
                  ? t(null, e.end + 1 - (e.start ? e.start : 0))
                  : p.stat(e.path, function (n, s) {
                      if (n) t(n);
                      else {
                        var i = s.size - (e.start ? e.start : 0);
                        t(null, i);
                      }
                    })
                : h(e, 'httpVersion')
                  ? t(null, Number(e.headers['content-length']))
                  : h(e, 'httpModule')
                    ? (e.on('response', function (n) {
                        (e.pause(), t(null, Number(n.headers['content-length'])));
                      }),
                      e.resume())
                    : t('Unknown stream');
            }),
            (g.prototype._multiPartHeader = function (e, t, n) {
              if ('string' == typeof n.header) return n.header;
              var s,
                i = this._getContentDisposition(t, n),
                a = this._getContentType(t, n),
                o = '',
                r = {
                  'Content-Disposition': ['form-data', 'name="' + e + '"'].concat(i || []),
                  'Content-Type': [].concat(a || []),
                };
              for (var c in ('object' == typeof n.header && x(r, n.header), r))
                if (h(r, c)) {
                  if (null == (s = r[c])) continue;
                  (Array.isArray(s) || (s = [s]),
                    s.length && (o += c + ': ' + s.join('; ') + g.LINE_BREAK));
                }
              return '--' + this.getBoundary() + g.LINE_BREAK + o + g.LINE_BREAK;
            }),
            (g.prototype._getContentDisposition = function (e, t) {
              var n;
              if (
                ('string' == typeof t.filepath
                  ? (n = a.normalize(t.filepath).replace(/\\/g, '/'))
                  : t.filename || (e && (e.name || e.path))
                    ? (n = a.basename(t.filename || (e && (e.name || e.path))))
                    : e &&
                      e.readable &&
                      h(e, 'httpVersion') &&
                      (n = a.basename(e.client._httpMessage.path || '')),
                n)
              )
                return 'filename="' + n + '"';
            }),
            (g.prototype._getContentType = function (e, t) {
              var n = t.contentType;
              return (
                !n && e && e.name && (n = d.lookup(e.name)),
                !n && e && e.path && (n = d.lookup(e.path)),
                !n && e && e.readable && h(e, 'httpVersion') && (n = e.headers['content-type']),
                n || (!t.filepath && !t.filename) || (n = d.lookup(t.filepath || t.filename)),
                !n && e && 'object' == typeof e && (n = g.DEFAULT_CONTENT_TYPE),
                n
              );
            }),
            (g.prototype._multiPartFooter = function () {
              return function (e) {
                var t = g.LINE_BREAK;
                (0 === this._streams.length && (t += this._lastBoundary()), e(t));
              }.bind(this);
            }),
            (g.prototype._lastBoundary = function () {
              return '--' + this.getBoundary() + '--' + g.LINE_BREAK;
            }),
            (g.prototype.getHeaders = function (e) {
              var t,
                n = { 'content-type': 'multipart/form-data; boundary=' + this.getBoundary() };
              for (t in e) h(e, t) && (n[t.toLowerCase()] = e[t]);
              return n;
            }),
            (g.prototype.setBoundary = function (e) {
              if ('string' != typeof e) throw new TypeError('FormData boundary must be a string');
              this._boundary = e;
            }),
            (g.prototype.getBoundary = function () {
              return (this._boundary || this._generateBoundary(), this._boundary);
            }),
            (g.prototype.getBuffer = function () {
              for (
                var e = new Buffer.alloc(0),
                  t = this.getBoundary(),
                  n = 0,
                  s = this._streams.length;
                n < s;
                n++
              )
                'function' != typeof this._streams[n] &&
                  ((e = Buffer.isBuffer(this._streams[n])
                    ? Buffer.concat([e, this._streams[n]])
                    : Buffer.concat([e, Buffer.from(this._streams[n])])),
                  ('string' == typeof this._streams[n] &&
                    this._streams[n].substring(2, t.length + 2) === t) ||
                    (e = Buffer.concat([e, Buffer.from(g.LINE_BREAK)])));
              return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
            }),
            (g.prototype._generateBoundary = function () {
              this._boundary = '--------------------------' + u.randomBytes(12).toString('hex');
            }),
            (g.prototype.getLengthSync = function () {
              var e = this._overheadLength + this._valueLength;
              return (
                this._streams.length && (e += this._lastBoundary().length),
                this.hasKnownLength() ||
                  this._error(new Error('Cannot calculate proper length in synchronous way.')),
                e
              );
            }),
            (g.prototype.hasKnownLength = function () {
              var e = !0;
              return (this._valuesToMeasure.length && (e = !1), e);
            }),
            (g.prototype.getLength = function (e) {
              var t = this._overheadLength + this._valueLength;
              (this._streams.length && (t += this._lastBoundary().length),
                this._valuesToMeasure.length
                  ? m.parallel(this._valuesToMeasure, this._lengthRetriever, function (n, s) {
                      n
                        ? e(n)
                        : (s.forEach(function (e) {
                            t += e;
                          }),
                          e(null, t));
                    })
                  : process.nextTick(e.bind(this, null, t)));
            }),
            (g.prototype.submit = function (e, t) {
              var n,
                s,
                i = { method: 'post' };
              return (
                'string' == typeof e
                  ? ((e = c(e)),
                    (s = x(
                      { port: e.port, path: e.pathname, host: e.hostname, protocol: e.protocol },
                      i
                    )))
                  : (s = x(e, i)).port || (s.port = 'https:' === s.protocol ? 443 : 80),
                (s.headers = this.getHeaders(e.headers)),
                (n = 'https:' === s.protocol ? r.request(s) : o.request(s)),
                this.getLength(
                  function (e, s) {
                    if (e && 'Unknown stream' !== e) this._error(e);
                    else if ((s && n.setHeader('Content-Length', s), this.pipe(n), t)) {
                      var i,
                        a = function (e, s) {
                          return (
                            n.removeListener('error', a),
                            n.removeListener('response', i),
                            t.call(this, e, s)
                          );
                        };
                      ((i = a.bind(this, null)), n.on('error', a), n.on('response', i));
                    }
                  }.bind(this)
                ),
                n
              );
            }),
            (g.prototype._error = function (e) {
              this.error || ((this.error = e), this.pause(), this.emit('error', e));
            }),
            (g.prototype.toString = function () {
              return '[object FormData]';
            }),
            f(g.prototype, 'FormData'),
            (e.exports = g));
        },
        1362(e) {
          'use strict';
          e.exports = function (e, t) {
            return (
              Object.keys(t).forEach(function (n) {
                e[n] = e[n] || t[n];
              }),
              e
            );
          };
        },
        9353(e) {
          'use strict';
          var t = Object.prototype.toString,
            n = Math.max,
            s = function (e, t) {
              for (var n = [], s = 0; s < e.length; s += 1) n[s] = e[s];
              for (var i = 0; i < t.length; i += 1) n[i + e.length] = t[i];
              return n;
            };
          e.exports = function (e) {
            var i = this;
            if ('function' != typeof i || '[object Function]' !== t.apply(i))
              throw new TypeError('Function.prototype.bind called on incompatible ' + i);
            for (
              var a,
                o = (function (e) {
                  for (var t = [], n = 1, s = 0; n < e.length; n += 1, s += 1) t[s] = e[n];
                  return t;
                })(arguments),
                r = n(0, i.length - o.length),
                c = [],
                p = 0;
              p < r;
              p++
            )
              c[p] = '$' + p;
            if (
              ((a = Function(
                'binder',
                'return function (' +
                  (function (e) {
                    for (var t = '', n = 0; n < e.length; n += 1)
                      ((t += e[n]), n + 1 < e.length && (t += ','));
                    return t;
                  })(c) +
                  '){ return binder.apply(this,arguments); }'
              )(function () {
                if (this instanceof a) {
                  var t = i.apply(this, s(o, arguments));
                  return Object(t) === t ? t : this;
                }
                return i.apply(e, s(o, arguments));
              })),
              i.prototype)
            ) {
              var l = function () {};
              ((l.prototype = i.prototype), (a.prototype = new l()), (l.prototype = null));
            }
            return a;
          };
        },
        6743(e, t, n) {
          'use strict';
          var s = n(9353);
          e.exports = Function.prototype.bind || s;
        },
        453(e, t, n) {
          'use strict';
          var s,
            i = n(9612),
            a = n(9383),
            o = n(1237),
            r = n(9290),
            c = n(9538),
            p = n(8068),
            l = n(9675),
            u = n(5345),
            d = n(1514),
            m = n(8968),
            f = n(6188),
            h = n(8002),
            x = n(5880),
            g = n(414),
            v = n(3093),
            b = Function,
            y = function (e) {
              try {
                return b('"use strict"; return (' + e + ').constructor;')();
              } catch (e) {}
            },
            w = n(5795),
            _ = n(655),
            R = function () {
              throw new l();
            },
            k = w
              ? (function () {
                  try {
                    return R;
                  } catch (e) {
                    try {
                      return w(arguments, 'callee').get;
                    } catch (e) {
                      return R;
                    }
                  }
                })()
              : R,
            j = n(4039)(),
            P = n(3628),
            E = n(1064),
            C = n(8648),
            S = n(1002),
            O = n(76),
            U = {},
            A = 'undefined' != typeof Uint8Array && P ? P(Uint8Array) : s,
            F = {
              __proto__: null,
              '%AggregateError%': 'undefined' == typeof AggregateError ? s : AggregateError,
              '%Array%': Array,
              '%ArrayBuffer%': 'undefined' == typeof ArrayBuffer ? s : ArrayBuffer,
              '%ArrayIteratorPrototype%': j && P ? P([][Symbol.iterator]()) : s,
              '%AsyncFromSyncIteratorPrototype%': s,
              '%AsyncFunction%': U,
              '%AsyncGenerator%': U,
              '%AsyncGeneratorFunction%': U,
              '%AsyncIteratorPrototype%': U,
              '%Atomics%': 'undefined' == typeof Atomics ? s : Atomics,
              '%BigInt%': 'undefined' == typeof BigInt ? s : BigInt,
              '%BigInt64Array%': 'undefined' == typeof BigInt64Array ? s : BigInt64Array,
              '%BigUint64Array%': 'undefined' == typeof BigUint64Array ? s : BigUint64Array,
              '%Boolean%': Boolean,
              '%DataView%': 'undefined' == typeof DataView ? s : DataView,
              '%Date%': Date,
              '%decodeURI%': decodeURI,
              '%decodeURIComponent%': decodeURIComponent,
              '%encodeURI%': encodeURI,
              '%encodeURIComponent%': encodeURIComponent,
              '%Error%': a,
              '%eval%': eval,
              '%EvalError%': o,
              '%Float16Array%': 'undefined' == typeof Float16Array ? s : Float16Array,
              '%Float32Array%': 'undefined' == typeof Float32Array ? s : Float32Array,
              '%Float64Array%': 'undefined' == typeof Float64Array ? s : Float64Array,
              '%FinalizationRegistry%':
                'undefined' == typeof FinalizationRegistry ? s : FinalizationRegistry,
              '%Function%': b,
              '%GeneratorFunction%': U,
              '%Int8Array%': 'undefined' == typeof Int8Array ? s : Int8Array,
              '%Int16Array%': 'undefined' == typeof Int16Array ? s : Int16Array,
              '%Int32Array%': 'undefined' == typeof Int32Array ? s : Int32Array,
              '%isFinite%': isFinite,
              '%isNaN%': isNaN,
              '%IteratorPrototype%': j && P ? P(P([][Symbol.iterator]())) : s,
              '%JSON%': 'object' == typeof JSON ? JSON : s,
              '%Map%': 'undefined' == typeof Map ? s : Map,
              '%MapIteratorPrototype%':
                'undefined' != typeof Map && j && P ? P(new Map()[Symbol.iterator]()) : s,
              '%Math%': Math,
              '%Number%': Number,
              '%Object%': i,
              '%Object.getOwnPropertyDescriptor%': w,
              '%parseFloat%': parseFloat,
              '%parseInt%': parseInt,
              '%Promise%': 'undefined' == typeof Promise ? s : Promise,
              '%Proxy%': 'undefined' == typeof Proxy ? s : Proxy,
              '%RangeError%': r,
              '%ReferenceError%': c,
              '%Reflect%': 'undefined' == typeof Reflect ? s : Reflect,
              '%RegExp%': RegExp,
              '%Set%': 'undefined' == typeof Set ? s : Set,
              '%SetIteratorPrototype%':
                'undefined' != typeof Set && j && P ? P(new Set()[Symbol.iterator]()) : s,
              '%SharedArrayBuffer%':
                'undefined' == typeof SharedArrayBuffer ? s : SharedArrayBuffer,
              '%String%': String,
              '%StringIteratorPrototype%': j && P ? P(''[Symbol.iterator]()) : s,
              '%Symbol%': j ? Symbol : s,
              '%SyntaxError%': p,
              '%ThrowTypeError%': k,
              '%TypedArray%': A,
              '%TypeError%': l,
              '%Uint8Array%': 'undefined' == typeof Uint8Array ? s : Uint8Array,
              '%Uint8ClampedArray%':
                'undefined' == typeof Uint8ClampedArray ? s : Uint8ClampedArray,
              '%Uint16Array%': 'undefined' == typeof Uint16Array ? s : Uint16Array,
              '%Uint32Array%': 'undefined' == typeof Uint32Array ? s : Uint32Array,
              '%URIError%': u,
              '%WeakMap%': 'undefined' == typeof WeakMap ? s : WeakMap,
              '%WeakRef%': 'undefined' == typeof WeakRef ? s : WeakRef,
              '%WeakSet%': 'undefined' == typeof WeakSet ? s : WeakSet,
              '%Function.prototype.call%': O,
              '%Function.prototype.apply%': S,
              '%Object.defineProperty%': _,
              '%Object.getPrototypeOf%': E,
              '%Math.abs%': d,
              '%Math.floor%': m,
              '%Math.max%': f,
              '%Math.min%': h,
              '%Math.pow%': x,
              '%Math.round%': g,
              '%Math.sign%': v,
              '%Reflect.getPrototypeOf%': C,
            };
          if (P)
            try {
              null.error;
            } catch (e) {
              var T = P(P(e));
              F['%Error.prototype%'] = T;
            }
          var L = function e(t) {
              var n;
              if ('%AsyncFunction%' === t) n = y('async function () {}');
              else if ('%GeneratorFunction%' === t) n = y('function* () {}');
              else if ('%AsyncGeneratorFunction%' === t) n = y('async function* () {}');
              else if ('%AsyncGenerator%' === t) {
                var s = e('%AsyncGeneratorFunction%');
                s && (n = s.prototype);
              } else if ('%AsyncIteratorPrototype%' === t) {
                var i = e('%AsyncGenerator%');
                i && P && (n = P(i.prototype));
              }
              return ((F[t] = n), n);
            },
            I = {
              __proto__: null,
              '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
              '%ArrayPrototype%': ['Array', 'prototype'],
              '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
              '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
              '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
              '%ArrayProto_values%': ['Array', 'prototype', 'values'],
              '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
              '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
              '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
              '%BooleanPrototype%': ['Boolean', 'prototype'],
              '%DataViewPrototype%': ['DataView', 'prototype'],
              '%DatePrototype%': ['Date', 'prototype'],
              '%ErrorPrototype%': ['Error', 'prototype'],
              '%EvalErrorPrototype%': ['EvalError', 'prototype'],
              '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
              '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
              '%FunctionPrototype%': ['Function', 'prototype'],
              '%Generator%': ['GeneratorFunction', 'prototype'],
              '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
              '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
              '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
              '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
              '%JSONParse%': ['JSON', 'parse'],
              '%JSONStringify%': ['JSON', 'stringify'],
              '%MapPrototype%': ['Map', 'prototype'],
              '%NumberPrototype%': ['Number', 'prototype'],
              '%ObjectPrototype%': ['Object', 'prototype'],
              '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
              '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
              '%PromisePrototype%': ['Promise', 'prototype'],
              '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
              '%Promise_all%': ['Promise', 'all'],
              '%Promise_reject%': ['Promise', 'reject'],
              '%Promise_resolve%': ['Promise', 'resolve'],
              '%RangeErrorPrototype%': ['RangeError', 'prototype'],
              '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
              '%RegExpPrototype%': ['RegExp', 'prototype'],
              '%SetPrototype%': ['Set', 'prototype'],
              '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
              '%StringPrototype%': ['String', 'prototype'],
              '%SymbolPrototype%': ['Symbol', 'prototype'],
              '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
              '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
              '%TypeErrorPrototype%': ['TypeError', 'prototype'],
              '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
              '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
              '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
              '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
              '%URIErrorPrototype%': ['URIError', 'prototype'],
              '%WeakMapPrototype%': ['WeakMap', 'prototype'],
              '%WeakSetPrototype%': ['WeakSet', 'prototype'],
            },
            B = n(6743),
            z = n(9957),
            N = B.call(O, Array.prototype.concat),
            q = B.call(S, Array.prototype.splice),
            D = B.call(O, String.prototype.replace),
            M = B.call(O, String.prototype.slice),
            G = B.call(O, RegExp.prototype.exec),
            H =
              /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
            $ = /\\(\\)?/g,
            W = function (e, t) {
              var n,
                s = e;
              if ((z(I, s) && (s = '%' + (n = I[s])[0] + '%'), z(F, s))) {
                var i = F[s];
                if ((i === U && (i = L(s)), void 0 === i && !t))
                  throw new l(
                    'intrinsic ' + e + ' exists, but is not available. Please file an issue!'
                  );
                return { alias: n, name: s, value: i };
              }
              throw new p('intrinsic ' + e + ' does not exist!');
            };
          e.exports = function (e, t) {
            if ('string' != typeof e || 0 === e.length)
              throw new l('intrinsic name must be a non-empty string');
            if (arguments.length > 1 && 'boolean' != typeof t)
              throw new l('"allowMissing" argument must be a boolean');
            if (null === G(/^%?[^%]*%?$/, e))
              throw new p(
                '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
              );
            var n = (function (e) {
                var t = M(e, 0, 1),
                  n = M(e, -1);
                if ('%' === t && '%' !== n)
                  throw new p('invalid intrinsic syntax, expected closing `%`');
                if ('%' === n && '%' !== t)
                  throw new p('invalid intrinsic syntax, expected opening `%`');
                var s = [];
                return (
                  D(e, H, function (e, t, n, i) {
                    s[s.length] = n ? D(i, $, '$1') : t || e;
                  }),
                  s
                );
              })(e),
              s = n.length > 0 ? n[0] : '',
              i = W('%' + s + '%', t),
              a = i.name,
              o = i.value,
              r = !1,
              c = i.alias;
            c && ((s = c[0]), q(n, N([0, 1], c)));
            for (var u = 1, d = !0; u < n.length; u += 1) {
              var m = n[u],
                f = M(m, 0, 1),
                h = M(m, -1);
              if (
                ('"' === f || "'" === f || '`' === f || '"' === h || "'" === h || '`' === h) &&
                f !== h
              )
                throw new p('property names with quotes must have matching quotes');
              if ((('constructor' !== m && d) || (r = !0), z(F, (a = '%' + (s += '.' + m) + '%'))))
                o = F[a];
              else if (null != o) {
                if (!(m in o)) {
                  if (!t)
                    throw new l(
                      'base intrinsic for ' + e + ' exists, but the property is not available.'
                    );
                  return;
                }
                if (w && u + 1 >= n.length) {
                  var x = w(o, m);
                  o = (d = !!x) && 'get' in x && !('originalValue' in x.get) ? x.get : o[m];
                } else ((d = z(o, m)), (o = o[m]));
                d && !r && (F[a] = o);
              }
            }
            return o;
          };
        },
        1064(e, t, n) {
          'use strict';
          var s = n(9612);
          e.exports = s.getPrototypeOf || null;
        },
        8648(e) {
          'use strict';
          e.exports = ('undefined' != typeof Reflect && Reflect.getPrototypeOf) || null;
        },
        3628(e, t, n) {
          'use strict';
          var s = n(8648),
            i = n(1064),
            a = n(7176);
          e.exports = s
            ? function (e) {
                return s(e);
              }
            : i
              ? function (e) {
                  if (!e || ('object' != typeof e && 'function' != typeof e))
                    throw new TypeError('getProto: not an object');
                  return i(e);
                }
              : a
                ? function (e) {
                    return a(e);
                  }
                : null;
        },
        6549(e) {
          'use strict';
          e.exports = Object.getOwnPropertyDescriptor;
        },
        5795(e, t, n) {
          'use strict';
          var s = n(6549);
          if (s)
            try {
              s([], 'length');
            } catch (e) {
              s = null;
            }
          e.exports = s;
        },
        5884(e) {
          'use strict';
          e.exports = (e, t = process.argv) => {
            const n = e.startsWith('-') ? '' : 1 === e.length ? '-' : '--',
              s = t.indexOf(n + e),
              i = t.indexOf('--');
            return -1 !== s && (-1 === i || s < i);
          };
        },
        4039(e, t, n) {
          'use strict';
          var s = 'undefined' != typeof Symbol && Symbol,
            i = n(1333);
          e.exports = function () {
            return (
              'function' == typeof s &&
              'function' == typeof Symbol &&
              'symbol' == typeof s('foo') &&
              'symbol' == typeof Symbol('bar') &&
              i()
            );
          };
        },
        1333(e) {
          'use strict';
          e.exports = function () {
            if ('function' != typeof Symbol || 'function' != typeof Object.getOwnPropertySymbols)
              return !1;
            if ('symbol' == typeof Symbol.iterator) return !0;
            var e = {},
              t = Symbol('test'),
              n = Object(t);
            if ('string' == typeof t) return !1;
            if ('[object Symbol]' !== Object.prototype.toString.call(t)) return !1;
            if ('[object Symbol]' !== Object.prototype.toString.call(n)) return !1;
            for (var s in ((e[t] = 42), e)) return !1;
            if ('function' == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
            if (
              'function' == typeof Object.getOwnPropertyNames &&
              0 !== Object.getOwnPropertyNames(e).length
            )
              return !1;
            var i = Object.getOwnPropertySymbols(e);
            if (1 !== i.length || i[0] !== t) return !1;
            if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
            if ('function' == typeof Object.getOwnPropertyDescriptor) {
              var a = Object.getOwnPropertyDescriptor(e, t);
              if (42 !== a.value || !0 !== a.enumerable) return !1;
            }
            return !0;
          };
        },
        9092(e, t, n) {
          'use strict';
          var s = n(1333);
          e.exports = function () {
            return s() && !!Symbol.toStringTag;
          };
        },
        9957(e, t, n) {
          'use strict';
          var s = Function.prototype.call,
            i = Object.prototype.hasOwnProperty,
            a = n(6743);
          e.exports = a.call(s, i);
        },
        1514(e) {
          'use strict';
          e.exports = Math.abs;
        },
        8968(e) {
          'use strict';
          e.exports = Math.floor;
        },
        4459(e) {
          'use strict';
          e.exports =
            Number.isNaN ||
            function (e) {
              return e != e;
            };
        },
        6188(e) {
          'use strict';
          e.exports = Math.max;
        },
        8002(e) {
          'use strict';
          e.exports = Math.min;
        },
        5880(e) {
          'use strict';
          e.exports = Math.pow;
        },
        414(e) {
          'use strict';
          e.exports = Math.round;
        },
        3093(e, t, n) {
          'use strict';
          var s = n(4459);
          e.exports = function (e) {
            return s(e) || 0 === e ? e : e < 0 ? -1 : 1;
          };
        },
        6049(e, t, n) {
          'use strict';
          var s,
            i,
            a,
            o = n(354),
            r = n(6928).extname,
            c = /^\s*([^;\s]*)(?:;|\s|$)/,
            p = /^text\//i;
          function l(e) {
            if (!e || 'string' != typeof e) return !1;
            var t = c.exec(e),
              n = t && o[t[1].toLowerCase()];
            return n && n.charset ? n.charset : !(!t || !p.test(t[1])) && 'UTF-8';
          }
          ((t.charset = l),
            (t.charsets = { lookup: l }),
            (t.contentType = function (e) {
              if (!e || 'string' != typeof e) return !1;
              var n = -1 === e.indexOf('/') ? t.lookup(e) : e;
              if (!n) return !1;
              if (-1 === n.indexOf('charset')) {
                var s = t.charset(n);
                s && (n += '; charset=' + s.toLowerCase());
              }
              return n;
            }),
            (t.extension = function (e) {
              if (!e || 'string' != typeof e) return !1;
              var n = c.exec(e),
                s = n && t.extensions[n[1].toLowerCase()];
              return !(!s || !s.length) && s[0];
            }),
            (t.extensions = Object.create(null)),
            (t.lookup = function (e) {
              if (!e || 'string' != typeof e) return !1;
              var n = r('x.' + e)
                .toLowerCase()
                .substr(1);
              return (n && t.types[n]) || !1;
            }),
            (t.types = Object.create(null)),
            (s = t.extensions),
            (i = t.types),
            (a = ['nginx', 'apache', void 0, 'iana']),
            Object.keys(o).forEach(function (e) {
              var t = o[e],
                n = t.extensions;
              if (n && n.length) {
                s[e] = n;
                for (var r = 0; r < n.length; r++) {
                  var c = n[r];
                  if (i[c]) {
                    var p = a.indexOf(o[i[c]].source),
                      l = a.indexOf(t.source);
                    if (
                      'application/octet-stream' !== i[c] &&
                      (p > l || (p === l && 'application/' === i[c].substr(0, 12)))
                    )
                      continue;
                  }
                  i[c] = e;
                }
              }
            }));
        },
        354(e, t, n) {
          e.exports = n(7265);
        },
        6585(e) {
          var t = 1e3,
            n = 60 * t,
            s = 60 * n,
            i = 24 * s,
            a = 7 * i;
          function o(e, t, n, s) {
            var i = t >= 1.5 * n;
            return Math.round(e / n) + ' ' + s + (i ? 's' : '');
          }
          e.exports = function (e, r) {
            r = r || {};
            var c,
              p,
              l = typeof e;
            if ('string' === l && e.length > 0)
              return (function (e) {
                if (!((e = String(e)).length > 100)) {
                  var o =
                    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                      e
                    );
                  if (o) {
                    var r = parseFloat(o[1]);
                    switch ((o[2] || 'ms').toLowerCase()) {
                      case 'years':
                      case 'year':
                      case 'yrs':
                      case 'yr':
                      case 'y':
                        return 315576e5 * r;
                      case 'weeks':
                      case 'week':
                      case 'w':
                        return r * a;
                      case 'days':
                      case 'day':
                      case 'd':
                        return r * i;
                      case 'hours':
                      case 'hour':
                      case 'hrs':
                      case 'hr':
                      case 'h':
                        return r * s;
                      case 'minutes':
                      case 'minute':
                      case 'mins':
                      case 'min':
                      case 'm':
                        return r * n;
                      case 'seconds':
                      case 'second':
                      case 'secs':
                      case 'sec':
                      case 's':
                        return r * t;
                      case 'milliseconds':
                      case 'millisecond':
                      case 'msecs':
                      case 'msec':
                      case 'ms':
                        return r;
                      default:
                        return;
                    }
                  }
                }
              })(e);
            if ('number' === l && isFinite(e))
              return r.long
                ? ((c = e),
                  (p = Math.abs(c)) >= i
                    ? o(c, p, i, 'day')
                    : p >= s
                      ? o(c, p, s, 'hour')
                      : p >= n
                        ? o(c, p, n, 'minute')
                        : p >= t
                          ? o(c, p, t, 'second')
                          : c + ' ms')
                : (function (e) {
                    var a = Math.abs(e);
                    return a >= i
                      ? Math.round(e / i) + 'd'
                      : a >= s
                        ? Math.round(e / s) + 'h'
                        : a >= n
                          ? Math.round(e / n) + 'm'
                          : a >= t
                            ? Math.round(e / t) + 's'
                            : e + 'ms';
                  })(e);
            throw new Error(
              'val is not a non-empty string or a valid number. val=' + JSON.stringify(e)
            );
          };
        },
        7687(e, t, n) {
          'use strict';
          const s = n(857),
            i = n(2018),
            a = n(5884),
            { env: o } = process;
          let r;
          function c(e, t = {}) {
            return (
              0 !==
                (n = (function (e, { streamIsTTY: t, sniffFlags: n = !0 } = {}) {
                  const i = (function () {
                    if ('FORCE_COLOR' in o)
                      return 'true' === o.FORCE_COLOR
                        ? 1
                        : 'false' === o.FORCE_COLOR
                          ? 0
                          : 0 === o.FORCE_COLOR.length
                            ? 1
                            : Math.min(Number.parseInt(o.FORCE_COLOR, 10), 3);
                  })();
                  void 0 !== i && (r = i);
                  const c = n ? r : i;
                  if (0 === c) return 0;
                  if (n) {
                    if (a('color=16m') || a('color=full') || a('color=truecolor')) return 3;
                    if (a('color=256')) return 2;
                  }
                  if (e && !t && void 0 === c) return 0;
                  const p = c || 0;
                  if ('dumb' === o.TERM) return p;
                  if ('win32' === process.platform) {
                    const e = s.release().split('.');
                    return Number(e[0]) >= 10 && Number(e[2]) >= 10586
                      ? Number(e[2]) >= 14931
                        ? 3
                        : 2
                      : 1;
                  }
                  if ('CI' in o)
                    return [
                      'TRAVIS',
                      'CIRCLECI',
                      'APPVEYOR',
                      'GITLAB_CI',
                      'GITHUB_ACTIONS',
                      'BUILDKITE',
                      'DRONE',
                    ].some((e) => e in o) || 'codeship' === o.CI_NAME
                      ? 1
                      : p;
                  if ('TEAMCITY_VERSION' in o)
                    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(o.TEAMCITY_VERSION) ? 1 : 0;
                  if ('truecolor' === o.COLORTERM) return 3;
                  if ('TERM_PROGRAM' in o) {
                    const e = Number.parseInt((o.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
                    switch (o.TERM_PROGRAM) {
                      case 'iTerm.app':
                        return e >= 3 ? 3 : 2;
                      case 'Apple_Terminal':
                        return 2;
                    }
                  }
                  return /-256(color)?$/i.test(o.TERM)
                    ? 2
                    : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(o.TERM) ||
                        'COLORTERM' in o
                      ? 1
                      : p;
                })(e, { streamIsTTY: e && e.isTTY, ...t })) && {
                level: n,
                hasBasic: !0,
                has256: n >= 2,
                has16m: n >= 3,
              }
            );
            var n;
          }
          (a('no-color') || a('no-colors') || a('color=false') || a('color=never')
            ? (r = 0)
            : (a('color') || a('colors') || a('color=true') || a('color=always')) && (r = 1),
            (e.exports = {
              supportsColor: c,
              stdout: c({ isTTY: i.isatty(1) }),
              stderr: c({ isTTY: i.isatty(2) }),
            }));
        },
        2613(e) {
          'use strict';
          e.exports = require('assert');
        },
        6982(e) {
          'use strict';
          e.exports = require('crypto');
        },
        9896(e) {
          'use strict';
          e.exports = require('fs');
        },
        8611(e) {
          'use strict';
          e.exports = require('http');
        },
        5692(e) {
          'use strict';
          e.exports = require('https');
        },
        857(e) {
          'use strict';
          e.exports = require('os');
        },
        6928(e) {
          'use strict';
          e.exports = require('path');
        },
        2203(e) {
          'use strict';
          e.exports = require('stream');
        },
        2018(e) {
          'use strict';
          e.exports = require('tty');
        },
        7016(e) {
          'use strict';
          e.exports = require('url');
        },
        9023(e) {
          'use strict';
          e.exports = require('util');
        },
        7265(e) {
          'use strict';
          e.exports = JSON.parse(
            '{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}'
          );
        },
      },
      t = {};
    function n(s) {
      var i = t[s];
      if (void 0 !== i) return i.exports;
      var a = (t[s] = { exports: {} });
      return (e[s](a, a.exports, n), a.exports);
    }
    ((n.d = (e, t) => {
      for (var s in t)
        n.o(t, s) && !n.o(e, s) && Object.defineProperty(e, s, { enumerable: !0, get: t[s] });
    }),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (n.r = (e) => {
        ('undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 }));
      }));
    var s = {};
    return (
      (() => {
        'use strict';
        (n.r(s),
          n.d(s, {
            AllPACSQueryList: () => Vs,
            AllPluginInstanceList: () => bs,
            AllWorkflowList: () => xs,
            ChrisInstance: () => Un,
            Collection: () => jn,
            Comment: () => ri,
            CommentList: () => ci,
            ComputeResource: () => As,
            ComputeResourceAdmin: () => Ls,
            ComputeResourceAdminList: () => Is,
            ComputeResourceList: () => Fs,
            DownloadToken: () => xi,
            DownloadTokenList: () => gi,
            Feed: () => pi,
            FeedGroupPermission: () => di,
            FeedGroupPermissionList: () => mi,
            FeedList: () => li,
            FeedPluginInstanceList: () => ys,
            FeedTagList: () => oi,
            FeedTaggingList: () => ii,
            FeedUserPermission: () => fi,
            FeedUserPermissionList: () => hi,
            FileBrowserFolder: () => qn,
            FileBrowserFolderChildList: () => Mn,
            FileBrowserFolderFile: () => Gn,
            FileBrowserFolderFileList: () => Hn,
            FileBrowserFolderLinkFile: () => $n,
            FileBrowserFolderLinkFileList: () => Wn,
            FileBrowserFolderList: () => Dn,
            FileGroupPermission: () => Yn,
            FileGroupPermissionList: () => Xn,
            FileUserPermission: () => Zn,
            FileUserPermissionList: () => es,
            FolderGroupPermission: () => Vn,
            FolderGroupPermissionList: () => Jn,
            FolderUserPermission: () => Kn,
            FolderUserPermissionList: () => Qn,
            Group: () => An,
            GroupList: () => Fn,
            GroupUser: () => Tn,
            GroupUserList: () => Ln,
            ItemResource: () => Sn,
            LinkFileGroupPermission: () => ts,
            LinkFileGroupPermissionList: () => ns,
            LinkFileUserPermission: () => ss,
            LinkFileUserPermissionList: () => is,
            ListResource: () => On,
            Note: () => Zs,
            PACS: () => Qs,
            PACSFile: () => Gs,
            PACSFileList: () => Hs,
            PACSList: () => Ys,
            PACSQuery: () => $s,
            PACSQueryList: () => Ws,
            PACSRetrieve: () => Js,
            PACSRetrieveList: () => Ks,
            PACSSeries: () => Ds,
            PACSSeriesList: () => Ms,
            Pipeline: () => as,
            PipelineList: () => os,
            PipelinePipingDefaultParameterList: () => us,
            PipelinePluginList: () => ps,
            PipelinePluginPipingList: () => ls,
            PipelineSourceFile: () => ds,
            PipelineSourceFileList: () => ms,
            PipingDefaultParameter: () => cs,
            Plugin: () => Ss,
            PluginAdmin: () => Bs,
            PluginAdminList: () => zs,
            PluginComputeResourceList: () => Ts,
            PluginInstance: () => gs,
            PluginInstanceDescendantList: () => _s,
            PluginInstanceList: () => vs,
            PluginInstanceParameter: () => js,
            PluginInstanceParameterList: () => Ps,
            PluginInstanceSplit: () => Rs,
            PluginInstanceSplitList: () => ks,
            PluginList: () => Os,
            PluginMeta: () => Es,
            PluginMetaList: () => Cs,
            PluginMetaPluginList: () => Us,
            PluginParameter: () => zn,
            PluginParameterList: () => Nn,
            PluginPiping: () => rs,
            PublicFeedList: () => ui,
            Request: () => En,
            RequestException: () => Pn,
            Resource: () => Cn,
            Tag: () => ei,
            TagFeedList: () => ai,
            TagList: () => ti,
            TagTaggingList: () => si,
            Tagging: () => ni,
            User: () => Bn,
            UserFile: () => Ns,
            UserFileList: () => qs,
            UserGroupList: () => In,
            Workflow: () => fs,
            WorkflowList: () => hs,
            WorkflowPluginInstanceList: () => ws,
            default: () => vi,
          }));
        var e = {};
        function t(e, t) {
          return function () {
            return e.apply(t, arguments);
          };
        }
        (n.r(e),
          n.d(e, {
            hasBrowserEnv: () => Ee,
            hasStandardBrowserEnv: () => Se,
            hasStandardBrowserWebWorkerEnv: () => Oe,
            navigator: () => Ce,
            origin: () => Ue,
          }));
        const { toString: i } = Object.prototype,
          { getPrototypeOf: a } = Object,
          { iterator: o, toStringTag: r } = Symbol,
          c =
            ((p = Object.create(null)),
            (e) => {
              const t = i.call(e);
              return p[t] || (p[t] = t.slice(8, -1).toLowerCase());
            });
        var p;
        const l = (e) => ((e = e.toLowerCase()), (t) => c(t) === e),
          u = (e) => (t) => typeof t === e,
          { isArray: d } = Array,
          m = u('undefined');
        function f(e) {
          return (
            null !== e &&
            !m(e) &&
            null !== e.constructor &&
            !m(e.constructor) &&
            g(e.constructor.isBuffer) &&
            e.constructor.isBuffer(e)
          );
        }
        const h = l('ArrayBuffer'),
          x = u('string'),
          g = u('function'),
          v = u('number'),
          b = (e) => null !== e && 'object' == typeof e,
          y = (e) => {
            if ('object' !== c(e)) return !1;
            const t = a(e);
            return !(
              (null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t)) ||
              r in e ||
              o in e
            );
          },
          w = l('Date'),
          _ = l('File'),
          R = l('Blob'),
          k = l('FileList'),
          j =
            'undefined' != typeof globalThis
              ? globalThis
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : 'undefined' != typeof global
                    ? global
                    : {},
          P = void 0 !== j.FormData ? j.FormData : void 0,
          E = l('URLSearchParams'),
          [C, S, O, U] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(l);
        function A(e, t, { allOwnKeys: n = !1 } = {}) {
          if (null == e) return;
          let s, i;
          if (('object' != typeof e && (e = [e]), d(e)))
            for (s = 0, i = e.length; s < i; s++) t.call(null, e[s], s, e);
          else {
            if (f(e)) return;
            const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
              a = i.length;
            let o;
            for (s = 0; s < a; s++) ((o = i[s]), t.call(null, e[o], o, e));
          }
        }
        function F(e, t) {
          if (f(e)) return null;
          t = t.toLowerCase();
          const n = Object.keys(e);
          let s,
            i = n.length;
          for (; i-- > 0; ) if (((s = n[i]), t === s.toLowerCase())) return s;
          return null;
        }
        const T =
            'undefined' != typeof globalThis
              ? globalThis
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : global,
          L = (e) => !m(e) && e !== T,
          I = ((B = 'undefined' != typeof Uint8Array && a(Uint8Array)), (e) => B && e instanceof B);
        var B;
        const z = l('HTMLFormElement'),
          N = (
            ({ hasOwnProperty: e }) =>
            (t, n) =>
              e.call(t, n)
          )(Object.prototype),
          q = l('RegExp'),
          D = (e, t) => {
            const n = Object.getOwnPropertyDescriptors(e),
              s = {};
            (A(n, (n, i) => {
              let a;
              !1 !== (a = t(n, i, e)) && (s[i] = a || n);
            }),
              Object.defineProperties(e, s));
          },
          M = l('AsyncFunction'),
          G =
            ((H = 'function' == typeof setImmediate),
            ($ = g(T.postMessage)),
            H
              ? setImmediate
              : $
                ? ((W = `axios@${Math.random()}`),
                  (V = []),
                  T.addEventListener(
                    'message',
                    ({ source: e, data: t }) => {
                      e === T && t === W && V.length && V.shift()();
                    },
                    !1
                  ),
                  (e) => {
                    (V.push(e), T.postMessage(W, '*'));
                  })
                : (e) => setTimeout(e));
        var H, $, W, V;
        const J =
            'undefined' != typeof queueMicrotask
              ? queueMicrotask.bind(T)
              : ('undefined' != typeof process && process.nextTick) || G,
          K = {
            isArray: d,
            isArrayBuffer: h,
            isBuffer: f,
            isFormData: (e) => {
              if (!e) return !1;
              if (P && e instanceof P) return !0;
              const t = a(e);
              if (!t || t === Object.prototype) return !1;
              if (!g(e.append)) return !1;
              const n = c(e);
              return (
                'formdata' === n ||
                ('object' === n && g(e.toString) && '[object FormData]' === e.toString())
              );
            },
            isArrayBufferView: function (e) {
              let t;
              return (
                (t =
                  'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                    ? ArrayBuffer.isView(e)
                    : e && e.buffer && h(e.buffer)),
                t
              );
            },
            isString: x,
            isNumber: v,
            isBoolean: (e) => !0 === e || !1 === e,
            isObject: b,
            isPlainObject: y,
            isEmptyObject: (e) => {
              if (!b(e) || f(e)) return !1;
              try {
                return 0 === Object.keys(e).length && Object.getPrototypeOf(e) === Object.prototype;
              } catch (e) {
                return !1;
              }
            },
            isReadableStream: C,
            isRequest: S,
            isResponse: O,
            isHeaders: U,
            isUndefined: m,
            isDate: w,
            isFile: _,
            isReactNativeBlob: (e) => !(!e || void 0 === e.uri),
            isReactNative: (e) => e && void 0 !== e.getParts,
            isBlob: R,
            isRegExp: q,
            isFunction: g,
            isStream: (e) => b(e) && g(e.pipe),
            isURLSearchParams: E,
            isTypedArray: I,
            isFileList: k,
            forEach: A,
            merge: function e(...t) {
              const { caseless: n, skipUndefined: s } = (L(this) && this) || {},
                i = {},
                a = (t, a) => {
                  if ('__proto__' === a || 'constructor' === a || 'prototype' === a) return;
                  const o = (n && F(i, a)) || a,
                    r = N(i, o) ? i[o] : void 0;
                  y(r) && y(t)
                    ? (i[o] = e(r, t))
                    : y(t)
                      ? (i[o] = e({}, t))
                      : d(t)
                        ? (i[o] = t.slice())
                        : (s && m(t)) || (i[o] = t);
                };
              for (let e = 0, n = t.length; e < n; e++) t[e] && A(t[e], a);
              return i;
            },
            extend: (e, n, s, { allOwnKeys: i } = {}) => (
              A(
                n,
                (n, i) => {
                  s && g(n)
                    ? Object.defineProperty(e, i, {
                        __proto__: null,
                        value: t(n, s),
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                      })
                    : Object.defineProperty(e, i, {
                        __proto__: null,
                        value: n,
                        writable: !0,
                        enumerable: !0,
                        configurable: !0,
                      });
                },
                { allOwnKeys: i }
              ),
              e
            ),
            trim: (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')),
            stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
            inherits: (e, t, n, s) => {
              ((e.prototype = Object.create(t.prototype, s)),
                Object.defineProperty(e.prototype, 'constructor', {
                  __proto__: null,
                  value: e,
                  writable: !0,
                  enumerable: !1,
                  configurable: !0,
                }),
                Object.defineProperty(e, 'super', { __proto__: null, value: t.prototype }),
                n && Object.assign(e.prototype, n));
            },
            toFlatObject: (e, t, n, s) => {
              let i, o, r;
              const c = {};
              if (((t = t || {}), null == e)) return t;
              do {
                for (i = Object.getOwnPropertyNames(e), o = i.length; o-- > 0; )
                  ((r = i[o]), (s && !s(r, e, t)) || c[r] || ((t[r] = e[r]), (c[r] = !0)));
                e = !1 !== n && a(e);
              } while (e && (!n || n(e, t)) && e !== Object.prototype);
              return t;
            },
            kindOf: c,
            kindOfTest: l,
            endsWith: (e, t, n) => {
              ((e = String(e)), (void 0 === n || n > e.length) && (n = e.length), (n -= t.length));
              const s = e.indexOf(t, n);
              return -1 !== s && s === n;
            },
            toArray: (e) => {
              if (!e) return null;
              if (d(e)) return e;
              let t = e.length;
              if (!v(t)) return null;
              const n = new Array(t);
              for (; t-- > 0; ) n[t] = e[t];
              return n;
            },
            forEachEntry: (e, t) => {
              const n = (e && e[o]).call(e);
              let s;
              for (; (s = n.next()) && !s.done; ) {
                const n = s.value;
                t.call(e, n[0], n[1]);
              }
            },
            matchAll: (e, t) => {
              let n;
              const s = [];
              for (; null !== (n = e.exec(t)); ) s.push(n);
              return s;
            },
            isHTMLForm: z,
            hasOwnProperty: N,
            hasOwnProp: N,
            reduceDescriptors: D,
            freezeMethods: (e) => {
              D(e, (t, n) => {
                if (g(e) && ['arguments', 'caller', 'callee'].includes(n)) return !1;
                const s = e[n];
                g(s) &&
                  ((t.enumerable = !1),
                  'writable' in t
                    ? (t.writable = !1)
                    : t.set ||
                      (t.set = () => {
                        throw Error("Can not rewrite read-only method '" + n + "'");
                      }));
              });
            },
            toObjectSet: (e, t) => {
              const n = {},
                s = (e) => {
                  e.forEach((e) => {
                    n[e] = !0;
                  });
                };
              return (d(e) ? s(e) : s(String(e).split(t)), n);
            },
            toCamelCase: (e) =>
              e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, n) {
                return t.toUpperCase() + n;
              }),
            noop: () => {},
            toFiniteNumber: (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
            findKey: F,
            global: T,
            isContextDefined: L,
            isSpecCompliantForm: function (e) {
              return !!(e && g(e.append) && 'FormData' === e[r] && e[o]);
            },
            toJSONObject: (e) => {
              const t = new Array(10),
                n = (e, s) => {
                  if (b(e)) {
                    if (t.indexOf(e) >= 0) return;
                    if (f(e)) return e;
                    if (!('toJSON' in e)) {
                      t[s] = e;
                      const i = d(e) ? [] : {};
                      return (
                        A(e, (e, t) => {
                          const a = n(e, s + 1);
                          !m(a) && (i[t] = a);
                        }),
                        (t[s] = void 0),
                        i
                      );
                    }
                  }
                  return e;
                };
              return n(e, 0);
            },
            isAsyncFn: M,
            isThenable: (e) => e && (b(e) || g(e)) && g(e.then) && g(e.catch),
            setImmediate: G,
            asap: J,
            isIterable: (e) => null != e && g(e[o]),
          },
          Q = K.toObjectSet([
            'age',
            'authorization',
            'content-length',
            'content-type',
            'etag',
            'expires',
            'from',
            'host',
            'if-modified-since',
            'if-unmodified-since',
            'last-modified',
            'location',
            'max-forwards',
            'proxy-authorization',
            'referer',
            'retry-after',
            'user-agent',
          ]),
          Y = (e) => {
            const t = {};
            let n, s, i;
            return (
              e &&
                e.split('\n').forEach(function (e) {
                  ((i = e.indexOf(':')),
                    (n = e.substring(0, i).trim().toLowerCase()),
                    (s = e.substring(i + 1).trim()),
                    !n ||
                      (t[n] && Q[n]) ||
                      ('set-cookie' === n
                        ? t[n]
                          ? t[n].push(s)
                          : (t[n] = [s])
                        : (t[n] = t[n] ? t[n] + ', ' + s : s)));
                }),
              t
            );
          };
        (Object.getOwnPropertyDescriptor(Y, 'name') || {}).writable ||
          Object.defineProperty(Y, 'name', { value: 'default', configurable: !0 });
        const X = Symbol('internals'),
          Z = /[^\x09\x20-\x7E\x80-\xFF]/g;
        function ee(e) {
          return e && String(e).trim().toLowerCase();
        }
        function te(e) {
          return !1 === e || null == e
            ? e
            : K.isArray(e)
              ? e.map(te)
              : (function (e) {
                  let t = 0,
                    n = e.length;
                  for (; t < n; ) {
                    const n = e.charCodeAt(t);
                    if (9 !== n && 32 !== n) break;
                    t += 1;
                  }
                  for (; n > t; ) {
                    const t = e.charCodeAt(n - 1);
                    if (9 !== t && 32 !== t) break;
                    n -= 1;
                  }
                  return 0 === t && n === e.length ? e : e.slice(t, n);
                })(String(e).replace(Z, ''));
        }
        function ne(e, t, n, s, i) {
          return K.isFunction(s)
            ? s.call(this, t, n)
            : (i && (t = n),
              K.isString(t)
                ? K.isString(s)
                  ? -1 !== t.indexOf(s)
                  : K.isRegExp(s)
                    ? s.test(t)
                    : void 0
                : void 0);
        }
        class se {
          constructor(e) {
            e && this.set(e);
          }
          set(e, t, n) {
            const s = this;
            function i(e, t, n) {
              const i = ee(t);
              if (!i) throw new Error('header name must be a non-empty string');
              const a = K.findKey(s, i);
              (!a || void 0 === s[a] || !0 === n || (void 0 === n && !1 !== s[a])) &&
                (s[a || t] = te(e));
            }
            const a = (e, t) => K.forEach(e, (e, n) => i(e, n, t));
            if (K.isPlainObject(e) || e instanceof this.constructor) a(e, t);
            else if (
              K.isString(e) &&
              (e = e.trim()) &&
              !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
            )
              a(Y(e), t);
            else if (K.isObject(e) && K.isIterable(e)) {
              let n,
                s,
                i = {};
              for (const t of e) {
                if (!K.isArray(t)) throw TypeError('Object iterator must return a key-value pair');
                i[(s = t[0])] = (n = i[s]) ? (K.isArray(n) ? [...n, t[1]] : [n, t[1]]) : t[1];
              }
              a(i, t);
            } else null != e && i(t, e, n);
            return this;
          }
          get(e, t) {
            if ((e = ee(e))) {
              const n = K.findKey(this, e);
              if (n) {
                const e = this[n];
                if (!t) return e;
                if (!0 === t)
                  return (function (e) {
                    const t = Object.create(null),
                      n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                    let s;
                    for (; (s = n.exec(e)); ) t[s[1]] = s[2];
                    return t;
                  })(e);
                if (K.isFunction(t)) return t.call(this, e, n);
                if (K.isRegExp(t)) return t.exec(e);
                throw new TypeError('parser must be boolean|regexp|function');
              }
            }
          }
          has(e, t) {
            if ((e = ee(e))) {
              const n = K.findKey(this, e);
              return !(!n || void 0 === this[n] || (t && !ne(0, this[n], n, t)));
            }
            return !1;
          }
          delete(e, t) {
            const n = this;
            let s = !1;
            function i(e) {
              if ((e = ee(e))) {
                const i = K.findKey(n, e);
                !i || (t && !ne(0, n[i], i, t)) || (delete n[i], (s = !0));
              }
            }
            return (K.isArray(e) ? e.forEach(i) : i(e), s);
          }
          clear(e) {
            const t = Object.keys(this);
            let n = t.length,
              s = !1;
            for (; n--; ) {
              const i = t[n];
              (e && !ne(0, this[i], i, e, !0)) || (delete this[i], (s = !0));
            }
            return s;
          }
          normalize(e) {
            const t = this,
              n = {};
            return (
              K.forEach(this, (s, i) => {
                const a = K.findKey(n, i);
                if (a) return ((t[a] = te(s)), void delete t[i]);
                const o = e
                  ? (function (e) {
                      return e
                        .trim()
                        .toLowerCase()
                        .replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
                    })(i)
                  : String(i).trim();
                (o !== i && delete t[i], (t[o] = te(s)), (n[o] = !0));
              }),
              this
            );
          }
          concat(...e) {
            return this.constructor.concat(this, ...e);
          }
          toJSON(e) {
            const t = Object.create(null);
            return (
              K.forEach(this, (n, s) => {
                null != n && !1 !== n && (t[s] = e && K.isArray(n) ? n.join(', ') : n);
              }),
              t
            );
          }
          [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]();
          }
          toString() {
            return Object.entries(this.toJSON())
              .map(([e, t]) => e + ': ' + t)
              .join('\n');
          }
          getSetCookie() {
            return this.get('set-cookie') || [];
          }
          get [Symbol.toStringTag]() {
            return 'AxiosHeaders';
          }
          static from(e) {
            return e instanceof this ? e : new this(e);
          }
          static concat(e, ...t) {
            const n = new this(e);
            return (t.forEach((e) => n.set(e)), n);
          }
          static accessor(e) {
            const t = (this[X] = this[X] = { accessors: {} }).accessors,
              n = this.prototype;
            function s(e) {
              const s = ee(e);
              t[s] ||
                ((function (e, t) {
                  const n = K.toCamelCase(' ' + t);
                  ['get', 'set', 'has'].forEach((s) => {
                    Object.defineProperty(e, s + n, {
                      __proto__: null,
                      value: function (e, n, i) {
                        return this[s].call(this, t, e, n, i);
                      },
                      configurable: !0,
                    });
                  });
                })(n, e),
                (t[s] = !0));
            }
            return (K.isArray(e) ? e.forEach(s) : s(e), this);
          }
        }
        (se.accessor([
          'Content-Type',
          'Content-Length',
          'Accept',
          'Accept-Encoding',
          'User-Agent',
          'Authorization',
        ]),
          K.reduceDescriptors(se.prototype, ({ value: e }, t) => {
            let n = t[0].toUpperCase() + t.slice(1);
            return {
              get: () => e,
              set(e) {
                this[n] = e;
              },
            };
          }),
          K.freezeMethods(se));
        const ie = se;
        class ae extends Error {
          static from(e, t, n, s, i, a) {
            const o = new ae(e.message, t || e.code, n, s, i);
            return (
              (o.cause = e),
              (o.name = e.name),
              null != e.status && null == o.status && (o.status = e.status),
              a && Object.assign(o, a),
              o
            );
          }
          constructor(e, t, n, s, i) {
            (super(e),
              Object.defineProperty(this, 'message', {
                __proto__: null,
                value: e,
                enumerable: !0,
                writable: !0,
                configurable: !0,
              }),
              (this.name = 'AxiosError'),
              (this.isAxiosError = !0),
              t && (this.code = t),
              n && (this.config = n),
              s && (this.request = s),
              i && ((this.response = i), (this.status = i.status)));
          }
          toJSON() {
            const e = this.config,
              t = e && K.hasOwnProp(e, 'redact') ? e.redact : void 0,
              n =
                K.isArray(t) && t.length > 0
                  ? (function (e, t) {
                      const n = new Set(t.map((e) => String(e).toLowerCase())),
                        s = [],
                        i = (e) => {
                          if (null === e || 'object' != typeof e) return e;
                          if (K.isBuffer(e)) return e;
                          if (-1 !== s.indexOf(e)) return;
                          let t;
                          if ((e instanceof ie && (e = e.toJSON()), s.push(e), K.isArray(e)))
                            ((t = []),
                              e.forEach((e, n) => {
                                const s = i(e);
                                K.isUndefined(s) || (t[n] = s);
                              }));
                          else {
                            if (
                              !K.isPlainObject(e) &&
                              (function (e) {
                                if (K.hasOwnProp(e, 'toJSON')) return !0;
                                let t = Object.getPrototypeOf(e);
                                for (; t && t !== Object.prototype; ) {
                                  if (K.hasOwnProp(t, 'toJSON')) return !0;
                                  t = Object.getPrototypeOf(t);
                                }
                                return !1;
                              })(e)
                            )
                              return (s.pop(), e);
                            t = Object.create(null);
                            for (const [s, a] of Object.entries(e)) {
                              const e = n.has(s.toLowerCase()) ? '[REDACTED ****]' : i(a);
                              K.isUndefined(e) || (t[s] = e);
                            }
                          }
                          return (s.pop(), t);
                        };
                      return i(e);
                    })(e, t)
                  : K.toJSONObject(e);
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: n,
              code: this.code,
              status: this.status,
            };
          }
        }
        ((ae.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE'),
          (ae.ERR_BAD_OPTION = 'ERR_BAD_OPTION'),
          (ae.ECONNABORTED = 'ECONNABORTED'),
          (ae.ETIMEDOUT = 'ETIMEDOUT'),
          (ae.ECONNREFUSED = 'ECONNREFUSED'),
          (ae.ERR_NETWORK = 'ERR_NETWORK'),
          (ae.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS'),
          (ae.ERR_DEPRECATED = 'ERR_DEPRECATED'),
          (ae.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE'),
          (ae.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST'),
          (ae.ERR_CANCELED = 'ERR_CANCELED'),
          (ae.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT'),
          (ae.ERR_INVALID_URL = 'ERR_INVALID_URL'),
          (ae.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED'));
        const oe = ae,
          re = n(737);
        function ce(e) {
          return K.isPlainObject(e) || K.isArray(e);
        }
        function pe(e) {
          return K.endsWith(e, '[]') ? e.slice(0, -2) : e;
        }
        function le(e, t, n) {
          return e
            ? e
                .concat(t)
                .map(function (e, t) {
                  return ((e = pe(e)), !n && t ? '[' + e + ']' : e);
                })
                .join(n ? '.' : '')
            : t;
        }
        const ue = K.toFlatObject(K, {}, null, function (e) {
            return /^is[A-Z]/.test(e);
          }),
          de = function (e, t, n) {
            if (!K.isObject(e)) throw new TypeError('target must be an object');
            t = t || new (re || FormData)();
            const s = (n = K.toFlatObject(
                n,
                { metaTokens: !0, dots: !1, indexes: !1 },
                !1,
                function (e, t) {
                  return !K.isUndefined(t[e]);
                }
              )).metaTokens,
              i = n.visitor || u,
              a = n.dots,
              o = n.indexes,
              r = n.Blob || ('undefined' != typeof Blob && Blob),
              c = void 0 === n.maxDepth ? 100 : n.maxDepth,
              p = r && K.isSpecCompliantForm(t);
            if (!K.isFunction(i)) throw new TypeError('visitor must be a function');
            function l(e) {
              if (null === e) return '';
              if (K.isDate(e)) return e.toISOString();
              if (K.isBoolean(e)) return e.toString();
              if (!p && K.isBlob(e)) throw new oe('Blob is not supported. Use a Buffer instead.');
              return K.isArrayBuffer(e) || K.isTypedArray(e)
                ? p && 'function' == typeof Blob
                  ? new Blob([e])
                  : Buffer.from(e)
                : e;
            }
            function u(e, n, i) {
              let r = e;
              if (K.isReactNative(t) && K.isReactNativeBlob(e))
                return (t.append(le(i, n, a), l(e)), !1);
              if (e && !i && 'object' == typeof e)
                if (K.endsWith(n, '{}')) ((n = s ? n : n.slice(0, -2)), (e = JSON.stringify(e)));
                else if (
                  (K.isArray(e) &&
                    (function (e) {
                      return K.isArray(e) && !e.some(ce);
                    })(e)) ||
                  ((K.isFileList(e) || K.endsWith(n, '[]')) && (r = K.toArray(e)))
                )
                  return (
                    (n = pe(n)),
                    r.forEach(function (e, s) {
                      !K.isUndefined(e) &&
                        null !== e &&
                        t.append(!0 === o ? le([n], s, a) : null === o ? n : n + '[]', l(e));
                    }),
                    !1
                  );
              return !!ce(e) || (t.append(le(i, n, a), l(e)), !1);
            }
            const d = [],
              m = Object.assign(ue, { defaultVisitor: u, convertValue: l, isVisitable: ce });
            if (!K.isObject(e)) throw new TypeError('data must be an object');
            return (
              (function e(n, s, a = 0) {
                if (!K.isUndefined(n)) {
                  if (a > c)
                    throw new oe(
                      'Object is too deeply nested (' + a + ' levels). Max depth: ' + c,
                      oe.ERR_FORM_DATA_DEPTH_EXCEEDED
                    );
                  if (-1 !== d.indexOf(n))
                    throw Error('Circular reference detected in ' + s.join('.'));
                  (d.push(n),
                    K.forEach(n, function (n, o) {
                      !0 ===
                        (!(K.isUndefined(n) || null === n) &&
                          i.call(t, n, K.isString(o) ? o.trim() : o, s, m)) &&
                        e(n, s ? s.concat(o) : [o], a + 1);
                    }),
                    d.pop());
                }
              })(e),
              t
            );
          };
        function me(e) {
          const t = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+' };
          return encodeURIComponent(e).replace(/[!'()~]|%20/g, function (e) {
            return t[e];
          });
        }
        function fe(e, t) {
          ((this._pairs = []), e && de(e, this, t));
        }
        const he = fe.prototype;
        ((he.append = function (e, t) {
          this._pairs.push([e, t]);
        }),
          (he.toString = function (e) {
            const t = e
              ? function (t) {
                  return e.call(this, t, me);
                }
              : me;
            return this._pairs
              .map(function (e) {
                return t(e[0]) + '=' + t(e[1]);
              }, '')
              .join('&');
          }));
        const xe = fe;
        function ge(e) {
          return encodeURIComponent(e)
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, '+');
        }
        function ve(e, t, n) {
          if (!t) return e;
          const s = (n && n.encode) || ge,
            i = K.isFunction(n) ? { serialize: n } : n,
            a = i && i.serialize;
          let o;
          if (
            ((o = a ? a(t, i) : K.isURLSearchParams(t) ? t.toString() : new xe(t, i).toString(s)),
            o)
          ) {
            const t = e.indexOf('#');
            (-1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf('?') ? '?' : '&') + o));
          }
          return e;
        }
        const be = class {
            constructor() {
              this.handlers = [];
            }
            use(e, t, n) {
              return (
                this.handlers.push({
                  fulfilled: e,
                  rejected: t,
                  synchronous: !!n && n.synchronous,
                  runWhen: n ? n.runWhen : null,
                }),
                this.handlers.length - 1
              );
            }
            eject(e) {
              this.handlers[e] && (this.handlers[e] = null);
            }
            clear() {
              this.handlers && (this.handlers = []);
            }
            forEach(e) {
              K.forEach(this.handlers, function (t) {
                null !== t && e(t);
              });
            }
          },
          ye = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1,
            legacyInterceptorReqResOrdering: !0,
          };
        var we = n(6982);
        const _e = n(7016).URLSearchParams,
          Re = 'abcdefghijklmnopqrstuvwxyz',
          ke = '0123456789',
          je = { DIGIT: ke, ALPHA: Re, ALPHA_DIGIT: Re + Re.toUpperCase() + ke },
          Pe = {
            isNode: !0,
            classes: {
              URLSearchParams: _e,
              FormData: re,
              Blob: ('undefined' != typeof Blob && Blob) || null,
            },
            ALPHABET: je,
            generateString: (e = 16, t = je.ALPHA_DIGIT) => {
              let n = '';
              const { length: s } = t,
                i = new Uint32Array(e);
              we.randomFillSync(i);
              for (let a = 0; a < e; a++) n += t[i[a] % s];
              return n;
            },
            protocols: ['http', 'https', 'file', 'data'],
          },
          Ee = 'undefined' != typeof window && 'undefined' != typeof document,
          Ce = ('object' == typeof navigator && navigator) || void 0,
          Se = Ee && (!Ce || ['ReactNative', 'NativeScript', 'NS'].indexOf(Ce.product) < 0),
          Oe =
            'undefined' != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            'function' == typeof self.importScripts,
          Ue = (Ee && window.location.href) || 'http://localhost',
          Ae = { ...e, ...Pe },
          Fe = function (e) {
            function t(e, n, s, i) {
              let a = e[i++];
              if ('__proto__' === a) return !0;
              const o = Number.isFinite(+a),
                r = i >= e.length;
              return (
                (a = !a && K.isArray(s) ? s.length : a),
                r
                  ? (K.hasOwnProp(s, a)
                      ? (s[a] = K.isArray(s[a]) ? s[a].concat(n) : [s[a], n])
                      : (s[a] = n),
                    !o)
                  : ((s[a] && K.isObject(s[a])) || (s[a] = []),
                    t(e, n, s[a], i) &&
                      K.isArray(s[a]) &&
                      (s[a] = (function (e) {
                        const t = {},
                          n = Object.keys(e);
                        let s;
                        const i = n.length;
                        let a;
                        for (s = 0; s < i; s++) ((a = n[s]), (t[a] = e[a]));
                        return t;
                      })(s[a])),
                    !o)
              );
            }
            if (K.isFormData(e) && K.isFunction(e.entries)) {
              const n = {};
              return (
                K.forEachEntry(e, (e, s) => {
                  t(
                    (function (e) {
                      return K.matchAll(/\w+|\[(\w*)]/g, e).map((e) =>
                        '[]' === e[0] ? '' : e[1] || e[0]
                      );
                    })(e),
                    s,
                    n,
                    0
                  );
                }),
                n
              );
            }
            return null;
          },
          Te = (e, t) => (null != e && K.hasOwnProp(e, t) ? e[t] : void 0),
          Le = {
            transitional: ye,
            adapter: ['xhr', 'http', 'fetch'],
            transformRequest: [
              function (e, t) {
                const n = t.getContentType() || '',
                  s = n.indexOf('application/json') > -1,
                  i = K.isObject(e);
                if ((i && K.isHTMLForm(e) && (e = new FormData(e)), K.isFormData(e)))
                  return s ? JSON.stringify(Fe(e)) : e;
                if (
                  K.isArrayBuffer(e) ||
                  K.isBuffer(e) ||
                  K.isStream(e) ||
                  K.isFile(e) ||
                  K.isBlob(e) ||
                  K.isReadableStream(e)
                )
                  return e;
                if (K.isArrayBufferView(e)) return e.buffer;
                if (K.isURLSearchParams(e))
                  return (
                    t.setContentType('application/x-www-form-urlencoded;charset=utf-8', !1),
                    e.toString()
                  );
                let a;
                if (i) {
                  const t = Te(this, 'formSerializer');
                  if (n.indexOf('application/x-www-form-urlencoded') > -1)
                    return (function (e, t) {
                      return de(e, new Ae.classes.URLSearchParams(), {
                        visitor: function (e, t, n, s) {
                          return Ae.isNode && K.isBuffer(e)
                            ? (this.append(t, e.toString('base64')), !1)
                            : s.defaultVisitor.apply(this, arguments);
                        },
                        ...t,
                      });
                    })(e, t).toString();
                  if ((a = K.isFileList(e)) || n.indexOf('multipart/form-data') > -1) {
                    const n = Te(this, 'env'),
                      s = n && n.FormData;
                    return de(a ? { 'files[]': e } : e, s && new s(), t);
                  }
                }
                return i || s
                  ? (t.setContentType('application/json', !1),
                    (function (e) {
                      if (K.isString(e))
                        try {
                          return ((0, JSON.parse)(e), K.trim(e));
                        } catch (e) {
                          if ('SyntaxError' !== e.name) throw e;
                        }
                      return (0, JSON.stringify)(e);
                    })(e))
                  : e;
              },
            ],
            transformResponse: [
              function (e) {
                const t = Te(this, 'transitional') || Le.transitional,
                  n = t && t.forcedJSONParsing,
                  s = Te(this, 'responseType'),
                  i = 'json' === s;
                if (K.isResponse(e) || K.isReadableStream(e)) return e;
                if (e && K.isString(e) && ((n && !s) || i)) {
                  const n = !(t && t.silentJSONParsing) && i;
                  try {
                    return JSON.parse(e, Te(this, 'parseReviver'));
                  } catch (e) {
                    if (n) {
                      if ('SyntaxError' === e.name)
                        throw oe.from(e, oe.ERR_BAD_RESPONSE, this, null, Te(this, 'response'));
                      throw e;
                    }
                  }
                }
                return e;
              },
            ],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            env: { FormData: Ae.classes.FormData, Blob: Ae.classes.Blob },
            validateStatus: function (e) {
              return e >= 200 && e < 300;
            },
            headers: {
              common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 },
            },
          };
        K.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query'], (e) => {
          Le.headers[e] = {};
        });
        const Ie = Le;
        function Be(e, t) {
          const n = this || Ie,
            s = t || n,
            i = ie.from(s.headers);
          let a = s.data;
          return (
            K.forEach(e, function (e) {
              a = e.call(n, a, i.normalize(), t ? t.status : void 0);
            }),
            i.normalize(),
            a
          );
        }
        function ze(e) {
          return !(!e || !e.__CANCEL__);
        }
        const Ne = class extends oe {
          constructor(e, t, n) {
            (super(null == e ? 'canceled' : e, oe.ERR_CANCELED, t, n),
              (this.name = 'CanceledError'),
              (this.__CANCEL__ = !0));
          }
        };
        function qe(e, t, n) {
          const s = n.config.validateStatus;
          n.status && s && !s(n.status)
            ? t(
                new oe(
                  'Request failed with status code ' + n.status,
                  n.status >= 400 && n.status < 500 ? oe.ERR_BAD_REQUEST : oe.ERR_BAD_RESPONSE,
                  n.config,
                  n.request,
                  n
                )
              )
            : e(n);
        }
        function De(e, t, n) {
          let s = !('string' == typeof (i = t) && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(i));
          var i;
          return e && (s || !1 === n)
            ? (function (e, t) {
                return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
              })(e, t)
            : t;
        }
        var Me = { ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443 };
        function Ge(e) {
          return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || '';
        }
        var He = n(8611),
          $e = n(5692);
        const We = require('http2');
        var Ve = n(9023),
          Je = n(6928),
          Ke = n(3164);
        const Qe = require('zlib'),
          Ye = '1.16.0';
        function Xe(e) {
          const t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
          return (t && t[1]) || '';
        }
        const Ze = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
        var et = n(2203);
        const tt = Symbol('internals');
        class nt extends et.Transform {
          constructor(e) {
            super({
              readableHighWaterMark: (e = K.toFlatObject(
                e,
                {
                  maxRate: 0,
                  chunkSize: 65536,
                  minChunkSize: 100,
                  timeWindow: 500,
                  ticksRate: 2,
                  samplesCount: 15,
                },
                null,
                (e, t) => !K.isUndefined(t[e])
              )).chunkSize,
            });
            const t = (this[tt] = {
              timeWindow: e.timeWindow,
              chunkSize: e.chunkSize,
              maxRate: e.maxRate,
              minChunkSize: e.minChunkSize,
              bytesSeen: 0,
              isCaptured: !1,
              notifiedBytesLoaded: 0,
              ts: Date.now(),
              bytes: 0,
              onReadCallback: null,
            });
            this.on('newListener', (e) => {
              'progress' === e && (t.isCaptured || (t.isCaptured = !0));
            });
          }
          _read(e) {
            const t = this[tt];
            return (t.onReadCallback && t.onReadCallback(), super._read(e));
          }
          _transform(e, t, n) {
            const s = this[tt],
              i = s.maxRate,
              a = this.readableHighWaterMark,
              o = s.timeWindow,
              r = i / (1e3 / o),
              c = !1 !== s.minChunkSize ? Math.max(s.minChunkSize, 0.01 * r) : 0,
              p = (e, t) => {
                const n = Buffer.byteLength(e);
                ((s.bytesSeen += n),
                  (s.bytes += n),
                  s.isCaptured && this.emit('progress', s.bytesSeen),
                  this.push(e)
                    ? process.nextTick(t)
                    : (s.onReadCallback = () => {
                        ((s.onReadCallback = null), process.nextTick(t));
                      }));
              },
              l = (e, t) => {
                const n = Buffer.byteLength(e);
                let l,
                  u = null,
                  d = a,
                  m = 0;
                if (i) {
                  const e = Date.now();
                  ((!s.ts || (m = e - s.ts) >= o) &&
                    ((s.ts = e), (l = r - s.bytes), (s.bytes = l < 0 ? -l : 0), (m = 0)),
                    (l = r - s.bytes));
                }
                if (i) {
                  if (l <= 0)
                    return setTimeout(() => {
                      t(null, e);
                    }, o - m);
                  l < d && (d = l);
                }
                (d && n > d && n - d > c && ((u = e.subarray(d)), (e = e.subarray(0, d))),
                  p(
                    e,
                    u
                      ? () => {
                          process.nextTick(t, null, u);
                        }
                      : t
                  ));
              };
            l(e, function e(t, s) {
              if (t) return n(t);
              s ? l(s, e) : n(null);
            });
          }
        }
        const st = nt,
          it = require('events'),
          { asyncIterator: at } = Symbol,
          ot = async function* (e) {
            e.stream
              ? yield* e.stream()
              : e.arrayBuffer
                ? yield await e.arrayBuffer()
                : e[at]
                  ? yield* e[at]()
                  : yield e;
          },
          rt = Ae.ALPHABET.ALPHA_DIGIT + '-_',
          ct = 'function' == typeof TextEncoder ? new TextEncoder() : new Ve.TextEncoder(),
          pt = '\r\n',
          lt = ct.encode(pt);
        class ut {
          constructor(e, t) {
            const { escapeName: n } = this.constructor,
              s = K.isString(t);
            let i = `Content-Disposition: form-data; name="${n(e)}"${!s && t.name ? `; filename="${n(t.name)}"` : ''}${pt}`;
            (s
              ? (t = ct.encode(String(t).replace(/\r?\n|\r\n?/g, pt)))
              : (i += `Content-Type: ${String(t.type || 'application/octet-stream').replace(/[\r\n]/g, '')}${pt}`),
              (this.headers = ct.encode(i + pt)),
              (this.contentLength = s ? t.byteLength : t.size),
              (this.size = this.headers.byteLength + this.contentLength + 2),
              (this.name = e),
              (this.value = t));
          }
          async *encode() {
            yield this.headers;
            const { value: e } = this;
            (K.isTypedArray(e) ? yield e : yield* ot(e), yield lt);
          }
          static escapeName(e) {
            return String(e).replace(
              /[\r\n"]/g,
              (e) => ({ '\r': '%0D', '\n': '%0A', '"': '%22' })[e]
            );
          }
        }
        class dt extends et.Transform {
          __transform(e, t, n) {
            (this.push(e), n());
          }
          _transform(e, t, n) {
            if (0 !== e.length && ((this._transform = this.__transform), 120 !== e[0])) {
              const e = Buffer.alloc(2);
              ((e[0] = 120), (e[1] = 156), this.push(e, t));
            }
            this.__transform(e, t, n);
          }
        }
        const mt = dt,
          ft = (e, t) =>
            K.isAsyncFn(e)
              ? function (...n) {
                  const s = n.pop();
                  e.apply(this, n).then((e) => {
                    try {
                      t ? s(null, ...t(e)) : s(null, e);
                    } catch (e) {
                      s(e);
                    }
                  }, s);
                }
              : e,
          ht = new Set(['localhost']),
          xt = (e) => {
            const t = e.split('.');
            return (
              4 === t.length &&
              '127' === t[0] &&
              t.every((e) => /^\d+$/.test(e) && Number(e) >= 0 && Number(e) <= 255)
            );
          },
          gt = (e) =>
            !!e &&
            (!!ht.has(e) ||
              !!xt(e) ||
              ((e) => {
                if ('::1' === e) return !0;
                const t = e.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
                if (t) return xt(t[1]);
                const n = e.match(/^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i);
                if (n) {
                  const e = parseInt(n[1], 16);
                  return e >= 32512 && e <= 32767;
                }
                const s = e.split(':');
                if (8 === s.length) {
                  for (let e = 0; e < 7; e++) if (!/^0+$/.test(s[e])) return !1;
                  return /^0*1$/.test(s[7]);
                }
                return !1;
              })(e)),
          vt = { http: 80, https: 443, ws: 80, wss: 443, ftp: 21 },
          bt = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:(\d+\.\d+\.\d+\.\d+)$/i,
          yt = /^(?:::|(?:0{1,4}:){1,4}:|(?:0{1,4}:){5})ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/i,
          wt = (e) =>
            e
              ? ('[' === e.charAt(0) && ']' === e.charAt(e.length - 1) && (e = e.slice(1, -1)),
                ((e) => {
                  if ('string' != typeof e || -1 === e.indexOf(':')) return e;
                  const t = e.match(bt);
                  if (t) return t[1];
                  const n = e.match(yt);
                  if (n) {
                    const e = parseInt(n[1], 16),
                      t = parseInt(n[2], 16);
                    return `${e >> 8}.${255 & e}.${t >> 8}.${255 & t}`;
                  }
                  return e;
                })(e.replace(/\.+$/, '')))
              : e;
        const _t = (e, t, n = 3) => {
            let s = 0;
            const i = (function (e, t) {
              e = e || 10;
              const n = new Array(e),
                s = new Array(e);
              let i,
                a = 0,
                o = 0;
              return (
                (t = void 0 !== t ? t : 1e3),
                function (r) {
                  const c = Date.now(),
                    p = s[o];
                  (i || (i = c), (n[a] = r), (s[a] = c));
                  let l = o,
                    u = 0;
                  for (; l !== a; ) ((u += n[l++]), (l %= e));
                  if (((a = (a + 1) % e), a === o && (o = (o + 1) % e), c - i < t)) return;
                  const d = p && c - p;
                  return d ? Math.round((1e3 * u) / d) : void 0;
                }
              );
            })(50, 250);
            return (function (e, t) {
              let n,
                s,
                i = 0,
                a = 1e3 / t;
              const o = (t, a = Date.now()) => {
                ((i = a), (n = null), s && (clearTimeout(s), (s = null)), e(...t));
              };
              return [
                (...e) => {
                  const t = Date.now(),
                    r = t - i;
                  r >= a
                    ? o(e, t)
                    : ((n = e),
                      s ||
                        (s = setTimeout(() => {
                          ((s = null), o(n));
                        }, a - r)));
                },
                () => n && o(n),
              ];
            })((n) => {
              const a = n.loaded,
                o = n.lengthComputable ? n.total : void 0,
                r = null != o ? Math.min(a, o) : a,
                c = Math.max(0, r - s),
                p = i(c);
              ((s = Math.max(s, r)),
                e({
                  loaded: r,
                  total: o,
                  progress: o ? r / o : void 0,
                  bytes: c,
                  rate: p || void 0,
                  estimated: p && o ? (o - r) / p : void 0,
                  event: n,
                  lengthComputable: null != o,
                  [t ? 'download' : 'upload']: !0,
                }));
            }, n);
          },
          Rt = (e, t) => {
            const n = null != e;
            return [(s) => t[0]({ lengthComputable: n, total: e, loaded: s }), t[1]];
          },
          kt =
            (e) =>
            (...t) =>
              K.asap(() => e(...t));
        function jt(e) {
          if (!e || 'string' != typeof e) return 0;
          if (!e.startsWith('data:')) return 0;
          const t = e.indexOf(',');
          if (t < 0) return 0;
          const n = e.slice(5, t),
            s = e.slice(t + 1);
          if (/;base64/i.test(n)) {
            let e = s.length;
            const t = s.length;
            for (let n = 0; n < t; n++)
              if (37 === s.charCodeAt(n) && n + 2 < t) {
                const t = s.charCodeAt(n + 1),
                  i = s.charCodeAt(n + 2);
                ((t >= 48 && t <= 57) || (t >= 65 && t <= 70) || (t >= 97 && t <= 102)) &&
                  ((i >= 48 && i <= 57) || (i >= 65 && i <= 70) || (i >= 97 && i <= 102)) &&
                  ((e -= 2), (n += 2));
              }
            let n = 0,
              i = t - 1;
            const a = (e) =>
              e >= 2 &&
              37 === s.charCodeAt(e - 2) &&
              51 === s.charCodeAt(e - 1) &&
              (68 === s.charCodeAt(e) || 100 === s.charCodeAt(e));
            (i >= 0 && (61 === s.charCodeAt(i) ? (n++, i--) : a(i) && (n++, (i -= 3))),
              1 === n && i >= 0 && (61 === s.charCodeAt(i) || a(i)) && n++);
            const o = 3 * Math.floor(e / 4) - (n || 0);
            return o > 0 ? o : 0;
          }
          if ('undefined' != typeof Buffer && 'function' == typeof Buffer.byteLength)
            return Buffer.byteLength(s, 'utf8');
          let i = 0;
          for (let e = 0, t = s.length; e < t; e++) {
            const n = s.charCodeAt(e);
            if (n < 128) i += 1;
            else if (n < 2048) i += 2;
            else if (n >= 55296 && n <= 56319 && e + 1 < t) {
              const t = s.charCodeAt(e + 1);
              t >= 56320 && t <= 57343 ? ((i += 4), e++) : (i += 3);
            } else i += 3;
          }
          return i;
        }
        const Pt = { flush: Qe.constants.Z_SYNC_FLUSH, finishFlush: Qe.constants.Z_SYNC_FLUSH },
          Et = {
            flush: Qe.constants.BROTLI_OPERATION_FLUSH,
            finishFlush: Qe.constants.BROTLI_OPERATION_FLUSH,
          },
          Ct = K.isFunction(Qe.createBrotliDecompress),
          { http: St, https: Ot } = Ke,
          Ut = /https:?/,
          At = ['content-type', 'content-length'],
          Ft = Symbol('axios.http.socketListener'),
          Tt = Symbol('axios.http.currentReq'),
          Lt = Ae.protocols.map((e) => e + ':'),
          It = (e) => {
            if (!K.isString(e)) return e;
            try {
              return decodeURIComponent(e);
            } catch (t) {
              return e;
            }
          },
          Bt = (e, [t, n]) => (e.on('end', n).on('error', n), t),
          zt = new (class {
            constructor() {
              this.sessions = Object.create(null);
            }
            getSession(e, t) {
              t = Object.assign({ sessionTimeout: 1e3 }, t);
              let n = this.sessions[e];
              if (n) {
                let e = n.length;
                for (let s = 0; s < e; s++) {
                  const [e, i] = n[s];
                  if (!e.destroyed && !e.closed && Ve.isDeepStrictEqual(i, t)) return e;
                }
              }
              const s = We.connect(e, t);
              let i;
              const a = () => {
                  if (i) return;
                  i = !0;
                  let t = n,
                    a = t.length,
                    o = a;
                  for (; o--; )
                    if (t[o][0] === s)
                      return (
                        1 === a ? delete this.sessions[e] : t.splice(o, 1),
                        void (s.closed || s.close())
                      );
                },
                o = s.request,
                { sessionTimeout: r } = t;
              if (null != r) {
                let e,
                  t = 0;
                s.request = function () {
                  const n = o.apply(this, arguments);
                  return (
                    t++,
                    e && (clearTimeout(e), (e = null)),
                    n.once('close', () => {
                      --t ||
                        (e = setTimeout(() => {
                          ((e = null), a());
                        }, r));
                    }),
                    n
                  );
                };
              }
              s.once('close', a);
              let c = [s, t];
              return (n ? n.push(c) : (n = this.sessions[e] = [c]), s);
            }
          })();
        function Nt(e, t, n) {
          (e.beforeRedirects.proxy && e.beforeRedirects.proxy(e),
            e.beforeRedirects.config && e.beforeRedirects.config(e, t, n));
        }
        function qt(e, t, n, s) {
          let i = t;
          if (!i && !1 !== i) {
            const e = (function (e) {
              var t =
                  ('string' == typeof e
                    ? (function (e) {
                        try {
                          return new URL(e);
                        } catch {
                          return null;
                        }
                      })(e)
                    : e) || {},
                n = t.protocol,
                s = t.host,
                i = t.port;
              if ('string' != typeof s || !s || 'string' != typeof n) return '';
              if (
                ((n = n.split(':', 1)[0]),
                !(function (e, t) {
                  var n = Ge('no_proxy').toLowerCase();
                  return (
                    !n ||
                    ('*' !== n &&
                      n.split(/[,\s]/).every(function (n) {
                        if (!n) return !0;
                        var s = n.match(/^(.+):(\d+)$/),
                          i = s ? s[1] : n,
                          a = s ? parseInt(s[2]) : 0;
                        return (
                          !(!a || a === t) ||
                          (/^[.*]/.test(i)
                            ? ('*' === i.charAt(0) && (i = i.slice(1)), !e.endsWith(i))
                            : e !== i)
                        );
                      }))
                  );
                })((s = s.replace(/:\d*$/, '')), (i = parseInt(i) || Me[n] || 0)))
              )
                return '';
              var a = Ge(n + '_proxy') || Ge('all_proxy');
              return (a && -1 === a.indexOf('://') && (a = n + '://' + a), a);
            })(n);
            e &&
              ((function (e) {
                let t;
                try {
                  t = new URL(e);
                } catch (e) {
                  return !1;
                }
                const n = (process.env.no_proxy || process.env.NO_PROXY || '').toLowerCase();
                if (!n) return !1;
                if ('*' === n) return !0;
                const s = Number.parseInt(t.port, 10) || vt[t.protocol.split(':', 1)[0]] || 0,
                  i = wt(t.hostname.toLowerCase());
                return n.split(/[\s,]+/).some((e) => {
                  if (!e) return !1;
                  let [t, n] = ((e) => {
                    let t = e,
                      n = 0;
                    if ('[' === t.charAt(0)) {
                      const e = t.indexOf(']');
                      if (-1 !== e) {
                        const s = t.slice(1, e),
                          i = t.slice(e + 1);
                        return (
                          ':' === i.charAt(0) &&
                            /^\d+$/.test(i.slice(1)) &&
                            (n = Number.parseInt(i.slice(1), 10)),
                          [s, n]
                        );
                      }
                    }
                    const s = t.indexOf(':'),
                      i = t.lastIndexOf(':');
                    return (
                      -1 !== s &&
                        s === i &&
                        /^\d+$/.test(t.slice(i + 1)) &&
                        ((n = Number.parseInt(t.slice(i + 1), 10)), (t = t.slice(0, i))),
                      [t, n]
                    );
                  })(e);
                  return (
                    (t = wt(t)),
                    !!t &&
                      (!n || n === s) &&
                      ('*' === t.charAt(0) && (t = t.slice(1)),
                      '.' === t.charAt(0) ? i.endsWith(t) : i === t || (gt(i) && gt(t)))
                  );
                });
              })(n) ||
                (i = new URL(e)));
          }
          if (s && e.headers)
            for (const t of Object.keys(e.headers))
              'proxy-authorization' === t.toLowerCase() && delete e.headers[t];
          if (i) {
            const t = i instanceof URL,
              s = (e) => (t || K.hasOwnProp(i, e) ? i[e] : void 0),
              a = s('username'),
              o = s('password');
            let r = K.hasOwnProp(i, 'auth') ? i.auth : void 0;
            if ((a && (r = (a || '') + ':' + (o || '')), r)) {
              const t = 'object' == typeof r,
                n = t && K.hasOwnProp(r, 'username') ? r.username : void 0,
                s = t && K.hasOwnProp(r, 'password') ? r.password : void 0;
              if (Boolean(n || s)) r = (n || '') + ':' + (s || '');
              else if (t)
                throw new oe('Invalid proxy authorization', oe.ERR_BAD_OPTION, { proxy: i });
              const a = Buffer.from(r, 'utf8').toString('base64');
              e.headers['Proxy-Authorization'] = 'Basic ' + a;
            }
            let c = !1;
            for (const t of Object.keys(e.headers))
              if ('host' === t.toLowerCase()) {
                c = !0;
                break;
              }
            c || (e.headers.host = e.hostname + (e.port ? ':' + e.port : ''));
            const p = s('hostname') || s('host');
            ((e.hostname = p), (e.host = p), (e.port = s('port')), (e.path = n));
            const l = s('protocol');
            l && (e.protocol = l.includes(':') ? l : `${l}:`);
          }
          e.beforeRedirects.proxy = function (e) {
            qt(e, t, e.href, !0);
          };
        }
        const Dt = 'undefined' != typeof process && 'process' === K.kindOf(process),
          Mt = (e, t) =>
            (({ address: e, family: t }) => {
              if (!K.isString(e)) throw TypeError('address must be a string');
              return { address: e, family: t || (e.indexOf('.') < 0 ? 6 : 4) };
            })(K.isObject(e) ? e : { address: e, family: t }),
          Gt = {
            request(e, t) {
              const n =
                  e.protocol +
                  '//' +
                  e.hostname +
                  ':' +
                  (e.port || ('https:' === e.protocol ? 443 : 80)),
                { http2Options: s, headers: i } = e,
                a = zt.getSession(n, s),
                {
                  HTTP2_HEADER_SCHEME: o,
                  HTTP2_HEADER_METHOD: r,
                  HTTP2_HEADER_PATH: c,
                  HTTP2_HEADER_STATUS: p,
                } = We.constants,
                l = { [o]: e.protocol.replace(':', ''), [r]: e.method, [c]: e.path };
              K.forEach(i, (e, t) => {
                ':' !== t.charAt(0) && (l[t] = e);
              });
              const u = a.request(l);
              return (
                u.once('response', (e) => {
                  const n = u,
                    s = (e = Object.assign({}, e))[p];
                  (delete e[p], (n.headers = e), (n.statusCode = +s), t(n));
                }),
                u
              );
            },
          },
          Ht =
            Dt &&
            function (e) {
              return (
                (t = async function (t, n, s) {
                  const i = (t) => (K.hasOwnProp(e, t) ? e[t] : void 0);
                  let a = i('data'),
                    o = i('lookup'),
                    r = i('family'),
                    c = i('httpVersion');
                  void 0 === c && (c = 1);
                  let p = i('http2Options');
                  const l = i('responseType'),
                    u = i('responseEncoding'),
                    d = e.method.toUpperCase();
                  let m,
                    f,
                    h,
                    x = !1;
                  if (((c = +c), Number.isNaN(c)))
                    throw TypeError(`Invalid protocol version: '${e.httpVersion}' is not a number`);
                  if (1 !== c && 2 !== c) throw TypeError(`Unsupported protocol version '${c}'`);
                  const g = 2 === c;
                  if (o) {
                    const e = ft(o, (e) => (K.isArray(e) ? e : [e]));
                    o = (t, n, s) => {
                      e(t, n, (e, t, i) => {
                        if (e) return s(e);
                        const a = K.isArray(t) ? t.map((e) => Mt(e)) : [Mt(t, i)];
                        n.all ? s(e, a) : s(e, a[0].address, a[0].family);
                      });
                    };
                  }
                  const v = new it.EventEmitter();
                  function b(t) {
                    try {
                      v.emit('abort', !t || t.type ? new Ne(null, e, f) : t);
                    } catch (e) {
                      console.warn('emit error', e);
                    }
                  }
                  function y() {
                    h && (clearTimeout(h), (h = null));
                  }
                  v.once('abort', n);
                  const w = () => {
                    (y(),
                      e.cancelToken && e.cancelToken.unsubscribe(b),
                      e.signal && e.signal.removeEventListener('abort', b),
                      v.removeAllListeners());
                  };
                  ((e.cancelToken || e.signal) &&
                    (e.cancelToken && e.cancelToken.subscribe(b),
                    e.signal && (e.signal.aborted ? b() : e.signal.addEventListener('abort', b))),
                    s((e, t) => {
                      if (((m = !0), y(), t)) return ((x = !0), void w());
                      const { data: n } = e;
                      if (n instanceof et.Readable || n instanceof et.Duplex) {
                        const e = et.finished(n, () => {
                          (e(), w());
                        });
                      } else w();
                    }));
                  const _ = De(e.baseURL, e.url, e.allowAbsoluteUrls),
                    R = new URL(_, Ae.hasBrowserEnv ? Ae.origin : void 0),
                    k = R.protocol || Lt[0];
                  if ('data:' === k) {
                    if (
                      e.maxContentLength > -1 &&
                      jt(String(e.url || _ || '')) > e.maxContentLength
                    )
                      return n(
                        new oe(
                          'maxContentLength size of ' + e.maxContentLength + ' exceeded',
                          oe.ERR_BAD_RESPONSE,
                          e
                        )
                      );
                    let s;
                    if ('GET' !== d)
                      return qe(t, n, {
                        status: 405,
                        statusText: 'method not allowed',
                        headers: {},
                        config: e,
                      });
                    try {
                      s = (function (e, t, n) {
                        const s = (n && n.Blob) || Ae.classes.Blob,
                          i = Xe(e);
                        if ((void 0 === t && s && (t = !0), 'data' === i)) {
                          e = i.length ? e.slice(i.length + 1) : e;
                          const n = Ze.exec(e);
                          if (!n) throw new oe('Invalid URL', oe.ERR_INVALID_URL);
                          const a = n[1],
                            o = n[2],
                            r = n[3],
                            c = Buffer.from(decodeURIComponent(r), o ? 'base64' : 'utf8');
                          if (t) {
                            if (!s) throw new oe('Blob is not supported', oe.ERR_NOT_SUPPORT);
                            return new s([c], { type: a });
                          }
                          return c;
                        }
                        throw new oe('Unsupported protocol ' + i, oe.ERR_NOT_SUPPORT);
                      })(e.url, 'blob' === l, { Blob: e.env && e.env.Blob });
                    } catch (t) {
                      throw oe.from(t, oe.ERR_BAD_REQUEST, e);
                    }
                    return (
                      'text' === l
                        ? ((s = s.toString(u)), (u && 'utf8' !== u) || (s = K.stripBOM(s)))
                        : 'stream' === l && (s = et.Readable.from(s)),
                      qe(t, n, {
                        data: s,
                        status: 200,
                        statusText: 'OK',
                        headers: new ie(),
                        config: e,
                      })
                    );
                  }
                  if (-1 === Lt.indexOf(k))
                    return n(new oe('Unsupported protocol ' + k, oe.ERR_BAD_REQUEST, e));
                  const j = ie.from(e.headers).normalize();
                  j.set('User-Agent', 'axios/' + Ye, !1);
                  const { onUploadProgress: P, onDownloadProgress: E } = e,
                    C = e.maxRate;
                  let S, O;
                  if (K.isSpecCompliantForm(a)) {
                    const e = j.getContentType(/boundary=([-_\w\d]{10,70})/i);
                    a = ((e, t, n) => {
                      const {
                        tag: s = 'form-data-boundary',
                        size: i = 25,
                        boundary: a = s + '-' + Ae.generateString(i, rt),
                      } = n || {};
                      if (!K.isFormData(e)) throw TypeError('FormData instance required');
                      if (a.length < 1 || a.length > 70)
                        throw Error('boundary must be 1-70 characters long');
                      const o = ct.encode('--' + a + pt),
                        r = ct.encode('--' + a + '--' + pt);
                      let c = r.byteLength;
                      const p = Array.from(e.entries()).map(([e, t]) => {
                        const n = new ut(e, t);
                        return ((c += n.size), n);
                      });
                      ((c += o.byteLength * p.length), (c = K.toFiniteNumber(c)));
                      const l = { 'Content-Type': `multipart/form-data; boundary=${a}` };
                      return (
                        Number.isFinite(c) && (l['Content-Length'] = c),
                        t && t(l),
                        et.Readable.from(
                          (async function* () {
                            for (const e of p) (yield o, yield* e.encode());
                            yield r;
                          })()
                        )
                      );
                    })(
                      a,
                      (e) => {
                        j.set(e);
                      },
                      { tag: `axios-${Ye}-boundary`, boundary: (e && e[1]) || void 0 }
                    );
                  } else if (
                    K.isFormData(a) &&
                    K.isFunction(a.getHeaders) &&
                    a.getHeaders !== Object.prototype.getHeaders
                  ) {
                    if (
                      ((function (e, t, n) {
                        'content-only' === n
                          ? Object.entries(t).forEach(([t, n]) => {
                              At.includes(t.toLowerCase()) && e.set(t, n);
                            })
                          : e.set(t);
                      })(j, a.getHeaders(), i('formDataHeaderPolicy')),
                      !j.hasContentLength())
                    )
                      try {
                        const e = await Ve.promisify(a.getLength).call(a);
                        Number.isFinite(e) && e >= 0 && j.setContentLength(e);
                      } catch (e) {}
                  } else if (K.isBlob(a) || K.isFile(a))
                    (a.size && j.setContentType(a.type || 'application/octet-stream'),
                      j.setContentLength(a.size || 0),
                      (a = et.Readable.from(ot(a))));
                  else if (a && !K.isStream(a)) {
                    if (Buffer.isBuffer(a));
                    else if (K.isArrayBuffer(a)) a = Buffer.from(new Uint8Array(a));
                    else {
                      if (!K.isString(a))
                        return n(
                          new oe(
                            'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
                            oe.ERR_BAD_REQUEST,
                            e
                          )
                        );
                      a = Buffer.from(a, 'utf-8');
                    }
                    if (
                      (j.setContentLength(a.length, !1),
                      e.maxBodyLength > -1 && a.length > e.maxBodyLength)
                    )
                      return n(
                        new oe(
                          'Request body larger than maxBodyLength limit',
                          oe.ERR_BAD_REQUEST,
                          e
                        )
                      );
                  }
                  const U = K.toFiniteNumber(j.getContentLength());
                  let A;
                  (K.isArray(C) ? ((S = C[0]), (O = C[1])) : (S = O = C),
                    a &&
                      (P || S) &&
                      (K.isStream(a) || (a = et.Readable.from(a, { objectMode: !1 })),
                      (a = et.pipeline([a, new st({ maxRate: K.toFiniteNumber(S) })], K.noop)),
                      P && a.on('progress', Bt(a, Rt(U, _t(kt(P), !1, 3))))));
                  const F = i('auth');
                  let T;
                  (F && (A = (F.username || '') + ':' + (F.password || '')),
                    !A && R.username && (A = It(R.username) + ':' + It(R.password)),
                    A && j.delete('authorization'));
                  try {
                    T = ve(R.pathname + R.search, e.params, e.paramsSerializer).replace(/^\?/, '');
                  } catch (t) {
                    const s = new Error(t.message);
                    return ((s.config = e), (s.url = e.url), (s.exists = !0), n(s));
                  }
                  j.set('Accept-Encoding', 'gzip, compress, deflate' + (Ct ? ', br' : ''), !1);
                  const L = Object.assign(Object.create(null), {
                    path: T,
                    method: d,
                    headers: j.toJSON(),
                    agents: { http: e.httpAgent, https: e.httpsAgent },
                    auth: A,
                    protocol: k,
                    family: r,
                    beforeRedirect: Nt,
                    beforeRedirects: Object.create(null),
                    http2Options: p,
                  });
                  if ((!K.isUndefined(o) && (L.lookup = o), e.socketPath)) {
                    if ('string' != typeof e.socketPath)
                      return n(new oe('socketPath must be a string', oe.ERR_BAD_OPTION_VALUE, e));
                    if (null != e.allowedSocketPaths) {
                      const t = Array.isArray(e.allowedSocketPaths)
                          ? e.allowedSocketPaths
                          : [e.allowedSocketPaths],
                        s = (0, Je.resolve)(e.socketPath);
                      if (!t.some((e) => 'string' == typeof e && (0, Je.resolve)(e) === s))
                        return n(
                          new oe(
                            `socketPath "${e.socketPath}" is not permitted by allowedSocketPaths`,
                            oe.ERR_BAD_OPTION_VALUE,
                            e
                          )
                        );
                    }
                    L.socketPath = e.socketPath;
                  } else
                    ((L.hostname = R.hostname.startsWith('[')
                      ? R.hostname.slice(1, -1)
                      : R.hostname),
                      (L.port = R.port),
                      qt(
                        L,
                        e.proxy,
                        k + '//' + R.hostname + (R.port ? ':' + R.port : '') + L.path
                      ));
                  let I,
                    B = !1;
                  const z = Ut.test(L.protocol);
                  if (((L.agent = z ? e.httpsAgent : e.httpAgent), g)) I = Gt;
                  else {
                    const t = i('transport');
                    if (t) I = t;
                    else if (0 === e.maxRedirects) ((I = z ? $e : He), (B = !0));
                    else {
                      e.maxRedirects && (L.maxRedirects = e.maxRedirects);
                      const t = i('beforeRedirect');
                      (t && (L.beforeRedirects.config = t), (I = z ? Ot : St));
                    }
                  }
                  (e.maxBodyLength > -1
                    ? (L.maxBodyLength = e.maxBodyLength)
                    : (L.maxBodyLength = 1 / 0),
                    (L.insecureHTTPParser = Boolean(i('insecureHTTPParser'))),
                    (f = I.request(L, function (s) {
                      if ((y(), f.destroyed)) return;
                      const i = [s],
                        a = K.toFiniteNumber(s.headers['content-length']);
                      if (E || O) {
                        const p = new st({ maxRate: K.toFiniteNumber(O) });
                        (E && p.on('progress', Bt(p, Rt(a, _t(kt(E), !0, 3)))), i.push(p));
                      }
                      let o = s;
                      const r = s.req || f;
                      if (!1 !== e.decompress && s.headers['content-encoding'])
                        switch (
                          (('HEAD' !== d && 204 !== s.statusCode) ||
                            delete s.headers['content-encoding'],
                          (s.headers['content-encoding'] || '').toLowerCase())
                        ) {
                          case 'gzip':
                          case 'x-gzip':
                          case 'compress':
                          case 'x-compress':
                            (i.push(Qe.createUnzip(Pt)), delete s.headers['content-encoding']);
                            break;
                          case 'deflate':
                            (i.push(new mt()),
                              i.push(Qe.createUnzip(Pt)),
                              delete s.headers['content-encoding']);
                            break;
                          case 'br':
                            Ct &&
                              (i.push(Qe.createBrotliDecompress(Et)),
                              delete s.headers['content-encoding']);
                        }
                      o = i.length > 1 ? et.pipeline(i, K.noop) : i[0];
                      const c = {
                        status: s.statusCode,
                        statusText: s.statusMessage,
                        headers: new ie(s.headers),
                        config: e,
                        request: r,
                      };
                      if ('stream' === l) {
                        if (e.maxContentLength > -1) {
                          const m = e.maxContentLength,
                            h = o;
                          async function* g() {
                            let t = 0;
                            for await (const n of h) {
                              if (((t += n.length), t > m))
                                throw new oe(
                                  'maxContentLength size of ' + m + ' exceeded',
                                  oe.ERR_BAD_RESPONSE,
                                  e,
                                  r
                                );
                              yield n;
                            }
                          }
                          o = et.Readable.from(g(), { objectMode: !1 });
                        }
                        ((c.data = o), qe(t, n, c));
                      } else {
                        const w = [];
                        let _ = 0;
                        (o.on('data', function (t) {
                          (w.push(t),
                            (_ += t.length),
                            e.maxContentLength > -1 &&
                              _ > e.maxContentLength &&
                              ((x = !0),
                              o.destroy(),
                              b(
                                new oe(
                                  'maxContentLength size of ' + e.maxContentLength + ' exceeded',
                                  oe.ERR_BAD_RESPONSE,
                                  e,
                                  r
                                )
                              )));
                        }),
                          o.on('aborted', function () {
                            if (x) return;
                            const t = new oe(
                              'stream has been aborted',
                              oe.ERR_BAD_RESPONSE,
                              e,
                              r,
                              c
                            );
                            (o.destroy(t), n(t));
                          }),
                          o.on('error', function (t) {
                            x || n(oe.from(t, null, e, r, c));
                          }),
                          o.on('end', function () {
                            try {
                              let e = 1 === w.length ? w[0] : Buffer.concat(w);
                              ('arraybuffer' !== l &&
                                ((e = e.toString(u)), (u && 'utf8' !== u) || (e = K.stripBOM(e))),
                                (c.data = e));
                            } catch (t) {
                              return n(oe.from(t, null, e, c.request, c));
                            }
                            qe(t, n, c);
                          }));
                      }
                      v.once('abort', (e) => {
                        o.destroyed || (o.emit('error', e), o.destroy());
                      });
                    })),
                    v.once('abort', (e) => {
                      f.close ? f.close() : f.destroy(e);
                    }),
                    f.on('error', function (t) {
                      n(oe.from(t, null, e, f));
                    }));
                  const N = new Set();
                  if (
                    (f.on('socket', function (e) {
                      (e.setKeepAlive(!0, 6e4),
                        e[Ft] ||
                          (e.on('error', function (t) {
                            const n = e[Tt];
                            n && !n.destroyed && n.destroy(t);
                          }),
                          (e[Ft] = !0)),
                        (e[Tt] = f),
                        N.add(e));
                    }),
                    f.once('close', function () {
                      y();
                      for (const e of N) e[Tt] === f && (e[Tt] = null);
                      N.clear();
                    }),
                    e.timeout)
                  ) {
                    const t = parseInt(e.timeout, 10);
                    if (Number.isNaN(t))
                      return void b(
                        new oe(
                          'error trying to parse `config.timeout` to int',
                          oe.ERR_BAD_OPTION_VALUE,
                          e,
                          f
                        )
                      );
                    const n = function () {
                      m ||
                        b(
                          (function () {
                            let t = e.timeout
                              ? 'timeout of ' + e.timeout + 'ms exceeded'
                              : 'timeout exceeded';
                            const n = e.transitional || ye;
                            return (
                              e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                              new oe(
                                t,
                                n.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED,
                                e,
                                f
                              )
                            );
                          })()
                        );
                    };
                    (B && t > 0 && (h = setTimeout(n, t)), f.setTimeout(t, n));
                  } else f.setTimeout(0);
                  if (K.isStream(a)) {
                    let t = !1,
                      n = !1;
                    (a.on('end', () => {
                      t = !0;
                    }),
                      a.once('error', (e) => {
                        ((n = !0), f.destroy(e));
                      }),
                      a.on('close', () => {
                        t || n || b(new Ne('Request stream has been aborted', e, f));
                      }));
                    let s = a;
                    if (e.maxBodyLength > -1 && 0 === e.maxRedirects) {
                      const t = e.maxBodyLength;
                      let n = 0;
                      ((s = et.pipeline(
                        [
                          a,
                          new et.Transform({
                            transform(s, i, a) {
                              if (((n += s.length), n > t))
                                return a(
                                  new oe(
                                    'Request body larger than maxBodyLength limit',
                                    oe.ERR_BAD_REQUEST,
                                    e,
                                    f
                                  )
                                );
                              a(null, s);
                            },
                          }),
                        ],
                        K.noop
                      )),
                        s.on('error', (e) => {
                          f.destroyed || f.destroy(e);
                        }));
                    }
                    s.pipe(f);
                  } else (a && f.write(a), f.end());
                }),
                new Promise((e, n) => {
                  let s, i;
                  const a = (e, t) => {
                      i || ((i = !0), s && s(e, t));
                    },
                    o = (e) => {
                      (a(e, !0), n(e));
                    };
                  t(
                    (t) => {
                      (a(t), e(t));
                    },
                    o,
                    (e) => (s = e)
                  ).catch(o);
                })
              );
              var t;
            },
          $t = Ae.hasStandardBrowserEnv
            ? ((e, t) => (n) => (
                (n = new URL(n, Ae.origin)),
                e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)
              ))(new URL(Ae.origin), Ae.navigator && /(msie|trident)/i.test(Ae.navigator.userAgent))
            : () => !0,
          Wt = Ae.hasStandardBrowserEnv
            ? {
                write(e, t, n, s, i, a, o) {
                  if ('undefined' == typeof document) return;
                  const r = [`${e}=${encodeURIComponent(t)}`];
                  (K.isNumber(n) && r.push(`expires=${new Date(n).toUTCString()}`),
                    K.isString(s) && r.push(`path=${s}`),
                    K.isString(i) && r.push(`domain=${i}`),
                    !0 === a && r.push('secure'),
                    K.isString(o) && r.push(`SameSite=${o}`),
                    (document.cookie = r.join('; ')));
                },
                read(e) {
                  if ('undefined' == typeof document) return null;
                  const t = document.cookie.split(';');
                  for (let n = 0; n < t.length; n++) {
                    const s = t[n].replace(/^\s+/, ''),
                      i = s.indexOf('=');
                    if (-1 !== i && s.slice(0, i) === e) return decodeURIComponent(s.slice(i + 1));
                  }
                  return null;
                },
                remove(e) {
                  this.write(e, '', Date.now() - 864e5, '/');
                },
              }
            : { write() {}, read: () => null, remove() {} },
          Vt = (e) => (e instanceof ie ? { ...e } : e);
        function Jt(e, t) {
          t = t || {};
          const n = Object.create(null);
          function s(e, t, n, s) {
            return K.isPlainObject(e) && K.isPlainObject(t)
              ? K.merge.call({ caseless: s }, e, t)
              : K.isPlainObject(t)
                ? K.merge({}, t)
                : K.isArray(t)
                  ? t.slice()
                  : t;
          }
          function i(e, t, n, i) {
            return K.isUndefined(t)
              ? K.isUndefined(e)
                ? void 0
                : s(void 0, e, 0, i)
              : s(e, t, 0, i);
          }
          function a(e, t) {
            if (!K.isUndefined(t)) return s(void 0, t);
          }
          function o(e, t) {
            return K.isUndefined(t) ? (K.isUndefined(e) ? void 0 : s(void 0, e)) : s(void 0, t);
          }
          function r(n, i, a) {
            return K.hasOwnProp(t, a) ? s(n, i) : K.hasOwnProp(e, a) ? s(void 0, n) : void 0;
          }
          Object.defineProperty(n, 'hasOwnProperty', {
            __proto__: null,
            value: Object.prototype.hasOwnProperty,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          });
          const c = {
            url: a,
            method: a,
            data: a,
            baseURL: o,
            transformRequest: o,
            transformResponse: o,
            paramsSerializer: o,
            timeout: o,
            timeoutMessage: o,
            withCredentials: o,
            withXSRFToken: o,
            adapter: o,
            responseType: o,
            xsrfCookieName: o,
            xsrfHeaderName: o,
            onUploadProgress: o,
            onDownloadProgress: o,
            decompress: o,
            maxContentLength: o,
            maxBodyLength: o,
            beforeRedirect: o,
            transport: o,
            httpAgent: o,
            httpsAgent: o,
            cancelToken: o,
            socketPath: o,
            allowedSocketPaths: o,
            responseEncoding: o,
            validateStatus: r,
            headers: (e, t, n) => i(Vt(e), Vt(t), 0, !0),
          };
          return (
            K.forEach(Object.keys({ ...e, ...t }), function (s) {
              if ('__proto__' === s || 'constructor' === s || 'prototype' === s) return;
              const a = K.hasOwnProp(c, s) ? c[s] : i,
                o = a(K.hasOwnProp(e, s) ? e[s] : void 0, K.hasOwnProp(t, s) ? t[s] : void 0, s);
              (K.isUndefined(o) && a !== r) || (n[s] = o);
            }),
            n
          );
        }
        const Kt = ['content-type', 'content-length'],
          Qt = (e) => {
            const t = Jt({}, e),
              n = (e) => (K.hasOwnProp(t, e) ? t[e] : void 0),
              s = n('data');
            let i = n('withXSRFToken');
            const a = n('xsrfHeaderName'),
              o = n('xsrfCookieName');
            let r = n('headers');
            const c = n('auth'),
              p = n('baseURL'),
              l = n('allowAbsoluteUrls'),
              u = n('url');
            var d;
            if (
              ((t.headers = r = ie.from(r)),
              (t.url = ve(De(p, u, l), e.params, e.paramsSerializer)),
              c &&
                r.set(
                  'Authorization',
                  'Basic ' +
                    btoa(
                      (c.username || '') +
                        ':' +
                        (c.password
                          ? ((d = c.password),
                            encodeURIComponent(d).replace(/%([0-9A-F]{2})/gi, (e, t) =>
                              String.fromCharCode(parseInt(t, 16))
                            ))
                          : '')
                    )
                ),
              K.isFormData(s) &&
                (Ae.hasStandardBrowserEnv || Ae.hasStandardBrowserWebWorkerEnv
                  ? r.setContentType(void 0)
                  : K.isFunction(s.getHeaders) &&
                    (function (e, t, n) {
                      'content-only' === n
                        ? Object.entries(t).forEach(([t, n]) => {
                            Kt.includes(t.toLowerCase()) && e.set(t, n);
                          })
                        : e.set(t);
                    })(r, s.getHeaders(), n('formDataHeaderPolicy'))),
              Ae.hasStandardBrowserEnv &&
                (K.isFunction(i) && (i = i(t)), !0 === i || (null == i && $t(t.url))))
            ) {
              const e = a && o && Wt.read(o);
              e && r.set(a, e);
            }
            return t;
          };
        (Object.getOwnPropertyDescriptor(Qt, 'name') || {}).writable ||
          Object.defineProperty(Qt, 'name', { value: 'default', configurable: !0 });
        const Yt =
            'undefined' != typeof XMLHttpRequest &&
            function (e) {
              return new Promise(function (t, n) {
                const s = Qt(e);
                let i = s.data;
                const a = ie.from(s.headers).normalize();
                let o,
                  r,
                  c,
                  p,
                  l,
                  { responseType: u, onUploadProgress: d, onDownloadProgress: m } = s;
                function f() {
                  (p && p(),
                    l && l(),
                    s.cancelToken && s.cancelToken.unsubscribe(o),
                    s.signal && s.signal.removeEventListener('abort', o));
                }
                let h = new XMLHttpRequest();
                function x() {
                  if (!h) return;
                  const s = ie.from('getAllResponseHeaders' in h && h.getAllResponseHeaders());
                  (qe(
                    function (e) {
                      (t(e), f());
                    },
                    function (e) {
                      (n(e), f());
                    },
                    {
                      data: u && 'text' !== u && 'json' !== u ? h.response : h.responseText,
                      status: h.status,
                      statusText: h.statusText,
                      headers: s,
                      config: e,
                      request: h,
                    }
                  ),
                    (h = null));
                }
                (h.open(s.method.toUpperCase(), s.url, !0),
                  (h.timeout = s.timeout),
                  'onloadend' in h
                    ? (h.onloadend = x)
                    : (h.onreadystatechange = function () {
                        h &&
                          4 === h.readyState &&
                          (0 !== h.status ||
                            (h.responseURL && h.responseURL.startsWith('file:'))) &&
                          setTimeout(x);
                      }),
                  (h.onabort = function () {
                    h && (n(new oe('Request aborted', oe.ECONNABORTED, e, h)), f(), (h = null));
                  }),
                  (h.onerror = function (t) {
                    const s = t && t.message ? t.message : 'Network Error',
                      i = new oe(s, oe.ERR_NETWORK, e, h);
                    ((i.event = t || null), n(i), f(), (h = null));
                  }),
                  (h.ontimeout = function () {
                    let t = s.timeout
                      ? 'timeout of ' + s.timeout + 'ms exceeded'
                      : 'timeout exceeded';
                    const i = s.transitional || ye;
                    (s.timeoutErrorMessage && (t = s.timeoutErrorMessage),
                      n(new oe(t, i.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED, e, h)),
                      f(),
                      (h = null));
                  }),
                  void 0 === i && a.setContentType(null),
                  'setRequestHeader' in h &&
                    K.forEach(a.toJSON(), function (e, t) {
                      h.setRequestHeader(t, e);
                    }),
                  K.isUndefined(s.withCredentials) || (h.withCredentials = !!s.withCredentials),
                  u && 'json' !== u && (h.responseType = s.responseType),
                  m && (([c, l] = _t(m, !0)), h.addEventListener('progress', c)),
                  d &&
                    h.upload &&
                    (([r, p] = _t(d)),
                    h.upload.addEventListener('progress', r),
                    h.upload.addEventListener('loadend', p)),
                  (s.cancelToken || s.signal) &&
                    ((o = (t) => {
                      h && (n(!t || t.type ? new Ne(null, e, h) : t), h.abort(), f(), (h = null));
                    }),
                    s.cancelToken && s.cancelToken.subscribe(o),
                    s.signal && (s.signal.aborted ? o() : s.signal.addEventListener('abort', o))));
                const g = Xe(s.url);
                !g || Ae.protocols.includes(g)
                  ? h.send(i || null)
                  : n(new oe('Unsupported protocol ' + g + ':', oe.ERR_BAD_REQUEST, e));
              });
            },
          Xt = (e, t) => {
            const { length: n } = (e = e ? e.filter(Boolean) : []);
            if (t || n) {
              let n,
                s = new AbortController();
              const i = function (e) {
                if (!n) {
                  ((n = !0), o());
                  const t = e instanceof Error ? e : this.reason;
                  s.abort(t instanceof oe ? t : new Ne(t instanceof Error ? t.message : t));
                }
              };
              let a =
                t &&
                setTimeout(() => {
                  ((a = null), i(new oe(`timeout of ${t}ms exceeded`, oe.ETIMEDOUT)));
                }, t);
              const o = () => {
                e &&
                  (a && clearTimeout(a),
                  (a = null),
                  e.forEach((e) => {
                    e.unsubscribe ? e.unsubscribe(i) : e.removeEventListener('abort', i);
                  }),
                  (e = null));
              };
              e.forEach((e) => e.addEventListener('abort', i));
              const { signal: r } = s;
              return ((r.unsubscribe = () => K.asap(o)), r);
            }
          },
          Zt = function* (e, t) {
            let n = e.byteLength;
            if (!t || n < t) return void (yield e);
            let s,
              i = 0;
            for (; i < n; ) ((s = i + t), yield e.slice(i, s), (i = s));
          },
          en = (e, t, n, s) => {
            const i = (async function* (e, t) {
              for await (const n of (async function* (e) {
                if (e[Symbol.asyncIterator]) return void (yield* e);
                const t = e.getReader();
                try {
                  for (;;) {
                    const { done: e, value: n } = await t.read();
                    if (e) break;
                    yield n;
                  }
                } finally {
                  await t.cancel();
                }
              })(e))
                yield* Zt(n, t);
            })(e, t);
            let a,
              o = 0,
              r = (e) => {
                a || ((a = !0), s && s(e));
              };
            return new ReadableStream(
              {
                async pull(e) {
                  try {
                    const { done: t, value: s } = await i.next();
                    if (t) return (r(), void e.close());
                    let a = s.byteLength;
                    if (n) {
                      let e = (o += a);
                      n(e);
                    }
                    e.enqueue(new Uint8Array(s));
                  } catch (e) {
                    throw (r(e), e);
                  }
                },
                cancel: (e) => (r(e), i.return()),
              },
              { highWaterMark: 2 }
            );
          },
          { isFunction: tn } = K,
          nn = (e, ...t) => {
            try {
              return !!e(...t);
            } catch (e) {
              return !1;
            }
          },
          sn = (e) => {
            const t = K.global ?? globalThis,
              { ReadableStream: n, TextEncoder: s } = t;
            e = K.merge.call(
              { skipUndefined: !0 },
              { Request: t.Request, Response: t.Response },
              e
            );
            const { fetch: i, Request: a, Response: o } = e,
              r = i ? tn(i) : 'function' == typeof fetch,
              c = tn(a),
              p = tn(o);
            if (!r) return !1;
            const l = r && tn(n),
              u =
                r &&
                ('function' == typeof s
                  ? ((d = new s()), (e) => d.encode(e))
                  : async (e) => new Uint8Array(await new a(e).arrayBuffer()));
            var d;
            const m =
                c &&
                l &&
                nn(() => {
                  let e = !1;
                  const t = new a(Ae.origin, {
                      body: new n(),
                      method: 'POST',
                      get duplex() {
                        return ((e = !0), 'half');
                      },
                    }),
                    s = t.headers.has('Content-Type');
                  return (null != t.body && t.body.cancel(), e && !s);
                }),
              f = p && l && nn(() => K.isReadableStream(new o('').body)),
              h = { stream: f && ((e) => e.body) };
            r &&
              ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((e) => {
                !h[e] &&
                  (h[e] = (t, n) => {
                    let s = t && t[e];
                    if (s) return s.call(t);
                    throw new oe(`Response type '${e}' is not supported`, oe.ERR_NOT_SUPPORT, n);
                  });
              });
            const x = async (e, t) => {
              const n = K.toFiniteNumber(e.getContentLength());
              return null == n
                ? (async (e) => {
                    if (null == e) return 0;
                    if (K.isBlob(e)) return e.size;
                    if (K.isSpecCompliantForm(e)) {
                      const t = new a(Ae.origin, { method: 'POST', body: e });
                      return (await t.arrayBuffer()).byteLength;
                    }
                    return K.isArrayBufferView(e) || K.isArrayBuffer(e)
                      ? e.byteLength
                      : (K.isURLSearchParams(e) && (e += ''),
                        K.isString(e) ? (await u(e)).byteLength : void 0);
                  })(t)
                : n;
            };
            return async (e) => {
              let {
                url: t,
                method: n,
                data: r,
                signal: p,
                cancelToken: l,
                timeout: u,
                onDownloadProgress: d,
                onUploadProgress: g,
                responseType: v,
                headers: b,
                withCredentials: y = 'same-origin',
                fetchOptions: w,
                maxContentLength: _,
                maxBodyLength: R,
              } = Qt(e);
              const k = K.isNumber(_) && _ > -1,
                j = K.isNumber(R) && R > -1;
              let P = i || fetch;
              v = v ? (v + '').toLowerCase() : 'text';
              let E = Xt([p, l && l.toAbortSignal()], u),
                C = null;
              const S =
                E &&
                E.unsubscribe &&
                (() => {
                  E.unsubscribe();
                });
              let O;
              try {
                if (k && 'string' == typeof t && t.startsWith('data:') && jt(t) > _)
                  throw new oe(
                    'maxContentLength size of ' + _ + ' exceeded',
                    oe.ERR_BAD_RESPONSE,
                    e,
                    C
                  );
                if (j && 'get' !== n && 'head' !== n) {
                  const t = await x(b, r);
                  if ('number' == typeof t && isFinite(t) && t > R)
                    throw new oe(
                      'Request body larger than maxBodyLength limit',
                      oe.ERR_BAD_REQUEST,
                      e,
                      C
                    );
                }
                if (g && m && 'get' !== n && 'head' !== n && 0 !== (O = await x(b, r))) {
                  let e,
                    n = new a(t, { method: 'POST', body: r, duplex: 'half' });
                  if (
                    (K.isFormData(r) && (e = n.headers.get('content-type')) && b.setContentType(e),
                    n.body)
                  ) {
                    const [e, t] = Rt(O, _t(kt(g)));
                    r = en(n.body, 65536, e, t);
                  }
                }
                K.isString(y) || (y = y ? 'include' : 'omit');
                const i = c && 'credentials' in a.prototype;
                if (K.isFormData(r)) {
                  const e = b.getContentType();
                  e &&
                    /^multipart\/form-data/i.test(e) &&
                    !/boundary=/i.test(e) &&
                    b.delete('content-type');
                }
                b.set('User-Agent', 'axios/' + Ye, !1);
                const p = {
                  ...w,
                  signal: E,
                  method: n.toUpperCase(),
                  headers: b.normalize().toJSON(),
                  body: r,
                  duplex: 'half',
                  credentials: i ? y : void 0,
                };
                C = c && new a(t, p);
                let l = await (c ? P(C, w) : P(t, p));
                if (k) {
                  const t = K.toFiniteNumber(l.headers.get('content-length'));
                  if (null != t && t > _)
                    throw new oe(
                      'maxContentLength size of ' + _ + ' exceeded',
                      oe.ERR_BAD_RESPONSE,
                      e,
                      C
                    );
                }
                const u = f && ('stream' === v || 'response' === v);
                if (f && l.body && (d || k || (u && S))) {
                  const t = {};
                  ['status', 'statusText', 'headers'].forEach((e) => {
                    t[e] = l[e];
                  });
                  const n = K.toFiniteNumber(l.headers.get('content-length')),
                    [s, i] = (d && Rt(n, _t(kt(d), !0))) || [];
                  let a = 0;
                  const r = (t) => {
                    if (k && ((a = t), a > _))
                      throw new oe(
                        'maxContentLength size of ' + _ + ' exceeded',
                        oe.ERR_BAD_RESPONSE,
                        e,
                        C
                      );
                    s && s(t);
                  };
                  l = new o(
                    en(l.body, 65536, r, () => {
                      (i && i(), S && S());
                    }),
                    t
                  );
                }
                v = v || 'text';
                let U = await h[K.findKey(h, v) || 'text'](l, e);
                if (k && !f && !u) {
                  let t;
                  if (
                    (null != U &&
                      ('number' == typeof U.byteLength
                        ? (t = U.byteLength)
                        : 'number' == typeof U.size
                          ? (t = U.size)
                          : 'string' == typeof U &&
                            (t = 'function' == typeof s ? new s().encode(U).byteLength : U.length)),
                    'number' == typeof t && t > _)
                  )
                    throw new oe(
                      'maxContentLength size of ' + _ + ' exceeded',
                      oe.ERR_BAD_RESPONSE,
                      e,
                      C
                    );
                }
                return (
                  !u && S && S(),
                  await new Promise((t, n) => {
                    qe(t, n, {
                      data: U,
                      headers: ie.from(l.headers),
                      status: l.status,
                      statusText: l.statusText,
                      config: e,
                      request: C,
                    });
                  })
                );
              } catch (t) {
                if ((S && S(), E && E.aborted && E.reason instanceof oe)) {
                  const n = E.reason;
                  throw ((n.config = e), C && (n.request = C), t !== n && (n.cause = t), n);
                }
                if (t && 'TypeError' === t.name && /Load failed|fetch/i.test(t.message))
                  throw Object.assign(
                    new oe('Network Error', oe.ERR_NETWORK, e, C, t && t.response),
                    { cause: t.cause || t }
                  );
                throw oe.from(t, t && t.code, e, C, t && t.response);
              }
            };
          },
          an = new Map(),
          on = (e) => {
            let t = (e && e.env) || {};
            const { fetch: n, Request: s, Response: i } = t,
              a = [s, i, n];
            let o,
              r,
              c = a.length,
              p = an;
            for (; c--; )
              ((o = a[c]),
                (r = p.get(o)),
                void 0 === r && p.set(o, (r = c ? new Map() : sn(t))),
                (p = r));
            return r;
          },
          rn = (on(), { http: Ht, xhr: Yt, fetch: { get: on } });
        K.forEach(rn, (e, t) => {
          if (e) {
            try {
              Object.defineProperty(e, 'name', { __proto__: null, value: t });
            } catch (e) {}
            Object.defineProperty(e, 'adapterName', { __proto__: null, value: t });
          }
        });
        const cn = (e) => `- ${e}`,
          pn = (e) => K.isFunction(e) || null === e || !1 === e,
          ln = function (e, t) {
            e = K.isArray(e) ? e : [e];
            const { length: n } = e;
            let s, i;
            const a = {};
            for (let o = 0; o < n; o++) {
              let n;
              if (
                ((s = e[o]),
                (i = s),
                !pn(s) && ((i = rn[(n = String(s)).toLowerCase()]), void 0 === i))
              )
                throw new oe(`Unknown adapter '${n}'`);
              if (i && (K.isFunction(i) || (i = i.get(t)))) break;
              a[n || '#' + o] = i;
            }
            if (!i) {
              const e = Object.entries(a).map(
                ([e, t]) =>
                  `adapter ${e} ` +
                  (!1 === t
                    ? 'is not supported by the environment'
                    : 'is not available in the build')
              );
              let t = n
                ? e.length > 1
                  ? 'since :\n' + e.map(cn).join('\n')
                  : ' ' + cn(e[0])
                : 'as no adapter specified';
              throw new oe(
                'There is no suitable adapter to dispatch the request ' + t,
                'ERR_NOT_SUPPORT'
              );
            }
            return i;
          };
        function un(e) {
          if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
            throw new Ne(null, e);
        }
        function dn(e) {
          return (
            un(e),
            (e.headers = ie.from(e.headers)),
            (e.data = Be.call(e, e.transformRequest)),
            -1 !== ['post', 'put', 'patch'].indexOf(e.method) &&
              e.headers.setContentType('application/x-www-form-urlencoded', !1),
            ln(
              e.adapter || Ie.adapter,
              e
            )(e).then(
              function (t) {
                (un(e), (e.response = t));
                try {
                  t.data = Be.call(e, e.transformResponse, t);
                } finally {
                  delete e.response;
                }
                return ((t.headers = ie.from(t.headers)), t);
              },
              function (t) {
                if (!ze(t) && (un(e), t && t.response)) {
                  e.response = t.response;
                  try {
                    t.response.data = Be.call(e, e.transformResponse, t.response);
                  } finally {
                    delete e.response;
                  }
                  t.response.headers = ie.from(t.response.headers);
                }
                return Promise.reject(t);
              }
            )
          );
        }
        const mn = {};
        ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
          mn[e] = function (n) {
            return typeof n === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
          };
        });
        const fn = {};
        ((mn.transitional = function (e, t, n) {
          function s(e, t) {
            return '[Axios v' + Ye + "] Transitional option '" + e + "'" + t + (n ? '. ' + n : '');
          }
          return (n, i, a) => {
            if (!1 === e)
              throw new oe(s(i, ' has been removed' + (t ? ' in ' + t : '')), oe.ERR_DEPRECATED);
            return (
              t &&
                !fn[i] &&
                ((fn[i] = !0),
                console.warn(
                  s(
                    i,
                    ' has been deprecated since v' + t + ' and will be removed in the near future'
                  )
                )),
              !e || e(n, i, a)
            );
          };
        }),
          (mn.spelling = function (e) {
            return (t, n) => (console.warn(`${n} is likely a misspelling of ${e}`), !0);
          }));
        const hn = {
            assertOptions: function (e, t, n) {
              if ('object' != typeof e)
                throw new oe('options must be an object', oe.ERR_BAD_OPTION_VALUE);
              const s = Object.keys(e);
              let i = s.length;
              for (; i-- > 0; ) {
                const a = s[i],
                  o = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
                if (o) {
                  const t = e[a],
                    n = void 0 === t || o(t, a, e);
                  if (!0 !== n)
                    throw new oe('option ' + a + ' must be ' + n, oe.ERR_BAD_OPTION_VALUE);
                  continue;
                }
                if (!0 !== n) throw new oe('Unknown option ' + a, oe.ERR_BAD_OPTION);
              }
            },
            validators: mn,
          },
          xn = hn.validators;
        class gn {
          constructor(e) {
            ((this.defaults = e || {}),
              (this.interceptors = { request: new be(), response: new be() }));
          }
          async request(e, t) {
            try {
              return await this._request(e, t);
            } catch (e) {
              if (e instanceof Error) {
                let t = {};
                Error.captureStackTrace ? Error.captureStackTrace(t) : (t = new Error());
                const n = (() => {
                  if (!t.stack) return '';
                  const e = t.stack.indexOf('\n');
                  return -1 === e ? '' : t.stack.slice(e + 1);
                })();
                try {
                  if (e.stack) {
                    if (n) {
                      const t = n.indexOf('\n'),
                        s = -1 === t ? -1 : n.indexOf('\n', t + 1),
                        i = -1 === s ? '' : n.slice(s + 1);
                      String(e.stack).endsWith(i) || (e.stack += '\n' + n);
                    }
                  } else e.stack = n;
                } catch (e) {}
              }
              throw e;
            }
          }
          _request(e, t) {
            ('string' == typeof e ? ((t = t || {}).url = e) : (t = e || {}),
              (t = Jt(this.defaults, t)));
            const { transitional: n, paramsSerializer: s, headers: i } = t;
            (void 0 !== n &&
              hn.assertOptions(
                n,
                {
                  silentJSONParsing: xn.transitional(xn.boolean),
                  forcedJSONParsing: xn.transitional(xn.boolean),
                  clarifyTimeoutError: xn.transitional(xn.boolean),
                  legacyInterceptorReqResOrdering: xn.transitional(xn.boolean),
                },
                !1
              ),
              null != s &&
                (K.isFunction(s)
                  ? (t.paramsSerializer = { serialize: s })
                  : hn.assertOptions(s, { encode: xn.function, serialize: xn.function }, !0)),
              void 0 !== t.allowAbsoluteUrls ||
                (void 0 !== this.defaults.allowAbsoluteUrls
                  ? (t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
                  : (t.allowAbsoluteUrls = !0)),
              hn.assertOptions(
                t,
                { baseUrl: xn.spelling('baseURL'), withXsrfToken: xn.spelling('withXSRFToken') },
                !0
              ),
              (t.method = (t.method || this.defaults.method || 'get').toLowerCase()));
            let a = i && K.merge(i.common, i[t.method]);
            (i &&
              K.forEach(
                ['delete', 'get', 'head', 'post', 'put', 'patch', 'query', 'common'],
                (e) => {
                  delete i[e];
                }
              ),
              (t.headers = ie.concat(a, i)));
            const o = [];
            let r = !0;
            this.interceptors.request.forEach(function (e) {
              if ('function' == typeof e.runWhen && !1 === e.runWhen(t)) return;
              r = r && e.synchronous;
              const n = t.transitional || ye;
              n && n.legacyInterceptorReqResOrdering
                ? o.unshift(e.fulfilled, e.rejected)
                : o.push(e.fulfilled, e.rejected);
            });
            const c = [];
            let p;
            this.interceptors.response.forEach(function (e) {
              c.push(e.fulfilled, e.rejected);
            });
            let l,
              u = 0;
            if (!r) {
              const e = [dn.bind(this), void 0];
              for (e.unshift(...o), e.push(...c), l = e.length, p = Promise.resolve(t); u < l; )
                p = p.then(e[u++], e[u++]);
              return p;
            }
            l = o.length;
            let d = t;
            for (; u < l; ) {
              const e = o[u++],
                t = o[u++];
              try {
                d = e(d);
              } catch (e) {
                t.call(this, e);
                break;
              }
            }
            try {
              p = dn.call(this, d);
            } catch (e) {
              return Promise.reject(e);
            }
            for (u = 0, l = c.length; u < l; ) p = p.then(c[u++], c[u++]);
            return p;
          }
          getUri(e) {
            return ve(
              De((e = Jt(this.defaults, e)).baseURL, e.url, e.allowAbsoluteUrls),
              e.params,
              e.paramsSerializer
            );
          }
        }
        (K.forEach(['delete', 'get', 'head', 'options'], function (e) {
          gn.prototype[e] = function (t, n) {
            return this.request(Jt(n || {}, { method: e, url: t, data: (n || {}).data }));
          };
        }),
          K.forEach(['post', 'put', 'patch', 'query'], function (e) {
            function t(t) {
              return function (n, s, i) {
                return this.request(
                  Jt(i || {}, {
                    method: e,
                    headers: t ? { 'Content-Type': 'multipart/form-data' } : {},
                    url: n,
                    data: s,
                  })
                );
              };
            }
            ((gn.prototype[e] = t()), 'query' !== e && (gn.prototype[e + 'Form'] = t(!0)));
          }));
        const vn = gn;
        class bn {
          constructor(e) {
            if ('function' != typeof e) throw new TypeError('executor must be a function.');
            let t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            const n = this;
            (this.promise.then((e) => {
              if (!n._listeners) return;
              let t = n._listeners.length;
              for (; t-- > 0; ) n._listeners[t](e);
              n._listeners = null;
            }),
              (this.promise.then = (e) => {
                let t;
                const s = new Promise((e) => {
                  (n.subscribe(e), (t = e));
                }).then(e);
                return (
                  (s.cancel = function () {
                    n.unsubscribe(t);
                  }),
                  s
                );
              }),
              e(function (e, s, i) {
                n.reason || ((n.reason = new Ne(e, s, i)), t(n.reason));
              }));
          }
          throwIfRequested() {
            if (this.reason) throw this.reason;
          }
          subscribe(e) {
            this.reason
              ? e(this.reason)
              : this._listeners
                ? this._listeners.push(e)
                : (this._listeners = [e]);
          }
          unsubscribe(e) {
            if (!this._listeners) return;
            const t = this._listeners.indexOf(e);
            -1 !== t && this._listeners.splice(t, 1);
          }
          toAbortSignal() {
            const e = new AbortController(),
              t = (t) => {
                e.abort(t);
              };
            return (
              this.subscribe(t),
              (e.signal.unsubscribe = () => this.unsubscribe(t)),
              e.signal
            );
          }
          static source() {
            let e;
            return {
              token: new bn(function (t) {
                e = t;
              }),
              cancel: e,
            };
          }
        }
        const yn = bn,
          wn = {
            Continue: 100,
            SwitchingProtocols: 101,
            Processing: 102,
            EarlyHints: 103,
            Ok: 200,
            Created: 201,
            Accepted: 202,
            NonAuthoritativeInformation: 203,
            NoContent: 204,
            ResetContent: 205,
            PartialContent: 206,
            MultiStatus: 207,
            AlreadyReported: 208,
            ImUsed: 226,
            MultipleChoices: 300,
            MovedPermanently: 301,
            Found: 302,
            SeeOther: 303,
            NotModified: 304,
            UseProxy: 305,
            Unused: 306,
            TemporaryRedirect: 307,
            PermanentRedirect: 308,
            BadRequest: 400,
            Unauthorized: 401,
            PaymentRequired: 402,
            Forbidden: 403,
            NotFound: 404,
            MethodNotAllowed: 405,
            NotAcceptable: 406,
            ProxyAuthenticationRequired: 407,
            RequestTimeout: 408,
            Conflict: 409,
            Gone: 410,
            LengthRequired: 411,
            PreconditionFailed: 412,
            PayloadTooLarge: 413,
            UriTooLong: 414,
            UnsupportedMediaType: 415,
            RangeNotSatisfiable: 416,
            ExpectationFailed: 417,
            ImATeapot: 418,
            MisdirectedRequest: 421,
            UnprocessableEntity: 422,
            Locked: 423,
            FailedDependency: 424,
            TooEarly: 425,
            UpgradeRequired: 426,
            PreconditionRequired: 428,
            TooManyRequests: 429,
            RequestHeaderFieldsTooLarge: 431,
            UnavailableForLegalReasons: 451,
            InternalServerError: 500,
            NotImplemented: 501,
            BadGateway: 502,
            ServiceUnavailable: 503,
            GatewayTimeout: 504,
            HttpVersionNotSupported: 505,
            VariantAlsoNegotiates: 506,
            InsufficientStorage: 507,
            LoopDetected: 508,
            NotExtended: 510,
            NetworkAuthenticationRequired: 511,
            WebServerIsDown: 521,
            ConnectionTimedOut: 522,
            OriginIsUnreachable: 523,
            TimeoutOccurred: 524,
            SslHandshakeFailed: 525,
            InvalidSslCertificate: 526,
          };
        Object.entries(wn).forEach(([e, t]) => {
          wn[t] = e;
        });
        const _n = wn,
          Rn = (function e(n) {
            const s = new vn(n),
              i = t(vn.prototype.request, s);
            return (
              K.extend(i, vn.prototype, s, { allOwnKeys: !0 }),
              K.extend(i, s, null, { allOwnKeys: !0 }),
              (i.create = function (t) {
                return e(Jt(n, t));
              }),
              i
            );
          })(Ie);
        ((Rn.Axios = vn),
          (Rn.CanceledError = Ne),
          (Rn.CancelToken = yn),
          (Rn.isCancel = ze),
          (Rn.VERSION = Ye),
          (Rn.toFormData = de),
          (Rn.AxiosError = oe),
          (Rn.Cancel = Rn.CanceledError),
          (Rn.all = function (e) {
            return Promise.all(e);
          }),
          (Rn.spread = function (e) {
            return function (t) {
              return e.apply(null, t);
            };
          }),
          (Rn.isAxiosError = function (e) {
            return K.isObject(e) && !0 === e.isAxiosError;
          }),
          (Rn.mergeConfig = Jt),
          (Rn.AxiosHeaders = ie),
          (Rn.formToJSON = (e) => Fe(K.isHTMLForm(e) ? new FormData(e) : e)),
          (Rn.getAdapter = ln),
          (Rn.HttpStatusCode = _n),
          (Rn.default = Rn));
        const kn = Rn;
        class jn {
          static getErrorMessage(e) {
            return e.error ? e.error.message : '';
          }
          static getLinkRelationUrls(e, t) {
            return e.links.filter((e) => e.rel === t).map((e) => e.href);
          }
          static getItemDescriptors(e) {
            const t = {};
            for (let n of e.data) t[n.name] = n.value;
            return t;
          }
          static getUrl(e) {
            return e.href;
          }
          static getTotalNumberOfItems(e) {
            return e.total ? e.total : -1;
          }
          static getTemplateDescriptorNames(e) {
            return e.data.map((e) => e.name);
          }
          static getQueryParameters(e) {
            return e[0].data.map((e) => e.name);
          }
          static createCollectionObj() {
            return { href: '', items: [], links: [], version: '1.0' };
          }
          static makeTemplate(e) {
            const t = { data: [] };
            let n = 0;
            for (let s in e) (e.hasOwnProperty(s) && (t.data[n] = { name: s, value: e[s] }), n++);
            return t;
          }
        }
        class Pn extends Error {
          constructor(...e) {
            (super(...e),
              (this.name = this.constructor.name),
              (this.request = null),
              (this.response = null));
          }
        }
        class En {
          constructor(e, t, n = 3e4) {
            ((this.auth = e), (this.contentType = t), (this.timeout = n));
          }
          get(e, t = null) {
            const n = this._getConfig(e, 'get');
            return (t && (n.params = t), En._callAxios(n));
          }
          post(e, t, n = null) {
            return this._postOrPut('post', e, t, n);
          }
          put(e, t, n = null) {
            return this._postOrPut('put', e, t, n);
          }
          delete(e) {
            const t = this._getConfig(e, 'delete');
            return En._callAxios(t);
          }
          _postOrPut(e, t, n, s = null) {
            const i = this._getConfig(t, e);
            if (((i.data = n), s)) {
              i.headers['Content-Type'] = 'multipart/form-data';
              const e = new FormData();
              for (let t in n) n.hasOwnProperty(t) && e.set(t, n[t]);
              for (let t in s) s.hasOwnProperty(t) && e.set(t, s[t]);
              i.data = e;
            }
            return En._callAxios(i);
          }
          _getConfig(e, t) {
            const n = {
              url: e,
              method: t,
              headers: { Accept: this.contentType, 'Content-Type': this.contentType },
              timeout: this.timeout,
            };
            return (
              this.auth && this.auth.username && this.auth.password
                ? (n.auth = this.auth)
                : this.auth &&
                  this.auth.token &&
                  (n.headers.Authorization = 'Token ' + this.auth.token),
              'application/octet-stream' === this.contentType &&
                (n.responseType = 'undefined' == typeof window ? 'arraybuffer' : 'blob'),
              n
            );
          }
          static _callAxios(e) {
            return kn(e)
              .then((e) => e)
              .catch((e) => {
                En._handleRequestError(e);
              });
          }
          static _handleRequestError(e) {
            let t;
            if (e.response) {
              let n = 'Bad server response!';
              (e.response.data.collection && (n = jn.getErrorMessage(e.response.data.collection)),
                (t = new Pn(n)),
                (t.request = e.request),
                (t.response = e.response));
              try {
                t.response.data = JSON.parse(n);
              } catch (e) {
                t.response.data = n;
              }
            } else
              e.request
                ? ((t = new Pn('No server response!')), (t.request = e.request))
                : (t = new Pn(e.message));
            throw t;
          }
          static runAsyncTask(e) {
            let t = e(),
              n = t.next();
            !(function e() {
              n.done ||
                n.value
                  .then((s) => {
                    ((n = t.next(s)), e());
                  })
                  .catch((s) => {
                    ((n = t.throw(s)), e());
                  });
            })();
          }
        }
        class Cn {
          constructor(e, t = null) {
            ((this.url = e),
              (this.auth = t),
              (this.contentType = 'application/vnd.collection+json'),
              (this.collection = null));
          }
          get isEmpty() {
            return !this.collection || !this.collection.items.length;
          }
          clone() {
            return Cn.cloneObj(this);
          }
          static cloneObj(e) {
            const t = Object.create(Object.getPrototypeOf(e));
            for (let n in e)
              null !== e[n] && 'object' == typeof e[n]
                ? (t[n] = JSON.parse(JSON.stringify(e[n])))
                : (t[n] = e[n]);
            return t;
          }
        }
        class Sn extends Cn {
          constructor(e, t = null) {
            super(e, t);
          }
          get(e = 3e4) {
            return new En(this.auth, this.contentType, e)
              .get(this.url)
              .then(
                (e) => (
                  (this.collection = null),
                  e.data && e.data.collection && (this.collection = e.data.collection),
                  this
                )
              );
          }
          get data() {
            return this.isEmpty ? null : jn.getItemDescriptors(this.collection.items[0]);
          }
          getPUTParameters() {
            return this.collection && this.collection.template
              ? jn.getTemplateDescriptorNames(this.collection.template)
              : null;
          }
          _getResource(e, t, n = null, s = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const i = this.collection.items[0],
              a = jn.getLinkRelationUrls(i, e);
            if (!a.length) throw new Pn('Missing "' + e + '" link relation!');
            const o = new t(a[0], this.auth);
            return 'searchParams' in o ? o.get(n, s) : o.get(s);
          }
          _put(e, t, n = 3e4) {
            const s = new En(this.auth, this.contentType, n);
            let i = e;
            return (
              t ||
                'application/vnd.collection+json' !== this.contentType ||
                (i = { template: jn.makeTemplate(e) }),
              s
                .put(this.url, i, t)
                .then(
                  (e) => (
                    (this.collection = null),
                    e.data && e.data.collection && (this.collection = e.data.collection),
                    this
                  )
                )
            );
          }
          _delete(e = 3e4) {
            return new En(this.auth, this.contentType, e).delete(this.url).then(() => {
              this.collection = null;
            });
          }
        }
        class On extends Cn {
          constructor(e, t = null) {
            (super(e, t), (this.queryUrl = ''), (this.searchParams = null), (this.itemClass = Sn));
          }
          get(e = null, t = 3e4) {
            const n = new En(this.auth, this.contentType, t),
              s = (t) => (
                (this.collection = null),
                (this.searchParams = e),
                t.data &&
                  t.data.collection &&
                  ((this.collection = t.data.collection),
                  this.collection.queries &&
                    this.collection.queries.length &&
                    (this.queryUrl = this.collection.queries[0].href)),
                this
              );
            if (e) {
              for (let t in e)
                if (e.hasOwnProperty(t) && 'limit' !== t && 'offset' !== t)
                  return (
                    (this.queryUrl = this.queryUrl || this.url + 'search/'),
                    n.get(this.queryUrl, e).then(s)
                  );
              return n.get(this.url, e).then(s);
            }
            return n.get(this.url).then(s);
          }
          getSearchParameters() {
            if (this.collection) {
              if (this.collection.queries) {
                const e = jn.getQueryParameters(this.collection.queries);
                return (e.push('limit', 'offset'), e);
              }
              return ['limit', 'offset'];
            }
            return null;
          }
          getItem(e) {
            if (this.isEmpty) return null;
            const t = this.collection.items.filter((t) => jn.getItemDescriptors(t).id === e);
            if (!t.length) return null;
            const n = new this.itemClass(t[0].href, this.auth);
            return (
              (n.collection = jn.createCollectionObj()),
              n.collection.items.push(t[0]),
              (n.collection.href = t[0].href),
              n
            );
          }
          getItems() {
            return this.isEmpty
              ? []
              : this.collection.items.map((e) => {
                  const t = new this.itemClass(e.href, this.auth);
                  return (
                    (t.collection = jn.createCollectionObj()),
                    t.collection.items.push(e),
                    (t.collection.href = e.href),
                    t
                  );
                });
          }
          get data() {
            if (this.isEmpty) return null;
            const e = [];
            for (let t of this.collection.items) e.push(jn.getItemDescriptors(t));
            return e;
          }
          get totalCount() {
            return this.collection ? jn.getTotalNumberOfItems(this.collection) : -1;
          }
          get hasNextPage() {
            return !(!this.collection || !jn.getLinkRelationUrls(this.collection, 'next').length);
          }
          get hasPreviousPage() {
            return !(
              !this.collection || !jn.getLinkRelationUrls(this.collection, 'previous').length
            );
          }
          getPOSTParameters() {
            return this.collection && this.collection.template
              ? jn.getTemplateDescriptorNames(this.collection.template)
              : null;
          }
          _getResource(e, t, n = null, s = 3e4) {
            if (!this.collection) throw new Pn('Collection object has not been set!');
            const i = jn.getLinkRelationUrls(this.collection, e);
            if (!i.length) throw new Pn('Missing "' + e + '" link relation!');
            const a = new t(i[0], this.auth);
            return 'searchParams' in a ? a.get(n, s) : a.get(s);
          }
          _post(e, t, n = 3e4) {
            const s = this.url,
              i = new En(this.auth, this.contentType, n);
            let a = e;
            return (
              t ||
                'application/vnd.collection+json' !== this.contentType ||
                (a = { template: jn.makeTemplate(e) }),
              i
                .post(s, a, t)
                .then(
                  (e) => (
                    (this.collection = null),
                    (this.searchParams = null),
                    e.data && e.data.collection && (this.collection = e.data.collection),
                    this
                  )
                )
            );
          }
        }
        class Un extends Sn {
          constructor(e, t) {
            super(e, t);
          }
        }
        class An extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getUsers(e = null, t = 3e4) {
            const n = Ln;
            return this._getResource('users', n, e, t);
          }
          getUser(e, t = 3e4) {
            return this.getUsers({ username: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          adminAddUser(e, t = 3e4) {
            return this.getUsers(null, t)
              .then((t) => t.post({ username: e }), t)
              .then((e) => e.getItems()[0]);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Fn extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = An));
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Tn extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getUser(e = 3e4) {
            const t = Bn;
            return this._getResource('user', t, null, e);
          }
          getGroup(e = 3e4) {
            const t = An;
            return this._getResource('group', t, null, e);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Ln extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Tn));
          }
          getGroup(e = 3e4) {
            const t = An;
            return this._getResource('group', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class In extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = An));
          }
          getUser(e = 3e4) {
            const t = Bn;
            return this._getResource('user', t, null, e);
          }
        }
        class Bn extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getGroups(e = null, t = 3e4) {
            const n = In;
            return this._getResource('groups', n, e, t);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
        }
        class zn extends Sn {
          getPlugin(e = 3e4) {
            const t = Ss;
            return this._getResource('plugin', t, null, e);
          }
        }
        class Nn extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = zn));
          }
          getPlugin(e = 3e4) {
            const t = Ss;
            return this._getResource('plugin', t, null, e);
          }
        }
        class qn extends Sn {
          getParent(e = 3e4) {
            const t = qn;
            return this._getResource('parent', t, null, e);
          }
          getChildren(e = null, t = 3e4) {
            const n = Mn;
            return this._getResource('children', n, e, t);
          }
          getFiles(e = null, t = 3e4) {
            const n = Hn;
            return this._getResource('files', n, e, t);
          }
          getLinkFiles(e = null, t = 3e4) {
            const n = Wn;
            return this._getResource('link_files', n, e, t);
          }
          getGroupPermissions(e = null, t = 3e4) {
            const n = Jn;
            return this._getResource('group_permissions', n, e, t);
          }
          getGroupPermission(e, t = 3e4) {
            return this.getGroupPermissions({ group_name: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          getUserPermissions(e = null, t = 3e4) {
            const n = Qn;
            return this._getResource('user_permissions', n, e, t);
          }
          getUserPermission(e, t = 3e4) {
            return this.getUserPermissions({ username: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          makePublic(e = 3e4) {
            return this.put({ public: !0 }, e);
          }
          makeUnpublic(e = 3e4) {
            return this.put({ public: !1 }, e);
          }
          addGroupPermission(e, t, n = 3e4) {
            return this.getGroupPermissions(null, n)
              .then((n) => n.post({ grp_name: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          addUserPermission(e, t, n = 3e4) {
            return this.getUserPermissions(null, n)
              .then((n) => n.post({ username: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Dn extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = qn));
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Mn extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = qn));
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
        }
        class Gn extends Sn {
          getFileBlob(e = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const t = new En(this.auth, 'application/octet-stream', e),
              n = this.collection.items[0],
              s = jn.getLinkRelationUrls(n, 'file_resource')[0];
            return t.get(s).then((e) => e.data);
          }
          getParentFolder(e = 3e4) {
            const t = qn;
            return this._getResource('parent_folder', t, null, e);
          }
          getGroupPermissions(e = null, t = 3e4) {
            const n = Xn;
            return this._getResource('group_permissions', n, e, t);
          }
          getGroupPermission(e, t = 3e4) {
            return this.getGroupPermissions({ group_name: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          getUserPermissions(e = null, t = 3e4) {
            const n = es;
            return this._getResource('user_permissions', n, e, t);
          }
          getUserPermission(e, t = 3e4) {
            return this.getUserPermissions({ username: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          makePublic(e = 3e4) {
            return this.put({ public: !0 }, e);
          }
          makeUnpublic(e = 3e4) {
            return this.put({ public: !1 }, e);
          }
          addGroupPermission(e, t, n = 3e4) {
            return this.getGroupPermissions(null, n)
              .then((n) => n.post({ grp_name: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          addUserPermission(e, t, n = 3e4) {
            return this.getUserPermissions(null, n)
              .then((n) => n.post({ username: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Hn extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = Gn));
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
        }
        class $n extends Sn {
          getFileBlob(e = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const t = new En(this.auth, 'application/octet-stream', e),
              n = this.collection.items[0],
              s = jn.getLinkRelationUrls(n, 'file_resource')[0];
            return t.get(s).then((e) => e.data);
          }
          getParentFolder(e = 3e4) {
            const t = qn;
            return this._getResource('parent_folder', t, null, e);
          }
          getLinkedResource(e = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const t = this.collection.items[0];
            let n = 'linked_folder',
              s = qn;
            return jn.getLinkRelationUrls(t, n).length ||
              ((n = 'linked_file'), (s = Gn), jn.getLinkRelationUrls(t, n).length)
              ? this._getResource(n, s, null, e)
              : null;
          }
          getGroupPermissions(e = null, t = 3e4) {
            const n = ns;
            return this._getResource('group_permissions', n, e, t);
          }
          getGroupPermission(e, t = 3e4) {
            return this.getGroupPermissions({ group_name: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          getUserPermissions(e = null, t = 3e4) {
            const n = is;
            return this._getResource('user_permissions', n, e, t);
          }
          getUserPermission(e, t = 3e4) {
            return this.getUserPermissions({ username: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          makePublic(e = 3e4) {
            return this.put({ public: !0 }, e);
          }
          makeUnpublic(e = 3e4) {
            return this.put({ public: !1 }, e);
          }
          addGroupPermission(e, t, n = 3e4) {
            return this.getGroupPermissions(null, n)
              .then((n) => n.post({ grp_name: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          addUserPermission(e, t, n = 3e4) {
            return this.getUserPermissions(null, n)
              .then((n) => n.post({ username: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Wn extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = $n));
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
        }
        class Vn extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
          getGroup(e = 3e4) {
            const t = Group;
            return this._getResource('group', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Jn extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Vn));
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Kn extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
          getUser(e = 3e4) {
            const t = User;
            return this._getResource('user', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Qn extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Kn));
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Yn extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFile(e = 3e4) {
            const t = Gn;
            return this._getResource('file', t, null, e);
          }
          getGroup(e = 3e4) {
            const t = Group;
            return this._getResource('group', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Xn extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Yn));
          }
          getFile(e = 3e4) {
            const t = Gn;
            return this._getResource('file', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Zn extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFile(e = 3e4) {
            const t = Gn;
            return this._getResource('file', t, null, e);
          }
          getUser(e = 3e4) {
            const t = User;
            return this._getResource('user', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class es extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Zn));
          }
          getFile(e = 3e4) {
            const t = Gn;
            return this._getResource('file', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class ts extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getLinkFile(e = 3e4) {
            const t = $n;
            return this._getResource('link_file', t, null, e);
          }
          getGroup(e = 3e4) {
            const t = Group;
            return this._getResource('group', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class ns extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = ts));
          }
          getLinkFile(e = 3e4) {
            const t = $n;
            return this._getResource('link_file', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class ss extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getLinkFile(e = 3e4) {
            const t = $n;
            return this._getResource('link_file', t, null, e);
          }
          getUser(e = 3e4) {
            const t = User;
            return this._getResource('user', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class is extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = ss));
          }
          getLinkFile(e = 3e4) {
            const t = $n;
            return this._getResource('link_file', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class as extends Sn {
          getPlugins(e = null, t = 3e4) {
            const n = ps;
            return this._getResource('plugins', n, e, t);
          }
          getPluginPipings(e = null, t = 3e4) {
            const n = ls;
            return this._getResource('plugin_pipings', n, e, t);
          }
          getDefaultParameters(e = null, t = 3e4) {
            const n = us;
            return this._getResource('default_parameters', n, e, t);
          }
          getWorkflows(e = null, t = 3e4) {
            const n = hs;
            return this._getResource('workflows', n, e, t);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class os extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = as));
          }
          getPlugins(e = null, t = 3e4) {
            const n = Os;
            return this._getResource('plugins', n, e, t);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class rs extends Sn {
          getPreviousPluginPiping(e = 3e4) {
            const t = rs;
            try {
              return this._getResource('previous', t, null, e);
            } catch (e) {
              return Promise.resolve(null);
            }
          }
          getPlugin(e = 3e4) {
            const t = Ss;
            return this._getResource('plugin', t, null, e);
          }
          getPipeline(e = 3e4) {
            const t = as;
            return this._getResource('pipeline', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
        }
        class cs extends Sn {
          getPluginPiping(e = 3e4) {
            const t = rs;
            return this._getResource('plugin_piping', t, null, e);
          }
          getPluginParameter(e = 3e4) {
            const t = zn;
            return this._getResource('plugin_param', t, null, e);
          }
        }
        class ps extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = Ss));
          }
        }
        class ls extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = rs));
          }
        }
        class us extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = cs));
          }
        }
        class ds extends Sn {
          getFileBlob(e = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const t = new En(this.auth, 'application/octet-stream', e),
              n = this.collection.items[0],
              s = jn.getLinkRelationUrls(n, 'file_resource')[0];
            return t.get(s).then((e) => e.data);
          }
          getParentFolder(e = 3e4) {
            const t = qn;
            return this._getResource('parent_folder', t, null, e);
          }
        }
        class ms extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = ds));
          }
          post(e, t, n = 3e4) {
            return this._post(e, t, n);
          }
        }
        class fs extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getPipeline(e = 3e4) {
            const t = as;
            return this._getResource('pipeline', t, null, e);
          }
          getPluginInstances(e = null, t = 3e4) {
            const n = ws;
            return this._getResource('plugin_instances', n, e, t);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class hs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = fs));
          }
          getPipeline(e = 3e4) {
            const t = as;
            return this._getResource('pipeline', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class xs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = fs));
          }
          getPipelines(e = null, t = 3e4) {
            const n = os;
            return this._getResource('pipelines', n, e, t);
          }
        }
        class gs extends Sn {
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          getPlugin(e = 3e4) {
            const t = Ss;
            return this._getResource('plugin', t, null, e);
          }
          getOutputFolder(e = 3e4) {
            const t = qn;
            return this._getResource('output_folder', t, null, e);
          }
          getComputeResource(e = 3e4) {
            const t = As;
            return this._getResource('compute_resource', t, null, e);
          }
          getPreviousPluginInstance(e = 3e4) {
            const t = gs;
            try {
              return this._getResource('previous', t, null, e);
            } catch (e) {
              return Promise.resolve(null);
            }
          }
          getWorkflow(e = 3e4) {
            const t = fs;
            try {
              return this._getResource('workflow', t, null, e);
            } catch (e) {
              return Promise.resolve(null);
            }
          }
          getDescendantPluginInstances(e = null, t = 3e4) {
            const n = _s;
            return this._getResource('descendants', n, e, t);
          }
          getParameters(e = null, t = 3e4) {
            const n = Ps;
            return this._getResource('parameters', n, e, t);
          }
          getSplits(e = null, t = 3e4) {
            const n = ks;
            return this._getResource('splits', n, e, t);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class vs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = gs));
          }
          getPlugin(e = 3e4) {
            const t = Ss;
            return this._getResource('plugin', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class bs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = gs));
          }
          getPlugins(e = null, t = 3e4) {
            const n = Os;
            return this._getResource('plugins', n, e, t);
          }
        }
        class ys extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = gs));
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
        }
        class ws extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = gs));
          }
        }
        class _s extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = gs));
          }
        }
        class Rs extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getPluginInstance(e = 3e4) {
            const t = gs;
            return this._getResource('plugin_inst', t, null, e);
          }
        }
        class ks extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Rs));
          }
          getPluginInstance(e = 3e4) {
            const t = gs;
            return this._getResource('plugin_inst', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class js extends Sn {
          getPluginInstance(e = 3e4) {
            const t = gs;
            return this._getResource('plugin_inst', t, null, e);
          }
          getPluginParameter(e = 3e4) {
            const t = zn;
            return this._getResource('plugin_param', t, null, e);
          }
        }
        class Ps extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = js));
          }
        }
        class Es extends Sn {
          getPlugins(e = null, t = 3e4) {
            const n = Us;
            return this._getResource('plugins', n, e, t);
          }
        }
        class Cs extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = Es));
          }
          getPlugins(e = null, t = 3e4) {
            const n = Os;
            return this._getResource('plugins', n, e, t);
          }
          getFeeds(e = null, t = 3e4) {
            const n = li;
            return this._getResource('feeds', n, e, t);
          }
        }
        class Ss extends Sn {
          getPluginMeta(e = 3e4) {
            const t = Es;
            return this._getResource('meta', t, null, e);
          }
          getPluginParameters(e = null, t = 3e4) {
            const n = Nn;
            return this._getResource('parameters', n, e, t);
          }
          getPluginComputeResources(e = null, t = 3e4) {
            const n = Ts;
            return this._getResource('compute_resources', n, e, t);
          }
          getPluginInstances(e = null, t = 3e4) {
            const n = vs;
            return this._getResource('instances', n, e, t);
          }
        }
        class Os extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = Ss));
          }
          getFeeds(e = null, t = 3e4) {
            const n = li;
            return this._getResource('feeds', n, e, t);
          }
        }
        class Us extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = Ss));
          }
          getPluginMeta(e = 3e4) {
            const t = Es;
            return this._getResource('meta', t, null, e);
          }
        }
        class As extends Sn {
          constructor(e, t) {
            super(e, t);
          }
        }
        class Fs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = As));
          }
          getFeeds(e = null, t = 3e4) {
            const n = li;
            return this._getResource('feeds', n, e, t);
          }
        }
        class Ts extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = As));
          }
          getPlugin(e = 3e4) {
            const t = Ss;
            return this._getResource('plugin', t, null, e);
          }
        }
        class Ls extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Is extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Ls));
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Bs extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class zs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Bs));
          }
          getComputeResourceAdmins(e = null, t = 3e4) {
            const n = Is;
            return this._getResource('compute_resources', n, e, t);
          }
          post(e, t, n = 3e4) {
            return this._post(e, t, n);
          }
        }
        class Ns extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFileBlob(e = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const t = new En(this.auth, 'application/octet-stream', e),
              n = this.collection.items[0],
              s = jn.getLinkRelationUrls(n, 'file_resource')[0];
            return t.get(s).then((e) => e.data);
          }
          getParentFolder(e = 3e4) {
            const t = qn;
            return this._getResource('parent_folder', t, null, e);
          }
          getGroupPermissions(e = null, t = 3e4) {
            const n = Xn;
            return this._getResource('group_permissions', n, e, t);
          }
          getGroupPermission(e, t = 3e4) {
            return this.getGroupPermissions({ group_name: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          getUserPermissions(e = null, t = 3e4) {
            const n = es;
            return this._getResource('user_permissions', n, e, t);
          }
          getUserPermission(e, t = 3e4) {
            return this.getUserPermissions({ username: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          makePublic(e = 3e4) {
            return this.put({ public: !0 }, e);
          }
          makeUnpublic(e = 3e4) {
            return this.put({ public: !1 }, e);
          }
          addGroupPermission(e, t, n = 3e4) {
            return this.getGroupPermissions(null, n)
              .then((n) => n.post({ grp_name: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          addUserPermission(e, t, n = 3e4) {
            return this.getUserPermissions(null, n)
              .then((n) => n.post({ username: e, permission: t }), n)
              .then((e) => e.getItems()[0]);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class qs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Ns));
          }
          post(e, t, n = 3e4) {
            return this._post(e, t, n);
          }
        }
        class Ds extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
        }
        class Ms extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Ds));
          }
        }
        class Gs extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFileBlob(e = 3e4) {
            if (this.isEmpty) throw new Pn('Item object has not been set!');
            const t = new En(this.auth, 'application/octet-stream', e),
              n = this.collection.items[0],
              s = jn.getLinkRelationUrls(n, 'file_resource')[0];
            return t.get(s).then((e) => e.data);
          }
          getParentFolder(e = 3e4) {
            const t = qn;
            return this._getResource('parent_folder', t, null, e);
          }
        }
        class Hs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Gs));
          }
        }
        class $s extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getRetrieves(e = null, t = 3e4) {
            const n = Ks;
            return this._getResource('retrieve_list', n, e, t);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Ws extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = $s));
          }
          getPACS(e = 3e4) {
            const t = Qs;
            return this._getResource('pacs', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class Vs extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = $s));
          }
        }
        class Js extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getQuery(e = 3e4) {
            const t = $s;
            return this._getResource('pacs_query', t, null, e);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class Ks extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Js));
          }
          getQuery(e = 3e4) {
            const t = $s;
            return this._getResource('pacs_query', t, null, e);
          }
          post(e = 3e4) {
            return this._post({}, null, e);
          }
        }
        class Qs extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
          getQueries(e = null, t = 3e4) {
            const n = Ws;
            return this._getResource('query_list', n, e, t);
          }
          getSeriesList(e = null, t = 3e4) {
            const n = Xs;
            return this._getResource('series_list', n, e, t);
          }
        }
        class Ys extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = Qs));
          }
        }
        class Xs extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = Ds));
          }
        }
        class Zs extends Sn {
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
        }
        class ei extends Sn {
          getTaggedFeeds(e = null, t = 3e4) {
            const n = ai;
            return this._getResource('feeds', n, e, t);
          }
          getTaggings(e = null, t = 3e4) {
            const n = si;
            return this._getResource('taggings', n, e, t);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class ti extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = ei));
          }
          getFeeds(e = null, t = 3e4) {
            const n = li;
            return this._getResource('feeds', n, e, t);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class ni extends Sn {
          getTag(e = 3e4) {
            const t = ei;
            return this._getResource('tag', t, null, e);
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class si extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = ni));
          }
          getTag(e = 3e4) {
            const t = ei;
            return this._getResource('tag', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class ii extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = ni));
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class ai extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = pi));
          }
          getTag(e = 3e4) {
            const t = ei;
            return this._getResource('tag', t, null, e);
          }
        }
        class oi extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = ei));
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
        }
        class ri extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class ci extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = ri));
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class pi extends Sn {
          getFolder(e = 3e4) {
            const t = qn;
            return this._getResource('folder', t, null, e);
          }
          getNote(e = 3e4) {
            const t = Zs;
            return this._getResource('note', t, null, e);
          }
          getGroupPermissions(e = null, t = 3e4) {
            const n = mi;
            return this._getResource('group_permissions', n, e, t);
          }
          getGroupPermission(e, t = 3e4) {
            return this.getGroupPermissions({ group_name: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          getUserPermissions(e = null, t = 3e4) {
            const n = hi;
            return this._getResource('user_permissions', n, e, t);
          }
          getUserPermission(e, t = 3e4) {
            return this.getUserPermissions({ username: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          getTags(e = null, t = 3e4) {
            const n = oi;
            return this._getResource('tags', n, e, t);
          }
          getTaggings(e = null, t = 3e4) {
            const n = ii;
            return this._getResource('taggings', n, e, t);
          }
          getComments(e = null, t = 3e4) {
            const n = ci;
            return this._getResource('comments', n, e, t);
          }
          getComment(e, t = 3e4) {
            return this.getComments({ id: e }, t).then((t) => t.getItem(e));
          }
          getPluginInstances(e = null, t = 3e4) {
            const n = ys;
            return this._getResource('plugin_instances', n, e, t);
          }
          addTagging(e, t = 3e4) {
            return this.getTaggings(null, t)
              .then((t) => t.post({ tag_id: e }), t)
              .then((e) => e.getItems()[0]);
          }
          addComment(e = '', t = '', n = 3e4) {
            return this.getComments(null, n)
              .then((n) => n.post({ title: e, content: t }), n)
              .then((e) => e.getItems()[0]);
          }
          makePublic(e = 3e4) {
            return this.put({ public: !0 }, e);
          }
          makeUnpublic(e = 3e4) {
            return this.put({ public: !1 }, e);
          }
          addGroupPermission(e, t = 3e4) {
            return this.getGroupPermissions(null, t)
              .then((t) => t.post({ grp_name: e }), t)
              .then((e) => e.getItems()[0]);
          }
          addUserPermission(e, t = 3e4) {
            return this.getUserPermissions(null, t)
              .then((t) => t.post({ username: e }), t)
              .then((e) => e.getItems()[0]);
          }
          put(e, t = 3e4) {
            return this._put(e, null, t);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class li extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = pi));
          }
          getChrisInstance(e = 3e4) {
            const t = Un;
            return this._getResource('chrisinstance', t, null, e);
          }
          getPublicFeeds(e = null, t = 3e4) {
            const n = ui;
            return this._getResource('public_feeds', n, e, t);
          }
          getComputeResources(e = null, t = 3e4) {
            const n = Fs;
            return this._getResource('compute_resources', n, e, t);
          }
          getPluginMetas(e = null, t = 3e4) {
            const n = Cs;
            return this._getResource('plugin_metas', n, e, t);
          }
          getPlugins(e = null, t = 3e4) {
            const n = Os;
            return this._getResource('plugins', n, e, t);
          }
          getPluginAdmins(e = null, t = 3e4) {
            const n = zs;
            return this._getResource('admin', n, e, t);
          }
          getPluginInstances(e = null, t = 3e4) {
            const n = bs;
            return this._getResource('plugin_instances', n, e, t);
          }
          getPipelines(e = null, t = 3e4) {
            const n = os;
            return this._getResource('pipelines', n, e, t);
          }
          getTags(e = null, t = 3e4) {
            const n = ti;
            return this._getResource('tags', n, e, t);
          }
          getPipelineSourceFiles(e = null, t = 3e4) {
            const n = ms;
            return this._getResource('pipelinesourcefiles', n, e, t);
          }
          getUserFiles(e = null, t = 3e4) {
            const n = qs;
            return this._getResource('userfiles', n, e, t);
          }
          getPACSFiles(e = null, t = 3e4) {
            const n = Hs;
            return this._getResource('pacsfiles', n, e, t);
          }
          getPACSSeriesList(e = null, t = 3e4) {
            const n = Ms;
            return this._getResource('pacsseries', n, e, t);
          }
          getPACSList(e = null, t = 3e4) {
            const n = Ys;
            return this._getResource('pacs', n, e, t);
          }
          getPACSQueryList(e = null, t = 3e4) {
            const n = Ws;
            return this._getResource('pacsqueries', n, e, t);
          }
          getFileBrowserFolders(e = null, t = 3e4) {
            const n = Dn;
            return this._getResource('filebrowser', n, e, t);
          }
          getGroups(e = null, t = 3e4) {
            const n = Fn;
            return this._getResource('groups', n, e, t);
          }
          getUser(e = 3e4) {
            const t = Bn;
            return this._getResource('user', t, null, e);
          }
        }
        class ui extends On {
          constructor(e, t = null) {
            (super(e, t), (this.itemClass = pi));
          }
        }
        class di extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          getGroup(e = 3e4) {
            const t = An;
            return this._getResource('group', t, null, e);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class mi extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = di));
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class fi extends Sn {
          constructor(e, t) {
            super(e, t);
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          getUser(e = 3e4) {
            const t = Bn;
            return this._getResource('user', t, null, e);
          }
          delete(e = 3e4) {
            return this._delete(e);
          }
        }
        class hi extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = fi));
          }
          getFeed(e = 3e4) {
            const t = pi;
            return this._getResource('feed', t, null, e);
          }
          post(e, t = 3e4) {
            return this._post(e, null, t);
          }
        }
        class xi extends Sn {
          constructor(e, t) {
            super(e, t);
          }
        }
        class gi extends On {
          constructor(e, t) {
            (super(e, t), (this.itemClass = xi));
          }
          post(e = 3e4) {
            return this._post({}, null, e);
          }
        }
        const vi = class {
          constructor(e, t = null) {
            ((this.url = e),
              (this.auth = t),
              (this.feedsUrl = this.url),
              (this.publicFeedsUrl = ''),
              (this.chrisInstanceUrl = ''),
              (this.computeResourcesUrl = ''),
              (this.pluginMetasUrl = ''),
              (this.pluginsUrl = ''),
              (this.pluginInstancesUrl = ''),
              (this.pipelinesUrl = ''),
              (this.workflowsUrl = ''),
              (this.tagsUrl = ''),
              (this.pipelineSourceFilesUrl = ''),
              (this.userFilesUrl = ''),
              (this.pacsFilesUrl = ''),
              (this.pacsUrl = ''),
              (this.pacsQueriesUrl = ''),
              (this.pacsSeriesUrl = ''),
              (this.fileBrowserUrl = ''),
              (this.downloadTokensUrl = ''),
              (this.groupsUrl = ''),
              (this.userUrl = ''),
              (this.adminUrl = ''));
          }
          setUrls(e = 3e4) {
            return this.getFeeds(null, e);
          }
          getChrisInstance(e = 3e4) {
            return this._fetchRes('chrisInstanceUrl', Un, null, e);
          }
          getFeeds(e = null, t = 3e4) {
            return new li(this.feedsUrl, this.auth).get(e, t).then((e) => {
              const t = e.collection,
                n = jn.getLinkRelationUrls;
              return (
                (this.chrisInstanceUrl = this.chrisInstanceUrl || n(t, 'chrisinstance')[0]),
                (this.publicFeedsUrl = this.publicFeedsUrl || n(t, 'public_feeds')[0]),
                (this.computeResourcesUrl =
                  this.computeResourcesUrl || n(t, 'compute_resources')[0]),
                (this.pluginMetasUrl = this.pluginMetasUrl || n(t, 'plugin_metas')[0]),
                (this.pluginsUrl = this.pluginsUrl || n(t, 'plugins')[0]),
                (this.pluginInstancesUrl = this.pluginInstancesUrl || n(t, 'plugin_instances')[0]),
                (this.pipelinesUrl = this.pipelinesUrl || n(t, 'pipelines')[0]),
                (this.workflowsUrl = this.workflowsUrl || n(t, 'workflows')[0]),
                (this.tagsUrl = this.tagsUrl || n(t, 'tags')[0]),
                (this.pipelineSourceFilesUrl =
                  this.pipelineSourceFilesUrl || n(t, 'pipelinesourcefiles')[0]),
                (this.userFilesUrl = this.userFilesUrl || n(t, 'userfiles')[0]),
                (this.pacsFilesUrl = this.pacsFilesUrl || n(t, 'pacsfiles')[0]),
                (this.pacsUrl = this.pacsUrl || n(t, 'pacs')[0]),
                (this.pacsQueriesUrl = this.pacsQueriesUrl || n(t, 'pacsqueries')[0]),
                (this.pacsSeriesUrl = this.pacsSeriesUrl || n(t, 'pacsseries')[0]),
                (this.fileBrowserUrl = this.fileBrowserUrl || n(t, 'filebrowser')[0]),
                this.downloadTokensUrl ||
                  ((this.downloadTokensUrl = n(t, 'download_tokens')),
                  (this.downloadTokensUrl = this.downloadTokensUrl.length
                    ? this.downloadTokensUrl[0]
                    : '')),
                this.groupsUrl ||
                  ((this.groupsUrl = n(t, 'groups')),
                  (this.groupsUrl = this.groupsUrl.length ? this.groupsUrl[0] : '')),
                this.userUrl ||
                  ((this.userUrl = n(t, 'user')),
                  (this.userUrl = this.userUrl.length ? this.userUrl[0] : '')),
                this.adminUrl ||
                  ((this.adminUrl = n(t, 'admin')),
                  (this.adminUrl = this.adminUrl.length ? this.adminUrl[0] : '')),
                e
              );
            });
          }
          getPublicFeeds(e = null, t = 3e4) {
            return this._fetchRes('publicFeedsUrl', ui, e, t);
          }
          getFeed(e, t = 3e4) {
            return this.getFeeds({ id: e }, t).then((t) => t.getItem(e));
          }
          getComputeResources(e = null, t = 3e4) {
            return this._fetchRes('computeResourcesUrl', Fs, e, t);
          }
          getComputeResource(e, t = 3e4) {
            return this.getComputeResources({ id: e }, t).then((t) => t.getItem(e));
          }
          getPluginMetas(e = null, t = 3e4) {
            return this._fetchRes('pluginMetasUrl', Cs, e, t);
          }
          getPluginMeta(e, t = 3e4) {
            return this.getPluginMetas({ id: e }, t).then((t) => t.getItem(e));
          }
          getPlugins(e = null, t = 3e4) {
            return this._fetchRes('pluginsUrl', Os, e, t);
          }
          getPlugin(e, t = 3e4) {
            return this.getPlugins({ id: e }, t).then((t) => t.getItem(e));
          }
          adminUploadPlugin(e, t, n = 3e4) {
            const s = () =>
              new zs(this.adminUrl, this.auth).post(e, t, n).then((e) => e.getItems()[0]);
            return this.adminUrl ? s() : this.setUrls().then(() => s());
          }
          getPluginInstances(e = null, t = 3e4) {
            return this._fetchRes('pluginInstancesUrl', bs, e, t);
          }
          getPluginInstance(e, t = 3e4) {
            return this.getPluginInstances({ id: e }, t).then((t) => t.getItem(e));
          }
          createPluginInstance(e, t, n = 3e4) {
            return this.getPlugin(e, n)
              .then((e) => {
                const s = jn.getLinkRelationUrls(e.collection.items[0], 'instances');
                return new vs(s[0], this.auth).post(t, n);
              })
              .then((e) => e.getItems()[0]);
          }
          createPluginInstanceSplit(e, t = '', n = '', s = 3e4) {
            return this.getPluginInstance(e, s)
              .then((e) => {
                const i = jn.getLinkRelationUrls(e.collection.items[0], 'splits'),
                  a = new ks(i[0], this.auth);
                let o = { filter: t };
                return (n && (o = { filter: t, compute_resource_name: n }), a.post(o, s));
              })
              .then((e) => e.getItems()[0]);
          }
          getPipelines(e = null, t = 3e4) {
            return this._fetchRes('pipelinesUrl', os, e, t);
          }
          getPipeline(e, t = 3e4) {
            return this.getPipelines({ id: e }, t).then((t) => t.getItem(e));
          }
          createPipeline(e, t = 3e4) {
            const n = () =>
              new os(this.pipelinesUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
            return this.pipelinesUrl ? n() : this.setUrls().then(() => n());
          }
          getWorkflows(e = null, t = 3e4) {
            return this._fetchRes('workflowsUrl', xs, e, t);
          }
          getWorkflow(e, t = 3e4) {
            return this.getWorkflows({ id: e }, t).then((t) => t.getItem(e));
          }
          computeWorkflowNodesInfo(e, t = !1) {
            const n = {};
            for (let s of e) {
              let e = s.plugin_piping_id;
              (e in n ||
                (n[e] = {
                  piping_id: e,
                  previous_piping_id: s.previous_plugin_piping_id,
                  compute_resource_name: 'host',
                  title: s.plugin_piping_title,
                  cpu_limit: s.plugin_piping_cpu_limit,
                  memory_limit: s.plugin_piping_memory_limit,
                  gpu_limit: s.plugin_piping_gpu_limit,
                  number_of_workers: s.plugin_piping_number_of_workers,
                  plugin_parameter_defaults: [],
                }),
                (t || null === s.value) &&
                  n[e].plugin_parameter_defaults.push({ name: s.param_name, default: s.value }));
            }
            const s = [];
            for (let e in n)
              (0 === n[e].plugin_parameter_defaults.length && delete n[e].plugin_parameter_defaults,
                s.push(n[e]));
            return s;
          }
          createWorkflow(e, t, n = 3e4) {
            return this.getPipeline(e, n)
              .then((e) => {
                const s = jn.getLinkRelationUrls(e.collection.items[0], 'workflows');
                return new hs(s[0], this.auth).post(t, n);
              })
              .then((e) => e.getItems()[0]);
          }
          getTags(e = null, t = 3e4) {
            return this._fetchRes('tagsUrl', ti, e, t);
          }
          getTag(e, t = 3e4) {
            return this.getTags({ id: e }, t).then((t) => t.getItem(e));
          }
          createTag(e, t = 3e4) {
            const n = () => new ti(this.tagsUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
            return this.tagsUrl ? n() : this.setUrls().then(() => n());
          }
          getPipelineSourceFiles(e = null, t = 3e4) {
            return this._fetchRes('pipelineSourceFilesUrl', ms, e, t);
          }
          getPipelineSourceFile(e, t = 3e4) {
            return this.getPipelineSourceFiles({ id: e }, t).then((t) => t.getItem(e));
          }
          uploadPipelineSourceFile(e, t, n = 3e4) {
            const s = () =>
              new ms(this.pipelineSourceFilesUrl, this.auth)
                .post(e, t, n)
                .then((e) => e.getItems()[0]);
            return this.pipelineSourceFilesUrl ? s() : this.setUrls().then(() => s());
          }
          getUserFiles(e = null, t = 3e4) {
            return this._fetchRes('userFilesUrl', qs, e, t);
          }
          getUserFile(e, t = 3e4) {
            return this.getUserFiles({ id: e }, t).then((t) => t.getItem(e));
          }
          uploadFile(e, t, n = 3e4) {
            const s = () =>
              new qs(this.userFilesUrl, this.auth).post(e, t, n).then((e) => e.getItems()[0]);
            return this.userFilesUrl ? s() : this.setUrls().then(() => s());
          }
          getPACSFiles(e = null, t = 3e4) {
            return this._fetchRes('pacsFilesUrl', Hs, e, t);
          }
          getPACSFile(e, t = 3e4) {
            return this.getPACSFiles({ id: e }, t).then((t) => t.getItem(e));
          }
          getPACSList(e = null, t = 3e4) {
            return this._fetchRes('pacsUrl', Ys, e, t);
          }
          getPACS(e, t = 3e4) {
            return this.getPACSList({ id: e }, t).then((t) => t.getItem(e));
          }
          getPACSQueries(e = null, t = 3e4) {
            return this._fetchRes('pacsQueriesUrl', Vs, e, t);
          }
          getPACSQuery(e, t = 3e4) {
            return this.getPACSQueries({ id: e }, t).then((t) => t.getItem(e));
          }
          createPACSQuery(e, t, n = 3e4) {
            return this.getPACS(e, n)
              .then((e) => {
                const s = jn.getLinkRelationUrls(e.collection.items[0], 'query_list');
                return new Ws(s[0], this.auth).post(t, n);
              })
              .then((e) => e.getItems()[0]);
          }
          createPACSRetrieve(e, t = 3e4) {
            return this.getPACSQuery(e, t)
              .then((e) => {
                const n = jn.getLinkRelationUrls(e.collection.items[0], 'retrieve_list');
                return new Ks(n[0], this.auth).post(t);
              })
              .then((e) => e.getItems()[0]);
          }
          getPACSSeriesList(e = null, t = 3e4) {
            return this._fetchRes('pacsSeriesUrl', Ms, e, t);
          }
          getPACSSeries(e, t = 3e4) {
            return this.getPACSSeriesList({ id: e }, t).then((t) => t.getItem(e));
          }
          getFileBrowserFolders(e = null, t = 3e4) {
            return this._fetchRes('fileBrowserUrl', Dn, e, t);
          }
          getFileBrowserFolder(e, t = 3e4) {
            return this.getFileBrowserFolders({ id: e }, t).then((t) => t.getItem(e));
          }
          getFileBrowserFolderByPath(e = '', t = 3e4) {
            return this.getFileBrowserFolders({ path: e }, t).then((e) => {
              const t = e.getItems();
              return t.length ? t[0] : null;
            });
          }
          createFileBrowserFolder(e, t = 3e4) {
            const n = () =>
              new Dn(this.fileBrowserUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
            return this.fileBrowserUrl ? n() : this.setUrls().then(() => n());
          }
          getDownloadTokens(e = null, t = 3e4) {
            return this._fetchRes('downloadTokensUrl', gi, e, t);
          }
          getDownloadToken(e, t = 3e4) {
            return this.getDownloadTokens({ id: e }, t).then((t) => t.getItem(e));
          }
          createDownloadToken(e = 3e4) {
            const t = () =>
              new gi(this.downloadTokensUrl, this.auth).post(e).then((e) => e.getItems()[0]);
            return this.downloadTokensUrl ? t() : this.setUrls().then(() => t());
          }
          getGroups(e = null, t = 3e4) {
            return this._fetchRes('groupsUrl', Fn, e, t);
          }
          getGroup(e, t = 3e4) {
            return this.getGroups({ id: e }, t).then((t) => t.getItem(e));
          }
          adminCreateGroup(e, t = 3e4) {
            const n = () =>
              new Fn(this.groupsUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
            return this.groupsUrl ? n() : this.setUrls().then(() => n());
          }
          getUser(e = 3e4) {
            return this._fetchRes('userUrl', Bn, null, e);
          }
          static createUser(e, t, n, s, i = 3e4) {
            const a = new En(void 0, 'application/vnd.collection+json', i),
              o = {
                template: {
                  data: [
                    { name: 'username', value: t },
                    { name: 'password', value: n },
                    { name: 'email', value: s },
                  ],
                },
              };
            return a.post(e, o).then((e) => {
              const s = e.data.collection,
                i = s.items[0].href,
                a = new Bn(i, { username: t, password: n });
              return ((a.collection = s), a);
            });
          }
          static getAuthToken(e, t, n, s = 3e4) {
            const i = { username: t, password: n };
            return new En(void 0, 'application/json', s).post(e, i).then((e) => e.data.token);
          }
          static runAsyncTask(e) {
            En.runAsyncTask(e);
          }
          _fetchRes(e, t, n = null, s = 3e4) {
            const i = () => {
              const i = new t(this[e], this.auth);
              return 'searchParams' in i ? i.get(n, s) : i.get(s);
            };
            return this[e] ? i() : this.setUrls().then(() => i());
          }
        };
      })(),
      s
    );
  })()
);
