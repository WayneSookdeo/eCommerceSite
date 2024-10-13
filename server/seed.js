import mongoose from 'mongoose';
import { Product } from './models/product.js';

const seedProducts = [
  { name: "Faith & Fitness Tee", price: 29.99, description: "Comfortable t-shirt with inspirational message", image: "https://example.com/faith-fitness-tee.jpg" },
  { name: "Blessed Gym Towel", price: 14.99, description: "Absorbent gym towel with 'Blessed' embroidery", image: "https://example.com/blessed-towel.jpg" },
  { name: "Warrior of Faith Tank", price: 24.99, description: "Breathable tank top for intense workouts", image: "https://example.com/warrior-tank.jpg" },
];

mongoose.connect('mongodb://localhost:27017/gymspirit')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert seed data
    await Product.insertMany(seedProducts);
    
    console.log('Seed data inserted successfully');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));