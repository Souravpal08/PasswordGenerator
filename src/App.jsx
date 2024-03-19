import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberTake, setNumberTake] = useState(false)
  const [charTake, setCharTake] = useState(false)
  const [password, setPassword] = useState("")

  //useref hook
  const passwordRef= useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


    if (numberTake) str += "0123456789"
    if (charTake) str += "@!#$%^&*+-/_-~[]{}"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numberTake, charTake, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberTake, charTake, passwordGenerator])
  const copyPasswordToClipBoard= useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    
  }, [password])

  


  return (
    <>
      <h1 className='text-5xl text-center text-green-500'>Password Generator</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-xl  my-44 text-black-500 bg-gray-500 h-24 text-center '>
        <div className='flex shadow rounded-xl overflow-hidden mb-4 '>
        
          <input type="text"
            value={password}
            className='outline-none w-full py-1'
            placeholder='Create password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipBoard} className='outline-none bg-green-900 px-5 py-1  text-slate-100 shrink-0 hover:bg-green-700'>Copy</button>

        </div>

        <div className='flex text-base gap-x-2'>
          <div className='flex items-center gap-x-1'>
          
            <input type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label >length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberTake}
              id='numberInput'
              value={length}
              className='cursor-pointer'
              onChange={() => { setNumberTake((prev) => !prev) }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charTake}
              id='charTaken'
              value={length}
              className='cursor-pointer'
              onChange={() => { setCharTake((prev) => !prev) }}
            />
            <label htmlFor="charTaken">Special Charectors</label>
          </div>
        </div>
      </div>

    </>
  )

}
export default App
