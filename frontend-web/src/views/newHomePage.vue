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
                  class="nav-link active"
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
              
              <li
                class="nav-item"
                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px"
              >
                <a class="nav-link" href="http://localhost:3000/dashboardview" target="_blank" style="color: #ffffff">แดชบอร์ด</a>
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
          <div class="card-header" style="background-color: #90eeb7; padding: 20px">









            <nav class="navbar">
              <div class="container-fluid">
              
<!-- 1 -->
                <button
                  type="button"
                  class="btn btn-light mb-2 mr-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  style="background-color: #ffffff; color: #0a6b3a"
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
                      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                    />
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                    />
                  </svg>
                  เพิ่มแผนการรักษา
                </button>
<!-- Modal -->
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
                          <label for="inputFirstname" class="col-sm-2 col-form-label"
                            >ชื่อ</label
                          >
                          <div class="col-sm-10">
                            <input
                              type="text"
                              class="form-control"
                              id="inputText"
                              v-model="firstName"
                            />
                          </div>
                        </div>
                        <div class="mb-3 row" style="text-align: left">
                          <label for="inputFirstname" class="col-sm-2 col-form-label"
                            >นามสกุล</label
                          >
                          <div class="col-sm-10">
                            <input
                              type="text"
                              class="form-control"
                              id="inputText"
                              v-model="lastName"
                            />
                          </div>
                        </div>
                        <div class="mb-3 row" style="text-align: left">
                          <label for="inputType" class="col-sm-2 col-form-label"
                            >ประเภทมะเร็ง</label
                          >
                          <div class="col-sm-4">
                            <!--<input class="form-control" list="cancerType" type="text" v-model="cancerType">
                            <datalist id="cancerType">
                              <option v-for="(c, index) in infoCancer" :key="index">{{c}}</option>
                            </datalist>-->
                            <select class="form-select" v-model="cancerType">
                              <option value="" disabled>กรุณาเลือกประเภทมะเร็ง</option>
                              <option v-for="(c, index) in infoCancer" :key="index">
                                {{ c }}
                              </option>
                            </select>
                          </div>
                          <label for="inputState" class="col-sm-2 col-form-label"
                            >ระยะของโรค</label
                          >
                          <div class="col-sm-3">
                            <!--<input type="text" class="form-control" id="inputText" v-model="cancerState">-->
                            <select class="form-select" v-model="cancerState">
                              <option value="" disabled>ระยะมะเร็ง</option>
                              <option v-for="index in 4" :key="index">{{ index }}</option>
                            </select>
                          </div>
                          <div class="col-sm-1">
                            <button class="btn btn-success" @click="addToListCancer()">
                              เพิ่ม
                            </button>
                          </div>
                        </div>
                        <div
                          class="row"
                          style="text-align: left; margin-bottom: 10px"
                          v-if="listCancer != ''"
                        >
                          <div class="row" v-for="(c, index) in listCancer" :key="index">
                            <div class="col-sm-3"></div>
                            <div class="col-6">
                              <li>{{ c.cancerType }} ระยะที่ {{ c.cancerState }}</li>
                            </div>
                            <div class="col-3">
                              <button
                                @click="deleteFromListCancer(c)"
                                type="button"
                                class="btn"
                                style="border-radius: 20px"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  class="bi bi-trash-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="mb-3 row" style="text-align: left">
                          <label for="inputState" class="col-sm-2 col-form-label"
                            >สูตรยา</label
                          >
                          <div class="col-sm-10">
                            <select class="form-select" v-model="fomula">
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
                          <label for="inputState" class="col-sm-2 col-form-label"
                            >แพทย์ผู้ดูแล</label
                          >
                          <div class="col-sm-10">
                            <select class="form-select" v-model="doctor">
                              <option value="" disabled>กรุณาเลือกแพทย์ผู้ดูแล</option>
                              <option v-for="doc in doctors" :key="doc.firstName">
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
                          @click="newTreatment"
                          type="button"
                          class="btn btn-success"
                        >
                          ตกลง
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
<!-- 2 -->
                <div class="d-flex mb-2">
                  <input
                    class="form-control me-2 d-flex"
                    type="search"
                    placeholder="ค้นหา"
                    aria-label="Search"
                    v-model="selected"
                  />
                  <button
                    class="btn d-flex"
                    type="button"
                    style="background-color: #34495e; color: white"
                    @click="selectedPatient"
                  >
                    ค้นหา
                  </button>
                </div>
