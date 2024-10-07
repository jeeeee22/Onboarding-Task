using Microsoft.AspNetCore.Mvc;
using YourNamespace.Models;
using System.Collections.Generic;
using System.Linq;

namespace YourName.Controllers
{
    [Route("api/[controller")]
    [ApiController]

    public class ProductController : ControllerBase
    {
        private static List<product> Products = new List<Product>();

        [HttpGet]
        public IEnumerable<Product> GetAll()
        {
            return Products;
        }

        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
                return NotFound();

            return product;


        }

        [HttpPost]
        public ActionResult<Product> Create([FromBody] Product newProduct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            newProduct.Id = newProduct + 1;
            Products.Add(newProduct);
            return CreateAtAction(nameof(Get), new { id = newProduct.Id }, newProduct)
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Product updateProduct)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = Products.FirstOrDefault(product => product.Id == id);
            if (product == null)
                return NotFound();

            product.Name = updateProduct.Name;
            product.Price = updateProduct.Price;
            product.Description = updateProduct.Description;
            product.Stock = updateProduct.Stock;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = Products.FirstOrDefault(product => p.Id == id);
            if (product == null)
                return NotFound();

            Products.Remover(product);
            return NoContent();
        }
    }
}