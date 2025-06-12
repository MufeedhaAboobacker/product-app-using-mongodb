import Product from "../models/product.js";
import HttpError from "../middlewares/httpError.js";
import mongoose from "mongoose";

// list Product

export const listProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ is_deleted: false });

    return res.status(200).json({
      status: true,
      message: null,
      data: products
    });
  } catch (error) {
    return next(new HttpError("Products not found", 500));
  }
};

// add product

export const addProduct = async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return next(new HttpError("Name and price are required", 400));
    }

    const newProduct = await Product.create({ name, price });

    if (!newProduct) {
      return next(new HttpError("Product could not be saved", 500));
    }

    res.status(201).json({
      status: true,
      message: "Product added",
      data: newProduct,
    });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};

// get Product By Id

export const getProductById = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const product = await Product.findOne({ _id: id, is_deleted: false });

    if (!product) {
      return next(new HttpError("Product not found", 404));
    }

    res.status(200).json({
      status: true,
      message: "",
      data: product,
    });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};


// update product

export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const { name, price } = req.body;


        const product = await Product.findOneAndUpdate(
            {_id:id,is_deleted:false}, //condition
            {name, price}, //update
            {new:true}); /// to save

        if (!product) {
            return next(new HttpError("Product not found", 404));
        }
        res.status(200).json({
            status: true,
            message: "Product updated successfully",
            data: null
        });

    } catch (error) {
     return next(new HttpError("not found",500))
    }
};

// delete product

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Product.findOneAndUpdate(
        { _id: id, is_deleted: false }, //condition
        {is_deleted:true}, // delete condition
        {new:true} // save
    );

    if (!product) {
      return next(new HttpError("Product not found", 404));
    }
    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    return next(new HttpError("Something went wrong", 500));
  }
};


