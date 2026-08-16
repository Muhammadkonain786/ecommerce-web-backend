import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. Brands Route
app.get('/api/brands', (req, res) => {
  res.json([
    { id: 1, name: "VERSACE", className: "brand-versace" },
    { id: 2, name: "ZARA", className: "brand-zara" },
    { id: 3, name: "GUCCI", className: "brand-gucci" },
    { id: 4, name: "PRADA", className: "brand-prada" },
    { id: 5, name: "Calvin Klein", className: "brand-ck" }
  ]);
});

// 2. New Arrivals
app.get('/api/products/new-arrivals', (req, res) => {
  res.json([
    { id: 1, name: "T-shirt with Tape Details", image: "/image1.png", rating: "4.5/5", stars: "★★★★☆", price: "$120" },
    { id: 2, name: "Skinny Fit Jeans", image: "/image2.png", rating: "3.5/5", stars: "★★★☆☆", price: "$240", originalPrice: "$260", discount: "-20%" },
    { id: 3, name: "Checkered Shirt", image: "/image3.png", rating: "4.5/5", stars: "★★★★☆", price: "$180" },
    { id: 4, name: "Sleeve Striped T-shirt", image: "/image4.png", rating: "4.5/5", stars: "★★★★☆", price: "$130", originalPrice: "$160", discount: "-30%" },
    { id: 5, name: "Courage Graphic T-shirt", image: "/image6.png", rating: "4.0/5", stars: "★★★★☆", price: "$145" },
    { id: 6, name: "Loose Fit Bermuda Shorts", image: "/image7.png", rating: "3.0/5", stars: "★★★☆☆", price: "$80" }
  ]);
});

// 3. Top Selling
app.get('/api/products/top-selling', (req, res) => {
  res.json([
    { id: 1, name: "Vertical Striped Shirt", image: "/image5.png", rating: "5.0/5", stars: "★★★★★", price: "$212", originalPrice: "$232", discount: "-20%" },
    { id: 2, name: "Courage Graphic T-shirt", image: "/image6.png", rating: "4.0/5", stars: "★★★★☆", price: "$145" },
    { id: 3, name: "Loose Fit Bermuda Shorts", image: "/image7.png", rating: "3.0/5", stars: "★★★☆☆", price: "$80" },
    { id: 4, name: "Faded Skinny Jeans", image: "/image8.png", rating: "4.5/5", stars: "★★★★☆", price: "$210" },
    { id: 5, name: "T-shirt with Tape Details", image: "/image1.png", rating: "4.5/5", stars: "★★★★☆", price: "$120" },
    { id: 6, name: "Checkered Shirt", image: "/image3.png", rating: "4.5/5", stars: "★★★★☆", price: "$180" }
  ]);
});

// 4. Dress Styles
app.get('/api/categories/styles', (req, res) => {
  res.json([
    { id: 1, title: "Casual", image: "/image9.png", className: "style-card-sm" },
    { id: 2, title: "Formal", image: "/image10.png", className: "style-card-lg" },
    { id: 3, title: "Party", image: "/image11.png", className: "style-card-lg" },
    { id: 4, title: "Gym", image: "/image12.png", className: "style-card-sm" }
  ]);
});

// 5. You Might Also Like / Related Products Route
app.get('/api/products/related', (req, res) => {
  res.json([
    { 
      id: 101, 
      name: "Polo with Contrast Trims", 
      image: "/image13.png", 
      rating: "4.0/5", 
      stars: "★★★★☆", 
      price: "$212", 
      originalPrice: "$242", 
      discount: "-20%" 
    },
    { 
      id: 102, 
      name: "Gradient Graphic T-shirt", 
      image: "/image14.png", 
      rating: "3.5/5", 
      stars: "★★★☆☆", 
      price: "$145" 
    },
    { 
      id: 103, 
      name: "Polo with Tipping Details", 
      image: "/image15.png", 
      rating: "4.5/5", 
      stars: "★★★★☆", 
      price: "$180" 
    },
    { 
      id: 104, 
      name: "Black Striped T-shirt", 
      image: "/image16.png", 
      rating: "5.0/5", 
      stars: "★★★★★", 
      price: "$120", 
      originalPrice: "$150", 
      discount: "-30%" 
    }
  ]);
});

