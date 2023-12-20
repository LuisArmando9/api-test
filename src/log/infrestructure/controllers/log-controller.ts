import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { GetLogView } from 'src/core/shared/views/log-views';
import { GetLogByIdQuery } from 'src/log/aplication/query/implementation/get.log.by.id.query';


@ApiTags('Log')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("log")
export class LogController {
  constructor( private readonly query_bus: QueryBus) {}

  @Get(":userId")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get log  by user id' })
  @ApiResponse({ status: 200, description: 'log', type:GetLogView })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number): Promise<GetLogView>{
    return await this.query_bus.execute(new GetLogByIdQuery(id));
  }
}
