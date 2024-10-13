import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-background border-b"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          GymSpirit Apparel
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-primary">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="flex items-center hover:text-primary">
              <ShoppingCart className="h-6 w-6 mr-1" />
              Cart
              {cartItemCount > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;