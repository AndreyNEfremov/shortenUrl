import React from 'react';
import {Link} from "react-router-dom";

export const LinksList = ({links}) => {
    if (!links.length) {
        return <p className='center'>There are not any links</p>
    }

    return (
        <table>
            <thead>
            <tr>
                <th>№</th>
                <th>Source</th>
                <th>Shorten</th>
                <th>Open it</th>
            </tr>
            </thead>

            <tbody>
            {links.map(link, index => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
};