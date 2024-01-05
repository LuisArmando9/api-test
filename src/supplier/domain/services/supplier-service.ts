import { Injectable } from '@nestjs/common';
import { SupplierAction, UserBrandAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { BrandRepository } from 'src/brand/infrestructure/repositories/brand-repository';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search-brand-dto';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { BrandEntity } from 'src/brand/infrestructure/entities/brand-entity';
import { SupplierRepository } from 'src/supplier/infrestructure/repositories/supplier-repository';
import { Supplier } from 'src/supplier/infrestructure/entities/supplier-entity';
import { SearchSupplierDto } from 'src/supplier/infrestructure/dtos/search-supplier.dto';
import { CreateSupplierDto } from 'src/supplier/infrestructure/dtos/create-supplier-dto';
import { InvalidDataException, SupplierNotFoundException } from './exceptions/supplier-exceptions';


@Injectable()
export class SupplierService extends BaseRepository<Supplier, SearchSupplierDto, CreateSupplierDto > {
    constructor(
        private supplier_repository: SupplierRepository,
        private log_repository: UserLogRepository
    ) {
        super(
            log_repository, 
            supplier_repository, 
            SupplierAction, {
            invalid_data: new InvalidDataException(),
            not_found: new SupplierNotFoundException()
        });
    }
    

}
