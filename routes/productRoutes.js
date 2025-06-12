import express from 'express'
import { addProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../controller/productController.js'

const route=express.Router()

route.get('/',listProducts)
route.post('/add',addProduct)
route.get('/get/:id',getProductById)
route.patch('/update/:id',updateProduct)
route.delete('/delete/:id',deleteProduct)

export default route;