using DrillingRequisition.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace DrillingRequisition.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Create()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult Edit(string UNITID)
        {
           
               // ViewBag.SessionId = Session["UserId"].ToString(); 
                ViewBag.PrNo = UNITID;
                return View();
           
        }
       
    }
}
