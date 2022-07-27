import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { type } from '@testing-library/user-event/dist/type';

function CategoryButton(  ) {
    const [categoryArray, setCategoryArray] = useState([true,true,true,true,true]);
    // const [props, setProps] = useState({})


    const buttonToggleArrayElement = e => {
        e.preventDefault();
        const arrayToReplace = [...categoryArray];
        if (e.target.name == "Currency" ){
          arrayToReplace[0] = !arrayToReplace[0];
          setCategoryArray(arrayToReplace);
        }else if (e.target.name == "Smart Contract Platform" ){
          arrayToReplace[1] = !arrayToReplace[1];
          setCategoryArray(arrayToReplace);
        }else if (e.target.name == "Computing" ){
          arrayToReplace[2] = !arrayToReplace[2];
          setCategoryArray(arrayToReplace);
        }else if (e.target.name == "DeFi" ){
          arrayToReplace[3] = !arrayToReplace[3];
          setCategoryArray(arrayToReplace);
        }else if (e.target.name == "Culture & Entertainment" ){
          arrayToReplace[4] = !arrayToReplace[4];
          setCategoryArray(arrayToReplace);
        } else {
          console.log("wrong category name '" + e.target.name + "' at buttonAddCategoryArray");
        }
        // setProps( {
        //   ...props,
        //   dateRange: dateRange,
        //   categoryArray: categoryArray
        // })
        console.log("props categoryArray checkwise:", categoryArray);
      }
    

    return(
        <div>
        {
          categoryArray[0] ? (
            <button onClick={buttonToggleArrayElement} name = "Currency">Currency hide </button>
            ):(
              <button onClick={buttonToggleArrayElement} name= "Currency">Currency show </button>
            )
          } {
          categoryArray[1] ? (
            <button onClick={buttonToggleArrayElement} name = "Smart Contract Platform">Smart Contract Platform hide </button>
            ):(
              <button onClick={buttonToggleArrayElement} name= "Smart Contract Platform">Smart Contract Platform show </button>
            )
        }{
          categoryArray[2] ? (
            <button onClick={buttonToggleArrayElement} name = "Computing">Computing hide </button>
            ):(
              <button onClick={buttonToggleArrayElement} name= "Computing">Computing show </button>
            )
        }{
          categoryArray[3] ? (
            <button onClick={buttonToggleArrayElement} name = "DeFi">DeFi hide </button>
            ):(
              <button onClick={buttonToggleArrayElement} name= "DeFi">DeFi show </button>
            )
        }{
          categoryArray[4] ? (
            <button onClick={buttonToggleArrayElement} name = "Culture & Entertainment">Culture & Entertainment hide </button>
            ):(
              <button onClick={buttonToggleArrayElement} name= "Culture & Entertainment">Culture & Entertainment show </button>
            )
        }
        </div>
    );
}

export default CategoryButton;