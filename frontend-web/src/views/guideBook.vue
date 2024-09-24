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
                <a class="nav-link" aria-current="page" href="#" style="color: #ffffff"
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
                <a
                  class="nav-link active"
                  href="#"
                  style="color: #ffffff; font-size: large"
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
          <div class="card-header" style="background-color: #90eeb7; padding: 20px">
            <nav class="navbar">
              <div class="container-fluid">
                <form class="d-flex" role="search">
                  <input
                    class="form-control me-2 col-md-4"
                    type="search"
                    placeholder="ค้นหา"
                    aria-label="Search"
                    v-model="search"
                  />
                  <button
                    class="btn"
                    type="button"
                    style="background-color: #34495e; color: white"
                    @click="searchGuideBook"
                  >
                    ค้นหา
                  </button>
                </form>
                <div>
                  <select class="form-select" v-model="sortFormula" @click="sortColumn()">
                    <option disabled>เรียงลำดับตาม ID</option>
                    <option value="1">เรียงตามลำดับที่ น้อยไปมาก</option>
                    <option value="2">เรียงตามลำดับที่ มากไปน้อย</option>
                    <option value="3">สูตรยา A-Z</option>
                    <option value="4">สูตรยา Z-A</option>
                  </select>
                </div>
              </div>
            </nav>
          </div>
          <div class="col-md-10 offset-md-1">
            <table class="table" style="text-align: left">
              <thead>
                <tr>
                  <th scope="col">สูตรยา</th>
                  <th scope="col">QRcode</th>
                  <th scope="col">PDF</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="f in guideBook" :key="f.formulaId">
                  <td>{{ f.formulaName }}</td>
                  <td>
                    <button
                      class="btn btn-primary"
                      data-bs-target="#exampleModal"
                      data-bs-toggle="modal"
                      @click="openQR(f)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-qr-code-scan"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"
                        />
                        <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                        <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                        <path
                          d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z"
                        />
                        <path d="M12 9h2V8h-2z" />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-primary"
                      @click="openPDF(f)"
                      data-bs-target="#exampleModal1"
                      data-bs-toggle="modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-filetype-pdf"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    {{ selectedFormula.formulaName }} QRcode
                  </h5>
                  <button
                    type="button"
                    class="btn close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="container" style="margin-bottom: 30px">
                    <span v-if="selectedFormula.QRcode == null">ยังไม่มีรูปภาพ</span>
                    <img :src="getPhoto" alt="" />
                  </div>
                  <div class="mb-3">
                    <label for="formFile" class="form-label"
                      >เพิ่มรูป หรือแก้ไขรูป QRcode</label
                    >
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      @change="onFileChange"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                    ยกเลิก
                  </button>
                  <button type="submit" class="btn btn-success" @click="saveQRcode()">
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>

            <div
              class="modal fade"
              id="exampleModal1"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      {{ selectedFormula.formulaName }} PDF
                    </h5>
                    <button
                      type="button"
                      class="btn close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="formFile" class="form-label"
                        >เพิ่ม หรือเปลี่ยนไฟล์ PDF</label
                      >
                      <input
                        class="form-control"
                        type="file"
                        id="formFile"
                        @change="onFileChange"
                      />
                    </div>
                    <div class="container" style="margin-top: 30px">
                      <span v-if="selectedFormula.pdf == null">ยังไม่มีไฟล์ pdf</span>
                      <iframe
                        v-if="selectedFormula.pdf != null"
                        style="width: 100%; height: 400px"
                        :src="getPDF"
                        alt=""
                      ></iframe>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                      ยกเลิก
                    </button>
                    <button type="submit" class="btn btn-success" @click="savePDF()">
                      บันทึก
                    </button>
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
  name: "guideBook",
  data() {
    return {
      selectedFormula: [],
      img: "",
      guideBook: [],
      file: "",
      pdf: "",
      search: "",
      sortFormula: "เรียงลำดับตาม ID",
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
      .get(`http://localhost:3000/guideBook`)
      .then((response) => {
        this.guideBook = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    savePDF() {
      if (this.file != "") {
        let formdata = new FormData();
        formdata.append("file", this.file);
        formdata.append("formulaId", this.selectedFormula.formulaId);
        axios
          .post(`http://localhost:3000/savePDF`, formdata)
          .then((response) => {
            Swal.fire({
              title: "สำเร็จ",
              text: "บันทึก PDF แล้ว",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then((result) => {
              if (result.isConfirmed) {
                this.guideBook = response.data;
                this.file = "";
                this.$router.go(this.$router.currentRoute);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาเลือกไฟล์ PDF",
          icon: "warning",
        });
      }
    },
    sortColumn() {
      if (this.sortFormula != "เรียงลำดับตาม ID") {
        const data = { sortFormula: this.sortFormula };
        axios
          .post(`http://localhost:3000/sortGuideBook`, data)
          .then((response) => {
            this.guideBook = response.data[0];
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    searchGuideBook() {
      const data = { search: this.search };
      axios
        .post(`http://localhost:3000/searchGuideBook`, data)
        .then((response) => {
          if (response.data == "ไม่พบสูตรยาที่ค้นหา") {
            Swal.fire({
              title: "คำเตือน",
              text: response.data,
              icon: "warning",
            });
          } else {
            this.guideBook = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openPDF(f) {
      this.selectedFormula = f;
      this.getPDF;
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    saveQRcode() {
      if (this.file != "") {
        let formdata = new FormData();
        formdata.append("image", this.file);
        formdata.append("formulaId", this.selectedFormula.formulaId);
        axios
          .post(`http://localhost:3000/addQRcode`, formdata)
          .then((response) => {
            Swal.fire({
              title: "สำเร็จ",
              text: "บันทึก QRcode แล้ว",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then((result) => {
              if (result.isConfirmed) {
                this.guideBook = response.data;
                this.file = "";
                this.$router.go(this.$router.currentRoute);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณาเลือกรูปภาพ QRcode",
          icon: "warning",
        });
      }
    },
    logOut() {
      this.$router.replace("/");
    },
    openQR(f) {
      console.log("kdsjkskd");
      console.log(f);
      this.selectedFormula = f;
      this.img = "http://localhost:3000/" + f.QRcode;
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
    goToguideBook() {
      this.$router.push(`/guideBook/${this.$route.params.userId}`);
    },
  },
  computed: {
    getPhoto() {
      return "http://localhost:3000/" + this.selectedFormula.QRcode;
    },
    getPDF() {
      return "http://localhost:3000/" + this.selectedFormula.pdf;
    },
  },
};
</script>
