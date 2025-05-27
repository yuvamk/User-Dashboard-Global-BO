import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { getUsers, searchUsers, getTotalUsers } from '../services/api';
import SearchBar from './SearchBar';
import UserList from './UserList';
import Pagination from './Pagination';
import { Users } from 'lucide-react';

const USERS_PER_PAGE = 6;

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const total = await getTotalUsers(debouncedSearchTerm);
        setTotalPages(Math.ceil(total / USERS_PER_PAGE));
      } catch (err) {
        console.error('Error fetching total users:', err);
      }
    };

    fetchTotalUsers();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let fetchedUsers;
        
        if (debouncedSearchTerm) {
          fetchedUsers = await searchUsers({
            search: debouncedSearchTerm,
            page: currentPage,
            limit: USERS_PER_PAGE
          });
        } else {
          fetchedUsers = await getUsers({
            page: currentPage,
            limit: USERS_PER_PAGE
          });
        }
        
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, debouncedSearchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dashboard-container container py-5">
      <div className="row mb-4">
        <div className="col">
          <div className="d-flex align-items-center">
            <Users size={32} className="text-primary me-3" />
            <div>
              <h1 className="h3 mb-0 fw-bold">User Dashboard</h1>
              <p className="text-muted mt-1 mb-0">
                Manage and explore user profiles
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12 col-lg-8 mx-auto">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={handleSearchChange} 
          />
        </div>
      </div>
      
      <div className="row">
        <div className="col">
          <UserList 
            users={users} 
            loading={loading} 
            error={error} 
          />
          
          {!loading && !error && users.length > 0 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;