import { ApiService } from './api.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePlantDto } from './dto/create-plan.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Param,
} from '@nestjs/common';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('plants')
  async getPlants() {
    return this.apiService.getPlants();
  }

  @Post('plant')
  async createPlant(@Body(new ValidationPipe()) plantDto: CreatePlantDto) {
    return this.apiService.createPlant(plantDto);
  }

  @Post('order')
  async createOrder(@Body(new ValidationPipe()) orderDto: CreateOrderDto) {
    return this.apiService.createOrder(orderDto);
  }

  @Get('orders')
  async getOrders() {
    return this.apiService.getOrders();
  }

  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    return this.apiService.getOrder(id);
  }

  @Get('order/:id/plants')
  async getPlantFromOrder(@Param('id') id: string) {
    return this.apiService.getPlantFromOrder(id);
  }
}
