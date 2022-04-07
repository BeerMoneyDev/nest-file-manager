import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AwsFileService, FileManagerModule } from '../src';

@Module({
  imports: [
    FileManagerModule.registerAsync({
      aws: {
        useValue: require("./service-configs.json").aws,
      }
    })
  ],
})
class AppRootModule { }

describe('AwsFileService', () => {
  it('it should upload a file', async () => {
    const module = await NestFactory.createApplicationContext(AppRootModule, {
      logger: false,
    });

    const service = module.get(AwsFileService);

    await service.writeFile({
      filePath: `./test/test-input/testfile.png`,
      destFileName: "testfile.png",
      bucketName: "kerryrittertest2022"
    });

    expect(service).toBeDefined();
  });
});
