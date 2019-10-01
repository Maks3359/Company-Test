
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Mime;
using System.Web.Http;
using AttributeRouting.Web.Http.WebHost;
using AttributeRouting.Web.Http;
using DrillingRequisition.Models;
using System.Web;
using DrillingRequisition.Controllers;
using System.Threading.Tasks;

namespace DrillingRequisition
{
    public class DataRecordController : ApiController
    {
      
        // GET: /Default1/
        [HttpRoute("api/saveDR")]
        [HttpPost]
        public string SaveData([FromBody] MERGED_Data dr)
        {
            var userId = HttpContext.Current.Session["UserId"];
            DataAccess Dt = new DataAccess();
           
                return Dt.SaveData(dr);
           
        
        }
        [HttpRoute("api/updateDR")]
        [HttpPost]
        public string UpdateData([FromBody] MERGED_Data dr)
        {
            var userId = HttpContext.Current.Session["UserId"];
            DataAccess Dt = new DataAccess();
            
                return Dt.UpdateData(dr);
           
        }
        [HttpGet]
        [HttpRoute("api/GetAllDR")]
        public List<MERGED_Data> GetAllDR()
        {
            DataAccess Dt = new DataAccess();
            var userId = HttpContext.Current.Session["UserId"];
            var re = Request;
            var headers = re.Headers;
                return Dt.GetAllData();
           
        }
        [HttpGet]
        [HttpRoute("api/getAllProjectDetails")]
        public MERGED_Data getAllProjectDetails(double unitnm)
        {
          
            DataAccess Dt = new DataAccess();
          
                return Dt.getAllProjectDetails(unitnm);
    
        }
        [HttpGet]
        [HttpRoute("api/DeleteRecord")]
        public string DeleteRecord(double unitnm)
        {

            DataAccess Dt = new DataAccess();
            return Dt.DeleteRecord(unitnm);

        }
        [HttpGet]
        [HttpRoute("api/GetAllDRFilter")]
        public List<MERGED_Data> GetAllDRFilter(string PrNo)
        {
            var userId = HttpContext.Current.Session["UserId"];
            DataAccess Dt = new DataAccess();
                return Dt.GetAllDRFilter(PrNo);
           
        }
        

    }
}
