export function formatResponse(data, format = 'json') {
    if (format === 'array') {
        return Array.isArray(data) ? data : [data];
    } else if (format === 'object') {
        return typeof data === 'object' ? data : { data };
    }
    return data; // default to JSON
}
