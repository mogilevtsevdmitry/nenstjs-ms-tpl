import { join } from 'path';
import { CommonModule } from '@common';
import { ConnectorsModule } from '@connectors';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConnectorsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env'),
        }),
        CommonModule,
    ],
    providers: [],
})
export class AppModule {}
