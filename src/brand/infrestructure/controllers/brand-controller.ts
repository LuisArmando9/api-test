import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BrandDto } from '../dtos/brand-dto';
import { SearchBrandDto } from '../dtos/search-brand-dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BrandEntity } from '../entities/brand-entity';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { CreateBrandCommand } from 'src/brand/aplication/command/implementation/create-brand-commant';
import { UpdateBrandCommand } from 'src/brand/aplication/command/implementation/update.brand.command';
import { DeleteBrandCommand } from 'src/brand/aplication/command/implementation/delete-brand-command';
import { GetBrandQuery } from 'src/brand/aplication/query/implementation/get.brand.query';
import { GetBrandByIdQuery } from 'src/brand/aplication/query/implementation/get.brand.by.id.query';


@ApiTags('Brand')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("brand")
export class brandController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({ status: 200, description: 'Create brand', type: BrandEntity })
  async create(@Body() dto: BrandDto, @Req() req: IApiRequest){
    dto.userId = req.user.id;
    return await this.commandBus.execute(new CreateBrandCommand(dto))
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update brand' })
  @ApiResponse({ status: 200, description: 'Update brand', type: BrandEntity})
  @ApiParam({ example: 3, name: "id" })
  async update(@Body() dto: BrandDto, @Param("id") id: number, @Req() req: IApiRequest){
    dto.userId = req.user.id;
    dto.id = id;
    return await this.commandBus.execute(new UpdateBrandCommand(dto))
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete brand' })
  @ApiResponse({ status: 200, description: 'soft delete brand' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return await this.commandBus.execute(new DeleteBrandCommand(id, req.user.id));
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list  brand' })
  @ApiResponse({ status: 200, description: 'get list brand', type:[BrandEntity] })
  async getByDto(@Query() dto: SearchBrandDto, @Req() req: IApiRequest){
    return await this.queryBus.execute(new GetBrandQuery(dto, req.user.id));
  }

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get brand  by id' })
  @ApiResponse({ status: 200, description: 'brand', type: BrandEntity })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number){
    return await this.queryBus.execute(new GetBrandByIdQuery(Number(id)));
  }
}
