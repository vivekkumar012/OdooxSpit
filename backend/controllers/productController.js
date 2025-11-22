import productModel from "../models/productModel";

export const addProduct = async (req, res) => {
    try {
        const { name, sku, category, uom, description, recorderLevel } = req.body;

        if (!name || !sku || !category || !uom || !description || !recorderLevel) {
            return res.status(402).json({
                message: "All Fields are required"
            })
        }

        const newProduct = await productModel.create({
            name,
            sku,
            category,
            uom,
            description,
            recorderLevel
        })

        res.status(200).json({
            message: "New Product created!!",
            newProduct
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in creating product",
            error: error.message
        })
    }
}

export const updateProduct = async(req, res) => {
    const {} = req.body;
}