// priority: -1
StartupEvents.registry("block", (event) => {
  global.resources.meteorites.forEach((element) => {
    event
      .create(element.block, "cardinal")
      .defaultCutout()
      .textureAll(element.texture)
      .box(1, 0, 1, 14, 3, 14)
      .item((item) => {
        item.modelJson({
          parent: "kubejs:block/sample/mercury",
        });
      }).blockstateJson = () => {
      let planets = ["moon", "mars", "mercury", "venus", "glacio"];
      let rot = [0, 90, 180, 270];
      let list = [];
      rot.forEach((r) => {
        planets.forEach((e) => {
          list.push({ model: "kubejs:block/sample/" + e, y: r });
        });
      });
      return { variants: { "": list } };
    };
  });
});
