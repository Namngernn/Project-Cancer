<template>
  <div>
    

    <!-- NAV -->
    <div class="nav">
<!-- หัวข้อ -->
<h3 class="sc1">ข้อมูลสถิติของผู้ป่วยโรงพยาบาลมะเร็งชลบุรี</h3>

<!-- Filter -->
<div class="d-flex justify-content-center gap-2 sc2">
<!-- GENDER -->
<div>
  <label for="" class="d-flex">เพศของผู้ป่วย</label>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style="background-color: #fff; color: #000;"
    >
      เพศของผู้ป่วย
    </button>
    <ul class="dropdown-menu">
      <li>
        <label class="dropdown-item">
          <input type="checkbox" v-model="selectAllGender" @change="toggleAllGender" />
          เลือกทั้งหมด
        </label>
      </li>
      <li v-for="gender in genders" :key="gender.value">
        <label class="dropdown-item">
          <input
            type="checkbox"
            :value="gender.value"
            v-model="showGender"
          />
          {{ gender.label }}
        </label>
      </li>
    </ul>
    <!-- <div class="mt-3">
      <strong>เพศที่เลือก:</strong> {{ selectedGenders }}
    </div> -->
  </div>
</div>
<!-- CANCER TYPE -->
<div>
<label for="" class="d-flex">ประเภทมะเร็ง</label>
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="background-color: #fff; color: #000;"
  >
    ประเภทมะเร็ง
  </button>
  <ul class="dropdown-menu">
    <li>
      <label class="dropdown-item">
        <input type="checkbox" v-model="selectAllCancer" @change="toggleAllCancer" />
        เลือกทั้งหมด
      </label>
    </li>
    <li v-for="cancer in cancers" :key="cancer.value" >
      <label class="dropdown-item">
        <input
          type="checkbox"
          :value="cancer.value"
          v-model="showCancer"
        />
        {{ cancer.label }}
      </label>
    </li>
  </ul>
  <!-- <div class="mt-3">
    <strong>ประเภทมะเร็งที่เลือก:</strong> {{ selectedCancers }}
  </div> -->
</div>
</div>
<!-- RANGE AGE -->
<div>
<label for="" class="d-flex">ช่วงอายุ</label>
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="background-color: #fff; color: #000;"
  >
    ช่วงอายุ
  </button>
  <ul class="dropdown-menu">
    <li>
      <label class="dropdown-item">
        <input type="checkbox" v-model="selectAllRangeage" @change="toggleAllRangeage" />
        เลือกทั้งหมด
      </label>
    </li>
    <li v-for="rangeage in rangeages" :key="rangeage.value" >
      <label class="dropdown-item">
        <input
          type="checkbox"
          :value="rangeage.value"
          v-model="showRangeage"
        />
        {{ rangeage.label }}
      </label>
    </li>
  </ul>
  <!-- <div class="mt-3">
    <strong>ช่วงอายุที่เลือก:</strong> {{ selectedRangeages }}
  </div> -->
</div>
</div>
<!-- CANCER STATE -->
<div>
<label for="" class="d-flex"> ระยะของมะเร็ง</label>
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="background-color: #fff; color: #000;"
  >
    ระยะของมะเร็ง
  </button>
  <ul class="dropdown-menu">
    <li>
      <label class="dropdown-item">
        <input type="checkbox" v-model="selectAllState" @change="toggleAllState" />
        เลือกทั้งหมด
      </label>
    </li>
    <li v-for="cancerstate in cancerstates" :key="cancerstate.value" >
      <label class="dropdown-item">
        <input
          type="checkbox"
          :value="cancerstate.value"
          v-model="showCancerstate"
          @change="setCancerState"
        />
        {{ cancerstate.label }}
      </label>
    </li>
  </ul>
  <!-- <div class="mt-3">
    <strong>ช่วงอายุที่เลือก:</strong> {{ selectedCancerstates }}
  </div> -->
</div>
</div>
<!-- FEEDBACK -->
<div>
<label for="" class="d-flex"> ผลข้างเคียง</label>
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="background-color: #fff; color: #000;"
  >
  ผลข้างเคียง
  </button>
  <ul class="dropdown-menu">
    <li>
      <label class="dropdown-item">
        <input type="checkbox" v-model="selectAllFeedback" @change="toggleAllFeedback" />
        เลือกทั้งหมด
      </label>
    </li>
    <li v-for="feedback in feedbacks" :key="feedback.value" >
      <label class="dropdown-item">
        <input
          type="checkbox"
          :value="feedback.value"
          v-model="showFeedback"
        />
        {{ feedback.label }}
      </label>
    </li>
  </ul>
  <!-- <div class="mt-3">
    <strong>ผลข้างเคียง:</strong> {{ selectedFeedbacks }}
  </div> -->
