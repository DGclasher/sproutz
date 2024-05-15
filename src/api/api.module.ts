import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from 'src/schemas/plant.schema';
import { Order, OrderSchema } from 'src/schemas/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Plant.name, schema: PlantSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
