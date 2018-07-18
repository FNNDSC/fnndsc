!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define('CSAPI', [], t)
      : 'object' == typeof exports
        ? (exports.CSAPI = t())
        : (e.CSAPI = t());
})(window, function() {
  return (function(e) {
    var t = {};
    function n(r) {
      if (t[r]) return t[r].exports;
      var o = (t[r] = { i: r, l: !1, exports: {} });
      return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
      }),
      (n.r = function(e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (
          (n.r(r),
          Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
          2 & t && 'string' != typeof e)
        )
          for (var o in e)
            n.d(
              r,
              o,
              function(t) {
                return e[t];
              }.bind(null, o)
            );
        return r;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 82))
    );
  })([
    function(e, t, n) {
      'use strict';
      var r = n(24),
        o = n(53),
        i = Object.prototype.toString;
      function a(e) {
        return '[object Array]' === i.call(e);
      }
      function u(e) {
        return null !== e && 'object' == typeof e;
      }
      function c(e) {
        return '[object Function]' === i.call(e);
      }
      function s(e, t) {
        if (null != e)
          if (('object' != typeof e && (e = [e]), a(e)))
            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
          else
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);
      }
      e.exports = {
        isArray: a,
        isArrayBuffer: function(e) {
          return '[object ArrayBuffer]' === i.call(e);
        },
        isBuffer: o,
        isFormData: function(e) {
          return 'undefined' != typeof FormData && e instanceof FormData;
        },
        isArrayBufferView: function(e) {
          return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
            ? ArrayBuffer.isView(e)
            : e && e.buffer && e.buffer instanceof ArrayBuffer;
        },
        isString: function(e) {
          return 'string' == typeof e;
        },
        isNumber: function(e) {
          return 'number' == typeof e;
        },
        isObject: u,
        isUndefined: function(e) {
          return void 0 === e;
        },
        isDate: function(e) {
          return '[object Date]' === i.call(e);
        },
        isFile: function(e) {
          return '[object File]' === i.call(e);
        },
        isBlob: function(e) {
          return '[object Blob]' === i.call(e);
        },
        isFunction: c,
        isStream: function(e) {
          return u(e) && c(e.pipe);
        },
        isURLSearchParams: function(e) {
          return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams;
        },
        isStandardBrowserEnv: function() {
          return (
            ('undefined' == typeof navigator || 'ReactNative' !== navigator.product) &&
            'undefined' != typeof window &&
            'undefined' != typeof document
          );
        },
        forEach: s,
        merge: function e() {
          var t = {};
          function n(n, r) {
            'object' == typeof t[r] && 'object' == typeof n ? (t[r] = e(t[r], n)) : (t[r] = n);
          }
          for (var r = 0, o = arguments.length; r < o; r++) s(arguments[r], n);
          return t;
        },
        extend: function(e, t, n) {
          return (
            s(t, function(t, o) {
              e[o] = n && 'function' == typeof t ? r(t, n) : t;
            }),
            e
          );
        },
        trim: function(e) {
          return e.replace(/^\s*/, '').replace(/\s*$/, '');
        },
      };
    },
    function(e, t) {
      var n = (e.exports =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
            ? self
            : Function('return this')());
      'number' == typeof __g && (__g = n);
    },
    function(e, t, n) {
      var r = n(6),
        o = n(31);
      e.exports = n(5)
        ? function(e, t, n) {
            return r.f(e, t, o(1, n));
          }
        : function(e, t, n) {
            return (e[t] = n), e;
          };
    },
    function(e, t, n) {
      var r = n(35)('wks'),
        o = n(16),
        i = n(1).Symbol,
        a = 'function' == typeof i;
      (e.exports = function(e) {
        return r[e] || (r[e] = (a && i[e]) || (a ? i : o)('Symbol.' + e));
      }).store = r;
    },
    function(e, t) {
      var n = {}.hasOwnProperty;
      e.exports = function(e, t) {
        return n.call(e, t);
      };
    },
    function(e, t, n) {
      e.exports = !n(34)(function() {
        return (
          7 !=
          Object.defineProperty({}, 'a', {
            get: function() {
              return 7;
            },
          }).a
        );
      });
    },
    function(e, t, n) {
      var r = n(15),
        o = n(78),
        i = n(77),
        a = Object.defineProperty;
      t.f = n(5)
        ? Object.defineProperty
        : function(e, t, n) {
            if ((r(e), (t = i(t, !0)), r(n), o))
              try {
                return a(e, t, n);
              } catch (e) {}
            if ('get' in n || 'set' in n) throw TypeError('Accessors not supported!');
            return 'value' in n && (e[t] = n.value), e;
          };
    },
    function(e, t) {
      var n = (e.exports = { version: '2.5.7' });
      'number' == typeof __e && (__e = n);
    },
    function(e, t, n) {
      'use strict';
      (function(t) {
        var r = n(0),
          o = n(50),
          i = { 'Content-Type': 'application/x-www-form-urlencoded' };
        function a(e, t) {
          !r.isUndefined(e) && r.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
        }
        var u,
          c = {
            adapter: ('undefined' != typeof XMLHttpRequest
              ? (u = n(23))
              : void 0 !== t && (u = n(23)),
            u),
            transformRequest: [
              function(e, t) {
                return (
                  o(t, 'Content-Type'),
                  r.isFormData(e) ||
                  r.isArrayBuffer(e) ||
                  r.isBuffer(e) ||
                  r.isStream(e) ||
                  r.isFile(e) ||
                  r.isBlob(e)
                    ? e
                    : r.isArrayBufferView(e)
                      ? e.buffer
                      : r.isURLSearchParams(e)
                        ? (a(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                        : r.isObject(e)
                          ? (a(t, 'application/json;charset=utf-8'), JSON.stringify(e))
                          : e
                );
              },
            ],
            transformResponse: [
              function(e) {
                if ('string' == typeof e)
                  try {
                    e = JSON.parse(e);
                  } catch (e) {}
                return e;
              },
            ],
            timeout: 0,
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            validateStatus: function(e) {
              return e >= 200 && e < 300;
            },
          };
        (c.headers = { common: { Accept: 'application/json, text/plain, */*' } }),
          r.forEach(['delete', 'get', 'head'], function(e) {
            c.headers[e] = {};
          }),
          r.forEach(['post', 'put', 'patch'], function(e) {
            c.headers[e] = r.merge(i);
          }),
          (e.exports = c);
      }.call(this, n(51)));
    },
    function(e, t, n) {
      'use strict';
      function r(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), n(18), n(32);
      var o = (function() {
        function e() {
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e);
        }
        var t, n, o;
        return (
          (t = e),
          (o = [
            {
              key: 'getErrorMessage',
              value: function(e) {
                return e.error ? e.error.message : '';
              },
            },
            {
              key: 'getLinkRelationUrls',
              value: function(e, t) {
                return e.links
                  .filter(function(e) {
                    return e.rel === t;
                  })
                  .map(function(e) {
                    return e.href;
                  });
              },
            },
            {
              key: 'getItemDescriptors',
              value: function(e) {
                var t = {},
                  n = !0,
                  r = !1,
                  o = void 0;
                try {
                  for (var i, a = e.data[Symbol.iterator](); !(n = (i = a.next()).done); n = !0) {
                    var u = i.value;
                    t[u.name] = u.value;
                  }
                } catch (e) {
                  (r = !0), (o = e);
                } finally {
                  try {
                    n || null == a.return || a.return();
                  } finally {
                    if (r) throw o;
                  }
                }
                return t;
              },
            },
          ]),
          (n = null) && r(t.prototype, n),
          o && r(t, o),
          e
        );
      })();
      t.default = o;
    },
    function(e, t, n) {
      var r = n(35)('keys'),
        o = n(16);
      e.exports = function(e) {
        return r[e] || (r[e] = o(e));
      };
    },
    function(e, t, n) {
      var r = n(1),
        o = n(2),
        i = n(4),
        a = n(16)('src'),
        u = Function.toString,
        c = ('' + u).split('toString');
      (n(7).inspectSource = function(e) {
        return u.call(e);
      }),
        (e.exports = function(e, t, n, u) {
          var s = 'function' == typeof n;
          s && (i(n, 'name') || o(n, 'name', t)),
            e[t] !== n &&
              (s && (i(n, a) || o(n, a, e[t] ? '' + e[t] : c.join(String(t)))),
              e === r
                ? (e[t] = n)
                : u
                  ? e[t]
                    ? (e[t] = n)
                    : o(e, t, n)
                  : (delete e[t], o(e, t, n)));
        })(Function.prototype, 'toString', function() {
          return ('function' == typeof this && this[a]) || u.call(this);
        });
    },
    function(e, t, n) {
      var r = n(73),
        o = n(30);
      e.exports = function(e) {
        return r(o(e));
      };
    },
    function(e, t) {
      e.exports = {};
    },
    function(e, t) {
      e.exports = function(e) {
        return 'object' == typeof e ? null !== e : 'function' == typeof e;
      };
    },
    function(e, t, n) {
      var r = n(14);
      e.exports = function(e) {
        if (!r(e)) throw TypeError(e + ' is not an object!');
        return e;
      };
    },
    function(e, t) {
      var n = 0,
        r = Math.random();
      e.exports = function(e) {
        return 'Symbol('.concat(void 0 === e ? '' : e, ')_', (++n + r).toString(36));
      };
    },
    function(e, t) {
      e.exports = !1;
    },
    function(e, t, n) {
      n(80)('asyncIterator');
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        return (r =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function(e) {
                return typeof e;
              }
            : function(e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              })(e);
      }
      function o(e, t) {
        return !t || ('object' !== r(t) && 'function' != typeof t)
          ? (function(e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })(e)
          : t;
      }
      function i(e) {
        var t = 'function' == typeof Map ? new Map() : void 0;
        return (i = function(e) {
          if (null === e) return null;
          if ('function' != typeof e)
            throw new TypeError('Super expression must either be null or a function');
          if (void 0 !== t) {
            if (t.has(e)) return t.get(e);
            t.set(e, n);
          }
          function n() {
            return a(e, arguments, c(this).constructor);
          }
          return (
            (n.prototype = Object.create(e.prototype, {
              constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 },
            })),
            u(n, e)
          );
        })(e);
      }
      function a(e, t, n) {
        return (a = (function() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ('function' == typeof Proxy) return !0;
          try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
          } catch (e) {
            return !1;
          }
        })()
          ? Reflect.construct
          : function(e, t, n) {
              var r = [null];
              r.push.apply(r, t);
              var o = new (Function.bind.apply(e, r))();
              return n && u(o, n.prototype), o;
            }).apply(null, arguments);
      }
      function u(e, t) {
        return (u =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          })(e, t);
      }
      function c(e) {
        return (c = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0), n(18);
      var s = (function(e) {
        function t() {
          var e, n;
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, t);
          for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++) i[a] = arguments[a];
          return (
            ((n = o(this, (e = c(t)).call.apply(e, [this].concat(i)))).name = n.constructor.name), n
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              t && u(e, t);
          })(t, i(Error)),
          t
        );
      })();
      t.default = s;
    },
    function(e, t, n) {
      'use strict';
      function r(e) {
        this.message = e;
      }
      (r.prototype.toString = function() {
        return 'Cancel' + (this.message ? ': ' + this.message : '');
      }),
        (r.prototype.__CANCEL__ = !0),
        (e.exports = r);
    },
    function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        return !(!e || !e.__CANCEL__);
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(48);
      e.exports = function(e, t, n, o, i) {
        var a = new Error(e);
        return r(a, t, n, o, i);
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0),
        o = n(49),
        i = n(47),
        a = n(46),
        u = n(45),
        c = n(22),
        s = ('undefined' != typeof window && window.btoa && window.btoa.bind(window)) || n(44);
      e.exports = function(e) {
        return new Promise(function(t, f) {
          var l = e.data,
            p = e.headers;
          r.isFormData(l) && delete p['Content-Type'];
          var h = new XMLHttpRequest(),
            d = 'onreadystatechange',
            v = !1;
          if (
            ('undefined' == typeof window ||
              !window.XDomainRequest ||
              'withCredentials' in h ||
              u(e.url) ||
              ((h = new window.XDomainRequest()),
              (d = 'onload'),
              (v = !0),
              (h.onprogress = function() {}),
              (h.ontimeout = function() {})),
            e.auth)
          ) {
            var y = e.auth.username || '',
              m = e.auth.password || '';
            p.Authorization = 'Basic ' + s(y + ':' + m);
          }
          if (
            (h.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0),
            (h.timeout = e.timeout),
            (h[d] = function() {
              if (
                h &&
                (4 === h.readyState || v) &&
                (0 !== h.status || (h.responseURL && 0 === h.responseURL.indexOf('file:')))
              ) {
                var n = 'getAllResponseHeaders' in h ? a(h.getAllResponseHeaders()) : null,
                  r = {
                    data: e.responseType && 'text' !== e.responseType ? h.response : h.responseText,
                    status: 1223 === h.status ? 204 : h.status,
                    statusText: 1223 === h.status ? 'No Content' : h.statusText,
                    headers: n,
                    config: e,
                    request: h,
                  };
                o(t, f, r), (h = null);
              }
            }),
            (h.onerror = function() {
              f(c('Network Error', e, null, h)), (h = null);
            }),
            (h.ontimeout = function() {
              f(c('timeout of ' + e.timeout + 'ms exceeded', e, 'ECONNABORTED', h)), (h = null);
            }),
            r.isStandardBrowserEnv())
          ) {
            var g = n(43),
              w =
                (e.withCredentials || u(e.url)) && e.xsrfCookieName
                  ? g.read(e.xsrfCookieName)
                  : void 0;
            w && (p[e.xsrfHeaderName] = w);
          }
          if (
            ('setRequestHeader' in h &&
              r.forEach(p, function(e, t) {
                void 0 === l && 'content-type' === t.toLowerCase()
                  ? delete p[t]
                  : h.setRequestHeader(t, e);
              }),
            e.withCredentials && (h.withCredentials = !0),
            e.responseType)
          )
            try {
              h.responseType = e.responseType;
            } catch (t) {
              if ('json' !== e.responseType) throw t;
            }
          'function' == typeof e.onDownloadProgress &&
            h.addEventListener('progress', e.onDownloadProgress),
            'function' == typeof e.onUploadProgress &&
              h.upload &&
              h.upload.addEventListener('progress', e.onUploadProgress),
            e.cancelToken &&
              e.cancelToken.promise.then(function(e) {
                h && (h.abort(), f(e), (h = null));
              }),
            void 0 === l && (l = null),
            h.send(l);
        });
      };
    },
    function(e, t, n) {
      'use strict';
      e.exports = function(e, t) {
        return function() {
          for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
          return e.apply(t, n);
        };
      };
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0);
      var r = a(n(55)),
        o = a(n(9)),
        i = a(n(19));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function u(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      var c = (function() {
        function e(t, n) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e4;
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.auth = t),
            (this.contentType = n),
            (this.timeout = r);
        }
        var t, n, a;
        return (
          (t = e),
          (a = [
            {
              key: '_callAxios',
              value: function(t) {
                return (0, r.default)(t)
                  .then(function(e) {
                    return e.data;
                  })
                  .catch(function(t) {
                    e._handleRequestError(t);
                  });
              },
            },
            {
              key: '_handleRequestError',
              value: function(e) {
                var t;
                throw (e.response
                  ? ((t = e.response),
                    e.response.data.collection &&
                      (t = o.default.getErrorMessage(e.response.data.collection)))
                  : (t = e.request ? e.request : e.message),
                new i.default(t));
              },
            },
          ]),
          (n = [
            {
              key: 'get',
              value: function(t, n) {
                var r = this._getConfig(t, 'get');
                return (r.params = n), e._callAxios(r);
              },
            },
            {
              key: 'post',
              value: function(e, t, n) {
                return this._postOrPut('post', e, t, n);
              },
            },
            {
              key: 'put',
              value: function(e, t, n) {
                return this._postOrPut('put', e, t, n);
              },
            },
            {
              key: 'delete',
              value: function(t) {
                var n = this._getConfig(t, 'delete');
                return e._callAxios(n);
              },
            },
            {
              key: '_postOrPut',
              value: function(t, n, r, o) {
                var i = this._getConfig(n, t);
                if (((i.data = r), o)) {
                  i.headers['content-type'] = 'multipart/form-data';
                  var a = new FormData();
                  a.set('name', r.name),
                    a.set('dock_image', r.dock_image),
                    a.set('public_repo', r.public_repo),
                    a.set('descriptor_file', o),
                    (i.data = a);
                }
                return e._callAxios(i);
              },
            },
            {
              key: '_getConfig',
              value: function(e, t) {
                var n = {
                  url: e,
                  method: t,
                  headers: { Accept: this.contentType, 'content-type': this.contentType },
                  timeout: this.timeout,
                };
                return (
                  this.auth && this.auth.username && this.auth.password
                    ? (n.auth = this.auth)
                    : this.auth &&
                      this.auth.token &&
                      (n.headers.Authorization = 'Token ' + this.auth.token),
                  n
                );
              },
            },
          ]) && u(t.prototype, n),
          a && u(t, a),
          e
        );
      })();
      t.default = c;
    },
    function(e, t, n) {
      var r = n(6).f,
        o = n(4),
        i = n(3)('toStringTag');
      e.exports = function(e, t, n) {
        e && !o((e = n ? e : e.prototype), i) && r(e, i, { configurable: !0, value: t });
      };
    },
    function(e, t) {
      e.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
        ','
      );
    },
    function(e, t) {
      var n = Math.ceil,
        r = Math.floor;
      e.exports = function(e) {
        return isNaN((e = +e)) ? 0 : (e > 0 ? r : n)(e);
      };
    },
    function(e, t, n) {
      var r = n(64),
        o = n(27);
      e.exports =
        Object.keys ||
        function(e) {
          return r(e, o);
        };
    },
    function(e, t) {
      e.exports = function(e) {
        if (null == e) throw TypeError("Can't call method on  " + e);
        return e;
      };
    },
    function(e, t) {
      e.exports = function(e, t) {
        return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
      };
    },
    function(e, t, n) {
      for (
        var r = n(76),
          o = n(29),
          i = n(11),
          a = n(1),
          u = n(2),
          c = n(13),
          s = n(3),
          f = s('iterator'),
          l = s('toStringTag'),
          p = c.Array,
          h = {
            CSSRuleList: !0,
            CSSStyleDeclaration: !1,
            CSSValueList: !1,
            ClientRectList: !1,
            DOMRectList: !1,
            DOMStringList: !1,
            DOMTokenList: !0,
            DataTransferItemList: !1,
            FileList: !1,
            HTMLAllCollection: !1,
            HTMLCollection: !1,
            HTMLFormElement: !1,
            HTMLSelectElement: !1,
            MediaList: !0,
            MimeTypeArray: !1,
            NamedNodeMap: !1,
            NodeList: !0,
            PaintRequestList: !1,
            Plugin: !1,
            PluginArray: !1,
            SVGLengthList: !1,
            SVGNumberList: !1,
            SVGPathSegList: !1,
            SVGPointList: !1,
            SVGStringList: !1,
            SVGTransformList: !1,
            SourceBufferList: !1,
            StyleSheetList: !0,
            TextTrackCueList: !1,
            TextTrackList: !1,
            TouchList: !1,
          },
          d = o(h),
          v = 0;
        v < d.length;
        v++
      ) {
        var y,
          m = d[v],
          g = h[m],
          w = a[m],
          x = w && w.prototype;
        if (x && (x[f] || u(x, f, p), x[l] || u(x, l, m), (c[m] = p), g))
          for (y in r) x[y] || i(x, y, r[y], !0);
      }
    },
    function(e, t, n) {
      var r = n(14),
        o = n(1).document,
        i = r(o) && r(o.createElement);
      e.exports = function(e) {
        return i ? o.createElement(e) : {};
      };
    },
    function(e, t) {
      e.exports = function(e) {
        try {
          return !!e();
        } catch (e) {
          return !0;
        }
      };
    },
    function(e, t, n) {
      var r = n(7),
        o = n(1),
        i = o['__core-js_shared__'] || (o['__core-js_shared__'] = {});
      (e.exports = function(e, t) {
        return i[e] || (i[e] = void 0 !== t ? t : {});
      })('versions', []).push({
        version: r.version,
        mode: n(17) ? 'pure' : 'global',
        copyright: '© 2018 Denis Pushkarev (zloirock.ru)',
      });
    },
    function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        return function(t) {
          return e.apply(null, t);
        };
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(20);
      function o(e) {
        if ('function' != typeof e) throw new TypeError('executor must be a function.');
        var t;
        this.promise = new Promise(function(e) {
          t = e;
        });
        var n = this;
        e(function(e) {
          n.reason || ((n.reason = new r(e)), t(n.reason));
        });
      }
      (o.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason;
      }),
        (o.source = function() {
          var e;
          return {
            token: new o(function(t) {
              e = t;
            }),
            cancel: e,
          };
        }),
        (e.exports = o);
    },
    function(e, t, n) {
      'use strict';
      e.exports = function(e, t) {
        return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
      };
    },
    function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0);
      e.exports = function(e, t, n) {
        return (
          r.forEach(n, function(n) {
            e = n(e, t);
          }),
          e
        );
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0),
        o = n(40),
        i = n(21),
        a = n(8),
        u = n(39),
        c = n(38);
      function s(e) {
        e.cancelToken && e.cancelToken.throwIfRequested();
      }
      e.exports = function(e) {
        return (
          s(e),
          e.baseURL && !u(e.url) && (e.url = c(e.baseURL, e.url)),
          (e.headers = e.headers || {}),
          (e.data = o(e.data, e.headers, e.transformRequest)),
          (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {})),
          r.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function(t) {
            delete e.headers[t];
          }),
          (e.adapter || a.adapter)(e).then(
            function(t) {
              return s(e), (t.data = o(t.data, t.headers, e.transformResponse)), t;
            },
            function(t) {
              return (
                i(t) ||
                  (s(e),
                  t &&
                    t.response &&
                    (t.response.data = o(
                      t.response.data,
                      t.response.headers,
                      e.transformResponse
                    ))),
                Promise.reject(t)
              );
            }
          )
        );
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0);
      function o() {
        this.handlers = [];
      }
      (o.prototype.use = function(e, t) {
        return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
      }),
        (o.prototype.eject = function(e) {
          this.handlers[e] && (this.handlers[e] = null);
        }),
        (o.prototype.forEach = function(e) {
          r.forEach(this.handlers, function(t) {
            null !== t && e(t);
          });
        }),
        (e.exports = o);
    },
    function(e, t, n) {
      'use strict';
      var r = n(0);
      e.exports = r.isStandardBrowserEnv()
        ? {
            write: function(e, t, n, o, i, a) {
              var u = [];
              u.push(e + '=' + encodeURIComponent(t)),
                r.isNumber(n) && u.push('expires=' + new Date(n).toGMTString()),
                r.isString(o) && u.push('path=' + o),
                r.isString(i) && u.push('domain=' + i),
                !0 === a && u.push('secure'),
                (document.cookie = u.join('; '));
            },
            read: function(e) {
              var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
              return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function(e) {
              this.write(e, '', Date.now() - 864e5);
            },
          }
        : {
            write: function() {},
            read: function() {
              return null;
            },
            remove: function() {},
          };
    },
    function(e, t, n) {
      'use strict';
      var r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      function o() {
        this.message = 'String contains an invalid character';
      }
      (o.prototype = new Error()),
        (o.prototype.code = 5),
        (o.prototype.name = 'InvalidCharacterError'),
        (e.exports = function(e) {
          for (
            var t, n, i = String(e), a = '', u = 0, c = r;
            i.charAt(0 | u) || ((c = '='), u % 1);
            a += c.charAt(63 & (t >> (8 - (u % 1) * 8)))
          ) {
            if ((n = i.charCodeAt((u += 0.75))) > 255) throw new o();
            t = (t << 8) | n;
          }
          return a;
        });
    },
    function(e, t, n) {
      'use strict';
      var r = n(0);
      e.exports = r.isStandardBrowserEnv()
        ? (function() {
            var e,
              t = /(msie|trident)/i.test(navigator.userAgent),
              n = document.createElement('a');
            function o(e) {
              var r = e;
              return (
                t && (n.setAttribute('href', r), (r = n.href)),
                n.setAttribute('href', r),
                {
                  href: n.href,
                  protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                  host: n.host,
                  search: n.search ? n.search.replace(/^\?/, '') : '',
                  hash: n.hash ? n.hash.replace(/^#/, '') : '',
                  hostname: n.hostname,
                  port: n.port,
                  pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname,
                }
              );
            }
            return (
              (e = o(window.location.href)),
              function(t) {
                var n = r.isString(t) ? o(t) : t;
                return n.protocol === e.protocol && n.host === e.host;
              }
            );
          })()
        : function() {
            return !0;
          };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0),
        o = [
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
        ];
      e.exports = function(e) {
        var t,
          n,
          i,
          a = {};
        return e
          ? (r.forEach(e.split('\n'), function(e) {
              if (
                ((i = e.indexOf(':')),
                (t = r.trim(e.substr(0, i)).toLowerCase()),
                (n = r.trim(e.substr(i + 1))),
                t)
              ) {
                if (a[t] && o.indexOf(t) >= 0) return;
                a[t] =
                  'set-cookie' === t ? (a[t] ? a[t] : []).concat([n]) : a[t] ? a[t] + ', ' + n : n;
              }
            }),
            a)
          : a;
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0);
      function o(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
      }
      e.exports = function(e, t, n) {
        if (!t) return e;
        var i;
        if (n) i = n(t);
        else if (r.isURLSearchParams(t)) i = t.toString();
        else {
          var a = [];
          r.forEach(t, function(e, t) {
            null != e &&
              (r.isArray(e) ? (t += '[]') : (e = [e]),
              r.forEach(e, function(e) {
                r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)),
                  a.push(o(t) + '=' + o(e));
              }));
          }),
            (i = a.join('&'));
        }
        return i && (e += (-1 === e.indexOf('?') ? '?' : '&') + i), e;
      };
    },
    function(e, t, n) {
      'use strict';
      e.exports = function(e, t, n, r, o) {
        return (e.config = t), n && (e.code = n), (e.request = r), (e.response = o), e;
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(22);
      e.exports = function(e, t, n) {
        var o = n.config.validateStatus;
        n.status && o && !o(n.status)
          ? t(r('Request failed with status code ' + n.status, n.config, null, n.request, n))
          : e(n);
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0);
      e.exports = function(e, t) {
        r.forEach(e, function(n, r) {
          r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
        });
      };
    },
    function(e, t) {
      var n,
        r,
        o = (e.exports = {});
      function i() {
        throw new Error('setTimeout has not been defined');
      }
      function a() {
        throw new Error('clearTimeout has not been defined');
      }
      function u(e) {
        if (n === setTimeout) return setTimeout(e, 0);
        if ((n === i || !n) && setTimeout) return (n = setTimeout), setTimeout(e, 0);
        try {
          return n(e, 0);
        } catch (t) {
          try {
            return n.call(null, e, 0);
          } catch (t) {
            return n.call(this, e, 0);
          }
        }
      }
      !(function() {
        try {
          n = 'function' == typeof setTimeout ? setTimeout : i;
        } catch (e) {
          n = i;
        }
        try {
          r = 'function' == typeof clearTimeout ? clearTimeout : a;
        } catch (e) {
          r = a;
        }
      })();
      var c,
        s = [],
        f = !1,
        l = -1;
      function p() {
        f && c && ((f = !1), c.length ? (s = c.concat(s)) : (l = -1), s.length && h());
      }
      function h() {
        if (!f) {
          var e = u(p);
          f = !0;
          for (var t = s.length; t; ) {
            for (c = s, s = []; ++l < t; ) c && c[l].run();
            (l = -1), (t = s.length);
          }
          (c = null),
            (f = !1),
            (function(e) {
              if (r === clearTimeout) return clearTimeout(e);
              if ((r === a || !r) && clearTimeout) return (r = clearTimeout), clearTimeout(e);
              try {
                r(e);
              } catch (t) {
                try {
                  return r.call(null, e);
                } catch (t) {
                  return r.call(this, e);
                }
              }
            })(e);
        }
      }
      function d(e, t) {
        (this.fun = e), (this.array = t);
      }
      function v() {}
      (o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        s.push(new d(e, t)), 1 !== s.length || f || u(h);
      }),
        (d.prototype.run = function() {
          this.fun.apply(null, this.array);
        }),
        (o.title = 'browser'),
        (o.browser = !0),
        (o.env = {}),
        (o.argv = []),
        (o.version = ''),
        (o.versions = {}),
        (o.on = v),
        (o.addListener = v),
        (o.once = v),
        (o.off = v),
        (o.removeListener = v),
        (o.removeAllListeners = v),
        (o.emit = v),
        (o.prependListener = v),
        (o.prependOnceListener = v),
        (o.listeners = function(e) {
          return [];
        }),
        (o.binding = function(e) {
          throw new Error('process.binding is not supported');
        }),
        (o.cwd = function() {
          return '/';
        }),
        (o.chdir = function(e) {
          throw new Error('process.chdir is not supported');
        }),
        (o.umask = function() {
          return 0;
        });
    },
    function(e, t, n) {
      'use strict';
      var r = n(8),
        o = n(0),
        i = n(42),
        a = n(41);
      function u(e) {
        (this.defaults = e), (this.interceptors = { request: new i(), response: new i() });
      }
      (u.prototype.request = function(e) {
        'string' == typeof e && (e = o.merge({ url: arguments[0] }, arguments[1])),
          ((e = o.merge(r, { method: 'get' }, this.defaults, e)).method = e.method.toLowerCase());
        var t = [a, void 0],
          n = Promise.resolve(e);
        for (
          this.interceptors.request.forEach(function(e) {
            t.unshift(e.fulfilled, e.rejected);
          }),
            this.interceptors.response.forEach(function(e) {
              t.push(e.fulfilled, e.rejected);
            });
          t.length;

        )
          n = n.then(t.shift(), t.shift());
        return n;
      }),
        o.forEach(['delete', 'get', 'head', 'options'], function(e) {
          u.prototype[e] = function(t, n) {
            return this.request(o.merge(n || {}, { method: e, url: t }));
          };
        }),
        o.forEach(['post', 'put', 'patch'], function(e) {
          u.prototype[e] = function(t, n, r) {
            return this.request(o.merge(r || {}, { method: e, url: t, data: n }));
          };
        }),
        (e.exports = u);
    },
    function(e, t) {
      function n(e) {
        return (
          !!e.constructor &&
          'function' == typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      }
      /*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
      e.exports = function(e) {
        return (
          null != e &&
          (n(e) ||
            (function(e) {
              return (
                'function' == typeof e.readFloatLE &&
                'function' == typeof e.slice &&
                n(e.slice(0, 0))
              );
            })(e) ||
            !!e._isBuffer)
        );
      };
    },
    function(e, t, n) {
      'use strict';
      var r = n(0),
        o = n(24),
        i = n(52),
        a = n(8);
      function u(e) {
        var t = new i(e),
          n = o(i.prototype.request, t);
        return r.extend(n, i.prototype, t), r.extend(n, t), n;
      }
      var c = u(a);
      (c.Axios = i),
        (c.create = function(e) {
          return u(r.merge(a, e));
        }),
        (c.Cancel = n(20)),
        (c.CancelToken = n(37)),
        (c.isCancel = n(21)),
        (c.all = function(e) {
          return Promise.all(e);
        }),
        (c.spread = n(36)),
        (e.exports = c),
        (e.exports.default = c);
    },
    function(e, t, n) {
      e.exports = n(54);
    },
    function(e, t) {
      var n;
      n = (function() {
        return this;
      })();
      try {
        n = n || Function('return this')() || (0, eval)('this');
      } catch (e) {
        'object' == typeof window && (n = window);
      }
      e.exports = n;
    },
    function(e, t, n) {
      (function(t) {
        !(function(t) {
          'use strict';
          var n,
            r = Object.prototype,
            o = r.hasOwnProperty,
            i = 'function' == typeof Symbol ? Symbol : {},
            a = i.iterator || '@@iterator',
            u = i.asyncIterator || '@@asyncIterator',
            c = i.toStringTag || '@@toStringTag',
            s = 'object' == typeof e,
            f = t.regeneratorRuntime;
          if (f) s && (e.exports = f);
          else {
            (f = t.regeneratorRuntime = s ? e.exports : {}).wrap = x;
            var l = 'suspendedStart',
              p = 'suspendedYield',
              h = 'executing',
              d = 'completed',
              v = {},
              y = {};
            y[a] = function() {
              return this;
            };
            var m = Object.getPrototypeOf,
              g = m && m(m(R([])));
            g && g !== r && o.call(g, a) && (y = g);
            var w = (P.prototype = k.prototype = Object.create(y));
            (_.prototype = w.constructor = P),
              (P.constructor = _),
              (P[c] = _.displayName = 'GeneratorFunction'),
              (f.isGeneratorFunction = function(e) {
                var t = 'function' == typeof e && e.constructor;
                return !!t && (t === _ || 'GeneratorFunction' === (t.displayName || t.name));
              }),
              (f.mark = function(e) {
                return (
                  Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, P)
                    : ((e.__proto__ = P), c in e || (e[c] = 'GeneratorFunction')),
                  (e.prototype = Object.create(w)),
                  e
                );
              }),
              (f.awrap = function(e) {
                return { __await: e };
              }),
              T(S.prototype),
              (S.prototype[u] = function() {
                return this;
              }),
              (f.AsyncIterator = S),
              (f.async = function(e, t, n, r) {
                var o = new S(x(e, t, n, r));
                return f.isGeneratorFunction(t)
                  ? o
                  : o.next().then(function(e) {
                      return e.done ? e.value : o.next();
                    });
              }),
              T(w),
              (w[c] = 'Generator'),
              (w[a] = function() {
                return this;
              }),
              (w.toString = function() {
                return '[object Generator]';
              }),
              (f.keys = function(e) {
                var t = [];
                for (var n in e) t.push(n);
                return (
                  t.reverse(),
                  function n() {
                    for (; t.length; ) {
                      var r = t.pop();
                      if (r in e) return (n.value = r), (n.done = !1), n;
                    }
                    return (n.done = !0), n;
                  }
                );
              }),
              (f.values = R),
              (E.prototype = {
                constructor: E,
                reset: function(e) {
                  if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = n),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = 'next'),
                    (this.arg = n),
                    this.tryEntries.forEach(O),
                    !e)
                  )
                    for (var t in this)
                      't' === t.charAt(0) &&
                        o.call(this, t) &&
                        !isNaN(+t.slice(1)) &&
                        (this[t] = n);
                },
                stop: function() {
                  this.done = !0;
                  var e = this.tryEntries[0].completion;
                  if ('throw' === e.type) throw e.arg;
                  return this.rval;
                },
                dispatchException: function(e) {
                  if (this.done) throw e;
                  var t = this;
                  function r(r, o) {
                    return (
                      (u.type = 'throw'),
                      (u.arg = e),
                      (t.next = r),
                      o && ((t.method = 'next'), (t.arg = n)),
                      !!o
                    );
                  }
                  for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var a = this.tryEntries[i],
                      u = a.completion;
                    if ('root' === a.tryLoc) return r('end');
                    if (a.tryLoc <= this.prev) {
                      var c = o.call(a, 'catchLoc'),
                        s = o.call(a, 'finallyLoc');
                      if (c && s) {
                        if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                        if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                      } else if (c) {
                        if (this.prev < a.catchLoc) return r(a.catchLoc, !0);
                      } else {
                        if (!s) throw new Error('try statement without catch or finally');
                        if (this.prev < a.finallyLoc) return r(a.finallyLoc);
                      }
                    }
                  }
                },
                abrupt: function(e, t) {
                  for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var r = this.tryEntries[n];
                    if (
                      r.tryLoc <= this.prev &&
                      o.call(r, 'finallyLoc') &&
                      this.prev < r.finallyLoc
                    ) {
                      var i = r;
                      break;
                    }
                  }
                  i &&
                    ('break' === e || 'continue' === e) &&
                    i.tryLoc <= t &&
                    t <= i.finallyLoc &&
                    (i = null);
                  var a = i ? i.completion : {};
                  return (
                    (a.type = e),
                    (a.arg = t),
                    i ? ((this.method = 'next'), (this.next = i.finallyLoc), v) : this.complete(a)
                  );
                },
                complete: function(e, t) {
                  if ('throw' === e.type) throw e.arg;
                  return (
                    'break' === e.type || 'continue' === e.type
                      ? (this.next = e.arg)
                      : 'return' === e.type
                        ? ((this.rval = this.arg = e.arg),
                          (this.method = 'return'),
                          (this.next = 'end'))
                        : 'normal' === e.type && t && (this.next = t),
                    v
                  );
                },
                finish: function(e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), O(n), v;
                  }
                },
                catch: function(e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                      var r = n.completion;
                      if ('throw' === r.type) {
                        var o = r.arg;
                        O(n);
                      }
                      return o;
                    }
                  }
                  throw new Error('illegal catch attempt');
                },
                delegateYield: function(e, t, r) {
                  return (
                    (this.delegate = { iterator: R(e), resultName: t, nextLoc: r }),
                    'next' === this.method && (this.arg = n),
                    v
                  );
                },
              });
          }
          function x(e, t, n, r) {
            var o = t && t.prototype instanceof k ? t : k,
              i = Object.create(o.prototype),
              a = new E(r || []);
            return (
              (i._invoke = (function(e, t, n) {
                var r = l;
                return function(o, i) {
                  if (r === h) throw new Error('Generator is already running');
                  if (r === d) {
                    if ('throw' === o) throw i;
                    return A();
                  }
                  for (n.method = o, n.arg = i; ; ) {
                    var a = n.delegate;
                    if (a) {
                      var u = L(a, n);
                      if (u) {
                        if (u === v) continue;
                        return u;
                      }
                    }
                    if ('next' === n.method) n.sent = n._sent = n.arg;
                    else if ('throw' === n.method) {
                      if (r === l) throw ((r = d), n.arg);
                      n.dispatchException(n.arg);
                    } else 'return' === n.method && n.abrupt('return', n.arg);
                    r = h;
                    var c = b(e, t, n);
                    if ('normal' === c.type) {
                      if (((r = n.done ? d : p), c.arg === v)) continue;
                      return { value: c.arg, done: n.done };
                    }
                    'throw' === c.type && ((r = d), (n.method = 'throw'), (n.arg = c.arg));
                  }
                };
              })(e, n, a)),
              i
            );
          }
          function b(e, t, n) {
            try {
              return { type: 'normal', arg: e.call(t, n) };
            } catch (e) {
              return { type: 'throw', arg: e };
            }
          }
          function k() {}
          function _() {}
          function P() {}
          function T(e) {
            ['next', 'throw', 'return'].forEach(function(t) {
              e[t] = function(e) {
                return this._invoke(t, e);
              };
            });
          }
          function S(e) {
            function n(t, r, i, a) {
              var u = b(e[t], e, r);
              if ('throw' !== u.type) {
                var c = u.arg,
                  s = c.value;
                return s && 'object' == typeof s && o.call(s, '__await')
                  ? Promise.resolve(s.__await).then(
                      function(e) {
                        n('next', e, i, a);
                      },
                      function(e) {
                        n('throw', e, i, a);
                      }
                    )
                  : Promise.resolve(s).then(function(e) {
                      (c.value = e), i(c);
                    }, a);
              }
              a(u.arg);
            }
            var r;
            'object' == typeof t.process && t.process.domain && (n = t.process.domain.bind(n)),
              (this._invoke = function(e, t) {
                function o() {
                  return new Promise(function(r, o) {
                    n(e, t, r, o);
                  });
                }
                return (r = r ? r.then(o, o) : o());
              });
          }
          function L(e, t) {
            var r = e.iterator[t.method];
            if (r === n) {
              if (((t.delegate = null), 'throw' === t.method)) {
                if (
                  e.iterator.return &&
                  ((t.method = 'return'), (t.arg = n), L(e, t), 'throw' === t.method)
                )
                  return v;
                (t.method = 'throw'),
                  (t.arg = new TypeError("The iterator does not provide a 'throw' method"));
              }
              return v;
            }
            var o = b(r, e.iterator, t.arg);
            if ('throw' === o.type)
              return (t.method = 'throw'), (t.arg = o.arg), (t.delegate = null), v;
            var i = o.arg;
            return i
              ? i.done
                ? ((t[e.resultName] = i.value),
                  (t.next = e.nextLoc),
                  'return' !== t.method && ((t.method = 'next'), (t.arg = n)),
                  (t.delegate = null),
                  v)
                : i
              : ((t.method = 'throw'),
                (t.arg = new TypeError('iterator result is not an object')),
                (t.delegate = null),
                v);
          }
          function j(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function O(e) {
            var t = e.completion || {};
            (t.type = 'normal'), delete t.arg, (e.completion = t);
          }
          function E(e) {
            (this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(j, this), this.reset(!0);
          }
          function R(e) {
            if (e) {
              var t = e[a];
              if (t) return t.call(e);
              if ('function' == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var r = -1,
                  i = function t() {
                    for (; ++r < e.length; )
                      if (o.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                    return (t.value = n), (t.done = !0), t;
                  };
                return (i.next = i);
              }
            }
            return { next: A };
          }
          function A() {
            return { value: n, done: !0 };
          }
        })(
          'object' == typeof t
            ? t
            : 'object' == typeof window
              ? window
              : 'object' == typeof self
                ? self
                : this
        );
      }.call(this, n(56)));
    },
    function(e, t, n) {
      var r = n(30);
      e.exports = function(e) {
        return Object(r(e));
      };
    },
    function(e, t, n) {
      var r = n(4),
        o = n(58),
        i = n(10)('IE_PROTO'),
        a = Object.prototype;
      e.exports =
        Object.getPrototypeOf ||
        function(e) {
          return (
            (e = o(e)),
            r(e, i)
              ? e[i]
              : 'function' == typeof e.constructor && e instanceof e.constructor
                ? e.constructor.prototype
                : e instanceof Object
                  ? a
                  : null
          );
        };
    },
    function(e, t, n) {
      var r = n(1).document;
      e.exports = r && r.documentElement;
    },
    function(e, t, n) {
      var r = n(28),
        o = Math.max,
        i = Math.min;
      e.exports = function(e, t) {
        return (e = r(e)) < 0 ? o(e + t, 0) : i(e, t);
      };
    },
    function(e, t, n) {
      var r = n(28),
        o = Math.min;
      e.exports = function(e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0;
      };
    },
    function(e, t, n) {
      var r = n(12),
        o = n(62),
        i = n(61);
      e.exports = function(e) {
        return function(t, n, a) {
          var u,
            c = r(t),
            s = o(c.length),
            f = i(a, s);
          if (e && n != n) {
            for (; s > f; ) if ((u = c[f++]) != u) return !0;
          } else for (; s > f; f++) if ((e || f in c) && c[f] === n) return e || f || 0;
          return !e && -1;
        };
      };
    },
    function(e, t, n) {
      var r = n(4),
        o = n(12),
        i = n(63)(!1),
        a = n(10)('IE_PROTO');
      e.exports = function(e, t) {
        var n,
          u = o(e),
          c = 0,
          s = [];
        for (n in u) n != a && r(u, n) && s.push(n);
        for (; t.length > c; ) r(u, (n = t[c++])) && (~i(s, n) || s.push(n));
        return s;
      };
    },
    function(e, t, n) {
      var r = n(6),
        o = n(15),
        i = n(29);
      e.exports = n(5)
        ? Object.defineProperties
        : function(e, t) {
            o(e);
            for (var n, a = i(t), u = a.length, c = 0; u > c; ) r.f(e, (n = a[c++]), t[n]);
            return e;
          };
    },
    function(e, t, n) {
      var r = n(15),
        o = n(65),
        i = n(27),
        a = n(10)('IE_PROTO'),
        u = function() {},
        c = function() {
          var e,
            t = n(33)('iframe'),
            r = i.length;
          for (
            t.style.display = 'none',
              n(60).appendChild(t),
              t.src = 'javascript:',
              (e = t.contentWindow.document).open(),
              e.write('<script>document.F=Object</script>'),
              e.close(),
              c = e.F;
            r--;

          )
            delete c.prototype[i[r]];
          return c();
        };
      e.exports =
        Object.create ||
        function(e, t) {
          var n;
          return (
            null !== e
              ? ((u.prototype = r(e)), (n = new u()), (u.prototype = null), (n[a] = e))
              : (n = c()),
            void 0 === t ? n : o(n, t)
          );
        };
    },
    function(e, t, n) {
      'use strict';
      var r = n(66),
        o = n(31),
        i = n(26),
        a = {};
      n(2)(a, n(3)('iterator'), function() {
        return this;
      }),
        (e.exports = function(e, t, n) {
          (e.prototype = r(a, { next: o(1, n) })), i(e, t + ' Iterator');
        });
    },
    function(e, t) {
      e.exports = function(e) {
        if ('function' != typeof e) throw TypeError(e + ' is not a function!');
        return e;
      };
    },
    function(e, t, n) {
      var r = n(68);
      e.exports = function(e, t, n) {
        if ((r(e), void 0 === t)) return e;
        switch (n) {
          case 1:
            return function(n) {
              return e.call(t, n);
            };
          case 2:
            return function(n, r) {
              return e.call(t, n, r);
            };
          case 3:
            return function(n, r, o) {
              return e.call(t, n, r, o);
            };
        }
        return function() {
          return e.apply(t, arguments);
        };
      };
    },
    function(e, t, n) {
      var r = n(1),
        o = n(7),
        i = n(2),
        a = n(11),
        u = n(69),
        c = function(e, t, n) {
          var s,
            f,
            l,
            p,
            h = e & c.F,
            d = e & c.G,
            v = e & c.S,
            y = e & c.P,
            m = e & c.B,
            g = d ? r : v ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
            w = d ? o : o[t] || (o[t] = {}),
            x = w.prototype || (w.prototype = {});
          for (s in (d && (n = t), n))
            (l = ((f = !h && g && void 0 !== g[s]) ? g : n)[s]),
              (p = m && f ? u(l, r) : y && 'function' == typeof l ? u(Function.call, l) : l),
              g && a(g, s, l, e & c.U),
              w[s] != l && i(w, s, p),
              y && x[s] != l && (x[s] = l);
        };
      (r.core = o),
        (c.F = 1),
        (c.G = 2),
        (c.S = 4),
        (c.P = 8),
        (c.B = 16),
        (c.W = 32),
        (c.U = 64),
        (c.R = 128),
        (e.exports = c);
    },
    function(e, t, n) {
      'use strict';
      var r = n(17),
        o = n(70),
        i = n(11),
        a = n(2),
        u = n(13),
        c = n(67),
        s = n(26),
        f = n(59),
        l = n(3)('iterator'),
        p = !([].keys && 'next' in [].keys()),
        h = function() {
          return this;
        };
      e.exports = function(e, t, n, d, v, y, m) {
        c(n, t, d);
        var g,
          w,
          x,
          b = function(e) {
            if (!p && e in T) return T[e];
            switch (e) {
              case 'keys':
              case 'values':
                return function() {
                  return new n(this, e);
                };
            }
            return function() {
              return new n(this, e);
            };
          },
          k = t + ' Iterator',
          _ = 'values' == v,
          P = !1,
          T = e.prototype,
          S = T[l] || T['@@iterator'] || (v && T[v]),
          L = S || b(v),
          j = v ? (_ ? b('entries') : L) : void 0,
          O = ('Array' == t && T.entries) || S;
        if (
          (O &&
            (x = f(O.call(new e()))) !== Object.prototype &&
            x.next &&
            (s(x, k, !0), r || 'function' == typeof x[l] || a(x, l, h)),
          _ &&
            S &&
            'values' !== S.name &&
            ((P = !0),
            (L = function() {
              return S.call(this);
            })),
          (r && !m) || (!p && !P && T[l]) || a(T, l, L),
          (u[t] = L),
          (u[k] = h),
          v)
        )
          if (((g = { values: _ ? L : b('values'), keys: y ? L : b('keys'), entries: j }), m))
            for (w in g) w in T || i(T, w, g[w]);
          else o(o.P + o.F * (p || P), t, g);
        return g;
      };
    },
    function(e, t) {
      var n = {}.toString;
      e.exports = function(e) {
        return n.call(e).slice(8, -1);
      };
    },
    function(e, t, n) {
      var r = n(72);
      e.exports = Object('z').propertyIsEnumerable(0)
        ? Object
        : function(e) {
            return 'String' == r(e) ? e.split('') : Object(e);
          };
    },
    function(e, t) {
      e.exports = function(e, t) {
        return { value: t, done: !!e };
      };
    },
    function(e, t, n) {
      var r = n(3)('unscopables'),
        o = Array.prototype;
      null == o[r] && n(2)(o, r, {}),
        (e.exports = function(e) {
          o[r][e] = !0;
        });
    },
    function(e, t, n) {
      'use strict';
      var r = n(75),
        o = n(74),
        i = n(13),
        a = n(12);
      (e.exports = n(71)(
        Array,
        'Array',
        function(e, t) {
          (this._t = a(e)), (this._i = 0), (this._k = t);
        },
        function() {
          var e = this._t,
            t = this._k,
            n = this._i++;
          return !e || n >= e.length
            ? ((this._t = void 0), o(1))
            : o(0, 'keys' == t ? n : 'values' == t ? e[n] : [n, e[n]]);
        },
        'values'
      )),
        (i.Arguments = i.Array),
        r('keys'),
        r('values'),
        r('entries');
    },
    function(e, t, n) {
      var r = n(14);
      e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && 'function' == typeof (n = e.toString) && !r((o = n.call(e)))) return o;
        if ('function' == typeof (n = e.valueOf) && !r((o = n.call(e)))) return o;
        if (!t && 'function' == typeof (n = e.toString) && !r((o = n.call(e)))) return o;
        throw TypeError("Can't convert object to primitive value");
      };
    },
    function(e, t, n) {
      e.exports =
        !n(5) &&
        !n(34)(function() {
          return (
            7 !=
            Object.defineProperty(n(33)('div'), 'a', {
              get: function() {
                return 7;
              },
            }).a
          );
        });
    },
    function(e, t, n) {
      t.f = n(3);
    },
    function(e, t, n) {
      var r = n(1),
        o = n(7),
        i = n(17),
        a = n(79),
        u = n(6).f;
      e.exports = function(e) {
        var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
        '_' == e.charAt(0) || e in t || u(t, e, { value: a.f(e) });
      };
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        n(18),
        n(32),
        n(57);
      var r = i(n(9)),
        o = i(n(25));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      var u = (function() {
        function e(t, n) {
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 3e4;
          !(function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          })(this, e),
            (this.storeUrl = t),
            (this.storeQueryUrl = t + 'search/'),
            (this.auth = n),
            (this.timeout = r),
            (this.contentType = 'application/vnd.collection+json');
        }
        var t, n, i;
        return (
          (t = e),
          (i = [
            {
              key: 'createUser',
              value: function(e, t, n, r) {
                var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 3e4,
                  a = {
                    template: {
                      data: [
                        { name: 'username', value: t },
                        { name: 'password', value: n },
                        { name: 'email', value: r },
                      ],
                    },
                  },
                  u = new o.default(void 0, 'application/vnd.collection+json', i).post(e, a);
                return new Promise(function(e, t) {
                  u.then(function(t) {
                    e(t.collection);
                  }).catch(function(e) {
                    t(e);
                  });
                });
              },
            },
            {
              key: 'getAuthToken',
              value: function(e, t, n) {
                var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3e4,
                  i = { username: t, password: n },
                  a = new o.default(void 0, 'application/json', r).post(e, i);
                return new Promise(function(e, t) {
                  a.then(function(t) {
                    e(t.token);
                  }).catch(function(e) {
                    t(e);
                  });
                });
              },
            },
            {
              key: '_runAsyncTask',
              value: function(e) {
                var t = e(),
                  n = t.next();
                !(function e() {
                  n.done ||
                    n.value
                      .then(function(r) {
                        (n = t.next(r)), e();
                      })
                      .catch(function(r) {
                        (n = t.throw(r)), e();
                      });
                })();
              },
            },
          ]),
          (n = [
            {
              key: 'getPlugin',
              value: function(t) {
                var n = this;
                return new Promise(function(i, a) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var u, c, s, f, l, p, h;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (u = new o.default(n.auth, n.contentType, n.timeout)),
                                  (c = { name: t }),
                                  (e.prev = 2),
                                  (e.next = 5),
                                  u.get(n.storeQueryUrl, c)
                                );
                              case 5:
                                if (!(f = e.sent).collection.items.length) {
                                  e.next = 15;
                                  break;
                                }
                                if (
                                  ((l = f.collection.items[0]),
                                  (s = r.default.getItemDescriptors(l)),
                                  !(p = r.default.getLinkRelationUrls(l, 'parameters')).length)
                                ) {
                                  e.next = 15;
                                  break;
                                }
                                return (e.next = 13), n._getParameters(p[0]);
                              case 13:
                                (h = e.sent), (s.parameters = h);
                              case 15:
                                e.next = 20;
                                break;
                              case 17:
                                (e.prev = 17), (e.t0 = e.catch(2)), a(e.t0);
                              case 20:
                                i(s);
                              case 21:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[2, 17]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'getPlugins',
              value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                  n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                  r = this;
                return new Promise(function(o, i) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var a, u;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (a = []), (e.prev = 1), (e.next = 4), r.getPluginsInitialPage(t)
                                );
                              case 4:
                                (u = e.sent), (a = a.concat(u.plugins)), n && n(u);
                              case 7:
                                if (!u.nextLink) {
                                  e.next = 15;
                                  break;
                                }
                                return (e.next = 10), r.getPluginsPage(u.nextLink);
                              case 10:
                                (u = e.sent), (a = a.concat(u.plugins)), n && n(u), (e.next = 7);
                                break;
                              case 15:
                                e.next = 20;
                                break;
                              case 17:
                                (e.prev = 17), (e.t0 = e.catch(1)), i(e.t0);
                              case 20:
                                o(a);
                              case 21:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[1, 17]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'getAuthenticatedUserPlugins',
              value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                  n = this;
                return new Promise(function(i, a) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var u, c, s, f, l;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((u = new o.default(n.auth, n.contentType, n.timeout)),
                                  (c = []),
                                  (e.prev = 2),
                                  !n.auth.username)
                                ) {
                                  e.next = 7;
                                  break;
                                }
                                (f = n.auth.username), (e.next = 15);
                                break;
                              case 7:
                                return (e.next = 9), u.get(n.storeUrl);
                              case 9:
                                return (
                                  (s = e.sent),
                                  (l = r.default.getLinkRelationUrls(s.collection, 'user')[0]),
                                  (e.next = 13),
                                  u.get(l)
                                );
                              case 13:
                                (s = e.sent),
                                  (f = s.collection.items[0].data.filter(function(e) {
                                    return 'username' === e.name;
                                  })[0].value);
                              case 15:
                                return (
                                  (n.auth.username = f),
                                  (e.next = 18),
                                  n.getPlugins({ owner_username: f }, t)
                                );
                              case 18:
                                (c = e.sent), (e.next = 24);
                                break;
                              case 21:
                                (e.prev = 21), (e.t0 = e.catch(2)), a(e.t0);
                              case 24:
                                i(c);
                              case 25:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[2, 21]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'addPlugin',
              value: function(t, n, r, i) {
                var a = this;
                return new Promise(function(u, c) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var s, f, l;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (s = new o.default(a.auth, a.contentType, a.timeout)),
                                  (f = { name: t, dock_image: n, public_repo: i }),
                                  (e.prev = 2),
                                  (e.next = 5),
                                  s.post(a.storeUrl, f, r)
                                );
                              case 5:
                                (l = e.sent), (e.next = 11);
                                break;
                              case 8:
                                (e.prev = 8), (e.t0 = e.catch(2)), c(e.t0);
                              case 11:
                                u(l.collection);
                              case 12:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[2, 8]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'modifyPlugin',
              value: function(t, n, r, i) {
                var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
                  u = this;
                return new Promise(function(c, s) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var f, l, p, h, d;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (f = new o.default(u.auth, u.contentType, u.timeout)),
                                  (e.prev = 1),
                                  (p = { name: t }),
                                  (e.next = 5),
                                  f.get(u.storeQueryUrl, p)
                                );
                              case 5:
                                return (
                                  (l = e.sent),
                                  (h = l.collection.items[0].href),
                                  a && (t = a),
                                  (d = { name: t, dock_image: n, public_repo: i }),
                                  (e.next = 11),
                                  f.put(h, d, r)
                                );
                              case 11:
                                (l = e.sent), (e.next = 17);
                                break;
                              case 14:
                                (e.prev = 14), (e.t0 = e.catch(1)), s(e.t0);
                              case 17:
                                c(l.collection);
                              case 18:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[1, 14]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'removePlugin',
              value: function(t) {
                var n = this;
                return new Promise(function(r, i) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var a, u, c, s;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (a = new o.default(n.auth, n.contentType, n.timeout)),
                                  (u = { name: t }),
                                  (e.prev = 2),
                                  (e.next = 5),
                                  a.get(n.storeQueryUrl, u)
                                );
                              case 5:
                                return (
                                  (c = e.sent),
                                  (s = c.collection.items[0].href),
                                  (e.next = 9),
                                  a.delete(s)
                                );
                              case 9:
                                (c = e.sent), (e.next = 15);
                                break;
                              case 12:
                                (e.prev = 12), (e.t0 = e.catch(2)), i(e.t0);
                              case 15:
                                r();
                              case 16:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[2, 12]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'getPluginsInitialPage',
              value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                return this._getPluginsPage(void 0, e);
              },
            },
            {
              key: 'getPluginsPage',
              value: function(e) {
                return this._getPluginsPage(e);
              },
            },
            {
              key: '_getPluginsPage',
              value: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                  i = this;
                return new Promise(function(a, u) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var c, s, f, l, p, h, d, v, y, m, g, w, x, b;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((c = new o.default(i.auth, i.contentType, i.timeout)),
                                  (s = []),
                                  (e.prev = 2),
                                  !t)
                                ) {
                                  e.next = 9;
                                  break;
                                }
                                return (e.next = 6), c.get(t);
                              case 6:
                                (f = e.sent), (e.next = 23);
                                break;
                              case 9:
                                if (!n) {
                                  e.next = 15;
                                  break;
                                }
                                return (e.next = 12), c.get(i.storeQueryUrl, n);
                              case 12:
                                (f = e.sent), (e.next = 23);
                                break;
                              case 15:
                                return (e.next = 17), c.get(i.storeUrl);
                              case 17:
                                if (
                                  ((f = e.sent),
                                  !(l = r.default.getLinkRelationUrls(f.collection, 'all_plugins'))
                                    .length)
                                ) {
                                  e.next = 23;
                                  break;
                                }
                                return (e.next = 22), c.get(l[0]);
                              case 22:
                                f = e.sent;
                              case 23:
                                for (
                                  p = !0,
                                    h = !1,
                                    d = void 0,
                                    e.prev = 26,
                                    v = f.collection.items[Symbol.iterator]();
                                  !(p = (y = v.next()).done);
                                  p = !0
                                )
                                  (m = y.value), s.push(r.default.getItemDescriptors(m));
                                e.next = 34;
                                break;
                              case 30:
                                (e.prev = 30), (e.t0 = e.catch(26)), (h = !0), (d = e.t0);
                              case 34:
                                (e.prev = 34), (e.prev = 35), p || null == v.return || v.return();
                              case 37:
                                if (((e.prev = 37), !h)) {
                                  e.next = 40;
                                  break;
                                }
                                throw d;
                              case 40:
                                return e.finish(37);
                              case 41:
                                return e.finish(34);
                              case 42:
                                e.next = 47;
                                break;
                              case 44:
                                (e.prev = 44), (e.t1 = e.catch(2)), u(e.t1);
                              case 47:
                                (g = ''),
                                  (w = r.default.getLinkRelationUrls(f.collection, 'next'))
                                    .length && (g = w[0]),
                                  (x = ''),
                                  (b = r.default.getLinkRelationUrls(f.collection, 'previous'))
                                    .length && (x = b[0]),
                                  a({
                                    plugins: s,
                                    nextLink: g,
                                    currentLink: f.collection.href,
                                    previousLink: x,
                                  });
                              case 54:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[2, 44], [26, 30, 34, 42], [35, , 37, 41]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: '_getParameters',
              value: function(t) {
                var n = this;
                return new Promise(function(r, i) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var a, u, c;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (a = new o.default(n.auth, n.contentType, n.timeout)),
                                  (e.prev = 1),
                                  (e.next = 4),
                                  a.get(t)
                                );
                              case 4:
                                return (
                                  (c = e.sent),
                                  (e.next = 7),
                                  n._getItemsFromPaginatedCollections(c.collection)
                                );
                              case 7:
                                (u = e.sent), (e.next = 13);
                                break;
                              case 10:
                                (e.prev = 10), (e.t0 = e.catch(1)), i(e.t0);
                              case 13:
                                r(u);
                              case 14:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[1, 10]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: '_getInitialCollection',
              value: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                  n = this;
                return new Promise(function(r, i) {
                  new o.default(n.auth, n.contentType, n.timeout)
                    .get(e, t)
                    .then(function(e) {
                      r(e.collection);
                    })
                    .catch(function(e) {
                      i(e);
                    });
                });
              },
            },
            {
              key: '_getNextCollection',
              value: function(e) {
                var t = this;
                return new Promise(function(n, i) {
                  var a = new o.default(t.auth, t.contentType, t.timeout),
                    u = r.default.getLinkRelationUrls(e, 'next');
                  a.get(u[0])
                    .then(function(e) {
                      n(e.collection);
                    })
                    .catch(function(e) {
                      i(e);
                    });
                });
              },
            },
            {
              key: '_getItemsFromPaginatedCollections',
              value: function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                  i = this,
                  a = new o.default(this.auth, this.contentType, this.timeout),
                  u = n.indexOf('next');
                return (
                  -1 !== u && n.splice(u, 1),
                  (function t(o) {
                    var u = [];
                    return new Promise(function(c, s) {
                      e._runAsyncTask(
                        regeneratorRuntime.mark(function e() {
                          var f,
                            l,
                            p,
                            h,
                            d,
                            v,
                            y,
                            m,
                            g,
                            w,
                            x,
                            b,
                            k,
                            _,
                            P,
                            T,
                            S,
                            L,
                            j,
                            O,
                            E,
                            R,
                            A,
                            C,
                            U,
                            M,
                            F,
                            N,
                            I,
                            D,
                            q;
                          return regeneratorRuntime.wrap(
                            function(e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.prev = 0), (e.next = 3), i._getPaginatedCollections(o)
                                    );
                                  case 3:
                                    (f = e.sent),
                                      (l = !0),
                                      (p = !1),
                                      (h = void 0),
                                      (e.prev = 7),
                                      (d = f[Symbol.iterator]());
                                  case 9:
                                    if ((l = (v = d.next()).done)) {
                                      e.next = 100;
                                      break;
                                    }
                                    (y = v.value),
                                      (m = []),
                                      (g = y.items),
                                      (w = !0),
                                      (x = !1),
                                      (b = void 0),
                                      (e.prev = 16),
                                      (k = g[Symbol.iterator]());
                                  case 18:
                                    if ((w = (_ = k.next()).done)) {
                                      e.next = 82;
                                      break;
                                    }
                                    (P = _.value),
                                      (T = r.default.getItemDescriptors(P)),
                                      (S = !0),
                                      (L = !1),
                                      (j = void 0),
                                      (e.prev = 24),
                                      (O = n[Symbol.iterator]());
                                  case 26:
                                    if ((S = (E = O.next()).done)) {
                                      e.next = 64;
                                      break;
                                    }
                                    (R = E.value),
                                      !(A = r.default.getLinkRelationUrls(P, R)).length ||
                                        R in T ||
                                        (T[R] = []),
                                      (C = !0),
                                      (U = !1),
                                      (M = void 0),
                                      (e.prev = 33),
                                      (F = A[Symbol.iterator]());
                                  case 35:
                                    if ((C = (N = F.next()).done)) {
                                      e.next = 47;
                                      break;
                                    }
                                    return (I = N.value), (e.next = 39), a.get(I);
                                  case 39:
                                    return (D = e.sent), (e.next = 42), t(D.collection);
                                  case 42:
                                    (q = e.sent), (T[R] = T[R].concat(q));
                                  case 44:
                                    (C = !0), (e.next = 35);
                                    break;
                                  case 47:
                                    e.next = 53;
                                    break;
                                  case 49:
                                    (e.prev = 49), (e.t0 = e.catch(33)), (U = !0), (M = e.t0);
                                  case 53:
                                    (e.prev = 53),
                                      (e.prev = 54),
                                      C || null == F.return || F.return();
                                  case 56:
                                    if (((e.prev = 56), !U)) {
                                      e.next = 59;
                                      break;
                                    }
                                    throw M;
                                  case 59:
                                    return e.finish(56);
                                  case 60:
                                    return e.finish(53);
                                  case 61:
                                    (S = !0), (e.next = 26);
                                    break;
                                  case 64:
                                    e.next = 70;
                                    break;
                                  case 66:
                                    (e.prev = 66), (e.t1 = e.catch(24)), (L = !0), (j = e.t1);
                                  case 70:
                                    (e.prev = 70),
                                      (e.prev = 71),
                                      S || null == O.return || O.return();
                                  case 73:
                                    if (((e.prev = 73), !L)) {
                                      e.next = 76;
                                      break;
                                    }
                                    throw j;
                                  case 76:
                                    return e.finish(73);
                                  case 77:
                                    return e.finish(70);
                                  case 78:
                                    m.push(T);
                                  case 79:
                                    (w = !0), (e.next = 18);
                                    break;
                                  case 82:
                                    e.next = 88;
                                    break;
                                  case 84:
                                    (e.prev = 84), (e.t2 = e.catch(16)), (x = !0), (b = e.t2);
                                  case 88:
                                    (e.prev = 88),
                                      (e.prev = 89),
                                      w || null == k.return || k.return();
                                  case 91:
                                    if (((e.prev = 91), !x)) {
                                      e.next = 94;
                                      break;
                                    }
                                    throw b;
                                  case 94:
                                    return e.finish(91);
                                  case 95:
                                    return e.finish(88);
                                  case 96:
                                    u = u.concat(m);
                                  case 97:
                                    (l = !0), (e.next = 9);
                                    break;
                                  case 100:
                                    e.next = 106;
                                    break;
                                  case 102:
                                    (e.prev = 102), (e.t3 = e.catch(7)), (p = !0), (h = e.t3);
                                  case 106:
                                    (e.prev = 106),
                                      (e.prev = 107),
                                      l || null == d.return || d.return();
                                  case 109:
                                    if (((e.prev = 109), !p)) {
                                      e.next = 112;
                                      break;
                                    }
                                    throw h;
                                  case 112:
                                    return e.finish(109);
                                  case 113:
                                    return e.finish(106);
                                  case 114:
                                    e.next = 119;
                                    break;
                                  case 116:
                                    (e.prev = 116), (e.t4 = e.catch(0)), s(e.t4);
                                  case 119:
                                    c(u);
                                  case 120:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                            [
                              [0, 116],
                              [7, 102, 106, 114],
                              [16, 84, 88, 96],
                              [24, 66, 70, 78],
                              [33, 49, 53, 61],
                              [54, , 56, 60],
                              [71, , 73, 77],
                              [89, , 91, 95],
                              [107, , 109, 113],
                            ]
                          );
                        })
                      );
                    });
                  })(t)
                );
              },
            },
            {
              key: '_getPaginatedCollections',
              value: function(t) {
                var n = [t],
                  i = new o.default(this.auth, this.contentType, this.timeout);
                return new Promise(function(o, a) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var u, c;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                (e.prev = 0), (u = r.default.getLinkRelationUrls(t, 'next'));
                              case 2:
                                if (!u.length) {
                                  e.next = 10;
                                  break;
                                }
                                return (e.next = 5), i.get(u[0]);
                              case 5:
                                (c = e.sent),
                                  (n = n.concat(c.collection)),
                                  (u = r.default.getLinkRelationUrls(c.collection, 'next')),
                                  (e.next = 2);
                                break;
                              case 10:
                                e.next = 15;
                                break;
                              case 12:
                                (e.prev = 12), (e.t0 = e.catch(0)), a(e.t0);
                              case 15:
                                o(n);
                              case 16:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[0, 12]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'getUser',
              value: function() {
                var t = this.storeUrl,
                  n = new o.default(this.auth, this.contentType, this.timeout);
                return new Promise(function(o, i) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var a, u;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.prev = 0), (e.next = 3), n.get(t);
                              case 3:
                                return (
                                  (a = e.sent),
                                  (u = r.default.getLinkRelationUrls(a.collection, 'user')),
                                  (e.next = 7),
                                  n.get(u[0])
                                );
                              case 7:
                                (a = e.sent), (e.next = 13);
                                break;
                              case 10:
                                (e.prev = 10), (e.t0 = e.catch(0)), i(e.t0);
                              case 13:
                                o(a.collection);
                              case 14:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[0, 10]]
                      );
                    })
                  );
                });
              },
            },
            {
              key: 'updateUser',
              value: function(t) {
                var n = this.storeUrl,
                  i = new o.default(this.auth, this.contentType, this.timeout),
                  a = {
                    template: {
                      data: [
                        { name: 'email', value: t.email },
                        { name: 'password', value: t.password },
                      ],
                    },
                  };
                return new Promise(function(t, o) {
                  e._runAsyncTask(
                    regeneratorRuntime.mark(function e() {
                      var u, c;
                      return regeneratorRuntime.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (e.prev = 0), (e.next = 3), i.get(n);
                              case 3:
                                return (
                                  (u = e.sent),
                                  (c = r.default.getLinkRelationUrls(u.collection, 'user')),
                                  (e.next = 7),
                                  i.put(c[0], a)
                                );
                              case 7:
                                (u = e.sent), (e.next = 13);
                                break;
                              case 10:
                                (e.prev = 10), (e.t0 = e.catch(0)), o(e.t0);
                              case 13:
                                t(u.collection);
                              case 14:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this,
                        [[0, 10]]
                      );
                    })
                  );
                });
              },
            },
          ]) && a(t.prototype, n),
          i && a(t, i),
          e
        );
      })();
      t.default = u;
    },
    function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'StoreClient', {
          enumerable: !0,
          get: function() {
            return r.default;
          },
        }),
        Object.defineProperty(t, 'Request', {
          enumerable: !0,
          get: function() {
            return o.default;
          },
        }),
        Object.defineProperty(t, 'Collection', {
          enumerable: !0,
          get: function() {
            return i.default;
          },
        }),
        Object.defineProperty(t, 'StoreRequestException', {
          enumerable: !0,
          get: function() {
            return a.default;
          },
        });
      var r = u(n(81)),
        o = u(n(25)),
        i = u(n(9)),
        a = u(n(19));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
  ]);
});
