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
import type { CreateWellbeingplanDto, WellbeingplanResponseDto, UpdateWellbeingplanDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { WellbeingplansService } from './wellbeingplans.service';

@Controller('wellbeingplans')
@UseGuards(JwtAuthGuard)
export class WellbeingplansController {
  constructor(private readonly wellbeingplansService: WellbeingplansService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<WellbeingplanResponseDto[]> {
    return this.wellbeingplansService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<WellbeingplanResponseDto> {
    return this.wellbeingplansService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateWellbeingplanDto,
    @CurrentUser() user: User
  ): Promise<WellbeingplanResponseDto> {
    return this.wellbeingplansService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWellbeingplanDto,
    @CurrentUser() user: User
  ): Promise<WellbeingplanResponseDto> {
    return this.wellbeingplansService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.wellbeingplansService.remove(id, user.id);
  }
}
