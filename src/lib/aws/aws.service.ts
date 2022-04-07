import { Inject, Injectable } from '@nestjs/common';
import { FileService, WriteFileOptions, WriteFileResult } from '../file-manager.interface';
import { CFS_CONFIGS } from '../tokens';
import { AwsConfig } from './aws-config.interface';
import { lookup } from 'mime-types';
import { promises as fs } from 'fs';

@Injectable()
export class AwsFileService implements FileService {
  constructor(
    @Inject(CFS_CONFIGS.AWS)
    private readonly awsConfig: AwsConfig
  ) { }

  async writeFile(options: WriteFileOptions): Promise<WriteFileResult> {
    const awsSdk = await import("aws-sdk");

    const s3 = new awsSdk.S3({
      ...this.awsConfig
    });

    const fileContent = await fs.readFile(options.filePath);

    try {
      const uploadedFile = await s3.upload({
        Bucket: options.bucketName,
        Key: options.destFileName,
        Body: fileContent,
        ContentType: lookup(options.destFileName)
      }).promise();

      return {
        url: uploadedFile.Location
      };
    } catch (error) {
      throw error;
    }
  }
}