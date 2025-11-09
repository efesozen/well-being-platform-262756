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
import type { CreateUserdataDto, UserdataResponseDto, UpdateUserdataDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserdatasService } from './userdatas.service';

@Controller('userdatas')
@UseGuards(JwtAuthGuard)
export class UserdatasController {
  constructor(private readonly userdatasService: UserdatasService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<UserdataResponseDto[]> {
    return this.userdatasService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<UserdataResponseDto> {
    return this.userdatasService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateUserdataDto,
    @CurrentUser() user: User
  ): Promise<UserdataResponseDto> {
    return this.userdatasService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserdataDto,
    @CurrentUser() user: User
  ): Promise<UserdataResponseDto> {
    return this.userdatasService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.userdatasService.remove(id, user.id);
  }
}
