/**
 * Created by LiYonglei on 2016/12/17.
 */
/*
 * 这个简易方法实现了自适应于移动端的最基本页面适配,目的除了直接拿来使用以外,最关键的是根据里面的简单代码和注释了解移动端适配的原理和基本方法
 * 该方法请在确保body元素已被渲染后再调用
 * 使用该方法适配后的页面中的元素请尽量不要使用px单位(因为牵扯到缩放),除非你真的完全明白自己的意图.
 * 对于字体大小的设置请使用em单位
 * */
function mobile_flexible(designWidth,designFontSize){
    /*
     * 设计图中标记的宽度,默认值是750
     * */
    designWidth=designWidth||750;
    /*
     * 设计图中的正文中的字体大小,默认值为16
     * */
    designFontSize=designFontSize||16;
    /*
     * 根据当前设备的像素比dpr来获取缩放的比例(像素比指的是当前设备实际的物理像素与逻辑像素(css像素)之间的比例)
     * */
    var scale=1/window.devicePixelRatio;
    /*
     * 创建或获取一个viewport的meta标签
     * */
    var viewport=document.querySelector("meta[name=viewport]")||document.createElement("meta");
    viewport.setAttribute("name","viewport");
    /*
     * 根据像素比进行页面缩放,使得viewport缩放后的物理像素宽度恰恰等于屏幕的物理像素宽度.注意的是viewport的逻辑像素大小还是未缩放时候的像素大小,只是对每个像素进行了拉伸或缩放操作
     * width=device-width :viewport的逻辑像素大小等于设备的屏幕的逻辑像素大小.这个值实际上可以不用设置,因为不设置时后面进行缩放操作时会自动的将viewport的像素大小认为是屏幕的逻辑像素大小然后按照该逻辑像素值进行缩放
     * user-scalable=no:不允许用户手动缩放
     * */
    viewport.setAttribute("content","width=device-width,initial-scale="+scale+",maximum-scale="+scale+",minimum-scale="+scale+", user-scalable=no");
    document.head.appendChild(viewport);
    /*
     * 设置根元素的font-size.
     * 因为整个项目使用rem作为长度单位.因此要设置根元素的font-size.
     * 根元素的font-size(也是rem)的值为viewport的逻辑像素值除以设计稿的宽度再乘以100.
     * step1:viewport的逻辑像素除以设计稿的宽度像素是为了直接使用设计稿标注的元素的像素大小 比如 设计稿的宽度为750px；某个元素的宽度为375px；那么这个元素的宽度写法是3.75rem(不是375rem的原因是因为下一步)
     * step2:然后乘以100是为了让根元素的font-size(rem)的值是上面计算比例的100倍,这样做的原因是chrome等浏览器对于font-size的大小只能认识12px及以上像素,而上面步骤的比值往往是小于12px的.
     * */
    document.documentElement.style.fontSize=100*document.documentElement.clientWidth/designWidth+"px";
    /*
     * 给根元素设置一个自定义属性dpr,其值为像素比
     * 这个属性是为了为某些元素(如option)设置css或者其他一些需要
     * */
    document.documentElement.dataset.dpr=window.devicePixelRatio;
    /*
     * 为body设置font-size
     * 因为虽然页面进行了缩放,但是我们显然希望用户看到的字体的大小依然是设计稿中字体的大小,
     * 这时候我们就需要对设计稿中的字体大小根据像素比来缩放(与viewport中scale的缩放恰恰相反,这样两个缩放一抵消，用户看到的大小就恰好就是设计稿中字体大小(尽管字体的逻辑像素已经被改变了))
     * */
    document.body.style.fontSize=designFontSize*window.devicePixelRatio+"px";
}
