<template>
    <div class="row g-0 text-center">
        <nav style="background-color: #1C2939;">
            <div class="container">
                <div class="row">
                    <div class="col-9">
                        <ul class="nav nav-underline">
                            <li class="nav-item" @click="goToRegis()" v-if="user.type == 'nurse'"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px;">
                                <a class="nav-link" href="#" style="color: #ffffff;">ลงทะเบียนผู้ป่วย</a>
                            </li>
                            <li class="nav-item" @click="goTonewHome()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px;">
                                <a class="nav-link" href="#" style="color: #ffffff;">ผลเลือด</a>
                            </li>
                            <li class="nav-item" @click="goTonewAppoint()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px;">
                                <a class="nav-link" href="#" style="color: #ffffff;">นัดหมาย</a>
                            </li>
                            <li class="nav-item" @click="goToPatient()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px;">
                                <a class="nav-link active" aria-current="page" href="#"
                                    style="color: #ffffff; font-size: large;">ประวัติการรักษา</a>
                            </li>
                            <li class="nav-item" @click="goToMedFor()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px;">
                                <a class="nav-link" href="#" style="color: #ffffff;">สูตรยาเคมีบำบัด</a>
                            </li>
                            <li class="nav-item" @click="goToguideBook()"
                            style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px;">
                            <a class="nav-link" href="#" style="color: #ffffff;">คู่มือผู้ป่วย</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-3">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button @click="logOut()" class="btn btn-light me-md-2" type="button"
                                style="margin-top: 15px; margin-bottom: 10px;">
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
            </div>
        </nav>
        <!--<ul class="nav nav-underline" style="background-color: #1C2939;">
        <li class="nav-item" style="margin: 20px; padding-left: 20px;">
          <a class="nav-link" aria-current="page" href="#" style="color: #ffffff; font-size: large;">หน้าหลัก</a>
        </li>
        <li class="nav-item" style="margin: 20px;">
          <a class="nav-link" href="#" style="color: #ffffff;">นัดหมาย</a>
        </li>
        <li class="nav-item" style="margin: 20px;">
          <a class="nav-link active" aria-current="page" href="#" style="color: #ffffff; font-size: large;">ประวัติผู้ป่วย</a>
        </li>
        <li class="nav-item" style="margin: 20px;">
          <a class="nav-link" href="#" style="color: #ffffff; align-items: end;">นัดหมาย</a>
        </li>
      </ul>-->
        <div class="col-md-10 offset-md-1">
            <div class="bd-example-snippet bd-code-snippet" style="border: none;">
                <div class="card" style="margin: 20px;">
                    <div class="card-header" style="background-color: #90eeb7; padding: 20px;">
                        <nav class="navbar">
                            <div class="container-fluid">
                                <form class="d-flex" role="search">
                                    <input class="form-control me-2 col-md-4" type="search" placeholder="ค้นหา"
                                        aria-label="Search" v-model="selected">
                                    <button class="btn" type="button" style="background-color: #34495E; color: white;"
                                        @click="selectedPatient">ค้นหา</button>
                                </form>
                                <div class="dropdown">
                                    <select class="form-select" v-model="sortInfo" @click="sortPatientInfo">
                                        <option disabled>เรียงลำดับตาม HN</option>
                                        <option value="1">ชื่อ-นามสกุล จาก ก ถึง ฮ</option>
                                        <option value="2">ชื่อ-นามสกุล จาก ฮ ถึง ก</option>
                                        <option value="3">เรียงตามลำดับ HN น้อยไปมาก</option>
                                        <option value="4">เรียงตามลำดับ HN มากไปน้อย</option>
                                    </select>
                                </div>
                            </div>
                        </nav>
                    </div>

                    <div class="card-body" style="text-align: left; padding: 30px;">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">HN</th>
                                    <th scope="col">ชื่อ - นามสกุล</th>
                                    <th scope="col">ประเภทมะเร็ง</th>
                                    <th scope="col">แพทย์ผู้ดูแล</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in displayedPosts" :key="p.HN">
                                    <td>{{ p.HN }}</td>
                                    <td>{{ p.firstName }} {{ p.lastName }}</td>
                                    <td> <div v-for="i in p.cancer" :key="i.HN"> {{ i.cancerType }} ระยะที่ {{ i.cancerState }}

                                    </div>
                                  </td>
                                    <td>{{ p.doctorName }}</td>
                                    <td>
                                        <button type="button" class="btn"
                                            style="border-radius: 20px; background-color: #34495E; color: white;"
                                            @click="goToHis(p)">
                                            See More
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li class="page-item">
                                    <a class="page-link" href="#" style="color: #0A6B3A;" v-if="page != 1"
                                        @click="page--">Previous</a>
                                </li>
                                <li class="page-item">
                                    <a class="page-link" href="#" style="color: #0A6B3A; display: inline-block;"
                                        v-for="pageNumber in pages.slice(page - 1, page + 2)" :key="pageNumber[pages]"
                                        @click="page = pageNumber">{{ pageNumber }}</a>
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
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    name: 'yourPatient',
    data() {
        return {
            posts: [],
            page: 1,
            perPage: 10,
            pages: [],
            user: [],
            firstName: '',
            lastName: '',
            birthDate: '',
            phoneNumber: '',
            IDcard: '',
            gender: '',
            doctor: '',
            cancerType: '',
            cancerState: '',
            fomula: '',
            formulas: [],
            doctors: [],
            selected: '',
            sortInfo: 'เรียงลำดับตาม HN',
            listCancer: [],

        }
    },
    mounted() {
        const userId = this.$route.params.userId
        axios.get(`http://localhost:3000/user/${userId}`).then((response) => {
            this.user = response.data[0]
        }).catch((error) => {
            console.log(error)
        })
        axios.get(`http://localhost:3000/Allpatient`).then((response) => {
            this.posts = response.data
            for (let i = 0; i < this.posts.length; i++) {
                axios.get(`http://localhost:3000/patients/doctor/${response.data[i].doctorId}`).then((res) => {
                    this.posts[i].doctorName = res.data[0].doctorFirstName + " " + res.data[0].doctorLastName
                }).catch((error) => {
                    console.log(error)
                })

            }
        })
        axios.get(`http://localhost:3000/doctor`).then((response) => {
            this.doctors = response.data
        }).catch((error) => {
            console.log(error)
        })
        axios.get(`http://localhost:3000/Allformula`).then((response) => {
            this.formulas = response.data
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })



    },
    methods: {
        sortPatientInfo() {
            if (this.sortInfo != 'เรียงลำดับตาม HN') {
                const data = {
                    sortInfo: this.sortInfo
                }
                axios.post(`http://localhost:3000/sortInfo`, data).then((response) => {
                    this.posts = response.data[0]
                    for (let i = 0; i < this.posts.length; i++) {
                    axios.get(`http://localhost:3000/patients/doctor/${this.posts[i].doctorId}`).then((res) => {
                        this.posts[i].doctorName = res.data[0].doctorFirstName + " " + res.data[0].doctorLastName
                    }).catch((error) => {
                        console.log(error)
                    })
                }
                }).catch((error) => {
                    console.log(error)
                })
            }

        },
        selectedPatient() {
            const data = {
                selected: this.selected
            }
            axios.post(`http://localhost:3000/selectedPatient`, data).then((response) => {
                this.posts = response.data[0]
                for (let i = 0; i < this.posts.length; i++) {
                    axios.get(`http://localhost:3000/patients/doctor/${this.posts[i].doctorId}`).then((res) => {
                        this.posts[i].doctorName = res.data[0].doctorFirstName + " " + res.data[0].doctorLastName
                    }).catch((error) => {
                        console.log(error)
                    })
                }
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
        goToHis(p) {
            this.$router.push(`/DetailPatient/${this.$route.params.userId}/${p.HN}/${p.treatmentId}`)
        },
        goToBlood() {
            this.$router.push('/HomePage')
        },
        goToMedFor() {
            this.$router.push(`/MedFormular/${this.$route.params.userId}`)
        },
        goToPatient() {
            this.$router.push(`/YourPatients/${this.$route.params.userId}`)
        },
        goTonewAppoint() {
            this.$router.push(`/appointmentView/${this.$route.params.userId}`)
        },
        goToReport() {
            this.$router.push('/ReportResult')
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
        },
        goNo() {
            this.firstName = '';
            this.lastName = '';
            this.birthDate = '';
            this.phoneNumber = '';
            this.gender = '';
            this.cancerType = '';
            this.cancerState = '';
            this.formula = '';
            this.doctor = '';
        },
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
}
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
  