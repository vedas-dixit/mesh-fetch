import type { ResponseFormatType, FormattedResponse } from '../types';

export function formatResponse<T = any, F extends ResponseFormatType = 'json'>(
    data: T,
    format: F = 'json' as F
  ): FormattedResponse<T, F> {
    if (format === 'array') return (Array.isArray(data) ? data : [data]) as FormattedResponse<T, F>;
    if (format === 'object') return (typeof data === 'object' ? data : { data }) as FormattedResponse<T, F>;
    return data as FormattedResponse<T, F>;
  }
  