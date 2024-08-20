import React from 'react'
import { Button, message, Space, Mentions, Input} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);

const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const PostponeAppointment = () => {
  const { token } = theme.useToken();
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const wrapperStyle = {
    width: 300,
    border: `2px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  // ปุ่มยืนยันเลื่อนวันนัด
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi
      .open({
        type: 'loading',
        content: 'กำลังดำเนินการเลื่อนวันนัดหมาย...',
        // duration: 2.5,
      })
      .then(() => message.success('เลื่อนวันนัดหมายสำเร็จ', 2.5))
      // .then(() => message.info('Loading finished', 2.5));
  };


  return (
    <div>
      <div className="flex flex-col items-center justify-center md:justify-center md:items-center">
      {/* วันนัดข้างบน */}
      <div className='px-12 pt-10 flex flex-col w-full md:w-1/3'>
          <div className="mb-4">
            <h1 className='text-xl'>นัดหมายเดิม</h1>
            <h3 className='text-sm'>วันที่ 7 มกราคม 2567 9:00</h3>
          </div>
          <div className="">
            <h1 className='text-xl'>นัดหมายใหม่</h1>
            <h3 className='text-sm'>เลือกวันที่ต้องการ</h3>
           </div>
      </div>

      {/* Calendar */}
      <div className='p-10 pt-3 flex flex-col space-y-10 '>  
        <div style={wrapperStyle}>
          <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];
              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }
              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className="month-item">
                    {months[i]}
                  </Select.Option>,
                );
              }
              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }
              return (
                <div
                  style={{
                    padding: 8,
                  }}
                >
                  <Typography.Title level={4}>ปฏิทิน</Typography.Title>
                  <Row gutter={8}>
                    <Col>
                      <Radio.Group
                        size="small"
                        onChange={(e) => onTypeChange(e.target.value)}
                        value={type}
                      >
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        value={year}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
            onPanelChange={onPanelChange}
          />
        </div>
      
      
      {/* ระบุรายละเอียด */}      
         <Space direction="vertical">
            <Mentions 
               placeholder="เหตุผล"
               autoSize style={{ width: '100%', }}
               options={[{value: 'afc163',label: 'afc163',},{value: 'zombieJ',label: 'zombieJ',},{value: 'yesmeck',label: 'yesmeck',},]} />

            {/* <Mentions 
               placeholder="ระบุเบอร์โทรศัพท์"
               autoSize style={{ width: '100%', }}
               options={[{value: 'afc163',label: 'afc163',},{value: 'zombieJ',label: 'zombieJ',},{value: 'yesmeck',label: 'yesmeck',},]} /> */}

            <Input showCount maxLength={10} onChange={onChange} placeholder="หมายเลขโทรศัพท์"/>

            <Mentions 
               placeholder="ระบุอีเมลล์"
               autoSize style={{ width: '100%', }}
               options={[{value: 'afc163',label: 'afc163',},{value: 'zombieJ',label: 'zombieJ',},{value: 'yesmeck',label: 'yesmeck',},]} />
         </Space>

      {/* ปุ่มยืนยันเลื่อนวันนัด */}
        {contextHolder}
        <button onClick={success} className='bt-blue'>ยืนยันการเลื่อนการนัดหมาย</button>
      </div>
      </div>
    </div>
  );
};





export default PostponeAppointment