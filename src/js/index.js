require(['require.config'], () => {
  require(['swiper', 'template', 'url', 'header', 'footer', 'cookie'], (Swiper, template, url, header) => {
    class Index {
      constructor() {
        this.headerContainer = $("header")
        this.cart()
        this.parts()
        this.initSwiper()
        console.dir($)
      }

      cart() {
        // header里面的DOM由于是异步加载，所以在这里获取不到
        // 可以使用事件委托，把事件委托给本来就已经存在的contaiener
        this.headerContainer.on('click', '.select', function (e) {
          // jq里的on方法可以直接完成实际那委托而不用自己判断事件源
          // this指向事件源
          // console.log(this)
        })
      }

      parts() {
        // 负责渲染热销模块
        $.get(url.baseUrl + '/parts/get', resp => {
          if (resp.res_code === 200) {
            this.renderparts(resp.res_body)
          }

        })

      }

      renderparts(resBody) {
        // 第一个参数是模板的id，第二个参数是这个模板里面需要的数据
        let html = template('index', {
          list: resBody.list,
          bigImg: resBody.bigImg
        })
        // console.log(html)
        $("#list-container").html(html)


      }

      initSwiper() {
        var mySwiper = new Swiper('.swiper-container', {
          autoplay: true,
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
      }


    }
    new Index()
  })
})