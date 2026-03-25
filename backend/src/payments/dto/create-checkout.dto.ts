import { IsString, IsInt, Min, Max, IsOptional, IsIn } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;

  @IsOptional()
  @IsString()
  @IsIn(['solo', 'duo', 'equipe'])
  packType?: string;

  @IsOptional()
  @IsString()
  sport?: string;
}
