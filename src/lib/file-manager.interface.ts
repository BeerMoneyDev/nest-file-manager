export interface WriteFileOptions {
  /**
   * absolute path to the file to upload.
   */
  filePath: string;

  /**
   * file name to be stored.
   */
  destFileName: string;

  /**
   * the bucket (or container) to store to.
   */
  bucketName: string;
}

export interface WriteFileResult {
  url: string;
}

export interface FileService {
  /**
   * Upload file to the designated cloud service
 */
  writeFile(options: WriteFileOptions): Promise<WriteFileResult>;
  // readFile(): Promise<any>;
  // exists(): Promise<any>;
  // rename(): Promise<any>;
  // unlink(): Promise<any>;
}