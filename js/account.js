const API_URL = "http://localhost:3000";
//callAPI
function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

// hien thi phan dang nhap
function callFormSignIn() {
    var html = `
    <!-- Modal Sign In HTML -->
    <style>

</style>
    <div id="loginModal" class="modal fade" style="color: black">
        <div class="modal-dialog modal-login">
        <div class="modal-content">
            <div class="modal-header" style="color: black">				
                <h4 class="modal-title">Đăng nhập</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>

            <div class="modal-body">
                <p>Để đăng nhập vui lòng nhập email và mật khẩu:</p>
                <div class="login-form">
                <div class="form-group">
                    <label for="form-username">Email</label></br>
                    <input type="text" name="form-username" placeholder="Email..." class="form-username form-control" id="email">
                </div>
                <div class="form-group">
                    <label for="form-password">Mật khẩu</label></br>
                    <input type="password" name="form-password" placeholder="Mật khẩu..." class="form-password form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary" onclick="signIn()">Đăng nhập</button>
            </div>
            <div class="modal-footer" style="color: black" >Nếu bạn chưa có tài khoản, hãy <a href="#" data-dismiss="modal" aria-hidden="true" onclick="callFormSignUp()" data-toggle="modal" data-target="#signUpModal">&nbsp Đăng ký</a></div>
        </div>

    </div>
        </div>
    </div>  
`;
    document.getElementById("form-sign-in").innerHTML = html;
}

// hien thi phan dang ky

function callFormSignUp() {
    var html = `
    <!-- Modal Sign Up HTML -->
    <div id="signUpModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style="color: black">				
                <h4 class="modal-title">Đăng ký</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
           
        <div class="modal-body">
        <div class="login-form">
        <div class="form-group" style="color: black">
        <p>Để đăng kí vui lòng thực hiện như sau:<br/>
            <i>- Nhập đúng email của bạn theo: ...@gmail.com</i><br/>
            <i>- Nhập đúng số điện thoại</i><br/>
            <i>- Xác thực mật khẩu và mật khẩu với 6-10 kí tự, ít nhất 1 số, chữ hoa, và chữ thường.</i><br/>
        </p>
    </div>
        
    <div class="login-form">
        <div class="form-group">
            <label>Email</label></br>
            <input type="text" placeholder="email@gmail.com" class="form-email form-control" id="emails">
        </div>
        <div class="form-group">
            <label for="form-name">Họ và tên</label></br>
            <input type="text" name="form-name" placeholder="Nguyễn Thị Thanh Nga" class="form-name form-control" id="name">
        </div>
        <div class="form-group">
            <label for="form-phone">Số điện thoại</label></br>
            <input type="text" name="form-phone" placeholder="0912345678" class="form-phone form-control" id="phone">
        </div>
        <div class="form-group">
            <label for="form-address">Địa chỉ liên hệ</label></br>
            <input type="text" name="form-address" placeholder="101B Lê Hữu Trác" class="form-address form-control" id="address">
        </div>
        <div class="form-group">
            <label for="form-password">Mật khẩu</label></br>
            <input type="password" name="form-password" placeholder="******" class="form-password form-control" id="passwords">
        </div>
        <div class="form-group">
            <label for="form-confirm">Xác nhận mật khẩu</label></br>
            <input type="password" name="form-confirm" placeholder="******" class="form-confirm form-control" id="confirm">
        </div>
        <button type="submit" class="btn btn-primary" onclick="signUp()">Đăng kí</button>
    </div>


                <div class="modal-footer" style="color: black" >Nếu bạn đã có tài khoản, hãy <a href="#" data-dismiss="modal" aria-hidden="true" onclick="callFormSignIn()" data-toggle="modal" data-target="#loginModal">&nbsp Đăng nhập</a></div>
            </div>
        </div>
    </div>  
    `;
    document.getElementById("form-sign-up").innerHTML = html;
}

