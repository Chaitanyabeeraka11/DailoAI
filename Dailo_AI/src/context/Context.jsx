import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setresultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setresultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const onSent = async (prompt) => {
        setresultData("");
        setLoading(true);
        setshowResult(true);
        let response;
        
        if (prompt !== undefined) {
            response = await run(prompt);
            setrecentPrompt(prompt);
        } else {
            setprevPrompts(prev => [...prev, input]);
            setrecentPrompt(input);
            response = await run(input);
        }
    
        if (response) {
            // Step 1: Handle bold text with color
            let responseArray = response.split("**");
            let newresponse = ""; 
            for (let i = 0; i < responseArray.length; i++) {
                if (i % 2 === 0) {
                    newresponse += responseArray[i];
                } else {
                    newresponse += "<b style='color:#7371fc'>" + responseArray[i] + "</b>";
                }
            }
    
            // Step 2: Handle new lines after periods
            let formattedResponse = newresponse.split(".").join(".<br>");
    
            // Step 3: Handle bullet points
            formattedResponse = formattedResponse.split("*").join("<br>&bull; ");
    
            // Step 4: Split by space and display word by word with delay
            let newResponseArray = formattedResponse.split(" ");
            for (let i = 0; i < newResponseArray.length; i++) {
                const nextWord = newResponseArray[i];
                delayPara(i, nextWord + " ");
            }
        } else {
            console.error("The response from the run function is undefined.");
        }
    
        setLoading(false);
        setInput("");
    };
    

    const contextValue = {
        prevPrompts, setprevPrompts,
        onSent, setrecentPrompt, recentPrompt,
        showResult, loading, resultData, input, setInput
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
}

export default ContextProvider;
