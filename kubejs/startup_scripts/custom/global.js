// priority: 1
global.jei = {
  recipes: {
    click: [
      {
        input: {
          main_hand: "minecraft:flint",
          off_hand: "",
          block: "minecraft:cobblestone",
          extra: "",
        },
        output: {
          type: "fluid",
          block_replace: "minecraft:water",
          drop: [],
          chance: [],
          isCrouching: false,
          extra: "",
        },
      },
    ],
    atomic: [
      {
        input: "minecraft:diamond_ore",
        output: "minecraft:diamond_block",
      },
      {
        input: "minecraft:coal_ore",
        output: "minecraft:coal_block",
      },
    ],
  },
};
global.resources = {
  meteorites: [
    {
      id: "meteorite_1",
      block: "mercury_meteorite",
      texture: "minecraft:block/stone",
      drop: ["minecraft:raw_copper", "minecraft:redstone"],
      multiplier: [20, 1],
      biomes: ["ad_astra:lunar_wastelands"],
    },
  ],
};
