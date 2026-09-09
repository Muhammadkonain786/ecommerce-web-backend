import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

// Mongoose documents ko frontend-friendly "id" field ke sath bhejne ke liye helper
function toClient(doc) {
  const obj = doc.toObject ? doc.toObject() : doc;
  return { ...obj, id: obj._id.toString() };
}

// =====================================================================
// PUBLIC ROUTES (website ke liye)
// =====================================================================

app.get('/api/brands', (req, res) => {
  res.json([
    { id: 1, name: "VERSACE", className: "brand-versace" },
    { id: 2, name: "ZARA", className: "brand-zara" },
    { id: 3, name: "GUCCI", className: "brand-gucci" },
    { id: 4, name: "PRADA", className: "brand-prada" },
    { id: 5, name: "Calvin Klein", className: "brand-ck" }
  ]);
});

app.get('/api/products/new-arrivals', async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true });
    res.json(products.map(toClient));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/products/top-selling', async (req, res) => {
  try {
    const products = await Product.find({ isTopSelling: true });
    res.json(products.map(toClient));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/categories/styles', (req, res) => {
  res.json([
    { id: 1, title: "Casual", image: "/image9.png", className: "style-card-sm" },
    { id: 2, title: "Formal", image: "/image10.png", className: "style-card-lg" },
    { id: 3, title: "Party", image: "/image11.png", className: "style-card-lg" },
    { id: 4, title: "Gym", image: "/image12.png", className: "style-card-sm" }
  ]);
});

app.get('/api/products/related', async (req, res) => {
  try {
    const products = await Product.find({ isRelated: true });
    res.json(products.map(toClient));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Single product detail - MUST be defined before other more specific routes below it
// aren't affected since Express matches in order and this path pattern is distinct.
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product nahi mila" });
    }
    res.json(toClient(product));
  } catch (err) {
    res.status(404).json({ message: "Product nahi mila" });
  }
});

app.get('/api/products/category/:styleName', async (req, res) => {
  try {
    const style = req.params.styleName.toLowerCase();
    const products = await Product.find({ category: style });
    res.json(products.length > 0 ? products.map(toClient) : []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/reviews', (req, res) => {
  res.json([
    { id: 1, name: "Samantha D.", rating: "★★★★★", text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.", date: "Posted on August 14, 2023" },
    { id: 2, name: "Alex M.", rating: "★★★★☆", text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.", date: "Posted on August 15, 2023" },
    { id: 3, name: "Ethan R.", rating: "★★★★☆", text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", date: "Posted on August 16, 2023" },
    { id: 4, name: "Olivia P.", rating: "★★★★☆", text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.", date: "Posted on August 17, 2023" },
    { id: 5, name: "Liam K.", rating: "★★★★☆", text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.", date: "Posted on August 18, 2023" },
    { id: 6, name: "Ava H.", rating: "★★★★★", text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.", date: "Posted on August 19, 2023" },
    { id: 7, name: "Sarah J.", rating: "★★★★★", text: "The fabric quality is exceptionally durable. Even after multiple washes, the color didn't fade at all. Truly worth every penny!", date: "Posted on August 20, 2023" },
    { id: 8, name: "Michael B.", rating: "★★★★☆", text: "Great packaging and fast shipping. The fit is slightly oversized just like I wanted. Highly recommended for streetwear fans.", date: "Posted on August 21, 2023" },
    { id: 9, name: "Jessica W.", rating: "★★★★★", text: "Super soft material against the skin. I wear it to casual outings and always get compliments on the clean graphic design.", date: "Posted on August 22, 2023" },
    { id: 10, name: "David L.", rating: "★★★★☆", text: "Good value for money. The stitching is neat with no loose threads anywhere. Will definitely buy another color soon.", date: "Posted on August 23, 2023" },
  ]);
});

// =====================================================================
// ORDER ROUTES (checkout se order create hota hai)
// =====================================================================

// Naya order place karna (checkout se call hota hai)
app.post('/api/orders', async (req, res) => {
  try {
    const { items, customerName, customerEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order mein items hone chahiye" });
    }

    let totalAmount = 0;
    let totalProfit = 0;

    // Har item ke liye stock kam karein aur profit calculate karein
    for (const item of items) {
      totalAmount += item.price * item.quantity;
      totalProfit += (item.price - (item.costPrice || 0)) * item.quantity;

      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    const order = await Order.create({
      items,
      totalAmount,
      totalProfit,
      customerName: customerName || "Guest",
      customerEmail: customerEmail || "",
    });

    res.status(201).json(toClient(order));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// =====================================================================
// ADMIN ROUTES (dashboard ke liye)
// =====================================================================

// Simple password check - Railway par ADMIN_PASSWORD environment variable set karein
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === correctPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Galat password" });
  }
});

// Admin ke liye saare products (stock/cost sab ke sath)
app.get('/api/admin/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products.map(toClient));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Naya product add karna
app.post('/api/admin/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(toClient(product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Product edit karna (price, stock, image, waghera)
app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product nahi mila" });
    res.json(toClient(product));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Product delete karna
app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product nahi mila" });
    res.json({ message: "Product delete ho gaya" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Saare orders (dashboard ke liye)
app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders.map(toClient));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Dashboard stats: total income, total orders, total profit, monthly chart data
app.get('/api/admin/stats', async (req, res) => {
  try {
    const orders = await Order.find();
    const products = await Product.find();

    const totalIncome = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalProfit = orders.reduce((sum, o) => sum + o.totalProfit, 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const outOfStockCount = products.filter((p) => p.stock <= 0).length;

    // Pichle 6 mahino ka income/profit chart data
    const monthlyMap = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString('en-US', { month: 'short' });
      monthlyMap[key] = { month: key, income: 0, profit: 0 };
    }
    orders.forEach((o) => {
      const key = new Date(o.createdAt).toLocaleString('en-US', { month: 'short' });
      if (monthlyMap[key]) {
        monthlyMap[key].income += o.totalAmount;
        monthlyMap[key].profit += o.totalProfit;
      }
    });

    res.json({
      totalIncome,
      totalProfit,
      totalOrders,
      totalProducts,
      outOfStockCount,
      monthlyChart: Object.values(monthlyMap),
      recentOrders: orders.slice(0, 5).map(toClient),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
