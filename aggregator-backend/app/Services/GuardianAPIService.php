<?php

namespace App\Services;

use GuzzleHttp\Client;

class GuardianAPIService
{
    protected $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://content.guardianapis.com',
        ]);
    }

    public function getTopHeadlines()
    {
        
        $client = new Client();
        $response = $client->request('GET', 'https://content.guardianapis.com/search', [
            'query' => [
                'q' => '',
                'page-size' => 200,
                'show-fields' => 'all',
                'show-elements'=> 'image',
                'api-key' => config('services.guardianapi.key')
            ]
        ]);
    
        return json_decode($response->getBody(), true);
    }


    
    
    function getNews($keyword, $dateFrom, $dateTo, $source) {
     
        $client = new Client();
        $response = $client->request('GET', 'https://content.guardianapis.com/search', [
            'query' => [
                'q' => $keyword,
                'section' => $source,
                'from-date' => $dateFrom,
                 'to-date' => $dateTo,
                 'show-fields'=> 'byline,thumbnail',
                'api-key' => config('services.guardianapi.key')
            ]
        ]);
    
        return json_decode($response->getBody(), true);
    }

    public function getSections()
    {
        $client = new Client();
        $response = $client->request('GET', 'https://content.guardianapis.com/sections', [
            'query' => [
                'api-key' => config('services.guardianapi.key'),
                'show-fields' => 'all'
            ]
        ]);

        $sections = json_decode($response->getBody(), true)['response']['results'];

        $sectionNames = [];
        foreach ($sections as $section) {
            array_push($sectionNames, $section['webTitle']);
        }

        return response()->json($sectionNames, 200);
    }
}