import { IsString, IsOptional, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSkuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  code?: string; // optional because you generate if not provided

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subcategory: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsUUID()
  @IsNotEmpty()
  branchId: string;
}
