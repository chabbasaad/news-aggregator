<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NewsAPIService;
use App\Services\GuardianAPIService;
use App\Services\NewYorkTimesAPIService;
use Carbon\Carbon;

class ArticleController extends Controller
{
    protected $newsAPI;
    protected $guardianAPI;
    protected $newYorkTimesAPI;

    public function __construct(NewsAPIService $newsAPI, GuardianAPIService $guardianAPI,NewYorkTimesAPIService $newYorkTimesAPI)
    {
        $this->newsAPI = $newsAPI;
        $this->guardianAPI = $guardianAPI;
        $this->newYorkTimesAPI = $newYorkTimesAPI;
    }


  
    public function getNewsApi(Request $request)
    {
        $datefrom = $request->date ? $request->date : '';
        $dateto = $request->to ? $request->to : '';
        $keyword = $request->keyword ? $request->keyword : '';
        $sources = $request->sources ? $request->sources : '' ;
       
      if (!$keyword && !$datefrom && !$dateto && !$sources) {
        $articles = $this->newsAPI->getTopHeadlines();
    } else {
        $articles = $this->newsAPI->getNews($keyword, $datefrom, $dateto,$sources);
    }

  
        return response()->json($articles);

    }


    public function getNewsApisources()
    {
        $articles = $this->newsAPI->getSources();
        return response()->json($articles);

    }

    

    public function getGuardianApi(Request $request)
    {
         $datefrom = $request->date ? $request->date : '';
        $dateto = $request->to ? $request->to : '';
       $keyword = $request->keyword ? $request->keyword : '';
        $sources = $request->sources ? $request->sources : '' ;
       
      if (!$keyword && !$datefrom && !$dateto && !$sources) {
        $articles = $this->guardianAPI->getTopHeadlines();
    } else {
      
    }

    $articles = $this->guardianAPI->getNews($keyword, $datefrom, $dateto,$sources);
        return response()->json($articles);

    }

    public function getGuardianApiSections()
    {
        $articles = $this->guardianAPI->getSections();
        return response()->json($articles);

    }


    public function getnewyorktimesApiSections()
    {
        $articles = $this->newYorkTimesAPI->getSections();
        return response()->json($articles);

    }

    public function getNewtimesApi(Request $request)
    {

        $datefrom = $request->date ? $request->date : '';
        $dateto = $request->to ? $request->to : '';
       $keyword = $request->keyword ? $request->keyword : '';
        $sources = $request->sources ? $request->sources : '' ;


        $articles = $this->newYorkTimesAPI->getNews($keyword, $datefrom, $dateto,$sources);
       
        return response()->json($articles);

    }



}
