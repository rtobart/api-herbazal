export abstract class SupabaseServiceAbstract {
    abstract getAll<T>(table: string): Promise<T>
}