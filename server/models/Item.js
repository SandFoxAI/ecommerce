import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    shortDescription: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    longDescription: {
        type: String,
        required: true,
        max: 50,
    },
    price: {
        type: Number,
        required: true,
    },
    imagePath: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ['newArrivals',"bestSellers","topRated"],
        default: "newArrivals"
    },
},{timestamps: true });

const Item = mongoose.model("Item",ItemSchema)
export default Item;