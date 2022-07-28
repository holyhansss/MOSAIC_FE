import React ,{useState}from "react";
import FearandGreed from "../components/FearAndGreed/FearandGreed.js";
import Index1d from "../components/LineGraph/LineGraph1d.js";
import Index1mo from "../components/LineGraph/LineGraph1mo.js";
import Index1y from "../components/LineGraph/LineGraph1y.js";
import CategoryLineGraph_1y from "../components/CategoryLineGraph/CategoryLineGraph_1y.js"
import CategoryLineGraph_1mo from "../components/CategoryLineGraph/CategoryLineGraph_1mo.js"
import CategoryLineGraph_1d from "../components/CategoryLineGraph/CategoryLineGraph_1d.js"
import axios from 'axios';

// import CategoryButton from "../components/CategoryLineGraph/CategoryButton.js"
// 시장동향
// S&P 500 지수와 CMC 200 그래프(line) 불러옴
//공포탐욕지수 이미지 불러옴
//카테고리별 그래프 불러옴
// 위너 코인 (카테고리별 ) 리스트 나타냄

function Marketpage() 
{
  const range = ["1d","1mo", "1y"];
  const [content, setContent] = useState(null);
  const [dateRange, setDateRange] = useState("1y");
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [categoryArray, setCategoryArray] = useState([true,true,true,true,true]);
  const [props, setProps] = useState({})

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
      console.log("1y clicked!"); 
      setDateRange("1y")
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setCategoryIndex(0)

    } else if (e.target.name === "1mo") {
      console.log("1mo clicked!");
      setDateRange("1mo")
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setCategoryIndex(1)

    } else if (e.target.name === "1d") {
      console.log("1d clicked!");
      setDateRange("1d")
      setProps( {
        dateRange: dateRange,
        categoryArray: categoryArray
      })
      setCategoryIndex(2)
    }
  }

  const CategoryButton = () => {
    const buttonToggleArrayElement = e => {
      e.preventDefault();
      const arrayToReplace = [...categoryArray];
      if (e.target.name === "Currency" ){
        arrayToReplace[0] = !arrayToReplace[0];
      }else if (e.target.name === "Smart Contract Platform" ){
        arrayToReplace[1] = !arrayToReplace[1];
      }else if (e.target.name === "Computing" ){
        arrayToReplace[2] = !arrayToReplace[2];
      }else if (e.target.name === "DeFi" ){
        arrayToReplace[3] = !arrayToReplace[3];
      }else if (e.target.name === "Culture & Entertainment" ){
        arrayToReplace[4] = !arrayToReplace[4];
      } else {
        console.log("wrong category name '" + e.target.name + "' at buttonAddCategoryArray");
      }
      setCategoryArray(arrayToReplace);
      if (categoryIndex === 0)
        setCategoryIndex(3);
      else if (categoryIndex === 3) {
        setCategoryIndex(0);
      } else if (categoryIndex === 1)
        setCategoryIndex(4);
      else if (categoryIndex === 4){
        setCategoryIndex(1);
      } else if (categoryIndex === 2)
        setCategoryIndex(5);
      else if (categoryIndex === 5){
        setCategoryIndex(2);
      } else {
        console.error("Wrong categoryIndex; out of bounds");
      }
  

      // console.log("Category Index:", categoryIndex);  
      setProps( {
        ...props,
        dateRange: dateRange,
        categoryArray: arrayToReplace
      })

      console.log("props categoryIndex checkwise:", categoryIndex);
      console.log("props dateRange checkwise:", props.dateRange);
      console.log("props categoryArray checkwise:", props.categoryArray);
    }
  
  return (
    <div>
    {
      categoryArray[0] ? (
        <button onClick={buttonToggleArrayElement} name = "Currency" color="green"> Currency hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Currency" color="green">Currency show </button>
        )
      } {
      categoryArray[1] ? (
        <button onClick={buttonToggleArrayElement} name = "Smart Contract Platform" theme="grey">Smart Contract Platform hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Smart Contract Platform" theme="grey">Smart Contract Platform show </button>
        )
    }{
      categoryArray[2] ? (
        <button onClick={buttonToggleArrayElement} name = "Computing" theme="skyblue">Computing hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Computing" theme="skyblue">Computing show </button>
        )
    }{
      categoryArray[3] ? (
        <button onClick={buttonToggleArrayElement} name = "DeFi" theme="pink">DeFi hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "DeFi" theme="pink">DeFi show </button>
        )
    }{
      categoryArray[4] ? (
        <button onClick={buttonToggleArrayElement} name = "Culture & Entertainment" theme="orange">Culture & Entertainment hide </button>
        ):(
          <button onClick={buttonToggleArrayElement} name= "Culture & Entertainment" theme="orange">Culture & Entertainment show </button>
        )
    }
    </div> 
  )
}
  
  const selectComponent = [
      <Index1d />,
      <Index1mo />,
      <Index1y />,
  ];

  const categoryComponent = [
    <CategoryLineGraph_1y {...props}/>,
    <CategoryLineGraph_1mo {...props}/>,
    <CategoryLineGraph_1d {...props}/>,
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
          {/* <div>{categoryComponent[categoryIndex]}</div> */}
          <div>

            {categoryIndex == 0 && <CategoryLineGraph_1y {...props}/>}
            {categoryIndex == 1 && <CategoryLineGraph_1mo {...props}/>}
            {categoryIndex == 2 && <CategoryLineGraph_1d {...props}/>}
            {categoryIndex == 3 && <CategoryLineGraph_1y {...props}/>}
            {categoryIndex == 4 && <CategoryLineGraph_1mo {...props}/>}
            {categoryIndex == 5 && <CategoryLineGraph_1d {...props}/>}
          </div>

          <CategoryButton/>
        </div>
        
        <div><FearandGreed/></div>
      </div>
    );
};
export default  Marketpage;