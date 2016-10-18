<?php

namespace App\Api\Controllers;

use App\Image;
use App\Transformers\ImageTransformer;
use Dingo\Api\Exception\ResourceException;
use Dingo\Api\Routing\Helpers;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ImageController extends Controller
{
    use Helpers;

    public function upload(Request $request)
    {
        if($request->hasFile('image')){
            $file = $request->file('image');
            $image = new Image($request->all());
            $image->saveFile($file);
            $image->save();
            return $this->response()->created();
        } else {
            throw new ResourceException();
        }


    }

}
