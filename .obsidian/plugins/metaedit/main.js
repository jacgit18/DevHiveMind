var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MetaEdit
});
module.exports = __toCommonJS(main_exports);
var import_obsidian25 = require("obsidian");

// src/Settings/metaEditSettingsTab.ts
var import_obsidian3 = require("obsidian");

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/version.js
var PUBLIC_VERSION = "5";

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/disclose-version.js
var _a;
if (typeof window !== "undefined") {
  ((_a = window.__svelte ?? (window.__svelte = {})).v ?? (_a.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/constants.js
var EACH_ITEM_REACTIVE = 1;
var EACH_INDEX_REACTIVE = 1 << 1;
var EACH_IS_CONTROLLED = 1 << 2;
var EACH_IS_ANIMATED = 1 << 3;
var EACH_ITEM_IMMUTABLE = 1 << 4;
var PROPS_IS_IMMUTABLE = 1;
var PROPS_IS_RUNES = 1 << 1;
var PROPS_IS_UPDATED = 1 << 2;
var PROPS_IS_BINDABLE = 1 << 3;
var PROPS_IS_LAZY_INITIAL = 1 << 4;
var TRANSITION_OUT = 1 << 1;
var TRANSITION_GLOBAL = 1 << 2;
var TEMPLATE_FRAGMENT = 1;
var TEMPLATE_USE_IMPORT_NODE = 1 << 1;
var TEMPLATE_USE_SVG = 1 << 2;
var TEMPLATE_USE_MATHML = 1 << 3;
var HYDRATION_START = "[";
var HYDRATION_START_ELSE = "[!";
var HYDRATION_START_FAILED = "[?";
var HYDRATION_END = "]";
var HYDRATION_ERROR = {};
var ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
var ELEMENT_IS_INPUT = 1 << 2;
var UNINITIALIZED = /* @__PURE__ */ Symbol("uninitialized");
var FILENAME = /* @__PURE__ */ Symbol("filename");
var NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";

// node_modules/.pnpm/esm-env@1.2.2/node_modules/esm-env/dev-fallback.js
var node_env = globalThis.process?.env?.NODE_ENV;
var dev_fallback_default = node_env && !node_env.toLowerCase().startsWith("prod");

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/shared/utils.js
var is_array = Array.isArray;
var index_of = Array.prototype.indexOf;
var includes = Array.prototype.includes;
var array_from = Array.from;
var object_keys = Object.keys;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var get_descriptors = Object.getOwnPropertyDescriptors;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
var is_extensible = Object.isExtensible;
var noop = () => {
};
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function deferred() {
  var resolve;
  var reject;
  var promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/constants.js
var DERIVED = 1 << 1;
var EFFECT = 1 << 2;
var RENDER_EFFECT = 1 << 3;
var MANAGED_EFFECT = 1 << 24;
var BLOCK_EFFECT = 1 << 4;
var BRANCH_EFFECT = 1 << 5;
var ROOT_EFFECT = 1 << 6;
var BOUNDARY_EFFECT = 1 << 7;
var CONNECTED = 1 << 9;
var CLEAN = 1 << 10;
var DIRTY = 1 << 11;
var MAYBE_DIRTY = 1 << 12;
var INERT = 1 << 13;
var DESTROYED = 1 << 14;
var REACTION_RAN = 1 << 15;
var DESTROYING = 1 << 25;
var EFFECT_TRANSPARENT = 1 << 16;
var EAGER_EFFECT = 1 << 17;
var HEAD_EFFECT = 1 << 18;
var EFFECT_PRESERVED = 1 << 19;
var USER_EFFECT = 1 << 20;
var EFFECT_OFFSCREEN = 1 << 25;
var WAS_MARKED = 1 << 16;
var REACTION_IS_UPDATING = 1 << 21;
var ASYNC = 1 << 22;
var ERROR_VALUE = 1 << 23;
var STATE_SYMBOL = /* @__PURE__ */ Symbol("$state");
var LEGACY_PROPS = /* @__PURE__ */ Symbol("legacy props");
var LOADING_ATTR_SYMBOL = /* @__PURE__ */ Symbol("");
var PROXY_PATH_SYMBOL = /* @__PURE__ */ Symbol("proxy path");
var ATTRIBUTES_CACHE = /* @__PURE__ */ Symbol("attributes");
var CLASS_CACHE = /* @__PURE__ */ Symbol("class");
var STYLE_CACHE = /* @__PURE__ */ Symbol("style");
var TEXT_CACHE = /* @__PURE__ */ Symbol("text");
var FORM_RESET_HANDLER = /* @__PURE__ */ Symbol("form reset");
var HMR_ANCHOR = /* @__PURE__ */ Symbol("hmr anchor");
var STALE_REACTION = new class StaleReactionError extends Error {
  constructor() {
    super(...arguments);
    __publicField(this, "name", "StaleReactionError");
    __publicField(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var IS_XHTML = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!globalThis.document?.contentType && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/shared/errors.js
function invariant_violation(message) {
  if (dev_fallback_default) {
    const error = new Error(`invariant_violation
An invariant violation occurred, meaning Svelte's internal assumptions were flawed. This is a bug in Svelte, not your app \u2014 please open an issue at https://github.com/sveltejs/svelte, citing the following message: "${message}"
https://svelte.dev/e/invariant_violation`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/invariant_violation`);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/errors.js
function async_derived_orphan() {
  if (dev_fallback_default) {
    const error = new Error(`async_derived_orphan
Cannot create a \`$derived(...)\` with an \`await\` expression outside of an effect tree
https://svelte.dev/e/async_derived_orphan`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/async_derived_orphan`);
  }
}
function bind_invalid_checkbox_value() {
  if (dev_fallback_default) {
    const error = new Error(`bind_invalid_checkbox_value
Using \`bind:value\` together with a checkbox input is not allowed. Use \`bind:checked\` instead
https://svelte.dev/e/bind_invalid_checkbox_value`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/bind_invalid_checkbox_value`);
  }
}
function derived_references_self() {
  if (dev_fallback_default) {
    const error = new Error(`derived_references_self
A derived value cannot reference itself recursively
https://svelte.dev/e/derived_references_self`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/derived_references_self`);
  }
}
function each_key_duplicate(a, b, value) {
  if (dev_fallback_default) {
    const error = new Error(`each_key_duplicate
${value ? `Keyed each block has duplicate key \`${value}\` at indexes ${a} and ${b}` : `Keyed each block has duplicate key at indexes ${a} and ${b}`}
https://svelte.dev/e/each_key_duplicate`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/each_key_duplicate`);
  }
}
function each_key_volatile(index2, a, b) {
  if (dev_fallback_default) {
    const error = new Error(`each_key_volatile
Keyed each block has key that is not idempotent \u2014 the key for item at index ${index2} was \`${a}\` but is now \`${b}\`. Keys must be the same each time for a given item
https://svelte.dev/e/each_key_volatile`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/each_key_volatile`);
  }
}
function effect_in_teardown(rune) {
  if (dev_fallback_default) {
    const error = new Error(`effect_in_teardown
\`${rune}\` cannot be used inside an effect cleanup function
https://svelte.dev/e/effect_in_teardown`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_in_teardown`);
  }
}
function effect_in_unowned_derived() {
  if (dev_fallback_default) {
    const error = new Error(`effect_in_unowned_derived
Effect cannot be created inside a \`$derived\` value that was not itself created inside an effect
https://svelte.dev/e/effect_in_unowned_derived`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_in_unowned_derived`);
  }
}
function effect_orphan(rune) {
  if (dev_fallback_default) {
    const error = new Error(`effect_orphan
\`${rune}\` can only be used inside an effect (e.g. during component initialisation)
https://svelte.dev/e/effect_orphan`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_orphan`);
  }
}
function effect_update_depth_exceeded() {
  if (dev_fallback_default) {
    const error = new Error(`effect_update_depth_exceeded
Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
https://svelte.dev/e/effect_update_depth_exceeded`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
  }
}
function hydration_failed() {
  if (dev_fallback_default) {
    const error = new Error(`hydration_failed
Failed to hydrate the application
https://svelte.dev/e/hydration_failed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/hydration_failed`);
  }
}
function props_invalid_value(key2) {
  if (dev_fallback_default) {
    const error = new Error(`props_invalid_value
Cannot do \`bind:${key2}={undefined}\` when \`${key2}\` has a fallback value
https://svelte.dev/e/props_invalid_value`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/props_invalid_value`);
  }
}
function rune_outside_svelte(rune) {
  if (dev_fallback_default) {
    const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files
https://svelte.dev/e/rune_outside_svelte`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/rune_outside_svelte`);
  }
}
function state_descriptors_fixed() {
  if (dev_fallback_default) {
    const error = new Error(`state_descriptors_fixed
Property descriptors defined on \`$state\` objects must contain \`value\` and always be \`enumerable\`, \`configurable\` and \`writable\`.
https://svelte.dev/e/state_descriptors_fixed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
  }
}
function state_prototype_fixed() {
  if (dev_fallback_default) {
    const error = new Error(`state_prototype_fixed
Cannot set prototype of \`$state\` object
https://svelte.dev/e/state_prototype_fixed`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
  }
}
function state_unsafe_mutation() {
  if (dev_fallback_default) {
    const error = new Error(`state_unsafe_mutation
Updating state inside \`$derived(...)\`, \`$inspect(...)\` or a template expression is forbidden. If the value should not be reactive, declare it without \`$state\`
https://svelte.dev/e/state_unsafe_mutation`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
  }
}
function svelte_boundary_reset_onerror() {
  if (dev_fallback_default) {
    const error = new Error(`svelte_boundary_reset_onerror
A \`<svelte:boundary>\` \`reset\` function cannot be called while an error is still being handled
https://svelte.dev/e/svelte_boundary_reset_onerror`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/warnings.js
var bold = "font-weight: bold";
var normal = "font-weight: normal";
function await_reactivity_loss(name) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] await_reactivity_loss
%cDetected reactivity loss when reading \`${name}\`. This happens when state is read in an async function after an earlier \`await\`
https://svelte.dev/e/await_reactivity_loss`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/await_reactivity_loss`);
  }
}
function await_waterfall(name, location) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] await_waterfall
%cAn async derived, \`${name}\` (${location}) was not read immediately after it resolved. This often indicates an unnecessary waterfall, which can slow down your app
https://svelte.dev/e/await_waterfall`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/await_waterfall`);
  }
}
function derived_inert() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] derived_inert
%cReading a derived belonging to a now-destroyed effect may result in stale values
https://svelte.dev/e/derived_inert`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/derived_inert`);
  }
}
function hydration_attribute_changed(attribute, html2, value) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] hydration_attribute_changed
%cThe \`${attribute}\` attribute on \`${html2}\` changed its value between server and client renders. The client value, \`${value}\`, will be ignored in favour of the server value
https://svelte.dev/e/hydration_attribute_changed`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/hydration_attribute_changed`);
  }
}
function hydration_mismatch(location) {
  if (dev_fallback_default) {
    console.warn(
      `%c[svelte] hydration_mismatch
%c${location ? `Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near ${location}` : "Hydration failed because the initial UI does not match what was rendered on the server"}
https://svelte.dev/e/hydration_mismatch`,
      bold,
      normal
    );
  } else {
    console.warn(`https://svelte.dev/e/hydration_mismatch`);
  }
}
function lifecycle_double_unmount() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] lifecycle_double_unmount
%cTried to unmount a component that was not mounted
https://svelte.dev/e/lifecycle_double_unmount`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/lifecycle_double_unmount`);
  }
}
function select_multiple_invalid_value() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] select_multiple_invalid_value
%cThe \`value\` property of a \`<select multiple>\` element should be an array, but it received a non-array value. The selection will be kept as is.
https://svelte.dev/e/select_multiple_invalid_value`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/select_multiple_invalid_value`);
  }
}
function state_proxy_equality_mismatch(operator) {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] state_proxy_equality_mismatch
%cReactive \`$state(...)\` proxies and the values they proxy have different identities. Because of this, comparisons with \`${operator}\` will produce unexpected results
https://svelte.dev/e/state_proxy_equality_mismatch`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/state_proxy_equality_mismatch`);
  }
}
function state_proxy_unmount() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] state_proxy_unmount
%cTried to unmount a state proxy, rather than a component
https://svelte.dev/e/state_proxy_unmount`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/state_proxy_unmount`);
  }
}
function svelte_boundary_reset_noop() {
  if (dev_fallback_default) {
    console.warn(`%c[svelte] svelte_boundary_reset_noop
%cA \`<svelte:boundary>\` \`reset\` function only resets the boundary the first time it is called
https://svelte.dev/e/svelte_boundary_reset_noop`, bold, normal);
  } else {
    console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/hydration.js
var hydrating = false;
function set_hydrating(value) {
  hydrating = value;
}
var hydrate_node;
function set_hydrate_node(node) {
  if (node === null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return hydrate_node = node;
}
function hydrate_next() {
  return set_hydrate_node(get_next_sibling(hydrate_node));
}
function reset(node) {
  if (!hydrating) return;
  if (get_next_sibling(hydrate_node) !== null) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  hydrate_node = node;
}
function next(count = 1) {
  if (hydrating) {
    var i = count;
    var node = hydrate_node;
    while (i--) {
      node = /** @type {TemplateNode} */
      get_next_sibling(node);
    }
    hydrate_node = node;
  }
}
function skip_nodes(remove = true) {
  var depth = 0;
  var node = hydrate_node;
  while (true) {
    if (node.nodeType === COMMENT_NODE) {
      var data = (
        /** @type {Comment} */
        node.data
      );
      if (data === HYDRATION_END) {
        if (depth === 0) return node;
        depth -= 1;
      } else if (data === HYDRATION_START || data === HYDRATION_START_ELSE || // "[1", "[2", etc. for if blocks
      data[0] === "[" && !isNaN(Number(data.slice(1)))) {
        depth += 1;
      }
    }
    var next2 = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    if (remove) node.remove();
    node = next2;
  }
}
function read_hydration_instruction(node) {
  if (!node || node.nodeType !== COMMENT_NODE) {
    hydration_mismatch();
    throw HYDRATION_ERROR;
  }
  return (
    /** @type {Comment} */
    node.data
  );
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/equality.js
function equals(value) {
  return value === this.v;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equals(value) {
  return !safe_not_equal(value, this.v);
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/flags/index.js
var async_mode_flag = false;
var legacy_mode_flag = false;
var tracing_mode_flag = false;

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/shared/warnings.js
var bold2 = "font-weight: bold";
var normal2 = "font-weight: normal";
function state_snapshot_uncloneable(properties) {
  if (dev_fallback_default) {
    console.warn(
      `%c[svelte] state_snapshot_uncloneable
%c${properties ? `The following properties cannot be cloned with \`$state.snapshot\` \u2014 the return value contains the originals:

${properties}` : "Value cannot be cloned with `$state.snapshot` \u2014 the original value was returned"}
https://svelte.dev/e/state_snapshot_uncloneable`,
      bold2,
      normal2
    );
  } else {
    console.warn(`https://svelte.dev/e/state_snapshot_uncloneable`);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/shared/clone.js
var empty = [];
function snapshot(value, skip_warning = false, no_tojson = false) {
  if (dev_fallback_default && !skip_warning) {
    const paths = [];
    const copy = clone(value, /* @__PURE__ */ new Map(), "", paths, null, no_tojson);
    if (paths.length === 1 && paths[0] === "") {
      state_snapshot_uncloneable();
    } else if (paths.length > 0) {
      const slice = paths.length > 10 ? paths.slice(0, 7) : paths.slice(0, 10);
      const excess = paths.length - slice.length;
      let uncloned = slice.map((path) => `- <value>${path}`).join("\n");
      if (excess > 0) uncloned += `
- ...and ${excess} more`;
      state_snapshot_uncloneable(uncloned);
    }
    return copy;
  }
  return clone(value, /* @__PURE__ */ new Map(), "", empty, null, no_tojson);
}
function clone(value, cloned, path, paths, original = null, no_tojson = false) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element2 = value[i];
        if (i in value) {
          copy[i] = clone(element2, cloned, dev_fallback_default ? `${path}[${i}]` : path, paths, null, no_tojson);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key2 of Object.keys(value)) {
        copy[key2] = clone(
          // @ts-expect-error
          value[key2],
          cloned,
          dev_fallback_default ? `${path}.${key2}` : path,
          paths,
          null,
          no_tojson
        );
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function" && !no_tojson) {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        dev_fallback_default ? `${path}.toJSON()` : path,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    if (dev_fallback_default) {
      paths.push(path);
    }
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dev/tracing.js
var tracing_expressions = null;
function tag(source2, label) {
  source2.label = label;
  tag_proxy(source2.v, label);
  return source2;
}
function tag_proxy(value, label) {
  value?.[PROXY_PATH_SYMBOL]?.(label);
  return value;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/shared/dev.js
function get_error(label) {
  const error = new Error();
  const stack2 = get_stack();
  if (stack2.length === 0) {
    return null;
  }
  stack2.unshift("\n");
  define_property(error, "stack", {
    value: stack2.join("\n")
  });
  define_property(error, "name", {
    value: label
  });
  return (
    /** @type {Error & { stack: string }} */
    error
  );
}
function get_stack() {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = Infinity;
  const stack2 = new Error().stack;
  Error.stackTraceLimit = limit;
  if (!stack2) return [];
  const lines = stack2.split("\n");
  const new_lines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const posixified = line.replaceAll("\\", "/");
    if (line.trim() === "Error") {
      continue;
    }
    if (line.includes("validate_each_keys")) {
      return [];
    }
    if (posixified.includes("svelte/src/internal") || posixified.includes("node_modules/.vite")) {
      continue;
    }
    new_lines.push(line);
  }
  return new_lines;
}
function invariant(condition, message) {
  if (!dev_fallback_default) {
    throw new Error("invariant(...) was not guarded by if (DEV)");
  }
  if (!condition) invariant_violation(message);
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/context.js
var component_context = null;
function set_component_context(context) {
  component_context = context;
}
var dev_stack = null;
function set_dev_stack(stack2) {
  dev_stack = stack2;
}
var dev_current_component_function = null;
function set_dev_current_component_function(fn) {
  dev_current_component_function = fn;
}
function push(props, runes = false, fn) {
  component_context = {
    p: component_context,
    i: false,
    c: null,
    e: null,
    s: props,
    x: null,
    r: (
      /** @type {Effect} */
      active_effect
    ),
    l: legacy_mode_flag && !runes ? { s: null, u: null, $: [] } : null
  };
  if (dev_fallback_default) {
    component_context.function = fn;
    dev_current_component_function = fn;
  }
}
function pop(component2) {
  var context = (
    /** @type {ComponentContext} */
    component_context
  );
  var effects = context.e;
  if (effects !== null) {
    context.e = null;
    for (var fn of effects) {
      create_user_effect(fn);
    }
  }
  if (component2 !== void 0) {
    context.x = component2;
  }
  context.i = true;
  component_context = context.p;
  if (dev_fallback_default) {
    dev_current_component_function = component_context?.function ?? null;
  }
  return component2 ?? /** @type {T} */
  {};
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/task.js
var micro_tasks = [];
function run_micro_tasks() {
  var tasks = micro_tasks;
  micro_tasks = [];
  run_all(tasks);
}
function queue_micro_task(fn) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var tasks = micro_tasks;
    queueMicrotask(() => {
      if (tasks === micro_tasks) run_micro_tasks();
    });
  }
  micro_tasks.push(fn);
}
function flush_tasks() {
  while (micro_tasks.length > 0) {
    run_micro_tasks();
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/error-handling.js
var adjustments = /* @__PURE__ */ new WeakMap();
function handle_error(error) {
  var effect2 = active_effect;
  if (effect2 === null) {
    active_reaction.f |= ERROR_VALUE;
    return error;
  }
  if (dev_fallback_default && error instanceof Error && !adjustments.has(error)) {
    adjustments.set(error, get_adjustments(error, effect2));
  }
  if ((effect2.f & REACTION_RAN) === 0 && (effect2.f & EFFECT) === 0) {
    if (dev_fallback_default && !effect2.parent && error instanceof Error) {
      apply_adjustments(error);
    }
    throw error;
  }
  invoke_error_boundary(error, effect2);
}
function invoke_error_boundary(error, effect2) {
  if (effect2 !== null && (effect2.f & DESTROYED) !== 0) {
    return;
  }
  while (effect2 !== null) {
    if ((effect2.f & BOUNDARY_EFFECT) !== 0) {
      if ((effect2.f & REACTION_RAN) === 0) {
        throw error;
      }
      try {
        effect2.b.error(error);
        return;
      } catch (e) {
        error = e;
      }
    }
    effect2 = effect2.parent;
  }
  if (dev_fallback_default && error instanceof Error) {
    apply_adjustments(error);
  }
  throw error;
}
function get_adjustments(error, effect2) {
  const message_descriptor = get_descriptor(error, "message");
  if (message_descriptor && !message_descriptor.configurable) return;
  var indent = is_firefox ? "  " : "	";
  var component_stack = `
${indent}in ${effect2.fn?.name || "<unknown>"}`;
  var context = effect2.ctx;
  while (context !== null) {
    component_stack += `
${indent}in ${context.function?.[FILENAME].split("/").pop()}`;
    context = context.p;
  }
  return {
    message: error.message + `
${component_stack}
`,
    stack: error.stack?.split("\n").filter((line) => !line.includes("svelte/src/internal")).join("\n")
  };
}
function apply_adjustments(error) {
  const adjusted = adjustments.get(error);
  if (adjusted) {
    define_property(error, "message", {
      value: adjusted.message
    });
    define_property(error, "stack", {
      value: adjusted.stack
    });
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/status.js
var STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function update_derived_status(derived2) {
  if ((derived2.f & CONNECTED) !== 0 || derived2.deps === null) {
    set_signal_status(derived2, CLEAN);
  } else {
    set_signal_status(derived2, MAYBE_DIRTY);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/utils.js
function clear_marked(deps) {
  if (deps === null) return;
  for (const dep of deps) {
    if ((dep.f & DERIVED) === 0 || (dep.f & WAS_MARKED) === 0) {
      continue;
    }
    dep.f ^= WAS_MARKED;
    clear_marked(
      /** @type {Derived} */
      dep.deps
    );
  }
}
function defer_effect(effect2, dirty_effects, maybe_dirty_effects) {
  if ((effect2.f & DIRTY) !== 0) {
    dirty_effects.add(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    maybe_dirty_effects.add(effect2);
  }
  clear_marked(effect2.deps);
  set_signal_status(effect2, CLEAN);
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/store.js
var legacy_is_updating_store = false;
var is_store_binding = false;
function capture_store_binding(fn) {
  var previous_is_store_binding = is_store_binding;
  try {
    is_store_binding = false;
    return [fn(), is_store_binding];
  } finally {
    is_store_binding = previous_is_store_binding;
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/reactivity/create-subscriber.js
function createSubscriber(start) {
  let subscribers = 0;
  let version = source(0);
  let stop;
  if (dev_fallback_default) {
    tag(version, "createSubscriber version");
  }
  return () => {
    if (effect_tracking()) {
      get2(version);
      render_effect(() => {
        if (subscribers === 0) {
          stop = untrack(() => start(() => increment(version)));
        }
        subscribers += 1;
        return () => {
          queue_micro_task(() => {
            subscribers -= 1;
            if (subscribers === 0) {
              stop?.();
              stop = void 0;
              increment(version);
            }
          });
        };
      });
    }
  };
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/blocks/boundary.js
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
function boundary(node, props, children, transform_error) {
  new Boundary(node, props, children, transform_error);
}
var _anchor, _hydrate_open, _props, _children, _effect, _main_effect, _pending_effect, _failed_effect, _offscreen_fragment, _local_pending_count, _pending_count, _pending_count_update_queued, _dirty_effects, _maybe_dirty_effects, _effect_pending, _effect_pending_subscriber, _Boundary_instances, hydrate_resolved_content_fn, hydrate_failed_content_fn, hydrate_pending_content_fn, render_fn, resolve_fn, run_fn, update_pending_count_fn, handle_error_fn;
var Boundary = class {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(node, props, children, transform_error) {
    __privateAdd(this, _Boundary_instances);
    /** @type {Boundary | null} */
    __publicField(this, "parent");
    __publicField(this, "is_pending", false);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    __publicField(this, "transform_error");
    /** @type {TemplateNode} */
    __privateAdd(this, _anchor);
    /** @type {TemplateNode | null} */
    __privateAdd(this, _hydrate_open, hydrating ? hydrate_node : null);
    /** @type {BoundaryProps} */
    __privateAdd(this, _props);
    /** @type {((anchor: Node) => void)} */
    __privateAdd(this, _children);
    /** @type {Effect} */
    __privateAdd(this, _effect);
    /** @type {Effect | null} */
    __privateAdd(this, _main_effect, null);
    /** @type {Effect | null} */
    __privateAdd(this, _pending_effect, null);
    /** @type {Effect | null} */
    __privateAdd(this, _failed_effect, null);
    /** @type {DocumentFragment | null} */
    __privateAdd(this, _offscreen_fragment, null);
    __privateAdd(this, _local_pending_count, 0);
    __privateAdd(this, _pending_count, 0);
    __privateAdd(this, _pending_count_update_queued, false);
    /** @type {Set<Effect>} */
    __privateAdd(this, _dirty_effects, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    __privateAdd(this, _maybe_dirty_effects, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    __privateAdd(this, _effect_pending, null);
    __privateAdd(this, _effect_pending_subscriber, createSubscriber(() => {
      __privateSet(this, _effect_pending, source(__privateGet(this, _local_pending_count)));
      if (dev_fallback_default) {
        tag(__privateGet(this, _effect_pending), "$effect.pending()");
      }
      return () => {
        __privateSet(this, _effect_pending, null);
      };
    }));
    __privateSet(this, _anchor, node);
    __privateSet(this, _props, props);
    __privateSet(this, _children, (anchor) => {
      var effect2 = (
        /** @type {Effect} */
        active_effect
      );
      effect2.b = this;
      effect2.f |= BOUNDARY_EFFECT;
      children(anchor);
    });
    this.parent = /** @type {Effect} */
    active_effect.b;
    this.transform_error = transform_error ?? this.parent?.transform_error ?? ((e) => e);
    __privateSet(this, _effect, block(() => {
      if (hydrating) {
        const comment2 = (
          /** @type {Comment} */
          __privateGet(this, _hydrate_open)
        );
        hydrate_next();
        const server_rendered_pending = comment2.data === HYDRATION_START_ELSE;
        const server_rendered_failed = comment2.data.startsWith(HYDRATION_START_FAILED);
        if (server_rendered_failed) {
          const serialized_error = JSON.parse(comment2.data.slice(HYDRATION_START_FAILED.length));
          __privateMethod(this, _Boundary_instances, hydrate_failed_content_fn).call(this, serialized_error);
        } else if (server_rendered_pending) {
          __privateMethod(this, _Boundary_instances, hydrate_pending_content_fn).call(this);
        } else {
          __privateMethod(this, _Boundary_instances, hydrate_resolved_content_fn).call(this);
        }
      } else {
        __privateMethod(this, _Boundary_instances, render_fn).call(this);
      }
    }, flags));
    if (hydrating) {
      __privateSet(this, _anchor, hydrate_node);
    }
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(effect2) {
    defer_effect(effect2, __privateGet(this, _dirty_effects), __privateGet(this, _maybe_dirty_effects));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!__privateGet(this, _props).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(d, batch) {
    __privateMethod(this, _Boundary_instances, update_pending_count_fn).call(this, d, batch);
    __privateSet(this, _local_pending_count, __privateGet(this, _local_pending_count) + d);
    if (!__privateGet(this, _effect_pending) || __privateGet(this, _pending_count_update_queued)) return;
    __privateSet(this, _pending_count_update_queued, true);
    queue_micro_task(() => {
      __privateSet(this, _pending_count_update_queued, false);
      if (__privateGet(this, _effect_pending)) {
        internal_set(__privateGet(this, _effect_pending), __privateGet(this, _local_pending_count));
      }
    });
  }
  get_effect_pending() {
    __privateGet(this, _effect_pending_subscriber).call(this);
    return get2(
      /** @type {Source<number>} */
      __privateGet(this, _effect_pending)
    );
  }
  /** @param {unknown} error */
  error(error) {
    if (!__privateGet(this, _props).onerror && !__privateGet(this, _props).failed) {
      throw error;
    }
    if (current_batch?.is_fork) {
      if (__privateGet(this, _main_effect)) current_batch.skip_effect(__privateGet(this, _main_effect));
      if (__privateGet(this, _pending_effect)) current_batch.skip_effect(__privateGet(this, _pending_effect));
      if (__privateGet(this, _failed_effect)) current_batch.skip_effect(__privateGet(this, _failed_effect));
      current_batch.oncommit(() => {
        __privateMethod(this, _Boundary_instances, handle_error_fn).call(this, error);
      });
    } else {
      __privateMethod(this, _Boundary_instances, handle_error_fn).call(this, error);
    }
  }
};
_anchor = new WeakMap();
_hydrate_open = new WeakMap();
_props = new WeakMap();
_children = new WeakMap();
_effect = new WeakMap();
_main_effect = new WeakMap();
_pending_effect = new WeakMap();
_failed_effect = new WeakMap();
_offscreen_fragment = new WeakMap();
_local_pending_count = new WeakMap();
_pending_count = new WeakMap();
_pending_count_update_queued = new WeakMap();
_dirty_effects = new WeakMap();
_maybe_dirty_effects = new WeakMap();
_effect_pending = new WeakMap();
_effect_pending_subscriber = new WeakMap();
_Boundary_instances = new WeakSet();
hydrate_resolved_content_fn = function() {
  try {
    __privateSet(this, _main_effect, branch(() => __privateGet(this, _children).call(this, __privateGet(this, _anchor))));
  } catch (error) {
    this.error(error);
  }
};
/**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
hydrate_failed_content_fn = function(error) {
  const failed = __privateGet(this, _props).failed;
  if (!failed) return;
  __privateSet(this, _failed_effect, branch(() => {
    failed(
      __privateGet(this, _anchor),
      () => error,
      () => () => {
      }
    );
  }));
};
hydrate_pending_content_fn = function() {
  const pending3 = __privateGet(this, _props).pending;
  if (!pending3) return;
  this.is_pending = true;
  __privateSet(this, _pending_effect, branch(() => pending3(__privateGet(this, _anchor))));
  queue_micro_task(() => {
    var fragment = __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
    var anchor = create_text();
    fragment.append(anchor);
    __privateSet(this, _main_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
      return branch(() => __privateGet(this, _children).call(this, anchor));
    }));
    if (__privateGet(this, _pending_count) === 0) {
      __privateGet(this, _anchor).before(fragment);
      __privateSet(this, _offscreen_fragment, null);
      pause_effect(
        /** @type {Effect} */
        __privateGet(this, _pending_effect),
        () => {
          __privateSet(this, _pending_effect, null);
        }
      );
      __privateMethod(this, _Boundary_instances, resolve_fn).call(
        this,
        /** @type {Batch} */
        current_batch
      );
    }
  });
};
render_fn = function() {
  try {
    this.is_pending = this.has_pending_snippet();
    __privateSet(this, _pending_count, 0);
    __privateSet(this, _local_pending_count, 0);
    __privateSet(this, _main_effect, branch(() => {
      __privateGet(this, _children).call(this, __privateGet(this, _anchor));
    }));
    if (__privateGet(this, _pending_count) > 0) {
      var fragment = __privateSet(this, _offscreen_fragment, document.createDocumentFragment());
      move_effect(__privateGet(this, _main_effect), fragment);
      const pending3 = (
        /** @type {(anchor: Node) => void} */
        __privateGet(this, _props).pending
      );
      __privateSet(this, _pending_effect, branch(() => pending3(__privateGet(this, _anchor))));
    } else {
      __privateMethod(this, _Boundary_instances, resolve_fn).call(
        this,
        /** @type {Batch} */
        current_batch
      );
    }
  } catch (error) {
    this.error(error);
  }
};
/**
 * @param {Batch} batch
 */
resolve_fn = function(batch) {
  this.is_pending = false;
  batch.transfer_effects(__privateGet(this, _dirty_effects), __privateGet(this, _maybe_dirty_effects));
};
/**
 * @template T
 * @param {() => T} fn
 */
run_fn = function(fn) {
  var previous_effect = active_effect;
  var previous_reaction = active_reaction;
  var previous_ctx = component_context;
  set_active_effect(__privateGet(this, _effect));
  set_active_reaction(__privateGet(this, _effect));
  set_component_context(__privateGet(this, _effect).ctx);
  try {
    Batch.ensure();
    return fn();
  } catch (e) {
    handle_error(e);
    return null;
  } finally {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_ctx);
  }
};
/**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
update_pending_count_fn = function(d, batch) {
  var _a2;
  if (!this.has_pending_snippet()) {
    if (this.parent) {
      __privateMethod(_a2 = this.parent, _Boundary_instances, update_pending_count_fn).call(_a2, d, batch);
    }
    return;
  }
  __privateSet(this, _pending_count, __privateGet(this, _pending_count) + d);
  if (__privateGet(this, _pending_count) === 0) {
    __privateMethod(this, _Boundary_instances, resolve_fn).call(this, batch);
    if (__privateGet(this, _pending_effect)) {
      pause_effect(__privateGet(this, _pending_effect), () => {
        __privateSet(this, _pending_effect, null);
      });
    }
    if (__privateGet(this, _offscreen_fragment)) {
      __privateGet(this, _anchor).before(__privateGet(this, _offscreen_fragment));
      __privateSet(this, _offscreen_fragment, null);
    }
  }
};
/**
 * @param {unknown} error
 */
handle_error_fn = function(error) {
  if (__privateGet(this, _main_effect)) {
    destroy_effect(__privateGet(this, _main_effect));
    __privateSet(this, _main_effect, null);
  }
  if (__privateGet(this, _pending_effect)) {
    destroy_effect(__privateGet(this, _pending_effect));
    __privateSet(this, _pending_effect, null);
  }
  if (__privateGet(this, _failed_effect)) {
    destroy_effect(__privateGet(this, _failed_effect));
    __privateSet(this, _failed_effect, null);
  }
  if (hydrating) {
    set_hydrate_node(
      /** @type {TemplateNode} */
      __privateGet(this, _hydrate_open)
    );
    next();
    set_hydrate_node(skip_nodes());
  }
  var onerror = __privateGet(this, _props).onerror;
  let failed = __privateGet(this, _props).failed;
  var did_reset = false;
  var calling_on_error = false;
  const reset2 = () => {
    if (did_reset) {
      svelte_boundary_reset_noop();
      return;
    }
    did_reset = true;
    if (calling_on_error) {
      svelte_boundary_reset_onerror();
    }
    if (__privateGet(this, _failed_effect) !== null) {
      pause_effect(__privateGet(this, _failed_effect), () => {
        __privateSet(this, _failed_effect, null);
      });
    }
    __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
      __privateMethod(this, _Boundary_instances, render_fn).call(this);
    });
  };
  const handle_error_result = (transformed_error) => {
    try {
      calling_on_error = true;
      onerror?.(transformed_error, reset2);
      calling_on_error = false;
    } catch (error2) {
      invoke_error_boundary(error2, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
    }
    if (failed) {
      __privateSet(this, _failed_effect, __privateMethod(this, _Boundary_instances, run_fn).call(this, () => {
        try {
          return branch(() => {
            var effect2 = (
              /** @type {Effect} */
              active_effect
            );
            effect2.b = this;
            effect2.f |= BOUNDARY_EFFECT;
            failed(
              __privateGet(this, _anchor),
              () => transformed_error,
              () => reset2
            );
          });
        } catch (error2) {
          invoke_error_boundary(
            error2,
            /** @type {Effect} */
            __privateGet(this, _effect).parent
          );
          return null;
        }
      }));
    }
  };
  queue_micro_task(() => {
    var result;
    try {
      result = this.transform_error(error);
    } catch (e) {
      invoke_error_boundary(e, __privateGet(this, _effect) && __privateGet(this, _effect).parent);
      return;
    }
    if (result !== null && typeof result === "object" && typeof /** @type {any} */
    result.then === "function") {
      result.then(
        handle_error_result,
        /** @param {unknown} e */
        (e) => invoke_error_boundary(e, __privateGet(this, _effect) && __privateGet(this, _effect).parent)
      );
    } else {
      handle_error_result(result);
    }
  });
};

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/async.js
function flatten(blockers, sync, async2, fn) {
  const d = is_runes() ? derived : derived_safe_equal;
  var pending3 = blockers.filter((b) => !b.settled);
  var deriveds = sync.map(d);
  if (dev_fallback_default) {
    deriveds.forEach((d2, i) => {
      d2.label = sync[i].toString().replace("() => ", "").replaceAll("$.eager(() => ", "$state.eager(").replace(/\$\.get\((.+?)\)/g, (_, id) => id);
    });
  }
  if (async2.length === 0 && pending3.length === 0) {
    fn(deriveds);
    return;
  }
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  var restore = capture();
  var blocker_promise = pending3.length === 1 ? pending3[0].promise : pending3.length > 1 ? Promise.all(pending3.map((b) => b.promise)) : null;
  function finish(async3) {
    if ((parent.f & DESTROYED) !== 0) {
      return;
    }
    restore();
    try {
      fn([...deriveds, ...async3]);
    } catch (error) {
      invoke_error_boundary(error, parent);
    }
    unset_context();
  }
  var decrement_pending = increment_pending();
  if (async2.length === 0) {
    blocker_promise.then(() => finish([])).finally(decrement_pending);
    return;
  }
  function run3() {
    Promise.all(async2.map((expression) => async_derived(expression))).then(finish).catch((error) => invoke_error_boundary(error, parent)).finally(decrement_pending);
  }
  if (blocker_promise) {
    blocker_promise.then(() => {
      restore();
      run3();
      unset_context();
    });
  } else {
    run3();
  }
}
function capture() {
  var previous_effect = (
    /** @type {Effect} */
    active_effect
  );
  var previous_reaction = active_reaction;
  var previous_component_context = component_context;
  var previous_batch2 = (
    /** @type {Batch} */
    current_batch
  );
  if (dev_fallback_default) {
    var previous_dev_stack = dev_stack;
  }
  return function restore(activate_batch = true) {
    set_active_effect(previous_effect);
    set_active_reaction(previous_reaction);
    set_component_context(previous_component_context);
    if (activate_batch && (previous_effect.f & DESTROYED) === 0) {
      previous_batch2?.activate();
      previous_batch2?.apply();
    }
    if (dev_fallback_default) {
      set_reactivity_loss_tracker(null);
      set_dev_stack(previous_dev_stack);
    }
  };
}
function unset_context(deactivate_batch = true) {
  set_active_effect(null);
  set_active_reaction(null);
  set_component_context(null);
  if (deactivate_batch) current_batch?.deactivate();
  if (dev_fallback_default) {
    set_reactivity_loss_tracker(null);
    set_dev_stack(null);
  }
}
function increment_pending() {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  var boundary2 = effect2.b;
  var batch = (
    /** @type {Batch} */
    current_batch
  );
  var blocking = !!boundary2?.is_rendered();
  boundary2?.update_pending_count(1, batch);
  batch.increment(blocking, effect2);
  return () => {
    boundary2?.update_pending_count(-1, batch);
    batch.decrement(blocking, effect2);
  };
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/deriveds.js
var reactivity_loss_tracker = null;
function set_reactivity_loss_tracker(v) {
  reactivity_loss_tracker = v;
}
var recent_async_deriveds = /* @__PURE__ */ new Set();
// @__NO_SIDE_EFFECTS__
function derived(fn) {
  var flags2 = DERIVED | DIRTY;
  if (active_effect !== null) {
    active_effect.f |= EFFECT_PRESERVED;
  }
  const signal = {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: flags2,
    fn,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      UNINITIALIZED
    ),
    wv: 0,
    parent: active_effect,
    ac: null
  };
  if (dev_fallback_default && tracing_mode_flag) {
    signal.created = get_error("created at");
  }
  return signal;
}
var OBSOLETE = /* @__PURE__ */ Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function async_derived(fn, label, location) {
  let parent = (
    /** @type {Effect | null} */
    active_effect
  );
  if (parent === null) {
    async_derived_orphan();
  }
  var promise = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  );
  var signal = source(
    /** @type {V} */
    UNINITIALIZED
  );
  if (dev_fallback_default) signal.label = label ?? fn.toString();
  var should_suspend = !active_reaction;
  var deferreds = /* @__PURE__ */ new Set();
  async_effect(() => {
    var effect2 = (
      /** @type {Effect} */
      active_effect
    );
    if (dev_fallback_default) {
      reactivity_loss_tracker = { effect: effect2, effect_deps: /* @__PURE__ */ new Set(), warned: false };
    }
    var d = deferred();
    promise = d.promise;
    try {
      Promise.resolve(fn()).then(d.resolve, (e) => {
        if (e !== STALE_REACTION) d.reject(e);
      }).finally(unset_context);
    } catch (error) {
      d.reject(error);
      unset_context();
    }
    if (dev_fallback_default) {
      if (reactivity_loss_tracker) {
        if (effect2.deps !== null) {
          for (let i = 0; i < skipped_deps; i += 1) {
            reactivity_loss_tracker.effect_deps.add(effect2.deps[i]);
          }
        }
        if (new_deps !== null) {
          for (let i = 0; i < new_deps.length; i += 1) {
            reactivity_loss_tracker.effect_deps.add(new_deps[i]);
          }
        }
      }
      reactivity_loss_tracker = null;
    }
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    if (should_suspend) {
      if ((effect2.f & REACTION_RAN) !== 0) {
        var decrement_pending = increment_pending();
      }
      if (
        // boundary can be null if the async derived is inside an $effect.root not connected to the component render tree
        parent.b?.is_rendered()
      ) {
        batch.async_deriveds.get(effect2)?.reject(OBSOLETE);
      } else {
        for (const d2 of deferreds.values()) {
          d2.reject(OBSOLETE);
        }
      }
      deferreds.add(d);
      batch.async_deriveds.set(effect2, d);
    }
    const handler = (value, error = void 0) => {
      if (dev_fallback_default) {
        reactivity_loss_tracker = null;
      }
      decrement_pending?.();
      deferreds.delete(d);
      if (error === OBSOLETE) return;
      batch.activate();
      if (error) {
        signal.f |= ERROR_VALUE;
        internal_set(signal, error);
      } else {
        if ((signal.f & ERROR_VALUE) !== 0) {
          signal.f ^= ERROR_VALUE;
        }
        if (dev_fallback_default && location !== void 0 && !signal.equals(value)) {
          recent_async_deriveds.add(signal);
          setTimeout(() => {
            if (recent_async_deriveds.has(signal) && (effect2.f & DESTROYED) === 0) {
              await_waterfall(
                /** @type {string} */
                signal.label,
                location
              );
              recent_async_deriveds.delete(signal);
            }
          });
        }
        internal_set(signal, value);
      }
      batch.deactivate();
    };
    d.promise.then(handler, (e) => handler(null, e || "unknown"));
  });
  teardown(() => {
    for (const d of deferreds) {
      d.reject(OBSOLETE);
    }
  });
  if (dev_fallback_default) {
    signal.f |= ASYNC;
  }
  return new Promise((fulfil) => {
    function next2(p) {
      function go() {
        if (p === promise) {
          fulfil(signal);
        } else {
          next2(promise);
        }
      }
      p.then(go, go);
    }
    next2(promise);
  });
}
// @__NO_SIDE_EFFECTS__
function user_derived(fn) {
  const d = /* @__PURE__ */ derived(fn);
  if (!async_mode_flag) push_reaction_value(d);
  return d;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(fn) {
  const signal = /* @__PURE__ */ derived(fn);
  signal.equals = safe_equals;
  return signal;
}
function destroy_derived_effects(derived2) {
  var effects = derived2.effects;
  if (effects !== null) {
    derived2.effects = null;
    for (var i = 0; i < effects.length; i += 1) {
      destroy_effect(
        /** @type {Effect} */
        effects[i]
      );
    }
  }
}
var stack = [];
function execute_derived(derived2) {
  var value;
  var prev_active_effect = active_effect;
  var parent = derived2.parent;
  if (!is_destroying_effect && parent !== null && derived2.v !== UNINITIALIZED && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (parent.f & (DESTROYED | INERT)) !== 0) {
    derived_inert();
    return derived2.v;
  }
  set_active_effect(parent);
  if (dev_fallback_default) {
    let prev_eager_effects = eager_effects;
    set_eager_effects(/* @__PURE__ */ new Set());
    try {
      if (includes.call(stack, derived2)) {
        derived_references_self();
      }
      stack.push(derived2);
      derived2.f &= ~WAS_MARKED;
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
      set_eager_effects(prev_eager_effects);
      stack.pop();
    }
  } else {
    try {
      derived2.f &= ~WAS_MARKED;
      destroy_derived_effects(derived2);
      value = update_reaction(derived2);
    } finally {
      set_active_effect(prev_active_effect);
    }
  }
  return value;
}
function update_derived(derived2) {
  var value = execute_derived(derived2);
  if (!derived2.equals(value)) {
    derived2.wv = increment_write_version();
    if (!current_batch?.is_fork || derived2.deps === null) {
      if (current_batch !== null) {
        current_batch.capture(derived2, value, true);
        previous_batch?.capture(derived2, value, true);
      } else {
        derived2.v = value;
      }
      if (derived2.deps === null) {
        set_signal_status(derived2, CLEAN);
        return;
      }
    }
  }
  if (is_destroying_effect) {
    return;
  }
  if (batch_values !== null) {
    if (effect_tracking() || current_batch?.is_fork) {
      batch_values.set(derived2, value);
    }
  } else {
    update_derived_status(derived2);
  }
}
function freeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e of derived2.effects) {
    if (e.teardown || e.ac) {
      e.teardown?.();
      e.ac?.abort(STALE_REACTION);
      if (e.fn !== null) e.teardown = noop;
      e.ac = null;
      remove_reactions(e, 0);
      destroy_effect_children(e);
    }
  }
}
function unfreeze_derived_effects(derived2) {
  if (derived2.effects === null) return;
  for (const e of derived2.effects) {
    if (e.teardown && e.fn !== null) {
      update_effect(e);
    }
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/batch.js
var first_batch = null;
var last_batch = null;
var current_batch = null;
var previous_batch = null;
var batch_values = null;
var last_scheduled_effect = null;
var is_flushing_sync = false;
var is_processing = false;
var collected_effects = null;
var legacy_updates = null;
var flush_count = 0;
var source_stacks = /* @__PURE__ */ new Set();
var uid = 1;
var _started, _prev, _next, _commit_callbacks, _discard_callbacks, _pending, _blocking_pending, _deferred, _roots, _new_effects, _dirty_effects2, _maybe_dirty_effects2, _skipped_branches, _unskipped_branches, _decrement_queued, _Batch_instances, is_deferred_fn, process_fn, traverse_fn, find_earlier_batch_fn, merge_fn, defer_effects_fn, commit_fn, unlink_fn;
var _Batch = class _Batch {
  constructor() {
    __privateAdd(this, _Batch_instances);
    __publicField(this, "id", uid++);
    /** True as soon as `#process` was called */
    __privateAdd(this, _started, false);
    __publicField(this, "linked", true);
    /** @type {Batch | null} */
    __privateAdd(this, _prev, null);
    /** @type {Batch | null} */
    __privateAdd(this, _next, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    __publicField(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    __publicField(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    __publicField(this, "previous", /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    __privateAdd(this, _commit_callbacks, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    __privateAdd(this, _discard_callbacks, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    __privateAdd(this, _pending, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    __privateAdd(this, _blocking_pending, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    __privateAdd(this, _deferred, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    __privateAdd(this, _roots, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    __privateAdd(this, _new_effects, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    __privateAdd(this, _dirty_effects2, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    __privateAdd(this, _maybe_dirty_effects2, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    __privateAdd(this, _skipped_branches, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    __privateAdd(this, _unskipped_branches, /* @__PURE__ */ new Set());
    __publicField(this, "is_fork", false);
    __privateAdd(this, _decrement_queued, false);
    if (last_batch === null) {
      first_batch = last_batch = this;
    } else {
      __privateSet(last_batch, _next, this);
      __privateSet(this, _prev, last_batch);
    }
    last_batch = this;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(effect2) {
    if (!__privateGet(this, _skipped_branches).has(effect2)) {
      __privateGet(this, _skipped_branches).set(effect2, { d: [], m: [] });
    }
    __privateGet(this, _unskipped_branches).delete(effect2);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(effect2, callback = (e) => this.schedule(e)) {
    var tracked = __privateGet(this, _skipped_branches).get(effect2);
    if (tracked) {
      __privateGet(this, _skipped_branches).delete(effect2);
      for (var e of tracked.d) {
        set_signal_status(e, DIRTY);
        callback(e);
      }
      for (e of tracked.m) {
        set_signal_status(e, MAYBE_DIRTY);
        callback(e);
      }
    }
    __privateGet(this, _unskipped_branches).add(effect2);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(source2, value, is_derived = false) {
    if (source2.v !== UNINITIALIZED && !this.previous.has(source2)) {
      this.previous.set(source2, source2.v);
    }
    if ((source2.f & ERROR_VALUE) === 0) {
      this.current.set(source2, [value, is_derived]);
      batch_values?.set(source2, value);
    }
    if (!this.is_fork) {
      source2.v = value;
    }
  }
  activate() {
    current_batch = this;
  }
  deactivate() {
    current_batch = null;
    batch_values = null;
  }
  flush() {
    try {
      if (dev_fallback_default) {
        source_stacks.clear();
      }
      is_processing = true;
      current_batch = this;
      __privateMethod(this, _Batch_instances, process_fn).call(this);
    } finally {
      flush_count = 0;
      last_scheduled_effect = null;
      collected_effects = null;
      legacy_updates = null;
      is_processing = false;
      current_batch = null;
      batch_values = null;
      old_values.clear();
      if (dev_fallback_default) {
        for (const source2 of source_stacks) {
          source2.updated = null;
        }
      }
    }
  }
  discard() {
    for (const fn of __privateGet(this, _discard_callbacks)) fn(this);
    __privateGet(this, _discard_callbacks).clear();
    for (const deferred2 of this.async_deriveds.values()) {
      deferred2.reject(OBSOLETE);
    }
    __privateMethod(this, _Batch_instances, unlink_fn).call(this);
    __privateGet(this, _deferred)?.resolve();
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(effect2) {
    __privateGet(this, _new_effects).push(effect2);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(blocking, effect2) {
    __privateSet(this, _pending, __privateGet(this, _pending) + 1);
    if (blocking) {
      let blocking_pending_count = __privateGet(this, _blocking_pending).get(effect2) ?? 0;
      __privateGet(this, _blocking_pending).set(effect2, blocking_pending_count + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(blocking, effect2) {
    __privateSet(this, _pending, __privateGet(this, _pending) - 1);
    if (blocking) {
      let blocking_pending_count = __privateGet(this, _blocking_pending).get(effect2) ?? 0;
      if (blocking_pending_count === 1) {
        __privateGet(this, _blocking_pending).delete(effect2);
      } else {
        __privateGet(this, _blocking_pending).set(effect2, blocking_pending_count - 1);
      }
    }
    if (__privateGet(this, _decrement_queued)) return;
    __privateSet(this, _decrement_queued, true);
    queue_micro_task(() => {
      __privateSet(this, _decrement_queued, false);
      if (this.linked) {
        this.flush();
      }
    });
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(dirty_effects, maybe_dirty_effects) {
    for (const e of dirty_effects) {
      __privateGet(this, _dirty_effects2).add(e);
    }
    for (const e of maybe_dirty_effects) {
      __privateGet(this, _maybe_dirty_effects2).add(e);
    }
    dirty_effects.clear();
    maybe_dirty_effects.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(fn) {
    __privateGet(this, _commit_callbacks).add(fn);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(fn) {
    __privateGet(this, _discard_callbacks).add(fn);
  }
  settled() {
    return (__privateGet(this, _deferred) ?? __privateSet(this, _deferred, deferred())).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const batch = current_batch = new _Batch();
      if (!is_processing && !is_flushing_sync) {
        queue_micro_task(() => {
          if (!__privateGet(batch, _started)) {
            batch.flush();
          }
        });
      }
    }
    return current_batch;
  }
  apply() {
    if (!async_mode_flag || !this.is_fork && __privateGet(this, _prev) === null && __privateGet(this, _next) === null) {
      batch_values = null;
      return;
    }
    batch_values = /* @__PURE__ */ new Map();
    for (const [source2, [value]] of this.current) {
      batch_values.set(source2, value);
    }
    for (let batch = first_batch; batch !== null; batch = __privateGet(batch, _next)) {
      if (batch === this || batch.is_fork) continue;
      var intersects = false;
      if (batch.id < this.id) {
        for (const [source2, [, is_derived]] of batch.current) {
          if (is_derived) continue;
          if (this.current.has(source2)) {
            intersects = true;
            break;
          }
        }
      }
      if (!intersects) {
        for (const [source2, previous] of batch.previous) {
          if (!batch_values.has(source2)) {
            batch_values.set(source2, previous);
          }
        }
      }
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(effect2) {
    last_scheduled_effect = effect2;
    if (effect2.b?.is_pending && (effect2.f & (EFFECT | RENDER_EFFECT | MANAGED_EFFECT)) !== 0 && (effect2.f & REACTION_RAN) === 0) {
      effect2.b.defer_effect(effect2);
      return;
    }
    var e = effect2;
    while (e.parent !== null) {
      e = e.parent;
      var flags2 = e.f;
      if (collected_effects !== null && e === active_effect) {
        if (async_mode_flag) return;
        if ((active_reaction === null || (active_reaction.f & DERIVED) === 0) && !legacy_is_updating_store) {
          return;
        }
      }
      if ((flags2 & (ROOT_EFFECT | BRANCH_EFFECT)) !== 0) {
        if ((flags2 & CLEAN) === 0) {
          return;
        }
        e.f ^= CLEAN;
      }
    }
    __privateGet(this, _roots).push(e);
  }
};
_started = new WeakMap();
_prev = new WeakMap();
_next = new WeakMap();
_commit_callbacks = new WeakMap();
_discard_callbacks = new WeakMap();
_pending = new WeakMap();
_blocking_pending = new WeakMap();
_deferred = new WeakMap();
_roots = new WeakMap();
_new_effects = new WeakMap();
_dirty_effects2 = new WeakMap();
_maybe_dirty_effects2 = new WeakMap();
_skipped_branches = new WeakMap();
_unskipped_branches = new WeakMap();
_decrement_queued = new WeakMap();
_Batch_instances = new WeakSet();
is_deferred_fn = function() {
  if (this.is_fork) return true;
  for (const effect2 of __privateGet(this, _blocking_pending).keys()) {
    var e = effect2;
    var skipped = false;
    while (e.parent !== null) {
      if (__privateGet(this, _skipped_branches).has(e)) {
        skipped = true;
        break;
      }
      e = e.parent;
    }
    if (!skipped) {
      return true;
    }
  }
  return false;
};
process_fn = function() {
  var _a2, _b, _c;
  __privateSet(this, _started, true);
  if (flush_count++ > 1e3) {
    __privateMethod(this, _Batch_instances, unlink_fn).call(this);
    infinite_loop_guard();
  }
  if (dev_fallback_default) {
    for (const value of this.current.keys()) {
      source_stacks.add(value);
    }
  }
  for (const e of __privateGet(this, _dirty_effects2)) {
    __privateGet(this, _maybe_dirty_effects2).delete(e);
    set_signal_status(e, DIRTY);
    this.schedule(e);
  }
  for (const e of __privateGet(this, _maybe_dirty_effects2)) {
    set_signal_status(e, MAYBE_DIRTY);
    this.schedule(e);
  }
  const roots = __privateGet(this, _roots);
  __privateSet(this, _roots, []);
  this.apply();
  var effects = collected_effects = [];
  var render_effects = [];
  var updates = legacy_updates = [];
  for (const root7 of roots) {
    try {
      __privateMethod(this, _Batch_instances, traverse_fn).call(this, root7, effects, render_effects);
    } catch (e) {
      reset_all(root7);
      if (!__privateMethod(this, _Batch_instances, is_deferred_fn).call(this)) this.discard();
      throw e;
    }
  }
  current_batch = null;
  if (updates.length > 0) {
    var batch = _Batch.ensure();
    for (const e of updates) {
      batch.schedule(e);
    }
  }
  collected_effects = null;
  legacy_updates = null;
  if (__privateMethod(this, _Batch_instances, is_deferred_fn).call(this)) {
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, render_effects);
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, effects);
    for (const [e, t] of __privateGet(this, _skipped_branches)) {
      reset_branch(e, t);
    }
    if (updates.length > 0) {
      /** @type {unknown} */
      __privateMethod(_a2 = current_batch, _Batch_instances, process_fn).call(_a2);
    }
    return;
  }
  const earlier_batch = __privateMethod(this, _Batch_instances, find_earlier_batch_fn).call(this);
  if (earlier_batch) {
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, render_effects);
    __privateMethod(this, _Batch_instances, defer_effects_fn).call(this, effects);
    __privateMethod(_b = earlier_batch, _Batch_instances, merge_fn).call(_b, this);
    return;
  }
  __privateGet(this, _dirty_effects2).clear();
  __privateGet(this, _maybe_dirty_effects2).clear();
  for (const fn of __privateGet(this, _commit_callbacks)) fn(this);
  __privateGet(this, _commit_callbacks).clear();
  previous_batch = this;
  flush_queued_effects(render_effects);
  flush_queued_effects(effects);
  previous_batch = null;
  __privateGet(this, _deferred)?.resolve();
  var next_batch = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    current_batch
  );
  if (__privateGet(this, _pending) === 0 && (__privateGet(this, _roots).length === 0 || next_batch !== null)) {
    __privateMethod(this, _Batch_instances, unlink_fn).call(this);
    if (async_mode_flag) {
      __privateMethod(this, _Batch_instances, commit_fn).call(this);
      current_batch = next_batch;
    }
  }
  if (__privateGet(this, _roots).length > 0) {
    if (next_batch !== null) {
      const batch2 = next_batch;
      __privateGet(batch2, _roots).push(...__privateGet(this, _roots).filter((r) => !__privateGet(batch2, _roots).includes(r)));
    } else {
      next_batch = this;
    }
  }
  if (next_batch !== null) {
    __privateMethod(_c = next_batch, _Batch_instances, process_fn).call(_c);
  }
};
/**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
traverse_fn = function(root7, effects, render_effects) {
  root7.f ^= CLEAN;
  var effect2 = root7.first;
  while (effect2 !== null) {
    var flags2 = effect2.f;
    var is_branch = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0;
    var is_skippable_branch = is_branch && (flags2 & CLEAN) !== 0;
    var skip = is_skippable_branch || (flags2 & INERT) !== 0 || __privateGet(this, _skipped_branches).has(effect2);
    if (!skip && effect2.fn !== null) {
      if (is_branch) {
        effect2.f ^= CLEAN;
      } else if ((flags2 & EFFECT) !== 0) {
        effects.push(effect2);
      } else if (async_mode_flag && (flags2 & (RENDER_EFFECT | MANAGED_EFFECT)) !== 0) {
        render_effects.push(effect2);
      } else if (is_dirty(effect2)) {
        if ((flags2 & BLOCK_EFFECT) !== 0) __privateGet(this, _maybe_dirty_effects2).add(effect2);
        update_effect(effect2);
      }
      var child2 = effect2.first;
      if (child2 !== null) {
        effect2 = child2;
        continue;
      }
    }
    while (effect2 !== null) {
      var next2 = effect2.next;
      if (next2 !== null) {
        effect2 = next2;
        break;
      }
      effect2 = effect2.parent;
    }
  }
};
find_earlier_batch_fn = function() {
  var batch = __privateGet(this, _prev);
  while (batch !== null) {
    if (!batch.is_fork) {
      for (const [value, [, is_derived]] of this.current) {
        if (batch.current.has(value) && !is_derived) {
          return batch;
        }
      }
    }
    batch = __privateGet(batch, _prev);
  }
  return null;
};
/**
 * @param {Batch} batch
 */
merge_fn = function(batch) {
  var _a2;
  for (const [source2, value] of batch.current) {
    if (!this.previous.has(source2) && batch.previous.has(source2)) {
      this.previous.set(source2, batch.previous.get(source2));
    }
    this.current.set(source2, value);
  }
  for (const [effect2, deferred2] of batch.async_deriveds) {
    const d = this.async_deriveds.get(effect2);
    if (d) deferred2.promise.then(d.resolve).catch(d.reject);
  }
  batch.async_deriveds.clear();
  this.transfer_effects(__privateGet(batch, _dirty_effects2), __privateGet(batch, _maybe_dirty_effects2));
  const mark = (value) => {
    var reactions = value.reactions;
    if (reactions === null) return;
    for (const reaction of reactions) {
      var flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark(
          /** @type {Derived} */
          reaction
        );
      } else {
        var effect2 = (
          /** @type {Effect} */
          reaction
        );
        if (flags2 & (ASYNC | BLOCK_EFFECT) && !this.async_deriveds.has(effect2)) {
          __privateGet(this, _maybe_dirty_effects2).delete(effect2);
          set_signal_status(effect2, DIRTY);
          this.schedule(effect2);
        }
      }
    }
  };
  for (const source2 of this.current.keys()) {
    mark(source2);
  }
  this.oncommit(() => batch.discard());
  __privateMethod(_a2 = batch, _Batch_instances, unlink_fn).call(_a2);
  current_batch = this;
  __privateMethod(this, _Batch_instances, process_fn).call(this);
};
/**
 * @param {Effect[]} effects
 */
defer_effects_fn = function(effects) {
  for (var i = 0; i < effects.length; i += 1) {
    defer_effect(effects[i], __privateGet(this, _dirty_effects2), __privateGet(this, _maybe_dirty_effects2));
  }
};
commit_fn = function() {
  var _a2;
  for (let batch = first_batch; batch !== null; batch = __privateGet(batch, _next)) {
    var is_earlier = batch.id < this.id;
    var sources = [];
    for (const [source3, [value, is_derived]] of this.current) {
      if (batch.current.has(source3)) {
        var batch_value = (
          /** @type {[any, boolean]} */
          batch.current.get(source3)[0]
        );
        if (is_earlier && value !== batch_value) {
          batch.current.set(source3, [value, is_derived]);
        } else {
          continue;
        }
      }
      sources.push(source3);
    }
    if (is_earlier) {
      for (const [effect2, deferred2] of this.async_deriveds) {
        const d = batch.async_deriveds.get(effect2);
        if (d) deferred2.promise.then(d.resolve).catch(d.reject);
      }
    }
    var current = [...batch.current.keys()].filter(
      (source3) => !/** @type {[any, boolean]} */
      batch.current.get(source3)[1]
    );
    if (!__privateGet(batch, _started) || current.length === 0) continue;
    var others = current.filter((source3) => !this.current.has(source3));
    if (others.length === 0) {
      if (is_earlier) {
        batch.discard();
      }
    } else if (sources.length > 0) {
      if (dev_fallback_default && !__privateGet(batch, _decrement_queued)) {
        invariant(__privateGet(batch, _roots).length === 0, "Batch has scheduled roots");
      }
      if (is_earlier) {
        for (const unskipped of __privateGet(this, _unskipped_branches)) {
          batch.unskip_effect(unskipped, (e) => {
            var _a3;
            if ((e.f & (BLOCK_EFFECT | ASYNC)) !== 0) {
              batch.schedule(e);
            } else {
              __privateMethod(_a3 = batch, _Batch_instances, defer_effects_fn).call(_a3, [e]);
            }
          });
        }
      }
      batch.activate();
      var marked = /* @__PURE__ */ new Set();
      var checked = /* @__PURE__ */ new Map();
      for (var source2 of sources) {
        mark_effects(source2, others, marked, checked);
      }
      checked = /* @__PURE__ */ new Map();
      var current_unequal = [...batch.current].filter(([c, v1]) => {
        const v2 = this.current.get(c);
        if (!v2) return true;
        return v2[0] !== v1[0] || v2[1] !== v1[1];
      }).map(([c]) => c);
      if (current_unequal.length > 0) {
        for (const effect2 of __privateGet(this, _new_effects)) {
          if ((effect2.f & (DESTROYED | INERT | EAGER_EFFECT)) === 0 && depends_on(effect2, current_unequal, checked)) {
            if ((effect2.f & (ASYNC | BLOCK_EFFECT)) !== 0) {
              set_signal_status(effect2, DIRTY);
              batch.schedule(effect2);
            } else {
              __privateGet(batch, _dirty_effects2).add(effect2);
            }
          }
        }
      }
      if (__privateGet(batch, _roots).length > 0 && !__privateGet(batch, _decrement_queued)) {
        batch.apply();
        for (var root7 of __privateGet(batch, _roots)) {
          __privateMethod(_a2 = batch, _Batch_instances, traverse_fn).call(_a2, root7, [], []);
        }
        __privateSet(batch, _roots, []);
      }
      batch.deactivate();
    }
  }
};
unlink_fn = function() {
  if (!this.linked) return;
  var prev = __privateGet(this, _prev);
  var next2 = __privateGet(this, _next);
  if (prev === null) {
    first_batch = next2;
  } else {
    __privateSet(prev, _next, next2);
  }
  if (next2 === null) {
    last_batch = prev;
  } else {
    __privateSet(next2, _prev, prev);
  }
  this.linked = false;
};
var Batch = _Batch;
function flushSync(fn) {
  var was_flushing_sync = is_flushing_sync;
  is_flushing_sync = true;
  try {
    var result;
    if (fn) {
      if (current_batch !== null && !current_batch.is_fork) {
        current_batch.flush();
      }
      result = fn();
    }
    while (true) {
      flush_tasks();
      if (current_batch === null) {
        return (
          /** @type {T} */
          result
        );
      }
      current_batch.flush();
    }
  } finally {
    is_flushing_sync = was_flushing_sync;
  }
}
function infinite_loop_guard() {
  if (dev_fallback_default) {
    var updates = /* @__PURE__ */ new Map();
    for (
      const source2 of
      /** @type {Batch} */
      current_batch.current.keys()
    ) {
      for (const [stack2, update2] of source2.updated ?? []) {
        var entry = updates.get(stack2);
        if (!entry) {
          entry = { error: update2.error, count: 0 };
          updates.set(stack2, entry);
        }
        entry.count += update2.count;
      }
    }
    for (const update2 of updates.values()) {
      if (update2.error) {
        console.error(update2.error);
      }
    }
  }
  try {
    effect_update_depth_exceeded();
  } catch (error) {
    if (dev_fallback_default) {
      define_property(error, "stack", { value: "" });
    }
    invoke_error_boundary(error, last_scheduled_effect);
  }
}
var eager_block_effects = null;
function flush_queued_effects(effects) {
  var length = effects.length;
  if (length === 0) return;
  var i = 0;
  while (i < length) {
    var effect2 = effects[i++];
    if ((effect2.f & (DESTROYED | INERT)) === 0 && is_dirty(effect2)) {
      eager_block_effects = /* @__PURE__ */ new Set();
      update_effect(effect2);
      if (effect2.deps === null && effect2.first === null && effect2.nodes === null && effect2.teardown === null && effect2.ac === null) {
        unlink_effect(effect2);
      }
      if (eager_block_effects?.size > 0) {
        old_values.clear();
        for (const e of eager_block_effects) {
          if ((e.f & (DESTROYED | INERT)) !== 0) continue;
          const ordered_effects = [e];
          let ancestor = e.parent;
          while (ancestor !== null) {
            if (eager_block_effects.has(ancestor)) {
              eager_block_effects.delete(ancestor);
              ordered_effects.push(ancestor);
            }
            ancestor = ancestor.parent;
          }
          for (let j = ordered_effects.length - 1; j >= 0; j--) {
            const e2 = ordered_effects[j];
            if ((e2.f & (DESTROYED | INERT)) !== 0) continue;
            update_effect(e2);
          }
        }
        eager_block_effects.clear();
      }
    }
  }
  eager_block_effects = null;
}
function mark_effects(value, sources, marked, checked) {
  if (marked.has(value)) return;
  marked.add(value);
  if (value.reactions !== null) {
    for (const reaction of value.reactions) {
      const flags2 = reaction.f;
      if ((flags2 & DERIVED) !== 0) {
        mark_effects(
          /** @type {Derived} */
          reaction,
          sources,
          marked,
          checked
        );
      } else if ((flags2 & (ASYNC | BLOCK_EFFECT)) !== 0 && (flags2 & DIRTY) === 0 && depends_on(reaction, sources, checked)) {
        set_signal_status(reaction, DIRTY);
        schedule_effect(
          /** @type {Effect} */
          reaction
        );
      }
    }
  }
}
function depends_on(reaction, sources, checked) {
  const depends = checked.get(reaction);
  if (depends !== void 0) return depends;
  if (reaction.deps !== null) {
    for (const dep of reaction.deps) {
      if (includes.call(sources, dep)) {
        return true;
      }
      if ((dep.f & DERIVED) !== 0 && depends_on(
        /** @type {Derived} */
        dep,
        sources,
        checked
      )) {
        checked.set(
          /** @type {Derived} */
          dep,
          true
        );
        return true;
      }
    }
  }
  checked.set(reaction, false);
  return false;
}
function schedule_effect(effect2) {
  current_batch.schedule(effect2);
}
function reset_branch(effect2, tracked) {
  if ((effect2.f & BRANCH_EFFECT) !== 0 && (effect2.f & CLEAN) !== 0) {
    return;
  }
  if ((effect2.f & DIRTY) !== 0) {
    tracked.d.push(effect2);
  } else if ((effect2.f & MAYBE_DIRTY) !== 0) {
    tracked.m.push(effect2);
  }
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_branch(e, tracked);
    e = e.next;
  }
}
function reset_all(effect2) {
  set_signal_status(effect2, CLEAN);
  var e = effect2.first;
  while (e !== null) {
    reset_all(e);
    e = e.next;
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/sources.js
var eager_effects = /* @__PURE__ */ new Set();
var old_values = /* @__PURE__ */ new Map();
function set_eager_effects(v) {
  eager_effects = v;
}
var eager_effects_deferred = false;
function set_eager_effects_deferred() {
  eager_effects_deferred = true;
}
function source(v, stack2) {
  var signal = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  if (dev_fallback_default && tracing_mode_flag) {
    signal.created = stack2 ?? get_error("created at");
    signal.updated = null;
    signal.set_during_effect = false;
    signal.trace = null;
  }
  return signal;
}
// @__NO_SIDE_EFFECTS__
function state(v, stack2) {
  const s = source(v, stack2);
  push_reaction_value(s);
  return s;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value, immutable = false, trackable = true) {
  var _a2;
  const s = source(initial_value);
  if (!immutable) {
    s.equals = safe_equals;
  }
  if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
    ((_a2 = component_context.l).s ?? (_a2.s = [])).push(s);
  }
  return s;
}
function set(source2, value, should_proxy = false) {
  if (active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || (active_reaction.f & EAGER_EFFECT) !== 0) && is_runes() && (active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | EAGER_EFFECT)) !== 0 && (current_sources === null || !current_sources.has(source2))) {
    state_unsafe_mutation();
  }
  let new_value = should_proxy ? proxy(value) : value;
  if (dev_fallback_default) {
    tag_proxy(
      new_value,
      /** @type {string} */
      source2.label
    );
  }
  return internal_set(source2, new_value, legacy_updates);
}
function internal_set(source2, value, updated_during_traversal = null) {
  if (!source2.equals(value)) {
    old_values.set(source2, is_destroying_effect ? value : source2.v);
    var batch = Batch.ensure();
    batch.capture(source2, value);
    if (dev_fallback_default) {
      if (tracing_mode_flag || active_effect !== null) {
        source2.updated ?? (source2.updated = /* @__PURE__ */ new Map());
        const count = (source2.updated.get("")?.count ?? 0) + 1;
        source2.updated.set("", { error: (
          /** @type {any} */
          null
        ), count });
        if (tracing_mode_flag || count > 5) {
          const error = get_error("updated at");
          if (error !== null) {
            let entry = source2.updated.get(error.stack);
            if (!entry) {
              entry = { error, count: 0 };
              source2.updated.set(error.stack, entry);
            }
            entry.count++;
          }
        }
      }
      if (active_effect !== null) {
        source2.set_during_effect = true;
      }
    }
    if ((source2.f & DERIVED) !== 0) {
      const derived2 = (
        /** @type {Derived} */
        source2
      );
      if ((source2.f & DIRTY) !== 0) {
        execute_derived(derived2);
      }
      if (batch_values === null) {
        update_derived_status(derived2);
      }
    }
    source2.wv = increment_write_version();
    mark_reactions(source2, DIRTY, updated_during_traversal);
    if (is_runes() && active_effect !== null && (active_effect.f & CLEAN) !== 0 && (active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0) {
      if (untracked_writes === null) {
        set_untracked_writes([source2]);
      } else {
        untracked_writes.push(source2);
      }
    }
    if (!batch.is_fork && eager_effects.size > 0 && !eager_effects_deferred) {
      flush_eager_effects();
    }
  }
  return value;
}
function flush_eager_effects() {
  eager_effects_deferred = false;
  for (const effect2 of eager_effects) {
    if ((effect2.f & CLEAN) !== 0) {
      set_signal_status(effect2, MAYBE_DIRTY);
    }
    let dirty;
    try {
      dirty = is_dirty(effect2);
    } catch {
      dirty = true;
    }
    if (dirty) {
      update_effect(effect2);
    }
  }
  eager_effects.clear();
}
function increment(source2) {
  set(source2, source2.v + 1);
}
function mark_reactions(signal, status, updated_during_traversal) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  var runes = is_runes();
  var length = reactions.length;
  for (var i = 0; i < length; i++) {
    var reaction = reactions[i];
    var flags2 = reaction.f;
    if (!runes && reaction === active_effect) continue;
    var not_dirty = (flags2 & DIRTY) === 0;
    if (not_dirty) {
      set_signal_status(reaction, status);
    }
    if ((flags2 & EAGER_EFFECT) !== 0) {
      eager_effects.add(
        /** @type {Effect} */
        reaction
      );
    } else if ((flags2 & DERIVED) !== 0) {
      var derived2 = (
        /** @type {Derived} */
        reaction
      );
      batch_values?.delete(derived2);
      if ((flags2 & WAS_MARKED) === 0) {
        if (flags2 & CONNECTED && (active_effect === null || (active_effect.f & REACTION_IS_UPDATING) === 0)) {
          reaction.f |= WAS_MARKED;
        }
        mark_reactions(derived2, MAYBE_DIRTY, updated_during_traversal);
      }
    } else if (not_dirty) {
      var effect2 = (
        /** @type {Effect} */
        reaction
      );
      if ((flags2 & BLOCK_EFFECT) !== 0 && eager_block_effects !== null) {
        eager_block_effects.add(effect2);
      }
      if (updated_during_traversal !== null) {
        updated_during_traversal.push(effect2);
      } else {
        schedule_effect(effect2);
      }
    }
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/proxy.js
var regex_is_valid_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
function proxy(value) {
  if (typeof value !== "object" || value === null || STATE_SYMBOL in value) {
    return value;
  }
  const prototype = get_prototype_of(value);
  if (prototype !== object_prototype && prototype !== array_prototype) {
    return value;
  }
  var sources = /* @__PURE__ */ new Map();
  var is_proxied_array = is_array(value);
  var version = state(0);
  var stack2 = dev_fallback_default && tracing_mode_flag ? get_error("created at") : null;
  var parent_version = update_version;
  var with_parent = (fn) => {
    if (update_version === parent_version) {
      return fn();
    }
    var reaction = active_reaction;
    var version2 = update_version;
    set_active_reaction(null);
    set_update_version(parent_version);
    var result = fn();
    set_active_reaction(reaction);
    set_update_version(version2);
    return result;
  };
  if (is_proxied_array) {
    sources.set("length", state(
      /** @type {any[]} */
      value.length,
      stack2
    ));
    if (dev_fallback_default) {
      value = /** @type {any} */
      inspectable_array(
        /** @type {any[]} */
        value
      );
    }
  }
  var path = "";
  let updating = false;
  function update_path(new_path) {
    if (updating) return;
    updating = true;
    path = new_path;
    tag(version, `${path} version`);
    for (const [prop2, source2] of sources) {
      tag(source2, get_label(path, prop2));
    }
    updating = false;
  }
  return new Proxy(
    /** @type {any} */
    value,
    {
      defineProperty(_, prop2, descriptor) {
        if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) {
          state_descriptors_fixed();
        }
        var s = sources.get(prop2);
        if (s === void 0) {
          with_parent(() => {
            var s2 = state(descriptor.value, stack2);
            sources.set(prop2, s2);
            if (dev_fallback_default && typeof prop2 === "string") {
              tag(s2, get_label(path, prop2));
            }
            return s2;
          });
        } else {
          set(s, descriptor.value, true);
        }
        return true;
      },
      deleteProperty(target, prop2) {
        var s = sources.get(prop2);
        if (s === void 0) {
          if (prop2 in target) {
            const s2 = with_parent(() => state(UNINITIALIZED, stack2));
            sources.set(prop2, s2);
            increment(version);
            if (dev_fallback_default) {
              tag(s2, get_label(path, prop2));
            }
          }
        } else {
          set(s, UNINITIALIZED);
          increment(version);
        }
        return true;
      },
      get(target, prop2, receiver) {
        if (prop2 === STATE_SYMBOL) {
          return value;
        }
        if (dev_fallback_default && prop2 === PROXY_PATH_SYMBOL) {
          return update_path;
        }
        var s = sources.get(prop2);
        var exists = prop2 in target;
        if (s === void 0 && (!exists || get_descriptor(target, prop2)?.writable)) {
          s = with_parent(() => {
            var p = proxy(exists ? target[prop2] : UNINITIALIZED);
            var s2 = state(p, stack2);
            if (dev_fallback_default) {
              tag(s2, get_label(path, prop2));
            }
            return s2;
          });
          sources.set(prop2, s);
        }
        if (s !== void 0) {
          var v = get2(s);
          return v === UNINITIALIZED ? void 0 : v;
        }
        return Reflect.get(target, prop2, receiver);
      },
      getOwnPropertyDescriptor(target, prop2) {
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor && "value" in descriptor) {
          var s = sources.get(prop2);
          if (s) descriptor.value = get2(s);
        } else if (descriptor === void 0) {
          var source2 = sources.get(prop2);
          var value2 = source2?.v;
          if (source2 !== void 0 && value2 !== UNINITIALIZED) {
            return {
              enumerable: true,
              configurable: true,
              value: value2,
              writable: true
            };
          }
        }
        return descriptor;
      },
      has(target, prop2) {
        if (prop2 === STATE_SYMBOL) {
          return true;
        }
        var s = sources.get(prop2);
        var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop2);
        if (s !== void 0 || active_effect !== null && (!has || get_descriptor(target, prop2)?.writable)) {
          if (s === void 0) {
            s = with_parent(() => {
              var p = has ? proxy(target[prop2]) : UNINITIALIZED;
              var s2 = state(p, stack2);
              if (dev_fallback_default) {
                tag(s2, get_label(path, prop2));
              }
              return s2;
            });
            sources.set(prop2, s);
          }
          var value2 = get2(s);
          if (value2 === UNINITIALIZED) {
            return false;
          }
        }
        return has;
      },
      set(target, prop2, value2, receiver) {
        var s = sources.get(prop2);
        var has = prop2 in target;
        if (is_proxied_array && prop2 === "length") {
          for (var i = value2; i < /** @type {Source<number>} */
          s.v; i += 1) {
            var other_s = sources.get(i + "");
            if (other_s !== void 0) {
              set(other_s, UNINITIALIZED);
            } else if (i in target) {
              other_s = with_parent(() => state(UNINITIALIZED, stack2));
              sources.set(i + "", other_s);
              if (dev_fallback_default) {
                tag(other_s, get_label(path, i));
              }
            }
          }
        }
        if (s === void 0) {
          if (!has || get_descriptor(target, prop2)?.writable) {
            s = with_parent(() => state(void 0, stack2));
            if (dev_fallback_default) {
              tag(s, get_label(path, prop2));
            }
            set(s, proxy(value2));
            sources.set(prop2, s);
          }
        } else {
          has = s.v !== UNINITIALIZED;
          var p = with_parent(() => proxy(value2));
          set(s, p);
        }
        var descriptor = Reflect.getOwnPropertyDescriptor(target, prop2);
        if (descriptor?.set) {
          descriptor.set.call(receiver, value2);
        }
        if (!has) {
          if (is_proxied_array && typeof prop2 === "string") {
            var ls = (
              /** @type {Source<number>} */
              sources.get("length")
            );
            var n = Number(prop2);
            if (Number.isInteger(n) && n >= ls.v) {
              set(ls, n + 1);
            }
          }
          increment(version);
        }
        return true;
      },
      ownKeys(target) {
        get2(version);
        var own_keys = Reflect.ownKeys(target).filter((key3) => {
          var source3 = sources.get(key3);
          return source3 === void 0 || source3.v !== UNINITIALIZED;
        });
        for (var [key2, source2] of sources) {
          if (source2.v !== UNINITIALIZED && !(key2 in target)) {
            own_keys.push(key2);
          }
        }
        return own_keys;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function get_label(path, prop2) {
  if (typeof prop2 === "symbol") return `${path}[Symbol(${prop2.description ?? ""})]`;
  if (regex_is_valid_identifier.test(prop2)) return `${path}.${prop2}`;
  return /^\d+$/.test(prop2) ? `${path}[${prop2}]` : `${path}['${prop2}']`;
}
function get_proxied_value(value) {
  try {
    if (value !== null && typeof value === "object" && STATE_SYMBOL in value) {
      return value[STATE_SYMBOL];
    }
  } catch {
  }
  return value;
}
function is(a, b) {
  return Object.is(get_proxied_value(a), get_proxied_value(b));
}
var ARRAY_MUTATING_METHODS = /* @__PURE__ */ new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift"
]);
function inspectable_array(array) {
  return new Proxy(array, {
    get(target, prop2, receiver) {
      var value = Reflect.get(target, prop2, receiver);
      if (!ARRAY_MUTATING_METHODS.has(
        /** @type {string} */
        prop2
      )) {
        return value;
      }
      return function(...args) {
        set_eager_effects_deferred();
        var result = value.apply(this, args);
        flush_eager_effects();
        return result;
      };
    }
  });
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dev/equality.js
function init_array_prototype_warnings() {
  const array_prototype2 = Array.prototype;
  const cleanup = Array.__svelte_cleanup;
  if (cleanup) {
    cleanup();
  }
  const { indexOf, lastIndexOf, includes: includes2 } = array_prototype2;
  array_prototype2.indexOf = function(item, from_index) {
    const index2 = indexOf.call(this, item, from_index);
    if (index2 === -1) {
      for (let i = from_index ?? 0; i < this.length; i += 1) {
        if (get_proxied_value(this[i]) === item) {
          state_proxy_equality_mismatch("array.indexOf(...)");
          break;
        }
      }
    }
    return index2;
  };
  array_prototype2.lastIndexOf = function(item, from_index) {
    const index2 = lastIndexOf.call(this, item, from_index ?? this.length - 1);
    if (index2 === -1) {
      for (let i = 0; i <= (from_index ?? this.length - 1); i += 1) {
        if (get_proxied_value(this[i]) === item) {
          state_proxy_equality_mismatch("array.lastIndexOf(...)");
          break;
        }
      }
    }
    return index2;
  };
  array_prototype2.includes = function(item, from_index) {
    const has = includes2.call(this, item, from_index);
    if (!has) {
      for (let i = 0; i < this.length; i += 1) {
        if (get_proxied_value(this[i]) === item) {
          state_proxy_equality_mismatch("array.includes(...)");
          break;
        }
      }
    }
    return has;
  };
  Array.__svelte_cleanup = () => {
    array_prototype2.indexOf = indexOf;
    array_prototype2.lastIndexOf = lastIndexOf;
    array_prototype2.includes = includes2;
  };
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/operations.js
var $window;
var $document;
var is_firefox;
var first_child_getter;
var next_sibling_getter;
function init_operations() {
  if ($window !== void 0) {
    return;
  }
  $window = window;
  $document = document;
  is_firefox = /Firefox/.test(navigator.userAgent);
  var element_prototype = Element.prototype;
  var node_prototype = Node.prototype;
  var text_prototype = Text.prototype;
  first_child_getter = get_descriptor(node_prototype, "firstChild").get;
  next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
  if (is_extensible(element_prototype)) {
    element_prototype[CLASS_CACHE] = void 0;
    element_prototype[ATTRIBUTES_CACHE] = null;
    element_prototype[STYLE_CACHE] = void 0;
    element_prototype.__e = void 0;
  }
  if (is_extensible(text_prototype)) {
    text_prototype[TEXT_CACHE] = void 0;
  }
  if (dev_fallback_default) {
    element_prototype.__svelte_meta = null;
    init_array_prototype_warnings();
  }
}
function create_text(value = "") {
  return document.createTextNode(value);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(node) {
  return (
    /** @type {TemplateNode | null} */
    first_child_getter.call(node)
  );
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(node) {
  return (
    /** @type {TemplateNode | null} */
    next_sibling_getter.call(node)
  );
}
function child(node, is_text) {
  if (!hydrating) {
    return /* @__PURE__ */ get_first_child(node);
  }
  var child2 = /* @__PURE__ */ get_first_child(hydrate_node);
  if (child2 === null) {
    child2 = hydrate_node.appendChild(create_text());
  } else if (is_text && child2.nodeType !== TEXT_NODE) {
    var text2 = create_text();
    child2?.before(text2);
    set_hydrate_node(text2);
    return text2;
  }
  if (is_text) {
    merge_text_nodes(
      /** @type {Text} */
      child2
    );
  }
  set_hydrate_node(child2);
  return child2;
}
function first_child(node, is_text = false) {
  if (!hydrating) {
    var first = /* @__PURE__ */ get_first_child(node);
    if (first instanceof Comment && first.data === "") return /* @__PURE__ */ get_next_sibling(first);
    return first;
  }
  if (is_text) {
    if (hydrate_node?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      hydrate_node?.before(text2);
      set_hydrate_node(text2);
      return text2;
    }
    merge_text_nodes(
      /** @type {Text} */
      hydrate_node
    );
  }
  return hydrate_node;
}
function sibling(node, count = 1, is_text = false) {
  let next_sibling = hydrating ? hydrate_node : node;
  var last_sibling;
  while (count--) {
    last_sibling = next_sibling;
    next_sibling = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(next_sibling);
  }
  if (!hydrating) {
    return next_sibling;
  }
  if (is_text) {
    if (next_sibling?.nodeType !== TEXT_NODE) {
      var text2 = create_text();
      if (next_sibling === null) {
        last_sibling?.after(text2);
      } else {
        next_sibling.before(text2);
      }
      set_hydrate_node(text2);
      return text2;
    }
    merge_text_nodes(
      /** @type {Text} */
      next_sibling
    );
  }
  set_hydrate_node(next_sibling);
  return next_sibling;
}
function clear_text_content(node) {
  node.textContent = "";
}
function should_defer_append() {
  if (!async_mode_flag) return false;
  if (eager_block_effects !== null) return false;
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  return (flags2 & REACTION_RAN) !== 0;
}
function create_element(tag2, namespace, is2) {
  if (namespace == null || namespace === NAMESPACE_HTML) {
    return (
      /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
      is2 ? document.createElement(tag2, { is: is2 }) : document.createElement(tag2)
    );
  }
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    is2 ? document.createElementNS(namespace, tag2, { is: is2 }) : document.createElementNS(namespace, tag2)
  );
}
function merge_text_nodes(text2) {
  if (
    /** @type {string} */
    text2.nodeValue.length < 65536
  ) {
    return;
  }
  let next2 = text2.nextSibling;
  while (next2 !== null && next2.nodeType === TEXT_NODE) {
    next2.remove();
    text2.nodeValue += /** @type {string} */
    next2.nodeValue;
    next2 = text2.nextSibling;
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/misc.js
var listening_to_form_reset = false;
function add_form_reset_listener() {
  if (!listening_to_form_reset) {
    listening_to_form_reset = true;
    document.addEventListener(
      "reset",
      (evt) => {
        Promise.resolve().then(() => {
          if (!evt.defaultPrevented) {
            for (
              const e of
              /**@type {HTMLFormElement} */
              evt.target.elements
            ) {
              e[FORM_RESET_HANDLER]?.();
            }
          }
        });
      },
      // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
      { capture: true }
    );
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
function without_reactive_context(fn) {
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    return fn();
  } finally {
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}
function listen_to_event_and_reset_event(element2, event2, handler, on_reset = handler) {
  element2.addEventListener(event2, () => without_reactive_context(handler));
  const prev = (
    /** @type {any} */
    element2[FORM_RESET_HANDLER]
  );
  if (prev) {
    element2[FORM_RESET_HANDLER] = () => {
      prev();
      on_reset(true);
    };
  } else {
    element2[FORM_RESET_HANDLER] = () => on_reset(true);
  }
  add_form_reset_listener();
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/effects.js
function validate_effect(rune) {
  if (active_effect === null) {
    if (active_reaction === null) {
      effect_orphan(rune);
    }
    effect_in_unowned_derived();
  }
  if (is_destroying_effect) {
    effect_in_teardown(rune);
  }
}
function push_effect(effect2, parent_effect) {
  var parent_last = parent_effect.last;
  if (parent_last === null) {
    parent_effect.last = parent_effect.first = effect2;
  } else {
    parent_last.next = effect2;
    effect2.prev = parent_last;
    parent_effect.last = effect2;
  }
}
function create_effect(type, fn) {
  var parent = active_effect;
  if (dev_fallback_default) {
    while (parent !== null && (parent.f & EAGER_EFFECT) !== 0) {
      parent = parent.parent;
    }
  }
  if (parent !== null && (parent.f & INERT) !== 0) {
    type |= INERT;
  }
  var effect2 = {
    ctx: component_context,
    deps: null,
    nodes: null,
    f: type | DIRTY | CONNECTED,
    first: null,
    fn,
    last: null,
    next: null,
    parent,
    b: parent && parent.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  };
  if (dev_fallback_default) {
    effect2.component_function = dev_current_component_function;
  }
  current_batch?.register_created_effect(effect2);
  var e = effect2;
  if ((type & EFFECT) !== 0) {
    if (collected_effects !== null) {
      collected_effects.push(effect2);
    } else {
      Batch.ensure().schedule(effect2);
    }
  } else if (fn !== null) {
    try {
      update_effect(effect2);
    } catch (e2) {
      destroy_effect(effect2);
      throw e2;
    }
    if (e.deps === null && e.teardown === null && e.nodes === null && e.first === e.last && // either `null`, or a singular child
    (e.f & EFFECT_PRESERVED) === 0) {
      e = e.first;
      if ((type & BLOCK_EFFECT) !== 0 && (type & EFFECT_TRANSPARENT) !== 0 && e !== null) {
        e.f |= EFFECT_TRANSPARENT;
      }
    }
  }
  if (e !== null) {
    e.parent = parent;
    if (parent !== null) {
      push_effect(e, parent);
    }
    if (active_reaction !== null && (active_reaction.f & DERIVED) !== 0 && (type & ROOT_EFFECT) === 0) {
      var derived2 = (
        /** @type {Derived} */
        active_reaction
      );
      (derived2.effects ?? (derived2.effects = [])).push(e);
    }
  }
  return effect2;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(fn) {
  const effect2 = create_effect(RENDER_EFFECT, null);
  set_signal_status(effect2, CLEAN);
  effect2.teardown = fn;
  return effect2;
}
function user_effect(fn) {
  validate_effect("$effect");
  if (dev_fallback_default) {
    define_property(fn, "name", {
      value: "$effect"
    });
  }
  var flags2 = (
    /** @type {Effect} */
    active_effect.f
  );
  var defer = !active_reaction && (flags2 & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.i;
  if (defer) {
    var context = (
      /** @type {ComponentContext} */
      component_context
    );
    (context.e ?? (context.e = [])).push(fn);
  } else {
    return create_user_effect(fn);
  }
}
function create_user_effect(fn) {
  return create_effect(EFFECT | USER_EFFECT, fn);
}
function effect_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
  return () => {
    destroy_effect(effect2);
  };
}
function component_root(fn) {
  Batch.ensure();
  const effect2 = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, fn);
  return (options = {}) => {
    return new Promise((fulfil) => {
      if (options.outro) {
        pause_effect(effect2, () => {
          destroy_effect(effect2);
          fulfil(void 0);
        });
      } else {
        destroy_effect(effect2);
        fulfil(void 0);
      }
    });
  };
}
function effect(fn) {
  return create_effect(EFFECT, fn);
}
function async_effect(fn) {
  return create_effect(ASYNC | EFFECT_PRESERVED, fn);
}
function render_effect(fn, flags2 = 0) {
  return create_effect(RENDER_EFFECT | flags2, fn);
}
function template_effect(fn, sync = [], async2 = [], blockers = []) {
  flatten(blockers, sync, async2, (values) => {
    create_effect(RENDER_EFFECT, () => {
      fn(...values.map(get2));
    });
  });
}
function block(fn, flags2 = 0) {
  var effect2 = create_effect(BLOCK_EFFECT | flags2, fn);
  if (dev_fallback_default) {
    effect2.dev_stack = dev_stack;
  }
  return effect2;
}
function branch(fn) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, fn);
}
function execute_effect_teardown(effect2) {
  var teardown2 = effect2.teardown;
  if (teardown2 !== null) {
    const previously_destroying_effect = is_destroying_effect;
    const previous_reaction = active_reaction;
    set_is_destroying_effect(true);
    set_active_reaction(null);
    try {
      teardown2.call(null);
    } finally {
      set_is_destroying_effect(previously_destroying_effect);
      set_active_reaction(previous_reaction);
    }
  }
}
function destroy_effect_children(signal, remove_dom = false) {
  var effect2 = signal.first;
  signal.first = signal.last = null;
  while (effect2 !== null) {
    const controller = effect2.ac;
    if (controller !== null) {
      without_reactive_context(() => {
        controller.abort(STALE_REACTION);
      });
    }
    var next2 = effect2.next;
    if ((effect2.f & ROOT_EFFECT) !== 0) {
      effect2.parent = null;
    } else {
      destroy_effect(effect2, remove_dom);
    }
    effect2 = next2;
  }
}
function destroy_block_effect_children(signal) {
  var effect2 = signal.first;
  while (effect2 !== null) {
    var next2 = effect2.next;
    if ((effect2.f & BRANCH_EFFECT) === 0) {
      destroy_effect(effect2);
    }
    effect2 = next2;
  }
}
function destroy_effect(effect2, remove_dom = true) {
  var removed = false;
  if ((remove_dom || (effect2.f & HEAD_EFFECT) !== 0) && effect2.nodes !== null && effect2.nodes.end !== null) {
    remove_effect_dom(
      effect2.nodes.start,
      /** @type {TemplateNode} */
      effect2.nodes.end
    );
    removed = true;
  }
  effect2.f |= DESTROYING;
  destroy_effect_children(effect2, remove_dom && !removed);
  remove_reactions(effect2, 0);
  var transitions = effect2.nodes && effect2.nodes.t;
  if (transitions !== null) {
    for (const transition2 of transitions) {
      transition2.stop();
    }
  }
  execute_effect_teardown(effect2);
  effect2.f ^= DESTROYING;
  effect2.f |= DESTROYED;
  var parent = effect2.parent;
  if (parent !== null && parent.first !== null) {
    unlink_effect(effect2);
  }
  if (dev_fallback_default) {
    effect2.component_function = null;
  }
  effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.deps = effect2.fn = effect2.nodes = effect2.ac = effect2.b = null;
}
function remove_effect_dom(node, end) {
  while (node !== null) {
    var next2 = node === end ? null : get_next_sibling(node);
    node.remove();
    node = next2;
  }
}
function unlink_effect(effect2) {
  var parent = effect2.parent;
  var prev = effect2.prev;
  var next2 = effect2.next;
  if (prev !== null) prev.next = next2;
  if (next2 !== null) next2.prev = prev;
  if (parent !== null) {
    if (parent.first === effect2) parent.first = next2;
    if (parent.last === effect2) parent.last = prev;
  }
}
function pause_effect(effect2, callback, destroy = true) {
  var transitions = [];
  pause_children(effect2, transitions, true);
  var fn = () => {
    if (destroy) destroy_effect(effect2);
    if (callback) callback();
  };
  var remaining = transitions.length;
  if (remaining > 0) {
    var check = () => --remaining || fn();
    for (var transition2 of transitions) {
      transition2.out(check);
    }
  } else {
    fn();
  }
}
function pause_children(effect2, transitions, local) {
  if ((effect2.f & INERT) !== 0) return;
  effect2.f ^= INERT;
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition2 of t) {
      if (transition2.is_global || local) {
        transitions.push(transition2);
      }
    }
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    if ((child2.f & ROOT_EFFECT) === 0) {
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (child2.f & BRANCH_EFFECT) !== 0 && (effect2.f & BLOCK_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
    }
    child2 = sibling2;
  }
}
function resume_effect(effect2) {
  resume_children(effect2, true);
}
function resume_children(effect2, local) {
  if ((effect2.f & INERT) === 0) return;
  effect2.f ^= INERT;
  if ((effect2.f & CLEAN) === 0) {
    set_signal_status(effect2, DIRTY);
    Batch.ensure().schedule(effect2);
  }
  var child2 = effect2.first;
  while (child2 !== null) {
    var sibling2 = child2.next;
    var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
    resume_children(child2, transparent ? local : false);
    child2 = sibling2;
  }
  var t = effect2.nodes && effect2.nodes.t;
  if (t !== null) {
    for (const transition2 of t) {
      if (transition2.is_global || local) {
        transition2.in();
      }
    }
  }
}
function move_effect(effect2, fragment) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  while (node !== null) {
    var next2 = node === end ? null : get_next_sibling(node);
    fragment.append(node);
    node = next2;
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/legacy.js
var captured_signals = null;

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/runtime.js
var is_updating_effect = false;
var is_destroying_effect = false;
function set_is_destroying_effect(value) {
  is_destroying_effect = value;
}
var active_reaction = null;
var untracking = false;
function set_active_reaction(reaction) {
  active_reaction = reaction;
}
var active_effect = null;
function set_active_effect(effect2) {
  active_effect = effect2;
}
var current_sources = null;
function push_reaction_value(value) {
  if (active_reaction !== null && (!async_mode_flag || (active_reaction.f & DERIVED) !== 0)) {
    (current_sources ?? (current_sources = /* @__PURE__ */ new Set())).add(value);
  }
}
var new_deps = null;
var skipped_deps = 0;
var untracked_writes = null;
function set_untracked_writes(value) {
  untracked_writes = value;
}
var write_version = 1;
var read_version = 0;
var update_version = read_version;
function set_update_version(value) {
  update_version = value;
}
function increment_write_version() {
  return ++write_version;
}
function is_dirty(reaction) {
  var flags2 = reaction.f;
  if ((flags2 & DIRTY) !== 0) {
    return true;
  }
  if (flags2 & DERIVED) {
    reaction.f &= ~WAS_MARKED;
  }
  if ((flags2 & MAYBE_DIRTY) !== 0) {
    var dependencies = (
      /** @type {Value[]} */
      reaction.deps
    );
    var length = dependencies.length;
    for (var i = 0; i < length; i++) {
      var dependency = dependencies[i];
      if (is_dirty(
        /** @type {Derived} */
        dependency
      )) {
        update_derived(
          /** @type {Derived} */
          dependency
        );
      }
      if (dependency.wv > reaction.wv) {
        return true;
      }
    }
    if ((flags2 & CONNECTED) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    batch_values === null) {
      set_signal_status(reaction, CLEAN);
    }
  }
  return false;
}
function schedule_possible_effect_self_invalidation(signal, effect2, root7 = true) {
  var reactions = signal.reactions;
  if (reactions === null) return;
  if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) {
    return;
  }
  for (var i = 0; i < reactions.length; i++) {
    var reaction = reactions[i];
    if ((reaction.f & DERIVED) !== 0) {
      schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        reaction,
        effect2,
        false
      );
    } else if (effect2 === reaction) {
      if (root7) {
        set_signal_status(reaction, DIRTY);
      } else if ((reaction.f & CLEAN) !== 0) {
        set_signal_status(reaction, MAYBE_DIRTY);
      }
      schedule_effect(
        /** @type {Effect} */
        reaction
      );
    }
  }
}
function update_reaction(reaction) {
  var _a2;
  var previous_deps = new_deps;
  var previous_skipped_deps = skipped_deps;
  var previous_untracked_writes = untracked_writes;
  var previous_reaction = active_reaction;
  var previous_sources = current_sources;
  var previous_component_context = component_context;
  var previous_untracking = untracking;
  var previous_update_version = update_version;
  var flags2 = reaction.f;
  new_deps = /** @type {null | Value[]} */
  null;
  skipped_deps = 0;
  untracked_writes = null;
  active_reaction = (flags2 & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 ? reaction : null;
  current_sources = null;
  set_component_context(reaction.ctx);
  untracking = false;
  update_version = ++read_version;
  if (reaction.ac !== null) {
    without_reactive_context(() => {
      reaction.ac.abort(STALE_REACTION);
    });
    reaction.ac = null;
  }
  try {
    reaction.f |= REACTION_IS_UPDATING;
    var fn = (
      /** @type {Function} */
      reaction.fn
    );
    var result = fn();
    reaction.f |= REACTION_RAN;
    var deps = reaction.deps;
    var is_fork = current_batch?.is_fork;
    if (new_deps !== null) {
      var i;
      if (!is_fork) {
        remove_reactions(reaction, skipped_deps);
      }
      if (deps !== null && skipped_deps > 0) {
        deps.length = skipped_deps + new_deps.length;
        for (i = 0; i < new_deps.length; i++) {
          deps[skipped_deps + i] = new_deps[i];
        }
      } else {
        reaction.deps = deps = new_deps;
      }
      if (effect_tracking() && (reaction.f & CONNECTED) !== 0) {
        for (i = skipped_deps; i < deps.length; i++) {
          ((_a2 = deps[i]).reactions ?? (_a2.reactions = [])).push(reaction);
        }
      }
    } else if (!is_fork && deps !== null && skipped_deps < deps.length) {
      remove_reactions(reaction, skipped_deps);
      deps.length = skipped_deps;
    }
    if (is_runes() && untracked_writes !== null && !untracking && deps !== null && (reaction.f & (DERIVED | MAYBE_DIRTY | DIRTY)) === 0) {
      for (i = 0; i < /** @type {Source[]} */
      untracked_writes.length; i++) {
        schedule_possible_effect_self_invalidation(
          untracked_writes[i],
          /** @type {Effect} */
          reaction
        );
      }
    }
    if (previous_reaction !== null && previous_reaction !== reaction) {
      read_version++;
      if (previous_reaction.deps !== null) {
        for (let i2 = 0; i2 < previous_skipped_deps; i2 += 1) {
          previous_reaction.deps[i2].rv = read_version;
        }
      }
      if (previous_deps !== null) {
        for (const dep of previous_deps) {
          dep.rv = read_version;
        }
      }
      if (untracked_writes !== null) {
        if (previous_untracked_writes === null) {
          previous_untracked_writes = untracked_writes;
        } else {
          previous_untracked_writes.push(.../** @type {Source[]} */
          untracked_writes);
        }
      }
    }
    if ((reaction.f & ERROR_VALUE) !== 0) {
      reaction.f ^= ERROR_VALUE;
    }
    return result;
  } catch (error) {
    return handle_error(error);
  } finally {
    reaction.f ^= REACTION_IS_UPDATING;
    new_deps = previous_deps;
    skipped_deps = previous_skipped_deps;
    untracked_writes = previous_untracked_writes;
    active_reaction = previous_reaction;
    current_sources = previous_sources;
    set_component_context(previous_component_context);
    untracking = previous_untracking;
    update_version = previous_update_version;
  }
}
function remove_reaction(signal, dependency) {
  let reactions = dependency.reactions;
  if (reactions !== null) {
    var index2 = index_of.call(reactions, signal);
    if (index2 !== -1) {
      var new_length = reactions.length - 1;
      if (new_length === 0) {
        reactions = dependency.reactions = null;
      } else {
        reactions[index2] = reactions[new_length];
        reactions.pop();
      }
    }
  }
  if (reactions === null && (dependency.f & DERIVED) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !includes.call(new_deps, dependency))) {
    var derived2 = (
      /** @type {Derived} */
      dependency
    );
    if ((derived2.f & CONNECTED) !== 0) {
      derived2.f ^= CONNECTED;
      derived2.f &= ~WAS_MARKED;
    }
    if (derived2.v !== UNINITIALIZED) {
      update_derived_status(derived2);
    }
    freeze_derived_effects(derived2);
    remove_reactions(derived2, 0);
  }
}
function remove_reactions(signal, start_index) {
  var dependencies = signal.deps;
  if (dependencies === null) return;
  for (var i = start_index; i < dependencies.length; i++) {
    remove_reaction(signal, dependencies[i]);
  }
}
function update_effect(effect2) {
  var flags2 = effect2.f;
  if ((flags2 & DESTROYED) !== 0) {
    return;
  }
  set_signal_status(effect2, CLEAN);
  var previous_effect = active_effect;
  var was_updating_effect = is_updating_effect;
  active_effect = effect2;
  is_updating_effect = true;
  if (dev_fallback_default) {
    var previous_component_fn = dev_current_component_function;
    set_dev_current_component_function(effect2.component_function);
    var previous_stack = (
      /** @type {any} */
      dev_stack
    );
    set_dev_stack(effect2.dev_stack ?? dev_stack);
  }
  try {
    if ((flags2 & (BLOCK_EFFECT | MANAGED_EFFECT)) !== 0) {
      destroy_block_effect_children(effect2);
    } else {
      destroy_effect_children(effect2);
    }
    execute_effect_teardown(effect2);
    var teardown2 = update_reaction(effect2);
    effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    effect2.wv = write_version;
    if (dev_fallback_default && tracing_mode_flag && (effect2.f & DIRTY) !== 0 && effect2.deps !== null) {
      for (var dep of effect2.deps) {
        if (dep.set_during_effect) {
          dep.wv = increment_write_version();
          dep.set_during_effect = false;
        }
      }
    }
  } finally {
    is_updating_effect = was_updating_effect;
    active_effect = previous_effect;
    if (dev_fallback_default) {
      set_dev_current_component_function(previous_component_fn);
      set_dev_stack(previous_stack);
    }
  }
}
async function tick() {
  if (async_mode_flag) {
    return new Promise((f) => {
      requestAnimationFrame(() => f());
      setTimeout(() => f());
    });
  }
  await Promise.resolve();
  flushSync();
}
function get2(signal) {
  var flags2 = signal.f;
  var is_derived = (flags2 & DERIVED) !== 0;
  captured_signals?.add(signal);
  if (active_reaction !== null && !untracking) {
    var destroyed = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!destroyed && (current_sources === null || !current_sources.has(signal))) {
      var deps = active_reaction.deps;
      if ((active_reaction.f & REACTION_IS_UPDATING) !== 0) {
        if (signal.rv < read_version) {
          signal.rv = read_version;
          if (new_deps === null && deps !== null && deps[skipped_deps] === signal) {
            skipped_deps++;
          } else if (new_deps === null) {
            new_deps = [signal];
          } else {
            new_deps.push(signal);
          }
        }
      } else {
        active_reaction.deps ?? (active_reaction.deps = []);
        if (!includes.call(active_reaction.deps, signal)) {
          active_reaction.deps.push(signal);
        }
        var reactions = signal.reactions;
        if (reactions === null) {
          signal.reactions = [active_reaction];
        } else if (!includes.call(reactions, active_reaction)) {
          reactions.push(active_reaction);
        }
      }
    }
  }
  if (dev_fallback_default) {
    if (!untracking && reactivity_loss_tracker && // By checking that current/previous batch are null we filter out false positives.
    // reactivity_loss_tracker is only reset after a microtask, so if a flush happens
    // before that, we get warnings for things we shouldn't warn on.
    current_batch === null && previous_batch === null && !reactivity_loss_tracker.warned && (reactivity_loss_tracker.effect.f & REACTION_IS_UPDATING) === 0 && !reactivity_loss_tracker.effect_deps.has(signal)) {
      reactivity_loss_tracker.warned = true;
      await_reactivity_loss(
        /** @type {string} */
        signal.label
      );
      var trace2 = get_error("traced at");
      if (trace2) console.warn(trace2);
    }
    recent_async_deriveds.delete(signal);
    if (tracing_mode_flag && !untracking && tracing_expressions !== null && active_reaction !== null && tracing_expressions.reaction === active_reaction) {
      if (signal.trace) {
        signal.trace();
      } else {
        trace2 = get_error("traced at");
        if (trace2) {
          var entry = tracing_expressions.entries.get(signal);
          if (entry === void 0) {
            entry = { traces: [] };
            tracing_expressions.entries.set(signal, entry);
          }
          var last = entry.traces[entry.traces.length - 1];
          if (trace2.stack !== last?.stack) {
            entry.traces.push(trace2);
          }
        }
      }
    }
  }
  if (is_destroying_effect && old_values.has(signal)) {
    return old_values.get(signal);
  }
  if (is_derived) {
    var derived2 = (
      /** @type {Derived} */
      signal
    );
    if (is_destroying_effect) {
      var value = derived2.v;
      if ((derived2.f & CLEAN) === 0 && derived2.reactions !== null || depends_on_old_values(derived2)) {
        value = execute_derived(derived2);
      }
      old_values.set(derived2, value);
      return value;
    }
    var should_connect = (derived2.f & CONNECTED) === 0 && !untracking && active_reaction !== null && (is_updating_effect || (active_reaction.f & CONNECTED) !== 0);
    var is_new = (derived2.f & REACTION_RAN) === 0;
    if (is_dirty(derived2)) {
      if (should_connect) {
        derived2.f |= CONNECTED;
      }
      update_derived(derived2);
    }
    if (should_connect && !is_new) {
      unfreeze_derived_effects(derived2);
      reconnect(derived2);
    }
  }
  if (batch_values?.has(signal)) {
    return batch_values.get(signal);
  }
  if ((signal.f & ERROR_VALUE) !== 0) {
    throw signal.v;
  }
  return signal.v;
}
function reconnect(derived2) {
  derived2.f |= CONNECTED;
  if (derived2.deps === null) return;
  for (const dep of derived2.deps) {
    (dep.reactions ?? (dep.reactions = [])).push(derived2);
    if ((dep.f & DERIVED) !== 0 && (dep.f & CONNECTED) === 0) {
      unfreeze_derived_effects(
        /** @type {Derived} */
        dep
      );
      reconnect(
        /** @type {Derived} */
        dep
      );
    }
  }
}
function depends_on_old_values(derived2) {
  if (derived2.v === UNINITIALIZED) return true;
  if (derived2.deps === null) return false;
  for (const dep of derived2.deps) {
    if (old_values.has(dep)) {
      return true;
    }
    if ((dep.f & DERIVED) !== 0 && depends_on_old_values(
      /** @type {Derived} */
      dep
    )) {
      return true;
    }
  }
  return false;
}
function untrack(fn) {
  var previous_untracking = untracking;
  try {
    untracking = true;
    return fn();
  } finally {
    untracking = previous_untracking;
  }
}
function deep_read_state(value) {
  if (typeof value !== "object" || !value || value instanceof EventTarget) {
    return;
  }
  if (STATE_SYMBOL in value) {
    deep_read(value);
  } else if (!Array.isArray(value)) {
    for (let key2 in value) {
      const prop2 = value[key2];
      if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
        deep_read(prop2);
      }
    }
  }
}
function deep_read(value, visited = /* @__PURE__ */ new Set()) {
  if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
  !(value instanceof EventTarget) && !visited.has(value)) {
    visited.add(value);
    if (value instanceof Date) {
      value.getTime();
    }
    for (let key2 in value) {
      try {
        deep_read(value[key2], visited);
      } catch (e) {
      }
    }
    const proto = get_prototype_of(value);
    if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
      const descriptors = get_descriptors(proto);
      for (let key2 in descriptors) {
        const get3 = descriptors[key2].get;
        if (get3) {
          try {
            get3.call(value);
          } catch (e) {
          }
        }
      }
    }
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/events.js
var event_symbol = /* @__PURE__ */ Symbol("events");
var all_registered_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function create_event(event_name, dom, handler, options = {}) {
  function target_handler(event2) {
    if (!options.capture) {
      handle_event_propagation.call(dom, event2);
    }
    if (!event2.cancelBubble) {
      return without_reactive_context(() => {
        return handler?.call(this, event2);
      });
    }
  }
  if (event_name.startsWith("pointer") || event_name.startsWith("touch") || event_name === "wheel") {
    queue_micro_task(() => {
      dom.addEventListener(event_name, target_handler, options);
    });
  } else {
    dom.addEventListener(event_name, target_handler, options);
  }
  return target_handler;
}
function event(event_name, dom, handler, capture2, passive2) {
  var options = { capture: capture2, passive: passive2 };
  var target_handler = create_event(event_name, dom, handler, options);
  if (dom === document.body || // @ts-ignore
  dom === window || // @ts-ignore
  dom === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  dom instanceof HTMLMediaElement) {
    teardown(() => {
      dom.removeEventListener(event_name, target_handler, options);
    });
  }
}
function delegated(event_name, element2, handler) {
  (element2[event_symbol] ?? (element2[event_symbol] = {}))[event_name] = handler;
}
function delegate(events) {
  for (var i = 0; i < events.length; i++) {
    all_registered_events.add(events[i]);
  }
  for (var fn of root_event_handles) {
    fn(events);
  }
}
var last_propagated_event = null;
function handle_event_propagation(event2) {
  var handler_element = this;
  var owner_document = (
    /** @type {Node} */
    handler_element.ownerDocument
  );
  var event_name = event2.type;
  var path = event2.composedPath?.() || [];
  var current_target = (
    /** @type {null | Element} */
    path[0] || event2.target
  );
  last_propagated_event = event2;
  var path_idx = 0;
  var handled_at = last_propagated_event === event2 && event2[event_symbol];
  if (handled_at) {
    var at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event2[event_symbol] = handler_element;
      return;
    }
    var handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event2.target;
  if (current_target === handler_element) return;
  define_property(event2, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  var previous_reaction = active_reaction;
  var previous_effect = active_effect;
  set_active_reaction(null);
  set_active_effect(null);
  try {
    var throw_error;
    var other_errors = [];
    while (current_target !== null) {
      if (current_target === handler_element) break;
      try {
        var delegated2 = current_target[event_symbol]?.[event_name];
        if (delegated2 != null && (!/** @type {any} */
        current_target.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
        // -> the target could not have been disabled because it emits the event in the first place
        event2.target === current_target)) {
          delegated2.call(current_target, event2);
        }
      } catch (error) {
        if (throw_error) {
          other_errors.push(error);
        } else {
          throw_error = error;
        }
      }
      if (event2.cancelBubble) break;
      path_idx++;
      current_target = path_idx < path.length ? (
        /** @type {Element} */
        path[path_idx]
      ) : null;
    }
    if (throw_error) {
      for (let error of other_errors) {
        queueMicrotask(() => {
          throw error;
        });
      }
      throw throw_error;
    }
  } finally {
    event2[event_symbol] = handler_element;
    delete event2.currentTarget;
    set_active_reaction(previous_reaction);
    set_active_effect(previous_effect);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/reconciler.js
var policy = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (html2) => {
      return html2;
    }
  })
);
function create_trusted_html(html2) {
  return (
    /** @type {string} */
    policy?.createHTML(html2) ?? html2
  );
}
function create_fragment_from_html(html2) {
  var elem = create_element("template");
  elem.innerHTML = create_trusted_html(html2.replaceAll("<!>", "<!---->"));
  return elem.content;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/template.js
function assign_nodes(start, end) {
  var effect2 = (
    /** @type {Effect} */
    active_effect
  );
  if (effect2.nodes === null) {
    effect2.nodes = { start, end, a: null, t: null };
  }
}
// @__NO_SIDE_EFFECTS__
function from_html(content, flags2) {
  var is_fragment = (flags2 & TEMPLATE_FRAGMENT) !== 0;
  var use_import_node = (flags2 & TEMPLATE_USE_IMPORT_NODE) !== 0;
  var node;
  var has_start = !content.startsWith("<!>");
  return () => {
    if (hydrating) {
      assign_nodes(hydrate_node, null);
      return hydrate_node;
    }
    if (node === void 0) {
      node = create_fragment_from_html(has_start ? content : "<!>" + content);
      if (!is_fragment) node = /** @type {TemplateNode} */
      get_first_child(node);
    }
    var clone2 = (
      /** @type {TemplateNode} */
      use_import_node || is_firefox ? document.importNode(node, true) : node.cloneNode(true)
    );
    if (is_fragment) {
      var start = (
        /** @type {TemplateNode} */
        get_first_child(clone2)
      );
      var end = (
        /** @type {TemplateNode} */
        clone2.lastChild
      );
      assign_nodes(start, end);
    } else {
      assign_nodes(clone2, clone2);
    }
    return clone2;
  };
}
function append(anchor, dom) {
  if (hydrating) {
    var effect2 = (
      /** @type {Effect & { nodes: EffectNodes }} */
      active_effect
    );
    if ((effect2.f & REACTION_RAN) === 0 || effect2.nodes.end === null) {
      effect2.nodes.end = hydrate_node;
    }
    hydrate_next();
    return;
  }
  if (anchor === null) {
    return;
  }
  anchor.before(
    /** @type {Node} */
    dom
  );
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/utils.js
var DOM_BOOLEAN_ATTRIBUTES = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "indeterminate",
  "inert",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory",
  "defer",
  "disablepictureinpicture",
  "disableremoteplayback"
];
var DOM_PROPERTIES = [
  ...DOM_BOOLEAN_ATTRIBUTES,
  "formNoValidate",
  "isMap",
  "noModule",
  "playsInline",
  "readOnly",
  "value",
  "volume",
  "defaultValue",
  "defaultChecked",
  "srcObject",
  "noValidate",
  "allowFullscreen",
  "disablePictureInPicture",
  "disableRemotePlayback"
];
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(name) {
  return PASSIVE_EVENTS.includes(name);
}
var STATE_CREATION_RUNES = (
  /** @type {const} */
  [
    "$state",
    "$state.raw",
    "$derived",
    "$derived.by"
  ]
);
var RUNES = (
  /** @type {const} */
  [
    ...STATE_CREATION_RUNES,
    "$state.eager",
    "$state.snapshot",
    "$props",
    "$props.id",
    "$bindable",
    "$effect",
    "$effect.pre",
    "$effect.tracking",
    "$effect.root",
    "$effect.pending",
    "$inspect",
    "$inspect().with",
    "$inspect.trace",
    "$host"
  ]
);

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/render.js
var should_intro = true;
function set_text(text2, value) {
  var _a2;
  var str = value == null ? "" : typeof value === "object" ? `${value}` : value;
  if (str !== /** @type {any} */
  (text2[_a2 = TEXT_CACHE] ?? (text2[_a2] = text2.nodeValue))) {
    text2[TEXT_CACHE] = str;
    text2.nodeValue = `${str}`;
  }
}
function mount(component2, options) {
  return _mount(component2, options);
}
function hydrate(component2, options) {
  init_operations();
  options.intro = options.intro ?? false;
  const target = options.target;
  const was_hydrating = hydrating;
  const previous_hydrate_node = hydrate_node;
  try {
    var anchor = get_first_child(target);
    while (anchor && (anchor.nodeType !== COMMENT_NODE || /** @type {Comment} */
    anchor.data !== HYDRATION_START)) {
      anchor = get_next_sibling(anchor);
    }
    if (!anchor) {
      throw HYDRATION_ERROR;
    }
    set_hydrating(true);
    set_hydrate_node(
      /** @type {Comment} */
      anchor
    );
    const instance = _mount(component2, { ...options, anchor });
    set_hydrating(false);
    return (
      /**  @type {Exports} */
      instance
    );
  } catch (error) {
    if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) {
      throw error;
    }
    if (error !== HYDRATION_ERROR) {
      console.warn("Failed to hydrate: ", error);
    }
    if (options.recover === false) {
      hydration_failed();
    }
    init_operations();
    clear_text_content(target);
    set_hydrating(false);
    return mount(component2, options);
  } finally {
    set_hydrating(was_hydrating);
    set_hydrate_node(previous_hydrate_node);
  }
}
var listeners = /* @__PURE__ */ new Map();
function _mount(Component, { target, anchor, props = {}, events, context, intro = true, transformError }) {
  init_operations();
  var component2 = void 0;
  var unmount2 = component_root(() => {
    var anchor_node = anchor ?? target.appendChild(create_text());
    boundary(
      /** @type {TemplateNode} */
      anchor_node,
      {
        pending: () => {
        }
      },
      (anchor_node2) => {
        push({});
        var ctx = (
          /** @type {ComponentContext} */
          component_context
        );
        if (context) ctx.c = context;
        if (events) {
          props.$$events = events;
        }
        if (hydrating) {
          assign_nodes(
            /** @type {TemplateNode} */
            anchor_node2,
            null
          );
        }
        should_intro = intro;
        component2 = Component(anchor_node2, props) || {};
        should_intro = true;
        if (hydrating) {
          active_effect.nodes.end = hydrate_node;
          if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
          hydrate_node.data !== HYDRATION_END) {
            hydration_mismatch();
            throw HYDRATION_ERROR;
          }
        }
        pop();
      },
      transformError
    );
    var registered_events = /* @__PURE__ */ new Set();
    var event_handle = (events2) => {
      for (var i = 0; i < events2.length; i++) {
        var event_name = events2[i];
        if (registered_events.has(event_name)) continue;
        registered_events.add(event_name);
        var passive2 = is_passive_event(event_name);
        for (const node of [target, document]) {
          var counts = listeners.get(node);
          if (counts === void 0) {
            counts = /* @__PURE__ */ new Map();
            listeners.set(node, counts);
          }
          var count = counts.get(event_name);
          if (count === void 0) {
            node.addEventListener(event_name, handle_event_propagation, { passive: passive2 });
            counts.set(event_name, 1);
          } else {
            counts.set(event_name, count + 1);
          }
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    return () => {
      for (var event_name of registered_events) {
        for (const node of [target, document]) {
          var counts = (
            /** @type {Map<string, number>} */
            listeners.get(node)
          );
          var count = (
            /** @type {number} */
            counts.get(event_name)
          );
          if (--count == 0) {
            node.removeEventListener(event_name, handle_event_propagation);
            counts.delete(event_name);
            if (counts.size === 0) {
              listeners.delete(node);
            }
          } else {
            counts.set(event_name, count);
          }
        }
      }
      root_event_handles.delete(event_handle);
      if (anchor_node !== anchor) {
        anchor_node.parentNode?.removeChild(anchor_node);
      }
    };
  });
  mounted_components.set(component2, unmount2);
  return component2;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component2, options) {
  const fn = mounted_components.get(component2);
  if (fn) {
    mounted_components.delete(component2);
    return fn(options);
  }
  if (dev_fallback_default) {
    if (STATE_SYMBOL in component2) {
      state_proxy_unmount();
    } else {
      lifecycle_double_unmount();
    }
  }
  return Promise.resolve();
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/blocks/branches.js
var _batches, _onscreen, _offscreen, _outroing, _transition, _commit, _discard;
var BranchManager = class {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(anchor, transition2 = true) {
    /** @type {TemplateNode} */
    __publicField(this, "anchor");
    /** @type {Map<Batch, Key>} */
    __privateAdd(this, _batches, /* @__PURE__ */ new Map());
    /**
     * Map of keys to effects that are currently rendered in the DOM.
     * These effects are visible and actively part of the document tree.
     * Example:
     * ```
     * {#if condition}
     * 	foo
     * {:else}
     * 	bar
     * {/if}
     * ```
     * Can result in the entries `true->Effect` and `false->Effect`
     * @type {Map<Key, Effect>}
     */
    __privateAdd(this, _onscreen, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    __privateAdd(this, _offscreen, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    __privateAdd(this, _outroing, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    __privateAdd(this, _transition, true);
    /**
     * @param {Batch} batch
     */
    __privateAdd(this, _commit, (batch) => {
      if (!__privateGet(this, _batches).has(batch)) return;
      var key2 = (
        /** @type {Key} */
        __privateGet(this, _batches).get(batch)
      );
      var onscreen = __privateGet(this, _onscreen).get(key2);
      if (onscreen) {
        resume_effect(onscreen);
        __privateGet(this, _outroing).delete(key2);
      } else {
        var offscreen = __privateGet(this, _offscreen).get(key2);
        if (offscreen) {
          resume_effect(offscreen.effect);
          __privateGet(this, _onscreen).set(key2, offscreen.effect);
          __privateGet(this, _offscreen).delete(key2);
          if (dev_fallback_default) {
            offscreen.fragment.lastChild[HMR_ANCHOR] = this.anchor;
          }
          offscreen.fragment.lastChild.remove();
          this.anchor.before(offscreen.fragment);
          onscreen = offscreen.effect;
        }
      }
      for (const [b, k] of __privateGet(this, _batches)) {
        __privateGet(this, _batches).delete(b);
        if (b === batch) {
          break;
        }
        const offscreen2 = __privateGet(this, _offscreen).get(k);
        if (offscreen2) {
          destroy_effect(offscreen2.effect);
          __privateGet(this, _offscreen).delete(k);
        }
      }
      for (const [k, effect2] of __privateGet(this, _onscreen)) {
        if (k === key2 || __privateGet(this, _outroing).has(k)) continue;
        const on_destroy = () => {
          const keys = Array.from(__privateGet(this, _batches).values());
          if (keys.includes(k)) {
            var fragment = document.createDocumentFragment();
            move_effect(effect2, fragment);
            fragment.append(create_text());
            __privateGet(this, _offscreen).set(k, { effect: effect2, fragment });
          } else {
            destroy_effect(effect2);
          }
          __privateGet(this, _outroing).delete(k);
          __privateGet(this, _onscreen).delete(k);
        };
        if (__privateGet(this, _transition) || !onscreen) {
          __privateGet(this, _outroing).add(k);
          pause_effect(effect2, on_destroy, false);
        } else {
          on_destroy();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    __privateAdd(this, _discard, (batch) => {
      __privateGet(this, _batches).delete(batch);
      const keys = Array.from(__privateGet(this, _batches).values());
      for (const [k, branch2] of __privateGet(this, _offscreen)) {
        if (!keys.includes(k)) {
          destroy_effect(branch2.effect);
          __privateGet(this, _offscreen).delete(k);
        }
      }
    });
    this.anchor = anchor;
    __privateSet(this, _transition, transition2);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(key2, fn) {
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    if (fn && !__privateGet(this, _onscreen).has(key2) && !__privateGet(this, _offscreen).has(key2)) {
      if (defer) {
        var fragment = document.createDocumentFragment();
        var target = create_text();
        fragment.append(target);
        __privateGet(this, _offscreen).set(key2, {
          effect: branch(() => fn(target)),
          fragment
        });
      } else {
        __privateGet(this, _onscreen).set(
          key2,
          branch(() => fn(this.anchor))
        );
      }
    }
    __privateGet(this, _batches).set(batch, key2);
    if (defer) {
      for (const [k, effect2] of __privateGet(this, _onscreen)) {
        if (k === key2) {
          batch.unskip_effect(effect2);
        } else {
          batch.skip_effect(effect2);
        }
      }
      for (const [k, branch2] of __privateGet(this, _offscreen)) {
        if (k === key2) {
          batch.unskip_effect(branch2.effect);
        } else {
          batch.skip_effect(branch2.effect);
        }
      }
      batch.oncommit(__privateGet(this, _commit));
      batch.ondiscard(__privateGet(this, _discard));
    } else {
      if (hydrating) {
        this.anchor = hydrate_node;
      }
      __privateGet(this, _commit).call(this, batch);
    }
  }
};
_batches = new WeakMap();
_onscreen = new WeakMap();
_offscreen = new WeakMap();
_outroing = new WeakMap();
_transition = new WeakMap();
_commit = new WeakMap();
_discard = new WeakMap();

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/index-client.js
if (dev_fallback_default) {
  let throw_rune_error = function(rune) {
    if (!(rune in globalThis)) {
      let value;
      Object.defineProperty(globalThis, rune, {
        configurable: true,
        // eslint-disable-next-line getter-return
        get: () => {
          if (value !== void 0) {
            return value;
          }
          rune_outside_svelte(rune);
        },
        set: (v) => {
          value = v;
        }
      });
    }
  };
  throw_rune_error("$state");
  throw_rune_error("$effect");
  throw_rune_error("$derived");
  throw_rune_error("$inspect");
  throw_rune_error("$props");
  throw_rune_error("$bindable");
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dev/css.js
var all_styles = /* @__PURE__ */ new Map();
function register_style(hash2, style) {
  var styles = all_styles.get(hash2);
  if (!styles) {
    styles = /* @__PURE__ */ new Set();
    all_styles.set(hash2, styles);
  }
  styles.add(style);
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/blocks/if.js
function if_block(node, fn, elseif = false) {
  var marker;
  if (hydrating) {
    marker = hydrate_node;
    hydrate_next();
  }
  var branches = new BranchManager(node);
  var flags2 = elseif ? EFFECT_TRANSPARENT : 0;
  function update_branch(key2, fn2) {
    if (hydrating) {
      var data = read_hydration_instruction(
        /** @type {TemplateNode} */
        marker
      );
      if (key2 !== parseInt(data.substring(1))) {
        var anchor = skip_nodes();
        set_hydrate_node(anchor);
        branches.anchor = anchor;
        set_hydrating(false);
        branches.ensure(key2, fn2);
        set_hydrating(true);
        return;
      }
    }
    branches.ensure(key2, fn2);
  }
  block(() => {
    var has_branch = false;
    fn((fn2, key2 = 0) => {
      has_branch = true;
      update_branch(key2, fn2);
    });
    if (!has_branch) {
      update_branch(-1, null);
    }
  }, flags2);
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/blocks/each.js
function pause_effects(state2, to_destroy, controlled_anchor) {
  var transitions = [];
  var length = to_destroy.length;
  var group;
  var remaining = to_destroy.length;
  for (var i = 0; i < length; i++) {
    let effect2 = to_destroy[i];
    pause_effect(
      effect2,
      () => {
        if (group) {
          group.pending.delete(effect2);
          group.done.add(effect2);
          if (group.pending.size === 0) {
            var groups = (
              /** @type {Set<EachOutroGroup>} */
              state2.outrogroups
            );
            destroy_effects(state2, array_from(group.done));
            groups.delete(group);
            if (groups.size === 0) {
              state2.outrogroups = null;
            }
          }
        } else {
          remaining -= 1;
        }
      },
      false
    );
  }
  if (remaining === 0) {
    var fast_path = transitions.length === 0 && controlled_anchor !== null;
    if (fast_path) {
      var anchor = (
        /** @type {Element} */
        controlled_anchor
      );
      var parent_node = (
        /** @type {Element} */
        anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(anchor);
      state2.items.clear();
    }
    destroy_effects(state2, to_destroy, !fast_path);
  } else {
    group = {
      pending: new Set(to_destroy),
      done: /* @__PURE__ */ new Set()
    };
    (state2.outrogroups ?? (state2.outrogroups = /* @__PURE__ */ new Set())).add(group);
  }
}
function destroy_effects(state2, to_destroy, remove_dom = true) {
  var preserved_effects;
  if (state2.pending.size > 0) {
    preserved_effects = /* @__PURE__ */ new Set();
    for (const keys of state2.pending.values()) {
      for (const key2 of keys) {
        preserved_effects.add(
          /** @type {EachItem} */
          state2.items.get(key2).e
        );
      }
    }
  }
  for (var i = 0; i < to_destroy.length; i++) {
    var e = to_destroy[i];
    if (preserved_effects?.has(e)) {
      e.f |= EFFECT_OFFSCREEN;
      const fragment = document.createDocumentFragment();
      move_effect(e, fragment);
    } else {
      destroy_effect(to_destroy[i], remove_dom);
    }
  }
}
var offscreen_anchor;
function each(node, flags2, get_collection, get_key, render_fn2, fallback_fn = null) {
  var anchor = node;
  var items = /* @__PURE__ */ new Map();
  var is_controlled = (flags2 & EACH_IS_CONTROLLED) !== 0;
  if (is_controlled) {
    var parent_node = (
      /** @type {Element} */
      node
    );
    anchor = hydrating ? set_hydrate_node(get_first_child(parent_node)) : parent_node.appendChild(create_text());
  }
  if (hydrating) {
    hydrate_next();
  }
  var fallback2 = null;
  var each_array = derived_safe_equal(() => {
    var collection = get_collection();
    return (
      /** @type {V[]} */
      is_array(collection) ? collection : collection == null ? [] : array_from(collection)
    );
  });
  if (dev_fallback_default) {
    tag(each_array, "{#each ...}");
  }
  var array;
  var pending3 = /* @__PURE__ */ new Map();
  var first_run = true;
  function commit(batch) {
    if ((state2.effect.f & DESTROYED) !== 0) {
      return;
    }
    state2.pending.delete(batch);
    state2.fallback = fallback2;
    reconcile(state2, array, anchor, flags2, get_key);
    if (fallback2 !== null) {
      if (array.length === 0) {
        if ((fallback2.f & EFFECT_OFFSCREEN) === 0) {
          resume_effect(fallback2);
        } else {
          fallback2.f ^= EFFECT_OFFSCREEN;
          move(fallback2, null, anchor);
        }
      } else {
        pause_effect(fallback2, () => {
          fallback2 = null;
        });
      }
    }
  }
  function discard(batch) {
    state2.pending.delete(batch);
  }
  var effect2 = block(() => {
    array = /** @type {V[]} */
    get2(each_array);
    var length = array.length;
    let mismatch = false;
    if (hydrating) {
      var is_else = read_hydration_instruction(anchor) === HYDRATION_START_ELSE;
      if (is_else !== (length === 0)) {
        anchor = skip_nodes();
        set_hydrate_node(anchor);
        set_hydrating(false);
        mismatch = true;
      }
    }
    var keys = /* @__PURE__ */ new Set();
    var batch = (
      /** @type {Batch} */
      current_batch
    );
    var defer = should_defer_append();
    for (var index2 = 0; index2 < length; index2 += 1) {
      if (hydrating && hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
      hydrate_node.data === HYDRATION_END) {
        anchor = /** @type {Comment} */
        hydrate_node;
        mismatch = true;
        set_hydrating(false);
      }
      var value = array[index2];
      var key2 = get_key(value, index2);
      if (dev_fallback_default) {
        var key_again = get_key(value, index2);
        if (key2 !== key_again) {
          each_key_volatile(String(index2), String(key2), String(key_again));
        }
      }
      var item = first_run ? null : items.get(key2);
      if (item) {
        if (item.v) internal_set(item.v, value);
        if (item.i) internal_set(item.i, index2);
        if (defer) {
          batch.unskip_effect(item.e);
        }
      } else {
        item = create_item(
          items,
          first_run ? anchor : offscreen_anchor ?? (offscreen_anchor = create_text()),
          value,
          key2,
          index2,
          render_fn2,
          flags2,
          get_collection
        );
        if (!first_run) {
          item.e.f |= EFFECT_OFFSCREEN;
        }
        items.set(key2, item);
      }
      keys.add(key2);
    }
    if (length === 0 && fallback_fn && !fallback2) {
      if (first_run) {
        fallback2 = branch(() => fallback_fn(anchor));
      } else {
        fallback2 = branch(() => fallback_fn(offscreen_anchor ?? (offscreen_anchor = create_text())));
        fallback2.f |= EFFECT_OFFSCREEN;
      }
    }
    if (length > keys.size) {
      if (dev_fallback_default) {
        validate_each_keys(array, get_key);
      } else {
        each_key_duplicate("", "", "");
      }
    }
    if (hydrating && length > 0) {
      set_hydrate_node(skip_nodes());
    }
    if (!first_run) {
      pending3.set(batch, keys);
      if (defer) {
        for (const [key3, item2] of items) {
          if (!keys.has(key3)) {
            batch.skip_effect(item2.e);
          }
        }
        batch.oncommit(commit);
        batch.ondiscard(discard);
      } else {
        commit(batch);
      }
    }
    if (mismatch) {
      set_hydrating(true);
    }
    get2(each_array);
  });
  var state2 = { effect: effect2, flags: flags2, items, pending: pending3, outrogroups: null, fallback: fallback2 };
  first_run = false;
  if (hydrating) {
    anchor = hydrate_node;
  }
}
function skip_to_branch(effect2) {
  while (effect2 !== null && (effect2.f & BRANCH_EFFECT) === 0) {
    effect2 = effect2.next;
  }
  return effect2;
}
function reconcile(state2, array, anchor, flags2, get_key) {
  var is_animated = (flags2 & EACH_IS_ANIMATED) !== 0;
  var length = array.length;
  var items = state2.items;
  var current = skip_to_branch(state2.effect.first);
  var seen;
  var prev = null;
  var to_animate;
  var matched = [];
  var stashed = [];
  var value;
  var key2;
  var effect2;
  var i;
  if (is_animated) {
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key2 = get_key(value, i);
      effect2 = /** @type {EachItem} */
      items.get(key2).e;
      if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
        effect2.nodes?.a?.measure();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).add(effect2);
      }
    }
  }
  for (i = 0; i < length; i += 1) {
    value = array[i];
    key2 = get_key(value, i);
    effect2 = /** @type {EachItem} */
    items.get(key2).e;
    if (state2.outrogroups !== null) {
      for (const group of state2.outrogroups) {
        group.pending.delete(effect2);
        group.done.delete(effect2);
      }
    }
    if ((effect2.f & INERT) !== 0) {
      resume_effect(effect2);
      if (is_animated) {
        effect2.nodes?.a?.unfix();
        (to_animate ?? (to_animate = /* @__PURE__ */ new Set())).delete(effect2);
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) !== 0) {
      effect2.f ^= EFFECT_OFFSCREEN;
      if (effect2 === current) {
        move(effect2, null, anchor);
      } else {
        var next2 = prev ? prev.next : current;
        if (effect2 === state2.effect.last) {
          state2.effect.last = effect2.prev;
        }
        if (effect2.prev) effect2.prev.next = effect2.next;
        if (effect2.next) effect2.next.prev = effect2.prev;
        link(state2, prev, effect2);
        link(state2, effect2, next2);
        move(effect2, next2, anchor);
        prev = effect2;
        matched = [];
        stashed = [];
        current = skip_to_branch(prev.next);
        continue;
      }
    }
    if (effect2 !== current) {
      if (seen !== void 0 && seen.has(effect2)) {
        if (matched.length < stashed.length) {
          var start = stashed[0];
          var j;
          prev = start.prev;
          var a = matched[0];
          var b = matched[matched.length - 1];
          for (j = 0; j < matched.length; j += 1) {
            move(matched[j], start, anchor);
          }
          for (j = 0; j < stashed.length; j += 1) {
            seen.delete(stashed[j]);
          }
          link(state2, a.prev, b.next);
          link(state2, prev, a);
          link(state2, b, start);
          current = start;
          prev = b;
          i -= 1;
          matched = [];
          stashed = [];
        } else {
          seen.delete(effect2);
          move(effect2, current, anchor);
          link(state2, effect2.prev, effect2.next);
          link(state2, effect2, prev === null ? state2.effect.first : prev.next);
          link(state2, prev, effect2);
          prev = effect2;
        }
        continue;
      }
      matched = [];
      stashed = [];
      while (current !== null && current !== effect2) {
        (seen ?? (seen = /* @__PURE__ */ new Set())).add(current);
        stashed.push(current);
        current = skip_to_branch(current.next);
      }
      if (current === null) {
        continue;
      }
    }
    if ((effect2.f & EFFECT_OFFSCREEN) === 0) {
      matched.push(effect2);
    }
    prev = effect2;
    current = skip_to_branch(effect2.next);
  }
  if (state2.outrogroups !== null) {
    for (const group of state2.outrogroups) {
      if (group.pending.size === 0) {
        destroy_effects(state2, array_from(group.done));
        state2.outrogroups?.delete(group);
      }
    }
    if (state2.outrogroups.size === 0) {
      state2.outrogroups = null;
    }
  }
  if (current !== null || seen !== void 0) {
    var to_destroy = [];
    if (seen !== void 0) {
      for (effect2 of seen) {
        if ((effect2.f & INERT) === 0) {
          to_destroy.push(effect2);
        }
      }
    }
    while (current !== null) {
      if ((current.f & INERT) === 0 && current !== state2.fallback) {
        to_destroy.push(current);
      }
      current = skip_to_branch(current.next);
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags2 & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          to_destroy[i].nodes?.a?.fix();
        }
      }
      pause_effects(state2, to_destroy, controlled_anchor);
    }
  }
  if (is_animated) {
    queue_micro_task(() => {
      if (to_animate === void 0) return;
      for (effect2 of to_animate) {
        effect2.nodes?.a?.apply();
      }
    });
  }
}
function create_item(items, anchor, value, key2, index2, render_fn2, flags2, get_collection) {
  var v = (flags2 & EACH_ITEM_REACTIVE) !== 0 ? (flags2 & EACH_ITEM_IMMUTABLE) === 0 ? mutable_source(value, false, false) : source(value) : null;
  var i = (flags2 & EACH_INDEX_REACTIVE) !== 0 ? source(index2) : null;
  if (dev_fallback_default && v) {
    v.trace = () => {
      get_collection()[i?.v ?? index2];
    };
  }
  return {
    v,
    i,
    e: branch(() => {
      render_fn2(anchor, v ?? value, i ?? index2, get_collection);
      return () => {
        items.delete(key2);
      };
    })
  };
}
function move(effect2, next2, anchor) {
  if (!effect2.nodes) return;
  var node = effect2.nodes.start;
  var end = effect2.nodes.end;
  var dest = next2 && (next2.f & EFFECT_OFFSCREEN) === 0 ? (
    /** @type {EffectNodes} */
    next2.nodes.start
  ) : anchor;
  while (node !== null) {
    var next_node = (
      /** @type {TemplateNode} */
      get_next_sibling(node)
    );
    dest.before(node);
    if (node === end) {
      return;
    }
    node = next_node;
  }
}
function link(state2, prev, next2) {
  if (prev === null) {
    state2.effect.first = next2;
  } else {
    prev.next = next2;
  }
  if (next2 === null) {
    state2.effect.last = prev;
  } else {
    next2.prev = prev;
  }
}
function validate_each_keys(array, key_fn) {
  const keys = /* @__PURE__ */ new Map();
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const key2 = key_fn(array[i], i);
    if (keys.has(key2)) {
      const a = String(keys.get(key2));
      const b = String(i);
      let k = String(key2);
      if (k.startsWith("[object ")) k = null;
      each_key_duplicate(a, b, k);
    }
    keys.set(key2, i);
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/css.js
function append_styles(anchor, css) {
  effect(() => {
    var root7 = anchor.getRootNode();
    var target = (
      /** @type {ShadowRoot} */
      root7.host ? (
        /** @type {ShadowRoot} */
        root7
      ) : (
        /** @type {Document} */
        root7.head ?? /** @type {Document} */
        root7.ownerDocument.head
      )
    );
    if (!target.querySelector("#" + css.hash)) {
      const style = create_element("style");
      style.id = css.hash;
      style.textContent = css.code;
      target.appendChild(style);
      if (dev_fallback_default) {
        register_style(css.hash, style);
      }
    }
  });
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/actions.js
function action(dom, action2, get_value) {
  effect(() => {
    var payload = untrack(() => action2(dom, get_value?.()) || {});
    if (get_value && payload?.update) {
      var inited = false;
      var prev = (
        /** @type {any} */
        {}
      );
      render_effect(() => {
        var value = get_value();
        deep_read_state(value);
        if (inited && safe_not_equal(prev, value)) {
          prev = value;
          payload.update(value);
        }
      });
      inited = true;
    }
    if (payload?.destroy) {
      return () => (
        /** @type {Function} */
        payload.destroy()
      );
    }
  });
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/shared/attributes.js
var whitespace = [..." 	\n\r\f\xA0\v\uFEFF"];
function to_class(value, hash2, directives) {
  var classname = value == null ? "" : "" + value;
  if (hash2) {
    classname = classname ? classname + " " + hash2 : hash2;
  }
  if (directives) {
    for (var key2 of Object.keys(directives)) {
      if (directives[key2]) {
        classname = classname ? classname + " " + key2 : key2;
      } else if (classname.length) {
        var len = key2.length;
        var a = 0;
        while ((a = classname.indexOf(key2, a)) >= 0) {
          var b = a + len;
          if ((a === 0 || whitespace.includes(classname[a - 1])) && (b === classname.length || whitespace.includes(classname[b]))) {
            classname = (a === 0 ? "" : classname.substring(0, a)) + classname.substring(b + 1);
          } else {
            a = b;
          }
        }
      }
    }
  }
  return classname === "" ? null : classname;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/class.js
function set_class(dom, is_html, value, hash2, prev_classes, next_classes) {
  var prev = (
    /** @type {any} */
    dom[CLASS_CACHE]
  );
  if (hydrating || prev !== value || prev === void 0) {
    var next_class_name = to_class(value, hash2, next_classes);
    if (!hydrating || next_class_name !== dom.getAttribute("class")) {
      if (next_class_name == null) {
        dom.removeAttribute("class");
      } else if (is_html) {
        dom.className = next_class_name;
      } else {
        dom.setAttribute("class", next_class_name);
      }
    }
    dom[CLASS_CACHE] = value;
  } else if (next_classes && prev_classes !== next_classes) {
    for (var key2 in next_classes) {
      var is_present = !!next_classes[key2];
      if (prev_classes == null || is_present !== !!prev_classes[key2]) {
        dom.classList.toggle(key2, is_present);
      }
    }
  }
  return next_classes;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
function select_option(select, value, mounting = false) {
  if (select.multiple) {
    if (value == void 0) {
      return;
    }
    if (!is_array(value)) {
      return select_multiple_invalid_value();
    }
    for (var option of select.options) {
      option.selected = value.includes(get_option_value(option));
    }
    return;
  }
  for (option of select.options) {
    var option_value = get_option_value(option);
    if (is(option_value, value)) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function init_select(select) {
  var observer = new MutationObserver(() => {
    select_option(select, select.__value);
  });
  observer.observe(select, {
    // Listen to option element changes
    childList: true,
    subtree: true,
    // because of <optgroup>
    // Listen to option element value attribute changes
    // (doesn't get notified of select value changes,
    // because that property is not reflected as an attribute)
    attributes: true,
    attributeFilter: ["value"]
  });
  teardown(() => {
    observer.disconnect();
  });
}
function bind_select_value(select, get3, set2 = get3) {
  var batches = /* @__PURE__ */ new WeakSet();
  var mounting = true;
  listen_to_event_and_reset_event(select, "change", (is_reset) => {
    var query = is_reset ? "[selected]" : ":checked";
    var value;
    if (select.multiple) {
      value = [].map.call(select.querySelectorAll(query), get_option_value);
    } else {
      var selected_option = select.querySelector(query) ?? // will fall back to first non-disabled option if no option is selected
      select.querySelector("option:not([disabled])");
      value = selected_option && get_option_value(selected_option);
    }
    set2(value);
    select.__value = value;
    if (current_batch !== null) {
      batches.add(current_batch);
    }
  });
  effect(() => {
    var value = get3();
    if (select === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        async_mode_flag ? previous_batch : current_batch
      );
      if (batches.has(batch)) {
        return;
      }
    }
    select_option(select, value, mounting);
    if (mounting && value === void 0) {
      var selected_option = select.querySelector(":checked");
      if (selected_option !== null) {
        value = get_option_value(selected_option);
        set2(value);
      }
    }
    select.__value = value;
    mounting = false;
  });
  init_select(select);
}
function get_option_value(option) {
  if ("__value" in option) {
    return option.__value;
  } else {
    return option.value;
  }
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/attributes.js
var IS_CUSTOM_ELEMENT = /* @__PURE__ */ Symbol("is custom element");
var IS_HTML = /* @__PURE__ */ Symbol("is html");
var LINK_TAG = IS_XHTML ? "link" : "LINK";
var PROGRESS_TAG = IS_XHTML ? "progress" : "PROGRESS";
function remove_input_defaults(input) {
  if (!hydrating) return;
  var already_removed = false;
  var remove_defaults = () => {
    if (already_removed) return;
    already_removed = true;
    if (input.hasAttribute("value")) {
      var value = input.value;
      set_attribute2(input, "value", null);
      input.value = value;
    }
    if (input.hasAttribute("checked")) {
      var checked = input.checked;
      set_attribute2(input, "checked", null);
      input.checked = checked;
    }
  };
  input[FORM_RESET_HANDLER] = remove_defaults;
  queue_micro_task(remove_defaults);
  add_form_reset_listener();
}
function set_value(element2, value) {
  var attributes = get_attributes(element2);
  if (attributes.value === (attributes.value = // treat null and undefined the same for the initial value
  value ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  element2.value === value && (value !== 0 || element2.nodeName !== PROGRESS_TAG)) {
    return;
  }
  element2.value = value ?? "";
}
function set_checked(element2, checked) {
  var attributes = get_attributes(element2);
  if (attributes.checked === (attributes.checked = // treat null and undefined the same for the initial value
  checked ?? void 0)) {
    return;
  }
  element2.checked = checked;
}
function set_selected(element2, selected) {
  if (selected) {
    if (!element2.hasAttribute("selected")) {
      element2.setAttribute("selected", "");
    }
  } else {
    element2.removeAttribute("selected");
  }
}
function set_attribute2(element2, attribute, value, skip_warning) {
  var attributes = get_attributes(element2);
  if (hydrating) {
    attributes[attribute] = element2.getAttribute(attribute);
    if (attribute === "src" || attribute === "srcset" || attribute === "href" && element2.nodeName === LINK_TAG) {
      if (!skip_warning) {
        check_src_in_dev_hydration(element2, attribute, value ?? "");
      }
      return;
    }
  }
  if (attributes[attribute] === (attributes[attribute] = value)) return;
  if (attribute === "loading") {
    element2[LOADING_ATTR_SYMBOL] = value;
  }
  if (value == null) {
    element2.removeAttribute(attribute);
  } else if (typeof value !== "string" && get_setters(element2).includes(attribute)) {
    element2[attribute] = value;
  } else {
    element2.setAttribute(attribute, value);
  }
}
function get_attributes(element2) {
  var _a2;
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    element2[_a2 = ATTRIBUTES_CACHE] ?? (element2[_a2] = {
      [IS_CUSTOM_ELEMENT]: element2.nodeName.includes("-"),
      [IS_HTML]: element2.namespaceURI === NAMESPACE_HTML
    })
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(element2) {
  var cache_key = element2.getAttribute("is") || element2.nodeName;
  var setters = setters_cache.get(cache_key);
  if (setters) return setters;
  setters_cache.set(cache_key, setters = []);
  var descriptors;
  var proto = element2;
  var element_proto = Element.prototype;
  while (element_proto !== proto) {
    descriptors = get_descriptors(proto);
    for (var key2 in descriptors) {
      if (descriptors[key2].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      key2 !== "innerHTML" && key2 !== "textContent" && key2 !== "innerText") {
        setters.push(key2);
      }
    }
    proto = get_prototype_of(proto);
  }
  return setters;
}
function check_src_in_dev_hydration(element2, attribute, value) {
  if (!dev_fallback_default) return;
  if (attribute === "srcset" && srcset_url_equal(element2, value)) return;
  if (src_url_equal(element2.getAttribute(attribute) ?? "", value)) return;
  hydration_attribute_changed(
    attribute,
    element2.outerHTML.replace(element2.innerHTML, element2.innerHTML && "..."),
    String(value)
  );
}
function src_url_equal(element_src, url) {
  if (element_src === url) return true;
  return new URL(element_src, document.baseURI).href === new URL(url, document.baseURI).href;
}
function split_srcset(srcset) {
  return srcset.split(",").map((src) => src.trim().split(" ").filter(Boolean));
}
function srcset_url_equal(element2, srcset) {
  var element_urls = split_srcset(element2.srcset);
  var urls = split_srcset(srcset);
  return urls.length === element_urls.length && urls.every(
    ([url, width], i) => width === element_urls[i][1] && // We need to test both ways because Vite will create an a full URL with
    // `new URL(asset, import.meta.url).href` for the client when `base: './'`, and the
    // relative URLs inside srcset are not automatically resolved to absolute URLs by
    // browsers (in contrast to img.src). This means both SSR and DOM code could
    // contain relative or absolute URLs.
    (src_url_equal(element_urls[i][0], url) || src_url_equal(url, element_urls[i][0]))
  );
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
function bind_value(input, get3, set2 = get3) {
  var batches = /* @__PURE__ */ new WeakSet();
  listen_to_event_and_reset_event(input, "input", async (is_reset) => {
    if (dev_fallback_default && input.type === "checkbox") {
      bind_invalid_checkbox_value();
    }
    var value = is_reset ? input.defaultValue : input.value;
    value = is_numberlike_input(input) ? to_number(value) : value;
    set2(value);
    if (current_batch !== null) {
      batches.add(current_batch);
    }
    await tick();
    if (value !== (value = get3())) {
      var start = input.selectionStart;
      var end = input.selectionEnd;
      var length = input.value.length;
      input.value = value ?? "";
      if (end !== null) {
        var new_length = input.value.length;
        if (start === end && end === length && new_length > length) {
          input.selectionStart = new_length;
          input.selectionEnd = new_length;
        } else {
          input.selectionStart = start;
          input.selectionEnd = Math.min(end, new_length);
        }
      }
    }
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the updated value from the input instead.
    hydrating && input.defaultValue !== input.value || // If defaultValue is set, then value == defaultValue
    // TODO Svelte 6: remove input.value check and set to empty string?
    untrack(get3) == null && input.value
  ) {
    set2(is_numberlike_input(input) ? to_number(input.value) : input.value);
    if (current_batch !== null) {
      batches.add(current_batch);
    }
  }
  render_effect(() => {
    if (dev_fallback_default && input.type === "checkbox") {
      bind_invalid_checkbox_value();
    }
    var value = get3();
    if (input === document.activeElement) {
      var batch = (
        /** @type {Batch} */
        async_mode_flag ? previous_batch : current_batch
      );
      if (batches.has(batch)) {
        return;
      }
    }
    if (is_numberlike_input(input) && value === to_number(input.value)) {
      return;
    }
    if (input.type === "date" && !value && !input.value) {
      return;
    }
    if (value !== input.value) {
      input.value = value ?? "";
    }
  });
}
function bind_checked(input, get3, set2 = get3) {
  listen_to_event_and_reset_event(input, "change", (is_reset) => {
    var value = is_reset ? input.defaultChecked : input.checked;
    set2(value);
  });
  if (
    // If we are hydrating and the value has since changed,
    // then use the update value from the input instead.
    hydrating && input.defaultChecked !== input.checked || // If defaultChecked is set, then checked == defaultChecked
    untrack(get3) == null
  ) {
    set2(input.checked);
  }
  render_effect(() => {
    var value = get3();
    input.checked = Boolean(value);
  });
}
function is_numberlike_input(input) {
  var type = input.type;
  return type === "number" || type === "range";
}
function to_number(value) {
  return value === "" ? null : +value;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
function is_bound_this(bound_value, element_or_component) {
  return bound_value === element_or_component || bound_value?.[STATE_SYMBOL] === element_or_component;
}
function bind_this(element_or_component = {}, update2, get_value, get_parts) {
  var component_effect = (
    /** @type {ComponentContext} */
    component_context.r
  );
  var parent = (
    /** @type {Effect} */
    active_effect
  );
  effect(() => {
    var old_parts;
    var parts;
    render_effect(() => {
      old_parts = parts;
      parts = get_parts?.() || [];
      untrack(() => {
        if (!is_bound_this(get_value(...parts), element_or_component)) {
          update2(element_or_component, ...parts);
          if (old_parts && is_bound_this(get_value(...old_parts), element_or_component)) {
            update2(null, ...old_parts);
          }
        }
      });
    });
    return () => {
      let p = parent;
      while (p !== component_effect && p.parent !== null && p.parent.f & DESTROYING) {
        p = p.parent;
      }
      const teardown2 = () => {
        if (parts && is_bound_this(get_value(...parts), element_or_component)) {
          update2(null, ...parts);
        }
      };
      const original_teardown = p.teardown;
      p.teardown = () => {
        teardown2();
        original_teardown?.();
      };
    };
  });
  return element_or_component;
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/reactivity/props.js
function prop(props, key2, flags2, fallback2) {
  var runes = !legacy_mode_flag || (flags2 & PROPS_IS_RUNES) !== 0;
  var bindable = (flags2 & PROPS_IS_BINDABLE) !== 0;
  var lazy = (flags2 & PROPS_IS_LAZY_INITIAL) !== 0;
  var fallback_value = (
    /** @type {V} */
    fallback2
  );
  var fallback_dirty = true;
  var fallback_signal = (
    /** @type {Derived<V> | undefined} */
    void 0
  );
  var get_fallback = () => {
    if (lazy && runes) {
      fallback_signal ?? (fallback_signal = derived(
        /** @type {() => V} */
        fallback2
      ));
      return get2(fallback_signal);
    }
    if (fallback_dirty) {
      fallback_dirty = false;
      fallback_value = lazy ? untrack(
        /** @type {() => V} */
        fallback2
      ) : (
        /** @type {V} */
        fallback2
      );
    }
    return fallback_value;
  };
  let setter;
  if (bindable) {
    var is_entry_props = STATE_SYMBOL in props || LEGACY_PROPS in props;
    setter = get_descriptor(props, key2)?.set ?? (is_entry_props && key2 in props ? (v) => props[key2] = v : void 0);
  }
  var initial_value;
  var is_store_sub = false;
  if (bindable) {
    [initial_value, is_store_sub] = capture_store_binding(() => (
      /** @type {V} */
      props[key2]
    ));
  } else {
    initial_value = /** @type {V} */
    props[key2];
  }
  if (initial_value === void 0 && fallback2 !== void 0) {
    initial_value = get_fallback();
    if (setter) {
      if (runes) props_invalid_value(key2);
      setter(initial_value);
    }
  }
  var getter;
  if (runes) {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key2]
      );
      if (value === void 0) return get_fallback();
      fallback_dirty = true;
      return value;
    };
  } else {
    getter = () => {
      var value = (
        /** @type {V} */
        props[key2]
      );
      if (value !== void 0) {
        fallback_value = /** @type {V} */
        void 0;
      }
      return value === void 0 ? fallback_value : value;
    };
  }
  if (runes && (flags2 & PROPS_IS_UPDATED) === 0) {
    return getter;
  }
  if (setter) {
    var legacy_parent = props.$$legacy;
    return (
      /** @type {() => V} */
      (function(value, mutation) {
        if (arguments.length > 0) {
          if (!runes || !mutation || legacy_parent || is_store_sub) {
            setter(mutation ? getter() : value);
          }
          return value;
        }
        return getter();
      })
    );
  }
  var overridden = false;
  var d = ((flags2 & PROPS_IS_IMMUTABLE) !== 0 ? derived : derived_safe_equal)(() => {
    overridden = false;
    return getter();
  });
  if (dev_fallback_default) {
    d.label = key2;
  }
  if (bindable) get2(d);
  var parent_effect = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    (function(value, mutation) {
      if (arguments.length > 0) {
        const new_value = mutation ? get2(d) : runes && bindable ? proxy(value) : value;
        set(d, new_value);
        overridden = true;
        if (fallback_value !== void 0) {
          fallback_value = new_value;
        }
        return value;
      }
      if (is_destroying_effect && overridden || (parent_effect.f & DESTROYED) !== 0) {
        return d.v;
      }
      return get2(d);
    })
  );
}

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/legacy/legacy-client.js
function createClassComponent(options) {
  return new Svelte4Component(options);
}
var _events, _instance;
var Svelte4Component = class {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(options) {
    /** @type {any} */
    __privateAdd(this, _events);
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance);
    var sources = /* @__PURE__ */ new Map();
    var add_source = (key2, value) => {
      var s = mutable_source(value, false, false);
      sources.set(key2, s);
      return s;
    };
    const props = new Proxy(
      { ...options.props || {}, $$events: {} },
      {
        get(target, prop2) {
          return get2(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
        },
        has(target, prop2) {
          if (prop2 === LEGACY_PROPS) return true;
          get2(sources.get(prop2) ?? add_source(prop2, Reflect.get(target, prop2)));
          return Reflect.has(target, prop2);
        },
        set(target, prop2, value) {
          set(sources.get(prop2) ?? add_source(prop2, value), value);
          return Reflect.set(target, prop2, value);
        }
      }
    );
    __privateSet(this, _instance, (options.hydrate ? hydrate : mount)(options.component, {
      target: options.target,
      anchor: options.anchor,
      props,
      context: options.context,
      intro: options.intro ?? false,
      recover: options.recover,
      transformError: options.transformError
    }));
    if (!async_mode_flag && (!options?.props?.$$host || options.sync === false)) {
      flushSync();
    }
    __privateSet(this, _events, props.$$events);
    for (const key2 of Object.keys(__privateGet(this, _instance))) {
      if (key2 === "$set" || key2 === "$destroy" || key2 === "$on") continue;
      define_property(this, key2, {
        get() {
          return __privateGet(this, _instance)[key2];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key2] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next2) => {
      Object.assign(props, next2);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event2, callback) {
    __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event2].push(cb);
    return () => {
      __privateGet(this, _events)[event2] = __privateGet(this, _events)[event2].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
};
_events = new WeakMap();
_instance = new WeakMap();

// node_modules/.pnpm/svelte@5.56.4_@typescript-eslint+types@8.63.0/node_modules/svelte/src/internal/client/dom/elements/custom-element.js
var SvelteElement;
if (typeof HTMLElement === "function") {
  SvelteElement = class extends HTMLElement {
    /**
     * @param {*} $$componentCtor
     * @param {*} $$slots
     * @param {ShadowRootInit | undefined} shadow_root_init
     */
    constructor($$componentCtor, $$slots, shadow_root_init) {
      super();
      /** The Svelte component constructor */
      __publicField(this, "$$ctor");
      /** Slots */
      __publicField(this, "$$s");
      /** @type {any} The Svelte component instance */
      __publicField(this, "$$c");
      /** Whether or not the custom element is connected */
      __publicField(this, "$$cn", false);
      /** @type {Record<string, any>} Component props data */
      __publicField(this, "$$d", {});
      /** `true` if currently in the process of reflecting component props back to attributes */
      __publicField(this, "$$r", false);
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      __publicField(this, "$$p_d", {});
      /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
      __publicField(this, "$$l", {});
      /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
      __publicField(this, "$$l_u", /* @__PURE__ */ new Map());
      /** @type {any} The managed render effect for reflecting attributes */
      __publicField(this, "$$me");
      /** @type {ShadowRoot | null} The ShadowRoot of the custom element */
      __publicField(this, "$$shadowRoot", null);
      this.$$ctor = $$componentCtor;
      this.$$s = $$slots;
      if (shadow_root_init) {
        this.$$shadowRoot = this.attachShadow(shadow_root_init);
      }
    }
    /**
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    addEventListener(type, listener, options) {
      this.$$l[type] = this.$$l[type] || [];
      this.$$l[type].push(listener);
      if (this.$$c) {
        const unsub = this.$$c.$on(type, listener);
        this.$$l_u.set(listener, unsub);
      }
      super.addEventListener(type, listener, options);
    }
    /**
     * @param {string} type
     * @param {EventListenerOrEventListenerObject} listener
     * @param {boolean | AddEventListenerOptions} [options]
     */
    removeEventListener(type, listener, options) {
      super.removeEventListener(type, listener, options);
      if (this.$$c) {
        const unsub = this.$$l_u.get(listener);
        if (unsub) {
          unsub();
          this.$$l_u.delete(listener);
        }
      }
    }
    async connectedCallback() {
      this.$$cn = true;
      if (!this.$$c) {
        let create_slot = function(name) {
          return (anchor) => {
            const slot2 = create_element("slot");
            if (name !== "default") slot2.name = name;
            append(anchor, slot2);
          };
        };
        await Promise.resolve();
        if (!this.$$cn || this.$$c) {
          return;
        }
        const $$slots = {};
        const existing_slots = get_custom_elements_slots(this);
        for (const name of this.$$s) {
          if (name in existing_slots) {
            if (name === "default" && !this.$$d.children) {
              this.$$d.children = create_slot(name);
              $$slots.default = true;
            } else {
              $$slots[name] = create_slot(name);
            }
          }
        }
        for (const attribute of this.attributes) {
          const name = this.$$g_p(attribute.name);
          if (!(name in this.$$d)) {
            this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
          }
        }
        for (const key2 in this.$$p_d) {
          if (!(key2 in this.$$d) && this[key2] !== void 0) {
            this.$$d[key2] = this[key2];
            delete this[key2];
          }
        }
        this.$$c = createClassComponent({
          component: this.$$ctor,
          target: this.$$shadowRoot || this,
          props: {
            ...this.$$d,
            $$slots,
            $$host: this
          }
        });
        this.$$me = effect_root(() => {
          render_effect(() => {
            this.$$r = true;
            for (const key2 of object_keys(this.$$c)) {
              if (!this.$$p_d[key2]?.reflect) continue;
              this.$$d[key2] = this.$$c[key2];
              const attribute_value = get_custom_element_value(
                key2,
                this.$$d[key2],
                this.$$p_d,
                "toAttribute"
              );
              if (attribute_value == null) {
                this.removeAttribute(this.$$p_d[key2].attribute || key2);
              } else {
                this.setAttribute(this.$$p_d[key2].attribute || key2, attribute_value);
              }
            }
            this.$$r = false;
          });
        });
        for (const type in this.$$l) {
          for (const listener of this.$$l[type]) {
            const unsub = this.$$c.$on(type, listener);
            this.$$l_u.set(listener, unsub);
          }
        }
        this.$$l = {};
      }
    }
    // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
    // and setting attributes through setAttribute etc, this is helpful
    /**
     * @param {string} attr
     * @param {string} _oldValue
     * @param {string} newValue
     */
    attributeChangedCallback(attr2, _oldValue, newValue) {
      if (this.$$r) return;
      attr2 = this.$$g_p(attr2);
      this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
      this.$$c?.$set({ [attr2]: this.$$d[attr2] });
    }
    disconnectedCallback() {
      this.$$cn = false;
      Promise.resolve().then(() => {
        if (!this.$$cn && this.$$c) {
          this.$$c.$destroy();
          this.$$me();
          this.$$c = void 0;
        }
      });
    }
    /**
     * @param {string} attribute_name
     */
    $$g_p(attribute_name) {
      return object_keys(this.$$p_d).find(
        (key2) => this.$$p_d[key2].attribute === attribute_name || !this.$$p_d[key2].attribute && key2.toLowerCase() === attribute_name
      ) || attribute_name;
    }
  };
}
function get_custom_element_value(prop2, value, props_definition, transform) {
  const type = props_definition[prop2]?.type;
  value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
  if (!transform || !props_definition[prop2]) {
    return value;
  } else if (transform === "toAttribute") {
    switch (type) {
      case "Object":
      case "Array":
        return value == null ? null : JSON.stringify(value);
      case "Boolean":
        return value ? "" : null;
      case "Number":
        return value == null ? null : value;
      default:
        return value;
    }
  } else {
    switch (type) {
      case "Object":
      case "Array":
        return value && JSON.parse(value);
      case "Boolean":
        return value;
      // conversion already handled above
      case "Number":
        return value != null ? +value : value;
      default:
        return value;
    }
  }
}
function get_custom_elements_slots(element2) {
  const result = {};
  element2.childNodes.forEach((node) => {
    result[
      /** @type {Element} node */
      node.slot || "default"
    ] = true;
  });
  return result;
}

// src/Types/progressPropertyOptions.ts
var ProgressPropertyOptions = /* @__PURE__ */ ((ProgressPropertyOptions2) => {
  ProgressPropertyOptions2["TaskTotal"] = "Total Tasks";
  ProgressPropertyOptions2["TaskComplete"] = "Completed Tasks";
  ProgressPropertyOptions2["TaskIncomplete"] = "Incomplete Tasks";
  return ProgressPropertyOptions2;
})(ProgressPropertyOptions || {});

// src/Modals/ProgressPropertiesSettingModal/ProgressPropertiesModalContent.svelte
var root = from_html(`<option></option>`);
var root_1 = from_html(`<tr><td><input type="text" placeholder="Property name"/></td><td><select class="svelte-1eh4i7q"></select></td><td><input type="button" class="not-a-button" value="\u274C"/></td></tr>`);
var root_2 = from_html(`<div class="centerSettingContent"><table style="width: 100%"><thead><tr><th>Name</th><th>Type</th></tr></thead><tbody></tbody></table> <div class="buttonContainer svelte-1eh4i7q"><button class="mod-cta svelte-1eh4i7q">Add</button></div></div>`);
var $$css = {
  hash: "svelte-1eh4i7q",
  code: ".buttonContainer.svelte-1eh4i7q {display:flex;justify-content:center;margin-top:1rem;}select.svelte-1eh4i7q {border-radius:4px;width:100%;height:30px;border:1px solid #dbdbdc;color:#383a42;background-color:#fff;padding:3px;}button.svelte-1eh4i7q {margin-left:5px;margin-right:5px;font-size:15px;}"
};
function ProgressPropertiesModalContent($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css);
  const options = Object.keys(ProgressPropertyOptions).map((k) => ProgressPropertyOptions[k]);
  let initialProperties = prop($$props, "properties", 19, () => []);
  let properties = state(proxy(untrack(() => initialProperties().map((property) => ({ ...property })))));
  function saveProperties() {
    $$props.save(snapshot(get2(properties)));
  }
  function addNewProperty() {
    const newProp = { name: "", type: "Total Tasks" /* TaskTotal */ };
    set(properties, [...get2(properties), newProp], true);
    saveProperties();
  }
  function removeProperty(property) {
    set(properties, get2(properties).filter((prop2) => prop2 !== property), true);
    saveProperties();
  }
  var div = root_2();
  var table = child(div);
  var tbody = sibling(child(table));
  each(tbody, 20, () => get2(properties), (property) => property, ($$anchor2, property, $$index_1) => {
    var tr = root_1();
    var td = child(tr);
    var input = child(td);
    remove_input_defaults(input);
    reset(td);
    var td_1 = sibling(td);
    var select = child(td_1);
    each(select, 20, () => options, (text2) => text2, ($$anchor3, text2) => {
      var option = root();
      var option_value = {};
      template_effect(() => {
        set_attribute2(option, "label", text2);
        if (option_value !== (option_value = text2)) {
          option.value = (option.__value = text2) ?? "";
        }
      });
      append($$anchor3, option);
    });
    reset(select);
    reset(td_1);
    var td_2 = sibling(td_1);
    var input_1 = child(td_2);
    reset(td_2);
    reset(tr);
    delegated("change", input, saveProperties);
    bind_value(input, () => property.name, ($$value) => property.name = $$value);
    delegated("change", select, saveProperties);
    bind_select_value(select, () => property.type, ($$value) => property.type = $$value);
    delegated("click", input_1, () => removeProperty(property));
    append($$anchor2, tr);
  });
  reset(tbody);
  reset(table);
  var div_1 = sibling(table, 2);
  var button = child(div_1);
  reset(div_1);
  reset(div);
  delegated("click", button, addNewProperty);
  append($$anchor, div);
  pop();
}
delegate(["change", "click"]);

// src/Modals/AutoPropertiesSettingModal/AutoPropertiesModalContent.svelte
var import_obsidian = require("obsidian");

// src/autoProperties.ts
function findAutoProperty(properties, propertyName) {
  return properties?.find((a) => a.name === propertyName);
}
function isMultiAutoProperty(autoProp, editMode, propertyName) {
  if (autoProp.type === "Multi") return true;
  if (autoProp.type === "Single") return false;
  if (editMode.mode === "All Multi" /* AllMulti */) return true;
  if (editMode.mode === "Some Multi" /* SomeMulti */ && editMode.properties.includes(propertyName)) {
    return true;
  }
  return false;
}
function normalizeChoices(choices) {
  if (!choices) return [];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const raw of choices) {
    const choice = (raw ?? "").trim();
    if (choice === "" || seen.has(choice)) continue;
    seen.add(choice);
    out.push(choice);
  }
  return out;
}
function splitPastedChoices(text2) {
  if (!text2) return [];
  const parts = /[\r\n]/.test(text2) ? text2.split(/\r\n|\r|\n/) : text2.split(",");
  return parts.map((p) => p.trim()).filter((p) => p !== "");
}
function withChoicesPasted(choices, index2, tokens) {
  const before = choices.slice(0, index2);
  const after = choices.slice(index2 + 1);
  const taken = new Set(
    [...before, ...after].map((c) => (c ?? "").trim()).filter((c) => c !== "")
  );
  const inserted = [];
  for (const raw of tokens) {
    const choice = (raw ?? "").trim();
    if (choice === "" || taken.has(choice)) continue;
    taken.add(choice);
    inserted.push(choice);
  }
  return [...before, ...inserted, ...after];
}
function cloneAutoProperty(property) {
  const clone2 = {
    name: property.name,
    choices: Array.isArray(property.choices) ? [...property.choices] : []
  };
  if (property.description !== void 0) clone2.description = property.description;
  if (property.type !== void 0) clone2.type = property.type;
  return clone2;
}
function cloneAutoProperties(properties) {
  if (!Array.isArray(properties)) return [];
  return properties.map(cloneAutoProperty);
}
function applyAutoPropertySettingsOperation(properties, operation) {
  const next2 = cloneAutoProperties(properties);
  switch (operation.kind) {
    case "addProperty": {
      const index2 = boundedInsertIndex(operation.index, next2.length);
      next2.splice(index2, 0, cloneAutoProperty(operation.property));
      return next2;
    }
    case "removeProperty": {
      const index2 = findAutoPropertyOperationTargetIndex(next2, operation.target);
      if (index2 === -1) return false;
      next2.splice(index2, 1);
      return next2;
    }
    case "setName":
    case "setDescription":
    case "setType": {
      const index2 = findAutoPropertyOperationTargetIndex(next2, operation.target);
      if (index2 === -1) return false;
      const current = next2[index2];
      if (operation.kind === "setName") {
        if (current.name === operation.value) return false;
        current.name = operation.value;
      } else if (operation.kind === "setDescription") {
        if ((current.description ?? "") === operation.value) return false;
        current.description = operation.value;
      } else {
        if ((current.type ?? "Single") === operation.value) return false;
        current.type = operation.value;
      }
      return next2;
    }
    case "addChoice": {
      const property = findAutoPropertyOperationTarget(next2, operation.target);
      if (!property) return false;
      property.choices.splice(boundedInsertIndex(operation.index, property.choices.length), 0, operation.value);
      return next2;
    }
    case "removeChoice": {
      const property = findAutoPropertyOperationTarget(next2, operation.target);
      if (!property) return false;
      const choiceIndex = findExistingChoiceIndex(property.choices, operation.index, operation.value);
      if (choiceIndex === -1) return false;
      property.choices.splice(choiceIndex, 1);
      return next2;
    }
    case "setChoice": {
      const property = findAutoPropertyOperationTarget(next2, operation.target);
      if (!property) return false;
      if (operation.previousValue === operation.value) return false;
      const choiceIndex = findWritableChoiceIndex(property.choices, operation.index, operation.previousValue);
      property.choices.splice(choiceIndex, choiceIndex < property.choices.length ? 1 : 0, operation.value);
      return next2;
    }
    case "replaceChoiceWithChoices": {
      const property = findAutoPropertyOperationTarget(next2, operation.target);
      if (!property) return false;
      const choiceIndex = findExistingChoiceIndex(property.choices, operation.index, operation.previousValue);
      if (choiceIndex === -1) {
        property.choices = withChoicesInserted(property.choices, operation.index, operation.values);
      } else {
        property.choices = withChoicesPasted(property.choices, choiceIndex, operation.values);
      }
      return next2;
    }
  }
}
function boundedInsertIndex(index2, length) {
  if (!Number.isFinite(index2)) return length;
  return Math.max(0, Math.min(index2, length));
}
function findAutoPropertyOperationTarget(properties, target) {
  const index2 = findAutoPropertyOperationTargetIndex(properties, target);
  return index2 === -1 ? void 0 : properties[index2];
}
function findAutoPropertyOperationTargetIndex(properties, target) {
  if (isValidIndex(target.index, properties.length) && properties[target.index].name === target.name) {
    return target.index;
  }
  if (target.name !== "") {
    const namedIndex = properties.findIndex((property) => property.name === target.name);
    if (namedIndex !== -1) return namedIndex;
  }
  if (target.name === "" && isValidIndex(target.index, properties.length)) return target.index;
  return -1;
}
function findExistingChoiceIndex(choices, index2, value) {
  if (isValidIndex(index2, choices.length) && choices[index2] === value) return index2;
  return choices.findIndex((choice) => choice === value);
}
function findWritableChoiceIndex(choices, index2, value) {
  const existingIndex = findExistingChoiceIndex(choices, index2, value);
  if (existingIndex !== -1) return existingIndex;
  return boundedInsertIndex(index2, choices.length);
}
function withChoicesInserted(choices, index2, tokens) {
  const next2 = [...choices];
  const taken = new Set(next2.map((c) => (c ?? "").trim()).filter((c) => c !== ""));
  const inserted = [];
  for (const raw of tokens) {
    const choice = (raw ?? "").trim();
    if (choice === "" || taken.has(choice)) continue;
    taken.add(choice);
    inserted.push(choice);
  }
  next2.splice(boundedInsertIndex(index2, next2.length), 0, ...inserted);
  return next2;
}
function isValidIndex(index2, length) {
  return Number.isInteger(index2) && index2 >= 0 && index2 < length;
}
function splitCommaSeparatedValues(value) {
  const parts = [];
  let start = 0;
  let wikilinkDepth = 0;
  for (let i = 0; i < value.length; i++) {
    if (value.startsWith("[[", i)) {
      wikilinkDepth++;
      i++;
      continue;
    }
    if (wikilinkDepth > 0 && value.startsWith("]]", i)) {
      wikilinkDepth--;
      i++;
      continue;
    }
    if (value[i] === "," && wikilinkDepth === 0) {
      parts.push(value.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(value.slice(start));
  return parts;
}
function matchingOuterBracketIndex(value) {
  let depth = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === "[") {
      depth++;
    } else if (char === "]") {
      depth--;
      if (depth === 0) return i;
      if (depth < 0) return null;
    }
  }
  return null;
}
function shouldUnwrapBracketedList(value) {
  if (!value.startsWith("[") || !value.endsWith("]")) return false;
  if (value.startsWith("[[")) return false;
  if (matchingOuterBracketIndex(value) !== value.length - 1) return false;
  const innerValue = value.slice(1, -1);
  if (innerValue.trim() === "") return true;
  return splitCommaSeparatedValues(innerValue).length > 1;
}
function toValueArray(content) {
  if (content === null || content === void 0) return [];
  if (Array.isArray(content)) {
    return content.map((v) => (v ?? "").toString().trim()).filter(Boolean);
  }
  const value = content.toString().trim();
  const splitValue = shouldUnwrapBracketedList(value) ? value.slice(1, -1) : value;
  return splitCommaSeparatedValues(splitValue).map((s) => s.trim()).filter(Boolean);
}
function multiSelectOptions(autoProp, currentValue) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const value of [...toValueArray(currentValue), ...normalizeChoices(autoProp.choices)]) {
    if (!seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
  }
  return out;
}
function isNewChoice(autoProp, value) {
  const trimmed = value.trim();
  if (trimmed === "") return false;
  return !(autoProp.choices ?? []).some((c) => (c ?? "").trim() === trimmed);
}
function withChoiceAdded(autoProp, value) {
  if (!isNewChoice(autoProp, value)) return autoProp;
  return { ...autoProp, choices: [...autoProp.choices ?? [], value.trim()] };
}

// src/Modals/AutoPropertiesSettingModal/AutoPropertiesModalContent.svelte
var root2 = from_html(`<p class="metaedit-empty svelte-1i9u2va">No auto properties yet. Add one to define a reusable set of values for a property.</p>`);
var root_12 = from_html(`<option> </option>`);
var root_22 = from_html(`<div class="metaedit-ap-choice svelte-1i9u2va"><input type="text" placeholder="Value (or paste a list)" class="svelte-1i9u2va"/> <button class="clickable-icon metaedit-ap-icon svelte-1i9u2va" aria-label="Remove value"><span></span></button></div>`);
var root_3 = from_html(`<div class="metaedit-ap-card svelte-1i9u2va"><div class="metaedit-ap-header svelte-1i9u2va"><input class="metaedit-ap-name svelte-1i9u2va" type="text" placeholder="Property name"/> <select class="dropdown metaedit-ap-type svelte-1i9u2va" aria-label="How many values this property holds"></select> <button class="clickable-icon metaedit-ap-icon svelte-1i9u2va" aria-label="Remove this auto property"><span></span></button></div> <input class="metaedit-ap-description svelte-1i9u2va" type="text" placeholder="Description (shown when you pick a value) - optional"/> <div class="metaedit-ap-values svelte-1i9u2va"><span class="metaedit-ap-label svelte-1i9u2va">Values</span> <!> <button class="metaedit-ap-add-value svelte-1i9u2va"><span></span> Add value</button></div></div>`);
var root_4 = from_html(`<div class="metaedit-auto-properties svelte-1i9u2va"><!> <!> <div class="metaedit-ap-footer svelte-1i9u2va"><button class="mod-cta">Add auto property</button></div></div>`);
var $$css2 = {
  hash: "svelte-1i9u2va",
  code: ".metaedit-auto-properties.svelte-1i9u2va {display:flex;flex-direction:column;gap:0.75rem;margin-top:0.5rem;}.metaedit-empty.svelte-1i9u2va {color:var(--text-muted);text-align:center;margin:0.5rem 0;}.metaedit-ap-card.svelte-1i9u2va {display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem;border:1px solid var(--background-modifier-border);border-radius:var(--radius-m, 8px);background-color:var(--background-secondary);}.metaedit-ap-header.svelte-1i9u2va {display:flex;gap:0.5rem;align-items:center;}.metaedit-ap-name.svelte-1i9u2va {flex:1 1 auto;min-width:0;font-weight:var(--font-semibold, 600);}.metaedit-ap-type.svelte-1i9u2va {flex:0 0 auto;}.metaedit-ap-description.svelte-1i9u2va {width:100%;}.metaedit-ap-values.svelte-1i9u2va {display:flex;flex-direction:column;gap:0.35rem;}.metaedit-ap-label.svelte-1i9u2va {color:var(--text-muted);font-size:var(--font-ui-smaller, 0.8em);}.metaedit-ap-choice.svelte-1i9u2va {display:flex;gap:0.5rem;align-items:center;}.metaedit-ap-choice.svelte-1i9u2va input:where(.svelte-1i9u2va) {flex:1 1 auto;min-width:0;}.metaedit-ap-icon.svelte-1i9u2va {flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;}.metaedit-ap-add-value.svelte-1i9u2va {display:inline-flex;align-items:center;gap:0.35rem;align-self:flex-start;background:transparent;box-shadow:none;color:var(--text-muted);padding:0.25rem 0.4rem;cursor:pointer;}.metaedit-ap-add-value.svelte-1i9u2va:hover {color:var(--text-normal);}.metaedit-ap-footer.svelte-1i9u2va {display:flex;justify-content:center;margin-top:0.25rem;}"
};
function AutoPropertiesModalContent($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css2);
  let initialAutoProperties = prop($$props, "autoProperties", 19, () => []);
  const types = ["Single", "Multi"];
  let nextPropertyId = 0;
  let autoProperties = state(proxy(untrack(() => createEditableAutoProperties(initialAutoProperties()))));
  function icon(node, name) {
    const render = (n) => {
      node.textContent = "";
      (0, import_obsidian.setIcon)(node, n);
    };
    render(name);
    return { update: render };
  }
  function indexes(values) {
    return values.map((_, i) => i);
  }
  function createEditableAutoProperties(properties) {
    return cloneAutoProperties(properties).map((property) => createEditableAutoProperty(property));
  }
  function createEditableAutoProperty(property) {
    return {
      id: nextPropertyId++,
      property,
      targetName: property.name,
      choiceTargets: [...property.choices]
    };
  }
  function targetFor(entry, index2) {
    return { name: entry.targetName, index: index2 };
  }
  function persist(operation) {
    void Promise.resolve($$props.save(operation)).catch((error) => {
      console.error("MetaEdit could not save Auto Properties settings.", error);
    });
  }
  function addNewProperty() {
    const property = { name: "", choices: [""], type: "Single" };
    const entry = createEditableAutoProperty(cloneAutoProperty(property));
    const index2 = get2(autoProperties).length;
    set(autoProperties, [...get2(autoProperties), entry], true);
    persist({ kind: "addProperty", index: index2, property });
  }
  function removeProperty(entry, index2) {
    const target = targetFor(entry, index2);
    set(autoProperties, get2(autoProperties).filter((candidate) => candidate !== entry), true);
    persist({ kind: "removeProperty", target });
  }
  function removeChoice(entry, propertyIndex, choiceIndex) {
    const value = entry.choiceTargets[choiceIndex] ?? entry.property.choices[choiceIndex] ?? "";
    entry.property.choices = entry.property.choices.filter((_, index2) => index2 !== choiceIndex);
    entry.choiceTargets = entry.choiceTargets.filter((_, index2) => index2 !== choiceIndex);
    persist({
      kind: "removeChoice",
      target: targetFor(entry, propertyIndex),
      index: choiceIndex,
      value
    });
  }
  function addChoice(entry, propertyIndex) {
    const index2 = entry.property.choices.length;
    entry.property.choices = [...entry.property.choices, ""];
    entry.choiceTargets = [...entry.choiceTargets, ""];
    persist({
      kind: "addChoice",
      target: targetFor(entry, propertyIndex),
      index: index2,
      value: ""
    });
  }
  function pasteChoices(entry, propertyIndex, index2, event2) {
    const tokens = splitPastedChoices(event2.clipboardData?.getData("text") ?? "");
    if (tokens.length < 2) return;
    event2.preventDefault();
    const previousValue = entry.choiceTargets[index2] ?? entry.property.choices[index2] ?? "";
    entry.property.choices = withChoicesPasted(entry.property.choices, index2, tokens);
    entry.choiceTargets = withChoicesPasted(entry.choiceTargets, index2, tokens);
    persist({
      kind: "replaceChoiceWithChoices",
      target: targetFor(entry, propertyIndex),
      index: index2,
      previousValue,
      values: tokens
    });
  }
  function setName(entry, index2, value) {
    const target = targetFor(entry, index2);
    entry.property.name = value;
    entry.targetName = value;
    persist({ kind: "setName", target, value });
  }
  function setDescription(entry, index2, value) {
    entry.property.description = value;
    persist({
      kind: "setDescription",
      target: targetFor(entry, index2),
      value
    });
  }
  function setType(entry, index2, value) {
    const type = value;
    entry.property.type = type;
    persist({
      kind: "setType",
      target: targetFor(entry, index2),
      value: type
    });
  }
  function setChoice(entry, propertyIndex, choiceIndex, value) {
    const previousValue = entry.choiceTargets[choiceIndex] ?? entry.property.choices[choiceIndex] ?? "";
    entry.property.choices[choiceIndex] = value;
    entry.choiceTargets[choiceIndex] = value;
    persist({
      kind: "setChoice",
      target: targetFor(entry, propertyIndex),
      index: choiceIndex,
      previousValue,
      value
    });
  }
  var div = root_4();
  var node_1 = child(div);
  {
    var consequent = ($$anchor2) => {
      var p = root2();
      append($$anchor2, p);
    };
    if_block(node_1, ($$render) => {
      if (get2(autoProperties).length === 0) $$render(consequent);
    });
  }
  var node_2 = sibling(node_1, 2);
  each(node_2, 19, () => get2(autoProperties), (entry) => entry.id, ($$anchor2, entry, propertyIndex) => {
    const property = user_derived(() => get2(entry).property);
    var div_1 = root_3();
    var div_2 = child(div_1);
    var input = child(div_2);
    remove_input_defaults(input);
    var select = sibling(input, 2);
    each(select, 20, () => types, (t) => t, ($$anchor3, t) => {
      var option = root_12();
      var text2 = child(option, true);
      reset(option);
      var option_value = {};
      template_effect(() => {
        set_selected(option, (get2(property).type ?? "Single") === t);
        set_text(text2, t);
        if (option_value !== (option_value = t)) {
          option.value = (option.__value = t) ?? "";
        }
      });
      append($$anchor3, option);
    });
    reset(select);
    var button = sibling(select, 2);
    var span = child(button);
    action(span, ($$node, $$action_arg) => icon?.($$node, $$action_arg), () => "trash-2");
    reset(button);
    reset(div_2);
    var input_1 = sibling(div_2, 2);
    remove_input_defaults(input_1);
    var div_3 = sibling(input_1, 2);
    var node_3 = sibling(child(div_3), 2);
    each(node_3, 16, () => indexes(get2(property).choices), (i) => i, ($$anchor3, i) => {
      var div_4 = root_22();
      var input_2 = child(div_4);
      remove_input_defaults(input_2);
      var button_1 = sibling(input_2, 2);
      var span_1 = child(button_1);
      action(span_1, ($$node, $$action_arg) => icon?.($$node, $$action_arg), () => "x");
      reset(button_1);
      reset(div_4);
      template_effect(() => set_value(input_2, get2(property).choices[i]));
      delegated("input", input_2, (e) => get2(property).choices[i] = e.currentTarget.value);
      delegated("change", input_2, (e) => setChoice(get2(entry), get2(propertyIndex), i, e.currentTarget.value));
      event("paste", input_2, (e) => pasteChoices(get2(entry), get2(propertyIndex), i, e));
      delegated("click", button_1, () => removeChoice(get2(entry), get2(propertyIndex), i));
      append($$anchor3, div_4);
    });
    var button_2 = sibling(node_3, 2);
    var span_2 = child(button_2);
    action(span_2, ($$node, $$action_arg) => icon?.($$node, $$action_arg), () => "plus");
    next();
    reset(button_2);
    reset(div_3);
    reset(div_1);
    template_effect(() => {
      set_value(input, get2(property).name);
      set_value(input_1, get2(property).description ?? "");
    });
    delegated("input", input, (e) => get2(property).name = e.currentTarget.value);
    delegated("change", input, (e) => setName(get2(entry), get2(propertyIndex), e.currentTarget.value));
    delegated("change", select, (e) => setType(get2(entry), get2(propertyIndex), e.currentTarget.value));
    delegated("click", button, () => removeProperty(get2(entry), get2(propertyIndex)));
    delegated("input", input_1, (e) => get2(property).description = e.currentTarget.value);
    delegated("change", input_1, (e) => setDescription(get2(entry), get2(propertyIndex), e.currentTarget.value));
    delegated("click", button_2, () => addChoice(get2(entry), get2(propertyIndex)));
    append($$anchor2, div_1);
  });
  var div_5 = sibling(node_2, 2);
  var button_3 = child(div_5);
  reset(div_5);
  reset(div);
  delegated("click", button_3, addNewProperty);
  append($$anchor, div);
  pop();
}
delegate(["input", "change", "click"]);

// src/Modals/KanbanHelperSetting/KanbanHelperSettingSuggester.ts
var import_obsidian2 = require("obsidian");
var KanbanHelperSettingSuggester = class extends import_obsidian2.AbstractInputSuggest {
  constructor(app, inputEl, boards) {
    super(app, inputEl);
    this.inputEl = inputEl;
    this.boards = boards;
    this.onSelect((item) => this.acceptSuggestion(item));
  }
  getSuggestions(inputStr) {
    const inputLowerCase = inputStr.toLowerCase();
    return this.boards.filter((board) => board.basename.toLowerCase().includes(inputLowerCase));
  }
  acceptSuggestion(item) {
    this.setValue(item.basename);
    this.inputEl.trigger("input");
    this.close();
  }
  renderSuggestion(value, el) {
    if (value)
      el.setText(value.basename);
  }
};

// src/logger/logManager.ts
var _LogManager = class _LogManager {
  register(logger) {
    _LogManager.loggers.push(logger);
    return this;
  }
  logError(message) {
    _LogManager.loggers.forEach((logger) => logger.logError(message));
    throw new Error();
  }
  logWarning(message) {
    _LogManager.loggers.forEach((logger) => logger.logError(message));
  }
  logMessage(message) {
    _LogManager.loggers.forEach((logger) => logger.logMessage(message));
  }
};
_LogManager.loggers = [];
var LogManager = _LogManager;
var log = new LogManager();

// src/Modals/KanbanHelperSetting/KanbanHelperSettingContent.svelte
var root3 = from_html(`<tr><td><input type="button" value="\u274C" class="not-a-button"/></td><td> </td><td><input type="text" placeholder="Property name"/></td><td> </td></tr>`);
var root_13 = from_html(`<div class="centerSettingContent"><table style="width: 100%"><thead><tr><th></th><th>Board</th><th>Property in link</th><th>Possible values</th></tr></thead><tbody></tbody></table> <input type="text"/> <div class="buttonContainer svelte-pptp52"><button class="mod-cta svelte-pptp52">Add</button></div></div>`);
var $$css3 = {
  hash: "svelte-pptp52",
  code: ".buttonContainer.svelte-pptp52 {display:flex;justify-content:center;margin-top:1rem;}button.svelte-pptp52 {margin-left:5px;margin-right:5px;font-size:15px;}"
};
function KanbanHelperSettingContent($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css3);
  let initialKanbanProperties = prop($$props, "kanbanProperties", 19, () => []);
  const initialApp = untrack(() => $$props.app);
  const initialBoards = untrack(() => $$props.boards);
  let kanbanProperties = state(proxy(untrack(() => initialKanbanProperties().map((property) => ({ ...property })))));
  let suggestEl = state(void 0);
  let suggester;
  let inputValue = state("");
  let didInitialise = false;
  user_effect(() => {
    const el = get2(suggestEl);
    if (!el || didInitialise) return;
    didInitialise = true;
    suggester = new KanbanHelperSettingSuggester(initialApp, el, initialBoards);
    return () => {
      suggester?.close();
      suggester = void 0;
    };
  });
  function saveProperties() {
    $$props.save(snapshot(get2(kanbanProperties)));
  }
  function addNewProperty() {
    const board = initialBoards.find((board2) => board2.basename === get2(inputValue));
    if (!board) return;
    const exists = !!get2(kanbanProperties).find((kp) => kp.boardName === board.basename);
    if (exists) return;
    set(
      kanbanProperties,
      [
        ...get2(kanbanProperties),
        { property: "", boardName: board.basename }
      ],
      true
    );
    saveProperties();
  }
  function removeProperty(i) {
    set(kanbanProperties, get2(kanbanProperties).filter((_, index2) => index2 !== i), true);
    saveProperties();
  }
  function getHeadingsInBoard(boardName) {
    const file = initialBoards.find((board) => board.basename === boardName);
    if (!file) {
      log.logWarning(`file ${boardName} not found.`);
      return "FILE NOT FOUND";
    }
    const headings = initialApp.metadataCache.getFileCache(file)?.headings;
    if (!headings) return "";
    return headings.map((heading) => heading.heading).join(", ");
  }
  var div = root_13();
  var table = child(div);
  var tbody = sibling(child(table));
  each(tbody, 23, () => get2(kanbanProperties), (kanbanProperty) => kanbanProperty.boardName, ($$anchor2, kanbanProperty, i) => {
    var tr = root3();
    var td = child(tr);
    var input = child(td);
    reset(td);
    var td_1 = sibling(td);
    var text2 = child(td_1, true);
    reset(td_1);
    var td_2 = sibling(td_1);
    var input_1 = child(td_2);
    remove_input_defaults(input_1);
    reset(td_2);
    var td_3 = sibling(td_2);
    var text_1 = child(td_3, true);
    reset(td_3);
    reset(tr);
    template_effect(
      ($0) => {
        set_text(text2, get2(kanbanProperty).boardName);
        set_text(text_1, $0);
      },
      [() => getHeadingsInBoard(get2(kanbanProperty).boardName)]
    );
    delegated("click", input, () => removeProperty(get2(i)));
    delegated("change", input_1, saveProperties);
    bind_value(input_1, () => get2(kanbanProperty).property, ($$value) => get2(kanbanProperty).property = $$value);
    append($$anchor2, tr);
  });
  reset(tbody);
  reset(table);
  var input_2 = sibling(table, 2);
  remove_input_defaults(input_2);
  bind_this(input_2, ($$value) => set(suggestEl, $$value), () => get2(suggestEl));
  var div_1 = sibling(input_2, 2);
  var button = child(div_1);
  reset(div_1);
  reset(div);
  bind_value(input_2, () => get2(inputValue), ($$value) => set(inputValue, $$value));
  delegated("click", button, addNewProperty);
  append($$anchor, div);
  pop();
}
delegate(["click", "change"]);

// src/Modals/shared/SingleValueTableEditorContent.svelte
var root4 = from_html(`<tr><td><input type="button" value="\u274C" class="not-a-button"/></td><td><input style="width: 100%;" type="text" placeholder="Property name"/></td></tr>`);
var root_14 = from_html(`<div class="centerSettingContent"><table style="width: 100%"><thead><tr><th></th><th>Property</th></tr></thead><tbody></tbody></table> <div class="buttonContainer svelte-158j4ih"><button class="mod-cta svelte-158j4ih">Add</button></div></div>`);
var $$css4 = {
  hash: "svelte-158j4ih",
  code: ".buttonContainer.svelte-158j4ih {display:flex;justify-content:center;margin-top:1rem;}button.svelte-158j4ih {margin-left:5px;margin-right:5px;font-size:15px;}"
};
function SingleValueTableEditorContent($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css4);
  let initialProperties = prop($$props, "properties", 19, () => []);
  let properties = state(proxy(untrack(() => [...initialProperties()])));
  let propertyIndexes = user_derived(() => get2(properties).map((_, i) => i));
  function saveProperties() {
    $$props.save(snapshot(get2(properties)));
  }
  function addNewProperty() {
    set(properties, [...get2(properties), ""], true);
    saveProperties();
  }
  function removeProperty(i) {
    set(properties, get2(properties).filter((_, index2) => index2 !== i), true);
    saveProperties();
  }
  var div = root_14();
  var table = child(div);
  var tbody = sibling(child(table));
  each(tbody, 20, () => get2(propertyIndexes), (i) => i, ($$anchor2, i) => {
    var tr = root4();
    var td = child(tr);
    var input = child(td);
    reset(td);
    var td_1 = sibling(td);
    var input_1 = child(td_1);
    remove_input_defaults(input_1);
    reset(td_1);
    reset(tr);
    delegated("click", input, () => removeProperty(i));
    delegated("change", input_1, saveProperties);
    bind_value(input_1, () => get2(properties)[i], ($$value) => get2(properties)[i] = $$value);
    append($$anchor2, tr);
  });
  reset(tbody);
  reset(table);
  var div_1 = sibling(table, 2);
  var button = child(div_1);
  reset(div_1);
  reset(div);
  delegated("click", button, addNewProperty);
  append($$anchor, div);
  pop();
}
delegate(["click", "change"]);

// src/svelteMount.ts
function mountSvelteComponent(component2, target, props) {
  return mount(
    component2,
    { target, props }
  );
}
function unmountSvelteComponent(component2) {
  if (!component2) return;
  void unmount(component2);
}

// src/Settings/metaEditSettingsTab.ts
function toggleHiddenEl(el, hidden) {
  if (!el) return hidden;
  el.classList.toggle("metaedit-hidden", !hidden);
  return !hidden;
}
var MetaEditSettingsTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.svelteElements = [];
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    this.destroySvelteElements();
    containerEl.empty();
    new import_obsidian3.Setting(containerEl).setName("MetaEdit Settings").setHeading();
    this.addProgressPropertiesSetting(containerEl);
    this.addAutoPropertiesSetting(containerEl);
    this.addEditMetaMenuSetting(containerEl);
    this.addEditModeSetting(containerEl);
    this.addKanbanHelperSetting(containerEl);
    this.addUIElementsSetting(containerEl);
  }
  addProgressPropertiesSetting(containerEl) {
    let hidden = true;
    const setting = new import_obsidian3.Setting(containerEl).setName("Progress Properties").setDesc("Update properties automatically.").addToggle((toggle) => {
      toggle.setTooltip("Toggle Progress Properties").setValue(this.plugin.settings.ProgressProperties.enabled).onChange(async (value) => {
        if (value === this.plugin.settings.ProgressProperties.enabled) return;
        this.plugin.settings.ProgressProperties.enabled = value;
        this.plugin.toggleAutomators();
        await this.plugin.saveSettings();
      });
    });
    const div = setting.settingEl.createDiv({ cls: "metaedit-hidden" });
    setting.settingEl.classList.add("metaedit-setting-with-details");
    setting.addExtraButton((button) => button.onClick(() => hidden = toggleHiddenEl(div, hidden)));
    const modal = mountSvelteComponent(
      ProgressPropertiesModalContent,
      div,
      {
        properties: this.plugin.settings.ProgressProperties.properties,
        save: async (progressProperties) => {
          this.plugin.settings.ProgressProperties.properties = progressProperties;
          await this.plugin.saveSettings();
        }
      }
    );
    this.svelteElements.push(modal);
  }
  addAutoPropertiesSetting(containerEl) {
    let hidden = true;
    const setting = new import_obsidian3.Setting(containerEl).setName("Auto Properties").setDesc("Quick switch for values you know the value of.").addToggle((toggle) => {
      toggle.setTooltip("Toggle Auto Properties").setValue(this.plugin.settings.AutoProperties.enabled).onChange(async (value) => {
        if (value === this.plugin.settings.AutoProperties.enabled) return;
        this.plugin.settings.AutoProperties.enabled = value;
        await this.plugin.saveSettings();
      });
    });
    const div = setting.settingEl.createDiv({ cls: "metaedit-hidden" });
    setting.settingEl.classList.add("metaedit-setting-with-details");
    setting.addExtraButton((b) => b.onClick(() => hidden = toggleHiddenEl(div, hidden)));
    const modal = mountSvelteComponent(
      AutoPropertiesModalContent,
      div,
      {
        autoProperties: this.plugin.settings.AutoProperties.properties,
        save: (operation) => this.saveAutoPropertiesOperation(operation)
      }
    );
    this.svelteElements.push(modal);
  }
  async saveAutoPropertiesOperation(operation) {
    try {
      await this.plugin.updateSettings(() => {
        const previousAutoProperties = this.plugin.settings.AutoProperties.properties;
        const nextAutoProperties = applyAutoPropertySettingsOperation(previousAutoProperties, operation);
        if (nextAutoProperties === false) return false;
        this.plugin.settings.AutoProperties.properties = nextAutoProperties;
        return () => {
          if (this.plugin.settings.AutoProperties.properties === nextAutoProperties) {
            this.plugin.settings.AutoProperties.properties = previousAutoProperties;
          }
        };
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      new import_obsidian3.Notice(`MetaEdit could not save the Auto Properties setting: ${reason}`);
    }
  }
  addEditMetaMenuSetting(containerEl) {
    let hidden = true;
    const setting = new import_obsidian3.Setting(containerEl).setName("Edit Meta menu").setDesc("Control what the 'Edit Meta' menu lists. Enable it, then use the gear to hide specific properties by name or all of a note's file tags.").addToggle((toggle) => {
      toggle.setTooltip("Toggle menu filtering").setValue(this.plugin.settings.IgnoredProperties.enabled).onChange(async (value) => {
        if (value === this.plugin.settings.IgnoredProperties.enabled) return;
        this.plugin.settings.IgnoredProperties.enabled = value;
        await this.plugin.saveSettings();
        this.display();
      });
    });
    const div = this.plugin.settings.IgnoredProperties.enabled ? setting.settingEl.createDiv({ cls: "metaedit-hidden" }) : void 0;
    if (div) setting.settingEl.classList.add("metaedit-setting-with-details");
    setting.addExtraButton((b) => b.onClick(() => hidden = toggleHiddenEl(div, hidden)));
    if (div) {
      new import_obsidian3.Setting(div).setName("Hide file tags").setDesc("Hide the note's #tags from the menu, leaving only frontmatter and inline fields. A frontmatter 'tags' property stays editable.").addToggle((toggle) => {
        toggle.setTooltip("Toggle hiding file tags").setValue(this.plugin.settings.IgnoredProperties.hideFileTags).onChange(async (value) => {
          if (value === this.plugin.settings.IgnoredProperties.hideFileTags) return;
          this.plugin.settings.IgnoredProperties.hideFileTags = value;
          await this.plugin.saveSettings();
        });
      });
      div.createEl("p", { text: "Hide specific properties by name:", cls: "metaedit-table-label" });
      const modal = mountSvelteComponent(
        SingleValueTableEditorContent,
        div,
        {
          properties: this.plugin.settings.IgnoredProperties.properties,
          save: async (ignoredProperties) => {
            this.plugin.settings.IgnoredProperties.properties = ignoredProperties;
            await this.plugin.saveSettings();
          }
        }
      );
      this.svelteElements.push(modal);
    }
  }
  addEditModeSetting(containerEl) {
    let bDivToggle = true;
    let extraButtonEl;
    const df = new DocumentFragment();
    df.createEl("p", { text: "Single: property values are just one value. " });
    df.createEl("p", { text: "Multi: properties are arrays. " });
    df.createEl("p", { text: "Some Multi: all options are single, except those specified in the settings (click button)." });
    const setting = new import_obsidian3.Setting(containerEl).setName("Edit Mode").setDesc(df);
    const div = setting.settingEl.createDiv({ cls: "metaedit-hidden" });
    setting.settingEl.classList.add("metaedit-setting-with-details");
    setting.addDropdown((dropdown) => {
      dropdown.addOption("All Single" /* AllSingle */, "All Single" /* AllSingle */).addOption("All Multi" /* AllMulti */, "All Multi" /* AllMulti */).addOption("Some Multi" /* SomeMulti */, "Some Multi" /* SomeMulti */).setValue(this.plugin.settings.EditMode.mode).onChange(async (value) => {
        switch (value) {
          case "All Multi" /* AllMulti */:
            this.plugin.settings.EditMode.mode = "All Multi" /* AllMulti */;
            toggleHiddenEl(extraButtonEl, false);
            bDivToggle = toggleHiddenEl(div, false);
            break;
          case "All Single" /* AllSingle */:
            this.plugin.settings.EditMode.mode = "All Single" /* AllSingle */;
            toggleHiddenEl(extraButtonEl, false);
            bDivToggle = toggleHiddenEl(div, false);
            break;
          case "Some Multi" /* SomeMulti */:
            this.plugin.settings.EditMode.mode = "Some Multi" /* SomeMulti */;
            toggleHiddenEl(extraButtonEl, true);
            break;
        }
        await this.plugin.saveSettings();
      });
    }).addExtraButton((b) => {
      extraButtonEl = b.extraSettingsEl;
      b.setTooltip("Configure which properties are Multi.");
      return b.onClick(() => bDivToggle = toggleHiddenEl(div, bDivToggle));
    });
    if (this.plugin.settings.EditMode.mode != "Some Multi" /* SomeMulti */) {
      toggleHiddenEl(extraButtonEl, false);
    }
    const modal = mountSvelteComponent(
      SingleValueTableEditorContent,
      div,
      {
        properties: this.plugin.settings.EditMode.properties,
        save: async (properties) => {
          this.plugin.settings.EditMode.properties = properties;
          await this.plugin.saveSettings();
        }
      }
    );
    this.svelteElements.push(modal);
  }
  hide() {
    this.destroySvelteElements();
    return super.hide();
  }
  destroySvelteElements() {
    this.svelteElements.forEach(unmountSvelteComponent);
    this.svelteElements = [];
  }
  addKanbanHelperSetting(containerEl) {
    let hidden = true;
    const setting = new import_obsidian3.Setting(containerEl).setName("Kanban Board Helper").setDesc("Update properties in links in kanban boards automatically when a card is moved to a new lane.").addToggle((toggle) => {
      toggle.setTooltip("Toggle Kanban Helper").setValue(this.plugin.settings.KanbanHelper.enabled).onChange(async (value) => {
        if (value === this.plugin.settings.KanbanHelper.enabled) return;
        this.plugin.settings.KanbanHelper.enabled = value;
        this.plugin.toggleAutomators();
        await this.plugin.saveSettings();
      });
    });
    const div = setting.settingEl.createDiv({ cls: "metaedit-hidden" });
    setting.settingEl.classList.add("metaedit-setting-with-details");
    setting.addExtraButton((button) => button.onClick(() => hidden = toggleHiddenEl(div, hidden)));
    const modal = mountSvelteComponent(
      KanbanHelperSettingContent,
      div,
      {
        kanbanProperties: this.plugin.settings.KanbanHelper.boards,
        boards: this.plugin.getFilesWithProperty("kanban-plugin"),
        app: this.app,
        save: async (kanbanProperties) => {
          this.plugin.settings.KanbanHelper.boards = kanbanProperties;
          await this.plugin.saveSettings();
        }
      }
    );
    this.svelteElements.push(modal);
  }
  addUIElementsSetting(containerEl) {
    new import_obsidian3.Setting(containerEl).setName("UI Elements").setDesc("Toggle UI elements: the 'Edit Meta' right-click menu option.").addToggle((toggle) => {
      toggle.setTooltip("Toggle UI elements").setValue(this.plugin.settings.UIElements.enabled).onChange(async (value) => {
        if (value === this.plugin.settings.UIElements.enabled) return;
        this.plugin.settings.UIElements.enabled = value;
        if (value) {
          this.plugin.linkMenu.registerEvent();
        } else {
          this.plugin.linkMenu.unregisterEvent();
        }
        await this.plugin.saveSettings();
      });
    });
  }
};

// src/Modals/metaEditSuggester.ts
var import_obsidian4 = require("obsidian");

// src/constants.ts
var newDataView = "New Dataview field";
var newYaml = "New YAML property";
var MAIN_SUGGESTER_OPTIONS = [
  { key: newYaml, content: newYaml, type: 3 /* Option */ },
  { key: newDataView, content: newDataView, type: 3 /* Option */ }
];

// src/Modals/GenericPrompt/valueSuggest.ts
var ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
var ISO_DATETIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
var NATIVE_BUILT_IN_PROPERTY_NAMES = Object.freeze([
  "aliases",
  "cssclass",
  "cssclasses",
  "publish",
  "tags"
]);
var MAX_RENDERED_SUGGESTIONS = 100;
function getValueSuggestions(app, key2, type, tagMode) {
  if (!key2) return [];
  try {
    if (type === 2 /* Tag */) {
      return tagMode === "leaf" ? rankByCount(collectTagLeafCounts(app)) : rankByCount(collectTagFullCounts(app));
    }
    if (type === 0 /* YAML */) {
      return rankByCount(collectFrontmatterValueCounts(app, key2));
    }
    return [];
  } catch {
    return [];
  }
}
function getDateInputType(app, key2, currentValue, type) {
  if (type !== 0 /* YAML */ || !key2) return null;
  let obsidianType;
  try {
    obsidianType = readObsidianType(app, key2);
  } catch {
    return null;
  }
  if (obsidianType !== "date" && obsidianType !== "datetime") return null;
  const value = currentValue === null || currentValue === void 0 ? "" : String(currentValue).trim();
  if (value === "") return obsidianType;
  if (obsidianType === "date" && ISO_DATE.test(value)) return "date";
  if (obsidianType === "datetime" && ISO_DATETIME.test(value)) return "datetime";
  return null;
}
function getKnownPropertyNames(app) {
  const names = /* @__PURE__ */ new Set();
  for (const name of NATIVE_BUILT_IN_PROPERTY_NAMES) names.add(name);
  try {
    const all = getMetadataTypeManager(app)?.getAllProperties?.();
    if (!all) return [...names];
    for (const [key2, info] of Object.entries(all)) {
      addPropertyName(names, key2);
      addPropertyName(names, info?.name);
    }
  } catch {
    return [...names];
  }
  return [...names];
}
function filterSuggestions(items, inputStr) {
  const query = inputStr.toLowerCase();
  const filtered = items.filter((item) => item.toLowerCase().includes(query));
  if (filtered.length === 0) return [];
  if (filtered.length === 1 && filtered[0] === inputStr) return [];
  return filtered.slice(0, MAX_RENDERED_SUGGESTIONS);
}
function collectTagLeafCounts(app) {
  const counts = /* @__PURE__ */ new Map();
  for (const [tag2, count] of Object.entries(readVaultTags(app))) {
    const leaf = tag2.replace(/^#/, "").split("/").pop()?.trim();
    if (!leaf) continue;
    counts.set(leaf, (counts.get(leaf) ?? 0) + (count ?? 1));
  }
  return counts;
}
function collectTagFullCounts(app) {
  const counts = /* @__PURE__ */ new Map();
  for (const [tag2, count] of Object.entries(readVaultTags(app))) {
    const full = tag2.replace(/^#/, "").trim();
    if (!full) continue;
    counts.set(full, (counts.get(full) ?? 0) + (count ?? 1));
  }
  return counts;
}
function readVaultTags(app) {
  const metadataCache = app.metadataCache;
  return metadataCache.getTags?.() ?? {};
}
function collectFrontmatterValueCounts(app, key2) {
  const counts = /* @__PURE__ */ new Map();
  for (const file of app.vault.getMarkdownFiles()) {
    const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
    if (!frontmatter || !Object.prototype.hasOwnProperty.call(frontmatter, key2)) continue;
    for (const value of flattenValues(frontmatter[key2])) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return counts;
}
function flattenValues(raw) {
  const values = Array.isArray(raw) ? raw : [raw];
  const out = [];
  for (const value of values) {
    if (value === null || value === void 0) continue;
    if (typeof value === "object") continue;
    const text2 = String(value).trim();
    if (text2) out.push(text2);
  }
  return out;
}
function rankByCount(counts) {
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([value]) => value);
}
function readObsidianType(app, key2) {
  const typeManager = getMetadataTypeManager(app);
  if (!typeManager) return null;
  const assigned = typeManager.getAssignedWidget?.(key2);
  if (typeof assigned === "string") return assigned;
  const registered = typeManager.getAllProperties?.()?.[key2]?.widget;
  if (typeof registered === "string") return registered;
  const inferred = typeManager.getTypeInfo?.(key2)?.expected?.type;
  return typeof inferred === "string" ? inferred : null;
}
function addPropertyName(names, value) {
  if (typeof value !== "string") return;
  const trimmed = value.trim();
  if (trimmed) names.add(trimmed);
}
function getMetadataTypeManager(app) {
  return app.metadataTypeManager ?? null;
}

// src/Modals/GenericPrompt/promptValueContext.ts
var pending2 = null;
function setPendingValueContext(context) {
  pending2 = context;
}
function consumePendingValueContext() {
  const context = pending2;
  pending2 = null;
  return context;
}

// src/Modals/menuFilter.ts
function filterMenuItems(data, opts) {
  if (!opts.enabled) return [...data];
  const ignored = new Set(opts.ignoredProperties);
  return data.filter((item) => {
    if (ignored.has(item.key)) return false;
    if (opts.hideFileTags && item.type === 2 /* Tag */) return false;
    return true;
  });
}
function canStructureEditProperty(property) {
  if (property.type === 2 /* Tag */) return false;
  return !property.isNested && !property.isVirtual;
}

// src/yamlPath.ts
var YamlPathError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "YamlPathError";
  }
};
function isReservedFrontmatterKey(key2) {
  return key2 === "__proto__" || key2 === "constructor" || key2 === "prototype";
}
function parseYamlPath(path) {
  if (Array.isArray(path)) return validateYamlPath(path);
  if (typeof path !== "string") throw new YamlPathError("YAML path must be a string or path segment array.");
  const trimmed = path.trim();
  if (!trimmed) throw new YamlPathError("YAML path cannot be empty.");
  const segments = [];
  for (const part of trimmed.split(".")) {
    if (!part) throw new YamlPathError(`Invalid YAML path '${path}'. Empty path segments are not supported.`);
    readPathPart(part, path, segments);
  }
  return validateYamlPath(segments);
}
function formatYamlPath(path) {
  const validated = validateYamlPath(path);
  return validated.reduce((label, segment) => {
    if (typeof segment === "number") return `${label}[${segment}]`;
    return label ? `${label}.${segment}` : segment;
  }, "");
}
function getYamlPath(root7, path) {
  const resolvedPath = parseYamlPath(path);
  let current = root7;
  for (const segment of resolvedPath) {
    current = readYamlPathSegment(current, segment, formatYamlPath(resolvedPath));
  }
  return current;
}
function setYamlPath(root7, path, value, options = {}) {
  const resolvedPath = parseYamlPath(path);
  for (const segment of resolvedPath) {
    if (typeof segment === "string" && isReservedFrontmatterKey(segment)) {
      throw new YamlPathError(
        `Cannot write YAML path '${formatYamlPath(resolvedPath)}': '${segment}' is a reserved property name.`
      );
    }
  }
  let current = root7;
  for (let idx = 0; idx < resolvedPath.length; idx++) {
    const segment = resolvedPath[idx];
    const isLeaf = idx === resolvedPath.length - 1;
    const location = formatYamlPath(resolvedPath.slice(0, idx + 1));
    if (typeof segment === "string") {
      if (!isPlainYamlObject(current)) {
        throw new YamlPathError(`Cannot write YAML path '${formatYamlPath(resolvedPath)}': '${location}' is not an object.`);
      }
      if (isLeaf) {
        validateLeafWrite(current, segment, resolvedPath, options);
        current[segment] = value;
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(current, segment)) {
        current[segment] = createMissingParent(options, resolvedPath[idx + 1], location);
      }
      current = current[segment];
      continue;
    }
    if (!Array.isArray(current)) {
      throw new YamlPathError(`Cannot write YAML path '${formatYamlPath(resolvedPath)}': '${location}' is not an array.`);
    }
    if (!arrayIndexExists(current, segment)) {
      throw new YamlPathError(`Cannot write YAML path '${formatYamlPath(resolvedPath)}': array index ${segment} is out of range.`);
    }
    if (isLeaf) {
      validateLeafWrite(current, segment, resolvedPath, options);
      current[segment] = value;
      return;
    }
    current = current[segment];
  }
}
function isPlainYamlObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isYamlScalarLeaf(value) {
  return !isPlainYamlObject(value) && !Array.isArray(value);
}
function isYamlParentContainerValue(value) {
  if (isPlainYamlObject(value)) return true;
  if (!Array.isArray(value)) return false;
  return value.some((item) => isPlainYamlObject(item) || Array.isArray(item));
}
function readPathPart(part, originalPath, segments) {
  const keyMatch = part.match(/^([^\[\]]+)/);
  if (!keyMatch) throw new YamlPathError(`Invalid YAML path '${originalPath}'. Bracket paths must follow a property name.`);
  segments.push(keyMatch[1]);
  let rest = part.substring(keyMatch[1].length);
  while (rest.length > 0) {
    const indexMatch = rest.match(/^\[(\d+)\]/);
    if (!indexMatch) throw new YamlPathError(`Invalid YAML path '${originalPath}'. Only numeric array indexes are supported.`);
    segments.push(Number(indexMatch[1]));
    rest = rest.substring(indexMatch[0].length);
  }
}
function validateYamlPath(path) {
  if (path.length === 0) throw new YamlPathError("YAML path cannot be empty.");
  return path.map((segment) => {
    if (typeof segment === "string") {
      if (!segment) throw new YamlPathError("YAML path string segments cannot be empty.");
      return segment;
    }
    if (!Number.isInteger(segment) || segment < 0) {
      throw new YamlPathError(`YAML path array index '${segment}' must be a non-negative integer.`);
    }
    return segment;
  });
}
function readYamlPathSegment(current, segment, pathLabel) {
  if (typeof segment === "string") {
    if (!isPlainYamlObject(current) || !Object.prototype.hasOwnProperty.call(current, segment)) {
      throw new YamlPathError(`YAML path '${pathLabel}' does not exist.`);
    }
    return current[segment];
  }
  if (!Array.isArray(current) || !arrayIndexExists(current, segment)) {
    throw new YamlPathError(`YAML path '${pathLabel}' does not exist.`);
  }
  return current[segment];
}
function createMissingParent(options, nextSegment, location) {
  if (!options.createParents) {
    throw new YamlPathError(`Cannot write YAML path: '${location}' does not exist.`);
  }
  if (typeof nextSegment === "number") {
    throw new YamlPathError(`Cannot create array parent at '${location}'. Array creation is not supported.`);
  }
  return {};
}
function arrayIndexExists(array, index2) {
  return index2 >= 0 && index2 < array.length && Object.prototype.hasOwnProperty.call(array, index2);
}
function validateLeafWrite(current, segment, path, options) {
  const exists = typeof segment === "number" ? arrayIndexExists(current, segment) : Object.prototype.hasOwnProperty.call(current, segment);
  const label = formatYamlPath(path);
  if (!exists && options.createLeaf === false) {
    throw new YamlPathError(`Cannot write YAML path '${label}': path does not exist.`);
  }
  const currentValue = typeof segment === "number" ? current[segment] : current[segment];
  if (exists && options.validateExpectedValue && !yamlValuesEqual(currentValue, options.expectedValue)) {
    throw new YamlPathError(`Cannot write YAML path '${label}': current value changed before update.`);
  }
}
function yamlValuesEqual(left, right) {
  if (left instanceof Date && right instanceof Date) return left.getTime() === right.getTime();
  return Object.is(left, right);
}

// src/Modals/metaEditSuggester.ts
var DELETE_PROPERTY_ICON = "trash-2";
var TRANSFORM_PROPERTY_ICON = "replace";
var DELETE_PROPERTY_TOOLTIP = "Delete property";
var TRANSFORM_PROPERTY_TOOLTIP = "Transform to YAML \u21C4 Dataview";
var MetaEditSuggester = class _MetaEditSuggester extends import_obsidian4.FuzzySuggestModal {
  constructor(app, plugin, data, file, controller) {
    super(app);
    this.file = file;
    this.app = app;
    this.plugin = plugin;
    this.fileKeys = new Set(data.map((prop2) => prop2.key));
    const ignored = plugin.settings.IgnoredProperties;
    this.data = filterMenuItems(data, {
      enabled: ignored.enabled,
      ignoredProperties: ignored.properties,
      hideFileTags: ignored.hideFileTags
    }).filter((item) => !_MetaEditSuggester.isYamlParentContainer(item));
    this.controller = controller;
    this.options = MAIN_SUGGESTER_OPTIONS;
    this.setSuggestValues();
    this.setInstructions([
      { command: "#tag", purpose: "rename in this note \xB7 vault-wide: Tag pane" }
    ]);
  }
  renderSuggestion(item, el) {
    super.renderSuggestion(item, el);
    if (Object.values(this.options).find((v) => v === item.item)) {
      el.classList.add("metaedit-suggester-command");
    } else {
      if (_MetaEditSuggester.canStructureEdit(item.item)) {
        this.createButton(el, DELETE_PROPERTY_ICON, DELETE_PROPERTY_TOOLTIP, this.deleteItem(item));
        this.createButton(el, TRANSFORM_PROPERTY_ICON, TRANSFORM_PROPERTY_TOOLTIP, this.transformProperty(item));
      }
    }
  }
  getItemText(item) {
    if (item.type === 2 /* Tag */ && item.position) {
      const sameKey = this.data.filter((d) => d.type === 2 /* Tag */ && d.key === item.key && d.position).sort((a, b) => a.position.start - b.position.start);
      if (sameKey.length > 1) {
        const ordinal = sameKey.findIndex((d) => d.position.start === item.position.start) + 1;
        const line = item.position.line !== void 0 ? `line ${item.position.line + 1}, ` : "";
        return `${item.key} (${line}${ordinal}/${sameKey.length})`;
      }
    }
    return item.key;
  }
  getItems() {
    return [...this.options, ...this.data];
  }
  async onChooseItem(item, _evt) {
    if (item.content === newYaml) {
      await this.controller.createNewYamlPropertyFluid(this.file, this.suggestValues, this.fileKeys);
      return;
    }
    if (item.content === newDataView) {
      const newProperty = await this.controller.createNewProperty(this.suggestValues);
      if (!newProperty) return null;
      const { propName, propValue } = newProperty;
      await this.controller.appendDataviewField(propName, propValue, this.file);
      return;
    }
    if (_MetaEditSuggester.isYamlParentContainer(item)) return;
    setPendingValueContext({ app: this.app, key: item.key, type: item.type });
    try {
      await this.controller.editMetaElement(item, this.data, this.file);
    } finally {
      setPendingValueContext(null);
    }
  }
  deleteItem(item) {
    return async (evt) => {
      evt.stopPropagation();
      try {
        await this.controller.deleteProperty(item.item, this.file);
      } finally {
        this.close();
      }
    };
  }
  transformProperty(item) {
    return async (evt) => {
      evt.stopPropagation();
      const { item: property } = item;
      if (!_MetaEditSuggester.canStructureEdit(property)) return;
      if (property.type !== 0 /* YAML */ && isReservedFrontmatterKey(property.key)) {
        new import_obsidian4.Notice(`MetaEdit: "${property.key}" is a reserved property name and can't be a YAML property.`);
        this.close();
        return;
      }
      try {
        if (property.type === 0 /* YAML */) {
          await this.toDataview(property);
        } else {
          await this.toYaml(property);
        }
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        new import_obsidian4.Notice(`MetaEdit could not transform '${property.key}': ${reason}. It may have been removed - reopen the note to check.`);
      } finally {
        this.close();
      }
    };
  }
  async toYaml(property) {
    await this.controller.deleteProperty(property, this.file);
    await this.controller.addYamlProp(property.key, property.content, this.file);
  }
  async toDataview(property) {
    await this.controller.deleteProperty(property, this.file);
    await this.controller.appendDataviewField(property.key, property.content, this.file);
  }
  createButton(el, iconName, tooltip, callback) {
    const itemButton = el.createEl("button");
    itemButton.type = "button";
    itemButton.classList.add("clickable-icon", "metaedit-suggester-action-button");
    itemButton.setAttribute("aria-label", tooltip);
    (0, import_obsidian4.setIcon)(itemButton, iconName);
    (0, import_obsidian4.setTooltip)(itemButton, tooltip);
    itemButton.addEventListener("click", callback);
  }
  static canStructureEdit(property) {
    return canStructureEditProperty(property);
  }
  static isYamlParentContainer(property) {
    if (property.type !== 0 /* YAML */ || property.isVirtual) return false;
    return isYamlParentContainerValue(property.content);
  }
  setSuggestValues() {
    const existing = this.fileKeys;
    const names = /* @__PURE__ */ new Set();
    for (const autoProp of this.plugin.settings.AutoProperties.properties) {
      if (!autoProp.name.startsWith("#")) names.add(autoProp.name);
    }
    for (const name of getKnownPropertyNames(this.app)) names.add(name);
    this.suggestValues = [...names].filter((name) => !existing.has(name));
  }
};

// src/parser.ts
var import_obsidian5 = require("obsidian");
var INLINE_FIELD_WRAPPERS = Object.freeze({ "[": "]", "(": ")" });
var FULL_LINE_PREFIX = /^\s*(?:>\s+)*(?:[-*+]\s+|\d+[.)]\s+)?/;
var CODE_FENCE = /^\s{0,3}(`{3,}|~{3,})/;
function matchFenceLine(line) {
  const match = line.match(CODE_FENCE);
  if (!match) return null;
  const run3 = match[1];
  const infoString = line.slice(match[0].length).trim();
  return { char: run3[0], len: run3.length, bare: infoString === "", infoString };
}
function nextFenceState(openFences, line) {
  const fence = matchFenceLine(line);
  if (!fence) return { open: openFences, boundary: null };
  const openFence = openFences[openFences.length - 1];
  if (!openFence) {
    return {
      open: [{ char: fence.char, len: fence.len, readable: fence.infoString.startsWith("ad-") }],
      boundary: "open"
    };
  }
  if (fence.char === openFence.char && fence.len >= openFence.len && fence.bare) {
    return { open: openFences.slice(0, -1), boundary: "close" };
  }
  const canOpenNestedFence = openFence.readable && (fence.char !== openFence.char || fence.len < openFence.len);
  if (canOpenNestedFence) {
    return {
      open: [...openFences, {
        char: fence.char,
        len: fence.len,
        readable: fence.infoString.startsWith("ad-")
      }],
      boundary: "open"
    };
  }
  return { open: openFences, boundary: null };
}
var MetaEditParser = class {
  constructor(app) {
    this.app = app;
  }
  async getTagsForFile(file) {
    const cache = this.app.metadataCache.getFileCache(file);
    if (!cache) return [];
    const tags = cache.tags;
    if (!tags) return [];
    return tags.map((tag2) => ({
      key: tag2.tag,
      content: tag2.tag,
      type: 2 /* Tag */,
      position: { start: tag2.position.start.offset, end: tag2.position.end.offset, line: tag2.position.start.line }
    }));
  }
  async parseFrontmatter(file) {
    const frontmatter = await this.parseFrontmatterObject(file);
    if (!frontmatter) return [];
    return this.objectToYamlProperties(frontmatter);
  }
  parseFrontmatterCache(fileCache) {
    const frontmatter = fileCache?.frontmatter;
    if (!frontmatter) return [];
    return this.objectToYamlProperties(frontmatter, true);
  }
  async parseFrontmatterObject(file) {
    const fileCache = this.app.metadataCache.getFileCache(file);
    const filecontent = await this.app.vault.cachedRead(file);
    const parsedYaml = this.parseFrontmatterContent(filecontent);
    if (this.isFrontmatterObject(parsedYaml)) return parsedYaml;
    const frontmatter = fileCache?.frontmatter;
    if (this.isFrontmatterObject(frontmatter)) return this.omitInternalFrontmatterPosition(frontmatter);
    return null;
  }
  isFrontmatterObject(value) {
    return isPlainYamlObject(value);
  }
  omitInternalFrontmatterPosition(frontmatter) {
    if (!this.isFrontmatterPosition(frontmatter.position)) return frontmatter;
    const cleaned = { ...frontmatter };
    delete cleaned.position;
    return cleaned;
  }
  isFrontmatterPosition(position) {
    if (!position || typeof position !== "object") return false;
    const candidate = position;
    return this.isPosition(candidate.start) && this.isPosition(candidate.end);
  }
  isPosition(position) {
    if (!position || typeof position !== "object") return false;
    const candidate = position;
    return typeof candidate.line === "number" && typeof candidate.col === "number" && typeof candidate.offset === "number";
  }
  objectToYamlProperties(parsedYaml, omitInternalPosition = false) {
    if (!this.isFrontmatterObject(parsedYaml)) return [];
    const rootProperties = [];
    const nestedProperties = [];
    for (const key2 in parsedYaml) {
      const value = parsedYaml[key2];
      if (omitInternalPosition && key2 === "position" && this.isFrontmatterPosition(value)) continue;
      rootProperties.push({ key: key2, content: value, type: 0 /* YAML */ });
      this.collectNestedYamlProperties(value, [key2], nestedProperties);
    }
    return [...rootProperties, ...nestedProperties];
  }
  collectNestedYamlProperties(value, path, properties) {
    if (isYamlScalarLeaf(value)) {
      if (path.length > 1 && typeof path[path.length - 1] !== "number") {
        const rootKey = String(path[0]);
        properties.push({
          key: formatYamlPath(path),
          content: value,
          type: 0 /* YAML */,
          path: [...path],
          rootKey,
          isNested: true,
          isVirtual: true
        });
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, idx) => this.collectNestedYamlProperties(item, [...path, idx], properties));
      return;
    }
    if (isPlainYamlObject(value)) {
      for (const key2 in value) {
        this.collectNestedYamlProperties(value[key2], [...path, key2], properties);
      }
    }
  }
  async parseInlineFields(file) {
    const content = await this.app.vault.cachedRead(file);
    return this.parseInlineContent(content);
  }
  /**
   * Extract inline `key:: value` fields from raw note content.
   *
   * Mirrors Dataview's two-mode model: bracketed fields (`[k:: v]` / `(k:: v)`)
   * take precedence over a single "full-line" field, and a line yields one or
   * the other - never both. Keys are returned clean (without leading list or
   * blockquote markers) so callers can match and round-trip them; the
   * full-line key is otherwise kept verbatim so odd-but-real keys like
   * `progress (%)` survive a read/write cycle.
   */
  parseInlineContent(content) {
    const properties = [];
    for (const line of this.walkInlineContentLines(content)) {
      if (!line.readable) continue;
      if (!line.text.includes("::")) continue;
      for (const field of this.parseLineFields(line.text)) {
        properties.push({ key: field.key, content: field.value, type: 1 /* Dataview */ });
      }
    }
    return properties;
  }
  parseFrontmatterContent(content) {
    const frontmatterInfo = this.getFrontmatterInfo(content);
    if (!frontmatterInfo?.exists) return null;
    try {
      return (0, import_obsidian5.parseYaml)(frontmatterInfo.frontmatter);
    } catch {
      return null;
    }
  }
  getFrontmatterInfo(content) {
    const info = (0, import_obsidian5.getFrontMatterInfo)(content);
    const legacyDotInfo = this.getLegacyDotCloseFrontmatterInfo(content);
    if (legacyDotInfo && (!info.exists || legacyDotInfo.contentStart < info.contentStart))
      return legacyDotInfo;
    if (info.exists) return info;
    return null;
  }
  getLegacyDotCloseFrontmatterInfo(content) {
    const lines = this.splitContentLines(content);
    if (!/^---\s*$/.test(lines[0]?.text ?? "")) return null;
    for (let i = 1; i < lines.length; i++) {
      if (!/^\.\.\.\s*$/.test(lines[i].text)) continue;
      const from = lines[0].nextStart;
      const to = lines[i].start;
      return {
        exists: true,
        frontmatter: content.slice(from, to),
        from,
        to,
        contentStart: lines[i].nextStart
      };
    }
    return null;
  }
  splitContentLines(content) {
    const textLines = content.split(/\r?\n/);
    const lines = [];
    let offset = 0;
    for (let i = 0; i < textLines.length; i++) {
      const text2 = textLines[i];
      const start = offset;
      const end = start + text2.length;
      let nextStart = end;
      if (i < textLines.length - 1) {
        nextStart += content.startsWith("\r\n", end) ? 2 : 1;
      }
      lines.push({ text: text2, start, end, nextStart });
      offset = nextStart;
    }
    return lines;
  }
  *walkInlineContentLines(content) {
    const lines = this.splitContentLines(content);
    const frontmatterInfo = this.getFrontmatterInfo(content);
    let openFences = [];
    for (let index2 = 0; index2 < lines.length; index2++) {
      const line = lines[index2];
      const inFrontmatter = frontmatterInfo?.exists === true && line.start < frontmatterInfo.contentStart;
      if (inFrontmatter) {
        yield { ...line, index: index2, inFrontmatter, fenceBoundary: null, readable: false };
        continue;
      }
      const { open, boundary: boundary2 } = nextFenceState(openFences, line.text);
      openFences = open;
      yield {
        ...line,
        index: index2,
        inFrontmatter: false,
        fenceBoundary: boundary2,
        readable: boundary2 === null && openFences.every((fence) => fence.readable)
      };
    }
  }
  parseLineFields(line) {
    const bracketed = this.extractBracketedFields(line);
    if (bracketed.length > 0) return bracketed;
    const fullLine = this.extractFullLineField(line);
    return fullLine ? [fullLine] : [];
  }
  extractBracketedFields(line) {
    const fields = [];
    for (const open of Object.keys(INLINE_FIELD_WRAPPERS)) {
      let idx = line.indexOf(open);
      while (idx >= 0) {
        const field = this.findBracketedField(line, idx);
        if (!field) {
          idx = line.indexOf(open, idx + 1);
          continue;
        }
        fields.push(field);
        idx = line.indexOf(open, field.end);
      }
    }
    fields.sort((a, b) => a.start - b.start);
    const kept = [];
    for (const field of fields) {
      if (kept.length === 0 || kept[kept.length - 1].end <= field.start) {
        kept.push(field);
      }
    }
    return kept;
  }
  findBracketedField(line, start) {
    const open = line[start];
    const close = INLINE_FIELD_WRAPPERS[open];
    const sep = line.indexOf("::", start + 1);
    if (sep < 0) return null;
    const key2 = line.substring(start + 1, sep).trim();
    if (!key2 || /[[\]()]/.test(key2)) return null;
    const closing = this.findClosingBracket(line, sep + 2, open, close);
    if (!closing) return null;
    return { key: key2, value: closing.value, start, end: closing.end, sepEnd: sep + 2, valueEnd: closing.end - 1 };
  }
  findClosingBracket(line, start, open, close) {
    let nesting = 0;
    for (let i = start; i < line.length; i++) {
      const char = line[i];
      if (char === open) {
        nesting++;
      } else if (char === close) {
        if (nesting === 0) {
          return { value: line.substring(start, i).trim(), end: i + 1 };
        }
        nesting--;
      }
    }
    return null;
  }
  extractFullLineField(line) {
    const lineEnd = line.endsWith("\r") ? line.length - 1 : line.length;
    const prefix = line.match(FULL_LINE_PREFIX)?.[0] ?? "";
    const body = line.slice(prefix.length, lineEnd);
    const sep = body.indexOf("::");
    if (sep < 0) return null;
    const key2 = body.substring(0, sep).trim();
    if (!key2) return null;
    const value = body.substring(sep + 2).trim();
    const sepEnd = prefix.length + sep + 2;
    return { key: key2, value, start: prefix.length, end: lineEnd, sepEnd, valueEnd: lineEnd };
  }
  /**
   * Rewrite the value of every inline field named `key` on a single line,
   * leaving the key, surrounding text, and any `[...]`/`(...)` wrapper intact.
   *
   * This is the write-side counterpart to {@link parseInlineContent}: because
   * it reuses the same field boundaries, a full-line value (which may itself
   * contain `]`/`)`, e.g. `ref:: [[Note]]`) is replaced up to end-of-line and a
   * bracketed value only up to its matching close bracket - so updates no
   * longer append a stray closing bracket. Returns the line unchanged when no
   * field matches.
   */
  replaceInlineFieldValue(line, key2, newValue) {
    const matches = this.parseLineFields(line).filter((field) => field.key === key2);
    if (matches.length === 0) return line;
    let result = line;
    for (let i = matches.length - 1; i >= 0; i--) {
      const field = matches[i];
      result = result.slice(0, field.sepEnd) + " " + newValue + result.slice(field.valueEnd);
    }
    return result;
  }
  /**
   * Rewrite inline field values in raw note content using the same readable-line
   * boundary as {@link parseInlineContent}. Only the changed line spans are
   * replaced; all untouched bytes, including mixed CRLF/LF line endings, are
   * preserved exactly.
   */
  replaceInlineFieldValuesInContent(content, replacements) {
    const activeReplacements = replacements.filter(({ key: key2 }) => key2.length > 0);
    if (activeReplacements.length === 0) return content;
    let result = "";
    let cursor = 0;
    for (const line of this.walkInlineContentLines(content)) {
      if (!line.readable) continue;
      if (!line.text.includes("::")) continue;
      let updatedLine = line.text;
      for (const { key: key2, value } of activeReplacements) {
        updatedLine = this.replaceInlineFieldValue(updatedLine, key2, value);
      }
      if (updatedLine === line.text) continue;
      result += content.slice(cursor, line.start) + updatedLine;
      cursor = line.end;
    }
    if (cursor === 0) return content;
    return result + content.slice(cursor);
  }
  /**
   * Compute the line index at which to splice a new `name:: value` inline field.
   *
   * This is the write-placement counterpart to {@link parseInlineContent}: it walks
   * the content with the SAME frontmatter, fenced-code, and inline-field detection so
   * the insertion point is always consistent with what MetaEdit reads as a field. The
   * returned index is into `content.split(/\r?\n/)` (the same split
   * {@link splitContentLines} performs), so a caller can splice directly.
   *
   * Guarantees: the index is never inside YAML frontmatter or an ordinary fenced
   * code block. Admonition `ad-*` fences remain valid metadata regions.
   * - "afterLastMatch": just after the last body line that declares `name` (full-line
   *   or bracketed), falling back to "end" when there is no such field.
   * - "end": just after the last body content line or trailing closing code fence.
   * When the note has no body content (empty or frontmatter-only), the field is placed
   * at the start of the body, or at the very end when the whole file is frontmatter.
   */
  computeInlineInsertIndex(content, name, location = "afterLastMatch") {
    let lastMatchIdx = -1;
    let lastAnchorIdx = -1;
    let firstBodyIdx = -1;
    let lineCount = 0;
    for (const line of this.walkInlineContentLines(content)) {
      lineCount = line.index + 1;
      if (line.inFrontmatter) continue;
      if (firstBodyIdx === -1) firstBodyIdx = line.index;
      if (line.fenceBoundary === "open") continue;
      if (line.fenceBoundary === "close") {
        lastAnchorIdx = line.index;
        continue;
      }
      if (!line.readable) continue;
      if (line.text.trim() !== "") lastAnchorIdx = line.index;
      if (line.text.includes("::") && this.parseLineFields(line.text).some((field) => field.key === name)) {
        lastMatchIdx = line.index;
      }
    }
    if (location === "afterLastMatch" && lastMatchIdx !== -1) return lastMatchIdx + 1;
    if (lastAnchorIdx !== -1) return lastAnchorIdx + 1;
    return firstBodyIdx !== -1 ? firstBodyIdx : lineCount;
  }
};

// src/Modals/GenericPrompt/GenericPrompt.ts
var import_obsidian7 = require("obsidian");

// src/Modals/GenericPrompt/genericTextSuggester.ts
var import_obsidian6 = require("obsidian");
var GenericTextSuggester = class extends import_obsidian6.AbstractInputSuggest {
  constructor(app, inputEl, items) {
    super(app, inputEl);
    this.inputEl = inputEl;
    this.items = items;
    this.onSelect((item) => this.acceptSuggestion(item));
  }
  getSuggestions(inputStr) {
    return filterSuggestions(this.items, inputStr);
  }
  acceptSuggestion(item) {
    this.setValue(item);
    this.inputEl.trigger("input");
    this.close();
  }
  renderSuggestion(value, el) {
    if (value)
      el.setText(value);
  }
  refreshSuggestions() {
    this.inputEl.trigger("input");
  }
};

// src/Modals/GenericPrompt/GenericPromptContent.svelte
var root5 = from_html(`<input class="metaEditPromptInput metadata-input metadata-input-text mod-date" style="width: 100%;" type="date"/>`);
var root_15 = from_html(`<input class="metaEditPromptInput metadata-input metadata-input-text mod-datetime" style="width: 100%;" type="datetime-local"/>`);
var root_23 = from_html(`<input class="metaEditPromptInput" style="width: 100%;" type="text"/>`);
var root_32 = from_html(`<div class="metaEditPrompt"><h1 style="text-align: center"> </h1> <!></div>`);
function GenericPromptContent($$anchor, $$props) {
  push($$props, true);
  let header = prop($$props, "header", 3, ""), placeholder = prop($$props, "placeholder", 3, ""), propValue = prop($$props, "value", 3, ""), suggestValues = prop($$props, "suggestValues", 19, () => []);
  const initialApp = untrack(() => $$props.app);
  const initialSuggestValues = untrack(() => suggestValues());
  const initialValue = untrack(() => propValue());
  let value = state(proxy(initialValue));
  let suggester;
  let inputEl = state(void 0);
  const context = consumePendingValueContext();
  const hasExplicitSuggestions = Array.isArray(initialSuggestValues) && initialSuggestValues.length > 0;
  const dateInputType = !hasExplicitSuggestions && context ? getDateInputType(context.app, context.key, initialValue, context.type) : null;
  const datetimeStep = dateInputType === "datetime" && /T\d{2}:\d{2}:\d{2}/.test(initialValue) ? "1" : void 0;
  let didInitialise = false;
  user_effect(() => {
    const el = get2(inputEl);
    if (!el || didInitialise) return;
    didInitialise = true;
    let suggestions = [];
    if (!dateInputType) {
      suggestions = hasExplicitSuggestions ? initialSuggestValues : context ? getValueSuggestions(context.app, context.key, context.type, context.tagMode) : [];
    }
    el.focus();
    if (!dateInputType) el.select();
    if (!dateInputType && suggestions.length > 0) {
      suggester = new GenericTextSuggester(initialApp, el, suggestions);
    }
    if (suggester && !initialValue) suggester.refreshSuggestions();
    return () => {
      suggester?.close();
      suggester = void 0;
    };
  });
  function submit(evt) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      $$props.onSubmit(get2(value));
    }
  }
  var div = root_32();
  var h1 = child(div);
  var text2 = child(h1, true);
  reset(h1);
  var node = sibling(h1, 2);
  {
    var consequent = ($$anchor2) => {
      var input = root5();
      remove_input_defaults(input);
      bind_this(input, ($$value) => set(inputEl, $$value), () => get2(inputEl));
      delegated("keydown", input, submit);
      bind_value(input, () => get2(value), ($$value) => set(value, $$value));
      append($$anchor2, input);
    };
    var consequent_1 = ($$anchor2) => {
      var input_1 = root_15();
      remove_input_defaults(input_1);
      bind_this(input_1, ($$value) => set(inputEl, $$value), () => get2(inputEl));
      template_effect(() => set_attribute2(input_1, "step", datetimeStep));
      delegated("keydown", input_1, submit);
      bind_value(input_1, () => get2(value), ($$value) => set(value, $$value));
      append($$anchor2, input_1);
    };
    var alternate = ($$anchor2) => {
      var input_2 = root_23();
      remove_input_defaults(input_2);
      bind_this(input_2, ($$value) => set(inputEl, $$value), () => get2(inputEl));
      template_effect(() => set_attribute2(input_2, "placeholder", placeholder()));
      delegated("keydown", input_2, submit);
      bind_value(input_2, () => get2(value), ($$value) => set(value, $$value));
      append($$anchor2, input_2);
    };
    if_block(node, ($$render) => {
      if (dateInputType === "date") $$render(consequent);
      else if (dateInputType === "datetime") $$render(consequent_1, 1);
      else $$render(alternate, -1);
    });
  }
  reset(div);
  template_effect(() => set_text(text2, header()));
  append($$anchor, div);
  pop();
}
delegate(["keydown"]);

// src/Modals/GenericPrompt/GenericPrompt.ts
var GenericPrompt = class _GenericPrompt extends import_obsidian7.Modal {
  constructor(app, header, placeholder, value, suggestValues) {
    super(app);
    this.didSubmit = false;
    this.modalContent = mountSvelteComponent(
      GenericPromptContent,
      this.contentEl,
      {
        app,
        header,
        placeholder,
        value,
        suggestValues,
        onSubmit: (input) => {
          this.input = input;
          this.didSubmit = true;
          this.close();
        }
      }
    );
    this.waitForClose = new Promise(
      (resolve) => {
        this.resolvePromise = resolve;
      }
    );
    this.open();
  }
  static Prompt(app, header, placeholder, value, suggestValues) {
    const newPromptModal = new _GenericPrompt(app, header, placeholder, value, suggestValues);
    return newPromptModal.waitForClose;
  }
  onOpen() {
    super.onOpen();
    const modalPrompt = activeDocument.querySelector(".metaEditPrompt");
    const modalInput = modalPrompt?.querySelector(".metaEditPromptInput");
    modalInput?.focus();
    if (modalInput?.type === "text") modalInput.select();
  }
  onClose() {
    super.onClose();
    unmountSvelteComponent(this.modalContent);
    if (!this.didSubmit) this.resolvePromise(null);
    else this.resolvePromise(this.input);
  }
};

// src/Modals/GenericSuggester/GenericSuggester.ts
var import_obsidian8 = require("obsidian");
var GenericSuggester = class _GenericSuggester extends import_obsidian8.FuzzySuggestModal {
  constructor(app, displayItems, items) {
    super(app);
    this.displayItems = displayItems;
    this.items = items;
    this.didChoose = false;
    this.promise = new Promise(
      (resolve) => this.resolvePromise = resolve
    );
    this.open();
  }
  static Suggest(app, displayItems, items) {
    const newSuggester = new _GenericSuggester(app, displayItems, items);
    return newSuggester.promise;
  }
  getItemText(item) {
    return this.displayItems[this.items.indexOf(item)];
  }
  getItems() {
    return this.items;
  }
  onChooseItem(item, _evt) {
    this.didChoose = true;
    this.resolvePromise(item);
  }
  onClose() {
    super.onClose();
    queueMicrotask(() => {
      if (!this.didChoose) this.resolvePromise("");
    });
  }
};

// src/metaController.ts
var import_obsidian16 = require("obsidian");

// src/Modals/AutoPropertyValueModal/AutoPropertyValueModal.ts
var import_obsidian10 = require("obsidian");

// src/Modals/AutoPropertyValueModal/AutoPropertyValueModalContent.svelte
var import_obsidian9 = require("obsidian");
var root6 = from_html(`<div class="metaedit-ap-prompt-desc svelte-rukrzs"> </div>`);
var root_16 = from_html(`<span class="metaedit-ap-prompt-tag svelte-rukrzs">new</span>`);
var root_24 = from_html(`<label class="metaedit-ap-prompt-row metaedit-ap-prompt-check svelte-rukrzs"><input type="checkbox" class="svelte-rukrzs"/> <span class="metaedit-ap-prompt-row-label svelte-rukrzs"> </span> <!></label>`);
var root_33 = from_html(`<div class="metaedit-ap-prompt-empty svelte-rukrzs">No values yet - type one above and press Enter.</div>`);
var root_42 = from_html(`<label class="metaedit-ap-prompt-savenew svelte-rukrzs"><input type="checkbox"/> Also add new values to this property's choice list</label>`);
var root_5 = from_html(`<input class="metaedit-ap-prompt-input svelte-rukrzs" type="text" placeholder="Type a value and press Enter to add it"/> <div class="metaedit-ap-prompt-list svelte-rukrzs" role="listbox" aria-multiselectable="true"></div> <!> <div class="metaedit-ap-prompt-actions svelte-rukrzs"><button class="mod-cta">Confirm</button></div>`, 1);
var root_6 = from_html(`<span class="metaedit-ap-prompt-row-icon svelte-rukrzs"></span>`);
var root_7 = from_html(`<button><!> <span class="metaedit-ap-prompt-row-label svelte-rukrzs"> </span></button>`);
var root_8 = from_html(`<div class="metaedit-ap-prompt-empty svelte-rukrzs">No choices defined - type a value and press Enter.</div>`);
var root_9 = from_html(`<input class="metaedit-ap-prompt-input svelte-rukrzs" type="text" placeholder="Pick a value, or type a new one"/> <div class="metaedit-ap-prompt-list svelte-rukrzs" role="listbox"></div>`, 1);
var root_10 = from_html(`<div class="metaedit-ap-prompt svelte-rukrzs"><div class="metaedit-ap-prompt-head svelte-rukrzs"><div class="metaedit-ap-prompt-title svelte-rukrzs"> </div> <!></div> <!></div>`);
var $$css5 = {
  hash: "svelte-rukrzs",
  code: ".metaedit-ap-prompt.svelte-rukrzs {display:flex;flex-direction:column;gap:0.6rem;}.metaedit-ap-prompt-head.svelte-rukrzs {display:flex;flex-direction:column;gap:0.15rem;}.metaedit-ap-prompt-title.svelte-rukrzs {font-size:var(--font-ui-large, 1.1em);font-weight:var(--font-semibold, 600);color:var(--text-normal);}.metaedit-ap-prompt-desc.svelte-rukrzs {color:var(--text-muted);font-size:var(--font-ui-small, 0.85em);line-height:1.4;}.metaedit-ap-prompt-input.svelte-rukrzs {width:100%;}.metaedit-ap-prompt-list.svelte-rukrzs {display:flex;flex-direction:column;gap:2px;max-height:16rem;overflow-y:auto;}.metaedit-ap-prompt-row.svelte-rukrzs {display:flex;align-items:center;gap:0.5rem;width:100%;text-align:left;padding:0.4rem 0.55rem;border-radius:var(--radius-s, 4px);background:transparent;box-shadow:none;color:var(--text-normal);cursor:pointer;font-size:var(--font-ui-medium, 1em);}.metaedit-ap-prompt-row.is-selected.svelte-rukrzs {background-color:var(--background-modifier-hover);}.metaedit-ap-prompt-action.svelte-rukrzs {color:var(--text-muted);}.metaedit-ap-prompt-check.svelte-rukrzs {cursor:pointer;}.metaedit-ap-prompt-check.svelte-rukrzs input:where(.svelte-rukrzs) {margin:0;}.metaedit-ap-prompt-row-icon.svelte-rukrzs {display:inline-flex;align-items:center;}.metaedit-ap-prompt-row-label.svelte-rukrzs {flex:1 1 auto;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}.metaedit-ap-prompt-tag.svelte-rukrzs {flex:0 0 auto;font-size:var(--font-ui-smaller, 0.75em);color:var(--text-accent);border:1px solid var(--background-modifier-border);border-radius:var(--radius-s, 4px);padding:0 0.3rem;}.metaedit-ap-prompt-empty.svelte-rukrzs {color:var(--text-muted);padding:0.4rem 0.55rem;font-size:var(--font-ui-small, 0.85em);}.metaedit-ap-prompt-savenew.svelte-rukrzs {display:flex;align-items:center;gap:0.45rem;color:var(--text-muted);font-size:var(--font-ui-small, 0.85em);cursor:pointer;}.metaedit-ap-prompt-actions.svelte-rukrzs {display:flex;justify-content:flex-end;}"
};
function AutoPropertyValueModalContent($$anchor, $$props) {
  push($$props, true);
  append_styles($$anchor, $$css5);
  let isMulti = prop($$props, "isMulti", 3, false), currentValue = prop($$props, "currentValue", 3, null);
  const initialAutoProperty = untrack(() => $$props.autoProperty);
  const initialIsMulti = untrack(() => isMulti());
  const initialCurrentValue = untrack(() => currentValue());
  const choices = normalizeChoices(initialAutoProperty.choices);
  let inputEl = state(void 0);
  let query = state("");
  let highlight = state(0);
  function icon(node, name) {
    node.textContent = "";
    (0, import_obsidian9.setIcon)(node, name);
    return {};
  }
  let trimmedQuery = user_derived(() => get2(query).trim());
  let filtered = user_derived(() => choices.filter((c) => c.toLowerCase().includes(get2(trimmedQuery).toLowerCase())));
  let exactMatch = user_derived(() => choices.some((c) => c.toLowerCase() === get2(trimmedQuery).toLowerCase()));
  let singleItems = user_derived(() => buildSingleItems(get2(filtered), get2(trimmedQuery), get2(exactMatch)));
  user_effect(() => {
    const maxHighlight = Math.max(0, get2(singleItems).length - 1);
    if (get2(highlight) > maxHighlight) set(highlight, maxHighlight, true);
  });
  function buildSingleItems(matches, q, exact) {
    const items = matches.map((c) => ({ kind: "choice", value: c, label: c }));
    if (q !== "" && !exact) {
      items.push({ kind: "use", value: q, label: `Use "${q}"` });
      items.push({ kind: "save", value: q, label: `Save "${q}" as a choice` });
    }
    return items;
  }
  async function persistChoices(values) {
    try {
      await $$props.onSaveChoices(values);
    } catch (e) {
      console.error("MetaEdit: failed to save new auto property choice", e);
    }
  }
  async function chooseSingle(item) {
    if (!item) return;
    if (item.kind === "save") {
      await persistChoices([item.value]);
    }
    $$props.onSubmit(item.value);
  }
  function onSingleKeydown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      set(highlight, Math.min(get2(highlight) + 1, get2(singleItems).length - 1), true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      set(highlight, Math.max(get2(highlight) - 1, 0), true);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (get2(singleItems).length > 0) chooseSingle(get2(singleItems)[get2(highlight)]);
      else if (get2(trimmedQuery) !== "") $$props.onSubmit(get2(trimmedQuery));
    }
  }
  let options = state(proxy(untrack(() => initialIsMulti ? multiSelectOptions(initialAutoProperty, initialCurrentValue) : [])));
  let checkedValues = state(proxy(untrack(() => toValueArray(initialCurrentValue))));
  let saveNew = state(false);
  let newCheckedValues = user_derived(() => get2(options).filter((o) => get2(checkedValues).includes(o) && !choices.includes(o)));
  function toggleCheck(value) {
    set(
      checkedValues,
      get2(checkedValues).includes(value) ? get2(checkedValues).filter((checkedValue) => checkedValue !== value) : [...get2(checkedValues), value],
      true
    );
  }
  function addMultiValue() {
    const value = get2(query).trim();
    if (value === "") return;
    if (!get2(options).includes(value)) set(options, [...get2(options), value], true);
    if (!get2(checkedValues).includes(value)) set(checkedValues, [...get2(checkedValues), value], true);
    set(query, "");
  }
  function onMultiAddKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addMultiValue();
    }
  }
  async function confirmMulti() {
    const result = get2(options).filter((o) => get2(checkedValues).includes(o));
    if (get2(saveNew) && get2(newCheckedValues).length > 0) {
      await persistChoices(get2(newCheckedValues));
    }
    $$props.onSubmit(result);
  }
  let didFocus = false;
  user_effect(() => {
    const el = get2(inputEl);
    if (!el || didFocus) return;
    didFocus = true;
    el.focus();
  });
  var div = root_10();
  var div_1 = child(div);
  var div_2 = child(div_1);
  var text2 = child(div_2, true);
  reset(div_2);
  var node_1 = sibling(div_2, 2);
  {
    var consequent = ($$anchor2) => {
      var div_3 = root6();
      var text_1 = child(div_3, true);
      reset(div_3);
      template_effect(() => set_text(text_1, initialAutoProperty.description));
      append($$anchor2, div_3);
    };
    if_block(node_1, ($$render) => {
      if (initialAutoProperty.description) $$render(consequent);
    });
  }
  reset(div_1);
  var node_2 = sibling(div_1, 2);
  {
    var consequent_3 = ($$anchor2) => {
      var fragment = root_5();
      var input = first_child(fragment);
      remove_input_defaults(input);
      bind_this(input, ($$value) => set(inputEl, $$value), () => get2(inputEl));
      var div_4 = sibling(input, 2);
      each(
        div_4,
        20,
        () => get2(options),
        (option) => option,
        ($$anchor3, option) => {
          var label = root_24();
          var input_1 = child(label);
          remove_input_defaults(input_1);
          var span = sibling(input_1, 2);
          var text_2 = child(span, true);
          reset(span);
          var node_3 = sibling(span, 2);
          {
            var consequent_1 = ($$anchor4) => {
              var span_1 = root_16();
              append($$anchor4, span_1);
            };
            var d = user_derived(() => !choices.includes(option));
            if_block(node_3, ($$render) => {
              if (get2(d)) $$render(consequent_1);
            });
          }
          reset(label);
          template_effect(
            ($0) => {
              set_checked(input_1, $0);
              set_text(text_2, option);
            },
            [() => get2(checkedValues).includes(option)]
          );
          delegated("change", input_1, () => toggleCheck(option));
          append($$anchor3, label);
        },
        ($$anchor3) => {
          var div_5 = root_33();
          append($$anchor3, div_5);
        }
      );
      reset(div_4);
      var node_4 = sibling(div_4, 2);
      {
        var consequent_2 = ($$anchor3) => {
          var label_1 = root_42();
          var input_2 = child(label_1);
          remove_input_defaults(input_2);
          next();
          reset(label_1);
          bind_checked(input_2, () => get2(saveNew), ($$value) => set(saveNew, $$value));
          append($$anchor3, label_1);
        };
        if_block(node_4, ($$render) => {
          if (get2(newCheckedValues).length > 0) $$render(consequent_2);
        });
      }
      var div_6 = sibling(node_4, 2);
      var button = child(div_6);
      reset(div_6);
      delegated("keydown", input, onMultiAddKeydown);
      bind_value(input, () => get2(query), ($$value) => set(query, $$value));
      delegated("click", button, confirmMulti);
      append($$anchor2, fragment);
    };
    var alternate = ($$anchor2) => {
      var fragment_1 = root_9();
      var input_3 = first_child(fragment_1);
      remove_input_defaults(input_3);
      bind_this(input_3, ($$value) => set(inputEl, $$value), () => get2(inputEl));
      var div_7 = sibling(input_3, 2);
      each(
        div_7,
        23,
        () => get2(singleItems),
        (item) => item.kind + item.value,
        ($$anchor3, item, i) => {
          var button_1 = root_7();
          let classes;
          var node_5 = child(button_1);
          {
            var consequent_4 = ($$anchor4) => {
              var span_2 = root_6();
              action(span_2, ($$node, $$action_arg) => icon?.($$node, $$action_arg), () => "plus");
              append($$anchor4, span_2);
            };
            var consequent_5 = ($$anchor4) => {
              var span_3 = root_6();
              action(span_3, ($$node, $$action_arg) => icon?.($$node, $$action_arg), () => "corner-down-left");
              append($$anchor4, span_3);
            };
            if_block(node_5, ($$render) => {
              if (get2(item).kind === "save") $$render(consequent_4);
              else if (get2(item).kind === "use") $$render(consequent_5, 1);
            });
          }
          var span_4 = sibling(node_5, 2);
          var text_3 = child(span_4, true);
          reset(span_4);
          reset(button_1);
          template_effect(() => {
            classes = set_class(button_1, 1, "metaedit-ap-prompt-row svelte-rukrzs", null, classes, {
              "is-selected": get2(i) === get2(highlight),
              "metaedit-ap-prompt-action": get2(item).kind !== "choice"
            });
            set_text(text_3, get2(item).label);
          });
          delegated("click", button_1, () => chooseSingle(get2(item)));
          event("mouseenter", button_1, () => set(highlight, get2(i), true));
          append($$anchor3, button_1);
        },
        ($$anchor3) => {
          var div_8 = root_8();
          append($$anchor3, div_8);
        }
      );
      reset(div_7);
      delegated("keydown", input_3, onSingleKeydown);
      bind_value(input_3, () => get2(query), ($$value) => set(query, $$value));
      append($$anchor2, fragment_1);
    };
    if_block(node_2, ($$render) => {
      if (initialIsMulti) $$render(consequent_3);
      else $$render(alternate, -1);
    });
  }
  reset(div);
  template_effect(() => set_text(text2, initialAutoProperty.name));
  append($$anchor, div);
  pop();
}
delegate(["keydown", "change", "click"]);

// src/Modals/AutoPropertyValueModal/AutoPropertyValueModal.ts
var AutoPropertyValueModal = class _AutoPropertyValueModal extends import_obsidian10.Modal {
  constructor(app, autoProperty, options) {
    super(app);
    this.result = null;
    this.didSubmit = false;
    this.waitForClose = new Promise((resolve) => this.resolvePromise = resolve);
    this.content = mountSvelteComponent(
      AutoPropertyValueModalContent,
      this.contentEl,
      {
        autoProperty,
        isMulti: options.isMulti,
        currentValue: options.currentValue ?? null,
        onSaveChoices: options.onSaveChoices,
        onSubmit: (value) => {
          this.result = value;
          this.didSubmit = true;
          this.close();
        }
      }
    );
    this.open();
  }
  static Show(app, autoProperty, options) {
    return new _AutoPropertyValueModal(app, autoProperty, options).waitForClose;
  }
  onClose() {
    super.onClose();
    unmountSvelteComponent(this.content);
    this.resolvePromise(this.didSubmit ? this.result : null);
  }
};

// src/tagEditing.ts
function stripHash(tag2) {
  return tag2.replace(/^#+/, "");
}
function isNestedTag(tag2) {
  return stripHash(tag2).includes("/");
}
function tagLeaf(tag2) {
  const body = stripHash(tag2);
  return body.split("/").pop() ?? "";
}
function tagParent(tag2) {
  const segments = stripHash(tag2).split("/");
  segments.pop();
  return `#${segments.join("/")}`;
}
function computeTagRewrite(oldTag, input, mode) {
  const value = input.trim();
  if (mode === "tracker") {
    return value === "" ? "" : `${oldTag}:${value}`;
  }
  const normalized = stripHash(value);
  if (normalized === "") return "";
  if (mode === "leaf") {
    return `${tagParent(oldTag)}/${normalized}`;
  }
  return `#${normalized}`;
}
var TRACKER_VALUE = "[A-Za-z0-9._+-]+";
function isTrackerToken(token) {
  return new RegExp(`^#[^\\s:]+:${TRACKER_VALUE}$`).test(token);
}
function normalizeTagToken(value) {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  return `#${trimmed.replace(/^#+/, "")}`;
}
function isValidTagToken(token) {
  if (!token.startsWith("#")) return false;
  const tracker = token.match(new RegExp(`^(#.+?):${TRACKER_VALUE}$`, "u"));
  const body = (tracker ? tracker[1] : token).slice(1);
  if (!/^[\p{L}\p{N}_/-]+$/u.test(body)) return false;
  return /[^\d/]/u.test(body);
}
function spliceTag(content, position, expectedTag, newToken) {
  if (!position) return null;
  const { start, end } = position;
  if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
  if (start < 0 || end > content.length || start >= end) return null;
  if (content.slice(start, end) !== expectedTag) return null;
  let cutEnd = end;
  if (isTrackerToken(newToken)) {
    const existingSuffix = content.slice(end).match(new RegExp(`^:${TRACKER_VALUE}`));
    if (existingSuffix) cutEnd = end + existingSuffix[0].length;
  }
  return content.slice(0, start) + newToken + content.slice(cutEnd);
}
var TAG_FRONTMATTER_KEYS = /* @__PURE__ */ new Set(["tags", "tag"]);
function isTagsKey(key2) {
  return !!key2 && TAG_FRONTMATTER_KEYS.has(key2.toLowerCase());
}
function canonicalizeFrontmatterTag(value) {
  return stripHash(value.trim()).trim();
}
function splitFrontmatterTags(content) {
  const items = Array.isArray(content) ? content : [content];
  const out = [];
  for (const item of items) {
    if (item === null || item === void 0 || typeof item === "object") continue;
    for (const token of String(item).split(/[\s,]+/)) {
      const tag2 = canonicalizeFrontmatterTag(token);
      if (tag2) out.push(tag2);
    }
  }
  return out;
}

// src/multiValue.ts
function isMultiValueYamlProperty(property) {
  return property.type === 0 /* YAML */ && Array.isArray(property.content);
}
function shouldUseMultiValueEditor(property, editMode) {
  if (isMultiValueYamlProperty(property)) return true;
  if (property.type === 0 /* YAML */ && isTagsKey(property.key)) return true;
  if (editMode.mode === "All Multi" /* AllMulti */) return true;
  if (editMode.mode === "Some Multi" /* SomeMulti */ && !!property.key && editMode.properties.includes(property.key)) {
    return true;
  }
  return false;
}
function applyMultiValueEdit(base, edit) {
  switch (edit.kind) {
    case "addFirst":
      return [edit.value];
    case "prepend":
      return [edit.value, ...base];
    case "append":
      return [...base, edit.value];
    case "replace": {
      if (edit.index < 0 || edit.index >= base.length) return [edit.value];
      const next2 = [...base];
      next2[edit.index] = edit.value;
      return next2;
    }
  }
}

// src/Modals/NativePropertyPrompt/NativePropertyPrompt.ts
var import_obsidian14 = require("obsidian");

// src/typedProperties/nativePropertyTypes.ts
var STANDARD_NATIVE_PROPERTY_TYPES = [
  "text",
  "multitext",
  "number",
  "checkbox",
  "date",
  "datetime",
  "tags",
  "aliases",
  "cssclasses"
];
var NATIVE_TYPE_CHOICES = [
  { type: "text", label: "Text" },
  { type: "multitext", label: "List" },
  { type: "number", label: "Number" },
  { type: "checkbox", label: "Checkbox" },
  { type: "date", label: "Date" },
  { type: "datetime", label: "Date & time" }
];
var LOCKED_NATIVE_TYPES = /* @__PURE__ */ new Set(["tags", "aliases", "cssclasses"]);
var STANDARD_TYPE_SET = new Set(STANDARD_NATIVE_PROPERTY_TYPES);
var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
var DATETIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;
function isNativeEditableYamlProperty(property) {
  return property.type === 0 /* YAML */ && !property.path && !property.isNested && !property.isVirtual && !isYamlParentContainerValue(property.content);
}
function resolveNativeProperty(app, property) {
  const manager = getMetadataTypeManager2(app);
  const widgets = manager?.registeredTypeWidgets;
  if (!widgets) {
    return {
      kind: "fallback",
      reason: "Obsidian native property widgets are not available.",
      type: "text"
    };
  }
  const type = resolveNativePropertyType(manager, widgets, property.key, property.content);
  const widget = widgets[type];
  if (!widget || typeof widget.render !== "function") {
    return {
      kind: "fallback",
      reason: `Obsidian's native ${type} property widget is not available.`,
      type: "text"
    };
  }
  return { kind: "native", type, widget };
}
function canAssignVaultPropertyType(app) {
  return typeof getMetadataTypeManager2(app)?.setType === "function";
}
async function assignVaultPropertyType(app, key2, type) {
  const manager = getMetadataTypeManager2(app);
  if (!manager || typeof manager.setType !== "function") return false;
  try {
    await manager.setType(key2, type);
    return true;
  } catch {
    return false;
  }
}
function getNativeWidgetForType(app, type) {
  const widget = getMetadataTypeManager2(app)?.registeredTypeWidgets?.[type];
  return widget && typeof widget.render === "function" ? widget : null;
}
function normalizeWidgetValue(type, value, valueSource) {
  if (valueSource === "fallback") {
    return { ok: true, value: value === null || value === void 0 ? "" : String(value) };
  }
  switch (type) {
    case "text":
      if (typeof value === "string" || value === null) return { ok: true, value };
      return invalidType(type, "a string or null");
    case "multitext":
    case "tags":
    case "aliases":
    case "cssclasses":
      if (typeof value === "string") return { ok: true, value };
      if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
        return { ok: true, value };
      }
      return invalidType(type, "a string or string array");
    case "number":
      if (value === null) return { ok: true, value };
      if (typeof value === "number" && Number.isFinite(value)) return { ok: true, value };
      return invalidType(type, "a finite number or null");
    case "checkbox":
      if (typeof value === "boolean") return { ok: true, value };
      return invalidType(type, "a boolean");
    case "date":
      if (value === null || value === "") return { ok: true, value };
      if (typeof value === "string" && DATE_RE.test(value)) return { ok: true, value };
      return invalidType(type, "an ISO date string, empty string, or null");
    case "datetime":
      if (value === null || value === "") return { ok: true, value };
      if (typeof value === "string" && DATETIME_RE.test(value)) return { ok: true, value };
      return invalidType(type, "an ISO datetime string, empty string, or null");
  }
}
function resolveCreationType(app, key2) {
  const manager = getMetadataTypeManager2(app);
  const widgets = manager?.registeredTypeWidgets;
  if (!manager || !widgets) return "text";
  const normalizedKey = key2.toLowerCase();
  if (isTagsKey(normalizedKey)) return "tags";
  if (normalizedKey === "aliases") return "aliases";
  if (normalizedKey === "cssclasses" && widgets.cssclasses) return "cssclasses";
  const assigned = toStandardType(manager.getAssignedWidget?.(key2), widgets);
  if (assigned) return assigned;
  const propertyInfoType = toStandardType(readPropertyInfoWidget(manager, key2), widgets);
  if (propertyInfoType) return propertyInfoType;
  const expectedType = toStandardType(readTypeInfoExpected(manager, key2, void 0), widgets);
  if (expectedType) return expectedType;
  return "text";
}
function emptyValueForType(type) {
  switch (type) {
    case "number":
      return null;
    case "checkbox":
      return false;
    case "multitext":
    case "tags":
    case "aliases":
    case "cssclasses":
      return [];
    case "text":
    case "date":
    case "datetime":
      return "";
  }
}
function inferCreationTypeFromText(rawText, currentType) {
  if (currentType !== "text") return null;
  const inferred = inferTypeFromText(rawText.trim());
  return inferred && inferred !== currentType ? inferred : null;
}
function seedFromRawText(rawText, nextType) {
  const trimmed = rawText.trim();
  switch (nextType) {
    case "text":
      return rawText;
    case "multitext":
    case "tags":
    case "aliases":
    case "cssclasses":
      return trimmed === "" ? [] : [trimmed];
    case "number":
      return isFiniteNumericString(trimmed) ? Number(trimmed) : null;
    case "checkbox":
      return trimmed === "true" ? true : false;
    case "date":
      return isValidIsoDate(trimmed) ? trimmed : "";
    case "datetime":
      return isValidIsoDatetime(trimmed) ? trimmed : "";
  }
}
function frontmatterValuesEqual(left, right) {
  if (left instanceof Date && right instanceof Date) return left.getTime() === right.getTime();
  if (left instanceof Date || right instanceof Date) return compareDateWithPrimitive(left, right);
  if (Array.isArray(left) || Array.isArray(right)) return arraysEqual(left, right);
  if (isPlainYamlObject(left) || isPlainYamlObject(right)) return objectsEqual(left, right);
  return Object.is(left, right);
}
function resolveNativePropertyType(manager, widgets, key2, value) {
  const normalizedKey = key2.toLowerCase();
  if (isTagsKey(normalizedKey)) return "tags";
  if (normalizedKey === "aliases") return "aliases";
  if (normalizedKey === "cssclasses" && widgets.cssclasses) return "cssclasses";
  const assigned = toStandardType(manager.getAssignedWidget?.(key2), widgets);
  if (assigned) return assigned;
  const propertyInfoWidget = readPropertyInfoWidget(manager, key2);
  const propertyInfoType = toStandardType(propertyInfoWidget, widgets);
  if (propertyInfoType) return propertyInfoType;
  const expected = readTypeInfoExpected(manager, key2, value);
  const expectedType = toStandardType(expected, widgets);
  if (expectedType) return expectedType;
  return inferTypeFromValue(value);
}
function readPropertyInfoWidget(manager, key2) {
  try {
    const all = manager.getAllProperties?.();
    return all?.[key2]?.widget ?? all?.[key2.toLowerCase()]?.widget;
  } catch {
    return null;
  }
}
function readTypeInfoExpected(manager, key2, value) {
  try {
    return manager.getTypeInfo?.(key2, value)?.expected?.type ?? manager.getTypeInfo?.(key2)?.expected?.type;
  } catch {
    return null;
  }
}
function toStandardType(value, widgets) {
  if (typeof value !== "string") return null;
  if (!STANDARD_TYPE_SET.has(value)) return null;
  if (value === "cssclasses" && !widgets.cssclasses) return null;
  return value;
}
function inferTypeFromValue(value) {
  if (Array.isArray(value)) return "multitext";
  if (typeof value === "boolean") return "checkbox";
  if (typeof value === "number" && Number.isFinite(value)) return "number";
  if (value instanceof Date) return hasDateTime(value) ? "datetime" : "date";
  if (typeof value === "string") {
    if (DATETIME_RE.test(value)) return "datetime";
    if (DATE_RE.test(value)) return "date";
  }
  return "text";
}
function hasDateTime(value) {
  return value.getUTCHours() !== 0 || value.getUTCMinutes() !== 0 || value.getUTCSeconds() !== 0 || value.getUTCMilliseconds() !== 0;
}
var NUMERIC_RE = /^-?(?:\d+\.?\d*|\.\d+)$/;
function isFiniteNumericString(text2) {
  if (!NUMERIC_RE.test(text2)) return false;
  return Number.isFinite(Number(text2));
}
function isValidIsoDate(value) {
  if (!DATE_RE.test(value)) return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
function isValidIsoDatetime(value) {
  if (!DATETIME_RE.test(value)) return false;
  if (!isValidIsoDate(value.slice(0, 10))) return false;
  const hour = Number(value.slice(11, 13));
  const minute = Number(value.slice(14, 16));
  const second = value.length > 16 ? Number(value.slice(17, 19)) : 0;
  return hour <= 23 && minute <= 59 && second <= 59;
}
function inferTypeFromText(text2) {
  if (text2 === "") return null;
  if (isValidIsoDatetime(text2)) return "datetime";
  if (isValidIsoDate(text2)) return "date";
  if (text2 === "true" || text2 === "false") return "checkbox";
  if (/^0\d/.test(text2)) return null;
  if (isFiniteNumericString(text2)) return "number";
  return null;
}
function invalidType(type, expected) {
  return {
    ok: false,
    reason: `Obsidian's native ${type} editor returned an unsupported value shape; expected ${expected}.`
  };
}
function arraysEqual(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right)) return false;
  if (left.length !== right.length) return false;
  return left.every((value, index2) => frontmatterValuesEqual(value, right[index2]));
}
function objectsEqual(left, right) {
  if (!isPlainYamlObject(left) || !isPlainYamlObject(right)) return false;
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  return leftKeys.every(
    (key2) => Object.prototype.hasOwnProperty.call(right, key2) && frontmatterValuesEqual(left[key2], right[key2])
  );
}
function compareDateWithPrimitive(left, right) {
  const date = left instanceof Date ? left : right instanceof Date ? right : null;
  const other = left instanceof Date ? right : left;
  if (!date || typeof other !== "string") return false;
  if (DATE_RE.test(other)) return date.toISOString().slice(0, 10) === other;
  if (DATETIME_RE.test(other)) return date.toISOString().replace(/\.\d{3}Z$/, "").startsWith(other);
  return false;
}
function getMetadataTypeManager2(app) {
  return app.metadataTypeManager ?? null;
}

// src/Modals/NativeWidgetHost.ts
var import_obsidian12 = require("obsidian");

// src/Modals/NativePropertyPrompt/nativeWikilinkSuggester.ts
var import_obsidian11 = require("obsidian");
var WIKILINK_QUERY = /\[\[([^\]]*)$/;
var NativeWikilinkSuggester = class extends import_obsidian11.AbstractInputSuggest {
  constructor(app, inputEl, sourcePath) {
    const mirrorHost = inputEl.parentElement ?? inputEl;
    const mirrorEl = mirrorHost.createEl("input", {
      cls: "metaedit-native-wikilink-suggest-mirror",
      type: "text"
    });
    super(app, mirrorEl);
    this.inputEl = inputEl;
    this.sourcePath = sourcePath;
    this.onInput = () => this.refreshFromContent();
    this.mirrorEl = mirrorEl;
    this.mirrorEl.tabIndex = -1;
    this.mirrorEl.setAttribute("aria-hidden", "true");
    this.inputEl.addEventListener("input", this.onInput);
    this.inputEl.addEventListener("keyup", this.onInput);
    this.onSelect((suggestion) => this.acceptSuggestion(suggestion));
  }
  getSuggestions(query) {
    const normalized = query.toLowerCase();
    return this.readLinkSuggestions().filter((suggestion) => {
      const path = suggestion.path ?? suggestion.file?.basename ?? "";
      const alias = suggestion.alias ?? "";
      return path.toLowerCase().includes(normalized) || alias.toLowerCase().includes(normalized);
    }).slice(0, 50);
  }
  renderSuggestion(value, el) {
    const label = value.alias ?? value.path ?? value.file?.basename ?? value.file?.path ?? "";
    el.setText(label);
  }
  selectSuggestion(value, _evt) {
    this.acceptSuggestion(value);
  }
  destroy() {
    this.inputEl.removeEventListener("input", this.onInput);
    this.inputEl.removeEventListener("keyup", this.onInput);
    this.close();
    this.mirrorEl.remove();
  }
  refreshFromContent() {
    const match = this.currentQuery();
    if (!match) {
      this.close();
      return;
    }
    this.mirrorEl.value = match.query;
    this.mirrorEl.focus();
    this.mirrorEl.trigger("input");
  }
  currentQuery() {
    const text2 = this.inputEl.textContent ?? "";
    const match = text2.match(WIKILINK_QUERY);
    if (!match) return null;
    return { query: match[1] ?? "" };
  }
  acceptSuggestion(suggestion) {
    if (!suggestion.file) return;
    const link2 = this.app.fileManager.generateMarkdownLink(
      suggestion.file,
      this.sourcePath,
      "",
      suggestion.alias
    );
    this.inputEl.textContent = link2;
    this.inputEl.focus();
    this.inputEl.trigger("input");
    this.close();
  }
  readLinkSuggestions() {
    const metadataCache = this.app.metadataCache;
    const suggestions = metadataCache.getLinkSuggestions?.() ?? [];
    return suggestions.filter((suggestion) => suggestion.file);
  }
};

// src/Modals/NativeWidgetHost.ts
var BODY_PORTAL_SELECTOR = ".suggestion-container, .popover, .hover-popover";
var EDITING_KEYS = /* @__PURE__ */ new Set([
  "Backspace",
  "Delete",
  "Enter",
  "Spacebar",
  " "
]);
var NativeWidgetHost = class {
  constructor(options) {
    this.widgetInstance = null;
    this.preMountBodyChildren = /* @__PURE__ */ new Set();
    this.perMountCleanup = [];
    this.typeInternal = "text";
    this.valueSourceInternal = "native";
    this.didReceiveChangeInternal = false;
    this.didEditDomInternal = false;
    this.renderFailedInternal = false;
    this.app = options.app;
    this.hostEl = options.hostEl;
    this.sourcePath = options.sourcePath;
    this.key = options.key;
    this.onChangeCallback = options.onChange;
  }
  get value() {
    return this.lastValueInternal;
  }
  get type() {
    return this.typeInternal;
  }
  get valueSource() {
    return this.valueSourceInternal;
  }
  get didReceiveChange() {
    return this.didReceiveChangeInternal;
  }
  get didEditDom() {
    return this.didEditDomInternal;
  }
  get renderFailed() {
    return this.renderFailedInternal;
  }
  setKey(key2) {
    this.key = key2;
  }
  /**
   * Mount `type`'s native widget seeded with `value`, tearing down any currently
   * mounted widget first. Falls back to a plain text input when the native widget
   * is unavailable. `lastValue` starts at the seed so an untouched widget commits
   * exactly what was mounted.
   */
  mountNative(type, value) {
    const widget = getNativeWidgetForType(this.app, type);
    if (!widget) {
      this.mountFallback(`Obsidian's native ${type} property widget is not available.`, value);
      this.typeInternal = type;
      return;
    }
    this.beginMount(type, value, "native");
    try {
      this.widgetInstance = widget.render?.(this.hostEl, value, {
        app: this.app,
        key: this.key,
        sourcePath: this.sourcePath,
        onChange: (changed) => {
          this.lastValueInternal = changed;
          this.didReceiveChangeInternal = true;
          this.onChangeCallback?.(changed);
        },
        blur: () => void 0
      });
      this.installAliasesWikilinkFallback(type);
    } catch (error) {
      this.handleRenderFailure(type, error, widget);
    }
  }
  /** Mount a plain text input (native widgets unavailable, or a render failure fallback). */
  mountFallback(reason, value) {
    this.beginMount("text", value, "fallback");
    this.hostEl.createDiv({
      cls: "metaedit-native-property-fallback-note",
      text: reason
    });
    const inputEl = this.hostEl.createEl("input", {
      cls: "metadata-input metadata-input-text metaedit-native-property-fallback-input",
      type: "text"
    });
    inputEl.value = value === null || value === void 0 ? "" : String(value);
    const onInput = () => {
      this.lastValueInternal = inputEl.value;
      this.didReceiveChangeInternal = true;
      this.onChangeCallback?.(inputEl.value);
    };
    inputEl.addEventListener("input", onInput);
    this.perMountCleanup.push(() => inputEl.removeEventListener("input", onInput));
  }
  focus() {
    const focusable = this.hostEl.querySelector(
      "input, textarea, [contenteditable='true'], select, button"
    );
    if (!focusable) return;
    focusable.focus();
    if (focusable instanceof HTMLInputElement && focusable.type === "text") focusable.select();
  }
  /** Blur the focused editor if it lives in this host, so a pending edit flushes to onChange before submit. */
  flushFocus() {
    const active = activeDocument.activeElement;
    if (active instanceof HTMLElement && this.hostEl.contains(active)) {
      active.blur();
    }
  }
  /**
   * Whether the mounted editor is a genuinely single-line control (a real
   * `<input>`/`<select>`, e.g. number/date/datetime) rather than a multi-line
   * contenteditable (the text longtext editor) or a chip editor. Used to decide
   * whether plain Enter should commit: in a single-line control it can, matching
   * Obsidian; in a contenteditable/chip editor Enter belongs to the widget.
   */
  isSingleLineEditor() {
    if (this.hostEl.querySelector(".multi-select-container")) return false;
    if (this.hostEl.querySelector("[contenteditable='true']")) return false;
    const focusable = this.hostEl.querySelector("input, select, textarea");
    if (focusable instanceof HTMLTextAreaElement) return false;
    if (focusable instanceof HTMLInputElement) return focusable.type !== "checkbox";
    return focusable instanceof HTMLSelectElement;
  }
  /**
   * The current value as raw text, for carrying across a type switch. Prefers a
   * live editor's in-progress text; otherwise falls back to the last reported
   * value stringified, so switching away from a checkbox/number/list still
   * carries its state (a checkbox -> "true"/"false", a list -> its comma-joined
   * items) rather than dropping to empty.
   */
  readRawText() {
    return carryTextFromEditor(this.readEditorText(), this.lastValueInternal);
  }
  /**
   * The live text of the mounted editor, or null when there is no text editor at
   * all (e.g. a checkbox). An EXISTING but empty editor returns "" (not null), so a
   * cleared value is carried as empty rather than resurrecting the stale lastValue.
   */
  readEditorText() {
    if (this.hostEl.querySelector(".multi-select-container")) return null;
    const input = this.hostEl.querySelector("input:not([type='checkbox']), textarea");
    if (input) return input.value ?? "";
    const editable = this.hostEl.querySelector("[contenteditable='true']");
    if (editable) return editable.textContent ?? "";
    return null;
  }
  destroy() {
    this.teardownCurrent();
  }
  beginMount(type, value, valueSource) {
    this.teardownCurrent();
    this.preMountBodyChildren = new Set(Array.from(activeDocument.body.children));
    this.typeInternal = type;
    this.valueSourceInternal = valueSource;
    this.lastValueInternal = value;
    this.didReceiveChangeInternal = false;
    this.didEditDomInternal = false;
    this.renderFailedInternal = false;
    this.trackDomActivity();
  }
  handleRenderFailure(type, error, widget) {
    const reason = error instanceof Error ? error.message : String(error);
    this.renderFailedInternal = true;
    this.hostEl.empty();
    this.hostEl.createDiv({
      cls: "metaedit-native-property-error",
      text: `MetaEdit could not render Obsidian's native editor for '${this.key}'.`
    });
    new import_obsidian12.Notice(`MetaEdit could not render Obsidian's native editor for '${this.key}': ${reason}`);
    void widget;
  }
  installAliasesWikilinkFallback(type) {
    if (type !== "aliases") return;
    const inputEl = this.hostEl.querySelector(".multi-select-input[contenteditable='true']");
    if (!inputEl) return;
    const suggester = new NativeWikilinkSuggester(this.app, inputEl, this.sourcePath);
    this.perMountCleanup.push(() => suggester.destroy());
  }
  trackDomActivity() {
    const markEdited = (evt) => {
      if (evt instanceof KeyboardEvent && !isEditingKey(evt)) return;
      this.didEditDomInternal = true;
    };
    const events = ["input", "change", "paste", "compositionend", "keydown"];
    for (const eventName of events) {
      this.hostEl.addEventListener(eventName, markEdited, true);
      this.perMountCleanup.push(() => this.hostEl.removeEventListener(eventName, markEdited, true));
    }
  }
  teardownCurrent() {
    for (const callback of this.perMountCleanup.splice(0)) {
      try {
        callback();
      } catch {
      }
    }
    this.closeWidgetLifecycle(this.widgetInstance);
    this.widgetInstance = null;
    this.removeBodyPortalsCreatedByWidget();
    this.hostEl.empty();
  }
  closeWidgetLifecycle(value) {
    const seen = /* @__PURE__ */ new Set();
    const visit = (candidate) => {
      if (!candidate || seen.has(candidate)) return;
      seen.add(candidate);
      const owner = candidate;
      for (const method of ["close", "destroy", "unload"]) {
        const fn = owner[method];
        if (typeof fn !== "function") continue;
        try {
          fn.call(candidate);
        } catch {
        }
      }
      for (const key2 of ["multiselect", "suggest", "suggester", "suggestEl", "hoverPopover", "popover"]) {
        visit(owner[key2]);
      }
    };
    visit(value);
  }
  removeBodyPortalsCreatedByWidget() {
    for (const el of Array.from(activeDocument.querySelectorAll(BODY_PORTAL_SELECTOR))) {
      if (this.preMountBodyChildren.has(el)) continue;
      el.remove();
    }
  }
};
function carryTextFromEditor(editorText, lastValue) {
  return editorText === null ? stringifyForCarry(lastValue) : editorText;
}
function stringifyForCarry(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map((item) => String(item ?? "")).filter(Boolean).join(", ");
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return String(value);
  return "";
}
function isEditingKey(evt) {
  if (evt.metaKey || evt.ctrlKey || evt.altKey) return false;
  if (evt.key.length === 1) return true;
  return EDITING_KEYS.has(evt.key);
}

// src/Modals/TypePill.ts
var import_obsidian13 = require("obsidian");
var FALLBACK_ICONS = {
  text: "text",
  multitext: "list",
  number: "binary",
  checkbox: "check-square",
  date: "calendar",
  datetime: "clock",
  tags: "tags",
  aliases: "text",
  cssclasses: "list"
};
var TypePill = class {
  constructor(options) {
    this.type = "text";
    this.locked = false;
    this.opts = options;
    this.buttonEl = options.parentEl.createEl("button", { cls: "metaedit-type-pill" });
    this.buttonEl.type = "button";
    this.iconEl = this.buttonEl.createSpan({ cls: "metaedit-type-pill-icon" });
    this.labelEl = this.buttonEl.createSpan({ cls: "metaedit-type-pill-label" });
    this.buttonEl.addEventListener("click", () => this.openMenu());
  }
  /** Reflect the mounted widget's type on the pill; `locked` disables the menu. */
  setState(type, locked) {
    this.type = type;
    this.locked = locked;
    const label = this.labelFor(type);
    (0, import_obsidian13.setIcon)(this.iconEl, this.iconIdFor(type));
    this.labelEl.setText(label);
    this.buttonEl.toggleClass("is-locked", locked);
    this.buttonEl.disabled = locked;
    (0, import_obsidian13.setTooltip)(this.buttonEl, locked ? `${label} (fixed for this property)` : this.opts.tooltip);
  }
  openMenu() {
    if (this.opts.beforeOpen && !this.opts.beforeOpen()) return;
    if (this.locked) return;
    const menu = new import_obsidian13.Menu();
    for (const choice of NATIVE_TYPE_CHOICES) {
      menu.addItem((item) => {
        item.setTitle(choice.label);
        item.setIcon(this.iconIdFor(choice.type));
        item.setChecked(choice.type === this.type);
        item.onClick(() => this.opts.onPick(choice.type));
      });
    }
    const rect = this.buttonEl.getBoundingClientRect();
    menu.showAtPosition({ x: rect.left, y: rect.bottom + 4 });
  }
  hide() {
    this.buttonEl.hide();
  }
  show() {
    this.buttonEl.show();
  }
  labelFor(type) {
    const label = NATIVE_TYPE_CHOICES.find((choice) => choice.type === type)?.label;
    if (label) return label;
    return type.length === 0 ? type : type[0].toUpperCase() + type.slice(1);
  }
  iconIdFor(type) {
    const raw = getNativeWidgetForType(this.opts.app, type)?.icon;
    const id = typeof raw === "string" ? raw.replace(/^lucide-/, "") : "";
    return id || FALLBACK_ICONS[type];
  }
};

// src/Modals/NativePropertyPrompt/NativePropertyPrompt.ts
var RESERVED_TYPE_KEYS = /* @__PURE__ */ new Set(["aliases", "cssclasses"]);
function isReservedTypeKey(key2) {
  return isTagsKey(key2) || RESERVED_TYPE_KEYS.has(key2.toLowerCase());
}
var NativePropertyPrompt = class _NativePropertyPrompt extends import_obsidian14.Modal {
  constructor(app, file, property) {
    super(app);
    this.typePill = null;
    // The type the property resolved to when the prompt opened; null when the
    // native widgets are unavailable (fallback editor), which also disables the
    // pill and therefore type switching.
    this.originalType = null;
    // True once the user switched the widget's type at least once, even back to
    // the original. Every re-mount resets the host's didReceiveChange flag, so
    // after any switch the untouched fast path is no longer trustworthy and the
    // submit decision falls through to a value comparison instead.
    this.didSwitchType = false;
    this.result = { kind: "cancel" };
    this.didFinish = false;
    this.didResolve = false;
    this.saveButton = null;
    this.file = file;
    this.property = property;
    this.waitForClose = new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
    this.contentEl.addClass("metaedit-native-property-prompt");
    new import_obsidian14.Setting(this.contentEl).setHeading().setName(`Edit ${property.key}`);
    const rowEl = this.contentEl.createDiv({ cls: "metadata-property metaedit-native-property-row" });
    const resolution = resolveNativeProperty(app, property);
    const canSwitchType = resolution.kind === "native" && canAssignVaultPropertyType(app);
    if (canSwitchType) {
      this.typePill = new TypePill({
        app,
        parentEl: rowEl,
        tooltip: "Change property type - applies vault-wide (\u2318/Ctrl+Y)",
        onPick: (type) => this.pickType(type)
      });
    }
    this.hostEl = rowEl.createDiv({ cls: "metadata-property-value metaedit-native-property-host" });
    this.host = new NativeWidgetHost({
      app,
      hostEl: this.hostEl,
      sourcePath: file.path,
      key: property.key
    });
    if (resolution.kind === "native") {
      this.originalType = resolution.type;
      this.host.mountNative(resolution.type, property.content);
      if (canSwitchType) {
        this.updateTypePill();
        this.registerTypeSwitchAccelerator();
      }
    } else {
      this.host.mountFallback(resolution.reason, property.content);
    }
    new import_obsidian14.Setting(this.contentEl).addButton((button) => {
      this.saveButton = button;
      button.setButtonText("Save").setCta().setDisabled(this.host.renderFailed).onClick(() => this.submit());
    }).addButton((button) => {
      button.setButtonText("Cancel").onClick(() => this.cancel());
    });
    this.open();
  }
  static Prompt(app, file, property) {
    const modal = new _NativePropertyPrompt(app, file, property);
    return modal.waitForClose;
  }
  onOpen() {
    super.onOpen();
    this.host.focus();
  }
  onClose() {
    super.onClose();
    this.host.destroy();
    this.hostEl.remove();
    if (!this.didFinish) this.result = { kind: "cancel" };
    this.resolveOnce();
  }
  registerTypeSwitchAccelerator() {
    this.contentEl.addEventListener("keydown", (evt) => {
      if (evt.isComposing) return;
      if ((evt.metaKey || evt.ctrlKey) && (evt.key === "y" || evt.key === "Y")) {
        evt.preventDefault();
        this.typePill?.openMenu();
      }
    }, true);
  }
  pickType(type) {
    if (type === this.host.type) return;
    this.didSwitchType = true;
    this.host.mountNative(type, seedFromRawText(this.host.readRawText(), type));
    this.updateTypePill();
    this.saveButton?.setDisabled(this.host.renderFailed);
    this.host.focus();
  }
  updateTypePill() {
    const locked = LOCKED_NATIVE_TYPES.has(this.host.type) || isReservedTypeKey(this.property.key);
    this.typePill?.setState(this.host.type, locked);
  }
  submit() {
    this.host.flushFocus();
    if (this.host.valueSource === "native" && this.host.didEditDom && !this.host.didReceiveChange) {
      new import_obsidian14.Notice(`MetaEdit did not receive a value from Obsidian's native editor for '${this.property.key}'. Nothing was written.`);
      return;
    }
    const typeChanged = this.originalType !== null && this.host.type !== this.originalType;
    if (!this.host.didReceiveChange && !typeChanged && !this.didSwitchType) {
      this.finish({
        kind: "submit",
        changed: false,
        typeChanged: false,
        type: this.host.type,
        value: this.property.content,
        valueSource: this.host.valueSource
      });
      return;
    }
    const normalized = normalizeWidgetValue(this.host.type, this.host.value, this.host.valueSource);
    if (normalized.ok === false) {
      new import_obsidian14.Notice(`MetaEdit could not update '${this.property.key}': ${normalized.reason}`);
      return;
    }
    const changed = !frontmatterValuesEqual(normalized.value, this.property.content);
    this.finish({
      kind: "submit",
      changed,
      typeChanged,
      type: this.host.type,
      value: normalized.value,
      valueSource: this.host.valueSource
    });
  }
  cancel() {
    this.finish({ kind: "cancel" });
  }
  finish(result) {
    this.result = result;
    this.didFinish = true;
    this.close();
  }
  resolveOnce() {
    if (this.didResolve) return;
    this.didResolve = true;
    this.resolvePromise(this.result);
  }
};

// src/Modals/FluidPropertyCreatePrompt/FluidPropertyCreatePrompt.ts
var import_obsidian15 = require("obsidian");
var FluidPropertyCreatePrompt = class _FluidPropertyCreatePrompt extends import_obsidian15.Modal {
  constructor(app, options) {
    super(app);
    this.addButton = null;
    this.pinnedType = false;
    this.autoPropertyKey = false;
    this.lastSettledKey = null;
    this.inferredType = null;
    this.result = { kind: "cancel" };
    this.didFinish = false;
    this.didResolve = false;
    this.opts = options;
    this.waitForClose = new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
    this.modalEl.addClass("metaedit-fluid-create-modal");
    this.contentEl.addClass("metaedit-fluid-create");
    new import_obsidian15.Setting(this.contentEl).setHeading().setName("New property");
    const rowEl = this.contentEl.createDiv({ cls: "metadata-property metaedit-fluid-create-row" });
    this.typePill = new TypePill({
      app,
      parentEl: rowEl,
      tooltip: "Change type (\u2318/Ctrl+Y)",
      onPick: (type) => this.pickType(type),
      // Settle first so a reserved key locks its type before the menu opens (you
      // can't pick a type for tags/aliases), and so the adopted type is checked.
      beforeOpen: () => {
        this.settleKey();
        return !this.autoPropertyKey;
      }
    });
    this.keyInputEl = rowEl.createEl("input", {
      cls: "metadata-property-key-input metaedit-fluid-create-key",
      type: "text"
    });
    this.keyInputEl.placeholder = "Property name";
    this.hostEl = rowEl.createDiv({ cls: "metadata-property-value metaedit-native-property-host metaedit-fluid-create-value" });
    this.autoPropertyNoteEl = rowEl.createDiv({ cls: "metaedit-fluid-create-autoprop" });
    this.autoPropertyNoteEl.hide();
    this.hintEl = this.contentEl.createDiv({ cls: "metaedit-fluid-create-hint" });
    this.hintEl.hide();
    this.warningEl = this.contentEl.createDiv({ cls: "metaedit-fluid-create-warning" });
    this.warningEl.hide();
    this.host = new NativeWidgetHost({
      app,
      hostEl: this.hostEl,
      sourcePath: options.sourcePath,
      key: ""
    });
    this.host.mountNative("text", emptyValueForType("text"));
    this.updateTypePill();
    this.buildFooter();
    this.registerKeyInput();
    this.registerKeyboard();
    this.open();
  }
  static Open(app, options) {
    return new _FluidPropertyCreatePrompt(app, options).waitForClose;
  }
  onOpen() {
    super.onOpen();
    this.keyInputEl.focus();
    this.updateValidity();
  }
  onClose() {
    super.onClose();
    this.keySuggester?.close();
    this.keySuggester = void 0;
    this.host.destroy();
    if (!this.didFinish) this.result = { kind: "cancel" };
    this.resolveOnce();
  }
  buildFooter() {
    new import_obsidian15.Setting(this.contentEl).addExtraButton((button) => button.setIcon("info").setDisabled(true).setTooltip("\u2318/Ctrl+\u21B5 to add \xB7 \u2318/Ctrl+Y to change type")).addButton((button) => {
      this.addButton = button;
      button.setButtonText("Add").setCta().onClick(() => this.commit());
    }).addButton((button) => button.setButtonText("Cancel").onClick(() => this.cancel()));
  }
  registerKeyInput() {
    if (this.opts.suggestValues.length > 0) {
      this.keySuggester = new FluidKeyNameSuggester(this.app, this.keyInputEl, this.opts.suggestValues);
    }
    this.keyInputEl.addEventListener("input", () => this.updateValidity());
    this.keyInputEl.addEventListener("blur", () => this.settleKey());
    this.keyInputEl.addEventListener("keydown", (evt) => {
      if (evt.isComposing) return;
      if ((evt.key === "Enter" || evt.key === "Tab") && !evt.shiftKey && !this.isSuggestionOpen()) {
        evt.preventDefault();
        this.settleAndAdvance();
      }
    });
  }
  registerKeyboard() {
    this.contentEl.addEventListener("keydown", (evt) => {
      if (evt.isComposing) return;
      if ((evt.metaKey || evt.ctrlKey) && evt.key === "Enter") {
        evt.preventDefault();
        this.commit();
        return;
      }
      if ((evt.metaKey || evt.ctrlKey) && (evt.key === "y" || evt.key === "Y")) {
        evt.preventDefault();
        this.typePill.openMenu();
      }
    }, true);
    this.hostEl.addEventListener("keydown", (evt) => {
      if (evt.isComposing) return;
      if (evt.key !== "Enter" || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) return;
      if (!this.host.isSingleLineEditor()) return;
      evt.preventDefault();
      this.commit();
    });
    this.hostEl.addEventListener("input", () => this.updateInferenceHint());
  }
  settleAndAdvance() {
    this.settleKey();
    if (this.autoPropertyKey) return;
    this.host.focus();
  }
  settleKey() {
    const key2 = this.keyInputEl.value.trim();
    this.updateValidity();
    if (key2 === "" || isReservedFrontmatterKey(key2) || this.opts.existingKeys.has(key2)) {
      if (this.autoPropertyKey) this.exitAutoPropertyState();
      this.lastSettledKey = key2;
      return;
    }
    if (key2 === this.lastSettledKey) return;
    this.lastSettledKey = key2;
    this.host.setKey(key2);
    if (this.opts.hasAutoProperty(key2)) {
      this.enterAutoPropertyState(key2);
      return;
    }
    if (this.autoPropertyKey) this.exitAutoPropertyState();
    const type = resolveCreationType(this.app, key2);
    if (LOCKED_NATIVE_TYPES.has(type)) {
      this.pinnedType = false;
      if (type !== this.host.type) this.remountAs(type);
      return;
    }
    if (this.pinnedType) return;
    if (type !== this.host.type) this.remountAs(type);
  }
  enterAutoPropertyState(key2) {
    this.autoPropertyKey = true;
    this.host.destroy();
    this.hostEl.hide();
    this.typePill.hide();
    this.hideInferenceHint();
    this.autoPropertyNoteEl.setText(`"${key2}" uses an Auto Property \u2013 press \u2318/Ctrl+\u21B5 to choose its value.`);
    this.autoPropertyNoteEl.show();
    this.updateValidity();
  }
  exitAutoPropertyState() {
    this.autoPropertyKey = false;
    this.autoPropertyNoteEl.hide();
    this.hostEl.show();
    this.typePill.show();
    this.host.mountNative("text", emptyValueForType("text"));
    this.pinnedType = false;
    this.updateTypePill();
  }
  remountAs(type) {
    this.keySuggester?.close();
    const seed = seedFromRawText(this.host.readRawText(), type);
    this.host.mountNative(type, seed);
    this.updateTypePill();
    this.updateInferenceHint();
  }
  pickType(type) {
    this.pinnedType = true;
    this.remountAs(type);
    this.host.focus();
  }
  updateTypePill() {
    this.typePill.setState(this.host.type, LOCKED_NATIVE_TYPES.has(this.host.type));
  }
  updateInferenceHint() {
    if (this.autoPropertyKey || this.pinnedType) {
      this.hideInferenceHint();
      return;
    }
    const inferred = inferCreationTypeFromText(this.host.readRawText(), this.host.type);
    if (!inferred) {
      this.hideInferenceHint();
      return;
    }
    this.inferredType = inferred;
    const label = NATIVE_TYPE_CHOICES.find((choice) => choice.type === inferred)?.label ?? inferred;
    this.hintEl.empty();
    this.hintEl.createSpan({ text: `Looks like a ${label.toLowerCase()}. ` });
    const acceptEl = this.hintEl.createEl("a", { cls: "metaedit-fluid-create-hint-accept", text: `Change to ${label}` });
    acceptEl.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (this.inferredType) this.pickType(this.inferredType);
    });
    this.hintEl.show();
  }
  hideInferenceHint() {
    this.inferredType = null;
    this.hintEl.hide();
    this.hintEl.empty();
  }
  updateValidity() {
    const key2 = this.keyInputEl.value.trim();
    let warning = "";
    if (key2 !== "" && isReservedFrontmatterKey(key2)) {
      warning = `"${key2}" is a reserved property name and can't be used.`;
    } else if (key2 !== "" && this.opts.existingKeys.has(key2)) {
      warning = `This note already has a property named "${key2}".`;
    }
    this.warningEl.setText(warning);
    this.warningEl.toggle(warning !== "");
    this.addButton?.setDisabled(key2 === "" || warning !== "");
  }
  commit() {
    this.settleKey();
    const key2 = this.keyInputEl.value.trim();
    if (key2 === "" || isReservedFrontmatterKey(key2) || this.opts.existingKeys.has(key2)) {
      this.updateValidity();
      this.keyInputEl.focus();
      return;
    }
    if (this.autoPropertyKey) {
      this.finish({ kind: "autoProperty", key: key2 });
      return;
    }
    if (this.host.renderFailed) {
      new import_obsidian15.Notice(`MetaEdit could not render an editor for '${key2}'. Nothing was written.`);
      return;
    }
    this.host.flushFocus();
    if (this.host.valueSource === "native" && this.host.didEditDom && !this.host.didReceiveChange) {
      new import_obsidian15.Notice(`MetaEdit did not receive a value from Obsidian's native editor for '${key2}'. Nothing was written.`);
      return;
    }
    const normalized = normalizeWidgetValue(this.host.type, this.host.value, this.host.valueSource);
    if (normalized.ok === false) {
      new import_obsidian15.Notice(`MetaEdit could not create '${key2}': ${normalized.reason}`);
      return;
    }
    this.finish({
      kind: "submit",
      key: key2,
      type: this.host.type,
      value: normalized.value,
      valueSource: this.host.valueSource
    });
  }
  cancel() {
    this.finish({ kind: "cancel" });
  }
  finish(result) {
    this.result = result;
    this.didFinish = true;
    this.close();
  }
  resolveOnce() {
    if (this.didResolve) return;
    this.didResolve = true;
    this.resolvePromise(this.result);
  }
  isSuggestionOpen() {
    return activeDocument.querySelector(".suggestion-container") !== null;
  }
};
var FluidKeyNameSuggester = class extends GenericTextSuggester {
  renderSuggestion(value, el) {
    super.renderSuggestion(value, el);
    el.closest(".suggestion-container")?.addClass("metaedit-fluid-create-suggest");
  }
};

// src/metaController.ts
var fileWriteQueues = /* @__PURE__ */ new Map();
var ADD_FIRST_SELECTION = "metaedit:multi-value:add-first";
var ADD_TO_BEGINNING_SELECTION = "metaedit:multi-value:add-beginning";
var ADD_TO_END_SELECTION = "metaedit:multi-value:add-end";
var VALUE_SELECTION_PREFIX = "metaedit:multi-value:value:";
var MetaController = class {
  constructor(app, plugin) {
    this.hasTrackerPlugin = false;
    this.app = app;
    this.parser = new MetaEditParser(app);
    this.plugin = plugin;
    this.hasTrackerPlugin = !!this.app.plugins.plugins["obsidian-tracker"];
  }
  async getPropertiesInFile(file) {
    const yaml = await this.parser.parseFrontmatter(file);
    const inlineFields = await this.parser.parseInlineFields(file);
    const tags = await this.parser.getTagsForFile(file);
    return [...tags, ...yaml, ...inlineFields];
  }
  async addYamlProp(propName, propValue, file) {
    this.assertWritableKey(propName);
    const settings = this.plugin.settings;
    if (isTagsKey(propName)) {
      propValue = splitFrontmatterTags(propValue);
    }
    const activeAutoProperty = this.getActiveAutoProperty(propName);
    const autoPropertyKeepsScalar = !!activeAutoProperty && !isMultiAutoProperty(activeAutoProperty, settings.EditMode, propName);
    if (!Array.isArray(propValue) && !autoPropertyKeepsScalar && (settings.EditMode.mode === "All Multi" /* AllMulti */ || settings.EditMode.mode === "Some Multi" /* SomeMulti */ && settings.EditMode.properties.contains(propName))) {
      propValue = [propValue];
    }
    let propertyExists = false;
    await this.enqueueFileWrite(file, async () => {
      await this.processFrontMatter(file, (frontmatter) => {
        if (Object.prototype.hasOwnProperty.call(frontmatter, propName)) {
          propertyExists = true;
          return;
        }
        frontmatter[propName] = propValue;
      });
    });
    if (propertyExists) {
      new import_obsidian16.Notice(`Frontmatter in file '${file.name}' already has property '${propName}'. Will not add.`);
    }
  }
  /**
   * Append a NEW inline `name:: value` field instance, leaving any existing
   * same-named fields untouched. This is the add-an-instance counterpart to
   * {@link updatePropertyInFile}, which replaces every existing instance.
   *
   * Placement is computed by {@link MetaEditParser.computeInlineInsertIndex} so the
   * field is never inserted inside frontmatter or an ordinary fenced code block.
   * Admonition `ad-*` fences remain readable metadata containers. The write goes
   * through the per-file queue, so it serializes with other MetaEdit writes instead of
   * racing them (the previous implementation read and wrote outside the queue, and
   * silently no-opped when the chosen line index was 0).
   */
  async appendDataviewField(propName, propValue, file, options = {}) {
    const valueStr = Array.isArray(propValue) ? propValue.join(", ") : String(propValue);
    const location = options.location ?? "afterLastMatch";
    await this.enqueueFileWrite(file, async () => {
      const content = await this.app.vault.read(file);
      const newline = content.includes("\r\n") ? "\r\n" : "\n";
      const lines = content.split(/\r?\n/);
      const insertIndex = this.parser.computeInlineInsertIndex(content, propName, location);
      lines.splice(insertIndex, 0, `${propName}:: ${valueStr}`);
      await this.app.vault.modify(file, lines.join(newline));
    });
  }
  async editMetaElement(property, meta, file) {
    if (property.type === 2 /* Tag */) {
      await this.editTag(property, file);
      return;
    }
    if (this.isYamlParentContainer(property)) {
      new import_obsidian16.Notice(`Nested YAML parent '${property.key}' cannot be edited as a text value.`);
      return;
    }
    if (this.getActiveAutoProperty(property.key)) {
      await this.editAutoProperty(property, file);
      return;
    }
    if (await this.nativeYamlMode(property, file)) return;
    if (shouldUseMultiValueEditor(property, this.plugin.settings.EditMode))
      await this.multiValueMode(property, file);
    else
      await this.standardMode(property, file);
  }
  /**
   * Edit a single body `#tag` occurrence.
   *
   * Decision D: the primary action RENAMES the whole tag (a flat tag is renamed,
   * not turned into a child); "Edit last segment" is offered only for nested
   * tags; Tracker's `#tag:value` data syntax is offered only when the Tracker
   * plugin is present. The chosen action is derived here per edit and baked into
   * the replacement token, so nothing about Tracker survives on the controller
   * (BUG-1). The exact occurrence is rewritten by position (BUG-2/BUG-3).
   */
  async editTag(property, file) {
    const tag2 = property.key;
    const nested = isNestedTag(tag2);
    const RENAME = "Rename tag", LEAF = "Edit last segment", TRACKER = "Tracker value (#tag:value)";
    const actions = [RENAME];
    if (nested) actions.push(LEAF);
    if (this.hasTrackerPlugin) actions.push(TRACKER);
    let action2 = RENAME;
    if (actions.length > 1) {
      action2 = await GenericSuggester.Suggest(this.app, actions, actions);
      if (!action2) return;
    }
    const mode = action2 === TRACKER ? "tracker" : action2 === LEAF ? "leaf" : "rename";
    let input;
    const parentPath = tagParent(tag2);
    if (mode === "leaf" && this.getActiveAutoProperty(parentPath)) {
      const autoProp = await this.handleAutoProperties(parentPath);
      if (autoProp === null) return;
      input = Array.isArray(autoProp) ? autoProp.join(", ") : autoProp;
    } else if (mode === "tracker") {
      setPendingValueContext(null);
      input = await GenericPrompt.Prompt(this.app, `Enter a Tracker value for ${tag2}`);
    } else {
      setPendingValueContext({ app: this.app, key: tag2, type: 2 /* Tag */, tagMode: mode });
      const header = mode === "leaf" ? `Change the last segment of ${tag2} to` : `Rename ${tag2} to`;
      const seed = mode === "leaf" ? tagLeaf(tag2) : stripHash(tag2);
      input = await GenericPrompt.Prompt(this.app, header, seed, seed);
    }
    if (input === null) return;
    const newToken = computeTagRewrite(tag2, input, mode);
    if (!newToken || newToken === tag2) return;
    if (!isValidTagToken(normalizeTagToken(newToken))) {
      new import_obsidian16.Notice(`'${input.trim()}' is not a valid tag name. Tags cannot contain spaces or commas.`);
      return;
    }
    await this.updatePropertyFromUi(property, newToken, file);
  }
  async handleProgressProps(meta, file) {
    try {
      const { enabled, properties } = this.plugin.settings.ProgressProperties;
      if (!enabled) return;
      const tasks = this.app.metadataCache.getFileCache(file)?.listItems?.filter((li) => li.task);
      if (!tasks) return;
      let total = 0, complete = 0, incomplete = 0;
      total = tasks.length;
      complete = tasks.filter((i) => (i.task ?? "").toLowerCase() === "x").length;
      incomplete = total - complete;
      const props = await this.progressPropHelper(properties, meta, { total, complete, incomplete });
      await this.updateMultipleInFile(props, file);
    } catch (e) {
      log.logError(e);
    }
  }
  async createNewProperty(suggestValues) {
    const propName = await GenericPrompt.Prompt(this.app, "Enter a property name", "Property", "", suggestValues);
    if (!propName) return null;
    let propValue;
    if (this.getActiveAutoProperty(propName)) {
      const autoProp = await this.handleAutoProperties(propName);
      if (autoProp === null) return null;
      propValue = autoProp;
    } else {
      const entered = await GenericPrompt.Prompt(this.app, "Enter a property value", "Value").catch(() => null);
      if (entered === null) return null;
      propValue = entered;
    }
    return { propName, propValue: typeof propValue === "string" ? propValue.trim() : propValue };
  }
  /**
   * Create a new top-level YAML property through the fluid, type-aware native
   * flow: a single keyboard-first modal that mounts Obsidian's own widget for
   * the adopted/chosen type. A key with an active Auto Property hands off to the
   * existing Auto Property value flow (preserving its single/multi behaviour);
   * everything else writes the widget's typed value directly via
   * {@link createNativeYamlProperty}. Cancels are silent.
   */
  async createNewYamlPropertyFluid(file, suggestValues, existingKeys) {
    const result = await FluidPropertyCreatePrompt.Open(this.app, {
      sourcePath: file.path,
      suggestValues,
      existingKeys,
      hasAutoProperty: (key2) => !!this.getActiveAutoProperty(key2)
    });
    if (result.kind === "cancel") return;
    try {
      if (result.kind === "autoProperty") {
        const autoValue = await this.handleAutoProperties(result.key);
        if (autoValue === null) return;
        await this.addYamlProp(result.key, autoValue, file);
        return;
      }
      await this.createNativeYamlProperty(result.key, result.value, file);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      new import_obsidian16.Notice(`MetaEdit could not add '${result.key}': ${reason}`);
    }
  }
  /**
   * Write a NEW top-level YAML property carrying the native widget's already
   * type-normalized value. The chosen native type is authoritative, so - unlike
   * {@link addYamlProp} - this does NOT apply the legacy EditMode single/multi
   * wrap (List is the explicit array path) and does NOT canonicalize tags (the
   * tags widget already yields canonical strings, so create round-trips exactly
   * like native edit does). Reuses addYamlProp's guards and serialized queue,
   * with a create-guard re-read inside processFrontMatter so a key added between
   * modal-open and write is never clobbered.
   */
  async createNativeYamlProperty(key2, value, file) {
    this.assertWritableKey(key2);
    let propertyExists = false;
    await this.enqueueFileWrite(file, async () => {
      await this.processFrontMatter(file, (frontmatter) => {
        if (Object.prototype.hasOwnProperty.call(frontmatter, key2)) {
          propertyExists = true;
          return;
        }
        frontmatter[key2] = value;
      });
    });
    if (propertyExists) {
      new import_obsidian16.Notice(`Frontmatter in file '${file.name}' already has property '${key2}'. Will not add.`);
    }
  }
  async deleteProperty(property, file) {
    if (property.type === 0 /* YAML */ && (property.isNested || property.isVirtual)) {
      new import_obsidian16.Notice(`Nested YAML property '${property.key}' cannot be deleted by MetaEdit yet.`);
      return;
    }
    await this.enqueueFileWrite(file, async () => {
      if (property.type === 0 /* YAML */) {
        await this.processFrontMatter(file, (frontmatter) => {
          delete frontmatter[property.key];
        });
        return;
      }
      const fileContent = await this.app.vault.read(file);
      const newline = fileContent.includes("\r\n") ? "\r\n" : "\n";
      const splitContent = fileContent.split(/\r?\n/);
      const regexp = new RegExp(`^\\s*${this.escapeSpecialCharacters(property.key)}\\s*::`);
      const idx = splitContent.findIndex((s) => s.match(regexp));
      if (idx === -1) return;
      splitContent.splice(idx, 1);
      await this.app.vault.modify(file, splitContent.join(newline));
    });
  }
  async progressPropHelper(progressProps, meta, counts) {
    return progressProps.reduce((obj, el) => {
      const property = meta.find((prop2) => prop2.key === el.name);
      if (property) {
        switch (el.type) {
          case "Completed Tasks" /* TaskComplete */:
            obj.push({ ...property, content: counts.complete.toString() });
            break;
          case "Incomplete Tasks" /* TaskIncomplete */:
            obj.push({ ...property, content: counts.incomplete.toString() });
            break;
          case "Total Tasks" /* TaskTotal */:
            obj.push({ ...property, content: counts.total.toString() });
            break;
          default:
            break;
        }
      }
      return obj;
    }, []);
  }
  async standardMode(property, file) {
    const newValue = await GenericPrompt.Prompt(this.app, `Enter a new value for ${property.key}`, property.content, property.content);
    if (newValue) {
      await this.updatePropertyFromUi(property, newValue, file);
    }
  }
  async nativeYamlMode(property, file) {
    if (!isNativeEditableYamlProperty(property)) return false;
    const result = await NativePropertyPrompt.Prompt(this.app, file, property);
    if (result.kind === "cancel") return true;
    if (!result.changed && !result.typeChanged) return true;
    const wrote = result.changed ? await this.updateNativeYamlPropertyFromUi(property, result.value, file) : true;
    if (wrote && result.typeChanged) {
      await this.assignPropertyType(property.key, result.type);
    }
    return true;
  }
  /**
   * Persist a property's type in Obsidian's vault-wide type memory (what the
   * edit prompt's type pill changed), matching Obsidian's own "Property type"
   * menu. Failure is surfaced but non-fatal: the value write has already
   * happened, and Obsidian will still infer a widget from the value's shape.
   */
  async assignPropertyType(key2, type) {
    const assigned = await assignVaultPropertyType(this.app, key2, type);
    if (!assigned) {
      new import_obsidian16.Notice(`MetaEdit updated '${key2}', but could not change its property type in this Obsidian version.`);
      log.logMessage(`metadataTypeManager.setType unavailable or failed while setting '${key2}' to '${type}'.`);
    }
  }
  async multiValueMode(property, file) {
    const tagsKey = property.type === 0 /* YAML */ && isTagsKey(property.key);
    const editsArray = tagsKey || isMultiValueYamlProperty(property);
    const writeBase = tagsKey ? splitFrontmatterTags(property.content) : editsArray ? property.content : this.splitMultiValue(property);
    const displayValues = editsArray ? writeBase.map((value) => (value ?? "").toString()) : writeBase;
    let selectedOption;
    const valueSelection = (index2) => `${VALUE_SELECTION_PREFIX}${index2}`;
    if (displayValues.length == 0 || displayValues.length == 1 && displayValues[0] == "") {
      const options = ["Add new value"];
      selectedOption = await GenericSuggester.Suggest(this.app, options, [ADD_FIRST_SELECTION]);
    } else if (displayValues.length == 1) {
      const options = [displayValues[0], "Add to end", "Add to beginning"];
      selectedOption = await GenericSuggester.Suggest(this.app, options, [valueSelection(0), ADD_TO_END_SELECTION, ADD_TO_BEGINNING_SELECTION]);
    } else {
      const options = ["Add to end", ...displayValues, "Add to beginning"];
      selectedOption = await GenericSuggester.Suggest(
        this.app,
        options,
        [ADD_TO_END_SELECTION, ...displayValues.map((_, index2) => valueSelection(index2)), ADD_TO_BEGINNING_SELECTION]
      );
    }
    if (!selectedOption) return false;
    let tempValue;
    const parsedSelectedIndex = selectedOption.startsWith(VALUE_SELECTION_PREFIX) ? Number(selectedOption.substring(VALUE_SELECTION_PREFIX.length)) : -1;
    const selectedIndex = Number.isInteger(parsedSelectedIndex) ? parsedSelectedIndex : -1;
    const isAddCommand = selectedOption === ADD_FIRST_SELECTION || selectedOption === ADD_TO_BEGINNING_SELECTION || selectedOption === ADD_TO_END_SELECTION;
    if (isAddCommand) {
      tempValue = await GenericPrompt.Prompt(this.app, "Enter a new value");
    } else {
      const selectedValue = displayValues[selectedIndex] ?? "";
      tempValue = await GenericPrompt.Prompt(this.app, `Change ${selectedValue} to`, selectedValue);
    }
    if (!tempValue) return false;
    if (tagsKey) tempValue = canonicalizeFrontmatterTag(tempValue);
    if (tagsKey && tempValue === "") return false;
    const edit = selectedOption === ADD_FIRST_SELECTION ? { kind: "addFirst", value: tempValue } : selectedOption === ADD_TO_BEGINNING_SELECTION ? { kind: "prepend", value: tempValue } : selectedOption === ADD_TO_END_SELECTION ? { kind: "append", value: tempValue } : { kind: "replace", index: selectedIndex, value: tempValue };
    const newList = applyMultiValueEdit(writeBase, edit);
    const newValue = editsArray ? newList : newList.join(", ");
    return await this.updatePropertyFromUi(property, newValue, file);
  }
  getActiveAutoProperty(propertyName) {
    if (!this.plugin.settings.AutoProperties.enabled) return void 0;
    return findAutoProperty(this.plugin.settings.AutoProperties.properties, propertyName);
  }
  /**
   * Open the Auto Property value prompt for `propertyName`, if one is defined and
   * enabled. Returns a string for a Single property, a string[] for a Multi
   * property, or null when there is no auto property or the user cancels.
   */
  async handleAutoProperties(propertyName, currentValue) {
    const autoProp = this.getActiveAutoProperty(propertyName);
    if (!autoProp) return null;
    const isMulti = isMultiAutoProperty(autoProp, this.plugin.settings.EditMode, propertyName);
    return await AutoPropertyValueModal.Show(this.app, autoProp, {
      isMulti,
      currentValue,
      onSaveChoices: (values) => this.persistAutoPropertyChoices(autoProp, values)
    });
  }
  async editAutoProperty(property, file) {
    const result = await this.handleAutoProperties(property.key, property.content);
    if (result === null || result === void 0) return;
    const newValue = Array.isArray(result) && property.type !== 0 /* YAML */ ? result.join(", ") : result;
    await this.updatePropertyFromUi(property, newValue, file);
  }
  async persistAutoPropertyChoices(autoProp, values) {
    try {
      await this.plugin.updateSettings(() => {
        const list = this.plugin.settings.AutoProperties.properties;
        const idx = list.indexOf(autoProp) !== -1 ? list.indexOf(autoProp) : list.findIndex((a) => a.name === autoProp.name);
        if (idx === -1) return false;
        let updated = list[idx];
        for (const value of values) {
          updated = withChoiceAdded(updated, value);
        }
        if (updated === list[idx]) return false;
        const previous = list[idx];
        list[idx] = updated;
        return () => {
          if (list[idx] === updated) list[idx] = previous;
        };
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      new import_obsidian16.Notice(`MetaEdit could not save the Auto Property choice: ${reason}`);
      log.logMessage(`MetaEdit could not save Auto Property choices for '${autoProp.name}': ${reason}`);
    }
  }
  async updatePropertyInFile(property, newValue, file) {
    if (!property.key) return;
    if (property.type === 0 /* YAML */) this.assertWritableKey(property.key);
    await this.enqueueFileWrite(file, async () => {
      if (property.type === 0 /* YAML */) {
        await this.processFrontMatter(file, (frontmatter) => {
          if (property.path && property.path.length > 1) {
            setYamlPath(frontmatter, property.path, newValue, {
              createParents: false,
              createLeaf: false,
              expectedValue: property.content,
              validateExpectedValue: true
            });
          } else if (isTagsKey(property.key)) {
            const tags = splitFrontmatterTags(newValue);
            if (tags.length === 0) delete frontmatter[property.key];
            else frontmatter[property.key] = tags;
          } else {
            frontmatter[property.key] = newValue;
          }
        });
        return;
      }
      if (property.type === 2 /* Tag */) {
        await this.writeTagOccurrence(property, newValue, file);
        return;
      }
      if (property.type !== 1 /* Dataview */ || !property.key) return;
      const fileContent = await this.app.vault.read(file);
      const newFileContent = this.parser.replaceInlineFieldValuesInContent(fileContent, [
        { key: property.key, value: String(newValue) }
      ]);
      await this.app.vault.modify(file, newFileContent);
    });
  }
  /**
   * Rewrite one body-tag occurrence in place, by its parsed span. The span is
   * re-validated against current file content first, so an edit that raced a
   * change to the note refuses to write (with a Notice) rather than corrupt
   * unrelated text. `newValue` is the full replacement token computed by the UI.
   */
  async writeTagOccurrence(property, newValue, file) {
    const newToken = normalizeTagToken(String(newValue));
    if (!isValidTagToken(newToken)) {
      throw new Error(`'${String(newValue)}' is not a valid tag name.`);
    }
    const content = await this.app.vault.read(file);
    const updated = spliceTag(content, property.position, property.key ?? "", newToken);
    if (updated === null) {
      throw new Error(
        `could not locate the tag '${property.key}' to edit - the note may have changed since it was opened. Reopen and try again.`
      );
    }
    await this.app.vault.modify(file, updated);
  }
  escapeSpecialCharacters(text2) {
    return text2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  /**
   * Throw if `key` is a reserved object-machinery name that can never be written
   * as a frontmatter property (see {@link isReservedFrontmatterKey}). Centralizes
   * the refusal so every dynamic `frontmatter[key] = value` sink in the controller
   * - `addYamlProp`, `updatePropertyInFile`, `updateMultipleInFile` - fails closed
   * identically to the bulk editor's write boundary, instead of silently dropping
   * the change (or polluting the prototype) while reporting success.
   */
  assertWritableKey(key2) {
    if (isReservedFrontmatterKey(key2)) {
      throw new Error(`"${key2}" is a reserved property name and cannot be written to frontmatter.`);
    }
  }
  async updateMultipleInFile(properties, file) {
    for (const prop2 of properties) {
      if (prop2.type !== 0 /* YAML */) continue;
      if (prop2.path && prop2.path.length > 0) {
        for (const segment of prop2.path) {
          if (typeof segment === "string") this.assertWritableKey(segment);
        }
      } else {
        this.assertWritableKey(prop2.key);
      }
    }
    await this.enqueueFileWrite(file, async () => {
      const yamlProperties = properties.filter((prop2) => prop2.type === 0 /* YAML */ && !prop2.path);
      const yamlPathProperties = properties.filter((prop2) => prop2.type === 0 /* YAML */ && prop2.path);
      const tagProperties = properties.filter((prop2) => prop2.type === 2 /* Tag */);
      const textProperties = properties.filter((prop2) => prop2.type === 1 /* Dataview */ && prop2.key);
      if (tagProperties.length > 0) {
        let content = await this.app.vault.read(file);
        for (const prop2 of [...tagProperties].sort((a, b) => (b.position?.start ?? 0) - (a.position?.start ?? 0))) {
          const token = normalizeTagToken(String(prop2.content));
          if (!isValidTagToken(token)) {
            log.logMessage(`MetaEdit skipped tag '${prop2.key}': '${String(prop2.content)}' is not a valid tag.`);
            continue;
          }
          const updated = spliceTag(content, prop2.position, prop2.key, token);
          if (updated === null) {
            log.logMessage(`MetaEdit skipped tag '${prop2.key}': its position no longer matches the note.`);
            continue;
          }
          content = updated;
        }
        await this.app.vault.modify(file, content);
      }
      if (yamlProperties.length > 0 || yamlPathProperties.length > 0) {
        await this.processFrontMatter(file, (frontmatter) => {
          for (const prop2 of yamlProperties) {
            frontmatter[prop2.key] = prop2.content;
          }
          for (const prop2 of yamlPathProperties) {
            setYamlPath(frontmatter, prop2.path, prop2.content, { createParents: false, createLeaf: false });
          }
        });
      }
      if (textProperties.length > 0) {
        const content = await this.app.vault.read(file);
        const replacements = textProperties.map((prop2) => ({ key: prop2.key, value: String(prop2.content) }));
        await this.app.vault.modify(file, this.parser.replaceInlineFieldValuesInContent(content, replacements));
      }
    });
  }
  splitMultiValue(property) {
    return toValueArray(property.content);
  }
  async updatePropertyFromUi(property, newValue, file) {
    try {
      await this.updatePropertyInFile(property, newValue, file);
      return true;
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      new import_obsidian16.Notice(`MetaEdit could not update '${property.key}': ${reason}`);
      log.logMessage(`MetaEdit could not update '${property.key}': ${reason}`);
      return false;
    }
  }
  async updateNativeYamlPropertyFromUi(property, newValue, file) {
    try {
      if (property.type !== 0 /* YAML */ || property.path) {
        throw new Error("native Properties editing only supports top-level YAML frontmatter.");
      }
      this.assertWritableKey(property.key);
      await this.enqueueFileWrite(file, async () => {
        await this.processFrontMatter(file, (frontmatter) => {
          if (!Object.prototype.hasOwnProperty.call(frontmatter, property.key)) {
            throw new Error("current value changed before update.");
          }
          if (!frontmatterValuesEqual(frontmatter[property.key], property.content)) {
            throw new Error("current value changed before update.");
          }
          frontmatter[property.key] = newValue;
        });
      });
      return true;
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      new import_obsidian16.Notice(`MetaEdit could not update '${property.key}': ${reason}`);
      log.logMessage(`MetaEdit could not update '${property.key}': ${reason}`);
      return false;
    }
  }
  isYamlParentContainer(property) {
    if (property.type !== 0 /* YAML */ || property.isVirtual) return false;
    return isYamlParentContainerValue(property.content);
  }
  async getYamlPath(path, file) {
    const resolvedPath = parseYamlPath(path);
    const frontmatter = await this.parser.parseFrontmatterObject(file);
    if (!frontmatter) return void 0;
    try {
      return getYamlPath(frontmatter, resolvedPath);
    } catch (error) {
      if (error instanceof YamlPathError) return void 0;
      throw error;
    }
  }
  async updateYamlPath(path, value, file) {
    const resolvedPath = parseYamlPath(path);
    await this.enqueueFileWrite(file, async () => {
      await this.processFrontMatter(file, (frontmatter) => {
        setYamlPath(frontmatter, resolvedPath, value, { createParents: false, createLeaf: false });
      });
    });
  }
  async addOrUpdateYamlPath(path, value, file, options = {}) {
    const resolvedPath = parseYamlPath(path);
    const createParents = options.createParents ?? true;
    await this.enqueueFileWrite(file, async () => {
      await this.processFrontMatter(file, (frontmatter) => {
        setYamlPath(frontmatter, resolvedPath, value, { createParents });
      });
    });
  }
  /**
   * Run a `processFrontMatter` mutation serialized through this file's write
   * queue, so it interleaves safely with every other MetaEdit write to the same
   * file (the inline/tag `vault.read`+`vault.modify` paths in particular, which
   * Obsidian does NOT serialize against a bare `processFrontMatter`). This is the
   * queue-aware entry point for collaborators that compute and apply a frontmatter
   * change in one callback - e.g. the bulk editor - rather than reimplementing the
   * queue.
   *
   * Internal: reachable via the public `plugin.controller` but NOT part of the
   * `IMetaEditApi` contract; treat it as a controller-internal escape hatch. The
   * `update` callback runs at the top of the queue and MUST NOT itself enqueue
   * another write to the same file (e.g. call back into a queued controller
   * method), because that inner write would chain behind this one's still-pending
   * promise and deadlock.
   *
   * Because the callback assigns frontmatter keys directly, it does NOT pass
   * through `assertWritableKey`: the caller owns key validation. The only caller,
   * the bulk editor, already refuses reserved keys at its own boundaries
   * (`isReservedFrontmatterKey`); any new caller must do the same.
   */
  async enqueueFrontmatterWrite(file, update2) {
    await this.enqueueFileWrite(file, () => this.processFrontMatter(file, update2));
  }
  async processFrontMatter(file, update2) {
    await this.app.fileManager.processFrontMatter(file, update2);
  }
  async enqueueFileWrite(file, task) {
    const key2 = (0, import_obsidian16.normalizePath)(file.path);
    const previous = fileWriteQueues.get(key2) ?? Promise.resolve();
    const queued = previous.catch(() => void 0).then(task);
    fileWriteQueues.set(key2, queued);
    try {
      return await queued;
    } finally {
      if (fileWriteQueues.get(key2) === queued) {
        fileWriteQueues.delete(key2);
      }
    }
  }
};

// src/bulk/bulkMetadataEditor.ts
var import_obsidian18 = require("obsidian");

// src/bulk/BulkOptionModal.ts
var import_obsidian17 = require("obsidian");
var BulkOptionModal = class _BulkOptionModal extends import_obsidian17.Modal {
  constructor(app, config) {
    super(app);
    this.config = config;
    this.didChoose = false;
  }
  static Choose(app, config) {
    const modal = new _BulkOptionModal(app, config);
    const promise = new Promise((resolve) => {
      modal.resolvePromise = resolve;
    });
    modal.open();
    return promise;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("metaedit-bulk-modal");
    contentEl.createEl("h3", { text: this.config.title });
    if (this.config.description) {
      contentEl.createEl("p", {
        text: this.config.description,
        cls: "metaedit-bulk-modal-description"
      });
    }
    const list = contentEl.createDiv({ cls: "metaedit-bulk-options" });
    for (const option of this.config.options) {
      const button = list.createEl("button", { cls: "metaedit-bulk-option" });
      if (this.config.danger) button.addClass("mod-warning");
      button.createDiv({ cls: "metaedit-bulk-option-label", text: option.label });
      if (option.description) {
        button.createDiv({ cls: "metaedit-bulk-option-description", text: option.description });
      }
      button.addEventListener("click", () => this.choose(option.key));
    }
  }
  choose(key2) {
    this.didChoose = true;
    this.resolvePromise(key2);
    this.close();
  }
  onClose() {
    this.contentEl.empty();
    if (!this.didChoose) this.resolvePromise(null);
  }
};

// src/bulk/bulkMetadata.ts
function decideBulkWrite(args) {
  const { exists, currentValue, rawValue, policy: policy2, wrapInArray } = args;
  if (!exists) {
    const value = policy2 === "merge" ? [rawValue] : wrapScalar(rawValue, wrapInArray);
    return { action: "write", value, outcome: "added" };
  }
  switch (policy2) {
    case "skip":
      return { action: "skip", outcome: "skipped" };
    case "overwrite": {
      const next2 = wrapScalar(rawValue, wrapInArray);
      if (valuesEqual(currentValue, next2)) {
        return { action: "skip", outcome: "unchanged" };
      }
      return { action: "write", value: next2, outcome: "overwritten" };
    }
    case "merge": {
      if (isPlainObject(currentValue)) {
        return { action: "skip", outcome: "skipped" };
      }
      const merged = uniqueConcat(toArray(currentValue), [rawValue]);
      if (valuesEqual(currentValue, merged)) {
        return { action: "skip", outcome: "unchanged" };
      }
      return { action: "write", value: merged, outcome: "merged" };
    }
    default:
      return { action: "skip", outcome: "skipped" };
  }
}
function emptySummary(total) {
  return {
    total,
    added: 0,
    merged: 0,
    overwritten: 0,
    skipped: 0,
    unchanged: 0,
    failed: 0,
    failures: []
  };
}
function recordOutcome(summary, outcome) {
  summary[outcome] += 1;
}
function formatSummary(summary, key2) {
  const parts = [];
  const add = (n, label) => {
    if (n > 0) parts.push(`${n} ${label}`);
  };
  add(summary.added, "added");
  add(summary.merged, "merged");
  add(summary.overwritten, "overwritten");
  add(summary.skipped, "skipped");
  add(summary.unchanged, "unchanged");
  add(summary.failed, "failed");
  const noteWord = summary.total === 1 ? "note" : "notes";
  const detail = parts.length > 0 ? parts.join(", ") : "no changes";
  const failureHint = summary.failed > 0 ? " (see console for failed notes)" : "";
  return `MetaEdit bulk "${key2}": ${detail} across ${summary.total} ${noteWord}.${failureHint}`;
}
function wrapScalar(rawValue, wrapInArray) {
  return wrapInArray ? [rawValue] : rawValue;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function toArray(value) {
  if (Array.isArray(value)) return value.slice();
  if (value === null || value === void 0) return [];
  return [value];
}
function uniqueConcat(base, additions) {
  const seen = new Set(base.map(dedupeKey));
  const out = base.slice();
  for (const candidate of additions) {
    const key2 = dedupeKey(candidate);
    if (!seen.has(key2)) {
      seen.add(key2);
      out.push(candidate);
    }
  }
  return out;
}
function valuesEqual(a, b) {
  return stableStringify(a) === stableStringify(b);
}
function dedupeKey(value) {
  if (value !== null && typeof value === "object") {
    return `o:${stableStringify(value)}`;
  }
  return `s:${String(value)}`;
}
function stableStringify(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value) ?? "null";
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const record = value;
  const keys = Object.keys(record).sort();
  const entries = keys.map((key2) => `${JSON.stringify(key2)}:${stableStringify(record[key2])}`);
  return `{${entries.join(",")}}`;
}

// src/bulk/bulkMetadataEditor.ts
var BulkMetadataEditor = class {
  constructor(app, plugin) {
    this.app = app;
    this.plugin = plugin;
  }
  /** Recursively collect markdown files within a folder. */
  collectFromFolder(folder) {
    return this.dedupeByPath(this.markdownFilesIn(folder));
  }
  /**
   * Collect markdown files from an arbitrary selection of files and folders
   * (e.g. a multi-selection in the file explorer), expanding folders and
   * dropping duplicates so a file reached two ways is only edited once.
   */
  collectFromSelection(files) {
    const collected = [];
    for (const file of files) {
      if (file instanceof import_obsidian18.TFile) {
        if (file.extension === "md") collected.push(file);
      } else if (file instanceof import_obsidian18.TFolder) {
        collected.push(...this.markdownFilesIn(file));
      }
    }
    return this.dedupeByPath(collected);
  }
  /**
   * Run the full interactive flow: prompt for the property name and value,
   * choose a conflict policy when some notes already have the key, confirm
   * destructive overwrites, apply, and report a single summary Notice.
   */
  async run(files, scopeLabel) {
    if (files.length === 0) {
      new import_obsidian18.Notice("MetaEdit: no markdown notes to edit here.");
      return;
    }
    const noteWord = files.length === 1 ? "note" : "notes";
    const key2 = (await GenericPrompt.Prompt(
      this.app,
      `Property to add/update across ${files.length} ${noteWord} in ${scopeLabel}`,
      "Property name"
    ).catch(() => null))?.trim();
    if (!key2) return;
    if (isReservedFrontmatterKey(key2)) {
      new import_obsidian18.Notice(`MetaEdit: "${key2}" is a reserved property name and can't be used.`);
      return;
    }
    const rawValue = await GenericPrompt.Prompt(this.app, `Value for "${key2}"`, "Value").catch(
      () => null
    );
    if (!rawValue) return;
    const conflicts = await this.countExisting(files, key2);
    let policy2 = "skip";
    if (conflicts > 0) {
      const conflictWord = conflicts === 1 ? "note" : "notes";
      const conflictVerb = conflicts === 1 ? "has" : "have";
      const choice = await BulkOptionModal.Choose(this.app, {
        title: `${conflicts} ${conflictWord} already ${conflictVerb} "${key2}"`,
        description: "Choose how to handle notes that already define this property.",
        options: [
          {
            key: "skip",
            label: "Skip notes that already have it",
            description: "Only add the property where it is missing. Nothing is overwritten."
          },
          {
            key: "merge",
            label: "Merge into a list",
            description: `Add "${rawValue}" to the existing value(s) as a list, without duplicating.`
          },
          {
            key: "overwrite",
            label: "Overwrite existing values",
            description: "Replace the current value. This cannot be undone."
          }
        ]
      });
      if (!choice) return;
      policy2 = choice;
      if (policy2 === "overwrite") {
        const confirm = await BulkOptionModal.Choose(this.app, {
          title: `Overwrite "${key2}" across ${files.length} ${noteWord}?`,
          description: "Existing values will be replaced wherever the property is present. Bulk edits cannot be undone with Ctrl+Z.",
          danger: true,
          options: [{ key: "yes", label: "Overwrite" }]
        });
        if (confirm !== "yes") return;
      }
    }
    const summary = await this.apply(files, key2, rawValue, policy2);
    new import_obsidian18.Notice(formatSummary(summary, key2), 1e4);
  }
  /** Apply the property to every note, isolating per-note failures. */
  async apply(files, key2, rawValue, policy2) {
    this.assertWritableKey(key2);
    const wrapInArray = this.wrapInArrayFor(key2);
    const summary = emptySummary(files.length);
    for (const file of files) {
      try {
        const outcome = await this.applyToFile(file, key2, rawValue, policy2, wrapInArray);
        recordOutcome(summary, outcome);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        summary.failed += 1;
        summary.failures.push({ path: file.path, error: message });
      }
    }
    if (summary.failures.length > 0) {
      console.warn(
        `MetaEdit bulk: failed to update ${summary.failures.length} note(s) for "${key2}":`,
        summary.failures
      );
    }
    return summary;
  }
  async applyToFile(file, key2, rawValue, policy2, wrapInArray) {
    this.assertWritableKey(key2);
    let outcome = "skipped";
    await this.plugin.controller.enqueueFrontmatterWrite(file, (frontmatter) => {
      const exists = Object.prototype.hasOwnProperty.call(frontmatter, key2);
      const decision = decideBulkWrite({
        exists,
        currentValue: frontmatter[key2],
        rawValue,
        policy: policy2,
        wrapInArray
      });
      outcome = decision.outcome;
      if (decision.action === "write") {
        frontmatter[key2] = decision.value;
      }
    });
    return outcome;
  }
  markdownFilesIn(folder) {
    const files = [];
    for (const child2 of folder.children) {
      if (child2 instanceof import_obsidian18.TFile) {
        if (child2.extension === "md") files.push(child2);
      } else if (child2 instanceof import_obsidian18.TFolder) {
        files.push(...this.markdownFilesIn(child2));
      }
    }
    return files;
  }
  dedupeByPath(files) {
    const byPath = /* @__PURE__ */ new Map();
    for (const file of files) {
      if (!byPath.has(file.path)) byPath.set(file.path, file);
    }
    return [...byPath.values()];
  }
  async countExisting(files, key2) {
    let count = 0;
    for (const file of files) {
      const frontmatter = await this.readLiveFrontmatter(file);
      if (frontmatter && Object.prototype.hasOwnProperty.call(frontmatter, key2)) count += 1;
    }
    return count;
  }
  async readLiveFrontmatter(file) {
    const content = await this.app.vault.cachedRead(file);
    const lines = content.split(/\r?\n/);
    const firstLine = (lines[0] ?? "").replace(/^\uFEFF/, "");
    if (!/^---\s*$/.test(firstLine)) return null;
    const end = lines.findIndex((line, index2) => index2 > 0 && /^(?:---|\.\.\.)\s*$/.test(line));
    if (end === -1) return null;
    let parsed;
    try {
      parsed = (0, import_obsidian18.parseYaml)(lines.slice(1, end).join("\n"));
    } catch {
      return null;
    }
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed;
  }
  /**
   * Throw if `key` is a reserved object-machinery name that cannot be written as
   * a frontmatter property (see `isReservedFrontmatterKey`). Centralizes the
   * refusal so the public `apply` boundary and the `applyToFile` write boundary
   * reject identically.
   */
  assertWritableKey(key2) {
    if (isReservedFrontmatterKey(key2)) {
      throw new Error(`"${key2}" is a reserved property name and cannot be written to frontmatter.`);
    }
  }
  wrapInArrayFor(key2) {
    const { mode, properties } = this.plugin.settings.EditMode;
    return mode === "All Multi" /* AllMulti */ || mode === "Some Multi" /* SomeMulti */ && properties.includes(key2);
  }
};

// src/Settings/defaultSettings.ts
var DEFAULT_SETTINGS = Object.freeze({
  ProgressProperties: {
    enabled: false,
    properties: []
  },
  IgnoredProperties: {
    enabled: false,
    properties: [],
    hideFileTags: false
  },
  AutoProperties: {
    enabled: false,
    properties: []
  },
  EditMode: {
    mode: "All Single" /* AllSingle */,
    properties: []
  },
  KanbanHelper: {
    enabled: false,
    boards: []
  },
  UIElements: {
    enabled: true
  }
});

// src/Settings/settingsMigration.ts
function isPlainObject2(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function mergeSettings(loaded) {
  const defaults = structuredClone(DEFAULT_SETTINGS);
  const stored = loaded ?? {};
  const merged = { ...stored };
  for (const key2 of Object.keys(defaults)) {
    const def = defaults[key2];
    const value = stored[key2];
    merged[key2] = isPlainObject2(def) && isPlainObject2(value) ? { ...def, ...value } : def;
  }
  return merged;
}
function migrateIgnoredProperties(loaded, settings) {
  const rawIgnored = loaded?.IgnoredProperties;
  const isPreVersionData = isPlainObject2(rawIgnored) && rawIgnored.hideFileTags === void 0;
  if (!isPreVersionData) return false;
  const ignored = settings.IgnoredProperties;
  if (!ignored.enabled && ignored.properties.length > 0) {
    ignored.enabled = true;
  }
  return true;
}

// src/Modals/LinkMenu.ts
var import_obsidian19 = require("obsidian");
var LinkMenu = class {
  constructor(plugin) {
    this.plugin = plugin;
  }
  registerEvent() {
    this.eventRef = this.plugin.app.workspace.on(
      "file-menu",
      (menu, file, source2) => this.onMenuOpenCallback(menu, file, source2)
    );
    this.plugin.registerEvent(this.eventRef);
    this.filesEventRef = this.plugin.app.workspace.on(
      "files-menu",
      (menu, files, source2) => this.onFilesMenuOpenCallback(menu, files, source2)
    );
    this.plugin.registerEvent(this.filesEventRef);
  }
  unregisterEvent() {
    if (this.eventRef) {
      this.plugin.app.workspace.offref(this.eventRef);
    }
    if (this.filesEventRef) {
      this.plugin.app.workspace.offref(this.filesEventRef);
    }
  }
  onMenuOpenCallback(menu, file, source2) {
    const bCorrectSource = source2 === "link-context-menu" || source2 === "calendar-context-menu" || source2 == "file-explorer-context-menu";
    if (bCorrectSource) {
      if (file instanceof import_obsidian19.TFile && file.extension === "md") {
        this.targetFile = file;
        this.addFileOptions(menu);
      }
      if (file instanceof import_obsidian19.TFolder && this.folderHasMarkdown(file)) {
        this.targetFolder = file;
        this.addFolderOptions(menu);
      }
    }
  }
  onFilesMenuOpenCallback(menu, files, source2) {
    if (source2 !== "file-explorer-context-menu") return;
    if (!Array.isArray(files) || files.length === 0) return;
    const hasMarkdown = files.some((f) => f instanceof import_obsidian19.TFile && f.extension === "md" || f instanceof import_obsidian19.TFolder && this.folderHasMarkdown(f));
    if (!hasMarkdown) return;
    menu.addItem((item) => {
      item.setIcon("pencil");
      item.setTitle("Bulk edit metadata in selected notes");
      item.onClick(async () => {
        await this.plugin.runBulkEditForSelection(files);
      });
    });
  }
  // The bulk flow recurses into subfolders, so the menu must appear whenever a
  // folder contains markdown at any depth - not only as a direct child.
  folderHasMarkdown(folder) {
    return folder.children?.some((child2) => child2 instanceof import_obsidian19.TFile && child2.extension === "md" || child2 instanceof import_obsidian19.TFolder && this.folderHasMarkdown(child2)) ?? false;
  }
  addFileOptions(menu) {
    menu.addItem((item) => {
      item.setIcon("pencil");
      item.setTitle("Edit Meta");
      item.onClick(async () => {
        await this.plugin.runMetaEditForFile(this.targetFile);
      });
    });
  }
  addFolderOptions(menu) {
    menu.addItem((item) => {
      item.setIcon("pencil");
      item.setTitle("Bulk edit metadata in this folder (and subfolders)");
      item.onClick(async () => {
        await this.plugin.runMetaEditForFolder(this.targetFolder);
      });
    });
  }
};

// src/MetaEditApi.ts
var import_obsidian20 = require("obsidian");
var MetaEditApi = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.parser = new MetaEditParser(plugin.app);
  }
  make() {
    return {
      autoprop: this.getAutopropFunction(),
      update: this.getUpdateFunction(),
      getPropertyValue: this.getGetPropertyValueFunction(),
      getFilesWithProperty: this.getGetFilesWithPropertyFunction(),
      createYamlProperty: this.getCreateYamlPropertyFunction(),
      addOrUpdateProperty: this.getAddOrUpdatePropertyFunction(),
      appendDataviewField: this.getAppendDataviewFieldFunction(),
      getYamlPath: this.getGetYamlPathFunction(),
      updateYamlPath: this.getUpdateYamlPathFunction(),
      addOrUpdateYamlPath: this.getAddOrUpdateYamlPathFunction(),
      getPropertiesInFile: this.getGetPropertiesInFile(),
      getAutoProperties: this.getGetAutoPropertiesFunction(),
      setAutoProperties: this.getSetAutoPropertiesFunction(),
      onMetadataChange: this.getOnMetadataChangeFunction()
    };
  }
  getAutopropFunction() {
    return (propertyName) => this.plugin.controller.handleAutoProperties(propertyName);
  }
  getUpdateFunction() {
    return async (propertyName, propertyValue, file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      const targetProperty = await this.getPropertyInFile(propertyName, targetFile);
      if (!targetProperty) return;
      return this.plugin.controller.updatePropertyInFile(targetProperty, propertyValue, targetFile);
    };
  }
  getFileFromTFileOrPath(file) {
    let targetFile;
    if (file instanceof import_obsidian20.TFile)
      targetFile = file;
    if (typeof file === "string") {
      const abstractFile = this.plugin.app.vault.getAbstractFileByPath(file);
      if (abstractFile instanceof import_obsidian20.TFile) {
        targetFile = abstractFile;
      }
    }
    return targetFile;
  }
  getGetPropertyValueFunction() {
    return async (propertyName, file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      const targetProperty = await this.getPropertyInFile(propertyName, targetFile);
      if (!targetProperty) return;
      return targetProperty.content;
    };
  }
  getGetFilesWithPropertyFunction() {
    return (propertyName) => {
      return this.plugin.getFilesWithProperty(propertyName);
    };
  }
  getCreateYamlPropertyFunction() {
    return async (propertyName, propertyValue, file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      await this.plugin.controller.addYamlProp(propertyName, propertyValue, targetFile);
    };
  }
  getAddOrUpdatePropertyFunction() {
    return async (propertyName, propertyValue, file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      const targetProperty = await this.getPropertyInFile(propertyName, targetFile);
      if (targetProperty) {
        await this.plugin.controller.updatePropertyInFile(targetProperty, propertyValue, targetFile);
        return;
      }
      await this.plugin.controller.updatePropertyInFile({
        key: propertyName,
        type: 0 /* YAML */
      }, propertyValue, targetFile);
    };
  }
  getAppendDataviewFieldFunction() {
    return async (propertyName, propertyValue, file, options) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      await this.plugin.controller.appendDataviewField(propertyName, propertyValue, targetFile, options);
    };
  }
  getGetYamlPathFunction() {
    return async (path, file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      return await this.plugin.controller.getYamlPath(path, targetFile);
    };
  }
  getUpdateYamlPathFunction() {
    return async (path, propertyValue, file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      await this.plugin.controller.updateYamlPath(path, propertyValue, targetFile);
    };
  }
  getAddOrUpdateYamlPathFunction() {
    return async (path, propertyValue, file, options) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return;
      await this.plugin.controller.addOrUpdateYamlPath(path, propertyValue, targetFile, options);
    };
  }
  getGetPropertiesInFile() {
    return async (file) => {
      const targetFile = this.getFileFromTFileOrPath(file);
      if (!targetFile) return [];
      return await this.plugin.controller.getPropertiesInFile(targetFile);
    };
  }
  getGetAutoPropertiesFunction() {
    return () => {
      return this.cloneAutoProperties(this.plugin.settings.AutoProperties.properties);
    };
  }
  getSetAutoPropertiesFunction() {
    return async (autoProperties) => {
      const nextAutoProperties = this.validateAutoProperties(autoProperties);
      await this.plugin.updateSettings(() => {
        const previousAutoProperties = this.plugin.settings.AutoProperties.properties;
        this.plugin.settings.AutoProperties.properties = nextAutoProperties;
        return () => {
          if (this.plugin.settings.AutoProperties.properties === nextAutoProperties) {
            this.plugin.settings.AutoProperties.properties = previousAutoProperties;
          }
        };
      });
    };
  }
  getOnMetadataChangeFunction() {
    return (callback) => {
      let unsubscribed = false;
      const previousPropertiesByPath = /* @__PURE__ */ new Map();
      const eventQueues = /* @__PURE__ */ new Map();
      const handleChange = async (file, data, cache) => {
        if (unsubscribed) return;
        const previousProperties = previousPropertiesByPath.get(file.path) ?? null;
        const properties = this.cloneProperties(this.getPropertiesFromEvent(data, cache));
        if (unsubscribed) return;
        if (previousProperties && this.propertiesSignature(previousProperties) === this.propertiesSignature(properties)) {
          return;
        }
        previousPropertiesByPath.set(file.path, this.cloneProperties(properties));
        try {
          await callback({
            file,
            data,
            cache,
            properties: this.cloneProperties(properties),
            previousProperties: previousProperties ? this.cloneProperties(previousProperties) : null
          });
        } catch (error) {
          console.error("MetaEdit metadata change callback failed.", error);
        }
      };
      const eventRef = this.plugin.app.metadataCache.on("changed", (file, data, cache) => {
        const previousTask = eventQueues.get(file.path) ?? Promise.resolve();
        const queuedTask = previousTask.catch(() => void 0).then(() => handleChange(file, data, cache));
        eventQueues.set(file.path, queuedTask);
        void queuedTask.finally(() => {
          if (eventQueues.get(file.path) === queuedTask) {
            eventQueues.delete(file.path);
          }
        });
      });
      const deletedEventRef = this.plugin.app.metadataCache.on("deleted", (file) => {
        previousPropertiesByPath.delete(file.path);
        eventQueues.delete(file.path);
      });
      const renameEventRef = this.plugin.app.vault.on("rename", (file, oldPath) => {
        if (!(file instanceof import_obsidian20.TFile)) return;
        const previousProperties = previousPropertiesByPath.get(oldPath);
        previousPropertiesByPath.delete(oldPath);
        if (previousProperties) {
          previousPropertiesByPath.set(file.path, previousProperties);
        }
      });
      const unsubscribe = () => {
        if (unsubscribed) return;
        unsubscribed = true;
        previousPropertiesByPath.clear();
        eventQueues.clear();
        this.plugin.app.metadataCache.offref(eventRef);
        this.plugin.app.metadataCache.offref(deletedEventRef);
        this.plugin.app.vault.offref(renameEventRef);
      };
      this.plugin.register(unsubscribe);
      return unsubscribe;
    };
  }
  async getPropertyInFile(propertyName, file) {
    const propsInFile = await this.plugin.controller.getPropertiesInFile(file);
    return propsInFile.find((prop2) => prop2.key === propertyName && !prop2.isVirtual) ?? propsInFile.find((prop2) => prop2.key === propertyName && prop2.isVirtual && prop2.type === 0 /* YAML */);
  }
  cloneAutoProperties(autoProperties) {
    return autoProperties.map((autoProperty) => {
      const clone2 = {
        name: autoProperty.name,
        choices: [...autoProperty.choices]
      };
      if (autoProperty.description !== void 0) clone2.description = autoProperty.description;
      if (autoProperty.type !== void 0) clone2.type = autoProperty.type;
      return clone2;
    });
  }
  validateAutoProperties(autoProperties) {
    if (!Array.isArray(autoProperties)) {
      throw new TypeError("Auto Properties must be an array.");
    }
    return autoProperties.map((autoProperty, index2) => {
      if (!autoProperty || typeof autoProperty !== "object") {
        throw new TypeError(`Auto Property at index ${index2} must be an object.`);
      }
      if (!Array.isArray(autoProperty.choices) || !autoProperty.choices.every((choice) => typeof choice === "string")) {
        throw new TypeError(`Auto Property at index ${index2} choices must be an array of strings.`);
      }
      if (typeof autoProperty.name !== "string") {
        throw new TypeError(`Auto Property at index ${index2} must have a string name.`);
      }
      if (autoProperty.description !== void 0 && typeof autoProperty.description !== "string") {
        throw new TypeError(`Auto Property at index ${index2} description must be a string.`);
      }
      if (autoProperty.type !== void 0 && autoProperty.type !== "Single" && autoProperty.type !== "Multi") {
        throw new TypeError(`Auto Property at index ${index2} type must be "Single" or "Multi".`);
      }
      const validated = {
        name: autoProperty.name,
        choices: [...autoProperty.choices]
      };
      if (autoProperty.description !== void 0) validated.description = autoProperty.description;
      if (autoProperty.type !== void 0) validated.type = autoProperty.type;
      return validated;
    });
  }
  cloneProperties(properties) {
    return properties.map((property) => {
      const clone2 = {
        key: property.key,
        type: property.type,
        content: this.cloneValue(property.content)
      };
      if (property.path) clone2.path = [...property.path];
      if (property.rootKey !== void 0) clone2.rootKey = property.rootKey;
      if (property.isNested !== void 0) clone2.isNested = property.isNested;
      if (property.isVirtual !== void 0) clone2.isVirtual = property.isVirtual;
      return clone2;
    });
  }
  getPropertiesFromEvent(data, cache) {
    return [
      ...this.getTagsFromCache(cache),
      ...this.parser.parseFrontmatterCache(cache),
      ...this.parser.parseInlineContent(data)
    ];
  }
  getTagsFromCache(cache) {
    return (cache.tags ?? []).map((tag2) => ({
      key: tag2.tag,
      content: tag2.tag,
      type: 2 /* Tag */
    }));
  }
  cloneValue(value) {
    if (value instanceof Date) {
      return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
      return value.map((item) => this.cloneValue(item));
    }
    if (value && typeof value === "object") {
      const clone2 = {};
      for (const [key2, item] of Object.entries(value)) {
        Object.defineProperty(clone2, key2, {
          value: this.cloneValue(item),
          enumerable: true,
          configurable: true,
          writable: true
        });
      }
      return clone2;
    }
    return value;
  }
  propertiesSignature(properties) {
    return JSON.stringify(properties.map((property) => ({
      key: property.key,
      type: property.type,
      content: property.content,
      path: property.path,
      rootKey: property.rootKey,
      isNested: property.isNested,
      isVirtual: property.isVirtual
    })));
  }
};

// src/utility.ts
var import_obsidian21 = require("obsidian");
function getActiveMarkdownFile(app) {
  const activeFile = app.workspace.getActiveFile();
  const activeMarkdownFile = abstractFileToMarkdownTFile(activeFile);
  if (!activeMarkdownFile) {
    log.logMessage("MetaEdit: no active markdown file.");
    return null;
  }
  return activeMarkdownFile;
}
function abstractFileToMarkdownTFile(file) {
  if (file instanceof import_obsidian21.TFile && file.extension === "md")
    return file;
  return null;
}

// src/logger/logger.ts
var MetaEditLogger = class {
  formatOutputString(error) {
    return `MetaEdit: (${error.level}) ${error.message}`;
  }
  getMetaEditError(message, level) {
    return { message, level, time: Date.now() };
  }
};

// src/logger/consoleErrorLogger.ts
var ConsoleErrorLogger = class extends MetaEditLogger {
  constructor() {
    super(...arguments);
    this.ErrorLog = [];
  }
  logError(errorMsg) {
    const error = this.getMetaEditError(errorMsg, "ERROR" /* Error */);
    this.addMessageToErrorLog(error);
    console.error(this.formatOutputString(error));
  }
  logWarning(warningMsg) {
    const warning = this.getMetaEditError(warningMsg, "WARNING" /* Warning */);
    this.addMessageToErrorLog(warning);
    console.warn(this.formatOutputString(warning));
  }
  logMessage(logMsg) {
    const log2 = this.getMetaEditError(logMsg, "LOG" /* Log */);
    this.addMessageToErrorLog(log2);
    console.log(this.formatOutputString(log2));
  }
  addMessageToErrorLog(error) {
    this.ErrorLog.push(error);
  }
};

// src/logger/guiLogger.ts
var import_obsidian22 = require("obsidian");
var GuiLogger = class extends MetaEditLogger {
  constructor(plugin) {
    super();
    this.plugin = plugin;
  }
  logError(msg) {
    const error = this.getMetaEditError(msg, "ERROR" /* Error */);
    new import_obsidian22.Notice(this.formatOutputString(error));
  }
  logWarning(msg) {
    const warning = this.getMetaEditError(msg, "WARNING" /* Warning */);
    new import_obsidian22.Notice(this.formatOutputString(warning));
  }
  logMessage(_msg) {
  }
};

// src/uniqueQueue.ts
var UniqueQueue = class {
  constructor() {
    this.elements = [];
  }
  enqueue(item) {
    if (this.elements.find((i) => i === item)) {
      return false;
    }
    this.elements.push(item);
    return true;
  }
  dequeue() {
    return this.elements.shift();
  }
  peek() {
    return this.elements[0];
  }
  isEmpty() {
    return this.elements.length === 0;
  }
  length() {
    return this.elements.length;
  }
};

// src/automators/onFileModifyAutomatorManager.ts
var import_obsidian23 = require("obsidian");

// src/updatedFileCache.ts
var UpdatedFileCache = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  get(key2) {
    return this.map.get(key2);
  }
  set(key2, content) {
    if (this.map.has(key2) && this.map.get(key2).content === content)
      return false;
    this.map.set(key2, { content, updateTime: Date.now() });
    this.clean();
    return true;
  }
  delete(key2) {
    this.map.delete(key2);
  }
  clean() {
    const five_minutes = 3e5;
    this.map.forEach((item, key2) => {
      if (item.updateTime < Date.now() - five_minutes) {
        this.delete(key2);
      }
    });
  }
};

// src/automators/onFileModifyAutomatorManager.ts
var OnFileModifyAutomatorManager = class {
  constructor(plugin) {
    this.updateFileQueue = new UniqueQueue();
    this.updatedFileCache = new UpdatedFileCache();
    this.automators = [];
    this.notifyDelay = 5e3;
    this.notifyAutomators = (0, import_obsidian23.debounce)(async () => {
      while (!this.updateFileQueue.isEmpty()) {
        const file = this.updateFileQueue.dequeue();
        for (const automator of this.automators) {
          await automator.onFileModify(file);
        }
      }
    }, this.notifyDelay, true);
    this.plugin = plugin;
    this.app = plugin.app;
  }
  startAutomators() {
    this.plugin.registerEvent(
      this.plugin.app.vault.on("modify", (file) => this.onFileModify(file))
    );
    return this;
  }
  attach(automator) {
    const isExist = this.automators.some((tAuto) => tAuto.type === automator.type);
    if (isExist) {
      log.logWarning(`a ${automator.type} automator is already attached.`);
      return this;
    }
    this.automators.push(automator);
    return this;
  }
  detach(automatorType) {
    const automatorIndex = this.automators.findIndex((automator) => automator.type === automatorType);
    if (automatorIndex === -1) {
      log.logMessage(`automator of type '${automatorType}' does not exist.`);
      return this;
    }
    this.automators.splice(automatorIndex, 1);
    return this;
  }
  async onFileModify(file) {
    const outfile = abstractFileToMarkdownTFile(file);
    if (!outfile) return;
    const metadata = await this.app.metadataCache.getFileCache(outfile);
    if (metadata?.frontmatter != null) {
      const keys = Object.keys(metadata.frontmatter);
      if (keys && keys.some((key2) => key2.toLowerCase().contains("excalidraw"))) {
        return;
      }
      const fileContent = await this.app.vault.cachedRead(outfile);
      if (!this.updatedFileCache.set(outfile.path, fileContent)) return;
      if (this.updateFileQueue.enqueue(outfile)) {
        this.notifyAutomators();
      }
    }
  }
};

// src/settingsWrites.ts
var SettingsWriter = class {
  /**
   * @param flush Persist the current in-memory settings to disk. Invoked only at the
   * head of the queue, so it never overlaps another flush.
   */
  constructor(flush) {
    this.flush = flush;
    this.tail = Promise.resolve();
  }
  /** Flush the current settings, serialized with every other settings write. */
  save() {
    return this.enqueue(() => this.flush());
  }
  /**
   * Atomically read-modify-write the settings. `mutate` runs at the head of the
   * queue - so it observes the freshest settings and no other writer can interleave
   * between its read and the flush - then the change is persisted.
   *
   * `mutate` is intentionally SYNCHRONOUS: it applies its change in place and returns
   * a {@link SettingsMutationResult}. Keeping it synchronous is what makes this queue
   * deadlock-free - a mutation can never await a nested settings write while already
   * holding the queue.
   */
  update(mutate2) {
    return this.enqueue(async () => {
      const rollback = mutate2();
      if (rollback === false) return;
      try {
        await this.flush();
      } catch (error) {
        if (typeof rollback === "function") rollback();
        throw error;
      }
    });
  }
  enqueue(task) {
    const queued = this.tail.catch(() => void 0).then(task);
    this.tail = queued.catch(() => void 0);
    return queued;
  }
};

// src/automators/onFileModifyAutomators/kanbanHelper.ts
var import_obsidian24 = require("obsidian");

// src/automators/onFileModifyAutomators/onFileModifyAutomator.ts
var OnFileModifyAutomator = class {
  constructor(plugin, type) {
    this.plugin = plugin;
    this.app = plugin.app;
    this.type = type;
  }
};

// src/automators/onFileModifyAutomators/kanbanHelper.ts
var CARD_LINK_PREFIX = /^-\s+\[[^\]]?\]\s+$/;
var KanbanHelper = class extends OnFileModifyAutomator {
  get boards() {
    return this.plugin.settings.KanbanHelper.boards;
  }
  constructor(plugin) {
    super(plugin, "KanbanHelper" /* KanbanHelper */);
  }
  async onFileModify(file) {
    const targetBoard = this.findBoardByName(file.basename);
    if (!targetBoard) return;
    const kanbanBoardFileCache = this.app.metadataCache.getFileCache(file);
    if (!kanbanBoardFileCache?.links) return;
    const kanbanBoardFileContent = await this.app.vault.cachedRead(file);
    const boardLines = kanbanBoardFileContent.split("\n");
    const laneForLine = this.buildLaneResolver(kanbanBoardFileCache.headings);
    await this.updateFilesInBoard(kanbanBoardFileCache.links, targetBoard, file.path, boardLines, laneForLine);
  }
  findBoardByName(boardName) {
    return this.boards.find((board) => board.boardName === boardName);
  }
  async updateFilesInBoard(links, board, sourcePath, boardLines, laneForLine) {
    for (const link2 of links) {
      try {
        if (!this.isCardLink(link2, boardLines)) continue;
        const lane = laneForLine(link2.position.start.line);
        if (!lane) continue;
        const linkFile = this.resolveLinkFile(link2, sourcePath);
        if (!this.isMarkdownFile(linkFile)) {
          log.logMessage(`${link2.link} is not updatable for the KanbanHelper.`);
          continue;
        }
        await this.updateFileInBoard(linkFile, board, lane);
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        log.logMessage(`KanbanHelper could not update '${link2.link}': ${reason}`);
      }
    }
  }
  // A card link is the leading link of a top-level task line. We verify against the
  // freshly-read board content that the cached link still sits at its recorded
  // position with its recorded text; on a mismatch (the card moved or changed since
  // the cache was built) the link is skipped rather than acted on with stale data.
  // This validates the link's own identity only; it does not reconcile a lane
  // heading that was renamed in place while the cache lagged (a transient state the
  // 5s modify debounce makes negligible and that self-corrects on the next edit).
  isCardLink(link2, boardLines) {
    const start = link2.position?.start;
    if (!start) return false;
    const line = boardLines[start.line];
    if (line === void 0) return false;
    if (!line.slice(start.col).startsWith(link2.original)) return false;
    return CARD_LINK_PREFIX.test(line.slice(0, start.col));
  }
  // Map any line to its lane: the text of the nearest heading at or above it.
  // Headings come from the metadata cache so ATX-closed ("## Done ##") and
  // setext headings resolve to their clean lane name, matching Obsidian.
  buildLaneResolver(headings) {
    const orderedHeadings = (headings ?? []).slice().sort((a, b) => a.position.start.line - b.position.start.line);
    return (line) => {
      let lane = null;
      for (const heading of orderedHeadings) {
        if (heading.position.start.line > line) break;
        lane = heading.heading;
      }
      return lane;
    };
  }
  async updateFileInBoard(linkFile, board, lane) {
    const fileProperties = await this.plugin.controller.getPropertiesInFile(linkFile);
    const targetProperty = fileProperties.find((prop2) => prop2.key === board.property && !prop2.isVirtual);
    if (!targetProperty) {
      const message = `'${board.property}' not found in "${linkFile.basename}" (Kanban board '${board.boardName}').`;
      log.logWarning(message);
      return;
    }
    const propertyHasChanged = targetProperty.content !== lane;
    if (propertyHasChanged) {
      console.debug(`Updating ${targetProperty.key} of file ${linkFile.name} to ${lane}`);
      await this.plugin.controller.updatePropertyInFile(targetProperty, lane, linkFile);
    }
  }
  resolveLinkFile(link2, sourcePath) {
    const linkpath = this.normalizeLinkpath(link2?.link);
    if (!linkpath) return null;
    const candidates = this.buildLinkpathCandidates(linkpath);
    const resolvedFromCache = this.resolveByMetadataCache(candidates, sourcePath);
    if (resolvedFromCache) return resolvedFromCache;
    const resolvedByPath = this.resolveByPathCandidates(candidates);
    if (resolvedByPath) return resolvedByPath;
    return this.resolveByBasenameCandidates(candidates);
  }
  normalizeLinkpath(link2) {
    if (!link2) return null;
    let normalized = link2;
    try {
      normalized = decodeURIComponent(normalized);
    } catch {
    }
    normalized = normalized.replace(/^\/+/, "");
    normalized = (0, import_obsidian24.normalizePath)(normalized);
    return (0, import_obsidian24.getLinkpath)(normalized);
  }
  buildLinkpathCandidates(linkpath) {
    const withoutExtension = this.stripMarkdownExtension(linkpath);
    return Array.from(/* @__PURE__ */ new Set([linkpath, withoutExtension]));
  }
  stripMarkdownExtension(path) {
    return path.toLowerCase().endsWith(".md") ? path.slice(0, -3) : path;
  }
  ensureMarkdownExtension(path) {
    return path.toLowerCase().endsWith(".md") ? path : `${path}.md`;
  }
  resolveByMetadataCache(candidates, sourcePath) {
    for (const candidate of candidates) {
      const resolved = this.app.metadataCache.getFirstLinkpathDest(candidate, sourcePath);
      if (resolved) return resolved;
    }
    return null;
  }
  // Direct path resolution is only safe for links that already name a folder path:
  // an explicit path identifies at most one file. A bare (folder-less) link must NOT
  // be resolved here, because getAbstractFileByPath would guess the vault-root note of
  // that name - silently picking the root note even when Obsidian would link a
  // folder-local same-named note, and bypassing the strict ambiguity guard in
  // resolveByBasenameCandidates. Bare links fall through to that guard instead.
  resolveByPathCandidates(candidates) {
    for (const candidate of candidates) {
      if (!candidate.includes("/")) continue;
      const file = this.app.vault.getAbstractFileByPath(this.ensureMarkdownExtension(candidate));
      const markdownFile = abstractFileToMarkdownTFile(file);
      if (markdownFile) return markdownFile;
    }
    return null;
  }
  // Sole resolver for bare (folder-less) links the metadata cache misses (e.g. an
  // as-yet-unresolved link or a cold cache). A basename is only a safe target when
  // exactly one note carries it: if several notes share it we cannot know which the
  // card meant, so we bail rather than write the lane to an arbitrarily-chosen
  // same-named note (silent data corruption). The caller logs the skip once. When the
  // cache is warm Obsidian's own shortest-path resolution in resolveByMetadataCache
  // already picked the note the board displays, so this path is reached only on a miss.
  resolveByBasenameCandidates(candidates) {
    const markdownFiles = this.app.vault.getMarkdownFiles();
    for (const candidate of candidates) {
      if (candidate.includes("/")) continue;
      const basename = this.stripMarkdownExtension(candidate.split("/").pop() ?? "");
      if (!basename) continue;
      const matches = markdownFiles.filter((f) => f.basename === basename);
      if (matches.length === 1) return matches[0];
      if (matches.length > 1) return null;
    }
    return null;
  }
  isMarkdownFile(file) {
    return !!file && file.extension === "md";
  }
};

// src/automators/onFileModifyAutomators/progressPropertyHelper.ts
var ProgressPropertyHelper = class extends OnFileModifyAutomator {
  constructor(plugin) {
    super(plugin, "ProgressProperties" /* ProgressProperties */);
  }
  async onFileModify(file) {
    const data = await this.plugin.controller.getPropertiesInFile(file);
    if (!data) return;
    await this.plugin.controller.handleProgressProps(data, file);
  }
};

// src/main.ts
var MetaEdit = class extends import_obsidian25.Plugin {
  constructor() {
    super(...arguments);
    // Every settings write - the settings tab, the API, and the controller's Auto
    // Property choice persistence - runs through this one serialization point, so two
    // concurrent writers can't lost-update a shared in-memory snapshot and two disk
    // flushes can't complete out of order.
    this.settingsWriter = new SettingsWriter(() => this.saveData(this.settings));
  }
  async onload() {
    console.log("Loading MetaEdit");
    this.controller = new MetaController(this.app, this);
    this.bulkEditor = new BulkMetadataEditor(this.app, this);
    await this.loadSettings();
    this.addCommand({
      id: "metaEditRun",
      name: "Run",
      callback: async () => {
        const file = getActiveMarkdownFile(this.app);
        if (!file) return;
        await this.runMetaEditForFile(file);
      }
    });
    this.addSettingTab(new MetaEditSettingsTab(this.app, this));
    this.linkMenu = new LinkMenu(this);
    if (this.settings.UIElements.enabled) {
      this.linkMenu.registerEvent();
    }
    this.api = new MetaEditApi(this).make();
    log.register(new ConsoleErrorLogger()).register(new GuiLogger(this));
    this.automatorManager = new OnFileModifyAutomatorManager(this).startAutomators();
    this.toggleAutomators();
  }
  toggleAutomators() {
    if (this.settings.KanbanHelper.enabled)
      this.automatorManager.attach(new KanbanHelper(this));
    else
      this.automatorManager.detach("KanbanHelper" /* KanbanHelper */);
    if (this.settings.ProgressProperties.enabled)
      this.automatorManager.attach(new ProgressPropertyHelper(this));
    else
      this.automatorManager.detach("ProgressProperties" /* ProgressProperties */);
  }
  async runMetaEditForFile(file) {
    const data = await this.controller.getPropertiesInFile(file);
    if (!data) return;
    const suggester = new MetaEditSuggester(this.app, this, data, file, this.controller);
    suggester.open();
  }
  onunload() {
    console.log("Unloading MetaEdit");
    this.linkMenu.unregisterEvent();
  }
  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = mergeSettings(loaded);
    if (migrateIgnoredProperties(loaded, this.settings)) {
      await this.saveSettings();
    }
  }
  async saveSettings() {
    await this.settingsWriter.save();
  }
  /**
   * Atomically read-modify-write the settings, serialized with every other settings
   * write. `mutate` runs at the head of the write queue - so it re-reads the freshest
   * `this.settings` and no other writer can interleave between its read and the save -
   * and applies its change in place. It returns a rollback to undo the in-memory
   * change if the disk write fails, or `false` to skip the write when nothing changed.
   *
   * Use this for any read-modify-write of shared settings (e.g. appending an Auto
   * Property choice) instead of mutating `settings` and calling `saveSettings()`
   * separately, which would race a concurrent writer.
   */
  updateSettings(mutate2) {
    return this.settingsWriter.update(mutate2);
  }
  getFilesWithProperty(property) {
    const markdownFiles = this.app.vault.getMarkdownFiles();
    const files = [];
    markdownFiles.forEach((file) => {
      const fileCache = this.app.metadataCache.getFileCache(file);
      if (fileCache) {
        const fileFrontmatter = fileCache.frontmatter;
        if (fileFrontmatter && Object.prototype.hasOwnProperty.call(fileFrontmatter, property)) {
          files.push(file);
        }
      }
    });
    return files;
  }
  async runMetaEditForFolder(targetFolder) {
    const files = this.bulkEditor.collectFromFolder(targetFolder);
    await this.bulkEditor.run(files, `${targetFolder.name} (and subfolders)`);
  }
  async runBulkEditForSelection(selection) {
    const files = this.bulkEditor.collectFromSelection(selection);
    const scope = files.length === 1 ? files[0].name : `${selection.length} selected items`;
    await this.bulkEditor.run(files, scope);
  }
};
//# sourceMappingURL=main.js.map

/* nosourcemap */