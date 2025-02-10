<template>
  <div class="row g-0 text-center">
    <nav style="background-color: #1c2939">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <ul class="nav nav-underline">
              <li v-if="user.type == 'nurse'"
                class="nav-item"
                @click="goToRegis()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff"
                  >ลงทะเบียนผู้ป่วย</a
                >
              </li>
              <li
                class="nav-item"
                @click="goTonewHome()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">การอนุมัติผลเลือด</a>
              </li>
              <li
                class="nav-item"
                @click="goTonewAppoint()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  style="color: #ffffff; font-size: large"
                  >นัดหมาย</a
                >
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
              <li
                class="nav-item"
                @click="goToExportimport()"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="#" style="color: #ffffff">นำเข้าส่งออกข้อมูล</a>
              </li>
              <li
                class="nav-item"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="http://localhost:8080/dashboardview" target="_blank" style="color: #ffffff">ข้อมูลสถิติผู้ป่วย</a>
              </li>


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
            </ul>
          </div>
          
        </div>
      </div>
    </nav>
    <div class="col-md-10 offset-md-1">
      <div class="bd-example-snippet bd-code-snippet" style="border: none">
        <div class="card" style="margin: 20px">
          <div class="card-body" style="text-align: left; padding: 30px">
            <div class="container">
              <div class="row" v-if="user.type=='nurse'">
                <div class="col-12">
                  <h6>
                    <b><u>ขอเลื่อนนัดหมาย</u></b>
                  </h6>
                  <div
                    data-bs-spy="scroll"
                    data-bs-target="#navbar-example2"
                    data-bs-root-margin="0px 0px -40%"
                    data-bs-smooth-scroll="true"
                    class="scrollspy-example bg-body-tertiary p-3 rounded-2"
                    tabindex="0"
                    style="margin-bottom: 30px; height: 190px"
                  >
                    <!--<p>ไม่มีรายการ</p>-->
                    <div
                      class="row g-0 bg-body-secondary position-relative"
                      style="padding: 20px; border-radius: 10px; margin-bottom: 20px"
                      v-for="req in request"
                      :key="req.requestId"
                    >
                      <div class="col-md-12">
                        <p class="mt-0">
                          <b>{{ req.firstName }} {{ req.lastName }}</b>
                        </p>
                        <div class="row">
                          <p class="col-md-3">HN {{ req.HN }}</p>
                          <p class="col-md-4">{{ req.cancerType }}</p>
                          <p class="col-md-5">{{ req.doctorName }}</p>
                        </div>
                        <button
                          @click="openRequest(req)"
                          type="button"
                          class="btn"
                          style="background-color: #34495e; color: white"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal8"
                        >
                          ดูรายละเอียด
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-chevron-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </button>
                        <div
                          class="modal fade"
                          id="exampleModal8"
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
                                  <b>ขอเลื่อนนัดหมาย</b>
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
                                    ><b>วันที่:</b></label
                                  >
                                  <div class="col-sm-8">
                                    <label
                                      for="inputFirstname"
                                      class="col-sm-6 col-form-label"
                                      >{{ selectedRequest.thaiNewappointDate }}</label
                                    >
                                  </div>
                                </div>
                                <div class="mb-3 row" style="text-align: left">
                                  <label
                                    for="inputFirstname"
                                    class="col-sm-3 col-form-label"
                                    ><b>เวลา:</b></label
                                  >
                                  <div class="col-sm-8">
                                    <label
                                      for="inputFirstname"
                                      class="col-sm-6 col-form-label"
                                      >{{ selectedRequest.time }} น.</label
                                    >
                                  </div>
                                </div>
                                <div class="mb-3 row" style="text-align: left">
                                  <label
                                    for="inputFirstname"
                                    class="col-sm-3 col-form-label"
                                    ><b>เหตุผล:</b></label
                                  >
                                  <div class="col-sm-8">
                                    <label
                                      for="inputFirstname"
                                      class="col-sm-6 col-form-label"
                                      >{{ selectedRequest.reason }}</label
                                    >
                                  </div>
                                </div>
                                <div class="mb-3 row" style="text-align: left">
                                  <label
                                    for="inputFirstname"
                                    class="col-sm-3 col-form-label"
                                    ><b>เบอร์โทรศัพท์:</b></label
                                  >
                                  <div class="col-sm-8">
                                    <label
                                      for="inputFirstname"
                                      class="col-sm-6 col-form-label"
                                    >
                                      {{ selectedRequest.requestPhone }}</label
                                    >
                                  </div>
                                </div>
                                <div class="mb-3 row" style="text-align: left">
                                  <label
                                    for="inputFirstname"
                                    class="col-sm-3 col-form-label"
                                    ><b>อีเมล:</b></label
                                  >
                                  <div class="col-sm-8">
                                    <label
                                      for="inputFirstname"
                                      class="col-sm-6 col-form-label"
                                    >
                                      {{ selectedRequest.email }}</label
                                    >
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button @click="cantPostpone(selectedRequest)"
                                  type="button"
                                  class="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  ไม่สามารถเลื่อนนัดหมายได้
                                </button>
                                <button
                                  @click="postponeAppoint(selectedRequest)"
                                  type="button"
                                  class="btn btn-success"
                                  data-bs-dismiss="modal"
                                >
                                  ยืนยันการเลื่อนนัดหมาย
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--
                <div class="col-6">
                  <h6><b><u>กำหนดนัดหมายสำหรับเริ่มแผนการรรักษา</u></b></h6>
                  <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%"
                    data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0"
                    style="margin-bottom: 30px; height: 190px;">
                    <div class="row g-0 bg-body-secondary position-relative"
                      style="padding: 20px; border-radius: 10px; margin-bottom:10px;"
                      v-for="appoint in appointAppointment" :key="appoint.appointId">
                      <p>ไม่มีรายการ</p>
                      <div class="col-md-12">
                        <p class="mt-0"><b>{{ appoint.firstName }} {{ appoint.lastName }}</b></p>
                        <div class="row">
                          <p class="col-md-4">HN {{ appoint.HN }}</p>
                          <p class="col-md-6">{{ appoint.cancerType }}</p>
                        </div>
                        <button @click="openAppoint(appoint)" type="button" class="btn"
                          style="background-color: #34495E; color: white;" data-bs-toggle="modal"
                          data-bs-target="#exampleModal6">
                          กำหนดนัดหมาย
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                        <div class="modal fade" id="exampleModal6" tabindex="-1" aria-labelledby="exampleModalLabel"
                          aria-hidden="true">
                          <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                              <div class="modal-header" style="background-color: #90eeb7;">
                                <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: #1C2939;">
                                  <b>กำหนดนัดหมาย</b>
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                  aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                <div class="mb-3 row">
                                  <label for="exampleFormControlInput1"
                                    class="col-sm-4 form-label">เลือกวันที่นัดหมาย</label>
                                  <div class="col-sm-8">
                                    <VueDatePicker v-model="date" :enable-time-picker="false" placeholder="กรุณาระบุวัน"
                                      selectText="เลือก" cancelText="ยกเลิก" :locale="date - fns / locale / th"
                                      lang="th" format="dd/MM/yyyy" :min-date="new Date()"
                                      :disabled-week-days="[6, 0]" />
                                  </div>
                                </div>
                                <div class="mb-3 row">
                                  <label for="exampleFormControlInput1"
                                    class="col-sm-4 form-label">เลือกเวลานัดหมาย</label>
                                  <div class="col-sm-8">
                                    <VueDatePicker v-model="time" time-picker placeholder="กรุณาระบุเวลา"
                                      selectText="เลือก" cancelText="ยกเลิก">
                                      <template #input-icon>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                          fill="currentColor" class="bi bi-clock input-slot-image" viewBox="0 0 16 16">
                                          <path
                                            d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                          <path
                                            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                        </svg>
                                      </template>
                                    </VueDatePicker>
                                  </div>

                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">ยกเลิก</button>
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                                  @click="addAppoint">ตกลง</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>-->
              </div>
              <div class="row">
                <div class="col-12">
                  <div
                    class="card-header"
                    style="background-color: #90eeb7; padding: 20px"
                  >
                    <nav class="navbar">
                      <div class="container-fluid">
                        <form class="d-flex" role="search">
                          <input
                            class="form-control me-2 col-md-4"
                            type="search"
                            placeholder="ค้นหา"
                            aria-label="Search"
                            v-model="selectAppointPatient"
                          />
                          <button
                            class="btn"
                            type="button"
                            style="background-color: #0a6b3a; color: white"
                            @click="selectedAppointedPatient"
                          >
                            ค้นหา
                          </button>
                        </form>
                        <div class="dropdown">
                          <select
                            class="form-select"
                            v-model="sortAppoint"
                            @change="sortPosts($event)"
                          >
                            <option disabled>เรียงลำดับตามการนัดหมายล่าสุด</option>
                            <option value="1">เรียงลำดับตามการนัดหมายล่าสุด</option>
                            <option value="2">ชื่อ-นามสกุล จาก ก ถึง ฮ</option>
                            <option value="3">ชื่อ-นามสกุล จาก ฮ ถึง ก</option>
                            <option value="4">เรียงลำดับตาม HN</option>
                          </select>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <div
                    class="card-body"
                    style="text-align: left; padding: 30px; background-color: #f7f6f6"
                  >
                    <div
                      class="row g-0 position-relative"
                      style="margin-bottom: 20px"
                      v-for="(appoint, index) in posts"
                      :key="index"
                    >



                      <div
                        
                        class="col-md-12 p-3 ps-md-4 bd-callout bd-callout-success"
                        style="
                          background-color: white;
                          color: black;
                          border-left: 0.5rem solid #146c43;
                        "
                      >
                        <div class="col-md-12">
                          <div class="row" style="display: flex; justify-content: center;  text-align: center; align-items: center;">
                            <p class="col-md-3">
                              {{ appoint.thaiAppointDate }} {{ appoint.thaiTime }} 
                            </p>
                            <p class="col-md-2">HN {{ appoint.HN }}</p>
                            <p class="col-md-3">
                              {{ appoint.firstName }} {{ appoint.lastName }} 
                            </p>
                            
                            <p class="col-md-2">สูตรยา {{ appoint.formulaName }}</p>
                            <button
                              type="button"
                              class="btn"
                              @click="goToDetailapp(appoint)"
                              style="
                                background-color: #34495e;
                                color: white;
                                width: 100px;
                                height: 50px;
                              "
                            >
                              เพิ่มเติม
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-chevron-right"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>




                      
                    </div>

                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">
                        <li class="page-item">
                          <a
                            class="page-link"
                            href="#"
                            style="color: #0a6b3a"
                            v-if="page != 1"
                            @click="page--"
                            >Previous</a
                          >
                        </li>
                        <li class="page-item">
                          <a
                            class="page-link"
                            href="#"
                            style="color: #0a6b3a; display: inline-block"
                            v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)"
                            :key="index"
                            @click="page = pageNumber"
                            >{{ pageNumber }}</a
                          >
                        </li>
                        <li class="page-item">
                          <a
                            class="page-link"
                            href="#"
                            style="color: #0a6b3a"
                            @click="page++"
                            v-if="page < pages.length"
                            >Next</a
                          >
                        </li>

                        
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>





    <a class="nav-link" href="http://localhost:3000/calendarappointment" target="_blank">
      <h1 >CALENDAR</h1>
    </a>


  </div>
