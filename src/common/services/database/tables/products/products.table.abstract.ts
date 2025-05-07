export abstract class ProductsTableAbstract {
    constructor( protected readonly client: any ) {}
    abstract getTableName<T>(): string;
    abstract getAll<T>(): Promise<T[]>;
    abstract getAllWithRelations<T>(): Promise<ProductRaw[]>;
    // abstract getById<T>(id: number): Promise<T | null>;
}