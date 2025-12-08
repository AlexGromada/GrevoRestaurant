import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm.jsx"

import "../styles/pages/authenticationPage.scss"
import { useState } from "react";


function AuthenticationPage() {
    const [form, setForm] = useState('login')

    return (
        <div className="authentication-page">
            <Header />

            <main className="form-container container">
                <div className="form-content content">
                    <LoginForm switchFunction={setForm} isVisible={form === "login" ? true : false} />
                    <RegisterForm switchFunction={setForm} isVisible={form === "register" ? true : false} />
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default AuthenticationPage;