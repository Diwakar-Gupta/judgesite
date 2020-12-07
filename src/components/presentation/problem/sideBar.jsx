import React, { Component } from 'react'
import FileUpload from './fileUpload';

export default class SideBar extends Component {
    render() {
        return (
            <div className='p-2 '>
                <FileUpload/>
            </div>
        )
    }
}
