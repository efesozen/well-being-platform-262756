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
import type { CreateContentDto, ContentResponseDto, UpdateContentDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentsService } from './contents.service';

@Controller('contents')
@UseGuards(JwtAuthGuard)
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<ContentResponseDto[]> {
    return this.contentsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<ContentResponseDto> {
    return this.contentsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateContentDto,
    @CurrentUser() user: User
  ): Promise<ContentResponseDto> {
    return this.contentsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateContentDto,
    @CurrentUser() user: User
  ): Promise<ContentResponseDto> {
    return this.contentsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.contentsService.remove(id, user.id);
  }
}
