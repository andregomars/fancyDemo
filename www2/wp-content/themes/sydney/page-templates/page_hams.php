<?php
/*
Template Name: HAMS Page
*/

// get_header(); 
get_template_part('header-hams'); 
?>

	<div class="fullwidth">
			<div class="container" style="margin-left: 0px; margin-right: 0px; width: 100%">
				<div class="row">
					<div class="entry-content col">
						  <app-root>Loading...</app-root>
					</div><!-- .entry-content -->	
				</div>
			</div>
	</div><!-- #primary -->
  <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>-->
  <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
  
  <script type="text/javascript" src="<?php echo esc_url(includes_url())?>assets/scripts/inline.bundle.js"></script>
  <script type="text/javascript" src="<?php echo esc_url(includes_url())?>/assets/scripts/polyfills.bundle.js"></script>
  <script type="text/javascript" src="<?php echo esc_url(includes_url())?>/assets/scripts/main.bundle.js"></script>
  </body>


<?php get_footer(); ?>
