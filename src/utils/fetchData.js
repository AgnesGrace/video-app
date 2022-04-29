//import {firebaseApp} from '../firebaseConfig'
import { collection, getDocs, orderBy, query} from 'firebase/firestore'

//function to fetch all doc from firebase
export const getAllFields = async (firestoreDb) => {
    const feeds = await getDocs(query(
        collection(firestoreDb, "videos"), orderBy("id", "desc"))
    
    )
    return feeds.docs.map(doc => doc.data())
}