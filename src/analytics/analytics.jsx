import { useState, useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
import Nav from '../nav/nav';
import './analytics.css';
import Cal from '../calendar/calendar'

function Analytics() {

    return (
        <>
            <Nav />
            <Cal/>
        </>
    );
}
export default Analytics;