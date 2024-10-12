import { ScanBarcode, House, Package, ArrowUpNarrowWide, } from 'lucide-react';

export const navMenus = [
  { name: 'Home', to: '/', icon: House },
  { name: 'Product', to: '/product', icon: ScanBarcode, isAdmin: true },
  { name: 'Order', to: '/order', icon: Package, badge: true, isAdmin: true },
  { name: 'Promotion', to: '/promotion', icon: ArrowUpNarrowWide, isAdmin: true },
];

export const navMenuStyle = {
  nonActive: 'text-muted-foreground',
  active: 'bg-muted-foreground/10 text-foreground'
};

export const categories = [
  't-shirt',
  'jeans',
  'sneakers',
  'hats',
  'accessories'
];