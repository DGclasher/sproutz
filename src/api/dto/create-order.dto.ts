import { IsEnum, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  @IsEnum(['pending', 'completed', 'cancelled'])
  status: string;
  items: { plant: string; quantity: number }[];
  customer: string;
  address: string;
  phone: string;
  email: string;
}
