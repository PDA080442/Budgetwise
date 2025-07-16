<template>
  <v-dialog v-model="dialog" max-width="1260">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="upload-btn"
        variant="elevated"
        elevation="4"
        size="large"
        v-bind="activatorProps"
      >
        <v-icon left>mdi-upload</v-icon>
        Загрузить чек
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="text-center"> Загрузите или перетащите изображение чека </v-card-title>
        <v-card-text>
          <v-file-input v-model="files" prepend-icon="mdi-upload" accept="image/*" />
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

<style scoped>
.upload-btn {
  background-color: #2196f3;
  color: #fff;
  border-radius: 24px;
  text-transform: none;
  padding: 0 20px;
  height: 48px;
  font-weight: 500;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.upload-btn .v-icon {
  margin-right: 8px;
}
.upload-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}
.upload-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>
