import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetShoppingByIdQuery } from "../implementation/get-shopping-by-id-query";
import { ShoppingService } from "src/shopping/domain/services/shopping-service";

@QueryHandler(GetShoppingByIdQuery)
export class GetShoppingByIdHandler implements IQueryHandler<GetShoppingByIdQuery> {
  constructor(private readonly service: ShoppingService) {}

  public async execute(command: GetShoppingByIdQuery) {
    return await this.service.getById(command.id);
  }
}