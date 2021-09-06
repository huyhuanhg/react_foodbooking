import * as HomeS from '../../styles';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'antd';
import StoreItem from '../../../../../components/clients/StoreItem';
import { useSelector } from 'react-redux';

const SectionStore = () => {
  const { storeList } = useSelector((state) => state.storeReducer);

  const renderStore = (span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {storeList.data.map((store) => {
          return (
            <Col span={span} key={store.id}>
              <StoreItem {...store} />
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <HomeS.Section>
      <HomeS.SectionTitle>Cửa hàng</HomeS.SectionTitle>
      <HomeS.SectionContainer>
        {renderStore()}
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Link to="/stores">
            <Button>Xem tất cả</Button>
          </Link>
        </div>
      </HomeS.SectionContainer>
    </HomeS.Section>
  );
};
export default SectionStore;
