import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BrandService } from "src/brand/domain/services/brand-service";
import { GetLogByIdQuery } from "../implementation/get.log.by.id.query";
import { LogService } from "src/log/domain/services/log-service";

@QueryHandler(GetLogByIdQuery)
export class GetLogByIdHandler implements IQueryHandler<GetLogByIdQuery> {
  constructor(private readonly log_service: LogService) {}

  public async execute(command: GetLogByIdQuery) {
    console.log("typeeeeeeeeeeeeeeeeeeeee")
    console.log(command)
    return await this.log_service.getByUserIdAndType(command.id, command.type);
  }
}