</div>
</div>
<!-- DISEASE -->
<!-- <div>
<label for="" class="d-flex">โรคประจำตัว</label>
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="background-color: #fff; color: #000;"
  >
  โรคประจำตัว
  </button>
  <ul class="dropdown-menu">
    <li>
      <label class="dropdown-item">
        <input type="checkbox" v-model="selectAllDisease" @change="toggleAllDisease" />
        เลือกทั้งหมด
      </label>
    </li>
    <li v-for="disease in diseases" :key="disease.value" >
      <label class="dropdown-item">
        <input
          type="checkbox"
          :value="disease.value"
          v-model="showDisease"
        />
        {{ disease.label }}
      </label>
    </li>
  </ul>
  <div class="mt-3">
    <strong>โรคประจำตัว:</strong> {{ selectedDiseases }}
  </div>
</div>
</div> -->
<!-- FOMULA -->
<div>
<label for="" class="d-flex">สูตรยา</label>
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style="background-color: #fff; color: #000;"
  >
  สูตรยา
  </button>
  <ul class="dropdown-menu">
    <li>
      <label class="dropdown-item">
        <input type="checkbox" v-model="selectAllFomula" @change="toggleAllFomula" />
        เลือกทั้งหมด
      </label>
    </li>
    <li v-for="fomula in fomulas" :key="fomula.value" >
      <label class="dropdown-item">
        <input
          type="checkbox"
          :value="fomula.value"
          v-model="showFomula"
        />
        {{ fomula.label }}
      </label>
    </li>
  </ul>
  <!-- <div class="mt-3">
    <strong>สูตรยา:</strong> {{ selectedFomulas }}
  </div> -->
</div>
</div>
</div>
<!--END Filter -->

    </div>
    <!-- END NAV -->

    <div class="con-chart">
      <h4>กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามชนิดมะเร็ง</h4>
      <Bar id="my-chart-id-1" :options="chartOptions1" :data="chartData1" />
    </div>
    <div class="con-chart">
      <h4>กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามกลุ่มอายุ</h4>
      <Bar id="my-chart-id-2" :options="chartOptions2" :data="chartData2" />
    </div>
    <div class="con-chart">
      <h4>กราฟแสดงอัตราส่วนของผลข้างเคียงตามมะเร็งแต่ละชนิด</h4>
      <Radar :data="radarData" :options="radarOptions" />
    </div>
    <div class="con-chart">
      <h4>กราฟแสดงอัตราส่วนของผลข้างเคียงตามสูตรยา</h4>
      <Radar :data="radarData2" :options="radarOptions2" />
    </div>

    <!-- กราฟ -->
    <!-- <div class="con-chart">
      <h4>กราฟแสดงผู้ป่วยแยกตามชนิดมะเร็ง</h4>
      <Bar id="my-chart-id-1" :options="chartOptions1" :data="chartData1" />
      <Bar id="my-chart-id-2" :options="chartOptions2" :data="chartData2" />
    </div>
    <div class="con-chart">
      <Bar id="my-chart-id-1" :options="chartOptions1" :data="chartData1" />
      <Bar id="my-chart-id-2" :options="chartOptions2" :data="chartData2" />
    </div>
    <div class="line-chart-container">
      <Radar :data="radarData2" :options="radarOptions2" />
      <Radar :data="radarData" :options="radarOptions" />
    </div>
    <div class="line-chart-container">
      <Radar :data="radarData2" :options="radarOptions2" />
      <Radar :data="radarData" :options="radarOptions" />
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
import { Bar, Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Filler
);

