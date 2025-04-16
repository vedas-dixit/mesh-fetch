# 🌐 Mesh-Fetch

<div align="center">
  
  ![Mesh-Fetch Banner](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWFoYjVlY3dtNXduZHlxOHVjNGc0OTBqY3hqNXFlMGxvcXp2cW1qOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgFLfWUZigjoem4/giphy.gif)

  <h3>A Modern TypeScript Utility Library for API Fetching and Data Manipulation</h3>

[![npm version](https://img.shields.io/npm/v/mesh-fetcher?color=blue&label=npm)](https://www.npmjs.com/package/mesh-fetcher)
[![Downloads](https://img.shields.io/npm/dt/mesh-fetcher?color=green&label=downloads)](https://www.npmjs.com/package/mesh-fetcher)\
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

### String Utilities

| Feature          | Status | Description                                       |
| ---------------- | ------ | ------------------------------------------------- |
| `truncateString` | ✅     | Truncate strings with configurable options        |
| `capitalizeWords`| ✅     | Capitalize words with customizable rules          |
| `slugify`        | ✅     | Convert strings to URL-friendly slugs             |

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

### String Operations

```typescript
import { truncateString, capitalizeWords, slugify } from 'mesh-fetcher';

// Truncate long text
const truncated = truncateString("This is a long sentence that needs truncating", 20); 
// "This is a long..."

// Capitalize words
const capitalized = capitalizeWords("hello world"); // "Hello World"

// Create URL-friendly slugs
const slug = slugify("Hello World & Special Characters!"); // "hello-world-and-special-characters"
const customSlug = slugify("Hello World", { replacement: '_', strict: true }); // "hello_world"
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

### String Utilities

#### `truncateString(str: string, maxLength: number, options?: TruncateOptions): string`

Truncate a string to a specified length with customizable options:
- `replacement`: The string to use as replacement (default: "...")
- `wordBoundary`: Whether to truncate at word boundaries (default: false)
- `position`: Where to truncate - 'start', 'middle', or 'end' (default: "end")

#### `capitalizeWords(str: string, options?: CapitalizeOptions): string`

Capitalize words in a string with customizable options:
- `preserveCase`: Whether to preserve existing case in rest of word (default: false)
- `excludeWords`: Words to exclude from capitalization (default: [])
- `locale`: Locale to use for capitalization (default: undefined)
- `onlyFirstWord`: Whether to capitalize only the first word (default: false)

#### `slugify(str: string, options?: SlugifyOptions): string`

Convert a string to a URL-friendly slug with customizable options:
- `replacement`: Character to use for spaces/special chars (default: "-")
- `lower`: Convert the slug to lowercase (default: true)
- `trim`: Remove leading and trailing spaces (default: true)
- `strict`: Remove all special characters (default: true)
- `removeSpecialChars`: Remove special characters (default: true)
- `transliterate`: Convert accented characters to ASCII (default: true)
- `maxLength`: Maximum length of the generated slug
- `locale`: Locale to use for transliteration (default: "en-US")
- `customReplacements`: Custom character mappings

## 🗺️ Roadmap

### Coming Soon (v1.1.0)

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
  
  Made with 💚 by Kurama
  
  ⭐️ Star us on GitHub — it motivates us a lot!
  
</div>
