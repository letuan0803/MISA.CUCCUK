
var commonJS = {
    LanguageCode: "VI",
    /**
    * Hàm định dạng hiển thị tiền
    * @param {number} money
    * CreatedBy: LTTUAN (12/08/2020)
    */
    formatMoney(money) {
        try {
            return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        } catch (error) {
            return 0;
        }
    },

    /**
    * Hàm định dạng hiển thị tiền để bind dữ liệu
    * @param {number} money
    * CreatedBy: LTTUAN (12/08/2020)
    */
    formatMoneyToBind(money) {
        try {
            return money.replace(".","");
        } catch (error) {
            0
        }
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
        try {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            month = (month < 10) ? "0" + month : month;
            day = (day < 10) ? "0" + day : day;
            return day + "/" + month + "/" + year;
        } catch (error) {

        }

    },

    /**
     * Hàm định dạng ngày để bind dữ liệu vào dialog
     * @param {any} date
     */
    formatDateToBind(date) {
        try {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            month = (month < 10) ? "0" + month : month;
            day = (day < 10) ? "0" + day : day;
            return year + "-" + month + "-" + day;
        } catch (error) {

        }
    },

    /**
 * Hàm kiểm tra hợp lệ trường email
 * @param {any} email
 * CreateBy: LTTUAN (05/08/2020)
 */
    validateEmail(email) {
        try {
            const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        } catch (error) {

        }

    },


    /**
     * Hàm kiểm tra hợp lệ trường số điện thoại 
     * @param {any} phoneNumber số điện thoại
     * CreateBy: LTTUAN (05/08/2020)
     */
    validatePhone(phoneNumber) {
        try {
            return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phoneNumber);
        } catch (error) {

        }

    },

    /**
 * Hàm trả về mã nhân viên lớn nhất + 1
 * @param {any} maxCode
 */
    formatCode(maxCode) {
        try {
            tmp = (maxCode + 1).toString()
            while (tmp.length < 5) {
                tmp = '0' + tmp;
            }
            return "NV" + tmp;
        } catch (error) {

        }

    },
    /**
     * Hàm trả về tiền dưới dạng string để gửi dữ liệu DB
     * @param {any} money
     */
    formatMoneyToBind(money) {
        try {
            return money.replace(/[.]/g, "");
        } catch (error) {

        }

    },

    /**
     * Hàm trả về link ảnh có thể bind được để hiển thị
     * @param {any} imageLink
     */
    formatImageLink(imageLink) {
        try {
            var startLink = imageLink.indexOf("\\content");
            imageLink = imageLink.replace(/[\\]/g, "/");
            return imageLink.substr(startLink, imageLink.length - 1);
        } catch (error) {

        }

    }
}