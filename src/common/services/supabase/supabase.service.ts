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
    getClient<T>(): SupabaseClient {
        return this.supabaseClient;
    }
}
