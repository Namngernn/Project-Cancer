import React from 'react'
import { Typography, QRCode} from 'antd';
import { Link } from 'react-router-dom';

const { Text} = Typography;

const downloadQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = 'คู่มือผู้ป่วย';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const PatientManual = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center md:justify-center md:items-center">
      <div className='p-10 text-center sarabun-extralight '>
          <h1 >Cis CCRT Cervix</h1>
      </div>

      <div id="myqrcode" className="p-28 sm:p-4 pt-5 flex items-center justify-center flex-col space-y-10 ">       
        <QRCode
          value="https://drive.google.com/file/d/1ssgIGk7FjnMuzFrS8BiuSUVH13on5pfx/view?fbclid=IwZXh0bgNhZW0CMTAAAR1_bOycDLOfiNHFW46hZZJx5jJLHewXRN0G37Zf8uErLibonSHByPuR9fQ_aem_f-h_Hln_pba5uD6bYMoOPg"
          />
        <button type="primary" onClick={downloadQRCode} className='bt-blue'>ดาวน์โหลดข้อมูล</button>
      </div>

      <div className='p-20 pt-1 text-center flex flex-col space-y-10 sm:p-1'>
        <Link to={'/Contacts'}><Text>ติดต่อโรงพยาบาล</Text></Link>
      </div>
      </div>
    </div>
  )
}

export default PatientManual