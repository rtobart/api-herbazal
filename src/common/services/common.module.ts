import { Global, Module } from '@nestjs/common';
import { SupabaseServiceAbstract } from './supabase/supabase.service.abstract';
import { SupabaseService } from './supabase/supabase.service';

@Global()
@Module({
  providers: [
    { provide: SupabaseServiceAbstract, useClass: SupabaseService },
  ],
  exports: [
    SupabaseServiceAbstract
  ],
})
export class CommonModule {}
