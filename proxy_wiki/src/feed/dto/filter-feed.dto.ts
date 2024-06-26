import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LENGUAGES } from '../enum/language';

export class FilterFeedDto {
  @IsNotEmpty()
  @IsEnum(LENGUAGES)
  lang: LENGUAGES;

  @IsNotEmpty()
  @IsDateString(undefined, {
    message: 'Invalid date format. Please use YYYY-MM-DD.',
  })
  date: string;

  @IsOptional()
  @IsString()
  textToTrans: string;
}
