import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { Shopping } from '../entities/shopping-entity';
import { CreateShoppingDto } from '../dtos/create-shopping-dto';
import { CreateShoppingCommand } from 'src/shopping/aplication/command/implementation/create-shopping-commant';
import { UpdateShoppingDto } from '../dtos/update-shopping-dto';
import { UpdateShoppingCommand } from 'src/shopping/aplication/command/implementation/update-shopping-command';
import { ViewShopping } from 'src/core/shared/views/shopping-view';
import { DeleteShoppingCommand } from 'src/shopping/aplication/command/implementation/delete-shopping-command';
import { SearchShoppingDto } from '../dtos/search-shopping.dto';
import { GetShoppingQuery } from 'src/shopping/aplication/query/implementation/get-shopping-query';
import { GetShoppingByIdQuery } from 'src/shopping/aplication/query/implementation/get-shopping-by-id-query';


@ApiTags('Shopping')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("Shopping")
export class ShoppingController {
  constructor(private readonly command_bus: CommandBus, private readonly query_bus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create Shopping' })
  @ApiResponse({ status: 200, description: 'Create Shopping', type: Shopping })
  async create(@Body() dto: CreateShoppingDto, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    return await this.command_bus.execute(new CreateShoppingCommand(dto))
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update Shopping' })
  @ApiResponse({ status: 200, description: 'Update Shopping', type: ViewShopping})
  @ApiParam({ example: 3, name: "id" })
  async update(@Body() dto: UpdateShoppingDto, @Param("id") id: number, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    dto.id = id;
    return await this.command_bus.execute(new UpdateShoppingCommand(dto))
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete Shopping' })
  @ApiResponse({ status: 200, description: 'soft delete Shopping' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return await this.command_bus.execute(new DeleteShoppingCommand(id, req.user.id));
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list  Shopping' })
  @ApiResponse({ status: 200, description: 'get list Shopping', type:[ViewShopping] })
  async getByDto(@Query() dto: SearchShoppingDto, @Req() req: IApiRequest){
    return await this.query_bus.execute(new GetShoppingQuery(dto, req.user.id));
  }

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get Shopping  by id' })
  @ApiResponse({ status: 200, description: 'Shopping', type: ViewShopping })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number){
    return await this.query_bus.execute(new GetShoppingByIdQuery(Number(id)));
  }
}
