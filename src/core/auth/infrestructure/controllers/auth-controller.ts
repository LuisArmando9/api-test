import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user-entity';
import { UserDto } from '../dto/user-dto';
import { CreateUserCommand } from '../../application/command/implementation/create-user-command';
import { LoginQuery } from '../../application/query/implementation/login-query';

@ApiTags('Auth')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("auth")
export class AuthController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post("create")
  //@ApiBearerAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Create user', type: UserEntity })
  async create(@Body() dto: UserDto){
    return await this.commandBus.execute(new CreateUserCommand(dto))
  }

  @Post("login")
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 200, description: 'login'})
  async update(@Body() dto: UserDto){
    return await this.queryBus.execute(new LoginQuery(dto))
  }

}
