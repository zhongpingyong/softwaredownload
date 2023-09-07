<template>
  <div v-if="error">Error NetWork</div>
  <div v-else-if="loading">Loading...</div>
  <div v-else class="pc">
    <div class="pc_left">
      <div class="pc_logo">
        <img src="@/assets/logo1.png" alt="" />
        <div class="pc_logo_text">LaserPecker Design Space</div>
      </div>
      <div class="flag">Let Creativity Fly！</div>
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
      <div style="display: flex; flex-direction: column">
        <div class="line_btn" :class="{ open: historyOpen }" @click="handleHistory">
          {{ $t('HistoricalEdition') }}
        </div>
        <div class="history">
          <div class="history_sider">
            <div
              class="history_sider_item"
              :class="{ active: historyTab === 0 }"
              @click="handleClick(0)"
            >
              Windows
            </div>
            <div
              class="history_sider_item"
              :class="{ active: historyTab === 1 }"
              @click="handleClick(1)"
            >
              MacOS For Intel
            </div>
            <div
              class="history_sider_item"
              :class="{ active: historyTab === 2 }"
              @click="handleClick(2)"
            >
              MacOS For Apple
            </div>
          </div>
          <div class="history_content">
            <div v-for="(data, index) in datas" :key="index">
              <div v-if="historyTab === index">
                <div class="history_content_item" v-for="(item, index) in data" :key="index">
                  <div class="download_wrap">
                    <div class="left">
                      <div class="title">v{{ item.name }}</div>
                    </div>
                    <a class="download_button" :href="item.path">
                      {{ $t('APP.DownLoad') }}
                    </a>
                  </div>
                  <div class="download_message">
                    <div class="title">{{ $t('APP.UpdateContent') }}</div>
                    <div class="msg">
                      {{ locale.startsWith('zh') ? item.message : item.message_en }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import Window from '../icon/Window.vue'
import MAC from '../icon/MAC.vue'
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
const historyTab = ref(0)
const historyOpen = ref(false)
function handleClick(val: number) {
  historyTab.value = val
}
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

function handleHistory() {
  historyOpen.value = !historyOpen.value
}
</script>

<style lang="scss" scoped>
.pc {
  max-width: 1200px;
  margin: auto;
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
      font-size: 16px;
      margin-left: 10px;
      font-weight: 700;
    }
  }
  &_left {
    flex: 1;
    min-width: 1px;
  }
  &_right {
    width: 500px;
    font-size: 0;
  }
  .flag {
    font-size: 26px;
    font-weight: bold;
    margin-top: 30px;
  }
  &_buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    gap: 10px;
    .button {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: bold;
      text-decoration: none;
      color: #000;
      padding: 18px 25px;
      background: #d9d9d9;
      border-radius: 8px;
      transition: 0.3s ease-in-out;
      order: 1;
      .msg {
        font-size: 14px;
        font-weight: normal;
        margin-top: 3px;
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
    font-size: 14px;
    color: #4799eb;
    margin-top: 15px;
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

.history {
  margin-top: 15px;
  display: flex;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  display: none;
  .history_content {
    flex: 1;
    min-width: 1px;
    box-sizing: border-box;
    overflow-y: auto;
    max-height: 250px;
    padding: 15px 15px 0;
    &_item {
      margin-bottom: 15px;
      border-bottom: 1px solid #e5e5e5;
      padding-bottom: 15px;
    }
  }
  &_sider {
    width: 200px;
    flex: none;
    font-size: 14px;
    line-height: 45px;
    border-right: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: 15px;
    &_item {
      border-radius: 6px;
      box-sizing: border-box;
      padding-left: 10px;
      cursor: pointer;
      & + .history_sider_item {
        margin-top: 10px;
      }
      &.active {
        background: #f5f7fa;
      }
    }
  }
  .download_wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .download_button {
    font-size: 12px;
    border-radius: 66px;
    padding: 10px 10px;
    box-sizing: border-box;
    min-width: 80px;
    text-align: center;
    cursor: pointer;
    background-color: #fbca37;
    line-height: 1;
    text-decoration: none;
    color: #000;
    &:hover {
      opacity: 0.8;
    }
  }
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    line-height: 1.57;
  }
  .msg {
    font-size: 13px;
    color: #b0b0b0;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-line;
    margin-top: 10px;
  }
}
.line_btn.open + .history {
  display: flex;
}
@media (max-width: 1024px) {
  .pc {
    &_right {
      display: none;
    }
  }
}
@media (max-width: 768px) {
  .pc {
    &_right {
      display: none;
    }
  }
  .history_sider {
    width: 126px;
    font-size: 12px;
    padding: 4px;
  }
  .history .history_content {
    padding: 10px;
  }
  .history .title {
    font-size: 12px;
  }
  .history .download_wrap {
    margin-bottom: 10px;
  }
  .history .download_button {
    padding: 10px 5px;
    min-width: 60px;
  }
}
</style>
