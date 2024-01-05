import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNotEmpty } from 'src/core/shared/utlis/lodash-utils';
import { BrandNotFoundException, DisableBranchException } from 'src/brand/domain/services/exceptions/brand-exceptions';
import { IBaseRepository } from 'src/core/shared/interfaces/base-repository-interface';
import {
  paginate,
  paginateRaw,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { CreateSupplierDto } from '../dtos/create-supplier-dto';
import { ViewSupplier } from 'src/core/shared/views/supplier-view';
import { QueryBuilderParamHelper } from 'src/core/shared/helpers/builder-helper';
import { SearchSupplierDto } from '../dtos/search-supplier.dto';
import { SupplierNotFoundException } from 'src/supplier/domain/services/exceptions/supplier-exceptions';
import { Supplier } from '../entities/supplier-entity';
import { UpdateSupplierDto } from '../dtos/update-supplier-dto';

export class SupplierRepository
  implements IBaseRepository<Supplier, SearchSupplierDto, CreateSupplierDto>
{
  @InjectRepository(Supplier)
  private readonly supplier_repository: Repository<Supplier>
  @InjectRepository(ViewSupplier)
  private readonly view_supplier: Repository<ViewSupplier>
  constructor(
  ) {}
 

  async findById(id: number) {
    const supplier = await this.view_supplier.findOneBy({
      id,
    });
    if(!supplier) throw new SupplierNotFoundException()
    return supplier
  }

  insert(dto: CreateSupplierDto) {
    const entity = this.supplier_repository.create(dto);
    return this.supplier_repository.save(entity);
  }

  async update(dto: UpdateSupplierDto ) {
    const supplier = await this.supplier_repository.findOneBy({id:dto.id});
    if (supplier) {
      const id = dto.id;
      delete dto.id;
      delete dto.user_id;
      await this.supplier_repository.update(id, dto);
      return supplier;
    }
    throw new BrandNotFoundException();
  }

  findByDto(dto: SearchSupplierDto) {
    const qb = this.view_supplier.createQueryBuilder('b');
    return QueryBuilderParamHelper
    .buildWithPaginate<SearchSupplierDto, 
    ViewSupplier>(qb, dto, {
      page: dto.page,
      limit: dto.limit
    } )
  }


  softDelete(id: number) {
    return this.supplier_repository.softDelete(id);
  }

  existsById(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
