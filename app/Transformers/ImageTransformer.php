<?php

namespace App\Transformers;

use League\Fractal;
use App\Image;

class ImageTransformer  extends Fractal\TransformerAbstract
{
    /**
     * @param Number $number
     * @return array
     */
    public function transform(Number $number)
    {
        return [

        ];
    }
}