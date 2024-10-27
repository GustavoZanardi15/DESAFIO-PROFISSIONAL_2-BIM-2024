import { IsString, IsNumber, IsPositive, Min } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive({ message: 'O valor deve ser um número positivo.' })
  value: number;

  @IsNumber()
  @Min(0, { message: 'A quantidade não pode ser negativa.' })
  quantity: number;

  constructor(name: string, value: number, quantity: number) {
    this.name = name;
    this.value = value;
    this.quantity = quantity;
  }
}
