import React from "react";
import { useState, useEffect } from "react";



export function Extended() {

    /* Load the entire data object */ 
    const API_URL = "https://wttr.in/Detroit?format=j1";
    const [weather, setWeather] = useState({});  // initialize as empty object
 
    useEffect(() => {
        loadData();
    }, []);
 
    const loadData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setWeather(data.current_condition[0]);
            console.log(data.current_condition[0]);
        } catch (error) {
            console.log("error", error);
        }
    }    

    return (
        <section>
            <h2>Extended weather forecast</h2>
            <div>
                {!weather ? (
                    <div>loading...</div> 
                ) : (
                    <div>
                        {/* Need to build this out */}
                    </div>
                )}
            </div>
        </section>
    )
}
