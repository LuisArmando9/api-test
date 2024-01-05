import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInventoryByIdQuery } from "../implementation/get-inventory-by-id.query";
import { InventoryService } from "src/inventory/domain/services/inventory-service";

@QueryHandler(GetInventoryByIdQuery)
export class GetInventoryByIdHandler implements IQueryHandler<GetInventoryByIdQuery> {
  constructor(private readonly service: InventoryService) {}

  public async execute(command: GetInventoryByIdQuery) {
    return await this.service.getById(command.id);
  }
}