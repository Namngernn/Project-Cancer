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
                <a class="nav-link" href="#" style="color: #ffffff">ลงทะเบียนผู้ป่วย</a>
              </li>
              <li
                class="nav-item"
                @click="goTonewHome()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a
                  class="nav-link"
                  aria-current="page"
                  href="#"
                  style="color: #ffffff; font-size: large"
                  >ผลเลือด</a
                >
              </li>
              <li
                class="nav-item"
                @click="goTonewAppoint()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link active" href="#" style="color: #ffffff">นัดหมาย</a>
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
            <button
              type="button"
              style="margin-bottom: 20px"
              class="btn btn-outline-success"
              @click="goTonewAppoint()"
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
                <div class="col-4"><b>HN</b> <div>{{ patient.HN }}</div></div>
                <div class="col-4">
                  <b>เลขบัตรประจำตัวประชาชน</b> <div>{{ patient.IDcard }}</div>
                </div>
                <div class="col-4">
                  <b>ชื่อ-นามสกุล </b> <div>{{patient.prefix}}{{ patient.firstName }} {{ patient.lastName }}</div>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 20px">
              <div class="row g-0">
                <div class="col-4"><b>เพศ </b> <div>{{ patient.gender }}</div></div>
                <div class="col-4"><b>อายุ </b> <div>{{ patient.age }} ปี</div></div>
                <div class="col-4">
                  <b>หมายเลขโทรศัพท์ </b><div>{{ patient.phoneNumber }}</div>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 40px">
              <div class="row g-0">
                <div class="col-4">
                  <b>ชนิดมะเร็ง</b> :
                  <div v-for="i in patient.cancer" :key="i.cancerId">
                    {{ i.cancerType }} ระยะที่ {{ i.cancerState }}
                  </div>
                  

                </div>
                <div class="col-4">
                  <b>แพทย์ผู้ดูแล </b> <div>{{ doctor.firstName }} {{ doctor.lastName }}</div>
                </div>
              </div>
            </div>
            <div v-for="t in treatment" :key="t.treatmentId">
              <div class="row g-0">
                <div class="col-4"><b>สูตรยา : </b>{{ t.formulaName }}</div>
                <div class="col-4"><b>แพทย์ผู้ดูแล : </b>{{ t.doctor }}</div>
              </div>
              <br />
              <table class="table" style="margin-bottom: 30px">
                <thead>
                  <tr class="table table-primary">
                    <th class="col-2" scope="col">วันที่รับยา</th>
                    <th scope="col">ครั้งที่</th>
                    <th scope="col">ยาที่ต้องได้รับ</th>
                    <th scope="col">ผู้ให้ยา</th>
                    <th scope="col">หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody class="table">
                  <tr v-for="app in appointment" :key="app.appointId">
                    <td>
                      <button
                        type="button"
                        class="btn btn-sucess"
                        style="padding-top: 0px"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-calendar-week"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"
                          />
                          <path
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
                          />
                        </svg>
                      </button>
                      {{ app.thaiAppointDate }}
                    </td>
                    <td>{{ app.appoint_no }}</td>
                    <td>
                      <div class="row" v-for="s in shouldDisplay" :key="s.appointId">
                        {{ s.medName }} {{ s.unit }} มก. <br />
                      </div>
                    </td>
                    <td>
                      <label v-if="app.medGiver == null">
                        <select class="form-select" v-model="medGiver">
                          <option value="" disabled>กรุณาระบุผู้ให้ยา</option>
                          <option v-for="giver in chemist" :key="giver.userId">
                            {{ giver.firstName }} {{ giver.lastName }}
                          </option>
                        </select>
                      </label>
                      <label v-if="app.medGiver != null"> {{ app.medGiver }} </label>
                    </td>
                    <td>
                      <label v-if="app.medGiver == null"
                        ><input class="form-control" type="text" v-model="note"
                      /></label>
                      <label v-if="app.medGiver != null && app.note != ''"
                        >{{ app.note }}
                      </label>
                      <label v-if="app.medGiver != null && app.note == null"> - </label>
                    </td>
                    <td>
                      <button
                        v-if="app.medGiver == null && user.type == 'chemist'"
                        @click="saveGiveMed(app)"
                        type="button"
                        class="btn btn-success"
                        style="margin-left: 5px; margin-right: -40px"
                      >
                        บันทึก
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="d-grid d-md-flex justify-content-md-end">
              <button
                v-if="
                  patient.numberOfRound != this.appointment.length && user.type == 'nurse'
                "
                type="button"
                class="btn btn-success"
                style="margin-left: 5px; margin-right: 10px"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                  />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                  />
                </svg>
                เพิ่มนัดหมาย
              </button>
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
                        <b>กำหนดนัดหมาย</b>
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3 row">
                        <label for="exampleFormControlInput1" class="col-sm-4 form-label"
                          >เลือกวันที่นัดหมาย</label
                        >
                        <div class="col-sm-8">
                          <VueDatePicker
                            v-model="date"
                            :enable-time-picker="false"
                            placeholder="กรุณาระบุวัน"
                            selectText="เลือก"
                            cancelText="ยกเลิก"
                            :locale="date - fns / locale / th"
                            lang="th"
                            format="dd/MM/yyyy"
                            :min-date="new Date()"
                            :disabled-week-days="[6, 0]"
                          />
                        </div>
                      </div>
                      <div class="mb-3 row">
                        <label for="exampleFormControlInput1" class="col-sm-4 form-label"
                          >เลือกเวลาที่นัดหมาย</label
                        >

                        <div class="col-sm-8">
                          <VueDatePicker
                            v-model="time"
                            time-picker
                            placeholder="กรุณาระบุเวลา"
                            selectText="เลือก"
                            cancelText="ยกเลิก"
                          >
                            <template #input-icon>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-clock input-slot-image"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                                />
                                <path
                                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
                                />
                              </svg>
                            </template>
                          </VueDatePicker>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="button"
                        class="btn btn-success"
                        data-bs-dismiss="modal"
                        @click="addAppoint"
                      >
                        ตกลง
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-warning me-md-2"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal10"
              >
                ดูบันทึกผลข้างเคียง
              </button>
            </div>

            <!--แสดง feedback ของแต่ละนัดหมาย-->
            <div
              class="modal fade"
              id="exampleModal10"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      บันทึกเคมีบำบัด
                    </h1>
                    <button
                      type="button"
                      @click="selectedFeedback = []"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3 row" v-for="f in feedbacks" :key="f.feedbackId">
                      <label for="exampleFormControlInput1" class="col-sm-10 form-label"
                        ><b>ครั้งที่ {{ f.appoint_no }} </b>
                        <p v-if="f.sideEfflevel != null">พยาบาลบันทึกผลข้างเคียงแล้ว</p>
                        <p v-else-if="f.patientSideEffect != null">
                          ผู้ป่วยบันทึกผลข้างเคียงแล้ว
                        </p>
                        <p v-else-if="f.sendAt == null && f.sideEfflevel == null">
                          ไม่มีบันทึกผลข้างเคียง
                        </p>
                        <p v-else-if="f.sendAt != null">(ส่งเมื่อ {{ f.sendAt }})</p>
                      </label>
                      <div class="col">
                        <button
                          data-bs-toggle="modal"
                          @click="openFeedback(f)"
                          data-bs-target="#exampleModal"
                          type="button"
                          class="btn btn-primary"
                          style="margin-left: 5px; margin-right: -20px"
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
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--พยาบาลกรอกผลข้างเคียง ในแต่ละครั้ง-->

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      data-bs-target="#exampleModal10"
                      data-bs-toggle="modal"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="card" style="margin-bottom: 30px">
                      <div class="card-body">
                        <div class="container">
                          <div class="row">
                            <div class="col-6">
                              <div class="mb-3 row" style="text-align: left">
                                <p class="fs-6 fw-bold text-decoration-underline">
                                  บันทึกผลข้างเคียง(คนไข้)
                                </p>
                              </div>
                              <div class="mb-3 row" style="text-align: left">
                                <p class="fs-6 fw-bold">
                                  วันที่รับยา {{ selectedFeedback.thaiAppointDate }}
                                </p>
                              </div>
                              <div class="mb-3 row" style="text-align: left">
                                <label for="inputMedFor" class="col-sm-3 col-form-label"
                                  ><b>สูตรยา</b></label
                                >
                                <div class="col-sm-8">
                                  <label
                                    for="inputMedFor"
                                    class="col-sm-9 col-form-label"
                                    >{{ selectedFeedback.formulaName }}</label
                                  >
                                </div>
                              </div>
                              <div class="mb-3 row" style="text-align: left">
                                <label for="inputMedFor" class="col-sm-3 col-form-label"
                                  ><b>ประกอบด้วย</b></label
                                >
                                <div class="col-sm-9">
                                  <div
                                    class="row"
                                    v-for="s in shouldDisplay"
                                    :key="s.medId"
                                  >
                                    <div class="col-sm-7" style="text-align: left">
                                      <label
                                        for="inputMedFor"
                                        class="col-sm-12 col-form-label"
                                        >{{ s.medName }}</label
                                      >
                                    </div>
                                    <div class="col-sm-2" style="text-align: left">
                                      <label
                                        for="inputMedFor"
                                        class="col-sm-12 col-form-label"
                                        >{{ s.unit }}
                                      </label>
                                    </div>
                                    <div class="col-sm-2" style="text-align: left">
                                      <label
                                        for="inputMedFor"
                                        class="col-sm-12 col-form-label"
                                        >มก.</label
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="mb-3 row">
                                <div class="row">
                                  <b>ผลข้างเคียง</b>
                                </div>
                                <div class="row">
                                  <label v-if="selectedFeedback.patientSideEffect == null"
                                    >-</label
                                  >
                                  <label
                                    v-if="selectedFeedback.patientSideEffect != null"
                                    >{{ selectedFeedback.patientSideEffect }}</label
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="mb-3 row" style="text-align: left">
                                <p class="fs-6 fw-bold text-decoration-underline">
                                  บันทึกผลข้างเคียง(พยาบาล)
                                </p>
                              </div>
                              <div class="mb-3 row" style="text-align: left">
                                <label for="inputMedFor" class="col-sm-4 col-form-label"
                                  ><b>ระดับผลข้างเคียง</b></label
                                >
                                <div class="col-sm-6">
                                  <input
                                    v-if="
                                      selectedFeedback.sideEfflevel == null ||
                                      this.edit == true
                                    "
                                    type="text"
                                    class="form-control"
                                    list="sideEff"
                                    v-model="sideEffLevel"
                                  />
                                  <p
                                    style="margin-top: 10px"
                                    v-else-if="selectedFeedback.sideEfflevel != null"
                                  >
                                    {{ selectedFeedback.sideEfflevel }}
                                  </p>
                                  <datalist id="sideEff">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </datalist>
                                </div>
                                <div
                                  class="col-sm-2"
                                  v-if="selectedFeedback.sideEfflevel != null"
                                >
                                  <button
                                    v-if="user.type == 'nurse' || user.type == 'doctor'"
                                    type="button"
                                    class="btn btn-warning"
                                    @click="this.edit = true"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      class="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="
                                (selectedFeedback.sideEfflevel == null || edit == true) &&
                                user.type == 'nurse'
                              "
                              class="d-grid gap-2 d-md-flex"
                              style="display: flex; justify-content: flex-end"
                            >
                              <button
                                class="btn btn-success me-md-2"
                                type="button"
                                @click="completeFeedback(selectedFeedback)"
                              >
                                บันทึก
                              </button>
                              <button
                                @click="this.edit = false"
                                class="btn btn-danger"
                                type="button"
                              >
                                ยกเลิก
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  name: "DetailAppoint",
  components: { VueDatePicker },
  data() {
    return {
      date: "",
      formula: "",
      appointment: [],
      doctor: [],
      note: null,
      user: [],
      selectAppoint: [],
      feedbacks: [],
      selectedFeedback: [],
      medGiver: "",
      selectedAppoint: [],
      selectGiveMed: [],
      giveMed: [],
      patient: [],
      treatment: [],
      chemist: [],
      sideEffLevel: "",
      time: [],
      edit: "false",
    };
  },
  mounted() {
    const HN = this.$route.params.HN;
    const treatmentId = this.$route.params.treatmentId;
    axios
      .get(`http://localhost:3000/user/${this.$route.params.userId}`)
      .then((response) => {
        this.user = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/thisappointment/${HN}/${treatmentId}`)
      .then((response) => {
        this.appointment = response.data;
        for (let i = 0; i < this.appointment.length; i++) {
          this.appointment[i].thaiAppointDate = this.convertToThaiDate(
            this.appointment[i].appointDate
          );
          axios
            .get(
              `http://localhost:3000/myformula/${
                this.appointment[i].HN / this.appointment[i].treatmentId
              }`
            )
            .then((response) => {
              this.appointment[i].formulaName = response.data[0].formulaName;
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
      .get(`http://localhost:3000/giveMed/${treatmentId}`)
      .then((response) => {
        this.giveMed = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/patient/${HN}/${treatmentId}`)
      .then((response) => {
        this.patient = response.data[0];
        let page = moment().format("YYYY") - this.patient.birthDate.split("-")[0];
        this.patient["age"] = page;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/doctor/${HN}`)
      .then((response) => {
        this.doctor = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/currentTreatment/${HN}/${treatmentId}`)
      .then((response) => {
        this.treatment = response.data;
        this.patient["numberOfRound"] = response.data[0].numberOfRound;
        for (let i = 0; i < this.treatment.length; i++) {
          axios
            .get(`http://localhost:3000/treatmentDoctor/${this.treatment[i].doctorId}`)
            .then((response) => {
              this.treatment[i]["doctor"] =
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
      .get(`http://localhost:3000/chemist`)
      .then((response) => {
        this.chemist = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/treatmentFeedback/${treatmentId}`)
      .then((response) => {
        this.feedbacks = response.data;
        for (let i = 0; i < this.feedbacks.length; i++) {
          this.feedbacks[i].thaiAppointDate = this.convertToThaiDate(
            this.feedbacks[i].appointDate
          );
          axios
            .get(
              `http://localhost:3000/myformula/${this.feedbacks[i].HN}/${this.feedbacks[i].treatmentId}`
            )
            .then((response) => {
              this.feedbacks[i].formulaName = response.data[0].formulaName;
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
    openFeedback(feedback) {
      this.selectedFeedback = feedback;
    },
    saveGiveMed(app) {
      if (this.medGiver != "") {
        const data = {
          appointId: app.appointId,
          medGiver: this.medGiver,
          note: this.note,
          HN: this.$route.params.HN,
        };
        axios
          .post(`http://localhost:3000/saveGiveMed`, data)
          .then((response) => {
            this.appointment = response.data;
            for (let i = 0; i < this.appointment.length; i++) {
              this.appointment[i].thaiAppointDate = this.convertToThaiDate(
                this.appointment[i].appointDate
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาระบุผู้ให้ยา",
          icon: "warning",
        });
      }
    },
    selectedAppointment(appoint) {
      this.selectAppoint = appoint;
      const data = {
        treatmentId: appoint.treatmentId,
      };
      axios
        .post(`http://localhost:3000/appointment/giveMed`, data)
        .then((response) => {
          this.selectGiveMed = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    completeAppointment() {
      const data = {
        medGiver: this.medGiver,
        note: this.note,
        appointId: this.selectAppoint.appointId,
      };
      axios
        .post(`http://localhost:3000/completeAppoint`, data)
        .then((response) => {
          this.appointment = response.data;
          for (let i = 0; i < this.appointment.length; i++) {
            this.appointment[i].thaiAppointDate = this.convertToThaiDate(
              this.appointment[i].appointDate
            );
          }
          Swal.fire({
            title: "",
            text: "บันทึกการให้ยาเคมีบำบัด",
            icon: "success",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    completeFeedback(feedback) {
      if (this.sideEffLevel != "") {
        const data = {
          feedbackId: feedback.feedbackId,
          sideEffLevel: this.sideEffLevel,
          treatmentId: this.$route.params.treatmentId,
        };
        axios
          .post(`http://localhost:3000/completeFeedback`, data)
          .then((response) => {
            this.feedbacks = response.data;
            for (let i = 0; i < this.feedbacks.length; i++) {
              this.feedbacks[i].thaiAppointDate = this.convertToThaiDate(
                this.feedbacks[i].appointDate
              );
              axios
                .get(
                  `http://localhost:3000/myformula/${this.feedbacks[i].HN}/${this.feedbacks.treatmentId}`
                )
                .then((response) => {
                  this.feedbacks[i].formulaName = response.data[0].formulaName;
                })
                .catch((error) => {
                  console.log(error);
                });
            }
            let result = this.feedbacks.filter((r) => {
              return r.feedbackId == feedback.feedbackId;
            });
            console.log(result);
            this.selectedFeedback = result[0];
            this.selectedFeedback.thaiAppointDate = this.convertToThaiDate(
              this.selectedFeedback.appointDate
            );
            this.edit = false;
            Swal.fire({
              title: "",
              text: "บันทึกระดับผลข้างเคียงสำเร็จ",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
          icon: "warning",
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
    addAppoint() {
  // ปิด Swal ถ้ามีการแสดงผลก่อนหน้านี้
    Swal.close();
    
    // ตรวจสอบว่ามีการกำหนดข้อมูลที่จำเป็นครบถ้วนหรือไม่
    if (!this.date || !this.time || !this.time.hours || !this.time.minutes) {
      Swal.fire({
        title: "",
        text: "ข้อมูลไม่ครบถ้วน กรุณาตรวจสอบ",
        icon: "warning",
      });
      return;
    }

    const data = {
      date:
        moment(this.date).format("YYYY-MM-DD") +
        " " +
        this.time.hours +
        ":" +
        this.time.minutes +
        ":00",
      HN: this.$route.params.HN,
      treatmentId: this.$route.params.treatmentId,
    };

    // ใช้สถานะเพื่อไม่ให้มีการเรียกใช้งานซ้ำ
    if (this.isProcessing) {
      return; // หากกำลังทำงานอยู่จะไม่ทำอะไร
    }
    
    this.isProcessing = true; // กำหนดสถานะกำลังทำงาน

    // ส่งคำขอ axios
    axios
      .post(`http://localhost:3000/appointDate/${this.patient.UserIdLine}`, data)
      .then((response) => {
        this.appointment = response.data;
        for (let i = 0; i < this.appointment.length; i++) {
          this.appointment[i].thaiAppointDate = this.convertToThaiDate(
            this.appointment[i].appointDate
          );
        }
        
        // แสดง Swal เมื่อเพิ่มนัดหมายสำเร็จ
        Swal.fire({
          title: "",
          text: response.data.message,
          icon: response.data.message === 'เพิ่มนัดหมายสำเร็จ' ? 'success' : (response.data.message === 'ไม่สามารถนัดหมายกรุณาเลือกวันนัดหมายใหม่' ? 'warning' : 'info'),
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.isProcessing = false; // รีเซ็ตสถานะหลังจากการทำงานเสร็จ
      });
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
    goToDetailapp() {
      this.$router.push(`/DetailAppoint/${this.$route.params.userId}`);
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
    goTonewAppoint() {
      this.$router.push(`/appointmentView/${this.$route.params.userId}`);
    },
  },
  computed: {
    shouldDisplay() {
      return this.giveMed.filter((r) => {
        for (let i = 0; i < this.appointment.length; i++) {
          console.log(r);
          return r.appoint_no == this.appointment[i].appoint_no;
        }
      });
    },
  },
};
</script>

<style>
.input-slot-image {
  height: 20px;
  width: auto;
  margin-left: 5px;
}

.proceed {
  text-align: center;
  background-color: #b1d8b7;
  border-radius: 20px;
}

.menu {
  background-color: white;
  padding: 2vh;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 90vh;
  margin-top: 20px;
}

.pic-icon {
  width: 4vh;
  height: 4vh;
}

.logo {
  width: 6vh;
  float: left;
  margin-right: 5px;
}

.menu-list {
  font-size: 2.5vh;
  text-align: center;
  padding-top: 10px;
}

.chart-table {
  margin-top: 50px;
  margin-right: 20px;
  padding: 3vh;
}

.head-chart-table {
  background-color: #b1d8b7;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
}

.body-chart-table {
  background-color: white;
}
</style>
