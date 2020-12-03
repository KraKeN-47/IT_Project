import { call, put, takeLatest } from "redux-saga/effects";
import jwt from "jwt-decode";

import { setImagePath } from "modules/image/image.slice";
import { login } from "modules/userType/userData.slice";
import { IUserData } from "types/types";

function* InitialAuthenticationCheck() {
  const token = yield localStorage.getItem("token");
  if (token !== null) {
    const data: IUserData = jwt(token);
    yield put(login({ id: data.id, name: data.name, level: data.level }));
    yield put(
      setImagePath({
        imagePath: `https://localhost:5001/profilepicturestorage/${data.id}.jpg`,
      })
    );
  }
}

function* SetPictureOnLogin({ payload }: any) {
  const token = yield localStorage.getItem("token");
  if (token !== null) {
    const tokenData: IUserData = jwt(token);
    if (tokenData.level > 0) {
      yield put(
        setImagePath({
          imagePath: `https://localhost:5001/profilepicturestorage/${tokenData.id}.jpg`,
        })
      );
    }
  }
}

function* imageSaga() {
  yield takeLatest(login.type, SetPictureOnLogin);
  yield call(InitialAuthenticationCheck);
}

export default imageSaga;
