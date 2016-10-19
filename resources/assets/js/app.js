
//require('./bootstrap');

//Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });
import $ from "jquery";

const app = function () {

    let images = [];

    function init() {
        initUploadForm();
        initImagesRow();
        console.log('init app');
    }

    function initUploadForm() {
        let form = document.getElementById('image-upload-form');
        let fileSelect = document.getElementById('input-image');
        let uploadButton = document.getElementById('image-upload-button');

        form.onsubmit = function(event) {
            event.preventDefault();
            let buttonText = uploadButton.innerHTML;
            uploadButton.innerHTML = 'Загрузка...';
            let files = fileSelect.files;
            let formData = new FormData(form);
            $.ajax({
                url: '/api/images/upload',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false
            }).done((response) => {
                let image = response.data;
                let section = document.querySelector('.images');
                section.insertBefore( imageTemplate(image), section.firstChild );
            }).fail(() => {
                alert( "error" );
            }).always(() => {
                uploadButton.innerHTML = buttonText;
            });
        }
    }

    function initImagesRow() {
        $.ajax({
            url: '/api/images/',
            type: 'GET'
        }).done((response) => {
            images = response.data;
            images.forEach((image) => {
                document.querySelector('.images').appendChild(imageTemplate(image));
            });
        }).fail(() => {
            alert( "error" );
        });


    }

    function imageTemplate(image) {
        let template = document.querySelector("[data-template=image-template]").content.cloneNode(true);
        template.querySelector('.image').style.backgroundImage = "url(" + image.src + ")";
        template.querySelector('.image-label').innerHTML = image.label;
        return template;
    }

    init();
};

app();