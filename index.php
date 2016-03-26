<?php get_header(); ?>
<div id="main">
  <div id="content">
    <h1>Nuevos productos</h1>
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <h1><?php the_title(); ?></h1>
      <h4>Posted on <?php the_time('F jS, Y') ?></h4>
      <p><?php the_content(__('(mas...)')); ?></p>
      <hr> <?php endwhile; else: ?>
        <p><?php _e('Lo sentimos, ningun producto coincide con los criterios.'); ?></p><?php endif; ?>
  </div>
</div>
<?php get_footer(); ?>
