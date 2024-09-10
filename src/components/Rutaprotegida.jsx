import React from 'react';
import {Navigate} from 'react-router-dom';

const Rutaprotegida = ({children}) => {

    const user = localStorage.getItem('usuario_id') || null

if(user){
     return children
}else{
    return <Navigate to='login' />
}
}

export default Rutaprotegida;