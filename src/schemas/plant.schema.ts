import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<Plant>;

@Schema()
export class Plant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  available: boolean;

  @Prop()
  image: string;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
