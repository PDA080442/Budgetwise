<template>
  <v-dialog v-model="dialog" max-width="1260">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn text="Загрузить чек" v-bind="activatorProps" border></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="text-center">Загрузите или перетащите изображение чека</v-card-title>
        <v-card-text>
          <v-file-input v-model="files" prepend-icon="mdi-upload" accept="image/*"> </v-file-input>
        </v-card-text>
        <v-card-actions>
          <v-btn text="Загрузить" :disabled="!files" @click="onUpload()"></v-btn>
          <v-btn text="Закрыть окно" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { checkUpload } from '@/composables/check.request'

const dialog = ref(false)
const files = ref<File | null>(null)

const onUpload = async () => {
  if (!files.value) return
  try {
    await checkUpload(files.value)
  } catch (error) {
    console.error(error)
  }
  dialog.value = false
}
</script>
