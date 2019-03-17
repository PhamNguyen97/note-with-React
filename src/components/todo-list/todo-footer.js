import React, { Component } from 'react';
import classNames from 'classnames';
import './todo-footer.css';



class TodoFooter extends Component{
    render(){
        const {show,num,onAllClick,onActiveClick,onCompleteClick,onClearComplete}=this.props;
        return(
            <div className='footer'>
                <div className='footer-p1'>
                    {`${num} item${num>0?'s':''} left`}
                </div>
                <div className = 'footer-p2'>
                    <div onClick={onAllClick} className={classNames('footer-all','button-item',{
                        'active':show===1
                    })}>
                        All
                    </div>
                    <div onClick={onActiveClick} className={classNames('footer-active','button-item',{
                        'active':show===3
                    }) }>
                        Active
                    </div>
                    <div onClick={onCompleteClick} className={classNames('footer-complete','button-item',{
                        'active':show===2
                    })}>
                        Completed
                    </div>

                </div>
                <div onClick={onClearComplete} className={classNames('footer-p3','button-item')}>
                    Clear Completed
                </div>
                
            </div>
        );
    }
}

export default TodoFooter;