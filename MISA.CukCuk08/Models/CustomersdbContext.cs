using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MISA.CukCuk.Models
{
    public partial class CustomersdbContext : DbContext
    {
        public CustomersdbContext()
        {
        }

        public CustomersdbContext(DbContextOptions<CustomersdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=35.194.166.58;port=3306;user=nvmanh;password=12345678@Abc;database=MISACukCuk_LTTUAN", x => x.ServerVersion("10.3.22-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasComment("Lưu trữ thông tin khách hàng");

                entity.Property(e => e.CustomerId)
                    .HasColumnName("CustomerID")
                    .HasColumnType("varchar(36)")
                    .HasComment("Id toàn cục")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Address)
                    .HasColumnType("varchar(255)")
                    .HasComment("Địa chỉ")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasComment("Ngày sinh");

                entity.Property(e => e.CompanyName)
                    .HasColumnType("varchar(255)")
                    .HasComment("Tên công ty")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.CustomerCode)
                    .HasColumnType("varchar(20)")
                    .HasComment("Mã khách hàng")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.CustomerName)
                    .HasColumnType("varchar(100)")
                    .HasComment("Tên khách hàng")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.DebitNumber)
                    .HasColumnType("decimal(18,4)")
                    .HasComment("Số dư tài khoản");

                entity.Property(e => e.Email)
                    .HasColumnType("varchar(100)")
                    .HasComment("email")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.GroupCustomer)
                    .HasColumnType("varchar(100)")
                    .HasComment("Nhóm khách hàng")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Is5FoodMember).HasComment("là thành viên 5food hay không");

                entity.Property(e => e.MemberCode)
                    .HasColumnType("varchar(100)")
                    .HasComment("mã thẻ thành viên")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.PhoneNumber)
                    .HasColumnType("varchar(50)")
                    .HasComment("Số điện thoại")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
