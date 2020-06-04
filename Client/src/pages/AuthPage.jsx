import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";

export const AuthPage = () => {
    const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log('data', data)
        } catch (e) {

        }
    }

    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>Shorten URL</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Login</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Your e-mail"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Your password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className='yellow-input'
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {/* стайл делать только в css, это учебная демонстрация */}
                        <button className='btn yellow darken-4'
                                style={{marginRight: 20}}
                                disabled={loading}>
                            Sign in
                        </button>
                        <button className='btn grey lighten-1 black-text'
                                onClick={registerHandler}
                                disabled={loading}>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};