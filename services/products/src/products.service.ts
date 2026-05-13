import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './products/dto/create-product.dto';
import { UpdateProductDto } from './products/dto/update-product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsRepository) {}
  async create(createProductDto: CreateProductDto) {
    return this.productRepository.create({
      ...createProductDto,
    });
  }

  async findAll() {
    return this.productRepository.find({});
  }

  async findOne(_id: string) {
    return this.productRepository.findOne({ _id });
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.findOneAndUpdate(
      { _id },
      { $set: updateProductDto },
    );
  }

  remove(_id: string) {
    return this.productRepository.findOneAndDelete({ _id });
  }
}
