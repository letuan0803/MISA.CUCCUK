using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MISA.CukCuk.Models;

namespace MISA.CukCuk.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeedbContext _context;

        public EmployeesController(EmployeedbContext context)
        {
            _context = context;
        }
        /// <summary>
        /// hàm lấy tât cả nhân viên
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <returns></returns>
        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employee.Take(20).ToListAsync();
        }

        /// <summary>
        /// hàm lấy nhân viên theo id
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        /// <summary>
        /// Hàm lấy  bản ghi theo trang hiện tại và số bản ghi trên mỗi trang
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="recordPerPage"></param>
        /// <returns></returns>
        // GET api/user/firstname/lastname/address
        [HttpGet("{currentPage}/{recordPerPage}")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee(int currentPage, int recordPerPage)
        {
            var employee = await _context.Employee.Skip(recordPerPage*currentPage-1).Take(recordPerPage).ToListAsync();

            return employee;
        }

        /// <summary>
        /// Hàm lấy  tổng số bản ghi
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="recordPerPage"></param>
        /// <returns></returns>
        // GET api/user/firstname/lastname/address
        [HttpGet()]
        [Route("/totalRecord")]
        public int GetTotalRecord()
        {
            var totalRecord =  _context.Employee.Count();

            return totalRecord;
        }

        /// <summary>
        /// hàm cập nhật nhân viên
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="id"></param>
        /// <param name="employee"></param>
        /// <returns></returns>
        // PUT: api/Employees/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(Guid id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Hàm thêm mới nhân viên
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        // POST: api/Employees
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.EmployeeId }, employee);
        }

        /// <summary>
        /// Hàm xóa nhân viên
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(Guid id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        /// <summary>
        /// hàm kiểm tra có trùng lặp không
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool EmployeeExists(Guid id)
        {
            return _context.Employee.Any(e => e.EmployeeId == id);
        }
    }
}
