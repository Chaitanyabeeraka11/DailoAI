import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
const Main = () => {
    const {onSent,recentPrompt, showResult,loading,resultData,setInput,input} = useContext(Context)
  return (
    <div className='main'>
        <div className="nav">
            <p>DailoAI</p>
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span>Hello, I'm DailoAI</span></p>
            </div>
            <div className="help">
                <p>How can I help you?</p>
            </div>
        </div>
        <div className="main-bottom">
            <div className="searchbox">
                <input type="text" placeholder='Ask anything here...' />
                <div>
                    <img src={assets.send_icon} alt="" />
                </div>
            </div>
            <p className='bottom-info'>
                Dailo may display Inaccurate or Incomplete information. Double Check its response.
            </p>
        </div>
    </div>
  )
}

export default Main