// Datos de ejemplo para la demostración
export const generateSampleProducts = (count: number) => {
  const categories = [
    'Electrónicos',
    'Ropa',
    'Hogar',
    'Deportes',
    'Libros',
    'Juguetes',
  ];
  const productNames = [
    'Smartphone Pro',
    'Laptop Gaming',
    'Camiseta Casual',
    'Pantalón Vaquero',
    'Sofá Moderno',
    'Mesa de Comedor',
    'Pelota de Fútbol',
    'Raqueta de Tenis',
    'Novela Bestseller',
    'Libro de Cocina',
    'Robot de Juguete',
    'Puzzle 1000 Piezas',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `${productNames[index % productNames.length]} #${index + 1}`,
    price: Math.random() * 500 + 10, // Precio entre $10 y $510
    category: categories[index % categories.length],
    inStock: Math.random() > 0.3, // 70% probabilidad de estar en stock
  }));
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
};
