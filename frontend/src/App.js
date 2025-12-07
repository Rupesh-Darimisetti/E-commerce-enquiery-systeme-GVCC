import { useState } from 'react';
import ProductDetailsModal from './components/ProductDetailsModal';
import ProductList from './components/ProductList';

export default function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  return (
    <div className="app">
      <header className="site-header">
        <h1>Product Showcase</h1>
      </header>
      <main>
        <ProductList onViewDetails={id => setSelectedProductId(id)} />
      </main>
      {selectedProductId && <ProductDetailsModal productId={selectedProductId} onClose={() => setSelectedProductId(null)} />}
      <footer className="site-footer">© Product Showcase</footer>
    </div>
  );
}
