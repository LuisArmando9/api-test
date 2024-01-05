import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetShoppingQuery } from "../implementation/get-shopping-query";
import { ShoppingService } from "src/shopping/domain/services/shopping-service";

@QueryHandler(GetShoppingQuery)
export class GetShoppingHandler implements IQueryHandler<GetShoppingQuery> {
  constructor(private readonly supplier_service: ShoppingService){}
  public async execute(command: GetShoppingQuery) {
    return await this.supplier_service.getByDto(command.dto, command.user_id);
  }
}