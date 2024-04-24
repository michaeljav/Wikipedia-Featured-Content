import { Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FilterFeedDto } from './dto/filter-feed.dto';

@Injectable()
export class FeedService {
  create(createFeedDto: CreateFeedDto) {
    return 'This action adds a new feed';
  }

  feed(search: FilterFeedDto) {
    return ` This action returns all feed ${search}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feed`;
  }

  update(id: number, updateFeedDto: UpdateFeedDto) {
    return `This action updates a #${id} feed`;
  }

  remove(id: number) {
    return `This action removes a #${id} feed`;
  }
}
