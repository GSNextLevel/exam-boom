import React, { useState } from 'react';

export default function SideMenu() {

    const [hover, setHover] = useState(false);
    
    const ulStyle = {
        listStyleType : 'none',
        backgroundColor : '#fff',
        width : '18vmin',
        padding : 0,
        margin : 0,
        position : 'fixed',
        boxShadow:"0 0 10px 0 rgb(0 0 0 / 20%)",
        height : '50%',
        overflow : 'auto',
        font: "initial",
        lineHeight: "normal",
        top: "auto",
        
    };
    const mainStyle = {
        textDecoration : 'none',
        display : 'block',
        color : '#000',
        padding : '8px 15px',
        fontWeight : 'bold',
        backgroundColor : 'tomato',
        color : '#fff'
    }
    const subStyle = {
        textDecoration : 'none',
        display : 'block',
        color : '#000',
        padding : '8px 15px',
        fontWeight : 'bold',
        cursor :'pointer',
        
        ...(hover ? {
            backgroundColor : '#333',
            color : '#fff'               
        } : null )
    }

    return (
      <div className="mt-4">
        <ul style={ulStyle}>
            <li>
                <a className="main" style={mainStyle}>신규 기능 메인</a>
            </li>
            <li>
                <a 
                href="/docs"
                style={subStyle}
                    className="sub1"
                    onMouseEnter={()=>{
                        setHover(true);
                        
                    }}
                    
                    onMouseLeave={()=>{
                        setHover(false);
                    }}
                >이동1(docs)</a>
            </li>

        </ul>
      </div>
    );
}


