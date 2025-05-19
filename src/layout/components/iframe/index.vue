<template>
  <div v-loading="loading" class="iframe">
    <iframe ref="iframeRef" :src="iframeInfo.meta.iframeSrc" class="iframe-iframe" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, unref, onMounted, nextTick } from "vue";

const props = defineProps<{
  iframeInfo?: {};
}>();
const iframeRef = ref<HTMLElement | null>(null);
const loading = ref(true);
console.log(props.iframeInfo.meta.iframeSrc);

const initIframe = () => {
  nextTick(() => {
    const iframe = unref(iframeRef);
    if (!iframe) return;
    const loadHandler = () => {
      loading.value = false;
    };
    if ("attachEvent" in iframe) {
      iframe.attachEvent("onload", loadHandler);
    } else {
      iframe.onload = loadHandler;
    }
  });
};

onMounted(() => {
  initIframe();
});
</script>
<style scoped lang="scss">
.iframe {
  width: 100%;
  height: 100%;
  .iframe-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}
</style>
