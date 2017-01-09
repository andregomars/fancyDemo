<?php
/**
 * customized functions ddd by Andre
 *
 * @package HAMS
 */

add_action('wp_enqueue_scripts', 'load_scripts');
function load_scripts() {
    global $post;
    wp_register_script( 'cards', includes_url() . 'js/hams/fleets.js', array('jquery'), false, true);
    wp_register_script( 'charts', includes_url() . 'js/hams/fundraising.js', array('jquery'), false, true);

    if( is_page() || is_single() )
    {
        switch($post->post_name) 
        {
            case 'cards':
            	wp_enqueue_script('react-with-addons', 'https://unpkg.com/react@15/dist/react-with-addons.js');
				wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@15/dist/react-dom.js', array('jquery'));
                wp_enqueue_script('cards');
                break;
            case 'googlechartdemo':
            	wp_enqueue_script('jsapi', 'https://www.google.com/jsapi');
                wp_enqueue_script('charts');
                break;
        }
    } 
}


//build graph function
 add_action( 'wp_ajax_build_graph', 'build_graph' );//admin
 add_action('wp_ajax_nopriv_build_graph', 'build_graph');//frontend
//func action
function build_graph() { 
	 //$url = get_template_directory_uri() .'/data/donations.json';
	 // $url = 'http://nginx.demo/wp-content/themes/TESSERACT/data/donations.json';
	 $url = 'http://www.mocky.io/v2/586b419711000081012e0d28';
	 $request =   wp_remote_get($url);
	 // Get the body of the response
	 $response = wp_remote_retrieve_body( $request );
	 // error_log('the url is: ' . print_r($url,true));
	 function get_sum($json){
		 $keys = array();// Creates a new variable as an array
		 foreach( $json as $key){//loops through the sections
		   $sum[] = $key['amount'];//finds all amount values  and adds them to an array
		 }
		 return array_sum($sum);//adds the all the values together
	 
	}
	 
	 $myJson= json_decode($response, true);//decode file as an array
	 
	 $company = get_sum($myJson['Company']);
	 $ct = get_sum($myJson['Collection Tins']);
	 $ourevents = get_sum($myJson['Our Events']);
	 $individual = get_sum($myJson['Individual']);
	 $misc = get_sum($myJson['Miscellaneous']);
	 $school = get_sum($myJson['School']);
	 
	echo json_encode(
	 array( 'company'=>$company,
	 'ct'=>$ct,
	    'ourevents'=>$ourevents,
	    'individual'=>$individual,
	    'misc'=>$misc,
	    'school'=>$school));
	 
	die();//required for ajax
}
