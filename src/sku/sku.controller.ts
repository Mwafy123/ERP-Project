import { Controller, Post, Body, Get, Query, Patch, Param,UploadedFile, UseInterceptors } from '@nestjs/common';
import { SkuService } from './sku.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import { SearchSkuDto } from './dto/search-sku.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('sku')
export class SkuController {
  constructor(private readonly skuService: SkuService) {}

  @Post()
  create(@Body() createSkuDto: CreateSkuDto) {
    return this.skuService.create(createSkuDto);
  }

  @Get()
  findAll() {
    return this.skuService.findAll();
  }

  @Get('findByCode')
  findByCode(@Query('code') code: string) {
    return this.skuService.findByCode(code);
  }
  @Get('search')
async searchSKU(@Query() searchSkuDto: SearchSkuDto) {
  const query = searchSkuDto.q ?? '';
  return this.skuService.searchSKU(query);
}

    @Patch('deactivate/:id')
    async deactivateSKU(@Param('id') id: string) {
     return this.skuService.deactivateSKU(id);
}
@Get('generate-qr/:id')
async generateQRCode(@Param('id') id: string) {
  return this.skuService.generateQRCode(id);
}

    @Post('decode-qr')
@UseInterceptors(FileInterceptor('file'))
async decodeQr(@UploadedFile() file: Express.Multer.File) {
  return this.skuService.decodeQRCode(file.buffer);
}

}
