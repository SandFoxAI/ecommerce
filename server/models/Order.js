import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    products: {
        type: Array,
        of: Object
    },
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    stripeSessionId: {
        type: String,
        required: true,
    },
},{timestamps: true });

const Order = mongoose.model("Order",OrderSchema)
export default Order;