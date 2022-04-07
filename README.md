<h1 align="center">nest-file-manager</h1>
<div align="center">
  <img src="https://beermoneydev-assets.s3.amazonaws.com/nest-file-manager-logo.png" />
</div>
<br />
<div align="center">
  <strong>An abstraction layer to simplify cloud file management in NestJS.</strong>
</div>
<br />
<div align="center">
<a href="https://www.npmjs.com/package/nest-file-manager"><img src="https://img.shields.io/npm/v/nest-file-manager.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/nest-file-manager"><img src="https://img.shields.io/npm/l/nest-file-manager.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/nest-file-manager"><img src="https://img.shields.io/npm/dm/nest-file-manager.svg" alt="NPM Downloads" /></a>
</div>

# Features

* A unified file management service to manager files on disk, Azure, or AWS with the same code and service interface. 

# How To Use

## Install

```bash
npm install --save nest-file-manager
npm install --save aws-sdk # if using AWS
npm install --save @azure/storage-blob # if using Azure
```

## Basic Usage 

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { FileManagerModule } from 'nest-file-manager';

@Module({
  imports: [
    S3ManagerModule,
    FileManagerModule.registerAsync({
      aws: { // optional, only needed if you use this provider
        /**
         * Use the useValue method
         */
        useValue: {
          accessKeyId: "AKIAU77LDZ6OMENV354Z",
          secretAccessKey: "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",
          bucketRegion: "us-east-1",
          signatureVersion: "v4"
        },

        /**
         * OR use the factory method
         */
        useFactory: (configService: ConfigService) => {
          return configService.get('AWS_SETTINGS');
        },
        inject: [ConfigService],
        imports: [ConfigModule]
      },
      azure: { // optional, only needed if you use this provider
        useValue: {
          accountName: "myAccount",
          accountKey: "pt7wl+zzVUTFyIokJ8zIJErb/Le3hXLJ+bFmVCcjJop5BlE+ASt4GNYp2m1lgKoCX3JkFqIzhtydnV73dr+lCg=="
        }
      },
      disk: { // optional, only needed if you use this provider
        useValue: {
          rootDirectory: "E:\\public-uploads",
          rootUrl: "http://localhost"
        }
      }
    }),
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
```

```ts
import { FileService, InjectFileService } from "nest-file-manager";

export class MyService {
  constructor(
    @InjectFileService("AWS") // or "Azure" or "Disk"
    readonly fileService: FileService
  ) {}

  async handleFileUpload() {
    await this.fileService.writeFile({
      filePath: "E:\\temp\\myfile.txt",
      destFileName: "myuploadedfile.txt",
      bucketName: "myfiles"
    });
  }
}
```


# Stay In Touch

* Author - [Kerry Ritter](https://twitter.com/kerryritter)

## License

nest-file-manager is MIT licensed.