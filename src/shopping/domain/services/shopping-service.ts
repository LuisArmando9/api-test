import { Injectable } from '@nestjs/common';
import { ShoppingAction, UserBrandAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { BrandRepository } from 'src/brand/infrestructure/repositories/brand-repository';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search-brand-dto';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { BrandEntity } from 'src/brand/infrestructure/entities/brand-entity';
import { Shopping } from 'src/Shopping/infrestructure/entities/shopping-entity';
import { SearchShoppingDto } from 'src/Shopping/infrestructure/dtos/search-shopping.dto';
import { CreateShoppingDto } from 'src/Shopping/infrestructure/dtos/create-shopping-dto';
import { InvalidDataException, ShoppingNotFoundException } from './exceptions/shopping-exceptions';
import { ShoppingRepository } from '../../infrestructure/repositories/shopping-repository';


@Injectable()
export class ShoppingService extends BaseRepository<Shopping, SearchShoppingDto, CreateShoppingDto > {
    constructor(
        private service: ShoppingRepository,
        private log_repository: UserLogRepository
    ) {
        super(
            log_repository, 
            service, 
            ShoppingAction, {
            invalid_data: new InvalidDataException(),
            not_found: new ShoppingNotFoundException()
        });
    }
    

}
