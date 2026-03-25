import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;

  @IsOptional()
  @IsString()
  sport?: string;
}
