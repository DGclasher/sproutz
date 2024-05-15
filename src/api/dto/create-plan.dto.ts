import { MinLength } from 'class-validator';

export class CreatePlantDto {
  @MinLength(3)
  name: string;
  @MinLength(10)
  description: string;
  price: number;
  imageUrl: string;
}