</template>



<script>
import axios from "axios";
//import moment from "moment";
//import VueDatePicker from '@vuepic/vue-datepicker';
import "@vuepic/vue-datepicker/dist/main.css";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  name: "appointmentView",
  //components: { VueDatePicker },
  data() {
    return {
      date: "",
      showOverlay: false,
      showOverlay1: false,
      isActive: "",
      appointAppointment: [],
      selected: "",
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      Allformula: [],
      formula: "",
      appointment: [],
      doctor: [],
      medicine: [],
      patient_name: "",
      amount1: [],
      formulasmedicine: [],
      note: null,
      side_eff_level: null,
      chemist: "",
      sortStatus: "สถานะ",
      user: [],
      selectAppoint: [],
      checkDate: "",
      appointCalendar: [],
      request: [],
      feedbacks: [],
      selectedRequest: [],
      selectAppointPatient: "",
      chemposts: [],
      chempage: 1,
      chemperPage: 10,
      chempages: [],
      medGiver: "",
      selectedAppoint: [],
      selectGiveMed: [],
      time: [],
      sortAppoint: "เรียงลำดับตามการนัดหมายล่าสุด",
      checkFormula: [],
    };
  },
  mounted() {
    let userId = this.$route.params.userId
    axios.get(`http://localhost:3000/user/${userId}`).then((response) => {
      this.user = response.data[0]
    }).catch((error) => {
      console.log(error)
    })
    axios
      .get(`http://localhost:3000/allFeedback`)
      .then((response) => {
        this.chemposts = response.data;
        for (let i = 0; i < this.chemposts.length; i++) {
          this.chemposts[i].time = this.chemposts[i].appointDate.split(" ")[1];
          this.chemposts[i].thaiAppointDate = this.convertToThaiDate(
            this.chemposts[i].appointDate
          );
          axios
            .get(`http://localhost:3000/myformula/${this.chemposts[i].HN}/${this.chemposts[i].treatmentId}`)
            .then((response) => {
              this.chemposts[i].formulaName = response.data[0].formulaName;
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
      .get(`http://localhost:3000/appoint/appointment`)
      .then((response) => {
        this.appointAppointment = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/Allformula`)
      .then((response) => {
        this.checkFormula = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/AllAppointment`)
      .then((response) => {
        this.posts = response.data;
        for (let i = 0; i < this.posts.length; i++) {
          let formula = this.checkFormula.filter((r) => {
            return r.formulaId == this.posts[i].formulaId;
          });
          if (
            this.posts[i].appoint_no == formula[0].numberOfRound &&
            this.posts[i].medGiver != null
          ) {
            this.posts[i].thaiAppointDate = "ครบรอบการรับยาแล้ว";
          } else if (
            this.posts[i].appointDate == null ||
            this.posts[i].medGiver != null
          ) {
            this.posts[i].thaiAppointDate = "ยังไม่ได้นัดหมาย";
          } else if (this.posts[i].medGiver == null) {
            this.posts[i].time = this.posts[i].appointDate.split(" ")[1];
            this.posts[i].thaiTime = this.convertToThaiTime(this.posts[i].appointDate);
            this.posts[i].thaiAppointDate = this.convertToThaiDate(
              this.posts[i].appointDate
            );
          }
          axios
            .get(`http://localhost:3000/formulaName/${this.posts[i].formulaId}`)
            .then((response) => {
              this.posts[i].formulaName = response.data;
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
      .get(`http://localhost:3000/formula`)
      .then((response) => {
        this.Allformula = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/formula/medicine`)
      .then((response) => {
        this.medicine = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/request`)
      .then((response) => {
        this.request = response.data;
        for (let i = 0; i < this.request.length; i++) {
          this.request[i].thaiAppointDate = this.convertToThaiDate(
            this.request[i].appointDate
          );
          axios
            .get(`http://localhost:3000/doctor/${response.data[i].HN}`)
            .then((response) => {
              this.request[i].doctorName =
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
  },
  methods: {
    sortPosts(event) {
      const sortType = event.target.value;

      // จัดเรียงข้อมูลใน this.posts ตามประเภทที่เลือก
      switch (sortType) {
        case "1": // การนัดหมายล่าสุด
          this.posts.sort((a, b) => new Date(b.appointDate) - new Date(a.appointDate));
          break;

        case "2": // ชื่อ-นามสกุล จาก ก ถึง ฮ
          this.posts.sort((a, b) => a.firstName.localeCompare(b.firstName, 'th'));
          break;

        case "3": // ชื่อ-นามสกุล จาก ฮ ถึง ก
          this.posts.sort((a, b) => b.firstName.localeCompare(a.firstName, 'th'));
          break;

        case "4": // เรียงตาม HN
          this.posts.sort((a, b) => a.HN.localeCompare(b.HN));
          break;

        default:
          console.log("Invalid sort type");
      }
    },
    sortAppointInfo() {
      if (this.sortAppoint != "เรียงลำดับตามการนัดหมายล่าสุด") {
        const data = {
          sortAppoint: this.sortAppoint,
        };
        axios
          .post(`http://localhost:3000/sortAppointInfo`, data)
          .then((response) => {
            this.posts = response.data;
            for (let i = 0; i < this.posts.length; i++) {
              let formula = this.checkFormula.filter((r) => {
                return r.formulaId == this.posts[i].formulaId;
              });
              if (
                this.posts[i].appoint_no == formula[0].numberOfRound &&
                this.posts[i].medGiver != null
              ) {
                this.posts[i].thaiAppointDate = "ครบรอบการรับยาแล้ว";
              } else if (
                this.posts[i].appointDate == null ||
                this.posts[i].medGiver != null
              ) {
                this.posts[i].thaiAppointDate = "ยังไม่ได้นัดหมาย";
              } else if (this.posts[i].medGiver == null) {
                this.posts[i].time = this.posts[i].appointDate.split(" ")[1];
                this.posts[i].thaiTime = this.convertToThaiTime(
                  this.posts[i].appointDate
                );
                this.posts[i].thaiAppointDate = this.convertToThaiDate(
                  this.posts[i].appointDate
                );
              }
              axios
                .get(`http://localhost:3000/formulaName/${this.posts[i].formulaId}`)
                .then((response) => {
                  this.posts[i].formulaName = response.data;
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    /*completeAppointment() {
      const data = {
        medGiver: this.medGiver,
        note: this.note,
        appointId: this.selectAppoint.appointId,
      };
      axios
        .post(`http://localhost:3000/completeAppoint`, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },*/
    selectedAppointedPatient() {
        const data = {
          selectAppointPatient: this.selectAppointPatient,
        };
        axios
          .post(`http://localhost:3000/selectedAppointPatient`, data)
          .then((response) => {
            this.posts = response.data;
            for (let i = 0; i < this.posts.length; i++) {
              let formula = this.checkFormula.filter((r) => {
                return r.formulaId == this.posts[i].formulaId;
              });
              if (
                this.posts[i].appoint_no == formula[0].numberOfRound &&
                this.posts[i].medGiver != null
              ) {
                this.posts[i].thaiAppointDate = "ครบรอบการรับยาแล้ว";
              } else if (
                this.posts[i].appointDate == null ||
                this.posts[i].medGiver != null
              ) {
                this.posts[i].thaiAppointDate = "ยังไม่ได้นัดหมาย";
              } else if (this.posts[i].medGiver == null) {
                this.posts[i].time = this.posts[i].appointDate.split(" ")[1];
                this.posts[i].thaiTime = this.convertToThaiTime(
                  this.posts[i].appointDate
                );
                this.posts[i].thaiAppointDate = this.convertToThaiDate(
                  this.posts[i].appointDate
                );
              }
              axios
                .get(`http://localhost:3000/formulaName/${this.posts[i].formulaId}`)
                .then((response) => {
                  this.posts[i].formulaName = response.data;
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
    cantPostpone(request){
      const requestId = request.requestId
      axios.post(`http://localhost:3000/cantPostpone/${requestId}/${this.selectedRequest.UserIdLine}`).then((response)=>{
        if (response.data == 'success'){
          Swal.fire({
            title: "สำเร็จ",
            text: "",
            icon: "success",
            confirmButtonText: "ตกลง"
          }).then((result)=>{
            if (result.isConfirmed){
              this.$router.go(this.$router.currentRoute);
            }
          })
        }
      }).catch((error)=>{
        console.log(error)
      })
    },
    postponeAppoint(request) {
      const requestId = request.requestId;
      let date = request.newAppointDate.split("T")[0];
      const data = {
        newAppointDate: date + " " + request.time + ":00",
        appointId: request.appointId,
      };

      axios
        .post(`http://localhost:3000/postponeAppoint/${requestId}/${this.selectedRequest.UserIdLine}`, data)
        .then((response) => {
          if (response.data == 'success'){
            Swal.fire({
              title: "สำเร็จ",
              text: "เลื่อนนัดหมายสำเร็จ",
              icon: "success"
            })
          }
          this.$router.go(this.$router.currentRoute);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openRequest(request) {
      this.selectedRequest = request;
      let time;
      //let date
      let split = this.selectedRequest.newAppointDate.split("T");
      //date = split[0] + " " + split[1]
      time = split[1].split(".")[0];
      let hour = time.split(":")[0];
      let minute = time.split(":")[1];
      if (Number(hour) + 7 >= 24) {
        hour = hour % 24;
      } else {
        hour = Number(hour) + 7;
      }
      this.selectedRequest.thaiNewappointDate = this.convertToThaiDate(
        this.selectedRequest.newAppointDate
      );
      this.selectedRequest.time = hour + ":" + minute;
    },
    openAppoint(appoint) {
      this.selectAppoint = appoint;
    },
    convertToThaiTime(date) {
      date = date.split("T");
      let time = date[1].split(".")[0];
      let hour = time.split(":")[0];
      let minute = time.split(":")[1];
      if (Number(hour) + 7 >= 24) {
        hour = hour % 24;
      } else {
        hour = Number(hour) + 7;
      }
      let result = hour + ":" + minute + "น.";
      return result;
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
    goToRegis() {
      this.$router.push(`/RegisPatient/${this.$route.params.userId}`);
    },
    goToDetailapp(appoint) {
      let HN = appoint.HN;
      let treatmentId = appoint.treatmentId;
      this.$router.push(
        `/DetailAppoint/${this.$route.params.userId}/${HN}/${treatmentId}`
      );
    },
    logOut(){
      this.$router.replace('/');
    },
    goTonewHome() {
      this.$router.push(`/HomePage/${this.$route.params.userId}`);
    },
    goToguideBook() {
      this.$router.push(`/guideBook/${this.$route.params.userId}`);
    },
    goToDetail() {
      this.$router.push("/DetailBlood");
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
    goToReport() {
      this.$router.push("/ReportResult");
    },
    goToDeApp() {
      this.$router.push("/appointInfo");
    },
    goYes() {
      this.showOverlay = !this.showOverlay;
    },
    goNo() {
      this.showOverlay = !this.showOverlay;
    },
    overlayAddapp() {
      this.showOverlay = !this.showOverlay;
    },
    goToExportimport() {
            this.$router.push(`/ExportImport/${this.$route.params.userId}`);
    },
    selectMed(formula) {
      if (this.formula != "") {
        console.log(formula);
        axios
          .get(`http://localhost:3000/Formulamedicine/${formula}`)
          .then((response) => {
            this.formulasmedicine = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      while (this.pages.length > 0) {
        this.pages.pop();
      }
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    },
  },
  watch: {
    posts() {
      this.setPages();
    },
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 10).join(" ") + "...";
    },
  },
};
</script>

<style>
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