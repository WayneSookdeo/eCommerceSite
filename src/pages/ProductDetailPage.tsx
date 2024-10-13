import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://vitejsvitemke78b-2sry--5173--134daa3c.local-credentialless.webcontainer.io/api/products/${id}`);
        if (!response.ok) {
          navigate('/products');
          return;
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        navigate('/products');
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row"
    >
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="md:w-1/2"
      >
        <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg" />
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="md:w-1/2 md:pl-8 mt-6 md:mt-0"
      >
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
        <p className="text-muted-foreground mb-6">{product.description}</p>
        <Button onClick={() => addToCart({ ...product, quantity: 1 })}>Add to Cart</Button>
      </motion.div>
    </motion.div>
  );
};

export default ProductDetailPage;
