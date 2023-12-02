import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(private readonly config: ConfigService) {
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    async cleanDatabase() {
        if (this.config.get('NODE_ENV', 'development') === 'production') return;
        const models = Reflect.ownKeys(this).filter((k) => k[0] !== '_');
        return Promise.all(models.map((m: string) => this[m].deleteMany()));
    }
}
