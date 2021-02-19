<template>
    <div :class="{ 'edit-wrapper': true, 'active': active }" @click="onItemClick(id)">
        <div class="edit-menus" v-if="active">
            <delete-outlined @click="deleteActive" />
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import { DeleteOutlined } from '@ant-design/icons-vue'
    import { defineComponent } from 'vue'
    export default defineComponent({
        props: {
            id: {
                type: String,
                required: true
            },
            active: {
                type: Boolean,
                default: false
            }
        },
        components: { DeleteOutlined },
        emits: ['set-active', 'delete-active'],
        setup(props, context) {
            const onItemClick = (id: string) => {
                context.emit('set-active', id)
            }
            const deleteActive = () => {
                context.emit('delete-active')
            }

            return {
                onItemClick,
                deleteActive
            }
        }
    })
</script>

<style>
    .edit-wrapper {
        position: relative;
        padding: 0px;
        cursor: pointer;
        border: 1px solid transparent;
        user-select: none;
    }
    .edit-wrapper:hover {
        border: 1px solid #ccc;
    }
    .edit-wrapper.active {
        border: 1px solid #1890ff;
        user-select: none;
        z-index: 1500;
    }
    .edit-menus {
        position: absolute;
        top: -25px;
        left: 0;
        color: white;
        background: #1890ff;
    }
</style>