
var commonJS = {
    LanguageCode: "VI",
    /**
    * Hàm định dạng hiển thị tiền
    * @param {number} money
    * CreatedBy: NVMANH (20/07/2020)
    */
    formatMoney(money) {
        return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    },

    /**
    * Tạo chuỗi HTML checkbox tương ứng với true/false
    * @param {boolean} value true: checked
    * CreatedBy: NVMANH (20/07/2020)
    */


    buildCheckBoxByValue(value) {
        var checkBoxHTML = $(`<input type="checkbox" />`);
        if (value) {
            checkBoxHTML = checkBoxHTML.attr("checked", true);
        }
        return checkBoxHTML[0].outerHTML;
    },

    /**
     * Hàm định dạng ngày hiển thị (dd/MM/yyyy)
     * @param {any} date
     */
    formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        month = (month < 10) ? "0" + month : month;
        day = (day < 10) ? "0" + day : day;
        return day + "/" + month + "/" + year;
    },

    /**
     * Hàm định dạng ngày để bind dữ liệu vào dialog
     * @param {any} date
     */
    formatDateToBind(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        month = (month < 10) ? "0" + month : month;
        day = (day < 10) ? "0" + day : day;
        return year + "-" + month + "-" + day;
    },

        /**
     * Hàm kiểm tra hợp lệ trường email
     * @param {any} email
     * CreateBy: LTTUAN (05/08/2020)
     */
    validateEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },


    /**
     * Hàm kiểm tra hợp lệ trường số điện thoại 
     * @param {any} phoneNumber số điện thoại
     * CreateBy: LTTUAN (05/08/2020)
     */
    validatePhone(phoneNumber) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phoneNumber);
    },

        /**
     * Hàm trả về mã nhân viên lớn nhất + 1
     * @param {any} maxCode
     */
    formatCode(maxCode) {
        var tmp = (parseInt(maxCode.substr(2, 5)) + 1).toString();
        while (tmp.length < 5) {
            tmp = '0' + tmp;
        }
        return "NV" + tmp;
    },
    /**
     * Hàm trả về tiền dưới dạng string để gửi dữ liệu DB
     * @param {any} money
     */
    formatMoneyToBind(money) {
        return money.replace(/[.]/g, "");
    },

    /**
     * Hàm trả về link ảnh có thể bind được để hiển thị
     * @param {any} imageLink
     */
    formatImageLink(imageLink) {
        var startLink = imageLink.indexOf("\\content");
        imageLink = imageLink.replace(/[\\]/g, "/");
        return imageLink.substr(startLink, imageLink.length - 1);
    }
}