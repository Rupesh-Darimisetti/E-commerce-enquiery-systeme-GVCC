import cors from 'cors';
import dotenv from 'dotenv';
import express, { json } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { all, get, run } from './db/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
// seed()
const PORT = process.env.PORT || 4000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'changeme';

// GET /api/products?search=&category=&page=&limit=
app.get('/api/products', [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1 }).toInt()
], async (req, res) => {
    try {
        // validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const search = req.query.search ? `%${req.query.search}%` : null;
        const category = req.query.category || null;
        const page = parseInt(req.query.page || 1, 10);
        const limit = parseInt(req.query.limit || 6, 10);
        const offset = (page - 1) * limit;

        // count
        let where = [];
        let params = [];
        if (search) { where.push('name LIKE ?'); params.push(search); }
        if (category) { where.push('category = ?'); params.push(category); }
        const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

        const totalRow = await get(`SELECT COUNT(*) as cnt FROM products ${whereSql}`, params);
        const total = totalRow ? totalRow.cnt : 0;

        const products = await all(
            `SELECT id, name, category, short_desc, price, image_url FROM products
       ${whereSql}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`, [...params, limit, offset]
        );

        res.json({
            data: products,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/products/:id
app.get('/api/products/:id', [param('id').isInt().toInt()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const id = req.params.id;
        const product = await get('SELECT * FROM products WHERE id = ?', [id]);
        if (!product) return res.status(404).json({ error: 'Not found' });
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/enquiries
app.post('/api/enquiries', [
    body('product_id').optional().isInt().toInt(),
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('message').notEmpty().trim()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const { product_id = null, name, email, phone = '', message } = req.body;
        const r = await run(
            `INSERT INTO enquiries (product_id, name, email, phone, message)
       VALUES (?, ?, ?, ?, ?)`,
            [product_id, name, email, phone, message]
        );
        res.status(201).json({ id: r.id, message: 'Enquiry saved' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/enquiries  (admin protected by header x-admin-token)
app.get('/api/enquiries', async (req, res) => {
    const token = req.header('x-admin-token') || '';
    if (!token || token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const rows = await all(`SELECT e.*, p.name as product_name FROM enquiries e LEFT JOIN products p ON p.id = e.product_id ORDER BY e.created_at DESC`);
        res.json({ data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
