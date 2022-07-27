import React ,{useState, useEffect}from "react";

import FearandGreed from "../components/FearAndGreed/FearandGreed.js";
import Index1d from "../components/SnPCMCLineGraph/LineGraph1d.js";
import Index1mo from "../components/SnPCMCLineGraph/LineGraph1mo.js";
import Index1y from "../components/SnPCMCLineGraph/LineGraph1y.js";
import CategoryLineGraph_1y from "../components/CategoryLineGraph/CategoryLineGraph_1y.js"
import CategoryLineGraph_1mo from "../components/CategoryLineGraph/CategoryLineGraph_1mo.js"
import CategoryLineGraph_1d from "../components/CategoryLineGraph/CategoryLineGraph_1d.js"
import CategoryButton from "../components/CategoryLineGraph/CategoryButton.js"
// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
//공포탐욕지수 이미지 불러옴
//카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

function Marketpage() 
{
  const range = ["1d","1mo", "1y"];
  const [content, setContent] = useState(null);
  const [dateRange, setDateRange] = useState("");
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [categoryArray, setCategoryArray] = useState([true,true,true,true,true]);
  const [props, setProps] = useState({})
  // let props = {
  //   imageUrl:"/js.com",
  //   imageText:""food""
  //   }
  //   <ImageText {...props} />



  const buttonValueSetting = e => {
      e.preventDefault();
      if (e.target.name === "1d") {   
        setContent(0)
      } else if (e.target.name === "1mo") {
        setContent(1)
      } else if (e.target.name === "1y") {
        setContent(2)
      }
    };
    
  const buttonCategorySettings = e => {
    e.preventDefault();
    if (e.target.name === "1y") { 
      console.log("1d clicked!"); 
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setDateRange("1y")
      setCategoryIndex(0)
    } else if (e.target.name === "1mo") {
      console.log("1mo clicked!");
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setDateRange("1mo")
      setCategoryIndex(1)
    } else if (e.target.name === "1d") {
      console.log("1y clicked!");
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setDateRange("1d")
      setCategoryIndex(2)
    }
  }

  // const buttonToggleArrayElement = e => {
  //   e.preventDefault();
  //   const arrayToReplace = [...categoryArray];
  //   if (e.target.name == "Currency" ){
  //     arrayToReplace[0] = !arrayToReplace[0];
  //     setCategoryArray(arrayToReplace);
  //   }else if (e.target.name == "Smart Contract Platform" ){
  //     arrayToReplace[1] = !arrayToReplace[1];
  //     setCategoryArray(arrayToReplace);
  //   }else if (e.target.name == "Computing" ){
  //     arrayToReplace[2] = !arrayToReplace[2];
  //     setCategoryArray(arrayToReplace);
  //   }else if (e.target.name == "DeFi" ){
  //     arrayToReplace[3] = !arrayToReplace[3];
  //     setCategoryArray(arrayToReplace);
  //   }else if (e.target.name == "Culture & Entertainment" ){
  //     arrayToReplace[4] = !arrayToReplace[4];
  //     setCategoryArray(arrayToReplace);
  //   } else {
  //     console.log("wrong category name '" + e.target.name + "' at buttonAddCategoryArray");
  //   }
  //   setProps( {
  //     ...props,
  //     dateRange: dateRange,
  //     categoryArray: categoryArray
  //   })
  //   console.log("props checkwise:", props);
  //   console.log("props dateRange checkwise:", props.dateRange);
  //   console.log("props categoryArray checkwise:", props.categoryArray);
  // }
  
  const selectComponent = [
      <Index1d />,
      <Index1mo />,
      <Index1y />,
  ];

  const categoryComponent = [
    <CategoryLineGraph_1y {...props}/>,
    <CategoryLineGraph_1mo {...props}/>,
    <CategoryLineGraph_1d {...props}/>
  ]
  
    return (
      <div>
          <div>Market page</div>
        <div>
          <h5>S&P vs coinmarket cap</h5>
          { range.map((data, idx) => {
            return (
              <button onClick={buttonValueSetting} name={data} key={idx}>
                {data}
              </button>
            );
          })}
        </div>

        {content !== null &&<div>{selectComponent[content]}</div>}
        
        <h5>Coin categories</h5>
        
        <div>
          <button onClick={buttonCategorySettings} name= "1d">
            1d
          </button>
          <button onClick={buttonCategorySettings} name= "1mo">
            1mo
          </button>
          <button onClick={buttonCategorySettings} name= "1y">
            1y
          </button>
          <div>{categoryComponent[categoryIndex]}</div>

          <CategoryButton/>

          {/* <div>
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
          </div> */}
        </div>
        
        <div><FearandGreed/></div>
      </div>
    );
};
export default  Marketpage;