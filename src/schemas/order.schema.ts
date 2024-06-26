import { PlantDocument } from './plant.schema';
import mongoose, { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  total: number;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({
    type: [
      {
        type: {
          plant: { type: mongoose.Schema.Types.ObjectId, ref: 'Plant' },
          quantity: Number,
        },
      },
    ],
  })
  items: { plant: PlantDocument; quantity: number }[];

  @Prop({ required: true })
  customer: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
