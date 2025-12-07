import { useEffect, useState } from 'react';
import { fetchProduct } from '../api/api';
import EnquiryForm from './EnquiryFrom';

export default function ProductDetailsModal({ productId, onClose }) {
  const [product, setProduct] = useState(null);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    fetchProduct(productId).then(setProduct).catch(err => {
      console.error(err);
      alert('Failed to load product');
    });
  }, [productId]);

  if (!product) return <div className="modal">Loading...</div>;

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close" onClick={onClose} aria-label="Close">×</button>
        <div className="details">
          <img src={product.image_url} alt={product.name} />
          <div>
            <h2>{product.name}</h2>
            <p className="long-desc">{product.long_desc || product.short_desc}</p>
            <p className="price">₹{product.price}</p>
            <button onClick={() => setShowEnquiry(s => !s)}>Enquire</button>
            {showEnquiry && <EnquiryForm productId={product.id} onSuccess={() => { alert('Enquiry sent'); setShowEnquiry(false); }} />}
          </div>
        </div>
      </div>
    </div>
  );
}
