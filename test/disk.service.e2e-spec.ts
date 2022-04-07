import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DiskFileService, FileManagerModule } from '../src';

@Module({
  imports: [
    FileManagerModule.registerAsync({
      disk: {
        useValue: require("./service-configs.json").disk
      }
    })
  ],
})
class AppRootModule { }

describe('DiskFileService', () => {
  it('it should upload a file', async () => {
    const module = await NestFactory.createApplicationContext(AppRootModule, {
      logger: false,
    });

    const service = module.get(DiskFileService);

    await service.writeFile({
      filePath: `./test/test-input/testfile.png`,
      destFileName: "testfile.png",
      bucketName: "kerryrittertest2022"
    });

    expect(service).toBeDefined();
  });
});
