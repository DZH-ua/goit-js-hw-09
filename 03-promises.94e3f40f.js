!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var n=o[e];delete o[e];var r={id:e,exports:{}};return t[e]=r,n.call(r.exports,r,r.exports),r.exports}var u=new Error("Cannot find module '"+e+"'");throw u.code="MODULE_NOT_FOUND",u}).register=function(e,n){o[e]=n},n.parcelRequired7c6=r);var u=r("iU1Pc"),i={form:document.querySelector(".form"),firsDelayInput:document.querySelector('[name="delay"]'),delayStepInput:document.querySelector('[name="step"]'),amountInput:document.querySelector('[name="amount"]')};function a(e,n){return new Promise((function(t,o){setTimeout((function(){var r=Math.random()>.3;console.log(r),r?t({position:e,delay:n}):o({position:e,delay:n})}),n)}))}i.form.addEventListener("submit",(function(n){n.preventDefault();for(var t=Number(i.firsDelayInput.value),o=Number(i.delayStepInput.value),r=Number(i.amountInput.value),l=1;l<=r;l+=1)a(l,t).then((function(n){var t=n.position,o=n.delay;e(u).Notify.success("✅ Fulfilled promise ".concat(t," in ").concat(o,"ms"))})).catch((function(n){var t=n.position,o=n.delay;e(u).Notify.failure("❌ Rejected promise ".concat(t," in ").concat(o,"ms"))})),t+=o}))}();
//# sourceMappingURL=03-promises.94e3f40f.js.map