import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { isNotEmpty } from 'src/core/shared/utlis/lodash-utils';
import {
  BrandNotFoundException,
  DisableBranchException,
} from 'src/brand/domain/services/exceptions/brand-exceptions';
import { IBaseRepository } from 'src/core/shared/interfaces/base-repository-interface';
import {
  paginate,
  paginateRaw,
  IPaginationMeta,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { CreatePaymentTypeDto } from '../dtos/create-payment-type-dto';
import { ViewSupplier } from 'src/core/shared/views/supplier-view';
import { QueryBuilderParamHelper } from 'src/core/shared/helpers/builder-helper';
import { SupplierNotFoundException } from 'src/supplier/domain/services/exceptions/supplier-exceptions';
import { PaymentType } from '../entities/payment-type-entity';
import { AlreadyPaymentTypeException } from 'src/payment-type/domain/services/exceptions/payment-exceptions';

export class PaymentTypeRepository
  implements IBaseRepository<PaymentType, unknown, CreatePaymentTypeDto>
{

  @InjectRepository(PaymentType)
  private readonly type_repository: Repository<PaymentType>;

  async insert(dto: CreatePaymentTypeDto) {
    const existsByName = await this.type_repository.countBy({name: dto.name});
    console.log(existsByName)
    if (existsByName) throw new AlreadyPaymentTypeException();
    const entity = this.type_repository.create(dto)
    return await this.type_repository.save(entity)
  }

  update<T extends CreatePaymentTypeDto>(dto: any): Promise<PaymentType | CreatePaymentTypeDto> {
    throw new Error('Method not implemented.');
  }
  findByDto(dto: unknown): Promise<Pagination<any, IPaginationMeta>> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  existsById(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: number): Promise<void | UpdateResult> {
    throw new Error('Method not implemented.');
  }

  
}
