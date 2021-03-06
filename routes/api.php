<?php

use Illuminate\Http\Request;

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

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {
    $api->post('images/upload', 'App\Api\Controllers\ImageController@upload');
    $api->get('images/', 'App\Api\Controllers\ImageController@index');
    $api->get('images/random', 'App\Api\Controllers\ImageController@random');
});