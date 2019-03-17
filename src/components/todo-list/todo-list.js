import React, { Component } from 'react';
import TodoItem from './todo-item';
import TodoHeader from './todo-header';
import TodoFooter from './todo-footer';
import './todo-list.css';



class TodoList extends Component{
    constructor(){
        super();
        this.state = {
            preShow:0,
            show:1,
            data:[
                {
                    value: 'todo 1',
                    isComplete: true,
                },
                {
                    value: 'todo 2',
                    isComplete: false
                },
                {
                    value: 'todo 3',
                    isComplete: false
                },
                {
                    value: 'todo 4',
                    isComplete: false
                }
            ]
        };
        this.onItemClick = this.onItemClick.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.onShowClick = this.onShowClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onActiveClick = this.onActiveClick.bind(this);
        this.onAllClick = this.onAllClick.bind(this);
        this.onClearComplete = this.onClearComplete.bind(this);
        this.onCompleteClick = this.onCompleteClick.bind(this);
    }
    
    onItemClick(item){
        const oldData = this.state.data;
        const index = oldData.indexOf(item);
        const newData = [...oldData.slice(0,index),{value: item.value, isComplete:!item.isComplete},...oldData.slice(index+1)];
        this.setState({
            data:newData
        });
        
    }

    onKeyup(event){
        let text = event.target.value;
        console.log(text);
        text = text.trim();
        if (!text) return;
        if (event.keyCode===13){
            this.setState({
                show:true,
                data:[
                    {
                        value:text,
                        isComplete:false
                    },
                    ...this.state.data
                ]
            });
            event.target.value='';
        }
        else return;
        
    }

    onShowClick(){
        const {preShow,show}= this.state;
        this.setState({
            show:show?0:preShow,
            preShow:show
        });
    }

    onDeleteClick(event){
        const deleteItemIndex = parseInt(event.target.id.split('-')[1]);
        this.setState({
            data:[
                ...this.state.data.slice(0,deleteItemIndex),
                ...this.state.data.slice(deleteItemIndex+1)
            ]
        });
        return;
    }

    onAllClick(){
        const {show}= this.state;
        this.setState({
            show:1,
            preShow:show
        });
    }

    onActiveClick(){
        const {show}= this.state;
        this.setState({
            show:3,
            preShow:show
        });
    }
    
    onCompleteClick(){
        const {show}= this.state;
        this.setState({
            show:2,
            preShow:show
        });
    }

    onClearComplete(){
        this.setState({
            show:1,
            preShow:0,
            data:this.state.data.filter((item)=>!item.isComplete)
        });
    }


    render(){ 
        const {preShow, show}=this.state;
        const allItems = this.state.data;
        const showData=allItems.filter((item)=>{
            switch(show){
                case 1:
                    return true;
                case 2:
                    return item.isComplete;
                case 3:
                    return !item.isComplete;
                default:
                    return false;
            }
        });
        const numPre = allItems.filter((item)=>{
            switch(preShow){
                case 1:
                    return true;
                case 2:
                    return item.isComplete;
                case 3:
                    return !item.isComplete;
                default:
                    return false;
            }
        }).length;
        return(
            <div className="todo-list">
                <TodoHeader 
                    onKeyUp={this.onKeyup} 
                    show={show} 
                    onShowClick={this.onShowClick}
                    numComplete={allItems.reduce((a,item)=>a+item.isComplete,0)}
                />
                {
                    (show!==0)
                    ?showData.map((item,index)=>
                    <TodoItem 
                        id={index} 
                        key={index} 
                        onClick={()=>this.onItemClick(item)} 
                        item={item} 
                        show={show}
                        onDelete={this.onDeleteClick}
                    />)
                    :<TodoItem 
                        
                        key={0} 
                        item={{
                            value:numPre?'Show '+numPre+' items in your list':'Create a new item',
                            isComplete:false
                        }}
                        show={show}
                        onClick={this.onAllClick}
                    />
                }
                <TodoFooter 
                    num={allItems.filter((item)=>!item.isComplete).length}
                    onAllClick={this.onAllClick}
                    onActiveClick={this.onActiveClick}
                    onCompleteClick={this.onCompleteClick}
                    onClearComplete={this.onClearComplete}
                    show={show!==0?show:preShow}
                />

            </div>
        );
    }

}

export default TodoList;