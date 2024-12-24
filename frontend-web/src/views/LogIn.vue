<template>
  <div>
    <nav style="background: white; height: 10%">
      <div class="row align-items-center">
        <div class="d-flex col-3 align-self-center">
          <img
            src="../assets/pink-ribbon.png"
            alt=""
            style="margin: 10px; width: 10%; height: 10%"
          />
          <p style="margin-top: 10px">Cancer</p>
        </div>
      </div>
    </nav>
    <div class="container-fluid d-flex justify-content-center">
      <div class="card" style="width: 40%; position: absolute; top: 20%">
        <div class="card-body">
          <div class="col" style="padding: 20px; padding-top: 40px">
            <form>
              <h5 style="text-align: left; padding-bottom: 30px"><b>เข้าสู่ระบบ</b></h5>
              <div class="row" style="margin-bottom: 20px">
                <label for="exampleInputEmail1" class="form-label"
                  ><b>ชื่อผู้ใช้</b></label
                >
                <input
                  type="text"
                  v-model="userName"
                  class="form-control"
                  id="exampleInputEmail1"
                  required
                />
              </div>
              <div class="row" style="margin-bottom: 20px">
                <label for="exampleInputPassword1" class="form-label"
                  ><b>รหัสผ่าน</b></label
                >
                <input
                  type="password"
                  v-model="psw"
                  class="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div class="row">
                <button
                  type="button"
                  class="btn btn-block"
                  style="background-color: #0a6b3a; color: #ffffff"
                  @click="goToHome()"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
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
  name: "LogIn",
  data() {
    return {
      userName: "",
      psw: "",
    };
  },
  methods: {
    goToHome() {
      const data = {
        userName: this.userName,
        psw: this.psw,
      };
      axios
        .post(`http://localhost:3000/login`, data)
        .then((response) => {
          console.log(response.data);
          if (response.data == "not found") {
            Swal.fire({
              text: "ไม่พบชื่อผู้ใช้งาน",
              icon: "error",
            });
          } else if (response.data == "ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง") {
            Swal.fire({
              title: "",
              text: "ชื่อผู้ใช้งาน หรือรหัสผ่านไม่ถูกต้อง",
              icon: "question",
            });
          } else {
            Swal.fire({
              title: "",
              text: "ล็อกอินสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            }).then((result) => {
              if (result.isConfirmed) {
                let userId = response.data.userId;
                this.$router.push(`/HomePage/${userId}`);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
