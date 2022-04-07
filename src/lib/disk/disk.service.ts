import { Inject, Injectable } from '@nestjs/common';
import { FileService, WriteFileOptions, WriteFileResult } from '../file-manager.interface';
import { CFS_CONFIGS } from '../tokens';
import { DiskConfig } from './disk-config.interface';
import { promises as fs } from 'fs';
import path, { join } from 'path';

@Injectable()
export class DiskFileService implements FileService {
  constructor(
    @Inject(CFS_CONFIGS.Disk)
    private readonly config: DiskConfig
  ) {
  }

  async writeFile(options: WriteFileOptions): Promise<WriteFileResult> {
    const destPath = join(this.config.rootDirectory, options.bucketName, options.destFileName);
    const fileContents = await fs.readFile(options.filePath);
    await fs.writeFile(destPath, fileContents);
    return {
      url: join(this.config.rootUrl, options.bucketName, options.destFileName)
    }
  }
}