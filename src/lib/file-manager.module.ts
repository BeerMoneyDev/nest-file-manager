import { Module, DynamicModule } from '@nestjs/common';
import {
  AsyncModuleFactoryProvider,
  AsyncModuleProvider,
} from './types';
import { CFS_CONFIGS } from './tokens';
import { AwsFileService } from './aws/aws.service';
import { AzureFileService } from './azure/azure.service';
import { AwsConfig } from './aws/aws-config.interface';
import { AzureConfig } from './azure/azure-config.interface';
import { DiskConfig } from './disk/disk-config.interface';
import { DiskFileService } from './disk/disk.service';
import { FileService, InjectFileService } from "../index";

function getImports(provider: AsyncModuleProvider<any>) {
  return (provider as AsyncModuleFactoryProvider<any>)?.imports || [];
}

@Module({})
export class FileManagerModule {
  static registerAsync(drivers: {
    aws?: AsyncModuleProvider<AwsConfig>;
    azure?: AsyncModuleProvider<AzureConfig>;
    disk?: AsyncModuleProvider<DiskConfig>;
    // gcp?: AsyncModuleProvider<{}>;
  }, options?: {
    global?: boolean
  }): DynamicModule {
    const imports = [
      ...getImports(drivers.aws),
      ...getImports(drivers.azure),
      ...getImports(drivers.disk),
      // ...getImports(drivers.gcp),
    ];

    const module: DynamicModule = {
      global: typeof options?.global === 'boolean' ? options.global : true,
      module: FileManagerModule,
      imports,
      providers: [
        {
          provide: CFS_CONFIGS.AWS,
          ...(drivers?.aws ? drivers.aws : { useValue: {} })
        },
        {
          provide: CFS_CONFIGS.Azure,
          ...(drivers?.azure ? drivers.azure : { useValue: {} })
        },
        {
          provide: CFS_CONFIGS.Disk,
          ...(drivers?.disk ? drivers.disk : { useValue: {} })
        },
        // {
        //   provide: CFS_GCP_CONFIG,
        //   ...(drivers?.gcp ? drivers.gcp : { useValue: {} })
        // },
        AwsFileService,
        AzureFileService,
        DiskFileService,
      ],
      exports: [
        AwsFileService,
        AzureFileService,
        DiskFileService,
      ],
    };

    return module;
  }
}
