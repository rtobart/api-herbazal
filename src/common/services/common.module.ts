import { Global, Module } from '@nestjs/common';
import { SupabaseServiceAbstract } from './supabase/supabase.service.abstract';
import { SupabaseService } from './supabase/supabase.service';
import { ProductsTableAbstract } from './database/tables/products/products.table.abstract';
import { ProductTableService } from './database/tables/products/products.table';

@Global()
@Module({
  providers: [
    { provide: SupabaseServiceAbstract, useClass: SupabaseService },
    { provide: ProductsTableAbstract, useClass: ProductTableService },
  ],
  exports: [
    ProductsTableAbstract,
  ],
})
export class CommonModule {}
