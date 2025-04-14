export function formatResponse(data: any, format: 'json' | 'array' | 'object' = 'json') {
    if (format === 'array') return Array.isArray(data) ? data : [data];
    if (format === 'object') return typeof data === 'object' ? data : { data };
    return data;
  }
  