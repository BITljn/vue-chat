<script>
import { actions } from './store';

import Card from 'components/card'; // 这个跟 golang 是反着的
import List from 'components/list';
import Text from 'components/text';
import Message from 'components/message';

export default {
    components: { Card, List, Text, Message },
    vuex: {
        actions: actions
    },
    created () {
        this.initData(); // 这个在 html初始化被调用
    }
}
</script>

<template>
<div id="app">
    <div class="sidebar">
        <card></card>
        <list></list>
    </div>
    <div class="main">
        <message></message>
        <text></text>
    </div>
</div>
</template>

<style lang="less" scoped>
#app {
    margin: 20px auto; /* 居中 */
    width: 800px;
    height: 600px;

    overflow: hidden; /* 溢出隐藏 */
    border-radius: 3px;

    .sidebar, .main {
        height: 100%;
    }
    .sidebar {
        float: left;
        width: 200px;
        color: #f4f4f4;
        background-color: #2e3238;
    }
    .main {
        position: relative;
        overflow: hidden;
        background-color: #eee;
    }
    .text {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
    }
    .message {
        height: ~'calc(100% - 160px)'; /* 减去输入框和消息列表的高度 */
    }
}
</style>
