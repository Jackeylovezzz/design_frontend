
<template>
  <div class="fenzhen_home">
    <div class="fenzhen_contain">
      <div class="fenzhen_box">
        <span
          style="
            font-weight: bold;
            font-size: 40px;
            margin-top: 12%;
            margin-left: 18%;
          "
          >请在此扫码或输入您的分诊号码来进行分诊</span
        >
        <el-input
          placeholder="请输入分诊号码"
          v-model="input"
          clearable
          style="width: 52%; margin-top: 10%; margin-left: 23%"
        >
        </el-input>
        <el-button
          type="success"
          round
          @click="gotofz"
          size="large"
          style="width: 27%; margin-top: 12%; margin-left: 35%"
          >确认</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      input: "",
    };
  },
  mounted() {},
  computed: {},
  methods: {
    fenzhenCommit() {
      if (this.input == "") alert("请输入正确的分诊号码");
      else alert("分诊成功！");
    },
    gotofz() {
      const self = this;
      self
        .$axios({
          method: "get",
          url: `/Triage/executeTriage/${this.input}`,
        })
        .then(({ data }) => {
          if (data.status == 1) {
            this.$message({
              type: "info",
              message: "成功！",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped="scoped">
.fenzhen_contain {
  width: 100%;
  height: 100%;
  margin-left: 0%;
  margin-top: 0%;
  box-sizing: border-box;
}

.fenzhen_home {
  background-image: url("~@/style/background1.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}

.fenzhen_box {
  background-color: rgb(206, 204, 236);
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
  width: 75%;
  height: 95%;
  display: flex;
  flex-direction: column;
  margin-top: 0%;
  margin-left: 12.5%;
}
</style>
