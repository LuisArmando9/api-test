import { Injectable } from '@nestjs/common';
import { ShoppingAction, UserBrandAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { Shopping } from 'src/shopping/infrestructure/entities/shopping-entity';
import { SearchShoppingDto } from 'src/shopping/infrestructure/dtos/search-shopping.dto';
import { CreateShoppingDto } from 'src/shopping/infrestructure/dtos/create-shopping-dto';
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
