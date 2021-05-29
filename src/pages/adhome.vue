<template>
  <div class="finance_home">
    <el-menu
      :default-active="activeIndex"
      class="patientGuide"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- <el-submenu index="1">
        <!-- <template slot="title">论文管理</template> -->
      <!-- <el-menu-item index="1-1">查看投稿论文</el-menu-item>
        <el-menu-item index="1-2">同意论文评审</el-menu-item>
        <el-menu-item index="1-3">查看论文评审结果</el-menu-item>
        <el-menu-item index="1-4">处理回复</el-menu-item> -->
      <!-- </el-submenu> -->
      <el-menu-item
        index="1"
        @click="getpapers"
      >查看论文状态</el-menu-item>
      <el-menu-item index="2">我的账户</el-menu-item>
      <el-menu-item index="3">会议信息发布</el-menu-item>
    </el-menu>
    <div class="finance_contain">
      <div
        class="moneyIn"
        v-if="choice == '1-1'"
      >
        <div
          class="moneyBigBox"
          style="margin-top: 0%; margin-left: 0%"
        >
          <div style="
              width: 97%;
              margin-left: 1%;
              margin-bottom: 1%;
              border-radius: 20px;
              box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
              background-color: white;
              display: flex;
              flex-direction: row;
            ">
            <span style="
                font-size: 22px;
                margin-top: 0.5%;
                margin-left: 9%;
                margin-bottom: 0.5%;
                margin-right: 0.5%;
                font-weight: bold;
              ">请输入需要处理的论文ID：</span>
            <el-input
              placeholder="请输入内容"
              v-model="inMoneyListNumber"
              clearable
              style="width: 50%; margin-right: 2%"
            >
            </el-input>
            <el-button
              type="primary"
              size="mini"
              @click="laodMoneyFromServer"
              icon="el-icon-search"
            >搜索</el-button>
          </div>
          <div
            class="moneySmallBox"
            style="
              margin-top: 0%;
              margin-left: 0%;
              display: flex;
              flex-direction: row;
            "
            v-if="ifFoundInMoneyList == true"
          >
            <el-table
              :data="sellThings"
              stripe
              style="
                width: 50%;
                margin-left: 1%;
                border-radius: 20px;
                box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
              "
              max-height="698"
            >
              <el-table-column
                prop="name"
                label="论文名"
                width="275"
              >
              </el-table-column>
              <el-table-column
                prop="count"
                label="关键字"
                width="275"
              >
              </el-table-column>
              <el-table-column
                prop="singleCost"
                label="摘要"
                width="275"
              >
              </el-table-column>
            </el-table>
            <div style="
                display: flex;
                flex-direction: column;
                background-color: white;
                margin-left: 1%;
                margin-right: 1%;
                width: 45%;
                border-radius: 20px;
                box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
              ">
              <span style="
                  font-size: 35px;
                  margin-top: 19%;
                  margin-left: 35%;
                  font-weight: bold;
                ">投稿会议：{{ totalIn }}</span>
              <!--              <span-->
              <!--                style="-->
              <!--                  font-size: 20px;-->
              <!--                  margin-top: 17%;-->
              <!--                  margin-left: 19%;-->
              <!--                  margin-bottom: 2%;-->
              <!--                "-->
              <!--                >请选择收款方式：</span-->
              <!--              >-->
              <!--              <el-select-->
              <!--                v-model="payMethodsChoice"-->
              <!--                placeholder="请选择"-->
              <!--                style="width: 35%; margin-left: 31%"-->
              <!--              >-->
              <el-option
                v-for="item in payMethods"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
              </el-select>
              <el-button
                type="success"
                @click="getMoney"
                size="mini"
                style="width: 35%; margin-left: 31%; margin-top: 20%"
                round
              >确认增加</el-button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="moneyOut"
        v-if="choice == '1-2'"
      >
        <div
          class="moneyBigBox"
          style="margin-top: 0%; margin-left: 0%"
        >
          <div style="
              width: 97%;
              margin-left: 1%;
              margin-bottom: 1%;
              border-radius: 20px;
              box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
              background-color: white;
              display: flex;
              flex-direction: row;
            ">
            <span style="
                font-size: 22px;
                margin-top: 0.5%;
                margin-left: 9%;
                margin-bottom: 0.5%;
                margin-right: 0.5%;
                font-weight: bold;
              ">请输入需要处理的论文ID：</span>
            <el-input
              placeholder="请输入内容"
              v-model="outMoneyListNumber"
              clearable
              style="width: 50%; margin-right: 2%"
            >
            </el-input>
            <el-button
              type="primary"
              size="mini"
              @click="outMoneyListNumberSearch"
              icon="el-icon-search"
            >搜索</el-button>
          </div>
          <div
            class="moneySmallBox"
            style="
              margin-top: 0%;
              margin-left: 0%;
              display: flex;
              flex-direction: row;
            "
            v-if="ifFoundOutMoneyList == true"
          >
            <el-table
              ref="multipleTable"
              :data="backThings"
              tooltip-effect="dark"
              style="
                width: 100%;
                margin-left: 1%;
                border-radius: 20px;
                box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
              "
              @selection-change="handleSelectionChange"
              max-height="698"
            >
              <el-table-column
                type="selection"
                width="55"
              > </el-table-column>
              <el-table-column
                prop="name"
                label="论文名"
                width="260"
              >
              </el-table-column>
              <el-table-column
                prop="count"
                label="评审成绩"
                width="260"
              >
              </el-table-column>
              <el-table-column
                prop="singleCost"
                label="评审结果"
                width="260"
              >
              </el-table-column>
            </el-table>
            <div style="
                display: flex;
                flex-direction: column;
                background-color: white;
                margin-left: 1%;
                margin-right: 1%;
                width: 45%;
                border-radius: 20px;
                box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
              ">
              <span style="
                  font-size: 35px;
                  margin-top: 27%;
                  margin-left: 35%;
                  font-weight: bold;
                ">处理回复</span>
              <textarea
                style="resize: none; font-size: 20px; margin-right: 5%"
                v-model="advice"
                cols="62"
                rows="7"
              ></textarea>
              <el-button
                type="danger"
                @click="loseMoney"
                size="mini"
                style="width: 35%; margin-left: 31%; margin-top: 27%"
                round
              >确认删除</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="choice == '1'">
        <el-row gutter="20">
          <el-col span="24">
            <el-card
              v-for="paper in paperList"
              :key="paper"
            >
              <el-row>
                <el-col span="12">
                  论文题目：{{paper.name}}
                </el-col>
                <el-col span="12">
                  作者：{{paper.author}}
                </el-col>
              </el-row>
              <el-row>
                <el-col span="12">
                  {{paper.abstract}}
                </el-col>
              </el-row>
              <el-row>

                <el-col
                  span="12"
                  offset="6"
                >
                  <el-tag>{{paper.status}}</el-tag>
                </el-col>
              </el-row>

            </el-card>
          </el-col>
        </el-row>

      </div>

      <div
        class="myInfo"
        v-if="choice == '2'"
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
        class="list"
        v-if="choice == '3'"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="会议名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="会议地址">
            <el-input v-model="form.region"></el-input>
          </el-form-item>
          <el-form-item label="会议时间">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col
              class="line"
              :span="2"
            >-</el-col>
            <el-col :span="11">
              <el-input
                placeholder="选择时间"
                v-model="form.date2"
                style="width: 100%;"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="会议主题">
            <el-input
              type="textarea"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >发布信息</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adhome",
  data() {
    return {
      role: this.$store.state.role,
      activeIndex: "2",
      choice: "2",
      totalIn: "0",
      paperList: [
        {
          name: "学术会议管理系统",
          author: "张三",
          abstract: "dd",
          comment: "dd",
          status: "通过",
        },
        {
          name: "",
          author: "",
          abstract: "",
          comment: "",
          status: "",
        },
        {
          name: "",
          author: "",
          abstract: "",
          comment: "",
          status: "",
        },
      ],
      totalOut: "0",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      infoContent: [
        { key: "姓名：", value: this.$store.state.name },
        { key: "性别：", value: this.$store.state.gender },
        { key: "出生日期：", value: this.$store.state.birthday },
      ],
      sellThings: [
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1518 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1517 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1519 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
        {
          name: "王小虎",
          count: "上海市普陀区金沙江路 1516 弄",
          singleCost: "20",
        },
      ],

      backThings: [
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1518 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1517 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1519 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
        // {
        //   name: "王小虎",
        //   count: "上海市普陀区金沙江路 1516 弄",
        //   singleCost: "20",
        // },
      ],
      multipleSelection: [],

      payMethods: [
        {
          value: "选项1",
          label: "现金",
        },
        {
          value: "选项2",
          label: "微信",
        },
        {
          value: "选项3",
          label: "支付宝",
        },
        {
          value: "选项4",
          label: "银联",
        },
      ],
      payMethodsChoice: "现金",
      inMoneyListNumber: "",

      outMoneyListNumber: "",

      ifFoundInMoneyList: false,

      ifFoundOutMoneyList: false,
    };
  },
  computed: {},
  methods: {
    handleSelect(key, keyPath) {
      console.log(key);
      this.choice = key;
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

    getMoney() {
      this.$confirm("确认增加?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "增加成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消确认",
          });
        });
    },

    loseMoney() {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已删除!",
          });
          this.ifFoundOutMoneyList = false;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消确认",
          });
        });
    },

    inMoneyListNumberSearch() {
      //if() //没有搜索到
      //{
      //  alert("未能找到相应的消费数据。")
      //  this.ifFoundInMoneyList=true;
      //}
      //else
      //{
      //  this.ifFoundInMoneyList=false;
      //}
      const self = this;
      self
        .$axios({
          method: "get",
          url: `/doc/finishRecord/${this.inMoneyListNumber}`,
        })
        .then(({ data }) => {
          console.log(data);
          this.sellThings = [];
          this.totalIn = 0;
          data.body.forEach((e) => {
            this.sellThings.push({
              name: e.mname,
              count: 1,
              singleCost: e.mprice,
            });
            this.totalIn += e.mprice;
          });
          data.body.allMedicalTests.forEach((e) => {
            this.sellThings.push({
              name: e.testName,
              count: 1,
              singleCost: e.testPrice,
            });
            this.totalIn += e.testPrice;
          });
          this.ifFoundInMoneyList = true;
        })
        .catch((err) => {
          console.log(err);
        });

      this.ifFoundInMoneyList = true; //这句话在正式链接后端后删去
    },

    outMoneyListNumberSearch() {
      //if() //没有搜索到
      //{
      //  alert("未能找到相应的退费数据。")
      //  this.ifFoundOutMoneyList=true;
      //}
      //else
      //{
      //  this.ifFoundOutMoneyList=false;
      //}

      const self = this;
      // alert(this.outMoneyListNumber)
      self
        .$axios({
          method: "get",
          url: `/bill/getReturnInfo/${self.outMoneyListNumber}`,
        })
        .then(({ data }) => {
          console.log(data);
          // alert("data.body.medicines[0].mname")
          // alert(" "+data.body[0].mname)
          this.backThings = [];
          this.totalOut = 0;
          data.body.forEach((e) => {
            this.backThings.push({
              name: e.mname,
              count: 1,
              singleCost: e.mprice,
            });
            this.totalOut += e.mprice;
          });
          data.body.allMedicalTests.forEach((e) => {
            this.backThings.push({
              name: e.testName,
              count: 1,
              singleCost: e.testPrice,
            });
            this.totalOut += e.testPrice;
          });
          this.ifFoundOutMoneyList = true;
        })
        .catch((err) => {
          console.log(err);
        });

      this.ifFoundOutMoneyList = true; //这句话在正式链接后端后删去
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    laodMoneyFromServer() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: `/doc/finishRecord/${this.inMoneyListNumber}`,
        })
        .then(({ data }) => {
          console.log(data);
          this.sellThings = [];
          this.totalIn = 0;
          data.body.medicines.forEach((e) => {
            this.sellThings.push({
              name: e.mname,
              count: 1,
              singleCost: e.mprice,
            });
            this.totalIn += e.mprice;
          });
          data.body.allMedicalTests.forEach((e) => {
            this.sellThings.push({
              name: e.testName,
              count: 1,
              singleCost: e.testPrice,
            });
            this.totalIn += e.testPrice;
          });
          this.ifFoundInMoneyList = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchDocByDocid() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: `/bill/getReturnInfo/${this.outMoneyListNumber}`,
        })
        .then(({ data }) => {
          console.log(data);
          alert(data.body.medicines.mname);
          this.backThings = [];
          this.totalOut = 0;
          data.body.medicines.forEach((e) => {
            this.backThings.push({
              name: e.mname,
              count: 1,
              singleCost: e.mprice,
            });
            this.totalIn += e.mprice;
          });
          data.body.allMedicalTests.forEach((e) => {
            this.backThings.push({
              name: e.testName,
              count: 1,
              singleCost: e.testPrice,
            });
            this.totalIn += e.testPrice;
          });
          this.ifFoundOutMoneyList = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getpapers() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: "/appoint/addMeeting",
          params: {
            pID: this.$store.state.userID,
            address: this.form.region,
            meetingName: this.form.name,
            time: this.form.date1 + this.form.date2,
            theme: this.form.desc,
          },
        })
        .then((res) => {
          console.log(res.data.body);
          if (res.data.status === 1) {
            self.$message({
              message: "会议创建成功",
              type: "success",
            });
            self.$refs["form"].resetFields();
            self.form = "";
          }
        });
    },
    onSubmit() {
      const self = this;
      let d = new Date(this.form.date1);
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      console.log(date + " " + this.form.date2);
      self.$message({
        message: "会议创建成功",
        type: "success",
      });
      self.$refs["form"].resetFields();
      self.form = "";
      self
        .$axios({
          method: "POST",
          url: "/appoint/addMeeting",
          params: {
            pID: this.$store.state.userID,
            address: this.form.region,
            meetingName: this.form.name,
            time: date,
            theme: this.form.desc,
          },
        })
        .then((res) => {
          console.log(res.data.body);
          {
          }
        });
    },
  },
};
</script>

<style scoped="scoped">
.finance_contain {
  background-image: url("~@/style/background1.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100vw;
  height: 92vh;
  box-sizing: border-box;
}

.finance_home {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
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
.list {
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
</style>
