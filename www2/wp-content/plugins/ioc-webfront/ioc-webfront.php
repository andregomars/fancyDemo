<?php
/*
Plugin Name: I/O Webfront 
Plugin URI: http://www.iocontrols.com/
Version: 1.0.0
Author: Andre
Author URI: https://www.linkedin.com/in/andregomars
Description: I/O Controls Inc. webfront modules
Text Domain: ioc-webfront
Domain Path: /languages
 */
final class IOC_Webfront_Plugin {

	public $dir_path = '';

	public $dir_uri = '';

	public $admin_dir = '';

	public $inc_dir = '';

	public $templates_dir = '';

	public $css_uri = '';

	public $js_uri = '';

	public static function get_instance() {

		static $instance = null;

		if ( is_null( $instance ) ) {
			$instance = new IOC_Webfront_Plugin;
			$instance->setup();
			$instance->includes();
			$instance->setup_actions();
		}

		return $instance;
	}

	private function __construct() {}

	public function __toString() {
		return 'iocmanagement';
	}

	private function setup() {

		// Main plugin directory path and URI.
		$this->dir_path = trailingslashit( plugin_dir_path( __FILE__ ) );
		$this->dir_uri  = trailingslashit( plugin_dir_url(  __FILE__ ) );

		// Plugin directory paths.
		$this->inc_dir       = trailingslashit( $this->dir_path . 'inc'       );

		// Plugin directory URIs.
		$this->css_uri = trailingslashit( $this->dir_uri . 'css' );
		$this->js_uri  = trailingslashit( $this->dir_uri . 'js'  );
	}

	private function includes() {

		// Load includes files.
		require_once( $this->inc_dir . 'functions.php');

}

	private function setup_actions() {
		return;
	}

}

function ioc_webfront_plugin() {
	return IOC_Webfront_Plugin::get_instance();
}

// Let's roll!
ioc_webfront_plugin();
