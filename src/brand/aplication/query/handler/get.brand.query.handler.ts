import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BrandService } from "src/brand/domain/services/brand-service";
import { GetBrandQuery } from "../implementation/get.brand.query";

@QueryHandler(GetBrandQuery)
export class GetBrandHandler implements IQueryHandler<GetBrandQuery> {
  constructor(private readonly brand_service: BrandService) {}

  public async execute(command: GetBrandQuery) {
    return await this.brand_service.getByDto(command.dto, command.user_id);
  }
}