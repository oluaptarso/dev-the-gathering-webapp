import { Dispatch, SetStateAction } from "react";
import { Subject } from "rxjs";
import IAuthenticatedUser from "src/interfaces/user";

let subject:Subject<unknown>;

const initialState: IAuthenticatedUser|null = null;

let state: IAuthenticatedUser|null = initialState;

const MetamaskUserStore = {
  init: () => {
    subject = new Subject();
    state = initialState;
    subject.next(state);
  },
  subscribe: (setState: Dispatch<SetStateAction<IAuthenticatedUser | null>>) => subject.subscribe((value) => {setState(value as SetStateAction<IAuthenticatedUser | null>)}),
  setUser: (user:IAuthenticatedUser|null) => {
    state = user;
    subject.next(state);
  },
  clear: () => {
    state = initialState;
    subject.next(state);
  },
  unsubscribe: () => subject.unsubscribe(),
  initialState
};

export default MetamaskUserStore;
