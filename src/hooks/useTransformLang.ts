import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { watch, onBeforeMount, type Ref } from "vue";
export function useTransformLang(ref?: Ref) {
  const route = useRoute();
  const { locale } = useI18n();

  const transformCh = () => {
    locale.value = "zh";
    localStorage.setItem("lang", "zh");
  };
  const transformnEn = () => {
    locale.value = "en";
    localStorage.setItem("lang", "en");
  };
  watch(
    () => locale.value,
    () => {}
  );
  return {
    locale,
    transformCh,
    transformnEn,
  };
}
