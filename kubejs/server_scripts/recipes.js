const nul = "minecraft:air";

ServerEvents.recipes((event) => {
  global.resources.crystals.forEach((e) => {
    event.shaped("kubejs:" + e.id + "_crystal_block", [
      ["kubejs:" + e.id + "_shard", "kubejs:" + e.id + "_shard", nul],
      ["kubejs:" + e.id + "_shard", "kubejs:" + e.id + "_shard"],
    ]);
  });
});
