# 🎯 Mesh-Fetcher Examples

<div align="center">
  <p><strong>Complete guide to using Mesh-Fetcher's powerful utilities in your projects</strong></p>
</div>

## 📚 Table of Contents

- [🌐 Network Operations](#-network-operations)
  - [Basic Fetch](#basic-fetch)
  - [Retry Mechanism](#retry-mechanism)
  - [Response Formatting](#response-formatting)
  - [Performance Utilities](#performance-utilities)
- [📊 Array Utilities](#-array-utilities)
  - [Array Manipulation](#array-manipulation)
  - [Array Transformation](#array-transformation)
- [🔠 String Utilities](#-string-utilities)
  - [Text Formatting](#text-formatting)
  - [URL Handling](#url-handling)
- [🎲 Object Utilities](#-object-utilities)
  - [Object Manipulation](#object-manipulation)
  - [Object Transformation](#object-transformation)
- [🛠️ Advanced Usage](#-advanced-usage)
  - [Custom Implementations](#custom-implementations)
  - [Integration Examples](#integration-examples)

## 🌐 Network Operations

### Basic Fetch
```typescript
import { fetchAPI } from 'mesh-fetcher';

// Simple GET request
const users = await fetchAPI('https://api.example.com/users');

// POST request with data
const newUser = await fetchAPI('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John Doe' })
});

// Error handling
try {
  const data = await fetchAPI('https://api.example.com/data');
  if (!data.success) {
    console.error(data.message);
  }
} catch (error) {
  console.error('Failed to fetch:', error);
}
```

### Retry Mechanism
```typescript
import { fetchAPIWithRetry } from 'mesh-fetcher';

// Fetch with 3 retries and 1 second delay
const data = await fetchAPIWithRetry(
  'https://api.example.com/data',
  { method: 'GET' },
  3,  // retries
  1000 // delay in ms
);

// Custom error handling with retries
try {
  const response = await fetchAPIWithRetry(
    'https://api.example.com/unreliable-endpoint',
    { method: 'POST', body: JSON.stringify({ data: 'test' }) },
    5,  // More retries for unreliable endpoints
    2000 // Longer delay
  );
  console.log('Success after retries:', response);
} catch (error) {
  console.error('All retry attempts failed:', error);
}
```

### Performance Utilities

#### Debounce
```typescript
import { debounce } from 'mesh-fetcher';

// Debounced search function
const searchAPI = debounce(async (query: string) => {
  const results = await fetchAPI(`/api/search?q=${query}`);
  return results;
}, 300);

// Usage in React
function SearchComponent() {
  return (
    <input
      type="text"
      onChange={(e) => searchAPI(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

#### Throttle
```typescript
import { throttle } from 'mesh-fetcher';

// Throttled update function
const updateProgress = throttle(async (progress: number) => {
  await fetchAPI('/api/progress', {
    method: 'POST',
    body: JSON.stringify({ progress })
  });
}, 1000);

// Usage
function trackProgress(progress: number) {
  updateProgress(progress); // Will only execute once per second
}
```

## 📊 Array Utilities

### Array Manipulation
```typescript
import {
  flattenArray,
  uniqueArray,
  chunkArray,
  mergeArrays
} from 'mesh-fetcher';

// Flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
const flattened = flattenArray(nested);
console.log(flattened); // [1, 2, 3, 4, 5, 6]

// Remove duplicates
const duplicates = [1, 2, 2, 3, 3, 4];
const unique = uniqueArray(duplicates);
console.log(unique); // [1, 2, 3, 4]

// Create chunks
const data = [1, 2, 3, 4, 5, 6];
const chunks = chunkArray(data, 2);
console.log(chunks); // [[1, 2], [3, 4], [5, 6]]

// Merge arrays with custom logic
const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];
const merged = mergeArrays(arr1, arr2);
console.log(merged); // [1, 2, 3, 4, 5]
```

## 🔠 String Utilities

### Text Formatting
```typescript
import {
  truncateString,
  capitalizeWords,
  slugify
} from 'mesh-fetcher';

// Truncate long text
const longText = "This is a very long text that needs to be truncated";
const truncated = truncateString(longText, 20);
console.log(truncated); // "This is a very lon..."

// Capitalize words
const text = "hello world";
const capitalized = capitalizeWords(text);
console.log(capitalized); // "Hello World"

// Create URL-friendly slugs
const title = "This is a Blog Post Title!";
const slug = slugify(title);
console.log(slug); // "this-is-a-blog-post-title"
```

## 🎲 Object Utilities

### Object Manipulation
```typescript
import {
  deepClone,
  deepEqual,
  flattenObject,
  mergeObjects,
  omit,
  pick
} from 'mesh-fetcher';

// Deep clone objects
const original = { nested: { value: 42 } };
const clone = deepClone(original);
clone.nested.value = 43;
console.log(original.nested.value); // Still 42

// Compare objects
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(deepEqual(obj1, obj2)); // true

// Flatten nested objects
const nested = { user: { name: 'John', details: { age: 30 } } };
const flat = flattenObject(nested);
console.log(flat); // { 'user.name': 'John', 'user.details.age': 30 }

// Merge objects deeply
const target = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 }, c: 3 };
const merged = mergeObjects(target, source);
console.log(merged); // { a: 1, b: { x: 1, y: 2 }, c: 3 }

// Pick specific properties
const user = { id: 1, name: 'John', password: 'secret' };
const public = pick(user, ['id', 'name']);
console.log(public); // { id: 1, name: 'John' }

// Omit specific properties
const userWithoutPassword = omit(user, ['password']);
console.log(userWithoutPassword); // { id: 1, name: 'John' }
```

## 🛠️ Advanced Usage

### Custom API Client
```typescript
import { fetchAPI, fetchAPIWithRetry } from 'mesh-fetcher';

class APIClient {
  private baseURL: string;
  private retryConfig: { attempts: number; delay: number };

  constructor(
    baseURL: string,
    retryConfig = { attempts: 3, delay: 1000 }
  ) {
    this.baseURL = baseURL;
    this.retryConfig = retryConfig;
  }

  async get<T>(endpoint: string) {
    return fetchAPIWithRetry<T>(
      `${this.baseURL}${endpoint}`,
      { method: 'GET' },
      this.retryConfig.attempts,
      this.retryConfig.delay
    );
  }

  async post<T>(endpoint: string, data: any) {
    return fetchAPI<T>(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
}

// Usage
const api = new APIClient('https://api.example.com');
const users = await api.get('/users');
const newUser = await api.post('/users', { name: 'John' });
```

### React Integration
```typitten
import { useState, useEffect } from 'react';
import { fetchAPI, debounce } from 'mesh-fetcher';

// Custom hook for data fetching
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAPI<T>(url);
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Search component with debouncing
function SearchComponent() {
  const [results, setResults] = useState([]);
  
  const searchAPI = debounce(async (query: string) => {
    const data = await fetchAPI(`/api/search?q=${query}`);
    setResults(data);
  }, 300);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => searchAPI(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

<div align="center">
  <p>For more examples and detailed documentation, visit our <a href="https://github.com/vedas-dixit/mesh-fetch">GitHub repository</a>.</p>
</div>
