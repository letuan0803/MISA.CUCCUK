var me = null
var FormMode
// Mã nhân viên lớn nhất
var maxEmployeeCode
// Số trang hiện tại
var currentPage = 10
// Tổng số bản ghi
var totalRecord
// Số bản ghi mỗi trang
var recordPerPage = 100

$(document).ready(function () {
    //load dữ liệu
    employeeJS = new EmployeeJS();
});

/**
 * Object JS quản lý các sự kiện cho trang danh mục nhân viên.
 * */
class EmployeeJS {
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
        console.log("EmployeeJS -> initEvent -> initEvent");
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

        // Khi ấn vào 1 dòng trong table
        $("table").on("click", "tbody tr", this.rowOnClick);



        // Khi ấn nút chọn page số bao nhiêu
        $('#recordPerPage').on('change', this.loadData);

        // Khi ấn nút chọn số row trong 1 page
        $('#inpPage').on('change', this.loadData);

        // Khi ấn nút Yes trên warning-box
        $('#btn-yes-warning').on('click', Enum.FormMode.Delete, this.deleteStaff.bind(this));

        // Khi ấn nút No trên warning-box
        $('#btn-close-warning').on('click', 0, this.notDeleteStaff);

        // Phần fitler
        $("#tbListEmployee thead input").on("keydown", function (event) {
            var keyCode = event.which || event.keyCode;
            if (((keyCode >= 32) && (keyCode <= 125))) { me.filter() };
            if (keyCode == 8) { me.filter() }
        });

        // Sự kiện khi upload file
        $("#fileImage").on('change', this.showImageFromInput);

        // Khi ấn các thao tác chuyển page
        $('#btnFirstPage').on('click', this.btnFirstPageOnClick.bind(this));
        $('#btnPrePage').on('click', this.btnPrePageOnClick.bind(this));
        $('#btnNextPage').on('click', this.btnNextPageOnClick.bind(this));
        $('#btnEndPage').on('click', this.btnEndPageOnClick.bind(this));
        $("#refresh").on("click", this.loadData)


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

                // trường hợp thêm nhân viên mới
                case Enum.FormMode.Add:
                    this.FormMode = Enum.FormMode.Add;
                    this.btnAddOnClick();
                    break;

                // trường hợp nhân bản thông tin nhân viên
                case Enum.FormMode.Duplicate:
                    this.btnDuplicateOnClick();
                    break;

                // trường hợp chỉnh sửa thông tin nhân viên
                case Enum.FormMode.Edit:
                    this.FormMode = Enum.FormMode.Edit;
                    this.btnEditOnClick();
                    break;

