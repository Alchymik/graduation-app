<template>
  <div class="dialog" v-if="showFlag.trim() !== ''" @click="$store.commit('setShowDialogWindowType', '')">
    <div class="dialog-content" @click="$event.stopPropagation()">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-dialog",
  props: {
    showFlag: {
      type: String,
      default: '',
    },
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  padding: 10px;
  background-color: white;
  opacity: 1;
  min-width: 400px;
  min-height: 40px;
  border: 2px solid #2a52be;
  border-radius: 5px;
}
</style>