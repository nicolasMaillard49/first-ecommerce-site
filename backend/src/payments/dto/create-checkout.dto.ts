import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;
}
