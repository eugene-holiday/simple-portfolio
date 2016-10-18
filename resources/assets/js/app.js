
//require('./bootstrap');

//Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });
import $ from "jquery";

const app = function () {


    function init() {
        initUploadForm();
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
            }).done(() => {
                alert( "success" );
            }).fail(() => {
                alert( "error" );
            }).always(() => {
                uploadButton.innerHTML = buttonText;
            });
        }
    }

    init();
};

app();