<template>
  <div v-if="error">Error NetWork</div>
  <div v-else-if="loading" style="text-align: center">Loading...</div>
  <div v-else class="outer">
    <div class="pc">
      <div class="pc_left">
        <div class="pc_left_top_box">
          <div class="pc_logo">
            <div class="pc_logo_text MonaSans">LaserPecker Design Space</div>
          </div>
          <div class="flag CalSans">Design, Customize and Create</div>
          <div class="flag_des MonaSans">
            LaserPecker Design Space is a powerful dedicated tool for our laser engraving and
            cutting machines. Easily create projects with personalized engravings, intricate
            patterns, or precise cuts on a variety of materials.
          </div>
        </div>

        <div class="pc_buttons">
          <a class="button" :class="{ active: active === 'win' }" :href="json.winPath">
            <Window />
            <div class="text">
              <div class="title">Windows</div>
            </div>
          </a>
          <a class="button" :class="{ active: active === 'mac' }" :href="json.macIntelPath">
            <MAC />
            <div class="text">
              <div class="title">MacOS</div>
              <div class="msg">For Intel chips</div>
            </div>
          </a>
          <a class="button" :class="{ active: active === 'mac_m' }" :href="json.macPath">
            <MAC />
            <div class="text">
              <div class="title">MacOS</div>
              <div class="msg">For Apple Silicon</div>
            </div>
          </a>
        </div>
        <!-- <div class="message" v-if="json.message">{{ json.message }}</div> -->
        <div
          class="line_btn_wrap"
          style="display: flex; flex-direction: row; gap: 20px; flex-wrap: wrap"
        >
          <a
            class="line_btn"
            :href="
              locale.startsWith('zh')
                ? 'https://laserpecker.feishu.cn/wiki/Sr9nwBEPyiwSk1k8omgcR8Ainff'
                : 'https://laserpecker.feishu.cn/wiki/HqOkwBHZJiQueqkfJQScYaYHnGf'
            "
            target="_blank"
          >
            {{ $t('HistoricalEdition') }}
          </a>
          <a
            class="line_btn"
            :href="
              locale.startsWith('zh')
                ? 'https://laserpecker.feishu.cn/wiki/Sr9nwBEPyiwSk1k8omgcR8Ainff'
                : 'https://laserpecker.feishu.cn/wiki/HqOkwBHZJiQueqkfJQScYaYHnGf'
            "
            target="_blank"
          >
            {{ $t('PC.tutorial') }}
          </a>
          <a
            class="line_btn"
            :href="
              locale.startsWith('zh')
                ? 'https://laserpecker-prod.oss-cn-hongkong.aliyuncs.com/pecker/doc/PC-Bate-UserManual-CN.pdf'
                : 'https://laserpecker-prod.oss-cn-hongkong.aliyuncs.com/pecker/doc/Laserpecker-User-manual.pdf'
            "
            target="_blank"
          >
            {{ $t('PC.UpgradeGuide') }}
          </a>
          <a
            class="line_btn"
            :href="
              locale.startsWith('zh')
                ? 'https://laserpecker.feishu.cn/wiki/Mp5Iw493FipGBLkF5FhcSfainpe'
                : 'https://laserpecker.feishu.cn/wiki/KfcZw845siawpPk2kiBcSbRAnMb'
            "
            target="_blank"
          >
            {{ $t('PC.chip') }}
          </a>
        </div>
      </div>
      <div class="pc_right">
        <img src="@/assets/pcbg.png" alt="" style="width: 100%" />
      </div>
    </div>
    <div class="pc_bottom">
      <p class="pc_bottom_title CalSans">From Concept to Creation</p>
      <div class="pc_bottom_content">
        <div class="pc_bottom_content_tab">
          <div class="pc_bottom_content_tab_icon">
            <Book />
          </div>
          <div class="pc_bottom_content_tab_label MonaSans">
            Quick Start with
            an Easy Learning Curve
          </div>
        </div>
        <div class="pc_bottom_content_tab">
          <div class="pc_bottom_content_tab_icon">
            <Grid />
          </div>
          <div class="pc_bottom_content_tab_label MonaSans">
            Material Test Grid
            for Better Results
          </div>
        </div>
        <div class="pc_bottom_content_tab">
          <div class="pc_bottom_content_tab_icon">
            <Setting />
          </div>
          <div class="pc_bottom_content_tab_label MonaSans">
            Precision Control with
            Multiple Layer Parameter
            Settings
          </div>
        </div>
        <div class="pc_bottom_content_img">
          <img src="@/assets/pc_bottom_img.png" alt="From Concept to Creation" style="width: 100%;border-radius: 10px;" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import Window from '../icon/Window.vue'
import MAC from '../icon/MAC.vue'
import Book from '../icon/Book.vue'
import Grid from '../icon/Grid.vue'
import Setting from '../icon/Setting.vue'
import { isMobile, isWin } from './utils'

