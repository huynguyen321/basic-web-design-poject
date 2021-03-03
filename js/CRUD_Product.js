const API_URL = "http://localhost:3000";

// axios.get("https://600e48f73bb1d100179ded83.mockapi.io/api/")
//     .then(response => console.log("response", response.data))

function callAPI(endpoint, method = "GET", body) {
    return axios({
        method: method,
        url: `${API_URL}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

var id;
var listProduct;

var show = function() {
    callAPI("product", "GET", null).then((res) => {
        // lay du lieu ve
        listProduct = res.data;
        var html = "";
        for (var i in listProduct) {
            var data = JSON.parse(JSON.stringify(listProduct[i]));
            html += `
            <tr>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td><img src="${data.img1}" style="width: 50px;"></td>
            <td><img src="${data.img2}" style="width: 50px;"></td>
            <td><img src="${data.img3}" style="width: 50px;"></td>
            <td> ${data.price}</td>
            <td> ${data.tag}</td>
            <td><button onclick="updateProduct(${data.id})" class="btn btn-outline-danger" data-toggle="modal" data-target="#updateProduct"><i class="fas fa-cogs"> </i></button>
                <button onclick="deleteProduct(${data.id})" class="btn btn-out-warning"> <i class="fas fa-trash"> </i></button>
            </td>    
            </tr>
            `;

        }
        document.getElementById("product_admin").innerHTML = html;
    });

};

function addProduct() {

    var tagTemp = "";
    if (document.getElementById("tag4").checked) {
        tagTemp = "Thu-Đông ";
    }
    if (document.getElementById("tag1").checked) {
        tagTemp += "Nam";
    } else {
        if (document.getElementById("tag2").checked) {
            tagTemp += "Nữ";
        } else {
            if (document.getElementById("tag3").checked) {
                tagTemp += "Đồ đôi";
            }
        }
    };

    let oneProduct = {
        name: $("#name").val(),
        img1: $("#img1").val(),
        img2: $("#img2").val(),
        img3: $("#img3").val(),
        price: $("#price").val(),
        tag: tagTemp
    };

    console.log(oneProduct);

    callAPI("product", "POST", oneProduct).then((res) => {
        alert("Thêm sản phẩm thành công!");
        load();
        reset();
    });
};


function updateProduct(id) {

    callAPI(`product/${id}`, "GET", null).then((res) => {
        let oneProduct;
        oneProduct = res.data;

        document.getElementById("idd").value = oneProduct.id;
        document.getElementById("named").value = oneProduct.name;
        document.getElementById("img1d").value = oneProduct.img1;
        document.getElementById("img2d").value = oneProduct.img2;
        document.getElementById("img3d").value = oneProduct.img3;
        document.getElementById("priced").value = oneProduct.price;

        if (oneProduct.tag.indexOf("Thu-Đông") >= 0) {
            document.getElementById("tag4d").checked = true;
        }
        if (oneProduct.tag.indexOf("Nam") >= 0) {
            document.getElementById("tag1d").checked = true;
        } else {
            if (oneProduct.tag.indexOf("Nữ") >= 0) {
                document.getElementById("tag2d").checked = true;
            } else {
                if (oneProduct.tag.indexOf("Đồ đôi") >= 0) {
                    document.getElementById("tag3d").checked = true;
                }
            }
        }
    });
    document.getElementById("summitUpdate").innerHTML =
        `<button class="btn btn-outline-danger mt-3" onclick="submitUpdate(${id})">Cập nhật</button>`;
};

function submitUpdate(id) {
    id = parseInt(id);

    console.log(id);

    let oneProduct = {
        id: "",
        name: "",
        img1: "",
        img2: "",
        img3: "",
        price: "",
        tag: ""
    };

    oneProduct.id = document.getElementById("idd").value;
    oneProduct.name = document.getElementById("named").value;
    oneProduct.img1 = document.getElementById("img1d").value;
    oneProduct.img2 = document.getElementById("img2d").value;
    oneProduct.img3 = document.getElementById("img3d").value;
    oneProduct.price = document.getElementById("priced").value;
    var tagTemp = "";
    if (document.getElementById("tag4d").checked) {
        tagTemp = "Thu-Đông ";
    }
    if (document.getElementById("tag1d").checked) {
        tagTemp += "Nam";
    } else {
        if (document.getElementById("tag2d").checked) {
            tagTemp += "Nữ";
        } else {
            if (document.getElementById("tag3d").checked) {
                tagTemp += "Đồ đôi";
            }
        }
    };
    oneProduct.tag = tagTemp;
    callAPI(`product/${id}`, 'PUT', oneProduct).then((response) => {
        load();
        alert("Cập nhật thành công!");
    });
    window.location.reload();
};

function deleteProduct(id) {
    id = parseInt(id);
    console.log(id);
    if (confirm("Bạn có chắc muốn xoá sản phẩm?")) {
        callAPI(`product/${id}`, "DELETE", null).then(res => {
            alert("Xoá thành công!");
            load();
        });
    }
};

function load() {
    show();
}

//load data
if (callAPI(`product`, "GET", null).then((res) => {
        listProduct = res.data;
        if (listProduct != null) {
            return true;
        } else {
            return false;
        }
    })) {
    load();
}

function reset() {
    document.getElementById("name").value = "";
    document.getElementById("img1").value = "";
    document.getElementById("img2").value = "";
    document.getElementById("img3").value = "";
    document.getElementById("price").value = "";
    document.getElementById("tag1d").checked = false;
    document.getElementById("tag2d").checked = false;
    document.getElementById("tag3d").checked = false;
    document.getElementById("tag4d").checked = false;
};