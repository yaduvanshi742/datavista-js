export const APP_NAME = 'DataVista JS';
export const DB_NAME = 'datavista-js-db';
export const DB_VERSION = 1;
export const DATASET_STORE = 'datasets';
export const SETTINGS_STORE = 'settings';
export const MAX_TABLE_ROWS = 100;

export const SAMPLE_DATASET = {
  name: 'Product Sales Snapshot',
  description: 'A small sample dataset for exploring DataVista JS features.',
  type: 'csv',
  rows: [
    { product: 'Notebook', region: 'North', revenue: 1450, orders: 32, rating: 4.4 },
    { product: 'Keyboard', region: 'West', revenue: 2190, orders: 27, rating: 4.7 },
    { product: 'Mouse', region: 'South', revenue: 980, orders: 45, rating: 4.2 },
    { product: 'Monitor', region: 'East', revenue: 4250, orders: 14, rating: 4.8 },
    { product: 'Desk Lamp', region: 'North', revenue: 760, orders: 21, rating: 4.1 },
    { product: 'USB Hub', region: 'West', revenue: 1180, orders: 38, rating: 4.3 },
    { product: 'Webcam', region: 'South', revenue: 1750, orders: 19, rating: 4.5 },
    { product: 'Speaker', region: 'East', revenue: 1320, orders: 23, rating: 4.0 }
  ]
};
