var me = null
var FormMode

$(document).ready(function () {
    //load dữ liệu
    customerJs = new CustomerJS();
});

/**
 * Object JS quản lý các sự kiện cho trang danh mục khách hàng.
 * */
class CustomerJS {
    constructor() {
        me = this;
        this.loadData();
        this.initEvent();
        this.FormMode = null;
    }

    /**
     * Thực hiện gán các sự kiện cho các thành phần trong trang
     * author: LTTUAN(27/08/2020)
     */
    initEvent() {
        console.log("CustomerJS -> initEvent -> initEvent");
        // Khi ấn thêm, sửa, xóa
        $("#btnAdd").on("click", Enum.FormMode.Add, this.toolbarItemOnClick.bind(this));
        $("#btnDuplicate").on("click", Enum.FormMode.Duplicate, this.toolbarItemOnClick.bind(this));
        $("#btnEdit").on("click", Enum.FormMode.Edit, this.toolbarItemOnClick.bind(this));
        $("#btnDelete").on("click", Enum.FormMode.Delete, this.toolbarItemOnClick.bind(this));
        $("#btnRefresh").on("click", this.loadData);

        // Khi ấn nút đóng
        $("#btnClose").on("click", this.btnCloseOnClick.bind(this));
        $("#btnCloseHeader").on("click", 0, this.btnCloseHeaderOnClick.bind(this));

        //Khi ấn nút cất
        $("#btnSave").click(this.saveData.bind(this));

        // Khi ấn vào 1 thành phần ở trong table
        $("table").on("click", "tbody tr", this.rowOnClick);

        // Phần pagination
        $("#firstPage").on("click", pagination.firstPage)
        $("#prevPage").on("click", pagination.prevPage)
        $("#nextPage").on("click", pagination.nextPage)
        $("#lastPage").on("click", pagination.lastPage)
        $("#refresh").on("click", this.loadData)

        // Phần fitler
        $("#tbListCustomer thead input").on("keydown", function (event) {
            var keyCode = event.which || event.keyCode;
            if (((keyCode >= 32) && (keyCode <= 125))) { me.filter() };
            if (keyCode == 8) { me.filter() }
        });
        
        // Sự kiện khi upload file
        $("#fileImage").on('change',this.showImageFromInput);

    }

