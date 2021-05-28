<template>
  <div class="background">
    <div class="login-register">
      <div class="contain">
        <div class="big-box" :class="{ active: isLogin }">
          <div class="big-contain" v-if="isLogin">
            <div class="btitle">账户登录</div>
            <div class="bform">
              <input type="text" placeholder="证件号" v-model="form.userid" />
              <span class="errTips" v-if="idError">* 证件号填写错误 *</span>
              <input
                type="password"
                placeholder="密码"
                v-model="form.userpwd"
              />
              <span class="errTips" v-if="passwordError">* 密码填写错误 *</span>
            </div>
            <button class="bbutton" @click="login">登录</button>
          </div>
          <div class="big-contain" v-else>
            <div class="btitle">注册账户</div>
            <div class="bform">
              <input type="text" placeholder="用户名" v-model="form.username" />
              <input type="text" placeholder="证件号" v-model="form.userid" />
              <span class="errTips" v-if="existed">* 证件号已经存在！ *</span>
              <input
                type="password"
                placeholder="密码"
                v-model="form.userpwd"
              />
            </div>
            <div class="cform">性别：
              <el-radio-group v-model="genderSelect">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="dform">出生日期：
              <el-input-number v-model="birthday_year" @change="handleChange" :min="1000" :max="2999" label="年" controls-position="right" size="small"></el-input-number>年
              <el-input-number v-model="birthday_month" @change="handleChange" :min="1" :max="12" label="月" controls-position="right" size="small"></el-input-number>月
              <el-input-number v-model="birthday_day" @change="handleChange" :min="1" :max="31" label="月" controls-position="right" size="small"></el-input-number>日
            </div>
            <button class="bbutton" @click="register">注册</button>
          </div>
        </div>
        <div class="small-box" :class="{ active: isLogin }">
          <div class="small-contain" v-if="isLogin">
            <div class="stitle">欢迎参会</div>
            <p class="scontent">注册账户 学术交流</p>
            <button class="sbutton" @click="changeType">注册</button>
          </div>
          <div class="small-contain" v-else>
            <div class="stitle">欢迎回来</div>
            <p class="scontent">若您已有账户 请登录</p>
            <button class="sbutton" @click="changeType">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-register",
  data() {
    return {
      genderSelect:"男",
      birthday_year:2000,
      birthday_month:1,
      birthday_day:1,
      isLogin: false,
      passwordError: false,
      existed: false,
      form: {
        username: "",
        userid: "",
        userpwd: "",
      },
    };
  },
  methods: {
    handleChange(value) {
        console.log(value);
      },
    changeType() {
      this.isLogin = !this.isLogin;
      this.form.userid = "";
      this.form.userpwd = "";
    },
    login() {
      const self = this;
      console.log("here")
      if (self.form.userid != "" && self.form.userpwd != "") {
        console.log(self.form.userid)
        self
          .$axios({
            method: "post",
            url: "/patient/login",
            params: {
              userID: self.form.userid,
              userCode: self.form.userpwd,
            },
          })
          .then((res) => {
            switch (res.data.status) {
              case 1:
                alert(res.data.message);
                this.$router.push({path:'/pathome'})
                this.$store.state.userID = res.data.body.userID
                this.$store.state.name = res.data.body.userName
                this.$store.state.gender = res.data.body.userGender
                this.$store.state.birthday = res.data.body.userBirthday
                break;
              case 0:
                this.passwordError = true;
                break;
              case 2:
                alert(res.data.message)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空！");
      }
    },
    register() {
      const self = this;
      if (self.form.userid != "" && self.form.userpwd != "" && self.form.username != "") {

        self
          .$axios({
            method: "post",
            url: "/patient/register",
            params: {
              userName: self.form.username,
              userID: self.form.userid,
              userCode: self.form.userpwd,
              userGender:self.genderSelect,
              userBirthday: self.birthday_year + "-"+ self.birthday_month + "-" + self.birthday_day,
            },
          })
          .then((res) => {
            console.log(res.data)
            switch (res.data.status) {
              case 0:
                alert("注册失败")
                break;
              case 1:
                alert("注册成功！");
                this.login();
                break;
              case 2:
                this.existed = true;
                break;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("填写不能为空！");
      }
    },
  },
};
</script>

<style scoped="scoped">
.background {
  background-image: url("~@/style/background1.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100%;
  height: 100%;
}

.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain {
  width: 60%;
  height: 60%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(255, 255, 255);
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(23, 12, 182);
}
.bform {
  width: 100%;
  height: 27%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 27px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.cform {
  width: 57%;
  height: 2%;
  padding: 1em 0;
  display: flex;
  flex-direction:row;
  justify-content: space-around;
  align-items: center;
}
.dform {
  width: 79%;
  height: 5%;
  padding: 1em 0;
  display: flex;
  flex-direction:row;
  justify-content: space-around;
  align-items: center;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(81, 149, 226);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(31, 0, 145), rgb(136, 19, 214));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
