import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSkuDto } from './dto/create-sku.dto';
import * as QRCode from 'qrcode';
import QrCode from 'qrcode-reader';
const Jimp = require('jimp');

@Injectable()
export class SkuService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSkuDto) {
    const code = data.code ?? `SKU-${Date.now()}`;
    return this.prisma.sKU.create({
      data: {
        ...data,
        code,
      },
    });
  }

  async findAll() {
    return this.prisma.sKU.findMany({
      include: { branch: true },
    });
  }

  async findByCode(code: string) {
    return this.prisma.sKU.findUnique({
      where: { code },
      include: { branch: true },
    });
  }

  async searchSKU(query?: string) {
    if (!query) {
    return [];
  }
  return this.prisma.sKU.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { code: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
}

async deactivateSKU(id: string) {
  const sku = await this.prisma.sKU.update({
    where: { id },
    data: { isActive: false },
  });
  return { message: `SKU ${sku.code} deactivated successfully.` };
}

async generateQRCode(id: string) {
  const sku = await this.prisma.sKU.findUnique({ where: { id } });

  if (!sku) {
    throw new NotFoundException('SKU not found');
  }

  const qrData = JSON.stringify({
    id: sku.id,
    code: sku.code,
    name: sku.name,
  });

  const qrImage = await QRCode.toDataURL(qrData);

  return {
    message: `QR code for SKU ${sku.code}`,
    qrDataUrl: qrImage,
  };
}
async decodeQRCode(fileBuffer: Buffer): Promise<{ decoded: string }> {
    const image = await Jimp.read(fileBuffer);

    return new Promise((resolve, reject) => {
      const qr = new QrCode();
      qr.callback = (err, value) => {
        if (err || !value) {
          reject(new Error('Could not decode QR code'));
        } else {
          resolve({ decoded: value.result });
        }
      };
      qr.decode(image.bitmap);
    });
  }

}
