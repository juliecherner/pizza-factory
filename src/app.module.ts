import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.modules';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './httpExeptionFilter/index';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://db:1234@cluster0.qqvga.mongodb.net/pizzaOrders?retryWrites=true&w=majority',
    ),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
