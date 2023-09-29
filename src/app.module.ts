import { ConnectorsModule } from '@connectors';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
    imports: [
        ConnectorsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env'),
        }),
    ],
})
export class AppModule {}
