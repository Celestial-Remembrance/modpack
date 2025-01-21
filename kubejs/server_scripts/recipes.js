// priority: -1

const nul = "minecraft:air";

ServerEvents.recipes((event) => {
  const { enderio, mekanism, minecraft, kubejs } = event.recipes;

  event.remove([
    { mod: "mekanism" },
    { mod: "thoriumreactors" },
    { mod: "extractinator" },
    { mod: "industrialforegoing" },
    { mod: "mifa" },
    { mod: "alltheores" },
    { mod: "mekanismgenerators" },
    { mod: "experienceobelisk" },
    { id: "experienceobelisk:item_name_formatting" },
  ]);

  // global.resources.crystals.forEach((e) => {
  //   event.shaped("kubejs:" + e.id + "_crystal_block", [
  //     ["kubejs:" + e.id + "_shard", "kubejs:" + e.id + "_shard", nul],
  //     ["kubejs:" + e.id + "_shard", "kubejs:" + e.id + "_shard"],
  //   ]);
  // });

  kubejs.shapeless("mekanism:alloy_infused", [
    "3x minecraft:redstone",
    "#kubejs:alloy_ingot",
  ]);

  mekanism.infusion_conversion("minecraft:redstone", {
    infuse_type: "mekanism:redstone",
    amount: 10,
  });
  mekanism.infusion_conversion("mekanism:enriched_redstone", {
    infuse_type: "mekanism:redstone",
    amount: 80,
  });

  mekanism
    .metallurgic_infusing("4x mekanism:alloy_infused", "#kubejs:alloy_ingot")
    .chemicalInput({ infuse_type: "mekanism:redstone", amount: 10 });


    //extractinator recipe-tag compiler
  extractinator_recipe.tags.forEach((e) => {
    event.custom({
      type: "extractinator:extractinating",
      input: {
        tag: NAMEMOD + e,
      },
      drops: [
        {
          drop: '#'+NAMEMOD + e + TAG_RESULT,
          drop_chance: 1,
        },
      ],
    });
  });



});
