<template>
  <div class="row g-0 text-center">
    <nav style="background-color: #1c2939">
      <div class="container">
        <div class="row">
          <div class="col-9">
            <ul class="nav nav-underline">
              <li
                v-if="user.type == 'nurse'"
                class="nav-item"
                @click="goToRegis()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  style="color: #ffffff; font-size: large"
                  >ลงทะเบียนผู้ป่วย</a
                >
              </li>
              <li
                class="nav-item"
                @click="goTonewHome()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">ผลเลือด</a>
              </li>
              <li
                class="nav-item"
                @click="goTonewAppoint()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">นัดหมาย</a>
              </li>

              <li
                class="nav-item"
                @click="goToPatient()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">ประวัติการรักษา</a>
              </li>
              <li
                class="nav-item"
                @click="goToMedFor()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">สูตรยาเคมีบำบัด</a>
              </li>
              <li
                class="nav-item"
                @click="goToguideBook()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">คู่มือผู้ป่วย</a>
              </li>
            </ul>
          </div>
          <div class="col-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                @click="logOut()"
                class="btn btn-light me-md-2"
                type="button"
                style="margin-top: 15px; margin-bottom: 10px"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-box-arrow-in-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                  />
                </svg>
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="col-md-10 offset-md-1">
      <div class="bd-example-snippet bd-code-snippet" style="border: none">
        <div class="card" style="margin: 20px">
          <div class="card-body" style="text-align: left; padding: 30px">
            <div>
              <h5><b>ระบุข้อมูลส่วนบุคคล</b></h5>
              <hr />
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>บันทึกข้อความ: </strong> กรุณากรอกข้อมูลตามความเป็นจริง
                เพื่อประโยชน์แก่ตัวท่านเอง
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-6">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>HN:<span style="color: red">*</span></b></label
                    >
                    <input
                      @change="validationHN"
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      v-model="HN"
                    />
                    <label style="color: red">{{ errorMessage.HN }}</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>เลขบัตรประชาชน:<span style="color: red">*</span></b></label
                    >
                    <input
                      @change="validationIDcard"
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      v-model="IDcard"
                    />
                    <label style="color: red">{{ errorMessage.IDcard }}</label>
                  </div>
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>คำนำหน้า:<span style="color: red">*</span></b></label
                    >
                    <div class="col-auto">
                      <select
                        class="form-select"
                        v-model="prefix"
                        @change="validationPrefix"
                      >
                        <option value="" disabled>กรุณาเลือก</option>
                        <option>นาย</option>
                        <option>นาง</option>
                        <option>นางสาว</option>
                        <option>เด็กชาย</option>
                        <option>เด็กหญิง</option>
                      </select>
                      <label style="color: red">{{ errorMessage.prefix }}</label>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>ชื่อ:<span style="color: red">*</span></b></label
                    >
                    <input
                      @change="validationFirstName"
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      v-model="firstName"
                    />
                    <label style="color: red">{{ errorMessage.firstName }}</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>นามสกุล:<span style="color: red">*</span></b></label
                    >
                    <input
                      @change="validationLastName"
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      v-model="lastName"
                    />
                    <label style="color: red">{{ errorMessage.lastName }}</label>
                  </div>
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>เพศ:<span style="color: red">*</span></b></label
                  >
                  <div class="col-auto">
                    <select
                      @change="validationGender"
                      class="form-select"
                      v-model="gender"
                    >
                      <option value="" disabled>กรุณาเลือก</option>
                      <option>ชาย</option>
                      <option>หญิง</option>
                    </select>
                    <label style="color: red">{{ errorMessage.gender }}</label>
                  </div>
                </div>
                <label
                  for="exampleFormControlInput1"
                  class="form-label"
                  style="margin-bottom: -10px"
                  ><b>วัน เดือน ปีเกิด:<span style="color: red">*</span></b></label
                >
                <div class="col-4">
                  <div class="mb-3">
                    <div class="col-auto">
                      <select
                        @change="validateBirthDate"
                        class="form-select"
                        v-model="day"
                      >
                        <option value="" disabled>กรุณาเลือกวันที่</option>
                        <option v-for="(date, index) in infoDate" :key="index">
                          {{ date }}
                        </option>
                      </select>
                      <label v-if="errorMessage.birthDate != ''" style="color: red">{{
                        errorMessage.birthDate
                      }}</label>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <div class="col-auto">
                      <select
                        @change="validateBirthDate"
                        class="form-select"
                        v-model="month"
                      >
                        <option value="" disabled>กรุณาเลือกเดือน</option>
                        <option v-for="(mon, index) in infoMonth" :key="index">
                          {{ mon }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <div class="col-auto">
                      <select
                        @change="validateBirthDate"
                        class="form-select"
                        v-model="year"
                      >
                        <option value="" disabled>กรุณาเลือกปีเกิด</option>
                        <option v-for="(year, index) in years" :key="index">
                          {{ Number(year) + 543 }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>สัญชาติ:<span style="color: red">*</span></b></label
                    >
                    <div class="col-auto">
                      <input
                        @change="validationNation"
                        type="text"
                        list="national"
                        class="form-control"
                        v-model="nationality"
                      />
                      <datalist id="national">
                        <option>ไทย</option>
                        <option>พม่า</option>
                        <option>ลาว</option>
                        <option>จีน</option>
                      </datalist>
                    </div>
                    <label v-if="errorMessage.nationality != ''" style="color: red">{{
                      errorMessage.nationality
                    }}</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>ศาสนา:</b></label
                    >
                    <div class="col-auto">
                      <input
                        @change="validationReligious"
                        type="text"
                        list="religious"
                        class="form-control"
                        v-model="religious"
                      />
                      <datalist id="religious">
                        <option>พุทธ</option>
                        <option>คริสต์</option>
                        <option>อิสลาม</option>
                        <option>พราหมณ์-ฮินดู</option>
                        <option>ไม่มีศาสนา</option>
                      </datalist>
                    </div>
                    <label v-if="errorMessage.religious != ''" style="color: red">{{
                      errorMessage.religious
                    }}</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>สถานภาพสมรส:<span style="color: red">*</span></b></label
                    >
                    <div class="col-auto">
                      <select
                        class="form-select"
                        @change="validationMarriageStatus"
                        v-model="marriageStatus"
                      >
                        <option value="" disabled>กรุณาเลือก</option>
                        <option>โสด</option>
                        <option>สมรส</option>
                        <option>หย่าร้าง</option>
                        <option>แยก</option>
                        <option>สมณะ</option>
                      </select>
                      <label
                        v-if="errorMessage.marriageStatus != ''"
                        style="color: red"
                        >{{ errorMessage.marriageStatus }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>การศึกษาสูงสุด:<span style="color: red">*</span></b></label
                    >
                    <div class="col-auto">
                      <select
                        class="form-select"
                        @change="validationEducation"
                        v-model="education"
                      >
                        <option value="">กรุณาระบุการศึกษาสูงสุด</option>
                        <option>ไม่ได้เรียน</option>
                        <option>ประถมศึกษาปีที่ 3</option>
                        <option>ประถมศึกษาปีที่ 6</option>
                        <option>มัธยมศึกษาปีที่ 3</option>
                        <option>มัธยมศึกษาปีที่ 6</option>
                        <option>ปวช.</option>
                        <option>ปวส. หรือเทียบเท่าอนุปริญญา</option>
                        <option>ปริญญาตรี</option>
                        <option>ปริญญาโท</option>
                        <option>ปริญญาเอก</option>
                      </select>
                      <label v-if="errorMessage.education != ''" style="color: red">{{
                        errorMessage.education
                      }}</label>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>อาชีพปัจจุบัน:<span style="color: red">*</span></b></label
                    >
                    <input
                      @change="validationOccpation"
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      v-model="occupation"
                    />
                    <label v-if="errorMessage.occupation != ''" style="color: red">{{
                      errorMessage.occupation
                    }}</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b>หมู่เลือด:<span style="color: red">*</span></b></label
                    >
                    <div class="col-auto">
                      <select
                        @change="validationBloodGroup"
                        class="form-select"
                        v-model="bloodGroup"
                      >
                        <option value="">กรุณาระบุหมู่เลือด</option>
                        <option>AB (เอบี)</option>
                        <option>A (เอ)</option>
                        <option>B (บี)</option>
                        <option>O (โอ)</option>
                      </select>
                      <label v-if="errorMessage.bloodGroup != ''" style="color: red">{{
                        errorMessage.bloodGroup
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row g-3 align-items-center">
                <div class="col-4">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                      ><b
                        >เบอร์โทรศัพท์ที่สามารถติดต่อได้:<span style="color: red"
                          >*</span
                        ></b
                      ></label
                    >
                    <div class="col-auto">
                      <input type="text" class="form-control" v-model="phoneNumber" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" style="margin: 20px">
          <div class="card-body" style="text-align: left; padding: 30px">
            <div class="row g-3 align-items-center">
              <label><b>ที่อยู่ตามบัตรประชาชน</b></label>
              <label style="color: red">{{ errorMessage.IDaddress }}</label>
              <div class="col-4">
                <div class="mb-3">
                  <label>บ้านเลขที่<span style="color: red">*</span></label>
                  <input
                    @change="validationAddress"
                    type="text"
                    class="form-control"
                    v-model="IDcardAddress.houseNumber"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>หมู่ที่<span style="color: red">*</span></label>
                  <input
                    @change="validationAddress"
                    type="text"
                    class="form-control"
                    v-model="IDcardAddress.moo"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>ซอย<span style="color: red">*</span></label>
                  <input
                    @change="validationAddress"
                    type="text"
                    class="form-control"
                    v-model="IDcardAddress.soi"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label>ถนน<span style="color: red">*</span></label>
                  <input
                    @change="validationAddress"
                    type="text"
                    class="form-control"
                    v-model="IDcardAddress.road"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>ตำบล/แขวง<span style="color: red">*</span></label>
                  <input
                    class="form-control"
                    type="text"
                    @change="validationAddress"
                    v-model="IDcardAddress.subDistrict"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>อำเภอ/เขต<span style="color: red">*</span></label>
                  <input
                    class="form-control"
                    type="text"
                    @change="validationAddress"
                    v-model="IDcardAddress.district"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label>จังหวัด<span style="color: red">*</span></label>
                  <select
                    class="form-select"
                    @change="validationAddress"
                    v-model="IDcardAddress.provice"
                  >
                    <option value="" disabled>กรุณาเลือกจังหวัด</option>
                    <option v-for="(p, index) in infoProvice" :key="index">
                      {{ p }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>โทร.</label>
                  <input
                    @change="validationAddress"
                    type="text"
                    class="form-control"
                    v-model="IDcardAddress.tell"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <label><b>ที่อยู่ปัจจุบัน</b></label>
              <label style="color: red">{{ errorMessage.currentAddress }}</label>
              <div class="col-4">
                <div class="mb-3">
                  <label>บ้านเลขที่<span style="color: red">*</span></label>
                  <input
                    @change="validationCurrentAddress"
                    type="text"
                    class="form-control"
                    v-model="currentAddress.houseNumber"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>หมู่ที่<span style="color: red">*</span></label>
                  <input
                    @change="validationCurrentAddress"
                    type="text"
                    class="form-control"
                    v-model="currentAddress.moo"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>ซอย<span style="color: red">*</span></label>
                  <input
                    @change="validationCurrentAddress"
                    type="text"
                    class="form-control"
                    v-model="currentAddress.soi"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label>ถนน<span style="color: red">*</span></label>
                  <input
                    @change="validationCurrentAddress"
                    type="text"
                    class="form-control"
                    v-model="currentAddress.road"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>ตำบล/แขวง<span style="color: red">*</span></label>
                  <input
                    class="form-control"
                    type="text"
                    @change="validationCurrentAddress"
                    v-model="currentAddress.subDistrict"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>อำเภอ/เขต<span style="color: red">*</span></label>
                  <input
                    class="form-control"
                    type="text"
                    @change="validationCurrentAddress"
                    v-model="currentAddress.district"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label>จังหวัด<span style="color: red">*</span></label>
                  <select
                    class="form-select"
                    @change="validationCurrentAddress"
                    v-model="currentAddress.provice"
                  >
                    <option value="">กรุณาเลือกจังหวัด</option>
                    <option v-for="(p, index) in infoProvice" :key="index">
                      {{ p }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>โทร.</label>
                  <input
                    @change="validationCurrentAddress"
                    type="text"
                    class="form-control"
                    v-model="currentAddress.tell"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>ชื่อ-นามสกุล บิดา:</b></label
                  >
                  <input
                    @change="validationFatherName"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="fatherName"
                  />
                  <label style="color: red">{{ errorMessage.fatherName }}</label>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>ชื่อ-นามสกุล มารดา:</b></label
                  >
                  <input
                    @change="validationMotherName"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="motherName"
                  />
                  <label style="color: red">{{ errorMessage.motherName }}</label>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>ชื่อ-นามสกุล คู่สมรส:</b></label
                  >
                  <input
                    @change="validationMarriageStatus"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="spouseName"
                  />
                  <label style="color: red">{{ errorMessage.spouseName }}</label>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b
                      >ชื่อ-นามสกุล ญาติที่ติดต่อได้:<span style="color: red">*</span></b
                    ></label
                  >
                  <input
                    @change="validationContactPerson"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="contactPerson"
                  />
                  <label style="color: red">{{ errorMessage.contactPerson }}</label>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>เกี่ยวข้องเป็น:<span style="color: red">*</span></b></label
                  >
                  <input
                    @change="validationContactPerson"
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="relatedAs"
                  />
                  <label style="color: red">{{ errorMessage.relatedAs }}</label>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <label><b>ที่อยู่ที่ติดต่อได้</b></label>
              <label style="color: red">{{ errorMessage.contactAddress }}</label>
              <div class="col-4">
                <div class="mb-3">
                  <label>บ้านเลขที่<span style="color: red">*</span></label>
                  <input
                    @change="validationContactAddress"
                    type="text"
                    class="form-control"
                    v-model="contactAddress.houseNumber"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>หมู่ที่<span style="color: red">*</span></label>
                  <input
                    @change="validationContactAddress"
                    type="text"
                    class="form-control"
                    v-model="contactAddress.moo"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>ซอย<span style="color: red">*</span></label>
                  <input
                    @change="validationContactAddress"
                    type="text"
                    class="form-control"
                    v-model="contactAddress.soi"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label>ถนน<span style="color: red">*</span></label>
                  <input
                    @change="validationContactAddress"
                    type="text"
                    class="form-control"
                    v-model="contactAddress.road"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>ตำบล/แขวง<span style="color: red">*</span></label>
                  <input
                    class="form-control"
                    type="text"
                    @change="validationContactAddress"
                    v-model="contactAddress.subDistrict"
                  />
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>อำเภอ/เขต<span style="color: red">*</span></label>
                  <input
                    class="form-control"
                    type="text"
                    @change="validationContactAddress"
                    v-model="contactAddress.district"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-4">
                <div class="mb-3">
                  <label>จังหวัด<span style="color: red">*</span></label>
                  <select
                    class="form-select"
                    @change="validationContactAddress"
                    v-model="contactAddress.provice"
                  >
                    <option value="">กรุณาเลือกจังหวัด</option>
                    <option v-for="(p, index) in infoProvice" :key="index">
                      {{ p }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label>โทร.</label>
                  <input
                    @change="validationContactAddress"
                    type="text"
                    class="form-control"
                    v-model="contactAddress.tell"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card" style="margin: 20px">
          <div class="card-body" style="text-align: left; padding: 30px">
            <div class="row g-3 align-items-center">
              <div class="col-5">
                <div class="mb-3">
                  <label
                    ><b
                      >เพื่อประโยชน์ของตัวท่าน โปรดระบุประวัติการแพ้<span
                        style="color: red"
                        >*</span
                      >(ยา/อาหาร/อื่นๆ):</b
                    ></label
                  >
                </div>
              </div>
              <div class="col-7">
                <div class="mb-3">
                  <select class="form-select" v-model="allergyHis">
                    <option value="" disabled>กรุณาเลือก</option>
                    <option value="ไม่เคยแพ้">ไม่มีประวัติการแพ้</option>
                    <option value="แพ้">เคยแพ้</option>
                  </select>
                  <div
                    class="container"
                    style="margin-top: 20px"
                    v-if="allergyHis == 'แพ้'"
                  >
                    <div class="row justify-content-md-center">
                      <div class="col-8">
                        <label>บันทึกประวัติการแพ้</label>
                      </div>
                      <div class="col-4">
                        <button
                          type="button"
                          class="btn btn-outline-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal6"
                        >
                          แก้ไข
                        </button>
                      </div>
                    </div>
                    <div class="row justify-content-md">
                      <div class="col-8">
                        <label>{{ newAllergy }}</label>
                      </div>
                    </div>
                  </div>
                  <!--
                                    <div class="modal fade" id="exampleModal6" tabindex="-1"
                                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header" style="background-color: #90eeb7;">
                                                    <h1 class="modal-title fs-5" id="exampleModalLabel"
                                                        style="color: #1C2939;">
                                                        <b>ประวัติการแพ้</b>
                                                    </h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <div v-if="allergy != []" style="margin-bottom: 20px;">
                                                        <div style="margin-bottom: 5px;" class="row"
                                                            v-for="(a, index) in allergy" :key="index">
                                                            <div class="col-6">
                                                                <label>แพ้ : {{ a.type }}</label>
                                                            </div>
                                                            <div class="col-5">
                                                                <label> {{ a.detail }}</label>
                                                            </div>
                                                            <div class="col-1">
                                                                <button @click="deleteThisAllergy(a)" type="button" class="btn">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14"
                                                                        height="14" fill="currentColor"
                                                                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                    </svg>
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="input-group mb-3">
                                                        <div class="col-sm-2">
                                                            <select class="form-select" v-model="allerType">
                                                                <option value="">ระบุประเภท</option>
                                                                <option>ยา</option>
                                                                <option>อาหาร</option>
                                                                <option>อื่นๆ</option>
                                                            </select>
                                                        </div>

                                                        <input type="text" class="form-control" v-model="allerDetail">
                                                        <button class="btn btn-outline-success"
                                                            @click="addToAllergy">เพิ่ม</button>
                                                    </div>
                                                    <label style="color:red">{{ errorMessage.allerType }}
                                                        {{ errorMessage.allerDetail }}</label>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-success"
                                                        data-bs-dismiss="modal">บันทึก</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>-->
                  <div
                    class="modal fade"
                    id="exampleModal6"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header" style="background-color: #90eeb7">
                          <h1
                            class="modal-title fs-5"
                            id="exampleModalLabel"
                            style="color: #1c2939"
                          >
                            <b>ประวัติการแพ้</b>
                          </h1>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <div class="input-group mb-3">
                            <textarea
                              class="form-control"
                              v-model="newAllergy"
                              cols="30"
                              rows="5"
                              placeholder="กรุณาระบุ"
                            ></textarea>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-success"
                            data-bs-dismiss="modal"
                          >
                            บันทึก
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-2">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>ประวัติการสูบบุหรี่<span style="color: red">*</span></b></label
                  >
                </div>
              </div>
              <div class="col-2">
                <div class="mb-3">
                  <select
                    @change="validationSmoking"
                    class="form-select"
                    v-model="smoking"
                  >
                    <option value="" disabled>กรุณาเลือก</option>
                    <option>ไม่สูบ</option>
                    <option>สูบ</option>
                    <option>เคยสูบ</option>
                  </select>
                </div>
              </div>
              <div class="col-2" v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'">
                <div class="mb-3" style="text-align: right">
                  <label>ระยะเวลาที่สูบ</label>
                </div>
              </div>
              <div class="col-2" v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'">
                <div class="mb-3">
                  <input
                    @change="validationSmoking"
                    type="text"
                    class="form-control"
                    v-model="smokingPeriod"
                  />
                  <label style="color: red">{{ errorMessage.smokingPeriod }}</label>
                </div>
              </div>
              <div class="col-1" v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'">
                <div class="mb-3">
                  <label>ปี</label>
                </div>
              </div>
              <div class="col-1" v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'">
                <div class="mb-3" style="text-align: right">
                  <label>จำนวน</label>
                </div>
              </div>
              <div class="col-1" v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'">
                <div class="mb-3">
                  <input
                    @change="validationSmoking"
                    type="text"
                    class="form-control"
                    v-model="cigaretteNumber"
                  />
                  <label style="color: red">{{ errorMessage.cigaretteNumber }}</label>
                </div>
              </div>
              <div class="col-1" v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'">
                <div class="mb-3">
                  <label>มวน/วัน</label>
                </div>
              </div>
            </div>
            <div
              class="row g-3 align-items-center"
              v-if="smoking == 'สูบ' || smoking == 'เคยสูบ'"
            >
              <div class="col-3">
                <div class="mb-3"></div>
              </div>
              <div class="col-3">
                <div class="mb-3" style="text-align: right">
                  <label>ถ้าสูบ</label>
                </div>
              </div>
              <div class="col-2">
                <div class="mb-3">
                  <select
                    @change="validationSmoking"
                    class="form-select"
                    v-model="cigaretteButt"
                  >
                    <option value="" disabled>กรุณาเลือก</option>
                    <option>มีก้นกรอง</option>
                    <option>ไม่มีก้นกรอง</option>
                  </select>
                  <label style="color: red">{{ errorMessage.cigaretteButt }}</label>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-2">
                <div class="mb-3">
                  <label
                    ><b
                      >ประวัติการดื่มแอลกอฮอล์<span style="color: red">*</span></b
                    ></label
                  >
                </div>
              </div>
              <div class="col-2">
                <div class="mb-3">
                  <select
                    @change="validationAlcohol"
                    class="form-select"
                    v-model="alcohol"
                  >
                    <option value="" disabled>กรุณาเลือก</option>
                    <option>ไม่ดื่ม</option>
                    <option>ดื่ม</option>
                  </select>
                </div>
              </div>
              <div class="col-2" v-if="alcohol == 'ดื่ม'">
                <div class="mb-3" style="text-align: right">ดื่ม(ระบุชนิด)</div>
              </div>
              <div class="col-6" v-if="alcohol == 'ดื่ม'">
                <div class="mb-3">
                  <input
                    @change="validationAlcohol"
                    type="text"
                    class="form-control"
                    v-model="typeAlcohol"
                  />
                  <label style="color: red">{{ errorMessage.typeAlcohol }}</label>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center" v-if="alcohol == 'ดื่ม'">
              <div class="col-3">
                <div class="mb-3"></div>
              </div>
              <div class="col-3">
                <div class="mb-3" style="text-align: right">
                  <label>ระยะเวลาที่ดื่ม</label>
                </div>
              </div>
              <div class="col-2">
                <div class="mb-3">
                  <input
                    @change="validationAlcohol"
                    type="text"
                    class="form-control"
                    v-model="alcoholPeriod"
                  />
                  <label style="color: red">{{ errorMessage.alcoholPeriod }}</label>
                </div>
              </div>
              <div class="col-1">
                <div class="mb-3">
                  <label>ปี</label>
                </div>
              </div>
              <div class="col-1">
                <div class="mb-3" style="text-align: right">
                  <label>จำนวนที่ดื่ม</label>
                </div>
              </div>
              <div class="col-1">
                <div class="mb-3">
                  <input
                    @change="validationAlcohol"
                    type="text"
                    class="form-control"
                    v-model="alcoholGlass"
                  />
                  <label style="color: red">{{ errorMessage.alcoholGlass }}</label>
                </div>
              </div>
              <div class="col-1">
                <div class="mb-3">
                  <label>แก้ว/วัน</label>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-2">
                <div class="mb-3">
                  <label
                    ><b>ประวัติการกินหมาก<span style="color: red">*</span></b></label
                  >
                </div>
              </div>
              <div class="col-2">
                <div class="mb-3">
                  <select @change="validationNut" class="form-select" v-model="nut">
                    <option value="" disabled>กรุณาเลือก</option>
                    <option>ไม่เคย</option>
                    <option>เคย</option>
                  </select>
                </div>
              </div>
              <div class="col-2" v-if="nut == 'เคย'">
                <div class="mb-3" style="text-align: right">
                  <label>ระยะเวลา</label>
                </div>
              </div>
              <div class="col-2" v-if="nut == 'เคย'">
                <div class="mb-3">
                  <input
                    @change="validationNut"
                    type="text"
                    class="form-control"
                    v-model="nutPeriod"
                  />
                  <label style="color: red">{{ errorMessage.nutPeriod }}</label>
                </div>
              </div>
              <div class="col-1" v-if="nut == 'เคย'">
                <div class="mb-3">
                  <label>ปี</label>
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-12">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>ยาที่กินประจำ</b></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="usualMed"
                  />
                </div>
              </div>
            </div>
            <div class="row g-3 align-items-center">
              <div class="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>โรคประจำตัว</b></label
                  >
                  <textarea
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="disease"
                    placeholder="เช่น เบาหวาน ความดันโลหิต หัวใจ ตับ ไต"
                  ></textarea>
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label"
                    ><b>การรักษาอื่นๆ</b></label
                  >
                  <textarea
                    class="form-control"
                    id="exampleFormControlInput1"
                    v-model="otherTreatment"
                    placeholder="เช่น ผ่าตัด ฉายแสง"
                  ></textarea>
                </div>
              </div>
            </div>
            <!--ปุ่มลงทะเบียน-->
            <div class="d-grid gap-2 col-6 mx-auto" style="margin-top: 30px">
              <button class="btn btn-success" type="button" @click="registerPatient()">
                ลงทะเบียน
              </button>
            </div>
            <!--<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">เพิ่มแผนการรักษา</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3 row" style="text-align: left;">
                                            <label for="inputFirstname" class="col-sm-3 col-form-label">ชื่อ</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="inputText"
                                                    v-model="firstName" disabled>
                                            </div>
                                        </div>
                                        <div class="mb-3 row" style="text-align: left;">
                                            <label for="inputFirstname" class="col-sm-3 col-form-label">นามสกุล</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="inputText"
                                                    v-model="lastName" disabled>
                                            </div>
                                        </div>
                                        <div class="mb-3 row" style="text-align: left;">
                                            <label for="inputType" class="col-sm-3 col-form-label">ประเภทมะเร็ง</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="inputText"
                                                    v-model="cancerType">
                                            </div>
                                        </div>
                                        <div class="mb-3 row" style="text-align: left;">
                                            <label for="inputState" class="col-sm-3 col-form-label">ระยะของโรค</label>
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control" id="inputText"
                                                    v-model="cancerState">
                                            </div>
                                        </div>
                                        <div class="mb-3 row" style="text-align: left;">
                                            <label for="inputState" class="col-sm-3 col-form-label">สูตรยา</label>
                                            <div class="col-sm-8">
                                                <select class="form-select" v-model="formula">
                                                    <option v-for="formula in formulas" :key="formula.formulaId">
                                                        {{ formula.formulaName }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3 row" style="text-align: left;">
                                            <label for="inputState" class="col-sm-3 col-form-label">แพทย์ผู้ดูแล</label>
                                            <div class="col-sm-8">
                                                <select class="form-select" v-model="doctor">
                                                    <option v-for="doc in doctors" :key="doc.doctorId">
                                                        {{ doc.firstName }} {{ doc.lastName }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                        >ยกเลิก</button>
                                        <button type="button" class="btn btn-success" @click="registerPatient()">ตกลง</button>
                                    </div>
                                </div>
                            </div>
                        </div>-->
            <!--<button type="button" data-bs-target="#exampleModal5" data-bs-toggle="modal">แจ้งสถานะ</button>-->
            <div
              class="modal fade"
              id="exampleModal20"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header"></div>
                  <div class="modal-body" style="text-align: center">
                    <h3>{{ statusMessages }}</h3>

                    <div>
                      <button
                        type="button"
                        class="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        ตกลง
                      </button>
                    </div>
                  </div>
                  <div class="modal-footer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  name: "RegisPatient",
  data() {
    return {
      cancerType: "",
      cancerState: "",
      formula: "",
      formulas: [],
      doctors: [],
      doctor: "",
      showOverlay: false,
      nationality: "",
      occupation: "",
      religious: "",
      education: "",
      marriageStatus: "",
      bloodGroup: "",
      allergyHis: "",
      haveAllergy: "",
      allergy: [],
      usualMed: "",
      disease: "",
      fatherName: "",
      motherName: "",
      otherTreatment: "",
      day: "",
      month: "",
      year: "",
      infoMonth: [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ],
      infoDate: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      infoProvice: [
        "กระบี่",
        "กรุงเทพมหานคร",
        "กาญจนบุรี",
        "กาฬสินธุ์",
        "กำแพงเพชร",
        "ขอนแก่น",
        "จันทบุรี",
        "ฉะเชิงเทรา",
        "ชลบุรี",
        "ชัยนาท",
        "ชัยภูมิ",
        "ชุมพร",
        "เชียงราย",
        "เชียงใหม่",
        "ตรัง",
        "ตราด",
        "ตาก",
        "นครนายก",
        "นครปฐม",
        "นครพนม",
        "นครราชสีมา",
        "นครศรีธรรมราช",
        "นครสวรรค์",
        "นนทบุรี",
        "นราธิวาส",
        "น่าน",
        "บึงกาฬ",
        "บุรีรัมย์",
        "ปทุมธานี",
        "ประจวบคีรีขันธ์",
        "ปราจีนบุรี",
        "ปัตตานี",
        "พระนครศรีอยุธยา",
        "พะเยา",
        "พังงา",
        "พัทลุง",
        "พิจิตร",
        "พิษณุโลก",
        "เพชรบุรี",
        "เพชรบูรณ์",
        "แพร่",
        "ภูเก็ต",
        "มหาสารคาม",
        "มุกดาหาร",
        "แม่ฮ่องสอน",
        "ยโสธร",
        "ยะลา",
        "ร้อยเอ็ด",
        "ระนอง",
        "ระยอง",
        "ราชบุรี",
        "ลพบุรี",
        "ลำปาง",
        "ลำพูน",
        "เลย",
        "ศรีสะเกษ",
        "สกลนคร",
        "สงขลา",
        "สตูล",
        "สมุทรปราการ",
        "สมุทรสงคราม",
        "สมุทรสาคร",
        "สระแก้ว",
        "สระบุรี",
        "สิงห์บุรี",
        "สุโขทัย",
        "สุพรรณบุรี",
        "สุราษฎร์ธานี",
        "สุรินทร์",
        "หนองคาย",
        "หนองบัวลำภู",
        "อ่างทอง",
        "อำนาจเจริญ",
        "อุดรธานี",
        "อุตรดิตถ์",
        "อุทัยธานี",
        "อุบลราชธานี",
      ],
      infoDistrict: {
        กระบี่: [
          "เมืองกระบี่",
          "เขาพนม",
          "เกาะลันตา",
          "คลองท่อม",
          "อ่าวลึก",
          "ปลายพระยา",
          "ลำทับ",
          "เหนือคลอง",
        ],
        กรุงเทพ: [
          "เขตพระนคร",
          "เขตดุสิต",
          "เขตหนองจอก",
          "เขตบางรัก",
          "เขตบางเขน",
          "เขตบางกะปิ",
          "เขตปทุมวัน",
          "เขตป้อมปราบศัตรูพ่าย",
          "เขตพระโขนง",
          "เขตมีนบุรี",
          "เขตลาดกระบัง",
          "เขตยานนาวา",
          "เขตสัมพันธวงศ์",
          "เขตพญาไท",
          "เขตธนบุรี",
          "เขตบางกอกใหญ่",
          "เขตห้วยขวาง",
          "เขตคลองสาน",
          "เขตตลิ่งชัน",
          "เขตบางกอกน้อย",
          "เขตบางขุนเทียน",
          "เขตภาษีเจริญ",
          "เขตหนองแขม",
          "เขตราษฎร์บูรณะ",
          "เขตบางพลัด",
          "เขตดินแดง",
          "เขตบึงกุ่ม",
          "เขตสาทร",
          "เขตบางซื่อ",
          "เขตจตุจักร",
          "เขตบางคอแหลม",
          "เขตประเวศ",
          "เขตคลองเตย",
          "เขตสวนหลวง",
          "เขตจอมทอง",
          "เขตดอนเมือง",
          "เขตราชเทวี",
          "เขตลาดพร้าว",
          "เขตวัฒนา",
          "เขตบางแค",
          "เขตหลักสี่",
          "เขตสายไหม",
          "เขตคันนายาว",
          "เขตสะพานสูง",
          "เขตวังทองหลาง",
          "เขตคลองสามวา",
          "เขตบางนา",
          "เขตทวีวัฒนา",
          "เขตทุ่งครุ",
          "เขตบางบอน",
          "*บ้านทะวาย",
        ],
        กาญจนบุรี: [
          "เมืองกาญจนบุรี",
          "ไทรโยค",
          "บ่อพลอย",
          "ศรีสวัสดิ์",
          "ท่ามะกา",
          "ท่าม่วง",
          "ทองผาภูมิ",
          "สังคละบุรี",
          "พนมทวน",
          "เลาขวัญ",
          "ด่านมะขามเตี้ย",
          "หนองปรือ",
          "ห้วยกระเจา",
          "สาขาตำบลผ้ากระดาน",
          "*บ้านทวน",
        ],
      },
      allerType: "",
      allerDetail: "",
      HN: "",
      IDcard: "",
      gender: "",
      prefix: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      phoneNumber: "",
      IDcardAddress: {
        houseNumber: "",
        moo: "",
        soi: "",
        road: "",
        subDistrict: "",
        district: "",
        provice: "",
        tell: "",
      },
      currentAddress: {
        houseNumber: "",
        moo: "",
        soi: "",
        road: "",
        subDistrict: "",
        district: "",
        provice: "",
        tell: "",
      },
      contactAddress: {
        houseNumber: "",
        moo: "",
        soi: "",
        road: "",
        subDistrict: "",
        district: "",
        provice: "",
        tell: "",
      },
      spouseName: "",
      contactPerson: "",
      relatedAs: "",
      smoking: "",
      smokingPeriod: "",
      cigaretteNumber: "",
      cigaretteButt: "",
      alcohol: "",
      typeAlcohol: "",
      alcoholPeriod: "",
      alcoholGlass: "",
      nut: "",
      nutPeriod: "",
      errorMessage: {
        HN: "",
        IDcard: "",
        prefix: "",
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        nationality: "",
        religious: "",
        marriageStatus: "",
        education: "",
        occupation: "",
        bloodGroup: "",
        IDaddress: "",
        currentAddress: "",
        fatherName: "",
        motherName: "",
        spouseName: "",
        relatedAs: "",
        contactAddress: "",
        contactPerson: "",
        allerType: "",
        allerDetail: "",
        smokingPeriod: "",
        cigaretteNumber: "",
        cigaretteButt: "",
        alcoholPeriod: "",
        typeAlcohol: "",
        alcoholGlass: "",
        nutPeriod: "",
        smoking: "",
        alcohol: "",
        nut: "",
      },
      statusMessages: "",
      newAllergy: "",
      user: [],
    };
  },
  mounted() {
    let userId = this.$route.params.userId;
    axios
      .get(`http://localhost:3000/user/${userId}`)
      .then((response) => {
        this.user = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/doctor`)
      .then((response) => {
        this.doctors = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/Allformula`)
      .then((response) => {
        this.formulas = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    logOut() {
      this.$router.replace("/");
    },
    goToguideBook() {
      this.$router.push(`/guideBook/${this.$route.params.userId}`);
    },
    goToRegis() {
      this.$router.push(`/RegisPatient/${this.$route.params.userId}`);
    },

    goTonewHome() {
      this.$router.push(`/HomePage/${this.$route.params.userId}`);
    },
    goToMedFor() {
      this.$router.push(`/MedFormular/${this.$route.params.userId}`);
    },
    goToPatient() {
      this.$router.push(`/YourPatients/${this.$route.params.userId}`);
    },
    goTonewAppoint() {
      this.$router.push(`/appointmentView/${this.$route.params.userId}`);
    },
    addToAllergy() {
      if (this.allerType && this.allerDetail != "") {
        let data = { type: this.allerType, detail: this.allerDetail };
        this.allergy.push(data);
        this.errorMessage.allerType = "";
        this.errorMessage.allerDetail = "";
        this.allerType = "";
        this.allerDetail = "";
      } else if (this.allerType == "") {
        this.errorMessage.allerType = "กรุณากรอกประเภทที่แพ้";
      } else if (this.allerDetail == "") {
        this.errorMessage.allerDetail = "กรุณากรอกรายละเอียด";
      }
    },
    DBAddress(address) {
      if (address.soi == "") {
        address.soi = "-";
      }
      if (address.moo == "") {
        address.moo = "-";
      }
      let DBAddress =
        "บ้านเลขที่ " +
        address.houseNumber +
        " " +
        "หมู่ " +
        address.moo +
        " " +
        "ซอย " +
        address.soi +
        " " +
        "ถนน " +
        address.road +
        " " +
        "ตำบล/แขวง " +
        address.subDistrict +
        " " +
        "อำเภอ/เขต " +
        address.district +
        " " +
        "จังหวัด " +
        address.provice +
        " " +
        "โทร. " +
        address.tell;
      return DBAddress;
    },
    registerPatient() {
      let y = Number(this.year) - 543;
      let m = Number(this.infoMonth.indexOf(this.month)) + 1;
      let d = this.day;
      this.birthDate =
        y + "-" + this.padWithLeadingZeros(m, 2) + "-" + this.padWithLeadingZeros(d, 2);
      const data = {
        //patient
        HN: this.HN,
        IDcard: this.IDcard,
        gender: this.gender,
        prefix: this.prefix,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        phoneNumber: this.phoneNumber,
        //history
        nationality: this.nationality,
        religious: this.religious,
        marriageStatus: this.marriageStatus,
        education: this.education,
        occupation: this.occupation,
        bloodGroup: this.bloodGroup,
        IDcardAddress: this.DBAddress(this.IDcardAddress),
        currentAddress: this.DBAddress(this.currentAddress),
        contactAddress: this.DBAddress(this.contactAddress),
        contactPerson: this.contactPerson,
        relatedAs: this.relatedAs,
        fatherName: this.fatherName,
        motherName: this.motherName,
        spouseName: this.spouseName,
        //addictive
        smoking: this.smoking,
        smokingPeriod: this.smokingPeriod,
        cigaretteNumber: this.cigaretteNumber,
        cigaretteButt: this.cigaretteButt,
        alcohol: this.alcohol,
        alcoholGlass: this.alcoholGlass,
        alcoholPeriod: this.alcoholPeriod,
        typeAlcohol: this.typeAlcohol,
        nut: this.nut,
        nutPeriod: this.nutPeriod,
        //disease
        disease: this.disease,
        usualMed: this.usualMed,
        allergy: this.newAllergy,
        allergyHis: this.allergyHis,
        otherTreatment: this.otherTreatment,
        //treatment
        cancerType: this.cancerType,
        cancerState: this.cancerState,
        formulaName: this.formula,
        doctorName: this.doctor,
      };
      let check = this.validateData(data);
      if (check == "ok") {
        axios
          .post(`http://localhost:3000/newPatient`, data)
          .then((response) => {
            if (response.data == "success") {
              Swal.fire({
                title: response.data,
                text: "ลงทะเบียนผู้ป่วยสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.go(this.$router.currentRoute);
                }
              });
            } else {
              Swal.fire({
                title: "คำเตือน",
                text: "มีผู้ป่วยนี้ในระบบแล้ว",
                icon: "warning",
                confirmButtonText: "ตกลง",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    validateData(data) {
      if (data.HN.length != 6) {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาใส่รหัส HN",
          icon: "warning",
        });
      } else if (data.IDcard.length != 13) {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาใส่เลขบัตรประจำตัวประชาชน",
          icon: "warning",
        });
      } else if (data.gender == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุเพศ",
          icon: "warning",
        });
      } else if (data.prefix == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุคำนำหน้า",
          icon: "warning",
        });
      } else if (data.firstName == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุชื่อ นามสกุล",
          icon: "warning",
        });
      } else if (data.lastName == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุชื่อ นามสกุล",
          icon: "warning",
        });
      } else if (data.birthDate == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรอกระบุวัน เดือน ปีเกิด",
          icon: "warning",
        });
      } else if (data.phoneNumber == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกเบอร์โทรศัพท์ที่ติดต่อได้",
          icon: "warning",
        });
      } else if (data.nationality == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุสัญชาติ",
          icon: "warning",
        });
      } else if (data.marriageStatus == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุสถานภาพสมรส",
          icon: "warning",
        });
      } else if (data.education == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุการศึกษาสูงสุด",
          icon: "warning",
        });
      } else if (data.occupation == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุอาชีพ",
          icon: "warning",
        });
      } else if (data.bloodGroup == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุหมู่เลือด",
          icon: "warning",
        });
      } else if (this.errorMessage.IDaddress != "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกที่อยู่ตามบัตรประชาชนให้ถูกต้อง",
          icon: "warning",
        });
      } else if (this.errorMessage.currentAddress != "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกที่อยู่ปัจจุบันให้ถูกต้อง",
          icon: "warning",
        });
      } else if (this.errorMessage.contactAddress != "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกที่อยู่ที่ติดต่อได้ให้ถูกต้อง",
          icon: "warning",
        });
      } else if (data.contactPerson == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุญาติที่ติดต่อได้",
          icon: "warning",
        });
      } else if (data.relatedAs == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุความเกี่ยวข้อง",
          icon: "warning",
        });
      } else if (data.allergyHis == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุประวัติแพ้ยา",
          icon: "warning",
        });
      } else if (data.smoking == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุประวัติการสูบบุหรี่",
          icon: "warning",
        });
      } else if (data.alcohol == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกประวัติการดื่มแอลกอฮอล์",
          icon: "warning",
        });
      } else if (data.nut == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกประวัติการกินหมาก",
          icon: "warning",
        });
      } else if (this.allergyHis == "แพ้" && this.newAllergy == "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุการแพ้",
          icon: "warning",
        });
      } else if (this.errorMessage.smoking != "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกประวัติการสูบบุหรี่ให้ครบ",
          icon: "warning",
        });
      } else if (this.errorMessage.alcohol != "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกประวัติการดื่มแอลกอฮอล์ให้ครบ",
          icon: "warning",
        });
      } else if (this.errorMessage.nut != "") {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกประวัติการกินหมาก",
          icon: "warning",
        });
      } else {
        return "ok";
      }
    },
    validationHN() {
      if (this.HN.length != 6) {
        this.errorMessage.HN = "กรุณากรอกเลข HN 6 หลัก";
      } else if (this.HN.length == 6) {
        this.errorMessage.HN = "";
      } else if (this.HN == "") {
        this.errorMessage.HN = "กรุณากรอกเลข HN 6 หลัก";
      }
    },
    validationIDcard() {
      if (this.IDcard.length != 13) {
        this.errorMessage.IDcard = "กรุณากรอกเลขบัตรประชาชน 13 หลัก";
      } else if (this.IDcard.length == 13) {
        this.errorMessage.IDcard = "";
      }
    },
    validationPrefix() {
      if (this.prefix == "") {
        this.errorMessage.prefix = "กรุณาเลือกคำนำหน้า";
      } else if (this.prefix != "") {
        this.errorMessage.prefix = "";
      }
    },
    validationFirstName() {
      if (this.firstName == "") {
        this.errorMessage.firstName = "กรุณากรอกชื่อผู้ป่วย";
      } else if (this.firstName != "") {
        this.errorMessage.firstName = "";
      }
    },
    validationLastName() {
      if (this.lastName == "") {
        this.errorMessage.lastName = "กรุณากรอกนามสกุลผู้ป่วย ถ้าไม่มีนามสกุล กรุณาใส่ -";
      } else if (this.lastName != "") {
        this.errorMessage.lastName = "";
      }
    },
    validationGender() {
      if (this.gender == "") {
        this.errorMessage.gender = "กรุณาเลือกเพศ";
      } else if (this.gender != "") {
        this.errorMessage.gender = "";
      }
    },
    validateBirthDate() {
      if (this.month.includes("คม")) {
        this.errorMessage.birthDate = "";
      } else if (this.month.includes("ยน")) {
        if (this.day > 30) {
          this.errorMessage.birthDate = "เดือน" + this.month + "มีจำนวน 30 วัน";
        } else {
          this.errorMessage.birthDate = "";
        }
      } else if (this.month == "กุมภาพันธ์") {
        let BE = Number(this.year) - 543;
        if (BE % 4 == 0) {
          if (this.day >= 30) {
            this.errorMessage.birthDate = "เดือนกุมภาพันธ์มีจำนวน 29 วัน";
          } else {
            this.errorMessage.birthDate = "";
          }
        } else if (BE % 4 != 0) {
          if (this.day >= 29) {
            this.errorMessage.birthDate = "เดือนกุมภาพันธ์มี 28 วัน";
          } else {
            this.errorMessage.birthDate = "";
          }
        } else if (this.day <= 28) {
          this.errorMessage.birthDate = "";
        }
      }
    },
    padWithLeadingZeros(num, totalLength) {
      return String(num).padStart(totalLength, "0");
    },
    validationNation() {
      if (this.nationality == "") {
        this.errorMessage.nationality = "กรุณาระบุสัญชาติ";
      } else if (this.nationality != "") {
        this.errorMessage.nationality = "";
      }
    },
    validationReligious() {
      if (this.religious == "") {
        this.errorMessage.religious = "กรุณาระบุศาสานา";
      } else if (this.religious != "") {
        this.errorMessage.religious = "";
      }
    },
    validationMarriageStatus() {
      if (this.marriageStatus == "") {
        this.errorMessage.marriageStatus = "กรุณาระบุสถานภาพสมรส";
      } else if (this.marriageStatus != "") {
        this.errorMessage.marriageStatus = "";
      }
      if (
        this.marriageStatus == "โสด" ||
        this.marriageStatus == "หย่าร้าง" ||
        this.marriageStatus == "สมณะ"
      ) {
        this.errorMessage.spouseName = "";
      } else if (this.spouseName != "") {
        this.errorMessage.spouseName = "";
      } else if (this.marriageStatus == "สมรส" || this.marriageStatus == "แยก") {
        this.errorMessage.spouseName = "กรุณาระบุชื่อ-นามสกุลคู่สมรส";
      }
    },
    validationEducation() {
      if (this.education == "") {
        this.errorMessage.education = "กรุณาระบุการศึกษาสูงสุด";
      } else if (this.education != "") {
        this.errorMessage.education = "";
      }
    },
    validationOccpation() {
      if (this.occupation == "") {
        this.errorMessage.occupation = "กรุณาระบุอาชีพปัจจุบัน";
      } else if (this.occupation != "") {
        this.errorMessage.occupation = "";
      }
    },
    validationBloodGroup() {
      if (this.bloodGroup == "") {
        this.errorMessage.bloodGroup = "กรุณาระบุหมู่เลือด";
      } else if (this.bloodGroup != "") {
        this.errorMessage.bloodGroup = "";
      }
    },
    validationAddress() {
      if (
        this.IDcardAddress.houseNumber != "" &&
        this.IDcardAddress.district != "" &&
        this.IDcardAddress.provice != "" &&
        this.IDcardAddress.road != "" &&
        this.IDcardAddress.subDistrict != ""
      ) {
        this.errorMessage.IDaddress = "";
      } else {
        this.errorMessage.IDaddress = "กรุณากรอกข้อมูลที่อยู่ให้ครบ";
      }
    },
    validationCurrentAddress() {
      if (
        this.currentAddress.houseNumber != "" &&
        this.currentAddress.district != "" &&
        this.currentAddress.provice != "" &&
        this.currentAddress.road != "" &&
        this.currentAddress.subDistrict != ""
      ) {
        this.errorMessage.currentAddress = "";
      } else {
        this.errorMessage.currentAddress = "กรุณากรอกข้อมูลที่อยู่ให้ครบ";
      }
    },
    validationContactAddress() {
      if (
        this.contactAddress.houseNumber != "" &&
        this.contactAddress.district != "" &&
        this.contactAddress.provice != "" &&
        this.contactAddress.road != "" &&
        this.contactAddress.subDistrict != ""
      ) {
        this.errorMessage.contactAddress = "";
      } else {
        this.errorMessage.contactAddress = "กรุณากรอกข้อมูลที่อยู่ให้ครบ";
      }
    },
    validationFatherName() {
      if (this.fatherName == "") {
        this.errorMessage.fatherName = "กรุณาระบุชื่อ-นามสกุลบิดา";
      } else if (this.fatherName != "") {
        this.errorMessage.fatherName = "";
      }
    },
    validationMotherName() {
      if (this.motherName == "") {
        this.errorMessage.motherName = "กรุณาระบุชื่อ-นามสกุลมารดา";
      } else if (this.motherName != "") {
        this.errorMessage.motherName = "";
      }
    },
    validationContactPerson() {
      if (this.contactPerson == "") {
        this.errorMessage.contactPerson = "กรุณาระบุชื่อ-นามสกุลญาติที่สามารถติดต่อได้";
      } else if (this.contactPerson != "") {
        this.errorMessage.contactPerson = "";
      }
      if (this.relatedAs == "") {
        this.errorMessage.relatedAs = "กรุณาระบุความเกี่ยวข้อง";
      } else if (this.relatedAs != "") {
        this.errorMessage.relatedAs = "";
      }
    },
    validationSmoking() {
      if (this.smoking == "ไม่สูบ") {
        this.errorMessage.smokingPeriod = "";
        this.errorMessage.cigaretteNumber = "";
        this.errorMessage.cigaretteButt = "";
        this.smokingPeriod = "";
        this.cigaretteButt = "";
        this.cigaretteNumber = "";
      } else if (this.smoking == "สูบ" || this.smoking == "เคยสูบ") {
        this.errorMessage.smoking = "กรอกไม่ครบ";
        this.errorMessage.smokingPeriod = "ระบุระยะเวลา";
        this.errorMessage.cigaretteNumber = "ระบุมวน/วัน";
        this.errorMessage.cigaretteButt = "ระบุก้นกรอง";
      }
      if (this.smokingPeriod != "") {
        this.errorMessage.smokingPeriod = "";
      }
      if (this.cigaretteButt != "") {
        this.errorMessage.cigaretteButt = "";
      }
      if (this.cigaretteNumber != "") {
        this.errorMessage.cigaretteNumber = "";
      }
      if (
        this.errorMessage.cigaretteNumber == "" &&
        this.errorMessage.cigaretteButt == "" &&
        this.errorMessage.smokingPeriod == ""
      ) {
        this.errorMessage.smoking = "";
      }
    },
    validationAlcohol() {
      if (this.alcohol == "ไม่ดื่ม") {
        this.errorMessage.alcoholPeriod = "";
        this.errorMessage.typeAlcohol = "";
        this.errorMessage.alcoholGlass = "";
        this.alcoholPeriod = "";
        this.typeAlcohol = "";
        this.alcoholGlass = "";
      } else if (this.alcohol == "ดื่ม") {
        this.errorMessage.alcohol = "กรอกไม่ครบ";
        this.errorMessage.alcoholPeriod = "ระบุระยะเวลา";
        this.errorMessage.typeAlcohol = "ระบุชนิดเครื่องดื่มแอลกอฮอล์";
        this.errorMessage.alcoholGlass = "ระบุแก้ว/วัน";
      }
      if (this.alcoholPeriod != "") {
        this.errorMessage.alcoholPeriod = "";
      }
      if (this.typeAlcohol != "") {
        this.errorMessage.typeAlcohol = "";
      }
      if (this.alcoholGlass != "") {
        this.errorMessage.alcoholGlass = "";
      }
      if (
        this.errorMessage.alcoholGlass == "" &&
        this.errorMessage.typeAlcohol == "" &&
        this.errorMessage.alcoholPeriod == ""
      ) {
        this.errorMessage.alcohol = "";
      }
    },
    validationNut() {
      if (this.nut == "ไม่เคย") {
        this.errorMessage.nutPeriod = "";
        this.nutPeriod = "";
      } else if (this.nut == "เคย") {
        this.errorMessage.nut = "กรอกไม่ครบ";
        this.errorMessage.nutPeriod = "ระบุระยะเวลา";
      }
      if (this.nutPeriod != "") {
        this.errorMessage.nutPeriod = "";
        this.errorMessage.nut = "";
      }
      if (this.errorMessage.nutPeriod == "") {
        this.errorMessage.nutPeriod = "";
      }
    },
  },
  computed: {
    years() {
      const year = new Date().getFullYear();
      return Array.from(
        { length: year - 1900 },
        (value, index) => 1901 + index
      ).reverse();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.group {
  padding: 20px;
}

.g1 {
  margin-right: 20px;
}
</style>
/
