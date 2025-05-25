import { IsString, IsOptional } from 'class-validator';

export class SearchSkuDto {
  @IsString()
  @IsOptional()
  q?: string;  // search query string, optional
}
