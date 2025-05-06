import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsServiceAbstract } from './abtracts/products.service.abstract';

@Module({
  controllers: [ProductsController],
  providers: [
    { provide: ProductsServiceAbstract, useClass: ProductsService }
  ],
})
export class ProductsModule {}
