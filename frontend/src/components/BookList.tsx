import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Book } from '../types';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Typography, List, ListItem, ListItemText, Pagination, Alert, Snackbar } from '@mui/material';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/books', {
                params: { genre, rating, search: searchTerm, page: currentPage, limit },
            });
            console.log('API Response:', response.data);
            if (response.data.data) {
                setBooks(response.data.data);
                setTotalPages(response.data.pagination.pages);
            } else {
                setBooks(Array.isArray(response.data) ? response.data : []);
                setTotalPages(1);
            }
            setError(null);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to fetch books. Please try again later.');
            setBooks([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBooks();
    }, [genre, rating, searchTerm, currentPage]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleCloseError = () => {
        setError(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h3" gutterBottom align="center" color="primary">
                Book List
            </Typography>
            <SearchBar onSearch={setSearchTerm} />
            <FilterOptions onFilter={(g, r) => { setGenre(g); setRating(r); }} />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
                    <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <List sx={{ width: '100%' }}>
                    {books.map((book) => (
                        <ListItem key={book.id} divider sx={{ bgcolor: 'background.paper', borderRadius: 2, mb: 2 }}>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" color="text.primary">
                                        {book.title}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1" color="text.secondary">
                                            Author: {book.author}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Genre: {book.genre}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Rating: {book.rating}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            )}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default BookList;