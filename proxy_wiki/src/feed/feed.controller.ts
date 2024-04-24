import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FilterFeedDto } from './dto/filter-feed.dto';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  feed(@Query() search: FilterFeedDto) {
    return this.feedService.feed(search);
  }

  @Post('/translate/:lang')
  translate(@Param('lang') lang: string, @Query() search: FilterFeedDto) {
    return this.feedService.translate(lang, search);
  }

  @Get('/translate')
  getLanguages() {
    return this.feedService.getLanguages();
  }
}
