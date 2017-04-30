import { getElementLeft, getElementTop } from './util';

const imgLinks = document.querySelectorAll('.imgList li a');
const zoomWrapper = document.querySelector('.zoomWrapper')
const img = zoomWrapper.querySelector('img');
const zoomWindow = document.querySelector('.zoomWindow');
const zWindowImg = zoomWindow.querySelector('img');

imgLinks.forEach((imgLink) => {
    imgLink.addEventListener('click', () => {
        let midSrc = imgLink.dataset.midsrc;
        img.setAttribute('src', midSrc);

        let bigSrc = imgLink.dataset.bigsrc;

        zWindowImg.setAttribute('src', bigSrc);
    })
})

// //移动
// const zoomMask = document.querySelector('.zoomMask');


// zoomWrapper.addEventListener('mouseover', () => {
//     zoomMask.classList.add('show');
//     zoomWindow.classList.add('windowShow');
// })

// zoomWrapper.addEventListener('mouseout', () => {
//     zoomMask.classList.remove('show');
//     zoomWindow.classList.remove('windowShow');
// })

// document.addEventListener('mousemove', (e) => {

    

//     zoomMask.style.top = (e.clientY - zoomMask.offsetHeight / 2) + 'px';
//     zoomMask.style.left = (e.clientX - zoomMask.offsetWidth / 2)  + 'px';



//     if (parseInt(zoomMask.style.left) <= getElementLeft(zoomWrapper)) {
//         zoomMask.style.left = getElementLeft(zoomWrapper) + 'px';
//     }
//     if (parseInt(zoomMask.style.top) <= getElementTop(zoomWrapper)) {
//         zoomMask.style.top = getElementTop(zoomWrapper) + 'px';
//     }
//     if (parseInt(zoomMask.style.top) >= (getElementTop(zoomWrapper) + zoomWrapper.offsetHeight - zoomMask.offsetHeight)) {
//         zoomMask.style.top = (getElementTop(zoomWrapper) + zoomWrapper.offsetHeight - zoomMask.offsetHeight) + 'px';
//     }

//     if (parseInt(zoomMask.style.left) >= (getElementLeft(zoomWrapper) + zoomWrapper.offsetWidth - zoomMask.offsetWidth)) {
//         zoomMask.style.left = (getElementLeft(zoomWrapper) + zoomWrapper.offsetWidth - zoomMask.offsetWidth) + 'px';
//     }

//     let bigImgPosLeft = parseInt(zoomMask.style.left) * 2;
//     let bigImgPosTop = parseInt(zoomMask.style.top) * 2; 

//     let x = getElementLeft(zoomMask) - getElementLeft(zoomWrapper) - 7;
//     let y = getElementTop(zoomMask) - getElementTop(zoomWrapper) - 7;
//     console.log(x, y);

//     zWindowImg.style.top = `-${y * 2.9}px`;
//     zWindowImg.style.left = `-${x * 2.9}px`;

// })


class ImgZoom {
    constructor (el, options ) {
        
        let DEFAULT = {
            created: false,
            zoomMask: null
        }

        this.el = document.querySelector(el);
        this.opts = Object.assign({}, DEFAULT, options);
        this.offset = {
            left: getElementLeft(this.el),
            top: getElementTop(this.el)
        }

        this.addEvent();
    }


    addEvent () {
        this.el.addEventListener('mousemove', this.createMask.bind(this));
        this.el.addEventListener('mouseleave', this.leaveHandler.bind(this));
    }
    

    createMask () {

        if (!this.opts.created) {
            let span = document.createElement('span');
            span.className = 'zoomMask';
            this.el.appendChild(span);


            this.opts.created = true;
            this.opts.zoomMask = span;
            
        }

        this.opts.zoomMask.classList.add('show');
        
        document.addEventListener('mousemove', this.moveHandler.bind(this))
    }



    leaveHandler () {
        this.opts.zoomMask.classList.remove('show');
    }

    moveHandler (e) {
        let zoomMask = document.querySelector('.zoomMask');
        zoomMask.style.top = (e.clientY - zoomMask.offsetHeight / 2) + 'px';
        zoomMask.style.left = (e.clientX - zoomMask.offsetWidth / 2)  + 'px';
        let boundY = this.offset.top + this.el.offsetHeight - zoomMask.offsetHeight;
        let boundX = this.offset.left + this.el.offsetWidth - zoomMask.offsetWidth;

        if (parseInt(zoomMask.style.left) <= this.offset.left) {
            zoomMask.style.left = this.offset.left + 'px';
        }
        if (parseInt(zoomMask.style.top) <= this.offset.top) {
            zoomMask.style.top = this.offset.top + 'px';
        }
        if (parseInt(zoomMask.style.top) >= boundY) {
            zoomMask.style.top = boundY + 'px';
        }

        if (parseInt(zoomMask.style.left) >= boundX) {
            zoomMask.style.left = boundX + 'px';
        }
    }
    
}

new ImgZoom('.zoomWrapper');


