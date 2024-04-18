<template>
  <div class="new_mobile">
    <div class="new_mobile-title">Download LaserPecker App</div>
    <div class="new_mobile-content">
      <div class="new_mobile-content_item">
        <div class="new_mobile-content_item_title">Pro Version</div>
        <div class="new_mobile-content_item_content">
          <div class="new_mobile-content_item_top">
            <div class="new_mobile-content_item_top_img_outer">
              <img
                class="new_mobile-content_item_top_logo"
                src="@/assets/logo/Logo.png"
                alt="logo"
              />
            </div>
            <div class="new_mobile-content_item_top_right_outer">
              <div class="new_mobile-content_item_top_right_outer_title">
                LaserPecker Design Space
              </div>
              <div class="new_mobile-content_item_top_right_outer_des">Compatibility: LP4, LX1</div>
              <div class="new_mobile-content_item_top_right_outer_buttons">
                <div class="new_mobile-content_item_top_right_outer_button">
                  <Apple />
                  App Store
                </div>
                <div class="new_mobile-content_item_top_right_outer_button">
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
              <span>IOS v5.4.3</span>
            </div>
            <div class="new_mobile-content_item_bottom_li">
              1. Added speed conversion prompt bubble.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              2. Added firmware upgrade, timeout detection pop-up window.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              3. Default dithering algorithm for externally imported image elements.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              4. Sculpting layer displays all elements by default.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              5. Updated ‘App update pop-up window style.
            </div>
          </div>
        </div>
      </div>
      <div class="new_mobile-content_item">
        <div class="new_mobile-content_item_title">Community Version</div>
        <div class="new_mobile-content_item_content">
          <div class="new_mobile-content_item_top">
            <div class="new_mobile-content_item_top_img_outer">
              <img
                class="new_mobile-content_item_top_logo"
                src="@/assets/logo/Logo1.png"
                alt="logo"
              />
            </div>
            <div class="new_mobile-content_item_top_right_outer">
              <div class="new_mobile-content_item_top_right_outer_title">LaserPecker</div>
              <div class="new_mobile-content_item_top_right_outer_des">
                Compatibility: LP3, LP2, LP1 series
              </div>
              <div class="new_mobile-content_item_top_right_outer_buttons">
                <div class="new_mobile-content_item_top_right_outer_button">
                  <Apple />
                  App Store
                </div>
                <div class="new_mobile-content_item_top_right_outer_button">
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
              <span>IOS v5.4.3</span>
            </div>
            <div class="new_mobile-content_item_bottom_li">
              1. Added speed conversion prompt bubble.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              2. Added firmware upgrade, timeout detection pop-up window.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              3. Default dithering algorithm for externally imported image elements.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              4. Sculpting layer displays all elements by default.
            </div>
            <div class="new_mobile-content_item_bottom_li">
              5. Updated ‘App update pop-up window style.
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
</script>

<style lang="scss" scoped>
.new_mobile {
  --page-width: 1306px;
  max-width: var(--page-width);
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 83px 20px 0;
  .new_mobile-title {
    font-family: Cal Sans, serif;
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
        font-family: Mona-Sans, serif;
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
              font-family: Cal Sans, serif;
              font-size: 26px;
              font-weight: 600;
              color: #000000;
            }
            .new_mobile-content_item_top_right_outer_des {
              font-family: Mona-Sans, serif;
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
                font-family: Cal Sans, serif;
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
          font-family: Mona-Sans, serif;
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
}
</style>
