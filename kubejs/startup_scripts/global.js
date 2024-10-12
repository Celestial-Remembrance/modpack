// priority: 999
Platform.mods.kubejs.name = "OxygenUtils";

const $BooleanProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.BooleanProperty"
);
const $IntegerProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.IntegerProperty"
);
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns
 */
function rnd(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function rnd50() {
  return Math.random() < 0.5;
}
function rnd75() {
  return Math.random() < 0.75;
}
function rnd25() {
  return Math.random() < 0.25;
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 */
function potion(event, id, color) {
  event
    .create(id + "_bottle")
    .color(1, color)
    .texture("layer0", "minecraft:item/potion_overlay")
    .texture("layer1", "minecraft:item/potion");
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 */
function clump(event, id, color) {
  event
    .create(id + "_clump")
    .color(1, color)
    .texture("layer0", "mekanism:item/clump_overlay")
    .texture("layer1", "mekanism:item/clump");
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 * @param {boolean} isclassic true -> classic | false -> meka style
 */
function nugget(event, id, color, isclassic) {
  event
    .create(id + "_nugget")
    .color(0, color)
    .texture(
      "layer0",
      isclassic ? "kubejs:item/template/classic_nugget" : "mekanism:item/nugget"
    );
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 */
function ingot(event, id, color) {
  event
    .create(id + "_ingot")
    .color(0, color)
    .texture("layer0", "mekanism:item/ingot");
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 */
function crystal(event, id, color) {
  event
    .create(id + "_crystal")
    .color(1, color)
    .texture("layer0", "mekanism:item/crystal_overlay")
    .texture("layer1", "mekanism:item/crystal");
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 */
function shard(event, id, color, vanilla) {
  if (vanilla) {
    event
      .create(id + "_shard")
      .color(0, color)
      .texture("layer0", "kubejs:item/template/shard");
  } else {
    event
      .create(id + "_shard")
      .color(1, color)
      .texture("layer0", "mekanism:item/shard_overlay")
      .texture("layer1", "mekanism:item/shard");
  }
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 */
function crystal_block(event, id, color) {
  event
    .create(id + "_crystal_block")
    .soundType(SoundType.AMETHYST)
    .color(0, color)
    .defaultCutout()
    .model("kubejs:block/special/crystal")
    .item((item) => {
      item.color(0, color);
      item.parentModel("kubejs:block/special/crystal");
    });
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 * @param {boolean} extradirty true -> extra layer | false -> no extra layer
 */
function dust(event, id, color, moreDirty) {
  if (moreDirty) {
    event
      .create(id + "_dust")
      .color(0, color)
      .texture("layer0", "mekanism:item/dust")
      .texture("layer1", "kubejs:item/template/dust_extra_overlay");
  } else {
    event
      .create(id + "_dust")
      .color(0, color)
      .texture("layer0", "mekanism:item/dust");
  }
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {Color} color
 * @param {boolean} extradirty true -> extra layer | false -> no extra layer
 */
function dirty_dust(event, id, color, moreDirty) {
  if (moreDirty) {
    event
      .create(id + "_dirty_dust")
      .color(1, color)
      .texture("layer0", "mekanism:item/dirty_dust_overlay")
      .texture("layer1", "mekanism:item/dirty_dust")
      .texture("layer2", "kubejs:item/template/dust_extra_overlay");
  } else {
    event
      .create(id + "_dirty_dust")
      .color(1, color)
      .texture("layer0", "mekanism:item/dirty_dust_overlay")
      .texture("layer1", "mekanism:item/dirty_dust");
  }
}
/**
 * 
 * @param {Event} event 
 * @param {string} blockid 
 * @param {string[]} planets 
 */
function meteors(event, blockid, type) {
  let methstate = (planets) => {
    let rot = [0, 90, 180, 270];
    let list = [];

    if (planets == "all")
      planets = ["moon", "mars", "mercury", "venus", "glacio"];

    if (!Array.isArray(planets)) planets = [planets];

    rot.forEach((r) => {
      planets.forEach((e) => {
        list.push({ model: "kubejs:block/sample/" + e, y: r });
      });
    });
    return { variants: { "": list } };
  }
  event
    .create(blockid)
    .defaultCutout()
    .soundType(SoundType.ANCIENT_DEBRIS)
    .box(1, 0, 1, 14, 3, 14)
    .noDrops()
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/sample/" + type,
      });
    }).blockstateJson = methstate(type);
}
/**
 *
 * @param {Event} event
 * @param {string} id
 * @param {string} type  example "uranium" -> "kubejs:block/template/ore/" + "uranium"
 * @param {string} stone example "minecraft:block/stone"
 */
function ore(event, id, type, stone) {
  event.create(id).defaultCutout().modelJson = {
    parent: "kubejs:block/special/_double_layer",
    textures: {
      top: "kubejs:block/template/ores/" + type,
      below: stone,
    },
  };
}


