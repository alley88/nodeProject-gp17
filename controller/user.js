//引入验证码依赖包
var svgCaptcha = require('svg-captcha');

const captch = (req,res) => {
   const captcha = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cc9966', // 验证码图片背景颜色
    })

    //captcha  是一个对象   {data:svg地址,text:验证码}；

    res.send(captcha)
}


module.exports = {
    captch
}