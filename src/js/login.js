require(['require-config'], () => {
    require(['url', 'jquery', 'cookie'], (url, $) => {
        class Login {
            constructor() {
                this.LGcon = $("#loginRegContainer")
                this.username = $("#phoneNum");
                this.areaCode = $("#area-code");
                this.pwd = $("#pwd");
                this.eye = $("#eye");
                this.lBtn = $("#loginBtn");
                this.bindEvent();
            }
            bindEvent() {
                this.lBtn.on('click', () => {
                    this.getData();
                });
                this.eye.on('click', () => {
                    this.changeEye();
                })
            }
            getData() {
                let userName = this.areaCode.html().slice(1) + this.username.val(),
                    password = this.pwd.val();
                $.ajax({
                    "data": {
                        password,
                        userName
                    },
                    "type": "post",
                    "url": url.phpUrl + 'login.php',
                    "success": data => {
                        if (data.res_code === 1) {
                            alert(data.res_message + '，即将跳转至首页');
                            location.href = '/';
                            $.cookie("user", userName, {
                                "path": "/"
                            })
                        } else {
                            alert(data.res_message)
                        }
                    },
                    "dataType": "json"
                })
            }
            changeEye() {
                if (this.pwd.prop('type') === "password") {
                    this.pwd.prop("type", "text");
                    this.eye.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
                } else {
                    this.pwd.prop("type", "password");
                    this.eye.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
                }
            }

        }
        new Login();
    })
})