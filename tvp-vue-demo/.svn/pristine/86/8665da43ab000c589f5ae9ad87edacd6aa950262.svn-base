<template>
    <div class="page" @click="pageClick">
        <slot>
            <div class="page page-common-default">This is default page, click go to next page</div>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'pagecommon',
    data: function() {
        return {};
    },
    methods: {
        pageClick(event) {
            this.$emit('commonclick', event);
        },
    },
};
</script>

<style lang="scss" scoped>
$page-div-color: transparent;

.page-common-default {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $page-div-color;
}
</style>
