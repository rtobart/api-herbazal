import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsServiceAbstract } from './abtracts/products.service.abstract';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsServiceAbstract) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @Get()
  find(@Query('id') id?: string) {
    if (id) {
      Logger.log('findOne');
      return this.productsService.getProductById(id);
    } else {
      Logger.log('findAll');
      return this.productsService.listProducts();
    }
  }

  // @Get()
  // findOne(@Query('id') id: string) {
  //   Logger.log('findOne');
  //   return this.productsService.getProductById(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
