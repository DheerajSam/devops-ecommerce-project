const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Home page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>DevOps Ecommerce Store</title>
      <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
        h1 { color: #2c3e50; }
        .product { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
        .btn { background: #3498db; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; }
        .status { background: #2ecc71; color: white; padding: 5px 10px; border-radius: 4px; }
      </style>
    </head>
    <body>
      <h1>🛒 DevOps Ecommerce Store</h1>
      <span class="status">✅ Pipeline Running Successfully</span>
      <h2>Featured Products</h2>
      <div class="product">
        <h3>AWS Cloud Architecture Guide</h3>
        <p>Complete guide to AWS cloud infrastructure</p>
        <p><strong>₹999</strong></p>
        <button class="btn">Add to Cart</button>
      </div>
      <div class="product">
        <h3>DevOps Masterclass</h3>
        <p>CI/CD, Docker, Kubernetes and more</p>
        <p><strong>₹1499</strong></p>
        <button class="btn">Add to Cart</button>
      </div>
      <div class="product">
        <h3>Terraform Handbook</h3>
        <p>Infrastructure as Code from scratch</p>
        <p><strong>₹799</strong></p>
        <button class="btn">Add to Cart</button>
      </div>
      <hr>
      <p>Server: ${process.env.HOSTNAME} | Port: ${PORT}</p>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Products API
app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, name: 'AWS Cloud Architecture Guide', price: 999 },
    { id: 2, name: 'DevOps Masterclass', price: 1499 },
    { id: 3, name: 'Terraform Handbook', price: 799 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Ecommerce app running on port ${PORT}`);
});
