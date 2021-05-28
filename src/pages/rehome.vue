<template>
  <div class="doctor_home">
    <el-menu
      :default-active="activeIndex"
      class="patientGuide"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item
        index="1"
        @change="nextPatient"
      >评审</el-menu-item>
      <el-menu-item index="2">我的账户</el-menu-item>
    </el-menu>
    <div class="doctor_contain">
      <div
        class="inquiry"
        v-if="choice == '1'"
      >
        <div class="inquiryButtons">
          <el-button
            type="success"
            round
            size="mini"
            @click="finishPatient"
            style="margin-left: 17%"
          >完成这篇论文的评阅</el-button>
          <el-button
            type="primary"
            round
            size="mini"
            @click="nextPatient"
            style="margin-left: 32%"
          >下一篇论文</el-button>
        </div>
        <div class="inquiryContain">
          <div
            class="inquiryStep"
            v-if="ifInquiring == true"
          >
            <span
              class="stepButton"
              @click="medicalRecord"
            >〇论文信息</span>
            <span
              class="stepButton"
              @click="prescribeWrite"
            >〇论文评分</span>
<!--            <span-->
<!--              class="stepButton"-->
<!--              @click="testPropare"-->
<!--            >〇安排检查</span>-->
          </div>
          <div
            class="inquiryContents"
            v-if="ifInquiring == true"
          >
            <div
              class="medicalRecordContain"
              v-if="inquireType == 'medicalRecord'"
              style="display: flex; flex-direction: row"
            >
              <div style="
                  display: flex;
                  flex-direction: column;
                  margin-top: 2%;
                  margin-left: 2%;
                ">
                <span style="
                    margin-left: 2%;
                    font-weight: bold;
                    margin-top: 0.5%;
                    font-size: 22px;
                  ">论文：</span>
                <textarea
                  style="resize: none; font-size: 20px; margin-right: 5%"
                  v-model="patientTold"
                  cols="62"
                  rows="16"
                ></textarea>
                <span style="
                    margin-left: 2%;
                    font-weight: bold;
                    margin-top: 1.5%;
                    font-size: 22px;
                  ">评审结果及建议：</span>
                <textarea
                  style="resize: none; font-size: 20px; margin-right: 5%"
                  v-model="advice"
                  cols="62"
                  rows="7"
                ></textarea>
                <el-button
                  type="success"
                  size="mini"
                  @click="commitPatientTold"
                  style="margin-top: 2%; width: 70%; margin-left: 13%"
                >提交结果</el-button>
              </div>
              <div style="
                  display: flex;
                  flex-direction: column;
                  margin-top: 2%;
                  margin-left: 2.5%;
                ">
                <div style="
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 5%;
                    margin-left: 5.7%;
                    color: blue;
                  ">
                  作者姓名：{{ pname }}
                </div>
                <div style="
                    display: flex;
                    flex-direction: row;
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 5%;
                    margin-left: 5%;
                  ">
                  <p style="
                      font-size: 20px;
                      font-weight: bold;
                      margin-top: 2%;
                      margin-left: 1%;
                      color: blue;
                    ">
                    性别：{{ pgender }}
                  </p>
                  <p style="
                      font-size: 20px;
                      font-weight: bold;
                      margin-top: 2%;
                      margin-left: 7.5%;
                      color: blue;
                    ">
                    上传日期：{{ pbirthday }}
                  </p>
                </div>
                <button @click="download">论文下载</button>
