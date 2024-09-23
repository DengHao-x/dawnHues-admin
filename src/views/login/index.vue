<template>
  <div class="login flex flex-col justify-center items-center">
    <div class="flex">
      <img src="@/assets/images/loginBg.png" alt="" />
    </div>
    <el-switch inline-prompt v-model="isDark" @click="toggle" :active-icon="Moon" :inactive-icon="Sunny">
      切换</el-switch
    >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/userStore";
import { initRouter } from "@/router/utils";
import { useDarkMode } from "@/hooks/useDarkMode";
interface RuleForm {
  username: string;
  password: string;
}
const { isDark, toggle } = useDarkMode();

const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  username: "admin",
  password: "123456789",
});
const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const onSubmit = async (ruleFormRef: FormInstance | undefined) => {
  if (!ruleFormRef) return;
  const { username, password } = ruleForm;
  // 登陆
  useUserStore()
    .loginUser({
      username,
      password,
    })
    .then((data: any) => {
      if (data.success) {
        initRouter().then(() => {
          router.push("/home");
          ElMessage.success("登陆成功");
        });
      } else {
        ElMessage.error(data.data.message);
      }
    });
};
</script>
<style lang="sass" scoped></style>
