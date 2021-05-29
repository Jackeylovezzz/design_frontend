<template>
  <div class="patient_home">
    <el-menu
      :default-active="activeIndex"
      class="patientGuide"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">会议管理</template>
        <el-menu-item
          index="1-1"
          @change="queryAppointment"
        >查看我的预约</el-menu-item>
        <el-menu-item index="1-2">预约会议</el-menu-item>
      </el-submenu>
      <el-menu-item
        @click="queryAppointment"
        index="2"
      >查看会议</el-menu-item>
      <el-menu-item index="3">我的账户</el-menu-item>
      <el-menu-item index="4">提交论文</el-menu-item>
    </el-menu>
    <div class="patient_contain">
      <div
        class="myBooking"
        v-if="choice == '1-1'"
      >
        <div
          class="showBooking"
          v-if="ifBooking == '1'"
        >
          <el-card class="myBooking-box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span class="text2 item title">我的预约</span>
              <el-button
                style="float: right; padding: 3px 0"
                @click="cancelBook"
                type="text"
              >取消预约</el-button>
            </div>
            <div
              v-for="item in bookingContent"
              :key="item"
              class="text1 item"
            >
              {{ item.key + " " + item.value }}
            </div>
          </el-card>
        </div>
        <div
          class="noBooking"
          v-if="ifBooking == '0'"
        >
          <el-card class="noBooking-box-card">
            {{ "您暂时没有有效的预约" }}
          </el-card>
        </div>
      </div>
      <div
        class="toBook"
        v-if="choice == '1-2'"
      >
        <div v-if="ifBooking == '0'">
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="bookcard">
                <el-card>
                  <el-select
                    size="medium"
                    v-model="officeChoice"
                    @change="getMeetingInfo"
                    placeholder="请选择会议"
                  >
                    <el-option
                      v-for="item in OfficeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    >
                    </el-option>
                  </el-select>
                  <el-card v-if="meetingSelected == 1">
                    <el-col span="16"> this </el-col>
                  </el-card>
                  <el-col span="4"> </el-col>
                  <el-col
                    span="16"
                    v-if="meetingSelected == 1"
                  >
                    <el-button
                      type="success"
                      @click="bookCommit"
                      size="mini"
                      style="margin-left: 12.7%"
                    >预约</el-button>
                  </el-col>
                </el-card>
              </div>
            </el-col>
          </el-row>
          <!-- <div class="bookIfSpecialist">
            <el-radio-group
              v-model="ifSpecialist"
              class="ifSpecialistChoose"
            >
             <el-radio-button
           label="普通门诊"
             @click="getDept()"
             ></el-radio-button>
       <el-radio-button label="专家门诊"
              @click="getDept()">
               
          </el-radio-button>
            </el-radio-group>
          </div>
          <div class="bookForm">
            <h5 class="title2">请选择会议：</h5>
            <el-select
              v-model="officeChoice"
              @change="getDeptExpert"
              placeholder="请选择会议"
            >
              <el-option
                v-for="item in OfficeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
            <h5
              class="title2"
              v-if="ifSpecialist=='专家门诊'"
            >请选择专家：</h5>
            <el-select
              v-model="specialistChoice"
              placeholder="请选择专家"
              v-if="ifSpecialist=='专家门诊'"
            >
              <el-option
                v-for="item in SpecialistOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
            <h5 class="title2">请选择预约日期：</h5>
            <el-select
              v-model="weekChoice"
              @change="weekChange"
              placeholder="请选择周次"
            >
              <el-option
                v-for="item in WeekOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <h5></h5>
            <el-select
              v-model="dayChoice"
              placeholder="请选择具体日次"
              @change="dayChange"
              style="margin-top: 2%"
            >
              <el-option
                v-for="item in DayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
            <h5 class="title2"></h5>
            <el-button
              type="success"
              @click="bookCommit"
              size="mini"
              style="margin-left: 12.7%"
            >预约</el-button>
          </div> -->
        </div>
        <div
          class="alreadyBooking"
          v-if="ifBooking == '1'"
        >
          <el-card class="alreadyBooking-box-card">
            {{ "您已有预约，无法再次预约" }}
          </el-card>
        </div>
      </div>
      <div
        class="myInLine"
        v-if="choice == '2'"
      >
        <div class="myInLineContain">
          <div style="display: flex; flex-direction: row">
            <span style="font-size: 20px; margin-left: 0%; font-weight: bold">类别：</span>
            <el-radio-group
              v-model="inLineCheckTypeChoice"
              style="
                display: flex;
                flex-direction: row;
                width: 27%;
                margin-bottom: 3%;
              "
              @change="inLineCheckTypeChosen"
            >
              <el-radio-button label="参会人员信息"></el-radio-button>
              <!--              <el-radio-button label="专家门诊"></el-radio-button>-->
            </el-radio-group>
            <span
              style="font-size: 20px; margin-left: 15%; font-weight: bold"
              v-if="inLineCheckTypeChoice != ''"
            >会议：</span>
            <el-select
              v-model="inLineCheckOfficeChoice"
              @change="getQueueData"
              style="margin-left: 2%; margin-bottom: 3%; width: 29%"
              placeholder="请选择会议"
              v-if="inLineCheckTypeChoice != ''"
            >
              <el-option
                v-for="item in OfficeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </div>
          <el-table
            :data="inLineData"
            stripe
            style="width: 100%"
            max-height="660"
          >
            <el-table-column
              prop="numberInLine"
              label="序号"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
            > </el-table-column>
          </el-table>
        </div>
      </div>
      <div
        class="myInfo"
        v-if="choice == '3'"
      >
        <div class="myInfoContain">
          <el-card class="myInfo-box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span class="text2 item title">我的账户信息</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="open"
              >退出登录</el-button>
            </div>
            <div
              v-for="item in infoContent"
              :key="item"
              class="text1 item"
            >
              {{ item.key + " " + item.value }}
            </div>
          </el-card>
        </div>
      </div>
      <div
        class="myInfo"
        v-if="choice == '4'"
      >
        <el-card>
          <div class="upload-image">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
            >
              <el-form-item
                label="论文名称"
                prop="name"
              >
                <el-input
                  v-model="ruleForm.name"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="论文摘要"
                prop="abstract"
              >
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="ruleForm.abstract"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="论文作者"
                prop="author"
              >
                <el-input
                  v-model="ruleForm.author"
                  style="width: 300px"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="上传论文"
                ref="uploadElement"
                prop="imageUrl"
              >
                <el-input
                  v-model="ruleForm.imageUrl"
                  v-if="false"
                ></el-input>
                <el-upload
                  class="avatar-uploader"
                  :on-preview="handlePreview"
                  ref="upload"
                  :show-file-list="true"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :before-upload="beforeUpload"
                  :on-change="handleChange"
                  :auto-upload="false"
                  :file-list="fileList"
                  :http-request="submitfile"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >立即提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
      <!--        <div>-->
      <!--          <div class="con">-->
      <!--            <div class="tip">选择文件：</div>-->
      <!--            <input class="file" type="file" title="请选择文件" value="请选择文件">-->
      <!--            <div class="tip">输入姓名：</div>-->
      <!--            <input class="inputS" type="text" v-model="name" placeholder="请在此输入姓名">-->
      <!--            <button class="submit" @click="submit">提交</button>-->
      <!--          </div>-->
      <!--        </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      fileList: [],
      activeIndex: "3",
      choice: "3",
      meetingInfo: "",
      ifBooking: 0,
      formdata: new FormData(),
      meetingSelected: 0,
      bookingContent: [],
      infoContent: [
        { key: "姓名：", value: this.$store.state.name },
        { key: "性别：", value: this.$store.state.gender },
        { key: "出生日期：", value: this.$store.state.birthday },
      ],
      ifSpecialist: "普通门诊",
      ruleForm: {
        name: "",
        imageUrl: "",
        abstract: "",
        author: "",
      },
      rules: {
        name: [{ required: true, message: "请输入论文名称", trigger: "blur" }],
        abstract: [
          { required: true, message: "请输入论文摘要", trigger: "blur" },
        ],
        imageUrl: [{ required: true, message: "请上传论文", trigger: "blur" }],
        author: [
          { required: true, message: "请输入论文作者", trigger: "blur" },
        ],
      },
      date: null,

      inLineCheckTypeChoice: "",

      OfficeOptions: [],
      originAppoint: null,

      originDocList: [],
      originDeptList: [],

      officeChoice: "",
      inLineCheckOfficeChoice: "",

      SpecialistOptions: [],

      specialistChoice: "",

      WeekOptions: [
        {
          value: "选项1",
          label: "本周",
        },
        {
          value: "选项2",
          label: "下周",
        },
      ],

      weekChoice: "",

      wk: "",

      DayOptions: [
        {
          value: 1,
          label: "周一",
          disabled: true,
        },
        {
          value: 2,
          label: "周二",
          disabled: true,
        },
        {
          value: 3,
          label: "周三",
          disabled: true,
        },
        {
          value: 4,
          label: "周四",
          disabled: true,
        },
        {
          value: 5,
          label: "周五",
          disabled: true,
        },
      ],

      dayChoice: "",

      inLineData: [],

      name: "",
    };
  },
  mounted() {
    this.getDept();
    this.queryAppointment();
  },
  computed: {},
  methods: {
    submitfile(param) {
      var fileObj = param.file;
      this.formData.append("file", param.file);
    },
    submitForm(formName) {
      let vm = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          vm.formdata.append("paperName", this.ruleForm.name);
          vm.formdata.append("paperabstract", this.ruleForm.abstract);
          vm.formdata.append("paperAuthor", this.ruleForm.author);
          vm.formdata.append("pID", this.$store.userID);

          var config = {
            method: "post",
            url: "http://localhost:8081/appoint/upload",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            data: vm.formdata,
          };
          this.$message({ message: "提交成功", type: "success" });
          this.resetForm("ruleForm");
          axios(config)
            .then(function(response) {
              console.log(JSON.stringify(response.data.body));
              this.$message({ message: "提交成功", type: "success" });
              this.resetForm("ruleForm");
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          return false;
        }
      });
    },
    handlePreview() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.imageUrl = "";
      this.$refs.upload.clearFiles();
    },

    handleChange(file, fileList) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeUpload(file) {
      return true;
    },

    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.choice = key;
    },
    printsuccess() {
      alert("上传成功");
    },
    submitUpload() {
      this.$refs.upload.submit();
      alert("上传成功");
    },
    getDept() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: "/appoint/queryAllDept",
        })
        .then((res) => {
          console.log(res.data.body);
          if (res.data.status === 1) {
            self.OfficeOptions = [];
            self.meetingList = res.data.body;
            for (var i = 0; i < res.data.body.length; i++) {
              self.OfficeOptions.push({
                label: res.data.body[i].rName,
                value: res.data.body[i].rID,
              });
            }
          }
        });
    },
    getMeetingInfo() {
      const self = this;
      self.meetingSelected = 1;
      //officechoice -> meetingid
      self
        .$axios({
          method: "get",
          url: "/appoint/queryOneDept/" + this.officeChoice,
          params: {},
        })
        .then((res) => {
          if (res.data.status) console.log(res.data.body);
          this.meetingInfo = res.data.body;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getQueueData(id, type) {
      if (this.inLineCheckTypeChoice === "普通门诊") type = "dept";
      else if (this.inLineCheckTypeChoice === "专家门诊") type = "expert";
      const self = this;
      self
        .$axios({
          method: "get",
          url: `/Triage/queryCurrQueue/${id}/${type}`,
          params: {},
        })
        .then(({ data }) => {
          if (data.status === 1) {
            let reshapeData = this.deptListReshape(data.body);
            this.inLineData = reshapeData;
          } else {
            alert("获取错误！");
            //TODO
          }
        });
    },

    deptListReshape(data) {
      //设originDeptList为
      let res = [];
      for (let i = 0; i < data.length; ++i) {
        status = "论文未提交";
        if (i === 0) {
          status = "论文已提交";
        }
        res.push({
          numberInLine: `${i + 1}`,
          name: data[i].userName,
          state: status,
        });
      }
      return res;
    },

    docListReshape() {
      var i = 0;
      var value = "";
      var label = "";
      for (i = 0; i < this.originDocList.length; i++) {
        value = this.originDocList[i].dID;
        label = this.originDocList[i].dName;
        this.SpecialistOptions[i] = { value, label };
      }
    },

    open() {
      this.$confirm("确认要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$router.push({ path: "/" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    dayChange() {
      var today = new Date();
      if (this.weekChoice == "选项2") {
        var t = new Date(
          (7 - today.getDay() + this.dayChoice) * 3600 * 1000 * 24 +
            today.getTime()
        );
        console.log(t);
        var m = t.getMonth() + 1;
        this.date = t.getFullYear() + "-" + m + "-" + t.getDate();
      } else {
        var t = new Date(
          (this.dayChoice - today.getDay()) * 3600 * 1000 * 24 + today.getTime()
        );
        var m = t.getMonth() + 1;
        this.date = t.getFullYear() + "-" + m + "-" + t.getDate();
      }
    },
    weekChange() {
      var d = new Date();
      var da = new Date();

      this.wk = d.getDay();
      var i = 0;
      this.dayChoice = "";
      if (this.weekChoice == "选项2") {
        for (i = 0; i < 5; i++) this.DayOptions[i].disabled = false;
      } else if (this.weekChoice == "选项1") {
        for (i = 0; i < this.wk; i++) this.DayOptions[i].disabled = true;
        for (i = this.wk; i < 5; i++) this.DayOptions[i].disabled = false;
      }
      console.log(this.date);
    },
    makeappoitment(type, choice) {
      const self = this;
      self
        .$axios({
          method: "post",
          url: "/appoint/makeAppointment/",
          params: {
            userID: this.$store.state.userID,
            type: type,
            choice: choice,
            date: this.date,
          },
        })
        .then((res) => {
          if (res.data.status) {
            alert("预约成功");
          } else {
            alert("预约失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    queryAppointment() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: "/appoint/queryAppointment/" + this.$store.state.userID,
          params: {},
        })
        .then((res) => {
          if (res.data.status) {
            var originAppoint = res.data.body;

            if (typeof originAppoint == null) {
              console.log("this is yes");
              this.ifBooking = 0;
            } else {
              console.log("this is no");
              this.ifbooking = 1;
            }
            console.log(this.ifBooking);
            console.log(originAppoint.type);
            this.bookingContent = [
              { key: "预约会议：", value: originAppoint.rName },
              { key: "会议主题：", value: originAppoint.rTheme },
              { key: "会议地址：", value: originAppoint.rAddress },
              { key: "会议时间：", value: originAppoint.rTime },
            ];
          } else {
            alert("查询失败失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    bookCommit() {
      this.makeappoitment("dept", this.officeChoice);
    },

    cancelBook() {
      this.$confirm("确认要取消预约?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功!",
          });
          this.ifBooking = 0;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已停止操作",
          });
        });
    },

    submit() {
      const self = this;
      var formData = new window.FormData();

      formData.append(
        "file",
        document.querySelector("input[type=file]").files[0]
      ); // 'file' 这个名字要和后台获取文件的名字一样;
      formData.append("user", this.name);
      //'userfile'是formData这个对象的键名
      // self
      //   .$axios({
      //   url: '/patient/uploadwork',   //****: 你的ip地址
      //   data: formData,
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
      //     //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
      //   }
      // }).then((res) => {
      //   console.log(res.data);
      // }) // 发送请求
      self
        .$axios({
          url: "/patient/uploadwork", //****: 你的ip地址
          data: formData,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'
            //这里是为了解决跨域问题，但是博主并没有用这种方式解决。后面会给出解决方案
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped="scoped">
.patient_contain {
  width: 100vw;
  height: 92vh;
  box-sizing: border-box;
}

.patient_home {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.myBooking {
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 0%;
  left: 0%;
}

.toBook {
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 0%;
  left: 0%;
}

.myInfo {
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 0%;
  left: 0%;
}

.myInLine {
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 0%;
  left: 0%;
}

.myInfoContain {
  width: 40%;
  height: 45%;
  background-position: center;
  background-size: cover;
  position: relative;
  font-size: 27px;
  top: 30%;
  left: 30%;
}

.myInLineContain {
  width: 40%;
  height: 45%;
  background-position: center;
  background-size: cover;
  position: relative;
  font-size: 27px;
  top: 5%;
  left: 30%;
}

.showBooking {
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 0%;
  left: 0%;
}

.doBook {
  background-color: #f0f0f0;
  width: 40%;
  height: 75%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 10%;
  left: 28%;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.bookForm {
  width: 85%;
  height: 75%;
  margin-top: 1%;
  margin-left: 32%;
  flex-direction: row;
}

.noBooking {
  width: 50%;
  height: 50%;
  background-position: center;
  background-size: cover;
  position: relative;
  font-size: 35px;
  text-align: center;
  top: 35%;
  left: 22%;
}

.alreadyBooking {
  width: 50%;
  height: 50%;
  background-position: center;
  background-size: cover;
  position: relative;
  font-size: 35px;
  text-align: center;
  top: 35%;
  left: 22%;
}

.text1 {
  font-size: 22px;
  color: rgb(0, 0, 0);
  margin-left: 3em;
}

.text2 {
  font-size: 25px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.item {
  margin-bottom: 35px;
}

.title2 {
  margin-top: 7%;
  margin-left: 2.5%;
  margin-bottom: 1%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-button {
  font-size: 25px;
}

.ifSpecialistChoose {
  margin-top: 5%;
  margin-right: 0%;
}

.myBooking-box-card {
  width: 35%;
  height: 42%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bookcard {
  width: 80%;
  height: 80%;
  background-position: center;
  background-size: cover;
  position: relative;
  font-size: 20px;
  text-align: center;
  top: 35%;
  left: 10%;
}
</style>
