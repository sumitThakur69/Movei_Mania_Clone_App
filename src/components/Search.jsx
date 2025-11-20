import React from 'react';

const Search = ({ searchTerm , setSearchTerm }) => {
    return (
        <div className='search'>
            <div>
                <img src="search.svg" alt="Search" />

                <input 
                placeholder='Search Here Movies'
                value={searchTerm}
                onChange={(e)=> setSearchTerm(e.target.value)}
                type="text" />
            </div>
        </div>
)
}

export default Search;