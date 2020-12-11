import React from 'react'
import ReactHtmlParser from 'react-html-parser';

export default function renderProblem(props) {
    return (
        <div className={props.className || ''}>{ ReactHtmlParser(props.problembody) }</div>
    )
}
