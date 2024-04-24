import { Catch, Injectable } from '@nestjs/common';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FilterFeedDto } from './dto/filter-feed.dto';
import axios from 'axios';
import { IResponseObj } from './interface/IResponse';
import { error } from 'console';
import * as url from 'url';
import * as dotenv from 'dotenv';
@Injectable()
export class FeedService {
  async apiResquest(search: FilterFeedDto) {
    const dateUTC = search.date + ' ';
    const year = new Date(dateUTC).getFullYear();
    const month = (new Date(dateUTC).getMonth() + 1)
      ?.toString()
      ?.padStart(2, '0');
    const day = new Date(dateUTC).getDate();

    try {
      const api = `https://api.wikimedia.org/feed/v1/wikipedia/${search.lang}/featured/${year}/${month}/${day}`;

      console.log(api);
      const response = await axios.get(api);
      // console.log(response);
      const articles = response?.data?.onthisday?.reduce((acc, article) => {
        article?.pages?.forEach((element) => {
          acc.push(element);
        });
        return acc;
      }, []);
      return { status: 'success', data: articles } as IResponseObj;
    } catch (error) {
      console.log('Error: ' + error);
      return { status: 'fail', error: error?.message } as IResponseObj;
    }
  }

  async feed(search: FilterFeedDto): Promise<IResponseObj> {
    return await this.apiResquest(search);
  }

  async getLangapiTransla(): Promise<IResponseObj> {
    const options = {
      method: 'GET',
      url: 'https://translation-api.translate.com/translate/v1/mt-langs',
      headers: {
        'x-api-key': process.env.RAPIDAPI_API_KEY,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(JSON.stringify(response.data));
      return { status: 'success', data: response.data } as IResponseObj;
    } catch (error) {
      console.error(error);
    }
  }

  async apiTransla(
    from: string,
    to: string,
    text: string,
  ): Promise<IResponseObj> {
    console.log('key ', process.env.RAPIDAPI_API_KEY);
    // =&=&text=text%20for%20test
    const params = new url.URLSearchParams();
    params.append('source_language', from);
    params.append('translation_language', to);
    params.append('text', text);

    const options = {
      method: 'POST',
      url: 'https://translation-api.translate.com/translate/v1/mt',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'x-api-key': process.env.RAPIDAPI_API_KEY,
      },
      data: params,
    };

    try {
      const response = await axios.request(options);
      console.log(JSON.stringify(response.data));
      return { status: 'success', data: response.data } as IResponseObj;
    } catch (error) {
      console.error(error);
    }
  }

  async translate(lang: string, search: FilterFeedDto) {
    const objects = await this.apiResquest(search);

    //translate  titles and extract
    const { normalizedtitle, extract } =
      objects?.data?.length > 0 && objects?.data[0];
    const translatednormalizedtitle: IResponseObj = await this.apiTransla(
      'en',
      lang,
      normalizedtitle,
    );
    const translatedextract: IResponseObj = await this.apiTransla(
      'en',
      lang,
      extract,
    );

    return {
      normalizedtitle,
      translatednormalizedtitle,
      extract,
      translatedextract,
    };
  }

  getLanguages() {
    return this.getLangapiTransla();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} feed`;
  // }
}
