import { Injectable } from '@nestjs/common';
import { UserBrandAction, UserProductAction } from 'src/core/shared/enums/user.action.enum';
import { UserLogRepository } from 'src/core/shared/repositories/user.log.repository';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';
import { ProductRepository } from 'src/products/infrestructure/repositories/product.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search.product.dto';
import { BrandRepository } from 'src/brand/infrestructure/repositories/brand.repository';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search.brand.dto';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand.dto';
import { BrandNotFoundException, InvalidBranDataException } from './exceptions/brand.exceptions';


@Injectable()
export class BrandService {
    constructor(
        private brandRepository: BrandRepository,
        private logRepository: UserLogRepository
    ) { }

    async saveLog(userId: number, action: UserBrandAction) {
        await this.logRepository.insert({
            userId,
            action,
        })
    }

    async insert(dto: BrandDto) {
        const product = await this.brandRepository.insert(dto);
        if (product) {
            await this.saveLog(dto.userId, UserBrandAction.INSERT)
            return product;
        }
        throw new InvalidBranDataException()
    }

    async update(dto: BrandDto) {
        const product = await this.brandRepository.update(dto);
        if (product) {
            await this.saveLog(dto.userId, UserBrandAction.UPDATE)
            return product;
        }
    }

    async softDelete(id: number, userId: number){
        const exists = await this.brandRepository.existsById(id);
        if (!exists) {
            throw new BrandNotFoundException();
        }
        await Promise.all([
            this.saveLog(userId, UserBrandAction.DELETE),
            this.brandRepository.softDelete(id)
        ]);
        
    }

    async getByDto(dto: SearchBrandDto, userId: number) {
        await this.saveLog(userId, UserBrandAction.GET_BY_DTO);
        return this.brandRepository.findByDto(dto);
    }
    

}
