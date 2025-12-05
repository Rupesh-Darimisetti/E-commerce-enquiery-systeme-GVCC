const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/products', (req, res) => {
    const { search, category, page = 1, limit = 10 } = req.query;
    // Construct SQL query with params for search/filter/pagination
    // Execute query using db driver, e.g., db.all(query, params, (err, rows) => {...})
    res.json({ products: /* results */ });
});

app.listen(process.env.PORT || 3001);