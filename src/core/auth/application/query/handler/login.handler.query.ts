import { ProductService } from "src/products/domain/services/product.service";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { LoginQuery } from "../implementation/login.query";
import { AuthService } from "src/core/auth/domain/services/auth.service";

@QueryHandler(LoginQuery)
export class LoginQueryHandler implements IQueryHandler<LoginQuery> {
  constructor(private readonly authService: AuthService) {}

  public async execute(command: LoginQuery) {
    return await this.authService.login(command.dto);
  }
}