<template>
  <div>
    <p>shopInfo</p>
    <div class="company" id="company">
      <!-- model是验证的数据来源 -->
      <el-form :model="registData" :rules="rules" ref="registerRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name" :error="nameError">
          <!-- validate-event输入时不触发表单验证,提交时再验证,也可以设置成动态验证 -->
          <el-input v-model="registData.name" :validate-event="false" @change="changeName"></el-input>
        </el-form-item>
        <el-form-item label="区域面积" prop="area">
          <!-- 输入的类型为Number时,需要加一个数字转换的修饰符,输入框默认的类型是String类型,但是我试了一下,发现并不能做验证,所以自己写了函数方法验证 -->
          <!-- <el-input v-model.number="registData.area" autocomplete="off"></el-input> -->
          <el-input v-model="registData.area" @keyup.native="InputNumber('area')" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" prop="region">
          <el-select v-model="registData.region.country" placeholder="请选择国家">
            <el-option label="国家一" value="USA"></el-option>
            <el-option label="国家二" value="China"></el-option>
          </el-select>
          <el-select v-model="registData.region.city" placeholder="请选择城市">
            <el-option label="城市一" value="shanghai"></el-option>
            <el-option label="城市二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="registData.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                type="fixed-time"
                placeholder="选择时间"
                v-model="registData.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="即时配送" prop="delivery">
          <el-switch v-model="registData.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="registData.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="registData.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动图片" prop="fileUrl">
          <el-upload
            :action="action"
            :on-success="handleSuccess"
            :data="uploadData"
            :limit="20"
            list-type="picture-card"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="registData.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 提交的时候传入的是表单的ref -->
          <el-button type="primary" @click="submitForm('registerRef')">立即创建</el-button>
          <el-button @click="resetForm('registerRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopInfo",

  data() {
    return {
      registData: {
        name: "", // 名称
        area: "", // 面积
        region: {}, // 地区
        date1: "", // 日期
        date2: "", // 时间
        delivery: false, // 即时配送
        type: [], // 活动性质
        resource: "", // 特殊资源
        fileUrl: "", // 活动图片
        desc: "", // 活动形式
      }, // 需要验证的表单属性,必须在data中定义
      rules: {
        // 表单验证规则
        name: [
          { required: true, message: "请输入活动名称" }, // 'blur'是鼠标失去焦点的时候会触发验证
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
        ],
        area: [{ required: true, message: "请输入区域面积", trigger: "blur" }],
        region: [
          {
            type: "object",
            required: true,
            // validator: (rule, value, callback) => {
            //   console.log(55, value)
            //   if (!value.country) {
            //     callback(new Error('请选择国家'))
            //   } else if (!value.city) {
            //     callback(new Error('请选择城市'))
            //   } else {
            //     callback()
            //   }
            // },
            trigger: "change",
            fields: {
              country: { required: true, message: "请选择国家", trigger: "blur" },
              city: { required: true, message: "请选择城市", trigger: "blur" },
            },
          },
        ],
        date1: [{ type: "date", required: true, message: "请选择日期", trigger: "change" }],
        date2: [{ type: "date", required: true, message: "请选择时间", trigger: "change" }],
        type: [{ type: "array", required: true, message: "请至少选择一个活动性质", trigger: "change" }],
        resource: [{ required: true, message: "请选择活动资源", trigger: "change" }],
        fileUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      action: `https://jsonplaceholder.typicode.com/posts/`,
      uploadData: { userId: 1304, pathName: "company" },
      nameError: "",
    };
  },

  created() {},

  methods: {
    // 过滤输入的金额
    InputNumber(property) {
      this.registData[property] = this.limitInputPointNumber(this.registData[property]);
    },

    // 验证只能输入数字
    limitInputNumber(val) {
      if (val) {
        return String(val).replace(/\D/g, "");
      }
      return val;
    },

    // 限制只能输入数字(可以输入两位小数)
    limitInputPointNumber(val) {
      if (val === 0 || val === "0" || val === "") {
        return "";
      } else {
        let value = null;
        value = String(val).replace(/[^\d.]/g, ""); // 清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g, "."); // 只保留第一个. 清除多余的
        value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
        return Number(value);
      }
    },

    // 预览图片
    handlePreview(file) {},
    changeName(val) {
      if (val) {
        this.nameError = "111";
      } else {
        this.nameError = "请输入活动名称";
      }
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.registData.fileUrl = "";
      // 文件删除后也要触发验证,validateField是触发部分验证的方法,参数是prop设置的值
      this.$refs.registerRef.validateField("fileUrl");
    },

    // 图片上传
    handleSuccess(res, file, fileList) {
      // 这里可以写文件上传成功后的处理,但是一定要记得给fileUrl赋值
      this.registData.fileUrl = "fileUrl";
      // 文件上传后不会触发form表单的验证,要手动添加验证
      this.$refs.registerRef.validateField("fileUrl");
    },

    submitForm(formName) {
      console.log(this.registData);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.company {
  width: 600px;
  padding: 30px;
  text-align: left;
}
</style>
