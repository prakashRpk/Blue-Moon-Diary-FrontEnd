import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import Nav from './nav';
import '../Styles/analytics.css';
import Cal from '../Screens/calendar'

function Analytics() {

    return (
        <>
            <Nav />
            <Cal/>
        </>
    );
}
export default Analytics;