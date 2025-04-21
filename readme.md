# 🌐 Mesh-Fetch

<div align="center">

![Untitled design](https://github.com/user-attachments/assets/60200ff7-891a-4122-8a7a-40cfedb21299)

  <h2>A Modern TypeScript Utility Library for API Fetching and Data Manipulation</h2>

  [![npm version](https://img.shields.io/npm/v/mesh-fetcher?color=blue&label=npm)](https://www.npmjs.com/package/mesh-fetcher)
  [![Downloads](https://img.shields.io/npm/dt/mesh-fetcher?color=green&label=downloads)](https://www.npmjs.com/package/mesh-fetcher)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

<div align="center">
  <p><strong>Elegant, type-safe utilities for modern web development</strong></p>
  <p>Simplify API interactions, data transformations, and string manipulations with a lightweight, zero-dependency library</p>
</div>

<div align="center">
  <p>
    <a href="EXAMPLE.md">
      <img src="https://img.shields.io/badge/📚_Comprehensive_Guide-View_Examples-40B883?style=for-the-badge" alt="View Examples" />
    </a>
  </p>
  <p><sub>Explore our comprehensive guide with real-world examples and best practices</sub></p>
</div>

## ✨ Features

<table>
  <tr>
    <td width="25%">
      <h3 align="center">🌐 Network</h3>
      <p align="center">
        <code>fetchAPI</code> • <code>fetchAPIWithRetry</code><br/>
        <code>formatResponse</code> • <code>debounce</code> • <code>throttle</code> • <code>fetchWithCasche</code>
      </p>
    </td>
    <td width="25%">
      <h3 align="center">🔄 Arrays</h3>
      <p align="center">
        <code>uniqueArray</code> • <code>mergeArrays</code><br/>
        <code>flattenArray</code> • <code>chunkArray</code>
      </p>
    </td>
    <td width="25%">
      <h3 align="center">📝 Strings</h3>
      <p align="center">
        <code>truncateString</code> • <code>capitalizeWords</code><br/>
        <code>slugify</code>
      </p>
    </td>
    <td width="25%">
      <h3 align="center">🔧 Objects</h3>
      <p align="center">
        <code>deepClone</code> • <code>deepEqual</code><br/>
        <code>mergeObjects</code> • <code>flattenObject</code><br/>
        <code>pick</code> • <code>omit</code>
      </p>
    </td>
  </tr>
</table>

## 📦 Installation

```bash
# Using npm
npm install mesh-fetcher

# Using yarn
yarn add mesh-fetcher

# Using pnpm
pnpm add mesh-fetcher
```

## 🚀 Quick Start

### Network Operations

```typescript
import { fetchAPI, debounce, fetchWithCache } from 'mesh-fetcher';

// Simple API fetch with error handling
const getData = async () => {
  const response = await fetchAPI('https://api.example.com/data');
  console.log(response);
};

// Debounced API call
const debouncedFetch = debounce(getData, 300);

// Cached API call with multiple cache strategies
const getCachedData = async () => {
  // Using memory cache (default)
  const memoryData = await fetchWithCache('https://api.example.com/data', {
    cacheTTL: 1000 * 60 * 5, // 5 minutes cache
    cacheType: 'memory'
  });

  // Using LRU cache
  const lruData = await fetchWithCache('https://api.example.com/data', {
    cacheType: 'lru',
    forceRefresh: false // Use cached data if available
  });

  // Using persistent cache (localStorage)
  const persistentData = await fetchWithCache('https://api.example.com/data', {
    cacheType: 'persistent',
    storage: 'localStorage',
    cacheTTL: 1000 * 60 * 60 * 24 // 24 hours cache
  });
};
```

### Array Operations

```typescript
import { uniqueArray, flattenArray, chunkArray } from 'mesh-fetcher';

// Remove duplicates
const unique = uniqueArray([1, 2, 2, 3, 3, 4]); // [1, 2, 3, 4]

// Flatten nested arrays
const flat = flattenArray([1, [2, 3], [4, [5, 6]]]); // [1, 2, 3, 4, 5, 6]

// Create chunks
const chunks = chunkArray([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

### String Operations

```typescript
import { truncateString, capitalizeWords, slugify } from 'mesh-fetcher';

// Truncate long text
const truncated = truncateString('This is a long sentence that needs truncating', 20);
// "This is a long..."

// Capitalize words
const capitalized = capitalizeWords('hello world'); // "Hello World"

// Create URL-friendly slugs
const slug = slugify('Hello World & Special Characters!'); // "hello-world-and-special-characters"
const customSlug = slugify('Hello World', { replacement: '_', strict: true }); // "hello_world"
```

### Object Operations

```typescript
import { 
  deepClone, 
  deepEqual, 
  mergeObjects, 
  flattenObject,
  pick,
  omit 
} from 'mesh-fetcher';

// Deep clone objects with circular references
const obj = { 
  date: new Date(),
  map: new Map([['key', 'value']]),
  nested: { array: [1, 2, { x: 1 }] }
};
const clone = deepClone(obj);

// Deep equality comparison
const obj1 = { a: 1, b: { x: [1, 2] } };
const obj2 = { a: 1, b: { x: [1, 2] } };
const isEqual = deepEqual(obj1, obj2); // true

// Merge objects deeply
const target = { a: 1, b: { x: 1 } };
const source = { b: { y: 2 }, c: 3 };
const merged = mergeObjects(target, source);
// { a: 1, b: { x: 1, y: 2 }, c: 3 }

// Flatten nested objects
const nested = {
  user: {
    name: 'John',
    address: { city: 'NY' }
  }
};
const flat = flattenObject(nested);
// { 'user.name': 'John', 'user.address.city': 'NY' }

// Pick specific properties
const user = { name: 'John', age: 30, password: '123' };
const public = pick(user, ['name', 'age']);
// { name: 'John', age: 30 }

// Omit specific properties
const safe = omit(user, ['password']);
// { name: 'John', age: 30 }
```

## 📘 String Utilities API

### `truncateString`

Truncate a string to a specified length with customizable options:

```typescript
truncateString(str, maxLength, options);
```

**Options:**
- `replacement`: String to use as replacement (default: "...")
- `wordBoundary`: Whether to truncate at word boundaries (default: false)
- `position`: Where to truncate - 'start', 'middle', or 'end' (default: "end")

### `capitalizeWords`

Capitalize words in a string with customizable options:

```typescript
capitalizeWords(str, options);
```

**Options:**
- `preserveCase`: Whether to preserve existing case in rest of word (default: false)
- `excludeWords`: Words to exclude from capitalization (default: [])
- `locale`: Locale to use for capitalization (default: undefined)
- `onlyFirstWord`: Whether to capitalize only the first word (default: false)

### `slugify`

Convert a string to a URL-friendly slug with customizable options:

```typescript
slugify(str, options);
```

**Options:**
- `replacement`: Character to use for spaces/special chars (default: "-")
- `lower`: Convert the slug to lowercase (default: true)
- `trim`: Remove leading and trailing spaces (default: true)
- `strict`: Remove all special characters (default: true)
- `transliterate`: Convert accented characters to ASCII (default: true)
- `maxLength`: Maximum length of the generated slug
- `customReplacements`: Custom character mappings

## 📘 Object Utilities API

### `deepClone`

Create a deep clone of an object with support for special types and circular references:

```typescript
deepClone(obj, options);
```

**Options:**
- `maxDepth`: Maximum depth for recursive operations (default: Infinity)
- `preservePrototype`: Whether to preserve prototype chain (default: false)
- `includeNonEnumerable`: Whether to include non-enumerable properties (default: false)

### `deepEqual`

Perform a deep equality comparison between two values:

```typescript
deepEqual(a, b, options);
```

**Options:**
- `maxDepth`: Maximum depth for comparison (default: Infinity)
- `includeNonEnumerable`: Whether to include non-enumerable properties (default: false)

### `mergeObjects`

Deeply merge two objects with configurable behavior:

```typescript
mergeObjects(target, source, options);
```

**Options:**
- `arrayMerge`: How to handle arrays ('replace' | 'concat' | 'union') (default: 'replace')
- `clone`: Whether to clone objects during merge (default: true)
- `maxDepth`: Maximum depth for merging (default: Infinity)
- `preservePrototype`: Whether to preserve prototype chain (default: false)

### `flattenObject`

Convert a nested object structure into a flat object with dot notation:

```typescript
flattenObject(obj, options);
```

**Options:**
- `delimiter`: Character to use as delimiter in keys (default: ".")
- `maxDepth`: Maximum depth to flatten (default: Infinity)
- `preserveArrays`: Whether to preserve arrays (default: false)

### `pick` and `omit`

Create a new object with selected/omitted properties:

```typescript
pick(obj, keys, options);
omit(obj, keys, options);
```

**Options:**
- `preservePrototype`: Whether to preserve prototype chain (default: false)
- `includeNonEnumerable`: Whether to include non-enumerable properties (default: false)

## 📘 Network Utilities API

### `fetchWithCache`

Fetch data from an API with built-in caching support:

```typescript
fetchWithCache<T>(url: string, options?: CacheOptions): Promise<T>
```

**Options:**
- `cacheTTL`: Time-to-live for cache in milliseconds (default: 24 hours)
- `forceRefresh`: Whether to bypass cache and force a fresh API call (default: false)
- `cacheType`: Type of cache to use - 'memory' | 'lru' | 'persistent' (default: 'memory')
- `storage`: Storage type for persistent cache - 'localStorage' | 'indexedDB' (default: 'localStorage')
- `fetchOptions`: Additional fetch options to pass to the underlying fetch call

**Features:**
- Three cache strategies:
  - Memory: Simple in-memory Map-based cache
  - LRU (Least Recently Used): Efficient cache with automatic eviction of old entries
  - Persistent: localStorage-based cache that persists across sessions
- Automatic cache invalidation based on TTL
- Type-safe responses with TypeScript generics
- Handles complex data types and serialization
- Automatic error handling and retries

## 🔧 Contributing

We welcome contributions of all sizes! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you'd like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  
  <p>Made with 💚 by Kurama</p>
  
  <p>⭐️ Star us on GitHub — it motivates us a lot!</p>
  
  <p>
    <a href="https://www.npmjs.com/package/mesh-fetcher">npm</a> •
    <a href="https://github.com/vedas-dixit/mesh-fetch">GitHub</a> •
    <a href="https://github.com/vedas-dixit/mesh-fetch/issues">Issues</a>
  </p>
  
</div>
