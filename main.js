let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let reset = document.getElementById('reset');
let img = document.getElementById("img");
let imgBox = document.querySelector(".image-box");
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');



function resetValue(){
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}

window.onload = function(){
    download.classList.add('d-none');
    reset.classList.add('d-none');
}

upload.addEventListener('change', function(){
    download.classList.remove('d-none');
    reset.classList.remove('d-none');
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = file.result
    }
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display = 'none'
    }
    resetValue()
})

let filters = document.querySelectorAll(".filter input")
filters.forEach( filter => {
    filter.addEventListener('input', function(){
        context.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)

        `
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    })
})

reset.addEventListener('click',function(){
    resetValue()
})

download.addEventListener("click", function(){
    download.href = canvas.toDataURL();
})