
// ================= 配置区 =================
// 需要替换成您自己的LeanCloud应用ID和KEY
const APP_ID = "YOUR_APP_ID_HERE";
const APP_KEY = "YOUR_APP_KEY_HERE";

// ================= 初始化 =================
// 初始化LeanCloud
const { init, Query, Object } = AV;
init({ appId: APP_ID, appKey: APP_KEY });

// 获取页面元素
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const giftDisplay = document.getElementById('gift-display');

// 创建消息表
const Message = Object.extend('Message');

// ================= 功能函数 =================
// 发送消息
function sendMessage() {
    const text = messageInput.value.trim();
    if (text) {
        const msg = new Message();
        msg.set('text', text);
        msg.save().then(() => {
            messageInput.value = '';
        });
    }
}

// 发送礼物
function sendGift(type) {
    // 显示礼物动画
    giftDisplay.innerHTML = `
        <div class="gift-animation">
            🎉 你送出了 ${type}！
        </div>
    `;
    
    // 2秒后清除显示
    setTimeout(() => {
        giftDisplay.innerHTML = '';
    }, 2000);
    
    // 保存礼物记录到数据库（可选）
    const Gift = Object.extend('Gift');
    const gift = new Gift();
    gift.set('type', type);
    gift.save();
}

// ================= 实时功能 =================
// 接收实时消息
const messageQuery = new Query(Message);
messageQuery.subscribe().then(() => {
    messageQuery.on('create', (msg) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = msg.get('text');
        chatBox.appendChild(messageDiv);
        
        // 自动滚动到底部
        chatBox.scrollTop = chatBox.scrollHeight;
    });
});

// 初始化提示
console.log("网站已启动！请配置LeanCloud应用信息");
