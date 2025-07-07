import { IsArray, IsUrl, ArrayNotEmpty } from 'class-validator';

export class UploadFileDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  urls: string[];
}
