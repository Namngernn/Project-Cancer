<template>
    <div class="row g-0 text-center">
        <nav style="background-color: #1c2939">
            <div class="container">
                <div class="row">
                    <div class="col-9">
                        <ul class="nav nav-underline">
                            
                            <li class="nav-item" @click="goTonewHome()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px">
                                <a class="nav-link" href="#" style="color: #ffffff">การอนุมัติผลเลือด</a>
                            </li>
                            <li class="nav-item" @click="goTonewAppoint()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px">
                                <a class="nav-link" href="#" style="color: #ffffff">นัดหมาย</a>
                            </li>

                            <li class="nav-item" @click="goToPatient()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px">
                                <a class="nav-link" href="#" style="color: #ffffff">ประวัติการรักษา</a>
                            </li>
                            <li class="nav-item" @click="goToMedFor()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px">
                                <a class="nav-link" href="#" style="color: #ffffff">สูตรยาเคมีบำบัด</a>
                            </li>
                            <li class="nav-item" @click="goToguideBook()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px">
                                <a class="nav-link" href="#" style="color: #ffffff">คู่มือผู้ป่วย</a>
                            </li>
                            <li class="nav-item" @click="goToExportimport()"
                                style="margin-top: 10px; margin-bottom: 10px; padding-right: 20px">
                                <a class="nav-link" href="#" style="color: #ffffff">นำเข้าส่งออกข้อมูล</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-3">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button @click="logOut()" class="btn btn-light me-md-2" type="button"
                                style="margin-top: 15px; margin-bottom: 10px">
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
        <div class="">
            <!--ปุ่มนำเข้า -->
            <div style="margin-right: 10px;">
                  <label for="file-upload" class="btn btn-success">
                     เลือกไฟล์ข้อมูลผู้ป่วย
                  </label>
                  <input id="file-upload" type="file" class="d-none" @change="handleFileChange" multiple />
                  <!-- แสดงจำนวนไฟล์ที่เลือก -->
                  <div class="text-center">
                    <p v-if="fileCount > 0">คุณเลือก {{ fileCount }} ไฟล์</p>
                  </div>
                </div>
                <!--END ปุ่มนำเข้า -->
                <button class="btn btn-success text-white" type="button" style="margin-right: 10px;" @click="submitFile">นำเข้าข้อมูลผู้ป่วย</button>
                <button class="btn btn-success text-white" type="button" @click="exportCSV">ส่งออกข้อมูลผู้ป่วย</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
    name: "ExportImportSave",
    data() {
        return {
            cancerType: "",
            fileCount: 0,
            file: null,
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
            .get(`http://localhost:8080/user/${userId}`)
            .then((response) => {
                this.user = response.data[0];
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
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    methods: {
        handleFileChange(event) {
            // เมื่อมีการเลือกไฟล์ใหม่
            this.fileCount = event.target.files.length;
            this.file = event.target.files[0];
        },
        async submitFile() {
            if (!this.file) {
                alert("Please select a file first!");
                return;
            }

            const formData = new FormData();
            formData.append("file", this.file);

            try {
                const response = await axios.post("http://localhost:8080/import-csv", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert(response.data.message);
                this.fileCount = 0;
            } catch (error) {
                console.error(error);
                alert("Error uploading file");
            }
        },
        exportCSV() {
            window.location.href = "http://localhost:8080/export/csv";
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
        goToMedFor() {
            this.$router.push(`/MedFormular/${this.$route.params.userId}`);
        },
        goToPatient() {
            this.$router.push(`/YourPatients/${this.$route.params.userId}`);
        },
        goTonewAppoint() {
            this.$router.push(`/appointmentView/${this.$route.params.userId}`);
        },
        goToExportimport() {
            this.$router.push(`/ExportImport/${this.$route.params.userId}`);
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
                    .post(`http://localhost:8080/newPatient`, data)
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
        // validationHN() {
        //   if (this.HN.length != 6) {
        //     this.errorMessage.HN = "กรุณากรอกเลข HN 6 หลัก";
        //   } else if (this.HN.length == 6) {
        //     this.errorMessage.HN = "";
        //   } else if (this.HN == "") {
        //     this.errorMessage.HN = "กรุณากรอกเลข HN 6 หลัก";
        //   }
        // },
        validationHN() {
            if (!this.HN) {
                this.errorMessage.HN = "กรุณากรอกเลข HN 6 หลัก";
                return;
            }

            if (this.HN.length !== 6) {
                this.errorMessage.HN = "กรุณากรอกเลข HN 6 หลัก";
                return;
            }

            // เรียก API เพื่อตรวจสอบ HN กับ backend
            fetch(`http://localhost:8080/check-hn/${this.HN}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Server error");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.exists) {
                        this.errorMessage.HN = "เลข HN นี้มีอยู่ในระบบแล้ว";
                    } else {
                        this.errorMessage.HN = ""; // ไม่พบข้อผิดพลาด
                    }
                })
                .catch((error) => {
                    console.error("Error validating HN:", error);
                    this.errorMessage.HN = "เกิดข้อผิดพลาดในการตรวจสอบ";
                }
                );
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