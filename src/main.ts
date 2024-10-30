import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger)

  // Override JSON.stringify to handle BigInt values globally
  JSON.stringify = (function (originalStringify) {
    return function (value, replacer, space) {
      return originalStringify(value, (key, val) =>
        typeof val === 'bigint' ? val.toString() : val, space
      );
    };
  })(JSON.stringify);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
