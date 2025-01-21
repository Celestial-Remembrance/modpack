// priority: -1

StartupEvents.registry("item", (event) => {
  event.create("kubejs:star").texture("kubejs:item/star");
  //event.create("kubejs:motor").texture("kubejs:item/motor");
  event.create("kubejs:star2").texture("kubejs:item/star-2");

  event.create("icon_click").texture("kubejs:item/right_click");
  event.create("icon_tree").texture("kubejs:item/tree");

  // potion(event, "kubejs:limewater", 0xffffaf);

  global.resources.crystals.forEach((e) => {
    shard(event, "kubejs:" + e.id, e.color, true);
  });


  event.create('vulcanic_alloy').texture("kubejs:item/alloy")

});

StartupEvents.registry("block", (event) => {
  global.resources.crystals.forEach((e) => {
    crystal_block(event, "kubejs:" + e.id, e.color);
  });

  global.resources.gems.forEach((e) => {
    raw_block(event, "kubejs:" + e.id, e.color);
  });

  global.resources.meteorites.forEach((element) => {
    meteors(event, element.block, element.type);
  });

  ore(event, "kubejs:fancy_cake", "gold", "ad_astra:block/moon_stone");
});

StartupEvents.registry("fluid", (event) => {
  event
    .create("magma")
    .luminosity(15)
    .temperature(1300)
    .flowingTexture("minecraft:block/magma")
    .stillTexture("minecraft:block/magma");
  event
    .create("liquid_etrium")
    .luminosity(15)
    .temperature(1300)
    .thickTexture(0x7bfcd7)
    .bucketColor(0x7bfcd76);
});
