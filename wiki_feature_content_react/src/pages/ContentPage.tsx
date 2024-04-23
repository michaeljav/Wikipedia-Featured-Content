import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContentType';
import { Pagination, PaginationProps } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { LinkVisited } from '../components/LinkVisited';
// import 'antd/dist/antd.css';

export interface ContentItem {
  title: string;
  description: string;
  thumbnail?: string;
}

interface IPaginationItem {
  current: number;
  pageSize: number;
}
interface IPagination {
  sizeChange: IPaginationItem;
  change: IPaginationItem;
  total: number;
  contentItem: any[];
}

const ContentPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [visited, setVisited] = useState<boolean>(false);
  const initialPage = { total: 0, contentItem: [] } as IPagination;

  const [pagenati, setPagenati] = useState<IPagination>(initialPage);
  const { selectedDate, selectedLanguage, content, setContent } =
    useContext(AppContext);

  // Function to paginate the items array based on page number and items per page
  const paginateItems = (
    items: [],
    currentPage: number,
    itemsPerPage: number
  ) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!selectedDate) return;
      const dateUTC = selectedDate + ' 00:00:00';
      const year = selectedDate && new Date(dateUTC).getFullYear();
      const month =
        selectedDate &&
        (new Date(dateUTC).getMonth() + 1)?.toString()?.padStart(2, '0');
      const day = selectedDate && new Date(dateUTC).getDate();
      // console.log(selectedDate, year, month, day);
      try {
        const api = `https://api.wikimedia.org/feed/v1/wikipedia/${selectedLanguage}/featured/${year}/${month}/${day}`;

        console.log(api);
        const response = await axios.get(api);
        // console.log(response);
        const articles = response?.data?.onthisday?.reduce((acc, article) => {
          article?.pages?.forEach((element) => {
            acc.push(element);
          });

          return acc;
        }, []);
        console.log(articles);
        setContent(articles ?? []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate && selectedLanguage) {
      fetchData();
    }
  }, [selectedDate, selectedLanguage, setContent]);

  useEffect(() => {
    const lengthItems = content.length;
    const itemsFilt = paginateItems(content ?? [], 1, 5);
    setPagenati((prev) => {
      return { ...prev, total: lengthItems, contentItem: itemsFilt };
    });
  }, [content]);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    // console.log(current, pageSize);
    const lengthItems = content.length;
    //SET TOTAL PAGES
    setPagenati((prev) => {
      return { ...prev, total: lengthItems };
    });
  };

  const onChange: PaginationProps['onChange'] = (current, pageSize) => {
    const itemsFilt = paginateItems(content ?? [], current, pageSize);
    // setContent(itemsFilt ?? []);
    setPagenati((prev) => {
      return { ...prev, contentItem: itemsFilt ?? [] };
    });
    // console.log('MICHAEL ', itemsFilt);
  };

  return (
    // <div className='container mx-auto min-w-20'>
    <div className=' mt-3  min-w-20 flex flex-col  justify-center'>
      {/* <h1 className='text-2xl font-bold mb-4'>Featured Content</h1> */}
      {loading ? (
        <div className='text-center mt-8'>
          <p className='text-gray-500 font-extrabold size-20'>Loading...</p>
        </div>
      ) : pagenati?.contentItem?.length > 0 ? (
        <div className='flex flex-col items-center gap-4'>
          <div>
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              defaultPageSize={5}
              defaultCurrent={1}
              total={pagenati.total}
              // total={20}
            />
          </div>
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pagenati?.contentItem?.map((item, index) => (
              <div
                key={index}
                className='border border-gray-300 rounded p-4 cursor-pointer'
                // onClick={() => window.open(item.title, '_blank')}
              >
                {/* <h2 className='text-lg font-bold mb-2 flex items-center'>
                  {item.text}
                </h2> */}
                {item?.thumbnail?.source ? (
                  <img
                    src={item.thumbnail.source}
                    alt={item.title}
                    className='mb-2 w-full h-auto object-cover rounded-t-lg'
                    // className=''
                  />
                ) : (
                  <div className='bg-gray-200 h-40  flex items-center justify-center text-gray-400 text-lg'>
                    No Image Available
                  </div>
                )}
                <h4 className='border-b-2 text-3xl truncate-text'>
                  {item?.normalizedtitle}
                </h4>
                <p className='my-4'>{item.extract}</p>

                {/* <Link
                  target='_blank'
                  rel='noopener noreferrer'
                  to={`${item?.content_urls?.desktop?.page}`}
                  className='my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500'
                >
                  Read more
                </Link> */}

                {/* <NavLink
                  target='_blank'
                  rel='noopener noreferrer'
                  to={`${item?.content_urls?.desktop?.page}`}
                  className='my-4 px-4 py-2 text-white hover:bg-blue-700 bg-blue-500'
                >
                  Read more
                </NavLink> */}

                <LinkVisited item={item?.content_urls?.desktop?.page} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='text-center mt-8'>
          <p className='text-gray-500'>There are no elements to display.</p>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
