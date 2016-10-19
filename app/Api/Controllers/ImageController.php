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

    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function upload(Request $request)
    {
        if($request->hasFile('image')){
            $file = $request->file('image');
            $image = new Image($request->all());
            $image->saveFile($file);
            $image->save();
            return $this->response()->item($image, new ImageTransformer());
        } else {
            throw new ResourceException();
        }
    }

    /**
     * @param Request $request
     * @return \Dingo\Api\Http\Response
     */
    public function index(Request $request)
    {
        $images = Image::limit(20)->orderBy('created_at', 'DESC')->get();
        return $this->response()->collection($images, new ImageTransformer());
    }
}
