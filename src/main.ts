import { APP_NAME } from '@common/constants';
import { LOGGER_CONFIG } from '@common/main-logger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT', 3000);

    app.use(cookieParser());
    app.use(json());
    app.use(compression());
    app.setGlobalPrefix('api');

    /** Logger */
    app.useLogger(WinstonModule.createLogger(LOGGER_CONFIG(APP_NAME())));

    /** Global validation */
    app.useGlobalPipes(new ValidationPipe());

    /** Life cycle hooks */
    app.enableShutdownHooks();

    /** App version */
    app.enableVersioning({
        type: VersioningType.HEADER,
        header: 'App-Version',
        defaultVersion: '1.0',
    });

    await app.listen(port, () => {
        Logger.log(`Application started on http://localhost:${port}`, APP_NAME());
    });
}
bootstrap();
