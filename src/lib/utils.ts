import * as dotenv from 'dotenv';
import * as nodemailer from 'nodemailer';
import validate from 'deep-email-validator';
import { BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from '../api/dto/create-order.dto';
dotenv.config();

export const validateEmail = async (email: string) => {
  try {
    const { valid } = await validate({
      email: email,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: false,
    });
    return valid;
  } catch (error) {
    console.error(error);
    throw new BadRequestException('Error validating email');
  }
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  order: CreateOrderDto,
  id: string,
  total: number,
  items: any,
) => {
  try {
    console.log(process.env.MAIL_USER);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: `
            <h2>Hello ${order.customer}</h2>
            <p>Your order has been confirmed, below are the details</p>
            <p>Order ID: ${id}</p>
            <p>Items:</p>
            <ul>
              ${items
                .map((item) => `<li>${item.quantity} x ${item.plantName}</li>`)
                .join('')}
            </ul>
            <p>Total: ${total}</p>
        `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new BadRequestException('Error sending email');
  }
};
