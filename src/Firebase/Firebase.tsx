import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore, collection, getDoc, getDocs, addDoc, deleteDoc, doc ,query, where } from "firebase/firestore"
import { Detail } from "../Types/Type";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export const register = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  return user
}

export const login = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  return user
}

export const logout = async () => {
  await signOut(auth)
  return true
}


const db = getFirestore()

const favRef = collection(db, "favourites")

export const getAllFavourites = async() => {
    return getDocs(favRef)
    .then((snapshot) => {
      let favourites:any[] = []
      
      snapshot.docs.forEach((doc) => {
        favourites.push({ ...doc.data(), id: doc.id })
      })
      return favourites
    }).catch(err => {
      console.log(err.message)
    })  
}

export const getSelectedFavourite =async (movieId:number) => {
  return getDocs(favRef)
  .then((snapshot) => {
    let favourites = ""
    snapshot.docs.forEach((doc) => {
      if(doc.data().favouriteMovieId==movieId)
        favourites=doc.id
    })
    return favourites
  }).catch(err => {
    console.log(err.message)
  })  
}



// export const queryData = async (id:number) => {
//   const q = query(favRef, where("favouriteMovieId", "==", id));
//   return getDocs(q)
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.data())      
//     })
//   }).catch(err => {
//     console.log(err.message)
//   }) 
// }


export const addFavourite = async (movieDetail: Detail | undefined ,uid:string) => {
  await addDoc(favRef, {
    movie:movieDetail,
    userId: uid
  })
}

export const removeFavourite = async (id: any) => {
  const delRef = doc(db,'favourites',id)
    await deleteDoc(delRef)
}




export default app  