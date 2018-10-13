﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ReactToolbox2
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.RouteExistingFiles = true;
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            /*
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                "404-PageNotFound",
                "{*url}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            */

            routes.MapRoute(
                "react-router",
                "{*url}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}