import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsTableAbstract } from '@src/common/services/database/tables/products/products.table.abstract';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productTableProvide: ProductsTableAbstract,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async listProducts() {
    const data = await this.productTableProvide.getAllWithRelations();
    return data;
  }

  async getProductById(id: string) {
    const data = await this.productTableProvide.getOneByIdWithRelations(id);
    return data;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
