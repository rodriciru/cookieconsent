import Prims from 'prismjs';

/**
 * Clone object using recursion
 * @param {any} el
 */
export const deepCopy = (el) => {

    if (typeof el !== 'object' )
        return el;

    if (el instanceof Date)
        return new Date(el.getTime());

    let clone = Array.isArray(el) ? [] : {};

    for (let key in el) {
        let value = el[key];

        clone[key] = deepCopy(value);
    }

    return clone;
};

export const customEvents = {
    _PLAYGROUND_READY: 'pg:ready',
    _INIT: 'cc:onInit',
    _RESET: 'cc:reset',
    _ON_CONSENT: 'cc:onConsent',
    _ON_CHANGE: 'cc:onChange',
    _ON_MODAL_SHOW: 'cc:onModalShow'
};

/**
 * @param {string} eventType
 */
export const fireEvent = (eventType) => {
    window.dispatchEvent(new CustomEvent(eventType));
};

/**
 * @param {string} json
 * @returns {string}
 */
export const unquoteJson = json => json.replace(/"([^"]+)":/g, '$1:');

/**
 * @callback Callback
 */

/**
 * @param {string} eventType
 * @param {Callback} fn
 */
export const onEvent = (eventType, fn) => {
    window.addEventListener(eventType, fn);
};

/**
 * @param {HTMLElement|Node} el
 * @param {string} eventType
 * @param {Callback} fn
 */
export const addEvent = (el, eventType, fn) => {
    el.addEventListener(eventType, fn);
};

/**
 * @param {string} selector
 */
export const getById = (selector) => document.getElementById(selector);

export const deepEqual = (x, y) => {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
};

 /**
  * @param {HTMLDivElement} rootEl Information about the user.
  */
export const enableSyntaxHighlighting = (rootEl) => {

    /**
     * @type {import('prismjs')}
     */
    const highlighter = Prims;

    /** @type {HTMLTextAreaElement} **/ const textarea = rootEl.querySelector('textarea');
    /** @type {HTMLPreElement} **/      const pre = rootEl.querySelector('pre');
    /** @type {HTMLElement} **/         const code = rootEl.querySelector('code');

    addEvent(textarea, 'input', highlightFn);

    /**
     * Fix scrolling
     */
    addEvent(textarea, 'scroll', () => {
        code.setAttribute('style', `min-height: ${textarea.scrollHeight}px`);
        pre.scrollTop = textarea.scrollTop;
        pre.scrollLeft = textarea.scrollLeft;
    });

    addEvent(textarea, 'resize', () => {
        code.setAttribute('style', `min-height: ${pre.scrollHeight}px`);
    });

    function highlightFn()  {
        code.textContent = textarea.value;
        highlighter.highlightElement(code);
        code.setAttribute('style', `min-height: ${textarea.scrollHeight}px`);
    }

    return highlightFn;
};