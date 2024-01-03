import React, { useCallback, useEffect, useRef, useState } from 'react'


export default function Passwordgen() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharecter] = useState(false)
  const [Password, setPassword] = useState("")
  const passref = useRef(null)

  const Passwordgen = useCallback(() => {
    let Pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) str = str + '1234567890'
    if (character) str += '?/@#$%^&*'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      Pass = Pass + str.charAt(char)
    }
    setPassword(Pass)
  },[length, number, character, setPassword])

  useEffect(()=>{
    Passwordgen()
  },[length, number, character, setPassword])

  const passcopy = useCallback(()=>{
    passref.current?.select()
    passref.current?.setSelectionRange(0,5)
         window.navigator.clipboard.writeText(Password)
  },[Password])

  
  return (
    <div className='vh-100 mw-100 mx-auto pt-4 my-8 text-white bg-dark'>
      <h3 className='text-center text-white'>Password generator</h3>
      <div className='flex-shadow rounded-lg overflow-hidden mb-4'>
        <input
        type='text'
        value={Password}
        readOnly
        placeholder='password'
        ref={passref}
       />
       <button onClick={passcopy} className='btn btn-primary'>Copy</button>
      </div>

      <div>
        <input
        type='range'
        min={0}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>setLength(e.target.value)}/>
        <label>length:{length}</label>

        <input
        className='mx-2'
        type='checkbox'
        defaultChecked={number}
        id='numberinput'
        onChange={()=>setNumber((prev)=>!prev)}/>
        <label>number:{number}</label>

        <input
         className='mx-2'
        type='checkbox'
        defaultChecked={character}
        id='charinput'
        onChange={()=>setCharecter((prev)=>!prev)}/>
        <label>Character:{character}</label>
      </div>
    </div>
  )
}
