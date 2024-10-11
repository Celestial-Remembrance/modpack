ServerEvents.lowPriorityData((event) => {
  global.resources.meteorites.forEach((element, index) => {
    event.addJson("kubejs:worldgen/placed_feature/" + index, {
      feature: {
        type: "minecraft:random_patch",
        config: {
          tries: 24,
          xz_spread: 7,
          y_spread: 3,
          feature: {
            feature: {
              type: "minecraft:simple_block",
              config: {
                to_place: {
                  type: "minecraft:simple_state_provider",
                  state: {
                    Name: "kubejs:" + element.block,
                  },
                },
              },
            },
            placement: [
              {
                type: "minecraft:block_predicate_filter",
                predicate: {
                  type: "minecraft:matching_blocks",
                  offset: [0, -1, 0],
                  blocks: "ad_astra:moon_sand",
                },
              },
              {
                type: "minecraft:block_predicate_filter",
                predicate: {
                  type: "minecraft:matching_blocks",
                  offset: [0, 0, 0],
                  blocks: "minecraft:air",
                },
              },
            ],
          },
        },
      },
      placement: [
        {
          type: "minecraft:rarity_filter",
          chance: 32,
        },
        {
          type: "minecraft:in_square",
        },
        {
          type: "minecraft:in_square",
        },
        {
          type: "minecraft:in_square",
        },
        {
          type: "minecraft:heightmap",
          heightmap: "WORLD_SURFACE_WG",
        },
        {
          type: "minecraft:biome",
        },
      ],
    });

    event.addJson("kubejs:forge/biome_modifier/" + index, {
      type: "forge:add_features",
      biomes: element.biomes,
      features: "kubejs:" + index,
      step: "underground_decoration",
    });
  });
});

BlockEvents.broken((event) => {
    if(!event.player.isCreative())
  global.resources.meteorites.forEach((element) => {
    if (event.block.id == "kubejs:" + element.block) {
      element.drop.forEach((drop, index) => {
        let success = 0;
        for (let i = 0; i < element.multiplier[index] + 1; i++) {
          if (rnd50()) {
            success++;
          }
        }
        if (success >= 1) {
          event.block.offset('up').popItemFromFace(Item.of(drop, success),'down');
        }
      });
    }
  });
});
