'use strict';

/**
 * @ngdoc service
 * @name colorappsApp.lotid
 * @description
 * # lotid
 * Value in the colorappsApp.
 */
 var lots = [

  {
  	id : "TEMPLATE_49b90b70_c8ce_6d81_5adc_c4770eb46de7",
  	title : "My Title",
  	img : "https://firebasestorage.googleapis.com/v0/b/builderapp-9683b.appspot.com/o/789ab3ed_472c_ceaf_3f5b_0900f6a8b892.png?alt=media&token=d302573b-2686-4b49-a5c4-09884da7a128"
  },

  {
    id : "TEMPLATE_d79356f8_5bbf_6783_a558_4207bf647669",
    title : "My other Title",
    img : "https://firebasestorage.googleapis.com/v0/b/builderapp-9683b.appspot.com/o/5b5fd985_1974_3a13_c345_da7f34573463.png?alt=media&token=57b97c74-b14c-43e2-a5b6-12e2057411a0"
  },

  {
  	id : "TEMPLATE_81f34361_3ec7_e10e_f13c_9df0ccbdcd35",
  	title : "New Processed",
  	img : "https://firebasestorage.googleapis.com/v0/b/builderapp-9683b.appspot.com/o/b18308dd_0792_b531_97d9_01717f320f01.png?alt=media&token=40cf4f62-e95e-4377-acd8-31b6414775ad"
  },

//new

  {
    id : "TEMPLATE_341959f8_7b02_b738_4efa_19647156493a",
    title : "House 4",
    img : "https://firebasestorage.googleapis.com/v0/b/builderapp-9683b.appspot.com/o/e61e6672_a888_a85c_4264_5c93edf17b67.png?alt=media&token=116202de-0f17-48eb-93e5-3fae51b6267d"
  },

    {
    id : "TEMPLATE_57b3d717_8e8a_e4f0_e9d0_dcf227821ceb",
    title : "House 5",
    img : "https://firebasestorage.googleapis.com/v0/b/builderapp-9683b.appspot.com/o/1c3259ef_a83f_a440_1103_2f4f21f08c6a.png?alt=media&token=0568fef7-57eb-4841-be53-cd61fd06d00d"
  }


  	];
angular.module('colorappsApp')
  .value('lotid', lots);
