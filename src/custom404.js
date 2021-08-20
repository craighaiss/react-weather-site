import React from "react";
import { useLocation } from "react-router-dom";

export function Custom404() {
    let location = useLocation();
    console.log(location);
    return (
        <section>
            <h2>404 - Resource not found at {location.pathname}</h2>
        </section>
    )
}
