<template>
  <div class="company" id="company">首页</div>
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
