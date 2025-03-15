<template>
  <v-container>
    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" :key="calendarKey" />
    
    <div
      class="modal fade"
      id="exampleModal6"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      style="z-index: 1055 !important;"
    >
      <div class="modal-dialog modal-lg" style="z-index: 1055;">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #90eeb7">
            <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: #1c2939">
              <b>กำหนดนัดหมายใหม่</b>
            </h1>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <strong>นัดหมายเดิม</strong>
              <p>{{selectedDate}}</p>
              <strong>แพทย์ฺผู้ดูแล</strong>
              <p>{{ selectedDoctorName }}</p>
              <!-- <ul>
                <li v-for="patient in selectedPatientList" :key="patient.id">{{ patient.firstName }} {{ patient.lastName }}</li>
              </ul> -->
              <strong>เลือกผู้ป่วย</strong>
              <select>
                <option v-for="patient in selectedPatientList" :key="patient.id" :value="patient.id">
                  {{ patient.firstName }} {{ patient.lastName }} 
                </option>
              </select>
            </div>
            <div class="mb-3 row">
              <strong for="exampleFormControlInput1" class="col-sm-4 form-label">
                เลือกวันที่นัดหมายใหม่
              </strong>
              <div class="col-sm-8">
                <VueDatePicker
                  v-model="posponedate"
                  :enable-time-picker="false"
                  placeholder="กรุณาระบุวัน"
                  selectText="เลือก"
                  cancelText="ยกเลิก"
                  :locale="'th'"
                  lang="th"
                  format="dd/MM/yyyy"
                  :min-date="new Date()"
                  :disabled-week-days="[6, 0]"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <strong for="exampleFormControlInput1" class="col-sm-4 form-label">
                เลือกเวลาที่นัดหมาย
              </strong>
              <div class="col-sm-8">
                <VueDatePicker
                  v-model="posponetime"
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
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              ยกเลิก
            </button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="postponeAppoint()">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>

  </v-container>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listGridPlugin from "@fullcalendar/list";
import axios from 'axios';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

export default {
  components: {
    FullCalendar, VueDatePicker
  },
  data() {
    return {
      posponedate: "",
      posponetime: "",
      patientList: [],
      doctorName: '',
      selectedPatient: null,
      selectedDoctorName: '',
      selectedDate: '',
      selectedAppointId: '',
      selectedPatientList: [],
      // FullCalendar options
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          listGridPlugin,
        ],
        initialView: "listWeek", // ใช้ listWeek เพื่อให้แสดงเป็นรายการ
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "listWeek,dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [],  // จะถูกกรอกใน mounted
        locale: "th",
        eventContent: (eventInfo) => {
          const doctorName = eventInfo.event.extendedProps.doctorName;
          const patients = eventInfo.event.extendedProps.patients;
          const date = eventInfo.event.extendedProps.date;
          const appointId = eventInfo.event.extendedProps.appointId;

          const patientList = patients
            ? patients.map(patient => `<li>${patient.firstName} ${patient.lastName}</li>`).join('')
            : '';

          return {
            html: `
              <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="openModal('${doctorName}', ${JSON.stringify(patients)}, '${date}', '${appointId}')">
                <div style="padding: 10px; z-index: 100 !important;">
                  
                  <strong>หมอ: ${doctorName}</strong>
                  <ul>${patientList}</ul>
                </div>
              </button>
            `,
          };
        },
        eventClick: (info) => {
          // ดึงค่าที่ต้องการจาก event
          const doctorName = info.event.extendedProps.doctorName;
          const patients = info.event.extendedProps.patients;
          const date = info.event.extendedProps.date;
          const appointId = info.event.extendedProps.appointId;
          // เรียก openModal เพื่ออัปเดตข้อมูล
          this.openModal(doctorName, patients, date, appointId);
        },
        datesSet: this.onDatesSet
      },
      currentViewType: "listWeek",
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    openModal(doctorName, patients, date, appointId) {
      console.log(doctorName, patients)
      this.selectedDoctorName = doctorName;
      this.selectedPatientList = patients;
      this.selectedDate = date;
      this.selectedAppointId = appointId;
    },

    async fetchAppointments() {
      try {
        const response = await axios.get("http://localhost:3000/getAppointment");
        const appointments = response.data;
        const groupedAppointments = this.groupAppointmentsByDateAndDoctor(appointments);
        this.calendarOptions.events = groupedAppointments.map(group => {
          return group.doctors.map(doctor => {
            return {
              title: `หมอ: ${doctor.doctorName}`,
              date: group.date,
              extendedProps: {
                appointId: doctor.appointId,
                doctorName: doctor.doctorName,
                date: group.date,
                patients: doctor.patients,
              },
            };
          });
        }).flat();
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },

    groupAppointmentsByDateAndDoctor(appointments) {
      const groupedByDate = {};
      appointments.forEach(appointment => {
        const dateKey = appointment.appointDate ? appointment.appointDate.split("T")[0] : null;
        if (dateKey === null) {
          console.warn("Appointment without a valid date", appointment);
          return;
        }
        if (!groupedByDate[dateKey]) {
          groupedByDate[dateKey] = {
            date: dateKey,
            doctors: [],
          };
        }
        const doctorKey = `${appointment.doctorFirstName} ${appointment.doctorLastName}`;
        const doctorGroup = groupedByDate[dateKey].doctors.find(doctor => doctor.doctorName === doctorKey);
        if (!doctorGroup) {
          groupedByDate[dateKey].doctors.push({
            appointId: appointment.appointId,
            doctorName: doctorKey,
            patients: [{
              firstName: appointment.patientFirstName,
              lastName: appointment.patientLastName,
            }],
          });
        } else {
          doctorGroup.patients.push({
            firstName: appointment.patientFirstName,
            lastName: appointment.patientLastName,
          });
        }
      });
      return Object.values(groupedByDate);
    },
    async postponeAppoint() {
      try {
        const appointId = this.selectedAppointId; // ต้องมี appointId ของนัดหมายที่ต้องการเลื่อน
        const newDate = moment(this.posponedate).format("YYYY-MM-DD") + " " + this.posponetime.hours + ":" + this.posponetime.minutes + ":00";
        await axios.put(`http://localhost:3000/changeAppointment/${appointId}`, {
          newDate
        });
        this.fetchAppointments()
      } catch (error) {
        console.error("Error change appointments:", error);
      }
    }
  },
};
</script>