import { PaginationParams, SearchParams, User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getUsers({ page, limit }: PaginationParams): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const allUsers = await response.json();
    
    // Implement server-side pagination by calculating the start and end indices
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return allUsers.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function searchUsers({ search, page, limit }: SearchParams): Promise<User[]> {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    let allUsers = await response.json();
    
    // Filter users by name if search term is provided
    if (search) {
      const searchLower = search.toLowerCase();
      allUsers = allUsers.filter((user: User) => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    // Implement server-side pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return allUsers.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

export async function getTotalUsers(search: string = ''): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    let allUsers = await response.json();
    
    // Filter users by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      allUsers = allUsers.filter((user: User) => 
        user.name.toLowerCase().includes(searchLower) || 
        user.email.toLowerCase().includes(searchLower)
      );
    }
    
    return allUsers.length;
  } catch (error) {
    console.error('Error getting total users:', error);
    throw error;
  }
}