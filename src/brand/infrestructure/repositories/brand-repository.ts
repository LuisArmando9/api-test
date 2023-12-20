import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchBrandDto } from '../dtos/search-brand-dto';
import { isNotEmpty } from 'src/core/shared/utlis/lodash-utils';
import { BrandDto } from '../dtos/brand-dto';
import { BrandEntity } from '../entities/brand-entity';
import { BrandNotFoundException, DisableBranchException } from 'src/brand/domain/services/exceptions/brand-exceptions';
import { IBaseRepository } from 'src/core/shared/interfaces/base-repository-interface';
import {
  paginate,
  paginateRaw,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';
import { GetBrandView } from 'src/core/shared/views/branch-views';

export class BrandRepository
  implements IBaseRepository<BrandEntity, SearchBrandDto, BrandDto>
{
  constructor(
    @InjectRepository(BrandEntity)
    private readonly brand: Repository<BrandEntity>,
    @InjectRepository(GetBrandView)
    private readonly brandView: Repository<GetBrandView>,
  ) {}

  async findById(id: number) {
    const brand = await this.brandView.findOneBy({
      id,
    });
    if(!brand) throw new BrandNotFoundException()
    return brand
  }

  insert(dto: BrandDto) {
    const entity = this.brand.create(dto);
    return this.brand.save(entity);
  }

  async update(dto: BrandDto) {
    const brand = await this.brandView.findOneBy({id:dto.id});
    if (brand) {
      const brand_id = dto.id;
      delete dto.id;
      delete dto.user_id;
      await this.brand.update(brand_id, dto);
      return brand as any;
    }
    throw new BrandNotFoundException();
  }

  findByDto(dto: SearchBrandDto) {
    const qb = this.brandView.createQueryBuilder('b');
    if (isNotEmpty(dto.name)) qb.andWhere('b.name = :name');
    if (isNotEmpty(dto.status)) qb.andWhere('b.status = :status');
    qb.setParameters(dto);
    return paginate<GetBrandView>(qb, dto);
  }

  async existsById(id: number) {
    const count = await this.brandView.count({ where: { id: Number(id) } });
    return count > 0;
  }

  softDelete(id: number) {
    return this.brand.softDelete(id);
  }
}
