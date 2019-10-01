using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace DrillingRequisition
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            // Following is the sample code to bundle all the css files in the project         

            // The code to bundle other javascript files will also be similar to this 


            ScriptBundle ScriptBundle = new ScriptBundle("~/bundles/angular");


            //use Include() method to add all the script files with their paths 
            ScriptBundle.Include(
                                "~/Content/js/jquery-3.2.1.min.js",
                                "~/Content/js/jquery-ui.js",
                                "~/Content/js/angular.js",
                                "~/Content/js/angular.min.js",
                                "~/ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular-sanitize.js",
                                "~/Content/js/angular-animate.js",
                                "~/Content/js/angular-filter.js",
                                "~/Content/js/angular-route.js",
                                "~/Content/js/angular-ui/ui-bootstrap.js",
                                "~/Content/js/angular-ui/ui-bootstrap-tpls.min.js",
                                "~/Content/js/bootstrap.min.js",
                                 "~/Content/js/jquery-ui.js",
                                "~/Content/js/material.min.js",
                                "~/Content/js/bootstrap-notify.js",
                                 "~/Content/js/sweetalert.min.js",
                                "~/Content/js/material-dashboard.js"
                              );
            //Add the bundle into BundleCollection
            bundles.Add(ScriptBundle);
            bundles.Add(new StyleBundle("~/bundles/css").Include(
               "~/Content/css/bootstrap.min.css",
                "~/Content/css/jquery-ui.css",
               "~/Content/css/material-dashboard.css"));


            BundleTable.EnableOptimizations = true;
        }
    }
}