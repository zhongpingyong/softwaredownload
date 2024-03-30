<template>
  <div v-if="error">Error NetWork</div>
  <div v-else-if="loading">Loading...</div>
  <div v-else class="mobile">
    <!-- 创作版本 -->
    <div class="card">
      <div class="card_sider">
        <img src="@/assets/logo1.png" style="width: 92px; height: 92px" alt="" />
      </div>
      <div class="card_content">
        <div class="name">{{ $t('APP.CreationName') }}</div>
        <div class="app_type">{{ AppType[1] }}</div>
        <div class="app_description">
          {{ $t('APP.CreationMsg') }}
        </div>
        <div class="steps">
          <div
            class="steps_item"
            :class="{ active: CreationCur === 0 }"
            @click="handleCreationCur(0)"
          >
            Android
          </div>
          <div
            class="steps_item"
            :class="{ active: CreationCur === 1 }"
            @click="handleCreationCur(1)"
          >
            IOS
          </div>
        </div>
        <div class="line_btns">
          <a
            class="line_btn"
            :href="'https://faq.hingin.com/docs/privacy' + (locale.startsWith('zh') ? '' : '_en')"
            target="_blank"
          >
            {{ $t('APP.Privacy') }}
          </a>
          <a
            class="line_btn"
            :href="'https://faq.hingin.com/docs/community' + (locale.startsWith('zh') ? '' : '_en')"
            target="_blank"
          >
            {{ $t('APP.CommunityRules') }}
          </a>
        </div>
        <div class="download" v-if="CreationCur === 0">
          <div class="download_wrap">
            <div class="left">
              <div class="title">Android v{{ AndroidCreationsComputed.name }}</div>
              <img :src="locale.startsWith('zh') ? zhImage : enImage" class="image" />
              <div class="msg" style="margin-top: 3px" v-if="AndroidCreationsComputed.date">
                {{ AndroidCreationsComputed.date }}
              </div>
            </div>
            <div class="download_button" @click="handleDown(AndroidCreationsComputed.path)">
              {{ $t('APP.DownLoad') }}
            </div>
          </div>
          <div class="download_message">
            <div class="title">{{ $t('APP.UpdateContent') }}</div>
            <div class="msg">
              {{
                locale.startsWith('zh')
                  ? AndroidCreationsComputed.message
                  : AndroidCreationsComputed.message_en
              }}
            </div>
          </div>
          <div
            class="download_history"
            :class="{ open: AndroidCreations.open }"
            @click="handleHistoryClick(AndroidCreations)"
          >
            <div class="title">{{ $t('HistoricalEdition') }}</div>
            <Arrow class="icon" />
          </div>
          <div class="download_history_list">
            <div v-for="(item, index) in AndroidCreations.list" :key="index">
              <div class="download_wrap">
                <div class="left">
                  <div class="title">Android v{{ item.name }}</div>
                  <div class="msg" style="margin-top: 3px" v-if="item.date">
                    {{ item.date }}
                  </div>
                </div>
                <div class="download_button" @click="handleDown(item.path)">
                  {{ $t('APP.DownLoad') }}
                </div>
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
        <div class="download" v-if="CreationCur === 1">
          <div class="download_wrap">
            <div class="left">
              <div class="title">IOS v{{ IosCreationsComputed.name }}</div>
              <img :src="locale.startsWith('zh') ? zhImage : enImage" class="image" />
              <div class="msg" style="margin-top: 3px" v-if="IosCreationsComputed.date">
                {{ IosCreationsComputed.date }}
              </div>
            </div>
            <div
              class="download_button"
              :class="{ disabled: !IosCreationsComputed.path }"
              @click="handleDown(IosCreationsComputed.path)"
            >
              {{ $t('APP.DownLoad') }}
            </div>
          </div>
          <div class="download_message">
            <div class="title">{{ $t('APP.UpdateContent') }}</div>
            <div class="msg">
              {{
                locale.startsWith('zh')
                  ? IosCreationsComputed.message
                  : IosCreationsComputed.message_en
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 社区版本 -->
    <div class="card">
      <div class="card_sider">
        <img src="@/assets/logo.png" style="width: 92px; height: 92px" alt="" />
      </div>
      <div class="card_content">
        <div class="name">{{ $t('APP.CommunityName') }}</div>
        <div class="app_type">{{ AppType[0] }}</div>
        <div class="app_description">{{ $t('APP.CommunityMsg') }}</div>
        <div class="steps">
          <div
            class="steps_item"
            :class="{ active: CommunityCur === 0 }"
            @click="handleCommunityCur(0)"
          >
            Android
          </div>
          <div
            class="steps_item"
            :class="{ active: CommunityCur === 1 }"
            @click="handleCommunityCur(1)"
          >
            IOS
          </div>
        </div>
        <div class="line_btns">
          <a
            class="line_btn"
            :href="'https://faq.hingin.com/docs/privacy' + (locale.startsWith('zh') ? '' : '_en')"
            target="_blank"
          >
            {{ $t('APP.Privacy') }}
          </a>
          <a
            class="line_btn"
            :href="'https://faq.hingin.com/docs/community' + (locale.startsWith('zh') ? '' : '_en')"
            target="_blank"
          >
            {{ $t('APP.CommunityRules') }}
          </a>
        </div>
        <div class="download" v-if="CommunityCur === 0">
          <div class="download_wrap">
            <div class="left">
              <div class="title">Android v{{ AndroidCommunitysComputed.name }}</div>
              <img :src="locale.startsWith('zh') ? zhImage : enImage" class="image" />
              <div class="msg" style="margin-top: 3px" v-if="AndroidCommunitysComputed.date">
                {{ AndroidCommunitysComputed.date }}
              </div>
            </div>
            <div class="download_button" @click="handleDown(AndroidCommunitysComputed.path)">
              {{ $t('APP.DownLoad') }}
            </div>
          </div>
          <div class="download_message">
            <div class="title">{{ $t('APP.UpdateContent') }}</div>
            <div class="msg">
              {{
                locale.startsWith('zh')
                  ? AndroidCommunitysComputed.message
                  : AndroidCommunitysComputed.message_en
              }}
            </div>
          </div>
          <div
            class="download_history"
            :class="{ open: AndroidCommunitys.open }"
            @click="handleHistoryClick(AndroidCommunitys)"
          >
            <div class="title">{{ $t('HistoricalEdition') }}</div>
            <Arrow class="icon" />
          </div>
          <div class="download_history_list">
            <div v-for="(item, index) in AndroidCommunitys.list" :key="index">
              <div class="download_wrap">
                <div class="left">
                  <div class="title">Android v{{ item.name }}</div>
                  <div class="msg" style="margin-top: 3px" v-if="item.date">
                    {{ item.date }}
                  </div>
                </div>
                <div class="download_button" @click="handleDown(item.path)">
                  {{ $t('APP.DownLoad') }}
                </div>
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
        <div class="download" v-if="CommunityCur === 1">
          <div class="download_wrap">
            <div class="left">
              <div class="title">IOS v{{ IosCommunitysComputed.name }}</div>
              <img :src="locale.startsWith('zh') ? zhImage : enImage" class="image" />
              <div class="msg" style="margin-top: 3px" v-if="IosCommunitysComputed.date">
                {{ IosCommunitysComputed.date }}
              </div>
            </div>
            <div class="download_button" @click="handleDown(IosCommunitysComputed.path)">
              {{ $t('APP.DownLoad') }}
            </div>
          </div>
          <div class="download_message">
            <div class="title">{{ $t('APP.UpdateContent') }}</div>
            <div class="msg">
              {{
                locale.startsWith('zh')
                  ? IosCommunitysComputed.message
                  : IosCommunitysComputed.message_en
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import Arrow from '../icon/Arrow.vue'
import { isFacebookApp, isIOS, isMobile, isQQ, isWeibo, isWeixin } from './utils'
import enImage from '@/assets/en.png'
import zhImage from '@/assets/zh.png'

const { t, locale } = useI18n()
const loading = ref(true)
const error = ref(false)
const AppType = computed(() => {
  return [t('APP.Community'), t('APP.Creation')]
})

const CommunityCur = ref(0)
const AndroidCommunitys = reactive({
  name: 'Android',
  open: false,
  list: [] as any[]
})
const IosCommunitys = reactive({
  name: 'ios',
  open: false,
  list: [] as any[]
})

const AndroidCommunitysComputed = computed<any>(() => {
  return AndroidCommunitys.list[AndroidCommunitys.list.length - 1]
})
const IosCommunitysComputed = computed<any>(() => {
  return IosCommunitys.list[IosCommunitys.list.length - 1]
})

const CreationCur = ref(0)
const AndroidCreations = reactive({
  name: 'Android',
  open: false,
  list: [] as any[]
})
const IosCreations = reactive({
  name: 'ios',
  open: false,
  list: [] as any[]
})

const AndroidCreationsComputed = computed<any>(() => {
  return AndroidCreations.list[AndroidCreations.list.length - 1]
})
const IosCreationsComputed = computed<any>(() => {
  return IosCreations.list[IosCreations.list.length - 1]
})

onBeforeMount(() => {
  if (isIOS()) {
    CommunityCur.value = 1
    CreationCur.value = 1
  }

  const AndroidCreation = () => axios.get('./AndroidCreation.json?time=' + new Date().getTime())
  const AndroidCommunity = () => axios.get('./AndroidCommunity.json?time=' + new Date().getTime())
  const IOSCreation = () => axios.get('./IOSCreation.json?time=' + new Date().getTime())
  const IOSCommunity = () => axios.get('./IOSCommunity.json?time=' + new Date().getTime())
  Promise.all([AndroidCreation(), AndroidCommunity(), IOSCreation(), IOSCommunity()])
    .then(([AndroidCreation, AndroidCommunity, IOSCreation, IOSCommunity]) => {
      loading.value = false
      AndroidCommunitys.list = AndroidCommunity.data
      IosCommunitys.list = IOSCommunity.data
      AndroidCreations.list = AndroidCreation.data
      IosCreations.list = IOSCreation.data
    })
    .catch(() => {
      error.value = true
    })
})

function handleDown(path: string) {
  if (!path) return
  const isMobileFlag = isMobile()
  if (!isMobileFlag) return downLoad(path)
  if (isWeixin() || isQQ() || isWeibo() || isFacebookApp()) return alert(t('APP.DownErrorMsg'))
  downLoad(path)
}

function downLoad(path: string) {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('target', '_blank')
  a.href = path
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function handleHistoryClick(obj: any) {
  obj.open = !obj.open
}

function handleCommunityCur(cur: number) {
  CommunityCur.value = cur
}

function handleCreationCur(cur: number) {
  CreationCur.value = cur
}
</script>

<style lang="scss" scoped>
.mobile {
  max-width: 1200px;
  margin: auto;
  .card {
    background: #f7f9fc;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 56px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.03);
    display: flex;
    margin-bottom: 30px;
    &_sider {
      width: 270px;
      flex: none;
      display: flex;
      justify-content: flex-end;
      box-sizing: border-box;
      padding-right: 50px;
    }
    &_content {
      flex: 1;
      min-width: 1px;
    }
  }
  .name {
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
  }
  .app_type {
    font-size: 18px;
    font-weight: bold;
    color: #929292;
    margin-top: 18px;
  }
  .app_description {
    font-size: 14px;
    color: #151515;
    margin-top: 12px;
  }
  .steps {
    display: flex;
    position: relative;
    line-height: 50px;
    font-weight: bold;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      border-radius: 66px;
      background-color: #edeff2;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    &_item {
      font-size: 14px;
      color: #929292;
      min-width: 50px;
      text-align: center;
      cursor: pointer;
      position: relative;
      margin-right: 15px;
      &.active {
        color: #000;
        &::after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background-color: #000;
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: 1;
          border-radius: 66px;
        }
      }
    }
  }
  .line_btns {
    margin-bottom: 20px;
    .line_btn {
      font-size: 14px;
      color: #4799eb;
      margin-top: 20px;
      text-decoration: none;
      display: inline-block;
      margin-right: 15px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.download {
  &_history {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
    .icon {
      transition: 0.3s ease-in-out;
    }
    &.open {
      .icon {
        transform: rotate(90deg);
      }
      & + .download_history_list {
        display: block;
      }
    }
  }
  &_wrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &_button {
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
    &.disabled {
      background-color: #ccc;
      cursor: no-drop;
    }
  }
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    line-height: 1.57;
    &:hover + .image {
      height: 200px;
    }
  }
  .image {
    width: 200px;
    height: 0;
    object-fit: contain;
    display: block;
    transition: 0.3s ease-in-out;
    &:hover {
      height: 200px !important;
    }
  }
  .msg {
    font-size: 13px;
    color: #b0b0b0;
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-line;
    margin-top: 10px;
  }
  &_history_list {
    box-sizing: border-box;
    padding: 15px;
    display: none;
    max-height: 250px;
    overflow-y: auto;
    .download_message {
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
  }
}

@media (max-width: 1220px) {
  .mobile {
    .card {
      padding: 26px;
      &_sider {
        width: 170px;
      }
    }
  }
}

@media (max-width: 768px) {
  .mobile {
    .card {
      padding: 26px;
      display: block;
      &_sider {
        width: 100%;
        padding-left: 0;
        display: block;
      }
    }
  }
}
</style>
