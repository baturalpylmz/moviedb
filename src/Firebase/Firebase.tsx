import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocFromCache,
} from "firebase/firestore";
import { Detail } from "../Types/Type";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const register = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const login = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const logout = async () => {
  await signOut(auth);
  return true;
};

const db = getFirestore();

const favRef = collection(db, "favourites");
const commentRef = collection(db, "comments");

// export const getAllFavourites = async() => {
//     return getDocs(favRef)
//     .then((snapshot) => {
//       let favourites:any[] = []

//       snapshot.docs.forEach((doc) => {
//         favourites.push({ ...doc.data(), id: doc.id })
//       })
//       return favourites
//     }).catch(err => {
//       console.log(err.message)
//     })
// }

export const getSelectedFavourite = async (movie: Detail | undefined) => {
  try {
    return getDocs(favRef).then((snapshot) => {
      let favourites = "";
      snapshot.docs.forEach((doc) => {
        if (doc.data().movie.id === movie?.id) favourites = doc.id;
      });
      return favourites;
    });
  } catch (error) {
    console.log(error);
  }
};

export const queryData = async (movieDetail: Detail, uid: string) => {
  const q = query(favRef, where("userId", "==", uid));

  return getDocs(q)
    .then((snapshot) => {
      return !!snapshot.docs.find(
        (doc) => doc.data().movie.id === movieDetail?.id
      );
    })
    .catch((err) => {
      return false;
    });
};

export const queryData2 = async (movieDetail: Detail, uid: string) => {
  const q = query(favRef, where("userId", "==", uid));
  let isClicked = false;
  return getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().movie.id === movieDetail?.id) isClicked = true;
      });
      return isClicked;
    })
    .catch((err) => {
      return false;
    });
};

export const getAllFavourites = async (uid: string) => {
  const q = query(favRef, where("userId", "==", uid));
  
  let favourites: any[] = [];

  return getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        favourites.push({ ...doc.data(), id: doc.id });
      });
      return favourites;
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};

export const getAllComments = (
  user: User,
  movieDetail: Detail | undefined
) => {
  const q = query(
    commentRef,
    where("user.uid", "==", user.uid),
    where("movie.id", "==", movieDetail?.id)
  );

  let comments: any[] = [];

  return getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        comments.push({ ...doc.data() });
      });
      return comments;
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
};

export const addFavourite = async (
  movieDetail: Detail | undefined,
  uid: string
) => {
  await addDoc(favRef, {
    movie: movieDetail,
    userId: uid,
  });
};

export const addComment = async (
  movieDetail: Detail | undefined,
  userDetail: User,
  comment: string
) => {
  await addDoc(commentRef, {
    movie: movieDetail,
    user: userDetail,
    comment: comment,
  });
};

// export const rateMovie = async (movieDetail: Detail | undefined ,uid:string,rated:number) => {
//   await addDoc(rateRef, {
//     movie:movieDetail,
//     userId: uid,
//     rate:rated
//   })
// }

export const removeFavourite = async (id: any) => {
  const delRef = doc(db, "favourites", id);
  await deleteDoc(delRef);
};

export default app;
