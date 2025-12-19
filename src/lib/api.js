
const BASE_URL = process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL || "http://localhost:5000/api/v1";

async function fetchWithTags(endpoint, tags = [], params = {}, options = {}) {
  const { requiresAuth = false } = options;
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  // Append query parameters
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  // Add auth header if required (for client-side calls)
  if (requiresAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: { tags },
      headers,
    });

    if (!res.ok) {
      const errorMessage = `Failed to fetch data from ${endpoint} (${res.status})`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    // Return empty structure on error to prevent crashes, but log the error
    return { data: [] };
  }
}

// Products
export async function getProducts(params = {}) {
  return fetchWithTags('/product', ['products'], params);
}

export async function getSingleProduct(id) {
  return fetchWithTags(`/product/${id}`, ['products']);
}

// Categories
export async function getCategories(params = {}) {
  return fetchWithTags('/category', ['Category'], params);
}

export async function getCategoriesForNavbar() {
  return fetchWithTags('/category/navbar', ['Category']);
}

export async function getSingleCategory(id) {
  return fetchWithTags(`/category/${id}`, ['Category']);
}

// Contacts
export async function getContacts(params = {}) {
  return fetchWithTags('/contact', ['contacts'], params);
}

// Employees
export async function getEmployees(params = {}) {
  return fetchWithTags('/employee', ['employees'], params);
}

// CSR
export async function getCSRs(params = {}) {
  return fetchWithTags('/csr', ['CSR'], params);
}

export async function getSingleCSR(id) {
  return fetchWithTags(`/csr/${id}`, ['CSR']);
}

// Reviews
export async function getReviews(params = {}) {
  return fetchWithTags('/review', ['reviews'], params);
}

export async function getSingleReview(id) {
  return fetchWithTags(`/review/${id}`, ['reviews']);
}

// Users
export async function getUsers(params = {}) {
  return fetchWithTags('/users', ['User'], params);
}

export async function getUserById(id) {
  return fetchWithTags(`/users/${id}`, ['User']);
}

export async function getMyProfile() {
  return fetchWithTags('/users/my', ['User'], {}, { requiresAuth: true });
}
