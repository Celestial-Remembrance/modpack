// priority: -1
ServerEvents.tags("item", (event) => {
  event.add(NAMEMOD + "moderators", [
    "thoriumreactors:molybdenum_block",
    "thoriumreactors:niob_block",
    "thoriumreactors:nickel_block",
  ]);
  event.add(NAMEMOD + "alloy_ingot", [
    "minecraft:iron_ingot",
    "minecraft:copper_ingot",
  ]);

  //extractinator item tag decompiler
  extractinator_recipe.tags.forEach((e, i) => {
    event.add(NAMEMOD + e, extractinator_recipe.entry[i]);
    event.add(NAMEMOD + e + TAG_RESULT, extractinator_recipe.result[i]);
  });
});

ServerEvents.tags("block", (event) => {
  //extractinator block tag decompiler
  extractinator_recipe.tags.forEach((e, i) => {
    event.add(NAMEMOD + e, extractinator_recipe.entry[i]);
  });
});
