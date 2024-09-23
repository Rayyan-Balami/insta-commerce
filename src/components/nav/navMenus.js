import { ScanBarcode, House, Package, ArrowUpNarrowWide, } from 'lucide-react';

export const navMenus = [
  { name: 'Home', to: '/', icon: House },
  { name: 'Product', to: '/product', icon: ScanBarcode, auth: true },
  { name: 'Order', to: '/order', icon: Package, badge: true, auth: true },
  { name: 'Promotion', to: '/promotion', icon: ArrowUpNarrowWide, auth: true },
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