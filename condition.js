import React, { useState, Fragment, useEffect} from "react";
import {EnableCondition} from './Action';
import {connect} from 'react-redux';
import './Exp.css';


const ConditionButton = ({id, isAnd, handleConditionButton,isValid}) => {
    console.log(isValid);
    let style = isValid ? 'blueBorder andORBtn' : 'andORBtn';
    return <div className={style}>
             <button  id={id}  onClick={() => handleConditionButton(id)}>
              {isAnd ? 'AND' : 'OR'}
            </button> </div>
}

const Card = (props) => { 
    
    const [isLeftClick,setLeftClick] = useState(false);
    const [isRightClick,setRightClick] = useState(false);

    const edit_Condition=(event)=>{
        event.target.contentEditable='true';
        event.target.focus();
    }
    const handleConditionChange = (event) => {

        props.handleConditionValueChange(props.id, event.target.innerHTML);
        event.target.contentEditable='false';   
    }
    const handleEnterKey = (event) => {
        if(event.key === 'Enter'){
            props.handleConditionValueChange(props.id, event.target.innerHTML);
            event.target.contentEditable='false';
        }
    }
    const LeftClickedElement=(props)=>{
        return(
            <div className="leftBtnClick" >
                <span onClick={(e) => leftClick(e, props.id)}>(</span>&nbsp;
                <span onClick={(e) =>leftClick(e, props.id)}>!</span>&nbsp;
                <span onClick={(e) => leftClick(e, props.id)}>&times;</span>
            </div>
        )
    }
    const RightClickedElement=(props)=>{
        return(
            <div className="leftBtnClick">
                <span onClick={rightClick}>&times;</span>&nbsp;
                <span id={props.id} onClick={(e)=>{rightClick(e,props.id)}}>)</span>
            </div>
        )
    }
    const leftClick = (event, id) =>{
        if(event.target.innerHTML === '(' || event.target.innerHTML === '!'){
            const newLeft = {
                isSelected: true,
                selectedValue: event.target.innerHTML,
                plusIcon: '',
            }
            props.setSelectedValue(id,newLeft,'left');
            props.validate(event,id,'left'); 
        }  
        setLeftClick(!isLeftClick);
    }   
    const rightClick = (event,id) =>{
        if(event.target.innerHTML === ')'){
            const newRight = {
                isSelected: true,
                selectedValue: event.target.innerHTML,
                plusIcon: '',
            }
            props.setSelectedValue(id,newRight,'right');
            props.validate(event,id,'right'); 

            let el = document.getElementById(id).parentElement;
            let co = el.getBoundingClientRect();
            
            //let elem = document.elementFromPoint();

          // elem.style.background = "red";
           } 
        setRightClick(!isRightClick);
    }    
   
    return(
        
        <div className={props.value.isWrongCondition ? "group wrongCondition" : props.value.isValid ? 'group blueBorder' : 'group'}>
          {[props.value.leftValue].map((left,i)=>{
            if(left.isSelected){  
               return <span key={props.id} id={props.id}>{left.selectedValue}</span>
             }else{  
                return  isLeftClick ?  <LeftClickedElement key={i} id={props.id}/> :<div key={props.id} className="btn" onClick={leftClick}>{left.plusIcon}</div>             
             }
                })}
            <label 
             className="new_conditions"
             id={props.id} contentEditable={false} 
             onDoubleClick={edit_Condition} 
             onBlur={handleConditionChange}
             onKeyDown={handleEnterKey}>
             {props.condition_name}
             </label>
             {[props.value.rightValue].map((right,i)=>{
            if(right.isSelected){  
               return <span key={props.id} id={props.id}>{right.selectedValue}</span>
             }else{  
                return  isRightClick ?  <RightClickedElement key={i} id={props.id}/> :<div key={props.id} className="btn" onClick={rightClick}>{right.plusIcon}</div>             
             }
                })}
        </div>
        )
            
}



