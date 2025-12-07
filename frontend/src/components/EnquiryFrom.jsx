import { useState } from 'react';
import { postEnquiry } from '../api/api';

export default function EnquiryForm({ productId = null, onSuccess }) {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Valid email is required';
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.message.trim()) e.message = 'Message is required';
        return e;
    }

    async function submit(e) {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;
        setLoading(true);
        try {
            await postEnquiry({ product_id: productId, ...form });
            setForm({ name: '', email: '', phone: '', message: '' });
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error(err);
            alert('Failed to send enquiry');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="enquiry-form" onSubmit={submit} noValidate>
            <div>
                <label>Name*</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
                {errors.name && <div className="error">{errors.name}</div>}
            </div>
            <div>
                <label>Email*</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                {errors.email && <div className="error">{errors.email}</div>}
            </div>
            <div>
                <label>Phone</label>
                <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
                <label>Message*</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                {errors.message && <div className="error">{errors.message}</div>}
            </div>
            <div>
                <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Enquiry'}</button>
            </div>
        </form>
    );
}
