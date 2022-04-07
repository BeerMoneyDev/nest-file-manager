import { Inject } from '@nestjs/common';
import { AwsFileService } from './aws/aws.service';
import { AzureFileService } from './azure/azure.service';
import { DiskFileService } from './disk/disk.service';
import { CFS_CONFIGS } from './tokens';

export const InjectFileService = (type: keyof typeof CFS_CONFIGS) => {
  if (type === "Azure") {
    return Inject(AzureFileService);
  } else if (type === "AWS") {
    return Inject(AwsFileService);
  } else if (type === "Disk") {
    return Inject(DiskFileService);
  }
}