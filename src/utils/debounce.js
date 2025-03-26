// src/debounce.js
function debounce(func, delay) {
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>func(...args),delay);
    }
}

module.exports = debounce;
