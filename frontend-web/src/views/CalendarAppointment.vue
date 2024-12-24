<template>
    <v-container>
      <!-- FullCalendar -->
      <FullCalendar :options="calendarOptions" :key="calendarKey" />
    </v-container>
  </template>
  
  <script>
  import FullCalendar from "@fullcalendar/vue3";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import interactionPlugin from "@fullcalendar/interaction";
  import timeGridPlugin from "@fullcalendar/timegrid";
  import listGridPlugin from "@fullcalendar/list";
  import axios from 'axios';
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
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
          eventContent: function(eventInfo) {
            const doctorName = eventInfo.event.extendedProps.doctorName;
            const date = eventInfo.event.extendedProps.date;
            const patients = eventInfo.event.extendedProps.patients;
            
            // แสดงรายชื่อผู้ป่วยในรูปแบบรายการ
            const patientList = patients
              ? patients.map(patient => `<li>${patient.firstName} ${patient.lastName}</li>`).join('')
              : '';
  
            return {
              html: `
                <div style="padding: 10px;">
                  <strong>วันที่: ${date}</strong><br/>
                  <strong>หมอ: ${doctorName}</strong>
                  <ul>${patientList}</ul>
                </div>
              `,
            };
          },
        },
      };
    },
    mounted() {
      this.fetchAppointments();
    },
    methods: {
      async fetchAppointments() {
        try {
          const response = await axios.get("http://localhost:3000/getAppointment");
          const appointments = response.data;
          
          // เรียกใช้ groupAppointmentsByDateAndDoctor เพื่อนำข้อมูลที่จัดกลุ่มแล้วไปใช้
          const groupedAppointments = this.groupAppointmentsByDateAndDoctor(appointments);
          
          // สร้าง events สำหรับ FullCalendar
          this.calendarOptions.events = groupedAppointments.map(group => {
            return group.doctors.map(doctor => {
              return {
                title: `หมอ: ${doctor.doctorName}`,
                date: group.date,  // ใช้วันที่จากกลุ่ม
                extendedProps: {
                  doctorName: doctor.doctorName,
                  date: group.date,
                  patients: doctor.patients,
                },
              };
            });
          }).flat();  // ใช้ .flat() เพื่อรวม array จากหลาย doctor ให้เป็น array เดียว
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      },
  
      groupAppointmentsByDateAndDoctor(appointments) {
        const groupedByDate = {};
  
        // Group appointments by date first
        appointments.forEach(appointment => {
          const dateKey = appointment.appointDate ? appointment.appointDate.split("T")[0] : null;  // ตรวจสอบว่า appointDate ไม่เป็น null ก่อน
  
          if (dateKey === null) {
            console.warn("Appointment without a valid date", appointment);
            return; // ข้ามรายการนี้ไปหาก appointDate เป็น null
          }
  
          if (!groupedByDate[dateKey]) {
            groupedByDate[dateKey] = {
              date: dateKey,
              doctors: [],
            };
          }
  
          // Group by doctor
          const doctorKey = `${appointment.doctorFirstName} ${appointment.doctorLastName}`;
  
          const doctorGroup = groupedByDate[dateKey].doctors.find(doctor => doctor.doctorName === doctorKey);
          if (!doctorGroup) {
            groupedByDate[dateKey].doctors.push({
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
  
        // Convert grouped object to an array of date groups
        return Object.values(groupedByDate);
      },
    },
  };
  </script>