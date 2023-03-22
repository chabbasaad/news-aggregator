import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar.component';


function Guardian() {
  const [newsSources, setNewsSources] = useState([]);
  const [sourceName, setSourceName] = useState('');
  const [error, setError] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchSources, setsearchSources] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)


  useEffect(() => {
  axios.get('http://localhost:8000/api/getNewtimesApi', {
    headers: {
      'Authorization': `Bearer ${odata.data.token}`
    }
  })
      .then(response => {
console.log(response.data.response.docs);
       setNewsSources(response.data.response.docs);
        
      })
      .catch(error => {
        console.error(error);
      });
   
     
  }, []);

//   const handleSourceChange = (event) => {
//     const selectedSource = event.target.value;
//     setSelectedSource(selectedSource);
//     setSourceName(selectedSource);

//   const today = new Date();
// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const day = today.getDate();
// const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

// // console.log(formattedDate);
// console.log(searchKeyword)
// console.log(selectedSource)
// console.log(fromDate)
// console.log(toDate)
//   axios.get('http://localhost:8000/api/getGuardianApi', {   
//     params: {
//       keyword:searchKeyword,
//       sources:selectedSource, 
//       date:fromDate,
//       to:toDate
//     }, 
//   headers: {
//           'Authorization': `Bearer ${odata.data.token}`
//         }
//       })
//       .then(response => {
//         console.log(response.data.response.results);
//         setNews(response.data.response.results);
//         setLoading(false);
//         setError(false);

//       })
//       .catch(error => {
//         setError(true);

//         setLoading(false);
//       });
  


//   };

  const handleGetNews = () => {
    setLoading(true);
    setError(false);

  //console.log(selectedSource)
  console.log(searchKeyword)
    
        axios.get('http://localhost:8000/api/getNewtimesApi', {   
            params: {
                keyword:searchKeyword,
                sources:'The New York Times', 
                date:fromDate,
                to:toDate
              }, 
      headers: {
              'Authorization': `Bearer ${odata.data.token}`
            }
          })
      .then(response => {
        console.log(response.data.response.docs);
      setNews(response.data.response.docs);
     
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  const HandlebydefaultTop = () => {
    setLoading(true);
    const handleSourceChange = (event) => {
        const selectedSource = event.target.value;
  
      };
    axios.get('http://localhost:8000/api/getGuardianApi', {   
    headers: {
          'Authorization': `Bearer ${odata.data.token}`
        }
      })
      .then(response => {
        console.log(response.data.response.results);
      setNews(response.data.response.results);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
   
    <div className='App'>

    <div>
    <div>
          <Navbar />

         

  

      <section className="section-dropdown">
  <div className="row align-items-center">
    <div className="col-md-10 mb-3 mb-md-0">
      <p className="mb-0 select-header">Select a news source:</p>
     
{/*      
      <select className="form-select" name="news_sources" id="news_sources" onChange={handleSourceChange} required>
        {newsSources.map((newsSource, index) => (
            <option key={index} value={newsSource}>{newsSource}</option>
        ))}
       </select> */}
    </div>
    <div className="col-md-12">
      <form>
        <div className="row">
        <div className="col-md-4 mb-3 mb-md-0">
            <label htmlFor="search-input" className="form-label">Sources:</label>
            <input id="search-input" className="form-control" type="text" value={searchSources} onChange={e => setsearchSources(e.target.value)}  />
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <label htmlFor="search-input" className="form-label">Search:</label>
            <input id="search-input" className="form-control" type="text" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)}  />
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <label htmlFor="from-date-input" className="form-label">From:</label>
            <input id="from-date-input" className="form-control" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}  />
          </div>
          <div className="col-md-4">
            <label htmlFor="to-date-input" className="form-label">To:</label>
            <input id="to-date-input" className="form-control" type="date" value={toDate} onChange={e => setToDate(e.target.value)}  />
          </div>
        </div>
      </form>
    </div>
  </div>

  <button className="btn btn-primary mt-3" onClick={handleGetNews} disabled={loading}>{loading ? 'Loading...' : 'Get News'}</button>
</section>



      <div id="news">
        <p> News Source : {sourceName} </p>
        <section className="news">
        {news && news.map((selectedNews, index) => (
            <article key={index} >
            <img src={`https://static01.nyt.com/${selectedNews?.multimedia.find(media => media.subtype === "thumbnail")?.url}`} alt="" />
            <div className="text">
                <h1>{selectedNews?.headline.main}</h1>
                <p style={{ fontSize: '14px' }}>
                  {selectedNews?.lead_paragraph}
                  <a href={selectedNews?.web_url} target="_blank">
                    <small>read more...</small>
                  </a>
                </p>
                <div style={{ paddingTop: '5px', fontSize: '12px' }}>Author: {selectedNews?.byline.original ? selectedNews?.byline.original : 'Unknown'}</div>
                {selectedNews?.pub_date !== null ? (
                  <div style={{ paddingTop: '5px' }}>Date Published: {new Date(selectedNews?.pub_date).toLocaleDateString()}</div>
                ) : (
                  <div style={{ paddingTop: '5px' }}>Date Published: Unknown</div>
                )}
              </div>


            </article>
          ))}
        </section>
      </div>

    </div>

    </div>
    </div>
  );
}

export default Guardian;