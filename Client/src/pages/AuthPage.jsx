import React from 'react';

export const AuthPage = () => {
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
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {/* стайл делать только в css, это учебная демонстрация */}
                        <button className='btn yellow darken-4' style={{marginRight: 20}}>Sign in</button>
                        <button className='btn grey lighten-1 black-text'>Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
};