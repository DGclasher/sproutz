import { sendEmail } from '../lib/utils';
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
  HttpException,
  HttpStatus,
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
    try {
      const res = await this.apiService.createOrder(orderDto);
      const itemsWithNames = await Promise.all(
        orderDto.items.map(async (item) => {
          const plant = await this.apiService.getPlant(item.plant);
          return { ...item, plantName: plant.name };
        }),
      );
      await sendEmail(
        orderDto.email,
        'Order Confirmation',
        orderDto,
        (res as any)._id,
        res.total,
        itemsWithNames,
      );
      return res;
    } catch (error) {
      throw new HttpException(
        {
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error.message,
        },
      );
    }
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
