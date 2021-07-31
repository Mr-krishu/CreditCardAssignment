import React from "react";
import { getCardType } from "../../utils/cardTypes";
import "../Style.css";

export const CreditCard = ({ cardState }) => {

  const getCard = () => {
    let cardType =  getCardType(cardState.cardNumber.replace(/\s/g, ''));
    let image = "./images/discover.png";
    if (cardType) {
      switch(cardType) {
        case "VISA" : 
          image = "./images/visa.png";
          break;
        case "MASTERCARD":
          image = "./images/mastercard.png";
          break;
        case "AMEX":
          image = "./images/amex.png";
          break;
        case "MAESTRO":
          image = "./images/maestro.png";
          break;
        default:
      }
    }
    return image;
  }

  let imageTag = getCard();
  if (cardState.cvv && document.getElementsByClassName("cvvclass")[0] ) {
    document.getElementsByClassName("cardContainerContent")[0].style.transform = "rotateY(180deg)";
    document.getElementsByClassName("cardContainerContent")[0].style.transition = "transform 0.6s";
    document.getElementsByClassName("cardContainerContent")[0].style.transformStyle = "preserve-3d";
  }
  let maskCard = cardState.cardNumber;
  if (cardState.cardNumber.length > 16) {
    var cardnumber = cardState.cardNumber;
    var first4 = cardnumber.substring(0, 4);
    var last5 = cardnumber.substring(cardnumber.length - 5);
  
    let mask = cardnumber.substring(4, cardnumber.length - 5).replace(/\d/g,"*");
    maskCard = first4 + mask + last5;
  }

  return (
    <div className="cardContainer">
      <div className="cardContainerContent" style={{  backgroundImage: `url('./images/6.jpeg')` }}>
        {/* <img src="./images/2.jpeg" className="cardImg" /> */}
        <div className="cardSubContainer flip-card-front">
          <div className="cardheadercontainer">
            <div className="cardChip">
              <img src="./images/chip.png" alt="chip" />
            </div>
            <div className="cardType">
              <img src={imageTag} alt="cardType" />
            </div>
          </div>
          <div className={`cardNumber ${
              document && document.activeElement.name === "cardNumber"
                ? "activeCard"
                : "cardNumber"
            }`}
>
            <div >{maskCard || `#### #### #### ####`}</div>
          </div>
          <div className="cardBottomcontainer">
            <div className="cardHolderName">
              <div className="cardHead">Card Holder</div>
              <div className={`cardHoldName ${
                  document && document.activeElement.name === "cardName"
                    ? "activeCard"
                    : ""
                }`}>{cardState.cardName || `Full Name`}</div>
            </div>
            <div className={`cardExpires ${
                  document &&
                  (document.activeElement.name === "year" ||
                    document.activeElement.name === "month")
                    ? "activeCard"
                    : ""
                }`}>
              <div className="cardHead">Expires</div>
              <div className={`cardHoldName`}>{`${cardState.month} / ${cardState.year?.substring(2,4)}`}</div>
            </div>
            <div>
            </div>
          </div>
        </div>
        <div className="cardSubContainer flip-card-back">
        <div className="blacks">
    <div className="blackstrip"></div>
    </div>
          <div className="cvvcvv">CVV</div>
          <div className="cardNumberCVV">
            <div>{cardState.cvv.replace(/\d/g, "*")}</div>
          </div>
          <div className="cardTypeCVV">
            <img src={imageTag} alt="cardType" />
          </div> 
        </div>
      </div>
    </div>
  );
};
