// priority: -1

StartupEvents.registry("item", (event) => {
  event.create("kubejs:star").texture("kubejs:item/star");
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
    event
      .create(element.block)
      .defaultCutout()
      .soundType(SoundType.ANCIENT_DEBRIS)
      .box(1, 0, 1, 14, 3, 14)
      .noDrops()
      .item((item) => {
        item.modelJson({
          parent: "kubejs:block/sample/"+ element.type,
        });
      }).blockstateJson = meteors(element.type);
  });


event.create('a').modelJson ={
  "parent": "kubejs:block/special/_double_layer",
  "textures": {
    "top": "kubejs:block/template/ores/diamond",
    "below": "minecraft:block/cobblestone"
  }
}

});