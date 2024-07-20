import { Home, ShoppingCart, Package, Users, LineChart } from 'lucide-react';

export const navMenus = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Dashboard', to: '/dashboard', icon: Home },
  { name: 'Order', to: '/order', icon: ShoppingCart, badge: true },
  { name: 'Product', to: '/product', icon: Package },
  { name: 'Customer', to: '/customer', icon: Users },
  { name: 'Analytic', to: '/analytic', icon: LineChart }
];

export const navMenuStyle = {
  nonActive: 'text-muted-foreground',
  active: 'bg-muted text-foreground'
};

export const categories = [
  't-shirt',
  'jeans',
  'sneakers',
  'hats',
  'accessories'
];