<template>
  <div class="pnote" :center="true">
    <el-container class="pnote-container">
      <el-header class="site-header">
        <i class="el-icon-edit" style="float:left">Write something secret</i>
        <i class="el-icon-edit" style="float:right">Write something secret</i>
      </el-header>

      <el-main class="site-body">
        <!-- <div style="margin: 20px 0;"></div> -->

        <div class="site-content">
          <div v-if="sentStatus == Status.EDIT">
            <el-input
              type="textarea"
              :autosize="{ minRows: 18, maxRows: 18}"
              placeholder="write your Message HERE~"
              v-model="textareaMsgFrom"
              maxlength="500"
              show-word-limit
              resize="none"
            ></el-input>
          </div>
          <div v-else-if="sentStatus == Status.SENT">
            <p>Get your secret message from URL above</p>
            <p>Copy it, remember it can be only Access ONCE!</p>
            <el-card shadow="never">
              <p style="overflow-wrap:break-word">{{host}}</p>
            </el-card>
          </div>
          <div v-else-if="sentStatus == Status.MSG">
            <el-input
              type="textarea"
              :autosize="{ minRows: 18, maxRows: 18}"
              placeholder="Message not found, maybe deleted?"
              v-model="textareaMsgTo"
              maxlength="500"
              :readonly="true"
              show-word-limit
              resize="none"
            ></el-input>
          </div>
        </div>

        <el-row>
          <div style="margin: 20px 0;"></div>
          <div v-if="sentStatus == Status.EDIT">
            <el-button type="primary" style="width:100%; height:70px" v-on:click="postData">Submit it</el-button>
          </div>
          <div v-else-if="sentStatus == Status.MSG">
            <el-button type="primary" style="width:100%; height:70px" v-on:click="goHome">Delete it</el-button>
          </div>
          <div v-else><el-button  type="primary"  style="width:100%; height:70px" v-clipboard:success="copy2board"  v-clipboard:copy="host">Copy it</el-button>
          </div>
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

    <!-- <Elinfo/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import NodeRSA from "node-rsa";
import crypto from "crypto"

// import Elinfo from "@/components/el-info.vue";
// import func from "../../../vue-temp/vue-editor-bridge";

export default {
  name: "Pnote",
  components: {
    
  },
  data() {
    return {
      textareaMsgTo: "",
      textareaMsgFrom: "",
      sentStatus: 0,
      privateKeyB64: "",
      
      Status: {
        EDIT: 0,
        SENT: 1,
        MSG: 2
      },
      firstPlayFlag: true,
      get origin() {
        return location.origin; 
      },
      get host() {
        return location.origin + "/#/" + this.privateKeyB64;
      }
    };
  },
  mounted() {
    if(this.firstPlayFlag) {
      this.showMsg();
      this.firstPlayFlag = false;
    }
    
  },
  methods: {
    showMsg: function() {
      if (location.hash.length < 5) {
        return;
      }
      this.sentStatus = this.Status.MSG;
      let that = this;
      let privateKeyB64 = location.hash.replace("#/", "");
      const key = this.aes();
      that.textareaMsgTo = "Loading Wait...";
      axios
        .get(this.origin+"/msg/de/" + privateKeyB64)
        .then(response => {
          this.info = response;
          // console.log(this.info);
          // that.sentStatus = 2;
          let cipherB64 = response.data;
          if (privateKeyB64 !== "") {
            key.importKey(privateKeyB64);
            let text = key.aesDecrypt(cipherB64);
            that.textareaMsgTo = text;
          } else {
            that.textareaMsgTo = "Message not found, maybe deleted?";
          }
        })
        .catch(function(error) {
          that.$notify.error({title: 'error', message: 'fetch MSG failed, Try again'});
          that.textareaMsgTo = "";
          // 请求失败处理
          console.log(error);
        });
    },
    goHome: function() {window.location = '/'},
    copy2board: function() {
      this.$notify.info({ title: 'info', message: 'Copied'});
    },
    postData: function() {
      const that = this;
      const aes = this.aes();
      const reqBody = aes.aesEncrypt(that.textareaMsgFrom);
      const reqPath = aes.GetKey();
      this.privateKeyB64 = reqPath;
      axios
        .post(this.origin+"/msg/en/" + reqPath, reqBody)
        .then(response => {
          console.log(response);
          that.sentStatus = that.Status.SENT;
          that.$notify({ type: 'success', title: 'success', message: 'Submit Successfully'});
        })
        .catch(function(error) {
          // 请求失败处理
          that.$notify.error({title: 'error', message: 'Submit failed'});
          console.log(error.message);
        });
    },
    aes: function() {
      let initKey = crypto.createHash('md5')
                .update(crypto.randomBytes(1024))
                .digest('hex');
      let key = '<Import passwd>';

      return {  
        aesEncrypt: function (data) {
            const cipher = crypto.createCipher('aes192', initKey);
            let crypted = cipher.update(data, 'utf8', 'hex');
            crypted += cipher.final('hex');
            return crypted;
        },
        aesDecrypt: function (encrypted) {
            const decipher = crypto.createDecipher('aes192', key);
            let decrypted = decipher.update(encrypted, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        },

        importKeyB64: function(KeyB64) {
          const Key = new Buffer(KeyB64, "base64").toString("ascii");
          key = Key;
        },
        importKey: function(Key) {
          key = Key;
        },
        GetKeyB64: function() {
          let KeyB64 = new Buffer(initKey).toString("base64");
          return KeyB64;
        },
        GetKey: function() {
          return initKey;
        },

      }
    }
    ,
    rsa: function() {
      const key = new NodeRSA({ b: 512 });
      let publicKey = key.exportKey("pkcs1-public-pem"); //公钥
      let privateKey = key.exportKey("pkcs1-private-pem"); //私钥
      return {
        RSAencrypt: function(pas) {
          console.log("encrypt user data");
          console.log(this.GetPrivateKeyB64());
          return key.encrypt(pas, "base64");
        },
        importPrivateKeyB64: function(privateKeyB64) {
          const privateKey = new Buffer(privateKeyB64, "base64").toString(
            "ascii"
          );
          key.importKey(privateKey, "pkcs1-private-pem");
        },
        //解密方法
        RSAdecrypt: function(pas) {
          return key.decrypt(pas, "utf-8");
        },
        GetPrivateKey: function() {
          return privateKey;
        },
        GetPubilcKey: function() {
          return privateKey;
        },
        GetPubilcKeyB64: function() {
          let publicKeyB64 = new Buffer(publicKey).toString("base64");
          return publicKeyB64;
        },
        GetPrivateKeyB64: function() {
          let privateKeyB64 = new Buffer(privateKey).toString("base64");
          return privateKeyB64;
        }
      };
    }
  }
};
</script>

<style scoped>
.site-content {
  height: 390px;
}
.site-footer p {
  padding: 0 10px;
}
.pnote-container {
  padding-top: 60px;
}
.el-container {
  /* width: 860px; */
  width: 85%;
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