import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-container position-relative mb-4">
      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <Search size={18} className="text-muted" />
        </span>
        <input
          type="text"
          className="form-control border-start-0 ps-0"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search users"
        />
      </div>
    </div>
  );
};

export default SearchBar;