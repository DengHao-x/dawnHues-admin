<template>
  <div class="w-full h-full flex items-center">
    <!-- <div class="header flex justify-between items-center p-4">
      <div></div>
      <el-switch inline-prompt v-model="isDark" @click="toggle" :active-icon="Moon" :inactive-icon="Sunny">
        切换</el-switch
      >
    </div> -->
    <div class="bg-primary w-[50%] h-full bg-[#f0f5ff]">
      <img src="@/assets/images/loginBg.png" alt="" />
    </div>
    <div class="w-[50%] p-[20px]">
      <h2 class="mb-[40px]">欢迎来到DawnHues Admin！</h2>
      <div class="w-[50%]">
        <el-form ref="ruleFormRef" label-position="top" :model="ruleForm" :rules="rules" label-width="auto" status-icon>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button class="w-full" type="primary" @click="onSubmit(ruleFormRef)">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
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
