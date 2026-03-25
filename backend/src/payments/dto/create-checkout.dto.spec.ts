import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCheckoutDto } from './create-checkout.dto';

function toDto(plain: Record<string, unknown>): CreateCheckoutDto {
  return plainToInstance(CreateCheckoutDto, plain);
}

describe('CreateCheckoutDto', () => {
  it('should pass with valid productId and quantity', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 2 });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail when productId is missing', async () => {
    const dto = toDto({ quantity: 1 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('productId');
  });

  it('should fail when quantity is less than 1', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 0 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'quantity')).toBe(true);
  });

  it('should fail when quantity exceeds 10', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 11 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'quantity')).toBe(true);
  });

  it('should pass with valid packType "solo"', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 1, packType: 'solo' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should pass with valid packType "duo"', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 2, packType: 'duo' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should pass with valid packType "equipe"', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 5, packType: 'equipe' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail with invalid packType', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 1, packType: 'invalid' });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'packType')).toBe(true);
  });

  it('should pass without packType (optional)', async () => {
    const dto = toDto({ productId: 'prod-1', quantity: 3 });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should pass with optional sport field', async () => {
    const dto = toDto({
      productId: 'prod-1',
      quantity: 1,
      packType: 'solo',
      sport: 'football',
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
