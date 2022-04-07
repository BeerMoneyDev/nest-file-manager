'use strict';

import { Inject, Injectable } from '@nestjs/common';
import { FileService, WriteFileOptions, WriteFileResult } from '../file-manager.interface';
import { CFS_CONFIGS } from '../tokens';
import { AzureConfig } from './azure-config.interface';
import { lookup } from 'mime-types';

@Injectable()
export class AzureFileService implements FileService {
  constructor(
    @Inject(CFS_CONFIGS.Azure)
    private readonly azureConfig: AzureConfig
  ) { }

  async writeFile(options: WriteFileOptions): Promise<WriteFileResult> {
    const Azure = await import("@azure/storage-blob");

    const sharedKeyCredential = new Azure.StorageSharedKeyCredential(this.azureConfig.accountName, this.azureConfig.accountKey);

    const blobServiceClient = new Azure.BlobServiceClient(
      `https://${this.azureConfig.accountName}.blob.core.windows.net`,
      sharedKeyCredential
    );

    const containerClient = blobServiceClient.getContainerClient(options.bucketName);
    const blockBlobClient = containerClient.getBlockBlobClient(options.destFileName);

    try {
      await blockBlobClient.uploadFile(options.filePath, {
        blobHTTPHeaders: {
          blobContentType: lookup(options.destFileName)
        }
      });
      return {
        url: `https://${this.azureConfig.accountName}.blob.core.windows.net/${options.bucketName}/${options.destFileName}`,
      }
    } catch (error) {
      throw error;
    }

  }
}