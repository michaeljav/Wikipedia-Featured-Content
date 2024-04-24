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

  @Post()
  create(@Body() createFeedDto: CreateFeedDto) {
    return this.feedService.create(createFeedDto);
  }

  @Get()
  findAll(@Query() search: FilterFeedDto) {
    return this.feedService.feed(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedDto: UpdateFeedDto) {
    return this.feedService.update(+id, updateFeedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedService.remove(+id);
  }
}
