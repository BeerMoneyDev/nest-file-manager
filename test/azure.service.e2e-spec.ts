import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AzureFileService, FileManagerModule } from '../src';

@Module({
  imports: [
    FileManagerModule.registerAsync({
      azure: {
        useValue: require("./service-configs.json").azure
      }
    })
  ],
})
class AppRootModule { }

describe('AzureFileService', () => {
  it('it should upload a file', async () => {
    const module = await NestFactory.createApplicationContext(AppRootModule, {
      logger: false,
    });

    const service = module.get(AzureFileService);

    await service.writeFile({
      filePath: `./test/test-input/testfile.png`,
      destFileName: "testfile.png",
      bucketName: "kerryrittertest2022"
    });

    expect(service).toBeDefined();
  });
});
