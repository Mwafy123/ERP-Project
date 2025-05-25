import { Module } from '@nestjs/common';
import { SkuService } from './sku.service';
import { SkuController } from './sku.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SkuController],
  providers: [SkuService, PrismaService],
})
export class SkuModule {}
