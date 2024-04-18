<template>
  <div class="container">
    <!--    <div class="subsection">-->
    <!--      <router-link to="/" class="subsection_item" :class="{ active: route.name === 'pc' }">-->
    <!--        {{ $t('Platform.PC') }}-->
    <!--      </router-link>-->
    <!--      <router-link-->
    <!--        to="/mobile"-->
    <!--        class="subsection_item"-->
    <!--        :class="{ active: route.fullPath?.includes('mobile') }"-->
    <!--      >-->
    <!--        {{ $t('Platform.Mobile') }}-->
    <!--      </router-link>-->
    <!--    </div>-->
    <div class="component">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getQueryVariable } from '@/utils/baseUtils'
import { useRoute, useRouter } from 'vue-router'
import { isMobile } from './components/utils'

const route = useRoute()
const router = useRouter()

if (isMobile() && route.path.indexOf('mobile') === -1) {
  // 0创作版本 1社区版本
  const type = parseInt(getQueryVariable('type'))
  if (type === 0) {
    console.log(router)
    // router.replace({ name: 'Creation' })
  } else if (type === 1) {
    // router.replace({ name: 'Community' })
  } else {
    // router.replace({ name: 'mobile' })
  }
}
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  //padding: 100px 0;
  //padding-top: 100px;
  .component {
    box-sizing: border-box;
    //padding: 40px 30px;
  }
}
.subsection {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 8px;
  background-color: #ffffff;
  width: fit-content;
  margin: auto;
  &_item {
    font-size: 18px;
    color: #333;
    min-width: 150px;
    line-height: 55px;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    background-color: transparent;
    transition: 0.3s ease-in-out;
    text-decoration: none;
    &.active {
      background-color: #ffd800;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    }
  }
}
@media (max-width: 768px) {
  .container .component {
    //padding: 40px 20px;
  }

  .container {
    box-sizing: border-box;
    //padding: 60px 0;
    //padding: 50px 0;
  }
}
</style>