export default {
  name: "BarChart",
  components: { Bar, Radar },
  data() {
    return {
      StringState: "",
      selectAllGender: true,
      selectAllFomula: true,
      selectAllDisease: true,
      selectAllFeedback: true,
      selectAllState: true,
      selectAllRangeage: true,
      selectAllCancer: true,
      // เพิ่มมาตอนทำ Filter
      genders: [
        { label: "เพศชาย", value: "เพศชาย" },
        { label: "เพศหญิง", value: "เพศหญิง" },
      ],
      showGender: ["เพศหญิง", "เพศชาย"],
      fomulas: [
        { label: "AC", value: "AC" },
        { label: "FAC", value: "FAC" },
        { label: "Cis CCRT Cervix", value: "Cis CCRT Cervix" },
        { label: "Carbo CCRT Cervix", value: "Carbo CCRT Cervix" },
        { label: "5FU-Leucovorin", value: "5FU-Leucovorin" },
        { label: "Pac-Carbo", value: "Pac-Carbo" },
      ],
      showFomula: ["AC", "FAC", "Cis CCRT Cervix", "Carbo CCRT Cervix", "5FU-Leucovorin", "Pac-Carbo"],
      cancers: [
      { label: "มะเร็งปอด", value: "มะเร็งปอด" },
      { label: "มะเร็งกระเพาะอาหาร", value: "มะเร็งกระเพาะอาหาร" },
      { label: "มะเร็งลำไส้ใหญ่", value: "มะเร็งลำไส้ใหญ่" },
      { label: "มะเร็งตับ", value: "มะเร็งตับ" },
      { label: "มะเร็งตับอ่อน", value: "มะเร็งตับอ่อน" },
      { label: "มะเร็งต่อมไทรอยด์", value: "มะเร็งต่อมไทรอยด์" },
      { label: "มะเร็งไต", value: "มะเร็งไต" },
      { label: "มะเร็งกระเพาะปัสสาวะ", value: "มะเร็งกระเพาะปัสสาวะ" },
      { label: "มะเร็งอัณฑะ", value: "มะเร็งอัณฑะ" },
      { label: "มะเร็งต่อมลูกหมาก", value: "มะเร็งต่อมลูกหมาก" },
      { label: "มะเร็งถุงน้ำดี", value: "มะเร็งถุงน้ำดี" },
      { label: "มะเร็งมดลูก", value: "มะเร็งมดลูก" },
      { label: "มะเร็งเต้านม", value: "มะเร็งเต้านม" },
      { label: "มะเร็งรังไข่", value: "มะเร็งรังไข่" },
      ],
      showCancer: ["มะเร็งปอด", "มะเร็งกระเพาะอาหาร", "มะเร็งลำไส้ใหญ่", "มะเร็งตับ", "มะเร็งตับอ่อน", "มะเร็งต่อมไทรอยด์", "มะเร็งไต", "มะเร็งกระเพาะปัสสาวะ", 
      "มะเร็งอัณฑะ", "มะเร็งต่อมลูกหมาก", "มะเร็งถุงน้ำดี", "มะเร็งมดลูก", "มะเร็งเต้านม", "มะเร็งรังไข่"],
      rangeages: [
        { label: "อายุ 0-18", value: "อายุ 0-18" },
        { label: "อายุ 19-35", value: "อายุ 19-35" },
        { label: "อายุ 36-50", value: "อายุ 36-50" },
        { label: "อายุ 51-65", value: "อายุ 51-65" },
        { label: "อายุ 65+", value: "อายุ 65+" },
      ],
      showRangeage: ["อายุ 0-18", "อายุ 19-35", "อายุ 36-50", "อายุ 51-65", "อายุ 65+"],
      cancerstates: [
        { label: "มะเร็งระยะที่ 1", value: "มะเร็งระยะที่ 1" },
        { label: "มะเร็งระยะที่ 2", value: "มะเร็งระยะที่ 2" },
        { label: "มะเร็งระยะที่ 3", value: "มะเร็งระยะที่ 3" },
        { label: "มะเร็งระยะที่ 4", value: "มะเร็งระยะที่ 4" },
      ],
      showCancerstate: ["มะเร็งระยะที่ 1", "มะเร็งระยะที่ 2", "มะเร็งระยะที่ 3", "มะเร็งระยะที่ 4"],
      feedbacks: [
        { label: "กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ", value: "กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ" },
        { label: "เยื่อบุปากอักเสบ", value: "เยื่อบุปากอักเสบ" },
        { label: "ผมร่วง/ ผมบาง", value: "ผมร่วง/ ผมบาง" },
        { label: "อ่อนเพลีย / ครั่นเนื้อครั่นตัว", value: "อ่อนเพลีย / ครั่นเนื้อครั่นตัว" },
        { label: "ผิวหนังสีเข้มขึ้น", value: "ผิวหนังสีเข้มขึ้น" },
        { label: "ใจสั่น / หอบเหนื่อยง่าย", value: "ใจสั่น / หอบเหนื่อยง่าย" },
        { label: "กระเพาะปัสสาวะอักเสบ", value: "กระเพาะปัสสาวะอักเสบ" },
      ],
      showFeedback: ["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ", "เยื่อบุปากอักเสบ", "ผมร่วง/ ผมบาง", "อ่อนเพลีย / ครั่นเนื้อครั่นตัว", "ผิวหนังสีเข้มขึ้น", "ใจสั่น / หอบเหนื่อยง่าย", "กระเพาะปัสสาวะอักเสบ"],
      diseases: [
        { label: "diseases 1", value: "diseases 1" },
        { label: "diseases 2", value: "diseases 2" },
      ],
      showDisease: ["diseases 1", "diseases 2"],
      // END เพิ่มมาตอนทำ Filter

      ageGroups: {}, // เก็บข้อมูลอายุผู้ป่วย
      cancerSummary: {}, // เก็บข้อมูลอายุผู้ป่วย
      cancerStateSummary: {}, // cancerStateSummary
      feedbackSummary: {}, // เก็บข้อมูลผลข้างเคียงไว้ทำกราฟ
      fomulaSummary:{},
      // chartData1: {
      //   labels: [
      //     "มะเร็งปอด",
      //     "มะเร็งกระเพาะอาหาร",
      //     "มะเร็งลำไส้ใหญ่",
      //     "มะเร็งตับ",
      //     "มะเร็งตับอ่อน",
      //     "มะเร็งต่อมไทรอยด์",
      //     "มะเร็งไต",
      //     "มะเร็งกระเพาะปัสสาวะ",
      //     "มะเร็งอัณฑะ",
      //     "มะเร็งต่อมลูกหมาก",
      //     "มะเร็งถุงน้ำดี",
      //     "มะเร็งมดลูก",
      //     "มะเร็งเต้านม",
      //     "มะเร็งรังไข่",
      //   ],
      //   datasets: [
      //     {
      //       label: "ผู้ป่วยชาย",
      //       backgroundColor: "rgba(54, 162, 235, 0.6)",
      //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     },
      //     {
      //       label: "ผู้ป่วยหญิง",
      //       backgroundColor: "rgba(255, 99, 132, 0.6)",
      //       data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     },
      //   ],
      // },
      // chartData2: {
      //   labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
      //   datasets: [
      //     {
      //       label: "ผู้ป่วยชาย",
      //       backgroundColor: "rgba(75, 192, 192, 0.6)",
      //       data: [0, 0, 0, 0, 0], // Default values, will be updated after fetching data
      //     },
      //     {
      //       label: "ผู้ป่วยหญิง",
      //       backgroundColor: "rgba(153, 102, 255, 0.6)",
      //       data: [0, 0, 0, 0, 0], // Default values, will be updated after fetching data
      //     },
      //   ],
      // },
      chartOptions1: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามชนิดมะเร็ง",
          },
        },
      },
      chartOptions2: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามกลุ่มอายุ",
          },
        },
      },
      lineChartData: {
        labels: [
          "เดือนที่ 1",
          "เดือนที่ 2",
          "เดือนที่ 3",
          "เดือนที่ 4",
          "เดือนที่ 5",
          "เดือนที่ 6",
          "เดือนที่ 7",
        ],
        datasets: [
          {
            label: "ระดับความรุนแรงเฉลี่ยของผู้ป่วยทั้งหมด",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            data: [1, 4, 5, 3, 2, 2, 1],
            fill: true,
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "กราฟเส้นแสดงระดับความรุนแรงเฉลี่ยของผู้ป่วยทั้งหมดของมะเร็งแต่ละชนิด",
          },
        },
      },
      // radarData: {
      //   labels: [
      //     "กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ",
      //     "เยื่อบุปากอักเสบ",
      //     "ผมร่วง/ ผมบาง",
      //     "อ่อนเพลีย / ครั่นเนื้อครั่นตัว",
      //     "ผิวหนังสีเข้มขึ้น",
      //     "ใจสั่น / หอบเหนื่อยง่าย",
      //     "กระเพาะปัสสาวะอักเสบ",
      //   ],
      //   datasets: [
      //     {
      //       label: "มะเร็งปอด",
      //       backgroundColor: "rgba(179,181,198,0.2)",
      //       borderColor: "rgba(179,181,198,1)",
      //       pointBackgroundColor: "rgba(179,181,198,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(179,181,198,1)",
      //       data: [65, 59, 90, 81, 56, 55, 40],
      //     },
      //     {
      //       label: "มะเร็งกระเพาะอาหาร",
      //       backgroundColor: "rgba(255,99,132,0.2)",
      //       borderColor: "rgba(255,99,132,1)",
      //       pointBackgroundColor: "rgba(255,99,132,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งลำไส้ใหญ่",
      //       backgroundColor: "rgba(255,206,86,0.2)",
      //       borderColor: "rgba(255,206,86,1)",
      //       pointBackgroundColor: "rgba(255,206,86,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งตับ",
      //       backgroundColor: "rgba(75,192,192,0.2)",
      //       borderColor: "rgba(75,192,192,1)",
      //       pointBackgroundColor: "rgba(75,192,192,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งตับอ่อน",
      //       backgroundColor: "rgba(153,102,255,0.2)",
      //       borderColor: "rgba(153,102,255,1)",
      //       pointBackgroundColor: "rgba(153,102,255,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งต่อมไทรอยด์",
      //       backgroundColor: "rgba(255,159,64,0.2)",
      //       borderColor: "rgba(255,159,64,1)",
      //       pointBackgroundColor: "rgba(255,159,64,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งไต",
      //       backgroundColor: "rgba(255,255,102,0.2)",
      //       borderColor: "rgba(255,255,102,1)",
      //       pointBackgroundColor: "rgba(255,255,102,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งกระเพาะปัสสาวะ",
      //       backgroundColor: "rgba(102,255,102,0.2)",
      //       borderColor: "rgba(102,255,102,1)",
      //       pointBackgroundColor: "rgba(102,255,102,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งอัณฑะ",
      //       backgroundColor: "rgba(102,204,255,0.2)",
      //       borderColor: "rgba(102,204,255,1)",
      //       pointBackgroundColor: "rgba(102,204,255,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งต่อมลูกหมาก",
      //       backgroundColor: "rgba(255,102,255,0.2)",
      //       borderColor: "rgba(255,102,255,1)",
      //       pointBackgroundColor: "rgba(255,102,255,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งถุงน้ำดี",
      //       backgroundColor: "rgba(255,102,178,0.2)",
      //       borderColor: "rgba(255,102,178,1)",
      //       pointBackgroundColor: "rgba(255,102,178,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งมดลูก",
      //       backgroundColor: "rgba(178,102,255,0.2)",
      //       borderColor: "rgba(178,102,255,1)",
      //       pointBackgroundColor: "rgba(178,102,255,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งเต้านม",
      //       backgroundColor: "rgba(102,178,255,0.2)",
      //       borderColor: "rgba(102,178,255,1)",
      //       pointBackgroundColor: "rgba(102,178,255,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //     {
      //       label: "มะเร็งรังไข่",
      //       backgroundColor: "rgba(102,255,178,0.2)",
      //       borderColor: "rgba(102,255,178,1)",
      //       pointBackgroundColor: "rgba(102,255,178,1)",
      //       pointBorderColor: "#fff",
      //       pointHoverBackgroundColor: "#fff",
      //       pointHoverBorderColor: "rgba(255,99,132,1)",
      //       data: [28, 48, 40, 19, 96, 27, 100],
      //     },
      //   ],
      // },
      radarOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      radarOptions2: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    generateCancerStateString() {
      // สร้าง object ที่จับคู่ระหว่างข้อความกับหมายเลข
      const cancerStateMapping = {
          "มะเร็งระยะที่ 1": 1,
          "มะเร็งระยะที่ 2": 2,
          "มะเร็งระยะที่ 3": 3,
          "มะเร็งระยะที่ 4": 4
      };

      // กรอง selectedCancerstates และ map ให้เป็นตัวเลขตาม mapping
      const cancerStateNumbers = this.selectedCancerstates
          .map(state => cancerStateMapping[state])
          .filter(state => state !== undefined); // กรองค่า undefined ถ้ามี

      // แปลงเป็น string ที่คั่นด้วย comma
      const cancerStateString = cancerStateNumbers.join(',');
      
      // เก็บผลลัพธ์ใน StringState
      this.StringState = `cancerState=${cancerStateString}`;
      console.log("StringStateStringState2", this.StringState);
  },
    toggleAllGender() {
      if (this.selectAllGender) {
        this.showGender = this.genders.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showGender = []; // ยกเลิกทั้งหมด
      }
    },
    toggleAllCancer() {
      if (this.selectAllCancer) {
        this.showCancer = this.cancers.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showCancer = []; // ยกเลิกทั้งหมด
      }
    },
    toggleAllRangeage() {
      if (this.selectAllRangeage) {
        this.showRangeage = this.rangeages.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showRangeage = []; // ยกเลิกทั้งหมด
      }
    },
    toggleAllState() {
      this.fetchCancerData();
      if (this.selectAllState) {
        this.showCancerstate = this.cancerstates.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showCancerstate = []; // ยกเลิกทั้งหมด
      }
    },
    setCancerState() {
      this.fetchCancerData();
    },
    toggleAllFeedback() {
      if (this.selectAllFeedback) {
        this.showFeedback = this.feedbacks.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showFeedback = []; // ยกเลิกทั้งหมด
      }
    },
    toggleAllDisease() {
      if (this.selectAllDisease) {
        this.showDisease = this.diseases.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showDisease = []; // ยกเลิกทั้งหมด
      }
    },
    toggleAllFomula() {
      if (this.selectAllFomula) {
        this.showFomula = this.fomulas.map(g => g.value); // เลือกทั้งหมด
      } else {
        this.showFomula = []; // ยกเลิกทั้งหมด
      }
    },
  async fetchAgeGroups() {
      try {
      const response = await axios.get("http://localhost:3000/age-groups");
      this.ageGroups = response.data;
      console.log(this.ageGroups);
    } catch (error) {
      console.error("Error fetching age groups:", error);
    }
    },
    async fetchCancerData() {
        try {
        const response = await axios.get(`http://localhost:3000/cancerstate-cancer-summary?${this.StringState}`);
        this.cancerSummary = response.data;

        console.log("StringStateeiei", this.StringState);
        
      } catch (error) {
        console.error("Error fetching cancerSummary", error);
      }
    },
    async fetchCancerStateData() {
        try {
        const response = await axios.get("http://localhost:3000/cancerstate-cancer-summary?cancerState=1,2,3,4");
        this.cancerStateSummary = response.data;

        console.log(this.cancerStateSummary);
        
      } catch (error) {
        console.error("Error fetching cancerStateSummary", error);
      }
    },
    async fetchFeedbackData() {
        try {
        const response = await axios.get("http://localhost:3000/feedback-summary");
        this.feedbackSummary = response.data;

        console.log("feedback summary", this.feedbackSummary);
        console.log("this.feedbackSummary[0][0]", this.feedbackSummary["มะเร็งต่อมไทรอยด์"]["ผมร่วง/ ผมบาง"])
        
      } catch (error) {
        console.error("Error fetching feedbackSummary", error);
      }
    },
    async fetchFomulaData() {
        try {
        const response = await axios.get("http://localhost:3000/fomula-summary");
        this.fomulaSummary = response.data;
        
      } catch (error) {
        console.error("Error fetching fomulaSummary", error);
      }
    },
  },
  watch: {
  // ติดตามการเปลี่ยนแปลงของ selectedCancerstates
  selectedCancerstates() {
    // เรียกใช้ฟังก์ชัน generateCancerStateString ทุกครั้งที่ selectedCancerstates เปลี่ยนแปลง
    this.generateCancerStateString();
  }
  },
  mounted() {
  // เมื่อ component โหลด ฟังก์ชันนี้จะทำงาน
  this.generateCancerStateString();
  },
  created() {
    this.fetchAgeGroups(); // เรียกใช้ฟังก์ชันเมื่อ component ถูกสร้าง
    this.fetchCancerData(); //chart1
    this.fetchFeedbackData();
    this.fetchFomulaData();
    this.fetchCancerStateData();
  },
  computed: {
    // แปลงค่าที่เลือก (showGender) กลับมาเป็นชื่อภาษาไทย
    selectedGenders() {
      return this.genders
        .filter((gender) => this.showGender.includes(gender.value))
        .map((gender) => gender.value);
    },
    selectedFomulas() {
      return this.fomulas
        .filter((fomula) => this.showFomula.includes(fomula.value))
        .map((fomula) => fomula.value);
    },
    selectedCancers() {
      return this.cancers
        .filter((cancer) => this.showCancer.includes(cancer.value))
        .map((cancer) => cancer.value);
    },
    selectedRangeages() {
      return this.rangeages
        .filter((rangeage) => this.showRangeage.includes(rangeage.value))
        .map((rangeage) => rangeage.value);
    },
    selectedCancerstates() {
      return this.cancerstates
        .filter((cancerstate) => this.showCancerstate.includes(cancerstate.value))
        .map((cancerstate) => cancerstate.value);
    },
    selectedFeedbacks() {
      return this.feedbacks
        .filter((feedback) => this.showFeedback.includes(feedback.value))
        .map((feedback) => feedback.value);
    },
    selectedDiseases() {
      return this.diseases
        .filter((disease) => this.showDisease.includes(disease.value))
        .map((disease) => disease.value);
    },
    chartData1() {
      const datasets = [];
      if (this.selectedGenders.includes("เพศชาย")) {
        datasets.push({
          label: "ผู้ป่วยชาย",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          data: this.selectedCancers.map(
            (label) => this.cancerSummary[`${label} ชาย`] || 0
          ),
        });
      }

      if (this.selectedGenders.includes("เพศหญิง")) {
        datasets.push({
          label: "ผู้ป่วยหญิง",
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          data: this.selectedCancers.map(
            (label) => this.cancerSummary[`${label} หญิง`] || 0
          ),
        });
      }
      return {
        labels: this.selectedCancers,
        datasets: datasets,
      };
    },
    chartData2() {
      const datasets = [];
        // แปลง selected rangeages ให้เป็น key ของข้อมูลอายุ
        const selectedAgeKeys = this.selectedRangeages.map((range) => {
          switch (range) {
            case "อายุ 0-18":
              return "0-18";
            case "อายุ 19-35":
              return "19-35";
            case "อายุ 36-50":
              return "36-50";
            case "อายุ 51-65":
              return "51-65";
            case "อายุ 65+":
              return "65+";
            default:
              return null;
          }
        }).filter(Boolean);

        if (this.selectedGenders.includes("เพศชาย")) {
          datasets.push({
            label: "ผู้ป่วยชาย",
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            data: selectedAgeKeys.map((key) => this.ageGroups[`${key}Male`] || 0),
          });
        }

        if (this.selectedGenders.includes("เพศหญิง")) {
          datasets.push({
            label: "ผู้ป่วยหญิง",
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            data: selectedAgeKeys.map((key) => this.ageGroups[`${key}Female`] || 0),
          });
        }
      return {
        labels: this.selectedRangeages,
        datasets: datasets
      };
    },
    // radarData() {
    //   return {
    //     labels: this.selectedFeedbacks,
    //     datasets: [
    //       {
    //         label: "มะเร็งปอด",
    //         backgroundColor: "rgba(179,181,198,0.2)",
    //         borderColor: "rgba(179,181,198,1)",
    //         pointBackgroundColor: "rgba(179,181,198,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(179,181,198,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งปอด"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งปอด"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งปอด"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งปอด"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งปอด"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งปอด"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งปอด"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งกระเพาะอาหาร",
    //         backgroundColor: "rgba(255,99,132,0.2)",
    //         borderColor: "rgba(255,99,132,1)",
    //         pointBackgroundColor: "rgba(255,99,132,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะอาหาร"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งลำไส้ใหญ่",
    //         backgroundColor: "rgba(255,206,86,0.2)",
    //         borderColor: "rgba(255,206,86,1)",
    //         pointBackgroundColor: "rgba(255,206,86,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งลำไส้ใหญ่"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งตับ",
    //         backgroundColor: "rgba(75,192,192,0.2)",
    //         borderColor: "rgba(75,192,192,1)",
    //         pointBackgroundColor: "rgba(75,192,192,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งตับ"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับ"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับ"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับ"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับ"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับ"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับ"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งตับอ่อน",
    //         backgroundColor: "rgba(153,102,255,0.2)",
    //         borderColor: "rgba(153,102,255,1)",
    //         pointBackgroundColor: "rgba(153,102,255,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งตับอ่อน"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งต่อมไทรอยด์",
    //         backgroundColor: "rgba(255,159,64,0.2)",
    //         borderColor: "rgba(255,159,64,1)",
    //         pointBackgroundColor: "rgba(255,159,64,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมไทรอยด์"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งไต",
    //         backgroundColor: "rgba(255,255,102,0.2)",
    //         borderColor: "rgba(255,255,102,1)",
    //         pointBackgroundColor: "rgba(255,255,102,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งไต"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งไต"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งไต"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งไต"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งไต"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งไต"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งไต"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งกระเพาะปัสสาวะ",
    //         backgroundColor: "rgba(102,255,102,0.2)",
    //         borderColor: "rgba(102,255,102,1)",
    //         pointBackgroundColor: "rgba(102,255,102,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งกระเพาะปัสสาวะ"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งอัณฑะ",
    //         backgroundColor: "rgba(102,204,255,0.2)",
    //         borderColor: "rgba(102,204,255,1)",
    //         pointBackgroundColor: "rgba(102,204,255,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งอัณฑะ"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งต่อมลูกหมาก",
    //         backgroundColor: "rgba(255,102,255,0.2)",
    //         borderColor: "rgba(255,102,255,1)",
    //         pointBackgroundColor: "rgba(255,102,255,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งต่อมลูกหมาก"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งถุงน้ำดี",
    //         backgroundColor: "rgba(255,102,178,0.2)",
    //         borderColor: "rgba(255,102,178,1)",
    //         pointBackgroundColor: "rgba(255,102,178,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งถุงน้ำดี"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งมดลูก",
    //         backgroundColor: "rgba(178,102,255,0.2)",
    //         borderColor: "rgba(178,102,255,1)",
    //         pointBackgroundColor: "rgba(178,102,255,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งมดลูก"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งเต้านม",
    //         backgroundColor: "rgba(102,178,255,0.2)",
    //         borderColor: "rgba(102,178,255,1)",
    //         pointBackgroundColor: "rgba(102,178,255,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งเต้านม"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //       {
    //         label: "มะเร็งรังไข่",
    //         backgroundColor: "rgba(102,255,178,0.2)",
    //         borderColor: "rgba(102,255,178,1)",
    //         pointBackgroundColor: "rgba(102,255,178,1)",
    //         pointBorderColor: "#fff",
    //         pointHoverBackgroundColor: "#fff",
    //         pointHoverBorderColor: "rgba(255,99,132,1)",
    //         data: [
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["กดการทำงานของไขกระดูก หรือภูมิต้านทานต่ำ"] ?? 0,
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["เยื่อบุปากอักเสบ"] ?? 0,
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["ผมร่วง/ ผมบาง"] ?? 0,
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["อ่อนเพลีย / ครั่นเนื้อครั่นตัว"] ?? 0,
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["ผิวหนังสีเข้มขึ้น"] ?? 0,
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["ใจสั่น / หอบเหนื่อยง่าย"] ?? 0,
    //           this.feedbackSummary["มะเร็งรังไข่"]?.["กระเพาะปัสสาวะอักเสบ"] ?? 0,
    //         ],
    //       },
    //     ],
    //   }
        
    //   },
    radarData() {
      const colors = [
        "rgba(179,181,198,0.2)",
        "rgba(255,99,132,0.2)",
        "rgba(255,206,86,0.2)",
        "rgba(75,192,192,0.2)",
        "rgba(153,102,255,0.2)",
        "rgba(255,159,64,0.2)",
        "rgba(255,255,102,0.2)",
        "rgba(102,255,102,0.2)",
        "rgba(102,204,255,0.2)",
        "rgba(255,102,255,0.2)",
        "rgba(255,102,178,0.2)",
        "rgba(178,102,255,0.2)",
        "rgba(102,178,255,0.2)",
        "rgba(102,255,178,0.2)",
      ];

      const borderColorList = [
        "rgba(179,181,198,1)",
        "rgba(255,99,132,1)",
        "rgba(255,206,86,1)",
        "rgba(75,192,192,1)",
        "rgba(153,102,255,1)",
        "rgba(255,159,64,1)",
        "rgba(255,255,102,1)",
        "rgba(102,255,102,1)",
        "rgba(102,204,255,1)",
        "rgba(255,102,255,1)",
        "rgba(255,102,178,1)",
        "rgba(178,102,255,1)",
        "rgba(102,178,255,1)",
        "rgba(102,255,178,1)",
      ];

      return {
        labels: this.selectedFeedbacks,
        datasets: this.selectedCancers.map((cancerType, index) => ({
          label: cancerType,
          backgroundColor: colors[index],
          borderColor: borderColorList[index],
          pointBackgroundColor: borderColorList[index],
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: borderColorList[index],
          data: this.selectedFeedbacks.map(
            feedback => this.feedbackSummary[cancerType]?.[feedback] ?? 0
          )
        }))
      };
    },
    radarData2() {
      const colors = [
        "rgba(179,181,198,0.2)",
        "rgba(255,99,132,0.2)",
        "rgba(255,206,86,0.2)",
        "rgba(75,192,192,0.2)",
        "rgba(153,102,255,0.2)",
        "rgba(255,159,64,0.2)",
        "rgba(255,255,102,0.2)",
        "rgba(102,255,102,0.2)",
        "rgba(102,204,255,0.2)",
        "rgba(255,102,255,0.2)",
        "rgba(255,102,178,0.2)",
        "rgba(178,102,255,0.2)",
        "rgba(102,178,255,0.2)",
        "rgba(102,255,178,0.2)",
      ];

      const borderColorList = [
        "rgba(179,181,198,1)",
        "rgba(255,99,132,1)",
        "rgba(255,206,86,1)",
        "rgba(75,192,192,1)",
        "rgba(153,102,255,1)",
        "rgba(255,159,64,1)",
        "rgba(255,255,102,1)",
        "rgba(102,255,102,1)",
        "rgba(102,204,255,1)",
        "rgba(255,102,255,1)",
        "rgba(255,102,178,1)",
        "rgba(178,102,255,1)",
        "rgba(102,178,255,1)",
        "rgba(102,255,178,1)",
      ];

      return {
        labels: this.selectedFeedbacks,
        datasets: this.selectedFomulas.map((cancerType, index) => ({
          label: cancerType,
          backgroundColor: colors[index],
          borderColor: borderColorList[index],
          pointBackgroundColor: borderColorList[index],
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: borderColorList[index],
          data: this.selectedFeedbacks.map(
            feedback => this.fomulaSummary[cancerType]?.[feedback] ?? 0
          )
        }))
      };
    }

  },
  
  
};
</script>

<style scoped>
canvas {
  max-width: 80%;
  height: 700px !important;
}

.con-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #90EEB7;
  margin: 20px 150px;
  border-radius: 15px;
}

.con-chart h4 {
  width: 100%;
  background-color: #90EEB7;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1C2939;
  font-size: 18px;
  font-weight: bold;
  
  border-radius: 15px  15px 0px 0px;
}


.line-chart-container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 100%;
}

h2 {
  text-align: center;
  margin: 20px 0;
}

.nav {
display: flex;
justify-content: space-between; /* จัดให้อยู่ซ้าย-ขวา */
align-items: center; /* จัดให้อยู่กึ่งกลางแนวตั้ง */
width: 100%; /* ให้เต็มความกว้าง */
padding: 10px 20px; /* เพิ่มระยะห่างด้านใน */
background-color: #1C2939; /* สีพื้นหลัง (ปรับได้) */
color: white;

}

.sc1, .sc2 {
  flex: 1; /* ให้แต่ละ div ยืดได้ */
}
.sc1 {
  text-align: left; /* ชิดซ้าย */
}
.sc2 {
  text-align: right; /* ชิดขวา */
}




</style>
