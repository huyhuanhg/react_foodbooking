import * as S from '../style';
import { BsFillBookmarkFill, MdDescription, TiLocationArrow } from 'react-icons/all';
import { Button, Spin } from 'antd';
import { getBookmarksAction } from '../../../../redux/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PAGE_TITLE, ROOT_PATH } from '../../../../contants';
import { Link } from 'react-router-dom';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { accessToken } = JSON.parse(localStorage.userInfo);
  const { userInfo: { data: { id: userId } } } = useSelector(({ userReducer }) => userReducer);
  const {
    bookmarks: {
      currentPage,
      data: bookmarkData,
      lastPage,
      load: bookmarkLoad,
      total,
    },
  } = useSelector(({ bookmarkReducer }) => bookmarkReducer);
  moment.locale('vi');
  useEffect(() => {
    document.title = PAGE_TITLE.BOOKMARKS;
    if (userId) {
      dispatch(getBookmarksAction({
        accessToken,
      }));
    }
  }, []);
  const renderBookmarkList = () => {
    return bookmarkData.map(({
      id: bookmarkId,
      storeCateName,
      storeImage,
      storeName,
      storeNotMark,
      storeDescription,
      storeAddress,
      description,
      createdAt,
    }) => {
      return (
        <S.RateItem key={bookmarkId} imagePath={`${ROOT_PATH}${storeImage}`} isBookmark>
          <Link to={`/stores/${storeNotMark}.${bookmarkId}`}>
            <div className='store-image'>
              <div />
            </div>
          </Link>
          <div className='store-info'>
            <div className='store-info-name'>
              <Link to={`/stores/${storeNotMark}.${bookmarkId}`}>{storeName}</Link>
              <div><small>{storeCateName}</small></div>
            </div>
            <div className='store-info-address'>
              <p><span className='icon'><TiLocationArrow /></span><p><span>{storeAddress}</span></p></p>
            </div>
            <div className='store-info-description'>
              <p><span className='icon'><MdDescription /></span><p><span>{storeDescription}</span></p></p>
            </div>
            <p><span className='icon'><BsFillBookmarkFill /></span><p><span>{description}</span></p></p>
          </div>
          <small className='created-at'>{moment(createdAt).fromNow()}</small>
        </S.RateItem>
      );
    });
  };
  return (
    <div>
      {
        total === 0 ?
          <S.ProfileEmpty minHeight={500}>
            {
              !bookmarkLoad ?
                <div>
                  <BsFillBookmarkFill />
                  <p>Bộ sưu tập của bạn trống</p>
                </div>
                :
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    marginTop: '10px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <Spin />
                </div>
            }
          </S.ProfileEmpty>
          :
          <div style={{ paddingBottom: 15 }}>
            <S.TitleContent>
              Bộ sưu tập của bạn
            </S.TitleContent>
            <div style={{ minHeight: 430 }}>
              {renderBookmarkList()}
              {
                bookmarkLoad &&
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    marginTop: '10px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <Spin />
                </div>
              }
              {currentPage < lastPage &&
              <div className='d-flex vertical-center horizontal-center mt-3r'>
                <Button
                  onClick={() =>
                    dispatch(getBookmarksAction({
                      accessToken,
                      page: currentPage + 1,
                    }))
                  }
                >
                  Xem thêm
                </Button>
              </div>
              }
            </div>
          </div>
      }
    </div>
  );
};
export default Bookmarks;