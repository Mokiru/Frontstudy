class UIGoods {
    constructor(g) {
        this.data = g;
        this.choose = 0;
    }
    /**
     *
     * @returns 返回 该单品 选了的总价
     */
    getTotalPrice() {
        return this.data.price * this.choose;
    }
    /**
     *
     * @returns 判断当前 商品 是否被 选择 true 选择 false 不选择
     */
    isChoose() {
        return this.choose > 0;
    }
    // 增加
    increase() {
        this.choose++;
    }
    // 选择的数量 -1
    decrease() {
        this.choose === 0 ? 0 : this.choose--;
    }
}

class UIData {
    constructor() {
        var uiGoods = [];
        for (var i = 0; i < goods.length; i++) {
            uiGoods.push(new UIGoods(goods[i]));
        }
        this.uiGoods = uiGoods;
        this.deliveryThreshold = 30;
        this.deliveryPrice = 5;
    }

    /**
     * 
     * @returns 获得 所有选择 的 商品的 总价
     */
    getTotalPrice() {
        var sum = 0;
        for (var i = 0; i < this.uiGoods.length; i++) {
            var g = this.uiGoods[i];
            sum += g.getTotalPrice();
        }
        return sum;
    }

    // 增加某一件 商品 的 选择数量
    increase(index) {
        this.uiGoods[index].increase();
    }

    // 减少某一件 商品 的 选择数量
    decrease(index) {
        this.uiGoods[index].decrease();
    }

    // 得到总共的 选择 数量
    getTotalChooseNumber() {
        var sum = 0;
        for (var i = 0; i < this.uiGoods.length; i++) {
            sum += this.uiGoods[i].choose;
        }
        return sum;
    }

    // 购物车中 有没有东西
    hasGoodsInCar() {
        return this.getTotalChooseNumber() > 0;
    }

    // 是否跨过了配送标准
    isCrossdeliveryThreshold() {
        return this.getTotalPrice() > this.deliveryThreshold;
    }

    //判断某个商品是否被选中
    isChoose(index) {
        return this.uiGoods[index].isChoose();
    }
}

// 界面
class UI {
    constructor() {
        this.uiData = new UIData();
        this.doms = {
            goodsContainer: document.querySelector('.goods-list'),
            deliveryPrice: document.querySelector('.footer-car-tip'),
            footerPay: document.querySelector('.footer-pay'),
            footerPayInnerSpan: document.querySelector('.footer-pay span'),
            totalPrice: document.querySelector('.footer-car-total'),
            car: document.querySelector('.footer-car'),
            badge: document.querySelector('.footer-car-badge'),
        };
        var carRect = this.doms.car.getBoundingClientRect();
        // console.log(carRect);
        var jumpTarget = {
            x: carRect.left + carRect.width / 2,
            y: carRect.top + carRect.height / 5,
        };
        this.jumpTarget = jumpTarget;
        this.createHTML();
        this.updateFooter();
        this.listenEvent();
    }

    // 根据 商品 数据 创建商品列表元素
    createHTML() {
        // 1. 生成 HTML 字符串 修改 good-list 的 innerHTML即可，但是该操作会 进行 parseHTML，降低效率
        // 2. 创建 DOM 元素 该操作 减少了 浏览器渲染页面的 第一个步骤 parseHTML
        var html = '';
        for (var i = 0; i < this.uiData.uiGoods.length; i++) {
            var g = this.uiData.uiGoods[i];
            console.log(g);
            html += `<div class="goods-item">
            <img src="${g.data.pic}" alt="" class="goods-pic" />
            <div class="goods-info">
              <h2 class="goods-title">${g.data.title}</h2>
              <p class="goods-desc">${g.data.desc}</p>
              <p class="goods-sell">
                <span>${g.data.sellNumber}</span>
                <span>${g.data.favorRate}</span>
              </p>
              <div class="goods-confirm">
                <p class="goods-price">
                  <span class="goods-price-unit">￥</span>
                  <span>${g.data.price}</span>
                </p>
                <div class="goods-btns">
                  <i index="${i}" class="iconfont i-jianhao"></i>
                  <span>${g.choose}</span>
                  <i index="${i}" class="iconfont i-jiajianzujianjiahao"></i>
                </div>
              </div>
            </div>
          </div>`;
        }
        this.doms.goodsContainer.innerHTML = html;
    }

    increase(index) {
        this.uiData.increase(index);
        this.updateGoodsItem(index);
        this.updateFooter();
        this.jump(index);
    }

    decrease(index) {
        this.uiData.decrease(index);
        this.updateGoodsItem(index);
        this.updateFooter();
    }

    // 更新 某个 商品元素的显示状态
    updateGoodsItem(index) {
        var goodsDom = this.doms.goodsContainer.children[index];
        if (this.uiData.isChoose(index)) {
            goodsDom.classList.add('active');
        } else {
            goodsDom.classList.remove('active');
        }
        var span = goodsDom.querySelector('.goods-btns span');
        span.textContent = this.uiData.uiGoods[index].choose;
    }

    // 更新页脚
    updateFooter() {
        // 得到总价数据
        var total = this.uiData.getTotalPrice();
        // 设置配送费
        this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
        if(this.uiData.isCrossdeliveryThreshold()) {
            // 到达起送点
            this.doms.footerPay.classList.add('active');
        } else {
            this.doms.footerPay.classList.remove('active');
            // 更新 还差 多少钱
            var dis = Math.round(this.uiData.deliveryThreshold - total);
            this.doms.footerPayInnerSpan.textContent = `还差${dis}元`;
        }
        //总价元素
        this.doms.totalPrice.textContent = total.toFixed(2);
        // 设置购物车的样式状态
        if (this.uiData.hasGoodsInCar()) {
            this.doms.car.classList.add('active');
        } else {
            this.doms.car.classList.remove('active');
        }
        // 设置 购物车 中的数量
        this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
    }

    // 监听事件
    listenEvent() {
        this.doms.car.addEventListener('animationend', function(){
            this.classList.remove('animate');
        })
    }

    // 购物车动画
    carAnimate() {
        this.doms.car.classList.add('animate');
    }

    // 抛物线跳跃的元素
    jump(index) {
        // 找到对应商品的加号
        var btnAdd = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao');
        var rect = btnAdd.getBoundingClientRect();
        var start = {
            x: rect.left,
            y: rect.top,
        };
        var div = document.createElement('div');
        div.className = 'add-to-car';
        var i = document.createElement('i');
        i.className = 'iconfont i-jiajianzujianjiahao';
        //设置初始位置
        div.style.transform = `translateX(${start.x}px)`;
        i.style.transform = `translateY(${start.y}px)`;
        div.appendChild(i);
        document.body.appendChild(div);
        //强行渲染
        // requestAnimationFrame();
        div.clientWidth;

        //设置结束位置
        div.style.transform = `translateX(${this.jumpTarget.x}px)`;
        i.style.transform = `translateY(${this.jumpTarget.y}px)`;

        div.addEventListener('transitionend', () => {
            div.remove();
            this.carAnimate();
        }, {
            once: true, //事件只触发一次
        });
    }
}

var ui = new UI();

// 事件
ui.doms.goodsContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('i-jiajianzujianjiahao')) {
        ui.increase(+e.target.getAttribute('index'));
    } else if (e.target.classList.contains('i-jianhao')) {
        ui.decrease(+e.target.getAttribute('index'));
    }
});






