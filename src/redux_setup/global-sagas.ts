import { all, fork } from "redux-saga/effects";
import imageSaga from "modules/image/image.saga";

const sagas: any = [imageSaga];

function* globalSagas() {
  const combinedSagas = sagas.map((saga: any) => fork(saga));

  yield all(combinedSagas);
}

export default globalSagas;
