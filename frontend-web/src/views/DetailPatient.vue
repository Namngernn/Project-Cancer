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
                style="
                  margin-top: 10px;
                  margin-bottom: 10px;
                  padding-right: 20px;
                "
              >
                <a class="nav-link" href="#" style="color: #ffffff"
                  >ลงทะเบียนผู้ป่วย</a
                >
              </li>
              <li
                class="nav-item"
                @click="goTonewHome()"
                style="
                  margin-top: 10px;
                  margin-bottom: 10px;
                  padding-right: 20px;
                "
              >
                <a class="nav-link" href="#" style="color: #ffffff">การอนุมัติผลเลือด</a>
              </li>
              <li
                class="nav-item"
                @click="goTonewAppoint()"
                style="
                  margin-top: 10px;
                  margin-bottom: 10px;
                  padding-right: 20px;
                "
              >
                <a class="nav-link" href="#" style="color: #ffffff">นัดหมาย</a>
              </li>
              <li
                class="nav-item"
                @click="goToPatient()"
                style="
                  margin-top: 10px;
                  margin-bottom: 10px;
                  padding-right: 20px;
                "
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  style="color: #ffffff; font-size: large"
                  >ประวัติการรักษา</a
                >
              </li>
              <li
                class="nav-item"
                @click="goToMedFor()"
                style="
                  margin-top: 10px;
                  margin-bottom: 10px;
                  padding-right: 20px;
                "
              >
                <a class="nav-link" href="#" style="color: #ffffff"
                  >สูตรยาเคมีบำบัด</a
                >
              </li>
              <li
                class="nav-item"
                @click="goToguideBook()"
                style="
                  margin-top: 10px;
                  margin-bottom: 10px;
                  padding-right: 20px;
                "
              >
                <a class="nav-link" href="#" style="color: #ffffff"
                  >คู่มือผู้ป่วย</a
                >
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
          <div class="card-body" style="text-align: left">
            <button
              type="button"
              style="margin-bottom: 20px"
              class="btn btn-outline-success"
              @click="goToPatient()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
              ย้อนกลับ
            </button>
            <div class="container" style="margin-bottom: 20px">
              <div class="row g-0">
                <div class="col-4">
                  <b>ชื่อ-นามสกุล</b>
                  <div>
                    {{ patient.prefix }}{{ patient.firstName }}
                    {{ patient.lastName }}
                  </div>
                </div>
                <div class="col-4">
                  <b>เพศ</b>
                  <div>{{ patient.gender }}</div>
                </div>
                <div class="col-4">
                  <b>อายุ</b>
                  <div>{{ patient.age }} ปี</div>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 20px">
              <div class="row g-0">
                <div class="col-4">
                  <b>ชนิดมะเร็ง</b>
                  <div v-for="i in patient.cancer" :key="i.HN">
                    {{ i.cancerType }} ระยะที่ {{ i.cancerState }}
                  </div>
                </div>
                <div class="col-4">
                  <b>สถานะ</b>
                  <div>{{ patient.status }}</div>
                </div>
                <div class="col-4">
                  <b>หมายเลขโทรศัพท์</b>
                  <div>{{ patient.phoneNumber }}</div>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 40px">
              <div class="row g-0">
                <div class="col-4">
                  <b>แพทย์ผู้ดูแล</b>
                  <div>{{ patient.doctorName }}</div>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 20px">
              <div class="row g-0">
                <div class="col-2">
                  <b>โรคประจำตัว</b>
                </div>
                <div class="col">
                  <label v-if="patientDisease.disease != ''">{{
                    patientDisease.disease
                  }}</label>
                  <label v-if="patientDisease.disease == ''"
                    >ไม่มีโรคประจำตัว</label
                  >
                </div>
                <div class="col-2">
                  <b>ยาที่กินประจำ</b>
                </div>
                <div class="col">
                  <label v-if="patientDisease.usualMed == ''"
                    >ไม่มียาที่กินประจำ</label
                  >
                  <label v-if="patientDisease.usualMed != ''">{{
                    patientDisease.usualMed
                  }}</label>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 20px">
              <div class="row g-0">
                <div class="col-2">
                  <b>ประวัติการแพ้ยาและอาหาร</b>
                </div>
                <div class="col">
                  <label v-if="patient.allergy == 'ไม่เคยแพ้'"
                    >ไม่มีประวัติการแพ้</label
                  >
                  <label v-if="patient.allergy == 'แพ้'">{{
                    patient.allergyDetail
                  }}</label>
                </div>
                <div class="col-2">
                  <b>การรักษาอื่นๆ</b>
                </div>
                <div class="col">
                  <label v-if="patientDisease.otherTreatment == ''"
                    >ไม่มีประวัติการรักษาอื่น ๆ
                  </label>
                  <label v-if="patientDisease.otherTreatment != ''">{{
                    patientDisease.otherTreatment
                  }}</label>
                </div>
              </div>
            </div>
            <div
              style="margin-top: 80px"
              v-for="t in treatment"
              :key="t.treatmentId"
            >
              <div class="row">
                <div class="col-4">
                  <label style="font-size: 1.17rem"
                    ><b>สูตรยา :</b> {{ t.formulaName }}</label
                  >
                </div>
                <div class="col-4">
                  <label style="font-size: 1.17rem"
                    ><b>แพทย์ผู้ดูแล :</b> {{ t.doctorName }}</label
                  >
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr class="table-info">
                    <th scope="col">วันที่รับยา</th>
                    <th scope="col">ครั้งที่</th>
                    <th scope="col">ยาเคมีบำบัดที่ได้รับ</th>
                    <th scope="col">ผลข้างเคียง(คนไข้)</th>
                    <th scope="col">ระดับผลข้างเคียง</th>
                    <th scope="col">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-group-divider"
                    v-for="appoint in appointment"
                    :key="appoint.appointId"
                  >
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-calendar3"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
                        />
                        <path
                          d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                        />
                      </svg>
                      {{ appoint.thaiAppointDate }}
                    </td>
                    <td>{{ appoint.appoint_no }}</td>
                    <td>
                      <div
                        class="row"
                        v-for="s in shouldDisplay"
                        :key="s.appointId"
                      >
                        {{ s.medName }} {{ s.unit }} มก. <br />
                      </div>
                    </td>
                    <td>
                      <label v-if="appoint.patientSideEffect != null">{{
                        appoint.patientSideEffect
                      }}</label>
                      <label v-if="appoint.patientSideEffect == null"
                        >คนไข้ยังไม่บันทึกผลข้างเคียง</label
                      >
                    </td>
                    <td>
                      <label v-if="appoint.sideEfflevel != null"
                        >ระดับที่ {{ appoint.sideEfflevel }}</label
                      >
                      <label v-if="appoint.sideEfflevel == null"
                        >ยังไม่มีการบันทึก</label
                      >
                    </td>
                    <td>{{ appoint.note }}</td>
                  </tr>
                </tbody>
              </table>
              <div
                v-if="user.type == 'doctor'"
                class="d-grid gap-2 d-md-flex"
                style="display: flex; justify-content: flex-end; right: 0"
              >
                <button
                  v-if="t.treatmentStatus != 'สิ้นสุดแผนการรักษา'"
                  class="btn btn-warning"
                  :disabled="appointment.length != t.numberOfRound"
                  data-bs-target="#exampleModal"
                  data-bs-toggle="modal"
                >
                  เปลี่ยนสูตรยา
                </button>
                <button
                  v-if="t.treatmentStatus != 'สิ้นสุดแผนการรักษา'"
                  class="btn btn-success"
                  @click="endTreatment(t)"
                >
                  จบแผนการรักษา
                </button>
              </div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        เพิ่มแผนการรักษา
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3 row" style="text-align: left">
                        <label
                          for="inputFirstname"
                          class="col-sm-3 col-form-label"
                          >ชื่อ</label
                        >
                        <div class="col-sm-8">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            id="inputText"
                            v-model="patient.firstName"
                          />
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left">
                        <label
                          for="inputFirstname"
                          class="col-sm-3 col-form-label"
                          >นามสกุล</label
                        >
                        <div class="col-sm-8">
                          <input
                            disabled
                            type="text"
                            class="form-control"
                            id="inputText"
                            v-model="patient.lastName"
                          />
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left">
                        <label for="inputState" class="col-sm-3 col-form-label"
                          >สูตรยา</label
                        >
                        <div class="col-sm-8">
                          <select class="form-select" v-model="formula">
                            <option value="" disabled>กรุณาเลือกสูตรยา</option>
                            <option
                              v-for="formula in formulas"
                              :key="formula.formulaId"
                            >
                              {{ formula.formulaName }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left">
                        <label for="inputState" class="col-sm-3 col-form-label"
                          >แพทย์ผู้ดูแล</label
                        >
                        <div class="col-sm-8">
                          <select class="form-select" v-model="doctor">
                            <option value="" disabled>
                              กรุณาเลือกแพทย์ผู้ดูแล
                            </option>
                            <option v-for="doc in doctors" :key="doc.doctorId">
                              {{ doc.firstName }} {{ doc.lastName }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                        @click="goNo()"
                      >
                        ยกเลิก
                      </button>
                      <button
                        @click="changeFormula(t)"
                        type="button"
                        class="btn btn-success"
                        data-bs-dismiss="modal"
                      >
                        ตกลง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





    <div class="col-md-5 card" style="margin-left: 145px">
              <div class="card-header" style="background-color: #90eeb7">
                <b>ผลเลือด</b>
              </div>
              <div class="card-body">
                <table class="table">
                  <thead>
                    <tr class="table">
                      <th scope="col">ผลเลือด</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody class="table">
                    <tr v-for="blood in bloodresult" :key="blood.brId">
                      <td>{{ blood.picture }}</td>
                      <td>
                        <a
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal4"
                          @click="openIMG(blood)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-eye-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path
                              d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="modal fade"
              id="exampleModal4"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">ผลเลือด</h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="card-body" style="text-align: left">
                      <h5 class="col-sm-3" style="color: #0a6b3a"><b>รายงานผล</b></h5>
                      <div
                        class="mb-3"
                        style="
                          width: 80%;
                          height: 450px;
                          margin: auto;
                          background-color: white;
                          border: 1px solid #0a6b3a;
                        "
                      >
                        <img style="width: 100%; height: 100%" :src="this.img" />
                      </div>
                      <form style="margin-top: 10px">
                        <div class="row mb-3">
                          <label class="col-sm-2 col-form-label"><b>สถานะ : </b></label>
                          <div class="col-sm-4" style="text-align: left">
                            <div
                              class="col"
                              v-if="selectedBloodresult.status == 'รออนุมัติผลเลือด'"
                            >
                              <label
                                v-if="selectedBloodresult.status == 'อนุมัติผลเลือด'"
                                >{{ selectedBloodresult.status }}</label
                              >
                              <select
                                v-if="selectedBloodresult.status != 'อนุมัติผลเลือด'"
                                class="form-select"
                                v-model="status"
                              >
                                <option selected disabled>
                                  {{ selectedBloodresult.status }}
                                </option>
                                <option
                                  value="yes"
                                  :disabled="
                                    selectedBloodresult.status == 'อนุมัติผลเลือด'
                                  "
                                >
                                  อนุมัติผลเลือด
                                </option>
                                <option
                                  value="no"
                                  :disabled="
                                    selectedBloodresult.status == 'ส่งผลเลือดอีกครั้ง'
                                  "
                                >
                                  ส่งผลเลือดอีกครั้ง
                                </option>
                              </select>
                            </div>
                            <div
                              class="col"
                              v-if="
                                selectedBloodresult.status == 'อนุมัติผลเลือด' ||
                                selectedBloodresult.status == 'ส่งผลเลือดอีกครั้ง'
                              "
                            >
                              <label>{{ selectedBloodresult.status }}</label>
                            </div>
                          </div>
                        </div>
                        <div
                          class="row mb-3"
                          v-if="
                            status == 'yes' ||
                            selectedBloodresult.status == 'อนุมัติผลเลือด'
                          "
                        >
                          <label class="col-sm-2 col-form-label"><b>สูตรยา : </b></label>
                          <div class="col-sm-4" style="text-align: left">
                            {{ patient.formulaName }}
                            <div class="col"></div>
                          </div>
                        </div>
                        <div
                          class="row mb-3"
                          v-if="
                            status == 'yes' ||
                            selectedBloodresult.status == 'อนุมัติผลเลือด'
                          "
                        >
                          <label class="col-sm-2 col-form-label"><b>ชนิดยา : </b></label>
                          <div class="col-sm-10" style="text-align: left">
                            <div class="col">
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio1"
                                  v-model="medType"
                                  value="ฉีดเข้าเส้นเลือด"
                                />
                                <label class="form-check-label" for="inlineRadio1"
                                  >ชนิดฉีด</label
                                >
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadio2"
                                  v-model="medType"
                                  value="รับประทาน"
                                />
                                <label class="form-check-label" for="inlineRadio2"
                                  >ชนิดรับประทาน</label
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="row mb-3"
                          v-if="
                            status == 'yes' ||
                            selectedBloodresult.status == 'อนุมัติผลเลือด'
                          "
                        >
                          <div
                            class="col-sm-10"
                            style="text-align: left"
                            v-for="(med, index) in medicine"
                            :key="med.medId"
                          >
                            <div class="row g-3 align-items-center">
                              <div class="col-sm-4">
                                <label for="inputPassword6" class="col-form-label">{{
                                  med.medName
                                }}</label>
                              </div>
                              <div class="col-sm-3">
                                <div class="input-group mb-3">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="ปริมาณ"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    v-model="amount[index]"
                                  />
                                  <span class="input-group-text" id="basic-addon2"
                                    >มก.</span
                                  >
                                </div>
                              </div>
                              <div class="col-sm-2" v-if="medType == 'รับประทาน'">
                                <div class="input-group mb-3">
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="จำนวน"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    v-model="tab[index]"
                                  />
                                  <span class="input-group-text" id="basic-addon2"
                                    >เม็ด</span
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <label class="col-sm-3 col-form-label"><b>ข้อเสนอแนะ</b></label
                      ><br />
                      <label
                        class="form-control"
                        v-if="
                          selectedBloodresult.status != 'รออนุมัติผลเลือด' &&
                          selectedBloodresult.suggestion == null
                        "
                        >-</label
                      >
                      <label
                        class="form-control"
                        v-else-if="selectedBloodresult.status != 'รออนุมัติผลเลือด'"
                        >{{ selectedBloodresult.suggestion }}</label
                      >
                      <textarea
                        v-else-if="selectedBloodresult.status == 'รออนุมัติผลเลือด'"
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        v-model="suggestion"
                      ></textarea>
                
                    </div>
                  </div>
                  <div
                    class="modal-footer"
                    v-if="
                      selectedBloodresult.status == 'รออนุมัติผลเลือด' &&
                      user.type == 'doctor'
                    "
                  >
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                      ยกเลิก
                    </button>
                    <button
                      type="button"
                      class="btn btn-success"
                      data-bs-dismiss="modal"
                      @click="saveComment()"
                    >
                      ตกลง
                    </button>
                  </div>
                </div>
              </div>
            </div>













    <h3>กราฟแสดงข้อมูลผู้ป่วย</h3>
    <h4>{{ patient.prefix }}{{ patient.firstName }} {{ patient.lastName }}</h4>
    <div class="line-chart-container">
      <!-- <Line :data="datachartweight" :options="optioncharteffect" /> -->
      <Line :data="datacharteffect" :options="optionchartweight" />
      
      
    </div>

<!-- แปะไว้เฉยๆ -->
    <Bar id="my-chart-id-1" :options="chartOptions1" :data="chartData1" />
    <Radar :data="radarData" :options="radarOptions" />







    
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
  } from "chart.js";
import { Line, Radar, Bar } from "vue-chartjs";
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler
  );
