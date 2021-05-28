<template>
  <div class="background">
    <div class="login-register">
      <div class="contain">
        <div class="big-box">
          <div class="big-contain">
            <div class="btitle">会议管理人员账户登录</div>
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
        </div>
        <div class="small-box">
          <div style="margin-top:40%">
            <span style="color:white;font-size:19px;margin-left:31%;margin-top:72%">请选择您的职能：</span>
            <el-radio-group v-model="typeSelect" style="margin-top:20%;margin-left:9%">
              <el-radio-button label="评审"></el-radio-button>
<!--              <el-radio-button label="药师"></el-radio-button>-->
              <el-radio-button label="管理员"></el-radio-button>
<!--              <el-radio-button label="财务"></el-radio-button>-->
<!--              <el-radio-button label="分诊"></el-radio-button>-->
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reviewerlogin",
  data() {
    return {
      passwordError: false,
      typeSelect:'',
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
    login() {
      if(this.typeSelect=='')
        alert("失败：请选择您的职能类型");
      else{
        const self = this;
        if (self.form.userid != "" && self.form.userpwd != "") {
          if(this.typeSelect == "评审"){
            this.typeSelect = "doctor"
          }else if(this.typeSelect == "药师"){
            this.typeSelect = "pharmacist"

          }else if(this.typeSelect == "管理员"){
            this.typeSelect = "cashier"

          }else{
            this.typeSelect = "administrator"
          }
          self
           .$axios({
              method: "post",
              url: "/user/login",
              params: {
                userID: self.form.userid,
                userCode: self.form.userpwd,
                type:this.typeSelect,
              },
            })
            .then((res) => {
              switch (res.data.status) {
                case 1:

                  alert("登录成功！");
                console.log(this.typeSelect)
                if(this.typeSelect == "doctor"){
                      this.$router.push({path:"/rehome"})
                }else if(this.typeSelect == "pharmacist"){
                      this.$router.push({path:"/medihome"})

                }else if(this.typeSelect == "cashier"){
                      this.$router.push({path:"/adhome"})

                }else{
                      this.$router.push({path:"/admhome"})
                }
                this.$store.state.userID = res.data.body.userID
                this.$store.state.name = res.data.body.userName
                this.$store.state.gender = res.data.body.userGender
                this.$store.state.birthday = res.data.body.userBirthday
                  break;
               case 0:
                  this.passwordError = true;
                  break;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("填写不能为空！");
       }
      }
    },

    FENZHEN(){
        this.$router.push({path:'/fenzhen'});
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
  left: 31%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  margin-left:10%;
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
  width: 57%;
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
  width: 45%;
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
