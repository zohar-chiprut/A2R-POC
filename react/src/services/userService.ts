import {BehaviorSubject} from 'rxjs';

const currentUserSubject = new BehaviorSubject(null);

export const userService = {
  currentUser: currentUserSubject.asObservable(),
  setCurrentUser: (user) => currentUserSubject.next(user),
};
