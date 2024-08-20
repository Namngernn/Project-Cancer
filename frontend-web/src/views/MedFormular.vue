<template>
  <div class="navbar">
    <nav class="container">
        <div class="row container0">
          <div class="col-10 ">
            <ul class="nav nav-underline">
              <li class="nav-item" @click="goToRegis()" v-if="user.type == 'nurse'">
                <a class="nav-link" href="#" style="color: #ffffff;">ลงทะเบียนผู้ป่วย</a>
              </li>
              <li class="nav-item" @click="goTonewHome()">
                <a class="nav-link" href="#" style="color: #ffffff;">ผลเลือด</a>
              </li>
              <li class="nav-item" @click="goTonewAppoint()">
                <a class="nav-link" href="#" style="color: #ffffff;">นัดหมาย</a>
              </li>
              <li class="nav-item" @click="goToPatient()">
                <a class="nav-link" href="#" style="color: #ffffff;">ประวัติการรักษา</a>
              </li>
              <li class="nav-item" @click="goToMedFor()">
                <a class="nav-link active" aria-current="page" href="#"
                  style="color: #ffffff; font-size: large;">สูตรยาเคมีบำบัด</a>
              </li>
              <li class="nav-item" @click="goToguideBook()">
                <a class="nav-link" href="#" style="color: #ffffff;">คู่มือผู้ป่วย</a>
              </li>
            </ul>
          </div>
          <div class="col-2">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button @click="logOut()" class="btn btn-light me-md-2" type="button" style=" margin-top: 15px; margin-bottom: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z" />
                  <path fill-rule="evenodd"
                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
    </nav>

    <div class="col-md-10 offset-md-1">
      <div class="bd-example-snippet bd-code-snippet" style="border: none;">
        <div class="card" style="margin: 20px;">
          <div class="card-header" style="background-color: #90eeb7; padding: 20px;">
            <nav class="navbar">
              <div class="container-fluid">
                <form class="d-flex" role="search">
                  <input class="form-control me-2 col-md-4" type="search" placeholder="ค้นหา" aria-label="Search"
                    v-model="search">
                  <button class="btn" type="button" style="background-color: #34495E; color: white;"
                    @click="searchFormula">ค้นหา</button>
                </form>
                <div>
                  <select class="form-select" v-model="sortFormula" @click="sortColumn()">
                    <option disabled>เรียงลำดับตาม ID</option>
                    <option value="5">เรียงตามลำดับที่ น้อยไปมาก</option>
                    <option value="6">เรียงตามลำดับที่ มากไปน้อย</option>
                    <option value="1">สูตรยา A-Z</option>
                    <option value="2">สูตรยา Z-A</option>
                    <option value="3">จำนวนคน มากไปน้อย</option>
                    <option value="4">จำนวนคน น้อยไปมาก</option>
                  </select>
                </div>
              </div>
            </nav>
          </div>
          <div class="card-body" style="text-align: left; padding: 30px;">
            <div style="padding-bottom: 20px;">
              <button v-if="user.type == 'chemist'" type="button" class="btn btn-outline-success" data-bs-toggle="modal"
                data-bs-target="#exampleModal2" @click="overlayAddmed()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                เพิ่มสูตรยาเคมี
              </button>
              <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">เพิ่มสูตรยาเคมี</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3 row" style="text-align: left;">
                        <label for="inputMedFor" class="col-sm-4 col-form-label">สูตรยา</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputText" v-model="addMedName">
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left;">
                        <label for="inputMedFor" class="col-sm-4 col-form-label">จำนวนรอบการให้ยา</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputText" v-model.number="addNumberOfRound">
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left;">
                        <label for="inputMedFor" class="col-sm-4 col-form-label">ระยะห่าง(วัน)</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="inputText" v-model.number="addPeriod">
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left;">
                        <label for="inputMedFordetail" class="col-sm-4 col-form-label">ประกอบด้วย</label>
                        <div class="col-sm-8">
                          <div class="col" style="text-align: left;">
                            <!--<div class="form-check" v-for="med in medicine" :key="med.medId">
                                  <input v-model="selected" :value="med.medName" class="form-check-input" type="checkbox"
                                      id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                      {{ med.medName }}
                                    </label>
                                  </div>-->
                            <form class="d-flex">
                              <input class="form-control me-2" placeholder="ระบุยาเคมีบำบัด" list="formula" name="formu"
                                id="formu" v-model="med">
                              <datalist id="formula">
                                <option v-for="med in medicine" :key="med.medId">{{ med.medName }}</option>
                              </datalist>
                              <button class="btn btn-outline-success" type="button"
                                @click="addToselectMed">เพิ่ม</button>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3 row" style="text-align: left;">
                        <label for="inputMedFordetail" class="col-sm-3 col-form-label"></label>
                        <div class="col-sm-8">
                          <div class="col" style="text-align: left;" v-for="(med, index) in selectMed" :key="index">
                            <label for="inputMedFordetail" class="col-sm-10 col-form-label">{{ med }}</label>
                            <button class="btn" @click="deleteFromselectMed(med)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="goNo()">ยกเลิก</button>
                      <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                        @click="goYes()">ตกลง</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">สูตรยาเคมี</th>
                  <th scope="col">จำนวนคนที่ได้รับสูตรยา</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="formu in displayedPosts" :key="formu.formulaId">
                  <td> {{ formu.formulaId }} </td>
                  <td> {{ formu.formulaName }}</td>
                  <td> {{ formu.count }}</td>
                  <td>
                    <button v-if="user.type == 'chemist'" type="button" class="btn" style="border-radius: 20px;" @click="overlayModmed(formu)"
                      data-bs-toggle="modal" data-bs-target="#exampleModal3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path
                          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                      </svg>
                    </button>
                    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">แก้ไขสูตรยาเคมี</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="mb-3 row" style="text-align: left;">
                              <label for="inputMedFor" class="col-sm-4 col-form-label">สูตรยา</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputText" v-model="editMedName">
                              </div>
                            </div>
                            <div class="mb-3 row" style="text-align: left;">
                              <label for="inputMedFor" class="col-sm-4 col-form-label">จำนวนรอบการให้ยา</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputText"
                                  v-model.number="editNumberOfRound">
                              </div>
                            </div>
                            <div class="mb-3 row" style="text-align: left;">
                              <label for="inputMedFor" class="col-sm-4 col-form-label">ระยะห่าง(วัน)</label>
                              <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputText" v-model.number="editPeriod">
                              </div>
                            </div>
                            <div class="mb-3 row" style="text-align: left;">
                              <label for="inputMedFordetail" class="col-sm-3 col-form-label">ประกอบด้วย</label>
                              <div class="col-sm-8">
                                <div class="col" style="text-align: left;" v-if="editMed">
                                  <div class="col" style="text-align: left;" v-for="medName in editMed"
                                    :key="medName.medId">
                                    <label for="inputMedFordetail" class="col-sm-10 col-form-label">{{ medName.medName
                                      }}</label>
                                    <button class="btn" @click="deleteMedfromFormula(medName)">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path
                                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="mb-3 row" style="text-align: left;">
                              <label for="inputMedFordetail" class="col-sm-3 col-form-label">แก้ไข</label>
                              <div class="col-sm-8">
                                <div class="col" style="text-align: left;">
                                  <form class="d-flex">
                                    <input class="form-control me-2" placeholder="ระบุยาเคมีบำบัด" list="formula"
                                      name="formu" id="formu" v-model="med">
                                    <datalist id="formula">
                                      <option v-for="med in medicine" :key="med.medId">{{ med.medName }}</option>
                                    </datalist>
                                    <button class="btn btn-outline-success" @click="addToselectMed"
                                      type="button">เพิ่ม</button>
                                  </form>
                                  <!--<div class="form-check" v-for="med in medicine" :key="med.medId">
                                    <input v-model="editMedArray" :value="med.medName" class="form-check-input" type="checkbox"
                                      id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                      {{ med.medName }}
                                    </label>
                                  </div>-->
                                </div>
                              </div>
                            </div>
                            <div class="mb-3 row" style="text-align: left;">
                              <label for="inputMedFordetail" class="col-sm-3 col-form-label"></label>
                              <div class="col-sm-8">
                                <div class="col" style="text-align: left;" v-for="(med, index) in selectMed"
                                  :key="index">
                                  <label for="inputMedFordetail" class="col-sm-10 col-form-label">{{ med
                                    }}</label>
                                  <button class="btn" @click="deleteFromselectMed(med)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                      class="bi bi-trash-fill" viewBox="0 0 16 16">
                                      <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                              @click="goNoMod()">ยกเลิก</button>
                            <button type="button" class="btn btn-success" @click="goYesMod()">ตกลง</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button v-if="user.type=='chemist'" @click="deleteSelected(formu)" type="button" class="btn" data-bs-toggle="modal"
                      data-bs-target="#exampleModal" style="border-radius: 20px;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                    <!-- confirm delete formula-->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">ยืนยันการลบ</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            ถ้าคุณต้องการลบ {{ selectedFormula.formulaName }} กรุณากด <b>"ตกลง"</b>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">ยกเลิก</button>
                            <button type="button" class="btn btn-success" data-bs-dismiss="modal"
                              @click="goYesDelete(selectedFormula)">ตกลง</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a class="page-link" href="#" style="color: #0A6B3A;" v-if="page != 1" @click="page--">Previous</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" style="color: #0A6B3A; display: inline-block;"
                  v-for="(pageNumber, index) in pages.slice(page - 1, page + 5)" :key="index"
                  @click="page = pageNumber">{{
                pageNumber }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" style="color: #0A6B3A;" @click="page++"
                  v-if="page < pages.length">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  name: 'MedFormular',
  data() {
    return {
      formula: [],
      medicine: [],
      sortFormula: 'เรียงลำดับตาม ID',
      search: null,
      selected: [],
      addMedName: '',
      selectedFormula: [],
      editMedName: '',
      editMed: [],
      editMedArray: [],
      formula_medicine: [],
      posts: [],
      page: 1,
      perPage: 10,
      pages: [],
      user: [],
      deleteSelectedMed: [],
      selectMed: [],
      med: '',
      addNumberOfRound: null,
      addPeriod: null,
      editNumberOfRound: null,
      editPeriod: null
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  mounted() {
    let userId = this.$route.params.userId
    axios.get(`http://localhost:3000/user/${userId}`).then((response) => {
      this.user = response.data[0]
    }).catch((error) => {
      console.log(error)
    })
    axios.get(`http://localhost:3000/formula`).then((response) => {
      this.posts = response.data;
    }).catch((error) => {
      console.log(error);
    });
    axios.get(`http://localhost:3000/formula/medicine`).then((response) => {
      this.medicine = response.data;
    })
    axios.get(`http://localhost:3000/AllFormula_Medicine`).then((response) => {
      this.formula_medicine = response.data;
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    addToselectMed() {
      let dupMed = this.selectMed.filter((e) => {
        return e == this.med
      });
      if (dupMed.length != 0) {
        Swal.fire({
          title: "คำเตือน",
          text: "ยาเคมีบำบัดนี้ถูกเพิ่มแล้ว",
          icon: "warning",
          confirmButtonText: "ตกลง"
        }).then((result)=>{
          if (result.isConfirmed){
            dupMed.shift()
          }
        })
      }
      else {
        this.selectMed.push(this.med)
        this.med = ''
      }
    },
    deleteFromselectMed(med) {
      let index = this.selectMed.indexOf(med)
      this.selectMed.splice(index, 1)
    },
    deleteMedfromFormula(med) {
      this.deleteSelectedMed = med
      const data = {
        medId: this.deleteSelectedMed.medId,
        formulaId: this.deleteSelectedMed.formulaId
      }
      axios.post(`http://localhost:3000/deleteMedFromFormula`, data).then((response) => {
        Swal.fire({
          title: "สำเร็จ",
          text: "ลบยาเคมีออกจากสูตรยาสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง"
        })
        this.editMed = response.data
      }).catch((error) => {
        console.log(error)
      })

    },
    logOut(){
      this.$router.replace('/');
    },
    goToguideBook(){
      this.$router.push(`/guideBook/${this.$route.params.userId}`)
        },
    goToRegis() {
      this.$router.push(`/RegisPatient/${this.$route.params.userId}`)
    },
    goTonewHome() {
      this.$router.push(`/HomePage/${this.$route.params.userId}`)
    },
    goToMedFor() {
      this.$router.push(`/MedFormular/${this.$route.params.userId}`)
    },
    goToPatient() {
      this.$router.push(`/YourPatients/${this.$route.params.userId}`)
    },
    overlayAddmed() {
      this.showOverlay = !this.showOverlay;
    },
    goYes() {
      if (this.addMedName == '') {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกชื่อสูตรยาเคมีบำบัด",
          icon: "warning"
        })
      } else if (this.addNumberOfRound == null) {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกจำนวนรอบการรับยา",
          icon: "warning"
        })
      } else if (this.addPeriod == null) {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกระยะห่างของการรับยา",
          icon: "warning"
        })
      } else if (isNaN(this.addNumberOfRound)) {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลจำนวนรอบการรับยาเป็นตัวเลข",
          icon: "warning"
        })
      } else if (isNaN(this.addPeriod)) {Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลระยะห่างในการรับยาเป็นตัวเลข",
          icon: "warning"
        })
      }
      else {
        const data = {
          formulaName: this.addMedName,
          medicine: this.selectMed,
          numberOfRound: this.addNumberOfRound,
          period: this.addPeriod
        }
        axios.post(`http://localhost:3000/addFormula`, data).then((response) => {
          Swal.fire({
          title: "สำเร็จ",
          text: response.data,
          icon: "success",
          confirmButtonText: "ตกลง"
        }).then((result)=>{
          if (result.isConfirmed){
            this.$router.go(this.$router.currentRoute)
          }
        })
        }).catch((error) => {
          console.log(error)
        })
      }

    },
    goNo() {
      this.selected = []
      this.selectMed = []
      this.med = ''
    },
    goTonewAppoint() {
      this.$router.push(`/appointmentView/${this.$route.params.userId}`)
    },
    overlayModmed(formula) {
      axios.get(`http://localhost:3000/medicine/${formula.formulaId}`).then((response) => {
        this.selectedFormula = response.data[0]
        this.editMedName = this.selectedFormula.formulaName
        this.editNumberOfRound = this.selectedFormula.numberOfRound
        this.editPeriod = this.selectedFormula.period
        this.editMed = this.formula_medicine.filter((result) => {
          return result.formulaId == this.selectedFormula.formulaId
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    goYesMod() {
      if (this.editMedName != '' & this.selectMed != '') {
        const data = {
          formulaName: this.editMedName,
          medicine: this.selectMed
        }
        const formulaId = this.selectedFormula.formulaId
        axios.post(`http://localhost:3000/updateFormula/${formulaId}`, data).then((response) => {
          this.editMed = response.data
          this.selectMed = []
        }).catch((error) => {
          console.log(error)
        })
      } else {
        Swal.fire({
          title: "คำเตือน",
          text: "กรุณากรอกข้อมูลให้ครบ",
          icon: "warning"
        })
      }

    },
    goNoMod() {
      this.selectedFormula = []
      this.selectMed = []
      this.med = ''
    },
    sortColumn() {
      if (this.sortFormula != 'เรียงลำดับตาม ID') {
        const data = { sortFormula: this.sortFormula }
        axios.post(`http://localhost:3000/sortFormula`, data).then((response) => {
          this.posts = response.data[0];
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    searchFormula() {
      const data = { search: this.search }
      axios.post(`http://localhost:3000/searchFormula`, data).then((response) => {
        if (response.data == 'ไม่พบสูตรยาที่ค้นหา') {
          Swal.fire({
            title: "",
            text: response.data,
            icon: "error"
          })
        } else {
          this.posts = response.data;
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    goYesDelete(selectedFormula) {
      const formulaName = selectedFormula.formulaName
      axios.delete(`http://localhost:3000/deleteFormula/${formulaName}`).then((response) => {
        Swal.fire({
          title: "สำเร็จ",
          text: response.data,
          icon: "success",
          confirmButtonText: 'ตกลง'
        }).then((result)=>{
          if (result.isConfirmed){
            this.$router.go(this.$router.currentRoute);
          }
        })
        
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteSelected(formu) {
      this.selectedFormula = formu;
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
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return posts.slice(from, to);
    }
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    }
  },
  watch: {
    posts() {
      this.setPages();
    }
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 10).join(" ") + '...';
    }
  }
}}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.group {
  padding: 20px;
}

.g1 {
  margin-right: 20px;
}

.navbar {
  background-color: #1C2939;
  padding: 10px 0;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 10px 20px 10px 0;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
}

.nav-link.active {
  font-size: large;
}

.logout-btn {
  margin-top: 15px;
  margin-bottom: 10px;
}

.navbar-toggler {
  display: none;
  background: none;
  border: none;
  color: white;
}


@media (max-width: 768px) {
  .navbar-toggler {
    display: block;
  }

  .navbar-collapse {
    display: none;
  }

  .navbar-collapse.show {
    display: block;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .nav-item {
    margin: 10px 0;
  }

  .logout-btn {
    width: 100%;
    margin-top: 10px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .nav-link {
    font-size: 14px;
  }

  .logout-btn {
    font-size: 14px;
  }
}

@media (min-width: 1025px) {
  .container {
    display: flex;
    justify-content: space-between;
    /* background-color: white; */
    align-items: center;
  }
  .container0 {
    /* background-color: green; */
    width: 100%;
  }
  
  .nav-link {
    font-size: 14px;
  }
  .navbar-nav {
    flex-grow: 1;
  }
  .logout-btn {
    font-size: 14px;
  }
}
</style>