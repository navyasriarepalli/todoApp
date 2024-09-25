import { IoClose } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import './index.css'
const Each=props=>{
    const {user,DeletingTodo,ModifyingTodo}=props
    const {userInput,uniqueNo,count}=user

    const onClickTodo=()=>{
        DeletingTodo(uniqueNo)

    }

    const Modifying=()=>{
        ModifyingTodo(uniqueNo)
    }
    return(
        <div className="cont">

            <p className="para">{userInput}( Changed by {count} times )</p>
            
            
            <div className="icon-cont">
            <FaPen onClick={Modifying}  />
            <IoClose className="icon" onClick={onClickTodo}  />
            </div>
            
        </div>
    )
}

export default Each