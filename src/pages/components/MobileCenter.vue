<template>
  <div class="MobileCenter">
    <div class="MobileCenter_item">
      <router-link :to="{ name: 'Creation' }" class="MobileCenter_item_content">
        <div class="MobileCenter_item_content_card">
          <img src="@/assets/logo1.png" alt="" />
          <div class="name">LaserPecker Design Space</div>
          <div class="button">{{ $t('APP.Creation') }}</div>
        </div>
        <div class="MobileCenter_item_content_msg">{{ $t('APP.CreationMsg') }}</div>
      </router-link>
    </div>
    <div class="MobileCenter_item">
      <router-link :to="{ name: 'Community' }" class="MobileCenter_item_content">
        <div class="MobileCenter_item_content_card">
          <img src="@/assets/logo.png" alt="" />
          <div class="name">LaserPecker</div>
          <div class="button">{{ $t('APP.Community') }}</div>
        </div>
        <div class="MobileCenter_item_content_msg">{{ $t('APP.CommunityMsg') }}</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.MobileCenter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1000px;
  margin: auto;
  flex-wrap: wrap;
  &_item {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    text-decoration: none;
    color: #333;
    &_content {
      max-width: 100%;
      width: 288px;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      text-decoration: none;
      color: #333;
      &_card {
        background-color: #f7f9fc;
        border-radius: 16px;
        margin-bottom: 30px;
        padding-top: 50px;
        padding-bottom: 30px;
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;
        box-sizing: border-box;
        img {
          width: 96px;
          display: block;
          margin: 0 auto;
        }
        .name {
          font-size: 18px;
          font-weight: bold;
          margin-top: 25px;
          margin-bottom: 30px;
        }
        .button {
          padding: 6px 15px;
          font-size: 16px;
          color: #333;
          border-radius: 66px;
          background-color: #d9d9d9;
          display: inline-block;
          line-height: 1;
        }
      }
      &_msg {
        font-size: 14px;
        text-align: center;
        margin-top: 30px;
      }
      &:hover {
        .button {
          background: linear-gradient(93.17deg, #fce14a 0%, #fbca37 100%);
        }
        transform: scale(1.05);
      }
    }
  }
}
@media (max-width: 768px) {
  .MobileCenter_item {
    width: 100%;
  }
}
</style>
