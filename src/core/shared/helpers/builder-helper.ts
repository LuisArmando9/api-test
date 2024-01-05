import { SelectQueryBuilder } from 'typeorm';
import { SearchCommonObject } from '../interfaces/search-common-obj';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { isCommonField } from './utils/common-fields';
import { TDate } from '../dto/common-dto';
import { isNumberString } from 'class-validator';
type BuildOptions = IPaginationOptions & {
  withDates?: boolean;
}
export class QueryBuilderParamHelper {
  private static setParams<T extends SearchCommonObject, Entity>(
    qb: SelectQueryBuilder<Entity>,
    objToSearch: T,
    withDates:boolean
  ) {
    const alias = qb.alias;
    if (!withDates) {
      qb.setParameters(objToSearch);
      return qb;
    } 

    if (objToSearch?.type_date) {
      const date_name =
        objToSearch?.type_date === TDate.CREATE ? 'created_at' : 'updated_at';
      if (objToSearch?.start_date) {
        qb.andWhere(`${alias}.${date_name} >= :start_date`);
      }
      if (objToSearch?.end_date) {
        qb.andWhere(`${alias}.${date_name} <= :end_date`);
      }
    }
    qb.setParameters(objToSearch);
    return qb;
    
  }
  static build<T extends SearchCommonObject, Entity>(
    qb: SelectQueryBuilder<Entity>,
    objToSearch: T,
    withDates: boolean
  ) {
    const alias = qb.alias;
    Object.keys(objToSearch).forEach((k) => {
      if (!isCommonField(k)) {
        qb.andWhere(`${alias}.${k} = :${k}`);
      }
    });
    return QueryBuilderParamHelper
    .setParams(qb, objToSearch, withDates);
  }

  static buildWithPaginate<T extends SearchCommonObject, Entity>(
    qb: SelectQueryBuilder<Entity>,
    objToSearch: T,
    options: BuildOptions,
  ) {
    return paginate<Entity>(
      QueryBuilderParamHelper
      .build(qb, objToSearch, (
        options?.withDates ?? true
      )),
      options,
    );
  }
}
