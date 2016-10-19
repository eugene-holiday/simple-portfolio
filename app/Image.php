<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class Image extends Model
{
    protected $fillable = ['label'];

    protected $path = '/public/images';

    public function saveFile(UploadedFile $file)
    {
        $this->filename = $this->generateFileName($file);
        $file->move(public_path().$this->path, $this->filename);
    }

    public function generateFileName(UploadedFile $file)
    {
        return str_random(15) . '.' . $file->getClientOriginalExtension();
    }

    public function getSrcAttribute()
    {
        return $this->path . '/' . $this->filename;
    }
}