<!-- 3 -->
                <div class="dropdown mb-2">
                  <select class="form-select" v-model="sortBlood" @click="sortBloodInfo">
                    <option disabled>เรียงลำดับตาม HN</option>
                    <option value="1">ชื่อ-นามสกุล จาก ก ถึง ฮ</option>
                    <option value="2">ชื่อ-นามสกุล จาก ฮ ถึง ก</option>
                    <option value="3">วันที่ส่งผลเลือด ก่อน-หลัง</option>
                    <option value="4">วันที่ส่งผลเลือด หลัง-ก่อน</option>
                    <option value="5">เฉพาะรออนุมัติผลเลือด</option>
                    <option value="6">เฉพาะอนุมัติผลเลือด</option>
                    <option value="7">เฉพาะส่งผลเลือดใหม่อีกครั้ง</option>
                  </select>
                </div>


              
              </div>
            </nav>














          </div>
          <div class="card-body" style="text-align: left; padding: 30px">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">HN</th>
                  <th scope="col">ชื่อ - นามสกุล</th>
                  <th scope="col">ประเภทมะเร็ง</th>
                  <th scope="col"></th>
                  <th scope="col">ผลเลือด</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in displayedPosts" :key="p.HN">
                  <td>{{ p.HN }}</td>
                  <td>{{ p.firstName }} {{ p.lastName }}</td>
                  <td> <div v-for="i in p.cancer" :key="i.HN"> {{ i.cancerType }} ระยะที่ {{ i.cancerState }} </div>
                </td>

                  <td>
                    <button
                      type="button"
                      class="btn"
                      style="border-radius: 20px; background-color: #34495e; color: white"
                      @click="goToHis(p)"
                    >
                      See More
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
                  </td>
                  <td :style="changeColor(p.status)">{{ p.status }}</td>
                </tr>
              </tbody>
            </table>
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
                    v-for="pageNumber in pages.slice(page - 1, page + 2)"
                    :key="pageNumber[pages]"
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// var io = require("socket.io-client");
// var socket = io("http://localhost:3000");
// import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// socket.on("info", (data) => {
//   //console.log(data)
//   Toastify({
//     text: data,
//     duration: 3000,
//     gravity: "bottom",
//     position: "right",
//   }).showToast();
// });


export default {
  name: "HomePage",
  data() {
    return {
      join: false,
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      user: [],
      firstName: "",
      lastName: "",
      birthDate: "",
      phoneNumber: "",
      IDcard: "",
      gender: "",
      doctor: "",
      cancerType: "",
      cancerState: "",
      fomula: "",
      formulas: [],
      doctors: [],
      selected: "",
      sortBlood: "เรียงลำดับตาม HN",
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
      listCancer: [],
      testData: [],
    };
  },
  // created() {
  //   this.socket = io.connect("http://localhost:3000");
  // },
  unmounted() {
    // this.socket.disconnect();
  },
  mounted() {
    const userId = this.$route.params.userId;
    axios
      .get(`http://localhost:3000/user/${userId}`)
      .then((response) => {
        this.user = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`http://localhost:3000/Allpatient`).then((response) => {
      this.posts = response.data;
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
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    show() {
      this.socket.emit("CH01", "updated status");
    },
    // async showNoti(data) {
    //   this.$snotify.success(data);
    //   // await this.socket.disconnect();
    //   // console.log(this.socket.connected);
    // },
    deleteFromListCancer(c) {
      let index = this.listCancer.indexOf(c);
      this.listCancer.splice(index, 1);
    },
    addToListCancer() {
      if (this.cancerType != "" && this.cancerState != "") {
        this.listCancer.push({
          cancerType: this.cancerType,
          cancerState: this.cancerState,
        });
      } else {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกประเภท และระยะของมะเร็งให้ครบ",
          icon: "warning",
        });
      }
      this.cancerType = "";
      this.cancerState = "";
    },
    sortBloodInfo() {
      const data = {
        sortBlood: this.sortBlood,
      };
      if (this.sortBlood != "เรียงลำดับตาม HN") {
        axios
          .post(`http://localhost:3000/sortBloodresult`, data)
          .then((response) => {
            this.posts = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    selectedPatient() {
      const data = {
        selected: this.selected,
      };
      axios
        .post(`http://localhost:3000/selectedPatient`, data)
        .then((response) => {
          this.posts = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeColor(status) {
      if (status == "อนุมัติผลเลือด") {
        return "color: #3B9628;";
      } else if (status == "ส่งผลเลือดอีกครั้ง") {
        return "color : #D14127;";
      } else if (status == "รออนุมัติผลเลือด") {
        return "color: #B9BE25;";
      }
    },
    newTreatment() {
      if (
        this.listCancer != [] &&
        this.firstName != "" &&
        this.lastName != "" &&
        this.formula != "" &&
        this.doctor != ""
      ) {
        const data = {
          formula: this.fomula,
          listCancer: this.listCancer,
          firstName: this.firstName,
          lastName: this.lastName,
          doctor: this.doctor,
        };
        axios
          .post(`http://localhost:3000/createTreatment`, data)
          .then((response) => {
            if (response.data == "no") {
              Swal.fire({
                title: "คำเตือน",
                text: "ไม่พบผู้ป่วยนี้ในระบบ",
                icon: "warning",
              });
            } else {
              Swal.fire({
                title: "สำเร็จ",
                text: "เพิ่มแผนการรักษาสำเร็จ",
                icon: "success",
                confirmButtonText: "ตกลง",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push(
                    `/appointInfo/${this.$route.params.userId}/${response.data[0].HN}/${response.data[0].treatmentId}`
                  );
                }
              });
            }
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
    goToHis(p) {
      this.$router.push(
        `/appointInfo/${this.$route.params.userId}/${p.HN}/${p.treatmentId}`
      );
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
      this.listCancer = [];
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  padding: 20px;
}

.g1 {
  margin-right: 20px;
}
</style>
