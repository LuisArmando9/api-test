import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SupplierService } from "src/supplier/domain/services/supplier-service";
import { GetSupplierByIdQuery } from "../implementation/get-supplier-by-id-query";

@QueryHandler(GetSupplierByIdQuery)
export class GetSupplierByIdHandler implements IQueryHandler<GetSupplierByIdQuery> {
  constructor(private readonly supplier_service: SupplierService) {}

  public async execute(command: GetSupplierByIdQuery) {
    return await this.supplier_service.getById(command.id);
  }
}