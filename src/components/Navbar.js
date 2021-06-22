import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h2><Link to="/" >Xpeed Studio</Link></h2>
            <Link to="get-form">Create Record</Link>
        </nav>
    );
};

export default Navbar;