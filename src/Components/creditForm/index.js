import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import { CreditCard } from "../creditCard";
import { makeStyles } from "@material-ui/core/styles";

const monthArray = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];



export const CreditForm = () => {
  
  const [cardState, setCardState] = useState({
    cardNumber: "",
    cardName: "",
    cvv: "",
    year: "YYYY",
    month: "MM",
  });
  const [yearArray, setYearArray] = useState([]);
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  let errorMessage = "";

  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let temArray = [];
    for (let i = 1950; i <= currentYear; i++) {
      console.log(i);
      temArray.push(i.toString());
      setYearArray(temArray);
    }
  }, []);
  

  const handleSubmit = () => {
    const { cardNumber, cardName, cvv, year, month } = cardState;
    if (!cardNumber || !cardName || !cvv || !year || !month) {
      alert("Please fill all the fields");
      setError(true);
    } else {
      alert("Data entered successfully!");
      window.location.reload();
      setError(false);
    }
  };
  
  const { cardNumber, cardName, cvv, year, month } = cardState;
  if (error) {
    errorMessage = "All fields are mandatory!";
  } else if (cardNumber && cardName && cvv && year && month) {
    errorMessage = "";
  }

  const handleChange = (e) => {
    let str = cardState.cardNumber.replace(/\s/g, "");
    if (
      (e.target.name === "cardNumber" &&
        (/^[A-Za-z]+$/.test(e.target.value) ||
          e.target.value?.replace(/\s/g, "")?.length > 16)) ||
      (e.target.value.length > 3 && e.target.name === "cvv")
    ) {
      return;
    }

    if (
      e.target.name === "cardNumber" &&
      str.length < 15 &&
      number.length < 19
    ) {
      if (e.target.value?.replace(/\s/g, "")?.length % 4 === 0) {
        e.target.value += " ";
      }
    }
    if (number.length < 19) {
      setNumber(e.target.value);
    }
    setCardState({ ...cardState, [e.target.name]: e.target.value });
    if (cardState.cardNumber === "") {
      setNumber("");
    }
  };






  if (document && document.activeElement.name === "cvv") {
    let ccID = document.getElementById("cvv");
    ccID.setAttribute("class", "cvvclass");
  }
  return (
    <>
      <div className="formContainer">
        <div>
          <CreditCard cardState={cardState} />
        </div>
        <div className="formSubContainer">
          {errorMessage ? <p className="error">{errorMessage}</p> : null}
          <div className="customField">
            <div className="formheader">Card Number</div>
            <TextField
              variant="outlined"
              className="field"
              name="cardNumber"
              value={cardState.cardNumber}
              onChange={handleChange}
            />
          </div>
          <div className="customField">
            <div className="formheader">Card Name</div>
            <TextField
            
              variant="outlined"
              className="field"
              name="cardName"
              value={cardState.cardName}
              onChange={handleChange}
            />
          </div>
          <div className="datefieldContainer">
            <div className="datefield">
              <div className="formheader">Month</div>
              <FormControl variant="outlined">
                <Select
                defaultValue="Month"
                  onChange={handleChange}
                  className="select"
                  value={cardState.month}
                  name="month"
                >
                  {monthArray.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="datefield">
              <div className="formheader">Year</div>
              <FormControl variant="outlined">
                <Select
                
                  onChange={handleChange}
                  className="select"
                  value={cardState.year}
                  name="year"
                >
                  {yearArray.length > 0 &&
                    yearArray.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className="datefield">
              <div className="formheader">CVV</div>
              <TextField
                id="cvv"
                variant="outlined"
                className="field cvvfield"
                name="cvv"
                value={cardState.cvv}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <Button className="submitButton" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
