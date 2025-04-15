# 🌐 Mesh-Fetch

<div align="center">
  
  ![Mesh-Fetch Banner](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWFoYjVlY3dtNXduZHlxOHVjNGc0OTBqY3hqNXFlMGxvcXp2cW1qOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgFLfWUZigjoem4/giphy.gif)

  <h3>A Modern TypeScript Utility Library for API Fetching and Data Manipulation</h3>

[![npm version](https://img.shields.io/npm/v/mesh-fetcher?color=blue&label=npm)](https://www.npmjs.com/package/mesh-fetcher)
[![Downloads](https://img.shields.io/npm/dt/mesh-fetcher?color=green&label=downloads)](https://www.npmjs.com/package/mesh-fetcher)
[![License](https://img.shields.io/github/license/your-username/mesh-fetcher?color=red)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)](https://www.typescriptlang.org/)

</div>

## 🚀 Features

### Network Utilities

| Feature             | Status | Description                                        |
| ------------------- | ------ | -------------------------------------------------- |
| `fetchAPI`          | ✅     | Enhanced fetch with error handling and type safety |
| `fetchAPIWithRetry` | ✅     | Automatic retry mechanism for failed requests      |
| `formatResponse`    | ✅     | Format API responses into desired structures       |
| `debounce`          | ✅     | Prevent function spam with timed delays            |
| `throttle`          | ✅     | Control execution rate of functions                |

### Array Utilities

| Feature        | Status | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `uniqueArray`  | ✅     | Remove duplicates from arrays            |
| `mergeArrays`  | ✅     | Merge multiple arrays with options       |
| `flattenArray` | ✅     | Flatten nested arrays with depth control |
| `chunkArray`   | ✅     | Split arrays into smaller chunks         |

## 📦 Installation

```bash
npm install mesh-fetcher
# or
yarn add mesh-fetcher
# or
pnpm add mesh-fetcher
```

## 🎯 Quick Start

### Network Operations

```typescript
import { fetchAPI, debounce } from 'mesh-fetcher';

// Simple API fetch with error handling
const getData = async () => {
  const response = await fetchAPI('https://api.example.com/data');
  console.log(response);
};

// Debounced API call
const debouncedFetch = debounce(getData, 300);
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

## 📚 API Reference

### Network Utilities

#### `fetchAPI<T>(url: string, options?: RequestInit): Promise<T | APIResponse<T>>`

Enhanced fetch function with built-in error handling and type safety.

#### `fetchAPIWithRetry<T>(url: string, options?: RequestInit, retries?: number, delay?: number)`

Fetch with automatic retry mechanism for failed requests.

#### `debounce<T>(func: T, delay: number): (...args: Parameters<T>) => void`

Create a debounced function that delays invoking the provided function.

#### `throttle<T>(func: T, limit: number): T`

Create a throttled function that limits the rate of execution.

### Array Utilities

#### `uniqueArray<T>(array: T[]): T[]`

Remove duplicate elements from an array.

#### `mergeArrays<T>(array1: T[], array2: T[], options?: { unique: boolean }): T[]`

Merge two arrays with option to remove duplicates.

#### `flattenArray<T>(array: any[], depth?: number): T[]`

Flatten a nested array structure with optional depth control.

#### `chunkArray<T>(array: T[], size: number): T[][]`

Split an array into smaller chunks of specified size.

## 🗺️ Roadmap

### Coming Soon (v1.1.0)

- 📝 String Utilities

  - `truncateString`: Truncate strings with ellipsis
  - `slugify`: Convert strings to URL-friendly format
  - `capitalizeWords`: Capitalize first letter of each word
  - `isPalindrome`: Check if string is a palindrome

- 🎯 Object Utilities
  - `deepClone`: Deep clone objects
  - `mergeObjects`: Deep merge multiple objects
  - `isEmptyObject`: Check if object is empty
  - `pick`: Pick specific properties from object

### Future Plans (v1.2.0+)

- 🔄 Enhanced Network Features
  - Built-in response caching
  - Request timeout control
  - Rate limiting
  - Request/Response interceptors
  - Advanced retry strategies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  
  Made with 💚 by Vedas
  
  ⭐️ Star us on GitHub — it motivates us a lot!
  
</div>
