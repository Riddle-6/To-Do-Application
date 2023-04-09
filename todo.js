import React,{useState,useEffect} from 'react'

export default function Todo() {

const [task,setTask] = useState("")
const [tasks,setTasks] = useState([])

useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('localStorage'))
    if(storedTasks){
        setTasks(storedTasks)
    }
},[])

const addTask = () => {
    
    if(task){
    const newTask = {id: new Date().getTime().toString(), title : task , show : true}
    setTasks([...tasks,newTask])
    localStorage.setItem("localStorage",JSON.stringify([...tasks,newTask]))
    setTask('')
    }
}

const handleDelete = (id) => {
    const deleted = tasks.filter((t) => t.id !== id)
    setTasks(deleted)
    localStorage.setItem("localStorage",JSON.stringify(deleted)) 
}

const searchHandle = (e) => {
    const searchTask = e.target.value.toLowerCase().trim()
    if(!searchTask){
         setTasks(tasks)
    }
    if(searchTask){
    const checkTasks = tasks.map(entry => {
            entry.show = entry.title.toLowerCase().includes(searchTask)
            return entry
            // if(entry.title.toLowerCase().includes(searchTask)){
            //     entry.show = true
            //     return entry
            // }
            // entry.show = false
            // return entry
        }
    )
    setTasks(checkTasks)
    
}

}


const trueTasks = tasks.filter(task => task.show)




  return (
    <div className='container row'>
        <h1 className='mt-3 text-info'>To-Do App</h1>
        <div className='col-4'>
            <input name = "taskname" type = "text" placeholder='Enter your Task' className='form-control' onChange={(e) => setTask(e.target.value)} value={task}/>
        </div>
        <div className='col-4'>
            <button className='btn btn-primary form-control' onClick={addTask}> Add</button>
        </div>
        <div className='col-4'>
            <input name = "searchName" type = "text" placeholder='Search your Task Here' className='form-control' onChange={(e) => searchHandle(e)} />
        </div>
        <div className='badge'> ________________________________________________________________________________________________________________________________</div>

        {
            trueTasks.map((task) => (
                <React.Fragment key = {task.id}>
                    <div className='col-11'>
                        <span className='form-control bg-white btn mt-2' style = {{textAlign : "left",fontWeight : "bold"}}>
                            {task.title}
                        </span> 
                    </div>
                    <div className='col-1'>
                        <button onClick={() => handleDelete(task.id)} className='mt-2 btn btn-primary'>Delete</button>
                    </div>
                </React.Fragment>
            ))
        }

        <div className='badge'> ________________________________________________________________________________________________________________________________</div>
    </div>
  )
}
 