const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Failed:", err));

//  Order Schema
const OrderSchema = new mongoose.Schema({
  name: String,
  address: String,
  item: String,
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);

//  API Routes
app.get("/api", (req, res) => {
    res.json({ message: "API is working fine!" });
});

app.post("/api/orders", async (req, res) => {
  try {
    const { name, address, item } = req.body;
    
    const newOrder = new Order({
      name,
      address,
      item,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order Placed Successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));