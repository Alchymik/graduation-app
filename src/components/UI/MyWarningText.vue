<template>
<div class="message-container">
    <img class="warning-image"src="@/assets/warningSign.png"/>
    <slot></slot>
</div>
</template>

<script>
export default {
    name: "my-warning-text",
}
</script>

<style scoped>
.message-container {
    padding: 15px;
    height: 15px;
    display: flex;
    justify-content: center;
    font-size: medium;
    color: #880808;
}

.warning-image {
    height: 15px;
    margin-right: 5px;
}

</style>