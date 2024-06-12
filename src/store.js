/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const now = new Date();
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
            name: 'coffce',
            img: 'dist/images/1.jpg'
        },
        // 会话列表
        sessions: [
            {
                id: 1,
                user: {
                    name: '示例介绍',
                    img: 'dist/images/2.png'
                },
                messages: [
                    {
                        content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                        date: now
                    }, {
                        content: '项目地址: https://github.com/coffcer/vue-chat',
                        date: now
                    }
                ]
            },
            {
                id: 2,
                user: {
                    name: 'webpack',
                    img: 'dist/images/3.jpg'
                },
                messages: []
            }
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
        INIT_DATA (state) {
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        // 发送消息
        SEND_MESSAGE ({ sessions, currentSessionId }, content) {
            let session = sessions.find(item => item.id === currentSessionId);
            session.messages.push({
                content: content,
                date: new Date(),
                self: true
            });
        },
        // 选择会话
        SELECT_SESSION (state, id) {
            state.currentSessionId = id;
        } ,
        // 搜索
        SET_FILTER_KEY (state, value) {
            state.filterKey = value;
        }
    }
});

store.watch(
    (state) => state.sessions,
    (val) => { // 剪头函数，写本地存储
        console.log('CHANGE: ', val);
        localStorage.setItem('vue-chat-session', JSON.stringify(val));
    },
    {
        deep: true
    }
);

/*
这段JavaScript代码是一个ES6模块，它导出了一个名为store的默认值和一个名为actions的对象。
actions对象包含四个函数，每个函数都是一个action creator，用于生成要发送到Redux store的actions。
这些函数接收一个包含dispatch方法的对象作为参数，这个对象通常是一个Redux的context。每个函数根据需要调用dispatch方法，并传递不同的action类型和payload。

initData函数用于触发名为INIT_DATA的action。
sendMessage函数用于触发名为SEND_MESSAGE的action，并将content作为payload传递。
selectSession函数用于触发名为SELECT_SESSION的action，并将id作为payload传递。
search函数用于触发名为SET_FILTER_KEY的action，并将value作为payload传递。
*/
export default store;
export const actions = {
    initData: ({ dispatch }) => dispatch('INIT_DATA'), // initData 是个剪头函数，传参为 dispatch, dispatch()会触发一个 action函数，类型为 INIT_DATA
    sendMessage: ({ dispatch }, content) => dispatch('SEND_MESSAGE', content),
    selectSession: ({ dispatch }, id) => dispatch('SELECT_SESSION', id),
    search: ({ dispatch }, value) => dispatch('SET_FILTER_KEY', value)
};
