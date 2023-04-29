import Order from "../models/Order.js"
import Item from "../models/Item.js"
import Stripe from "stripe"

export const createOrder = async (req, res) => {
    try {
      const { products, userName, email } = req.body;
      console.log(req.body)
      console.log("products: " + JSON.stringify(products))
        // retrieve item information
        const lineItems = await Promise.all(
          products.map(async (product) => {
            const item = await Item.findById(product._id);
            console.log(item.name)
            console.log(item.price * 100)
            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
              },
              quantity: product.count,
            };
          })
        );
        console.log(lineItems)
          console.log("creating payment session")
        // create a stripe session
        const stripe = new Stripe (process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: email,
          mode: "payment",
          success_url: "http://localhost:3000/checkout/success",
          cancel_url: "http://localhost:3000",
          line_items: lineItems,
        });

        console.log('session: ' + session.id)
  
        // create the item
        const newOrder = new Order ({
            products,
            userName,
            stripeSessionId: session.id
        })
        await newOrder.save();
        const order = await Order.find();
        res.status(201).json(session.id)
        
      } catch (error) {
        res.status(500).json("internal server error")
        return { error: { message: "There was a problem creating the charge" } };
      }
}