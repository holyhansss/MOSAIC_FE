import React, { useState, useEffect } from 'react';
import { query, getDocs, collection, orderBy, deleteDoc, setDoc, doc} from 'firebase/firestore';
import { dbService, auth } from '../../firebase.js';

function PostList() {

    const getLists = async() => {
        const likequ = query(collection(dbService,'weekly_report', id,'like'));
        const querySnapShot = await getDocs(likequ);
    }
    return (

    )
}