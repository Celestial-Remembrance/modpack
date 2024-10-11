// priority: -1
StartupEvents.registry("block", (event) => {
  global.resources.meteorites.forEach((element) => {
    event
      .create(element.block, "cardinal")
      .defaultCutout()
      .soundType(SoundType.ANCIENT_DEBRIS)
      .box(1, 0, 1, 14, 3, 14)
      .noDrops()
      .item((item) => {
        item.modelJson({
          parent: "kubejs:block/sample/"+ element.icon,
        });
      }).blockstateJson = meteors(element.type);
  });
});
