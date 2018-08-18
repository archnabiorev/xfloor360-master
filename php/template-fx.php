<?php 
include_once('vendor/autoload.php');
// $SITEURL = "http://localhost:5566/";
$SITEURL = "http://forbes.xhome360.com/saxton/";

const DEFAULT_URL = 'https://forbes-xhome.firebaseio.com/';
const DEFAULT_TOKEN = 'KsZ2x10fwOcWYPCU4Ac1epLM5YTFjlneYtjdep9m';
const DEFAULT_PATH = '/';

$project = "forbesxHome";
// $favID = "b1cd11f5_7aac_c5a3_3bc8_64dc51fa4520";
if( !isset( $_GET["id"] ) ){
	die('No ID Found');
}

$favID = $_GET["id"];

$firebase = new \Firebase\FirebaseLib(DEFAULT_URL, DEFAULT_TOKEN);


$data = $firebase->get('/forbesxFloor/'.$favID);
$DATA = json_decode( $data , true );
// echo '<pre>';
// print_r( $DATA );
// echo '</pre>';
 ?>
<html><head><style type="text/css">@charset "UTF-8";</style>
    <meta charset="utf-8">
    <title>xHome360 | Forbes Capretto Homes</title>
    <link rel="shortcut icon" href="http://dev.xdesign360.com/favicon.png">
    <meta name="description" content="">
    <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
    <!-- build:css(.) styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="<?php echo $SITEURL; ?>bower_components/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<?php echo $SITEURL; ?>bower_components/components-font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="<?php echo $SITEURL; ?>bower_components/nouislider/distribute/nouislider.min.css">
    <link rel="stylesheet" href="<?php echo $SITEURL; ?>bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css">
    <link rel="stylesheet" href="<?php echo $SITEURL; ?>bower_components/sweetalert2/dist/sweetalert2.css">
    <!-- endbower -->
    <!-- endbuild -->
    <!-- build:css(.tmp) styles/main.css -->
    <!-- <link rel="stylesheet" href="<?php echo $SITEURL; ?>styles/main.css"> -->
    <link rel="stylesheet" href="main.css">
    <!-- endbuild -->
    
    <link rel="stylesheet" href="custom_plugins/ps-responsive-grid-sidebar/dist/side-widget.css">

  <style id="style-1-cropbar-clipper">/* Copyright 2014 Evernote Corporation. All rights reserved. */
.en-markup-crop-options {
    top: 18px !important;
    left: 50% !important;
    margin-left: -100px !important;
    width: 200px !important;
    border: 2px rgba(255,255,255,.38) solid !important;
    border-radius: 4px !important;
}

.en-markup-crop-options div div:first-of-type {
    margin-left: 0px !important;
}

html {
/*
    zoom: 0.68!important; /*workaround for phantomJS2 rendering pages too large*/
*/
}
</style></head>
  <body ng-app="floorxApp" class="ng-scope" cz-shortcut-listen="true">
    <div id="fs-loading" style="display: none;">
    <div class="fs-loading-content center-middle">
      <p class="fs-loading-icon"> 
      
          </p><div class="item item-1"></div>
          <div class="item item-2"></div>
          <div class="item item-3"></div>
          <div class="item item-4"></div>
      
      <p></p>
      <p class="fs-loading-text"><span class="load-percentage">0%</span> </p>
    </div>
  </div>
  
  <div id="side-widget"></div>
    <div class="container-fluid">
    <div class="row">

    <div class="col-sm-12" id="header">
              <div class="brand-image text-center pull-left">
                <a href="#"><img src="<?php echo $SITEURL; ?>images/forbes-capretto.png" class="img-responsive"></a>
              </div>
                  
            </div>
      
    </div>
    </div>
      



    <div ng-view="" class="ng-scope" style="">

<style class="ng-scope">
	body{
		overflow-y: auto!important;
	}
