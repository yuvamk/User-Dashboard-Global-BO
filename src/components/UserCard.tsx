import React from 'react';
import { User } from '../types';
import { Mail, Phone, Globe } from 'lucide-react';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="card h-100 shadow-sm border-0 user-card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="avatar-placeholder rounded-circle bg-primary d-flex align-items-center justify-content-center me-3">
            <span className="text-white fw-bold fs-4">
              {user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h5 className="card-title mb-0">{user.name}</h5>
            <p className="card-subtitle text-muted mb-0">@{user.username}</p>
          </div>
        </div>
        
        <div className="contact-info">
          <div className="d-flex align-items-center mb-2">
            <Mail size={16} className="text-primary me-2" />
            <a href={`mailto:${user.email}`} className="text-decoration-none text-secondary">
              {user.email}
            </a>
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <Phone size={16} className="text-primary me-2" />
            <a href={`tel:${user.phone}`} className="text-decoration-none text-secondary">
              {user.phone}
            </a>
          </div>
          
          <div className="d-flex align-items-center">
            <Globe size={16} className="text-primary me-2" />
            <a 
              href={`https://${user.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-decoration-none text-secondary"
            >
              {user.website}
            </a>
          </div>
        </div>
      </div>
      
      <div className="card-footer bg-white border-top-0 pt-0">
        <div className="company-info">
          <small className="text-muted d-block">Company</small>
          <p className="mb-0 company-name">{user.company.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;