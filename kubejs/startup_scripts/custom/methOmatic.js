// priority: -1
StartupEvents.registry("block", (event) => {
  global.resources.meteorites.forEach((element) => {
    event
      .create(element.block, "cardinal")
      .defaultCutout()
      .box(1, 0, 1, 14, 3, 14)
      .item((item) => {
        item.modelJson({
          parent: "kubejs:block/sample/mercury",
        });
      }).blockstateJson = meteors();
  });
});
