import { Injectable } from '@nestjs/common';
import { UserProductAction } from 'src/core/shared/enums/user.action.enum';
import { UserLogRepository } from 'src/core/shared/repositories/user.log.repository';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';
import { ProductRepository } from 'src/products/infrestructure/repositories/product.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search.product.dto';
import { InvalidInfoException, ProductNotFoundException } from '../exceptions/product.exceptions';


@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository,
        private logRepository: UserLogRepository
    ) { }

    async saveLog(userId: number, action: UserProductAction) {
        await this.logRepository.insert({
            userId,
            action,
        })
    }

    async insert(dto: ProductDto) {
        const product = await this.productRepository.insert(dto);
        if (product) {
            await this.saveLog(dto.userId, UserProductAction.INSERT)
            return product;
        }
        throw new InvalidInfoException();
    }

    async update(dto: ProductDto) {
        const product = await this.productRepository.update(dto);
        if (product) {
            await this.saveLog(dto.userId, UserProductAction.UPDATE)
            return product;
        }
    }

    async softDelete(id: number, userId: number){
        const exists = await this.productRepository.existsById(id);
        if (!exists) {
            throw new ProductNotFoundException();
        }
        await Promise.all([
            this.saveLog(userId, UserProductAction.DELETE),
            this.productRepository.softDelete(id)
        ]);
        
    }

    async getByDto(dto: SearchProductDto, userId: number) {
        await this.saveLog(userId, UserProductAction.GET_BY_DTO);
        return this.productRepository.findByDto(dto);
    }
    

}
