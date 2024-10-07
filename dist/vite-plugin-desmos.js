var Km = Object.defineProperty;
var jm = (e, r, t) => r in e ? Km(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var Wt = (e, r, t) => jm(e, typeof r != "symbol" ? r + "" : r, t);
function vr() {
  return vr = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t) ({}).hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, vr.apply(null, arguments);
}
var ac = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  relTol: 1e-12,
  // minimum absolute difference between two compared values,
  // used by all comparison functions
  absTol: 1e-15,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: "Matrix",
  // type of default number output. Choose 'number' (default) 'BigNumber', 'bigint', or 'Fraction'
  number: "number",
  // type of fallback used for config { number: 'bigint' } when a value cannot be represented
  // in the configured numeric type. Choose 'number' (default) or 'BigNumber'.
  numberFallback: "number",
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: !1,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};
function hr(e, r) {
  if (Rn(e, r))
    return e[r];
  throw typeof e[r] == "function" && Wa(e, r) ? new Error('Cannot access method "' + r + '" as a property') : new Error('No access to property "' + r + '"');
}
function Bt(e, r, t) {
  if (Rn(e, r))
    return e[r] = t, t;
  throw new Error('No access to property "' + r + '"');
}
function Rn(e, r) {
  return !rv(e) && !Array.isArray(e) ? !1 : De(tv, r) ? !0 : !(r in Object.prototype || r in Function.prototype);
}
function ev(e, r) {
  if (!Wa(e, r))
    throw new Error('No access to method "' + r + '"');
  return e[r];
}
function Wa(e, r) {
  return e == null || typeof e[r] != "function" || De(e, r) && Object.getPrototypeOf && r in Object.getPrototypeOf(e) ? !1 : De(nv, r) ? !0 : !(r in Object.prototype || r in Function.prototype);
}
function rv(e) {
  return typeof e == "object" && e && e.constructor === Object;
}
var tv = {
  length: !0,
  name: !0
}, nv = {
  toString: !0,
  valueOf: !0,
  toLocaleString: !0
};
class na {
  constructor(r) {
    this.wrappedObject = r, this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((r) => this.has(r)).values();
  }
  get(r) {
    return hr(this.wrappedObject, r);
  }
  set(r, t) {
    return Bt(this.wrappedObject, r, t), this;
  }
  has(r) {
    return Rn(this.wrappedObject, r) && r in this.wrappedObject;
  }
  entries() {
    return oc(this.keys(), (r) => [r, this.get(r)]);
  }
  forEach(r) {
    for (var t of this.keys())
      r(this.get(t), t, this);
  }
  delete(r) {
    Rn(this.wrappedObject, r) && delete this.wrappedObject[r];
  }
  clear() {
    for (var r of this.keys())
      this.delete(r);
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
}
class ic {
  /**
   * @param {Map} a
   * @param {Map} b
   * @param {Set} bKeys
   */
  constructor(r, t, n) {
    this.a = r, this.b = t, this.bKeys = n, this[Symbol.iterator] = this.entries;
  }
  get(r) {
    return this.bKeys.has(r) ? this.b.get(r) : this.a.get(r);
  }
  set(r, t) {
    return this.bKeys.has(r) ? this.b.set(r, t) : this.a.set(r, t), this;
  }
  has(r) {
    return this.b.has(r) || this.a.has(r);
  }
  keys() {
    return (/* @__PURE__ */ new Set([...this.a.keys(), ...this.b.keys()]))[Symbol.iterator]();
  }
  entries() {
    return oc(this.keys(), (r) => [r, this.get(r)]);
  }
  forEach(r) {
    for (var t of this.keys())
      r(this.get(t), t, this);
  }
  delete(r) {
    return this.bKeys.has(r) ? this.b.delete(r) : this.a.delete(r);
  }
  clear() {
    this.a.clear(), this.b.clear();
  }
  get size() {
    return [...this.keys()].length;
  }
}
function oc(e, r) {
  return {
    next: () => {
      var t = e.next();
      return t.done ? t : {
        value: r(t.value),
        done: !1
      };
    }
  };
}
function jt() {
  return /* @__PURE__ */ new Map();
}
function _t(e) {
  if (!e)
    return jt();
  if (vt(e))
    return e;
  if (zt(e))
    return new na(e);
  throw new Error("createMap can create maps from objects or Maps");
}
function av(e) {
  if (e instanceof na)
    return e.wrappedObject;
  var r = {};
  for (var t of e.keys()) {
    var n = e.get(t);
    Bt(r, t, n);
  }
  return r;
}
function Oe(e) {
  return typeof e == "number";
}
function Be(e) {
  return !e || typeof e != "object" || typeof e.constructor != "function" ? !1 : e.isBigNumber === !0 && typeof e.constructor.prototype == "object" && e.constructor.prototype.isBigNumber === !0 || typeof e.constructor.isDecimal == "function" && e.constructor.isDecimal(e) === !0;
}
function sc(e) {
  return typeof e == "bigint";
}
function Ir(e) {
  return e && typeof e == "object" && Object.getPrototypeOf(e).isComplex === !0 || !1;
}
function ht(e) {
  return e && typeof e == "object" && Object.getPrototypeOf(e).isFraction === !0 || !1;
}
function wr(e) {
  return e && e.constructor.prototype.isUnit === !0 || !1;
}
function sr(e) {
  return typeof e == "string";
}
var Ze = Array.isArray;
function Ce(e) {
  return e && e.constructor.prototype.isMatrix === !0 || !1;
}
function Cr(e) {
  return Array.isArray(e) || Ce(e);
}
function en(e) {
  return e && e.isDenseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
}
function et(e) {
  return e && e.isSparseMatrix && e.constructor.prototype.isMatrix === !0 || !1;
}
function aa(e) {
  return e && e.constructor.prototype.isRange === !0 || !1;
}
function on(e) {
  return e && e.constructor.prototype.isIndex === !0 || !1;
}
function uc(e) {
  return typeof e == "boolean";
}
function lc(e) {
  return e && e.constructor.prototype.isResultSet === !0 || !1;
}
function Ya(e) {
  return e && e.constructor.prototype.isHelp === !0 || !1;
}
function cc(e) {
  return typeof e == "function";
}
function fc(e) {
  return e instanceof Date;
}
function mc(e) {
  return e instanceof RegExp;
}
function zt(e) {
  return !!(e && typeof e == "object" && e.constructor === Object && !Ir(e) && !ht(e));
}
function vt(e) {
  return e ? e instanceof Map || e instanceof na || typeof e.set == "function" && typeof e.get == "function" && typeof e.keys == "function" && typeof e.has == "function" : !1;
}
function iv(e) {
  return vt(e) && vt(e.a) && vt(e.b);
}
function ov(e) {
  return vt(e) && zt(e.wrappedObject);
}
function vc(e) {
  return e === null;
}
function pc(e) {
  return e === void 0;
}
function at(e) {
  return e && e.isAccessorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Sr(e) {
  return e && e.isArrayNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function dc(e) {
  return e && e.isAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function hc(e) {
  return e && e.isBlockNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function gc(e) {
  return e && e.isConditionalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function ke(e) {
  return e && e.isConstantNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Ca(e) {
  return ke(e) || rr(e) && e.args.length === 1 && ke(e.args[0]) && "-+~".includes(e.op);
}
function Pt(e) {
  return e && e.isFunctionAssignmentNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Yr(e) {
  return e && e.isFunctionNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function gt(e) {
  return e && e.isIndexNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Ve(e) {
  return e && e.isNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function sn(e) {
  return e && e.isObjectNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function rr(e) {
  return e && e.isOperatorNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Ur(e) {
  return e && e.isParenthesisNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function yc(e) {
  return e && e.isRangeNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function bc(e) {
  return e && e.isRelationalNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function nr(e) {
  return e && e.isSymbolNode === !0 && e.constructor.prototype.isNode === !0 || !1;
}
function Xa(e) {
  return e && e.constructor.prototype.isChain === !0 || !1;
}
function Je(e) {
  var r = typeof e;
  return r === "object" ? e === null ? "null" : Be(e) ? "BigNumber" : e.constructor && e.constructor.name ? e.constructor.name : "Object" : r;
}
function Me(e) {
  var r = typeof e;
  if (r === "number" || r === "bigint" || r === "string" || r === "boolean" || e === null || e === void 0)
    return e;
  if (typeof e.clone == "function")
    return e.clone();
  if (Array.isArray(e))
    return e.map(function(t) {
      return Me(t);
    });
  if (e instanceof Date) return new Date(e.valueOf());
  if (Be(e)) return e;
  if (zt(e))
    return sv(e, Me);
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(e, ")"));
}
function sv(e, r) {
  var t = {};
  for (var n in e)
    De(e, n) && (t[n] = r(e[n]));
  return t;
}
function xc(e, r) {
  for (var t in r)
    De(r, t) && (e[t] = r[t]);
  return e;
}
function wc(e, r) {
  if (Array.isArray(r))
    throw new TypeError("Arrays are not supported by deepExtend");
  for (var t in r)
    if (De(r, t) && !(t in Object.prototype) && !(t in Function.prototype))
      if (r[t] && r[t].constructor === Object)
        e[t] === void 0 && (e[t] = {}), e[t] && e[t].constructor === Object ? wc(e[t], r[t]) : e[t] = r[t];
      else {
        if (Array.isArray(r[t]))
          throw new TypeError("Arrays are not supported by deepExtend");
        e[t] = r[t];
      }
  return e;
}
function Xr(e, r) {
  var t, n, a;
  if (Array.isArray(e)) {
    if (!Array.isArray(r) || e.length !== r.length)
      return !1;
    for (n = 0, a = e.length; n < a; n++)
      if (!Xr(e[n], r[n]))
        return !1;
    return !0;
  } else {
    if (typeof e == "function")
      return e === r;
    if (e instanceof Object) {
      if (Array.isArray(r) || !(r instanceof Object))
        return !1;
      for (t in e)
        if (!(t in r) || !Xr(e[t], r[t]))
          return !1;
      for (t in r)
        if (!(t in e))
          return !1;
      return !0;
    } else
      return e === r;
  }
}
function uv(e) {
  var r = {};
  return Dc(e, r), r;
}
function Dc(e, r) {
  for (var t in e)
    if (De(e, t)) {
      var n = e[t];
      typeof n == "object" && n !== null ? Dc(n, r) : r[t] = n;
    }
}
function On(e, r, t) {
  var n = !0, a;
  Object.defineProperty(e, r, {
    get: function() {
      return n && (a = t(), n = !1), a;
    },
    set: function(o) {
      a = o, n = !1;
    },
    configurable: !0,
    enumerable: !0
  });
}
function De(e, r) {
  return e && Object.hasOwnProperty.call(e, r);
}
function lv(e) {
  return e && typeof e.factory == "function";
}
function cv(e, r) {
  for (var t = {}, n = 0; n < r.length; n++) {
    var a = r[n], i = e[a];
    i !== void 0 && (t[a] = i);
  }
  return t;
}
var Ci = ["Matrix", "Array"], Mi = ["number", "BigNumber", "Fraction"];
function fv(e, r) {
  function t(n) {
    if (n) {
      if (n.epsilon !== void 0) {
        console.warn('Warning: The configuration option "epsilon" is deprecated. Use "relTol" and "absTol" instead.');
        var a = Me(n);
        return a.relTol = n.epsilon, a.absTol = n.epsilon * 1e-3, delete a.epsilon, t(a);
      }
      var i = Me(e);
      _i(n, "matrix", Ci), _i(n, "number", Mi), wc(e, n);
      var o = Me(e), c = Me(n);
      return r("config", o, i, c), o;
    } else
      return Me(e);
  }
  return t.MATRIX_OPTIONS = Ci, t.NUMBER_OPTIONS = Mi, Object.keys(ac).forEach((n) => {
    Object.defineProperty(t, n, {
      get: () => e[n],
      enumerable: !0,
      configurable: !0
    });
  }), t;
}
function _i(e, r, t) {
  e[r] !== void 0 && !t.includes(e[r]) && console.warn('Warning: Unknown value "' + e[r] + '" for configuration option "' + r + '". Available options: ' + t.map((n) => JSON.stringify(n)).join(", ") + ".");
}
function Fi() {
  return !0;
}
function _r() {
  return !1;
}
function wt() {
}
const Ti = "Argument is not a typed-function.";
function Nc() {
  function e(R) {
    return typeof R == "object" && R !== null && R.constructor === Object;
  }
  const r = [{
    name: "number",
    test: function(R) {
      return typeof R == "number";
    }
  }, {
    name: "string",
    test: function(R) {
      return typeof R == "string";
    }
  }, {
    name: "boolean",
    test: function(R) {
      return typeof R == "boolean";
    }
  }, {
    name: "Function",
    test: function(R) {
      return typeof R == "function";
    }
  }, {
    name: "Array",
    test: Array.isArray
  }, {
    name: "Date",
    test: function(R) {
      return R instanceof Date;
    }
  }, {
    name: "RegExp",
    test: function(R) {
      return R instanceof RegExp;
    }
  }, {
    name: "Object",
    test: e
  }, {
    name: "null",
    test: function(R) {
      return R === null;
    }
  }, {
    name: "undefined",
    test: function(R) {
      return R === void 0;
    }
  }], t = {
    name: "any",
    test: Fi,
    isAny: !0
  };
  let n, a, i = 0, o = {
    createCount: 0
  };
  function c(R) {
    const U = n.get(R);
    if (U)
      return U;
    let Y = 'Unknown type "' + R + '"';
    const ne = R.toLowerCase();
    let se;
    for (se of a)
      if (se.toLowerCase() === ne) {
        Y += '. Did you mean "' + se + '" ?';
        break;
      }
    throw new TypeError(Y);
  }
  function l(R) {
    let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
    const Y = U ? c(U).index : a.length, ne = [];
    for (let ue = 0; ue < R.length; ++ue) {
      if (!R[ue] || typeof R[ue].name != "string" || typeof R[ue].test != "function")
        throw new TypeError("Object with properties {name: string, test: function} expected");
      const he = R[ue].name;
      if (n.has(he))
        throw new TypeError('Duplicate type name "' + he + '"');
      ne.push(he), n.set(he, {
        name: he,
        test: R[ue].test,
        isAny: R[ue].isAny,
        index: Y + ue,
        conversionsTo: []
        // Newly added type can't have any conversions to it
      });
    }
    const se = a.slice(Y);
    a = a.slice(0, Y).concat(ne).concat(se);
    for (let ue = Y + ne.length; ue < a.length; ++ue)
      n.get(a[ue]).index = ue;
  }
  function s() {
    n = /* @__PURE__ */ new Map(), a = [], i = 0, l([t], !1);
  }
  s(), l(r);
  function u() {
    let R;
    for (R of a)
      n.get(R).conversionsTo = [];
    i = 0;
  }
  function f(R) {
    const U = a.filter((Y) => {
      const ne = n.get(Y);
      return !ne.isAny && ne.test(R);
    });
    return U.length ? U : ["any"];
  }
  function m(R) {
    return R && typeof R == "function" && "_typedFunctionData" in R;
  }
  function v(R, U, Y) {
    if (!m(R))
      throw new TypeError(Ti);
    const ne = Y && Y.exact, se = Array.isArray(U) ? U.join(",") : U, ue = w(se), he = b(ue);
    if (!ne || he in R.signatures) {
      const Ue = R._typedFunctionData.signatureMap.get(he);
      if (Ue)
        return Ue;
    }
    const de = ue.length;
    let xe;
    if (ne) {
      xe = [];
      let Ue;
      for (Ue in R.signatures)
        xe.push(R._typedFunctionData.signatureMap.get(Ue));
    } else
      xe = R._typedFunctionData.signatures;
    for (let Ue = 0; Ue < de; ++Ue) {
      const Le = ue[Ue], Ee = [];
      let je;
      for (je of xe) {
        const M = E(je.params, Ue);
        if (!(!M || Le.restParam && !M.restParam)) {
          if (!M.hasAny) {
            const G = h(M);
            if (Le.types.some((ae) => !G.has(ae.name)))
              continue;
          }
          Ee.push(je);
        }
      }
      if (xe = Ee, xe.length === 0) break;
    }
    let ge;
    for (ge of xe)
      if (ge.params.length <= de)
        return ge;
    throw new TypeError("Signature not found (signature: " + (R.name || "unnamed") + "(" + b(ue, ", ") + "))");
  }
  function p(R, U, Y) {
    return v(R, U, Y).implementation;
  }
  function d(R, U) {
    const Y = c(U);
    if (Y.test(R))
      return R;
    const ne = Y.conversionsTo;
    if (ne.length === 0)
      throw new Error("There are no conversions to " + U + " defined.");
    for (let se = 0; se < ne.length; se++)
      if (c(ne[se].from).test(R))
        return ne[se].convert(R);
    throw new Error("Cannot convert " + R + " to " + U);
  }
  function b(R) {
    let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
    return R.map((Y) => Y.name).join(U);
  }
  function x(R) {
    const U = R.indexOf("...") === 0, ne = (U ? R.length > 3 ? R.slice(3) : "any" : R).split("|").map((de) => c(de.trim()));
    let se = !1, ue = U ? "..." : "";
    return {
      types: ne.map(function(de) {
        return se = de.isAny || se, ue += de.name + "|", {
          name: de.name,
          typeIndex: de.index,
          test: de.test,
          isAny: de.isAny,
          conversion: null,
          conversionIndex: -1
        };
      }),
      name: ue.slice(0, -1),
      // remove trailing '|' from above
      hasAny: se,
      hasConversion: !1,
      restParam: U
    };
  }
  function D(R) {
    const U = R.types.map((he) => he.name), Y = _(U);
    let ne = R.hasAny, se = R.name;
    const ue = Y.map(function(he) {
      const de = c(he.from);
      return ne = de.isAny || ne, se += "|" + he.from, {
        name: he.from,
        typeIndex: de.index,
        test: de.test,
        isAny: de.isAny,
        conversion: he,
        conversionIndex: he.index
      };
    });
    return {
      types: R.types.concat(ue),
      name: se,
      hasAny: ne,
      hasConversion: ue.length > 0,
      restParam: R.restParam
    };
  }
  function h(R) {
    return R.typeSet || (R.typeSet = /* @__PURE__ */ new Set(), R.types.forEach((U) => R.typeSet.add(U.name))), R.typeSet;
  }
  function w(R) {
    const U = [];
    if (typeof R != "string")
      throw new TypeError("Signatures must be strings");
    const Y = R.trim();
    if (Y === "")
      return U;
    const ne = Y.split(",");
    for (let se = 0; se < ne.length; ++se) {
      const ue = x(ne[se].trim());
      if (ue.restParam && se !== ne.length - 1)
        throw new SyntaxError('Unexpected rest parameter "' + ne[se] + '": only allowed for the last parameter');
      if (ue.types.length === 0)
        return null;
      U.push(ue);
    }
    return U;
  }
  function y(R) {
    const U = j(R);
    return U ? U.restParam : !1;
  }
  function g(R) {
    if (!R || R.types.length === 0)
      return Fi;
    if (R.types.length === 1)
      return c(R.types[0].name).test;
    if (R.types.length === 2) {
      const U = c(R.types[0].name).test, Y = c(R.types[1].name).test;
      return function(se) {
        return U(se) || Y(se);
      };
    } else {
      const U = R.types.map(function(Y) {
        return c(Y.name).test;
      });
      return function(ne) {
        for (let se = 0; se < U.length; se++)
          if (U[se](ne))
            return !0;
        return !1;
      };
    }
  }
  function A(R) {
    let U, Y, ne;
    if (y(R)) {
      U = ie(R).map(g);
      const se = U.length, ue = g(j(R)), he = function(de) {
        for (let xe = se; xe < de.length; xe++)
          if (!ue(de[xe]))
            return !1;
        return !0;
      };
      return function(xe) {
        for (let ge = 0; ge < U.length; ge++)
          if (!U[ge](xe[ge]))
            return !1;
        return he(xe) && xe.length >= se + 1;
      };
    } else
      return R.length === 0 ? function(ue) {
        return ue.length === 0;
      } : R.length === 1 ? (Y = g(R[0]), function(ue) {
        return Y(ue[0]) && ue.length === 1;
      }) : R.length === 2 ? (Y = g(R[0]), ne = g(R[1]), function(ue) {
        return Y(ue[0]) && ne(ue[1]) && ue.length === 2;
      }) : (U = R.map(g), function(ue) {
        for (let he = 0; he < U.length; he++)
          if (!U[he](ue[he]))
            return !1;
        return ue.length === U.length;
      });
  }
  function E(R, U) {
    return U < R.length ? R[U] : y(R) ? j(R) : null;
  }
  function N(R, U) {
    const Y = E(R, U);
    return Y ? h(Y) : /* @__PURE__ */ new Set();
  }
  function S(R) {
    return R.conversion === null || R.conversion === void 0;
  }
  function C(R, U) {
    const Y = /* @__PURE__ */ new Set();
    return R.forEach((ne) => {
      const se = N(ne.params, U);
      let ue;
      for (ue of se)
        Y.add(ue);
    }), Y.has("any") ? ["any"] : Array.from(Y);
  }
  function T(R, U, Y) {
    let ne, se;
    const ue = R || "unnamed";
    let he = Y, de;
    for (de = 0; de < U.length; de++) {
      const Le = [];
      if (he.forEach((Ee) => {
        const je = E(Ee.params, de), M = g(je);
        (de < Ee.params.length || y(Ee.params)) && M(U[de]) && Le.push(Ee);
      }), Le.length === 0) {
        if (se = C(he, de), se.length > 0) {
          const Ee = f(U[de]);
          return ne = new TypeError("Unexpected type of argument in function " + ue + " (expected: " + se.join(" or ") + ", actual: " + Ee.join(" | ") + ", index: " + de + ")"), ne.data = {
            category: "wrongType",
            fn: ue,
            index: de,
            actual: Ee,
            expected: se
          }, ne;
        }
      } else
        he = Le;
    }
    const xe = he.map(function(Le) {
      return y(Le.params) ? 1 / 0 : Le.params.length;
    });
    if (U.length < Math.min.apply(null, xe))
      return se = C(he, de), ne = new TypeError("Too few arguments in function " + ue + " (expected: " + se.join(" or ") + ", index: " + U.length + ")"), ne.data = {
        category: "tooFewArgs",
        fn: ue,
        index: U.length,
        expected: se
      }, ne;
    const ge = Math.max.apply(null, xe);
    if (U.length > ge)
      return ne = new TypeError("Too many arguments in function " + ue + " (expected: " + ge + ", actual: " + U.length + ")"), ne.data = {
        category: "tooManyArgs",
        fn: ue,
        index: U.length,
        expectedLength: ge
      }, ne;
    const Ue = [];
    for (let Le = 0; Le < U.length; ++Le)
      Ue.push(f(U[Le]).join("|"));
    return ne = new TypeError('Arguments of type "' + Ue.join(", ") + '" do not match any of the defined signatures of function ' + ue + "."), ne.data = {
      category: "mismatch",
      actual: Ue
    }, ne;
  }
  function O(R) {
    let U = a.length + 1;
    for (let Y = 0; Y < R.types.length; Y++)
      S(R.types[Y]) && (U = Math.min(U, R.types[Y].typeIndex));
    return U;
  }
  function I(R) {
    let U = i + 1;
    for (let Y = 0; Y < R.types.length; Y++)
      S(R.types[Y]) || (U = Math.min(U, R.types[Y].conversionIndex));
    return U;
  }
  function $(R, U) {
    if (R.hasAny) {
      if (!U.hasAny)
        return 1;
    } else if (U.hasAny)
      return -1;
    if (R.restParam) {
      if (!U.restParam)
        return 1;
    } else if (U.restParam)
      return -1;
    if (R.hasConversion) {
      if (!U.hasConversion)
        return 1;
    } else if (U.hasConversion)
      return -1;
    const Y = O(R) - O(U);
    if (Y < 0)
      return -1;
    if (Y > 0)
      return 1;
    const ne = I(R) - I(U);
    return ne < 0 ? -1 : ne > 0 ? 1 : 0;
  }
  function F(R, U) {
    const Y = R.params, ne = U.params, se = j(Y), ue = j(ne), he = y(Y), de = y(ne);
    if (he && se.hasAny) {
      if (!de || !ue.hasAny)
        return 1;
    } else if (de && ue.hasAny)
      return -1;
    let xe = 0, ge = 0, Ue;
    for (Ue of Y)
      Ue.hasAny && ++xe, Ue.hasConversion && ++ge;
    let Le = 0, Ee = 0;
    for (Ue of ne)
      Ue.hasAny && ++Le, Ue.hasConversion && ++Ee;
    if (xe !== Le)
      return xe - Le;
    if (he && se.hasConversion) {
      if (!de || !ue.hasConversion)
        return 1;
    } else if (de && ue.hasConversion)
      return -1;
    if (ge !== Ee)
      return ge - Ee;
    if (he) {
      if (!de)
        return 1;
    } else if (de)
      return -1;
    const je = (Y.length - ne.length) * (he ? -1 : 1);
    if (je !== 0)
      return je;
    const M = [];
    let G = 0;
    for (let ye = 0; ye < Y.length; ++ye) {
      const Fe = $(Y[ye], ne[ye]);
      M.push(Fe), G += Fe;
    }
    if (G !== 0)
      return G;
    let ae;
    for (ae of M)
      if (ae !== 0)
        return ae;
    return 0;
  }
  function _(R) {
    if (R.length === 0)
      return [];
    const U = R.map(c);
    R.length > 1 && U.sort((se, ue) => se.index - ue.index);
    let Y = U[0].conversionsTo;
    if (R.length === 1)
      return Y;
    Y = Y.concat([]);
    const ne = new Set(R);
    for (let se = 1; se < U.length; ++se) {
      let ue;
      for (ue of U[se].conversionsTo)
        ne.has(ue.from) || (Y.push(ue), ne.add(ue.from));
    }
    return Y;
  }
  function L(R, U) {
    let Y = U;
    if (R.some((se) => se.hasConversion)) {
      const se = y(R), ue = R.map(B);
      Y = function() {
        const de = [], xe = se ? arguments.length - 1 : arguments.length;
        for (let ge = 0; ge < xe; ge++)
          de[ge] = ue[ge](arguments[ge]);
        return se && (de[xe] = arguments[xe].map(ue[xe])), U.apply(this, de);
      };
    }
    let ne = Y;
    if (y(R)) {
      const se = R.length - 1;
      ne = function() {
        return Y.apply(this, te(arguments, 0, se).concat([te(arguments, se)]));
      };
    }
    return ne;
  }
  function B(R) {
    let U, Y, ne, se;
    const ue = [], he = [];
    switch (R.types.forEach(function(de) {
      de.conversion && (ue.push(c(de.conversion.from).test), he.push(de.conversion.convert));
    }), he.length) {
      case 0:
        return function(xe) {
          return xe;
        };
      case 1:
        return U = ue[0], ne = he[0], function(xe) {
          return U(xe) ? ne(xe) : xe;
        };
      case 2:
        return U = ue[0], Y = ue[1], ne = he[0], se = he[1], function(xe) {
          return U(xe) ? ne(xe) : Y(xe) ? se(xe) : xe;
        };
      default:
        return function(xe) {
          for (let ge = 0; ge < he.length; ge++)
            if (ue[ge](xe))
              return he[ge](xe);
          return xe;
        };
    }
  }
  function W(R) {
    function U(Y, ne, se) {
      if (ne < Y.length) {
        const ue = Y[ne];
        let he = [];
        if (ue.restParam) {
          const de = ue.types.filter(S);
          de.length < ue.types.length && he.push({
            types: de,
            name: "..." + de.map((xe) => xe.name).join("|"),
            hasAny: de.some((xe) => xe.isAny),
            hasConversion: !1,
            restParam: !0
          }), he.push(ue);
        } else
          he = ue.types.map(function(de) {
            return {
              types: [de],
              name: de.name,
              hasAny: de.isAny,
              hasConversion: de.conversion,
              restParam: !1
            };
          });
        return me(he, function(de) {
          return U(Y, ne + 1, se.concat([de]));
        });
      } else
        return [se];
    }
    return U(R, 0, []);
  }
  function Q(R, U) {
    const Y = Math.max(R.length, U.length);
    for (let de = 0; de < Y; de++) {
      const xe = N(R, de), ge = N(U, de);
      let Ue = !1, Le;
      for (Le of ge)
        if (xe.has(Le)) {
          Ue = !0;
          break;
        }
      if (!Ue)
        return !1;
    }
    const ne = R.length, se = U.length, ue = y(R), he = y(U);
    return ue ? he ? ne === se : se >= ne : he ? ne >= se : ne === se;
  }
  function Z(R) {
    return R.map((U) => ee(U) ? P(U.referToSelf.callback) : H(U) ? we(U.referTo.references, U.referTo.callback) : U);
  }
  function z(R, U, Y) {
    const ne = [];
    let se;
    for (se of R) {
      let ue = Y[se];
      if (typeof ue != "number")
        throw new TypeError('No definition for referenced signature "' + se + '"');
      if (ue = U[ue], typeof ue != "function")
        return !1;
      ne.push(ue);
    }
    return ne;
  }
  function J(R, U, Y) {
    const ne = Z(R), se = new Array(ne.length).fill(!1);
    let ue = !0;
    for (; ue; ) {
      ue = !1;
      let he = !0;
      for (let de = 0; de < ne.length; ++de) {
        if (se[de]) continue;
        const xe = ne[de];
        if (ee(xe))
          ne[de] = xe.referToSelf.callback(Y), ne[de].referToSelf = xe.referToSelf, se[de] = !0, he = !1;
        else if (H(xe)) {
          const ge = z(xe.referTo.references, ne, U);
          ge ? (ne[de] = xe.referTo.callback.apply(this, ge), ne[de].referTo = xe.referTo, se[de] = !0, he = !1) : ue = !0;
        }
      }
      if (he && ue)
        throw new SyntaxError("Circular reference detected in resolving typed.referTo");
    }
    return ne;
  }
  function le(R) {
    const U = /\bthis(\(|\.signatures\b)/;
    Object.keys(R).forEach((Y) => {
      const ne = R[Y];
      if (U.test(ne.toString()))
        throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
    });
  }
  function K(R, U) {
    if (o.createCount++, Object.keys(U).length === 0)
      throw new SyntaxError("No signatures provided");
    o.warnAgainstDeprecatedThis && le(U);
    const Y = [], ne = [], se = {}, ue = [];
    let he;
    for (he in U) {
      if (!Object.prototype.hasOwnProperty.call(U, he))
        continue;
      const We = w(he);
      if (!We) continue;
      Y.forEach(function(Vt) {
        if (Q(Vt, We))
          throw new TypeError('Conflicting signatures "' + b(Vt) + '" and "' + b(We) + '".');
      }), Y.push(We);
      const xr = ne.length;
      ne.push(U[he]);
      const Jm = We.map(D);
      let fn;
      for (fn of W(Jm)) {
        const Vt = b(fn);
        ue.push({
          params: fn,
          name: Vt,
          fn: xr
        }), fn.every((Qm) => !Qm.hasConversion) && (se[Vt] = xr);
      }
    }
    ue.sort(F);
    const de = J(ne, se, Zt);
    let xe;
    for (xe in se)
      Object.prototype.hasOwnProperty.call(se, xe) && (se[xe] = de[se[xe]]);
    const ge = [], Ue = /* @__PURE__ */ new Map();
    for (xe of ue)
      Ue.has(xe.name) || (xe.fn = de[xe.fn], ge.push(xe), Ue.set(xe.name, xe));
    const Le = ge[0] && ge[0].params.length <= 2 && !y(ge[0].params), Ee = ge[1] && ge[1].params.length <= 2 && !y(ge[1].params), je = ge[2] && ge[2].params.length <= 2 && !y(ge[2].params), M = ge[3] && ge[3].params.length <= 2 && !y(ge[3].params), G = ge[4] && ge[4].params.length <= 2 && !y(ge[4].params), ae = ge[5] && ge[5].params.length <= 2 && !y(ge[5].params), ye = Le && Ee && je && M && G && ae;
    for (let We = 0; We < ge.length; ++We)
      ge[We].test = A(ge[We].params);
    const Fe = Le ? g(ge[0].params[0]) : _r, qe = Ee ? g(ge[1].params[0]) : _r, Ar = je ? g(ge[2].params[0]) : _r, ga = M ? g(ge[3].params[0]) : _r, Em = G ? g(ge[4].params[0]) : _r, Sm = ae ? g(ge[5].params[0]) : _r, Cm = Le ? g(ge[0].params[1]) : _r, Mm = Ee ? g(ge[1].params[1]) : _r, _m = je ? g(ge[2].params[1]) : _r, Fm = M ? g(ge[3].params[1]) : _r, Tm = G ? g(ge[4].params[1]) : _r, Bm = ae ? g(ge[5].params[1]) : _r;
    for (let We = 0; We < ge.length; ++We)
      ge[We].implementation = L(ge[We].params, ge[We].fn);
    const Om = Le ? ge[0].implementation : wt, $m = Ee ? ge[1].implementation : wt, Im = je ? ge[2].implementation : wt, qm = M ? ge[3].implementation : wt, Rm = G ? ge[4].implementation : wt, zm = ae ? ge[5].implementation : wt, Pm = Le ? ge[0].params.length : -1, Um = Ee ? ge[1].params.length : -1, Lm = je ? ge[2].params.length : -1, km = M ? ge[3].params.length : -1, Hm = G ? ge[4].params.length : -1, Gm = ae ? ge[5].params.length : -1, Zm = ye ? 6 : 0, Vm = ge.length, Wm = ge.map((We) => We.test), Ym = ge.map((We) => We.implementation), Xm = function() {
      for (let xr = Zm; xr < Vm; xr++)
        if (Wm[xr](arguments))
          return Ym[xr].apply(this, arguments);
      return o.onMismatch(R, arguments, ge);
    };
    function Zt(We, xr) {
      return arguments.length === Pm && Fe(We) && Cm(xr) ? Om.apply(this, arguments) : arguments.length === Um && qe(We) && Mm(xr) ? $m.apply(this, arguments) : arguments.length === Lm && Ar(We) && _m(xr) ? Im.apply(this, arguments) : arguments.length === km && ga(We) && Fm(xr) ? qm.apply(this, arguments) : arguments.length === Hm && Em(We) && Tm(xr) ? Rm.apply(this, arguments) : arguments.length === Gm && Sm(We) && Bm(xr) ? zm.apply(this, arguments) : Xm.apply(this, arguments);
    }
    try {
      Object.defineProperty(Zt, "name", {
        value: R
      });
    } catch {
    }
    return Zt.signatures = se, Zt._typedFunctionData = {
      signatures: ge,
      signatureMap: Ue
    }, Zt;
  }
  function re(R, U, Y) {
    throw T(R, U, Y);
  }
  function ie(R) {
    return te(R, 0, R.length - 1);
  }
  function j(R) {
    return R[R.length - 1];
  }
  function te(R, U, Y) {
    return Array.prototype.slice.call(R, U, Y);
  }
  function oe(R, U) {
    for (let Y = 0; Y < R.length; Y++)
      if (U(R[Y]))
        return R[Y];
  }
  function me(R, U) {
    return Array.prototype.concat.apply([], R.map(U));
  }
  function be() {
    const R = ie(arguments).map((Y) => b(w(Y))), U = j(arguments);
    if (typeof U != "function")
      throw new TypeError("Callback function expected as last argument");
    return we(R, U);
  }
  function we(R, U) {
    return {
      referTo: {
        references: R,
        callback: U
      }
    };
  }
  function P(R) {
    if (typeof R != "function")
      throw new TypeError("Callback function expected as first argument");
    return {
      referToSelf: {
        callback: R
      }
    };
  }
  function H(R) {
    return R && typeof R.referTo == "object" && Array.isArray(R.referTo.references) && typeof R.referTo.callback == "function";
  }
  function ee(R) {
    return R && typeof R.referToSelf == "object" && typeof R.referToSelf.callback == "function";
  }
  function k(R, U) {
    if (!R)
      return U;
    if (U && U !== R) {
      const Y = new Error("Function names do not match (expected: " + R + ", actual: " + U + ")");
      throw Y.data = {
        actual: U,
        expected: R
      }, Y;
    }
    return R;
  }
  function V(R) {
    let U;
    for (const Y in R)
      Object.prototype.hasOwnProperty.call(R, Y) && (m(R[Y]) || typeof R[Y].signature == "string") && (U = k(U, R[Y].name));
    return U;
  }
  function X(R, U) {
    let Y;
    for (Y in U)
      if (Object.prototype.hasOwnProperty.call(U, Y)) {
        if (Y in R && U[Y] !== R[Y]) {
          const ne = new Error('Signature "' + Y + '" is defined twice');
          throw ne.data = {
            signature: Y,
            sourceFunction: U[Y],
            destFunction: R[Y]
          }, ne;
        }
        R[Y] = U[Y];
      }
  }
  const fe = o;
  o = function(R) {
    const U = typeof R == "string", Y = U ? 1 : 0;
    let ne = U ? R : "";
    const se = {};
    for (let ue = Y; ue < arguments.length; ++ue) {
      const he = arguments[ue];
      let de = {}, xe;
      if (typeof he == "function" ? (xe = he.name, typeof he.signature == "string" ? de[he.signature] = he : m(he) && (de = he.signatures)) : e(he) && (de = he, U || (xe = V(he))), Object.keys(de).length === 0) {
        const ge = new TypeError("Argument to 'typed' at index " + ue + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
        throw ge.data = {
          index: ue,
          argument: he
        }, ge;
      }
      U || (ne = k(ne, xe)), X(se, de);
    }
    return K(ne || "", se);
  }, o.create = Nc, o.createCount = fe.createCount, o.onMismatch = re, o.throwMismatchError = re, o.createError = T, o.clear = s, o.clearConversions = u, o.addTypes = l, o._findType = c, o.referTo = be, o.referToSelf = P, o.convert = d, o.findSignature = v, o.find = p, o.isTypedFunction = m, o.warnAgainstDeprecatedThis = !0, o.addType = function(R, U) {
    let Y = "any";
    U !== !1 && n.has("Object") && (Y = "Object"), o.addTypes([R], Y);
  };
  function ce(R) {
    if (!R || typeof R.from != "string" || typeof R.to != "string" || typeof R.convert != "function")
      throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
    if (R.to === R.from)
      throw new SyntaxError('Illegal to define conversion from "' + R.from + '" to itself.');
  }
  return o.addConversion = function(R) {
    let U = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      override: !1
    };
    ce(R);
    const Y = c(R.to), ne = Y.conversionsTo.find((se) => se.from === R.from);
    if (ne)
      if (U && U.override)
        o.removeConversion({
          from: ne.from,
          to: R.to,
          convert: ne.convert
        });
      else
        throw new Error('There is already a conversion from "' + R.from + '" to "' + Y.name + '"');
    Y.conversionsTo.push({
      from: R.from,
      convert: R.convert,
      index: i++
    });
  }, o.addConversions = function(R, U) {
    R.forEach((Y) => o.addConversion(Y, U));
  }, o.removeConversion = function(R) {
    ce(R);
    const U = c(R.to), Y = oe(U.conversionsTo, (se) => se.from === R.from);
    if (!Y)
      throw new Error("Attempt to remove nonexistent conversion from " + R.from + " to " + R.to);
    if (Y.convert !== R.convert)
      throw new Error("Conversion to remove does not match existing conversion");
    const ne = U.conversionsTo.indexOf(Y);
    U.conversionsTo.splice(ne, 1);
  }, o.resolve = function(R, U) {
    if (!m(R))
      throw new TypeError(Ti);
    const Y = R._typedFunctionData.signatures;
    for (let ne = 0; ne < Y.length; ++ne)
      if (Y[ne].test(U))
        return Y[ne];
    return null;
  }, o;
}
const rn = Nc();
function q(e, r, t, n) {
  function a(i) {
    var o = cv(i, r.map(Ac));
    return mv(e, r, i), t(o);
  }
  return a.isFactory = !0, a.fn = e, a.dependencies = r.slice().sort(), n && (a.meta = n), a;
}
function Kt(e) {
  return typeof e == "function" && typeof e.fn == "string" && Array.isArray(e.dependencies);
}
function mv(e, r, t) {
  var n = r.filter((i) => !vv(i)).every((i) => t[i] !== void 0);
  if (!n) {
    var a = r.filter((i) => t[i] === void 0);
    throw new Error('Cannot create function "'.concat(e, '", ') + "some dependencies are missing: ".concat(a.map((i) => '"'.concat(i, '"')).join(", "), "."));
  }
}
function vv(e) {
  return e && e[0] === "?";
}
function Ac(e) {
  return e && e[0] === "?" ? e.slice(1) : e;
}
function Ae(e) {
  return typeof e == "boolean" ? !0 : isFinite(e) ? e === Math.round(e) : !1;
}
function pv(e) {
  return /^-?\d+$/.test(e);
}
function st(e, r) {
  return r.number === "bigint" && !pv(e) ? r.numberFallback : r.number;
}
var rt = Math.sign || function(e) {
  return e > 0 ? 1 : e < 0 ? -1 : 0;
}, dv = Math.log2 || function(r) {
  return Math.log(r) / Math.LN2;
}, hv = Math.log10 || function(r) {
  return Math.log(r) / Math.LN10;
}, gv = Math.log1p || function(e) {
  return Math.log(e + 1);
}, yv = Math.cbrt || function(r) {
  if (r === 0)
    return r;
  var t = r < 0, n;
  return t && (r = -r), isFinite(r) ? (n = Math.exp(Math.log(r) / 3), n = (r / (n * n) + 2 * n) / 3) : n = r, t ? -n : n;
}, bv = Math.expm1 || function(r) {
  return r >= 2e-4 || r <= -2e-4 ? Math.exp(r) - 1 : r + r * r / 2 + r * r * r / 6;
};
function ya(e, r, t) {
  var n = {
    2: "0b",
    8: "0o",
    16: "0x"
  }, a = n[r], i = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!Ae(t))
      throw new Error("size must be an integer");
    if (e > 2 ** (t - 1) - 1 || e < -(2 ** (t - 1)))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!Ae(e))
      throw new Error("Value must be an integer");
    e < 0 && (e = e + 2 ** t), i = "i".concat(t);
  }
  var o = "";
  return e < 0 && (e = -e, o = "-"), "".concat(o).concat(a).concat(e.toString(r)).concat(i);
}
function pt(e, r) {
  if (typeof r == "function")
    return r(e);
  if (e === 1 / 0)
    return "Infinity";
  if (e === -1 / 0)
    return "-Infinity";
  if (isNaN(e))
    return "NaN";
  var {
    notation: t,
    precision: n,
    wordSize: a
  } = Ec(r);
  switch (t) {
    case "fixed":
      return Sc(e, n);
    case "exponential":
      return Cc(e, n);
    case "engineering":
      return xv(e, n);
    case "bin":
      return ya(e, 2, a);
    case "oct":
      return ya(e, 8, a);
    case "hex":
      return ya(e, 16, a);
    case "auto":
      return wv(e, n, r).replace(/((\.\d*?)(0+))($|e)/, function() {
        var i = arguments[2], o = arguments[4];
        return i !== "." ? i + o : o;
      });
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function Ec(e) {
  var r = "auto", t, n;
  if (e !== void 0)
    if (Oe(e))
      t = e;
    else if (Be(e))
      t = e.toNumber();
    else if (zt(e))
      e.precision !== void 0 && (t = Bi(e.precision, () => {
        throw new Error('Option "precision" must be a number or BigNumber');
      })), e.wordSize !== void 0 && (n = Bi(e.wordSize, () => {
        throw new Error('Option "wordSize" must be a number or BigNumber');
      })), e.notation && (r = e.notation);
    else
      throw new Error("Unsupported type of options, number, BigNumber, or object expected");
  return {
    notation: r,
    precision: t,
    wordSize: n
  };
}
function un(e) {
  var r = String(e).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!r)
    throw new SyntaxError("Invalid number " + e);
  var t = r[1], n = r[2], a = parseFloat(r[4] || "0"), i = n.indexOf(".");
  a += i !== -1 ? i - 1 : n.length - 1;
  var o = n.replace(".", "").replace(/^0*/, function(c) {
    return a -= c.length, "";
  }).replace(/0*$/, "").split("").map(function(c) {
    return parseInt(c);
  });
  return o.length === 0 && (o.push(0), a++), {
    sign: t,
    coefficients: o,
    exponent: a
  };
}
function xv(e, r) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var t = un(e), n = ia(t, r), a = n.exponent, i = n.coefficients, o = a % 3 === 0 ? a : a < 0 ? a - 3 - a % 3 : a - a % 3;
  if (Oe(r))
    for (; r > i.length || a - o + 1 > i.length; )
      i.push(0);
  else
    for (var c = Math.abs(a - o) - (i.length - 1), l = 0; l < c; l++)
      i.push(0);
  for (var s = Math.abs(a - o), u = 1; s > 0; )
    u++, s--;
  var f = i.slice(u).join(""), m = Oe(r) && f.length || f.match(/[1-9]/) ? "." + f : "", v = i.slice(0, u).join("") + m + "e" + (a >= 0 ? "+" : "") + o.toString();
  return n.sign + v;
}
function Sc(e, r) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var t = un(e), n = typeof r == "number" ? ia(t, t.exponent + 1 + r) : t, a = n.coefficients, i = n.exponent + 1, o = i + (r || 0);
  return a.length < o && (a = a.concat(Ft(o - a.length))), i < 0 && (a = Ft(-i + 1).concat(a), i = 1), i < a.length && a.splice(i, 0, i === 0 ? "0." : "."), n.sign + a.join("");
}
function Cc(e, r) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var t = un(e), n = r ? ia(t, r) : t, a = n.coefficients, i = n.exponent;
  a.length < r && (a = a.concat(Ft(r - a.length)));
  var o = a.shift();
  return n.sign + o + (a.length > 0 ? "." + a.join("") : "") + "e" + (i >= 0 ? "+" : "") + i;
}
function wv(e, r, t) {
  if (isNaN(e) || !isFinite(e))
    return String(e);
  var n = Oi(t == null ? void 0 : t.lowerExp, -3), a = Oi(t == null ? void 0 : t.upperExp, 5), i = un(e), o = r ? ia(i, r) : i;
  if (o.exponent < n || o.exponent >= a)
    return Cc(e, r);
  var c = o.coefficients, l = o.exponent;
  c.length < r && (c = c.concat(Ft(r - c.length))), c = c.concat(Ft(l - c.length + 1 + (c.length < r ? r - c.length : 0))), c = Ft(-l).concat(c);
  var s = l > 0 ? l : 0;
  return s < c.length - 1 && c.splice(s + 1, 0, "."), o.sign + c.join("");
}
function ia(e, r) {
  for (var t = {
    sign: e.sign,
    coefficients: e.coefficients,
    exponent: e.exponent
  }, n = t.coefficients; r <= 0; )
    n.unshift(0), t.exponent++, r++;
  if (n.length > r) {
    var a = n.splice(r, n.length - r);
    if (a[0] >= 5) {
      var i = r - 1;
      for (n[i]++; n[i] === 10; )
        n.pop(), i === 0 && (n.unshift(0), t.exponent++, i++), i--, n[i]++;
    }
  }
  return t;
}
function Ft(e) {
  for (var r = [], t = 0; t < e; t++)
    r.push(0);
  return r;
}
function Dv(e) {
  return e.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function lr(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (t <= 0)
    throw new Error("Relative tolerance must be greater than 0");
  if (n < 0)
    throw new Error("Absolute tolerance must be at least 0");
  return isNaN(e) || isNaN(r) ? !1 : !isFinite(e) || !isFinite(r) ? e === r : e === r ? !0 : Math.abs(e - r) <= Math.max(t * Math.max(Math.abs(e), Math.abs(r)), n);
}
var Nv = Math.acosh || function(e) {
  return Math.log(Math.sqrt(e * e - 1) + e);
}, Av = Math.asinh || function(e) {
  return Math.log(Math.sqrt(e * e + 1) + e);
}, Ev = Math.atanh || function(e) {
  return Math.log((1 + e) / (1 - e)) / 2;
}, Sv = Math.cosh || function(e) {
  return (Math.exp(e) + Math.exp(-e)) / 2;
}, Cv = Math.sinh || function(e) {
  return (Math.exp(e) - Math.exp(-e)) / 2;
}, Mv = Math.tanh || function(e) {
  var r = Math.exp(2 * e);
  return (r - 1) / (r + 1);
};
function _v(e, r) {
  var t = e > 0 ? !0 : e < 0 ? !1 : 1 / e === 1 / 0, n = r > 0 ? !0 : r < 0 ? !1 : 1 / r === 1 / 0;
  return t ^ n ? -e : e;
}
function Bi(e, r) {
  if (Oe(e))
    return e;
  if (Be(e))
    return e.toNumber();
  r();
}
function Oi(e, r) {
  return Oe(e) ? e : Be(e) ? e.toNumber() : r;
}
var Mc = function() {
  return Mc = rn.create, rn;
}, Fv = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"], Tv = /* @__PURE__ */ q("typed", Fv, function(r) {
  var {
    BigNumber: t,
    Complex: n,
    DenseMatrix: a,
    Fraction: i
  } = r, o = Mc();
  return o.clear(), o.addTypes([
    {
      name: "number",
      test: Oe
    },
    {
      name: "Complex",
      test: Ir
    },
    {
      name: "BigNumber",
      test: Be
    },
    {
      name: "bigint",
      test: sc
    },
    {
      name: "Fraction",
      test: ht
    },
    {
      name: "Unit",
      test: wr
    },
    // The following type matches a valid variable name, i.e., an alphanumeric
    // string starting with an alphabetic character. It is used (at least)
    // in the definition of the derivative() function, as the argument telling
    // what to differentiate over must (currently) be a variable.
    // TODO: deprecate the identifier type (it's not used anymore, see https://github.com/josdejong/mathjs/issues/3253)
    {
      name: "identifier",
      test: (c) => sr && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(c)
    },
    {
      name: "string",
      test: sr
    },
    {
      name: "Chain",
      test: Xa
    },
    {
      name: "Array",
      test: Ze
    },
    {
      name: "Matrix",
      test: Ce
    },
    {
      name: "DenseMatrix",
      test: en
    },
    {
      name: "SparseMatrix",
      test: et
    },
    {
      name: "Range",
      test: aa
    },
    {
      name: "Index",
      test: on
    },
    {
      name: "boolean",
      test: uc
    },
    {
      name: "ResultSet",
      test: lc
    },
    {
      name: "Help",
      test: Ya
    },
    {
      name: "function",
      test: cc
    },
    {
      name: "Date",
      test: fc
    },
    {
      name: "RegExp",
      test: mc
    },
    {
      name: "null",
      test: vc
    },
    {
      name: "undefined",
      test: pc
    },
    {
      name: "AccessorNode",
      test: at
    },
    {
      name: "ArrayNode",
      test: Sr
    },
    {
      name: "AssignmentNode",
      test: dc
    },
    {
      name: "BlockNode",
      test: hc
    },
    {
      name: "ConditionalNode",
      test: gc
    },
    {
      name: "ConstantNode",
      test: ke
    },
    {
      name: "FunctionNode",
      test: Yr
    },
    {
      name: "FunctionAssignmentNode",
      test: Pt
    },
    {
      name: "IndexNode",
      test: gt
    },
    {
      name: "Node",
      test: Ve
    },
    {
      name: "ObjectNode",
      test: sn
    },
    {
      name: "OperatorNode",
      test: rr
    },
    {
      name: "ParenthesisNode",
      test: Ur
    },
    {
      name: "RangeNode",
      test: yc
    },
    {
      name: "RelationalNode",
      test: bc
    },
    {
      name: "SymbolNode",
      test: nr
    },
    {
      name: "Map",
      test: vt
    },
    {
      name: "Object",
      test: zt
    }
    // order 'Object' last, it matches on other classes too
  ]), o.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function(l) {
      if (t || mn(l), Dv(l) > 15)
        throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + l + "). Use function bignumber(x) to convert to BigNumber.");
      return new t(l);
    }
  }, {
    from: "number",
    to: "Complex",
    convert: function(l) {
      return n || vn(l), new n(l, 0);
    }
  }, {
    from: "BigNumber",
    to: "Complex",
    convert: function(l) {
      return n || vn(l), new n(l.toNumber(), 0);
    }
  }, {
    from: "bigint",
    to: "number",
    convert: function(l) {
      if (l > Number.MAX_SAFE_INTEGER)
        throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + l + ")");
      return Number(l);
    }
  }, {
    from: "bigint",
    to: "BigNumber",
    convert: function(l) {
      return t || mn(l), new t(l.toString());
    }
  }, {
    from: "bigint",
    to: "Fraction",
    convert: function(l) {
      return i || pn(l), new i(l.toString());
    }
  }, {
    from: "Fraction",
    to: "BigNumber",
    convert: function(l) {
      throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
    }
  }, {
    from: "Fraction",
    to: "Complex",
    convert: function(l) {
      return n || vn(l), new n(l.valueOf(), 0);
    }
  }, {
    from: "number",
    to: "Fraction",
    convert: function(l) {
      i || pn(l);
      var s = new i(l);
      if (s.valueOf() !== l)
        throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + l + "). Use function fraction(x) to convert to Fraction.");
      return s;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: "string",
    to: "number",
    convert: function(l) {
      var s = Number(l);
      if (isNaN(s))
        throw new Error('Cannot convert "' + l + '" to a number');
      return s;
    }
  }, {
    from: "string",
    to: "BigNumber",
    convert: function(l) {
      t || mn(l);
      try {
        return new t(l);
      } catch {
        throw new Error('Cannot convert "' + l + '" to BigNumber');
      }
    }
  }, {
    from: "string",
    to: "bigint",
    convert: function(l) {
      try {
        return BigInt(l);
      } catch {
        throw new Error('Cannot convert "' + l + '" to BigInt');
      }
    }
  }, {
    from: "string",
    to: "Fraction",
    convert: function(l) {
      i || pn(l);
      try {
        return new i(l);
      } catch {
        throw new Error('Cannot convert "' + l + '" to Fraction');
      }
    }
  }, {
    from: "string",
    to: "Complex",
    convert: function(l) {
      n || vn(l);
      try {
        return new n(l);
      } catch {
        throw new Error('Cannot convert "' + l + '" to Complex');
      }
    }
  }, {
    from: "boolean",
    to: "number",
    convert: function(l) {
      return +l;
    }
  }, {
    from: "boolean",
    to: "BigNumber",
    convert: function(l) {
      return t || mn(l), new t(+l);
    }
  }, {
    from: "boolean",
    to: "bigint",
    convert: function(l) {
      return BigInt(+l);
    }
  }, {
    from: "boolean",
    to: "Fraction",
    convert: function(l) {
      return i || pn(l), new i(+l);
    }
  }, {
    from: "boolean",
    to: "string",
    convert: function(l) {
      return String(l);
    }
  }, {
    from: "Array",
    to: "Matrix",
    convert: function(l) {
      return a || Bv(), new a(l);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function(l) {
      return l.valueOf();
    }
  }]), o.onMismatch = (c, l, s) => {
    var u = o.createError(c, l, s);
    if (["wrongType", "mismatch"].includes(u.data.category) && l.length === 1 && Cr(l[0]) && // check if the function can be unary:
    s.some((m) => !m.params.includes(","))) {
      var f = new TypeError("Function '".concat(c, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(c, ")'."));
      throw f.data = u.data, f;
    }
    throw u;
  }, o.onMismatch = (c, l, s) => {
    var u = o.createError(c, l, s);
    if (["wrongType", "mismatch"].includes(u.data.category) && l.length === 1 && Cr(l[0]) && // check if the function can be unary:
    s.some((m) => !m.params.includes(","))) {
      var f = new TypeError("Function '".concat(c, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(c, ")'."));
      throw f.data = u.data, f;
    }
    throw u;
  }, o;
});
function mn(e) {
  throw new Error("Cannot convert value ".concat(e, " into a BigNumber: no class 'BigNumber' provided"));
}
function vn(e) {
  throw new Error("Cannot convert value ".concat(e, " into a Complex number: no class 'Complex' provided"));
}
function Bv() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function pn(e) {
  throw new Error("Cannot convert value ".concat(e, " into a Fraction, no class 'Fraction' provided."));
}
var Ov = "ResultSet", $v = [], Iv = /* @__PURE__ */ q(Ov, $v, () => {
  function e(r) {
    if (!(this instanceof e))
      throw new SyntaxError("Constructor must be called with the new operator");
    this.entries = r || [];
  }
  return e.prototype.type = "ResultSet", e.prototype.isResultSet = !0, e.prototype.valueOf = function() {
    return this.entries;
  }, e.prototype.toString = function() {
    return "[" + this.entries.join(", ") + "]";
  }, e.prototype.toJSON = function() {
    return {
      mathjs: "ResultSet",
      entries: this.entries
    };
  }, e.fromJSON = function(r) {
    return new e(r.entries);
  }, e;
}, {
  isClass: !0
});
/*!
 *  decimal.js v10.4.3
 *  An arbitrary-precision Decimal type for JavaScript.
 *  https://github.com/MikeMcl/decimal.js
 *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
 *  MIT Licence
 */
var St = 9e15, ut = 1e9, Ma = "0123456789abcdef", zn = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", Pn = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", _a = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -St,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: St,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: !1
  // true/false
}, _c, Vr, $e = !0, oa = "[DecimalError] ", it = oa + "Invalid argument: ", Fc = oa + "Precision limit exceeded", Tc = oa + "crypto unavailable", Bc = "[object Decimal]", pr = Math.floor, tr = Math.pow, qv = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, Rv = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, zv = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, Oc = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, qr = 1e7, _e = 7, Pv = 9007199254740991, Uv = zn.length - 1, Fa = Pn.length - 1, pe = { toStringTag: Bc };
pe.absoluteValue = pe.abs = function() {
  var e = new this.constructor(this);
  return e.s < 0 && (e.s = 1), Se(e);
};
pe.ceil = function() {
  return Se(new this.constructor(this), this.e + 1, 2);
};
pe.clampedTo = pe.clamp = function(e, r) {
  var t, n = this, a = n.constructor;
  if (e = new a(e), r = new a(r), !e.s || !r.s) return new a(NaN);
  if (e.gt(r)) throw Error(it + r);
  return t = n.cmp(e), t < 0 ? e : n.cmp(r) > 0 ? r : new a(n);
};
pe.comparedTo = pe.cmp = function(e) {
  var r, t, n, a, i = this, o = i.d, c = (e = new i.constructor(e)).d, l = i.s, s = e.s;
  if (!o || !c)
    return !l || !s ? NaN : l !== s ? l : o === c ? 0 : !o ^ l < 0 ? 1 : -1;
  if (!o[0] || !c[0]) return o[0] ? l : c[0] ? -s : 0;
  if (l !== s) return l;
  if (i.e !== e.e) return i.e > e.e ^ l < 0 ? 1 : -1;
  for (n = o.length, a = c.length, r = 0, t = n < a ? n : a; r < t; ++r)
    if (o[r] !== c[r]) return o[r] > c[r] ^ l < 0 ? 1 : -1;
  return n === a ? 0 : n > a ^ l < 0 ? 1 : -1;
};
pe.cosine = pe.cos = function() {
  var e, r, t = this, n = t.constructor;
  return t.d ? t.d[0] ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + _e, n.rounding = 1, t = Lv(n, zc(n, t)), n.precision = e, n.rounding = r, Se(Vr == 2 || Vr == 3 ? t.neg() : t, e, r, !0)) : new n(1) : new n(NaN);
};
pe.cubeRoot = pe.cbrt = function() {
  var e, r, t, n, a, i, o, c, l, s, u = this, f = u.constructor;
  if (!u.isFinite() || u.isZero()) return new f(u);
  for ($e = !1, i = u.s * tr(u.s * u, 1 / 3), !i || Math.abs(i) == 1 / 0 ? (t = ur(u.d), e = u.e, (i = (e - t.length + 1) % 3) && (t += i == 1 || i == -2 ? "0" : "00"), i = tr(t, 1 / 3), e = pr((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new f(t), n.s = u.s) : n = new f(i.toString()), o = (e = f.precision) + 3; ; )
    if (c = n, l = c.times(c).times(c), s = l.plus(u), n = Ke(s.plus(u).times(c), s.plus(l), o + 2, 1), ur(c.d).slice(0, o) === (t = ur(n.d)).slice(0, o))
      if (t = t.slice(o - 3, o + 1), t == "9999" || !a && t == "4999") {
        if (!a && (Se(c, e + 1, 0), c.times(c).times(c).eq(u))) {
          n = c;
          break;
        }
        o += 4, a = 1;
      } else {
        (!+t || !+t.slice(1) && t.charAt(0) == "5") && (Se(n, e + 1, 1), r = !n.times(n).times(n).eq(u));
        break;
      }
  return $e = !0, Se(n, e, f.rounding, r);
};
pe.decimalPlaces = pe.dp = function() {
  var e, r = this.d, t = NaN;
  if (r) {
    if (e = r.length - 1, t = (e - pr(this.e / _e)) * _e, e = r[e], e) for (; e % 10 == 0; e /= 10) t--;
    t < 0 && (t = 0);
  }
  return t;
};
pe.dividedBy = pe.div = function(e) {
  return Ke(this, new this.constructor(e));
};
pe.dividedToIntegerBy = pe.divToInt = function(e) {
  var r = this, t = r.constructor;
  return Se(Ke(r, new t(e), 0, 1, 1), t.precision, t.rounding);
};
pe.equals = pe.eq = function(e) {
  return this.cmp(e) === 0;
};
pe.floor = function() {
  return Se(new this.constructor(this), this.e + 1, 3);
};
pe.greaterThan = pe.gt = function(e) {
  return this.cmp(e) > 0;
};
pe.greaterThanOrEqualTo = pe.gte = function(e) {
  var r = this.cmp(e);
  return r == 1 || r === 0;
};
pe.hyperbolicCosine = pe.cosh = function() {
  var e, r, t, n, a, i = this, o = i.constructor, c = new o(1);
  if (!i.isFinite()) return new o(i.s ? 1 / 0 : NaN);
  if (i.isZero()) return c;
  t = o.precision, n = o.rounding, o.precision = t + Math.max(i.e, i.sd()) + 4, o.rounding = 1, a = i.d.length, a < 32 ? (e = Math.ceil(a / 3), r = (1 / ua(4, e)).toString()) : (e = 16, r = "2.3283064365386962890625e-10"), i = Ot(o, 1, i.times(r), new o(1), !0);
  for (var l, s = e, u = new o(8); s--; )
    l = i.times(i), i = c.minus(l.times(u.minus(l.times(u))));
  return Se(i, o.precision = t, o.rounding = n, !0);
};
pe.hyperbolicSine = pe.sinh = function() {
  var e, r, t, n, a = this, i = a.constructor;
  if (!a.isFinite() || a.isZero()) return new i(a);
  if (r = i.precision, t = i.rounding, i.precision = r + Math.max(a.e, a.sd()) + 4, i.rounding = 1, n = a.d.length, n < 3)
    a = Ot(i, 2, a, a, !0);
  else {
    e = 1.4 * Math.sqrt(n), e = e > 16 ? 16 : e | 0, a = a.times(1 / ua(5, e)), a = Ot(i, 2, a, a, !0);
    for (var o, c = new i(5), l = new i(16), s = new i(20); e--; )
      o = a.times(a), a = a.times(c.plus(o.times(l.times(o).plus(s))));
  }
  return i.precision = r, i.rounding = t, Se(a, r, t, !0);
};
pe.hyperbolicTangent = pe.tanh = function() {
  var e, r, t = this, n = t.constructor;
  return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 7, n.rounding = 1, Ke(t.sinh(), t.cosh(), n.precision = e, n.rounding = r)) : new n(t.s);
};
pe.inverseCosine = pe.acos = function() {
  var e, r = this, t = r.constructor, n = r.abs().cmp(1), a = t.precision, i = t.rounding;
  return n !== -1 ? n === 0 ? r.isNeg() ? $r(t, a, i) : new t(0) : new t(NaN) : r.isZero() ? $r(t, a + 4, i).times(0.5) : (t.precision = a + 6, t.rounding = 1, r = r.asin(), e = $r(t, a + 4, i).times(0.5), t.precision = a, t.rounding = i, e.minus(r));
};
pe.inverseHyperbolicCosine = pe.acosh = function() {
  var e, r, t = this, n = t.constructor;
  return t.lte(1) ? new n(t.eq(1) ? 0 : NaN) : t.isFinite() ? (e = n.precision, r = n.rounding, n.precision = e + Math.max(Math.abs(t.e), t.sd()) + 4, n.rounding = 1, $e = !1, t = t.times(t).minus(1).sqrt().plus(t), $e = !0, n.precision = e, n.rounding = r, t.ln()) : new n(t);
};
pe.inverseHyperbolicSine = pe.asinh = function() {
  var e, r, t = this, n = t.constructor;
  return !t.isFinite() || t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 2 * Math.max(Math.abs(t.e), t.sd()) + 6, n.rounding = 1, $e = !1, t = t.times(t).plus(1).sqrt().plus(t), $e = !0, n.precision = e, n.rounding = r, t.ln());
};
pe.inverseHyperbolicTangent = pe.atanh = function() {
  var e, r, t, n, a = this, i = a.constructor;
  return a.isFinite() ? a.e >= 0 ? new i(a.abs().eq(1) ? a.s / 0 : a.isZero() ? a : NaN) : (e = i.precision, r = i.rounding, n = a.sd(), Math.max(n, e) < 2 * -a.e - 1 ? Se(new i(a), e, r, !0) : (i.precision = t = n - a.e, a = Ke(a.plus(1), new i(1).minus(a), t + e, 1), i.precision = e + 4, i.rounding = 1, a = a.ln(), i.precision = e, i.rounding = r, a.times(0.5))) : new i(NaN);
};
pe.inverseSine = pe.asin = function() {
  var e, r, t, n, a = this, i = a.constructor;
  return a.isZero() ? new i(a) : (r = a.abs().cmp(1), t = i.precision, n = i.rounding, r !== -1 ? r === 0 ? (e = $r(i, t + 4, n).times(0.5), e.s = a.s, e) : new i(NaN) : (i.precision = t + 6, i.rounding = 1, a = a.div(new i(1).minus(a.times(a)).sqrt().plus(1)).atan(), i.precision = t, i.rounding = n, a.times(2)));
};
pe.inverseTangent = pe.atan = function() {
  var e, r, t, n, a, i, o, c, l, s = this, u = s.constructor, f = u.precision, m = u.rounding;
  if (s.isFinite()) {
    if (s.isZero())
      return new u(s);
    if (s.abs().eq(1) && f + 4 <= Fa)
      return o = $r(u, f + 4, m).times(0.25), o.s = s.s, o;
  } else {
    if (!s.s) return new u(NaN);
    if (f + 4 <= Fa)
      return o = $r(u, f + 4, m).times(0.5), o.s = s.s, o;
  }
  for (u.precision = c = f + 10, u.rounding = 1, t = Math.min(28, c / _e + 2 | 0), e = t; e; --e) s = s.div(s.times(s).plus(1).sqrt().plus(1));
  for ($e = !1, r = Math.ceil(c / _e), n = 1, l = s.times(s), o = new u(s), a = s; e !== -1; )
    if (a = a.times(l), i = o.minus(a.div(n += 2)), a = a.times(l), o = i.plus(a.div(n += 2)), o.d[r] !== void 0) for (e = r; o.d[e] === i.d[e] && e--; ) ;
  return t && (o = o.times(2 << t - 1)), $e = !0, Se(o, u.precision = f, u.rounding = m, !0);
};
pe.isFinite = function() {
  return !!this.d;
};
pe.isInteger = pe.isInt = function() {
  return !!this.d && pr(this.e / _e) > this.d.length - 2;
};
pe.isNaN = function() {
  return !this.s;
};
pe.isNegative = pe.isNeg = function() {
  return this.s < 0;
};
pe.isPositive = pe.isPos = function() {
  return this.s > 0;
};
pe.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
pe.lessThan = pe.lt = function(e) {
  return this.cmp(e) < 0;
};
pe.lessThanOrEqualTo = pe.lte = function(e) {
  return this.cmp(e) < 1;
};
pe.logarithm = pe.log = function(e) {
  var r, t, n, a, i, o, c, l, s = this, u = s.constructor, f = u.precision, m = u.rounding, v = 5;
  if (e == null)
    e = new u(10), r = !0;
  else {
    if (e = new u(e), t = e.d, e.s < 0 || !t || !t[0] || e.eq(1)) return new u(NaN);
    r = e.eq(10);
  }
  if (t = s.d, s.s < 0 || !t || !t[0] || s.eq(1))
    return new u(t && !t[0] ? -1 / 0 : s.s != 1 ? NaN : t ? 0 : 1 / 0);
  if (r)
    if (t.length > 1)
      i = !0;
    else {
      for (a = t[0]; a % 10 === 0; ) a /= 10;
      i = a !== 1;
    }
  if ($e = !1, c = f + v, o = tt(s, c), n = r ? Un(u, c + 10) : tt(e, c), l = Ke(o, n, c, 1), tn(l.d, a = f, m))
    do
      if (c += 10, o = tt(s, c), n = r ? Un(u, c + 10) : tt(e, c), l = Ke(o, n, c, 1), !i) {
        +ur(l.d).slice(a + 1, a + 15) + 1 == 1e14 && (l = Se(l, f + 1, 0));
        break;
      }
    while (tn(l.d, a += 10, m));
  return $e = !0, Se(l, f, m);
};
pe.minus = pe.sub = function(e) {
  var r, t, n, a, i, o, c, l, s, u, f, m, v = this, p = v.constructor;
  if (e = new p(e), !v.d || !e.d)
    return !v.s || !e.s ? e = new p(NaN) : v.d ? e.s = -e.s : e = new p(e.d || v.s !== e.s ? v : NaN), e;
  if (v.s != e.s)
    return e.s = -e.s, v.plus(e);
  if (s = v.d, m = e.d, c = p.precision, l = p.rounding, !s[0] || !m[0]) {
    if (m[0]) e.s = -e.s;
    else if (s[0]) e = new p(v);
    else return new p(l === 3 ? -0 : 0);
    return $e ? Se(e, c, l) : e;
  }
  if (t = pr(e.e / _e), u = pr(v.e / _e), s = s.slice(), i = u - t, i) {
    for (f = i < 0, f ? (r = s, i = -i, o = m.length) : (r = m, t = u, o = s.length), n = Math.max(Math.ceil(c / _e), o) + 2, i > n && (i = n, r.length = 1), r.reverse(), n = i; n--; ) r.push(0);
    r.reverse();
  } else {
    for (n = s.length, o = m.length, f = n < o, f && (o = n), n = 0; n < o; n++)
      if (s[n] != m[n]) {
        f = s[n] < m[n];
        break;
      }
    i = 0;
  }
  for (f && (r = s, s = m, m = r, e.s = -e.s), o = s.length, n = m.length - o; n > 0; --n) s[o++] = 0;
  for (n = m.length; n > i; ) {
    if (s[--n] < m[n]) {
      for (a = n; a && s[--a] === 0; ) s[a] = qr - 1;
      --s[a], s[n] += qr;
    }
    s[n] -= m[n];
  }
  for (; s[--o] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --t;
  return s[0] ? (e.d = s, e.e = sa(s, t), $e ? Se(e, c, l) : e) : new p(l === 3 ? -0 : 0);
};
pe.modulo = pe.mod = function(e) {
  var r, t = this, n = t.constructor;
  return e = new n(e), !t.d || !e.s || e.d && !e.d[0] ? new n(NaN) : !e.d || t.d && !t.d[0] ? Se(new n(t), n.precision, n.rounding) : ($e = !1, n.modulo == 9 ? (r = Ke(t, e.abs(), 0, 3, 1), r.s *= e.s) : r = Ke(t, e, 0, n.modulo, 1), r = r.times(e), $e = !0, t.minus(r));
};
pe.naturalExponential = pe.exp = function() {
  return Ta(this);
};
pe.naturalLogarithm = pe.ln = function() {
  return tt(this);
};
pe.negated = pe.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s, Se(e);
};
pe.plus = pe.add = function(e) {
  var r, t, n, a, i, o, c, l, s, u, f = this, m = f.constructor;
  if (e = new m(e), !f.d || !e.d)
    return !f.s || !e.s ? e = new m(NaN) : f.d || (e = new m(e.d || f.s === e.s ? f : NaN)), e;
  if (f.s != e.s)
    return e.s = -e.s, f.minus(e);
  if (s = f.d, u = e.d, c = m.precision, l = m.rounding, !s[0] || !u[0])
    return u[0] || (e = new m(f)), $e ? Se(e, c, l) : e;
  if (i = pr(f.e / _e), n = pr(e.e / _e), s = s.slice(), a = i - n, a) {
    for (a < 0 ? (t = s, a = -a, o = u.length) : (t = u, n = i, o = s.length), i = Math.ceil(c / _e), o = i > o ? i + 1 : o + 1, a > o && (a = o, t.length = 1), t.reverse(); a--; ) t.push(0);
    t.reverse();
  }
  for (o = s.length, a = u.length, o - a < 0 && (a = o, t = u, u = s, s = t), r = 0; a; )
    r = (s[--a] = s[a] + u[a] + r) / qr | 0, s[a] %= qr;
  for (r && (s.unshift(r), ++n), o = s.length; s[--o] == 0; ) s.pop();
  return e.d = s, e.e = sa(s, n), $e ? Se(e, c, l) : e;
};
pe.precision = pe.sd = function(e) {
  var r, t = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(it + e);
  return t.d ? (r = $c(t.d), e && t.e + 1 > r && (r = t.e + 1)) : r = NaN, r;
};
pe.round = function() {
  var e = this, r = e.constructor;
  return Se(new r(e), e.e + 1, r.rounding);
};
pe.sine = pe.sin = function() {
  var e, r, t = this, n = t.constructor;
  return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + Math.max(t.e, t.sd()) + _e, n.rounding = 1, t = Hv(n, zc(n, t)), n.precision = e, n.rounding = r, Se(Vr > 2 ? t.neg() : t, e, r, !0)) : new n(NaN);
};
pe.squareRoot = pe.sqrt = function() {
  var e, r, t, n, a, i, o = this, c = o.d, l = o.e, s = o.s, u = o.constructor;
  if (s !== 1 || !c || !c[0])
    return new u(!s || s < 0 && (!c || c[0]) ? NaN : c ? o : 1 / 0);
  for ($e = !1, s = Math.sqrt(+o), s == 0 || s == 1 / 0 ? (r = ur(c), (r.length + l) % 2 == 0 && (r += "0"), s = Math.sqrt(r), l = pr((l + 1) / 2) - (l < 0 || l % 2), s == 1 / 0 ? r = "5e" + l : (r = s.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + l), n = new u(r)) : n = new u(s.toString()), t = (l = u.precision) + 3; ; )
    if (i = n, n = i.plus(Ke(o, i, t + 2, 1)).times(0.5), ur(i.d).slice(0, t) === (r = ur(n.d)).slice(0, t))
      if (r = r.slice(t - 3, t + 1), r == "9999" || !a && r == "4999") {
        if (!a && (Se(i, l + 1, 0), i.times(i).eq(o))) {
          n = i;
          break;
        }
        t += 4, a = 1;
      } else {
        (!+r || !+r.slice(1) && r.charAt(0) == "5") && (Se(n, l + 1, 1), e = !n.times(n).eq(o));
        break;
      }
  return $e = !0, Se(n, l, u.rounding, e);
};
pe.tangent = pe.tan = function() {
  var e, r, t = this, n = t.constructor;
  return t.isFinite() ? t.isZero() ? new n(t) : (e = n.precision, r = n.rounding, n.precision = e + 10, n.rounding = 1, t = t.sin(), t.s = 1, t = Ke(t, new n(1).minus(t.times(t)).sqrt(), e + 10, 0), n.precision = e, n.rounding = r, Se(Vr == 2 || Vr == 4 ? t.neg() : t, e, r, !0)) : new n(NaN);
};
pe.times = pe.mul = function(e) {
  var r, t, n, a, i, o, c, l, s, u = this, f = u.constructor, m = u.d, v = (e = new f(e)).d;
  if (e.s *= u.s, !m || !m[0] || !v || !v[0])
    return new f(!e.s || m && !m[0] && !v || v && !v[0] && !m ? NaN : !m || !v ? e.s / 0 : e.s * 0);
  for (t = pr(u.e / _e) + pr(e.e / _e), l = m.length, s = v.length, l < s && (i = m, m = v, v = i, o = l, l = s, s = o), i = [], o = l + s, n = o; n--; ) i.push(0);
  for (n = s; --n >= 0; ) {
    for (r = 0, a = l + n; a > n; )
      c = i[a] + v[n] * m[a - n - 1] + r, i[a--] = c % qr | 0, r = c / qr | 0;
    i[a] = (i[a] + r) % qr | 0;
  }
  for (; !i[--o]; ) i.pop();
  return r ? ++t : i.shift(), e.d = i, e.e = sa(i, t), $e ? Se(e, f.precision, f.rounding) : e;
};
pe.toBinary = function(e, r) {
  return Ja(this, 2, e, r);
};
pe.toDecimalPlaces = pe.toDP = function(e, r) {
  var t = this, n = t.constructor;
  return t = new n(t), e === void 0 ? t : (Dr(e, 0, ut), r === void 0 ? r = n.rounding : Dr(r, 0, 8), Se(t, e + t.e + 1, r));
};
pe.toExponential = function(e, r) {
  var t, n = this, a = n.constructor;
  return e === void 0 ? t = Lr(n, !0) : (Dr(e, 0, ut), r === void 0 ? r = a.rounding : Dr(r, 0, 8), n = Se(new a(n), e + 1, r), t = Lr(n, !0, e + 1)), n.isNeg() && !n.isZero() ? "-" + t : t;
};
pe.toFixed = function(e, r) {
  var t, n, a = this, i = a.constructor;
  return e === void 0 ? t = Lr(a) : (Dr(e, 0, ut), r === void 0 ? r = i.rounding : Dr(r, 0, 8), n = Se(new i(a), e + a.e + 1, r), t = Lr(n, !1, e + n.e + 1)), a.isNeg() && !a.isZero() ? "-" + t : t;
};
pe.toFraction = function(e) {
  var r, t, n, a, i, o, c, l, s, u, f, m, v = this, p = v.d, d = v.constructor;
  if (!p) return new d(v);
  if (s = t = new d(1), n = l = new d(0), r = new d(n), i = r.e = $c(p) - v.e - 1, o = i % _e, r.d[0] = tr(10, o < 0 ? _e + o : o), e == null)
    e = i > 0 ? r : s;
  else {
    if (c = new d(e), !c.isInt() || c.lt(s)) throw Error(it + c);
    e = c.gt(r) ? i > 0 ? r : s : c;
  }
  for ($e = !1, c = new d(ur(p)), u = d.precision, d.precision = i = p.length * _e * 2; f = Ke(c, r, 0, 1, 1), a = t.plus(f.times(n)), a.cmp(e) != 1; )
    t = n, n = a, a = s, s = l.plus(f.times(a)), l = a, a = r, r = c.minus(f.times(a)), c = a;
  return a = Ke(e.minus(t), n, 0, 1, 1), l = l.plus(a.times(s)), t = t.plus(a.times(n)), l.s = s.s = v.s, m = Ke(s, n, i, 1).minus(v).abs().cmp(Ke(l, t, i, 1).minus(v).abs()) < 1 ? [s, n] : [l, t], d.precision = u, $e = !0, m;
};
pe.toHexadecimal = pe.toHex = function(e, r) {
  return Ja(this, 16, e, r);
};
pe.toNearest = function(e, r) {
  var t = this, n = t.constructor;
  if (t = new n(t), e == null) {
    if (!t.d) return t;
    e = new n(1), r = n.rounding;
  } else {
    if (e = new n(e), r === void 0 ? r = n.rounding : Dr(r, 0, 8), !t.d) return e.s ? t : e;
    if (!e.d)
      return e.s && (e.s = t.s), e;
  }
  return e.d[0] ? ($e = !1, t = Ke(t, e, 0, r, 1).times(e), $e = !0, Se(t)) : (e.s = t.s, t = e), t;
};
pe.toNumber = function() {
  return +this;
};
pe.toOctal = function(e, r) {
  return Ja(this, 8, e, r);
};
pe.toPower = pe.pow = function(e) {
  var r, t, n, a, i, o, c = this, l = c.constructor, s = +(e = new l(e));
  if (!c.d || !e.d || !c.d[0] || !e.d[0]) return new l(tr(+c, s));
  if (c = new l(c), c.eq(1)) return c;
  if (n = l.precision, i = l.rounding, e.eq(1)) return Se(c, n, i);
  if (r = pr(e.e / _e), r >= e.d.length - 1 && (t = s < 0 ? -s : s) <= Pv)
    return a = Ic(l, c, t, n), e.s < 0 ? new l(1).div(a) : Se(a, n, i);
  if (o = c.s, o < 0) {
    if (r < e.d.length - 1) return new l(NaN);
    if (e.d[r] & 1 || (o = 1), c.e == 0 && c.d[0] == 1 && c.d.length == 1)
      return c.s = o, c;
  }
  return t = tr(+c, s), r = t == 0 || !isFinite(t) ? pr(s * (Math.log("0." + ur(c.d)) / Math.LN10 + c.e + 1)) : new l(t + "").e, r > l.maxE + 1 || r < l.minE - 1 ? new l(r > 0 ? o / 0 : 0) : ($e = !1, l.rounding = c.s = 1, t = Math.min(12, (r + "").length), a = Ta(e.times(tt(c, n + t)), n), a.d && (a = Se(a, n + 5, 1), tn(a.d, n, i) && (r = n + 10, a = Se(Ta(e.times(tt(c, r + t)), r), r + 5, 1), +ur(a.d).slice(n + 1, n + 15) + 1 == 1e14 && (a = Se(a, n + 1, 0)))), a.s = o, $e = !0, l.rounding = i, Se(a, n, i));
};
pe.toPrecision = function(e, r) {
  var t, n = this, a = n.constructor;
  return e === void 0 ? t = Lr(n, n.e <= a.toExpNeg || n.e >= a.toExpPos) : (Dr(e, 1, ut), r === void 0 ? r = a.rounding : Dr(r, 0, 8), n = Se(new a(n), e, r), t = Lr(n, e <= n.e || n.e <= a.toExpNeg, e)), n.isNeg() && !n.isZero() ? "-" + t : t;
};
pe.toSignificantDigits = pe.toSD = function(e, r) {
  var t = this, n = t.constructor;
  return e === void 0 ? (e = n.precision, r = n.rounding) : (Dr(e, 1, ut), r === void 0 ? r = n.rounding : Dr(r, 0, 8)), Se(new n(t), e, r);
};
pe.toString = function() {
  var e = this, r = e.constructor, t = Lr(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
  return e.isNeg() && !e.isZero() ? "-" + t : t;
};
pe.truncated = pe.trunc = function() {
  return Se(new this.constructor(this), this.e + 1, 1);
};
pe.valueOf = pe.toJSON = function() {
  var e = this, r = e.constructor, t = Lr(e, e.e <= r.toExpNeg || e.e >= r.toExpPos);
  return e.isNeg() ? "-" + t : t;
};
function ur(e) {
  var r, t, n, a = e.length - 1, i = "", o = e[0];
  if (a > 0) {
    for (i += o, r = 1; r < a; r++)
      n = e[r] + "", t = _e - n.length, t && (i += Kr(t)), i += n;
    o = e[r], n = o + "", t = _e - n.length, t && (i += Kr(t));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return i + o;
}
function Dr(e, r, t) {
  if (e !== ~~e || e < r || e > t)
    throw Error(it + e);
}
function tn(e, r, t, n) {
  var a, i, o, c;
  for (i = e[0]; i >= 10; i /= 10) --r;
  return --r < 0 ? (r += _e, a = 0) : (a = Math.ceil((r + 1) / _e), r %= _e), i = tr(10, _e - r), c = e[a] % i | 0, n == null ? r < 3 ? (r == 0 ? c = c / 100 | 0 : r == 1 && (c = c / 10 | 0), o = t < 4 && c == 99999 || t > 3 && c == 49999 || c == 5e4 || c == 0) : o = (t < 4 && c + 1 == i || t > 3 && c + 1 == i / 2) && (e[a + 1] / i / 100 | 0) == tr(10, r - 2) - 1 || (c == i / 2 || c == 0) && (e[a + 1] / i / 100 | 0) == 0 : r < 4 ? (r == 0 ? c = c / 1e3 | 0 : r == 1 ? c = c / 100 | 0 : r == 2 && (c = c / 10 | 0), o = (n || t < 4) && c == 9999 || !n && t > 3 && c == 4999) : o = ((n || t < 4) && c + 1 == i || !n && t > 3 && c + 1 == i / 2) && (e[a + 1] / i / 1e3 | 0) == tr(10, r - 3) - 1, o;
}
function $n(e, r, t) {
  for (var n, a = [0], i, o = 0, c = e.length; o < c; ) {
    for (i = a.length; i--; ) a[i] *= r;
    for (a[0] += Ma.indexOf(e.charAt(o++)), n = 0; n < a.length; n++)
      a[n] > t - 1 && (a[n + 1] === void 0 && (a[n + 1] = 0), a[n + 1] += a[n] / t | 0, a[n] %= t);
  }
  return a.reverse();
}
function Lv(e, r) {
  var t, n, a;
  if (r.isZero()) return r;
  n = r.d.length, n < 32 ? (t = Math.ceil(n / 3), a = (1 / ua(4, t)).toString()) : (t = 16, a = "2.3283064365386962890625e-10"), e.precision += t, r = Ot(e, 1, r.times(a), new e(1));
  for (var i = t; i--; ) {
    var o = r.times(r);
    r = o.times(o).minus(o).times(8).plus(1);
  }
  return e.precision -= t, r;
}
var Ke = /* @__PURE__ */ function() {
  function e(n, a, i) {
    var o, c = 0, l = n.length;
    for (n = n.slice(); l--; )
      o = n[l] * a + c, n[l] = o % i | 0, c = o / i | 0;
    return c && n.unshift(c), n;
  }
  function r(n, a, i, o) {
    var c, l;
    if (i != o)
      l = i > o ? 1 : -1;
    else
      for (c = l = 0; c < i; c++)
        if (n[c] != a[c]) {
          l = n[c] > a[c] ? 1 : -1;
          break;
        }
    return l;
  }
  function t(n, a, i, o) {
    for (var c = 0; i--; )
      n[i] -= c, c = n[i] < a[i] ? 1 : 0, n[i] = c * o + n[i] - a[i];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, a, i, o, c, l) {
    var s, u, f, m, v, p, d, b, x, D, h, w, y, g, A, E, N, S, C, T, O = n.constructor, I = n.s == a.s ? 1 : -1, $ = n.d, F = a.d;
    if (!$ || !$[0] || !F || !F[0])
      return new O(
        // Return NaN if either NaN, or both Infinity or 0.
        !n.s || !a.s || ($ ? F && $[0] == F[0] : !F) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          $ && $[0] == 0 || !F ? I * 0 : I / 0
        )
      );
    for (l ? (v = 1, u = n.e - a.e) : (l = qr, v = _e, u = pr(n.e / v) - pr(a.e / v)), C = F.length, N = $.length, x = new O(I), D = x.d = [], f = 0; F[f] == ($[f] || 0); f++) ;
    if (F[f] > ($[f] || 0) && u--, i == null ? (g = i = O.precision, o = O.rounding) : c ? g = i + (n.e - a.e) + 1 : g = i, g < 0)
      D.push(1), p = !0;
    else {
      if (g = g / v + 2 | 0, f = 0, C == 1) {
        for (m = 0, F = F[0], g++; (f < N || m) && g--; f++)
          A = m * l + ($[f] || 0), D[f] = A / F | 0, m = A % F | 0;
        p = m || f < N;
      } else {
        for (m = l / (F[0] + 1) | 0, m > 1 && (F = e(F, m, l), $ = e($, m, l), C = F.length, N = $.length), E = C, h = $.slice(0, C), w = h.length; w < C; ) h[w++] = 0;
        T = F.slice(), T.unshift(0), S = F[0], F[1] >= l / 2 && ++S;
        do
          m = 0, s = r(F, h, C, w), s < 0 ? (y = h[0], C != w && (y = y * l + (h[1] || 0)), m = y / S | 0, m > 1 ? (m >= l && (m = l - 1), d = e(F, m, l), b = d.length, w = h.length, s = r(d, h, b, w), s == 1 && (m--, t(d, C < b ? T : F, b, l))) : (m == 0 && (s = m = 1), d = F.slice()), b = d.length, b < w && d.unshift(0), t(h, d, w, l), s == -1 && (w = h.length, s = r(F, h, C, w), s < 1 && (m++, t(h, C < w ? T : F, w, l))), w = h.length) : s === 0 && (m++, h = [0]), D[f++] = m, s && h[0] ? h[w++] = $[E] || 0 : (h = [$[E]], w = 1);
        while ((E++ < N || h[0] !== void 0) && g--);
        p = h[0] !== void 0;
      }
      D[0] || D.shift();
    }
    if (v == 1)
      x.e = u, _c = p;
    else {
      for (f = 1, m = D[0]; m >= 10; m /= 10) f++;
      x.e = f + u * v - 1, Se(x, c ? i + x.e + 1 : i, o, p);
    }
    return x;
  };
}();
function Se(e, r, t, n) {
  var a, i, o, c, l, s, u, f, m, v = e.constructor;
  e: if (r != null) {
    if (f = e.d, !f) return e;
    for (a = 1, c = f[0]; c >= 10; c /= 10) a++;
    if (i = r - a, i < 0)
      i += _e, o = r, u = f[m = 0], l = u / tr(10, a - o - 1) % 10 | 0;
    else if (m = Math.ceil((i + 1) / _e), c = f.length, m >= c)
      if (n) {
        for (; c++ <= m; ) f.push(0);
        u = l = 0, a = 1, i %= _e, o = i - _e + 1;
      } else
        break e;
    else {
      for (u = c = f[m], a = 1; c >= 10; c /= 10) a++;
      i %= _e, o = i - _e + a, l = o < 0 ? 0 : u / tr(10, a - o - 1) % 10 | 0;
    }
    if (n = n || r < 0 || f[m + 1] !== void 0 || (o < 0 ? u : u % tr(10, a - o - 1)), s = t < 4 ? (l || n) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (t == 4 || n || t == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? o > 0 ? u / tr(10, a - o) : 0 : f[m - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), r < 1 || !f[0])
      return f.length = 0, s ? (r -= e.e + 1, f[0] = tr(10, (_e - r % _e) % _e), e.e = -r || 0) : f[0] = e.e = 0, e;
    if (i == 0 ? (f.length = m, c = 1, m--) : (f.length = m + 1, c = tr(10, _e - i), f[m] = o > 0 ? (u / tr(10, a - o) % tr(10, o) | 0) * c : 0), s)
      for (; ; )
        if (m == 0) {
          for (i = 1, o = f[0]; o >= 10; o /= 10) i++;
          for (o = f[0] += c, c = 1; o >= 10; o /= 10) c++;
          i != c && (e.e++, f[0] == qr && (f[0] = 1));
          break;
        } else {
          if (f[m] += c, f[m] != qr) break;
          f[m--] = 0, c = 1;
        }
    for (i = f.length; f[--i] === 0; ) f.pop();
  }
  return $e && (e.e > v.maxE ? (e.d = null, e.e = NaN) : e.e < v.minE && (e.e = 0, e.d = [0])), e;
}
function Lr(e, r, t) {
  if (!e.isFinite()) return Rc(e);
  var n, a = e.e, i = ur(e.d), o = i.length;
  return r ? (t && (n = t - o) > 0 ? i = i.charAt(0) + "." + i.slice(1) + Kr(n) : o > 1 && (i = i.charAt(0) + "." + i.slice(1)), i = i + (e.e < 0 ? "e" : "e+") + e.e) : a < 0 ? (i = "0." + Kr(-a - 1) + i, t && (n = t - o) > 0 && (i += Kr(n))) : a >= o ? (i += Kr(a + 1 - o), t && (n = t - a - 1) > 0 && (i = i + "." + Kr(n))) : ((n = a + 1) < o && (i = i.slice(0, n) + "." + i.slice(n)), t && (n = t - o) > 0 && (a + 1 === o && (i += "."), i += Kr(n))), i;
}
function sa(e, r) {
  var t = e[0];
  for (r *= _e; t >= 10; t /= 10) r++;
  return r;
}
function Un(e, r, t) {
  if (r > Uv)
    throw $e = !0, t && (e.precision = t), Error(Fc);
  return Se(new e(zn), r, 1, !0);
}
function $r(e, r, t) {
  if (r > Fa) throw Error(Fc);
  return Se(new e(Pn), r, t, !0);
}
function $c(e) {
  var r = e.length - 1, t = r * _e + 1;
  if (r = e[r], r) {
    for (; r % 10 == 0; r /= 10) t--;
    for (r = e[0]; r >= 10; r /= 10) t++;
  }
  return t;
}
function Kr(e) {
  for (var r = ""; e--; ) r += "0";
  return r;
}
function Ic(e, r, t, n) {
  var a, i = new e(1), o = Math.ceil(n / _e + 4);
  for ($e = !1; ; ) {
    if (t % 2 && (i = i.times(r), Ii(i.d, o) && (a = !0)), t = pr(t / 2), t === 0) {
      t = i.d.length - 1, a && i.d[t] === 0 && ++i.d[t];
      break;
    }
    r = r.times(r), Ii(r.d, o);
  }
  return $e = !0, i;
}
function $i(e) {
  return e.d[e.d.length - 1] & 1;
}
function qc(e, r, t) {
  for (var n, a = new e(r[0]), i = 0; ++i < r.length; )
    if (n = new e(r[i]), n.s)
      a[t](n) && (a = n);
    else {
      a = n;
      break;
    }
  return a;
}
function Ta(e, r) {
  var t, n, a, i, o, c, l, s = 0, u = 0, f = 0, m = e.constructor, v = m.rounding, p = m.precision;
  if (!e.d || !e.d[0] || e.e > 17)
    return new m(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
  for (r == null ? ($e = !1, l = p) : l = r, c = new m(0.03125); e.e > -2; )
    e = e.times(c), f += 5;
  for (n = Math.log(tr(2, f)) / Math.LN10 * 2 + 5 | 0, l += n, t = i = o = new m(1), m.precision = l; ; ) {
    if (i = Se(i.times(e), l, 1), t = t.times(++u), c = o.plus(Ke(i, t, l, 1)), ur(c.d).slice(0, l) === ur(o.d).slice(0, l)) {
      for (a = f; a--; ) o = Se(o.times(o), l, 1);
      if (r == null)
        if (s < 3 && tn(o.d, l - n, v, s))
          m.precision = l += 10, t = i = c = new m(1), u = 0, s++;
        else
          return Se(o, m.precision = p, v, $e = !0);
      else
        return m.precision = p, o;
    }
    o = c;
  }
}
function tt(e, r) {
  var t, n, a, i, o, c, l, s, u, f, m, v = 1, p = 10, d = e, b = d.d, x = d.constructor, D = x.rounding, h = x.precision;
  if (d.s < 0 || !b || !b[0] || !d.e && b[0] == 1 && b.length == 1)
    return new x(b && !b[0] ? -1 / 0 : d.s != 1 ? NaN : b ? 0 : d);
  if (r == null ? ($e = !1, u = h) : u = r, x.precision = u += p, t = ur(b), n = t.charAt(0), Math.abs(i = d.e) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && t.charAt(1) > 3; )
      d = d.times(e), t = ur(d.d), n = t.charAt(0), v++;
    i = d.e, n > 1 ? (d = new x("0." + t), i++) : d = new x(n + "." + t.slice(1));
  } else
    return s = Un(x, u + 2, h).times(i + ""), d = tt(new x(n + "." + t.slice(1)), u - p).plus(s), x.precision = h, r == null ? Se(d, h, D, $e = !0) : d;
  for (f = d, l = o = d = Ke(d.minus(1), d.plus(1), u, 1), m = Se(d.times(d), u, 1), a = 3; ; ) {
    if (o = Se(o.times(m), u, 1), s = l.plus(Ke(o, new x(a), u, 1)), ur(s.d).slice(0, u) === ur(l.d).slice(0, u))
      if (l = l.times(2), i !== 0 && (l = l.plus(Un(x, u + 2, h).times(i + ""))), l = Ke(l, new x(v), u, 1), r == null)
        if (tn(l.d, u - p, D, c))
          x.precision = u += p, s = o = d = Ke(f.minus(1), f.plus(1), u, 1), m = Se(d.times(d), u, 1), a = c = 1;
        else
          return Se(l, x.precision = h, D, $e = !0);
      else
        return x.precision = h, l;
    l = s, a += 2;
  }
}
function Rc(e) {
  return String(e.s * e.s / 0);
}
function Ba(e, r) {
  var t, n, a;
  for ((t = r.indexOf(".")) > -1 && (r = r.replace(".", "")), (n = r.search(/e/i)) > 0 ? (t < 0 && (t = n), t += +r.slice(n + 1), r = r.substring(0, n)) : t < 0 && (t = r.length), n = 0; r.charCodeAt(n) === 48; n++) ;
  for (a = r.length; r.charCodeAt(a - 1) === 48; --a) ;
  if (r = r.slice(n, a), r) {
    if (a -= n, e.e = t = t - n - 1, e.d = [], n = (t + 1) % _e, t < 0 && (n += _e), n < a) {
      for (n && e.d.push(+r.slice(0, n)), a -= _e; n < a; ) e.d.push(+r.slice(n, n += _e));
      r = r.slice(n), n = _e - r.length;
    } else
      n -= a;
    for (; n--; ) r += "0";
    e.d.push(+r), $e && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
  } else
    e.e = 0, e.d = [0];
  return e;
}
function kv(e, r) {
  var t, n, a, i, o, c, l, s, u;
  if (r.indexOf("_") > -1) {
    if (r = r.replace(/(\d)_(?=\d)/g, "$1"), Oc.test(r)) return Ba(e, r);
  } else if (r === "Infinity" || r === "NaN")
    return +r || (e.s = NaN), e.e = NaN, e.d = null, e;
  if (Rv.test(r))
    t = 16, r = r.toLowerCase();
  else if (qv.test(r))
    t = 2;
  else if (zv.test(r))
    t = 8;
  else
    throw Error(it + r);
  for (i = r.search(/p/i), i > 0 ? (l = +r.slice(i + 1), r = r.substring(2, i)) : r = r.slice(2), i = r.indexOf("."), o = i >= 0, n = e.constructor, o && (r = r.replace(".", ""), c = r.length, i = c - i, a = Ic(n, new n(t), i, i * 2)), s = $n(r, t, qr), u = s.length - 1, i = u; s[i] === 0; --i) s.pop();
  return i < 0 ? new n(e.s * 0) : (e.e = sa(s, u), e.d = s, $e = !1, o && (e = Ke(e, a, c * 4)), l && (e = e.times(Math.abs(l) < 54 ? tr(2, l) : ot.pow(2, l))), $e = !0, e);
}
function Hv(e, r) {
  var t, n = r.d.length;
  if (n < 3)
    return r.isZero() ? r : Ot(e, 2, r, r);
  t = 1.4 * Math.sqrt(n), t = t > 16 ? 16 : t | 0, r = r.times(1 / ua(5, t)), r = Ot(e, 2, r, r);
  for (var a, i = new e(5), o = new e(16), c = new e(20); t--; )
    a = r.times(r), r = r.times(i.plus(a.times(o.times(a).minus(c))));
  return r;
}
function Ot(e, r, t, n, a) {
  var i, o, c, l, s = e.precision, u = Math.ceil(s / _e);
  for ($e = !1, l = t.times(t), c = new e(n); ; ) {
    if (o = Ke(c.times(l), new e(r++ * r++), s, 1), c = a ? n.plus(o) : n.minus(o), n = Ke(o.times(l), new e(r++ * r++), s, 1), o = c.plus(n), o.d[u] !== void 0) {
      for (i = u; o.d[i] === c.d[i] && i--; ) ;
      if (i == -1) break;
    }
    i = c, c = n, n = o, o = i;
  }
  return $e = !0, o.d.length = u + 1, o;
}
function ua(e, r) {
  for (var t = e; --r; ) t *= e;
  return t;
}
function zc(e, r) {
  var t, n = r.s < 0, a = $r(e, e.precision, 1), i = a.times(0.5);
  if (r = r.abs(), r.lte(i))
    return Vr = n ? 4 : 1, r;
  if (t = r.divToInt(a), t.isZero())
    Vr = n ? 3 : 2;
  else {
    if (r = r.minus(t.times(a)), r.lte(i))
      return Vr = $i(t) ? n ? 2 : 3 : n ? 4 : 1, r;
    Vr = $i(t) ? n ? 1 : 4 : n ? 3 : 2;
  }
  return r.minus(a).abs();
}
function Ja(e, r, t, n) {
  var a, i, o, c, l, s, u, f, m, v = e.constructor, p = t !== void 0;
  if (p ? (Dr(t, 1, ut), n === void 0 ? n = v.rounding : Dr(n, 0, 8)) : (t = v.precision, n = v.rounding), !e.isFinite())
    u = Rc(e);
  else {
    for (u = Lr(e), o = u.indexOf("."), p ? (a = 2, r == 16 ? t = t * 4 - 3 : r == 8 && (t = t * 3 - 2)) : a = r, o >= 0 && (u = u.replace(".", ""), m = new v(1), m.e = u.length - o, m.d = $n(Lr(m), 10, a), m.e = m.d.length), f = $n(u, 10, a), i = l = f.length; f[--l] == 0; ) f.pop();
    if (!f[0])
      u = p ? "0p+0" : "0";
    else {
      if (o < 0 ? i-- : (e = new v(e), e.d = f, e.e = i, e = Ke(e, m, t, n, 0, a), f = e.d, i = e.e, s = _c), o = f[t], c = a / 2, s = s || f[t + 1] !== void 0, s = n < 4 ? (o !== void 0 || s) && (n === 0 || n === (e.s < 0 ? 3 : 2)) : o > c || o === c && (n === 4 || s || n === 6 && f[t - 1] & 1 || n === (e.s < 0 ? 8 : 7)), f.length = t, s)
        for (; ++f[--t] > a - 1; )
          f[t] = 0, t || (++i, f.unshift(1));
      for (l = f.length; !f[l - 1]; --l) ;
      for (o = 0, u = ""; o < l; o++) u += Ma.charAt(f[o]);
      if (p) {
        if (l > 1)
          if (r == 16 || r == 8) {
            for (o = r == 16 ? 4 : 3, --l; l % o; l++) u += "0";
            for (f = $n(u, a, r), l = f.length; !f[l - 1]; --l) ;
            for (o = 1, u = "1."; o < l; o++) u += Ma.charAt(f[o]);
          } else
            u = u.charAt(0) + "." + u.slice(1);
        u = u + (i < 0 ? "p" : "p+") + i;
      } else if (i < 0) {
        for (; ++i; ) u = "0" + u;
        u = "0." + u;
      } else if (++i > l) for (i -= l; i--; ) u += "0";
      else i < l && (u = u.slice(0, i) + "." + u.slice(i));
    }
    u = (r == 16 ? "0x" : r == 2 ? "0b" : r == 8 ? "0o" : "") + u;
  }
  return e.s < 0 ? "-" + u : u;
}
function Ii(e, r) {
  if (e.length > r)
    return e.length = r, !0;
}
function Gv(e) {
  return new this(e).abs();
}
function Zv(e) {
  return new this(e).acos();
}
function Vv(e) {
  return new this(e).acosh();
}
function Wv(e, r) {
  return new this(e).plus(r);
}
function Yv(e) {
  return new this(e).asin();
}
function Xv(e) {
  return new this(e).asinh();
}
function Jv(e) {
  return new this(e).atan();
}
function Qv(e) {
  return new this(e).atanh();
}
function Kv(e, r) {
  e = new this(e), r = new this(r);
  var t, n = this.precision, a = this.rounding, i = n + 4;
  return !e.s || !r.s ? t = new this(NaN) : !e.d && !r.d ? (t = $r(this, i, 1).times(r.s > 0 ? 0.25 : 0.75), t.s = e.s) : !r.d || e.isZero() ? (t = r.s < 0 ? $r(this, n, a) : new this(0), t.s = e.s) : !e.d || r.isZero() ? (t = $r(this, i, 1).times(0.5), t.s = e.s) : r.s < 0 ? (this.precision = i, this.rounding = 1, t = this.atan(Ke(e, r, i, 1)), r = $r(this, i, 1), this.precision = n, this.rounding = a, t = e.s < 0 ? t.minus(r) : t.plus(r)) : t = this.atan(Ke(e, r, i, 1)), t;
}
function jv(e) {
  return new this(e).cbrt();
}
function ep(e) {
  return Se(e = new this(e), e.e + 1, 2);
}
function rp(e, r, t) {
  return new this(e).clamp(r, t);
}
function tp(e) {
  if (!e || typeof e != "object") throw Error(oa + "Object expected");
  var r, t, n, a = e.defaults === !0, i = [
    "precision",
    1,
    ut,
    "rounding",
    0,
    8,
    "toExpNeg",
    -St,
    0,
    "toExpPos",
    0,
    St,
    "maxE",
    0,
    St,
    "minE",
    -St,
    0,
    "modulo",
    0,
    9
  ];
  for (r = 0; r < i.length; r += 3)
    if (t = i[r], a && (this[t] = _a[t]), (n = e[t]) !== void 0)
      if (pr(n) === n && n >= i[r + 1] && n <= i[r + 2]) this[t] = n;
      else throw Error(it + t + ": " + n);
  if (t = "crypto", a && (this[t] = _a[t]), (n = e[t]) !== void 0)
    if (n === !0 || n === !1 || n === 0 || n === 1)
      if (n)
        if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
          this[t] = !0;
        else
          throw Error(Tc);
      else
        this[t] = !1;
    else
      throw Error(it + t + ": " + n);
  return this;
}
function np(e) {
  return new this(e).cos();
}
function ap(e) {
  return new this(e).cosh();
}
function Pc(e) {
  var r, t, n;
  function a(i) {
    var o, c, l, s = this;
    if (!(s instanceof a)) return new a(i);
    if (s.constructor = a, qi(i)) {
      s.s = i.s, $e ? !i.d || i.e > a.maxE ? (s.e = NaN, s.d = null) : i.e < a.minE ? (s.e = 0, s.d = [0]) : (s.e = i.e, s.d = i.d.slice()) : (s.e = i.e, s.d = i.d ? i.d.slice() : i.d);
      return;
    }
    if (l = typeof i, l === "number") {
      if (i === 0) {
        s.s = 1 / i < 0 ? -1 : 1, s.e = 0, s.d = [0];
        return;
      }
      if (i < 0 ? (i = -i, s.s = -1) : s.s = 1, i === ~~i && i < 1e7) {
        for (o = 0, c = i; c >= 10; c /= 10) o++;
        $e ? o > a.maxE ? (s.e = NaN, s.d = null) : o < a.minE ? (s.e = 0, s.d = [0]) : (s.e = o, s.d = [i]) : (s.e = o, s.d = [i]);
        return;
      } else if (i * 0 !== 0) {
        i || (s.s = NaN), s.e = NaN, s.d = null;
        return;
      }
      return Ba(s, i.toString());
    } else if (l !== "string")
      throw Error(it + i);
    return (c = i.charCodeAt(0)) === 45 ? (i = i.slice(1), s.s = -1) : (c === 43 && (i = i.slice(1)), s.s = 1), Oc.test(i) ? Ba(s, i) : kv(s, i);
  }
  if (a.prototype = pe, a.ROUND_UP = 0, a.ROUND_DOWN = 1, a.ROUND_CEIL = 2, a.ROUND_FLOOR = 3, a.ROUND_HALF_UP = 4, a.ROUND_HALF_DOWN = 5, a.ROUND_HALF_EVEN = 6, a.ROUND_HALF_CEIL = 7, a.ROUND_HALF_FLOOR = 8, a.EUCLID = 9, a.config = a.set = tp, a.clone = Pc, a.isDecimal = qi, a.abs = Gv, a.acos = Zv, a.acosh = Vv, a.add = Wv, a.asin = Yv, a.asinh = Xv, a.atan = Jv, a.atanh = Qv, a.atan2 = Kv, a.cbrt = jv, a.ceil = ep, a.clamp = rp, a.cos = np, a.cosh = ap, a.div = ip, a.exp = op, a.floor = sp, a.hypot = up, a.ln = lp, a.log = cp, a.log10 = mp, a.log2 = fp, a.max = vp, a.min = pp, a.mod = dp, a.mul = hp, a.pow = gp, a.random = yp, a.round = bp, a.sign = xp, a.sin = wp, a.sinh = Dp, a.sqrt = Np, a.sub = Ap, a.sum = Ep, a.tan = Sp, a.tanh = Cp, a.trunc = Mp, e === void 0 && (e = {}), e && e.defaults !== !0)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], r = 0; r < n.length; ) e.hasOwnProperty(t = n[r++]) || (e[t] = this[t]);
  return a.config(e), a;
}
function ip(e, r) {
  return new this(e).div(r);
}
function op(e) {
  return new this(e).exp();
}
function sp(e) {
  return Se(e = new this(e), e.e + 1, 3);
}
function up() {
  var e, r, t = new this(0);
  for ($e = !1, e = 0; e < arguments.length; )
    if (r = new this(arguments[e++]), r.d)
      t.d && (t = t.plus(r.times(r)));
    else {
      if (r.s)
        return $e = !0, new this(1 / 0);
      t = r;
    }
  return $e = !0, t.sqrt();
}
function qi(e) {
  return e instanceof ot || e && e.toStringTag === Bc || !1;
}
function lp(e) {
  return new this(e).ln();
}
function cp(e, r) {
  return new this(e).log(r);
}
function fp(e) {
  return new this(e).log(2);
}
function mp(e) {
  return new this(e).log(10);
}
function vp() {
  return qc(this, arguments, "lt");
}
function pp() {
  return qc(this, arguments, "gt");
}
function dp(e, r) {
  return new this(e).mod(r);
}
function hp(e, r) {
  return new this(e).mul(r);
}
function gp(e, r) {
  return new this(e).pow(r);
}
function yp(e) {
  var r, t, n, a, i = 0, o = new this(1), c = [];
  if (e === void 0 ? e = this.precision : Dr(e, 1, ut), n = Math.ceil(e / _e), this.crypto)
    if (crypto.getRandomValues)
      for (r = crypto.getRandomValues(new Uint32Array(n)); i < n; )
        a = r[i], a >= 429e7 ? r[i] = crypto.getRandomValues(new Uint32Array(1))[0] : c[i++] = a % 1e7;
    else if (crypto.randomBytes) {
      for (r = crypto.randomBytes(n *= 4); i < n; )
        a = r[i] + (r[i + 1] << 8) + (r[i + 2] << 16) + ((r[i + 3] & 127) << 24), a >= 214e7 ? crypto.randomBytes(4).copy(r, i) : (c.push(a % 1e7), i += 4);
      i = n / 4;
    } else
      throw Error(Tc);
  else for (; i < n; ) c[i++] = Math.random() * 1e7 | 0;
  for (n = c[--i], e %= _e, n && e && (a = tr(10, _e - e), c[i] = (n / a | 0) * a); c[i] === 0; i--) c.pop();
  if (i < 0)
    t = 0, c = [0];
  else {
    for (t = -1; c[0] === 0; t -= _e) c.shift();
    for (n = 1, a = c[0]; a >= 10; a /= 10) n++;
    n < _e && (t -= _e - n);
  }
  return o.e = t, o.d = c, o;
}
function bp(e) {
  return Se(e = new this(e), e.e + 1, this.rounding);
}
function xp(e) {
  return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
}
function wp(e) {
  return new this(e).sin();
}
function Dp(e) {
  return new this(e).sinh();
}
function Np(e) {
  return new this(e).sqrt();
}
function Ap(e, r) {
  return new this(e).sub(r);
}
function Ep() {
  var e = 0, r = arguments, t = new this(r[e]);
  for ($e = !1; t.s && ++e < r.length; ) t = t.plus(r[e]);
  return $e = !0, Se(t, this.precision, this.rounding);
}
function Sp(e) {
  return new this(e).tan();
}
function Cp(e) {
  return new this(e).tanh();
}
function Mp(e) {
  return Se(e = new this(e), e.e + 1, 1);
}
pe[Symbol.for("nodejs.util.inspect.custom")] = pe.toString;
pe[Symbol.toStringTag] = "Decimal";
var ot = pe.constructor = Pc(_a);
zn = new ot(zn);
Pn = new ot(Pn);
var _p = "BigNumber", Fp = ["?on", "config"], Tp = /* @__PURE__ */ q(_p, Fp, (e) => {
  var {
    on: r,
    config: t
  } = e, n = ot.clone({
    precision: t.precision,
    modulo: ot.EUCLID
  });
  return n.prototype = Object.create(n.prototype), n.prototype.type = "BigNumber", n.prototype.isBigNumber = !0, n.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  }, n.fromJSON = function(a) {
    return new n(a.value);
  }, r && r("config", function(a, i) {
    a.precision !== i.precision && n.config({
      precision: a.precision
    });
  }), n;
}, {
  isClass: !0
}), fr = Math.cosh || function(e) {
  return Math.abs(e) < 1e-9 ? 1 - e : (Math.exp(e) + Math.exp(-e)) * 0.5;
}, Fr = Math.sinh || function(e) {
  return Math.abs(e) < 1e-9 ? e : (Math.exp(e) - Math.exp(-e)) * 0.5;
}, Bp = function(e) {
  var r = Math.PI / 4;
  if (-r > e || e > r)
    return Math.cos(e) - 1;
  var t = e * e;
  return t * (t * (t * (t * (t * (t * (t * (t / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
}, Op = function(e, r) {
  var t = Math.abs(e), n = Math.abs(r);
  return t < 3e3 && n < 3e3 ? Math.sqrt(t * t + n * n) : (t < n ? (t = n, n = e / r) : n = r / e, t * Math.sqrt(1 + n * n));
}, Dt = function() {
  throw SyntaxError("Invalid Param");
};
function ba(e, r) {
  var t = Math.abs(e), n = Math.abs(r);
  return e === 0 ? Math.log(n) : r === 0 ? Math.log(t) : t < 3e3 && n < 3e3 ? Math.log(e * e + r * r) * 0.5 : (e = e / 2, r = r / 2, 0.5 * Math.log(e * e + r * r) + Math.LN2);
}
var $p = function(e, r) {
  var t = { re: 0, im: 0 };
  if (e == null)
    t.re = t.im = 0;
  else if (r !== void 0)
    t.re = e, t.im = r;
  else
    switch (typeof e) {
      case "object":
        if ("im" in e && "re" in e)
          t.re = e.re, t.im = e.im;
        else if ("abs" in e && "arg" in e) {
          if (!Number.isFinite(e.abs) && Number.isFinite(e.arg))
            return ve.INFINITY;
          t.re = e.abs * Math.cos(e.arg), t.im = e.abs * Math.sin(e.arg);
        } else if ("r" in e && "phi" in e) {
          if (!Number.isFinite(e.r) && Number.isFinite(e.phi))
            return ve.INFINITY;
          t.re = e.r * Math.cos(e.phi), t.im = e.r * Math.sin(e.phi);
        } else e.length === 2 ? (t.re = e[0], t.im = e[1]) : Dt();
        break;
      case "string":
        t.im = /* void */
        t.re = 0;
        var n = e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g), a = 1, i = 0;
        n === null && Dt();
        for (var o = 0; o < n.length; o++) {
          var c = n[o];
          c === " " || c === "	" || c === `
` || (c === "+" ? a++ : c === "-" ? i++ : c === "i" || c === "I" ? (a + i === 0 && Dt(), n[o + 1] !== " " && !isNaN(n[o + 1]) ? (t.im += parseFloat((i % 2 ? "-" : "") + n[o + 1]), o++) : t.im += parseFloat((i % 2 ? "-" : "") + "1"), a = i = 0) : ((a + i === 0 || isNaN(c)) && Dt(), n[o + 1] === "i" || n[o + 1] === "I" ? (t.im += parseFloat((i % 2 ? "-" : "") + c), o++) : t.re += parseFloat((i % 2 ? "-" : "") + c), a = i = 0));
        }
        a + i > 0 && Dt();
        break;
      case "number":
        t.im = 0, t.re = e;
        break;
      default:
        Dt();
    }
  return isNaN(t.re) || isNaN(t.im), t;
};
function ve(e, r) {
  if (!(this instanceof ve))
    return new ve(e, r);
  var t = $p(e, r);
  this.re = t.re, this.im = t.im;
}
ve.prototype = {
  re: 0,
  im: 0,
  /**
   * Calculates the sign of a complex number, which is a normalized complex
   *
   * @returns {Complex}
   */
  sign: function() {
    var e = this.abs();
    return new ve(
      this.re / e,
      this.im / e
    );
  },
  /**
   * Adds two complex numbers
   *
   * @returns {Complex}
   */
  add: function(e, r) {
    var t = new ve(e, r);
    return this.isInfinite() && t.isInfinite() ? ve.NAN : this.isInfinite() || t.isInfinite() ? ve.INFINITY : new ve(
      this.re + t.re,
      this.im + t.im
    );
  },
  /**
   * Subtracts two complex numbers
   *
   * @returns {Complex}
   */
  sub: function(e, r) {
    var t = new ve(e, r);
    return this.isInfinite() && t.isInfinite() ? ve.NAN : this.isInfinite() || t.isInfinite() ? ve.INFINITY : new ve(
      this.re - t.re,
      this.im - t.im
    );
  },
  /**
   * Multiplies two complex numbers
   *
   * @returns {Complex}
   */
  mul: function(e, r) {
    var t = new ve(e, r);
    return this.isInfinite() && t.isZero() || this.isZero() && t.isInfinite() ? ve.NAN : this.isInfinite() || t.isInfinite() ? ve.INFINITY : t.im === 0 && this.im === 0 ? new ve(this.re * t.re, 0) : new ve(
      this.re * t.re - this.im * t.im,
      this.re * t.im + this.im * t.re
    );
  },
  /**
   * Divides two complex numbers
   *
   * @returns {Complex}
   */
  div: function(e, r) {
    var t = new ve(e, r);
    if (this.isZero() && t.isZero() || this.isInfinite() && t.isInfinite())
      return ve.NAN;
    if (this.isInfinite() || t.isZero())
      return ve.INFINITY;
    if (this.isZero() || t.isInfinite())
      return ve.ZERO;
    e = this.re, r = this.im;
    var n = t.re, a = t.im, i, o;
    return a === 0 ? new ve(e / n, r / n) : Math.abs(n) < Math.abs(a) ? (o = n / a, i = n * o + a, new ve(
      (e * o + r) / i,
      (r * o - e) / i
    )) : (o = a / n, i = a * o + n, new ve(
      (e + r * o) / i,
      (r - e * o) / i
    ));
  },
  /**
   * Calculate the power of two complex numbers
   *
   * @returns {Complex}
   */
  pow: function(e, r) {
    var t = new ve(e, r);
    if (e = this.re, r = this.im, t.isZero())
      return ve.ONE;
    if (t.im === 0) {
      if (r === 0 && e > 0)
        return new ve(Math.pow(e, t.re), 0);
      if (e === 0)
        switch ((t.re % 4 + 4) % 4) {
          case 0:
            return new ve(Math.pow(r, t.re), 0);
          case 1:
            return new ve(0, Math.pow(r, t.re));
          case 2:
            return new ve(-Math.pow(r, t.re), 0);
          case 3:
            return new ve(0, -Math.pow(r, t.re));
        }
    }
    if (e === 0 && r === 0 && t.re > 0 && t.im >= 0)
      return ve.ZERO;
    var n = Math.atan2(r, e), a = ba(e, r);
    return e = Math.exp(t.re * a - t.im * n), r = t.im * a + t.re * n, new ve(
      e * Math.cos(r),
      e * Math.sin(r)
    );
  },
  /**
   * Calculate the complex square root
   *
   * @returns {Complex}
   */
  sqrt: function() {
    var e = this.re, r = this.im, t = this.abs(), n, a;
    if (e >= 0) {
      if (r === 0)
        return new ve(Math.sqrt(e), 0);
      n = 0.5 * Math.sqrt(2 * (t + e));
    } else
      n = Math.abs(r) / Math.sqrt(2 * (t - e));
    return e <= 0 ? a = 0.5 * Math.sqrt(2 * (t - e)) : a = Math.abs(r) / Math.sqrt(2 * (t + e)), new ve(n, r < 0 ? -a : a);
  },
  /**
   * Calculate the complex exponent
   *
   * @returns {Complex}
   */
  exp: function() {
    var e = Math.exp(this.re);
    return this.im, new ve(
      e * Math.cos(this.im),
      e * Math.sin(this.im)
    );
  },
  /**
   * Calculate the complex exponent and subtracts one.
   *
   * This may be more accurate than `Complex(x).exp().sub(1)` if
   * `x` is small.
   *
   * @returns {Complex}
   */
  expm1: function() {
    var e = this.re, r = this.im;
    return new ve(
      Math.expm1(e) * Math.cos(r) + Bp(r),
      Math.exp(e) * Math.sin(r)
    );
  },
  /**
   * Calculate the natural log
   *
   * @returns {Complex}
   */
  log: function() {
    var e = this.re, r = this.im;
    return new ve(
      ba(e, r),
      Math.atan2(r, e)
    );
  },
  /**
   * Calculate the magnitude of the complex number
   *
   * @returns {number}
   */
  abs: function() {
    return Op(this.re, this.im);
  },
  /**
   * Calculate the angle of the complex number
   *
   * @returns {number}
   */
  arg: function() {
    return Math.atan2(this.im, this.re);
  },
  /**
   * Calculate the sine of the complex number
   *
   * @returns {Complex}
   */
  sin: function() {
    var e = this.re, r = this.im;
    return new ve(
      Math.sin(e) * fr(r),
      Math.cos(e) * Fr(r)
    );
  },
  /**
   * Calculate the cosine
   *
   * @returns {Complex}
   */
  cos: function() {
    var e = this.re, r = this.im;
    return new ve(
      Math.cos(e) * fr(r),
      -Math.sin(e) * Fr(r)
    );
  },
  /**
   * Calculate the tangent
   *
   * @returns {Complex}
   */
  tan: function() {
    var e = 2 * this.re, r = 2 * this.im, t = Math.cos(e) + fr(r);
    return new ve(
      Math.sin(e) / t,
      Fr(r) / t
    );
  },
  /**
   * Calculate the cotangent
   *
   * @returns {Complex}
   */
  cot: function() {
    var e = 2 * this.re, r = 2 * this.im, t = Math.cos(e) - fr(r);
    return new ve(
      -Math.sin(e) / t,
      Fr(r) / t
    );
  },
  /**
   * Calculate the secant
   *
   * @returns {Complex}
   */
  sec: function() {
    var e = this.re, r = this.im, t = 0.5 * fr(2 * r) + 0.5 * Math.cos(2 * e);
    return new ve(
      Math.cos(e) * fr(r) / t,
      Math.sin(e) * Fr(r) / t
    );
  },
  /**
   * Calculate the cosecans
   *
   * @returns {Complex}
   */
  csc: function() {
    var e = this.re, r = this.im, t = 0.5 * fr(2 * r) - 0.5 * Math.cos(2 * e);
    return new ve(
      Math.sin(e) * fr(r) / t,
      -Math.cos(e) * Fr(r) / t
    );
  },
  /**
   * Calculate the complex arcus sinus
   *
   * @returns {Complex}
   */
  asin: function() {
    var e = this.re, r = this.im, t = new ve(
      r * r - e * e + 1,
      -2 * e * r
    ).sqrt(), n = new ve(
      t.re - r,
      t.im + e
    ).log();
    return new ve(n.im, -n.re);
  },
  /**
   * Calculate the complex arcus cosinus
   *
   * @returns {Complex}
   */
  acos: function() {
    var e = this.re, r = this.im, t = new ve(
      r * r - e * e + 1,
      -2 * e * r
    ).sqrt(), n = new ve(
      t.re - r,
      t.im + e
    ).log();
    return new ve(Math.PI / 2 - n.im, n.re);
  },
  /**
   * Calculate the complex arcus tangent
   *
   * @returns {Complex}
   */
  atan: function() {
    var e = this.re, r = this.im;
    if (e === 0) {
      if (r === 1)
        return new ve(0, 1 / 0);
      if (r === -1)
        return new ve(0, -1 / 0);
    }
    var t = e * e + (1 - r) * (1 - r), n = new ve(
      (1 - r * r - e * e) / t,
      -2 * e / t
    ).log();
    return new ve(-0.5 * n.im, 0.5 * n.re);
  },
  /**
   * Calculate the complex arcus cotangent
   *
   * @returns {Complex}
   */
  acot: function() {
    var e = this.re, r = this.im;
    if (r === 0)
      return new ve(Math.atan2(1, e), 0);
    var t = e * e + r * r;
    return t !== 0 ? new ve(
      e / t,
      -r / t
    ).atan() : new ve(
      e !== 0 ? e / 0 : 0,
      r !== 0 ? -r / 0 : 0
    ).atan();
  },
  /**
   * Calculate the complex arcus secant
   *
   * @returns {Complex}
   */
  asec: function() {
    var e = this.re, r = this.im;
    if (e === 0 && r === 0)
      return new ve(0, 1 / 0);
    var t = e * e + r * r;
    return t !== 0 ? new ve(
      e / t,
      -r / t
    ).acos() : new ve(
      e !== 0 ? e / 0 : 0,
      r !== 0 ? -r / 0 : 0
    ).acos();
  },
  /**
   * Calculate the complex arcus cosecans
   *
   * @returns {Complex}
   */
  acsc: function() {
    var e = this.re, r = this.im;
    if (e === 0 && r === 0)
      return new ve(Math.PI / 2, 1 / 0);
    var t = e * e + r * r;
    return t !== 0 ? new ve(
      e / t,
      -r / t
    ).asin() : new ve(
      e !== 0 ? e / 0 : 0,
      r !== 0 ? -r / 0 : 0
    ).asin();
  },
  /**
   * Calculate the complex sinh
   *
   * @returns {Complex}
   */
  sinh: function() {
    var e = this.re, r = this.im;
    return new ve(
      Fr(e) * Math.cos(r),
      fr(e) * Math.sin(r)
    );
  },
  /**
   * Calculate the complex cosh
   *
   * @returns {Complex}
   */
  cosh: function() {
    var e = this.re, r = this.im;
    return new ve(
      fr(e) * Math.cos(r),
      Fr(e) * Math.sin(r)
    );
  },
  /**
   * Calculate the complex tanh
   *
   * @returns {Complex}
   */
  tanh: function() {
    var e = 2 * this.re, r = 2 * this.im, t = fr(e) + Math.cos(r);
    return new ve(
      Fr(e) / t,
      Math.sin(r) / t
    );
  },
  /**
   * Calculate the complex coth
   *
   * @returns {Complex}
   */
  coth: function() {
    var e = 2 * this.re, r = 2 * this.im, t = fr(e) - Math.cos(r);
    return new ve(
      Fr(e) / t,
      -Math.sin(r) / t
    );
  },
  /**
   * Calculate the complex coth
   *
   * @returns {Complex}
   */
  csch: function() {
    var e = this.re, r = this.im, t = Math.cos(2 * r) - fr(2 * e);
    return new ve(
      -2 * Fr(e) * Math.cos(r) / t,
      2 * fr(e) * Math.sin(r) / t
    );
  },
  /**
   * Calculate the complex sech
   *
   * @returns {Complex}
   */
  sech: function() {
    var e = this.re, r = this.im, t = Math.cos(2 * r) + fr(2 * e);
    return new ve(
      2 * fr(e) * Math.cos(r) / t,
      -2 * Fr(e) * Math.sin(r) / t
    );
  },
  /**
   * Calculate the complex asinh
   *
   * @returns {Complex}
   */
  asinh: function() {
    var e = this.im;
    this.im = -this.re, this.re = e;
    var r = this.asin();
    return this.re = -this.im, this.im = e, e = r.re, r.re = -r.im, r.im = e, r;
  },
  /**
   * Calculate the complex acosh
   *
   * @returns {Complex}
   */
  acosh: function() {
    var e = this.acos();
    if (e.im <= 0) {
      var r = e.re;
      e.re = -e.im, e.im = r;
    } else {
      var r = e.im;
      e.im = -e.re, e.re = r;
    }
    return e;
  },
  /**
   * Calculate the complex atanh
   *
   * @returns {Complex}
   */
  atanh: function() {
    var e = this.re, r = this.im, t = e > 1 && r === 0, n = 1 - e, a = 1 + e, i = n * n + r * r, o = i !== 0 ? new ve(
      (a * n - r * r) / i,
      (r * n + a * r) / i
    ) : new ve(
      e !== -1 ? e / 0 : 0,
      r !== 0 ? r / 0 : 0
    ), c = o.re;
    return o.re = ba(o.re, o.im) / 2, o.im = Math.atan2(o.im, c) / 2, t && (o.im = -o.im), o;
  },
  /**
   * Calculate the complex acoth
   *
   * @returns {Complex}
   */
  acoth: function() {
    var e = this.re, r = this.im;
    if (e === 0 && r === 0)
      return new ve(0, Math.PI / 2);
    var t = e * e + r * r;
    return t !== 0 ? new ve(
      e / t,
      -r / t
    ).atanh() : new ve(
      e !== 0 ? e / 0 : 0,
      r !== 0 ? -r / 0 : 0
    ).atanh();
  },
  /**
   * Calculate the complex acsch
   *
   * @returns {Complex}
   */
  acsch: function() {
    var e = this.re, r = this.im;
    if (r === 0)
      return new ve(
        e !== 0 ? Math.log(e + Math.sqrt(e * e + 1)) : 1 / 0,
        0
      );
    var t = e * e + r * r;
    return t !== 0 ? new ve(
      e / t,
      -r / t
    ).asinh() : new ve(
      e !== 0 ? e / 0 : 0,
      r !== 0 ? -r / 0 : 0
    ).asinh();
  },
  /**
   * Calculate the complex asech
   *
   * @returns {Complex}
   */
  asech: function() {
    var e = this.re, r = this.im;
    if (this.isZero())
      return ve.INFINITY;
    var t = e * e + r * r;
    return t !== 0 ? new ve(
      e / t,
      -r / t
    ).acosh() : new ve(
      e !== 0 ? e / 0 : 0,
      r !== 0 ? -r / 0 : 0
    ).acosh();
  },
  /**
   * Calculate the complex inverse 1/z
   *
   * @returns {Complex}
   */
  inverse: function() {
    if (this.isZero())
      return ve.INFINITY;
    if (this.isInfinite())
      return ve.ZERO;
    var e = this.re, r = this.im, t = e * e + r * r;
    return new ve(e / t, -r / t);
  },
  /**
   * Returns the complex conjugate
   *
   * @returns {Complex}
   */
  conjugate: function() {
    return new ve(this.re, -this.im);
  },
  /**
   * Gets the negated complex number
   *
   * @returns {Complex}
   */
  neg: function() {
    return new ve(-this.re, -this.im);
  },
  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  ceil: function(e) {
    return e = Math.pow(10, e || 0), new ve(
      Math.ceil(this.re * e) / e,
      Math.ceil(this.im * e) / e
    );
  },
  /**
   * Floors the actual complex number
   *
   * @returns {Complex}
   */
  floor: function(e) {
    return e = Math.pow(10, e || 0), new ve(
      Math.floor(this.re * e) / e,
      Math.floor(this.im * e) / e
    );
  },
  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  round: function(e) {
    return e = Math.pow(10, e || 0), new ve(
      Math.round(this.re * e) / e,
      Math.round(this.im * e) / e
    );
  },
  /**
   * Compares two complex numbers
   *
   * **Note:** new Complex(Infinity).equals(Infinity) === false
   *
   * @returns {boolean}
   */
  equals: function(e, r) {
    var t = new ve(e, r);
    return Math.abs(t.re - this.re) <= ve.EPSILON && Math.abs(t.im - this.im) <= ve.EPSILON;
  },
  /**
   * Clones the actual object
   *
   * @returns {Complex}
   */
  clone: function() {
    return new ve(this.re, this.im);
  },
  /**
   * Gets a string of the actual complex number
   *
   * @returns {string}
   */
  toString: function() {
    var e = this.re, r = this.im, t = "";
    return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(e) < ve.EPSILON && (e = 0), Math.abs(r) < ve.EPSILON && (r = 0), r === 0 ? t + e : (e !== 0 ? (t += e, t += " ", r < 0 ? (r = -r, t += "-") : t += "+", t += " ") : r < 0 && (r = -r, t += "-"), r !== 1 && (t += r), t + "i"));
  },
  /**
   * Returns the actual number as a vector
   *
   * @returns {Array}
   */
  toVector: function() {
    return [this.re, this.im];
  },
  /**
   * Returns the actual real value of the current object
   *
   * @returns {number|null}
   */
  valueOf: function() {
    return this.im === 0 ? this.re : null;
  },
  /**
   * Determines whether a complex number is not on the Riemann sphere.
   *
   * @returns {boolean}
   */
  isNaN: function() {
    return isNaN(this.re) || isNaN(this.im);
  },
  /**
   * Determines whether or not a complex number is at the zero pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  isZero: function() {
    return this.im === 0 && this.re === 0;
  },
  /**
   * Determines whether a complex number is not at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  isFinite: function() {
    return isFinite(this.re) && isFinite(this.im);
  },
  /**
   * Determines whether or not a complex number is at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  isInfinite: function() {
    return !(this.isNaN() || this.isFinite());
  }
};
ve.ZERO = new ve(0, 0);
ve.ONE = new ve(1, 0);
ve.I = new ve(0, 1);
ve.PI = new ve(Math.PI, 0);
ve.E = new ve(Math.E, 0);
ve.INFINITY = new ve(1 / 0, 1 / 0);
ve.NAN = new ve(NaN, NaN);
ve.EPSILON = 1e-15;
var Ip = "Complex", qp = [], Rp = /* @__PURE__ */ q(Ip, qp, () => (Object.defineProperty(ve, "name", {
  value: "Complex"
}), ve.prototype.constructor = ve, ve.prototype.type = "Complex", ve.prototype.isComplex = !0, ve.prototype.toJSON = function() {
  return {
    mathjs: "Complex",
    re: this.re,
    im: this.im
  };
}, ve.prototype.toPolar = function() {
  return {
    r: this.abs(),
    phi: this.arg()
  };
}, ve.prototype.format = function(e) {
  var r = "", t = this.im, n = this.re, a = pt(this.re, e), i = pt(this.im, e), o = Oe(e) ? e : e ? e.precision : null;
  if (o !== null) {
    var c = Math.pow(10, -o);
    Math.abs(n / t) < c && (n = 0), Math.abs(t / n) < c && (t = 0);
  }
  return t === 0 ? r = a : n === 0 ? t === 1 ? r = "i" : t === -1 ? r = "-i" : r = i + "i" : t < 0 ? t === -1 ? r = a + " - i" : r = a + " - " + i.substring(1) + "i" : t === 1 ? r = a + " + i" : r = a + " + " + i + "i", r;
}, ve.fromPolar = function(e) {
  switch (arguments.length) {
    case 1: {
      var r = arguments[0];
      if (typeof r == "object")
        return ve(r);
      throw new TypeError("Input has to be an object with r and phi keys.");
    }
    case 2: {
      var t = arguments[0], n = arguments[1];
      if (Oe(t)) {
        if (wr(n) && n.hasBase("ANGLE") && (n = n.toNumber("rad")), Oe(n))
          return new ve({
            r: t,
            phi: n
          });
        throw new TypeError("Phi is not a number nor an angle unit.");
      } else
        throw new TypeError("Radius r is not a number.");
    }
    default:
      throw new SyntaxError("Wrong number of arguments in function fromPolar");
  }
}, ve.prototype.valueOf = ve.prototype.toString, ve.fromJSON = function(e) {
  return new ve(e);
}, ve.compare = function(e, r) {
  return e.re > r.re ? 1 : e.re < r.re ? -1 : e.im > r.im ? 1 : e.im < r.im ? -1 : 0;
}, ve), {
  isClass: !0
});
/**
 * @license Fraction.js v4.3.7 31/08/2023
 * https://www.xarg.org/2014/03/rational-numbers-in-javascript/
 *
 * Copyright (c) 2023, Robert Eisele (robert@raw.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
var zp = 2e3, Ne = {
  s: 1,
  n: 0,
  d: 1
};
function Hr(e, r) {
  if (isNaN(e = parseInt(e, 10)))
    throw In();
  return e * r;
}
function er(e, r) {
  if (r === 0)
    throw Qa();
  var t = Object.create(mr.prototype);
  t.s = e < 0 ? -1 : 1, e = e < 0 ? -e : e;
  var n = Ct(e, r);
  return t.n = e / n, t.d = r / n, t;
}
function Ri(e) {
  for (var r = {}, t = e, n = 2, a = 4; a <= t; ) {
    for (; t % n === 0; )
      t /= n, r[n] = (r[n] || 0) + 1;
    a += 1 + 2 * n++;
  }
  return t !== e ? t > 1 && (r[t] = (r[t] || 0) + 1) : r[e] = (r[e] || 0) + 1, r;
}
var Er = function(e, r) {
  var t = 0, n = 1, a = 1, i = 0, o = 0, c = 0, l = 1, s = 1, u = 0, f = 1, m = 1, v = 1, p = 1e7, d;
  if (e != null) if (r !== void 0) {
    if (t = e, n = r, a = t * n, t % 1 !== 0 || n % 1 !== 0)
      throw kp();
  } else
    switch (typeof e) {
      case "object": {
        if ("d" in e && "n" in e)
          t = e.n, n = e.d, "s" in e && (t *= e.s);
        else if (0 in e)
          t = e[0], 1 in e && (n = e[1]);
        else
          throw In();
        a = t * n;
        break;
      }
      case "number": {
        if (e < 0 && (a = e, e = -e), e % 1 === 0)
          t = e;
        else if (e > 0) {
          for (e >= 1 && (s = Math.pow(10, Math.floor(1 + Math.log(e) / Math.LN10)), e /= s); f <= p && v <= p; )
            if (d = (u + m) / (f + v), e === d) {
              f + v <= p ? (t = u + m, n = f + v) : v > f ? (t = m, n = v) : (t = u, n = f);
              break;
            } else
              e > d ? (u += m, f += v) : (m += u, v += f), f > p ? (t = m, n = v) : (t = u, n = f);
          t *= s;
        } else (isNaN(e) || isNaN(r)) && (n = t = NaN);
        break;
      }
      case "string": {
        if (f = e.match(/\d+|./g), f === null)
          throw In();
        if (f[u] === "-" ? (a = -1, u++) : f[u] === "+" && u++, f.length === u + 1 ? o = Hr(f[u++], a) : f[u + 1] === "." || f[u] === "." ? (f[u] !== "." && (i = Hr(f[u++], a)), u++, (u + 1 === f.length || f[u + 1] === "(" && f[u + 3] === ")" || f[u + 1] === "'" && f[u + 3] === "'") && (o = Hr(f[u], a), l = Math.pow(10, f[u].length), u++), (f[u] === "(" && f[u + 2] === ")" || f[u] === "'" && f[u + 2] === "'") && (c = Hr(f[u + 1], a), s = Math.pow(10, f[u + 1].length) - 1, u += 3)) : f[u + 1] === "/" || f[u + 1] === ":" ? (o = Hr(f[u], a), l = Hr(f[u + 2], 1), u += 3) : f[u + 3] === "/" && f[u + 1] === " " && (i = Hr(f[u], a), o = Hr(f[u + 2], a), l = Hr(f[u + 4], 1), u += 5), f.length <= u) {
          n = l * s, a = /* void */
          t = c + n * i + s * o;
          break;
        }
      }
      default:
        throw In();
    }
  if (n === 0)
    throw Qa();
  Ne.s = a < 0 ? -1 : 1, Ne.n = Math.abs(t), Ne.d = Math.abs(n);
};
function Pp(e, r, t) {
  for (var n = 1; r > 0; e = e * e % t, r >>= 1)
    r & 1 && (n = n * e % t);
  return n;
}
function Up(e, r) {
  for (; r % 2 === 0; r /= 2)
    ;
  for (; r % 5 === 0; r /= 5)
    ;
  if (r === 1)
    return 0;
  for (var t = 10 % r, n = 1; t !== 1; n++)
    if (t = t * 10 % r, n > zp)
      return 0;
  return n;
}
function Lp(e, r, t) {
  for (var n = 1, a = Pp(10, t, r), i = 0; i < 300; i++) {
    if (n === a)
      return i;
    n = n * 10 % r, a = a * 10 % r;
  }
  return 0;
}
function Ct(e, r) {
  if (!e)
    return r;
  if (!r)
    return e;
  for (; ; ) {
    if (e %= r, !e)
      return r;
    if (r %= e, !r)
      return e;
  }
}
function mr(e, r) {
  if (Er(e, r), this instanceof mr)
    e = Ct(Ne.d, Ne.n), this.s = Ne.s, this.n = Ne.n / e, this.d = Ne.d / e;
  else
    return er(Ne.s * Ne.n, Ne.d);
}
var Qa = function() {
  return new Error("Division by Zero");
}, In = function() {
  return new Error("Invalid argument");
}, kp = function() {
  return new Error("Parameters must be integer");
};
mr.prototype = {
  s: 1,
  n: 0,
  d: 1,
  /**
   * Calculates the absolute value
   *
   * Ex: new Fraction(-4).abs() => 4
   **/
  abs: function() {
    return er(this.n, this.d);
  },
  /**
   * Inverts the sign of the current fraction
   *
   * Ex: new Fraction(-4).neg() => 4
   **/
  neg: function() {
    return er(-this.s * this.n, this.d);
  },
  /**
   * Adds two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
   **/
  add: function(e, r) {
    return Er(e, r), er(
      this.s * this.n * Ne.d + Ne.s * this.d * Ne.n,
      this.d * Ne.d
    );
  },
  /**
   * Subtracts two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
   **/
  sub: function(e, r) {
    return Er(e, r), er(
      this.s * this.n * Ne.d - Ne.s * this.d * Ne.n,
      this.d * Ne.d
    );
  },
  /**
   * Multiplies two rational numbers
   *
   * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
   **/
  mul: function(e, r) {
    return Er(e, r), er(
      this.s * Ne.s * this.n * Ne.n,
      this.d * Ne.d
    );
  },
  /**
   * Divides two rational numbers
   *
   * Ex: new Fraction("-17.(345)").inverse().div(3)
   **/
  div: function(e, r) {
    return Er(e, r), er(
      this.s * Ne.s * this.n * Ne.d,
      this.d * Ne.n
    );
  },
  /**
   * Clones the actual object
   *
   * Ex: new Fraction("-17.(345)").clone()
   **/
  clone: function() {
    return er(this.s * this.n, this.d);
  },
  /**
   * Calculates the modulo of two rational numbers - a more precise fmod
   *
   * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
   **/
  mod: function(e, r) {
    if (isNaN(this.n) || isNaN(this.d))
      return new mr(NaN);
    if (e === void 0)
      return er(this.s * this.n % this.d, 1);
    if (Er(e, r), Ne.n === 0 && this.d === 0)
      throw Qa();
    return er(
      this.s * (Ne.d * this.n) % (Ne.n * this.d),
      Ne.d * this.d
    );
  },
  /**
   * Calculates the fractional gcd of two rational numbers
   *
   * Ex: new Fraction(5,8).gcd(3,7) => 1/56
   */
  gcd: function(e, r) {
    return Er(e, r), er(Ct(Ne.n, this.n) * Ct(Ne.d, this.d), Ne.d * this.d);
  },
  /**
   * Calculates the fractional lcm of two rational numbers
   *
   * Ex: new Fraction(5,8).lcm(3,7) => 15
   */
  lcm: function(e, r) {
    return Er(e, r), Ne.n === 0 && this.n === 0 ? er(0, 1) : er(Ne.n * this.n, Ct(Ne.n, this.n) * Ct(Ne.d, this.d));
  },
  /**
   * Calculates the ceil of a rational number
   *
   * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
   **/
  ceil: function(e) {
    return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new mr(NaN) : er(Math.ceil(e * this.s * this.n / this.d), e);
  },
  /**
   * Calculates the floor of a rational number
   *
   * Ex: new Fraction('4.(3)').floor() => (4 / 1)
   **/
  floor: function(e) {
    return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new mr(NaN) : er(Math.floor(e * this.s * this.n / this.d), e);
  },
  /**
   * Rounds a rational number
   *
   * Ex: new Fraction('4.(3)').round() => (4 / 1)
   **/
  round: function(e) {
    return e = Math.pow(10, e || 0), isNaN(this.n) || isNaN(this.d) ? new mr(NaN) : er(Math.round(e * this.s * this.n / this.d), e);
  },
  /**
   * Rounds a rational number to a multiple of another rational number
   *
   * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
   **/
  roundTo: function(e, r) {
    return Er(e, r), er(this.s * Math.round(this.n * Ne.d / (this.d * Ne.n)) * Ne.n, Ne.d);
  },
  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   *
   * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
   **/
  inverse: function() {
    return er(this.s * this.d, this.n);
  },
  /**
   * Calculates the fraction to some rational exponent, if possible
   *
   * Ex: new Fraction(-1,2).pow(-3) => -8
   */
  pow: function(e, r) {
    if (Er(e, r), Ne.d === 1)
      return Ne.s < 0 ? er(Math.pow(this.s * this.d, Ne.n), Math.pow(this.n, Ne.n)) : er(Math.pow(this.s * this.n, Ne.n), Math.pow(this.d, Ne.n));
    if (this.s < 0) return null;
    var t = Ri(this.n), n = Ri(this.d), a = 1, i = 1;
    for (var o in t)
      if (o !== "1") {
        if (o === "0") {
          a = 0;
          break;
        }
        if (t[o] *= Ne.n, t[o] % Ne.d === 0)
          t[o] /= Ne.d;
        else return null;
        a *= Math.pow(o, t[o]);
      }
    for (var o in n)
      if (o !== "1") {
        if (n[o] *= Ne.n, n[o] % Ne.d === 0)
          n[o] /= Ne.d;
        else return null;
        i *= Math.pow(o, n[o]);
      }
    return Ne.s < 0 ? er(i, a) : er(a, i);
  },
  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  equals: function(e, r) {
    return Er(e, r), this.s * this.n * Ne.d === Ne.s * Ne.n * this.d;
  },
  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  compare: function(e, r) {
    Er(e, r);
    var t = this.s * this.n * Ne.d - Ne.s * Ne.n * this.d;
    return (0 < t) - (t < 0);
  },
  simplify: function(e) {
    if (isNaN(this.n) || isNaN(this.d))
      return this;
    e = e || 1e-3;
    for (var r = this.abs(), t = r.toContinued(), n = 1; n < t.length; n++) {
      for (var a = er(t[n - 1], 1), i = n - 2; i >= 0; i--)
        a = a.inverse().add(t[i]);
      if (Math.abs(a.sub(r).valueOf()) < e)
        return a.mul(this.s);
    }
    return this;
  },
  /**
   * Check if two rational numbers are divisible
   *
   * Ex: new Fraction(19.6).divisible(1.5);
   */
  divisible: function(e, r) {
    return Er(e, r), !(!(Ne.n * this.d) || this.n * Ne.d % (Ne.n * this.d));
  },
  /**
   * Returns a decimal representation of the fraction
   *
   * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
   **/
  valueOf: function() {
    return this.s * this.n / this.d;
  },
  /**
   * Returns a string-fraction representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toFraction(true) => "4 1/3"
   **/
  toFraction: function(e) {
    var r, t = "", n = this.n, a = this.d;
    return this.s < 0 && (t += "-"), a === 1 ? t += n : (e && (r = Math.floor(n / a)) > 0 && (t += r, t += " ", n %= a), t += n, t += "/", t += a), t;
  },
  /**
   * Returns a latex representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
   **/
  toLatex: function(e) {
    var r, t = "", n = this.n, a = this.d;
    return this.s < 0 && (t += "-"), a === 1 ? t += n : (e && (r = Math.floor(n / a)) > 0 && (t += r, n %= a), t += "\\frac{", t += n, t += "}{", t += a, t += "}"), t;
  },
  /**
   * Returns an array of continued fraction elements
   *
   * Ex: new Fraction("7/8").toContinued() => [0,1,7]
   */
  toContinued: function() {
    var e, r = this.n, t = this.d, n = [];
    if (isNaN(r) || isNaN(t))
      return n;
    do
      n.push(Math.floor(r / t)), e = r % t, r = t, t = e;
    while (r !== 1);
    return n;
  },
  /**
   * Creates a string representation of a fraction with all digits
   *
   * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
   **/
  toString: function(e) {
    var r = this.n, t = this.d;
    if (isNaN(r) || isNaN(t))
      return "NaN";
    e = e || 15;
    var n = Up(r, t), a = Lp(r, t, n), i = this.s < 0 ? "-" : "";
    if (i += r / t | 0, r %= t, r *= 10, r && (i += "."), n) {
      for (var o = a; o--; )
        i += r / t | 0, r %= t, r *= 10;
      i += "(";
      for (var o = n; o--; )
        i += r / t | 0, r %= t, r *= 10;
      i += ")";
    } else
      for (var o = e; r && o--; )
        i += r / t | 0, r %= t, r *= 10;
    return i;
  }
};
var Hp = "Fraction", Gp = [], Zp = /* @__PURE__ */ q(Hp, Gp, () => (Object.defineProperty(mr, "name", {
  value: "Fraction"
}), mr.prototype.constructor = mr, mr.prototype.type = "Fraction", mr.prototype.isFraction = !0, mr.prototype.toJSON = function() {
  return {
    mathjs: "Fraction",
    n: this.s * this.n,
    d: this.d
  };
}, mr.fromJSON = function(e) {
  return new mr(e);
}, mr), {
  isClass: !0
}), Vp = "Range", Wp = [], Yp = /* @__PURE__ */ q(Vp, Wp, () => {
  function e(r, t, n) {
    if (!(this instanceof e))
      throw new SyntaxError("Constructor must be called with the new operator");
    var a = r != null, i = t != null, o = n != null;
    if (a) {
      if (Be(r))
        r = r.toNumber();
      else if (typeof r != "number")
        throw new TypeError("Parameter start must be a number");
    }
    if (i) {
      if (Be(t))
        t = t.toNumber();
      else if (typeof t != "number")
        throw new TypeError("Parameter end must be a number");
    }
    if (o) {
      if (Be(n))
        n = n.toNumber();
      else if (typeof n != "number")
        throw new TypeError("Parameter step must be a number");
    }
    this.start = a ? parseFloat(r) : 0, this.end = i ? parseFloat(t) : 0, this.step = o ? parseFloat(n) : 1;
  }
  return e.prototype.type = "Range", e.prototype.isRange = !0, e.parse = function(r) {
    if (typeof r != "string")
      return null;
    var t = r.split(":"), n = t.map(function(i) {
      return parseFloat(i);
    }), a = n.some(function(i) {
      return isNaN(i);
    });
    if (a)
      return null;
    switch (n.length) {
      case 2:
        return new e(n[0], n[1]);
      case 3:
        return new e(n[0], n[2], n[1]);
      default:
        return null;
    }
  }, e.prototype.clone = function() {
    return new e(this.start, this.end, this.step);
  }, e.prototype.size = function() {
    var r = 0, t = this.start, n = this.step, a = this.end, i = a - t;
    return rt(n) === rt(i) ? r = Math.ceil(i / n) : i === 0 && (r = 0), isNaN(r) && (r = 0), [r];
  }, e.prototype.min = function() {
    var r = this.size()[0];
    if (r > 0)
      return this.step > 0 ? this.start : this.start + (r - 1) * this.step;
  }, e.prototype.max = function() {
    var r = this.size()[0];
    if (r > 0)
      return this.step > 0 ? this.start + (r - 1) * this.step : this.start;
  }, e.prototype.forEach = function(r) {
    var t = this.start, n = this.step, a = this.end, i = 0;
    if (n > 0)
      for (; t < a; )
        r(t, [i], this), t += n, i++;
    else if (n < 0)
      for (; t > a; )
        r(t, [i], this), t += n, i++;
  }, e.prototype.map = function(r) {
    var t = [];
    return this.forEach(function(n, a, i) {
      t[a[0]] = r(n, a, i);
    }), t;
  }, e.prototype.toArray = function() {
    var r = [];
    return this.forEach(function(t, n) {
      r[n[0]] = t;
    }), r;
  }, e.prototype.valueOf = function() {
    return this.toArray();
  }, e.prototype.format = function(r) {
    var t = pt(this.start, r);
    return this.step !== 1 && (t += ":" + pt(this.step, r)), t += ":" + pt(this.end, r), t;
  }, e.prototype.toString = function() {
    return this.format();
  }, e.prototype.toJSON = function() {
    return {
      mathjs: "Range",
      start: this.start,
      end: this.end,
      step: this.step
    };
  }, e.fromJSON = function(r) {
    return new e(r.start, r.end, r.step);
  }, e;
}, {
  isClass: !0
}), Xp = "Matrix", Jp = [], Qp = /* @__PURE__ */ q(Xp, Jp, () => {
  function e() {
    if (!(this instanceof e))
      throw new SyntaxError("Constructor must be called with the new operator");
  }
  return e.prototype.type = "Matrix", e.prototype.isMatrix = !0, e.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  }, e.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  }, e.prototype.create = function(r, t) {
    throw new Error("Cannot invoke create on a Matrix interface");
  }, e.prototype.subset = function(r, t, n) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  }, e.prototype.get = function(r) {
    throw new Error("Cannot invoke get on a Matrix interface");
  }, e.prototype.set = function(r, t, n) {
    throw new Error("Cannot invoke set on a Matrix interface");
  }, e.prototype.resize = function(r, t) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  }, e.prototype.reshape = function(r, t) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  }, e.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  }, e.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  }, e.prototype.map = function(r, t) {
    throw new Error("Cannot invoke map on a Matrix interface");
  }, e.prototype.forEach = function(r) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  }, e.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  }, e.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  }, e.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  }, e.prototype.format = function(r) {
    throw new Error("Cannot invoke format on a Matrix interface");
  }, e.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  }, e;
}, {
  isClass: !0
});
function xa(e, r, t) {
  var n = e.constructor, a = new n(2), i = "";
  if (t) {
    if (t < 1)
      throw new Error("size must be in greater than 0");
    if (!Ae(t))
      throw new Error("size must be an integer");
    if (e.greaterThan(a.pow(t - 1).sub(1)) || e.lessThan(a.pow(t - 1).mul(-1)))
      throw new Error("Value must be in range [-2^".concat(t - 1, ", 2^").concat(t - 1, "-1]"));
    if (!e.isInteger())
      throw new Error("Value must be an integer");
    e.lessThan(0) && (e = e.add(a.pow(t))), i = "i".concat(t);
  }
  switch (r) {
    case 2:
      return "".concat(e.toBinary()).concat(i);
    case 8:
      return "".concat(e.toOctal()).concat(i);
    case 16:
      return "".concat(e.toHexadecimal()).concat(i);
    default:
      throw new Error("Base ".concat(r, " not supported "));
  }
}
function Kp(e, r) {
  if (typeof r == "function")
    return r(e);
  if (!e.isFinite())
    return e.isNaN() ? "NaN" : e.gt(0) ? "Infinity" : "-Infinity";
  var {
    notation: t,
    precision: n,
    wordSize: a
  } = Ec(r);
  switch (t) {
    case "fixed":
      return ed(e, n);
    case "exponential":
      return zi(e, n);
    case "engineering":
      return jp(e, n);
    case "bin":
      return xa(e, 2, a);
    case "oct":
      return xa(e, 8, a);
    case "hex":
      return xa(e, 16, a);
    case "auto": {
      var i = Pi(r == null ? void 0 : r.lowerExp, -3), o = Pi(r == null ? void 0 : r.upperExp, 5);
      if (e.isZero()) return "0";
      var c, l = e.toSignificantDigits(n), s = l.e;
      return s >= i && s < o ? c = l.toFixed() : c = zi(e, n), c.replace(/((\.\d*?)(0+))($|e)/, function() {
        var u = arguments[2], f = arguments[4];
        return u !== "." ? u + f : f;
      });
    }
    default:
      throw new Error('Unknown notation "' + t + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function jp(e, r) {
  var t = e.e, n = t % 3 === 0 ? t : t < 0 ? t - 3 - t % 3 : t - t % 3, a = e.mul(Math.pow(10, -n)), i = a.toPrecision(r);
  if (i.includes("e")) {
    var o = e.constructor;
    i = new o(i).toFixed();
  }
  return i + "e" + (t >= 0 ? "+" : "") + n.toString();
}
function zi(e, r) {
  return r !== void 0 ? e.toExponential(r - 1) : e.toExponential();
}
function ed(e, r) {
  return e.toFixed(r);
}
function Pi(e, r) {
  return Oe(e) ? e : Be(e) ? e.toNumber() : r;
}
function rd(e, r) {
  var t = e.length - r.length, n = e.length;
  return e.substring(t, n) === r;
}
function Pe(e, r) {
  var t = td(e, r);
  return r && typeof r == "object" && "truncate" in r && t.length > r.truncate ? t.substring(0, r.truncate - 3) + "..." : t;
}
function td(e, r) {
  if (typeof e == "number")
    return pt(e, r);
  if (Be(e))
    return Kp(e, r);
  if (nd(e))
    return !r || r.fraction !== "decimal" ? e.s * e.n + "/" + e.d : e.toString();
  if (Array.isArray(e))
    return Uc(e, r);
  if (sr(e))
    return Mt(e);
  if (typeof e == "function")
    return e.syntax ? String(e.syntax) : "function";
  if (e && typeof e == "object") {
    if (typeof e.format == "function")
      return e.format(r);
    if (e && e.toString(r) !== {}.toString())
      return e.toString(r);
    var t = Object.keys(e).map((n) => Mt(n) + ": " + Pe(e[n], r));
    return "{" + t.join(", ") + "}";
  }
  return String(e);
}
function Mt(e) {
  for (var r = String(e), t = "", n = 0; n < r.length; ) {
    var a = r.charAt(n);
    t += a in Ui ? Ui[a] : a, n++;
  }
  return '"' + t + '"';
}
var Ui = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
function Tr(e) {
  var r = String(e);
  return r = r.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), r;
}
function Uc(e, r) {
  if (Array.isArray(e)) {
    for (var t = "[", n = e.length, a = 0; a < n; a++)
      a !== 0 && (t += ", "), t += Uc(e[a], r);
    return t += "]", t;
  } else
    return Pe(e, r);
}
function nd(e) {
  return e && typeof e == "object" && typeof e.s == "number" && typeof e.n == "number" && typeof e.d == "number" || !1;
}
function Oa(e, r) {
  if (!sr(e))
    throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + Je(e) + ", index: 0)");
  if (!sr(r))
    throw new TypeError("Unexpected type of argument in function compareText (expected: string or Array or Matrix, actual: " + Je(r) + ", index: 1)");
  return e === r ? 0 : e > r ? 1 : -1;
}
function Re(e, r, t) {
  if (!(this instanceof Re))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.actual = e, this.expected = r, this.relation = t, this.message = "Dimension mismatch (" + (Array.isArray(e) ? "[" + e.join(", ") + "]" : e) + " " + (this.relation || "!=") + " " + (Array.isArray(r) ? "[" + r.join(", ") + "]" : r) + ")", this.stack = new Error().stack;
}
Re.prototype = new RangeError();
Re.prototype.constructor = RangeError;
Re.prototype.name = "DimensionError";
Re.prototype.isDimensionError = !0;
function Br(e, r, t) {
  if (!(this instanceof Br))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.index = e, arguments.length < 3 ? (this.min = 0, this.max = r) : (this.min = r, this.max = t), this.min !== void 0 && this.index < this.min ? this.message = "Index out of range (" + this.index + " < " + this.min + ")" : this.max !== void 0 && this.index >= this.max ? this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")" : this.message = "Index out of range (" + this.index + ")", this.stack = new Error().stack;
}
Br.prototype = new RangeError();
Br.prototype.constructor = RangeError;
Br.prototype.name = "IndexError";
Br.prototype.isIndexError = !0;
function Te(e) {
  for (var r = []; Array.isArray(e); )
    r.push(e.length), e = e[0];
  return r;
}
function Lc(e, r, t) {
  var n, a = e.length;
  if (a !== r[t])
    throw new Re(a, r[t]);
  if (t < r.length - 1) {
    var i = t + 1;
    for (n = 0; n < a; n++) {
      var o = e[n];
      if (!Array.isArray(o))
        throw new Re(r.length - 1, r.length, "<");
      Lc(e[n], r, i);
    }
  } else
    for (n = 0; n < a; n++)
      if (Array.isArray(e[n]))
        throw new Re(r.length + 1, r.length, ">");
}
function Li(e, r) {
  var t = r.length === 0;
  if (t) {
    if (Array.isArray(e))
      throw new Re(e.length, 0);
  } else
    Lc(e, r, 0);
}
function Ln(e, r) {
  var t = e.isMatrix ? e._size : Te(e), n = r._sourceSize;
  n.forEach((a, i) => {
    if (a !== null && a !== t[i])
      throw new Re(a, t[i]);
  });
}
function Xe(e, r) {
  if (e !== void 0) {
    if (!Oe(e) || !Ae(e))
      throw new TypeError("Index must be an integer (value: " + e + ")");
    if (e < 0 || typeof r == "number" && e >= r)
      throw new Br(e, r);
  }
}
function $t(e) {
  for (var r = 0; r < e._dimensions.length; ++r) {
    var t = e._dimensions[r];
    if (t._data && Ze(t._data)) {
      if (t._size[0] === 0)
        return !0;
    } else if (t.isRange) {
      if (t.start === t.end)
        return !0;
    } else if (sr(t) && t.length === 0)
      return !0;
  }
  return !1;
}
function It(e, r, t) {
  if (!Array.isArray(r))
    throw new TypeError("Array expected");
  if (r.length === 0)
    throw new Error("Resizing to scalar is not supported");
  r.forEach(function(a) {
    if (!Oe(a) || !Ae(a) || a < 0)
      throw new TypeError("Invalid size, must contain positive integers (size: " + Pe(r) + ")");
  }), (Oe(e) || Be(e)) && (e = [e]);
  var n = t !== void 0 ? t : 0;
  return $a(e, r, 0, n), e;
}
function $a(e, r, t, n) {
  var a, i, o = e.length, c = r[t], l = Math.min(o, c);
  if (e.length = c, t < r.length - 1) {
    var s = t + 1;
    for (a = 0; a < l; a++)
      i = e[a], Array.isArray(i) || (i = [i], e[a] = i), $a(i, r, s, n);
    for (a = l; a < c; a++)
      i = [], e[a] = i, $a(i, r, s, n);
  } else {
    for (a = 0; a < l; a++)
      for (; Array.isArray(e[a]); )
        e[a] = e[a][0];
    for (a = l; a < c; a++)
      e[a] = n;
  }
}
function Ka(e, r) {
  var t = Ge(e), n = t.length;
  if (!Array.isArray(e) || !Array.isArray(r))
    throw new TypeError("Array expected");
  if (r.length === 0)
    throw new Re(0, n, "!=");
  r = ja(r, n);
  var a = kc(r);
  if (n !== a)
    throw new Re(a, n, "!=");
  try {
    return ad(t, r);
  } catch (i) {
    throw i instanceof Re ? new Re(a, n, "!=") : i;
  }
}
function ja(e, r) {
  var t = kc(e), n = e.slice(), a = -1, i = e.indexOf(a), o = e.indexOf(a, i + 1) >= 0;
  if (o)
    throw new Error("More than one wildcard in sizes");
  var c = i >= 0, l = r % t === 0;
  if (c)
    if (l)
      n[i] = -r / t;
    else
      throw new Error("Could not replace wildcard, since " + r + " is no multiple of " + -t);
  return n;
}
function kc(e) {
  return e.reduce((r, t) => r * t, 1);
}
function ad(e, r) {
  for (var t = e, n, a = r.length - 1; a > 0; a--) {
    var i = r[a];
    n = [];
    for (var o = t.length / i, c = 0; c < o; c++)
      n.push(t.slice(c * i, (c + 1) * i));
    t = n;
  }
  return t;
}
function kn(e, r) {
  for (var t = Te(e); Array.isArray(e) && e.length === 1; )
    e = e[0], t.shift();
  for (var n = t.length; t[n - 1] === 1; )
    n--;
  return n < t.length && (e = Hc(e, n, 0), t.length = n), e;
}
function Hc(e, r, t) {
  var n, a;
  if (t < r) {
    var i = t + 1;
    for (n = 0, a = e.length; n < a; n++)
      e[n] = Hc(e[n], r, i);
  } else
    for (; Array.isArray(e); )
      e = e[0];
  return e;
}
function Gc(e, r, t, n) {
  var a = n || Te(e);
  if (t)
    for (var i = 0; i < t; i++)
      e = [e], a.unshift(1);
  for (e = Zc(e, r, 0); a.length < r; )
    a.push(1);
  return e;
}
function Zc(e, r, t) {
  var n, a;
  if (Array.isArray(e)) {
    var i = t + 1;
    for (n = 0, a = e.length; n < a; n++)
      e[n] = Zc(e[n], r, i);
  } else
    for (var o = t; o < r; o++)
      e = [e];
  return e;
}
function Ge(e) {
  if (!Array.isArray(e))
    return e;
  var r = [];
  return e.forEach(function t(n) {
    Array.isArray(n) ? n.forEach(t) : r.push(n);
  }), r;
}
function nt(e, r) {
  return Array.prototype.map.call(e, r);
}
function Vc(e, r) {
  Array.prototype.forEach.call(e, r);
}
function id(e, r) {
  if (Te(e).length !== 1)
    throw new Error("Only one dimensional matrices supported");
  return Array.prototype.filter.call(e, r);
}
function ki(e, r) {
  if (Te(e).length !== 1)
    throw new Error("Only one dimensional matrices supported");
  return Array.prototype.filter.call(e, (t) => r.test(t));
}
function Hi(e, r) {
  return Array.prototype.join.call(e, r);
}
function qt(e) {
  if (!Array.isArray(e))
    throw new TypeError("Array input expected");
  if (e.length === 0)
    return e;
  var r = [], t = 0;
  r[0] = {
    value: e[0],
    identifier: 0
  };
  for (var n = 1; n < e.length; n++)
    e[n] === e[n - 1] ? t++ : t = 0, r.push({
      value: e[n],
      identifier: t
    });
  return r;
}
function Hn(e) {
  if (!Array.isArray(e))
    throw new TypeError("Array input expected");
  if (e.length === 0)
    return e;
  for (var r = [], t = 0; t < e.length; t++)
    r.push(e[t].value);
  return r;
}
function la(e, r) {
  for (var t, n = 0, a = 0; a < e.length; a++) {
    var i = e[a], o = Array.isArray(i);
    if (a === 0 && o && (n = i.length), o && i.length !== n)
      return;
    var c = o ? la(i, r) : r(i);
    if (t === void 0)
      t = c;
    else if (t !== c)
      return "mixed";
  }
  return t;
}
function Wc(e, r, t, n) {
  if (n < t) {
    if (e.length !== r.length)
      throw new Re(e.length, r.length);
    for (var a = [], i = 0; i < e.length; i++)
      a[i] = Wc(e[i], r[i], t, n + 1);
    return a;
  } else
    return e.concat(r);
}
function Yc() {
  var e = Array.prototype.slice.call(arguments, 0, -1), r = Array.prototype.slice.call(arguments, -1);
  if (e.length === 1)
    return e[0];
  if (e.length > 1)
    return e.slice(1).reduce(function(t, n) {
      return Wc(t, n, r, 0);
    }, e[0]);
  throw new Error("Wrong number of arguments in function concat");
}
function ei() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  for (var n = r.map((m) => m.length), a = Math.max(...n), i = new Array(a).fill(null), o = 0; o < r.length; o++)
    for (var c = r[o], l = n[o], s = 0; s < l; s++) {
      var u = a - l + s;
      c[s] > i[u] && (i[u] = c[s]);
    }
  for (var f = 0; f < r.length; f++)
    Xc(r[f], i);
  return i;
}
function Xc(e, r) {
  for (var t = r.length, n = e.length, a = 0; a < n; a++) {
    var i = t - n + a;
    if (e[a] < r[i] && e[a] > 1 || e[a] > r[i])
      throw new Error("shape missmatch: missmatch is found in arg with shape (".concat(e, ") not possible to broadcast dimension ").concat(n, " with size ").concat(e[a], " to size ").concat(r[i]));
  }
}
function mt(e, r) {
  var t = Te(e);
  if (Xr(t, r))
    return e;
  Xc(t, r);
  var n = ei(t, r), a = n.length, i = [...Array(a - t.length).fill(1), ...t], o = sd(e);
  t.length < a && (o = Ka(o, i), t = Te(o));
  for (var c = 0; c < a; c++)
    t[c] < n[c] && (o = od(o, n[c], c), t = Te(o));
  return o;
}
function od(e, r, t) {
  return Yc(...Array(r).fill(e), t);
}
function ri(e, r) {
  if (!Array.isArray(e))
    throw new Error("Array expected");
  var t = Te(e);
  if (r.length !== t.length)
    throw new Re(r.length, t.length);
  for (var n = 0; n < r.length; n++)
    Xe(r[n], t[n]);
  return r.reduce((a, i) => a[i], e);
}
function ti(e, r, t, n) {
  return Array.isArray(e) ? e.map(function(a, i) {
    return ti(a, r.concat(i), t, n);
  }) : n(e, r, t);
}
function sd(e) {
  return vr([], e);
}
function dt(e, r, t) {
  if (rn.isTypedFunction(e)) {
    var n = (r.isMatrix ? r.size() : Te(r)).map(() => 0), a = r.isMatrix ? r.get(n) : ri(r, n), i = Object.keys(e.signatures).length === 1, o = ud(e, a, n, r), c = i ? Object.values(e.signatures)[0] : e;
    return o >= 1 && o <= 3 ? function() {
      for (var l = arguments.length, s = new Array(l), u = 0; u < l; u++)
        s[u] = arguments[u];
      return Gi(c, s.slice(0, o), t, e.name);
    } : function() {
      for (var l = arguments.length, s = new Array(l), u = 0; u < l; u++)
        s[u] = arguments[u];
      return Gi(c, s, t, e.name);
    };
  }
  return e;
}
function ud(e, r, t, n) {
  for (var a = [r, t, n], i = 3; i > 0; i--) {
    var o = a.slice(0, i);
    if (rn.resolve(e, o) !== null)
      return i;
  }
}
function Gi(e, r, t, n) {
  try {
    return e(...r);
  } catch (a) {
    ld(a, r, t, n);
  }
}
function ld(e, r, t, n) {
  var a;
  if (e instanceof TypeError && ((a = e.data) === null || a === void 0 ? void 0 : a.category) === "wrongType") {
    var i = [];
    throw i.push("value: ".concat(Je(r[0]))), r.length >= 2 && i.push("index: ".concat(Je(r[1]))), r.length >= 3 && i.push("array: ".concat(Je(r[2]))), new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "".concat(n, "(").concat(i.join(", "), ") at index ").concat(JSON.stringify(r[1])));
  } else
    throw new TypeError("Function ".concat(t, " cannot apply callback arguments ") + "to function ".concat(n, ": ").concat(e.message));
}
var cd = "DenseMatrix", fd = ["Matrix"], md = /* @__PURE__ */ q(cd, fd, (e) => {
  var {
    Matrix: r
  } = e;
  function t(u, f) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (f && !sr(f))
      throw new Error("Invalid datatype: " + f);
    if (Ce(u))
      u.type === "DenseMatrix" ? (this._data = Me(u._data), this._size = Me(u._size), this._datatype = f || u._datatype) : (this._data = u.toArray(), this._size = u.size(), this._datatype = f || u._datatype);
    else if (u && Ze(u.data) && Ze(u.size))
      this._data = u.data, this._size = u.size, Li(this._data, this._size), this._datatype = f || u.datatype;
    else if (Ze(u))
      this._data = s(u), this._size = Te(this._data), Li(this._data, this._size), this._datatype = f;
    else {
      if (u)
        throw new TypeError("Unsupported type of data (" + Je(u) + ")");
      this._data = [], this._size = [0], this._datatype = f;
    }
  }
  t.prototype = new r(), t.prototype.createDenseMatrix = function(u, f) {
    return new t(u, f);
  }, Object.defineProperty(t, "name", {
    value: "DenseMatrix"
  }), t.prototype.constructor = t, t.prototype.type = "DenseMatrix", t.prototype.isDenseMatrix = !0, t.prototype.getDataType = function() {
    return la(this._data, Je);
  }, t.prototype.storage = function() {
    return "dense";
  }, t.prototype.datatype = function() {
    return this._datatype;
  }, t.prototype.create = function(u, f) {
    return new t(u, f);
  }, t.prototype.subset = function(u, f, m) {
    switch (arguments.length) {
      case 1:
        return n(this, u);
      case 2:
      case 3:
        return i(this, u, f, m);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, t.prototype.get = function(u) {
    return ri(this._data, u);
  }, t.prototype.set = function(u, f, m) {
    if (!Ze(u))
      throw new TypeError("Array expected");
    if (u.length < this._size.length)
      throw new Re(u.length, this._size.length, "<");
    var v, p, d, b = u.map(function(D) {
      return D + 1;
    });
    l(this, b, m);
    var x = this._data;
    for (v = 0, p = u.length - 1; v < p; v++)
      d = u[v], Xe(d, x.length), x = x[d];
    return d = u[u.length - 1], Xe(d, x.length), x[d] = f, this;
  };
  function n(u, f) {
    if (!on(f))
      throw new TypeError("Invalid index");
    var m = f.isScalar();
    if (m)
      return u.get(f.min());
    var v = f.size();
    if (v.length !== u._size.length)
      throw new Re(v.length, u._size.length);
    for (var p = f.min(), d = f.max(), b = 0, x = u._size.length; b < x; b++)
      Xe(p[b], u._size[b]), Xe(d[b], u._size[b]);
    return new t(a(u._data, f, v.length, 0), u._datatype);
  }
  function a(u, f, m, v) {
    var p = v === m - 1, d = f.dimension(v);
    return p ? d.map(function(b) {
      return Xe(b, u.length), u[b];
    }).valueOf() : d.map(function(b) {
      Xe(b, u.length);
      var x = u[b];
      return a(x, f, m, v + 1);
    }).valueOf();
  }
  function i(u, f, m, v) {
    if (!f || f.isIndex !== !0)
      throw new TypeError("Invalid index");
    var p = f.size(), d = f.isScalar(), b;
    if (Ce(m) ? (b = m.size(), m = m.valueOf()) : b = Te(m), d) {
      if (b.length !== 0)
        throw new TypeError("Scalar expected");
      u.set(f.min(), m, v);
    } else {
      if (!Xr(b, p))
        try {
          b.length === 0 ? m = mt([m], p) : m = mt(m, p), b = Te(m);
        } catch {
        }
      if (p.length < u._size.length)
        throw new Re(p.length, u._size.length, "<");
      if (b.length < p.length) {
        for (var x = 0, D = 0; p[x] === 1 && b[x] === 1; )
          x++;
        for (; p[x] === 1; )
          D++, x++;
        m = Gc(m, p.length, D, b);
      }
      if (!Xr(p, b))
        throw new Re(p, b, ">");
      var h = f.max().map(function(g) {
        return g + 1;
      });
      l(u, h, v);
      var w = p.length, y = 0;
      o(u._data, f, m, w, y);
    }
    return u;
  }
  function o(u, f, m, v, p) {
    var d = p === v - 1, b = f.dimension(p);
    d ? b.forEach(function(x, D) {
      Xe(x), u[x] = m[D[0]];
    }) : b.forEach(function(x, D) {
      Xe(x), o(u[x], f, m[D[0]], v, p + 1);
    });
  }
  t.prototype.resize = function(u, f, m) {
    if (!Cr(u))
      throw new TypeError("Array or Matrix expected");
    var v = u.valueOf().map((d) => Array.isArray(d) && d.length === 1 ? d[0] : d), p = m ? this.clone() : this;
    return c(p, v, f);
  };
  function c(u, f, m) {
    if (f.length === 0) {
      for (var v = u._data; Ze(v); )
        v = v[0];
      return v;
    }
    return u._size = f.slice(0), u._data = It(u._data, u._size, m), u;
  }
  t.prototype.reshape = function(u, f) {
    var m = f ? this.clone() : this;
    m._data = Ka(m._data, u);
    var v = m._size.reduce((p, d) => p * d);
    return m._size = ja(u, v), m;
  };
  function l(u, f, m) {
    for (var v = u._size.slice(0), p = !1; v.length < f.length; )
      v.push(0), p = !0;
    for (var d = 0, b = f.length; d < b; d++)
      f[d] > v[d] && (v[d] = f[d], p = !0);
    p && c(u, v, m);
  }
  t.prototype.clone = function() {
    var u = new t({
      data: Me(this._data),
      size: Me(this._size),
      datatype: this._datatype
    });
    return u;
  }, t.prototype.size = function() {
    return this._size.slice(0);
  }, t.prototype._forEach = function(u) {
    var f = this, m = f.size();
    if (m.length === 1) {
      for (var v = 0; v < m[0]; v++)
        u(f._data, v, [v]);
      return;
    }
    var p = Array(m.length).fill(0), d = Array(m.length - 1), b = d.length - 1;
    d[0] = f._data[0];
    for (var x = 0; x < b; x++)
      d[x + 1] = d[x][0];
    for (p[b] = -1; ; ) {
      var D = void 0;
      for (D = b; D >= 0; D--) {
        if (p[D]++, p[D] === m[D]) {
          p[D] = 0;
          continue;
        }
        d[D] = D === 0 ? f._data[p[D]] : d[D - 1][p[D]];
        for (var h = D; h < b; h++)
          d[h + 1] = d[h][0];
        for (var w = 0; w < m[d.length]; w++)
          p[d.length] = w, u(d[b], w, p.slice(0));
        break;
      }
      if (D === -1)
        break;
    }
  }, t.prototype.map = function(u) {
    var f = this, m = new t(f), v = dt(u, f._data, "map");
    return m._forEach(function(p, d, b) {
      p[d] = v(p[d], b, f);
    }), m;
  }, t.prototype.forEach = function(u) {
    var f = this, m = dt(u, f._data, "map");
    f._forEach(function(v, p, d) {
      m(v[p], d, f);
    });
  }, t.prototype[Symbol.iterator] = function* () {
    var u = function* (m, v) {
      if (Ze(m))
        for (var p = 0; p < m.length; p++)
          yield* u(m[p], v.concat(p));
      else
        yield {
          value: m,
          index: v
        };
    };
    yield* u(this._data, []);
  }, t.prototype.rows = function() {
    var u = [], f = this.size();
    if (f.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    var m = this._data;
    for (var v of m)
      u.push(new t([v], this._datatype));
    return u;
  }, t.prototype.columns = function() {
    var u = this, f = [], m = this.size();
    if (m.length !== 2)
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    for (var v = this._data, p = function(x) {
      var D = v.map((h) => [h[x]]);
      f.push(new t(D, u._datatype));
    }, d = 0; d < m[1]; d++)
      p(d);
    return f;
  }, t.prototype.toArray = function() {
    return Me(this._data);
  }, t.prototype.valueOf = function() {
    return this._data;
  }, t.prototype.format = function(u) {
    return Pe(this._data, u);
  }, t.prototype.toString = function() {
    return Pe(this._data);
  }, t.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, t.prototype.diagonal = function(u) {
    if (u) {
      if (Be(u) && (u = u.toNumber()), !Oe(u) || !Ae(u))
        throw new TypeError("The parameter k must be an integer number");
    } else
      u = 0;
    for (var f = u > 0 ? u : 0, m = u < 0 ? -u : 0, v = this._size[0], p = this._size[1], d = Math.min(v - m, p - f), b = [], x = 0; x < d; x++)
      b[x] = this._data[x + m][x + f];
    return new t({
      data: b,
      size: [d],
      datatype: this._datatype
    });
  }, t.diagonal = function(u, f, m, v) {
    if (!Ze(u))
      throw new TypeError("Array expected, size parameter");
    if (u.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (u = u.map(function(A) {
      if (Be(A) && (A = A.toNumber()), !Oe(A) || !Ae(A) || A < 1)
        throw new Error("Size values must be positive integers");
      return A;
    }), m) {
      if (Be(m) && (m = m.toNumber()), !Oe(m) || !Ae(m))
        throw new TypeError("The parameter k must be an integer number");
    } else
      m = 0;
    var p = m > 0 ? m : 0, d = m < 0 ? -m : 0, b = u[0], x = u[1], D = Math.min(b - d, x - p), h;
    if (Ze(f)) {
      if (f.length !== D)
        throw new Error("Invalid value array length");
      h = function(E) {
        return f[E];
      };
    } else if (Ce(f)) {
      var w = f.size();
      if (w.length !== 1 || w[0] !== D)
        throw new Error("Invalid matrix length");
      h = function(E) {
        return f.get([E]);
      };
    } else
      h = function() {
        return f;
      };
    v || (v = Be(h(0)) ? h(0).mul(0) : 0);
    var y = [];
    if (u.length > 0) {
      y = It(y, u, v);
      for (var g = 0; g < D; g++)
        y[g + d][g + p] = h(g);
    }
    return new t({
      data: y,
      size: [b, x]
    });
  }, t.fromJSON = function(u) {
    return new t(u);
  }, t.prototype.swapRows = function(u, f) {
    if (!Oe(u) || !Ae(u) || !Oe(f) || !Ae(f))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Xe(u, this._size[0]), Xe(f, this._size[0]), t._swapRows(u, f, this._data), this;
  }, t._swapRows = function(u, f, m) {
    var v = m[u];
    m[u] = m[f], m[f] = v;
  };
  function s(u) {
    return Ce(u) ? s(u.valueOf()) : Ze(u) ? u.map(s) : u;
  }
  return t;
}, {
  isClass: !0
}), Zi = "clone", vd = ["typed"], pd = /* @__PURE__ */ q(Zi, vd, (e) => {
  var {
    typed: r
  } = e;
  return r(Zi, {
    any: Me
  });
});
function Jc(e) {
  var r = e.length, t = e[0].length, n, a, i = [];
  for (a = 0; a < t; a++) {
    var o = [];
    for (n = 0; n < r; n++)
      o.push(e[n][a]);
    i.push(o);
  }
  return i;
}
function Ut(e) {
  for (var r = 0; r < e.length; r++)
    if (Cr(e[r]))
      return !0;
  return !1;
}
function Jr(e, r) {
  Ce(e) && (e = e.valueOf());
  for (var t = 0, n = e.length; t < n; t++) {
    var a = e[t];
    Array.isArray(a) ? Jr(a, r) : r(a);
  }
}
function ze(e, r, t) {
  return e && typeof e.map == "function" ? e.map(function(n) {
    return ze(n, r);
  }) : r(e);
}
function ca(e, r, t) {
  var n = Array.isArray(e) ? Te(e) : e.size();
  if (r < 0 || r >= n.length)
    throw new Br(r, n.length);
  return Ce(e) ? e.create(Gn(e.valueOf(), r, t), e.datatype()) : Gn(e, r, t);
}
function Gn(e, r, t) {
  var n, a, i, o;
  if (r <= 0)
    if (Array.isArray(e[0])) {
      for (o = Jc(e), a = [], n = 0; n < o.length; n++)
        a[n] = Gn(o[n], r - 1, t);
      return a;
    } else {
      for (i = e[0], n = 1; n < e.length; n++)
        i = t(i, e[n]);
      return i;
    }
  else {
    for (a = [], n = 0; n < e.length; n++)
      a[n] = Gn(e[n], r - 1, t);
    return a;
  }
}
function Vi(e, r, t, n, a, i, o, c, l, s, u) {
  var f = e._values, m = e._index, v = e._ptr, p, d, b, x;
  if (n)
    for (d = v[r], b = v[r + 1], p = d; p < b; p++)
      x = m[p], t[x] !== i ? (t[x] = i, o.push(x), n[x] = f[p]) : (n[x] = c(n[x], f[p]), a[x] = i);
  else
    for (d = v[r], b = v[r + 1], p = d; p < b; p++)
      x = m[p], t[x] !== i ? (t[x] = i, o.push(x)) : a[x] = i;
}
var Wi = "isInteger", dd = ["typed"], hd = /* @__PURE__ */ q(Wi, dd, (e) => {
  var {
    typed: r
  } = e;
  return r(Wi, {
    number: Ae,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function(n) {
      return n.isInt();
    },
    bigint: function(n) {
      return !0;
    },
    Fraction: function(n) {
      return n.d === 1 && isFinite(n.n);
    },
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Rr = "number", Lt = "number, number";
function Qc(e) {
  return Math.abs(e);
}
Qc.signature = Rr;
function Kc(e, r) {
  return e + r;
}
Kc.signature = Lt;
function jc(e, r) {
  return e - r;
}
jc.signature = Lt;
function ef(e, r) {
  return e * r;
}
ef.signature = Lt;
function rf(e) {
  return -e;
}
rf.signature = Rr;
function tf(e) {
  return e;
}
tf.signature = Rr;
function Jt(e) {
  return yv(e);
}
Jt.signature = Rr;
function nf(e) {
  return e * e * e;
}
nf.signature = Rr;
function af(e) {
  return Math.exp(e);
}
af.signature = Rr;
function of(e) {
  return bv(e);
}
of.signature = Rr;
function sf(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Parameters in function lcm must be integer numbers");
  if (e === 0 || r === 0)
    return 0;
  for (var t, n = e * r; r !== 0; )
    t = r, r = e % t, e = t;
  return Math.abs(n / e);
}
sf.signature = Lt;
function gd(e, r) {
  return Math.log(e);
}
function uf(e) {
  return hv(e);
}
uf.signature = Rr;
function lf(e) {
  return dv(e);
}
lf.signature = Rr;
function Yi(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2, t = r < 0;
  if (t && (r = -r), r === 0)
    throw new Error("Root must be non-zero");
  if (e < 0 && Math.abs(r) % 2 !== 1)
    throw new Error("Root must be odd when a is negative.");
  if (e === 0)
    return t ? 1 / 0 : 0;
  if (!isFinite(e))
    return t ? 0 : e;
  var n = Math.pow(Math.abs(e), 1 / r);
  return n = e < 0 ? -n : n, t ? 1 / n : n;
}
function Ia(e) {
  return rt(e);
}
Ia.signature = Rr;
function cf(e) {
  return e * e;
}
cf.signature = Rr;
function ff(e, r) {
  var t, n, a, i = 0, o = 1, c = 1, l = 0;
  if (!Ae(e) || !Ae(r))
    throw new Error("Parameters in function xgcd must be integer numbers");
  for (; r; )
    n = Math.floor(e / r), a = e - n * r, t = i, i = o - n * i, o = t, t = c, c = l - n * c, l = t, e = r, r = a;
  var s;
  return e < 0 ? s = [-e, -o, -l] : s = [e, e ? o : 0, l], s;
}
ff.signature = Lt;
function mf(e, r) {
  return e * e < 1 && r === 1 / 0 || e * e > 1 && r === -1 / 0 ? 0 : Math.pow(e, r);
}
mf.signature = Lt;
function Yt(e) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!Ae(r) || r < 0 || r > 15)
    throw new Error("Number of decimals in function round must be an integer from 0 to 15 inclusive");
  return parseFloat(Sc(e, r));
}
var yd = "number", kt = "number, number";
function vf(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Integers expected in function bitAnd");
  return e & r;
}
vf.signature = kt;
function pf(e) {
  if (!Ae(e))
    throw new Error("Integer expected in function bitNot");
  return ~e;
}
pf.signature = yd;
function df(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Integers expected in function bitOr");
  return e | r;
}
df.signature = kt;
function hf(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Integers expected in function bitXor");
  return e ^ r;
}
hf.signature = kt;
function gf(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Integers expected in function leftShift");
  return e << r;
}
gf.signature = kt;
function yf(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Integers expected in function rightArithShift");
  return e >> r;
}
yf.signature = kt;
function bf(e, r) {
  if (!Ae(e) || !Ae(r))
    throw new Error("Integers expected in function rightLogShift");
  return e >>> r;
}
bf.signature = kt;
function Wr(e, r) {
  if (r < e)
    return 1;
  if (r === e)
    return r;
  var t = r + e >> 1;
  return Wr(e, t) * Wr(t + 1, r);
}
function xf(e, r) {
  if (!Ae(e) || e < 0)
    throw new TypeError("Positive integer value expected in function combinations");
  if (!Ae(r) || r < 0)
    throw new TypeError("Positive integer value expected in function combinations");
  if (r > e)
    throw new TypeError("k must be less than or equal to n");
  for (var t = e - r, n = 1, a = r < t ? t + 1 : r + 1, i = 2, o = r < t ? r : t, c = a; c <= e; ++c)
    for (n *= c; i <= o && n % i === 0; )
      n /= i, ++i;
  return i <= o && (n /= Wr(i, o)), n;
}
xf.signature = "number, number";
var bd = Math.PI, xd = 2 * Math.PI, wd = Math.E, Dd = 1.618033988749895, Nd = "number", ni = "number, number";
function wf(e) {
  return !e;
}
wf.signature = Nd;
function qa(e, r) {
  return !!(e || r);
}
qa.signature = ni;
function Ra(e, r) {
  return !!e != !!r;
}
Ra.signature = ni;
function za(e, r) {
  return !!(e && r);
}
za.signature = ni;
function Zn(e) {
  var r;
  if (Ae(e))
    return e <= 0 ? isFinite(e) ? 1 / 0 : NaN : e > 171 ? 1 / 0 : Wr(1, e - 1);
  if (e < 0.5)
    return Math.PI / (Math.sin(Math.PI * e) * Zn(1 - e));
  if (e >= 171.35)
    return 1 / 0;
  if (e > 85) {
    var t = e * e, n = t * e, a = n * e, i = a * e;
    return Math.sqrt(2 * Math.PI / e) * Math.pow(e / Math.E, e) * (1 + 1 / (12 * e) + 1 / (288 * t) - 139 / (51840 * n) - 571 / (2488320 * a) + 163879 / (209018880 * i) + 5246819 / (75246796800 * i * e));
  }
  --e, r = Tt[0];
  for (var o = 1; o < Tt.length; ++o)
    r += Tt[o] / (e + o);
  var c = e + Df + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(c, e + 0.5) * Math.exp(-c) * r;
}
Zn.signature = "number";
var Df = 4.7421875, Tt = [0.9999999999999971, 57.15623566586292, -59.59796035547549, 14.136097974741746, -0.4919138160976202, 3399464998481189e-20, 4652362892704858e-20, -9837447530487956e-20, 1580887032249125e-19, -21026444172410488e-20, 21743961811521265e-20, -1643181065367639e-19, 8441822398385275e-20, -26190838401581408e-21, 36899182659531625e-22], Nf = 0.9189385332046728, Ad = 5, Ed = 7, Xi = [1.000000000190015, 76.18009172947146, -86.50532032941678, 24.01409824083091, -1.231739572450155, 0.001208650973866179, -5395239384953e-18];
function Vn(e) {
  if (e < 0) return NaN;
  if (e === 0) return 1 / 0;
  if (!isFinite(e)) return e;
  if (e < 0.5)
    return Math.log(Math.PI / Math.sin(Math.PI * e)) - Vn(1 - e);
  e = e - 1;
  for (var r = e + Ad + 0.5, t = Xi[0], n = Ed - 1; n >= 1; n--)
    t += Xi[n] / (e + n);
  return Nf + (e + 0.5) * Math.log(r) - r + Math.log(t);
}
Vn.signature = "number";
var dr = "number";
function Af(e) {
  return Nv(e);
}
Af.signature = dr;
function Ef(e) {
  return Math.atan(1 / e);
}
Ef.signature = dr;
function Sf(e) {
  return isFinite(e) ? (Math.log((e + 1) / e) + Math.log(e / (e - 1))) / 2 : 0;
}
Sf.signature = dr;
function Cf(e) {
  return Math.asin(1 / e);
}
Cf.signature = dr;
function Mf(e) {
  var r = 1 / e;
  return Math.log(r + Math.sqrt(r * r + 1));
}
Mf.signature = dr;
function _f(e) {
  return Math.acos(1 / e);
}
_f.signature = dr;
function Ff(e) {
  var r = 1 / e, t = Math.sqrt(r * r - 1);
  return Math.log(t + r);
}
Ff.signature = dr;
function Tf(e) {
  return Av(e);
}
Tf.signature = dr;
function Bf(e) {
  return Ev(e);
}
Bf.signature = dr;
function Of(e) {
  return 1 / Math.tan(e);
}
Of.signature = dr;
function $f(e) {
  var r = Math.exp(2 * e);
  return (r + 1) / (r - 1);
}
$f.signature = dr;
function If(e) {
  return 1 / Math.sin(e);
}
If.signature = dr;
function qf(e) {
  return e === 0 ? Number.POSITIVE_INFINITY : Math.abs(2 / (Math.exp(e) - Math.exp(-e))) * rt(e);
}
qf.signature = dr;
function Rf(e) {
  return 1 / Math.cos(e);
}
Rf.signature = dr;
function zf(e) {
  return 2 / (Math.exp(e) + Math.exp(-e));
}
zf.signature = dr;
function Pf(e) {
  return Cv(e);
}
Pf.signature = dr;
var ai = "number";
function Uf(e) {
  return e < 0;
}
Uf.signature = ai;
function Lf(e) {
  return e > 0;
}
Lf.signature = ai;
function kf(e) {
  return Number.isNaN(e);
}
kf.signature = ai;
function Nr(e, r) {
  var t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (t <= 0)
    throw new Error("Relative tolerance must be greater than 0");
  if (n < 0)
    throw new Error("Absolute tolerance must be at least 0");
  return e.isNaN() || r.isNaN() ? !1 : !e.isFinite() || !r.isFinite() ? e.eq(r) : e.eq(r) ? !0 : e.minus(r).abs().lte(e.constructor.max(e.constructor.max(e.abs(), r.abs()).mul(t), n));
}
var Ji = "isNegative", Sd = ["typed", "config"], Cd = /* @__PURE__ */ q(Ji, Sd, (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(Ji, {
    number: (n) => lr(n, 0, t.relTol, t.absTol) ? !1 : Uf(n),
    BigNumber: (n) => Nr(n, new n.constructor(0), t.relTol, t.absTol) ? !1 : n.isNeg() && !n.isZero() && !n.isNaN(),
    bigint: (n) => n < 0n,
    Fraction: (n) => n.s < 0,
    // It's enough to decide on the sign
    Unit: r.referToSelf((n) => (a) => r.find(n, a.valueType())(a.value)),
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), Qi = "isNumeric", Md = ["typed"], _d = /* @__PURE__ */ q(Qi, Md, (e) => {
  var {
    typed: r
  } = e;
  return r(Qi, {
    "number | BigNumber | bigint | Fraction | boolean": () => !0,
    "Complex | Unit | string | null | undefined | Node": () => !1,
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Ki = "hasNumericValue", Fd = ["typed", "isNumeric"], Td = /* @__PURE__ */ q(Ki, Fd, (e) => {
  var {
    typed: r,
    isNumeric: t
  } = e;
  return r(Ki, {
    boolean: () => !0,
    string: function(a) {
      return a.trim().length > 0 && !isNaN(Number(a));
    },
    any: function(a) {
      return t(a);
    }
  });
}), ji = "isPositive", Bd = ["typed", "config"], Od = /* @__PURE__ */ q(ji, Bd, (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(ji, {
    number: (n) => lr(n, 0, t.relTol, t.absTol) ? !1 : Lf(n),
    BigNumber: (n) => Nr(n, new n.constructor(0), t.relTol, t.absTol) ? !1 : !n.isNeg() && !n.isZero() && !n.isNaN(),
    bigint: (n) => n > 0n,
    Fraction: (n) => n.s > 0 && n.n > 0,
    Unit: r.referToSelf((n) => (a) => r.find(n, a.valueType())(a.value)),
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), eo = "isZero", $d = ["typed", "equalScalar"], Id = /* @__PURE__ */ q(eo, $d, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return r(eo, {
    "number | BigNumber | Complex | Fraction": (n) => t(n, 0),
    bigint: (n) => n === 0n,
    Unit: r.referToSelf((n) => (a) => r.find(n, a.valueType())(a.value)),
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), ro = "isNaN", qd = ["typed"], Rd = /* @__PURE__ */ q(ro, qd, (e) => {
  var {
    typed: r
  } = e;
  return r(ro, {
    number: kf,
    BigNumber: function(n) {
      return n.isNaN();
    },
    bigint: function(n) {
      return !1;
    },
    Fraction: function(n) {
      return !1;
    },
    Complex: function(n) {
      return n.isNaN();
    },
    Unit: function(n) {
      return Number.isNaN(n.value);
    },
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), to = "typeOf", zd = ["typed"], Pd = /* @__PURE__ */ q(to, zd, (e) => {
  var {
    typed: r
  } = e;
  return r(to, {
    any: Je
  });
});
function Ud(e, r, t, n) {
  return lr(e.re, r.re, t, n) && lr(e.im, r.im, t, n);
}
var Ht = /* @__PURE__ */ q("compareUnits", ["typed"], (e) => {
  var {
    typed: r
  } = e;
  return {
    "Unit, Unit": r.referToSelf((t) => (n, a) => {
      if (!n.equalBase(a))
        throw new Error("Cannot compare units with different base");
      return r.find(t, [n.valueType(), a.valueType()])(n.value, a.value);
    })
  };
}), Wn = "equalScalar", Ld = ["typed", "config"], kd = /* @__PURE__ */ q(Wn, Ld, (e) => {
  var {
    typed: r,
    config: t
  } = e, n = Ht({
    typed: r
  });
  return r(Wn, {
    "boolean, boolean": function(i, o) {
      return i === o;
    },
    "number, number": function(i, o) {
      return lr(i, o, t.relTol, t.absTol);
    },
    "BigNumber, BigNumber": function(i, o) {
      return i.eq(o) || Nr(i, o, t.relTol, t.absTol);
    },
    "bigint, bigint": function(i, o) {
      return i === o;
    },
    "Fraction, Fraction": function(i, o) {
      return i.equals(o);
    },
    "Complex, Complex": function(i, o) {
      return Ud(i, o, t.relTol, t.absTol);
    }
  }, n);
});
q(Wn, ["typed", "config"], (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(Wn, {
    "number, number": function(a, i) {
      return lr(a, i, t.relTol, t.absTol);
    }
  });
});
var Hd = "SparseMatrix", Gd = ["typed", "equalScalar", "Matrix"], Zd = /* @__PURE__ */ q(Hd, Gd, (e) => {
  var {
    typed: r,
    equalScalar: t,
    Matrix: n
  } = e;
  function a(d, b) {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (b && !sr(b))
      throw new Error("Invalid datatype: " + b);
    if (Ce(d))
      i(this, d, b);
    else if (d && Ze(d.index) && Ze(d.ptr) && Ze(d.size))
      this._values = d.values, this._index = d.index, this._ptr = d.ptr, this._size = d.size, this._datatype = b || d.datatype;
    else if (Ze(d))
      o(this, d, b);
    else {
      if (d)
        throw new TypeError("Unsupported type of data (" + Je(d) + ")");
      this._values = [], this._index = [], this._ptr = [0], this._size = [0, 0], this._datatype = b;
    }
  }
  function i(d, b, x) {
    b.type === "SparseMatrix" ? (d._values = b._values ? Me(b._values) : void 0, d._index = Me(b._index), d._ptr = Me(b._ptr), d._size = Me(b._size), d._datatype = x || b._datatype) : o(d, b.valueOf(), x || b._datatype);
  }
  function o(d, b, x) {
    d._values = [], d._index = [], d._ptr = [], d._datatype = x;
    var D = b.length, h = 0, w = t, y = 0;
    if (sr(x) && (w = r.find(t, [x, x]) || t, y = r.convert(0, x)), D > 0) {
      var g = 0;
      do {
        d._ptr.push(d._index.length);
        for (var A = 0; A < D; A++) {
          var E = b[A];
          if (Ze(E)) {
            if (g === 0 && h < E.length && (h = E.length), g < E.length) {
              var N = E[g];
              w(N, y) || (d._values.push(N), d._index.push(A));
            }
          } else
            g === 0 && h < 1 && (h = 1), w(E, y) || (d._values.push(E), d._index.push(A));
        }
        g++;
      } while (g < h);
    }
    d._ptr.push(d._index.length), d._size = [D, h];
  }
  a.prototype = new n(), a.prototype.createSparseMatrix = function(d, b) {
    return new a(d, b);
  }, Object.defineProperty(a, "name", {
    value: "SparseMatrix"
  }), a.prototype.constructor = a, a.prototype.type = "SparseMatrix", a.prototype.isSparseMatrix = !0, a.prototype.getDataType = function() {
    return la(this._values, Je);
  }, a.prototype.storage = function() {
    return "sparse";
  }, a.prototype.datatype = function() {
    return this._datatype;
  }, a.prototype.create = function(d, b) {
    return new a(d, b);
  }, a.prototype.density = function() {
    var d = this._size[0], b = this._size[1];
    return d !== 0 && b !== 0 ? this._index.length / (d * b) : 0;
  }, a.prototype.subset = function(d, b, x) {
    if (!this._values)
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    switch (arguments.length) {
      case 1:
        return c(this, d);
      case 2:
      case 3:
        return l(this, d, b, x);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function c(d, b) {
    if (!on(b))
      throw new TypeError("Invalid index");
    var x = b.isScalar();
    if (x)
      return d.get(b.min());
    var D = b.size();
    if (D.length !== d._size.length)
      throw new Re(D.length, d._size.length);
    var h, w, y, g, A = b.min(), E = b.max();
    for (h = 0, w = d._size.length; h < w; h++)
      Xe(A[h], d._size[h]), Xe(E[h], d._size[h]);
    var N = d._values, S = d._index, C = d._ptr, T = b.dimension(0), O = b.dimension(1), I = [], $ = [];
    T.forEach(function(B, W) {
      $[B] = W[0], I[B] = !0;
    });
    var F = N ? [] : void 0, _ = [], L = [];
    return O.forEach(function(B) {
      for (L.push(_.length), y = C[B], g = C[B + 1]; y < g; y++)
        h = S[y], I[h] === !0 && (_.push($[h]), F && F.push(N[y]));
    }), L.push(_.length), new a({
      values: F,
      index: _,
      ptr: L,
      size: D,
      datatype: d._datatype
    });
  }
  function l(d, b, x, D) {
    if (!b || b.isIndex !== !0)
      throw new TypeError("Invalid index");
    var h = b.size(), w = b.isScalar(), y;
    if (Ce(x) ? (y = x.size(), x = x.toArray()) : y = Te(x), w) {
      if (y.length !== 0)
        throw new TypeError("Scalar expected");
      d.set(b.min(), x, D);
    } else {
      if (h.length !== 1 && h.length !== 2)
        throw new Re(h.length, d._size.length, "<");
      if (y.length < h.length) {
        for (var g = 0, A = 0; h[g] === 1 && y[g] === 1; )
          g++;
        for (; h[g] === 1; )
          A++, g++;
        x = Gc(x, h.length, A, y);
      }
      if (!Xr(h, y))
        throw new Re(h, y, ">");
      if (h.length === 1) {
        var E = b.dimension(0);
        E.forEach(function(C, T) {
          Xe(C), d.set([C, 0], x[T[0]], D);
        });
      } else {
        var N = b.dimension(0), S = b.dimension(1);
        N.forEach(function(C, T) {
          Xe(C), S.forEach(function(O, I) {
            Xe(O), d.set([C, O], x[T[0]][I[0]], D);
          });
        });
      }
    }
    return d;
  }
  a.prototype.get = function(d) {
    if (!Ze(d))
      throw new TypeError("Array expected");
    if (d.length !== this._size.length)
      throw new Re(d.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke get on a Pattern only matrix");
    var b = d[0], x = d[1];
    Xe(b, this._size[0]), Xe(x, this._size[1]);
    var D = s(b, this._ptr[x], this._ptr[x + 1], this._index);
    return D < this._ptr[x + 1] && this._index[D] === b ? this._values[D] : 0;
  }, a.prototype.set = function(d, b, x) {
    if (!Ze(d))
      throw new TypeError("Array expected");
    if (d.length !== this._size.length)
      throw new Re(d.length, this._size.length);
    if (!this._values)
      throw new Error("Cannot invoke set on a Pattern only matrix");
    var D = d[0], h = d[1], w = this._size[0], y = this._size[1], g = t, A = 0;
    sr(this._datatype) && (g = r.find(t, [this._datatype, this._datatype]) || t, A = r.convert(0, this._datatype)), (D > w - 1 || h > y - 1) && (m(this, Math.max(D + 1, w), Math.max(h + 1, y), x), w = this._size[0], y = this._size[1]), Xe(D, w), Xe(h, y);
    var E = s(D, this._ptr[h], this._ptr[h + 1], this._index);
    return E < this._ptr[h + 1] && this._index[E] === D ? g(b, A) ? u(E, h, this._values, this._index, this._ptr) : this._values[E] = b : g(b, A) || f(E, D, h, b, this._values, this._index, this._ptr), this;
  };
  function s(d, b, x, D) {
    if (x - b === 0)
      return x;
    for (var h = b; h < x; h++)
      if (D[h] === d)
        return h;
    return b;
  }
  function u(d, b, x, D, h) {
    x.splice(d, 1), D.splice(d, 1);
    for (var w = b + 1; w < h.length; w++)
      h[w]--;
  }
  function f(d, b, x, D, h, w, y) {
    h.splice(d, 0, D), w.splice(d, 0, b);
    for (var g = x + 1; g < y.length; g++)
      y[g]++;
  }
  a.prototype.resize = function(d, b, x) {
    if (!Cr(d))
      throw new TypeError("Array or Matrix expected");
    var D = d.valueOf().map((w) => Array.isArray(w) && w.length === 1 ? w[0] : w);
    if (D.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    D.forEach(function(w) {
      if (!Oe(w) || !Ae(w) || w < 0)
        throw new TypeError("Invalid size, must contain positive integers (size: " + Pe(D) + ")");
    });
    var h = x ? this.clone() : this;
    return m(h, D[0], D[1], b);
  };
  function m(d, b, x, D) {
    var h = D || 0, w = t, y = 0;
    sr(d._datatype) && (w = r.find(t, [d._datatype, d._datatype]) || t, y = r.convert(0, d._datatype), h = r.convert(h, d._datatype));
    var g = !w(h, y), A = d._size[0], E = d._size[1], N, S, C;
    if (x > E) {
      for (S = E; S < x; S++)
        if (d._ptr[S] = d._values.length, g)
          for (N = 0; N < A; N++)
            d._values.push(h), d._index.push(N);
      d._ptr[x] = d._values.length;
    } else x < E && (d._ptr.splice(x + 1, E - x), d._values.splice(d._ptr[x], d._values.length), d._index.splice(d._ptr[x], d._index.length));
    if (E = x, b > A) {
      if (g) {
        var T = 0;
        for (S = 0; S < E; S++) {
          d._ptr[S] = d._ptr[S] + T, C = d._ptr[S + 1] + T;
          var O = 0;
          for (N = A; N < b; N++, O++)
            d._values.splice(C + O, 0, h), d._index.splice(C + O, 0, N), T++;
        }
        d._ptr[E] = d._values.length;
      }
    } else if (b < A) {
      var I = 0;
      for (S = 0; S < E; S++) {
        d._ptr[S] = d._ptr[S] - I;
        var $ = d._ptr[S], F = d._ptr[S + 1] - I;
        for (C = $; C < F; C++)
          N = d._index[C], N > b - 1 && (d._values.splice(C, 1), d._index.splice(C, 1), I++);
      }
      d._ptr[S] = d._values.length;
    }
    return d._size[0] = b, d._size[1] = x, d;
  }
  a.prototype.reshape = function(d, b) {
    if (!Ze(d))
      throw new TypeError("Array expected");
    if (d.length !== 2)
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    d.forEach(function(B) {
      if (!Oe(B) || !Ae(B) || B <= -2 || B === 0)
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + Pe(d) + ")");
    });
    var x = this._size[0] * this._size[1];
    d = ja(d, x);
    var D = d[0] * d[1];
    if (x !== D)
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    var h = b ? this.clone() : this;
    if (this._size[0] === d[0] && this._size[1] === d[1])
      return h;
    for (var w = [], y = 0; y < h._ptr.length; y++)
      for (var g = 0; g < h._ptr[y + 1] - h._ptr[y]; g++)
        w.push(y);
    for (var A = h._values.slice(), E = h._index.slice(), N = 0; N < h._index.length; N++) {
      var S = E[N], C = w[N], T = S * h._size[1] + C;
      w[N] = T % d[1], E[N] = Math.floor(T / d[1]);
    }
    h._values.length = 0, h._index.length = 0, h._ptr.length = d[1] + 1, h._size = d.slice();
    for (var O = 0; O < h._ptr.length; O++)
      h._ptr[O] = 0;
    for (var I = 0; I < A.length; I++) {
      var $ = E[I], F = w[I], _ = A[I], L = s($, h._ptr[F], h._ptr[F + 1], h._index);
      f(L, $, F, _, h._values, h._index, h._ptr);
    }
    return h;
  }, a.prototype.clone = function() {
    var d = new a({
      values: this._values ? Me(this._values) : void 0,
      index: Me(this._index),
      ptr: Me(this._ptr),
      size: Me(this._size),
      datatype: this._datatype
    });
    return d;
  }, a.prototype.size = function() {
    return this._size.slice(0);
  }, a.prototype.map = function(d, b) {
    if (!this._values)
      throw new Error("Cannot invoke map on a Pattern only matrix");
    var x = this, D = this._size[0], h = this._size[1], w = dt(d, x, "map"), y = function(A, E, N) {
      return w(A, [E, N], x);
    };
    return v(this, 0, D - 1, 0, h - 1, y, b);
  };
  function v(d, b, x, D, h, w, y) {
    var g = [], A = [], E = [], N = t, S = 0;
    sr(d._datatype) && (N = r.find(t, [d._datatype, d._datatype]) || t, S = r.convert(0, d._datatype));
    for (var C = function(z, J, le) {
      var K = w(z, J, le);
      N(K, S) || (g.push(K), A.push(J));
    }, T = D; T <= h; T++) {
      E.push(g.length);
      var O = d._ptr[T], I = d._ptr[T + 1];
      if (y)
        for (var $ = O; $ < I; $++) {
          var F = d._index[$];
          F >= b && F <= x && C(d._values[$], F - b, T - D);
        }
      else {
        for (var _ = {}, L = O; L < I; L++) {
          var B = d._index[L];
          _[B] = d._values[L];
        }
        for (var W = b; W <= x; W++) {
          var Q = W in _ ? _[W] : 0;
          C(Q, W - b, T - D);
        }
      }
    }
    return E.push(g.length), new a({
      values: g,
      index: A,
      ptr: E,
      size: [x - b + 1, h - D + 1]
    });
  }
  a.prototype.forEach = function(d, b) {
    if (!this._values)
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    for (var x = this, D = this._size[0], h = this._size[1], w = dt(d, x, "forEach"), y = 0; y < h; y++) {
      var g = this._ptr[y], A = this._ptr[y + 1];
      if (b)
        for (var E = g; E < A; E++) {
          var N = this._index[E];
          w(this._values[E], [N, y], x);
        }
      else {
        for (var S = {}, C = g; C < A; C++) {
          var T = this._index[C];
          S[T] = this._values[C];
        }
        for (var O = 0; O < D; O++) {
          var I = O in S ? S[O] : 0;
          w(I, [O, y], x);
        }
      }
    }
  }, a.prototype[Symbol.iterator] = function* () {
    if (!this._values)
      throw new Error("Cannot iterate a Pattern only matrix");
    for (var d = this._size[1], b = 0; b < d; b++)
      for (var x = this._ptr[b], D = this._ptr[b + 1], h = x; h < D; h++) {
        var w = this._index[h];
        yield {
          value: this._values[h],
          index: [w, b]
        };
      }
  }, a.prototype.toArray = function() {
    return p(this._values, this._index, this._ptr, this._size, !0);
  }, a.prototype.valueOf = function() {
    return p(this._values, this._index, this._ptr, this._size, !1);
  };
  function p(d, b, x, D, h) {
    var w = D[0], y = D[1], g = [], A, E;
    for (A = 0; A < w; A++)
      for (g[A] = [], E = 0; E < y; E++)
        g[A][E] = 0;
    for (E = 0; E < y; E++)
      for (var N = x[E], S = x[E + 1], C = N; C < S; C++)
        A = b[C], g[A][E] = d ? h ? Me(d[C]) : d[C] : 1;
    return g;
  }
  return a.prototype.format = function(d) {
    for (var b = this._size[0], x = this._size[1], D = this.density(), h = "Sparse Matrix [" + Pe(b, d) + " x " + Pe(x, d) + "] density: " + Pe(D, d) + `
`, w = 0; w < x; w++)
      for (var y = this._ptr[w], g = this._ptr[w + 1], A = y; A < g; A++) {
        var E = this._index[A];
        h += `
    (` + Pe(E, d) + ", " + Pe(w, d) + ") ==> " + (this._values ? Pe(this._values[A], d) : "X");
      }
    return h;
  }, a.prototype.toString = function() {
    return Pe(this.toArray());
  }, a.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  }, a.prototype.diagonal = function(d) {
    if (d) {
      if (Be(d) && (d = d.toNumber()), !Oe(d) || !Ae(d))
        throw new TypeError("The parameter k must be an integer number");
    } else
      d = 0;
    var b = d > 0 ? d : 0, x = d < 0 ? -d : 0, D = this._size[0], h = this._size[1], w = Math.min(D - x, h - b), y = [], g = [], A = [];
    A[0] = 0;
    for (var E = b; E < h && y.length < w; E++)
      for (var N = this._ptr[E], S = this._ptr[E + 1], C = N; C < S; C++) {
        var T = this._index[C];
        if (T === E - b + x) {
          y.push(this._values[C]), g[y.length - 1] = T - x;
          break;
        }
      }
    return A.push(y.length), new a({
      values: y,
      index: g,
      ptr: A,
      size: [w, 1]
    });
  }, a.fromJSON = function(d) {
    return new a(d);
  }, a.diagonal = function(d, b, x, D, h) {
    if (!Ze(d))
      throw new TypeError("Array expected, size parameter");
    if (d.length !== 2)
      throw new Error("Only two dimensions matrix are supported");
    if (d = d.map(function(B) {
      if (Be(B) && (B = B.toNumber()), !Oe(B) || !Ae(B) || B < 1)
        throw new Error("Size values must be positive integers");
      return B;
    }), x) {
      if (Be(x) && (x = x.toNumber()), !Oe(x) || !Ae(x))
        throw new TypeError("The parameter k must be an integer number");
    } else
      x = 0;
    var w = t, y = 0;
    sr(h) && (w = r.find(t, [h, h]) || t, y = r.convert(0, h));
    var g = x > 0 ? x : 0, A = x < 0 ? -x : 0, E = d[0], N = d[1], S = Math.min(E - A, N - g), C;
    if (Ze(b)) {
      if (b.length !== S)
        throw new Error("Invalid value array length");
      C = function(W) {
        return b[W];
      };
    } else if (Ce(b)) {
      var T = b.size();
      if (T.length !== 1 || T[0] !== S)
        throw new Error("Invalid matrix length");
      C = function(W) {
        return b.get([W]);
      };
    } else
      C = function() {
        return b;
      };
    for (var O = [], I = [], $ = [], F = 0; F < N; F++) {
      $.push(O.length);
      var _ = F - g;
      if (_ >= 0 && _ < S) {
        var L = C(_);
        w(L, y) || (I.push(_ + A), O.push(L));
      }
    }
    return $.push(O.length), new a({
      values: O,
      index: I,
      ptr: $,
      size: [E, N]
    });
  }, a.prototype.swapRows = function(d, b) {
    if (!Oe(d) || !Ae(d) || !Oe(b) || !Ae(b))
      throw new Error("Row index must be positive integers");
    if (this._size.length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    return Xe(d, this._size[0]), Xe(b, this._size[0]), a._swapRows(d, b, this._size[1], this._values, this._index, this._ptr), this;
  }, a._forEachRow = function(d, b, x, D, h) {
    for (var w = D[d], y = D[d + 1], g = w; g < y; g++)
      h(x[g], b[g]);
  }, a._swapRows = function(d, b, x, D, h, w) {
    for (var y = 0; y < x; y++) {
      var g = w[y], A = w[y + 1], E = s(d, g, A, h), N = s(b, g, A, h);
      if (E < A && N < A && h[E] === d && h[N] === b) {
        if (D) {
          var S = D[E];
          D[E] = D[N], D[N] = S;
        }
        continue;
      }
      if (E < A && h[E] === d && (N >= A || h[N] !== b)) {
        var C = D ? D[E] : void 0;
        h.splice(N, 0, b), D && D.splice(N, 0, C), h.splice(N <= E ? E + 1 : E, 1), D && D.splice(N <= E ? E + 1 : E, 1);
        continue;
      }
      if (N < A && h[N] === b && (E >= A || h[E] !== d)) {
        var T = D ? D[N] : void 0;
        h.splice(E, 0, d), D && D.splice(E, 0, T), h.splice(E <= N ? N + 1 : N, 1), D && D.splice(E <= N ? N + 1 : N, 1);
      }
    }
  }, a;
}, {
  isClass: !0
}), Vd = "number", Wd = ["typed"];
function Yd(e) {
  var r = e.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (r) {
    var t = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[r[1]], n = r[2], a = r[3];
    return {
      input: e,
      radix: t,
      integerPart: n,
      fractionalPart: a
    };
  } else
    return null;
}
function Xd(e) {
  for (var r = parseInt(e.integerPart, e.radix), t = 0, n = 0; n < e.fractionalPart.length; n++) {
    var a = parseInt(e.fractionalPart[n], e.radix);
    t += a / Math.pow(e.radix, n + 1);
  }
  var i = r + t;
  if (isNaN(i))
    throw new SyntaxError('String "' + e.input + '" is not a valid number');
  return i;
}
var Jd = /* @__PURE__ */ q(Vd, Wd, (e) => {
  var {
    typed: r
  } = e, t = r("number", {
    "": function() {
      return 0;
    },
    number: function(a) {
      return a;
    },
    string: function(a) {
      if (a === "NaN") return NaN;
      var i = Yd(a);
      if (i)
        return Xd(i);
      var o = 0, c = a.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      c && (o = Number(c[2]), a = c[1]);
      var l = Number(a);
      if (isNaN(l))
        throw new SyntaxError('String "' + a + '" is not a valid number');
      if (c) {
        if (l > 2 ** o - 1)
          throw new SyntaxError('String "'.concat(a, '" is out of range'));
        l >= 2 ** (o - 1) && (l = l - 2 ** o);
      }
      return l;
    },
    BigNumber: function(a) {
      return a.toNumber();
    },
    bigint: function(a) {
      return Number(a);
    },
    Fraction: function(a) {
      return a.valueOf();
    },
    Unit: r.referToSelf((n) => (a) => {
      var i = a.clone();
      return i.value = n(a.value), i;
    }),
    null: function(a) {
      return 0;
    },
    "Unit, string | Unit": function(a, i) {
      return a.toNumber(i);
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
  return t.fromJSON = function(n) {
    return parseFloat(n.value);
  }, t;
}), Qd = "bigint", Kd = ["typed"], jd = /* @__PURE__ */ q(Qd, Kd, (e) => {
  var {
    typed: r
  } = e, t = r("bigint", {
    "": function() {
      return 0n;
    },
    bigint: function(a) {
      return a;
    },
    number: function(a) {
      return BigInt(a.toFixed());
    },
    BigNumber: function(a) {
      return BigInt(a.round().toString());
    },
    Fraction: function(a) {
      return BigInt(a.valueOf().toFixed());
    },
    "string | boolean": function(a) {
      return BigInt(a);
    },
    null: function(a) {
      return 0n;
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
  return t.fromJSON = function(n) {
    return BigInt(n.value);
  }, t;
}), no = "string", eh = ["typed"], rh = /* @__PURE__ */ q(no, eh, (e) => {
  var {
    typed: r
  } = e;
  return r(no, {
    "": function() {
      return "";
    },
    number: pt,
    null: function(n) {
      return "null";
    },
    boolean: function(n) {
      return n + "";
    },
    string: function(n) {
      return n;
    },
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t)),
    any: function(n) {
      return String(n);
    }
  });
}), ao = "boolean", th = ["typed"], nh = /* @__PURE__ */ q(ao, th, (e) => {
  var {
    typed: r
  } = e;
  return r(ao, {
    "": function() {
      return !1;
    },
    boolean: function(n) {
      return n;
    },
    number: function(n) {
      return !!n;
    },
    null: function(n) {
      return !1;
    },
    BigNumber: function(n) {
      return !n.isZero();
    },
    string: function(n) {
      var a = n.toLowerCase();
      if (a === "true")
        return !0;
      if (a === "false")
        return !1;
      var i = Number(n);
      if (n !== "" && !isNaN(i))
        return !!i;
      throw new Error('Cannot convert "' + n + '" to a boolean');
    },
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), ah = "bignumber", ih = ["typed", "BigNumber"], oh = /* @__PURE__ */ q(ah, ih, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e;
  return r("bignumber", {
    "": function() {
      return new t(0);
    },
    number: function(a) {
      return new t(a + "");
    },
    string: function(a) {
      var i = a.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (i) {
        var o = i[2], c = t(i[1]), l = new t(2).pow(Number(o));
        if (c.gt(l.sub(1)))
          throw new SyntaxError('String "'.concat(a, '" is out of range'));
        var s = new t(2).pow(Number(o) - 1);
        return c.gte(s) ? c.sub(l) : c;
      }
      return new t(a);
    },
    BigNumber: function(a) {
      return a;
    },
    bigint: function(a) {
      return new t(a.toString());
    },
    Unit: r.referToSelf((n) => (a) => {
      var i = a.clone();
      return i.value = n(a.value), i;
    }),
    Fraction: function(a) {
      return new t(a.n).div(a.d).times(a.s);
    },
    null: function(a) {
      return new t(0);
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), sh = "complex", uh = ["typed", "Complex"], lh = /* @__PURE__ */ q(sh, uh, (e) => {
  var {
    typed: r,
    Complex: t
  } = e;
  return r("complex", {
    "": function() {
      return t.ZERO;
    },
    number: function(a) {
      return new t(a, 0);
    },
    "number, number": function(a, i) {
      return new t(a, i);
    },
    // TODO: this signature should be redundant
    "BigNumber, BigNumber": function(a, i) {
      return new t(a.toNumber(), i.toNumber());
    },
    Fraction: function(a) {
      return new t(a.valueOf(), 0);
    },
    Complex: function(a) {
      return a.clone();
    },
    string: function(a) {
      return t(a);
    },
    null: function(a) {
      return t(0);
    },
    Object: function(a) {
      if ("re" in a && "im" in a)
        return new t(a.re, a.im);
      if ("r" in a && "phi" in a || "abs" in a && "arg" in a)
        return new t(a);
      throw new Error("Expected object with properties (re and im) or (r and phi) or (abs and arg)");
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), ch = "fraction", fh = ["typed", "Fraction"], mh = /* @__PURE__ */ q(ch, fh, (e) => {
  var {
    typed: r,
    Fraction: t
  } = e;
  return r("fraction", {
    number: function(a) {
      if (!isFinite(a) || isNaN(a))
        throw new Error(a + " cannot be represented as a fraction");
      return new t(a);
    },
    string: function(a) {
      return new t(a);
    },
    "number, number": function(a, i) {
      return new t(a, i);
    },
    null: function(a) {
      return new t(0);
    },
    BigNumber: function(a) {
      return new t(a.toString());
    },
    bigint: function(a) {
      return new t(a.toString());
    },
    Fraction: function(a) {
      return a;
    },
    Unit: r.referToSelf((n) => (a) => {
      var i = a.clone();
      return i.value = n(a.value), i;
    }),
    Object: function(a) {
      return new t(a);
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), io = "matrix", vh = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"], ph = /* @__PURE__ */ q(io, vh, (e) => {
  var {
    typed: r,
    Matrix: t,
    DenseMatrix: n,
    SparseMatrix: a
  } = e;
  return r(io, {
    "": function() {
      return i([]);
    },
    string: function(c) {
      return i([], c);
    },
    "string, string": function(c, l) {
      return i([], c, l);
    },
    Array: function(c) {
      return i(c);
    },
    Matrix: function(c) {
      return i(c, c.storage());
    },
    "Array | Matrix, string": i,
    "Array | Matrix, string, string": i
  });
  function i(o, c, l) {
    if (c === "dense" || c === "default" || c === void 0)
      return new n(o, l);
    if (c === "sparse")
      return new a(o, l);
    throw new TypeError("Unknown matrix type " + JSON.stringify(c) + ".");
  }
}), oo = "matrixFromFunction", dh = ["typed", "matrix", "isZero"], hh = /* @__PURE__ */ q(oo, dh, (e) => {
  var {
    typed: r,
    matrix: t,
    isZero: n
  } = e;
  return r(oo, {
    "Array | Matrix, function, string, string": function(o, c, l, s) {
      return a(o, c, l, s);
    },
    "Array | Matrix, function, string": function(o, c, l) {
      return a(o, c, l);
    },
    "Matrix, function": function(o, c) {
      return a(o, c, "dense");
    },
    "Array, function": function(o, c) {
      return a(o, c, "dense").toArray();
    },
    "Array | Matrix, string, function": function(o, c, l) {
      return a(o, l, c);
    },
    "Array | Matrix, string, string, function": function(o, c, l, s) {
      return a(o, s, c, l);
    }
  });
  function a(i, o, c, l) {
    var s;
    return l !== void 0 ? s = t(c, l) : s = t(c), s.resize(i), s.forEach(function(u, f) {
      var m = o(f);
      n(m) || s.set(f, m);
    }), s;
  }
}), so = "matrixFromRows", gh = ["typed", "matrix", "flatten", "size"], yh = /* @__PURE__ */ q(so, gh, (e) => {
  var {
    typed: r,
    matrix: t,
    flatten: n,
    size: a
  } = e;
  return r(so, {
    "...Array": function(l) {
      return i(l);
    },
    "...Matrix": function(l) {
      return t(i(l.map((s) => s.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function i(c) {
    if (c.length === 0) throw new TypeError("At least one row is needed to construct a matrix.");
    var l = o(c[0]), s = [];
    for (var u of c) {
      var f = o(u);
      if (f !== l)
        throw new TypeError("The vectors had different length: " + (l | 0) + " ≠ " + (f | 0));
      s.push(n(u));
    }
    return s;
  }
  function o(c) {
    var l = a(c);
    if (l.length === 1)
      return l[0];
    if (l.length === 2) {
      if (l[0] === 1)
        return l[1];
      if (l[1] === 1)
        return l[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), uo = "matrixFromColumns", bh = ["typed", "matrix", "flatten", "size"], xh = /* @__PURE__ */ q(uo, bh, (e) => {
  var {
    typed: r,
    matrix: t,
    flatten: n,
    size: a
  } = e;
  return r(uo, {
    "...Array": function(l) {
      return i(l);
    },
    "...Matrix": function(l) {
      return t(i(l.map((s) => s.toArray())));
    }
    // TODO implement this properly for SparseMatrix
  });
  function i(c) {
    if (c.length === 0) throw new TypeError("At least one column is needed to construct a matrix.");
    for (var l = o(c[0]), s = [], u = 0; u < l; u++)
      s[u] = [];
    for (var f of c) {
      var m = o(f);
      if (m !== l)
        throw new TypeError("The vectors had different length: " + (l | 0) + " ≠ " + (m | 0));
      for (var v = n(f), p = 0; p < l; p++)
        s[p].push(v[p]);
    }
    return s;
  }
  function o(c) {
    var l = a(c);
    if (l.length === 1)
      return l[0];
    if (l.length === 2) {
      if (l[0] === 1)
        return l[1];
      if (l[1] === 1)
        return l[0];
      throw new TypeError("At least one of the arguments is not a vector.");
    } else
      throw new TypeError("Only one- or two-dimensional vectors are supported.");
  }
}), lo = "splitUnit", wh = ["typed"], Dh = /* @__PURE__ */ q(lo, wh, (e) => {
  var {
    typed: r
  } = e;
  return r(lo, {
    "Unit, Array": function(n, a) {
      return n.splitUnit(a);
    }
  });
}), co = "unaryMinus", Nh = ["typed"], Ah = /* @__PURE__ */ q(co, Nh, (e) => {
  var {
    typed: r
  } = e;
  return r(co, {
    number: rf,
    "Complex | BigNumber | Fraction": (t) => t.neg(),
    bigint: (t) => -t,
    Unit: r.referToSelf((t) => (n) => {
      var a = n.clone();
      return a.value = r.find(t, a.valueType())(n.value), a;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
    // TODO: add support for string
  });
}), fo = "unaryPlus", Eh = ["typed", "config", "numeric"], Sh = /* @__PURE__ */ q(fo, Eh, (e) => {
  var {
    typed: r,
    config: t,
    numeric: n
  } = e;
  return r(fo, {
    number: tf,
    Complex: function(i) {
      return i;
    },
    BigNumber: function(i) {
      return i;
    },
    bigint: function(i) {
      return i;
    },
    Fraction: function(i) {
      return i;
    },
    Unit: function(i) {
      return i.clone();
    },
    // deep map collection, skip zeros since unaryPlus(0) = 0
    "Array | Matrix": r.referToSelf((a) => (i) => ze(i, a)),
    boolean: function(i) {
      return n(i ? 1 : 0, t.number);
    },
    string: function(i) {
      return n(i, st(i, t));
    }
  });
}), mo = "abs", Ch = ["typed"], Mh = /* @__PURE__ */ q(mo, Ch, (e) => {
  var {
    typed: r
  } = e;
  return r(mo, {
    number: Qc,
    "Complex | BigNumber | Fraction | Unit": (t) => t.abs(),
    bigint: (t) => t < 0n ? -t : t,
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), vo = "apply", _h = ["typed", "isInteger"], ii = /* @__PURE__ */ q(vo, _h, (e) => {
  var {
    typed: r,
    isInteger: t
  } = e;
  return r(vo, {
    "Array | Matrix, number | BigNumber, function": function(a, i, o) {
      if (!t(i))
        throw new TypeError("Integer number expected for dimension");
      var c = Array.isArray(a) ? Te(a) : a.size();
      if (i < 0 || i >= c.length)
        throw new Br(i, c.length);
      return Ce(a) ? a.create(Yn(a.valueOf(), i, o), a.datatype()) : Yn(a, i, o);
    }
  });
});
function Yn(e, r, t) {
  var n, a, i;
  if (r <= 0)
    if (Array.isArray(e[0])) {
      for (i = Fh(e), a = [], n = 0; n < i.length; n++)
        a[n] = Yn(i[n], r - 1, t);
      return a;
    } else
      return t(e);
  else {
    for (a = [], n = 0; n < e.length; n++)
      a[n] = Yn(e[n], r - 1, t);
    return a;
  }
}
function Fh(e) {
  var r = e.length, t = e[0].length, n, a, i = [];
  for (a = 0; a < t; a++) {
    var o = [];
    for (n = 0; n < r; n++)
      o.push(e[n][a]);
    i.push(o);
  }
  return i;
}
var po = "addScalar", Th = ["typed"], Bh = /* @__PURE__ */ q(po, Th, (e) => {
  var {
    typed: r
  } = e;
  return r(po, {
    "number, number": Kc,
    "Complex, Complex": function(n, a) {
      return n.add(a);
    },
    "BigNumber, BigNumber": function(n, a) {
      return n.plus(a);
    },
    "bigint, bigint": function(n, a) {
      return n + a;
    },
    "Fraction, Fraction": function(n, a) {
      return n.add(a);
    },
    "Unit, Unit": r.referToSelf((t) => (n, a) => {
      if (n.value === null || n.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (a.value === null || a.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!n.equalBase(a)) throw new Error("Units do not match");
      var i = n.clone();
      return i.value = r.find(t, [i.valueType(), a.valueType()])(i.value, a.value), i.fixPrefix = !1, i;
    })
  });
}), ho = "subtractScalar", Oh = ["typed"], $h = /* @__PURE__ */ q(ho, Oh, (e) => {
  var {
    typed: r
  } = e;
  return r(ho, {
    "number, number": jc,
    "Complex, Complex": function(n, a) {
      return n.sub(a);
    },
    "BigNumber, BigNumber": function(n, a) {
      return n.minus(a);
    },
    "bigint, bigint": function(n, a) {
      return n - a;
    },
    "Fraction, Fraction": function(n, a) {
      return n.sub(a);
    },
    "Unit, Unit": r.referToSelf((t) => (n, a) => {
      if (n.value === null || n.value === void 0)
        throw new Error("Parameter x contains a unit with undefined value");
      if (a.value === null || a.value === void 0)
        throw new Error("Parameter y contains a unit with undefined value");
      if (!n.equalBase(a)) throw new Error("Units do not match");
      var i = n.clone();
      return i.value = r.find(t, [i.valueType(), a.valueType()])(i.value, a.value), i.fixPrefix = !1, i;
    })
  });
}), go = "cbrt", Ih = ["config", "typed", "isNegative", "unaryMinus", "matrix", "Complex", "BigNumber", "Fraction"], qh = /* @__PURE__ */ q(go, Ih, (e) => {
  var {
    config: r,
    typed: t,
    isNegative: n,
    unaryMinus: a,
    matrix: i,
    Complex: o,
    BigNumber: c,
    Fraction: l
  } = e;
  return t(go, {
    number: Jt,
    // note: signature 'number, boolean' is also supported,
    //       created by typed as it knows how to convert number to Complex
    Complex: s,
    "Complex, boolean": s,
    BigNumber: function(m) {
      return m.cbrt();
    },
    Unit: u
  });
  function s(f, m) {
    var v = f.arg() / 3, p = f.abs(), d = new o(Jt(p), 0).mul(new o(0, v).exp());
    if (m) {
      var b = [d, new o(Jt(p), 0).mul(new o(0, v + Math.PI * 2 / 3).exp()), new o(Jt(p), 0).mul(new o(0, v - Math.PI * 2 / 3).exp())];
      return r.matrix === "Array" ? b : i(b);
    } else
      return d;
  }
  function u(f) {
    if (f.value && Ir(f.value)) {
      var m = f.clone();
      return m.value = 1, m = m.pow(1 / 3), m.value = s(f.value), m;
    } else {
      var v = n(f.value);
      v && (f.value = a(f.value));
      var p;
      Be(f.value) ? p = new c(1).div(3) : ht(f.value) ? p = new l(1, 3) : p = 1 / 3;
      var d = f.pow(p);
      return v && (d.value = a(d.value)), d;
    }
  }
}), Rh = "matAlgo11xS0s", zh = ["typed", "equalScalar"], cr = /* @__PURE__ */ q(Rh, zh, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o, c) {
    var l = a._values, s = a._index, u = a._ptr, f = a._size, m = a._datatype;
    if (!l)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = f[0], p = f[1], d, b = t, x = 0, D = o;
    typeof m == "string" && (d = m, b = r.find(t, [d, d]), x = r.convert(0, d), i = r.convert(i, d), D = r.find(o, [d, d]));
    for (var h = [], w = [], y = [], g = 0; g < p; g++) {
      y[g] = w.length;
      for (var A = u[g], E = u[g + 1], N = A; N < E; N++) {
        var S = s[N], C = c ? D(i, l[N]) : D(l[N], i);
        b(C, x) || (w.push(S), h.push(C));
      }
    }
    return y[p] = w.length, a.createSparseMatrix({
      values: h,
      index: w,
      ptr: y,
      size: [v, p],
      datatype: d
    });
  };
}), Ph = "matAlgo12xSfs", Uh = ["typed", "DenseMatrix"], ir = /* @__PURE__ */ q(Ph, Uh, (e) => {
  var {
    typed: r,
    DenseMatrix: t
  } = e;
  return function(a, i, o, c) {
    var l = a._values, s = a._index, u = a._ptr, f = a._size, m = a._datatype;
    if (!l)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = f[0], p = f[1], d, b = o;
    typeof m == "string" && (d = m, i = r.convert(i, d), b = r.find(o, [d, d]));
    for (var x = [], D = [], h = [], w = 0; w < p; w++) {
      for (var y = w + 1, g = u[w], A = u[w + 1], E = g; E < A; E++) {
        var N = s[E];
        D[N] = l[E], h[N] = y;
      }
      for (var S = 0; S < v; S++)
        w === 0 && (x[S] = []), h[S] === y ? x[S][w] = c ? b(i, D[S]) : b(D[S], i) : x[S][w] = c ? b(i, 0) : b(0, i);
    }
    return new t({
      data: x,
      size: [v, p],
      datatype: d
    });
  };
}), Lh = "matAlgo14xDs", kh = ["typed"], zr = /* @__PURE__ */ q(Lh, kh, (e) => {
  var {
    typed: r
  } = e;
  return function(a, i, o, c) {
    var l = a._data, s = a._size, u = a._datatype, f, m = o;
    typeof u == "string" && (f = u, i = r.convert(i, f), m = r.find(o, [f, f]));
    var v = s.length > 0 ? t(m, 0, s, s[0], l, i, c) : [];
    return a.createDenseMatrix({
      data: v,
      size: Me(s),
      datatype: f
    });
  };
  function t(n, a, i, o, c, l, s) {
    var u = [];
    if (a === i.length - 1)
      for (var f = 0; f < o; f++)
        u[f] = s ? n(l, c[f]) : n(c[f], l);
    else
      for (var m = 0; m < o; m++)
        u[m] = t(n, a + 1, i, i[a + 1], c[m], l, s);
    return u;
  }
}), Pa = "ceil", Hh = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "DenseMatrix"], Gh = /* @__PURE__ */ q(Pa, ["typed", "config", "round"], (e) => {
  var {
    typed: r,
    config: t,
    round: n
  } = e;
  return r(Pa, {
    number: function(i) {
      return lr(i, n(i), t.relTol, t.absTol) ? n(i) : Math.ceil(i);
    },
    "number, number": function(i, o) {
      if (lr(i, n(i, o), t.relTol, t.absTol))
        return n(i, o);
      var [c, l] = "".concat(i, "e").split("e"), s = Math.ceil(Number("".concat(c, "e").concat(Number(l) + o)));
      return [c, l] = "".concat(s, "e").split("e"), Number("".concat(c, "e").concat(Number(l) - o));
    }
  });
}), Zh = /* @__PURE__ */ q(Pa, Hh, (e) => {
  var {
    typed: r,
    config: t,
    round: n,
    matrix: a,
    equalScalar: i,
    zeros: o,
    DenseMatrix: c
  } = e, l = cr({
    typed: r,
    equalScalar: i
  }), s = ir({
    typed: r,
    DenseMatrix: c
  }), u = zr({
    typed: r
  }), f = Gh({
    typed: r,
    config: t,
    round: n
  });
  return r("ceil", {
    number: f.signatures.number,
    "number,number": f.signatures["number,number"],
    Complex: function(v) {
      return v.ceil();
    },
    "Complex, number": function(v, p) {
      return v.ceil(p);
    },
    "Complex, BigNumber": function(v, p) {
      return v.ceil(p.toNumber());
    },
    BigNumber: function(v) {
      return Nr(v, n(v), t.relTol, t.absTol) ? n(v) : v.ceil();
    },
    "BigNumber, BigNumber": function(v, p) {
      return Nr(v, n(v, p), t.relTol, t.absTol) ? n(v, p) : v.toDecimalPlaces(p.toNumber(), ot.ROUND_CEIL);
    },
    Fraction: function(v) {
      return v.ceil();
    },
    "Fraction, number": function(v, p) {
      return v.ceil(p);
    },
    "Fraction, BigNumber": function(v, p) {
      return v.ceil(p.toNumber());
    },
    "Array | Matrix": r.referToSelf((m) => (v) => ze(v, m)),
    "Array, number | BigNumber": r.referToSelf((m) => (v, p) => ze(v, (d) => m(d, p))),
    "SparseMatrix, number | BigNumber": r.referToSelf((m) => (v, p) => l(v, p, m, !1)),
    "DenseMatrix, number | BigNumber": r.referToSelf((m) => (v, p) => u(v, p, m, !1)),
    "number | Complex | Fraction | BigNumber, Array": r.referToSelf((m) => (v, p) => u(a(p), v, m, !0).valueOf()),
    "number | Complex | Fraction | BigNumber, Matrix": r.referToSelf((m) => (v, p) => i(v, 0) ? o(p.size(), p.storage()) : p.storage() === "dense" ? u(p, v, m, !0) : s(p, v, m, !0))
  });
}), yo = "cube", Vh = ["typed"], Wh = /* @__PURE__ */ q(yo, Vh, (e) => {
  var {
    typed: r
  } = e;
  return r(yo, {
    number: nf,
    Complex: function(n) {
      return n.mul(n).mul(n);
    },
    BigNumber: function(n) {
      return n.times(n).times(n);
    },
    bigint: function(n) {
      return n * n * n;
    },
    Fraction: function(n) {
      return n.pow(3);
    },
    Unit: function(n) {
      return n.pow(3);
    }
  });
}), bo = "exp", Yh = ["typed"], Xh = /* @__PURE__ */ q(bo, Yh, (e) => {
  var {
    typed: r
  } = e;
  return r(bo, {
    number: af,
    Complex: function(n) {
      return n.exp();
    },
    BigNumber: function(n) {
      return n.exp();
    }
  });
}), xo = "expm1", Jh = ["typed", "Complex"], Qh = /* @__PURE__ */ q(xo, Jh, (e) => {
  var {
    typed: r,
    Complex: t
  } = e;
  return r(xo, {
    number: of,
    Complex: function(a) {
      var i = Math.exp(a.re);
      return new t(i * Math.cos(a.im) - 1, i * Math.sin(a.im));
    },
    BigNumber: function(a) {
      return a.exp().minus(1);
    }
  });
}), Ua = "fix", Kh = ["typed", "Complex", "matrix", "ceil", "floor", "equalScalar", "zeros", "DenseMatrix"], jh = /* @__PURE__ */ q(Ua, ["typed", "ceil", "floor"], (e) => {
  var {
    typed: r,
    ceil: t,
    floor: n
  } = e;
  return r(Ua, {
    number: function(i) {
      return i > 0 ? n(i) : t(i);
    },
    "number, number": function(i, o) {
      return i > 0 ? n(i, o) : t(i, o);
    }
  });
}), e0 = /* @__PURE__ */ q(Ua, Kh, (e) => {
  var {
    typed: r,
    Complex: t,
    matrix: n,
    ceil: a,
    floor: i,
    equalScalar: o,
    zeros: c,
    DenseMatrix: l
  } = e, s = ir({
    typed: r,
    DenseMatrix: l
  }), u = zr({
    typed: r
  }), f = jh({
    typed: r,
    ceil: a,
    floor: i
  });
  return r("fix", {
    number: f.signatures.number,
    "number, number | BigNumber": f.signatures["number,number"],
    Complex: function(v) {
      return new t(v.re > 0 ? Math.floor(v.re) : Math.ceil(v.re), v.im > 0 ? Math.floor(v.im) : Math.ceil(v.im));
    },
    "Complex, number": function(v, p) {
      return new t(v.re > 0 ? i(v.re, p) : a(v.re, p), v.im > 0 ? i(v.im, p) : a(v.im, p));
    },
    "Complex, BigNumber": function(v, p) {
      var d = p.toNumber();
      return new t(v.re > 0 ? i(v.re, d) : a(v.re, d), v.im > 0 ? i(v.im, d) : a(v.im, d));
    },
    BigNumber: function(v) {
      return v.isNegative() ? a(v) : i(v);
    },
    "BigNumber, number | BigNumber": function(v, p) {
      return v.isNegative() ? a(v, p) : i(v, p);
    },
    Fraction: function(v) {
      return v.s < 0 ? v.ceil() : v.floor();
    },
    "Fraction, number | BigNumber": function(v, p) {
      return v.s < 0 ? a(v, p) : i(v, p);
    },
    "Array | Matrix": r.referToSelf((m) => (v) => ze(v, m)),
    "Array | Matrix, number | BigNumber": r.referToSelf((m) => (v, p) => ze(v, (d) => m(d, p))),
    "number | Complex | Fraction | BigNumber, Array": r.referToSelf((m) => (v, p) => u(n(p), v, m, !0).valueOf()),
    "number | Complex | Fraction | BigNumber, Matrix": r.referToSelf((m) => (v, p) => o(v, 0) ? c(p.size(), p.storage()) : p.storage() === "dense" ? u(p, v, m, !0) : s(p, v, m, !0))
  });
}), La = "floor", r0 = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "DenseMatrix"], t0 = /* @__PURE__ */ q(La, ["typed", "config", "round"], (e) => {
  var {
    typed: r,
    config: t,
    round: n
  } = e;
  return r(La, {
    number: function(i) {
      return lr(i, n(i), t.relTol, t.absTol) ? n(i) : Math.floor(i);
    },
    "number, number": function(i, o) {
      if (lr(i, n(i, o), t.relTol, t.absTol))
        return n(i, o);
      var [c, l] = "".concat(i, "e").split("e"), s = Math.floor(Number("".concat(c, "e").concat(Number(l) + o)));
      return [c, l] = "".concat(s, "e").split("e"), Number("".concat(c, "e").concat(Number(l) - o));
    }
  });
}), Hf = /* @__PURE__ */ q(La, r0, (e) => {
  var {
    typed: r,
    config: t,
    round: n,
    matrix: a,
    equalScalar: i,
    zeros: o,
    DenseMatrix: c
  } = e, l = cr({
    typed: r,
    equalScalar: i
  }), s = ir({
    typed: r,
    DenseMatrix: c
  }), u = zr({
    typed: r
  }), f = t0({
    typed: r,
    config: t,
    round: n
  });
  return r("floor", {
    number: f.signatures.number,
    "number,number": f.signatures["number,number"],
    Complex: function(v) {
      return v.floor();
    },
    "Complex, number": function(v, p) {
      return v.floor(p);
    },
    "Complex, BigNumber": function(v, p) {
      return v.floor(p.toNumber());
    },
    BigNumber: function(v) {
      return Nr(v, n(v), t.relTol, t.absTol) ? n(v) : v.floor();
    },
    "BigNumber, BigNumber": function(v, p) {
      return Nr(v, n(v, p), t.relTol, t.absTol) ? n(v, p) : v.toDecimalPlaces(p.toNumber(), ot.ROUND_FLOOR);
    },
    Fraction: function(v) {
      return v.floor();
    },
    "Fraction, number": function(v, p) {
      return v.floor(p);
    },
    "Fraction, BigNumber": function(v, p) {
      return v.floor(p.toNumber());
    },
    "Array | Matrix": r.referToSelf((m) => (v) => ze(v, m)),
    "Array, number | BigNumber": r.referToSelf((m) => (v, p) => ze(v, (d) => m(d, p))),
    "SparseMatrix, number | BigNumber": r.referToSelf((m) => (v, p) => l(v, p, m, !1)),
    "DenseMatrix, number | BigNumber": r.referToSelf((m) => (v, p) => u(v, p, m, !1)),
    "number | Complex | Fraction | BigNumber, Array": r.referToSelf((m) => (v, p) => u(a(p), v, m, !0).valueOf()),
    "number | Complex | Fraction | BigNumber, Matrix": r.referToSelf((m) => (v, p) => i(v, 0) ? o(p.size(), p.storage()) : p.storage() === "dense" ? u(p, v, m, !0) : s(p, v, m, !0))
  });
}), n0 = "matAlgo02xDS0", a0 = ["typed", "equalScalar"], Pr = /* @__PURE__ */ q(n0, a0, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o, c) {
    var l = a._data, s = a._size, u = a._datatype || a.getDataType(), f = i._values, m = i._index, v = i._ptr, p = i._size, d = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (s.length !== p.length)
      throw new Re(s.length, p.length);
    if (s[0] !== p[0] || s[1] !== p[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + s + ") must match Matrix B (" + p + ")");
    if (!f)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var b = s[0], x = s[1], D, h = t, w = 0, y = o;
    typeof u == "string" && u === d && u !== "mixed" && (D = u, h = r.find(t, [D, D]), w = r.convert(0, D), y = r.find(o, [D, D]));
    for (var g = [], A = [], E = [], N = 0; N < x; N++) {
      E[N] = A.length;
      for (var S = v[N], C = v[N + 1], T = S; T < C; T++) {
        var O = m[T], I = c ? y(f[T], l[O][N]) : y(l[O][N], f[T]);
        h(I, w) || (A.push(O), g.push(I));
      }
    }
    return E[x] = A.length, i.createSparseMatrix({
      values: g,
      index: A,
      ptr: E,
      size: [b, x],
      datatype: u === a._datatype && d === i._datatype ? D : void 0
    });
  };
}), i0 = "matAlgo03xDSf", o0 = ["typed"], yr = /* @__PURE__ */ q(i0, o0, (e) => {
  var {
    typed: r
  } = e;
  return function(n, a, i, o) {
    var c = n._data, l = n._size, s = n._datatype || n.getDataType(), u = a._values, f = a._index, m = a._ptr, v = a._size, p = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (l.length !== v.length)
      throw new Re(l.length, v.length);
    if (l[0] !== v[0] || l[1] !== v[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + v + ")");
    if (!u)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var d = l[0], b = l[1], x, D = 0, h = i;
    typeof s == "string" && s === p && s !== "mixed" && (x = s, D = r.convert(0, x), h = r.find(i, [x, x]));
    for (var w = [], y = 0; y < d; y++)
      w[y] = [];
    for (var g = [], A = [], E = 0; E < b; E++) {
      for (var N = E + 1, S = m[E], C = m[E + 1], T = S; T < C; T++) {
        var O = f[T];
        g[O] = o ? h(u[T], c[O][E]) : h(c[O][E], u[T]), A[O] = N;
      }
      for (var I = 0; I < d; I++)
        A[I] === N ? w[I][E] = g[I] : w[I][E] = o ? h(D, c[I][E]) : h(c[I][E], D);
    }
    return n.createDenseMatrix({
      data: w,
      size: [d, b],
      datatype: s === n._datatype && p === a._datatype ? x : void 0
    });
  };
}), s0 = "matAlgo05xSfSf", u0 = ["typed", "equalScalar"], fa = /* @__PURE__ */ q(s0, u0, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o) {
    var c = a._values, l = a._index, s = a._ptr, u = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), m = i._values, v = i._index, p = i._ptr, d = i._size, b = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (u.length !== d.length)
      throw new Re(u.length, d.length);
    if (u[0] !== d[0] || u[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + d + ")");
    var x = u[0], D = u[1], h, w = t, y = 0, g = o;
    typeof f == "string" && f === b && f !== "mixed" && (h = f, w = r.find(t, [h, h]), y = r.convert(0, h), g = r.find(o, [h, h]));
    var A = c && m ? [] : void 0, E = [], N = [], S = A ? [] : void 0, C = A ? [] : void 0, T = [], O = [], I, $, F, _;
    for ($ = 0; $ < D; $++) {
      N[$] = E.length;
      var L = $ + 1;
      for (F = s[$], _ = s[$ + 1]; F < _; F++)
        I = l[F], E.push(I), T[I] = L, S && (S[I] = c[F]);
      for (F = p[$], _ = p[$ + 1]; F < _; F++)
        I = v[F], T[I] !== L && E.push(I), O[I] = L, C && (C[I] = m[F]);
      if (A)
        for (F = N[$]; F < E.length; ) {
          I = E[F];
          var B = T[I], W = O[I];
          if (B === L || W === L) {
            var Q = B === L ? S[I] : y, Z = W === L ? C[I] : y, z = g(Q, Z);
            w(z, y) ? E.splice(F, 1) : (A.push(z), F++);
          }
        }
    }
    return N[D] = E.length, a.createSparseMatrix({
      values: A,
      index: E,
      ptr: N,
      size: [x, D],
      datatype: f === a._datatype && b === i._datatype ? h : void 0
    });
  };
}), l0 = "matAlgo13xDD", c0 = ["typed"], f0 = /* @__PURE__ */ q(l0, c0, (e) => {
  var {
    typed: r
  } = e;
  return function(a, i, o) {
    var c = a._data, l = a._size, s = a._datatype, u = i._data, f = i._size, m = i._datatype, v = [];
    if (l.length !== f.length)
      throw new Re(l.length, f.length);
    for (var p = 0; p < l.length; p++) {
      if (l[p] !== f[p])
        throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + f + ")");
      v[p] = l[p];
    }
    var d, b = o;
    typeof s == "string" && s === m && (d = s, b = r.find(o, [d, d]));
    var x = v.length > 0 ? t(b, 0, v, v[0], c, u) : [];
    return a.createDenseMatrix({
      data: x,
      size: v,
      datatype: d
    });
  };
  function t(n, a, i, o, c, l) {
    var s = [];
    if (a === i.length - 1)
      for (var u = 0; u < o; u++)
        s[u] = n(c[u], l[u]);
    else
      for (var f = 0; f < o; f++)
        s[f] = t(n, a + 1, i, i[a + 1], c[f], l[f]);
    return s;
  }
});
function or(e, r) {
  if (Xr(e.size(), r.size()))
    return [e, r];
  var t = ei(e.size(), r.size());
  return [e, r].map((n) => m0(n, t));
}
function m0(e, r) {
  return Xr(e.size(), r) ? e : e.create(mt(e.valueOf(), r), e.datatype());
}
var v0 = "matrixAlgorithmSuite", p0 = ["typed", "matrix"], Qe = /* @__PURE__ */ q(v0, p0, (e) => {
  var {
    typed: r,
    matrix: t
  } = e, n = f0({
    typed: r
  }), a = zr({
    typed: r
  });
  return function(o) {
    var c = o.elop, l = o.SD || o.DS, s;
    c ? (s = {
      "DenseMatrix, DenseMatrix": (v, p) => n(...or(v, p), c),
      "Array, Array": (v, p) => n(...or(t(v), t(p)), c).valueOf(),
      "Array, DenseMatrix": (v, p) => n(...or(t(v), p), c),
      "DenseMatrix, Array": (v, p) => n(...or(v, t(p)), c)
    }, o.SS && (s["SparseMatrix, SparseMatrix"] = (v, p) => o.SS(...or(v, p), c, !1)), o.DS && (s["DenseMatrix, SparseMatrix"] = (v, p) => o.DS(...or(v, p), c, !1), s["Array, SparseMatrix"] = (v, p) => o.DS(...or(t(v), p), c, !1)), l && (s["SparseMatrix, DenseMatrix"] = (v, p) => l(...or(p, v), c, !0), s["SparseMatrix, Array"] = (v, p) => l(...or(t(p), v), c, !0))) : (s = {
      "DenseMatrix, DenseMatrix": r.referToSelf((v) => (p, d) => n(...or(p, d), v)),
      "Array, Array": r.referToSelf((v) => (p, d) => n(...or(t(p), t(d)), v).valueOf()),
      "Array, DenseMatrix": r.referToSelf((v) => (p, d) => n(...or(t(p), d), v)),
      "DenseMatrix, Array": r.referToSelf((v) => (p, d) => n(...or(p, t(d)), v))
    }, o.SS && (s["SparseMatrix, SparseMatrix"] = r.referToSelf((v) => (p, d) => o.SS(...or(p, d), v, !1))), o.DS && (s["DenseMatrix, SparseMatrix"] = r.referToSelf((v) => (p, d) => o.DS(...or(p, d), v, !1)), s["Array, SparseMatrix"] = r.referToSelf((v) => (p, d) => o.DS(...or(t(p), d), v, !1))), l && (s["SparseMatrix, DenseMatrix"] = r.referToSelf((v) => (p, d) => l(...or(d, p), v, !0)), s["SparseMatrix, Array"] = r.referToSelf((v) => (p, d) => l(...or(t(d), p), v, !0))));
    var u = o.scalar || "any", f = o.Ds || o.Ss;
    f && (c ? (s["DenseMatrix," + u] = (v, p) => a(v, p, c, !1), s[u + ", DenseMatrix"] = (v, p) => a(p, v, c, !0), s["Array," + u] = (v, p) => a(t(v), p, c, !1).valueOf(), s[u + ", Array"] = (v, p) => a(t(p), v, c, !0).valueOf()) : (s["DenseMatrix," + u] = r.referToSelf((v) => (p, d) => a(p, d, v, !1)), s[u + ", DenseMatrix"] = r.referToSelf((v) => (p, d) => a(d, p, v, !0)), s["Array," + u] = r.referToSelf((v) => (p, d) => a(t(p), d, v, !1).valueOf()), s[u + ", Array"] = r.referToSelf((v) => (p, d) => a(t(d), p, v, !0).valueOf())));
    var m = o.sS !== void 0 ? o.sS : o.Ss;
    return c ? (o.Ss && (s["SparseMatrix," + u] = (v, p) => o.Ss(v, p, c, !1)), m && (s[u + ", SparseMatrix"] = (v, p) => m(p, v, c, !0))) : (o.Ss && (s["SparseMatrix," + u] = r.referToSelf((v) => (p, d) => o.Ss(p, d, v, !1))), m && (s[u + ", SparseMatrix"] = r.referToSelf((v) => (p, d) => m(d, p, v, !0)))), c && c.signatures && xc(s, c.signatures), s;
  };
}), wo = "mod", d0 = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"], Gf = /* @__PURE__ */ q(wo, d0, (e) => {
  var {
    typed: r,
    config: t,
    round: n,
    matrix: a,
    equalScalar: i,
    zeros: o,
    DenseMatrix: c,
    concat: l
  } = e, s = Hf({
    typed: r,
    config: t,
    round: n,
    matrix: a,
    equalScalar: i,
    zeros: o,
    DenseMatrix: c
  }), u = Pr({
    typed: r,
    equalScalar: i
  }), f = yr({
    typed: r
  }), m = fa({
    typed: r,
    equalScalar: i
  }), v = cr({
    typed: r,
    equalScalar: i
  }), p = ir({
    typed: r,
    DenseMatrix: c
  }), d = Qe({
    typed: r,
    matrix: a,
    concat: l
  });
  return r(wo, {
    "number, number": b,
    "BigNumber, BigNumber": function(D, h) {
      return h.isZero() ? D : D.sub(h.mul(s(D.div(h))));
    },
    "bigint, bigint": function(D, h) {
      if (h === 0n)
        return D;
      if (D < 0) {
        var w = D % h;
        return w === 0n ? w : w + h;
      }
      return D % h;
    },
    "Fraction, Fraction": function(D, h) {
      return h.equals(0) ? D : D.sub(h.mul(s(D.div(h))));
    }
  }, d({
    SS: m,
    DS: f,
    SD: u,
    Ss: v,
    sS: p
  }));
  function b(x, D) {
    return D === 0 ? x : x - D * s(x / D);
  }
}), h0 = "matAlgo01xDSid", g0 = ["typed"], lt = /* @__PURE__ */ q(h0, g0, (e) => {
  var {
    typed: r
  } = e;
  return function(n, a, i, o) {
    var c = n._data, l = n._size, s = n._datatype || n.getDataType(), u = a._values, f = a._index, m = a._ptr, v = a._size, p = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (l.length !== v.length)
      throw new Re(l.length, v.length);
    if (l[0] !== v[0] || l[1] !== v[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + v + ")");
    if (!u)
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    var d = l[0], b = l[1], x = typeof s == "string" && s !== "mixed" && s === p ? s : void 0, D = x ? r.find(i, [x, x]) : i, h, w, y = [];
    for (h = 0; h < d; h++)
      y[h] = [];
    var g = [], A = [];
    for (w = 0; w < b; w++) {
      for (var E = w + 1, N = m[w], S = m[w + 1], C = N; C < S; C++)
        h = f[C], g[h] = o ? D(u[C], c[h][w]) : D(c[h][w], u[C]), A[h] = E;
      for (h = 0; h < d; h++)
        A[h] === E ? y[h][w] = g[h] : y[h][w] = c[h][w];
    }
    return n.createDenseMatrix({
      data: y,
      size: [d, b],
      datatype: s === n._datatype && p === a._datatype ? x : void 0
    });
  };
}), y0 = "matAlgo04xSidSid", b0 = ["typed", "equalScalar"], oi = /* @__PURE__ */ q(y0, b0, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o) {
    var c = a._values, l = a._index, s = a._ptr, u = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), m = i._values, v = i._index, p = i._ptr, d = i._size, b = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (u.length !== d.length)
      throw new Re(u.length, d.length);
    if (u[0] !== d[0] || u[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + d + ")");
    var x = u[0], D = u[1], h, w = t, y = 0, g = o;
    typeof f == "string" && f === b && f !== "mixed" && (h = f, w = r.find(t, [h, h]), y = r.convert(0, h), g = r.find(o, [h, h]));
    var A = c && m ? [] : void 0, E = [], N = [], S = c && m ? [] : void 0, C = c && m ? [] : void 0, T = [], O = [], I, $, F, _, L;
    for ($ = 0; $ < D; $++) {
      N[$] = E.length;
      var B = $ + 1;
      for (_ = s[$], L = s[$ + 1], F = _; F < L; F++)
        I = l[F], E.push(I), T[I] = B, S && (S[I] = c[F]);
      for (_ = p[$], L = p[$ + 1], F = _; F < L; F++)
        if (I = v[F], T[I] === B) {
          if (S) {
            var W = g(S[I], m[F]);
            w(W, y) ? T[I] = null : S[I] = W;
          }
        } else
          E.push(I), O[I] = B, C && (C[I] = m[F]);
      if (S && C)
        for (F = N[$]; F < E.length; )
          I = E[F], T[I] === B ? (A[F] = S[I], F++) : O[I] === B ? (A[F] = C[I], F++) : E.splice(F, 1);
    }
    return N[D] = E.length, a.createSparseMatrix({
      values: A,
      index: E,
      ptr: N,
      size: [x, D],
      datatype: f === a._datatype && b === i._datatype ? h : void 0
    });
  };
}), x0 = "matAlgo10xSids", w0 = ["typed", "DenseMatrix"], yt = /* @__PURE__ */ q(x0, w0, (e) => {
  var {
    typed: r,
    DenseMatrix: t
  } = e;
  return function(a, i, o, c) {
    var l = a._values, s = a._index, u = a._ptr, f = a._size, m = a._datatype;
    if (!l)
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    var v = f[0], p = f[1], d, b = o;
    typeof m == "string" && (d = m, i = r.convert(i, d), b = r.find(o, [d, d]));
    for (var x = [], D = [], h = [], w = 0; w < p; w++) {
      for (var y = w + 1, g = u[w], A = u[w + 1], E = g; E < A; E++) {
        var N = s[E];
        D[N] = l[E], h[N] = y;
      }
      for (var S = 0; S < v; S++)
        w === 0 && (x[S] = []), h[S] === y ? x[S][w] = c ? b(i, D[S]) : b(D[S], i) : x[S][w] = i;
    }
    return new t({
      data: x,
      size: [v, p],
      datatype: d
    });
  };
});
function Qr(e, r, t, n) {
  if (!(this instanceof Qr))
    throw new SyntaxError("Constructor must be called with the new operator");
  this.fn = e, this.count = r, this.min = t, this.max = n, this.message = "Wrong number of arguments in function " + e + " (" + r + " provided, " + t + (n != null ? "-" + n : "") + " expected)", this.stack = new Error().stack;
}
Qr.prototype = new Error();
Qr.prototype.constructor = Error;
Qr.prototype.name = "ArgumentsError";
Qr.prototype.isArgumentsError = !0;
var Do = "gcd", D0 = ["typed", "config", "round", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix", "concat"], wa = "number | BigNumber | Fraction | Matrix | Array", N0 = "".concat(wa, ", ").concat(wa, ", ...").concat(wa);
function No(e) {
  return !e.some((r) => Array.isArray(r));
}
var A0 = /* @__PURE__ */ q(Do, D0, (e) => {
  var {
    typed: r,
    matrix: t,
    config: n,
    round: a,
    equalScalar: i,
    zeros: o,
    BigNumber: c,
    DenseMatrix: l,
    concat: s
  } = e, u = Gf({
    typed: r,
    config: n,
    round: a,
    matrix: t,
    equalScalar: i,
    zeros: o,
    DenseMatrix: l,
    concat: s
  }), f = lt({
    typed: r
  }), m = oi({
    typed: r,
    equalScalar: i
  }), v = yt({
    typed: r,
    DenseMatrix: l
  }), p = Qe({
    typed: r,
    matrix: t,
    concat: s
  });
  return r(Do, {
    "number, number": d,
    "BigNumber, BigNumber": b,
    "Fraction, Fraction": (x, D) => x.gcd(D)
  }, p({
    SS: m,
    DS: f,
    Ss: v
  }), {
    [N0]: r.referToSelf((x) => (D, h, w) => {
      for (var y = x(D, h), g = 0; g < w.length; g++)
        y = x(y, w[g]);
      return y;
    }),
    Array: r.referToSelf((x) => (D) => {
      if (D.length === 1 && Array.isArray(D[0]) && No(D[0]))
        return x(...D[0]);
      if (No(D))
        return x(...D);
      throw new Qr("gcd() supports only 1d matrices!");
    }),
    Matrix: r.referToSelf((x) => (D) => x(D.toArray()))
  });
  function d(x, D) {
    if (!Ae(x) || !Ae(D))
      throw new Error("Parameters in function gcd must be integer numbers");
    for (var h; D !== 0; )
      h = u(x, D), x = D, D = h;
    return x < 0 ? -x : x;
  }
  function b(x, D) {
    if (!x.isInt() || !D.isInt())
      throw new Error("Parameters in function gcd must be integer numbers");
    for (var h = new c(0); !D.isZero(); ) {
      var w = u(x, D);
      x = D, D = w;
    }
    return x.lt(h) ? x.neg() : x;
  }
}), E0 = "matAlgo06xS0S0", S0 = ["typed", "equalScalar"], ma = /* @__PURE__ */ q(E0, S0, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o) {
    var c = a._values, l = a._size, s = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), u = i._values, f = i._size, m = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (l.length !== f.length)
      throw new Re(l.length, f.length);
    if (l[0] !== f[0] || l[1] !== f[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + f + ")");
    var v = l[0], p = l[1], d, b = t, x = 0, D = o;
    typeof s == "string" && s === m && s !== "mixed" && (d = s, b = r.find(t, [d, d]), x = r.convert(0, d), D = r.find(o, [d, d]));
    for (var h = c && u ? [] : void 0, w = [], y = [], g = h ? [] : void 0, A = [], E = [], N = 0; N < p; N++) {
      y[N] = w.length;
      var S = N + 1;
      if (Vi(a, N, A, g, E, S, w, D), Vi(i, N, A, g, E, S, w, D), g)
        for (var C = y[N]; C < w.length; ) {
          var T = w[C];
          if (E[T] === S) {
            var O = g[T];
            b(O, x) ? w.splice(C, 1) : (h.push(O), C++);
          } else
            w.splice(C, 1);
        }
      else
        for (var I = y[N]; I < w.length; ) {
          var $ = w[I];
          E[$] !== S ? w.splice(I, 1) : I++;
        }
    }
    return y[p] = w.length, a.createSparseMatrix({
      values: h,
      index: w,
      ptr: y,
      size: [v, p],
      datatype: s === a._datatype && m === i._datatype ? d : void 0
    });
  };
}), Ao = "lcm", C0 = ["typed", "matrix", "equalScalar", "concat"], M0 = /* @__PURE__ */ q(Ao, C0, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    concat: a
  } = e, i = Pr({
    typed: r,
    equalScalar: n
  }), o = ma({
    typed: r,
    equalScalar: n
  }), c = cr({
    typed: r,
    equalScalar: n
  }), l = Qe({
    typed: r,
    matrix: t,
    concat: a
  }), s = "number | BigNumber | Fraction | Matrix | Array", u = {};
  return u["".concat(s, ", ").concat(s, ", ...").concat(s)] = r.referToSelf((m) => (v, p, d) => {
    for (var b = m(v, p), x = 0; x < d.length; x++)
      b = m(b, d[x]);
    return b;
  }), r(Ao, {
    "number, number": sf,
    "BigNumber, BigNumber": f,
    "Fraction, Fraction": (m, v) => m.lcm(v)
  }, l({
    SS: o,
    DS: i,
    Ss: c
  }), u);
  function f(m, v) {
    if (!m.isInt() || !v.isInt())
      throw new Error("Parameters in function lcm must be integer numbers");
    if (m.isZero())
      return m;
    if (v.isZero())
      return v;
    for (var p = m.times(v); !v.isZero(); ) {
      var d = v;
      v = m.mod(d), m = d;
    }
    return p.div(m).abs();
  }
}), Eo = "log10", _0 = ["typed", "config", "Complex"], F0 = /* @__PURE__ */ q(Eo, _0, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n
  } = e;
  return r(Eo, {
    number: function(i) {
      return i >= 0 || t.predictable ? uf(i) : new n(i, 0).log().div(Math.LN10);
    },
    Complex: function(i) {
      return new n(i).log().div(Math.LN10);
    },
    BigNumber: function(i) {
      return !i.isNegative() || t.predictable ? i.log() : new n(i.toNumber(), 0).log().div(Math.LN10);
    },
    "Array | Matrix": r.referToSelf((a) => (i) => ze(i, a))
  });
}), So = "log2", T0 = ["typed", "config", "Complex"], B0 = /* @__PURE__ */ q(So, T0, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n
  } = e;
  return r(So, {
    number: function(o) {
      return o >= 0 || t.predictable ? lf(o) : a(new n(o, 0));
    },
    Complex: a,
    BigNumber: function(o) {
      return !o.isNegative() || t.predictable ? o.log(2) : a(new n(o.toNumber(), 0));
    },
    "Array | Matrix": r.referToSelf((i) => (o) => ze(o, i))
  });
  function a(i) {
    var o = Math.sqrt(i.re * i.re + i.im * i.im);
    return new n(Math.log2 ? Math.log2(o) : Math.log(o) / Math.LN2, Math.atan2(i.im, i.re) / Math.LN2);
  }
}), O0 = "multiplyScalar", $0 = ["typed"], I0 = /* @__PURE__ */ q(O0, $0, (e) => {
  var {
    typed: r
  } = e;
  return r("multiplyScalar", {
    "number, number": ef,
    "Complex, Complex": function(n, a) {
      return n.mul(a);
    },
    "BigNumber, BigNumber": function(n, a) {
      return n.times(a);
    },
    "bigint, bigint": function(n, a) {
      return n * a;
    },
    "Fraction, Fraction": function(n, a) {
      return n.mul(a);
    },
    "number | Fraction | BigNumber | Complex, Unit": (t, n) => n.multiply(t),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (t, n) => t.multiply(n)
  });
}), Co = "multiply", q0 = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"], R0 = /* @__PURE__ */ q(Co, q0, (e) => {
  var {
    typed: r,
    matrix: t,
    addScalar: n,
    multiplyScalar: a,
    equalScalar: i,
    dot: o
  } = e, c = cr({
    typed: r,
    equalScalar: i
  }), l = zr({
    typed: r
  });
  function s(y, g) {
    switch (y.length) {
      case 1:
        switch (g.length) {
          case 1:
            if (y[0] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            break;
          case 2:
            if (y[0] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + y[0] + ") must match Matrix rows (" + g[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + g.length + " dimensions)");
        }
        break;
      case 2:
        switch (g.length) {
          case 1:
            if (y[1] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + y[1] + ") must match Vector length (" + g[0] + ")");
            break;
          case 2:
            if (y[1] !== g[0])
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + y[1] + ") must match Matrix B rows (" + g[0] + ")");
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + g.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + y.length + " dimensions)");
    }
  }
  function u(y, g, A) {
    if (A === 0)
      throw new Error("Cannot multiply two empty vectors");
    return o(y, g);
  }
  function f(y, g) {
    if (g.storage() !== "dense")
      throw new Error("Support for SparseMatrix not implemented");
    return m(y, g);
  }
  function m(y, g) {
    var A = y._data, E = y._size, N = y._datatype || y.getDataType(), S = g._data, C = g._size, T = g._datatype || g.getDataType(), O = E[0], I = C[1], $, F = n, _ = a;
    N && T && N === T && typeof N == "string" && N !== "mixed" && ($ = N, F = r.find(n, [$, $]), _ = r.find(a, [$, $]));
    for (var L = [], B = 0; B < I; B++) {
      for (var W = _(A[0], S[0][B]), Q = 1; Q < O; Q++)
        W = F(W, _(A[Q], S[Q][B]));
      L[B] = W;
    }
    return y.createDenseMatrix({
      data: L,
      size: [I],
      datatype: N === y._datatype && T === g._datatype ? $ : void 0
    });
  }
  var v = r("_multiplyMatrixVector", {
    "DenseMatrix, any": d,
    "SparseMatrix, any": D
  }), p = r("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": b,
    "DenseMatrix, SparseMatrix": x,
    "SparseMatrix, DenseMatrix": h,
    "SparseMatrix, SparseMatrix": w
  });
  function d(y, g) {
    var A = y._data, E = y._size, N = y._datatype || y.getDataType(), S = g._data, C = g._datatype || g.getDataType(), T = E[0], O = E[1], I, $ = n, F = a;
    N && C && N === C && typeof N == "string" && N !== "mixed" && (I = N, $ = r.find(n, [I, I]), F = r.find(a, [I, I]));
    for (var _ = [], L = 0; L < T; L++) {
      for (var B = A[L], W = F(B[0], S[0]), Q = 1; Q < O; Q++)
        W = $(W, F(B[Q], S[Q]));
      _[L] = W;
    }
    return y.createDenseMatrix({
      data: _,
      size: [T],
      datatype: N === y._datatype && C === g._datatype ? I : void 0
    });
  }
  function b(y, g) {
    var A = y._data, E = y._size, N = y._datatype || y.getDataType(), S = g._data, C = g._size, T = g._datatype || g.getDataType(), O = E[0], I = E[1], $ = C[1], F, _ = n, L = a;
    N && T && N === T && typeof N == "string" && N !== "mixed" && N !== "mixed" && (F = N, _ = r.find(n, [F, F]), L = r.find(a, [F, F]));
    for (var B = [], W = 0; W < O; W++) {
      var Q = A[W];
      B[W] = [];
      for (var Z = 0; Z < $; Z++) {
        for (var z = L(Q[0], S[0][Z]), J = 1; J < I; J++)
          z = _(z, L(Q[J], S[J][Z]));
        B[W][Z] = z;
      }
    }
    return y.createDenseMatrix({
      data: B,
      size: [O, $],
      datatype: N === y._datatype && T === g._datatype ? F : void 0
    });
  }
  function x(y, g) {
    var A = y._data, E = y._size, N = y._datatype || y.getDataType(), S = g._values, C = g._index, T = g._ptr, O = g._size, I = g._datatype || g._data === void 0 ? g._datatype : g.getDataType();
    if (!S)
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    var $ = E[0], F = O[1], _, L = n, B = a, W = i, Q = 0;
    N && I && N === I && typeof N == "string" && N !== "mixed" && (_ = N, L = r.find(n, [_, _]), B = r.find(a, [_, _]), W = r.find(i, [_, _]), Q = r.convert(0, _));
    for (var Z = [], z = [], J = [], le = g.createSparseMatrix({
      values: Z,
      index: z,
      ptr: J,
      size: [$, F],
      datatype: N === y._datatype && I === g._datatype ? _ : void 0
    }), K = 0; K < F; K++) {
      J[K] = z.length;
      var re = T[K], ie = T[K + 1];
      if (ie > re)
        for (var j = 0, te = 0; te < $; te++) {
          for (var oe = te + 1, me = void 0, be = re; be < ie; be++) {
            var we = C[be];
            j !== oe ? (me = B(A[te][we], S[be]), j = oe) : me = L(me, B(A[te][we], S[be]));
          }
          j === oe && !W(me, Q) && (z.push(te), Z.push(me));
        }
    }
    return J[F] = z.length, le;
  }
  function D(y, g) {
    var A = y._values, E = y._index, N = y._ptr, S = y._datatype || y._data === void 0 ? y._datatype : y.getDataType();
    if (!A)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var C = g._data, T = g._datatype || g.getDataType(), O = y._size[0], I = g._size[0], $ = [], F = [], _ = [], L, B = n, W = a, Q = i, Z = 0;
    S && T && S === T && typeof S == "string" && S !== "mixed" && (L = S, B = r.find(n, [L, L]), W = r.find(a, [L, L]), Q = r.find(i, [L, L]), Z = r.convert(0, L));
    var z = [], J = [];
    _[0] = 0;
    for (var le = 0; le < I; le++) {
      var K = C[le];
      if (!Q(K, Z))
        for (var re = N[le], ie = N[le + 1], j = re; j < ie; j++) {
          var te = E[j];
          J[te] ? z[te] = B(z[te], W(K, A[j])) : (J[te] = !0, F.push(te), z[te] = W(K, A[j]));
        }
    }
    for (var oe = F.length, me = 0; me < oe; me++) {
      var be = F[me];
      $[me] = z[be];
    }
    return _[1] = F.length, y.createSparseMatrix({
      values: $,
      index: F,
      ptr: _,
      size: [O, 1],
      datatype: S === y._datatype && T === g._datatype ? L : void 0
    });
  }
  function h(y, g) {
    var A = y._values, E = y._index, N = y._ptr, S = y._datatype || y._data === void 0 ? y._datatype : y.getDataType();
    if (!A)
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    var C = g._data, T = g._datatype || g.getDataType(), O = y._size[0], I = g._size[0], $ = g._size[1], F, _ = n, L = a, B = i, W = 0;
    S && T && S === T && typeof S == "string" && S !== "mixed" && (F = S, _ = r.find(n, [F, F]), L = r.find(a, [F, F]), B = r.find(i, [F, F]), W = r.convert(0, F));
    for (var Q = [], Z = [], z = [], J = y.createSparseMatrix({
      values: Q,
      index: Z,
      ptr: z,
      size: [O, $],
      datatype: S === y._datatype && T === g._datatype ? F : void 0
    }), le = [], K = [], re = 0; re < $; re++) {
      z[re] = Z.length;
      for (var ie = re + 1, j = 0; j < I; j++) {
        var te = C[j][re];
        if (!B(te, W))
          for (var oe = N[j], me = N[j + 1], be = oe; be < me; be++) {
            var we = E[be];
            K[we] !== ie ? (K[we] = ie, Z.push(we), le[we] = L(te, A[be])) : le[we] = _(le[we], L(te, A[be]));
          }
      }
      for (var P = z[re], H = Z.length, ee = P; ee < H; ee++) {
        var k = Z[ee];
        Q[ee] = le[k];
      }
    }
    return z[$] = Z.length, J;
  }
  function w(y, g) {
    var A = y._values, E = y._index, N = y._ptr, S = y._datatype || y._data === void 0 ? y._datatype : y.getDataType(), C = g._values, T = g._index, O = g._ptr, I = g._datatype || g._data === void 0 ? g._datatype : g.getDataType(), $ = y._size[0], F = g._size[1], _ = A && C, L, B = n, W = a;
    S && I && S === I && typeof S == "string" && S !== "mixed" && (L = S, B = r.find(n, [L, L]), W = r.find(a, [L, L]));
    for (var Q = _ ? [] : void 0, Z = [], z = [], J = y.createSparseMatrix({
      values: Q,
      index: Z,
      ptr: z,
      size: [$, F],
      datatype: S === y._datatype && I === g._datatype ? L : void 0
    }), le = _ ? [] : void 0, K = [], re, ie, j, te, oe, me, be, we, P = 0; P < F; P++) {
      z[P] = Z.length;
      var H = P + 1;
      for (oe = O[P], me = O[P + 1], te = oe; te < me; te++)
        if (we = T[te], _)
          for (ie = N[we], j = N[we + 1], re = ie; re < j; re++)
            be = E[re], K[be] !== H ? (K[be] = H, Z.push(be), le[be] = W(C[te], A[re])) : le[be] = B(le[be], W(C[te], A[re]));
        else
          for (ie = N[we], j = N[we + 1], re = ie; re < j; re++)
            be = E[re], K[be] !== H && (K[be] = H, Z.push(be));
      if (_)
        for (var ee = z[P], k = Z.length, V = ee; V < k; V++) {
          var X = Z[V];
          Q[V] = le[X];
        }
    }
    return z[F] = Z.length, J;
  }
  return r(Co, a, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": r.referTo("Matrix, Matrix", (y) => (g, A) => {
      s(Te(g), Te(A));
      var E = y(t(g), t(A));
      return Ce(E) ? E.valueOf() : E;
    }),
    "Matrix, Matrix": function(g, A) {
      var E = g.size(), N = A.size();
      return s(E, N), E.length === 1 ? N.length === 1 ? u(g, A, E[0]) : f(g, A) : N.length === 1 ? v(g, A) : p(g, A);
    },
    "Matrix, Array": r.referTo("Matrix,Matrix", (y) => (g, A) => y(g, t(A))),
    "Array, Matrix": r.referToSelf((y) => (g, A) => y(t(g, A.storage()), A)),
    "SparseMatrix, any": function(g, A) {
      return c(g, A, a, !1);
    },
    "DenseMatrix, any": function(g, A) {
      return l(g, A, a, !1);
    },
    "any, SparseMatrix": function(g, A) {
      return c(A, g, a, !0);
    },
    "any, DenseMatrix": function(g, A) {
      return l(A, g, a, !0);
    },
    "Array, any": function(g, A) {
      return l(t(g), A, a, !1).valueOf();
    },
    "any, Array": function(g, A) {
      return l(t(A), g, a, !0).valueOf();
    },
    "any, any": a,
    "any, any, ...any": r.referToSelf((y) => (g, A, E) => {
      for (var N = y(g, A), S = 0; S < E.length; S++)
        N = y(N, E[S]);
      return N;
    })
  });
}), Mo = "nthRoot", z0 = ["typed", "matrix", "equalScalar", "BigNumber", "concat"], P0 = /* @__PURE__ */ q(Mo, z0, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    BigNumber: a,
    concat: i
  } = e, o = lt({
    typed: r
  }), c = Pr({
    typed: r,
    equalScalar: n
  }), l = ma({
    typed: r,
    equalScalar: n
  }), s = cr({
    typed: r,
    equalScalar: n
  }), u = Qe({
    typed: r,
    matrix: t,
    concat: i
  });
  function f() {
    throw new Error("Complex number not supported in function nthRoot. Use nthRoots instead.");
  }
  return r(Mo, {
    number: Yi,
    "number, number": Yi,
    BigNumber: (v) => m(v, new a(2)),
    "BigNumber, BigNumber": m,
    Complex: f,
    "Complex, number": f,
    Array: r.referTo("DenseMatrix,number", (v) => (p) => v(t(p), 2).valueOf()),
    DenseMatrix: r.referTo("DenseMatrix,number", (v) => (p) => v(p, 2)),
    SparseMatrix: r.referTo("SparseMatrix,number", (v) => (p) => v(p, 2)),
    "SparseMatrix, SparseMatrix": r.referToSelf((v) => (p, d) => {
      if (d.density() === 1)
        return l(p, d, v);
      throw new Error("Root must be non-zero");
    }),
    "DenseMatrix, SparseMatrix": r.referToSelf((v) => (p, d) => {
      if (d.density() === 1)
        return o(p, d, v, !1);
      throw new Error("Root must be non-zero");
    }),
    "Array, SparseMatrix": r.referTo("DenseMatrix,SparseMatrix", (v) => (p, d) => v(t(p), d)),
    "number | BigNumber, SparseMatrix": r.referToSelf((v) => (p, d) => {
      if (d.density() === 1)
        return s(d, p, v, !0);
      throw new Error("Root must be non-zero");
    })
  }, u({
    scalar: "number | BigNumber",
    SD: c,
    Ss: s,
    sS: !1
  }));
  function m(v, p) {
    var d = a.precision, b = a.clone({
      precision: d + 2
    }), x = new a(0), D = new b(1), h = p.isNegative();
    if (h && (p = p.neg()), p.isZero())
      throw new Error("Root must be non-zero");
    if (v.isNegative() && !p.abs().mod(2).equals(1))
      throw new Error("Root must be odd when a is negative.");
    if (v.isZero())
      return h ? new b(1 / 0) : 0;
    if (!v.isFinite())
      return h ? x : v;
    var w = v.abs().pow(D.div(p));
    return w = v.isNeg() ? w.neg() : w, new a((h ? D.div(w) : w).toPrecision(d));
  }
}), _o = "sign", U0 = ["typed", "BigNumber", "Fraction", "complex"], L0 = /* @__PURE__ */ q(_o, U0, (e) => {
  var {
    typed: r,
    BigNumber: t,
    complex: n,
    Fraction: a
  } = e;
  return r(_o, {
    number: Ia,
    Complex: function(o) {
      return o.im === 0 ? n(Ia(o.re)) : o.sign();
    },
    BigNumber: function(o) {
      return new t(o.cmp(0));
    },
    bigint: function(o) {
      return o > 0n ? 1n : o < 0n ? -1n : 0n;
    },
    Fraction: function(o) {
      return new a(o.s, 1);
    },
    // deep map collection, skip zeros since sign(0) = 0
    "Array | Matrix": r.referToSelf((i) => (o) => ze(o, i)),
    Unit: r.referToSelf((i) => (o) => {
      if (!o._isDerived() && o.units[0].unit.offset !== 0)
        throw new TypeError("sign is ambiguous for units with offset");
      return r.find(i, o.valueType())(o.value);
    })
  });
}), k0 = "sqrt", H0 = ["config", "typed", "Complex"], G0 = /* @__PURE__ */ q(k0, H0, (e) => {
  var {
    config: r,
    typed: t,
    Complex: n
  } = e;
  return t("sqrt", {
    number: a,
    Complex: function(o) {
      return o.sqrt();
    },
    BigNumber: function(o) {
      return !o.isNegative() || r.predictable ? o.sqrt() : a(o.toNumber());
    },
    Unit: function(o) {
      return o.pow(0.5);
    }
  });
  function a(i) {
    return isNaN(i) ? NaN : i >= 0 || r.predictable ? Math.sqrt(i) : new n(i, 0).sqrt();
  }
}), Fo = "square", Z0 = ["typed"], V0 = /* @__PURE__ */ q(Fo, Z0, (e) => {
  var {
    typed: r
  } = e;
  return r(Fo, {
    number: cf,
    Complex: function(n) {
      return n.mul(n);
    },
    BigNumber: function(n) {
      return n.times(n);
    },
    bigint: function(n) {
      return n * n;
    },
    Fraction: function(n) {
      return n.mul(n);
    },
    Unit: function(n) {
      return n.pow(2);
    }
  });
}), To = "subtract", W0 = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"], Y0 = /* @__PURE__ */ q(To, W0, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    subtractScalar: a,
    unaryMinus: i,
    DenseMatrix: o,
    concat: c
  } = e, l = lt({
    typed: r
  }), s = yr({
    typed: r
  }), u = fa({
    typed: r,
    equalScalar: n
  }), f = yt({
    typed: r,
    DenseMatrix: o
  }), m = ir({
    typed: r,
    DenseMatrix: o
  }), v = Qe({
    typed: r,
    matrix: t,
    concat: c
  });
  return r(To, {
    "any, any": a
  }, v({
    elop: a,
    SS: u,
    DS: l,
    SD: s,
    Ss: m,
    sS: f
  }));
}), Bo = "xgcd", X0 = ["typed", "config", "matrix", "BigNumber"], J0 = /* @__PURE__ */ q(Bo, X0, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    BigNumber: a
  } = e;
  return r(Bo, {
    "number, number": function(c, l) {
      var s = ff(c, l);
      return t.matrix === "Array" ? s : n(s);
    },
    "BigNumber, BigNumber": i
    // TODO: implement support for Fraction
  });
  function i(o, c) {
    var l, s, u, f = new a(0), m = new a(1), v = f, p = m, d = m, b = f;
    if (!o.isInt() || !c.isInt())
      throw new Error("Parameters in function xgcd must be integer numbers");
    for (; !c.isZero(); )
      s = o.div(c).floor(), u = o.mod(c), l = v, v = p.minus(s.times(v)), p = l, l = d, d = b.minus(s.times(d)), b = l, o = c, c = u;
    var x;
    return o.lt(f) ? x = [o.neg(), p.neg(), b.neg()] : x = [o, o.isZero() ? 0 : p, b], t.matrix === "Array" ? x : n(x);
  }
}), Oo = "invmod", Q0 = ["typed", "config", "BigNumber", "xgcd", "equal", "smaller", "mod", "add", "isInteger"], K0 = /* @__PURE__ */ q(Oo, Q0, (e) => {
  var {
    typed: r,
    config: t,
    BigNumber: n,
    xgcd: a,
    equal: i,
    smaller: o,
    mod: c,
    add: l,
    isInteger: s
  } = e;
  return r(Oo, {
    "number, number": u,
    "BigNumber, BigNumber": u
  });
  function u(f, m) {
    if (!s(f) || !s(m)) throw new Error("Parameters in function invmod must be integer numbers");
    if (f = c(f, m), i(m, 0)) throw new Error("Divisor must be non zero");
    var v = a(f, m);
    v = v.valueOf();
    var [p, d] = v;
    return i(p, n(1)) ? (d = c(d, m), o(d, n(0)) && (d = l(d, m)), d) : NaN;
  }
}), j0 = "matAlgo09xS0Sf", eg = ["typed", "equalScalar"], Zf = /* @__PURE__ */ q(j0, eg, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o) {
    var c = a._values, l = a._index, s = a._ptr, u = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), m = i._values, v = i._index, p = i._ptr, d = i._size, b = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (u.length !== d.length)
      throw new Re(u.length, d.length);
    if (u[0] !== d[0] || u[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + d + ")");
    var x = u[0], D = u[1], h, w = t, y = 0, g = o;
    typeof f == "string" && f === b && f !== "mixed" && (h = f, w = r.find(t, [h, h]), y = r.convert(0, h), g = r.find(o, [h, h]));
    var A = c && m ? [] : void 0, E = [], N = [], S = A ? [] : void 0, C = [], T, O, I, $, F;
    for (O = 0; O < D; O++) {
      N[O] = E.length;
      var _ = O + 1;
      if (S)
        for ($ = p[O], F = p[O + 1], I = $; I < F; I++)
          T = v[I], C[T] = _, S[T] = m[I];
      for ($ = s[O], F = s[O + 1], I = $; I < F; I++)
        if (T = l[I], S) {
          var L = C[T] === _ ? S[T] : y, B = g(c[I], L);
          w(B, y) || (E.push(T), A.push(B));
        } else
          E.push(T);
    }
    return N[D] = E.length, a.createSparseMatrix({
      values: A,
      index: E,
      ptr: N,
      size: [x, D],
      datatype: f === a._datatype && b === i._datatype ? h : void 0
    });
  };
}), $o = "dotMultiply", rg = ["typed", "matrix", "equalScalar", "multiplyScalar", "concat"], tg = /* @__PURE__ */ q($o, rg, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    multiplyScalar: a,
    concat: i
  } = e, o = Pr({
    typed: r,
    equalScalar: n
  }), c = Zf({
    typed: r,
    equalScalar: n
  }), l = cr({
    typed: r,
    equalScalar: n
  }), s = Qe({
    typed: r,
    matrix: t,
    concat: i
  });
  return r($o, s({
    elop: a,
    SS: c,
    DS: o,
    Ss: l
  }));
});
function ng(e, r) {
  if (e.isFinite() && !e.isInteger() || r.isFinite() && !r.isInteger())
    throw new Error("Integers expected in function bitAnd");
  var t = e.constructor;
  if (e.isNaN() || r.isNaN())
    return new t(NaN);
  if (e.isZero() || r.eq(-1) || e.eq(r))
    return e;
  if (r.isZero() || e.eq(-1))
    return r;
  if (!e.isFinite() || !r.isFinite()) {
    if (!e.isFinite() && !r.isFinite())
      return e.isNegative() === r.isNegative() ? e : new t(0);
    if (!e.isFinite())
      return r.isNegative() ? e : e.isNegative() ? new t(0) : r;
    if (!r.isFinite())
      return e.isNegative() ? r : r.isNegative() ? new t(0) : e;
  }
  return si(e, r, function(n, a) {
    return n & a;
  });
}
function nn(e) {
  if (e.isFinite() && !e.isInteger())
    throw new Error("Integer expected in function bitNot");
  var r = e.constructor, t = r.precision;
  r.config({
    precision: 1e9
  });
  var n = e.plus(new r(1));
  return n.s = -n.s || null, r.config({
    precision: t
  }), n;
}
function ag(e, r) {
  if (e.isFinite() && !e.isInteger() || r.isFinite() && !r.isInteger())
    throw new Error("Integers expected in function bitOr");
  var t = e.constructor;
  if (e.isNaN() || r.isNaN())
    return new t(NaN);
  var n = new t(-1);
  return e.isZero() || r.eq(n) || e.eq(r) ? r : r.isZero() || e.eq(n) ? e : !e.isFinite() || !r.isFinite() ? !e.isFinite() && !e.isNegative() && r.isNegative() || e.isNegative() && !r.isNegative() && !r.isFinite() ? n : e.isNegative() && r.isNegative() ? e.isFinite() ? e : r : e.isFinite() ? r : e : si(e, r, function(a, i) {
    return a | i;
  });
}
function si(e, r, t) {
  var n = e.constructor, a, i, o = +(e.s < 0), c = +(r.s < 0);
  if (o) {
    a = dn(nn(e));
    for (var l = 0; l < a.length; ++l)
      a[l] ^= 1;
  } else
    a = dn(e);
  if (c) {
    i = dn(nn(r));
    for (var s = 0; s < i.length; ++s)
      i[s] ^= 1;
  } else
    i = dn(r);
  var u, f, m;
  a.length <= i.length ? (u = a, f = i, m = o) : (u = i, f = a, m = c);
  var v = u.length, p = f.length, d = t(o, c) ^ 1, b = new n(d ^ 1), x = new n(1), D = new n(2), h = n.precision;
  for (n.config({
    precision: 1e9
  }); v > 0; )
    t(u[--v], f[--p]) === d && (b = b.plus(x)), x = x.times(D);
  for (; p > 0; )
    t(m, f[--p]) === d && (b = b.plus(x)), x = x.times(D);
  return n.config({
    precision: h
  }), d === 0 && (b.s = -b.s), b;
}
function dn(e) {
  for (var r = e.d, t = r[0] + "", n = 1; n < r.length; ++n) {
    for (var a = r[n] + "", i = 7 - a.length; i--; )
      a = "0" + a;
    t += a;
  }
  for (var o = t.length; t.charAt(o) === "0"; )
    o--;
  var c = e.e, l = t.slice(0, o + 1 || 1), s = l.length;
  if (c > 0)
    if (++c > s)
      for (c -= s; c--; )
        l += "0";
    else c < s && (l = l.slice(0, c) + "." + l.slice(c));
  for (var u = [0], f = 0; f < l.length; ) {
    for (var m = u.length; m--; )
      u[m] *= 10;
    u[0] += parseInt(l.charAt(f++));
    for (var v = 0; v < u.length; ++v)
      u[v] > 1 && ((u[v + 1] === null || u[v + 1] === void 0) && (u[v + 1] = 0), u[v + 1] += u[v] >> 1, u[v] &= 1);
  }
  return u.reverse();
}
function ig(e, r) {
  if (e.isFinite() && !e.isInteger() || r.isFinite() && !r.isInteger())
    throw new Error("Integers expected in function bitXor");
  var t = e.constructor;
  if (e.isNaN() || r.isNaN())
    return new t(NaN);
  if (e.isZero())
    return r;
  if (r.isZero())
    return e;
  if (e.eq(r))
    return new t(0);
  var n = new t(-1);
  return e.eq(n) ? nn(r) : r.eq(n) ? nn(e) : !e.isFinite() || !r.isFinite() ? !e.isFinite() && !r.isFinite() ? n : new t(e.isNegative() === r.isNegative() ? 1 / 0 : -1 / 0) : si(e, r, function(a, i) {
    return a ^ i;
  });
}
function og(e, r) {
  if (e.isFinite() && !e.isInteger() || r.isFinite() && !r.isInteger())
    throw new Error("Integers expected in function leftShift");
  var t = e.constructor;
  return e.isNaN() || r.isNaN() || r.isNegative() && !r.isZero() ? new t(NaN) : e.isZero() || r.isZero() ? e : !e.isFinite() && !r.isFinite() ? new t(NaN) : r.lt(55) ? e.times(Math.pow(2, r.toNumber()) + "") : e.times(new t(2).pow(r));
}
function sg(e, r) {
  if (e.isFinite() && !e.isInteger() || r.isFinite() && !r.isInteger())
    throw new Error("Integers expected in function rightArithShift");
  var t = e.constructor;
  return e.isNaN() || r.isNaN() || r.isNegative() && !r.isZero() ? new t(NaN) : e.isZero() || r.isZero() ? e : r.isFinite() ? r.lt(55) ? e.div(Math.pow(2, r.toNumber()) + "").floor() : e.div(new t(2).pow(r)).floor() : e.isNegative() ? new t(-1) : e.isFinite() ? new t(0) : new t(NaN);
}
var Io = "bitAnd", ug = ["typed", "matrix", "equalScalar", "concat"], Vf = /* @__PURE__ */ q(Io, ug, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    concat: a
  } = e, i = Pr({
    typed: r,
    equalScalar: n
  }), o = ma({
    typed: r,
    equalScalar: n
  }), c = cr({
    typed: r,
    equalScalar: n
  }), l = Qe({
    typed: r,
    matrix: t,
    concat: a
  });
  return r(Io, {
    "number, number": vf,
    "BigNumber, BigNumber": ng,
    "bigint, bigint": (s, u) => s & u
  }, l({
    SS: o,
    DS: i,
    Ss: c
  }));
}), qo = "bitNot", lg = ["typed"], cg = /* @__PURE__ */ q(qo, lg, (e) => {
  var {
    typed: r
  } = e;
  return r(qo, {
    number: pf,
    BigNumber: nn,
    bigint: (t) => ~t,
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Ro = "bitOr", fg = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], Wf = /* @__PURE__ */ q(Ro, fg, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  } = e, o = lt({
    typed: r
  }), c = oi({
    typed: r,
    equalScalar: n
  }), l = yt({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: t,
    concat: i
  });
  return r(Ro, {
    "number, number": df,
    "BigNumber, BigNumber": ag,
    "bigint, bigint": (u, f) => u | f
  }, s({
    SS: c,
    DS: o,
    Ss: l
  }));
}), mg = "matAlgo07xSSf", vg = ["typed", "DenseMatrix"], kr = /* @__PURE__ */ q(mg, vg, (e) => {
  var {
    typed: r,
    DenseMatrix: t
  } = e;
  return function(i, o, c) {
    var l = i._size, s = i._datatype || i._data === void 0 ? i._datatype : i.getDataType(), u = o._size, f = o._datatype || o._data === void 0 ? o._datatype : o.getDataType();
    if (l.length !== u.length)
      throw new Re(l.length, u.length);
    if (l[0] !== u[0] || l[1] !== u[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + l + ") must match Matrix B (" + u + ")");
    var m = l[0], v = l[1], p, d = 0, b = c;
    typeof s == "string" && s === f && s !== "mixed" && (p = s, d = r.convert(0, p), b = r.find(c, [p, p]));
    var x, D, h = [];
    for (x = 0; x < m; x++)
      h[x] = [];
    var w = [], y = [], g = [], A = [];
    for (D = 0; D < v; D++) {
      var E = D + 1;
      for (n(i, D, g, w, E), n(o, D, A, y, E), x = 0; x < m; x++) {
        var N = g[x] === E ? w[x] : d, S = A[x] === E ? y[x] : d;
        h[x][D] = b(N, S);
      }
    }
    return new t({
      data: h,
      size: [m, v],
      datatype: s === i._datatype && f === o._datatype ? p : void 0
    });
  };
  function n(a, i, o, c, l) {
    for (var s = a._values, u = a._index, f = a._ptr, m = f[i], v = f[i + 1]; m < v; m++) {
      var p = u[m];
      o[p] = l, c[p] = s[m];
    }
  }
}), zo = "bitXor", pg = ["typed", "matrix", "DenseMatrix", "concat"], dg = /* @__PURE__ */ q(zo, pg, (e) => {
  var {
    typed: r,
    matrix: t,
    DenseMatrix: n,
    concat: a
  } = e, i = yr({
    typed: r
  }), o = kr({
    typed: r,
    DenseMatrix: n
  }), c = ir({
    typed: r,
    DenseMatrix: n
  }), l = Qe({
    typed: r,
    matrix: t,
    concat: a
  });
  return r(zo, {
    "number, number": hf,
    "BigNumber, BigNumber": ig,
    "bigint, bigint": (s, u) => s ^ u
  }, l({
    SS: o,
    DS: i,
    Ss: c
  }));
}), Po = "arg", hg = ["typed"], gg = /* @__PURE__ */ q(Po, hg, (e) => {
  var {
    typed: r
  } = e;
  return r(Po, {
    number: function(n) {
      return Math.atan2(0, n);
    },
    BigNumber: function(n) {
      return n.constructor.atan2(0, n);
    },
    Complex: function(n) {
      return n.arg();
    },
    // TODO: implement BigNumber support for function arg
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Uo = "conj", yg = ["typed"], bg = /* @__PURE__ */ q(Uo, yg, (e) => {
  var {
    typed: r
  } = e;
  return r(Uo, {
    "number | BigNumber | Fraction": (t) => t,
    Complex: (t) => t.conjugate(),
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Lo = "im", xg = ["typed"], wg = /* @__PURE__ */ q(Lo, xg, (e) => {
  var {
    typed: r
  } = e;
  return r(Lo, {
    number: () => 0,
    "BigNumber | Fraction": (t) => t.mul(0),
    Complex: (t) => t.im,
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), ko = "re", Dg = ["typed"], Ng = /* @__PURE__ */ q(ko, Dg, (e) => {
  var {
    typed: r
  } = e;
  return r(ko, {
    "number | BigNumber | Fraction": (t) => t,
    Complex: (t) => t.re,
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Ho = "not", Ag = ["typed"], Eg = /* @__PURE__ */ q(Ho, Ag, (e) => {
  var {
    typed: r
  } = e;
  return r(Ho, {
    "null | undefined": () => !0,
    number: wf,
    Complex: function(n) {
      return n.re === 0 && n.im === 0;
    },
    BigNumber: function(n) {
      return n.isZero() || n.isNaN();
    },
    bigint: (t) => !t,
    Unit: r.referToSelf((t) => (n) => r.find(t, n.valueType())(n.value)),
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), Go = "or", Sg = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], Yf = /* @__PURE__ */ q(Go, Sg, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  } = e, o = yr({
    typed: r
  }), c = fa({
    typed: r,
    equalScalar: n
  }), l = ir({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: t,
    concat: i
  });
  return r(Go, {
    "number, number": qa,
    "Complex, Complex": function(f, m) {
      return f.re !== 0 || f.im !== 0 || m.re !== 0 || m.im !== 0;
    },
    "BigNumber, BigNumber": function(f, m) {
      return !f.isZero() && !f.isNaN() || !m.isZero() && !m.isNaN();
    },
    "bigint, bigint": qa,
    "Unit, Unit": r.referToSelf((u) => (f, m) => u(f.value || 0, m.value || 0))
  }, s({
    SS: c,
    DS: o,
    Ss: l
  }));
}), Zo = "xor", Cg = ["typed", "matrix", "DenseMatrix", "concat"], Mg = /* @__PURE__ */ q(Zo, Cg, (e) => {
  var {
    typed: r,
    matrix: t,
    DenseMatrix: n,
    concat: a
  } = e, i = yr({
    typed: r
  }), o = kr({
    typed: r,
    DenseMatrix: n
  }), c = ir({
    typed: r,
    DenseMatrix: n
  }), l = Qe({
    typed: r,
    matrix: t,
    concat: a
  });
  return r(Zo, {
    "number, number": Ra,
    "Complex, Complex": function(u, f) {
      return (u.re !== 0 || u.im !== 0) != (f.re !== 0 || f.im !== 0);
    },
    "bigint, bigint": Ra,
    "BigNumber, BigNumber": function(u, f) {
      return (!u.isZero() && !u.isNaN()) != (!f.isZero() && !f.isNaN());
    },
    "Unit, Unit": r.referToSelf((s) => (u, f) => s(u.value || 0, f.value || 0))
  }, l({
    SS: o,
    DS: i,
    Ss: c
  }));
}), Vo = "concat", _g = ["typed", "matrix", "isInteger"], Xf = /* @__PURE__ */ q(Vo, _g, (e) => {
  var {
    typed: r,
    matrix: t,
    isInteger: n
  } = e;
  return r(Vo, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function(i) {
      var o, c = i.length, l = -1, s, u = !1, f = [];
      for (o = 0; o < c; o++) {
        var m = i[o];
        if (Ce(m) && (u = !0), Oe(m) || Be(m)) {
          if (o !== c - 1)
            throw new Error("Dimension must be specified as last argument");
          if (s = l, l = m.valueOf(), !n(l))
            throw new TypeError("Integer number expected for dimension");
          if (l < 0 || o > 0 && l > s)
            throw new Br(l, s + 1);
        } else {
          var v = Me(m).valueOf(), p = Te(v);
          if (f[o] = v, s = l, l = p.length - 1, o > 0 && l !== s)
            throw new Re(s + 1, l + 1);
        }
      }
      if (f.length === 0)
        throw new SyntaxError("At least one matrix expected");
      for (var d = f.shift(); f.length; )
        d = Yc(d, f.shift(), l);
      return u ? t(d) : d;
    },
    "...string": function(i) {
      return i.join("");
    }
  });
}), Wo = "column", Fg = ["typed", "Index", "matrix", "range"], Jf = /* @__PURE__ */ q(Wo, Fg, (e) => {
  var {
    typed: r,
    Index: t,
    matrix: n,
    range: a
  } = e;
  return r(Wo, {
    "Matrix, number": i,
    "Array, number": function(c, l) {
      return i(n(Me(c)), l).valueOf();
    }
  });
  function i(o, c) {
    if (o.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Xe(c, o.size()[1]);
    var l = a(0, o.size()[0]), s = new t(l, c), u = o.subset(s);
    return Ce(u) ? u : n([[u]]);
  }
}), Yo = "count", Tg = ["typed", "size", "prod"], Bg = /* @__PURE__ */ q(Yo, Tg, (e) => {
  var {
    typed: r,
    size: t,
    prod: n
  } = e;
  return r(Yo, {
    string: function(i) {
      return i.length;
    },
    "Matrix | Array": function(i) {
      return n(t(i));
    }
  });
}), Xo = "cross", Og = ["typed", "matrix", "subtract", "multiply"], $g = /* @__PURE__ */ q(Xo, Og, (e) => {
  var {
    typed: r,
    matrix: t,
    subtract: n,
    multiply: a
  } = e;
  return r(Xo, {
    "Matrix, Matrix": function(c, l) {
      return t(i(c.toArray(), l.toArray()));
    },
    "Matrix, Array": function(c, l) {
      return t(i(c.toArray(), l));
    },
    "Array, Matrix": function(c, l) {
      return t(i(c, l.toArray()));
    },
    "Array, Array": i
  });
  function i(o, c) {
    var l = Math.max(Te(o).length, Te(c).length);
    o = kn(o), c = kn(c);
    var s = Te(o), u = Te(c);
    if (s.length !== 1 || u.length !== 1 || s[0] !== 3 || u[0] !== 3)
      throw new RangeError("Vectors with length 3 expected (Size A = [" + s.join(", ") + "], B = [" + u.join(", ") + "])");
    var f = [n(a(o[1], c[2]), a(o[2], c[1])), n(a(o[2], c[0]), a(o[0], c[2])), n(a(o[0], c[1]), a(o[1], c[0]))];
    return l > 1 ? [f] : f;
  }
}), Jo = "diag", Ig = ["typed", "matrix", "DenseMatrix", "SparseMatrix"], qg = /* @__PURE__ */ q(Jo, Ig, (e) => {
  var {
    typed: r,
    matrix: t,
    DenseMatrix: n,
    SparseMatrix: a
  } = e;
  return r(Jo, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function(s) {
      return i(s, 0, Te(s), null);
    },
    "Array, number": function(s, u) {
      return i(s, u, Te(s), null);
    },
    "Array, BigNumber": function(s, u) {
      return i(s, u.toNumber(), Te(s), null);
    },
    "Array, string": function(s, u) {
      return i(s, 0, Te(s), u);
    },
    "Array, number, string": function(s, u, f) {
      return i(s, u, Te(s), f);
    },
    "Array, BigNumber, string": function(s, u, f) {
      return i(s, u.toNumber(), Te(s), f);
    },
    Matrix: function(s) {
      return i(s, 0, s.size(), s.storage());
    },
    "Matrix, number": function(s, u) {
      return i(s, u, s.size(), s.storage());
    },
    "Matrix, BigNumber": function(s, u) {
      return i(s, u.toNumber(), s.size(), s.storage());
    },
    "Matrix, string": function(s, u) {
      return i(s, 0, s.size(), u);
    },
    "Matrix, number, string": function(s, u, f) {
      return i(s, u, s.size(), f);
    },
    "Matrix, BigNumber, string": function(s, u, f) {
      return i(s, u.toNumber(), s.size(), f);
    }
  });
  function i(l, s, u, f) {
    if (!Ae(s))
      throw new TypeError("Second parameter in function diag must be an integer");
    var m = s > 0 ? s : 0, v = s < 0 ? -s : 0;
    switch (u.length) {
      case 1:
        return o(l, s, f, u[0], v, m);
      case 2:
        return c(l, s, f, u, v, m);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function o(l, s, u, f, m, v) {
    var p = [f + m, f + v];
    if (u && u !== "sparse" && u !== "dense")
      throw new TypeError("Unknown matrix type ".concat(u, '"'));
    var d = u === "sparse" ? a.diagonal(p, l, s) : n.diagonal(p, l, s);
    return u !== null ? d : d.valueOf();
  }
  function c(l, s, u, f, m, v) {
    if (Ce(l)) {
      var p = l.diagonal(s);
      return u !== null ? u !== p.storage() ? t(p, u) : p : p.valueOf();
    }
    for (var d = Math.min(f[0] - m, f[1] - v), b = [], x = 0; x < d; x++)
      b[x] = l[x + m][x + v];
    return u !== null ? t(b) : b;
  }
}), Rg = "filter", zg = ["typed"], Qf = /* @__PURE__ */ q(Rg, zg, (e) => {
  var {
    typed: r
  } = e;
  return r("filter", {
    "Array, function": Qo,
    "Matrix, function": function(n, a) {
      return n.create(Qo(n.valueOf(), a), n.datatype());
    },
    "Array, RegExp": ki,
    "Matrix, RegExp": function(n, a) {
      return n.create(ki(n.valueOf(), a), n.datatype());
    }
  });
});
function Qo(e, r) {
  var t = dt(r, e, "filter");
  return id(e, function(n, a, i) {
    return t(n, [a], i);
  });
}
var Ko = "flatten", Pg = ["typed"], Ug = /* @__PURE__ */ q(Ko, Pg, (e) => {
  var {
    typed: r
  } = e;
  return r(Ko, {
    Array: function(n) {
      return Ge(n);
    },
    Matrix: function(n) {
      return n.create(Ge(n.toArray()), n.datatype());
    }
  });
}), ka = "forEach", Lg = ["typed"], Kf = /* @__PURE__ */ q(ka, Lg, (e) => {
  var {
    typed: r
  } = e;
  return r(ka, {
    "Array, function": kg,
    "Matrix, function": function(n, a) {
      n.forEach(a);
    }
  });
});
function kg(e, r) {
  ti(e, [], e, dt(r, e, ka));
}
var jo = "getMatrixDataType", Hg = ["typed"], Gg = /* @__PURE__ */ q(jo, Hg, (e) => {
  var {
    typed: r
  } = e;
  return r(jo, {
    Array: function(n) {
      return la(n, Je);
    },
    Matrix: function(n) {
      return n.getDataType();
    }
  });
}), es = "identity", Zg = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"], Vg = /* @__PURE__ */ q(es, Zg, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    BigNumber: a,
    DenseMatrix: i,
    SparseMatrix: o
  } = e;
  return r(es, {
    "": function() {
      return t.matrix === "Matrix" ? n([]) : [];
    },
    string: function(u) {
      return n(u);
    },
    "number | BigNumber": function(u) {
      return l(u, u, t.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, string": function(u, f) {
      return l(u, u, f);
    },
    "number | BigNumber, number | BigNumber": function(u, f) {
      return l(u, f, t.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, number | BigNumber, string": function(u, f, m) {
      return l(u, f, m);
    },
    Array: function(u) {
      return c(u);
    },
    "Array, string": function(u, f) {
      return c(u, f);
    },
    Matrix: function(u) {
      return c(u.valueOf(), u.storage());
    },
    "Matrix, string": function(u, f) {
      return c(u.valueOf(), f);
    }
  });
  function c(s, u) {
    switch (s.length) {
      case 0:
        return u ? n(u) : [];
      case 1:
        return l(s[0], s[0], u);
      case 2:
        return l(s[0], s[1], u);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function l(s, u, f) {
    var m = Be(s) || Be(u) ? a : null;
    if (Be(s) && (s = s.toNumber()), Be(u) && (u = u.toNumber()), !Ae(s) || s < 1)
      throw new Error("Parameters in function identity must be positive integers");
    if (!Ae(u) || u < 1)
      throw new Error("Parameters in function identity must be positive integers");
    var v = m ? new a(1) : 1, p = m ? new m(0) : 0, d = [s, u];
    if (f) {
      if (f === "sparse")
        return o.diagonal(d, v, 0, p);
      if (f === "dense")
        return i.diagonal(d, v, 0, p);
      throw new TypeError('Unknown matrix type "'.concat(f, '"'));
    }
    for (var b = It([], d, p), x = s < u ? s : u, D = 0; D < x; D++)
      b[D][D] = v;
    return b;
  }
}), rs = "kron", Wg = ["typed", "matrix", "multiplyScalar"], Yg = /* @__PURE__ */ q(rs, Wg, (e) => {
  var {
    typed: r,
    matrix: t,
    multiplyScalar: n
  } = e;
  return r(rs, {
    "Matrix, Matrix": function(o, c) {
      return t(a(o.toArray(), c.toArray()));
    },
    "Matrix, Array": function(o, c) {
      return t(a(o.toArray(), c));
    },
    "Array, Matrix": function(o, c) {
      return t(a(o, c.toArray()));
    },
    "Array, Array": a
  });
  function a(i, o) {
    if (Te(i).length === 1 && (i = [i]), Te(o).length === 1 && (o = [o]), Te(i).length > 2 || Te(o).length > 2)
      throw new RangeError("Vectors with dimensions greater then 2 are not supported expected (Size x = " + JSON.stringify(i.length) + ", y = " + JSON.stringify(o.length) + ")");
    var c = [], l = [];
    return i.map(function(s) {
      return o.map(function(u) {
        return l = [], c.push(l), s.map(function(f) {
          return u.map(function(m) {
            return l.push(n(f, m));
          });
        });
      });
    }) && c;
  }
}), Da = "map", Xg = ["typed"], jf = /* @__PURE__ */ q(Da, Xg, (e) => {
  var {
    typed: r
  } = e;
  return r(Da, {
    "Array, function": n,
    "Matrix, function": function(i, o) {
      return i.map(o);
    },
    "Array|Matrix, Array|Matrix, ...Array|Matrix|function": (a, i, o) => t([a, i, ...o.slice(0, o.length - 1)], o[o.length - 1])
  });
  function t(a, i) {
    if (typeof i != "function")
      throw new Error("Last argument must be a callback function");
    var o = a[0].isMatrix, c = ei(...a.map((w) => w.isMatrix ? w.size() : Te(w))), l = o ? (w, y) => w.get(y) : ri, s = o ? a.map((w) => w.isMatrix ? w.create(mt(w.toArray(), c), w.datatype()) : a[0].create(mt(w.valueOf(), c))) : a.map((w) => w.isMatrix ? mt(w.toArray(), c) : mt(w, c)), u;
    if (r.isTypedFunction(i)) {
      var f = c.map(() => 0), m = s.map((w) => l(w, f)), v = h(i, m, f, s);
      u = x(v);
    } else {
      var p = a.length, d = D(i, p);
      u = x(d);
    }
    var b = (w, y) => u([w, ...s.slice(1).map((g) => l(g, y))], y);
    if (o)
      return s[0].map(b);
    return n(s[0], b);
    function x(w) {
      switch (w) {
        case 0:
          return (y) => i(...y);
        case 1:
          return (y, g) => i(...y, g);
        case 2:
          return (y, g) => i(...y, g, ...s);
      }
    }
    function D(w, y) {
      return w.length > y + 1 ? 2 : w.length === y + 1 ? 1 : 0;
    }
    function h(w, y, g, A) {
      return r.resolve(w, [...y, g, ...A]) !== null ? 2 : r.resolve(w, [...y, g]) !== null ? 1 : (r.resolve(w, y) !== null, 0);
    }
  }
  function n(a, i) {
    return ti(a, [], a, dt(i, a, Da));
  }
}), ts = "diff", Jg = ["typed", "matrix", "subtract", "number"], em = /* @__PURE__ */ q(ts, Jg, (e) => {
  var {
    typed: r,
    matrix: t,
    subtract: n,
    number: a
  } = e;
  return r(ts, {
    "Array | Matrix": function(u) {
      return Ce(u) ? t(o(u.toArray())) : o(u);
    },
    "Array | Matrix, number": function(u, f) {
      if (!Ae(f)) throw new RangeError("Dimension must be a whole number");
      return Ce(u) ? t(i(u.toArray(), f)) : i(u, f);
    },
    "Array, BigNumber": r.referTo("Array,number", (s) => (u, f) => s(u, a(f))),
    "Matrix, BigNumber": r.referTo("Matrix,number", (s) => (u, f) => s(u, a(f)))
  });
  function i(s, u) {
    if (Ce(s) && (s = s.toArray()), !Array.isArray(s))
      throw RangeError("Array/Matrix does not have that many dimensions");
    if (u > 0) {
      var f = [];
      return s.forEach((m) => {
        f.push(i(m, u - 1));
      }), f;
    } else {
      if (u === 0)
        return o(s);
      throw RangeError("Cannot have negative dimension");
    }
  }
  function o(s) {
    for (var u = [], f = s.length, m = 1; m < f; m++)
      u.push(c(s[m - 1], s[m]));
    return u;
  }
  function c(s, u) {
    Ce(s) && (s = s.toArray()), Ce(u) && (u = u.toArray());
    var f = Array.isArray(s), m = Array.isArray(u);
    if (f && m)
      return l(s, u);
    if (!f && !m)
      return n(u, s);
    throw TypeError("Cannot calculate difference between 1 array and 1 non-array");
  }
  function l(s, u) {
    if (s.length !== u.length)
      throw RangeError("Not all sub-arrays have the same length");
    for (var f = [], m = s.length, v = 0; v < m; v++)
      f.push(c(s[v], u[v]));
    return f;
  }
}), Qg = "ones", Kg = ["typed", "config", "matrix", "BigNumber"], jg = /* @__PURE__ */ q(Qg, Kg, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    BigNumber: a
  } = e;
  return r("ones", {
    "": function() {
      return t.matrix === "Array" ? i([]) : i([], "default");
    },
    // math.ones(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function(s) {
      var u = s[s.length - 1];
      if (typeof u == "string") {
        var f = s.pop();
        return i(s, f);
      } else return t.matrix === "Array" ? i(s) : i(s, "default");
    },
    Array: i,
    Matrix: function(s) {
      var u = s.storage();
      return i(s.valueOf(), u);
    },
    "Array | Matrix, string": function(s, u) {
      return i(s.valueOf(), u);
    }
  });
  function i(l, s) {
    var u = o(l), f = u ? new a(1) : 1;
    if (c(l), s) {
      var m = n(s);
      return l.length > 0 ? m.resize(l, f) : m;
    } else {
      var v = [];
      return l.length > 0 ? It(v, l, f) : v;
    }
  }
  function o(l) {
    var s = !1;
    return l.forEach(function(u, f, m) {
      Be(u) && (s = !0, m[f] = u.toNumber());
    }), s;
  }
  function c(l) {
    l.forEach(function(s) {
      if (typeof s != "number" || !Ae(s) || s < 0)
        throw new Error("Parameters in function ones must be positive integers");
    });
  }
});
function ui() {
  throw new Error('No "bignumber" implementation available');
}
function rm() {
  throw new Error('No "fraction" implementation available');
}
function tm() {
  throw new Error('No "matrix" implementation available');
}
var ns = "range", e1 = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], nm = /* @__PURE__ */ q(ns, e1, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    bignumber: a,
    smaller: i,
    smallerEq: o,
    larger: c,
    largerEq: l,
    add: s,
    isPositive: u
  } = e;
  return r(ns, {
    // TODO: simplify signatures when typed-function supports default values and optional arguments
    // TODO: a number or boolean should not be converted to string here
    string: m,
    "string, boolean": m,
    "number, number": function(b, x) {
      return f(v(b, x, 1, !1));
    },
    "number, number, number": function(b, x, D) {
      return f(v(b, x, D, !1));
    },
    "number, number, boolean": function(b, x, D) {
      return f(v(b, x, 1, D));
    },
    "number, number, number, boolean": function(b, x, D, h) {
      return f(v(b, x, D, h));
    },
    "BigNumber, BigNumber": function(b, x) {
      var D = b.constructor;
      return f(v(b, x, new D(1), !1));
    },
    "BigNumber, BigNumber, BigNumber": function(b, x, D) {
      return f(v(b, x, D, !1));
    },
    "BigNumber, BigNumber, boolean": function(b, x, D) {
      var h = b.constructor;
      return f(v(b, x, new h(1), D));
    },
    "BigNumber, BigNumber, BigNumber, boolean": function(b, x, D, h) {
      return f(v(b, x, D, h));
    },
    "Unit, Unit, Unit": function(b, x, D) {
      return f(v(b, x, D, !1));
    },
    "Unit, Unit, Unit, boolean": function(b, x, D, h) {
      return f(v(b, x, D, h));
    }
  });
  function f(d) {
    return t.matrix === "Matrix" ? n ? n(d) : tm() : d;
  }
  function m(d, b) {
    var x = p(d);
    if (!x)
      throw new SyntaxError('String "' + d + '" is no valid range');
    return t.number === "BigNumber" ? (a === void 0 && ui(), f(v(a(x.start), a(x.end), a(x.step)))) : f(v(x.start, x.end, x.step, b));
  }
  function v(d, b, x, D) {
    for (var h = [], w = u(x) ? D ? o : i : D ? l : c, y = d; w(y, b); )
      h.push(y), y = s(y, x);
    return h;
  }
  function p(d) {
    var b = d.split(":"), x = b.map(function(h) {
      return Number(h);
    }), D = x.some(function(h) {
      return isNaN(h);
    });
    if (D)
      return null;
    switch (x.length) {
      case 2:
        return {
          start: x[0],
          end: x[1],
          step: 1
        };
      case 3:
        return {
          start: x[0],
          end: x[2],
          step: x[1]
        };
      default:
        return null;
    }
  }
}), as = "reshape", r1 = ["typed", "isInteger", "matrix"], t1 = /* @__PURE__ */ q(as, r1, (e) => {
  var {
    typed: r,
    isInteger: t
  } = e;
  return r(as, {
    "Matrix, Array": function(a, i) {
      return a.reshape(i, !0);
    },
    "Array, Array": function(a, i) {
      return i.forEach(function(o) {
        if (!t(o))
          throw new TypeError("Invalid size for dimension: " + o);
      }), Ka(a, i);
    }
  });
}), n1 = "resize", a1 = ["config", "matrix"], i1 = /* @__PURE__ */ q(n1, a1, (e) => {
  var {
    config: r,
    matrix: t
  } = e;
  return function(i, o, c) {
    if (arguments.length !== 2 && arguments.length !== 3)
      throw new Qr("resize", arguments.length, 2, 3);
    if (Ce(o) && (o = o.valueOf()), Be(o[0]) && (o = o.map(function(u) {
      return Be(u) ? u.toNumber() : u;
    })), Ce(i))
      return i.resize(o, c, !0);
    if (typeof i == "string")
      return n(i, o, c);
    var l = Array.isArray(i) ? !1 : r.matrix !== "Array";
    if (o.length === 0) {
      for (; Array.isArray(i); )
        i = i[0];
      return Me(i);
    } else {
      Array.isArray(i) || (i = [i]), i = Me(i);
      var s = It(i, o, c);
      return l ? t(s) : s;
    }
  };
  function n(a, i, o) {
    if (o !== void 0) {
      if (typeof o != "string" || o.length !== 1)
        throw new TypeError("Single character expected as defaultValue");
    } else
      o = " ";
    if (i.length !== 1)
      throw new Re(i.length, 1);
    var c = i[0];
    if (typeof c != "number" || !Ae(c))
      throw new TypeError("Invalid size, must contain positive integers (size: " + Pe(i) + ")");
    if (a.length > c)
      return a.substring(0, c);
    if (a.length < c) {
      for (var l = a, s = 0, u = c - a.length; s < u; s++)
        l += o;
      return l;
    } else
      return a;
  }
}), is = "rotate", o1 = ["typed", "multiply", "rotationMatrix"], s1 = /* @__PURE__ */ q(is, o1, (e) => {
  var {
    typed: r,
    multiply: t,
    rotationMatrix: n
  } = e;
  return r(is, {
    "Array , number | BigNumber | Complex | Unit": function(o, c) {
      a(o, 2);
      var l = t(n(c), o);
      return l.toArray();
    },
    "Matrix , number | BigNumber | Complex | Unit": function(o, c) {
      return a(o, 2), t(n(c), o);
    },
    "Array, number | BigNumber | Complex | Unit, Array | Matrix": function(o, c, l) {
      a(o, 3);
      var s = t(n(c, l), o);
      return s;
    },
    "Matrix, number | BigNumber | Complex | Unit, Array | Matrix": function(o, c, l) {
      return a(o, 3), t(n(c, l), o);
    }
  });
  function a(i, o) {
    var c = Array.isArray(i) ? Te(i) : i.size();
    if (c.length > 2)
      throw new RangeError("Vector must be of dimensions 1x".concat(o));
    if (c.length === 2 && c[1] !== 1)
      throw new RangeError("Vector must be of dimensions 1x".concat(o));
    if (c[0] !== o)
      throw new RangeError("Vector must be of dimensions 1x".concat(o));
  }
}), os = "rotationMatrix", u1 = ["typed", "config", "multiplyScalar", "addScalar", "unaryMinus", "norm", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix", "cos", "sin"], l1 = /* @__PURE__ */ q(os, u1, (e) => {
  var {
    typed: r,
    config: t,
    multiplyScalar: n,
    addScalar: a,
    unaryMinus: i,
    norm: o,
    BigNumber: c,
    matrix: l,
    DenseMatrix: s,
    SparseMatrix: u,
    cos: f,
    sin: m
  } = e;
  return r(os, {
    "": function() {
      return t.matrix === "Matrix" ? l([]) : [];
    },
    string: function(h) {
      return l(h);
    },
    "number | BigNumber | Complex | Unit": function(h) {
      return v(h, t.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber | Complex | Unit, string": function(h, w) {
      return v(h, w);
    },
    "number | BigNumber | Complex | Unit, Array": function(h, w) {
      var y = l(w);
      return p(y), x(h, y, void 0);
    },
    "number | BigNumber | Complex | Unit, Matrix": function(h, w) {
      p(w);
      var y = w.storage() || (t.matrix === "Matrix" ? "dense" : void 0);
      return x(h, w, y);
    },
    "number | BigNumber | Complex | Unit, Array, string": function(h, w, y) {
      var g = l(w);
      return p(g), x(h, g, y);
    },
    "number | BigNumber | Complex | Unit, Matrix, string": function(h, w, y) {
      return p(w), x(h, w, y);
    }
  });
  function v(D, h) {
    var w = Be(D), y = w ? new c(-1) : -1, g = f(D), A = m(D), E = [[g, n(y, A)], [A, g]];
    return b(E, h);
  }
  function p(D) {
    var h = D.size();
    if (h.length < 1 || h[0] !== 3)
      throw new RangeError("Vector must be of dimensions 1x3");
  }
  function d(D) {
    return D.reduce((h, w) => n(h, w));
  }
  function b(D, h) {
    if (h) {
      if (h === "sparse")
        return new u(D);
      if (h === "dense")
        return new s(D);
      throw new TypeError('Unknown matrix type "'.concat(h, '"'));
    }
    return D;
  }
  function x(D, h, w) {
    var y = o(h);
    if (y === 0)
      throw new RangeError("Rotation around zero vector");
    var g = Be(D) ? c : null, A = g ? new g(1) : 1, E = g ? new g(-1) : -1, N = g ? new g(h.get([0]) / y) : h.get([0]) / y, S = g ? new g(h.get([1]) / y) : h.get([1]) / y, C = g ? new g(h.get([2]) / y) : h.get([2]) / y, T = f(D), O = a(A, i(T)), I = m(D), $ = a(T, d([N, N, O])), F = a(d([N, S, O]), d([E, C, I])), _ = a(d([N, C, O]), d([S, I])), L = a(d([N, S, O]), d([C, I])), B = a(T, d([S, S, O])), W = a(d([S, C, O]), d([E, N, I])), Q = a(d([N, C, O]), d([E, S, I])), Z = a(d([S, C, O]), d([N, I])), z = a(T, d([C, C, O])), J = [[$, F, _], [L, B, W], [Q, Z, z]];
    return b(J, w);
  }
}), ss = "row", c1 = ["typed", "Index", "matrix", "range"], am = /* @__PURE__ */ q(ss, c1, (e) => {
  var {
    typed: r,
    Index: t,
    matrix: n,
    range: a
  } = e;
  return r(ss, {
    "Matrix, number": i,
    "Array, number": function(c, l) {
      return i(n(Me(c)), l).valueOf();
    }
  });
  function i(o, c) {
    if (o.size().length !== 2)
      throw new Error("Only two dimensional matrix is supported");
    Xe(c, o.size()[0]);
    var l = a(0, o.size()[1]), s = new t(c, l), u = o.subset(s);
    return Ce(u) ? u : n([[u]]);
  }
}), us = "size", f1 = ["typed", "config", "?matrix"], m1 = /* @__PURE__ */ q(us, f1, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n
  } = e;
  return r(us, {
    Matrix: function(i) {
      return i.create(i.size(), "number");
    },
    Array: Te,
    string: function(i) {
      return t.matrix === "Array" ? [i.length] : n([i.length], "dense", "number");
    },
    "number | Complex | BigNumber | Unit | boolean | null": function(i) {
      return t.matrix === "Array" ? [] : n ? n([], "dense", "number") : tm();
    }
  });
}), ls = "squeeze", v1 = ["typed"], p1 = /* @__PURE__ */ q(ls, v1, (e) => {
  var {
    typed: r
  } = e;
  return r(ls, {
    Array: function(n) {
      return kn(Me(n));
    },
    Matrix: function(n) {
      var a = kn(n.toArray());
      return Array.isArray(a) ? n.create(a, n.datatype()) : a;
    },
    any: function(n) {
      return Me(n);
    }
  });
}), cs = "subset", d1 = ["typed", "matrix", "zeros", "add"], im = /* @__PURE__ */ q(cs, d1, (e) => {
  var {
    typed: r,
    matrix: t,
    zeros: n,
    add: a
  } = e;
  return r(cs, {
    // get subset
    "Matrix, Index": function(c, l) {
      return $t(l) ? t() : (Ln(c, l), c.subset(l));
    },
    "Array, Index": r.referTo("Matrix, Index", function(o) {
      return function(c, l) {
        var s = o(t(c), l);
        return l.isScalar() ? s : s.valueOf();
      };
    }),
    "Object, Index": g1,
    "string, Index": h1,
    // set subset
    "Matrix, Index, any, any": function(c, l, s, u) {
      return $t(l) ? c : (Ln(c, l), c.clone().subset(l, i(s, l), u));
    },
    "Array, Index, any, any": r.referTo("Matrix, Index, any, any", function(o) {
      return function(c, l, s, u) {
        var f = o(t(c), l, s, u);
        return f.isMatrix ? f.valueOf() : f;
      };
    }),
    "Array, Index, any": r.referTo("Matrix, Index, any, any", function(o) {
      return function(c, l, s) {
        return o(t(c), l, s, void 0).valueOf();
      };
    }),
    "Matrix, Index, any": r.referTo("Matrix, Index, any, any", function(o) {
      return function(c, l, s) {
        return o(c, l, s, void 0);
      };
    }),
    "string, Index, string": fs,
    "string, Index, string, string": fs,
    "Object, Index, any": y1
  });
  function i(o, c) {
    if (typeof o == "string")
      throw new Error("can't boradcast a string");
    if (c._isScalar)
      return o;
    var l = c.size();
    if (l.every((s) => s > 0))
      try {
        return a(o, n(l));
      } catch {
        return o;
      }
    else
      return o;
  }
});
function h1(e, r) {
  if (!on(r))
    throw new TypeError("Index expected");
  if ($t(r))
    return "";
  if (Ln(Array.from(e), r), r.size().length !== 1)
    throw new Re(r.size().length, 1);
  var t = e.length;
  Xe(r.min()[0], t), Xe(r.max()[0], t);
  var n = r.dimension(0), a = "";
  return n.forEach(function(i) {
    a += e.charAt(i);
  }), a;
}
function fs(e, r, t, n) {
  if (!r || r.isIndex !== !0)
    throw new TypeError("Index expected");
  if ($t(r))
    return e;
  if (Ln(Array.from(e), r), r.size().length !== 1)
    throw new Re(r.size().length, 1);
  if (n !== void 0) {
    if (typeof n != "string" || n.length !== 1)
      throw new TypeError("Single character expected as defaultValue");
  } else
    n = " ";
  var a = r.dimension(0), i = a.size()[0];
  if (i !== t.length)
    throw new Re(a.size()[0], t.length);
  var o = e.length;
  Xe(r.min()[0]), Xe(r.max()[0]);
  for (var c = [], l = 0; l < o; l++)
    c[l] = e.charAt(l);
  if (a.forEach(function(f, m) {
    c[f] = t.charAt(m[0]);
  }), c.length > o)
    for (var s = o - 1, u = c.length; s < u; s++)
      c[s] || (c[s] = n);
  return c.join("");
}
function g1(e, r) {
  if (!$t(r)) {
    if (r.size().length !== 1)
      throw new Re(r.size(), 1);
    var t = r.dimension(0);
    if (typeof t != "string")
      throw new TypeError("String expected as index to retrieve an object property");
    return hr(e, t);
  }
}
function y1(e, r, t) {
  if ($t(r))
    return e;
  if (r.size().length !== 1)
    throw new Re(r.size(), 1);
  var n = r.dimension(0);
  if (typeof n != "string")
    throw new TypeError("String expected as index to retrieve an object property");
  var a = Me(e);
  return Bt(a, n, t), a;
}
var ms = "transpose", b1 = ["typed", "matrix"], x1 = /* @__PURE__ */ q(ms, b1, (e) => {
  var {
    typed: r,
    matrix: t
  } = e;
  return r(ms, {
    Array: (o) => n(t(o)).valueOf(),
    Matrix: n,
    any: Me
    // scalars
  });
  function n(o) {
    var c = o.size(), l;
    switch (c.length) {
      case 1:
        l = o.clone();
        break;
      case 2:
        {
          var s = c[0], u = c[1];
          if (u === 0)
            throw new RangeError("Cannot transpose a 2D matrix with no columns (size: " + Pe(c) + ")");
          switch (o.storage()) {
            case "dense":
              l = a(o, s, u);
              break;
            case "sparse":
              l = i(o, s, u);
              break;
          }
        }
        break;
      default:
        throw new RangeError("Matrix must be a vector or two dimensional (size: " + Pe(c) + ")");
    }
    return l;
  }
  function a(o, c, l) {
    for (var s = o._data, u = [], f, m = 0; m < l; m++) {
      f = u[m] = [];
      for (var v = 0; v < c; v++)
        f[v] = Me(s[v][m]);
    }
    return o.createDenseMatrix({
      data: u,
      size: [l, c],
      datatype: o._datatype
    });
  }
  function i(o, c, l) {
    for (var s = o._values, u = o._index, f = o._ptr, m = s ? [] : void 0, v = [], p = [], d = [], b = 0; b < c; b++)
      d[b] = 0;
    var x, D, h;
    for (x = 0, D = u.length; x < D; x++)
      d[u[x]]++;
    for (var w = 0, y = 0; y < c; y++)
      p.push(w), w += d[y], d[y] = p[y];
    for (p.push(w), h = 0; h < l; h++)
      for (var g = f[h], A = f[h + 1], E = g; E < A; E++) {
        var N = d[u[E]]++;
        v[N] = h, s && (m[N] = Me(s[E]));
      }
    return o.createSparseMatrix({
      values: m,
      index: v,
      ptr: p,
      size: [l, c],
      datatype: o._datatype
    });
  }
}), vs = "ctranspose", w1 = ["typed", "transpose", "conj"], D1 = /* @__PURE__ */ q(vs, w1, (e) => {
  var {
    typed: r,
    transpose: t,
    conj: n
  } = e;
  return r(vs, {
    any: function(i) {
      return n(t(i));
    }
  });
}), ps = "zeros", N1 = ["typed", "config", "matrix", "BigNumber"], A1 = /* @__PURE__ */ q(ps, N1, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    BigNumber: a
  } = e;
  return r(ps, {
    "": function() {
      return t.matrix === "Array" ? i([]) : i([], "default");
    },
    // math.zeros(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function(s) {
      var u = s[s.length - 1];
      if (typeof u == "string") {
        var f = s.pop();
        return i(s, f);
      } else return t.matrix === "Array" ? i(s) : i(s, "default");
    },
    Array: i,
    Matrix: function(s) {
      var u = s.storage();
      return i(s.valueOf(), u);
    },
    "Array | Matrix, string": function(s, u) {
      return i(s.valueOf(), u);
    }
  });
  function i(l, s) {
    var u = o(l), f = u ? new a(0) : 0;
    if (c(l), s) {
      var m = n(s);
      return l.length > 0 ? m.resize(l, f) : m;
    } else {
      var v = [];
      return l.length > 0 ? It(v, l, f) : v;
    }
  }
  function o(l) {
    var s = !1;
    return l.forEach(function(u, f, m) {
      Be(u) && (s = !0, m[f] = u.toNumber());
    }), s;
  }
  function c(l) {
    l.forEach(function(s) {
      if (typeof s != "number" || !Ae(s) || s < 0)
        throw new Error("Parameters in function zeros must be positive integers");
    });
  }
}), ds = "fft", E1 = ["typed", "matrix", "addScalar", "multiplyScalar", "divideScalar", "exp", "tau", "i", "dotDivide", "conj", "pow", "ceil", "log2"], S1 = /* @__PURE__ */ q(ds, E1, (e) => {
  var {
    typed: r,
    matrix: t,
    addScalar: n,
    multiplyScalar: a,
    divideScalar: i,
    exp: o,
    tau: c,
    i: l,
    dotDivide: s,
    conj: u,
    pow: f,
    ceil: m,
    log2: v
  } = e;
  return r(ds, {
    Array: p,
    Matrix: function(h) {
      return h.create(p(h.valueOf()), h.datatype());
    }
  });
  function p(D) {
    var h = Te(D);
    return h.length === 1 ? x(D, h[0]) : d(D.map((w) => p(w, h.slice(1))), 0);
  }
  function d(D, h) {
    var w = Te(D);
    if (h !== 0) return new Array(w[0]).fill(0).map((g, A) => d(D[A], h - 1));
    if (w.length === 1) return x(D);
    function y(g) {
      var A = Te(g);
      return new Array(A[1]).fill(0).map((E, N) => new Array(A[0]).fill(0).map((S, C) => g[C][N]));
    }
    return y(d(y(D), 1));
  }
  function b(D) {
    for (var h = D.length, w = o(i(a(-1, a(l, c)), h)), y = [], g = 1 - h; g < h; g++)
      y.push(f(w, i(f(g, 2), 2)));
    for (var A = f(2, m(v(h + h - 1))), E = [...new Array(h).fill(0).map((F, _) => a(D[_], y[h - 1 + _])), ...new Array(A - h).fill(0)], N = [...new Array(h + h - 1).fill(0).map((F, _) => i(1, y[_])), ...new Array(A - (h + h - 1)).fill(0)], S = x(E), C = x(N), T = new Array(A).fill(0).map((F, _) => a(S[_], C[_])), O = s(u(p(u(T))), A), I = [], $ = h - 1; $ < h + h - 1; $++)
      I.push(a(O[$], y[$]));
    return I;
  }
  function x(D) {
    var h = D.length;
    if (h === 1) return [D[0]];
    if (h % 2 === 0) {
      for (var w = [...x(D.filter((E, N) => N % 2 === 0)), ...x(D.filter((E, N) => N % 2 === 1))], y = 0; y < h / 2; y++) {
        var g = w[y], A = a(w[y + h / 2], o(a(a(c, l), i(-y, h))));
        w[y] = n(g, A), w[y + h / 2] = n(g, a(-1, A));
      }
      return w;
    } else
      return b(D);
  }
}), hs = "ifft", C1 = ["typed", "fft", "dotDivide", "conj"], M1 = /* @__PURE__ */ q(hs, C1, (e) => {
  var {
    typed: r,
    fft: t,
    dotDivide: n,
    conj: a
  } = e;
  return r(hs, {
    "Array | Matrix": function(o) {
      var c = Ce(o) ? o.size() : Te(o);
      return n(a(t(a(o))), c.reduce((l, s) => l * s, 1));
    }
  });
});
function an(e) {
  "@babel/helpers - typeof";
  return an = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
    return typeof r;
  } : function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, an(e);
}
function _1(e, r) {
  if (an(e) != "object" || !e) return e;
  var t = e[Symbol.toPrimitive];
  if (t !== void 0) {
    var n = t.call(e, r || "default");
    if (an(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (r === "string" ? String : Number)(e);
}
function F1(e) {
  var r = _1(e, "string");
  return an(r) == "symbol" ? r : r + "";
}
function ar(e, r, t) {
  return (r = F1(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function gs(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    r && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function T1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? gs(Object(t), !0).forEach(function(n) {
      ar(e, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : gs(Object(t)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return e;
}
var B1 = "solveODE", O1 = ["typed", "add", "subtract", "multiply", "divide", "max", "map", "abs", "isPositive", "isNegative", "larger", "smaller", "matrix", "bignumber", "unaryMinus"], $1 = /* @__PURE__ */ q(B1, O1, (e) => {
  var {
    typed: r,
    add: t,
    subtract: n,
    multiply: a,
    divide: i,
    max: o,
    map: c,
    abs: l,
    isPositive: s,
    isNegative: u,
    larger: f,
    smaller: m,
    matrix: v,
    bignumber: p,
    unaryMinus: d
  } = e;
  function b(E) {
    return function(N, S, C, T) {
      var O = !(S.length === 2 && (S.every(g) || S.every(wr)));
      if (O)
        throw new Error('"tspan" must be an Array of two numeric values or two units [tStart, tEnd]');
      var I = S[0], $ = S[1], F = f($, I), _ = T.firstStep;
      if (_ !== void 0 && !s(_))
        throw new Error('"firstStep" must be positive');
      var L = T.maxStep;
      if (L !== void 0 && !s(L))
        throw new Error('"maxStep" must be positive');
      var B = T.minStep;
      if (B && u(B))
        throw new Error('"minStep" must be positive or zero');
      var W = [I, $, _, B, L].filter((R) => R !== void 0);
      if (!(W.every(g) || W.every(wr)))
        throw new Error('Inconsistent type of "t" dependant variables');
      for (var Q = 1, Z = T.tol ? T.tol : 1e-4, z = T.minDelta ? T.minDelta : 0.2, J = T.maxDelta ? T.maxDelta : 5, le = T.maxIter ? T.maxIter : 1e4, K = [I, $, ...C, L, B].some(Be), [re, ie, j, te] = K ? [p(E.a), p(E.c), p(E.b), p(E.bp)] : [E.a, E.c, E.b, E.bp], oe = _ ? F ? _ : d(_) : i(n($, I), Q), me = [I], be = [C], we = n(j, te), P = 0, H = 0, ee = w(F), k = y(F); ee(me[P], $); ) {
        var V = [];
        oe = k(me[P], $, oe), V.push(N(me[P], be[P]));
        for (var X = 1; X < ie.length; ++X)
          V.push(N(t(me[P], a(ie[X], oe)), t(be[P], a(oe, re[X], V))));
        var fe = o(l(c(a(we, V), (R) => wr(R) ? R.value : R)));
        fe < Z && Z / fe > 1 / 4 && (me.push(t(me[P], oe)), be.push(t(be[P], a(oe, j, V))), P++);
        var ce = 0.84 * (Z / fe) ** (1 / 5);
        if (m(ce, z) ? ce = z : f(ce, J) && (ce = J), ce = K ? p(ce) : ce, oe = a(oe, ce), L && f(l(oe), L) ? oe = F ? L : d(L) : B && m(l(oe), B) && (oe = F ? B : d(B)), H++, H > le)
          throw new Error("Maximum number of iterations reached, try changing options");
      }
      return {
        t: me,
        y: be
      };
    };
  }
  function x(E, N, S, C) {
    var T = [[], [0.5], [0, 0.75], [0.2222222222222222, 0.3333333333333333, 0.4444444444444444]], O = [null, 1 / 2, 3 / 4, 1], I = [2 / 9, 1 / 3, 4 / 9, 0], $ = [7 / 24, 1 / 4, 1 / 3, 1 / 8], F = {
      a: T,
      c: O,
      b: I,
      bp: $
    };
    return b(F)(E, N, S, C);
  }
  function D(E, N, S, C) {
    var T = [[], [0.2], [0.075, 0.225], [0.9777777777777777, -3.7333333333333334, 3.5555555555555554], [2.9525986892242035, -11.595793324188385, 9.822892851699436, -0.2908093278463649], [2.8462752525252526, -10.757575757575758, 8.906422717743473, 0.2784090909090909, -0.2735313036020583], [0.09114583333333333, 0, 0.44923629829290207, 0.6510416666666666, -0.322376179245283, 0.13095238095238096]], O = [null, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1], I = [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0], $ = [5179 / 57600, 0, 7571 / 16695, 393 / 640, -92097 / 339200, 187 / 2100, 1 / 40], F = {
      a: T,
      c: O,
      b: I,
      bp: $
    };
    return b(F)(E, N, S, C);
  }
  function h(E, N, S, C) {
    var T = C.method ? C.method : "RK45", O = {
      RK23: x,
      RK45: D
    };
    if (T.toUpperCase() in O) {
      var I = T1({}, C);
      return delete I.method, O[T.toUpperCase()](E, N, S, I);
    } else {
      var $ = Object.keys(O).map((_) => '"'.concat(_, '"')), F = "".concat($.slice(0, -1).join(", "), " and ").concat($.slice(-1));
      throw new Error('Unavailable method "'.concat(T, '". Available methods are ').concat(F));
    }
  }
  function w(E) {
    return E ? m : f;
  }
  function y(E) {
    var N = E ? f : m;
    return function(S, C, T) {
      var O = t(S, T);
      return N(O, C) ? n(C, S) : T;
    };
  }
  function g(E) {
    return Be(E) || Oe(E);
  }
  function A(E, N, S, C) {
    var T = h(E, N.toArray(), S.toArray(), C);
    return {
      t: v(T.t),
      y: v(T.y)
    };
  }
  return r("solveODE", {
    "function, Array, Array, Object": h,
    "function, Matrix, Matrix, Object": A,
    "function, Array, Array": (E, N, S) => h(E, N, S, {}),
    "function, Matrix, Matrix": (E, N, S) => A(E, N, S, {}),
    "function, Array, number | BigNumber | Unit": (E, N, S) => {
      var C = h(E, N, [S], {});
      return {
        t: C.t,
        y: C.y.map((T) => T[0])
      };
    },
    "function, Matrix, number | BigNumber | Unit": (E, N, S) => {
      var C = h(E, N.toArray(), [S], {});
      return {
        t: v(C.t),
        y: v(C.y.map((T) => T[0]))
      };
    },
    "function, Array, number | BigNumber | Unit, Object": (E, N, S, C) => {
      var T = h(E, N, [S], C);
      return {
        t: T.t,
        y: T.y.map((O) => O[0])
      };
    },
    "function, Matrix, number | BigNumber | Unit, Object": (E, N, S, C) => {
      var T = h(E, N.toArray(), [S], C);
      return {
        t: v(T.t),
        y: v(T.y.map((O) => O[0]))
      };
    }
  });
}), I1 = "erf", q1 = ["typed"], R1 = /* @__PURE__ */ q(I1, q1, (e) => {
  var {
    typed: r
  } = e;
  return r("name", {
    number: function(o) {
      var c = Math.abs(o);
      return c >= U1 ? rt(o) : c <= z1 ? rt(o) * t(c) : c <= 4 ? rt(o) * (1 - n(c)) : rt(o) * (1 - a(c));
    },
    "Array | Matrix": r.referToSelf((i) => (o) => ze(o, i))
    // TODO: For complex numbers, use the approximation for the Faddeeva function
    //  from "More Efficient Computation of the Complex Error Function" (AMS)
  });
  function t(i) {
    var o = i * i, c = Gr[0][4] * o, l = o, s;
    for (s = 0; s < 3; s += 1)
      c = (c + Gr[0][s]) * o, l = (l + Nt[0][s]) * o;
    return i * (c + Gr[0][3]) / (l + Nt[0][3]);
  }
  function n(i) {
    var o = Gr[1][8] * i, c = i, l;
    for (l = 0; l < 7; l += 1)
      o = (o + Gr[1][l]) * i, c = (c + Nt[1][l]) * i;
    var s = (o + Gr[1][7]) / (c + Nt[1][7]), u = parseInt(i * 16) / 16, f = (i - u) * (i + u);
    return Math.exp(-u * u) * Math.exp(-f) * s;
  }
  function a(i) {
    var o = 1 / (i * i), c = Gr[2][5] * o, l = o, s;
    for (s = 0; s < 4; s += 1)
      c = (c + Gr[2][s]) * o, l = (l + Nt[2][s]) * o;
    var u = o * (c + Gr[2][4]) / (l + Nt[2][4]);
    u = (P1 - u) / i, o = parseInt(i * 16) / 16;
    var f = (i - o) * (i + o);
    return Math.exp(-o * o) * Math.exp(-f) * u;
  }
}), z1 = 0.46875, P1 = 0.5641895835477563, Gr = [[3.1611237438705655, 113.86415415105016, 377.485237685302, 3209.3775891384694, 0.18577770618460315], [0.5641884969886701, 8.883149794388377, 66.11919063714163, 298.6351381974001, 881.952221241769, 1712.0476126340707, 2051.0783778260716, 1230.3393547979972, 21531153547440383e-24], [0.30532663496123236, 0.36034489994980445, 0.12578172611122926, 0.016083785148742275, 6587491615298378e-19, 0.016315387137302097]], Nt = [[23.601290952344122, 244.02463793444417, 1282.6165260773723, 2844.236833439171], [15.744926110709835, 117.6939508913125, 537.1811018620099, 1621.3895745666903, 3290.7992357334597, 4362.619090143247, 3439.3676741437216, 1230.3393548037495], [2.568520192289822, 1.8729528499234604, 0.5279051029514285, 0.06051834131244132, 0.0023352049762686918]], U1 = Math.pow(2, 53), ys = "zeta", L1 = ["typed", "config", "multiply", "pow", "divide", "factorial", "equal", "smallerEq", "isNegative", "gamma", "sin", "subtract", "add", "?Complex", "?BigNumber", "pi"], k1 = /* @__PURE__ */ q(ys, L1, (e) => {
  var {
    typed: r,
    config: t,
    multiply: n,
    pow: a,
    divide: i,
    factorial: o,
    equal: c,
    smallerEq: l,
    isNegative: s,
    gamma: u,
    sin: f,
    subtract: m,
    add: v,
    Complex: p,
    BigNumber: d,
    pi: b
  } = e;
  return r(ys, {
    number: (g) => x(g, (A) => A, () => 20),
    BigNumber: (g) => x(g, (A) => new d(A), () => Math.abs(Math.log10(t.relTol))),
    Complex: D
  });
  function x(g, A, E) {
    return c(g, 0) ? A(-0.5) : c(g, 1) ? A(NaN) : isFinite(g) ? h(g, A, E, (N) => N) : s(g) ? A(NaN) : A(1);
  }
  function D(g) {
    return g.re === 0 && g.im === 0 ? new p(-0.5) : g.re === 1 ? new p(NaN, NaN) : g.re === 1 / 0 && g.im === 0 ? new p(1) : g.im === 1 / 0 || g.re === -1 / 0 ? new p(NaN, NaN) : h(g, (A) => A, (A) => Math.round(1.3 * 15 + 0.9 * Math.abs(A.im)), (A) => A.re);
  }
  function h(g, A, E, N) {
    var S = E(g);
    if (N(g) > -(S - 1) / 2)
      return y(g, A(S), A);
    var C = n(a(2, g), a(A(b), m(g, 1)));
    return C = n(C, f(n(i(A(b), 2), g))), C = n(C, u(m(1, g))), n(C, h(m(1, g), A, E, N));
  }
  function w(g, A) {
    for (var E = g, N = g; l(N, A); N = v(N, 1)) {
      var S = i(n(o(v(A, m(N, 1))), a(4, N)), n(o(m(A, N)), o(n(2, N))));
      E = v(E, S);
    }
    return n(A, E);
  }
  function y(g, A, E) {
    for (var N = i(1, n(w(E(0), A), m(1, a(2, m(1, g))))), S = E(0), C = E(1); l(C, A); C = v(C, 1))
      S = v(S, i(n((-1) ** (C - 1), w(C, A)), a(C, g)));
    return n(N, S);
  }
}), bs = "mode", H1 = ["typed", "isNaN", "isNumeric"], G1 = /* @__PURE__ */ q(bs, H1, (e) => {
  var {
    typed: r,
    isNaN: t,
    isNumeric: n
  } = e;
  return r(bs, {
    "Array | Matrix": a,
    "...": function(o) {
      return a(o);
    }
  });
  function a(i) {
    i = Ge(i.valueOf());
    var o = i.length;
    if (o === 0)
      throw new Error("Cannot calculate mode of an empty array");
    for (var c = {}, l = [], s = 0, u = 0; u < i.length; u++) {
      var f = i[u];
      if (n(f) && t(f))
        throw new Error("Cannot calculate mode of an array containing NaN values");
      f in c || (c[f] = 0), c[f]++, c[f] === s ? l.push(f) : c[f] > s && (s = c[f], l = [f]);
    }
    return l;
  }
});
function gr(e, r, t) {
  var n;
  return String(e).includes("Unexpected type") ? (n = arguments.length > 2 ? " (type: " + Je(t) + ", value: " + JSON.stringify(t) + ")" : " (type: " + e.data.actual + ")", new TypeError("Cannot calculate " + r + ", unexpected type of argument" + n)) : String(e).includes("complex numbers") ? (n = arguments.length > 2 ? " (type: " + Je(t) + ", value: " + JSON.stringify(t) + ")" : "", new TypeError("Cannot calculate " + r + ", no ordering relation is defined for complex numbers" + n)) : e;
}
var xs = "prod", Z1 = ["typed", "config", "multiplyScalar", "numeric"], V1 = /* @__PURE__ */ q(xs, Z1, (e) => {
  var {
    typed: r,
    config: t,
    multiplyScalar: n,
    numeric: a
  } = e;
  return r(xs, {
    // prod([a, b, c, d, ...])
    "Array | Matrix": i,
    // prod([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function(c, l) {
      throw new Error("prod(A, dim) is not yet supported");
    },
    // prod(a, b, c, d, ...)
    "...": function(c) {
      return i(c);
    }
  });
  function i(o) {
    var c;
    if (Jr(o, function(l) {
      try {
        c = c === void 0 ? l : n(c, l);
      } catch (s) {
        throw gr(s, "prod", l);
      }
    }), typeof c == "string" && (c = a(c, st(c, t))), c === void 0)
      throw new Error("Cannot calculate prod of an empty array");
    return c;
  }
}), ws = "format", W1 = ["typed"], Y1 = /* @__PURE__ */ q(ws, W1, (e) => {
  var {
    typed: r
  } = e;
  return r(ws, {
    any: Pe,
    "any, Object | function | number | BigNumber": Pe
  });
}), Ds = "bin", X1 = ["typed", "format"], J1 = q(Ds, X1, (e) => {
  var {
    typed: r,
    format: t
  } = e;
  return r(Ds, {
    "number | BigNumber": function(a) {
      return t(a, {
        notation: "bin"
      });
    },
    "number | BigNumber, number | BigNumber": function(a, i) {
      return t(a, {
        notation: "bin",
        wordSize: i
      });
    }
  });
}), Ns = "oct", Q1 = ["typed", "format"], K1 = q(Ns, Q1, (e) => {
  var {
    typed: r,
    format: t
  } = e;
  return r(Ns, {
    "number | BigNumber": function(a) {
      return t(a, {
        notation: "oct"
      });
    },
    "number | BigNumber, number | BigNumber": function(a, i) {
      return t(a, {
        notation: "oct",
        wordSize: i
      });
    }
  });
}), As = "hex", j1 = ["typed", "format"], ey = q(As, j1, (e) => {
  var {
    typed: r,
    format: t
  } = e;
  return r(As, {
    "number | BigNumber": function(a) {
      return t(a, {
        notation: "hex"
      });
    },
    "number | BigNumber, number | BigNumber": function(a, i) {
      return t(a, {
        notation: "hex",
        wordSize: i
      });
    }
  });
}), om = /\$([\w.]+)/g, Es = "print", ry = ["typed"], sm = /* @__PURE__ */ q(Es, ry, (e) => {
  var {
    typed: r
  } = e;
  return r(Es, {
    // note: Matrix will be converted automatically to an Array
    "string, Object | Array": Ss,
    "string, Object | Array, number | Object": Ss
  });
});
function Ss(e, r, t) {
  return e.replace(om, function(n, a) {
    var i = a.split("."), o = r[i.shift()];
    for (o !== void 0 && o.isMatrix && (o = o.toArray()); i.length && o !== void 0; ) {
      var c = i.shift();
      o = c ? o[c] : o + ".";
    }
    return o !== void 0 ? sr(o) ? o : Pe(o, t) : n;
  });
}
var Cs = "to", ty = ["typed", "matrix", "concat"], ny = /* @__PURE__ */ q(Cs, ty, (e) => {
  var {
    typed: r,
    matrix: t,
    concat: n
  } = e, a = Qe({
    typed: r,
    matrix: t,
    concat: n
  });
  return r(Cs, {
    "Unit, Unit | string": (i, o) => i.to(o)
  }, a({
    Ds: !0
  }));
}), Ms = "isPrime", ay = ["typed"], iy = /* @__PURE__ */ q(Ms, ay, (e) => {
  var {
    typed: r
  } = e;
  return r(Ms, {
    number: function(n) {
      if (n <= 3)
        return n > 1;
      if (n % 2 === 0 || n % 3 === 0)
        return !1;
      for (var a = 5; a * a <= n; a += 6)
        if (n % a === 0 || n % (a + 2) === 0)
          return !1;
      return !0;
    },
    bigint: function(n) {
      if (n <= 3n)
        return n > 1n;
      if (n % 2n === 0n || n % 3n === 0n)
        return !1;
      for (var a = 5n; a * a <= n; a += 6n)
        if (n % a === 0n || n % (a + 2n) === 0n)
          return !1;
      return !0;
    },
    BigNumber: function(n) {
      if (n.lte(3)) return n.gt(1);
      if (n.mod(2).eq(0) || n.mod(3).eq(0)) return !1;
      if (n.lt(Math.pow(2, 32))) {
        for (var a = n.toNumber(), i = 5; i * i <= a; i += 6)
          if (a % i === 0 || a % (i + 2) === 0)
            return !1;
        return !0;
      }
      function o(D, h, w) {
        for (var y = 1; !h.eq(0); )
          h.mod(2).eq(0) ? (h = h.div(2), D = D.mul(D).mod(w)) : (h = h.sub(1), y = D.mul(y).mod(w));
        return y;
      }
      var c = n.constructor.clone({
        precision: n.toFixed(0).length * 2
      });
      n = new c(n);
      for (var l = 0, s = n.sub(1); s.mod(2).eq(0); )
        s = s.div(2), l += 1;
      var u = null;
      if (n.lt("3317044064679887385961981"))
        u = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41].filter((D) => D < n);
      else {
        var f = Math.min(n.toNumber() - 2, Math.floor(2 * Math.pow(n.toFixed(0).length * Math.log(10), 2)));
        u = [];
        for (var m = 2; m <= f; m += 1)
          u.push(f);
      }
      for (var v = 0; v < u.length; v += 1) {
        var p = u[v], d = o(n.sub(n).add(p), s, n);
        if (!d.eq(1)) {
          for (var b = 0, x = d; !x.eq(n.sub(1)); b += 1, x = x.mul(x).mod(n))
            if (b === l - 1)
              return !1;
        }
      }
      return !0;
    },
    "Array | Matrix": r.referToSelf((t) => (n) => ze(n, t))
  });
}), oy = "numeric", sy = ["number", "?bignumber", "?fraction"], uy = /* @__PURE__ */ q(oy, sy, (e) => {
  var {
    number: r,
    bignumber: t,
    fraction: n
  } = e, a = {
    string: !0,
    number: !0,
    BigNumber: !0,
    Fraction: !0
  }, i = {
    number: (o) => r(o),
    BigNumber: t ? (o) => t(o) : ui,
    bigint: (o) => BigInt(o),
    Fraction: n ? (o) => n(o) : rm
  };
  return function(c) {
    var l = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number", s = arguments.length > 2 ? arguments[2] : void 0;
    if (s !== void 0)
      throw new SyntaxError("numeric() takes one or two arguments");
    var u = Je(c);
    if (!(u in a))
      throw new TypeError("Cannot convert " + c + ' of type "' + u + '"; valid input types are ' + Object.keys(a).join(", "));
    if (!(l in i))
      throw new TypeError("Cannot convert " + c + ' to type "' + l + '"; valid output types are ' + Object.keys(i).join(", "));
    return l === u ? c : i[l](c);
  };
}), _s = "divideScalar", ly = ["typed", "numeric"], cy = /* @__PURE__ */ q(_s, ly, (e) => {
  var {
    typed: r,
    numeric: t
  } = e;
  return r(_s, {
    "number, number": function(a, i) {
      return a / i;
    },
    "Complex, Complex": function(a, i) {
      return a.div(i);
    },
    "BigNumber, BigNumber": function(a, i) {
      return a.div(i);
    },
    "bigint, bigint": function(a, i) {
      return a / i;
    },
    "Fraction, Fraction": function(a, i) {
      return a.div(i);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (n, a) => n.divide(a),
    "number | Fraction | Complex | BigNumber, Unit": (n, a) => a.divideInto(n)
  });
}), Fs = "pow", fy = ["typed", "config", "identity", "multiply", "matrix", "inv", "fraction", "number", "Complex"], my = /* @__PURE__ */ q(Fs, fy, (e) => {
  var {
    typed: r,
    config: t,
    identity: n,
    multiply: a,
    matrix: i,
    inv: o,
    number: c,
    fraction: l,
    Complex: s
  } = e;
  return r(Fs, {
    "number, number": u,
    "Complex, Complex": function(p, d) {
      return p.pow(d);
    },
    "BigNumber, BigNumber": function(p, d) {
      return d.isInteger() || p >= 0 || t.predictable ? p.pow(d) : new s(p.toNumber(), 0).pow(d.toNumber(), 0);
    },
    "bigint, bigint": (v, p) => v ** p,
    "Fraction, Fraction": function(p, d) {
      var b = p.pow(d);
      if (b != null)
        return b;
      if (t.predictable)
        throw new Error("Result of pow is non-rational and cannot be expressed as a fraction");
      return u(p.valueOf(), d.valueOf());
    },
    "Array, number": f,
    "Array, BigNumber": function(p, d) {
      return f(p, d.toNumber());
    },
    "Matrix, number": m,
    "Matrix, BigNumber": function(p, d) {
      return m(p, d.toNumber());
    },
    "Unit, number | BigNumber": function(p, d) {
      return p.pow(d);
    }
  });
  function u(v, p) {
    if (t.predictable && !Ae(p) && v < 0)
      try {
        var d = l(p), b = c(d);
        if ((p === b || Math.abs((p - b) / p) < 1e-14) && d.d % 2 === 1)
          return (d.n % 2 === 0 ? 1 : -1) * Math.pow(-v, p);
      } catch {
      }
    return t.predictable && (v < -1 && p === 1 / 0 || v > -1 && v < 0 && p === -1 / 0) ? NaN : Ae(p) || v >= 0 || t.predictable ? mf(v, p) : v * v < 1 && p === 1 / 0 || v * v > 1 && p === -1 / 0 ? 0 : new s(v, 0).pow(p, 0);
  }
  function f(v, p) {
    if (!Ae(p))
      throw new TypeError("For A^b, b must be an integer (value is " + p + ")");
    var d = Te(v);
    if (d.length !== 2)
      throw new Error("For A^b, A must be 2 dimensional (A has " + d.length + " dimensions)");
    if (d[0] !== d[1])
      throw new Error("For A^b, A must be square (size is " + d[0] + "x" + d[1] + ")");
    if (p < 0)
      try {
        return f(o(v), -p);
      } catch (D) {
        throw D.message === "Cannot calculate inverse, determinant is zero" ? new TypeError("For A^b, when A is not invertible, b must be a positive integer (value is " + p + ")") : D;
      }
    for (var b = n(d[0]).valueOf(), x = v; p >= 1; )
      (p & 1) === 1 && (b = a(x, b)), p >>= 1, x = a(x, x);
    return b;
  }
  function m(v, p) {
    return i(f(v.valueOf(), p));
  }
}), At = "Number of decimals in function round must be an integer", Ts = "round", vy = ["typed", "config", "matrix", "equalScalar", "zeros", "BigNumber", "DenseMatrix"], py = /* @__PURE__ */ q(Ts, vy, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    equalScalar: a,
    zeros: i,
    BigNumber: o,
    DenseMatrix: c
  } = e, l = cr({
    typed: r,
    equalScalar: a
  }), s = ir({
    typed: r,
    DenseMatrix: c
  }), u = zr({
    typed: r
  });
  function f(m) {
    return Math.abs(un(m).exponent);
  }
  return r(Ts, {
    number: function(v) {
      var p = Yt(v, f(t.relTol)), d = lr(v, p, t.relTol, t.absTol) ? p : v;
      return Yt(d);
    },
    "number, number": function(v, p) {
      var d = f(t.relTol);
      if (p >= d)
        return Yt(v, p);
      var b = Yt(v, d), x = lr(v, b, t.relTol, t.absTol) ? b : v;
      return Yt(x, p);
    },
    "number, BigNumber": function(v, p) {
      if (!p.isInteger())
        throw new TypeError(At);
      return new o(v).toDecimalPlaces(p.toNumber());
    },
    Complex: function(v) {
      return v.round();
    },
    "Complex, number": function(v, p) {
      if (p % 1)
        throw new TypeError(At);
      return v.round(p);
    },
    "Complex, BigNumber": function(v, p) {
      if (!p.isInteger())
        throw new TypeError(At);
      var d = p.toNumber();
      return v.round(d);
    },
    BigNumber: function(v) {
      var p = new o(v).toDecimalPlaces(f(t.relTol)), d = Nr(v, p, t.relTol, t.absTol) ? p : v;
      return d.toDecimalPlaces(0);
    },
    "BigNumber, BigNumber": function(v, p) {
      if (!p.isInteger())
        throw new TypeError(At);
      var d = f(t.relTol);
      if (p >= d)
        return v.toDecimalPlaces(p.toNumber());
      var b = v.toDecimalPlaces(d), x = Nr(v, b, t.relTol, t.absTol) ? b : v;
      return x.toDecimalPlaces(p.toNumber());
    },
    Fraction: function(v) {
      return v.round();
    },
    "Fraction, number": function(v, p) {
      if (p % 1)
        throw new TypeError(At);
      return v.round(p);
    },
    "Fraction, BigNumber": function(v, p) {
      if (!p.isInteger())
        throw new TypeError(At);
      return v.round(p.toNumber());
    },
    "Unit, number, Unit": r.referToSelf((m) => function(v, p, d) {
      var b = v.toNumeric(d);
      return d.multiply(m(b, p));
    }),
    "Unit, BigNumber, Unit": r.referToSelf((m) => (v, p, d) => m(v, p.toNumber(), d)),
    "Unit, Unit": r.referToSelf((m) => (v, p) => m(v, 0, p)),
    "Array | Matrix, number, Unit": r.referToSelf((m) => (v, p, d) => ze(v, (b) => m(b, p, d))),
    "Array | Matrix, BigNumber, Unit": r.referToSelf((m) => (v, p, d) => m(v, p.toNumber(), d)),
    "Array | Matrix, Unit": r.referToSelf((m) => (v, p) => m(v, 0, p)),
    "Array | Matrix": r.referToSelf((m) => (v) => ze(v, m)),
    "SparseMatrix, number | BigNumber": r.referToSelf((m) => (v, p) => l(v, p, m, !1)),
    "DenseMatrix, number | BigNumber": r.referToSelf((m) => (v, p) => u(v, p, m, !1)),
    "Array, number | BigNumber": r.referToSelf((m) => (v, p) => u(n(v), p, m, !1).valueOf()),
    "number | Complex | BigNumber | Fraction, SparseMatrix": r.referToSelf((m) => (v, p) => a(v, 0) ? i(p.size(), p.storage()) : s(p, v, m, !0)),
    "number | Complex | BigNumber | Fraction, DenseMatrix": r.referToSelf((m) => (v, p) => a(v, 0) ? i(p.size(), p.storage()) : u(p, v, m, !0)),
    "number | Complex | BigNumber | Fraction, Array": r.referToSelf((m) => (v, p) => u(n(p), v, m, !0).valueOf())
  });
}), Bs = "log", dy = ["config", "typed", "divideScalar", "Complex"], hy = /* @__PURE__ */ q(Bs, dy, (e) => {
  var {
    typed: r,
    config: t,
    divideScalar: n,
    Complex: a
  } = e;
  return r(Bs, {
    number: function(o) {
      return o >= 0 || t.predictable ? gd(o) : new a(o, 0).log();
    },
    Complex: function(o) {
      return o.log();
    },
    BigNumber: function(o) {
      return !o.isNegative() || t.predictable ? o.ln() : new a(o.toNumber(), 0).log();
    },
    "any, any": r.referToSelf((i) => (o, c) => n(i(o), i(c)))
  });
}), Os = "log1p", gy = ["typed", "config", "divideScalar", "log", "Complex"], yy = /* @__PURE__ */ q(Os, gy, (e) => {
  var {
    typed: r,
    config: t,
    divideScalar: n,
    log: a,
    Complex: i
  } = e;
  return r(Os, {
    number: function(l) {
      return l >= -1 || t.predictable ? gv(l) : o(new i(l, 0));
    },
    Complex: o,
    BigNumber: function(l) {
      var s = l.plus(1);
      return !s.isNegative() || t.predictable ? s.ln() : o(new i(l.toNumber(), 0));
    },
    "Array | Matrix": r.referToSelf((c) => (l) => ze(l, c)),
    "any, any": r.referToSelf((c) => (l, s) => n(c(l), a(s)))
  });
  function o(c) {
    var l = c.re + 1;
    return new i(Math.log(Math.sqrt(l * l + c.im * c.im)), Math.atan2(c.im, l));
  }
}), $s = "nthRoots", by = ["config", "typed", "divideScalar", "Complex"], xy = /* @__PURE__ */ q($s, by, (e) => {
  var {
    typed: r,
    config: t,
    divideScalar: n,
    Complex: a
  } = e, i = [function(l) {
    return new a(l, 0);
  }, function(l) {
    return new a(0, l);
  }, function(l) {
    return new a(-l, 0);
  }, function(l) {
    return new a(0, -l);
  }];
  function o(c, l) {
    if (l < 0) throw new Error("Root must be greater than zero");
    if (l === 0) throw new Error("Root must be non-zero");
    if (l % 1 !== 0) throw new Error("Root must be an integer");
    if (c === 0 || c.abs() === 0) return [new a(0, 0)];
    var s = typeof c == "number", u;
    (s || c.re === 0 || c.im === 0) && (s ? u = 2 * +(c < 0) : c.im === 0 ? u = 2 * +(c.re < 0) : u = 2 * +(c.im < 0) + 1);
    for (var f = c.arg(), m = c.abs(), v = [], p = Math.pow(m, 1 / l), d = 0; d < l; d++) {
      var b = (u + 4 * d) / l;
      if (b === Math.round(b)) {
        v.push(i[b % 4](p));
        continue;
      }
      v.push(new a({
        r: p,
        phi: (f + 2 * Math.PI * d) / l
      }));
    }
    return v;
  }
  return r($s, {
    Complex: function(l) {
      return o(l, 2);
    },
    "Complex, number": o
  });
}), Is = "dotPow", wy = ["typed", "equalScalar", "matrix", "pow", "DenseMatrix", "concat"], Dy = /* @__PURE__ */ q(Is, wy, (e) => {
  var {
    typed: r,
    equalScalar: t,
    matrix: n,
    pow: a,
    DenseMatrix: i,
    concat: o
  } = e, c = yr({
    typed: r
  }), l = kr({
    typed: r,
    DenseMatrix: i
  }), s = cr({
    typed: r,
    equalScalar: t
  }), u = ir({
    typed: r,
    DenseMatrix: i
  }), f = Qe({
    typed: r,
    matrix: n,
    concat: o
  }), m = {};
  for (var v in a.signatures)
    Object.prototype.hasOwnProperty.call(a.signatures, v) && !v.includes("Matrix") && !v.includes("Array") && (m[v] = a.signatures[v]);
  var p = r(m);
  return r(Is, f({
    elop: p,
    SS: l,
    DS: c,
    Ss: s,
    sS: u
  }));
}), qs = "dotDivide", Ny = ["typed", "matrix", "equalScalar", "divideScalar", "DenseMatrix", "concat"], Ay = /* @__PURE__ */ q(qs, Ny, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    divideScalar: a,
    DenseMatrix: i,
    concat: o
  } = e, c = Pr({
    typed: r,
    equalScalar: n
  }), l = yr({
    typed: r
  }), s = kr({
    typed: r,
    DenseMatrix: i
  }), u = cr({
    typed: r,
    equalScalar: n
  }), f = ir({
    typed: r,
    DenseMatrix: i
  }), m = Qe({
    typed: r,
    matrix: t,
    concat: o
  });
  return r(qs, m({
    elop: a,
    SS: s,
    DS: l,
    SD: c,
    Ss: u,
    sS: f
  }));
});
function ln(e) {
  var {
    DenseMatrix: r
  } = e;
  return function(n, a, i) {
    var o = n.size();
    if (o.length !== 2)
      throw new RangeError("Matrix must be two dimensional (size: " + Pe(o) + ")");
    var c = o[0], l = o[1];
    if (c !== l)
      throw new RangeError("Matrix must be square (size: " + Pe(o) + ")");
    var s = [];
    if (Ce(a)) {
      var u = a.size(), f = a._data;
      if (u.length === 1) {
        if (u[0] !== c)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var m = 0; m < c; m++)
          s[m] = [f[m]];
        return new r({
          data: s,
          size: [c, 1],
          datatype: a._datatype
        });
      }
      if (u.length === 2) {
        if (u[0] !== c || u[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        if (en(a)) {
          if (i) {
            s = [];
            for (var v = 0; v < c; v++)
              s[v] = [f[v][0]];
            return new r({
              data: s,
              size: [c, 1],
              datatype: a._datatype
            });
          }
          return a;
        }
        if (et(a)) {
          for (var p = 0; p < c; p++)
            s[p] = [0];
          for (var d = a._values, b = a._index, x = a._ptr, D = x[1], h = x[0]; h < D; h++) {
            var w = b[h];
            s[w][0] = d[h];
          }
          return new r({
            data: s,
            size: [c, 1],
            datatype: a._datatype
          });
        }
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
    if (Ze(a)) {
      var y = Te(a);
      if (y.length === 1) {
        if (y[0] !== c)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var g = 0; g < c; g++)
          s[g] = [a[g]];
        return new r({
          data: s,
          size: [c, 1]
        });
      }
      if (y.length === 2) {
        if (y[0] !== c || y[1] !== 1)
          throw new RangeError("Dimension mismatch. Matrix columns must match vector length.");
        for (var A = 0; A < c; A++)
          s[A] = [a[A][0]];
        return new r({
          data: s,
          size: [c, 1]
        });
      }
      throw new RangeError("Dimension mismatch. The right side has to be either 1- or 2-dimensional vector.");
    }
  };
}
var Rs = "lsolve", Ey = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Sy = /* @__PURE__ */ q(Rs, Ey, (e) => {
  var {
    typed: r,
    matrix: t,
    divideScalar: n,
    multiplyScalar: a,
    subtractScalar: i,
    equalScalar: o,
    DenseMatrix: c
  } = e, l = ln({
    DenseMatrix: c
  });
  return r(Rs, {
    "SparseMatrix, Array | Matrix": function(m, v) {
      return u(m, v);
    },
    "DenseMatrix, Array | Matrix": function(m, v) {
      return s(m, v);
    },
    "Array, Array | Matrix": function(m, v) {
      var p = t(m), d = s(p, v);
      return d.valueOf();
    }
  });
  function s(f, m) {
    m = l(f, m, !0);
    for (var v = m._data, p = f._size[0], d = f._size[1], b = [], x = f._data, D = 0; D < d; D++) {
      var h = v[D][0] || 0, w = void 0;
      if (o(h, 0))
        w = 0;
      else {
        var y = x[D][D];
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        w = n(h, y);
        for (var g = D + 1; g < p; g++)
          v[g] = [i(v[g][0] || 0, a(w, x[g][D]))];
      }
      b[D] = [w];
    }
    return new c({
      data: b,
      size: [p, 1]
    });
  }
  function u(f, m) {
    m = l(f, m, !0);
    for (var v = m._data, p = f._size[0], d = f._size[1], b = f._values, x = f._index, D = f._ptr, h = [], w = 0; w < d; w++) {
      var y = v[w][0] || 0;
      if (o(y, 0))
        h[w] = [0];
      else {
        for (var g = 0, A = [], E = [], N = D[w], S = D[w + 1], C = N; C < S; C++) {
          var T = x[C];
          T === w ? g = b[C] : T > w && (A.push(b[C]), E.push(T));
        }
        if (o(g, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = n(y, g), I = 0, $ = E.length; I < $; I++) {
          var F = E[I];
          v[F] = [i(v[F][0] || 0, a(O, A[I]))];
        }
        h[w] = [O];
      }
    }
    return new c({
      data: h,
      size: [p, 1]
    });
  }
}), zs = "usolve", Cy = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], My = /* @__PURE__ */ q(zs, Cy, (e) => {
  var {
    typed: r,
    matrix: t,
    divideScalar: n,
    multiplyScalar: a,
    subtractScalar: i,
    equalScalar: o,
    DenseMatrix: c
  } = e, l = ln({
    DenseMatrix: c
  });
  return r(zs, {
    "SparseMatrix, Array | Matrix": function(m, v) {
      return u(m, v);
    },
    "DenseMatrix, Array | Matrix": function(m, v) {
      return s(m, v);
    },
    "Array, Array | Matrix": function(m, v) {
      var p = t(m), d = s(p, v);
      return d.valueOf();
    }
  });
  function s(f, m) {
    m = l(f, m, !0);
    for (var v = m._data, p = f._size[0], d = f._size[1], b = [], x = f._data, D = d - 1; D >= 0; D--) {
      var h = v[D][0] || 0, w = void 0;
      if (o(h, 0))
        w = 0;
      else {
        var y = x[D][D];
        if (o(y, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        w = n(h, y);
        for (var g = D - 1; g >= 0; g--)
          v[g] = [i(v[g][0] || 0, a(w, x[g][D]))];
      }
      b[D] = [w];
    }
    return new c({
      data: b,
      size: [p, 1]
    });
  }
  function u(f, m) {
    m = l(f, m, !0);
    for (var v = m._data, p = f._size[0], d = f._size[1], b = f._values, x = f._index, D = f._ptr, h = [], w = d - 1; w >= 0; w--) {
      var y = v[w][0] || 0;
      if (o(y, 0))
        h[w] = [0];
      else {
        for (var g = 0, A = [], E = [], N = D[w], S = D[w + 1], C = S - 1; C >= N; C--) {
          var T = x[C];
          T === w ? g = b[C] : T < w && (A.push(b[C]), E.push(T));
        }
        if (o(g, 0))
          throw new Error("Linear system cannot be solved since matrix is singular");
        for (var O = n(y, g), I = 0, $ = E.length; I < $; I++) {
          var F = E[I];
          v[F] = [i(v[F][0], a(O, A[I]))];
        }
        h[w] = [O];
      }
    }
    return new c({
      data: h,
      size: [p, 1]
    });
  }
}), Ps = "lsolveAll", _y = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], Fy = /* @__PURE__ */ q(Ps, _y, (e) => {
  var {
    typed: r,
    matrix: t,
    divideScalar: n,
    multiplyScalar: a,
    subtractScalar: i,
    equalScalar: o,
    DenseMatrix: c
  } = e, l = ln({
    DenseMatrix: c
  });
  return r(Ps, {
    "SparseMatrix, Array | Matrix": function(m, v) {
      return u(m, v);
    },
    "DenseMatrix, Array | Matrix": function(m, v) {
      return s(m, v);
    },
    "Array, Array | Matrix": function(m, v) {
      var p = t(m), d = s(p, v);
      return d.map((b) => b.valueOf());
    }
  });
  function s(f, m) {
    for (var v = [l(f, m, !0)._data.map((E) => E[0])], p = f._data, d = f._size[0], b = f._size[1], x = 0; x < b; x++)
      for (var D = v.length, h = 0; h < D; h++) {
        var w = v[h];
        if (o(p[x][x], 0))
          if (o(w[x], 0)) {
            if (h === 0) {
              var g = [...w];
              g[x] = 1;
              for (var A = x + 1; A < b; A++)
                g[A] = i(g[A], p[A][x]);
              v.push(g);
            }
          } else {
            if (h === 0)
              return [];
            v.splice(h, 1), h -= 1, D -= 1;
          }
        else {
          w[x] = n(w[x], p[x][x]);
          for (var y = x + 1; y < b; y++)
            w[y] = i(w[y], a(w[x], p[y][x]));
        }
      }
    return v.map((E) => new c({
      data: E.map((N) => [N]),
      size: [d, 1]
    }));
  }
  function u(f, m) {
    for (var v = [l(f, m, !0)._data.map((Q) => Q[0])], p = f._size[0], d = f._size[1], b = f._values, x = f._index, D = f._ptr, h = 0; h < d; h++)
      for (var w = v.length, y = 0; y < w; y++) {
        for (var g = v[y], A = [], E = [], N = D[h], S = D[h + 1], C = 0, T = N; T < S; T++) {
          var O = x[T];
          O === h ? C = b[T] : O > h && (A.push(b[T]), E.push(O));
        }
        if (o(C, 0))
          if (o(g[h], 0)) {
            if (y === 0) {
              var _ = [...g];
              _[h] = 1;
              for (var L = 0, B = E.length; L < B; L++) {
                var W = E[L];
                _[W] = i(_[W], A[L]);
              }
              v.push(_);
            }
          } else {
            if (y === 0)
              return [];
            v.splice(y, 1), y -= 1, w -= 1;
          }
        else {
          g[h] = n(g[h], C);
          for (var I = 0, $ = E.length; I < $; I++) {
            var F = E[I];
            g[F] = i(g[F], a(g[h], A[I]));
          }
        }
      }
    return v.map((Q) => new c({
      data: Q.map((Z) => [Z]),
      size: [p, 1]
    }));
  }
}), Us = "usolveAll", Ty = ["typed", "matrix", "divideScalar", "multiplyScalar", "subtractScalar", "equalScalar", "DenseMatrix"], By = /* @__PURE__ */ q(Us, Ty, (e) => {
  var {
    typed: r,
    matrix: t,
    divideScalar: n,
    multiplyScalar: a,
    subtractScalar: i,
    equalScalar: o,
    DenseMatrix: c
  } = e, l = ln({
    DenseMatrix: c
  });
  return r(Us, {
    "SparseMatrix, Array | Matrix": function(m, v) {
      return u(m, v);
    },
    "DenseMatrix, Array | Matrix": function(m, v) {
      return s(m, v);
    },
    "Array, Array | Matrix": function(m, v) {
      var p = t(m), d = s(p, v);
      return d.map((b) => b.valueOf());
    }
  });
  function s(f, m) {
    for (var v = [l(f, m, !0)._data.map((E) => E[0])], p = f._data, d = f._size[0], b = f._size[1], x = b - 1; x >= 0; x--)
      for (var D = v.length, h = 0; h < D; h++) {
        var w = v[h];
        if (o(p[x][x], 0))
          if (o(w[x], 0)) {
            if (h === 0) {
              var g = [...w];
              g[x] = 1;
              for (var A = x - 1; A >= 0; A--)
                g[A] = i(g[A], p[A][x]);
              v.push(g);
            }
          } else {
            if (h === 0)
              return [];
            v.splice(h, 1), h -= 1, D -= 1;
          }
        else {
          w[x] = n(w[x], p[x][x]);
          for (var y = x - 1; y >= 0; y--)
            w[y] = i(w[y], a(w[x], p[y][x]));
        }
      }
    return v.map((E) => new c({
      data: E.map((N) => [N]),
      size: [d, 1]
    }));
  }
  function u(f, m) {
    for (var v = [l(f, m, !0)._data.map((Q) => Q[0])], p = f._size[0], d = f._size[1], b = f._values, x = f._index, D = f._ptr, h = d - 1; h >= 0; h--)
      for (var w = v.length, y = 0; y < w; y++) {
        for (var g = v[y], A = [], E = [], N = D[h], S = D[h + 1], C = 0, T = S - 1; T >= N; T--) {
          var O = x[T];
          O === h ? C = b[T] : O < h && (A.push(b[T]), E.push(O));
        }
        if (o(C, 0))
          if (o(g[h], 0)) {
            if (y === 0) {
              var _ = [...g];
              _[h] = 1;
              for (var L = 0, B = E.length; L < B; L++) {
                var W = E[L];
                _[W] = i(_[W], A[L]);
              }
              v.push(_);
            }
          } else {
            if (y === 0)
              return [];
            v.splice(y, 1), y -= 1, w -= 1;
          }
        else {
          g[h] = n(g[h], C);
          for (var I = 0, $ = E.length; I < $; I++) {
            var F = E[I];
            g[F] = i(g[F], a(g[h], A[I]));
          }
        }
      }
    return v.map((Q) => new c({
      data: Q.map((Z) => [Z]),
      size: [p, 1]
    }));
  }
}), Oy = "matAlgo08xS0Sid", $y = ["typed", "equalScalar"], li = /* @__PURE__ */ q(Oy, $y, (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return function(a, i, o) {
    var c = a._values, l = a._index, s = a._ptr, u = a._size, f = a._datatype || a._data === void 0 ? a._datatype : a.getDataType(), m = i._values, v = i._index, p = i._ptr, d = i._size, b = i._datatype || i._data === void 0 ? i._datatype : i.getDataType();
    if (u.length !== d.length)
      throw new Re(u.length, d.length);
    if (u[0] !== d[0] || u[1] !== d[1])
      throw new RangeError("Dimension mismatch. Matrix A (" + u + ") must match Matrix B (" + d + ")");
    if (!c || !m)
      throw new Error("Cannot perform operation on Pattern Sparse Matrices");
    var x = u[0], D = u[1], h, w = t, y = 0, g = o;
    typeof f == "string" && f === b && f !== "mixed" && (h = f, w = r.find(t, [h, h]), y = r.convert(0, h), g = r.find(o, [h, h]));
    for (var A = [], E = [], N = [], S = [], C = [], T, O, I, $, F = 0; F < D; F++) {
      N[F] = E.length;
      var _ = F + 1;
      for (O = s[F], I = s[F + 1], T = O; T < I; T++)
        $ = l[T], C[$] = _, S[$] = c[T], E.push($);
      for (O = p[F], I = p[F + 1], T = O; T < I; T++)
        $ = v[T], C[$] === _ && (S[$] = g(S[$], m[T]));
      for (T = N[F]; T < E.length; ) {
        $ = E[T];
        var L = S[$];
        w(L, y) ? E.splice(T, 1) : (A.push(L), T++);
      }
    }
    return N[D] = E.length, a.createSparseMatrix({
      values: A,
      index: E,
      ptr: N,
      size: [x, D],
      datatype: f === a._datatype && b === i._datatype ? h : void 0
    });
  };
}), ci = /* @__PURE__ */ q("useMatrixForArrayScalar", ["typed", "matrix"], (e) => {
  var {
    typed: r,
    matrix: t
  } = e;
  return {
    "Array, number": r.referTo("DenseMatrix, number", (n) => (a, i) => n(t(a), i).valueOf()),
    "Array, BigNumber": r.referTo("DenseMatrix, BigNumber", (n) => (a, i) => n(t(a), i).valueOf()),
    "number, Array": r.referTo("number, DenseMatrix", (n) => (a, i) => n(a, t(i)).valueOf()),
    "BigNumber, Array": r.referTo("BigNumber, DenseMatrix", (n) => (a, i) => n(a, t(i)).valueOf())
  };
}), Ls = "leftShift", Iy = ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"], qy = /* @__PURE__ */ q(Ls, Iy, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    DenseMatrix: i,
    concat: o
  } = e, c = lt({
    typed: r
  }), l = Pr({
    typed: r,
    equalScalar: n
  }), s = li({
    typed: r,
    equalScalar: n
  }), u = yt({
    typed: r,
    DenseMatrix: i
  }), f = cr({
    typed: r,
    equalScalar: n
  }), m = zr({
    typed: r
  }), v = Qe({
    typed: r,
    matrix: t,
    concat: o
  }), p = ci({
    typed: r,
    matrix: t
  });
  return r(Ls, {
    "number, number": gf,
    "BigNumber, BigNumber": og,
    "bigint, bigint": (d, b) => d << b,
    "SparseMatrix, number | BigNumber": r.referToSelf((d) => (b, x) => n(x, 0) ? b.clone() : f(b, x, d, !1)),
    "DenseMatrix, number | BigNumber": r.referToSelf((d) => (b, x) => n(x, 0) ? b.clone() : m(b, x, d, !1)),
    "number | BigNumber, SparseMatrix": r.referToSelf((d) => (b, x) => n(b, 0) ? a(x.size(), x.storage()) : u(x, b, d, !0)),
    "number | BigNumber, DenseMatrix": r.referToSelf((d) => (b, x) => n(b, 0) ? a(x.size(), x.storage()) : m(x, b, d, !0))
  }, p, v({
    SS: s,
    DS: c,
    SD: l
  }));
}), ks = "rightArithShift", Ry = ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"], zy = /* @__PURE__ */ q(ks, Ry, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    DenseMatrix: i,
    concat: o
  } = e, c = lt({
    typed: r
  }), l = Pr({
    typed: r,
    equalScalar: n
  }), s = li({
    typed: r,
    equalScalar: n
  }), u = yt({
    typed: r,
    DenseMatrix: i
  }), f = cr({
    typed: r,
    equalScalar: n
  }), m = zr({
    typed: r
  }), v = Qe({
    typed: r,
    matrix: t,
    concat: o
  }), p = ci({
    typed: r,
    matrix: t
  });
  return r(ks, {
    "number, number": yf,
    "BigNumber, BigNumber": sg,
    "bigint, bigint": (d, b) => d >> b,
    "SparseMatrix, number | BigNumber": r.referToSelf((d) => (b, x) => n(x, 0) ? b.clone() : f(b, x, d, !1)),
    "DenseMatrix, number | BigNumber": r.referToSelf((d) => (b, x) => n(x, 0) ? b.clone() : m(b, x, d, !1)),
    "number | BigNumber, SparseMatrix": r.referToSelf((d) => (b, x) => n(b, 0) ? a(x.size(), x.storage()) : u(x, b, d, !0)),
    "number | BigNumber, DenseMatrix": r.referToSelf((d) => (b, x) => n(b, 0) ? a(x.size(), x.storage()) : m(x, b, d, !0))
  }, p, v({
    SS: s,
    DS: c,
    SD: l
  }));
}), Hs = "rightLogShift", Py = ["typed", "matrix", "equalScalar", "zeros", "DenseMatrix", "concat"], Uy = /* @__PURE__ */ q(Hs, Py, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    DenseMatrix: i,
    concat: o
  } = e, c = lt({
    typed: r
  }), l = Pr({
    typed: r,
    equalScalar: n
  }), s = li({
    typed: r,
    equalScalar: n
  }), u = yt({
    typed: r,
    DenseMatrix: i
  }), f = cr({
    typed: r,
    equalScalar: n
  }), m = zr({
    typed: r
  }), v = Qe({
    typed: r,
    matrix: t,
    concat: o
  }), p = ci({
    typed: r,
    matrix: t
  });
  return r(Hs, {
    "number, number": bf,
    // 'BigNumber, BigNumber': ..., // TODO: implement BigNumber support for rightLogShift
    "SparseMatrix, number | BigNumber": r.referToSelf((d) => (b, x) => n(x, 0) ? b.clone() : f(b, x, d, !1)),
    "DenseMatrix, number | BigNumber": r.referToSelf((d) => (b, x) => n(x, 0) ? b.clone() : m(b, x, d, !1)),
    "number | BigNumber, SparseMatrix": r.referToSelf((d) => (b, x) => n(b, 0) ? a(x.size(), x.storage()) : u(x, b, d, !0)),
    "number | BigNumber, DenseMatrix": r.referToSelf((d) => (b, x) => n(b, 0) ? a(x.size(), x.storage()) : m(x, b, d, !0))
  }, p, v({
    SS: s,
    DS: c,
    SD: l
  }));
}), Gs = "and", Ly = ["typed", "matrix", "equalScalar", "zeros", "not", "concat"], um = /* @__PURE__ */ q(Gs, Ly, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    not: i,
    concat: o
  } = e, c = Pr({
    typed: r,
    equalScalar: n
  }), l = ma({
    typed: r,
    equalScalar: n
  }), s = cr({
    typed: r,
    equalScalar: n
  }), u = zr({
    typed: r
  }), f = Qe({
    typed: r,
    matrix: t,
    concat: o
  });
  return r(Gs, {
    "number, number": za,
    "Complex, Complex": function(v, p) {
      return (v.re !== 0 || v.im !== 0) && (p.re !== 0 || p.im !== 0);
    },
    "BigNumber, BigNumber": function(v, p) {
      return !v.isZero() && !p.isZero() && !v.isNaN() && !p.isNaN();
    },
    "bigint, bigint": za,
    "Unit, Unit": r.referToSelf((m) => (v, p) => m(v.value || 0, p.value || 0)),
    "SparseMatrix, any": r.referToSelf((m) => (v, p) => i(p) ? a(v.size(), v.storage()) : s(v, p, m, !1)),
    "DenseMatrix, any": r.referToSelf((m) => (v, p) => i(p) ? a(v.size(), v.storage()) : u(v, p, m, !1)),
    "any, SparseMatrix": r.referToSelf((m) => (v, p) => i(v) ? a(v.size(), v.storage()) : s(p, v, m, !0)),
    "any, DenseMatrix": r.referToSelf((m) => (v, p) => i(v) ? a(v.size(), v.storage()) : u(p, v, m, !0)),
    "Array, any": r.referToSelf((m) => (v, p) => m(t(v), p).valueOf()),
    "any, Array": r.referToSelf((m) => (v, p) => m(v, t(p)).valueOf())
  }, f({
    SS: l,
    DS: c
  }));
}), Xn = "compare", ky = ["typed", "config", "matrix", "equalScalar", "BigNumber", "Fraction", "DenseMatrix", "concat"], Hy = /* @__PURE__ */ q(Xn, ky, (e) => {
  var {
    typed: r,
    config: t,
    equalScalar: n,
    matrix: a,
    BigNumber: i,
    Fraction: o,
    DenseMatrix: c,
    concat: l
  } = e, s = yr({
    typed: r
  }), u = fa({
    typed: r,
    equalScalar: n
  }), f = ir({
    typed: r,
    DenseMatrix: c
  }), m = Qe({
    typed: r,
    matrix: a,
    concat: l
  }), v = Ht({
    typed: r
  });
  return r(Xn, Gy({
    typed: r,
    config: t
  }), {
    "boolean, boolean": function(d, b) {
      return d === b ? 0 : d > b ? 1 : -1;
    },
    "BigNumber, BigNumber": function(d, b) {
      return Nr(d, b, t.relTol, t.absTol) ? new i(0) : new i(d.cmp(b));
    },
    "bigint, bigint": function(d, b) {
      return d === b ? 0n : d > b ? 1n : -1n;
    },
    "Fraction, Fraction": function(d, b) {
      return new o(d.compare(b));
    },
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, v, m({
    SS: u,
    DS: s,
    Ss: f
  }));
}), Gy = /* @__PURE__ */ q(Xn, ["typed", "config"], (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(Xn, {
    "number, number": function(a, i) {
      return lr(a, i, t.relTol, t.absTol) ? 0 : a > i ? 1 : -1;
    }
  });
}), bt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function va(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Zy(e) {
  if (e.__esModule) return e;
  var r = e.default;
  if (typeof r == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), t;
}
var Vy = function e(r, t) {
  var n = /(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi, a = /(^[ ]*|[ ]*$)/g, i = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, o = /^0x[0-9a-f]+$/i, c = /^0/, l = function(h) {
    return e.insensitive && ("" + h).toLowerCase() || "" + h;
  }, s = l(r).replace(a, "") || "", u = l(t).replace(a, "") || "", f = s.replace(n, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), m = u.replace(n, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"), v = parseInt(s.match(o), 16) || f.length !== 1 && s.match(i) && Date.parse(s), p = parseInt(u.match(o), 16) || v && u.match(i) && Date.parse(u) || null, d, b;
  if (p) {
    if (v < p)
      return -1;
    if (v > p)
      return 1;
  }
  for (var x = 0, D = Math.max(f.length, m.length); x < D; x++) {
    if (d = !(f[x] || "").match(c) && parseFloat(f[x]) || f[x] || 0, b = !(m[x] || "").match(c) && parseFloat(m[x]) || m[x] || 0, isNaN(d) !== isNaN(b))
      return isNaN(d) ? 1 : -1;
    if (typeof d != typeof b && (d += "", b += ""), d < b)
      return -1;
    if (d > b)
      return 1;
  }
  return 0;
};
const Et = /* @__PURE__ */ va(Vy);
var Zs = "compareNatural", Wy = ["typed", "compare"], Yy = /* @__PURE__ */ q(Zs, Wy, (e) => {
  var {
    typed: r,
    compare: t
  } = e, n = t.signatures["boolean,boolean"];
  return r(Zs, {
    "any, any": a
  });
  function a(l, s) {
    var u = Je(l), f = Je(s), m;
    if ((u === "number" || u === "BigNumber" || u === "Fraction") && (f === "number" || f === "BigNumber" || f === "Fraction"))
      return m = t(l, s), m.toString() !== "0" ? m > 0 ? 1 : -1 : Et(u, f);
    var v = ["Array", "DenseMatrix", "SparseMatrix"];
    if (v.includes(u) || v.includes(f))
      return m = i(a, l, s), m !== 0 ? m : Et(u, f);
    if (u !== f)
      return Et(u, f);
    if (u === "Complex")
      return Xy(l, s);
    if (u === "Unit")
      return l.equalBase(s) ? a(l.value, s.value) : o(a, l.formatUnits(), s.formatUnits());
    if (u === "boolean")
      return n(l, s);
    if (u === "string")
      return Et(l, s);
    if (u === "Object")
      return c(a, l, s);
    if (u === "null" || u === "undefined")
      return 0;
    throw new TypeError('Unsupported type of value "' + u + '"');
  }
  function i(l, s, u) {
    return et(s) && et(u) ? o(l, s.toJSON().values, u.toJSON().values) : et(s) ? i(l, s.toArray(), u) : et(u) ? i(l, s, u.toArray()) : en(s) ? i(l, s.toJSON().data, u) : en(u) ? i(l, s, u.toJSON().data) : Array.isArray(s) ? Array.isArray(u) ? o(l, s, u) : i(l, s, [u]) : i(l, [s], u);
  }
  function o(l, s, u) {
    for (var f = 0, m = Math.min(s.length, u.length); f < m; f++) {
      var v = l(s[f], u[f]);
      if (v !== 0)
        return v;
    }
    return s.length > u.length ? 1 : s.length < u.length ? -1 : 0;
  }
  function c(l, s, u) {
    var f = Object.keys(s), m = Object.keys(u);
    f.sort(Et), m.sort(Et);
    var v = o(l, f, m);
    if (v !== 0)
      return v;
    for (var p = 0; p < f.length; p++) {
      var d = l(s[f[p]], u[m[p]]);
      if (d !== 0)
        return d;
    }
    return 0;
  }
});
function Xy(e, r) {
  return e.re > r.re ? 1 : e.re < r.re ? -1 : e.im > r.im ? 1 : e.im < r.im ? -1 : 0;
}
var Vs = "compareText", Jy = ["typed", "matrix", "concat"];
Oa.signature = "any, any";
var Qy = /* @__PURE__ */ q(Vs, Jy, (e) => {
  var {
    typed: r,
    matrix: t,
    concat: n
  } = e, a = Qe({
    typed: r,
    matrix: t,
    concat: n
  });
  return r(Vs, Oa, a({
    elop: Oa,
    Ds: !0
  }));
}), Jn = "equal", Ky = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], jy = /* @__PURE__ */ q(Jn, Ky, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  } = e, o = yr({
    typed: r
  }), c = kr({
    typed: r,
    DenseMatrix: a
  }), l = ir({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: t,
    concat: i
  });
  return r(Jn, eb({
    typed: r,
    equalScalar: n
  }), s({
    elop: n,
    SS: c,
    DS: o,
    Ss: l
  }));
}), eb = q(Jn, ["typed", "equalScalar"], (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return r(Jn, {
    "any, any": function(a, i) {
      return a === null ? i === null : i === null ? a === null : a === void 0 ? i === void 0 : i === void 0 ? a === void 0 : t(a, i);
    }
  });
}), Ws = "equalText", rb = ["typed", "compareText", "isZero"], tb = /* @__PURE__ */ q(Ws, rb, (e) => {
  var {
    typed: r,
    compareText: t,
    isZero: n
  } = e;
  return r(Ws, {
    "any, any": function(i, o) {
      return n(t(i, o));
    }
  });
}), Qn = "smaller", nb = ["typed", "config", "matrix", "DenseMatrix", "concat"], ab = /* @__PURE__ */ q(Qn, nb, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    DenseMatrix: a,
    concat: i
  } = e, o = yr({
    typed: r
  }), c = kr({
    typed: r,
    DenseMatrix: a
  }), l = ir({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: n,
    concat: i
  }), u = Ht({
    typed: r
  });
  return r(Qn, ib({
    typed: r,
    config: t
  }), {
    "boolean, boolean": (f, m) => f < m,
    "BigNumber, BigNumber": function(m, v) {
      return m.lt(v) && !Nr(m, v, t.relTol, t.absTol);
    },
    "bigint, bigint": (f, m) => f < m,
    "Fraction, Fraction": (f, m) => f.compare(m) === -1,
    "Complex, Complex": function(m, v) {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, u, s({
    SS: c,
    DS: o,
    Ss: l
  }));
}), ib = /* @__PURE__ */ q(Qn, ["typed", "config"], (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(Qn, {
    "number, number": function(a, i) {
      return a < i && !lr(a, i, t.relTol, t.absTol);
    }
  });
}), Kn = "smallerEq", ob = ["typed", "config", "matrix", "DenseMatrix", "concat"], sb = /* @__PURE__ */ q(Kn, ob, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    DenseMatrix: a,
    concat: i
  } = e, o = yr({
    typed: r
  }), c = kr({
    typed: r,
    DenseMatrix: a
  }), l = ir({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: n,
    concat: i
  }), u = Ht({
    typed: r
  });
  return r(Kn, ub({
    typed: r,
    config: t
  }), {
    "boolean, boolean": (f, m) => f <= m,
    "BigNumber, BigNumber": function(m, v) {
      return m.lte(v) || Nr(m, v, t.relTol, t.absTol);
    },
    "bigint, bigint": (f, m) => f <= m,
    "Fraction, Fraction": (f, m) => f.compare(m) !== 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, u, s({
    SS: c,
    DS: o,
    Ss: l
  }));
}), ub = /* @__PURE__ */ q(Kn, ["typed", "config"], (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(Kn, {
    "number, number": function(a, i) {
      return a <= i || lr(a, i, t.relTol, t.absTol);
    }
  });
}), jn = "larger", lb = ["typed", "config", "matrix", "DenseMatrix", "concat"], cb = /* @__PURE__ */ q(jn, lb, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    DenseMatrix: a,
    concat: i
  } = e, o = yr({
    typed: r
  }), c = kr({
    typed: r,
    DenseMatrix: a
  }), l = ir({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: n,
    concat: i
  }), u = Ht({
    typed: r
  });
  return r(jn, fb({
    typed: r,
    config: t
  }), {
    "boolean, boolean": (f, m) => f > m,
    "BigNumber, BigNumber": function(m, v) {
      return m.gt(v) && !Nr(m, v, t.relTol, t.absTol);
    },
    "bigint, bigint": (f, m) => f > m,
    "Fraction, Fraction": (f, m) => f.compare(m) === 1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, u, s({
    SS: c,
    DS: o,
    Ss: l
  }));
}), fb = /* @__PURE__ */ q(jn, ["typed", "config"], (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(jn, {
    "number, number": function(a, i) {
      return a > i && !lr(a, i, t.relTol, t.absTol);
    }
  });
}), ea = "largerEq", mb = ["typed", "config", "matrix", "DenseMatrix", "concat"], vb = /* @__PURE__ */ q(ea, mb, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    DenseMatrix: a,
    concat: i
  } = e, o = yr({
    typed: r
  }), c = kr({
    typed: r,
    DenseMatrix: a
  }), l = ir({
    typed: r,
    DenseMatrix: a
  }), s = Qe({
    typed: r,
    matrix: n,
    concat: i
  }), u = Ht({
    typed: r
  });
  return r(ea, pb({
    typed: r,
    config: t
  }), {
    "boolean, boolean": (f, m) => f >= m,
    "BigNumber, BigNumber": function(m, v) {
      return m.gte(v) || Nr(m, v, t.relTol, t.absTol);
    },
    "bigint, bigint": function(m, v) {
      return m >= v;
    },
    "Fraction, Fraction": (f, m) => f.compare(m) !== -1,
    "Complex, Complex": function() {
      throw new TypeError("No ordering relation is defined for complex numbers");
    }
  }, u, s({
    SS: c,
    DS: o,
    Ss: l
  }));
}), pb = /* @__PURE__ */ q(ea, ["typed", "config"], (e) => {
  var {
    typed: r,
    config: t
  } = e;
  return r(ea, {
    "number, number": function(a, i) {
      return a >= i || lr(a, i, t.relTol, t.absTol);
    }
  });
}), Ys = "deepEqual", db = ["typed", "equal"], hb = /* @__PURE__ */ q(Ys, db, (e) => {
  var {
    typed: r,
    equal: t
  } = e;
  return r(Ys, {
    "any, any": function(i, o) {
      return n(i.valueOf(), o.valueOf());
    }
  });
  function n(a, i) {
    if (Array.isArray(a))
      if (Array.isArray(i)) {
        var o = a.length;
        if (o !== i.length)
          return !1;
        for (var c = 0; c < o; c++)
          if (!n(a[c], i[c]))
            return !1;
        return !0;
      } else
        return !1;
    else
      return Array.isArray(i) ? !1 : t(a, i);
  }
}), ra = "unequal", gb = ["typed", "config", "equalScalar", "matrix", "DenseMatrix", "concat"], yb = /* @__PURE__ */ q(ra, gb, (e) => {
  var {
    typed: r,
    config: t,
    equalScalar: n,
    matrix: a,
    DenseMatrix: i,
    concat: o
  } = e, c = yr({
    typed: r
  }), l = kr({
    typed: r,
    DenseMatrix: i
  }), s = ir({
    typed: r,
    DenseMatrix: i
  }), u = Qe({
    typed: r,
    matrix: a,
    concat: o
  });
  return r(ra, bb({
    typed: r,
    equalScalar: n
  }), u({
    elop: f,
    SS: l,
    DS: c,
    Ss: s
  }));
  function f(m, v) {
    return !n(m, v);
  }
}), bb = q(ra, ["typed", "equalScalar"], (e) => {
  var {
    typed: r,
    equalScalar: t
  } = e;
  return r(ra, {
    "any, any": function(a, i) {
      return a === null ? i !== null : i === null ? a !== null : a === void 0 ? i !== void 0 : i === void 0 ? a !== void 0 : !t(a, i);
    }
  });
}), Xs = "partitionSelect", xb = ["typed", "isNumeric", "isNaN", "compare"], wb = /* @__PURE__ */ q(Xs, xb, (e) => {
  var {
    typed: r,
    isNumeric: t,
    isNaN: n,
    compare: a
  } = e, i = a, o = (s, u) => -a(s, u);
  return r(Xs, {
    "Array | Matrix, number": function(u, f) {
      return c(u, f, i);
    },
    "Array | Matrix, number, string": function(u, f, m) {
      if (m === "asc")
        return c(u, f, i);
      if (m === "desc")
        return c(u, f, o);
      throw new Error('Compare string must be "asc" or "desc"');
    },
    "Array | Matrix, number, function": c
  });
  function c(s, u, f) {
    if (!Ae(u) || u < 0)
      throw new Error("k must be a non-negative integer");
    if (Ce(s)) {
      var m = s.size();
      if (m.length > 1)
        throw new Error("Only one dimensional matrices supported");
      return l(s.valueOf(), u, f);
    }
    if (Array.isArray(s))
      return l(s, u, f);
  }
  function l(s, u, f) {
    if (u >= s.length)
      throw new Error("k out of bounds");
    for (var m = 0; m < s.length; m++)
      if (t(s[m]) && n(s[m]))
        return s[m];
    for (var v = 0, p = s.length - 1; v < p; ) {
      for (var d = v, b = p, x = s[Math.floor(Math.random() * (p - v + 1)) + v]; d < b; )
        if (f(s[d], x) >= 0) {
          var D = s[b];
          s[b] = s[d], s[d] = D, --b;
        } else
          ++d;
      f(s[d], x) > 0 && --d, u <= d ? p = d : v = d + 1;
    }
    return s[u];
  }
}), Js = "sort", Db = ["typed", "matrix", "compare", "compareNatural"], Nb = /* @__PURE__ */ q(Js, Db, (e) => {
  var {
    typed: r,
    matrix: t,
    compare: n,
    compareNatural: a
  } = e, i = n, o = (u, f) => -n(u, f);
  return r(Js, {
    Array: function(f) {
      return l(f), f.sort(i);
    },
    Matrix: function(f) {
      return s(f), t(f.toArray().sort(i), f.storage());
    },
    "Array, function": function(f, m) {
      return l(f), f.sort(m);
    },
    "Matrix, function": function(f, m) {
      return s(f), t(f.toArray().sort(m), f.storage());
    },
    "Array, string": function(f, m) {
      return l(f), f.sort(c(m));
    },
    "Matrix, string": function(f, m) {
      return s(f), t(f.toArray().sort(c(m)), f.storage());
    }
  });
  function c(u) {
    if (u === "asc")
      return i;
    if (u === "desc")
      return o;
    if (u === "natural")
      return a;
    throw new Error('String "asc", "desc", or "natural" expected');
  }
  function l(u) {
    if (Te(u).length !== 1)
      throw new Error("One dimensional array expected");
  }
  function s(u) {
    if (u.size().length !== 1)
      throw new Error("One dimensional matrix expected");
  }
}), Qs = "max", Ab = ["typed", "config", "numeric", "larger"], lm = /* @__PURE__ */ q(Qs, Ab, (e) => {
  var {
    typed: r,
    config: t,
    numeric: n,
    larger: a
  } = e;
  return r(Qs, {
    // max([a, b, c, d, ...])
    "Array | Matrix": o,
    // max([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function(l, s) {
      return ca(l, s.valueOf(), i);
    },
    // max(a, b, c, d, ...)
    "...": function(l) {
      if (Ut(l))
        throw new TypeError("Scalar values expected in function max");
      return o(l);
    }
  });
  function i(c, l) {
    try {
      return a(c, l) ? c : l;
    } catch (s) {
      throw gr(s, "max", l);
    }
  }
  function o(c) {
    var l;
    if (Jr(c, function(s) {
      try {
        isNaN(s) && typeof s == "number" ? l = NaN : (l === void 0 || a(s, l)) && (l = s);
      } catch (u) {
        throw gr(u, "max", s);
      }
    }), l === void 0)
      throw new Error("Cannot calculate max of an empty array");
    return typeof l == "string" && (l = n(l, st(l, t))), l;
  }
}), Ks = "min", Eb = ["typed", "config", "numeric", "smaller"], cm = /* @__PURE__ */ q(Ks, Eb, (e) => {
  var {
    typed: r,
    config: t,
    numeric: n,
    smaller: a
  } = e;
  return r(Ks, {
    // min([a, b, c, d, ...])
    "Array | Matrix": o,
    // min([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function(l, s) {
      return ca(l, s.valueOf(), i);
    },
    // min(a, b, c, d, ...)
    "...": function(l) {
      if (Ut(l))
        throw new TypeError("Scalar values expected in function min");
      return o(l);
    }
  });
  function i(c, l) {
    try {
      return a(c, l) ? c : l;
    } catch (s) {
      throw gr(s, "min", l);
    }
  }
  function o(c) {
    var l;
    if (Jr(c, function(s) {
      try {
        isNaN(s) && typeof s == "number" ? l = NaN : (l === void 0 || a(s, l)) && (l = s);
      } catch (u) {
        throw gr(u, "min", s);
      }
    }), l === void 0)
      throw new Error("Cannot calculate min of an empty array");
    return typeof l == "string" && (l = n(l, st(l, t))), l;
  }
}), Sb = "ImmutableDenseMatrix", Cb = ["smaller", "DenseMatrix"], Mb = /* @__PURE__ */ q(Sb, Cb, (e) => {
  var {
    smaller: r,
    DenseMatrix: t
  } = e;
  function n(a, i) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (i && !sr(i))
      throw new Error("Invalid datatype: " + i);
    if (Ce(a) || Ze(a)) {
      var o = new t(a, i);
      this._data = o._data, this._size = o._size, this._datatype = o._datatype, this._min = null, this._max = null;
    } else if (a && Ze(a.data) && Ze(a.size))
      this._data = a.data, this._size = a.size, this._datatype = a.datatype, this._min = typeof a.min < "u" ? a.min : null, this._max = typeof a.max < "u" ? a.max : null;
    else {
      if (a)
        throw new TypeError("Unsupported type of data (" + Je(a) + ")");
      this._data = [], this._size = [0], this._datatype = i, this._min = null, this._max = null;
    }
  }
  return n.prototype = new t(), n.prototype.type = "ImmutableDenseMatrix", n.prototype.isImmutableDenseMatrix = !0, n.prototype.subset = function(a) {
    switch (arguments.length) {
      case 1: {
        var i = t.prototype.subset.call(this, a);
        return Ce(i) ? new n({
          data: i._data,
          size: i._size,
          datatype: i._datatype
        }) : i;
      }
      case 2:
      case 3:
        throw new Error("Cannot invoke set subset on an Immutable Matrix instance");
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  }, n.prototype.set = function() {
    throw new Error("Cannot invoke set on an Immutable Matrix instance");
  }, n.prototype.resize = function() {
    throw new Error("Cannot invoke resize on an Immutable Matrix instance");
  }, n.prototype.reshape = function() {
    throw new Error("Cannot invoke reshape on an Immutable Matrix instance");
  }, n.prototype.clone = function() {
    return new n({
      data: Me(this._data),
      size: Me(this._size),
      datatype: this._datatype
    });
  }, n.prototype.toJSON = function() {
    return {
      mathjs: "ImmutableDenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  }, n.fromJSON = function(a) {
    return new n(a);
  }, n.prototype.swapRows = function() {
    throw new Error("Cannot invoke swapRows on an Immutable Matrix instance");
  }, n.prototype.min = function() {
    if (this._min === null) {
      var a = null;
      this.forEach(function(i) {
        (a === null || r(i, a)) && (a = i);
      }), this._min = a !== null ? a : void 0;
    }
    return this._min;
  }, n.prototype.max = function() {
    if (this._max === null) {
      var a = null;
      this.forEach(function(i) {
        (a === null || r(a, i)) && (a = i);
      }), this._max = a !== null ? a : void 0;
    }
    return this._max;
  }, n;
}, {
  isClass: !0
}), _b = "Index", Fb = ["ImmutableDenseMatrix", "getMatrixDataType"], Tb = /* @__PURE__ */ q(_b, Fb, (e) => {
  var {
    ImmutableDenseMatrix: r,
    getMatrixDataType: t
  } = e;
  function n(i) {
    if (!(this instanceof n))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._dimensions = [], this._sourceSize = [], this._isScalar = !0;
    for (var o = 0, c = arguments.length; o < c; o++) {
      var l = arguments[o], s = Ze(l), u = Ce(l), f = null;
      if (aa(l))
        this._dimensions.push(l), this._isScalar = !1;
      else if (s || u) {
        var m = void 0;
        t(l) === "boolean" ? (s && (m = a(js(l).valueOf())), u && (m = a(js(l._data).valueOf())), f = l.valueOf().length) : m = a(l.valueOf()), this._dimensions.push(m);
        var v = m.size();
        (v.length !== 1 || v[0] !== 1 || f !== null) && (this._isScalar = !1);
      } else if (typeof l == "number")
        this._dimensions.push(a([l]));
      else if (typeof l == "string")
        this._dimensions.push(l);
      else
        throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      this._sourceSize.push(f);
    }
  }
  n.prototype.type = "Index", n.prototype.isIndex = !0;
  function a(i) {
    for (var o = 0, c = i.length; o < c; o++)
      if (typeof i[o] != "number" || !Ae(i[o]))
        throw new TypeError("Index parameters must be positive integer numbers");
    return new r(i);
  }
  return n.prototype.clone = function() {
    var i = new n();
    return i._dimensions = Me(this._dimensions), i._isScalar = this._isScalar, i._sourceSize = this._sourceSize, i;
  }, n.create = function(i) {
    var o = new n();
    return n.apply(o, i), o;
  }, n.prototype.size = function() {
    for (var i = [], o = 0, c = this._dimensions.length; o < c; o++) {
      var l = this._dimensions[o];
      i[o] = typeof l == "string" ? 1 : l.size()[0];
    }
    return i;
  }, n.prototype.max = function() {
    for (var i = [], o = 0, c = this._dimensions.length; o < c; o++) {
      var l = this._dimensions[o];
      i[o] = typeof l == "string" ? l : l.max();
    }
    return i;
  }, n.prototype.min = function() {
    for (var i = [], o = 0, c = this._dimensions.length; o < c; o++) {
      var l = this._dimensions[o];
      i[o] = typeof l == "string" ? l : l.min();
    }
    return i;
  }, n.prototype.forEach = function(i) {
    for (var o = 0, c = this._dimensions.length; o < c; o++)
      i(this._dimensions[o], o, this);
  }, n.prototype.dimension = function(i) {
    return this._dimensions[i] || null;
  }, n.prototype.isObjectProperty = function() {
    return this._dimensions.length === 1 && typeof this._dimensions[0] == "string";
  }, n.prototype.getObjectProperty = function() {
    return this.isObjectProperty() ? this._dimensions[0] : null;
  }, n.prototype.isScalar = function() {
    return this._isScalar;
  }, n.prototype.toArray = function() {
    for (var i = [], o = 0, c = this._dimensions.length; o < c; o++) {
      var l = this._dimensions[o];
      i.push(typeof l == "string" ? l : l.toArray());
    }
    return i;
  }, n.prototype.valueOf = n.prototype.toArray, n.prototype.toString = function() {
    for (var i = [], o = 0, c = this._dimensions.length; o < c; o++) {
      var l = this._dimensions[o];
      typeof l == "string" ? i.push(JSON.stringify(l)) : i.push(l.toString());
    }
    return "[" + i.join(", ") + "]";
  }, n.prototype.toJSON = function() {
    return {
      mathjs: "Index",
      dimensions: this._dimensions
    };
  }, n.fromJSON = function(i) {
    return n.create(i.dimensions);
  }, n;
}, {
  isClass: !0
});
function js(e) {
  var r = [];
  return e.forEach((t, n) => {
    t && r.push(n);
  }), r;
}
var Bb = "FibonacciHeap", Ob = ["smaller", "larger"], $b = /* @__PURE__ */ q(Bb, Ob, (e) => {
  var {
    smaller: r,
    larger: t
  } = e, n = 1 / Math.log((1 + Math.sqrt(5)) / 2);
  function a() {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._minimum = null, this._size = 0;
  }
  a.prototype.type = "FibonacciHeap", a.prototype.isFibonacciHeap = !0, a.prototype.insert = function(u, f) {
    var m = {
      key: u,
      value: f,
      degree: 0
    };
    if (this._minimum) {
      var v = this._minimum;
      m.left = v, m.right = v.right, v.right = m, m.right.left = m, r(u, v.key) && (this._minimum = m);
    } else
      m.left = m, m.right = m, this._minimum = m;
    return this._size++, m;
  }, a.prototype.size = function() {
    return this._size;
  }, a.prototype.clear = function() {
    this._minimum = null, this._size = 0;
  }, a.prototype.isEmpty = function() {
    return this._size === 0;
  }, a.prototype.extractMinimum = function() {
    var u = this._minimum;
    if (u === null)
      return u;
    for (var f = this._minimum, m = u.degree, v = u.child; m > 0; ) {
      var p = v.right;
      v.left.right = v.right, v.right.left = v.left, v.left = f, v.right = f.right, f.right = v, v.right.left = v, v.parent = null, v = p, m--;
    }
    return u.left.right = u.right, u.right.left = u.left, u === u.right ? f = null : (f = u.right, f = s(f, this._size)), this._size--, this._minimum = f, u;
  }, a.prototype.remove = function(u) {
    this._minimum = i(this._minimum, u, -1), this.extractMinimum();
  };
  function i(u, f, m) {
    f.key = m;
    var v = f.parent;
    return v && r(f.key, v.key) && (o(u, f, v), c(u, v)), r(f.key, u.key) && (u = f), u;
  }
  function o(u, f, m) {
    f.left.right = f.right, f.right.left = f.left, m.degree--, m.child === f && (m.child = f.right), m.degree === 0 && (m.child = null), f.left = u, f.right = u.right, u.right = f, f.right.left = f, f.parent = null, f.mark = !1;
  }
  function c(u, f) {
    var m = f.parent;
    m && (f.mark ? (o(u, f, m), c(m)) : f.mark = !0);
  }
  var l = function(f, m) {
    f.left.right = f.right, f.right.left = f.left, f.parent = m, m.child ? (f.left = m.child, f.right = m.child.right, m.child.right = f, f.right.left = f) : (m.child = f, f.right = f, f.left = f), m.degree++, f.mark = !1;
  };
  function s(u, f) {
    var m = Math.floor(Math.log(f) * n) + 1, v = new Array(m), p = 0, d = u;
    if (d)
      for (p++, d = d.right; d !== u; )
        p++, d = d.right;
    for (var b; p > 0; ) {
      for (var x = d.degree, D = d.right; b = v[x], !!b; ) {
        if (t(d.key, b.key)) {
          var h = b;
          b = d, d = h;
        }
        l(b, d), v[x] = null, x++;
      }
      v[x] = d, d = D, p--;
    }
    u = null;
    for (var w = 0; w < m; w++)
      b = v[w], b && (u ? (b.left.right = b.right, b.right.left = b.left, b.left = u, b.right = u.right, u.right = b, b.right.left = b, r(b.key, u.key) && (u = b)) : u = b);
    return u;
  }
  return a;
}, {
  isClass: !0
}), Ib = "Spa", qb = ["addScalar", "equalScalar", "FibonacciHeap"], Rb = /* @__PURE__ */ q(Ib, qb, (e) => {
  var {
    addScalar: r,
    equalScalar: t,
    FibonacciHeap: n
  } = e;
  function a() {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    this._values = [], this._heap = new n();
  }
  return a.prototype.type = "Spa", a.prototype.isSpa = !0, a.prototype.set = function(i, o) {
    if (this._values[i])
      this._values[i].value = o;
    else {
      var c = this._heap.insert(i, o);
      this._values[i] = c;
    }
  }, a.prototype.get = function(i) {
    var o = this._values[i];
    return o ? o.value : 0;
  }, a.prototype.accumulate = function(i, o) {
    var c = this._values[i];
    c ? c.value = r(c.value, o) : (c = this._heap.insert(i, o), this._values[i] = c);
  }, a.prototype.forEach = function(i, o, c) {
    var l = this._heap, s = this._values, u = [], f = l.extractMinimum();
    for (f && u.push(f); f && f.key <= o; )
      f.key >= i && (t(f.value, 0) || c(f.key, f.value, this)), f = l.extractMinimum(), f && u.push(f);
    for (var m = 0; m < u.length; m++) {
      var v = u[m];
      f = l.insert(v.key, v.value), s[f.key] = f;
    }
  }, a.prototype.swap = function(i, o) {
    var c = this._values[i], l = this._values[o];
    if (!c && l)
      c = this._heap.insert(i, l.value), this._heap.remove(l), this._values[i] = c, this._values[o] = void 0;
    else if (c && !l)
      l = this._heap.insert(o, c.value), this._heap.remove(c), this._values[o] = l, this._values[i] = void 0;
    else if (c && l) {
      var s = c.value;
      c.value = l.value, l.value = s;
    }
  }, a;
}, {
  isClass: !0
});
function zb(e) {
  var r = 0, t = 1, n = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null), i = 0, o = function(l) {
    var s = a[l];
    if (s && (delete n[s], delete a[l], --r, t === s)) {
      if (!r) {
        i = 0, t = 1;
        return;
      }
      for (; !Object.prototype.hasOwnProperty.call(n, ++t); )
        ;
    }
  };
  return e = Math.abs(e), {
    hit: function(l) {
      var s = a[l], u = ++i;
      if (n[u] = l, a[l] = u, !s)
        return ++r, r <= e ? void 0 : (l = n[t], o(l), l);
      if (delete n[s], t === s)
        for (; !Object.prototype.hasOwnProperty.call(n, ++t); )
          ;
    },
    delete: o,
    clear: function() {
      r = i = 0, t = 1, n = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null);
    }
  };
}
function cn(e) {
  var {
    hasher: r,
    limit: t
  } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return t = t ?? Number.POSITIVE_INFINITY, r = r ?? JSON.stringify, function n() {
    typeof n.cache != "object" && (n.cache = {
      values: /* @__PURE__ */ new Map(),
      lru: zb(t || Number.POSITIVE_INFINITY)
    });
    for (var a = [], i = 0; i < arguments.length; i++)
      a[i] = arguments[i];
    var o = r(a);
    if (n.cache.values.has(o))
      return n.cache.lru.hit(o), n.cache.values.get(o);
    var c = e.apply(e, a);
    return n.cache.values.set(o, c), n.cache.values.delete(n.cache.lru.hit(o)), c;
  };
}
var Pb = cn(function(e) {
  return new e(1).exp();
}, {
  hasher: pa
}), Ub = cn(function(e) {
  return new e(1).plus(new e(5).sqrt()).div(2);
}, {
  hasher: pa
}), fi = cn(function(e) {
  return e.acos(-1);
}, {
  hasher: pa
}), Lb = cn(function(e) {
  return fi(e).times(2);
}, {
  hasher: pa
});
function pa(e) {
  return e[0].precision;
}
function eu(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    r && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Na(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? eu(Object(t), !0).forEach(function(n) {
      ar(e, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : eu(Object(t)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return e;
}
var kb = "Unit", Hb = ["?on", "config", "addScalar", "subtractScalar", "multiplyScalar", "divideScalar", "pow", "abs", "fix", "round", "equal", "isNumeric", "format", "number", "Complex", "BigNumber", "Fraction"], Gb = /* @__PURE__ */ q(kb, Hb, (e) => {
  var {
    on: r,
    config: t,
    addScalar: n,
    subtractScalar: a,
    multiplyScalar: i,
    divideScalar: o,
    pow: c,
    abs: l,
    fix: s,
    round: u,
    equal: f,
    isNumeric: m,
    format: v,
    number: p,
    Complex: d,
    BigNumber: b,
    Fraction: x
  } = e, D = p;
  function h(P, H) {
    if (!(this instanceof h))
      throw new Error("Constructor must be called with the new operator");
    if (!(P == null || m(P) || Ir(P)))
      throw new TypeError("First parameter in Unit constructor must be number, BigNumber, Fraction, Complex, or undefined");
    if (this.fixPrefix = !1, this.skipAutomaticSimplification = !0, H === void 0)
      this.units = [], this.dimensions = L.map((k) => 0);
    else if (typeof H == "string") {
      var ee = h.parse(H);
      this.units = ee.units, this.dimensions = ee.dimensions;
    } else if (wr(H) && H.value === null)
      this.fixPrefix = H.fixPrefix, this.skipAutomaticSimplification = H.skipAutomaticSimplification, this.dimensions = H.dimensions.slice(0), this.units = H.units.map((k) => vr({}, k));
    else
      throw new TypeError("Second parameter in Unit constructor must be a string or valueless Unit");
    this.value = this._normalize(P);
  }
  Object.defineProperty(h, "name", {
    value: "Unit"
  }), h.prototype.constructor = h, h.prototype.type = "Unit", h.prototype.isUnit = !0;
  var w, y, g;
  function A() {
    for (; g === " " || g === "	"; )
      S();
  }
  function E(P) {
    return P >= "0" && P <= "9" || P === ".";
  }
  function N(P) {
    return P >= "0" && P <= "9";
  }
  function S() {
    y++, g = w.charAt(y);
  }
  function C(P) {
    y = P, g = w.charAt(y);
  }
  function T() {
    var P = "", H = y;
    if (g === "+" ? S() : g === "-" && (P += g, S()), !E(g))
      return C(H), null;
    if (g === ".") {
      if (P += g, S(), !N(g))
        return C(H), null;
    } else {
      for (; N(g); )
        P += g, S();
      g === "." && (P += g, S());
    }
    for (; N(g); )
      P += g, S();
    if (g === "E" || g === "e") {
      var ee = "", k = y;
      if (ee += g, S(), (g === "+" || g === "-") && (ee += g, S()), !N(g))
        return C(k), P;
      for (P = P + ee; N(g); )
        P += g, S();
    }
    return P;
  }
  function O() {
    for (var P = ""; N(g) || h.isValidAlpha(g); )
      P += g, S();
    var H = P.charAt(0);
    return h.isValidAlpha(H) ? P : null;
  }
  function I(P) {
    return g === P ? (S(), P) : null;
  }
  h.parse = function(P, H) {
    if (H = H || {}, w = P, y = -1, g = "", typeof w != "string")
      throw new TypeError("Invalid argument in Unit.parse, string expected");
    var ee = new h();
    ee.units = [];
    var k = 1, V = !1;
    S(), A();
    var X = T(), fe = null;
    if (X) {
      if (t.number === "BigNumber")
        fe = new b(X);
      else if (t.number === "Fraction")
        try {
          fe = new x(X);
        } catch {
          fe = parseFloat(X);
        }
      else
        fe = parseFloat(X);
      A(), I("*") ? (k = 1, V = !0) : I("/") && (k = -1, V = !0);
    }
    for (var ce = [], R = 1; ; ) {
      for (A(); g === "("; )
        ce.push(k), R *= k, k = 1, S(), A();
      var U = void 0;
      if (g) {
        var Y = g;
        if (U = O(), U === null)
          throw new SyntaxError('Unexpected "' + Y + '" in "' + w + '" at index ' + y.toString());
      } else
        break;
      var ne = $(U);
      if (ne === null)
        throw new SyntaxError('Unit "' + U + '" not found.');
      var se = k * R;
      if (A(), I("^")) {
        A();
        var ue = T();
        if (ue === null)
          throw new SyntaxError('In "' + P + '", "^" must be followed by a floating-point number');
        se *= ue;
      }
      ee.units.push({
        unit: ne.unit,
        prefix: ne.prefix,
        power: se
      });
      for (var he = 0; he < L.length; he++)
        ee.dimensions[he] += (ne.unit.dimensions[he] || 0) * se;
      for (A(); g === ")"; ) {
        if (ce.length === 0)
          throw new SyntaxError('Unmatched ")" in "' + w + '" at index ' + y.toString());
        R /= ce.pop(), S(), A();
      }
      if (V = !1, I("*") ? (k = 1, V = !0) : I("/") ? (k = -1, V = !0) : k = 1, ne.unit.base) {
        var de = ne.unit.base.key;
        K.auto[de] = {
          unit: ne.unit,
          prefix: ne.prefix
        };
      }
    }
    if (A(), g)
      throw new SyntaxError('Could not parse: "' + P + '"');
    if (V)
      throw new SyntaxError('Trailing characters: "' + P + '"');
    if (ce.length !== 0)
      throw new SyntaxError('Unmatched "(" in "' + w + '"');
    if (ee.units.length === 0 && !H.allowNoUnits)
      throw new SyntaxError('"' + P + '" contains no units');
    return ee.value = fe !== void 0 ? ee._normalize(fe) : null, ee;
  }, h.prototype.clone = function() {
    var P = new h();
    P.fixPrefix = this.fixPrefix, P.skipAutomaticSimplification = this.skipAutomaticSimplification, P.value = Me(this.value), P.dimensions = this.dimensions.slice(0), P.units = [];
    for (var H = 0; H < this.units.length; H++) {
      P.units[H] = {};
      for (var ee in this.units[H])
        De(this.units[H], ee) && (P.units[H][ee] = this.units[H][ee]);
    }
    return P;
  }, h.prototype.valueType = function() {
    return Je(this.value);
  }, h.prototype._isDerived = function() {
    return this.units.length === 0 ? !1 : this.units.length > 1 || Math.abs(this.units[0].power - 1) > 1e-15;
  }, h.prototype._normalize = function(P) {
    if (P == null || this.units.length === 0)
      return P;
    for (var H = P, ee = h._getNumberConverter(Je(P)), k = 0; k < this.units.length; k++) {
      var V = ee(this.units[k].unit.value), X = ee(this.units[k].prefix.value), fe = ee(this.units[k].power);
      H = i(H, c(i(V, X), fe));
    }
    return H;
  }, h.prototype._denormalize = function(P, H) {
    if (P == null || this.units.length === 0)
      return P;
    for (var ee = P, k = h._getNumberConverter(Je(P)), V = 0; V < this.units.length; V++) {
      var X = k(this.units[V].unit.value), fe = k(this.units[V].prefix.value), ce = k(this.units[V].power);
      ee = o(ee, c(i(X, fe), ce));
    }
    return ee;
  };
  var $ = cn((P) => {
    if (De(z, P)) {
      var H = z[P], ee = H.prefixes[""];
      return {
        unit: H,
        prefix: ee
      };
    }
    for (var k in z)
      if (De(z, k) && rd(P, k)) {
        var V = z[k], X = P.length - k.length, fe = P.substring(0, X), ce = De(V.prefixes, fe) ? V.prefixes[fe] : void 0;
        if (ce !== void 0)
          return {
            unit: V,
            prefix: ce
          };
      }
    return null;
  }, {
    hasher: (P) => P[0],
    limit: 100
  });
  h.isValuelessUnit = function(P) {
    return $(P) !== null;
  }, h.prototype.hasBase = function(P) {
    if (typeof P == "string" && (P = B[P]), !P)
      return !1;
    for (var H = 0; H < L.length; H++)
      if (Math.abs((this.dimensions[H] || 0) - (P.dimensions[H] || 0)) > 1e-12)
        return !1;
    return !0;
  }, h.prototype.equalBase = function(P) {
    for (var H = 0; H < L.length; H++)
      if (Math.abs((this.dimensions[H] || 0) - (P.dimensions[H] || 0)) > 1e-12)
        return !1;
    return !0;
  }, h.prototype.equals = function(P) {
    return this.equalBase(P) && f(this.value, P.value);
  }, h.prototype.multiply = function(P) {
    for (var H = this.clone(), ee = wr(P) ? P : new h(P), k = 0; k < L.length; k++)
      H.dimensions[k] = (this.dimensions[k] || 0) + (ee.dimensions[k] || 0);
    for (var V = 0; V < ee.units.length; V++) {
      var X = Na({}, ee.units[V]);
      H.units.push(X);
    }
    if (this.value !== null || ee.value !== null) {
      var fe = this.value === null ? this._normalize(1) : this.value, ce = ee.value === null ? ee._normalize(1) : ee.value;
      H.value = i(fe, ce);
    } else
      H.value = null;
    return wr(P) && (H.skipAutomaticSimplification = !1), F(H);
  }, h.prototype.divideInto = function(P) {
    return new h(P).divide(this);
  }, h.prototype.divide = function(P) {
    for (var H = this.clone(), ee = wr(P) ? P : new h(P), k = 0; k < L.length; k++)
      H.dimensions[k] = (this.dimensions[k] || 0) - (ee.dimensions[k] || 0);
    for (var V = 0; V < ee.units.length; V++) {
      var X = Na(Na({}, ee.units[V]), {}, {
        power: -ee.units[V].power
      });
      H.units.push(X);
    }
    if (this.value !== null || ee.value !== null) {
      var fe = this.value === null ? this._normalize(1) : this.value, ce = ee.value === null ? ee._normalize(1) : ee.value;
      H.value = o(fe, ce);
    } else
      H.value = null;
    return wr(P) && (H.skipAutomaticSimplification = !1), F(H);
  }, h.prototype.pow = function(P) {
    for (var H = this.clone(), ee = 0; ee < L.length; ee++)
      H.dimensions[ee] = (this.dimensions[ee] || 0) * P;
    for (var k = 0; k < H.units.length; k++)
      H.units[k].power *= P;
    return H.value !== null ? H.value = c(H.value, P) : H.value = null, H.skipAutomaticSimplification = !1, F(H);
  };
  function F(P) {
    return P.equalBase(B.NONE) && P.value !== null && !t.predictable ? P.value : P;
  }
  h.prototype.abs = function() {
    var P = this.clone();
    if (P.value !== null)
      if (P._isDerived() || P.units.length === 0 || P.units[0].unit.offset === 0)
        P.value = l(P.value);
      else {
        var H = P._numberConverter(), ee = H(P.units[0].unit.value), k = H(P.units[0].unit.offset), V = i(ee, k);
        P.value = a(l(n(P.value, V)), V);
      }
    for (var X in P.units)
      (P.units[X].unit.name === "VA" || P.units[X].unit.name === "VAR") && (P.units[X].unit = z.W);
    return P;
  }, h.prototype.to = function(P) {
    var H = this.value === null ? this._normalize(1) : this.value, ee;
    if (typeof P == "string")
      ee = h.parse(P);
    else if (wr(P))
      ee = P.clone();
    else
      throw new Error("String or Unit expected as parameter");
    if (!this.equalBase(ee))
      throw new Error("Units do not match ('".concat(ee.toString(), "' != '").concat(this.toString(), "')"));
    if (ee.value !== null)
      throw new Error("Cannot convert to a unit with a value");
    if (this.value === null || this._isDerived() || this.units.length === 0 || ee.units.length === 0 || this.units[0].unit.offset === ee.units[0].unit.offset)
      ee.value = Me(H);
    else {
      var k = h._getNumberConverter(Je(H)), V = this.units[0].unit.value, X = this.units[0].unit.offset, fe = i(V, X), ce = ee.units[0].unit.value, R = ee.units[0].unit.offset, U = i(ce, R);
      ee.value = n(H, k(a(fe, U)));
    }
    return ee.fixPrefix = !0, ee.skipAutomaticSimplification = !0, ee;
  }, h.prototype.toNumber = function(P) {
    return D(this.toNumeric(P));
  }, h.prototype.toNumeric = function(P) {
    var H;
    return P ? H = this.to(P) : H = this.clone(), H._isDerived() || H.units.length === 0 ? H._denormalize(H.value) : H._denormalize(H.value, H.units[0].prefix.value);
  }, h.prototype.toString = function() {
    return this.format();
  }, h.prototype.toJSON = function() {
    return {
      mathjs: "Unit",
      value: this._denormalize(this.value),
      unit: this.units.length > 0 ? this.formatUnits() : null,
      fixPrefix: this.fixPrefix
    };
  }, h.fromJSON = function(P) {
    var H, ee = new h(P.value, (H = P.unit) !== null && H !== void 0 ? H : void 0);
    return ee.fixPrefix = P.fixPrefix || !1, ee;
  }, h.prototype.valueOf = h.prototype.toString, h.prototype.simplify = function() {
    var P = this.clone(), H = [], ee;
    for (var k in re)
      if (De(re, k) && P.hasBase(B[k])) {
        ee = k;
        break;
      }
    if (ee === "NONE")
      P.units = [];
    else {
      var V;
      if (ee && De(re, ee) && (V = re[ee]), V)
        P.units = [{
          unit: V.unit,
          prefix: V.prefix,
          power: 1
        }];
      else {
        for (var X = !1, fe = 0; fe < L.length; fe++) {
          var ce = L[fe];
          Math.abs(P.dimensions[fe] || 0) > 1e-12 && (De(re, ce) ? H.push({
            unit: re[ce].unit,
            prefix: re[ce].prefix,
            power: P.dimensions[fe] || 0
          }) : X = !0);
        }
        H.length < P.units.length && !X && (P.units = H);
      }
    }
    return P;
  }, h.prototype.toSI = function() {
    for (var P = this.clone(), H = [], ee = 0; ee < L.length; ee++) {
      var k = L[ee];
      if (Math.abs(P.dimensions[ee] || 0) > 1e-12)
        if (De(K.si, k))
          H.push({
            unit: K.si[k].unit,
            prefix: K.si[k].prefix,
            power: P.dimensions[ee] || 0
          });
        else
          throw new Error("Cannot express custom unit " + k + " in SI units");
    }
    return P.units = H, P.fixPrefix = !0, P.skipAutomaticSimplification = !0, this.value !== null ? (P.value = null, this.to(P)) : P;
  }, h.prototype.formatUnits = function() {
    for (var P = "", H = "", ee = 0, k = 0, V = 0; V < this.units.length; V++)
      this.units[V].power > 0 ? (ee++, P += " " + this.units[V].prefix.name + this.units[V].unit.name, Math.abs(this.units[V].power - 1) > 1e-15 && (P += "^" + this.units[V].power)) : this.units[V].power < 0 && k++;
    if (k > 0)
      for (var X = 0; X < this.units.length; X++)
        this.units[X].power < 0 && (ee > 0 ? (H += " " + this.units[X].prefix.name + this.units[X].unit.name, Math.abs(this.units[X].power + 1) > 1e-15 && (H += "^" + -this.units[X].power)) : (H += " " + this.units[X].prefix.name + this.units[X].unit.name, H += "^" + this.units[X].power));
    P = P.substr(1), H = H.substr(1), ee > 1 && k > 0 && (P = "(" + P + ")"), k > 1 && ee > 0 && (H = "(" + H + ")");
    var fe = P;
    return ee > 0 && k > 0 && (fe += " / "), fe += H, fe;
  }, h.prototype.format = function(P) {
    var H = this.skipAutomaticSimplification || this.value === null ? this.clone() : this.simplify(), ee = !1;
    typeof H.value < "u" && H.value !== null && Ir(H.value) && (ee = Math.abs(H.value.re) < 1e-14);
    for (var k in H.units)
      De(H.units, k) && H.units[k].unit && (H.units[k].unit.name === "VA" && ee ? H.units[k].unit = z.VAR : H.units[k].unit.name === "VAR" && !ee && (H.units[k].unit = z.VA));
    H.units.length === 1 && !H.fixPrefix && Math.abs(H.units[0].power - Math.round(H.units[0].power)) < 1e-14 && (H.units[0].prefix = H._bestPrefix());
    var V = H._denormalize(H.value), X = H.value !== null ? v(V, P || {}) : "", fe = H.formatUnits();
    return H.value && Ir(H.value) && (X = "(" + X + ")"), fe.length > 0 && X.length > 0 && (X += " "), X += fe, X;
  }, h.prototype._bestPrefix = function() {
    if (this.units.length !== 1)
      throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
    if (Math.abs(this.units[0].power - Math.round(this.units[0].power)) >= 1e-14)
      throw new Error("Can only compute the best prefix for single units with integer powers, like kg, s^2, N^-1, and so forth!");
    var P = this.value !== null ? l(this.value) : 0, H = l(this.units[0].unit.value), ee = this.units[0].prefix;
    if (P === 0)
      return ee;
    var k = this.units[0].power, V = Math.log(P / Math.pow(ee.value * H, k)) / Math.LN10 - 1.2;
    if (V > -2.200001 && V < 1.800001) return ee;
    V = Math.abs(V);
    var X = this.units[0].unit.prefixes;
    for (var fe in X)
      if (De(X, fe)) {
        var ce = X[fe];
        if (ce.scientific) {
          var R = Math.abs(Math.log(P / Math.pow(ce.value * H, k)) / Math.LN10 - 1.2);
          (R < V || R === V && ce.name.length < ee.name.length) && (ee = ce, V = R);
        }
      }
    return ee;
  }, h.prototype.splitUnit = function(P) {
    for (var H = this.clone(), ee = [], k = 0; k < P.length && (H = H.to(P[k]), k !== P.length - 1); k++) {
      var V = H.toNumeric(), X = u(V), fe = void 0, ce = f(X, V);
      ce ? fe = X : fe = s(H.toNumeric());
      var R = new h(fe, P[k].toString());
      ee.push(R), H = a(H, R);
    }
    for (var U = 0, Y = 0; Y < ee.length; Y++)
      U = n(U, ee[Y].value);
    return f(U, this.value) && (H.value = 0), ee.push(H), ee;
  };
  var _ = {
    NONE: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      }
    },
    SHORT: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      da: {
        name: "da",
        value: 10,
        scientific: !1
      },
      h: {
        name: "h",
        value: 100,
        scientific: !1
      },
      k: {
        name: "k",
        value: 1e3,
        scientific: !0
      },
      M: {
        name: "M",
        value: 1e6,
        scientific: !0
      },
      G: {
        name: "G",
        value: 1e9,
        scientific: !0
      },
      T: {
        name: "T",
        value: 1e12,
        scientific: !0
      },
      P: {
        name: "P",
        value: 1e15,
        scientific: !0
      },
      E: {
        name: "E",
        value: 1e18,
        scientific: !0
      },
      Z: {
        name: "Z",
        value: 1e21,
        scientific: !0
      },
      Y: {
        name: "Y",
        value: 1e24,
        scientific: !0
      },
      R: {
        name: "R",
        value: 1e27,
        scientific: !0
      },
      Q: {
        name: "Q",
        value: 1e30,
        scientific: !0
      },
      d: {
        name: "d",
        value: 0.1,
        scientific: !1
      },
      c: {
        name: "c",
        value: 0.01,
        scientific: !1
      },
      m: {
        name: "m",
        value: 1e-3,
        scientific: !0
      },
      u: {
        name: "u",
        value: 1e-6,
        scientific: !0
      },
      n: {
        name: "n",
        value: 1e-9,
        scientific: !0
      },
      p: {
        name: "p",
        value: 1e-12,
        scientific: !0
      },
      f: {
        name: "f",
        value: 1e-15,
        scientific: !0
      },
      a: {
        name: "a",
        value: 1e-18,
        scientific: !0
      },
      z: {
        name: "z",
        value: 1e-21,
        scientific: !0
      },
      y: {
        name: "y",
        value: 1e-24,
        scientific: !0
      },
      r: {
        name: "r",
        value: 1e-27,
        scientific: !0
      },
      q: {
        name: "q",
        value: 1e-30,
        scientific: !0
      }
    },
    LONG: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      deca: {
        name: "deca",
        value: 10,
        scientific: !1
      },
      hecto: {
        name: "hecto",
        value: 100,
        scientific: !1
      },
      kilo: {
        name: "kilo",
        value: 1e3,
        scientific: !0
      },
      mega: {
        name: "mega",
        value: 1e6,
        scientific: !0
      },
      giga: {
        name: "giga",
        value: 1e9,
        scientific: !0
      },
      tera: {
        name: "tera",
        value: 1e12,
        scientific: !0
      },
      peta: {
        name: "peta",
        value: 1e15,
        scientific: !0
      },
      exa: {
        name: "exa",
        value: 1e18,
        scientific: !0
      },
      zetta: {
        name: "zetta",
        value: 1e21,
        scientific: !0
      },
      yotta: {
        name: "yotta",
        value: 1e24,
        scientific: !0
      },
      ronna: {
        name: "ronna",
        value: 1e27,
        scientific: !0
      },
      quetta: {
        name: "quetta",
        value: 1e30,
        scientific: !0
      },
      deci: {
        name: "deci",
        value: 0.1,
        scientific: !1
      },
      centi: {
        name: "centi",
        value: 0.01,
        scientific: !1
      },
      milli: {
        name: "milli",
        value: 1e-3,
        scientific: !0
      },
      micro: {
        name: "micro",
        value: 1e-6,
        scientific: !0
      },
      nano: {
        name: "nano",
        value: 1e-9,
        scientific: !0
      },
      pico: {
        name: "pico",
        value: 1e-12,
        scientific: !0
      },
      femto: {
        name: "femto",
        value: 1e-15,
        scientific: !0
      },
      atto: {
        name: "atto",
        value: 1e-18,
        scientific: !0
      },
      zepto: {
        name: "zepto",
        value: 1e-21,
        scientific: !0
      },
      yocto: {
        name: "yocto",
        value: 1e-24,
        scientific: !0
      },
      ronto: {
        name: "ronto",
        value: 1e-27,
        scientific: !0
      },
      quecto: {
        name: "quecto",
        value: 1e-30,
        scientific: !0
      }
    },
    SQUARED: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      da: {
        name: "da",
        value: 100,
        scientific: !1
      },
      h: {
        name: "h",
        value: 1e4,
        scientific: !1
      },
      k: {
        name: "k",
        value: 1e6,
        scientific: !0
      },
      M: {
        name: "M",
        value: 1e12,
        scientific: !0
      },
      G: {
        name: "G",
        value: 1e18,
        scientific: !0
      },
      T: {
        name: "T",
        value: 1e24,
        scientific: !0
      },
      P: {
        name: "P",
        value: 1e30,
        scientific: !0
      },
      E: {
        name: "E",
        value: 1e36,
        scientific: !0
      },
      Z: {
        name: "Z",
        value: 1e42,
        scientific: !0
      },
      Y: {
        name: "Y",
        value: 1e48,
        scientific: !0
      },
      R: {
        name: "R",
        value: 1e54,
        scientific: !0
      },
      Q: {
        name: "Q",
        value: 1e60,
        scientific: !0
      },
      d: {
        name: "d",
        value: 0.01,
        scientific: !1
      },
      c: {
        name: "c",
        value: 1e-4,
        scientific: !1
      },
      m: {
        name: "m",
        value: 1e-6,
        scientific: !0
      },
      u: {
        name: "u",
        value: 1e-12,
        scientific: !0
      },
      n: {
        name: "n",
        value: 1e-18,
        scientific: !0
      },
      p: {
        name: "p",
        value: 1e-24,
        scientific: !0
      },
      f: {
        name: "f",
        value: 1e-30,
        scientific: !0
      },
      a: {
        name: "a",
        value: 1e-36,
        scientific: !0
      },
      z: {
        name: "z",
        value: 1e-42,
        scientific: !0
      },
      y: {
        name: "y",
        value: 1e-48,
        scientific: !0
      },
      r: {
        name: "r",
        value: 1e-54,
        scientific: !0
      },
      q: {
        name: "q",
        value: 1e-60,
        scientific: !0
      }
    },
    CUBIC: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      da: {
        name: "da",
        value: 1e3,
        scientific: !1
      },
      h: {
        name: "h",
        value: 1e6,
        scientific: !1
      },
      k: {
        name: "k",
        value: 1e9,
        scientific: !0
      },
      M: {
        name: "M",
        value: 1e18,
        scientific: !0
      },
      G: {
        name: "G",
        value: 1e27,
        scientific: !0
      },
      T: {
        name: "T",
        value: 1e36,
        scientific: !0
      },
      P: {
        name: "P",
        value: 1e45,
        scientific: !0
      },
      E: {
        name: "E",
        value: 1e54,
        scientific: !0
      },
      Z: {
        name: "Z",
        value: 1e63,
        scientific: !0
      },
      Y: {
        name: "Y",
        value: 1e72,
        scientific: !0
      },
      R: {
        name: "R",
        value: 1e81,
        scientific: !0
      },
      Q: {
        name: "Q",
        value: 1e90,
        scientific: !0
      },
      d: {
        name: "d",
        value: 1e-3,
        scientific: !1
      },
      c: {
        name: "c",
        value: 1e-6,
        scientific: !1
      },
      m: {
        name: "m",
        value: 1e-9,
        scientific: !0
      },
      u: {
        name: "u",
        value: 1e-18,
        scientific: !0
      },
      n: {
        name: "n",
        value: 1e-27,
        scientific: !0
      },
      p: {
        name: "p",
        value: 1e-36,
        scientific: !0
      },
      f: {
        name: "f",
        value: 1e-45,
        scientific: !0
      },
      a: {
        name: "a",
        value: 1e-54,
        scientific: !0
      },
      z: {
        name: "z",
        value: 1e-63,
        scientific: !0
      },
      y: {
        name: "y",
        value: 1e-72,
        scientific: !0
      },
      r: {
        name: "r",
        value: 1e-81,
        scientific: !0
      },
      q: {
        name: "q",
        value: 1e-90,
        scientific: !0
      }
    },
    BINARY_SHORT_SI: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      k: {
        name: "k",
        value: 1e3,
        scientific: !0
      },
      M: {
        name: "M",
        value: 1e6,
        scientific: !0
      },
      G: {
        name: "G",
        value: 1e9,
        scientific: !0
      },
      T: {
        name: "T",
        value: 1e12,
        scientific: !0
      },
      P: {
        name: "P",
        value: 1e15,
        scientific: !0
      },
      E: {
        name: "E",
        value: 1e18,
        scientific: !0
      },
      Z: {
        name: "Z",
        value: 1e21,
        scientific: !0
      },
      Y: {
        name: "Y",
        value: 1e24,
        scientific: !0
      }
    },
    BINARY_SHORT_IEC: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      Ki: {
        name: "Ki",
        value: 1024,
        scientific: !0
      },
      Mi: {
        name: "Mi",
        value: Math.pow(1024, 2),
        scientific: !0
      },
      Gi: {
        name: "Gi",
        value: Math.pow(1024, 3),
        scientific: !0
      },
      Ti: {
        name: "Ti",
        value: Math.pow(1024, 4),
        scientific: !0
      },
      Pi: {
        name: "Pi",
        value: Math.pow(1024, 5),
        scientific: !0
      },
      Ei: {
        name: "Ei",
        value: Math.pow(1024, 6),
        scientific: !0
      },
      Zi: {
        name: "Zi",
        value: Math.pow(1024, 7),
        scientific: !0
      },
      Yi: {
        name: "Yi",
        value: Math.pow(1024, 8),
        scientific: !0
      }
    },
    BINARY_LONG_SI: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      kilo: {
        name: "kilo",
        value: 1e3,
        scientific: !0
      },
      mega: {
        name: "mega",
        value: 1e6,
        scientific: !0
      },
      giga: {
        name: "giga",
        value: 1e9,
        scientific: !0
      },
      tera: {
        name: "tera",
        value: 1e12,
        scientific: !0
      },
      peta: {
        name: "peta",
        value: 1e15,
        scientific: !0
      },
      exa: {
        name: "exa",
        value: 1e18,
        scientific: !0
      },
      zetta: {
        name: "zetta",
        value: 1e21,
        scientific: !0
      },
      yotta: {
        name: "yotta",
        value: 1e24,
        scientific: !0
      }
    },
    BINARY_LONG_IEC: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      kibi: {
        name: "kibi",
        value: 1024,
        scientific: !0
      },
      mebi: {
        name: "mebi",
        value: Math.pow(1024, 2),
        scientific: !0
      },
      gibi: {
        name: "gibi",
        value: Math.pow(1024, 3),
        scientific: !0
      },
      tebi: {
        name: "tebi",
        value: Math.pow(1024, 4),
        scientific: !0
      },
      pebi: {
        name: "pebi",
        value: Math.pow(1024, 5),
        scientific: !0
      },
      exi: {
        name: "exi",
        value: Math.pow(1024, 6),
        scientific: !0
      },
      zebi: {
        name: "zebi",
        value: Math.pow(1024, 7),
        scientific: !0
      },
      yobi: {
        name: "yobi",
        value: Math.pow(1024, 8),
        scientific: !0
      }
    },
    BTU: {
      "": {
        name: "",
        value: 1,
        scientific: !0
      },
      MM: {
        name: "MM",
        value: 1e6,
        scientific: !0
      }
    }
  };
  _.SHORTLONG = vr({}, _.SHORT, _.LONG), _.BINARY_SHORT = vr({}, _.BINARY_SHORT_SI, _.BINARY_SHORT_IEC), _.BINARY_LONG = vr({}, _.BINARY_LONG_SI, _.BINARY_LONG_IEC);
  var L = ["MASS", "LENGTH", "TIME", "CURRENT", "TEMPERATURE", "LUMINOUS_INTENSITY", "AMOUNT_OF_SUBSTANCE", "ANGLE", "BIT"], B = {
    NONE: {
      dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    MASS: {
      dimensions: [1, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    LENGTH: {
      dimensions: [0, 1, 0, 0, 0, 0, 0, 0, 0]
    },
    TIME: {
      dimensions: [0, 0, 1, 0, 0, 0, 0, 0, 0]
    },
    CURRENT: {
      dimensions: [0, 0, 0, 1, 0, 0, 0, 0, 0]
    },
    TEMPERATURE: {
      dimensions: [0, 0, 0, 0, 1, 0, 0, 0, 0]
    },
    LUMINOUS_INTENSITY: {
      dimensions: [0, 0, 0, 0, 0, 1, 0, 0, 0]
    },
    AMOUNT_OF_SUBSTANCE: {
      dimensions: [0, 0, 0, 0, 0, 0, 1, 0, 0]
    },
    FORCE: {
      dimensions: [1, 1, -2, 0, 0, 0, 0, 0, 0]
    },
    SURFACE: {
      dimensions: [0, 2, 0, 0, 0, 0, 0, 0, 0]
    },
    VOLUME: {
      dimensions: [0, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    ENERGY: {
      dimensions: [1, 2, -2, 0, 0, 0, 0, 0, 0]
    },
    POWER: {
      dimensions: [1, 2, -3, 0, 0, 0, 0, 0, 0]
    },
    PRESSURE: {
      dimensions: [1, -1, -2, 0, 0, 0, 0, 0, 0]
    },
    ELECTRIC_CHARGE: {
      dimensions: [0, 0, 1, 1, 0, 0, 0, 0, 0]
    },
    ELECTRIC_CAPACITANCE: {
      dimensions: [-1, -2, 4, 2, 0, 0, 0, 0, 0]
    },
    ELECTRIC_POTENTIAL: {
      dimensions: [1, 2, -3, -1, 0, 0, 0, 0, 0]
    },
    ELECTRIC_RESISTANCE: {
      dimensions: [1, 2, -3, -2, 0, 0, 0, 0, 0]
    },
    ELECTRIC_INDUCTANCE: {
      dimensions: [1, 2, -2, -2, 0, 0, 0, 0, 0]
    },
    ELECTRIC_CONDUCTANCE: {
      dimensions: [-1, -2, 3, 2, 0, 0, 0, 0, 0]
    },
    MAGNETIC_FLUX: {
      dimensions: [1, 2, -2, -1, 0, 0, 0, 0, 0]
    },
    MAGNETIC_FLUX_DENSITY: {
      dimensions: [1, 0, -2, -1, 0, 0, 0, 0, 0]
    },
    FREQUENCY: {
      dimensions: [0, 0, -1, 0, 0, 0, 0, 0, 0]
    },
    ANGLE: {
      dimensions: [0, 0, 0, 0, 0, 0, 0, 1, 0]
    },
    BIT: {
      dimensions: [0, 0, 0, 0, 0, 0, 0, 0, 1]
    }
  };
  for (var W in B)
    De(B, W) && (B[W].key = W);
  var Q = {}, Z = {
    name: "",
    base: Q,
    value: 1,
    offset: 0,
    dimensions: L.map((P) => 0)
  }, z = {
    // length
    meter: {
      name: "meter",
      base: B.LENGTH,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    inch: {
      name: "inch",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.0254,
      offset: 0
    },
    foot: {
      name: "foot",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.3048,
      offset: 0
    },
    yard: {
      name: "yard",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.9144,
      offset: 0
    },
    mile: {
      name: "mile",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 1609.344,
      offset: 0
    },
    link: {
      name: "link",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.201168,
      offset: 0
    },
    rod: {
      name: "rod",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 5.0292,
      offset: 0
    },
    chain: {
      name: "chain",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 20.1168,
      offset: 0
    },
    angstrom: {
      name: "angstrom",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 1e-10,
      offset: 0
    },
    m: {
      name: "m",
      base: B.LENGTH,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    in: {
      name: "in",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.0254,
      offset: 0
    },
    ft: {
      name: "ft",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.3048,
      offset: 0
    },
    yd: {
      name: "yd",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.9144,
      offset: 0
    },
    mi: {
      name: "mi",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 1609.344,
      offset: 0
    },
    li: {
      name: "li",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 0.201168,
      offset: 0
    },
    rd: {
      name: "rd",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 5.02921,
      offset: 0
    },
    ch: {
      name: "ch",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 20.1168,
      offset: 0
    },
    mil: {
      name: "mil",
      base: B.LENGTH,
      prefixes: _.NONE,
      value: 254e-7,
      offset: 0
    },
    // 1/1000 inch
    // Surface
    m2: {
      name: "m2",
      base: B.SURFACE,
      prefixes: _.SQUARED,
      value: 1,
      offset: 0
    },
    sqin: {
      name: "sqin",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 64516e-8,
      offset: 0
    },
    // 645.16 mm2
    sqft: {
      name: "sqft",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 0.09290304,
      offset: 0
    },
    // 0.09290304 m2
    sqyd: {
      name: "sqyd",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 0.83612736,
      offset: 0
    },
    // 0.83612736 m2
    sqmi: {
      name: "sqmi",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 2589988110336e-6,
      offset: 0
    },
    // 2.589988110336 km2
    sqrd: {
      name: "sqrd",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 25.29295,
      offset: 0
    },
    // 25.29295 m2
    sqch: {
      name: "sqch",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 404.6873,
      offset: 0
    },
    // 404.6873 m2
    sqmil: {
      name: "sqmil",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 64516e-14,
      offset: 0
    },
    // 6.4516 * 10^-10 m2
    acre: {
      name: "acre",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 4046.86,
      offset: 0
    },
    // 4046.86 m2
    hectare: {
      name: "hectare",
      base: B.SURFACE,
      prefixes: _.NONE,
      value: 1e4,
      offset: 0
    },
    // 10000 m2
    // Volume
    m3: {
      name: "m3",
      base: B.VOLUME,
      prefixes: _.CUBIC,
      value: 1,
      offset: 0
    },
    L: {
      name: "L",
      base: B.VOLUME,
      prefixes: _.SHORT,
      value: 1e-3,
      offset: 0
    },
    // litre
    l: {
      name: "l",
      base: B.VOLUME,
      prefixes: _.SHORT,
      value: 1e-3,
      offset: 0
    },
    // litre
    litre: {
      name: "litre",
      base: B.VOLUME,
      prefixes: _.LONG,
      value: 1e-3,
      offset: 0
    },
    cuin: {
      name: "cuin",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 16387064e-12,
      offset: 0
    },
    // 1.6387064e-5 m3
    cuft: {
      name: "cuft",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 0.028316846592,
      offset: 0
    },
    // 28.316 846 592 L
    cuyd: {
      name: "cuyd",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 0.764554857984,
      offset: 0
    },
    // 764.554 857 984 L
    teaspoon: {
      name: "teaspoon",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 5e-6,
      offset: 0
    },
    // 5 mL
    tablespoon: {
      name: "tablespoon",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 15e-6,
      offset: 0
    },
    // 15 mL
    // {name: 'cup', base: BASE_UNITS.VOLUME, prefixes: PREFIXES.NONE, value: 0.000240, offset: 0}, // 240 mL  // not possible, we have already another cup
    drop: {
      name: "drop",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 5e-8,
      offset: 0
    },
    // 0.05 mL = 5e-8 m3
    gtt: {
      name: "gtt",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 5e-8,
      offset: 0
    },
    // 0.05 mL = 5e-8 m3
    // Liquid volume
    minim: {
      name: "minim",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 61611519921875e-21,
      offset: 0
    },
    // 1/61440 gallons
    fluiddram: {
      name: "fluiddram",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 36966911953125e-19,
      offset: 0
    },
    // 1/1024 gallons
    fluidounce: {
      name: "fluidounce",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 295735295625e-16,
      offset: 0
    },
    // 1/128 gallons
    gill: {
      name: "gill",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 11829411825e-14,
      offset: 0
    },
    // 1/32 gallons
    cc: {
      name: "cc",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 1e-6,
      offset: 0
    },
    // 1e-6 L
    cup: {
      name: "cup",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 2365882365e-13,
      offset: 0
    },
    // 1/16 gallons
    pint: {
      name: "pint",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 473176473e-12,
      offset: 0
    },
    // 1/8 gallons
    quart: {
      name: "quart",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 946352946e-12,
      offset: 0
    },
    // 1/4 gallons
    gallon: {
      name: "gallon",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 0.003785411784,
      offset: 0
    },
    // 3.785411784 L
    beerbarrel: {
      name: "beerbarrel",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 0.117347765304,
      offset: 0
    },
    // 31 gallons
    oilbarrel: {
      name: "oilbarrel",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 0.158987294928,
      offset: 0
    },
    // 42 gallons
    hogshead: {
      name: "hogshead",
      base: B.VOLUME,
      prefixes: _.NONE,
      value: 0.238480942392,
      offset: 0
    },
    // 63 gallons
    // Mass
    g: {
      name: "g",
      base: B.MASS,
      prefixes: _.SHORT,
      value: 1e-3,
      offset: 0
    },
    gram: {
      name: "gram",
      base: B.MASS,
      prefixes: _.LONG,
      value: 1e-3,
      offset: 0
    },
    ton: {
      name: "ton",
      base: B.MASS,
      prefixes: _.SHORT,
      value: 907.18474,
      offset: 0
    },
    t: {
      name: "t",
      base: B.MASS,
      prefixes: _.SHORT,
      value: 1e3,
      offset: 0
    },
    tonne: {
      name: "tonne",
      base: B.MASS,
      prefixes: _.LONG,
      value: 1e3,
      offset: 0
    },
    grain: {
      name: "grain",
      base: B.MASS,
      prefixes: _.NONE,
      value: 6479891e-11,
      offset: 0
    },
    dram: {
      name: "dram",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.0017718451953125,
      offset: 0
    },
    ounce: {
      name: "ounce",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.028349523125,
      offset: 0
    },
    poundmass: {
      name: "poundmass",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.45359237,
      offset: 0
    },
    hundredweight: {
      name: "hundredweight",
      base: B.MASS,
      prefixes: _.NONE,
      value: 45.359237,
      offset: 0
    },
    stick: {
      name: "stick",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.115,
      offset: 0
    },
    stone: {
      name: "stone",
      base: B.MASS,
      prefixes: _.NONE,
      value: 6.35029318,
      offset: 0
    },
    gr: {
      name: "gr",
      base: B.MASS,
      prefixes: _.NONE,
      value: 6479891e-11,
      offset: 0
    },
    dr: {
      name: "dr",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.0017718451953125,
      offset: 0
    },
    oz: {
      name: "oz",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.028349523125,
      offset: 0
    },
    lbm: {
      name: "lbm",
      base: B.MASS,
      prefixes: _.NONE,
      value: 0.45359237,
      offset: 0
    },
    cwt: {
      name: "cwt",
      base: B.MASS,
      prefixes: _.NONE,
      value: 45.359237,
      offset: 0
    },
    // Time
    s: {
      name: "s",
      base: B.TIME,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    min: {
      name: "min",
      base: B.TIME,
      prefixes: _.NONE,
      value: 60,
      offset: 0
    },
    h: {
      name: "h",
      base: B.TIME,
      prefixes: _.NONE,
      value: 3600,
      offset: 0
    },
    second: {
      name: "second",
      base: B.TIME,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    sec: {
      name: "sec",
      base: B.TIME,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    minute: {
      name: "minute",
      base: B.TIME,
      prefixes: _.NONE,
      value: 60,
      offset: 0
    },
    hour: {
      name: "hour",
      base: B.TIME,
      prefixes: _.NONE,
      value: 3600,
      offset: 0
    },
    day: {
      name: "day",
      base: B.TIME,
      prefixes: _.NONE,
      value: 86400,
      offset: 0
    },
    week: {
      name: "week",
      base: B.TIME,
      prefixes: _.NONE,
      value: 7 * 86400,
      offset: 0
    },
    month: {
      name: "month",
      base: B.TIME,
      prefixes: _.NONE,
      value: 2629800,
      // 1/12th of Julian year
      offset: 0
    },
    year: {
      name: "year",
      base: B.TIME,
      prefixes: _.NONE,
      value: 31557600,
      // Julian year
      offset: 0
    },
    decade: {
      name: "decade",
      base: B.TIME,
      prefixes: _.NONE,
      value: 315576e3,
      // Julian decade
      offset: 0
    },
    century: {
      name: "century",
      base: B.TIME,
      prefixes: _.NONE,
      value: 315576e4,
      // Julian century
      offset: 0
    },
    millennium: {
      name: "millennium",
      base: B.TIME,
      prefixes: _.NONE,
      value: 315576e5,
      // Julian millennium
      offset: 0
    },
    // Frequency
    hertz: {
      name: "Hertz",
      base: B.FREQUENCY,
      prefixes: _.LONG,
      value: 1,
      offset: 0,
      reciprocal: !0
    },
    Hz: {
      name: "Hz",
      base: B.FREQUENCY,
      prefixes: _.SHORT,
      value: 1,
      offset: 0,
      reciprocal: !0
    },
    // Angle
    rad: {
      name: "rad",
      base: B.ANGLE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    radian: {
      name: "radian",
      base: B.ANGLE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    // deg = rad / (2*pi) * 360 = rad / 0.017453292519943295769236907684888
    deg: {
      name: "deg",
      base: B.ANGLE,
      prefixes: _.SHORT,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    degree: {
      name: "degree",
      base: B.ANGLE,
      prefixes: _.LONG,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // grad = rad / (2*pi) * 400  = rad / 0.015707963267948966192313216916399
    grad: {
      name: "grad",
      base: B.ANGLE,
      prefixes: _.SHORT,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    gradian: {
      name: "gradian",
      base: B.ANGLE,
      prefixes: _.LONG,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // cycle = rad / (2*pi) = rad / 6.2831853071795864769252867665793
    cycle: {
      name: "cycle",
      base: B.ANGLE,
      prefixes: _.NONE,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // arcsec = rad / (3600 * (360 / 2 * pi)) = rad / 0.0000048481368110953599358991410235795
    arcsec: {
      name: "arcsec",
      base: B.ANGLE,
      prefixes: _.NONE,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // arcmin = rad / (60 * (360 / 2 * pi)) = rad / 0.00029088820866572159615394846141477
    arcmin: {
      name: "arcmin",
      base: B.ANGLE,
      prefixes: _.NONE,
      value: null,
      // will be filled in by calculateAngleValues()
      offset: 0
    },
    // Electric current
    A: {
      name: "A",
      base: B.CURRENT,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    ampere: {
      name: "ampere",
      base: B.CURRENT,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    // Temperature
    // K(C) = °C + 273.15
    // K(F) = (°F + 459.67) * (5 / 9)
    // K(R) = °R * (5 / 9)
    K: {
      name: "K",
      base: B.TEMPERATURE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    degC: {
      name: "degC",
      base: B.TEMPERATURE,
      prefixes: _.SHORT,
      value: 1,
      offset: 273.15
    },
    degF: {
      name: "degF",
      base: B.TEMPERATURE,
      prefixes: _.SHORT,
      value: new x(5, 9),
      offset: 459.67
    },
    degR: {
      name: "degR",
      base: B.TEMPERATURE,
      prefixes: _.SHORT,
      value: new x(5, 9),
      offset: 0
    },
    kelvin: {
      name: "kelvin",
      base: B.TEMPERATURE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    celsius: {
      name: "celsius",
      base: B.TEMPERATURE,
      prefixes: _.LONG,
      value: 1,
      offset: 273.15
    },
    fahrenheit: {
      name: "fahrenheit",
      base: B.TEMPERATURE,
      prefixes: _.LONG,
      value: new x(5, 9),
      offset: 459.67
    },
    rankine: {
      name: "rankine",
      base: B.TEMPERATURE,
      prefixes: _.LONG,
      value: new x(5, 9),
      offset: 0
    },
    // amount of substance
    mol: {
      name: "mol",
      base: B.AMOUNT_OF_SUBSTANCE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    mole: {
      name: "mole",
      base: B.AMOUNT_OF_SUBSTANCE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    // luminous intensity
    cd: {
      name: "cd",
      base: B.LUMINOUS_INTENSITY,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    candela: {
      name: "candela",
      base: B.LUMINOUS_INTENSITY,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    // TODO: units STERADIAN
    // {name: 'sr', base: BASE_UNITS.STERADIAN, prefixes: PREFIXES.NONE, value: 1, offset: 0},
    // {name: 'steradian', base: BASE_UNITS.STERADIAN, prefixes: PREFIXES.NONE, value: 1, offset: 0},
    // Force
    N: {
      name: "N",
      base: B.FORCE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    newton: {
      name: "newton",
      base: B.FORCE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    dyn: {
      name: "dyn",
      base: B.FORCE,
      prefixes: _.SHORT,
      value: 1e-5,
      offset: 0
    },
    dyne: {
      name: "dyne",
      base: B.FORCE,
      prefixes: _.LONG,
      value: 1e-5,
      offset: 0
    },
    lbf: {
      name: "lbf",
      base: B.FORCE,
      prefixes: _.NONE,
      value: 4.4482216152605,
      offset: 0
    },
    poundforce: {
      name: "poundforce",
      base: B.FORCE,
      prefixes: _.NONE,
      value: 4.4482216152605,
      offset: 0
    },
    kip: {
      name: "kip",
      base: B.FORCE,
      prefixes: _.LONG,
      value: 4448.2216,
      offset: 0
    },
    kilogramforce: {
      name: "kilogramforce",
      base: B.FORCE,
      prefixes: _.NONE,
      value: 9.80665,
      offset: 0
    },
    // Energy
    J: {
      name: "J",
      base: B.ENERGY,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    joule: {
      name: "joule",
      base: B.ENERGY,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    erg: {
      name: "erg",
      base: B.ENERGY,
      prefixes: _.SHORTLONG,
      // Both kiloerg and kerg are acceptable
      value: 1e-7,
      offset: 0
    },
    Wh: {
      name: "Wh",
      base: B.ENERGY,
      prefixes: _.SHORT,
      value: 3600,
      offset: 0
    },
    BTU: {
      name: "BTU",
      base: B.ENERGY,
      prefixes: _.BTU,
      value: 1055.05585262,
      offset: 0
    },
    eV: {
      name: "eV",
      base: B.ENERGY,
      prefixes: _.SHORT,
      value: 1602176565e-28,
      offset: 0
    },
    electronvolt: {
      name: "electronvolt",
      base: B.ENERGY,
      prefixes: _.LONG,
      value: 1602176565e-28,
      offset: 0
    },
    // Power
    W: {
      name: "W",
      base: B.POWER,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    watt: {
      name: "watt",
      base: B.POWER,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    hp: {
      name: "hp",
      base: B.POWER,
      prefixes: _.NONE,
      value: 745.6998715386,
      offset: 0
    },
    // Electrical power units
    VAR: {
      name: "VAR",
      base: B.POWER,
      prefixes: _.SHORT,
      value: d.I,
      offset: 0
    },
    VA: {
      name: "VA",
      base: B.POWER,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Pressure
    Pa: {
      name: "Pa",
      base: B.PRESSURE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    psi: {
      name: "psi",
      base: B.PRESSURE,
      prefixes: _.NONE,
      value: 6894.75729276459,
      offset: 0
    },
    atm: {
      name: "atm",
      base: B.PRESSURE,
      prefixes: _.NONE,
      value: 101325,
      offset: 0
    },
    bar: {
      name: "bar",
      base: B.PRESSURE,
      prefixes: _.SHORTLONG,
      value: 1e5,
      offset: 0
    },
    torr: {
      name: "torr",
      base: B.PRESSURE,
      prefixes: _.NONE,
      value: 133.322,
      offset: 0
    },
    mmHg: {
      name: "mmHg",
      base: B.PRESSURE,
      prefixes: _.NONE,
      value: 133.322,
      offset: 0
    },
    mmH2O: {
      name: "mmH2O",
      base: B.PRESSURE,
      prefixes: _.NONE,
      value: 9.80665,
      offset: 0
    },
    cmH2O: {
      name: "cmH2O",
      base: B.PRESSURE,
      prefixes: _.NONE,
      value: 98.0665,
      offset: 0
    },
    // Electric charge
    coulomb: {
      name: "coulomb",
      base: B.ELECTRIC_CHARGE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    C: {
      name: "C",
      base: B.ELECTRIC_CHARGE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Electric capacitance
    farad: {
      name: "farad",
      base: B.ELECTRIC_CAPACITANCE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    F: {
      name: "F",
      base: B.ELECTRIC_CAPACITANCE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Electric potential
    volt: {
      name: "volt",
      base: B.ELECTRIC_POTENTIAL,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    V: {
      name: "V",
      base: B.ELECTRIC_POTENTIAL,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Electric resistance
    ohm: {
      name: "ohm",
      base: B.ELECTRIC_RESISTANCE,
      prefixes: _.SHORTLONG,
      // Both Mohm and megaohm are acceptable
      value: 1,
      offset: 0
    },
    /*
     * Unicode breaks in browsers if charset is not specified
    Ω: {
      name: 'Ω',
      base: BASE_UNITS.ELECTRIC_RESISTANCE,
      prefixes: PREFIXES.SHORT,
      value: 1,
      offset: 0
    },
    */
    // Electric inductance
    henry: {
      name: "henry",
      base: B.ELECTRIC_INDUCTANCE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    H: {
      name: "H",
      base: B.ELECTRIC_INDUCTANCE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Electric conductance
    siemens: {
      name: "siemens",
      base: B.ELECTRIC_CONDUCTANCE,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    S: {
      name: "S",
      base: B.ELECTRIC_CONDUCTANCE,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Magnetic flux
    weber: {
      name: "weber",
      base: B.MAGNETIC_FLUX,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    Wb: {
      name: "Wb",
      base: B.MAGNETIC_FLUX,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Magnetic flux density
    tesla: {
      name: "tesla",
      base: B.MAGNETIC_FLUX_DENSITY,
      prefixes: _.LONG,
      value: 1,
      offset: 0
    },
    T: {
      name: "T",
      base: B.MAGNETIC_FLUX_DENSITY,
      prefixes: _.SHORT,
      value: 1,
      offset: 0
    },
    // Binary
    b: {
      name: "b",
      base: B.BIT,
      prefixes: _.BINARY_SHORT,
      value: 1,
      offset: 0
    },
    bits: {
      name: "bits",
      base: B.BIT,
      prefixes: _.BINARY_LONG,
      value: 1,
      offset: 0
    },
    B: {
      name: "B",
      base: B.BIT,
      prefixes: _.BINARY_SHORT,
      value: 8,
      offset: 0
    },
    bytes: {
      name: "bytes",
      base: B.BIT,
      prefixes: _.BINARY_LONG,
      value: 8,
      offset: 0
    }
  }, J = {
    meters: "meter",
    inches: "inch",
    feet: "foot",
    yards: "yard",
    miles: "mile",
    links: "link",
    rods: "rod",
    chains: "chain",
    angstroms: "angstrom",
    lt: "l",
    litres: "litre",
    liter: "litre",
    liters: "litre",
    teaspoons: "teaspoon",
    tablespoons: "tablespoon",
    minims: "minim",
    fldr: "fluiddram",
    fluiddrams: "fluiddram",
    floz: "fluidounce",
    fluidounces: "fluidounce",
    gi: "gill",
    gills: "gill",
    cp: "cup",
    cups: "cup",
    pt: "pint",
    pints: "pint",
    qt: "quart",
    quarts: "quart",
    gal: "gallon",
    gallons: "gallon",
    bbl: "beerbarrel",
    beerbarrels: "beerbarrel",
    obl: "oilbarrel",
    oilbarrels: "oilbarrel",
    hogsheads: "hogshead",
    gtts: "gtt",
    grams: "gram",
    tons: "ton",
    tonnes: "tonne",
    grains: "grain",
    drams: "dram",
    ounces: "ounce",
    poundmasses: "poundmass",
    hundredweights: "hundredweight",
    sticks: "stick",
    lb: "lbm",
    lbs: "lbm",
    kips: "kip",
    kgf: "kilogramforce",
    acres: "acre",
    hectares: "hectare",
    sqfeet: "sqft",
    sqyard: "sqyd",
    sqmile: "sqmi",
    sqmiles: "sqmi",
    mmhg: "mmHg",
    mmh2o: "mmH2O",
    cmh2o: "cmH2O",
    seconds: "second",
    secs: "second",
    minutes: "minute",
    mins: "minute",
    hours: "hour",
    hr: "hour",
    hrs: "hour",
    days: "day",
    weeks: "week",
    months: "month",
    years: "year",
    decades: "decade",
    centuries: "century",
    millennia: "millennium",
    hertz: "hertz",
    radians: "radian",
    degrees: "degree",
    gradians: "gradian",
    cycles: "cycle",
    arcsecond: "arcsec",
    arcseconds: "arcsec",
    arcminute: "arcmin",
    arcminutes: "arcmin",
    BTUs: "BTU",
    watts: "watt",
    joules: "joule",
    amperes: "ampere",
    amps: "ampere",
    amp: "ampere",
    coulombs: "coulomb",
    volts: "volt",
    ohms: "ohm",
    farads: "farad",
    webers: "weber",
    teslas: "tesla",
    electronvolts: "electronvolt",
    moles: "mole",
    bit: "bits",
    byte: "bytes"
  };
  function le(P) {
    if (P.number === "BigNumber") {
      var H = fi(b);
      z.rad.value = new b(1), z.deg.value = H.div(180), z.grad.value = H.div(200), z.cycle.value = H.times(2), z.arcsec.value = H.div(648e3), z.arcmin.value = H.div(10800);
    } else
      z.rad.value = 1, z.deg.value = Math.PI / 180, z.grad.value = Math.PI / 200, z.cycle.value = Math.PI * 2, z.arcsec.value = Math.PI / 648e3, z.arcmin.value = Math.PI / 10800;
    z.radian.value = z.rad.value, z.degree.value = z.deg.value, z.gradian.value = z.grad.value;
  }
  le(t), r && r("config", function(P, H) {
    P.number !== H.number && le(P);
  });
  var K = {
    si: {
      // Base units
      NONE: {
        unit: Z,
        prefix: _.NONE[""]
      },
      LENGTH: {
        unit: z.m,
        prefix: _.SHORT[""]
      },
      MASS: {
        unit: z.g,
        prefix: _.SHORT.k
      },
      TIME: {
        unit: z.s,
        prefix: _.SHORT[""]
      },
      CURRENT: {
        unit: z.A,
        prefix: _.SHORT[""]
      },
      TEMPERATURE: {
        unit: z.K,
        prefix: _.SHORT[""]
      },
      LUMINOUS_INTENSITY: {
        unit: z.cd,
        prefix: _.SHORT[""]
      },
      AMOUNT_OF_SUBSTANCE: {
        unit: z.mol,
        prefix: _.SHORT[""]
      },
      ANGLE: {
        unit: z.rad,
        prefix: _.SHORT[""]
      },
      BIT: {
        unit: z.bits,
        prefix: _.SHORT[""]
      },
      // Derived units
      FORCE: {
        unit: z.N,
        prefix: _.SHORT[""]
      },
      ENERGY: {
        unit: z.J,
        prefix: _.SHORT[""]
      },
      POWER: {
        unit: z.W,
        prefix: _.SHORT[""]
      },
      PRESSURE: {
        unit: z.Pa,
        prefix: _.SHORT[""]
      },
      ELECTRIC_CHARGE: {
        unit: z.C,
        prefix: _.SHORT[""]
      },
      ELECTRIC_CAPACITANCE: {
        unit: z.F,
        prefix: _.SHORT[""]
      },
      ELECTRIC_POTENTIAL: {
        unit: z.V,
        prefix: _.SHORT[""]
      },
      ELECTRIC_RESISTANCE: {
        unit: z.ohm,
        prefix: _.SHORT[""]
      },
      ELECTRIC_INDUCTANCE: {
        unit: z.H,
        prefix: _.SHORT[""]
      },
      ELECTRIC_CONDUCTANCE: {
        unit: z.S,
        prefix: _.SHORT[""]
      },
      MAGNETIC_FLUX: {
        unit: z.Wb,
        prefix: _.SHORT[""]
      },
      MAGNETIC_FLUX_DENSITY: {
        unit: z.T,
        prefix: _.SHORT[""]
      },
      FREQUENCY: {
        unit: z.Hz,
        prefix: _.SHORT[""]
      }
    }
  };
  K.cgs = JSON.parse(JSON.stringify(K.si)), K.cgs.LENGTH = {
    unit: z.m,
    prefix: _.SHORT.c
  }, K.cgs.MASS = {
    unit: z.g,
    prefix: _.SHORT[""]
  }, K.cgs.FORCE = {
    unit: z.dyn,
    prefix: _.SHORT[""]
  }, K.cgs.ENERGY = {
    unit: z.erg,
    prefix: _.NONE[""]
  }, K.us = JSON.parse(JSON.stringify(K.si)), K.us.LENGTH = {
    unit: z.ft,
    prefix: _.NONE[""]
  }, K.us.MASS = {
    unit: z.lbm,
    prefix: _.NONE[""]
  }, K.us.TEMPERATURE = {
    unit: z.degF,
    prefix: _.NONE[""]
  }, K.us.FORCE = {
    unit: z.lbf,
    prefix: _.NONE[""]
  }, K.us.ENERGY = {
    unit: z.BTU,
    prefix: _.BTU[""]
  }, K.us.POWER = {
    unit: z.hp,
    prefix: _.NONE[""]
  }, K.us.PRESSURE = {
    unit: z.psi,
    prefix: _.NONE[""]
  }, K.auto = JSON.parse(JSON.stringify(K.si));
  var re = K.auto;
  h.setUnitSystem = function(P) {
    if (De(K, P))
      re = K[P];
    else
      throw new Error("Unit system " + P + " does not exist. Choices are: " + Object.keys(K).join(", "));
  }, h.getUnitSystem = function() {
    for (var P in K)
      if (De(K, P) && K[P] === re)
        return P;
  }, h.typeConverters = {
    BigNumber: function(H) {
      return H != null && H.isFraction ? new b(H.n).div(H.d).times(H.s) : new b(H + "");
    },
    Fraction: function(H) {
      return new x(H);
    },
    Complex: function(H) {
      return H;
    },
    number: function(H) {
      return H != null && H.isFraction ? p(H) : H;
    }
  }, h.prototype._numberConverter = function() {
    var P = h.typeConverters[this.valueType()];
    if (P)
      return P;
    throw new TypeError('Unsupported Unit value type "' + this.valueType() + '"');
  }, h._getNumberConverter = function(P) {
    if (!h.typeConverters[P])
      throw new TypeError('Unsupported type "' + P + '"');
    return h.typeConverters[P];
  };
  for (var ie in z)
    if (De(z, ie)) {
      var j = z[ie];
      j.dimensions = j.base.dimensions;
    }
  for (var te in J)
    if (De(J, te)) {
      var oe = z[J[te]], me = {};
      for (var be in oe)
        De(oe, be) && (me[be] = oe[be]);
      me.name = te, z[te] = me;
    }
  h.isValidAlpha = function(H) {
    return /^[a-zA-Z]$/.test(H);
  };
  function we(P) {
    for (var H = 0; H < P.length; H++) {
      if (g = P.charAt(H), H === 0 && !h.isValidAlpha(g))
        throw new Error('Invalid unit name (must begin with alpha character): "' + P + '"');
      if (H > 0 && !(h.isValidAlpha(g) || N(g)))
        throw new Error('Invalid unit name (only alphanumeric characters are allowed): "' + P + '"');
    }
  }
  return h.createUnit = function(P, H) {
    if (typeof P != "object")
      throw new TypeError("createUnit expects first parameter to be of type 'Object'");
    if (H && H.override) {
      for (var ee in P)
        if (De(P, ee) && h.deleteUnit(ee), P[ee].aliases)
          for (var k = 0; k < P[ee].aliases.length; k++)
            h.deleteUnit(P[ee].aliases[k]);
    }
    var V;
    for (var X in P)
      De(P, X) && (V = h.createUnitSingle(X, P[X]));
    return V;
  }, h.createUnitSingle = function(P, H) {
    if ((typeof H > "u" || H === null) && (H = {}), typeof P != "string")
      throw new TypeError("createUnitSingle expects first parameter to be of type 'string'");
    if (De(z, P))
      throw new Error('Cannot create unit "' + P + '": a unit with that name already exists');
    we(P);
    var ee = null, k = [], V = 0, X, fe, ce;
    if (H && H.type === "Unit")
      ee = H.clone();
    else if (typeof H == "string")
      H !== "" && (X = H);
    else if (typeof H == "object")
      X = H.definition, fe = H.prefixes, V = H.offset, ce = H.baseName, H.aliases && (k = H.aliases.valueOf());
    else
      throw new TypeError('Cannot create unit "' + P + '" from "' + H.toString() + '": expecting "string" or "Unit" or "Object"');
    if (k) {
      for (var R = 0; R < k.length; R++)
        if (De(z, k[R]))
          throw new Error('Cannot create alias "' + k[R] + '": a unit with that name already exists');
    }
    if (X && typeof X == "string" && !ee)
      try {
        ee = h.parse(X, {
          allowNoUnits: !0
        });
      } catch (M) {
        throw M.message = 'Could not create unit "' + P + '" from "' + X + '": ' + M.message, M;
      }
    else X && X.type === "Unit" && (ee = X.clone());
    k = k || [], V = V || 0, fe && fe.toUpperCase ? fe = _[fe.toUpperCase()] || _.NONE : fe = _.NONE;
    var U = {};
    if (ee) {
      U = {
        name: P,
        value: ee.value,
        dimensions: ee.dimensions.slice(0),
        prefixes: fe,
        offset: V
      };
      var ue = !1;
      for (var he in B)
        if (De(B, he)) {
          for (var de = !0, xe = 0; xe < L.length; xe++)
            if (Math.abs((U.dimensions[xe] || 0) - (B[he].dimensions[xe] || 0)) > 1e-12) {
              de = !1;
              break;
            }
          if (de) {
            ue = !0, U.base = B[he];
            break;
          }
        }
      if (!ue) {
        ce = ce || P + "_STUFF";
        var ge = {
          dimensions: ee.dimensions.slice(0)
        };
        ge.key = ce, B[ce] = ge, re[ce] = {
          unit: U,
          prefix: _.NONE[""]
        }, U.base = B[ce];
      }
    } else {
      if (ce = ce || P + "_STUFF", L.indexOf(ce) >= 0)
        throw new Error('Cannot create new base unit "' + P + '": a base unit with that name already exists (and cannot be overridden)');
      L.push(ce);
      for (var Y in B)
        De(B, Y) && (B[Y].dimensions[L.length - 1] = 0);
      for (var ne = {
        dimensions: []
      }, se = 0; se < L.length; se++)
        ne.dimensions[se] = 0;
      ne.dimensions[L.length - 1] = 1, ne.key = ce, B[ce] = ne, U = {
        name: P,
        value: 1,
        dimensions: B[ce].dimensions.slice(0),
        prefixes: fe,
        offset: V,
        base: B[ce]
      }, re[ce] = {
        unit: U,
        prefix: _.NONE[""]
      };
    }
    h.UNITS[P] = U;
    for (var Ue = 0; Ue < k.length; Ue++) {
      var Le = k[Ue], Ee = {};
      for (var je in U)
        De(U, je) && (Ee[je] = U[je]);
      Ee.name = Le, h.UNITS[Le] = Ee;
    }
    return delete $.cache, new h(null, P);
  }, h.deleteUnit = function(P) {
    delete h.UNITS[P], delete $.cache;
  }, h.PREFIXES = _, h.BASE_DIMENSIONS = L, h.BASE_UNITS = B, h.UNIT_SYSTEMS = K, h.UNITS = z, h;
}, {
  isClass: !0
}), ru = "unit", Zb = ["typed", "Unit"], Vb = /* @__PURE__ */ q(ru, Zb, (e) => {
  var {
    typed: r,
    Unit: t
  } = e;
  return r(ru, {
    Unit: function(a) {
      return a.clone();
    },
    string: function(a) {
      return t.isValuelessUnit(a) ? new t(null, a) : t.parse(a, {
        allowNoUnits: !0
      });
    },
    "number | BigNumber | Fraction | Complex, string | Unit": function(a, i) {
      return new t(a, i);
    },
    "number | BigNumber | Fraction": function(a) {
      return new t(a);
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), tu = "sparse", Wb = ["typed", "SparseMatrix"], Yb = /* @__PURE__ */ q(tu, Wb, (e) => {
  var {
    typed: r,
    SparseMatrix: t
  } = e;
  return r(tu, {
    "": function() {
      return new t([]);
    },
    string: function(a) {
      return new t([], a);
    },
    "Array | Matrix": function(a) {
      return new t(a);
    },
    "Array | Matrix, string": function(a, i) {
      return new t(a, i);
    }
  });
}), nu = "createUnit", Xb = ["typed", "Unit"], Jb = /* @__PURE__ */ q(nu, Xb, (e) => {
  var {
    typed: r,
    Unit: t
  } = e;
  return r(nu, {
    // General function signature. First parameter is an object where each property is the definition of a new unit. The object keys are the unit names and the values are the definitions. The values can be objects, strings, or Units. If a property is an empty object or an empty string, a new base unit is created. The second parameter is the options.
    "Object, Object": function(a, i) {
      return t.createUnit(a, i);
    },
    // Same as above but without the options.
    Object: function(a) {
      return t.createUnit(a, {});
    },
    // Shortcut method for creating one unit.
    "string, Unit | string | Object, Object": function(a, i, o) {
      var c = {};
      return c[a] = i, t.createUnit(c, o);
    },
    // Same as above but without the options.
    "string, Unit | string | Object": function(a, i) {
      var o = {};
      return o[a] = i, t.createUnit(o, {});
    },
    // Without a definition, creates a base unit.
    string: function(a) {
      var i = {};
      return i[a] = {}, t.createUnit(i, {});
    }
  });
}), au = "acos", Qb = ["typed", "config", "Complex"], Kb = /* @__PURE__ */ q(au, Qb, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n
  } = e;
  return r(au, {
    number: function(i) {
      return i >= -1 && i <= 1 || t.predictable ? Math.acos(i) : new n(i, 0).acos();
    },
    Complex: function(i) {
      return i.acos();
    },
    BigNumber: function(i) {
      return i.acos();
    }
  });
}), iu = "acosh", jb = ["typed", "config", "Complex"], ex = /* @__PURE__ */ q(iu, jb, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n
  } = e;
  return r(iu, {
    number: function(i) {
      return i >= 1 || t.predictable ? Af(i) : i <= -1 ? new n(Math.log(Math.sqrt(i * i - 1) - i), Math.PI) : new n(i, 0).acosh();
    },
    Complex: function(i) {
      return i.acosh();
    },
    BigNumber: function(i) {
      return i.acosh();
    }
  });
}), ou = "acot", rx = ["typed", "BigNumber"], tx = /* @__PURE__ */ q(ou, rx, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e;
  return r(ou, {
    number: Ef,
    Complex: function(a) {
      return a.acot();
    },
    BigNumber: function(a) {
      return new t(1).div(a).atan();
    }
  });
}), su = "acoth", nx = ["typed", "config", "Complex", "BigNumber"], ax = /* @__PURE__ */ q(su, nx, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n,
    BigNumber: a
  } = e;
  return r(su, {
    number: function(o) {
      return o >= 1 || o <= -1 || t.predictable ? Sf(o) : new n(o, 0).acoth();
    },
    Complex: function(o) {
      return o.acoth();
    },
    BigNumber: function(o) {
      return new a(1).div(o).atanh();
    }
  });
}), uu = "acsc", ix = ["typed", "config", "Complex", "BigNumber"], ox = /* @__PURE__ */ q(uu, ix, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n,
    BigNumber: a
  } = e;
  return r(uu, {
    number: function(o) {
      return o <= -1 || o >= 1 || t.predictable ? Cf(o) : new n(o, 0).acsc();
    },
    Complex: function(o) {
      return o.acsc();
    },
    BigNumber: function(o) {
      return new a(1).div(o).asin();
    }
  });
}), lu = "acsch", sx = ["typed", "BigNumber"], ux = /* @__PURE__ */ q(lu, sx, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e;
  return r(lu, {
    number: Mf,
    Complex: function(a) {
      return a.acsch();
    },
    BigNumber: function(a) {
      return new t(1).div(a).asinh();
    }
  });
}), cu = "asec", lx = ["typed", "config", "Complex", "BigNumber"], cx = /* @__PURE__ */ q(cu, lx, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n,
    BigNumber: a
  } = e;
  return r(cu, {
    number: function(o) {
      return o <= -1 || o >= 1 || t.predictable ? _f(o) : new n(o, 0).asec();
    },
    Complex: function(o) {
      return o.asec();
    },
    BigNumber: function(o) {
      return new a(1).div(o).acos();
    }
  });
}), fu = "asech", fx = ["typed", "config", "Complex", "BigNumber"], mx = /* @__PURE__ */ q(fu, fx, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n,
    BigNumber: a
  } = e;
  return r(fu, {
    number: function(o) {
      if (o <= 1 && o >= -1 || t.predictable) {
        var c = 1 / o;
        if (c > 0 || t.predictable)
          return Ff(o);
        var l = Math.sqrt(c * c - 1);
        return new n(Math.log(l - c), Math.PI);
      }
      return new n(o, 0).asech();
    },
    Complex: function(o) {
      return o.asech();
    },
    BigNumber: function(o) {
      return new a(1).div(o).acosh();
    }
  });
}), mu = "asin", vx = ["typed", "config", "Complex"], px = /* @__PURE__ */ q(mu, vx, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n
  } = e;
  return r(mu, {
    number: function(i) {
      return i >= -1 && i <= 1 || t.predictable ? Math.asin(i) : new n(i, 0).asin();
    },
    Complex: function(i) {
      return i.asin();
    },
    BigNumber: function(i) {
      return i.asin();
    }
  });
}), dx = "asinh", hx = ["typed"], gx = /* @__PURE__ */ q(dx, hx, (e) => {
  var {
    typed: r
  } = e;
  return r("asinh", {
    number: Tf,
    Complex: function(n) {
      return n.asinh();
    },
    BigNumber: function(n) {
      return n.asinh();
    }
  });
}), yx = "atan", bx = ["typed"], xx = /* @__PURE__ */ q(yx, bx, (e) => {
  var {
    typed: r
  } = e;
  return r("atan", {
    number: function(n) {
      return Math.atan(n);
    },
    Complex: function(n) {
      return n.atan();
    },
    BigNumber: function(n) {
      return n.atan();
    }
  });
}), vu = "atan2", wx = ["typed", "matrix", "equalScalar", "BigNumber", "DenseMatrix", "concat"], Dx = /* @__PURE__ */ q(vu, wx, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    BigNumber: a,
    DenseMatrix: i,
    concat: o
  } = e, c = Pr({
    typed: r,
    equalScalar: n
  }), l = yr({
    typed: r
  }), s = Zf({
    typed: r,
    equalScalar: n
  }), u = cr({
    typed: r,
    equalScalar: n
  }), f = ir({
    typed: r,
    DenseMatrix: i
  }), m = Qe({
    typed: r,
    matrix: t,
    concat: o
  });
  return r(vu, {
    "number, number": Math.atan2,
    // Complex numbers doesn't seem to have a reasonable implementation of
    // atan2(). Even Matlab removed the support, after they only calculated
    // the atan only on base of the real part of the numbers and ignored
    // the imaginary.
    "BigNumber, BigNumber": (v, p) => a.atan2(v, p)
  }, m({
    scalar: "number | BigNumber",
    SS: s,
    DS: l,
    SD: c,
    Ss: u,
    sS: f
  }));
}), pu = "atanh", Nx = ["typed", "config", "Complex"], Ax = /* @__PURE__ */ q(pu, Nx, (e) => {
  var {
    typed: r,
    config: t,
    Complex: n
  } = e;
  return r(pu, {
    number: function(i) {
      return i <= 1 && i >= -1 || t.predictable ? Bf(i) : new n(i, 0).atanh();
    },
    Complex: function(i) {
      return i.atanh();
    },
    BigNumber: function(i) {
      return i.atanh();
    }
  });
}), Gt = /* @__PURE__ */ q("trigUnit", ["typed"], (e) => {
  var {
    typed: r
  } = e;
  return {
    Unit: r.referToSelf((t) => (n) => {
      if (!n.hasBase(n.constructor.BASE_UNITS.ANGLE))
        throw new TypeError("Unit in function cot is no angle");
      return r.find(t, n.valueType())(n.value);
    })
  };
}), du = "cos", Ex = ["typed"], Sx = /* @__PURE__ */ q(du, Ex, (e) => {
  var {
    typed: r
  } = e, t = Gt({
    typed: r
  });
  return r(du, {
    number: Math.cos,
    "Complex | BigNumber": (n) => n.cos()
  }, t);
}), hu = "cosh", Cx = ["typed"], Mx = /* @__PURE__ */ q(hu, Cx, (e) => {
  var {
    typed: r
  } = e;
  return r(hu, {
    number: Sv,
    "Complex | BigNumber": (t) => t.cosh()
  });
}), gu = "cot", _x = ["typed", "BigNumber"], Fx = /* @__PURE__ */ q(gu, _x, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e, n = Gt({
    typed: r
  });
  return r(gu, {
    number: Of,
    Complex: (a) => a.cot(),
    BigNumber: (a) => new t(1).div(a.tan())
  }, n);
}), yu = "coth", Tx = ["typed", "BigNumber"], Bx = /* @__PURE__ */ q(yu, Tx, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e;
  return r(yu, {
    number: $f,
    Complex: (n) => n.coth(),
    BigNumber: (n) => new t(1).div(n.tanh())
  });
}), bu = "csc", Ox = ["typed", "BigNumber"], $x = /* @__PURE__ */ q(bu, Ox, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e, n = Gt({
    typed: r
  });
  return r(bu, {
    number: If,
    Complex: (a) => a.csc(),
    BigNumber: (a) => new t(1).div(a.sin())
  }, n);
}), xu = "csch", Ix = ["typed", "BigNumber"], qx = /* @__PURE__ */ q(xu, Ix, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e;
  return r(xu, {
    number: qf,
    Complex: (n) => n.csch(),
    BigNumber: (n) => new t(1).div(n.sinh())
  });
}), wu = "sec", Rx = ["typed", "BigNumber"], zx = /* @__PURE__ */ q(wu, Rx, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e, n = Gt({
    typed: r
  });
  return r(wu, {
    number: Rf,
    Complex: (a) => a.sec(),
    BigNumber: (a) => new t(1).div(a.cos())
  }, n);
}), Du = "sech", Px = ["typed", "BigNumber"], Ux = /* @__PURE__ */ q(Du, Px, (e) => {
  var {
    typed: r,
    BigNumber: t
  } = e;
  return r(Du, {
    number: zf,
    Complex: (n) => n.sech(),
    BigNumber: (n) => new t(1).div(n.cosh())
  });
}), Nu = "sin", Lx = ["typed"], kx = /* @__PURE__ */ q(Nu, Lx, (e) => {
  var {
    typed: r
  } = e, t = Gt({
    typed: r
  });
  return r(Nu, {
    number: Math.sin,
    "Complex | BigNumber": (n) => n.sin()
  }, t);
}), Au = "sinh", Hx = ["typed"], Gx = /* @__PURE__ */ q(Au, Hx, (e) => {
  var {
    typed: r
  } = e;
  return r(Au, {
    number: Pf,
    "Complex | BigNumber": (t) => t.sinh()
  });
}), Eu = "tan", Zx = ["typed"], Vx = /* @__PURE__ */ q(Eu, Zx, (e) => {
  var {
    typed: r
  } = e, t = Gt({
    typed: r
  });
  return r(Eu, {
    number: Math.tan,
    "Complex | BigNumber": (n) => n.tan()
  }, t);
}), Wx = "tanh", Yx = ["typed"], Xx = /* @__PURE__ */ q(Wx, Yx, (e) => {
  var {
    typed: r
  } = e;
  return r("tanh", {
    number: Mv,
    "Complex | BigNumber": (t) => t.tanh()
  });
}), Su = "setCartesian", Jx = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], Qx = /* @__PURE__ */ q(Su, Jx, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i,
    DenseMatrix: o
  } = e;
  return r(Su, {
    "Array | Matrix, Array | Matrix": function(l, s) {
      var u = [];
      if (n(t(l), new i(0)) !== 0 && n(t(s), new i(0)) !== 0) {
        var f = Ge(Array.isArray(l) ? l : l.toArray()).sort(a), m = Ge(Array.isArray(s) ? s : s.toArray()).sort(a);
        u = [];
        for (var v = 0; v < f.length; v++)
          for (var p = 0; p < m.length; p++)
            u.push([f[v], m[p]]);
      }
      return Array.isArray(l) && Array.isArray(s) ? u : new o(u);
    }
  });
}), Cu = "setDifference", Kx = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], jx = /* @__PURE__ */ q(Cu, Kx, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i,
    DenseMatrix: o
  } = e;
  return r(Cu, {
    "Array | Matrix, Array | Matrix": function(l, s) {
      var u;
      if (n(t(l), new i(0)) === 0)
        u = [];
      else {
        if (n(t(s), new i(0)) === 0)
          return Ge(l.toArray());
        var f = qt(Ge(Array.isArray(l) ? l : l.toArray()).sort(a)), m = qt(Ge(Array.isArray(s) ? s : s.toArray()).sort(a));
        u = [];
        for (var v, p = 0; p < f.length; p++) {
          v = !1;
          for (var d = 0; d < m.length; d++)
            if (a(f[p].value, m[d].value) === 0 && f[p].identifier === m[d].identifier) {
              v = !0;
              break;
            }
          v || u.push(f[p]);
        }
      }
      return Array.isArray(l) && Array.isArray(s) ? Hn(u) : new o(Hn(u));
    }
  });
}), Mu = "setDistinct", ew = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], rw = /* @__PURE__ */ q(Mu, ew, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i,
    DenseMatrix: o
  } = e;
  return r(Mu, {
    "Array | Matrix": function(l) {
      var s;
      if (n(t(l), new i(0)) === 0)
        s = [];
      else {
        var u = Ge(Array.isArray(l) ? l : l.toArray()).sort(a);
        s = [], s.push(u[0]);
        for (var f = 1; f < u.length; f++)
          a(u[f], u[f - 1]) !== 0 && s.push(u[f]);
      }
      return Array.isArray(l) ? s : new o(s);
    }
  });
}), _u = "setIntersect", tw = ["typed", "size", "subset", "compareNatural", "Index", "DenseMatrix"], nw = /* @__PURE__ */ q(_u, tw, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i,
    DenseMatrix: o
  } = e;
  return r(_u, {
    "Array | Matrix, Array | Matrix": function(l, s) {
      var u;
      if (n(t(l), new i(0)) === 0 || n(t(s), new i(0)) === 0)
        u = [];
      else {
        var f = qt(Ge(Array.isArray(l) ? l : l.toArray()).sort(a)), m = qt(Ge(Array.isArray(s) ? s : s.toArray()).sort(a));
        u = [];
        for (var v = 0; v < f.length; v++)
          for (var p = 0; p < m.length; p++)
            if (a(f[v].value, m[p].value) === 0 && f[v].identifier === m[p].identifier) {
              u.push(f[v]);
              break;
            }
      }
      return Array.isArray(l) && Array.isArray(s) ? Hn(u) : new o(Hn(u));
    }
  });
}), Fu = "setIsSubset", aw = ["typed", "size", "subset", "compareNatural", "Index"], iw = /* @__PURE__ */ q(Fu, aw, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i
  } = e;
  return r(Fu, {
    "Array | Matrix, Array | Matrix": function(c, l) {
      if (n(t(c), new i(0)) === 0)
        return !0;
      if (n(t(l), new i(0)) === 0)
        return !1;
      for (var s = qt(Ge(Array.isArray(c) ? c : c.toArray()).sort(a)), u = qt(Ge(Array.isArray(l) ? l : l.toArray()).sort(a)), f, m = 0; m < s.length; m++) {
        f = !1;
        for (var v = 0; v < u.length; v++)
          if (a(s[m].value, u[v].value) === 0 && s[m].identifier === u[v].identifier) {
            f = !0;
            break;
          }
        if (f === !1)
          return !1;
      }
      return !0;
    }
  });
}), Tu = "setMultiplicity", ow = ["typed", "size", "subset", "compareNatural", "Index"], sw = /* @__PURE__ */ q(Tu, ow, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i
  } = e;
  return r(Tu, {
    "number | BigNumber | Fraction | Complex, Array | Matrix": function(c, l) {
      if (n(t(l), new i(0)) === 0)
        return 0;
      for (var s = Ge(Array.isArray(l) ? l : l.toArray()), u = 0, f = 0; f < s.length; f++)
        a(s[f], c) === 0 && u++;
      return u;
    }
  });
}), Bu = "setPowerset", uw = ["typed", "size", "subset", "compareNatural", "Index"], lw = /* @__PURE__ */ q(Bu, uw, (e) => {
  var {
    typed: r,
    size: t,
    subset: n,
    compareNatural: a,
    Index: i
  } = e;
  return r(Bu, {
    "Array | Matrix": function(s) {
      if (n(t(s), new i(0)) === 0)
        return [];
      for (var u = Ge(Array.isArray(s) ? s : s.toArray()).sort(a), f = [], m = 0; m.toString(2).length <= u.length; )
        f.push(o(u, m.toString(2).split("").reverse())), m++;
      return c(f);
    }
  });
  function o(l, s) {
    for (var u = [], f = 0; f < s.length; f++)
      s[f] === "1" && u.push(l[f]);
    return u;
  }
  function c(l) {
    for (var s = [], u = l.length - 1; u > 0; u--)
      for (var f = 0; f < u; f++)
        l[f].length > l[f + 1].length && (s = l[f], l[f] = l[f + 1], l[f + 1] = s);
    return l;
  }
}), Ou = "setSize", cw = ["typed", "compareNatural"], fw = /* @__PURE__ */ q(Ou, cw, (e) => {
  var {
    typed: r,
    compareNatural: t
  } = e;
  return r(Ou, {
    "Array | Matrix": function(a) {
      return Array.isArray(a) ? Ge(a).length : Ge(a.toArray()).length;
    },
    "Array | Matrix, boolean": function(a, i) {
      if (i === !1 || a.length === 0)
        return Array.isArray(a) ? Ge(a).length : Ge(a.toArray()).length;
      for (var o = Ge(Array.isArray(a) ? a : a.toArray()).sort(t), c = 1, l = 1; l < o.length; l++)
        t(o[l], o[l - 1]) !== 0 && c++;
      return c;
    }
  });
}), $u = "setSymDifference", mw = ["typed", "size", "concat", "subset", "setDifference", "Index"], vw = /* @__PURE__ */ q($u, mw, (e) => {
  var {
    typed: r,
    size: t,
    concat: n,
    subset: a,
    setDifference: i,
    Index: o
  } = e;
  return r($u, {
    "Array | Matrix, Array | Matrix": function(l, s) {
      if (a(t(l), new o(0)) === 0)
        return Ge(s);
      if (a(t(s), new o(0)) === 0)
        return Ge(l);
      var u = Ge(l), f = Ge(s);
      return n(i(u, f), i(f, u));
    }
  });
}), Iu = "setUnion", pw = ["typed", "size", "concat", "subset", "setIntersect", "setSymDifference", "Index"], dw = /* @__PURE__ */ q(Iu, pw, (e) => {
  var {
    typed: r,
    size: t,
    concat: n,
    subset: a,
    setIntersect: i,
    setSymDifference: o,
    Index: c
  } = e;
  return r(Iu, {
    "Array | Matrix, Array | Matrix": function(s, u) {
      if (a(t(s), new c(0)) === 0)
        return Ge(u);
      if (a(t(u), new c(0)) === 0)
        return Ge(s);
      var f = Ge(s), m = Ge(u);
      return n(o(f, m), i(f, m));
    }
  });
}), qu = "add", hw = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"], gw = /* @__PURE__ */ q(qu, hw, (e) => {
  var {
    typed: r,
    matrix: t,
    addScalar: n,
    equalScalar: a,
    DenseMatrix: i,
    SparseMatrix: o,
    concat: c
  } = e, l = lt({
    typed: r
  }), s = oi({
    typed: r,
    equalScalar: a
  }), u = yt({
    typed: r,
    DenseMatrix: i
  }), f = Qe({
    typed: r,
    matrix: t,
    concat: c
  });
  return r(qu, {
    "any, any": n,
    "any, any, ...any": r.referToSelf((m) => (v, p, d) => {
      for (var b = m(v, p), x = 0; x < d.length; x++)
        b = m(b, d[x]);
      return b;
    })
  }, f({
    elop: n,
    DS: l,
    SS: s,
    Ss: u
  }));
}), Ru = "hypot", yw = ["typed", "abs", "addScalar", "divideScalar", "multiplyScalar", "sqrt", "smaller", "isPositive"], bw = /* @__PURE__ */ q(Ru, yw, (e) => {
  var {
    typed: r,
    abs: t,
    addScalar: n,
    divideScalar: a,
    multiplyScalar: i,
    sqrt: o,
    smaller: c,
    isPositive: l
  } = e;
  return r(Ru, {
    "... number | BigNumber": s,
    Array: s,
    Matrix: (u) => s(Ge(u.toArray()))
  });
  function s(u) {
    for (var f = 0, m = 0, v = 0; v < u.length; v++) {
      if (Ir(u[v]))
        throw new TypeError("Unexpected type of argument to hypot");
      var p = t(u[v]);
      c(m, p) ? (f = i(f, i(a(m, p), a(m, p))), f = n(f, 1), m = p) : f = n(f, l(p) ? i(a(p, m), a(p, m)) : p);
    }
    return i(m, o(f));
  }
}), zu = "norm", xw = ["typed", "abs", "add", "pow", "conj", "sqrt", "multiply", "equalScalar", "larger", "smaller", "matrix", "ctranspose", "eigs"], ww = /* @__PURE__ */ q(zu, xw, (e) => {
  var {
    typed: r,
    abs: t,
    add: n,
    pow: a,
    conj: i,
    sqrt: o,
    multiply: c,
    equalScalar: l,
    larger: s,
    smaller: u,
    matrix: f,
    ctranspose: m,
    eigs: v
  } = e;
  return r(zu, {
    number: Math.abs,
    Complex: function(E) {
      return E.abs();
    },
    BigNumber: function(E) {
      return E.abs();
    },
    boolean: function(E) {
      return Math.abs(E);
    },
    Array: function(E) {
      return g(f(E), 2);
    },
    Matrix: function(E) {
      return g(E, 2);
    },
    "Array, number | BigNumber | string": function(E, N) {
      return g(f(E), N);
    },
    "Matrix, number | BigNumber | string": function(E, N) {
      return g(E, N);
    }
  });
  function p(A) {
    var E = 0;
    return A.forEach(function(N) {
      var S = t(N);
      s(S, E) && (E = S);
    }, !0), E;
  }
  function d(A) {
    var E;
    return A.forEach(function(N) {
      var S = t(N);
      (!E || u(S, E)) && (E = S);
    }, !0), E || 0;
  }
  function b(A, E) {
    if (E === Number.POSITIVE_INFINITY || E === "inf")
      return p(A);
    if (E === Number.NEGATIVE_INFINITY || E === "-inf")
      return d(A);
    if (E === "fro")
      return g(A, 2);
    if (typeof E == "number" && !isNaN(E)) {
      if (!l(E, 0)) {
        var N = 0;
        return A.forEach(function(S) {
          N = n(a(t(S), E), N);
        }, !0), a(N, 1 / E);
      }
      return Number.POSITIVE_INFINITY;
    }
    throw new Error("Unsupported parameter value");
  }
  function x(A) {
    var E = 0;
    return A.forEach(function(N, S) {
      E = n(E, c(N, i(N)));
    }), t(o(E));
  }
  function D(A) {
    var E = [], N = 0;
    return A.forEach(function(S, C) {
      var T = C[1], O = n(E[T] || 0, t(S));
      s(O, N) && (N = O), E[T] = O;
    }, !0), N;
  }
  function h(A) {
    var E = A.size();
    if (E[0] !== E[1])
      throw new RangeError("Invalid matrix dimensions");
    var N = m(A), S = c(N, A), C = v(S).values.toArray(), T = C[C.length - 1];
    return t(o(T));
  }
  function w(A) {
    var E = [], N = 0;
    return A.forEach(function(S, C) {
      var T = C[0], O = n(E[T] || 0, t(S));
      s(O, N) && (N = O), E[T] = O;
    }, !0), N;
  }
  function y(A, E) {
    if (E === 1)
      return D(A);
    if (E === Number.POSITIVE_INFINITY || E === "inf")
      return w(A);
    if (E === "fro")
      return x(A);
    if (E === 2)
      return h(A);
    throw new Error("Unsupported parameter value " + E);
  }
  function g(A, E) {
    var N = A.size();
    if (N.length === 1)
      return b(A, E);
    if (N.length === 2) {
      if (N[0] && N[1])
        return y(A, E);
      throw new RangeError("Invalid matrix dimensions");
    }
  }
}), Pu = "dot", Dw = ["typed", "addScalar", "multiplyScalar", "conj", "size"], Nw = /* @__PURE__ */ q(Pu, Dw, (e) => {
  var {
    typed: r,
    addScalar: t,
    multiplyScalar: n,
    conj: a,
    size: i
  } = e;
  return r(Pu, {
    "Array | DenseMatrix, Array | DenseMatrix": c,
    "SparseMatrix, SparseMatrix": l
  });
  function o(u, f) {
    var m = s(u), v = s(f), p, d;
    if (m.length === 1)
      p = m[0];
    else if (m.length === 2 && m[1] === 1)
      p = m[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + m.join(", ") + ")");
    if (v.length === 1)
      d = v[0];
    else if (v.length === 2 && v[1] === 1)
      d = v[0];
    else
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + v.join(", ") + ")");
    if (p !== d) throw new RangeError("Vectors must have equal length (" + p + " != " + d + ")");
    if (p === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return p;
  }
  function c(u, f) {
    var m = o(u, f), v = Ce(u) ? u._data : u, p = Ce(u) ? u._datatype || u.getDataType() : void 0, d = Ce(f) ? f._data : f, b = Ce(f) ? f._datatype || f.getDataType() : void 0, x = s(u).length === 2, D = s(f).length === 2, h = t, w = n;
    if (p && b && p === b && typeof p == "string" && p !== "mixed") {
      var y = p;
      h = r.find(t, [y, y]), w = r.find(n, [y, y]);
    }
    if (!x && !D) {
      for (var g = w(a(v[0]), d[0]), A = 1; A < m; A++)
        g = h(g, w(a(v[A]), d[A]));
      return g;
    }
    if (!x && D) {
      for (var E = w(a(v[0]), d[0][0]), N = 1; N < m; N++)
        E = h(E, w(a(v[N]), d[N][0]));
      return E;
    }
    if (x && !D) {
      for (var S = w(a(v[0][0]), d[0]), C = 1; C < m; C++)
        S = h(S, w(a(v[C][0]), d[C]));
      return S;
    }
    if (x && D) {
      for (var T = w(a(v[0][0]), d[0][0]), O = 1; O < m; O++)
        T = h(T, w(a(v[O][0]), d[O][0]));
      return T;
    }
  }
  function l(u, f) {
    o(u, f);
    for (var m = u._index, v = u._values, p = f._index, d = f._values, b = 0, x = t, D = n, h = 0, w = 0; h < m.length && w < p.length; ) {
      var y = m[h], g = p[w];
      if (y < g) {
        h++;
        continue;
      }
      if (y > g) {
        w++;
        continue;
      }
      y === g && (b = x(b, D(v[h], d[w])), h++, w++);
    }
    return b;
  }
  function s(u) {
    return Ce(u) ? u.size() : i(u);
  }
}), Aw = "trace", Ew = ["typed", "matrix", "add"], Sw = /* @__PURE__ */ q(Aw, Ew, (e) => {
  var {
    typed: r,
    matrix: t,
    add: n
  } = e;
  return r("trace", {
    Array: function(c) {
      return a(t(c));
    },
    SparseMatrix: i,
    DenseMatrix: a,
    any: Me
  });
  function a(o) {
    var c = o._size, l = o._data;
    switch (c.length) {
      case 1:
        if (c[0] === 1)
          return Me(l[0]);
        throw new RangeError("Matrix must be square (size: " + Pe(c) + ")");
      case 2: {
        var s = c[0], u = c[1];
        if (s === u) {
          for (var f = 0, m = 0; m < s; m++)
            f = n(f, l[m][m]);
          return f;
        } else
          throw new RangeError("Matrix must be square (size: " + Pe(c) + ")");
      }
      default:
        throw new RangeError("Matrix must be two dimensional (size: " + Pe(c) + ")");
    }
  }
  function i(o) {
    var c = o._values, l = o._index, s = o._ptr, u = o._size, f = u[0], m = u[1];
    if (f === m) {
      var v = 0;
      if (c.length > 0)
        for (var p = 0; p < m; p++)
          for (var d = s[p], b = s[p + 1], x = d; x < b; x++) {
            var D = l[x];
            if (D === p) {
              v = n(v, c[x]);
              break;
            }
            if (D > p)
              break;
          }
      return v;
    }
    throw new RangeError("Matrix must be square (size: " + Pe(u) + ")");
  }
}), Uu = "index", Cw = ["typed", "Index"], Mw = /* @__PURE__ */ q(Uu, Cw, (e) => {
  var {
    typed: r,
    Index: t
  } = e;
  return r(Uu, {
    "...number | string | BigNumber | Range | Array | Matrix": function(a) {
      var i = a.map(function(c) {
        return Be(c) ? c.toNumber() : Ze(c) || Ce(c) ? c.map(function(l) {
          return Be(l) ? l.toNumber() : l;
        }) : c;
      }), o = new t();
      return t.apply(o, i), o;
    }
  });
}), fm = /* @__PURE__ */ new Set(["end"]), _w = "Node", Fw = ["mathWithTransform"], Tw = /* @__PURE__ */ q(_w, Fw, (e) => {
  var {
    mathWithTransform: r
  } = e;
  function t(a) {
    for (var i of [...fm])
      if (a.has(i))
        throw new Error('Scope contains an illegal symbol, "' + i + '" is a reserved keyword');
  }
  class n {
    get type() {
      return "Node";
    }
    get isNode() {
      return !0;
    }
    /**
     * Evaluate the node
     * @param {Object} [scope]  Scope to read/write variables
     * @return {*}              Returns the result
     */
    evaluate(i) {
      return this.compile().evaluate(i);
    }
    /**
     * Compile the node into an optimized, evauatable JavaScript function
     * @return {{evaluate: function([Object])}} object
     *                Returns an object with a function 'evaluate',
     *                which can be invoked as expr.evaluate([scope: Object]),
     *                where scope is an optional object with
     *                variables.
     */
    compile() {
      var i = this._compile(r, {}), o = {}, c = null;
      function l(s) {
        var u = _t(s);
        return t(u), i(u, o, c);
      }
      return {
        evaluate: l
      };
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(i, o) {
      throw new Error("Method _compile must be implemented by type " + this.type);
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(i) {
      throw new Error("Cannot run forEach on a Node interface");
    }
    /**
     * Create a new Node whose children are the results of calling the
     * provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {OperatorNode} Returns a transformed copy of the node
     */
    map(i) {
      throw new Error("Cannot run map on a Node interface");
    }
    /**
     * Validate whether an object is a Node, for use with map
     * @param {Node} node
     * @returns {Node} Returns the input if it's a node, else throws an Error
     * @protected
     */
    _ifNode(i) {
      if (!Ve(i))
        throw new TypeError("Callback function must return a Node");
      return i;
    }
    /**
     * Recursively traverse all nodes in a node tree. Executes given callback for
     * this node and each of its child nodes.
     * @param {function(node: Node, path: string, parent: Node)} callback
     *          A callback called for every node in the node tree.
     */
    traverse(i) {
      i(this, null, null);
      function o(c, l) {
        c.forEach(function(s, u, f) {
          l(s, u, f), o(s, l);
        });
      }
      o(this, i);
    }
    /**
     * Recursively transform a node tree via a transform function.
     *
     * For example, to replace all nodes of type SymbolNode having name 'x' with
     * a ConstantNode with value 2:
     *
     *     const res = Node.transform(function (node, path, parent) {
     *       if (node && node.isSymbolNode) && (node.name === 'x')) {
     *         return new ConstantNode(2)
     *       }
     *       else {
     *         return node
     *       }
     *     })
     *
     * @param {function(node: Node, path: string, parent: Node) : Node} callback
     *          A mapping function accepting a node, and returning
     *          a replacement for the node or the original node. The "signature"
     *          of the callback must be:
     *          callback(node: Node, index: string, parent: Node) : Node
     * @return {Node} Returns the original node or its replacement
     */
    transform(i) {
      function o(c, l, s) {
        var u = i(c, l, s);
        return u !== c ? u : c.map(o);
      }
      return o(this, null, null);
    }
    /**
     * Find any node in the node tree matching given filter function. For
     * example, to find all nodes of type SymbolNode having name 'x':
     *
     *     const results = Node.filter(function (node) {
     *       return (node && node.isSymbolNode) && (node.name === 'x')
     *     })
     *
     * @param {function(node: Node, path: string, parent: Node) : Node} callback
     *            A test function returning true when a node matches, and false
     *            otherwise. Function signature:
     *            callback(node: Node, index: string, parent: Node) : boolean
     * @return {Node[]} nodes
     *            An array with nodes matching given filter criteria
     */
    filter(i) {
      var o = [];
      return this.traverse(function(c, l, s) {
        i(c, l, s) && o.push(c);
      }), o;
    }
    /**
     * Create a shallow clone of this node
     * @return {Node}
     */
    clone() {
      throw new Error("Cannot clone a Node interface");
    }
    /**
     * Create a deep clone of this node
     * @return {Node}
     */
    cloneDeep() {
      return this.map(function(i) {
        return i.cloneDeep();
      });
    }
    /**
     * Deep compare this node with another node.
     * @param {Node} other
     * @return {boolean} Returns true when both nodes are of the same type and
     *                   contain the same values (as do their childs)
     */
    equals(i) {
      return i ? this.type === i.type && Xr(this, i) : !1;
    }
    /**
     * Get string representation. (wrapper function)
     *
     * This function can get an object of the following form:
     * {
     *    handler: //This can be a callback function of the form
     *             // "function callback(node, options)"or
     *             // a map that maps function names (used in FunctionNodes)
     *             // to callbacks
     *    parenthesis: "keep" //the parenthesis option (This is optional)
     * }
     *
     * @param {Object} [options]
     * @return {string}
     */
    toString(i) {
      var o = this._getCustomString(i);
      return typeof o < "u" ? o : this._toString(i);
    }
    /**
     * Internal function to generate the string output.
     * This has to be implemented by every Node
     *
     * @throws {Error}
     */
    _toString() {
      throw new Error("_toString not implemented for " + this.type);
    }
    /**
     * Get a JSON representation of the node
     * Both .toJSON() and the static .fromJSON(json) should be implemented by all
     * implementations of Node
     * @returns {Object}
     */
    toJSON() {
      throw new Error("Cannot serialize object: toJSON not implemented by " + this.type);
    }
    /**
     * Get HTML representation. (wrapper function)
     *
     * This function can get an object of the following form:
     * {
     *    handler: //This can be a callback function of the form
     *             // "function callback(node, options)" or
     *             // a map that maps function names (used in FunctionNodes)
     *             // to callbacks
     *    parenthesis: "keep" //the parenthesis option (This is optional)
     * }
     *
     * @param {Object} [options]
     * @return {string}
     */
    toHTML(i) {
      var o = this._getCustomString(i);
      return typeof o < "u" ? o : this._toHTML(i);
    }
    /**
     * Internal function to generate the HTML output.
     * This has to be implemented by every Node
     *
     * @throws {Error}
     */
    _toHTML() {
      throw new Error("_toHTML not implemented for " + this.type);
    }
    /**
     * Get LaTeX representation. (wrapper function)
     *
     * This function can get an object of the following form:
     * {
     *    handler: //This can be a callback function of the form
     *             // "function callback(node, options)"or
     *             // a map that maps function names (used in FunctionNodes)
     *             // to callbacks
     *    parenthesis: "keep" //the parenthesis option (This is optional)
     * }
     *
     * @param {Object} [options]
     * @return {string}
     */
    toTex(i) {
      var o = this._getCustomString(i);
      return typeof o < "u" ? o : this._toTex(i);
    }
    /**
     * Internal function to generate the LaTeX output.
     * This has to be implemented by every Node
     *
     * @param {Object} [options]
     * @throws {Error}
     */
    _toTex(i) {
      throw new Error("_toTex not implemented for " + this.type);
    }
    /**
     * Helper used by `to...` functions.
     */
    _getCustomString(i) {
      if (i && typeof i == "object")
        switch (typeof i.handler) {
          case "object":
          case "undefined":
            return;
          case "function":
            return i.handler(this, i);
          default:
            throw new TypeError("Object or function expected as callback");
        }
    }
    /**
     * Get identifier.
     * @return {string}
     */
    getIdentifier() {
      return this.type;
    }
    /**
     * Get the content of the current Node.
     * @return {Node} node
     **/
    getContent() {
      return this;
    }
  }
  return n;
}, {
  isClass: !0,
  isNode: !0
});
function br(e) {
  return e && e.isIndexError ? new Br(e.index + 1, e.min + 1, e.max !== void 0 ? e.max + 1 : void 0) : e;
}
function mm(e) {
  var {
    subset: r
  } = e;
  return function(n, a) {
    try {
      if (Array.isArray(n))
        return r(n, a);
      if (n && typeof n.subset == "function")
        return n.subset(a);
      if (typeof n == "string")
        return r(n, a);
      if (typeof n == "object") {
        if (!a.isObjectProperty())
          throw new TypeError("Cannot apply a numeric index as object property");
        return hr(n, a.getObjectProperty());
      } else
        throw new TypeError("Cannot apply index: unsupported type of object");
    } catch (i) {
      throw br(i);
    }
  };
}
var hn = "AccessorNode", Bw = ["subset", "Node"], Ow = /* @__PURE__ */ q(hn, Bw, (e) => {
  var {
    subset: r,
    Node: t
  } = e, n = mm({
    subset: r
  });
  function a(o) {
    return !(at(o) || Sr(o) || ke(o) || Yr(o) || sn(o) || Ur(o) || nr(o));
  }
  class i extends t {
    /**
     * @constructor AccessorNode
     * @extends {Node}
     * Access an object property or get a matrix subset
     *
     * @param {Node} object                 The object from which to retrieve
     *                                      a property or subset.
     * @param {IndexNode} index             IndexNode containing ranges
     */
    constructor(c, l) {
      if (super(), !Ve(c))
        throw new TypeError('Node expected for parameter "object"');
      if (!gt(l))
        throw new TypeError('IndexNode expected for parameter "index"');
      this.object = c, this.index = l;
    }
    // readonly property name
    get name() {
      return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
    }
    get type() {
      return hn;
    }
    get isAccessorNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(c, l) {
      var s = this.object._compile(c, l), u = this.index._compile(c, l);
      if (this.index.isObjectProperty()) {
        var f = this.index.getObjectProperty();
        return function(v, p, d) {
          return hr(s(v, p, d), f);
        };
      } else
        return function(v, p, d) {
          var b = s(v, p, d), x = u(v, p, b);
          return n(b, x);
        };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(c) {
      c(this.object, "object", this), c(this.index, "index", this);
    }
    /**
     * Create a new AccessorNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {AccessorNode} Returns a transformed copy of the node
     */
    map(c) {
      return new i(this._ifNode(c(this.object, "object", this)), this._ifNode(c(this.index, "index", this)));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {AccessorNode}
     */
    clone() {
      return new i(this.object, this.index);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string}
     */
    _toString(c) {
      var l = this.object.toString(c);
      return a(this.object) && (l = "(" + l + ")"), l + this.index.toString(c);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string}
     */
    _toHTML(c) {
      var l = this.object.toHTML(c);
      return a(this.object) && (l = '<span class="math-parenthesis math-round-parenthesis">(</span>' + l + '<span class="math-parenthesis math-round-parenthesis">)</span>'), l + this.index.toHTML(c);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string}
     */
    _toTex(c) {
      var l = this.object.toTex(c);
      return a(this.object) && (l = "\\left(' + object + '\\right)"), l + this.index.toTex(c);
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: hn,
        object: this.object,
        index: this.index
      };
    }
    /**
     * Instantiate an AccessorNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "AccessorNode", object: ..., index: ...}`,
     *     where mathjs is optional
     * @returns {AccessorNode}
     */
    static fromJSON(c) {
      return new i(c.object, c.index);
    }
  }
  return ar(i, "name", hn), i;
}, {
  isClass: !0,
  isNode: !0
}), gn = "ArrayNode", $w = ["Node"], Iw = /* @__PURE__ */ q(gn, $w, (e) => {
  var {
    Node: r
  } = e;
  class t extends r {
    /**
     * @constructor ArrayNode
     * @extends {Node}
     * Holds an 1-dimensional array with items
     * @param {Node[]} [items]   1 dimensional array with items
     */
    constructor(a) {
      if (super(), this.items = a || [], !Array.isArray(this.items) || !this.items.every(Ve))
        throw new TypeError("Array containing Nodes expected");
    }
    get type() {
      return gn;
    }
    get isArrayNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(a, i) {
      var o = nt(this.items, function(s) {
        return s._compile(a, i);
      }), c = a.config.matrix !== "Array";
      if (c) {
        var l = a.matrix;
        return function(u, f, m) {
          return l(nt(o, function(v) {
            return v(u, f, m);
          }));
        };
      } else
        return function(u, f, m) {
          return nt(o, function(v) {
            return v(u, f, m);
          });
        };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(a) {
      for (var i = 0; i < this.items.length; i++) {
        var o = this.items[i];
        a(o, "items[" + i + "]", this);
      }
    }
    /**
     * Create a new ArrayNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {ArrayNode} Returns a transformed copy of the node
     */
    map(a) {
      for (var i = [], o = 0; o < this.items.length; o++)
        i[o] = this._ifNode(a(this.items[o], "items[" + o + "]", this));
      return new t(i);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ArrayNode}
     */
    clone() {
      return new t(this.items.slice(0));
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(a) {
      var i = this.items.map(function(o) {
        return o.toString(a);
      });
      return "[" + i.join(", ") + "]";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: gn,
        items: this.items
      };
    }
    /**
     * Instantiate an ArrayNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "ArrayNode", items: [...]}`,
     *                       where mathjs is optional
     * @returns {ArrayNode}
     */
    static fromJSON(a) {
      return new t(a.items);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(a) {
      var i = this.items.map(function(o) {
        return o.toHTML(a);
      });
      return '<span class="math-parenthesis math-square-parenthesis">[</span>' + i.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(a) {
      function i(o, c) {
        var l = o.some(Sr) && !o.every(Sr), s = c || l, u = s ? "&" : "\\\\", f = o.map(function(m) {
          return m.items ? i(m.items, !c) : m.toTex(a);
        }).join(u);
        return l || !s || s && !c ? "\\begin{bmatrix}" + f + "\\end{bmatrix}" : f;
      }
      return i(this.items, !1);
    }
  }
  return ar(t, "name", gn), t;
}, {
  isClass: !0,
  isNode: !0
});
function qw(e) {
  var {
    subset: r,
    matrix: t
  } = e;
  return function(a, i, o) {
    try {
      if (Array.isArray(a)) {
        var c = t(a).subset(i, o).valueOf();
        return c.forEach((l, s) => {
          a[s] = l;
        }), a;
      } else {
        if (a && typeof a.subset == "function")
          return a.subset(i, o);
        if (typeof a == "string")
          return r(a, i, o);
        if (typeof a == "object") {
          if (!i.isObjectProperty())
            throw TypeError("Cannot apply a numeric index as object property");
          return Bt(a, i.getObjectProperty(), o), a;
        } else
          throw new TypeError("Cannot apply index: unsupported type of object");
      }
    } catch (l) {
      throw br(l);
    }
  };
}
var Or = [{
  // assignment
  AssignmentNode: {},
  FunctionAssignmentNode: {}
}, {
  // conditional expression
  ConditionalNode: {
    latexLeftParens: !1,
    latexRightParens: !1,
    latexParens: !1
    // conditionals don't need parentheses in LaTeX because
    // they are 2 dimensional
  }
}, {
  // logical or
  "OperatorNode:or": {
    op: "or",
    associativity: "left",
    associativeWith: []
  }
}, {
  // logical xor
  "OperatorNode:xor": {
    op: "xor",
    associativity: "left",
    associativeWith: []
  }
}, {
  // logical and
  "OperatorNode:and": {
    op: "and",
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitwise or
  "OperatorNode:bitOr": {
    op: "|",
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitwise xor
  "OperatorNode:bitXor": {
    op: "^|",
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitwise and
  "OperatorNode:bitAnd": {
    op: "&",
    associativity: "left",
    associativeWith: []
  }
}, {
  // relational operators
  "OperatorNode:equal": {
    op: "==",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:unequal": {
    op: "!=",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:smaller": {
    op: "<",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:larger": {
    op: ">",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:smallerEq": {
    op: "<=",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:largerEq": {
    op: ">=",
    associativity: "left",
    associativeWith: []
  },
  RelationalNode: {
    associativity: "left",
    associativeWith: []
  }
}, {
  // bitshift operators
  "OperatorNode:leftShift": {
    op: "<<",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:rightArithShift": {
    op: ">>",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:rightLogShift": {
    op: ">>>",
    associativity: "left",
    associativeWith: []
  }
}, {
  // unit conversion
  "OperatorNode:to": {
    op: "to",
    associativity: "left",
    associativeWith: []
  }
}, {
  // range
  RangeNode: {}
}, {
  // addition, subtraction
  "OperatorNode:add": {
    op: "+",
    associativity: "left",
    associativeWith: ["OperatorNode:add", "OperatorNode:subtract"]
  },
  "OperatorNode:subtract": {
    op: "-",
    associativity: "left",
    associativeWith: []
  }
}, {
  // multiply, divide, modulus
  "OperatorNode:multiply": {
    op: "*",
    associativity: "left",
    associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]
  },
  "OperatorNode:divide": {
    op: "/",
    associativity: "left",
    associativeWith: [],
    latexLeftParens: !1,
    latexRightParens: !1,
    latexParens: !1
    // fractions don't require parentheses because
    // they're 2 dimensional, so parens aren't needed
    // in LaTeX
  },
  "OperatorNode:dotMultiply": {
    op: ".*",
    associativity: "left",
    associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "OperatorNode:dotMultiply", "OperatorNode:doDivide"]
  },
  "OperatorNode:dotDivide": {
    op: "./",
    associativity: "left",
    associativeWith: []
  },
  "OperatorNode:mod": {
    op: "mod",
    associativity: "left",
    associativeWith: []
  }
}, {
  // Repeat multiplication for implicit multiplication
  "OperatorNode:multiply": {
    associativity: "left",
    associativeWith: ["OperatorNode:multiply", "OperatorNode:divide", "Operator:dotMultiply", "Operator:dotDivide"]
  }
}, {
  // unary prefix operators
  "OperatorNode:unaryPlus": {
    op: "+",
    associativity: "right"
  },
  "OperatorNode:unaryMinus": {
    op: "-",
    associativity: "right"
  },
  "OperatorNode:bitNot": {
    op: "~",
    associativity: "right"
  },
  "OperatorNode:not": {
    op: "not",
    associativity: "right"
  }
}, {
  // exponentiation
  "OperatorNode:pow": {
    op: "^",
    associativity: "right",
    associativeWith: [],
    latexRightParens: !1
    // the exponent doesn't need parentheses in
    // LaTeX because it's 2 dimensional
    // (it's on top)
  },
  "OperatorNode:dotPow": {
    op: ".^",
    associativity: "right",
    associativeWith: []
  }
}, {
  // factorial
  "OperatorNode:factorial": {
    op: "!",
    associativity: "left"
  }
}, {
  // matrix transpose
  "OperatorNode:ctranspose": {
    op: "'",
    associativity: "left"
  }
}];
function yn(e, r) {
  if (!r || r !== "auto") return e;
  for (var t = e; Ur(t); ) t = t.content;
  return t;
}
function Ye(e, r, t, n) {
  var a = e;
  r !== "keep" && (a = e.getContent());
  for (var i = a.getIdentifier(), o = null, c = 0; c < Or.length; c++)
    if (i in Or[c]) {
      o = c;
      break;
    }
  if (i === "OperatorNode:multiply" && a.implicit && t !== "show") {
    var l = yn(a.args[0], r);
    !(ke(l) && n && n.getIdentifier() === "OperatorNode:divide" && Ca(yn(n.args[0], r))) && !(l.getIdentifier() === "OperatorNode:divide" && Ca(yn(l.args[0], r)) && ke(yn(l.args[1]))) && (o += 1);
  }
  return o;
}
function Xt(e, r) {
  var t = e;
  r !== "keep" && (t = e.getContent());
  var n = t.getIdentifier(), a = Ye(t, r);
  if (a === null)
    return null;
  var i = Or[a][n];
  if (De(i, "associativity")) {
    if (i.associativity === "left")
      return "left";
    if (i.associativity === "right")
      return "right";
    throw Error("'" + n + "' has the invalid associativity '" + i.associativity + "'.");
  }
  return null;
}
function Aa(e, r, t) {
  var n = t !== "keep" ? e.getContent() : e, a = t !== "keep" ? e.getContent() : r, i = n.getIdentifier(), o = a.getIdentifier(), c = Ye(n, t);
  if (c === null)
    return null;
  var l = Or[c][i];
  if (De(l, "associativeWith") && l.associativeWith instanceof Array) {
    for (var s = 0; s < l.associativeWith.length; s++)
      if (l.associativeWith[s] === o)
        return !0;
    return !1;
  }
  return null;
}
function Rw(e) {
  var r = "OperatorNode:" + e;
  for (var t of Or)
    if (r in t)
      return t[r].op;
  return null;
}
var bn = "AssignmentNode", zw = [
  "subset",
  "?matrix",
  // FIXME: should not be needed at all, should be handled by subset
  "Node"
], Pw = /* @__PURE__ */ q(bn, zw, (e) => {
  var {
    subset: r,
    matrix: t,
    Node: n
  } = e, a = mm({
    subset: r
  }), i = qw({
    subset: r,
    matrix: t
  });
  function o(l, s, u) {
    s || (s = "keep");
    var f = Ye(l, s, u), m = Ye(l.value, s, u);
    return s === "all" || m !== null && m <= f;
  }
  class c extends n {
    /**
     * @constructor AssignmentNode
     * @extends {Node}
     *
     * Define a symbol, like `a=3.2`, update a property like `a.b=3.2`, or
     * replace a subset of a matrix like `A[2,2]=42`.
     *
     * Syntax:
     *
     *     new AssignmentNode(symbol, value)
     *     new AssignmentNode(object, index, value)
     *
     * Usage:
     *
     *    new AssignmentNode(new SymbolNode('a'), new ConstantNode(2))  // a=2
     *    new AssignmentNode(new SymbolNode('a'),
     *                       new IndexNode('b'),
     *                       new ConstantNode(2))   // a.b=2
     *    new AssignmentNode(new SymbolNode('a'),
     *                       new IndexNode(1, 2),
     *                       new ConstantNode(3))  // a[1,2]=3
     *
     * @param {SymbolNode | AccessorNode} object
     *     Object on which to assign a value
     * @param {IndexNode} [index=null]
     *     Index, property name or matrix index. Optional. If not provided
     *     and `object` is a SymbolNode, the property is assigned to the
     *     global scope.
     * @param {Node} value
     *     The value to be assigned
     */
    constructor(s, u, f) {
      if (super(), this.object = s, this.index = f ? u : null, this.value = f || u, !nr(s) && !at(s))
        throw new TypeError('SymbolNode or AccessorNode expected as "object"');
      if (nr(s) && s.name === "end")
        throw new Error('Cannot assign to symbol "end"');
      if (this.index && !gt(this.index))
        throw new TypeError('IndexNode expected as "index"');
      if (!Ve(this.value))
        throw new TypeError('Node expected as "value"');
    }
    // class name for typing purposes:
    // readonly property name
    get name() {
      return this.index ? this.index.isObjectProperty() ? this.index.getObjectProperty() : "" : this.object.name || "";
    }
    get type() {
      return bn;
    }
    get isAssignmentNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(s, u) {
      var f = this.object._compile(s, u), m = this.index ? this.index._compile(s, u) : null, v = this.value._compile(s, u), p = this.object.name;
      if (this.index)
        if (this.index.isObjectProperty()) {
          var d = this.index.getObjectProperty();
          return function(w, y, g) {
            var A = f(w, y, g), E = v(w, y, g);
            return Bt(A, d, E), E;
          };
        } else {
          if (nr(this.object))
            return function(w, y, g) {
              var A = f(w, y, g), E = v(w, y, g), N = m(w, y, A);
              return w.set(p, i(A, N, E)), E;
            };
          var b = this.object.object._compile(s, u);
          if (this.object.index.isObjectProperty()) {
            var x = this.object.index.getObjectProperty();
            return function(w, y, g) {
              var A = b(w, y, g), E = hr(A, x), N = m(w, y, E), S = v(w, y, g);
              return Bt(A, x, i(E, N, S)), S;
            };
          } else {
            var D = this.object.index._compile(s, u);
            return function(w, y, g) {
              var A = b(w, y, g), E = D(w, y, A), N = a(A, E), S = m(w, y, N), C = v(w, y, g);
              return i(A, E, i(N, S, C)), C;
            };
          }
        }
      else {
        if (!nr(this.object))
          throw new TypeError("SymbolNode expected as object");
        return function(w, y, g) {
          var A = v(w, y, g);
          return w.set(p, A), A;
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(s) {
      s(this.object, "object", this), this.index && s(this.index, "index", this), s(this.value, "value", this);
    }
    /**
     * Create a new AssignmentNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {AssignmentNode} Returns a transformed copy of the node
     */
    map(s) {
      var u = this._ifNode(s(this.object, "object", this)), f = this.index ? this._ifNode(s(this.index, "index", this)) : null, m = this._ifNode(s(this.value, "value", this));
      return new c(u, f, m);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {AssignmentNode}
     */
    clone() {
      return new c(this.object, this.index, this.value);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string}
     */
    _toString(s) {
      var u = this.object.toString(s), f = this.index ? this.index.toString(s) : "", m = this.value.toString(s);
      return o(this, s && s.parenthesis, s && s.implicit) && (m = "(" + m + ")"), u + f + " = " + m;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: bn,
        object: this.object,
        index: this.index,
        value: this.value
      };
    }
    /**
     * Instantiate an AssignmentNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "AssignmentNode", object: ..., index: ..., value: ...}`,
     *     where mathjs is optional
     * @returns {AssignmentNode}
     */
    static fromJSON(s) {
      return new c(s.object, s.index, s.value);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string}
     */
    _toHTML(s) {
      var u = this.object.toHTML(s), f = this.index ? this.index.toHTML(s) : "", m = this.value.toHTML(s);
      return o(this, s && s.parenthesis, s && s.implicit) && (m = '<span class="math-paranthesis math-round-parenthesis">(</span>' + m + '<span class="math-paranthesis math-round-parenthesis">)</span>'), u + f + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + m;
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string}
     */
    _toTex(s) {
      var u = this.object.toTex(s), f = this.index ? this.index.toTex(s) : "", m = this.value.toTex(s);
      return o(this, s && s.parenthesis, s && s.implicit) && (m = "\\left(".concat(m, "\\right)")), u + f + "=" + m;
    }
  }
  return ar(c, "name", bn), c;
}, {
  isClass: !0,
  isNode: !0
}), xn = "BlockNode", Uw = ["ResultSet", "Node"], Lw = /* @__PURE__ */ q(xn, Uw, (e) => {
  var {
    ResultSet: r,
    Node: t
  } = e;
  class n extends t {
    /**
     * @constructor BlockNode
     * @extends {Node}
     * Holds a set with blocks
     * @param {Array.<{node: Node} | {node: Node, visible: boolean}>} blocks
     *            An array with blocks, where a block is constructed as an
     *            Object with properties block, which is a Node, and visible,
     *            which is a boolean. The property visible is optional and
     *            is true by default
     */
    constructor(i) {
      if (super(), !Array.isArray(i)) throw new Error("Array expected");
      this.blocks = i.map(function(o) {
        var c = o && o.node, l = o && o.visible !== void 0 ? o.visible : !0;
        if (!Ve(c)) throw new TypeError('Property "node" must be a Node');
        if (typeof l != "boolean")
          throw new TypeError('Property "visible" must be a boolean');
        return {
          node: c,
          visible: l
        };
      });
    }
    get type() {
      return xn;
    }
    get isBlockNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(i, o) {
      var c = nt(this.blocks, function(l) {
        return {
          evaluate: l.node._compile(i, o),
          visible: l.visible
        };
      });
      return function(s, u, f) {
        var m = [];
        return Vc(c, function(p) {
          var d = p.evaluate(s, u, f);
          p.visible && m.push(d);
        }), new r(m);
      };
    }
    /**
     * Execute a callback for each of the child blocks of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(i) {
      for (var o = 0; o < this.blocks.length; o++)
        i(this.blocks[o].node, "blocks[" + o + "].node", this);
    }
    /**
     * Create a new BlockNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {BlockNode} Returns a transformed copy of the node
     */
    map(i) {
      for (var o = [], c = 0; c < this.blocks.length; c++) {
        var l = this.blocks[c], s = this._ifNode(i(l.node, "blocks[" + c + "].node", this));
        o[c] = {
          node: s,
          visible: l.visible
        };
      }
      return new n(o);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {BlockNode}
     */
    clone() {
      var i = this.blocks.map(function(o) {
        return {
          node: o.node,
          visible: o.visible
        };
      });
      return new n(i);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(i) {
      return this.blocks.map(function(o) {
        return o.node.toString(i) + (o.visible ? "" : ";");
      }).join(`
`);
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: xn,
        blocks: this.blocks
      };
    }
    /**
     * Instantiate an BlockNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "BlockNode", blocks: [{node: ..., visible: false}, ...]}`,
     *     where mathjs is optional
     * @returns {BlockNode}
     */
    static fromJSON(i) {
      return new n(i.blocks);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(i) {
      return this.blocks.map(function(o) {
        return o.node.toHTML(i) + (o.visible ? "" : '<span class="math-separator">;</span>');
      }).join('<span class="math-separator"><br /></span>');
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(i) {
      return this.blocks.map(function(o) {
        return o.node.toTex(i) + (o.visible ? "" : ";");
      }).join(`\\;\\;
`);
    }
  }
  return ar(n, "name", xn), n;
}, {
  isClass: !0,
  isNode: !0
}), wn = "ConditionalNode", kw = ["Node"], Hw = /* @__PURE__ */ q(wn, kw, (e) => {
  var {
    Node: r
  } = e;
  function t(a) {
    if (typeof a == "number" || typeof a == "boolean" || typeof a == "string")
      return !!a;
    if (a) {
      if (Be(a))
        return !a.isZero();
      if (Ir(a))
        return !!(a.re || a.im);
      if (wr(a))
        return !!a.value;
    }
    if (a == null)
      return !1;
    throw new TypeError('Unsupported type of condition "' + Je(a) + '"');
  }
  class n extends r {
    /**
     * A lazy evaluating conditional operator: 'condition ? trueExpr : falseExpr'
     *
     * @param {Node} condition   Condition, must result in a boolean
     * @param {Node} trueExpr    Expression evaluated when condition is true
     * @param {Node} falseExpr   Expression evaluated when condition is true
     *
     * @constructor ConditionalNode
     * @extends {Node}
     */
    constructor(i, o, c) {
      if (super(), !Ve(i))
        throw new TypeError("Parameter condition must be a Node");
      if (!Ve(o))
        throw new TypeError("Parameter trueExpr must be a Node");
      if (!Ve(c))
        throw new TypeError("Parameter falseExpr must be a Node");
      this.condition = i, this.trueExpr = o, this.falseExpr = c;
    }
    get type() {
      return wn;
    }
    get isConditionalNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(i, o) {
      var c = this.condition._compile(i, o), l = this.trueExpr._compile(i, o), s = this.falseExpr._compile(i, o);
      return function(f, m, v) {
        return t(c(f, m, v)) ? l(f, m, v) : s(f, m, v);
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(i) {
      i(this.condition, "condition", this), i(this.trueExpr, "trueExpr", this), i(this.falseExpr, "falseExpr", this);
    }
    /**
     * Create a new ConditionalNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {ConditionalNode} Returns a transformed copy of the node
     */
    map(i) {
      return new n(this._ifNode(i(this.condition, "condition", this)), this._ifNode(i(this.trueExpr, "trueExpr", this)), this._ifNode(i(this.falseExpr, "falseExpr", this)));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ConditionalNode}
     */
    clone() {
      return new n(this.condition, this.trueExpr, this.falseExpr);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(i) {
      var o = i && i.parenthesis ? i.parenthesis : "keep", c = Ye(this, o, i && i.implicit), l = this.condition.toString(i), s = Ye(this.condition, o, i && i.implicit);
      (o === "all" || this.condition.type === "OperatorNode" || s !== null && s <= c) && (l = "(" + l + ")");
      var u = this.trueExpr.toString(i), f = Ye(this.trueExpr, o, i && i.implicit);
      (o === "all" || this.trueExpr.type === "OperatorNode" || f !== null && f <= c) && (u = "(" + u + ")");
      var m = this.falseExpr.toString(i), v = Ye(this.falseExpr, o, i && i.implicit);
      return (o === "all" || this.falseExpr.type === "OperatorNode" || v !== null && v <= c) && (m = "(" + m + ")"), l + " ? " + u + " : " + m;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: wn,
        condition: this.condition,
        trueExpr: this.trueExpr,
        falseExpr: this.falseExpr
      };
    }
    /**
     * Instantiate an ConditionalNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     ```
     *     {"mathjs": "ConditionalNode",
     *      "condition": ...,
     *      "trueExpr": ...,
     *      "falseExpr": ...}
     *     ```
     *     where mathjs is optional
     * @returns {ConditionalNode}
     */
    static fromJSON(i) {
      return new n(i.condition, i.trueExpr, i.falseExpr);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(i) {
      var o = i && i.parenthesis ? i.parenthesis : "keep", c = Ye(this, o, i && i.implicit), l = this.condition.toHTML(i), s = Ye(this.condition, o, i && i.implicit);
      (o === "all" || this.condition.type === "OperatorNode" || s !== null && s <= c) && (l = '<span class="math-parenthesis math-round-parenthesis">(</span>' + l + '<span class="math-parenthesis math-round-parenthesis">)</span>');
      var u = this.trueExpr.toHTML(i), f = Ye(this.trueExpr, o, i && i.implicit);
      (o === "all" || this.trueExpr.type === "OperatorNode" || f !== null && f <= c) && (u = '<span class="math-parenthesis math-round-parenthesis">(</span>' + u + '<span class="math-parenthesis math-round-parenthesis">)</span>');
      var m = this.falseExpr.toHTML(i), v = Ye(this.falseExpr, o, i && i.implicit);
      return (o === "all" || this.falseExpr.type === "OperatorNode" || v !== null && v <= c) && (m = '<span class="math-parenthesis math-round-parenthesis">(</span>' + m + '<span class="math-parenthesis math-round-parenthesis">)</span>'), l + '<span class="math-operator math-conditional-operator">?</span>' + u + '<span class="math-operator math-conditional-operator">:</span>' + m;
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(i) {
      return "\\begin{cases} {" + this.trueExpr.toTex(i) + "}, &\\quad{\\text{if }\\;" + this.condition.toTex(i) + "}\\\\{" + this.falseExpr.toTex(i) + "}, &\\quad{\\text{otherwise}}\\end{cases}";
    }
  }
  return ar(n, "name", wn), n;
}, {
  isClass: !0,
  isNode: !0
}), Ha = Object.assign || function(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r];
    for (var n in t)
      Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  }
  return e;
}, Gw = {
  "{": "\\{",
  "}": "\\}",
  "\\": "\\textbackslash{}",
  "#": "\\#",
  $: "\\$",
  "%": "\\%",
  "&": "\\&",
  "^": "\\textasciicircum{}",
  _: "\\_",
  "~": "\\textasciitilde{}"
}, Zw = {
  "–": "\\--",
  "—": "\\---",
  " ": "~",
  "	": "\\qquad{}",
  "\r\n": "\\newline{}",
  "\n": "\\newline{}"
}, Vw = function(r, t) {
  return Ha({}, r, t);
}, Ww = function(e) {
  for (var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, t = r.preserveFormatting, n = t === void 0 ? !1 : t, a = r.escapeMapFn, i = a === void 0 ? Vw : a, o = String(e), c = "", l = i(Ha({}, Gw), n ? Ha({}, Zw) : {}), s = Object.keys(l), u = function() {
    var m = !1;
    s.forEach(function(v, p) {
      m || o.length >= v.length && o.slice(0, v.length) === v && (c += l[s[p]], o = o.slice(v.length, o.length), m = !0);
    }), m || (c += o.slice(0, 1), o = o.slice(1, o.length));
  }; o; )
    u();
  return c;
};
const Yw = /* @__PURE__ */ va(Ww);
var Ga = {
  // GREEK LETTERS
  Alpha: "A",
  alpha: "\\alpha",
  Beta: "B",
  beta: "\\beta",
  Gamma: "\\Gamma",
  gamma: "\\gamma",
  Delta: "\\Delta",
  delta: "\\delta",
  Epsilon: "E",
  epsilon: "\\epsilon",
  varepsilon: "\\varepsilon",
  Zeta: "Z",
  zeta: "\\zeta",
  Eta: "H",
  eta: "\\eta",
  Theta: "\\Theta",
  theta: "\\theta",
  vartheta: "\\vartheta",
  Iota: "I",
  iota: "\\iota",
  Kappa: "K",
  kappa: "\\kappa",
  varkappa: "\\varkappa",
  Lambda: "\\Lambda",
  lambda: "\\lambda",
  Mu: "M",
  mu: "\\mu",
  Nu: "N",
  nu: "\\nu",
  Xi: "\\Xi",
  xi: "\\xi",
  Omicron: "O",
  omicron: "o",
  Pi: "\\Pi",
  pi: "\\pi",
  varpi: "\\varpi",
  Rho: "P",
  rho: "\\rho",
  varrho: "\\varrho",
  Sigma: "\\Sigma",
  sigma: "\\sigma",
  varsigma: "\\varsigma",
  Tau: "T",
  tau: "\\tau",
  Upsilon: "\\Upsilon",
  upsilon: "\\upsilon",
  Phi: "\\Phi",
  phi: "\\phi",
  varphi: "\\varphi",
  Chi: "X",
  chi: "\\chi",
  Psi: "\\Psi",
  psi: "\\psi",
  Omega: "\\Omega",
  omega: "\\omega",
  // logic
  true: "\\mathrm{True}",
  false: "\\mathrm{False}",
  // other
  i: "i",
  // TODO use \i ??
  inf: "\\infty",
  Inf: "\\infty",
  infinity: "\\infty",
  Infinity: "\\infty",
  oo: "\\infty",
  lim: "\\lim",
  undefined: "\\mathbf{?}"
}, He = {
  transpose: "^\\top",
  ctranspose: "^H",
  factorial: "!",
  pow: "^",
  dotPow: ".^\\wedge",
  // TODO find ideal solution
  unaryPlus: "+",
  unaryMinus: "-",
  bitNot: "\\~",
  // TODO find ideal solution
  not: "\\neg",
  multiply: "\\cdot",
  divide: "\\frac",
  // TODO how to handle that properly?
  dotMultiply: ".\\cdot",
  // TODO find ideal solution
  dotDivide: ".:",
  // TODO find ideal solution
  mod: "\\mod",
  add: "+",
  subtract: "-",
  to: "\\rightarrow",
  leftShift: "<<",
  rightArithShift: ">>",
  rightLogShift: ">>>",
  equal: "=",
  unequal: "\\neq",
  smaller: "<",
  larger: ">",
  smallerEq: "\\leq",
  largerEq: "\\geq",
  bitAnd: "\\&",
  bitXor: "\\underline{|}",
  bitOr: "|",
  and: "\\wedge",
  xor: "\\veebar",
  or: "\\vee"
}, Lu = {
  // arithmetic
  abs: {
    1: "\\left|${args[0]}\\right|"
  },
  add: {
    2: "\\left(${args[0]}".concat(He.add, "${args[1]}\\right)")
  },
  cbrt: {
    1: "\\sqrt[3]{${args[0]}}"
  },
  ceil: {
    1: "\\left\\lceil${args[0]}\\right\\rceil"
  },
  cube: {
    1: "\\left(${args[0]}\\right)^3"
  },
  divide: {
    2: "\\frac{${args[0]}}{${args[1]}}"
  },
  dotDivide: {
    2: "\\left(${args[0]}".concat(He.dotDivide, "${args[1]}\\right)")
  },
  dotMultiply: {
    2: "\\left(${args[0]}".concat(He.dotMultiply, "${args[1]}\\right)")
  },
  dotPow: {
    2: "\\left(${args[0]}".concat(He.dotPow, "${args[1]}\\right)")
  },
  exp: {
    1: "\\exp\\left(${args[0]}\\right)"
  },
  expm1: "\\left(e".concat(He.pow, "{${args[0]}}-1\\right)"),
  fix: {
    1: "\\mathrm{${name}}\\left(${args[0]}\\right)"
  },
  floor: {
    1: "\\left\\lfloor${args[0]}\\right\\rfloor"
  },
  gcd: "\\gcd\\left(${args}\\right)",
  hypot: "\\hypot\\left(${args}\\right)",
  log: {
    1: "\\ln\\left(${args[0]}\\right)",
    2: "\\log_{${args[1]}}\\left(${args[0]}\\right)"
  },
  log10: {
    1: "\\log_{10}\\left(${args[0]}\\right)"
  },
  log1p: {
    1: "\\ln\\left(${args[0]}+1\\right)",
    2: "\\log_{${args[1]}}\\left(${args[0]}+1\\right)"
  },
  log2: "\\log_{2}\\left(${args[0]}\\right)",
  mod: {
    2: "\\left(${args[0]}".concat(He.mod, "${args[1]}\\right)")
  },
  multiply: {
    2: "\\left(${args[0]}".concat(He.multiply, "${args[1]}\\right)")
  },
  norm: {
    1: "\\left\\|${args[0]}\\right\\|",
    2: void 0
    // use default template
  },
  nthRoot: {
    2: "\\sqrt[${args[1]}]{${args[0]}}"
  },
  nthRoots: {
    2: "\\{y : $y^{args[1]} = {${args[0]}}\\}"
  },
  pow: {
    2: "\\left(${args[0]}\\right)".concat(He.pow, "{${args[1]}}")
  },
  round: {
    1: "\\left\\lfloor${args[0]}\\right\\rceil",
    2: void 0
    // use default template
  },
  sign: {
    1: "\\mathrm{${name}}\\left(${args[0]}\\right)"
  },
  sqrt: {
    1: "\\sqrt{${args[0]}}"
  },
  square: {
    1: "\\left(${args[0]}\\right)^2"
  },
  subtract: {
    2: "\\left(${args[0]}".concat(He.subtract, "${args[1]}\\right)")
  },
  unaryMinus: {
    1: "".concat(He.unaryMinus, "\\left(${args[0]}\\right)")
  },
  unaryPlus: {
    1: "".concat(He.unaryPlus, "\\left(${args[0]}\\right)")
  },
  // bitwise
  bitAnd: {
    2: "\\left(${args[0]}".concat(He.bitAnd, "${args[1]}\\right)")
  },
  bitNot: {
    1: He.bitNot + "\\left(${args[0]}\\right)"
  },
  bitOr: {
    2: "\\left(${args[0]}".concat(He.bitOr, "${args[1]}\\right)")
  },
  bitXor: {
    2: "\\left(${args[0]}".concat(He.bitXor, "${args[1]}\\right)")
  },
  leftShift: {
    2: "\\left(${args[0]}".concat(He.leftShift, "${args[1]}\\right)")
  },
  rightArithShift: {
    2: "\\left(${args[0]}".concat(He.rightArithShift, "${args[1]}\\right)")
  },
  rightLogShift: {
    2: "\\left(${args[0]}".concat(He.rightLogShift, "${args[1]}\\right)")
  },
  // combinatorics
  bellNumbers: {
    1: "\\mathrm{B}_{${args[0]}}"
  },
  catalan: {
    1: "\\mathrm{C}_{${args[0]}}"
  },
  stirlingS2: {
    2: "\\mathrm{S}\\left(${args}\\right)"
  },
  // complex
  arg: {
    1: "\\arg\\left(${args[0]}\\right)"
  },
  conj: {
    1: "\\left(${args[0]}\\right)^*"
  },
  im: {
    1: "\\Im\\left\\lbrace${args[0]}\\right\\rbrace"
  },
  re: {
    1: "\\Re\\left\\lbrace${args[0]}\\right\\rbrace"
  },
  // logical
  and: {
    2: "\\left(${args[0]}".concat(He.and, "${args[1]}\\right)")
  },
  not: {
    1: He.not + "\\left(${args[0]}\\right)"
  },
  or: {
    2: "\\left(${args[0]}".concat(He.or, "${args[1]}\\right)")
  },
  xor: {
    2: "\\left(${args[0]}".concat(He.xor, "${args[1]}\\right)")
  },
  // matrix
  cross: {
    2: "\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)"
  },
  ctranspose: {
    1: "\\left(${args[0]}\\right)".concat(He.ctranspose)
  },
  det: {
    1: "\\det\\left(${args[0]}\\right)"
  },
  dot: {
    2: "\\left(${args[0]}\\cdot${args[1]}\\right)"
  },
  expm: {
    1: "\\exp\\left(${args[0]}\\right)"
  },
  inv: {
    1: "\\left(${args[0]}\\right)^{-1}"
  },
  pinv: {
    1: "\\left(${args[0]}\\right)^{+}"
  },
  sqrtm: {
    1: "{${args[0]}}".concat(He.pow, "{\\frac{1}{2}}")
  },
  trace: {
    1: "\\mathrm{tr}\\left(${args[0]}\\right)"
  },
  transpose: {
    1: "\\left(${args[0]}\\right)".concat(He.transpose)
  },
  // probability
  combinations: {
    2: "\\binom{${args[0]}}{${args[1]}}"
  },
  combinationsWithRep: {
    2: "\\left(\\!\\!{\\binom{${args[0]}}{${args[1]}}}\\!\\!\\right)"
  },
  factorial: {
    1: "\\left(${args[0]}\\right)".concat(He.factorial)
  },
  gamma: {
    1: "\\Gamma\\left(${args[0]}\\right)"
  },
  lgamma: {
    1: "\\ln\\Gamma\\left(${args[0]}\\right)"
  },
  // relational
  equal: {
    2: "\\left(${args[0]}".concat(He.equal, "${args[1]}\\right)")
  },
  larger: {
    2: "\\left(${args[0]}".concat(He.larger, "${args[1]}\\right)")
  },
  largerEq: {
    2: "\\left(${args[0]}".concat(He.largerEq, "${args[1]}\\right)")
  },
  smaller: {
    2: "\\left(${args[0]}".concat(He.smaller, "${args[1]}\\right)")
  },
  smallerEq: {
    2: "\\left(${args[0]}".concat(He.smallerEq, "${args[1]}\\right)")
  },
  unequal: {
    2: "\\left(${args[0]}".concat(He.unequal, "${args[1]}\\right)")
  },
  // special
  erf: {
    1: "erf\\left(${args[0]}\\right)"
  },
  // statistics
  max: "\\max\\left(${args}\\right)",
  min: "\\min\\left(${args}\\right)",
  variance: "\\mathrm{Var}\\left(${args}\\right)",
  // trigonometry
  acos: {
    1: "\\cos^{-1}\\left(${args[0]}\\right)"
  },
  acosh: {
    1: "\\cosh^{-1}\\left(${args[0]}\\right)"
  },
  acot: {
    1: "\\cot^{-1}\\left(${args[0]}\\right)"
  },
  acoth: {
    1: "\\coth^{-1}\\left(${args[0]}\\right)"
  },
  acsc: {
    1: "\\csc^{-1}\\left(${args[0]}\\right)"
  },
  acsch: {
    1: "\\mathrm{csch}^{-1}\\left(${args[0]}\\right)"
  },
  asec: {
    1: "\\sec^{-1}\\left(${args[0]}\\right)"
  },
  asech: {
    1: "\\mathrm{sech}^{-1}\\left(${args[0]}\\right)"
  },
  asin: {
    1: "\\sin^{-1}\\left(${args[0]}\\right)"
  },
  asinh: {
    1: "\\sinh^{-1}\\left(${args[0]}\\right)"
  },
  atan: {
    1: "\\tan^{-1}\\left(${args[0]}\\right)"
  },
  atan2: {
    2: "\\mathrm{atan2}\\left(${args}\\right)"
  },
  atanh: {
    1: "\\tanh^{-1}\\left(${args[0]}\\right)"
  },
  cos: {
    1: "\\cos\\left(${args[0]}\\right)"
  },
  cosh: {
    1: "\\cosh\\left(${args[0]}\\right)"
  },
  cot: {
    1: "\\cot\\left(${args[0]}\\right)"
  },
  coth: {
    1: "\\coth\\left(${args[0]}\\right)"
  },
  csc: {
    1: "\\csc\\left(${args[0]}\\right)"
  },
  csch: {
    1: "\\mathrm{csch}\\left(${args[0]}\\right)"
  },
  sec: {
    1: "\\sec\\left(${args[0]}\\right)"
  },
  sech: {
    1: "\\mathrm{sech}\\left(${args[0]}\\right)"
  },
  sin: {
    1: "\\sin\\left(${args[0]}\\right)"
  },
  sinh: {
    1: "\\sinh\\left(${args[0]}\\right)"
  },
  tan: {
    1: "\\tan\\left(${args[0]}\\right)"
  },
  tanh: {
    1: "\\tanh\\left(${args[0]}\\right)"
  },
  // unit
  to: {
    2: "\\left(${args[0]}".concat(He.to, "${args[1]}\\right)")
  },
  // utils
  numeric: function(r, t) {
    return r.args[0].toTex();
  },
  // type
  number: {
    0: "0",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"
  },
  string: {
    0: '\\mathtt{""}',
    1: "\\mathrm{string}\\left(${args[0]}\\right)"
  },
  bignumber: {
    0: "0",
    1: "\\left(${args[0]}\\right)"
  },
  bigint: {
    0: "0",
    1: "\\left(${args[0]}\\right)"
  },
  complex: {
    0: "0",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)+".concat(Ga.i, "\\cdot\\left(${args[1]}\\right)\\right)")
  },
  matrix: {
    0: "\\begin{bmatrix}\\end{bmatrix}",
    1: "\\left(${args[0]}\\right)",
    2: "\\left(${args[0]}\\right)"
  },
  sparse: {
    0: "\\begin{bsparse}\\end{bsparse}",
    1: "\\left(${args[0]}\\right)"
  },
  unit: {
    1: "\\left(${args[0]}\\right)",
    2: "\\left(\\left(${args[0]}\\right)${args[1]}\\right)"
  }
}, Xw = "\\mathrm{${name}}\\left(${args}\\right)", ku = {
  deg: "^\\circ"
};
function Za(e) {
  return Yw(e, {
    preserveFormatting: !0
  });
}
function vm(e, r) {
  return r = typeof r > "u" ? !1 : r, r ? De(ku, e) ? ku[e] : "\\mathrm{" + Za(e) + "}" : De(Ga, e) ? Ga[e] : Za(e);
}
var Dn = "ConstantNode", Jw = ["Node"], Qw = /* @__PURE__ */ q(Dn, Jw, (e) => {
  var {
    Node: r
  } = e;
  class t extends r {
    /**
     * A ConstantNode holds a constant value like a number or string.
     *
     * Usage:
     *
     *     new ConstantNode(2.3)
     *     new ConstantNode('hello')
     *
     * @param {*} value    Value can be any type (number, BigNumber, bigint, string, ...)
     * @constructor ConstantNode
     * @extends {Node}
     */
    constructor(a) {
      super(), this.value = a;
    }
    get type() {
      return Dn;
    }
    get isConstantNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(a, i) {
      var o = this.value;
      return function() {
        return o;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(a) {
    }
    /**
     * Create a new ConstantNode with children produced by the given callback.
     * Trivial because there are no children.
     * @param {function(child: Node, path: string, parent: Node) : Node} callback
     * @returns {ConstantNode} Returns a clone of the node
     */
    map(a) {
      return this.clone();
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ConstantNode}
     */
    clone() {
      return new t(this.value);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(a) {
      return Pe(this.value, a);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(a) {
      var i = this._toString(a);
      switch (Je(this.value)) {
        case "number":
        case "bigint":
        case "BigNumber":
        case "Fraction":
          return '<span class="math-number">' + i + "</span>";
        case "string":
          return '<span class="math-string">' + i + "</span>";
        case "boolean":
          return '<span class="math-boolean">' + i + "</span>";
        case "null":
          return '<span class="math-null-symbol">' + i + "</span>";
        case "undefined":
          return '<span class="math-undefined">' + i + "</span>";
        default:
          return '<span class="math-symbol">' + i + "</span>";
      }
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: Dn,
        value: this.value
      };
    }
    /**
     * Instantiate a ConstantNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "SymbolNode", value: 2.3}`,
     *                       where mathjs is optional
     * @returns {ConstantNode}
     */
    static fromJSON(a) {
      return new t(a.value);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(a) {
      var i = this._toString(a), o = Je(this.value);
      switch (o) {
        case "string":
          return "\\mathtt{" + Za(i) + "}";
        case "number":
        case "BigNumber": {
          var c = o === "BigNumber" ? this.value.isFinite() : isFinite(this.value);
          if (!c)
            return this.value.valueOf() < 0 ? "-\\infty" : "\\infty";
          var l = i.toLowerCase().indexOf("e");
          return l !== -1 ? i.substring(0, l) + "\\cdot10^{" + i.substring(l + 1) + "}" : i;
        }
        case "bigint":
          return i.toString();
        case "Fraction":
          return this.value.toLatex();
        default:
          return i;
      }
    }
  }
  return ar(t, "name", Dn), t;
}, {
  isClass: !0,
  isNode: !0
}), Nn = "FunctionAssignmentNode", Kw = ["typed", "Node"], jw = /* @__PURE__ */ q(Nn, Kw, (e) => {
  var {
    typed: r,
    Node: t
  } = e;
  function n(i, o, c) {
    var l = Ye(i, o, c), s = Ye(i.expr, o, c);
    return o === "all" || s !== null && s <= l;
  }
  class a extends t {
    /**
     * @constructor FunctionAssignmentNode
     * @extends {Node}
     * Function assignment
     *
     * @param {string} name           Function name
     * @param {string[] | Array.<{name: string, type: string}>} params
     *                                Array with function parameter names, or an
     *                                array with objects containing the name
     *                                and type of the parameter
     * @param {Node} expr             The function expression
     */
    constructor(o, c, l) {
      if (super(), typeof o != "string")
        throw new TypeError('String expected for parameter "name"');
      if (!Array.isArray(c))
        throw new TypeError('Array containing strings or objects expected for parameter "params"');
      if (!Ve(l))
        throw new TypeError('Node expected for parameter "expr"');
      if (fm.has(o))
        throw new Error('Illegal function name, "' + o + '" is a reserved keyword');
      var s = /* @__PURE__ */ new Set();
      for (var u of c) {
        var f = typeof u == "string" ? u : u.name;
        if (s.has(f))
          throw new Error('Duplicate parameter name "'.concat(f, '"'));
        s.add(f);
      }
      this.name = o, this.params = c.map(function(m) {
        return m && m.name || m;
      }), this.types = c.map(function(m) {
        return m && m.type || "any";
      }), this.expr = l;
    }
    get type() {
      return Nn;
    }
    get isFunctionAssignmentNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(o, c) {
      var l = Object.create(c);
      Vc(this.params, function(p) {
        l[p] = !0;
      });
      var s = this.expr._compile(o, l), u = this.name, f = this.params, m = Hi(this.types, ","), v = u + "(" + Hi(this.params, ", ") + ")";
      return function(d, b, x) {
        var D = {};
        D[m] = function() {
          for (var w = Object.create(b), y = 0; y < f.length; y++)
            w[f[y]] = arguments[y];
          return s(d, w, x);
        };
        var h = r(u, D);
        return h.syntax = v, d.set(u, h), h;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(o) {
      o(this.expr, "expr", this);
    }
    /**
     * Create a new FunctionAssignmentNode whose children are the results of
     * calling the provided callback function for each child of the original
     * node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {FunctionAssignmentNode} Returns a transformed copy of the node
     */
    map(o) {
      var c = this._ifNode(o(this.expr, "expr", this));
      return new a(this.name, this.params.slice(0), c);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {FunctionAssignmentNode}
     */
    clone() {
      return new a(this.name, this.params.slice(0), this.expr);
    }
    /**
     * get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(o) {
      var c = o && o.parenthesis ? o.parenthesis : "keep", l = this.expr.toString(o);
      return n(this, c, o && o.implicit) && (l = "(" + l + ")"), this.name + "(" + this.params.join(", ") + ") = " + l;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      var o = this.types;
      return {
        mathjs: Nn,
        name: this.name,
        params: this.params.map(function(c, l) {
          return {
            name: c,
            type: o[l]
          };
        }),
        expr: this.expr
      };
    }
    /**
     * Instantiate an FunctionAssignmentNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     ```
     *     {"mathjs": "FunctionAssignmentNode",
     *      name: ..., params: ..., expr: ...}
     *     ```
     *     where mathjs is optional
     * @returns {FunctionAssignmentNode}
     */
    static fromJSON(o) {
      return new a(o.name, o.params, o.expr);
    }
    /**
     * get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(o) {
      for (var c = o && o.parenthesis ? o.parenthesis : "keep", l = [], s = 0; s < this.params.length; s++)
        l.push('<span class="math-symbol math-parameter">' + Tr(this.params[s]) + "</span>");
      var u = this.expr.toHTML(o);
      return n(this, c, o && o.implicit) && (u = '<span class="math-parenthesis math-round-parenthesis">(</span>' + u + '<span class="math-parenthesis math-round-parenthesis">)</span>'), '<span class="math-function">' + Tr(this.name) + '</span><span class="math-parenthesis math-round-parenthesis">(</span>' + l.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + u;
    }
    /**
     * get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(o) {
      var c = o && o.parenthesis ? o.parenthesis : "keep", l = this.expr.toTex(o);
      return n(this, c, o && o.implicit) && (l = "\\left(".concat(l, "\\right)")), "\\mathrm{" + this.name + "}\\left(" + this.params.map(vm).join(",") + "\\right)=" + l;
    }
  }
  return ar(a, "name", Nn), a;
}, {
  isClass: !0,
  isNode: !0
}), An = "IndexNode", eD = ["Node", "size"], rD = /* @__PURE__ */ q(An, eD, (e) => {
  var {
    Node: r,
    size: t
  } = e;
  class n extends r {
    /**
     * @constructor IndexNode
     * @extends Node
     *
     * Describes a subset of a matrix or an object property.
     * Cannot be used on its own, needs to be used within an AccessorNode or
     * AssignmentNode.
     *
     * @param {Node[]} dimensions
     * @param {boolean} [dotNotation=false]
     *     Optional property describing whether this index was written using dot
     *     notation like `a.b`, or using bracket notation like `a["b"]`
     *     (which is the default). This property is used for string conversion.
     */
    constructor(i, o) {
      if (super(), this.dimensions = i, this.dotNotation = o || !1, !Array.isArray(i) || !i.every(Ve))
        throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
      if (this.dotNotation && !this.isObjectProperty())
        throw new Error("dotNotation only applicable for object properties");
    }
    get type() {
      return An;
    }
    get isIndexNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(i, o) {
      var c = nt(this.dimensions, function(s, u) {
        var f = s.filter((p) => p.isSymbolNode && p.name === "end").length > 0;
        if (f) {
          var m = Object.create(o);
          m.end = !0;
          var v = s._compile(i, m);
          return function(d, b, x) {
            if (!Ce(x) && !Ze(x) && !sr(x))
              throw new TypeError('Cannot resolve "end": context must be a Matrix, Array, or string but is ' + Je(x));
            var D = t(x).valueOf(), h = Object.create(b);
            return h.end = D[u], v(d, h, x);
          };
        } else
          return s._compile(i, o);
      }), l = hr(i, "index");
      return function(u, f, m) {
        var v = nt(c, function(p) {
          return p(u, f, m);
        });
        return l(...v);
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(i) {
      for (var o = 0; o < this.dimensions.length; o++)
        i(this.dimensions[o], "dimensions[" + o + "]", this);
    }
    /**
     * Create a new IndexNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {IndexNode} Returns a transformed copy of the node
     */
    map(i) {
      for (var o = [], c = 0; c < this.dimensions.length; c++)
        o[c] = this._ifNode(i(this.dimensions[c], "dimensions[" + c + "]", this));
      return new n(o, this.dotNotation);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {IndexNode}
     */
    clone() {
      return new n(this.dimensions.slice(0), this.dotNotation);
    }
    /**
     * Test whether this IndexNode contains a single property name
     * @return {boolean}
     */
    isObjectProperty() {
      return this.dimensions.length === 1 && ke(this.dimensions[0]) && typeof this.dimensions[0].value == "string";
    }
    /**
     * Returns the property name if IndexNode contains a property.
     * If not, returns null.
     * @return {string | null}
     */
    getObjectProperty() {
      return this.isObjectProperty() ? this.dimensions[0].value : null;
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(i) {
      return this.dotNotation ? "." + this.getObjectProperty() : "[" + this.dimensions.join(", ") + "]";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: An,
        dimensions: this.dimensions,
        dotNotation: this.dotNotation
      };
    }
    /**
     * Instantiate an IndexNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "IndexNode", dimensions: [...], dotNotation: false}`,
     *     where mathjs is optional
     * @returns {IndexNode}
     */
    static fromJSON(i) {
      return new n(i.dimensions, i.dotNotation);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(i) {
      for (var o = [], c = 0; c < this.dimensions.length; c++)
        o[c] = this.dimensions[c].toHTML();
      return this.dotNotation ? '<span class="math-operator math-accessor-operator">.</span><span class="math-symbol math-property">' + Tr(this.getObjectProperty()) + "</span>" : '<span class="math-parenthesis math-square-parenthesis">[</span>' + o.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(i) {
      var o = this.dimensions.map(function(c) {
        return c.toTex(i);
      });
      return this.dotNotation ? "." + this.getObjectProperty() : "_{" + o.join(",") + "}";
    }
  }
  return ar(n, "name", An), n;
}, {
  isClass: !0,
  isNode: !0
}), En = "ObjectNode", tD = ["Node"], nD = /* @__PURE__ */ q(En, tD, (e) => {
  var {
    Node: r
  } = e;
  class t extends r {
    /**
     * @constructor ObjectNode
     * @extends {Node}
     * Holds an object with keys/values
     * @param {Object.<string, Node>} [properties]   object with key/value pairs
     */
    constructor(a) {
      if (super(), this.properties = a || {}, a && (typeof a != "object" || !Object.keys(a).every(function(i) {
        return Ve(a[i]);
      })))
        throw new TypeError("Object containing Nodes expected");
    }
    get type() {
      return En;
    }
    get isObjectNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(a, i) {
      var o = {};
      for (var c in this.properties)
        if (De(this.properties, c)) {
          var l = Mt(c), s = JSON.parse(l), u = hr(this.properties, c);
          o[s] = u._compile(a, i);
        }
      return function(m, v, p) {
        var d = {};
        for (var b in o)
          De(o, b) && (d[b] = o[b](m, v, p));
        return d;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(a) {
      for (var i in this.properties)
        De(this.properties, i) && a(this.properties[i], "properties[" + Mt(i) + "]", this);
    }
    /**
     * Create a new ObjectNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {ObjectNode} Returns a transformed copy of the node
     */
    map(a) {
      var i = {};
      for (var o in this.properties)
        De(this.properties, o) && (i[o] = this._ifNode(a(this.properties[o], "properties[" + Mt(o) + "]", this)));
      return new t(i);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ObjectNode}
     */
    clone() {
      var a = {};
      for (var i in this.properties)
        De(this.properties, i) && (a[i] = this.properties[i]);
      return new t(a);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(a) {
      var i = [];
      for (var o in this.properties)
        De(this.properties, o) && i.push(Mt(o) + ": " + this.properties[o].toString(a));
      return "{" + i.join(", ") + "}";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: En,
        properties: this.properties
      };
    }
    /**
     * Instantiate an OperatorNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "ObjectNode", "properties": {...}}`,
     *                       where mathjs is optional
     * @returns {ObjectNode}
     */
    static fromJSON(a) {
      return new t(a.properties);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(a) {
      var i = [];
      for (var o in this.properties)
        De(this.properties, o) && i.push('<span class="math-symbol math-property">' + Tr(o) + '</span><span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[o].toHTML(a));
      return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + i.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(a) {
      var i = [];
      for (var o in this.properties)
        De(this.properties, o) && i.push("\\mathbf{" + o + ":} & " + this.properties[o].toTex(a) + "\\\\");
      var c = "\\left\\{\\begin{array}{ll}" + i.join(`
`) + "\\end{array}\\right\\}";
      return c;
    }
  }
  return ar(t, "name", En), t;
}, {
  isClass: !0,
  isNode: !0
});
function Qt(e, r) {
  return new ic(e, new na(r), new Set(Object.keys(r)));
}
var Sn = "OperatorNode", aD = ["Node"], iD = /* @__PURE__ */ q(Sn, aD, (e) => {
  var {
    Node: r
  } = e;
  function t(i, o) {
    var c = i;
    if (o === "auto")
      for (; Ur(c); ) c = c.content;
    return ke(c) ? !0 : rr(c) ? t(c.args[0], o) : !1;
  }
  function n(i, o, c, l, s) {
    var u = Ye(i, o, c), f = Xt(i, o);
    if (o === "all" || l.length > 2 && i.getIdentifier() !== "OperatorNode:add" && i.getIdentifier() !== "OperatorNode:multiply")
      return l.map(function(S) {
        switch (S.getContent().type) {
          case "ArrayNode":
          case "ConstantNode":
          case "SymbolNode":
          case "ParenthesisNode":
            return !1;
          default:
            return !0;
        }
      });
    var m;
    switch (l.length) {
      case 0:
        m = [];
        break;
      case 1:
        {
          var v = Ye(l[0], o, c, i);
          if (s && v !== null) {
            var p, d;
            if (o === "keep" ? (p = l[0].getIdentifier(), d = i.getIdentifier()) : (p = l[0].getContent().getIdentifier(), d = i.getContent().getIdentifier()), Or[u][d].latexLeftParens === !1) {
              m = [!1];
              break;
            }
            if (Or[v][p].latexParens === !1) {
              m = [!1];
              break;
            }
          }
          if (v === null) {
            m = [!1];
            break;
          }
          if (v <= u) {
            m = [!0];
            break;
          }
          m = [!1];
        }
        break;
      case 2:
        {
          var b, x = Ye(l[0], o, c, i), D = Aa(i, l[0], o);
          x === null ? b = !1 : x === u && f === "right" && !D || x < u ? b = !0 : b = !1;
          var h, w = Ye(l[1], o, c, i), y = Aa(i, l[1], o);
          if (w === null ? h = !1 : w === u && f === "left" && !y || w < u ? h = !0 : h = !1, s) {
            var g, A, E;
            o === "keep" ? (g = i.getIdentifier(), A = i.args[0].getIdentifier(), E = i.args[1].getIdentifier()) : (g = i.getContent().getIdentifier(), A = i.args[0].getContent().getIdentifier(), E = i.args[1].getContent().getIdentifier()), x !== null && (Or[u][g].latexLeftParens === !1 && (b = !1), Or[x][A].latexParens === !1 && (b = !1)), w !== null && (Or[u][g].latexRightParens === !1 && (h = !1), Or[w][E].latexParens === !1 && (h = !1));
          }
          m = [b, h];
        }
        break;
      default:
        (i.getIdentifier() === "OperatorNode:add" || i.getIdentifier() === "OperatorNode:multiply") && (m = l.map(function(S) {
          var C = Ye(S, o, c, i), T = Aa(i, S, o), O = Xt(S, o);
          return C === null ? !1 : u === C && f === O && !T ? !0 : C < u;
        }));
        break;
    }
    if (l.length >= 2 && i.getIdentifier() === "OperatorNode:multiply" && i.implicit && o !== "all" && c === "hide")
      for (var N = 1; N < m.length; ++N)
        t(l[N], o) && !m[N - 1] && (o !== "keep" || !Ur(l[N - 1])) && (m[N] = !0);
    return m;
  }
  class a extends r {
    /**
     * @constructor OperatorNode
     * @extends {Node}
     * An operator with two arguments, like 2+3
     *
     * @param {string} op           Operator name, for example '+'
     * @param {string} fn           Function name, for example 'add'
     * @param {Node[]} args         Operator arguments
     * @param {boolean} [implicit]  Is this an implicit multiplication?
     * @param {boolean} [isPercentage] Is this an percentage Operation?
     */
    constructor(o, c, l, s, u) {
      if (super(), typeof o != "string")
        throw new TypeError('string expected for parameter "op"');
      if (typeof c != "string")
        throw new TypeError('string expected for parameter "fn"');
      if (!Array.isArray(l) || !l.every(Ve))
        throw new TypeError('Array containing Nodes expected for parameter "args"');
      this.implicit = s === !0, this.isPercentage = u === !0, this.op = o, this.fn = c, this.args = l || [];
    }
    get type() {
      return Sn;
    }
    get isOperatorNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(o, c) {
      if (typeof this.fn != "string" || !Wa(o, this.fn))
        throw o[this.fn] ? new Error('No access to function "' + this.fn + '"') : new Error("Function " + this.fn + ' missing in provided namespace "math"');
      var l = hr(o, this.fn), s = nt(this.args, function(p) {
        return p._compile(o, c);
      });
      if (typeof l == "function" && l.rawArgs === !0) {
        var u = this.args;
        return function(d, b, x) {
          return l(u, o, Qt(d, b));
        };
      } else if (s.length === 1) {
        var f = s[0];
        return function(d, b, x) {
          return l(f(d, b, x));
        };
      } else if (s.length === 2) {
        var m = s[0], v = s[1];
        return function(d, b, x) {
          return l(m(d, b, x), v(d, b, x));
        };
      } else
        return function(d, b, x) {
          return l.apply(null, nt(s, function(D) {
            return D(d, b, x);
          }));
        };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(o) {
      for (var c = 0; c < this.args.length; c++)
        o(this.args[c], "args[" + c + "]", this);
    }
    /**
     * Create a new OperatorNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {OperatorNode} Returns a transformed copy of the node
     */
    map(o) {
      for (var c = [], l = 0; l < this.args.length; l++)
        c[l] = this._ifNode(o(this.args[l], "args[" + l + "]", this));
      return new a(this.op, this.fn, c, this.implicit, this.isPercentage);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {OperatorNode}
     */
    clone() {
      return new a(this.op, this.fn, this.args.slice(0), this.implicit, this.isPercentage);
    }
    /**
     * Check whether this is an unary OperatorNode:
     * has exactly one argument, like `-a`.
     * @return {boolean}
     *     Returns true when an unary operator node, false otherwise.
     */
    isUnary() {
      return this.args.length === 1;
    }
    /**
     * Check whether this is a binary OperatorNode:
     * has exactly two arguments, like `a + b`.
     * @return {boolean}
     *     Returns true when a binary operator node, false otherwise.
     */
    isBinary() {
      return this.args.length === 2;
    }
    /**
     * Get string representation.
     * @param {Object} options
     * @return {string} str
     */
    _toString(o) {
      var c = o && o.parenthesis ? o.parenthesis : "keep", l = o && o.implicit ? o.implicit : "hide", s = this.args, u = n(this, c, l, s, !1);
      if (s.length === 1) {
        var f = Xt(this, c), m = s[0].toString(o);
        u[0] && (m = "(" + m + ")");
        var v = /[a-zA-Z]+/.test(this.op);
        return f === "right" ? this.op + (v ? " " : "") + m : f === "left" ? m + (v ? " " : "") + this.op : m + this.op;
      } else if (s.length === 2) {
        var p = s[0].toString(o), d = s[1].toString(o);
        return u[0] && (p = "(" + p + ")"), u[1] && (d = "(" + d + ")"), this.implicit && this.getIdentifier() === "OperatorNode:multiply" && l === "hide" ? p + " " + d : p + " " + this.op + " " + d;
      } else if (s.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
        var b = s.map(function(x, D) {
          return x = x.toString(o), u[D] && (x = "(" + x + ")"), x;
        });
        return this.implicit && this.getIdentifier() === "OperatorNode:multiply" && l === "hide" ? b.join(" ") : b.join(" " + this.op + " ");
      } else
        return this.fn + "(" + this.args.join(", ") + ")";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: Sn,
        op: this.op,
        fn: this.fn,
        args: this.args,
        implicit: this.implicit,
        isPercentage: this.isPercentage
      };
    }
    /**
     * Instantiate an OperatorNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     ```
     *     {"mathjs": "OperatorNode",
     *      "op": "+", "fn": "add", "args": [...],
     *      "implicit": false,
     *      "isPercentage":false}
     *     ```
     *     where mathjs is optional
     * @returns {OperatorNode}
     */
    static fromJSON(o) {
      return new a(o.op, o.fn, o.args, o.implicit, o.isPercentage);
    }
    /**
     * Get HTML representation.
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(o) {
      var c = o && o.parenthesis ? o.parenthesis : "keep", l = o && o.implicit ? o.implicit : "hide", s = this.args, u = n(this, c, l, s, !1);
      if (s.length === 1) {
        var f = Xt(this, c), m = s[0].toHTML(o);
        return u[0] && (m = '<span class="math-parenthesis math-round-parenthesis">(</span>' + m + '<span class="math-parenthesis math-round-parenthesis">)</span>'), f === "right" ? '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + Tr(this.op) + "</span>" + m : m + '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + Tr(this.op) + "</span>";
      } else if (s.length === 2) {
        var v = s[0].toHTML(o), p = s[1].toHTML(o);
        return u[0] && (v = '<span class="math-parenthesis math-round-parenthesis">(</span>' + v + '<span class="math-parenthesis math-round-parenthesis">)</span>'), u[1] && (p = '<span class="math-parenthesis math-round-parenthesis">(</span>' + p + '<span class="math-parenthesis math-round-parenthesis">)</span>'), this.implicit && this.getIdentifier() === "OperatorNode:multiply" && l === "hide" ? v + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + p : v + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + Tr(this.op) + "</span>" + p;
      } else {
        var d = s.map(function(b, x) {
          return b = b.toHTML(o), u[x] && (b = '<span class="math-parenthesis math-round-parenthesis">(</span>' + b + '<span class="math-parenthesis math-round-parenthesis">)</span>'), b;
        });
        return s.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply") ? this.implicit && this.getIdentifier() === "OperatorNode:multiply" && l === "hide" ? d.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>') : d.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + Tr(this.op) + "</span>") : '<span class="math-function">' + Tr(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + d.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
      }
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(o) {
      var c = o && o.parenthesis ? o.parenthesis : "keep", l = o && o.implicit ? o.implicit : "hide", s = this.args, u = n(this, c, l, s, !0), f = He[this.fn];
      if (f = typeof f > "u" ? this.op : f, s.length === 1) {
        var m = Xt(this, c), v = s[0].toTex(o);
        return u[0] && (v = "\\left(".concat(v, "\\right)")), m === "right" ? f + v : v + f;
      } else if (s.length === 2) {
        var p = s[0], d = p.toTex(o);
        u[0] && (d = "\\left(".concat(d, "\\right)"));
        var b = s[1], x = b.toTex(o);
        u[1] && (x = "\\left(".concat(x, "\\right)"));
        var D;
        switch (c === "keep" ? D = p.getIdentifier() : D = p.getContent().getIdentifier(), this.getIdentifier()) {
          case "OperatorNode:divide":
            return f + "{" + d + "}{" + x + "}";
          case "OperatorNode:pow":
            switch (d = "{" + d + "}", x = "{" + x + "}", D) {
              case "ConditionalNode":
              case "OperatorNode:divide":
                d = "\\left(".concat(d, "\\right)");
            }
            break;
          case "OperatorNode:multiply":
            if (this.implicit && l === "hide")
              return d + "~" + x;
        }
        return d + f + x;
      } else if (s.length > 2 && (this.getIdentifier() === "OperatorNode:add" || this.getIdentifier() === "OperatorNode:multiply")) {
        var h = s.map(function(w, y) {
          return w = w.toTex(o), u[y] && (w = "\\left(".concat(w, "\\right)")), w;
        });
        return this.getIdentifier() === "OperatorNode:multiply" && this.implicit && l === "hide" ? h.join("~") : h.join(f);
      } else
        return "\\mathrm{" + this.fn + "}\\left(" + s.map(function(w) {
          return w.toTex(o);
        }).join(",") + "\\right)";
    }
    /**
     * Get identifier.
     * @return {string}
     */
    getIdentifier() {
      return this.type + ":" + this.fn;
    }
  }
  return ar(a, "name", Sn), a;
}, {
  isClass: !0,
  isNode: !0
}), Cn = "ParenthesisNode", oD = ["Node"], sD = /* @__PURE__ */ q(Cn, oD, (e) => {
  var {
    Node: r
  } = e;
  class t extends r {
    /**
     * @constructor ParenthesisNode
     * @extends {Node}
     * A parenthesis node describes manual parenthesis from the user input
     * @param {Node} content
     * @extends {Node}
     */
    constructor(a) {
      if (super(), !Ve(a))
        throw new TypeError('Node expected for parameter "content"');
      this.content = a;
    }
    get type() {
      return Cn;
    }
    get isParenthesisNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(a, i) {
      return this.content._compile(a, i);
    }
    /**
     * Get the content of the current Node.
     * @return {Node} content
     * @override
     **/
    getContent() {
      return this.content.getContent();
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(a) {
      a(this.content, "content", this);
    }
    /**
     * Create a new ParenthesisNode whose child is the result of calling
     * the provided callback function on the child of this node.
     * @param {function(child: Node, path: string, parent: Node) : Node} callback
     * @returns {ParenthesisNode} Returns a clone of the node
     */
    map(a) {
      var i = a(this.content, "content", this);
      return new t(i);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {ParenthesisNode}
     */
    clone() {
      return new t(this.content);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(a) {
      return !a || a && !a.parenthesis || a && a.parenthesis === "keep" ? "(" + this.content.toString(a) + ")" : this.content.toString(a);
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: Cn,
        content: this.content
      };
    }
    /**
     * Instantiate an ParenthesisNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "ParenthesisNode", "content": ...}`,
     *                       where mathjs is optional
     * @returns {ParenthesisNode}
     */
    static fromJSON(a) {
      return new t(a.content);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(a) {
      return !a || a && !a.parenthesis || a && a.parenthesis === "keep" ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(a) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : this.content.toHTML(a);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toTex(a) {
      return !a || a && !a.parenthesis || a && a.parenthesis === "keep" ? "\\left(".concat(this.content.toTex(a), "\\right)") : this.content.toTex(a);
    }
  }
  return ar(t, "name", Cn), t;
}, {
  isClass: !0,
  isNode: !0
}), Mn = "RangeNode", uD = ["Node"], lD = /* @__PURE__ */ q(Mn, uD, (e) => {
  var {
    Node: r
  } = e;
  function t(a, i, o) {
    var c = Ye(a, i, o), l = {}, s = Ye(a.start, i, o);
    if (l.start = s !== null && s <= c || i === "all", a.step) {
      var u = Ye(a.step, i, o);
      l.step = u !== null && u <= c || i === "all";
    }
    var f = Ye(a.end, i, o);
    return l.end = f !== null && f <= c || i === "all", l;
  }
  class n extends r {
    /**
     * @constructor RangeNode
     * @extends {Node}
     * create a range
     * @param {Node} start  included lower-bound
     * @param {Node} end    included upper-bound
     * @param {Node} [step] optional step
     */
    constructor(i, o, c) {
      if (super(), !Ve(i)) throw new TypeError("Node expected");
      if (!Ve(o)) throw new TypeError("Node expected");
      if (c && !Ve(c)) throw new TypeError("Node expected");
      if (arguments.length > 3) throw new Error("Too many arguments");
      this.start = i, this.end = o, this.step = c || null;
    }
    get type() {
      return Mn;
    }
    get isRangeNode() {
      return !0;
    }
    /**
     * Check whether the RangeNode needs the `end` symbol to be defined.
     * This end is the size of the Matrix in current dimension.
     * @return {boolean}
     */
    needsEnd() {
      var i = this.filter(function(o) {
        return nr(o) && o.name === "end";
      });
      return i.length > 0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(i, o) {
      var c = i.range, l = this.start._compile(i, o), s = this.end._compile(i, o);
      if (this.step) {
        var u = this.step._compile(i, o);
        return function(m, v, p) {
          return c(l(m, v, p), s(m, v, p), u(m, v, p));
        };
      } else
        return function(m, v, p) {
          return c(l(m, v, p), s(m, v, p));
        };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(i) {
      i(this.start, "start", this), i(this.end, "end", this), this.step && i(this.step, "step", this);
    }
    /**
     * Create a new RangeNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {RangeNode} Returns a transformed copy of the node
     */
    map(i) {
      return new n(this._ifNode(i(this.start, "start", this)), this._ifNode(i(this.end, "end", this)), this.step && this._ifNode(i(this.step, "step", this)));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {RangeNode}
     */
    clone() {
      return new n(this.start, this.end, this.step && this.step);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(i) {
      var o = i && i.parenthesis ? i.parenthesis : "keep", c = t(this, o, i && i.implicit), l, s = this.start.toString(i);
      if (c.start && (s = "(" + s + ")"), l = s, this.step) {
        var u = this.step.toString(i);
        c.step && (u = "(" + u + ")"), l += ":" + u;
      }
      var f = this.end.toString(i);
      return c.end && (f = "(" + f + ")"), l += ":" + f, l;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: Mn,
        start: this.start,
        end: this.end,
        step: this.step
      };
    }
    /**
     * Instantiate an RangeNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "RangeNode", "start": ..., "end": ..., "step": ...}`,
     *     where mathjs is optional
     * @returns {RangeNode}
     */
    static fromJSON(i) {
      return new n(i.start, i.end, i.step);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(i) {
      var o = i && i.parenthesis ? i.parenthesis : "keep", c = t(this, o, i && i.implicit), l, s = this.start.toHTML(i);
      if (c.start && (s = '<span class="math-parenthesis math-round-parenthesis">(</span>' + s + '<span class="math-parenthesis math-round-parenthesis">)</span>'), l = s, this.step) {
        var u = this.step.toHTML(i);
        c.step && (u = '<span class="math-parenthesis math-round-parenthesis">(</span>' + u + '<span class="math-parenthesis math-round-parenthesis">)</span>'), l += '<span class="math-operator math-range-operator">:</span>' + u;
      }
      var f = this.end.toHTML(i);
      return c.end && (f = '<span class="math-parenthesis math-round-parenthesis">(</span>' + f + '<span class="math-parenthesis math-round-parenthesis">)</span>'), l += '<span class="math-operator math-range-operator">:</span>' + f, l;
    }
    /**
     * Get LaTeX representation
     * @params {Object} options
     * @return {string} str
     */
    _toTex(i) {
      var o = i && i.parenthesis ? i.parenthesis : "keep", c = t(this, o, i && i.implicit), l = this.start.toTex(i);
      if (c.start && (l = "\\left(".concat(l, "\\right)")), this.step) {
        var s = this.step.toTex(i);
        c.step && (s = "\\left(".concat(s, "\\right)")), l += ":" + s;
      }
      var u = this.end.toTex(i);
      return c.end && (u = "\\left(".concat(u, "\\right)")), l += ":" + u, l;
    }
  }
  return ar(n, "name", Mn), n;
}, {
  isClass: !0,
  isNode: !0
}), _n = "RelationalNode", cD = ["Node"], fD = /* @__PURE__ */ q(_n, cD, (e) => {
  var {
    Node: r
  } = e, t = {
    equal: "==",
    unequal: "!=",
    smaller: "<",
    larger: ">",
    smallerEq: "<=",
    largerEq: ">="
  };
  class n extends r {
    /**
     * A node representing a chained conditional expression, such as 'x > y > z'
     *
     * @param {String[]} conditionals
     *     An array of conditional operators used to compare the parameters
     * @param {Node[]} params
     *     The parameters that will be compared
     *
     * @constructor RelationalNode
     * @extends {Node}
     */
    constructor(i, o) {
      if (super(), !Array.isArray(i))
        throw new TypeError("Parameter conditionals must be an array");
      if (!Array.isArray(o))
        throw new TypeError("Parameter params must be an array");
      if (i.length !== o.length - 1)
        throw new TypeError("Parameter params must contain exactly one more element than parameter conditionals");
      this.conditionals = i, this.params = o;
    }
    get type() {
      return _n;
    }
    get isRelationalNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(i, o) {
      var c = this, l = this.params.map((s) => s._compile(i, o));
      return function(u, f, m) {
        for (var v, p = l[0](u, f, m), d = 0; d < c.conditionals.length; d++) {
          v = p, p = l[d + 1](u, f, m);
          var b = hr(i, c.conditionals[d]);
          if (!b(v, p))
            return !1;
        }
        return !0;
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(i) {
      this.params.forEach((o, c) => i(o, "params[" + c + "]", this), this);
    }
    /**
     * Create a new RelationalNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {RelationalNode} Returns a transformed copy of the node
     */
    map(i) {
      return new n(this.conditionals.slice(), this.params.map((o, c) => this._ifNode(i(o, "params[" + c + "]", this)), this));
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {RelationalNode}
     */
    clone() {
      return new n(this.conditionals, this.params);
    }
    /**
     * Get string representation.
     * @param {Object} options
     * @return {string} str
     */
    _toString(i) {
      for (var o = i && i.parenthesis ? i.parenthesis : "keep", c = Ye(this, o, i && i.implicit), l = this.params.map(function(f, m) {
        var v = Ye(f, o, i && i.implicit);
        return o === "all" || v !== null && v <= c ? "(" + f.toString(i) + ")" : f.toString(i);
      }), s = l[0], u = 0; u < this.conditionals.length; u++)
        s += " " + t[this.conditionals[u]], s += " " + l[u + 1];
      return s;
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: _n,
        conditionals: this.conditionals,
        params: this.params
      };
    }
    /**
     * Instantiate a RelationalNode from its JSON representation
     * @param {Object} json
     *     An object structured like
     *     `{"mathjs": "RelationalNode", "conditionals": ..., "params": ...}`,
     *     where mathjs is optional
     * @returns {RelationalNode}
     */
    static fromJSON(i) {
      return new n(i.conditionals, i.params);
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(i) {
      for (var o = i && i.parenthesis ? i.parenthesis : "keep", c = Ye(this, o, i && i.implicit), l = this.params.map(function(f, m) {
        var v = Ye(f, o, i && i.implicit);
        return o === "all" || v !== null && v <= c ? '<span class="math-parenthesis math-round-parenthesis">(</span>' + f.toHTML(i) + '<span class="math-parenthesis math-round-parenthesis">)</span>' : f.toHTML(i);
      }), s = l[0], u = 0; u < this.conditionals.length; u++)
        s += '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + Tr(t[this.conditionals[u]]) + "</span>" + l[u + 1];
      return s;
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(i) {
      for (var o = i && i.parenthesis ? i.parenthesis : "keep", c = Ye(this, o, i && i.implicit), l = this.params.map(function(f, m) {
        var v = Ye(f, o, i && i.implicit);
        return o === "all" || v !== null && v <= c ? "\\left(" + f.toTex(i) + "\right)" : f.toTex(i);
      }), s = l[0], u = 0; u < this.conditionals.length; u++)
        s += He[this.conditionals[u]] + l[u + 1];
      return s;
    }
  }
  return ar(n, "name", _n), n;
}, {
  isClass: !0,
  isNode: !0
}), mD = "SymbolNode", vD = ["math", "?Unit", "Node"], pD = /* @__PURE__ */ q(mD, vD, (e) => {
  var {
    math: r,
    Unit: t,
    Node: n
  } = e;
  function a(o) {
    return t ? t.isValuelessUnit(o) : !1;
  }
  class i extends n {
    /**
     * @constructor SymbolNode
     * @extends {Node}
     * A symbol node can hold and resolve a symbol
     * @param {string} name
     * @extends {Node}
     */
    constructor(c) {
      if (super(), typeof c != "string")
        throw new TypeError('String expected for parameter "name"');
      this.name = c;
    }
    get type() {
      return "SymbolNode";
    }
    get isSymbolNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(c, l) {
      var s = this.name;
      if (l[s] === !0)
        return function(f, m, v) {
          return hr(m, s);
        };
      if (s in c)
        return function(f, m, v) {
          return f.has(s) ? f.get(s) : hr(c, s);
        };
      var u = a(s);
      return function(f, m, v) {
        return f.has(s) ? f.get(s) : u ? new t(null, s) : i.onUndefinedSymbol(s);
      };
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(c) {
    }
    /**
     * Create a new SymbolNode with children produced by the given callback.
     * Trivial since a SymbolNode has no children
     * @param {function(child: Node, path: string, parent: Node) : Node} callback
     * @returns {SymbolNode} Returns a clone of the node
     */
    map(c) {
      return this.clone();
    }
    /**
     * Throws an error 'Undefined symbol {name}'
     * @param {string} name
     */
    static onUndefinedSymbol(c) {
      throw new Error("Undefined symbol " + c);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {SymbolNode}
     */
    clone() {
      return new i(this.name);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toString(c) {
      return this.name;
    }
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toHTML(c) {
      var l = Tr(this.name);
      return l === "true" || l === "false" ? '<span class="math-symbol math-boolean">' + l + "</span>" : l === "i" ? '<span class="math-symbol math-imaginary-symbol">' + l + "</span>" : l === "Infinity" ? '<span class="math-symbol math-infinity-symbol">' + l + "</span>" : l === "NaN" ? '<span class="math-symbol math-nan-symbol">' + l + "</span>" : l === "null" ? '<span class="math-symbol math-null-symbol">' + l + "</span>" : l === "undefined" ? '<span class="math-symbol math-undefined-symbol">' + l + "</span>" : '<span class="math-symbol">' + l + "</span>";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: "SymbolNode",
        name: this.name
      };
    }
    /**
     * Instantiate a SymbolNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "SymbolNode", name: "x"}`,
     *                       where mathjs is optional
     * @returns {SymbolNode}
     */
    static fromJSON(c) {
      return new i(c.name);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     * @override
     */
    _toTex(c) {
      var l = !1;
      typeof r[this.name] > "u" && a(this.name) && (l = !0);
      var s = vm(this.name, l);
      return s[0] === "\\" ? s : " " + s;
    }
  }
  return i;
}, {
  isClass: !0,
  isNode: !0
}), Fn = "FunctionNode", dD = ["math", "Node", "SymbolNode"], hD = /* @__PURE__ */ q(Fn, dD, (e) => {
  var r, {
    math: t,
    Node: n,
    SymbolNode: a
  } = e, i = (l) => Pe(l, {
    truncate: 78
  });
  function o(l, s, u) {
    for (var f = "", m = /\$(?:\{([a-z_][a-z_0-9]*)(?:\[([0-9]+)\])?\}|\$)/gi, v = 0, p; (p = m.exec(l)) !== null; )
      if (f += l.substring(v, p.index), v = p.index, p[0] === "$$")
        f += "$", v++;
      else {
        v += p[0].length;
        var d = s[p[1]];
        if (!d)
          throw new ReferenceError("Template: Property " + p[1] + " does not exist.");
        if (p[2] === void 0)
          switch (typeof d) {
            case "string":
              f += d;
              break;
            case "object":
              if (Ve(d))
                f += d.toTex(u);
              else if (Array.isArray(d))
                f += d.map(function(b, x) {
                  if (Ve(b))
                    return b.toTex(u);
                  throw new TypeError("Template: " + p[1] + "[" + x + "] is not a Node.");
                }).join(",");
              else
                throw new TypeError("Template: " + p[1] + " has to be a Node, String or array of Nodes");
              break;
            default:
              throw new TypeError("Template: " + p[1] + " has to be a Node, String or array of Nodes");
          }
        else if (Ve(d[p[2]] && d[p[2]]))
          f += d[p[2]].toTex(u);
        else
          throw new TypeError("Template: " + p[1] + "[" + p[2] + "] is not a Node.");
      }
    return f += l.slice(v), f;
  }
  class c extends n {
    /**
     * @constructor FunctionNode
     * @extends {./Node}
     * invoke a list with arguments on a node
     * @param {./Node | string} fn
     *     Item resolving to a function on which to invoke
     *     the arguments, typically a SymbolNode or AccessorNode
     * @param {./Node[]} args
     */
    constructor(s, u) {
      if (super(), typeof s == "string" && (s = new a(s)), !Ve(s)) throw new TypeError('Node expected as parameter "fn"');
      if (!Array.isArray(u) || !u.every(Ve))
        throw new TypeError('Array containing Nodes expected for parameter "args"');
      this.fn = s, this.args = u || [];
    }
    // readonly property name
    get name() {
      return this.fn.name || "";
    }
    get type() {
      return Fn;
    }
    get isFunctionNode() {
      return !0;
    }
    /**
     * Compile a node into a JavaScript function.
     * This basically pre-calculates as much as possible and only leaves open
     * calculations which depend on a dynamic scope with variables.
     * @param {Object} math     Math.js namespace with functions and constants.
     * @param {Object} argNames An object with argument names as key and `true`
     *                          as value. Used in the SymbolNode to optimize
     *                          for arguments from user assigned functions
     *                          (see FunctionAssignmentNode) or special symbols
     *                          like `end` (see IndexNode).
     * @return {function} Returns a function which can be called like:
     *                        evalNode(scope: Object, args: Object, context: *)
     */
    _compile(s, u) {
      var f = this.args.map((E) => E._compile(s, u));
      if (nr(this.fn)) {
        var m = this.fn.name;
        if (u[m]) {
          var x = this.args;
          return function(N, S, C) {
            var T = hr(S, m);
            if (typeof T != "function")
              throw new TypeError("Argument '".concat(m, "' was not a function; received: ").concat(i(T)));
            if (T.rawArgs)
              return T(x, s, Qt(N, S));
            var O = f.map((I) => I(N, S, C));
            return T.apply(T, O);
          };
        } else {
          var v = m in s ? hr(s, m) : void 0, p = typeof v == "function" && v.rawArgs === !0, d = (E) => {
            var N;
            if (E.has(m))
              N = E.get(m);
            else if (m in s)
              N = hr(s, m);
            else
              return c.onUndefinedFunction(m);
            if (typeof N == "function")
              return N;
            throw new TypeError("'".concat(m, `' is not a function; its value is:
  `).concat(i(N)));
          };
          if (p) {
            var b = this.args;
            return function(N, S, C) {
              var T = d(N);
              if (T.rawArgs === !0)
                return T(b, s, Qt(N, S));
              var O = f.map((I) => I(N, S, C));
              return T(...O);
            };
          } else
            switch (f.length) {
              case 0:
                return function(N, S, C) {
                  var T = d(N);
                  return T();
                };
              case 1:
                return function(N, S, C) {
                  var T = d(N), O = f[0];
                  return T(O(N, S, C));
                };
              case 2:
                return function(N, S, C) {
                  var T = d(N), O = f[0], I = f[1];
                  return T(O(N, S, C), I(N, S, C));
                };
              default:
                return function(N, S, C) {
                  var T = d(N), O = f.map((I) => I(N, S, C));
                  return T(...O);
                };
            }
        }
      } else if (at(this.fn) && gt(this.fn.index) && this.fn.index.isObjectProperty()) {
        var D = this.fn.object._compile(s, u), h = this.fn.index.getObjectProperty(), w = this.args;
        return function(N, S, C) {
          var T = D(N, S, C), O = ev(T, h);
          if (O != null && O.rawArgs)
            return O(w, s, Qt(N, S));
          var I = f.map(($) => $(N, S, C));
          return O.apply(T, I);
        };
      } else {
        var y = this.fn.toString(), g = this.fn._compile(s, u), A = this.args;
        return function(N, S, C) {
          var T = g(N, S, C);
          if (typeof T != "function")
            throw new TypeError("Expression '".concat(y, "' did not evaluate to a function; value is:") + `
  `.concat(i(T)));
          if (T.rawArgs)
            return T(A, s, Qt(N, S));
          var O = f.map((I) => I(N, S, C));
          return T.apply(T, O);
        };
      }
    }
    /**
     * Execute a callback for each of the child nodes of this node
     * @param {function(child: Node, path: string, parent: Node)} callback
     */
    forEach(s) {
      s(this.fn, "fn", this);
      for (var u = 0; u < this.args.length; u++)
        s(this.args[u], "args[" + u + "]", this);
    }
    /**
     * Create a new FunctionNode whose children are the results of calling
     * the provided callback function for each child of the original node.
     * @param {function(child: Node, path: string, parent: Node): Node} callback
     * @returns {FunctionNode} Returns a transformed copy of the node
     */
    map(s) {
      for (var u = this._ifNode(s(this.fn, "fn", this)), f = [], m = 0; m < this.args.length; m++)
        f[m] = this._ifNode(s(this.args[m], "args[" + m + "]", this));
      return new c(u, f);
    }
    /**
     * Create a clone of this node, a shallow copy
     * @return {FunctionNode}
     */
    clone() {
      return new c(this.fn, this.args.slice(0));
    }
    /**
     * Throws an error 'Undefined function {name}'
     * @param {string} name
     */
    /**
     * Get string representation. (wrapper function)
     * This overrides parts of Node's toString function.
     * If callback is an object containing callbacks, it
     * calls the correct callback for the current node,
     * otherwise it falls back to calling Node's toString
     * function.
     *
     * @param {Object} options
     * @return {string} str
     * @override
     */
    toString(s) {
      var u, f = this.fn.toString(s);
      return s && typeof s.handler == "object" && De(s.handler, f) && (u = s.handler[f](this, s)), typeof u < "u" ? u : super.toString(s);
    }
    /**
     * Get string representation
     * @param {Object} options
     * @return {string} str
     */
    _toString(s) {
      var u = this.args.map(function(m) {
        return m.toString(s);
      }), f = Pt(this.fn) ? "(" + this.fn.toString(s) + ")" : this.fn.toString(s);
      return f + "(" + u.join(", ") + ")";
    }
    /**
     * Get a JSON representation of the node
     * @returns {Object}
     */
    toJSON() {
      return {
        mathjs: Fn,
        fn: this.fn,
        args: this.args
      };
    }
    /**
     * Instantiate an AssignmentNode from its JSON representation
     * @param {Object} json  An object structured like
     *                       `{"mathjs": "FunctionNode", fn: ..., args: ...}`,
     *                       where mathjs is optional
     * @returns {FunctionNode}
     */
    /**
     * Get HTML representation
     * @param {Object} options
     * @return {string} str
     */
    _toHTML(s) {
      var u = this.args.map(function(f) {
        return f.toHTML(s);
      });
      return '<span class="math-function">' + Tr(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + u.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }
    /**
     * Get LaTeX representation. (wrapper function)
     * This overrides parts of Node's toTex function.
     * If callback is an object containing callbacks, it
     * calls the correct callback for the current node,
     * otherwise it falls back to calling Node's toTex
     * function.
     *
     * @param {Object} options
     * @return {string}
     */
    toTex(s) {
      var u;
      return s && typeof s.handler == "object" && De(s.handler, this.name) && (u = s.handler[this.name](this, s)), typeof u < "u" ? u : super.toTex(s);
    }
    /**
     * Get LaTeX representation
     * @param {Object} options
     * @return {string} str
     */
    _toTex(s) {
      var u = this.args.map(function(v) {
        return v.toTex(s);
      }), f;
      Lu[this.name] && (f = Lu[this.name]), t[this.name] && (typeof t[this.name].toTex == "function" || typeof t[this.name].toTex == "object" || typeof t[this.name].toTex == "string") && (f = t[this.name].toTex);
      var m;
      switch (typeof f) {
        case "function":
          m = f(this, s);
          break;
        case "string":
          m = o(f, this, s);
          break;
        case "object":
          switch (typeof f[u.length]) {
            case "function":
              m = f[u.length](this, s);
              break;
            case "string":
              m = o(f[u.length], this, s);
              break;
          }
      }
      return typeof m < "u" ? m : o(Xw, this, s);
    }
    /**
     * Get identifier.
     * @return {string}
     */
    getIdentifier() {
      return this.type + ":" + this.name;
    }
  }
  return r = c, ar(c, "name", Fn), ar(c, "onUndefinedFunction", function(l) {
    throw new Error("Undefined function " + l);
  }), ar(c, "fromJSON", function(l) {
    return new r(l.fn, l.args);
  }), c;
}, {
  isClass: !0,
  isNode: !0
}), Hu = "parse", gD = ["typed", "numeric", "config", "AccessorNode", "ArrayNode", "AssignmentNode", "BlockNode", "ConditionalNode", "ConstantNode", "FunctionAssignmentNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "RangeNode", "RelationalNode", "SymbolNode"], yD = /* @__PURE__ */ q(Hu, gD, (e) => {
  var {
    typed: r,
    numeric: t,
    config: n,
    AccessorNode: a,
    ArrayNode: i,
    AssignmentNode: o,
    BlockNode: c,
    ConditionalNode: l,
    ConstantNode: s,
    FunctionAssignmentNode: u,
    FunctionNode: f,
    IndexNode: m,
    ObjectNode: v,
    OperatorNode: p,
    ParenthesisNode: d,
    RangeNode: b,
    RelationalNode: x,
    SymbolNode: D
  } = e, h = r(Hu, {
    string: function(G) {
      return Q(G, {});
    },
    "Array | Matrix": function(G) {
      return w(G, {});
    },
    "string, Object": function(G, ae) {
      var ye = ae.nodes !== void 0 ? ae.nodes : {};
      return Q(G, ye);
    },
    "Array | Matrix, Object": w
  });
  function w(M) {
    var G = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, ae = G.nodes !== void 0 ? G.nodes : {};
    return ze(M, function(ye) {
      if (typeof ye != "string") throw new TypeError("String expected");
      return Q(ye, ae);
    });
  }
  var y = {
    NULL: 0,
    DELIMITER: 1,
    NUMBER: 2,
    SYMBOL: 3,
    UNKNOWN: 4
  }, g = {
    ",": !0,
    "(": !0,
    ")": !0,
    "[": !0,
    "]": !0,
    "{": !0,
    "}": !0,
    '"': !0,
    "'": !0,
    ";": !0,
    "+": !0,
    "-": !0,
    "*": !0,
    ".*": !0,
    "/": !0,
    "./": !0,
    "%": !0,
    "^": !0,
    ".^": !0,
    "~": !0,
    "!": !0,
    "&": !0,
    "|": !0,
    "^|": !0,
    "=": !0,
    ":": !0,
    "?": !0,
    "==": !0,
    "!=": !0,
    "<": !0,
    ">": !0,
    "<=": !0,
    ">=": !0,
    "<<": !0,
    ">>": !0,
    ">>>": !0
  }, A = {
    mod: !0,
    to: !0,
    in: !0,
    and: !0,
    xor: !0,
    or: !0,
    not: !0
  }, E = {
    true: !0,
    false: !1,
    null: null,
    undefined: void 0
  }, N = ["NaN", "Infinity"], S = {
    '"': '"',
    "'": "'",
    "\\": "\\",
    "/": "/",
    b: "\b",
    f: "\f",
    n: `
`,
    r: "\r",
    t: "	"
    // note that \u is handled separately in parseStringToken()
  };
  function C() {
    return {
      extraNodes: {},
      // current extra nodes, must be careful not to mutate
      expression: "",
      // current expression
      comment: "",
      // last parsed comment
      index: 0,
      // current index in expr
      token: "",
      // current token
      tokenType: y.NULL,
      // type of the token
      nestingLevel: 0,
      // level of nesting inside parameters, used to ignore newline characters
      conditionalLevel: null
      // when a conditional is being parsed, the level of the conditional is stored here
    };
  }
  function T(M, G) {
    return M.expression.substr(M.index, G);
  }
  function O(M) {
    return T(M, 1);
  }
  function I(M) {
    M.index++;
  }
  function $(M) {
    return M.expression.charAt(M.index - 1);
  }
  function F(M) {
    return M.expression.charAt(M.index + 1);
  }
  function _(M) {
    for (M.tokenType = y.NULL, M.token = "", M.comment = ""; ; ) {
      if (O(M) === "#")
        for (; O(M) !== `
` && O(M) !== ""; )
          M.comment += O(M), I(M);
      if (h.isWhitespace(O(M), M.nestingLevel))
        I(M);
      else
        break;
    }
    if (O(M) === "") {
      M.tokenType = y.DELIMITER;
      return;
    }
    if (O(M) === `
` && !M.nestingLevel) {
      M.tokenType = y.DELIMITER, M.token = O(M), I(M);
      return;
    }
    var G = O(M), ae = T(M, 2), ye = T(M, 3);
    if (ye.length === 3 && g[ye]) {
      M.tokenType = y.DELIMITER, M.token = ye, I(M), I(M), I(M);
      return;
    }
    if (ae.length === 2 && g[ae]) {
      M.tokenType = y.DELIMITER, M.token = ae, I(M), I(M);
      return;
    }
    if (g[G]) {
      M.tokenType = y.DELIMITER, M.token = G, I(M);
      return;
    }
    if (h.isDigitDot(G)) {
      M.tokenType = y.NUMBER;
      var Fe = T(M, 2);
      if (Fe === "0b" || Fe === "0o" || Fe === "0x") {
        for (M.token += O(M), I(M), M.token += O(M), I(M); h.isHexDigit(O(M)); )
          M.token += O(M), I(M);
        if (O(M) === ".")
          for (M.token += ".", I(M); h.isHexDigit(O(M)); )
            M.token += O(M), I(M);
        else if (O(M) === "i")
          for (M.token += "i", I(M); h.isDigit(O(M)); )
            M.token += O(M), I(M);
        return;
      }
      if (O(M) === ".") {
        if (M.token += O(M), I(M), !h.isDigit(O(M))) {
          M.tokenType = y.DELIMITER;
          return;
        }
      } else {
        for (; h.isDigit(O(M)); )
          M.token += O(M), I(M);
        h.isDecimalMark(O(M), F(M)) && (M.token += O(M), I(M));
      }
      for (; h.isDigit(O(M)); )
        M.token += O(M), I(M);
      if (O(M) === "E" || O(M) === "e") {
        if (h.isDigit(F(M)) || F(M) === "-" || F(M) === "+") {
          if (M.token += O(M), I(M), (O(M) === "+" || O(M) === "-") && (M.token += O(M), I(M)), !h.isDigit(O(M)))
            throw Ee(M, 'Digit expected, got "' + O(M) + '"');
          for (; h.isDigit(O(M)); )
            M.token += O(M), I(M);
          if (h.isDecimalMark(O(M), F(M)))
            throw Ee(M, 'Digit expected, got "' + O(M) + '"');
        } else if (F(M) === ".")
          throw I(M), Ee(M, 'Digit expected, got "' + O(M) + '"');
      }
      return;
    }
    if (h.isAlpha(O(M), $(M), F(M))) {
      for (; h.isAlpha(O(M), $(M), F(M)) || h.isDigit(O(M)); )
        M.token += O(M), I(M);
      De(A, M.token) ? M.tokenType = y.DELIMITER : M.tokenType = y.SYMBOL;
      return;
    }
    for (M.tokenType = y.UNKNOWN; O(M) !== ""; )
      M.token += O(M), I(M);
    throw Ee(M, 'Syntax error in part "' + M.token + '"');
  }
  function L(M) {
    do
      _(M);
    while (M.token === `
`);
  }
  function B(M) {
    M.nestingLevel++;
  }
  function W(M) {
    M.nestingLevel--;
  }
  h.isAlpha = function(G, ae, ye) {
    return h.isValidLatinOrGreek(G) || h.isValidMathSymbol(G, ye) || h.isValidMathSymbol(ae, G);
  }, h.isValidLatinOrGreek = function(G) {
    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(G);
  }, h.isValidMathSymbol = function(G, ae) {
    return /^[\uD835]$/.test(G) && /^[\uDC00-\uDFFF]$/.test(ae) && /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(ae);
  }, h.isWhitespace = function(G, ae) {
    return G === " " || G === "	" || G === `
` && ae > 0;
  }, h.isDecimalMark = function(G, ae) {
    return G === "." && ae !== "/" && ae !== "*" && ae !== "^";
  }, h.isDigitDot = function(G) {
    return G >= "0" && G <= "9" || G === ".";
  }, h.isDigit = function(G) {
    return G >= "0" && G <= "9";
  }, h.isHexDigit = function(G) {
    return G >= "0" && G <= "9" || G >= "a" && G <= "f" || G >= "A" && G <= "F";
  };
  function Q(M, G) {
    var ae = C();
    vr(ae, {
      expression: M,
      extraNodes: G
    }), _(ae);
    var ye = Z(ae);
    if (ae.token !== "")
      throw ae.tokenType === y.DELIMITER ? je(ae, "Unexpected operator " + ae.token) : Ee(ae, 'Unexpected part "' + ae.token + '"');
    return ye;
  }
  function Z(M) {
    var G, ae = [], ye;
    for (M.token !== "" && M.token !== `
` && M.token !== ";" && (G = z(M), M.comment && (G.comment = M.comment)); M.token === `
` || M.token === ";"; )
      ae.length === 0 && G && (ye = M.token !== ";", ae.push({
        node: G,
        visible: ye
      })), _(M), M.token !== `
` && M.token !== ";" && M.token !== "" && (G = z(M), M.comment && (G.comment = M.comment), ye = M.token !== ";", ae.push({
        node: G,
        visible: ye
      }));
    return ae.length > 0 ? new c(ae) : (G || (G = new s(void 0), M.comment && (G.comment = M.comment)), G);
  }
  function z(M) {
    var G, ae, ye, Fe, qe = J(M);
    if (M.token === "=") {
      if (nr(qe))
        return G = qe.name, L(M), ye = z(M), new o(new D(G), ye);
      if (at(qe))
        return L(M), ye = z(M), new o(qe.object, qe.index, ye);
      if (Yr(qe) && nr(qe.fn) && (Fe = !0, ae = [], G = qe.name, qe.args.forEach(function(Ar, ga) {
        nr(Ar) ? ae[ga] = Ar.name : Fe = !1;
      }), Fe))
        return L(M), ye = z(M), new u(G, ae, ye);
      throw Ee(M, "Invalid left hand side of assignment operator =");
    }
    return qe;
  }
  function J(M) {
    for (var G = le(M); M.token === "?"; ) {
      var ae = M.conditionalLevel;
      M.conditionalLevel = M.nestingLevel, L(M);
      var ye = G, Fe = z(M);
      if (M.token !== ":") throw Ee(M, "False part of conditional expression expected");
      M.conditionalLevel = null, L(M);
      var qe = z(M);
      G = new l(ye, Fe, qe), M.conditionalLevel = ae;
    }
    return G;
  }
  function le(M) {
    for (var G = K(M); M.token === "or"; )
      L(M), G = new p("or", "or", [G, K(M)]);
    return G;
  }
  function K(M) {
    for (var G = re(M); M.token === "xor"; )
      L(M), G = new p("xor", "xor", [G, re(M)]);
    return G;
  }
  function re(M) {
    for (var G = ie(M); M.token === "and"; )
      L(M), G = new p("and", "and", [G, ie(M)]);
    return G;
  }
  function ie(M) {
    for (var G = j(M); M.token === "|"; )
      L(M), G = new p("|", "bitOr", [G, j(M)]);
    return G;
  }
  function j(M) {
    for (var G = te(M); M.token === "^|"; )
      L(M), G = new p("^|", "bitXor", [G, te(M)]);
    return G;
  }
  function te(M) {
    for (var G = oe(M); M.token === "&"; )
      L(M), G = new p("&", "bitAnd", [G, oe(M)]);
    return G;
  }
  function oe(M) {
    for (var G = [me(M)], ae = [], ye = {
      "==": "equal",
      "!=": "unequal",
      "<": "smaller",
      ">": "larger",
      "<=": "smallerEq",
      ">=": "largerEq"
    }; De(ye, M.token); ) {
      var Fe = {
        name: M.token,
        fn: ye[M.token]
      };
      ae.push(Fe), L(M), G.push(me(M));
    }
    return G.length === 1 ? G[0] : G.length === 2 ? new p(ae[0].name, ae[0].fn, G) : new x(ae.map((qe) => qe.fn), G);
  }
  function me(M) {
    var G, ae, ye, Fe;
    G = be(M);
    for (var qe = {
      "<<": "leftShift",
      ">>": "rightArithShift",
      ">>>": "rightLogShift"
    }; De(qe, M.token); )
      ae = M.token, ye = qe[ae], L(M), Fe = [G, be(M)], G = new p(ae, ye, Fe);
    return G;
  }
  function be(M) {
    var G, ae, ye, Fe;
    G = we(M);
    for (var qe = {
      to: "to",
      in: "to"
      // alias of 'to'
    }; De(qe, M.token); )
      ae = M.token, ye = qe[ae], L(M), ae === "in" && M.token === "" ? G = new p("*", "multiply", [G, new D("in")], !0) : (Fe = [G, we(M)], G = new p(ae, ye, Fe));
    return G;
  }
  function we(M) {
    var G, ae = [];
    if (M.token === ":" ? G = new s(1) : G = P(M), M.token === ":" && M.conditionalLevel !== M.nestingLevel) {
      for (ae.push(G); M.token === ":" && ae.length < 3; )
        L(M), M.token === ")" || M.token === "]" || M.token === "," || M.token === "" ? ae.push(new D("end")) : ae.push(P(M));
      ae.length === 3 ? G = new b(ae[0], ae[2], ae[1]) : G = new b(ae[0], ae[1]);
    }
    return G;
  }
  function P(M) {
    var G, ae, ye, Fe;
    G = H(M);
    for (var qe = {
      "+": "add",
      "-": "subtract"
    }; De(qe, M.token); ) {
      ae = M.token, ye = qe[ae], L(M);
      var Ar = H(M);
      Ar.isPercentage ? Fe = [G, new p("*", "multiply", [G, Ar])] : Fe = [G, Ar], G = new p(ae, ye, Fe);
    }
    return G;
  }
  function H(M) {
    var G, ae, ye, Fe;
    G = ee(M), ae = G;
    for (var qe = {
      "*": "multiply",
      ".*": "dotMultiply",
      "/": "divide",
      "./": "dotDivide"
    }; De(qe, M.token); )
      ye = M.token, Fe = qe[ye], L(M), ae = ee(M), G = new p(ye, Fe, [G, ae]);
    return G;
  }
  function ee(M) {
    var G, ae;
    for (G = k(M), ae = G; M.tokenType === y.SYMBOL || M.token === "in" && ke(G) || M.token === "in" && rr(G) && G.fn === "unaryMinus" && ke(G.args[0]) || M.tokenType === y.NUMBER && !ke(ae) && (!rr(ae) || ae.op === "!") || M.token === "("; )
      ae = k(M), G = new p(
        "*",
        "multiply",
        [G, ae],
        !0
        /* implicit */
      );
    return G;
  }
  function k(M) {
    for (var G = V(M), ae = G, ye = []; M.token === "/" && Ca(ae); )
      if (ye.push(vr({}, M)), L(M), M.tokenType === y.NUMBER)
        if (ye.push(vr({}, M)), L(M), M.tokenType === y.SYMBOL || M.token === "(")
          vr(M, ye.pop()), ye.pop(), ae = V(M), G = new p("/", "divide", [G, ae]);
        else {
          ye.pop(), vr(M, ye.pop());
          break;
        }
      else {
        vr(M, ye.pop());
        break;
      }
    return G;
  }
  function V(M) {
    var G, ae, ye, Fe;
    G = X(M);
    for (var qe = {
      "%": "mod",
      mod: "mod"
    }; De(qe, M.token); )
      ae = M.token, ye = qe[ae], L(M), ae === "%" && M.tokenType === y.DELIMITER && M.token !== "(" ? G = new p("/", "divide", [G, new s(100)], !1, !0) : (Fe = [G, X(M)], G = new p(ae, ye, Fe));
    return G;
  }
  function X(M) {
    var G, ae, ye, Fe = {
      "-": "unaryMinus",
      "+": "unaryPlus",
      "~": "bitNot",
      not: "not"
    };
    return De(Fe, M.token) ? (ye = Fe[M.token], G = M.token, L(M), ae = [X(M)], new p(G, ye, ae)) : fe(M);
  }
  function fe(M) {
    var G, ae, ye, Fe;
    return G = ce(M), (M.token === "^" || M.token === ".^") && (ae = M.token, ye = ae === "^" ? "pow" : "dotPow", L(M), Fe = [G, X(M)], G = new p(ae, ye, Fe)), G;
  }
  function ce(M) {
    var G, ae, ye, Fe;
    G = R(M);
    for (var qe = {
      "!": "factorial",
      "'": "ctranspose"
    }; De(qe, M.token); )
      ae = M.token, ye = qe[ae], _(M), Fe = [G], G = new p(ae, ye, Fe), G = Y(M, G);
    return G;
  }
  function R(M) {
    var G = [];
    if (M.tokenType === y.SYMBOL && De(M.extraNodes, M.token)) {
      var ae = M.extraNodes[M.token];
      if (_(M), M.token === "(") {
        if (G = [], B(M), _(M), M.token !== ")")
          for (G.push(z(M)); M.token === ","; )
            _(M), G.push(z(M));
        if (M.token !== ")")
          throw Ee(M, "Parenthesis ) expected");
        W(M), _(M);
      }
      return new ae(G);
    }
    return U(M);
  }
  function U(M) {
    var G, ae;
    return M.tokenType === y.SYMBOL || M.tokenType === y.DELIMITER && M.token in A ? (ae = M.token, _(M), De(E, ae) ? G = new s(E[ae]) : N.includes(ae) ? G = new s(t(ae, "number")) : G = new D(ae), G = Y(M, G), G) : ne(M);
  }
  function Y(M, G, ae) {
    for (var ye; (M.token === "(" || M.token === "[" || M.token === ".") && !ae; )
      if (ye = [], M.token === "(")
        if (nr(G) || at(G)) {
          if (B(M), _(M), M.token !== ")")
            for (ye.push(z(M)); M.token === ","; )
              _(M), ye.push(z(M));
          if (M.token !== ")")
            throw Ee(M, "Parenthesis ) expected");
          W(M), _(M), G = new f(G, ye);
        } else
          return G;
      else if (M.token === "[") {
        if (B(M), _(M), M.token !== "]")
          for (ye.push(z(M)); M.token === ","; )
            _(M), ye.push(z(M));
        if (M.token !== "]")
          throw Ee(M, "Parenthesis ] expected");
        W(M), _(M), G = new a(G, new m(ye));
      } else {
        _(M);
        var Fe = M.tokenType === y.SYMBOL || M.tokenType === y.DELIMITER && M.token in A;
        if (!Fe)
          throw Ee(M, "Property name expected after dot");
        ye.push(new s(M.token)), _(M);
        var qe = !0;
        G = new a(G, new m(ye, qe));
      }
    return G;
  }
  function ne(M) {
    var G, ae;
    return M.token === '"' || M.token === "'" ? (ae = se(M, M.token), G = new s(ae), G = Y(M, G), G) : ue(M);
  }
  function se(M, G) {
    for (var ae = ""; O(M) !== "" && O(M) !== G; )
      if (O(M) === "\\") {
        I(M);
        var ye = O(M), Fe = S[ye];
        if (Fe !== void 0)
          ae += Fe, M.index += 1;
        else if (ye === "u") {
          var qe = M.expression.slice(M.index + 1, M.index + 5);
          if (/^[0-9A-Fa-f]{4}$/.test(qe))
            ae += String.fromCharCode(parseInt(qe, 16)), M.index += 5;
          else
            throw Ee(M, "Invalid unicode character \\u".concat(qe));
        } else
          throw Ee(M, "Bad escape character \\".concat(ye));
      } else
        ae += O(M), I(M);
    if (_(M), M.token !== G)
      throw Ee(M, "End of string ".concat(G, " expected"));
    return _(M), ae;
  }
  function ue(M) {
    var G, ae, ye, Fe;
    if (M.token === "[") {
      if (B(M), _(M), M.token !== "]") {
        var qe = he(M);
        if (M.token === ";") {
          for (ye = 1, ae = [qe]; M.token === ";"; )
            _(M), M.token !== "]" && (ae[ye] = he(M), ye++);
          if (M.token !== "]")
            throw Ee(M, "End of matrix ] expected");
          W(M), _(M), Fe = ae[0].items.length;
          for (var Ar = 1; Ar < ye; Ar++)
            if (ae[Ar].items.length !== Fe)
              throw je(M, "Column dimensions mismatch (" + ae[Ar].items.length + " !== " + Fe + ")");
          G = new i(ae);
        } else {
          if (M.token !== "]")
            throw Ee(M, "End of matrix ] expected");
          W(M), _(M), G = qe;
        }
      } else
        W(M), _(M), G = new i([]);
      return Y(M, G);
    }
    return de(M);
  }
  function he(M) {
    for (var G = [z(M)], ae = 1; M.token === ","; )
      _(M), M.token !== "]" && M.token !== ";" && (G[ae] = z(M), ae++);
    return new i(G);
  }
  function de(M) {
    if (M.token === "{") {
      B(M);
      var G, ae = {};
      do
        if (_(M), M.token !== "}") {
          if (M.token === '"' || M.token === "'")
            G = se(M, M.token);
          else if (M.tokenType === y.SYMBOL || M.tokenType === y.DELIMITER && M.token in A)
            G = M.token, _(M);
          else
            throw Ee(M, "Symbol or string expected as object key");
          if (M.token !== ":")
            throw Ee(M, "Colon : expected after object key");
          _(M), ae[G] = z(M);
        }
      while (M.token === ",");
      if (M.token !== "}")
        throw Ee(M, "Comma , or bracket } expected after object value");
      W(M), _(M);
      var ye = new v(ae);
      return ye = Y(M, ye), ye;
    }
    return xe(M);
  }
  function xe(M) {
    var G;
    if (M.tokenType === y.NUMBER) {
      G = M.token, _(M);
      var ae = st(G, n), ye = t(G, ae);
      return new s(ye);
    }
    return ge(M);
  }
  function ge(M) {
    var G;
    if (M.token === "(") {
      if (B(M), _(M), G = z(M), M.token !== ")")
        throw Ee(M, "Parenthesis ) expected");
      return W(M), _(M), G = new d(G), G = Y(M, G), G;
    }
    return Ue(M);
  }
  function Ue(M) {
    throw M.token === "" ? Ee(M, "Unexpected end of expression") : Ee(M, "Value expected");
  }
  function Le(M) {
    return M.index - M.token.length + 1;
  }
  function Ee(M, G) {
    var ae = Le(M), ye = new SyntaxError(G + " (char " + ae + ")");
    return ye.char = ae, ye;
  }
  function je(M, G) {
    var ae = Le(M), ye = new SyntaxError(G + " (char " + ae + ")");
    return ye.char = ae, ye;
  }
  return r.addConversion({
    from: "string",
    to: "Node",
    convert: h
  }), h;
}), Gu = "compile", bD = ["typed", "parse"], xD = /* @__PURE__ */ q(Gu, bD, (e) => {
  var {
    typed: r,
    parse: t
  } = e;
  return r(Gu, {
    string: function(a) {
      return t(a).compile();
    },
    "Array | Matrix": function(a) {
      return ze(a, function(i) {
        return t(i).compile();
      });
    }
  });
}), Zu = "evaluate", wD = ["typed", "parse"], DD = /* @__PURE__ */ q(Zu, wD, (e) => {
  var {
    typed: r,
    parse: t
  } = e;
  return r(Zu, {
    string: function(a) {
      var i = jt();
      return t(a).compile().evaluate(i);
    },
    "string, Map | Object": function(a, i) {
      return t(a).compile().evaluate(i);
    },
    "Array | Matrix": function(a) {
      var i = jt();
      return ze(a, function(o) {
        return t(o).compile().evaluate(i);
      });
    },
    "Array | Matrix, Map | Object": function(a, i) {
      return ze(a, function(o) {
        return t(o).compile().evaluate(i);
      });
    }
  });
}), ND = "Parser", AD = ["evaluate"], ED = /* @__PURE__ */ q(ND, AD, (e) => {
  var {
    evaluate: r
  } = e;
  function t() {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    Object.defineProperty(this, "scope", {
      value: jt(),
      writable: !1
    });
  }
  return t.prototype.type = "Parser", t.prototype.isParser = !0, t.prototype.evaluate = function(n) {
    return r(n, this.scope);
  }, t.prototype.get = function(n) {
    if (this.scope.has(n))
      return this.scope.get(n);
  }, t.prototype.getAll = function() {
    return av(this.scope);
  }, t.prototype.getAllAsMap = function() {
    return this.scope;
  }, t.prototype.set = function(n, a) {
    return this.scope.set(n, a), a;
  }, t.prototype.remove = function(n) {
    this.scope.delete(n);
  }, t.prototype.clear = function() {
    this.scope.clear();
  }, t;
}, {
  isClass: !0
}), Vu = "parser", SD = ["typed", "Parser"], CD = /* @__PURE__ */ q(Vu, SD, (e) => {
  var {
    typed: r,
    Parser: t
  } = e;
  return r(Vu, {
    "": function() {
      return new t();
    }
  });
}), Wu = "lup", MD = ["typed", "matrix", "abs", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "larger", "equalScalar", "unaryMinus", "DenseMatrix", "SparseMatrix", "Spa"], _D = /* @__PURE__ */ q(Wu, MD, (e) => {
  var {
    typed: r,
    matrix: t,
    abs: n,
    addScalar: a,
    divideScalar: i,
    multiplyScalar: o,
    subtractScalar: c,
    larger: l,
    equalScalar: s,
    unaryMinus: u,
    DenseMatrix: f,
    SparseMatrix: m,
    Spa: v
  } = e;
  return r(Wu, {
    DenseMatrix: function(x) {
      return p(x);
    },
    SparseMatrix: function(x) {
      return d(x);
    },
    Array: function(x) {
      var D = t(x), h = p(D);
      return {
        L: h.L.valueOf(),
        U: h.U.valueOf(),
        p: h.p
      };
    }
  });
  function p(b) {
    var x = b._size[0], D = b._size[1], h = Math.min(x, D), w = Me(b._data), y = [], g = [x, h], A = [], E = [h, D], N, S, C, T = [];
    for (N = 0; N < x; N++)
      T[N] = N;
    for (S = 0; S < D; S++) {
      if (S > 0)
        for (N = 0; N < x; N++) {
          var O = Math.min(N, S), I = 0;
          for (C = 0; C < O; C++)
            I = a(I, o(w[N][C], w[C][S]));
          w[N][S] = c(w[N][S], I);
        }
      var $ = S, F = 0, _ = 0;
      for (N = S; N < x; N++) {
        var L = w[N][S], B = n(L);
        l(B, F) && ($ = N, F = B, _ = L);
      }
      if (S !== $ && (T[S] = [T[$], T[$] = T[S]][0], f._swapRows(S, $, w)), S < x)
        for (N = S + 1; N < x; N++) {
          var W = w[N][S];
          s(W, 0) || (w[N][S] = i(w[N][S], _));
        }
    }
    for (S = 0; S < D; S++)
      for (N = 0; N < x; N++) {
        if (S === 0 && (N < D && (A[N] = []), y[N] = []), N < S) {
          N < D && (A[N][S] = w[N][S]), S < x && (y[N][S] = 0);
          continue;
        }
        if (N === S) {
          N < D && (A[N][S] = w[N][S]), S < x && (y[N][S] = 1);
          continue;
        }
        N < D && (A[N][S] = 0), S < x && (y[N][S] = w[N][S]);
      }
    var Q = new f({
      data: y,
      size: g
    }), Z = new f({
      data: A,
      size: E
    }), z = [];
    for (N = 0, h = T.length; N < h; N++)
      z[T[N]] = N;
    return {
      L: Q,
      U: Z,
      p: z,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
  function d(b) {
    var x = b._size[0], D = b._size[1], h = Math.min(x, D), w = b._values, y = b._index, g = b._ptr, A = [], E = [], N = [], S = [x, h], C = [], T = [], O = [], I = [h, D], $, F, _, L = [], B = [];
    for ($ = 0; $ < x; $++)
      L[$] = $, B[$] = $;
    var W = function(z, J) {
      var le = B[z], K = B[J];
      L[le] = J, L[K] = z, B[z] = K, B[J] = le;
    }, Q = function() {
      var z = new v();
      F < x && (N.push(A.length), A.push(1), E.push(F)), O.push(C.length);
      var J = g[F], le = g[F + 1];
      for (_ = J; _ < le; _++)
        $ = y[_], z.set(L[$], w[_]);
      F > 0 && z.forEach(0, F - 1, function(j, te) {
        m._forEachRow(j, A, E, N, function(oe, me) {
          oe > j && z.accumulate(oe, u(o(me, te)));
        });
      });
      var K = F, re = z.get(F), ie = n(re);
      z.forEach(F + 1, x - 1, function(j, te) {
        var oe = n(te);
        l(oe, ie) && (K = j, ie = oe, re = te);
      }), F !== K && (m._swapRows(F, K, S[1], A, E, N), m._swapRows(F, K, I[1], C, T, O), z.swap(F, K), W(F, K)), z.forEach(0, x - 1, function(j, te) {
        j <= F ? (C.push(te), T.push(j)) : (te = i(te, re), s(te, 0) || (A.push(te), E.push(j)));
      });
    };
    for (F = 0; F < D; F++)
      Q();
    return O.push(C.length), N.push(A.length), {
      L: new m({
        values: A,
        index: E,
        ptr: N,
        size: S
      }),
      U: new m({
        values: C,
        index: T,
        ptr: O,
        size: I
      }),
      p: L,
      toString: function() {
        return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
P: ` + this.p;
      }
    };
  }
}), Yu = "qr", FD = ["typed", "matrix", "zeros", "identity", "isZero", "equal", "sign", "sqrt", "conj", "unaryMinus", "addScalar", "divideScalar", "multiplyScalar", "subtractScalar", "complex"], TD = /* @__PURE__ */ q(Yu, FD, (e) => {
  var {
    typed: r,
    matrix: t,
    zeros: n,
    identity: a,
    isZero: i,
    equal: o,
    sign: c,
    sqrt: l,
    conj: s,
    unaryMinus: u,
    addScalar: f,
    divideScalar: m,
    multiplyScalar: v,
    subtractScalar: p,
    complex: d
  } = e;
  return vr(r(Yu, {
    DenseMatrix: function(w) {
      return x(w);
    },
    SparseMatrix: function(w) {
      return D();
    },
    Array: function(w) {
      var y = t(w), g = x(y);
      return {
        Q: g.Q.valueOf(),
        R: g.R.valueOf()
      };
    }
  }), {
    _denseQRimpl: b
  });
  function b(h) {
    var w = h._size[0], y = h._size[1], g = a([w], "dense"), A = g._data, E = h.clone(), N = E._data, S, C, T, O = n([w], "");
    for (T = 0; T < Math.min(y, w); ++T) {
      var I = N[T][T], $ = u(o(I, 0) ? 1 : c(I)), F = s($), _ = 0;
      for (S = T; S < w; S++)
        _ = f(_, v(N[S][T], s(N[S][T])));
      var L = v($, l(_));
      if (!i(L)) {
        var B = p(I, L);
        for (O[T] = 1, S = T + 1; S < w; S++)
          O[S] = m(N[S][T], B);
        var W = u(s(m(B, L))), Q = void 0;
        for (C = T; C < y; C++) {
          for (Q = 0, S = T; S < w; S++)
            Q = f(Q, v(s(O[S]), N[S][C]));
          for (Q = v(Q, W), S = T; S < w; S++)
            N[S][C] = v(p(N[S][C], v(O[S], Q)), F);
        }
        for (S = 0; S < w; S++) {
          for (Q = 0, C = T; C < w; C++)
            Q = f(Q, v(A[S][C], O[C]));
          for (Q = v(Q, W), C = T; C < w; ++C)
            A[S][C] = m(p(A[S][C], v(Q, s(O[C]))), F);
        }
      }
    }
    return {
      Q: g,
      R: E,
      toString: function() {
        return "Q: " + this.Q.toString() + `
R: ` + this.R.toString();
      }
    };
  }
  function x(h) {
    var w = b(h), y = w.R._data;
    if (h._data.length > 0)
      for (var g = y[0][0].type === "Complex" ? d(0) : 0, A = 0; A < y.length; ++A)
        for (var E = 0; E < A && E < (y[0] || []).length; ++E)
          y[A][E] = g;
    return w;
  }
  function D(h) {
    throw new Error("qr not implemented for sparse matrices yet");
  }
});
function BD(e, r, t, n) {
  e._values;
  for (var a = e._index, i = e._ptr, o = e._size, c = e._datatype, l = o[0], s = o[1], u = null, f = [], m = [], v = 0, p = 0; p < s; p++) {
    m[p] = v;
    for (var d = t ? t[p] : p, b = i[d], x = i[d + 1], D = b; D < x; D++) {
      var h = a[D];
      f[v] = h, v++;
    }
  }
  return m[s] = v, e.createSparseMatrix({
    values: u,
    index: f,
    ptr: m,
    size: [l, s],
    datatype: c
  });
}
function pm(e, r, t, n, a, i, o) {
  var c = 0;
  for (t[o] = e; c >= 0; ) {
    var l = t[o + c], s = t[n + l];
    s === -1 ? (c--, i[r++] = l) : (t[n + l] = t[a + s], ++c, t[o + c] = s);
  }
  return r;
}
function OD(e, r) {
  if (!e)
    return null;
  var t = 0, n, a = [], i = [], o = 0, c = r, l = 2 * r;
  for (n = 0; n < r; n++)
    i[o + n] = -1;
  for (n = r - 1; n >= 0; n--)
    e[n] !== -1 && (i[c + n] = i[o + e[n]], i[o + e[n]] = n);
  for (n = 0; n < r; n++)
    e[n] === -1 && (t = pm(n, t, i, o, c, a, l));
  return a;
}
function $D(e, r) {
  if (!e)
    return null;
  var t = e._index, n = e._ptr, a = e._size, i = a[0], o = a[1], c = [], l = [], s = 0, u = o, f, m;
  for (f = 0; f < i; f++)
    l[u + f] = -1;
  for (var v = 0; v < o; v++) {
    c[v] = -1, l[s + v] = -1;
    for (var p = n[v], d = n[v + 1], b = p; b < d; b++) {
      var x = t[b];
      for (f = l[u + x]; f !== -1 && f < v; f = m)
        m = l[s + f], l[s + f] = v, m === -1 && (c[f] = v);
      l[u + x] = v;
    }
  }
  return c;
}
function ID(e, r, t) {
  for (var n = e._values, a = e._index, i = e._ptr, o = e._size, c = o[1], l = 0, s = 0; s < c; s++) {
    var u = i[s];
    for (i[s] = l; u < i[s + 1]; u++)
      r(a[u], s, n ? n[u] : 1, t) && (a[l] = a[u], n && (n[l] = n[u]), l++);
  }
  return i[c] = l, a.splice(l, a.length - l), n && n.splice(l, n.length - l), l;
}
function jr(e) {
  return -e - 2;
}
var qD = "csAmd", RD = ["add", "multiply", "transpose"], zD = /* @__PURE__ */ q(qD, RD, (e) => {
  var {
    add: r,
    multiply: t,
    transpose: n
  } = e;
  return function(u, f) {
    if (!f || u <= 0 || u > 3)
      return null;
    var m = f._size, v = m[0], p = m[1], d = 0, b = Math.max(16, 10 * Math.sqrt(p));
    b = Math.min(p - 2, b);
    var x = a(u, f, v, p, b);
    ID(x, l, null);
    for (var D = x._index, h = x._ptr, w = h[p], y = [], g = [], A = 0, E = p + 1, N = 2 * (p + 1), S = 3 * (p + 1), C = 4 * (p + 1), T = 5 * (p + 1), O = 6 * (p + 1), I = 7 * (p + 1), $ = y, F = i(p, h, g, A, S, $, N, I, E, O, C, T), _ = o(p, h, g, T, C, O, b, E, S, $, N), L = 0, B, W, Q, Z, z, J, le, K, re, ie, j, te, oe, me, be, we; _ < p; ) {
      for (Q = -1; L < p && (Q = g[S + L]) === -1; L++) ;
      g[N + Q] !== -1 && ($[g[N + Q]] = -1), g[S + L] = g[N + Q];
      var P = g[C + Q], H = g[E + Q];
      _ += H;
      var ee = 0;
      g[E + Q] = -H;
      var k = h[Q], V = P === 0 ? k : w, X = V;
      for (Z = 1; Z <= P + 1; Z++) {
        for (Z > P ? (J = Q, le = k, K = g[A + Q] - P) : (J = D[k++], le = h[J], K = g[A + J]), z = 1; z <= K; z++)
          B = D[le++], !((re = g[E + B]) <= 0) && (ee += re, g[E + B] = -re, D[X++] = B, g[N + B] !== -1 && ($[g[N + B]] = $[B]), $[B] !== -1 ? g[N + $[B]] = g[N + B] : g[S + g[T + B]] = g[N + B]);
        J !== Q && (h[J] = jr(Q), g[O + J] = 0);
      }
      for (P !== 0 && (w = X), g[T + Q] = ee, h[Q] = V, g[A + Q] = X - V, g[C + Q] = -2, F = c(F, d, g, O, p), ie = V; ie < X; ie++)
        if (B = D[ie], !((j = g[C + B]) <= 0)) {
          re = -g[E + B];
          var fe = F - re;
          for (k = h[B], te = h[B] + j - 1; k <= te; k++)
            J = D[k], g[O + J] >= F ? g[O + J] -= re : g[O + J] !== 0 && (g[O + J] = g[T + J] + fe);
        }
      for (ie = V; ie < X; ie++) {
        for (B = D[ie], te = h[B], oe = te + g[C + B] - 1, me = te, be = 0, we = 0, k = te; k <= oe; k++)
          if (J = D[k], g[O + J] !== 0) {
            var ce = g[O + J] - F;
            ce > 0 ? (we += ce, D[me++] = J, be += J) : (h[J] = jr(Q), g[O + J] = 0);
          }
        g[C + B] = me - te + 1;
        var R = me, U = te + g[A + B];
        for (k = oe + 1; k < U; k++) {
          W = D[k];
          var Y = g[E + W];
          Y <= 0 || (we += Y, D[me++] = W, be += W);
        }
        we === 0 ? (h[B] = jr(Q), re = -g[E + B], ee -= re, H += re, _ += re, g[E + B] = 0, g[C + B] = -1) : (g[T + B] = Math.min(g[T + B], we), D[me] = D[R], D[R] = D[te], D[te] = Q, g[A + B] = me - te + 1, be = (be < 0 ? -be : be) % p, g[N + B] = g[I + be], g[I + be] = B, $[B] = be);
      }
      for (g[T + Q] = ee, d = Math.max(d, ee), F = c(F + d, d, g, O, p), ie = V; ie < X; ie++)
        if (B = D[ie], !(g[E + B] >= 0))
          for (be = $[B], B = g[I + be], g[I + be] = -1; B !== -1 && g[N + B] !== -1; B = g[N + B], F++) {
            for (K = g[A + B], j = g[C + B], k = h[B] + 1; k <= h[B] + K - 1; k++)
              g[O + D[k]] = F;
            var ne = B;
            for (W = g[N + B]; W !== -1; ) {
              var se = g[A + W] === K && g[C + W] === j;
              for (k = h[W] + 1; se && k <= h[W] + K - 1; k++)
                g[O + D[k]] !== F && (se = 0);
              se ? (h[W] = jr(B), g[E + B] += g[E + W], g[E + W] = 0, g[C + W] = -1, W = g[N + W], g[N + ne] = W) : (ne = W, W = g[N + W]);
            }
          }
      for (k = V, ie = V; ie < X; ie++)
        B = D[ie], !((re = -g[E + B]) <= 0) && (g[E + B] = re, we = g[T + B] + ee - re, we = Math.min(we, p - _ - re), g[S + we] !== -1 && ($[g[S + we]] = B), g[N + B] = g[S + we], $[B] = -1, g[S + we] = B, L = Math.min(L, we), g[T + B] = we, D[k++] = B);
      g[E + Q] = H, (g[A + Q] = k - V) === 0 && (h[Q] = -1, g[O + Q] = 0), P !== 0 && (w = k);
    }
    for (B = 0; B < p; B++)
      h[B] = jr(h[B]);
    for (W = 0; W <= p; W++)
      g[S + W] = -1;
    for (W = p; W >= 0; W--)
      g[E + W] > 0 || (g[N + W] = g[S + h[W]], g[S + h[W]] = W);
    for (J = p; J >= 0; J--)
      g[E + J] <= 0 || h[J] !== -1 && (g[N + J] = g[S + h[J]], g[S + h[J]] = J);
    for (Q = 0, B = 0; B <= p; B++)
      h[B] === -1 && (Q = pm(B, Q, g, S, N, y, O));
    return y.splice(y.length - 1, 1), y;
  };
  function a(s, u, f, m, v) {
    var p = n(u);
    if (s === 1 && m === f)
      return r(u, p);
    if (s === 2) {
      for (var d = p._index, b = p._ptr, x = 0, D = 0; D < f; D++) {
        var h = b[D];
        if (b[D] = x, !(b[D + 1] - h > v))
          for (var w = b[D + 1]; h < w; h++)
            d[x++] = d[h];
      }
      return b[f] = x, u = n(p), t(p, u);
    }
    return t(p, u);
  }
  function i(s, u, f, m, v, p, d, b, x, D, h, w) {
    for (var y = 0; y < s; y++)
      f[m + y] = u[y + 1] - u[y];
    f[m + s] = 0;
    for (var g = 0; g <= s; g++)
      f[v + g] = -1, p[g] = -1, f[d + g] = -1, f[b + g] = -1, f[x + g] = 1, f[D + g] = 1, f[h + g] = 0, f[w + g] = f[m + g];
    var A = c(0, 0, f, D, s);
    return f[h + s] = -2, u[s] = -1, f[D + s] = 0, A;
  }
  function o(s, u, f, m, v, p, d, b, x, D, h) {
    for (var w = 0, y = 0; y < s; y++) {
      var g = f[m + y];
      if (g === 0)
        f[v + y] = -2, w++, u[y] = -1, f[p + y] = 0;
      else if (g > d)
        f[b + y] = 0, f[v + y] = -1, w++, u[y] = jr(s), f[b + s]++;
      else {
        var A = f[x + g];
        A !== -1 && (D[A] = y), f[h + y] = f[x + g], f[x + g] = y;
      }
    }
    return w;
  }
  function c(s, u, f, m, v) {
    if (s < 2 || s + u < 0) {
      for (var p = 0; p < v; p++)
        f[m + p] !== 0 && (f[m + p] = 1);
      s = 2;
    }
    return s;
  }
  function l(s, u) {
    return s !== u;
  }
});
function PD(e, r, t, n, a, i, o) {
  var c, l, s = 0, u;
  if (e <= r || t[n + r] <= t[a + e])
    return -1;
  t[a + e] = t[n + r];
  var f = t[i + e];
  if (t[i + e] = r, f === -1)
    s = 1, u = e;
  else {
    for (s = 2, u = f; u !== t[o + u]; u = t[o + u]) ;
    for (c = f; c !== u; c = l)
      l = t[o + c], t[o + c] = u;
  }
  return {
    jleaf: s,
    q: u
  };
}
var UD = "csCounts", LD = ["transpose"], kD = /* @__PURE__ */ q(UD, LD, (e) => {
  var {
    transpose: r
  } = e;
  return function(t, n, a, i) {
    if (!t || !n || !a)
      return null;
    var o = t._size, c = o[0], l = o[1], s, u, f, m, v, p, d, b = 4 * l + (i ? l + c + 1 : 0), x = [], D = 0, h = l, w = 2 * l, y = 3 * l, g = 4 * l, A = 5 * l + 1;
    for (f = 0; f < b; f++)
      x[f] = -1;
    var E = [], N = r(t), S = N._index, C = N._ptr;
    for (f = 0; f < l; f++)
      for (u = a[f], E[u] = x[y + u] === -1 ? 1 : 0; u !== -1 && x[y + u] === -1; u = n[u])
        x[y + u] = f;
    if (i) {
      for (f = 0; f < l; f++)
        x[a[f]] = f;
      for (s = 0; s < c; s++) {
        for (f = l, p = C[s], d = C[s + 1], v = p; v < d; v++)
          f = Math.min(f, x[S[v]]);
        x[A + s] = x[g + f], x[g + f] = s;
      }
    }
    for (s = 0; s < l; s++)
      x[D + s] = s;
    for (f = 0; f < l; f++) {
      for (u = a[f], n[u] !== -1 && E[n[u]]--, m = i ? x[g + f] : u; m !== -1; m = i ? x[A + m] : -1)
        for (v = C[m]; v < C[m + 1]; v++) {
          s = S[v];
          var T = PD(s, u, x, y, h, w, D);
          T.jleaf >= 1 && E[u]++, T.jleaf === 2 && E[T.q]--;
        }
      n[u] !== -1 && (x[D + u] = n[u]);
    }
    for (u = 0; u < l; u++)
      n[u] !== -1 && (E[n[u]] += E[u]);
    return E;
  };
}), HD = "csSqr", GD = ["add", "multiply", "transpose"], ZD = /* @__PURE__ */ q(HD, GD, (e) => {
  var {
    add: r,
    multiply: t,
    transpose: n
  } = e, a = zD({
    add: r,
    multiply: t,
    transpose: n
  }), i = kD({
    transpose: n
  });
  return function(l, s, u) {
    var f = s._ptr, m = s._size, v = m[1], p, d = {};
    if (d.q = a(l, s), l && !d.q)
      return null;
    if (u) {
      var b = l ? BD(s, null, d.q) : s;
      d.parent = $D(b);
      var x = OD(d.parent, v);
      if (d.cp = i(b, d.parent, x, 1), b && d.parent && d.cp && o(b, d))
        for (d.unz = 0, p = 0; p < v; p++)
          d.unz += d.cp[p];
    } else
      d.unz = 4 * f[v] + v, d.lnz = d.unz;
    return d;
  };
  function o(c, l) {
    var s = c._ptr, u = c._index, f = c._size, m = f[0], v = f[1];
    l.pinv = [], l.leftmost = [];
    var p = l.parent, d = l.pinv, b = l.leftmost, x = [], D = 0, h = m, w = m + v, y = m + 2 * v, g, A, E, N, S;
    for (A = 0; A < v; A++)
      x[h + A] = -1, x[w + A] = -1, x[y + A] = 0;
    for (g = 0; g < m; g++)
      b[g] = -1;
    for (A = v - 1; A >= 0; A--)
      for (N = s[A], S = s[A + 1], E = N; E < S; E++)
        b[u[E]] = A;
    for (g = m - 1; g >= 0; g--)
      d[g] = -1, A = b[g], A !== -1 && (x[y + A]++ === 0 && (x[w + A] = g), x[D + g] = x[h + A], x[h + A] = g);
    for (l.lnz = 0, l.m2 = m, A = 0; A < v; A++)
      if (g = x[h + A], l.lnz++, g < 0 && (g = l.m2++), d[g] = A, !(--y[A] <= 0)) {
        l.lnz += x[y + A];
        var C = p[A];
        C !== -1 && (x[y + C] === 0 && (x[w + C] = x[w + A]), x[D + x[w + A]] = x[h + C], x[h + C] = x[D + g], x[y + C] += x[y + A]);
      }
    for (g = 0; g < m; g++)
      d[g] < 0 && (d[g] = A++);
    return !0;
  }
});
function Va(e, r) {
  return e[r] < 0;
}
function dm(e, r) {
  e[r] = jr(e[r]);
}
function Xu(e) {
  return e < 0 ? jr(e) : e;
}
function VD(e, r, t, n, a) {
  var i = r._index, o = r._ptr, c = r._size, l = c[1], s, u, f, m = 0;
  for (n[0] = e; m >= 0; ) {
    e = n[m];
    var v = a ? a[e] : e;
    Va(o, e) || (dm(o, e), n[l + m] = v < 0 ? 0 : Xu(o[v]));
    var p = 1;
    for (u = n[l + m], f = v < 0 ? 0 : Xu(o[v + 1]); u < f; u++)
      if (s = i[u], !Va(o, s)) {
        n[l + m] = u, n[++m] = s, p = 0;
        break;
      }
    p && (m--, n[--t] = e);
  }
  return t;
}
function WD(e, r, t, n, a) {
  var i = e._ptr, o = e._size, c = r._index, l = r._ptr, s = o[1], u, f, m, v = s;
  for (f = l[t], m = l[t + 1], u = f; u < m; u++) {
    var p = c[u];
    Va(i, p) || (v = VD(p, e, v, n, a));
  }
  for (u = v; u < s; u++)
    dm(i, n[u]);
  return v;
}
var YD = "csSpsolve", XD = ["divideScalar", "multiply", "subtract"], JD = /* @__PURE__ */ q(YD, XD, (e) => {
  var {
    divideScalar: r,
    multiply: t,
    subtract: n
  } = e;
  return function(i, o, c, l, s, u, f) {
    var m = i._values, v = i._index, p = i._ptr, d = i._size, b = d[1], x = o._values, D = o._index, h = o._ptr, w, y, g, A, E = WD(i, o, c, l, u);
    for (w = E; w < b; w++)
      s[l[w]] = 0;
    for (y = h[c], g = h[c + 1], w = y; w < g; w++)
      s[D[w]] = x[w];
    for (var N = E; N < b; N++) {
      var S = l[N], C = u ? u[S] : S;
      if (!(C < 0))
        for (y = p[C], g = p[C + 1], s[S] = r(s[S], m[f ? y : g - 1]), w = f ? y + 1 : y, A = f ? g : g - 1; w < A; w++) {
          var T = v[w];
          s[T] = n(s[T], t(m[w], s[S]));
        }
    }
    return E;
  };
}), QD = "csLu", KD = ["abs", "divideScalar", "multiply", "subtract", "larger", "largerEq", "SparseMatrix"], jD = /* @__PURE__ */ q(QD, KD, (e) => {
  var {
    abs: r,
    divideScalar: t,
    multiply: n,
    subtract: a,
    larger: i,
    largerEq: o,
    SparseMatrix: c
  } = e, l = JD({
    divideScalar: t,
    multiply: n,
    subtract: a
  });
  return function(u, f, m) {
    if (!u)
      return null;
    var v = u._size, p = v[1], d, b = 100, x = 100;
    f && (d = f.q, b = f.lnz || b, x = f.unz || x);
    var D = [], h = [], w = [], y = new c({
      values: D,
      index: h,
      ptr: w,
      size: [p, p]
    }), g = [], A = [], E = [], N = new c({
      values: g,
      index: A,
      ptr: E,
      size: [p, p]
    }), S = [], C, T, O = [], I = [];
    for (C = 0; C < p; C++)
      O[C] = 0, S[C] = -1, w[C + 1] = 0;
    b = 0, x = 0;
    for (var $ = 0; $ < p; $++) {
      w[$] = b, E[$] = x;
      var F = d ? d[$] : $, _ = l(y, u, F, I, O, S, 1), L = -1, B = -1;
      for (T = _; T < p; T++)
        if (C = I[T], S[C] < 0) {
          var W = r(O[C]);
          i(W, B) && (B = W, L = C);
        } else
          A[x] = S[C], g[x++] = O[C];
      if (L === -1 || B <= 0)
        return null;
      S[F] < 0 && o(r(O[F]), n(B, m)) && (L = F);
      var Q = O[L];
      for (A[x] = $, g[x++] = Q, S[L] = $, h[b] = L, D[b++] = 1, T = _; T < p; T++)
        C = I[T], S[C] < 0 && (h[b] = C, D[b++] = t(O[C], Q)), O[C] = 0;
    }
    for (w[p] = b, E[p] = x, T = 0; T < b; T++)
      h[T] = S[h[T]];
    return D.splice(b, D.length - b), h.splice(b, h.length - b), g.splice(x, g.length - x), A.splice(x, A.length - x), {
      L: y,
      U: N,
      pinv: S
    };
  };
}), Ju = "slu", e2 = ["typed", "abs", "add", "multiply", "transpose", "divideScalar", "subtract", "larger", "largerEq", "SparseMatrix"], r2 = /* @__PURE__ */ q(Ju, e2, (e) => {
  var {
    typed: r,
    abs: t,
    add: n,
    multiply: a,
    transpose: i,
    divideScalar: o,
    subtract: c,
    larger: l,
    largerEq: s,
    SparseMatrix: u
  } = e, f = ZD({
    add: n,
    multiply: a,
    transpose: i
  }), m = jD({
    abs: t,
    divideScalar: o,
    multiply: a,
    subtract: c,
    larger: l,
    largerEq: s,
    SparseMatrix: u
  });
  return r(Ju, {
    "SparseMatrix, number, number": function(p, d, b) {
      if (!Ae(d) || d < 0 || d > 3)
        throw new Error("Symbolic Ordering and Analysis order must be an integer number in the interval [0, 3]");
      if (b < 0 || b > 1)
        throw new Error("Partial pivoting threshold must be a number from 0 to 1");
      var x = f(d, p, !1), D = m(p, x, b);
      return {
        L: D.L,
        U: D.U,
        p: D.pinv,
        q: x.q,
        toString: function() {
          return "L: " + this.L.toString() + `
U: ` + this.U.toString() + `
p: ` + this.p.toString() + (this.q ? `
q: ` + this.q.toString() : "") + `
`;
        }
      };
    }
  });
});
function Qu(e, r) {
  var t, n = r.length, a = [];
  if (e)
    for (t = 0; t < n; t++)
      a[e[t]] = r[t];
  else
    for (t = 0; t < n; t++)
      a[t] = r[t];
  return a;
}
var Ku = "lusolve", t2 = ["typed", "matrix", "lup", "slu", "usolve", "lsolve", "DenseMatrix"], n2 = /* @__PURE__ */ q(Ku, t2, (e) => {
  var {
    typed: r,
    matrix: t,
    lup: n,
    slu: a,
    usolve: i,
    lsolve: o,
    DenseMatrix: c
  } = e, l = ln({
    DenseMatrix: c
  });
  return r(Ku, {
    "Array, Array | Matrix": function(m, v) {
      m = t(m);
      var p = n(m), d = u(p.L, p.U, p.p, null, v);
      return d.valueOf();
    },
    "DenseMatrix, Array | Matrix": function(m, v) {
      var p = n(m);
      return u(p.L, p.U, p.p, null, v);
    },
    "SparseMatrix, Array | Matrix": function(m, v) {
      var p = n(m);
      return u(p.L, p.U, p.p, null, v);
    },
    "SparseMatrix, Array | Matrix, number, number": function(m, v, p, d) {
      var b = a(m, p, d);
      return u(b.L, b.U, b.p, b.q, v);
    },
    "Object, Array | Matrix": function(m, v) {
      return u(m.L, m.U, m.p, m.q, v);
    }
  });
  function s(f) {
    if (Ce(f))
      return f;
    if (Ze(f))
      return t(f);
    throw new TypeError("Invalid Matrix LU decomposition");
  }
  function u(f, m, v, p, d) {
    f = s(f), m = s(m), v && (d = l(f, d, !0), d._data = Qu(v, d._data));
    var b = o(f, d), x = i(m, b);
    return p && (x._data = Qu(p, x._data)), x;
  }
}), ju = "polynomialRoot", a2 = ["typed", "isZero", "equalScalar", "add", "subtract", "multiply", "divide", "sqrt", "unaryMinus", "cbrt", "typeOf", "im", "re"], i2 = /* @__PURE__ */ q(ju, a2, (e) => {
  var {
    typed: r,
    isZero: t,
    equalScalar: n,
    add: a,
    subtract: i,
    multiply: o,
    divide: c,
    sqrt: l,
    unaryMinus: s,
    cbrt: u,
    typeOf: f,
    im: m,
    re: v
  } = e;
  return r(ju, {
    "number|Complex, ...number|Complex": (p, d) => {
      for (var b = [p, ...d]; b.length > 0 && t(b[b.length - 1]); )
        b.pop();
      if (b.length < 2)
        throw new RangeError("Polynomial [".concat(p, ", ").concat(d, "] must have a non-zero non-constant coefficient"));
      switch (b.length) {
        case 2:
          return [s(c(b[0], b[1]))];
        case 3: {
          var [x, D, h] = b, w = o(2, h), y = o(D, D), g = o(4, h, x);
          if (n(y, g)) return [c(s(D), w)];
          var A = l(i(y, g));
          return [c(i(A, D), w), c(i(s(A), D), w)];
        }
        case 4: {
          var [E, N, S, C] = b, T = s(o(3, C)), O = o(S, S), I = o(3, C, N), $ = a(o(2, S, S, S), o(27, C, C, E)), F = o(9, C, S, N);
          if (n(O, I) && n($, F))
            return [c(S, T)];
          var _ = i(O, I), L = i($, F), B = a(o(18, C, S, N, E), o(S, S, N, N)), W = a(o(4, S, S, S, E), o(4, C, N, N, N), o(27, C, C, E, E));
          if (n(B, W))
            return [
              c(i(o(4, C, S, N), a(o(9, C, C, E), o(S, S, S))), o(C, _)),
              // simple root
              c(i(o(9, C, E), o(S, N)), o(2, _))
              // double root
            ];
          var Q;
          n(O, I) ? Q = L : Q = c(a(L, l(i(o(L, L), o(4, _, _, _)))), 2);
          var Z = !0, z = u(Q, Z).toArray().map((J) => c(a(S, J, c(_, J)), T));
          return z.map((J) => f(J) === "Complex" && n(v(J), v(J) + m(J)) ? v(J) : J);
        }
        default:
          throw new RangeError("only implemented for cubic or lower-order polynomials, not ".concat(b));
      }
    }
  });
}), o2 = "Help", s2 = ["evaluate"], u2 = /* @__PURE__ */ q(o2, s2, (e) => {
  var {
    evaluate: r
  } = e;
  function t(n) {
    if (!(this instanceof t))
      throw new SyntaxError("Constructor must be called with the new operator");
    if (!n) throw new Error('Argument "doc" missing');
    this.doc = n;
  }
  return t.prototype.type = "Help", t.prototype.isHelp = !0, t.prototype.toString = function() {
    var n = this.doc || {}, a = `
`;
    if (n.name && (a += "Name: " + n.name + `

`), n.category && (a += "Category: " + n.category + `

`), n.description && (a += `Description:
    ` + n.description + `

`), n.syntax && (a += `Syntax:
    ` + n.syntax.join(`
    `) + `

`), n.examples) {
      a += `Examples:
`;
      for (var i = !1, o = r("config()"), c = {
        config: (f) => (i = !0, r("config(newConfig)", {
          newConfig: f
        }))
      }, l = 0; l < n.examples.length; l++) {
        var s = n.examples[l];
        a += "    " + s + `
`;
        var u = void 0;
        try {
          u = r(s, c);
        } catch (f) {
          u = f;
        }
        u !== void 0 && !Ya(u) && (a += "        " + Pe(u, {
          precision: 14
        }) + `
`);
      }
      a += `
`, i && r("config(originalConfig)", {
        originalConfig: o
      });
    }
    return n.mayThrow && n.mayThrow.length && (a += "Throws: " + n.mayThrow.join(", ") + `

`), n.seealso && n.seealso.length && (a += "See also: " + n.seealso.join(", ") + `
`), a;
  }, t.prototype.toJSON = function() {
    var n = Me(this.doc);
    return n.mathjs = "Help", n;
  }, t.fromJSON = function(n) {
    var a = {};
    return Object.keys(n).filter((i) => i !== "mathjs").forEach((i) => {
      a[i] = n[i];
    }), new t(a);
  }, t.prototype.valueOf = t.prototype.toString, t;
}, {
  isClass: !0
}), l2 = "Chain", c2 = ["?on", "math", "typed"], f2 = /* @__PURE__ */ q(l2, c2, (e) => {
  var {
    on: r,
    math: t,
    typed: n
  } = e;
  function a(s) {
    if (!(this instanceof a))
      throw new SyntaxError("Constructor must be called with the new operator");
    Xa(s) ? this.value = s.value : this.value = s;
  }
  a.prototype.type = "Chain", a.prototype.isChain = !0, a.prototype.done = function() {
    return this.value;
  }, a.prototype.valueOf = function() {
    return this.value;
  }, a.prototype.toString = function() {
    return Pe(this.value);
  }, a.prototype.toJSON = function() {
    return {
      mathjs: "Chain",
      value: this.value
    };
  }, a.fromJSON = function(s) {
    return new a(s.value);
  };
  function i(s, u) {
    typeof u == "function" && (a.prototype[s] = c(u));
  }
  function o(s, u) {
    On(a.prototype, s, function() {
      var m = u();
      if (typeof m == "function")
        return c(m);
    });
  }
  function c(s) {
    return function() {
      if (arguments.length === 0)
        return new a(s(this.value));
      for (var u = [this.value], f = 0; f < arguments.length; f++)
        u[f + 1] = arguments[f];
      if (n.isTypedFunction(s)) {
        var m = n.resolve(s, u);
        if (m.params.length === 1)
          throw new Error("chain function " + s.name + " cannot match rest parameter between chain value and additional arguments.");
        return new a(m.implementation.apply(s, u));
      }
      return new a(s.apply(s, u));
    };
  }
  a.createProxy = function(s, u) {
    if (typeof s == "string")
      i(s, u);
    else {
      var f = function(p) {
        De(s, p) && l[p] === void 0 && o(p, () => s[p]);
      };
      for (var m in s)
        f(m);
    }
  };
  var l = {
    expression: !0,
    docs: !0,
    type: !0,
    classes: !0,
    json: !0,
    error: !0,
    isChain: !0
    // conflicts with the property isChain of a Chain instance
  };
  return a.createProxy(t), r && r("import", function(s, u, f) {
    f || o(s, u);
  }), a;
}, {
  isClass: !0
}), el = {
  name: "e",
  category: "Constants",
  syntax: ["e"],
  description: "Euler's number, the base of the natural logarithm. Approximately equal to 2.71828",
  examples: ["e", "e ^ 2", "exp(2)", "log(e)"],
  seealso: ["exp"]
}, m2 = {
  name: "false",
  category: "Constants",
  syntax: ["false"],
  description: "Boolean value false",
  examples: ["false"],
  seealso: ["true"]
}, v2 = {
  name: "i",
  category: "Constants",
  syntax: ["i"],
  description: "Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.",
  examples: ["i", "i * i", "sqrt(-1)"],
  seealso: []
}, p2 = {
  name: "Infinity",
  category: "Constants",
  syntax: ["Infinity"],
  description: "Infinity, a number which is larger than the maximum number that can be handled by a floating point number.",
  examples: ["Infinity", "1 / 0"],
  seealso: []
}, d2 = {
  name: "LN10",
  category: "Constants",
  syntax: ["LN10"],
  description: "Returns the natural logarithm of 10, approximately equal to 2.302",
  examples: ["LN10", "log(10)"],
  seealso: []
}, h2 = {
  name: "LN2",
  category: "Constants",
  syntax: ["LN2"],
  description: "Returns the natural logarithm of 2, approximately equal to 0.693",
  examples: ["LN2", "log(2)"],
  seealso: []
}, g2 = {
  name: "LOG10E",
  category: "Constants",
  syntax: ["LOG10E"],
  description: "Returns the base-10 logarithm of E, approximately equal to 0.434",
  examples: ["LOG10E", "log(e, 10)"],
  seealso: []
}, y2 = {
  name: "LOG2E",
  category: "Constants",
  syntax: ["LOG2E"],
  description: "Returns the base-2 logarithm of E, approximately equal to 1.442",
  examples: ["LOG2E", "log(e, 2)"],
  seealso: []
}, b2 = {
  name: "NaN",
  category: "Constants",
  syntax: ["NaN"],
  description: "Not a number",
  examples: ["NaN", "0 / 0"],
  seealso: []
}, x2 = {
  name: "null",
  category: "Constants",
  syntax: ["null"],
  description: "Value null",
  examples: ["null"],
  seealso: ["true", "false"]
}, w2 = {
  name: "phi",
  category: "Constants",
  syntax: ["phi"],
  description: "Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...",
  examples: ["phi"],
  seealso: []
}, rl = {
  name: "pi",
  category: "Constants",
  syntax: ["pi"],
  description: "The number pi is a mathematical constant that is the ratio of a circle's circumference to its diameter, and is approximately equal to 3.14159",
  examples: ["pi", "sin(pi/2)"],
  seealso: ["tau"]
}, D2 = {
  name: "SQRT1_2",
  category: "Constants",
  syntax: ["SQRT1_2"],
  description: "Returns the square root of 1/2, approximately equal to 0.707",
  examples: ["SQRT1_2", "sqrt(1/2)"],
  seealso: []
}, N2 = {
  name: "SQRT2",
  category: "Constants",
  syntax: ["SQRT2"],
  description: "Returns the square root of 2, approximately equal to 1.414",
  examples: ["SQRT2", "sqrt(2)"],
  seealso: []
}, A2 = {
  name: "tau",
  category: "Constants",
  syntax: ["tau"],
  description: "Tau is the ratio constant of a circle's circumference to radius, equal to 2 * pi, approximately 6.2832.",
  examples: ["tau", "2 * pi"],
  seealso: ["pi"]
}, E2 = {
  name: "true",
  category: "Constants",
  syntax: ["true"],
  description: "Boolean value true",
  examples: ["true"],
  seealso: ["false"]
}, S2 = {
  name: "version",
  category: "Constants",
  syntax: ["version"],
  description: "A string with the version number of math.js",
  examples: ["version"],
  seealso: []
}, C2 = {
  name: "bignumber",
  category: "Construction",
  syntax: ["bignumber(x)"],
  description: "Create a big number from a number or string.",
  examples: ["0.1 + 0.2", "bignumber(0.1) + bignumber(0.2)", 'bignumber("7.2")', 'bignumber("7.2e500")', "bignumber([0.1, 0.2, 0.3])"],
  seealso: ["boolean", "bigint", "complex", "fraction", "index", "matrix", "string", "unit"]
}, M2 = {
  name: "bigint",
  category: "Construction",
  syntax: ["bigint(x)"],
  description: "Create a bigint, an integer with an arbitrary number of digits, from a number or string.",
  examples: ["123123123123123123 # a large number will lose digits", 'bigint("123123123123123123")', 'bignumber(["1", "3", "5"])'],
  seealso: ["boolean", "bignumber", "number", "complex", "fraction", "index", "matrix", "string", "unit"]
}, _2 = {
  name: "boolean",
  category: "Construction",
  syntax: ["x", "boolean(x)"],
  description: "Convert a string or number into a boolean.",
  examples: ["boolean(0)", "boolean(1)", "boolean(3)", 'boolean("true")', 'boolean("false")', "boolean([1, 0, 1, 1])"],
  seealso: ["bignumber", "complex", "index", "matrix", "number", "string", "unit"]
}, F2 = {
  name: "complex",
  category: "Construction",
  syntax: ["complex()", "complex(re, im)", "complex(string)"],
  description: "Create a complex number.",
  examples: ["complex()", "complex(2, 3)", 'complex("7 - 2i")'],
  seealso: ["bignumber", "boolean", "index", "matrix", "number", "string", "unit"]
}, T2 = {
  name: "createUnit",
  category: "Construction",
  syntax: ["createUnit(definitions)", "createUnit(name, definition)"],
  description: "Create a user-defined unit and register it with the Unit type.",
  examples: ['createUnit("foo")', 'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})', 'createUnit("mph", "1 mile/hour")'],
  seealso: ["unit", "splitUnit"]
}, B2 = {
  name: "fraction",
  category: "Construction",
  syntax: ["fraction(num)", "fraction(matrix)", "fraction(num,den)", "fraction({n: num, d: den})"],
  description: "Create a fraction from a number or from integer numerator and denominator.",
  examples: ["fraction(0.125)", "fraction(1, 3) + fraction(2, 5)", "fraction({n: 333, d: 53})", "fraction([sqrt(9), sqrt(10), sqrt(11)])"],
  seealso: ["bignumber", "boolean", "complex", "index", "matrix", "string", "unit"]
}, O2 = {
  name: "index",
  category: "Construction",
  syntax: ["[start]", "[start:end]", "[start:step:end]", "[start1, start 2, ...]", "[start1:end1, start2:end2, ...]", "[start1:step1:end1, start2:step2:end2, ...]"],
  description: "Create an index to get or replace a subset of a matrix",
  examples: ["A = [1, 2, 3; 4, 5, 6]", "A[1, :]", "A[1, 2] = 50", "A[1:2, 1:2] = 1", "B = [1, 2, 3]", "B[B>1 and B<3]"],
  seealso: ["bignumber", "boolean", "complex", "matrix,", "number", "range", "string", "unit"]
}, $2 = {
  name: "matrix",
  category: "Construction",
  syntax: ["[]", "[a1, b1, ...; a2, b2, ...]", "matrix()", 'matrix("dense")', "matrix([...])"],
  description: "Create a matrix.",
  examples: ["[]", "[1, 2, 3]", "[1, 2, 3; 4, 5, 6]", "matrix()", "matrix([3, 4])", 'matrix([3, 4; 5, 6], "sparse")', 'matrix([3, 4; 5, 6], "sparse", "number")'],
  seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "sparse"]
}, I2 = {
  name: "number",
  category: "Construction",
  syntax: ["x", "number(x)", "number(unit, valuelessUnit)"],
  description: "Create a number or convert a string or boolean into a number.",
  examples: ["2", "2e3", "4.05", "number(2)", 'number("7.2")', "number(true)", "number([true, false, true, true])", 'number(unit("52cm"), "m")'],
  seealso: ["bignumber", "bigint", "boolean", "complex", "fraction", "index", "matrix", "string", "unit"]
}, q2 = {
  name: "sparse",
  category: "Construction",
  syntax: ["sparse()", "sparse([a1, b1, ...; a1, b2, ...])", 'sparse([a1, b1, ...; a1, b2, ...], "number")'],
  description: "Create a sparse matrix.",
  examples: ["sparse()", "sparse([3, 4; 5, 6])", 'sparse([3, 0; 5, 0], "number")'],
  seealso: ["bignumber", "boolean", "complex", "index", "number", "string", "unit", "matrix"]
}, R2 = {
  name: "splitUnit",
  category: "Construction",
  syntax: ["splitUnit(unit: Unit, parts: Unit[])"],
  description: "Split a unit in an array of units whose sum is equal to the original unit.",
  examples: ['splitUnit(1 m, ["feet", "inch"])'],
  seealso: ["unit", "createUnit"]
}, z2 = {
  name: "string",
  category: "Construction",
  syntax: ['"text"', "string(x)"],
  description: "Create a string or convert a value to a string",
  examples: ['"Hello World!"', "string(4.2)", "string(3 + 2i)"],
  seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "unit"]
}, P2 = {
  name: "unit",
  category: "Construction",
  syntax: ["value unit", "unit(value, unit)", "unit(string)"],
  description: "Create a unit.",
  examples: ["5.5 mm", "3 inch", 'unit(7.1, "kilogram")', 'unit("23 deg")'],
  seealso: ["bignumber", "boolean", "complex", "index", "matrix", "number", "string"]
}, U2 = {
  name: "config",
  category: "Core",
  syntax: ["config()", "config(options)"],
  description: "Get configuration or change configuration.",
  examples: ["config()", "1/3 + 1/4", 'config({number: "Fraction"})', "1/3 + 1/4"],
  seealso: []
}, L2 = {
  name: "import",
  category: "Core",
  syntax: ["import(functions)", "import(functions, options)"],
  description: "Import functions or constants from an object.",
  examples: ["import({myFn: f(x)=x^2, myConstant: 32 })", "myFn(2)", "myConstant"],
  seealso: []
}, k2 = {
  name: "typed",
  category: "Core",
  syntax: ["typed(signatures)", "typed(name, signatures)"],
  description: "Create a typed function.",
  examples: ['double = typed({ "number": f(x)=x+x, "string": f(x)=concat(x,x) })', "double(2)", 'double("hello")'],
  seealso: []
}, H2 = {
  name: "derivative",
  category: "Algebra",
  syntax: ["derivative(expr, variable)", "derivative(expr, variable, {simplify: boolean})"],
  description: "Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.",
  examples: ['derivative("2x^3", "x")', 'derivative("2x^3", "x", {simplify: false})', 'derivative("2x^2 + 3x + 4", "x")', 'derivative("sin(2x)", "x")', 'f = parse("x^2 + x")', 'x = parse("x")', "df = derivative(f, x)", "df.evaluate({x: 3})"],
  seealso: ["simplify", "parse", "evaluate"]
}, G2 = {
  name: "leafCount",
  category: "Algebra",
  syntax: ["leafCount(expr)"],
  description: "Computes the number of leaves in the parse tree of the given expression",
  examples: ['leafCount("e^(i*pi)-1")', 'leafCount(parse("{a: 22/7, b: 10^(1/2)}"))'],
  seealso: ["simplify"]
}, Z2 = {
  name: "lsolve",
  category: "Algebra",
  syntax: ["x=lsolve(L, b)"],
  description: "Finds one solution of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",
  examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"],
  seealso: ["lsolveAll", "lup", "lusolve", "usolve", "matrix", "sparse"]
}, V2 = {
  name: "lsolveAll",
  category: "Algebra",
  syntax: ["x=lsolveAll(L, b)"],
  description: "Finds all solutions of the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.",
  examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lsolve(a, b)"],
  seealso: ["lsolve", "lup", "lusolve", "usolve", "matrix", "sparse"]
}, W2 = {
  name: "lup",
  category: "Algebra",
  syntax: ["lup(m)"],
  description: "Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U",
  examples: ["lup([[2, 1], [1, 4]])", "lup(matrix([[2, 1], [1, 4]]))", "lup(sparse([[2, 1], [1, 4]]))"],
  seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "slu", "qr"]
}, Y2 = {
  name: "lusolve",
  category: "Algebra",
  syntax: ["x=lusolve(A, b)", "x=lusolve(lu, b)"],
  description: "Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.",
  examples: ["a = [-2, 3; 2, 1]", "b = [11, 9]", "x = lusolve(a, b)"],
  seealso: ["lup", "slu", "lsolve", "usolve", "matrix", "sparse"]
}, X2 = {
  name: "polynomialRoot",
  category: "Algebra",
  syntax: ["x=polynomialRoot(-6, 3)", "x=polynomialRoot(4, -4, 1)", "x=polynomialRoot(-8, 12, -6, 1)"],
  description: "Finds the roots of a univariate polynomial given by its coefficients starting from constant, linear, and so on, increasing in degree.",
  examples: ["a = polynomialRoot(-6, 11, -6, 1)"],
  seealso: ["cbrt", "sqrt"]
}, J2 = {
  name: "qr",
  category: "Algebra",
  syntax: ["qr(A)"],
  description: "Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.",
  examples: ["qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])"],
  seealso: ["lup", "slu", "matrix"]
}, Q2 = {
  name: "rationalize",
  category: "Algebra",
  syntax: ["rationalize(expr)", "rationalize(expr, scope)", "rationalize(expr, scope, detailed)"],
  description: "Transform a rationalizable expression in a rational fraction. If rational fraction is one variable polynomial then converts the numerator and denominator in canonical form, with decreasing exponents, returning the coefficients of numerator.",
  examples: ['rationalize("2x/y - y/(x+1)")', 'rationalize("2x/y - y/(x+1)", true)'],
  seealso: ["simplify"]
}, K2 = {
  name: "resolve",
  category: "Algebra",
  syntax: ["resolve(node, scope)"],
  description: "Recursively substitute variables in an expression tree.",
  examples: ['resolve(parse("1 + x"), { x: 7 })', 'resolve(parse("size(text)"), { text: "Hello World" })', 'resolve(parse("x + y"), { x: parse("3z") })', 'resolve(parse("3x"), { x: parse("y+z"), z: parse("w^y") })'],
  seealso: ["simplify", "evaluate"],
  mayThrow: ["ReferenceError"]
}, j2 = {
  name: "simplify",
  category: "Algebra",
  syntax: ["simplify(expr)", "simplify(expr, rules)"],
  description: "Simplify an expression tree.",
  examples: ['simplify("3 + 2 / 4")', 'simplify("2x + x")', 'f = parse("x * (x + 2 + x)")', "simplified = simplify(f)", "simplified.evaluate({x: 2})"],
  seealso: ["simplifyCore", "derivative", "evaluate", "parse", "rationalize", "resolve"]
}, eN = {
  name: "simplifyConstant",
  category: "Algebra",
  syntax: ["simplifyConstant(expr)", "simplifyConstant(expr, options)"],
  description: "Replace constant subexpressions of node with their values.",
  examples: ['simplifyConstant("(3-3)*x")', 'simplifyConstant(parse("z-cos(tau/8)"))'],
  seealso: ["simplify", "simplifyCore", "evaluate"]
}, rN = {
  name: "simplifyCore",
  category: "Algebra",
  syntax: ["simplifyCore(node)"],
  description: "Perform simple one-pass simplifications on an expression tree.",
  examples: ['simplifyCore(parse("0*x"))', 'simplifyCore(parse("(x+0)*2"))'],
  seealso: ["simplify", "simplifyConstant", "evaluate"]
}, tN = {
  name: "slu",
  category: "Algebra",
  syntax: ["slu(A, order, threshold)"],
  description: "Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U",
  examples: ["slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)"],
  seealso: ["lusolve", "lsolve", "usolve", "matrix", "sparse", "lup", "qr"]
}, nN = {
  name: "symbolicEqual",
  category: "Algebra",
  syntax: ["symbolicEqual(expr1, expr2)", "symbolicEqual(expr1, expr2, options)"],
  description: "Returns true if the difference of the expressions simplifies to 0",
  examples: ['symbolicEqual("x*y","y*x")', 'symbolicEqual("abs(x^2)", "x^2")', 'symbolicEqual("abs(x)", "x", {context: {abs: {trivial: true}}})'],
  seealso: ["simplify", "evaluate"]
}, aN = {
  name: "usolve",
  category: "Algebra",
  syntax: ["x=usolve(U, b)"],
  description: "Finds one solution of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",
  examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],
  seealso: ["usolveAll", "lup", "lusolve", "lsolve", "matrix", "sparse"]
}, iN = {
  name: "usolveAll",
  category: "Algebra",
  syntax: ["x=usolve(U, b)"],
  description: "Finds all solutions of the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.",
  examples: ["x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])"],
  seealso: ["usolve", "lup", "lusolve", "lsolve", "matrix", "sparse"]
}, oN = {
  name: "abs",
  category: "Arithmetic",
  syntax: ["abs(x)"],
  description: "Compute the absolute value.",
  examples: ["abs(3.5)", "abs(-4.2)"],
  seealso: ["sign"]
}, sN = {
  name: "add",
  category: "Operators",
  syntax: ["x + y", "add(x, y)"],
  description: "Add two values.",
  examples: ["a = 2.1 + 3.6", "a - 3.6", "3 + 2i", "3 cm + 2 inch", '"2.3" + "4"'],
  seealso: ["subtract"]
}, uN = {
  name: "cbrt",
  category: "Arithmetic",
  syntax: ["cbrt(x)", "cbrt(x, allRoots)"],
  description: "Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned",
  examples: ["cbrt(64)", "cube(4)", "cbrt(-8)", "cbrt(2 + 3i)", "cbrt(8i)", "cbrt(8i, true)", "cbrt(27 m^3)"],
  seealso: ["square", "sqrt", "cube", "multiply"]
}, lN = {
  name: "ceil",
  category: "Arithmetic",
  syntax: ["ceil(x)"],
  description: "Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.",
  examples: ["ceil(3.2)", "ceil(3.8)", "ceil(-4.2)"],
  seealso: ["floor", "fix", "round"]
}, cN = {
  name: "cube",
  category: "Arithmetic",
  syntax: ["cube(x)"],
  description: "Compute the cube of a value. The cube of x is x * x * x.",
  examples: ["cube(2)", "2^3", "2 * 2 * 2"],
  seealso: ["multiply", "square", "pow"]
}, fN = {
  name: "divide",
  category: "Operators",
  syntax: ["x / y", "divide(x, y)"],
  description: "Divide two values.",
  examples: ["a = 2 / 3", "a * 3", "4.5 / 2", "3 + 4 / 2", "(3 + 4) / 2", "18 km / 4.5"],
  seealso: ["multiply"]
}, mN = {
  name: "dotDivide",
  category: "Operators",
  syntax: ["x ./ y", "dotDivide(x, y)"],
  description: "Divide two values element wise.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a ./ b"],
  seealso: ["multiply", "dotMultiply", "divide"]
}, vN = {
  name: "dotMultiply",
  category: "Operators",
  syntax: ["x .* y", "dotMultiply(x, y)"],
  description: "Multiply two values element wise.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "b = [2, 1, 1; 3, 2, 5]", "a .* b"],
  seealso: ["multiply", "divide", "dotDivide"]
}, pN = {
  name: "dotPow",
  category: "Operators",
  syntax: ["x .^ y", "dotPow(x, y)"],
  description: "Calculates the power of x to y element wise.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "a .^ 2"],
  seealso: ["pow"]
}, dN = {
  name: "exp",
  category: "Arithmetic",
  syntax: ["exp(x)"],
  description: "Calculate the exponent of a value.",
  examples: ["exp(1.3)", "e ^ 1.3", "log(exp(1.3))", "x = 2.4", "(exp(i*x) == cos(x) + i*sin(x))   # Euler's formula"],
  seealso: ["expm", "expm1", "pow", "log"]
}, hN = {
  name: "expm",
  category: "Arithmetic",
  syntax: ["exp(x)"],
  description: "Compute the matrix exponential, expm(A) = e^A. The matrix must be square. Not to be confused with exp(a), which performs element-wise exponentiation.",
  examples: ["expm([[0,2],[0,0]])"],
  seealso: ["exp"]
}, gN = {
  name: "expm1",
  category: "Arithmetic",
  syntax: ["expm1(x)"],
  description: "Calculate the value of subtracting 1 from the exponential value.",
  examples: ["expm1(2)", "pow(e, 2) - 1", "log(expm1(2) + 1)"],
  seealso: ["exp", "pow", "log"]
}, yN = {
  name: "fix",
  category: "Arithmetic",
  syntax: ["fix(x)"],
  description: "Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.",
  examples: ["fix(3.2)", "fix(3.8)", "fix(-4.2)", "fix(-4.8)"],
  seealso: ["ceil", "floor", "round"]
}, bN = {
  name: "floor",
  category: "Arithmetic",
  syntax: ["floor(x)"],
  description: "Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.",
  examples: ["floor(3.2)", "floor(3.8)", "floor(-4.2)"],
  seealso: ["ceil", "fix", "round"]
}, xN = {
  name: "gcd",
  category: "Arithmetic",
  syntax: ["gcd(a, b)", "gcd(a, b, c, ...)"],
  description: "Compute the greatest common divisor.",
  examples: ["gcd(8, 12)", "gcd(-4, 6)", "gcd(25, 15, -10)"],
  seealso: ["lcm", "xgcd"]
}, wN = {
  name: "hypot",
  category: "Arithmetic",
  syntax: ["hypot(a, b, c, ...)", "hypot([a, b, c, ...])"],
  description: "Calculate the hypotenuse of a list with values.",
  examples: ["hypot(3, 4)", "sqrt(3^2 + 4^2)", "hypot(-2)", "hypot([3, 4, 5])"],
  seealso: ["abs", "norm"]
}, DN = {
  name: "invmod",
  category: "Arithmetic",
  syntax: ["invmod(a, b)"],
  description: "Calculate the (modular) multiplicative inverse of a modulo b. Solution to the equation ax ≣ 1 (mod b)",
  examples: ["invmod(8, 12)", "invmod(7, 13)", "invmod(15151, 15122)"],
  seealso: ["gcd", "xgcd"]
}, NN = {
  name: "lcm",
  category: "Arithmetic",
  syntax: ["lcm(x, y)"],
  description: "Compute the least common multiple.",
  examples: ["lcm(4, 6)", "lcm(6, 21)", "lcm(6, 21, 5)"],
  seealso: ["gcd"]
}, AN = {
  name: "log",
  category: "Arithmetic",
  syntax: ["log(x)", "log(x, base)"],
  description: "Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).",
  examples: ["log(3.5)", "a = log(2.4)", "exp(a)", "10 ^ 4", "log(10000, 10)", "log(10000) / log(10)", "b = log(1024, 2)", "2 ^ b"],
  seealso: ["exp", "log1p", "log2", "log10"]
}, EN = {
  name: "log10",
  category: "Arithmetic",
  syntax: ["log10(x)"],
  description: "Compute the 10-base logarithm of a value.",
  examples: ["log10(0.00001)", "log10(10000)", "10 ^ 4", "log(10000) / log(10)", "log(10000, 10)"],
  seealso: ["exp", "log"]
}, SN = {
  name: "log1p",
  category: "Arithmetic",
  syntax: ["log1p(x)", "log1p(x, base)"],
  description: "Calculate the logarithm of a `value+1`",
  examples: ["log1p(2.5)", "exp(log1p(1.4))", "pow(10, 4)", "log1p(9999, 10)", "log1p(9999) / log(10)"],
  seealso: ["exp", "log", "log2", "log10"]
}, CN = {
  name: "log2",
  category: "Arithmetic",
  syntax: ["log2(x)"],
  description: "Calculate the 2-base of a value. This is the same as calculating `log(x, 2)`.",
  examples: ["log2(0.03125)", "log2(16)", "log2(16) / log2(2)", "pow(2, 4)"],
  seealso: ["exp", "log1p", "log", "log10"]
}, MN = {
  name: "mod",
  category: "Operators",
  syntax: ["x % y", "x mod y", "mod(x, y)"],
  description: "Calculates the modulus, the remainder of an integer division.",
  examples: ["7 % 3", "11 % 2", "10 mod 4", "isOdd(x) = x % 2", "isOdd(2)", "isOdd(3)"],
  seealso: ["divide"]
}, _N = {
  name: "multiply",
  category: "Operators",
  syntax: ["x * y", "multiply(x, y)"],
  description: "multiply two values.",
  examples: ["a = 2.1 * 3.4", "a / 3.4", "2 * 3 + 4", "2 * (3 + 4)", "3 * 2.1 km"],
  seealso: ["divide"]
}, FN = {
  name: "norm",
  category: "Arithmetic",
  syntax: ["norm(x)", "norm(x, p)"],
  description: "Calculate the norm of a number, vector or matrix.",
  examples: ["abs(-3.5)", "norm(-3.5)", "norm(3 - 4i)", "norm([1, 2, -3], Infinity)", "norm([1, 2, -3], -Infinity)", "norm([3, 4], 2)", "norm([[1, 2], [3, 4]], 1)", 'norm([[1, 2], [3, 4]], "inf")', 'norm([[1, 2], [3, 4]], "fro")']
}, TN = {
  name: "nthRoot",
  category: "Arithmetic",
  syntax: ["nthRoot(a)", "nthRoot(a, root)"],
  description: 'Calculate the nth root of a value. The principal nth root of a positive real number A, is the positive real solution of the equation "x^root = A".',
  examples: ["4 ^ 3", "nthRoot(64, 3)", "nthRoot(9, 2)", "sqrt(9)"],
  seealso: ["nthRoots", "pow", "sqrt"]
}, BN = {
  name: "nthRoots",
  category: "Arithmetic",
  syntax: ["nthRoots(A)", "nthRoots(A, root)"],
  description: 'Calculate the nth roots of a value. An nth root of a positive real number A, is a positive real solution of the equation "x^root = A". This function returns an array of complex values.',
  examples: ["nthRoots(1)", "nthRoots(1, 3)"],
  seealso: ["sqrt", "pow", "nthRoot"]
}, ON = {
  name: "pow",
  category: "Operators",
  syntax: ["x ^ y", "pow(x, y)"],
  description: "Calculates the power of x to y, x^y.",
  examples: ["2^3", "2*2*2", "1 + e ^ (pi * i)", "pow([[1, 2], [4, 3]], 2)", "pow([[1, 2], [4, 3]], -1)"],
  seealso: ["multiply", "nthRoot", "nthRoots", "sqrt"]
}, $N = {
  name: "round",
  category: "Arithmetic",
  syntax: ["round(x)", "round(x, n)", "round(unit, valuelessUnit)", "round(unit, n, valuelessUnit)"],
  description: "round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.",
  examples: ["round(3.2)", "round(3.8)", "round(-4.2)", "round(-4.8)", "round(pi, 3)", "round(123.45678, 2)", "round(3.241cm, 2, cm)", "round([3.2, 3.8, -4.7])"],
  seealso: ["ceil", "floor", "fix"]
}, IN = {
  name: "sign",
  category: "Arithmetic",
  syntax: ["sign(x)"],
  description: "Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.",
  examples: ["sign(3.5)", "sign(-4.2)", "sign(0)"],
  seealso: ["abs"]
}, qN = {
  name: "sqrt",
  category: "Arithmetic",
  syntax: ["sqrt(x)"],
  description: "Compute the square root value. If x = y * y, then y is the square root of x.",
  examples: ["sqrt(25)", "5 * 5", "sqrt(-1)"],
  seealso: ["square", "sqrtm", "multiply", "nthRoot", "nthRoots", "pow"]
}, RN = {
  name: "sqrtm",
  category: "Arithmetic",
  syntax: ["sqrtm(x)"],
  description: "Calculate the principal square root of a square matrix. The principal square root matrix `X` of another matrix `A` is such that `X * X = A`.",
  examples: ["sqrtm([[33, 24], [48, 57]])"],
  seealso: ["sqrt", "abs", "square", "multiply"]
}, zN = {
  name: "sylvester",
  category: "Algebra",
  syntax: ["sylvester(A,B,C)"],
  description: "Solves the real-valued Sylvester equation AX+XB=C for X",
  examples: ["sylvester([[-1, -2], [1, 1]], [[-2, 1], [-1, 2]], [[-3, 2], [3, 0]])", "A = [[-1, -2], [1, 1]]; B = [[2, -1], [1, -2]]; C = [[-3, 2], [3, 0]]", "sylvester(A, B, C)"],
  seealso: ["schur", "lyap"]
}, PN = {
  name: "schur",
  category: "Algebra",
  syntax: ["schur(A)"],
  description: "Performs a real Schur decomposition of the real matrix A = UTU'",
  examples: ["schur([[1, 0], [-4, 3]])", "A = [[1, 0], [-4, 3]]", "schur(A)"],
  seealso: ["lyap", "sylvester"]
}, UN = {
  name: "lyap",
  category: "Algebra",
  syntax: ["lyap(A,Q)"],
  description: "Solves the Continuous-time Lyapunov equation AP+PA'+Q=0 for P",
  examples: ["lyap([[-2, 0], [1, -4]], [[3, 1], [1, 3]])", "A = [[-2, 0], [1, -4]]", "Q = [[3, 1], [1, 3]]", "lyap(A,Q)"],
  seealso: ["schur", "sylvester"]
}, LN = {
  name: "square",
  category: "Arithmetic",
  syntax: ["square(x)"],
  description: "Compute the square of a value. The square of x is x * x.",
  examples: ["square(3)", "sqrt(9)", "3^2", "3 * 3"],
  seealso: ["multiply", "pow", "sqrt", "cube"]
}, kN = {
  name: "subtract",
  category: "Operators",
  syntax: ["x - y", "subtract(x, y)"],
  description: "subtract two values.",
  examples: ["a = 5.3 - 2", "a + 2", "2/3 - 1/6", "2 * 3 - 3", "2.1 km - 500m"],
  seealso: ["add"]
}, HN = {
  name: "unaryMinus",
  category: "Operators",
  syntax: ["-x", "unaryMinus(x)"],
  description: "Inverse the sign of a value. Converts booleans and strings to numbers.",
  examples: ["-4.5", "-(-5.6)", '-"22"'],
  seealso: ["add", "subtract", "unaryPlus"]
}, GN = {
  name: "unaryPlus",
  category: "Operators",
  syntax: ["+x", "unaryPlus(x)"],
  description: "Converts booleans and strings to numbers.",
  examples: ["+true", '+"2"'],
  seealso: ["add", "subtract", "unaryMinus"]
}, ZN = {
  name: "xgcd",
  category: "Arithmetic",
  syntax: ["xgcd(a, b)"],
  description: "Calculate the extended greatest common divisor for two values. The result is an array [d, x, y] with 3 entries, where d is the greatest common divisor, and d = x * a + y * b.",
  examples: ["xgcd(8, 12)", "gcd(8, 12)", "xgcd(36163, 21199)"],
  seealso: ["gcd", "lcm"]
}, VN = {
  name: "bitAnd",
  category: "Bitwise",
  syntax: ["x & y", "bitAnd(x, y)"],
  description: "Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0",
  examples: ["5 & 3", "bitAnd(53, 131)", "[1, 12, 31] & 42"],
  seealso: ["bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
}, WN = {
  name: "bitNot",
  category: "Bitwise",
  syntax: ["~x", "bitNot(x)"],
  description: "Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.",
  examples: ["~1", "~2", "bitNot([2, -3, 4])"],
  seealso: ["bitAnd", "bitOr", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
}, YN = {
  name: "bitOr",
  category: "Bitwise",
  syntax: ["x | y", "bitOr(x, y)"],
  description: "Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.",
  examples: ["5 | 3", "bitOr([1, 2, 3], 4)"],
  seealso: ["bitAnd", "bitNot", "bitXor", "leftShift", "rightArithShift", "rightLogShift"]
}, XN = {
  name: "bitXor",
  category: "Bitwise",
  syntax: ["bitXor(x, y)"],
  description: "Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.",
  examples: ["bitOr(1, 2)", "bitXor([2, 3, 4], 4)"],
  seealso: ["bitAnd", "bitNot", "bitOr", "leftShift", "rightArithShift", "rightLogShift"]
}, JN = {
  name: "leftShift",
  category: "Bitwise",
  syntax: ["x << y", "leftShift(x, y)"],
  description: "Bitwise left logical shift of a value x by y number of bits.",
  examples: ["4 << 1", "8 >> 1"],
  seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "rightArithShift", "rightLogShift"]
}, QN = {
  name: "rightArithShift",
  category: "Bitwise",
  syntax: ["x >> y", "rightArithShift(x, y)"],
  description: "Bitwise right arithmetic shift of a value x by y number of bits.",
  examples: ["8 >> 1", "4 << 1", "-12 >> 2"],
  seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightLogShift"]
}, KN = {
  name: "rightLogShift",
  category: "Bitwise",
  syntax: ["x >>> y", "rightLogShift(x, y)"],
  description: "Bitwise right logical shift of a value x by y number of bits.",
  examples: ["8 >>> 1", "4 << 1", "-12 >>> 2"],
  seealso: ["bitAnd", "bitNot", "bitOr", "bitXor", "leftShift", "rightArithShift"]
}, jN = {
  name: "bellNumbers",
  category: "Combinatorics",
  syntax: ["bellNumbers(n)"],
  description: "The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.",
  examples: ["bellNumbers(3)", "bellNumbers(8)"],
  seealso: ["stirlingS2"]
}, eA = {
  name: "catalan",
  category: "Combinatorics",
  syntax: ["catalan(n)"],
  description: "The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.",
  examples: ["catalan(3)", "catalan(8)"],
  seealso: ["bellNumbers"]
}, rA = {
  name: "composition",
  category: "Combinatorics",
  syntax: ["composition(n, k)"],
  description: "The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.",
  examples: ["composition(5, 3)"],
  seealso: ["combinations"]
}, tA = {
  name: "stirlingS2",
  category: "Combinatorics",
  syntax: ["stirlingS2(n, k)"],
  description: "he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.",
  examples: ["stirlingS2(5, 3)"],
  seealso: ["bellNumbers"]
}, nA = {
  name: "arg",
  category: "Complex",
  syntax: ["arg(x)"],
  description: "Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).",
  examples: ["arg(2 + 2i)", "atan2(3, 2)", "arg(2 + 3i)"],
  seealso: ["re", "im", "conj", "abs"]
}, aA = {
  name: "conj",
  category: "Complex",
  syntax: ["conj(x)"],
  description: "Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.",
  examples: ["conj(2 + 3i)", "conj(2 - 3i)", "conj(-5.2i)"],
  seealso: ["re", "im", "abs", "arg"]
}, iA = {
  name: "im",
  category: "Complex",
  syntax: ["im(x)"],
  description: "Get the imaginary part of a complex number.",
  examples: ["im(2 + 3i)", "re(2 + 3i)", "im(-5.2i)", "im(2.4)"],
  seealso: ["re", "conj", "abs", "arg"]
}, oA = {
  name: "re",
  category: "Complex",
  syntax: ["re(x)"],
  description: "Get the real part of a complex number.",
  examples: ["re(2 + 3i)", "im(2 + 3i)", "re(-5.2i)", "re(2.4)"],
  seealso: ["im", "conj", "abs", "arg"]
}, sA = {
  name: "evaluate",
  category: "Expression",
  syntax: ["evaluate(expression)", "evaluate(expression, scope)", "evaluate([expr1, expr2, expr3, ...])", "evaluate([expr1, expr2, expr3, ...], scope)"],
  description: "Evaluate an expression or an array with expressions.",
  examples: ['evaluate("2 + 3")', 'evaluate("sqrt(16)")', 'evaluate("2 inch to cm")', 'evaluate("sin(x * pi)", { "x": 1/2 })', 'evaluate(["width=2", "height=4","width*height"])'],
  seealso: []
}, uA = {
  name: "help",
  category: "Expression",
  syntax: ["help(object)", "help(string)"],
  description: "Display documentation on a function or data type.",
  examples: ["help(sqrt)", 'help("complex")'],
  seealso: []
}, lA = {
  name: "distance",
  category: "Geometry",
  syntax: ["distance([x1, y1], [x2, y2])", "distance([[x1, y1], [x2, y2]])"],
  description: "Calculates the Euclidean distance between two points.",
  examples: ["distance([0,0], [4,4])", "distance([[0,0], [4,4]])"],
  seealso: []
}, cA = {
  name: "intersect",
  category: "Geometry",
  syntax: ["intersect(expr1, expr2, expr3, expr4)", "intersect(expr1, expr2, expr3)"],
  description: "Computes the intersection point of lines and/or planes.",
  examples: ["intersect([0, 0], [10, 10], [10, 0], [0, 10])", "intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])"],
  seealso: []
}, fA = {
  name: "and",
  category: "Logical",
  syntax: ["x and y", "and(x, y)"],
  description: "Logical and. Test whether two values are both defined with a nonzero/nonempty value.",
  examples: ["true and false", "true and true", "2 and 4"],
  seealso: ["not", "or", "xor"]
}, mA = {
  name: "not",
  category: "Logical",
  syntax: ["not x", "not(x)"],
  description: "Logical not. Flips the boolean value of given argument.",
  examples: ["not true", "not false", "not 2", "not 0"],
  seealso: ["and", "or", "xor"]
}, vA = {
  name: "or",
  category: "Logical",
  syntax: ["x or y", "or(x, y)"],
  description: "Logical or. Test if at least one value is defined with a nonzero/nonempty value.",
  examples: ["true or false", "false or false", "0 or 4"],
  seealso: ["not", "and", "xor"]
}, pA = {
  name: "xor",
  category: "Logical",
  syntax: ["x xor y", "xor(x, y)"],
  description: "Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.",
  examples: ["true xor false", "false xor false", "true xor true", "0 xor 4"],
  seealso: ["not", "and", "or"]
}, dA = {
  name: "column",
  category: "Matrix",
  syntax: ["column(x, index)"],
  description: "Return a column from a matrix or array.",
  examples: ["A = [[1, 2], [3, 4]]", "column(A, 1)", "column(A, 2)"],
  seealso: ["row", "matrixFromColumns"]
}, hA = {
  name: "concat",
  category: "Matrix",
  syntax: ["concat(A, B, C, ...)", "concat(A, B, C, ..., dim)"],
  description: "Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.",
  examples: ["A = [1, 2; 5, 6]", "B = [3, 4; 7, 8]", "concat(A, B)", "concat(A, B, 1)", "concat(A, B, 2)"],
  seealso: ["det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, gA = {
  name: "count",
  category: "Matrix",
  syntax: ["count(x)"],
  description: "Count the number of elements of a matrix, array or string.",
  examples: ["a = [1, 2; 3, 4; 5, 6]", "count(a)", "size(a)", 'count("hello world")'],
  seealso: ["size"]
}, yA = {
  name: "cross",
  category: "Matrix",
  syntax: ["cross(A, B)"],
  description: "Calculate the cross product for two vectors in three dimensional space.",
  examples: ["cross([1, 1, 0],  [0, 1, 1])", "cross([3, -3, 1], [4, 9, 2])", "cross([2, 3, 4],  [5, 6, 7])"],
  seealso: ["multiply", "dot"]
}, bA = {
  name: "ctranspose",
  category: "Matrix",
  syntax: ["x'", "ctranspose(x)"],
  description: "Complex Conjugate and Transpose a matrix",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "ctranspose(a)"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"]
}, xA = {
  name: "det",
  category: "Matrix",
  syntax: ["det(x)"],
  description: "Calculate the determinant of a matrix",
  examples: ["det([1, 2; 3, 4])", "det([-2, 2, 3; -1, 1, 3; 2, 0, -1])"],
  seealso: ["concat", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, wA = {
  name: "diag",
  category: "Matrix",
  syntax: ["diag(x)", "diag(x, k)"],
  description: "Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.",
  examples: ["diag(1:3)", "diag(1:3, 1)", "a = [1, 2, 3; 4, 5, 6; 7, 8, 9]", "diag(a)"],
  seealso: ["concat", "det", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, DA = {
  name: "diff",
  category: "Matrix",
  syntax: ["diff(arr)", "diff(arr, dim)"],
  description: ["Create a new matrix or array with the difference of the passed matrix or array.", "Dim parameter is optional and used to indicate the dimension of the array/matrix to apply the difference", "If no dimension parameter is passed it is assumed as dimension 0", "Dimension is zero-based in javascript and one-based in the parser", "Arrays must be 'rectangular' meaning arrays like [1, 2]", "If something is passed as a matrix it will be returned as a matrix but other than that all matrices are converted to arrays"],
  examples: ["A = [1, 2, 4, 7, 0]", "diff(A)", "diff(A, 1)", "B = [[1, 2], [3, 4]]", "diff(B)", "diff(B, 1)", "diff(B, 2)", "diff(B, bignumber(2))", "diff([[1, 2], matrix([3, 4])], 2)"],
  seealso: ["subtract", "partitionSelect"]
}, NA = {
  name: "dot",
  category: "Matrix",
  syntax: ["dot(A, B)", "A * B"],
  description: "Calculate the dot product of two vectors. The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn",
  examples: ["dot([2, 4, 1], [2, 2, 3])", "[2, 4, 1] * [2, 2, 3]"],
  seealso: ["multiply", "cross"]
}, AA = {
  name: "eigs",
  category: "Matrix",
  syntax: ["eigs(x)"],
  description: "Calculate the eigenvalues and optionally eigenvectors of a square matrix",
  examples: ["eigs([[5, 2.3], [2.3, 1]])", "eigs([[1, 2, 3], [4, 5, 6], [7, 8, 9]], { precision: 1e-6, eigenvectors: false })"],
  seealso: ["inv"]
}, EA = {
  name: "filter",
  category: "Matrix",
  syntax: ["filter(x, test)"],
  description: "Filter items in a matrix.",
  examples: ["isPositive(x) = x > 0", "filter([6, -2, -1, 4, 3], isPositive)", "filter([6, -2, 0, 1, 0], x != 0)"],
  seealso: ["sort", "map", "forEach"]
}, SA = {
  name: "flatten",
  category: "Matrix",
  syntax: ["flatten(x)"],
  description: "Flatten a multi dimensional matrix into a single dimensional matrix.",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "size(a)", "b = flatten(a)", "size(b)"],
  seealso: ["concat", "resize", "size", "squeeze"]
}, CA = {
  name: "forEach",
  category: "Matrix",
  syntax: ["forEach(x, callback)"],
  description: "Iterates over all elements of a matrix/array, and executes the given callback function.",
  examples: ["numberOfPets = {}", "addPet(n) = numberOfPets[n] = (numberOfPets[n] ? numberOfPets[n]:0 ) + 1;", 'forEach(["Dog","Cat","Cat"], addPet)', "numberOfPets"],
  seealso: ["map", "sort", "filter"]
}, MA = {
  name: "getMatrixDataType",
  category: "Matrix",
  syntax: ["getMatrixDataType(x)"],
  description: 'Find the data type of all elements in a matrix or array, for example "number" if all items are a number and "Complex" if all values are complex numbers. If a matrix contains more than one data type, it will return "mixed".',
  examples: ["getMatrixDataType([1, 2, 3])", "getMatrixDataType([[5 cm], [2 inch]])", 'getMatrixDataType([1, "text"])', "getMatrixDataType([1, bignumber(4)])"],
  seealso: ["matrix", "sparse", "typeOf"]
}, _A = {
  name: "identity",
  category: "Matrix",
  syntax: ["identity(n)", "identity(m, n)", "identity([m, n])"],
  description: "Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.",
  examples: ["identity(3)", "identity(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "identity(size(a))"],
  seealso: ["concat", "det", "diag", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, FA = {
  name: "inv",
  category: "Matrix",
  syntax: ["inv(x)"],
  description: "Calculate the inverse of a matrix",
  examples: ["inv([1, 2; 3, 4])", "inv(4)", "1 / 4"],
  seealso: ["concat", "det", "diag", "identity", "ones", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, TA = {
  name: "pinv",
  category: "Matrix",
  syntax: ["pinv(x)"],
  description: "Calculate the Moore–Penrose inverse of a matrix",
  examples: ["pinv([1, 2; 3, 4])", "pinv([[1, 0], [0, 1], [0, 1]])", "pinv(4)"],
  seealso: ["inv"]
}, BA = {
  name: "kron",
  category: "Matrix",
  syntax: ["kron(x, y)"],
  description: "Calculates the Kronecker product of 2 matrices or vectors.",
  examples: ["kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])", "kron([1,1], [2,3,4])"],
  seealso: ["multiply", "dot", "cross"]
}, OA = {
  name: "map",
  category: "Matrix",
  syntax: ["map(x, callback)", "map(x, y, ..., callback)"],
  description: "Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array or the matrices/arrays.",
  examples: ["map([1, 2, 3], square)", "map([1, 2], [3, 4], f(a,b) = a + b)"],
  seealso: ["filter", "forEach"]
}, $A = {
  name: "matrixFromColumns",
  category: "Matrix",
  syntax: ["matrixFromColumns(...arr)", "matrixFromColumns(row1, row2)", "matrixFromColumns(row1, row2, row3)"],
  description: "Create a dense matrix from vectors as individual columns.",
  examples: ["matrixFromColumns([1, 2, 3], [[4],[5],[6]])"],
  seealso: ["matrix", "matrixFromRows", "matrixFromFunction", "zeros"]
}, IA = {
  name: "matrixFromFunction",
  category: "Matrix",
  syntax: ["matrixFromFunction(size, fn)", "matrixFromFunction(size, fn, format)", "matrixFromFunction(size, fn, format, datatype)", "matrixFromFunction(size, format, fn)", "matrixFromFunction(size, format, datatype, fn)"],
  description: "Create a matrix by evaluating a generating function at each index.",
  examples: ["f(I) = I[1] - I[2]", "matrixFromFunction([3,3], f)", "g(I) = I[1] - I[2] == 1 ? 4 : 0", 'matrixFromFunction([100, 100], "sparse", g)', "matrixFromFunction([5], random)"],
  seealso: ["matrix", "matrixFromRows", "matrixFromColumns", "zeros"]
}, qA = {
  name: "matrixFromRows",
  category: "Matrix",
  syntax: ["matrixFromRows(...arr)", "matrixFromRows(row1, row2)", "matrixFromRows(row1, row2, row3)"],
  description: "Create a dense matrix from vectors as individual rows.",
  examples: ["matrixFromRows([1, 2, 3], [[4],[5],[6]])"],
  seealso: ["matrix", "matrixFromColumns", "matrixFromFunction", "zeros"]
}, RA = {
  name: "ones",
  category: "Matrix",
  syntax: ["ones(m)", "ones(m, n)", "ones(m, n, p, ...)", "ones([m])", "ones([m, n])", "ones([m, n, p, ...])"],
  description: "Create a matrix containing ones.",
  examples: ["ones(3)", "ones(3, 5)", "ones([2,3]) * 4.5", "a = [1, 2, 3; 4, 5, 6]", "ones(size(a))"],
  seealso: ["concat", "det", "diag", "identity", "inv", "range", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, zA = {
  name: "partitionSelect",
  category: "Matrix",
  syntax: ["partitionSelect(x, k)", "partitionSelect(x, k, compare)"],
  description: "Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.",
  examples: ["partitionSelect([5, 10, 1], 2)", 'partitionSelect(["C", "B", "A", "D"], 1, compareText)', "arr = [5, 2, 1]", "partitionSelect(arr, 0) # returns 1, arr is now: [1, 2, 5]", "arr", "partitionSelect(arr, 1, 'desc') # returns 2, arr is now: [5, 2, 1]", "arr"],
  seealso: ["sort"]
}, PA = {
  name: "range",
  category: "Type",
  syntax: ["start:end", "start:step:end", "range(start, end)", "range(start, end, step)", "range(string)"],
  description: "Create a range. Lower bound of the range is included, upper bound is excluded.",
  examples: ["1:5", "3:-1:-3", "range(3, 7)", "range(0, 12, 2)", 'range("4:10")', "range(1m, 1m, 3m)", "a = [1, 2, 3, 4; 5, 6, 7, 8]", "a[1:2, 1:2]"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "size", "squeeze", "subset", "trace", "transpose", "zeros"]
}, UA = {
  name: "reshape",
  category: "Matrix",
  syntax: ["reshape(x, sizes)"],
  description: "Reshape a multi dimensional array to fit the specified dimensions.",
  examples: ["reshape([1, 2, 3, 4, 5, 6], [2, 3])", "reshape([[1, 2], [3, 4]], [1, 4])", "reshape([[1, 2], [3, 4]], [4])", "reshape([1, 2, 3, 4], [-1, 2])"],
  seealso: ["size", "squeeze", "resize"]
}, LA = {
  name: "resize",
  category: "Matrix",
  syntax: ["resize(x, size)", "resize(x, size, defaultValue)"],
  description: "Resize a matrix.",
  examples: ["resize([1,2,3,4,5], [3])", "resize([1,2,3], [5])", "resize([1,2,3], [5], -1)", "resize(2, [2, 3])", 'resize("hello", [8], "!")'],
  seealso: ["size", "subset", "squeeze", "reshape"]
}, kA = {
  name: "rotate",
  category: "Matrix",
  syntax: ["rotate(w, theta)", "rotate(w, theta, v)"],
  description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",
  examples: ["rotate([1, 0], pi / 2)", 'rotate(matrix([1, 0]), unit("35deg"))', 'rotate([1, 0, 0], unit("90deg"), [0, 0, 1])', 'rotate(matrix([1, 0, 0]), unit("90deg"), matrix([0, 0, 1]))'],
  seealso: ["matrix", "rotationMatrix"]
}, HA = {
  name: "rotationMatrix",
  category: "Matrix",
  syntax: ["rotationMatrix(theta)", "rotationMatrix(theta, v)", "rotationMatrix(theta, v, format)"],
  description: "Returns a 2-D rotation matrix (2x2) for a given angle (in radians). Returns a 2-D rotation matrix (3x3) of a given angle (in radians) around given axis.",
  examples: ["rotationMatrix(pi / 2)", 'rotationMatrix(unit("45deg"), [0, 0, 1])', 'rotationMatrix(1, matrix([0, 0, 1]), "sparse")'],
  seealso: ["cos", "sin"]
}, GA = {
  name: "row",
  category: "Matrix",
  syntax: ["row(x, index)"],
  description: "Return a row from a matrix or array.",
  examples: ["A = [[1, 2], [3, 4]]", "row(A, 1)", "row(A, 2)"],
  seealso: ["column", "matrixFromRows"]
}, ZA = {
  name: "size",
  category: "Matrix",
  syntax: ["size(x)"],
  description: "Calculate the size of a matrix.",
  examples: ["size(2.3)", 'size("hello world")', "a = [1, 2; 3, 4; 5, 6]", "size(a)", "size(1:6)"],
  seealso: ["concat", "count", "det", "diag", "identity", "inv", "ones", "range", "squeeze", "subset", "trace", "transpose", "zeros"]
}, VA = {
  name: "sort",
  category: "Matrix",
  syntax: ["sort(x)", "sort(x, compare)"],
  description: 'Sort the items in a matrix. Compare can be a string "asc", "desc", "natural", or a custom sort function.',
  examples: ["sort([5, 10, 1])", 'sort(["C", "B", "A", "D"], "natural")', "sortByLength(a, b) = size(a)[1] - size(b)[1]", 'sort(["Langdon", "Tom", "Sara"], sortByLength)', 'sort(["10", "1", "2"], "natural")'],
  seealso: ["map", "filter", "forEach"]
}, WA = {
  name: "squeeze",
  category: "Matrix",
  syntax: ["squeeze(x)"],
  description: "Remove inner and outer singleton dimensions from a matrix.",
  examples: ["a = zeros(3,2,1)", "size(squeeze(a))", "b = zeros(1,1,3)", "size(squeeze(b))"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "subset", "trace", "transpose", "zeros"]
}, YA = {
  name: "subset",
  category: "Matrix",
  syntax: ["value(index)", "value(index) = replacement", "subset(value, [index])", "subset(value, [index], replacement)"],
  description: "Get or set a subset of the entries of a matrix or characters of a string. Indexes are one-based. There should be one index specification for each dimension of the target. Each specification can be a single index, a list of indices, or a range in colon notation `l:u`. In a range, both the lower bound l and upper bound u are included; and if a bound is omitted it defaults to the most extreme valid value. The cartesian product of the indices specified in each dimension determines the target of the operation.",
  examples: ["d = [1, 2; 3, 4]", "e = []", "e[1, 1:2] = [5, 6]", "e[2, :] = [7, 8]", "f = d * e", "f[2, 1]", "f[:, 1]", "f[[1,2], [1,3]] = [9, 10; 11, 12]", "f"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "trace", "transpose", "zeros"]
}, XA = {
  name: "trace",
  category: "Matrix",
  syntax: ["trace(A)"],
  description: "Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.",
  examples: ["A = [1, 2, 3; -1, 2, 3; 2, 0, 3]", "trace(A)"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "transpose", "zeros"]
}, JA = {
  name: "transpose",
  category: "Matrix",
  syntax: ["x'", "transpose(x)"],
  description: "Transpose a matrix",
  examples: ["a = [1, 2, 3; 4, 5, 6]", "a'", "transpose(a)"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "zeros"]
}, QA = {
  name: "zeros",
  category: "Matrix",
  syntax: ["zeros(m)", "zeros(m, n)", "zeros(m, n, p, ...)", "zeros([m])", "zeros([m, n])", "zeros([m, n, p, ...])"],
  description: "Create a matrix containing zeros.",
  examples: ["zeros(3)", "zeros(3, 5)", "a = [1, 2, 3; 4, 5, 6]", "zeros(size(a))"],
  seealso: ["concat", "det", "diag", "identity", "inv", "ones", "range", "size", "squeeze", "subset", "trace", "transpose"]
}, KA = {
  name: "fft",
  category: "Matrix",
  syntax: ["fft(x)"],
  description: "Calculate N-dimensional Fourier transform",
  examples: ["fft([[1, 0], [1, 0]])"],
  seealso: ["ifft"]
}, jA = {
  name: "ifft",
  category: "Matrix",
  syntax: ["ifft(x)"],
  description: "Calculate N-dimensional inverse Fourier transform",
  examples: ["ifft([[2, 2], [0, 0]])"],
  seealso: ["fft"]
}, eE = {
  name: "combinations",
  category: "Probability",
  syntax: ["combinations(n, k)"],
  description: "Compute the number of combinations of n items taken k at a time",
  examples: ["combinations(7, 5)"],
  seealso: ["combinationsWithRep", "permutations", "factorial"]
}, rE = {
  name: "combinationsWithRep",
  category: "Probability",
  syntax: ["combinationsWithRep(n, k)"],
  description: "Compute the number of combinations of n items taken k at a time with replacements.",
  examples: ["combinationsWithRep(7, 5)"],
  seealso: ["combinations", "permutations", "factorial"]
}, tE = {
  name: "factorial",
  category: "Probability",
  syntax: ["n!", "factorial(n)"],
  description: "Compute the factorial of a value",
  examples: ["5!", "5 * 4 * 3 * 2 * 1", "3!"],
  seealso: ["combinations", "combinationsWithRep", "permutations", "gamma"]
}, nE = {
  name: "gamma",
  category: "Probability",
  syntax: ["gamma(n)"],
  description: "Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.",
  examples: ["gamma(4)", "3!", "gamma(1/2)", "sqrt(pi)"],
  seealso: ["factorial"]
}, aE = {
  name: "lgamma",
  category: "Probability",
  syntax: ["lgamma(n)"],
  description: "Logarithm of the gamma function for real, positive numbers and complex numbers, using Lanczos approximation for numbers and Stirling series for complex numbers.",
  examples: ["lgamma(4)", "lgamma(1/2)", "lgamma(i)", "lgamma(complex(1.1, 2))"],
  seealso: ["gamma"]
}, iE = {
  name: "kldivergence",
  category: "Probability",
  syntax: ["kldivergence(x, y)"],
  description: "Calculate the Kullback-Leibler (KL) divergence  between two distributions.",
  examples: ["kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])"],
  seealso: []
}, oE = {
  name: "multinomial",
  category: "Probability",
  syntax: ["multinomial(A)"],
  description: "Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai > 0.",
  examples: ["multinomial([1, 2, 1])"],
  seealso: ["combinations", "factorial"]
}, sE = {
  name: "permutations",
  category: "Probability",
  syntax: ["permutations(n)", "permutations(n, k)"],
  description: "Compute the number of permutations of n items taken k at a time",
  examples: ["permutations(5)", "permutations(5, 3)"],
  seealso: ["combinations", "combinationsWithRep", "factorial"]
}, uE = {
  name: "pickRandom",
  category: "Probability",
  syntax: ["pickRandom(array)", "pickRandom(array, number)", "pickRandom(array, weights)", "pickRandom(array, number, weights)", "pickRandom(array, weights, number)"],
  description: "Pick a random entry from a given array.",
  examples: ["pickRandom(0:10)", "pickRandom([1, 3, 1, 6])", "pickRandom([1, 3, 1, 6], 2)", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])", "pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)"],
  seealso: ["random", "randomInt"]
}, lE = {
  name: "random",
  category: "Probability",
  syntax: ["random()", "random(max)", "random(min, max)", "random(size)", "random(size, max)", "random(size, min, max)"],
  description: "Return a random number.",
  examples: ["random()", "random(10, 20)", "random([2, 3])"],
  seealso: ["pickRandom", "randomInt"]
}, cE = {
  name: "randomInt",
  category: "Probability",
  syntax: ["randomInt(max)", "randomInt(min, max)", "randomInt(size)", "randomInt(size, max)", "randomInt(size, min, max)"],
  description: "Return a random integer number",
  examples: ["randomInt(10, 20)", "randomInt([2, 3], 10)"],
  seealso: ["pickRandom", "random"]
}, fE = {
  name: "compare",
  category: "Relational",
  syntax: ["compare(x, y)"],
  description: "Compare two values. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
  examples: ["compare(2, 3)", "compare(3, 2)", "compare(2, 2)", "compare(5cm, 40mm)", "compare(2, [1, 2, 3])"],
  seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compareNatural", "compareText"]
}, mE = {
  name: "compareNatural",
  category: "Relational",
  syntax: ["compareNatural(x, y)"],
  description: "Compare two values of any type in a deterministic, natural way. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
  examples: ["compareNatural(2, 3)", "compareNatural(3, 2)", "compareNatural(2, 2)", "compareNatural(5cm, 40mm)", 'compareNatural("2", "10")', "compareNatural(2 + 3i, 2 + 4i)", "compareNatural([1, 2, 4], [1, 2, 3])", "compareNatural([1, 5], [1, 2, 3])", "compareNatural([1, 2], [1, 2])", "compareNatural({a: 2}, {a: 4})"],
  seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare", "compareText"]
}, vE = {
  name: "compareText",
  category: "Relational",
  syntax: ["compareText(x, y)"],
  description: "Compare two strings lexically. Comparison is case sensitive. Returns 1 when x > y, -1 when x < y, and 0 when x == y.",
  examples: ['compareText("B", "A")', 'compareText("A", "B")', 'compareText("A", "A")', 'compareText("2", "10")', 'compare("2", "10")', "compare(2, 10)", 'compareNatural("2", "10")', 'compareText("B", ["A", "B", "C"])'],
  seealso: ["compare", "compareNatural"]
}, pE = {
  name: "deepEqual",
  category: "Relational",
  syntax: ["deepEqual(x, y)"],
  description: "Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.",
  examples: ["deepEqual([1,3,4], [1,3,4])", "deepEqual([1,3,4], [1,3])"],
  seealso: ["equal", "unequal", "smaller", "larger", "smallerEq", "largerEq", "compare"]
}, dE = {
  name: "equal",
  category: "Relational",
  syntax: ["x == y", "equal(x, y)"],
  description: "Check equality of two values. Returns true if the values are equal, and false if not.",
  examples: ["2+2 == 3", "2+2 == 4", "a = 3.2", "b = 6-2.8", "a == b", "50cm == 0.5m"],
  seealso: ["unequal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual", "equalText"]
}, hE = {
  name: "equalText",
  category: "Relational",
  syntax: ["equalText(x, y)"],
  description: "Check equality of two strings. Comparison is case sensitive. Returns true if the values are equal, and false if not.",
  examples: ['equalText("Hello", "Hello")', 'equalText("a", "A")', 'equal("2e3", "2000")', 'equalText("2e3", "2000")', 'equalText("B", ["A", "B", "C"])'],
  seealso: ["compare", "compareNatural", "compareText", "equal"]
}, gE = {
  name: "larger",
  category: "Relational",
  syntax: ["x > y", "larger(x, y)"],
  description: "Check if value x is larger than y. Returns true if x is larger than y, and false if not.",
  examples: ["2 > 3", "5 > 2*2", "a = 3.3", "b = 6-2.8", "(a > b)", "(b < a)", "5 cm > 2 inch"],
  seealso: ["equal", "unequal", "smaller", "smallerEq", "largerEq", "compare"]
}, yE = {
  name: "largerEq",
  category: "Relational",
  syntax: ["x >= y", "largerEq(x, y)"],
  description: "Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.",
  examples: ["2 >= 1+1", "2 > 1+1", "a = 3.2", "b = 6-2.8", "(a >= b)"],
  seealso: ["equal", "unequal", "smallerEq", "smaller", "compare"]
}, bE = {
  name: "smaller",
  category: "Relational",
  syntax: ["x < y", "smaller(x, y)"],
  description: "Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.",
  examples: ["2 < 3", "5 < 2*2", "a = 3.3", "b = 6-2.8", "(a < b)", "5 cm < 2 inch"],
  seealso: ["equal", "unequal", "larger", "smallerEq", "largerEq", "compare"]
}, xE = {
  name: "smallerEq",
  category: "Relational",
  syntax: ["x <= y", "smallerEq(x, y)"],
  description: "Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.",
  examples: ["2 <= 1+1", "2 < 1+1", "a = 3.2", "b = 6-2.8", "(a <= b)"],
  seealso: ["equal", "unequal", "larger", "smaller", "largerEq", "compare"]
}, wE = {
  name: "unequal",
  category: "Relational",
  syntax: ["x != y", "unequal(x, y)"],
  description: "Check unequality of two values. Returns true if the values are unequal, and false if they are equal.",
  examples: ["2+2 != 3", "2+2 != 4", "a = 3.2", "b = 6-2.8", "a != b", "50cm != 0.5m", "5 cm != 2 inch"],
  seealso: ["equal", "smaller", "larger", "smallerEq", "largerEq", "compare", "deepEqual"]
}, DE = {
  name: "setCartesian",
  category: "Set",
  syntax: ["setCartesian(set1, set2)"],
  description: "Create the cartesian product of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays and the values will be sorted in ascending order before the operation.",
  examples: ["setCartesian([1, 2], [3, 4])"],
  seealso: ["setUnion", "setIntersect", "setDifference", "setPowerset"]
}, NE = {
  name: "setDifference",
  category: "Set",
  syntax: ["setDifference(set1, set2)"],
  description: "Create the difference of two (multi)sets: every element of set1, that is not the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setUnion", "setIntersect", "setSymDifference"]
}, AE = {
  name: "setDistinct",
  category: "Set",
  syntax: ["setDistinct(set)"],
  description: "Collect the distinct elements of a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",
  examples: ["setDistinct([1, 1, 1, 2, 2, 3])"],
  seealso: ["setMultiplicity"]
}, EE = {
  name: "setIntersect",
  category: "Set",
  syntax: ["setIntersect(set1, set2)"],
  description: "Create the intersection of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setIntersect([1, 2, 3, 4], [3, 4, 5, 6])", "setIntersect([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setUnion", "setDifference"]
}, SE = {
  name: "setIsSubset",
  category: "Set",
  syntax: ["setIsSubset(set1, set2)"],
  description: "Check whether a (multi)set is a subset of another (multi)set: every element of set1 is the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setIsSubset([1, 2], [3, 4, 5, 6])", "setIsSubset([3, 4], [3, 4, 5, 6])"],
  seealso: ["setUnion", "setIntersect", "setDifference"]
}, CE = {
  name: "setMultiplicity",
  category: "Set",
  syntax: ["setMultiplicity(element, set)"],
  description: "Count the multiplicity of an element in a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.",
  examples: ["setMultiplicity(1, [1, 2, 2, 4])", "setMultiplicity(2, [1, 2, 2, 4])"],
  seealso: ["setDistinct", "setSize"]
}, ME = {
  name: "setPowerset",
  category: "Set",
  syntax: ["setPowerset(set)"],
  description: "Create the powerset of a (multi)set: the powerset contains very possible subsets of a (multi)set. A multi-dimension array will be converted to a single-dimension array before the operation.",
  examples: ["setPowerset([1, 2, 3])"],
  seealso: ["setCartesian"]
}, _E = {
  name: "setSize",
  category: "Set",
  syntax: ["setSize(set)", "setSize(set, unique)"],
  description: 'Count the number of elements of a (multi)set. When the second parameter "unique" is true, count only the unique values. A multi-dimension array will be converted to a single-dimension array before the operation.',
  examples: ["setSize([1, 2, 2, 4])", "setSize([1, 2, 2, 4], true)"],
  seealso: ["setUnion", "setIntersect", "setDifference"]
}, FE = {
  name: "setSymDifference",
  category: "Set",
  syntax: ["setSymDifference(set1, set2)"],
  description: "Create the symmetric difference of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setSymDifference([1, 2, 3, 4], [3, 4, 5, 6])", "setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setUnion", "setIntersect", "setDifference"]
}, TE = {
  name: "setUnion",
  category: "Set",
  syntax: ["setUnion(set1, set2)"],
  description: "Create the union of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.",
  examples: ["setUnion([1, 2, 3, 4], [3, 4, 5, 6])", "setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]])"],
  seealso: ["setIntersect", "setDifference"]
}, BE = {
  name: "zpk2tf",
  category: "Signal",
  syntax: ["zpk2tf(z, p, k)"],
  description: "Compute the transfer function of a zero-pole-gain model.",
  examples: ["zpk2tf([1, 2], [-1, -2], 1)", "zpk2tf([1, 2], [-1, -2])", "zpk2tf([1 - 3i, 2 + 2i], [-1, -2])"],
  seealso: []
}, OE = {
  name: "freqz",
  category: "Signal",
  syntax: ["freqz(b, a)", "freqz(b, a, w)"],
  description: "Calculates the frequency response of a filter given its numerator and denominator coefficients.",
  examples: ["freqz([1, 2], [1, 2, 3])", "freqz([1, 2], [1, 2, 3], [0, 1])", "freqz([1, 2], [1, 2, 3], 512)"],
  seealso: []
}, $E = {
  name: "erf",
  category: "Special",
  syntax: ["erf(x)"],
  description: "Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x",
  examples: ["erf(0.2)", "erf(-0.5)", "erf(4)"],
  seealso: []
}, IE = {
  name: "zeta",
  category: "Special",
  syntax: ["zeta(s)"],
  description: "Compute the Riemann Zeta Function using an infinite series and Riemann's Functional Equation for the entire complex plane",
  examples: ["zeta(0.2)", "zeta(-0.5)", "zeta(4)"],
  seealso: []
}, qE = {
  name: "mad",
  category: "Statistics",
  syntax: ["mad(a, b, c, ...)", "mad(A)"],
  description: "Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.",
  examples: ["mad(10, 20, 30)", "mad([1, 2, 3])"],
  seealso: ["mean", "median", "std", "abs"]
}, RE = {
  name: "max",
  category: "Statistics",
  syntax: ["max(a, b, c, ...)", "max(A)", "max(A, dimension)"],
  description: "Compute the maximum value of a list of values.",
  examples: ["max(2, 3, 4, 1)", "max([2, 3, 4, 1])", "max([2, 5; 4, 3])", "max([2, 5; 4, 3], 1)", "max([2, 5; 4, 3], 2)", "max(2.7, 7.1, -4.5, 2.0, 4.1)", "min(2.7, 7.1, -4.5, 2.0, 4.1)"],
  seealso: ["mean", "median", "min", "prod", "std", "sum", "variance"]
}, zE = {
  name: "mean",
  category: "Statistics",
  syntax: ["mean(a, b, c, ...)", "mean(A)", "mean(A, dimension)"],
  description: "Compute the arithmetic mean of a list of values.",
  examples: ["mean(2, 3, 4, 1)", "mean([2, 3, 4, 1])", "mean([2, 5; 4, 3])", "mean([2, 5; 4, 3], 1)", "mean([2, 5; 4, 3], 2)", "mean([1.0, 2.7, 3.2, 4.0])"],
  seealso: ["max", "median", "min", "prod", "std", "sum", "variance"]
}, PE = {
  name: "median",
  category: "Statistics",
  syntax: ["median(a, b, c, ...)", "median(A)"],
  description: "Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.",
  examples: ["median(5, 2, 7)", "median([3, -1, 5, 7])"],
  seealso: ["max", "mean", "min", "prod", "std", "sum", "variance", "quantileSeq"]
}, UE = {
  name: "min",
  category: "Statistics",
  syntax: ["min(a, b, c, ...)", "min(A)", "min(A, dimension)"],
  description: "Compute the minimum value of a list of values.",
  examples: ["min(2, 3, 4, 1)", "min([2, 3, 4, 1])", "min([2, 5; 4, 3])", "min([2, 5; 4, 3], 1)", "min([2, 5; 4, 3], 2)", "min(2.7, 7.1, -4.5, 2.0, 4.1)", "max(2.7, 7.1, -4.5, 2.0, 4.1)"],
  seealso: ["max", "mean", "median", "prod", "std", "sum", "variance"]
}, LE = {
  name: "mode",
  category: "Statistics",
  syntax: ["mode(a, b, c, ...)", "mode(A)", "mode(A, a, b, B, c, ...)"],
  description: "Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.",
  examples: ["mode(2, 1, 4, 3, 1)", "mode([1, 2.7, 3.2, 4, 2.7])", "mode(1, 4, 6, 1, 6)"],
  seealso: ["max", "mean", "min", "median", "prod", "std", "sum", "variance"]
}, kE = {
  name: "prod",
  category: "Statistics",
  syntax: ["prod(a, b, c, ...)", "prod(A)"],
  description: "Compute the product of all values.",
  examples: ["prod(2, 3, 4)", "prod([2, 3, 4])", "prod([2, 5; 4, 3])"],
  seealso: ["max", "mean", "min", "median", "min", "std", "sum", "variance"]
}, HE = {
  name: "quantileSeq",
  category: "Statistics",
  syntax: ["quantileSeq(A, prob[, sorted])", "quantileSeq(A, [prob1, prob2, ...][, sorted])", "quantileSeq(A, N[, sorted])"],
  description: `Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probability are: Number, BigNumber. 

In case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.`,
  examples: ["quantileSeq([3, -1, 5, 7], 0.5)", "quantileSeq([3, -1, 5, 7], [1/3, 2/3])", "quantileSeq([3, -1, 5, 7], 2)", "quantileSeq([-1, 3, 5, 7], 0.5, true)"],
  seealso: ["mean", "median", "min", "max", "prod", "std", "sum", "variance"]
}, GE = {
  name: "std",
  category: "Statistics",
  syntax: ["std(a, b, c, ...)", "std(A)", "std(A, dimension)", "std(A, normalization)", "std(A, dimension, normalization)"],
  description: 'Compute the standard deviation of all values, defined as std(A) = sqrt(variance(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  examples: ["std(2, 4, 6)", "std([2, 4, 6, 8])", 'std([2, 4, 6, 8], "uncorrected")', 'std([2, 4, 6, 8], "biased")', "std([1, 2, 3; 4, 5, 6])"],
  seealso: ["max", "mean", "min", "median", "prod", "sum", "variance"]
}, ZE = {
  name: "cumsum",
  category: "Statistics",
  syntax: ["cumsum(a, b, c, ...)", "cumsum(A)"],
  description: "Compute the cumulative sum of all values.",
  examples: ["cumsum(2, 3, 4, 1)", "cumsum([2, 3, 4, 1])", "cumsum([1, 2; 3, 4])", "cumsum([1, 2; 3, 4], 1)", "cumsum([1, 2; 3, 4], 2)"],
  seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "variance"]
}, VE = {
  name: "sum",
  category: "Statistics",
  syntax: ["sum(a, b, c, ...)", "sum(A)", "sum(A, dimension)"],
  description: "Compute the sum of all values.",
  examples: ["sum(2, 3, 4, 1)", "sum([2, 3, 4, 1])", "sum([2, 5; 4, 3])"],
  seealso: ["max", "mean", "median", "min", "prod", "std", "sum", "variance"]
}, WE = {
  name: "variance",
  category: "Statistics",
  syntax: ["variance(a, b, c, ...)", "variance(A)", "variance(A, dimension)", "variance(A, normalization)", "variance(A, dimension, normalization)"],
  description: 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  examples: ["variance(2, 4, 6)", "variance([2, 4, 6, 8])", 'variance([2, 4, 6, 8], "uncorrected")', 'variance([2, 4, 6, 8], "biased")', "variance([1, 2, 3; 4, 5, 6])"],
  seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"]
}, YE = {
  name: "corr",
  category: "Statistics",
  syntax: ["corr(A,B)"],
  description: "Compute the correlation coefficient of a two list with values, For matrices, the matrix correlation coefficient is calculated.",
  examples: ["corr([2, 4, 6, 8],[1, 2, 3, 6])", "corr(matrix([[1, 2.2, 3, 4.8, 5], [1, 2, 3, 4, 5]]), matrix([[4, 5.3, 6.6, 7, 8], [1, 2, 3, 4, 5]]))"],
  seealso: ["max", "mean", "min", "median", "min", "prod", "std", "sum"]
}, XE = {
  name: "acos",
  category: "Trigonometry",
  syntax: ["acos(x)"],
  description: "Compute the inverse cosine of a value in radians.",
  examples: ["acos(0.5)", "acos(cos(2.3))"],
  seealso: ["cos", "atan", "asin"]
}, JE = {
  name: "acosh",
  category: "Trigonometry",
  syntax: ["acosh(x)"],
  description: "Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.",
  examples: ["acosh(1.5)"],
  seealso: ["cosh", "asinh", "atanh"]
}, QE = {
  name: "acot",
  category: "Trigonometry",
  syntax: ["acot(x)"],
  description: "Calculate the inverse cotangent of a value.",
  examples: ["acot(0.5)", "acot(cot(0.5))", "acot(2)"],
  seealso: ["cot", "atan"]
}, KE = {
  name: "acoth",
  category: "Trigonometry",
  syntax: ["acoth(x)"],
  description: "Calculate the inverse hyperbolic tangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.",
  examples: ["acoth(2)", "acoth(0.5)"],
  seealso: ["acsch", "asech"]
}, jE = {
  name: "acsc",
  category: "Trigonometry",
  syntax: ["acsc(x)"],
  description: "Calculate the inverse cotangent of a value.",
  examples: ["acsc(2)", "acsc(csc(0.5))", "acsc(0.5)"],
  seealso: ["csc", "asin", "asec"]
}, eS = {
  name: "acsch",
  category: "Trigonometry",
  syntax: ["acsch(x)"],
  description: "Calculate the inverse hyperbolic cosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.",
  examples: ["acsch(0.5)"],
  seealso: ["asech", "acoth"]
}, rS = {
  name: "asec",
  category: "Trigonometry",
  syntax: ["asec(x)"],
  description: "Calculate the inverse secant of a value.",
  examples: ["asec(0.5)", "asec(sec(0.5))", "asec(2)"],
  seealso: ["acos", "acot", "acsc"]
}, tS = {
  name: "asech",
  category: "Trigonometry",
  syntax: ["asech(x)"],
  description: "Calculate the inverse secant of a value.",
  examples: ["asech(0.5)"],
  seealso: ["acsch", "acoth"]
}, nS = {
  name: "asin",
  category: "Trigonometry",
  syntax: ["asin(x)"],
  description: "Compute the inverse sine of a value in radians.",
  examples: ["asin(0.5)", "asin(sin(0.5))"],
  seealso: ["sin", "acos", "atan"]
}, aS = {
  name: "asinh",
  category: "Trigonometry",
  syntax: ["asinh(x)"],
  description: "Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.",
  examples: ["asinh(0.5)"],
  seealso: ["acosh", "atanh"]
}, iS = {
  name: "atan",
  category: "Trigonometry",
  syntax: ["atan(x)"],
  description: "Compute the inverse tangent of a value in radians.",
  examples: ["atan(0.5)", "atan(tan(0.5))"],
  seealso: ["tan", "acos", "asin"]
}, oS = {
  name: "atan2",
  category: "Trigonometry",
  syntax: ["atan2(y, x)"],
  description: "Computes the principal value of the arc tangent of y/x in radians.",
  examples: ["atan2(2, 2) / pi", "angle = 60 deg in rad", "x = cos(angle)", "y = sin(angle)", "atan2(y, x)"],
  seealso: ["sin", "cos", "tan"]
}, sS = {
  name: "atanh",
  category: "Trigonometry",
  syntax: ["atanh(x)"],
  description: "Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.",
  examples: ["atanh(0.5)"],
  seealso: ["acosh", "asinh"]
}, uS = {
  name: "cos",
  category: "Trigonometry",
  syntax: ["cos(x)"],
  description: "Compute the cosine of x in radians.",
  examples: ["cos(2)", "cos(pi / 4) ^ 2", "cos(180 deg)", "cos(60 deg)", "sin(0.2)^2 + cos(0.2)^2"],
  seealso: ["acos", "sin", "tan"]
}, lS = {
  name: "cosh",
  category: "Trigonometry",
  syntax: ["cosh(x)"],
  description: "Compute the hyperbolic cosine of x in radians.",
  examples: ["cosh(0.5)"],
  seealso: ["sinh", "tanh", "coth"]
}, cS = {
  name: "cot",
  category: "Trigonometry",
  syntax: ["cot(x)"],
  description: "Compute the cotangent of x in radians. Defined as 1/tan(x)",
  examples: ["cot(2)", "1 / tan(2)"],
  seealso: ["sec", "csc", "tan"]
}, fS = {
  name: "coth",
  category: "Trigonometry",
  syntax: ["coth(x)"],
  description: "Compute the hyperbolic cotangent of x in radians.",
  examples: ["coth(2)", "1 / tanh(2)"],
  seealso: ["sech", "csch", "tanh"]
}, mS = {
  name: "csc",
  category: "Trigonometry",
  syntax: ["csc(x)"],
  description: "Compute the cosecant of x in radians. Defined as 1/sin(x)",
  examples: ["csc(2)", "1 / sin(2)"],
  seealso: ["sec", "cot", "sin"]
}, vS = {
  name: "csch",
  category: "Trigonometry",
  syntax: ["csch(x)"],
  description: "Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)",
  examples: ["csch(2)", "1 / sinh(2)"],
  seealso: ["sech", "coth", "sinh"]
}, pS = {
  name: "sec",
  category: "Trigonometry",
  syntax: ["sec(x)"],
  description: "Compute the secant of x in radians. Defined as 1/cos(x)",
  examples: ["sec(2)", "1 / cos(2)"],
  seealso: ["cot", "csc", "cos"]
}, dS = {
  name: "sech",
  category: "Trigonometry",
  syntax: ["sech(x)"],
  description: "Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)",
  examples: ["sech(2)", "1 / cosh(2)"],
  seealso: ["coth", "csch", "cosh"]
}, hS = {
  name: "sin",
  category: "Trigonometry",
  syntax: ["sin(x)"],
  description: "Compute the sine of x in radians.",
  examples: ["sin(2)", "sin(pi / 4) ^ 2", "sin(90 deg)", "sin(30 deg)", "sin(0.2)^2 + cos(0.2)^2"],
  seealso: ["asin", "cos", "tan"]
}, gS = {
  name: "sinh",
  category: "Trigonometry",
  syntax: ["sinh(x)"],
  description: "Compute the hyperbolic sine of x in radians.",
  examples: ["sinh(0.5)"],
  seealso: ["cosh", "tanh"]
}, yS = {
  name: "tan",
  category: "Trigonometry",
  syntax: ["tan(x)"],
  description: "Compute the tangent of x in radians.",
  examples: ["tan(0.5)", "sin(0.5) / cos(0.5)", "tan(pi / 4)", "tan(45 deg)"],
  seealso: ["atan", "sin", "cos"]
}, bS = {
  name: "tanh",
  category: "Trigonometry",
  syntax: ["tanh(x)"],
  description: "Compute the hyperbolic tangent of x in radians.",
  examples: ["tanh(0.5)", "sinh(0.5) / cosh(0.5)"],
  seealso: ["sinh", "cosh"]
}, xS = {
  name: "to",
  category: "Units",
  syntax: ["x to unit", "to(x, unit)"],
  description: "Change the unit of a value.",
  examples: ["5 inch to cm", "3.2kg to g", "16 bytes in bits"],
  seealso: []
}, wS = {
  name: "bin",
  category: "Utils",
  syntax: ["bin(value)"],
  description: "Format a number as binary",
  examples: ["bin(2)"],
  seealso: ["oct", "hex"]
}, DS = {
  name: "clone",
  category: "Utils",
  syntax: ["clone(x)"],
  description: "Clone a variable. Creates a copy of primitive variables, and a deep copy of matrices",
  examples: ["clone(3.5)", "clone(2 - 4i)", "clone(45 deg)", "clone([1, 2; 3, 4])", 'clone("hello world")'],
  seealso: []
}, NS = {
  name: "format",
  category: "Utils",
  syntax: ["format(value)", "format(value, precision)"],
  description: "Format a value of any type as string.",
  examples: ["format(2.3)", "format(3 - 4i)", "format([])", "format(pi, 3)"],
  seealso: ["print"]
}, AS = {
  name: "hasNumericValue",
  category: "Utils",
  syntax: ["hasNumericValue(x)"],
  description: "Test whether a value is an numeric value. In case of a string, true is returned if the string contains a numeric value.",
  examples: ["hasNumericValue(2)", 'hasNumericValue("2")', 'isNumeric("2")', "hasNumericValue(0)", "hasNumericValue(bignumber(500))", "hasNumericValue(fraction(0.125))", "hasNumericValue(2 + 3i)", 'hasNumericValue([2.3, "foo", false])'],
  seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "isNumeric"]
}, ES = {
  name: "hex",
  category: "Utils",
  syntax: ["hex(value)"],
  description: "Format a number as hexadecimal",
  examples: ["hex(240)"],
  seealso: ["bin", "oct"]
}, SS = {
  name: "isInteger",
  category: "Utils",
  syntax: ["isInteger(x)"],
  description: "Test whether a value is an integer number.",
  examples: ["isInteger(2)", "isInteger(3.5)", "isInteger([3, 0.5, -2])"],
  seealso: ["isNegative", "isNumeric", "isPositive", "isZero"]
}, CS = {
  name: "isNaN",
  category: "Utils",
  syntax: ["isNaN(x)"],
  description: "Test whether a value is NaN (not a number)",
  examples: ["isNaN(2)", "isNaN(0 / 0)", "isNaN(NaN)", "isNaN(Infinity)"],
  seealso: ["isNegative", "isNumeric", "isPositive", "isZero"]
}, MS = {
  name: "isNegative",
  category: "Utils",
  syntax: ["isNegative(x)"],
  description: "Test whether a value is negative: smaller than zero.",
  examples: ["isNegative(2)", "isNegative(0)", "isNegative(-4)", "isNegative([3, 0.5, -2])"],
  seealso: ["isInteger", "isNumeric", "isPositive", "isZero"]
}, _S = {
  name: "isNumeric",
  category: "Utils",
  syntax: ["isNumeric(x)"],
  description: "Test whether a value is a numeric value. Returns true when the input is a number, BigNumber, Fraction, or boolean.",
  examples: ["isNumeric(2)", 'isNumeric("2")', 'hasNumericValue("2")', "isNumeric(0)", "isNumeric(bignumber(500))", "isNumeric(fraction(0.125))", "isNumeric(2 + 3i)", 'isNumeric([2.3, "foo", false])'],
  seealso: ["isInteger", "isZero", "isNegative", "isPositive", "isNaN", "hasNumericValue"]
}, FS = {
  name: "isPositive",
  category: "Utils",
  syntax: ["isPositive(x)"],
  description: "Test whether a value is positive: larger than zero.",
  examples: ["isPositive(2)", "isPositive(0)", "isPositive(-4)", "isPositive([3, 0.5, -2])"],
  seealso: ["isInteger", "isNumeric", "isNegative", "isZero"]
}, TS = {
  name: "isPrime",
  category: "Utils",
  syntax: ["isPrime(x)"],
  description: "Test whether a value is prime: has no divisors other than itself and one.",
  examples: ["isPrime(3)", "isPrime(-2)", "isPrime([2, 17, 100])"],
  seealso: ["isInteger", "isNumeric", "isNegative", "isZero"]
}, BS = {
  name: "isZero",
  category: "Utils",
  syntax: ["isZero(x)"],
  description: "Test whether a value is zero.",
  examples: ["isZero(2)", "isZero(0)", "isZero(-4)", "isZero([3, 0, -2, 0])"],
  seealso: ["isInteger", "isNumeric", "isNegative", "isPositive"]
}, OS = {
  name: "numeric",
  category: "Utils",
  syntax: ["numeric(x)"],
  description: "Convert a numeric input to a specific numeric type: number, BigNumber, bigint, or Fraction.",
  examples: ['numeric("4")', 'numeric("4", "number")', 'numeric("4", "bigint")', 'numeric("4", "BigNumber")', 'numeric("4", "Fraction")', 'numeric(4, "Fraction")', 'numeric(fraction(2, 5), "number")'],
  seealso: ["number", "bigint", "fraction", "bignumber", "string", "format"]
}, $S = {
  name: "oct",
  category: "Utils",
  syntax: ["oct(value)"],
  description: "Format a number as octal",
  examples: ["oct(56)"],
  seealso: ["bin", "hex"]
}, IS = {
  name: "print",
  category: "Utils",
  syntax: ["print(template, values)", "print(template, values, precision)"],
  description: "Interpolate values into a string template.",
  examples: ['print("Lucy is $age years old", {age: 5})', 'print("The value of pi is $pi", {pi: pi}, 3)', 'print("Hello, $user.name!", {user: {name: "John"}})', 'print("Values: $1, $2, $3", [6, 9, 4])'],
  seealso: ["format"]
}, qS = {
  name: "typeOf",
  category: "Utils",
  syntax: ["typeOf(x)"],
  description: "Get the type of a variable.",
  examples: ["typeOf(3.5)", "typeOf(2 - 4i)", "typeOf(45 deg)", 'typeOf("hello world")'],
  seealso: ["getMatrixDataType"]
}, RS = {
  name: "solveODE",
  category: "Numeric",
  syntax: ["solveODE(func, tspan, y0)", "solveODE(func, tspan, y0, options)"],
  description: "Numerical Integration of Ordinary Differential Equations.",
  examples: ["f(t,y) = y", "tspan = [0, 4]", "solveODE(f, tspan, 1)", "solveODE(f, tspan, [1, 2])", 'solveODE(f, tspan, 1, { method:"RK23", maxStep:0.1 })'],
  seealso: ["derivative", "simplifyCore"]
}, zS = {
  // construction functions
  bignumber: C2,
  bigint: M2,
  boolean: _2,
  complex: F2,
  createUnit: T2,
  fraction: B2,
  index: O2,
  matrix: $2,
  number: I2,
  sparse: q2,
  splitUnit: R2,
  string: z2,
  unit: P2,
  // constants
  e: el,
  E: el,
  false: m2,
  i: v2,
  Infinity: p2,
  LN2: h2,
  LN10: d2,
  LOG2E: y2,
  LOG10E: g2,
  NaN: b2,
  null: x2,
  pi: rl,
  PI: rl,
  phi: w2,
  SQRT1_2: D2,
  SQRT2: N2,
  tau: A2,
  true: E2,
  version: S2,
  // physical constants
  // TODO: more detailed docs for physical constants
  speedOfLight: {
    description: "Speed of light in vacuum",
    examples: ["speedOfLight"]
  },
  gravitationConstant: {
    description: "Newtonian constant of gravitation",
    examples: ["gravitationConstant"]
  },
  planckConstant: {
    description: "Planck constant",
    examples: ["planckConstant"]
  },
  reducedPlanckConstant: {
    description: "Reduced Planck constant",
    examples: ["reducedPlanckConstant"]
  },
  magneticConstant: {
    description: "Magnetic constant (vacuum permeability)",
    examples: ["magneticConstant"]
  },
  electricConstant: {
    description: "Electric constant (vacuum permeability)",
    examples: ["electricConstant"]
  },
  vacuumImpedance: {
    description: "Characteristic impedance of vacuum",
    examples: ["vacuumImpedance"]
  },
  coulomb: {
    description: "Coulomb's constant",
    examples: ["coulomb"]
  },
  elementaryCharge: {
    description: "Elementary charge",
    examples: ["elementaryCharge"]
  },
  bohrMagneton: {
    description: "Bohr magneton",
    examples: ["bohrMagneton"]
  },
  conductanceQuantum: {
    description: "Conductance quantum",
    examples: ["conductanceQuantum"]
  },
  inverseConductanceQuantum: {
    description: "Inverse conductance quantum",
    examples: ["inverseConductanceQuantum"]
  },
  // josephson: {description: 'Josephson constant', examples: ['josephson']},
  magneticFluxQuantum: {
    description: "Magnetic flux quantum",
    examples: ["magneticFluxQuantum"]
  },
  nuclearMagneton: {
    description: "Nuclear magneton",
    examples: ["nuclearMagneton"]
  },
  klitzing: {
    description: "Von Klitzing constant",
    examples: ["klitzing"]
  },
  bohrRadius: {
    description: "Bohr radius",
    examples: ["bohrRadius"]
  },
  classicalElectronRadius: {
    description: "Classical electron radius",
    examples: ["classicalElectronRadius"]
  },
  electronMass: {
    description: "Electron mass",
    examples: ["electronMass"]
  },
  fermiCoupling: {
    description: "Fermi coupling constant",
    examples: ["fermiCoupling"]
  },
  fineStructure: {
    description: "Fine-structure constant",
    examples: ["fineStructure"]
  },
  hartreeEnergy: {
    description: "Hartree energy",
    examples: ["hartreeEnergy"]
  },
  protonMass: {
    description: "Proton mass",
    examples: ["protonMass"]
  },
  deuteronMass: {
    description: "Deuteron Mass",
    examples: ["deuteronMass"]
  },
  neutronMass: {
    description: "Neutron mass",
    examples: ["neutronMass"]
  },
  quantumOfCirculation: {
    description: "Quantum of circulation",
    examples: ["quantumOfCirculation"]
  },
  rydberg: {
    description: "Rydberg constant",
    examples: ["rydberg"]
  },
  thomsonCrossSection: {
    description: "Thomson cross section",
    examples: ["thomsonCrossSection"]
  },
  weakMixingAngle: {
    description: "Weak mixing angle",
    examples: ["weakMixingAngle"]
  },
  efimovFactor: {
    description: "Efimov factor",
    examples: ["efimovFactor"]
  },
  atomicMass: {
    description: "Atomic mass constant",
    examples: ["atomicMass"]
  },
  avogadro: {
    description: "Avogadro's number",
    examples: ["avogadro"]
  },
  boltzmann: {
    description: "Boltzmann constant",
    examples: ["boltzmann"]
  },
  faraday: {
    description: "Faraday constant",
    examples: ["faraday"]
  },
  firstRadiation: {
    description: "First radiation constant",
    examples: ["firstRadiation"]
  },
  loschmidt: {
    description: "Loschmidt constant at T=273.15 K and p=101.325 kPa",
    examples: ["loschmidt"]
  },
  gasConstant: {
    description: "Gas constant",
    examples: ["gasConstant"]
  },
  molarPlanckConstant: {
    description: "Molar Planck constant",
    examples: ["molarPlanckConstant"]
  },
  molarVolume: {
    description: "Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa",
    examples: ["molarVolume"]
  },
  sackurTetrode: {
    description: "Sackur-Tetrode constant at T=1 K and p=101.325 kPa",
    examples: ["sackurTetrode"]
  },
  secondRadiation: {
    description: "Second radiation constant",
    examples: ["secondRadiation"]
  },
  stefanBoltzmann: {
    description: "Stefan-Boltzmann constant",
    examples: ["stefanBoltzmann"]
  },
  wienDisplacement: {
    description: "Wien displacement law constant",
    examples: ["wienDisplacement"]
  },
  // spectralRadiance: {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']},
  molarMass: {
    description: "Molar mass constant",
    examples: ["molarMass"]
  },
  molarMassC12: {
    description: "Molar mass constant of carbon-12",
    examples: ["molarMassC12"]
  },
  gravity: {
    description: "Standard acceleration of gravity (standard acceleration of free-fall on Earth)",
    examples: ["gravity"]
  },
  planckLength: {
    description: "Planck length",
    examples: ["planckLength"]
  },
  planckMass: {
    description: "Planck mass",
    examples: ["planckMass"]
  },
  planckTime: {
    description: "Planck time",
    examples: ["planckTime"]
  },
  planckCharge: {
    description: "Planck charge",
    examples: ["planckCharge"]
  },
  planckTemperature: {
    description: "Planck temperature",
    examples: ["planckTemperature"]
  },
  // functions - algebra
  derivative: H2,
  lsolve: Z2,
  lsolveAll: V2,
  lup: W2,
  lusolve: Y2,
  leafCount: G2,
  polynomialRoot: X2,
  resolve: K2,
  simplify: j2,
  simplifyConstant: eN,
  simplifyCore: rN,
  symbolicEqual: nN,
  rationalize: Q2,
  slu: tN,
  usolve: aN,
  usolveAll: iN,
  qr: J2,
  // functions - arithmetic
  abs: oN,
  add: sN,
  cbrt: uN,
  ceil: lN,
  cube: cN,
  divide: fN,
  dotDivide: mN,
  dotMultiply: vN,
  dotPow: pN,
  exp: dN,
  expm: hN,
  expm1: gN,
  fix: yN,
  floor: bN,
  gcd: xN,
  hypot: wN,
  lcm: NN,
  log: AN,
  log2: CN,
  log1p: SN,
  log10: EN,
  mod: MN,
  multiply: _N,
  norm: FN,
  nthRoot: TN,
  nthRoots: BN,
  pow: ON,
  round: $N,
  sign: IN,
  sqrt: qN,
  sqrtm: RN,
  square: LN,
  subtract: kN,
  unaryMinus: HN,
  unaryPlus: GN,
  xgcd: ZN,
  invmod: DN,
  // functions - bitwise
  bitAnd: VN,
  bitNot: WN,
  bitOr: YN,
  bitXor: XN,
  leftShift: JN,
  rightArithShift: QN,
  rightLogShift: KN,
  // functions - combinatorics
  bellNumbers: jN,
  catalan: eA,
  composition: rA,
  stirlingS2: tA,
  // functions - core
  config: U2,
  import: L2,
  typed: k2,
  // functions - complex
  arg: nA,
  conj: aA,
  re: oA,
  im: iA,
  // functions - expression
  evaluate: sA,
  help: uA,
  // functions - geometry
  distance: lA,
  intersect: cA,
  // functions - logical
  and: fA,
  not: mA,
  or: vA,
  xor: pA,
  // functions - matrix
  concat: hA,
  count: gA,
  cross: yA,
  column: dA,
  ctranspose: bA,
  det: xA,
  diag: wA,
  diff: DA,
  dot: NA,
  getMatrixDataType: MA,
  identity: _A,
  filter: EA,
  flatten: SA,
  forEach: CA,
  inv: FA,
  pinv: TA,
  eigs: AA,
  kron: BA,
  matrixFromFunction: IA,
  matrixFromRows: qA,
  matrixFromColumns: $A,
  map: OA,
  ones: RA,
  partitionSelect: zA,
  range: PA,
  resize: LA,
  reshape: UA,
  rotate: kA,
  rotationMatrix: HA,
  row: GA,
  size: ZA,
  sort: VA,
  squeeze: WA,
  subset: YA,
  trace: XA,
  transpose: JA,
  zeros: QA,
  fft: KA,
  ifft: jA,
  sylvester: zN,
  schur: PN,
  lyap: UN,
  // functions - numeric
  solveODE: RS,
  // functions - probability
  combinations: eE,
  combinationsWithRep: rE,
  // distribution: distributionDocs,
  factorial: tE,
  gamma: nE,
  kldivergence: iE,
  lgamma: aE,
  multinomial: oE,
  permutations: sE,
  pickRandom: uE,
  random: lE,
  randomInt: cE,
  // functions - relational
  compare: fE,
  compareNatural: mE,
  compareText: vE,
  deepEqual: pE,
  equal: dE,
  equalText: hE,
  larger: gE,
  largerEq: yE,
  smaller: bE,
  smallerEq: xE,
  unequal: wE,
  // functions - set
  setCartesian: DE,
  setDifference: NE,
  setDistinct: AE,
  setIntersect: EE,
  setIsSubset: SE,
  setMultiplicity: CE,
  setPowerset: ME,
  setSize: _E,
  setSymDifference: FE,
  setUnion: TE,
  // functions - signal
  zpk2tf: BE,
  freqz: OE,
  // functions - special
  erf: $E,
  zeta: IE,
  // functions - statistics
  cumsum: ZE,
  mad: qE,
  max: RE,
  mean: zE,
  median: PE,
  min: UE,
  mode: LE,
  prod: kE,
  quantileSeq: HE,
  std: GE,
  sum: VE,
  variance: WE,
  corr: YE,
  // functions - trigonometry
  acos: XE,
  acosh: JE,
  acot: QE,
  acoth: KE,
  acsc: jE,
  acsch: eS,
  asec: rS,
  asech: tS,
  asin: nS,
  asinh: aS,
  atan: iS,
  atanh: sS,
  atan2: oS,
  cos: uS,
  cosh: lS,
  cot: cS,
  coth: fS,
  csc: mS,
  csch: vS,
  sec: pS,
  sech: dS,
  sin: hS,
  sinh: gS,
  tan: yS,
  tanh: bS,
  // functions - units
  to: xS,
  // functions - utils
  clone: DS,
  format: NS,
  bin: wS,
  oct: $S,
  hex: ES,
  isNaN: CS,
  isInteger: SS,
  isNegative: MS,
  isNumeric: _S,
  hasNumericValue: AS,
  isPositive: FS,
  isPrime: TS,
  isZero: BS,
  print: IS,
  typeOf: qS,
  numeric: OS
}, tl = "help", PS = ["typed", "mathWithTransform", "Help"], US = /* @__PURE__ */ q(tl, PS, (e) => {
  var {
    typed: r,
    mathWithTransform: t,
    Help: n
  } = e;
  return r(tl, {
    any: function(i) {
      var o, c = i;
      if (typeof i != "string") {
        for (o in t)
          if (De(t, o) && i === t[o]) {
            c = o;
            break;
          }
      }
      var l = hr(zS, c);
      if (!l) {
        var s = typeof c == "function" ? c.name : c;
        throw new Error('No documentation found on "' + s + '"');
      }
      return new n(l);
    }
  });
}), nl = "chain", LS = ["typed", "Chain"], kS = /* @__PURE__ */ q(nl, LS, (e) => {
  var {
    typed: r,
    Chain: t
  } = e;
  return r(nl, {
    "": function() {
      return new t();
    },
    any: function(a) {
      return new t(a);
    }
  });
}), al = "det", HS = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"], GS = /* @__PURE__ */ q(al, HS, (e) => {
  var {
    typed: r,
    matrix: t,
    subtractScalar: n,
    multiply: a,
    divideScalar: i,
    isZero: o,
    unaryMinus: c
  } = e;
  return r(al, {
    any: function(u) {
      return Me(u);
    },
    "Array | Matrix": function(u) {
      var f;
      switch (Ce(u) ? f = u.size() : Array.isArray(u) ? (u = t(u), f = u.size()) : f = [], f.length) {
        case 0:
          return Me(u);
        case 1:
          if (f[0] === 1)
            return Me(u.valueOf()[0]);
          if (f[0] === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Pe(f) + ")");
        case 2: {
          var m = f[0], v = f[1];
          if (m === v)
            return l(u.clone().valueOf(), m);
          if (v === 0)
            return 1;
          throw new RangeError("Matrix must be square (size: " + Pe(f) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Pe(f) + ")");
      }
    }
  });
  function l(s, u, f) {
    if (u === 1)
      return Me(s[0][0]);
    if (u === 2)
      return n(a(s[0][0], s[1][1]), a(s[1][0], s[0][1]));
    for (var m = !1, v = new Array(u).fill(0).map((A, E) => E), p = 0; p < u; p++) {
      var d = v[p];
      if (o(s[d][p])) {
        var b = void 0;
        for (b = p + 1; b < u; b++)
          if (!o(s[v[b]][p])) {
            d = v[b], v[b] = v[p], v[p] = d, m = !m;
            break;
          }
        if (b === u) return s[d][p];
      }
      for (var x = s[d][p], D = p === 0 ? 1 : s[v[p - 1]][p - 1], h = p + 1; h < u; h++)
        for (var w = v[h], y = p + 1; y < u; y++)
          s[w][y] = i(n(a(s[w][y], x), a(s[w][p], s[d][y])), D);
    }
    var g = s[v[u - 1]][u - 1];
    return m ? c(g) : g;
  }
}), il = "inv", ZS = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"], VS = /* @__PURE__ */ q(il, ZS, (e) => {
  var {
    typed: r,
    matrix: t,
    divideScalar: n,
    addScalar: a,
    multiply: i,
    unaryMinus: o,
    det: c,
    identity: l,
    abs: s
  } = e;
  return r(il, {
    "Array | Matrix": function(m) {
      var v = Ce(m) ? m.size() : Te(m);
      switch (v.length) {
        case 1:
          if (v[0] === 1)
            return Ce(m) ? t([n(1, m.valueOf()[0])]) : [n(1, m[0])];
          throw new RangeError("Matrix must be square (size: " + Pe(v) + ")");
        case 2: {
          var p = v[0], d = v[1];
          if (p === d)
            return Ce(m) ? t(u(m.valueOf(), p, d), m.storage()) : u(m, p, d);
          throw new RangeError("Matrix must be square (size: " + Pe(v) + ")");
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Pe(v) + ")");
      }
    },
    any: function(m) {
      return n(1, m);
    }
  });
  function u(f, m, v) {
    var p, d, b, x, D;
    if (m === 1) {
      if (x = f[0][0], x === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[n(1, x)]];
    } else if (m === 2) {
      var h = c(f);
      if (h === 0)
        throw Error("Cannot calculate inverse, determinant is zero");
      return [[n(f[1][1], h), n(o(f[0][1]), h)], [n(o(f[1][0]), h), n(f[0][0], h)]];
    } else {
      var w = f.concat();
      for (p = 0; p < m; p++)
        w[p] = w[p].concat();
      for (var y = l(m).valueOf(), g = 0; g < v; g++) {
        var A = s(w[g][g]), E = g;
        for (p = g + 1; p < m; )
          s(w[p][g]) > A && (A = s(w[p][g]), E = p), p++;
        if (A === 0)
          throw Error("Cannot calculate inverse, determinant is zero");
        p = E, p !== g && (D = w[g], w[g] = w[p], w[p] = D, D = y[g], y[g] = y[p], y[p] = D);
        var N = w[g], S = y[g];
        for (p = 0; p < m; p++) {
          var C = w[p], T = y[p];
          if (p !== g) {
            if (C[g] !== 0) {
              for (b = n(o(C[g]), N[g]), d = g; d < v; d++)
                C[d] = a(C[d], i(b, N[d]));
              for (d = 0; d < v; d++)
                T[d] = a(T[d], i(b, S[d]));
            }
          } else {
            for (b = N[g], d = g; d < v; d++)
              C[d] = n(C[d], b);
            for (d = 0; d < v; d++)
              T[d] = n(T[d], b);
          }
        }
      }
      return y;
    }
  }
}), ol = "pinv", WS = ["typed", "matrix", "inv", "deepEqual", "equal", "dotDivide", "dot", "ctranspose", "divideScalar", "multiply", "add", "Complex"], YS = /* @__PURE__ */ q(ol, WS, (e) => {
  var {
    typed: r,
    matrix: t,
    inv: n,
    deepEqual: a,
    equal: i,
    dotDivide: o,
    dot: c,
    ctranspose: l,
    divideScalar: s,
    multiply: u,
    add: f,
    Complex: m
  } = e;
  return r(ol, {
    "Array | Matrix": function(h) {
      var w = Ce(h) ? h.size() : Te(h);
      switch (w.length) {
        case 1:
          return x(h) ? l(h) : w[0] === 1 ? n(h) : o(l(h), c(h, h));
        case 2: {
          if (x(h)) return l(h);
          var y = w[0], g = w[1];
          if (y === g)
            try {
              return n(h);
            } catch (A) {
              if (!(A instanceof Error && A.message.match(/Cannot calculate inverse, determinant is zero/))) throw A;
            }
          return Ce(h) ? t(v(h.valueOf(), y, g), h.storage()) : v(h, y, g);
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + Pe(w) + ")");
      }
    },
    any: function(h) {
      return i(h, 0) ? Me(h) : s(1, h);
    }
  });
  function v(D, h, w) {
    var {
      C: y,
      F: g
    } = d(D, h, w), A = u(n(u(l(y), y)), l(y)), E = u(l(g), n(u(g, l(g))));
    return u(E, A);
  }
  function p(D, h, w) {
    for (var y = Me(D), g = 0, A = 0; A < h; A++) {
      if (w <= g)
        return y;
      for (var E = A; b(y[E][g]); )
        if (E++, h === E && (E = A, g++, w === g))
          return y;
      [y[E], y[A]] = [y[A], y[E]];
      for (var N = y[A][g], S = 0; S < w; S++)
        y[A][S] = o(y[A][S], N);
      for (var C = 0; C < h; C++)
        if (C !== A) {
          N = y[C][g];
          for (var T = 0; T < w; T++)
            y[C][T] = f(y[C][T], u(-1, u(N, y[A][T])));
        }
      g++;
    }
    return y;
  }
  function d(D, h, w) {
    var y = p(D, h, w), g = D.map((E, N) => E.filter((S, C) => C < h && !b(c(y[C], y[C])))), A = y.filter((E, N) => !b(c(y[N], y[N])));
    return {
      C: g,
      F: A
    };
  }
  function b(D) {
    return i(f(D, m(1, 1)), f(0, m(1, 1)));
  }
  function x(D) {
    return a(f(D, m(1, 1)), f(u(D, 0), m(1, 1)));
  }
});
function XS(e) {
  var {
    addScalar: r,
    subtract: t,
    flatten: n,
    multiply: a,
    multiplyScalar: i,
    divideScalar: o,
    sqrt: c,
    abs: l,
    bignumber: s,
    diag: u,
    size: f,
    reshape: m,
    inv: v,
    qr: p,
    usolve: d,
    usolveAll: b,
    equal: x,
    complex: D,
    larger: h,
    smaller: w,
    matrixFromColumns: y,
    dot: g
  } = e;
  function A(Z, z, J, le) {
    var K = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, re = E(Z, z, J, le, K);
    N(Z, z, J, le, K, re);
    var {
      values: ie,
      C: j
    } = S(Z, z, J, le, K);
    if (K) {
      var te = C(Z, z, j, re, ie, J, le);
      return {
        values: ie,
        eigenvectors: te
      };
    }
    return {
      values: ie
    };
  }
  function E(Z, z, J, le, K) {
    var re = le === "BigNumber", ie = le === "Complex", j = re ? s(0) : 0, te = re ? s(1) : ie ? D(1) : 1, oe = re ? s(1) : 1, me = re ? s(10) : 2, be = i(me, me), we;
    K && (we = Array(z).fill(te));
    for (var P = !1; !P; ) {
      P = !0;
      for (var H = 0; H < z; H++) {
        for (var ee = j, k = j, V = 0; V < z; V++)
          H !== V && (ee = r(ee, l(Z[V][H])), k = r(k, l(Z[H][V])));
        if (!x(ee, 0) && !x(k, 0)) {
          for (var X = oe, fe = ee, ce = o(k, me), R = i(k, me); w(fe, ce); )
            fe = i(fe, be), X = i(X, me);
          for (; h(fe, R); )
            fe = o(fe, be), X = o(X, me);
          var U = w(o(r(fe, k), X), i(r(ee, k), 0.95));
          if (U) {
            P = !1;
            for (var Y = o(1, X), ne = 0; ne < z; ne++)
              H !== ne && (Z[H][ne] = i(Z[H][ne], Y), Z[ne][H] = i(Z[ne][H], X));
            K && (we[H] = i(we[H], Y));
          }
        }
      }
    }
    return K ? u(we) : null;
  }
  function N(Z, z, J, le, K, re) {
    var ie = le === "BigNumber", j = le === "Complex", te = ie ? s(0) : j ? D(0) : 0;
    ie && (J = s(J));
    for (var oe = 0; oe < z - 2; oe++) {
      for (var me = 0, be = te, we = oe + 1; we < z; we++) {
        var P = Z[we][oe];
        w(l(be), l(P)) && (be = P, me = we);
      }
      if (!w(l(be), J)) {
        if (me !== oe + 1) {
          var H = Z[me];
          Z[me] = Z[oe + 1], Z[oe + 1] = H;
          for (var ee = 0; ee < z; ee++) {
            var k = Z[ee][me];
            Z[ee][me] = Z[ee][oe + 1], Z[ee][oe + 1] = k;
          }
          if (K) {
            var V = re[me];
            re[me] = re[oe + 1], re[oe + 1] = V;
          }
        }
        for (var X = oe + 2; X < z; X++) {
          var fe = o(Z[X][oe], be);
          if (fe !== 0) {
            for (var ce = 0; ce < z; ce++)
              Z[X][ce] = t(Z[X][ce], i(fe, Z[oe + 1][ce]));
            for (var R = 0; R < z; R++)
              Z[R][oe + 1] = r(Z[R][oe + 1], i(fe, Z[R][X]));
            if (K)
              for (var U = 0; U < z; U++)
                re[X][U] = t(re[X][U], i(fe, re[oe + 1][U]));
          }
        }
      }
    }
    return re;
  }
  function S(Z, z, J, le, K) {
    var re = le === "BigNumber", ie = le === "Complex", j = re ? s(1) : ie ? D(1) : 1;
    re && (J = s(J));
    for (var te = Me(Z), oe = [], me = z, be = [], we = K ? u(Array(z).fill(j)) : void 0, P = K ? u(Array(me).fill(j)) : void 0, H = 0; H <= 100; ) {
      H += 1;
      for (var ee = te[me - 1][me - 1], k = 0; k < me; k++)
        te[k][k] = t(te[k][k], ee);
      var {
        Q: V,
        R: X
      } = p(te);
      te = a(X, V);
      for (var fe = 0; fe < me; fe++)
        te[fe][fe] = r(te[fe][fe], ee);
      if (K && (P = a(P, V)), me === 1 || w(l(te[me - 1][me - 2]), J)) {
        H = 0, oe.push(te[me - 1][me - 1]), K && (be.unshift([[1]]), I(P, z), we = a(we, P), me > 1 && (P = u(Array(me - 1).fill(j)))), me -= 1, te.pop();
        for (var ce = 0; ce < me; ce++)
          te[ce].pop();
      } else if (me === 2 || w(l(te[me - 2][me - 3]), J)) {
        H = 0;
        var R = T(te[me - 2][me - 2], te[me - 2][me - 1], te[me - 1][me - 2], te[me - 1][me - 1]);
        oe.push(...R), K && (be.unshift(O(te[me - 2][me - 2], te[me - 2][me - 1], te[me - 1][me - 2], te[me - 1][me - 1], R[0], R[1], J, le)), I(P, z), we = a(we, P), me > 2 && (P = u(Array(me - 2).fill(j)))), me -= 2, te.pop(), te.pop();
        for (var U = 0; U < me; U++)
          te[U].pop(), te[U].pop();
      }
      if (me === 0)
        break;
    }
    if (oe.sort((se, ue) => +t(l(se), l(ue))), H > 100) {
      var Y = Error("The eigenvalues failed to converge. Only found these eigenvalues: " + oe.join(", "));
      throw Y.values = oe, Y.vectors = [], Y;
    }
    var ne = K ? a(we, $(be, z)) : void 0;
    return {
      values: oe,
      C: ne
    };
  }
  function C(Z, z, J, le, K, re, ie) {
    var j = v(J), te = a(j, Z, J), oe = ie === "BigNumber", me = ie === "Complex", be = oe ? s(0) : me ? D(0) : 0, we = oe ? s(1) : me ? D(1) : 1, P = [], H = [];
    for (var ee of K) {
      var k = F(P, ee, x);
      k === -1 ? (P.push(ee), H.push(1)) : H[k] += 1;
    }
    for (var V = [], X = P.length, fe = Array(z).fill(be), ce = u(Array(z).fill(we)), R = function() {
      var ne = P[U], se = t(te, a(ne, ce)), ue = b(se, fe);
      for (ue.shift(); ue.length < H[U]; ) {
        var he = _(se, z, ue, re, ie);
        if (he === null)
          break;
        ue.push(he);
      }
      var de = a(v(le), J);
      ue = ue.map((xe) => a(de, xe)), V.push(...ue.map((xe) => ({
        value: ne,
        vector: n(xe)
      })));
    }, U = 0; U < X; U++)
      R();
    return V;
  }
  function T(Z, z, J, le) {
    var K = r(Z, le), re = t(i(Z, le), i(z, J)), ie = i(K, 0.5), j = i(c(t(i(K, K), i(4, re))), 0.5);
    return [r(ie, j), t(ie, j)];
  }
  function O(Z, z, J, le, K, re, ie, j) {
    var te = j === "BigNumber", oe = j === "Complex", me = te ? s(0) : oe ? D(0) : 0, be = te ? s(1) : oe ? D(1) : 1;
    if (w(l(J), ie))
      return [[be, me], [me, be]];
    if (h(l(t(K, re)), ie))
      return [[t(K, le), t(re, le)], [J, J]];
    var we = t(Z, K), P = t(le, K);
    return w(l(z), ie) && w(l(P), ie) ? [[we, be], [J, me]] : [[z, me], [P, be]];
  }
  function I(Z, z) {
    for (var J = 0; J < Z.length; J++)
      Z[J].push(...Array(z - Z[J].length).fill(0));
    for (var le = Z.length; le < z; le++)
      Z.push(Array(z).fill(0)), Z[le][le] = 1;
    return Z;
  }
  function $(Z, z) {
    for (var J = [], le = 0; le < z; le++)
      J[le] = Array(z).fill(0);
    var K = 0;
    for (var re of Z) {
      for (var ie = re.length, j = 0; j < ie; j++)
        for (var te = 0; te < ie; te++)
          J[K + j][K + te] = re[j][te];
      K += ie;
    }
    return J;
  }
  function F(Z, z, J) {
    for (var le = 0; le < Z.length; le++)
      if (J(Z[le], z))
        return le;
    return -1;
  }
  function _(Z, z, J, le, K) {
    for (var re = K === "BigNumber" ? s(1e3) : 1e3, ie, j = 0; j < 5; ++j) {
      ie = L(z, J, K);
      try {
        ie = d(Z, ie);
      } catch {
        continue;
      }
      if (h(W(ie), re))
        break;
    }
    if (j >= 5)
      return null;
    for (j = 0; ; ) {
      var te = d(Z, ie);
      if (w(W(B(ie, [te])), le))
        break;
      if (++j >= 10)
        return null;
      ie = Q(te);
    }
    return ie;
  }
  function L(Z, z, J) {
    var le = J === "BigNumber", K = J === "Complex", re = Array(Z).fill(0).map((ie) => 2 * Math.random() - 1);
    return le && (re = re.map((ie) => s(ie))), K && (re = re.map((ie) => D(ie))), re = B(re, z), Q(re, J);
  }
  function B(Z, z) {
    var J = f(Z);
    for (var le of z)
      le = m(le, J), Z = t(Z, a(o(g(le, Z), g(le, le)), le));
    return Z;
  }
  function W(Z) {
    return l(c(g(Z, Z)));
  }
  function Q(Z, z) {
    var J = z === "BigNumber", le = z === "Complex", K = J ? s(1) : le ? D(1) : 1;
    return a(o(K, W(Z)), Z);
  }
  return A;
}
function JS(e) {
  var {
    config: r,
    addScalar: t,
    subtract: n,
    abs: a,
    atan: i,
    cos: o,
    sin: c,
    multiplyScalar: l,
    inv: s,
    bignumber: u,
    multiply: f,
    add: m
  } = e;
  function v(N, S) {
    var C = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : r.relTol, T = arguments.length > 3 ? arguments[3] : void 0, O = arguments.length > 4 ? arguments[4] : void 0;
    if (T === "number")
      return p(N, C, O);
    if (T === "BigNumber")
      return d(N, C, O);
    throw TypeError("Unsupported data type: " + T);
  }
  function p(N, S, C) {
    var T = N.length, O = Math.abs(S / T), I, $;
    if (C) {
      $ = new Array(T);
      for (var F = 0; F < T; F++)
        $[F] = Array(T).fill(0), $[F][F] = 1;
    }
    for (var _ = g(N); Math.abs(_[1]) >= Math.abs(O); ) {
      var L = _[0][0], B = _[0][1];
      I = b(N[L][L], N[B][B], N[L][B]), N = y(N, I, L, B), C && ($ = D($, I, L, B)), _ = g(N);
    }
    for (var W = Array(T).fill(0), Q = 0; Q < T; Q++)
      W[Q] = N[Q][Q];
    return E(Me(W), $, C);
  }
  function d(N, S, C) {
    var T = N.length, O = a(S / T), I, $;
    if (C) {
      $ = new Array(T);
      for (var F = 0; F < T; F++)
        $[F] = Array(T).fill(0), $[F][F] = 1;
    }
    for (var _ = A(N); a(_[1]) >= a(O); ) {
      var L = _[0][0], B = _[0][1];
      I = x(N[L][L], N[B][B], N[L][B]), N = w(N, I, L, B), C && ($ = h($, I, L, B)), _ = A(N);
    }
    for (var W = Array(T).fill(0), Q = 0; Q < T; Q++)
      W[Q] = N[Q][Q];
    return E(Me(W), $, C);
  }
  function b(N, S, C) {
    var T = S - N;
    return Math.abs(T) <= r.relTol ? Math.PI / 4 : 0.5 * Math.atan(2 * C / (S - N));
  }
  function x(N, S, C) {
    var T = n(S, N);
    return a(T) <= r.relTol ? u(-1).acos().div(4) : l(0.5, i(f(2, C, s(T))));
  }
  function D(N, S, C, T) {
    for (var O = N.length, I = Math.cos(S), $ = Math.sin(S), F = Array(O).fill(0), _ = Array(O).fill(0), L = 0; L < O; L++)
      F[L] = I * N[L][C] - $ * N[L][T], _[L] = $ * N[L][C] + I * N[L][T];
    for (var B = 0; B < O; B++)
      N[B][C] = F[B], N[B][T] = _[B];
    return N;
  }
  function h(N, S, C, T) {
    for (var O = N.length, I = o(S), $ = c(S), F = Array(O).fill(u(0)), _ = Array(O).fill(u(0)), L = 0; L < O; L++)
      F[L] = n(l(I, N[L][C]), l($, N[L][T])), _[L] = t(l($, N[L][C]), l(I, N[L][T]));
    for (var B = 0; B < O; B++)
      N[B][C] = F[B], N[B][T] = _[B];
    return N;
  }
  function w(N, S, C, T) {
    for (var O = N.length, I = u(o(S)), $ = u(c(S)), F = l(I, I), _ = l($, $), L = Array(O).fill(u(0)), B = Array(O).fill(u(0)), W = f(u(2), I, $, N[C][T]), Q = t(n(l(F, N[C][C]), W), l(_, N[T][T])), Z = m(l(_, N[C][C]), W, l(F, N[T][T])), z = 0; z < O; z++)
      L[z] = n(l(I, N[C][z]), l($, N[T][z])), B[z] = t(l($, N[C][z]), l(I, N[T][z]));
    N[C][C] = Q, N[T][T] = Z, N[C][T] = u(0), N[T][C] = u(0);
    for (var J = 0; J < O; J++)
      J !== C && J !== T && (N[C][J] = L[J], N[J][C] = L[J], N[T][J] = B[J], N[J][T] = B[J]);
    return N;
  }
  function y(N, S, C, T) {
    for (var O = N.length, I = Math.cos(S), $ = Math.sin(S), F = I * I, _ = $ * $, L = Array(O).fill(0), B = Array(O).fill(0), W = F * N[C][C] - 2 * I * $ * N[C][T] + _ * N[T][T], Q = _ * N[C][C] + 2 * I * $ * N[C][T] + F * N[T][T], Z = 0; Z < O; Z++)
      L[Z] = I * N[C][Z] - $ * N[T][Z], B[Z] = $ * N[C][Z] + I * N[T][Z];
    N[C][C] = W, N[T][T] = Q, N[C][T] = 0, N[T][C] = 0;
    for (var z = 0; z < O; z++)
      z !== C && z !== T && (N[C][z] = L[z], N[z][C] = L[z], N[T][z] = B[z], N[z][T] = B[z]);
    return N;
  }
  function g(N) {
    for (var S = N.length, C = 0, T = [0, 1], O = 0; O < S; O++)
      for (var I = O + 1; I < S; I++)
        Math.abs(C) < Math.abs(N[O][I]) && (C = Math.abs(N[O][I]), T = [O, I]);
    return [T, C];
  }
  function A(N) {
    for (var S = N.length, C = 0, T = [0, 1], O = 0; O < S; O++)
      for (var I = O + 1; I < S; I++)
        a(C) < a(N[O][I]) && (C = a(N[O][I]), T = [O, I]);
    return [T, C];
  }
  function E(N, S, C) {
    var T = N.length, O = Array(T), I;
    if (C) {
      I = Array(T);
      for (var $ = 0; $ < T; $++)
        I[$] = Array(T);
    }
    for (var F = 0; F < T; F++) {
      for (var _ = 0, L = N[0], B = 0; B < N.length; B++)
        a(N[B]) < a(L) && (_ = B, L = N[_]);
      if (O[F] = N.splice(_, 1)[0], C)
        for (var W = 0; W < T; W++)
          I[F][W] = S[W][_], S[W].splice(_, 1);
    }
    if (!C) return {
      values: O
    };
    var Q = I.map((Z, z) => ({
      value: O[z],
      vector: Z
    }));
    return {
      values: O,
      eigenvectors: Q
    };
  }
  return v;
}
var QS = "eigs", KS = ["config", "typed", "matrix", "addScalar", "equal", "subtract", "abs", "atan", "cos", "sin", "multiplyScalar", "divideScalar", "inv", "bignumber", "multiply", "add", "larger", "column", "flatten", "number", "complex", "sqrt", "diag", "size", "reshape", "qr", "usolve", "usolveAll", "im", "re", "smaller", "matrixFromColumns", "dot"], jS = /* @__PURE__ */ q(QS, KS, (e) => {
  var {
    config: r,
    typed: t,
    matrix: n,
    addScalar: a,
    subtract: i,
    equal: o,
    abs: c,
    atan: l,
    cos: s,
    sin: u,
    multiplyScalar: f,
    divideScalar: m,
    inv: v,
    bignumber: p,
    multiply: d,
    add: b,
    larger: x,
    column: D,
    flatten: h,
    number: w,
    complex: y,
    sqrt: g,
    diag: A,
    size: E,
    reshape: N,
    qr: S,
    usolve: C,
    usolveAll: T,
    im: O,
    re: I,
    smaller: $,
    matrixFromColumns: F,
    dot: _
  } = e, L = JS({
    config: r,
    addScalar: a,
    subtract: i,
    column: D,
    flatten: h,
    equal: o,
    abs: c,
    atan: l,
    cos: s,
    sin: u,
    multiplyScalar: f,
    inv: v,
    bignumber: p,
    complex: y,
    multiply: d,
    add: b
  }), B = XS({
    config: r,
    addScalar: a,
    subtract: i,
    multiply: d,
    multiplyScalar: f,
    flatten: h,
    divideScalar: m,
    sqrt: g,
    abs: c,
    bignumber: p,
    diag: A,
    size: E,
    reshape: N,
    qr: S,
    inv: v,
    usolve: C,
    usolveAll: T,
    equal: o,
    complex: y,
    larger: x,
    smaller: $,
    matrixFromColumns: F,
    dot: _
  });
  return t("eigs", {
    // The conversion to matrix in the first two implementations,
    // just to convert back to an array right away in
    // computeValuesAndVectors, is unfortunate, and should perhaps be
    // streamlined. It is done because the Matrix object carries some
    // type information about its entries, and so constructing the matrix
    // is a roundabout way of doing type detection.
    Array: function(re) {
      return W(n(re));
    },
    "Array, number|BigNumber": function(re, ie) {
      return W(n(re), {
        precision: ie
      });
    },
    "Array, Object"(K, re) {
      return W(n(K), re);
    },
    Matrix: function(re) {
      return W(re, {
        matricize: !0
      });
    },
    "Matrix, number|BigNumber": function(re, ie) {
      return W(re, {
        precision: ie,
        matricize: !0
      });
    },
    "Matrix, Object": function(re, ie) {
      var j = {
        matricize: !0
      };
      return vr(j, ie), W(re, j);
    }
  });
  function W(K) {
    var re, ie = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, j = "eigenvectors" in ie ? ie.eigenvectors : !0, te = (re = ie.precision) !== null && re !== void 0 ? re : r.relTol, oe = Q(K, te, j);
    return ie.matricize && (oe.values = n(oe.values), j && (oe.eigenvectors = oe.eigenvectors.map((me) => {
      var {
        value: be,
        vector: we
      } = me;
      return {
        value: be,
        vector: n(we)
      };
    }))), j && Object.defineProperty(oe, "vectors", {
      enumerable: !1,
      // to make sure that the eigenvectors can still be
      // converted to string.
      get: () => {
        throw new Error("eigs(M).vectors replaced with eigs(M).eigenvectors");
      }
    }), oe;
  }
  function Q(K, re, ie) {
    var j = K.toArray(), te = K.size();
    if (te.length !== 2 || te[0] !== te[1])
      throw new RangeError("Matrix must be square (size: ".concat(Pe(te), ")"));
    var oe = te[0];
    if (z(j, oe, re) && (J(j, oe), Z(j, oe, re))) {
      var me = le(K, j, oe);
      return L(j, oe, re, me, ie);
    }
    var be = le(K, j, oe);
    return B(j, oe, re, be, ie);
  }
  function Z(K, re, ie) {
    for (var j = 0; j < re; j++)
      for (var te = j; te < re; te++)
        if (x(p(c(i(K[j][te], K[te][j]))), ie))
          return !1;
    return !0;
  }
  function z(K, re, ie) {
    for (var j = 0; j < re; j++)
      for (var te = 0; te < re; te++)
        if (x(p(c(O(K[j][te]))), ie))
          return !1;
    return !0;
  }
  function J(K, re) {
    for (var ie = 0; ie < re; ie++)
      for (var j = 0; j < re; j++)
        K[ie][j] = I(K[ie][j]);
  }
  function le(K, re, ie) {
    var j = K.datatype();
    if (j === "number" || j === "BigNumber" || j === "Complex")
      return j;
    for (var te = !1, oe = !1, me = !1, be = 0; be < ie; be++)
      for (var we = 0; we < ie; we++) {
        var P = re[be][we];
        if (Oe(P) || ht(P))
          te = !0;
        else if (Be(P))
          oe = !0;
        else if (Ir(P))
          me = !0;
        else
          throw TypeError("Unsupported type in Matrix: " + Je(P));
      }
    if (oe && me && console.warn("Complex BigNumbers not supported, this operation will lose precission."), me) {
      for (var H = 0; H < ie; H++)
        for (var ee = 0; ee < ie; ee++)
          re[H][ee] = y(re[H][ee]);
      return "Complex";
    }
    if (oe) {
      for (var k = 0; k < ie; k++)
        for (var V = 0; V < ie; V++)
          re[k][V] = p(re[k][V]);
      return "BigNumber";
    }
    if (te) {
      for (var X = 0; X < ie; X++)
        for (var fe = 0; fe < ie; fe++)
          re[X][fe] = w(re[X][fe]);
      return "number";
    } else
      throw TypeError("Matrix contains unsupported types only.");
  }
}), sl = "expm", eC = ["typed", "abs", "add", "identity", "inv", "multiply"], rC = /* @__PURE__ */ q(sl, eC, (e) => {
  var {
    typed: r,
    abs: t,
    add: n,
    identity: a,
    inv: i,
    multiply: o
  } = e;
  return r(sl, {
    Matrix: function(f) {
      var m = f.size();
      if (m.length !== 2 || m[0] !== m[1])
        throw new RangeError("Matrix must be square (size: " + Pe(m) + ")");
      for (var v = m[0], p = 1e-15, d = c(f), b = l(d, p), x = b.q, D = b.j, h = o(f, Math.pow(2, -D)), w = a(v), y = a(v), g = 1, A = h, E = -1, N = 1; N <= x; N++)
        N > 1 && (A = o(A, h), E = -E), g = g * (x - N + 1) / ((2 * x - N + 1) * N), w = n(w, o(g, A)), y = n(y, o(g * E, A));
      for (var S = o(i(y), w), C = 0; C < D; C++)
        S = o(S, S);
      return et(f) ? f.createSparseMatrix(S) : S;
    }
  });
  function c(u) {
    for (var f = u.size()[0], m = 0, v = 0; v < f; v++) {
      for (var p = 0, d = 0; d < f; d++)
        p += t(u.get([v, d]));
      m = Math.max(p, m);
    }
    return m;
  }
  function l(u, f) {
    for (var m = 30, v = 0; v < m; v++)
      for (var p = 0; p <= v; p++) {
        var d = v - p;
        if (s(u, p, d) < f)
          return {
            q: p,
            j: d
          };
      }
    throw new Error("Could not find acceptable parameters to compute the matrix exponential (try increasing maxSearchSize in expm.js)");
  }
  function s(u, f, m) {
    for (var v = 1, p = 2; p <= f; p++)
      v *= p;
    for (var d = v, b = f + 1; b <= 2 * f; b++)
      d *= b;
    var x = d * (2 * f + 1);
    return 8 * Math.pow(u / Math.pow(2, m), 2 * f) * v * v / (d * x);
  }
}), ul = "sqrtm", tC = ["typed", "abs", "add", "multiply", "map", "sqrt", "subtract", "inv", "size", "max", "identity"], nC = /* @__PURE__ */ q(ul, tC, (e) => {
  var {
    typed: r,
    abs: t,
    add: n,
    multiply: a,
    map: i,
    sqrt: o,
    subtract: c,
    inv: l,
    size: s,
    max: u,
    identity: f
  } = e, m = 1e3, v = 1e-6;
  function p(d) {
    var b, x = 0, D = d, h = f(s(d));
    do {
      var w = D;
      if (D = a(0.5, n(w, l(h))), h = a(0.5, n(h, l(w))), b = u(t(c(D, w))), b > v && ++x > m)
        throw new Error("computing square root of matrix: iterative method could not converge");
    } while (b > v);
    return D;
  }
  return r(ul, {
    "Array | Matrix": function(b) {
      var x = Ce(b) ? b.size() : Te(b);
      switch (x.length) {
        case 1:
          if (x[0] === 1)
            return i(b, o);
          throw new RangeError("Matrix must be square (size: " + Pe(x) + ")");
        case 2: {
          var D = x[0], h = x[1];
          if (D === h)
            return p(b);
          throw new RangeError("Matrix must be square (size: " + Pe(x) + ")");
        }
        default:
          throw new RangeError("Matrix must be at most two dimensional (size: " + Pe(x) + ")");
      }
    }
  });
}), ll = "sylvester", aC = ["typed", "schur", "matrixFromColumns", "matrix", "multiply", "range", "concat", "transpose", "index", "subset", "add", "subtract", "identity", "lusolve", "abs"], iC = /* @__PURE__ */ q(ll, aC, (e) => {
  var {
    typed: r,
    schur: t,
    matrixFromColumns: n,
    matrix: a,
    multiply: i,
    range: o,
    concat: c,
    transpose: l,
    index: s,
    subset: u,
    add: f,
    subtract: m,
    identity: v,
    lusolve: p,
    abs: d
  } = e;
  return r(ll, {
    "Matrix, Matrix, Matrix": b,
    "Array, Matrix, Matrix": function(D, h, w) {
      return b(a(D), h, w);
    },
    "Array, Array, Matrix": function(D, h, w) {
      return b(a(D), a(h), w);
    },
    "Array, Matrix, Array": function(D, h, w) {
      return b(a(D), h, a(w));
    },
    "Matrix, Array, Matrix": function(D, h, w) {
      return b(D, a(h), w);
    },
    "Matrix, Array, Array": function(D, h, w) {
      return b(D, a(h), a(w));
    },
    "Matrix, Matrix, Array": function(D, h, w) {
      return b(D, h, a(w));
    },
    "Array, Array, Array": function(D, h, w) {
      return b(a(D), a(h), a(w)).toArray();
    }
  });
  function b(x, D, h) {
    for (var w = D.size()[0], y = x.size()[0], g = t(x), A = g.T, E = g.U, N = t(i(-1, D)), S = N.T, C = N.U, T = i(i(l(E), h), C), O = o(0, y), I = [], $ = (me, be) => c(me, be, 1), F = (me, be) => c(me, be, 0), _ = 0; _ < w; _++)
      if (_ < w - 1 && d(u(S, s(_ + 1, _))) > 1e-5) {
        for (var L = F(u(T, s(O, _)), u(T, s(O, _ + 1))), B = 0; B < _; B++)
          L = f(L, F(i(I[B], u(S, s(B, _))), i(I[B], u(S, s(B, _ + 1)))));
        var W = i(v(y), i(-1, u(S, s(_, _)))), Q = i(v(y), i(-1, u(S, s(_ + 1, _)))), Z = i(v(y), i(-1, u(S, s(_, _ + 1)))), z = i(v(y), i(-1, u(S, s(_ + 1, _ + 1)))), J = F($(f(A, W), Q), $(Z, f(A, z))), le = p(J, L);
        I[_] = le.subset(s(o(0, y), 0)), I[_ + 1] = le.subset(s(o(y, 2 * y), 0)), _++;
      } else {
        for (var K = u(T, s(O, _)), re = 0; re < _; re++)
          K = f(K, i(I[re], u(S, s(re, _))));
        var ie = u(S, s(_, _)), j = m(A, i(ie, v(y)));
        I[_] = p(j, K);
      }
    var te = a(n(...I)), oe = i(E, i(te, l(C)));
    return oe;
  }
}), cl = "schur", oC = ["typed", "matrix", "identity", "multiply", "qr", "norm", "subtract"], sC = /* @__PURE__ */ q(cl, oC, (e) => {
  var {
    typed: r,
    matrix: t,
    identity: n,
    multiply: a,
    qr: i,
    norm: o,
    subtract: c
  } = e;
  return r(cl, {
    Array: function(u) {
      var f = l(t(u));
      return {
        U: f.U.valueOf(),
        T: f.T.valueOf()
      };
    },
    Matrix: function(u) {
      return l(u);
    }
  });
  function l(s) {
    var u = s.size()[0], f = s, m = n(u), v = 0, p;
    do {
      p = f;
      var d = i(f), b = d.Q, x = d.R;
      if (f = a(x, b), m = a(m, b), v++ > 100)
        break;
    } while (o(c(f, p)) > 1e-4);
    return {
      U: m,
      T: f
    };
  }
}), fl = "lyap", uC = ["typed", "matrix", "sylvester", "multiply", "transpose"], lC = /* @__PURE__ */ q(fl, uC, (e) => {
  var {
    typed: r,
    matrix: t,
    sylvester: n,
    multiply: a,
    transpose: i
  } = e;
  return r(fl, {
    "Matrix, Matrix": function(c, l) {
      return n(c, i(c), a(-1, l));
    },
    "Array, Matrix": function(c, l) {
      return n(t(c), i(t(c)), a(-1, l));
    },
    "Matrix, Array": function(c, l) {
      return n(c, i(t(c)), t(a(-1, l)));
    },
    "Array, Array": function(c, l) {
      return n(t(c), i(t(c)), t(a(-1, l))).toArray();
    }
  });
}), cC = "divide", fC = ["typed", "matrix", "multiply", "equalScalar", "divideScalar", "inv"], mC = /* @__PURE__ */ q(cC, fC, (e) => {
  var {
    typed: r,
    matrix: t,
    multiply: n,
    equalScalar: a,
    divideScalar: i,
    inv: o
  } = e, c = cr({
    typed: r,
    equalScalar: a
  }), l = zr({
    typed: r
  });
  return r("divide", xc({
    // we extend the signatures of divideScalar with signatures dealing with matrices
    "Array | Matrix, Array | Matrix": function(u, f) {
      return n(u, o(f));
    },
    "DenseMatrix, any": function(u, f) {
      return l(u, f, i, !1);
    },
    "SparseMatrix, any": function(u, f) {
      return c(u, f, i, !1);
    },
    "Array, any": function(u, f) {
      return l(t(u), f, i, !1).valueOf();
    },
    "any, Array | Matrix": function(u, f) {
      return n(u, o(f));
    }
  }, i.signatures));
}), ml = "distance", vC = ["typed", "addScalar", "subtractScalar", "divideScalar", "multiplyScalar", "deepEqual", "sqrt", "abs"], pC = /* @__PURE__ */ q(ml, vC, (e) => {
  var {
    typed: r,
    addScalar: t,
    subtractScalar: n,
    multiplyScalar: a,
    divideScalar: i,
    deepEqual: o,
    sqrt: c,
    abs: l
  } = e;
  return r(ml, {
    "Array, Array, Array": function(y, g, A) {
      if (y.length === 2 && g.length === 2 && A.length === 2) {
        if (!u(y))
          throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
        if (!u(g))
          throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
        if (!u(A))
          throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
        if (o(g, A))
          throw new TypeError("LinePoint1 should not be same with LinePoint2");
        var E = n(A[1], g[1]), N = n(g[0], A[0]), S = n(a(A[0], g[1]), a(g[0], A[1]));
        return b(y[0], y[1], E, N, S);
      } else
        throw new TypeError("Invalid Arguments: Try again");
    },
    "Object, Object, Object": function(y, g, A) {
      if (Object.keys(y).length === 2 && Object.keys(g).length === 2 && Object.keys(A).length === 2) {
        if (!u(y))
          throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
        if (!u(g))
          throw new TypeError("Values of lineOnePtX and lineOnePtY should be numbers or BigNumbers");
        if (!u(A))
          throw new TypeError("Values of lineTwoPtX and lineTwoPtY should be numbers or BigNumbers");
        if (o(p(g), p(A)))
          throw new TypeError("LinePoint1 should not be same with LinePoint2");
        if ("pointX" in y && "pointY" in y && "lineOnePtX" in g && "lineOnePtY" in g && "lineTwoPtX" in A && "lineTwoPtY" in A) {
          var E = n(A.lineTwoPtY, g.lineOnePtY), N = n(g.lineOnePtX, A.lineTwoPtX), S = n(a(A.lineTwoPtX, g.lineOnePtY), a(g.lineOnePtX, A.lineTwoPtY));
          return b(y.pointX, y.pointY, E, N, S);
        } else
          throw new TypeError("Key names do not match");
      } else
        throw new TypeError("Invalid Arguments: Try again");
    },
    "Array, Array": function(y, g) {
      if (y.length === 2 && g.length === 3) {
        if (!u(y))
          throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
        if (!f(g))
          throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
        return b(y[0], y[1], g[0], g[1], g[2]);
      } else if (y.length === 3 && g.length === 6) {
        if (!f(y))
          throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
        if (!v(g))
          throw new TypeError("Array with 6 numbers or BigNumbers expected for second argument");
        return x(y[0], y[1], y[2], g[0], g[1], g[2], g[3], g[4], g[5]);
      } else if (y.length === g.length && y.length > 0) {
        if (!m(y))
          throw new TypeError("All values of an array should be numbers or BigNumbers");
        if (!m(g))
          throw new TypeError("All values of an array should be numbers or BigNumbers");
        return D(y, g);
      } else
        throw new TypeError("Invalid Arguments: Try again");
    },
    "Object, Object": function(y, g) {
      if (Object.keys(y).length === 2 && Object.keys(g).length === 3) {
        if (!u(y))
          throw new TypeError("Values of pointX and pointY should be numbers or BigNumbers");
        if (!f(g))
          throw new TypeError("Values of xCoeffLine, yCoeffLine and constant should be numbers or BigNumbers");
        if ("pointX" in y && "pointY" in y && "xCoeffLine" in g && "yCoeffLine" in g && "constant" in g)
          return b(y.pointX, y.pointY, g.xCoeffLine, g.yCoeffLine, g.constant);
        throw new TypeError("Key names do not match");
      } else if (Object.keys(y).length === 3 && Object.keys(g).length === 6) {
        if (!f(y))
          throw new TypeError("Values of pointX, pointY and pointZ should be numbers or BigNumbers");
        if (!v(g))
          throw new TypeError("Values of x0, y0, z0, a, b and c should be numbers or BigNumbers");
        if ("pointX" in y && "pointY" in y && "x0" in g && "y0" in g && "z0" in g && "a" in g && "b" in g && "c" in g)
          return x(y.pointX, y.pointY, y.pointZ, g.x0, g.y0, g.z0, g.a, g.b, g.c);
        throw new TypeError("Key names do not match");
      } else if (Object.keys(y).length === 2 && Object.keys(g).length === 2) {
        if (!u(y))
          throw new TypeError("Values of pointOneX and pointOneY should be numbers or BigNumbers");
        if (!u(g))
          throw new TypeError("Values of pointTwoX and pointTwoY should be numbers or BigNumbers");
        if ("pointOneX" in y && "pointOneY" in y && "pointTwoX" in g && "pointTwoY" in g)
          return D([y.pointOneX, y.pointOneY], [g.pointTwoX, g.pointTwoY]);
        throw new TypeError("Key names do not match");
      } else if (Object.keys(y).length === 3 && Object.keys(g).length === 3) {
        if (!f(y))
          throw new TypeError("Values of pointOneX, pointOneY and pointOneZ should be numbers or BigNumbers");
        if (!f(g))
          throw new TypeError("Values of pointTwoX, pointTwoY and pointTwoZ should be numbers or BigNumbers");
        if ("pointOneX" in y && "pointOneY" in y && "pointOneZ" in y && "pointTwoX" in g && "pointTwoY" in g && "pointTwoZ" in g)
          return D([y.pointOneX, y.pointOneY, y.pointOneZ], [g.pointTwoX, g.pointTwoY, g.pointTwoZ]);
        throw new TypeError("Key names do not match");
      } else
        throw new TypeError("Invalid Arguments: Try again");
    },
    Array: function(y) {
      if (!d(y))
        throw new TypeError("Incorrect array format entered for pairwise distance calculation");
      return h(y);
    }
  });
  function s(w) {
    return typeof w == "number" || Be(w);
  }
  function u(w) {
    return w.constructor !== Array && (w = p(w)), s(w[0]) && s(w[1]);
  }
  function f(w) {
    return w.constructor !== Array && (w = p(w)), s(w[0]) && s(w[1]) && s(w[2]);
  }
  function m(w) {
    return Array.isArray(w) || (w = p(w)), w.every(s);
  }
  function v(w) {
    return w.constructor !== Array && (w = p(w)), s(w[0]) && s(w[1]) && s(w[2]) && s(w[3]) && s(w[4]) && s(w[5]);
  }
  function p(w) {
    for (var y = Object.keys(w), g = [], A = 0; A < y.length; A++)
      g.push(w[y[A]]);
    return g;
  }
  function d(w) {
    if (w[0].length === 2 && s(w[0][0]) && s(w[0][1])) {
      if (w.some((y) => y.length !== 2 || !s(y[0]) || !s(y[1])))
        return !1;
    } else if (w[0].length === 3 && s(w[0][0]) && s(w[0][1]) && s(w[0][2])) {
      if (w.some((y) => y.length !== 3 || !s(y[0]) || !s(y[1]) || !s(y[2])))
        return !1;
    } else
      return !1;
    return !0;
  }
  function b(w, y, g, A, E) {
    var N = l(t(t(a(g, w), a(A, y)), E)), S = c(t(a(g, g), a(A, A)));
    return i(N, S);
  }
  function x(w, y, g, A, E, N, S, C, T) {
    var O = [n(a(n(E, y), T), a(n(N, g), C)), n(a(n(N, g), S), a(n(A, w), T)), n(a(n(A, w), C), a(n(E, y), S))];
    O = c(t(t(a(O[0], O[0]), a(O[1], O[1])), a(O[2], O[2])));
    var I = c(t(t(a(S, S), a(C, C)), a(T, T)));
    return i(O, I);
  }
  function D(w, y) {
    for (var g = w.length, A = 0, E = 0, N = 0; N < g; N++)
      E = n(w[N], y[N]), A = t(a(E, E), A);
    return c(A);
  }
  function h(w) {
    for (var y = [], g = [], A = [], E = 0; E < w.length - 1; E++)
      for (var N = E + 1; N < w.length; N++)
        w[0].length === 2 ? (g = [w[E][0], w[E][1]], A = [w[N][0], w[N][1]]) : w[0].length === 3 && (g = [w[E][0], w[E][1], w[E][2]], A = [w[N][0], w[N][1], w[N][2]]), y.push(D(g, A));
    return y;
  }
}), dC = "intersect", hC = ["typed", "config", "abs", "add", "addScalar", "matrix", "multiply", "multiplyScalar", "divideScalar", "subtract", "smaller", "equalScalar", "flatten", "isZero", "isNumeric"], gC = /* @__PURE__ */ q(dC, hC, (e) => {
  var {
    typed: r,
    config: t,
    abs: n,
    add: a,
    addScalar: i,
    matrix: o,
    multiply: c,
    multiplyScalar: l,
    divideScalar: s,
    subtract: u,
    smaller: f,
    equalScalar: m,
    flatten: v,
    isZero: p,
    isNumeric: d
  } = e;
  return r("intersect", {
    "Array, Array, Array": b,
    "Array, Array, Array, Array": x,
    "Matrix, Matrix, Matrix": function(C, T, O) {
      var I = b(C.valueOf(), T.valueOf(), O.valueOf());
      return I === null ? null : o(I);
    },
    "Matrix, Matrix, Matrix, Matrix": function(C, T, O, I) {
      var $ = x(C.valueOf(), T.valueOf(), O.valueOf(), I.valueOf());
      return $ === null ? null : o($);
    }
  });
  function b(S, C, T) {
    if (S = D(S), C = D(C), T = D(T), !w(S))
      throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
    if (!w(C))
      throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
    if (!y(T))
      throw new TypeError("Array with 4 numbers expected as third argument");
    return N(S[0], S[1], S[2], C[0], C[1], C[2], T[0], T[1], T[2], T[3]);
  }
  function x(S, C, T, O) {
    if (S = D(S), C = D(C), T = D(T), O = D(O), S.length === 2) {
      if (!h(S))
        throw new TypeError("Array with 2 numbers or BigNumbers expected for first argument");
      if (!h(C))
        throw new TypeError("Array with 2 numbers or BigNumbers expected for second argument");
      if (!h(T))
        throw new TypeError("Array with 2 numbers or BigNumbers expected for third argument");
      if (!h(O))
        throw new TypeError("Array with 2 numbers or BigNumbers expected for fourth argument");
      return g(S, C, T, O);
    } else if (S.length === 3) {
      if (!w(S))
        throw new TypeError("Array with 3 numbers or BigNumbers expected for first argument");
      if (!w(C))
        throw new TypeError("Array with 3 numbers or BigNumbers expected for second argument");
      if (!w(T))
        throw new TypeError("Array with 3 numbers or BigNumbers expected for third argument");
      if (!w(O))
        throw new TypeError("Array with 3 numbers or BigNumbers expected for fourth argument");
      return E(S[0], S[1], S[2], C[0], C[1], C[2], T[0], T[1], T[2], O[0], O[1], O[2]);
    } else
      throw new TypeError("Arrays with two or thee dimensional points expected");
  }
  function D(S) {
    return S.length === 1 ? S[0] : S.length > 1 && Array.isArray(S[0]) && S.every((C) => Array.isArray(C) && C.length === 1) ? v(S) : S;
  }
  function h(S) {
    return S.length === 2 && d(S[0]) && d(S[1]);
  }
  function w(S) {
    return S.length === 3 && d(S[0]) && d(S[1]) && d(S[2]);
  }
  function y(S) {
    return S.length === 4 && d(S[0]) && d(S[1]) && d(S[2]) && d(S[3]);
  }
  function g(S, C, T, O) {
    var I = S, $ = T, F = u(I, C), _ = u($, O), L = u(l(F[0], _[1]), l(_[0], F[1]));
    if (p(L) || f(n(L), t.relTol))
      return null;
    var B = l(_[0], I[1]), W = l(_[1], I[0]), Q = l(_[0], $[1]), Z = l(_[1], $[0]), z = s(i(u(u(B, W), Q), Z), L);
    return a(c(F, z), I);
  }
  function A(S, C, T, O, I, $, F, _, L, B, W, Q) {
    var Z = l(u(S, C), u(T, O)), z = l(u(I, $), u(F, _)), J = l(u(L, B), u(W, Q));
    return i(i(Z, z), J);
  }
  function E(S, C, T, O, I, $, F, _, L, B, W, Q) {
    var Z = A(S, F, B, F, C, _, W, _, T, L, Q, L), z = A(B, F, O, S, W, _, I, C, Q, L, $, T), J = A(S, F, O, S, C, _, I, C, T, L, $, T), le = A(B, F, B, F, W, _, W, _, Q, L, Q, L), K = A(O, S, O, S, I, C, I, C, $, T, $, T), re = u(l(Z, z), l(J, le)), ie = u(l(K, le), l(z, z));
    if (p(ie)) return null;
    var j = s(re, ie), te = s(i(Z, l(j, z)), le), oe = i(S, l(j, u(O, S))), me = i(C, l(j, u(I, C))), be = i(T, l(j, u($, T))), we = i(F, l(te, u(B, F))), P = i(_, l(te, u(W, _))), H = i(L, l(te, u(Q, L)));
    return m(oe, we) && m(me, P) && m(be, H) ? [oe, me, be] : null;
  }
  function N(S, C, T, O, I, $, F, _, L, B) {
    var W = l(S, F), Q = l(O, F), Z = l(C, _), z = l(I, _), J = l(T, L), le = l($, L), K = u(u(u(B, W), Z), J), re = u(u(u(i(i(Q, z), le), W), Z), J), ie = s(K, re), j = i(S, l(ie, u(O, S))), te = i(C, l(ie, u(I, C))), oe = i(T, l(ie, u($, T)));
    return [j, te, oe];
  }
}), vl = "sum", yC = ["typed", "config", "add", "numeric"], hm = /* @__PURE__ */ q(vl, yC, (e) => {
  var {
    typed: r,
    config: t,
    add: n,
    numeric: a
  } = e;
  return r(vl, {
    // sum([a, b, c, d, ...])
    "Array | Matrix": i,
    // sum([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": o,
    // sum(a, b, c, d, ...)
    "...": function(l) {
      if (Ut(l))
        throw new TypeError("Scalar values expected in function sum");
      return i(l);
    }
  });
  function i(c) {
    var l;
    return Jr(c, function(s) {
      try {
        l = l === void 0 ? s : n(l, s);
      } catch (u) {
        throw gr(u, "sum", s);
      }
    }), l === void 0 && (l = a(0, t.number)), typeof l == "string" && (l = a(l, st(l, t))), l;
  }
  function o(c, l) {
    try {
      var s = ca(c, l, n);
      return s;
    } catch (u) {
      throw gr(u, "sum");
    }
  }
}), Tn = "cumsum", bC = ["typed", "add", "unaryPlus"], gm = /* @__PURE__ */ q(Tn, bC, (e) => {
  var {
    typed: r,
    add: t,
    unaryPlus: n
  } = e;
  return r(Tn, {
    // sum([a, b, c, d, ...])
    Array: a,
    Matrix: function(s) {
      return s.create(a(s.valueOf(), s.datatype()));
    },
    // sum([a, b, c, d, ...], dim)
    "Array, number | BigNumber": o,
    "Matrix, number | BigNumber": function(s, u) {
      return s.create(o(s.valueOf(), u), s.datatype());
    },
    // cumsum(a, b, c, d, ...)
    "...": function(s) {
      if (Ut(s))
        throw new TypeError("All values expected to be scalar in function cumsum");
      return a(s);
    }
  });
  function a(l) {
    try {
      return i(l);
    } catch (s) {
      throw gr(s, Tn);
    }
  }
  function i(l) {
    if (l.length === 0)
      return [];
    for (var s = [n(l[0])], u = 1; u < l.length; ++u)
      s.push(t(s[u - 1], l[u]));
    return s;
  }
  function o(l, s) {
    var u = Te(l);
    if (s < 0 || s >= u.length)
      throw new Br(s, u.length);
    try {
      return c(l, s);
    } catch (f) {
      throw gr(f, Tn);
    }
  }
  function c(l, s) {
    var u, f, m;
    if (s <= 0) {
      var v = l[0][0];
      if (Array.isArray(v)) {
        for (m = Jc(l), f = [], u = 0; u < m.length; u++)
          f[u] = c(m[u], s - 1);
        return f;
      } else
        return i(l);
    } else {
      for (f = [], u = 0; u < l.length; u++)
        f[u] = c(l[u], s - 1);
      return f;
    }
  }
}), pl = "mean", xC = ["typed", "add", "divide"], ym = /* @__PURE__ */ q(pl, xC, (e) => {
  var {
    typed: r,
    add: t,
    divide: n
  } = e;
  return r(pl, {
    // mean([a, b, c, d, ...])
    "Array | Matrix": i,
    // mean([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": a,
    // mean(a, b, c, d, ...)
    "...": function(c) {
      if (Ut(c))
        throw new TypeError("Scalar values expected in function mean");
      return i(c);
    }
  });
  function a(o, c) {
    try {
      var l = ca(o, c, t), s = Array.isArray(o) ? Te(o) : o.size();
      return n(l, s[c]);
    } catch (u) {
      throw gr(u, "mean");
    }
  }
  function i(o) {
    var c, l = 0;
    if (Jr(o, function(s) {
      try {
        c = c === void 0 ? s : t(c, s), l++;
      } catch (u) {
        throw gr(u, "mean", s);
      }
    }), l === 0)
      throw new Error("Cannot calculate the mean of an empty array");
    return n(c, l);
  }
}), dl = "median", wC = ["typed", "add", "divide", "compare", "partitionSelect"], DC = /* @__PURE__ */ q(dl, wC, (e) => {
  var {
    typed: r,
    add: t,
    divide: n,
    compare: a,
    partitionSelect: i
  } = e;
  function o(s) {
    try {
      s = Ge(s.valueOf());
      var u = s.length;
      if (u === 0)
        throw new Error("Cannot calculate median of an empty array");
      if (u % 2 === 0) {
        for (var f = u / 2 - 1, m = i(s, f + 1), v = s[f], p = 0; p < f; ++p)
          a(s[p], v) > 0 && (v = s[p]);
        return l(v, m);
      } else {
        var d = i(s, (u - 1) / 2);
        return c(d);
      }
    } catch (b) {
      throw gr(b, "median");
    }
  }
  var c = r({
    "number | BigNumber | Complex | Unit": function(u) {
      return u;
    }
  }), l = r({
    "number | BigNumber | Complex | Unit, number | BigNumber | Complex | Unit": function(u, f) {
      return n(t(u, f), 2);
    }
  });
  return r(dl, {
    // median([a, b, c, d, ...])
    "Array | Matrix": o,
    // median([a, b, c, d, ...], dim)
    "Array | Matrix, number | BigNumber": function(u, f) {
      throw new Error("median(A, dim) is not yet supported");
    },
    // median(a, b, c, d, ...)
    "...": function(u) {
      if (Ut(u))
        throw new TypeError("Scalar values expected in function median");
      return o(u);
    }
  });
}), hl = "mad", NC = ["typed", "abs", "map", "median", "subtract"], AC = /* @__PURE__ */ q(hl, NC, (e) => {
  var {
    typed: r,
    abs: t,
    map: n,
    median: a,
    subtract: i
  } = e;
  return r(hl, {
    // mad([a, b, c, d, ...])
    "Array | Matrix": o,
    // mad(a, b, c, d, ...)
    "...": function(l) {
      return o(l);
    }
  });
  function o(c) {
    if (c = Ge(c.valueOf()), c.length === 0)
      throw new Error("Cannot calculate median absolute deviation (mad) of an empty array");
    try {
      var l = a(c);
      return a(n(c, function(s) {
        return t(i(s, l));
      }));
    } catch (s) {
      throw s instanceof TypeError && s.message.includes("median") ? new TypeError(s.message.replace("median", "mad")) : gr(s, "mad");
    }
  }
}), Ea = "unbiased", gl = "variance", EC = ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"], bm = /* @__PURE__ */ q(gl, EC, (e) => {
  var {
    typed: r,
    add: t,
    subtract: n,
    multiply: a,
    divide: i,
    apply: o,
    isNaN: c
  } = e;
  return r(gl, {
    // variance([a, b, c, d, ...])
    "Array | Matrix": function(f) {
      return l(f, Ea);
    },
    // variance([a, b, c, d, ...], normalization)
    "Array | Matrix, string": l,
    // variance([a, b, c, c, ...], dim)
    "Array | Matrix, number | BigNumber": function(f, m) {
      return s(f, m, Ea);
    },
    // variance([a, b, c, c, ...], dim, normalization)
    "Array | Matrix, number | BigNumber, string": s,
    // variance(a, b, c, d, ...)
    "...": function(f) {
      return l(f, Ea);
    }
  });
  function l(u, f) {
    var m, v = 0;
    if (u.length === 0)
      throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
    if (Jr(u, function(b) {
      try {
        m = m === void 0 ? b : t(m, b), v++;
      } catch (x) {
        throw gr(x, "variance", b);
      }
    }), v === 0) throw new Error("Cannot calculate variance of an empty array");
    var p = i(m, v);
    if (m = void 0, Jr(u, function(b) {
      var x = n(b, p);
      m = m === void 0 ? a(x, x) : t(m, a(x, x));
    }), c(m))
      return m;
    switch (f) {
      case "uncorrected":
        return i(m, v);
      case "biased":
        return i(m, v + 1);
      case "unbiased": {
        var d = Be(m) ? m.mul(0) : 0;
        return v === 1 ? d : i(m, v - 1);
      }
      default:
        throw new Error('Unknown normalization "' + f + '". Choose "unbiased" (default), "uncorrected", or "biased".');
    }
  }
  function s(u, f, m) {
    try {
      if (u.length === 0)
        throw new SyntaxError("Function variance requires one or more parameters (0 provided)");
      return o(u, f, (v) => l(v, m));
    } catch (v) {
      throw gr(v, "variance");
    }
  }
}), yl = "quantileSeq", SC = ["typed", "?bignumber", "add", "subtract", "divide", "multiply", "partitionSelect", "compare", "isInteger", "smaller", "smallerEq", "larger"], xm = /* @__PURE__ */ q(yl, SC, (e) => {
  var {
    typed: r,
    bignumber: t,
    add: n,
    subtract: a,
    divide: i,
    multiply: o,
    partitionSelect: c,
    compare: l,
    isInteger: s,
    smaller: u,
    smallerEq: f,
    larger: m
  } = e, v = ii({
    typed: r,
    isInteger: s
  });
  return r(yl, {
    "Array | Matrix, number | BigNumber": (D, h) => d(D, h, !1),
    "Array | Matrix, number | BigNumber, number": (D, h, w) => p(D, h, !1, w, d),
    "Array | Matrix, number | BigNumber, boolean": d,
    "Array | Matrix, number | BigNumber, boolean, number": (D, h, w, y) => p(D, h, w, y, d),
    "Array | Matrix, Array | Matrix": (D, h) => b(D, h, !1),
    "Array | Matrix, Array | Matrix, number": (D, h, w) => p(D, h, !1, w, b),
    "Array | Matrix, Array | Matrix, boolean": b,
    "Array | Matrix, Array | Matrix, boolean, number": (D, h, w, y) => p(D, h, w, y, b)
  });
  function p(D, h, w, y, g) {
    return v(D, y, (A) => g(A, h, w));
  }
  function d(D, h, w) {
    var y, g = D.valueOf();
    if (u(h, 0))
      throw new Error("N/prob must be non-negative");
    if (f(h, 1))
      return Oe(h) ? x(g, h, w) : t(x(g, h, w));
    if (m(h, 1)) {
      if (!s(h))
        throw new Error("N must be a positive integer");
      if (m(h, 4294967295))
        throw new Error("N must be less than or equal to 2^32-1, as that is the maximum length of an Array");
      var A = n(h, 1);
      y = [];
      for (var E = 0; u(E, h); E++) {
        var N = i(E + 1, A);
        y.push(x(g, N, w));
      }
      return Oe(h) ? y : t(y);
    }
  }
  function b(D, h, w) {
    for (var y = D.valueOf(), g = h.valueOf(), A = [], E = 0; E < g.length; ++E)
      A.push(x(y, g[E], w));
    return A;
  }
  function x(D, h, w) {
    var y = Ge(D), g = y.length;
    if (g === 0)
      throw new Error("Cannot calculate quantile of an empty sequence");
    var A = Oe(h) ? h * (g - 1) : h.times(g - 1), E = Oe(h) ? Math.floor(A) : A.floor().toNumber(), N = Oe(h) ? A % 1 : A.minus(E);
    if (s(A))
      return w ? y[A] : c(y, Oe(h) ? A : A.valueOf());
    var S, C;
    if (w)
      S = y[E], C = y[E + 1];
    else {
      C = c(y, E + 1), S = y[E];
      for (var T = 0; T < E; ++T)
        l(y[T], S) > 0 && (S = y[T]);
    }
    return n(o(S, a(1, N)), o(C, N));
  }
}), bl = "std", CC = ["typed", "map", "sqrt", "variance"], wm = /* @__PURE__ */ q(bl, CC, (e) => {
  var {
    typed: r,
    map: t,
    sqrt: n,
    variance: a
  } = e;
  return r(bl, {
    // std([a, b, c, d, ...])
    "Array | Matrix": i,
    // std([a, b, c, d, ...], normalization)
    "Array | Matrix, string": i,
    // std([a, b, c, c, ...], dim)
    "Array | Matrix, number | BigNumber": i,
    // std([a, b, c, c, ...], dim, normalization)
    "Array | Matrix, number | BigNumber, string": i,
    // std(a, b, c, d, ...)
    "...": function(c) {
      return i(c);
    }
  });
  function i(o, c) {
    if (o.length === 0)
      throw new SyntaxError("Function std requires one or more parameters (0 provided)");
    try {
      var l = a.apply(null, arguments);
      return Cr(l) ? t(l, n) : n(l);
    } catch (s) {
      throw s instanceof TypeError && s.message.includes(" variance") ? new TypeError(s.message.replace(" variance", " std")) : s;
    }
  }
}), xl = "corr", MC = ["typed", "matrix", "mean", "sqrt", "sum", "add", "subtract", "multiply", "pow", "divide"], _C = /* @__PURE__ */ q(xl, MC, (e) => {
  var {
    typed: r,
    matrix: t,
    sqrt: n,
    sum: a,
    add: i,
    subtract: o,
    multiply: c,
    pow: l,
    divide: s
  } = e;
  return r(xl, {
    "Array, Array": function(v, p) {
      return u(v, p);
    },
    "Matrix, Matrix": function(v, p) {
      var d = u(v.toArray(), p.toArray());
      return Array.isArray(d) ? t(d) : d;
    }
  });
  function u(m, v) {
    var p = [];
    if (Array.isArray(m[0]) && Array.isArray(v[0])) {
      if (m.length !== v.length)
        throw new SyntaxError("Dimension mismatch. Array A and B must have the same length.");
      for (var d = 0; d < m.length; d++) {
        if (m[d].length !== v[d].length)
          throw new SyntaxError("Dimension mismatch. Array A and B must have the same number of elements.");
        p.push(f(m[d], v[d]));
      }
      return p;
    } else {
      if (m.length !== v.length)
        throw new SyntaxError("Dimension mismatch. Array A and B must have the same number of elements.");
      return f(m, v);
    }
  }
  function f(m, v) {
    var p = m.length, d = a(m), b = a(v), x = m.reduce((g, A, E) => i(g, c(A, v[E])), 0), D = a(m.map((g) => l(g, 2))), h = a(v.map((g) => l(g, 2))), w = o(c(p, x), c(d, b)), y = n(c(o(c(p, D), l(d, 2)), o(c(p, h), l(b, 2))));
    return s(w, y);
  }
}), wl = "combinations", FC = ["typed"], TC = /* @__PURE__ */ q(wl, FC, (e) => {
  var {
    typed: r
  } = e;
  return r(wl, {
    "number, number": xf,
    "BigNumber, BigNumber": function(n, a) {
      var i = n.constructor, o, c, l = n.minus(a), s = new i(1);
      if (!Dl(n) || !Dl(a))
        throw new TypeError("Positive integer value expected in function combinations");
      if (a.gt(n))
        throw new TypeError("k must be less than n in function combinations");
      if (o = s, a.lt(l))
        for (c = s; c.lte(l); c = c.plus(s))
          o = o.times(a.plus(c)).dividedBy(c);
      else
        for (c = s; c.lte(a); c = c.plus(s))
          o = o.times(l.plus(c)).dividedBy(c);
      return o;
    }
    // TODO: implement support for collection in combinations
  });
});
function Dl(e) {
  return e.isInteger() && e.gte(0);
}
var Nl = "combinationsWithRep", BC = ["typed"], OC = /* @__PURE__ */ q(Nl, BC, (e) => {
  var {
    typed: r
  } = e;
  return r(Nl, {
    "number, number": function(n, a) {
      if (!Ae(n) || n < 0)
        throw new TypeError("Positive integer value expected in function combinationsWithRep");
      if (!Ae(a) || a < 0)
        throw new TypeError("Positive integer value expected in function combinationsWithRep");
      if (n < 1)
        throw new TypeError("k must be less than or equal to n + k - 1");
      if (a < n - 1) {
        var i = Wr(n, n + a - 1);
        return i / Wr(1, a);
      }
      var o = Wr(a + 1, n + a - 1);
      return o / Wr(1, n - 1);
    },
    "BigNumber, BigNumber": function(n, a) {
      var i = n.constructor, o, c, l = new i(1), s = n.minus(l);
      if (!Al(n) || !Al(a))
        throw new TypeError("Positive integer value expected in function combinationsWithRep");
      if (n.lt(l))
        throw new TypeError("k must be less than or equal to n + k - 1 in function combinationsWithRep");
      if (o = l, a.lt(s))
        for (c = l; c.lte(s); c = c.plus(l))
          o = o.times(a.plus(c)).dividedBy(c);
      else
        for (c = l; c.lte(a); c = c.plus(l))
          o = o.times(s.plus(c)).dividedBy(c);
      return o;
    }
  });
});
function Al(e) {
  return e.isInteger() && e.gte(0);
}
var El = "gamma", $C = ["typed", "config", "multiplyScalar", "pow", "BigNumber", "Complex"], IC = /* @__PURE__ */ q(El, $C, (e) => {
  var {
    typed: r,
    config: t,
    multiplyScalar: n,
    pow: a,
    BigNumber: i,
    Complex: o
  } = e;
  function c(s) {
    if (s.im === 0)
      return Zn(s.re);
    if (s.re < 0.5) {
      var u = new o(1 - s.re, -s.im), f = new o(Math.PI * s.re, Math.PI * s.im);
      return new o(Math.PI).div(f.sin()).div(c(u));
    }
    s = new o(s.re - 1, s.im);
    for (var m = new o(Tt[0], 0), v = 1; v < Tt.length; ++v) {
      var p = new o(Tt[v], 0);
      m = m.add(p.div(s.add(v)));
    }
    var d = new o(s.re + Df + 0.5, s.im), b = Math.sqrt(2 * Math.PI), x = d.pow(s.add(0.5)), D = d.neg().exp();
    return m.mul(b).mul(x).mul(D);
  }
  return r(El, {
    number: Zn,
    Complex: c,
    BigNumber: function(u) {
      if (u.isInteger())
        return u.isNegative() || u.isZero() ? new i(1 / 0) : l(u.minus(1));
      if (!u.isFinite())
        return new i(u.isNegative() ? NaN : 1 / 0);
      throw new Error("Integer BigNumber expected");
    }
  });
  function l(s) {
    if (s < 8)
      return new i([1, 1, 2, 6, 24, 120, 720, 5040][s]);
    var u = t.precision + (Math.log(s.toNumber()) | 0), f = i.clone({
      precision: u
    });
    if (s % 2 === 1)
      return s.times(l(new i(s - 1)));
    for (var m = s, v = new f(s), p = s.toNumber(); m > 2; )
      m -= 2, p += m, v = v.times(p);
    return new i(v.toPrecision(i.precision));
  }
}), Sl = "lgamma", qC = ["Complex", "typed"], RC = /* @__PURE__ */ q(Sl, qC, (e) => {
  var {
    Complex: r,
    typed: t
  } = e, n = 7, a = 7, i = [-0.029550653594771242, 0.00641025641025641, -0.0019175269175269176, 8417508417508417e-19, -5952380952380953e-19, 7936507936507937e-19, -0.002777777777777778, 0.08333333333333333];
  return t(Sl, {
    number: Vn,
    Complex: o,
    BigNumber: function() {
      throw new Error("mathjs doesn't yet provide an implementation of the algorithm lgamma for BigNumber");
    }
  });
  function o(s) {
    var u = 6.283185307179586, f = 1.1447298858494002, m = 0.1;
    if (s.isNaN())
      return new r(NaN, NaN);
    if (s.im === 0)
      return new r(Vn(s.re), 0);
    if (s.re >= n || Math.abs(s.im) >= a)
      return c(s);
    if (s.re <= m) {
      var v = _v(u, s.im) * Math.floor(0.5 * s.re + 0.25), p = s.mul(Math.PI).sin().log(), d = o(new r(1 - s.re, -s.im));
      return new r(f, v).sub(p).sub(d);
    } else return s.im >= 0 ? l(s) : l(s.conjugate()).conjugate();
  }
  function c(s) {
    for (var u = s.sub(0.5).mul(s.log()).sub(s).add(Nf), f = new r(1, 0).div(s), m = f.div(s), v = i[0], p = i[1], d = 2 * m.re, b = m.re * m.re + m.im * m.im, x = 2; x < 8; x++) {
      var D = p;
      p = -b * v + i[x], v = d * v + D;
    }
    var h = f.mul(m.mul(v).add(p));
    return u.add(h);
  }
  function l(s) {
    var u = 0, f = 0, m = s;
    for (s = s.add(1); s.re <= n; ) {
      m = m.mul(s);
      var v = m.im < 0 ? 1 : 0;
      v !== 0 && f === 0 && u++, f = v, s = s.add(1);
    }
    return c(s).sub(m.log()).sub(new r(0, u * 2 * Math.PI * 1));
  }
}), Cl = "factorial", zC = ["typed", "gamma"], PC = /* @__PURE__ */ q(Cl, zC, (e) => {
  var {
    typed: r,
    gamma: t
  } = e;
  return r(Cl, {
    number: function(a) {
      if (a < 0)
        throw new Error("Value must be non-negative");
      return t(a + 1);
    },
    BigNumber: function(a) {
      if (a.isNegative())
        throw new Error("Value must be non-negative");
      return t(a.plus(1));
    },
    "Array | Matrix": r.referToSelf((n) => (a) => ze(a, n))
  });
}), Ml = "kldivergence", UC = ["typed", "matrix", "divide", "sum", "multiply", "map", "dotDivide", "log", "isNumeric"], LC = /* @__PURE__ */ q(Ml, UC, (e) => {
  var {
    typed: r,
    matrix: t,
    divide: n,
    sum: a,
    multiply: i,
    map: o,
    dotDivide: c,
    log: l,
    isNumeric: s
  } = e;
  return r(Ml, {
    "Array, Array": function(m, v) {
      return u(t(m), t(v));
    },
    "Matrix, Array": function(m, v) {
      return u(m, t(v));
    },
    "Array, Matrix": function(m, v) {
      return u(t(m), v);
    },
    "Matrix, Matrix": function(m, v) {
      return u(m, v);
    }
  });
  function u(f, m) {
    var v = m.size().length, p = f.size().length;
    if (v > 1)
      throw new Error("first object must be one dimensional");
    if (p > 1)
      throw new Error("second object must be one dimensional");
    if (v !== p)
      throw new Error("Length of two vectors must be equal");
    var d = a(f);
    if (d === 0)
      throw new Error("Sum of elements in first object must be non zero");
    var b = a(m);
    if (b === 0)
      throw new Error("Sum of elements in second object must be non zero");
    var x = n(f, a(f)), D = n(m, a(m)), h = a(i(x, o(c(x, D), (w) => l(w))));
    return s(h) ? h : Number.NaN;
  }
}), _l = "multinomial", kC = ["typed", "add", "divide", "multiply", "factorial", "isInteger", "isPositive"], HC = /* @__PURE__ */ q(_l, kC, (e) => {
  var {
    typed: r,
    add: t,
    divide: n,
    multiply: a,
    factorial: i,
    isInteger: o,
    isPositive: c
  } = e;
  return r(_l, {
    "Array | Matrix": function(s) {
      var u = 0, f = 1;
      return Jr(s, function(m) {
        if (!o(m) || !c(m))
          throw new TypeError("Positive integer value expected in function multinomial");
        u = t(u, m), f = a(f, i(m));
      }), n(i(u), f);
    }
  });
}), Fl = "permutations", GC = ["typed", "factorial"], ZC = /* @__PURE__ */ q(Fl, GC, (e) => {
  var {
    typed: r,
    factorial: t
  } = e;
  return r(Fl, {
    "number | BigNumber": t,
    "number, number": function(a, i) {
      if (!Ae(a) || a < 0)
        throw new TypeError("Positive integer value expected in function permutations");
      if (!Ae(i) || i < 0)
        throw new TypeError("Positive integer value expected in function permutations");
      if (i > a)
        throw new TypeError("second argument k must be less than or equal to first argument n");
      return Wr(a - i + 1, a);
    },
    "BigNumber, BigNumber": function(a, i) {
      var o, c;
      if (!Tl(a) || !Tl(i))
        throw new TypeError("Positive integer value expected in function permutations");
      if (i.gt(a))
        throw new TypeError("second argument k must be less than or equal to first argument n");
      var l = a.mul(0).add(1);
      for (o = l, c = a.minus(i).plus(1); c.lte(a); c = c.plus(1))
        o = o.times(c);
      return o;
    }
    // TODO: implement support for collection in permutations
  });
});
function Tl(e) {
  return e.isInteger() && e.gte(0);
}
var mi = { exports: {} };
mi.exports;
(function(e) {
  (function(r, t, n) {
    function a(l) {
      var s = this, u = c();
      s.next = function() {
        var f = 2091639 * s.s0 + s.c * 23283064365386963e-26;
        return s.s0 = s.s1, s.s1 = s.s2, s.s2 = f - (s.c = f | 0);
      }, s.c = 1, s.s0 = u(" "), s.s1 = u(" "), s.s2 = u(" "), s.s0 -= u(l), s.s0 < 0 && (s.s0 += 1), s.s1 -= u(l), s.s1 < 0 && (s.s1 += 1), s.s2 -= u(l), s.s2 < 0 && (s.s2 += 1), u = null;
    }
    function i(l, s) {
      return s.c = l.c, s.s0 = l.s0, s.s1 = l.s1, s.s2 = l.s2, s;
    }
    function o(l, s) {
      var u = new a(l), f = s && s.state, m = u.next;
      return m.int32 = function() {
        return u.next() * 4294967296 | 0;
      }, m.double = function() {
        return m() + (m() * 2097152 | 0) * 11102230246251565e-32;
      }, m.quick = m, f && (typeof f == "object" && i(f, u), m.state = function() {
        return i(u, {});
      }), m;
    }
    function c() {
      var l = 4022871197, s = function(u) {
        u = String(u);
        for (var f = 0; f < u.length; f++) {
          l += u.charCodeAt(f);
          var m = 0.02519603282416938 * l;
          l = m >>> 0, m -= l, m *= l, l = m >>> 0, m -= l, l += m * 4294967296;
        }
        return (l >>> 0) * 23283064365386963e-26;
      };
      return s;
    }
    t && t.exports ? t.exports = o : this.alea = o;
  })(
    bt,
    e
  );
})(mi);
var VC = mi.exports, vi = { exports: {} };
vi.exports;
(function(e) {
  (function(r, t, n) {
    function a(c) {
      var l = this, s = "";
      l.x = 0, l.y = 0, l.z = 0, l.w = 0, l.next = function() {
        var f = l.x ^ l.x << 11;
        return l.x = l.y, l.y = l.z, l.z = l.w, l.w ^= l.w >>> 19 ^ f ^ f >>> 8;
      }, c === (c | 0) ? l.x = c : s += c;
      for (var u = 0; u < s.length + 64; u++)
        l.x ^= s.charCodeAt(u) | 0, l.next();
    }
    function i(c, l) {
      return l.x = c.x, l.y = c.y, l.z = c.z, l.w = c.w, l;
    }
    function o(c, l) {
      var s = new a(c), u = l && l.state, f = function() {
        return (s.next() >>> 0) / 4294967296;
      };
      return f.double = function() {
        do
          var m = s.next() >>> 11, v = (s.next() >>> 0) / 4294967296, p = (m + v) / (1 << 21);
        while (p === 0);
        return p;
      }, f.int32 = s.next, f.quick = f, u && (typeof u == "object" && i(u, s), f.state = function() {
        return i(s, {});
      }), f;
    }
    t && t.exports ? t.exports = o : this.xor128 = o;
  })(
    bt,
    e
  );
})(vi);
var WC = vi.exports, pi = { exports: {} };
pi.exports;
(function(e) {
  (function(r, t, n) {
    function a(c) {
      var l = this, s = "";
      l.next = function() {
        var f = l.x ^ l.x >>> 2;
        return l.x = l.y, l.y = l.z, l.z = l.w, l.w = l.v, (l.d = l.d + 362437 | 0) + (l.v = l.v ^ l.v << 4 ^ (f ^ f << 1)) | 0;
      }, l.x = 0, l.y = 0, l.z = 0, l.w = 0, l.v = 0, c === (c | 0) ? l.x = c : s += c;
      for (var u = 0; u < s.length + 64; u++)
        l.x ^= s.charCodeAt(u) | 0, u == s.length && (l.d = l.x << 10 ^ l.x >>> 4), l.next();
    }
    function i(c, l) {
      return l.x = c.x, l.y = c.y, l.z = c.z, l.w = c.w, l.v = c.v, l.d = c.d, l;
    }
    function o(c, l) {
      var s = new a(c), u = l && l.state, f = function() {
        return (s.next() >>> 0) / 4294967296;
      };
      return f.double = function() {
        do
          var m = s.next() >>> 11, v = (s.next() >>> 0) / 4294967296, p = (m + v) / (1 << 21);
        while (p === 0);
        return p;
      }, f.int32 = s.next, f.quick = f, u && (typeof u == "object" && i(u, s), f.state = function() {
        return i(s, {});
      }), f;
    }
    t && t.exports ? t.exports = o : this.xorwow = o;
  })(
    bt,
    e
  );
})(pi);
var YC = pi.exports, di = { exports: {} };
di.exports;
(function(e) {
  (function(r, t, n) {
    function a(c) {
      var l = this;
      l.next = function() {
        var u = l.x, f = l.i, m, v;
        return m = u[f], m ^= m >>> 7, v = m ^ m << 24, m = u[f + 1 & 7], v ^= m ^ m >>> 10, m = u[f + 3 & 7], v ^= m ^ m >>> 3, m = u[f + 4 & 7], v ^= m ^ m << 7, m = u[f + 7 & 7], m = m ^ m << 13, v ^= m ^ m << 9, u[f] = v, l.i = f + 1 & 7, v;
      };
      function s(u, f) {
        var m, v = [];
        if (f === (f | 0))
          v[0] = f;
        else
          for (f = "" + f, m = 0; m < f.length; ++m)
            v[m & 7] = v[m & 7] << 15 ^ f.charCodeAt(m) + v[m + 1 & 7] << 13;
        for (; v.length < 8; ) v.push(0);
        for (m = 0; m < 8 && v[m] === 0; ++m) ;
        for (m == 8 ? v[7] = -1 : v[m], u.x = v, u.i = 0, m = 256; m > 0; --m)
          u.next();
      }
      s(l, c);
    }
    function i(c, l) {
      return l.x = c.x.slice(), l.i = c.i, l;
    }
    function o(c, l) {
      c == null && (c = +/* @__PURE__ */ new Date());
      var s = new a(c), u = l && l.state, f = function() {
        return (s.next() >>> 0) / 4294967296;
      };
      return f.double = function() {
        do
          var m = s.next() >>> 11, v = (s.next() >>> 0) / 4294967296, p = (m + v) / (1 << 21);
        while (p === 0);
        return p;
      }, f.int32 = s.next, f.quick = f, u && (u.x && i(u, s), f.state = function() {
        return i(s, {});
      }), f;
    }
    t && t.exports ? t.exports = o : this.xorshift7 = o;
  })(
    bt,
    e
  );
})(di);
var XC = di.exports, hi = { exports: {} };
hi.exports;
(function(e) {
  (function(r, t, n) {
    function a(c) {
      var l = this;
      l.next = function() {
        var u = l.w, f = l.X, m = l.i, v, p;
        return l.w = u = u + 1640531527 | 0, p = f[m + 34 & 127], v = f[m = m + 1 & 127], p ^= p << 13, v ^= v << 17, p ^= p >>> 15, v ^= v >>> 12, p = f[m] = p ^ v, l.i = m, p + (u ^ u >>> 16) | 0;
      };
      function s(u, f) {
        var m, v, p, d, b, x = [], D = 128;
        for (f === (f | 0) ? (v = f, f = null) : (f = f + "\0", v = 0, D = Math.max(D, f.length)), p = 0, d = -32; d < D; ++d)
          f && (v ^= f.charCodeAt((d + 32) % f.length)), d === 0 && (b = v), v ^= v << 10, v ^= v >>> 15, v ^= v << 4, v ^= v >>> 13, d >= 0 && (b = b + 1640531527 | 0, m = x[d & 127] ^= v + b, p = m == 0 ? p + 1 : 0);
        for (p >= 128 && (x[(f && f.length || 0) & 127] = -1), p = 127, d = 4 * 128; d > 0; --d)
          v = x[p + 34 & 127], m = x[p = p + 1 & 127], v ^= v << 13, m ^= m << 17, v ^= v >>> 15, m ^= m >>> 12, x[p] = v ^ m;
        u.w = b, u.X = x, u.i = p;
      }
      s(l, c);
    }
    function i(c, l) {
      return l.i = c.i, l.w = c.w, l.X = c.X.slice(), l;
    }
    function o(c, l) {
      c == null && (c = +/* @__PURE__ */ new Date());
      var s = new a(c), u = l && l.state, f = function() {
        return (s.next() >>> 0) / 4294967296;
      };
      return f.double = function() {
        do
          var m = s.next() >>> 11, v = (s.next() >>> 0) / 4294967296, p = (m + v) / (1 << 21);
        while (p === 0);
        return p;
      }, f.int32 = s.next, f.quick = f, u && (u.X && i(u, s), f.state = function() {
        return i(s, {});
      }), f;
    }
    t && t.exports ? t.exports = o : this.xor4096 = o;
  })(
    bt,
    // window object or global
    e
  );
})(hi);
var JC = hi.exports, gi = { exports: {} };
gi.exports;
(function(e) {
  (function(r, t, n) {
    function a(c) {
      var l = this, s = "";
      l.next = function() {
        var f = l.b, m = l.c, v = l.d, p = l.a;
        return f = f << 25 ^ f >>> 7 ^ m, m = m - v | 0, v = v << 24 ^ v >>> 8 ^ p, p = p - f | 0, l.b = f = f << 20 ^ f >>> 12 ^ m, l.c = m = m - v | 0, l.d = v << 16 ^ m >>> 16 ^ p, l.a = p - f | 0;
      }, l.a = 0, l.b = 0, l.c = -1640531527, l.d = 1367130551, c === Math.floor(c) ? (l.a = c / 4294967296 | 0, l.b = c | 0) : s += c;
      for (var u = 0; u < s.length + 20; u++)
        l.b ^= s.charCodeAt(u) | 0, l.next();
    }
    function i(c, l) {
      return l.a = c.a, l.b = c.b, l.c = c.c, l.d = c.d, l;
    }
    function o(c, l) {
      var s = new a(c), u = l && l.state, f = function() {
        return (s.next() >>> 0) / 4294967296;
      };
      return f.double = function() {
        do
          var m = s.next() >>> 11, v = (s.next() >>> 0) / 4294967296, p = (m + v) / (1 << 21);
        while (p === 0);
        return p;
      }, f.int32 = s.next, f.quick = f, u && (typeof u == "object" && i(u, s), f.state = function() {
        return i(s, {});
      }), f;
    }
    t && t.exports ? t.exports = o : this.tychei = o;
  })(
    bt,
    e
  );
})(gi);
var QC = gi.exports, Dm = { exports: {} };
const KC = {}, jC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KC
}, Symbol.toStringTag, { value: "Module" })), eM = /* @__PURE__ */ Zy(jC);
(function(e) {
  (function(r, t, n) {
    var a = 256, i = 6, o = 52, c = "random", l = n.pow(a, i), s = n.pow(2, o), u = s * 2, f = a - 1, m;
    function v(w, y, g) {
      var A = [];
      y = y == !0 ? { entropy: !0 } : y || {};
      var E = x(b(
        y.entropy ? [w, h(t)] : w ?? D(),
        3
      ), A), N = new p(A), S = function() {
        for (var C = N.g(i), T = l, O = 0; C < s; )
          C = (C + O) * a, T *= a, O = N.g(1);
        for (; C >= u; )
          C /= 2, T /= 2, O >>>= 1;
        return (C + O) / T;
      };
      return S.int32 = function() {
        return N.g(4) | 0;
      }, S.quick = function() {
        return N.g(4) / 4294967296;
      }, S.double = S, x(h(N.S), t), (y.pass || g || function(C, T, O, I) {
        return I && (I.S && d(I, N), C.state = function() {
          return d(N, {});
        }), O ? (n[c] = C, T) : C;
      })(
        S,
        E,
        "global" in y ? y.global : this == n,
        y.state
      );
    }
    function p(w) {
      var y, g = w.length, A = this, E = 0, N = A.i = A.j = 0, S = A.S = [];
      for (g || (w = [g++]); E < a; )
        S[E] = E++;
      for (E = 0; E < a; E++)
        S[E] = S[N = f & N + w[E % g] + (y = S[E])], S[N] = y;
      (A.g = function(C) {
        for (var T, O = 0, I = A.i, $ = A.j, F = A.S; C--; )
          T = F[I = f & I + 1], O = O * a + F[f & (F[I] = F[$ = f & $ + T]) + (F[$] = T)];
        return A.i = I, A.j = $, O;
      })(a);
    }
    function d(w, y) {
      return y.i = w.i, y.j = w.j, y.S = w.S.slice(), y;
    }
    function b(w, y) {
      var g = [], A = typeof w, E;
      if (y && A == "object")
        for (E in w)
          try {
            g.push(b(w[E], y - 1));
          } catch {
          }
      return g.length ? g : A == "string" ? w : w + "\0";
    }
    function x(w, y) {
      for (var g = w + "", A, E = 0; E < g.length; )
        y[f & E] = f & (A ^= y[f & E] * 19) + g.charCodeAt(E++);
      return h(y);
    }
    function D() {
      try {
        var w;
        return m && (w = m.randomBytes) ? w = w(a) : (w = new Uint8Array(a), (r.crypto || r.msCrypto).getRandomValues(w)), h(w);
      } catch {
        var y = r.navigator, g = y && y.plugins;
        return [+/* @__PURE__ */ new Date(), r, g, r.screen, h(t)];
      }
    }
    function h(w) {
      return String.fromCharCode.apply(0, w);
    }
    if (x(n.random(), t), e.exports) {
      e.exports = v;
      try {
        m = eM;
      } catch {
      }
    } else
      n["seed" + c] = v;
  })(
    // global: `self` in browsers (including strict mode and web workers),
    // otherwise `this` in Node and other environments
    typeof self < "u" ? self : bt,
    [],
    // pool: entropy pool starts empty
    Math
    // math: package containing random, pow, and seedrandom
  );
})(Dm);
var rM = Dm.exports, tM = VC, nM = WC, aM = YC, iM = XC, oM = JC, sM = QC, xt = rM;
xt.alea = tM;
xt.xor128 = nM;
xt.xorwow = aM;
xt.xorshift7 = iM;
xt.xor4096 = oM;
xt.tychei = sM;
var uM = xt;
const Nm = /* @__PURE__ */ va(uM);
var lM = /* @__PURE__ */ Nm(Date.now());
function Rt(e) {
  var r;
  function t(a) {
    r = a === null ? lM : Nm(String(a));
  }
  t(e);
  function n() {
    return r();
  }
  return n;
}
var Bl = "pickRandom", cM = ["typed", "config", "?on"], fM = /* @__PURE__ */ q(Bl, cM, (e) => {
  var {
    typed: r,
    config: t,
    on: n
  } = e, a = Rt(t.randomSeed);
  return n && n("config", function(o, c) {
    o.randomSeed !== c.randomSeed && (a = Rt(o.randomSeed));
  }), r(Bl, {
    "Array | Matrix": function(c) {
      return i(c, {});
    },
    "Array | Matrix, Object": function(c, l) {
      return i(c, l);
    },
    "Array | Matrix, number": function(c, l) {
      return i(c, {
        number: l
      });
    },
    "Array | Matrix, Array | Matrix": function(c, l) {
      return i(c, {
        weights: l
      });
    },
    "Array | Matrix, Array | Matrix, number": function(c, l, s) {
      return i(c, {
        number: s,
        weights: l
      });
    },
    "Array | Matrix, number, Array | Matrix": function(c, l, s) {
      return i(c, {
        number: l,
        weights: s
      });
    }
  });
  function i(o, c) {
    var {
      number: l,
      weights: s,
      elementWise: u = !0
    } = c, f = typeof l > "u";
    f && (l = 1);
    var m = Ce(o) ? o.create : Ce(s) ? s.create : null;
    o = o.valueOf(), s && (s = s.valueOf()), u === !0 && (o = Ge(o), s = Ge(s));
    var v = 0;
    if (typeof s < "u") {
      if (s.length !== o.length)
        throw new Error("Weights must have the same length as possibles");
      for (var p = 0, d = s.length; p < d; p++) {
        if (!Oe(s[p]) || s[p] < 0)
          throw new Error("Weights must be an array of positive numbers");
        v += s[p];
      }
    }
    for (var b = o.length, x = [], D; x.length < l; ) {
      if (typeof s > "u")
        D = o[Math.floor(a() * b)];
      else
        for (var h = a() * v, w = 0, y = o.length; w < y; w++)
          if (h -= s[w], h < 0) {
            D = o[w];
            break;
          }
      x.push(D);
    }
    return f ? x[0] : m ? m(x) : x;
  }
});
function yi(e, r) {
  var t = [];
  if (e = e.slice(0), e.length > 1)
    for (var n = 0, a = e.shift(); n < a; n++)
      t.push(yi(e, r));
  else
    for (var i = 0, o = e.shift(); i < o; i++)
      t.push(r());
  return t;
}
var Ol = "random", mM = ["typed", "config", "?on"], vM = /* @__PURE__ */ q(Ol, mM, (e) => {
  var {
    typed: r,
    config: t,
    on: n
  } = e, a = Rt(t.randomSeed);
  return n && n("config", function(c, l) {
    c.randomSeed !== l.randomSeed && (a = Rt(c.randomSeed));
  }), r(Ol, {
    "": () => o(0, 1),
    number: (c) => o(0, c),
    "number, number": (c, l) => o(c, l),
    "Array | Matrix": (c) => i(c, 0, 1),
    "Array | Matrix, number": (c, l) => i(c, 0, l),
    "Array | Matrix, number, number": (c, l, s) => i(c, l, s)
  });
  function i(c, l, s) {
    var u = yi(c.valueOf(), () => o(l, s));
    return Ce(c) ? c.create(u, "number") : u;
  }
  function o(c, l) {
    return c + a() * (l - c);
  }
}), $l = "randomInt", pM = ["typed", "config", "?on"], dM = /* @__PURE__ */ q($l, pM, (e) => {
  var {
    typed: r,
    config: t,
    on: n
  } = e, a = Rt(t.randomSeed);
  return n && n("config", function(c, l) {
    c.randomSeed !== l.randomSeed && (a = Rt(c.randomSeed));
  }), r($l, {
    "": () => o(0, 1),
    number: (c) => o(0, c),
    "number, number": (c, l) => o(c, l),
    "Array | Matrix": (c) => i(c, 0, 1),
    "Array | Matrix, number": (c, l) => i(c, 0, l),
    "Array | Matrix, number, number": (c, l, s) => i(c, l, s)
  });
  function i(c, l, s) {
    var u = yi(c.valueOf(), () => o(l, s));
    return Ce(c) ? c.create(u, "number") : u;
  }
  function o(c, l) {
    return Math.floor(c + a() * (l - c));
  }
}), Il = "stirlingS2", hM = ["typed", "addScalar", "subtractScalar", "multiplyScalar", "divideScalar", "pow", "factorial", "combinations", "isNegative", "isInteger", "number", "?bignumber", "larger"], gM = /* @__PURE__ */ q(Il, hM, (e) => {
  var {
    typed: r,
    addScalar: t,
    subtractScalar: n,
    multiplyScalar: a,
    divideScalar: i,
    pow: o,
    factorial: c,
    combinations: l,
    isNegative: s,
    isInteger: u,
    number: f,
    bignumber: m,
    larger: v
  } = e, p = [], d = [];
  return r(Il, {
    "number | BigNumber, number | BigNumber": function(x, D) {
      if (!u(x) || s(x) || !u(D) || s(D))
        throw new TypeError("Non-negative integer value expected in function stirlingS2");
      if (v(D, x))
        throw new TypeError("k must be less than or equal to n in function stirlingS2");
      var h = !(Oe(x) && Oe(D)), w = h ? d : p, y = h ? m : f, g = f(x), A = f(D);
      if (w[g] && w[g].length > A)
        return w[g][A];
      for (var E = 0; E <= g; ++E)
        if (w[E] || (w[E] = [y(E === 0 ? 1 : 0)]), E !== 0)
          for (var N = w[E], S = w[E - 1], C = N.length; C <= E && C <= A; ++C)
            C === E ? N[C] = 1 : N[C] = t(a(y(C), S[C]), S[C - 1]);
      return w[g][A];
    }
  });
}), ql = "bellNumbers", yM = ["typed", "addScalar", "isNegative", "isInteger", "stirlingS2"], bM = /* @__PURE__ */ q(ql, yM, (e) => {
  var {
    typed: r,
    addScalar: t,
    isNegative: n,
    isInteger: a,
    stirlingS2: i
  } = e;
  return r(ql, {
    "number | BigNumber": function(c) {
      if (!a(c) || n(c))
        throw new TypeError("Non-negative integer value expected in function bellNumbers");
      for (var l = 0, s = 0; s <= c; s++)
        l = t(l, i(c, s));
      return l;
    }
  });
}), Rl = "catalan", xM = ["typed", "addScalar", "divideScalar", "multiplyScalar", "combinations", "isNegative", "isInteger"], wM = /* @__PURE__ */ q(Rl, xM, (e) => {
  var {
    typed: r,
    addScalar: t,
    divideScalar: n,
    multiplyScalar: a,
    combinations: i,
    isNegative: o,
    isInteger: c
  } = e;
  return r(Rl, {
    "number | BigNumber": function(s) {
      if (!c(s) || o(s))
        throw new TypeError("Non-negative integer value expected in function catalan");
      return n(i(a(s, 2), s), t(s, 1));
    }
  });
}), zl = "composition", DM = ["typed", "addScalar", "combinations", "isNegative", "isPositive", "isInteger", "larger"], NM = /* @__PURE__ */ q(zl, DM, (e) => {
  var {
    typed: r,
    addScalar: t,
    combinations: n,
    isPositive: a,
    isNegative: i,
    isInteger: o,
    larger: c
  } = e;
  return r(zl, {
    "number | BigNumber, number | BigNumber": function(s, u) {
      if (!o(s) || !a(s) || !o(u) || !a(u))
        throw new TypeError("Positive integer value expected in function composition");
      if (c(u, s))
        throw new TypeError("k must be less than or equal to n in function composition");
      return n(t(s, -1), t(u, -1));
    }
  });
}), Pl = "leafCount", AM = ["parse", "typed"], EM = /* @__PURE__ */ q(Pl, AM, (e) => {
  var {
    parse: r,
    typed: t
  } = e;
  function n(a) {
    var i = 0;
    return a.forEach((o) => {
      i += n(o);
    }), i || 1;
  }
  return t(Pl, {
    Node: function(i) {
      return n(i);
    }
  });
});
function Ul(e) {
  return ke(e) || rr(e) && e.isUnary() && ke(e.args[0]);
}
function ta(e) {
  return !!(ke(e) || (Yr(e) || rr(e)) && e.args.every(ta) || Ur(e) && ta(e.content));
}
function Ll(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    r && (n = n.filter(function(a) {
      return Object.getOwnPropertyDescriptor(e, a).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function Sa(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {};
    r % 2 ? Ll(Object(t), !0).forEach(function(n) {
      ar(e, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Ll(Object(t)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return e;
}
var SM = "simplifyUtil", CM = ["FunctionNode", "OperatorNode", "SymbolNode"], bi = /* @__PURE__ */ q(SM, CM, (e) => {
  var {
    FunctionNode: r,
    OperatorNode: t,
    SymbolNode: n
  } = e, a = !0, i = !1, o = "defaultF", c = {
    /*      */
    add: {
      trivial: a,
      total: a,
      commutative: a,
      associative: a
    },
    /**/
    unaryPlus: {
      trivial: a,
      total: a,
      commutative: a,
      associative: a
    },
    /* */
    subtract: {
      trivial: i,
      total: a,
      commutative: i,
      associative: i
    },
    /* */
    multiply: {
      trivial: a,
      total: a,
      commutative: a,
      associative: a
    },
    /*   */
    divide: {
      trivial: i,
      total: a,
      commutative: i,
      associative: i
    },
    /*    */
    paren: {
      trivial: a,
      total: a,
      commutative: a,
      associative: i
    },
    /* */
    defaultF: {
      trivial: i,
      total: a,
      commutative: i,
      associative: i
    }
  }, l = {
    divide: {
      total: i
    },
    log: {
      total: i
    }
  }, s = {
    subtract: {
      total: i
    },
    abs: {
      trivial: a
    },
    log: {
      total: a
    }
  };
  function u(h, w) {
    var y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : c, g = o;
    if (typeof h == "string" ? g = h : rr(h) ? g = h.fn.toString() : Yr(h) ? g = h.name : Ur(h) && (g = "paren"), De(y, g)) {
      var A = y[g];
      if (De(A, w))
        return A[w];
      if (De(c, g))
        return c[g][w];
    }
    if (De(y, o)) {
      var E = y[o];
      return De(E, w) ? E[w] : c[o][w];
    }
    if (De(c, g)) {
      var N = c[g];
      if (De(N, w))
        return N[w];
    }
    return c[o][w];
  }
  function f(h) {
    var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : c;
    return u(h, "commutative", w);
  }
  function m(h) {
    var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : c;
    return u(h, "associative", w);
  }
  function v(h, w) {
    var y = Sa({}, h);
    for (var g in w)
      De(h, g) ? y[g] = Sa(Sa({}, w[g]), h[g]) : y[g] = w[g];
    return y;
  }
  function p(h, w) {
    if (!h.args || h.args.length === 0)
      return h;
    h.args = d(h, w);
    for (var y = 0; y < h.args.length; y++)
      p(h.args[y], w);
  }
  function d(h, w) {
    var y, g = [], A = function(N) {
      for (var S = 0; S < N.args.length; S++) {
        var C = N.args[S];
        rr(C) && y === C.op ? A(C) : g.push(C);
      }
    };
    return m(h, w) ? (y = h.op, A(h), g) : h.args;
  }
  function b(h, w) {
    if (!(!h.args || h.args.length === 0)) {
      for (var y = D(h), g = h.args.length, A = 0; A < g; A++)
        b(h.args[A], w);
      if (g > 2 && m(h, w)) {
        for (var E = h.args.pop(); h.args.length > 0; )
          E = y([h.args.pop(), E]);
        h.args = E.args;
      }
    }
  }
  function x(h, w) {
    if (!(!h.args || h.args.length === 0)) {
      for (var y = D(h), g = h.args.length, A = 0; A < g; A++)
        x(h.args[A], w);
      if (g > 2 && m(h, w)) {
        for (var E = h.args.shift(); h.args.length > 0; )
          E = y([E, h.args.shift()]);
        h.args = E.args;
      }
    }
  }
  function D(h) {
    return rr(h) ? function(w) {
      try {
        return new t(h.op, h.fn, w, h.implicit);
      } catch (y) {
        return console.error(y), [];
      }
    } : function(w) {
      return new r(new n(h.name), w);
    };
  }
  return {
    createMakeNodeFunction: D,
    hasProperty: u,
    isCommutative: f,
    isAssociative: m,
    mergeContext: v,
    flatten: p,
    allChildren: d,
    unflattenr: b,
    unflattenl: x,
    defaultContext: c,
    realContext: l,
    positiveContext: s
  };
}), MM = "simplify", _M = ["config", "typed", "parse", "add", "subtract", "multiply", "divide", "pow", "isZero", "equal", "resolve", "simplifyConstant", "simplifyCore", "?fraction", "?bignumber", "mathWithTransform", "matrix", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], FM = /* @__PURE__ */ q(MM, _M, (e) => {
  var {
    config: r,
    typed: t,
    parse: n,
    add: a,
    subtract: i,
    multiply: o,
    divide: c,
    pow: l,
    isZero: s,
    equal: u,
    resolve: f,
    simplifyConstant: m,
    simplifyCore: v,
    fraction: p,
    bignumber: d,
    mathWithTransform: b,
    matrix: x,
    AccessorNode: D,
    ArrayNode: h,
    ConstantNode: w,
    FunctionNode: y,
    IndexNode: g,
    ObjectNode: A,
    OperatorNode: E,
    ParenthesisNode: N,
    SymbolNode: S
  } = e, {
    hasProperty: C,
    isCommutative: T,
    isAssociative: O,
    mergeContext: I,
    flatten: $,
    unflattenr: F,
    unflattenl: _,
    createMakeNodeFunction: L,
    defaultContext: B,
    realContext: W,
    positiveContext: Q
  } = bi({
    FunctionNode: y,
    OperatorNode: E,
    SymbolNode: S
  });
  t.addConversion({
    from: "Object",
    to: "Map",
    convert: _t
  });
  var Z = t("simplify", {
    Node: j,
    "Node, Map": (k, V) => j(k, !1, V),
    "Node, Map, Object": (k, V, X) => j(k, !1, V, X),
    "Node, Array": j,
    "Node, Array, Map": j,
    "Node, Array, Map, Object": j
  });
  t.removeConversion({
    from: "Object",
    to: "Map",
    convert: _t
  }), Z.defaultContext = B, Z.realContext = W, Z.positiveContext = Q;
  function z(k) {
    return k.transform(function(V, X, fe) {
      return Ur(V) ? z(V.content) : V;
    });
  }
  var J = {
    true: !0,
    false: !0,
    e: !0,
    i: !0,
    Infinity: !0,
    LN2: !0,
    LN10: !0,
    LOG2E: !0,
    LOG10E: !0,
    NaN: !0,
    phi: !0,
    pi: !0,
    SQRT1_2: !0,
    SQRT2: !0,
    tau: !0
    // null: false,
    // undefined: false,
    // version: false,
  };
  Z.rules = [
    v,
    // { l: 'n+0', r: 'n' },     // simplifyCore
    // { l: 'n^0', r: '1' },     // simplifyCore
    // { l: '0*n', r: '0' },     // simplifyCore
    // { l: 'n/n', r: '1'},      // simplifyCore
    // { l: 'n^1', r: 'n' },     // simplifyCore
    // { l: '+n1', r:'n1' },     // simplifyCore
    // { l: 'n--n1', r:'n+n1' }, // simplifyCore
    {
      l: "log(e)",
      r: "1"
    },
    // temporary rules
    // Note initially we tend constants to the right because like-term
    // collection prefers the left, and we would rather collect nonconstants
    {
      s: "n-n1 -> n+-n1",
      // temporarily replace 'subtract' so we can further flatten the 'add' operator
      assuming: {
        subtract: {
          total: !0
        }
      }
    },
    {
      s: "n-n -> 0",
      // partial alternative when we can't always subtract
      assuming: {
        subtract: {
          total: !1
        }
      }
    },
    {
      s: "-(cl*v) -> v * (-cl)",
      // make non-constant terms positive
      assuming: {
        multiply: {
          commutative: !0
        },
        subtract: {
          total: !0
        }
      }
    },
    {
      s: "-(cl*v) -> (-cl) * v",
      // non-commutative version, part 1
      assuming: {
        multiply: {
          commutative: !1
        },
        subtract: {
          total: !0
        }
      }
    },
    {
      s: "-(v*cl) -> v * (-cl)",
      // non-commutative version, part 2
      assuming: {
        multiply: {
          commutative: !1
        },
        subtract: {
          total: !0
        }
      }
    },
    {
      l: "-(n1/n2)",
      r: "-n1/n2"
    },
    {
      l: "-v",
      r: "v * (-1)"
    },
    // finish making non-constant terms positive
    {
      l: "(n1 + n2)*(-1)",
      r: "n1*(-1) + n2*(-1)",
      repeat: !0
    },
    // expand negations to achieve as much sign cancellation as possible
    {
      l: "n/n1^n2",
      r: "n*n1^-n2"
    },
    // temporarily replace 'divide' so we can further flatten the 'multiply' operator
    {
      l: "n/n1",
      r: "n*n1^-1"
    },
    {
      s: "(n1*n2)^n3 -> n1^n3 * n2^n3",
      assuming: {
        multiply: {
          commutative: !0
        }
      }
    },
    {
      s: "(n1*n2)^(-1) -> n2^(-1) * n1^(-1)",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    // expand nested exponentiation
    {
      s: "(n ^ n1) ^ n2 -> n ^ (n1 * n2)",
      assuming: {
        divide: {
          total: !0
        }
      }
      // 1/(1/n) = n needs 1/n to exist
    },
    // collect like factors; into a sum, only do this for nonconstants
    {
      l: " vd   * ( vd   * n1 + n2)",
      r: "vd^2       * n1 +  vd   * n2"
    },
    {
      s: " vd   * (vd^n4 * n1 + n2)   ->  vd^(1+n4)  * n1 +  vd   * n2",
      assuming: {
        divide: {
          total: !0
        }
      }
      // v*1/v = v^(1+-1) needs 1/v
    },
    {
      s: "vd^n3 * ( vd   * n1 + n2)   ->  vd^(n3+1)  * n1 + vd^n3 * n2",
      assuming: {
        divide: {
          total: !0
        }
      }
    },
    {
      s: "vd^n3 * (vd^n4 * n1 + n2)   ->  vd^(n3+n4) * n1 + vd^n3 * n2",
      assuming: {
        divide: {
          total: !0
        }
      }
    },
    {
      l: "n*n",
      r: "n^2"
    },
    {
      s: "n * n^n1 -> n^(n1+1)",
      assuming: {
        divide: {
          total: !0
        }
      }
      // n*1/n = n^(-1+1) needs 1/n
    },
    {
      s: "n^n1 * n^n2 -> n^(n1+n2)",
      assuming: {
        divide: {
          total: !0
        }
      }
      // ditto for n^2*1/n^2
    },
    // Unfortunately, to deal with more complicated cancellations, it
    // becomes necessary to simplify constants twice per pass. It's not
    // terribly expensive compared to matching rules, so this should not
    // pose a performance problem.
    m,
    // First: before collecting like terms
    // collect like terms
    {
      s: "n+n -> 2*n",
      assuming: {
        add: {
          total: !0
        }
      }
      // 2 = 1 + 1 needs to exist
    },
    {
      l: "n+-n",
      r: "0"
    },
    {
      l: "vd*n + vd",
      r: "vd*(n+1)"
    },
    // NOTE: leftmost position is special:
    {
      l: "n3*n1 + n3*n2",
      r: "n3*(n1+n2)"
    },
    // All sub-monomials tried there.
    {
      l: "n3^(-n4)*n1 +   n3  * n2",
      r: "n3^(-n4)*(n1 + n3^(n4+1) *n2)"
    },
    {
      l: "n3^(-n4)*n1 + n3^n5 * n2",
      r: "n3^(-n4)*(n1 + n3^(n4+n5)*n2)"
    },
    // noncommutative additional cases (term collection & factoring)
    {
      s: "n*vd + vd -> (n+1)*vd",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    {
      s: "vd + n*vd -> (1+n)*vd",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    {
      s: "n1*n3 + n2*n3 -> (n1+n2)*n3",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    {
      s: "n^n1 * n -> n^(n1+1)",
      assuming: {
        divide: {
          total: !0
        },
        multiply: {
          commutative: !1
        }
      }
    },
    {
      s: "n1*n3^(-n4) + n2 * n3    -> (n1 + n2*n3^(n4 +  1))*n3^(-n4)",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    {
      s: "n1*n3^(-n4) + n2 * n3^n5 -> (n1 + n2*n3^(n4 + n5))*n3^(-n4)",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    {
      l: "n*cd + cd",
      r: "(n+1)*cd"
    },
    {
      s: "cd*n + cd -> cd*(n+1)",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    {
      s: "cd + cd*n -> cd*(1+n)",
      assuming: {
        multiply: {
          commutative: !1
        }
      }
    },
    m,
    // Second: before returning expressions to "standard form"
    // make factors positive (and undo 'make non-constant terms positive')
    {
      s: "(-n)*n1 -> -(n*n1)",
      assuming: {
        subtract: {
          total: !0
        }
      }
    },
    {
      s: "n1*(-n) -> -(n1*n)",
      // in case * non-commutative
      assuming: {
        subtract: {
          total: !0
        },
        multiply: {
          commutative: !1
        }
      }
    },
    // final ordering of constants
    {
      s: "ce+ve -> ve+ce",
      assuming: {
        add: {
          commutative: !0
        }
      },
      imposeContext: {
        add: {
          commutative: !1
        }
      }
    },
    {
      s: "vd*cd -> cd*vd",
      assuming: {
        multiply: {
          commutative: !0
        }
      },
      imposeContext: {
        multiply: {
          commutative: !1
        }
      }
    },
    // undo temporary rules
    // { l: '(-1) * n', r: '-n' }, // #811 added test which proved this is redundant
    {
      l: "n+-n1",
      r: "n-n1"
    },
    // undo replace 'subtract'
    {
      l: "n+-(n1)",
      r: "n-(n1)"
    },
    {
      s: "n*(n1^-1) -> n/n1",
      // undo replace 'divide'; for * commutative
      assuming: {
        multiply: {
          commutative: !0
        }
      }
      // o.w. / not conventional
    },
    {
      s: "n*n1^-n2 -> n/n1^n2",
      assuming: {
        multiply: {
          commutative: !0
        }
      }
      // o.w. / not conventional
    },
    {
      s: "n^-1 -> 1/n",
      assuming: {
        multiply: {
          commutative: !0
        }
      }
      // o.w. / not conventional
    },
    {
      l: "n^1",
      r: "n"
    },
    // can be produced by power cancellation
    {
      s: "n*(n1/n2) -> (n*n1)/n2",
      // '*' before '/'
      assuming: {
        multiply: {
          associative: !0
        }
      }
    },
    {
      s: "n-(n1+n2) -> n-n1-n2",
      // '-' before '+'
      assuming: {
        addition: {
          associative: !0,
          commutative: !0
        }
      }
    },
    // { l: '(n1/n2)/n3', r: 'n1/(n2*n3)' },
    // { l: '(n*n1)/(n*n2)', r: 'n1/n2' },
    // simplifyConstant can leave an extra factor of 1, which can always
    // be eliminated, since the identity always commutes
    {
      l: "1*n",
      r: "n",
      imposeContext: {
        multiply: {
          commutative: !0
        }
      }
    },
    {
      s: "n1/(n2/n3) -> (n1*n3)/n2",
      assuming: {
        multiply: {
          associative: !0
        }
      }
    },
    {
      l: "n1/(-n2)",
      r: "-n1/n2"
    }
  ];
  function le(k, V) {
    var X = {};
    if (k.s) {
      var fe = k.s.split("->");
      if (fe.length === 2)
        X.l = fe[0], X.r = fe[1];
      else
        throw SyntaxError("Could not parse rule: " + k.s);
    } else
      X.l = k.l, X.r = k.r;
    X.l = z(n(X.l)), X.r = z(n(X.r));
    for (var ce of ["imposeContext", "repeat", "assuming"])
      ce in k && (X[ce] = k[ce]);
    if (k.evaluate && (X.evaluate = n(k.evaluate)), O(X.l, V)) {
      var R = !T(X.l, V), U;
      R && (U = ie());
      var Y = L(X.l), ne = ie();
      X.expanded = {}, X.expanded.l = Y([X.l, ne]), $(X.expanded.l, V), F(X.expanded.l, V), X.expanded.r = Y([X.r, ne]), R && (X.expandedNC1 = {}, X.expandedNC1.l = Y([U, X.l]), X.expandedNC1.r = Y([U, X.r]), X.expandedNC2 = {}, X.expandedNC2.l = Y([U, X.expanded.l]), X.expandedNC2.r = Y([U, X.expanded.r]));
    }
    return X;
  }
  function K(k, V) {
    for (var X = [], fe = 0; fe < k.length; fe++) {
      var ce = k[fe], R = void 0, U = typeof ce;
      switch (U) {
        case "string":
          ce = {
            s: ce
          };
        case "object":
          R = le(ce, V);
          break;
        case "function":
          R = ce;
          break;
        default:
          throw TypeError("Unsupported type of rule: " + U);
      }
      X.push(R);
    }
    return X;
  }
  var re = 0;
  function ie() {
    return new S("_p" + re++);
  }
  function j(k, V) {
    var X = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : jt(), fe = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, ce = fe.consoleDebug;
    V = K(V || Z.rules, fe.context);
    var R = f(k, X);
    R = z(R);
    for (var U = {}, Y = R.toString({
      parenthesis: "all"
    }); !U[Y]; ) {
      U[Y] = !0, re = 0;
      var ne = Y;
      ce && console.log("Working on: ", Y);
      for (var se = 0; se < V.length; se++) {
        var ue = "";
        if (typeof V[se] == "function" ? (R = V[se](R, fe), ce && (ue = V[se].name)) : ($(R, fe.context), R = oe(R, V[se], fe.context), ce && (ue = "".concat(V[se].l.toString(), " -> ").concat(V[se].r.toString()))), ce) {
          var he = R.toString({
            parenthesis: "all"
          });
          he !== ne && (console.log("Applying", ue, "produced", he), ne = he);
        }
        _(R, fe.context);
      }
      Y = R.toString({
        parenthesis: "all"
      });
    }
    return R;
  }
  function te(k, V, X) {
    var fe = k;
    if (k)
      for (var ce = 0; ce < k.length; ++ce) {
        var R = oe(k[ce], V, X);
        R !== k[ce] && (fe === k && (fe = k.slice()), fe[ce] = R);
      }
    return fe;
  }
  function oe(k, V, X) {
    if (V.assuming) {
      for (var fe in V.assuming)
        for (var ce in V.assuming[fe])
          if (C(fe, ce, X) !== V.assuming[fe][ce])
            return k;
    }
    var R = I(V.imposeContext, X), U = k;
    if (U instanceof E || U instanceof y) {
      var Y = te(U.args, V, X);
      Y !== U.args && (U = U.clone(), U.args = Y);
    } else if (U instanceof N) {
      if (U.content) {
        var ne = oe(U.content, V, X);
        ne !== U.content && (U = new N(ne));
      }
    } else if (U instanceof h) {
      var se = te(U.items, V, X);
      se !== U.items && (U = new h(se));
    } else if (U instanceof D) {
      var ue = U.object;
      U.object && (ue = oe(U.object, V, X));
      var he = U.index;
      U.index && (he = oe(U.index, V, X)), (ue !== U.object || he !== U.index) && (U = new D(ue, he));
    } else if (U instanceof g) {
      var de = te(U.dimensions, V, X);
      de !== U.dimensions && (U = new g(de));
    } else if (U instanceof A) {
      var xe = !1, ge = {};
      for (var Ue in U.properties)
        ge[Ue] = oe(U.properties[Ue], V, X), ge[Ue] !== U.properties[Ue] && (xe = !0);
      xe && (U = new A(ge));
    }
    var Le = V.r, Ee = H(V.l, U, R)[0];
    if (!Ee && V.expanded && (Le = V.expanded.r, Ee = H(V.expanded.l, U, R)[0]), !Ee && V.expandedNC1 && (Le = V.expandedNC1.r, Ee = H(V.expandedNC1.l, U, R)[0], Ee || (Le = V.expandedNC2.r, Ee = H(V.expandedNC2.l, U, R)[0])), Ee) {
      var je = U.implicit;
      U = Le.clone(), je && "implicit" in Le && (U.implicit = !0), U = U.transform(function(M) {
        return M.isSymbolNode && De(Ee.placeholders, M.name) ? Ee.placeholders[M.name].clone() : M;
      });
    }
    return V.repeat && U !== k && (U = oe(U, V, X)), U;
  }
  function me(k, V) {
    var X = [], fe, ce, R = L(k);
    if (T(k, V))
      for (var U = 0; U < k.args.length; U++)
        ce = k.args.slice(0), ce.splice(U, 1), fe = ce.length === 1 ? ce[0] : R(ce), X.push(R([k.args[U], fe]));
    else
      for (var Y = 1; Y < k.args.length; Y++) {
        var ne = k.args[0];
        Y > 1 && (ne = R(k.args.slice(0, Y))), ce = k.args.slice(Y), fe = ce.length === 1 ? ce[0] : R(ce), X.push(R([ne, fe]));
      }
    return X;
  }
  function be(k, V) {
    var X = {
      placeholders: {}
    };
    if (!k.placeholders && !V.placeholders)
      return X;
    if (k.placeholders) {
      if (!V.placeholders)
        return k;
    } else return V;
    for (var fe in k.placeholders)
      if (De(k.placeholders, fe) && (X.placeholders[fe] = k.placeholders[fe], De(V.placeholders, fe) && !ee(k.placeholders[fe], V.placeholders[fe])))
        return null;
    for (var ce in V.placeholders)
      De(V.placeholders, ce) && (X.placeholders[ce] = V.placeholders[ce]);
    return X;
  }
  function we(k, V) {
    var X = [];
    if (k.length === 0 || V.length === 0)
      return X;
    for (var fe, ce = 0; ce < k.length; ce++)
      for (var R = 0; R < V.length; R++)
        fe = be(k[ce], V[R]), fe && X.push(fe);
    return X;
  }
  function P(k) {
    if (k.length === 0)
      return k;
    for (var V = k.reduce(we), X = [], fe = {}, ce = 0; ce < V.length; ce++) {
      var R = JSON.stringify(V[ce]);
      fe[R] || (fe[R] = !0, X.push(V[ce]));
    }
    return X;
  }
  function H(k, V, X, fe) {
    var ce = [{
      placeholders: {}
    }];
    if (k instanceof E && V instanceof E || k instanceof y && V instanceof y) {
      if (k instanceof E) {
        if (k.op !== V.op || k.fn !== V.fn)
          return [];
      } else if (k instanceof y && k.name !== V.name)
        return [];
      if (V.args.length === 1 && k.args.length === 1 || !O(V, X) && V.args.length === k.args.length || fe) {
        for (var R = [], U = 0; U < k.args.length; U++) {
          var Y = H(k.args[U], V.args[U], X);
          if (Y.length === 0)
            break;
          R.push(Y);
        }
        if (R.length !== k.args.length) {
          if (!T(V, X) || // exact match in order needed
          k.args.length === 1)
            return [];
          if (k.args.length > 2)
            throw new Error("permuting >2 commutative non-associative rule arguments not yet implemented");
          var ne = H(k.args[0], V.args[1], X);
          if (ne.length === 0)
            return [];
          var se = H(k.args[1], V.args[0], X);
          if (se.length === 0)
            return [];
          R = [ne, se];
        }
        ce = P(R);
      } else if (V.args.length >= 2 && k.args.length === 2) {
        for (var ue = me(V, X), he = [], de = 0; de < ue.length; de++) {
          var xe = H(k, ue[de], X, !0);
          he = he.concat(xe);
        }
        return he;
      } else {
        if (k.args.length > 2)
          throw Error("Unexpected non-binary associative function: " + k.toString());
        return [];
      }
    } else if (k instanceof S) {
      if (k.name.length === 0)
        throw new Error("Symbol in rule has 0 length...!?");
      if (J[k.name]) {
        if (k.name !== V.name)
          return [];
      } else
        switch (k.name[1] >= "a" && k.name[1] <= "z" ? k.name.substring(0, 2) : k.name[0]) {
          case "n":
          case "_p":
            ce[0].placeholders[k.name] = V;
            break;
          case "c":
          case "cl":
            if (ke(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          case "v":
            if (!ke(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          case "vl":
            if (nr(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          case "cd":
            if (Ul(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          case "vd":
            if (!Ul(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          case "ce":
            if (ta(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          case "ve":
            if (!ta(V))
              ce[0].placeholders[k.name] = V;
            else
              return [];
            break;
          default:
            throw new Error("Invalid symbol in rule: " + k.name);
        }
    } else if (k instanceof w) {
      if (!u(k.value, V.value))
        return [];
    } else
      return [];
    return ce;
  }
  function ee(k, V) {
    if (k instanceof w && V instanceof w) {
      if (!u(k.value, V.value))
        return !1;
    } else if (k instanceof S && V instanceof S) {
      if (k.name !== V.name)
        return !1;
    } else if (k instanceof E && V instanceof E || k instanceof y && V instanceof y) {
      if (k instanceof E) {
        if (k.op !== V.op || k.fn !== V.fn)
          return !1;
      } else if (k instanceof y && k.name !== V.name)
        return !1;
      if (k.args.length !== V.args.length)
        return !1;
      for (var X = 0; X < k.args.length; X++)
        if (!ee(k.args[X], V.args[X]))
          return !1;
    } else
      return !1;
    return !0;
  }
  return Z;
}), TM = "simplifyConstant", BM = ["typed", "config", "mathWithTransform", "matrix", "?fraction", "?bignumber", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "SymbolNode"], OM = /* @__PURE__ */ q(TM, BM, (e) => {
  var {
    typed: r,
    config: t,
    mathWithTransform: n,
    matrix: a,
    fraction: i,
    bignumber: o,
    AccessorNode: c,
    ArrayNode: l,
    ConstantNode: s,
    FunctionNode: u,
    IndexNode: f,
    ObjectNode: m,
    OperatorNode: v,
    SymbolNode: p
  } = e, {
    isCommutative: d,
    isAssociative: b,
    allChildren: x,
    createMakeNodeFunction: D
  } = bi({
    FunctionNode: u,
    OperatorNode: v,
    SymbolNode: p
  }), h = r("simplifyConstant", {
    Node: ($) => A(I($, {})),
    "Node, Object": function(F, _) {
      return A(I(F, _));
    }
  });
  function w($) {
    return ht($) ? $.valueOf() : $ instanceof Array ? $.map(w) : Ce($) ? a(w($.valueOf())) : $;
  }
  function y($, F, _) {
    try {
      return n[$].apply(null, F);
    } catch {
      return F = F.map(w), N(n[$].apply(null, F), _);
    }
  }
  var g = r({
    Fraction: C,
    number: function(F) {
      return F < 0 ? S(new s(-F)) : new s(F);
    },
    BigNumber: function(F) {
      return F < 0 ? S(new s(-F)) : new s(F);
    },
    bigint: function(F) {
      return F < 0n ? S(new s(-F)) : new s(F);
    },
    Complex: function(F) {
      throw new Error("Cannot convert Complex number to Node");
    },
    string: function(F) {
      return new s(F);
    },
    Matrix: function(F) {
      return new l(F.valueOf().map((_) => g(_)));
    }
  });
  function A($) {
    return Ve($) ? $ : g($);
  }
  function E($, F) {
    var _ = F && F.exactFractions !== !1;
    if (_ && isFinite($) && i) {
      var L = i($), B = F && typeof F.fractionsLimit == "number" ? F.fractionsLimit : 1 / 0;
      if (L.valueOf() === $ && L.n < B && L.d < B)
        return L;
    }
    return $;
  }
  var N = r({
    "string, Object": function(F, _) {
      var L = st(F, t);
      if (L === "BigNumber")
        return o === void 0 && ui(), o(F);
      if (L === "bigint")
        return BigInt(F);
      if (L === "Fraction")
        return i === void 0 && rm(), i(F);
      var B = parseFloat(F);
      return E(B, _);
    },
    "Fraction, Object": function(F, _) {
      return F;
    },
    // we don't need options here
    "BigNumber, Object": function(F, _) {
      return F;
    },
    // we don't need options here
    "number, Object": function(F, _) {
      return E(F, _);
    },
    "bigint, Object": function(F, _) {
      return F;
    },
    "Complex, Object": function(F, _) {
      return F.im !== 0 ? F : E(F.re, _);
    },
    "Matrix, Object": function(F, _) {
      return a(E(F.valueOf()));
    },
    "Array, Object": function(F, _) {
      return F.map(E);
    }
  });
  function S($) {
    return new v("-", "unaryMinus", [$]);
  }
  function C($) {
    var F, _ = $.s * $.n;
    return _ < 0 ? F = new v("-", "unaryMinus", [new s(-_)]) : F = new s(_), $.d === 1 ? F : new v("/", "divide", [F, new s($.d)]);
  }
  function T($, F, _) {
    if (!gt(F))
      return new c(A($), A(F));
    if (Sr($) || Ce($)) {
      for (var L = Array.from(F.dimensions); L.length > 0; )
        if (ke(L[0]) && typeof L[0].value != "string") {
          var B = N(L.shift().value, _);
          Sr($) ? $ = $.items[B - 1] : ($ = $.valueOf()[B - 1], $ instanceof Array && ($ = a($)));
        } else if (L.length > 1 && ke(L[1]) && typeof L[1].value != "string") {
          var W = N(L[1].value, _), Q = [], Z = Sr($) ? $.items : $.valueOf();
          for (var z of Z)
            if (Sr(z))
              Q.push(z.items[W - 1]);
            else if (Ce($))
              Q.push(z[W - 1]);
            else
              break;
          if (Q.length === Z.length)
            Sr($) ? $ = new l(Q) : $ = a(Q), L.splice(1, 1);
          else
            break;
        } else
          break;
      return L.length === F.dimensions.length ? new c(A($), F) : L.length > 0 ? (F = new f(L), new c(A($), F)) : $;
    }
    if (sn($) && F.dimensions.length === 1 && ke(F.dimensions[0])) {
      var J = F.dimensions[0].value;
      return J in $.properties ? $.properties[J] : new s();
    }
    return new c(A($), F);
  }
  function O($, F, _, L) {
    var B = F.shift(), W = F.reduce((Q, Z) => {
      if (!Ve(Z)) {
        var z = Q.pop();
        if (Ve(z))
          return [z, Z];
        try {
          return Q.push(y($, [z, Z], L)), Q;
        } catch {
          Q.push(z);
        }
      }
      Q.push(A(Q.pop()));
      var J = Q.length === 1 ? Q[0] : _(Q);
      return [_([J, A(Z)])];
    }, [B]);
    return W.length === 1 ? W[0] : _([W[0], g(W[1])]);
  }
  function I($, F) {
    switch ($.type) {
      case "SymbolNode":
        return $;
      case "ConstantNode":
        switch (typeof $.value) {
          case "number":
            return N($.value, F);
          case "bigint":
            return N($.value, F);
          case "string":
            return $.value;
          default:
            if (!isNaN($.value)) return N($.value, F);
        }
        return $;
      case "FunctionNode":
        if (n[$.name] && n[$.name].rawArgs)
          return $;
        {
          var _ = ["add", "multiply"];
          if (!_.includes($.name)) {
            var L = $.args.map((oe) => I(oe, F));
            if (!L.some(Ve))
              try {
                return y($.name, L, F);
              } catch {
              }
            if ($.name === "size" && L.length === 1 && Sr(L[0])) {
              for (var B = [], W = L[0]; Sr(W); )
                B.push(W.items.length), W = W.items[0];
              return a(B);
            }
            return new u($.name, L.map(A));
          }
        }
      case "OperatorNode": {
        var Q = $.fn.toString(), Z, z, J = D($);
        if (rr($) && $.isUnary())
          Z = [I($.args[0], F)], Ve(Z[0]) ? z = J(Z) : z = y(Q, Z, F);
        else if (b($, F.context))
          if (Z = x($, F.context), Z = Z.map((oe) => I(oe, F)), d(Q, F.context)) {
            for (var le = [], K = [], re = 0; re < Z.length; re++)
              Ve(Z[re]) ? K.push(Z[re]) : le.push(Z[re]);
            le.length > 1 ? (z = O(Q, le, J, F), K.unshift(z), z = O(Q, K, J, F)) : z = O(Q, Z, J, F);
          } else
            z = O(Q, Z, J, F);
        else
          Z = $.args.map((oe) => I(oe, F)), z = O(Q, Z, J, F);
        return z;
      }
      case "ParenthesisNode":
        return I($.content, F);
      case "AccessorNode":
        return T(I($.object, F), I($.index, F), F);
      case "ArrayNode": {
        var ie = $.items.map((oe) => I(oe, F));
        return ie.some(Ve) ? new l(ie.map(A)) : a(ie);
      }
      case "IndexNode":
        return new f($.dimensions.map((oe) => h(oe, F)));
      case "ObjectNode": {
        var j = {};
        for (var te in $.properties)
          j[te] = h($.properties[te], F);
        return new m(j);
      }
      case "AssignmentNode":
      case "BlockNode":
      case "FunctionAssignmentNode":
      case "RangeNode":
      case "ConditionalNode":
      default:
        throw new Error("Unimplemented node type in simplifyConstant: ".concat($.type));
    }
  }
  return h;
}), kl = "simplifyCore", $M = ["typed", "parse", "equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], IM = /* @__PURE__ */ q(kl, $M, (e) => {
  var {
    typed: r,
    parse: t,
    equal: n,
    isZero: a,
    add: i,
    subtract: o,
    multiply: c,
    divide: l,
    pow: s,
    AccessorNode: u,
    ArrayNode: f,
    ConstantNode: m,
    FunctionNode: v,
    IndexNode: p,
    ObjectNode: d,
    OperatorNode: b,
    ParenthesisNode: x,
    SymbolNode: D
  } = e, h = new m(0), w = new m(1), y = new m(!0), g = new m(!1);
  function A(C) {
    return rr(C) && ["and", "not", "or"].includes(C.op);
  }
  var {
    hasProperty: E,
    isCommutative: N
  } = bi({
    FunctionNode: v,
    OperatorNode: b,
    SymbolNode: D
  });
  function S(C) {
    var T = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, O = T ? T.context : void 0;
    if (E(C, "trivial", O)) {
      if (Yr(C) && C.args.length === 1)
        return S(C.args[0], T);
      var I = !1, $ = 0;
      if (C.forEach((K) => {
        ++$, $ === 1 && (I = S(K, T));
      }), $ === 1)
        return I;
    }
    var F = C;
    if (Yr(F)) {
      var _ = Rw(F.name);
      if (_) {
        if (F.args.length > 2 && E(F, "associative", O))
          for (; F.args.length > 2; ) {
            var L = F.args.pop(), B = F.args.pop();
            F.args.push(new b(_, F.name, [L, B]));
          }
        F = new b(_, F.name, F.args);
      } else
        return new v(S(F.fn), F.args.map((K) => S(K, T)));
    }
    if (rr(F) && F.isUnary()) {
      var W = S(F.args[0], T);
      if (F.op === "~" && rr(W) && W.isUnary() && W.op === "~" || F.op === "not" && rr(W) && W.isUnary() && W.op === "not" && A(W.args[0]))
        return W.args[0];
      var Q = !0;
      if (F.op === "-" && rr(W) && (W.isBinary() && W.fn === "subtract" && (F = new b("-", "subtract", [W.args[1], W.args[0]]), Q = !1), W.isUnary() && W.op === "-"))
        return W.args[0];
      if (Q) return new b(F.op, F.fn, [W]);
    }
    if (rr(F) && F.isBinary()) {
      var Z = S(F.args[0], T), z = S(F.args[1], T);
      if (F.op === "+") {
        if (ke(Z) && a(Z.value))
          return z;
        if (ke(z) && a(z.value))
          return Z;
        rr(z) && z.isUnary() && z.op === "-" && (z = z.args[0], F = new b("-", "subtract", [Z, z]));
      }
      if (F.op === "-")
        return rr(z) && z.isUnary() && z.op === "-" ? S(new b("+", "add", [Z, z.args[0]]), T) : ke(Z) && a(Z.value) ? S(new b("-", "unaryMinus", [z])) : ke(z) && a(z.value) ? Z : new b(F.op, F.fn, [Z, z]);
      if (F.op === "*") {
        if (ke(Z)) {
          if (a(Z.value))
            return h;
          if (n(Z.value, 1))
            return z;
        }
        if (ke(z)) {
          if (a(z.value))
            return h;
          if (n(z.value, 1))
            return Z;
          if (N(F, O))
            return new b(F.op, F.fn, [z, Z], F.implicit);
        }
        return new b(F.op, F.fn, [Z, z], F.implicit);
      }
      if (F.op === "/")
        return ke(Z) && a(Z.value) ? h : ke(z) && n(z.value, 1) ? Z : new b(F.op, F.fn, [Z, z]);
      if (F.op === "^" && ke(z)) {
        if (a(z.value))
          return w;
        if (n(z.value, 1))
          return Z;
      }
      if (F.op === "and") {
        if (ke(Z))
          if (Z.value) {
            if (A(z)) return z;
            if (ke(z))
              return z.value ? y : g;
          } else
            return g;
        if (ke(z))
          if (z.value) {
            if (A(Z)) return Z;
          } else
            return g;
      }
      if (F.op === "or") {
        if (ke(Z)) {
          if (Z.value)
            return y;
          if (A(z)) return z;
        }
        if (ke(z)) {
          if (z.value)
            return y;
          if (A(Z)) return Z;
        }
      }
      return new b(F.op, F.fn, [Z, z]);
    }
    if (rr(F))
      return new b(F.op, F.fn, F.args.map((K) => S(K, T)));
    if (Sr(F))
      return new f(F.items.map((K) => S(K, T)));
    if (at(F))
      return new u(S(F.object, T), S(F.index, T));
    if (gt(F))
      return new p(F.dimensions.map((K) => S(K, T)));
    if (sn(F)) {
      var J = {};
      for (var le in F.properties)
        J[le] = S(F.properties[le], T);
      return new d(J);
    }
    return F;
  }
  return r(kl, {
    Node: S,
    "Node,Object": S
  });
}), qM = "resolve", RM = ["typed", "parse", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode"], zM = /* @__PURE__ */ q(qM, RM, (e) => {
  var {
    typed: r,
    parse: t,
    ConstantNode: n,
    FunctionNode: a,
    OperatorNode: i,
    ParenthesisNode: o
  } = e;
  function c(l, s) {
    var u = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new Set();
    if (!s)
      return l;
    if (nr(l)) {
      if (u.has(l.name)) {
        var f = Array.from(u).join(", ");
        throw new ReferenceError("recursive loop of variable definitions among {".concat(f, "}"));
      }
      var m = s.get(l.name);
      if (Ve(m)) {
        var v = new Set(u);
        return v.add(l.name), c(m, s, v);
      } else return typeof m == "number" ? t(String(m)) : m !== void 0 ? new n(m) : l;
    } else if (rr(l)) {
      var p = l.args.map(function(b) {
        return c(b, s, u);
      });
      return new i(l.op, l.fn, p, l.implicit);
    } else {
      if (Ur(l))
        return new o(c(l.content, s, u));
      if (Yr(l)) {
        var d = l.args.map(function(b) {
          return c(b, s, u);
        });
        return new a(l.name, d);
      }
    }
    return l.map((b) => c(b, s, u));
  }
  return r("resolve", {
    Node: c,
    "Node, Map | null | undefined": c,
    "Node, Object": (l, s) => c(l, _t(s)),
    // For arrays and matrices, we map `self` rather than `_resolve`
    // because resolve is fairly expensive anyway, and this way
    // we get nice error messages if one entry in the array has wrong type.
    "Array | Matrix": r.referToSelf((l) => (s) => s.map((u) => l(u))),
    "Array | Matrix, null | undefined": r.referToSelf((l) => (s) => s.map((u) => l(u))),
    "Array, Object": r.referTo("Array,Map", (l) => (s, u) => l(s, _t(u))),
    "Matrix, Object": r.referTo("Matrix,Map", (l) => (s, u) => l(s, _t(u))),
    "Array | Matrix, Map": r.referToSelf((l) => (s, u) => s.map((f) => l(f, u)))
  });
}), Hl = "symbolicEqual", PM = ["parse", "simplify", "typed", "OperatorNode"], UM = /* @__PURE__ */ q(Hl, PM, (e) => {
  var {
    parse: r,
    simplify: t,
    typed: n,
    OperatorNode: a
  } = e;
  function i(o, c) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, s = new a("-", "subtract", [o, c]), u = t(s, {}, l);
    return ke(u) && !u.value;
  }
  return n(Hl, {
    "Node, Node": i,
    "Node, Node, Object": i
  });
}), Gl = "derivative", LM = ["typed", "config", "parse", "simplify", "equal", "isZero", "numeric", "ConstantNode", "FunctionNode", "OperatorNode", "ParenthesisNode", "SymbolNode"], kM = /* @__PURE__ */ q(Gl, LM, (e) => {
  var {
    typed: r,
    config: t,
    parse: n,
    simplify: a,
    equal: i,
    isZero: o,
    numeric: c,
    ConstantNode: l,
    FunctionNode: s,
    OperatorNode: u,
    ParenthesisNode: f,
    SymbolNode: m
  } = e;
  function v(w, y) {
    var g = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
      simplify: !0
    }, A = {};
    x(A, w, y.name);
    var E = D(w, A);
    return g.simplify ? a(E) : E;
  }
  function p(w) {
    var y = n(w);
    if (!y.isSymbolNode)
      throw new TypeError("Invalid variable. " + "Cannot parse ".concat(JSON.stringify(w), " into a variable in function derivative"));
    return y;
  }
  var d = r(Gl, {
    "Node, SymbolNode": v,
    "Node, SymbolNode, Object": v,
    "Node, string": (w, y) => v(w, p(y)),
    "Node, string, Object": (w, y, g) => v(w, p(y), g)
    /* TODO: implement and test syntax with order of derivatives -> implement as an option {order: number}
    'Node, SymbolNode, ConstantNode': function (expr, variable, {order}) {
      let res = expr
      for (let i = 0; i < order; i++) {
        let constNodes = {}
        constTag(constNodes, expr, variable.name)
        res = _derivative(res, constNodes)
      }
      return res
    }
    */
  });
  d._simplify = !0, d.toTex = function(w) {
    return b.apply(null, w.args);
  };
  var b = r("_derivTex", {
    "Node, SymbolNode": function(y, g) {
      return ke(y) && Je(y.value) === "string" ? b(n(y.value).toString(), g.toString(), 1) : b(y.toTex(), g.toString(), 1);
    },
    "Node, ConstantNode": function(y, g) {
      if (Je(g.value) === "string")
        return b(y, n(g.value));
      throw new Error("The second parameter to 'derivative' is a non-string constant");
    },
    "Node, SymbolNode, ConstantNode": function(y, g, A) {
      return b(y.toString(), g.name, A.value);
    },
    "string, string, number": function(y, g, A) {
      var E;
      return A === 1 ? E = "{d\\over d" + g + "}" : E = "{d^{" + A + "}\\over d" + g + "^{" + A + "}}", E + "\\left[".concat(y, "\\right]");
    }
  }), x = r("constTag", {
    "Object, ConstantNode, string": function(y, g) {
      return y[g] = !0, !0;
    },
    "Object, SymbolNode, string": function(y, g, A) {
      return g.name !== A ? (y[g] = !0, !0) : !1;
    },
    "Object, ParenthesisNode, string": function(y, g, A) {
      return x(y, g.content, A);
    },
    "Object, FunctionAssignmentNode, string": function(y, g, A) {
      return g.params.includes(A) ? x(y, g.expr, A) : (y[g] = !0, !0);
    },
    "Object, FunctionNode | OperatorNode, string": function(y, g, A) {
      if (g.args.length > 0) {
        for (var E = x(y, g.args[0], A), N = 1; N < g.args.length; ++N)
          E = x(y, g.args[N], A) && E;
        if (E)
          return y[g] = !0, !0;
      }
      return !1;
    }
  }), D = r("_derivative", {
    "ConstantNode, Object": function(y) {
      return h(0);
    },
    "SymbolNode, Object": function(y, g) {
      return g[y] !== void 0 ? h(0) : h(1);
    },
    "ParenthesisNode, Object": function(y, g) {
      return new f(D(y.content, g));
    },
    "FunctionAssignmentNode, Object": function(y, g) {
      return g[y] !== void 0 ? h(0) : D(y.expr, g);
    },
    "FunctionNode, Object": function(y, g) {
      if (g[y] !== void 0)
        return h(0);
      var A = y.args[0], E, N = !1, S = !1, C;
      switch (y.name) {
        case "cbrt":
          N = !0, C = new u("*", "multiply", [h(3), new u("^", "pow", [A, new u("/", "divide", [h(2), h(3)])])]);
          break;
        case "sqrt":
        case "nthRoot":
          if (y.args.length === 1)
            N = !0, C = new u("*", "multiply", [h(2), new s("sqrt", [A])]);
          else if (y.args.length === 2)
            return E = new u("/", "divide", [h(1), y.args[1]]), g[E] = g[y.args[1]], D(new u("^", "pow", [A, E]), g);
          break;
        case "log10":
          E = h(10);
        case "log":
          if (!E && y.args.length === 1)
            C = A.clone(), N = !0;
          else if (y.args.length === 1 && E || y.args.length === 2 && g[y.args[1]] !== void 0)
            C = new u("*", "multiply", [A.clone(), new s("log", [E || y.args[1]])]), N = !0;
          else if (y.args.length === 2)
            return D(new u("/", "divide", [new s("log", [A]), new s("log", [y.args[1]])]), g);
          break;
        case "pow":
          if (y.args.length === 2)
            return g[E] = g[y.args[1]], D(new u("^", "pow", [A, y.args[1]]), g);
          break;
        case "exp":
          C = new s("exp", [A.clone()]);
          break;
        case "sin":
          C = new s("cos", [A.clone()]);
          break;
        case "cos":
          C = new u("-", "unaryMinus", [new s("sin", [A.clone()])]);
          break;
        case "tan":
          C = new u("^", "pow", [new s("sec", [A.clone()]), h(2)]);
          break;
        case "sec":
          C = new u("*", "multiply", [y, new s("tan", [A.clone()])]);
          break;
        case "csc":
          S = !0, C = new u("*", "multiply", [y, new s("cot", [A.clone()])]);
          break;
        case "cot":
          S = !0, C = new u("^", "pow", [new s("csc", [A.clone()]), h(2)]);
          break;
        case "asin":
          N = !0, C = new s("sqrt", [new u("-", "subtract", [h(1), new u("^", "pow", [A.clone(), h(2)])])]);
          break;
        case "acos":
          N = !0, S = !0, C = new s("sqrt", [new u("-", "subtract", [h(1), new u("^", "pow", [A.clone(), h(2)])])]);
          break;
        case "atan":
          N = !0, C = new u("+", "add", [new u("^", "pow", [A.clone(), h(2)]), h(1)]);
          break;
        case "asec":
          N = !0, C = new u("*", "multiply", [new s("abs", [A.clone()]), new s("sqrt", [new u("-", "subtract", [new u("^", "pow", [A.clone(), h(2)]), h(1)])])]);
          break;
        case "acsc":
          N = !0, S = !0, C = new u("*", "multiply", [new s("abs", [A.clone()]), new s("sqrt", [new u("-", "subtract", [new u("^", "pow", [A.clone(), h(2)]), h(1)])])]);
          break;
        case "acot":
          N = !0, S = !0, C = new u("+", "add", [new u("^", "pow", [A.clone(), h(2)]), h(1)]);
          break;
        case "sinh":
          C = new s("cosh", [A.clone()]);
          break;
        case "cosh":
          C = new s("sinh", [A.clone()]);
          break;
        case "tanh":
          C = new u("^", "pow", [new s("sech", [A.clone()]), h(2)]);
          break;
        case "sech":
          S = !0, C = new u("*", "multiply", [y, new s("tanh", [A.clone()])]);
          break;
        case "csch":
          S = !0, C = new u("*", "multiply", [y, new s("coth", [A.clone()])]);
          break;
        case "coth":
          S = !0, C = new u("^", "pow", [new s("csch", [A.clone()]), h(2)]);
          break;
        case "asinh":
          N = !0, C = new s("sqrt", [new u("+", "add", [new u("^", "pow", [A.clone(), h(2)]), h(1)])]);
          break;
        case "acosh":
          N = !0, C = new s("sqrt", [new u("-", "subtract", [new u("^", "pow", [A.clone(), h(2)]), h(1)])]);
          break;
        case "atanh":
          N = !0, C = new u("-", "subtract", [h(1), new u("^", "pow", [A.clone(), h(2)])]);
          break;
        case "asech":
          N = !0, S = !0, C = new u("*", "multiply", [A.clone(), new s("sqrt", [new u("-", "subtract", [h(1), new u("^", "pow", [A.clone(), h(2)])])])]);
          break;
        case "acsch":
          N = !0, S = !0, C = new u("*", "multiply", [new s("abs", [A.clone()]), new s("sqrt", [new u("+", "add", [new u("^", "pow", [A.clone(), h(2)]), h(1)])])]);
          break;
        case "acoth":
          N = !0, S = !0, C = new u("-", "subtract", [h(1), new u("^", "pow", [A.clone(), h(2)])]);
          break;
        case "abs":
          C = new u("/", "divide", [new s(new m("abs"), [A.clone()]), A.clone()]);
          break;
        case "gamma":
        default:
          throw new Error('Cannot process function "' + y.name + '" in derivative: the function is not supported, undefined, or the number of arguments passed to it are not supported');
      }
      var T, O;
      N ? (T = "/", O = "divide") : (T = "*", O = "multiply");
      var I = D(A, g);
      return S && (I = new u("-", "unaryMinus", [I])), new u(T, O, [I, C]);
    },
    "OperatorNode, Object": function(y, g) {
      if (g[y] !== void 0)
        return h(0);
      if (y.op === "+")
        return new u(y.op, y.fn, y.args.map(function(F) {
          return D(F, g);
        }));
      if (y.op === "-") {
        if (y.isUnary())
          return new u(y.op, y.fn, [D(y.args[0], g)]);
        if (y.isBinary())
          return new u(y.op, y.fn, [D(y.args[0], g), D(y.args[1], g)]);
      }
      if (y.op === "*") {
        var A = y.args.filter(function(F) {
          return g[F] !== void 0;
        });
        if (A.length > 0) {
          var E = y.args.filter(function(F) {
            return g[F] === void 0;
          }), N = E.length === 1 ? E[0] : new u("*", "multiply", E), S = A.concat(D(N, g));
          return new u("*", "multiply", S);
        }
        return new u("+", "add", y.args.map(function(F) {
          return new u("*", "multiply", y.args.map(function(_) {
            return _ === F ? D(_, g) : _.clone();
          }));
        }));
      }
      if (y.op === "/" && y.isBinary()) {
        var C = y.args[0], T = y.args[1];
        return g[T] !== void 0 ? new u("/", "divide", [D(C, g), T]) : g[C] !== void 0 ? new u("*", "multiply", [new u("-", "unaryMinus", [C]), new u("/", "divide", [D(T, g), new u("^", "pow", [T.clone(), h(2)])])]) : new u("/", "divide", [new u("-", "subtract", [new u("*", "multiply", [D(C, g), T.clone()]), new u("*", "multiply", [C.clone(), D(T, g)])]), new u("^", "pow", [T.clone(), h(2)])]);
      }
      if (y.op === "^" && y.isBinary()) {
        var O = y.args[0], I = y.args[1];
        if (g[O] !== void 0)
          return ke(O) && (o(O.value) || i(O.value, 1)) ? h(0) : new u("*", "multiply", [y, new u("*", "multiply", [new s("log", [O.clone()]), D(I.clone(), g)])]);
        if (g[I] !== void 0) {
          if (ke(I)) {
            if (o(I.value))
              return h(0);
            if (i(I.value, 1))
              return D(O, g);
          }
          var $ = new u("^", "pow", [O.clone(), new u("-", "subtract", [I, h(1)])]);
          return new u("*", "multiply", [I.clone(), new u("*", "multiply", [D(O, g), $])]);
        }
        return new u("*", "multiply", [new u("^", "pow", [O.clone(), I.clone()]), new u("+", "add", [new u("*", "multiply", [D(O, g), new u("/", "divide", [I.clone(), O.clone()])]), new u("*", "multiply", [D(I, g), new s("log", [O.clone()])])])]);
      }
      throw new Error('Cannot process operator "' + y.op + '" in derivative: the operator is not supported, undefined, or the number of arguments passed to it are not supported');
    }
  });
  function h(w, y) {
    return new l(c(w, st(String(w), t)));
  }
  return d;
}), Zl = "rationalize", HM = ["config", "typed", "equal", "isZero", "add", "subtract", "multiply", "divide", "pow", "parse", "simplifyConstant", "simplifyCore", "simplify", "?bignumber", "?fraction", "mathWithTransform", "matrix", "AccessorNode", "ArrayNode", "ConstantNode", "FunctionNode", "IndexNode", "ObjectNode", "OperatorNode", "SymbolNode", "ParenthesisNode"], GM = /* @__PURE__ */ q(Zl, HM, (e) => {
  var {
    config: r,
    typed: t,
    equal: n,
    isZero: a,
    add: i,
    subtract: o,
    multiply: c,
    divide: l,
    pow: s,
    parse: u,
    simplifyConstant: f,
    simplifyCore: m,
    simplify: v,
    fraction: p,
    bignumber: d,
    mathWithTransform: b,
    matrix: x,
    AccessorNode: D,
    ArrayNode: h,
    ConstantNode: w,
    FunctionNode: y,
    IndexNode: g,
    ObjectNode: A,
    OperatorNode: E,
    SymbolNode: N,
    ParenthesisNode: S
  } = e;
  function C(F) {
    var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, L = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, B = O(), W = T(F, _, !0, B.firstRules), Q = W.variables.length, Z = {
      exactFractions: !1
    }, z = {
      exactFractions: !0
    };
    if (F = W.expression, Q >= 1) {
      F = I(F);
      var J, le, K = !0, re = !1;
      F = v(F, B.firstRules, {}, Z);
      for (var ie; le = K ? B.distrDivRules : B.sucDivRules, F = v(F, le, {}, z), K = !K, ie = F.toString(), ie !== J; )
        re = !0, J = ie;
      re && (F = v(F, B.firstRulesAgain, {}, Z)), F = v(F, B.finalRules, {}, Z);
    }
    var j = [], te = {};
    return F.type === "OperatorNode" && F.isBinary() && F.op === "/" ? (Q === 1 && (F.args[0] = $(F.args[0], j), F.args[1] = $(F.args[1])), L && (te.numerator = F.args[0], te.denominator = F.args[1])) : (Q === 1 && (F = $(F, j)), L && (te.numerator = F, te.denominator = null)), L ? (te.coefficients = j, te.variables = W.variables, te.expression = F, te) : F;
  }
  return t(Zl, {
    Node: C,
    "Node, boolean": (F, _) => C(F, {}, _),
    "Node, Object": C,
    "Node, Object, boolean": C
  });
  function T(F, _, L, B) {
    var W = [], Q = v(F, B, _, {
      exactFractions: !1
    });
    L = !!L;
    var Z = "+-*" + (L ? "/" : "");
    J(Q);
    var z = {};
    return z.expression = Q, z.variables = W, z;
    function J(le) {
      var K = le.type;
      if (K === "FunctionNode")
        throw new Error("There is an unsolved function call");
      if (K === "OperatorNode")
        if (le.op === "^") {
          if (le.args[1].type !== "ConstantNode" || !Ae(parseFloat(le.args[1].value)))
            throw new Error("There is a non-integer exponent");
          J(le.args[0]);
        } else {
          if (!Z.includes(le.op))
            throw new Error("Operator " + le.op + " invalid in polynomial expression");
          for (var re = 0; re < le.args.length; re++)
            J(le.args[re]);
        }
      else if (K === "SymbolNode") {
        var ie = le.name, j = W.indexOf(ie);
        j === -1 && W.push(ie);
      } else if (K === "ParenthesisNode")
        J(le.content);
      else if (K !== "ConstantNode")
        throw new Error("type " + K + " is not allowed in polynomial expression");
    }
  }
  function O() {
    var F = [
      m,
      // sCore
      {
        l: "n+n",
        r: "2*n"
      },
      {
        l: "n+-n",
        r: "0"
      },
      f,
      // sConstant
      {
        l: "n*(n1^-1)",
        r: "n/n1"
      },
      {
        l: "n*n1^-n2",
        r: "n/n1^n2"
      },
      {
        l: "n1^-1",
        r: "1/n1"
      },
      {
        l: "n*(n1/n2)",
        r: "(n*n1)/n2"
      },
      {
        l: "1*n",
        r: "n"
      }
    ], _ = [
      {
        l: "(-n1)/(-n2)",
        r: "n1/n2"
      },
      // Unary division
      {
        l: "(-n1)*(-n2)",
        r: "n1*n2"
      },
      // Unary multiplication
      {
        l: "n1--n2",
        r: "n1+n2"
      },
      // '--' elimination
      {
        l: "n1-n2",
        r: "n1+(-n2)"
      },
      // Subtraction turn into add with un�ry minus
      {
        l: "(n1+n2)*n3",
        r: "(n1*n3 + n2*n3)"
      },
      // Distributive 1
      {
        l: "n1*(n2+n3)",
        r: "(n1*n2+n1*n3)"
      },
      // Distributive 2
      {
        l: "c1*n + c2*n",
        r: "(c1+c2)*n"
      },
      // Joining constants
      {
        l: "c1*n + n",
        r: "(c1+1)*n"
      },
      // Joining constants
      {
        l: "c1*n - c2*n",
        r: "(c1-c2)*n"
      },
      // Joining constants
      {
        l: "c1*n - n",
        r: "(c1-1)*n"
      },
      // Joining constants
      {
        l: "v/c",
        r: "(1/c)*v"
      },
      // variable/constant (new!)
      {
        l: "v/-c",
        r: "-(1/c)*v"
      },
      // variable/constant (new!)
      {
        l: "-v*-c",
        r: "c*v"
      },
      // Inversion constant and variable 1
      {
        l: "-v*c",
        r: "-c*v"
      },
      // Inversion constant and variable 2
      {
        l: "v*-c",
        r: "-c*v"
      },
      // Inversion constant and variable 3
      {
        l: "v*c",
        r: "c*v"
      },
      // Inversion constant and variable 4
      {
        l: "-(-n1*n2)",
        r: "(n1*n2)"
      },
      // Unary propagation
      {
        l: "-(n1*n2)",
        r: "(-n1*n2)"
      },
      // Unary propagation
      {
        l: "-(-n1+n2)",
        r: "(n1-n2)"
      },
      // Unary propagation
      {
        l: "-(n1+n2)",
        r: "(-n1-n2)"
      },
      // Unary propagation
      {
        l: "(n1^n2)^n3",
        r: "(n1^(n2*n3))"
      },
      // Power to Power
      {
        l: "-(-n1/n2)",
        r: "(n1/n2)"
      },
      // Division and Unary
      {
        l: "-(n1/n2)",
        r: "(-n1/n2)"
      }
    ], L = [
      {
        l: "(n1/n2 + n3/n4)",
        r: "((n1*n4 + n3*n2)/(n2*n4))"
      },
      // Sum of fractions
      {
        l: "(n1/n2 + n3)",
        r: "((n1 + n3*n2)/n2)"
      },
      // Sum fraction with number 1
      {
        l: "(n1 + n2/n3)",
        r: "((n1*n3 + n2)/n3)"
      }
    ], B = [
      {
        l: "(n1/(n2/n3))",
        r: "((n1*n3)/n2)"
      },
      // Division simplification
      {
        l: "(n1/n2/n3)",
        r: "(n1/(n2*n3))"
      }
    ], W = {};
    return W.firstRules = F.concat(_, B), W.distrDivRules = L, W.sucDivRules = B, W.firstRulesAgain = F.concat(_), W.finalRules = [
      m,
      // simplify.rules[0]
      {
        l: "n*-n",
        r: "-n^2"
      },
      // Joining multiply with power 1
      {
        l: "n*n",
        r: "n^2"
      },
      // Joining multiply with power 2
      f,
      // simplify.rules[14] old 3rd index in oldRules
      {
        l: "n*-n^n1",
        r: "-n^(n1+1)"
      },
      // Joining multiply with power 3
      {
        l: "n*n^n1",
        r: "n^(n1+1)"
      },
      // Joining multiply with power 4
      {
        l: "n^n1*-n^n2",
        r: "-n^(n1+n2)"
      },
      // Joining multiply with power 5
      {
        l: "n^n1*n^n2",
        r: "n^(n1+n2)"
      },
      // Joining multiply with power 6
      {
        l: "n^n1*-n",
        r: "-n^(n1+1)"
      },
      // Joining multiply with power 7
      {
        l: "n^n1*n",
        r: "n^(n1+1)"
      },
      // Joining multiply with power 8
      {
        l: "n^n1/-n",
        r: "-n^(n1-1)"
      },
      // Joining multiply with power 8
      {
        l: "n^n1/n",
        r: "n^(n1-1)"
      },
      // Joining division with power 1
      {
        l: "n/-n^n1",
        r: "-n^(1-n1)"
      },
      // Joining division with power 2
      {
        l: "n/n^n1",
        r: "n^(1-n1)"
      },
      // Joining division with power 3
      {
        l: "n^n1/-n^n2",
        r: "n^(n1-n2)"
      },
      // Joining division with power 4
      {
        l: "n^n1/n^n2",
        r: "n^(n1-n2)"
      },
      // Joining division with power 5
      {
        l: "n1+(-n2*n3)",
        r: "n1-n2*n3"
      },
      // Solving useless parenthesis 1
      {
        l: "v*(-c)",
        r: "-c*v"
      },
      // Solving useless unary 2
      {
        l: "n1+-n2",
        r: "n1-n2"
      },
      // Solving +- together (new!)
      {
        l: "v*c",
        r: "c*v"
      },
      // inversion constant with variable
      {
        l: "(n1^n2)^n3",
        r: "(n1^(n2*n3))"
      }
      // Power to Power
    ], W;
  }
  function I(F, _, L) {
    var B = F.type, W = arguments.length > 1;
    if (B === "OperatorNode" && F.isBinary()) {
      var Q = !1, Z;
      if (F.op === "^" && (F.args[0].type === "ParenthesisNode" || F.args[0].type === "OperatorNode") && F.args[1].type === "ConstantNode" && (Z = parseFloat(F.args[1].value), Q = Z >= 2 && Ae(Z)), Q) {
        if (Z > 2) {
          var z = F.args[0], J = new E("^", "pow", [F.args[0].cloneDeep(), new w(Z - 1)]);
          F = new E("*", "multiply", [z, J]);
        } else
          F = new E("*", "multiply", [F.args[0], F.args[0].cloneDeep()]);
        W && (L === "content" ? _.content = F : _.args[L] = F);
      }
    }
    if (B === "ParenthesisNode")
      I(F.content, F, "content");
    else if (B !== "ConstantNode" && B !== "SymbolNode")
      for (var le = 0; le < F.args.length; le++)
        I(F.args[le], F, le);
    if (!W)
      return F;
  }
  function $(F, _) {
    _ === void 0 && (_ = []), _[0] = 0;
    var L = {};
    L.cte = 1, L.oper = "+", L.fire = "";
    var B = 0, W = "";
    ie(F, null, L), B = _.length - 1;
    for (var Q = !0, Z, z = B; z >= 0; z--)
      if (_[z] !== 0) {
        var J = new w(Q ? _[z] : Math.abs(_[z])), le = _[z] < 0 ? "-" : "+";
        if (z > 0) {
          var K = new N(W);
          if (z > 1) {
            var re = new w(z);
            K = new E("^", "pow", [K, re]);
          }
          _[z] === -1 && Q ? J = new E("-", "unaryMinus", [K]) : Math.abs(_[z]) === 1 ? J = K : J = new E("*", "multiply", [J, K]);
        }
        Q ? Z = J : le === "+" ? Z = new E("+", "add", [Z, J]) : Z = new E("-", "subtract", [Z, J]), Q = !1;
      }
    if (Q)
      return new w(0);
    return Z;
    function ie(j, te, oe) {
      var me = j.type;
      if (me === "FunctionNode")
        throw new Error("There is an unsolved function call");
      if (me === "OperatorNode") {
        if (!"+-*^".includes(j.op)) throw new Error("Operator " + j.op + " invalid");
        if (te !== null) {
          if ((j.fn === "unaryMinus" || j.fn === "pow") && te.fn !== "add" && te.fn !== "subtract" && te.fn !== "multiply")
            throw new Error("Invalid " + j.op + " placing");
          if ((j.fn === "subtract" || j.fn === "add" || j.fn === "multiply") && te.fn !== "add" && te.fn !== "subtract")
            throw new Error("Invalid " + j.op + " placing");
          if ((j.fn === "subtract" || j.fn === "add" || j.fn === "unaryMinus") && oe.noFil !== 0)
            throw new Error("Invalid " + j.op + " placing");
        }
        (j.op === "^" || j.op === "*") && (oe.fire = j.op);
        for (var be = 0; be < j.args.length; be++)
          j.fn === "unaryMinus" && (oe.oper = "-"), (j.op === "+" || j.fn === "subtract") && (oe.fire = "", oe.cte = 1, oe.oper = be === 0 ? "+" : j.op), oe.noFil = be, ie(j.args[be], j, oe);
      } else if (me === "SymbolNode") {
        if (j.name !== W && W !== "")
          throw new Error("There is more than one variable");
        if (W = j.name, te === null) {
          _[1] = 1;
          return;
        }
        if (te.op === "^" && oe.noFil !== 0)
          throw new Error("In power the variable should be the first parameter");
        if (te.op === "*" && oe.noFil !== 1)
          throw new Error("In multiply the variable should be the second parameter");
        (oe.fire === "" || oe.fire === "*") && (B < 1 && (_[1] = 0), _[1] += oe.cte * (oe.oper === "+" ? 1 : -1), B = Math.max(1, B));
      } else if (me === "ConstantNode") {
        var we = parseFloat(j.value);
        if (te === null) {
          _[0] = we;
          return;
        }
        if (te.op === "^") {
          if (oe.noFil !== 1) throw new Error("Constant cannot be powered");
          if (!Ae(we) || we <= 0)
            throw new Error("Non-integer exponent is not allowed");
          for (var P = B + 1; P < we; P++) _[P] = 0;
          we > B && (_[we] = 0), _[we] += oe.cte * (oe.oper === "+" ? 1 : -1), B = Math.max(we, B);
          return;
        }
        oe.cte = we, oe.fire === "" && (_[0] += oe.cte * (oe.oper === "+" ? 1 : -1));
      } else
        throw new Error("Type " + me + " is not allowed");
    }
  }
}), Vl = "zpk2tf", ZM = ["typed", "add", "multiply", "Complex", "number"], VM = /* @__PURE__ */ q(Vl, ZM, (e) => {
  var {
    typed: r,
    add: t,
    multiply: n,
    Complex: a,
    number: i
  } = e;
  return r(Vl, {
    "Array,Array,number": function(s, u, f) {
      return o(s, u, f);
    },
    "Array,Array": function(s, u) {
      return o(s, u, 1);
    },
    "Matrix,Matrix,number": function(s, u, f) {
      return o(s.valueOf(), u.valueOf(), f);
    },
    "Matrix,Matrix": function(s, u) {
      return o(s.valueOf(), u.valueOf(), 1);
    }
  });
  function o(l, s, u) {
    l.some((D) => D.type === "BigNumber") && (l = l.map((D) => i(D))), s.some((D) => D.type === "BigNumber") && (s = s.map((D) => i(D)));
    for (var f = [a(1, 0)], m = [a(1, 0)], v = 0; v < l.length; v++) {
      var p = l[v];
      typeof p == "number" && (p = a(p, 0)), f = c(f, [a(1, 0), a(-p.re, -p.im)]);
    }
    for (var d = 0; d < s.length; d++) {
      var b = s[d];
      typeof b == "number" && (b = a(b, 0)), m = c(m, [a(1, 0), a(-b.re, -b.im)]);
    }
    for (var x = 0; x < f.length; x++)
      f[x] = n(f[x], u);
    return [f, m];
  }
  function c(l, s) {
    for (var u = [], f = 0; f < l.length + s.length - 1; f++) {
      u[f] = a(0, 0);
      for (var m = 0; m < l.length; m++)
        f - m >= 0 && f - m < s.length && (u[f] = t(u[f], n(l[m], s[f - m])));
    }
    return u;
  }
}), Wl = "freqz", WM = ["typed", "add", "multiply", "Complex", "divide", "matrix"], YM = /* @__PURE__ */ q(Wl, WM, (e) => {
  var {
    typed: r,
    add: t,
    multiply: n,
    Complex: a,
    divide: i,
    matrix: o
  } = e;
  return r(Wl, {
    "Array, Array": function(u, f) {
      var m = l(512);
      return c(u, f, m);
    },
    "Array, Array, Array": function(u, f, m) {
      return c(u, f, m);
    },
    "Array, Array, number": function(u, f, m) {
      if (m < 0)
        throw new Error("w must be a positive number");
      var v = l(m);
      return c(u, f, v);
    },
    "Matrix, Matrix": function(u, f) {
      var m = l(512), {
        w: v,
        h: p
      } = c(u.valueOf(), f.valueOf(), m);
      return {
        w: o(v),
        h: o(p)
      };
    },
    "Matrix, Matrix, Matrix": function(u, f, m) {
      var {
        h: v
      } = c(u.valueOf(), f.valueOf(), m.valueOf());
      return {
        h: o(v),
        w: o(m)
      };
    },
    "Matrix, Matrix, number": function(u, f, m) {
      if (m < 0)
        throw new Error("w must be a positive number");
      var v = l(m), {
        h: p
      } = c(u.valueOf(), f.valueOf(), v);
      return {
        h: o(p),
        w: o(v)
      };
    }
  });
  function c(s, u, f) {
    for (var m = [], v = [], p = 0; p < f.length; p++) {
      for (var d = a(0, 0), b = a(0, 0), x = 0; x < s.length; x++)
        d = t(d, n(s[x], a(Math.cos(-x * f[p]), Math.sin(-x * f[p]))));
      for (var D = 0; D < u.length; D++)
        b = t(b, n(u[D], a(Math.cos(-D * f[p]), Math.sin(-D * f[p]))));
      m.push(d), v.push(b);
    }
    for (var h = [], w = 0; w < m.length; w++)
      h.push(i(m[w], v[w]));
    return {
      h,
      w: f
    };
  }
  function l(s) {
    for (var u = [], f = 0; f < s; f++)
      u.push(f / s * Math.PI);
    return u;
  }
}), XM = "reviver", JM = ["classes"], QM = /* @__PURE__ */ q(XM, JM, (e) => {
  var {
    classes: r
  } = e;
  return function(n, a) {
    var i = r[a && a.mathjs];
    return i && typeof i.fromJSON == "function" ? i.fromJSON(a) : a;
  };
}), KM = "replacer", jM = [], e3 = /* @__PURE__ */ q(KM, jM, () => function(r, t) {
  return typeof t == "number" && (!isFinite(t) || isNaN(t)) ? {
    mathjs: "number",
    value: String(t)
  } : typeof t == "bigint" ? {
    mathjs: "bigint",
    value: String(t)
  } : t;
}), r3 = "13.2.0", t3 = /* @__PURE__ */ q("true", [], () => !0), n3 = /* @__PURE__ */ q("false", [], () => !1), a3 = /* @__PURE__ */ q("null", [], () => null), i3 = /* @__PURE__ */ Mr("Infinity", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(1 / 0) : 1 / 0;
}), o3 = /* @__PURE__ */ Mr("NaN", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(NaN) : NaN;
}), s3 = /* @__PURE__ */ Mr("pi", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? fi(t) : bd;
}), u3 = /* @__PURE__ */ Mr("tau", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? Lb(t) : xd;
}), l3 = /* @__PURE__ */ Mr("e", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? Pb(t) : wd;
}), c3 = /* @__PURE__ */ Mr("phi", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? Ub(t) : Dd;
}), f3 = /* @__PURE__ */ Mr("LN2", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(2).ln() : Math.LN2;
}), m3 = /* @__PURE__ */ Mr("LN10", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(10).ln() : Math.LN10;
}), v3 = /* @__PURE__ */ Mr("LOG2E", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(1).div(new t(2).ln()) : Math.LOG2E;
}), p3 = /* @__PURE__ */ Mr("LOG10E", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(1).div(new t(10).ln()) : Math.LOG10E;
}), d3 = /* @__PURE__ */ Mr(
  // eslint-disable-line camelcase
  "SQRT1_2",
  ["config", "?BigNumber"],
  (e) => {
    var {
      config: r,
      BigNumber: t
    } = e;
    return r.number === "BigNumber" ? new t("0.5").sqrt() : Math.SQRT1_2;
  }
), h3 = /* @__PURE__ */ Mr("SQRT2", ["config", "?BigNumber"], (e) => {
  var {
    config: r,
    BigNumber: t
  } = e;
  return r.number === "BigNumber" ? new t(2).sqrt() : Math.SQRT2;
}), g3 = /* @__PURE__ */ Mr("i", ["Complex"], (e) => {
  var {
    Complex: r
  } = e;
  return r.I;
}), y3 = /* @__PURE__ */ q("PI", ["pi"], (e) => {
  var {
    pi: r
  } = e;
  return r;
}), b3 = /* @__PURE__ */ q("E", ["e"], (e) => {
  var {
    e: r
  } = e;
  return r;
}), x3 = /* @__PURE__ */ q("version", [], () => r3);
function Mr(e, r, t) {
  return q(e, r, t, {
    recreateOnConfigChange: !0
  });
}
var w3 = /* @__PURE__ */ Ie("speedOfLight", "299792458", "m s^-1"), D3 = /* @__PURE__ */ Ie("gravitationConstant", "6.67430e-11", "m^3 kg^-1 s^-2"), N3 = /* @__PURE__ */ Ie("planckConstant", "6.62607015e-34", "J s"), A3 = /* @__PURE__ */ Ie("reducedPlanckConstant", "1.0545718176461565e-34", "J s"), E3 = /* @__PURE__ */ Ie("magneticConstant", "1.25663706212e-6", "N A^-2"), S3 = /* @__PURE__ */ Ie("electricConstant", "8.8541878128e-12", "F m^-1"), C3 = /* @__PURE__ */ Ie("vacuumImpedance", "376.730313667", "ohm"), M3 = /* @__PURE__ */ Ie("coulomb", "8.987551792261171e9", "N m^2 C^-2"), _3 = /* @__PURE__ */ Ie("elementaryCharge", "1.602176634e-19", "C"), F3 = /* @__PURE__ */ Ie("bohrMagneton", "9.2740100783e-24", "J T^-1"), T3 = /* @__PURE__ */ Ie("conductanceQuantum", "7.748091729863649e-5", "S"), B3 = /* @__PURE__ */ Ie("inverseConductanceQuantum", "12906.403729652257", "ohm"), O3 = /* @__PURE__ */ Ie("magneticFluxQuantum", "2.0678338484619295e-15", "Wb"), $3 = /* @__PURE__ */ Ie("nuclearMagneton", "5.0507837461e-27", "J T^-1"), I3 = /* @__PURE__ */ Ie("klitzing", "25812.807459304513", "ohm"), q3 = /* @__PURE__ */ Ie("bohrRadius", "5.29177210903e-11", "m"), R3 = /* @__PURE__ */ Ie("classicalElectronRadius", "2.8179403262e-15", "m"), z3 = /* @__PURE__ */ Ie("electronMass", "9.1093837015e-31", "kg"), P3 = /* @__PURE__ */ Ie("fermiCoupling", "1.1663787e-5", "GeV^-2"), U3 = da("fineStructure", 0.0072973525693), L3 = /* @__PURE__ */ Ie("hartreeEnergy", "4.3597447222071e-18", "J"), k3 = /* @__PURE__ */ Ie("protonMass", "1.67262192369e-27", "kg"), H3 = /* @__PURE__ */ Ie("deuteronMass", "3.3435830926e-27", "kg"), G3 = /* @__PURE__ */ Ie("neutronMass", "1.6749271613e-27", "kg"), Z3 = /* @__PURE__ */ Ie("quantumOfCirculation", "3.6369475516e-4", "m^2 s^-1"), V3 = /* @__PURE__ */ Ie("rydberg", "10973731.568160", "m^-1"), W3 = /* @__PURE__ */ Ie("thomsonCrossSection", "6.6524587321e-29", "m^2"), Y3 = da("weakMixingAngle", 0.2229), X3 = da("efimovFactor", 22.7), J3 = /* @__PURE__ */ Ie("atomicMass", "1.66053906660e-27", "kg"), Q3 = /* @__PURE__ */ Ie("avogadro", "6.02214076e23", "mol^-1"), K3 = /* @__PURE__ */ Ie("boltzmann", "1.380649e-23", "J K^-1"), j3 = /* @__PURE__ */ Ie("faraday", "96485.33212331001", "C mol^-1"), e_ = /* @__PURE__ */ Ie("firstRadiation", "3.7417718521927573e-16", "W m^2"), r_ = /* @__PURE__ */ Ie("loschmidt", "2.686780111798444e25", "m^-3"), t_ = /* @__PURE__ */ Ie("gasConstant", "8.31446261815324", "J K^-1 mol^-1"), n_ = /* @__PURE__ */ Ie("molarPlanckConstant", "3.990312712893431e-10", "J s mol^-1"), a_ = /* @__PURE__ */ Ie("molarVolume", "0.022413969545014137", "m^3 mol^-1"), i_ = da("sackurTetrode", -1.16487052358), o_ = /* @__PURE__ */ Ie("secondRadiation", "0.014387768775039337", "m K"), s_ = /* @__PURE__ */ Ie("stefanBoltzmann", "5.67037441918443e-8", "W m^-2 K^-4"), u_ = /* @__PURE__ */ Ie("wienDisplacement", "2.897771955e-3", "m K"), l_ = /* @__PURE__ */ Ie("molarMass", "0.99999999965e-3", "kg mol^-1"), c_ = /* @__PURE__ */ Ie("molarMassC12", "11.9999999958e-3", "kg mol^-1"), f_ = /* @__PURE__ */ Ie("gravity", "9.80665", "m s^-2"), m_ = /* @__PURE__ */ Ie("planckLength", "1.616255e-35", "m"), v_ = /* @__PURE__ */ Ie("planckMass", "2.176435e-8", "kg"), p_ = /* @__PURE__ */ Ie("planckTime", "5.391245e-44", "s"), d_ = /* @__PURE__ */ Ie("planckCharge", "1.87554603778e-18", "C"), h_ = /* @__PURE__ */ Ie("planckTemperature", "1.416785e+32", "K");
function Ie(e, r, t) {
  var n = ["config", "Unit", "BigNumber"];
  return q(e, n, (a) => {
    var {
      config: i,
      Unit: o,
      BigNumber: c
    } = a, l = i.number === "BigNumber" ? new c(r) : parseFloat(r), s = new o(l, t);
    return s.fixPrefix = !0, s;
  });
}
function da(e, r) {
  var t = ["config", "BigNumber"];
  return q(e, t, (n) => {
    var {
      config: a,
      BigNumber: i
    } = n;
    return a.number === "BigNumber" ? new i(r) : r;
  });
}
var g_ = "apply", y_ = ["typed", "isInteger"], b_ = /* @__PURE__ */ q(g_, y_, (e) => {
  var {
    typed: r,
    isInteger: t
  } = e, n = ii({
    typed: r,
    isInteger: t
  });
  return r("apply", {
    "...any": function(i) {
      var o = i[1];
      Oe(o) ? i[1] = o - 1 : Be(o) && (i[1] = o.minus(1));
      try {
        return n.apply(null, i);
      } catch (c) {
        throw br(c);
      }
    }
  });
}, {
  isTransformFunction: !0
}), x_ = "column", w_ = ["typed", "Index", "matrix", "range"], D_ = /* @__PURE__ */ q(x_, w_, (e) => {
  var {
    typed: r,
    Index: t,
    matrix: n,
    range: a
  } = e, i = Jf({
    typed: r,
    Index: t,
    matrix: n,
    range: a
  });
  return r("column", {
    "...any": function(c) {
      var l = c.length - 1, s = c[l];
      Oe(s) && (c[l] = s - 1);
      try {
        return i.apply(null, c);
      } catch (u) {
        throw br(u);
      }
    }
  });
}, {
  isTransformFunction: !0
});
function xi(e, r, t) {
  var n = e.filter(function(l) {
    return nr(l) && !(l.name in r) && !t.has(l.name);
  })[0];
  if (!n)
    throw new Error('No undefined variable found in inline expression "' + e + '"');
  var a = n.name, i = /* @__PURE__ */ new Map(), o = new ic(t, i, /* @__PURE__ */ new Set([a])), c = e.compile();
  return function(s) {
    return i.set(a, s), c.evaluate(o);
  };
}
var N_ = "transformCallback", A_ = ["typed"], wi = /* @__PURE__ */ q(N_, A_, (e) => {
  var {
    typed: r
  } = e;
  return function(n, a) {
    return r.isTypedFunction(n) ? t(n, a) : Yl(n, n.length, a);
  };
  function t(n, a) {
    var i = Object.fromEntries(Object.entries(n.signatures).map((o) => {
      var [c, l] = o, s = c.split(",").length;
      return r.isTypedFunction(l) ? [c, t(l, a)] : [c, Yl(l, s, a)];
    }));
    return typeof n.name == "string" ? r(n.name, i) : r(i);
  }
});
function Yl(e, r, t) {
  return r === t ? e : r === t + 1 ? function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a.slice(0, t), c = Xl(a[t]);
    return e(...o, c);
  } : r > t + 1 ? function() {
    for (var n = arguments.length, a = new Array(n), i = 0; i < n; i++)
      a[i] = arguments[i];
    var o = a.slice(0, t), c = Xl(a[t]), l = a.slice(t + 1);
    return e(...o, c, ...l);
  } : e;
}
function Xl(e) {
  return e.map((r) => r + 1);
}
var E_ = "filter", S_ = ["typed"], C_ = /* @__PURE__ */ q(E_, S_, (e) => {
  var {
    typed: r
  } = e;
  function t(a, i, o) {
    var c = Qf({
      typed: r
    }), l = wi({
      typed: r
    });
    if (a.length === 0)
      return c();
    var s = a[0];
    if (a.length === 1)
      return c(s);
    var u = a.length - 1, f = a[u];
    return s && (s = n(s, o)), f && (nr(f) || Pt(f) ? f = n(f, o) : f = xi(f, i, o)), c(s, l(f, u));
  }
  t.rawArgs = !0;
  function n(a, i) {
    return a.compile().evaluate(i);
  }
  return t;
}, {
  isTransformFunction: !0
}), M_ = "forEach", __ = ["typed"], F_ = /* @__PURE__ */ q(M_, __, (e) => {
  var {
    typed: r
  } = e, t = Kf({
    typed: r
  }), n = wi({
    typed: r
  });
  function a(o, c, l) {
    if (o.length === 0)
      return t();
    var s = o[0];
    if (o.length === 1)
      return t(s);
    var u = o.length - 1, f = o[u];
    return s && (s = i(s, l)), f && (nr(f) || Pt(f) ? f = i(f, l) : f = xi(f, c, l)), t(s, n(f, u));
  }
  a.rawArgs = !0;
  function i(o, c) {
    return o.compile().evaluate(c);
  }
  return a;
}, {
  isTransformFunction: !0
}), T_ = "index", B_ = ["Index", "getMatrixDataType"], O_ = /* @__PURE__ */ q(T_, B_, (e) => {
  var {
    Index: r,
    getMatrixDataType: t
  } = e;
  return function() {
    for (var a = [], i = 0, o = arguments.length; i < o; i++) {
      var c = arguments[i];
      if (aa(c))
        c.start--, c.end -= c.step > 0 ? 0 : 2;
      else if (c && c.isSet === !0)
        c = c.map(function(s) {
          return s - 1;
        });
      else if (Ze(c) || Ce(c))
        t(c) !== "boolean" && (c = c.map(function(s) {
          return s - 1;
        }));
      else if (Oe(c))
        c--;
      else if (Be(c))
        c = c.toNumber() - 1;
      else if (typeof c != "string") throw new TypeError("Dimension must be an Array, Matrix, number, string, or Range");
      a[i] = c;
    }
    var l = new r();
    return r.apply(l, a), l;
  };
}, {
  isTransformFunction: !0
}), $_ = "map", I_ = ["typed"], q_ = /* @__PURE__ */ q($_, I_, (e) => {
  var {
    typed: r
  } = e, t = jf({
    typed: r
  }), n = wi({
    typed: r
  });
  function a(i, o, c) {
    if (i.length === 0)
      return t();
    if (i.length === 1)
      return t(i[0]);
    var l = i.length - 1, s = i.slice(0, l), u = i[l];
    return s = s.map((m) => f(m, c)), u && (nr(u) || Pt(u) ? u = f(u, c) : u = xi(u, o, c)), t(...s, n(u, l));
    function f(m, v) {
      return m.compile().evaluate(v);
    }
  }
  return a.rawArgs = !0, a;
}, {
  isTransformFunction: !0
});
function R_(e) {
  return Oe(e) ? e - 1 : Be(e) ? e.minus(1) : e;
}
function z_(e) {
  return Oe(e) || Be(e);
}
function ct(e) {
  if (e.length === 2 && Cr(e[0])) {
    e = e.slice();
    var r = e[1];
    z_(r) && (e[1] = R_(r));
  }
  return e;
}
var P_ = "max", U_ = ["typed", "config", "numeric", "larger"], L_ = /* @__PURE__ */ q(P_, U_, (e) => {
  var {
    typed: r,
    config: t,
    numeric: n,
    larger: a
  } = e, i = lm({
    typed: r,
    config: t,
    numeric: n,
    larger: a
  });
  return r("max", {
    "...any": function(c) {
      c = ct(c);
      try {
        return i.apply(null, c);
      } catch (l) {
        throw br(l);
      }
    }
  });
}, {
  isTransformFunction: !0
}), k_ = "mean", H_ = ["typed", "add", "divide"], G_ = /* @__PURE__ */ q(k_, H_, (e) => {
  var {
    typed: r,
    add: t,
    divide: n
  } = e, a = ym({
    typed: r,
    add: t,
    divide: n
  });
  return r("mean", {
    "...any": function(o) {
      o = ct(o);
      try {
        return a.apply(null, o);
      } catch (c) {
        throw br(c);
      }
    }
  });
}, {
  isTransformFunction: !0
}), Z_ = "min", V_ = ["typed", "config", "numeric", "smaller"], W_ = /* @__PURE__ */ q(Z_, V_, (e) => {
  var {
    typed: r,
    config: t,
    numeric: n,
    smaller: a
  } = e, i = cm({
    typed: r,
    config: t,
    numeric: n,
    smaller: a
  });
  return r("min", {
    "...any": function(c) {
      c = ct(c);
      try {
        return i.apply(null, c);
      } catch (l) {
        throw br(l);
      }
    }
  });
}, {
  isTransformFunction: !0
}), Y_ = "range", X_ = ["typed", "config", "?matrix", "?bignumber", "smaller", "smallerEq", "larger", "largerEq", "add", "isPositive"], J_ = /* @__PURE__ */ q(Y_, X_, (e) => {
  var {
    typed: r,
    config: t,
    matrix: n,
    bignumber: a,
    smaller: i,
    smallerEq: o,
    larger: c,
    largerEq: l,
    add: s,
    isPositive: u
  } = e, f = nm({
    typed: r,
    config: t,
    matrix: n,
    bignumber: a,
    smaller: i,
    smallerEq: o,
    larger: c,
    largerEq: l,
    add: s,
    isPositive: u
  });
  return r("range", {
    "...any": function(v) {
      var p = v.length - 1, d = v[p];
      return typeof d != "boolean" && v.push(!0), f.apply(null, v);
    }
  });
}, {
  isTransformFunction: !0
}), Q_ = "row", K_ = ["typed", "Index", "matrix", "range"], j_ = /* @__PURE__ */ q(Q_, K_, (e) => {
  var {
    typed: r,
    Index: t,
    matrix: n,
    range: a
  } = e, i = am({
    typed: r,
    Index: t,
    matrix: n,
    range: a
  });
  return r("row", {
    "...any": function(c) {
      var l = c.length - 1, s = c[l];
      Oe(s) && (c[l] = s - 1);
      try {
        return i.apply(null, c);
      } catch (u) {
        throw br(u);
      }
    }
  });
}, {
  isTransformFunction: !0
}), eF = "subset", rF = ["typed", "matrix", "zeros", "add"], tF = /* @__PURE__ */ q(eF, rF, (e) => {
  var {
    typed: r,
    matrix: t,
    zeros: n,
    add: a
  } = e, i = im({
    typed: r,
    matrix: t,
    zeros: n,
    add: a
  });
  return r("subset", {
    "...any": function(c) {
      try {
        return i.apply(null, c);
      } catch (l) {
        throw br(l);
      }
    }
  });
}, {
  isTransformFunction: !0
}), nF = "concat", aF = ["typed", "matrix", "isInteger"], iF = /* @__PURE__ */ q(nF, aF, (e) => {
  var {
    typed: r,
    matrix: t,
    isInteger: n
  } = e, a = Xf({
    typed: r,
    matrix: t,
    isInteger: n
  });
  return r("concat", {
    "...any": function(o) {
      var c = o.length - 1, l = o[c];
      Oe(l) ? o[c] = l - 1 : Be(l) && (o[c] = l.minus(1));
      try {
        return a.apply(null, o);
      } catch (s) {
        throw br(s);
      }
    }
  });
}, {
  isTransformFunction: !0
}), Jl = "diff", oF = ["typed", "matrix", "subtract", "number", "bignumber"], sF = /* @__PURE__ */ q(Jl, oF, (e) => {
  var {
    typed: r,
    matrix: t,
    subtract: n,
    number: a,
    bignumber: i
  } = e, o = em({
    typed: r,
    matrix: t,
    subtract: n,
    number: a,
    bignumber: i
  });
  return r(Jl, {
    "...any": function(l) {
      l = ct(l);
      try {
        return o.apply(null, l);
      } catch (s) {
        throw br(s);
      }
    }
  });
}, {
  isTransformFunction: !0
}), uF = "std", lF = ["typed", "map", "sqrt", "variance"], cF = /* @__PURE__ */ q(uF, lF, (e) => {
  var {
    typed: r,
    map: t,
    sqrt: n,
    variance: a
  } = e, i = wm({
    typed: r,
    map: t,
    sqrt: n,
    variance: a
  });
  return r("std", {
    "...any": function(c) {
      c = ct(c);
      try {
        return i.apply(null, c);
      } catch (l) {
        throw br(l);
      }
    }
  });
}, {
  isTransformFunction: !0
}), Ql = "sum", fF = ["typed", "config", "add", "numeric"], mF = /* @__PURE__ */ q(Ql, fF, (e) => {
  var {
    typed: r,
    config: t,
    add: n,
    numeric: a
  } = e, i = hm({
    typed: r,
    config: t,
    add: n,
    numeric: a
  });
  return r(Ql, {
    "...any": function(c) {
      c = ct(c);
      try {
        return i.apply(null, c);
      } catch (l) {
        throw br(l);
      }
    }
  });
}, {
  isTransformFunction: !0
}), vF = "quantileSeq", pF = ["typed", "bignumber", "add", "subtract", "divide", "multiply", "partitionSelect", "compare", "isInteger", "smaller", "smallerEq", "larger"], dF = /* @__PURE__ */ q(vF, pF, (e) => {
  var {
    typed: r,
    bignumber: t,
    add: n,
    subtract: a,
    divide: i,
    multiply: o,
    partitionSelect: c,
    compare: l,
    isInteger: s,
    smaller: u,
    smallerEq: f,
    larger: m
  } = e, v = xm({
    typed: r,
    bignumber: t,
    add: n,
    subtract: a,
    divide: i,
    multiply: o,
    partitionSelect: c,
    compare: l,
    isInteger: s,
    smaller: u,
    smallerEq: f,
    larger: m
  });
  return r("quantileSeq", {
    "Array | Matrix, number | BigNumber": v,
    "Array | Matrix, number | BigNumber, number": (d, b, x) => v(d, b, p(x)),
    "Array | Matrix, number | BigNumber, boolean": v,
    "Array | Matrix, number | BigNumber, boolean, number": (d, b, x, D) => v(d, b, x, p(D)),
    "Array | Matrix, Array | Matrix": v,
    "Array | Matrix, Array | Matrix, number": (d, b, x) => v(d, b, p(x)),
    "Array | Matrix, Array | Matrix, boolean": v,
    "Array | Matrix, Array | Matrix, boolean, number": (d, b, x, D) => v(d, b, x, p(D))
  });
  function p(d) {
    return ct([[], d])[1];
  }
}, {
  isTransformFunction: !0
}), Kl = "cumsum", hF = ["typed", "add", "unaryPlus"], gF = /* @__PURE__ */ q(Kl, hF, (e) => {
  var {
    typed: r,
    add: t,
    unaryPlus: n
  } = e, a = gm({
    typed: r,
    add: t,
    unaryPlus: n
  });
  return r(Kl, {
    "...any": function(o) {
      if (o.length === 2 && Cr(o[0])) {
        var c = o[1];
        Oe(c) ? o[1] = c - 1 : Be(c) && (o[1] = c.minus(1));
      }
      try {
        return a.apply(null, o);
      } catch (l) {
        throw br(l);
      }
    }
  });
}, {
  isTransformFunction: !0
}), jl = "variance", yF = ["typed", "add", "subtract", "multiply", "divide", "apply", "isNaN"], bF = /* @__PURE__ */ q(jl, yF, (e) => {
  var {
    typed: r,
    add: t,
    subtract: n,
    multiply: a,
    divide: i,
    apply: o,
    isNaN: c
  } = e, l = bm({
    typed: r,
    add: t,
    subtract: n,
    multiply: a,
    divide: i,
    apply: o,
    isNaN: c
  });
  return r(jl, {
    "...any": function(u) {
      u = ct(u);
      try {
        return l.apply(null, u);
      } catch (f) {
        throw br(f);
      }
    }
  });
}, {
  isTransformFunction: !0
}), ec = "print", xF = ["typed", "matrix", "zeros", "add"], wF = /* @__PURE__ */ q(ec, xF, (e) => {
  var {
    typed: r,
    matrix: t,
    zeros: n,
    add: a
  } = e, i = sm({
    typed: r,
    matrix: t,
    zeros: n,
    add: a
  });
  return r(ec, {
    "string, Object | Array": function(l, s) {
      return i(o(l), s);
    },
    "string, Object | Array, number | Object": function(l, s, u) {
      return i(o(l), s, u);
    }
  });
  function o(c) {
    return c.replace(om, (l) => {
      var s = l.slice(1).split("."), u = s.map(function(f) {
        return !isNaN(f) && f.length > 0 ? parseInt(f) - 1 : f;
      });
      return "$" + u.join(".");
    });
  }
}, {
  isTransformFunction: !0
}), DF = "and", NF = ["typed", "matrix", "zeros", "add", "equalScalar", "not", "concat"], AF = /* @__PURE__ */ q(DF, NF, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    not: i,
    concat: o
  } = e, c = um({
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    not: i,
    concat: o
  });
  function l(s, u, f) {
    var m = s[0].compile().evaluate(f);
    if (!Cr(m) && !c(m, !0))
      return !1;
    var v = s[1].compile().evaluate(f);
    return c(m, v);
  }
  return l.rawArgs = !0, l;
}, {
  isTransformFunction: !0
}), EF = "or", SF = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], CF = /* @__PURE__ */ q(EF, SF, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  } = e, o = Yf({
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  });
  function c(l, s, u) {
    var f = l[0].compile().evaluate(u);
    if (!Cr(f) && o(f, !1))
      return !0;
    var m = l[1].compile().evaluate(u);
    return o(f, m);
  }
  return c.rawArgs = !0, c;
}, {
  isTransformFunction: !0
}), MF = "bitAnd", _F = ["typed", "matrix", "zeros", "add", "equalScalar", "not", "concat"], FF = /* @__PURE__ */ q(MF, _F, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    not: i,
    concat: o
  } = e, c = Vf({
    typed: r,
    matrix: t,
    equalScalar: n,
    zeros: a,
    not: i,
    concat: o
  });
  function l(s, u, f) {
    var m = s[0].compile().evaluate(f);
    if (!Cr(m)) {
      if (isNaN(m))
        return NaN;
      if (m === 0 || m === !1)
        return 0;
    }
    var v = s[1].compile().evaluate(f);
    return c(m, v);
  }
  return l.rawArgs = !0, l;
}, {
  isTransformFunction: !0
}), TF = "bitOr", BF = ["typed", "matrix", "equalScalar", "DenseMatrix", "concat"], OF = /* @__PURE__ */ q(TF, BF, (e) => {
  var {
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  } = e, o = Wf({
    typed: r,
    matrix: t,
    equalScalar: n,
    DenseMatrix: a,
    concat: i
  });
  function c(l, s, u) {
    var f = l[0].compile().evaluate(u);
    if (!Cr(f)) {
      if (isNaN(f))
        return NaN;
      if (f === -1)
        return -1;
      if (f === !0)
        return 1;
    }
    var m = l[1].compile().evaluate(u);
    return o(f, m);
  }
  return c.rawArgs = !0, c;
}, {
  isTransformFunction: !0
});
const $F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createAbs: Mh,
  createAccessorNode: Ow,
  createAcos: Kb,
  createAcosh: ex,
  createAcot: tx,
  createAcoth: ax,
  createAcsc: ox,
  createAcsch: ux,
  createAdd: gw,
  createAddScalar: Bh,
  createAnd: um,
  createAndTransform: AF,
  createApply: ii,
  createApplyTransform: b_,
  createArg: gg,
  createArrayNode: Iw,
  createAsec: cx,
  createAsech: mx,
  createAsin: px,
  createAsinh: gx,
  createAssignmentNode: Pw,
  createAtan: xx,
  createAtan2: Dx,
  createAtanh: Ax,
  createAtomicMass: J3,
  createAvogadro: Q3,
  createBellNumbers: bM,
  createBigNumberClass: Tp,
  createBigint: jd,
  createBignumber: oh,
  createBin: J1,
  createBitAnd: Vf,
  createBitAndTransform: FF,
  createBitNot: cg,
  createBitOr: Wf,
  createBitOrTransform: OF,
  createBitXor: dg,
  createBlockNode: Lw,
  createBohrMagneton: F3,
  createBohrRadius: q3,
  createBoltzmann: K3,
  createBoolean: nh,
  createCatalan: wM,
  createCbrt: qh,
  createCeil: Zh,
  createChain: kS,
  createChainClass: f2,
  createClassicalElectronRadius: R3,
  createClone: pd,
  createColumn: Jf,
  createColumnTransform: D_,
  createCombinations: TC,
  createCombinationsWithRep: OC,
  createCompare: Hy,
  createCompareNatural: Yy,
  createCompareText: Qy,
  createCompile: xD,
  createComplex: lh,
  createComplexClass: Rp,
  createComposition: NM,
  createConcat: Xf,
  createConcatTransform: iF,
  createConditionalNode: Hw,
  createConductanceQuantum: T3,
  createConj: bg,
  createConstantNode: Qw,
  createCorr: _C,
  createCos: Sx,
  createCosh: Mx,
  createCot: Fx,
  createCoth: Bx,
  createCoulomb: M3,
  createCount: Bg,
  createCreateUnit: Jb,
  createCross: $g,
  createCsc: $x,
  createCsch: qx,
  createCtranspose: D1,
  createCube: Wh,
  createCumSum: gm,
  createCumSumTransform: gF,
  createDeepEqual: hb,
  createDenseMatrixClass: md,
  createDerivative: kM,
  createDet: GS,
  createDeuteronMass: H3,
  createDiag: qg,
  createDiff: em,
  createDiffTransform: sF,
  createDistance: pC,
  createDivide: mC,
  createDivideScalar: cy,
  createDot: Nw,
  createDotDivide: Ay,
  createDotMultiply: tg,
  createDotPow: Dy,
  createE: l3,
  createEfimovFactor: X3,
  createEigs: jS,
  createElectricConstant: S3,
  createElectronMass: z3,
  createElementaryCharge: _3,
  createEqual: jy,
  createEqualScalar: kd,
  createEqualText: tb,
  createErf: R1,
  createEvaluate: DD,
  createExp: Xh,
  createExpm: rC,
  createExpm1: Qh,
  createFactorial: PC,
  createFalse: n3,
  createFaraday: j3,
  createFermiCoupling: P3,
  createFft: S1,
  createFibonacciHeapClass: $b,
  createFilter: Qf,
  createFilterTransform: C_,
  createFineStructure: U3,
  createFirstRadiation: e_,
  createFix: e0,
  createFlatten: Ug,
  createFloor: Hf,
  createForEach: Kf,
  createForEachTransform: F_,
  createFormat: Y1,
  createFraction: mh,
  createFractionClass: Zp,
  createFreqz: YM,
  createFunctionAssignmentNode: jw,
  createFunctionNode: hD,
  createGamma: IC,
  createGasConstant: t_,
  createGcd: A0,
  createGetMatrixDataType: Gg,
  createGravitationConstant: D3,
  createGravity: f_,
  createHartreeEnergy: L3,
  createHasNumericValue: Td,
  createHelp: US,
  createHelpClass: u2,
  createHex: ey,
  createHypot: bw,
  createI: g3,
  createIdentity: Vg,
  createIfft: M1,
  createIm: wg,
  createImmutableDenseMatrixClass: Mb,
  createIndex: Mw,
  createIndexClass: Tb,
  createIndexNode: rD,
  createIndexTransform: O_,
  createInfinity: i3,
  createIntersect: gC,
  createInv: VS,
  createInverseConductanceQuantum: B3,
  createInvmod: K0,
  createIsInteger: hd,
  createIsNaN: Rd,
  createIsNegative: Cd,
  createIsNumeric: _d,
  createIsPositive: Od,
  createIsPrime: iy,
  createIsZero: Id,
  createKldivergence: LC,
  createKlitzing: I3,
  createKron: Yg,
  createLN10: m3,
  createLN2: f3,
  createLOG10E: p3,
  createLOG2E: v3,
  createLarger: cb,
  createLargerEq: vb,
  createLcm: M0,
  createLeafCount: EM,
  createLeftShift: qy,
  createLgamma: RC,
  createLog: hy,
  createLog10: F0,
  createLog1p: yy,
  createLog2: B0,
  createLoschmidt: r_,
  createLsolve: Sy,
  createLsolveAll: Fy,
  createLup: _D,
  createLusolve: n2,
  createLyap: lC,
  createMad: AC,
  createMagneticConstant: E3,
  createMagneticFluxQuantum: O3,
  createMap: jf,
  createMapTransform: q_,
  createMatrix: ph,
  createMatrixClass: Qp,
  createMatrixFromColumns: xh,
  createMatrixFromFunction: hh,
  createMatrixFromRows: yh,
  createMax: lm,
  createMaxTransform: L_,
  createMean: ym,
  createMeanTransform: G_,
  createMedian: DC,
  createMin: cm,
  createMinTransform: W_,
  createMod: Gf,
  createMode: G1,
  createMolarMass: l_,
  createMolarMassC12: c_,
  createMolarPlanckConstant: n_,
  createMolarVolume: a_,
  createMultinomial: HC,
  createMultiply: R0,
  createMultiplyScalar: I0,
  createNaN: o3,
  createNeutronMass: G3,
  createNode: Tw,
  createNorm: ww,
  createNot: Eg,
  createNthRoot: P0,
  createNthRoots: xy,
  createNuclearMagneton: $3,
  createNull: a3,
  createNumber: Jd,
  createNumeric: uy,
  createObjectNode: nD,
  createOct: K1,
  createOnes: jg,
  createOperatorNode: iD,
  createOr: Yf,
  createOrTransform: CF,
  createParenthesisNode: sD,
  createParse: yD,
  createParser: CD,
  createParserClass: ED,
  createPartitionSelect: wb,
  createPermutations: ZC,
  createPhi: c3,
  createPi: s3,
  createPickRandom: fM,
  createPinv: YS,
  createPlanckCharge: d_,
  createPlanckConstant: N3,
  createPlanckLength: m_,
  createPlanckMass: v_,
  createPlanckTemperature: h_,
  createPlanckTime: p_,
  createPolynomialRoot: i2,
  createPow: my,
  createPrint: sm,
  createPrintTransform: wF,
  createProd: V1,
  createProtonMass: k3,
  createQr: TD,
  createQuantileSeq: xm,
  createQuantileSeqTransform: dF,
  createQuantumOfCirculation: Z3,
  createRandom: vM,
  createRandomInt: dM,
  createRange: nm,
  createRangeClass: Yp,
  createRangeNode: lD,
  createRangeTransform: J_,
  createRationalize: GM,
  createRe: Ng,
  createReducedPlanckConstant: A3,
  createRelationalNode: fD,
  createReplacer: e3,
  createReshape: t1,
  createResize: i1,
  createResolve: zM,
  createResultSet: Iv,
  createReviver: QM,
  createRightArithShift: zy,
  createRightLogShift: Uy,
  createRotate: s1,
  createRotationMatrix: l1,
  createRound: py,
  createRow: am,
  createRowTransform: j_,
  createRydberg: V3,
  createSQRT1_2: d3,
  createSQRT2: h3,
  createSackurTetrode: i_,
  createSchur: sC,
  createSec: zx,
  createSech: Ux,
  createSecondRadiation: o_,
  createSetCartesian: Qx,
  createSetDifference: jx,
  createSetDistinct: rw,
  createSetIntersect: nw,
  createSetIsSubset: iw,
  createSetMultiplicity: sw,
  createSetPowerset: lw,
  createSetSize: fw,
  createSetSymDifference: vw,
  createSetUnion: dw,
  createSign: L0,
  createSimplify: FM,
  createSimplifyConstant: OM,
  createSimplifyCore: IM,
  createSin: kx,
  createSinh: Gx,
  createSize: m1,
  createSlu: r2,
  createSmaller: ab,
  createSmallerEq: sb,
  createSolveODE: $1,
  createSort: Nb,
  createSpaClass: Rb,
  createSparse: Yb,
  createSparseMatrixClass: Zd,
  createSpeedOfLight: w3,
  createSplitUnit: Dh,
  createSqrt: G0,
  createSqrtm: nC,
  createSquare: V0,
  createSqueeze: p1,
  createStd: wm,
  createStdTransform: cF,
  createStefanBoltzmann: s_,
  createStirlingS2: gM,
  createString: rh,
  createSubset: im,
  createSubsetTransform: tF,
  createSubtract: Y0,
  createSubtractScalar: $h,
  createSum: hm,
  createSumTransform: mF,
  createSylvester: iC,
  createSymbolNode: pD,
  createSymbolicEqual: UM,
  createTan: Vx,
  createTanh: Xx,
  createTau: u3,
  createThomsonCrossSection: W3,
  createTo: ny,
  createTrace: Sw,
  createTranspose: x1,
  createTrue: t3,
  createTypeOf: Pd,
  createTyped: Tv,
  createUnaryMinus: Ah,
  createUnaryPlus: Sh,
  createUnequal: yb,
  createUnitClass: Gb,
  createUnitFunction: Vb,
  createUppercaseE: b3,
  createUppercasePi: y3,
  createUsolve: My,
  createUsolveAll: By,
  createVacuumImpedance: C3,
  createVariance: bm,
  createVarianceTransform: bF,
  createVersion: x3,
  createWeakMixingAngle: Y3,
  createWienDisplacement: u_,
  createXgcd: J0,
  createXor: Mg,
  createZeros: A1,
  createZeta: k1,
  createZpk2tf: VM
}, Symbol.toStringTag, { value: "Module" }));
var IF = $F, Di = { exports: {} };
function Ni() {
}
Ni.prototype = {
  on: function(e, r, t) {
    var n = this.e || (this.e = {});
    return (n[e] || (n[e] = [])).push({
      fn: r,
      ctx: t
    }), this;
  },
  once: function(e, r, t) {
    var n = this;
    function a() {
      n.off(e, a), r.apply(t, arguments);
    }
    return a._ = r, this.on(e, a, t);
  },
  emit: function(e) {
    var r = [].slice.call(arguments, 1), t = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, a = t.length;
    for (n; n < a; n++)
      t[n].fn.apply(t[n].ctx, r);
    return this;
  },
  off: function(e, r) {
    var t = this.e || (this.e = {}), n = t[e], a = [];
    if (n && r)
      for (var i = 0, o = n.length; i < o; i++)
        n[i].fn !== r && n[i].fn._ !== r && a.push(n[i]);
    return a.length ? t[e] = a : delete t[e], this;
  }
};
Di.exports = Ni;
Di.exports.TinyEmitter = Ni;
var qF = Di.exports;
const RF = /* @__PURE__ */ va(qF);
function zF(e) {
  var r = new RF();
  return e.on = r.on.bind(r), e.off = r.off.bind(r), e.once = r.once.bind(r), e.emit = r.emit.bind(r), e;
}
function PF(e, r, t, n) {
  function a(b, x) {
    var D = arguments.length;
    if (D !== 1 && D !== 2)
      throw new Qr("import", D, 1, 2);
    x || (x = {});
    function h(A, E, N) {
      if (Array.isArray(E))
        E.forEach((T) => h(A, T));
      else if (typeof E == "object")
        for (var S in E)
          De(E, S) && h(A, E[S], S);
      else if (Kt(E) || N !== void 0) {
        var C = Kt(E) ? p(E) ? E.fn + ".transform" : E.fn : N;
        if (De(A, C) && A[C] !== E && !x.silent)
          throw new Error('Cannot import "' + C + '" twice');
        A[C] = E;
      } else if (!x.silent)
        throw new TypeError("Factory, Object, or Array expected");
    }
    var w = {};
    h(w, b);
    for (var y in w)
      if (De(w, y)) {
        var g = w[y];
        if (Kt(g))
          s(g, x);
        else if (u(g))
          i(y, g, x);
        else if (!x.silent)
          throw new TypeError("Factory, Object, or Array expected");
      }
  }
  function i(b, x, D) {
    if (D.wrap && typeof x == "function" && (x = l(x)), f(x) && (x = e(b, {
      [x.signature]: x
    })), e.isTypedFunction(t[b]) && e.isTypedFunction(x)) {
      D.override ? x = e(b, x.signatures) : x = e(t[b], x), t[b] = x, delete n[b], o(b, x), t.emit("import", b, function() {
        return x;
      });
      return;
    }
    if (t[b] === void 0 || D.override) {
      t[b] = x, delete n[b], o(b, x), t.emit("import", b, function() {
        return x;
      });
      return;
    }
    if (!D.silent)
      throw new Error('Cannot import "' + b + '": already exists');
  }
  function o(b, x) {
    x && typeof x.transform == "function" ? (t.expression.transform[b] = x.transform, m(b) && (t.expression.mathWithTransform[b] = x.transform)) : (delete t.expression.transform[b], m(b) && (t.expression.mathWithTransform[b] = x));
  }
  function c(b) {
    delete t.expression.transform[b], m(b) ? t.expression.mathWithTransform[b] = t[b] : delete t.expression.mathWithTransform[b];
  }
  function l(b) {
    var x = function() {
      for (var h = [], w = 0, y = arguments.length; w < y; w++) {
        var g = arguments[w];
        h[w] = g && g.valueOf();
      }
      return b.apply(t, h);
    };
    return b.transform && (x.transform = b.transform), x;
  }
  function s(b, x) {
    var D = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : b.fn;
    if (D.includes("."))
      throw new Error("Factory name should not contain a nested path. Name: " + JSON.stringify(D));
    var h = p(b) ? t.expression.transform : t, w = D in t.expression.transform, y = De(h, D) ? h[D] : void 0, g = function() {
      var E = {};
      b.dependencies.map(Ac).forEach((S) => {
        if (S.includes("."))
          throw new Error("Factory dependency should not contain a nested path. Name: " + JSON.stringify(S));
        S === "math" ? E.math = t : S === "mathWithTransform" ? E.mathWithTransform = t.expression.mathWithTransform : S === "classes" ? E.classes = t : E[S] = t[S];
      });
      var N = /* @__PURE__ */ b(E);
      if (N && typeof N.transform == "function")
        throw new Error('Transforms cannot be attached to factory functions. Please create a separate function for it with export const path = "expression.transform"');
      if (y === void 0 || x.override)
        return N;
      if (e.isTypedFunction(y) && e.isTypedFunction(N))
        return e(y, N);
      if (x.silent)
        return y;
      throw new Error('Cannot import "' + D + '": already exists');
    };
    !b.meta || b.meta.lazy !== !1 ? (On(h, D, g), y && w ? c(D) : (p(b) || v(b)) && On(t.expression.mathWithTransform, D, () => h[D])) : (h[D] = g(), y && w ? c(D) : (p(b) || v(b)) && On(t.expression.mathWithTransform, D, () => h[D])), n[D] = b, t.emit("import", D, g);
  }
  function u(b) {
    return typeof b == "function" || typeof b == "number" || typeof b == "string" || typeof b == "boolean" || b === null || wr(b) || Ir(b) || Be(b) || ht(b) || Ce(b) || Array.isArray(b);
  }
  function f(b) {
    return typeof b == "function" && typeof b.signature == "string";
  }
  function m(b) {
    return !De(d, b);
  }
  function v(b) {
    return !b.fn.includes(".") && // FIXME: make checking on path redundant, check on meta data instead
    !De(d, b.fn) && (!b.meta || !b.meta.isClass);
  }
  function p(b) {
    return b !== void 0 && b.meta !== void 0 && b.meta.isTransformFunction === !0 || !1;
  }
  var d = {
    expression: !0,
    type: !0,
    docs: !0,
    error: !0,
    json: !0,
    chain: !0
    // chain method not supported. Note that there is a unit chain too.
  };
  return a;
}
function Am(e, r) {
  var t = vr({}, ac, r);
  if (typeof Object.create != "function")
    throw new Error("ES5 not supported by this JavaScript engine. Please load the es5-shim and es5-sham library for compatibility.");
  var n = zF({
    // only here for backward compatibility for legacy factory functions
    isNumber: Oe,
    isComplex: Ir,
    isBigNumber: Be,
    isBigInt: sc,
    isFraction: ht,
    isUnit: wr,
    isString: sr,
    isArray: Ze,
    isMatrix: Ce,
    isCollection: Cr,
    isDenseMatrix: en,
    isSparseMatrix: et,
    isRange: aa,
    isIndex: on,
    isBoolean: uc,
    isResultSet: lc,
    isHelp: Ya,
    isFunction: cc,
    isDate: fc,
    isRegExp: mc,
    isObject: zt,
    isMap: vt,
    isPartitionedMap: iv,
    isObjectWrappingMap: ov,
    isNull: vc,
    isUndefined: pc,
    isAccessorNode: at,
    isArrayNode: Sr,
    isAssignmentNode: dc,
    isBlockNode: hc,
    isConditionalNode: gc,
    isConstantNode: ke,
    isFunctionAssignmentNode: Pt,
    isFunctionNode: Yr,
    isIndexNode: gt,
    isNode: Ve,
    isObjectNode: sn,
    isOperatorNode: rr,
    isParenthesisNode: Ur,
    isRangeNode: yc,
    isRelationalNode: bc,
    isSymbolNode: nr,
    isChain: Xa
  });
  n.config = fv(t, n.emit), n.expression = {
    transform: {},
    mathWithTransform: {
      config: n.config
    }
  };
  var a = [], i = [];
  function o(u) {
    if (Kt(u))
      return u(n);
    var f = u[Object.keys(u)[0]];
    if (Kt(f))
      return f(n);
    if (!lv(u))
      throw console.warn("Factory object with properties `type`, `name`, and `factory` expected", u), new Error("Factory object with properties `type`, `name`, and `factory` expected");
    var m = a.indexOf(u), v;
    return m === -1 ? (u.math === !0 ? v = u.factory(n.type, t, o, n.typed, n) : v = u.factory(n.type, t, o, n.typed), a.push(u), i.push(v)) : v = i[m], v;
  }
  var c = {};
  function l() {
    for (var u = arguments.length, f = new Array(u), m = 0; m < u; m++)
      f[m] = arguments[m];
    return n.typed.apply(n.typed, f);
  }
  l.isTypedFunction = rn.isTypedFunction;
  var s = PF(l, o, n, c);
  return n.import = s, n.on("config", () => {
    Object.values(c).forEach((u) => {
      u && u.meta && u.meta.recreateOnConfigChange && s(u, {
        override: !0
      });
    });
  }), n.create = Am.bind(null, e), n.factory = q, n.import(Object.values(uv(e))), n.ArgumentsError = Qr, n.DimensionError = Re, n.IndexError = Br, n;
}
async function UF(e) {
  const r = new TextEncoder().encode(JSON.stringify(e)), t = await crypto.subtle.digest("SHA-256", r);
  return Array.from(new Uint8Array(t)).map((i) => i.toString(16).padStart(2, "0")).join("");
}
var ha = /* @__PURE__ */ ((e) => (e.Radians = "RADIANS", e.Degrees = "DEGREES", e))(ha || {}), Ai = /* @__PURE__ */ ((e) => (e.Solid = "SOLID", e.Dashed = "DASHED", e.Dotted = "DOTTED", e))(Ai || {}), Ei = /* @__PURE__ */ ((e) => (e.Point = "POINT", e.Open = "OPEN", e.Cross = "CROSS", e))(Ei || {}), Si = /* @__PURE__ */ ((e) => (e.Red = "#ff0000", e.Green = "#00ff00", e.Blue = "#0000ff", e.Yellow = "#ffff00", e.Magenta = "#ff00ff", e.Cyan = "#00ffff", e.Purple = "#6042a6", e.Orange = "#ffa500", e.Black = "#000000", e.White = "#ffffff", e))(Si || {});
const LF = Am(IF, { number: "number" }), Bn = 99999, Zr = {
  width: 600,
  height: 400,
  left: -10,
  right: 10,
  bottom: -7,
  top: 7,
  grid: !0,
  degreeMode: ha.Radians,
  hideAxisNumbers: !1,
  xAxisLogarithmic: !1,
  yAxisLogarithmic: !1
}, rc = Math.abs(Zr.left) + Math.abs(Zr.right), tc = Math.abs(Zr.bottom) + Math.abs(Zr.top);
function qn(e, r) {
  const t = Object.keys(e).find((n) => n.toUpperCase() === r.toUpperCase());
  return t ? e[t] : null;
}
function nc(e) {
  return e.startsWith("#") && /^[0-9a-zA-Z]+$/.test(e.slice(1)) ? e : qn(Si, e);
}
class ft {
  constructor(r, t, n) {
    Wt(this, "_hash");
    Wt(this, "equations");
    Wt(this, "settings");
    /**  Supplementary error information if the source if valid but Desmos returns an error */
    Wt(this, "potentialErrorHint");
    this.equations = r, this.potentialErrorHint = n, ft.adjustBounds(t), this._hash = UF({ equations: r, settings: t }), this.settings = { ...Zr, ...t }, ft.validateSettings(this.settings), this.settings.defaultColor && (this.equations = this.equations.map((a) => ({
      color: a.color ?? this.settings.defaultColor,
      ...a
    })));
  }
  static parse(r) {
    let t;
    const n = r.split("---");
    if (n.length > 2)
      throw new SyntaxError("Too many graph segments, there can only be a singular  '---'");
    const a = n[n.length - 1].split(/\r?\n/g).filter((o) => o.trim() !== "").map(ft.parseEquation).map((o) => (o.hint && (t = o.hint), o.data)), i = n.length > 1 ? ft.parseSettings(n[0]) : {};
    return new ft(a, i, t);
  }
  async hash() {
    return this._hash;
  }
  static validateSettings(r) {
    if (r.width && r.width > Bn || r.height && r.height > Bn)
      throw new SyntaxError(`Graph size outside of accepted bounds (must be <${Bn}x${Bn})`);
    if (r.left >= r.right)
      throw new SyntaxError(
        `Right boundary (${r.right}) must be greater than left boundary (${r.left})`
      );
    if (r.bottom >= r.top)
      throw new SyntaxError(`
                Top boundary (${r.top}) must be greater than bottom boundary (${r.bottom})
            `);
  }
  static parseEquation(r) {
    let t;
    const n = r.split("|").map((i) => i.trim()).filter((i) => i !== ""), a = { equation: n.shift() };
    for (const i of n) {
      const o = i.toUpperCase();
      if (o === "HIDDEN") {
        a.hidden = !0;
        continue;
      }
      if (o === "NOLINE") {
        a.line = !1;
        continue;
      }
      const c = qn(Ai, o) ?? qn(Ei, o);
      if (c) {
        if (!a.style)
          a.style = c;
        else
          throw new SyntaxError(`Duplicate style identifiers detected: ${a.style}, ${i}`);
        continue;
      }
      const l = nc(i);
      if (l) {
        if (!a.color)
          a.color = l;
        else
          throw new SyntaxError(
            "Duplicate color identifiers detected, each equation may only contain a single color code."
          );
        continue;
      }
      if (o.startsWith("LABEL:")) {
        const s = i.split(":").slice(1).join(":").trim();
        if (a.label === void 0) {
          if (s === "")
            throw new SyntaxError("Equation label must have a value");
          a.label = s;
        } else
          throw new SyntaxError(
            "Duplicate equation labels detected, each equation may only contain a single label."
          );
        continue;
      }
      if (o === "LABEL") {
        a.label = "";
        continue;
      }
      if (i.includes("\\")) {
        const s = document.createElement("span"), u = document.createElement("span");
        u.innerHTML = "You may have tried to use the LaTeX syntax in the graph restriction (";
        const f = document.createElement("code");
        f.innerText = i;
        const m = document.createElement("span");
        m.innerHTML = "), please use some sort of an alternative (e.g <code>\\frac{1}{2}</code> => <code>1/2</code>) as this is not supported by Desmos.", s.appendChild(u), s.appendChild(f), s.appendChild(m), t = { view: s };
      }
      a.restrictions || (a.restrictions = []), a.restrictions.push(i);
    }
    return { data: a, hint: t };
  }
  static parseSettings(r) {
    const t = {};
    return r.split(/[;\n]/g).map((n) => n.trim()).filter((n) => n !== "").map((n) => n.split("=")).forEach((n) => {
      if (n.length > 2)
        throw new SyntaxError(
          "Too many segments, eaching setting must only contain a maximum of one '=' sign"
        );
      const a = n[0].trim(), i = n.length > 1 ? n[1].trim() : void 0;
      if (a in t)
        throw new SyntaxError(`Duplicate key '${a}' not allowed`);
      const o = () => {
        if (i === void 0)
          throw new SyntaxError(`Field '${a}' must have a value`);
      };
      switch (a) {
        case "hideAxisNumbers":
        case "xAxisLogarithmic":
        case "yAxisLogarithmic":
        case "grid": {
          if (!i)
            t[a] = !0;
          else {
            const c = i.toLowerCase();
            if (c !== "true" && c !== "false")
              throw new SyntaxError(
                `Field '${a}' requres a boolean value 'true'/'false' (omit a value to default to 'true')`
              );
            t[a] = i === "true";
          }
          break;
        }
        case "xAxisLabel":
        case "yAxisLabel": {
          o(), t[a] = i;
          break;
        }
        case "top":
        case "bottom":
        case "left":
        case "right":
        case "width":
        case "height": {
          o(), t[a] = LF.evaluate(i);
          break;
        }
        case "degreeMode": {
          o();
          const c = qn(ha, i);
          if (c)
            t.degreeMode = c;
          else
            throw new SyntaxError("Field 'degreeMode' must be either 'radians' or 'degrees'");
          break;
        }
        case "defaultColor": {
          o();
          const c = nc(i);
          if (c)
            t.defaultColor = c;
          else
            throw new SyntaxError(
              `Field 'defaultColor' must be either a valid hex code or one of: ${Object.keys(
                Si
              ).join(", ")}`
            );
          break;
        }
        default:
          throw new SyntaxError(`Unrecognised field: ${a}`);
      }
    }), t;
  }
  /** Dynamically adjust graph boundary if the defaults would cause an invalid graph with the settings supplied by the user,
   *  this will not do anything if the adjustment is not required.
   */
  static adjustBounds(r) {
    return r.left !== void 0 && r.right === void 0 && r.left >= Zr.right && (r.right = r.left + rc), r.left === void 0 && r.right !== void 0 && r.right <= Zr.left && (r.left = r.right - rc), r.bottom !== void 0 && r.top === void 0 && r.bottom >= Zr.top && (r.top = r.bottom + tc), r.bottom === void 0 && r.top !== void 0 && r.top <= Zr.bottom && (r.bottom = r.top - tc), r;
  }
}
function HF(e) {
  e.core.ruler.after("block", "desmos-graph", (t) => {
    const n = t.tokens;
    for (let a = 0; a < n.length; a++) {
      const i = n[a];
      if (i.type === "fence" && i.info.trim() === "desmos-graph") {
        const o = i.content;
        i.type = "desmos_graph", i.attrPush(["data-graph", o]), i.attrPush(["class", "desmos-graph"]);
      }
    }
  }), e.renderer.rules.desmos_graph = function(t, n) {
    const i = t[n].content, o = ft.parse(i), c = [], l = o.settings;
    for (const u of o.equations) {
      const f = {
        color: u.color,
        label: u.label,
        hidden: u.hidden,
        showLabel: u.label !== void 0,
        lines: u.line
      };
      if (u.restrictions) {
        const m = u.restrictions.map(
          (v) => `{${v}}`.replaceAll("{", String.raw`\{`).replaceAll("}", String.raw`\}`).replaceAll("<=", String.raw`\leq `).replaceAll(">=", String.raw`\geq `).replaceAll("<", String.raw`\le `).replaceAll(">", String.raw`\ge `)
        ).join("");
        f.latex = `${u.equation}${m}`;
      } else
        f.latex = u.equation;
      u.style && (Object.values(Ai).includes(u.style) ? f.lineStyle = u.style : Object.values(Ei).includes(u.style) && (f.pointStyle = u.style)), c.push(f);
    }
    const s = {
      settingsMenu: !1,
      expressions: !1,
      lockViewPort: !0,
      zoomButtons: !1,
      trace: !1,
      xAxisNumbers: !l.hideAxisNumbers,
      yAxisNumbers: !l.hideAxisNumbers,
      showGrid: l.grid,
      // Desmos takes a value of 'false' for radians and 'true' for degrees
      degreeMode: l.degreeMode === ha.Degrees
    };
    return l.xAxisLabel !== void 0 && (s.xAxisLabel = JSON.stringify(l.xAxisLabel ?? "").slice(1, -1)), l.yAxisLabel !== void 0 && (s.yAxisLabel = JSON.stringify(l.yAxisLabel ?? "").slice(1, -1)), s.xAxisScale = l.xAxisLogarithmic ? "logarithmic" : "linear", s.yAxisScale = l.yAxisLogarithmic ? "logarithmic" : "linear", `<div id="desmos-${n}" class="desmos-graph" style="width: ${l.width}px; height: ${l.height}px;" data-desmos-expressions='${JSON.stringify(c)}' data-desmos-options='${JSON.stringify(s)}' data-desmos-bounds='${JSON.stringify({
      left: l.left,
      right: l.right,
      top: l.top,
      bottom: l.bottom
    })}'></div>`;
  };
  const r = `
document.addEventListener('DOMContentLoaded', () => {
  // Observe DOM mutation
  const observer = new MutationObserver(mutations => {
  const processed = {}
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const elements = document.querySelectorAll('.desmos-graph');
        if (elements.length > 0) {
          // perform operations
          for (const el of elements) {
            if (!processed[el.id]) {
              processed[el.id] = true;
              const options = JSON.parse(el.getAttribute('data-desmos-options')) || {} ;
              const expressions = JSON.parse(el.getAttribute('data-desmos-expressions')) || [];
              const calculator = Desmos.GraphingCalculator(el, options);
              const bounds = JSON.parse(el.getAttribute('data-desmos-bounds')) || {
                left: -10,
                right: 10,
                bottom: -7,
                top: 7,
              };
              calculator.setMathBounds(bounds);
              try {
                for (const expression of expressions) {
                  calculator.setExpression(expression);
                }
              } catch (err) {
                console.log(err);
                calculator.destroy();
                const wrapper = document.createElement("div");

                const message = document.createElement("strong");
                message.innerText = "Desmos Graph Error: ";
                wrapper.appendChild(message);

                const ctx = document.createElement("span");
                ctx.innerText = err;
                wrapper.appendChild(ctx);

                const container = document.createElement("div");
                container.style.padding = "20px";
                container.style.backgroundColor = "#f44336";
                container.style.color = "white";
                container.appendChild(wrapper);

                el.replaceChildren();
                el.appendChild(container);
              }
            }
          }
          // Stop observing
          observer.disconnect();
        }
      }
    });
  });

  const targetNode = document.body;
  const config = { childList: true, subtree: true }; // observe child node
  observer.observe(targetNode, config);
});
`;
  return {
    name: "vite-plugin-desmos",
    enforce: "post",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: {
            id: "desmos-api",
            src: "https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"
          },
          injectTo: "head"
        },
        {
          tag: "script",
          children: r,
          attrs: {
            id: "desmos-script"
          },
          injectTo: "body"
        }
      ];
    }
  };
}
export {
  HF as default
};