</style>
<div class="container-fluid ng-scope" style="padding-bottom:20px;">
	<div class="row">
		<div class="col-sm-9">
		<h3> <span class="pull-right main-title"> <?php echo $DATA["elevationName"] ?> </span> </h3>
			<img alt="image" class="img-responsive final-image" src="<?php echo $DATA["image"]; ?>">

		
		<div class="row">
			
			<?php foreach( $DATA["modules"] as $floorName => $floordata ): ?>
			<div class="col-xs-12">
				<h4 style="text-align: right; font-weight: bolder;"><?php echo $floorName; ?></h4>
				<img alt="image" class="img-responsive" src="<?php echo $floordata["extraInfo"]["image"]; ?>">				
			</div>
		<?php endforeach; ?>


		</div>

		</div>

		<div class="col-sm-3" style="padding-top: 20px;">
			<h3 class="main-title">Congratulations</h3>
			<p><small>You've designed your new House</small></p>
			<div class="row">
				

				<div class="col-sm-12">

							<p class="selection-header">Your Selection</p>
							<ul class="list-unstyled selected-wrapper">

								<li>
									<h5 class="selection-cat">
										FLOOR PLAN SELECTIONS
									</h5>
									
									<?php foreach( $DATA["modules"] as $floorName => $moduleData ): ?>
										
										<h5 class="selection-subcat ng-binding"> 
											<?php echo $floorName; ?>
										</h5>

										<?php foreach( $DATA["modules"][$floorName] as $submodulename => $submoduledata ): ?>
											<?php if($submodulename != "extraInfo"): ?>
											<p>
												&emsp; <?php echo $submodulename; ?>
											</p>
												<?php foreach( $DATA["modules"][$floorName][$submodulename] as $submodulechildname => $submodulechildvalue ): ?>
													&emsp; &emsp; <?php echo $submodulechildname; ?>
												<?php endforeach; ?>
											<?php endif; ?>
										<?php endforeach; ?>

									<?php endforeach; ?>

								</li>


								
								<li>
									<h5 class="selection-cat">
										EXTERIOR SELECTIONS
									</h5>

									<h5 class="selection-subcat">
										COLOR SCHEMES
									</h5>

									<?php foreach($DATA["homeXData"]["items"]["themes"] as $key=>$value ): ?>
										<p class="selection-module ng-scope" style="">
										<strong ng-if="theme" class="ng-binding ng-scope"> <?php echo $key; ?> </strong><span class="pull-right ng-binding">
											
											<?php echo $value; ?>

										</span>  <!-- <span>${{module.price}}</span> -->
									</p>
									<?php endforeach; ?>
								</li>

								<?php if( isset($DATA["homeXData"]["items"]["additional"]) ): ?>
								<li class="ng-scope" style="">
									<h5 class="selection-subcat">
										STRUCTURAL OPTIONS
									</h5>
									
									<?php foreach ($DATA["homeXData"]["items"]["additional"] as $key => $value): ?>
									<p class="selection-module ng-scope" ng-repeat="components in data.additional">
										<strong class="ng-binding"><?php echo $value; ?></strong> <!-- <span>${{module.price}}</span> -->
									</p>
									<?php endforeach; ?>
								</li><!-- end ngIf: data.additional.length > 0 -->
									
								<?php endif; ?>


								<li>
									<hr>
								</li>								
							</ul>
							
						</div>

			</div>
		</div>
	</div>
	<div class="row"> </div>
	<div class="row">
				<div class="col-sm-9">
					
					<!-- ngRepeat: (floor , module) in data.modules -->

					<div class="row">
						<div class="col-sm-12">
							

							<div class="contact-box">

								<div class="row">
									<div class="col-xs-12 col-sm-6">
										<h4>
											Contact Detail
										</h4>									
									</div>

									<div class="col-xs-12 col-sm-6" style="margin-left: -11px;width: 51%;">
										<h4>
											 
										</h4>									
									</div>
								</div>

								<div class="row">
									<div class="col-xs-12 col-sm-6">
										<p>
											Biorev LLC.
										</p>									
									</div>

									<div class="col-xs-12 col-sm-6">
										Email  info@biorev.us
									</div>
								</div>

								<div class="row">
									<div class="col-xs-12 col-sm-6">
										<p>
											Irving, TX, USA
										</p>									
									</div>

									<div class="col-xs-12 col-sm-6">
										    Tel  +1 770-572-1828
									</div>
								</div>





								<!-- <h4>
									Contact Detail
								</h4>

								<p>
									Biorev LLC.
								</p>

								<p>
									 Irving, TX, USA
								</p>

								<p>
									Email : info@biorev.us
								</p>

								<p>
									Tel : +1 770-572-1828
								</p>	 -->

							</div>
							

						</div>
					</div>
				</div>
			</div>

</div>




</div>

</body></html>
