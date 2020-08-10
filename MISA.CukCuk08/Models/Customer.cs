using System;
using System.Collections.Generic;

namespace MISA.CukCuk.Models
{
    public partial class Customer
    {
        #region "Constructor"

        /// <summary>
        /// Hàm khởi tạo
        /// </summary>
        public Customer()
        {
            CustomerId = Guid.NewGuid();
        }

        #endregion
        public Guid CustomerId { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string MemberCode { get; set; }
        public string GroupCustomer { get; set; }
        public string CompanyName { get; set; }
        public decimal? DebitNumber { get; set; }
        public DateTime? Birthday { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public bool? Is5FoodMember { get; set; }
    }
}
