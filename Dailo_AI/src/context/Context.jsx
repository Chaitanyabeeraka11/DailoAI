import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input,setInput] = useState("");
    const [recentPrompt,setrecentPrompt] = useState("");
    const [prevPrompts,setprevPrompts] = useState([]);
    const [showResult,setshowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setresultData] = useState("");

const delayPara = (index,nextWord) =>{
    setTimeout(function (){
        setresultData(prev=> prev + nextWord)
    },75*index)
}

    const onSent = async(prompt)=>{
        setresultData("")
        setLoading(true)
        setshowResult(true)
        let response;
        if(prompt !== undefined ){
            response = await run(prompt)
            setrecentPrompt(prompt)
        }
        else{
            setprevPrompts(prev => [...prev,input])
        }
        
        
        let responseArray = response.split("**");
        let newresponse = ""; 
        for(let i = 0; i <responseArray.length;i++){
            if(i==0 || i%2!=1){
                newresponse = newresponse + responseArray[i];
            }
            else{
                newresponse = newresponse + "<b style='color:#7371fc'>" + responseArray[i] + "</b>";
            }
        }
        let newresponse2 = newresponse.split("*").join("</br>")
        let newResponseArray = newresponse2.split(" ");
        for(let i = 0; i <newResponseArray.length;i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+ " ");
        }
        setLoading(false)
        setInput("")
    }
    

    const contextValue = {
        prevPrompts,setprevPrompts,
        onSent,setrecentPrompt,recentPrompt,
        showResult,loading,resultData,input,setInput
    }
    return <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
}
export default ContextProvider;