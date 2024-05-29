import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VariableModule } from './variable/variable.module';
import { ExpressionModule } from './expression/expression.module';

@Module({
  imports: [VariableModule, ExpressionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