    showImageFromInput() {
        debugger
        var file = $(this)[0].files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            var imageUrl = event.target.result;
            $("#fileImage").attr("background-image", imageUrl);
            // $(".img-thumbnail").css("visibility", "visible");
            $("#img-info").html(file.name);
        };
        debugger
        fileReader.readAsDataURL(file);
    }

    toolbarItemOnClick(sender) {
        try {
            var FormMode = sender.data;
            switch (FormMode) {

                // trường hợp thêm khách hàng mới
                case Enum.FormMode.Add:
                    this.FormMode = Enum.FormMode.Add;
                    this.btnAddOnClick();
                    break;

                // trường hợp nhân bản thông tin khách hàng
                case Enum.FormMode.Duplicate:
                    this.btnDuplicateOnClick();
                    break;

                // trường hợp chỉnh sửa thông tin khách hàng
                case Enum.FormMode.Edit:
                    this.FormMode = Enum.FormMode.Edit;
                    this.btnEditOnClick();
                    break;

                // trường hợp xóa khách hàng khỏi bảng
                case Enum.FormMode.Delete:
                    this.btnDeleteOnClick();
                    break;
                default:
            }
        } catch (e) {
            console.log(e);
        }

    }

    /**
     * Sự kiện click Thêm trên dialog
     * @param {any} sender
     * @author LTTuan (29/07/2020)
     */
    btnAddOnClick(sender) {
        console.log("CustomerJS -> btnAddOnClick -> btnAddOnClick")
        //Show dialog
        $("#formDialogDetail").show();
    }

    /**
     * Sự kiện nhân bản một khách hàng
     * @param {any} sender
     * @author LTTUAN (29/07/2020) 
     */
    btnDuplicateOnClick(sender) {
        console.log("CustomerJS -> btnDuplicateOnClick -> btnDuplicateOnClick");
        try {
            //lấy thông tin đối tượng khách hàng
            var rowSelected = $(".row-selected");
            var customerId = rowSelected.data("customerId");
            if (rowSelected) {
                //lấy dữ liệu từ api
                $.ajax({
                    url: "/api/v1/Customers/" + customerId,
                    method: "GET",
                    data: {},
                    dataType: "json",
                    contentType: "application/json",
                }).done(function (res) {
                    var customerDupicate = {
                        customerCode: res.customerCode,
                        customerName: res.customerName,
                        companyName: res.companyName,
                        birthday: res.birthday,
                        address: res.address,
                        phoneNumber: res.phoneNumber,
                        email: res.email,
                        is5FoodMember: res.is5FoodMember,
                        memberCode: res.memberCode,
                        groupCustomer: res.groupCustomer,
                        debitNumber: res.debitNumber
                    };
                    console.log(res),
                        $.ajax({
                            url: "/api/v1/Customers",
                            method: "POST",
                            data: JSON.stringify(customerDupicate),
                            dataType: "json",
                            contentType: "application/json",
                        }).done(function (res) {
                            alert("Nhân bản thành công");
                            me.loadData();
                        }).fail(function (res) {
                            alert("Nhân bản không thành công 1")
                        })
                }).fail(function (res) {
                    alert("Bạn chưa chọn khách hàng để nhân bản")
                })

            } else {
                alert("Bạn chưa chọn khách hàng để nhân bản")
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Sự kiện click Sửa trên dialog
     * @param {any} sender
     * @author: LTTUAN (29/07/2020)
     */
    btnEditOnClick(sender) {
        console.log("CustomerJS -> btnAddOnClick -> btnEditOnClick")

        try {
            if ($('.row-selected').length !== 0) {
                //lấy thông tin đối tượng khách hàng
                var rowSelected = $(".row-selected");
                var customerId = rowSelected.data("customerId");

                //lấy dữ liệu từ api
                $.ajax({
                    url: "/api/v1/Customers/" + customerId,
                    method: "GET",
                    data: {},
                    dataType: "json",
                    contentType: "application/json",
                }).done(function (res) {
                    $.each(res, function (index, item) {
                        //bind dữ liệu vào dialog
                        $('#txtCustomerCode').val(res.customerCode);
                        $('#txtCustomerName').val(res.customerName);
                        $('#txtCompanyName').val(res.companyName);
                        $('#dtBirthday').val(commonJS.formatDateToBind(new Date(res.birthday)));
                        $('#txtAddress').val(res.address);
                        $('#txtPhoneNumber').val(res.phoneNumber);
                        $('#txtEmail').val(res.email);
                        $('#ckIs5FoodMember').prop('checked', res.is5FoodMember);
                        $('#txtMemberCode').val(res.memberCode);
                        $('#txtGroupCustomer').val(res.groupCustomer);
                        $('#txtDebitNumber').val(res.debitNumber);

                        //Show dialog
                        $("#formDialogDetail").show();
                    });
                }).fail(function (res) {
                })

            } else {
                alert(Resource.Language[commonJS.LanguageCode].CantEdit);
            }
        } catch (e) {
            console.log(e)
        }

    }

    /**
     * Sự kiện click Xóa trên dialog
     * @param {any} sender
     * @author: LTTUAN (29/07/2020)
     */
    btnDeleteOnClick(sender) {
        console.log("CustomerJS -> btnDeleteOnClick -> btnDeleteOnClick")

        try {
            //Nếu thấy row có class là row-selected
            if ($(".row-selected").length !== 0) {
                debugger
                $.ajax({
                    url: "/api/v1/Customers/" + $(".row-selected").data('customerId'),
                    method: "DELETE",
                    data: {},
                    dataType: "json",
                    contentType: "application/json",
                }).done(function (res) {
                    console.log(res);
                    //load lại data
                    me.loadData();
                }).fail(function (res) {
                });

                //thông báo xóa thành công
                alert(Resource.Language[commonJS.LanguageCode].Delete);
            } else {
                debugger
                //thông báo xóa không thành công
                alert(Resource.Language[commonJS.LanguageCode].CantDelete);
            }

        } catch (e) {
            console.log(e);
        }

    }

    /**
     * Sự kiện khi click chọn 1 dòng trong table
     * CreatedBy: LTTUAN (29/07/2020)
     */
    rowOnClick() {
        console.log("CustomerJS -> rowOnClick -> rowOnClick")
        //thêm class row-selected vào những dòng được chọn
        this.classList.toggle("row-selected");
        //loại bỏ class row-selected khỏi các dùng
        $(this).siblings().removeClass("row-selected");
        var selectedCustomer = $(".row-selected");
        if (selectedCustomer.length) { $("#btnDuplicate, #btnEdit, #btnDelete").attr("disabled", false); } else {
            $("#btnDuplicate, #btnEdit, #btnDelete").attr("disabled", true);
        }
    }

    /**
     * Thực hiện load dữ liệu vào trang
     * author: LTTuan(27/07/2020)
     */
    loadData() {
        console.log("CustomerJS -> loadData -> loadData")
        try {
            //làm trống table
            $('#tbListCustomer tbody').empty();
            //khai báo mảng chứa data
            //gọi ajax lấy dữ liệu với phương thức get
            $.ajax({
                url: "/api/v1/Customers",
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (res) {
                //Đọc dũ liệu và gen dữ liệu từng khách hàng vào html
                $.each(res, function (index, item) {
                    var customerInfoHTML = $(`<tr>
                                <td>`+ item['customerCode'] + `</td>
                                <td>`+ item['customerName'] + `</td>
                                <td>`+ item['companyName'] + `</td>
                                <td>`+ commonJS.formatDate(new Date(item['birthday'])) + `</td>
                                <td>`+ item['address'] + `</td>
                                <td>`+ item['phoneNumber'] + `</td>
                                <td>`+ item['email'] + `</td>
                                <td class="align-center">`+ commonJS.buildCheckBoxByValue(item['is5FoodMember']) + `</td>
                            </tr>`);
                    customerInfoHTML.data("customerId", item.customerId);
                    customerInfoHTML.data("debitNumber", item.debitNumber);
                    customerInfoHTML.data("groupCustomer", item.groupCustomer);
                    customerInfoHTML.data("memberCode", item.memberCode);
                    $('#tbListCustomer tbody').append(customerInfoHTML);
                });
                $("#btnDuplicate, #btnEdit, #btnDelete").prop('disabled', true);
            }).fail(function (res) {
            })

        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Sự kiện khi cất dữ liệu
     * author: LTTUAN(29/07/2020)
     */
    saveData() {
        console.log("CustomerJS -> saveData -> saveData");
        console.log("CustomerJS -> saveData -> FormMode ", me.FormMode);

        debugger
        try {
            //Khởi tạo các biến để lấy dữ liệu phòng TH null
            var customerCode = "",
                customerName = "",
                companyName = "",
                birthday = "",
                address = "",
                phoneNumber = "",
                email = "",
                memberCode = "",
                groupCustomer = "",
                debitNumber = 0,
                is5FoodMember = false;

            // Lấy dữ liệu được nhập từ các input:
            customerCode = $("#txtCustomerCode").val();
            customerName = $("#txtCustomerName").val();
            companyName = $("#txtCompanyName").val();
            birthday = new Date($("#dtBirthday").val());
            address = $("#txtAddress").val();
            phoneNumber = $("#txtPhoneNumber").val();
            email = $("#txtEmail").val();
            is5FoodMember = $("#ckIs5FoodMemberail").is(":checked");
            memberCode = $("#txtMemberCode").val();
            groupCustomer = $("#txtGroupCustomer").val();
            debitNumber = Number($("#txtDebitNumber").val());

            // Kiểm tra trống trường mã khách hàng
            if (!customerCode) {
                alert("Trường Mã khách hàng không được để trống!");
                return false;

                // Kiểm tra trống trường tên khách hàng
            } else if (!customerName) {
                alert("Trường Tên khách hàng không được để trống!");
                return false;

                // Kiểm tra trống trường ĐT di động
            } else if (!phoneNumber) {
                alert("Trường ĐT di động không được để trống!");
                return false;

                // Kiểm tra trống trường email
            } else if (!email) {
                alert("Trường email không được để trống!!");
                return false;

                // Kiểm tra hợp lệ trường ĐT di động
            } else if (!commonJS.validatePhone(phoneNumber)) {
                alert("Trường ĐT di động đã nhập không hợp lệ, phải có đủ 10 số!");
                return false;

                // Kiểm tra hợp lệ trường email
            } else if (!commonJS.validateEmail(email)) {
                alert("Trường email đã nhập không hợp lệ!");
                return false;
            } else {
                debugger
                if (me.FormMode == Enum.FormMode.Add) {
                    // Từ các dữ liệu thu thập được thì build thành object khách hàng (customer)
                    var customerAdd = {
                        customerCode: customerCode,
                        customerName: customerName,
                        companyName: companyName,
                        birthday: birthday,
                        address: address,
                        phoneNumber: phoneNumber,
                        email: email,
                        is5FoodMember: is5FoodMember,
                        memberCode: memberCode,
                        groupCustomer: groupCustomer,
                        debitNumber: debitNumber
                    };
                    //Nếu form là form nhập mới
                    console.log("CustomerJS -> saveData -> action")
                    //thêm phần tử vào cuối mảng
                    $.ajax({
                        url: "/api/v1/Customers/",
                        method: "POST",
                        data: JSON.stringify(customerAdd),
                        dataType: "json",
                        contentType: "application/json",
                    }).done(function (res) {
                        //Hiển thị thông báo sửa thành công
                        alert(Resource.Language[commonJS.LanguageCode].AddNew);;
                        console.log(res);
                        // Đóng/ ẩn Form:
                        $("#formDialogDetail").hide();
                        // load lại dữ liệu
                        me.loadData();
                        // Reset lại dialog
                        me.resetDialog();
                    }).fail(function (res) {
                        alert("Có lỗi khi thêm mới")
                    });
                    debugger

                } else if (me.FormMode == Enum.FormMode.Edit) {
                    //Nếu form là chỉnh sửa
                    var rowSelected = $(".row-selected");
                    var customerId = rowSelected.data("customerId")
                    var customerEdit = {
                        customerId: customerId,
                        customerCode: customerCode,
                        customerName: customerName,
                        memberCode: memberCode,
                        groupCustomer: groupCustomer,
                        companyName: companyName,
                        debitNumber: debitNumber,
                        birthday: birthday,
                        address: address,
                        phoneNumber: phoneNumber,
                        email: email,
                        is5FoodMember: is5FoodMember
                    }
                    debugger
                    $.ajax({
                        url: "/api/v1/Customers/" + customerEdit.customerId,
                        method: "PUT",
                        data: JSON.stringify(customerEdit),
                        dataType: "json",
                        contentType: "application/json",
                    }).done(function (res) {
                        //Hiển thị thông báo sửa thành công
                        alert(Resource.Language[commonJS.LanguageCode].Edit);;
                        console.log(res);
                        // Đóng/ ẩn Form:
                        $("#formDialogDetail").hide();
                        // load lại dữ liệu
                        me.loadData();
                        // Reset lại dialog
                        me.resetDialog();

                    }).fail(function (res) {
                        debugger
                        alert("có lỗi khi sửa");;
                    });
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    /**
     * Hàm reset lại dialog sau khi dialog nhận data từ row đc chọn
     * CreatedBy: LTTUAN (29/7/2020)
     * */
    resetDialog() {
        console.log("CustomerJS -> resetDialog -> resetDialog")
        $('#txtCustomerCode').val("");
        $('#txtCustomerName').val("");
        $('#txtCompanyName').val("");
        $('#dtBirthday').val("");
        $('#txtAddress').val("");
        $('#txtPhoneNumber').val("");
        $('#txtEmail').val("");
        $('#ckIs5FoodMemberail').prop('checked', false);
        $("#txtMemberCode").val("");
        $("#txtGroupCustomer").val("");
        $("#txtDebitNumber").val("");
        // $("#btnDuplicate, #btnEdit, #btnDelete").prop('disabled', true);
    }

    /**
    * Sự kiện khi click button đóng dưới footer của Dialog
    * CreatedBy: LTTUAN (24/07/2020)
    * */

    btnCloseOnClick() {
        console.log("CustomerJS -> btnCloseOnClick -> btnCloseOnClick")
        // Hide dialog
        $("#formDialogDetail").hide();
        // Reset lại dialog  chuẩn bị cho lần nhập sau
        this.resetDialog();
    }

    /**
    * Sự kiện khi click Đóng trên tiêu đề của Dialog
    * CreatedBy: LTTUAN (24/07/2020)
    * */
    btnCloseHeaderOnClick() {
        console.log("CustomerJS -> btnCloseHeaderOnClick -> btnCloseHeaderOnClick")
        //Hide dialog
        $("#formDialogDetail").hide();
        // Reset lại dialog  chuẩn bị cho lần nhập sau
        this.resetDialog();
    }

    filter() {
        console.log("input keydown")

        // xử lý trong ajax

        $.ajax({
            url: "/api/v1/Customers",
            method: "GET",

        }).done(function (res) {
            // lấy dữ liệu input filter
            var inpCustomerCode = $("#inpCustomerCode").val();
            var inpCustomerName = $("#inpCustomerName").val();
            var inpCompanyName = $("#inpCompanyName").val();
            var inpBirthday = $("#inpBirthday").val();
            var inpAddress = $("#inpAddress").val();
            var inpPhoneNumber = $("#inpPhoneNumber").val();
            var inpEmail = $("#inpEmail").val();
            // var is5FoodCheckBox = $("#is5FoodCheckBox")[0].checked;

            // làm trống table trước
            $("#tbListCustomer tbody").empty();
            // nếu dữ liệu hợp lệ thì tạo đối tượng
            $.each(res, function (index, item) {
                debugger
                if ((item.customerCode.toLowerCase().includes(inpCustomerCode.toLowerCase()) || inpCustomerCode == "") &&
                    (item.customerName.toLowerCase().includes(inpCustomerName.toLowerCase()) || inpCustomerName == "") &&
                    (item.companyName.toLowerCase().includes(inpCompanyName.toLowerCase()) || inpCompanyName == "") &&
                    (item.address.toLowerCase().includes(inpAddress.toLowerCase()) || inpAddress == "") &&
                    (item.phoneNumber.toLowerCase().includes(inpPhoneNumber.toLowerCase()) || inpPhoneNumber == "") &&
                    (item.email.toLowerCase().includes(inpEmail.toLowerCase()) || inpEmail == "") &&
                    (commonJS.formatDate(new Date(item['birthday'])).includes(inpBirthday) || inpBirthday == "")
                ) {
                    var customerInfoHTML = $(`<tr>
                <td>`+ item['customerCode'] + `</td>
                <td>`+ item['customerName'] + `</td>
                <td>`+ item['companyName'] + `</td>
                <td>`+ commonJS.formatDate(new Date(item['birthday'])) + `</td>
                <td>`+ item['address'] + `</td>
                <td>`+ item['phoneNumber'] + `</td>
                <td>`+ item['email'] + `</td>
                <td class="align-center">`+ commonJS.buildCheckBoxByValue(item['is5FoodMember']) + `</td>
            </tr>`);
                    $('#tbListCustomer tbody').append(customerInfoHTML);

                }
            });
            //thêm vào table
        }).fail(function (res) {

        })
    }
}