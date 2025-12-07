
export default function ProductCard({ product, onView }) {
    return (
        <article className="card">
            <img src={product.image_url} alt={product.name} />
            <div className="card-body">
                <h3>{product.name}</h3>
                <p className="short-desc">{product.short_desc}</p>
                <div className="meta">
                    <span className="price">₹{product.price}</span>
                    <button onClick={onView}>View</button>
                </div>
            </div>
        </article>
    );
}
