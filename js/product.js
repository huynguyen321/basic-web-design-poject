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
var listProduct = null;

function showHotProduct() {
    callAPI("product", "GET", null).then((res) => {
        // lay du lieu ve
        listProduct = res.data;
        console.log(listProduct);
        var html = "";
        for (var i in listProduct) {
            var data = JSON.parse(JSON.stringify(listProduct[i]));
            html += `
            <div class="col-lg-3 col-md-6 col-6 mt-3 pb-3">
            <div class="card product p-2" style="width:auto"> <img class="card-img-top" src="${data.img1}">
                <div class="card-title product-title text-center h5">${data.name}</div>
                <div class="price text-center h6">${data.price} VNĐ</div>
                <div class="star_box float-left pt-2">
                    <span class="text-center btn add-to-cart btn-add-cart add-cart float-left col-5" data-id=" data.id" data-name=" data.name" data-img=" data.img" data-price=" data.price" onclick="tks()">
                    <a>
                        <i class="fas fa-cart-plus"></i>
                    </a>
                </span>
                    <button class="btn btn-outline-primary float-right col-5" data-toggle="modal" data-target="#exampleModalLong" onclick="getProductById(${data.id})">
                    <i class="fas fa-info fa-fw"></i>Chi tiết
                </button>
                    <!-- modal: detail product -->
                    <div class="modal fade mt-5 text-center" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div id="prinf_product">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            `;

        }
        document.getElementById("hot-product").innerHTML = html;
    });

};




function getProductById(id) {
    id = parseInt(id);
    console.log(id);
    let html = "";

    callAPI(`product/${id}`, "GET", null).then((res) => {
        listProduct = res.data;
        var a = JSON.parse(JSON.stringify(listProduct));
        html = `
    <img src = "${a.img1}">
    <br>
    <br> ${a.name}
    <br> 
    <b>Giá:${a.price} VNĐ </b>
    <br>
    <a class = "btn btn-outline-info btn-detail" onclick = "checkorder(` + a.id + `)" >Mua</a>
        `;
        document.getElementById("prinf_product").innerHTML = html;
    });
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
    showHotProduct();
}