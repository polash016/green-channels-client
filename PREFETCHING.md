# Intelligent Prefetching System

## Overview

I've implemented an advanced prefetching system that automatically loads data and resources in the background when users are idle on your site.

## How It Works

### 1. **Idle Detection**
The system detects when users are idle (not moving mouse, scrolling, or typing for 2 seconds) and then begins prefetching.

### 2. **Intelligent Prioritization**
Resources are loaded in order of importance:

**Priority 1 - Routes** (starts immediately when idle)
- `/about`
- `/services`  
- `/products`
- `/csr`

**Priority 2 - Images** (staggered loading)
- Critical page images
- Logo and hero images

**Priority 3 - Product Data** (2 seconds after idle starts)
- First 20 products from API
- Cached in memory for instant access

**Priority 4 - Categories Data**
- All categories for navigation
- Cached for instant category browsing

### 3. **Smart Caching**
Data is stored in a JavaScript Map cache:
```javascript
import { getCachedData, hasCachedData } from '@/components/Prefetch';

// Check if products are cached
if (hasCachedData('products')) {
  const products = getCachedData('products');
  // Use cached data instantly!
}
```

## What Users Experience

1. **Land on homepage** → Page loads normally
2. **Stop interacting for 2 seconds** → Prefetching starts automatically
3. **Click "Products"** → Page loads INSTANTLY (already prefetched)
4. **View product images** → Images appear INSTANTLY (already preloaded)

## Performance Benefits

- ⚡ **Instant navigation** - Routes are pre-loaded
- 🖼️ **No image loading delays** - Critical images prefetched
- 📊 **Instant data** - API responses cached in memory
- 🎯 **Smart timing** - Only prefetches during idle time
- 📱 **Network-friendly** - Staggered loading prevents overwhelming the connection

## Technical Details

**Location:** `src/components/Prefetch.jsx`
**Usage:** Automatically active on all main pages via layout

**Console Messages:**
- ✅ "Prefetched products data" - Products loaded
- ✅ "Prefetched categories data" - Categories loaded
- "Products already cached" - Using existing cache

## Configuration

Edit `src/components/Prefetch.jsx` to:
- Change idle timeout (default: 2 seconds)
- Add more routes to prefetch
- Add more images to preload
- Adjust data prefetching limits

## Next.js Link Prefetching

Next.js also automatically prefetches:
- All `<Link>` components visible in viewport
- On hover for visible links (desktop)
- On touch for visible links (mobile)

This means **double prefetching** for maximum speed!
