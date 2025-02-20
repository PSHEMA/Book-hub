import React, { useState } from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface FilterOptionsProps {
    onFilter: (genre: string, rating: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onFilter }) => {
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');

    const handleFilter = () => {
        onFilter(genre, rating);
    };

    return (
        <Box display="flex" alignItems="center" gap={2} mb={4} sx={{ width: '100%' }}>
            <FormControl fullWidth variant="outlined" sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                <InputLabel>Genre</InputLabel>
                <Select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value as string)}
                    label="Genre"
                >
                    <MenuItem value="">All Genres</MenuItem>
                    <MenuItem value="Fiction">Fiction</MenuItem>
                    <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="Fantasy">Fantasy</MenuItem>
                    <MenuItem value="Mystery">Dystopian</MenuItem>
                    <MenuItem value="Thriller">Romance</MenuItem>
                </Select>
            </FormControl>
            <TextField
                type="number"
                label="Minimum Rating"
                variant="outlined"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleFilter}
                sx={{ height: '56px', borderRadius: 2 }}
            >
                Apply Filters
            </Button>
        </Box>
    );
};

export default FilterOptions;