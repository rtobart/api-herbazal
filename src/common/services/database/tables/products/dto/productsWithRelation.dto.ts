interface ProductCategory {
    id: string; // ID de la tabla category
    name: string;
}

interface ProductSkinType {
    id: string; // ID de la tabla skin_type
    name: string;
}

interface ProductImage {
    image_id: string; // ID de la tabla product_images
    url: string;
    alt_text: string | null;
    sort_order: number | null;
}

export interface ProductWithRelations {
    product_id: string;
    product_name: string;
    long_description: string | null;
    short_description: string | null;
    ingredients: string[]; // Asumiendo que 'ingredients' es un array de texto
    usage: string | null;
    cost: number | null;
    price_min: number | null;
    price_last: number | null;
    price: number | null;
    main_image_url: string | null;
    main_image_ai_hint: string | null;
    is_featured: boolean | null;
    stock: number | null;
    rating: number | null;
    review_count: number | null;
    product_created_at: string;

    categories: string[]; // Array de nombres de categorías
    skin_types: string[]; // Array de nombres de tipos de piel
    additional_images: ProductImage[];
}