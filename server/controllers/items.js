import Item from "../models/Item.js"

export const getItems = async (req, res) => {
    try {
        const item = await Item.find();
        res.status(200).json(item)
    }catch (e) {
        res.status(404).json({ message: e.message})
    }
}

export const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        res.status(200).json(item)
    }catch(e){
        res.status(404).json({ message: e.message});
    }
}