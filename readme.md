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

## ✨ Features

<table>
  <tr>
    <td width="33%">
      <h3 align="center">🌐 Network</h3>
      <p align="center">
        <code>fetchAPI</code> • <code>fetchAPIWithRetry</code><br/>
        <code>formatResponse</code> • <code>debounce</code> • <code>throttle</code>
      </p>
    </td>
    <td width="33%">
      <h3 align="center">🔄 Arrays</h3>
      <p align="center">
        <code>uniqueArray</code> • <code>mergeArrays</code><br/>
        <code>flattenArray</code> • <code>chunkArray</code>
      </p>
    </td>
    <td width="33%">
      <h3 align="center">📝 Strings</h3>
      <p align="center">
        <code>truncateString</code> • <code>capitalizeWords</code><br/>
        <code>slugify</code>
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
const truncated = truncateString('This is a long sentence that needs truncating', 20);
// "This is a long..."

// Capitalize words
const capitalized = capitalizeWords('hello world'); // "Hello World"

// Create URL-friendly slugs
const slug = slugify('Hello World & Special Characters!'); // "hello-world-and-special-characters"
const customSlug = slugify('Hello World', { replacement: '_', strict: true }); // "hello_world"
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

## 🗺️ Roadmap

<table>
  <tr>
    <td width="50%">
      <h3 align="center">🔜 Coming in v1.1.2+</h3>
      <ul>
        <li>Object utilities (<code>deepClone</code>, <code>mergeObjects</code>, etc.)</li>
        <li>Enhanced data validation methods</li>
        <li>More string manipulation utilities</li>
      </ul>
    </td>
    <td width="50%">
      <h3 align="center">🔮 Future Plans (v1.2.0+)</h3>
      <ul>
        <li>Built-in response caching</li>
        <li>Request timeout control</li>
        <li>Advanced retry strategies</li>
        <li>Request/Response interceptors</li>
      </ul>
    </td>
  </tr>
</table>

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
