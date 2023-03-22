import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar.component';
function NewsApp() {
  const [newsSources, setNewsSources] = useState([]);
  const [sourceName, setSourceName] = useState('');
  const [error, setError] = useState(false);
  const [sourceId, setSourceId] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSource, setSelectedSource] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const udata = localStorage.getItem('user')
  const odata = JSON.parse(udata)


  useEffect(() => {
  axios.get('http://localhost:8000/api/getNewsApisources', {
    headers: {
      'Authorization': `Bearer ${odata.data.token}`
    }
  })
      .then(response => {
        // console.log("chabba test");
        console.log(response.data);
        setNewsSources(response.data);
        // setSourceId(response.data?.sources[0].id);
        //  setSourceName(response.data?.sources[0].name);
      })
      .catch(error => {
        console.error(error);
      });
     HandlebydefaultTop()
      
  }, []);

  const handleSourceChange = (event) => {
    const selectedSource = event.target.value.split(':');
    setSourceId(selectedSource[0].trim());
    setSourceName(selectedSource[1].trim());
    setSelectedSource(selectedSource[1].trim());
  axios.get('http://localhost:8000/api/getNewsApi', {   
    params: {
      q:searchKeyword,
      sources: selectedSource[1].trim(), 
      from:'',
      to:''
    }, 
  headers: {
          'Authorization': `Bearer ${odata.data.token}`
        }
      })
      .then(response => {
        console.log(response.data?.articles);
        setNews(response.data?.articles);
        setLoading(false);
        setError(false);

      })
      .catch(error => {
        setError(true);

        setLoading(false);
      });
  


  };

  const handleGetNews = () => {
    setLoading(true);
    setError(false);

  console.log(setSelectedSource)
    axios.get('http://localhost:8000/api/getNewsApi', {   
        params: {
          keyword:searchKeyword,
          sources: selectedSource, // Replace with the desired sources
          from:fromDate,
          to:toDate
        }, 
      headers: {
              'Authorization': `Bearer ${odata.data.token}`
            }
      })
      .then(response => {
        console.log(response.data?.articles);
        setNews(response.data?.articles);
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
        const selectedSource = event.target.value.split(':');
    setSourceId(selectedSource[0].trim());
    setSourceName(selectedSource[1].trim());
      };
    axios.get('http://localhost:8000/api/getNewsApi', {   
    headers: {
          'Authorization': `Bearer ${odata.data.token}`
        }
      })
      .then(response => {
        console.log(response.data?.articles);
        setNews(response.data?.articles);
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
     <select className="form-select" name="news_sources" id="news_sources" onChange={handleSourceChange}>
        <option value={`${sourceId} : ${sourceName}`}>{sourceName}</option>
        {newsSources?.map((newsSource, index) => (
          <option key={index} value={`${newsSource?.id} : ${newsSource?.name}`}>{newsSource?.name}</option>
        ))}
      </select>
    </div>
    <div className="col-md-12">
      <form>
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <label htmlFor="search-input" className="form-label">Search:</label>
            <input id="search-input" className="form-control" type="text" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} />
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <label htmlFor="from-date-input" className="form-label">From:</label>
            <input id="from-date-input" className="form-control" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label htmlFor="to-date-input" className="form-label">To:</label>
            <input id="to-date-input" className="form-control" type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
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
          {news.map((selectedNews, index) => !error ?(
            <article key={index} >
              <img src={selectedNews?.urlToImage} alt="" />
              <div className="text">
                <h1>{selectedNews?.title}</h1>
                <p style={{ fontSize: '14px' }}>
                  {selectedNews?.description}
                  <a href={selectedNews?.url} target="_blank">
                    <small>read more...</small>
                  </a>
                </p>
                <div style={{ paddingTop: '5px', fontSize: '12px' }}>Author: {selectedNews?.author ? selectedNews?.author : 'Unknown'}</div>
                {selectedNews?.publishedAt !== null ? (
                  <div style={{ paddingTop: '5px' }}>Date Published: {new Date(selectedNews?.publishedAt).toLocaleDateString()}</div>
                ) : (
                  <div style={{ paddingTop: '5px' }}>Date Published: Unknown</div>
                )}
              </div>


            </article>
          ):<p key={index}>No Data Exist </p>)}
        </section>
      </div>

    </div>

    </div>
    </div>
  );
}

export default NewsApp;