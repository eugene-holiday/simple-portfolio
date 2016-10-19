
//require('./bootstrap');

//Vue.component('example', require('./components/Example.vue'));

// const app = new Vue({
//     el: '#app'
// });
import $ from "jquery";

const app = function () {

    let images = [];
    let process = false;

    let limit = 10;
    let offset = 0;

    function init() {
        initUploadForm();
        getImages();
        initScroll();
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
                offset += 1;
            }).fail(() => {
                alert( "error" );
            }).always(() => {
                uploadButton.innerHTML = buttonText;
            });
        }
    }

    function getImages() {
        if(!process) {
            process = true;
            $.ajax({
                url: '/api/images/',
                type: 'GET',
                data: {
                    limit: limit,
                    offset: offset
                }
            }).done((response) => {
                let imagesResponse = response.data;
                imagesResponse = inSecondOnly(images, imagesResponse);
                offset += imagesResponse.length;
                imagesResponse.forEach((image) => {
                    document.querySelector('.images').appendChild(imageTemplate(image));
                });
            }).fail(() => {
                alert("error");
            }).always(() => {
                process = false;
                if ($(".main").height() < $(window).height() + 50) {
                    getImages();
                }
            });


        }

    }

    function imageTemplate(image) {
        let template = document.querySelector("[data-template=image-template]").content.cloneNode(true);
        template.querySelector('.image').style.backgroundImage = "url(" + image.src + ")";
        template.querySelector('.image-label').innerHTML = image.label;
        return template;
    }

    function initScroll() {
        $(window).scroll(function () {
            if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                getImages()
            }
        });
    }

    function operation(list1, list2, operationIsUnion) {
        var result = [];

        for (var i = 0; i < list1.length; i++) {
            var item1 = list1[i],
                found = false;
            for (var j = 0; j < list2.length; j++) {
                if (item1.userId === list2[j].userId) {
                    found = true;
                    break;
                }
            }
            if (found === operationIsUnion) {
                result.push(item1);
            }
        }
        return result;
    }

    function inFirstOnly(list1, list2) {
        return operation(list1, list2, false);
    }

    function inSecondOnly(list1, list2) {
        return inFirstOnly(list2, list1);
    }

    function hasScrollbar(){

        if (typeof window.innerWidth === 'number')
            return window.innerWidth > document.documentElement.clientWidth;

        var rootElem = document.documentElement || document.body;

        var overflowStyle;

        if (typeof rootElem.currentStyle !== 'undefined')
            overflowStyle = rootElem.currentStyle.overflow;

        overflowStyle = overflowStyle || window.getComputedStyle(rootElem, '').overflow;

        var overflowYStyle;

        if (typeof rootElem.currentStyle !== 'undefined')
            overflowYStyle = rootElem.currentStyle.overflowY;

        overflowYStyle = overflowYStyle || window.getComputedStyle(rootElem, '').overflowY;

        var contentOverflows = rootElem.scrollHeight > rootElem.clientHeight;
        var overflowShown    = /^(visible|auto)$/.test(overflowStyle) || /^(visible|auto)$/.test(overflowYStyle)
        var alwaysShowScroll = overflowStyle === 'scroll' || overflowYStyle === 'scroll';

        return (contentOverflows && overflowShown) || (alwaysShowScroll);
    }

    init();
};

app();