export default {
  name: "DetailPatient",
  components: {
    Line,
    Radar,
    Bar
  },
  data() {
    return {
      chartOptions1: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามชนิดมะเร็ง",
            },
          },
        },
        chartData1: {
          labels: [
            "ครั้งที่1",
            "ครั้งที่2",
            "ครั้งที่3",
            "ครั้งที่4",
            "ครั้งที่5",
          ],
          datasets: [
            {
              label: "ผมร่วง",
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              data: [0, 1, 0, 0, 1],
            },
            {
              label: "ใจสั่น",
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              data: [0, 1, 0, 0, 1],
            },
            {
              label: "ครั่นเนื้อครั่นตัว",
              backgroundColor: "rgba(179,181,198,0.2)",
              data: [10, 1, 1, 1, 10],
            },
            {
              label: "เหนื่อยง่าย",
              backgroundColor: "rgba(255,99,132,0.2)",
              data: [10, 1, 10, 10, 10],
            },
            {
              label: "ใจสั่น",
              backgroundColor: "rgba(255,206,86,0.2)",
              data: [1, 10, 10, 10, 10],
            },
            {
              label: "วิงเวียนศีรษะ",
              backgroundColor: "rgba(75,192,192,0.2)",
              data: [1, 10, 10, 1, 1],
            },
            {
              label: "อาเจียน",
              backgroundColor: "rgba(153,102,255,0.2)",
              data: [10, 1, 10, 1, 1],
            },
          ],
        },
      radarData: {
          labels: [
            "ผมร่วง",
            "ใจสั่น",
            "ครั่นเนื้อครั่นตัว",
            "เหนื่อยง่าย",
            "วิงเวียนศีรษะ",
            "อาเจียน",
            "ผิวหนังสีเข้ม",
          ],
          datasets: [
            {
              label: "บันทึกผลข้างเคียงครั้งที่1",
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [0,0,1,0,1,0,1],
            },
            {
              label: "บันทึกผลข้างเคียงครั้งที่2",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [1,1,0,1,0,0,1],
            },
          ],
        },
        radarOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
      patient: [],
      formula: "",
      doctor: "",
      bloodresult: [],
      selectedBloodresult: [],
      img: "",
      status: "",
      note: "",
      appointment: [],
      medicine: [],
      amount: [],
      medType: "",
      tab: [],
      disease: "",
      usualMed: "",
      allergyMed: "",
      otherTreatment: "",
      patientDisease: [],
      giveMed: [],
      treatment: [],
      historyTreatment: [],
      doctors: [],
      formulas: [],
      cancerType: "",
      cancerState: "",
      infoCancer: [
        "มะเร็งปอด",
        "มะเร็งกระเพาะอาหาร",
        "มะเร็งลำไส้ใหญ่",
        "มะเร็งตับ",
        "มะเร็งตับอ่อน",
        "มะเร็งต่อมไทรอยด์",
        "มะเร็งไต",
        "มะเร็งกระเพาะปัสสาวะ",
        "มะเร็งอัณฑะ",
        "มะเร็งต่อมลูกหมาก",
        "มะเร็งถุงน้ำดี",
        "มะเร็งมดลูก",
        "มะเร็งเต้านม",
        "มะเร็งรังไข่",
      ],
      user: [],
      datachartweight: {
        labels: ['เดือนที่ 1', 'เดือนที่ 2', 'เดือนที่ 3', 'เดือนที่ 4', 'เดือนที่ 5', 'เดือนที่ 6', 'เดือนที่ 7'],
                datasets: [
                    {
                        label: 'ระดับความรุนแรง',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                        borderColor: 'rgba(75,192,192,1)',
                        data: [1, 4, 4, 3, 3, 2, 1],
                        fill: true
                    }
                ]
      },
      datacharteffect: {
        labels: ['สัปดาห์ที่ 1', 'สัปดาห์ที่ 2', 'สัปดาห์ที่ 3', 'สัปดาห์ที่ 4', 'สัปดาห์ที่ 5', 'สัปดาห์ที่ 6', 'สัปดาห์ที่ 7', 'สัปดาห์ที่ 8', 'สัปดาห์ที่ 9', 'สัปดาห์ที่ 10'],
                datasets: [
                    {
                        label: 'น้ำหนัก',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        borderColor: 'rgba(75,192,192,1)',
                        data: [1,1,1,0,1,1,1,0,1,0],
                        fill: true
                    },
                ]
      },
      optionchartweight: {
        responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'กราฟเส้นแสดงแนวโน้มน้ำหนักของผู้ป่วย'
                    }
                }
      },
      optioncharteffect: {
        responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'กราฟเส้นแสดงระดับความรุนแรงของผลข้างเคียง'
                    }
                }
      },
    };
  },
  mounted() {
    let userId = this.$route.params.userId;
    axios
      .get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        this.user = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
    const HN = this.$route.params.HN;
    const treatmentId = this.$route.params.treatmentId;
    axios
      .get(`http://localhost:8080/patient/${HN}/${treatmentId}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].treatmentId == treatmentId) {
            this.patient = response.data[i];
          }
        }
        let page =
          moment().format("YYYY") - this.patient.birthDate.split("-")[0];
        this.patient["age"] = page;
        axios
          .get(`http://localhost:8080/appointment/${HN}`)
          .then((response) => {
            this.patient["doctorName"] = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8080/myformula/${HN}/${treatmentId}`)
      .then((response) => {
        this.patient["formulaName"] = response.data[0].formulaName;
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`http://localhost:8080/getDiseases/${HN}`).then((response) => {
      if (response.data.length == 0) {
        this.patientDisease = [];
      } else {
        this.patientDisease = response.data[0];
      }
    });
    axios
      .get(`http://localhost:8080/AlltreatmentHistory/${HN}/${treatmentId}`)
      .then((response) => {
        this.appointment = response.data;
        for (let i = 0; i < this.appointment.length; i++) {
          this.appointment[i].thaiAppointDate = this.convertToThaiDate(
            this.appointment[i].appointDate
          );
          /*axios
            .get(`http://localhost:8080/myformula/${this.appointment[i].HN}/${this.appointment[i].treatmentId}`)
            .then((response) => {
              this.appointment[i].formulaName = response.data[0].formulaName;
            })
            .catch((error) => {
              console.log(error);
            });*/
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8080/giveMed/${HN}`)
      .then((response) => {
        this.giveMed = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8080/currentTreatment/${HN}/${treatmentId}`)
      .then((response) => {
        this.treatment = response.data;
        for (let i = 0; i < this.treatment.length; i++) {
          axios
            .get(
              `http://localhost:8080/treatmentDoctor/${this.treatment[i].doctorId}`
            )
            .then((response) => {
              this.treatment[i]["doctorName"] =
                response.data[0].firstName + " " + response.data[0].lastName;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8080/doctor`)
      .then((response) => {
        this.doctors = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8080/Allformula`)
      .then((response) => {
        this.formulas = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(`http://localhost:8080/bloodresult/patient/${HN}/${treatmentId}`)
      .then((response) => {
        if (response.data == "not found") {
          this.bloodresult = [];
        } else {
          this.bloodresult = response.data.filter((r) => {
            return r.status != "ยังไม่ส่งผลเลือด";
          });
          this.patient["status"] = this.bloodresult[0].status;
        }
        if (this.bloodresult[0].status == "อนุมัติผลเลือด") {
          axios
            .get(`http://localhost:8080/treatment/giveMed/${treatmentId}`)
            .then((response) => {
              console.log(response.data);
              for (let i = 0; i < response.data.length; i++) {
                this.amount.push(response.data[i].unit);
              }
              this.medType = response.data[0].medType;
              this.note = this.bloodresult[0].suggestion;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    openIMG(blood) {
      this.img = "http://localhost:8080/" + blood.picture;
      axios.get(`http://localhost:8080/getBloodresult/${blood.brId}`).then((response) => {
        this.selectedBloodresult = response.data;
        this.status = this.selectedBloodresult.status;
        this.suggestion = this.selectedBloodresult.suggestion;
      });
      const formulaId = this.patient.formulaId;
      axios
        .get(`http://localhost:8080/medicine/${formulaId}`)
        .then((response) => {
          this.medicine = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeFormula(t) {
      const treatmentId = t.treatmentId;
      if (
        this.cancerType != "" &&
        this.cancerState != "" &&
        this.formula != "" &&
        this.doctor != ""
      ) {
        axios
          .put(`http://localhost:8080/endTreatment/${treatmentId}`)
          .then((response) => {
            console.log(response.data);
            this.historyTreatment = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        const data = {
          cancerType: this.cancerType,
          cancerState: this.cancerState,
          firstName: this.patient.firstName,
          lastName: this.patient.lastName,
          formula: this.formula,
          doctor: this.doctor,
        };
        axios
          .post(`http://localhost:8080/createTreatment`, data)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "",
          text: "กรุณากรอกข้อมูลให้ครบ",
          icon: "warning",
        });
      }
    },
    endTreatment(t) {
      const treatmentId = t.treatmentId;
      let text = "คุณยืนยันที่จะจบแผนการรักษาหรือไม่";
      if (confirm(text) == true) {
        axios
          .put(`http://localhost:8080/endTreatment/${treatmentId}`)
          .then((response) => {
            Swal.fire({
              title: "",
              text: "จบแผนการรักษานี้แล้ว",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then((result) => {
              if (result.isConfirmed) {
                console.log(response.data);
                this.$router.go(this.$router.currentRoute);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    convertToThaiDate(date) {
      let splitDate = date.split("-");
      let day = splitDate[2].split("T")[0];
      let month = splitDate[1];
      let year = splitDate[0];
      let thDate = new Date(year, Number(month) - 1, day);
      const result = thDate.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return result;
    },
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
    goToBlood() {
      this.$router.push("/HomePage");
    },
    goToMedFor() {
      this.$router.push(`/MedFormular/${this.$route.params.userId}`);
    },
    goToPatient() {
      this.$router.push(`/YourPatients/${this.$route.params.userId}`);
    },
    goBack() {
      this.$router.push(`/YourPatients/${this.$route.params.userId}`);
    },
    goToReport() {
      this.$router.push("/ReportResult");
    },
    goTonewAppoint() {
      this.$router.push(`/appointmentView/${this.$route.params.userId}`);
    },
    goNo() {
      this.firstName = "";
      this.lastName = "";
      this.birthDate = "";
      this.phoneNumber = "";
      this.gender = "";
      this.cancerType = "";
      this.cancerState = "";
      this.formula = "";
      this.doctor = "";
    },
  },
  computed: {
    shouldDisplay() {
      return this.giveMed.filter((r) => {
        for (let i = 0; i < this.appointment.length; i++) {
          return r.appoint_no == this.appointment[i].appoint_no;
        }
      });
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

.line-chart-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 500px;
}
canvas {
    max-width: 45%;
    height: 400px !important;
}
</style>