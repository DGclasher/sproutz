import { Optional } from '@nestjs/common';
import { IsEnum } from 'class-validator';

export class CreateOrderDto {
  @Optional()
  @IsEnum(['pending', 'completed', 'cancelled'])
  status: string;
  items: { plant: string; quantity: number }[];
}
