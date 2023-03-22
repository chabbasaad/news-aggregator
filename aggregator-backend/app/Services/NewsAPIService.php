<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;
class NewsAPIService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://newsapi.org/v2/',
        ]);
    }

    public function getTopHeadlines($params = [])
    {
      
        $category = isset($params['category']) ? $params['category'] : null;
        $source = isset($params['source']) ? $params['source'] : null;
        $params = array_merge(['apiKey' => config('services.newsapi.key')], $params);
    
        if ($category) {
            $params['category'] = $category;
        }
        
        if ($source) {
            $params['source'] = $source;
        }
    
        $response = $this->client->get('top-headlines', [
            'query' => [
                'apiKey' => config('services.newsapi.key'),
                'country' => 'us',
            ],
        ]);
    
        return json_decode($response->getBody(), true);
    }

    function getNews($keyword, $dateFrom, $dateTo, $source) {
        $response = $this->client->get('everything', [
            'query' => [
                'q' => $keyword,
                'from' => $dateFrom,
                'to' => $dateTo,
                'sources' => $source,
                'apiKey' => config('services.newsapi.key')
            ]       
        ]);
    
        return json_decode($response->getBody(), true);
    }

    

    public function getSources()
    {
        $response = Http::get('https://newsapi.org/v2/top-headlines/sources', [
            'apiKey' => config('services.newsapi.key')
        ]);

        if ($response->failed()) {
            abort(500, 'Failed to retrieve news sources.');
        }

        return $response->json()['sources'];
    }
}