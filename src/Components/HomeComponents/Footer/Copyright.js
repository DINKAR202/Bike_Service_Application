import React from 'react';

const Copyright = () => {
    return (
        <div className="copyright">
            <small>Designed & Build by <a href="mailto:dinkar202@outlook.com" style={{color:'rgb(26 210 14)'}}>Dinkar Kumar</a></small> <br />
            <small>{(new Date()).getFullYear()} &copy; copyright | DINKAR</small> <br />
         </div>
    );
};

export default Copyright;