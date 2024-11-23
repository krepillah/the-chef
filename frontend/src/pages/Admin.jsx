import { useState, useEffect } from "react"
import AuthForm from "../components/AuthForm"
import Title from "../components/Title"
import AdminPanel from "../components/AdminPanel";

export default function Admin() {
    const [authorzsed, setAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        
        if (token) {
            fetch(`${process.env.REACT_APP_SERVER_URL}/verify-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Token validation failed');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Token is valid:', data);
                setAuthorized(true); 
            })
            .catch((error) => {
                console.error('Token validation failed:', error);
                sessionStorage.removeItem('token');
            });
        }
    }, []);

   return (
        (!authorzsed)?(
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
                <AdminPanel/>
            </>
        )
   ) 
}