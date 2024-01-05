import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BrandService } from "src/brand/domain/services/brand-service";
import { SupplierService } from "src/supplier/domain/services/supplier-service";
import { GetSupplierQuery } from "../implementation/get-supplier-query";

@QueryHandler(GetSupplierQuery)
export class GetSupplierHandler implements IQueryHandler<GetSupplierQuery> {
  constructor(private readonly supplier_service: SupplierService){}
  public async execute(command: GetSupplierQuery) {
    return await this.supplier_service.getByDto(command.dto, command.user_id);
  }
}