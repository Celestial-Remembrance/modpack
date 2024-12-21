const BASIC = "basic";
const ADVANCED = "advanced";

function UpCased(input) {
  return input
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(" ") // Split the string into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together
}

MMEvents.createStructures((event) => {
  let CreateMiner = (name, catalyst) => {
    event
      .create("mm:" + name + "_miner")
      .controllerId("mm:basic_controller")
      .name(UpCased(name) + " Miner")
      .layout((a) => {
        a.layer(["ACA"])
          .layer(["FIE"])
          .key("A", {
            block: catalyst,
          })
          .key("F", {
            portType: "mm:fluid",
          })
          .key("I", {
            portType: "mm:item",
          })
          .key("E", {
            portType: "mm:energy",
          });
      });
  };

  CreateMiner(BASIC, "minecraft:iron_block");
  CreateMiner(ADVANCED, "minecraft:gold_block");
});

MMEvents.createProcesses((event) => {
    /**
     * 
     * @param {string} name 
     * @param {number} ticks 
     * @param {number} FeRate 
     * @param {fluid} cooler 
     * @param {number} coolerRate 
     * @param {item[]} items 
     * @param {number[]} items_count 
     * @param {number[]} item_chance 
     */
  let CreateMinerRecipe = (
    name,
    ticks,
    FeRate,
    cooler,
    coolerRate,
    items,
    items_count,
    item_chance
  ) => {
    let recipe = event
      .create("mm:recipe_id_miner_" + name)
      .structureId("mm:" + name + "_miner")
      .ticks(ticks)
      .input({
        type: "mm:input/consume",
        per_tick: true,
        ingredient: {
          type: "mm:energy",
          amount: FeRate,
        },
      })
      .input({
        type: "mm:input/consume",
        per_tick: true,
        ingredient: {
          type: "mm:fluid",
          fluid: cooler,
          amount: coolerRate,
        },
      });
    items.forEach((item, i) => {
      recipe.output({
        type: "mm:output/simple",
        chance: item_chance[i],
        ingredient: {
          type: "mm:item",
          item: item,
          count: items_count[i],
        },
      });
    });
  };

  CreateMinerRecipe(
    BASIC,
    100,
    250,
    "minecraft:lava",
    10,
    ["minecraft:diamond", "minecraft:iron_ingot", "minecraft:emerald"],
    [1, 2, 1],
    [0.01, 0.25, 0.05]
  );


  CreateMinerRecipe(
    ADVANCED,
    200,
    500,
    "minecraft:lava",
    10,
    ["minecraft:diamond", "minecraft:iron_ingot", "minecraft:emerald"],
    [1, 2, 1],
    [0.25, 0.95, 0.75]
  );

});
