import "./ItemCard.css"
import RequestedLabel from "../../assets/icons/requestedLabel.png"
import NotAvailableLabel from "../../assets/icons/notAvailableLabel.png"

const ItemCard = (props) => {
    // console.log(props);
    return (
        <div className="itemCard" id={`${props.status}`} onClick={() => props.openModal(props.item)}>
            {
                props.status == 'borrowed' && (

                    <div className="itemCard__label">
                        <img src={NotAvailableLabel} alt="Not Available" />
                    </div>
                )
            }
            <div className="itemCard__image">
                <img src={props.image} alt={props.title} />
            </div>
            <div className="itemCard__info">
                <div className="itemCard__info__title">
                    <h1>{props.title}</h1>
                </div>
                <div className="itemCard__info__description">
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemCard;