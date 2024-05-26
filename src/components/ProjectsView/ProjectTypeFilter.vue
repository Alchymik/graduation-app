<template>
    <div class="btn-list">
        <button :class="{ 'chosen': hover1 }" @click="changeTypeFilter('Self')" @mouseenter="hover1 = true"
            @mouseleave="modelValue == 'Self' ? hover1 = true : hover1 = false">
            <span>Мои проекты</span>
            <img :src="pictureHover1">
        </button>
        <button :class="{ 'chosen': hover2 }" @click="changeTypeFilter('Shared')" @mouseenter="hover2 = true"
            @mouseleave="modelValue == 'Shared' ? hover2 = true : hover2 = false">
            <span>Проекты команд</span>
            <img :src="pictureHover2">
        </button>
        <button :class="{ 'chosen': hover3 }" @click="changeTypeFilter('Archived')" @mouseenter="hover3 = true"
            @mouseleave="modelValue == 'Archived' ? hover3 = true : hover3 = false">
            <span>Архив проектов</span>
            <img :src="pictureHover3">
        </button>
    </div>
</template>
<script>
export default {
    props: {
        modelValue: String,
    },
    data() {
        return {
            picture1default: require("@/assets/single_user_white.png"),
            picture1hover: require("@/assets/single_user_chose.png"),
            picture2default: require("@/assets/team_user_white.png"),
            picture2hover: require("@/assets/team_user_chose.png"),
            picture3default: require("@/assets/trashbin.png"),
            picture3hover: require("@/assets/trashbin_chosen.png"),
            hover1: false,
            hover2: false,
            hover3: false,
        }
    },
    methods: {
        changeTypeFilter(type) {
            this.$emit('update:modelValue', type);
            this.markChosen(type);
        },
        markChosen(type) {
            switch (type) {
                case 'Self':
                    this.hover1 = true;
                    this.hover2 = false;
                    this.hover3 = false;
                    break;
                case 'Shared':
                    this.hover1 = false;
                    this.hover2 = true;
                    this.hover3 = false;
                    break;
                case 'Archived':
                    this.hover1 = false;
                    this.hover2 = false;
                    this.hover3 = true;
                    break;
            }
        },
    },
    computed: {
        pictureHover1() {
            return (this.hover1 == true) ? this.picture1hover : this.picture1default
        },
        pictureHover2() {
            return (this.hover2 == true) ? this.picture2hover : this.picture2default
        },
        pictureHover3() {
            return (this.hover3 == true) ? this.picture3hover : this.picture3default
        }
    },
    mounted() {
        this.markChosen(this.modelValue);
    }
}
</script>
<style scoped>
img {
    height: 25px;
}

.btn-list {
    width: 230px;
    display: flex;
    flex-direction: column;
}

button {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #2a52be;
    padding: 15px;
    border: 2px solid #2a52be;
    border-radius: 5px;
    font-size: medium;
    color: white;
    transition: 0.1s;
}

button:hover,
.chosen {
    transition: 0.1s;
    background-color: white;
    color: #2a52be;
    cursor: pointer;
}
</style>