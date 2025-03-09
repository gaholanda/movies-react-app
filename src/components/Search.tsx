import React from 'react';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const Search: React.FC<SearchProps> = (props) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}
