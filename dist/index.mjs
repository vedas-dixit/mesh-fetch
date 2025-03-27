function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

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

async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        return { success: false, message: `Error fetching API: ${error.message}` };
    }
}

function formatResponse(data, format = 'json') {
    if (format === 'array') {
        return Array.isArray(data) ? data : [data];
    } else if (format === 'object') {
        return typeof data === 'object' ? data : { data };
    }
    return data; // default to JSON
}

export { debounce, fetchAPI, formatResponse, throttle };
//# sourceMappingURL=index.mjs.map
