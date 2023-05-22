import {initializeApp} from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBKxDcFSxePw3R0ohCNVXvUeb681rPiExU",
    authDomain: "e-commerce-4c6b5.firebaseapp.com",
    projectId: "e-commerce-4c6b5",
    storageBucket: "e-commerce-4c6b5.appspot.com",
    messagingSenderId: "391647416343",
    appId: "1:391647416343:web:1d1e5865f1a4ac8949cc52"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => { //Used only once to load data to firebase
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj);
    });

    await batch.commit();

}

export const auth = getAuth();

export const signWithGooglePopup = () => signInWithPopup(auth, provider);

export const signWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const createUserFromAuth = async (userAuth, aditionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...aditionalInfo})
        } catch (e) {
            console.log('error on user create', e);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signUserInWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);

export const onUserAuthChangeListener = (callback) => onAuthStateChanged(auth, callback)


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}
