import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum ContentType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  PODCAST = 'PODCAST'
}

export class CreateContentDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsEnum(ContentType)
  type!: ContentType;
}

export class UpdateContentDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string | undefined;

  @IsOptional()
  @IsEnum(ContentType)
  type?: ContentType | undefined;
}

export class ContentResponseDto {
  id!: string;
  title!: string;
  description!: string;
  type!: ContentType;
  createdAt!: Date;
  updatedAt!: Date;
}