<!--                <span style="-->
<!--                    margin-left: 2%;-->
<!--                    font-weight: bold;-->
<!--                    margin-top: 10%;-->
<!--                    font-size: 22px;-->
<!--                  ">论文摘要：</span>-->
<!--                <textarea-->
<!--                  style="resize: none; font-size: 20px"-->
<!--                  v-model="patientOldDisease"-->
<!--                  readonly-->
<!--                  cols="60"-->
<!--                  rows="17"-->
<!--                ></textarea>-->
              </div>
            </div>
            <div
              class="prescribeWriteContain"
              v-if="inquireType == 'prescribeWrite'"
              style="display: flex; flex-direction: column"
            >
              <span style="
                  margin-left: 2%;
                  font-weight: bold;
                  margin-top: 1%;
                  font-size: 20px;
                ">评分：</span>
              <div style="
                  display: flex;
                  flex-direction: row;
                  font-size: 20px;
                  margin-top: 1%;
                  margin-left: 0%;
                ">
                <el-table
                  :data="
                    medicineStore.filter(
                      (data) =>
                        !medicineStoreSearch ||
                        data.name
                          .toLowerCase()
                          .includes(medicineStoreSearch.toLowerCase())
                    )
                  "
                  style="width: 100%"
                  max-height="350"
                >
                  <el-table-column
                    label="等级"
                    prop="name"
                  >
                  </el-table-column>
                  <el-table-column
                    label="识别号"
                    prop="id"
                    v-if="false"
                  >
                  </el-table-column>
                  <el-table-column align="right">
                    <template
                      slot="header"
                      slot-scope="scope"
                    >
                      <el-input
                        v-model="medicineStoreSearch"
                        size="mini"
                        placeholder="输入等级"
                      />
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        @click="addMedicine(scope.$index, scope.row)"
                      >选择等级</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
<!--              <span style="-->
<!--                  margin-left: 2%;-->
<!--                  font-weight: bold;-->
<!--                  margin-top: 1%;-->
<!--                  font-size: 20px;-->
<!--                ">处方：</span>-->
<!--              <el-table-->
<!--                :data="-->
<!--                  medicineInPrescribe.filter(-->
<!--                    (data) =>-->
<!--                      !prescribeMedicineSearch ||-->
<!--                      data.name-->
<!--                        .toLowerCase()-->
<!--                        .includes(prescribeMedicineSearch.toLowerCase())-->
<!--                  )-->
<!--                "-->
<!--                style="width: 100%"-->
<!--                max-height="250"-->
<!--              >-->
<!--                <el-table-column-->
<!--                  label="药品名"-->
<!--                  prop="name"-->
<!--                > </el-table-column>-->
<!--                <el-table-column-->
<!--                  label="数量"-->
<!--                  prop="count"-->
<!--                > </el-table-column>-->
<!--                <el-table-column-->
<!--                  label="识别号"-->
<!--                  prop="id"-->
<!--                  v-if="false"-->
<!--                >-->
<!--                </el-table-column>-->
<!--                <el-table-column align="right">-->
<!--                  <template-->
<!--                    slot="header"-->
<!--                    slot-scope="scope"-->
<!--                  >-->
<!--                    <el-input-->
<!--                      v-model="prescribeMedicineSearch"-->
<!--                      size="mini"-->
<!--                      placeholder="输入关键字搜索药品"-->
<!--                    />-->
<!--                  </template>-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                      size="mini"-->
<!--                      type="danger"-->
<!--                      @click="removeMedicine(scope.$index, scope.row)"-->
<!--                    >移出处方</el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
              <el-button
                type="success"
                size="mini"
                @click="commitPrescribe"
                style="margin-left: 5%"
              >提交结果</el-button>
            </div>