// set data
var user = null;
callAPI("customer", "GET", null).then((res) => {
    user = res.data;
});
console.log(user);
// sign in
var signIn = function() {
    console.log(user);
    var username;
    var k = -1;
    for (var i in user) {
        var data = JSON.parse(JSON.stringify(user[i]));
        username = data.name;
        if (
            document.getElementById("email").value == data.email &&
            document.getElementById("password").value == data.password &&
            data.role == "admin"
        ) {
            k = 2;
            console.log(k);
        } else if (
            document.getElementById("email").value == data.email &&
            document.getElementById("password").value == data.password &&
            data.role == "user"
        ) {
            k = 1;
        }
    }
    console.log(k);
    if (k >= 1) {
        $("#signInModal").modal("hide");
        //hide the modal
        alert("Đăng nhập thành công");
        // Script for account
        if (k == 2) {
            document.getElementById("control-accout").innerHTML = `
            <button>
                <i class="fas fa-clipboard-list fa-fw "></i>Theo dõi đơn hàng
            </button>
            <button onclick="logout()">
            <i class="fa fa-sign-out" aria-hidden="true"></i>Đăng xuất
            </button>
            <button onclick="window.location.href='../html/admin.html'">
                <i class=" fas fa-cogs fa-fw" aria-hidden="true"></i>Trang Admin
            </button>`;
        } else {
            document.getElementById("control-accout").innerHTML = `
            <button>
                <i class="fas fa-clipboard-list fa-fw "></i>Theo dõi đơn hàng
            </button>
            <button>
            <i class="fa fa-user" aria-hidden="true"></i>${username}
            </button>
            <button onclick="logout()">
            <i class="fas fa-sign-out-alt" aria-hidden="true"></i></i>Đăng xuất
            </but   ton>`;
        }
    } else {
        alert("Đăng nhập không thành công.");
    }
};

//sign up
var signUp = function() {
    let email = document.getElementById("emails").value;
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let password = document.getElementById("passwords").value;
    let confirm = document.getElementById("confirm").value;
    //console.log(email + username + name + phone + address + password + confirm);
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email && name && phone && address && password && confirm) {
        if (!re.test(email) || checkEmail(email)) {
            alert("Email không hợp lệ hoặc đã tồn tại.");
            return false;
        } else {
            if (!isValidPhone(phone)) {
                alert("Số điện thoại không hợp lệ");
                return false;
            } else {
                console.log(password);
                if (CheckPassword(password)) {
                    if (password == confirm) {
                        let User = {
                            id: parseInt(user.length + 1),
                            email: email,
                            name: name,
                            phone: phone,
                            address: address,
                            password: password,
                            role: "user",
                        };
                        callAPI("customer", "POST", User).then((Response) => {});
                        alert("Đăng kí thành công.");
                        Email.send({
                            SecureToken: "28997d74-13c1-4110-b782-e00a72010608",
                            From: "NHDstyle@gmail.com",
                            To: email,
                            Subject: "HND-style_ Đăng kí tài khoản",
                            Body: "Thân gửi quí khách hàng, NHD xin chúc mừng bạn đã đăng kí thành công tài khoản.",
                        }).then(function(message) {
                            alert("Gửi email thành công. Vui lòng kiểm tra email của bạn");
                            console.log(email);
                            console.log(message);
                        });

                        document.getElementById("emails").value = "";
                        document.getElementById("name").value = "";
                        document.getElementById("phone").value = "";
                        document.getElementById("address").value = "";
                        document.getElementById("passwords").value = "";
                        document.getElementById("confirm").value = "";
                    } else {
                        alert("Vui lòng xác thực mật khẩu");
                    }
                }
            }
        }
    } else {
        alert("Vui lòng nhập đầy đủ thông tin");
    }
};

//check Email
var checkEmail = function(email) {
    let k = -1;
    console.log(user);
    for (let i in user) {
        if (email === user[i].email) {
            k = 1;
            return true;
        } else {
            k = -1;
        }
    }
    if (k == -1) {
        return false;
    }
};
// check phone
var isValidPhone = function(phoneNumber) {
    var found = phoneNumber.search(
        /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/
    );
    if (found > -1) {
        return true;
    } else {
        return false;
    }
};
// kiem tra mat khau co dung dieu kien k
var CheckPassword = function(inputtxt) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
    if (passw.test(inputtxt)) {
        return true;
    } else {
        alert(
            "Vui lòng nhập từ 6-10 kí tự và có ít nhất số, chữ thường và chữ hoa."
        );
        return false;
    }
};

// dang xuat
var logout = function() {
    window.location.href = "../html/index.html";
};