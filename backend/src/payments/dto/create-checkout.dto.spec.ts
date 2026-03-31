import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCheckoutDto } from './create-checkout.dto';

const validBase = {
  productId: 'prod-1',
  quantity: 1,
  customerName: 'Jean Dupont',
  customerEmail: 'jean@test.com',
  shippingAddress: {
    line1: '12 rue de la Paix',
    city: 'Paris',
    postalCode: '75001',
  },
};

function toDto(plain: Record<string, unknown>): CreateCheckoutDto {
  return plainToInstance(CreateCheckoutDto, plain);
}

describe('CreateCheckoutDto', () => {
  it('should pass with all required fields', async () => {
    const dto = toDto(validBase);
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail when productId is missing', async () => {
    const { productId, ...rest } = validBase;
    const dto = toDto(rest);
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'productId')).toBe(true);
  });

  it('should fail when quantity is less than 1', async () => {
    const dto = toDto({ ...validBase, quantity: 0 });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'quantity')).toBe(true);
  });

  it('should fail when quantity exceeds 10', async () => {
    const dto = toDto({ ...validBase, quantity: 11 });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'quantity')).toBe(true);
  });

  it('should pass with valid packType "solo"', async () => {
    const dto = toDto({ ...validBase, packType: 'solo' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should pass with valid packType "duo"', async () => {
    const dto = toDto({ ...validBase, quantity: 2, packType: 'duo' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should pass with valid packType "equipe"', async () => {
    const dto = toDto({ ...validBase, quantity: 5, packType: 'equipe' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail with invalid packType', async () => {
    const dto = toDto({ ...validBase, packType: 'invalid' });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'packType')).toBe(true);
  });

  it('should pass without packType (optional)', async () => {
    const dto = toDto({ ...validBase, quantity: 3 });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should pass with optional sport field', async () => {
    const dto = toDto({ ...validBase, sport: 'football' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  // Customer fields validation
  it('should fail when customerName is missing', async () => {
    const { customerName, ...rest } = validBase;
    const dto = toDto(rest);
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'customerName')).toBe(true);
  });

  it('should fail when customerEmail is invalid', async () => {
    const dto = toDto({ ...validBase, customerEmail: 'not-an-email' });
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'customerEmail')).toBe(true);
  });

  it('should fail when customerEmail is missing', async () => {
    const { customerEmail, ...rest } = validBase;
    const dto = toDto(rest);
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'customerEmail')).toBe(true);
  });

  it('should pass with optional customerPhone', async () => {
    const dto = toDto({ ...validBase, customerPhone: '+33612345678' });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });

  it('should fail when shippingAddress is missing', async () => {
    const { shippingAddress, ...rest } = validBase;
    const dto = toDto(rest);
    const errors = await validate(dto);
    expect(errors.some((e) => e.property === 'shippingAddress')).toBe(true);
  });

  it('should fail when shippingAddress.line1 is empty', async () => {
    const dto = toDto({
      ...validBase,
      shippingAddress: { line1: '', city: 'Paris', postalCode: '75001' },
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail when shippingAddress.city is missing', async () => {
    const dto = toDto({
      ...validBase,
      shippingAddress: { line1: '12 rue Test', postalCode: '75001' },
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should pass with optional shippingAddress.line2', async () => {
    const dto = toDto({
      ...validBase,
      shippingAddress: { line1: '12 rue Test', line2: 'Apt 3', city: 'Paris', postalCode: '75001' },
    });
    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
