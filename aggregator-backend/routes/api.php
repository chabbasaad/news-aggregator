<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
  
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\ProductController;
  
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
  
  
Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});
        
Route::middleware('auth:sanctum')->group( function () {
    Route::post('/logout', [RegisterController::class, 'logout']);
    Route::put('/profile', [App\Http\Controllers\API\ProfileController::class, 'update']);
  
    // api articles : 
    // api Newsapi : 
    Route::get('/getNewsApi', [App\Http\Controllers\ArticleController::class, 'getNewsApi']);
    Route::get('/getNewsApisources', [App\Http\Controllers\ArticleController::class, 'getNewsApisources']);
    // api Gurdian Api : 
    Route::get('/getGuardianApiSections', [App\Http\Controllers\ArticleController::class, 'getGuardianApiSections']);
    Route::get('/getGuardianApi', [App\Http\Controllers\ArticleController::class, 'getGuardianApi']);

    Route::get('/getnewyorktimesApiSections', [App\Http\Controllers\ArticleController::class, 'getnewyorktimesApiSections']);
    Route::get('/getNewtimesApi', [App\Http\Controllers\ArticleController::class, 'getNewtimesApi']);
});

Route::middleware('auth:sanctum')->get('/profile', function (Request $request) {
    return  $request->user();
});

