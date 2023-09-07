<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { getQueryVariable } from './utils/baseUtils'

const { locale } = useI18n()

const language = getQueryVariable('language') || localStorage.getItem('language') || 'en-US'
locale.value = language
localStorage.setItem('language', language)
</script>

<style lang="scss" scoped></style>
