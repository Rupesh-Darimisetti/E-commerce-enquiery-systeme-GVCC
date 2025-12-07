import { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';
import ProductCard from './ProductCard';

export default function ProductList({ onViewDetails }) {
    const [products, setProducts] = useState([]);
    const [pageInfo, setPageInfo] = useState({ page: 1, limit: 6, totalPages: 1 });
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const categories = ['', 'Electronics', 'Home', 'Sports', 'Music'];

    async function load(p = 1) {
        setLoading(true);
        try {
            const res = await fetchProducts({ search, category, page: p, limit: pageInfo.limit });
            setProducts(res.data);
            setPageInfo(prev => ({ ...prev, page: res.pagination.page, totalPages: res.pagination.totalPages }));
        } catch (err) {
            console.error(err);
            alert('Failed to load products');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(1); /* search/category changed */ }, [search, category]);

    return (
        <section className="product-list">
            <div className="controls">
                <input aria-label="Search products" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
                <select aria-label="Filter by category" value={category} onChange={e => setCategory(e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c || 'All Categories'}</option>)}
                </select>
            </div>

            {loading ? <p>Loading...</p> : (
                <div className="grid">
                    {products.map(p => <ProductCard key={p.id} product={p} onView={() => onViewDetails(p.id)} />)}
                </div>
            )}

            <div className="pagination">
                <button disabled={pageInfo.page <= 1} onClick={() => load(pageInfo.page - 1)}>Prev</button>
                <span>Page {pageInfo.page} / {pageInfo.totalPages}</span>
                <button disabled={pageInfo.page >= pageInfo.totalPages} onClick={() => load(pageInfo.page + 1)}>Next</button>
            </div>
        </section>
    );
}
