import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBranchDto } from './dto/create-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async createBranch(data: CreateBranchDto) {
  return this.prisma.branch.create({ data });
}

  async getAllBranches() {
    return this.prisma.branch.findMany();
  }

  async getBranchById(id: string) {
    return this.prisma.branch.findUnique({
      where: { id },
    });
  }
}
