interface ProductRaw {
    id: string;
    name: string;
    long_description: string | null;
    description: string | null;
    ingredients: string[];
    usage: string | null;
    cost: number | null;
    price_min: number | null;
    price_last: number | null;
    price: number | null;
    image_url: string | null;
    data_ai_hint: string | null;
    is_featured: boolean | null;
    stock: number | null;
    rating: number | null;
    review_count: number | null;
    created_at: string;

    // Estas son las relaciones como las traerá Supabase
    product_category: {
        category: { // Nombre de la tabla 'category'
            id: string;
            name: string;
        } | null; // Puede ser null si la categoría no existe (aunque FK debería prevenirlo)
    }[]; // product_category es una tabla de unión, por eso es un array

    product_skin_type: {
        skin_type: { // Nombre de la tabla 'skin_type'
            id: string;
            name: string;
        } | null;
    }[];

    product_images: { // Nombre de la tabla 'product_images'
        id: string;
        url: string;
        alt_text: string | null;
        sort_order: number | null;
    }[];
}