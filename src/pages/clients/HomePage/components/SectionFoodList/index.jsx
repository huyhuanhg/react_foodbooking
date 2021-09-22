import { useEffect, useState } from 'react';
import { Affix, Button, Col, Menu, Row, Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import * as HomeS from '../../styles';
import * as S from './style';
import { Filter as FilterStyle } from '../../../../../styles';
import { BiFilterAlt, BsCheck, MdRemoveShoppingCart } from 'react-icons/all';
import { getFoodListAction } from '../../../../../redux/actions';

const SectionFoodList = ({ render }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const {
    foodList: {
      currentPage,
      data: foodData,
      lastPage,
      load: foodLoad,
      total,
    },
  } = useSelector(({ foodReducer }) => foodReducer);
  const { tagList: { data: tagData } } = useSelector(({ tagReducer }) => tagReducer);

  const [menuActive, setMenuActive] = useState('created_at');
  const [sortPrice, setSortPrice] = useState('');
  const [request, setRequest] = useState({
    group: null,
    sort: 'created_at',
    sortType: -1,
    page: 1,
    tags: [],
  });

  useEffect(() => {
    dispatch(getFoodListAction(request));
  }, [request]);

  const handleChaneTag = (key) => {
    let tagsActive = [...request.tags];
    if (key === '') {
      tagsActive = [];
    } else {
      const tagIndex = tagsActive.indexOf(key);
      if (tagIndex !== -1) {
        tagsActive.splice(tagIndex, 1);
      } else {
        tagsActive.push(key);
      }
    }
    setRequest({
      ...request,
      page: 1,
      tags: tagsActive,
    });
  };
  const handleChangeMenu = (key) => {
    setMenuActive(key);
    let menuRequest = {
      ...request,
      page: 1,
    };
    if (key === 'promotion') {
      menuRequest = {
        ...menuRequest,
        sort: null,
        group: key,
      };
    } else {
      setSortPrice('');
      menuRequest = {
        ...menuRequest,
        sort: key,
        sortType: -1,
        group: null,
      };
    }
    setRequest(menuRequest);
  };

  const renderTagListMenu = (tagsActive) => {
    return tagData.map(({ id, tagActive, tagName }) => {
      if (tagActive === 1) {
        let icon = null;
        const isActive = tagsActive.indexOf(`${id}`) > -1;
        if (isActive) {
          icon = (<BsCheck className='custom-icon-position' />);
        }
        return (
          <Menu.Item
            key={id}
            icon={icon}
            className='hide-after'
            onClick={({ key }) => handleChaneTag(key)}
          >
            {tagName}
          </Menu.Item>
        );
      }
    });
  };
  return (
    <Row gutter={20}>
      <Col span={4} className='filter-food-by-tags'>
        <Affix offsetTop={88.375}>
          <Menu
            theme='light'
            style={{ background: '#fff', height: 'auto' }}
            selectedKeys={request.tags.length === 0 ? [''] : request.tags}
            mode='inline'
          >
            <S.HeaderFilter>
              <BiFilterAlt /> Bộ lọc
            </S.HeaderFilter>
            <Menu.Item
              className='hide-after'
              key=''
              icon={request.tags.length === 0 && < BsCheck className='custom-icon-position' />}
              onClick={({ key }) => handleChaneTag(key)}
            >
              Tất cả
            </Menu.Item>
            {renderTagListMenu(request.tags)}
          </Menu>
        </Affix>
      </Col>
      <Col lg={20} md={20} sm={24}>
        <HomeS.AffixIndex offsetTop={88.375}>
          <FilterStyle>
            <Menu
              mode='horizontal'
              multiple={true}
              selectedKeys={[menuActive]}
              style={{
                flexBasis: '50%',
              }}
            >
              <Menu.Item key='created_at' onClick={({ key }) => {
                handleChangeMenu(key);
              }}>
                Mới nhất
              </Menu.Item>
              <Menu.Item key='promotion' onClick={({ key }) => {
                handleChangeMenu(key);
              }}>
                Khuyến mãi
              </Menu.Item>
              <Menu.Item key='food_consume' onClick={({ key }) => {
                handleChangeMenu(key);
              }}>
                Bán chạy
              </Menu.Item>
            </Menu>
            <S.SuffixFilter className='suffix-filter'>
              <li>
                <Select
                  value={sortPrice}
                  style={{ margin: '0 5px' }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  onChange={(value) => {
                    setSortPrice(value);
                    if (menuActive === 'created_at' || menuActive === 'food_consume') {
                      setMenuActive('');
                    }
                    setRequest({
                      ...request,
                      sort: 'price',
                      sortType: value,
                      page: 1,
                    });
                  }}
                >
                  <Option value='' selected hidden disabled>
                    Giá
                  </Option>
                  <Option value='1'>Giá tăng dần</Option>
                  <Option value='-1'>Giá giảm dần</Option>
                </Select>
              </li>
            </S.SuffixFilter>
          </FilterStyle>
        </HomeS.AffixIndex>
        <div className='p-relative pt-2r'>
          {total === 0
            ?
            <div
              className='d-flex vertical-center horizontal-center t-center fw-b'
              style={{
                minHeight: '400px',
                fontSize: '150%',
              }}
            >
              <div>
                <MdRemoveShoppingCart
                  style={{
                    color: '#f5222d',
                    fontSize: '200%',
                  }}
                /><br />
                Không có món ăn nào!
              </div>
            </div>
            :
            render(foodData, 6)
          }
          {
            foodLoad &&
            <Spin
              size='large'
              className='p-absolute'
              style={{
                top: '100%',
                left: '50%',
                transform: 'translate(-50%, -200%)',
              }}
            />
          }
          {currentPage < lastPage &&
          <div className='d-flex vertical-center horizontal-center mt-3r'>
            <Button
              onClick={() => setRequest({
                ...request,
                page: request.page + 1,
              })}
            >
              Xem thêm
            </Button>
          </div>
          }
        </div>
      </Col>
    </Row>
  );
};
export default SectionFoodList;

SectionFoodList.propTypes = {
  render: PropTypes.func,
};
