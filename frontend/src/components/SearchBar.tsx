import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <Box display="flex" alignItems="center" gap={2} mb={4} sx={{ width: '100%' }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by title or author"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ height: '56px', borderRadius: 2 }}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;