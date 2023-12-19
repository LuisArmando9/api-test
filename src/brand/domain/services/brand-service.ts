import { Injectable } from '@nestjs/common';
import { UserBrandAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { BrandRepository } from 'src/brand/infrestructure/repositories/brand-repository';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search-brand-dto';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { BrandNotFoundException, InvalidBranDataException } from './exceptions/brand-exceptions';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { BrandEntity } from 'src/brand/infrestructure/entities/brand-entity';


@Injectable()
export class BrandService extends BaseRepository<BrandEntity, SearchBrandDto, BrandDto > {
    constructor(
        private brand_repository: BrandRepository,
        private log_repository: UserLogRepository
    ) {
        super(
            log_repository, 
            brand_repository, 
            UserBrandAction, {
            invalid_data: new InvalidBranDataException(),
            not_found: new BrandNotFoundException()
        });
    }
    

}
