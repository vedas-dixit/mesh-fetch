
function throttle(func, limit) {
    let lastcall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastcall >= limit) {
            lastcall = now;
            func(...args);
        }
    };
}
module.exports = throttle;