import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

 @Post()
async create(@Body() createBranchDto: CreateBranchDto) {
  return this.branchesService.createBranch(createBranchDto);
}

  @Get()
  async getAll() {
    return this.branchesService.getAllBranches();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.branchesService.getBranchById(id);
  }
  
}
