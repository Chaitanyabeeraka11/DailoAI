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



    const onSent = async(prompt)=>{
        setresultData("")
        setLoading(true)
        setshowResult(true)
        setrecentPrompt(input)
        const response = await run(input)
        setresultData(response)
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