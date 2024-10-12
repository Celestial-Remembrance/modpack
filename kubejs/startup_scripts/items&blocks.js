// priority: -1

StartupEvents.registry("item", (event) => {
  event.create("kubejs:star").texture("kubejs:item/star");
  //event.create("kubejs:motor").texture("kubejs:item/motor");
  event.create("kubejs:star2").texture("kubejs:item/star-2");

  potion(event, "kubejs:limewater", 0xffffaf);

  global.resources.crystals.forEach((e, index) => {
    shard(event, 'kubejs:'+e.id, e.color, true);
  });
});

StartupEvents.registry("block", (event) => {
  global.resources.crystals.forEach((e, index) => {
    crystal_block(event, 'kubejs:'+e.id, e.color);
  });

  global.resources.meteorites.forEach((element) => {
    meteors(event,element.block,element.type)
  });


  ore(event,'kubejs:fancy_cake','gold','ad_astra:block/moon_stone')



});