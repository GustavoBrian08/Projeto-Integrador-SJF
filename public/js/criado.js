const inputFile = document.querySelector("#arquivo");
const pictureImage = document.querySelector(".arquivo__spam");

const pictureImageTxt = 'Enviar imagem';
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener('change', function(e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function(e) {
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;

            img.classList.add('arquivo__img');
            pictureImage.innerHTML = '';
            pictureImage.appendChild(img);
        })
        reader.readAsDataURL(file);
        window.console.log(file)
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }

})