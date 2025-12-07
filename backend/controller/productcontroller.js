import { initalDBSetup } from '../db/db.js';

initalDBSetup()

const productController = {

    allProducts: async (req, res) => {
        const { username, name, password, register } = req.body;
        const selectProductsQuery = `SELECT * FROM products`

        const productList = await db.all(selectProductsQuery);

        res.send(productList)
    },
    searchProducts: async (req, res) => {
        const { category, page = 1, limit } = req.body;
        const filterProductQuery = `
            SELECT * FROM product
            WHERE category='${category}'
            LIMIT ${limit}
        `
        const searchProducts = await db.all(filterProductQuery)
        res.send(searchProducts)
    },
    productById: async (req, res) => {
        const { id } = req.body
        const getPoductQuery = `SELECT * FROM product whre id=${id}`
        const product = await db.get(getPoductQuery);
        res.send(product)
    }

}

export default productController