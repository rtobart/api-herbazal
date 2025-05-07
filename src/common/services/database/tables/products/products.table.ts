import { Injectable } from '@nestjs/common';
import { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { ProductsTableAbstract } from './products.table.abstract';
import { SupabaseServiceAbstract } from '@src/common/services/supabase/supabase.service.abstract';
import { PRODUCT_TABLE } from './const';
import { ProductWithRelations } from './dto/productsWithRelation.dto';

@Injectable()
export class ProductTableService extends ProductsTableAbstract {
    supabaseClient: SupabaseClient;
    PRODUCT_TABLE = PRODUCT_TABLE;
    constructor( readonly client: SupabaseServiceAbstract) {
        super(client);
        this.supabaseClient = client.getClient();
    }
    async getAll<T>(): Promise<T> {
        const { data, error } = await this.supabaseClient
            .from(PRODUCT_TABLE)
            .select('*');

        if (error) {
            throw new Error(`Error fetching data from ${PRODUCT_TABLE}: ${error.message}`);
        }
        return data as T;
    }
    async getAllWithRelations(): Promise<ProductRaw[]> {
        const { data, error } = await this.supabaseClient
            .from(this.PRODUCT_TABLE)
            .select(`
                id,
                name,
                long_description,
                description,
                ingredients,
                usage,
                cost,
                price_min,
                price_last,
                price,
                image_url,
                data_ai_hint,
                is_featured,
                stock,
                rating,
                review_count,
                created_at,
                product_category( 
                    category(id, name) 
                ),
                product_skin_type(
                    skin_type(id, name)
                ),
                product_images(id, url, alt_text, sort_order)
            `);
    
        // Manejo de errores
        if (error) {
            this.handleError(error, `fetching raw products with relations from ${this.PRODUCT_TABLE}`);
        }
    
        if (!data) {
            return [];
        }
    
        // Transformar los datos para que coincidan con el tipo ProductRaw
        const transformedData: ProductRaw[] = data.map((product: any) => ({
            id: product.id,
            name: product.name,
            long_description: product.long_description,
            description: product.description,
            ingredients: product.ingredients,
            usage: product.usage,
            cost: product.cost,
            price_min: product.price_min,
            price_last: product.price_last,
            price: product.price,
            image_url: product.image_url,
            data_ai_hint: product.data_ai_hint,
            is_featured: product.is_featured,
            stock: product.stock,
            rating: product.rating,
            review_count: product.review_count,
            created_at: product.created_at,
            product_category: product.product_category?.map((pc: any) => ({
                id: pc.category.id,
                name: pc.category.name,
            })) || [],
            product_skin_type: product.product_skin_type?.map((pst: any) => ({
                id: pst.skin_type.id,
                name: pst.skin_type.name,
            })) || [],
            product_images: product.product_images?.map((img: any) => ({
                id: img.id,
                url: img.url,
                alt_text: img.alt_text,
                sort_order: img.sort_order,
            })) || [],
        }));
    
        return transformedData;
    }
    // Un método de ayuda para manejar errores de forma consistente
    private handleError(error: PostgrestError, context: string): never {
        // Aquí podrías loggear el error con más detalle si quieres
        console.error(`Supabase error while ${context}:`, error);
        throw new Error(`Error while ${context}: ${error.message} (Code: ${error.code})`);
    }
    getTableName<T>(): string {
        return this.PRODUCT_TABLE;
    }
}
