import { Module } from '@nestjs/common';
import { BranchesModule } from './branches/branches.module';
import { SkuModule } from './sku/sku.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [BranchesModule, SkuModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
