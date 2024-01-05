import { Injectable } from '@nestjs/common';
import { SaleRepository } from './repositories/sale-repository';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { InvalidDataException } from 'src/supplier/domain/services/exceptions/supplier-exceptions';
import { SaleNotFound } from './sale-exceptions';
import { Shopping } from 'src/shopping/infrestructure/entities/shopping-entity';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { Sale } from './entities/sale-entity';
import { SearchSaleDto } from './dto/search-sale-dto';
import { CreateSaleDto } from './dto/create-sale-dto';
import { SaleAction } from 'src/core/shared/enums/user-action-enum';

@Injectable()
export class SalesService extends BaseRepository<Sale, SearchSaleDto, CreateSaleDto >{
  constructor(
    private shopping_repository: SaleRepository,
    private log_repository: UserLogRepository
) {
    super(
        log_repository, 
        shopping_repository, 
        SaleAction, {
        invalid_data: new InvalidDataException(),
        not_found: new SaleNotFound()
    });
}


}
