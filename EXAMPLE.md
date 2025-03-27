# Using mesh-fetcher in Next.js Projects

## Installation

```bash
npm install mesh-fetcher
# or
yarn add mesh-fetcher
```

## Basic Usage

### 1. Simple API Fetching

```javascript
// pages/index.js
import { fetchAPI } from 'mesh-fetcher';

export default function Home() {
  const fetchData = async () => {
    try {
      const response = await fetchAPI('https://api.example.com/data');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
}
```

### 2. With Debouncing (Perfect for Search Inputs)

```javascript
// components/SearchInput.js
import { fetchAPI, debounce } from 'mesh-fetcher';

export default function SearchInput() {
  const debouncedSearch = debounce(async (query) => {
    const results = await fetchAPI(`https://api.example.com/search?q=${query}`);
    // Handle results
  }, 300);

  return (
    <input 
      type="text" 
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### 3. With Throttling (For Rate-Limited APIs)

```javascript
// components/InfiniteScroll.js
import { fetchAPI, throttle } from 'mesh-fetcher';

export default function InfiniteScroll() {
  const throttledFetch = throttle(async (page) => {
    const data = await fetchAPI(`https://api.example.com/items?page=${page}`);
    // Handle data
  }, 1000); // Only fetch once per second

  const loadMore = () => {
    throttledFetch(currentPage + 1);
  };
}
```

### 4. Response Formatting

```javascript
// pages/products.js
import { fetchAPI, formatResponse } from 'mesh-fetcher';

export default function Products() {
  const fetchProducts = async () => {
    const response = await fetchAPI('https://api.example.com/products');
    
    // Format as array
    const productsArray = formatResponse(response, 'array');
    
    // Format as object
    const productObject = formatResponse(response, 'object');
    
    // Default JSON format
    const jsonResponse = formatResponse(response);
  };
}
```

## Advanced Usage

### 1. API Client Setup (Recommended Pattern)

```javascript
// lib/api.js
import { fetchAPI, debounce, throttle, formatResponse } from 'mesh-fetcher';

// Create a reusable API client
export const api = {
  // Basic fetch
  get: (url, options = {}) => fetchAPI(url, { method: 'GET', ...options }),
  
  // POST request
  post: (url, data, options = {}) => 
    fetchAPI(url, { 
      method: 'POST', 
      body: JSON.stringify(data), 
      ...options 
    }),
    
  // Debounced search
  search: debounce(async (query) => {
    const response = await fetchAPI(`/api/search?q=${query}`);
    return formatResponse(response, 'array');
  }, 300),
  
  // Throttled updates
  update: throttle(async (data) => {
    return fetchAPI('/api/update', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }, 1000)
};
```

### 2. Using in Components

```javascript
// components/ProductList.js
import { api } from '../lib/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const loadProducts = async () => {
      const data = await api.get('/api/products');
      setProducts(data);
    };
    
    loadProducts();
  }, []);
  
  const handleSearch = async (query) => {
    const results = await api.search(query);
    setProducts(results);
  };
  
  const handleUpdate = async (productId, data) => {
    await api.update({ id: productId, ...data });
  };
}
```

### 3. Server-Side Usage (getServerSideProps)

```javascript
// pages/products/[id].js
import { fetchAPI } from 'mesh-fetcher';

export async function getServerSideProps({ params }) {
  try {
    const product = await fetchAPI(`https://api.example.com/products/${params.id}`);
    
    return {
      props: {
        product
      }
    };
  } catch (error) {
    return {
      notFound: true
    };
  }
}
```

### 4. API Route Usage

```javascript
// pages/api/proxy.js
import { fetchAPI } from 'mesh-fetcher';

export default async function handler(req, res) {
  try {
    const response = await fetchAPI('https://external-api.com/data', {
      method: req.method,
      headers: req.headers,
      body: req.body
    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## Best Practices

1. **Create a Centralized API Client**
   - Define all API calls in one place
   - Easier to maintain and modify
   - Consistent error handling

2. **Use Environment Variables**
   ```javascript
   // .env.local
   NEXT_PUBLIC_API_URL=https://api.example.com
   
   // lib/api.js
   const API_URL = process.env.NEXT_PUBLIC_API_URL;
   ```

3. **Error Handling**
   ```javascript
   try {
     const data = await api.get('/endpoint');
   } catch (error) {
     // Handle different types of errors
     if (error.status === 404) {
       // Handle not found
     } else if (error.status === 429) {
       // Handle rate limiting
     }
   }
   ```

4. **Loading States**
   ```javascript
   const [isLoading, setIsLoading] = useState(false);
   
   const fetchData = async () => {
     setIsLoading(true);
     try {
       const data = await api.get('/endpoint');
     } finally {
       setIsLoading(false);
     }
   };
   ```

## Common Use Cases

1. **Search with Debouncing**
2. **Infinite Scroll with Throttling**
3. **Form Submissions**
4. **Real-time Updates**
5. **API Proxying**
6. **Data Caching**
7. **Rate-limited API Calls**

## Performance Tips

1. Use debouncing for search inputs
2. Use throttling for frequent updates
3. Implement proper error boundaries
4. Use loading states for better UX
5. Cache responses when appropriate
6. Use proper response formatting

This guide covers the basic to advanced usage of mesh-fetcher in Next.js projects. The library is designed to be simple to use while providing powerful features for handling API requests efficiently. 