                // trường hợp xóa nhân viên khỏi bảng
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
        console.log("EmployeeJS -> btnAddOnClick -> btnAddOnClick")
        //Show dialog
        $("#formDialogDetail").show();
        // Focus vào ô input đầu tiên của dialog
        $('#txtEmployeeCode').focus();
        // Mã nhân viên = mã nhân viên lớn nhất hiện tại + 1
        $('#txtStaffCode').val(commonJS.formatCode(maxCode));
    }

    /**
     * Sự kiện nhân bản một nhân viên
     * @param {any} sender
     * @author LTTUAN (29/07/2020) 
     */
    btnDuplicateOnClick(sender) {
        console.log("EmployeeJS -> btnDuplicateOnClick -> btnDuplicateOnClick");
        try {
            //lấy thông tin đối tượng nhân viên
            var rowSelected = $(".row-selected");
            var employeeId = rowSelected.data("employeeId");
            if (rowSelected) {
                //lấy dữ liệu từ api
                $.ajax({
                    url: "/api/v1/Employees/" + employeeId,
                    method: "GET",
                    data: {},
                    dataType: "json",
                    contentType: "application/json",
                }).done(function (res) {
                    var employeeDupicate = {
                        employeeCode: res.employeeCode,
                        employeeName: res.employeeName,
                        birthday: res.birthday,
                        phoneNumber: res.phoneNumber,
                        email: res.email,
                        debitNumber: res.debitNumber,
                        gender: res.gender,
                        idCard: res.idCard,
                        givenDate: res.givenDate,
                        givenPlace: res.givenPlace,
                        position: res.position,
                        department: res.department,
                        salary: res.salary,
                        startDate: res.startDate,
                        status: res.status,
                        //employeeAvatar: "asset\\images\\avatardefault.png"
                    };
                    console.log(res),
                        $.ajax({
                            url: "/api/v1/Employees",
                            method: "POST",
                            data: JSON.stringify(employeeDupicate),
                            dataType: "json",
                            contentType: "application/json",
                        }).done(function (res) {
                            alert("Nhân bản thành công");
                            me.loadData();
                        }).fail(function (res) {
                            alert("Nhân bản không thành công 1")
                        })
                }).fail(function (res) {
                    alert("Bạn chưa chọn nhân viên để nhân bản")
                })

            } else {
                alert("Bạn chưa chọn nhân viên để nhân bản")
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
        console.log("EmployeeJS -> btnAddOnClick -> btnEditOnClick")

        try {
            debugger
            if ($('.row-selected').length !== 0) {
                //lấy thông tin đối tượng nhân viên
                var rowSelected = $(".row-selected");
                var employeeId = rowSelected.data("employeeId");

                //lấy dữ liệu từ api
                $.ajax({
                    url: "/api/v1/Employees/" + employeeId,
                    method: "GET",
                    data: {},
                    dataType: "json",
                    contentType: "application/json",
                }).done(function (res) {
                    $.each(res, function (index, item) {
                        //bind dữ liệu vào dialog
                        $('#txtEmployeeCode').val(res.employeeCode);
                        $('#txtEmployeeName').val(res.employeeName);
                        $('#dtBirthday').val(commonJS.formatDateToBind(new Date(res.birthday)));
                        $('#txtPhoneNumber').val(res.phoneNumber);
                        $('#txtEmail').val(res.email);
                        $('#selectGender').val(res.gender);
                        $('#dtDateOfIssue').val(commonJS.formatDateToBind(new Date(res.givenDate)));
                        $('#selectStatusJob').val(res.status);
                        $('#txtIdentificationCard').val(res.idCard);
                        //$('#avatar').val(res.employeeAvatar);
                        $('#txtPlaceOfIssue').val(res.givenPlace);
                        $('#selectPosition').val(res.position);
                        $('#selectDepartment').val(res.department);
                        $('#txtEmployeeTaxCode').val(res.debitNumber);
                        $('#dtJoinDate').val(commonJS.formatDateToBind(new Date(res.createdDate)));
                        $('#txtSalary').val(commonJS.formatMoney(res['salary']));

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
        try {
            //action = hành động xóa
            // action = sender.data;
            // Nếu tìm thấy row có class là row-selected
            if ($('.row-selected').length !== 0) {
                //// Gán tên nhân viên vào warning-box
                //$('#staff-name').html($('.row-selected').find('td:eq(1)').text());

                // Show ra warning-box
                $('#warning-box').show();
            }
            debugger
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Khi ấn nút đóng đồng ý xóa
     * CreatedBy: LTTUAN (10/08/2020)
     * @param {any} sender
     */
    deleteStaff(sender) {
        try {

            // Đóng cửa số warning-box
            $('#warning-box').hide();

            //Nếu thấy row có class là row-selected
            if ($(".row-selected").length !== 0) {
                debugger
                $.ajax({
                    url: "/api/v1/Employees/" + $(".row-selected").data('employeeId'),
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
     * Khi ấn nút đóng warning
     * CreatedBy: LTTUAN (10/08/2020)
     * @param {any} sender
     */
    notDeleteStaff(sender) {
        try {
            // Ẩn ra warning-box
            $('#warning-box').hide();
            me.loadData();
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Sự kiện khi click chọn 1 dòng trong table
     * CreatedBy: LTTUAN (29/07/2020)
     */
    rowOnClick() {
        console.log("EmployeeJS -> rowOnClick -> rowOnClick")
        //thêm class row-selected vào những dòng được chọn
        this.classList.toggle("row-selected");
        //loại bỏ class row-selected khỏi các dùng
        $(this).siblings().removeClass("row-selected");
        var selectedEmployee = $(".row-selected");
        if (selectedEmployee.length) { $("#btnDuplicate, #btnEdit, #btnDelete").attr("disabled", false); } else {
            $("#btnDuplicate, #btnEdit, #btnDelete").attr("disabled", true);
        }
    }

    /**
     * Thực hiện load dữ liệu vào trang
     * author: LTTuan(27/07/2020)
     */
    loadData() {
        console.log("EmployeeJS -> loadData -> loadData")
        try {
            //làm trống table
            $('#tbListEmployee tbody').empty();
debugger
            // Lấy số dòng trên một trang
            currentPage = $("#inpPage").val();
            // Lấy số trang hiện tại
            recordPerPage = $("#recordPerPage").val();
            //gọi ajax lấy dữ liệu với phương thức get
            $.ajax({
                url: "/api/v1/Employees/" + currentPage + "/" + recordPerPage,
                method: "GET",
                data: {},
                dataType: "json",
                contentType: "application/json",
            }).done(function (res) {

                //Đọc dũ liệu và gen dữ liệu từng nhân viên vào html
                $.each(res, function (index, item) {
                    var employeeInfoHTML = $(`<tr>
                                <td>`+ item['employeeCode'] + `</td>
                                <td>`+ item['employeeName'] + `</td>
                                <td>`+ item['gender'] + `</td>
                                <td>`+ commonJS.formatDate(new Date(item['birthday'])) + `</td>
                                <td>`+ item['phoneNumber'] + `</td>
                                <td>`+ item['email'] + `</td>
                                <td>`+ item['position'] + `</td>
                                <td>`+ item['department'] + `</td>
                                <td>`+ commonJS.formatMoney(item['salary']) + `</td>
                                <td>`+ item['status'] + `</td>
                            </tr>`);
                    employeeInfoHTML.data("idCard", item.idCard);
                    employeeInfoHTML.data("givenDate", item.givenDate);
                    employeeInfoHTML.data("givenPlace", item.givenPlace);
                    employeeInfoHTML.data("debitNumber", item.debitNumber);
                    employeeInfoHTML.data("startDate", item.startDate);
                    employeeInfoHTML.data("employeeAvatar", item.employeeAvatar);
                    employeeInfoHTML.data("employeeId", item.employeeId);

                    $('#tbListEmployee tbody').append(employeeInfoHTML);
                });
                me.updatePadding();
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
        console.log("EmployeeJS -> saveData -> saveData");
        console.log("EmployeeJS -> saveData -> FormMode ", me.FormMode);

        debugger
        try {
            //Khởi tạo các biến 
            var employeeCode = "",
                employeeName = "",
                birthday = "",
                phoneNumber = "",
                email = "",
                debitNumber = "",
                gender = "",
                idCard = "",
                givenDate = "",
                givenPlace = "",
                position = "",
                department = "",
                salary = "",
                startDate = "",
                status = "",
                //employeeAvatar = "asset\\images\\avatardefault.png"

                // Lấy dữ liệu được nhập từ các input:
                employeeCode = $("#txtEmployeeCode").val();
            employeeName = $("#txtEmployeeName").val();
            birthday = new Date($("#dtBirthday").val());
            phoneNumber = $("#txtPhoneNumber").val();
            email = $("#txtEmail").val();
            debitNumber = $("#txtEmployeeTaxCode").val();
            gender = $('#selectGender').val();
            givenDate = new Date($('#dtDateOfIssue').val());
            phoneNumber = $('#txtPhoneNumber').val();
            idCard = $('#txtIdentificationCard').val();
            givenPlace = $('#txtPlaceOfIssue').val();
            position = $('#selectPosition').val();
            department = $('#selectDepartment').val();
            startDate = new Date($('#dtJoinDate').val());
            salary = Number($('#txtSalary').val());
            // employeeAvatar
            status = $('#selectStatusJob').val();




            // Kiểm tra trống trường mã nhân viên
            if (!employeeCode) {
                alert("Trường Mã nhân viên không được để trống!");
                return false;

                // Kiểm tra trống trường tên nhân viên
            } else if (!employeeName) {
                alert("Trường Tên nhân viên không được để trống!");
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
            } else if (!commonJS.validateEmail(email)) {
                alert("Trường email đã nhập không hợp lệ!");
                return false;
            } else {
                debugger
                if (me.FormMode == Enum.FormMode.Add) {
                    // Từ các dữ liệu thu thập được thì build thành object nhân viên (employee)
                    var employeeAdd = {
                        employeeCode: employeeCode,
                        employeeName: employeeName,
                        birthday: birthday,
                        phoneNumber: phoneNumber,
                        email: email,
                        debitNumber: debitNumber,
                        gender: gender,
                        idCard: idCard,
                        givenDate: givenDate,
                        givenPlace: givenPlace,
                        position: position,
                        department: department,
                        salary: salary,
                        startDate: startDate,
                        status: status,
                        //employeeAvatar: "asset\\images\\avatardefault.png"
                    };
                    //Nếu form là form nhập mới
                    console.log("EmployeeJS -> saveData -> action")
                    //thêm phần tử vào cuối mảng
                    $.ajax({
                        url: "/api/v1/Employees/",
                        method: "POST",
                        data: JSON.stringify(employeeAdd),
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
                    var employeeId = rowSelected.data("employeeId")
                    var employeeEdit = {
                        employeeId: employeeId,
                        employeeCode: employeeCode,
                        employeeName: employeeName,
                        birthday: birthday,
                        phoneNumber: phoneNumber,
                        email: email,
                        debitNumber: debitNumber,
                        gender: gender,
                        idCard: idCard,
                        givenDate: givenDate,
                        givenPlace: givenPlace,
                        position: position,
                        department: department,
                        salary: salary,
                        startDate: startDate,
                        status: status,
                        //employeeAvatar: "asset\\images\\avatardefault.png"
                    };
                    debugger
                    $.ajax({
                        url: "/api/v1/Employees/" + employeeEdit.employeeId,
                        method: "PUT",
                        data: JSON.stringify(employeeEdit),
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
        console.log("EmployeeJS -> resetDialog -> resetDialog")


        $('#txtEmployeeCode').val("");
        $('#txtEmployeeName').val("");
        $('#dtBirthday').val("");
        $('#txtPhoneNumber').val("");
        $('#txtEmail').val("");
        $('#selectGender').val("");
        $('#dtDateOfIssue').val("");
        $('#selectStatusJob').val("");
        $('#txtIdentificationCard').val("");
        //$('#avatar').val(res.employeeAvatar);
        $('#txtPlaceOfIssue').val("");
        $('#selectPosition').val("");
        $('#selectDepartment').val("");
        $('#txtEmployeeTaxCode').val("");
        $('#dtJoinDate').val("");
        $('#txtSalary').val("");
        // $("#btnDuplicate, #btnEdit, #btnDelete").prop('disabled', true);
    }

    /**
    * Sự kiện khi click button đóng dưới footer của Dialog
    * CreatedBy: LTTUAN (24/07/2020)
    * */

    btnCloseOnClick() {
        console.log("EmployeeJS -> btnCloseOnClick -> btnCloseOnClick")
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
        console.log("EmployeeJS -> btnCloseHeaderOnClick -> btnCloseHeaderOnClick")
        //Hide dialog
        $("#formDialogDetail").hide();
        // Reset lại dialog  chuẩn bị cho lần nhập sau
        this.resetDialog();
    }

    /**
     * Sự kiện khi nhập vào các ô tìm kiếm
     * CreatedBy: LTTUAN(10/08/2020)
     */
    filter() {
        console.log("input keydown")

        // xử lý trong ajax

        $.ajax({
            url: "/api/v1/Employees",
            method: "GET",

        }).done(function (res) {
            debugger
            // lấy dữ liệu input filter
            var inpEmployeeCode = $("#inpEmployeeCode").val();
            var inpEmployeeName = $("#inpEmployeeName").val();
            var inpBirthday = $("#inpBirthday").val();
            var inpPhoneNumber = $("#inpPhoneNumber").val();
            var inpEmail = $("#inpEmail").val();
            var inpGender = $("#inpGender").val();
            var inpPosition = $("#inpPosition").val();
            var inpDepartment = $("#inpDepartment").val();
            var inpSalary = $("#inpSalary").val();
            var inpStatus = $("#inpStatus").val();


            // var is5FoodCheckBox = $("#is5FoodCheckBox")[0].checked;

            // làm trống table trước
            $("#tbListEmployee tbody").empty();
            // nếu dữ liệu hợp lệ thì tạo đối tượng
            $.each(res, function (index, item) {
                debugger
                if ((item.employeeCode.toLowerCase().includes(inpEmployeeCode.toLowerCase()) || inpEmployeeCode == "") &&
                    (item.employeeName.toLowerCase().includes(inpEmployeeName.toLowerCase()) || inpEmployeeName == "") &&
                    (item.phoneNumber.toLowerCase().includes(inpPhoneNumber.toLowerCase()) || inpPhoneNumber == "") &&
                    (item.email.toLowerCase().includes(inpEmail.toLowerCase()) || inpEmail == "") &&
                    (commonJS.formatDate(new Date(item['birthday'])).includes(inpBirthday) || inpBirthday == "")
                ) {


                    var employeeInfoHTML = $(`<tr>
                                    <td>`+ item['employeeCode'] + `</td>
                                    <td>`+ item['employeeName'] + `</td>
                                    <td>`+ item['gender'] + `</td>
                                    <td>`+ commonJS.formatDate(new Date(item['birthday'])) + `</td>
                                    <td>`+ item['phoneNumber'] + `</td>
                                    <td>`+ item['email'] + `</td>
                                    <td>`+ item['position'] + `</td>
                                    <td>`+ item['department'] + `</td>
                                    <td>`+ item['salary'] + `</td>
                                    <td>`+ item['status'] + `</td>
                                </tr>`);
                    employeeInfoHTML.data("idCard", item.idCard);
                    employeeInfoHTML.data("givenDate", item.givenDate);
                    employeeInfoHTML.data("givenPlace", item.givenPlace);
                    employeeInfoHTML.data("debitNumber", item.debitNumber);
                    employeeInfoHTML.data("startDate", item.startDate);
                    employeeInfoHTML.data("employeeAvatar", item.employeeAvatar);
                    employeeInfoHTML.data("employeeId", item.employeeId);

                    $('#tbListEmployee tbody').append(employeeInfoHTML);

                }
            });
            //thêm vào table
        }).fail(function (res) {

        })
    }



    /**
     * Hàm cập nhật sự thay đổi của phân trang
    
     */
    updatePadding() {
        //cập nhât tổng số bản ghi 
        var totalRecord;

        $.ajax({
            url: "/totalRecord",
            method: "GET",
            async: false,
            contentType: "application/json",
        }).done(function (res) {
            totalRecord = res;
        }).fail(function (res) {
            console.log("get totalRecord fail")
        });

        //cập nhập tổng số trang
        var totalPage;
        if (totalRecord % recordPerPage == 0) { totalPage = totalRecord / recordPerPage } else {
            totalPage = Math.floor(totalRecord / recordPerPage + 1)
        }
        //cập nhật số thứ tự bản ghi đầu trang 
        var firstRecordOfPage;
        firstRecordOfPage = (recordPerPage * (currentPage - 1)) + 1;
        //cập nhật số thứ tự bản ghi cuối trang
        var lastRecordOfPage;
        if (currentPage < totalPage) { lastRecordOfPage = (recordPerPage * currentPage) }
        else {
            lastRecordOfPage = totalRecord;
        }
        //cập nhật giá trị phân trang
        $("#inpPage").val(currentPage);
        $("#totalPage").text(totalPage);
        $("#totalRecord").text(totalRecord);
        $("#firstRecordOfPage").text(firstRecordOfPage);
        $("#lastRecordOfPage").text(lastRecordOfPage);
        $("#recordPerPage").val(recordPerPage);

    }

    /**
    * Sự kiện khi ấn nút quay về page đầu tiên
    * CreatedBy: LTTUAN (06/08/2020)
    * */
    btnFirstPageOnClick() {
        $("#inpPage").val(1);
        this.loadData();
    }

    /**
     * Sự kiện khi ấn nút quay về page trước
     * CreatedBy: LTTUAN (06/08/2020)
     * */
    btnPrePageOnClick() {
        if ($('#inpPage').val() > 1) {
            $("#inpPage").val(currentPage-1);
            this.loadData();
        }
    }

    /**
     * Sự kiện khi ấn nút chuyển qua page tiếp
     * CreatedBy: LTTUAN (06/08/2020)
     * */
    btnNextPageOnClick() {
        debugger
        if ($('#inpPage').val() < totalPage) {
            $("#inpPage").val(currentPage+1);
            this.loadData();
        }
    }

    /**
     * Sự kiện khi ấn nút chuyển qua page cuối cùng
     * CreatedBy: LTTUAN (06/08/2020)
     * */
    btnEndPageOnClick() {
        debugger
            $("#inpPage").val(totalPage);
            this.loadData();
    }

}