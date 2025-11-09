import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateUserdataDto {
  @IsUUID()
  user_id!: string;

  @IsOptional()
  goal_setting?: Record<string, unknown>;

  @IsOptional()
  progress_tracking?: Record<string, unknown>;
}

export class UpdateUserdataDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  @IsOptional()
  goal_setting?: Record<string, unknown> | undefined;

  @IsOptional()
  @IsOptional()
  progress_tracking?: Record<string, unknown> | undefined;
}

export class UserdataResponseDto {
  id!: string;
  user_id!: string;
  goal_setting?: Record<string, unknown>;
  progress_tracking?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
