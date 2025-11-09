import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateActivityDto, ActivityResponseDto, UpdateActivityDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ActivitysService } from './activities.service';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitysController {
  constructor(private readonly activitysService: ActivitysService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ActivityResponseDto[]> {
    return this.activitysService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ActivityResponseDto> {
    return this.activitysService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateActivityDto,
    @CurrentUser() user: User
  ): Promise<ActivityResponseDto> {
    return this.activitysService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateActivityDto,
    @CurrentUser() user: User
  ): Promise<ActivityResponseDto> {
    return this.activitysService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.activitysService.remove(id, user.id);
  }
}
