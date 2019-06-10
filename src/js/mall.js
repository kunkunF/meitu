require(['./config'], () => {
  require(['url', 'template', 'header', 'footer', 'fly'], (url, template) => {
    class Detail {
      constructor() {
        this.init()
        this.addCart()
      }

      init() {
        // 根据location的query 的id值去请求接口，拿到详情数据，渲染页面
        // 模拟ajax成功拿到数据
        // 由于咱们是rap2模拟的数据，他不能处理请求时携带的参数，所以接口返回的id是随机的不能用的，
        // 所以我们需要手动处理一下这个id，把他赋值为location的id
        // 真实接口不需要这一步（因为真实接口返回的id就是location的id）
        this.detail = {
          id: Number(location.search.slice(4)),
          title: '商品数据标题',
          price: 200
        }
        console.log(this.detail)
      }

      addCart() {
        $("#add-cart").on('click', () => {
          // 先获取当前数据要加入购物车的数量
          this.detail = {
            ...this.detail,
            num: Number($("#num-input").val())
          }
          // 把数据存localStorage
          // 先取出来，判断是否为空
          let cartList = localStorage.getItem('cart')
          if (cartList) {
            // 购物车已经存在数据了
            cartList = JSON.parse(cartList)

            // 判断cartList有没有当前数据
            // i就是cartList用来存已经存在的这条商品的下标
            let i = -1;
            let isExist = cartList.some((cart, index) => {
              // 每遍历一次i的值都重新赋值为当前下标，直到找到了这条商品，some结束，这个时候i的值就是当前商品这个下标
              i = index
              return cart.id === this.detail.id
            })
            if (isExist) {
              // 这条商品已经加过购物车了
              // 数量累加
              cartList[i].num += this.detail.num
            } else {
              // 这条商品还没有加过购物车
              cartList.push(this.detail)
            }
            // 逻辑处理完成以后把cartList重新存localStorage里，覆盖之前的
            localStorage.setItem('cart', JSON.stringify(cartList))

          } else {
            // 没有存过，购物车为空
            // var arr = [];
            // arr[0] = this.detail
            // let str = JSON.stringify(arr)
            // localStorage.setItem('cart', str)
            localStorage.setItem('cart', JSON.stringify([this.detail]))
          }
          let _this = this;
          console.log(this)
          // 抛物线
          $('<img src="http://img2.utuku.china.com/uploadimg/game/20170119/51c08a0f-b555-49c2-8062-e53087c68fe2.jpg" style="width:20px;height:30px">')
            .fly({
              start: $("#add-cart").offset(),
              end: $("#cart-num").offset(),
              // autoPlay: true, //是否直接运动,默认true
              // speed: 1.1, //越大越快，默认1.2
              // vertex_Rtop：100, //运动轨迹最高点top值，默认20
              onEnd: function () {
                console.log(this)
                this.destroy()
                let num = Number($("#cart-num").html())
                num += _this.detail.num
                $("#cart-num").html(num)
                console.log(num)
              } //结束回调
            })
        })


      }

    }
    new Detail()
  })
})