import { useEffect, useRef, useState } from 'react';
import Lottie from "lottie-react";
import TickAnimation from "../../assets/anim/tick.json";
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import LocationIcon from '../../assets/icons/locationIcon.svg'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../config/firebaseAuth";
import './Modal.css'

const Modal = (props) => {
    const [buttonText, setButtonText] = useState('');
    const modalRef = useRef(null);
    const btnRef = useRef(null);
    const formRef = useRef(null);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.closeModal();
            }
        };

        setButtonText(props.selectedItem.status == 'requested' ? 'Requested' : 'Borrow')
        if (props.selectedItem.status == 'requested') {
            btnRef.current.style.opacity = 0.5;
            btnRef.current.disabled = true;
        }

        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, [500]);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    const handleOnClick = () => {
        props.setSelectedItem((prev) => ({ ...prev, status: 'requested' }))

        const newList = props.list.map((item) => {
            if (item === props.selectedItem) {
                return { ...item, status: 'requested' };
            }
            return item;
        })

        localStorage.setItem('itemsList', JSON.stringify(newList));
        props.setList(newList);
        setButtonText('Requested');

        btnRef.current.style.opacity = 0.5;
        btnRef.current.disabled = true;
        formRef.current.submit()
    }

    return (
        <div className="modal" style={{ top: `${window.scrollY}px` }}>
            <div className="dummy" style={{ display: 'none' }}>
                <iframe name='dummyFrame'></iframe>
                <form ref={formRef} target="dummyFrame" action="https://docs.google.com/forms/d/e/1FAIpQLSe7XthiZisbK-X-4VMkAiZqXP8fdAOHfq_hpYncU4sgn735Aw/formResponse">
                    <input type="text" name='entry.1757279984' id='ownerName' value={props.selectedItem.itemOwner} />
                    <input type="text" name='entry.402312765' id='borrowerName' value={user?.displayName} />
                    <input type="text" name='entry.1057195487' id='itemName' value={props.selectedItem.itemName} />
                    <input type="text" name='entry.1935684765' id='itemId' value={props.selectedItem.itemId} />
                    <input type="text" name='entry.557503360' id='timeStamp' value={Date.now()} />
                </form>
            </div>
            <div className="modal__wrapper" ref={modalRef}>
                <div className="modal__wrapper__image">
                    <img src={props.selectedItem.itemImage} alt="" />
                </div>
                <div className="modal__wrapper__info">
                    <div className="modal__wrapper__info__title">
                        <h1>{props.selectedItem.itemName}</h1>
                    </div>
                    <div className="modal__wrapper__info__description">
                        <p>{props.selectedItem.itemDescription}</p>
                    </div>
                </div>
                <div className="modal__wrapper__location">
                    <img src={LocationIcon} alt="location" />
                    <p>{props.selectedItem.location}</p>
                </div>
                <div className="modal__wrapper__cta">
                    <button ref={btnRef} onClick={handleOnClick}>{buttonText}</button>
                    {/* <Lottie style={{ width: '5rem' }} onComplete={() => {
                        console.log('Animation completed'); 
                        props.onClose();
                    }} animationData={TickAnimation} /> */}
                </div>
            </div>
        </div>
    )
}

export default Modal;