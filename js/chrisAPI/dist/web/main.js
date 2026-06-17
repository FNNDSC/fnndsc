!(function (e, t) {
  if ('object' == typeof exports && 'object' == typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    var s = t();
    for (var n in s) ('object' == typeof exports ? exports : e)[n] = s[n];
  }
})(Object('undefined' != typeof self ? self : this), () =>
  (() => {
    'use strict';
    var e = {
      d: (t, s) => {
        for (var n in s)
          e.o(s, n) && !e.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: s[n] });
      },
    };
    ((e.g = (function () {
      if ('object' == typeof globalThis) return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if ('object' == typeof window) return window;
      }
    })()),
      (e.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (e.r = (e) => {
        ('undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 }));
      }));
    var t = {};
    (e.r(t),
      e.d(t, {
        AllPACSQueryList: () => Ms,
        AllPluginInstanceList: () => gs,
        AllWorkflowList: () => as,
        ChrisInstance: () => Ot,
        Collection: () => wt,
        Comment: () => tn,
        CommentList: () => sn,
        ComputeResource: () => Cs,
        ComputeResourceAdmin: () => xs,
        ComputeResourceAdminList: () => Ts,
        ComputeResourceList: () => Ss,
        DownloadToken: () => hn,
        DownloadTokenList: () => pn,
        Feed: () => nn,
        FeedGroupPermission: () => ln,
        FeedGroupPermissionList: () => un,
        FeedList: () => rn,
        FeedPluginInstanceList: () => ds,
        FeedTagList: () => en,
        FeedTaggingList: () => Ys,
        FeedUserPermission: () => cn,
        FeedUserPermissionList: () => an,
        FileBrowserFolder: () => kt,
        FileBrowserFolderChildList: () => jt,
        FileBrowserFolderFile: () => Nt,
        FileBrowserFolderFileList: () => Dt,
        FileBrowserFolderLinkFile: () => Bt,
        FileBrowserFolderLinkFileList: () => qt,
        FileBrowserFolderList: () => It,
        FileGroupPermission: () => Ht,
        FileGroupPermissionList: () => Jt,
        FileUserPermission: () => Qt,
        FileUserPermissionList: () => $t,
        FolderGroupPermission: () => Mt,
        FolderGroupPermissionList: () => Gt,
        FolderUserPermission: () => zt,
        FolderUserPermissionList: () => Wt,
        Group: () => Ct,
        GroupList: () => St,
        GroupUser: () => Ft,
        GroupUserList: () => xt,
        ItemResource: () => Ut,
        LinkFileGroupPermission: () => Kt,
        LinkFileGroupPermissionList: () => Vt,
        LinkFileUserPermission: () => Xt,
        LinkFileUserPermissionList: () => Yt,
        ListResource: () => Et,
        Note: () => Qs,
        PACS: () => Ws,
        PACSFile: () => Ns,
        PACSFileList: () => Ds,
        PACSList: () => Hs,
        PACSQuery: () => Bs,
        PACSQueryList: () => qs,
        PACSRetrieve: () => Gs,
        PACSRetrieveList: () => zs,
        PACSSeries: () => Is,
        PACSSeriesList: () => js,
        Pipeline: () => Zt,
        PipelineList: () => es,
        PipelinePipingDefaultParameterList: () => is,
        PipelinePluginList: () => ns,
        PipelinePluginPipingList: () => rs,
        PipelineSourceFile: () => os,
        PipelineSourceFileList: () => ls,
        PipingDefaultParameter: () => ss,
        Plugin: () => Us,
        PluginAdmin: () => As,
        PluginAdminList: () => Ls,
        PluginComputeResourceList: () => Fs,
        PluginInstance: () => hs,
        PluginInstanceDescendantList: () => ms,
        PluginInstanceList: () => ps,
        PluginInstanceParameter: () => ws,
        PluginInstanceParameterList: () => bs,
        PluginInstanceSplit: () => _s,
        PluginInstanceSplitList: () => Rs,
        PluginList: () => Es,
        PluginMeta: () => ys,
        PluginMetaList: () => Ps,
        PluginMetaPluginList: () => Os,
        PluginParameter: () => Lt,
        PluginParameterList: () => vt,
        PluginPiping: () => ts,
        PublicFeedList: () => on,
        Request: () => yt,
        RequestException: () => bt,
        Resource: () => Pt,
        Tag: () => $s,
        TagFeedList: () => Zs,
        TagList: () => Ks,
        TagTaggingList: () => Xs,
        Tagging: () => Vs,
        User: () => At,
        UserFile: () => vs,
        UserFileList: () => ks,
        UserGroupList: () => Tt,
        Workflow: () => us,
        WorkflowList: () => cs,
        WorkflowPluginInstanceList: () => fs,
        default: () => gn,
      }));
    var s = {};
    function n(e, t) {
      return function () {
        return e.apply(t, arguments);
      };
    }
    (e.r(s),
      e.d(s, {
        hasBrowserEnv: () => ye,
        hasStandardBrowserEnv: () => Ue,
        hasStandardBrowserWebWorkerEnv: () => Ee,
        navigator: () => Pe,
        origin: () => Oe,
      }));
    const { toString: r } = Object.prototype,
      { getPrototypeOf: i } = Object,
      { iterator: o, toStringTag: l } = Symbol,
      u =
        ((c = Object.create(null)),
        (e) => {
          const t = r.call(e);
          return c[t] || (c[t] = t.slice(8, -1).toLowerCase());
        });
    var c;
    const a = (e) => ((e = e.toLowerCase()), (t) => u(t) === e),
      h = (e) => (t) => typeof t === e,
      { isArray: p } = Array,
      g = h('undefined');
    function d(e) {
      return (
        null !== e &&
        !g(e) &&
        null !== e.constructor &&
        !g(e.constructor) &&
        _(e.constructor.isBuffer) &&
        e.constructor.isBuffer(e)
      );
    }
    const f = a('ArrayBuffer'),
      m = h('string'),
      _ = h('function'),
      R = h('number'),
      w = (e) => null !== e && 'object' == typeof e,
      b = (e) => {
        if ('object' !== u(e)) return !1;
        const t = i(e);
        return !(
          (null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t)) ||
          l in e ||
          o in e
        );
      },
      y = a('Date'),
      P = a('File'),
      U = a('Blob'),
      E = a('FileList'),
      O =
        'undefined' != typeof globalThis
          ? globalThis
          : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
              ? window
              : void 0 !== e.g
                ? e.g
                : {},
      C = void 0 !== O.FormData ? O.FormData : void 0,
      S = a('URLSearchParams'),
      [F, x, T, A] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(a);
    function L(e, t, { allOwnKeys: s = !1 } = {}) {
      if (null == e) return;
      let n, r;
      if (('object' != typeof e && (e = [e]), p(e)))
        for (n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
      else {
        if (d(e)) return;
        const r = s ? Object.getOwnPropertyNames(e) : Object.keys(e),
          i = r.length;
        let o;
        for (n = 0; n < i; n++) ((o = r[n]), t.call(null, e[o], o, e));
      }
    }
    function v(e, t) {
      if (d(e)) return null;
      t = t.toLowerCase();
      const s = Object.keys(e);
      let n,
        r = s.length;
      for (; r-- > 0; ) if (((n = s[r]), t === n.toLowerCase())) return n;
      return null;
    }
    const k =
        'undefined' != typeof globalThis
          ? globalThis
          : 'undefined' != typeof self
            ? self
            : 'undefined' != typeof window
              ? window
              : e.g,
      I = (e) => !g(e) && e !== k,
      j = ((N = 'undefined' != typeof Uint8Array && i(Uint8Array)), (e) => N && e instanceof N);
    var N;
    const D = a('HTMLFormElement'),
      B = (
        ({ hasOwnProperty: e }) =>
        (t, s) =>
          e.call(t, s)
      )(Object.prototype),
      q = a('RegExp'),
      M = (e, t) => {
        const s = Object.getOwnPropertyDescriptors(e),
          n = {};
        (L(s, (s, r) => {
          let i;
          !1 !== (i = t(s, r, e)) && (n[r] = i || s);
        }),
          Object.defineProperties(e, n));
      },
      G = a('AsyncFunction'),
      z =
        ((W = 'function' == typeof setImmediate),
        (H = _(k.postMessage)),
        W
          ? setImmediate
          : H
            ? ((J = `axios@${Math.random()}`),
              (Q = []),
              k.addEventListener(
                'message',
                ({ source: e, data: t }) => {
                  e === k && t === J && Q.length && Q.shift()();
                },
                !1
              ),
              (e) => {
                (Q.push(e), k.postMessage(J, '*'));
              })
            : (e) => setTimeout(e));
    var W, H, J, Q;
    const $ =
        'undefined' != typeof queueMicrotask
          ? queueMicrotask.bind(k)
          : ('undefined' != typeof process && process.nextTick) || z,
      K = {
        isArray: p,
        isArrayBuffer: f,
        isBuffer: d,
        isFormData: (e) => {
          if (!e) return !1;
          if (C && e instanceof C) return !0;
          const t = i(e);
          if (!t || t === Object.prototype) return !1;
          if (!_(e.append)) return !1;
          const s = u(e);
          return (
            'formdata' === s ||
            ('object' === s && _(e.toString) && '[object FormData]' === e.toString())
          );
        },
        isArrayBufferView: function (e) {
          let t;
          return (
            (t =
              'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(e)
                : e && e.buffer && f(e.buffer)),
            t
          );
        },
        isString: m,
        isNumber: R,
        isBoolean: (e) => !0 === e || !1 === e,
        isObject: w,
        isPlainObject: b,
        isEmptyObject: (e) => {
          if (!w(e) || d(e)) return !1;
          try {
            return 0 === Object.keys(e).length && Object.getPrototypeOf(e) === Object.prototype;
          } catch (e) {
            return !1;
          }
        },
        isReadableStream: F,
        isRequest: x,
        isResponse: T,
        isHeaders: A,
        isUndefined: g,
        isDate: y,
        isFile: P,
        isReactNativeBlob: (e) => !(!e || void 0 === e.uri),
        isReactNative: (e) => e && void 0 !== e.getParts,
        isBlob: U,
        isRegExp: q,
        isFunction: _,
        isStream: (e) => w(e) && _(e.pipe),
        isURLSearchParams: S,
        isTypedArray: j,
        isFileList: E,
        forEach: L,
        merge: function e(...t) {
          const { caseless: s, skipUndefined: n } = (I(this) && this) || {},
            r = {},
            i = (t, i) => {
              if ('__proto__' === i || 'constructor' === i || 'prototype' === i) return;
              const o = (s && v(r, i)) || i,
                l = B(r, o) ? r[o] : void 0;
              b(l) && b(t)
                ? (r[o] = e(l, t))
                : b(t)
                  ? (r[o] = e({}, t))
                  : p(t)
                    ? (r[o] = t.slice())
                    : (n && g(t)) || (r[o] = t);
            };
          for (let e = 0, s = t.length; e < s; e++) t[e] && L(t[e], i);
          return r;
        },
        extend: (e, t, s, { allOwnKeys: r } = {}) => (
          L(
            t,
            (t, r) => {
              s && _(t)
                ? Object.defineProperty(e, r, {
                    __proto__: null,
                    value: n(t, s),
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                  })
                : Object.defineProperty(e, r, {
                    __proto__: null,
                    value: t,
                    writable: !0,
                    enumerable: !0,
                    configurable: !0,
                  });
            },
            { allOwnKeys: r }
          ),
          e
        ),
        trim: (e) => (e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')),
        stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
        inherits: (e, t, s, n) => {
          ((e.prototype = Object.create(t.prototype, n)),
            Object.defineProperty(e.prototype, 'constructor', {
              __proto__: null,
              value: e,
              writable: !0,
              enumerable: !1,
              configurable: !0,
            }),
            Object.defineProperty(e, 'super', { __proto__: null, value: t.prototype }),
            s && Object.assign(e.prototype, s));
        },
        toFlatObject: (e, t, s, n) => {
          let r, o, l;
          const u = {};
          if (((t = t || {}), null == e)) return t;
          do {
            for (r = Object.getOwnPropertyNames(e), o = r.length; o-- > 0; )
              ((l = r[o]), (n && !n(l, e, t)) || u[l] || ((t[l] = e[l]), (u[l] = !0)));
            e = !1 !== s && i(e);
          } while (e && (!s || s(e, t)) && e !== Object.prototype);
          return t;
        },
        kindOf: u,
        kindOfTest: a,
        endsWith: (e, t, s) => {
          ((e = String(e)), (void 0 === s || s > e.length) && (s = e.length), (s -= t.length));
          const n = e.indexOf(t, s);
          return -1 !== n && n === s;
        },
        toArray: (e) => {
          if (!e) return null;
          if (p(e)) return e;
          let t = e.length;
          if (!R(t)) return null;
          const s = new Array(t);
          for (; t-- > 0; ) s[t] = e[t];
          return s;
        },
        forEachEntry: (e, t) => {
          const s = (e && e[o]).call(e);
          let n;
          for (; (n = s.next()) && !n.done; ) {
            const s = n.value;
            t.call(e, s[0], s[1]);
          }
        },
        matchAll: (e, t) => {
          let s;
          const n = [];
          for (; null !== (s = e.exec(t)); ) n.push(s);
          return n;
        },
        isHTMLForm: D,
        hasOwnProperty: B,
        hasOwnProp: B,
        reduceDescriptors: M,
        freezeMethods: (e) => {
          M(e, (t, s) => {
            if (_(e) && ['arguments', 'caller', 'callee'].includes(s)) return !1;
            const n = e[s];
            _(n) &&
              ((t.enumerable = !1),
              'writable' in t
                ? (t.writable = !1)
                : t.set ||
                  (t.set = () => {
                    throw Error("Can not rewrite read-only method '" + s + "'");
                  }));
          });
        },
        toObjectSet: (e, t) => {
          const s = {},
            n = (e) => {
              e.forEach((e) => {
                s[e] = !0;
              });
            };
          return (p(e) ? n(e) : n(String(e).split(t)), s);
        },
        toCamelCase: (e) =>
          e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, s) {
            return t.toUpperCase() + s;
          }),
        noop: () => {},
        toFiniteNumber: (e, t) => (null != e && Number.isFinite((e = +e)) ? e : t),
        findKey: v,
        global: k,
        isContextDefined: I,
        isSpecCompliantForm: function (e) {
          return !!(e && _(e.append) && 'FormData' === e[l] && e[o]);
        },
        toJSONObject: (e) => {
          const t = new Array(10),
            s = (e, n) => {
              if (w(e)) {
                if (t.indexOf(e) >= 0) return;
                if (d(e)) return e;
                if (!('toJSON' in e)) {
                  t[n] = e;
                  const r = p(e) ? [] : {};
                  return (
                    L(e, (e, t) => {
                      const i = s(e, n + 1);
                      !g(i) && (r[t] = i);
                    }),
                    (t[n] = void 0),
                    r
                  );
                }
              }
              return e;
            };
          return s(e, 0);
        },
        isAsyncFn: G,
        isThenable: (e) => e && (w(e) || _(e)) && _(e.then) && _(e.catch),
        setImmediate: z,
        asap: $,
        isIterable: (e) => null != e && _(e[o]),
      },
      V = K.toObjectSet([
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
      X = (e) => {
        const t = {};
        let s, n, r;
        return (
          e &&
            e.split('\n').forEach(function (e) {
              ((r = e.indexOf(':')),
                (s = e.substring(0, r).trim().toLowerCase()),
                (n = e.substring(r + 1).trim()),
                !s ||
                  (t[s] && V[s]) ||
                  ('set-cookie' === s
                    ? t[s]
                      ? t[s].push(n)
                      : (t[s] = [n])
                    : (t[s] = t[s] ? t[s] + ', ' + n : n)));
            }),
          t
        );
      };
    (Object.getOwnPropertyDescriptor(X, 'name') || {}).writable ||
      Object.defineProperty(X, 'name', { value: 'default', configurable: !0 });
    const Y = Symbol('internals'),
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
                s = e.length;
              for (; t < s; ) {
                const s = e.charCodeAt(t);
                if (9 !== s && 32 !== s) break;
                t += 1;
              }
              for (; s > t; ) {
                const t = e.charCodeAt(s - 1);
                if (9 !== t && 32 !== t) break;
                s -= 1;
              }
              return 0 === t && s === e.length ? e : e.slice(t, s);
            })(String(e).replace(Z, ''));
    }
    function se(e, t, s, n, r) {
      return K.isFunction(n)
        ? n.call(this, t, s)
        : (r && (t = s),
          K.isString(t)
            ? K.isString(n)
              ? -1 !== t.indexOf(n)
              : K.isRegExp(n)
                ? n.test(t)
                : void 0
            : void 0);
    }
    class ne {
      constructor(e) {
        e && this.set(e);
      }
      set(e, t, s) {
        const n = this;
        function r(e, t, s) {
          const r = ee(t);
          if (!r) throw new Error('header name must be a non-empty string');
          const i = K.findKey(n, r);
          (!i || void 0 === n[i] || !0 === s || (void 0 === s && !1 !== n[i])) &&
            (n[i || t] = te(e));
        }
        const i = (e, t) => K.forEach(e, (e, s) => r(e, s, t));
        if (K.isPlainObject(e) || e instanceof this.constructor) i(e, t);
        else if (
          K.isString(e) &&
          (e = e.trim()) &&
          !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())
        )
          i(X(e), t);
        else if (K.isObject(e) && K.isIterable(e)) {
          let s,
            n,
            r = {};
          for (const t of e) {
            if (!K.isArray(t)) throw TypeError('Object iterator must return a key-value pair');
            r[(n = t[0])] = (s = r[n]) ? (K.isArray(s) ? [...s, t[1]] : [s, t[1]]) : t[1];
          }
          i(r, t);
        } else null != e && r(t, e, s);
        return this;
      }
      get(e, t) {
        if ((e = ee(e))) {
          const s = K.findKey(this, e);
          if (s) {
            const e = this[s];
            if (!t) return e;
            if (!0 === t)
              return (function (e) {
                const t = Object.create(null),
                  s = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                let n;
                for (; (n = s.exec(e)); ) t[n[1]] = n[2];
                return t;
              })(e);
            if (K.isFunction(t)) return t.call(this, e, s);
            if (K.isRegExp(t)) return t.exec(e);
            throw new TypeError('parser must be boolean|regexp|function');
          }
        }
      }
      has(e, t) {
        if ((e = ee(e))) {
          const s = K.findKey(this, e);
          return !(!s || void 0 === this[s] || (t && !se(0, this[s], s, t)));
        }
        return !1;
      }
      delete(e, t) {
        const s = this;
        let n = !1;
        function r(e) {
          if ((e = ee(e))) {
            const r = K.findKey(s, e);
            !r || (t && !se(0, s[r], r, t)) || (delete s[r], (n = !0));
          }
        }
        return (K.isArray(e) ? e.forEach(r) : r(e), n);
      }
      clear(e) {
        const t = Object.keys(this);
        let s = t.length,
          n = !1;
        for (; s--; ) {
          const r = t[s];
          (e && !se(0, this[r], r, e, !0)) || (delete this[r], (n = !0));
        }
        return n;
      }
      normalize(e) {
        const t = this,
          s = {};
        return (
          K.forEach(this, (n, r) => {
            const i = K.findKey(s, r);
            if (i) return ((t[i] = te(n)), void delete t[r]);
            const o = e
              ? (function (e) {
                  return e
                    .trim()
                    .toLowerCase()
                    .replace(/([a-z\d])(\w*)/g, (e, t, s) => t.toUpperCase() + s);
                })(r)
              : String(r).trim();
            (o !== r && delete t[r], (t[o] = te(n)), (s[o] = !0));
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
          K.forEach(this, (s, n) => {
            null != s && !1 !== s && (t[n] = e && K.isArray(s) ? s.join(', ') : s);
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
        const s = new this(e);
        return (t.forEach((e) => s.set(e)), s);
      }
      static accessor(e) {
        const t = (this[Y] = this[Y] = { accessors: {} }).accessors,
          s = this.prototype;
        function n(e) {
          const n = ee(e);
          t[n] ||
            ((function (e, t) {
              const s = K.toCamelCase(' ' + t);
              ['get', 'set', 'has'].forEach((n) => {
                Object.defineProperty(e, n + s, {
                  __proto__: null,
                  value: function (e, s, r) {
                    return this[n].call(this, t, e, s, r);
                  },
                  configurable: !0,
                });
              });
            })(s, e),
            (t[n] = !0));
        }
        return (K.isArray(e) ? e.forEach(n) : n(e), this);
      }
    }
    (ne.accessor([
      'Content-Type',
      'Content-Length',
      'Accept',
      'Accept-Encoding',
      'User-Agent',
      'Authorization',
    ]),
      K.reduceDescriptors(ne.prototype, ({ value: e }, t) => {
        let s = t[0].toUpperCase() + t.slice(1);
        return {
          get: () => e,
          set(e) {
            this[s] = e;
          },
        };
      }),
      K.freezeMethods(ne));
    const re = ne;
    class ie extends Error {
      static from(e, t, s, n, r, i) {
        const o = new ie(e.message, t || e.code, s, n, r);
        return (
          (o.cause = e),
          (o.name = e.name),
          null != e.status && null == o.status && (o.status = e.status),
          i && Object.assign(o, i),
          o
        );
      }
      constructor(e, t, s, n, r) {
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
          s && (this.config = s),
          n && (this.request = n),
          r && ((this.response = r), (this.status = r.status)));
      }
      toJSON() {
        const e = this.config,
          t = e && K.hasOwnProp(e, 'redact') ? e.redact : void 0,
          s =
            K.isArray(t) && t.length > 0
              ? (function (e, t) {
                  const s = new Set(t.map((e) => String(e).toLowerCase())),
                    n = [],
                    r = (e) => {
                      if (null === e || 'object' != typeof e) return e;
                      if (K.isBuffer(e)) return e;
                      if (-1 !== n.indexOf(e)) return;
                      let t;
                      if ((e instanceof re && (e = e.toJSON()), n.push(e), K.isArray(e)))
                        ((t = []),
                          e.forEach((e, s) => {
                            const n = r(e);
                            K.isUndefined(n) || (t[s] = n);
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
                          return (n.pop(), e);
                        t = Object.create(null);
                        for (const [n, i] of Object.entries(e)) {
                          const e = s.has(n.toLowerCase()) ? '[REDACTED ****]' : r(i);
                          K.isUndefined(e) || (t[n] = e);
                        }
                      }
                      return (n.pop(), t);
                    };
                  return r(e);
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
          config: s,
          code: this.code,
          status: this.status,
        };
      }
    }
    ((ie.ERR_BAD_OPTION_VALUE = 'ERR_BAD_OPTION_VALUE'),
      (ie.ERR_BAD_OPTION = 'ERR_BAD_OPTION'),
      (ie.ECONNABORTED = 'ECONNABORTED'),
      (ie.ETIMEDOUT = 'ETIMEDOUT'),
      (ie.ECONNREFUSED = 'ECONNREFUSED'),
      (ie.ERR_NETWORK = 'ERR_NETWORK'),
      (ie.ERR_FR_TOO_MANY_REDIRECTS = 'ERR_FR_TOO_MANY_REDIRECTS'),
      (ie.ERR_DEPRECATED = 'ERR_DEPRECATED'),
      (ie.ERR_BAD_RESPONSE = 'ERR_BAD_RESPONSE'),
      (ie.ERR_BAD_REQUEST = 'ERR_BAD_REQUEST'),
      (ie.ERR_CANCELED = 'ERR_CANCELED'),
      (ie.ERR_NOT_SUPPORT = 'ERR_NOT_SUPPORT'),
      (ie.ERR_INVALID_URL = 'ERR_INVALID_URL'),
      (ie.ERR_FORM_DATA_DEPTH_EXCEEDED = 'ERR_FORM_DATA_DEPTH_EXCEEDED'));
    const oe = ie;
    function le(e) {
      return K.isPlainObject(e) || K.isArray(e);
    }
    function ue(e) {
      return K.endsWith(e, '[]') ? e.slice(0, -2) : e;
    }
    function ce(e, t, s) {
      return e
        ? e
            .concat(t)
            .map(function (e, t) {
              return ((e = ue(e)), !s && t ? '[' + e + ']' : e);
            })
            .join(s ? '.' : '')
        : t;
    }
    const ae = K.toFlatObject(K, {}, null, function (e) {
        return /^is[A-Z]/.test(e);
      }),
      he = function (e, t, s) {
        if (!K.isObject(e)) throw new TypeError('target must be an object');
        t = t || new FormData();
        const n = (s = K.toFlatObject(
            s,
            { metaTokens: !0, dots: !1, indexes: !1 },
            !1,
            function (e, t) {
              return !K.isUndefined(t[e]);
            }
          )).metaTokens,
          r = s.visitor || h,
          i = s.dots,
          o = s.indexes,
          l = s.Blob || ('undefined' != typeof Blob && Blob),
          u = void 0 === s.maxDepth ? 100 : s.maxDepth,
          c = l && K.isSpecCompliantForm(t);
        if (!K.isFunction(r)) throw new TypeError('visitor must be a function');
        function a(e) {
          if (null === e) return '';
          if (K.isDate(e)) return e.toISOString();
          if (K.isBoolean(e)) return e.toString();
          if (!c && K.isBlob(e)) throw new oe('Blob is not supported. Use a Buffer instead.');
          return K.isArrayBuffer(e) || K.isTypedArray(e)
            ? c && 'function' == typeof Blob
              ? new Blob([e])
              : Buffer.from(e)
            : e;
        }
        function h(e, s, r) {
          let l = e;
          if (K.isReactNative(t) && K.isReactNativeBlob(e))
            return (t.append(ce(r, s, i), a(e)), !1);
          if (e && !r && 'object' == typeof e)
            if (K.endsWith(s, '{}')) ((s = n ? s : s.slice(0, -2)), (e = JSON.stringify(e)));
            else if (
              (K.isArray(e) &&
                (function (e) {
                  return K.isArray(e) && !e.some(le);
                })(e)) ||
              ((K.isFileList(e) || K.endsWith(s, '[]')) && (l = K.toArray(e)))
            )
              return (
                (s = ue(s)),
                l.forEach(function (e, n) {
                  !K.isUndefined(e) &&
                    null !== e &&
                    t.append(!0 === o ? ce([s], n, i) : null === o ? s : s + '[]', a(e));
                }),
                !1
              );
          return !!le(e) || (t.append(ce(r, s, i), a(e)), !1);
        }
        const p = [],
          g = Object.assign(ae, { defaultVisitor: h, convertValue: a, isVisitable: le });
        if (!K.isObject(e)) throw new TypeError('data must be an object');
        return (
          (function e(s, n, i = 0) {
            if (!K.isUndefined(s)) {
              if (i > u)
                throw new oe(
                  'Object is too deeply nested (' + i + ' levels). Max depth: ' + u,
                  oe.ERR_FORM_DATA_DEPTH_EXCEEDED
                );
              if (-1 !== p.indexOf(s)) throw Error('Circular reference detected in ' + n.join('.'));
              (p.push(s),
                K.forEach(s, function (s, o) {
                  !0 ===
                    (!(K.isUndefined(s) || null === s) &&
                      r.call(t, s, K.isString(o) ? o.trim() : o, n, g)) &&
                    e(s, n ? n.concat(o) : [o], i + 1);
                }),
                p.pop());
            }
          })(e),
          t
        );
      };
    function pe(e) {
      const t = { '!': '%21', "'": '%27', '(': '%28', ')': '%29', '~': '%7E', '%20': '+' };
      return encodeURIComponent(e).replace(/[!'()~]|%20/g, function (e) {
        return t[e];
      });
    }
    function ge(e, t) {
      ((this._pairs = []), e && he(e, this, t));
    }
    const de = ge.prototype;
    ((de.append = function (e, t) {
      this._pairs.push([e, t]);
    }),
      (de.toString = function (e) {
        const t = e
          ? function (t) {
              return e.call(this, t, pe);
            }
          : pe;
        return this._pairs
          .map(function (e) {
            return t(e[0]) + '=' + t(e[1]);
          }, '')
          .join('&');
      }));
    const fe = ge;
    function me(e) {
      return encodeURIComponent(e)
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+');
    }
    function _e(e, t, s) {
      if (!t) return e;
      const n = (s && s.encode) || me,
        r = K.isFunction(s) ? { serialize: s } : s,
        i = r && r.serialize;
      let o;
      if (
        ((o = i ? i(t, r) : K.isURLSearchParams(t) ? t.toString() : new fe(t, r).toString(n)), o)
      ) {
        const t = e.indexOf('#');
        (-1 !== t && (e = e.slice(0, t)), (e += (-1 === e.indexOf('?') ? '?' : '&') + o));
      }
      return e;
    }
    const Re = class {
        constructor() {
          this.handlers = [];
        }
        use(e, t, s) {
          return (
            this.handlers.push({
              fulfilled: e,
              rejected: t,
              synchronous: !!s && s.synchronous,
              runWhen: s ? s.runWhen : null,
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
      we = {
        silentJSONParsing: !0,
        forcedJSONParsing: !0,
        clarifyTimeoutError: !1,
        legacyInterceptorReqResOrdering: !0,
      },
      be = {
        isBrowser: !0,
        classes: {
          URLSearchParams: 'undefined' != typeof URLSearchParams ? URLSearchParams : fe,
          FormData: 'undefined' != typeof FormData ? FormData : null,
          Blob: 'undefined' != typeof Blob ? Blob : null,
        },
        protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
      },
      ye = 'undefined' != typeof window && 'undefined' != typeof document,
      Pe = ('object' == typeof navigator && navigator) || void 0,
      Ue = ye && (!Pe || ['ReactNative', 'NativeScript', 'NS'].indexOf(Pe.product) < 0),
      Ee =
        'undefined' != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope &&
        'function' == typeof self.importScripts,
      Oe = (ye && window.location.href) || 'http://localhost',
      Ce = { ...s, ...be },
      Se = function (e) {
        function t(e, s, n, r) {
          let i = e[r++];
          if ('__proto__' === i) return !0;
          const o = Number.isFinite(+i),
            l = r >= e.length;
          return (
            (i = !i && K.isArray(n) ? n.length : i),
            l
              ? (K.hasOwnProp(n, i)
                  ? (n[i] = K.isArray(n[i]) ? n[i].concat(s) : [n[i], s])
                  : (n[i] = s),
                !o)
              : ((n[i] && K.isObject(n[i])) || (n[i] = []),
                t(e, s, n[i], r) &&
                  K.isArray(n[i]) &&
                  (n[i] = (function (e) {
                    const t = {},
                      s = Object.keys(e);
                    let n;
                    const r = s.length;
                    let i;
                    for (n = 0; n < r; n++) ((i = s[n]), (t[i] = e[i]));
                    return t;
                  })(n[i])),
                !o)
          );
        }
        if (K.isFormData(e) && K.isFunction(e.entries)) {
          const s = {};
          return (
            K.forEachEntry(e, (e, n) => {
              t(
                (function (e) {
                  return K.matchAll(/\w+|\[(\w*)]/g, e).map((e) =>
                    '[]' === e[0] ? '' : e[1] || e[0]
                  );
                })(e),
                n,
                s,
                0
              );
            }),
            s
          );
        }
        return null;
      },
      Fe = (e, t) => (null != e && K.hasOwnProp(e, t) ? e[t] : void 0),
      xe = {
        transitional: we,
        adapter: ['xhr', 'http', 'fetch'],
        transformRequest: [
          function (e, t) {
            const s = t.getContentType() || '',
              n = s.indexOf('application/json') > -1,
              r = K.isObject(e);
            if ((r && K.isHTMLForm(e) && (e = new FormData(e)), K.isFormData(e)))
              return n ? JSON.stringify(Se(e)) : e;
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
            let i;
            if (r) {
              const t = Fe(this, 'formSerializer');
              if (s.indexOf('application/x-www-form-urlencoded') > -1)
                return (function (e, t) {
                  return he(e, new Ce.classes.URLSearchParams(), {
                    visitor: function (e, t, s, n) {
                      return Ce.isNode && K.isBuffer(e)
                        ? (this.append(t, e.toString('base64')), !1)
                        : n.defaultVisitor.apply(this, arguments);
                    },
                    ...t,
                  });
                })(e, t).toString();
              if ((i = K.isFileList(e)) || s.indexOf('multipart/form-data') > -1) {
                const s = Fe(this, 'env'),
                  n = s && s.FormData;
                return he(i ? { 'files[]': e } : e, n && new n(), t);
              }
            }
            return r || n
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
            const t = Fe(this, 'transitional') || xe.transitional,
              s = t && t.forcedJSONParsing,
              n = Fe(this, 'responseType'),
              r = 'json' === n;
            if (K.isResponse(e) || K.isReadableStream(e)) return e;
            if (e && K.isString(e) && ((s && !n) || r)) {
              const s = !(t && t.silentJSONParsing) && r;
              try {
                return JSON.parse(e, Fe(this, 'parseReviver'));
              } catch (e) {
                if (s) {
                  if ('SyntaxError' === e.name)
                    throw oe.from(e, oe.ERR_BAD_RESPONSE, this, null, Fe(this, 'response'));
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
        env: { FormData: Ce.classes.FormData, Blob: Ce.classes.Blob },
        validateStatus: function (e) {
          return e >= 200 && e < 300;
        },
        headers: {
          common: { Accept: 'application/json, text/plain, */*', 'Content-Type': void 0 },
        },
      };
    K.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query'], (e) => {
      xe.headers[e] = {};
    });
    const Te = xe;
    function Ae(e, t) {
      const s = this || Te,
        n = t || s,
        r = re.from(n.headers);
      let i = n.data;
      return (
        K.forEach(e, function (e) {
          i = e.call(s, i, r.normalize(), t ? t.status : void 0);
        }),
        r.normalize(),
        i
      );
    }
    function Le(e) {
      return !(!e || !e.__CANCEL__);
    }
    const ve = class extends oe {
      constructor(e, t, s) {
        (super(null == e ? 'canceled' : e, oe.ERR_CANCELED, t, s),
          (this.name = 'CanceledError'),
          (this.__CANCEL__ = !0));
      }
    };
    function ke(e, t, s) {
      const n = s.config.validateStatus;
      s.status && n && !n(s.status)
        ? t(
            new oe(
              'Request failed with status code ' + s.status,
              s.status >= 400 && s.status < 500 ? oe.ERR_BAD_REQUEST : oe.ERR_BAD_RESPONSE,
              s.config,
              s.request,
              s
            )
          )
        : e(s);
    }
    const Ie = (e, t, s = 3) => {
        let n = 0;
        const r = (function (e, t) {
          e = e || 10;
          const s = new Array(e),
            n = new Array(e);
          let r,
            i = 0,
            o = 0;
          return (
            (t = void 0 !== t ? t : 1e3),
            function (l) {
              const u = Date.now(),
                c = n[o];
              (r || (r = u), (s[i] = l), (n[i] = u));
              let a = o,
                h = 0;
              for (; a !== i; ) ((h += s[a++]), (a %= e));
              if (((i = (i + 1) % e), i === o && (o = (o + 1) % e), u - r < t)) return;
              const p = c && u - c;
              return p ? Math.round((1e3 * h) / p) : void 0;
            }
          );
        })(50, 250);
        return (function (e, t) {
          let s,
            n,
            r = 0,
            i = 1e3 / t;
          const o = (t, i = Date.now()) => {
            ((r = i), (s = null), n && (clearTimeout(n), (n = null)), e(...t));
          };
          return [
            (...e) => {
              const t = Date.now(),
                l = t - r;
              l >= i
                ? o(e, t)
                : ((s = e),
                  n ||
                    (n = setTimeout(() => {
                      ((n = null), o(s));
                    }, i - l)));
            },
            () => s && o(s),
          ];
        })((s) => {
          const i = s.loaded,
            o = s.lengthComputable ? s.total : void 0,
            l = null != o ? Math.min(i, o) : i,
            u = Math.max(0, l - n),
            c = r(u);
          ((n = Math.max(n, l)),
            e({
              loaded: l,
              total: o,
              progress: o ? l / o : void 0,
              bytes: u,
              rate: c || void 0,
              estimated: c && o ? (o - l) / c : void 0,
              event: s,
              lengthComputable: null != o,
              [t ? 'download' : 'upload']: !0,
            }));
        }, s);
      },
      je = (e, t) => {
        const s = null != e;
        return [(n) => t[0]({ lengthComputable: s, total: e, loaded: n }), t[1]];
      },
      Ne =
        (e) =>
        (...t) =>
          K.asap(() => e(...t)),
      De = Ce.hasStandardBrowserEnv
        ? ((e, t) => (s) => (
            (s = new URL(s, Ce.origin)),
            e.protocol === s.protocol && e.host === s.host && (t || e.port === s.port)
          ))(new URL(Ce.origin), Ce.navigator && /(msie|trident)/i.test(Ce.navigator.userAgent))
        : () => !0,
      Be = Ce.hasStandardBrowserEnv
        ? {
            write(e, t, s, n, r, i, o) {
              if ('undefined' == typeof document) return;
              const l = [`${e}=${encodeURIComponent(t)}`];
              (K.isNumber(s) && l.push(`expires=${new Date(s).toUTCString()}`),
                K.isString(n) && l.push(`path=${n}`),
                K.isString(r) && l.push(`domain=${r}`),
                !0 === i && l.push('secure'),
                K.isString(o) && l.push(`SameSite=${o}`),
                (document.cookie = l.join('; ')));
            },
            read(e) {
              if ('undefined' == typeof document) return null;
              const t = document.cookie.split(';');
              for (let s = 0; s < t.length; s++) {
                const n = t[s].replace(/^\s+/, ''),
                  r = n.indexOf('=');
                if (-1 !== r && n.slice(0, r) === e) return decodeURIComponent(n.slice(r + 1));
              }
              return null;
            },
            remove(e) {
              this.write(e, '', Date.now() - 864e5, '/');
            },
          }
        : { write() {}, read: () => null, remove() {} };
    function qe(e, t, s) {
      let n = !('string' == typeof (r = t) && /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r));
      var r;
      return e && (n || !1 === s)
        ? (function (e, t) {
            return t ? e.replace(/\/?\/$/, '') + '/' + t.replace(/^\/+/, '') : e;
          })(e, t)
        : t;
    }
    const Me = (e) => (e instanceof re ? { ...e } : e);
    function Ge(e, t) {
      t = t || {};
      const s = Object.create(null);
      function n(e, t, s, n) {
        return K.isPlainObject(e) && K.isPlainObject(t)
          ? K.merge.call({ caseless: n }, e, t)
          : K.isPlainObject(t)
            ? K.merge({}, t)
            : K.isArray(t)
              ? t.slice()
              : t;
      }
      function r(e, t, s, r) {
        return K.isUndefined(t) ? (K.isUndefined(e) ? void 0 : n(void 0, e, 0, r)) : n(e, t, 0, r);
      }
      function i(e, t) {
        if (!K.isUndefined(t)) return n(void 0, t);
      }
      function o(e, t) {
        return K.isUndefined(t) ? (K.isUndefined(e) ? void 0 : n(void 0, e)) : n(void 0, t);
      }
      function l(s, r, i) {
        return K.hasOwnProp(t, i) ? n(s, r) : K.hasOwnProp(e, i) ? n(void 0, s) : void 0;
      }
      Object.defineProperty(s, 'hasOwnProperty', {
        __proto__: null,
        value: Object.prototype.hasOwnProperty,
        enumerable: !1,
        writable: !0,
        configurable: !0,
      });
      const u = {
        url: i,
        method: i,
        data: i,
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
        validateStatus: l,
        headers: (e, t, s) => r(Me(e), Me(t), 0, !0),
      };
      return (
        K.forEach(Object.keys({ ...e, ...t }), function (n) {
          if ('__proto__' === n || 'constructor' === n || 'prototype' === n) return;
          const i = K.hasOwnProp(u, n) ? u[n] : r,
            o = i(K.hasOwnProp(e, n) ? e[n] : void 0, K.hasOwnProp(t, n) ? t[n] : void 0, n);
          (K.isUndefined(o) && i !== l) || (s[n] = o);
        }),
        s
      );
    }
    const ze = ['content-type', 'content-length'],
      We = (e) => {
        const t = Ge({}, e),
          s = (e) => (K.hasOwnProp(t, e) ? t[e] : void 0),
          n = s('data');
        let r = s('withXSRFToken');
        const i = s('xsrfHeaderName'),
          o = s('xsrfCookieName');
        let l = s('headers');
        const u = s('auth'),
          c = s('baseURL'),
          a = s('allowAbsoluteUrls'),
          h = s('url');
        var p;
        if (
          ((t.headers = l = re.from(l)),
          (t.url = _e(qe(c, h, a), e.params, e.paramsSerializer)),
          u &&
            l.set(
              'Authorization',
              'Basic ' +
                btoa(
                  (u.username || '') +
                    ':' +
                    (u.password
                      ? ((p = u.password),
                        encodeURIComponent(p).replace(/%([0-9A-F]{2})/gi, (e, t) =>
                          String.fromCharCode(parseInt(t, 16))
                        ))
                      : '')
                )
            ),
          K.isFormData(n) &&
            (Ce.hasStandardBrowserEnv || Ce.hasStandardBrowserWebWorkerEnv
              ? l.setContentType(void 0)
              : K.isFunction(n.getHeaders) &&
                (function (e, t, s) {
                  'content-only' === s
                    ? Object.entries(t).forEach(([t, s]) => {
                        ze.includes(t.toLowerCase()) && e.set(t, s);
                      })
                    : e.set(t);
                })(l, n.getHeaders(), s('formDataHeaderPolicy'))),
          Ce.hasStandardBrowserEnv &&
            (K.isFunction(r) && (r = r(t)), !0 === r || (null == r && De(t.url))))
        ) {
          const e = i && o && Be.read(o);
          e && l.set(i, e);
        }
        return t;
      };
    (Object.getOwnPropertyDescriptor(We, 'name') || {}).writable ||
      Object.defineProperty(We, 'name', { value: 'default', configurable: !0 });
    const He =
        'undefined' != typeof XMLHttpRequest &&
        function (e) {
          return new Promise(function (t, s) {
            const n = We(e);
            let r = n.data;
            const i = re.from(n.headers).normalize();
            let o,
              l,
              u,
              c,
              a,
              { responseType: h, onUploadProgress: p, onDownloadProgress: g } = n;
            function d() {
              (c && c(),
                a && a(),
                n.cancelToken && n.cancelToken.unsubscribe(o),
                n.signal && n.signal.removeEventListener('abort', o));
            }
            let f = new XMLHttpRequest();
            function m() {
              if (!f) return;
              const n = re.from('getAllResponseHeaders' in f && f.getAllResponseHeaders());
              (ke(
                function (e) {
                  (t(e), d());
                },
                function (e) {
                  (s(e), d());
                },
                {
                  data: h && 'text' !== h && 'json' !== h ? f.response : f.responseText,
                  status: f.status,
                  statusText: f.statusText,
                  headers: n,
                  config: e,
                  request: f,
                }
              ),
                (f = null));
            }
            (f.open(n.method.toUpperCase(), n.url, !0),
              (f.timeout = n.timeout),
              'onloadend' in f
                ? (f.onloadend = m)
                : (f.onreadystatechange = function () {
                    f &&
                      4 === f.readyState &&
                      (0 !== f.status || (f.responseURL && f.responseURL.startsWith('file:'))) &&
                      setTimeout(m);
                  }),
              (f.onabort = function () {
                f && (s(new oe('Request aborted', oe.ECONNABORTED, e, f)), d(), (f = null));
              }),
              (f.onerror = function (t) {
                const n = t && t.message ? t.message : 'Network Error',
                  r = new oe(n, oe.ERR_NETWORK, e, f);
                ((r.event = t || null), s(r), d(), (f = null));
              }),
              (f.ontimeout = function () {
                let t = n.timeout ? 'timeout of ' + n.timeout + 'ms exceeded' : 'timeout exceeded';
                const r = n.transitional || we;
                (n.timeoutErrorMessage && (t = n.timeoutErrorMessage),
                  s(new oe(t, r.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED, e, f)),
                  d(),
                  (f = null));
              }),
              void 0 === r && i.setContentType(null),
              'setRequestHeader' in f &&
                K.forEach(i.toJSON(), function (e, t) {
                  f.setRequestHeader(t, e);
                }),
              K.isUndefined(n.withCredentials) || (f.withCredentials = !!n.withCredentials),
              h && 'json' !== h && (f.responseType = n.responseType),
              g && (([u, a] = Ie(g, !0)), f.addEventListener('progress', u)),
              p &&
                f.upload &&
                (([l, c] = Ie(p)),
                f.upload.addEventListener('progress', l),
                f.upload.addEventListener('loadend', c)),
              (n.cancelToken || n.signal) &&
                ((o = (t) => {
                  f && (s(!t || t.type ? new ve(null, e, f) : t), f.abort(), d(), (f = null));
                }),
                n.cancelToken && n.cancelToken.subscribe(o),
                n.signal && (n.signal.aborted ? o() : n.signal.addEventListener('abort', o))));
            const _ = (function (e) {
              const t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
              return (t && t[1]) || '';
            })(n.url);
            !_ || Ce.protocols.includes(_)
              ? f.send(r || null)
              : s(new oe('Unsupported protocol ' + _ + ':', oe.ERR_BAD_REQUEST, e));
          });
        },
      Je = (e, t) => {
        const { length: s } = (e = e ? e.filter(Boolean) : []);
        if (t || s) {
          let s,
            n = new AbortController();
          const r = function (e) {
            if (!s) {
              ((s = !0), o());
              const t = e instanceof Error ? e : this.reason;
              n.abort(t instanceof oe ? t : new ve(t instanceof Error ? t.message : t));
            }
          };
          let i =
            t &&
            setTimeout(() => {
              ((i = null), r(new oe(`timeout of ${t}ms exceeded`, oe.ETIMEDOUT)));
            }, t);
          const o = () => {
            e &&
              (i && clearTimeout(i),
              (i = null),
              e.forEach((e) => {
                e.unsubscribe ? e.unsubscribe(r) : e.removeEventListener('abort', r);
              }),
              (e = null));
          };
          e.forEach((e) => e.addEventListener('abort', r));
          const { signal: l } = n;
          return ((l.unsubscribe = () => K.asap(o)), l);
        }
      },
      Qe = function* (e, t) {
        let s = e.byteLength;
        if (!t || s < t) return void (yield e);
        let n,
          r = 0;
        for (; r < s; ) ((n = r + t), yield e.slice(r, n), (r = n));
      },
      $e = (e, t, s, n) => {
        const r = (async function* (e, t) {
          for await (const s of (async function* (e) {
            if (e[Symbol.asyncIterator]) return void (yield* e);
            const t = e.getReader();
            try {
              for (;;) {
                const { done: e, value: s } = await t.read();
                if (e) break;
                yield s;
              }
            } finally {
              await t.cancel();
            }
          })(e))
            yield* Qe(s, t);
        })(e, t);
        let i,
          o = 0,
          l = (e) => {
            i || ((i = !0), n && n(e));
          };
        return new ReadableStream(
          {
            async pull(e) {
              try {
                const { done: t, value: n } = await r.next();
                if (t) return (l(), void e.close());
                let i = n.byteLength;
                if (s) {
                  let e = (o += i);
                  s(e);
                }
                e.enqueue(new Uint8Array(n));
              } catch (e) {
                throw (l(e), e);
              }
            },
            cancel: (e) => (l(e), r.return()),
          },
          { highWaterMark: 2 }
        );
      },
      Ke = '1.16.0',
      { isFunction: Ve } = K,
      Xe = (e, ...t) => {
        try {
          return !!e(...t);
        } catch (e) {
          return !1;
        }
      },
      Ye = (e) => {
        const t = K.global ?? globalThis,
          { ReadableStream: s, TextEncoder: n } = t;
        e = K.merge.call({ skipUndefined: !0 }, { Request: t.Request, Response: t.Response }, e);
        const { fetch: r, Request: i, Response: o } = e,
          l = r ? Ve(r) : 'function' == typeof fetch,
          u = Ve(i),
          c = Ve(o);
        if (!l) return !1;
        const a = l && Ve(s),
          h =
            l &&
            ('function' == typeof n
              ? ((p = new n()), (e) => p.encode(e))
              : async (e) => new Uint8Array(await new i(e).arrayBuffer()));
        var p;
        const g =
            u &&
            a &&
            Xe(() => {
              let e = !1;
              const t = new i(Ce.origin, {
                  body: new s(),
                  method: 'POST',
                  get duplex() {
                    return ((e = !0), 'half');
                  },
                }),
                n = t.headers.has('Content-Type');
              return (null != t.body && t.body.cancel(), e && !n);
            }),
          d = c && a && Xe(() => K.isReadableStream(new o('').body)),
          f = { stream: d && ((e) => e.body) };
        l &&
          ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach((e) => {
            !f[e] &&
              (f[e] = (t, s) => {
                let n = t && t[e];
                if (n) return n.call(t);
                throw new oe(`Response type '${e}' is not supported`, oe.ERR_NOT_SUPPORT, s);
              });
          });
        const m = async (e, t) => {
          const s = K.toFiniteNumber(e.getContentLength());
          return null == s
            ? (async (e) => {
                if (null == e) return 0;
                if (K.isBlob(e)) return e.size;
                if (K.isSpecCompliantForm(e)) {
                  const t = new i(Ce.origin, { method: 'POST', body: e });
                  return (await t.arrayBuffer()).byteLength;
                }
                return K.isArrayBufferView(e) || K.isArrayBuffer(e)
                  ? e.byteLength
                  : (K.isURLSearchParams(e) && (e += ''),
                    K.isString(e) ? (await h(e)).byteLength : void 0);
              })(t)
            : s;
        };
        return async (e) => {
          let {
            url: t,
            method: s,
            data: l,
            signal: c,
            cancelToken: a,
            timeout: h,
            onDownloadProgress: p,
            onUploadProgress: _,
            responseType: R,
            headers: w,
            withCredentials: b = 'same-origin',
            fetchOptions: y,
            maxContentLength: P,
            maxBodyLength: U,
          } = We(e);
          const E = K.isNumber(P) && P > -1,
            O = K.isNumber(U) && U > -1;
          let C = r || fetch;
          R = R ? (R + '').toLowerCase() : 'text';
          let S = Je([c, a && a.toAbortSignal()], h),
            F = null;
          const x =
            S &&
            S.unsubscribe &&
            (() => {
              S.unsubscribe();
            });
          let T;
          try {
            if (E && 'string' == typeof t && t.startsWith('data:')) {
              const s = (function (e) {
                if (!e || 'string' != typeof e) return 0;
                if (!e.startsWith('data:')) return 0;
                const t = e.indexOf(',');
                if (t < 0) return 0;
                const s = e.slice(5, t),
                  n = e.slice(t + 1);
                if (/;base64/i.test(s)) {
                  let e = n.length;
                  const t = n.length;
                  for (let s = 0; s < t; s++)
                    if (37 === n.charCodeAt(s) && s + 2 < t) {
                      const t = n.charCodeAt(s + 1),
                        r = n.charCodeAt(s + 2);
                      ((t >= 48 && t <= 57) || (t >= 65 && t <= 70) || (t >= 97 && t <= 102)) &&
                        ((r >= 48 && r <= 57) || (r >= 65 && r <= 70) || (r >= 97 && r <= 102)) &&
                        ((e -= 2), (s += 2));
                    }
                  let s = 0,
                    r = t - 1;
                  const i = (e) =>
                    e >= 2 &&
                    37 === n.charCodeAt(e - 2) &&
                    51 === n.charCodeAt(e - 1) &&
                    (68 === n.charCodeAt(e) || 100 === n.charCodeAt(e));
                  (r >= 0 && (61 === n.charCodeAt(r) ? (s++, r--) : i(r) && (s++, (r -= 3))),
                    1 === s && r >= 0 && (61 === n.charCodeAt(r) || i(r)) && s++);
                  const o = 3 * Math.floor(e / 4) - (s || 0);
                  return o > 0 ? o : 0;
                }
                if ('undefined' != typeof Buffer && 'function' == typeof Buffer.byteLength)
                  return Buffer.byteLength(n, 'utf8');
                let r = 0;
                for (let e = 0, t = n.length; e < t; e++) {
                  const s = n.charCodeAt(e);
                  if (s < 128) r += 1;
                  else if (s < 2048) r += 2;
                  else if (s >= 55296 && s <= 56319 && e + 1 < t) {
                    const t = n.charCodeAt(e + 1);
                    t >= 56320 && t <= 57343 ? ((r += 4), e++) : (r += 3);
                  } else r += 3;
                }
                return r;
              })(t);
              if (s > P)
                throw new oe(
                  'maxContentLength size of ' + P + ' exceeded',
                  oe.ERR_BAD_RESPONSE,
                  e,
                  F
                );
            }
            if (O && 'get' !== s && 'head' !== s) {
              const t = await m(w, l);
              if ('number' == typeof t && isFinite(t) && t > U)
                throw new oe(
                  'Request body larger than maxBodyLength limit',
                  oe.ERR_BAD_REQUEST,
                  e,
                  F
                );
            }
            if (_ && g && 'get' !== s && 'head' !== s && 0 !== (T = await m(w, l))) {
              let e,
                s = new i(t, { method: 'POST', body: l, duplex: 'half' });
              if (
                (K.isFormData(l) && (e = s.headers.get('content-type')) && w.setContentType(e),
                s.body)
              ) {
                const [e, t] = je(T, Ie(Ne(_)));
                l = $e(s.body, 65536, e, t);
              }
            }
            K.isString(b) || (b = b ? 'include' : 'omit');
            const r = u && 'credentials' in i.prototype;
            if (K.isFormData(l)) {
              const e = w.getContentType();
              e &&
                /^multipart\/form-data/i.test(e) &&
                !/boundary=/i.test(e) &&
                w.delete('content-type');
            }
            w.set('User-Agent', 'axios/' + Ke, !1);
            const c = {
              ...y,
              signal: S,
              method: s.toUpperCase(),
              headers: w.normalize().toJSON(),
              body: l,
              duplex: 'half',
              credentials: r ? b : void 0,
            };
            F = u && new i(t, c);
            let a = await (u ? C(F, y) : C(t, c));
            if (E) {
              const t = K.toFiniteNumber(a.headers.get('content-length'));
              if (null != t && t > P)
                throw new oe(
                  'maxContentLength size of ' + P + ' exceeded',
                  oe.ERR_BAD_RESPONSE,
                  e,
                  F
                );
            }
            const h = d && ('stream' === R || 'response' === R);
            if (d && a.body && (p || E || (h && x))) {
              const t = {};
              ['status', 'statusText', 'headers'].forEach((e) => {
                t[e] = a[e];
              });
              const s = K.toFiniteNumber(a.headers.get('content-length')),
                [n, r] = (p && je(s, Ie(Ne(p), !0))) || [];
              let i = 0;
              const l = (t) => {
                if (E && ((i = t), i > P))
                  throw new oe(
                    'maxContentLength size of ' + P + ' exceeded',
                    oe.ERR_BAD_RESPONSE,
                    e,
                    F
                  );
                n && n(t);
              };
              a = new o(
                $e(a.body, 65536, l, () => {
                  (r && r(), x && x());
                }),
                t
              );
            }
            R = R || 'text';
            let A = await f[K.findKey(f, R) || 'text'](a, e);
            if (E && !d && !h) {
              let t;
              if (
                (null != A &&
                  ('number' == typeof A.byteLength
                    ? (t = A.byteLength)
                    : 'number' == typeof A.size
                      ? (t = A.size)
                      : 'string' == typeof A &&
                        (t = 'function' == typeof n ? new n().encode(A).byteLength : A.length)),
                'number' == typeof t && t > P)
              )
                throw new oe(
                  'maxContentLength size of ' + P + ' exceeded',
                  oe.ERR_BAD_RESPONSE,
                  e,
                  F
                );
            }
            return (
              !h && x && x(),
              await new Promise((t, s) => {
                ke(t, s, {
                  data: A,
                  headers: re.from(a.headers),
                  status: a.status,
                  statusText: a.statusText,
                  config: e,
                  request: F,
                });
              })
            );
          } catch (t) {
            if ((x && x(), S && S.aborted && S.reason instanceof oe)) {
              const s = S.reason;
              throw ((s.config = e), F && (s.request = F), t !== s && (s.cause = t), s);
            }
            if (t && 'TypeError' === t.name && /Load failed|fetch/i.test(t.message))
              throw Object.assign(new oe('Network Error', oe.ERR_NETWORK, e, F, t && t.response), {
                cause: t.cause || t,
              });
            throw oe.from(t, t && t.code, e, F, t && t.response);
          }
        };
      },
      Ze = new Map(),
      et = (e) => {
        let t = (e && e.env) || {};
        const { fetch: s, Request: n, Response: r } = t,
          i = [n, r, s];
        let o,
          l,
          u = i.length,
          c = Ze;
        for (; u--; )
          ((o = i[u]),
            (l = c.get(o)),
            void 0 === l && c.set(o, (l = u ? new Map() : Ye(t))),
            (c = l));
        return l;
      },
      tt = (et(), { http: null, xhr: He, fetch: { get: et } });
    K.forEach(tt, (e, t) => {
      if (e) {
        try {
          Object.defineProperty(e, 'name', { __proto__: null, value: t });
        } catch (e) {}
        Object.defineProperty(e, 'adapterName', { __proto__: null, value: t });
      }
    });
    const st = (e) => `- ${e}`,
      nt = (e) => K.isFunction(e) || null === e || !1 === e,
      rt = function (e, t) {
        e = K.isArray(e) ? e : [e];
        const { length: s } = e;
        let n, r;
        const i = {};
        for (let o = 0; o < s; o++) {
          let s;
          if (
            ((n = e[o]), (r = n), !nt(n) && ((r = tt[(s = String(n)).toLowerCase()]), void 0 === r))
          )
            throw new oe(`Unknown adapter '${s}'`);
          if (r && (K.isFunction(r) || (r = r.get(t)))) break;
          i[s || '#' + o] = r;
        }
        if (!r) {
          const e = Object.entries(i).map(
            ([e, t]) =>
              `adapter ${e} ` +
              (!1 === t ? 'is not supported by the environment' : 'is not available in the build')
          );
          let t = s
            ? e.length > 1
              ? 'since :\n' + e.map(st).join('\n')
              : ' ' + st(e[0])
            : 'as no adapter specified';
          throw new oe(
            'There is no suitable adapter to dispatch the request ' + t,
            'ERR_NOT_SUPPORT'
          );
        }
        return r;
      };
    function it(e) {
      if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
        throw new ve(null, e);
    }
    function ot(e) {
      return (
        it(e),
        (e.headers = re.from(e.headers)),
        (e.data = Ae.call(e, e.transformRequest)),
        -1 !== ['post', 'put', 'patch'].indexOf(e.method) &&
          e.headers.setContentType('application/x-www-form-urlencoded', !1),
        rt(
          e.adapter || Te.adapter,
          e
        )(e).then(
          function (t) {
            (it(e), (e.response = t));
            try {
              t.data = Ae.call(e, e.transformResponse, t);
            } finally {
              delete e.response;
            }
            return ((t.headers = re.from(t.headers)), t);
          },
          function (t) {
            if (!Le(t) && (it(e), t && t.response)) {
              e.response = t.response;
              try {
                t.response.data = Ae.call(e, e.transformResponse, t.response);
              } finally {
                delete e.response;
              }
              t.response.headers = re.from(t.response.headers);
            }
            return Promise.reject(t);
          }
        )
      );
    }
    const lt = {};
    ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((e, t) => {
      lt[e] = function (s) {
        return typeof s === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
      };
    });
    const ut = {};
    ((lt.transitional = function (e, t, s) {
      function n(e, t) {
        return '[Axios v' + Ke + "] Transitional option '" + e + "'" + t + (s ? '. ' + s : '');
      }
      return (s, r, i) => {
        if (!1 === e)
          throw new oe(n(r, ' has been removed' + (t ? ' in ' + t : '')), oe.ERR_DEPRECATED);
        return (
          t &&
            !ut[r] &&
            ((ut[r] = !0),
            console.warn(
              n(r, ' has been deprecated since v' + t + ' and will be removed in the near future')
            )),
          !e || e(s, r, i)
        );
      };
    }),
      (lt.spelling = function (e) {
        return (t, s) => (console.warn(`${s} is likely a misspelling of ${e}`), !0);
      }));
    const ct = {
        assertOptions: function (e, t, s) {
          if ('object' != typeof e)
            throw new oe('options must be an object', oe.ERR_BAD_OPTION_VALUE);
          const n = Object.keys(e);
          let r = n.length;
          for (; r-- > 0; ) {
            const i = n[r],
              o = Object.prototype.hasOwnProperty.call(t, i) ? t[i] : void 0;
            if (o) {
              const t = e[i],
                s = void 0 === t || o(t, i, e);
              if (!0 !== s) throw new oe('option ' + i + ' must be ' + s, oe.ERR_BAD_OPTION_VALUE);
              continue;
            }
            if (!0 !== s) throw new oe('Unknown option ' + i, oe.ERR_BAD_OPTION);
          }
        },
        validators: lt,
      },
      at = ct.validators;
    class ht {
      constructor(e) {
        ((this.defaults = e || {}),
          (this.interceptors = { request: new Re(), response: new Re() }));
      }
      async request(e, t) {
        try {
          return await this._request(e, t);
        } catch (e) {
          if (e instanceof Error) {
            let t = {};
            Error.captureStackTrace ? Error.captureStackTrace(t) : (t = new Error());
            const s = (() => {
              if (!t.stack) return '';
              const e = t.stack.indexOf('\n');
              return -1 === e ? '' : t.stack.slice(e + 1);
            })();
            try {
              if (e.stack) {
                if (s) {
                  const t = s.indexOf('\n'),
                    n = -1 === t ? -1 : s.indexOf('\n', t + 1),
                    r = -1 === n ? '' : s.slice(n + 1);
                  String(e.stack).endsWith(r) || (e.stack += '\n' + s);
                }
              } else e.stack = s;
            } catch (e) {}
          }
          throw e;
        }
      }
      _request(e, t) {
        ('string' == typeof e ? ((t = t || {}).url = e) : (t = e || {}),
          (t = Ge(this.defaults, t)));
        const { transitional: s, paramsSerializer: n, headers: r } = t;
        (void 0 !== s &&
          ct.assertOptions(
            s,
            {
              silentJSONParsing: at.transitional(at.boolean),
              forcedJSONParsing: at.transitional(at.boolean),
              clarifyTimeoutError: at.transitional(at.boolean),
              legacyInterceptorReqResOrdering: at.transitional(at.boolean),
            },
            !1
          ),
          null != n &&
            (K.isFunction(n)
              ? (t.paramsSerializer = { serialize: n })
              : ct.assertOptions(n, { encode: at.function, serialize: at.function }, !0)),
          void 0 !== t.allowAbsoluteUrls ||
            (void 0 !== this.defaults.allowAbsoluteUrls
              ? (t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
              : (t.allowAbsoluteUrls = !0)),
          ct.assertOptions(
            t,
            { baseUrl: at.spelling('baseURL'), withXsrfToken: at.spelling('withXSRFToken') },
            !0
          ),
          (t.method = (t.method || this.defaults.method || 'get').toLowerCase()));
        let i = r && K.merge(r.common, r[t.method]);
        (r &&
          K.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'query', 'common'], (e) => {
            delete r[e];
          }),
          (t.headers = re.concat(i, r)));
        const o = [];
        let l = !0;
        this.interceptors.request.forEach(function (e) {
          if ('function' == typeof e.runWhen && !1 === e.runWhen(t)) return;
          l = l && e.synchronous;
          const s = t.transitional || we;
          s && s.legacyInterceptorReqResOrdering
            ? o.unshift(e.fulfilled, e.rejected)
            : o.push(e.fulfilled, e.rejected);
        });
        const u = [];
        let c;
        this.interceptors.response.forEach(function (e) {
          u.push(e.fulfilled, e.rejected);
        });
        let a,
          h = 0;
        if (!l) {
          const e = [ot.bind(this), void 0];
          for (e.unshift(...o), e.push(...u), a = e.length, c = Promise.resolve(t); h < a; )
            c = c.then(e[h++], e[h++]);
          return c;
        }
        a = o.length;
        let p = t;
        for (; h < a; ) {
          const e = o[h++],
            t = o[h++];
          try {
            p = e(p);
          } catch (e) {
            t.call(this, e);
            break;
          }
        }
        try {
          c = ot.call(this, p);
        } catch (e) {
          return Promise.reject(e);
        }
        for (h = 0, a = u.length; h < a; ) c = c.then(u[h++], u[h++]);
        return c;
      }
      getUri(e) {
        return _e(
          qe((e = Ge(this.defaults, e)).baseURL, e.url, e.allowAbsoluteUrls),
          e.params,
          e.paramsSerializer
        );
      }
    }
    (K.forEach(['delete', 'get', 'head', 'options'], function (e) {
      ht.prototype[e] = function (t, s) {
        return this.request(Ge(s || {}, { method: e, url: t, data: (s || {}).data }));
      };
    }),
      K.forEach(['post', 'put', 'patch', 'query'], function (e) {
        function t(t) {
          return function (s, n, r) {
            return this.request(
              Ge(r || {}, {
                method: e,
                headers: t ? { 'Content-Type': 'multipart/form-data' } : {},
                url: s,
                data: n,
              })
            );
          };
        }
        ((ht.prototype[e] = t()), 'query' !== e && (ht.prototype[e + 'Form'] = t(!0)));
      }));
    const pt = ht;
    class gt {
      constructor(e) {
        if ('function' != typeof e) throw new TypeError('executor must be a function.');
        let t;
        this.promise = new Promise(function (e) {
          t = e;
        });
        const s = this;
        (this.promise.then((e) => {
          if (!s._listeners) return;
          let t = s._listeners.length;
          for (; t-- > 0; ) s._listeners[t](e);
          s._listeners = null;
        }),
          (this.promise.then = (e) => {
            let t;
            const n = new Promise((e) => {
              (s.subscribe(e), (t = e));
            }).then(e);
            return (
              (n.cancel = function () {
                s.unsubscribe(t);
              }),
              n
            );
          }),
          e(function (e, n, r) {
            s.reason || ((s.reason = new ve(e, n, r)), t(s.reason));
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
        return (this.subscribe(t), (e.signal.unsubscribe = () => this.unsubscribe(t)), e.signal);
      }
      static source() {
        let e;
        return {
          token: new gt(function (t) {
            e = t;
          }),
          cancel: e,
        };
      }
    }
    const dt = gt,
      ft = {
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
    Object.entries(ft).forEach(([e, t]) => {
      ft[t] = e;
    });
    const mt = ft,
      _t = (function e(t) {
        const s = new pt(t),
          r = n(pt.prototype.request, s);
        return (
          K.extend(r, pt.prototype, s, { allOwnKeys: !0 }),
          K.extend(r, s, null, { allOwnKeys: !0 }),
          (r.create = function (s) {
            return e(Ge(t, s));
          }),
          r
        );
      })(Te);
    ((_t.Axios = pt),
      (_t.CanceledError = ve),
      (_t.CancelToken = dt),
      (_t.isCancel = Le),
      (_t.VERSION = Ke),
      (_t.toFormData = he),
      (_t.AxiosError = oe),
      (_t.Cancel = _t.CanceledError),
      (_t.all = function (e) {
        return Promise.all(e);
      }),
      (_t.spread = function (e) {
        return function (t) {
          return e.apply(null, t);
        };
      }),
      (_t.isAxiosError = function (e) {
        return K.isObject(e) && !0 === e.isAxiosError;
      }),
      (_t.mergeConfig = Ge),
      (_t.AxiosHeaders = re),
      (_t.formToJSON = (e) => Se(K.isHTMLForm(e) ? new FormData(e) : e)),
      (_t.getAdapter = rt),
      (_t.HttpStatusCode = mt),
      (_t.default = _t));
    const Rt = _t;
    class wt {
      static getErrorMessage(e) {
        return e.error ? e.error.message : '';
      }
      static getLinkRelationUrls(e, t) {
        return e.links.filter((e) => e.rel === t).map((e) => e.href);
      }
      static getItemDescriptors(e) {
        const t = {};
        for (let s of e.data) t[s.name] = s.value;
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
        let s = 0;
        for (let n in e) (e.hasOwnProperty(n) && (t.data[s] = { name: n, value: e[n] }), s++);
        return t;
      }
    }
    class bt extends Error {
      constructor(...e) {
        (super(...e),
          (this.name = this.constructor.name),
          (this.request = null),
          (this.response = null));
      }
    }
    class yt {
      constructor(e, t, s = 3e4) {
        ((this.auth = e), (this.contentType = t), (this.timeout = s));
      }
      get(e, t = null) {
        const s = this._getConfig(e, 'get');
        return (t && (s.params = t), yt._callAxios(s));
      }
      getStream(e, t = null) {
        const s = this._getConfig(e, 'get');
        return (
          t && (s.params = t),
          (s.responseType = 'undefined' == typeof window ? 'stream' : 'blob'),
          yt._callAxios(s)
        );
      }
      post(e, t, s = null) {
        return this._postOrPut('post', e, t, s);
      }
      put(e, t, s = null) {
        return this._postOrPut('put', e, t, s);
      }
      delete(e) {
        const t = this._getConfig(e, 'delete');
        return yt._callAxios(t);
      }
      _postOrPut(e, t, s, n = null) {
        const r = this._getConfig(t, e);
        if (((r.data = s), n)) {
          r.headers['Content-Type'] = 'multipart/form-data';
          const e = new FormData();
          for (let t in s) s.hasOwnProperty(t) && e.set(t, s[t]);
          for (let t in n) n.hasOwnProperty(t) && e.set(t, n[t]);
          r.data = e;
        }
        return yt._callAxios(r);
      }
      _getConfig(e, t) {
        const s = {
          url: e,
          method: t,
          headers: { Accept: this.contentType, 'Content-Type': this.contentType },
          timeout: this.timeout,
        };
        return (
          this.auth && this.auth.username && this.auth.password
            ? (s.auth = this.auth)
            : this.auth &&
              this.auth.token &&
              (s.headers.Authorization = 'Token ' + this.auth.token),
          'application/octet-stream' === this.contentType &&
            (s.responseType = 'undefined' == typeof window ? 'arraybuffer' : 'blob'),
          s
        );
      }
      static _callAxios(e) {
        return Rt(e)
          .then((e) => e)
          .catch((e) => {
            yt._handleRequestError(e);
          });
      }
      static _handleRequestError(e) {
        let t;
        if (e.response) {
          let s = 'Bad server response!';
          (e.response.data.collection && (s = wt.getErrorMessage(e.response.data.collection)),
            (t = new bt(s)),
            (t.request = e.request),
            (t.response = e.response));
          try {
            t.response.data = JSON.parse(s);
          } catch (e) {
            t.response.data = s;
          }
        } else
          e.request
            ? ((t = new bt('No server response!')), (t.request = e.request))
            : (t = new bt(e.message));
        throw t;
      }
      static runAsyncTask(e) {
        let t = e(),
          s = t.next();
        !(function e() {
          s.done ||
            s.value
              .then((n) => {
                ((s = t.next(n)), e());
              })
              .catch((n) => {
                ((s = t.throw(n)), e());
              });
        })();
      }
    }
    class Pt {
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
        return Pt.cloneObj(this);
      }
      static cloneObj(e) {
        const t = Object.create(Object.getPrototypeOf(e));
        for (let s in e)
          null !== e[s] && 'object' == typeof e[s]
            ? (t[s] = JSON.parse(JSON.stringify(e[s])))
            : (t[s] = e[s]);
        return t;
      }
    }
    class Ut extends Pt {
      constructor(e, t = null) {
        super(e, t);
      }
      get(e = 3e4) {
        return new yt(this.auth, this.contentType, e)
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
        return this.isEmpty ? null : wt.getItemDescriptors(this.collection.items[0]);
      }
      getPUTParameters() {
        return this.collection && this.collection.template
          ? wt.getTemplateDescriptorNames(this.collection.template)
          : null;
      }
      _getResource(e, t, s = null, n = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const r = this.collection.items[0],
          i = wt.getLinkRelationUrls(r, e);
        if (!i.length) throw new bt('Missing "' + e + '" link relation!');
        const o = new t(i[0], this.auth);
        return 'searchParams' in o ? o.get(s, n) : o.get(n);
      }
      _put(e, t, s = 3e4) {
        const n = new yt(this.auth, this.contentType, s);
        let r = e;
        return (
          t ||
            'application/vnd.collection+json' !== this.contentType ||
            (r = { template: wt.makeTemplate(e) }),
          n
            .put(this.url, r, t)
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
        return new yt(this.auth, this.contentType, e).delete(this.url).then(() => {
          this.collection = null;
        });
      }
    }
    class Et extends Pt {
      constructor(e, t = null) {
        (super(e, t), (this.queryUrl = ''), (this.searchParams = null), (this.itemClass = Ut));
      }
      get(e = null, t = 3e4) {
        const s = new yt(this.auth, this.contentType, t),
          n = (t) => (
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
                s.get(this.queryUrl, e).then(n)
              );
          return s.get(this.url, e).then(n);
        }
        return s.get(this.url).then(n);
      }
      getSearchParameters() {
        if (this.collection) {
          if (this.collection.queries) {
            const e = wt.getQueryParameters(this.collection.queries);
            return (e.push('limit', 'offset'), e);
          }
          return ['limit', 'offset'];
        }
        return null;
      }
      getItem(e) {
        if (this.isEmpty) return null;
        const t = this.collection.items.filter((t) => wt.getItemDescriptors(t).id === e);
        if (!t.length) return null;
        const s = new this.itemClass(t[0].href, this.auth);
        return (
          (s.collection = wt.createCollectionObj()),
          s.collection.items.push(t[0]),
          (s.collection.href = t[0].href),
          s
        );
      }
      getItems() {
        return this.isEmpty
          ? []
          : this.collection.items.map((e) => {
              const t = new this.itemClass(e.href, this.auth);
              return (
                (t.collection = wt.createCollectionObj()),
                t.collection.items.push(e),
                (t.collection.href = e.href),
                t
              );
            });
      }
      get data() {
        if (this.isEmpty) return null;
        const e = [];
        for (let t of this.collection.items) e.push(wt.getItemDescriptors(t));
        return e;
      }
      get totalCount() {
        return this.collection ? wt.getTotalNumberOfItems(this.collection) : -1;
      }
      get hasNextPage() {
        return !(!this.collection || !wt.getLinkRelationUrls(this.collection, 'next').length);
      }
      get hasPreviousPage() {
        return !(!this.collection || !wt.getLinkRelationUrls(this.collection, 'previous').length);
      }
      getPOSTParameters() {
        return this.collection && this.collection.template
          ? wt.getTemplateDescriptorNames(this.collection.template)
          : null;
      }
      _getResource(e, t, s = null, n = 3e4) {
        if (!this.collection) throw new bt('Collection object has not been set!');
        const r = wt.getLinkRelationUrls(this.collection, e);
        if (!r.length) throw new bt('Missing "' + e + '" link relation!');
        const i = new t(r[0], this.auth);
        return 'searchParams' in i ? i.get(s, n) : i.get(n);
      }
      _post(e, t, s = 3e4) {
        const n = this.url,
          r = new yt(this.auth, this.contentType, s);
        let i = e;
        return (
          t ||
            'application/vnd.collection+json' !== this.contentType ||
            (i = { template: wt.makeTemplate(e) }),
          r
            .post(n, i, t)
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
    class Ot extends Ut {
      constructor(e, t) {
        super(e, t);
      }
    }
    class Ct extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getUsers(e = null, t = 3e4) {
        const s = xt;
        return this._getResource('users', s, e, t);
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
    class St extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Ct));
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Ft extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getUser(e = 3e4) {
        const t = At;
        return this._getResource('user', t, null, e);
      }
      getGroup(e = 3e4) {
        const t = Ct;
        return this._getResource('group', t, null, e);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class xt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Ft));
      }
      getGroup(e = 3e4) {
        const t = Ct;
        return this._getResource('group', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Tt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Ct));
      }
      getUser(e = 3e4) {
        const t = At;
        return this._getResource('user', t, null, e);
      }
    }
    class At extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getGroups(e = null, t = 3e4) {
        const s = Tt;
        return this._getResource('groups', s, e, t);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
    }
    class Lt extends Ut {
      getPlugin(e = 3e4) {
        const t = Us;
        return this._getResource('plugin', t, null, e);
      }
    }
    class vt extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Lt));
      }
      getPlugin(e = 3e4) {
        const t = Us;
        return this._getResource('plugin', t, null, e);
      }
    }
    class kt extends Ut {
      getParent(e = 3e4) {
        const t = kt;
        return this._getResource('parent', t, null, e);
      }
      getChildren(e = null, t = 3e4) {
        const s = jt;
        return this._getResource('children', s, e, t);
      }
      getFiles(e = null, t = 3e4) {
        const s = Dt;
        return this._getResource('files', s, e, t);
      }
      getLinkFiles(e = null, t = 3e4) {
        const s = qt;
        return this._getResource('link_files', s, e, t);
      }
      getGroupPermissions(e = null, t = 3e4) {
        const s = Gt;
        return this._getResource('group_permissions', s, e, t);
      }
      getGroupPermission(e, t = 3e4) {
        return this.getGroupPermissions({ group_name: e }, t).then((e) => {
          const t = e.getItems();
          return t.length ? t[0] : null;
        });
      }
      getUserPermissions(e = null, t = 3e4) {
        const s = Wt;
        return this._getResource('user_permissions', s, e, t);
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
      addGroupPermission(e, t, s = 3e4) {
        return this.getGroupPermissions(null, s)
          .then((s) => s.post({ grp_name: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      addUserPermission(e, t, s = 3e4) {
        return this.getUserPermissions(null, s)
          .then((s) => s.post({ username: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class It extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = kt));
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class jt extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = kt));
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
    }
    class Nt extends Ut {
      getFileBlob(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = new yt(this.auth, 'application/octet-stream', e),
          s = this.collection.items[0],
          n = wt.getLinkRelationUrls(s, 'file_resource')[0];
        return t.get(n).then((e) => e.data);
      }
      getParentFolder(e = 3e4) {
        const t = kt;
        return this._getResource('parent_folder', t, null, e);
      }
      getGroupPermissions(e = null, t = 3e4) {
        const s = Jt;
        return this._getResource('group_permissions', s, e, t);
      }
      getGroupPermission(e, t = 3e4) {
        return this.getGroupPermissions({ group_name: e }, t).then((e) => {
          const t = e.getItems();
          return t.length ? t[0] : null;
        });
      }
      getUserPermissions(e = null, t = 3e4) {
        const s = $t;
        return this._getResource('user_permissions', s, e, t);
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
      addGroupPermission(e, t, s = 3e4) {
        return this.getGroupPermissions(null, s)
          .then((s) => s.post({ grp_name: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      addUserPermission(e, t, s = 3e4) {
        return this.getUserPermissions(null, s)
          .then((s) => s.post({ username: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class Dt extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Nt));
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
    }
    class Bt extends Ut {
      getFileBlob(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = new yt(this.auth, 'application/octet-stream', e),
          s = this.collection.items[0],
          n = wt.getLinkRelationUrls(s, 'file_resource')[0];
        return t.get(n).then((e) => e.data);
      }
      getParentFolder(e = 3e4) {
        const t = kt;
        return this._getResource('parent_folder', t, null, e);
      }
      getLinkedResource(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = this.collection.items[0];
        let s = 'linked_folder',
          n = kt;
        return wt.getLinkRelationUrls(t, s).length ||
          ((s = 'linked_file'), (n = Nt), wt.getLinkRelationUrls(t, s).length)
          ? this._getResource(s, n, null, e)
          : null;
      }
      getGroupPermissions(e = null, t = 3e4) {
        const s = Vt;
        return this._getResource('group_permissions', s, e, t);
      }
      getGroupPermission(e, t = 3e4) {
        return this.getGroupPermissions({ group_name: e }, t).then((e) => {
          const t = e.getItems();
          return t.length ? t[0] : null;
        });
      }
      getUserPermissions(e = null, t = 3e4) {
        const s = Yt;
        return this._getResource('user_permissions', s, e, t);
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
      addGroupPermission(e, t, s = 3e4) {
        return this.getGroupPermissions(null, s)
          .then((s) => s.post({ grp_name: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      addUserPermission(e, t, s = 3e4) {
        return this.getUserPermissions(null, s)
          .then((s) => s.post({ username: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class qt extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Bt));
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
    }
    class Mt extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFolder(e = 3e4) {
        const t = kt;
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
    class Gt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Mt));
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class zt extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFolder(e = 3e4) {
        const t = kt;
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
    class Wt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = zt));
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Ht extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFile(e = 3e4) {
        const t = Nt;
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
    class Jt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Ht));
      }
      getFile(e = 3e4) {
        const t = Nt;
        return this._getResource('file', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Qt extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFile(e = 3e4) {
        const t = Nt;
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
    class $t extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Qt));
      }
      getFile(e = 3e4) {
        const t = Nt;
        return this._getResource('file', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Kt extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getLinkFile(e = 3e4) {
        const t = Bt;
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
    class Vt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Kt));
      }
      getLinkFile(e = 3e4) {
        const t = Bt;
        return this._getResource('link_file', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Xt extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getLinkFile(e = 3e4) {
        const t = Bt;
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
    class Yt extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Xt));
      }
      getLinkFile(e = 3e4) {
        const t = Bt;
        return this._getResource('link_file', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Zt extends Ut {
      getPlugins(e = null, t = 3e4) {
        const s = ns;
        return this._getResource('plugins', s, e, t);
      }
      getPluginPipings(e = null, t = 3e4) {
        const s = rs;
        return this._getResource('plugin_pipings', s, e, t);
      }
      getDefaultParameters(e = null, t = 3e4) {
        const s = is;
        return this._getResource('default_parameters', s, e, t);
      }
      getWorkflows(e = null, t = 3e4) {
        const s = cs;
        return this._getResource('workflows', s, e, t);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class es extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Zt));
      }
      getPlugins(e = null, t = 3e4) {
        const s = Es;
        return this._getResource('plugins', s, e, t);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class ts extends Ut {
      getPreviousPluginPiping(e = 3e4) {
        const t = ts;
        try {
          return this._getResource('previous', t, null, e);
        } catch (e) {
          return Promise.resolve(null);
        }
      }
      getPlugin(e = 3e4) {
        const t = Us;
        return this._getResource('plugin', t, null, e);
      }
      getPipeline(e = 3e4) {
        const t = Zt;
        return this._getResource('pipeline', t, null, e);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
    }
    class ss extends Ut {
      getPluginPiping(e = 3e4) {
        const t = ts;
        return this._getResource('plugin_piping', t, null, e);
      }
      getPluginParameter(e = 3e4) {
        const t = Lt;
        return this._getResource('plugin_param', t, null, e);
      }
    }
    class ns extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Us));
      }
    }
    class rs extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = ts));
      }
    }
    class is extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = ss));
      }
    }
    class os extends Ut {
      getFileBlob(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = new yt(this.auth, 'application/octet-stream', e),
          s = this.collection.items[0],
          n = wt.getLinkRelationUrls(s, 'file_resource')[0];
        return t.get(n).then((e) => e.data);
      }
      getParentFolder(e = 3e4) {
        const t = kt;
        return this._getResource('parent_folder', t, null, e);
      }
    }
    class ls extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = os));
      }
      post(e, t, s = 3e4) {
        return this._post(e, t, s);
      }
    }
    class us extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getPipeline(e = 3e4) {
        const t = Zt;
        return this._getResource('pipeline', t, null, e);
      }
      getPluginInstances(e = null, t = 3e4) {
        const s = fs;
        return this._getResource('plugin_instances', s, e, t);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class cs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = us));
      }
      getPipeline(e = 3e4) {
        const t = Zt;
        return this._getResource('pipeline', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class as extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = us));
      }
      getPipelines(e = null, t = 3e4) {
        const s = es;
        return this._getResource('pipelines', s, e, t);
      }
    }
    class hs extends Ut {
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      getPlugin(e = 3e4) {
        const t = Us;
        return this._getResource('plugin', t, null, e);
      }
      getOutputFolder(e = 3e4) {
        const t = kt;
        return this._getResource('output_folder', t, null, e);
      }
      getComputeResource(e = 3e4) {
        const t = Cs;
        return this._getResource('compute_resource', t, null, e);
      }
      getPreviousPluginInstance(e = 3e4) {
        const t = hs;
        try {
          return this._getResource('previous', t, null, e);
        } catch (e) {
          return Promise.resolve(null);
        }
      }
      getWorkflow(e = 3e4) {
        const t = us;
        try {
          return this._getResource('workflow', t, null, e);
        } catch (e) {
          return Promise.resolve(null);
        }
      }
      getDescendantPluginInstances(e = null, t = 3e4) {
        const s = ms;
        return this._getResource('descendants', s, e, t);
      }
      getParameters(e = null, t = 3e4) {
        const s = bs;
        return this._getResource('parameters', s, e, t);
      }
      getSplits(e = null, t = 3e4) {
        const s = Rs;
        return this._getResource('splits', s, e, t);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class ps extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = hs));
      }
      getPlugin(e = 3e4) {
        const t = Us;
        return this._getResource('plugin', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class gs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = hs));
      }
      getPlugins(e = null, t = 3e4) {
        const s = Es;
        return this._getResource('plugins', s, e, t);
      }
    }
    class ds extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = hs));
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
    }
    class fs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = hs));
      }
    }
    class ms extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = hs));
      }
    }
    class _s extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getPluginInstance(e = 3e4) {
        const t = hs;
        return this._getResource('plugin_inst', t, null, e);
      }
    }
    class Rs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = _s));
      }
      getPluginInstance(e = 3e4) {
        const t = hs;
        return this._getResource('plugin_inst', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class ws extends Ut {
      getPluginInstance(e = 3e4) {
        const t = hs;
        return this._getResource('plugin_inst', t, null, e);
      }
      getPluginParameter(e = 3e4) {
        const t = Lt;
        return this._getResource('plugin_param', t, null, e);
      }
    }
    class bs extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = ws));
      }
    }
    class ys extends Ut {
      getPlugins(e = null, t = 3e4) {
        const s = Os;
        return this._getResource('plugins', s, e, t);
      }
    }
    class Ps extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = ys));
      }
      getPlugins(e = null, t = 3e4) {
        const s = Es;
        return this._getResource('plugins', s, e, t);
      }
      getFeeds(e = null, t = 3e4) {
        const s = rn;
        return this._getResource('feeds', s, e, t);
      }
    }
    class Us extends Ut {
      getPluginMeta(e = 3e4) {
        const t = ys;
        return this._getResource('meta', t, null, e);
      }
      getPluginParameters(e = null, t = 3e4) {
        const s = vt;
        return this._getResource('parameters', s, e, t);
      }
      getPluginComputeResources(e = null, t = 3e4) {
        const s = Fs;
        return this._getResource('compute_resources', s, e, t);
      }
      getPluginInstances(e = null, t = 3e4) {
        const s = ps;
        return this._getResource('instances', s, e, t);
      }
    }
    class Es extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Us));
      }
      getFeeds(e = null, t = 3e4) {
        const s = rn;
        return this._getResource('feeds', s, e, t);
      }
    }
    class Os extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Us));
      }
      getPluginMeta(e = 3e4) {
        const t = ys;
        return this._getResource('meta', t, null, e);
      }
    }
    class Cs extends Ut {
      constructor(e, t) {
        super(e, t);
      }
    }
    class Ss extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Cs));
      }
      getFeeds(e = null, t = 3e4) {
        const s = rn;
        return this._getResource('feeds', s, e, t);
      }
    }
    class Fs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Cs));
      }
      getPlugin(e = 3e4) {
        const t = Us;
        return this._getResource('plugin', t, null, e);
      }
    }
    class xs extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class Ts extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = xs));
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class As extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class Ls extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = As));
      }
      getComputeResourceAdmins(e = null, t = 3e4) {
        const s = Ts;
        return this._getResource('compute_resources', s, e, t);
      }
      post(e, t, s = 3e4) {
        return this._post(e, t, s);
      }
    }
    class vs extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFileBlob(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = new yt(this.auth, 'application/octet-stream', e),
          s = this.collection.items[0],
          n = wt.getLinkRelationUrls(s, 'file_resource')[0];
        return t.get(n).then((e) => e.data);
      }
      getFileStream(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = new yt(this.auth, 'application/octet-stream', e),
          s = this.collection.items[0],
          n = wt.getLinkRelationUrls(s, 'file_resource')[0];
        return t.getStream(n);
      }
      getParentFolder(e = 3e4) {
        const t = kt;
        return this._getResource('parent_folder', t, null, e);
      }
      getGroupPermissions(e = null, t = 3e4) {
        const s = Jt;
        return this._getResource('group_permissions', s, e, t);
      }
      getGroupPermission(e, t = 3e4) {
        return this.getGroupPermissions({ group_name: e }, t).then((e) => {
          const t = e.getItems();
          return t.length ? t[0] : null;
        });
      }
      getUserPermissions(e = null, t = 3e4) {
        const s = $t;
        return this._getResource('user_permissions', s, e, t);
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
      addGroupPermission(e, t, s = 3e4) {
        return this.getGroupPermissions(null, s)
          .then((s) => s.post({ grp_name: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      addUserPermission(e, t, s = 3e4) {
        return this.getUserPermissions(null, s)
          .then((s) => s.post({ username: e, permission: t }), s)
          .then((e) => e.getItems()[0]);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class ks extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = vs));
      }
      post(e, t, s = 3e4) {
        return this._post(e, t, s);
      }
    }
    class Is extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
    }
    class js extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Is));
      }
    }
    class Ns extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFileBlob(e = 3e4) {
        if (this.isEmpty) throw new bt('Item object has not been set!');
        const t = new yt(this.auth, 'application/octet-stream', e),
          s = this.collection.items[0],
          n = wt.getLinkRelationUrls(s, 'file_resource')[0];
        return t.get(n).then((e) => e.data);
      }
      getParentFolder(e = 3e4) {
        const t = kt;
        return this._getResource('parent_folder', t, null, e);
      }
    }
    class Ds extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Ns));
      }
    }
    class Bs extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getRetrieves(e = null, t = 3e4) {
        const s = zs;
        return this._getResource('retrieve_list', s, e, t);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class qs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Bs));
      }
      getPACS(e = 3e4) {
        const t = Ws;
        return this._getResource('pacs', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Ms extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Bs));
      }
    }
    class Gs extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getQuery(e = 3e4) {
        const t = Bs;
        return this._getResource('pacs_query', t, null, e);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class zs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Gs));
      }
      getQuery(e = 3e4) {
        const t = Bs;
        return this._getResource('pacs_query', t, null, e);
      }
      post(e = 3e4) {
        return this._post({}, null, e);
      }
    }
    class Ws extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
      getQueries(e = null, t = 3e4) {
        const s = qs;
        return this._getResource('query_list', s, e, t);
      }
      getSeriesList(e = null, t = 3e4) {
        const s = Js;
        return this._getResource('series_list', s, e, t);
      }
    }
    class Hs extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = Ws));
      }
    }
    class Js extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Is));
      }
    }
    class Qs extends Ut {
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
    }
    class $s extends Ut {
      getTaggedFeeds(e = null, t = 3e4) {
        const s = Zs;
        return this._getResource('feeds', s, e, t);
      }
      getTaggings(e = null, t = 3e4) {
        const s = Xs;
        return this._getResource('taggings', s, e, t);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class Ks extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = $s));
      }
      getFeeds(e = null, t = 3e4) {
        const s = rn;
        return this._getResource('feeds', s, e, t);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Vs extends Ut {
      getTag(e = 3e4) {
        const t = $s;
        return this._getResource('tag', t, null, e);
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class Xs extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Vs));
      }
      getTag(e = 3e4) {
        const t = $s;
        return this._getResource('tag', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Ys extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = Vs));
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class Zs extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = nn));
      }
      getTag(e = 3e4) {
        const t = $s;
        return this._getResource('tag', t, null, e);
      }
    }
    class en extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = $s));
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
    }
    class tn extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      put(e, t = 3e4) {
        return this._put(e, null, t);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class sn extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = tn));
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class nn extends Ut {
      getFolder(e = 3e4) {
        const t = kt;
        return this._getResource('folder', t, null, e);
      }
      getNote(e = 3e4) {
        const t = Qs;
        return this._getResource('note', t, null, e);
      }
      getGroupPermissions(e = null, t = 3e4) {
        const s = un;
        return this._getResource('group_permissions', s, e, t);
      }
      getGroupPermission(e, t = 3e4) {
        return this.getGroupPermissions({ group_name: e }, t).then((e) => {
          const t = e.getItems();
          return t.length ? t[0] : null;
        });
      }
      getUserPermissions(e = null, t = 3e4) {
        const s = an;
        return this._getResource('user_permissions', s, e, t);
      }
      getUserPermission(e, t = 3e4) {
        return this.getUserPermissions({ username: e }, t).then((e) => {
          const t = e.getItems();
          return t.length ? t[0] : null;
        });
      }
      getTags(e = null, t = 3e4) {
        const s = en;
        return this._getResource('tags', s, e, t);
      }
      getTaggings(e = null, t = 3e4) {
        const s = Ys;
        return this._getResource('taggings', s, e, t);
      }
      getComments(e = null, t = 3e4) {
        const s = sn;
        return this._getResource('comments', s, e, t);
      }
      getComment(e, t = 3e4) {
        return this.getComments({ id: e }, t).then((t) => t.getItem(e));
      }
      getPluginInstances(e = null, t = 3e4) {
        const s = ds;
        return this._getResource('plugin_instances', s, e, t);
      }
      addTagging(e, t = 3e4) {
        return this.getTaggings(null, t)
          .then((t) => t.post({ tag_id: e }), t)
          .then((e) => e.getItems()[0]);
      }
      addComment(e = '', t = '', s = 3e4) {
        return this.getComments(null, s)
          .then((s) => s.post({ title: e, content: t }), s)
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
    class rn extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = nn));
      }
      getChrisInstance(e = 3e4) {
        const t = Ot;
        return this._getResource('chrisinstance', t, null, e);
      }
      getPublicFeeds(e = null, t = 3e4) {
        const s = on;
        return this._getResource('public_feeds', s, e, t);
      }
      getComputeResources(e = null, t = 3e4) {
        const s = Ss;
        return this._getResource('compute_resources', s, e, t);
      }
      getPluginMetas(e = null, t = 3e4) {
        const s = Ps;
        return this._getResource('plugin_metas', s, e, t);
      }
      getPlugins(e = null, t = 3e4) {
        const s = Es;
        return this._getResource('plugins', s, e, t);
      }
      getPluginAdmins(e = null, t = 3e4) {
        const s = Ls;
        return this._getResource('admin', s, e, t);
      }
      getPluginInstances(e = null, t = 3e4) {
        const s = gs;
        return this._getResource('plugin_instances', s, e, t);
      }
      getPipelines(e = null, t = 3e4) {
        const s = es;
        return this._getResource('pipelines', s, e, t);
      }
      getTags(e = null, t = 3e4) {
        const s = Ks;
        return this._getResource('tags', s, e, t);
      }
      getPipelineSourceFiles(e = null, t = 3e4) {
        const s = ls;
        return this._getResource('pipelinesourcefiles', s, e, t);
      }
      getUserFiles(e = null, t = 3e4) {
        const s = ks;
        return this._getResource('userfiles', s, e, t);
      }
      getPACSFiles(e = null, t = 3e4) {
        const s = Ds;
        return this._getResource('pacsfiles', s, e, t);
      }
      getPACSSeriesList(e = null, t = 3e4) {
        const s = js;
        return this._getResource('pacsseries', s, e, t);
      }
      getPACSList(e = null, t = 3e4) {
        const s = Hs;
        return this._getResource('pacs', s, e, t);
      }
      getPACSQueryList(e = null, t = 3e4) {
        const s = qs;
        return this._getResource('pacsqueries', s, e, t);
      }
      getFileBrowserFolders(e = null, t = 3e4) {
        const s = It;
        return this._getResource('filebrowser', s, e, t);
      }
      getGroups(e = null, t = 3e4) {
        const s = St;
        return this._getResource('groups', s, e, t);
      }
      getUser(e = 3e4) {
        const t = At;
        return this._getResource('user', t, null, e);
      }
    }
    class on extends Et {
      constructor(e, t = null) {
        (super(e, t), (this.itemClass = nn));
      }
    }
    class ln extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      getGroup(e = 3e4) {
        const t = Ct;
        return this._getResource('group', t, null, e);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class un extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = ln));
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class cn extends Ut {
      constructor(e, t) {
        super(e, t);
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      getUser(e = 3e4) {
        const t = At;
        return this._getResource('user', t, null, e);
      }
      delete(e = 3e4) {
        return this._delete(e);
      }
    }
    class an extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = cn));
      }
      getFeed(e = 3e4) {
        const t = nn;
        return this._getResource('feed', t, null, e);
      }
      post(e, t = 3e4) {
        return this._post(e, null, t);
      }
    }
    class hn extends Ut {
      constructor(e, t) {
        super(e, t);
      }
    }
    class pn extends Et {
      constructor(e, t) {
        (super(e, t), (this.itemClass = hn));
      }
      post(e = 3e4) {
        return this._post({}, null, e);
      }
    }
    const gn = class {
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
        return this._fetchRes('chrisInstanceUrl', Ot, null, e);
      }
      getFeeds(e = null, t = 3e4) {
        return new rn(this.feedsUrl, this.auth).get(e, t).then((e) => {
          const t = e.collection,
            s = wt.getLinkRelationUrls;
          return (
            (this.chrisInstanceUrl = this.chrisInstanceUrl || s(t, 'chrisinstance')[0]),
            (this.publicFeedsUrl = this.publicFeedsUrl || s(t, 'public_feeds')[0]),
            (this.computeResourcesUrl = this.computeResourcesUrl || s(t, 'compute_resources')[0]),
            (this.pluginMetasUrl = this.pluginMetasUrl || s(t, 'plugin_metas')[0]),
            (this.pluginsUrl = this.pluginsUrl || s(t, 'plugins')[0]),
            (this.pluginInstancesUrl = this.pluginInstancesUrl || s(t, 'plugin_instances')[0]),
            (this.pipelinesUrl = this.pipelinesUrl || s(t, 'pipelines')[0]),
            (this.workflowsUrl = this.workflowsUrl || s(t, 'workflows')[0]),
            (this.tagsUrl = this.tagsUrl || s(t, 'tags')[0]),
            (this.pipelineSourceFilesUrl =
              this.pipelineSourceFilesUrl || s(t, 'pipelinesourcefiles')[0]),
            (this.userFilesUrl = this.userFilesUrl || s(t, 'userfiles')[0]),
            (this.pacsFilesUrl = this.pacsFilesUrl || s(t, 'pacsfiles')[0]),
            (this.pacsUrl = this.pacsUrl || s(t, 'pacs')[0]),
            (this.pacsQueriesUrl = this.pacsQueriesUrl || s(t, 'pacsqueries')[0]),
            (this.pacsSeriesUrl = this.pacsSeriesUrl || s(t, 'pacsseries')[0]),
            (this.fileBrowserUrl = this.fileBrowserUrl || s(t, 'filebrowser')[0]),
            this.downloadTokensUrl ||
              ((this.downloadTokensUrl = s(t, 'download_tokens')),
              (this.downloadTokensUrl = this.downloadTokensUrl.length
                ? this.downloadTokensUrl[0]
                : '')),
            this.groupsUrl ||
              ((this.groupsUrl = s(t, 'groups')),
              (this.groupsUrl = this.groupsUrl.length ? this.groupsUrl[0] : '')),
            this.userUrl ||
              ((this.userUrl = s(t, 'user')),
              (this.userUrl = this.userUrl.length ? this.userUrl[0] : '')),
            this.adminUrl ||
              ((this.adminUrl = s(t, 'admin')),
              (this.adminUrl = this.adminUrl.length ? this.adminUrl[0] : '')),
            e
          );
        });
      }
      getPublicFeeds(e = null, t = 3e4) {
        return this._fetchRes('publicFeedsUrl', on, e, t);
      }
      getFeed(e, t = 3e4) {
        return this.getFeeds({ id: e }, t).then((t) => t.getItem(e));
      }
      getComputeResources(e = null, t = 3e4) {
        return this._fetchRes('computeResourcesUrl', Ss, e, t);
      }
      getComputeResource(e, t = 3e4) {
        return this.getComputeResources({ id: e }, t).then((t) => t.getItem(e));
      }
      getPluginMetas(e = null, t = 3e4) {
        return this._fetchRes('pluginMetasUrl', Ps, e, t);
      }
      getPluginMeta(e, t = 3e4) {
        return this.getPluginMetas({ id: e }, t).then((t) => t.getItem(e));
      }
      getPlugins(e = null, t = 3e4) {
        return this._fetchRes('pluginsUrl', Es, e, t);
      }
      getPlugin(e, t = 3e4) {
        return this.getPlugins({ id: e }, t).then((t) => t.getItem(e));
      }
      adminUploadPlugin(e, t, s = 3e4) {
        const n = () => new Ls(this.adminUrl, this.auth).post(e, t, s).then((e) => e.getItems()[0]);
        return this.adminUrl ? n() : this.setUrls().then(() => n());
      }
      getPluginInstances(e = null, t = 3e4) {
        return this._fetchRes('pluginInstancesUrl', gs, e, t);
      }
      getPluginInstance(e, t = 3e4) {
        return this.getPluginInstances({ id: e }, t).then((t) => t.getItem(e));
      }
      createPluginInstance(e, t, s = 3e4) {
        return this.getPlugin(e, s)
          .then((e) => {
            const n = wt.getLinkRelationUrls(e.collection.items[0], 'instances');
            return new ps(n[0], this.auth).post(t, s);
          })
          .then((e) => e.getItems()[0]);
      }
      createPluginInstanceSplit(e, t = '', s = '', n = 3e4) {
        return this.getPluginInstance(e, n)
          .then((e) => {
            const r = wt.getLinkRelationUrls(e.collection.items[0], 'splits'),
              i = new Rs(r[0], this.auth);
            let o = { filter: t };
            return (s && (o = { filter: t, compute_resource_name: s }), i.post(o, n));
          })
          .then((e) => e.getItems()[0]);
      }
      getPipelines(e = null, t = 3e4) {
        return this._fetchRes('pipelinesUrl', es, e, t);
      }
      getPipeline(e, t = 3e4) {
        return this.getPipelines({ id: e }, t).then((t) => t.getItem(e));
      }
      createPipeline(e, t = 3e4) {
        const s = () =>
          new es(this.pipelinesUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
        return this.pipelinesUrl ? s() : this.setUrls().then(() => s());
      }
      getWorkflows(e = null, t = 3e4) {
        return this._fetchRes('workflowsUrl', as, e, t);
      }
      getWorkflow(e, t = 3e4) {
        return this.getWorkflows({ id: e }, t).then((t) => t.getItem(e));
      }
      computeWorkflowNodesInfo(e, t = !1) {
        const s = {};
        for (let n of e) {
          let e = n.plugin_piping_id;
          (e in s ||
            (s[e] = {
              piping_id: e,
              previous_piping_id: n.previous_plugin_piping_id,
              compute_resource_name: 'host',
              title: n.plugin_piping_title,
              cpu_limit: n.plugin_piping_cpu_limit,
              memory_limit: n.plugin_piping_memory_limit,
              gpu_limit: n.plugin_piping_gpu_limit,
              number_of_workers: n.plugin_piping_number_of_workers,
              plugin_parameter_defaults: [],
            }),
            (t || null === n.value) &&
              s[e].plugin_parameter_defaults.push({ name: n.param_name, default: n.value }));
        }
        const n = [];
        for (let e in s)
          (0 === s[e].plugin_parameter_defaults.length && delete s[e].plugin_parameter_defaults,
            n.push(s[e]));
        return n;
      }
      createWorkflow(e, t, s = 3e4) {
        return this.getPipeline(e, s)
          .then((e) => {
            const n = wt.getLinkRelationUrls(e.collection.items[0], 'workflows');
            return new cs(n[0], this.auth).post(t, s);
          })
          .then((e) => e.getItems()[0]);
      }
      getTags(e = null, t = 3e4) {
        return this._fetchRes('tagsUrl', Ks, e, t);
      }
      getTag(e, t = 3e4) {
        return this.getTags({ id: e }, t).then((t) => t.getItem(e));
      }
      createTag(e, t = 3e4) {
        const s = () => new Ks(this.tagsUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
        return this.tagsUrl ? s() : this.setUrls().then(() => s());
      }
      getPipelineSourceFiles(e = null, t = 3e4) {
        return this._fetchRes('pipelineSourceFilesUrl', ls, e, t);
      }
      getPipelineSourceFile(e, t = 3e4) {
        return this.getPipelineSourceFiles({ id: e }, t).then((t) => t.getItem(e));
      }
      uploadPipelineSourceFile(e, t, s = 3e4) {
        const n = () =>
          new ls(this.pipelineSourceFilesUrl, this.auth).post(e, t, s).then((e) => e.getItems()[0]);
        return this.pipelineSourceFilesUrl ? n() : this.setUrls().then(() => n());
      }
      getUserFiles(e = null, t = 3e4) {
        return this._fetchRes('userFilesUrl', ks, e, t);
      }
      getUserFile(e, t = 3e4) {
        return this.getUserFiles({ id: e }, t).then((t) => t.getItem(e));
      }
      uploadFile(e, t, s = 3e4) {
        const n = () =>
          new ks(this.userFilesUrl, this.auth).post(e, t, s).then((e) => e.getItems()[0]);
        return this.userFilesUrl ? n() : this.setUrls().then(() => n());
      }
      getPACSFiles(e = null, t = 3e4) {
        return this._fetchRes('pacsFilesUrl', Ds, e, t);
      }
      getPACSFile(e, t = 3e4) {
        return this.getPACSFiles({ id: e }, t).then((t) => t.getItem(e));
      }
      getPACSList(e = null, t = 3e4) {
        return this._fetchRes('pacsUrl', Hs, e, t);
      }
      getPACS(e, t = 3e4) {
        return this.getPACSList({ id: e }, t).then((t) => t.getItem(e));
      }
      getPACSQueries(e = null, t = 3e4) {
        return this._fetchRes('pacsQueriesUrl', Ms, e, t);
      }
      getPACSQuery(e, t = 3e4) {
        return this.getPACSQueries({ id: e }, t).then((t) => t.getItem(e));
      }
      createPACSQuery(e, t, s = 3e4) {
        return this.getPACS(e, s)
          .then((e) => {
            const n = wt.getLinkRelationUrls(e.collection.items[0], 'query_list');
            return new qs(n[0], this.auth).post(t, s);
          })
          .then((e) => e.getItems()[0]);
      }
      createPACSRetrieve(e, t = 3e4) {
        return this.getPACSQuery(e, t)
          .then((e) => {
            const s = wt.getLinkRelationUrls(e.collection.items[0], 'retrieve_list');
            return new zs(s[0], this.auth).post(t);
          })
          .then((e) => e.getItems()[0]);
      }
      getPACSSeriesList(e = null, t = 3e4) {
        return this._fetchRes('pacsSeriesUrl', js, e, t);
      }
      getPACSSeries(e, t = 3e4) {
        return this.getPACSSeriesList({ id: e }, t).then((t) => t.getItem(e));
      }
      getFileBrowserFolders(e = null, t = 3e4) {
        return this._fetchRes('fileBrowserUrl', It, e, t);
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
        const s = () =>
          new It(this.fileBrowserUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
        return this.fileBrowserUrl ? s() : this.setUrls().then(() => s());
      }
      getDownloadTokens(e = null, t = 3e4) {
        return this._fetchRes('downloadTokensUrl', pn, e, t);
      }
      getDownloadToken(e, t = 3e4) {
        return this.getDownloadTokens({ id: e }, t).then((t) => t.getItem(e));
      }
      createDownloadToken(e = 3e4) {
        const t = () =>
          new pn(this.downloadTokensUrl, this.auth).post(e).then((e) => e.getItems()[0]);
        return this.downloadTokensUrl ? t() : this.setUrls().then(() => t());
      }
      getGroups(e = null, t = 3e4) {
        return this._fetchRes('groupsUrl', St, e, t);
      }
      getGroup(e, t = 3e4) {
        return this.getGroups({ id: e }, t).then((t) => t.getItem(e));
      }
      adminCreateGroup(e, t = 3e4) {
        const s = () => new St(this.groupsUrl, this.auth).post(e, t).then((e) => e.getItems()[0]);
        return this.groupsUrl ? s() : this.setUrls().then(() => s());
      }
      getUser(e = 3e4) {
        return this._fetchRes('userUrl', At, null, e);
      }
      static createUser(e, t, s, n, r = 3e4) {
        const i = new yt(void 0, 'application/vnd.collection+json', r),
          o = {
            template: {
              data: [
                { name: 'username', value: t },
                { name: 'password', value: s },
                { name: 'email', value: n },
              ],
            },
          };
        return i.post(e, o).then((e) => {
          const n = e.data.collection,
            r = n.items[0].href,
            i = new At(r, { username: t, password: s });
          return ((i.collection = n), i);
        });
      }
      static getAuthToken(e, t, s, n = 3e4) {
        const r = { username: t, password: s };
        return new yt(void 0, 'application/json', n).post(e, r).then((e) => e.data.token);
      }
      static runAsyncTask(e) {
        yt.runAsyncTask(e);
      }
      _fetchRes(e, t, s = null, n = 3e4) {
        const r = () => {
          const r = new t(this[e], this.auth);
          return 'searchParams' in r ? r.get(s, n) : r.get(n);
        };
        return this[e] ? r() : this.setUrls().then(() => r());
      }
    };
    return t;
  })()
);
