var Publish = function (name) {
    this.name = name;
    this.subscribers = [];//数组中存着所有的订阅者(出版社名单)，数组的元素都是函数类型
}
//publish的实例对象去发布消息的方法
Publish.prototype.deliver = function (news) {
    var publish = this;//this就代表报社
    this.subscribers.forEach(function (item) {
        //循环subscribers数组中所有的订报人，为他们发布内容。
        item(news, publish);//每个订阅者都收到了新闻（news），还有来自哪家报刊
    })
    return this;//为了方便，采用链式调用。
}

//订阅者的方法,每一个订阅者都是一个函数,在函数原型上扩展一个方法
Function.prototype.subscribe = function (publish) {//出版社形参
    var sub = this;//取得当前订阅者这个人
    //不能同时订一家出版社同一份报纸,没意义
    //publish.subscribers//张三，李四，王五，名字可能重复
    //publish.subscribers数组里面有的人，不能再订阅
    //我们使用ecma5里面的some方法，循环遍历数组的每一个元素，执行一个函数，如果有相同的名字则返回true，不相同则返回false
    var alreadExists = publish.subscribers.some(function (item) {
        return item === sub;
    })
    //如果出版社名单没有这个人，则加入其中
    if (!alreadExists) {
        publish.subscribers.push(sub);
    }
    return this;//为了方便，采用链式调用。
}

//具体的一个订阅者去取消订阅报纸的方法
Function.prototype.unsubscribe = function (publish) {
    var sub = this;//取得当前订阅者这个人
    // filter (过滤函数:循环便利数组的每一个元素，执行一个函数如果不匹配，则删除该元素)
    publish.subscribers = publish.subscribers.filter(function (item) {
        return item !== sub;
    });
    return this;//为了方便，采用链式调用。
};

//实例化发布者对象(报社对象)
var pub1 = new Publish('报社一');
var pub2 = new Publish('报社二');
var pub3 = new Publish('报社三');

//观察者
var sub1 = function (news, pub) {
    console.log(arguments);
    document.getElementById('sub1').innerHTML += pub.name + news + '\n'
}
var sub2 = function (news, pub) {
    document.getElementById('sub2').innerHTML += pub.name + news + '\n'
}
var p1 = document.getElementById('pub1')
var p2 = document.getElementById('pub2')
var p3 = document.getElementById('pub3')
//执行订阅方法
sub1.subscribe(pub1).subscribe(pub2).subscribe(pub3)
sub2.subscribe(pub1).subscribe(pub2).subscribe(pub3)

//事件绑定
p1.onclick = function () {
    pub1.deliver(document.getElementById('text1').value, pub1);
}
p2.onclick = function () {
    pub2.deliver(document.getElementById('text2').value, pub2);
}
p3.onclick = function () {
    pub3.deliver(document.getElementById('text3').value, pub3);
}

sub1.unsubscribe(pub1); //取消订阅

