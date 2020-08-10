using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MISA.CukCuk.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomersdbContext _context;

        public CustomersController(CustomersdbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Hàm láy tất cả khách hàng
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <returns></returns>
        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer()
        {
            return await _context.Customer.ToListAsync();
        }


        /// <summary>
        /// Hàm lấy tất cả khách hàng theo id
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="customerId"></param>
        /// <returns></returns>
        // GET: api/Customers/5
        [HttpGet("{customerId}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid customerId)
        {
            var customer = await _context.Customer.FindAsync(customerId);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        /// <summary>
        /// hàm thay thế khách hàng
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="CustomerId"></param>
        /// <param name="customer"></param>
        /// <returns></returns>
        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{CustomerId}")]
        public async Task<IActionResult> PutCustomer(Guid CustomerId, [FromBody]Customer customer)
        {
            if (CustomerId != customer.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(CustomerId))
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
        /// hàm thêm mới khách hàng
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customer.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.CustomerId }, customer);
        }

        /// <summary>
        /// Hàm xóa khách hàng
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="CustomerId"></param>
        /// <returns></returns>
        // DELETE: api/Customers/5
        [HttpDelete("{CustomerId}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(Guid CustomerId)
        {
            var customer = await _context.Customer.FindAsync(CustomerId);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(Guid CustomerId)
        {
            return _context.Customer.Any(e => e.CustomerId == CustomerId);
        }
        /// <summary>
        /// Hàm thực hiện việc upload file 
        /// createdby: LTTUAN (10/08/2020)
        /// </summary>
        /// <param name="image"></param>
        /// <param name="imgname"></param>
        /// <returns></returns>
        [HttpPost("uploadimg/{imgname}")]
        public async Task<IActionResult> ImageUpload(IFormFile image, String imgname)
        {
            String[] arrTemp = image.FileName.Split('.');
            imgname = imgname + "." + arrTemp[arrTemp.Length - 1];
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "upload", imgname);
            using (System.IO.Stream stream = new FileStream(path, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
            return NoContent();

        }
    }
}
