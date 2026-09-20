import React from 'react'; import {useNavigate} from 'react-router-dom'; import Icon from './Icon';
export default function BackButton(){const nav=useNavigate();return <button className="backButton" onClick={()=>nav(-1)}><Icon name="arrowLeft" size={26} strokeWidth={2.5}/></button>}
