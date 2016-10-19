<?php

namespace App\Transformers;

use League\Fractal;
use App\Image;

class ImageTransformer  extends Fractal\TransformerAbstract
{
    /**
     * @param Image $image
     * @return array
     */
    public function transform(Image $image)
    {
        return [
            'id' => $image->id,
            'label' => $image->label,
            'src' => $image->src
        ];
    }
}