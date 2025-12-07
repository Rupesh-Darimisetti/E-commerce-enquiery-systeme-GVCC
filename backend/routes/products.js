import express from 'express'
import productContoller from '../controller/productController.js'
const productRouter = express.Router()

productRouter.get('/', productContoller)

export default productRouter