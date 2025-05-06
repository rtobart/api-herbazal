export abstract class ProductsServiceAbstract {
    abstract listProducts(): Promise<any[]>;
    // abstract createProduct(productData: any): Promise<any>;
    // abstract getProductById(productId: string): Promise<any>;
    // abstract updateProduct(productId: string, updateData: any): Promise<any>;
    // abstract deleteProduct(productId: string): Promise<void>;
}