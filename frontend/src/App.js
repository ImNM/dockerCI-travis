import logo from './logo.svg';
import './App.css';
import React ,{useState,useEffect} from 'react'
import axios from 'axios';

function App() {
  const [lists, setlists] = useState([]);
  const [value, setvalue] = useState("")

  useEffect(() => {
    axios.get('/api/values')
    .then(res => {
      console.log("res",res);
      setlists(res.data);
    })
  }, [])

  const ChangeHandler = (e)=>{
    setvalue(e.currentTarget.value);

  }

  const submitHandler = (e) =>{
    e.preventDefault();

    axios.post('/api/value',{value:value})
      .then(res =>{
        if(res.data.success){
          console.log("res",res);
          setlists([...lists,res.data])
          setvalue("")
        }else{
          alert('값을 db에 넣는데 실패했습니다.')
        }
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
       <div className = "container">
         {lists && lists.map((list,index)=>(
           <li key={index}>{list.value}</li>
         ))}
         <form className="example" onSubmit = {submitHandler}>
           <input
            type="text"
            placeholder="입력해주셔"
            onChange = {ChangeHandler}
            value={value}
           />
           <button type="submit">확인</button>
         </form>
       </div>
      </header>
    </div>
  );
}

export default App;
