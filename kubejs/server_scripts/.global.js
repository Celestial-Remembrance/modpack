// priority: 1
const NAMEMOD = "kubejs:";
const TAG_RESULT = "_result";

let extractinator_recipe = {
  tags: [
    "moon_stones",
    "moon_sands",
    "mars_stones",
    "mars_sands",
    "venus_rocks",
    "venus_soil",
    "mercury_stone",
    "glacio_perma",
    "glacio_stones",
  ],
  entry: [
    [
      "ad_astra:moon_deepslate",
      "ad_astra:moon_cobblestone",
      "ad_astra:moon_stone",
    ],
    ["ad_astra:moon_sand"],
    ["ad_astra:mars_cobblestone", "ad_astra:mars_stone"],
    ["ad_astra:mars_sand"],
    ["ad_astra:infernal_spire_block"],
    [
      "ad_astra:venus_cobblestone",
      "ad_astra:venus_stone",
      "ad_astra:venus_sand",
      "ad_astra:venus_sandstone",
    ],
    ["ad_astra:mercury_stone"],
    ["ad_astra:permafrost"],
    ["ad_astra:glacio_stone"],
  ],
  result: [
    ["kubejs:copper_shard", "kubejs:iron_shard", "minecraft:redstone"],
    [
      "minecraft:sugar_cane",
      "minecraft:wheat_seeds",
      "minecraft:cactus",
      "minecraft:oak_sapling",
    ],
    ["kubejs:nickel_shard", "kubejs:desh_shard", "kubejs:gold_shard"],
    ["mekanism:dust_sulfur"],
    ["kubejs:aluminum_shard", "kubejs:ostrum_shard", "kubejs:tin_shard"],
    [
      "alltheores:sapphire",
      "alltheores:peridot",
      "alltheores:ruby",
      "ae2:certus_quartz_crystal",
    ],
    [
      "xycraft_world:xychorium_gem_red",
      "xycraft_world:xychorium_gem_green",
      "thoriumreactors:thorium",
      "thoriumreactors:raw_uranium",
      "ad_astra:calorite_ingot",
    ],
    ["ad_astra:ice_shard", "xycraft_world:xychorium_gem_light"],
    [
      "mekanism:fluorite_gem",
      "xycraft_world:xychorium_gem_dark",
      "xycraft_world:xychorium_gem_blue",
    ],
  ],
};

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

function rndC(value) {
  return Math.random() < (value == undefined ? 1 : value * 0.01);
}
