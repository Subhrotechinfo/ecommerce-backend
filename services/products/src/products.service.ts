import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './products/dto/create-product.dto';
import { UpdateProductDto } from './products/dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepository.create({
      ...createProductDto,
    });
  }

  findAll() {
    return this.productRepository.find({});
  }

  findOne(_id: string) {
    return this.productRepository.findOne({ _id });
  }

  update(_id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.findOneAndUpdate(
      { _id },
      { $set: updateProductDto },
    );
  }

  remove(_id: string) {
    return this.productRepository.findOneAndDelete({ _id });
  }
}
