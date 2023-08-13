import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./init";

const auth = getAuth(app);

function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export { createUser, signIn };
