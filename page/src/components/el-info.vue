<template>
 <div>
  <el-button
    plain
    @click="success">
    成功
  </el-button>
  <el-button
    plain
    @click="warning">
    警告
  </el-button>
  <el-button
    plain
    @click="info">
    消息
  </el-button>
  <el-button
    plain
    @click="error">
    错误
  </el-button>
 </div>
</template>


<script>
  export default {
    methods: {
      success(msg) {
        this.$notify({
          title: 'success',
          message: msg,
          type: 'success'
        });
      },

      warning(msg) {
        this.$notify({
          title: 'warning',
          message: msg,
          type: 'warning'
        });
      },

      info(msg) {
        this.$notify.info({
          title: 'info',
          message: msg
        });
      },

      error(msg) {
        this.$notify.error({
          title: 'error',
          message: msg
        });
      }
    }
  }
</script>
