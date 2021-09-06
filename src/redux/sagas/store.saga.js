import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, STORE_ACTION } from '../constants';
import { SERVER_CLIENT_API_URL } from '../../contants';
import camelCaseKeys from 'camelcase-keys';

function* getStoreListSaga() {
  try {
    const result = yield axios({
      method: 'GET',
      url: `${SERVER_CLIENT_API_URL}/stores`,
    });
    yield put({
      type: SUCCESS(STORE_ACTION.GET_STORE_LIST),
      payload: {
        data: camelCaseKeys(result.data, { deep: true }),
      },
    });
  } catch (e) {
    // yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST_INITIAL), payload: e.message });
  }
}

function* getStoreDetailSaga(action) {
  try {
    const { user, slug } = action.payload;
    const storeId = slug.slice(slug.lastIndexOf('.') + 1);
    if (/^\d+$/.test(storeId)) {
      const result = yield axios({
        method: 'GET',
        url: `${SERVER_CLIENT_API_URL}/stores/${storeId}`,
        params: {
          ...(user && { user }),
        },
      });
      yield put({
        type: SUCCESS(STORE_ACTION.GET_STORE_DETAIL),
        payload: {
          data: camelCaseKeys(result.data, { deep: true }),
        },
      });
    } else {
      yield put({ type: FAILURE(STORE_ACTION.GET_STORE_DETAIL), payload: { error: 'StoreId không tồn tại' } });
    }
  } catch (e) {
    yield put({ type: FAILURE(STORE_ACTION.GET_STORE_DETAIL), payload: { error: e.message } });
  }
}

export default function* storeSaga() {
  yield takeEvery(REQUEST(STORE_ACTION.GET_STORE_LIST), getStoreListSaga);
  yield takeEvery(REQUEST(STORE_ACTION.GET_STORE_DETAIL), getStoreDetailSaga);
}
