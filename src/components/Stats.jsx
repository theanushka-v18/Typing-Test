import React, { useEffect } from 'react';
import Graph from './Graph';
import { auth, db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const Stats = ({wpm, accuracy, correctChars, wrongChars, missedChars, extraChars, graphData}) => {

    let timeSet = new Set();
    const newGraph = graphData.filter(i=>{
        if(!timeSet.has[i[0]]) {
            timeSet.add(i[0]);
            return i;
        }
    });

    const pushDataToDb = () => {

        if(isNaN(accuracy)) {
            toast.error('Invalid Test', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const resultsRef = db.collection('Results');
        const {uid} = auth.currentUser;
        resultsRef.add({
            wpm: wpm,
            accuracy: accuracy,
            timeStamp: new Date(),
            characters: `${correctChars}/${wrongChars}/${missedChars}/${extraChars}`,
            userId: uid
        }).then((res) => {
            toast.success('Data Saved to db', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            toast.error('Not able to save result', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })
    }

    useEffect(() => {
        if(auth.currentUser) {
            pushDataToDb();
        } else {
            toast.warning('Please Login to save results', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, []);

    return (
        <div className='stat-box'>
            <div className='left-stats'>
                <div className='title'>WPM</div>
                <div className='subtitle'>{wpm}</div>
                <div className='title'>Accuracy</div>
                <div className='subtitle'>{accuracy}</div>
                <div className='title'>Characters</div>
                <div className='subtitle'>{correctChars}/{wrongChars}/{missedChars}/{extraChars}</div>
            </div>
            <div className='right-stats'>
                <Graph graphData={newGraph} />
            </div>
        </div>
    )
}

export default Stats;