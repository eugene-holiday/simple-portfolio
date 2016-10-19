<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

         <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>
        <div class="main container">
            <div class="control-block row">
                <div class="col-sm-3">
                    <form id="image-upload-form">
                        <div class="form-group">
                            <input type="text" name="label" class="form-control" id="imageName" placeholder="Название изображения">
                        </div>
                        <div class="form-group">
                            <input type="file" name="image" id="input-image">
                        </div>
                        <button type="submit" id="image-upload-button" class="btn btn-primary">Загрузить фотографию</button>
                    </form>
                </div>

                <div class="col-sm-6 col-md-offset-3 right-control">
                    <button type="button" class="btn btn-primary pull-right-sm" style="margin-bottom:4px;white-space: normal;">Покажите мне случайное изображение</button>
                </div>
            </div>

            <div class="images row">

            </div>

            <template data-template="image-template">
                <div class="image-container col-xs-6 col-sm-4 col-md-3 col-lg-2">
                    <div class="image">
                    </div>
                    <p class="image-label">Label</p>
                </div>
            </template>


        </div> <!-- /container -->
        <script type="text/javascript" src="/js/app.js"></script>
    </body>
</html>
