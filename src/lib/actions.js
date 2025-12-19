"use server";

import { cookies } from 'next/headers';
import { revalidateTag, revalidatePath } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_GREEN_CHANNELS_API_URL || "http://localhost:5000/api/v1";
const isDev = process.env.NODE_ENV === 'development';

async function mutate(endpoint, method, data, tagToInvalidate, isFormData = false, relatedPaths = []) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Get auth token from cookies for authenticated requests
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    if (isFormData) {
      options.body = data;
    } else {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
  }

  try {
    const res = await fetch(url, options);

    const text = await res.text();
    let responseData = { success: true };
    
    if (text && text.trim() !== "" && text !== "null") {
      try {
        responseData = JSON.parse(text);
      } catch (e) {
        if (isDev) {
          console.error(`[Server Action] JSON parse error for ${endpoint}:`, e.message);
        }
      }
    }

    if (!res.ok) {
      const errorMessage = responseData.message || `Failed to ${method.toLowerCase()} resource (${res.status})`;
      
      if (isDev) {
        console.error(`[Server Action Error] ${method} ${endpoint}:`, { 
          status: res.status, 
          message: errorMessage 
        });
      }
      
      throw new Error(errorMessage);
    }

    // Revalidate cache tags
    if (tagToInvalidate) {
      revalidateTag(tagToInvalidate);
    }

    // Revalidate related paths for better cache management
    if (relatedPaths.length > 0) {
      relatedPaths.forEach(path => revalidatePath(path));
    }
    
    if (isDev) {
      console.log(`[Server Action Success] ${method} ${endpoint}`);
    }

    return { success: true, data: responseData };
  } catch (error) {
    console.error(`[Server Action] Mutation error for ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
}

// Products
export async function createProduct(formData) {
  return mutate('/product/create-product', 'POST', formData, 'products', true, ['/products', '/']);
}

export async function updateProduct(id, formData) {
  return mutate(`/product/${id}`, 'PATCH', formData, 'products', true, ['/products', `/products/${id}`]);
}

export async function deleteProduct(id) {
  return mutate(`/product/${id}`, 'DELETE', null, 'products', false, ['/products', '/']);
}

export async function deleteProductImage(productId, imageIndex) {
  return mutate(`/product/${productId}/images/${imageIndex}`, 'DELETE', null, 'products');
}

// Categories
export async function createCategory(data) {
  return mutate('/category', 'POST', data, 'Category', false, ['/products']);
}

export async function updateCategory(id, data) {
  return mutate(`/category/${id}`, 'PATCH', data, 'Category', false, ['/products']);
}

export async function deleteCategory(id) {
  return mutate(`/category/${id}`, 'DELETE', null, 'Category', false, ['/products']);
}

// Contacts
export async function createContact(formData) {
  return mutate('/contact/create-contact', 'POST', formData, 'contacts', true);
}

export async function updateContact(id, formData) {
  return mutate(`/contact/${id}`, 'PATCH', formData, 'contacts', true);
}

export async function deleteContact(id) {
  return mutate(`/contact/${id}`, 'DELETE', null, 'contacts');
}

// Employees
export async function createEmployee(formData) {
  return mutate('/employee/create-employee', 'POST', formData, 'employees', true);
}

export async function updateEmployee(id, formData) {
  return mutate(`/employee/${id}`, 'PATCH', formData, 'employees', true);
}

export async function deleteEmployee(id) {
  return mutate(`/employee/${id}`, 'DELETE', null, 'employees');
}

// CSR
export async function createCSR(formData) {
  return mutate('/csr/create-csr', 'POST', formData, 'CSR', true);
}

export async function updateCSR(id, formData) {
  return mutate(`/csr/${id}`, 'PATCH', formData, 'CSR', true);
}

export async function deleteCSR(id) {
  return mutate(`/csr/${id}`, 'DELETE', null, 'CSR');
}

// Reviews
export async function createReview(data) {
  return mutate('/review/create-review', 'POST', data, 'reviews');
}

export async function updateReview(id, data) {
  return mutate(`/review/${id}`, 'PATCH', data, 'reviews');
}

export async function deleteReview(id) {
  return mutate(`/review/${id}`, 'DELETE', null, 'reviews');
}

// Users
export async function createUser(formData) {
  return mutate('/users/create-employee', 'POST', formData, 'User', true);
}

export async function updateUserProfile(formData) {
  return mutate('/users/my-profile', 'PATCH', formData, 'User', true);
}

export async function deleteUser(id) {
  return mutate(`/users/delete-employee/${id}`, 'DELETE', null, 'User');
}

export async function changePassword(data) {
  return mutate('/users/change-password', 'PATCH', data, 'User');
}
