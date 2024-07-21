import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AutoComplete, Input, Checkbox } from 'antd';
import { createFeedbackHNAppoint_no } from '../../api/feedback';
const { TextArea } = Input;

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const AddEffects = () => {
  // textarea

  const [options, setOptions] = useState([]);
  const handleSearch = (value) => {
    setOptions(
      !value
        ? []
        : [
            {
              value,
            },
            {
              value: value + value,
            },
            {
              value: value + value + value,
            },
          ],
    );
  };
  const handleKeyPress = (ev) => {
    console.log('handleKeyPress', ev);
  };
  const onSelect = (value) => {
    console.log('onSelect', value);
  };

  const handleSubmit = () =>{
    createFeedbackHNAppoint_no('000001', 1, 'สวัสดีจ้า', '2024-04-29 08:00:00').then(
      (response) => {
        alert(response.data)
      }
    );
  };

  return (
    <div className='p-4'>
      <div className="flex flex-col md:justify-center md:items-center">
      <h2 className='pb-4'>ผลข้างเคียง</h2>
      <div className="flex flex-col space-y-4">
        <Checkbox onChange={onChange} className=''>กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ</Checkbox>
        <Checkbox onChange={onChange} className=''>เยื่อบุปากอักเสบ</Checkbox>
        <Checkbox onChange={onChange} className=''>ผมร่วง/ ผมบาง</Checkbox>
        <Checkbox onChange={onChange} className=''>อ่อนเพลีย / ครั่นเนื้อครั่นตัว</Checkbox>
        <Checkbox onChange={onChange} className=''>ผิวหนังสีเข้มขึ้น</Checkbox>
        <Checkbox onChange={onChange} className=''>ใจสั่น / หอมเหนื่อยง่าย</Checkbox>
        <Checkbox onChange={onChange} className=''>กระเพาะปัสสาวะอักเสบ</Checkbox>
        <Checkbox onChange={onChange} className=''>อื่นๆ โปรดระบุ</Checkbox>
        <AutoComplete className='ml-5 mt-2'
      options={options}
      style={{
        width: 200,
      }}
      onSelect={onSelect}
      onSearch={handleSearch}
    >
      <TextArea
        placeholder="โปรดระบุผลข้างเคียง"
        className="custom"
        style={{
          height: 50,
        }}
        onKeyPress={handleKeyPress}
      />
    </AutoComplete>
      </div>
      {/* ปุ่ม บันทึกผลข้างเคียง */}
      <div className="flex flex-col md:justify-center md:items-center">
        <button onClick={handleSubmit} className='bt-blue mt-20'>บันทึกผลข้างเคียง</button>
      </div>
      
      
      
      </div>
    </div>
  )
}

export default AddEffects