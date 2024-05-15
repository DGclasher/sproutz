import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Plant } from 'src/schemas/plant.schema';
import { Order } from 'src/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePlantDto } from './dto/create-plan.dto';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(Plant.name) private plantModel: Model<Plant>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  async getPlants(): Promise<Plant[]> {
    return this.plantModel.find().exec();
  }

  async getPlant(id: string): Promise<Plant> {
    return this.plantModel.findById(id).exec();
  }
  async createPlant(plant: CreatePlantDto): Promise<Plant> {
    const newPlant = await this.plantModel.create(plant);
    return newPlant;
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    let total: number = 0;
    await Promise.all(
      order.items.map(async (item) => {
        const plantObj: any = await this.plantModel.findById(item.plant);
        total += plantObj.price * item.quantity;
      }),
    );
    const newOrder = await this.orderModel.create({
      status: order.status,
      total: total,
      items: order.items,
    });
    return newOrder;
  }

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().select('_id total created').exec();
  }

  async getOrder(id: string): Promise<Order> {
    return this.orderModel.findById(id).exec();
  }

  async getPlantFromOrder(id: string): Promise<Plant[]> {
    const order = await this.orderModel.findById(id).exec();
    const plants: Plant[] = await Promise.all(
      order.items.map(async (item) => {
        return this.plantModel.findById(item.plant).exec();
      }),
    );
    return plants;
  }
}
