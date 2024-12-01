import { useState, useEffect } from "react"
import AuthForm from "../components/AuthForm"
import Title from "../components/Title"
import AdminPanel from "../components/AdminPanel";
import { checkToken } from "../api";

export default function Admin({catalog}) {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        checkToken(setAuthorized);
    }, []);

   return (
        (!authorized)?(
            <>
                <Title
                    highlighted="Log in"
                />
                <AuthForm setAuthorized={setAuthorized}/>
            </>
        ):(
            <>
                <Title
                    title="Admin"
                    highlighted="panel"
                />
                <AdminPanel setAuthorized={setAuthorized} catalog={catalog}/>
            </>
        )
   ) 
}