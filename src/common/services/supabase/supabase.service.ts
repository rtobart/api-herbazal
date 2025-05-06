import { Injectable } from '@nestjs/common';
import { SupabaseServiceAbstract } from './supabase.service.abstract';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService extends SupabaseServiceAbstract {
    supabaseClient: SupabaseClient;
    constructor() {
        super();
        this.supabaseClient = new SupabaseClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_KEY,
        );
    }
    async getAll<T>(table: string): Promise<T> {
        const { data, error } = await this.supabaseClient
            .from(table)
            .select('*');

        if (error) {
            throw new Error(`Error fetching data from ${table}: ${error.message}`);
        }

        return data as T;
    }
}
