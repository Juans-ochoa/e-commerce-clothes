import React from 'react';
import List from './List';
import Product from './Product';
import { FilterSearchparams, TProducts } from '@/utils/types';
import { fetchGetProducts } from '@/lib/services/products';

const list: TProducts = [
  {
    id: 1,
    title: 'Camiseta Básica Blanca',
    price: 29.99,
    description:
      'Camiseta de algodón 100% orgánico, perfecta para el uso diario. Corte regular y máxima comodidad.',
    category: 'Camisetas',
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.2,
      count: 127,
    },
  },
  {
    id: 2,
    title: 'Jeans Slim Fit Azul',
    price: 89.99,
    description:
      'Jeans de corte slim fit con acabado stone wash. Fabricado en denim de alta calidad.',
    category: 'Pantalones',
    image:
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.5,
      count: 89,
    },
  },
  {
    id: 3,
    title: 'Sudadera Con Capucha Gris',
    price: 59.99,
    description:
      'Sudadera con capucha en algodón mezcla, perfecta para los días fríos. Diseño minimalista.',
    category: 'Sudaderas',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.7,
      count: 156,
    },
  },
  {
    id: 4,
    title: 'Vestido Floral Primavera',
    price: 79.99,
    description:
      'Vestido ligero con estampado floral, ideal para primavera y verano. Corte A-line favorecedor.',
    category: 'Vestidos',
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.3,
      count: 203,
    },
  },
  {
    id: 5,
    title: 'Chaqueta de Cuero Negra',
    price: 199.99,
    description:
      'Chaqueta de cuero genuino con forro interior. Estilo clásico que nunca pasa de moda.',
    category: 'Chaquetas',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.8,
      count: 78,
    },
  },
  {
    id: 6,
    title: 'Falda Plisada Rosa',
    price: 49.99,
    description:
      'Falda plisada de longitud media en tono rosa pastel. Perfecta para looks elegantes y casuales.',
    category: 'Faldas',
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.1,
      count: 95,
    },
  },
  {
    id: 7,
    title: 'Camisa Oxford Azul Claro',
    price: 69.99,
    description:
      'Camisa Oxford de manga larga en algodón premium. Ideal para ocasiones formales e informales.',
    category: 'Camisas',
    image:
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.4,
      count: 142,
    },
  },
  {
    id: 8,
    title: 'Shorts Deportivos Negro',
    price: 34.99,
    description:
      'Shorts deportivos con tecnología dry-fit. Perfectos para entrenar y actividades al aire libre.',
    category: 'Shorts',
    image:
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.6,
      count: 213,
    },
  },
  {
    id: 9,
    title: 'Blazer Elegante Marino',
    price: 149.99,
    description:
      'Blazer de corte entallado en color marino. Perfecto para eventos formales y reuniones de trabajo.',
    category: 'Blazers',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.3,
      count: 67,
    },
  },
  {
    id: 10,
    title: 'Top Crop Estampado',
    price: 24.99,
    description:
      'Top crop con estampado tropical. Ideal para combinar con faldas altas o jeans de cintura alta.',
    category: 'Tops',
    image:
      'https://images.unsplash.com/photo-1580651214613-721e5704e6ac?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.0,
      count: 184,
    },
  },
  {
    id: 11,
    title: 'Abrigo de Lana Beige',
    price: 249.99,
    description:
      'Abrigo largo de lana mezcla con solapas amplias. Perfecto para el invierno con estilo elegante.',
    category: 'Abrigos',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.5,
      count: 54,
    },
  },
  {
    id: 12,
    title: 'Polo Clásico Blanco',
    price: 39.99,
    description:
      'Polo de piqué de algodón con cuello y puños en contraste. Ideal para looks casuales y deportivos.',
    category: 'Polos',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.2,
      count: 168,
    },
  },
  {
    id: 13,
    title: 'Pantalón Chino Caqui',
    price: 74.99,
    description:
      'Pantalón chino de corte recto en algodón premium. Versatil para ocasiones casuales y semi-formales.',
    category: 'Pantalones',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.4,
      count: 112,
    },
  },
  {
    id: 14,
    title: 'Vestido Midi Negro',
    price: 129.99,
    description:
      'Vestido midi de manga larga con cinturón incluido. Elegante y versátil para día y noche.',
    category: 'Vestidos',
    image:
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.6,
      count: 87,
    },
  },
  {
    id: 15,
    title: 'Suéter de Punto Crema',
    price: 84.99,
    description:
      'Suéter de punto grueso en lana merino. Suave al tacto con cuello redondo clásico.',
    category: 'Suéteres',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.7,
      count: 93,
    },
  },
  {
    id: 16,
    title: 'Falda Vaquera Azul',
    price: 54.99,
    description:
      'Falda de mezclilla con botones frontales y bolsillos funcionales. Estilo retro moderno.',
    category: 'Faldas',
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.3,
      count: 76,
    },
  },
  {
    id: 17,
    title: 'Cardigan de Alpaca Rosa',
    price: 119.99,
    description:
      'Cardigan tejido en fibra de alpaca con botones de madera. Ultra suave y abrigado.',
    category: 'Cardigans',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.8,
      count: 45,
    },
  },
  {
    id: 18,
    title: 'Pantalones Deportivos Grises',
    price: 44.99,
    description:
      'Pantalones deportivos con tecnología moisture-wicking. Perfectos para entrenar o relajarse.',
    category: 'Deportivo',
    image:
      'https://images.unsplash.com/photo-1506629905607-d8b96134ab90?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.4,
      count: 198,
    },
  },
  {
    id: 19,
    title: 'Blusa de Seda Azul',
    price: 159.99,
    description:
      'Blusa de seda natural con mangas largas y cuello en V. Elegancia pura para ocasiones especiales.',
    category: 'Blusas',
    image:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.6,
      count: 72,
    },
  },
  {
    id: 20,
    title: 'Shorts de Lino Blancos',
    price: 49.99,
    description:
      'Shorts de lino con cintura elástica y cordón ajustable. Frescos y cómodos para el verano.',
    category: 'Shorts',
    image:
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.1,
      count: 134,
    },
  },
  {
    id: 21,
    title: 'Chaqueta Bomber Verde',
    price: 109.99,
    description:
      'Chaqueta bomber con forro acolchado y puños elásticos. Estilo urbano y moderno.',
    category: 'Chaquetas',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.5,
      count: 89,
    },
  },
  {
    id: 22,
    title: 'Vestido Camisero Rayado',
    price: 89.99,
    description:
      'Vestido camisero con estampado de rayas y cinturón incluido. Clásico y atemporal.',
    category: 'Vestidos',
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.2,
      count: 156,
    },
  },
  {
    id: 23,
    title: 'Jersey Cuello Alto Negro',
    price: 69.99,
    description:
      'Jersey de cuello alto en algodón orgánico. Básico esencial que combina con todo.',
    category: 'Jerseys',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.4,
      count: 92,
    },
  },
  {
    id: 24,
    title: 'Pantalón de Cuero Marrón',
    price: 299.99,
    description:
      'Pantalón de cuero genuino con corte recto. Pieza statement para looks audaces.',
    category: 'Pantalones',
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.7,
      count: 34,
    },
  },
  {
    id: 25,
    title: 'Crop Top de Encaje',
    price: 54.99,
    description:
      'Top crop con detalles de encaje y forro interior. Romántico y femenino.',
    category: 'Tops',
    image:
      'https://images.unsplash.com/photo-1580651214613-721e5704e6ac?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.1,
      count: 178,
    },
  },
  {
    id: 26,
    title: 'Trench Coat Clásico',
    price: 189.99,
    description:
      'Trench coat impermeable con cinturón y doble botonadura. Elegancia británica atemporal.',
    category: 'Abrigos',
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.6,
      count: 67,
    },
  },
  {
    id: 27,
    title: 'Camiseta Oversize Gris',
    price: 34.99,
    description:
      'Camiseta de corte oversize en algodón suave. Cómoda y moderna para looks relajados.',
    category: 'Camisetas',
    image:
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.3,
      count: 145,
    },
  },
  {
    id: 28,
    title: 'Mono Largo Azul Marino',
    price: 139.99,
    description:
      'Mono de pierna ancha con cinturón y bolsillos. Elegante y cómodo para toda ocasión.',
    category: 'Monos',
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.5,
      count: 83,
    },
  },
  {
    id: 29,
    title: 'Chaleco de Punto Camel',
    price: 64.99,
    description:
      'Chaleco sin mangas en punto fino. Perfecto para crear looks en capas durante el entretiempo.',
    category: 'Chalecos',
    image:
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.2,
      count: 56,
    },
  },
  {
    id: 30,
    title: 'Minifalda Plisada Negra',
    price: 42.99,
    description:
      'Minifalda plisada con cintura alta y cremallera lateral. Juvenil y versátil.',
    category: 'Faldas',
    image:
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&auto=format',
    rating: {
      rate: 4.0,
      count: 124,
    },
  },
];

const fetchProducts = async (filter: FilterSearchparams) => {
  const products = await fetchGetProducts(filter);

  return {
    products,
  };
};

const ListProducts = async ({ filter }: { filter: FilterSearchparams }) => {
  const { products } = await fetchProducts(filter);
  return (
    <List
      sourceName="product"
      items={products}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5"
      ComponentItem={Product}
    />
  );
};

export default ListProducts;
