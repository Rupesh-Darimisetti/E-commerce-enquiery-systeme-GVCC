
const Product = (data) => {
    const { image, short_desc, price } = data
    return (<>
        <img src={image} />
        <p>{short_desc}</p>
        <p>{price}</p>
    </>)
}

export default Product