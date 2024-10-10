// priority: 999
Platform.mods.kubejs.name = "OxygenUtils";

const $BooleanProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.BooleanProperty"
);
const $IntegerProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.IntegerProperty"
);

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

//TODO BE SIDES
const energy_links = ['ad_astra:steel_cable', 'ad_astra:desh_cable','mekanism:creative_energy_cube', 'mekanism:basic_universal_cable', 'mekanism:advanced_universal_cable', 'mekanism:elite_universal_cable', 'mekanism:ultimate_universal_cable', 'mekanism:basic_energy_cube', 'mekanism:advanced_energy_cube', 'mekanism:elite_energy_cube', 'mekanism:ultimate_energy_cube']