// 6. Single Product Detail Route (Updated with Related Products IDs 101-104)
app.get('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);

  const allProducts = [
    { 
      id: 1, 
      name: "T-shirt with Tape Details", 
      image: "/image1.png", 
      images: ["/image1.png", "/image1.png", "/image1.png"], 
      rating: "4.5/5", 
      price: "$120", 
      description: "This graphic t-shirt which is perfect for any occasion.",
      colors: ["#313B2F", "#26433B", "#252B48"],
      sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    { 
      id: 2, 
      name: "Skinny Fit Jeans", 
      image: "/image2.png", 
      images: ["/image2.png", "/image2.png", "/image2.png"], 
      rating: "3.5/5", 
      price: "$240", 
      originalPrice: "$260", 
      discount: "-20%", 
      description: "Skinny fit jeans crafted from high-quality denim.",
      colors: ["#252B48", "#313B2F"],
      sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    { 
      id: 3, 
      name: "Checkered Shirt", 
      image: "/image3.png", 
      images: ["/image3.png", "/image3.png", "/image3.png"], 
      rating: "4.5/5", 
      price: "$180", 
      description: "Stylish checkered shirt for casual wear.",
      colors: ["#313B2F", "#26433B"],
      sizes: ["Medium", "Large", "X-Large"]
    },
    { 
      id: 4, 
      name: "Sleeve Striped T-shirt", 
      image: "/image4.png", 
      images: ["/image4.png", "/image4.png", "/image4.png"], 
      rating: "4.5/5", 
      price: "$130", 
      originalPrice: "$160", 
      discount: "-30%", 
      description: "Comfortable sleeve striped t-shirt.",
      colors: ["#252B48", "#313B2F", "#26433B"],
      sizes: ["Small", "Medium", "Large"]
    },
    { 
      id: 5, 
      name: "Courage Graphic T-shirt", 
      image: "/image6.png", 
      images: ["/image6.png", "/image6.png", "/image6.png"], 
      rating: "4.0/5", 
      price: "$145", 
      description: "Courage graphic t-shirt with premium cotton.",
      colors: ["#26433B", "#252B48"],
      sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    { 
      id: 6, 
      name: "Loose Fit Bermuda Shorts", 
      image: "/image7.png", 
      images: ["/image7.png", "/image7.png", "/image7.png"], 
      rating: "3.0/5", 
      price: "$80", 
      description: "Loose fit Bermuda shorts for summer.",
      colors: ["#313B2F", "#252B48"],
      sizes: ["Medium", "Large", "X-Large"]
    },
    // Related Products (IDs 101 to 104 added here)
    { 
      id: 101, 
      name: "Polo with Contrast Trims", 
      image: "/image13.png", 
      images: ["/image13.png", "/image13.png", "/image13.png"], 
      rating: "4.0/5", 
      price: "$212", 
      originalPrice: "$242", 
      discount: "-20%",
      description: "Polo with contrast trims.",
      colors: ["#313B2F", "#26433B"],
      sizes: ["Small", "Medium", "Large"]
    },
    { 
      id: 102, 
      name: "Gradient Graphic T-shirt", 
      image: "/image14.png", 
      images: ["/image14.png", "/image14.png", "/image14.png"], 
      rating: "3.5/5", 
      price: "$145",
      description: "Gradient graphic t-shirt.",
      colors: ["#252B48", "#313B2F"],
      sizes: ["Medium", "Large", "X-Large"]
    },
    { 
      id: 103, 
      name: "Polo with Tipping Details", 
      image: "/image15.png", 
      images: ["/image15.png", "/image15.png", "/image15.png"], 
      rating: "4.5/5", 
      price: "$180",
      description: "Polo with tipping details.",
      colors: ["#313B2F", "#26433B"],
      sizes: ["Small", "Medium", "Large"]
    },
    { 
      id: 104, 
      name: "Black Striped T-shirt", 
      image: "/image16.png", 
      images: ["/image16.png", "/image16.png", "/image16.png"], 
      rating: "5.0/5", 
      price: "$120", 
      originalPrice: "$150", 
      discount: "-30%",
      description: "Black striped t-shirt.",
      colors: ["#252B48", "#26433B"],
      sizes: ["Small", "Medium", "Large", "X-Large"]
    }
  ];

  let product = allProducts.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product nahi mila" });
  }

  res.json(product);
});

// 7. Reviews Route
app.get('/api/reviews', (req, res) => {
  res.json([
    { 
      id: 1, 
      name: "Samantha D.", 
      rating: "★★★★★", 
      text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.", 
      date: "Posted on August 14, 2023" 
    },
    { 
      id: 2, 
      name: "Alex M.", 
      rating: "★★★★☆", 
      text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.", 
      date: "Posted on August 15, 2023" 
    },
    { 
      id: 3, 
      name: "Ethan R.", 
      rating: "★★★★☆", 
      text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.", 
      date: "Posted on August 16, 2023" 
    },
    { 
      id: 4, 
      name: "Olivia P.", 
      rating: "★★★★☆", 
      text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.", 
      date: "Posted on August 17, 2023" 
    },
    { 
      id: 5, 
      name: "Liam K.", 
      rating: "★★★★☆", 
      text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.", 
      date: "Posted on August 18, 2023" 
    },
    { 
      id: 6, 
      name: "Ava H.", 
      rating: "★★★★★", 
      text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.", 
      date: "Posted on August 19, 2023" 
    },
    { 
      id: 7, 
      name: "Sarah J.", 
      rating: "★★★★★", 
      text: "The fabric quality is exceptionally durable. Even after multiple washes, the color didn't fade at all. Truly worth every penny!", 
      date: "Posted on August 20, 2023" 
    },
    { 
      id: 8, 
      name: "Michael B.", 
      rating: "★★★★☆", 
      text: "Great packaging and fast shipping. The fit is slightly oversized just like I wanted. Highly recommended for streetwear fans.", 
      date: "Posted on August 21, 2023" 
    },
    { 
      id: 9, 
      name: "Jessica W.", 
      rating: "★★★★★", 
      text: "Super soft material against the skin. I wear it to casual outings and always get compliments on the clean graphic design.", 
      date: "Posted on August 22, 2023" 
    },
    { 
      id: 10, 
      name: "David L.", 
      rating: "★★★★☆", 
      text: "Good value for money. The stitching is neat with no loose threads anywhere. Will definitely buy another color soon.", 
      date: "Posted on August 23, 2023" 
    },
  ]);
});

app.get('/api/products/category/:styleName', (req, res) => {
  const style = req.params.styleName.toLowerCase();
  
  // Master list jismein har category ke bohot saare products hain
  const allMasterProducts = [
    // --- Casual Category Products ---
    { id: 1, name: "Gradient Graphic T-shirt", image: "/image1.png", rating: "3.5/5", stars: "★★★☆☆", price: "$145", category: "casual" },
    { id: 2, name: "Polo with Tipping Details", image: "/image2.png", rating: "4.5/5", stars: "★★★★☆", price: "$180", category: "casual" },
    { id: 3, name: "Black Striped T-shirt", image: "/image3.png", rating: "5.0/5", stars: "★★★★★", price: "$120", originalPrice: "$150", discount: "-30%", category: "casual" },
    { id: 4, name: "Skinny Fit Jeans", image: "/image4.png", rating: "3.5/5", stars: "★★★☆☆", price: "$240", originalPrice: "$260", discount: "-20%", category: "casual" },
    { id: 5, name: "Checkered Shirt", image: "/image5.png", rating: "4.5/5", stars: "★★★★☆", price: "$180", category: "casual" },
    { id: 6, name: "Sleeve Striped T-shirt", image: "/image6.png", rating: "4.5/5", stars: "★★★★☆", price: "$130", originalPrice: "$160", discount: "-30%", category: "casual" },
    { id: 7, name: "Vertical Striped Shirt", image: "/image7.png", rating: "5.0/5", stars: "★★★★★", price: "$212", originalPrice: "$232", discount: "-20%", category: "casual" },
    { id: 8, name: "Courage Graphic T-shirt", image: "/image8.png", rating: "4.0/5", stars: "★★★★☆", price: "$145", category: "casual" },
    { id: 9, name: "Loose Fit Bermuda Shorts", image: "/image1.png", rating: "3.0/5", stars: "★★★☆☆", price: "$80", category: "casual" },
    { id: 10, name: "Faded Skinny Jeans", image: "/image2.png", rating: "4.5/5", stars: "★★★★☆", price: "$210", category: "casual" },

    // --- Formal Category Products ---
    { id: 11, name: "Classic Formal Blazer", image: "/image3.png", rating: "4.8/5", stars: "★★★★★", price: "$220", category: "formal" },
    { id: 12, name: "Formal Dress Pants", image: "/image4.png", rating: "4.2/5", stars: "★★★★☆", price: "$150", category: "formal" },
    { id: 13, name: "Executive White Shirt", image: "/image5.png", rating: "4.7/5", stars: "★★★★★", price: "$95", category: "formal" },
    { id: 14, name: "Slim Fit Business Suit", image: "/image6.png", rating: "4.9/5", stars: "★★★★★", price: "$320", originalPrice: "$380", discount: "-15%", category: "formal" },
    { id: 15, name: "Formal Silk Necktie", image: "/image7.png", rating: "4.3/5", stars: "★★★★☆", price: "$45", category: "formal" },
    { id: 16, name: "Oxford Leather Shoes", image: "/image8.png", rating: "4.8/5", stars: "★★★★★", price: "$180", category: "formal" },
    { id: 17, name: "Pinstripe Formal Vest", image: "/image1.png", rating: "4.1/5", stars: "★★★★☆", price: "$110", category: "formal" },
    { id: 18, name: "Button-Down Business Shirt", image: "/image2.png", rating: "4.4/5", stars: "★★★★☆", price: "$105", category: "formal" },

    // --- Party Category Products ---
    { id: 19, name: "Party Wear Velvet Shirt", image: "/image6.png", rating: "4.6/5", stars: "★★★★★", price: "$195", category: "party" },
    { id: 20, name: "Sequined Party Dress", image: "/image7.png", rating: "4.9/5", stars: "★★★★★", price: "$280", category: "party" },
    { id: 21, name: "Metallic Shimmer Blazer", image: "/image3.png", rating: "4.7/5", stars: "★★★★★", price: "$250", originalPrice: "$300", discount: "-16%", category: "party" },
    { id: 22, name: "Satin Night Out Shirt", image: "/image4.png", rating: "4.3/5", stars: "★★★★☆", price: "$140", category: "party" },
    { id: 23, name: "Designer Club Wear Jacket", image: "/image5.png", rating: "4.5/5", stars: "★★★★☆", price: "$215", category: "party" },
    { id: 24, name: "Velvet Evening Trousers", image: "/image8.png", rating: "4.2/5", stars: "★★★★☆", price: "$175", category: "party" },

    // --- Gym Category Products ---
    { id: 25, name: "Gym Activewear Shorts", image: "/image8.png", rating: "4.3/5", stars: "★★★★☆", price: "$75", category: "gym" },
    { id: 26, name: "Compression Training Top", image: "/image1.png", rating: "4.4/5", stars: "★★★★☆", price: "$65", category: "gym" },
    { id: 27, name: "Breathable Running Hoodie", image: "/image2.png", rating: "4.7/5", stars: "★★★★★", price: "$110", originalPrice: "$130", discount: "-15%", category: "gym" },
    { id: 28, name: "Flexible Jogger Pants", image: "/image3.png", rating: "4.5/5", stars: "★★★★☆", price: "$90", category: "gym" },
    { id: 29, name: "Performance Workout Tank", image: "/image4.png", rating: "4.1/5", stars: "★★★★☆", price: "$45", category: "gym" },
    { id: 30, name: "Athletic Zip-Up Track Jacket", image: "/image5.png", rating: "4.8/5", stars: "★★★★★", price: "$135", category: "gym" }
  ];

  // URL wale style ke mutabiq products filter karein
  const filteredProducts = allMasterProducts.filter(p => p.category === style);
  
  // Agar kisi category mein products hue toh woh bhej do, warna saare dikha do taake page khali na lage
  res.json(filteredProducts.length > 0 ? filteredProducts : allMasterProducts);
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});