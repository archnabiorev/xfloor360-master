angular.module('floorxApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/favorites.html',
    "<section class=\"main fullwidth background-container counter-header\"> <div class=\"container-fluid\"> <!-- /***\n" +
    "\n" +
    "Profile Starts\n" +
    "\n" +
    "****/ --> <div class=\"row profile\"> <div class=\"col-md-3\"> <div class=\"profile-sidebar\"> <!-- SIDEBAR USERPIC --> <div class=\"profile-userpic\"> <img src=\"{{user.photoURL}}\" class=\"img-responsive\" alt=\"\"> </div> <!-- END SIDEBAR USERPIC --> <!-- SIDEBAR USER TITLE --> <div class=\"profile-usertitle\"> <div class=\"profile-usertitle-name\"> {{user.displayName}} </div> <div class=\"profile-usertitle-job\"> User </div> </div> <!-- END SIDEBAR USER TITLE --> <!-- SIDEBAR BUTTONS --> <div class=\"profile-userbuttons hide\"> <button type=\"button\" class=\"btn btn-success btn-sm\"><i class=\"fa fa-heart\"></i> Favorite</button> <!-- <button type=\"button\" class=\"btn btn-danger btn-sm\">Message</button> --> </div> <!-- END SIDEBAR BUTTONS --> <!-- SIDEBAR MENU --> <div class=\"profile-usermenu\"> <ul class=\"nav\"> <li class=\"active\"> <a href=\"/#!/favorites\"> <i class=\"glyphicon glyphicon-heart\"></i> Favorites </a> </li> <li> <a href=\"/#!/profile\"> <i class=\"glyphicon glyphicon-pencil\"></i> Edit Profile </a> </li> </ul> </div> <!-- END MENU --> </div> </div> <div class=\"col-md-9\"> <div class=\"profile-content\"> <div class=\"page-heading text-center\"> <h2>My Favorites <span></span></h2> <p><small>Your favorite desings are listed here</small></p> </div> <div class=\"row\" ng-if=\"!loaded\"> <div class=\"col-xs-12\" style=\"text-align: center\"> Please wait, fetching data... </div> </div> <div class=\"row\" ng-if=\"loaded\"> <!--Left Column--> <div class=\"col-md-6\"> <div ng-repeat=\"(key ,fav) in favs\" class=\"row icon-block\"> <div class=\"col-lg-3 col-md-4 col-sm-4 featured-icon center\"> <a href=\"{{fav.image}}\" target=\"_blank\"> <img src=\"{{fav.image}}\" alt=\"Design Image\" class=\"img-responsive\"> </a> </div> <div class=\"col-lg-9 col-md-8 col-sm-8\"> <h3></h3> <p> Items : </p> <ul class=\"list-unstyled\"> <li ng-repeat=\"item in fav.items\"> <strong> {{item.category}} </strong> : {{item.label}} </li> </ul> </div> </div> </div> </div> </div> </div> </div> <!-- /**\n" +
    "\n" +
    "\t\tProfile End\n" +
    "\n" +
    "\t**/ --> </div></section>"
  );


  $templateCache.put('views/forgot.html',
    "<p>This is the forgot view.</p>"
  );


  $templateCache.put('views/main.html',
    "<section class=\"main fullwidth background-container\"> <div class=\"container-fluid\"> <div class=\"row\"> <div class=\"col-sm-8 col-md-9 col-lg-10 widthDesk\"> <div class=\"row\"> <div id=\"sliderJquery\" class=\"hide\"> <nav class=\"navbar navbar-ct-blue custom-navbar\" role=\"navigation\" id=\"menus\"> <div class=\"navbar-header\"> <!-- \n" +
    "                      ############# Mobile Button ###############\n" +
    "\n" +
    "                        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "                       <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                       <span class=\"icon-bar\"></span>\n" +
    "                       <span class=\"icon-bar\"></span>\n" +
    "                       <span class=\"icon-bar\"></span>\n" +
    "                     </button> --> </div> <div class=\"navbar-collapse\" id=\"bs-example-navbar-collapse-1\"> </div><!-- /.navbar-collapse --> </nav> <!--  end navbar --> </div> <div class=\"clearfix\"></div> </div> <div class=\"clearfix\"></div> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"main-stage text-center\" id=\"some_id\"> <!-- Begin:row  --> <div id=\"right-wrapper\" class=\"row\"> </div> <!-- End:row  --> <!-- Begin:Row for interactive --> <div id=\"interactive-pre-wrapper\" class=\"row\" style=\"display:none\"> </div> <!-- End:Row for interactive --> </div> </div> </div> </div> <div class=\"col-sm-4 col-md-3 col-lg-2 dark-bg viewhieght\" id=\"MobileOPtions\"> <div class=\"brand-text height52 padding10 hide\"> <h2 class=\"text-uppercase text-center\">Aspen</h2> </div> <!-- <div class=\"brand-sub-text\">\n" +
    "              <h3 class=\"text-uppercase text-center\" id=\"elevation-name\"></h3>\n" +
    "            </div> --> <div class=\"row\"> <ul class=\"nav nav-tabs custom-tabs\"> <li class=\"active\"><a id=\"elevation-tab\" data-toggle=\"tab\" href=\"#home\" onclick=\"return false\"><i class=\"fa fa-home\" aria-hidden=\"true\"></i> <span class=\"hidden-xs hide\">Elevation</span></a></li> <li><a id=\"floor-tab\" onclick=\"return false\" data-toggle=\"tab\" href=\"#menu1\"><i class=\"fa fa-object-group\" aria-hidden=\"true\"></i> <span class=\"hidden-xs hide\">Floor</span></a></li> <!-- <li><a data-toggle=\"tab\" href=\"#menu2\"><i class=\"fa fa-th-large\" aria-hidden=\"true\"></i> Options</a></li>\n" +
    "                  <li><a data-toggle=\"tab\" href=\"#menu3\"><i class=\"fa fa-bed\" aria-hidden=\"true\"></i> Furniture</a></li> --> <li><a data-toggle=\"tab\" id=\"notes-tab\" onclick=\"return false\" href=\"#menu4\"><i class=\"fa fa-pencil-square\" aria-hidden=\"true\"></i><span class=\"hidden-xs hide\"> Notes</span></a></li> </ul> <div class=\"tab-content col-scroll\"> <div id=\"home\" class=\"tab-pane fade in active\"> <div class=\"brand-text\"> <h3>Elevation <span class=\"visible-xs\" id=\"close\">X</span></h3> </div> <div class=\"outter-wrapper\"> <div id=\"elevation-wrapper\"> </div> </div> </div> <div id=\"menu1\" class=\"tab-pane fade\"> <div class=\"brand-text\"> <h3> Floor <span class=\"visible-xs\" id=\"close\">x</span></h3> </div> <div class=\"outter-wrapper-y\"> <ul class=\"e-variations\" role=\"tablist\" id=\"floorvars-wrapper\" aria-multiselectable=\"true\"> </ul> </div> <div class=\"clearfix\"></div> <div class=\"desc-box hide\"> <div class=\"desc-box-title\"> View The Floor </div> <div class=\"desc-box-content\"> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div> </div> </div> <div id=\"menu4\" class=\"tab-pane fade\"> <div class=\"brand-text\"> <h3>Note <span class=\"visible-xs\" id=\"close\">X</span></h3> </div> <form class=\"notes\" id=\"notes-form\"> <textarea name=\"textarea\" id=\"note-textarea\" cols=\"30\" rows=\"6\" class=\"form-control custom\" placeholder=\"Enter Message\" required></textarea> <input type=\"button\" id=\"clear-button\" class=\"pull-left btn btn-default btn-sm\" value=\"Clear\"> <input type=\"submit\" class=\"pull-right btn btn-success btn-sm\" value=\"Save\"> <div class=\"clearfix\"></div> </form> <!--    <div class=\"desc-box hide\">\n" +
    "                                      <div class=\"desc-box-title\">\n" +
    "                                        View The Floor\n" +
    "                                      </div>\n" +
    "                \n" +
    "                                      <div class=\"desc-box-content\">\n" +
    "                                     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n" +
    "                                      </div>\n" +
    "                      \n" +
    "                                    </div>  --> </div> </div> </div> </div> </div> </div></section> <footer id=\"footer-wrapper\" class=\"hidden-xs background-container\"> <div class=\"footer-center\"> <nav class=\"navbar\"> <div class=\"container-fluid\"> <div class=\"navbar-header rightborder\"> <div class=\"footer-icon\" href=\"#\"> <img src=\"images/assets/images/cooking.svg\" class=\"kitchen pull-left\" width=\"50\"> <span class=\"big-heading\" id=\"footer-home-name\">Bradly ACM House</span> <span class=\"sub-heading dullcolor\">Forbes Capretto Homes</span> </div> </div> <div class=\"deails-icons rightborder\"> <div class=\"f-icon\"> <img src=\"images/assets/icons/area.svg\"> <span class=\"titles\"><span id=\"footer-area\"></span> Sq. ft.</span> </div> <div class=\"f-icon\"> <img src=\"images/assets/icons/bed.svg\"> <span class=\"titles\"><span id=\"footer-beds\">2</span> Bedrooms</span> </div> <div class=\"f-icon\"> <img src=\"images/assets/icons/bath.svg\"> <span class=\"titles\"> <span id=\"footer-bath\">2</span> Bathrooms</span> </div> <div class=\"f-icon\"> <img src=\"images/assets/icons/garage.svg\"> <span class=\"titles\">1 Garage</span> </div> </div> <div class=\"price price-left hide\"> <span class=\"big-heading text-secondary\">$<span data-base-price=\"263000\" id=\"UpdatedPrice\">263,000</span></span> <span class=\"sub-heading\">$<span class=\"total-emi-counter\">4,521</span> / month</span> </div> <div class=\"price price-left mt6 hide\"> <div class=\"dropdown\"> <button class=\"round-btn dropdown-toggle\" type=\"button\" data-toggle=\"modal\" data-target=\"#MortgageModal\">Mortgage </button> </div> </div> <div class=\"price pull-right mt6\"> <div class=\"dropdown\"><a id=\"finish-moduleszed\" class=\"round-btn fill-secondary text-uppercase text-center pull-right\" onclick=\"swal( 'In Progress' , 'This module of the application is in development' , 'warning' )\"> Finish <i class=\"glyphicon glyphicon-menu-right\"></i> </a> <a class=\"round-btn fill-dull circlebtn hide\" href=\"#\"> <i class=\"glyphicon glyphicon-menu-left\"></i> </a> </div> </div> </div> </nav> </div> <div class=\"clearfix\"></div> </footer> <div class=\"modal fade\" id=\"MortgageModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"> <div class=\"modal-dialog\"> <div class=\"modal-content\"> <div class=\"modal-header\"> <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> <h4 class=\"modal-title\" id=\"myModalLabel\">Mortgage Calculator</h4> </div> <div class=\"modal-body\"> <div class=\"big-heading pricing text-center\"> <!-- <div class=\"\" id=\"mortgagePricing\"> $263,000 </div> --> </div> <div class=\"mort-content row\"> <div class=\"col-sm-7\"> <div class=\"details row\"> <div class=\"subtitle pricing\"> Down Payment </div> <div class=\"col-xs-4 pricebox\"> $<span id=\"pslider-value\"> 8956</span> </div> <div class=\"col-xs-8\"> <div class=\"pslider\" id=\"pslider\" data-min=\"0\" data-max=\"263000\" data-start=\"40000\" data-decimal=\"0\"></div> </div> </div> <div class=\"details row\"> <div class=\"subtitle pricing\"> Interest Rate </div> <div class=\"col-xs-4 pricebox\"> <span id=\"pslider1-value\"> 0.00</span>% </div> <div class=\"col-xs-8\"> <div class=\"pslider\" id=\"pslider1\" data-min=\"0\" data-max=\"20\" data-start=\"4\" data-decimal=\"2\"></div> </div> </div> <div class=\"details row\"> <div class=\"subtitle pricing\"> Loan Term </div> <div class=\"col-xs-4 pricebox\"> <span id=\"pslider2-value\"> 20</span> Year </div> <div class=\"col-xs-8\"> <div class=\"pslider\" id=\"pslider2\" data-min=\"0\" data-max=\"30\" data-start=\"5\" data-decimal=\"0\"></div> </div> </div> <!--  <div class=\"details row\">\n" +
    "                     <div class=\"subtitle pricing\"> Property Taxes </div>\n" +
    "                  \n" +
    "                    <div class=\"col-xs-4  pricebox\">\n" +
    "                       <span  id=\"pslider3-value\"> 1 </span>% \n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-8\">\n" +
    "                       <div class=\"pslider \" id=\"pslider3\"  data-min=\"00.00\" data-max=\"20.00\"></div>\n" +
    "                   </div>\n" +
    "                 </div>\n" +
    "                  --> <hr> </div> <div class=\"col-sm-5\"> <div class=\"img-container img-round\"> <img src=\"images/assets/images/Home.jpg\" class=\"img-responsive img-round\"> </div> <p>TOTAL PRICE OF HOME</p> <div class=\"big-heading\">$<span id=\"total-price-counter\" class=\"loanAmountCounter\">297,000</span></div> <table class=\"table\"> <tr> <td>Base Price</td> <td>$<span id=\"popup-base-price\">263,000</span> </td> <!-- <td><span id=\"loanTermCounter\">30</span> Year</td> --> </tr> <!-- <tr>\n" +
    "                      <td>Loan Amount</td>\n" +
    "                      <td>$<span class=\"loanAmountCounter\">297,000</span></td>\n" +
    "                    </tr> --> <tr> <td>Designs Selected</td> <td>$<span id=\"popup-options-selected\">0</span></td> </tr> </table> <!--\n" +
    "                  <table class=\"table\">\n" +
    "                    <tr>\n" +
    "                      <td>Principle & Interest </td>\n" +
    "                      <td>$ 1051</td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                      <td>Taxes & Insurance </td>\n" +
    "                      <td>$ 649</td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                      <td>PMI </td>\n" +
    "                      <td>$ 00</td>\n" +
    "                    </tr>\n" +
    "                  </table> --> <!--  <p>TOTAL</p> --> <p class=\"text-center\">Monthly Estimated Payment</p> <div class=\"big-heading\">$<span class=\"total-emi-counter\">17,000</span></div> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/pdfpage.html',
    "<div class=\"container-fluid\" style=\"margin-top:75px;padding-bottom:20px\"> <div class=\"row\"> <div class=\"col-sm-9\"> <h3> <span class=\"pull-right\">{{data.base.title}}</span> </h3> <img src=\"{{data.base.image}}\" alt=\"image\" class=\"img-responsive final-image\"> </div> <div class=\"col-sm-3\"> <h3>Congratulations</h3> <p><small>You've designed your new House</small></p> <div class=\"row\"> <div class=\"col-xs-12\"> <ul class=\"list-inline final-actions\"> <li> <div class=\"selection-wrapper\"> <i class=\"glyphicon glyphicon-grain\"></i> <p>Share</p> </div> </li> <li> <div class=\"selection-wrapper\"> <i class=\"glyphicon glyphicon-download-alt\"></i> <p>Downoad</p> </div> </li> <li onclick=\"window.location = '/#!/app/TEMPLATE_243c0323_9678_610f_801b_689d67b3595b'; window.location.reload()\"> <div class=\"selection-wrapper\"> <i class=\"glyphicon glyphicon-file\"></i> <p>New Design</p> </div> </li> <li> <div ng-if=\"authed\" class=\"selection-wrapper\" ng-click=\"addToFavorite()\"> <i class=\"glyphicon glyphicon-heart\"></i> <p>Favorite</p> </div> <div ng-if=\"!authed\" class=\"selection-wrapper\" data-toggle=\"modal\" data-target=\"#loginmodal\"> <i class=\"glyphicon glyphicon-heart\"></i> <p>Favorite</p> </div> </li> </ul> </div> </div> <div class=\"row\"> <div class=\"col-sm-12\"> <p class=\"selection-header\">Your Selection</p> <ul class=\"list-unstyled selected-wrapper\"> <li ng-repeat=\"(floor , module) in data.modules\"> <h5 class=\"selection-cat\"> {{floor}} </h5> <p class=\"selection-module\" ng-repeat=\"submodule in module\"> {{submodule.name}} <span class=\"pull-right\">${{submodule.price}}</span> <!-- <span>${{module.price}}</span> --> </p> </li> <li> <hr> </li> <li> <strong>Options Total</strong> <span class=\"pull-right\">${{itemsTotal}}</span> </li> <li> <strong>Base Price of Home</strong> <span class=\"pull-right\">${{ getFormattedCurrency(base) }}</span> </li> <li> <strong>Total Cost</strong> <span class=\"pull-right\">${{ getFormattedCurrency(itemsTotal+base) }}</span> </li> </ul> </div> </div> </div> </div> <div class=\"row\">&emsp;</div> <div class=\"row\"> <div class=\"col-sm-9\"> <div class=\"row\" ng-repeat=\"(floor , module) in data.modules\"> <div class=\"col-sm-12\"> <h3> <span class=\"pull-right\">{{floor}}</span> </h3> <img src=\"{{module.extraInfo.image}}\" alt=\"{{floor}}\" class=\"img-responsive\"> </div> </div> <div class=\"row\"> <div class=\"col-sm-12\"> <div class=\"contact-box\"> <div class=\"row\"> <div class=\"col-xs-12 col-sm-6\"> <h4> Contact Detail </h4> </div> <div class=\"col-xs-12 col-sm-6\"> </div> </div> <div class=\"row\"> <div class=\"col-xs-12 col-sm-6\"> <p> Biorev LLC. </p> </div> <div class=\"col-xs-12 col-sm-6\"> Email info@biorev.us </div> </div> <div class=\"row\"> <div class=\"col-xs-12 col-sm-6\"> <p> Irving, TX, USA </p> </div> <div class=\"col-xs-12 col-sm-6\"> Tel +1 770-572-1828 </div> </div> <!-- <h4>\n" +
    "\t\t\t\t\t\t\t\t\tContact Detail\n" +
    "\t\t\t\t\t\t\t\t</h4>\n" +
    "\n" +
    "\t\t\t\t\t\t\t\t<p>\n" +
    "\t\t\t\t\t\t\t\t\tBiorev LLC.\n" +
    "\t\t\t\t\t\t\t\t</p>\n" +
    "\n" +
    "\t\t\t\t\t\t\t\t<p>\n" +
    "\t\t\t\t\t\t\t\t\t Irving, TX, USA\n" +
    "\t\t\t\t\t\t\t\t</p>\n" +
    "\n" +
    "\t\t\t\t\t\t\t\t<p>\n" +
    "\t\t\t\t\t\t\t\t\tEmail : info@biorev.us\n" +
    "\t\t\t\t\t\t\t\t</p>\n" +
    "\n" +
    "\t\t\t\t\t\t\t\t<p>\n" +
    "\t\t\t\t\t\t\t\t\tTel : +1 770-572-1828\n" +
    "\t\t\t\t\t\t\t\t</p>\t --> </div> </div> </div> </div> </div> </div>"
  );


  $templateCache.put('views/profile.html',
    "<section ng-if=\"!hasLoaded\" class=\"main fullwidth background-container\" style=\"text-align: center\"> Fetching User Information.... </section> <section id=\"user-profile-section\" ng-if=\"hasLoaded\" class=\"main fullwidth background-container counter-header\"> <!-- /***\n" +
    "\n" +
    "Profile Starts\n" +
    "\n" +
    "****/ --> <div class=\"row profile\"> <div class=\"col-md-3\"> <div class=\"profile-sidebar\"> <!-- SIDEBAR USERPIC --> <div class=\"profile-userpic\"> <img src=\"{{user.photoURL}}\" class=\"img-responsive\" alt=\"\"> </div> <!-- END SIDEBAR USERPIC --> <!-- SIDEBAR USER TITLE --> <div class=\"profile-usertitle\"> <div class=\"profile-usertitle-name\"> {{user.displayName}} </div> <div class=\"profile-usertitle-job\"> User </div> </div> <!-- END SIDEBAR USER TITLE --> <!-- SIDEBAR BUTTONS --> <div class=\"profile-userbuttons hide\"> <button type=\"button\" class=\"btn btn-success btn-sm\"><i class=\"fa fa-heart\"></i> Favorite</button> <!-- <button type=\"button\" class=\"btn btn-danger btn-sm\">Message</button> --> </div> <!-- END SIDEBAR BUTTONS --> <!-- SIDEBAR MENU --> <div class=\"profile-usermenu\"> <ul class=\"nav\"> <li class=\"\"> <a href=\"/#!/favorites\"> <i class=\"glyphicon glyphicon-heart\"></i> Favorites </a> </li> <li class=\"active\"> <a href=\"/#!/profile\"> <i class=\"glyphicon glyphicon-pencil\"></i> Edit Profile </a> </li> <li> <a ng-click=\"logout()\" href=\"#\"> <i class=\"glyphicon glyphicon-log-out\"></i> <span class=\"text-danger\">Logout</span> </a> </li> </ul> </div> <!-- END MENU --> </div> </div> <div class=\"col-md-9\"> <div class=\"profile-content\"> <div class=\"container-user bootstrap snippets\"> <div class=\"row\"> <div class=\"col-xs-12 col-sm-9\"> <form name=\"update_form\" class=\"form-horizontal\" ng-submit=\"update()\"> <input type=\"hidden\" name=\"uid\" value=\"{{user.uid}}\"> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4 class=\"panel-title\">User info</h4> </div> <div class=\"panel-body\"> <div class=\"form-group\"> <label class=\"col-sm-2 control-label\">Name</label> <div class=\"col-sm-10\"> <input type=\"text\" class=\"form-control\" value=\"{{user.displayName}}\" name=\"name\" required> </div> </div> <!-- <div class=\"form-group\">\n" +
    "                                        <label class=\"col-sm-2 control-label\">Location</label>\n" +
    "                                        <div class=\"col-sm-10\">\n" +
    "                                          <select class=\"form-control\">\n" +
    "                                            <option selected=\"\">Select country</option>\n" +
    "                                            <option>Belgium</option>\n" +
    "                                            <option>Canada</option>\n" +
    "                                            <option>Denmark</option>\n" +
    "                                            <option>Estonia</option>\n" +
    "                                            <option>France</option>\n" +
    "                                          </select>\n" +
    "                                        </div>\n" +
    "                                      </div> --> <div class=\"form-group\"> <label class=\"col-sm-2 control-label\">Company name</label> <div class=\"col-sm-10\"> <input type=\"text\" value=\"{{userData.company}}\" class=\"form-control\" name=\"company_name\"> </div> </div> <div class=\"form-group\"> <label class=\"col-sm-2 control-label\">Position</label> <div class=\"col-sm-10\"> <input type=\"text\" value=\"{{userData.position}}\" class=\"form-control\" name=\"position\"> </div> </div> </div> </div> <div class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4 class=\"panel-title\">Contact info</h4> </div> <div class=\"panel-body\"> <div class=\"form-group\"> <label class=\"col-sm-2 control-label\">Work number</label> <div class=\"col-sm-10\"> <input type=\"tel\" value=\"{{userData.work_number}}\" class=\"form-control\" name=\"work_number\"> </div> </div> <!-- <div class=\"form-group\">\n" +
    "                                        <label class=\"col-sm-2 control-label\">Mobile number</label>\n" +
    "                                        <div class=\"col-sm-10\">\n" +
    "                                          <input type=\"tel\" value=\"{{user.phoneNumber}}\" name=\"mobile_number\" class=\"form-control\">\n" +
    "                                        </div>\n" +
    "                                      </div> --> <div class=\"form-group\"> <label class=\"col-sm-2 control-label\">E-mail address</label> <div class=\"col-sm-10\"> <input type=\"email\" class=\"form-control\" value=\"{{user.email}}\" disabled> </div> </div> <div class=\"form-group\"> <label class=\"col-sm-2 control-label\">Work address</label> <div class=\"col-sm-10\"> <textarea rows=\"3\" class=\"form-control\" name=\"work_address\">{{userData.work_address}}</textarea> </div> </div> </div> </div> <div class=\"form-group\"> <div class=\"col-sm-12\"> <button type=\"submit\" class=\"btn btn-success\">Update</button> </div> </div> </form> <hr> <div ng-if=\"user.providerData[0].providerId == 'password'\" class=\"panel panel-default\"> <div class=\"panel-heading\"> <h4 class=\"panel-title\">Security</h4> </div> <div class=\"panel-body\"> <div class=\"form-group\"> <div class=\"col-sm-2\"> <label class=\"control-label\">New password</label> </div> <div class=\"col-sm-8\"> <input type=\"password\" class=\"form-control\" id=\"new-password\"> </div> <div class=\"col-sm-2\"> <button ng-click=\"update_password()\" class=\"btn btn-sm btn-danger\"> Update </button> </div> </div> </div> </div> </div> <div class=\"col-xs-12 col-sm-3\"> <label for=\"choose-now\" class=\"profile-pic\"> <div class=\"profile-pic\" style=\"background-image: url('{{user.photoURL}}')\"> <span class=\"glyphicon glyphicon-camera\"></span> <span>Change Image</span> </div> <input type=\"file\" style=\"display:none\" id=\"choose-now\"> </label> <hr> <div class=\"profile__contact-info\"> <div class=\"profile__contact-info-item\"> <div class=\"profile__contact-info-icon\"> <i class=\"fa fa-comment\"></i> </div> <div class=\"profile__contact-info-body\"> <h5 class=\"profile__contact-info-heading\"> Quick tip </h5> This form contains some of the common profile fields you are encouraged to edit to suit your needs. </div> </div> </div> </div> </div> </div> </div> </div> <!-- /**\n" +
    "\n" +
    "\t\tProfile End\n" +
    "\n" +
    "\t**/ --> </div></section>"
  );


  $templateCache.put('views/user.html',
    "<p ng-click=\"fblogin()\"> Facebook Login </p> <p ng-click=\"googlelogin()\"> Google Login </p> <form ng-submit=\"emaillogin()\"> <p> <input type=\"email\" ng-model=\"email\" placeholder=\"Enter Email\" required> </p> <p> <input type=\"password\" ng-model=\"password\" placeholder=\"Enter Password\" required> </p> <p> <input type=\"submit\" value=\"{{form_submitting ? 'Please wait...' : 'Login'}}\" class=\"btn btn-success btn-sm\" ng-disabled=\"form_submitting\"> <a class=\"btn btn-sm btn-danger\" ng-href=\"/#!/forgot\">Forgot Password </a> </p> <p> <small class=\"text-danger\" ng-if=\"error\">{{error}}</small> </p> </form>"
  );


  $templateCache.put('views/user_login.html',
    ""
  );

}]);
