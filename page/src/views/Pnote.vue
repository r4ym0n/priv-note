<template>
  <div class="pnote" :center="true">
    <el-container class="pnote-container">
      <el-header class="site-header">
        <i class="el-icon-edit" style="float:left">Write something secret</i>
        <i class="el-icon-edit" style="float:right">Write something secret</i>
      </el-header>

      <el-main class="site-body">
        <!-- <div style="margin: 20px 0;"></div> -->
        <el-input
          type="textarea"
          :autosize="{ minRows: 18, maxRows: 18}"
          placeholder="write your Message HERE~"
          v-model="textarea2"
          maxlength="500"
          show-word-limit
        ></el-input>

        <el-row>
          <div style="margin: 20px 0;"></div>
          <el-button type="primary" style="width:100%; height:70px" v-on:click="postData">Submit</el-button>
        </el-row>
      </el-main>
      <el-footer class="site-footer">
        <el-row>
          <el-col :span="8">
            <div>
              <h3>安全</h3>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light"></div>
            <h3>安全</h3>
            <p>您的加密信息的秘钥并不会存储在数据库中，您拥有链接即可打开。</p>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
            <h3>开源</h3>
            <p>
              Vuash 是个开源项目，任何人都可以体验并改进这个项目。
              <br />
              <a href="https://gitlab.com/broworkers/vuash" target="_blank">查看代码 →</a>
            </p>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
// import JsEncrypt from "jsencrypt";
import NodeRSA from 'node-rsa';

// import func from "../../../vue-temp/vue-editor-bridge";

export default {
  name: "Pnote",
  components: {},
  data() {
    return {
      textarea1: "",
      textarea2: ""
    };
  },
  mounted() {},
  methods: {
    postData: function() {
      const that = this;
      let reqBody = this.rsa().RSAencrypt(that.textarea2) 
      let reqPath = this.rsa().GetPrivateKey()
      axios
        .post("http://127.0.0.1:3000/msg/"+reqPath, reqBody)
        .then(response => {
          this.info = response;
          console.log(this.info);
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    },
    rsa: function() {
      const key = new NodeRSA({ b: 512 });
      let publicKey = key.exportKey("pkcs1-public-pem");  //公钥
      let privateKey = key.exportKey("pkcs1-private-pem");//私钥
      publicKey = publicKey.replace(/\n/g,'').replace('-----BEGIN RSA PUBLIC KEY-----','').replace('-----END RSA PUBLIC KEY-----','');
      privateKey = privateKey.replace(/\n/g,'').replace('-----BEGIN RSA PRIVATE KEY-----','').replace('-----END RSA PRIVATE KEY-----','');
      return {
        RSAencrypt: function(pas) {
          //实例化jsEncrypt对象
          // let jse = new JsEncrypt();
          //设置公钥
          // jse.setPublicKey(publicKey);
          // console.log(publicKey);
          // console.log('加密：'+jse.encrypt(pas))
          // return jse.encrypt(pas);
          console.log(publicKey);
          return key.encrypt(pas,'base64')
        },
        //解密方法
        RSAdecrypt: function(pas) {
          // let jse = new JsEncrypt();
          // 私钥
          // jse.setPrivateKey(privateKey);
          // console.log('解密：'+jse.decrypt(pas))
          // return jse.decrypt(pas);
          console.log(privateKey);
          return key.decrypt(pas, 'utf-8')
        },
        GetPrivateKey: function(){
          return privateKey;
        }
      };
    }
  }
};
</script>

<style scoped>
.site-footer p {
  padding: 0 10px;
}
.pnote-container {
  padding-top: 60px;
}
.el-container {
  width: 860px;
  margin: 0 auto;
  padding: 0px;
  padding-top: 60px;
}
.site-header {
  color: white;
}
.site-footer {
  color: #cfd7eb;
}
.site-body {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}
.pnote {
  background-color: #464952;
  font-family: Helvetica Neue, Helvetica, sans-serif;
  height: 100%;
  /* padding: 40px; */
}
.el-textarea__inner {
  border: none;
}
.el-input {
  border: none;
}
</style>