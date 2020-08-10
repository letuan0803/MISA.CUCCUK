using System;
using System.Collections.Generic;

namespace MISA.CukCuk.Models
{
    public partial class Employee
    {

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        public Employee()
        {
            EmployeeId = Guid.NewGuid();
        }

        public Guid EmployeeId { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? Birthday { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string IdCard { get; set; }
        public DateTime? GivenDate { get; set; }
        public string GivenPlace { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string DebitNumber { get; set; }
        public int? Salary { get; set; }
        public DateTime? StartDate { get; set; }
        public string Status { get; set; }
        public string EmployeeAvatar { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
