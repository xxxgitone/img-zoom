import { getElementLeft, getElementTop } from './util';

class ImgZoom {
    constructor (el, options = { zoomW: 420, zoomH: 420}) {
        
        let DEFAULT = {
            created: false,
            mouseleaved: true,
            zoomMask: null,
            zoomWindow: null
        }

        this.el = document.querySelector(el);
        this.opts = Object.assign({}, DEFAULT, options);
        this.offset = {
            left: getElementLeft(this.el),
            top: getElementTop(this.el)
        }
        this.img = this.el.querySelector('img');

        this.init();
    }

    init () {
        this.img.setAttribute('width', this.el.offsetWidth + 'px');
        this.addEvent();
    }


    addEvent () {
        this.el.addEventListener('mousemove', this.create.bind(this));
        this.el.addEventListener('mouseleave', this.leaveHandler.bind(this));
    }

    create () {
        if (!this.opts.created) {
            this.createMask();
            this.createZoomWindow();
        }

        let { img } = this.opts.zoomWindow;
        let src = img.getAttribute('src');
        

        if (this.getImgSrc() !== src) {
            this.createZoomWindow();
        }

        this.opts.created = true;

        if(this.opts.mouseleaved) {
            this.opts.zoomMask.classList.add('show');
            this.opts.zoomWindow.classList.add('windowShow');
            document.addEventListener('mousemove', this.moveHandler.bind(this));
            this.opts.mouseleaved = false;
        }
        
    }
    

    createMask () {
        let span = document.createElement('span');
        span.className = 'zoomMask';
        this.el.appendChild(span);

        this.opts.zoomMask = span;
    }

    
    getImgSrc () {
        return this.img.dataset.src;
    }

    createZoomWindow () {
        let div = document.createElement('div');
        div.className = 'zoomWindow';

        let { zoomW, zoomH } = this.opts;

        div.style.width = zoomW + 'px';
        div.style.height = zoomH + 'px';
        div.style.top = this.offset.top + 'px';
        div.style.left = this.offset.left + this.el.offsetWidth + 10 + 'px';


        this.el.appendChild(div);

        let img = new Image();
        let imgSrc = this.img.dataset.src;
        img.src = this.img.dataset.src;
        div.appendChild(img);

        this.opts.zoomWindow = div;
        this.opts.zoomWindow.img = img;
    }


    leaveHandler () {
        this.opts.zoomMask.classList.remove('show');
        this.opts.zoomWindow.classList.remove('windowShow');
        this.opts.mouseleaved = true;
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

        let { img } = this.opts.zoomWindow;

        let scale = img.offsetWidth / this.img.offsetWidth;
      
        let x = getElementLeft(this.opts.zoomMask) - this.offset.left - scale;
        let y = getElementTop(this.opts.zoomMask) - this.offset.top - scale;

        img.style.top = `-${y * scale}px`;
        img.style.left = `-${x * scale}px`;

    }
    
}

export default ImgZoom;