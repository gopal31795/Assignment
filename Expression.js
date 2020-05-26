import React, { Fragment } from "react";
import './Exp.css';
import Conditions from "./Conditions";
import Description from './Description';
import $ from "jquery";
import { Condition } from './Action';
import { connect } from 'react-redux';

class Expression extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: $(window).width(),
            height: $(window).height()
        }   
    }
    componentDidMount() {    
        
    window.addEventListener('resize',this.resizeWindow)
    }
     resizeWindow = () => {
        this.setState(() => {
            return {
                width: $(window).width(),
                height: $(window).height()
            }
        });
     }

    render() {
        const Header = () =>{
            return ( 
                <div style={{padding:'1%'}}> 
                <div className="header">
                    <p className="header-title">If node space test </p>
                    <p className="header-close">&times;</p>
                </div>
                <p>If node</p>
                <div className="selection">
                    <button    
                    className={this.props.condition_btn ? "selection-btn btn_color":"selection-btn"} 
                    onClick={ this.props.condition_btn ? null: this.props.Enable}> Conditions </button>
                    <button 
                    className={!this.props.condition_btn ? "selection-btn btn_color":"selection-btn"}
                     onClick={ !this.props.condition_btn ? null: this.props.Enable}> Description </button>
                </div>
                </div>
            )
        }
        let style = { height: this.state.height + 'px' };
        return (
            <div className="main" style={style}>
                <Header></Header>
               { this.props.condition_btn ? <Conditions ></Conditions> : <Description></Description>}
            </div>
        )

    }
}
const mapStateToProps = state => {
    return {
        condition_btn: state.condition_btn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Enable: () => dispatch(Condition()),
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(Expression);