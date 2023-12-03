import { join } from 'path';
import { CommonModule } from '@common';
import { ConnectorsModule } from '@connectors';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConnectorsModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: join(process.cwd(), '.env'),
            cache: true,
        }),
        CommonModule,
        PrismaModule,
    ],
})
export class AppModule {}
