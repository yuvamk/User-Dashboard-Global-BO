import React from 'react';
import { User } from '../types';
import UserCard from './UserCard';
import { Users } from 'lucide-react';

interface UserListProps {
  users: User[];
  loading: boolean;
  error: string | null;
}

const UserList: React.FC<UserListProps> = ({ users, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border\" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-primary">Fetching users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger shadow-sm" role="alert">
        <p className="mb-0 fw-semibold">{error}</p>
        <p className="mb-0 mt-2 text-danger-emphasis">Please try again later.</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-5">
        <Users size={64} className="text-primary mb-3 empty-state-icon" />
        <h5 className="fw-semibold text-primary">No users found</h5>
        <p className="text-muted">Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {users.map(user => (
        <div key={user.id} className="col">
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};

export default UserList;