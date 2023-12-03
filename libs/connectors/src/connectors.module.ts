import { Global, Module } from '@nestjs/common';
import { AmqpModule } from './amqp/amqp.module';

@Global()
@Module({
    exports: [AmqpModule],
    imports: [AmqpModule],
})
export class ConnectorsModule {}
