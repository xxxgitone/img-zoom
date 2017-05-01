import ImgZoom from '../src/index'

const imgLinks = document.querySelectorAll('.imgList li a');
const zoomWrapper = document.querySelector('.zoomWrapper')
const img = zoomWrapper.querySelector('img');

//调用
new ImgZoom('.zoomWrapper');

// 自定义代码，用于切换图片
imgLinks.forEach((imgLink) => {
    imgLink.addEventListener('click', () => {
        let midSrc = imgLink.dataset.midsrc;
        img.setAttribute('src', midSrc);

        let bigSrc = imgLink.dataset.bigsrc;
        img.setAttribute('data-src', bigSrc)
    })
})

