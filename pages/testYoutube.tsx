import React, { useState } from 'react';
import axios from 'axios';
import { searchYoutube } from '@/service/userService';
require('dotenv').config();

const TestYoutube: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    // const handleSearch = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5686/youtube-premium/songs', {
    //             params: {
    //                 searchString: query,
    //                 page: 1,
    //                 pageSize: 5,
    //             },
    //         });
    //         setResults(response.data.result.songs);
    //     } catch (error) {
    //         console.error('Error fetching data from YouTube API', error);
    //     }
    // };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>YouTube Search</h1>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search YouTube"
                    style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc', outlineStyle: 'none' }}
                />
                <button
                    onClick={() => searchYoutube(query, 1, 5)} style={{ padding: '10px', marginLeft: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007BFF', color: 'white' }}>
                    Search
                </button>
            </div>
            <div style={{ marginTop: '20px', width: '80%' }}>
            {results.map((item) => (
                <div key={item.trackUrl} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <h3>{item.bonusData}</h3>
                    <p>{item.fullName}</p>
                    <iframe
                        width="720"
                        height="480"
                        // src={`https://www.youtube.com/embed/${item.trackUrl.split('v=')[1]}`}
                        src={`${item.trackUrlNoCookie}`}
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={item.bonusData}
                    ></iframe>
                </div>
))}
            </div>
        </div>
    );
};

export default TestYoutube;

