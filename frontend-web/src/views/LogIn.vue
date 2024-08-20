<template>
  <div>
<!-- test upgit -->
<!-- nav bar -->
    <nav class="navbar">
      <div class="container">
        <div class="navbar-brand">
          <img
            src="../assets/pink-ribbon.png"
            alt=""
            class="navbar-logo"
            />
          <span class="navbar-title">Cancer</span>
          <!-- <p style="margin-top: 10px">Cancer</p> -->
        </div>
      </div>
    </nav>
<!-- card login-->
    <div class="login-container">
      <div class="login-card">
        <div class="card-body">
            <form>
              <h5 class="login-title"><b>เข้าสู่ระบบ</b></h5>
              <!-- กรอกชื่อผู้ใช้ -->
              <div class="form-group">
                <label for="exampleInputEmail1" class="form-label"><b>ชื่อผู้ใช้</b></label>
                <input
                  type="text"
                  v-model="userName"
                  class="form-control"
                  id="exampleInputEmail1"
                  required
                />
              </div>
              <!-- กรอกรหัสผ่าน -->
              <div class="row" style="margin-bottom: 20px">
                <label for="exampleInputPassword1" class="form-label"
                  ><b>รหัสผ่าน</b></label>
                <input
                  type="password"
                  v-model="psw"
                  class="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <!-- ปุ่มเข้าสูระบบ -->
              <div class="row">
                <button
                  type="button"
                  class="btn btn-login"
                  @click="goToHome()">เข้าสู่ระบบ</button>
              </div>
            </form>
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
.navbar {
  background: white;
  padding: 10px 0;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-logo {
  width: 40px;
  height: auto;
  margin-right: 10px;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 30px;
}

.login-title {
  text-align: left;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #0a6b3a;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-logo {
    width: 30px;
  }
  
  .navbar-title {
    font-size: 1.2rem;
  }
  
  .login-card {
    max-width: 100%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .login-card {
    max-width: 60%;
  }
}

@media (min-width: 1025px) {
  .login-card {
    max-width: 400px;
  }
}
</style>
