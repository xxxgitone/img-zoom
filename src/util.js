//获取元素的绝对横坐标
export const getElementLeft = (element) => {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent;

    while (current !== null){
　　　　actualLeft += current.offsetLeft;
　　　　current = current.offsetParent;
　　}

　　return actualLeft;
}

//获取元素的绝对纵坐标
export const getElementTop = (element) => {
　let actualTop = element.offsetTop;
　let current = element.offsetParent;

　　　while (current !== null){
　　　　　actualTop += current.offsetTop;
　　　　　current = current.offsetParent;
　　　}

　　　return actualTop;
　}