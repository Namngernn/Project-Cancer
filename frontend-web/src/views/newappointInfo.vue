<template>
  <div class="row g-0 text-center">
    <nav style="background-color: #1c2939">
      <div class="container">
        <div class="row">
          <div class="col-9">
            <ul class="nav nav-underline">
              <li
                class="nav-item"
                @click="goToRegis()"
                v-if="user.type == 'nurse'"
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
        <!--<div style="margin: 20px; width: 250px; border-radius: 5px; border: 3px solid #1C2939; background-color: white;">
            <h4 style="color: #000000; padding: 10px; padding-bottom: 5px;"><b>รายละเอียดผู้ป่วย</b></h4>
          </div>-->
        <div class="card" style="margin: 20px">
          <div class="card-body" style="text-align: left">
            <button
              type="button"
              style="margin-bottom: 20px"
              class="btn btn-outline-success"
              @click="goTonewHome()"
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
                  <b>ชื่อ-นามสกุล</b> <div>{{patient.prefix}}{{ patient.firstName }} {{ patient.lastName }}</div>
                </div>
                <div class="col-4"><b>เพศ</b> <div>{{ patient.gender }}</div></div>
                <div class="col-4"><b>อายุ</b> <div>{{ patient.age }} ปี</div></div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 20px">
              <div class="row g-0">
                <div class="col-4">
                  <b>ชนิดมะเร็ง</b>
                  <div v-for="i in patient2.cancer" :key="i.cancerType">
                    {{ i.cancerType }} ระยะที่ {{  i.cancerState }}
                  </div>
                </div>
                <div class="col-4">
                  <b>สถานะ</b> <div>{{ patient.status }}</div>
                </div>
                <div class="col-4">
                  <b>หมายเลขโทรศัพท์</b> <div> {{ patient.phoneNumber }}</div>
                </div>
              </div>
            </div>
            <div class="container" style="margin-bottom: 40px">
              <div class="row g-0">
                <div class="col-4">
                  <b>สูตรยาที่ได้รับ</b> <div>
                    {{ patient.formulaName }}
                  </div>
                </div>
                <div class="col-4">
                  <b>แพทย์ผู้ดูแล</b><div>
                    {{ doctor.firstName }} {{ doctor.lastName }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5 card" style="margin-bottom: 50px">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// var io = require("socket.io-client");
// var socket = io("http://localhost:3000");
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
  name: "appointInfo",
  data() {
    return {
      patient: [],
      patient2: [],
      doctor: [],
      bloodresult: [],
      selectedBloodresult: [],
      img: "",
      status: "",
      suggestion: "",
      appointment: [],
      medicine: [],
      amount: [],
      medType: "",
      tab: [],
      user: [],
    };
  },
  created() {
    // this.socket = io.connect("http://localhost:3000");
  },
  unmounted() {
    // this.socket.disconnect();
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
    const HN = this.$route.params.HN;
    const treatmentId = this.$route.params.treatmentId;
    axios
      .get(`http://localhost:3000/patient/${HN}/${treatmentId}`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].treatmentId == treatmentId) {
            this.patient = response.data[i];
          }
        }
        let page = moment().format("YYYY") - this.patient.birthDate.split("-")[0];
        this.patient["age"] = page;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/myformula/${HN}/${treatmentId}`)
      .then((response) => {
        this.patient["formulaName"] = response.data[0].formulaName;
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
      .get(`http://localhost:3000/patient/${HN}/${treatmentId}`)
      .then((response) => {
        this.patient2 = response.data[0];
        let page = moment().format("YYYY") - this.patient2.birthDate.split("-")[0];
        this.patient2["age"] = page;
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:3000/bloodresult/patient/${HN}/${treatmentId}`)
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
            .get(`http://localhost:3000/treatment/giveMed/${treatmentId}`)
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
    openIMG(blood) {
      this.img = "http://localhost:3000/" + blood.picture;
      axios.get(`http://localhost:3000/getBloodresult/${blood.brId}`).then((response) => {
        this.selectedBloodresult = response.data;
        this.status = this.selectedBloodresult.status;
        this.suggestion = this.selectedBloodresult.suggestion;
      });
      const formulaId = this.patient.formulaId;
      axios
        .get(`http://localhost:3000/medicine/${formulaId}`)
        .then((response) => {
          this.medicine = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveComment() {
      const data2 = {
        medType: this.medType,
        amount: this.amount,
        formulaId: this.patient.formulaId,
        treatmentId: this.patient.treatmentId,
        HN: this.patient.HN,
        tab: this.tab,
        result: this.status,
        brId: this.selectedBloodresult.brId,
        doctorId: this.selectedBloodresult.doctorId,
        note: this.suggestion,
      };
      axios
        .post(`http://localhost:3000/giveMed`, data2)
        .then((response) => {
          if (response.data == "success") {
            Swal.fire({
              title: "สำเร็จ",
              text: "บันทึกสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then((result) => {
              if (result.isConfirmed) {
                //if status == อนุมัติ ส่งผลเลือดอีกครั้ง
                //this.$router.go(this.$router.currentRoute);

                //this.socket.emit('CH01', this.patient.HN + " " + this.status)
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    imgPath() {
      return this.img;
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
