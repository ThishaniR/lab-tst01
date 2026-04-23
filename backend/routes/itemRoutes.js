const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// GET /api/items
// Return all items from the database.
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Failed to get items" });
  }
});

// POST /api/items
// Create a new item using data sent from the React form.
router.post("/", async (req, res) => {
  try {
    const { name, quantity, price, description } = req.body;

    const newItem = new Item({
      name,
      quantity,
      price,
      description
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: "Failed to add item" });
  }
});

// DELETE /api/items/:id
// Delete one item by its MongoDB id.
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete item" });
  }
});

module.exports = router;
