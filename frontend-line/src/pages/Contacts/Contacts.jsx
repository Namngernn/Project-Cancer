import React from 'react'
import { Space, Typography} from 'antd';
const { Title, Text, Link} = Typography;
const Contacts = () => {
  return (
    <div>
      <div className='p-8 text-center'>
        <Title level={3}>ติดต่อ</Title>
        <Title level={5}>โรงพยาบาลมะเร็งชลบุรี</Title>
      </div>
      
      <div className='p-6 text-center'>
        <Space direction="vertical">
          <Text>038-455632-6</Text>
          <Text>ต่อ 19, 173 (เคมีบำบัด)</Text>
          <Text>ต่อ 169, 174 (รังสีรักษา)</Text>
          <Text>ต่อ 109, 102 (เภสัชกรรม)</Text>
          <Text>ต่อ 180 (โภชนาการ)</Text>
          <br/>
          <Text>ในวัน และ เวลาราชการ</Text>
          <Text>เวลา 8:00 - 16:00 น</Text>
        </Space>
      </div>

      <div className='p-6 text-center'>
          <Link href="เว้นไว้ก่อน">www.ccc.in.th</Link>
      </div>

    </div>

  )
}

export default Contacts