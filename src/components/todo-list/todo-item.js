import React, { Component } from 'react';
import classNames from 'classnames';
import uncheckImg from '../../imgs/success.svg';
import checkImg from '../../imgs/success-check.svg';
import close from "../../imgs/close.svg";

class TodoItem extends Component{
    render(){
        const {id, item, onClick, onDelete, show} = this.props;
        return(
            <div 
                className={classNames('todo-list','item',{
                    'deactive': item.isComplete
                })}
                id={'todo-item-'+id}
            >
                <img src={item.isComplete?checkImg:uncheckImg} 
                    onClick={onClick}
                />
                <div className={classNames('todo-list','value')} >{item.value}</div>
                {show&&<img 
                    src={close} 
                    className={classNames('todo-list','close')} 
                    onClick={onDelete}
                    id={'close-'+id}
                />}
            </div>
        );
    }
}

export default TodoItem;