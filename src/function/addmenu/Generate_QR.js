import ReactDOM from 'react-dom';
import QR from 'qrcode.react';
// import {QRCodeSVG} from 'qrcode.react';
// import {QRCodeCanvas} from 'qrcode.react';

ReactDOM.render(
<QR
    id="qr-gen" // can identify 
    value={"https://www.naver.com"}
    renderAs='canvas'
    size={300}
    level={"H"}
    includeMargin={true}
    bgColor={'purple'}
    fgColor={'yellow'}
/>,
document.getElementById('mountNode')
);
