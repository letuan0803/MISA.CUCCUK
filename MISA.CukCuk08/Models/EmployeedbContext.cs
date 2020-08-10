using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MISA.CukCuk.Models
{
    public partial class EmployeedbContext : DbContext
    {
        public EmployeedbContext()
        {
        }

        public EmployeedbContext(DbContextOptions<EmployeedbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<EfmigrationsHistory> EfmigrationsHistory { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }

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

            modelBuilder.Entity<EfmigrationsHistory>(entity =>
            {
                entity.HasKey(e => e.MigrationId)
                    .HasName("PRIMARY");

                entity.ToTable("__EFMigrationsHistory");

                entity.Property(e => e.MigrationId)
                    .HasColumnType("varchar(95)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.ProductVersion)
                    .IsRequired()
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasComment("Bảng nhân viên");

                entity.HasIndex(e => e.EmployeeId)
                    .HasName("EmployeeId")
                    .IsUnique();

                entity.Property(e => e.EmployeeId)
                    .HasColumnType("varchar(36)")
                    .HasComment("ID nhân viên")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Birthday)
                    .HasColumnType("date")
                    .HasComment("Ngày sinh");

                entity.Property(e => e.CreatedDate)
                    .HasColumnType("datetime")
                    .HasComment("Ngày tạo dữ liệu");

                entity.Property(e => e.DebitNumber)
                    .HasColumnType("varchar(20)")
                    .HasComment("Mã số thuế")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Department)
                    .HasColumnType("varchar(255)")
                    .HasComment("Phòng ban")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnType("varchar(100)")
                    .HasComment("Email")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.EmployeeAvatar)
                    .HasColumnType("varchar(255)")
                    .HasComment("Ảnh nhân viên")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.EmployeeCode)
                    .IsRequired()
                    .HasColumnType("varchar(20)")
                    .HasComment("Mã nhân viên")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.EmployeeName)
                    .IsRequired()
                    .HasColumnType("varchar(100)")
                    .HasComment("Tên nhân viên")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Gender)
                    .HasColumnType("varchar(100)")
                    .HasComment("Giới tính")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.GivenDate)
                    .HasColumnType("date")
                    .HasComment("Ngày cấp");

                entity.Property(e => e.GivenPlace)
                    .HasColumnType("varchar(255)")
                    .HasComment("Nơi cấp")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.IdCard)
                    .HasColumnType("varchar(20)")
                    .HasComment("Chứng minh thư")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.ModifiedDate)
                    .HasColumnType("datetime")
                    .HasComment("Ngày sửa đổi dữ liệu");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnType("varchar(20)")
                    .HasComment("Số điện thoại")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Position)
                    .HasColumnType("varchar(255)")
                    .HasComment("Vị trí")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Salary)
                    .HasColumnType("int(20)")
                    .HasComment("Lương");

                entity.Property(e => e.StartDate)
                    .HasColumnType("date")
                    .HasComment("Ngày bắt đầu");

                entity.Property(e => e.Status)
                    .HasColumnType("varchar(255)")
                    .HasComment("Tình trạng")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
