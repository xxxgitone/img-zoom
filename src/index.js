const imgLinks = document.querySelectorAll('.imgList li a');
const zoomWrapper = document.querySelector('.zoomWrapper')
const img = zoomWrapper.querySelector('img');
const zoomWindow = document.querySelector('.zoomWindow');

imgLinks.forEach((imgLink) => {
    imgLink.addEventListener('click', () => {
        let midSrc = imgLink.dataset.midsrc;
        img.setAttribute('src', midSrc);

        let bigSrc = imgLink.dataset.bigsrc;

        zoomWindow.style.backgroundImage = 'url(' + bigSrc +')';
    })
})

//移动
const zoomMask = document.querySelector('.zoomMask');

//获取元素的绝对横坐标
function getElementLeft(element){
　　var actualLeft = element.offsetLeft;
　　var current = element.offsetParent;

    while (current !== null){
　　　　actualLeft += current.offsetLeft;
　　　　current = current.offsetParent;
　　}

　　return actualLeft;
}

//获取元素的绝对纵坐标
　function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}

　　　　return actualTop;
　　}

zoomWrapper.addEventListener('mouseover', () => {
    zoomMask.classList.add('show');
    zoomWindow.classList.add('windowShow');
})

zoomWrapper.addEventListener('mouseout', () => {
    zoomMask.classList.remove('show');
    zoomWindow.classList.remove('windowShow');
})

document.addEventListener('mousemove', (e) => {

    

    zoomMask.style.top = (e.clientY - zoomMask.offsetHeight / 2) + 'px';
    zoomMask.style.left = (e.clientX - zoomMask.offsetWidth / 2)  + 'px';



    if (parseInt(zoomMask.style.left) <= getElementLeft(zoomWrapper)) {
        zoomMask.style.left = getElementLeft(zoomWrapper) + 'px';
    }
    if (parseInt(zoomMask.style.top) <= getElementTop(zoomWrapper)) {
        zoomMask.style.top = getElementTop(zoomWrapper) + 'px';
    }
    if (parseInt(zoomMask.style.top) >= (getElementTop(zoomWrapper) + zoomWrapper.offsetHeight - zoomMask.offsetHeight)) {
        zoomMask.style.top = (getElementTop(zoomWrapper) + zoomWrapper.offsetHeight - zoomMask.offsetHeight) + 'px';
    }

    if (parseInt(zoomMask.style.left) >= (getElementLeft(zoomWrapper) + zoomWrapper.offsetWidth - zoomMask.offsetWidth)) {
        zoomMask.style.left = (getElementLeft(zoomWrapper) + zoomWrapper.offsetWidth - zoomMask.offsetWidth) + 'px';
    }

    // let bigImgPosLeft = parseInt(zoomMask.style.left) * 2;
    // let bigImgPosTop = parseInt(zoomMask.style.top) * 2; 

    let x = getElementLeft(zoomMask) - getElementLeft(zoomWrapper)
    let y = getElementTop(zoomMask) - getElementTop(zoomWrapper)
    console.log(x, y);

    if(x === 0 && y === 0) {
        zoomWindow.style.backgroundPosition = '0px 0px';
    } else if(x > 0 && y > 0) {
        zoomWindow.style.backgroundPosition = -x *3 + 'px, ' + -y * 3 + 'px'
    }

    


})