function Conditions(props){
    // const [cards,setCards] = useState([]);
    const [conditions,setConditions]=useState([]);
    const NoCondition=(props)=>{
        return(
             <div className="no_condition">
                <h6>No conditions</h6>
                <div className="clickDiv" onClick={()=>{props.onclick();createCard();}}>+New Conditions</div>
            </div>
        )
    }
    const handleConditionButton = (id) => {
        const newCondition =[...conditions]
        newCondition[id].isAnd = !newCondition[id].isAnd;
        setConditions(newCondition)
    }
    const handleChange= (id, newConditionName) => {
        // TODO: Change the id with new Value
        
        const newConditions = [...conditions]
        newConditions[id].condition_name = newConditionName
        setConditions(newConditions)   
    }
   
    const createCard= () =>{
        
        let newCondition = [];
        let length = conditions.length;
               
        if(conditions.length) {
            newCondition.push({id: length, isAnd: true, type:'button',isValid:false});
            length += 1;
        }
        newCondition.push({
             id:length,condition_name:'New Condition',type:'card',isWrongCondition:false,isValid:false,
             leftValue:{ isSelected:false,plusIcon:'+', selectedValue:'' },
             rightValue:{ isSelected:false,plusIcon:'+', selectedValue:''}
        });
        setConditions([...conditions,...newCondition]);
    }
    const setSelectedValue = (id,value,pos) => { 
        let newArr = [...conditions];       
        if(pos === 'left'){
        newArr[id].leftValue = value;
        }else{
        newArr[id].rightValue = value;
        }
        setConditions(newArr);
        }
    const validateCondition = (event,id,pos) =>{
        let newArr = [...conditions];
        
        if(pos=='right'){
            for(let i=id;i>=0;i=i-2)
            {  
                if(newArr[i].leftValue.selectedValue=='(' && newArr[i].rightValue.selectedValue==')')
                {
                    newArr[i].isWrongCondition=true;
                    break;
                }else if(newArr[i].isValid){

                    newArr[id].isWrongCondition=true;
                    break;
                }
                else if(newArr[i].leftValue.selectedValue=='('){
                    
                  for(let j=i;j<=id;j++)
                   {
                        newArr[j].isValid=true;
                   }
                   
                }             
                  
            } 
        }else{
            for(let i=id;i<=0;i=i+2)
            {
                if(newArr[i].leftValue.selectedValue=='(' && newArr[i].rightValue.selectedValue==')')
                {
                    newArr[i].isWrongCondition=true;
                    break;
                }
                else if(newArr[i].isValid){
                    newArr[id].isWrongCondition=true;
                    break;
                }
                else if(newArr[i].leftValue.selectedValue==')'){
                    for(let j=i;j>=id;j--)
                   {
                        newArr[i].isValid=true;
                   }
                }
            }
        }
        
        setConditions(newArr);
       
    }
        return(
        <Fragment>
           { props.enable_condition ? <NoCondition onclick={props.Enable}></NoCondition> :
            <div className="clickDiv" onClick={createCard}>+New Conditions</div> }
            <div>
            {conditions.map((condition, i) => {
                if(condition.type === 'card') {
                    return <Card
                        key={i}
                        id={condition.id}
                        condition_name={condition.condition_name}
                        handleConditionValueChange={handleChange}
                        value={condition}
                        setSelectedValue={setSelectedValue}
                        validate={validateCondition}
                    {...props}/>
                } else {
                    return <ConditionButton
                        key={i}
                        isAnd={condition.isAnd}
                        id={condition.id}
                        handleConditionButton={handleConditionButton}
                        isValid={condition.isValid}
                    />
                }
            })}
            </div>
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        enable_condition: state.enable_condition,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Enable: () =>dispatch(EnableCondition()),
    }

};
export default connect(mapStateToProps,mapDispatchToProps)(Conditions);
