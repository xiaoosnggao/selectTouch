# pc-slider
 
 - 使用`jquery`实现的仿ios滚动插件
```html
    <div class="gxs-selectTouch-warp">
        <div class="gxs-selectTouch">
            <div class="gxs-selectTouch-hd">
                <button class="gxs-btn default" type="button">取消</button>
                <button class="gxs-btn primary" type="button">选择</button>
            </div>
            <div class="gxs-selectTouch-bd">
                <div class="gxs-selectTouch-border"></div>
                <div class="gxs-selectTouch-slide">
                    <div class="gxs-selectTouch-box">
                        <p><span>北京</span></p>
                    </div>
                    <div class="gxs-selectTouch-box">
                        <p><span>青岛</span></p>
                    </div>
                    <div class="gxs-selectTouch-box">
                        <p><span>烟台</span></p>
                    </div>
                    <div class="gxs-selectTouch-box">
                        <p><span>威海</span></p>
                    </div>
                    <div class="gxs-selectTouch-box">
                        <p><span>潍坊</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="gxs-selectTouch-bg"></div>
    </div>
```
```javascript
    //显示默认的选择
    $('.alert-selectTouch').touchClick(function () {
        var slider = new selectTouch({
            designateSelect: function (text, val) {
                console.log(text, val)
            }
        });
    });

    //动态生成
    $('.alert-selectTouch1').touchClick(function () {
        var slider = new selectTouch({
            append: true,
            alertBtn: this,
            designateSelect: function (text, val) {
                console.log(text, val)
            }
        });
    });
```