<!--            <div-->
<!--              class="testPropareContain"-->
<!--              v-if="inquireType == 'testPropare'"-->
<!--              style="display: flex; flex-direction: column"-->
<!--            >-->
<!--              <span style="-->
<!--                  margin-left: 2%;-->
<!--                  font-weight: bold;-->
<!--                  margin-top: 1%;-->
<!--                  font-size: 20px;-->
<!--                ">检查项目库：</span>-->
<!--              <div style="-->
<!--                  display: flex;-->
<!--                  flex-direction: row;-->
<!--                  font-size: 20px;-->
<!--                  margin-top: 1%;-->
<!--                  margin-left: 0%;-->
<!--                ">-->
<!--                <el-table-->
<!--                  :data="-->
<!--                    testStore.filter(-->
<!--                      (data) =>-->
<!--                        !testStoreSearch ||-->
<!--                        data.name-->
<!--                          .toLowerCase()-->
<!--                          .includes(testStoreSearch.toLowerCase())-->
<!--                    )-->
<!--                  "-->
<!--                  style="width: 100%"-->
<!--                  max-height="350"-->
<!--                >-->
<!--                  <el-table-column-->
<!--                    label="项目名"-->
<!--                    prop="name"-->
<!--                  >-->
<!--                  </el-table-column>-->
<!--                  <el-table-column-->
<!--                    label="识别号"-->
<!--                    prop="id"-->
<!--                    v-if="false"-->
<!--                  >-->
<!--                  </el-table-column>-->
<!--                  <el-table-column align="right">-->
<!--                    <template-->
<!--                      slot="header"-->
<!--                      slot-scope="scope"-->
<!--                    >-->
<!--                      <el-input-->
<!--                        v-model="testStoreSearch"-->
<!--                        size="mini"-->
<!--                        placeholder="输入关键字搜索检查项目"-->
<!--                      />-->
<!--                    </template>-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-button-->
<!--                        size="mini"-->
<!--                        @click="addTest(scope.$index, scope.row)"-->
<!--                      >加入检查需求</el-button>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!--                </el-table>-->
<!--              </div>-->
<!--              <span style="-->
<!--                  margin-left: 2%;-->
<!--                  font-weight: bold;-->
<!--                  margin-top: 1%;-->
<!--                  font-size: 20px;-->
<!--                ">检查需求单：</span>-->
<!--              <el-table-->
<!--                :data="-->
<!--                  testInPrescribe.filter(-->
<!--                    (data) =>-->
<!--                      !prescribeTestSearch ||-->
<!--                      data.name-->
<!--                        .toLowerCase()-->
<!--                        .includes(prescribeTestSearch.toLowerCase())-->
<!--                  )-->
<!--                "-->
<!--                style="width: 100%"-->
<!--                max-height="250"-->
<!--              >-->
<!--                <el-table-column-->
<!--                  label="检查项目"-->
<!--                  prop="name"-->
<!--                >-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  label="识别号"-->
<!--                  prop="id"-->
<!--                  v-if="false"-->
<!--                >-->
<!--                </el-table-column>-->
<!--                <el-table-column align="right">-->
<!--                  <template-->
<!--                    slot="header"-->
<!--                    slot-scope="scope"-->
<!--                  >-->
<!--                    <el-input-->
<!--                      v-model="prescribeTestSearch"-->
<!--                      size="mini"-->
<!--                      placeholder="输入关键字搜索检查项目"-->
<!--                    />-->
<!--                  </template>-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                      size="mini"-->
<!--                      type="danger"-->
<!--                      @click="removeTest(scope.$index, scope.row)"-->
<!--                    >移出检查需求</el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
<!--              <el-button-->
<!--                type="success"-->
<!--                size="mini"-->
<!--                @click="commitTest"-->
<!--                style="margin-left: 5%"-->
<!--              >提交检查需求</el-button>-->
            </div>
          </div>
        </div>
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
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "rehome",
  data() {
    return {
      pname: "",
      pgender: "",
      pbirthday: "",
      pID: "",
      role: this.$store.state.role,
      activeIndex: "2",
      choice: "2",
      infoContent: [
        { key: "姓名：", value: this.$store.state.name },
        { key: "性别：", value: this.$store.state.gender },
        { key: "出生日期：", value: this.$store.state.birthday },
      ],
      inquireType: "medicalRecord",
      advice: "",
      patientTold: "",
      ifInquiring: false,
      medicineStore: [
        {
          name: "A",
          id: "1",
        },
        {
          name: "B",
          id: "2",
        },
        {
          name: "C",
          id: "3",
        },
        {
          name: "D",
          id: "4",
        },
      ],
      medicineStoreSearch: "",
      medicineInPrescribe: [
        // {
        //   name: "王小虎",
        //   count: 1,
        //   id: "1",
        // },
        // {
        //   name: "张小虎",
        //   count: 1,
        //   id: "2",
        // },
        // {
        //   name: "刘小虎",
        //   count: 1,
        //   id: "3",
        // },
        // {
        //   name: "李小虎",
        //   count: 1,
        //   id: "4",
        // },
      ],
      prescribeMedicineSearch: "",

      testStore: [
        {
          name: "王小虎",
          id: "1",
        },
        {
          name: "张小虎",
          id: "2",
        },
        {
          name: "刘小虎",
          id: "3",
        },
        {
          name: "李小虎",
          id: "4",
        },
      ],
      testStoreSearch: "",
      testInPrescribe: [
        // {
        //   name: "王小虎",
        //   id: "1",
        // },
        // {
        //   name: "张小虎",
        //   id: "2",
        // },
        // {
        //   name: "刘小虎",
        //   id: "3",
        // },
        // {
        //   name: "李小虎",
        //   id: "4",
        // },
      ],
      prescribeTestSearch: "",
    };
  },
  mounted() {
    // this.nextPatient();
  },
  computed: {},
  mounted() {
    this.getAllMedicine();
  },
  mounted() {
    this.getAllTest();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
          this.$router.push({ path: "/medicallogin" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },

    //获取药品
    getAllMedicine() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: "/medicine/allMedicine",
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.medicineStore = [];
            for (var i = 0; i < data.body.length; ++i) {
              this.medicineStore.push({
                name: data.body[i].mname,
                id: data.body[i].mid,
              });
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getAllTest() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: "/medicalTest/queryAllCheck",
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.testStore = [];
            for (var i = 0; i < data.body.length; ++i) {
              this.testStore.push({
                name: data.body[i].testName,
                id: data.body[i].testID,
              });
            }
          }
        })
        .catch((err) => {});
    },
    //提交药品
    submitPrescription() {
      const self = this;
      let subData = [];
      this.medicineStore.forEach((e) => {
        subData.push({
          mID: e.id,
          preItemMedicineCnt: e.count,
        });
      });
      self
        .$axios({
          method: "post",
          url: "/pres/submitPres",
          params: {
            // docID: this.$store.state.docId,
            docID: "8d347be14509422e99c465f5352ac378",
            items: subData,
          },
        })
        .then(({ data }) => {
          console.log(data);
          console.log(this.$store.state.docId);
          if (data.status == 1) {
            this.$message({
              type: "info",
              message: "提交成功",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //提交检查
    submitCheck() {
      const self = this;
      let subData = [];
      this.testStore.forEach((e) => {
        subData.push(e.id);
      });
      self
        .$axios({
          method: "post",
          url: "/medicalTest/submitCheck",
          params: {
            // docID: this.$store.state.docId,
            docID: "8d347be14509422e99c465f5352ac378",
            items: qs.stringify(subData),
          },
        })
        .then(({ data }) => {
          console.log(data);
          console.log(this.$store.state.docId);
          if (data.status == 1) {
            this.$message({
              type: "info",
              message: "提交成功",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    medicalRecord() {
      this.inquireType = "medicalRecord";
    },

    prescribeWrite() {
      this.inquireType = "prescribeWrite";
    },

    testPropare() {
      this.inquireType = "testPropare";
    },

    emptyPrescribe() {
      this.prescribe = "";
    },

    commitPrescribe() {
      this.$confirm("确认要提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.submitPrescription();
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
    commitTest() {
      this.$confirm("确认要提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.submitCheck();
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    commitPatientTold() {
      this.$confirm("确认要提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const self = this;
          self
            .$axios({
              method: "Post",
              url: "/doc/submitRecord/",
              params: {
                docUserSay: this.patientTold,
                docAdvice: this.advice,
                pID: this.pID,
                dID: this.$store.state.userID,
              },
            })
            .then((res) => {
              console.log(res.data.body);
              if (res.data.status) {
                //存下docID
                this.$store.state.docId = res.data.body;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },

    finishPatient() {
      if (!this.ifInquiring) alert("您此时并没有论文评审。");
      else {
        this.$confirm("确认要结束评审?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "已结束该篇论文的评审!",
            });
            const self = this;
            console.log(this.$store.state.docId);
            self
              .$axios({
                method: "get",
                url: "/doc/finishRecord/" + this.$store.state.docId,
              })
              .then((res) => {
                console.log(res.data.body);
                if (res.data.status === 1) {
                  console.log(res.data.body);
                } else {
                  alert(res.data.message);
                }
              });
            console.log(this.$store.state.docId);
            this.ifInquiring = false;
            this.patientTold = "";
            this.advice = "";
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消您的选择",
            });
          });
      }
    },

    addMedicine(index, row) {
      var i = 0,
        j = 0;
      for (i = 0; i < this.medicineInPrescribe.length; i++) {
        if (this.medicineInPrescribe[i].id == row.id) {
          j = 1;
          break;
        }
      }
      if (j === 0) {
        this.medicineInPrescribe.push({
          name: row.name,
          count: 1,
          id: row.id,
        });
      } else if (j === 1) {
        this.medicineInPrescribe[i].count += 1;
      }
    },
    removeMedicine(index, row) {
      //使用row.id获取选中条目的id
      var i = 0;
      for (i = 0; i < this.medicineInPrescribe.length; i++) {
        if (this.medicineInPrescribe[i].id === row.id) {
          if (this.medicineInPrescribe[i].count > 1)
            this.medicineInPrescribe[i].count -= 1;
          else this.medicineInPrescribe.splice(i, 1);
        }
      }
    },

    nextPatient() {
      if (this.ifInquiring)
        alert("失败：您此时正在评审论文，请先结束此次评审。");
      else {
        const self = this;
        self
          .$axios({
            method: "get",
            url: "/doc/callNext/" + this.$store.state.userID,
            params: {},
          })
          .then((res) => {
            if (res.data.status) {
              console.log(res.data.body);
              alert(res.data.message);
              let user = res.data.body;
              this.pname = user.userName;
              this.pgender = user.userGender;
              this.pbirthday = user.userbirthday;
              this.pID = user.userID;
            } else {
              alert(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        alert("成功：已开始新的评审。");
        this.ifInquiring = true;
      }
    },
    addMedicine(index, row) {
      var i = 0,
        j = 0;
      for (i = 0; i < this.medicineInPrescribe.length; i++) {
        if (this.medicineInPrescribe[i].id == row.id) {
          j = 1;
          break;
        }
      }
      if (j === 0) {
        this.medicineInPrescribe.push({
          name: row.name,
          count: 1,
          id: row.id,
        });
      } else if (j === 1) {
        this.medicineInPrescribe[i].count += 1;
      }
    },
    removeMedicine(index, row) {
      //使用row.id获取选中条目的id
      var i = 0;
      for (i = 0; i < this.medicineInPrescribe.length; i++) {
        if (this.medicineInPrescribe[i].id === row.id) {
          if (this.medicineInPrescribe[i].count > 1)
            this.medicineInPrescribe[i].count -= 1;
          else this.medicineInPrescribe.splice(i, 1);

          break;
        }
      }
    },

    addTest(index, row) {
      //使用row.id获取选中条目的id
      var i = 0,
        j = 0;
      for (i = 0; i < this.testInPrescribe.length; i++) {
        if (this.testInPrescribe[i].id == row.id) {
          j = 1;
          break;
        }
      }
      if (j === 0) {
        this.testInPrescribe.push({
          name: row.name,
          id: row.id,
        });
      } else if (j === 1) {
        alert("此检查项目已在需求中。");
      }
    },
    removeTest(index, row) {
      //使用row.id获取选中条目的id
      var i = 0;
      for (i = 0; i < this.testInPrescribe.length; i++) {
        if (this.testInPrescribe[i].id === row.id) {
          this.testInPrescribe.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style scoped="scoped">
.doctor_contain {
  width: 100vw;
  height: 92.5vh;
  box-sizing: border-box;
}

.doctor_home {
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

.inquiry {
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 99.7%;
  background-position: center;
  background-size: cover;
  position: relative;
  top: 0%;
  left: 0%;
}

.inquiryContain {
  width: 98.5%;
  height: 92%;
  margin-top: 0.4%;
  margin-left: 0.7%;
  display: flex;
  flex-direction: row;
}

.inquiryStep {
  background-color: rgb(225, 243, 255);
  width: 12%;
  height: 98.5%;
  margin-top: 0.4%;
  margin-left: 0.2%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.inquiryContents {
  background-color: rgb(225, 243, 255);
  width: 86.5%;
  height: 98.5%;
  margin-top: 0.4%;
  margin-left: 0.9%;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.stepButton {
  font-size: 22px;
  margin-left: 13%;
  margin-top: 57%;
  margin-bottom: 32%;
  color: black;
  cursor: pointer;
}

.stepButtonChosen {
  font-size: 22px;
  margin-left: 13%;
  margin-top: 57%;
  margin-bottom: 32%;
  color: blue;
}

.inquiryButtons {
  background-color: rgb(225, 243, 255);
  width: 98.5%;
  height: 6%;
  margin-top: 0%;
  margin-left: 0.7%;
  flex-direction: row;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.prescribeText {
  font-size: 20px;
  margin-top: 0.2%;
  margin-left: 7.5%;
  margin-right: 7%;
  margin-bottom: 2%;
  resize: none;
}

.text1 {
  font-size: 25px;
  color: rgb(0, 0, 0);
  margin-left: 35%;
}

.text2 {
  font-size: 25px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.text2 {
  font-size: 25px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.item {
  margin-bottom: 35px;
}

.item2 {
  display: flex;
  flex-direction: row;
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
