import { useState } from "react"
import { useNavigate } from "react-router"
import { ImgUploader } from "../cmps/ImgUploader"
import { login, signup } from "../store/actions/user.actions"


export function LoginSignup() {
    
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(true)
    const navigate = useNavigate()

    function loginOrSignup(ev){
        if (isSignup) onSignup(ev)
        else onLogin(ev)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }
    
    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username || !credentials.password || !credentials.fullname) return
        await signup(credentials)
        navigate('/home')
    }

    async function onLogin( ev ){
        if (ev) ev.preventDefault()
        
        if (!credentials.username || !credentials.password) return
        await login(credentials)
        navigate('/home')

    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <section className="login-signup">
            <form className="login-signup-form" onSubmit={loginOrSignup}>
                {isSignup &&
                <section className="login-signup-input">    
                    <label htmlFor="fullname">Full name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Enter your full name"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        />
                    </section>
                }
                <section className="login-signup-input">
                    <label htmlFor="username">User name</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={credentials.username}
                        placeholder="Enter your user name"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        />
                </section> 
                <section className="login-signup-input">
                    <label htmlFor="username">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={credentials.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                        autoComplete="off"
                        required
                    />
                </section>   

                {isSignup && <ImgUploader onUploaded={onUploaded} />}
                <button>{isSignup ? 'Signup' : 'Login'}</button>
            </form>

            {isSignup
                ? <h3>Already have an account? &nbsp; 
                    <span onClick={() => setIsSignup(false)}>Log in</span>
                </h3>
                : <h3>Don't have an account? &nbsp;
                    <span onClick={() => setIsSignup(true)}>Sign up</span>
                </h3>
            }
        </section>

    )
}