import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import Each from '../Each'
import './index.css'


const mainList=[{
    uniqueNo:uuidv4(),
    userInput:"Write Code 3",
    count:0
}]

class Todo extends Component{
    state={userInput:"",listing:mainList,}

    addTodoItem=()=>{
        const {userInput}=this.state
        const newList={
            uniqueNo:uuidv4(),
            userInput, 
            count:0,
        }
        
        this.setState(prevState=>({
            listing:[...prevState.listing,newList],
            userInput:''
            

        }))
        
    }
    DeletingTodo=(id)=>{
        const {listing}=this.state

        const updatedList=listing.filter((eachId)=>eachId.uniqueNo!==id)
        this.setState({listing:updatedList})
    }
    ModifyingTodo=(id)=>{
        
        

        this.setState(prevState => ({
            listing: prevState.listing.map(each=> {
              if (id === each.uniqueNo) {
                return {...each, count:each.count+1 }
              }
              return each
            }),
          }))
        



    }



    onClickAddBtn=()=>{
    
        const{userInput}=this.state 
        let num=userInput.slice(-1)
        let number=!isNaN(num)
        console.log(number)
        if(number===true){
            for (let i=0; i<num;i++){
                this.addTodoItem()
    
            }

        }
        else{
            this.addTodoItem()

        }

        
        
        
        
        
        

    }

    onChangeUserInput=event=>{
        
        this.setState({userInput:event.target.value})
        
    
    }
    render(){
        const {userInput,listing}=this.state
        
        

        
        return(
            <div className='bg'>
                <div className='main-cont'>
                    <h1 className='head'>Day Goals!</h1>
                    <div className='mini-cont'>
                        <input type="text" value={userInput} className='input-cont' placeholder='Enter Your Text' onChange={this.onChangeUserInput} />
                        <button className='btn' onClick={this.onClickAddBtn}>Add Todo</button>
                    </div>
                    <div className='two'>
                        <ul>
                            {listing.map(each=>(
                                <Each key={each.uniqueNo} user={each} DeletingTodo={this.DeletingTodo} ModifyingTodo={this.ModifyingTodo}/>
                            
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
            
        )
        

    }
}

export default Todo