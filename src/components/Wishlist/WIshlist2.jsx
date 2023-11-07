// import "./Wishlist.css"
// import { useRef } from "react"
// import { auth } from "../../config/firebaseAuth";
// import { db } from "../../config/firebaseDB";
// import { useAuthState } from "react-firebase-hooks/auth"
// import { useState, useEffect } from "react";
// import { addDoc, doc, getDocs, updateDoc } from "firebase/firestore";


// const Wishlist = (props) => {
//     const inputRef = useRef(null);
//     const [user] = useAuthState(auth);
//     const [wishList, setWishlist] = useState(['item1', 'item2']);
//     const [userId, setUserId] = useState('LSKYiECRXj8exG7wjCyt');
//     const [userWishList, setUserWishlist] = useState([]);

//     useEffect(() => {
//         getUserWishlist()
//     }, [])

//     const getCommonWishlistData = async () => {

//     }

//     const getUserWishlist = async () => {
//         const res = await getDocs(props.wishlistRef);
//         const userDoc = doc(db, "wishlist", userId)
//         // setUserWishlist(res.docs.map((doc) => ({ ...doc.data.wishList })))
//         console.log(res.docs.map((doc) => ({ ...doc.data().Wishlist })))
//         // console.log(res.docs.map((doc) => ({...doc.data()})))
//     }

//     const addItemToList = async () => {
//         const item = inputRef.current.value;

//         // add to db 

//         // if (userId ==)

//         // const result = await addDoc(props.wishlistRef, { name: user?.displayName, wishList: [...wishList, item] })
//         // // setUserId(result.id)
//         // console.log(result.id)


//         // update user wishlist 
//         const userDoc = doc(db, "wishlist", userId)
//         userWishList.push(item) 
//         await updateDoc(userDoc, { wishList: userWishList });
//         getUserWishlist()
//     }
//     return (
//         <div className="wishlist">
//             <div className="wishlist__header">
//                 <h1>&#11088; Wish List</h1>
//             </div>
//             <div className="wishlist__container">
//                 <ul>
//                     {wishList.map((item) => (
//                         <li>{item}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="whishlist__add">
//                 <input type="text" ref={inputRef} />
//                 <button onClick={addItemToList}>+</button>
//             </div>
//         </div>
//     )
// }

// export default Wishlist;