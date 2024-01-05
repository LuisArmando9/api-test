import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { GetLogView } from 'src/core/shared/views/log-views';
import { GetLogByIdQuery } from 'src/log/aplication/query/implementation/get.log.by.id.query';


@ApiTags('Log')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("log")
export class LogController {
  constructor( private readonly service: UserLogRepository) {}

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get log  by user id' })
  @ApiResponse({ status: 200, description: 'log', type:GetLogView })
  @ApiParam({ example: 3, name: "id" })
  @ApiQuery({ example: "insert", name: "type", required:false })
  async getById(
    @Param("id") id: number,
    @Query("type") type: string
  ): Promise<GetLogView[]>{

    return await this.service.getByUserId(id);
  }

  
}
