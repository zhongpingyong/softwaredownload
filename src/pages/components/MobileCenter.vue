<template>
  <div class="new_mobile">
    <div class="new_mobile-title">{{ $t('APP.title') }}</div>
    <div class="new_mobile-content">
      <div class="new_mobile-content_item">
        <div class="new_mobile-content_item_title">{{ $t('APP.proTitle') }}</div>
        <div class="new_mobile-content_item_content">
          <div class="new_mobile-content_item_top">
            <div class="new_mobile-content_item_top_img_outer">
              <img class="new_mobile-content_item_top_logo" :src="img_url_pro" alt="logo" />
            </div>
            <div class="new_mobile-content_item_top_right_outer">
              <div class="new_mobile-content_item_top_right_outer_title">
                {{ $t('APP.proAppTitle') }}
              </div>
              <div class="new_mobile-content_item_top_right_outer_des">
                {{ $t('APP.proAppDes') }}
              </div>
              <div class="new_mobile-content_item_top_right_outer_buttons">
                <div
                  class="new_mobile-content_item_top_right_outer_button"
                  @click="handleOpen('ios', 'pro')"
                  @mouseenter="handleMouseenter('ios', 'pro')"
                  @mouseout="handleMouseout('ios', 'pro')"
                >
                  <Apple />
                  App Store
                </div>
                <div
                  class="new_mobile-content_item_top_right_outer_button"
                  @click="handleOpen('android', 'pro')"
                  @mouseenter="handleMouseenter('android', 'pro')"
                  @mouseout="handleMouseout('android', 'pro')"
                >
                  <Android />
                  Android
                </div>
              </div>
            </div>
          </div>
          <hr style="transform: scaleY(0.5); margin: 30px 0" />
          <div class="new_mobile-content_item_bottom">
            <div class="new_mobile-content_item_bottom_title">
              Latest Upgrade：
              <span>{{ latestUpgrade_pro }}</span>
            </div>
            <div
              class="new_mobile-content_item_bottom_li"
              v-for="(item, index) of updateList_pro"
              :key="item"
            >
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div class="new_mobile-content_item">
        <div class="new_mobile-content_item_title">{{ $t('APP.communityTitle') }}</div>
        <div class="new_mobile-content_item_content">
          <div class="new_mobile-content_item_top">
            <div class="new_mobile-content_item_top_img_outer">
              <img class="new_mobile-content_item_top_logo" :src="img_url_community" alt="logo" />
            </div>
            <div class="new_mobile-content_item_top_right_outer">
              <div class="new_mobile-content_item_top_right_outer_title">
                {{ $t('APP.communityAppTitle') }}
              </div>
              <div class="new_mobile-content_item_top_right_outer_des">
                {{ $t('APP.communityAppDes') }}
              </div>
              <div class="new_mobile-content_item_top_right_outer_buttons">
                <div
                  class="new_mobile-content_item_top_right_outer_button"
                  @click="handleOpen('ios', 'community')"
                  @mouseenter="handleMouseenter('ios', 'community')"
                  @mouseout="handleMouseout('ios', 'community')"
                >
                  <Apple />
                  App Store
                </div>
                <div
                  class="new_mobile-content_item_top_right_outer_button"
                  @click="handleOpen('android', 'community')"
                  @mouseenter="handleMouseenter('android', 'community')"
                  @mouseout="handleMouseout('android', 'community')"
                >
                  <Android />
                  Android
                </div>
              </div>
            </div>
          </div>
          <hr style="transform: scaleY(0.5); margin: 30px 0" />
          <div class="new_mobile-content_item_bottom">
            <div class="new_mobile-content_item_bottom_title">
              Latest Upgrade：
              <span>{{ latestUpgrade_community }}</span>
            </div>
            <div
              class="new_mobile-content_item_bottom_li"
              v-for="(item, index) of updateList_community"
              :key="item"
            >
              {{ index + 1 }}. {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Android from '@/pages/icon/Android.vue'
import Apple from '@/pages/icon/Apple.vue'

import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
const img_url_pro = ref('/logo/Logo.png')
const img_url_community = ref('/logo/Logo1.png')
const latestUpgrade_pro = ref('')
const latestUpgrade_community = ref('')
const updateList_pro = ref([])
const updateList_community = ref([])

const downLoad = (path: string) => {
  const a = document.createElement('a')
  a.style.display = 'none'
  a.setAttribute('target', '_blank')
  a.href = path
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
const handleOpen = (type: string, version: string) => {
  const { appLink } = tm(`APP.${type}.${version}`) as any
  downLoad(appLink)
}
const handleMouseenter = (type: string, version: string, init?: boolean) => {
  const { qrLink, latestUpgrade, updateList } = tm(`APP.${type}.${version}`) as any
  if (version === 'pro') {
    init ? void 0 : (img_url_pro.value = qrLink)
    latestUpgrade_pro.value = latestUpgrade
    updateList_pro.value = updateList
  }
  if (version === 'community') {
    init ? void 0 : (img_url_community.value = qrLink)
    latestUpgrade_community.value = latestUpgrade
    updateList_community.value = updateList
  }
}
const handleMouseout = (type: string, version: string) => {
  if (version === 'pro') {
    img_url_pro.value = '/logo/Logo.png'
  }
  if (version === 'community') {
    img_url_community.value = '/logo/Logo1.png'
  }
}
onMounted(() => {
  handleMouseenter('ios', 'pro', true)
  handleMouseenter('ios', 'community', true)
})
</script>
<style>
body {
  background: #f4f4f4;
}
</style>
<style lang="scss" scoped>
.new_mobile {
  --page-width: 1306px;
  max-width: var(--page-width);
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 83px 20px 0;
  .new_mobile-title {
    font-family: Cal Sans;
    font-size: 36px;
    font-weight: 600;
    line-height: 35.1px;
  }
  .new_mobile-content {
    display: flex;
    gap: 16px;
    margin-bottom: 60px;
    .new_mobile-content_item {
      max-width: 645px;
      width: 100%;
      margin-top: 27px;
      .new_mobile-content_item_title {
        font-family: Mona-Sans;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
        background: #ffd605;
        border-radius: 10px 10px 0 0;
        padding: 20px 0;
      }
      .new_mobile-content_item_content {
        padding: 40px 52.5px;
        background: #ffffff;
        border-radius: 0 0 10px 10px;
        .new_mobile-content_item_top {
          display: flex;
          gap: 30px;
          .new_mobile-content_item_top_img_outer {
            width: 160px;
            min-width: 160px;
            .new_mobile-content_item_top_logo {
              width: 100%;
            }
          }
          .new_mobile-content_item_top_right_outer {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .new_mobile-content_item_top_right_outer_title {
              font-family: Cal Sans;
              font-size: 26px;
              font-weight: 600;
              color: #000000;
            }
            .new_mobile-content_item_top_right_outer_des {
              font-family: Mona-Sans;
              font-size: 20px;
              font-weight: normal;
              color: #5c5c5c;
            }
            .new_mobile-content_item_top_right_outer_buttons {
              display: flex;
              gap: 10px;
              .new_mobile-content_item_top_right_outer_button {
                width: 170px;
                height: 45px;
                background: linear-gradient(0deg, #1f1f1f, #1f1f1f), #ffffff;
                border-radius: 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                font-family: Cal Sans;
                font-size: 18px;
                font-weight: 600;
                color: #ffffff;
                cursor: pointer;
                &:hover {
                  background: linear-gradient(0deg, #ffd605, #ffd605),
                    linear-gradient(0deg, #1f1f1f, #1f1f1f), #ffffff;
                  color: #1f1f1f;
                }
                &:hover ::v-deep(svg path) {
                  fill: #1f1f1f;
                }
              }
            }
          }
        }
        .new_mobile-content_item_bottom {
          font-family: Mona-Sans;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #686868;
          .new_mobile-content_item_bottom_title span {
            font-weight: 700;
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .new_mobile-content_item_top {
    flex-direction: column;
  }
  .new_mobile-content_item_top_right_outer {
    gap: 16px;
  }
  .new_mobile-content_item_top_right_outer_buttons {
    flex-direction: column;
    gap: 20px;
    .new_mobile-content_item_top_right_outer_button {
      width: auto !important;
    }
  }
  .new_mobile-content_item {
    max-width: 350px !important;
    min-width: 350px !important;
  }
  .new_mobile-content {
    overflow-x: scroll;
    scroll-behavior: smooth;
  }
  .new_mobile-content_item_content {
    padding: 40px;
  }
}
</style>
