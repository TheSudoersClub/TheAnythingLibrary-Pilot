import "./Wishlist.css"
import { auth } from "../../config/firebaseAuth";
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, updateDoc, getDocs, addDoc } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from '../../config/firebaseDB'
import { wishlistData } from "../../data/wishList";


const Wishlist = () => {
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || wishlistData)
    const [user] = useAuthState(auth);
    const formRef = useRef(null);
    const inputRef = useRef(null);

    const mergeLists = (array1, array2) => {
        const mergedArray = array1.concat(array2);
        const uniqueValues = mergedArray.filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        return uniqueValues;
    }

    useEffect(() => {
        const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || wishlist;
        if (localWishlist != wishlistData) {
            const updatedList = mergeLists(localWishlist, wishlistData)
            setWishlist(updatedList);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist])

    const addToList = () => {
        const item = inputRef.current.value
        inputRef.current.value = null
        setWishlist((prev) => ([...prev, item]))
        // localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setTimeout(() => {
            formRef.current.submit()
        }, [500]);
    }

    return (
        <div className="wishlist">
            <div className="dummy" style={{ display: 'none' }}>
                <iframe name='dummyFrame'></iframe>
                <form ref={formRef} target="dummyFrame" action="https://docs.google.com/forms/d/e/1FAIpQLSdBBtcXdjQvGGcSCoSlIRb9xAWZ7hAn_r54hMLTtNtEs1TXvA/formResponse">
                    <input type="text" name='entry.1392548446' id='requesterName' value={user?.displayName} />
                    <input type="text" name='entry.1854563827' id='wishList' value={wishlist.join(', ')} />
                </form>
            </div>
            <div className="wishlist__header">
                <h1>&#11088; Wish List</h1>
            </div>
            <div className="wishlist__container">
                <ul>
                    {wishlist.map((item) => (
                        <li key={crypto.randomUUID()}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="whishlist__add">
                <input type="text" ref={inputRef} />
                <button onClick={addToList}>+</button>
            </div>
        </div>
    )
}

export default Wishlist;

