import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateWellbeingplanDto {
  @IsUUID()
  user_id!: string;

  plan_details!: Record<string, unknown>;
}

export class UpdateWellbeingplanDto {
  @IsOptional()
  @IsUUID()
  user_id?: string | undefined;

  @IsOptional()
  plan_details?: Record<string, unknown> | undefined;
}

export class WellbeingplanResponseDto {
  id!: string;
  user_id!: string;
  plan_details!: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
