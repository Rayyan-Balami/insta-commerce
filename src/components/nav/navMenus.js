import { ScanBarcode, Store, Package, LineChart, ArrowUpNarrowWide, } from 'lucide-react';

export const navMenus = [
  { name: 'Home', to: '/', icon: Store },
  { name: 'Analytic', to: '/analytic', icon: LineChart },
  { name: 'Product', to: '/product', icon: ScanBarcode },
  { name: 'Order', to: '/order', icon: Package, badge: true },
  { name: 'Promotion', to: '/promotion', icon: ArrowUpNarrowWide },
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