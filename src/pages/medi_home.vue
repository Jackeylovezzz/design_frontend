<template>
  <div class="medical_home">
    <el-menu
      :default-active="activeIndex"
      class="patientGuide"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">药品管理</template>
        <el-menu-item index="1-1">配药</el-menu-item>
        <el-menu-item index="1-2">发药</el-menu-item>
        <el-menu-item index="1-3">退药</el-menu-item>
      </el-submenu>
      <el-menu-item index="2">我的账户</el-menu-item>
    </el-menu>
    <div class="medical_contain">
      <div class="distributeMedincine" v-if="choice=='1-1'">
        <div class="medicalBigBox" style="margin-top:0%;margin-left:0%">
          <div class="inquiryButtons">
            <el-button type="success" round size="mini" @click="finishMedicineDistribute" style="margin-left:17%">完成此单配药</el-button>
            <el-button type="primary" round size="mini" @click="nextMedicineDistribute" style="margin-left:32%">下一单配药</el-button>
          </div>
          <div class="medicalSmallBox" style="margin-top:0%;margin-left:0%;display:flex;flex-direction:row" v-if="ifMedicineDistributing==true">
            <el-table
              :data="distributeMedicineList"
              stripe
              style="width: 50%;margin-left:1%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;" max-height="698">
              <el-table-column
                prop="name"
                label="药品名"
                width="275">
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量"
                width="275">
              </el-table-column>
              <el-table-column
                prop="singleCost"
                label="单价"
                width="275">
              </el-table-column>
            </el-table>
            <div style="display:flex;flex-direction:column;background-color:white;margin-left:1%;margin-right:1%;width:45%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;">
              <span style="font-size:20px;margin-top:22%;margin-left:7%;margin-bottom:2%">本单药品属于：{{}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="sendMedicine" v-if="choice=='1-2'">
        <div class="medicalBigBox" style="margin-top:0%;margin-left:0%">
          <div class="inquiryButtons">
            <el-button type="success" round size="mini" @click="finishMedicineSend" style="margin-left:17%">完成此单发药</el-button>
            <el-button type="primary" round size="mini" @click="nextMedicineSend" style="margin-left:32%">下一单发药</el-button>
          </div>
          <div class="medicalSmallBox" style="margin-top:0%;margin-left:0%;display:flex;flex-direction:row" v-if="ifMedicineSending==true">
            <el-table
              :data="sendMedicineList"
              stripe
              style="width: 50%;margin-left:1%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;" max-height="698">
              <el-table-column
                prop="name"
                label="药品名"
                width="275">
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量"
                width="275">
              </el-table-column>
              <el-table-column
                prop="singleCost"
                label="单价"
                width="275">
              </el-table-column>
            </el-table>
            <div style="display:flex;flex-direction:column;background-color:white;margin-left:1%;margin-right:1%;width:45%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;">
              <span style="font-size:20px;margin-top:22%;margin-left:7%;margin-bottom:2%">本单药品属于：{{}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="medicineBack" v-if="choice=='1-3'">
        <div class="medicalBigBox" style="margin-top:0%;margin-left:0%">
          <div style="width: 97%;margin-left:1%;margin-bottom:1%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;background-color:white;display:flex;flex-direction:row">
            <span style="font-size:22px;margin-top:0.5%;margin-left:9%;margin-bottom:0.5%;margin-right:0.5%;font-weight:bold">请输入需要退药处理的病历号：</span>
            <el-input
              placeholder="请输入内容"
              v-model="backMedicineListNumber"
              clearable style="width:50%;margin-right:2%">
            </el-input>
            <el-button type="primary" size="mini" @click="backMedicineListNumberSearch" icon="el-icon-search">搜索</el-button>
          </div>
          <div class="medicalSmallBox" style="margin-top:0%;margin-left:0%;display:flex;flex-direction:row" v-if="ifFoundBackMedicineList==true">
            <el-table
              ref="multipleTable"
              :data="backThings"
              tooltip-effect="dark"
              style="width: 100%;margin-left:1%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;"
              @selection-change="handleSelectionChange" max-height="698">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="name"
                label="药品名"
                width="260">
              </el-table-column>
              <el-table-column
                prop="count"
                label="数量"
                width="260">
              </el-table-column>
              <el-table-column
                prop="singleCost"
                label="单价"
                width="260">
              </el-table-column>
            </el-table>
            <div style="display:flex;flex-direction:column;background-color:white;margin-left:1%;margin-right:1%;width:45%;border-radius: 20px;box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;">
              <el-button type="danger" @click="backMedicineButton" size="mini" style="width:35%;margin-left:31%;margin-top:27%" round>确认退药</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="myInfo" v-if="choice=='2'">
        <div class="myInfoContain">
          <el-card class="myInfo-box-card">
            <div slot="header" class="clearfix">
              <span class="text2 item title">我的账户信息</span>
              <el-button style="float: right; padding: 3px 0" type="text" @click="open">退出登录</el-button>
            </div>
            <div v-for="item in infoContent" :key="item" class="text1 item">
              {{item.key + '  ' +item.value}}
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      role:this.$store.state.role,
      activeIndex:"2",
      choice:"2",
      infoContent:[{key:'姓名：',value:this.$store.state.name},{key:'性别：',value:this.$store.state.gender},{key:'出生日期：',value:this.$store.state.birthday}],
      distributeMedicineList: [{
          name: '王小虎',
          count: '上海市普陀区金沙江路 1518 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1517 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1519 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'

        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }],

        sendMedicineList: [{
          name: '王小虎',
          count: '上海市普陀区金沙江路 1518 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1517 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1519 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'

        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }],

        backThings: [{
          name: '王小虎',
          count: '上海市普陀区金沙江路 1518 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1517 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1519 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }, {
          name: '王小虎',
          count: '上海市普陀区金沙江路 1516 弄',
          singleCost: '20'
        }],
        multipleSelection: [],

        ifMedicineDistributing:false,
        ifMedicineSending:false,
        ifFoundBackMedicineList:false
    }
  },
  computed: {

  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.choice=key
      },
      open() {
        this.$confirm('确认要退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          this.$router.push({path:'/'})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });
        });
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      finishMedicineDistribute(){
        if(!this.ifMedicineDistributing)
          alert("您此时并没有正在进行的配药。");
        else{
          this.$confirm('确认要结束配药?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已结束此单配药!'
          });
          this.ifMedicineDistributing=false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消您的选择'
          });
        });
        }
      },

      nextMedicineDistribute(){
        if(this.ifMedicineDistributing)
          alert("失败：您此时正在进行一单配药，请先结束此次配药。");
        else{
          alert("成功：已开始新的配药。")
          this.ifMedicineDistributing=true;
        }
      },

      finishMedicineSend(){
        if(!this.ifMedicineSending)
          alert("您此时并没有正在进行的发药。");
        else{
          this.$confirm('确认要结束发药?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已结束此单发药!'
          });
          this.ifMedicineSending=false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消您的选择'
          });
        });
        }
      },

      nextMedicineSend(){
        if(this.ifMedicineSending)
          alert("失败：您此时正在进行一单发药，请先结束此次发药。");
        else{
          alert("成功：已开始新的发药。")
          this.ifMedicineSending=true;
        }
      },

      backMedicineListNumberSearch(){
        //if() //没有搜索到
        //{
        //  alert("未能找到相应的退药数据。")
        //  this.ifFoundBackMedicineList=true;
        //}
        //else
        //{
        //  this.ifFoundBackMedicineList=false;
        //}

        this.ifFoundBackMedicineList=true;//这句话在正式链接后端后删去

      },

      backMedicineButton(){
        this.$confirm('确认已退药?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已退药!'
          });
          this.ifFoundBackMedicineList=false;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消确认'
          });
        });
      },

  },
};
</script>

<style scoped="scoped">
.medical_contain {
  background-image: url("~@/style/background1.jpg");
  background-position: center;
  background-size: cover;
  position:relative;
  width: 100vw;
  height: 92vh;
  box-sizing: border-box;
}

.medical_home {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.myInfo{
  background-image: url("~@/style/background1.jpg");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position:relative;
  top: 0%;
  left:0%;
}

.myInfoContain{
  width: 40%;
  height: 45%;
  background-position: center;
  background-size: cover;
  position:relative;
  font-size: 27px;
  top: 30%;
  left:30%;
}

.inquiryButtons{
  background-color: rgb(225, 243, 255);
  width: 98.5%;
  height: 6%;
  margin-top: 0%;
  margin-left: 0.7%;
  flex-direction:row;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}

.text1 {
    font-size: 22px;
    color: rgb(0, 0, 0);
    margin-left:3.0em;
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
    clear: both
  }

  .el-button{
    font-size: 25px;
  }

</style>
