import { SupabaseClient } from "@supabase/supabase-js";

export abstract class SupabaseServiceAbstract {
    abstract getClient<T>(): SupabaseClient;
}