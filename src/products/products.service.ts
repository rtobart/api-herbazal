import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SupabaseServiceAbstract } from '@src/common/services/supabase/supabase.service.abstract';
import { PRODUCT_TABLE } from '@src/common/services/supabase/tables/products/const';

@Injectable()
export class ProductsService {
  constructor(
    private readonly supabaseService: SupabaseServiceAbstract,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async listProducts() {
    const data = await this.supabaseService.getAll(PRODUCT_TABLE);
    console.log('🚀 ~ ProductsService ~ findAll ~ data:', data)
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