const { locale } = useI18n()
const active = ref<'' | 'win' | 'mac' | 'mac_m'>('')
const json = reactive({
  winPath: '',
  macPath: '',
  macIntelPath: '',
  message: ''
})
const loading = ref(true)
const error = ref(false)
const datas = reactive<any[]>([])
onBeforeMount(() => {
  if (!isMobile()) {
    const cores = navigator.hardwareConcurrency
    if (isWin()) {
      active.value = 'win'
    } else if (cores >= 8) {
      active.value = 'mac_m'
    } else {
      active.value = 'mac'
    }
  }
  const win = () => axios.get('./PCWin.json?time=' + new Date().getTime())
  const mac = () => axios.get('./PCMac.json?time=' + new Date().getTime())
  const macIntel = () => axios.get('./PCMacIntel.json?time=' + new Date().getTime())
  Promise.all([win(), mac(), macIntel()])
    .then(([win, mac, macIntel]) => {
      try {
        loading.value = false
        json.winPath = win.data[win.data.length - 1].path
        json.macPath = mac.data[mac.data.length - 1].path
        json.macIntelPath = macIntel.data[macIntel.data.length - 1].path
        json.message = win.data[win.data.length - 1].message
        datas.push([...win.data].reverse())
        datas.push([...macIntel.data].reverse())
        datas.push([...mac.data].reverse())
      } catch (e) {
        console.error(e)
        error.value = true
      }
    })
    .catch(() => {
      error.value = true
    })
})
</script>

<style lang="scss" scoped>
.outer {
  --page-width: 1306px;
  .CalSans {
    font-family: 'Cal Sans';
  }
  .MonaSans {
    font-family: Mona-Sans;
  };
}
.pc {
  max-width: var(--page-width);
  margin: auto;
  padding: 30px;
  display: flex;
  align-items: center;
  position: relative;
  &_logo {
    display: flex;
    align-items: flex-end;
    img {
      width: 54px;
    }
    &_text {
      font-size: 20px;
      //margin-left: 10px;
      font-weight: 300;
      color: #353535;
    }
  }
  &_left {
    flex: 1;
    min-width: 1px;
  }
  &_left_top_box {
    max-width: 543px;
  }
  &_right {
    max-width: 614px;
    font-size: 0;
    padding-top: 100px;
  }
  .flag {
    font-size: 50px;
    font-weight: 600;
    margin-top: 18px;
  }
  .flag_des {
    font-size: 14px;
    font-weight: 400;
    margin-top: 18px;
    color: #333333;
    line-height: 22px;
  }
  &_buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin-bottom: 21px;
    gap: 10px;
    .button {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      color: #000;
      padding: 15px 25px;
      //background: #d9d9d9;
      background: #ffffff;
      border-radius: 8px;
      transition: 0.3s ease-in-out;
      order: 1;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
      .msg {
        font-family: Mona-Sans;
        font-size: 14px;
        font-weight: normal;
        margin-top: 3px;
        color: #969696;
      }
      &.active {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5) !important;
        background: linear-gradient(93.17deg, #fce14a 0%, #fbca37 100%) !important;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
        transform: translateY(-5px) scale(1.02) !important;
        order: 0 !important;
      }
      &:hover {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.3);
        background: linear-gradient(93.17deg, #fce14a 0%, #fbca37 100%);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
        transform: translateY(-5px) scale(1.02);
      }
    }
  }
  .line_btn {
    //font-family: Mona-Sans;
    font-size: 14px;
    color: #0a84ff;
    //margin-top: 21px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  .message {
    margin-top: 20px;
    background-color: #b0b0b0;
    border-radius: 8px;
    overflow: auto;
    white-space: pre-wrap;
    word-break: break-all;
    max-height: 250px;
    width: 300px;
    box-sizing: border-box;
    font-size: 12px;
    padding: 12px;
  }
}
.pc_bottom {
  background: #fbd13d;
  width: 100%;
  margin-top: 103px;
  .pc_bottom_title {
    color: #000000;
    text-align: center;
    font-size: 50px;
    font-weight: 600;
    line-height: 60px;
    padding: 99px 20px 36px;
  }
  .pc_bottom_content {
    max-width: var(--page-width);
    margin: auto;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
    justify-content: center;
    .pc_bottom_content_tab{
      box-sizing: border-box;
      background-color: #ffffff;
      max-width: 410px;
      height: 160px;
      padding: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
      .pc_bottom_content_tab_icon {}
      .pc_bottom_content_tab_label {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        color: #000000;
      }
    }
    .pc_bottom_content_img {
      //padding: 0 30px;
    }
  }
}
@media (max-width: 1024px) {
  .pc {
    flex-direction: column-reverse;
    gap: 60px;
    .line_btn_wrap {
      gap: 10px !important;
    }
    &_right {
      //display: none;
    }
  }
}
@media (max-width: 768px) {
  .pc {
    flex-direction: column-reverse;
    gap: 60px;
    padding: 0 20px;
    .line_btn_wrap {
      gap: 10px !important;
    }
    &_right {
      //display: none;
    }
  }
  .pc_bottom_content {
    padding: 0 30px;
  }
  .pc_bottom_content_tab {
    justify-content: flex-start!important;
    max-width: 100%!important;
    width: 100%!important;
    height: 140px!important;
  }
}
</style>
