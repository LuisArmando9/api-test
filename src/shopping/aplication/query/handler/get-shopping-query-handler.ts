import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BrandService } from "src/brand/domain/services/brand-service";
import { SupplierService } from "src/supplier/domain/services/supplier-service";
import { GetShoppingQuery } from "../implementation/get-Shopping-query";
import { ShoppingService } from "src/shopping/domain/services/shopping-service";

@QueryHandler(GetShoppingQuery)
export class GetShoppingHandler implements IQueryHandler<GetShoppingQuery> {
  constructor(private readonly supplier_service: ShoppingService){}
  public async execute(command: GetShoppingQuery) {
    return await this.supplier_service.getByDto(command.dto, command.user_id);
  }
}