// priority: -1

StartupEvents.registry("item", (event) => {
  event.create("kubejs:star").texture("kubejs:item/star");
  //event.create("kubejs:motor").texture("kubejs:item/motor");
  // event.create("kubejs:star2").texture("kubejs:item/star-2");

  // event.create("icon_click").texture("kubejs:item/right_click");
  // event.create("icon_tree").texture("kubejs:item/tree");

  // potion(event, "kubejs:limewater", 0xffffaf);

  global.resources.crystals.forEach((e) => {
    shard(event, "kubejs:" + e.id, e.color, true);
  });

  event.create("vulcanic_alloy").texture("kubejs:item/alloy");
  event.create("niter").texture("kubejs:item/niter");
});

StartupEvents.registry("block", (event) => {
  // global.resources.crystals.forEach((e) => {
  //   crystal_block(event, "kubejs:" + e.id, e.color);
  // });

  // global.resources.gems.forEach((e) => {
  //   raw_block(event, "kubejs:" + e.id, e.color);
  // });

  // global.resources.meteorites.forEach((element) => {
  //   meteors(event, element.block, element.type);
  // });

  // ore(event, "kubejs:fancy_cake", "gold", "ad_astra:block/moon_stone");
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
    .temperature(1300)
    .thickTexture(0x7bfcd7)
    .bucketColor(0x7bfcd76);

  event.create("liquid_rock").thickTexture(0xffffff).bucketColor(0xffffff);

  event.create("liquid_carbon").thickTexture(0xffffff).bucketColor(0xffffff);
});

const $Gas = Java.loadClass("mekanism.api.chemical.gas.Gas");
const $InfuseType = Java.loadClass("mekanism.api.chemical.infuse.InfuseType");
const $GasBuilder = Java.loadClass("mekanism.api.chemical.gas.GasBuilder");
const $InfuseTypeBuilder = Java.loadClass(
  "mekanism.api.chemical.infuse.InfuseTypeBuilder"
);

StartupEvents.registry("mekanism:gas", (event) => {
  let gas = (id, tint, name) =>
    event
      .createCustom(id, () => $Gas($GasBuilder.builder().tint(tint)))
      .displayName(name == "" || name == null ? name = id : name);

  gas("stone", 0xfc0000,"Stone (gas)");
  gas("deepslate", 0xfc0000,"Deepslate (gas)");

  gas("barium", 0xfc0000);
  gas("lead", 0xfc0000);
  gas("osmium", 0xfc0000);
});

StartupEvents.registry("mekanism:infuse_type", (event) => {
  let infuse = (id, tint, name) =>
    event
      .createCustom(id, () =>
        $InfuseType($InfuseTypeBuilder.builder().tint(tint))
      )
      .displayName(name == "" || name == null ? name = id : name);

  infuse("plastic", 0xfc0000);
});
