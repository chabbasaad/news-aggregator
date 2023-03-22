<?php

namespace App\Services;

use GuzzleHttp\Client;

class NewYorkTimesAPIService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.nytimes.com/svc/search/v2/',
        ]);
    }

    // public function getNews($keyword)
    // {
    //     $response = $this->client->get("articlesearch.json?fq=news_desk('Sports')", [
    //         'query' => [
    //             'q' => $keyword,
    //             'api-key' => config('services.nytimes.key')
    //         ]
    //     ]);

    //     return json_decode($response->getBody(), true);
    // }
    public function getSections()
    {

        $client = new Client([
            'base_uri' => 'https://api.nytimes.com/svc/news/v3/content/',
        ]);
        
        $response = $client->request('GET', 'section-list.json', [
            'query' => [
                'api-key' => config('services.nytimes.key')
            ]
        ]);
        
        $sources = json_decode($response->getBody(), true)['results'];
    }

    public function getNews($keyword, $source, $fromDate, $toDate)
{
    $params = [
        'q' => $keyword,
        'api-key' => config('services.nytimes.key')
    ];

    if ($source) {
        $params['fq'] = "news_desk:($source)";
    }

    if ($fromDate && $toDate) {
        $params['begin_date'] = str_replace('-', '', $fromDate);
        $params['end_date'] = str_replace('-', '', $toDate);
    }

    $response = $this->client->get('articlesearch.json', [
        'query' => $params
    ]);

    return json_decode($response->getBody(), true);
}
}