const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export async function fetchProducts({ search = '', category = '', page = 1, limit = 6 } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    params.append('page', page);
    params.append('limit', limit);
    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function fetchProduct(id) {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

export async function postEnquiry(payload) {
    const res = await fetch(`${API_BASE}/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown' }));
        throw err;
    }
    return res.json();
}
