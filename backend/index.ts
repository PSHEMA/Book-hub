import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { ParsedQs } from 'qs';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    rating: number;
    description?: string;
    [key: string]: any;
}

// Routes
app.get('/api/books', (req: Request, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const { genre, rating, search } = req.query;
    
    let query = 'SELECT * FROM books';
    const conditions: string[] = [];
    const params: any[] = [];
    
    if (genre) {
        conditions.push('genre = ?');
        params.push(genre);
    }
    
    if (typeof rating === 'string' && !isNaN(parseFloat(rating))) {
        conditions.push('rating >= ?');
        params.push(parseFloat(rating));
    }
    
    if (typeof search === 'string' && search.trim() !== '') {
        conditions.push('(title LIKE ? OR author LIKE ?)');
        const searchPattern = `%${search}%`;
        params.push(searchPattern, searchPattern);
    }
    
    if (conditions.length) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');

    query += ' LIMIT ? OFFSET ?';
    params.push(limit, (page - 1) * limit);

    connection.query(countQuery, params.slice(0, params.length - 2), (countErr, countResults: any) => {
        if (countErr) {
            console.error('Error counting books:', countErr);
            res.status(500).json({ error: 'Failed to count books' });
            return;
        }
        
        const total = countResults[0].total;

        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Error fetching books:', err);
                res.status(500).json({ error: 'Failed to fetch books' });
                return;
            }
            
            res.json({
                data: results,
                pagination: {
                    total,
                    page,
                    limit,
                    pages: Math.ceil(total / limit)
                }
            });
        });
    });
});

app.get('/api/books/search', (req: Request, res: Response) => {
    const { query: searchQuery } = req.query;
    
    if (!searchQuery || typeof searchQuery !== 'string') {
        res.status(400).json({ error: 'Search query is required' });
        return;
    }
    
    const sql = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ? OR description LIKE ? LIMIT 20';
    const searchPattern = `%${searchQuery}%`;
    
    connection.query(sql, [searchPattern, searchPattern, searchPattern], (err, results) => {
        if (err) {
            console.error('Error searching books:', err);
            res.status(500).json({ error: 'Failed to search books' });
            return;
        }
        
        res.json(results);
    });
});

app.get('/api/books/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'SELECT * FROM books WHERE id = ?';
    connection.query(query, [id], (err, results: any) => {
        if (err) {
            console.error('Error fetching book:', err);
            res.status(500).json({ error: 'Failed to fetch book' });
            return;
        }
        
        if (results.length === 0) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        
        res.json(results[0]);
    });
});

// Get books by genre
app.get('/api/genres/:genre/books', (req: Request, res: Response) => {
    const { genre } = req.params;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    
    const query = 'SELECT * FROM books WHERE genre = ? LIMIT ? OFFSET ?';
    connection.query(query, [genre, limit, (page - 1) * limit], (err, results) => {
        if (err) {
            console.error('Error fetching books by genre:', err);
            res.status(500).json({ error: 'Failed to fetch books' });
            return;
        }
        
        res.json(results);
    });
});

// Get all available genres
app.get('/api/genres', (req: Request, res: Response) => {
    const query = 'SELECT DISTINCT genre FROM books ORDER BY genre';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching genres:', err);
            res.status(500).json({ error: 'Failed to fetch genres' });
            return;
        }
        
        const genres = (results as any[]).map((row: any) => row.genre);
        res.json(genres);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
