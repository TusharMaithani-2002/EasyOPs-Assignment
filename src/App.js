
import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [first,setFirst] = useState('')
  const [last,setLast] = useState('')
  const [contact,setContact] = useState('')
  const [data,setData] = useState([])
  const [table,setTable] = useState([])
  const [load,setLoad] = useState(true)

 useEffect(()=> {
  let temp = localStorage.getItem('data')
  setData(JSON.parse(temp))
  setTable(JSON.parse(temp))
 },[])

 function saveDetails(e) {

  let prev = data
  console.log('saving...')
  for(let entry of prev) {
    if (entry.first === first) return
    else if (entry.contact === contact) return
  }
  prev.unshift({
    first:first,
    last:last,
    contact:contact
  })
  setData(prev)
  setTable(prev)
  setLoad(!load)
  localStorage.setItem('data',JSON.stringify(data))
  console.log(data)
 }

 function searchItems(e) {
    let target = e.target.value
    if(target === "" || target === " "||target ===undefined) {
      setTable(data)
      console.log(data)
      setLoad(!load)
    }
    const filtered = data.filter((entry) => {
      return entry.first.toLowerCase().includes(target.toLowerCase())
    })
    console.log(filtered)
    setTable(filtered)
    setLoad(!load)
 } 

 function deleteEntry(i) {

  let prev = data
  prev.splice(i,1)
  setTable(prev)
  setData(prev)
  setLoad(!load)
  localStorage.setItem('data',JSON.stringify(data))
 }
  return (
    <div className="App">
      <div className='form-container'>

        <div className='name-input'>
          <span>Person's Name</span>
          <div className='inputs'>
            <input type="text" placeholder='First' onChange={e=>setFirst(e.target.value)}/>
            <input type="text" placeholder='Last' onChange={e=>setLast(e.target.value)}/>
          </div>
        </div>

        <div className='contact-number'>
          <span>Contact Number</span>
          <input type="text" onChange={e=>setContact(e.target.value)} placeholder='contact'/>
        </div>

        <button className ="save-btn"onClick={saveDetails}>Save</button>
      </div>
      <input type="text" className='search-items' placeholder="search" onChange={searchItems}/>

      <div>
        <div>

          <div className='table-header'>
            <span>S. NO.</span>
            <span>Name</span>
            <span>Contact</span>
            <span>Delete</span>
          </div>
          {(load || !load ) && table.map((row,i)=>(
           <div key={i}>
            <div className='table-content'>
            <span>{i+1}</span>
            <span>{row.first+" "+ row.last}</span>
            <span>{row.contact}</span>
            <button className="delete-btn"onClick ={e=>deleteEntry(i)}>x</button>
          </div>
           </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
