import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { logout } from '../firebase';
import Header from '../components/Header';

const MainPage = () => {
    return (
        <div>
            <Header/>
            <div>Main</div>
        </div>
    );
}

export default MainPage;