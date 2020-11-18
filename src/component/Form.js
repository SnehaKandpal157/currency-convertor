import React, { useState } from 'react';
import { Label, Input } from 'reactstrap';
import { currencyOptions } from "../constants";
import { Select, MenuItem, Button } from "@material-ui/core";
import _isEmpty from "lodash/isEmpty";
import axios from 'axios';

const Form = () => {
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [inputCurrency, setInputCurrency] = useState("");
  const [outputCurrency, setOutputCurrency] = useState("");


  const handleInputCurrency = (e) => {
    const { value } = e.target;
    setInputCurrency(value)
  }

  const handleOutputCurrency = (e) => {
    const { value } = e.target;
    setOutputCurrency(value)
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputAmount(value);
  };

  const handleConvert = () => {
    axios.get(`https://api.frankfurter.app/latest?amount=${inputAmount}&from=${inputCurrency}&to=${outputCurrency}`)
      .then(res => {
        const data = res.data.rates;
        setOutputAmount(data[outputCurrency])
      })
  }

  return (
    <div className="outer-wrap">
      <div className="input-wrap">
        <Label className="label">Input Amount</Label>
        <Input
          type="number"
          min={1}
          onChange={handleInputChange}
          name="inputAmount"
          value={inputAmount}
          placeholder="Input Amount"
          className="input"
        />
        <Select
          name="inputCurrency"
          value={inputCurrency}
          onChange={handleInputCurrency}
        >
          {currencyOptions.map((option, index) => (
            <MenuItem value={option.value} key={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="button-wrap">
        <Button onClick={handleConvert} variant="contained" color="primary"
          disabled={!_isEmpty(inputAmount) && !_isEmpty(inputCurrency) && !_isEmpty(outputCurrency) ? false : true}>Convert</Button>
      </div>
      <div className="output-wrap">
        <Label className="label">Output Amount</Label>
        <Input
          readOnly
          name="outputAmount"
          value={outputAmount}
          placeholder="Output Amount"
          className="input"
        />

        <Select
          name="outputCurrency"
          value={outputCurrency}
          onChange={handleOutputCurrency}
        >
          {currencyOptions.map((option, index) => (
            <MenuItem value={option.value} key={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default Form
