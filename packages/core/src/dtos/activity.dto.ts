import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateActivityDto {
  @IsUUID()
  user_id!: string;

  @IsString()
  @MinLength(1)
  activity_type!: string;

  @IsNumber()
  duration!: number;

  @IsDate()
  date!: Date;
}

export class UpdateActivityDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  activity_type?: string | undefined;

  @IsOptional()
  @IsNumber()
  duration?: number | undefined;

  @IsOptional()
  @IsDate()
  date?: Date | undefined;
}

export class ActivityResponseDto {
  id!: string;
  user_id!: string;
  activity_type!: string;
  duration!: number;
  date!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
