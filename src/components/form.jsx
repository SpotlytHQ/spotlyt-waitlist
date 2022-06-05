import React, { useRef, useState } from "react";
import { ReactComponent as Line } from "../assets/line.svg";
import { ReactComponent as Burst } from "../assets/burst.svg";
import {supabase} from "../_supabase";

export default function Form() {

    const emailRef = useRef()
    const [requestAccess, setRequestAccess] = useState('Request Access');
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;

    const [alert, setAlert] = useState(["", ""]);

    const addEmail = async (e) => {
        e.preventDefault()
        setRequestAccess("Saving...")
        // Gets email input value
        const email = emailRef.current.value.trim().toLowerCase()

        if(email != ""){

            if (emailPattern.test(email)) {
                var { data, error } = await supabase
                .from('Waitlist')
                .select("*")
                .eq("email", email);

                if(data.length == 0 && error == null) {
                    // Adds email to database
                    var { data, error } = await supabase
                    .from('Waitlist')
                    .insert([
                        { "email": email }
                    ])
                    setAlert(["Congratulations, you are on the waitlist now.", "suc"])

                }else {
                    setAlert(["Seems you're on the list already.", "info"])
                }
            } else {
                setAlert(["Please enter a valid email address.", "err"])
            }

        } else {
            setAlert(["Please enter a valid email address.", "err"])
        }
        
        setRequestAccess("Request Access")
    }

    return (
        <div htmlFor="content">
            <div htmlFor="text">
                <h1>Build your <span className="green">search infrastructure</span> in&nbsp; 
                <em className="underlined">
                    minutes.
                    <Line /></em>
                </h1>
                <p>
                    Hosted full-text and faceted search engine capable of delivering realtime results from every keystroke.
                </p>
                <p htmlFor="tagline"><small>BUILD FAST. BUILD SMART.</small></p>
                <div htmlFor="features">
                    <div>
                        <div>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span>Easy migration</span>
                    </div>
                    <div>
                        <div>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span>Type Tolerance</span>
                    </div>
                    <div>
                        <div>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span>Synonyms</span>
                    </div>
                    <div>
                        <div>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span>Multiple Indices</span>
                    </div>
                    <div>
                        <div>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span>Facets and Grouping</span>
                    </div>
                    <div>
                        <div>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span>Unparalleled Speed</span>
                    </div>
                </div>
            </div>
            <div htmlFor="form">
                <h2>
                    <Burst />
                    Get early access
                    <Burst />
                </h2>
                <form onSubmit={addEmail}>
                    <div className="msg" htmlFor={alert[1]}>{alert[0]}</div>
                    <input type="email" ref={emailRef} placeholder="Email address"/>
                    <button type="submit">{requestAccess}</button>
                </form>
            </div>
        </div>
    )
}