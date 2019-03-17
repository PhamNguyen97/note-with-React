import React, { Component } from 'react';
import allImg from '../../imgs/show-all.svg';
import lessImg from '../../imgs/show-less.svg';
class TodoHeader extends Component{
    render(){
        const {onKeyUp,show, onShowClick, numComplete} = this.props;
        return(
            <div className="todo-list header">
                <img 
                    src={show?lessImg:allImg} 
                    onClick={onShowClick}
                />
                <input type='text' placeholder='Add more todos' onKeyUp={onKeyUp}/>   
                <p>
                    {numComplete+' completed items'}
                </p>
            </div> 
            
        );
    }

}

export default TodoHeader;