import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { Form1Module } from './form1/form1.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [CommonModule, Form1Module, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
